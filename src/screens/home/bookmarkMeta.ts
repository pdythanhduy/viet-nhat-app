// Pure presentation mapping for the Home "Đã lưu" / "Đã ghim" rows.
//
// Extracted from HomeScreen so the orchestrator screen stays focused
// on navigation + state. This helper has no side effects and no
// navigation deps — every caller maps `Bookmark → { label, title,
// icon, color }` the same way.

import type { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import type { Bookmark } from '../../utils/bookmarks';

export interface BookmarkMeta {
  label: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export function getBookmarkMeta(bookmark: Bookmark): BookmarkMeta {
  if (bookmark.type === 'guide') {
    return {
      label: 'Thủ tục',
      title: bookmark.title,
      icon: 'document-text-outline',
      color: bookmark.color,
    };
  }

  if (bookmark.type === 'daily-life') {
    return {
      label: 'Cuộc sống',
      title: bookmark.title,
      icon: 'sunny-outline',
      color: bookmark.color,
    };
  }

  if (bookmark.type === 'dialogue') {
    return {
      label: 'Hội thoại',
      title: bookmark.situation,
      icon: 'chatbubbles-outline',
      color: Colors.primary,
    };
  }

  return {
    label: 'Tiếng Nhật',
    title: bookmark.vn,
    icon: 'language-outline',
    color: Colors.primary,
  };
}
