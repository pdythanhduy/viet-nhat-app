import type { AdminGuide } from '../../../../types/content';

const mynaHealthInsuranceCard2026: AdminGuide = {
  id: 'myna-health-insurance-card-2026',
  category: 'health',
  lastVerified: '2026-05-16',
  priority: 'normal',
  title: 'マイナ保険証 — Bảo hiểm y tế tích hợp My Number (chuyển đổi 2024–2026)',
  titleJp: 'マイナ保険証 — 健康保険証の一体化',
  icon: 'medical-outline',
  color: '#00897B',
  description:
    'Thời kỳ chuyển tiếp **đã kết thúc 01/12/2025**. Hiện tại (2026), thẻ 健康保険証 vật lý cũ **đã hết hiệu lực** (trừ một số thẻ có hạn ghi sau 12/2025). Hệ thống chính thức là **マイナ保険証** (chức năng bảo hiểm y tế tích hợp trên My Number Card) hoặc **資格確認書** (giấy thay thế cho người không thể dùng My Number Card). Mốc lịch sử: **02/12/2024** ngừng cấp thẻ vật lý mới; **01/12/2025** thẻ vật lý cũ hết hiệu lực. Đây là **tài liệu định hướng theo nguồn 厚労省 + マイナポータル** — kiểm tra với bảo hiểm + bệnh viện trước khi đi khám.',
  searchKeywords: [
    'マイナ保険証',
    'myna hoken sho',
    'bảo hiểm y tế My Number',
    'thẻ bảo hiểm mới',
    '健康保険証 廃止',
    'health insurance card abolish',
    '資格確認書',
    '健康保険証 マイナンバー',
    'bảo hiểm Nhật 2025',
    'phế thẻ bảo hiểm',
    'mã bảo hiểm số',
    'đăng nhập マイナポータル',
    '保険証 マイナンバー 一体化',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      '厚生労働省 (MHLW) quản — luật 健康保険法 + 高齢者の医療の確保に関する法律 + 国民健康保険法 + 行政手続における特定の個人を識別するための番号の利用等に関する法律 (My Number Law). Triển khai: 保険者 (bảo hiểm — 健保組合 / 協会けんぽ / 国保 / 後期高齢) đăng ký マイナ保険証 + cấp 資格確認書 cho người không dùng được. Mốc đã qua: 02/12/2024 ngừng cấp thẻ vật lý mới; 01/12/2025 thẻ cũ hết hiệu lực (trừ thẻ có hạn ghi sau). Ngoại lệ cho trẻ em / người cao tuổi / hoàn cảnh đặc biệt — đa số được cấp 資格確認書 tự động — kiểm tra 厚労省.',
    sourceVerifiedAt: '2026-05-14',
    nextReviewAt: '2026-09-01',
    riskLevel: 'high',
    whenToAskExpert: [
      'Bạn / gia đình chưa có My Number Card mà thẻ bảo hiểm vật lý sắp hết hạn → có nguy cơ tạm thời không có bảo hiểm. Hỏi 市役所 + 保険者 ngay.',
      'Đi viện cấp cứu mà chưa kích hoạt マイナ保険証 → mang My Number Card + giải thích tại quầy 受付 + có thể phải tự trả 100% rồi xin hoàn (償還払い).',
      'Trẻ em / người cao tuổi / người khuyết tật chưa có My Number Card → quy trình 資格確認書 — hỏi 保険者 trực tiếp.',
      'Visa ngắn hạn / không có 住民票 → KHÔNG đủ điều kiện kaigo / 国保 — kiểm tra bảo hiểm du lịch hoặc 短期在留者用 bảo hiểm.',
      'Đổi việc / đổi 保険者 (社保 → 国保 hoặc ngược lại) — phải đăng ký lại マイナ保険証 cho 保険者 mới.',
    ],
  },
  quickAction: {
    deadline:
      '**Đã qua thời kỳ chuyển tiếp**: thẻ vật lý cũ đã hết hiệu lực từ 01/12/2025 (trừ thẻ có hạn ghi sau). Hiện tại bắt buộc dùng **マイナ保険証** hoặc **資格確認書**. NẾU bạn vẫn chưa kích hoạt: làm NGAY — đang đi viện không có thẻ hợp lệ phải tự trả 100% rồi xin hoàn (償還払い). KHÔNG có deadline cấp 資格確認書 — nhiều 保険者 đã tự động cấp cho người chưa kích hoạt マイナ保険証.',
    office:
      '**保険者** (bảo hiểm của bạn) là người cấp giấy + xử lý đăng ký:\n• 協会けんぽ / 健保組合 (nhân viên công ty) — qua phòng nhân sự công ty.\n• 国民健康保険 (国保 — tự kinh doanh / thất nghiệp / 60+) — qua **市役所/区役所** phòng 国保課.\n• 後期高齢者医療制度 (75+) — qua 市役所.\n• 共済組合 (nhân viên公務員) — qua tổ chức công.\n**マイナポータル** kích hoạt 健康保険証 利用申込 (qua app sau khi có My Number Card).',
    doNow: [
      'KIỂM TRA hạn thẻ 健康保険証 vật lý hiện tại — ghi trên mặt thẻ (có thể đến cuối 2025 hoặc theo gia hạn 保険者).',
      'Nếu CHƯA có My Number Card → xin tại 市役所 (xem my-number-card guide) — 1 tháng cấp thẻ.',
      'Khi đã có My Number Card → kích hoạt **健康保険証 利用申込** qua **マイナポータル** app — 1–2 tuần có hiệu lực.',
      'Nếu KHÔNG thể dùng My Number Card (chưa có / không muốn) → xin **資格確認書** từ 保険者 (qua nhân sự công ty hoặc 市役所 cho 国保).',
      'Khi đi viện sau khi thẻ vật lý hết hạn: mang My Number Card + chạm vào máy đọc 顔認証付きカードリーダー tại 受付.',
    ],
    bring: [
      'My Number Card (vật lý)',
      '健康保険証 vật lý hiện tại (chưa hủy)',
      '在留カード (cho người nước ngoài)',
      'パスポート (xác minh phụ)',
      '保険者 thông tin (tên + số bảo hiểm) — trên thẻ hiện tại',
      '4 PIN My Number Card (cho マイナポータル app)',
    ],
    ifLate:
      'Thẻ vật lý đã hết hạn + chưa có マイナ保険証 → khi đi viện có thể phải tự trả 100% rồi xin hoàn lại (償還払い). Gọi 保険者 NGAY xin **資格確認書** tạm thời. Hoặc xin My Number Card gấp tại 市役所 (~1 tháng).',
    officialSourceLabels: ['厚生労働省 — マイナ保険証'],
  },
  whoIsThisFor: [
    'Người Việt có 健康保険 vật lý hiện tại (社保 / 国保 / 後期高齢) cần chuyển sang マイナ保険証.',
    'Người Việt chưa có My Number Card — cần biết option 資格確認書.',
    'Trẻ em / người cao tuổi gia đình không thể dùng My Number Card.',
    'Người Việt đổi việc → 保険者 mới — cần đăng ký lại マイナ保険証.',
    'Du học sinh + thực tập sinh + nhân viên — cải cách áp dụng cho tất cả người có 健康保険.',
    'Phụ huynh muốn hiểu cách thẻ bảo hiểm con thay đổi.',
    'KHÔNG dành cho: tư vấn cá nhân — vấn đề khẩn cấp y tế → bệnh viện trực tiếp. Vấn đề bảo hiểm → 保険者 trực tiếp.',
  ],
  whenToDo: [
    '**NGAY BÂY GIỜ** nếu bạn chưa kích hoạt マイナ保険証 và chưa có 資格確認書: thẻ vật lý cũ đã hết hiệu lực từ 01/12/2025 → rủi ro phải tự trả 100% khi đi viện.',
    '**Mốc đã qua**: 02/12/2024 ngừng cấp thẻ vật lý mới; 01/12/2025 đa số thẻ vật lý hết hiệu lực (một số có hạn ghi sau vẫn dùng được đến hạn ghi).',
    '**Khi đổi việc** / 退職 / 入社: đăng ký lại với 保険者 mới — マイナ保険証 link tự động sau xác nhận (5–10 ngày).',
    '**Khi đổi 市町村** (cho 国保): chuyển 住民票 + đăng ký 国保 mới.',
    '**Khi 75 tuổi**: tự động chuyển sang 後期高齢者医療制度 — マイナ保険証 chuyển theo.',
    '**Sau khi nhận con mới sinh**: đăng ký bảo hiểm cho con trong 14 ngày — 資格確認書 cho con (đa số trẻ em chưa có My Number Card).',
    '**Khi 資格確認書 sắp hết hạn** (tối đa 5 năm): xin lại tại 保険者.',
  ],
  whereToDo: [
    '**Đăng ký マイナ保険証**:\n• **マイナポータル app** (Free) — link với My Number Card qua NFC.\n• Setup → 健康保険証 利用申込 → 1–2 tuần có hiệu lực.\n• Hoặc tại 顔認証付きカードリーダー ở bệnh viện đầu tiên (đa số tự kích hoạt).',
    '**Xin 資格確認書** (cho người không dùng My Number Card):\n• **社保** (协会 / 健保組合): qua **phòng nhân sự công ty** → công ty xin 保険者.\n• **国保**: **市役所/区役所** phòng 国保課.\n• **後期高齢**: **市役所**.\n• Cấp miễn phí — tự động cho người chưa kích hoạt マイナ保険証 (一部 trường hợp).',
    '**Khi đi viện**:\n• Bệnh viện / phòng khám có **顔認証付きカードリーダー** (đa số 2026):\n  - Chạm My Number Card.\n  - Xác minh khuôn mặt hoặc PIN.\n  - Tự động xác nhận bảo hiểm.\n• Bệnh viện chưa có máy đọc → mang 健康保険証 vật lý (còn hạn) hoặc 資格確認書.',
    '**Hỗ trợ**:\n• **マイナンバー総合フリーダイヤル** 0120-95-0178 — tư vấn miễn phí.\n• **市役所/区役所** 国保課 — cho 国保 user.\n• **保険者 hotline** — số trên thẻ vật lý hoặc trang web 保険者.',
  ],
  estimatedTime:
    'Kích hoạt マイナ保険証 qua app: 15–30 phút setup + 1–2 tuần có hiệu lực. Xin 資格確認書: 15 phút tại 市役所 / công ty + 1–2 tuần nhận. Đi viện với マイナ保険証: ~30 giây tại 受付 (nhanh hơn thẻ vật lý). 顔認証 cho lần đầu: ~1 phút.',
  fees: [
    '**Đăng ký マイナ保険証**: MIỄN PHÍ.',
    '**Xin 資格確認書**: MIỄN PHÍ.',
    '**My Number Card**: MIỄN PHÍ (xem my-number-card guide).',
    '**Đi viện với マイナ保険証**:\n• Phần đóng góp 10–30% theo bảo hiểm (giống như với thẻ vật lý).\n• KHÔNG có phí thêm.\n• Một số viện có **マイナ保険証 加算** — phí khoảng vài chục yên/lần (đang tranh cãi, có thể bỏ).',
    '**Đi viện với 資格確認書**:\n• Phần đóng góp tương tự マイナ保険証.\n• KHÔNG có phí thêm.',
    '**Đi viện KHÔNG có thẻ nào**:\n• Tự trả 100% — sau đó xin hoàn 70–90% qua 保険者 (償還払い procedure).\n• Phức tạp — tránh tình huống này.',
  ],
  documentsChecklist: [
    { label: 'My Number Card (vật lý)', required: false, note: 'Cho マイナ保険証 — bắt buộc nếu chọn option này.' },
    { label: '健康保険証 vật lý hiện tại', required: false, note: 'Giữ đến khi hết hạn hoặc thay bằng 資格確認書.' },
    { label: '4 PIN My Number Card', required: false, note: 'Cho マイナポータル app + 顔認証付きカードリーダー (PIN backup).' },
    { label: '在留カード', required: true, note: 'Bắt buộc cho người nước ngoài — chứng minh tư cách cư trú + 住民票 hợp lệ.' },
    { label: '住民票', required: false, note: 'Có thể cần để xin 資格確認書 ở 市役所 nếu là 国保.' },
    { label: 'Số bảo hiểm hiện tại', required: true, note: 'Trên thẻ vật lý — cần khi đăng ký lại.' },
    { label: 'Email + số điện thoại Nhật', required: false, note: 'Cho thông báo từ 保険者.' },
  ],
  commonMistakes: [
    'Tin "không làm gì cũng được" → SAI. Thẻ vật lý sẽ hết hạn — phải có マイナ保険証 hoặc 資格確認書 trước đó.',
    'Đợi đến hạn cuối mới làm → 保険者 có thể xử lý chậm + bị mất thời gian không bảo hiểm.',
    'Tin "không có My Number Card = không có bảo hiểm" → SAI. Có 資格確認書 thay thế.',
    'Nhận 資格確認書 rồi nghĩ "vĩnh viễn" → 資格確認書 cũng có hạn (5 năm tối đa). Cần xin lại định kỳ.',
    'Quên kích hoạt 健康保険証 利用申込 trong マイナポータル sau khi có My Number Card → vẫn không dùng được tại viện.',
    'Đến viện mà KHÔNG mang gì (tin "có chip auto") → bệnh viện cần thẻ vật lý / số thẻ.',
    'Đổi việc mà KHÔNG báo nhân sự + 保険者 cũ → bảo hiểm trùng hoặc bị mất tạm thời.',
    'Tin lừa đảo SMS / điện thoại "phải nâng cấp マイナ保険証 — click link" → KHÔNG bao giờ chính phủ gửi link click. Vào trang 厚労省 trực tiếp.',
    'Chia sẻ PIN My Number Card cho người khác → có thể lạm dụng → mất bảo hiểm + rủi ro tài chính.',
    'Bố/mẹ cao tuổi không quen công nghệ → ép họ dùng マイナ保険証. Cho họ 資格確認書 — đơn giản hơn.',
  ],
  faq: [
    {
      question: 'Tôi còn cầm thẻ 健康保険証 vật lý — vẫn dùng được không?',
      answer:
        'Kiểm tra **mặt trước thẻ** — ghi 有効期限 (hạn).\n\n**Tình trạng hiện tại (2026)**:\n\n• **Đa số thẻ vật lý đã hết hiệu lực** từ 01/12/2025 — KHÔNG dùng được tại viện.\n• **Một số thẻ có hạn ghi sau 12/2025** vẫn dùng được đến hạn ghi (ngoại lệ — tự kiểm tra).\n• Sau khi thẻ vật lý hết → BẮT BUỘC dùng マイナ保険証 hoặc 資格確認書.\n\n**Nếu thẻ vật lý của bạn đã hết hạn**:\n\n• Đã kích hoạt マイナ保険証 trước đó → tự động dùng được tại viện có 顔認証付きカードリーダー.\n• Chưa kích hoạt + chưa có 資格確認書 → đi viện có thể phải tự trả 100% → xin hoàn (償還払い) sau.\n• Nhiều 保険者 đã tự động cấp 資格確認書 cho người chưa kích hoạt — kiểm tra mail từ 保険者.\n\n**Hành động ngay**:\n\n1. Đọc hạn thẻ vật lý hiện tại.\n2. Kiểm tra mail/thông báo từ 保険者 — có thể đã nhận 資格確認書 mà không để ý.\n3. Nếu cả 2 đều không có → gọi 保険者 (số trên thẻ cũ) xin 資格確認書 NGAY hoặc kích hoạt マイナ保険証 qua マイナポータル.\n\n**Theo 保険者**:\n\n• **協会けんぽ**: hạn 12/2025 — đa số đã hết.\n• **健保組合**: theo công bố 保険者 — đa số 12/2025.\n• **国保**: theo 市町村 — đa số 7/2025 hoặc 12/2025.\n• **後期高齢者医療制度**: theo 都道府県広域連合 — đa số 7/2025.',
    },
    {
      question: 'Cách kích hoạt マイナ保険証 từng bước?',
      answer:
        '**Yêu cầu trước**:\n\n• Có My Number Card vật lý.\n• Biết 4 PIN My Number Card (có thể cần 利用者証明用 4 chữ số + 署名用 6–16 chữ).\n• Smartphone có NFC (iPhone iOS 14+) hoặc Felica (Android).\n• Hoặc đầu đọc thẻ + PC.\n\n**Bước 1 — Cài app マイナポータル**:\n\n• App Store / Google Play.\n• Đăng ký + tạo profile.\n\n**Bước 2 — Đăng ký 健康保険証 利用申込**:\n\n1. Mở マイナポータル app.\n2. Đăng nhập với My Number Card qua NFC + PIN.\n3. Menu → "健康保険証としての利用申込".\n4. Chấp nhận điều khoản.\n5. Submit.\n6. Hoặc — tại bệnh viện đầu tiên, **顔認証付きカードリーダー** sẽ tự động đăng ký nếu chưa có.\n\n**Bước 3 — Đợi xác nhận**:\n\n• Thường có hiệu lực **trong 1–2 tuần**.\n• Kiểm tra status trong マイナポータル.\n\n**Bước 4 — Sử dụng tại viện**:\n\n• Đến quầy 受付 với **顔認証付きカードリーダー** (có ở đa số viện 2026).\n• Chạm My Number Card vào máy.\n• Xác minh:\n  - **顔認証** (nhận diện khuôn mặt) — đa số.\n  - Hoặc **PIN** 4 chữ số (利用者証明用).\n• Tự động xác nhận bảo hiểm — KHÔNG cần xuất thẻ vật lý.\n• Tốc độ: ~30 giây (nhanh hơn thẻ vật lý).\n\n**Lưu ý**:\n\n• 顔認証 KHÔNG luôn hoạt động (đeo kính, đeo mask) — PIN backup.\n• Viện chưa có máy đọc → vẫn cần thẻ vật lý / 資格確認書.\n• Đổi 保険者 (đổi việc / 国保 ↔ 社保) → mất 5–10 ngày tự động cập nhật.',
    },
    {
      question: '資格確認書 là gì? Khi nào cần?',
      answer:
        '**資格確認書** (Shikaku Kakuninsho) là **giấy thay thế** thẻ bảo hiểm vật lý cho người KHÔNG dùng được マイナ保険証.\n\n**Khi nào cần 資格確認書**:\n\n• **Chưa có My Number Card**:\n  - Mới sinh con.\n  - Người không xin My Number Card.\n  - Đang chờ cấp lại My Number Card.\n\n• **Không muốn dùng My Number Card cho bảo hiểm**:\n  - Lý do bảo mật cá nhân.\n  - Bất tiện khi dùng app.\n\n• **My Number Card hết hạn / khóa / mất**:\n  - Chờ cấp lại.\n  - Phục hồi PIN.\n\n• **Trẻ em / người cao tuổi không quen công nghệ**:\n  - Có My Number Card nhưng không thực tế dùng.\n\n• **Người khuyết tật không thể dùng 顔認証**:\n  - Khuôn mặt khó nhận diện.\n  - Không tự ký PIN.\n\n**Cách xin**:\n\n• **社保** (nhân viên công ty): qua phòng nhân sự công ty → công ty xin 保険者.\n• **国保** (国民健康保険): **市役所/区役所** phòng 国保課. Mang 在留カード + 健康保険証 vật lý hiện tại.\n• **後期高齢**: **市役所**.\n\n**Phí**: MIỄN PHÍ.\n\n**Hạn sử dụng**:\n\n• Tối đa **5 năm** (mỗi 保険者 có quy định cụ thể).\n• Khi hết hạn → xin lại.\n• Khi đổi việc → xin lại với 保険者 mới.\n\n**Dùng**:\n\n• Tại quầy 受付 — đưa 資格確認書 thay thẻ vật lý.\n• Có thông tin tương tự thẻ vật lý cũ: tên, số bảo hiểm, hạn.\n\n**Cảnh báo**:\n\n• Một số 保険者 tự động cấp khi thẻ hết hạn + người không kích hoạt マイナ保険証.\n• Tin chính thức từ 保険者 qua mail — KHÔNG nhấn link SMS / email lạ.',
    },
    {
      question: 'Mất My Number Card / quên PIN → đi viện cần làm gì?',
      answer:
        '**Tình huống khẩn cấp y tế** — đừng để thẻ làm chậm khám.\n\n**Bước 1**: Đến viện ngay.\n\n**Bước 2 — Tại quầy 受付**:\n\n• Giải thích: "マイナンバーカードを紛失しました" (Tôi mất My Number Card) hoặc "PINを忘れました" (Tôi quên PIN).\n• Đưa **bất kỳ ID nào** (在留カード, hộ chiếu, 健康保険証 vật lý nếu còn).\n• Hỏi: "保険適用で診察できますか？" (Có thể khám với bảo hiểm không?).\n\n**Bước 3 — Tùy viện**:\n\n• Đa số viện có thể:\n  - Tra cứu bảo hiểm qua hệ thống nội bộ với số 保険者 (nếu bạn nhớ).\n  - Cho khám với điều kiện: bạn sẽ mang thẻ / 資格確認書 trong vòng N ngày.\n  - Khám rồi điều chỉnh phí sau.\n\n• Một số viện yêu cầu:\n  - Tự trả 100% trước.\n  - Sau khi có thẻ → xin **償還払い** (hoàn tiền 70–90%) qua 保険者.\n\n**Bước 4 — Sau khi về**:\n\n• Mất My Number Card:\n  - Báo 警察 → giấy báo mất.\n  - **個人番号カードコールセンター 0120-95-0178** → khóa thẻ ngay.\n  - 市役所 xin cấp lại (1 tháng).\n• Quên PIN:\n  - Đến 市役所 với ID → reset PIN miễn phí.\n\n**Bước 5 — Tạm thời**:\n\n• Trong khi đợi thẻ mới / PIN: xin **資格確認書** từ 保険者 — có hiệu lực nhanh (vài ngày).\n• Có thể dùng thẻ 健康保険証 vật lý hiện tại nếu còn hạn.\n\n**Cảnh báo trong khám cấp cứu**:\n\n• KHÔNG nói "không có gì cả" — luôn có option.\n• KHÔNG bỏ qua khám vì sợ phí.\n• 119 + cấp cứu phải đến viện trước → giải quyết phí sau.',
    },
    {
      question: 'Người Việt mới sang Nhật — quy trình bảo hiểm 2026 thế nào?',
      answer:
        '**Lộ trình 30 ngày đầu**:\n\n**Ngày 1–7**:\n\n• Đăng ký 住民票 tại 市役所/区役所 (trong 14 ngày).\n• Cùng lần → đăng ký 健康保険:\n  - **国民健康保険 (国保)** nếu chưa đi làm / là du học sinh / 個人事業.\n  - **協会けんぽ / 健保組合** qua công ty nếu đi làm chính thức.\n\n**Ngày 7–14**:\n\n• Nhận **資格確認書 tạm thời** (1 tuần) hoặc **thẻ bảo hiểm vật lý** (tùy 保険者):\n  - **02/12/2024 trở đi**: ĐA SỐ KHÔNG cấp thẻ vật lý mới — cấp **資格確認書** tạm thời thay.\n  - Ngoại lệ: một số 保険者 vẫn cấp thẻ vật lý đến gần ngày hết hạn của系統 cũ.\n\n**Ngày 14–30**:\n\n• Xin My Number Card tại 市役所 (xem my-number-card guide):\n  - Nhận 個人番号通知書 qua bưu điện sau 2–4 tuần.\n  - Xin My Number Card → 1 tháng cấp thẻ.\n\n**Sau 1 tháng (có My Number Card)**:\n\n• Cài app マイナポータル.\n• Kích hoạt 健康保険証 利用申込.\n• 1–2 tuần sau → dùng được tại viện.\n\n**Trong khi chờ My Number Card**:\n\n• Dùng **資格確認書** tại viện — đầy đủ chức năng.\n\n**Tổng thời gian**: 1–2 tháng để có hệ thống bảo hiểm hoàn chỉnh với マイナ保険証.\n\n**Khi đi viện trong khi chờ**:\n\n• Mang 資格確認書 + 在留カード.\n• Phần đóng góp 10–30% như bình thường.\n\n**Cảnh báo**:\n\n• KHÔNG chậm trễ đăng ký 住民票 + 健康保険 → bị tính phí lùi từ ngày đến Nhật.\n• KHÔNG bỏ qua đăng ký nghĩ "không bị bệnh đâu" → rủi ro tài chính lớn nếu có sự cố.\n• Đăng ký 健康保険 là **BẮT BUỘC** theo luật cho mọi người có 住民票.',
    },
  ],
  counterPhrases: [
    {
      jp: 'マイナ保険証を使いたいです。',
      romaji: 'Maina hokensho o tsukaitai desu.',
      vn: 'Tôi muốn dùng マイナ保険証.',
      note: 'Tại quầy 受付 bệnh viện.',
    },
    {
      jp: '健康保険証として使う申込みをしました。',
      romaji: 'Kenkou hokensho to shite tsukau moushikomi o shimashita.',
      vn: 'Tôi đã đăng ký dùng cho bảo hiểm y tế.',
      note: 'Khi viện hỏi đã kích hoạt chưa.',
    },
    {
      jp: '資格確認書をください。',
      romaji: 'Shikaku kakuninsho o kudasai.',
      vn: 'Xin cấp giấy xác nhận bảo hiểm.',
      note: 'Tại 市役所 / công ty.',
    },
    {
      jp: '保険証の有効期限を確認したいです。',
      romaji: 'Hokenshou no yuukou kigen o kakunin shitai desu.',
      vn: 'Tôi muốn kiểm tra hạn thẻ bảo hiểm.',
      note: 'Tại 保険者 / 市役所.',
    },
    {
      jp: 'マイナンバーカードを忘れました。',
      romaji: 'Mainanbaa kaado o wasuremashita.',
      vn: 'Tôi quên My Number Card.',
      note: 'Tại quầy bệnh viện — vẫn có thể khám.',
    },
    {
      jp: 'PINを忘れました。',
      romaji: 'PIN o wasuremashita.',
      vn: 'Tôi quên PIN.',
      note: 'Tại 市役所 — reset miễn phí.',
    },
    {
      jp: '転職したので保険証を変更したいです。',
      romaji: 'Tenshoku shita node hokenshou o henkou shitai desu.',
      vn: 'Tôi đã đổi việc, muốn đổi bảo hiểm.',
      note: 'Tại 保険者 mới qua nhân sự công ty.',
    },
    {
      jp: '子供の保険証も作りたいです。',
      romaji: 'Kodomo no hokensho mo tsukuritai desu.',
      vn: 'Tôi muốn làm bảo hiểm cho con.',
      note: 'Tại 市役所 (国保) hoặc nhân sự (社保).',
    },
  ],
  keyTerms: [
    {
      term: 'マイナ保険証',
      reading: 'マイナほけんしょう',
      meaningVi: 'thẻ bảo hiểm y tế tích hợp trên My Number Card',
      noteVi: 'Sau 12/2025 là cách CHÍNH THỨC để khám bệnh. Bạn dùng マイナンバーカード thay 健康保険証 giấy + đặt lên máy đọc trong bệnh viện. Lợi ích: tự động đối chiếu lịch sử khám / thuốc / 高額療養費 limit. Cần đăng ký liên kết ở マイナポータル app hoặc tại bệnh viện có máy セットアップ trước lần đầu dùng.',
    },
    {
      term: '資格確認書',
      reading: 'しかくかくにんしょ',
      meaningVi: 'giấy xác nhận tư cách bảo hiểm (thay thế khi không dùng được マイナ保険証)',
      noteVi: 'Áp dụng cho: người KHÔNG có My Number Card, hoặc có nhưng chưa liên kết bảo hiểm, hoặc người cao tuổi không sử dụng kỹ thuật số. Bảo hiểm chủ động gửi nếu thấy bạn chưa liên kết — KHÔNG cần xin. Hạn ≤ 5 năm. Mất / hỏng → 市役所 (国保) hoặc 健保組合 (社保) cấp lại.',
    },
    {
      term: '健康保険証',
      reading: 'けんこうほけんしょう',
      meaningVi: 'thẻ bảo hiểm y tế (giấy/nhựa cũ — đã ngừng cấp mới)',
      noteVi: 'Từ 02/12/2024 KHÔNG cấp thẻ mới nữa. Thẻ cũ còn hạn dùng được đến 01/12/2025 (hoặc đến hạn nếu trên thẻ ghi sau 12/2025). Sau 12/2025: cần dùng マイナ保険証 hoặc 資格確認書.',
    },
    {
      term: '健康保険証利用登録',
      reading: 'けんこうほけんしょうりようとうろく',
      meaningVi: 'đăng ký liên kết bảo hiểm với My Number Card',
      noteVi: 'Phải làm 1 lần trước khi dùng được マイナ保険証. 3 cách: (1) マイナポータル app trên smartphone NFC; (2) Quầy セブン銀行 ATM; (3) Tại bệnh viện/phòng khám có máy đọc thẻ. Miễn phí.',
    },
    {
      term: '医療情報・薬剤情報',
      reading: 'いりょうじょうほう・やくざいじょうほう',
      meaningVi: 'thông tin lịch sử khám + thuốc',
      noteVi: 'Khi dùng マイナ保険証 → bệnh viện thấy được lịch sử 3 năm gần: thuốc đã uống + bệnh nền + khám sức khoẻ. Tránh được kê thuốc trùng / phản ứng. Lần đầu phải BẤM ĐỒNG Ý tại máy đọc → nếu không đồng ý, vẫn dùng được nhưng bệnh viện không thấy thông tin.',
    },
    {
      term: '限度額適用認定証',
      reading: 'げんどがくてきようにんていしょ',
      meaningVi: 'giấy chứng nhận hạn mức (cho 高額療養費)',
      noteVi: 'Trước: phải xin giấy này TRƯỚC khi nhập viện lớn để chỉ trả phần dưới hạn mức 高額療養費 tại quầy. Với マイナ保険証 từ 2024: tự động — KHÔNG cần xin giấy này nữa. Lợi ích lớn khi cấp cứu / nhập viện gấp.',
    },
  ],
  officialLinks: [
    { label: '厚生労働省 — マイナ保険証', url: 'https://www.mhlw.go.jp/stf/index_16745.html' },
  ],
  steps: [
    {
      step: 1,
      title: 'Hiểu lộ trình chuyển đổi 2024–2026',
      description:
        '**Lịch sử lộ trình**:\n\n• **Trước 02/12/2024**: hệ thống cũ — chỉ thẻ 健康保険証 vật lý.\n• **02/12/2024**: 厚労省 ngừng cấp thẻ vật lý mới. Người mới đăng ký bảo hiểm sau ngày này chỉ nhận マイナ保険証 hoặc 資格確認書.\n• **02/12/2024 – 01/12/2025**: thời kỳ chuyển tiếp — thẻ vật lý cũ vẫn hiệu lực đến hạn ghi trên thẻ.\n• **01/12/2025**: đa số thẻ vật lý hết hiệu lực (một số có hạn ghi sau vẫn dùng đến hạn).\n• **Hiện tại (2026)**: マイナ保険証 + 資格確認書 là 2 lựa chọn chính thức. Cải cách đã hoàn tất phần lớn.\n\n**Phân loại người dùng**:\n\n• **A. Đã có My Number Card + đã kích hoạt 健康保険証**:\n  - Sẵn sàng dùng マイナ保険証.\n  - KHÔNG cần làm gì thêm.\n\n• **B. Đã có My Number Card nhưng CHƯA kích hoạt 健康保険証**:\n  - Cần kích hoạt qua マイナポータル.\n  - Hoặc tự kích hoạt tại 顔認証付きカードリーダー bệnh viện đầu tiên.\n\n• **C. CHƯA có My Number Card**:\n  - **Option 1**: Xin My Number Card (1 tháng cấp) + kích hoạt 健康保険証.\n  - **Option 2**: Xin 資格確認書 từ 保険者 — không cần My Number Card.\n  - Đa số trường hợp: Option 2 nhanh hơn cho tạm thời.\n\n• **D. Trẻ em / người cao tuổi không quen công nghệ**:\n  - 資格確認書 là option tốt nhất.\n  - Nếu muốn My Number Card → quy trình đơn giản hơn (trẻ em không cần PIN ký).',
      documents: [],
      tip: 'Đa số người Việt giờ thuộc nhóm B hoặc C — nếu chưa hành động, làm NGAY để tránh tình huống không bảo hiểm khi đi viện.',
    },
    {
      step: 2,
      title: 'Kiểm tra thẻ hiện tại + quyết định option',
      description:
        '**Bước 1 — Kiểm tra trạng thái hiện tại**:\n\n**Thẻ 健康保険証 vật lý cũ** (nếu còn cầm):\n• Tìm hạn trên thẻ (有効期限 / 有効期間).\n• Đa số đã hết hạn 7/2025–12/2025.\n• Còn hạn ghi sau 12/2025 → vẫn dùng đến hạn ghi.\n\n**Kiểm tra 資格確認書**: đa số 保険者 đã tự động gửi qua bưu điện cho người chưa kích hoạt マイナ保険証. Tìm trong giấy tờ nhận từ 保険者 trong 2025.\n\n**Kiểm tra マイナ保険証**: mở app マイナポータル → menu 健康保険証 → xem đã kích hoạt chưa.\n\n**Bước 2 — Đánh giá rủi ro**:\n\n• Đã có ít nhất 1 trong 3 (マイナ保険証 / 資格確認書 / thẻ vật lý còn hạn) → ổn.\n• KHÔNG có cái nào → GẤP — rủi ro phải tự trả 100% khi đi viện.\n\n**Bước 3 — Chọn option**:\n\n**Có My Number Card đã + có app マイナポータル**:\n• → Kích hoạt 健康保険証 利用申込 trong app (bước 3 dưới).\n• Thời gian: 1–2 tuần có hiệu lực.\n\n**Có My Number Card nhưng KHÔNG dùng app**:\n• → Đến viện đầu tiên có 顔認証付きカードリーダー → tự động kích hoạt.\n• Hoặc — xin 資格確認書 từ 保険者 (đơn giản hơn).\n\n**Chưa có My Number Card + muốn nhanh**:\n• → Xin 資格確認書 từ 保険者 (1–2 tuần cấp).\n• Sau đó xin My Number Card từ tốn.\n\n**Chưa có My Number Card + muốn đầy đủ**:\n• → Xin My Number Card trước (1 tháng cấp).\n• Sau đó kích hoạt 健康保険証 利用申込.\n• Trong khi chờ: 資格確認書 tạm thời.\n\n**Kế hoạch khuyến nghị cho người Việt mới sang**:\n\n1. Đăng ký 住民票 + 健康保険 trong 7 ngày.\n2. Yêu cầu 資格確認書 ngay → dùng được trong 1 tuần.\n3. Cùng lúc xin My Number Card → 1 tháng cấp.\n4. Sau khi có thẻ → kích hoạt 健康保険証 利用申込.\n5. Tổng 1–2 tháng đầy đủ hệ thống.',
      documents: ['健康保険証 vật lý hiện tại', '在留カード'],
      tip: '資格確認書 là backup tốt — luôn có (kể cả khi dùng マイナ保険証) cho trường hợp mất My Number Card.',
    },
    {
      step: 3,
      title: 'Kích hoạt マイナ保険証 qua マイナポータル app',
      description:
        '**Yêu cầu**:\n\n• My Number Card vật lý.\n• 4 PIN My Number Card.\n• Smartphone (iOS 14+ NFC hoặc Android Felica) HOẶC PC + đầu đọc thẻ.\n\n**Bước 1 — Cài app**:\n\n1. Download マイナポータル app từ Apple Store / Google Play.\n2. Mở app.\n3. Đăng ký + tạo profile.\n4. Setup PIN trong app.\n\n**Bước 2 — Đăng ký 健康保険証 利用申込**:\n\n1. Mở app → menu chính.\n2. Tìm "健康保険証としての利用申込" (Đăng ký dùng làm thẻ bảo hiểm).\n3. Đọc + chấp nhận điều khoản.\n4. Đăng nhập với My Number Card:\n   - Đặt thẻ trên lưng iPhone (NFC zone) hoặc Android Felica.\n   - Nhập 4-chữ-số 利用者証明用 PIN.\n   - Đợi 5–10 giây — app đọc thẻ.\n5. Confirm thông tin (tên + 個人番号).\n6. Submit.\n\n**Bước 3 — Đợi xác nhận**:\n\n• Thường có hiệu lực **1–2 tuần** (đôi khi nhanh hơn).\n• Có thể kiểm tra status trong app.\n• Nhận email / thông báo trong app khi hoàn tất.\n\n**Bước 4 — Kiểm tra thông tin trong app**:\n\n• Mở app → 健康保険証 menu.\n• Xem:\n  - 保険者 (tên).\n  - Số bảo hiểm.\n  - Hạn.\n  - Thông tin gia đình (nếu là 国保 gia đình).\n\n**Lưu ý**:\n\n• Nếu nhập sai PIN 3 lần → khóa thẻ → đến 市役所 reset.\n• App có thể chậm — đợi 10–30 giây sau khi chạm thẻ.\n• Đa số viện 2026 đã có 顔認証付きカードリーダー — kiểm tra trang web viện.',
      documents: ['My Number Card', '4 PIN'],
      tip: 'Đăng ký SỚM (không đợi đến lúc đi viện) — để có thời gian xử lý + test thử.',
    },
    {
      step: 4,
      title: 'Xin 資格確認書 (cho người không dùng / chưa có My Number Card)',
      description:
        '**Khi cần 資格確認書**:\n\n• Chưa có My Number Card.\n• Có My Number Card nhưng không thể dùng (mất / khóa / chờ cấp lại).\n• Trẻ em / người cao tuổi không quen công nghệ.\n• Người không muốn dùng My Number Card cho bảo hiểm (bảo mật cá nhân).\n\n**Tại đâu**:\n\n**Cho 国民健康保険 (国保)**:\n\n1. Đến 市役所/区役所 phòng **国保課**.\n2. Mang: 在留カード + 健康保険証 vật lý hiện tại + 印鑑.\n3. Điền form xin 資格確認書.\n4. Nhận giấy trong 1 tuần qua bưu điện hoặc lấy trực tiếp.\n\n**Cho 協会けんぽ / 健保組合 (社保)**:\n\n1. Hỏi **phòng nhân sự** công ty.\n2. Công ty gửi yêu cầu đến 保険者.\n3. Nhận 資格確認書 trong 1–2 tuần.\n\n**Cho 後期高齢者医療制度 (75+)**:\n\n1. 市役所 phòng tương ứng.\n2. Tương tự 国保.\n\n**Tự động cấp** (một số 保険者):\n\n• 一部 保険者 tự động cấp 資格確認書 cho người chưa kích hoạt マイナ保険証 + thẻ vật lý sắp hết hạn.\n• Kiểm tra mail từ 保険者.\n\n**Nội dung 資格確認書**:\n\n• Tên.\n• Ngày sinh.\n• Số bảo hiểm.\n• 保険者.\n• Hạn (tối đa 5 năm).\n\n**Sử dụng**:\n\n• Đưa 資格確認書 tại quầy 受付 thay thẻ vật lý.\n• Bệnh viện xử lý như thẻ vật lý — phần đóng góp 10–30%.\n\n**Gia hạn / đổi**:\n\n• Khi 資格確認書 hết hạn → xin lại tại 保険者.\n• Khi đổi việc / 保険者 → xin với 保険者 mới.\n• Khi chuyển 市町村 (国保) → xin tại 市役所 mới.',
      documents: ['在留カード', '健康保険証 hiện tại', '印鑑 (nếu cần)'],
      tip: '資格確認書 là tài liệu chính thức — đối xử với nó như thẻ. Lưu kỹ + chụp ảnh backup.',
    },
    {
      step: 5,
      title: 'Sử dụng tại bệnh viện + xử lý vấn đề',
      description:
        '**Tại quầy 受付 bệnh viện**:\n\n**Với マイナ保険証**:\n\n1. Tìm **顔認証付きカードリーダー** (máy đọc thẻ + camera nhận diện).\n2. Đặt My Number Card lên máy đọc.\n3. Xác minh:\n   - **顔認証** (nhận diện khuôn mặt) — đa số.\n   - Hoặc **PIN** 4 chữ số (利用者証明用).\n4. Tự động xác nhận bảo hiểm.\n5. Đi vào khám.\n\n**Với 資格確認書**:\n\n1. Đưa 資格確認書 + ID phụ (在留カード) tại quầy.\n2. Nhân viên nhập thông tin vào hệ thống.\n3. Xác nhận bảo hiểm.\n4. Đi vào khám.\n\n**Với 健康保険証 vật lý hiện tại (còn hạn)**:\n\n• Đưa thẻ vật lý tại quầy — như cũ.\n\n**Vấn đề thường gặp**:\n\n**1. 顔認証 không nhận**:\n• Đeo mask / kính → tháo.\n• Vẫn không → dùng PIN (4 chữ số).\n\n**2. PIN sai 3 lần**:\n• Thẻ bị khóa.\n• Quay lại sau khi reset PIN tại 市役所.\n\n**3. Hệ thống nói "chưa kích hoạt"**:\n• Quay lại マイナポータル app → đăng ký lại.\n• Hoặc dùng 資格確認書 / thẻ vật lý tạm.\n\n**4. Hệ thống nói "保険者 không khớp"**:\n• Có thể vừa đổi việc — 5–10 ngày tự động cập nhật.\n• Hoặc — gọi 保険者 xác minh.\n\n**5. Quên My Number Card**:\n• Đưa 在留カード + 健康保険証 cũ → bệnh viện có thể tra cứu.\n• Hoặc tự trả 100% → xin 償還払い sau.\n\n**Cấp cứu KHÔNG có bất kỳ thẻ nào**:\n\n• Báo: "保険には入っています" (Tôi có bảo hiểm).\n• Cho số 保険者 (nếu nhớ).\n• Khám trước, xử lý phí sau.\n• Sau khi có thẻ → bệnh viện điều chỉnh.\n• Hoặc tự trả 100% → xin hoàn qua 保険者 (償還払い).\n\n**Lưu ý cuối**:\n\n• KHÔNG bỏ khám vì sợ phí.\n• Phí cấp cứu 1 lần thường <50,000円 + bảo hiểm chi trả 70–90%.\n• 償還払い luôn có option backup.',
      documents: ['My Number Card hoặc 資格確認書 hoặc 健康保険証'],
      tip: 'Luôn mang ít nhất 1 trong 3 (My Number Card / 資格確認書 / thẻ vật lý còn hạn). Có 2 trong 3 càng tốt.',
    },
  ],
};

export default mynaHealthInsuranceCard2026;
