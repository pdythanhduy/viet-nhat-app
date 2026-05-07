import type { PhraseCategory } from '../../../../types/content';

const callCompany: PhraseCategory = {
    category: 'Gọi công ty để báo vắng hoặc báo trễ',
    icon: 'call',
    color: '#8E44AD',
    phrases: [
      { jp: '本日お休みをいただきたいです。', romaji: 'Honjitsu oyasumi o itadakitai desu.', vn: 'Hôm nay tôi muốn xin nghỉ.' },
      { jp: '電車の遅延で少し遅れます。', romaji: 'Densha no chien de sukoshi okuremasu.', vn: 'Tôi sẽ đến muộn một chút vì tàu bị trễ.' },
      { jp: '病院に行ってから連絡します。', romaji: 'Byouin ni itte kara renraku shimasu.', vn: 'Tôi sẽ đi bệnh viện rồi liên lạc lại.' },
      { jp: '必要であれば診断書を提出します。', romaji: 'Hitsuyou de areba shindansho o teishutsu shimasu.', vn: 'Nếu cần, tôi sẽ nộp giấy chứng nhận y tế.' },
      { jp: '担当者にお伝えください。', romaji: 'Tantousha ni otsutae kudasai.', vn: 'Xin nhắn lại với người phụ trách giúp tôi.' },
    ],
    dialogue: {
      situation: 'Gọi báo nghỉ trong ngày',
      lines: [
        {
          speaker: 'A',
          speakerLabel: 'Bạn',
          jp: 'おはようございます。体調が悪いため、本日お休みをいただきたいです。',
          romaji: 'Ohayou gozaimasu. Taichou ga warui tame, honjitsu oyasumi o itadakitai desu.',
          vn: 'Chào buổi sáng. Vì sức khỏe không tốt nên hôm nay tôi muốn xin nghỉ.',
        },
        {
          speaker: 'B',
          speakerLabel: 'Công ty',
          jp: '分かりました。落ち着いたら連絡してください。',
          romaji: 'Wakarimashita. Ochitsuitara renraku shite kudasai.',
          vn: 'Đã rõ. Khi ổn hơn thì báo lại cho công ty nhé.',
        },
      ],
    },
  };

export default callCompany;
