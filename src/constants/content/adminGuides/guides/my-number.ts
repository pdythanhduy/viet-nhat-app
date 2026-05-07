import type { AdminGuide } from '../../../../types/content';

const myNumber: AdminGuide = {
    id: 'my-number',
    category: 'health',
    lastVerified: '2026-05-06',
    priority: 'high',
    title: 'Đăng ký thẻ My Number',
    titleJp: 'マイナンバーカード申請',
    icon: 'id-card',
    color: '#9B59B6',
    description: 'Đăng ký thẻ My Number để làm thủ tục hành chính, khai thuế, xác nhận danh tính online và có thể dùng làm マイナ保険証 nếu đăng ký liên kết bảo hiểm.',
    legalScope: {
      jurisdiction: 'municipality',
      jurisdictionNote: 'My Number là hệ thống toàn quốc, nhưng cấp/nhận/cập nhật thẻ được xử lý tại municipal office nơi đăng ký cư trú; người nước ngoài cần quản lý hạn thẻ theo hạn lưu trú.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-10-01',
      riskLevel: 'medium',
      whenToAskExpert: [
        'Bạn vừa gia hạn visa nhưng My Number Card sắp hết hạn hoặc đã hết hạn.',
        'Bạn bị mất thẻ, quên PIN, thẻ bị khóa hoặc nghi lộ số My Number.',
        'Bạn chuyển nhà sau khi nộp đơn nhưng chưa nhận 交付通知書.',
      ],
    },
    quickAction: {
      deadline: 'Nộp đơn sau khi có đăng ký cư trú; nếu có thẻ rồi và vừa gia hạn lưu trú, hãy cập nhật trước ngày hết hạn của My Number Card.',
      office: 'Municipal office nơi đăng ký cư trú; nộp đơn online bằng QR/申請書ID qua website chính thức nếu có mẫu đơn.',
      doNow: [
        'Kiểm tra có 申請書ID/QR trên giấy thông báo hoặc đơn đăng ký không.',
        'Nếu vừa được cấp thẻ cư trú mới sau gia hạn, mang My Number Card đến municipal office trước khi thẻ hết hạn.',
        'Không gửi ảnh thẻ, số My Number hoặc PIN cho dịch vụ không rõ nguồn gốc.',
      ],
      bring: ['Thẻ cư trú', '交付通知書 khi đến nhận', '申請書ID/QR nếu nộp online', 'Giấy tờ định danh bổ sung theo yêu cầu địa phương'],
      ifLate: 'Nếu My Number Card đã hết hạn sau khi gia hạn lưu trú, hỏi municipal office ngay; có thể cần cấp/cập nhật lại thay vì chỉ gia hạn online.',
      officialSourceLabels: [
        'Trang chính thức My Number Card',
        'Hạn hiệu lực My Number Card',
        'Hướng dẫn cho người nước ngoài — 出入国在留管理庁',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_my-number_hero.jpg'),
    heroImageCaption: 'マイナンバーカード — thẻ số cá nhân Nhật Bản, dùng cho hành chính và xác minh danh tính',
    whoIsThisFor: [
      'Người đã đăng ký cư trú tại Nhật và nhận được số My Number.',
      'Người muốn dùng dịch vụ hành chính online, xác minh danh tính hoặc マイナ保険証.',
      'Người nước ngoài có thời hạn lưu trú cần quản lý hạn thẻ My Number theo hạn lưu trú.',
    ],
    whenToDo: [
      'Sau khi nhận thông báo My Number hoặc phiếu đăng ký từ municipal office.',
      'Trước khi cần khai thuế online, làm thủ tục hành chính online hoặc dùng My Number làm bảo hiểm y tế.',
      'Sau khi gia hạn thời hạn lưu trú, kiểm tra/cập nhật hạn My Number Card trước khi thẻ hết hạn.',
    ],
    whereToDo: [
      'Đăng ký online qua website/app chính thức nếu có mã đăng ký.',
      'Gửi hồ sơ qua bưu điện bằng mẫu được cấp.',
      'Nhận thẻ tại municipal office nơi đăng ký cư trú.',
    ],
    estimatedTime: 'Thời gian cấp thẻ phụ thuộc địa phương và lượng hồ sơ. Sau khi có thư hẹn, thường cần chính chủ đến nhận tại municipal office.',
    fees: [
      'Đăng ký cấp lần đầu thường không mất phí.',
      'Cấp lại do mất/hỏng hoặc thay đổi một số nội dung có thể phát sinh phí theo địa phương/quy định.',
    ],
    documentsChecklist: [
      { label: 'Thư thông báo My Number hoặc phiếu đăng ký', required: true, note: 'Có mã/QR để đăng ký online hoặc gửi bưu điện.' },
      { label: 'Ảnh thẻ đúng chuẩn', required: true, note: 'Cần khi đăng ký bằng giấy; đăng ký online có thể dùng ảnh chụp phù hợp.' },
      { label: 'Thẻ cư trú', required: true, note: 'Cần khi nhận thẻ và xác minh danh tính.' },
      { label: 'Thư thông báo nhận thẻ (交付通知書)', required: true, note: 'Mang theo khi đến nhận thẻ.' },
      { label: 'Giấy tờ định danh bổ sung', required: false, note: 'Municipal office có thể yêu cầu tùy trường hợp.' },
    ],
    commonMistakes: [
      'Làm mất thư thông báo hoặc mã đăng ký rồi không hỏi lại municipal office.',
      'Quên mã PIN sau khi nhận thẻ.',
      'Gia hạn visa xong nhưng không cập nhật hạn My Number Card.',
      'Nhầm số My Number với thẻ My Number Card; có số không đồng nghĩa đã có thẻ.',
      'Chia sẻ ảnh thẻ/số My Number cho người lạ hoặc dịch vụ không rõ nguồn gốc.',
    ],
    faq: [
      {
        question: 'Có bắt buộc phải làm My Number Card không?',
        answer: 'Số My Number được cấp cho người đăng ký cư trú. Việc làm thẻ vật lý giúp dùng nhiều thủ tục online và マイナ保険証, nhưng nên kiểm tra yêu cầu cụ thể của từng thủ tục.',
      },
      {
        question: 'Người nước ngoài có hạn thẻ My Number thế nào?',
        answer: 'Với người có thời hạn lưu trú, hạn My Number Card có thể gắn với hạn lưu trú. Sau khi gia hạn visa, cần kiểm tra và làm thủ tục cập nhật hạn thẻ tại municipal office.',
      },
      {
        question: 'Mất thẻ My Number thì làm gì?',
        answer: 'Liên hệ tổng đài/municipal office để khóa chức năng cần thiết và làm thủ tục cấp lại. Nếu có nguy cơ lộ thông tin, xử lý sớm.',
      },
    ],
    officialLinks: [
      { label: 'Trang chính thức My Number Card', url: 'https://www.kojinbango-card.go.jp' },
      { label: 'Hạn hiệu lực My Number Card', url: 'https://www.kojinbango-card.go.jp/yukokigen/' },
      { label: 'Hướng dẫn cho người nước ngoài — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/support/portal/mynumbercard.html' },
      { label: 'App マイナポータル (đăng ký online)', url: 'https://myna.go.jp' },
    ],
    steps: [
      {
        step: 1,
        title: 'Nhận thông báo My Number',
        description: 'Sau khi đăng ký hộ khẩu (住民登録) tại phường, bạn sẽ nhận thư thông báo số My Number (個人番号通知書) qua bưu điện. Lưu ý: không áp dụng cho visa ngắn hạn (短期滞在).',
        documents: [
          'Thư thông báo số My Number (個人番号通知書)',
        ],
        tip: 'Giữ cẩn thận số My Number — không chia sẻ với người lạ ngoài các thủ tục hành chính chính thức',
      },
      {
        step: 2,
        title: 'Nộp đơn đăng ký thẻ',
        description: 'Có nhiều cách đăng ký: (1) Qua smartphone — quét QR trên đơn đăng ký và nộp trên website chính thức; (2) Qua máy tính — nhập 申請書ID 23 số; (3) Gửi bưu điện — điền phiếu, dán ảnh, gửi phong bì trả lời; (4) Chụp/nộp tại máy ảnh thẻ hỗ trợ My Number; hoặc (5) hỏi trực tiếp municipal office nếu mất giấy đăng ký.',
        documents: [
          'Thư thông báo My Number (ghi mã số đơn — 申請書ID)',
          'Ảnh thẻ 4.5×3.5cm — chụp trong 6 tháng, nền trắng, không đeo kính',
        ],
        tip: 'Cách nhanh nhất thường là dùng QR/申請書ID trên giấy đăng ký và nộp qua website chính thức. Nếu mất giấy, đến municipal office xin cấp lại mẫu có ID.',
        image: require('../../../../../assets/content/daily-life/ag_my-number_s2.jpg'),
        imageCaption: 'マイナポータル — đăng ký thẻ My Number qua app smartphone, quét QR trên thư thông báo',
      },
      {
        step: 3,
        title: 'Chờ thông báo nhận thẻ',
        description: 'Sau khi nộp đơn, thời gian đến khi municipal office gửi 交付通知書 thường khoảng 1 tháng, nhưng có thể lâu hơn nếu ảnh/hồ sơ lỗi hoặc địa phương đang đông hồ sơ.',
        documents: [],
        tip: 'Nếu chuyển nhà trong thời gian chờ, cập nhật địa chỉ tại municipal office và hỏi bộ phận My Number Card để thư không bị trả về.',
      },
      {
        step: 4,
        title: 'Đến UBND nhận thẻ (bắt buộc đến đích thân)',
        description: 'Đặt lịch hẹn qua điện thoại hoặc online nếu địa phương yêu cầu, sau đó đến municipal office nơi đăng ký để nhận thẻ. Về nguyên tắc chính chủ đi nhận; nếu thật sự không thể đi, hỏi municipal office trước về điều kiện ủy quyền. Bạn sẽ đặt PIN/chứng thư điện tử tại quầy.',
        documents: [
          'Thư thông báo nhận thẻ (交付通知書)',
          'Thẻ cư trú (在留カード)',
          'Thư thông báo My Number cũ',
        ],
        tip: 'Ghi nhớ 2 mã PIN: PIN 4 số và PIN 6–16 ký tự cho chữ ký điện tử. Với người nước ngoài có thời hạn lưu trú, sau khi gia hạn lưu trú hãy kiểm tra/cập nhật hạn My Number Card tại municipal office trước khi thẻ hết hạn.',
        image: require('../../../../../assets/content/daily-life/ag_my-number_s4.jpg'),
        imageCaption: '市役所 窓口 — đến trực tiếp nhận thẻ My Number, không ủy quyền người khác nhận thay',
      },
    ],
  };

export default myNumber;
