import type { AdminGuide } from '../../../../types/content';

const marriageCertificateVnJapan: AdminGuide = {
    id: 'marriage-certificate-vn-japan',
    category: 'immigration',
    lastVerified: '2026-08-21',
    priority: 'normal',
    title: 'Đăng ký kết hôn ở Việt Nam khi đang sống tại Nhật',
    titleJp: '婚姻要件具備証明書・ベトナムでの婚姻登録',
    icon: 'heart',
    color: '#E74C3C',
    description: 'Hướng dẫn lấy giấy tờ kết hôn tại Đại sứ quán Việt Nam ở Nhật và đăng ký hôn nhân tại Việt Nam — dành cho người Việt đang sống tại Nhật muốn đăng ký kết hôn theo thủ tục Việt Nam.',
    legalScope: {
      jurisdiction: 'mixed',
      jurisdictionNote: 'Giấy tờ phía Việt Nam do cơ quan lãnh sự Việt Nam tại Nhật hoặc cơ quan hộ tịch Việt Nam xử lý; giấy tờ phía Nhật do municipal office/法務局 hoặc cơ quan lãnh sự Nhật ở Việt Nam cấp tùy hướng đăng ký.',
      sourceVerifiedAt: '2026-08-21',
      nextReviewAt: '2026-12-01',
      riskLevel: 'medium',
      whenToAskExpert: [
        'Một bên từng ly hôn, góa, đổi tên hoặc giấy độc thân/hộ tịch đã quá hạn.',
        'Bạn cần dùng giấy tờ Nhật tại Việt Nam và không rõ hợp pháp hóa lãnh sự/dịch thuật theo bên nào.',
        'Bạn muốn kết hôn ở Việt Nam trước rồi cập nhật ở Nhật, nhưng sau đó cần đổi visa vợ/chồng.',
      ],
    },
    quickAction: {
      deadline: 'Chuẩn bị trước khi về Việt Nam đăng ký kết hôn; giấy xác nhận tình trạng hôn nhân thường có thời hạn sử dụng nên không lấy quá sớm.',
      office: 'Đại sứ quán/Tổng lãnh sự quán Việt Nam tại Nhật; Sở Tư pháp hoặc UBND có thẩm quyền tại Việt Nam; municipal office Nhật nếu cập nhật sau khi kết hôn.',
      doNow: [
        'Chọn hướng đăng ký: làm tại Nhật trước hay Việt Nam trước.',
        'Kiểm tra cơ quan lãnh sự Việt Nam phụ trách tỉnh nơi đang cư trú ở Nhật.',
        'Hỏi nơi đăng ký ở Việt Nam về giấy khám sức khỏe, hợp pháp hóa lãnh sự và bản dịch trước khi đặt vé.',
      ],
      bring: ['Hộ chiếu Việt Nam', 'Thẻ cư trú', 'Giấy khai sinh', 'Giấy xác nhận tình trạng hôn nhân', 'Ảnh và mẫu đơn theo cơ quan lãnh sự', 'Giấy tờ phía người Nhật/người nước ngoài nếu có'],
      ifLate: 'Nếu đã kết hôn ở Việt Nam nhưng chưa cập nhật ở Nhật, chuẩn bị bản dịch tiếng Nhật và hỏi municipal office trước khi nộp thủ tục visa.',
      officialSourceLabels: [
        'Lãnh sự — Đại sứ quán Việt Nam tại Nhật',
        'Tổng Lãnh sự quán VN tại Osaka',
        'ベトナム人との婚姻手続き — 在ベトナム日本国大使館',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_marriage-vn_hero.jpg'),
    heroImageCaption: 'Thủ tục đăng ký kết hôn Việt-Nhật qua Đại sứ quán',
    whoIsThisFor: [
      'Người Việt đang sống tại Nhật muốn đăng ký kết hôn với người Nhật hoặc người Việt khác tại Việt Nam.',
      'Người muốn làm thủ tục kết hôn ở Việt Nam trước (thay vì làm 婚姻届 tại Nhật).',
      'Người đã kết hôn ở Việt Nam và cần hợp thức hóa giấy tờ để cập nhật tình trạng tại Nhật.',
    ],
    whenToDo: [
      'Trước khi về Việt Nam để đăng ký kết hôn — cần lấy giấy tờ xác nhận tình trạng hôn nhân tại Nhật trước.',
      'Người có visa ngắn hạn (短期滞在) không thể lấy được 婚姻要件具備証明書 tại Đại sứ quán Việt Nam — phải có tư cách lưu trú dài hạn.',
    ],
    whereToDo: [
      'Đại sứ quán Việt Nam tại Tokyo — phụ trách các tỉnh miền Đông và Hokkaido.',
      'Tổng Lãnh sự quán Việt Nam tại Osaka — phụ trách các tỉnh miền Tây.',
      'Tổng Lãnh sự quán Việt Nam tại Fukuoka — phụ trách Kyushu và một số tỉnh khác.',
    ],
    estimatedTime: 'Lấy giấy tờ tại Đại sứ quán: 1–5 ngày làm việc. Đăng ký tại Việt Nam: 3–7 ngày làm việc tại sở tư pháp tỉnh. Toàn bộ quy trình: 1–2 tháng nếu không có vấn đề.',
    fees: [
      'Phí xác nhận tình trạng hôn nhân tại Đại sứ quán Việt Nam: theo biểu phí lãnh sự hiện hành (thay đổi theo thời gian — kiểm tra trang Đại sứ quán).',
      'Phí đăng ký kết hôn tại Việt Nam: theo quy định địa phương.',
      'Phí công chứng và hợp pháp hóa giấy tờ từ Nhật: tùy dịch vụ, thường 5,000–30,000 yên.',
    ],
    documentsChecklist: [
      { label: 'Hộ chiếu Việt Nam còn hiệu lực', required: true },
      { label: 'Thẻ cư trú (在留カード) dài hạn', required: true, note: 'Người có visa ngắn hạn (短期滞在) KHÔNG được cấp giấy này.' },
      { label: 'Giấy khai sinh (bản gốc hoặc bản sao công chứng)', required: true },
      { label: 'Xác nhận tình trạng hôn nhân / độc thân từ Việt Nam', required: true, note: 'Cần nhờ người thân lấy hộ tại Việt Nam hoặc qua ủy quyền.' },
      { label: 'Tờ khai đăng ký kết hôn (mẫu của Đại sứ quán)', required: true, note: 'Nhận hoặc tải từ website Đại sứ quán Việt Nam tại Nhật.' },
      { label: 'Giấy khám sức khỏe (bệnh viện công lập Việt Nam)', required: false, note: 'Yêu cầu khi đăng ký tại một số tỉnh ở Việt Nam — xác nhận với Sở Tư pháp địa phương.' },
      { label: 'Ảnh 3×4cm (nền trắng, chụp gần đây)', required: true },
    ],
    commonMistakes: [
      'Visa ngắn hạn vẫn đến Đại sứ quán xin giấy — bị từ chối vì 短期滞在 không được cấp 婚姻要件具備証明書.',
      'Không chuẩn bị giấy tờ độc thân từ Việt Nam trước — đây là giấy tờ cần nhờ người thân lấy hộ, mất nhiều thời gian.',
      'Kết hôn ở Việt Nam xong mà không cập nhật tình trạng tại Nhật — mất quyền đổi visa sang 配偶者等 sau này.',
      'Nhầm giữa thủ tục này và thủ tục 婚姻届 tại Nhật — đây là hai quy trình hoàn toàn khác nhau.',
    ],
    faq: [
      {
        question: 'Kết hôn ở Việt Nam xong thì ở Nhật cần làm gì thêm?',
        answer: 'Sau khi có 婚姻登録証明書 từ Việt Nam, đến municipal office tại Nhật nộp 婚姻届 (kèm bản dịch tiếng Nhật có công chứng). Sau đó nếu đang ở visa lao động và muốn đổi sang 配偶者等 (visa gia đình), cần làm thủ tục 在留資格変更許可申請 tại ISA.',
      },
      {
        question: 'Người Việt kết hôn với người Nhật — nên làm ở đâu trước, Nhật hay Việt Nam?',
        answer: 'Cả hai đều hợp lệ. Làm ở Nhật trước: nộp 婚姻届 tại municipal office Nhật → mang giấy chứng nhận sang Đại sứ quán Việt Nam tại Nhật đăng ký (xem guide "Thủ tục kết hôn tại Nhật"). Làm ở Việt Nam trước: lấy giấy tờ tại Đại sứ quán Việt Nam ở Nhật → về Việt Nam đăng ký → mang giấy về Nhật làm 婚姻届. Hướng nào cũng được, tuỳ kế hoạch.',
      },
      {
        question: 'Giấy tờ từ Nhật cần hợp pháp hóa gì để dùng tại Việt Nam?',
        answer: 'Giấy tờ do cơ quan Nhật Bản cấp (như 住民票, 戸籍謄本 nếu phía người Nhật) cần được hợp pháp hóa lãnh sự (領事認証) tại Đại sứ quán Việt Nam ở Nhật, kèm bản dịch tiếng Việt có công chứng. Giấy tờ do Đại sứ quán Việt Nam tại Nhật cấp thì đã có giá trị trực tiếp khi sử dụng ở Việt Nam.',
      },
      {
        question: 'Hai người Việt ở Nhật có thể đăng ký kết hôn tại Nhật không?',
        answer: 'Có — nộp 婚姻届 tại municipal office Nhật theo hướng dẫn trong guide "Thủ tục kết hôn tại Nhật". Tuy nhiên, để hôn nhân được công nhận ở Việt Nam, vẫn cần đăng ký thêm tại Đại sứ quán Việt Nam ở Nhật hoặc tại Sở Tư pháp khi về nước.',
      },
    ],
    officialLinks: [
      { label: 'Lãnh sự — Đại sứ quán Việt Nam tại Nhật', url: 'https://vnembassy-jp.org/ja/%E7%B5%90%E5%A9%9A%E5%B1%8A' },
      { label: 'Tổng Lãnh sự quán VN tại Osaka', url: 'https://vnconsulate-osaka.org/en/marriage-procedures' },
      { label: 'ベトナム人との婚姻手続き — 在ベトナム日本国大使館', url: 'https://www.vn.emb-japan.go.jp/itpr_ja/11_000001_01666.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Chuẩn bị giấy tờ từ Việt Nam',
        description: 'Trước khi đến Đại sứ quán, cần có sẵn một số giấy tờ từ Việt Nam. Vì đang ở Nhật, cần nhờ người thân hoặc ủy quyền để lấy:\n\n| Giấy tờ | Nơi lấy | Thời hạn |\n|---|---|---|\n| Giấy xác nhận tình trạng hôn nhân (độc thân) | UBND xã/phường nơi đăng ký hộ khẩu | Thường 6 tháng |\n| Giấy khai sinh | UBND xã/phường nơi đã đăng ký khai sinh | Không giới hạn |\n| Hộ khẩu gia đình (bản sao công chứng) | UBND hoặc photo công chứng | |\n\n⚠️ Giấy xác nhận độc thân cần dịch sang tiếng Nhật (nếu Đại sứ quán yêu cầu) hoặc dịch sang tiếng Việt có công chứng tùy quy trình.',
        documents: ['Nhờ người thân hoặc ủy quyền có công chứng để lấy giấy tờ tại Việt Nam'],
        image: require('../../../../../assets/content/daily-life/ag_marriage-vn_s1.jpg'),
        imageCaption: 'Giấy tờ hộ tịch Việt Nam - chuẩn bị trước khi xin giấy xác nhận kết hôn tại Nhật',
        tip: 'Liên hệ Đại sứ quán Việt Nam tại Nhật (theo tỉnh đang sống) để xác nhận danh sách giấy tờ cụ thể — yêu cầu có thể thay đổi theo từng thời điểm.',
      },
      {
        step: 2,
        title: 'Nộp hồ sơ tại Đại sứ quán Việt Nam ở Nhật',
        description: '**Chọn đúng cơ quan theo nơi cư trú:**\n- **Đại sứ quán VN tại Tokyo**: https://vnembassy-jp.org — các tỉnh Kanto, Hokkaido, Tohoku, Chubu\n- **Tổng Lãnh sự quán tại Osaka**: https://vnconsulate-osaka.org — các tỉnh Kinki, Chugoku, Shikoku\n- **Tổng Lãnh sự quán tại Fukuoka**: các tỉnh Kyushu, Okinawa\n\n**Hồ sơ cần mang:**\n- Tờ khai đăng ký kết hôn (tải từ website Đại sứ quán hoặc nhận tại quầy)\n- Hộ chiếu gốc + thẻ cư trú (在留カード)\n- Giấy khai sinh, xác nhận độc thân từ Việt Nam\n- Ảnh 3cm × 4cm (2 tấm, nền trắng)\n- Nếu người kia là người Nhật: các giấy tờ của phía người Nhật theo hướng dẫn của Đại sứ quán\n\n⚠️ **Người có visa 短期滞在 (short-term stay) KHÔNG được cấp giấy này.** Cần có tư cách lưu trú trung/dài hạn.\n\nXử lý: thường **1–5 ngày làm việc** (có thể nhanh hơn tùy trường hợp).',
        documents: ['Hộ chiếu gốc', 'Thẻ cư trú (在留カード) dài hạn', 'Giấy khai sinh', 'Xác nhận độc thân từ Việt Nam', 'Ảnh 3cm × 4cm (2 tấm)'],
        image: require('../../../../../assets/content/daily-life/ag_marriage-vn_s2.jpg'),
        imageCaption: 'Đại sứ quán Việt Nam tại Nhật - nộp hồ sơ xác nhận tình trạng hôn nhân và giấy tờ kết hôn',
        tip: 'Đặt hẹn trước qua website hoặc điện thoại nếu Đại sứ quán yêu cầu. Mang theo bản sao của tất cả giấy tờ gốc — Đại sứ quán thường giữ bản sao.',
      },
      {
        step: 3,
        title: 'Về Việt Nam đăng ký kết hôn tại Sở Tư pháp',
        description: 'Sau khi có đủ giấy tờ, về Việt Nam đăng ký tại **Sở Tư pháp tỉnh/thành phố** (đối với kết hôn có yếu tố nước ngoài — một trong hai người mang quốc tịch ngoài VN, hoặc có giấy tờ do cơ quan nước ngoài cấp):\n\n**Hồ sơ nộp tại Sở Tư pháp:**\n- Tờ khai đăng ký kết hôn (mẫu của Sở Tư pháp)\n- Hộ chiếu của cả hai bên\n- Giấy xác nhận độc thân / tình trạng hôn nhân\n- Giấy khám sức khỏe (từ bệnh viện công — một số tỉnh yêu cầu)\n- Giấy tờ do Đại sứ quán Việt Nam tại Nhật cấp\n- Nếu phía người Nhật: các giấy tờ hộ tịch Nhật đã được lãnh sự hóa + dịch sang tiếng Việt\n\nThời gian: **3–7 ngày làm việc**. Nhận **Giấy chứng nhận kết hôn** (婚姻登録証明書).',
        documents: ['Giấy tờ đã lấy từ Đại sứ quán VN ở Nhật', 'Hộ chiếu cả hai', 'Giấy khám sức khỏe (hỏi Sở Tư pháp tỉnh)'],
        tip: 'Liên hệ trước Sở Tư pháp tỉnh sẽ đăng ký để xác nhận danh sách giấy tờ cụ thể — yêu cầu có thể khác nhau giữa Hà Nội, TP.HCM và các tỉnh khác.',
      },
      {
        step: 4,
        title: 'Cập nhật tình trạng hôn nhân tại Nhật sau khi về',
        description: 'Sau khi có **Giấy chứng nhận kết hôn** từ Việt Nam:\n\n1. Dịch sang tiếng Nhật (bởi dịch thuật viên) và công chứng.\n2. Nộp **婚姻届** tại municipal office Nhật — kèm bản gốc + bản dịch tiếng Nhật.\n3. Municipal office cập nhật 住民票 và thông báo cho ISA.\n\n**Nếu muốn đổi visa sang 配偶者等 (visa vợ/chồng người Nhật):**\n- Cần làm thêm 在留資格変更許可申請 tại ISA — xem mục "Đổi tư cách lưu trú (在留資格変更)" trong app để biết chi tiết hồ sơ.\n- Thường cần: 婚姻届受理証明書 (từ municipal office Nhật), giấy chứng nhận kết hôn Việt Nam + bản dịch, hộ chiếu phía người Nhật, giấy xác nhận thu nhập của người bảo lãnh.\n\n**Nếu muốn bảo lãnh con hoặc thân nhân sang Nhật theo diện 家族滞在:**\n- Xem mục "Bảo lãnh thân nhân sang Nhật (家族滞在)" trong app — cần làm thêm 在留資格認定証明書交付申請 cho từng người muốn sang.',
        documents: ['Giấy chứng nhận kết hôn từ Việt Nam (bản gốc)', 'Bản dịch tiếng Nhật có công chứng', 'Hộ chiếu + thẻ cư trú'],
        tip: 'Nộp 婚姻届 tại Nhật trong vòng 3 tháng kể từ ngày đăng ký ở Việt Nam là thông lệ tốt để tránh chênh lệch thời gian dài giữa hai hệ thống hộ tịch.',
      },
    ],
  };

export default marriageCertificateVnJapan;
