import type { DailyLifeTopic } from '../../../../types/content';

const utilities: DailyLifeTopic = {
    id: 'utilities',
    title: 'Điện, nước, gas và internet',
    titleJp: '電気・水道・ガス・インターネット',
    icon: 'flash',
    color: '#16A085',
    description: 'Tên nhà cung cấp thực tế theo vùng, thứ tự ưu tiên mở dịch vụ, chi phí trung bình và lỗi hay gặp.',
    sections: [
      {
        title: 'Thứ tự ưu tiên khi mới chuyển nhà',
        content:
          'Gas phải đặt lịch với kỹ thuật viên — cái này dễ bị quên nhất và làm tối đầu tiên không có nước nóng.',
        items: [
          '1. Gas (ガス): gọi điện hoặc đăng ký online cho công ty gas khu vực TRƯỚC ngày chuyển vào ít nhất 3–5 ngày làm việc. Cần có mặt tại nhà khi kỹ thuật viên đến mở van — không tự mở được. Tokyo Gas: 0570-002211 | Osaka Gas: 0120-0-94817 | các tỉnh khác tra "○○ガス 開栓" trên Google.',
          '2. Điện (電気): đăng ký online trên trang công ty điện khu vực — thường có form tiếng Nhật và xử lý trong 1–2 ngày. Không cần kỹ thuật viên đến nhà. Tokyo/Kanto: TEPCO (tepco.co.jp) | Kansai: 関西電力 (kepco.co.jp) | Chubu: 中部電力 (chuden.co.jp).',
          '3. Nước (水道): đăng ký với 水道局 (cục nước) của thành phố/quận — thường có form online hoặc điện thoại. Nhiều nơi nước đã được mở sẵn, chỉ cần đăng ký tên người dùng để nhận hóa đơn.',
          '4. Internet: hỏi rõ khi xem nhà — nhà có 光回線 (cáp quang) sẵn hay phải tự đăng ký mới. Nếu phải tự đăng ký, cần đặt trước 2–4 tuần vì có thể cần kỹ thuật viên đến lắp đặt.',
        ],
        tip: 'Trong lúc chờ internet cố định, dùng data điện thoại (pocket wifi hoặc tethering) để không bị đứt mạng. Một số nhà mạng cho mượn thiết bị pocket wifi trong thời gian chờ.',
        image: require('../../../../../assets/content/daily-life/dl_utilities_s1.jpg'),
        imageCaption: 'ガス開栓・引越し手続き — gas phải đặt lịch kỹ thuật viên trước ngày chuyển vào, không tự mở được',
      },
      {
        title: 'Chi phí điện, gas, nước trung bình tham khảo',
        content:
          'Con số này phụ thuộc vào vùng, mùa, diện tích và thói quen — nhưng giúp bạn có khung tham chiếu.',
        items: [
          'Điện: căn hộ 1K–1DK người sống một mình thường 2.000–5.000 yên/tháng mùa hè/thu. Mùa đông dùng sưởi điện hoặc điều hòa heating có thể tăng lên 6.000–10.000 yên.',
          'Gas: tùy loại bếp và có dùng máy nước nóng gas không. Thông thường 1.500–4.000 yên/tháng cho 1 người.',
          'Nước: thường 1.000–2.000 yên/tháng (hóa đơn thường 2 tháng/lần, tức 2.000–4.000 yên mỗi lần nhận).',
          'Internet cố định (hikari fiber): khoảng 4.000–6.000 yên/tháng tùy gói và nhà mạng. Nhiều chung cư có gói internet chung giá thấp hơn (~1.000–2.000 yên).',
          'Tổng tiện ích cơ bản (điện + gas + nước + internet): người sống 1 mình trung bình khoảng 10.000–15.000 yên/tháng.',
        ],
        tip: 'Mùa hè Nhật rất nóng (35–38°C ở nhiều vùng) — chạy điều hòa 24/7 là bình thường và cần thiết, không nên tiết kiệm điện đến mức ảnh hưởng sức khỏe. Tiền điện tháng 7–9 có thể tăng 30–50%.',
      },
      {
        title: 'Internet cố định — chọn gói thế nào',
        content:
          'Người mới hay bị nhầm về loại đường truyền và ký hợp đồng không phù hợp với căn hộ.',
        items: [
          'Trước tiên hỏi ban quản lý tòa nhà: căn hộ đã có 光回線 (cáp quang) dẫn vào chưa? Nếu có, bạn chỉ cần chọn nhà cung cấp dịch vụ, không cần lắp thêm dây.',
          'Các nhà cung cấp lớn: NTT フレッツ光 (nền tảng), SoftBank Hikari, au Hikari, NURO 光 — tốc độ và giá tương đương, khác nhau ở hợp đồng và bundled với điện thoại.',
          'Hợp đồng thường 2 năm — phí hủy sớm từ 10.000–20.000 yên. Đừng ký nếu không chắc ở nhà đó đủ thời gian.',
          'Nếu ở nhà dưới 6 tháng hoặc di chuyển thường xuyên: dùng pocket wifi (WiMAX, SoftBank Air) linh hoạt hơn, không cần lắp đặt, nhưng tốc độ thấp hơn và giá thường 3.000–5.000 yên/tháng.',
        ],
        tip: 'Khi đăng ký internet tại Nhật Bản, rất nhiều form chỉ có tiếng Nhật — dùng Google Translate trên máy tính để dịch form. Cần kiên nhẫn và chuẩn bị thẻ ngân hàng hoặc tài khoản thanh toán.',
      },
      {
        title: 'Lỗi phổ biến và cách tránh',
        content:
          'Hầu hết rắc rối không đến từ dịch vụ mà từ bỏ sót bước đơn giản.',
        items: [
          'Không đổi địa chỉ gửi hóa đơn: thư vẫn về nhà cũ — thanh toán trễ, bị phí phạt hoặc bị cắt dịch vụ.',
          'Bỏ quên ngày đóng tiền: tự động trừ (口座振替) giải quyết hoàn toàn vấn đề này — đăng ký ngay khi mở dịch vụ.',
          'Tưởng đã đăng ký xong nhưng chưa: kiểm tra email xác nhận hoặc thư từ nhà cung cấp trong hòm thư vật lý.',
          'Bị cắt điện/gas do không đóng tiền: khôi phục thường mất 1–2 ngày làm việc và có thể bị thu phí tái kết nối.',
          'Không thông báo ngày dọn ra khi trả nhà: hóa đơn tiếp tục chạy dù không còn ở đó. Gọi điện hoặc đăng ký online để hủy dịch vụ trước ngày rời.',
        ],
        tip: 'Tạo nhắc nhở điện thoại vào ngày 25–28 mỗi tháng để kiểm tra số dư tài khoản ngân hàng đủ trả hóa đơn tự trừ.',
      },
    ],
  };

export default utilities;
