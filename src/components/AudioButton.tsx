import React from 'react';
import { Alert } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
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
  color?: string;
  backgroundColor?: string;
  size?: number;
}

export default function AudioButton({
  audioId,
  text,
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
    if (result?.ok === false && result.reason === 'missing-ja-voice') {
      Alert.alert(
        'Thiết bị chưa có giọng Nhật',
        'Máy này hiện chưa có voice tiếng Nhật để phát âm. Hãy cài thêm Japanese TTS voice trong phần ngôn ngữ/giọng nói của thiết bị rồi thử lại.'
      );
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={() => void handlePress()}
      activeOpacity={0.85}
    >
      <Ionicons name={isPlaying ? 'pause' : 'volume-high'} size={size} color={color} />
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
});
