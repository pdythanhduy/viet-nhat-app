import type { AdminGuide } from '../../../../types/content';

const taxOnRemittanceToVietnam: AdminGuide = {
  id: 'tax-on-remittance-to-vietnam',
  category: 'money',
  lastVerified: '2026-05-09',
  priority: 'normal',
  title: 'Gửi tiền về Việt Nam — thuế và quy định',
  titleJp: 'ベトナムへの送金 — 税金とルール',
  icon: 'send-outline',
  color: '#C0392B',
  description:
    'Gửi tiền về Việt Nam liên quan **2 hệ thống pháp luật + thuế**: phía Nhật (国税庁 + 財務省 + 日本銀行 quy định) và phía Việt Nam (hải quan, ngân hàng nhà nước, thuế thu nhập cá nhân nếu có). Phía Nhật có ngưỡng báo cáo 100万円/giao dịch (国外送金等調書). Phía Việt Nam có quy định riêng về kiểm tra nguồn tiền + thuế nếu nguồn tiền chưa khai thuế. **CẢNH BÁO**: tài liệu này chỉ là tham khảo. Luật thuế quốc tế phức tạp + thay đổi — luôn hỏi 税理士 hoặc luật sư cho trường hợp cụ thể.',
  searchKeywords: [
    'gửi tiền về Việt Nam',
    'remittance Vietnam',
    'kokusai sokin',
    'thuế gửi tiền',
    'báo cáo giao dịch',
    '国外送金等調書',
    '100万円ルール',
    '租税条約',
    'tax treaty',
    'Wise',
    'Remitly',
    'MoneyGram',
    '楽天銀行海外送金',
    'SMBC海外送金',
    'SBI Remit',
    'OFX',
    'WorldRemit',
    'gửi tiền lậu',
    'rửa tiền',
    '為替手数料',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      '**Phía Nhật**: 外国為替及び外国貿易法 + 国税通則法. Ngưỡng báo cáo 100万円/giao dịch (国外送金等調書) do 国税庁 thu thập. Một số trường hợp ngưỡng thấp hơn cho mục đích AML (Anti-Money Laundering). **Phía Việt Nam**: pháp lệnh ngoại hối + Nghị định ngân hàng nhà nước + Luật thuế thu nhập cá nhân. Hai bên hệ thống KHÔNG đồng bộ — cùng số tiền có thể có yêu cầu khác nhau ở 2 nước. **Hiệp định tránh đánh thuế hai lần Nhật–Việt** (ký 1995-10, có thể có nghị định thư sửa đổi sau đó — kiểm tra ngày hiệu lực bản hiện hành với 国税庁 hoặc 税理士) áp dụng cho thuế thu nhập, nhưng chi tiết phức tạp. Đây KHÔNG phải tư vấn thuế cá nhân — hỏi 税理士 chuyên về quốc tế hoặc luật sư.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'high',
    whenToAskExpert: [
      'Gửi >100万円/giao dịch hoặc >300万円 tích lũy trong năm — tìm 税理士 chuyên về quốc tế.',
      'Tiền gửi từ nguồn không phải lương Nhật (vd lãi đầu tư, bán bất động sản, thừa kế) — phức tạp về thuế nguồn.',
      'Nhận tiền lớn ở VN bị hỏi nguồn — luật sư VN tư vấn về thuế thu nhập cá nhân + chứng minh nguồn tiền.',
      'Bị từ chối giao dịch / tài khoản đông cứng — có thể là AML investigation. Liên hệ ngân hàng + luật sư ngay.',
      'Nghi nhận tin nhắn / cuộc gọi mạo danh "国税庁 / 財務省" yêu cầu thanh toán — KHÔNG trả lời, đó là scam.',
    ],
  },
  quickAction: {
    deadline:
      'Không có deadline cứng cho 1 lần gửi. Tuy nhiên: 国外送金等調書 (báo cáo 国税庁) áp dụng ngay khi giao dịch >100万円. Theo dõi tổng tích lũy năm — có thể có yêu cầu khai 確定申告 nếu nguồn tiền có thuế chưa đóng.',
    office:
      'Dịch vụ gửi tiền: ngân hàng Nhật (SMBC, MUFG, Mizuho), ngân hàng online (楽天銀行, ソニー銀行), dịch vụ chuyên (Wise, Remitly, SBI Remit, OFX, WorldRemit, MoneyGram). Mỗi nơi phí + tỷ giá khác. **Phía Nhật khai thuế**: 確定申告 tại 税務署 nếu cần. **Phía Việt Nam**: Cục thuế / hải quan / ngân hàng nhà nước.',
    doNow: [
      'TRƯỚC khi gửi: tổng kết nguồn tiền (lương, lãi đầu tư, bán đồ, vay, etc.) — chuẩn bị chứng minh nguồn nếu có ai hỏi.',
      'So sánh dịch vụ: phí + tỷ giá + tốc độ. Wise / SBI Remit thường rẻ + nhanh hơn ngân hàng truyền thống.',
      'Nếu lần đầu / số lớn: gọi dịch vụ trước hỏi giấy tờ (在留カード + 在留資格 phù hợp + chứng minh nguồn tiền).',
      'Gửi qua kênh hợp pháp + có biên nhận. KHÔNG dùng kênh "đen" / không chính thức (vd nhờ người mang tiền mặt) — vi phạm cả 2 bên + rủi ro mất tiền + bị điều tra.',
      'Lưu mọi biên nhận + chứng từ ít nhất 7 năm — phòng khi 国税庁 hoặc cục thuế VN audit.',
    ],
    bring: [
      '在留カード + hộ chiếu',
      'Sổ ngân hàng / cash card (nguồn tiền ở Nhật)',
      'マイナンバー (12 chữ số)',
      'Thông tin tài khoản người nhận VN: tên, số tài khoản, ngân hàng, branch, SWIFT/BIC code',
      '源泉徴収票 hoặc giấy chứng minh thu nhập (cho khoản lớn)',
      'Email + số điện thoại (cho thông báo + tracking)',
    ],
    ifLate:
      'Nếu đã gửi nhiều và không khai báo đúng (vd vượt 100万円 nhưng không có 国外送金等調書 do dịch vụ): kiểm tra với 税務署 + 税理士 ngay. Khai bù nộp muộn được áp dụng trong nhiều trường hợp, nhưng có thể có 加算税. KHÔNG đợi audit — chủ động sửa.',
    officialSourceLabels: ['国税庁', '財務省'],
  },
  whoIsThisFor: [
    'Người Việt làm việc ở Nhật + gửi tiền lương về cho gia đình.',
    'Người gửi tiền lớn (>100万円) — cần biết quy định báo cáo.',
    'Người chuẩn bị về VN vĩnh viễn — chuyển tài sản dài hạn.',
    'Người gửi từ nguồn ngoài lương (đầu tư, thừa kế, bán đồ) — có rủi ro thuế.',
    'KHÔNG áp dụng cho: gửi nhỏ (<10万円) và đều đặn — quy trình đơn giản, không cần guide phức tạp này.',
  ],
  whenToDo: [
    'Trước khi gửi lần đầu hoặc lần lớn: đọc + tính.',
    'Định kỳ (3 tháng / 6 tháng): tổng kết tổng đã gửi trong năm.',
    'Cuối năm tài chính: chuẩn bị 確定申告 nếu cần khai báo nguồn tiền nước ngoài.',
    'Khi nhận tin nhắn / cuộc gọi đáng nghi từ "国税庁" / "ngân hàng" — verify trước khi trả lời.',
    'Khi sắp về VN vĩnh viễn: tham khảo trước về kế hoạch chuyển tài sản.',
  ],
  whereToDo: [
    'Ngân hàng Nhật truyền thống: SMBC, MUFG, Mizuho, ゆうちょ — phí cao nhưng an toàn cao.',
    'Ngân hàng online: 楽天銀行, ソニー銀行 — phí giảm hơn.',
    'Dịch vụ chuyên international remittance: Wise, Remitly, SBI Remit, OFX, WorldRemit, MoneyGram — thường rẻ + nhanh + tiếng Anh / một số có tiếng Việt.',
    'Ngân hàng VN nhận: Vietcombank, BIDV, Agribank, VietinBank, Sacombank, etc.',
    'KHÔNG: dịch vụ "không chính thức" / nhờ người mang tiền mặt — vi phạm pháp luật 2 nước.',
  ],
  estimatedTime:
    'Dịch vụ chuyên (Wise / SBI Remit): ~30 phút mở tài khoản lần đầu, sau đó 1–10 phút/giao dịch + 1–3 ngày tới VN. Ngân hàng truyền thống: 30 phút – 1 giờ tại quầy + 2–5 ngày tới VN.',
  fees: [
    '**Phí cố định/giao dịch + tỷ giá hối đoái** — tổng cộng quan trọng hơn từng phần riêng.',
    'Ngân hàng truyền thống: phí 4,000–8,000円/giao dịch + spread tỷ giá 2–5%. Vd gửi 100,000円 → mất 6,000–10,000円 tổng.',
    'Wise / SBI Remit / dịch vụ online: phí 500–2,000円 + spread 0.5–1%. Vd gửi 100,000円 → mất 1,500–3,000円 tổng.',
    'Tỷ giá xem trên Google "JPY to VND" hoặc xe-rate.com — đối chiếu với tỷ giá dịch vụ đưa ra.',
    'Ngân hàng VN nhận có thể trừ thêm phí ~0–200,000 VND tùy ngân hàng + tài khoản.',
    '**100万円ルール (báo cáo 国税庁)**: KHÔNG phải phí — chỉ là báo cáo. Dịch vụ tự gửi, người dùng không trả thêm.',
    '**Phí thay đổi** — kiểm tra trang chính thức của dịch vụ trước khi gửi.',
  ],
  documentsChecklist: [
    { label: '在留カード + hộ chiếu', required: true, note: 'Lần đầu mở tài khoản dịch vụ. Một số dịch vụ chấp nhận ID cards khác.' },
    { label: 'Sổ ngân hàng / cash card', required: true, note: 'Nguồn tiền ở Nhật.' },
    { label: 'マイナンバー (12 chữ số)', required: false, note: 'Một số dịch vụ yêu cầu, đặc biệt cho giao dịch lớn.' },
    { label: 'Thông tin người nhận VN', required: true, note: 'Tên đầy đủ + số tài khoản + tên ngân hàng + chi nhánh + SWIFT/BIC code.' },
    { label: '源泉徴収票 hoặc giấy thu nhập', required: false, note: 'Có thể yêu cầu cho giao dịch lớn — chứng minh nguồn tiền hợp pháp.' },
    { label: 'Hợp đồng / chứng từ nguồn tiền', required: false, note: 'Cho nguồn ngoài lương (vd hợp đồng bán đồ, sao kê đầu tư) — phòng khi 国税庁 hỏi.' },
  ],
  commonMistakes: [
    'Tin "gửi nhỏ thì không cần khai" — đúng phần nào nhưng tổng tích lũy năm có thể trigger audit. Lưu chứng từ.',
    'Dùng dịch vụ không chính thức (cá nhân chuyển hộ, kênh đen) → vi phạm cả 2 nước + có thể mất tiền + bị điều tra.',
    'Khai sai tên người nhận / sai số tài khoản → tiền có thể mắc kẹt + tốn phí lấy lại.',
    'Không lưu biên nhận → khó claim khi 国税庁 audit hoặc khi tiền chưa đến.',
    'So sánh chỉ phí cố định mà không xem tỷ giá → ngân hàng truyền thống có phí thấp giả tạo + tỷ giá xấu = tổng đắt.',
    'Gửi gấp đôi cho 1 mục đích (vd 80万円 + 80万円 thay vì 160万円) để né 100万円ルール → có thể bị nghi 構造化 (structuring), vi phạm AML.',
    'Tin tin nhắn "国税庁 / ngân hàng" yêu cầu thanh toán phí thuế khi gửi tiền → SCAM. Cơ quan thật KHÔNG dùng SMS / LINE / cuộc gọi yêu cầu chuyển khoản.',
    'Gửi nhiều mà không hiểu thuế VN bên nhận — người nhận có thể bị hỏi nguồn tiền nếu nhận lớn.',
  ],
  faq: [
    {
      question: 'Tôi gửi 50万円/tháng cho gia đình — có cần khai gì không?',
      answer:
        '50万円/tháng = 600万円/năm. Tổng cộng năm có thể trigger audit dù mỗi giao dịch dưới 100万円.\n\nLưu ý:\n• Mỗi giao dịch <100万円 → KHÔNG có 国外送金等調書 tự động.\n• NHƯNG 国税庁 vẫn có quyền yêu cầu giải trình nếu thấy bất thường.\n• Nếu nguồn tiền là LƯƠNG đã đóng thuế Nhật → không cần khai thêm. Lưu 源泉徴収票 + biên nhận giao dịch là đủ.\n• Nếu nguồn tiền KHÁC (bán đồ giá trị, thừa kế, gift từ người khác) → có thể có thuế hoặc cần khai 確定申告.\n\nKhuyến nghị: lưu mọi biên nhận + đảm bảo nguồn tiền đã được khai thuế Nhật trước khi gửi.',
    },
    {
      question: '国外送金等調書 là gì? Tôi có cần làm không?',
      answer:
        '国外送金等調書 (giấy báo cáo giao dịch gửi tiền quốc tế) là form **dịch vụ gửi tiền (ngân hàng / Wise / SBI Remit etc.) tự gửi cho 国税庁** khi giao dịch ≥ 100万円. **KHÔNG phải bạn làm.**\n\nNhưng:\n• Bạn có thể bị 国税庁 hỏi về giao dịch sau đó — chuẩn bị chứng minh nguồn tiền.\n• Dịch vụ thường yêu cầu **lý do gửi tiền** (mục đích) khi giao dịch lớn — trả lời thật (生活費 / 学費 / 投資 / 家族支援 / etc.).\n• Nếu lý do mơ hồ / có dấu hiệu bất thường → dịch vụ có thể từ chối / trì hoãn để điều tra.\n\nĐây là quy trình bình thường + minh bạch — không có gì phải lo nếu nguồn tiền hợp pháp.',
    },
    {
      question: 'Vợ/chồng tôi nhận tiền ở VN — có phải đóng thuế VN không?',
      answer:
        'Tùy mục đích + quan hệ + số tiền. Đây là vùng pháp luật Việt Nam — guide chỉ chia sẻ thông tin chung, KHÔNG phải tư vấn thuế cụ thể.\n\nNguyên tắc chung:\n• Tiền **gia đình hỗ trợ** (vợ/chồng/con/cha/mẹ) trong gia đình hạt nhân: thường KHÔNG phải đóng thuế thu nhập cá nhân ở VN.\n• Tiền **tặng / cho** từ người khác (ngoài gia đình hạt nhân) hoặc tài sản lớn (vd > vài tỷ VND): có thể có thuế quà tặng.\n• Tiền **làm việc / hợp đồng** từ Nhật cho công dân VN: có thể có nghĩa vụ thuế ở VN dù đã đóng ở Nhật. **Hiệp định tránh đánh thuế hai lần Nhật–Việt** (1995) áp dụng — phức tạp, hỏi luật sư VN.\n\nNếu nhận lớn (vd >500 triệu VND/lần): có thể bị ngân hàng VN yêu cầu giải trình nguồn tiền theo quy định AML. Chuẩn bị giấy tờ.',
    },
    {
      question: 'Tôi sắp về VN vĩnh viễn — chuyển hết tiền tiết kiệm như thế nào?',
      answer:
        'Tình huống phức tạp + cần kế hoạch cẩn thận. Khuyến nghị:\n\n1. **Chia làm nhiều lần** — không gửi tất cả 1 lần (vd >1000万円). Có thể bị nghi 構造化 nhưng cũng có thể bị nghi rửa tiền.\n\n2. **Chuẩn bị chứng minh nguồn tiền**:\n• Bảng kê 源泉徴収票 nhiều năm.\n• Sao kê tài khoản tiết kiệm.\n• Giấy bán nhà / xe / đầu tư nếu có.\n\n3. **Hỏi 税理士 trước**:\n• Có cần 確定申告 trước khi rời Nhật?\n• 出国税 (exit tax) áp dụng cho trường hợp nào? (cho tài sản chứng khoán >1億円 — không áp dụng đa số người Việt).\n• 脱退一時金 từ 厚生年金 — xem guide pension-exemption-refund.\n\n4. **Bên VN**:\n• Ngân hàng nhận có thể yêu cầu giải trình nếu lớn.\n• Hỏi ngân hàng VN trước khi gửi để biết yêu cầu.\n\n5. **Time tax-efficient**:\n• Nếu có khả năng giảm thuế Nhật bằng cách quyên 寄附 cuối cùng (寄附金控除) — tham khảo 税理士.\n\nVụ này KHÔNG nên tự xoay sở — đầu tư 1 buổi tư vấn 税理士 (20,000–50,000円) tiết kiệm rủi ro lớn.',
    },
    {
      question: 'Tôi nhận SMS "国税庁: bạn có thuế gửi tiền chưa đóng" — đúng không?',
      answer:
        '**SCAM 100%.** 国税庁 KHÔNG dùng SMS / LINE / cuộc gọi để yêu cầu thanh toán thuế.\n\nDấu hiệu giả:\n• Link http (không https)\n• Domain lạ (không phải nta.go.jp)\n• Yêu cầu thanh toán urgent (vd "trong 24 giờ").\n• Yêu cầu chuyển khoản đến tài khoản cá nhân.\n• Cần mã OTP / số thẻ.\n\n**Phản ứng đúng**:\n1. KHÔNG click link / KHÔNG trả lời.\n2. KHÔNG chuyển tiền.\n3. Báo 国民生活センター 188 hoặc cảnh sát.\n4. Nếu lo lỡ liên quan thật: gọi 国税庁 trực tiếp qua số trên trang nta.go.jp (KHÔNG số trong SMS).\n\nXem guide special-fraud-tokushu-sagi để biết thêm về scam phổ biến.',
    },
  ],
  counterPhrases: [
    {
      jp: 'ベトナムに送金したいです。',
      romaji: 'Betonamu ni soukin shitai desu.',
      vn: 'Tôi muốn gửi tiền về Việt Nam.',
      note: 'Câu mở đầu khi gọi ngân hàng / dịch vụ.',
    },
    {
      jp: '送金手数料はいくらですか。',
      romaji: 'Soukin tesuuryou wa ikura desu ka.',
      vn: 'Phí gửi tiền là bao nhiêu?',
      note: 'Hỏi tổng phí (cố định + spread tỷ giá).',
    },
    {
      jp: '為替レートはいくらですか。',
      romaji: 'Kawase reeto wa ikura desu ka.',
      vn: 'Tỷ giá hối đoái là bao nhiêu?',
      note: 'Đối chiếu với Google rate. Spread > 1% thường không tốt.',
    },
    {
      jp: 'いつ届きますか。',
      romaji: 'Itsu todokimasu ka.',
      vn: 'Khi nào tới (tài khoản người nhận)?',
      note: 'Wise / SBI Remit thường 1–3 ngày, ngân hàng truyền thống 2–5 ngày.',
    },
    {
      jp: '受取人の情報を確認してください。',
      romaji: 'Uketorinin no jouhou o kakunin shite kudasai.',
      vn: 'Xin kiểm tra thông tin người nhận.',
      note: 'Trước khi confirm — đảm bảo tên + số tài khoản đúng.',
    },
    {
      jp: '送金目的は生活費です。',
      romaji: 'Soukin mokuteki wa seikatsuhi desu.',
      vn: 'Mục đích gửi là chi phí sinh hoạt.',
      note: 'Câu phổ biến — dịch vụ thường hỏi mục đích (生活費 / 学費 / 家族支援 / etc.).',
    },
    {
      jp: '領収書をください。',
      romaji: 'Ryoushuusho o kudasai.',
      vn: 'Cho tôi biên nhận.',
      note: 'Đối với bằng chứng + lưu cho thuế. Dịch vụ online thường tự gửi qua email.',
    },
    {
      jp: '100万円を超える送金は可能ですか。',
      romaji: 'Hyaku-mannen o koeru soukin wa kanou desu ka.',
      vn: 'Có thể gửi vượt 100 vạn yên không?',
      note: 'Hỏi trước — dịch vụ có thể yêu cầu thêm giấy tờ + thời gian xử lý.',
    },
  ],
  keyTerms: [
    {
      term: '海外送金',
      reading: 'かいがいそうきん',
      meaningVi: 'chuyển tiền ra nước ngoài',
      noteVi: 'Bản thân việc gửi tiền KHÔNG bị đánh thuế ở Nhật (tiền sau thuế của bạn). NHƯNG có thể bị xét nếu: (1) Tổng gửi vượt 100万円/lần → ngân hàng/dịch vụ phải báo cáo cho 国税庁 qua 国外送金等調書 (luật 国外送金等調書法); (2) Tiền không khớp với thu nhập đã khai → 税務署 có thể hỏi nguồn.',
    },
    {
      term: '国外送金等調書',
      reading: 'こくがいそうきんとうちょうしょ',
      meaningVi: 'báo cáo chuyển tiền nước ngoài (do ngân hàng / dịch vụ nộp)',
      noteVi: 'Khi bạn chuyển > 100万円/lần ra nước ngoài, ngân hàng/Wise/Revolut/Western Union BẮT BUỘC gửi báo cáo cho 国税庁. Bạn KHÔNG cần làm gì — nhưng nên có giấy chứng minh nguồn tiền (giấy lương, sao kê), phòng khi 税務署 hỏi.',
    },
    {
      term: '贈与税',
      reading: 'ぞうよぜい',
      meaningVi: 'thuế quà tặng (tại Nhật)',
      noteVi: 'Nếu BẠN nhận tiền/tài sản TỪ người khác > 110万円/năm (basic exemption) → bạn (người nhận) phải nộp 贈与税. Áp dụng cả khi nhận TỪ VN sang. Bố mẹ ở VN gửi tiền cho bạn ở Nhật > 110万円/năm → bạn cần báo 確定申告 (mục 贈与). Hỏi 税務署 / 税理士 nếu nhận tiền lớn.',
    },
    {
      term: '扶養送金',
      reading: 'ふようそうきん',
      meaningVi: 'gửi tiền cho người phụ thuộc (chu cấp gia đình)',
      noteVi: 'Tiền BẠN gửi VỀ cho gia đình ở VN (cha mẹ, vợ/chồng, con) để khai 扶養控除 — phải có 送金関係書類 chứng minh. Nếu thân nhân 30-70 tuổi: cần ≥ 38万円/người/năm. Gửi qua bank/Wise/Revolut chính thức HỢP LỆ; gửi tiền mặt qua người quen KHÔNG hợp lệ.',
    },
    {
      term: '所得税',
      reading: 'しょとくぜい',
      meaningVi: 'thuế thu nhập quốc gia',
      noteVi: 'Thuế tính trên thu nhập trong năm. Khác với 住民税 (thuế địa phương, năm trước). 所得税 lũy tiến 5-45% tuỳ thu nhập + 復興特別所得税 2.1% bổ sung. Tự động khấu trừ qua lương (給与所得者) hoặc khai qua 確定申告. Không liên quan trực tiếp đến tiền BẠN gửi về VN (chỉ liên quan đến thu nhập của BẠN ở Nhật).',
    },
    {
      term: '租税条約',
      reading: 'そぜいじょうやく',
      meaningVi: 'hiệp định thuế song phương',
      noteVi: 'Hiệp định Nhật-VN ký 1995 (có hiệu lực): tránh đánh thuế 2 lần. Nếu bạn có thu nhập ở VN (cho thuê nhà, dividend) → có thể được miễn / giảm thuế Nhật. Áp dụng phức tạp — phải hỏi 税理士 chuyên 国際税務. Không tự suy đoán.',
    },
    {
      term: '帰国時の納税義務',
      reading: 'きこくじののうぜいぎむ',
      meaningVi: 'nghĩa vụ nộp thuế khi về nước',
      noteVi: 'Nếu về VN giữa năm, bạn vẫn có nghĩa vụ nộp: (1) 住民税 phần còn lại (tính trên thu nhập năm trước); (2) 所得税 cho khoảng thời gian đã làm năm hiện tại. PHẢI đăng ký 納税管理人 tại 市役所 trước khi đi nếu chưa đóng hết. KHÔNG đóng = ảnh hưởng cấp visa nếu quay lại.',
    },
  ],
  officialLinks: [
    { label: '国税庁', url: 'https://www.nta.go.jp/' },
    { label: '財務省', url: 'https://www.mof.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Hiểu khung pháp lý — 2 phía Nhật + Việt Nam',
      description:
        'Trước khi gửi, hiểu cơ bản:\n\n**Phía Nhật**:\n• Pháp lý: 外国為替及び外国貿易法 + 国税通則法.\n• Ngưỡng báo cáo: ≥ 100万円/giao dịch → 国外送金等調書 (dịch vụ tự gửi 国税庁).\n• Một số dịch vụ có ngưỡng AML (Anti-Money Laundering) thấp hơn — yêu cầu thêm giấy tờ.\n• KHÔNG có thuế gửi tiền (chỉ phí dịch vụ).\n• Nguồn tiền phải hợp pháp + đã đóng thuế (vd lương đã 源泉徴収).\n\n**Phía Việt Nam**:\n• Pháp lệnh ngoại hối + Nghị định ngân hàng nhà nước.\n• Người nhận có thể bị hỏi nguồn tiền nếu nhận lớn.\n• Thuế thu nhập cá nhân Việt Nam có quy định riêng — tiền gia đình hỗ trợ thường KHÔNG bị đánh thuế, nhưng tiền lao động / hợp đồng có thể có.\n• Hiệp định tránh đánh thuế hai lần Nhật–Việt (1995) — áp dụng cho thuế thu nhập, phức tạp.\n\n**Quan trọng**: 2 hệ thống KHÔNG đồng bộ — cùng số tiền có thể có yêu cầu khác ở 2 nước.',
      documents: [],
      tip: 'Đa số người gửi lương về cho gia đình hạt nhân: quy trình đơn giản — gửi qua dịch vụ chính thức + lưu biên nhận. Vấn đề chỉ phức tạp khi có nguồn tiền khác hoặc số rất lớn.',
    },
    {
      step: 2,
      title: 'So sánh dịch vụ — phí + tỷ giá + tốc độ',
      description:
        '**Loại dịch vụ**:\n\n• **Ngân hàng truyền thống** (SMBC, MUFG, Mizuho): phí cao (4,000–8,000円/giao dịch), spread tỷ giá xấu, an toàn cao, có quầy.\n\n• **Ngân hàng online** (楽天銀行, ソニー銀行): phí trung bình, online thuận tiện.\n\n• **Dịch vụ chuyên** (Wise, SBI Remit, Remitly, OFX, WorldRemit, MoneyGram): phí thấp + tỷ giá tốt + nhanh.\n\n**Yếu tố so sánh**:\n\n1. **Tổng chi phí** (phí cố định + spread tỷ giá): vd gửi 100,000円 → so sánh số VND người nhận thực sự nhận.\n2. **Tốc độ**: Wise ~1–2 ngày, SBI Remit cùng ngày, ngân hàng truyền thống 2–5 ngày.\n3. **Ngân hàng VN nhận hỗ trợ**: không phải dịch vụ nào cũng có Vietcombank, Agribank, etc.\n4. **Giao diện + ngôn ngữ**: tiếng Anh / Việt / Nhật.\n5. **Giới hạn / lần + giới hạn / năm**: tùy dịch vụ.\n\n**Cách check**: vào trang dịch vụ → nhập số tiền + ngân hàng VN nhận → xem **số VND cuối cùng người nhận sẽ nhận** + thời gian. So sánh ≥ 3 dịch vụ.',
      documents: [],
      tip: 'Wise (formerly TransferWise) thường tốt nhất cho người Việt — tỷ giá gần market rate + phí transparent. SBI Remit nhanh + nhiều người Việt dùng. Thử 1 lần nhỏ trước khi gửi lớn.',
    },
    {
      step: 3,
      title: 'Mở tài khoản dịch vụ + verify',
      description:
        'Lần đầu dùng dịch vụ:\n\n1. **Đăng ký account** trên web/app dịch vụ.\n2. **Xác minh danh tính** (KYC):\n• Upload ảnh 在留カード mặt trước + sau.\n• Selfie với 在留カード.\n• Một số dịch vụ thêm マイナンバー / hộ chiếu.\n• Đợi 1–3 ngày phê duyệt.\n3. **Liên kết tài khoản ngân hàng** Nhật để rút tiền.\n4. **Thêm người nhận** ở VN:\n• Tên đầy đủ (theo CMND/CCCD).\n• Số tài khoản.\n• Tên ngân hàng + chi nhánh.\n• SWIFT/BIC code (cho ngân hàng quốc tế) hoặc tên chi nhánh chi tiết (cho dịch vụ riêng).\n5. **Test transfer** lần đầu nhỏ (vd 5,000円) để đảm bảo thông tin đúng.',
      documents: [
        '在留カード + hộ chiếu',
        'Sổ ngân hàng / cash card',
        'Thông tin chi tiết người nhận VN',
      ],
      tip: 'Lưu thông tin người nhận trong app dịch vụ — tránh nhập lại mỗi lần (nguồn của lỗi). Verify thông tin gốc với người nhận trước khi save.',
    },
    {
      step: 4,
      title: 'Gửi tiền + lưu biên nhận',
      description:
        '**Quy trình gửi**:\n\n1. Đăng nhập dịch vụ → "Send Money" / "送金".\n2. Chọn người nhận đã save.\n3. Nhập số tiền (yen) — dịch vụ ước tính số VND người nhận sẽ nhận.\n4. Chọn mục đích (生活費 / 学費 / 家族支援 / 投資 / 商品購入 / etc.).\n5. Confirm + thanh toán (rút từ tài khoản Nhật hoặc thẻ).\n6. Nhận biên nhận điện tử qua email + tracking number.\n\n**Khi giao dịch ≥ 100万円**:\n• Dịch vụ có thể yêu cầu thêm:\n  - 源泉徴収票 / giấy chứng minh thu nhập\n  - Lý do cụ thể\n  - Hợp đồng / chứng từ nguồn tiền\n• Có thể delay 1–3 ngày để verify.\n• 国外送金等調書 sẽ được dịch vụ gửi 国税庁 — bạn không phải làm gì.\n\n**Lưu**:\n• Biên nhận điện tử (lưu vào folder cloud).\n• Tracking number.\n• Số tiền + tỷ giá + ngày giờ.\n• Lý do gửi.\n• Tổng tích lũy năm (Excel hoặc app).',
      documents: [
        'Biên nhận điện tử',
      ],
      tip: 'Tổng kết hàng tháng/quý — không chỉ riêng từng giao dịch. Thuế audit hỏi về cả năm.',
    },
    {
      step: 5,
      title: 'Theo dõi + xử lý vấn đề',
      description:
        '**Theo dõi giao dịch**:\n\n1. Tracking number → check status trên web/app.\n2. Status thông thường: "Processing" → "Sent" → "Received".\n3. Nếu quá lâu (vượt thời gian dự kiến + 1 ngày): liên hệ dịch vụ.\n\n**Vấn đề phổ biến + cách xử lý**:\n\n• **Tiền chưa đến**: kiểm tra tracking. Nếu "Sent" nhưng người nhận chưa thấy — đợi 1–2 ngày (xử lý ngân hàng VN). Nếu vẫn không có → liên hệ dịch vụ + ngân hàng VN.\n\n• **Sai tên người nhận**: liên hệ dịch vụ NGAY — có thể chặn được. Nếu đã đến tài khoản người khác: thủ tục lấy lại phức tạp + có thể tốn phí.\n\n• **Bị từ chối**: dịch vụ có quyền từ chối nếu nghi ngờ nguồn tiền / mục đích / AML. Hỏi lý do + cung cấp thêm giấy tờ.\n\n• **Tài khoản đông cứng / bị giới hạn**: có thể đang trong AML investigation. Liên hệ dịch vụ + nếu không giải quyết → luật sư.\n\n• **国税庁 hỏi giải trình**: chuẩn bị 源泉徴収票 + sao kê + biên nhận giao dịch + lý do gửi. Trả lời thật + đầy đủ.',
      documents: [
        'Tất cả biên nhận + tracking',
        '源泉徴収票 + sao kê',
      ],
      tip: 'KHÔNG hoảng nếu 国税庁 gọi / gửi thư hỏi — đa số trường hợp chỉ là verify thông tin + nguồn hợp pháp + đầy đủ giấy tờ là OK. Hoảng + trả lời sai mới là vấn đề.',
    },
    {
      step: 6,
      title: 'Tránh scam — quy tắc vàng',
      description:
        'Scam liên quan gửi tiền cực kỳ phổ biến với người Việt ở Nhật:\n\n**Scam phổ biến**:\n\n1. **SMS / LINE / cuộc gọi giả mạo "国税庁 / 財務省 / ngân hàng"**: yêu cầu thanh toán phí thuế / phí giao dịch chưa đóng → SCAM 100%.\n\n2. **Người lạ trên Facebook / Zalo nhờ "chuyển hộ tiền về VN"**: hứa trả phí cao → đa số là rửa tiền / lừa đảo. Bạn có thể bị điều tra.\n\n3. **"Đầu tư crypto / forex" qua người môi giới Việt Nam**: dụ chuyển tiền từ Nhật sang VN để "đầu tư" → mất tiền.\n\n4. **Thân nhân giả mạo**: SMS / call giả mạo người nhà cần tiền gấp (vd "tai nạn", "phẫu thuật") → KIỂM TRA bằng cách gọi LẠI người nhà qua số đã biết.\n\n**Quy tắc vàng**:\n\n• 国税庁 / 財務省 / ngân hàng KHÔNG dùng SMS / LINE / cuộc gọi yêu cầu chuyển khoản.\n• KHÔNG chuyển tiền cho người không biết.\n• KHÔNG chuyển tiền sau cuộc gọi gấp / hoảng.\n• Verify mọi yêu cầu đáng nghi qua kênh chính thức.\n• Báo 国民生活センター 188 hoặc cảnh sát nếu nghi scam.\n\n**Đã chuyển nhầm cho scam**:\n• Liên hệ dịch vụ NGAY (có thể chặn nếu chưa "Received").\n• Báo cảnh sát.\n• Báo ngân hàng VN nếu đã đến.\n• Báo 国民生活センター 188.',
      documents: [],
      tip: 'KHÔNG bao giờ chuyển tiền trong panic / vội. Đa số scam dựa vào yếu tố thời gian gấp. Hít thở + verify trước.',
    },
  ],
};

export default taxOnRemittanceToVietnam;
