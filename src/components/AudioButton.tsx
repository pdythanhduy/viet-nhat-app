import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

import { Colors } from '../constants/colors';
import {
  getJapaneseAudioState,
  playJapaneseAudio,
  stopJapaneseAudio,
  subscribeJapaneseAudio,
} from '../utils/audio';
import {
  getVbeeJapaneseVoiceCode,
  isVbeeConfigured,
  synthesizeVbeeSpeech,
} from '../services/vbeeTts';

interface AudioButtonProps {
  audioId: string;
  text: string;
  label?: string;
  color?: string;
  backgroundColor?: string;
  size?: number;
  mode?: 'auto' | 'system' | 'vbee';
}

const AudioButtonText = {
  missingVoiceTitle: 'Thi\u1ebft b\u1ecb ch\u01b0a c\u00f3 gi\u1ecdng Nh\u1eadt',
  missingVoiceMessage:
    'M\u00e1y n\u00e0y hi\u1ec7n ch\u01b0a c\u00f3 voice ti\u1ebfng Nh\u1eadt \u0111\u1ec3 ph\u00e1t \u00e2m. H\u00e3y c\u00e0i th\u00eam Japanese TTS voice trong ph\u1ea7n ng\u00f4n ng\u1eef/gi\u1ecdng n\u00f3i c\u1ee7a thi\u1ebft b\u1ecb r\u1ed3i th\u1eed l\u1ea1i.',
  speechErrorTitle: 'Kh\u00f4ng \u0111\u1ecdc \u0111\u01b0\u1ee3c ti\u1ebfng Nh\u1eadt',
};

export default function AudioButton({
  audioId,
  text,
  label,
  color = Colors.primary,
  backgroundColor = Colors.accent,
  size = 16,
  mode = 'auto',
}: AudioButtonProps) {
  const vbeePlayer = useAudioPlayer(null, { updateInterval: 1000 });
  const vbeeStatus = useAudioPlayerStatus(vbeePlayer);
  const vbeeEnabled = mode === 'vbee' || (mode === 'auto' && isVbeeConfigured());
  const [systemPlaying, setSystemPlaying] = React.useState(() => {
    const state = getJapaneseAudioState();
    return state.speaking && state.activeId === audioId;
  });
  const [vbeeLoading, setVbeeLoading] = React.useState(false);
  // The text that the currently loaded Vbee audio was synthesized from, so we
  // can resume/replay it without spending another Vbee request.
  const synthesizedTextRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (vbeeEnabled) return;
    return subscribeJapaneseAudio((state) => {
      setSystemPlaying(state.speaking && state.activeId === audioId);
    });
  }, [audioId, vbeeEnabled]);

  const isPlaying = vbeeEnabled ? vbeeStatus.playing : systemPlaying;

  const handlePress = async () => {
    if (vbeeLoading) return;

    if (vbeeEnabled) {
      if (vbeeStatus.playing) {
        vbeePlayer.pause();
        return;
      }

      // Same audio already loaded — resume (or replay if finished) without
      // hitting the Vbee API again.
      if (vbeeStatus.isLoaded && synthesizedTextRef.current === text) {
        if (vbeeStatus.didJustFinish) {
          await vbeePlayer.seekTo(0);
        }
        vbeePlayer.play();
        return;
      }

      setVbeeLoading(true);
      try {
        const result = await synthesizeVbeeSpeech(text, {
          voiceCode: getVbeeJapaneseVoiceCode(),
        });
        synthesizedTextRef.current = text;
        vbeePlayer.replace({ uri: result.audioUrl });
        vbeePlayer.play();
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        if (message === 'not-configured') {
          const result = await playJapaneseAudio(text, audioId);
          if (result?.ok === false && result.reason === 'speech-error') {
            Alert.alert(AudioButtonText.speechErrorTitle, result.message);
            return;
          }
          if (result?.ok === false && result.reason === 'missing-ja-voice') {
            Alert.alert(
              AudioButtonText.missingVoiceTitle,
              AudioButtonText.missingVoiceMessage
            );
          }
          return;
        }
        Alert.alert(AudioButtonText.speechErrorTitle, message);
      } finally {
        setVbeeLoading(false);
      }
      return;
    }

    if (isPlaying) {
      await stopJapaneseAudio();
      return;
    }

    const result = await playJapaneseAudio(text, audioId);
    if (result?.ok === false && result.reason === 'speech-error') {
      Alert.alert(AudioButtonText.speechErrorTitle, result.message);
      return;
    }
    if (result?.ok === false && result.reason === 'missing-ja-voice') {
      Alert.alert(AudioButtonText.missingVoiceTitle, AudioButtonText.missingVoiceMessage);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, label ? styles.buttonWithLabel : null, { backgroundColor }]}
      onPress={() => void handlePress()}
      disabled={vbeeLoading}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {vbeeLoading ? (
        <ActivityIndicator size="small" color={color} />
      ) : (
        <Ionicons name={isPlaying ? 'pause' : 'volume-high'} size={size} color={color} />
      )}
      {label ? <Text style={[styles.label, { color }]}>{label}</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWithLabel: {
    width: 'auto',
    paddingHorizontal: 12,
    flexDirection: 'row',
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
});
