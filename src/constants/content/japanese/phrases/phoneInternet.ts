import type { PhraseCategory } from '../../../../types/content';

const phoneInternet: PhraseCategory = {
    category: 'Điện thoại và internet',
    icon: 'wifi',
    color: '#2874A6',
    phrases: [
      { jp: 'SIMを契約したいです。', romaji: 'SIM o keiyaku shitai desu.', vn: 'Tôi muốn làm hợp đồng SIM.' },
      { jp: '月額料金はいくらですか。', romaji: 'Getsugaku ryoukin wa ikura desu ka.', vn: 'Cước hàng tháng là bao nhiêu?' },
      { jp: '解約金はありますか。', romaji: 'Kaiyakukin wa arimasu ka.', vn: 'Có phí hủy hợp đồng không?' },
      { jp: 'インターネットがつながりません。', romaji: 'Intaanetto ga tsunagarimasen.', vn: 'Internet không kết nối được.' },
      { jp: '工事の日程を確認したいです。', romaji: 'Kouji no nittei o kakunin shitai desu.', vn: 'Tôi muốn xác nhận lịch lắp đặt.' },
      { jp: '本人確認書類は何が必要ですか。', romaji: 'Honnin kakunin shorui wa nani ga hitsuyou desu ka.', vn: 'Cần giấy tờ gì để xác minh danh tính?' },
    ],
    dialogue: {
      situation: 'Hỏi nhà mạng khi đăng ký SIM',
      lines: [
        {
          speaker: 'A',
          speakerLabel: 'Bạn',
          jp: 'SIMを契約したいです。必要な書類を教えてください。',
          romaji: 'SIM o keiyaku shitai desu. Hitsuyou na shorui o oshiete kudasai.',
          vn: 'Tôi muốn đăng ký SIM. Xin cho tôi biết cần những giấy tờ gì.',
        },
        {
          speaker: 'B',
          speakerLabel: 'Nhân viên',
          jp: '在留カードと銀行口座が分かるものをお願いします。',
          romaji: 'Zairyuu kaado to ginkou kouza ga wakaru mono o onegaishimasu.',
          vn: 'Xin vui lòng mang thẻ cư trú và giấy tờ thể hiện tài khoản ngân hàng.',
        },
      ],
    },
  };

export default phoneInternet;
