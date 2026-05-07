import type { DailyLifeTopic } from '../../../../types/content';

const banking: DailyLifeTopic = {
    id: 'banking',
    title: 'ATM và chuyển tiền hằng ngày',
    titleJp: 'ATM・日常の送金',
    icon: 'cash',
    color: '#9B59B6',
    description: 'Rút tiền, furikomi, hóa đơn và các lỗi rất dễ làm tài khoản bị phiền.',
    sections: [
      {
        title: 'Dùng tài khoản hằng ngày cho gọn',
        content: 'Ở Nhật, tài khoản ngân hàng gắn trực tiếp với lương, tiền nhà và nhiều hóa đơn sinh hoạt.',
        items: [
          'Nên biết rõ app nào dùng để xem số dư, chuyển khoản và kiểm tra lịch sử giao dịch.',
          'Nhiều hóa đơn điện, nước, điện thoại có thể cài tự trừ để đỡ quên hạn.',
          'Combini ATM tiện nhưng có thể tính phí theo giờ hoặc theo ngân hàng.',
        ],
        tip: 'Sau khi mở tài khoản, hãy thử đăng nhập app và làm một giao dịch nhỏ để chắc chắn mọi thứ đã hoạt động.',
        image: require('../../../../../assets/content/daily-life/dl_banking_s1.jpg'),
        imageCaption: 'ATM tại combini (セブン銀行・ゆうちょ銀行) — dùng được 24/7, một số ngân hàng tính phí ngoài giờ hành chính',
      },
      {
        title: 'Điền form furikomi (振込) — từng trường cụ thể',
        content:
          'Chuyển khoản nội địa Nhật có 5 trường bắt buộc. Sai ở 預金種目 hoặc 口座名義 là hai lỗi phổ biến nhất — tiền không đến hoặc bị hoàn về.',
        items: [
          '① 金融機関名 — tên ngân hàng người nhận: "みずほ銀行", "三菱UFJ銀行", "ゆうちょ銀行", "PayPay銀行"... Phải đúng tên đầy đủ bằng tiếng Nhật.',
          '② 支店名 — tên chi nhánh: ví dụ "新宿支店", "渋谷支店". Tra trong app ngân hàng người nhận hoặc hỏi trực tiếp — không đoán. Sai chi nhánh là chuyển nhầm.',
          '③ 預金種目 — loại tài khoản: gần như luôn chọn 普通 (thông thường / savings). 当座 là tài khoản đặc biệt dành cho doanh nghiệp — chọn nhầm tiền sẽ không đến nơi.',
          '④ 口座番号 — số tài khoản: thường 7 chữ số. Nếu số ngắn hơn, thêm số 0 ở đầu. Ví dụ nhận được "12345" → nhập "0012345".',
          '⑤ 口座名義 — tên người nhận bằng KATAKANA: ví dụ "グエン バン ア" (Nguyễn Văn A). Viết họ trước, tên sau, cách nhau bằng dấu cách. Hệ thống đối chiếu tên với hồ sơ ngân hàng — sai một ký tự là bị từ chối tự động.',
        ],
        tip: 'Khi nhận thông tin tài khoản từ ai đó, xin ảnh chụp màn hình trong app ngân hàng của họ thay vì gõ tay qua tin nhắn — tránh nhầm số và nhầm ký tự katakana.',
        image: require('../../../../../assets/content/daily-life/dl_banking_s2.jpg'),
        imageCaption: 'Màn hình chuyển khoản (振込) — cần đúng tên ngân hàng, chi nhánh, số tài khoản và tên người nhận bằng kana',
      },
      {
        title: 'Điều tuyệt đối không nên làm',
        content: 'Đây không chỉ là mẹo sinh hoạt mà còn là ranh giới an toàn pháp lý.',
        items: [
          'Không cho người khác mượn tài khoản, thẻ ATM, app ngân hàng hoặc mã OTP.',
          'Không nhận tiền hộ cho người lạ nếu bạn không hiểu rõ giao dịch.',
          'Không bán hoặc chuyển nhượng tài khoản cũ khi bạn đổi việc hoặc sắp về nước.',
        ],
        tip: 'Nếu muốn tìm hiểu sâu hơn về chống khóa tài khoản và anti-fraud, đã có guide riêng trong tab Thủ tục.',
      },
    ],
  };

export default banking;
