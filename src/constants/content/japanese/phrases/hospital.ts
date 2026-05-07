import type { PhraseCategory } from '../../../../types/content';

const hospital: PhraseCategory = {
    category: 'Đi khám và bệnh viện',
    icon: 'medical',
    color: '#C0392B',
    phrases: [
      { jp: '具合が悪いです。', romaji: 'Guai ga warui desu.', vn: 'Tôi cảm thấy không khỏe.' },
      { jp: '熱があります。', romaji: 'Netsu ga arimasu.', vn: 'Tôi bị sốt.' },
      { jp: 'のどが痛いです。', romaji: 'Nodo ga itai desu.', vn: 'Tôi bị đau họng.' },
      { jp: '保険証を持っています。', romaji: 'Hokenshou o motte imasu.', vn: 'Tôi có mang thẻ bảo hiểm.' },
      { jp: '予約しています。', romaji: 'Yoyaku shite imasu.', vn: 'Tôi đã đặt lịch.' },
      { jp: '今日は診てもらえますか。', romaji: 'Kyou wa mite moraemasu ka.', vn: 'Hôm nay tôi có thể được khám không?' },
    ],
    dialogue: {
      situation: 'Tại quầy tiếp nhận phòng khám',
      lines: [
        {
          speaker: 'B',
          speakerLabel: 'Lễ tân',
          jp: '今日はどうされましたか。',
          romaji: 'Kyou wa dou saremashita ka.',
          vn: 'Hôm nay bạn bị làm sao ạ?',
        },
        {
          speaker: 'A',
          speakerLabel: 'Bạn',
          jp: '熱があって、のどが痛いです。',
          romaji: 'Netsu ga atte, nodo ga itai desu.',
          vn: 'Tôi bị sốt và đau họng.',
        },
      ],
    },
  };

export default hospital;
