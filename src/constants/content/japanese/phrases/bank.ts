import type { PhraseCategory } from '../../../../types/content';

const bank: PhraseCategory = {
    category: 'Ngân hàng và chuyển tiền',
    icon: 'wallet',
    color: '#1ABC9C',
    phrases: [
      { jp: '口座を開設したいです。', romaji: 'Kouza o kaisetsu shitai desu.', vn: 'Tôi muốn mở tài khoản.' },
      { jp: '必要な書類を教えてください。', romaji: 'Hitsuyou na shorui o oshiete kudasai.', vn: 'Xin cho tôi biết cần những giấy tờ gì.' },
      { jp: '海外送金をしたいです。', romaji: 'Kaigai soukin o shitai desu.', vn: 'Tôi muốn chuyển tiền ra nước ngoài.' },
      { jp: '審査にどのくらいかかりますか。', romaji: 'Shinsa ni dono kurai kakarimasu ka.', vn: 'Xét duyệt mất khoảng bao lâu?' },
      { jp: '今日は申し込みだけできますか。', romaji: 'Kyou wa moushikomi dake dekimasu ka.', vn: 'Hôm nay tôi chỉ làm bước đăng ký trước có được không?' },
      { jp: '理由を教えていただけますか。', romaji: 'Riyuu o oshiete itadakemasu ka.', vn: 'Anh/chị có thể cho tôi biết lý do được không?' },
    ],
    dialogue: {
      situation: 'Bị yêu cầu bổ sung giấy tờ khi mở tài khoản',
      lines: [
        {
          speaker: 'B',
          speakerLabel: 'Ngân hàng',
          jp: '追加で住所確認書類が必要です。',
          romaji: 'Tsuika de juusho kakunin shorui ga hitsuyou desu.',
          vn: 'Chúng tôi cần bổ sung giấy xác nhận địa chỉ.',
        },
        {
          speaker: 'A',
          speakerLabel: 'Bạn',
          jp: '住民票を持ってくれば大丈夫ですか。',
          romaji: 'Juuminhyou o motte kureba daijoubu desu ka.',
          vn: 'Nếu tôi mang giấy cư trú tới thì có được không?',
        },
      ],
    },
  };

export default bank;
