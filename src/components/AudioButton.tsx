import React from 'react';
import { Alert } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../constants/colors';
import {
  getJapaneseAudioState,
  playJapaneseAudio,
  stopJapaneseAudio,
  subscribeJapaneseAudio,
} from '../utils/audio';

interface AudioButtonProps {
  audioId: string;
  text: string;
  label?: string;
  color?: string;
  backgroundColor?: string;
  size?: number;
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
}: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = React.useState(() => {
    const state = getJapaneseAudioState();
    return state.speaking && state.activeId === audioId;
  });

  React.useEffect(() => {
    return subscribeJapaneseAudio((state) => {
      setIsPlaying(state.speaking && state.activeId === audioId);
    });
  }, [audioId]);

  const handlePress = async () => {
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
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Ionicons name={isPlaying ? 'pause' : 'volume-high'} size={size} color={color} />
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
