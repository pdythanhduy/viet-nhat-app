import type { PhraseCategory } from '../../../../types/content';

const comprehension: PhraseCategory = {
    category: 'Khi không hiểu',
    icon: 'chatbubbles',
    color: '#2980B9',
    phrases: [
      { jp: '分かりました。', romaji: 'Wakarimashita.', vn: 'Tôi hiểu rồi.' },
      { jp: '分かりません。', romaji: 'Wakarimasen.', vn: 'Tôi chưa hiểu.' },
      { jp: 'もう一度お願いします。', romaji: 'Mou ichido onegaishimasu.', vn: 'Xin nói lại một lần nữa.' },
      { jp: 'ゆっくり話してください。', romaji: 'Yukkuri hanashite kudasai.', vn: 'Xin hãy nói chậm hơn.' },
      { jp: '書いていただけますか。', romaji: 'Kaite itadakemasu ka.', vn: 'Bạn có thể viết ra giúp tôi không?' },
      { jp: '少し日本語が分かります。', romaji: 'Sukoshi nihongo ga wakarimasu.', vn: 'Tôi hiểu một ít tiếng Nhật.' },
    ],
  };

export default comprehension;
