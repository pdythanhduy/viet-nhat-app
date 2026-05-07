import type { AdminGuide } from '../../../../types/content';

const myNumberCard: AdminGuide = {
    id: 'my-number-card',
    category: 'daily-law',
    lastVerified: '2026-05-06',
    priority: 'high',
    title: 'Đăng ký và nhận My Number Card',
    titleJp: 'マイナンバーカード申請・受取',
    icon: 'card',
    color: '#185FA5',
    description:
      'My Number Card không bắt buộc để ở Nhật, nhưng cần thiết để dùng bảo hiểm điện tử (マイナ保険証), in giấy tờ tại combini, nộp 確定申告 online và đăng nhập Mynaportal. Thời gian cấp thường khoảng 1 tháng nhưng tùy municipal office và tình trạng hồ sơ.',
    legalScope: {
      jurisdiction: 'municipality',
      jurisdictionNote: 'Nộp đơn có thể làm online/bưu điện/máy ảnh thẻ, nhưng nhận thẻ, cập nhật hạn và reset PIN do municipal office nơi đăng ký cư trú xử lý.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-10-01',
      riskLevel: 'medium',
      whenToAskExpert: [
        'Bạn là người nước ngoài có hạn lưu trú ngắn, vừa gia hạn visa hoặc My Number Card sắp hết hạn.',
        'Bạn mất 交付通知書, chuyển nhà trong thời gian chờ, hoặc thư bị trả về vì 転送不要.',
        'Bạn quên PIN, bị khóa chứng thư điện tử hoặc cần người khác nhận thẻ thay.',
      ],
    },
    quickAction: {
      deadline: 'Làm sớm sau khi địa chỉ ổn định; nếu đang cập nhật hạn thẻ sau gia hạn lưu trú, làm trước ngày My Number Card hết hạn.',
      office: 'Nộp đơn qua apply.jpki.go.jp/QR, bưu điện hoặc máy ảnh thẻ; nhận/cập nhật tại municipal office.',
      doNow: [
        'Chuẩn bị ảnh đúng chuẩn và 申請書ID 23 số.',
        'Không chuyển nhà giữa chừng mà không báo bộ phận My Number Card.',
        'Sau khi gia hạn visa, kiểm tra ngay hạn My Number Card và chứng thư điện tử.',
      ],
      bring: ['申請書ID hoặc QR', 'Ảnh chân dung đúng chuẩn', '交付通知書', '在留カード', 'Hộ chiếu hoặc giấy tờ định danh bổ sung'],
      ifLate: 'Nếu thư nhận thẻ quá hạn hoặc thẻ bị hủy, hỏi municipal office để nộp lại/cấp lại; nếu thẻ đã hết hạn do gia hạn lưu trú chậm, xử lý trực tiếp tại quầy.',
      officialSourceLabels: [
        'Nộp đơn online (スマートフォン・PC)',
        'Hướng dẫn chính thức マイナンバーカード申請',
        '更新手続きについて — マイナンバーカード総合サイト',
        'マイナンバーカードを作って、便利に生活しましょう！— 出入国在留管理庁',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_mynumber-card_hero.jpg'),
    heroImageCaption: 'マイナンバーカード - thẻ định danh dùng cho bảo hiểm số, combini và thủ tục online',
    whoIsThisFor: [
      'Người đã có đăng ký cư trú (住民登録) tại Nhật và chưa có My Number Card.',
      'Người muốn dùng マイナ保険証 thay thẻ bảo hiểm giấy cũ đã hết hiệu lực chuyển tiếp từ 02/12/2025.',
      'Người cần in giấy tờ hành chính tại combini (コンビニ交付) không cần xếp hàng ở 役所.',
    ],
    whenToDo: [
      'Ngay khi có địa chỉ ổn định — thư thông báo nhận thẻ ghi 転送不要, không chuyển tiếp nếu đổi địa chỉ.',
      'Làm sớm vì thường cần khoảng 1 tháng hoặc lâu hơn nếu hồ sơ/ảnh bị lỗi — đừng để đến khi cần gấp.',
    ],
    whereToDo: [
      'Nộp đơn: online qua điện thoại tại apply.jpki.go.jp (nhanh nhất, 10 phút) hoặc tại quầy 役所.',
      'Nhận thẻ: tại 役所 (市区町村) theo ngày ghi trong 交付通知書 gửi về nhà.',
    ],
    estimatedTime: 'Nộp đơn: 10–15 phút qua điện thoại. Chờ thư 交付通知書: thường khoảng 1 tháng, có thể lâu hơn tùy địa phương/hồ sơ. Đến 役所 nhận thẻ: 20–40 phút.',
    fees: ['Miễn phí lần đầu. Cấp lại do mất/hư hoặc các trường hợp tương tự có thể phát sinh phí theo quy định địa phương/từng thủ tục.'],
    documentsChecklist: [
      { label: '申請書ID — dãy 23 số trên tờ giấy 個人番号通知書 gửi về nhà khi đăng ký 住民票', required: true },
      { label: 'Ảnh chân dung đúng quy cách (45mm × 35mm, nền trắng/xám, chụp trong 6 tháng gần)', required: true },
      { label: '交付通知書 (giấy báo đến lấy thẻ)', required: true, note: 'Chỉ cần khi đến 役所 nhận; thường được gửi khi thẻ đã sẵn sàng.' },
      { label: '在留カード', required: true, note: 'Cần khi đến 役所 nhận thẻ' },
      { label: 'Hộ chiếu hoặc thẻ bảo hiểm y tế (1 trong 2)', required: true, note: 'Cần khi đến nhận thẻ' },
    ],
    commonMistakes: [
      'Ảnh bị trả lại: nền không đồng màu, mặt quá nhỏ, hoặc chụp quá 6 tháng trước — dùng app マイナポータル chụp thẳng để hệ thống tự kiểm.',
      '交付通知書 ghi 転送不要 — nếu chuyển nhà giữa chừng mà không cập nhật, thư không đến và thẻ bị hủy sau 3 tháng.',
      'Đến 役所 không mang 交付通知書 — không có giấy này không được lấy thẻ dù có 在留カード.',
      'Nhập sai PIN ① (6–16 ký tự) quá 5 lần hoặc PIN ②③④ quá 3 lần liên tiếp → thẻ bị khóa, phải quay lại 役所 mở khóa.',
    ],
    faq: [
      {
        question: 'Không có 申請書ID (giấy nộp đơn) thì làm sao?',
        answer:
          'Đến trực tiếp 役所 để lấy tờ 申請書 mới hoặc đăng ký tại quầy. Một số 役所 cũng chấp nhận đăng ký qua app マイナポータル mà không cần 申請書ID.',
      },
      {
        question: 'Nhờ người khác đến lấy thẻ hộ được không?',
        answer:
          'Về nguyên tắc chính chủ đi nhận. Trường hợp thật sự không thể đến quầy có thể cần giấy tờ ủy quyền và lý do phù hợp, nhưng điều kiện khác nhau theo municipal office nên phải gọi hỏi trước.',
      },
      {
        question: 'PIN 署名用 (6–16 ký tự) dùng để làm gì?',
        answer:
          'Dùng khi đăng nhập e-Tax, Mynaportal và ký điện tử tài liệu hành chính quan trọng. Đây là PIN quan trọng nhất — ghi lại và cất riêng biệt với thẻ.',
      },
    ],
    officialLinks: [
      { label: 'Nộp đơn online (スマートフォン・PC)', url: 'https://apply.jpki.go.jp/' },
      { label: 'Hướng dẫn chính thức マイナンバーカード申請', url: 'https://www.kojinbango-card.go.jp/en-kofushinse/' },
      { label: '更新手続きについて — マイナンバーカード総合サイト', url: 'https://www.kojinbango-card.go.jp/card/renewal/' },
      { label: 'マイナンバーカードを作って、便利に生活しましょう！— 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/support/portal/mynumbercard.html' },
      { label: 'Mynaportal', url: 'https://myna.go.jp/' },
    ],
    steps: [
      {
        step: 1,
        title: 'Chuẩn bị ảnh đúng quy cách',
        description:
          'Ảnh sai là lý do phổ biến nhất khiến đơn bị từ chối. Yêu cầu:\n\n• Kích thước: 45mm cao × 35mm rộng.\n• Chụp trong vòng 6 tháng gần.\n• Nền trắng hoặc xám nhạt đồng đều — không có hoa văn, không bóng.\n• Khuôn mặt nhìn thẳng, mắt mở, không đội mũ, không đeo kính râm.\n• Khuôn mặt chiếm khoảng 70–80% chiều cao ảnh.\n\nCách đơn giản nhất: mở app マイナポータル → chọn 申請する → chụp ảnh ngay trong app. Hệ thống tự kiểm tra khuôn mặt và resize đúng chuẩn trước khi nộp.',
        documents: ['Điện thoại có camera (nếu dùng app) hoặc ảnh in 45×35mm'],
        tip: 'Dùng app マイナポータル để chụp ảnh trực tiếp thay vì upload ảnh tự chụp — tỷ lệ đơn được chấp nhận cao hơn nhiều.',
      },
      {
        step: 2,
        title: 'Nộp đơn qua điện thoại (10 phút)',
        description:
          'Bước nộp đơn cụ thể:\n\n① Tìm 申請書ID — dãy 23 chữ số in trên tờ giấy 個人番号通知書 (gửi về nhà khi đăng ký 住民票 lần đầu). Không có → đến 役所 lấy tờ mới.\n\n② Mở app マイナポータル hoặc vào apply.jpki.go.jp.\n\n③ Chọn マイナンバーカードを申請する → nhập địa chỉ email → bấm link xác nhận trong email.\n\n④ Nhập 申請書ID (23 chữ số).\n\n⑤ Upload ảnh (hoặc chụp thẳng trong app).\n\n⑥ Xác nhận thông tin: họ tên, ngày sinh, địa chỉ — phải khớp với 在留カード.\n\n⑦ Bấm 申請する → nhận email xác nhận là đã nộp xong.',
        documents: ['申請書ID (23 chữ số từ 個人番号通知書)', 'Ảnh chân dung', 'Địa chỉ email'],
        tip: 'Thông tin điền phải khớp chính xác với 在留カード. Tên, địa chỉ sai một ký tự sẽ bị từ chối và phải nộp lại từ đầu.',
        image: require('../../../../../assets/content/daily-life/ag_mynumber-card_s2.jpg'),
        imageCaption: 'Nộp đơn xin My Number Card qua app マイナポータル trên smartphone trong 10 phút',
      },
      {
        step: 3,
        title: 'Chờ thư 交付通知書 gửi về nhà',
        description:
          'Municipal office gửi 交付通知書 (giấy báo đến lấy) khi thẻ đã sẵn sàng. Trang chính thức nêu thời gian thường khoảng 1 tháng từ lúc nộp đến khi municipal office gửi thông báo, nhưng có thể lâu hơn nếu ảnh/hồ sơ lỗi hoặc địa phương đông hồ sơ.\n\nĐiều quan trọng:\n• Phong bì ghi 転送不要 — nếu bạn chuyển nhà giữa chừng, thư sẽ bị trả về chứ không chuyển tiếp.\n• Nếu chuyển nhà sau khi đã nộp đơn: đổi địa chỉ tại 役所 trước, rồi thông báo lại với bộ phận マイナンバーカード để gửi thư đúng địa chỉ mới.\n• Thư có ghi hạn đến lấy — quá hạn có thể phải hỏi municipal office để xử lý lại.\n\nTra trạng thái đơn: vào apply.jpki.go.jp → dùng email đã đăng ký.',
        documents: [],
        tip: 'Nếu sau 2 tháng chưa nhận thư, tra trạng thái online trước khi đến 役所 hỏi — thường có cập nhật trên hệ thống.',
      },
      {
        step: 4,
        title: 'Đến 役所 nhận thẻ và thiết lập 4 PIN',
        description:
          'Mang đủ: 交付通知書 + 在留カード + 1 giấy tờ khác (hộ chiếu hoặc thẻ bảo hiểm).\n\nTại quầy bạn thiết lập 4 PIN — quan trọng, không nên vội:\n\n① 署名用電子証明書の暗証番号 (6–16 ký tự, gồm chữ hoa A–Z và số 0–9):\n   → Dùng cho: e-Tax, Mynaportal, ký tài liệu hành chính điện tử.\n   → PIN quan trọng nhất — ghi lại và cất kỹ riêng biệt với thẻ.\n\n② 利用者証明用電子証明書の暗証番号 (4 chữ số):\n   → Dùng cho: in giấy tại combini (コンビニ交付), dùng thẻ như マイナ保険証.\n\n③ 住民基本台帳用暗証番号 (4 chữ số):\n   → Dùng cho hệ thống dữ liệu dân cư — ít dùng trong sinh hoạt.\n\n④ 券面事項入力補助用暗証番号 (4 chữ số):\n   → Dùng để đọc thông tin cơ bản trên thẻ qua NFC.\n\nCó thể đặt ②③④ cùng một số để dễ nhớ. PIN ① phải khác và phức tạp hơn.',
        documents: ['交付通知書', '在留カード', 'Hộ chiếu hoặc thẻ bảo hiểm y tế'],
        tip: 'Ghi 4 PIN lên giấy ngay tại 役所, bỏ vào ví riêng — không ghi vào điện thoại. Nhập sai PIN ① quá 5 lần hoặc sai PIN ②③④ quá 3 lần liên tiếp → thẻ bị khóa điện tử, phải đến 役所 mở lại.',
        image: require('../../../../../assets/content/daily-life/ag_mynumber-card_s4.jpg'),
        imageCaption: 'Nhận thẻ và thiết lập 4 mã PIN tại 役所 theo hướng dẫn của nhân viên',
      },
    ],
  };

export default myNumberCard;
