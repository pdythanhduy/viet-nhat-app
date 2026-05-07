import type { PhraseCategory } from '../../../../types/content';

const construction: PhraseCategory = {
    category: 'Công việc xây dựng',
    icon: 'hammer',
    color: '#D35400',
    phrases: [
      { jp: 'ヘルメットと安全帯を着けてください。', romaji: 'Herumetto to anzentai o tsukete kudasai.', vn: 'Xin hãy đội mũ và đeo dây an toàn.' },
      { jp: 'この場所は危険です。', romaji: 'Kono basho wa kiken desu.', vn: 'Vị trí này nguy hiểm.' },
      { jp: '図面を見ながら寸法を確認します。', romaji: 'Zumen o minagara sunpou o kakunin shimasu.', vn: 'Tôi vừa xem bản vẽ vừa kiểm tra kích thước.' },
      { jp: '資材を二階へ運びます。', romaji: 'Shizai o nikai e hakobimasu.', vn: 'Tôi chuyển vật liệu lên tầng 2.' },
      { jp: '雨なので今日は休工です。', romaji: 'Ame na node kyou wa kyuukou desu.', vn: 'Hôm nay nghỉ thi công vì mưa.' },
      { jp: '朝礼の後で作業指示を確認しましょう。', romaji: 'Chourei no ato de sagyou shiji o kakunin shimashou.', vn: 'Sau họp sáng hãy xác nhận chỉ thị công việc.' },
    ],
    dialogue: {
      situation: 'Xin xác nhận an toàn trước khi làm trên cao',
      lines: [
        { speaker: 'A', speakerLabel: 'Bạn', jp: '高所作業の前に安全帯を確認したいです。', romaji: 'Kousho sagyou no mae ni anzentai o kakunin shitai desu.', vn: 'Trước khi làm trên cao tôi muốn kiểm tra dây an toàn.' },
        { speaker: 'B', speakerLabel: 'Giám sát', jp: 'いいです。足場の状態も一緒に見てください。', romaji: 'Ii desu. Ashiba no joutai mo issho ni mite kudasai.', vn: 'Được. Hãy kiểm tra luôn cả tình trạng giàn giáo.' },
      ],
    },
  };

export default construction;
