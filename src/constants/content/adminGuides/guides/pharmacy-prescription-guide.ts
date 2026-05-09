import type { AdminGuide } from '../../../../types/content';

const pharmacyPrescriptionGuide: AdminGuide = {
  id: 'pharmacy-prescription-guide',
  category: 'health',
  lastVerified: '2026-05-09',
  priority: 'normal',
  title: 'Nhà thuốc + toa thuốc + cách nhận thuốc ở Nhật',
  titleJp: '薬局・処方箋・お薬の受け取り方',
  icon: 'flask-outline',
  color: '#27AE60',
  description:
    'Sau khi bác sĩ kê toa (処方箋), bạn cầm ra 薬局 (nhà thuốc) gần đó để nhận thuốc — クリニック thường KHÔNG bán thuốc trực tiếp. 処方箋 có hạn 4 ngày kể từ ngày kê. お薬手帳 (sổ thuốc) ghi lịch sử thuốc — quan trọng để tránh tương tác. Thuốc theo toa được bảo hiểm chi 70% (bệnh nhân trả 30%). Thuốc OTC (không cần toa) bán tại ドラッグストア (Matsukiyo, Sundrug, etc.) — tự trả 100%.',
  searchKeywords: [
    'nhà thuốc',
    'toa thuốc',
    '処方箋',
    '薬局',
    'お薬手帳',
    'thuốc bảo hiểm',
    'thuốc giảm đau',
    'paracetamol',
    'thuốc cảm',
    'thuốc tiêu chảy',
    'thuốc dị ứng',
    'OTC',
    '一般用医薬品',
    'ドラッグストア',
    '調剤薬局',
    'Matsukiyo',
    'Sundrug',
    'Welcia',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      '薬局 do 厚生労働省 quản lý qua 薬事法 (薬機法). 処方箋 phải kê bởi bác sĩ có giấy phép, có hạn 4 ngày kể từ ngày kê (theo 医師法 + 薬剤師法). 一般用医薬品 (OTC) chia 第1類 / 第2類 / 第3類 — yêu cầu khác nhau khi mua. お薬手帳 do 日本薬剤師会 promote, miễn phí. Đây là tài liệu tham khảo — không thay thế tư vấn 薬剤師 / bác sĩ cá nhân.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'low',
    whenToAskExpert: [
      'Tác dụng phụ thuốc nặng (phát ban, khó thở, sưng môi/lưỡi) — gọi 119 NGAY hoặc quay lại bác sĩ.',
      'Mang thai / cho con bú: KHÔNG tự dùng OTC mà chưa hỏi bác sĩ. Một số thuốc gây dị tật thai.',
      'Trẻ em <15 tuổi: liều thuốc khác người lớn. Hỏi 薬剤師 trước khi cho uống OTC.',
      'Người có bệnh mạn tính + đang dùng nhiều thuốc — tương tác thuốc nguy hiểm. Mỗi lần kê toa mới phải show お薬手帳.',
      'Đem thuốc về Việt Nam: số lượng + loại bị giới hạn theo customs VN. Hỏi 薬剤師 cấp giấy giải thích nếu cần.',
    ],
  },
  quickAction: {
    deadline:
      '処方箋 có hạn **4 ngày** kể từ ngày kê (gồm ngày kê). Quá 4 ngày → 処方箋 hết hiệu lực, phải đi khám bác sĩ lại để có toa mới. Đi 薬局 cùng ngày khám là tốt nhất.',
    office:
      '**調剤薬局** (nhà thuốc kê đơn): chuyên nhận 処方箋. Thường có ngay đối diện クリニック / bệnh viện. Một số chuỗi: ココカラファイン, スギ薬局, ウエルシア (cũng có 調剤). **ドラッグストア**: chỉ bán OTC + đồ tiêu dùng. Không nhận 処方箋. **24時間 薬局**: hiếm, có ở Tokyo / Osaka.',
    doNow: [
      'Sau khi nhận 処方箋 từ bác sĩ: đi 調剤薬局 NGAY trong ngày (4 ngày là deadline tuyệt đối).',
      'Mang đầy đủ: 処方箋, 保険証 / マイナンバーカード / 資格確認書, お薬手帳 (nếu có).',
      'Tại 薬局: đưa 処方箋 + 保険証 cho 受付. Lần đầu ở 薬局 này thì điền form ngắn (アンケート) về dị ứng + thuốc đang dùng.',
      'Đợi 5–15 phút (薬剤師 kiểm tra + chuẩn bị thuốc).',
      'Khi 薬剤師 gọi tên: ra quầy. Họ giải thích cách dùng, tác dụng phụ. Nhận thuốc + お薬手帳 dán nhãn + thanh toán. Lưu 領収書.',
    ],
    bring: [
      '処方箋 (gốc — không photocopy)',
      '保険証 / マイナンバーカード / 資格確認書',
      'お薬手帳 (nếu có)',
      'Tiền mặt 1,000–5,000円 hoặc thẻ',
      'Danh sách dị ứng + thuốc đang dùng (nếu chưa có お薬手帳)',
    ],
    ifLate:
      '処方箋 quá 4 ngày → KHÔNG dùng được nữa. Phải quay lại bác sĩ để xin toa mới (có thể tính lại phí khám). Để tránh: đi 薬局 cùng ngày khám hoặc sáng hôm sau.',
    officialSourceLabels: ['厚生労働省'],
  },
  whoIsThisFor: [
    'Người Việt mới sang Nhật chưa biết quy trình lấy thuốc.',
    'Người vừa đi khám có 処方箋 — cần biết quy trình tại 薬局.',
    'Người muốn mua thuốc OTC tại ドラッグストア — phân biệt loại thuốc.',
    'Người có bệnh mạn tính dùng nhiều thuốc — quản lý qua お薬手帳.',
    'Người chuẩn bị về VN — mang thuốc Nhật về như thế nào.',
  ],
  whenToDo: [
    'Cùng ngày khám bác sĩ (tốt nhất) — 処方箋 còn tươi, 薬局 gần viện.',
    'Trong vòng 4 ngày kể từ ngày kê — deadline tuyệt đối.',
    'Khi cần thuốc OTC nhẹ (cảm, đau đầu, đau bụng nhẹ) → ドラッグストア không cần toa.',
    'Khi cần làm お薬手帳 lần đầu — yêu cầu 薬局 cấp miễn phí.',
    'Khi đổi 薬局 — cần đưa お薬手帳 cũ + bản dịch nếu thuốc nước ngoài.',
  ],
  whereToDo: [
    '**調剤薬局** (nhà thuốc kê đơn): chuyên nhận 処方箋. Tìm gần クリニック / bệnh viện vừa khám.',
    '**Chuỗi 薬局 lớn**: ココカラファイン, スギ薬局, ウエルシア, クリエイト, サンドラッグ, マツモトキヨシ — nhiều chi nhánh có 調剤 + OTC.',
    '**ドラッグストア thuần OTC**: nhỏ hơn, chỉ bán thuốc không cần toa + mỹ phẩm + đồ tiêu dùng. Không nhận 処方箋.',
    '**24時間 薬局**: hiếm, có ở Tokyo / Osaka / 1 số 都道府県 lớn — phục vụ ngoài giờ.',
    '**Bệnh viện 院内薬局**: một số bệnh viện có 薬局 trong viện — tiện không cần đi xa.',
  ],
  estimatedTime:
    'Tại 調剤薬局 với 処方箋: 10–30 phút (chờ + nhận thuốc + giải thích). Lần đầu ở 薬局 mới: thêm 10–15 phút điền form. Mua OTC tại ドラッグストア: 5–15 phút.',
  fees: [
    '**Thuốc theo 処方箋 với 保険証**: bệnh nhân trả 30%. Thường 500–3,000円 cho 1 đợt thuốc thông thường (cảm, đau, kháng sinh).',
    '**Thuốc mạn tính** (đái tháo đường, huyết áp, tâm thần): tùy thuốc, thường 500–5,000円/tháng với bảo hiểm.',
    '**Phí dịch vụ 薬局** (調剤技術料 / 薬学管理料): đã bao gồm trong tổng phí. Thường 100–500円 thêm.',
    '**Thuốc OTC tại ドラッグストア**: tự trả 100%. Cảm cúm 1,000–2,000円/hộp. Paracetamol 500–1,500円. Thuốc dạ dày 1,000–3,000円.',
    '**Không có 保険証**: trả 100% — đắt gấp ~3 lần.',
    '**自立支援医療**: cho điều trị tâm thần dài hạn — chỉ trả 10%. Đăng ký tại 市役所.',
    'Phí thay đổi — kiểm tra với 薬局 cụ thể.',
  ],
  documentsChecklist: [
    { label: '処方箋 (gốc)', required: true, note: 'KHÔNG photocopy. Có hạn 4 ngày — quá thì phải đi khám lại.' },
    { label: '保険証 / マイナンバーカード / 資格確認書', required: true, note: 'Để dùng bảo hiểm. Thiếu = trả 100%.' },
    { label: 'お薬手帳', required: false, note: 'Sổ thuốc — 薬剤師 dán nhãn thuốc. Mang theo lần sau giúp tránh tương tác.' },
    { label: 'Tiền mặt 1,000–5,000円', required: true, note: 'Một số 薬局 có nhận thẻ. Lần đầu thường mang tiền mặt cho chắc.' },
    { label: 'Danh sách dị ứng + thuốc đang dùng', required: false, note: 'Nếu chưa có お薬手帳 — tự liệt kê vào giấy.' },
  ],
  commonMistakes: [
    'Quá 4 ngày sau ngày kê 処方箋 → 処方箋 hết hiệu lực. Phải đi khám lại + tính phí.',
    'Mang photocopy 処方箋 → KHÔNG nhận. Phải gốc.',
    'Bỏ qua お薬手帳 → 薬剤師 không biết thuốc đang dùng → có thể kê thuốc tương tác.',
    'Tự đoán liều OTC cho trẻ em → nguy hiểm. Hỏi 薬剤師 trước.',
    'Mua thuốc dài hạn ở nhiều 薬局 khác nhau → khó quản lý tương tác. Cố định 1 薬局 cho thuốc mạn.',
    'Tin "thuốc Nhật mạnh hơn" → KHÔNG đúng phổ thông. Liều + thành phần có thể khác nước nhưng KHÔNG phải mạnh hơn.',
    'Đem nhiều thuốc Nhật về VN không khai → có thể bị hải quan VN giữ + phạt. Khai trung thực + có giấy 薬剤師.',
    'Tự dùng OTC khi mang thai / cho con bú → một số thuốc gây dị tật thai. LUÔN hỏi bác sĩ trước.',
  ],
  faq: [
    {
      question: 'Tôi cần 処方箋 ở Việt Nam — có dịch ra tiếng Việt không?',
      answer:
        '処方箋 thường chỉ tiếng Nhật. Nếu cần dịch:\n\n• **Yêu cầu 薬剤師 ghi tên thuốc bằng tiếng Anh / Latin** trên お薬手帳 — 一般名 (generic name) quốc tế. Bác sĩ VN có thể tra cứu.\n• **Một số 薬局** có dịch vụ cấp 薬剤情報提供書 (medication information sheet) bằng English — hỏi.\n• **Tự dùng app dịch** (Google Translate camera) để dịch nhãn thuốc.\n• **Mang nguyên hộp thuốc** với nhãn — bác sĩ VN có thể tra cứu thành phần.\n\nXem guide tax-on-remittance-to-vietnam phần "đồ cấm" cho quy định mang thuốc về VN.',
    },
    {
      question: 'Tôi muốn mua thuốc cảm OTC — phân biệt 第1類 / 第2類 / 第3類 thế nào?',
      answer:
        '一般用医薬品 (OTC) chia 3 loại theo 厚生労働省:\n\n**第1類**: thuốc mạnh nhất, có tác dụng phụ cao.\n• Phải có 薬剤師 (dược sĩ) bán + giải thích.\n• Vd: thuốc giảm đau mạnh, thuốc tóc.\n• Mua: cần ký giấy + đợi tư vấn.\n\n**第2類**: trung bình.\n• Có thể mua từ 登録販売者 (sales-registered) hoặc 薬剤師.\n• Vd: thuốc cảm thông thường, thuốc giảm đau, thuốc dị ứng.\n• Mua: bình thường tại quầy.\n\n**第3類**: nhẹ nhất.\n• Có thể mua tự do.\n• Vd: vitamin, thuốc tiêu hóa nhẹ.\n• Mua: tự lấy ở kệ + thanh toán.\n\nKhi không chắc → hỏi nhân viên ドラッグストア. Họ giúp chọn đúng + giải thích cách dùng.',
    },
    {
      question: 'お薬手帳 quan trọng thế nào? Cấp ở đâu?',
      answer:
        '**Tầm quan trọng** (cao):\n\n• 薬剤師 xem để tránh **tương tác thuốc** (vd thuốc A + thuốc B = nguy hiểm).\n• Bác sĩ kê toa mới biết thuốc bạn đang dùng.\n• Cấp cứu: bác sĩ cấp cứu xem để biết tình trạng + thuốc.\n• Khi đi 薬局 mới — đỡ phải khai lại lịch sử.\n• Có thể giảm phí (薬学管理料) ở một số 薬局 nếu mang theo.\n\n**Cấp tại**:\n• Bất kỳ 薬局 nào — yêu cầu "お薬手帳をください". Miễn phí.\n• Một số ドラッグストア cũng có.\n\n**Sử dụng**:\n• Mang đến mỗi lần đi 薬局 + bệnh viện.\n• 薬剤師 dán nhãn thuốc mới mỗi lần.\n• Tự ghi nếu mua OTC quan trọng.\n• Có app số hóa (お薬手帳プラス) — đồng bộ với 薬局 hỗ trợ.\n\nBắt đầu lần đầu khám / mua thuốc — yêu cầu cấp ngay.',
    },
    {
      question: 'Tôi quên uống 1 liều — phải làm sao?',
      answer:
        'Tùy thuốc + thời gian:\n\n**Nguyên tắc chung** (KHÔNG phải tư vấn cá nhân):\n\n• **Vừa quên** (< nửa khoảng cách giữa các liều): uống ngay khi nhớ.\n• **Đã hơn nửa khoảng cách**: bỏ liều này + uống liều kế tiếp như bình thường. KHÔNG gấp đôi liều.\n\n**Vd**: thuốc 2 lần/ngày (8h + 20h):\n• 9h nhớ → uống ngay.\n• 14h nhớ → bỏ + đợi 20h uống bình thường.\n\n**Đặc biệt cho thuốc**:\n• **Kháng sinh**: rất quan trọng đúng giờ — quên 1 liều → vẫn uống ngay nếu < 1 giờ. Quá → bỏ + uống kế tiếp.\n• **Tránh thai**: có quy tắc riêng — đọc tờ hướng dẫn hoặc gọi 薬局.\n• **Thuốc tâm thần / huyết áp**: KHÔNG bỏ liều liên tiếp. Hỏi 薬剤師.\n• **Thuốc đái tháo đường**: KHÔNG gấp đôi — nguy cơ hạ đường huyết.\n\nKhông chắc → gọi 薬局 đã lấy thuốc, họ tư vấn miễn phí. Hoặc gọi #7119.',
    },
    {
      question: 'Tôi đem thuốc Nhật về Việt Nam — có giới hạn không?',
      answer:
        'CÓ giới hạn phía VN — quy định hải quan VN:\n\n**Đối với thuốc cá nhân (cho mình dùng)**:\n• Số lượng vừa đủ dùng cho cá nhân (thường 1–3 tháng).\n• Có **đơn của bác sĩ Nhật** hoặc **giấy 薬剤師** giải thích là cần thiết.\n• Để trong bao bì gốc + nhãn rõ.\n\n**Đối với một số nhóm thuốc nhạy cảm**:\n• Thuốc gây nghiện (opioid, thuốc ngủ mạnh): cần giấy phép đặc biệt.\n• Vaccine: cần giấy phép.\n• Thuốc loại đặc biệt (anabolic steroids, etc.): cấm hoặc cần giấy phép.\n\n**Đối với mua thuốc Nhật cho người khác mang về**:\n• Số lượng lớn → có thể bị hải quan VN xem là **kinh doanh trái phép** → phạt + tịch thu.\n• Thuốc OTC thông thường vài hộp cho gia đình thường OK, nhưng KHÔNG mang ngàn hộp.\n\n**Khuyến nghị**:\n• Khai trung thực với hải quan.\n• Mang đơn / giấy 薬剤師.\n• Hỏi hải quan VN trước khi đi nếu mang lượng lớn.\n• Xem guide tax-on-remittance-to-vietnam (cũng nói về đồ mang về VN).',
    },
  ],
  counterPhrases: [
    {
      jp: '処方箋を持っています。',
      romaji: 'Shohousen o motte imasu.',
      vn: 'Tôi có toa thuốc.',
      note: 'Câu mở đầu tại 調剤薬局.',
    },
    {
      jp: 'お薬手帳をください。',
      romaji: 'Okusurittechou o kudasai.',
      vn: 'Cho tôi sổ thuốc.',
      note: 'Lần đầu — yêu cầu cấp お薬手帳 miễn phí.',
    },
    {
      jp: 'アレルギーがあります。',
      romaji: 'Arerugii ga arimasu.',
      vn: 'Tôi có dị ứng.',
      note: 'Báo 薬剤師 trước khi nhận thuốc — quan trọng để tránh phản ứng.',
    },
    {
      jp: '薬の飲み方を教えてください。',
      romaji: 'Kusuri no nomikata o oshiete kudasai.',
      vn: 'Cho tôi biết cách uống thuốc.',
      note: 'Yêu cầu 薬剤師 giải thích chậm + chi tiết.',
    },
    {
      jp: '副作用はありますか。',
      romaji: 'Fukusayou wa arimasu ka.',
      vn: 'Có tác dụng phụ không?',
      note: 'Hỏi để biết dấu hiệu cần lo.',
    },
    {
      jp: '一般用医薬品で似たような薬はありますか。',
      romaji: 'Ippanyou iyakuhin de nita youna kusuri wa arimasu ka.',
      vn: 'Có thuốc OTC tương tự không?',
      note: 'Khi muốn biết loại OTC nhẹ hơn cho trường hợp tương tự.',
    },
    {
      jp: '今飲んでいる薬があります。',
      romaji: 'Ima nonde iru kusuri ga arimasu.',
      vn: 'Tôi đang uống thuốc khác.',
      note: 'Báo trước để 薬剤師 check tương tác.',
    },
    {
      jp: '妊娠中ですが、飲んでも大丈夫ですか。',
      romaji: 'Ninshinchuu desu ga, nondemo daijoubu desu ka.',
      vn: 'Tôi đang mang thai, có uống được không?',
      note: 'Quan trọng cho phụ nữ mang thai / cho con bú.',
    },
  ],
  officialLinks: [
    { label: '厚生労働省', url: 'https://www.mhlw.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Sau khi nhận 処方箋 — đi 調剤薬局 ngay',
      description:
        'Sau khám bác sĩ → cầm 処方箋 đi 調剤薬局.\n\n**Tại sao gấp**:\n• 処方箋 có hạn **4 ngày** kể từ ngày kê.\n• Càng sớm càng đỡ stress.\n• 調剤薬局 thường có ngay đối diện クリニック.\n\n**Chọn 薬局**:\n• **Tốt nhất**: 薬局 gần クリニック vừa khám — gần + chuyên về thuốc của クリニック đó.\n• **Khác**: bất kỳ 調剤薬局 nào — chuỗi như ココカラファイン, スギ薬局, ウエルシア — đều nhận 処方箋 cả nước.\n• **24時間 薬局**: cho khám đêm / cuối tuần — hiếm, có ở Tokyo / Osaka.\n\n**Mang đầy đủ**:\n• 処方箋 (gốc).\n• 保険証 / マイナンバーカード / 資格確認書.\n• お薬手帳 (nếu có).\n• Tiền mặt 1,000–5,000円.\n• Danh sách dị ứng + thuốc đang dùng nếu chưa có お薬手帳.',
      documents: [
        '処方箋 gốc',
        '保険証',
        'お薬手帳',
        'Tiền mặt',
      ],
      tip: 'Ghi ngày kê 処方箋 vào điện thoại — đặt nhắc nhở "lấy thuốc trong 4 ngày".',
    },
    {
      step: 2,
      title: 'Tại 薬局 — quy trình lần đầu',
      description:
        '1. **Vào 薬局**, đi đến quầy 受付.\n\n2. **Đưa giấy tờ**:\n• 処方箋 + 保険証.\n• お薬手帳 (nếu có) — đặt cùng.\n\n3. **Lần đầu ở 薬局 này**: nhân viên đưa 問診票 (アンケート / 薬局アンケート):\n• Tên, ngày sinh, địa chỉ, số điện thoại.\n• Dị ứng (薬, thực phẩm, etc.).\n• Bệnh hiện tại.\n• Thuốc đang dùng (kể cả OTC).\n• Có thai / cho con bú không.\n• Hút thuốc / uống rượu.\n\n4. **Đợi 5–15 phút**: 薬剤師 (dược sĩ) kiểm tra:\n• 処方箋 hợp lệ không.\n• Tương tác với thuốc đang dùng.\n• Liều có phù hợp không.\n• Chuẩn bị thuốc (đếm + đóng gói).\n\n5. **Nếu có vấn đề**: 薬剤師 có thể gọi bác sĩ xác nhận → mất thêm thời gian. Bình tĩnh đợi.',
      documents: [
        'Tất cả từ Step 1',
      ],
      tip: 'Khai TRUNG THỰC trên 問診票 — đặc biệt thuốc đang dùng + dị ứng. Sai = nguy hiểm cho mình.',
    },
    {
      step: 3,
      title: 'Nhận thuốc + nghe giải thích',
      description:
        'Khi 薬剤師 gọi tên:\n\n1. **Ra quầy giao thuốc** (服薬指導カウンター).\n\n2. **薬剤師 giải thích**:\n• **Tên thuốc** + cái này dùng cho gì.\n• **Liều**: bao nhiêu viên + bao nhiêu lần/ngày.\n• **Thời điểm**: trước / sau / cùng bữa ăn.\n• **Thời gian dùng**: vài ngày / vài tuần / dài hạn.\n• **Tác dụng phụ phổ biến**: nên biết để cảnh giác.\n• **Tác dụng phụ nghiêm trọng**: dấu hiệu phải đến viện ngay.\n• **Lưu ý**: không uống với rượu / sữa / etc. tùy thuốc.\n\n3. **Hỏi nếu không hiểu**:\n• "もう一度説明してください" (giải thích lại).\n• "ゆっくりお願いします" (chậm hơn).\n• "書いてもらえますか" (viết ra cho tôi).\n• Dùng app dịch nếu cần.\n\n4. **Nhận お薬手帳 đã dán nhãn** + thuốc + 領収書.\n\n5. **Thanh toán** ở quầy 会計 (cùng quầy hoặc khác quầy tùy 薬局).\n\n6. **Trước khi rời**: kiểm tra:\n• Đúng tên mình trên gói thuốc.\n• Số lượng đúng.\n• Hỏi nếu không chắc.',
      documents: [
        'お薬手帳 đã dán nhãn',
        'Thuốc',
        '領収書',
      ],
      tip: 'Lưu 領収書 cuối năm cho 医療費控除 nếu tổng chi phí y tế cả nhà >100,000円.',
    },
    {
      step: 4,
      title: 'Mua thuốc OTC tại ドラッグストア',
      description:
        '**Khi nào dùng OTC**:\n• Triệu chứng nhẹ + biết là gì (cảm, đau đầu nhẹ, dị ứng nhẹ, đau bụng nhẹ).\n• KHÔNG có 処方箋.\n• Không cần khám bác sĩ.\n\n**Chuỗi ドラッグストア**: マツモトキヨシ, ウエルシア, ココカラファイン, サンドラッグ, クリエイト, ツルハ, アインズ.\n\n**Quy trình**:\n\n1. **Đến quầy thuốc** (薬コーナー).\n\n2. **Tìm thuốc**:\n• Tự đọc nhãn (tiếng Nhật).\n• Hoặc hỏi nhân viên (登録販売者 hoặc 薬剤師): "風邪薬を探しています" (Tôi đang tìm thuốc cảm).\n\n3. **Phân loại**:\n• 第1類: cần ký giấy + 薬剤師 tư vấn (vd thuốc tóc, một số thuốc giảm đau mạnh).\n• 第2類: hỏi nhân viên — họ tư vấn rồi cho mua.\n• 第3類: tự lấy + thanh toán (vd vitamin, thuốc tiêu hóa nhẹ).\n\n4. **Hỏi quan trọng** trước khi mua:\n• "妊娠中でも大丈夫ですか?" (mang thai có ổn không?)\n• "今飲んでいる薬と一緒に飲んでも大丈夫ですか?" (có hợp với thuốc đang dùng không?)\n• "1回何錠ですか?" (1 lần mấy viên?)\n• "何日間飲めますか?" (uống được mấy ngày?)\n\n5. **Thanh toán + lưu nhãn / hộp**: phòng khi cần show bác sĩ sau.',
      documents: [
        'Tiền mặt / thẻ',
      ],
      tip: 'OTC nhẹ hơn thuốc theo toa — nếu không đỡ trong 3–5 ngày, đi bác sĩ. KHÔNG kéo dài tự dùng.',
    },
    {
      step: 5,
      title: 'Quản lý thuốc dài hạn — お薬手帳 + 薬局 cố định',
      description:
        'Cho người dùng thuốc mạn tính (huyết áp, đái tháo đường, tâm thần, hen suyễn, etc.):\n\n1. **Cố định 1 薬局**:\n• Cùng 薬剤師 hiểu lịch sử bạn.\n• Theo dõi tương tác thuốc tốt hơn.\n• Một số 薬局 giảm phí cho khách hàng đều.\n\n2. **お薬手帳 đầy đủ**:\n• Mang đến mỗi lần lấy thuốc.\n• Yêu cầu dán nhãn cho mọi thuốc (kể cả OTC quan trọng).\n• Lưu cẩn thận — KHÔNG mất.\n• Dùng app お薬手帳プラス nếu giấy bị mất / lộn xộn.\n\n3. **Theo dõi tại nhà**:\n• Hộp đựng thuốc theo ngày (週間ピルケース) — dễ nhớ liều.\n• Đặt nhắc nhở điện thoại uống thuốc.\n• Ghi sổ tác dụng phụ + cải thiện.\n\n4. **Báo bác sĩ** khi:\n• Có tác dụng phụ mới.\n• Thuốc không hiệu quả.\n• Quên liều thường xuyên.\n• Sắp hết thuốc — đặt hẹn tái khám trước khi hết.\n\n5. **自立支援医療** (cho điều trị tâm thần dài hạn):\n• Giảm phí từ 30% xuống 10%.\n• Đăng ký tại 市役所 với giấy bác sĩ.\n• Có điều kiện thu nhập.\n\n6. **Khi đi du lịch**:\n• Mang đủ thuốc + thêm 1 tuần dự phòng.\n• Mang お薬手帳 + 処方箋 photo.\n• Trong checking-in: thuốc lỏng nhỏ hơn 100ml ngoại trừ thuốc theo toa.',
      documents: [
        'お薬手帳 đầy đủ',
        'Hộp đựng thuốc',
      ],
      tip: 'Dán giấy "Khi cấp cứu, gọi bác sĩ X" + danh sách thuốc + dị ứng vào tủ lạnh — emergency responders thường tìm ở đó.',
    },
  ],
};

export default pharmacyPrescriptionGuide;
