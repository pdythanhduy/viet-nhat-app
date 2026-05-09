import type { PhraseCategory } from '../../../../types/content';

const factory: PhraseCategory = {
    category: 'Công việc nhà máy',
    icon: 'construct',
    color: '#34495E',
    phrases: [
      { jp: '今日はラインに入ります。', romaji: 'Kyou wa rain ni hairimasu.', vn: 'Hôm nay tôi vào dây chuyền.' },
      { jp: '不良品は別にしてください。', romaji: 'Furyouhin wa betsu ni shite kudasai.', vn: 'Xin hãy tách hàng lỗi ra riêng.' },
      { jp: '数量をもう一度確認します。', romaji: 'Suuryou o mou ichido kakunin shimasu.', vn: 'Tôi sẽ kiểm tra lại số lượng một lần nữa.' },
      { jp: 'この機械を止めてもいいですか。', romaji: 'Kono kikai o tomete mo ii desu ka.', vn: 'Tôi có thể dừng máy này không?' },
      { jp: '休憩の後で梱包を始めます。', romaji: 'Kyuukei no ato de konpou o hajimemasu.', vn: 'Sau giờ nghỉ tôi sẽ bắt đầu đóng gói.' },
      { jp: '残業できません。予定があります。', romaji: 'Zangyou dekimasen. Yotei ga arimasu.', vn: 'Tôi không thể tăng ca. Tôi có việc.' },
    ],
    dialogue: {
      situation: 'Báo với quản lý chuyền về hàng lỗi',
      lines: [
        { speaker: 'A', speakerLabel: 'Bạn', jp: 'すみません。不良品がありました。確認をお願いします。', romaji: 'Sumimasen. Furyouhin ga arimashita. Kakunin o onegaishimasu.', vn: 'Xin lỗi, có hàng lỗi. Nhờ anh/chị kiểm tra giúp.' },
        { speaker: 'B', speakerLabel: 'Quản lý', jp: 'わかりました。箱を止めて、こちらに持ってきてください。', romaji: 'Wakarimashita. Hako o tomete, kochira ni motte kite kudasai.', vn: 'Đã rõ. Hãy giữ thùng đó lại rồi mang qua đây.' },
      ],
    },
  };

export default factory;
