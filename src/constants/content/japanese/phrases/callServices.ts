import type { PhraseCategory } from '../../../../types/content';

const callServices: PhraseCategory = {
    category: 'Gọi nhà mạng, quản lý nhà hoặc bưu điện',
    icon: 'call',
    color: '#2874A6',
    phrases: [
      { jp: 'インターネットが使えません。', romaji: 'Intaanetto ga tsukaemasen.', vn: 'Internet không dùng được.' },
      { jp: '契約内容を確認したいです。', romaji: 'Keiyaku naiyou o kakunin shitai desu.', vn: 'Tôi muốn kiểm tra nội dung hợp đồng.' },
      { jp: '設備が故障しています。', romaji: 'Setsubi ga koshou shite imasu.', vn: 'Thiết bị đang bị hỏng.' },
      { jp: '再配達をお願いします。', romaji: 'Saihaitatsu o onegaishimasu.', vn: 'Xin giao lại hàng giúp tôi.' },
      { jp: '受付番号を教えてください。', romaji: 'Uketsuke bangou o oshiete kudasai.', vn: 'Xin cho tôi mã tiếp nhận.' },
    ],
    dialogue: {
      situation: 'Gọi báo internet bị lỗi',
      lines: [
        {
          speaker: 'A',
          speakerLabel: 'Bạn',
          jp: 'インターネットがつながらないので、確認をお願いしたいです。',
          romaji: 'Intaanetto ga tsunagaranai node, kakunin o onegai shitai desu.',
          vn: 'Internet không kết nối được nên tôi muốn nhờ kiểm tra giúp.',
        },
        {
          speaker: 'B',
          speakerLabel: 'Nhà mạng',
          jp: 'ご契約者名と電話番号をお願いします。',
          romaji: 'Gokeiyakusha mei to denwa bangou o onegaishimasu.',
          vn: 'Xin cho tôi tên người đứng hợp đồng và số điện thoại.',
        },
      ],
    },
  };

export default callServices;
