import type { AdminGuide } from '../../../../types/content';

const visaFeeIncrease20252026: AdminGuide = {
  id: 'visa-fee-increase-2025-2026',
  category: 'immigration',
  lastVerified: '2026-05-14',
  priority: 'normal',
  title: 'Phí visa Nhật tăng từ 2025-04-01 — bảng giá mới + cách tiết kiệm',
  titleJp: '在留関係手続の手数料改定（2025年4月1日〜）',
  icon: 'cash-outline',
  color: '#D35400',
  description:
    'Từ **2025-04-01**, phí làm thủ tục cư trú tại 出入国在留管理庁 (ISA) **TĂNG đáng kể**. Ví dụ chính: 在留期間更新 từ **4,000 yên → 6,000 yên** (giấy) hoặc **5,500 yên** (online — rẻ hơn 500 yên). Hồ sơ nộp TRƯỚC 2025-03-31 vẫn áp phí cũ. Lý do tăng: phí giữ nguyên 19 năm, ISA cần kinh phí xử lý điện tử + nhân lực. **Tip tiết kiệm**: dùng **オンライン申請** qua 在留申請オンラインシステム — giảm 500 yên + xử lý nhanh hơn. Đây là tài liệu định hướng — bảng phí cụ thể từng thủ tục **kiểm tra trang ISA chính thức** trước khi nộp.',
  searchKeywords: [
    'phí visa Nhật',
    'phí gia hạn visa',
    'phí làm visa',
    'visa fee tăng',
    'ISA fee',
    '入管 phí',
    'tiết kiệm phí visa',
    'online申請',
    'phí 永住',
    'phí 帰化',
    '在留期間更新 phí',
    '在留資格変更 phí',
    '永住許可申請 phí',
    '再入国許可 phí',
    '在留資格認定証明書 phí',
    '手数料',
    '手数料改定',
    'COE phí',
    '収入印紙',
    '在留申請オンラインシステム',
    'ISA online',
    'visa fee 2025',
    'visa fee 2026',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      'Phí thủ tục theo 出入国管理及び難民認定法 + 法務省令. Cập nhật 2025-04-01 là đợt tăng đầu tiên kể từ 2006. Phí khác nhau giữa 書面 (giấy) vs オンライン申請 — chính phủ ưu tiên online để giảm tải. Trẻ em + một số người được miễn / giảm. Đây là TÀI LIỆU THAM KHẢO — phí có thể thay đổi tiếp, kiểm tra trang ISA chính thức trước mỗi lần nộp.',
    sourceVerifiedAt: '2026-05-14',
    nextReviewAt: '2026-09-01',
    riskLevel: 'low',
    whenToAskExpert: [
      'Hồ sơ phức tạp với phí lớn (永住, 帰化) → tham vấn luật sư hoặc 行政書士 trước khi nộp.',
      'Hồ sơ bị từ chối → có quyền 不服申立 (xem visa-rejection-appeal-process guide). Phí mất vẫn không hoàn — có thể đáng đầu tư luật sư cho lần 2.',
      'Online申請 lần đầu — cần My Number Card + ICカードリーダー. Đến 入管 nếu không có thiết bị.',
    ],
  },
  quickAction: {
    deadline:
      'Phí mới có hiệu lực từ **2025-04-01**. Hồ sơ nộp đến hết **2025-03-31** vẫn áp phí cũ (4,000 yên cho 在留期間更新). **Sau 2025-04-01**: phí mới (6,000 giấy / 5,500 online). Mua **収入印紙** đúng mệnh giá → dán lên hồ sơ → nộp.',
    office:
      '出入国在留管理局 (入管 / ISA) chi nhánh địa phương — nộp giấy + đóng phí. Hoặc **在留申請オンラインシステム** online.isa.go.jp — đăng ký account + nộp online (rẻ 500 yên + xử lý nhanh). Mua 収入印紙: bưu điện, ngân hàng lớn, một số コンビニ (chỉ mệnh giá nhỏ), cửa hàng văn phòng.',
    doNow: [
      'Kiểm tra **trang chính thức ISA** cho phí cụ thể của thủ tục mình cần — phí thay đổi định kỳ.',
      'Nếu nộp được trước **2025-03-31**: dùng phí cũ (đã qua — chỉ áp dụng nếu đọc trước).',
      'Nếu nộp sau 2025-04-01: cân nhắc **オンライン申請** giảm 500 yên + tránh xếp hàng tại 入管.',
      'Đăng ký 在留申請オンラインシステム TRƯỚC: cần My Number Card + ICカードリーダー (smartphone NFC OK) hoặc ID/password đăng ký tại 入管.',
      'Mua 収入印紙 (revenue stamp) đúng mệnh giá tại bưu điện / ngân hàng. Dán lên 申請書.',
      'KHÔNG dán 収入印紙 trước khi nộp (nếu không chắc) — 入管 có thể yêu cầu mệnh giá khác.',
    ],
    bring: [
      '在留カード + Hộ chiếu',
      'Tiền mặt mua 収入印紙',
      'Hồ sơ thủ tục (申請書 + giấy tờ kèm)',
      'My Number Card (cho オンライン申請)',
      'Smartphone NFC hoặc ICカードリーダー (cho オンライン)',
    ],
    ifLate:
      'Visa hết hạn + chưa nộp gia hạn: đây là vấn đề **độc lập** với phí — overstay nguy hiểm hơn nhiều. Xem guide overstaying-illegal-stay-procedures. Phí mới chỉ ảnh hưởng lúc nộp — dù nộp muộn cũng không phạt phí thêm (trừ trường hợp 在留特別許可 phức tạp hơn).',
    officialSourceLabels: ['出入国在留管理庁 — 手数料一覧'],
  },
  whoIsThisFor: [
    'Người Việt sắp gia hạn / đổi visa sau 2025-04-01.',
    'Người Việt chuẩn bị nộp 永住 / 帰化 — phí lớn hơn, nên tính kỹ.',
    'Người Việt đã nộp giấy tờ trước 2025-04-01 — biết phí cũ áp dụng.',
    'Cha mẹ Việt nộp visa cho con — biết phí cho trẻ.',
    'Người Việt cân nhắc オンライン申請 — biết tiết kiệm 500 yên.',
    'Du học sinh / 技人国 / 特定技能 đến hạn gia hạn.',
  ],
  whenToDo: [
    'Trước khi nộp visa — kiểm tra phí mới nhất tại trang ISA.',
    '3 tháng trước visa hết hạn — chuẩn bị hồ sơ + tiền 収入印紙.',
    'Quyết định online vs giấy — sớm để có time đăng ký account online.',
    'Sau khi nhận thông báo phải nộp thêm phí — kiểm tra mệnh giá đúng.',
  ],
  whereToDo: [
    '**入管 (ISA)** chi nhánh địa phương — Tokyo (Shinagawa), Yokohama, Nagoya, Osaka, Kobe, Hiroshima, Fukuoka, Sendai, Sapporo, etc. (14 chi nhánh chính + 60+ 支局).',
    '**在留申請オンラインシステム**: online.isa.go.jp — đăng ký + nộp online.',
    '**Bưu điện** (郵便局): mua 収入印紙 mọi mệnh giá. Có quầy 24h tại 中央郵便局.',
    '**Ngân hàng lớn** (MUFG, SMBC, Mizuho, JP Bank): mua 収入印紙 mệnh giá phổ biến.',
    '**コンビニ**: mua 収入印紙 mệnh giá nhỏ (200円, 1,000円). Mệnh giá lớn (5,000円+) hiếm.',
  ],
  estimatedTime:
    'Mua 収入印紙 tại bưu điện: 5–10 phút. Online申請 đăng ký account: 30 phút lần đầu. Nộp tại 入管: 30 phút – vài giờ tùy đông. Xử lý hồ sơ: 1–3 tháng tùy thủ tục (永住 6–12 tháng).',
  fees: [
    '**在留期間更新許可申請** (gia hạn visa): 6,000 yên giấy / **5,500 yên online** (cũ: 4,000 yên).',
    '**在留資格変更許可申請** (đổi visa): 6,000 yên giấy / 5,500 yên online (cũ: 4,000 yên).',
    '**在留資格認定証明書交付申請** (COE): MIỄN PHÍ tại quầy / 自治体 (do nhà bảo lãnh nộp).',
    '**永住許可申請** (vĩnh trú): 10,000 yên giấy / 9,500 yên online (cũ: 8,000 yên).',
    '**再入国許可** (re-entry — 1 lần): 3,000 yên giấy / 2,500 yên online (cũ: 3,000 yên — không đổi cho 1 lần).',
    '**再入国許可** (re-entry — nhiều lần): 6,000 yên giấy / 5,500 yên online (cũ: 6,000 yên — không đổi).',
    '**みなし再入国許可** (≤1 năm): MIỄN PHÍ.',
    '**就労資格証明書交付申請**: 1,200 yên giấy.',
    '**永住許可申請** cho 高度専門職: 10,000 yên (cùng phí).',
    '**帰化申請** (nhập quốc tịch): MIỄN PHÍ phí申請. Nhưng phí làm giấy tờ phụ ~50,000–100,000 yên.',
    '**Trẻ em (≤6 tuổi)**: MIỄN PHÍ một số thủ tục — kiểm tra với 入管.',
    'Phí cụ thể CÓ THỂ THAY ĐỔI — kiểm tra trang ISA chính thức trước nộp.',
  ],
  documentsChecklist: [
    { label: '在留カード', required: true, note: 'Bản gốc + bản sao 2 mặt.' },
    { label: 'Hộ chiếu', required: true, note: 'Còn hạn ≥6 tháng.' },
    { label: '収入印紙 đúng mệnh giá', required: true, note: 'Mua tại bưu điện trước. KHÔNG dán nếu chưa chắc — 入管 có thể yêu cầu khác.' },
    { label: '申請書 (form)', required: true, note: 'Download trang ISA mới nhất — phiên bản đúng tại ngày nộp.' },
    { label: 'Ảnh 4x3 nền trắng', required: true, note: '≤6 tháng. 1–2 tấm.' },
    { label: 'Giấy tờ thu nhập / công việc', required: false, note: 'Tùy thủ tục — gia hạn cần 在職証明 + 課税証明.' },
    { label: 'My Number Card', required: false, note: 'Cho オンライン申請. Smartphone NFC reader OK.' },
    { label: 'Letter from sponsor / company', required: false, note: 'Tùy visa loại — 配偶者, 家族滞在, 技人国 cần.' },
  ],
  commonMistakes: [
    'Mua 収入印紙 mệnh giá CŨ (4,000 yên cho gia hạn) sau 2025-04-01 → 入管 trả lại + phải mua thêm. Mệnh giá MỚI là 6,000.',
    'Dán 収入印紙 trước khi 入管 confirm → nếu mệnh giá sai, mất tiền (印紙 không hoàn).',
    'Nộp online mà không có My Number Card → bị reject. Đăng ký My Number Card trước hoặc dùng giấy.',
    'Không biết online rẻ hơn 500 yên → nộp giấy không cần thiết.',
    'Tin "nộp muộn → tăng phí" → KHÔNG. Phí cố định bất kể nộp early/late (trừ lệ phí gia hạn riêng cho 滞納 etc).',
    'Quên mang 収入印紙 đến quầy → phải đi mua ngay (bưu điện gần nhất). Tốn thêm time.',
    'Mua 収入印紙 tại コンビニ mệnh giá lớn → không có. Đi bưu điện tốt hơn.',
    'Tin "luật sư xin visa rẻ hơn tự xin" → phí ISA same. Luật sư + 行政書士 thêm phí 30,000–100,000 yên cho dịch vụ. Tự xin nếu hồ sơ đơn giản.',
    'Bỏ qua 自動引き落とし fee online → online申請 cần thẻ tín dụng cho phí. Có 入管Pay app riêng.',
    'Đến 入管 mua 収入印紙 → đa số 入管 KHÔNG bán. Mua ngoài.',
  ],
  faq: [
    {
      question: 'Phí mới áp dụng cho hồ sơ tôi đã nộp trước 2025-04-01 không?',
      answer:
        'KHÔNG. Theo công bố ISA: "Hồ sơ nhận trước 2025-03-31 áp phí cũ, kể cả khi quyết định cấp giấy phép sau 2025-04-01."\n\n**Quy tắc**: phí tính theo NGÀY NỘP, không phải ngày cấp.\n\n**Ví dụ**:\n• Nộp 在留期間更新 ngày 2025-03-25 → phí 4,000 yên cũ.\n• Quyết định cấp ngày 2025-05-15 → vẫn 4,000 yên (đã đóng).\n\n**Cảnh báo**: nếu hồ sơ thiếu + 入管 yêu cầu nộp bổ sung sau 2025-04-01 — có thể phải đóng thêm theo phí mới. Nộp đầy đủ ngay từ đầu.\n\n**Làm sao biết phí cũ vs mới**:\n• Receipt (受領書) ghi rõ.\n• Xem trang ISA mục "手数料" cho lịch sử đầy đủ.',
    },
    {
      question: 'オンライン申請 thực sự rẻ + nhanh hơn nhiều không?',
      answer:
        '**Phí**: rẻ hơn **500 yên** so với nộp giấy. Áp dụng cho:\n• 在留期間更新: 6,000 → 5,500 yên.\n• 在留資格変更: 6,000 → 5,500 yên.\n• 永住許可: 10,000 → 9,500 yên.\n• 再入国許可 (nhiều lần): 6,000 → 5,500 yên.\n\n**Thời gian xử lý**: thông báo qua email + マイナポータル app. Không cần đi 入管 nhận thẻ — gửi qua bưu điện.\n\n**Yêu cầu**:\n• My Number Card hoặc ID/password đăng ký tại 入管.\n• Smartphone NFC hoặc ICカードリーダー.\n• Thẻ tín dụng / 入管Pay cho thanh toán.\n• PDF / scan giấy tờ chất lượng cao.\n\n**Lợi**:\n• KHÔNG xếp hàng 入管 (đặc biệt Shinagawa giờ cao điểm 4-6 tiếng).\n• Track tình trạng realtime.\n• Save 500 yên × 2 lần (cho cả vợ/chồng) = 1,000 yên.\n\n**Bất lợi**:\n• Lần đầu setup mất 30 phút.\n• Cần điện thoại NFC tốt (đa số iPhone 7+ / Android 8+ OK).\n• Một số thủ tục phức tạp vẫn cần đến 入管.\n\n**Đăng ký**: online.isa.go.jp — instructions có English.\n\n**Quyết định**: nếu nộp visa nhiều lần (gia hạn 1-2 năm/lần) → đầu tư setup online ĐÁNG.',
    },
    {
      question: 'Tôi mua 収入印紙 sai mệnh giá — làm sao?',
      answer:
        '**収入印紙 KHÔNG hoàn được tiền** trực tiếp. Lựa chọn:\n\n**A. Đổi (交換)**:\n• Đến **bưu điện** mang 収入印紙 chưa dùng + giấy tờ ID.\n• Đổi sang mệnh giá khác — phí 5 yên/tờ + nộp lại tiền chênh lệch.\n• Phải trong vòng 5 năm từ ngày mua.\n\n**B. Bán lại / cho người khác**:\n• 収入印紙 vô danh — có thể đổi với người cần.\n• Cộng đồng VN ở Nhật / FB groups — có chỗ trao đổi.\n\n**C. Giữ lại cho lần sau**:\n• Mệnh giá nhỏ (200, 400 yên) — dễ dùng cho nhiều thủ tục khác.\n• Lưu trong ví.\n\n**D. Bỏ (mất tiền)**:\n• Nếu mệnh giá quá lạ + không thể đổi.\n• Học bài học cho lần sau.\n\n**Quy tắc vàng**: KHÔNG dán 収入印紙 lên hồ sơ TRƯỚC khi 入管 confirm mệnh giá đúng. Mang theo 収入印紙 chưa dán + tiền mặt phòng phải mua thêm.\n\n**Mua đúng**:\n• Kiểm tra ISA trang chính thức ngay trước khi đi mua.\n• Hoặc đến 入管 hỏi quầy info trước.',
    },
    {
      question: 'Tại sao phí tăng nhiều thế? 50% là quá đáng không?',
      answer:
        '**Lý do chính phủ Nhật đưa ra**:\n\n1. **Phí giữ nguyên 19 năm** (2006 → 2025).\n2. **Lạm phát + chi phí xử lý tăng**.\n3. **Hệ thống điện tử (オンライン申請)** cần đầu tư.\n4. **Số lượng người nước ngoài tăng** (3 triệu+ trong 2024) → khối lượng work tăng.\n5. **Xu hướng quốc tế**: phí Nhật vẫn rẻ hơn US (~$370 cho work visa) / EU (€100–200).\n\n**So sánh với nước khác**:\n• Mỹ work visa: $460 USD (~70,000 yên).\n• Anh work visa: £719 (~135,000 yên).\n• Đức Aufenthaltstitel: €100 (~16,000 yên).\n• Nhật 在留期間更新: 6,000 yên (~$40 USD).\n\n→ Nhật vẫn RẺ NHẤT.\n\n**Nhưng không phải KHÔNG đắt cho người Việt**:\n• Lương trung bình 技能実習: 150,000–180,000 yên/tháng.\n• 6,000 yên = 1 ngày lương.\n• Cộng dồn nhiều lần (gia hạn + 永住 sau này): 50,000+ yên.\n\n**Tip giảm chi phí**:\n• Dùng オンライン (-500 yên/lần).\n• Tránh hồ sơ không cần thiết (vd: 就労資格証明書 chỉ cần khi đổi việc).\n• Lập kế hoạch trước — gia hạn 5 năm/lần thay vì 1 năm/lần (nếu đủ điều kiện).',
    },
    {
      question: 'Trẻ em / con tôi có được giảm phí không?',
      answer:
        'CÓ một số trường hợp:\n\n**Trẻ em sinh ở Nhật cha mẹ ngoại**:\n• 在留資格取得 (gia hạn lần đầu trong 30 ngày sau sinh): MIỄN PHÍ.\n• Sau đó gia hạn bình thường: phí như người lớn.\n\n**Trẻ em ≤ 6 tuổi nộp một số thủ tục**: kiểm tra trực tiếp với 入管 — không phải tất cả miễn phí.\n\n**Học sinh trung cấp / cao đẳng**: phí gia hạn visa du học same người lớn.\n\n**Gia đình nộp cùng lúc** (vợ + chồng + con): tất cả vẫn phải đóng phí riêng cho mình. KHÔNG có discount gia đình.\n\n**Mẹo**:\n• Nộp online cho cả nhà cùng lúc → tiết kiệm 500 × N yên.\n• Lên kế hoạch gia hạn cùng tháng → 1 trip 入管 / 1 lần xếp hàng.\n• Chia sẻ chi phí làm 行政書士 nếu nhiều hồ sơ tương tự.',
    },
    {
      question: 'Tôi nộp hồ sơ thiếu — có phải đóng lại phí không?',
      answer:
        'TÙY:\n\n**Trường hợp A: 入管 yêu cầu nộp bổ sung tài liệu** (補正書類):\n• KHÔNG đóng thêm phí cho phần補正.\n• Mang giấy tờ bổ sung đến 入管 hoặc gửi qua post.\n• Hồ sơ vẫn đang trong process.\n\n**Trường hợp B: Hồ sơ bị reject + nộp lại từ đầu**:\n• Đóng phí MỚI (full).\n• Phí cũ KHÔNG hoàn.\n• Nếu reject lý do thủ tục → cân nhắc 不服申立 (xem visa-rejection-appeal-process) — cũng có phí.\n\n**Trường hợp C: Tự rút hồ sơ + nộp lại**:\n• Phí cũ KHÔNG hoàn.\n• Phí mới = full.\n\n**Cảnh báo**:\n• Đừng nộp vội vàng nếu hồ sơ chưa sẵn — mất phí lần 2.\n• Tham vấn luật sư / 行政書士 nếu hồ sơ phức tạp (永住, 帰化).\n• Có communities Việt + groups review hồ sơ miễn phí — VYSA, FB groups.\n\n**Phòng ngừa**:\n• Đọc kỹ checklist trên trang ISA.\n• Photo bản gốc trước khi nộp.\n• Mang theo bản extra 1 tấm cho mỗi giấy.',
    },
  ],
  counterPhrases: [
    {
      jp: '在留期間更新許可申請をしたいです。手数料はいくらですか。',
      romaji: 'Zairyuu kikan koushin kyoka shinsei o shitai desu. Tesuuryou wa ikura desu ka.',
      vn: 'Tôi muốn xin gia hạn visa. Phí bao nhiêu?',
      note: 'Câu mở đầu tại 入管. Họ confirm mệnh giá 収入印紙 cần.',
    },
    {
      jp: 'オンラインで申請したいです。',
      romaji: 'Onrain de shinsei shitai desu.',
      vn: 'Tôi muốn nộp online.',
      note: 'Tại 入管 hỏi cách đăng ký account online — họ đưa hướng dẫn.',
    },
    {
      jp: '収入印紙はどこで買えますか。',
      romaji: 'Shuunyuu inshi wa doko de kaemasu ka.',
      vn: '収入印紙 mua ở đâu?',
      note: 'Đáp: 郵便局 (bưu điện) gần nhất. ATMs không bán.',
    },
    {
      jp: '5,500円分の収入印紙をお願いします。',
      romaji: 'Go-sen go-hyaku en bun no shuunyuu inshi o onegai shimasu.',
      vn: 'Xin 収入印紙 5,500 yên.',
      note: 'Tại bưu điện. Có thể hỏi mệnh giá kết hợp (vd 5,000 + 500).',
    },
    {
      jp: '貼付してもいいですか。',
      romaji: 'Choufu shite mo ii desu ka.',
      vn: 'Tôi có thể dán không?',
      note: 'Hỏi 入管 trước khi dán 収入印紙 lên hồ sơ — phòng trường hợp mệnh giá sai.',
    },
    {
      jp: '受領書をください。',
      romaji: 'Juryousho o kudasai.',
      vn: 'Xin biên nhận.',
      note: 'Sau khi nộp + đóng phí. 受領書 chứng minh đã nộp đúng + bao nhiêu.',
    },
    {
      jp: '今日中に処理できますか。',
      romaji: 'Kyou-juu ni shori dekimasu ka.',
      vn: 'Có thể xử lý xong trong ngày không?',
      note: 'Đa số thủ tục KHÔNG xử lý trong ngày — gia hạn 1-3 tháng. Hỏi để confirm timeline.',
    },
    {
      jp: '結果はいつ来ますか。',
      romaji: 'Kekka wa itsu kimasu ka.',
      vn: 'Khi nào có kết quả?',
      note: 'Kết quả qua hagaki (postcard) hoặc email (online申請).',
    },
  ],
  officialLinks: [
    { label: '出入国在留管理庁 — 手数料一覧', url: 'https://www.moj.go.jp/isa/applications/procedures/index.html' },
    { label: '在留申請オンラインシステム', url: 'https://www.moj.go.jp/isa/applications/index.html' },
    { label: '出入国在留管理庁 — トップ', url: 'https://www.moj.go.jp/isa/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Kiểm tra phí mới nhất + lên kế hoạch',
      description:
        '**Trước khi nộp** (1–3 tháng trước visa hết hạn):\n\n1. **Truy cập trang ISA**: tra "出入国在留管理庁 + tên thủ tục mình cần".\n2. Tìm mục "手数料" — bảng phí mới nhất.\n3. Confirm:\n•Phí giấy (書面) vs phí online (オンライン).\n•Có discount cho trẻ em / một số trường hợp không.\n•Có thay đổi gần đây (cập nhật 2025-04-01).\n\n**Quyết định**: nộp online hay giấy?\n\n**Online**:\n• Tiết kiệm 500 yên / lần.\n• KHÔNG xếp hàng 入管.\n• Cần My Number Card + smartphone NFC.\n• Lần đầu setup mất 30 phút.\n\n**Giấy**:\n• Mua 収入印紙 tại bưu điện.\n• Đến 入管 trực tiếp.\n• Phù hợp nếu không có My Number Card / không quen tech.\n\n**Tính toán phí tổng** (cho cả gia đình nếu nộp cùng):\n• 1 người: 6,000 yên giấy / 5,500 online.\n• Vợ + chồng: 12,000 / 11,000 yên.\n• Vợ + chồng + 1 con: 18,000 / 16,500 yên (tiết kiệm 1,500 yên qua online).\n\n**Bảng phí cập nhật 2025-04-01** (kiểm tra ISA chính thức):\n• 在留期間更新: 6,000 / 5,500.\n• 在留資格変更: 6,000 / 5,500.\n• 永住許可: 10,000 / 9,500.\n• 再入国 (1 lần): 3,000 / 2,500.\n• 再入国 (nhiều lần): 6,000 / 5,500.\n• 就労資格証明書: 1,200.\n• 帰化申請: MIỄN PHÍ.',
      documents: [],
      tip: 'Đừng đợi đến gần hết hạn visa — đặt nhắc 3 tháng trước trên điện thoại. Có thời gian tham vấn + chuẩn bị giấy tờ.',
    },
    {
      step: 2,
      title: 'Online申請 — đăng ký account + nộp',
      description:
        '**Yêu cầu**:\n• My Number Card (active).\n• Smartphone với NFC (iPhone 7+ / Android NFC) hoặc ICカードリーダー USB.\n• Email Nhật.\n• PDF / scan giấy tờ chất lượng cao.\n• Thẻ tín dụng cho phí (hoặc 入管Pay).\n\n**Bước 1: Đăng ký account**:\n1. Vào https://www.moj.go.jp/isa/applications/\n2. Click "在留申請オンラインシステム" → "新規利用登録".\n3. 2 cách:\n•**Phương án A — My Number Card**: dùng mã 利用者証明用電子証明書 PIN. Nhanh.\n•**Phương án B — đến 入管 lấy ID**: nhân viên cấp ID + temp password. Setup tại 入管.\n\n**Bước 2: Setup account**:\n1. Login với My Number Card hoặc ID.\n2. Đặt password riêng cho hệ thống.\n3. Đăng ký thông tin cá nhân.\n4. Verify qua email.\n\n**Bước 3: Tạo申請 mới**:\n1. Chọn loại thủ tục (gia hạn / đổi visa / etc.).\n2. Nhập thông tin theo form.\n3. Upload giấy tờ PDF (mỗi file ≤10MB).\n4. Review + xác nhận.\n\n**Bước 4: Đóng phí**:\n1. Chọn payment: thẻ tín dụng / 入管Pay app.\n2. Phí tự động (5,500 yên cho gia hạn).\n3. Nhận 受領書 PDF.\n\n**Bước 5: Theo dõi**:\n1. Email thông báo từng bước.\n2. Có thể login check status.\n3. Khi approved → 入管 gửi 在留カード mới qua bưu điện (hoặc đến lấy).\n\n**Lưu ý**:\n• Hồ sơ phức tạp (永住, 高度専門職) — có thể vẫn cần đến 入管 cho 1 số bước.\n• Lần đầu mất 30 phút setup, lần sau chỉ 10 phút.',
      documents: [
        'My Number Card',
        'Smartphone NFC',
        'PDF tất cả giấy tờ',
        'Thẻ tín dụng hoặc 入管Pay',
      ],
      tip: 'Setup online TRƯỚC khi cần nộp — đăng ký account sẵn để khi cần dùng ngay. Đỡ áp lực thời gian.',
    },
    {
      step: 3,
      title: 'Giấy tờ申請 — mua 収入印紙 + nộp tại 入管',
      description:
        '**Bước 1: Chuẩn bị giấy tờ**:\n• 在留期間更新申請書 (download trang ISA mới nhất).\n• Ảnh 4x3 mới (≤6 tháng).\n• 在留カード + Hộ chiếu (gốc + sao).\n• 在職証明書 (公司 cấp) cho 在留期間更新 cho work visa.\n• 課税証明書 + 納税証明書 (市役所).\n• Hợp đồng lao động (nếu cần).\n• Letter of guarantee (nếu là 配偶者 / 家族滞在).\n\n**Bước 2: Mua 収入印紙**:\n• **Bưu điện**: tốt nhất — mọi mệnh giá.\n• **Nói**: "○○円分の収入印紙をお願いします."\n• 6,000 yên cho gia hạn = 6,000 hoặc kết hợp (5,000 + 1,000).\n• Cất ví CẨN THẬN — KHÔNG dán trước.\n\n**Bước 3: Đến 入管**:\n• Tra chi nhánh 都道府県 mình. Tokyo: Shinagawa Immigration Bureau.\n• Giờ hoạt động: T2-T6 9:00–16:00 (一部 chi nhánh khác).\n• Mang theo 在留カード + tất cả giấy tờ + 収入印紙.\n• **Lưu ý**: đến SỚM (8:30 trước giờ mở) — đặc biệt Shinagawa cao điểm xếp hàng 4–6 giờ.\n\n**Bước 4: Tại quầy 入管**:\n1. Lấy số (整理券).\n2. Đợi gọi tên/số.\n3. Quầy kiểm tra giấy tờ.\n4. Confirm mệnh giá 収入印紙 đúng.\n5. Dán 収入印紙 lên 申請書 (theo hướng dẫn quầy).\n6. Quầy đóng dấu + nhận hồ sơ.\n7. Trả 受領書 (mã theo dõi).\n\n**Bước 5: Đợi kết quả**:\n• 1–3 tháng cho gia hạn / đổi visa.\n• 6–12 tháng cho 永住.\n• Nhận 受領通知書 (postcard) khi xong.\n• Đến 入管 lấy 在留カード mới — mang 在留カード cũ + Hộ chiếu + 受領書.\n\n**Mẹo**:\n• Đặt hẹn online (一部 chi nhánh hỗ trợ) — bỏ qua xếp hàng.\n• Nộp đầu tuần — ít đông hơn cuối tuần.\n• Kết hợp nhiều thủ tục cùng lúc nếu được (vd: gia hạn + 再入国).',
      documents: [
        '申請書',
        '収入印紙 đúng mệnh giá',
        '在留カード + Hộ chiếu',
        'Giấy tờ thu nhập + công việc',
        'Ảnh 4x3',
      ],
      tip: 'Gia hạn cùng tháng cho cả gia đình → 1 trip 入管 / 1 lần xếp hàng. Tiết kiệm thời gian nhiều.',
    },
    {
      step: 4,
      title: 'Sau nộp — đợi kết quả + xử lý vấn đề',
      description:
        '**Trong giai đoạn xử lý** (1–3 tháng):\n\n• 在留カード cũ vẫn hoạt động — cứ dùng bình thường.\n• Có thể đi VN tạm với みなし再入国 (1 năm).\n• Theo dõi: online申請 qua app + email; giấy申請 qua 受領書 mã + check phone 入管.\n\n**Nếu 入管 yêu cầu nộp bổ sung** (補正):\n• Nhận 補正通知書 qua bưu điện.\n• Mang giấy tờ bổ sung + 在留カード đến 入管 trong deadline (thường 14 ngày).\n• KHÔNG đóng thêm phí.\n• Nếu không nộp đúng hạn → có thể bị reject.\n\n**Nếu approved** (許可):\n• Online: nhận email + 在留カード mới qua bưu điện sau 1–2 tuần.\n• Giấy: nhận 受領通知書 → đến 入管 lấy 在留カード mới.\n• Mang theo:\n•受領書 / 受領通知書.\n•在留カード cũ.\n•Hộ chiếu.\n•Tiền 4,000 yên 収入印紙 cho phí 在留カード mới (nếu yêu cầu).\n\n**Nếu rejected** (不許可):\n• Nhận 不許可通知書 với lý do.\n• Lựa chọn:\n•**不服申立**: 弁護士 + nộp lại trong 3 tháng (thêm phí).\n•**Nộp lại từ đầu**: với hồ sơ đầy đủ hơn (thêm phí FULL).\n•**Chuyển visa khác** (vd: từ 技人国 → 特定活動): tham vấn luật sư.\n•**Về VN**: nếu không có lựa chọn nào.\n• Phí cũ KHÔNG hoàn dù reject.\n• Tham khảo guide visa-rejection-appeal-process.\n\n**Cảnh báo**:\n• 在留カード cũ hết hạn TRONG khi đợi → vẫn hợp pháp nếu đã nộp đúng hạn (特例期間 max 2 tháng).\n• Đừng overstay — luôn theo dõi tiến độ.\n• Email scam giả 入管: KHÔNG bao giờ gửi link đòi tiền/info qua SMS.',
      documents: [
        '受領書 / mã theo dõi',
        '在留カード cũ',
        'Hộ chiếu',
      ],
      tip: 'Đừng quên nhận 在留カード mới! Có 1 thời hạn nhất định để đến lấy. Set nhắc trên điện thoại sau khi nhận thông báo.',
    },
    {
      step: 5,
      title: 'Phòng ngừa + tiết kiệm dài hạn',
      description:
        '**Tiết kiệm phí qua thời gian**:\n\n• **Online申請**: -500 yên/lần. Cộng dồn 10 năm × 2 lần/năm = 10,000 yên.\n• **Gia hạn dài hạn** (5 năm thay 1 năm): nộp 1 lần thay 5 lần = tiết kiệm 24,000 yên.\n• **永住** sau khi đủ điều kiện: 10,000 yên 1 lần — không cần gia hạn nữa.\n• **帰化** (nhập tịch): 申請 MIỄN PHÍ. Nhưng phí làm giấy tờ + tham vấn luật sư cao.\n\n**Lập kế hoạch dài hạn**:\n\n• **3 năm đầu**: visa 1 năm — gia hạn hằng năm.\n• **3-5 năm**: visa 3 năm — bớt thủ tục.\n• **5+ năm**: cân nhắc 永住 (nếu đủ điều kiện income + thuế + 年金).\n• **10+ năm sống ổn định**: cân nhắc 帰化 nếu muốn quốc tịch Nhật.\n\n**Phòng tránh phí phụ**:\n\n• KHÔNG để overstay → phí 在留特別許可 + 弁護士.\n• KHÔNG nộp hồ sơ thiếu → reject → phí lại từ đầu.\n• KHÔNG nộp visa sai loại → đổi visa thêm phí.\n• Tham vấn luật sư / 行政書士 cho hồ sơ phức tạp (永住, 帰化, business visa) — phí dịch vụ 50,000–200,000 yên nhưng tăng cơ hội thành công.\n\n**Kết hợp thủ tục**:\n\n• Gia hạn + 再入国 cùng lúc → 1 trip 入管.\n• Cả gia đình cùng lúc → tiết kiệm thời gian.\n\n**Xem trước phí**:\n\n• Trang ISA cập nhật phí định kỳ.\n• Đăng ký newsletter ISA (English available).\n• Theo dõi cộng đồng VN (FB groups, VYSA) cho cập nhật.\n\n**Cập nhật 2026**:\n\n• Phí 2025-04-01 vẫn áp dụng đến 2026.\n• KHÔNG thay đổi tiếp dự kiến đến 2027 (trừ khi có chính sách mới).\n• Theo dõi trang ISA quarterly.\n\n**Hỗ trợ chi phí**:\n\n• Người thu nhập thấp: 法テラス có thể tư vấn miễn phí (民事法律扶助) cho vụ visa phức tạp.\n• 国際交流協会 / 多文化共生 trung tâm: hỗ trợ điền form miễn phí.\n• Cộng đồng VN: hỗ trợ lẫn nhau.\n\n**Kết**: phí visa Nhật vẫn rẻ so với quốc tế. Đầu tư đúng = visa ổn định lâu dài.',
      documents: [],
      tip: 'Lưu mọi receipt 入管 — hữu ích cho 確定申告 (一部 phí có thể là 経費 nếu cá nhân kinh doanh) + chứng minh tuân thủ pháp luật khi xin 永住 / 帰化.',
    },
  ],
};

export default visaFeeIncrease20252026;
