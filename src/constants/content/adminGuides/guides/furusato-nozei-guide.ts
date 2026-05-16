import type { AdminGuide } from '../../../../types/content';

const furusatoNozeiGuide: AdminGuide = {
  id: 'furusato-nozei-guide',
  category: 'money',
  lastVerified: '2026-05-09',
  priority: 'normal',
  title: 'Furusato Nouzei (ふるさと納税)',
  titleJp: 'ふるさと納税の仕組みと申込',
  icon: 'storefront-outline',
  color: '#E67E22',
  description:
    'ふるさと納税 là chương trình "đóng thuế quê hương" — bạn quyên góp cho 自治体 (tỉnh/thành phố) tự chọn, đổi lại được giảm thuế năm sau (住民税 + 所得税) và nhận quà cảm ơn (返礼品) địa phương. Phí cố định 2,000円/năm; phần còn lại trong 控除限度額 được khấu trừ thuế. Người Việt sống ở Nhật có 住民票 + nộp thuế tại Nhật ĐỀU dùng được. KHÔNG phải đầu tư — đây là chuyển hướng thuế bạn đằng nào cũng phải đóng + nhận quà.',
  searchKeywords: [
    'furusato nouzei',
    'ふるさと納税',
    'đóng thuế quê hương',
    'giảm thuế',
    'quà thuế',
    '返礼品',
    '住民税',
    '所得税',
    '控除',
    'ワンストップ特例',
    '確定申告',
    '寄附金控除',
    '楽天ふるさと納税',
    'さとふる',
    'ふるなび',
    'shimasu',
    'kifu',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      'ふるさと納税 do 総務省 quản lý cấp quốc gia, áp dụng cho mọi người có 住民票 + nộp 住民税 / 所得税 tại Nhật. 国税庁 + 市町村 xử lý phần khấu trừ thuế. Quy tắc 自己負担 2,000円 + 控除限度額 (tùy thu nhập + gia cảnh) tương đối ổn định trong nhiều năm. Một số 自治体 có 制限 cho 返礼品 (giá trị tối đa 30% giá trị quyên góp theo quy định 総務省). Phí + ngưỡng có thể đổi — kiểm tra trang chính thức hàng năm.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'low',
    whenToAskExpert: [
      'Thu nhập phức tạp (lương + 副業 + đầu tư + bất động sản) — 控除限度額 tính phức tạp hơn người chỉ có lương. Hỏi 税理士 hoặc dùng simulator của 国税庁 / nền tảng lớn.',
      'Năm có sự kiện đặc biệt (kết hôn / sinh con / mất việc / mua nhà) — thu nhập + gia cảnh đổi giữa năm có thể ảnh hưởng 控除限度額. Tính lại trước khi quyên góp lớn.',
      'Quyên >5 自治体 trong 1 năm — KHÔNG dùng được ワンストップ特例. Phải làm 確定申告.',
    ],
  },
  quickAction: {
    deadline:
      'Mỗi năm tài chính (1/1 – 31/12). Quyên trong năm đó — khấu trừ áp dụng cho năm sau (住民税 từ tháng 6 năm sau). Cuối năm (12/31 23:59) là deadline cuối cho quyên góp năm đó.',
    office:
      'Online qua nền tảng lớn: 楽天ふるさと納税, さとふる, ふるなび, ふるさとチョイス. Trang chính thức từng 自治体 cũng có thể quyên trực tiếp (ít phổ biến vì không có catalog 返礼品).',
    doNow: [
      'Tính 控除限度額 của bạn — dùng simulator trên 楽天ふるさと納税 / さとふる. Nhập: thu nhập năm, gia cảnh, các khấu trừ khác. Kết quả là số tiền tối đa quyên góp mà vẫn được khấu trừ thuế.',
      'Chọn 返礼品 (gạo, thịt bò, hải sản, hoa quả, đồ điện) trong giới hạn. Đa số nền tảng cho lọc theo 自治体 / loại hàng / giá trị / hạn vận chuyển.',
      'Quyên góp + thanh toán bằng thẻ tín dụng. Lưu giấy biên nhận điện tử + 寄附金受領証明書 (sẽ đến qua email hoặc bưu điện).',
      'Chọn cách khấu trừ: ワンストップ特例 (đơn giản, ≤ 5 自治体, không cần 確定申告) HOẶC 確定申告 (phức tạp hơn, ≥ 6 自治体 hoặc có lý do khác phải làm).',
      'Năm sau: kiểm tra 住民税 thông báo từ 市役所 (tháng 5–6). Phần khấu trừ ふるさと納税 sẽ giảm 住民税 hàng tháng.',
    ],
    bring: [
      'Thẻ tín dụng (cá nhân, không phải công ty)',
      'Số liệu thu nhập năm hiện tại (源泉徴収票 hoặc estimate)',
      'マイナンバー (12 chữ số) — cho ワンストップ特例',
      'Email + địa chỉ giao 返礼品',
      'Smartphone hoặc PC để dùng simulator + nền tảng',
    ],
    ifLate:
      'Quyên qua deadline 12/31 năm này → tính cho năm sau, không backdate. KHÔNG có cách "claim retro" — chỉ planning forward được. Cuối năm (tháng 11–12) nền tảng đông + 返礼品 hết hàng nhanh — quyên sớm hơn thuận lợi hơn.',
    officialSourceLabels: ['総務省 — ふるさと納税ポータル'],
  },
  whoIsThisFor: [
    'Người Việt có 住民票 ở Nhật + đang đóng 住民税 / 所得税.',
    'Người mới biết về ふるさと納税 và muốn thử lần đầu.',
    'Người đã quyên năm trước nhưng muốn tối ưu (tăng số 自治体, đổi 返礼品).',
    'KHÔNG áp dụng cho: người không nộp thuế tại Nhật (ví dụ thu nhập từ Việt Nam, không có 住民票 Nhật).',
    'Hạn chế: nếu thu nhập rất thấp (vd ≤ 100万円/năm), 控除限度額 cũng thấp → ít có lợi. Simulator cho biết.',
  ],
  whenToDo: [
    'Đầu năm (tháng 1–3): tính 控除限度額 dự kiến cho năm.',
    'Tháng 4–10: quyên dần + nhận 返礼品. Nhiều 季節 đặc sản (mùa hè: thịt nướng, mùa thu: nho/táo, cuối năm: cua/tôm).',
    'Tháng 11–12: nếu chưa dùng hết 控除限度額, gần Tết Tây quyên thêm. Cẩn thận hết hàng.',
    '12/31 23:59 cuối: deadline tuyệt đối cho năm này.',
    'Tháng 1 năm sau: nộp 申請書 cho ワンストップ特例 (nếu chọn cách này).',
    'Tháng 2–3 năm sau: làm 確定申告 (nếu chọn cách này).',
    'Tháng 5–6 năm sau: kiểm tra thông báo 住民税 — phần khấu trừ ふるさと納税.',
  ],
  whereToDo: [
    'Online qua nền tảng: 楽天ふるさと納税 (tích điểm Rakuten), さとふる, ふるなび, ふるさとチョイス, au PAY ふるさと納税, etc.',
    'Trang chính thức 自治体: ít phổ biến cho người mới — không có catalog đẹp.',
    'KHÔNG cần đến 市役所 trực tiếp — toàn bộ online.',
  ],
  estimatedTime:
    'Tính 控除限度額: 5–15 phút trên simulator. Chọn + quyên 1 自治体: 5–10 phút. ワンストップ特例 申請書: 10–15 phút điền + nộp qua bưu điện. 確定申告: 1–3 giờ nếu lần đầu.',
  fees: [
    '**自己負担 (chi phí thực tế của bạn): 2,000円/năm** (cố định, không phụ thuộc số lần quyên).',
    'Phần còn lại trong 控除限度額 được khấu trừ 100% (chia cho 住民税 và 所得税 — quy định cụ thể tùy thu nhập).',
    '**Vd**: thu nhập trung bình + đóng 50,000円 quyên góp → tự gánh 2,000円, 48,000円 được khấu trừ → vẫn nhận 返礼品 trị giá đến ~30% × 50,000 = 15,000円.',
    'KHÔNG tự gánh thêm phí giao 返礼品 — đã bao gồm trong quyên góp.',
    'Vượt 控除限度額: phần dư KHÔNG được khấu trừ → tự gánh 100%. Tính kỹ trước khi quyên.',
  ],
  documentsChecklist: [
    { label: 'Số liệu thu nhập', required: true, note: '源泉徴収票 năm trước + estimate năm hiện tại nếu thu nhập đổi.' },
    { label: 'Thẻ tín dụng cá nhân', required: true, note: 'Đa số nền tảng nhận thẻ tín dụng. Một số có 銀行振込 nhưng phức tạp hơn.' },
    { label: 'マイナンバー (12 chữ số)', required: false, note: 'Cần nếu dùng ワンストップ特例.' },
    { label: '寄附金受領証明書', required: false, note: 'Tự đến — email hoặc bưu điện. Giữ kỹ cho 確定申告.' },
    { label: 'ワンストップ特例 申請書', required: false, note: 'Mỗi 自治体 cần 1 form riêng. Nền tảng thường gửi sẵn — bạn ký + dán マイナンバーカード photo + gửi bưu điện.' },
  ],
  commonMistakes: [
    'Quyên trước khi tính 控除限度額 → vượt giới hạn, không được khấu trừ phần dư.',
    'Quên đóng deadline 12/31 → tính sang năm sau.',
    'Quyên >5 自治体 mà nộp ワンストップ特例 → không được khấu trừ. Phải đổi sang 確定申告 (nộp tháng 2–3 năm sau).',
    'Không nộp ワンストップ特例 申請書 trong tháng 1 năm sau → mất quyền khấu trừ.',
    'Tin "lãi suất" — KHÔNG phải đầu tư. Là chuyển hướng thuế đã phải đóng + nhận quà cảm ơn.',
    'Chọn 返礼品 hết hạn nhanh (vd thịt tươi) khi đi du lịch / không có nhà nhận → mất quà.',
    'Không lưu 寄附金受領証明書 → khó claim khi 確定申告 hoặc khi 国税庁 yêu cầu xác minh.',
    'Dùng thẻ tín dụng người khác (bố mẹ / vợ chồng) → chủ thẻ là người được khấu trừ thuế, không phải bạn.',
  ],
  faq: [
    {
      question: 'Thu nhập tôi 400万円, gia đình 4 người (vợ + 2 con) — quyên được bao nhiêu?',
      answer:
        'Cụ thể tùy: 配偶者 có thu nhập không, con dưới 16 tuổi hay không, các khấu trừ khác (生命保険, 医療費, etc.). Dùng simulator trên 楽天ふるさと納税 / さとふる: nhập số liệu → ra 控除限度額. Range thông thường cho thu nhập 400万円 + family-of-4 thường từ 30,000–60,000円/năm — nhưng KIỂM TRA simulator vì có thể khác.',
    },
    {
      question: 'ワンストップ特例 và 確定申告 khác nhau thế nào?',
      answer:
        '**ワンストップ特例**:\n• Điều kiện: ≤ 5 自治体 + KHÔNG có lý do khác phải 確定申告.\n• Quy trình: gửi 申請書 + マイナンバー photo cho mỗi 自治体 trong tháng 1 năm sau.\n• Ưu: đơn giản. KHÔNG cần làm 確定申告.\n• Nhược: chỉ khấu trừ vào 住民税 (không vào 所得税).\n\n**確定申告**:\n• Điều kiện: bất kỳ tình huống nào.\n• Quy trình: tổng hợp 寄附金受領証明書 + báo trên form 確定申告 trong tháng 2–3.\n• Ưu: linh hoạt. Khấu trừ cả 住民税 + 所得税 (tổng số tiền giống ワンストップ nhưng phân bổ khác).\n• Nhược: phức tạp hơn, cần biết làm 確定申告.\n\nTổng tiền khấu trừ giống nhau giữa 2 cách. Chọn 1 trong 2.',
    },
    {
      question: 'Tôi mới sang Nhật đầu năm — có thể quyên ngay không?',
      answer:
        'Có thể, nhưng cẩn thận. ふるさと納税 dựa trên 住民税 năm đó (do 市役所 tính dựa trên thu nhập năm trước). Nếu năm trước bạn ở Việt Nam (không có 住民税 ở Nhật) → 住民税 năm nay vẫn là 0 hoặc thấp → 控除限度額 thấp.\n\nTốt nhất: năm thứ 2 trở đi (khi 住民税 phản ánh thu nhập trọn năm ở Nhật) — tận dụng tốt hơn. Năm đầu: quyên ít, thử quy trình.',
    },
    {
      question: 'Vợ/chồng tôi không đi làm — có quyên được không?',
      answer:
        'Người không có thu nhập (vd 配偶者 ở nhà) KHÔNG quyên hiệu quả vì không có thuế để giảm. Người có thu nhập trong gia đình (chủ kinh tế) là người quyên + đứng tên thẻ tín dụng + nhận khấu trừ.\n\nNếu cả 2 đều đi làm: mỗi người có 控除限度額 riêng theo thu nhập riêng. Có thể quyên độc lập + tổng giảm thuế cao hơn.',
    },
    {
      question: 'Tôi sắp về Việt Nam vĩnh viễn — vẫn quyên được không?',
      answer:
        'Năm tài chính bạn về VN (vd về tháng 6/2026): bạn vẫn ở Nhật nửa năm + có thu nhập + đóng thuế. Quyên 1/2 năm OK. Nhưng:\n\n• Sau khi rời Nhật (mất 住民票): KHÔNG quyên được nữa.\n• Khấu trừ 住民税 năm sau: do bạn không còn ở Nhật, cần tính kỹ với 市役所 — có thể nhận lại phần tiền đã đóng dư qua 確定申告 trước khi rời.\n\nTrường hợp này phức tạp — hỏi 税理士 trước khi rời.',
    },
  ],
  counterPhrases: [
    {
      jp: 'ふるさと納税をしたいです。',
      romaji: 'Furusato nouzei o shitai desu.',
      vn: 'Tôi muốn làm ふるさと納税.',
      note: 'Câu mở đầu — đa số quy trình là online, không cần nói trực tiếp. Câu này dùng khi hỏi đồng nghiệp / nhân viên 市役所.',
    },
    {
      jp: '控除限度額はいくらですか。',
      romaji: 'Koujo gendogaku wa ikura desu ka.',
      vn: 'Hạn mức khấu trừ của tôi là bao nhiêu?',
      note: 'Hỏi 税理士 hoặc tự dùng simulator.',
    },
    {
      jp: 'ワンストップ特例を使いたいです。',
      romaji: 'Wansutoppu tokurei o tsukaitai desu.',
      vn: 'Tôi muốn dùng ワンストップ特例.',
      note: 'Khi liên hệ 自治体 hỏi gửi giấy gì.',
    },
    {
      jp: '寄附金受領証明書を送ってください。',
      romaji: 'Kifukin juryou shoumeisho o okutte kudasai.',
      vn: 'Xin gửi giấy chứng nhận nhận quyên góp cho tôi.',
      note: 'Yêu cầu 自治体 nếu chưa gửi sau 1–2 tháng.',
    },
    {
      jp: '返礼品はいつ届きますか。',
      romaji: 'Henreihin wa itsu todokimasu ka.',
      vn: 'Quà sẽ đến khi nào?',
      note: 'Hỏi 自治体 — có 返礼品 cần đặt trước (vd hải sản theo mùa).',
    },
    {
      jp: '確定申告で申請します。',
      romaji: 'Kakutei shinkoku de shinsei shimasu.',
      vn: 'Tôi sẽ kê khai qua 確定申告.',
      note: 'Khi không dùng ワンストップ特例.',
    },
    {
      jp: '住民税の控除はいつから始まりますか。',
      romaji: 'Juuminzei no koujo wa itsu kara hajimarimasu ka.',
      vn: 'Khấu trừ 住民税 bắt đầu từ khi nào?',
      note: 'Hỏi 市役所 — thường từ tháng 6 năm sau.',
    },
  ],
  keyTerms: [
    {
      term: 'ふるさと納税',
      reading: 'ふるさとのうぜい',
      meaningVi: '"đóng thuế quê hương" (quyên góp cho địa phương + giảm thuế + nhận quà)',
      noteVi: 'KHÔNG phải đầu tư. Là cách chuyển hướng thuế bạn đằng nào cũng phải đóng + được quà địa phương (gạo, thịt bò Wagyu, hải sản, trái cây…). Phí cố định 2,000円/năm; trong 控除限度額 thì phần còn lại được khấu trừ thuế. Áp dụng cho mọi cư dân Nhật (kể cả người Việt) có 住民票 + nộp thuế.',
    },
    {
      term: '控除限度額',
      reading: 'こうじょげんどがく',
      meaningVi: 'mức tối đa được khấu trừ thuế trong năm',
      noteVi: 'Phụ thuộc thu nhập + tình trạng (kết hôn, có con, người phụ thuộc). Người độc thân lương 400万: ~42,000円; lương 600万: ~77,000円; lương 800万: ~129,000円. Vượt limit → phần dư KHÔNG được khấu trừ (vẫn được quà nhưng coi như mất tiền). Dùng シミュレーター trên trang ふるなび / さとふる / 楽天 trước khi donate.',
    },
    {
      term: 'ワンストップ特例',
      reading: 'ワンストップとくれい',
      meaningVi: 'cách làm ふるさと納税 mà KHÔNG cần 確定申告',
      noteVi: 'Điều kiện: (1) Đi làm công ty có 年末調整 (KHÔNG tự kinh doanh / freelancer); (2) Donate ≤ 5 自治体 trong năm; (3) Nộp 寄附金税額控除に係る申告特例申請書 trong 1/10 năm sau cho TỪNG 自治体. Khấu trừ chỉ vào 住民税 (không vào 所得税). Gửi sai/thiếu/quá 5 自治体 → vẫn phải 確定申告.',
    },
    {
      term: '寄附金受領証明書',
      reading: 'きふきんじゅりょうしょうめいしょ',
      meaningVi: 'giấy chứng nhận đã quyên góp (cho khai thuế)',
      noteVi: '自治体 gửi qua bưu điện sau khi nhận tiền — 1-3 tháng tuỳ nơi. CẦN cho 確定申告 nếu KHÔNG dùng ワンストップ. GIỮ KỸ — mất = phải xin 自治体 cấp lại (~1 tháng). Nếu dùng portal lớn (ふるなび / 楽天 / さとふる) → có thể dùng XML certificate online thay giấy.',
    },
    {
      term: '返礼品',
      reading: 'へんれいひん',
      meaningVi: 'quà cảm ơn của địa phương',
      noteVi: 'Tỉ lệ ≤ 30% số tiền donate (theo 総務省 quy định). Quà phổ biến: gạo, thịt bò, hải sản, trái cây theo mùa, đồ thủ công địa phương. Một số 自治体 có quà gift card / coupon Amazon (rất ít vì 総務省 hạn chế). Chọn theo nhu cầu thực — donate vì quà KHÔNG có giá trị nếu quá hạn mức.',
    },
    {
      term: '寄附金税額控除',
      reading: 'きふきんぜいがくこうじょ',
      meaningVi: 'khấu trừ thuế từ tiền quyên góp',
      noteVi: 'Khấu trừ vào 住民税 + 所得税 (2,000円 đầu KHÔNG được trừ — đó là phí cố định). Bắt đầu áp dụng: 住民税 từ tháng 6 năm sau; 所得税 hoàn vào tài khoản qua 確定申告 (1-2 tháng sau khai). Với ワンストップ: chỉ vào 住民税.',
    },
  ],
  officialLinks: [
    { label: '総務省 — ふるさと納税ポータル', url: 'https://www.soumu.go.jp/' },
    { label: '国税庁', url: 'https://www.nta.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Tính 控除限度額 (hạn mức khấu trừ)',
      description:
        'Trước khi quyên, BẮT BUỘC tính giới hạn để không vượt:\n\n1. Vào nền tảng lớn (楽天ふるさと納税, さとふる, ふるなび) → tìm "控除限度額シミュレーター".\n2. Nhập:\n• Thu nhập năm dự kiến (給与収入)\n• Gia cảnh (有/無 配偶者, số con dưới/trên 16 tuổi)\n• Các khấu trừ khác (社会保険料, 生命保険料控除, 医療費控除, 住宅ローン控除, etc.)\n3. Kết quả: số tiền tối đa quyên + lượng khấu trừ thực tế.\n\n**Quy tắc**: 自己負担 cố định 2,000円/năm. Phần trong 限度額 = khấu trừ. Phần vượt = tự gánh 100%, mất tiền.\n\n**Lưu ý**: simulator chỉ là estimate. Số chính xác chỉ biết khi 確定申告 năm sau. An toàn: quyên ≤ 90% kết quả simulator để có buffer.',
      documents: [
        '源泉徴収票 năm trước',
        'Estimate thu nhập năm hiện tại',
      ],
      tip: 'Thu nhập dự kiến nên LẤY thấp hơn estimate (vd nếu nghĩ năm nay 500万円, dùng 480万円 trong simulator) — phòng khi có thay đổi cuối năm.',
    },
    {
      step: 2,
      title: 'Chọn nền tảng + 自治体 + 返礼品',
      description:
        'Nền tảng phổ biến + đặc trưng:\n\n• **楽天ふるさと納税**: tích điểm Rakuten cao (vd 5–10x trong sự kiện 楽天マラソン). Nhiều 自治体.\n• **さとふる**: giao diện sạch, lọc nhanh. Nhiều ưu đãi.\n• **ふるなび**: có thưởng Amazon Gift cho lần đầu.\n• **ふるさとチョイス**: nhiều 自治体 nhất, độc quyền với một số.\n• **au PAY ふるさと納税**: tích điểm au.\n\nChọn 自治体 + 返礼品:\n• Lọc theo: loại hàng (gạo, thịt, hải sản, hoa quả, sake, đồ điện), giá quyên (5,000–100,000円+), 自治体, hạn vận chuyển.\n• Đọc review.\n• Chú ý: "regular" 返礼品 = giao 1 lần. "定期便" = giao nhiều tháng (vd thịt bò 6 tháng).\n\nKhông quyên cho 自治体 mình đang sống — 返礼品 từ 自治体 mình ở thường KHÔNG được nhận.',
      documents: [
        'Thẻ tín dụng',
        'Email + địa chỉ giao',
      ],
      tip: 'Đăng ký 楽天 trước nếu chưa có — tích điểm Rakuten dùng được rộng. Sự kiện 楽天マラソン (3–4 lần/năm) là dịp tốt.',
    },
    {
      step: 3,
      title: 'Quyên góp + nhận 寄附金受領証明書',
      description:
        'Tại nền tảng:\n\n1. Thêm 返礼品 vào giỏ → checkout.\n2. Điền:\n• Tên người quyên (chủ thẻ tín dụng).\n• Địa chỉ + email.\n• Cách khấu trừ thuế: ワンストップ特例 hay 確定申告.\n• Yêu cầu 寄附金受領証明書 (default = có).\n3. Thanh toán bằng thẻ tín dụng.\n\nSau 1–4 tuần:\n• 返礼品 đến nhà (theo lịch giao).\n• 寄附金受領証明書 đến qua email hoặc bưu điện — **GIỮ KỸ**.\n\n**Nếu chọn ワンストップ特例**: 自治体 thường gửi sẵn 申請書 + bao thư trả lại trong gói. Điền + ký + dán マイナンバーカード photo + gửi bưu điện trong tháng 1 năm sau.',
      documents: [
        'Thẻ tín dụng',
        'マイナンバーカード hoặc 通知カード + giấy tờ tùy thân (cho ワンストップ特例)',
      ],
      tip: 'Lưu 寄附金受領証明書 vào folder riêng trên cloud — hoặc chụp ảnh ngay khi nhận. Mất giấy này = phải xin lại từ 自治体.',
    },
    {
      step: 4,
      title: 'Nộp ワンストップ特例 hoặc 確定申告',
      description:
        '**Lựa chọn 1: ワンストップ特例 (đơn giản)**:\n\n• Điều kiện: ≤ 5 自治体 + KHÔNG có lý do khác phải 確定申告 (vd 副業 thu nhập cao, mua nhà, sell stock có lãi lớn).\n\n• Quy trình:\n1. Cho mỗi 自治体: điền 申請書 (có sẵn từ nền tảng / 自治体 gửi).\n2. Dán photo マイナンバーカード (mặt trước + sau) hoặc 通知カード + giấy tùy thân.\n3. Gửi bưu điện đến 自治体 trong **tháng 1 năm sau**.\n4. Khấu trừ tự động vào 住民税 từ tháng 6 năm sau.\n\n**Lựa chọn 2: 確定申告 (phức tạp hơn)**:\n\n• Khi: > 5 自治体 hoặc có lý do khác phải 確定申告 (xem guide kakutei-shinkoku).\n• Quy trình: tổng hợp tất cả 寄附金受領証明書 → báo trong section 寄附金控除 của form 確定申告 → nộp tại 税務署 hoặc online qua e-Tax trong tháng 2–3.\n• Khấu trừ: phần được trả lại qua tài khoản trong 1–2 tháng + 住民税 năm sau cũng giảm.',
      documents: [
        'ワンストップ特例 申請書 (mỗi 自治体)',
        'マイナンバーカード photo',
        'Hoặc: 寄附金受領証明書 cho 確定申告',
      ],
      tip: 'Quyên gần deadline 12/31 nên chọn 確定申告 — ワンストップ特例 申請書 phải đến 自治体 trong tháng 1 (deadline 1/10 thường), gửi cuối năm có thể không kịp.',
    },
    {
      step: 5,
      title: 'Kiểm tra khấu trừ năm sau',
      description:
        'Năm sau:\n\n1. **Tháng 5–6**: 市役所 gửi 住民税決定通知書 (thông báo 住民税 năm này). Đọc kỹ:\n• Section "寄附金税額控除" — phần khấu trừ ふるさと納税.\n• Đối chiếu: số bạn quyên năm trước (trừ 2,000円) ≈ số khấu trừ.\n• Nếu sai → liên hệ 市役所 (mang 寄附金受領証明書 + thông báo).\n\n2. **Nếu dùng 確定申告**: 国税庁 trả lại 所得税 đã đóng dư vào tài khoản trong 1–2 tháng sau khi nộp 確定申告.\n\n3. **Lưu giấy**: 寄附金受領証明書 + 住民税決定通知書 ít nhất 5 năm — phòng khi 国税庁 audit.\n\n**Lưu ý**: tổng tiền giảm thuế = số quyên − 2,000円. KHÔNG bao giờ giảm nhiều hơn (đó là quy tắc).',
      documents: [
        '寄附金受領証明書',
        '住民税決定通知書',
      ],
      tip: 'Đặt nhắc nhở "Kiểm tra 住民税決定通知書" tháng 6 hàng năm — đảm bảo khấu trừ đúng. Sai lệch hiếm nhưng có thể xảy ra.',
    },
    {
      step: 6,
      title: 'Tối ưu năm sau — strategy',
      description:
        'Sau lần đầu, có thể tối ưu:\n\n1. **Tích điểm**: chọn nền tảng theo điểm thưởng phù hợp lối sống của bạn (Rakuten, au PAY, dPoint).\n\n2. **Sự kiện sale**: 楽天マラソン (3–4 lần/năm), Black Friday, cuối năm — quyên trong sự kiện điểm cao.\n\n3. **Quà theo mùa**:\n• Mùa hè: thịt nướng, bia\n• Mùa thu: nho, táo, gạo mới\n• Cuối năm: cua, tôm hùm, おせち\n\n4. **定期便**: quyên 1 lần, nhận quà nhiều tháng — giảm stress chọn lựa.\n\n5. **Đa dạng 自治体**: mỗi 自治体 có đặc sản riêng. Quyên rộng để khám phá Nhật.\n\n6. **Vợ chồng cùng quyên**: mỗi người có 控除限度額 riêng nếu cả 2 đi làm. Tổng family quyên gấp đôi.\n\n7. **Theo dõi giới hạn**: tracker trên Excel hoặc app — không vượt 限度額.',
      documents: [],
      tip: 'Năm 2 trở đi quen quy trình → quyên thoải mái + tận dụng tốt 限度額. Năm đầu: thử 1–2 lần để hiểu.',
    },
  ],
};

export default furusatoNozeiGuide;
