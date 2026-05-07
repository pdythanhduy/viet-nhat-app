import type { PhraseCategory } from '../../../../types/content';

const payroll: PhraseCategory = {
    category: 'Phiếu lương và làm thêm giờ',
    icon: 'receipt',
    color: '#7D3C98',
    phrases: [
      { jp: '今月の給料を確認したいです。', romaji: 'Kongetsu no kyuuryou o kakunin shitai desu.', vn: 'Tôi muốn kiểm tra lương tháng này.' },
      { jp: 'この控除は何ですか。', romaji: 'Kono koujo wa nan desu ka.', vn: 'Khoản khấu trừ này là gì?' },
      { jp: '残業時間が合っているか確認したいです。', romaji: 'Zangyou jikan ga atte iru ka kakunin shitai desu.', vn: 'Tôi muốn kiểm tra xem số giờ làm thêm có đúng không.' },
      { jp: '明細をもう一度説明してください。', romaji: 'Meisai o mou ichido setsumei shite kudasai.', vn: 'Xin giải thích lại phiếu lương cho tôi.' },
      { jp: '交通費は含まれていますか。', romaji: 'Koutsuuhi wa fukumarete imasu ka.', vn: 'Tiền đi lại đã được tính vào chưa?' },
      { jp: '書面でもらえますか。', romaji: 'Shomen de moraemasu ka.', vn: 'Tôi có thể nhận bằng văn bản không?' },
    ],
    dialogue: {
      situation: 'Hỏi lại phiếu lương',
      lines: [
        {
          speaker: 'A',
          speakerLabel: 'Bạn',
          jp: 'この控除について説明していただけますか。',
          romaji: 'Kono koujo ni tsuite setsumei shite itadakemasu ka.',
          vn: 'Anh/chị có thể giải thích khoản khấu trừ này giúp tôi không?',
        },
        {
          speaker: 'B',
          speakerLabel: 'Kế toán',
          jp: 'はい。こちらは社会保険料です。',
          romaji: 'Hai. Kochira wa shakai hokenryou desu.',
          vn: 'Vâng. Đây là tiền bảo hiểm xã hội.',
        },
      ],
    },
  };

export default payroll;
