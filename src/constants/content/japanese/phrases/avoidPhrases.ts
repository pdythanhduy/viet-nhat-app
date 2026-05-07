import type { PhraseCategory } from '../../../../types/content';

const avoidPhrases: PhraseCategory = {
    category: 'Câu nên tránh hoặc nên đổi cách nói',
    icon: 'warning',
    color: '#B9770E',
    phrases: [
      { jp: '無理です。', romaji: 'Muri desu.', vn: 'Câu này khá gắt. Thường nên đổi thành “今は難しいです”.' },
      { jp: '知りません。', romaji: 'Shirimasen.', vn: 'Dễ tạo cảm giác cộc. Nên dùng “ちょっと分かりません”.' },
      { jp: 'できません。', romaji: 'Dekimasen.', vn: 'Nếu cần mềm hơn, dùng “今は難しいです” hoặc “確認します”.' },
      { jp: '違います。', romaji: 'Chigaimasu.', vn: 'Nếu muốn lịch sự hơn, nói “少し違うと思います”.' },
    ],
  };

export default avoidPhrases;
