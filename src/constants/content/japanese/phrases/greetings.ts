import type { PhraseCategory } from '../../../../types/content';

const greetings: PhraseCategory = {
    category: 'Chào hỏi cơ bản',
    icon: 'hand-left',
    color: '#185FA5',
    phrases: [
      { jp: 'おはようございます。', romaji: 'Ohayou gozaimasu.', vn: 'Chào buổi sáng.' },
      { jp: 'こんにちは。', romaji: 'Konnichiwa.', vn: 'Xin chào / chào buổi ngày.' },
      { jp: 'こんばんは。', romaji: 'Konbanwa.', vn: 'Chào buổi tối.' },
      { jp: 'ありがとうございます。', romaji: 'Arigatou gozaimasu.', vn: 'Cảm ơn.' },
      { jp: 'すみません。', romaji: 'Sumimasen.', vn: 'Xin lỗi / làm phiền.' },
      { jp: 'よろしくお願いします。', romaji: 'Yoroshiku onegaishimasu.', vn: 'Mong được giúp đỡ.' },
    ],
  };

export default greetings;
