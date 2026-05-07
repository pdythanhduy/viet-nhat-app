import type { DailyLifeTopic } from '../../../../types/content';

const trash: DailyLifeTopic = {
    id: 'trash',
    title: 'Phân loại rác đúng cách',
    titleJp: 'ごみの分別・粗大ごみ',
    icon: 'trash',
    color: '#27AE60',
    description: 'Các nhóm rác với tên tiếng Nhật, đồ cần xử lý riêng, quy trình bỏ rác cỡ lớn và lỗi thường bị nhắc nhở.',
    sections: [
      {
        title: 'Việc đầu tiên sau khi chuyển đến',
        content:
          'Quy tắc rác ở Nhật rất cụ thể và khác nhau theo từng quận/thành phố — không có cách dùng chung toàn quốc.',
        items: [
          'Lấy lịch rác chính thức: xin tại văn phòng phường, hoặc tìm trên website thành phố — gõ "[tên thành phố] ごみ 分別 カレンダー". Nhiều thành phố có app riêng.',
          'Kiểm tra điểm bỏ rác (ごみ置き場) của tòa nhà và khung giờ cho phép — thường phải bỏ vào sáng ngày thu gom, không bỏ tối hôm trước.',
          'Hỏi ban quản lý tòa nhà: có bắt buộc dùng túi rác màu đặc trưng của quận không — một số quận bán túi rác riêng (指定ごみ袋), bỏ túi khác bị trả lại.',
        ],
        tip: 'Túi rác bị phân loại sai thường không bị thu gom và để lại kèm giấy nhắc. Bị nhắc thường xuyên có thể dẫn đến phàn nàn từ ban quản lý tòa nhà.',
        image: require('../../../../../assets/content/daily-life/dl_trash_s1.jpg'),
        imageCaption: 'Lịch thu rác (ごみ収集カレンダー) — mỗi quận/thành phố có lịch riêng, xin tại văn phòng phường hoặc tải trên website',
      },
      {
        title: 'Các loại rác và tên tiếng Nhật',
        content:
          'Tên gọi có thể khác nhau đôi chút theo địa phương, nhưng logic phân loại thường như sau:',
        items: [
          '燃えるごみ / 可燃ごみ (rác đốt được): thức ăn thừa, túi nylon, giấy thường, khăn giấy, vải cũ, rác bếp — loại phổ biến nhất, thu 2–3 lần/tuần.',
          '燃えないごみ / 不燃ごみ (rác không đốt được): sứ vỡ, thủy tinh, gương, kim loại nhỏ (dao, nắp), đồ nhựa cứng — thu ít thường xuyên hơn, 1–2 lần/tháng.',
          '資源ごみ / リサイクル (rác tái chế): chai PET rửa sạch và bỏ nắp, lon nhôm/sắt, chai thủy tinh, giấy báo buộc thành bó, bìa carton gấp phẳng.',
          'プラスチック (nhựa mềm/bao bì nhựa): ở nhiều địa phương tách riêng khỏi 燃えるごみ — bao gồm túi đựng thực phẩm, bao bì đã rửa sạch.',
          '古着・古紙 (quần áo cũ, giấy cũ): một số khu có điểm thu riêng hoặc ngày thu riêng.',
        ],
        tip: 'Bao bì thực phẩm có ký hiệu "プラ" (nhựa) hoặc "PET" — đây là gợi ý phân loại. Đọc kỹ bao bì trước khi bỏ vào nhóm rác nào.',
        image: require('../../../../../assets/content/daily-life/dl_trash_s2.jpg'),
        imageCaption: 'Phân loại rác theo màu túi và biển báo — mỗi loại có ngày thu gom riêng theo lịch địa phương',
      },
      {
        title: 'Đồ cần xử lý đặc biệt — không được bỏ vào rác thường',
        content:
          'Đây là nhóm dễ bị xử lý sai nhất vì nhiều người không biết.',
        items: [
          'Pin (電池): mang đến hộp thu pin tại combini, siêu thị hoặc điểm thu địa phương — không bỏ vào rác thường.',
          'Bật lửa và bình xịt (スプレー缶・ライター): phải xả hết gas trước khi bỏ — nếu còn gas sẽ gây nổ khi thu gom. Nhiều quận có ngày thu riêng.',
          'Đồ điện tử nhỏ (小型家電): điện thoại cũ, máy tính bảng, máy tính cầm tay — có hộp thu riêng tại combini, siêu thị hoặc phường.',
          'Đèn huỳnh quang / bóng đèn (蛍光灯): không bỏ rác thường — có điểm thu riêng hoặc ngày thu đặc biệt.',
          'Thuốc thừa: mang lại nhà thuốc hoặc bệnh viện — không đổ xuống bồn rửa hoặc toilet.',
        ],
        tip: 'App phân loại rác của nhiều thành phố (ví dụ: "東京都 ごみアプリ") có thể tìm kiếm từng món đồ và tra xem bỏ vào loại rác nào.',
      },
      {
        title: 'Rác cỡ lớn (粗大ごみ) — phải đặt lịch, phải mua phiếu',
        content:
          'Bàn, ghế, nệm, tủ, xe đạp, máy giặt, tivi... không được bỏ ở điểm rác thường. Phải đặt lịch riêng và trả phí.',
        items: [
          'Bước 1 — Đặt lịch: gọi điện hoặc đăng ký online trên website thành phố (tìm "[tên thành phố] 粗大ごみ 申し込み"). Sẽ được thông báo ngày thu gom và mã số.',
          'Bước 2 — Mua phiếu xử lý (粗大ごみ処理券): mua tại combini theo mệnh giá quy định. Giá tùy kích thước và loại đồ — thường 400–2.000 yên/món.',
          'Bước 3 — Dán phiếu và để đồ ra đúng chỗ: ngày thu gom, dán phiếu lên đồ và để ở điểm thu gom chỉ định trước giờ quy định.',
          'Xe đạp: phải đăng ký riêng với quận — một số khu không thu chung với 粗大ごみ thông thường.',
          'Đồ điện gia dụng lớn (家電リサイクル法): tivi, tủ lạnh, máy giặt, điều hòa không được xử lý qua 粗大ごみ thông thường — phải mang ra điểm thu riêng và trả phí riêng.',
        ],
        tip: 'Không bỏ 粗大ごみ ra đường hoặc điểm rác thường — đây là vi phạm và có thể bị xử phạt. Nếu đồ còn dùng được, đăng lên Mercari hoặc mang đến 2nd Street/Hard Off sẽ kiếm lại được ít tiền thay vì trả phí xử lý.',
        image: require('../../../../../assets/content/daily-life/dl_trash_s4.jpg'),
        imageCaption: 'Rác cỡ lớn (粗大ごみ) chờ thu gom — phải đặt lịch trước và mua phiếu xử lý tại combini',
      },
    ],
  };

export default trash;
