import type { AdminGuide } from '../../../../types/content';

const inheritanceWillJapanForeigners: AdminGuide = {
  id: 'inheritance-will-japan-foreigners',
  category: 'daily-law',
  lastVerified: '2026-05-14',
  priority: 'normal',
  title: 'Di chúc + thừa kế ở Nhật cho người nước ngoài',
  titleJp: '在日外国人の相続・遺言ガイド',
  icon: 'document-text-outline',
  color: '#7D3C98',
  description:
    'Người Việt sống ở Nhật cần hiểu 2 khung pháp lý riêng: (1) **Luật dân sự áp dụng** — theo Luật 通則法 đ.36, thừa kế (heirs, phần chia) theo **luật quốc tịch của người chết** — tức luật Việt Nam cho công dân VN, có thể có renvoi; (2) **Thuế thừa kế (相続税)** ở Nhật — áp dụng theo luật thuế Nhật cho tài sản tại Nhật + một số trường hợp tài sản toàn cầu nếu cư trú dài hạn. Có thể làm di chúc kiểu Nhật (`自筆証書` / `公正証書`) hoặc kiểu Việt Nam. Đây là **tài liệu định hướng**, KHÔNG thay thế tư vấn cá nhân từ 弁護士 + 税理士 cross-border.',
  searchKeywords: [
    'di chúc Nhật',
    'thừa kế Nhật',
    'inheritance Japan',
    'will Japan',
    'thuế thừa kế',
    'soutoku',
    'người nước ngoài thừa kế',
    '相続',
    '遺言',
    '自筆証書遺言',
    '公正証書遺言',
    '相続税',
    '法定相続人',
    '遺留分',
    '通則法',
    '本国法',
    'vợ chồng chết để lại tài sản',
    'cha mẹ mất ở Nhật',
    'di sản',
  ],
  legalScope: {
    jurisdiction: 'mixed',
    jurisdictionNote:
      '**Luật áp dụng dân sự**: 通則法 (Act on General Rules for Application of Laws — 法の適用に関する通則法) đ.36 — thừa kế theo luật quốc tịch người chết. Nếu luật VN dẫn ngược về Nhật (renvoi) thì áp dụng luật Nhật. **Hình thức di chúc**: 遺言の方式の準拠法に関する法律 (1964) — di chúc hợp lệ nếu đáp ứng 1 trong nhiều cơ sở (quốc tịch, nơi cư trú thường xuyên, nơi lập di chúc, nơi tài sản). **Thuế thừa kế**: 相続税法 — luật thuế Nhật, áp dụng phần lớn cho tài sản tại Nhật và một số trường hợp tài sản toàn cầu cho cư trú dài hạn. **Hệ thống**: 民法 (civil code) định nghĩa 法定相続人 + 法定相続分 + 遺留分 cho công dân Nhật — KHÔNG tự động áp dụng cho người nước ngoài. **Cảnh báo**: thừa kế cross-border phức tạp, quy định 2024–2026 đang đổi (luật thuế thừa kế reform 2023), thay đổi luật VN cũng ảnh hưởng — phải tham vấn 弁護士 + 税理士.',
    sourceVerifiedAt: '2026-05-14',
    nextReviewAt: '2026-12-01',
    riskLevel: 'high',
    whenToAskExpert: [
      'Tài sản đáng kể ở Nhật (>30 triệu yên) hoặc tài sản hỗn hợp Nhật + Việt Nam — bắt buộc 弁護士 + 税理士 chuyên cross-border.',
      'Vợ/chồng / con quốc tịch khác nhau (vợ Việt, chồng Nhật, con song quốc tịch) — phân tích pháp luật áp dụng phức tạp.',
      'Người chết có nhiều tài khoản ngân hàng / 不動産 / cổ phiếu / 退職金 / 保険金 — quy trình khai báo phức tạp.',
      'Tranh chấp giữa người thừa kế (vợ trước / con riêng / cha mẹ) — thương lượng + tòa.',
      'Di chúc đã làm ở Việt Nam nay muốn dùng ở Nhật — kiểm tra hình thức + công chứng.',
      'Người chết để lại nợ (nhà thế chấp, tín dụng) — cân nhắc 限定承認 / 相続放棄 trong 3 tháng.',
      'Đã quá 10 tháng từ ngày chết — gấp xin nộp 相続税申告 muộn (有罪 / phạt).',
    ],
  },
  quickAction: {
    deadline:
      '**Khi vẫn còn sống — lập di chúc**: không có deadline, càng sớm càng tốt. **Sau khi người thân mất**: 7 ngày báo chính quyền nơi mất (死亡届). **Trong 3 tháng**: quyết định 単純承認 / 限定承認 / 相続放棄 — sau 3 tháng tự động 単純承認 (kế thừa cả nợ). **Trong 4 tháng**: 準確定申告 (申告 thuế cuối kỳ cho người chết). **Trong 10 tháng**: 相続税申告 + 納税 — quá hạn = phạt 5–20% + lãi.',
    office:
      '**Khi lập di chúc**: **公証役場** (cho 公正証書遺言 — chắc nhất) hoặc tự viết tại nhà (自筆証書 — rủi ro). **Sau khi mất**: **市役所/区役所** nộp 死亡届. **税務署** nộp 相続税. **法務局** đăng ký 不動産 sang tên. **金融機関** từng nơi xử lý tài khoản. **Đại sứ quán Việt Nam** xử lý giấy tờ VN.',
    doNow: [
      'Liệt kê tài sản (財産目録): 不動産, tiền gửi ngân hàng, 投資, 退職金 dự kiến, 生命保険, xe, đồ giá trị, **+ nợ** (vay ngân hàng, thẻ tín dụng còn nợ, nhà thế chấp).',
      'Liệt kê người thừa kế dự kiến (theo luật VN + ý muốn cá nhân).',
      'Quyết định: tự viết di chúc (rủi ro), hay đi 公証役場 làm 公正証書 (chắc, ~80,000–200,000円 tùy giá trị).',
      'Lưu giấy tờ quan trọng: hộ chiếu, 在留カード, 健康保険証, hợp đồng nhà, sổ tiết kiệm, di chúc — ở nơi gia đình biết.',
      'Bàn với vợ/chồng/con + dặn 1 người tin (`遺言執行者`) biết vị trí di chúc và liên hệ với 弁護士 / Đại sứ quán khi cần.',
    ],
    bring: [
      'Hộ chiếu / 在留カード',
      '戸籍謄本 Việt Nam (apostille / công chứng — bản gốc + bản dịch tiếng Nhật)',
      '住民票 hiện tại',
      '財産目録 (danh sách tài sản)',
      'Tên đầy đủ + ngày sinh + 続柄 (quan hệ) của người thừa kế',
      '印鑑証明書 (nếu làm 公正証書)',
      'Phí làm di chúc (80,000–200,000円 cho 公正証書)',
    ],
    ifLate:
      'Người thân mất + đã quá 3 tháng không quyết định 相続放棄 → tự động 単純承認 (kế thừa cả nợ). Nếu phát hiện sau >3 tháng mới biết nợ lớn → cân nhắc xin tòa 特別な事情. Quá 10 tháng nộp thuế → phạt 5–20% + lãi. Gấp gọi 弁護士 chuyên 相続.',
    officialSourceLabels: ['法務省 (MOJ) — 相続'],
  },
  whoIsThisFor: [
    'Người Việt sở hữu tài sản tại Nhật (nhà, tiền gửi, đầu tư) muốn chuẩn bị di chúc.',
    'Người Việt vừa có người thân mất ở Nhật (vợ/chồng/cha/mẹ/con) cần xử lý thừa kế.',
    'Người Việt kết hôn với người Nhật — quy trình thừa kế khác vì có yếu tố quốc tịch Nhật.',
    'Người Việt định cư lâu dài (永住 / 帰化) — luật áp dụng có thể đổi sau 帰化.',
    'Người Việt có con sinh ở Nhật (song quốc tịch tạm thời) — phân tích luật khó hơn.',
    'Người Việt có doanh nghiệp (個人事業 / 株式会社) — kế thừa kinh doanh phức tạp.',
    'Người Việt nhận được thông báo thừa kế từ Việt Nam (tài sản VN) trong khi đang ở Nhật.',
    'KHÔNG dành cho: tư vấn pháp lý cá nhân — chỉ định hướng. Tài sản quan trọng → 弁護士 chuyên 相続 cross-border.',
  ],
  whenToDo: [
    'Khi mua nhà / có tài sản đáng kể tại Nhật — bắt đầu chuẩn bị di chúc.',
    'Khi kết hôn / có con — cập nhật người thừa kế.',
    'Khi ly hôn / tái hôn — cập nhật di chúc.',
    'Khi sức khỏe xấu / có chẩn đoán bệnh nguy hiểm — chuẩn bị gấp.',
    'Sau 60 tuổi — định kỳ kiểm tra di chúc 5 năm/lần.',
    'Khi luật Nhật / Việt Nam có thay đổi lớn (luật thừa kế VN sửa 2015, luật thuế thừa kế Nhật reform 2023) — kiểm tra di chúc còn phù hợp.',
    '**Khi người thân mất**:\n• Ngày 1: gọi cấp cứu / bệnh viện cấp 死亡診断書 (giấy chứng tử y tế).\n• Trong 7 ngày: nộp 死亡届 tại 市役所 + xin 火葬許可書.\n• Trong 14 ngày: làm tang lễ (火葬 ở Nhật phổ biến, 土葬 hiếm).\n• Trong 1 tháng: liệt kê tài sản + tìm di chúc nếu có + thông báo Đại sứ quán VN.\n• Trong 3 tháng: quyết định 単純承認 / 限定承認 / 相続放棄.\n• Trong 4 tháng: 準確定申告 (税務署).\n• Trong 10 tháng: 相続税申告 + nộp thuế.',
  ],
  whereToDo: [
    '**Lập di chúc**:\n• **公証役場** (mọi 都道府県 có nhiều địa điểm) — làm 公正証書遺言.\n• **Tại nhà** — viết 自筆証書遺言 (rủi ro hơn).\n• **法務局 (法務省 cấp 地方)** — gửi 自筆証書遺言 vào 自筆証書遺言保管制度 (chính sách 2020 mới — giảm rủi ro mất / chỉnh).',
    '**Xử lý sau khi mất**:\n• **市役所/区役所** — 死亡届 + 火葬許可書.\n• **税務署** — 相続税申告 (cấp 地方).\n• **法務局** — đăng ký 不動産 sang tên (sau khi xong chia thừa kế).\n• **ngân hàng từng nơi** — giải quyết tài khoản.\n• **Đại sứ quán/Tổng lãnh sự VN ở Nhật** — giấy tờ VN + thông báo thân nhân.',
    '**Tư vấn chuyên môn**:\n• **弁護士** chuyên 相続 — tranh chấp + di chúc phức tạp + cross-border.\n• **司法書士** — đăng ký 不動産 + di chúc đơn giản.\n• **税理士** chuyên 相続税 — kê khai + tối ưu thuế.\n• **行政書士** — chuẩn bị hồ sơ.\n• **公証人** ở 公証役場 — soạn 公正証書.',
    '**Hỗ trợ tài chính**:\n• **法テラス** 0570-078374 — tư vấn pháp lý miễn phí cho thu nhập thấp (xem houterasu guide).\n• **弁護士会** mỗi 都道府県 — 相続専門相談.',
  ],
  estimatedTime:
    '**Lập 自筆証書遺言**: 1–4 giờ tự viết tại nhà (cần đầy đủ tay viết + dấu/印鑑 — quy định 民法 968 strict). **Lập 公正証書遺言**: 1–2 tuần (chuẩn bị hồ sơ) + 1 buổi tại 公証役場 (~1 giờ). **Xử lý thừa kế sau khi mất**: 6 tháng – 2 năm tổng (đăng ký 不動産 + chia tài sản + nộp thuế). **相続税 申告**: hoàn tất trong 10 tháng. **Tranh chấp tòa**: 1–5 năm.',
  fees: [
    '**Lập di chúc**:\n• 自筆証書遺言 tự viết: 0円 (nhưng rủi ro tự sai).\n• 自筆証書遺言保管制度 (法務局): 3,900円/đăng ký.\n• 公正証書遺言 tại 公証役場: phụ thuộc giá trị tài sản:\n  - Tài sản 1 triệu yên: 5,000円.\n  - Tài sản 10 triệu yên: 17,000円.\n  - Tài sản 100 triệu yên: 43,000円.\n  - Tài sản 1 tỷ yên: 240,000円+.\n• Soạn di chúc qua 弁護士 / 司法書士: 50,000–500,000円 tùy phức tạp.\n• 行政書士 soạn草案: 30,000–80,000円.',
    '**相続税** (inheritance tax):\n• 基礎控除 (deduction cơ bản): 30,000,000円 + 6,000,000円 × số người thừa kế theo luật.\n• Vd: vợ + 2 con = 30,000,000 + 18,000,000 = 48,000,000円 miễn thuế.\n• Vượt trên → thuế suất bậc thang:\n  - <10 triệu vượt: 10%.\n  - 10–30 triệu vượt: 15%.\n  - 30–50 triệu vượt: 20%.\n  - 50–100 triệu vượt: 30%.\n  - 100–200 triệu vượt: 40%.\n  - 200 triệu – 3 tỷ vượt: 45%.\n  - 3 tỷ – 6 tỷ vượt: 50%.\n  - >6 tỷ vượt: 55%.\n• Có 配偶者控除 (giảm cho vợ/chồng) — hầu như không phải trả nếu phần dưới 160 triệu yên.\n• Cải cách 2023–2024 ảnh hưởng 贈与税 (thuế tặng cho lúc sống) — chuyển sang 相続時精算課税 mặc định cho một số trường hợp.',
    '**Phí thuê 税理士 cho 相続税申告**: 0.5–1.5% giá trị di sản (vd 100 triệu yên → 500,000–1,500,000円).',
    '**Phí 弁護士 cho tranh chấp**:\n• 着手金: 8.8% giá trị tranh chấp (theo 旧 報酬規程 tham khảo) — đa số bây giờ thương lượng riêng.\n• 成功報酬: 17.6% giá trị thực tế nhận.\n• Tổng: 1–10 triệu yên cho tranh chấp trung.',
    '**Phí đăng ký 不動産 sang tên**: 登録免許税 0.4% giá trị + 司法書士 5–10万円.',
    'Phí thay đổi — kiểm tra với chuyên gia.',
  ],
  documentsChecklist: [
    { label: '戸籍謄本 (Việt Nam)', required: true, note: 'Hộ khẩu / giấy xác nhận quan hệ — dịch tiếng Nhật + apostille / công chứng VN.' },
    { label: 'Hộ chiếu của người làm di chúc', required: true, note: 'Bản gốc + bản sao.' },
    { label: '在留カード', required: true, note: 'Xác minh tư cách cư trú.' },
    { label: '住民票', required: true, note: 'Lấy tại 市役所.' },
    { label: '印鑑証明書', required: true, note: 'Cho 公正証書 — đăng ký 実印 tại 市役所.' },
    { label: '財産目録', required: true, note: 'Liệt kê đầy đủ tài sản + nợ.' },
    { label: '不動産登記簿謄本', required: false, note: 'Nếu có bất động sản — lấy tại 法務局.' },
    { label: '預金通帳 / 残高証明書', required: false, note: 'Cho 公正証書 — bằng chứng tài khoản.' },
    { label: 'Tên + ngày sinh + 続柄 người thừa kế', required: true, note: 'Có nguồn gốc 戸籍 VN xác minh.' },
    { label: 'Bằng chứng quan hệ với người thừa kế nước ngoài', required: false, note: 'Vd: 結婚証明書, 出生証明書 — dịch + công chứng.' },
    { label: '2 nhân chứng (cho 公正証書)', required: false, note: 'KHÔNG được là người thừa kế / cha mẹ / con / vợ/chồng — 公証役場 có thể giới thiệu nhân chứng có phí.' },
  ],
  commonMistakes: [
    'Tin "luật Nhật áp dụng cho thừa kế của tôi" → SAI cho công dân VN. 通則法 đ.36 — luật quốc tịch người chết (luật VN). Phần thuế áp dụng luật Nhật.',
    'Tự viết 自筆証書遺言 mà thiếu yêu cầu (toàn bộ tay viết, ngày, ký, 印鑑) → 民法 968 strict — vô hiệu nếu sai.',
    'Đánh máy 自筆証書遺言 → vô hiệu (trừ phần kê tài sản 2019 cải cách cho phép đánh máy).',
    'Không có nhân chứng cho 公正証書 → cần 2 nhân chứng KHÔNG phải người thừa kế.',
    'Quên 3 tháng deadline 相続放棄 → tự động kế thừa cả nợ.',
    'Quên 10 tháng deadline 相続税 → phạt 5–20% + lãi.',
    'Tin "đến Đại sứ quán VN làm di chúc là đủ" → Có thể có hiệu lực với luật VN nhưng phải xem hình thức có hợp lệ theo luật Nhật khi tài sản ở Nhật.',
    'Không liệt kê đầy đủ tài sản → người thừa kế bỏ sót → tranh chấp sau.',
    'Lưu di chúc ở nơi gia đình không tìm thấy → có như không.',
    'Đặt 2 người (vợ + con) cùng 遺言執行者 (người thi hành) mà không quy định ưu tiên → tranh chấp sau.',
    'Tin "vợ tự động nhận hết" → Theo luật VN có thể không. Đặc biệt nếu có con riêng / cha mẹ chồng.',
    'Bỏ qua 遺留分 (forced share) → di chúc cố tình loại trừ con / vợ → có thể bị kiện đòi 遺留分減殺請求.',
    'Mua bảo hiểm 死亡保険金 mà ghi 受取人 sai → tiền không đến đúng người.',
    'Không thông báo Đại sứ quán VN khi người thân chết → giấy tờ VN khó xử lý.',
    'Tin "tài sản ở VN không phải khai báo ở Nhật" → SAI nếu cư trú dài hạn ở Nhật. Cải cách thuế 2017+2021 — tài sản toàn cầu có thể tính.',
  ],
  faq: [
    {
      question: 'Tôi là công dân VN sống ở Nhật. Khi tôi mất, luật nào áp dụng cho thừa kế?',
      answer:
        '**Luật dân sự (heirs + phần chia)**: theo Luật 通則法 đ.36 — **luật quốc tịch người chết**. Tức là **LUẬT VIỆT NAM** (Bộ luật Dân sự VN 2015 Chương XX về thừa kế).\n\n**Có ngoại lệ renvoi**: nếu luật VN dẫn ngược về luật Nhật (vd: với tài sản 不動産 tại Nhật) → áp dụng luật Nhật. Phân tích này phức tạp — cần 弁護士 cross-border.\n\n**Hình thức di chúc**: linh hoạt theo 遺言の方式の準拠法に関する法律 (1964) — di chúc hợp lệ nếu đáp ứng 1 trong:\n• Luật quốc tịch người lập (VN).\n• Luật nơi cư trú thường xuyên (Nhật).\n• Luật nơi lập di chúc.\n• Luật nơi tài sản (cho bất động sản).\n\n**Thuế thừa kế (相続税)**: theo **LUẬT NHẬT** — không liên quan luật VN.\n\n**Bạn có 2 lựa chọn về hình thức**:\n• **Di chúc kiểu Nhật**: 自筆証書 / 公正証書 / 秘密証書 — quy chuẩn theo 民法 Nhật.\n• **Di chúc kiểu VN**: theo Bộ luật Dân sự VN — di chúc bằng văn bản có công chứng / chứng thực.\n\n**Khuyến nghị**: Làm **公正証書遺言** ở Nhật với 公証役場 — chắc chắn nhất + dễ thi hành nếu tài sản ở Nhật. Hoặc làm di chúc kép (1 ở Nhật + 1 ở VN) nếu tài sản 2 nơi — cần 弁護士 phối hợp.',
    },
    {
      question: 'Vợ tôi là người Nhật. Khi tôi mất (công dân VN), vợ tôi nhận được gì?',
      answer:
        '**Phức tạp** — luật áp dụng có thể đan xen:\n\n**Luật dân sự**: theo 通則法 đ.36 — vẫn là luật VN cho thừa kế của công dân VN.\n\n**Theo luật VN (Bộ luật Dân sự 2015)**:\n• Vợ là **hàng thừa kế thứ nhất** cùng với con + cha/mẹ người chết.\n• Phần chia: tất cả người thừa kế hàng thứ nhất chia đều.\n• Vd: vợ + 2 con + bố mẹ chồng = 5 phần đều nhau.\n\n**Theo luật Nhật (民法 887, 890, 900)** — nếu áp dụng vì có 不動産 Nhật:\n• 法定相続分:\n  - Vợ + con: vợ 1/2 + con chia phần 1/2 còn lại.\n  - Vợ + cha/mẹ người chết: vợ 2/3 + cha/mẹ 1/3.\n  - Vợ + anh/chị/em: vợ 3/4 + a/c/e 1/4.\n• Vợ luôn là người thừa kế.\n\n**Khác biệt lớn**: luật VN chia đều, luật Nhật cho vợ phần ưu tiên hơn.\n\n**Thực tế cross-border**:\n• Cần 弁護士 phân tích từng tài sản (Nhật → Nhật law có thể áp dụng).\n• Phối hợp với 弁護士 VN cho tài sản ở VN.\n• Tốt nhất: **lập di chúc rõ ràng** thay vì để 法定相続.\n\n**Thuế thừa kế Nhật**:\n• Vợ Nhật có 配偶者控除 — hầu như không phải trả nếu phần dưới 160 triệu yên.\n• Vợ Nhật + con Nhật → 基礎控除 = 30 triệu + 6 triệu×N.',
    },
    {
      question: '自筆証書遺言 vs 公正証書遺言 — nên chọn cái nào?',
      answer:
        '**自筆証書遺言 (handwritten will)**:\n\n**Yêu cầu pháp lý cứng (民法 968)**:\n• **Toàn bộ tay viết** (đánh máy = vô hiệu, trừ phần kê tài sản 2019 cải cách).\n• Ghi **ngày tháng năm** đầy đủ.\n• **Ký tên** (mỗi trang).\n• **Đóng dấu (印鑑)** — 認印 OK cho luật, nhưng tốt là 実印.\n\n**Ưu**:\n• Miễn phí.\n• Bí mật (không ai biết nội dung).\n• Linh hoạt, sửa được.\n\n**Nhược**:\n• **Rủi ro sai form** → vô hiệu hóa.\n• Có thể bị mất / sửa / hủy bởi người thừa kế không thiện chí.\n• Khi mở phải qua 検認 (家庭裁判所 thẩm tra) — chậm 1–2 tháng.\n• Tranh chấp dễ xảy ra.\n\n**自筆証書遺言保管制度** (2020 mới):\n• Gửi 自筆証書 vào 法務局 — 3,900円.\n• Lưu trữ chính thức, KHÔNG cần 検認.\n• Vẫn là 自筆証書 nhưng giảm rủi ro.\n\n**公正証書遺言 (notarized will)**:\n\n**Quy trình**:\n• Đến 公証役場 với hồ sơ.\n• 公証人 (notary) soạn theo lời bạn.\n• 2 nhân chứng đứng cùng.\n• 公証人 đọc lại, bạn xác nhận.\n• Ký + 実印.\n\n**Ưu**:\n• **Cực kỳ chắc chắn** — không bị nghi vô hiệu.\n• **KHÔNG cần 検認** — mở ngay khi chết.\n• Bản gốc lưu tại 公証役場 — không sợ mất.\n\n**Nhược**:\n• Phí (5,000–240,000円+ tùy giá trị).\n• Không bí mật (公証人 + 2 nhân chứng biết).\n• Khó sửa (phải làm lại).\n\n**Khuyến nghị cho người Việt sống ở Nhật**:\n\n• **Tài sản đáng kể (>10 triệu yên)** → **公正証書遺言** (đáng đầu tư phí 17,000–43,000円 để tránh tranh chấp).\n• **Tài sản nhỏ + gia đình hòa thuận** → 自筆証書 + 保管制度 (3,900円) đủ.\n• **Tình huống đặc biệt (vợ trước/con riêng/tranh chấp)** → **CHẮC CHẮN 公正証書**.\n• **Người không biết tiếng Nhật đủ** → 公正証書 với thông dịch / có 弁護士 cùng.\n\n**秘密証書遺言** (rare): hiếm dùng — phức tạp + ít lợi.',
    },
    {
      question: 'Người thân tôi vừa mất ở Nhật. Tôi phải làm gì 30 ngày đầu?',
      answer:
        'Lộ trình chuẩn 30 ngày:\n\n**Ngày 1**:\n• Gọi cấp cứu 119 (nếu chưa đến viện) hoặc thông báo bệnh viện.\n• Nhận **死亡診断書** (giấy chứng tử y tế) từ bác sĩ — bản gốc + nhiều bản sao (sẽ cần nhiều).\n• Liên hệ Đại sứ quán/Tổng lãnh sự VN (nếu công dân VN).\n• Bàn với gia đình về tang lễ (Nhật phổ biến 火葬, đa số trong 1–7 ngày).\n\n**Ngày 2–7**:\n• **死亡届** + 火葬許可申請 tại 市役所/区役所:\n  - Mang 死亡診断書 + 印鑑 của người báo + 戸籍 / 在留カード người chết.\n  - Miễn phí.\n  - Nhận lại **死亡届出記載事項証明書** + **火葬許可書**.\n• Đặt tang lễ 葬儀社 (chi phí 500,000–3,000,000円).\n• Hỏa táng (火葬) tại 火葬場.\n• Nhận tro (骨壷) — quyết định chôn ở Nhật (墓地) hay đưa về VN.\n\n**Tuần 2**:\n• Liên hệ Đại sứ quán VN:\n  - Báo tử người Việt mất ở Nhật.\n  - Xin giấy phép vận chuyển tro về VN nếu cần.\n  - Cập nhật 戸籍 VN.\n• Báo công ty người chết:\n  - 退職金 / 死亡退職金.\n  - 給与 chưa nhận.\n  - 弔慰金 nếu công ty có.\n\n**Tuần 3–4**:\n• **Tìm di chúc**: kiểm tra nhà + 公証役場 (qua trang 検索 toàn quốc) + 法務局 (cho 自筆証書保管制度).\n• **Liệt kê tài sản** (財産調査):\n  - Ngân hàng từng nơi: yêu cầu 残高証明書.\n  - 不動産: 法務局 cấp 登記簿謄本.\n  - 株式 / 投資: chứng nhận từ 証券会社.\n  - 退職金 / 年金: 会社 / 年金事務所.\n  - 生命保険: 保険会社.\n• **Liệt kê nợ**:\n  - 銀行 hỏi vay còn nợ.\n  - 不動産 thế chấp.\n  - 信用卡 nợ chưa trả.\n  - Người cho vay tư nhân.\n• Báo các 金融機関 đóng băng tài khoản tạm (tránh người khác rút).\n\n**Trước 3 tháng (sau khi mất)**:\n\n• Quyết định:\n  - **単純承認** (kế thừa cả tài sản + nợ) — KHÔNG cần làm gì, tự động.\n  - **限定承認** (chỉ kế thừa tài sản đến mức nợ) — nộp 家庭裁判所.\n  - **相続放棄** (từ chối tất cả) — nộp 家庭裁判所.\n• Nếu nợ > tài sản → 相続放棄 (mất luôn nhà / xe).\n\n**Quan trọng**:\n• Đừng tự ý chia tài sản trước khi xong quy trình.\n• Đừng tự ý nhập rút tiền lớn từ tài khoản người chết.\n• Lưu mọi giấy tờ.\n• Liên hệ 弁護士 sớm nếu phức tạp.',
    },
    {
      question: '相続税 (thuế thừa kế) ở Nhật cụ thể thế nào?',
      answer:
        '**Áp dụng**:\n\n• Tài sản tại Nhật của người chết.\n• Nếu người chết / người thừa kế có **居住者** (cư trú dài hạn ở Nhật >10 năm trong 15 năm) → tài sản toàn cầu (bao gồm VN) cũng tính.\n• Phức tạp — phải kiểm tra "国際相続" rules.\n\n**Quy trình**:\n\n**Bước 1**: Tính tổng giá trị di sản (税務署 評価方法 cụ thể):\n• 不動産: 路線価 (giá đất nhà nước) — thường 70–80% giá thị trường.\n• 株式: giá thị trường.\n• 預金: số dư ngày chết + lãi.\n• 生命保険金: tổng số − 500万円 × N người thừa kế (miễn).\n• 退職金: tổng số − 500万円 × N người thừa kế (miễn).\n• Đồ vật quý: 評価額.\n\n**Bước 2**: Trừ nợ + chi phí tang lễ:\n• Nợ ngân hàng.\n• Thuế chưa trả.\n• Chi phí tang lễ hợp lý (chùa, 葬儀社).\n• Phần này = **正味の遺産額**.\n\n**Bước 3**: Trừ 基礎控除:\n• **3,000万円 + 600万円 × số người thừa kế theo luật**.\n• Vd: vợ + 2 con = 4,800万円 miễn thuế.\n• Vd: vợ + 3 con = 5,400万円 miễn thuế.\n\n**Bước 4**: Áp thuế suất bậc thang lên phần vượt:\n• <1,000万円: 10%.\n• 1,000–3,000万円: 15% − 50万円.\n• 3,000–5,000万円: 20% − 200万円.\n• 5,000万円–1億: 30% − 700万円.\n• 1億–2億: 40% − 1,700万円.\n• 2億–3億: 45% − 2,700万円.\n• 3億–6億: 50% − 4,200万円.\n• >6億: 55% − 7,200万円.\n\n**Bước 5**: Áp 配偶者控除 (giảm cho vợ/chồng):\n• Vợ/chồng nhận **dưới 1.6億円 HOẶC dưới 法定相続分** → KHÔNG phải trả.\n• Vợ/chồng nhận trên → trả phần vượt.\n\n**Bước 6**: Nộp 申告 + 納税 trong 10 tháng.\n\n**Ví dụ thực tế**:\n• Người chết để lại 1.5億円 di sản (1 căn nhà 8000万 + tiền gửi 7000万).\n• Người thừa kế: vợ + 1 con.\n• 基礎控除: 3,000万 + 600万×2 = 4,200万.\n• Chịu thuế: 1.5億 − 4,200万 = 10,800万円.\n• Vợ nhận 1/2 = 5,400万 (dưới 1.6億 → KHÔNG đóng).\n• Con nhận 5,400万 → chịu thuế 5,400万 × 20% − 200万 = 880万円.\n\n**Khuyến cáo**: Trên 1億円 → bắt buộc 税理士 chuyên 相続. Phí 50万円+ nhưng tiết kiệm thuế lớn.',
    },
    {
      question: '遺留分 (forced share) là gì? Tôi có thể loại trừ con khỏi di chúc không?',
      answer:
        '**遺留分** (Forced Share / mandatory minimum) là phần thừa kế **luật bảo vệ** cho một số người thừa kế — KHÔNG thể loại trừ hoàn toàn bằng di chúc.\n\n**Theo luật Nhật (民法 1042)**:\n\n• **遺留分 áp dụng cho**: vợ/chồng, con, cha/mẹ (người thừa kế thẳng — `直系尊属`).\n• **遺留分 KHÔNG áp dụng cho**: anh/chị/em.\n\n• **Mức 遺留分**:\n  - Khi chỉ có cha/mẹ thừa kế: 1/3 phần thường được nhận theo luật.\n  - Khi khác (có vợ/chồng/con): **1/2 phần thường được nhận theo luật**.\n\n**Ví dụ**:\n• Di chúc cho người ngoài 100% → vợ + 2 con bị loại trừ.\n• 法定相続分: vợ 1/2, mỗi con 1/4.\n• 遺留分: vợ 1/4 (1/2 của 1/2), mỗi con 1/8 (1/2 của 1/4).\n• Vợ + con có thể yêu cầu **遺留分侵害額請求** (kiện đòi) trong 1 năm sau khi biết di chúc.\n\n**Theo luật VN** (Bộ luật Dân sự 2015 đ.644):\n• 遺留分 = "Người thừa kế không phụ thuộc nội dung di chúc".\n• Cha/mẹ + vợ/chồng + con chưa thành niên + con đã thành niên không có khả năng lao động → nhận 2/3 phần thừa kế nếu chia theo luật.\n• Tương đương 遺留分 Nhật nhưng phạm vi rộng hơn.\n\n**Thực tế**:\n• Bạn có thể giảm phần con qua di chúc — nhưng không loại trừ hoàn toàn.\n• Con có quyền kiện đòi 遺留分.\n• Tốt nhất: nói chuyện với gia đình + soạn di chúc công bằng.\n\n**Loại trừ pháp lý chỉ có thể qua**:\n• **廃除** (民法 892): có hành vi nghiêm trọng (bạo lực với người chết, không xứng đáng) — phải xin tòa.\n• **相続欠格** (民法 891): giết / che giấu tội — tự động mất quyền.\n• Đây là trường hợp rất hiếm, cần luật sư.',
    },
  ],
  counterPhrases: [
    {
      jp: '遺言を作りたいです。',
      romaji: 'Yuigon o tsukuritai desu.',
      vn: 'Tôi muốn lập di chúc.',
      note: 'Câu mở đầu tại 公証役場 / 弁護士事務所.',
    },
    {
      jp: '公正証書遺言の手続きを教えてください。',
      romaji: 'Kousei shousho yuigon no tetsuzuki o oshiete kudasai.',
      vn: 'Cho tôi biết thủ tục lập di chúc công chứng.',
      note: 'Tại 公証役場.',
    },
    {
      jp: '相続税の申告について相談したいです。',
      romaji: 'Souzokuzei no shinkoku ni tsuite soudan shitai desu.',
      vn: 'Tôi muốn tư vấn về kê khai thuế thừa kế.',
      note: 'Tại 税理士事務所 / 税務署.',
    },
    {
      jp: '相続放棄の手続きをしたいです。',
      romaji: 'Souzoku houki no tetsuzuki o shitai desu.',
      vn: 'Tôi muốn làm thủ tục từ chối thừa kế.',
      note: 'Tại 家庭裁判所 — trong 3 tháng sau khi biết.',
    },
    {
      jp: '財産目録を作ってもらえますか。',
      romaji: 'Zaisan mokuroku o tsukutte moraemasu ka.',
      vn: 'Có thể giúp tôi làm danh sách tài sản không?',
      note: 'Tại 弁護士 / 司法書士.',
    },
    {
      jp: 'ベトナム国籍ですが、日本で相続の手続きができますか。',
      romaji: 'Betonamu kokuseki desu ga, Nihon de souzoku no tetsuzuki ga dekimasu ka.',
      vn: 'Tôi quốc tịch Việt Nam, có thể làm thủ tục thừa kế ở Nhật không?',
      note: 'Mở đầu khi tư vấn cross-border.',
    },
    {
      jp: '通訳をお願いできますか。',
      romaji: 'Tsuuyaku o onegai dekimasu ka.',
      vn: 'Có thể có phiên dịch không?',
      note: '公証役場 / 弁護士 — một số có phiên dịch tiếng Việt qua dịch vụ.',
    },
    {
      jp: '法テラスに相談したいです。',
      romaji: 'Houterasu ni soudan shitai desu.',
      vn: 'Tôi muốn tư vấn qua 法テラス (miễn phí).',
      note: 'Cho người thu nhập thấp — xem houterasu guide.',
    },
  ],
  officialLinks: [
    { label: '法務省 (MOJ) — 相続', url: 'https://www.moj.go.jp/' },
    { label: '法務省 — 自筆証書遺言保管制度', url: 'https://www.moj.go.jp/MINJI/minji05_00184.html' },
    { label: '法テラス — 法律支援', url: 'https://www.houterasu.or.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Quyết định: cần di chúc hay không?',
      description:
        '**Khi nào CẦN di chúc** (đặc biệt cho người Việt ở Nhật):\n\n• Có tài sản đáng kể ở Nhật (>10 triệu yên).\n• Có nhà / bất động sản.\n• Có vợ/chồng quốc tịch khác.\n• Có con (nhất là con riêng / con song quốc tịch).\n• Có cha/mẹ già còn sống.\n• Có doanh nghiệp / 個人事業.\n• Muốn phân phối khác với 法定相続分 luật VN/Nhật.\n• Có tranh chấp tiềm năng giữa người thừa kế.\n• Sức khỏe xấu / có chẩn đoán nguy hiểm.\n\n**Khi KHÔNG nhất thiết**:\n\n• Tài sản nhỏ (<3 triệu yên) + gia đình hòa thuận.\n• Chỉ có 1 người thừa kế duy nhất.\n• Đã có 法定相続 phù hợp với ý muốn.\n\n**Cảnh báo**: KHÔNG có di chúc → luật quốc tịch người chết (luật VN cho công dân VN) áp dụng strict — có thể không phù hợp với ý muốn.\n\n**Quy trình quyết định**:\n\n1. Liệt kê tài sản + nợ ước tính.\n2. Liệt kê người thừa kế dự kiến (theo luật VN + ý muốn).\n3. Tính khả năng tranh chấp.\n4. Quyết định: tự viết / 公正証書 / không.',
      documents: [],
      tip: 'Đặc biệt người Việt có vợ/chồng Nhật + con song quốc tịch — luôn nên có di chúc rõ ràng.',
    },
    {
      step: 2,
      title: 'Chuẩn bị hồ sơ — 財産目録 + người thừa kế',
      description:
        '**財産目録 (Danh sách tài sản)**:\n\n• **Tài sản ở Nhật**:\n  - 不動産: địa chỉ + 登記簿謄本 từ 法務局.\n  - 預金: tên ngân hàng + số tài khoản + số dư ước tính.\n  - 株式 / 投資信託: 証券会社 + số chứng khoán.\n  - 退職金 dự kiến: 会社 ghi rõ.\n  - 生命保険: 保険会社 + 受取人.\n  - Xe: 車検証.\n  - Đồ giá trị: jewelry, đồng hồ, đồ cổ.\n\n• **Tài sản ở VN**:\n  - Nhà / đất.\n  - Tiền gửi ngân hàng VN.\n  - Cổ phiếu / kinh doanh.\n  - Bằng khoán phương tiện.\n\n• **Nợ**:\n  - Vay ngân hàng (Nhật + VN).\n  - Thẻ tín dụng còn dư nợ.\n  - Nhà thế chấp.\n  - Người cho vay tư.\n\n**Người thừa kế dự kiến**:\n\n• Theo luật VN (Bộ luật Dân sự đ.651): hàng thừa kế:\n  - Hàng 1: vợ/chồng, con, cha/mẹ.\n  - Hàng 2: ông/bà, anh/chị/em.\n  - Hàng 3: chú/bác/cô/dì.\n\n• **Tự quyết định**: có thể chọn bất kỳ người nào — nhưng phải tôn trọng 遺留分 (Khoản 2/3 phần luật cho người thừa kế không phụ thuộc di chúc).\n\n• Liệt kê:\n  - Tên đầy đủ.\n  - Ngày sinh.\n  - Quan hệ.\n  - Quốc tịch.\n  - Địa chỉ hiện tại.\n\n**Giấy tờ chứng minh quan hệ**:\n\n• 戸籍謄本 VN (hộ khẩu).\n• 結婚証明書.\n• 出生証明書 của con.\n• Dịch tiếng Nhật + apostille / công chứng VN.\n\n**Quan trọng**:\n\n• Cập nhật danh sách định kỳ (5 năm/lần hoặc khi có sự kiện lớn).\n• Lưu ở nơi gia đình biết.\n• Có thể bí mật nội dung nhưng danh sách tài sản nên minh bạch.',
      documents: ['財産目録', '戸籍謄本 + dịch', 'Sổ tài khoản + giấy tờ nhà', 'Hồ sơ người thừa kế'],
      tip: 'Liệt kê đầy đủ — bao gồm cả tài khoản nhỏ / app fintech. Người thừa kế dễ bỏ sót.',
    },
    {
      step: 3,
      title: 'Lập di chúc — chọn loại + làm',
      description:
        '**A. 自筆証書遺言** (tự viết):\n\n**Quy tắc cứng** (民法 968):\n• **Toàn bộ TAY VIẾT** (đánh máy = vô hiệu).\n• Ngoại lệ 2019: phần kê tài sản có thể đánh máy nếu ký + 印鑑 từng trang.\n• Ghi **ngày tháng năm** đầy đủ (vd 令和8年5月14日, không "May 2026").\n• **Ký tên** đầy đủ.\n• **Đóng dấu (印鑑)** — 認印 OK, 実印 tốt hơn.\n\n**Cấu trúc khuyến nghị**:\n```\n遺言書\n\n第1条 私は、私の所有する全ての財産を次のとおり相続させる。\n（１）東京都[地址]の不動産を、妻[tên]に相続させる。\n（２）[銀行] [支店]の預金（口座番号[số]）を、長男[tên]に相続させる。\n[...]\n\n第2条 遺言執行者として、[tên + 関係]を指定する。\n\n令和[年]年[月]月[日]日\n\n[Tên đầy đủ tay viết]\n[印鑑]\n```\n\n**Lưu trữ**:\n• Tại nhà — rủi ro mất.\n• **自筆証書遺言保管制度 (法務局)** — 3,900円, lưu chính thức.\n\n**B. 公正証書遺言** (notarized):\n\n**Quy trình**:\n\n1. Đặt hẹn 公証役場 (có ở mỗi 都道府県, search "Tên 市町村 + 公証役場").\n2. Gửi trước: 財産目録, người thừa kế list, ý nguyện chia.\n3. 公証人 soạn draft → gửi bạn xem.\n4. Hẹn ngày đến với **2 nhân chứng** (KHÔNG phải người thừa kế / cha mẹ / con / vợ/chồng):\n   - Có thể nhờ 弁護士 + 司法書士 / nhân viên 公証役場 (có phí).\n5. Tại 公証役場:\n   - Mang: 印鑑証明書 + 実印 + パスポート + 在留カード.\n   - 公証人 đọc lại di chúc.\n   - Bạn xác nhận đúng ý.\n   - Bạn + 2 nhân chứng + 公証人 ký + đóng dấu.\n6. Bản gốc lưu tại 公証役場 (không sợ mất).\n7. Bạn nhận bản 正本 + 謄本.\n\n**Phí** (theo giá trị tài sản — xem fees).\n\n**Cho người không biết tiếng Nhật**:\n• Có thể yêu cầu 通訳 (thông dịch) trong buổi lập di chúc.\n• 公証役場 không cấp thông dịch — phải tự thuê.\n• Khuyến nghị: 弁護士 chuyên cross-border + thông dịch.\n\n**C. 秘密証書遺言** (hiếm dùng) — phức tạp + ít lợi, bỏ qua.',
      documents: ['財産目録', '戸籍 + 印鑑証明書', 'Bản dự thảo'],
      tip: 'Tài sản >10 triệu yên → CHẮC CHẮN 公正証書. Phí 17,000–43,000円 đáng tránh tranh chấp về sau.',
    },
    {
      step: 4,
      title: 'Khi người thân mất — Xử lý trong 3 tháng đầu (KEY)',
      description:
        '**Tuần 1 (Day 0–7)**:\n\n• Gọi cấp cứu / liên hệ bệnh viện.\n• Lấy 死亡診断書 (giấy chứng tử y tế).\n• **死亡届** tại 市役所 trong 7 ngày — miễn phí, mang giấy + 印鑑 người báo.\n• Nhận 火葬許可書.\n• Tang lễ + hỏa táng.\n• Báo Đại sứ quán VN (nếu công dân VN).\n\n**Tuần 2–3**:\n\n• Báo công ty / cơ quan người chết:\n  - 退職金 / 死亡退職金.\n  - 給与 chưa nhận.\n  - 弔慰金.\n• Báo ngân hàng đóng băng tài khoản (tránh tranh chấp).\n• Liên hệ 生命保険 yêu cầu chi trả 保険金.\n\n**Tuần 4–8**:\n\n• **Tìm di chúc**:\n  - Tại nhà / két sắt.\n  - **公証役場 検索**: search toàn quốc qua 公証連合会 — nhân thân yêu cầu (mang 戸籍).\n  - **自筆証書保管制度** ở 法務局 — kiểm tra.\n• **財産調査**:\n  - 残高証明書 từng ngân hàng.\n  - 不動産: 登記簿謄本 từ 法務局.\n  - 株式: 証券会社 chứng nhận.\n  - 生命保険 / 退職金.\n\n• **Liệt kê nợ**:\n  - Hỏi 信用情報機関 (CIC / JICC / KSC) — yêu cầu mở tài khoản người chết.\n  - 不動産 thế chấp.\n\n**Trong 3 tháng (CỰC KỲ QUAN TRỌNG)**:\n\n• **Quyết định**:\n  - **単純承認**: kế thừa tài sản + nợ. KHÔNG cần làm gì — tự động.\n  - **限定承認**: kế thừa đến mức nợ. Nộp 家庭裁判所 (cả gia đình phải đồng ý).\n  - **相続放棄**: từ chối hoàn toàn. Nộp 家庭裁判所 — cá nhân mỗi người.\n\n• **Cân nhắc**:\n  - Nợ > tài sản → 相続放棄 (mất luôn tài sản nhưng không gánh nợ).\n  - Không rõ nợ → 限定承認 (an toàn).\n  - Rõ tài sản > nợ → 単純承認.\n\n• **Quá 3 tháng** không quyết định → tự động 単純承認. KHÔNG hủy được.\n\n**Ngoại lệ**: phát hiện nợ lớn sau 3 tháng → xin 家庭裁判所 cho 相続放棄 muộn với "正当な理由" — cần 弁護士 ngay.',
      documents: ['死亡診断書', '死亡届受理証明書', '戸籍 người chết + người thừa kế', '財産目録', 'Bản di chúc nếu có'],
      tip: 'Đừng để qua 3 tháng. Nếu không chắc → 相続放棄 hoặc 限定承認 để an toàn.',
    },
    {
      step: 5,
      title: 'Hoàn tất — chia tài sản + đăng ký + nộp thuế',
      description:
        '**Trong 4 tháng**:\n\n• **準確定申告** (tax return cuối cho người chết):\n  - Khai phần thuế thu nhập của người chết từ 1/1 đến ngày chết.\n  - Tại 税務署 phụ trách nhà người chết.\n  - Nếu có thu nhập trên 2 triệu / năm → bắt buộc.\n\n**Trong 10 tháng — 相続税 申告**:\n\n• **Thỏa thuận chia tài sản 遺産分割協議** (nếu có nhiều người thừa kế):\n  - Tất cả người thừa kế đồng ý phương án.\n  - Soạn 遺産分割協議書 — mỗi người ký + 実印.\n  - Đính kèm 印鑑証明書 từng người.\n  - KHÔNG có di chúc → bắt buộc 協議.\n  - Có di chúc → phần lớn theo di chúc + 遺留分 nếu có yêu cầu.\n\n• **Tính 相続税**:\n  - Tổng tài sản − nợ − tang lễ − 基礎控除 = 課税遺産総額.\n  - Áp thuế suất bậc thang.\n  - 配偶者控除 cho vợ/chồng.\n\n• **Nộp 申告 + 納税**:\n  - Tại 税務署 phụ trách nhà người chết.\n  - Hồ sơ ~30 trang.\n  - Trả thuế cash hoặc 分割 (trả góp tối đa 20 năm có lãi).\n\n• **Phí 税理士**: 0.5–1.5% tổng tài sản nếu thuê chuyên gia.\n\n**Đăng ký tài sản sang tên**:\n\n• **不動産**:\n  - 法務局 đăng ký 相続登記 — bắt buộc trong 3 năm sau khi biết (luật 2024+).\n  - Phí 登録免許税 0.4% + 司法書士 5–10万円.\n• **預金**:\n  - Ngân hàng mỗi nơi — mang giấy chứng tử + 戸籍 + 遺産分割協議書 (hoặc di chúc).\n  - Mỗi ngân hàng thủ tục khác — đợi 1–2 tuần.\n• **株式 / 投資**:\n  - 証券会社 — chuyển sang tài khoản người thừa kế.\n• **車**:\n  - 陸運局 đăng ký sang tên.\n\n**Hoàn tất**:\n\n• Tất cả tài sản sang tên trong 1–2 năm.\n• Đóng tài khoản người chết.\n• Hủy 在留カード người chết qua 入管.\n• Cập nhật 戸籍 VN qua Đại sứ quán.\n\n**Khi tranh chấp**:\n\n• Cố gắng thương lượng + 弁護士 trung gian.\n• Cuối cùng: 家庭裁判所 — 調停 (mediator) trước, 訴訟 (litigation) sau.\n• Thời gian: 6 tháng – 5 năm.\n\n**Khuyến nghị mạnh**:\n\n• Tài sản đáng kể → THUÊ 弁護士 + 税理士 chuyên 相続 cross-border ngay từ đầu.\n• Phí 1–5 triệu yên — nhưng tiết kiệm tranh chấp + thuế lớn.\n• 法テラス cho người thu nhập thấp (xem houterasu guide).',
      documents: ['遺産分割協議書', '戸籍 đầy đủ', '印鑑証明書', '相続税申告書', '登記関係書類'],
      tip: 'Đừng tự xử lý nếu phức tạp. Thừa kế cross-border (Nhật + VN) cần chuyên gia chuyên — đa số 弁護士 thường không quen với luật VN.',
    },
  ],
};

export default inheritanceWillJapanForeigners;
