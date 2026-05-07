import type { PhraseCategory } from '../../../../types/content';

const combini: PhraseCategory = {
    category: 'Combini và mua sắm',
    icon: 'basket',
    color: '#E67E22',
    phrases: [
      { jp: 'これをください。', romaji: 'Kore o kudasai.', vn: 'Cho tôi món này.' },
      { jp: '袋はいりません。', romaji: 'Fukuro wa irimasen.', vn: 'Tôi không cần túi.' },
      { jp: 'レシートをください。', romaji: 'Reshiito o kudasai.', vn: 'Cho tôi xin hóa đơn.' },
      { jp: '温めてもらえますか。', romaji: 'Atatamete moraemasu ka.', vn: 'Bạn có thể hâm nóng giúp tôi không?' },
      { jp: 'カードで払えますか。', romaji: 'Kaado de haraemasu ka.', vn: 'Có thể thanh toán bằng thẻ không?' },
      { jp: 'これはいくらですか。', romaji: 'Kore wa ikura desu ka.', vn: 'Món này bao nhiêu tiền?' },
    ],
    dialogue: {
      situation: 'Mua cơm hộp ở combini',
      lines: [
        {
          speaker: 'A',
          speakerLabel: 'Bạn',
          jp: 'すみません。このお弁当を温めてもらえますか。',
          romaji: 'Sumimasen. Kono obentou o atatamete moraemasu ka.',
          vn: 'Xin lỗi, bạn có thể hâm nóng hộp cơm này giúp tôi không?',
        },
        {
          speaker: 'B',
          speakerLabel: 'Nhân viên',
          jp: 'はい。お支払いはどうされますか。',
          romaji: 'Hai. Oshiharai wa dou saremasu ka.',
          vn: 'Vâng. Bạn muốn thanh toán bằng cách nào ạ?',
        },
      ],
    },
  };

export default combini;
