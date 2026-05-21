import { getBookmarkMeta } from './bookmarkMeta';
import { Colors } from '../../constants/colors';
import type {
  DailyLifeBookmark,
  DialogueBookmark,
  GuideBookmark,
  PhraseBookmark,
} from '../../utils/bookmarks';

describe('getBookmarkMeta', () => {
  it('maps guide bookmarks to Thủ tục with the guide color', () => {
    const guide: GuideBookmark = {
      type: 'guide',
      id: 'residence-card',
      title: 'Gia hạn thẻ cư trú',
      titleJp: '在留期間更新申請',
      description: '...',
      color: '#185FA5',
      savedAt: '2026-05-21T00:00:00.000Z',
    };
    expect(getBookmarkMeta(guide)).toEqual({
      label: 'Thủ tục',
      title: 'Gia hạn thẻ cư trú',
      icon: 'document-text-outline',
      color: '#185FA5',
    });
  });

  it('maps daily-life bookmarks to Cuộc sống with the topic color', () => {
    const topic: DailyLifeBookmark = {
      type: 'daily-life',
      id: 'garbage',
      title: 'Phân loại rác',
      titleJp: 'ゴミ分別',
      description: '...',
      color: '#27AE60',
      savedAt: '2026-05-21T00:00:00.000Z',
    };
    expect(getBookmarkMeta(topic)).toEqual({
      label: 'Cuộc sống',
      title: 'Phân loại rác',
      icon: 'sunny-outline',
      color: '#27AE60',
    });
  });

  it('maps dialogue bookmarks to Hội thoại using situation (not vn) as title', () => {
    const dialogue: DialogueBookmark = {
      type: 'dialogue',
      id: 'clinic-visit',
      category: 'Y tế',
      situation: 'Đặt lịch khám bệnh viện',
      lines: [],
      savedAt: '2026-05-21T00:00:00.000Z',
    };
    expect(getBookmarkMeta(dialogue)).toEqual({
      label: 'Hội thoại',
      title: 'Đặt lịch khám bệnh viện',
      icon: 'chatbubbles-outline',
      color: Colors.primary,
    });
  });

  it('maps phrase bookmarks to Tiếng Nhật using vn as title', () => {
    const phrase: PhraseBookmark = {
      type: 'phrase',
      id: 'sumimasen',
      jp: 'すみません',
      romaji: 'sumimasen',
      vn: 'Xin lỗi / Cho hỏi',
      category: 'Giao tiếp hằng ngày',
      savedAt: '2026-05-21T00:00:00.000Z',
    };
    expect(getBookmarkMeta(phrase)).toEqual({
      label: 'Tiếng Nhật',
      title: 'Xin lỗi / Cho hỏi',
      icon: 'language-outline',
      color: Colors.primary,
    });
  });
});
