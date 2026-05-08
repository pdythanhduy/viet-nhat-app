import type { PhraseCategory } from '../../../../types/content';

const cityHall: PhraseCategory = {
    category: 'Cơ quan và giấy tờ',
    icon: 'business',
    color: '#117A65',
    phrases: [
      { jp: '住所変更の手続きをしたいです。', romaji: 'Juusho henkou no tetsuzuki o shitai desu.', vn: 'Tôi muốn làm thủ tục đổi địa chỉ.' },
      { jp: '住民票を一通ください。', romaji: 'Juuminhyou o ittuu kudasai.', vn: 'Cho tôi xin một bản giấy cư trú.' },
      { jp: 'マイナンバーカードについて聞きたいです。', romaji: 'Mainanbaa kaado ni tsuite kikitai desu.', vn: 'Tôi muốn hỏi về thẻ My Number.' },
      { jp: '国民健康保険に入りたいです。', romaji: 'Kokumin kenkou hoken ni hairitai desu.', vn: 'Tôi muốn tham gia bảo hiểm y tế quốc dân.' },
      { jp: '何番の窓口ですか。', romaji: 'Nanban no madoguchi desu ka.', vn: 'Là quầy số mấy?' },
      { jp: '今日中に終わりますか。', romaji: 'Kyoujuu ni owarimasu ka.', vn: 'Hôm nay có làm xong trong ngày không?' },
    ],
    dialogue: {
      situation: 'Đổi địa chỉ tại 市役所/区役所',
      lines: [
        {
          speaker: 'A',
          speakerLabel: 'Bạn',
          jp: '引っ越したので、住所変更をしたいです。',
          romaji: 'Hikkoshita node, juusho henkou o shitai desu.',
          vn: 'Tôi vừa chuyển nhà nên muốn đổi địa chỉ.',
        },
        {
          speaker: 'B',
          speakerLabel: 'Nhân viên',
          jp: '在留カードとマイナンバーカードはお持ちですか。',
          romaji: 'Zairyuu kaado to mainanbaa kaado wa omochi desu ka.',
          vn: 'Bạn có mang theo thẻ cư trú và thẻ My Number không?',
        },
      ],
    },
  };

export default cityHall;
