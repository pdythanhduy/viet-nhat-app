import type { PhraseCategory } from '../../../../types/content';

const documents: PhraseCategory = {
    category: 'Bị hỏi giấy tờ hoặc thông tin cá nhân',
    icon: 'card',
    color: '#1F618D',
    phrases: [
      { jp: '在留カードは持っています。', romaji: 'Zairyuu kaado wa motte imasu.', vn: 'Tôi có mang thẻ cư trú.' },
      { jp: 'パスポートも必要ですか。', romaji: 'Pasupooto mo hitsuyou desu ka.', vn: 'Có cần cả hộ chiếu không?' },
      { jp: '住所確認の書類はこれで大丈夫ですか。', romaji: 'Juusho kakunin no shorui wa kore de daijoubu desu ka.', vn: 'Giấy xác nhận địa chỉ này đã đủ chưa?' },
      { jp: 'コピーではなく原本が必要ですか。', romaji: 'Kopii de wa naku genpon ga hitsuyou desu ka.', vn: 'Có cần bản gốc chứ không phải bản copy đúng không?' },
      { jp: '今日は足りない書類だけ確認したいです。', romaji: 'Kyou wa tarinai shorui dake kakunin shitai desu.', vn: 'Hôm nay tôi chỉ muốn xác nhận những giấy tờ còn thiếu.' },
      { jp: '持ってくるものをメモしてもいいですか。', romaji: 'Motte kuru mono o memo shite mo ii desu ka.', vn: 'Tôi ghi lại những thứ cần mang tới có được không?' },
    ],
    dialogue: {
      situation: 'Khi bị yêu cầu bổ sung giấy tờ',
      lines: [
        {
          speaker: 'B',
          speakerLabel: 'Nhân viên',
          jp: '住所確認の書類をお願いします。',
          romaji: 'Juusho kakunin no shorui o onegaishimasu.',
          vn: 'Xin vui lòng cho tôi giấy xác nhận địa chỉ.',
        },
        {
          speaker: 'A',
          speakerLabel: 'Bạn',
          jp: '住民票で大丈夫ですか。',
          romaji: 'Juuminhyou de daijoubu desu ka.',
          vn: 'Giấy cư trú có được không?',
        },
      ],
    },
  };

export default documents;
