import type { AdminGuide } from '../../../../types/content';

const holidayNightMedicalCare: AdminGuide = {
  id: 'holiday-night-medical-care',
  category: 'health',
  lastVerified: '2026-08-21',
  priority: 'normal',
  title: 'Khám bệnh đêm / cuối tuần / ngày lễ',
  titleJp: '夜間・休日・祝日の診療',
  icon: 'moon-outline',
  color: '#34495E',
  description:
    'Đa số phòng khám / クリニック ở Nhật đóng cửa từ 18:00–19:00 + Chủ Nhật + ngày lễ. Khi bị bệnh ngoài giờ, có 4 lựa chọn: (1) 救急車 119 nếu nguy hiểm tính mạng, (2) 救急外来 ở bệnh viện lớn cho cấp cứu, (3) 夜間休日診療所 / 急病センター do 自治体 vận hành cho bệnh nhẹ-trung, (4) #7119 hotline tư vấn y tế (tùy 都道府県). Hiểu trước để khỏi panic + tiết kiệm phí (救急外来 đắt hơn nhiều so với 夜間休日診療所).',
  searchKeywords: [
    'khám bệnh đêm',
    'cấp cứu cuối tuần',
    'phòng khám ngày lễ',
    'sốt cao đêm',
    'đau bụng đêm',
    'con bệnh đêm',
    '夜間診療',
    '休日診療',
    '夜間休日診療所',
    '急病センター',
    '救急外来',
    '7119',
    '小児救急',
    '#8000',
    'Kyukyu',
  ],
  legalScope: {
    jurisdiction: 'mixed',
    jurisdictionNote:
      '救急車 119 do 総務省消防庁 quản lý quốc gia. 救急外来 do bệnh viện vận hành. 夜間休日診療所 / 急病センター do 自治体 (都道府県 / 市町村) vận hành — coverage + giờ + phí khác nhau theo khu. #7119 (tư vấn y tế người lớn) và #8000 (tư vấn y tế trẻ em — 子ども医療電話相談) không phải toàn quốc — kiểm tra theo 都道府県 mình. Đây là tài liệu tham khảo — gọi 119 ngay nếu nguy hiểm tính mạng, KHÔNG đợi đọc.',
    sourceVerifiedAt: '2026-08-21',
    nextReviewAt: '2027-01-15',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Triệu chứng nguy hiểm tính mạng (mất ý thức, khó thở dữ dội, đau ngực, co giật, chảy máu nhiều) — gọi 119 NGAY, không đợi.',
      'Trẻ em <3 tuổi sốt cao kéo dài — ngưỡng cấp cứu thấp hơn, nên đến bệnh viện hoặc gọi #8000.',
      'Người cao tuổi / có bệnh nền (tiểu đường, tim, COPD) — triệu chứng có thể nguy hiểm hơn.',
      'Mang thai có vấn đề bất thường (chảy máu, đau bụng dữ, không cảm thấy con cử động) — đến 産科救急.',
    ],
  },
  quickAction: {
    deadline:
      'Cấp cứu (mất ý thức, khó thở dữ dội): gọi 119 NGAY. Bệnh nhẹ-trung ngoài giờ: 夜間休日診療所 hoặc đợi đến sáng. Phân vân: gọi #7119 (người lớn) hoặc #8000 (trẻ em) nếu khu mình có.',
    office:
      '**Cấp cứu**: 119. **救急外来**: bệnh viện lớn — đắt nhưng 24/7. **夜間休日診療所 / 急病センター**: do 自治体 vận hành — rẻ hơn, giờ giới hạn (vd 19:00–22:00 ngày thường + Chủ Nhật / lễ ban ngày). **#7119**: tư vấn y tế cấp cứu (tùy khu). **#8000**: tư vấn y tế trẻ em (tùy khu).',
    doNow: [
      'Đánh giá triệu chứng: NGUY HIỂM TÍNH MẠNG hay không? (mất ý thức, khó thở dữ dội, đau ngực, co giật, chảy máu nặng → gọi 119 NGAY).',
      'Không nguy hiểm tính mạng nhưng cần khám gấp: tìm 夜間休日診療所 / 急病センター khu mình. Search "Tên 市町村 + 夜間休日診療所" hoặc gọi #7119 hỏi.',
      'Triệu chứng có thể đợi đến sáng: ở nhà uống nước + nghỉ. Đặt hẹn クリニック sáng mai.',
      'Phân vân không rõ → gọi #7119 (người lớn) hoặc #8000 (trẻ em) — tư vấn miễn phí. Nếu khu không có #7119 → gọi 救急外来 bệnh viện lớn hỏi.',
      'Mang đầy đủ: 保険証 / マイナンバーカード / 資格確認書, 在留カード, tiền mặt 5,000–15,000円 (救急外来 đắt), お薬手帳.',
    ],
    bring: [
      'マイナ保険証 / 資格確認書 (保険証 giấy cũ hầu như đã hết hạn từ 01/08/2026)',
      '在留カード',
      'Tiền mặt 5,000–15,000円 (救急外来 thường đắt hơn ngày thường)',
      'お薬手帳 (sổ thuốc) + danh sách thuốc đang dùng',
      '母子手帳 (cho trẻ em <16 tuổi)',
      'Triệu chứng ghi rõ + thời gian bắt đầu',
    ],
    ifLate:
      'Đã quá khuya, 夜間休日診療所 đã đóng (thường 22:00–23:00) + chưa đến mức 119: ở nhà nghỉ ngơi + uống nước + dùng thuốc OTC nếu có (giảm sốt: paracetamol). Đến sáng đi クリニック ngay khi mở cửa. Nếu xấu đi đêm: gọi 119 hoặc đến 救急外来.',
    officialSourceLabels: ['総務省消防庁'],
  },
  whoIsThisFor: [
    'Người Việt sống ở Nhật bị bệnh đêm / cuối tuần / ngày lễ.',
    'Cha mẹ có con nhỏ — trẻ em hay sốt đột ngột.',
    'Người mới sang Nhật chưa biết hệ thống y tế ngoài giờ.',
    'Người cao tuổi / bệnh nền — cần biết khi nào nguy hiểm.',
    'Đi du lịch / công tác Nhật — bị bệnh xa nhà.',
  ],
  whenToDo: [
    'Đọc TRƯỚC khi cần — phân biệt cấp cứu thật và bệnh nhẹ giúp giảm panic + tiết kiệm phí.',
    'Khi triệu chứng xuất hiện đột ngột ngoài giờ.',
    'Sau giờ làm việc クリニック (thường 18:00).',
    'Cuối tuần (thứ 7 thường nửa ngày, Chủ Nhật + lễ đa số đóng).',
    'Tuần lễ Tết Nhật (年末年始: 29/12 – 3/1) — nhiều phòng khám đóng dài.',
    'Tuần Golden Week (29/4 – 5/5).',
  ],
  whereToDo: [
    '**119 救急車**: cho nguy hiểm tính mạng — không phí (hiện tại miễn phí toàn quốc, một số tỉnh thí điểm thu phí — kiểm tra với 都道府県).',
    '**救急外来 (bệnh viện lớn)**: 24/7. Đắt + chờ lâu. Cho cấp cứu cấp tính.',
    '**夜間休日診療所 / 急病センター**: do 自治体 vận hành — phí thường thấp hơn 救急外来. Giờ giới hạn (vd 19:00–22:00 ngày thường + 9:00–17:00 Chủ Nhật).',
    '**夜間小児救急**: phòng khám trẻ em ngoài giờ — một số 都道府県 có riêng.',
    '**24時間営業 クリニック**: ít, nhưng có ở Tokyo / Osaka. Phí cao hơn ngày thường.',
    '**#7119 / #8000 hotline**: tư vấn y tế qua điện thoại — không khám trực tiếp.',
  ],
  estimatedTime:
    '夜間休日診療所: 30 phút – 2 giờ tùy đông. 救急外来: 1–4 giờ (đông cấp cứu). 119 救急車: tới trong 5–10 phút (thành phố), đến bệnh viện 30–60 phút. #7119 tư vấn: 5–15 phút.',
  fees: [
    '**119 救急車**: hiện đang miễn phí toàn quốc. Một số tỉnh/thành đã áp dụng thu phí selection fee (~7,700円–13,000円) cho trường hợp gọi 救急車 mà không thực sự cấp cứu khi đến bệnh viện lớn không có giấy giới thiệu — bắt đầu từ Mie 三重県 (2024), nay đã mở rộng ra toàn tỉnh Ibaraki 茨城県 và một số thành phố như Nagasaki 長崎市 (từ 07/2026) — kiểm tra với 都道府県/市 nơi mình sống.',
    '**夜間休日診療所** với 保険証: thường 1,500–4,000円 lần đầu (đã 30%).',
    '**救急外来** với 保険証: thường 5,000–15,000円 lần đầu (đã 30%) — đắt hơn ngày thường vì 時間外加算 / 休日加算 / 深夜加算.',
    '**24時間 クリニック** với 保険証: thường 3,000–10,000円 (đắt hơn ngày thường 50–100%).',
    '**Không có 保険証**: trả 100% — có thể vài chục nghìn yên cho 救急外来.',
    '**#7119 / #8000**: phí cuộc gọi điện thoại bình thường, tư vấn miễn phí.',
    '**Phí thay đổi** — kiểm tra với cơ sở y tế cụ thể.',
  ],
  documentsChecklist: [
    { label: 'マイナ保険証 / 資格確認書 / 保険証 giấy còn hạn', required: true, note: 'Từ 01/08/2026, đa số 保険証 giấy đã hết hạn — chủ yếu dùng マイナ保険証 hoặc 資格確認書 (xem guide myna-health-insurance-card-2026). Thiếu = trả 100% — đắt gấp ~3 lần.' },
    { label: '在留カード', required: false, note: 'Một số bệnh viện hỏi.' },
    { label: 'Tiền mặt 5,000–15,000円', required: true, note: '救急外来 thường đắt hơn ngày thường. ATM bệnh viện không phải lúc nào cũng có.' },
    { label: 'お薬手帳 + danh sách thuốc', required: false, note: 'Quan trọng — bác sĩ cấp cứu cần biết để tránh tương tác thuốc.' },
    { label: '母子手帳', required: false, note: 'Cho trẻ <16 tuổi — có lịch tiêm, cân nặng, lịch sử bệnh.' },
    { label: 'Smartphone + sạc', required: false, note: 'Cho app dịch + liên lạc gia đình.' },
  ],
  commonMistakes: [
    'Chần chừ vì sợ đắt → bệnh xấu đi → 救急車 vẫn phải gọi + phí cao hơn nhiều.',
    'Tin "救急車 chắc chắn miễn phí" — Mie 三重県 đã thu phí cho non-emergency từ 2024, nay 茨城県 (toàn tỉnh) và Nagasaki 長崎市 (từ 07/2026) cũng áp dụng. Tỉnh/thành khác đang xem xét. Kiểm tra với 都道府県/市.',
    'Đến 救急外来 cho bệnh nhẹ → đắt + chờ lâu + chiếm chỗ người cấp cứu thật. Đi 夜間休日診療所 phù hợp hơn.',
    'Không gọi #7119 trước → tốn công đến nơi sai cấp / không cần thiết.',
    'Không biết khu mình có #7119 / #8000 hay không — search Google trước khi cần.',
    'Đi 救急外来 không có 保険証 → phí khổng lồ (vài vạn yên).',
    'Trẻ em <3 tuổi sốt cao + chần chừ "đợi đến sáng" — trẻ nhỏ ngưỡng cấp cứu thấp hơn, nên đến viện sớm.',
    'Tự uống thuốc trẻ em không đúng liều — gọi #8000 trước khi cho uống.',
  ],
  faq: [
    {
      question: 'Triệu chứng nào nên gọi 119 (救急車) ngay?',
      answer:
        '7 dấu hiệu nguy hiểm tính mạng → 119 NGAY:\n\n1. **Mất ý thức** / không phản ứng.\n2. **Khó thở dữ dội** / không thở được.\n3. **Đau ngực dữ dội** kéo dài (có thể nhồi máu cơ tim).\n4. **Co giật** kéo dài >5 phút hoặc nhiều cơn liên tiếp.\n5. **Chảy máu nặng** không cầm được.\n6. **Đột quỵ**: méo miệng, yếu nửa người, nói khó (FAST: Face / Arm / Speech / Time).\n7. **Phụ nữ chuyển dạ** / có nguy cơ sinh non.\n\nKHÔNG gọi 119 cho:\n• Sốt nhẹ-trung không có triệu chứng nguy hiểm.\n• Đau đầu thông thường.\n• Đau bụng nhẹ-trung.\n• Cảm cúm.\n→ Đi 夜間休日診療所 hoặc đợi sáng.',
    },
    {
      question: '#7119 / #8000 có khắp Nhật không?',
      answer:
        'KHÔNG. Coverage thay đổi theo 都道府県:\n\n**#7119** (救急安心センター — tư vấn người lớn):\n• Có ở: Tokyo, Osaka, Aichi, Kanagawa, Nara, Kyoto, Hiroshima, và nhiều 都道府県 khác.\n• KHÔNG có hoặc giới hạn: một số tỉnh nhỏ.\n• Search "Tên 都道府県 + #7119" để biết.\n\n**#8000** (子ども医療電話相談 — tư vấn trẻ em):\n• Có ở **HẦU HẾT 都道府県** (toàn quốc dần dần).\n• Giờ thường: 19:00–8:00 ngày thường + cả ngày Chủ Nhật / lễ.\n• Có thể tự động kết nối số phù hợp khu mình.\n\nNếu khu mình không có:\n• Gọi 救急外来 bệnh viện lớn hỏi tư vấn.\n• Gọi 多文化共生センター hoặc 国際交流協会 — họ có thể giới thiệu.',
    },
    {
      question: 'Con tôi 2 tuổi sốt 39°C đêm — đi 救急外来 hay đợi sáng?',
      answer:
        'Tùy thêm yếu tố:\n\n**Đến viện ngay (救急外来 hoặc 夜間小児救急)**:\n• Sốt + thở khó / nhanh.\n• Sốt + co giật.\n• Sốt + nôn liên tục, không uống được nước.\n• Sốt + ngủ li bì, không tỉnh táo.\n• Sốt + phát ban dạng "tử ban" (chấm tím không biến mất khi ấn).\n• Trẻ <3 tháng tuổi sốt bất kỳ.\n• Sốt >40°C kéo dài.\n\n**Có thể chăm sóc tại nhà + đi sáng**:\n• Sốt 38–39°C nhưng trẻ vẫn tỉnh táo, uống nước được, không khó thở.\n• Có thể dùng thuốc hạ sốt (paracetamol — KHÔNG dùng aspirin).\n• Theo dõi sát.\n\n**Phân vân**: gọi **#8000** — chuyên gia y tế nhi tư vấn 24/7. Họ giúp đánh giá có nên đến viện không.\n\nQuy tắc: **Càng nhỏ tuổi, càng nên đến viện sớm.** Trẻ <3 tháng — đến viện ngay khi có sốt.',
    },
    {
      question: 'Tôi đến 救急外来 ngoài giờ — có khám tiếng Việt không?',
      answer:
        'KHÔNG đảm bảo. Một số bệnh viện đại học lớn có hệ thống thông dịch đa ngôn ngữ 24/7, nhưng đa số 救急外来 không có thông dịch tiếng Việt sẵn ngoài giờ.\n\n**Cách xử lý**:\n\n1. **Gọi AMDA** (03-6233-9266 Tokyo / 06-4395-0555 Osaka) trên đường đến — họ có thể thông dịch qua điện thoại 24/7 (tiếng Việt theo lịch).\n\n2. **Smartphone với app dịch** (Google Translate có chế độ camera dịch + voice — rất hữu dụng).\n\n3. **Tự viết triệu chứng tiếng Việt + tự dịch sang Nhật trước** — đưa giấy này khi đến viện. Phòng cấp cứu thường có sẵn 問診票 đa ngôn ngữ.\n\n4. **Nhờ người thân Nhật / bạn nói tiếng Nhật đi cùng** nếu có thể.\n\n5. **Bệnh viện đại học** thường có 国際診療部 — gọi hỏi trước khi đến.\n\nXem thêm guide medical-interpretation-multilingual-hospitals.',
    },
    {
      question: '救急車 đến mất bao lâu?',
      answer:
        'Trung bình toàn quốc theo 総務省消防庁:\n\n• **Thành phố lớn** (Tokyo, Osaka): 5–10 phút.\n• **Vùng ngoại ô**: 10–15 phút.\n• **Nông thôn**: 15–30 phút (có thể lâu hơn).\n\nThời gian đến bệnh viện sau đó:\n• Thành phố: 30–60 phút (tổng từ lúc gọi).\n• Vùng xa: 60–120 phút.\n\n**Để gọi 救急車 hiệu quả**:\n• Nói rõ địa chỉ chi tiết (số nhà, tòa, tầng, phòng).\n• Cho biết ngắn gọn triệu chứng + tuổi người bệnh.\n• Cử người ra đầu ngõ vẫy xe (đặc biệt chung cư phức tạp).\n• Mở cửa chính.\n• Chuẩn bị 在留カード + 保険証 + お薬手帳.\n\nTrong khi đợi: ở bên cạnh người bệnh, theo dõi ý thức + thở. Nếu ngừng thở → CPR (nếu biết) — tổng đài 119 có thể hướng dẫn qua điện thoại.\n\nXem guide emergency-calls-japan cho chi tiết gọi 119.',
    },
  ],
  counterPhrases: [
    {
      jp: '夜間休日診療所はどこですか。',
      romaji: 'Yakan kyuujitsu shinryousho wa doko desu ka.',
      vn: '夜間休日診療所 ở đâu?',
      note: 'Hỏi #7119 hoặc 多文化共生センター khi cần khám đêm.',
    },
    {
      jp: '今、診てもらえますか。',
      romaji: 'Ima, mite moraemasu ka.',
      vn: 'Bây giờ có khám được không?',
      note: 'Gọi 救急外来 / 夜間休日診療所 trước khi đi.',
    },
    {
      jp: '子どもが高熱です。',
      romaji: 'Kodomo ga kounetsu desu.',
      vn: 'Con tôi bị sốt cao.',
      note: 'Triệu chứng phổ biến — gọi #8000 hoặc đến 夜間小児救急.',
    },
    {
      jp: '救急車を呼びましたか。',
      romaji: 'Kyuukyuusha o yobimashita ka.',
      vn: 'Đã gọi xe cấp cứu chưa?',
      note: 'Khi gặp người khác bị nạn — hỏi để biết.',
    },
    {
      jp: '保険証を忘れました。',
      romaji: 'Hokenshou o wasuremashita.',
      vn: 'Tôi quên thẻ bảo hiểm.',
      note: 'Báo trước tại quầy — một số viện cho mang sau, một số tính 100%.',
    },
    {
      jp: '#7119に電話しました。',
      romaji: 'Nana ichi ichi kyuu ni denwa shimashita.',
      vn: 'Tôi đã gọi #7119.',
      note: 'Báo cho 救急外来 biết bạn đã được tư vấn — có thể giúp triage.',
    },
    {
      jp: 'いつから症状がありますか。',
      romaji: 'Itsu kara shoujou ga arimasu ka.',
      vn: '(Câu bác sĩ hỏi) Triệu chứng từ khi nào?',
      note: 'Hiểu để trả lời. Trả lời: "○時間前から / ○日前から".',
    },
  ],
  officialLinks: [
    { label: '総務省消防庁', url: 'https://www.fdma.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'TRƯỚC khi cần — chuẩn bị thông tin',
      description:
        '5 việc làm hôm nay (5 phút):\n\n1. **Tìm 夜間休日診療所 / 急病センター** khu mình:\n• Search Google: "Tên 市町村 + 夜間休日診療所" hoặc "+ 急病センター".\n• Lưu địa chỉ + số điện thoại + giờ làm việc vào điện thoại.\n\n2. **Kiểm tra #7119 / #8000**:\n• Search "Tên 都道府県 + #7119".\n• Search "Tên 都道府県 + #8000".\n• Lưu vào contact.\n\n3. **Tìm bệnh viện 救急外来 gần** (có 24/7):\n• Bệnh viện đại học + bệnh viện lớn ở 市 thường có.\n• Lưu địa chỉ.\n\n4. **Lưu số AMDA**:\n• Tokyo (Đông Nhật): 03-6233-9266\n• Osaka (Tây Nhật): 06-4395-0555\n\n5. **Chuẩn bị "kit cấp cứu" trong nhà**:\n• Thuốc hạ sốt (paracetamol — KHÔNG aspirin cho trẻ em).\n• Thuốc đau bụng / tiêu chảy cơ bản.\n• Băng cứu thương.\n• Thermometer (đo nhiệt độ).\n• Số contact các nguồn trên.',
      documents: [
        'Smartphone',
        'Internet',
      ],
      tip: '5 phút setup hôm nay = giảm panic + tiết kiệm thời gian khi cần thật. Đặc biệt quan trọng nếu có trẻ nhỏ / người cao tuổi trong nhà.',
    },
    {
      step: 2,
      title: 'Khi triệu chứng xuất hiện — đánh giá nhanh',
      description:
        '**3 câu hỏi tự đánh giá** (30 giây):\n\n1. **Có nguy hiểm tính mạng không?** (mất ý thức, khó thở dữ dội, đau ngực dữ dội, co giật, chảy máu nặng)\n• **CÓ** → 119 NGAY.\n• **KHÔNG** → câu hỏi 2.\n\n2. **Có thể đợi đến sáng không?**\n• Triệu chứng nhẹ + ổn định → ở nhà nghỉ + đi sáng.\n• Triệu chứng nặng dần / không thể đợi → câu hỏi 3.\n\n3. **Cần khám bây giờ — đi đâu?**\n• Bệnh nhẹ-trung: 夜間休日診療所.\n• Bệnh nặng (nhưng không 119): 救急外来.\n• Phân vân → gọi #7119 (người lớn) / #8000 (trẻ em) tư vấn.\n\n**Tín hiệu cần đặc biệt cẩn thận** (ngưỡng cấp cứu thấp hơn):\n• Trẻ em <3 tuổi.\n• Người >65 tuổi.\n• Phụ nữ mang thai.\n• Người có bệnh nền (tim, tiểu đường, COPD, ung thư).\n• Người dùng thuốc giảm miễn dịch.\n\nĐối với các nhóm này — nên đến viện sớm hơn người khỏe mạnh.',
      documents: [],
      tip: 'Khi không chắc — gọi #7119 hoặc #8000. Họ là chuyên gia, đánh giá tốt hơn bạn 1 mình. Không phải "phiền họ" — đó là việc của họ.',
    },
    {
      step: 3,
      title: '#7119 / #8000 — gọi tư vấn trước',
      description:
        '**Khi nào nên gọi**:\n• Phân vân giữa "ở nhà" và "đi viện".\n• Không biết đi viện loại nào (夜間休日診療所 vs 救急外来).\n• Trẻ em sốt + cha mẹ lo nhưng không chắc nguy hiểm.\n\n**Cách dùng #7119** (người lớn, tùy 都道府県 có):\n1. Gọi #7119 từ điện thoại.\n2. Tự động kết nối với 救急安心センター khu.\n3. Y tá / bác sĩ trực tư vấn:\n• Mô tả triệu chứng.\n• Họ đánh giá: cấp cứu / đến viện thường / chăm sóc tại nhà.\n• Có thể giới thiệu cơ sở y tế gần nhất phù hợp.\n\n**Cách dùng #8000** (trẻ em):\n1. Gọi #8000.\n2. Tự động kết nối tư vấn nhi khoa khu.\n3. Y tá / bác sĩ nhi tư vấn về:\n• Triệu chứng có nguy hiểm không.\n• Nên đợi hay đến viện.\n• Thuốc gì có thể dùng tại nhà (liều).\n\n**Ngôn ngữ**: chủ yếu tiếng Nhật. Một số khu có đa ngôn ngữ — hỏi trước.\n\n**Phí**: phí cuộc gọi điện thoại bình thường — tư vấn miễn phí.',
      documents: [
        'Điện thoại',
      ],
      tip: 'Lần đầu gọi nhớ chuẩn bị: tuổi người bệnh, triệu chứng cụ thể, thời gian bắt đầu, thuốc đang dùng. Y tá cần biết để đánh giá đúng.',
    },
    {
      step: 4,
      title: 'Đi 夜間休日診療所 hoặc 救急外来',
      description:
        '**夜間休日診療所 / 急病センター** (cho bệnh nhẹ-trung):\n• Giờ thường: 19:00–22:00 / 23:00 ngày thường + 9:00–22:00 Chủ Nhật / lễ.\n• Một số khu có riêng cho trẻ em (夜間小児救急).\n• Phí thường thấp hơn 救急外来.\n• Đến trực tiếp hoặc gọi trước.\n\n**救急外来** (cho bệnh nặng / không nguy hiểm tính mạng nhưng cần khám gấp):\n• 24/7 ở bệnh viện lớn.\n• Phí cao hơn ngày thường (時間外加算 + 休日加算 + 深夜加算).\n• Đông + chờ lâu (1–4 giờ).\n• Triage — bệnh nguy hiểm hơn được khám trước.\n\n**Tại quầy**:\n1. Xuất trình 保険証 / マイナンバーカード / 資格確認書 + 在留カード.\n2. Điền 問診票 (form triệu chứng).\n3. Đợi gọi tên.\n4. Gặp bác sĩ → khám → kê đơn.\n5. Ra quầy thanh toán + nhận đơn thuốc.\n\n**Sau khám**:\n• Nếu ngoài giờ 薬局: bệnh viện có thể cấp thuốc trực tiếp 1–3 ngày.\n• Hoặc tìm 24時間 薬局 / dùng đơn vào sáng hôm sau.\n• Đặt hẹn theo dõi với クリニック thường vào sáng nếu cần.',
      documents: [
        '保険証 / マイナンバーカード / 資格確認書',
        '在留カード',
        'Tiền mặt 5,000–15,000円',
        'お薬手帳',
        '母子手帳 (cho trẻ <16 tuổi)',
      ],
      tip: 'Đi với người thân / bạn nếu có thể — đỡ stress + có người thông dịch / hỗ trợ hồi nhà.',
    },
    {
      step: 5,
      title: 'Sau khám — theo dõi + tái khám',
      description:
        '**Tại nhà**:\n\n1. **Uống thuốc đúng giờ + đúng liều** theo chỉ định.\n\n2. **Theo dõi triệu chứng**:\n• Sốt: đo nhiệt độ 4–6 lần/ngày.\n• Đau: ghi mức độ 1–10.\n• Triệu chứng khác: ngủ, ăn, vệ sinh.\n\n3. **Dấu hiệu cần đến viện lại NGAY**:\n• Triệu chứng không cải thiện sau 24–48 giờ điều trị.\n• Triệu chứng xấu đi.\n• Triệu chứng mới xuất hiện.\n• Tác dụng phụ thuốc nặng (phát ban, khó thở, nôn không kiểm soát).\n• Trẻ em: mất tỉnh táo / không uống được nước.\n\n4. **Tái khám với クリニック thường** vào ngày tiếp theo (nếu cần) — bệnh viện cấp cứu chỉ cấp thuốc ngắn hạn, クリニック thường theo dõi tiếp.\n\n5. **Lưu giấy tờ y tế**:\n• Đơn thuốc + 領収書 (cho 医療費控除 thuế cuối năm).\n• Chẩn đoán / kết quả xét nghiệm.\n• Có thể cần show cho bác sĩ tiếp theo.\n\n6. **Phòng ngừa lần sau**:\n• Hiểu nguyên nhân để tránh.\n• Nếu là dấu hiệu bệnh mạn tính → bắt đầu theo dõi định kỳ với クリニック.',
      documents: [
        'Đơn thuốc + 領収書',
        'Chẩn đoán + kết quả',
      ],
      tip: 'Lưu tất cả giấy tờ y tế trong 1 folder + chụp ảnh cloud. Giảm stress khi cần show + dễ tham khảo lần sau.',
    },
  ],
};

export default holidayNightMedicalCare;
