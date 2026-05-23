import type { AdminGuide } from '../../../../types/content';

const specialFraudTokushuSagi: AdminGuide = {
    id: 'special-fraud-tokushu-sagi',
    category: 'daily-law',
    lastVerified: '2026-05-23',
    priority: 'high',
    title: 'Cảnh báo lừa đảo nhắm vào người nước ngoài',
    titleJp: '特殊詐欺・外国人を狙った詐欺への注意',
    icon: 'warning-outline',
    color: '#C0392B',
    description: 'Người nước ngoài ở Nhật thường bị nhắm bởi các hình thức lừa đảo khai thác rào cản ngôn ngữ và sự thiếu quen thuộc với pháp luật Nhật Bản. Guide này tập trung vào 特殊詐欺 qua điện thoại, tin nhắn và tiếp cận trực tiếp — khác với hướng dẫn bảo vệ tài khoản ngân hàng đã có riêng.',
    heroImage: require('../../../../../assets/content/daily-life/ag_fraud_hero.jpg'),
    heroImageCaption: '特殊詐欺 - nhận diện lừa đảo qua điện thoại, tin nhắn và giả danh cơ quan',
    whoIsThisFor: [
      'Bất kỳ người Việt nào đang sinh sống tại Nhật.',
      'Người mới sang Nhật chưa quen nhận biết các hình thức lừa đảo phổ biến tại đây.',
    ],
    whenToDo: [
      'Đọc ngay — không cần chờ đến khi gặp tình huống.',
      'Chia sẻ cho người thân hoặc bạn bè mới sang Nhật.',
    ],
    whereToDo: [
      'Khi bị lừa hoặc nghi ngờ: báo ngay cảnh sát 110 hoặc #9110 (tư vấn không khẩn cấp).',
      'Tư vấn tiêu dùng: 消費者ホットライン 188 (có hỗ trợ đa ngôn ngữ).',
      'Đại sứ quán Việt Nam tại Tokyo: +81-3-3466-3313.',
    ],
    estimatedTime: 'Đọc guide này: 5 phút.',
    documentsChecklist: [
      { label: 'Ảnh chụp màn hình tin nhắn, email, số điện thoại hoặc tài khoản liên lạc', required: false, note: 'Giữ lại trước khi xóa để báo cảnh sát hoặc ngân hàng.' },
      { label: 'Biên lai chuyển tiền hoặc lịch sử giao dịch ngân hàng', required: false, note: 'Cần nếu đã chuyển tiền hoặc bị rút tiền.' },
      { label: 'Tên/số điện thoại/tài khoản người nghi ngờ lừa đảo', required: false },
      { label: 'Thẻ cư trú hoặc giấy tờ tùy thân', required: false, note: 'Mang theo khi trực tiếp đến cảnh sát hoặc ngân hàng.' },
    ],
    commonMistakes: [
      'Tin vào người gọi chỉ vì họ nói được tiếng Việt — kẻ lừa đảo cố tình thuê người nói tiếng Việt để tạo tin tưởng.',
      'Chuyển tiền vì sợ bị trục xuất hoặc bị bắt — không có cơ quan nhà nước nào ở Nhật yêu cầu nộp tiền qua điện thoại.',
      'Cung cấp số OTP, thông tin đăng nhập ngân hàng cho bất kỳ ai, kể cả người tự xưng là cảnh sát hoặc nhân viên xuất nhập cảnh.',
      'Ngại báo cảnh sát vì nghĩ "tiếng Nhật không tốt" — cảnh sát Nhật có đường dây thông dịch viên.',
    ],
    faq: [
      {
        question: 'Nhận cuộc gọi tiếng Việt nói visa sắp bị hủy và phải nộp tiền — đây là thật không?',
        answer: 'Đây là lừa đảo. Cơ quan xuất nhập cảnh (ISA) không liên lạc qua điện thoại để yêu cầu nộp tiền khẩn cấp. Thông báo chính thức luôn đến bằng văn bản gửi đến địa chỉ cư trú. Hãy cúp máy ngay và báo cảnh sát 110.',
      },
      {
        question: 'Nhận tin nhắn hoặc email nói có hoàn thuế, cần bấm link để nhận — có thật không?',
        answer: 'Đây là 還付金詐欺 hoặc phishing. 国税庁 không gửi link nhận tiền qua SMS hay email không chính thức. Tiền hoàn thuế được chuyển thẳng vào tài khoản đã đăng ký hoặc bằng séc qua bưu điện. Xóa tin nhắn, không bấm link.',
      },
      {
        question: 'Người đến tận nơi tự xưng nhân viên NHK đòi tiền phí truyền hình — phải làm gì?',
        answer: 'Yêu cầu xem thẻ nhân viên rõ ràng. NHK thu phí theo hợp đồng chính thức, không đòi tiền mặt tại cửa. Nếu nghi ngờ, không trả tiền, đóng cửa và gọi xác nhận trực tiếp với NHK theo số chính thức.',
      },
      {
        question: 'Có người quen nhờ chuyển tiền giúp và sẽ hoàn lại sau — có nên không?',
        answer: 'Tuyệt đối không. Đây là vai trò "受け子" hoặc "出し子" — bạn có thể trở thành công cụ của đường dây lừa đảo và bị truy cứu trách nhiệm hình sự dù không cố ý.',
      },
    ],
    officialLinks: [
      { label: '特殊詐欺対策ページ SOS47 — 警察庁', url: 'https://www.npa.go.jp/bureau/safetylife/sos47/index.html' },
      { label: '消費者ホットライン188 — 消費者庁', url: 'https://www.caa.go.jp/policies/policy/consumer_policy/information/dial_110/' },
      { label: '外国人在留支援センター（FRESC）— 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/support/fresc/fresc01.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Nhận biết 5 kịch bản lừa đảo phổ biến nhắm vào người nước ngoài',
        description: '1. Giả cảnh sát / xuất nhập cảnh: nói bạn có vấn đề pháp lý, visa bị thu hồi, cần nộp tiền bảo lãnh.\n2. Giả cơ quan thuế: nói được hoàn thuế nhưng cần "xác nhận" qua link hoặc ATM.\n3. Giả nhân viên NHK: đến tận nơi hoặc gọi điện đòi phí truyền hình bằng tiền mặt.\n4. Nhờ chuyển tiền hộ: người quen hoặc lạ nhờ nhận/chuyển tiền, hứa trả phí.\n5. Lừa đảo tình cảm / đầu tư tiền điện tử: làm quen qua mạng rồi dẫn đến yêu cầu chuyển tiền hoặc tham gia "cơ hội đầu tư".',
        documents: [],
        tip: 'Quy tắc vàng: bất kỳ ai yêu cầu nộp tiền ngay lập tức qua điện thoại, tin nhắn hoặc tại cửa mà không có văn bản chính thức — đó là lừa đảo.',
        image: require('../../../../../assets/content/daily-life/ag_sagi_s1.jpg'),
        imageCaption: 'Poster cảnh báo 特殊詐欺 của cảnh sát — nhận biết 5 kịch bản lừa đảo phổ biến',
      },
      {
        step: 2,
        title: 'Xử lý đúng cách khi gặp tình huống nghi ngờ',
        description: 'Với cuộc gọi đáng ngờ: không trả lời câu hỏi cá nhân, cúp máy và gọi lại cho cơ quan đó theo số chính thức. Với người đến nhà: không mở cửa nếu không hẹn trước, không trả tiền mặt tại cửa. Với tin nhắn: không bấm link, không tải file đính kèm.',
        documents: [],
        tip: 'Lưu 110 (cảnh sát khẩn cấp) và 188 (tư vấn tiêu dùng) vào danh bạ ngay hôm nay.',
      },
      {
        step: 3,
        title: 'Báo cáo khi đã bị lừa hoặc nghi ngờ',
        description: 'Gọi 110 ngay — cảnh sát Nhật có dịch vụ thông dịch qua điện thoại. Gọi #9110 nếu không khẩn cấp nhưng cần tư vấn. Liên hệ ngân hàng ngay nếu đã chuyển tiền — một số giao dịch có thể được ngăn nếu báo kịp thời. Liên hệ Đại sứ quán Việt Nam để được hỗ trợ thêm.',
        documents: [],
        tip: 'Không xấu hổ khi bị lừa — đây là tội phạm tổ chức chuyên nghiệp. Báo cáo giúp cảnh sát theo dõi và ngăn chặn cho người khác.',
        image: require('../../../../../assets/content/daily-life/ag_sagi_s3.jpg'),
        imageCaption: 'Gọi 110 hoặc đến đồn cảnh sát gần nhất để khai báo khi bị hoặc nghi ngờ bị lừa đảo',
      },
    ],
  };

export default specialFraudTokushuSagi;
