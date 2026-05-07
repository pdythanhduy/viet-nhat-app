import type { PhraseCategory } from '../../../../types/content';

const trainDelay: PhraseCategory = {
    category: 'Trễ tàu, lạc ga và đi nhầm tuyến',
    icon: 'alert-circle',
    color: '#D35400',
    phrases: [
      { jp: '電車が遅れています。', romaji: 'Densha ga okurete imasu.', vn: 'Tàu đang bị trễ.' },
      { jp: '道に迷いました。', romaji: 'Michi ni mayoimashita.', vn: 'Tôi bị lạc đường.' },
      { jp: '反対方向に乗ってしまいました。', romaji: 'Hantai houkou ni notte shimaimashita.', vn: 'Tôi đã lên nhầm chiều.' },
      { jp: 'このホームで合っていますか。', romaji: 'Kono hoomu de atte imasu ka.', vn: 'Đứng ở sân ga này có đúng không?' },
      { jp: '次はどこで降りればいいですか。', romaji: 'Tsugi wa doko de orireba ii desu ka.', vn: 'Tiếp theo tôi nên xuống ở đâu?' },
      { jp: '遅延証明書をもらいたいです。', romaji: 'Chien shoumeisho o moraitai desu.', vn: 'Tôi muốn lấy giấy xác nhận tàu trễ.' },
    ],
    dialogue: {
      situation: 'Hỏi nhân viên nhà ga khi đi nhầm tuyến',
      lines: [
        {
          speaker: 'A',
          speakerLabel: 'Bạn',
          jp: 'すみません。反対方向に乗ってしまいました。',
          romaji: 'Sumimasen. Hantai houkou ni notte shimaimashita.',
          vn: 'Xin lỗi, tôi đã lên nhầm chiều tàu.',
        },
        {
          speaker: 'B',
          speakerLabel: 'Nhân viên ga',
          jp: '次の駅で降りて、向かい側のホームに行ってください。',
          romaji: 'Tsugi no eki de orite, mukai gawa no hoomu ni itte kudasai.',
          vn: 'Hãy xuống ở ga tiếp theo rồi sang sân ga đối diện nhé.',
        },
      ],
    },
  };

export default trainDelay;
