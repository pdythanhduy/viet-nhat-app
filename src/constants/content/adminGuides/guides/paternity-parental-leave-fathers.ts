import type { AdminGuide } from '../../../../types/content';

const paternityParentalLeaveFathers: AdminGuide = {
  id: 'paternity-parental-leave-fathers',
  category: 'money',
  lastVerified: '2026-08-21',
  priority: 'normal',
  title: 'Nghỉ chăm con cho bố (育児休業 cho nam giới)',
  titleJp: '男性の育児休業 — 産後パパ育休',
  icon: 'man-outline',
  color: '#E67E22',
  description:
    '育児・介護休業法 ở Nhật áp dụng cho cả nam + nữ. Cha có 2 lựa chọn: (1) 産後パパ育休 (出生時育児休業) — tối đa 4 tuần trong 8 tuần đầu sau sinh, có thể chia 2 đợt. (2) 育児休業 thường — đến khi con 1 tuổi (có thể kéo 1.5–2 tuổi). 育児休業給付金: 67% lương 6 tháng đầu, 50% sau (theo 雇用保険). Cải cách 2025 thêm 出生後休業支援給付金 cho cha lấy leave cùng mẹ. Tỷ lệ nam dùng leave còn ~17% nhưng đang tăng.',
  searchKeywords: [
    'nghỉ chăm con bố',
    '男性育休',
    '産後パパ育休',
    '出生時育児休業',
    '育児休業',
    '育休 cho nam',
    '育児休業給付金',
    '出生後休業支援給付金',
    '育児・介護休業法',
    'nghỉ thai sản nam',
    'paternity leave Nhật',
    'phúc lợi cha mẹ',
    '雇用保険',
    'cha chăm con sơ sinh',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      '育児・介護休業法 toàn quốc — áp dụng cho mọi 雇用契約 (full-time + part-time + 派遣 nếu đủ điều kiện). 厚生労働省 quản lý. 育児休業給付金 do 雇用保険 chi trả qua ハローワーク. Cải cách 2022 (産後パパ育休) + 2025 (出生後休業支援給付金) — chính sách đang phát triển. Mức tiền + điều kiện CỤ THỂ thay đổi 2025–2026, kiểm tra với 雇用保険 hoặc 社会保険労務士. Đây là tài liệu tham khảo — không phải tư vấn pháp lý cá nhân.',
    sourceVerifiedAt: '2026-08-21',
    nextReviewAt: '2026-12-01',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Công ty từ chối đơn 育休 (vi phạm 育児・介護休業法) — báo 都道府県労働局 + luật sư lao động.',
      'Bị giảm lương / 降格 / sa thải sau khi xin 育休 (パタハラ — paternity harassment) — luật sư + 労働局.',
      'Visa lao động + 育休: ảnh hưởng đến việc gia hạn visa — hỏi 入管 + luật sư.',
      'Tự kinh doanh / 個人事業主: KHÔNG có 育児休業給付金 từ 雇用保険 — cần kế hoạch tài chính riêng.',
    ],
  },
  quickAction: {
    deadline:
      'Báo công ty: **1 tháng trước** ngày bắt đầu cho 育児休業 thường. **2 tuần trước** cho 産後パパ育休 (hoặc 1 tháng nếu công ty yêu cầu). Apply 育児休業給付金 sau khi bắt đầu nghỉ.',
    office:
      'Công ty (HR / 総務) cho 育休 申請. ハローワーク qua công ty cho 育児休業給付金. 都道府県労働局 cho tranh chấp + 労働基準監督署.',
    doNow: [
      'Trước con sinh: tính toán tài chính — lương 67% (6 tháng đầu) + 50% (6 tháng sau) — đủ cho gia đình không?',
      'Báo công ty 1 tháng trước (hoặc 2 tuần trước cho 産後パパ育休). Bằng văn bản — qua email + giấy. Ghi rõ: thời gian + loại 育休.',
      'Điền form 育児休業申出書 do công ty cấp. Nộp về HR.',
      'Apply 育児休業給付金: công ty hỗ trợ submit form qua ハローワーク. Cần: 母子手帳 photo, sổ ngân hàng, 賃金台帳.',
      'Khi nghỉ: tự thực hiện chăm con — không phải "vacation". Học từ vợ + công đồng.',
    ],
    bring: [
      '母子手帳 (phải đăng ký khi có thai)',
      '賃金台帳 6 tháng gần (công ty có)',
      '雇用保険被保険者証 (do công ty giữ)',
      'マイナンバー',
      'Sổ ngân hàng / cash card cá nhân (nhận 給付金)',
      'Form 育児休業申出書 do công ty cấp',
    ],
    ifLate:
      'Báo công ty muộn deadline (ít hơn 2 tuần / 1 tháng): công ty CÓ THỂ delay 育休 nhưng KHÔNG có quyền từ chối hoàn toàn. Nếu công ty từ chối → vi phạm luật → báo 都道府県労働局.',
    officialSourceLabels: ['厚生労働省'],
  },
  whoIsThisFor: [
    'Cha người Việt làm việc ở Nhật theo 雇用契約 (lao động chính thức / 派遣 / part-time đủ điều kiện).',
    'Chuẩn bị có con (vợ Nhật / vợ Việt / vợ ở Nhật).',
    'Vợ chuẩn bị sinh — bố muốn hỗ trợ + chăm sóc giai đoạn đầu.',
    'Cha có ý đầu tư time với con → muốn tận dụng quyền lao động.',
    'KHÔNG áp dụng cho: 個人事業主 (không có 雇用保険), người tự kinh doanh, một số 役員 trong công ty mình sở hữu.',
  ],
  whenToDo: [
    'Khi vợ có thai → bắt đầu kế hoạch + báo công ty trước.',
    'Trước con sinh 1–2 tháng: nộp 申請書.',
    'Trong 8 tuần đầu sau sinh: 産後パパ育休 (4 tuần đặc biệt cho cha).',
    'Sau 8 tuần: 育児休業 thường (đến 1 tuổi, có thể kéo dài).',
    'Khi quay lại làm: báo công ty trước 1 tuần.',
  ],
  whereToDo: [
    '**Công ty (HR / 総務 / 人事)**: 申請 + form.',
    '**ハローワーク qua công ty**: 育児休業給付金 — công ty submit form.',
    '**都道府県労働局**: tư vấn + tranh chấp.',
    '**労働基準監督署**: nếu công ty vi phạm 育児・介護休業法.',
    '**社会保険労務士**: tư vấn phức tạp + cá nhân.',
    '**Hellowork ngoại quốc**: cho người Việt cần hỗ trợ tiếng / thông dịch.',
  ],
  estimatedTime:
    '産後パパ育休: tối đa 4 tuần (28 ngày) trong 8 tuần đầu. Chia tối đa 2 đợt. 育児休業 thường: đến khi con 1 tuổi (có thể kéo 1.5 hoặc 2 tuổi với điều kiện cụ thể). Apply: 1–2 tuần xử lý. Nhận 給付金 lần đầu: thường 2–3 tháng sau khi bắt đầu nghỉ.',
  fees: [
    '**育休 申請**: MIỄN PHÍ.',
    '**育児休業給付金 (theo 雇用保険)**:\n  • 6 tháng đầu: 67% lương trước nghỉ (cap ~310,000円/tháng theo dữ liệu trước đây — kiểm tra mức 2025–2026 với ハローワーク).\n  • 6 tháng sau: 50% lương trước nghỉ.\n  • Tax-free + miễn 社会保険料 → take-home rate thực tế ~80% lương net.',
    '**出生後休業支援給付金** (cải cách 2025): thêm 13% trên 67% (tổng ~80%) — chỉ áp dụng cho **window cụ thể trong 8 tuần đầu sau sinh** (đa số trường hợp ~28 ngày), khi **cả cha + mẹ** đều dùng 育休/産休 trong cùng kỳ. KHÔNG phải áp dụng cho toàn thời gian 育休. Effective ~tháng 4/2025. **Window thời gian + điều kiện cụ thể KIỂM TRA với ハローワーク**.',
    '**産前産後 + 育休 中 social insurance**: miễn 健康保険料 + 厚生年金保険料 — KHÔNG mất quyền y tế.',
    '**Tax 住民税 / 所得税**: 給付金 không tính vào thu nhập tính thuế.',
    'Phí + mức thay đổi — kiểm tra với HR công ty + ハローワーク trước khi tính tài chính.',
  ],
  documentsChecklist: [
    { label: '育児休業申出書', required: true, note: 'Form do công ty cấp. Điền + ký + nộp HR.' },
    { label: '母子手帳 photo', required: true, note: 'Chứng minh có con — bản photo trang ghi tên + ngày sinh.' },
    { label: '雇用保険被保険者証', required: true, note: 'Công ty thường giữ — họ submit cho 給付金.' },
    { label: 'マイナンバー', required: true, note: 'Cần cho 給付金 application.' },
    { label: 'Sổ ngân hàng cá nhân', required: true, note: 'Để nhận 給付金 chuyển khoản.' },
    { label: '出生届 photo (sau sinh)', required: false, note: 'Nếu công ty / 給付金 yêu cầu xác minh.' },
  ],
  commonMistakes: [
    'Không báo công ty / báo muộn → công ty CÓ THỂ delay leave nhưng không thể từ chối hoàn toàn theo luật.',
    'Tin "不可能 ở công ty truyền thống" → luật ép công ty ≥ 1,000 nhân viên publish % nam dùng 育休 từ 2023. Trend đang mạnh.',
    'Không dùng 産後パパ育休 vì không biết — đây là thời gian đặc biệt cho 8 tuần đầu, KHÔNG dùng = mất.',
    'Tin "lương sẽ thấp quá để gánh" → 給付金 67% + miễn 社会保険 + tax-free = take-home ~80% lương thường.',
    'Không apply 給付金 → công ty submit qua ハローワーク nhưng cha phải kiểm tra. Tự không submit = mất tiền.',
    'Bị パタハラ (paternity harassment) — sếp / đồng nghiệp gây áp lực → báo 都道府県労働局, vi phạm luật.',
    'Quay lại làm sớm vì stress → không cải thiện situation, hỏng quan hệ con + vợ.',
    'Không lên kế hoạch chăm con → nghỉ 1 tháng nhưng không tận dụng. Học từ vợ + sách + cộng đồng.',
    'Bỏ qua cải cách 2025 (出生後休業支援給付金) — có thể nhận thêm 13% nếu đáp ứng điều kiện. Hỏi ハローワーク.',
  ],
  faq: [
    {
      question: '産後パパ育休 và 育児休業 thường khác nhau thế nào?',
      answer:
        '**産後パパ育休 (出生時育児休業)** — đặc biệt cho cha, hiệu lực từ 10/2022:\n\n• Tối đa **4 tuần (28 ngày)** trong **8 tuần đầu sau sinh**.\n• Có thể chia tối đa **2 đợt**.\n• Báo công ty: 2 tuần trước (hoặc 1 tháng tùy 規定 công ty).\n• 給付金: 67% như 育児休業.\n• Mục đích: hỗ trợ vợ thời gian phục hồi + chăm sơ sinh.\n• Có thể làm việc tối đa 10 ngày trong leave (với điều kiện) — thuận tiện cho cha không thể nghỉ hoàn toàn.\n\n**育児休業 thường** — cả 2 giới:\n\n• Đến khi con **1 tuổi** (có thể kéo dài 1.5 / 2 tuổi).\n• Không chia (1 lần liên tục, trừ khi cả 2 cha mẹ đều xin → "パパ・ママ育休プラス").\n• Báo công ty: 1 tháng trước.\n• 給付金: 67% 6 tháng đầu, 50% sau.\n\n**Có thể combine**:\n\n• 産後パパ育休 4 tuần đầu (giúp vợ phục hồi).\n• Sau đó 育児休業 thường (vẫn còn quyền — không "đã dùng").\n• Tổng có thể: 4 tuần đặc biệt + 11+ tháng 育児休業.',
    },
    {
      question: 'Tôi sợ パタハラ (sếp khó chịu) — có quyền bảo vệ không?',
      answer:
        '**Có**. パタハラ (paternity harassment) là hình thức quấy rối lao động bị 育児・介護休業法 cấm.\n\n**Hành vi パタハラ phổ biến**:\n\n• "Đàn ông không nên 育休".\n• "Bao nhiêu năm nữa mới promote bạn?"\n• Giảm lương / 降格 sau khi 育休.\n• Tăng workload sau khi quay lại.\n• Không cho 育休 mặc dù đủ điều kiện.\n• Cô lập sau khi quay lại.\n\n**Quyền của bạn**:\n\n• 育児・介護休業法 Điều 10: cấm bất lợi đãi do xin 育休.\n• Công ty ≥ 1,000 nhân viên phải publish % cha 育休 (từ 2023).\n• Có quyền bảo mật lý do nghỉ.\n• Có quyền quay lại cùng vị trí + lương.\n\n**Khi bị パタハラ**:\n\n1. **Lưu bằng chứng**: email, tin nhắn, ghi âm cuộc họp (nếu có thể).\n2. **Gọi 都道府県労働局** (free): họ điều tra công ty.\n3. **Hỏi 社会保険労務士 / luật sư lao động**.\n4. **Báo 労働基準監督署** nếu vi phạm rõ ràng.\n5. **法テラス** cho thu nhập thấp — luật sư miễn phí lần đầu.\n\nNgay cả công ty truyền thống đang thay đổi — chính phủ Nhật target 50% nam dùng 育休 vào 2025, 85% vào 2030.',
    },
    {
      question: '67% lương — có đủ sống không?',
      answer:
        'Tính toán thực tế (KHÔNG phải tư vấn tài chính cá nhân):\n\n**Vd: lương trước nghỉ = 300,000円/tháng (gross)**\n\n**Khi đi làm thường**:\n• Gross: 300,000円\n• Trừ 健康保険 + 厚生年金 + 雇用保険 + 所得税 + 住民税: ~70,000–80,000円.\n• **Take-home thường: ~220,000–230,000円**.\n\n**Khi 育休 (6 tháng đầu, 67%)**:\n• 育児休業給付金: 300,000 × 67% = **201,000円**.\n• Miễn 健康保険 + 厚生年金 + 雇用保険.\n• Tax-free.\n• **Take-home leave: 201,000円**.\n\n**Tỷ lệ thực tế**: 201,000 / 225,000 = ~89% take-home thường.\n\n**Sau 6 tháng (50%)**: 150,000円 ≈ 67% take-home thường.\n\n**Cải cách 2025**: nếu cha + mẹ cùng 育休 trong khoảng thời gian → có thể nhận thêm 13% (出生後休業支援給付金) → tổng ~80% gross = gần bằng take-home thường. **Kiểm tra điều kiện chính xác với ハローワーク**.\n\n**Cap (giới hạn)**: 給付金 có cap (~310,000円/tháng theo dữ liệu trước, 2025 có thể đã thay đổi). Người lương cao bị giảm tỷ lệ thực tế.\n\nTính toán riêng với HR + ハローワーク trước khi xin.',
    },
    {
      question: 'Vợ tôi là người Nhật / người Việt khác — có khác không?',
      answer:
        'Quyền 育休 của bạn KHÔNG phụ thuộc quốc tịch vợ. Đây là quyền riêng của bạn theo 育児・介護休業法.\n\n**Tuy nhiên 出生後休業支援給付金 cải cách 2025**:\n• Yêu cầu cả cha + mẹ đều 育休 (hoặc 産休) trong 8 tuần đầu.\n• Mẹ là 専業主婦 / không có việc → KHÔNG đủ điều kiện cho phần thêm 13%.\n• Mẹ đi làm + dùng 産休 + 育休 → đủ điều kiện.\n\n**Vợ ở VN không sang Nhật**:\n• Bạn vẫn có quyền 育休 nếu con sang Nhật + có 住民票.\n• Nếu con KHÔNG ở Nhật → tình huống phức tạp, hỏi 社会保険労務士 + ハローワーク.\n• 出生後休業支援給付金: ít khả năng đủ điều kiện vì vợ không ở Nhật.\n\n**Vợ là 専業主婦 / part-time không có 雇用保険**:\n• Vợ không có 産休給付金 / 育児休業給付金.\n• Bạn vẫn có 育児休業給付金 từ 雇用保険.\n• Cải cách 2025 phần thêm 13%: tùy điều kiện cụ thể — hỏi ハローワーク.',
    },
    {
      question: 'Tôi có visa lao động — 育休 có ảnh hưởng visa không?',
      answer:
        '**Đa số trường hợp KHÔNG**:\n\n• 育休 vẫn duy trì 雇用契約 với công ty.\n• 雇用保険 + 社会保険 không bị gián đoạn (chỉ miễn phí).\n• Visa 技術・人文知識・国際業務 / 高度専門職 / 経営・管理: không yêu cầu phải đi làm hằng ngày, chỉ cần 雇用契約 còn hiệu lực.\n• 在留期限 không thay đổi vì 育休.\n• 確定申告 / 住民税 ít ảnh hưởng.\n\n**Khi 在留期間 update / extend**:\n\n• 入管 yêu cầu chứng minh thu nhập (源泉徴収票 / 課税証明書).\n• 給付金 KHÔNG hiện trên 源泉徴収票 (vì tax-free).\n• Có thể cần thêm: 育児休業給付支給決定通知書, 育児休業中の証明書.\n• Nói chuyện với HR trước khi update để chuẩn bị giấy tờ.\n\n**永住 / 帰化 application trong / ngay sau 育休**:\n\n• Có thể ảnh hưởng — 入管 / 法務省 xét thu nhập + 安定性.\n• Hỏi luật sư / 行政書士 trước khi apply.\n\n**Visa 留学 / 家族滞在**: KHÔNG có 育児休業 vì không phải 雇用契約 chính thức. Nếu vợ visa lao động + bạn 家族滞在: vợ là người dùng 育休, không phải bạn.',
    },
  ],
  counterPhrases: [
    {
      jp: '育児休業を取得したいです。',
      romaji: 'Ikuji kyuugyou o shutoku shitai desu.',
      vn: 'Tôi muốn lấy 育児休業.',
      note: 'Câu mở đầu khi báo HR. 育休 là viết tắt phổ biến trong nói chuyện.',
    },
    {
      jp: '産後パパ育休を申請したいです。',
      romaji: 'Sango papa ikukyu o shinsei shitai desu.',
      vn: 'Tôi muốn xin 産後パパ育休.',
      note: 'Cụ thể cho 4 tuần đặc biệt sau sinh.',
    },
    {
      jp: '出産予定日は〇月〇日です。',
      romaji: 'Shussan yotei-bi wa 〇gatsu 〇nichi desu.',
      vn: 'Ngày dự sinh là 〇/〇.',
      note: 'Cho HR biết để lên lịch.',
    },
    {
      jp: '育児休業給付金について教えてください。',
      romaji: 'Ikuji kyuugyou kyuufukin ni tsuite oshiete kudasai.',
      vn: 'Cho tôi biết về 育児休業給付金.',
      note: 'Hỏi ハローワーク hoặc HR.',
    },
    {
      jp: '出生後休業支援給付金は対象になりますか。',
      romaji: 'Shusseigo kyuugyou shien kyuufukin wa taishou ni narimasu ka.',
      vn: 'Tôi có đủ điều kiện cho 出生後休業支援給付金 không?',
      note: 'Hỏi ハローワーク (cải cách 2025).',
    },
    {
      jp: '取得期間は〇か月の予定です。',
      romaji: 'Shutoku kikan wa 〇kagetsu no yotei desu.',
      vn: 'Thời gian dự kiến là 〇 tháng.',
      note: 'Báo công ty kế hoạch — có thể điều chỉnh sau.',
    },
    {
      jp: '復職後の業務について相談したいです。',
      romaji: 'Fukushokugo no gyoumu ni tsuite soudan shitai desu.',
      vn: 'Tôi muốn thảo luận về công việc sau khi quay lại.',
      note: 'Trước khi nghỉ — đảm bảo có vai trò khi quay lại.',
    },
    {
      jp: '育児・介護休業法に基づいて申請しています。',
      romaji: 'Ikuji / kaigo kyuugyou hou ni motozuite shinsei shite imasu.',
      vn: 'Tôi đăng ký theo 育児・介護休業法.',
      note: 'Khi công ty từ chối / gây khó — nhắc luật.',
    },
  ],
  officialLinks: [
    { label: '厚生労働省', url: 'https://www.mhlw.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Khi vợ có thai — kế hoạch sớm',
      description:
        'Bắt đầu plan từ tháng thứ 4–5 thai (khi 母子手帳 đã có):\n\n1. **Tính toán tài chính**:\n• Tính lương trước nghỉ — 67% (6 tháng đầu) + 50% (6 tháng sau).\n• Cộng cải cách 2025 (+13% nếu đủ điều kiện).\n• Trừ chi phí thường (rent, food, utility) — đủ không?\n• Tiết kiệm dự phòng 3 tháng chi phí trước khi nghỉ.\n\n2. **Quyết định loại + thời gian**:\n• 産後パパ育休 (4 tuần trong 8 tuần đầu) — bắt buộc nên dùng.\n• 育児休業 thường — bao lâu? 1 tháng / 3 tháng / 6 tháng / 1 năm.\n• Cả 2 cha + mẹ cùng 育休 → đủ điều kiện 出生後休業支援給付金.\n\n3. **Báo công ty (informal first)**:\n• Nói với 上司 (sếp trực tiếp) trước HR — show respect.\n• Đề cập kế hoạch sơ bộ.\n• Quan sát phản ứng — nếu có dấu hiệu パタハラ, chuẩn bị evidence.\n\n4. **Research công ty**:\n• 就業規則 (rule book) — phần 育休.\n• Đồng nghiệp đã từng dùng 育休 — kinh nghiệm.\n• % nam dùng 育休 ở công ty (公開 cho công ty ≥ 1000 nhân viên).',
      documents: [
        '母子手帳',
        'Lương 6 tháng gần',
        '就業規則 công ty',
      ],
      tip: 'Báo sớm = công ty có thời gian planning + dễ accept. Báo phút cuối = stress + có thể bị từ chối.',
    },
    {
      step: 2,
      title: 'Báo công ty chính thức (1 tháng trước)',
      description:
        '**Timing**:\n• 育児休業 thường: 1 tháng trước.\n• 産後パパ育休: 2 tuần trước (hoặc 1 tháng tùy 規定).\n\n**Cách báo**:\n\n1. **Email + giấy**:\n• Email cho 上司 + HR cùng lúc.\n• Subject: "育児休業申請の件 / [tên bạn]".\n• Nội dung formal:\n```\n[上司 / HR] 様\n\n[Tên] です。\n\nこの度、〇月〇日に出産を予定しており、\n育児休業を取得させていただきたいと存じます。\n\n期間: 〇月〇日〜〇月〇日 (〇か月)\n種類: 産後パパ育休 / 育児休業\n\n業務の引き継ぎについては、\n別途ご相談させていただきたく存じます。\n\n何卒よろしくお願いいたします。\n\n[Tên đầy đủ]\n```\n\n2. **Form 育児休業申出書**:\n• HR cấp form chuẩn của công ty.\n• Điền: tên + ngày sinh con dự kiến + thời gian leave + ngày nộp.\n• Ký + đóng dấu (印鑑) nếu yêu cầu.\n\n3. **Họp với HR + 上司**:\n• Thảo luận: business handover, công ty cover thế nào, ngày quay lại.\n• Note: bạn có quyền 育休 — đừng "xin phép" như đặc ân. Là quyền pháp lý.\n\n4. **Confirmation**:\n• Nhận giấy xác nhận từ HR.\n• Lưu kỹ — bằng chứng cho dispute sau (nếu có).',
      documents: [
        'Email + form 育児休業申出書',
      ],
      tip: 'Tone formal nhưng KHÔNG xin lỗi quá. Đây là quyền — không phải ưu ái.',
    },
    {
      step: 3,
      title: 'Apply 育児休業給付金 qua công ty + ハローワーク',
      description:
        'Sau khi 育休 bắt đầu:\n\n1. **Công ty submit form** qua ハローワーク:\n• 育児休業給付受給資格確認票.\n• 育児休業給付金支給申請書.\n• 賃金台帳 + 出勤簿.\n• Bằng công ty làm — bạn cung cấp giấy tờ cá nhân.\n\n2. **Cá nhân chuẩn bị**:\n• 母子手帳 photo (trang ghi tên + ngày sinh con).\n• Sổ ngân hàng (số tài khoản).\n• マイナンバー.\n• 雇用保険被保険者証 (công ty thường giữ).\n\n3. **2025 cải cách (出生後休業支援給付金)**:\n• Nếu cả cha + mẹ đều 育休 / 産休 trong 8 tuần đầu sau sinh → đủ điều kiện thêm 13%.\n• Đăng ký riêng — hỏi HR + ハローワーク.\n• Mức + điều kiện CỤ THỂ kiểm tra với 雇用保険 vì cải cách mới.\n\n4. **Nhận tiền**:\n• 給付金 trả 2 tháng / lần (mỗi đợt 2 tháng leave).\n• Lần đầu: 2–3 tháng sau khi bắt đầu nghỉ.\n• Chuyển khoản vào tài khoản ngân hàng.\n• Có giấy xác nhận 支給決定通知書 mỗi đợt.\n\n5. **Theo dõi**:\n• Kiểm tra số tiền nhận vào tài khoản.\n• Nếu trễ / sai — liên hệ HR + ハローワーク.',
      documents: [
        '母子手帳 + sổ ngân hàng + マイナンバー',
        '出生届 photo (sau sinh)',
      ],
      tip: 'Lưu mọi giấy tờ + 通知書 — cần cho 確定申告 + visa update (nếu có).',
    },
    {
      step: 4,
      title: 'Trong 育休 — chăm con thực tế',
      description:
        'KHÔNG phải vacation. Chăm con sơ sinh là công việc 24/7:\n\n**Tuần 1–2 sau sinh** (vợ phục hồi):\n• Đêm: thay tã + cho bú bình (nếu cần) + ru con.\n• Ngày: nấu ăn + dọn dẹp + giặt + chăm vợ.\n• Vợ chỉ cần focus phục hồi + cho con bú.\n• Chăm vợ: chườm ấm, ăn đủ, giấc ngủ, hỗ trợ tâm lý.\n\n**Tuần 3–8** (產後 hồi phục):\n• Vợ vẫn đang phục hồi 産後 (sau 産褥期).\n• Cha tiếp tục chăm con + nhà.\n• Đăng ký 出生届 + 児童手当 (xem các guide khác).\n• Kiểm tra sức khỏe vợ + con (1 tháng検診, 2 tháng検診).\n\n**Sau 8 tuần** (vợ đã ổn):\n• Cha có thể tiếp tục 育児休業 thường (hoặc quay lại làm).\n• Cha + mẹ chia ca đêm.\n• Bắt đầu kết nối cộng đồng nuôi con (公園 デビュー, 子育てサロン).\n\n**Học chăm con**:\n• Sách: "新・赤ちゃんカレンダー" (Akachan Calendar).\n• YouTube: 助産師 trong tiếng Việt / Nhật.\n• 多文化共生 events cho gia đình mới sinh.\n• Phụ huynh người Việt khác trong cộng đồng.\n\n**Tâm lý cha**:\n• 産後うつ (depression sau sinh) — không chỉ mẹ. Cha cũng có thể bị.\n• Stress + thiếu ngủ + thay đổi đời sống + tài chính → bình thường.\n• Nếu kéo dài >2 tuần → liên hệ 心療内科 (xem guide mental-health-stress-support).',
      documents: [
        '母子手帳',
      ],
      tip: '産後 8 tuần là giai đoạn quan trọng cho mối quan hệ con + bố. Đầu tư time = lợi ích đời.',
    },
    {
      step: 5,
      title: 'Quay lại làm — 復職',
      description:
        'Trước khi 復職 (1–2 tuần):\n\n1. **Báo công ty**: ngày dự định quay lại.\n• Email HR + 上司.\n• Có thể đổi (vd kéo dài) nếu cần.\n\n2. **Họp pre-return**:\n• Thảo luận: vai trò sau quay lại, project hiện tại, training cập nhật.\n• Đảm bảo cùng vị trí + lương trước nghỉ (luật bảo vệ).\n• Nếu công ty muốn đổi vai trò → bàn bạc — KHÔNG bị ép giảm role.\n\n3. **時短勤務 (giờ làm rút ngắn)**:\n• Có quyền request 時短勤務 đến khi con 3 tuổi (1 số công ty đến 6 tuổi).\n• Vd: 9:00–16:00 thay vì 9:00–18:00.\n• Lương giảm tương ứng.\n• Phù hợp cho người vẫn cần chăm con.\n\n4. **Ngày đầu quay lại**:\n• Đến đúng giờ + sớm hơn 5–10 phút.\n• Mang quà nhỏ (お菓子 ~1,000–2,000円) cho team — show respect.\n• Cảm ơn cá nhân với người đã cover lúc nghỉ.\n• Update mình cho project hiện tại.\n\n5. **Theo dõi sau quay lại**:\n• Workload không tăng bất thường.\n• Lương + role không bị giảm.\n• Đánh giá performance không bị penalize.\n• Nếu có dấu hiệu パタハラ → báo 都道府県労働局.\n\n6. **Đánh giá 育休**:\n• Note kinh nghiệm cho sau (vd con thứ 2).\n• Share với cộng đồng người Việt — encourage cha khác cũng dùng.\n• 育休 có lợi cho công ty (employee retention) + xã hội (gender equality) + gia đình.',
      documents: [
        'Báo công ty quay lại',
      ],
      tip: '育休 không phải "lỗ" mà là **đầu tư** vào gia đình + bản thân + xã hội. Cha người Việt dùng 育休 = mẫu cho thế hệ sau.',
    },
  ],
};

export default paternityParentalLeaveFathers;
