import type { AdminGuide } from '../../../../types/content';

const consumerRightsCoolingOff: AdminGuide = {
  id: 'consumer-rights-cooling-off',
  category: 'daily-law',
  lastVerified: '2026-08-21',
  priority: 'normal',
  title: 'Quyền tiêu dùng + Cooling-off + Hotline 188',
  titleJp: 'クーリング・オフ・消費者ホットライン 188',
  icon: 'shield-checkmark-outline',
  color: '#3F51B5',
  description:
    'Cooling-off (クーリング・オフ) là quyền hủy hợp đồng vô điều kiện trong 8–20 ngày khi mua qua các kiểu giao dịch dễ bị ép: **bán hàng tại nhà** (訪問販売), **gọi điện chào hàng** (電話勧誘), **bán hàng đa cấp** (マルチ商法), **việc làm tại nhà có ký quỹ** (内職商法) — quy định bởi luật 特定商取引法. KHÔNG áp dụng cho mua online / mua tại cửa hàng — nhưng vẫn có quyền tiêu dùng khác. Khi gặp rắc rối: gọi **188** (đường dây của trung tâm bảo vệ người tiêu dùng quốc gia 国民生活センター) — sẽ chuyển đến trung tâm tư vấn địa phương (消費生活センター) gần nhất, MIỄN PHÍ. Đây là nguồn quan trọng cho lừa đảo, hợp đồng ép ký, NHK, ISP, mua trả góp, vay nóng.',
  searchKeywords: [
    'cooling off',
    'クーリングオフ',
    '188',
    '国民生活センター',
    '消費生活センター',
    'quyền tiêu dùng',
    'hợp đồng hủy',
    'lừa đảo',
    '訪問販売',
    '電話勧誘',
    'マルチ商法',
    '特定商取引法',
    'consumer rights',
    'shouhi seikatsu sentaa',
    'mua trả góp',
    'NHK hủy',
    'ISP hủy',
    'phí từ chối',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      '消費者契約法 + 特定商取引法 — quản lý cấp quốc gia bởi 消費者庁 (CAA) — Consumer Affairs Agency. Cooling-off period quy định theo luật cho từng loại hợp đồng. Hotline 188 là 国民生活センター — trung tâm phân phối cuộc gọi đến 消費生活センター cấp 都道府県 / 市町村 gần nhất. Cooling-off có ngoại lệ phức tạp — không phải mọi trường hợp đều áp dụng.',
    sourceVerifiedAt: '2026-08-21',
    nextReviewAt: '2026-12-01',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Số tiền lớn (>100,000円) + ngoài cooling-off period → có thể vẫn hủy được qua luật 消費者契約法 (vô hiệu hóa với 不実告知 hoặc 不利益事実不告知) — cần 弁護士 hoặc 司法書士.',
      'Đối phương khẳng định "không phải 訪問販売" hoặc đã ký 解約不可 — vẫn có thể có quyền cooling-off, gọi 188 xác minh.',
      'Đã chuyển tiền/cho 番号 thẻ tín dụng → cấp tốc gọi 188 + ngân hàng + 警察 (oresage 警察相談 #9110).',
      'Vay nóng (闇金) → KHÔNG trả tiếp, gọi 188 + 弁護士 ngay (luật cho phép vô hiệu hóa lãi suất bất hợp pháp).',
    ],
  },
  quickAction: {
    deadline:
      'Cooling-off period: **訪問販売 / 電話勧誘 / 特定継続的役務 / 内職 = 8 ngày**, **連鎖販売取引 (multi-level marketing) / 業務提供誘引販売 = 20 ngày**. Đếm từ ngày nhận **書面 (giấy hợp đồng đầy đủ thông tin theo luật)**. Nếu giấy không đủ chuẩn → đồng hồ KHÔNG chạy → có thể hủy bất cứ lúc nào.',
    office:
      '**国民生活センター — 188** (gọi miễn phí từ mọi điện thoại Nhật — phát âm "iya-iya" = không không). Sẽ kết nối đến **消費生活センター** 都道府県/市町村 gần nhất. **警察相談 #9110** cho trường hợp lừa đảo có yếu tố hình sự. **法テラス 0570-078374** cho tư vấn pháp lý có thu nhập thấp.',
    doNow: [
      '**KHÔNG hoảng**. Lưu mọi chứng cứ: hợp đồng, biên nhận, email, SMS, ảnh, ghi âm cuộc gọi nếu có.',
      'Kiểm tra thời gian: bạn ký bao nhiêu ngày trước? Có nằm trong 8/20 ngày không?',
      'Kiểm tra loại giao dịch: 訪問販売 (qua nhà / cửa) / 電話勧誘 / 連鎖販売 / online / cửa hàng?',
      'Nếu trong cooling-off period → viết **書面 (thư) gửi 内容証明郵便** đến công ty (chứng cứ pháp lý mạnh nhất).',
      'Gọi **188** trước khi gửi thư — chuyên gia tư vấn miễn phí hướng dẫn từng bước.',
    ],
    bring: [
      'Hợp đồng + biên nhận',
      '在留カード hoặc ID',
      'Số 通帳 / thẻ tín dụng (KHÔNG đưa cho ai khác — chỉ ghi note)',
      'Receipts thanh toán',
      'Email / SMS / ghi âm (chụp ảnh tin nhắn)',
    ],
    ifLate:
      'Quá cooling-off period (>8 hoặc >20 ngày) → **CÒN cách**: luật 消費者契約法 cho phép vô hiệu hóa khi có 不実告知 (nói dối) / 断定的判断の提供 (khẳng định lợi nhuận chắc chắn) / 不利益事実の不告知 (không nói rõ bất lợi). Hết hạn 1 năm sau khi phát hiện hoặc 5 năm sau ký. Gọi 188 ngay.',
    officialSourceLabels: ['消費者庁 (CAA)', '国民生活センター — 188'],
  },
  whoIsThisFor: [
    'Người Việt vừa ký một hợp đồng "ép" ngay tại nhà / cửa hàng / qua điện thoại — đang hối hận.',
    'Người Việt bị nhân viên NHK / ISP / điện / gas đến nhà mời ký mà nay muốn huỷ.',
    'Người Việt bị bạn bè / người quen rủ vào マルチ商法 / mạng lưới bán hàng phân cấp.',
    'Người Việt vừa mua đắt qua điện thoại (ví dụ "trúng giải", "khuyến mãi hạn cuối") rồi nhận hàng không đúng.',
    'Người Việt vay nóng (闇金) lãi suất bất hợp pháp.',
    'Người Việt gặp lừa đảo trực tuyến / SMS phishing / 還付金 lừa.',
    'Người Việt thuộc 内職商法 ("làm tại nhà kiếm 50,000円/tháng" nhưng phải mua thiết bị 300,000円 trước).',
    'KHÔNG dành cho: mua tại cửa hàng / online thông thường (vẫn có quyền tiêu dùng khác nhưng không cooling-off).',
  ],
  whenToDo: [
    'NGAY sau khi ký hợp đồng / chuyển tiền và bắt đầu hối hận — đừng đợi.',
    'Tốt nhất trong 8 ngày đầu — cooling-off mạnh nhất.',
    'Trong 20 ngày nếu là マルチ商法 / 業務提供誘引.',
    'Sau hạn — vẫn gọi 188 — có thể có cách khác.',
    'Nếu phát hiện bị lừa qua SMS / lừa qua điện thoại "ATM" → NGAY LẬP TỨC (giây / phút quan trọng cho 還付金詐欺).',
    'Khi nghi ngờ về hợp đồng / khuyến mãi mà chưa ký → gọi 188 hỏi trước rồi mới quyết định.',
  ],
  whereToDo: [
    '**Hotline 188** (国民生活センター) — miễn phí, mọi nơi ở Nhật. Tự động chuyển đến trung tâm gần nhất. Tiếng Nhật chính + 1 số trung tâm có phiên dịch.',
    '**消費生活センター** cấp 都道府県 / 市町村 — trực tiếp đến gặp. Search "Tên 市町村 + 消費生活センター".',
    '**警察相談 #9110** — không khẩn cấp, tư vấn về lừa đảo có yếu tố hình sự.',
    '**法テラス** 0570-078374 — tư vấn pháp lý có thu nhập thấp / miễn phí.',
    '**外国人相談センター** — hỗ trợ đa ngôn ngữ (xem foreign-resident-support-centers).',
    '**Cơ quan giao dịch**:\n• Hợp đồng → công ty.\n• 内容証明郵便 → bưu điện gần nhất (gửi dưới dạng thư bảo đảm có ghi nội dung).',
    '**Online**:\n• 国民生活センター: www.kokusen.go.jp\n• 消費者庁: www.caa.go.jp\n• 消費者ホットライン: 188',
  ],
  estimatedTime:
    'Gọi 188: 15–30 phút tư vấn ban đầu. Viết 内容証明 + gửi: 1–2 giờ + 1,500–2,500円 phí bưu điện. Cooling-off hiệu lực: ngay khi gửi 通知 (trước 24h ngày cuối của hạn). Hoàn tiền: 1–4 tuần. Tranh chấp lớn cần 弁護士: vài tháng.',
  fees: [
    '**Hoàn toàn miễn phí**:\n• Gọi 188 — miễn phí từ mọi điện thoại Nhật.\n• Tư vấn 消費生活センター — miễn phí.\n• 警察相談 #9110 — miễn phí.\n• 法テラス tư vấn ban đầu — miễn phí (thu nhập thấp).\n• Cooling-off thực hiện — KHÔNG có phí, công ty PHẢI hoàn tiền 100%.',
    '**Chi phí giao tiếp**:\n• 内容証明郵便: ~1,500–2,500円 (thư bảo đảm có ghi nội dung).\n• 配達証明 (giao có biên nhận): +320円.\n• Email/SMS: miễn phí (nhưng không có giá trị pháp lý mạnh).',
    '**Khi cần 弁護士 / 司法書士**:\n• Tư vấn ban đầu 30 phút: 5,000円 (đa số). Có nơi miễn phí lần đầu.\n• Đại diện tranh chấp: 50,000–500,000円+ tùy vụ.\n• 法テラス cho thu nhập thấp: hỗ trợ tài chính / miễn phí.',
    '**Phí đối tượng có thể ép thu nhưng KHÔNG hợp pháp**:\n• Phí "huỷ hợp đồng": 訪問販売 / 電話勧誘 trong cooling-off → KHÔNG có quyền thu.\n• Phí "đã sử dụng": dịch vụ chưa giao đầy đủ → KHÔNG có quyền thu.\n• 違約金 ngoài 9条 消費者契約法 → có thể vô hiệu hóa.',
  ],
  documentsChecklist: [
    { label: 'Hợp đồng (契約書)', required: true, note: 'Bản gốc + chụp ảnh. Bao gồm 重要事項説明書.' },
    { label: 'Biên nhận thanh toán', required: true, note: 'Receipt / 領収書 / sao kê ngân hàng.' },
    { label: 'Catalog / brochure', required: false, note: 'Nếu họ đưa giấy quảng cáo trước khi ký.' },
    { label: 'Email / SMS / line', required: true, note: 'Chụp ảnh + lưu file. KHÔNG xóa.' },
    { label: 'Ghi âm cuộc gọi', required: false, note: 'Hợp pháp ghi âm để bảo vệ bản thân.' },
    { label: 'Tên + công ty + số điện thoại đối phương', required: true, note: 'Cho 消費生活センター + 弁護士.' },
    { label: '在留カード', required: true, note: 'ID khi đến 消費生活センター.' },
  ],
  commonMistakes: [
    'Tin "đã ký rồi không huỷ được" → SAI cho 訪問販売 / 電話勧誘. Có quyền cooling-off 8 ngày vô điều kiện.',
    'Đợi quá hạn 8 ngày → mất quyền cooling-off mạnh. Hành động NGAY khi hối hận.',
    'Gọi điện thoại huỷ mà không gửi văn bản → công ty có thể từ chối. PHẢI viết 書面 (giấy).',
    'Gửi email/SMS huỷ → có thể không đủ pháp lý. Dùng **内容証明郵便** để có chứng cứ mạnh.',
    'Vứt hợp đồng / biên nhận → mất chứng cứ. Lưu mọi giấy tờ ít nhất 5 năm.',
    'Tin "đối phương sẽ kiện tôi nếu không trả" → đa số scam. Gọi 188 xác minh trước.',
    'Đưa số ATM / thẻ tín dụng qua điện thoại cho "国税庁" / "警察" / "銀行" → 100% lừa đảo. Cơ quan thật KHÔNG bao giờ hỏi qua điện thoại.',
    'Tin "tôi không biết tiếng Nhật giỏi, không gọi 188 được" → Nhiều 消費生活センター có phiên dịch. Hoặc đi cùng người dịch. ĐỪNG bỏ qua.',
    'Trả nợ cho 闇金 (cho vay bất hợp pháp) → luật cho phép vô hiệu hóa lãi suất. Gọi 188 + 弁護士.',
    'Tin "đã chuyển tiền rồi nên thua" → Có thể đảo ngược (振込詐欺救済法) trong vài giờ đầu. Gọi ngân hàng + 188 + 警察 NGAY.',
  ],
  faq: [
    {
      question: 'Cooling-off áp dụng cho trường hợp nào? Không áp dụng cho gì?',
      answer:
        '**ÁP DỤNG (luật 特定商取引法)**:\n\n**8 ngày**:\n• 訪問販売 — nhân viên đến nhà / cửa hàng tạm / nơi không phải cửa hàng cố định.\n• 電話勧誘販売 — bán qua điện thoại không yêu cầu.\n• 特定継続的役務 — dịch vụ liên tục (gym, học, làm đẹp, kết hôn, gia sư, máy tính) trên 50,000円.\n• 訪問購入 — người đến nhà thu mua đồ (vd vàng cũ).\n\n**20 ngày**:\n• 連鎖販売取引 — マルチ商法 / network marketing.\n• 業務提供誘引販売取引 — 内職商法 ("làm việc tại nhà" nhưng phải mua hàng).\n\n**KHÔNG ÁP DỤNG**:\n• Mua tại cửa hàng cố định.\n• Mua online (通信販売 — có chính sách hoàn trả của shop, không phải cooling-off).\n• Mua qua catalog (通信販売).\n• Hàng/dịch vụ giá trị nhỏ (đa số <3,000円).\n• Hàng tiêu hao đã dùng (vd mỹ phẩm mở nắp).\n• Phương tiện (ô tô, máy nông nghiệp — có ngoại lệ).\n\n**LƯU Ý quan trọng**:\n• Mua online KHÔNG có cooling-off bắt buộc.\n• Nhưng shop có chính sách hoàn trả riêng (đọc trước khi mua).\n• Amazon, Rakuten, Yahoo thường có 30 ngày hoàn trả.\n• Lừa đảo online (詐欺サイト) → quyền vô hiệu hóa contract qua 消費者契約法 hoặc 民法 (詐欺 96条).',
    },
    {
      question: 'Cách viết và gửi cooling-off (内容証明郵便) chuẩn?',
      answer:
        '**Mẫu cooling-off đơn giản**:\n\n```\n通知書\n\n令和[年]年[月]月[日]日付で貴社と締結した\n[商品名/サービス名]に関する売買契約を、\n特定商取引法第9条に基づき、解除いたします。\n\n令和[年]年[月]月[日]日 ※ngày viết thư\n\n[Tên đầy đủ]\n[Địa chỉ]\n[Số điện thoại]\n```\n\nDịch ý: "Tôi hủy hợp đồng [tên hàng/dịch vụ] đã ký với quý công ty ngày [ngày] theo điều 9 luật 特定商取引法."\n\n**Cách gửi 内容証明郵便**:\n\n1. Viết thư 3 bản (1 gửi đi, 1 bưu điện giữ, 1 bạn giữ).\n2. Mang đến **bưu điện lớn** (không phải mọi bưu điện nhỏ nhận 内容証明 — kiểm tra trước).\n3. Yêu cầu **内容証明郵便 + 配達証明**.\n4. Phí: ~1,500–2,500円.\n5. Bưu điện đóng dấu xác nhận → bạn nhận 1 bản.\n6. Lưu giữ bản nhận + 配達証明 mãi.\n\n**Hiệu lực**:\n• Cooling-off có hiệu lực **ngày gửi** (không phải ngày đến).\n• Phải gửi trước 24h ngày cuối của hạn 8/20 ngày.\n• Sau khi gửi → công ty PHẢI hoàn tiền + nhận lại hàng (chi phí vận chuyển công ty chịu).\n\n**Lựa chọn nhanh hơn**:\n• Online qua trang 国民生活センター có template + hướng dẫn từng bước.\n• Một số trường hợp gọi 188 + email công ty có thể đủ — nhưng 内容証明 là an toàn pháp lý nhất.\n\n**Sau khi gửi**:\n• Công ty không phản hồi → gọi 188 báo cáo.\n• Công ty từ chối → 消費生活センター trung gian.\n• Vẫn không được → 弁護士 + 民事訴訟.',
    },
    {
      question: 'Tôi nhận SMS / cuộc gọi "国税庁 hoàn tiền thuế" — có thật không?',
      answer:
        '**HẦU HẾT là LỪA ĐẢO** (還付金詐欺).\n\n**Cơ quan thật KHÔNG BAO GIỜ**:\n• Gọi điện hỏi số thẻ ATM / tài khoản.\n• Gửi SMS với link click để "xác nhận".\n• Yêu cầu chuyển tiền qua ATM ngay.\n• Đe doạ "bị bắt nếu không trả".\n\n**Cách nhận diện lừa đảo**:\n\n• Yêu cầu hành động NGAY (vài giờ / vài phút).\n• Đề cập "tiền lớn" (hoàn 200,000円, thưởng 1,000,000円).\n• Yêu cầu giữ bí mật, không nói gia đình.\n• Hướng dẫn đi ATM cụ thể.\n• Đề cập 警察 / 国税庁 / 銀行 / 役所 / 弁護士.\n• Tiếng Nhật không tự nhiên hoặc có accent.\n\n**Nếu nhận**:\n\n1. **KHÔNG nhấn link**. Xóa SMS.\n2. **KHÔNG gọi lại số trong SMS**.\n3. **KHÔNG đưa số ATM / thẻ tín dụng**.\n4. Nếu đã chuyển tiền → **NGAY**:\n• Gọi ngân hàng → yêu cầu 振込詐欺救済法 (luật cứu nạn).\n• Gọi 警察 110 hoặc 警察相談 #9110.\n• Gọi 188.\n5. Nếu đã click link / cài app → xóa app, đổi mật khẩu mọi nơi, gọi ngân hàng đóng băng thẻ.\n\n**Phòng ngừa**:\n• 国税庁: thư bưu điện chính thức (không bao giờ qua SMS).\n• Hoàn thuế: tự kiểm tra qua e-Tax với My Number.\n• Cảnh sát: không gọi điện qua thoại đến công dân.\n• Giả mạo ngân hàng: ngân hàng KHÔNG gửi link click.\n\nXem thêm guide special-fraud-tokushu-sagi cho chi tiết về 特殊詐欺.',
    },
    {
      question: 'Tôi bị NHK đến nhà ép ký rồi — giờ huỷ thế nào?',
      answer:
        'NHK là khu vực pháp lý tranh chấp. **Có cách**:\n\n**Cooling-off cho NHK**:\n\n• NHK 受信契約 là **vùng tranh cãi** — có ý kiến cooling-off áp dụng (是 訪問販売), có ý kiến không.\n• 消費者庁 + 国民生活センター đã hỗ trợ một số trường hợp huỷ qua cooling-off — nhưng **không tự động chiến thắng**.\n• Gọi 188 → tư vấn cụ thể từng trường hợp.\n\n**Quy trình huỷ**:\n\n1. **Lưu chứng cứ**:\n• Hợp đồng đã ký.\n• Ngày ký + nhân viên NHK.\n• Ghi âm cuộc gọi nếu có.\n• Câu họ nói (nếu họ dọa / nói dối).\n\n2. **Gọi 188 trước** — hỏi:\n• "私はNHKと契約を結んだが、訪問販売だと思うので解約したい" (Tôi đã ký NHK qua訪問販売, muốn huỷ).\n• Họ hướng dẫn từng bước.\n\n3. **Viết 内容証明郵便** đến NHK với nội dung cooling-off (8 ngày).\n\n4. **Nếu ngoài hạn 8 ngày**:\n• Vẫn có thể vô hiệu hóa qua 消費者契約法 nếu NHK 不実告知 (vd nói "ai cũng phải ký").\n• Gọi 188 / 弁護士.\n\n5. **Nếu NHK đe doạ kiện**:\n• Vẫn gọi 188 + 弁護士.\n• KHÔNG hoảng — đa số trường hợp NHK kiện vì không trả phí, không vì huỷ contract.\n\n**Phòng ngừa lần sau**:\n\nXem guide **nhk-contract-guide** — 5 cách xử lý NHK đến cửa mà không phải ký:\n• Không mở cửa.\n• Nói "今、忙しいので帰ってください" (bận, mời về).\n• "考えさせてください" (cho tôi suy nghĩ — không ký ngay).\n• Nói "テレビは持っていません" nếu thật.\n• Gọi 188 nếu họ ép.',
    },
    {
      question: 'Vay 闇金 (cho vay bất hợp pháp) → giờ họ đòi đe doạ — phải làm gì?',
      answer:
        '**Quan trọng**: KHÔNG trả thêm. Luật bảo vệ bạn.\n\n**Luật 利息制限法 + 出資法**:\n\n• Lãi suất hợp pháp tối đa: 15–20%/năm tùy số tiền.\n• 闇金 thường tính >100%/năm (10–50%/10 ngày phổ biến).\n• **Toàn bộ phần vượt quá pháp định → VÔ HIỆU**.\n• Một số trường hợp **toàn bộ nợ vô hiệu** (ngay cả gốc).\n\n**Bước cần làm NGAY**:\n\n1. **NGỪNG mọi liên hệ với 闇金**:\n• Đừng tự gọi lại / trả lời.\n• Đừng đưa số tài khoản mới.\n• Đừng gặp trực tiếp.\n\n2. **Gọi 188** — họ hướng dẫn chuyên gia 闇金.\n\n3. **Gọi 弁護士 chuyên 闇金 / 多重債務**:\n• 法テラス: 0570-078374.\n• 弁護士会 ở mỗi 都道府県 có 多重債務相談.\n• Tư vấn ban đầu thường miễn phí.\n\n4. **Sau khi 弁護士 nhận case**:\n• 弁護士 sẽ gửi **介入通知** đến 闇金 → họ KHÔNG được liên lạc bạn nữa.\n• Vi phạm → 弁護士 báo 警察 / 弁護士会.\n\n5. **Nếu bị đe doạ / quấy rối**:\n• Gọi 110 (警察 khẩn cấp) hoặc #9110.\n• Báo công sở để bảo vệ.\n• Bằng chứng (ghi âm, SMS, ảnh) lưu kỹ.\n\n**Phòng ngừa lần sau**:\n• KHÔNG vay từ nguồn không có 登録番号 (số đăng ký 貸金業).\n• Check trang 金融庁: trang đăng ký 貸金業者.\n• Nếu thật cần tiền → 消費者金融 hợp pháp (アコム, レイク, プロミス — lãi 15–18%/năm) hoặc 銀行 personal loan.\n• 法テラス cho hỗ trợ tài chính người thu nhập thấp.',
    },
  ],
  counterPhrases: [
    {
      jp: '188にかけたいです。',
      romaji: 'Ichi-hachi-hachi ni kaketai desu.',
      vn: 'Tôi muốn gọi 188.',
      note: 'Đơn giản — bấm 1-8-8 từ điện thoại bất kỳ ở Nhật.',
    },
    {
      jp: 'クーリングオフをしたいです。',
      romaji: 'Kuuringu ofu o shitai desu.',
      vn: 'Tôi muốn huỷ hợp đồng (cooling-off).',
      note: 'Câu mở đầu với 消費生活センター hoặc với công ty.',
    },
    {
      jp: '契約書をもう一度確認したいので、署名は後でします。',
      romaji: 'Keiyakusho o mou ichido kakunin shitai node, shomei wa ato de shimasu.',
      vn: 'Tôi muốn xem lại hợp đồng, để ký sau.',
      note: 'Câu cứu mạng tại 訪問販売 / cửa hàng / phone — luôn có quyền mang về.',
    },
    {
      jp: '今、忙しいので、お帰りください。',
      romaji: 'Ima, isogashii node, o-kaeri kudasai.',
      vn: 'Tôi đang bận, mời về.',
      note: 'Khi nhân viên NHK / 訪問販売 đến cửa.',
    },
    {
      jp: '考えさせてください。',
      romaji: 'Kangaesasete kudasai.',
      vn: 'Cho tôi suy nghĩ.',
      note: 'KHÔNG ký ngay khi áp lực.',
    },
    {
      jp: '内容証明郵便を出したいです。',
      romaji: 'Naiyou shoumei yuubin o dashitai desu.',
      vn: 'Tôi muốn gửi thư có chứng nhận nội dung.',
      note: 'Tại bưu điện — để gửi văn bản cooling-off.',
    },
    {
      jp: 'これは詐欺ですか？',
      romaji: 'Kore wa sagi desu ka?',
      vn: 'Đây có phải lừa đảo không?',
      note: 'Hỏi 188 / 警察 khi nghi ngờ.',
    },
    {
      jp: 'お金は返してください。',
      romaji: 'Okane wa kaeshite kudasai.',
      vn: 'Hoàn tiền cho tôi.',
      note: 'Sau khi cooling-off có hiệu lực — công ty PHẢI hoàn 100%.',
    },
    {
      jp: '弁護士に相談します。',
      romaji: 'Bengoshi ni soudan shimasu.',
      vn: 'Tôi sẽ tham vấn luật sư.',
      note: 'Câu mạnh khi đối phương từ chối / ép. Thường họ sẽ lùi.',
    },
  ],
  officialLinks: [
    { label: '消費者庁 (CAA)', url: 'https://www.caa.go.jp/' },
    { label: '国民生活センター — 188', url: 'https://www.kokusen.go.jp/' },
    { label: '消費者ホットライン (188) 使い方', url: 'https://www.caa.go.jp/policies/policy/local_cooperation/local_consumer_administration/hotline/' },
    { label: '法テラス — 法律支援', url: 'https://www.houterasu.or.jp/' },
    { label: '警察相談 #9110', url: 'https://www.npa.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Nhận diện — loại hợp đồng / lừa đảo bạn đang gặp',
      description:
        '**Phân loại quan trọng**:\n\n**A. 訪問販売** (cooling-off 8 ngày):\n• Nhân viên đến nhà / cửa.\n• NHK, ISP, điện/gas/nước, thực phẩm chức năng, sách giáo dục, máy lọc nước.\n• Bao gồm cả "kêu gọi tham gia sự kiện rồi ép ký".\n\n**B. 電話勧誘** (cooling-off 8 ngày):\n• Bán qua điện thoại bạn không yêu cầu.\n• Mua sách, thực phẩm chức năng, dịch vụ.\n\n**C. 特定継続的役務** (cooling-off 8 ngày, >50,000円):\n• Gym, học tiếng, làm đẹp, kết hôn, gia sư, máy tính.\n\n**D. 連鎖販売取引 (マルチ商法)** (cooling-off 20 ngày):\n• "Tham gia bán hàng + giới thiệu bạn bè để kiếm tiền".\n• Mạng lưới nhiều cấp.\n• Phải mua hàng / đóng phí gia nhập.\n\n**E. 業務提供誘引販売 (内職商法)** (cooling-off 20 ngày):\n• "Làm việc tại nhà kiếm 50,000円/tháng" nhưng phải mua thiết bị 300,000円 trước.\n\n**F. 訪問購入** (cooling-off 8 ngày):\n• Người đến nhà mua đồ cũ (vàng, đồ cổ).\n\n**G. KHÔNG cooling-off**:\n• Mua tại cửa hàng cố định (cellphone shop, electronics, supermarket).\n• Mua online (通信販売).\n• Hàng giá trị nhỏ (<3,000円 đa số).\n\n**H. Lừa đảo (詐欺)** — KHÔNG phải cooling-off mà 民法 / 刑法:\n• 還付金詐欺 (giả mạo 国税庁 / 役所).\n• オレオレ詐欺 (giả mạo người thân).\n• 振り込め詐欺 (chuyển khoản).\n• Online phishing.\n• 闇金 (vay nóng bất hợp pháp).',
      documents: ['Hợp đồng', 'Receipts'],
      tip: 'Không chắc loại nào? Gọi 188 trước. Họ sẽ phân loại + hướng dẫn cụ thể.',
    },
    {
      step: 2,
      title: 'Trong cooling-off period — Hành động NGAY',
      description:
        '**Đếm ngày**:\n\n• Đếm từ ngày **nhận giấy hợp đồng đầy đủ thông tin theo luật** (法定書面).\n• Nếu giấy thiếu thông tin (vd không ghi quyền cooling-off) → đồng hồ KHÔNG chạy.\n• Hạn cuối: 24h ngày thứ 8 (hoặc 20).\n\n**Quy trình huỷ (3 bước)**:\n\n**Bước 1: Gọi 188** — tư vấn miễn phí:\n• Họ hỏi: loại hợp đồng, ngày ký, số tiền, đối tác.\n• Họ hướng dẫn cụ thể.\n• Đa số nói tiếng Nhật — nếu khó, đi cùng người dịch hoặc dùng app dịch.\n\n**Bước 2: Viết 内容証明郵便** (xem FAQ cho mẫu):\n• 3 bản (cho công ty, bưu điện, bạn).\n• Mang đến bưu điện lớn.\n• Yêu cầu 内容証明 + 配達証明.\n• Phí ~1,500–2,500円.\n• Đóng dấu bưu điện = ngày gửi.\n\n**Bước 3: Lưu chứng cứ**:\n• Bản 内容証明 đã đóng dấu.\n• 配達証明 khi đến nơi.\n• Email/SMS phản hồi từ công ty.\n• Lưu ít nhất 5 năm.\n\n**Sau khi gửi**:\n\n• Công ty PHẢI hoàn tiền 100% trong thời gian hợp lý (đa số 1–2 tuần).\n• Công ty PHẢI nhận lại hàng (vận chuyển công ty chịu).\n• Hợp đồng VÔ HIỆU như chưa ký.\n\n**Nếu công ty không phản hồi / từ chối**:\n• Gọi 188 → 消費生活センター can thiệp.\n• Hoặc gọi 弁護士.',
      documents: ['Hợp đồng', 'Bản 内容証明 3 bản', 'Receipts'],
      tip: 'Đừng đợi. 8 ngày là 8 ngày. Hành động trong 1–2 ngày đầu là tốt nhất.',
    },
    {
      step: 3,
      title: 'Ngoài cooling-off period — Vẫn có cách',
      description:
        '**Khi quá 8/20 ngày**:\n\n**Luật 消費者契約法** cho phép vô hiệu hóa khi:\n\n**A. 不実告知** (Nói dối):\n• Đối phương nói thông tin sai về hàng/dịch vụ.\n• Vd: "đây là đầu tư bảo đảm lợi nhuận 20%" → SAI.\n• Vd: "ai cũng phải mua bảo hiểm này theo luật" → SAI.\n\n**B. 不利益事実の不告知** (Không nói rõ bất lợi):\n• Đối phương biết bất lợi quan trọng nhưng không nói.\n• Vd: gym không nói "phí huỷ sau 1 tháng = 50,000円".\n\n**C. 断定的判断の提供** (Khẳng định chắc chắn về tương lai):\n• Vd: "đầu tư này chắc chắn lãi 10%/năm" → đầu tư không bao giờ chắc.\n\n**D. 不退去 / 監禁** (Không về / giam):\n• Đối phương vào nhà bạn không chịu về.\n• Bạn bị giam ở cuộc gặp không cho về.\n\n**Thời hiệu vô hiệu hóa**:\n\n• Trong 1 năm từ ngày phát hiện sai sót.\n• Hoặc 5 năm từ ngày ký (tối đa).\n\n**Quy trình**:\n\n1. Gọi 188 — kể chi tiết.\n2. 消費生活センター xét xem có thuộc trường hợp nào.\n3. Họ liên hệ công ty trung gian.\n4. Nếu công ty không hợp tác → 弁護士.\n\n**Cho trường hợp lừa đảo (詐欺)**:\n\n• **民法 96条** — vô hiệu hóa hợp đồng do lừa dối.\n• **刑法** — báo警察 nếu yếu tố hình sự.\n• **振込詐欺救済法** — đảo ngược chuyển khoản nếu nhanh.\n\nXem guide **special-fraud-tokushu-sagi** + **banking-remittance-anti-fraud**.',
      documents: ['Hợp đồng', 'Chứng cứ nói dối / không nói', 'Receipts'],
      tip: 'Hết cooling-off KHÔNG có nghĩa hết quyền. Luật 消費者契約法 + 民法 vẫn bảo vệ. Gọi 188 ngay.',
    },
    {
      step: 4,
      title: 'Phòng ngừa — Tránh ký hợp đồng ép ngay từ đầu',
      description:
        '**Trước khi ký bất kỳ hợp đồng**:\n\n**1. Không bao giờ ký ngay**:\n• "Cho tôi suy nghĩ" (考えさせてください).\n• "Mang về xem lại" (家で見てから決めます).\n• "Hỏi vợ/chồng/gia đình" (家族と相談します).\n\n**2. Đọc kỹ trước khi ký**:\n• 重要事項説明書 — đọc hết.\n• Tổng tiền phải trả (gốc + lãi + phí).\n• Thời hạn + cách huỷ.\n• Penalty nếu huỷ.\n• Phí ẩn (登録料, 月会費, 解約料).\n\n**3. Cảnh báo đỏ — KHÔNG ký**:\n• Ép ký NGAY ("Khuyến mãi hết hôm nay").\n• Hứa "chắc chắn lãi" / "bảo đảm trúng".\n• Nói "ai cũng phải mua theo luật".\n• Không cho thời gian đọc.\n• Quà tặng đắt trước khi nghe sản phẩm.\n• Mời đến hội nghị / sự kiện rồi giữ lâu.\n\n**4. Khi nhân viên đến cửa**:\n\n• **Không mở cửa** với người không biết.\n• Nếu mở: "今、忙しいので帰ってください" (Bận, mời về).\n• KHÔNG cho vào nhà.\n• Không nghe nói chuyện ngoài hành lang quá lâu.\n• Nếu họ không về → gọi 警察 110 (不退去罪 có thể áp dụng).\n\n**5. Khi nhận điện thoại**:\n\n• Không xác minh tên / địa chỉ qua điện thoại.\n• "電話勧誘はお断りします" (Tôi từ chối tiếp thị qua điện thoại).\n• Cúp máy.\n• Đăng ký 番号通知 + chặn số.\n\n**6. Khi nhận SMS / email không quen**:\n\n• KHÔNG nhấn link.\n• KHÔNG cài app.\n• KHÔNG đưa thông tin cá nhân.\n• Xóa.\n\n**7. Kiểm tra công ty trước khi mua**:\n\n• Tìm tên công ty trên Google + "詐欺" / "苦情".\n• Kiểm tra 国民生活センター công bố (PIO-NET).\n• Kiểm tra 法人番号 (公的 corporate ID).\n\n**8. Đối với 投資 / 副業 hứa cao**:\n\n• Lợi nhuận >10%/năm với "bảo đảm" → CHẮC CHẮN lừa đảo.\n• Bitcoin / NFT / forex hứa lãi cao → cẩn thận.\n• Mạng lưới giới thiệu kiếm tiền → マルチ商法.',
      documents: [],
      tip: 'Nguyên tắc vàng: "Khuyến mãi chỉ hôm nay" = 99% lừa đảo. Tất cả ưu đãi thật có thể chờ ngày mai.',
    },
    {
      step: 5,
      title: 'Khi gặp nhân viên 188 / 消費生活センター — hỏi gì?',
      description:
        '**Khi gọi 188 lần đầu**:\n\n• Hỗ trợ tiếng Nhật chính.\n• 1 số 消費生活センター có phiên dịch tiếng Việt / Anh — hỏi trước.\n• Hoặc đi cùng người dịch.\n• Hoặc dùng Google Translate live.\n\n**Câu hỏi nên hỏi**:\n\n1. **"Trường hợp tôi có thuộc cooling-off không?"**\n2. **"Tôi cần làm gì cụ thể?"**\n3. **"Có template / mẫu thư không?"**\n4. **"Có nên gọi 弁護士 không?"**\n5. **"Có cách lấy lại tiền không?"**\n6. **"Họ có thể kiện tôi không?"**\n\n**Khi đi 消費生活センター trực tiếp**:\n\n• Mang hết tài liệu (hợp đồng, biên nhận, SMS).\n• Cuộc gặp ~30–60 phút.\n• Họ sẽ:\n  - Phân tích pháp lý.\n  - Đề xuất bước cụ thể.\n  - Hỗ trợ viết 内容証明.\n  - Trung gian với công ty (一部 trường hợp).\n\n**Nếu cần luật sư**:\n\n• 消費生活センター giới thiệu 弁護士会.\n• 法テラス cho thu nhập thấp.\n• Lần đầu tư vấn thường miễn phí 30 phút.\n• Đại diện đầy đủ: 50,000円+.\n\n**Lưu ý**:\n\n• 消費生活センター TƯ VẤN, không trực tiếp ép công ty.\n• Họ có thể trung gian nhưng không có quyền xét xử.\n• Quyết định cuối cùng vẫn là bạn / 弁護士 / tòa.\n\n**Quyền lợi của bạn**:\n\n• Tư vấn miễn phí KHÔNG GIỚI HẠN số lần.\n• Bảo mật thông tin.\n• Không bị phán xét — họ thấy hàng nghìn trường hợp giống bạn.',
      documents: ['Hợp đồng', 'Chứng cứ', 'Receipts', '在留カード'],
      tip: '188 là tài nguyên Nhật Bản dùng được cho người nước ngoài. Đừng ngại — họ ở đó để giúp.',
    },
  ],
};

export default consumerRightsCoolingOff;
