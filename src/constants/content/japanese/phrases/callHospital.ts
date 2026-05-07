import type { PhraseCategory } from '../../../../types/content';

const callHospital: PhraseCategory = {
    category: 'Gọi điện cho bệnh viện hoặc phòng khám',
    icon: 'call',
    color: '#C0392B',
    phrases: [
      { jp: '今日受診できますか。', romaji: 'Kyou jushin dekimasu ka.', vn: 'Hôm nay tôi có thể đến khám không?' },
      { jp: '初診です。', romaji: 'Shoshin desu.', vn: 'Tôi khám lần đầu.' },
      { jp: '保険証を持っています。', romaji: 'Hokenshou o motte imasu.', vn: 'Tôi có mang thẻ bảo hiểm.' },
      { jp: '何を持っていけばいいですか。', romaji: 'Nani o motte ikeba ii desu ka.', vn: 'Tôi cần mang theo gì?' },
      { jp: '日本語があまり上手ではありません。', romaji: 'Nihongo ga amari jouzu de wa arimasen.', vn: 'Tiếng Nhật của tôi chưa tốt lắm.' },
    ],
    dialogue: {
      situation: 'Gọi điện đặt lịch khám',
      lines: [
        {
          speaker: 'A',
          speakerLabel: 'Bạn',
          jp: 'もしもし、今日受診できますか。熱があります。',
          romaji: 'Moshi moshi, kyou jushin dekimasu ka. Netsu ga arimasu.',
          vn: 'Alo, hôm nay tôi có thể đến khám không? Tôi đang bị sốt.',
        },
        {
          speaker: 'B',
          speakerLabel: 'Phòng khám',
          jp: 'はい。保険証を持って、午後3時に来てください。',
          romaji: 'Hai. Hokenshou o motte, gogo sanji ni kite kudasai.',
          vn: 'Vâng. Hãy mang theo thẻ bảo hiểm và đến lúc 3 giờ chiều.',
        },
      ],
    },
  };

export default callHospital;
