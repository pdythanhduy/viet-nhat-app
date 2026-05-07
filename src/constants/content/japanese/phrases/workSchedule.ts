import type { PhraseCategory } from '../../../../types/content';

const workSchedule: PhraseCategory = {
    category: 'Xin nghỉ, đi trễ và đổi ca',
    icon: 'time',
    color: '#9B59B6',
    phrases: [
      { jp: '今日は体調が悪くて休みたいです。', romaji: 'Kyou wa taichou ga warukute yasumitai desu.', vn: 'Hôm nay tôi không khỏe và muốn xin nghỉ.' },
      { jp: '電車が遅れていて、少し遅れます。', romaji: 'Densha ga okurete ite, sukoshi okuremasu.', vn: 'Tàu đang trễ nên tôi sẽ đến muộn một chút.' },
      { jp: '今日は出勤が難しいです。', romaji: 'Kyou wa shukkin ga muzukashii desu.', vn: 'Hôm nay tôi khó có thể đi làm.' },
      { jp: 'シフトを相談したいです。', romaji: 'Shifuto o soudan shitai desu.', vn: 'Tôi muốn trao đổi về ca làm.' },
      { jp: '有給を使えるか確認したいです。', romaji: 'Yuukyuu o tsukaeru ka kakunin shitai desu.', vn: 'Tôi muốn xác nhận xem có thể dùng phép năm không.' },
      { jp: '何時ごろ着きそうですか。', romaji: 'Nanji goro tsukisou desu ka.', vn: 'Bạn dự kiến sẽ đến lúc mấy giờ?' },
    ],
    dialogue: {
      situation: 'Báo đi trễ với công ty',
      lines: [
        {
          speaker: 'A',
          speakerLabel: 'Bạn',
          jp: 'おはようございます。電車が遅れていて、10分ほど遅れます。',
          romaji: 'Ohayou gozaimasu. Densha ga okurete ite, juppun hodo okuremasu.',
          vn: 'Chào buổi sáng. Tàu đang trễ nên tôi sẽ đến muộn khoảng 10 phút.',
        },
        {
          speaker: 'B',
          speakerLabel: 'Công ty',
          jp: '分かりました。着いたら連絡してください。',
          romaji: 'Wakarimashita. Tsuitara renraku shite kudasai.',
          vn: 'Đã rõ. Khi đến nơi thì báo lại nhé.',
        },
      ],
    },
  };

export default workSchedule;
