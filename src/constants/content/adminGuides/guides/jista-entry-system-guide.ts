import type { AdminGuide } from '../../../../types/content';

const jistaEntrySystemGuide: AdminGuide = {
  id: 'jista-entry-system-guide',
  category: 'immigration',
  lastVerified: '2026-05-14',
  priority: 'normal',
  title: 'JESTA — hệ thống xét duyệt nhập cảnh điện tử trước (đề xuất)',
  titleJp: 'JESTA — 電子的渡航認証システム（提案中）',
  icon: 'airplane-outline',
  color: '#5D6D7E',
  description:
    '**JESTA** (Japan Electronic System for Travel Authorization) là hệ thống xét duyệt **trước nhập cảnh điện tử** cho khách miễn visa — tương tự **ESTA của Mỹ** và **eTA của Canada**. Tại 2026-05-14, JESTA **đang ở giai đoạn đề xuất + chuẩn bị** từ chính phủ Nhật, **CHƯA vận hành chính thức**. Đối tượng dự kiến: du khách miễn visa (vd: Mỹ, Anh, Úc) — **KHÔNG áp dụng cho người Việt** (Việt Nam KHÔNG miễn visa Nhật — vẫn xin visa truyền thống). Người Việt cư trú dài hạn (在留カード) cũng KHÔNG bị ảnh hưởng. Đây là **tài liệu định hướng** cho người quan tâm chính sách + người Việt mời bạn bè quốc gia miễn visa sang Nhật. Kiểm tra thông báo chính thức trước khi đi du lịch.',
  searchKeywords: [
    'JESTA',
    'jesta nhật',
    'visa miễn Nhật điện tử',
    'electronic travel authorization Japan',
    'JESTA Vietnam',
    'người Việt JESTA',
    '電子的渡航認証',
    'pre-clearance Japan',
    'tourist visa waiver',
    'ESTA Nhật tương đương',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      'JESTA là đề xuất chính sách của chính phủ Nhật (出入国在留管理庁 + MOFA + 観光庁) — **CHƯA luật hóa** + **CHƯA vận hành**. Theo công bố báo chí + nghiên cứu chính sách: dự kiến triển khai cho khách miễn visa (~70 quốc gia/vùng được miễn visa Nhật). **Việt Nam KHÔNG nằm trong nhóm miễn visa** — JESTA KHÔNG áp dụng. Tài liệu này định hướng cho người quan tâm chính sách, KHÔNG thay thế thông báo chính thức. Kiểm tra trang ISA + MOFA + Đại sứ quán Nhật trước khi đi.',
    sourceVerifiedAt: '2026-05-14',
    nextReviewAt: '2026-12-01',
    riskLevel: 'low',
    whenToAskExpert: [
      'Bạn nghe tin "JESTA bắt đầu 2026" hay "phải đăng ký JESTA để vào Nhật" — KIỂM TRA với Đại sứ quán Nhật trước. Tại 2026-05-14, JESTA chưa vận hành.',
      'Bạn có bạn bè người Mỹ / Anh / Úc / Singapore (miễn visa Nhật) muốn đến Nhật — họ sẽ phải dùng JESTA khi hệ thống vận hành. Theo dõi MOFA cho mốc cụ thể.',
      'Bạn người Việt đang du lịch / công tác Nhật (visa truyền thống) — KHÔNG bị ảnh hưởng JESTA.',
      'Bạn là 不動産業 / 観光業 phục vụ khách miễn visa — cần biết JESTA để hướng dẫn khách hàng.',
    ],
  },
  quickAction: {
    deadline:
      'Tại 2026-05-14: JESTA **CHƯA có mốc vận hành chính thức**. Báo chí 2024–2025 đề cập "dự kiến trong giai đoạn 2026–2030". Không có deadline gấp.',
    office:
      '**Sau khi JESTA vận hành** (dự kiến): nộp online qua trang chính thức (TBD — chưa công bố URL). **Hiện tại 2026-05-14**: theo dõi cập nhật từ **MOFA / ISA / 観光庁**. **Đại sứ quán Nhật** ở quốc gia khách miễn visa sẽ thông báo cho công dân.',
    doNow: [
      'KIỂM TRA quốc tịch bạn / bạn bè có thuộc nhóm miễn visa Nhật không (~70 quốc gia gồm Mỹ, Anh, Úc, Singapore, Hàn Quốc, Đài Loan; **KHÔNG có Việt Nam**).',
      'Nếu thuộc nhóm miễn visa: theo dõi thông báo MOFA về mốc JESTA vận hành.',
      'Nếu là **người Việt**: KHÔNG cần lo về JESTA — visa truyền thống vẫn áp dụng.',
      'Nếu đang ở Nhật visa dài hạn (在留カード): JESTA KHÔNG ảnh hưởng — chỉ áp dụng cho khách miễn visa ngắn hạn.',
      'Cảnh báo lừa đảo: trang giả mạo "Đăng ký JESTA — 5,000円" → hiện tại JESTA chưa có trang chính thức.',
    ],
    bring: [
      'Hộ chiếu khách miễn visa (khi JESTA vận hành sau)',
      'Email + thông tin chuyến bay + nơi ở Nhật',
      'Phí đăng ký (theo công bố — chưa có ngày 2026-05-14)',
    ],
    ifLate:
      'JESTA chưa vận hành → không có "muộn". Khi vận hành: làm theo quy trình cụ thể được công bố.',
    officialSourceLabels: ['出入国在留管理庁 (ISA)'],
  },
  whoIsThisFor: [
    'Người quan tâm chính sách nhập cảnh Nhật 2026+.',
    'Người Việt mời bạn bè quốc gia miễn visa sang Nhật.',
    'Người Việt làm 観光業 / 不動産業 phục vụ khách quốc tế.',
    'Du khách quốc gia miễn visa (Mỹ, Anh, Úc, Singapore, Hàn, Đài) chuẩn bị đi Nhật.',
    'KHÔNG dành cho: người Việt đi Nhật theo visa thường (KHÔNG áp dụng JESTA — Việt Nam không miễn visa).',
    'KHÔNG dành cho: người Việt cư trú dài hạn 在留カード (JESTA không áp dụng cho cư trú dài hạn).',
  ],
  whenToDo: [
    '**Hiện tại (2026-05-14)**: JESTA chưa vận hành — không cần làm gì.',
    'Theo dõi mốc vận hành qua MOFA / ISA / 観光庁 — có thể trong 2026–2030.',
    'Khi đi du lịch Nhật + thuộc nhóm miễn visa: kiểm tra JESTA yêu cầu (sau khi vận hành) **72 giờ – 1 tuần trước chuyến bay**.',
    'Không có "đăng ký sớm cho tương lai" — JESTA sẽ có hạn hiệu lực giới hạn.',
  ],
  whereToDo: [
    '**Sau khi vận hành**: trang chính thức JESTA (TBD — sẽ là dưới ISA / MOFA).',
    '**Hiện tại**:\n• **ISA**: theo dõi trang chính cho thông báo JESTA.\n• **MOFA**: theo dõi 在外公館 thông báo cho công dân miễn visa.\n• **観光庁**: thông tin chiến lược du lịch quốc gia.',
    '**Tài liệu khuyến nghị**: theo dõi trang chính thức + tránh trang lừa đảo giả mạo (chưa có URL chính thức).',
  ],
  estimatedTime:
    'JESTA chưa vận hành — không có dự kiến cụ thể. Tham khảo ESTA (Mỹ): 5–10 phút đăng ký online + 72 giờ xét duyệt. eTA (Canada): tương tự. JESTA dự kiến cũng nhanh.',
  fees: [
    'Phí JESTA: **CHƯA công bố** tại 2026-05-14.',
    'Tham khảo:\n• ESTA (Mỹ): 21 USD.\n• eTA (Canada): 7 CAD.\n• ETIAS (EU — vận hành 2025): 7 EUR.',
    'Dự kiến JESTA cũng vài USD/EUR — không đắt.',
    'KHÔNG có "phí đăng ký sớm" — chưa có hệ thống.',
    'Cảnh báo: trang giả mạo "JESTA 5,000円" → lừa đảo, hiện tại chưa có hệ thống.',
  ],
  documentsChecklist: [
    { label: 'Hộ chiếu (khi JESTA vận hành)', required: true, note: 'Khách miễn visa chuẩn bị du lịch Nhật.' },
    { label: 'Thông tin chuyến bay (số chuyến + ngày)', required: false, note: 'Theo công bố sau.' },
    { label: 'Nơi ở Nhật (khách sạn / địa chỉ)', required: false, note: 'Tương tự ESTA / eTA.' },
    { label: 'Email + thông tin liên lạc', required: true, note: 'Nhận thông báo kết quả.' },
    { label: 'Thẻ tín dụng (cho phí)', required: false, note: 'Khi vận hành.' },
  ],
  commonMistakes: [
    'Tin "JESTA bắt đầu 2026" + đăng ký NGAY → SAI. Hệ thống chưa vận hành tại 2026-05-14.',
    'Tin "Việt Nam phải đăng ký JESTA" → SAI. Việt Nam KHÔNG miễn visa Nhật → JESTA không áp dụng.',
    'Người Việt cư trú dài hạn lo lắng về JESTA → KHÔNG cần. JESTA chỉ cho khách miễn visa ngắn hạn.',
    'Tin trang giả mạo "Đăng ký JESTA — phí 5,000円" → 100% lừa đảo (chưa có trang chính thức).',
    'Nhầm JESTA với ESTA (Mỹ) → tương tự nhưng khác nước, khác hệ thống.',
    'Nghĩ JESTA thay thế visa Việt Nam → SAI. Người Việt vẫn xin visa truyền thống.',
  ],
  faq: [
    {
      question: 'JESTA là gì? Có áp dụng cho người Việt không?',
      answer:
        '**JESTA** (Japan Electronic System for Travel Authorization) là hệ thống xét duyệt nhập cảnh **điện tử trước** cho khách **miễn visa** Nhật — tương tự ESTA của Mỹ.\n\n**KHÔNG áp dụng cho người Việt**:\n\nViệt Nam KHÔNG nằm trong danh sách miễn visa Nhật (~70 quốc gia). Người Việt đi Nhật phải xin **visa truyền thống** tại Đại sứ quán Nhật (Hà Nội) hoặc Tổng Lãnh sự (TP.HCM).\n\nKhi JESTA vận hành (dự kiến 2026–2030):\n\n• **Áp dụng cho**: khách miễn visa (Mỹ, Anh, Úc, Singapore, Hàn Quốc, Đài Loan, EU phần lớn, v.v.).\n• **KHÔNG áp dụng**: Việt Nam + các quốc gia khác cần visa.\n\n**Người Việt cư trú dài hạn Nhật**:\n\n• Có 在留カード → KHÔNG cần JESTA khi vào lại Nhật (dùng 再入国許可 hoặc みなし再入国).\n• Visa lao động / 永住 / 留学 — không liên quan JESTA.\n\n**Tóm tắt**: Nếu bạn là **người Việt** quốc tịch Việt Nam:\n• Đi Nhật du lịch → vẫn xin visa truyền thống ở Đại sứ quán.\n• Cư trú dài hạn → 在留カード thường, không liên quan JESTA.\n• KHÔNG cần lo về JESTA.',
    },
    {
      question: 'Khi nào JESTA vận hành? Đăng ký ở đâu?',
      answer:
        'Tại 2026-05-14: JESTA **CHƯA vận hành**.\n\n**Trạng thái hiện tại**:\n\n• Đề xuất chính sách từ chính phủ Nhật (xuất hiện trong báo chí + nghiên cứu 観光庁 từ 2023–2024).\n• Chuẩn bị luật + hệ thống IT.\n• Tham khảo mô hình ESTA (Mỹ) + eTA (Canada) + ETIAS (EU).\n\n**Mốc dự kiến** (không chính thức):\n\n• Báo chí Nhật 2024–2025 nêu "trong khoảng 2026–2030".\n• Chính phủ chưa công bố ngày cụ thể.\n• Có thể kéo dài hơn do hệ thống IT phức tạp.\n\n**Khi vận hành**:\n\n• Trang chính thức (URL chưa công bố — dự kiến dưới ISA / MOFA).\n• Đăng ký online từ điện thoại / PC.\n• Phí vài USD (tham khảo ESTA 21 USD, eTA 7 CAD, ETIAS 7 EUR).\n• Xét duyệt 72 giờ – 1 tuần.\n• Hạn hiệu lực giới hạn (vd ESTA: 2 năm hoặc đến khi hộ chiếu hết hạn).\n\n**Theo dõi cập nhật**:\n\n• Trang ISA: https://www.moj.go.jp/isa/\n• Trang MOFA: https://www.mofa.go.jp/\n• Đại sứ quán Nhật ở quốc gia miễn visa sẽ thông báo cho công dân.\n• Báo chí du lịch Nhật + Nikkei.\n\n**Cảnh báo lừa đảo**:\n\n• Trang giả mạo "Đăng ký JESTA — phí 5,000円" → 100% lừa đảo.\n• SMS "JESTA hết hạn — gia hạn ngay" → SAI (hệ thống chưa vận hành).\n• Chỉ tin trang .go.jp chính thức.',
    },
    {
      question: 'Tôi mời bạn Mỹ / Anh sang Nhật — họ có phải đăng ký JESTA không?',
      answer:
        '**Hiện tại 2026-05-14**: JESTA chưa vận hành → không cần đăng ký.\n\n**Khi JESTA vận hành**:\n\n• Bạn Mỹ / Anh / Úc / Singapore / Hàn Quốc / Đài Loan / EU phần lớn → thuộc nhóm miễn visa Nhật → sẽ phải đăng ký JESTA trước khi đi.\n\n**Quy trình dự kiến** (theo mô hình ESTA / eTA):\n\n1. Bạn đăng ký online qua trang chính thức 72 giờ – 1 tuần trước chuyến bay.\n2. Điền thông tin: hộ chiếu, chuyến bay, nơi ở Nhật, lý do du lịch.\n3. Trả phí (vài USD/EUR).\n4. Đợi xét duyệt — đa số 72 giờ.\n5. Nhận thông báo qua email + lưu lại.\n6. Khi check-in chuyến bay → hãng hàng không kiểm tra JESTA.\n7. Khi đến Nhật → nhân viên 入管 kiểm tra lại.\n\n**Khi nào KHÔNG cần JESTA**:\n\n• Visa truyền thống (cho người Việt + quốc gia không miễn visa).\n• Visa du lịch dài hạn.\n• Visa lao động / 留学 / 永住.\n• Trẻ em theo cha/mẹ — tùy quy định cụ thể.\n\n**Lưu ý bạn bè quốc tế**:\n\n• Báo họ kiểm tra JESTA yêu cầu trước khi đặt vé (sau khi vận hành).\n• Không phải mọi quốc gia miễn visa đều áp dụng JESTA ngay từ đầu — có thể triển khai theo giai đoạn.\n• Phí thấp + xét nhanh nhưng vẫn cần thời gian.',
    },
  ],
  counterPhrases: [
    {
      jp: 'JESTAについて教えてください。',
      romaji: 'JESTA ni tsuite oshiete kudasai.',
      vn: 'Cho tôi biết về JESTA.',
      note: 'Tại 入管 / Đại sứ quán Nhật.',
    },
    {
      jp: 'ベトナム国籍はJESTA対象ですか？',
      romaji: 'Betonamu kokuseki wa JESTA taishou desu ka?',
      vn: 'Quốc tịch Việt Nam có thuộc đối tượng JESTA không?',
      note: 'KHÔNG — VN không miễn visa.',
    },
    {
      jp: 'いつから運用開始ですか？',
      romaji: 'Itsu kara unyou kaishi desu ka?',
      vn: 'Khi nào vận hành?',
      note: 'Chưa rõ tại 2026-05-14.',
    },
    {
      jp: '手数料はいくらですか？',
      romaji: 'Tesuuryou wa ikura desu ka?',
      vn: 'Phí bao nhiêu?',
      note: 'Chưa công bố.',
    },
    {
      jp: '在留カードを持っていますが、JESTAは必要ですか？',
      romaji: 'Zairyuu kaado o motte imasu ga, JESTA wa hitsuyou desu ka?',
      vn: 'Tôi có 在留カード, có cần JESTA không?',
      note: 'KHÔNG cần — JESTA chỉ cho khách miễn visa.',
    },
  ],
  officialLinks: [
    { label: '出入国在留管理庁 (ISA)', url: 'https://www.moj.go.jp/isa/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Xác định bạn / bạn bè có cần JESTA không',
      description:
        '**Quy tắc đơn giản**:\n\n• **Người Việt quốc tịch VN** → KHÔNG cần JESTA. Xin visa truyền thống.\n• **Người Việt 在留カード dài hạn** → KHÔNG cần JESTA. Dùng 再入国 hoặc みなし再入国.\n• **Bạn bè quốc tịch miễn visa Nhật** (Mỹ, Anh, Úc, EU, Hàn, Đài, etc.) → SAU KHI JESTA vận hành sẽ cần.\n\n**Danh sách miễn visa Nhật** (~70 quốc gia/vùng — tham khảo MOFA):\n\n• Mỹ, Canada, Mexico.\n• Anh, Đức, Pháp, Ý, Tây Ban Nha, Hà Lan, Bỉ, etc. (EU phần lớn).\n• Úc, New Zealand.\n• Singapore, Malaysia, Brunei, Thái Lan (15 ngày).\n• Hàn Quốc, Đài Loan, Hong Kong, Macau.\n• Israel, UAE, Qatar.\n\n• **KHÔNG miễn visa**: Việt Nam, Trung Quốc, Philippines, Indonesia, Ấn Độ, Bangladesh, Sri Lanka, Pakistan, đa số châu Phi + Trung Đông.\n\n**Kiểm tra cụ thể**: trang MOFA https://www.mofa.go.jp/j_info/visit/visa/short/novisa.html',
      documents: [],
      tip: 'Quốc tịch quan trọng hơn nơi cư trú. Người Việt sống ở Mỹ vẫn cần visa Nhật (vì quốc tịch VN).',
    },
    {
      step: 2,
      title: 'Theo dõi mốc JESTA vận hành (chưa rõ)',
      description:
        '**Tại 2026-05-14**:\n\n• JESTA chưa có mốc vận hành chính thức.\n• Đề xuất chính sách + chuẩn bị hệ thống đang tiến hành.\n• Báo chí dự đoán "2026–2030".\n\n**Theo dõi qua**:\n\n• **ISA**: https://www.moj.go.jp/isa/ (trang chính)\n• **MOFA**: https://www.mofa.go.jp/\n• **観光庁**: https://www.mlit.go.jp/kankocho/\n• **Báo chí**: Nikkei, Asahi, Mainichi.\n• **Đại sứ quán Nhật** ở quốc gia bạn / bạn bè.\n\n**Khi vận hành**: sẽ có thông báo rộng rãi qua media + Đại sứ quán + hãng hàng không.\n\n**KHÔNG đăng ký trước khi vận hành**:\n\n• Hiện tại không có trang chính thức.\n• Trang giả mạo "JESTA pre-registration" → lừa đảo.',
      documents: [],
      tip: 'Đặt bookmark trang ISA + MOFA. Kiểm tra 1 lần/quý nếu quan tâm.',
    },
    {
      step: 3,
      title: 'Khi JESTA vận hành — quy trình dự kiến (theo mô hình ESTA)',
      description:
        '**Bước 1**: Vào trang chính thức JESTA (URL công bố khi vận hành).\n\n**Bước 2**: Đăng ký:\n\n• Thông tin cá nhân: tên, ngày sinh, quốc tịch.\n• Hộ chiếu: số, hạn.\n• Chuyến bay: hãng hàng không, số chuyến, ngày đến Nhật.\n• Nơi ở Nhật: tên + địa chỉ + số điện thoại.\n• Lý do du lịch.\n• Câu hỏi an ninh (tiền án, bệnh truyền nhiễm, v.v.).\n\n**Bước 3**: Trả phí (vài USD/EUR — tham khảo ESTA 21 USD).\n\n**Bước 4**: Đợi xét duyệt — đa số 72 giờ. Một số case lâu hơn (1 tuần).\n\n**Bước 5**: Nhận thông báo qua email:\n\n• Approved → in / lưu xác nhận.\n• Hoặc — Pending / Denied.\n\n**Bước 6**: Khi đi:\n\n• Check-in chuyến bay → hãng hàng không kiểm tra JESTA qua API.\n• Tại 入管 Nhật → nhân viên kiểm tra lại.\n\n**Hạn hiệu lực**:\n\n• Tham khảo ESTA: 2 năm hoặc đến khi hộ chiếu hết hạn.\n• JESTA chưa công bố — có thể tương tự.\n\n**Khi visa thông thường**:\n\n• KHÔNG dùng JESTA — visa truyền thống đã có hiệu lực.\n• Người Việt: visa du lịch / công tác từ Đại sứ quán Nhật.',
      documents: [],
      tip: 'Khi JESTA vận hành, sẽ có guide chính thức từ ISA / MOFA. Theo dõi nguồn chính thức.',
    },
    {
      step: 4,
      title: 'Cảnh báo lừa đảo + thông tin sai',
      description:
        '**Lừa đảo phổ biến** (xuất hiện trước khi JESTA vận hành):\n\n• Trang giả mạo "Đăng ký JESTA trước" với phí 5,000–10,000円 → 100% LỪA ĐẢO.\n• SMS / email "JESTA của bạn hết hạn — click link" → SAI (hệ thống chưa vận hành).\n• Người lạ gọi điện nhận là "JESTA Office" → SAI.\n\n**Nguyên tắc đề phòng**:\n\n• Chỉ tin trang `.go.jp` chính thức.\n• KHÔNG đăng ký JESTA cho đến khi có thông báo MOFA / ISA chính thức.\n• KHÔNG click link SMS / email lạ.\n• KHÔNG đưa thông tin hộ chiếu / thẻ tín dụng qua điện thoại.\n\n**Thông tin sai phổ biến**:\n\n• "JESTA thay thế visa Việt Nam" → SAI. Người Việt vẫn xin visa truyền thống.\n• "JESTA cho người Việt cư trú Nhật khi vào lại" → SAI. 在留カード + 再入国 vẫn áp dụng.\n• "JESTA tăng phí visa" → SAI. Không liên quan visa truyền thống.\n• "Phải đăng ký JESTA 2026" → SAI (chưa vận hành).\n\n**Khi nghi ngờ**:\n\n• Hỏi Đại sứ quán Nhật trực tiếp.\n• Hỏi ISA qua hotline / email.\n• Hỏi hãng hàng không (họ có thông tin yêu cầu visa / JESTA chính thức).',
      documents: [],
      tip: 'Quy tắc vàng: nếu trang yêu cầu trả phí trước khi có thông báo chính thức từ MOFA → lừa đảo. Đợi thông báo.',
    },
    {
      step: 5,
      title: 'Tổng kết cho người Việt + đa số trường hợp',
      description:
        '**Người Việt quốc tịch VN**:\n\n• KHÔNG cần JESTA — visa truyền thống.\n• Khi đi Nhật du lịch / công tác: visa từ Đại sứ quán Hà Nội / Tổng Lãnh sự TP.HCM.\n• Khi sang Nhật làm việc / học: visa dài hạn (技人国 / 留学 / 特定技能 / etc.) — xem các guide tương ứng.\n\n**Người Việt cư trú dài hạn Nhật** (在留カード):\n\n• KHÔNG cần JESTA.\n• Khi ra/vào Nhật: dùng みなし再入国 (1 năm tự động) hoặc 再入国許可 (lâu hơn).\n• 永住 / 帰化 → quy trình riêng.\n\n**Người Việt mời bạn bè quốc gia miễn visa**:\n\n• Khi JESTA vận hành: báo bạn bè kiểm tra JESTA yêu cầu trước khi đặt vé.\n• Visa thăm thân (短期滞在): vẫn áp dụng cho người Việt mời bạn bè (xem family-stay-invitation / short-stay-relative-visit guides).\n\n**Người Việt làm 観光業 / 不動産業**:\n\n• Khách quốc tế miễn visa: thông báo họ chuẩn bị JESTA khi vận hành.\n• Khách Việt Nam / quốc gia cần visa: vẫn theo quy trình hiện hành.\n\n**Cuối cùng**:\n\n• JESTA là cải tiến cho khách quốc tế Nhật — KHÔNG ảnh hưởng đa số người Việt.\n• Theo dõi cập nhật nhưng không cần lo.\n• Khi có thông báo chính thức → quay lại đọc lại guide này (sẽ cập nhật).',
      documents: [],
      tip: 'Tóm: JESTA không liên quan đa số người Việt. Yên tâm.',
    },
  ],
};

export default jistaEntrySystemGuide;
