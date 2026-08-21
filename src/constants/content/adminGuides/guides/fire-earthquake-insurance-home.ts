import type { AdminGuide } from '../../../../types/content';

const fireEarthquakeInsuranceHome: AdminGuide = {
  id: 'fire-earthquake-insurance-home',
  category: 'money',
  lastVerified: '2026-08-21',
  priority: 'normal',
  title: 'Bảo hiểm hỏa hoạn + động đất cho nhà thuê / nhà ở',
  titleJp: '火災保険・地震保険 — 賃貸・持ち家',
  icon: 'flame-outline',
  color: '#E67E22',
  description:
    '火災保険 (bảo hiểm hỏa hoạn) gần như bắt buộc khi thuê nhà ở Nhật — chủ nhà/bất động sản yêu cầu ký lúc ký 賃貸借契約. Bảo hiểm này gồm 3 phần thường gặp: bảo hiểm cháy/nước/trộm cho **家財** (đồ đạc), trách nhiệm với chủ nhà (**借家人賠償**), và trách nhiệm với hàng xóm (**個人賠償**). **地震保険** là phụ thêm riêng — KHÔNG có sẵn trong 火災保険, phải mua kèm để được bồi thường khi động đất gây cháy/sập (luật 失火責任法 + 地震保険法).',
  searchKeywords: [
    'bảo hiểm hỏa hoạn',
    'bảo hiểm động đất',
    'bảo hiểm nhà thuê',
    'kasai hoken',
    'jishin hoken',
    '火災保険',
    '地震保険',
    '家財保険',
    '借家人賠償',
    '個人賠償',
    '失火責任法',
    '賃貸契約',
    'cháy nhà thuê',
    'động đất nhà thuê',
    'bồi thường chủ nhà',
    'trộm đồ đạc',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      'Luật 火災保険 + 地震保険 do 金融庁 (FSA) quản lý + 損害保険料率算出機構 (GIROJ) tính phí. 失火責任法 (1899) quy định: người vô ý gây cháy KHÔNG phải bồi thường hàng xóm trừ khi 重大過失 — nên hàng xóm có thể bị cháy mà không được đòi bồi thường, do đó tự mua 火災保険 là cần thiết. 地震保険 không phải bảo hiểm tư mà là 国 + bảo hiểm hợp tác — có 限度額.',
    sourceVerifiedAt: '2026-08-21',
    nextReviewAt: '2026-12-01',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Mua nhà / chung cư riêng — cần bảo hiểm 建物 + 家財 + 地震 + 各種特約 phức tạp. Tư vấn với 損害保険代理店 chuyên.',
      'Bồi thường lớn (cháy sập nhà, động đất major) — hỏi 弁護士 hoặc 損害保険登録鑑定人.',
      'Tranh chấp với 保険会社 từ chối chi trả — gọi 損害保険紛争解決センター hoặc 188 (国民生活センター).',
    ],
  },
  quickAction: {
    deadline:
      'Khi ký 賃貸借契約 thuê nhà — chủ nhà / bất động sản gần như luôn yêu cầu 火災保険 trong gói契約 (thường 2 năm/lần, 15,000–25,000円/2 năm cho căn hộ đơn). KHÔNG có deadline mua riêng — nhưng phải có hiệu lực trước ngày nhận nhà.',
    office:
      '**保険会社 損害保険** lớn: 東京海上日動, 損保ジャパン, 三井住友海上, あいおいニッセイ同和, etc. **共済** (giá rẻ hơn): 全労済 (こくみん共済), 都道府県民共済, CO-OP. **不動産屋** (bất động sản): thường giới thiệu gói có sẵn — tiện nhưng có thể đắt hơn tự mua.',
    doNow: [
      'Đọc kỹ 重要事項説明書 trước khi ký — xem 3 phần: **家財** (đồ đạc), **借家人賠償** (đền chủ nhà), **個人賠償** (đền hàng xóm).',
      'Hỏi: có **地震保険** kèm không? Nếu không — bổ sung riêng (thường +30–50% phí).',
      'So sánh giá với 共済 hoặc bảo hiểm tự mua online (vd 楽天損保, セコム) — có thể rẻ hơn 30–50% so với gói bất động sản giới thiệu.',
      'Lấy 保険証券 (giấy chứng nhận) khi mua — đọc lại đảm bảo đúng địa chỉ + giá trị bảo hiểm.',
      'Lưu số 事故受付 24/7 + 約款 + 証券 trong điện thoại + Cloud — khi xảy ra sự cố là gọi ngay.',
    ],
    bring: [
      '賃貸借契約書 (hợp đồng thuê nhà)',
      '在留カード',
      'Thông tin tài khoản ngân hàng (cho thanh toán)',
      'Danh sách đồ giá trị trong nhà (TV, laptop, jewelry — ước tính tổng)',
      '印鑑 nếu yêu cầu (đa số dùng signature)',
    ],
    ifLate:
      'Đã ở mà chưa có bảo hiểm → mua ngay. Nếu sự cố xảy ra trước khi có bảo hiểm → tự chịu 100%. Cháy nhà thuê + không có 借家人賠償 → có thể đền chủ nhà 5–20 triệu yên. Đừng để trống.',
    officialSourceLabels: ['金融庁 (FSA) — 保険業'],
  },
  whoIsThisFor: [
    'Người Việt thuê nhà ở Nhật — phải có 火災保険 trong契約.',
    'Người sở hữu chung cư / nhà riêng — bảo hiểm 建物 + 家財 + 地震 quan trọng.',
    'Người vừa chuyển nhà — gia hạn / chuyển bảo hiểm theo địa chỉ mới.',
    'Người sống ở khu rủi ro động đất / lũ lụt / núi lửa cao (xem hazard map) — cân nhắc đóng phí cao hơn cho 地震 + 水災 特約.',
    'Người có đồ giá trị (jewelry, đồng hồ, máy ảnh, máy tính cao cấp) — cần khai đúng giá trị bảo hiểm.',
    'KHÔNG dành cho: người ở dorm công ty / 寮 — chủ thường có bảo hiểm tập thể (hỏi nhân sự).',
  ],
  whenToDo: [
    'Trước ngày nhận nhà mới — bảo hiểm phải có hiệu lực ngày đầu.',
    'Mỗi 2 năm — gia hạn (đa số契約 2 năm). Bất động sản nhắc trước 1–2 tháng.',
    'Sau khi mua đồ giá trị lớn (>500,000円) — xem có cần nâng giới hạn 家財 không.',
    'Sau khi chuyển nhà — đổi địa chỉ + gia trị bảo hiểm theo nhà mới.',
    'Sau khi xảy ra sự cố — báo 事故 trong 60 ngày (thường) để được chi trả. Trì hoãn quá có thể bị từ chối.',
    'Trước mùa bão / mưa lớn (tháng 6–10) — kiểm tra có 水災特約 không nếu sống vùng lũ.',
  ],
  whereToDo: [
    '**Bất động sản 不動産屋** — thường có gói có sẵn (vd 日本少額短期保険, アイアル), thuận tiện nhưng có thể đắt hơn 30%.',
    '**Các 保険会社 lớn**: 東京海上日動, 損保ジャパン, 三井住友海上, あいおいニッセイ同和, AIG損保 — ofreces qua đại lý hoặc online.',
    '**共済 (hợp tác xã bảo hiểm)** rẻ hơn:\n• 全労済 (こくみん共済 coop): 賃貸タイプ ~6,000–10,000円/năm.\n• 都道府県民共済: ~12,000–24,000円/năm.\n• 大学生協 (cho sinh viên).\n• Co-op (生協).',
    '**Online (rẻ + tiện)**: 楽天損保, セコム損保, ソニー損保 — so sánh trên 価格.com, 保険スクエアbang, 保険の窓口 online.',
    '**Lưu ý**: 不動産屋 đôi khi YÊU CẦU dùng gói của họ — bạn có quyền từ chối và mua bảo hiểm khác miễn là điều kiện đáp ứng yêu cầu chủ nhà (借家人賠償 + giá trị bảo hiểm tối thiểu).',
  ],
  estimatedTime:
    'So sánh + chọn: 30 phút – 2 giờ. Ký hợp đồng + thanh toán: 30 phút – 1 giờ. Nhận 保険証券: ngay tại điểm mua hoặc qua bưu điện 1–2 tuần. Khi sự cố: báo 事故 ngay (5–10 phút điện thoại), giám định + chi trả 2 tuần – 2 tháng tùy mức độ.',
  fees: [
    '**Căn hộ 1人暮らし (1 phòng)**:\n• Gói bất động sản giới thiệu: 15,000–25,000円/2 năm.\n• 共済 (こくみん共済): 6,000–10,000円/năm = 12,000–20,000円/2 năm.\n• Online tự mua: 4,000–12,000円/năm.',
    '**Gia đình 3–4 người (2LDK–3LDK)**:\n• 15,000–35,000円/năm tùy giá trị 家財 khai báo.',
    '**Nhà sở hữu (建物 + 家財 + 地震)**:\n• Phí biến động lớn theo:\n  - Khu vực rủi ro (Tokyo / Kanagawa / Aichi / Osaka đắt hơn rural).\n  - 構造 (RC > 鉄骨 > 木造).\n  - 築年数.\n  - Giá trị bảo hiểm.\n• 火災保険 nhà 木造 30 năm: 50,000–150,000円/năm.\n• 地震保険 thêm: 30–50% phí 火災保険.',
    '**地震保険 phí 2024–2026**:\n• Là **bảo hiểm 国 + hợp tác** — phí cố định toàn quốc nhưng phụ thuộc 都道府県 (8 nhóm rủi ro).\n• Tokyo / Kanagawa / Shizuoka rất đắt vì 南海トラフ rủi ro.\n• Rural Hokkaido / Tohoku rẻ hơn.\n• 限度額: 建物 max 50,000,000円, 家財 max 10,000,000円.\n• Chi trả: 全損 100%, 大半損 60%, 小半損 30%, 一部損 5% giá trị bảo hiểm.',
    '**割引 (giảm giá)**:\n• 建築年割引: nhà mới sau 1981 (新耐震基準) giảm 10–50%.\n• 耐震等級割引: nhà có 1–3 cấp 耐震 — giảm 10–50%.\n• 免震建築物割引: nhà 免震 — giảm 50%.\n• Mua online: thường giảm 5–10%.',
    'Phí chính xác cho bạn — báo giá nhiều chỗ + so sánh.',
  ],
  documentsChecklist: [
    { label: '賃貸借契約書 (hợp đồng thuê)', required: true, note: 'Cần thông tin địa chỉ + thời hạn + chủ nhà.' },
    { label: '在留カード', required: true, note: 'Xác minh ID.' },
    { label: '健康保険証', required: false, note: 'Thay thế ID phụ.' },
    { label: 'Thông tin tài khoản ngân hàng', required: true, note: 'Auto-debit hằng tháng / hằng năm.' },
    { label: 'Danh sách đồ giá trị', required: false, note: 'Để khai mức 家財 đúng — không khai thấp.' },
    { label: '印鑑 hoặc chữ ký', required: true, note: 'Tùy gói.' },
    { label: '建物登記簿 (cho nhà sở hữu)', required: false, note: 'Khi mua bảo hiểm cho nhà bạn sở hữu.' },
  ],
  commonMistakes: [
    'Tin "có 火災保険 = đã bao gồm động đất" → SAI. 地震保険 phải mua thêm.',
    'Khai 家財 quá thấp để tiết kiệm phí → khi cháy, chỉ được đền theo mức khai. Khai đúng giá trị thật (1–3 triệu yên cho người 1人暮らし phổ biến).',
    'Chỉ mua bảo hiểm bất động sản giới thiệu → có thể đắt 30–50% so với 共済 hoặc online.',
    'Bị cháy nhà thuê + không có 借家人賠償 → chủ nhà đòi 5–20 triệu yên — KHÔNG có bảo hiểm thì tự chịu.',
    'Tin "lỗi hàng xóm gây cháy → họ phải đền tôi" → SAI. Luật 失火責任法 — họ chỉ đền nếu 重大過失. Phải tự có 家財保険.',
    'Quên đổi địa chỉ bảo hiểm sau khi chuyển nhà → bảo hiểm cho nhà cũ → không chi trả khi cháy nhà mới.',
    'Không báo 事故 trong 60 ngày → bảo hiểm có thể từ chối.',
    'Vứt 保険証券 / 約款 → không biết có bảo hiểm gì, không gọi được 事故受付 đúng.',
    'Ở nhà 木造 cũ không kiểm tra 建築年 → có thể giảm phí đáng kể nếu nhà 新耐震 (sau 1981).',
    'Mua bảo hiểm cho đồ trong nhà chính nhưng không bảo hiểm xe đạp gửi ngoài → mất xe đạp không được đền (cần điều khoản riêng).',
  ],
  faq: [
    {
      question: '火災保険 và 地震保険 khác nhau thế nào? Có bắt buộc cả 2?',
      answer:
        '**火災保険 (Kasai Hoken)**:\n• Bảo hiểm hỏa hoạn — chi trả khi nhà bị cháy/hư hại do điện/nước/trộm.\n• **CHỦ NHÀ thường yêu cầu trong契約 thuê** — gần như bắt buộc thực tế.\n• Phí thấp (~5,000–15,000円/năm cho 1人暮らし).\n• KHÔNG chi trả khi cháy do động đất gây ra.\n\n**地震保険 (Jishin Hoken)**:\n• Bảo hiểm động đất — chi trả khi nhà bị sập/cháy do động đất/sóng thần/núi lửa.\n• **KHÔNG bắt buộc trong契約 thuê** — nhưng cần thiết ở Nhật.\n• Phải mua KÈM 火災保険 (không bán riêng).\n• Phí cao hơn — 30–50% phí 火災保険.\n• Là bảo hiểm 国 + 民間 hợp tác — có 限度額.\n\n**Bạn cần cả 2?**\n• 火災保険: BẮT BUỘC thực tế.\n• 地震保険: KHUYẾN KHÍCH mạnh ở Nhật vì rủi ro cao. Ở 南海トラフ vùng (Tokyo, Tokai, Nankai) cực kỳ nên có.\n\n**Lý do quan trọng cho 地震保険**:\n• Khi 南海トラフ xảy ra, đồ đạc cháy/hư hỏng do động đất → 火災保険 KHÔNG chi trả.\n• Phí bảo hiểm cao là vì rủi ro thực sự cao — đáng đầu tư.',
    },
    {
      question: 'Trong 火災保険 cho nhà thuê có 3 phần — 家財, 借家人賠償, 個人賠償 — phần nào quan trọng nhất?',
      answer:
        '**家財保険 (đồ đạc)**:\n• Bảo hiểm cho TV, laptop, đồ điện tử, quần áo, jewelry trong nhà.\n• Khi cháy/trộm/nước → bồi thường theo giá trị.\n• Bạn quyết định mức (thường 1–5 triệu yên).\n• **Quan trọng cho bạn** — bảo vệ tài sản cá nhân.\n\n**借家人賠償 (đền chủ nhà)** — **QUAN TRỌNG NHẤT**:\n• Khi bạn gây cháy/hư hỏng nhà thuê → đền chủ nhà.\n• Giới hạn thường 10–20 triệu yên.\n• KHÔNG có thì cháy nhà thuê → tự chịu hàng chục triệu yên.\n• **Đây là điều kiện chính chủ nhà yêu cầu**.\n\n**個人賠償 (đền người thứ ba)**:\n• Khi bạn / người trong nhà gây thiệt hại cho hàng xóm hoặc người khác.\n• Vd: con trẻ làm vỡ TV nhà hàng xóm, đi xe đạp đụng người, làm nước rò xuống tầng dưới.\n• Giới hạn thường 1 億 yên.\n• Tương đối rẻ — nên có.\n\n**Ưu tiên (quan trọng nhất → ít)**:\n1. 借家人賠償 (bắt buộc cho thuê).\n2. 個人賠償 (tránh tình huống bồi thường lớn cho hàng xóm).\n3. 家財 (đồ đạc của bạn).\n\nĐa số gói chuẩn bao 3 phần. Khi mua riêng — bảo đảm cả 3.',
    },
    {
      question: 'Tôi sống ở chung cư tầng 10 — có cần bảo hiểm nước/lũ không?',
      answer:
        'Tùy bạn:\n\n**水災特約 (lũ lụt)**:\n• Chi trả khi nhà bị ngập do mưa lớn / lũ / sóng thần.\n• Tầng 10 chung cư tầng cao → rủi ro lũ rất thấp.\n• Có thể **bỏ qua** để giảm phí ~10–20%.\n• Nhưng **cẩn thận**: nếu chung cư ở vùng đồng bằng + sông gần → nước có thể vào tầng trệt → bạn không bị trực tiếp nhưng dịch vụ ngừng. 火災保険 thường chi trả thiệt hại điện/gas/nước hỏng.\n\n**水濡れ (nước rò trong nhà)**:\n• Chi trả khi máy giặt / vòi nước nhà tầng trên rò xuống.\n• **Tầng 10 RẤT NÊN có** — rất phổ biến trong chung cư.\n• Cũng dùng được khi bạn gây rò xuống tầng dưới.\n\n**盗難 (trộm)**:\n• Chung cư có lock kép thì rủi ro thấp.\n• Nhưng nên có vì 5,000–15,000円/năm.\n\n**Hỏa hoạn**:\n• Tầng 10 rất an toàn vì RC tốt + 防火基準 cao.\n• Nhưng vẫn cần 火災保険 cơ bản — chủ nhà yêu cầu.\n\n**Kết luận cho tầng 10 chung cư**:\n• Cần: 火災, 家財, 借家人賠償, 個人賠償, 水濡れ.\n• Bỏ qua: 水災 (nếu khu cao + xa sông).\n• Nên có: 地震保険.',
    },
    {
      question: 'Bị cháy nhà / động đất → quy trình xin bồi thường thế nào?',
      answer:
        '**Bước 1 — An toàn ngay lập tức**:\n• Gọi 119 nếu đang cháy.\n• Sơ tán theo hướng dẫn.\n• Sau khi an toàn → ra khỏi nhà, không cố cứu đồ.\n\n**Bước 2 — Liên hệ 保険会社**:\n• Gọi 事故受付 24/7 (số trên 保険証券).\n• Báo: thời gian, địa điểm, nguyên nhân, mức độ.\n• KHÔNG dọn dẹp trước khi rủ giám định viên — chụp ảnh hiện trường.\n\n**Bước 3 — Liên hệ chính quyền**:\n• 罹災証明書 (giấy chứng nhận thiệt hại) — xin tại 市役所 sau hỏa hoạn / thiên tai.\n• 火災調査書 — 消防 (cứu hỏa) cấp.\n• Đối với động đất / lũ → 市役所 cử người đến xem.\n\n**Bước 4 — Giám định**:\n• 保険会社 cử 損害鑑定人 đến xem nhà.\n• Bạn liệt kê đồ hư hại + giá trị (mua giá / receipts).\n• Chụp ảnh chi tiết.\n• Ký 損害見積書 (báo giá thiệt hại).\n\n**Bước 5 — Bồi thường**:\n• 2 tuần – 2 tháng sau khi nộp đủ hồ sơ.\n• Chuyển khoản trực tiếp.\n• Nếu不満 → đối thoại với 保険会社. Tranh chấp lớn → 損害保険紛争解決センター hoặc 188.\n\n**Bước 6 — Đối với 借家人賠償** (đền chủ nhà):\n• 保険会社 thay bạn xử lý trực tiếp với chủ nhà.\n• Bạn không phải tự trả → bảo hiểm trả → bạn ký quyết toán.\n\n**Lưu ý**:\n• KHÔNG ký bất kỳ giấy với chủ nhà trước khi 保険会社 xét.\n• KHÔNG dọn rác hiện trường trước khi giám định.\n• KHÔNG tự sửa chữa.\n• Lưu mọi receipt mua tạm (cơm, khách sạn, đồ tạm) — có thể được chi trả.',
    },
    {
      question: 'Có gói "trọn gói" 火災 + 地震 + 共済 nào rẻ + uy tín cho người mới sang Nhật không?',
      answer:
        '**Cho người 1人暮らし mới sang Nhật**:\n\n**Option 1: こくみん共済 賃貸住宅型** (rẻ + đơn giản)\n• Phí: ~6,000–8,000円/năm.\n• Bao: 家財 200–300 万円, 借家人賠償 1,000 万円, 個人賠償 1 億円.\n• KHÔNG bao 地震 trực tiếp — có 地震共済 bổ sung.\n• Đăng ký: online hoặc 全労済 chi nhánh.\n\n**Option 2: 都道府県民共済 賃貸タイプ**\n• Phí: ~12,000円/năm.\n• Có nhiều 都道府県 — search tên 都道府県 + 民共済.\n• Tương tự こくみん共済.\n\n**Option 3: 楽天損保 ホームアシスト 賃貸タイプ** (online)\n• Phí: ~5,000–12,000円/năm.\n• Bao: 家財 + 借家人賠償 + 個人賠償 + 水濡れ.\n• 地震保険 add-on được.\n• Đăng ký online — nhanh.\n\n**Option 4: 不動産屋 giới thiệu** (tiện nhưng đắt)\n• Phí: 15,000–25,000円/2 năm.\n• Tiện vì gắn vào契約.\n• Có thể không tốt nhất.\n\n**Khuyến nghị**:\n1. Hỏi giá gói bất động sản giới thiệu trước.\n2. So sánh với こくみん共済 + 楽天損保.\n3. Chọn rẻ nhất đáp ứng yêu cầu chủ nhà (借家人賠償 tối thiểu 1,000 万円).\n4. Bổ sung 地震保険 nếu sống vùng rủi ro cao.\n\n**Cảnh báo**:\n• Tránh bảo hiểm "siêu rẻ" không tên tuổi → giám định kém / từ chối chi trả.\n• Kiểm tra rating 保険会社 (S&P / Moody\'s).',
    },
  ],
  counterPhrases: [
    {
      jp: '火災保険に加入したいです。',
      romaji: 'Kasai hoken ni kanyuu shitai desu.',
      vn: 'Tôi muốn mua bảo hiểm hỏa hoạn.',
      note: 'Câu mở đầu khi liên hệ 保険会社 / 共済.',
    },
    {
      jp: '地震保険も付けたいです。',
      romaji: 'Jishin hoken mo tsuketai desu.',
      vn: 'Tôi muốn thêm bảo hiểm động đất.',
      note: 'Phải nói rõ — KHÔNG tự động kèm.',
    },
    {
      jp: '借家人賠償責任保険は含まれていますか。',
      romaji: 'Shakkanin baishou sekinin hoken wa fukumarete imasu ka.',
      vn: 'Có bao bảo hiểm trách nhiệm với chủ nhà không?',
      note: 'Hỏi điều kiện chính chủ nhà thuê yêu cầu.',
    },
    {
      jp: '個人賠償責任は何円までですか。',
      romaji: 'Kojin baishou sekinin wa nan-en made desu ka.',
      vn: 'Mức trách nhiệm cá nhân tối đa bao nhiêu?',
      note: 'Tốt là 1 億円 trở lên.',
    },
    {
      jp: '事故が起きました。',
      romaji: 'Jiko ga okimashita.',
      vn: 'Có sự cố xảy ra.',
      note: 'Câu đầu khi gọi 事故受付 24/7.',
    },
    {
      jp: '保険証券を再発行してください。',
      romaji: 'Hoken shouken o sai-hakkou shite kudasai.',
      vn: 'Xin cấp lại giấy chứng nhận bảo hiểm.',
      note: 'Khi mất 証券.',
    },
    {
      jp: '住所変更の手続きをしたいです。',
      romaji: 'Juusho henkou no tetsuzuki o shitai desu.',
      vn: 'Tôi muốn đổi địa chỉ.',
      note: 'Khi chuyển nhà — quan trọng để bảo hiểm vẫn có hiệu lực.',
    },
    {
      jp: '見積もりをお願いします。',
      romaji: 'Mitsumori o onegai shimasu.',
      vn: 'Cho tôi báo giá.',
      note: 'So sánh nhiều nơi.',
    },
  ],
  officialLinks: [
    { label: '金融庁 (FSA) — 保険業', url: 'https://www.fsa.go.jp/' },
    { label: '損害保険料率算出機構 (GIROJ) — 地震保険', url: 'https://www.giroj.or.jp/' },
    { label: 'こくみん共済 coop (全労済)', url: 'https://www.zenrosai.coop/' },
    { label: '国民生活センター — 188 (tư vấn tiêu dùng)', url: 'https://www.kokusen.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Hiểu 3 phần cốt lõi trước khi mua',
      description:
        '**3 phần bắt buộc trong 火災保険 cho nhà thuê**:\n\n**1. 家財保険 (bảo hiểm đồ đạc)**:\n• Bảo vệ TV, laptop, quần áo, jewelry, đồ điện tử trong nhà.\n• Khi cháy / trộm / nước hỏng → bồi thường giá trị thay thế.\n• Mức bạn chọn: thường 1–5 triệu yên cho 1人暮らし, 3–10 triệu cho gia đình.\n• **KHAI ĐÚNG**: nếu khai thấp (vd 500,000 thay vì 2 triệu thật) → chỉ được 500,000 khi cháy.\n\n**2. 借家人賠償責任 (trách nhiệm với chủ nhà)**:\n• Bạn gây cháy / nước / hư hỏng nhà thuê → đền chủ nhà.\n• Yêu cầu phổ biến: 1,000 万円 trở lên.\n• **Bắt buộc theo契約 thuê** — chủ nhà sẽ yêu cầu.\n• Không có → cháy nhà → tự chịu 5–20 triệu yên.\n\n**3. 個人賠償責任 (trách nhiệm với người thứ ba)**:\n• Bạn / con / pet làm hư hỏng / thương tích cho người khác.\n• Vd: nước rò xuống tầng dưới, con đập vỡ TV nhà hàng xóm, đụng xe đạp.\n• Mức: 1 億円 trở lên là tốt.\n• **Phụ trợ**: phổ biến nhưng nhiều gói chuẩn không bao — kiểm tra kỹ.\n\n**Phần phụ trợ cân nhắc**:\n• 水濡れ (nước rò trong nhà) — RẤT NÊN có cho chung cư.\n• 水災 (lũ ngoài) — nếu vùng lũ thấp.\n• 盗難 (trộm) — đa số gói có sẵn.\n• 破損 (đập vỡ ngẫu nhiên) — phụ trợ.\n• 地震保険 — mua riêng (xem step 2).',
      documents: ['賃貸借契約書', '在留カード'],
      tip: 'Đừng để bất động sản nói "đã bao gồm hết" — yêu cầu xem 重要事項説明書 và confirm 3 phần.',
    },
    {
      step: 2,
      title: 'Thêm 地震保険 — đặc biệt vùng rủi ro cao',
      description:
        '**Vì sao nên mua 地震保険**:\n\n• Nhật là 1 trong nước rủi ro động đất cao nhất thế giới.\n• 南海トラフ địa chấn rủi ro 30 năm tới ~70–80% (theo 政府地震調査委員会).\n• 火災保険 KHÔNG chi trả thiệt hại do động đất (cả cháy gây bởi động đất).\n• Có 地震保険 → mới được đền khi:\n  - Nhà sập do động đất.\n  - Cháy gây bởi động đất.\n  - Sóng thần / núi lửa thiệt hại.\n\n**Đặc điểm 地震保険 ở Nhật**:\n\n• Là bảo hiểm 国 + 民間 hợp tác → phí cố định toàn quốc + theo 都道府県.\n• Phí khác theo 8 nhóm 都道府県:\n  - **3a (cao nhất)**: 千葉, 東京, 神奈川, 静岡 (vùng 南海トラフ chính).\n  - **3b**: 茨城, 埼玉, 徳島, 高知 (cũng cao).\n  - **2**: 愛知, 三重, 和歌山 (đáng kể).\n  - **1**: phần lớn 都道府県 còn lại (thấp).\n\n• 限度額:\n  - 建物: tối đa 50,000,000円.\n  - 家財: tối đa 10,000,000円.\n• Phải mua KÈM 火災保険 — không bán riêng.\n• Phí 30–50% phí 火災保険.\n• Chi trả phụ thuộc mức thiệt hại:\n  - 全損 (>50%): 100% giá trị bảo hiểm.\n  - 大半損: 60%.\n  - 小半損: 30%.\n  - 一部損 (3–20%): 5%.\n\n**Khuyến nghị**:\n• Tokyo / Kanagawa / Shizuoka / Aichi / Osaka → CỰC KỲ NÊN MUA.\n• Hokkaido / Tohoku → ít rủi ro hơn nhưng vẫn nên có cho yên tâm.\n• Vùng 5 năm tới có dự báo 70%+ → bắt buộc tự bảo vệ.',
      documents: ['Báo giá 地震保険 từ 保険会社'],
      tip: '地震保険 đắt nhưng đáng — 1 lần sóng thần / sập nhà không có bảo hiểm = mất hết. Phí 30,000–80,000円/năm cho 1 căn hộ là rẻ so với rủi ro.',
    },
    {
      step: 3,
      title: 'So sánh 3 nguồn — bất động sản / 共済 / online',
      description:
        '**A. Bất động sản giới thiệu** (tiện nhất, đắt nhất):\n\n• Khi ký契約 thuê, 不動産屋 sẽ đưa gói có sẵn ký luôn.\n• Phí: 15,000–25,000円/2 năm cho 1人暮らし.\n• Pros: tiện, không phải search.\n• Cons: thường đắt 30–50%, gói cố định không tối ưu.\n\n**B. 共済 (rẻ + tin cậy)**:\n\n• **こくみん共済 coop (全労済)**:\n  - 賃貸住宅型 ~7,000–10,000円/năm.\n  - Online đăng ký được.\n  - Bao 家財 + 借家人賠償 + 個人賠償.\n\n• **都道府県民共済**:\n  - Tùy 都道府県 (vd 東京都民共済).\n  - Phí ~12,000円/năm.\n\n• Pros: rẻ, 安心, dễ đăng ký.\n• Cons: bao có thể hẹp hơn — kiểm tra chi tiết.\n\n**C. Online自分で chọn** (tự do nhất):\n\n• 楽天損保 ホームアシスト 賃貸タイプ.\n• セコム損保 セキュリ家.\n• ソニー損保.\n• AIG損保.\n• Pros: tự chọn mức, có thể rẻ, online quick.\n• Cons: phải tự đọc 約款.\n\n**So sánh online**:\n• 価格.com 保険.\n• 保険スクエアbang.\n• 保険の窓口 online consultation.\n\n**Quy trình so sánh**:\n\n1. Hỏi giá 不動産屋 trước.\n2. Lấy báo giá こくみん共済 + 1 online.\n3. So sánh BAO GỒM gì + mức + phí.\n4. Chọn cheapest đáp ứng yêu cầu chủ nhà.\n\n**Quy tắc**: yêu cầu chủ nhà chỉ là 借家人賠償 tối thiểu (thường 1,000 万円). Bạn có quyền chọn 保険会社 nào miễn là đáp ứng.',
      documents: ['Báo giá 3 nguồn'],
      tip: 'Người Việt mới sang Nhật thường mua gói bất động sản giới thiệu vì không biết quyền chọn. Bạn có thể tiết kiệm 5,000–10,000円/năm bằng tự chọn.',
    },
    {
      step: 4,
      title: 'Ký + lưu giữ + đổi địa chỉ khi cần',
      description:
        '**Khi ký**:\n\n1. Đọc 重要事項説明書 (Important Information):\n• Mức bồi thường mỗi phần.\n• Trường hợp KHÔNG chi trả (vd 故意, 戦争, 核).\n• Cách báo 事故.\n• Thời hạn báo (thường 60 ngày).\n\n2. Đọc 約款 (Terms & Conditions) — chi tiết hơn.\n\n3. Ký + đóng phí.\n\n4. Nhận **保険証券** (Insurance Certificate):\n• In tên + địa chỉ + thời hạn + mức bao.\n• Số hợp đồng (証券番号).\n• Số 事故受付 24/7.\n\n**Lưu giữ**:\n\n• 1 bản giấy ở nhà (drawer + bao chống nước).\n• Chụp ảnh + lưu Cloud (Google Drive / iCloud).\n• Lưu số 事故受付 trong Phone book.\n• Note hạn gia hạn vào lịch (đa số 2 năm).\n\n**Khi chuyển nhà**:\n\n• Báo 保険会社 NGAY khi quyết định chuyển — qua hotline.\n• Cung cấp địa chỉ mới + ngày chuyển.\n• 保険会社 sẽ:\n  - Tự động chuyển contract nếu nhà mới tương đương.\n  - Yêu cầu hợp đồng mới nếu khác đáng kể (vd thuê → mua).\n• Phí có thể tăng/giảm theo nhà mới.\n\n**Quên báo → bảo hiểm cho nhà CŨ → không chi trả khi cháy nhà mới**.\n\n**Khi gia hạn (2 năm/lần)**:\n\n• 保険会社 nhắc 1–2 tháng trước.\n• So sánh lại — phí có thể thay đổi.\n• Xem xét đổi sang gói khác / 保険会社 khác nếu thấy đắt.\n\n**Khi契約 thuê hết / chuyển ra**:\n\n• Báo 保険会社 huỷ contract.\n• Có thể được hoàn lại phần phí chưa dùng (tùy điều khoản).',
      documents: ['保険証券', '重要事項説明書', '約款'],
      tip: 'Lưu số 事故受付 trong Phone book với tên dễ tìm (vd "事故 — 火災保険"). Khi panic 3 giờ sáng vẫn tìm thấy.',
    },
    {
      step: 5,
      title: 'Khi có sự cố — quy trình bồi thường',
      description:
        '**Bước 1 — An toàn**:\n\n• Cháy: gọi 119 → sơ tán.\n• Động đất: bảo vệ đầu → ra ngoài an toàn.\n• Trộm: gọi 110 → KHÔNG dọn dẹp hiện trường.\n• Nước rò: tắt nước nguồn → báo chủ nhà.\n\n**Bước 2 — Báo 保険会社 trong 60 ngày**:\n\n• Gọi 事故受付 24/7 (số trên 保険証券).\n• Báo: tên, số 証券, ngày giờ, địa điểm, mức độ.\n• Lấy số 事故番号 — để tham chiếu sau.\n\n**Bước 3 — Liên hệ chính quyền**:\n\n• Cháy: xin **罹災証明書** tại 市役所 (15–30 ngày) + **火災調査書** từ 消防.\n• Trộm: 警察 cấp **被害届受理証明書**.\n• Động đất: 市役所 cử người đến đánh giá (大震災 thường tự động).\n• Nước rò: chủ nhà / 不動産屋 báo cáo + ảnh.\n\n**Bước 4 — Giám định 損害鑑定**:\n\n• 保険会社 cử **損害鑑定人** đến xem (1–2 tuần sau báo).\n• Liệt kê thiệt hại:\n  - Đồ đạc hỏng: liệt kê + chụp ảnh + receipts mua nếu có.\n  - Nhà hỏng: ghi rõ phần nào, mức nào.\n• Ký 損害見積書.\n\n**Bước 5 — Nộp hồ sơ**:\n\n• 保険会社 gửi list cần — đầy đủ:\n  - 損害見積書.\n  - Receipts thiệt hại (sửa chữa, mua thay).\n  - 罹災証明書 / 警察証明書.\n  - Ảnh hiện trường.\n  - Đơn yêu cầu bồi thường.\n\n**Bước 6 — Nhận tiền**:\n\n• 2 tuần – 2 tháng từ ngày nộp đủ hồ sơ.\n• Chuyển khoản trực tiếp.\n• Mức = giá trị thiệt hại đã giám định − 自己負担 (nếu có).\n\n**Bước 7 — Đối với 借家人賠償**:\n\n• 保険会社 thay bạn xử lý với chủ nhà.\n• Bạn KHÔNG ký bất kỳ giấy đền với chủ nhà trước khi 保険会社 xét.\n• Khi xong → 保険会社 trả chủ nhà → bạn ký quyết toán.\n\n**Tranh chấp**:\n\n• 不満 với 保険会社: nói chuyện cấp cao hơn / xin lý do từ chối bằng văn bản.\n• Đối kháng: **損害保険紛争解決センター** (miễn phí).\n• Cuối cùng: 弁護士 + 民事訴訟.\n• Tư vấn ngoài: 188 (国民生活センター).',
      documents: ['保険証券', '罹災証明書', 'Receipts', 'Ảnh hiện trường'],
      tip: 'KHÔNG dọn dẹp / sửa chữa trước khi 損害鑑定人 đến. KHÔNG ký với chủ nhà trước khi 保険会社 xử lý. KHÔNG đợi quá 60 ngày để báo.',
    },
  ],
};

export default fireEarthquakeInsuranceHome;
