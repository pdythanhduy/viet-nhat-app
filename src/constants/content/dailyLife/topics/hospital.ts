import type { DailyLifeTopic } from '../../../../types/content';

const hospital: DailyLifeTopic = {
    id: 'hospital',
    title: 'Đi khám và bệnh viện',
    titleJp: '病院・クリニック',
    icon: 'medical',
    color: '#E74C3C',
    description: 'Chọn đúng loại phòng khám, mang đủ giấy tờ, vượt rào ngôn ngữ và biết khi nào gọi 119.',
    sections: [
      {
        title: 'Chọn đúng loại phòng khám — đỡ mất tiền và thời gian',
        content:
          'Vào thẳng bệnh viện lớn (病院) không có giấy giới thiệu (紹介状) thường bị thu thêm phụ phí 特別料金 từ 2.000–7.700 yên trở lên tùy cơ sở. Nên bắt đầu ở clinic (クリニック / 診療所) đúng chuyên khoa.',
        items: [
          '内科 (nội khoa): sốt, ho, cảm, mệt mỏi kéo dài, đau bụng, tiêu hóa — phổ biến nhất.',
          '皮膚科 (da liễu): phát ban, dị ứng da, nổi mề đay, mụn nặng.',
          '耳鼻咽喉科 (tai mũi họng): đau tai, viêm xoang, nghẹt mũi, đau họng kéo dài.',
          '整形外科 (chỉnh hình/cơ xương): đau lưng, bong gân, chấn thương khi làm việc hoặc tai nạn.',
          '眼科 (nhãn khoa): đỏ mắt, đau mắt, mỏi mắt, kính áp tròng.',
          '歯科 (nha khoa): đau răng, sâu răng, nhổ răng — không nằm trong bảo hiểm y tế thông thường một phần.',
        ],
        tip: 'Tìm clinic bằng Google Maps: gõ "内科 クリニック 近く" hoặc "皮膚科 近く". Nhiều nơi cho đặt lịch qua app hoặc website để không phải chờ quá lâu.',
        image: require('../../../../../assets/content/daily-life/dl_hospital_s1.jpg'),
        imageCaption: 'Bảng hiệu phòng khám (クリニック) — tìm đúng tên chuyên khoa như 内科, 皮膚科 trước khi vào',
      },
      {
        title: 'Giấy tờ cần mang và chi phí thực tế',
        content:
          'Mang đúng giấy tờ ngay từ đầu giúp buổi khám ngắn hơn và tránh bị tính phí không cần thiết.',
        items: [
          'Từ tháng 12/2024: 保険証 giấy đã bị bãi bỏ. Mang マイナ保険証 (My Number Card đã liên kết bảo hiểm) hoặc 資格確認書 (giấy xác nhận tư cách bảo hiểm — do bên bảo hiểm gửi nếu bạn chưa có My Number Card) — thiếu một trong hai phải tự trả 100%.',
          'お薬手帳 (sổ ghi toa thuốc): nếu đang uống thuốc thường xuyên, mang để tránh kê trùng hoặc tương tác xấu.',
          'Người lớn có bảo hiểm hợp lệ thường trả khoảng 30% chi phí trong phạm vi bảo hiểm.',
          'Khám ngoài giờ hành chính (時間外) hoặc ngày lễ thường bị cộng phụ phí 365–2.700 yên tùy loại cơ sở.',
          'Tiền mặt nên có sẵn vì không phải mọi clinic đều nhận thẻ.',
        ],
        tip: 'Nếu hóa đơn y tế trong tháng vượt ngưỡng (高額療養費制度), bạn được hoàn lại phần vượt. Hỏi văn phòng phường hoặc cơ quan bảo hiểm về thủ tục xin hoàn — không tự động trả lại.',
      },
      {
        title: 'Vượt rào ngôn ngữ khi khám bệnh',
        content:
          'Không biết tiếng Nhật vẫn khám được nếu chuẩn bị đúng công cụ.',
        items: [
          'VoiceTra: app miễn phí của NICT (Nhật Bản), dịch giọng nói 31 ngôn ngữ theo thời gian thực — phù hợp nhất để giải thích triệu chứng với bác sĩ.',
          'Google Translate camera: chụp đơn thuốc, tờ hướng dẫn hoặc bảng câu hỏi bệnh sử để dịch ngay.',
          'AMDA (tổ chức phi lợi nhuận y tế): có đường dây tư vấn đa ngôn ngữ hỗ trợ người nước ngoài trong tình huống y tế khó khăn.',
          'Trung tâm hỗ trợ người nước ngoài tỉnh/thành phố: thường có danh sách cơ sở y tế hỗ trợ tiếng Anh hoặc phiên dịch.',
          'Một số bệnh viện lớn có dịch vụ phiên dịch qua điện thoại — hỏi trước quầy tiếp nhận.',
        ],
        tip: 'Trước khi đến phòng khám, viết sẵn vào ghi chú điện thoại: triệu chứng, từ khi nào, mức độ đau (1-10), đang uống thuốc gì. Đưa điện thoại cho bác sĩ đọc nếu cần.',
      },
      {
        title: 'Khi nào gọi 119 và khi nào gọi #7119',
        content:
          'Xe cứu thương ở Nhật hoàn toàn miễn phí — nhiều người không gọi vì sợ tốn tiền, đây là hiểu nhầm nguy hiểm.',
        items: [
          'Gọi 119 ngay: bất tỉnh, co giật, khó thở nặng, đau ngực dữ dội, liệt tay chân đột ngột (nghi đột quỵ), chấn thương nặng.',
          'Gọi #7119 (救急安心センター): khi không chắc có cần gọi 119 không — nhân viên y tế trực 24h tư vấn xử lý tiếp theo. Hiện có tại Tokyo, Osaka, nhiều tỉnh lớn — kiểm tra tỉnh của bạn có hỗ trợ không.',
          'Nếu tỉnh bạn không có #7119: gọi số tư vấn y tế khẩn cấp của tỉnh đó (tìm trên website tỉnh) hoặc hỏi trực tiếp tại trung tâm hỗ trợ người nước ngoài.',
        ],
        tip: 'Lưu 119 và số hỗ trợ y tế tỉnh bạn vào danh bạ ngay hôm nay — lúc cấp cứu không có thời gian tìm kiếm.',
        image: require('../../../../../assets/content/daily-life/dl_hospital_s4.jpg'),
        imageCaption: 'Gọi 119 ngay khi khẩn cấp — xe cứu thương hoàn toàn miễn phí, gọi #7119 khi không chắc có cần gọi 119 không',
      },
    ],
  };

export default hospital;
