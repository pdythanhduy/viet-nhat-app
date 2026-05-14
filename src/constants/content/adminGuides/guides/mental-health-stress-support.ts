import type { AdminGuide } from '../../../../types/content';

const mentalHealthStressSupport: AdminGuide = {
  id: 'mental-health-stress-support',
  category: 'health',
  lastVerified: '2026-05-09',
  priority: 'normal',
  title: 'Sức khỏe tâm thần — stress, lo âu, hotline hỗ trợ',
  titleJp: 'メンタルヘルス — ストレス・不安・相談窓口',
  icon: 'heart-outline',
  color: '#9B59B6',
  description:
    'Sống ở nước ngoài tạo nhiều áp lực tâm lý: cô đơn, văn hóa khác, công việc / học tập căng, gia đình xa. Triệu chứng phổ biến: mất ngủ, lo âu, mất hứng thú, dễ cáu, đau đầu / dạ dày không rõ nguyên nhân. **Đây KHÔNG phải dấu hiệu yếu đuối** — đây là phản ứng bình thường của cơ thể, **phổ biến + có thể điều trị**. Có nguồn hỗ trợ miễn phí + đa ngôn ngữ ở Nhật. Trong tình huống nghĩ đến tự hại / tự tử, gọi hotline NGAY — bạn không một mình. Đây không phải tư vấn y tế cá nhân — bệnh nặng cần bác sĩ chuyên môn (精神科 / 心療内科).',
  searchKeywords: [
    'sức khỏe tâm thần',
    'stress',
    'lo âu',
    'mất ngủ',
    'trầm cảm',
    'tự tử',
    'tự hại',
    'cô đơn',
    'mệt mỏi tinh thần',
    'メンタル',
    'メンタルヘルス',
    'ストレス',
    'うつ病',
    '不眠',
    '不安',
    '精神科',
    '心療内科',
    'いのちの電話',
    'よりそいホットライン',
    'tư vấn tâm lý miễn phí',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      '厚生労働省 phụ trách chính sách sức khỏe tâm thần quốc gia. Hotline tư vấn tâm lý có nhiều cấp: quốc gia (いのちの電話, よりそいホットライン), cấp 都道府県 (精神保健福祉センター), cấp 市町村 (保健所). Bệnh viện 精神科 / 心療内科 có 健康保険 chi trả 70%. **Đây là tài liệu tham khảo** — không thay thế tư vấn bác sĩ / 心理士. Trường hợp khẩn cấp tính mạng → gọi 119 hoặc hotline ngay.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'high',
    whenToAskExpert: [
      'Triệu chứng kéo dài >2 tuần (mất ngủ, mất hứng thú, ăn không ngon, mệt mỏi không lý do) — cần bác sĩ 精神科 / 心療内科 đánh giá.',
      'Có suy nghĩ tự hại / tự tử — gọi hotline NGAY hoặc 119. KHÔNG đợi.',
      'Bị bạo lực / lạm dụng (DV, sexual harassment, lao động cưỡng bức) — gọi hotline DV hoặc 110.',
      'Trẻ em / thiếu niên có dấu hiệu trầm cảm / bắt nạt — liên hệ 教育委員会 + child counselor.',
    ],
  },
  quickAction: {
    deadline:
      'Khẩn cấp (suy nghĩ tự tử / tự hại): gọi NGAY. Không khẩn cấp (stress kéo dài): đặt hẹn 心療内科 trong 1–2 tuần. Tư vấn miễn phí: tùy giờ làm hotline.',
    office:
      '**Khẩn cấp**: 119 (cứu thương), いのちの電話 0570-783-556, よりそいホットライン 0120-279-338. **Không khẩn cấp**: bệnh viện có 心療内科 / 精神科 (quy trình giống guide clinic-hospital-visit-guide), 精神保健福祉センター ở 都道府県, 保健所 ở 市町村. **Tư vấn miễn phí**: 多文化共生センター (xem guide foreign-resident-support-centers), 国際交流協会, NPO chuyên hỗ trợ người nước ngoài.',
    doNow: [
      'Đánh giá triệu chứng: mức độ (nhẹ / trung bình / nặng), thời gian (vài ngày / vài tuần / vài tháng), có nghĩ tự hại không. Nếu có ý định tự hại → gọi hotline NGAY.',
      'Hotline KHẨN CẤP (24/7 hoặc nhiều giờ): いのちの電話 0570-783-556, よりそいホットライン 0120-279-338 (đa ngôn ngữ, có thể có tiếng Việt tùy ca trực).',
      'Triệu chứng kéo dài >2 tuần: đặt hẹn 心療内科 hoặc 精神科 — gọi điện đặt 予約.',
      'Tư vấn miễn phí + chuyên về người nước ngoài: 多文化共生センター, 国際交流協会, hoặc NPO địa phương.',
      'Trong khi chờ: ngủ đủ, ăn đủ, đi bộ ngoài trời 15 phút/ngày. Tránh rượu / cờ bạc / mua sắm bốc đồng (làm trầm trọng thêm).',
    ],
    bring: [
      '保険証 / マイナンバーカード / 資格確認書 (cho bệnh viện)',
      '在留カード',
      'Tiền mặt 5,000–10,000円 (lần khám đầu)',
      'Sổ ghi triệu chứng (ngày bắt đầu, mức độ, hoàn cảnh)',
      'Danh sách thuốc đang uống (nếu có)',
      'Người thân / bạn đi cùng nếu sợ đi 1 mình',
    ],
    ifLate:
      'Triệu chứng kéo dài lâu mà chưa đi khám → vẫn không quá muộn. Bệnh tâm thần phổ biến + có thể điều trị. Bắt đầu bằng hotline hoặc 多文化共生センター nếu sợ bệnh viện. **Trong tình huống nghĩ đến tự tử**: gọi 119 hoặc hotline NGAY, không đợi.',
    officialSourceLabels: ['厚生労働省 — メンタルヘルス'],
  },
  whoIsThisFor: [
    'Người Việt sống ở Nhật trải qua stress / lo âu / cô đơn / mất ngủ kéo dài.',
    'Người mới sang Nhật (3–6 tháng đầu thường khó khăn nhất).',
    'Người gặp sự kiện lớn: mất việc, ly hôn, mất người thân, bị bạo lực, gia đình xa cách.',
    'Người làm việc nặng / thực tập sinh / du học sinh có áp lực cao.',
    'Cha mẹ có con đi học khó hòa nhập (stress lan từ con sang phụ huynh).',
    'NẾU bạn đang nghĩ đến tự hại / tự tử — gọi hotline NGAY: いのちの電話 0570-783-556 hoặc 119.',
  ],
  whenToDo: [
    'Khi triệu chứng kéo dài >2 tuần.',
    'Khi đời sống hằng ngày bị ảnh hưởng (không tập trung được, không làm việc / học bình thường).',
    'Khi có suy nghĩ tự hại / tự tử — NGAY LẬP TỨC.',
    'Sau sự kiện lớn (mất người thân, ly hôn, mất việc, tai nạn) trong 1–3 tháng đầu.',
    'Định kỳ tự kiểm tra: 1 lần/tháng, dùng test online như WHO-5 hoặc PHQ-9 (có tiếng Việt).',
  ],
  whereToDo: [
    '**Hotline khẩn cấp** (24/7 hoặc giờ rộng):\n• いのちの電話: 0570-783-556 (tiếng Nhật, 24/7).\n• よりそいホットライン: 0120-279-338 (đa ngôn ngữ, có ấn 2 cho ngoại ngữ).\n• 119 nếu nguy hiểm tính mạng.',
    '**Bệnh viện chuyên môn**:\n• 心療内科 — bệnh viện chuyên về stress + body symptoms từ tâm lý.\n• 精神科 — chuyên về tâm thần (depression, anxiety, schizophrenia).\n• Một số bệnh viện 内科 cũng có thể tư vấn ban đầu + giới thiệu chuyên khoa.',
    '**Tư vấn miễn phí**:\n• 精神保健福祉センター (cấp 都道府県) — chuyên về tâm thần.\n• 保健所 (cấp 市町村) — y tế chung, có hotline.\n• 多文化共生センター — cho người nước ngoài.\n• 国際交流協会 — đôi khi có tư vấn tâm lý đa ngôn ngữ.',
    '**Online**:\n• Cocomi-meta (NPO, có tiếng Việt giới hạn).\n• Yoriso Hotline (chat).\n• AMDA International Medical Information Center: thông dịch y tế, có tiếng Việt.',
  ],
  estimatedTime:
    'Hotline: 10–60 phút mỗi cuộc gọi. Bệnh viện 心療内科 lần đầu: 1–2 giờ (hỏi lịch sử + đánh giá). Theo dõi định kỳ: 30 phút mỗi 2–4 tuần. Điều trị có thể kéo dài vài tháng đến vài năm tùy mức độ.',
  fees: [
    '**Hotline tư vấn**: thường MIỄN PHÍ (hoặc phí cuộc gọi điện thoại thông thường).',
    '**Bệnh viện 心療内科 / 精神科 với 保険証**: trả 30%. Lần đầu thường 1,500–4,000円, theo dõi 1,000–3,000円/lần.',
    '**Thuốc**: 抗うつ薬 (chống trầm cảm), 抗不安薬 (chống lo âu), 睡眠薬 — có 保険証 trả 30%, thường 500–3,000円/tháng tùy thuốc.',
    '**Tư vấn 心理士 / カウンセリング**: KHÔNG bảo hiểm thường (tự trả). 5,000–15,000円/buổi 50 phút. Có thể đắt — hỏi 多文化共生 hoặc NPO cho lựa chọn rẻ.',
    '**自立支援医療**: chương trình giảm phí cho điều trị tâm thần dài hạn. Chỉ trả 10% thay vì 30%. Đăng ký tại 市役所 — có điều kiện thu nhập.',
    'Phí tham khảo — kiểm tra với bệnh viện cụ thể.',
  ],
  documentsChecklist: [
    { label: '保険証 / マイナンバーカード / 資格確認書', required: true, note: 'Để dùng bảo hiểm khi khám bệnh viện. Thiếu = trả 100%.' },
    { label: '在留カード', required: true, note: 'Một số bệnh viện hỏi.' },
    { label: 'Tiền mặt 5,000–10,000円', required: true, note: 'Lần khám đầu thường 3,000–5,000円 + thuốc.' },
    { label: 'Sổ ghi triệu chứng', required: false, note: 'Ngày bắt đầu, mức độ, hoàn cảnh, có gì làm tốt hơn / xấu đi. Giúp bác sĩ chẩn đoán.' },
    { label: 'お薬手帳 / danh sách thuốc đang dùng', required: false, note: 'Quan trọng — thuốc tâm thần có nhiều tương tác.' },
    { label: 'Người thân / bạn đi cùng', required: false, note: 'Đặc biệt lần đầu. Có thể giúp bạn nhớ + dịch nếu cần.' },
  ],
  commonMistakes: [
    'Chần chừ vì "tôi yếu đuối" / "đó không phải bệnh" — bệnh tâm thần phổ biến + có thể điều trị. Càng để lâu càng khó.',
    'Tự dùng rượu / cờ bạc / mua sắm để "giải tỏa" — làm trầm trọng thêm. Tạm thời thoải mái nhưng vòng xoáy xuống.',
    'Đợi cho đến khi suy nghĩ tự tử mới gọi hotline → đó là quá muộn. Hotline cho mọi mức độ stress, không chỉ tự tử.',
    'Tin "tôi không nói được tiếng Nhật, không gọi được" → よりそいホットライン có đa ngôn ngữ. Nhiều khu có tư vấn tiếng Việt qua 多文化共生.',
    'Tự ngừng thuốc khi cảm thấy tốt hơn → đa số thuốc tâm thần cần dùng ổn định nhiều tháng. Ngừng đột ngột → withdrawal + tái phát.',
    'Không nói cho gia đình / bạn bè vì sợ bị phán xét → cô lập làm trầm trọng. Có 1 người tin cậy biết là đủ.',
    'Đi 内科 thường vì "không phải tâm thần" → 内科 không chuyên môn. Đi 心療内科 hoặc 精神科 cho đúng.',
    'Bỏ qua test online vì sợ kết quả → test KHÔNG phải chẩn đoán. Chỉ là tham khảo + công cụ tự nhận biết.',
  ],
  faq: [
    {
      question: 'Tôi không biết là tôi có bị "trầm cảm" hay chỉ buồn — phân biệt thế nào?',
      answer:
        'Buồn bình thường: do sự kiện cụ thể, kéo dài vài ngày – 1–2 tuần, có lúc thoải mái, vẫn làm việc / ăn / ngủ.\n\nTrầm cảm có thể nghi ngờ khi:\n• Triệu chứng kéo dài >2 tuần.\n• Mất hứng thú với hoạt động trước đây thích.\n• Mất ngủ / ngủ quá nhiều.\n• Mất / tăng cân không lý do.\n• Mệt mỏi không lý do.\n• Khó tập trung.\n• Cảm giác vô giá trị / tội lỗi.\n• Suy nghĩ tự hại.\n\nLàm test online (WHO-5 hoặc PHQ-9 — có bản tiếng Việt) để tự đánh giá. Nếu điểm cao → đi 心療内科. Test KHÔNG phải chẩn đoán chính thức — chỉ là công cụ.',
    },
    {
      question: 'Tôi sợ gọi hotline vì không nói được tiếng Nhật — có hotline tiếng Việt không?',
      answer:
        'Có một số nguồn:\n\n• **よりそいホットライン**: 0120-279-338. Ấn 2 cho 外国語 (đa ngôn ngữ — có tiếng Việt tùy ca trực).\n• **AMDA International Medical Information Center**: 03-6233-9266 (Tokyo) hoặc 06-4395-0555 (Osaka). Có thông dịch y tế đa ngôn ngữ — có thể giúp connect bạn với bệnh viện có thông dịch.\n• **Đại sứ quán Việt Nam Tokyo / lãnh sự Osaka, Fukuoka**: hotline bảo hộ công dân — ngôn ngữ tiếng Việt, có thể giới thiệu nguồn hỗ trợ tâm lý.\n• **Cộng đồng người Việt**: nhóm Facebook "Người Việt ở [tên 都道府県]" — có thể chia sẻ kinh nghiệm + bạn cùng cảnh.\n\nKhi gọi hotline tiếng Nhật mà không nói được: chuẩn bị 1 câu "ベトナム語の通訳が必要です" — họ thường giúp tìm cách.',
    },
    {
      question: 'Tôi sợ đi 精神科 vì sợ ảnh hưởng visa / công việc — đúng không?',
      answer:
        'Đa số trường hợp KHÔNG ảnh hưởng:\n\n• Đi khám tâm thần / dùng thuốc thông thường KHÔNG báo cho 入管 / công ty.\n• Hồ sơ y tế bảo mật theo 医師法 + 個人情報保護法.\n• 入管 chỉ check sức khỏe nghiêm túc nếu visa nguy hiểm tính mạng (vd lao phổi nặng) hoặc mức độ ảnh hưởng năng lực lao động — KHÔNG cho stress / lo âu / trầm cảm thường.\n• Công ty không có quyền hỏi chi tiết bệnh trừ khi nghỉ dài hạn (病気休暇).\n\nNGOẠI LỆ:\n• Một số visa đặc biệt (medical / 高度専門職) có yêu cầu khám sức khỏe — hỏi 入管 hoặc luật sư cụ thể.\n• 自立支援医療 (chương trình giảm phí điều trị tâm thần) cần đăng ký 市役所 — không công khai nhưng có ghi nhận hành chính.\n\n**Lo lắng về stigma > sức khỏe sẽ làm bệnh tệ hơn**. Đi khám = sức khỏe, không phải sĩ diện.',
    },
    {
      question: 'Tôi đang nghĩ đến tự tử — phải làm gì NGAY?',
      answer:
        '⚠️ **GỌI NGAY**, KHÔNG đợi:\n\n• **119** nếu đang trong nguy hiểm cấp tính (đã chuẩn bị / sắp hành động).\n• **いのちの電話: 0570-783-556** — 24/7, tiếng Nhật.\n• **よりそいホットライン: 0120-279-338** — ấn 2 cho ngoại ngữ.\n\nSau khi gọi:\n• KHÔNG ở một mình — tìm người bên cạnh (gia đình, bạn, hàng xóm, đồng nghiệp).\n• Bỏ vật dụng nguy hiểm khỏi tầm với (thuốc liều cao, dao, dây).\n• Đi 救急外来 bệnh viện gần nhất nếu có thể.\n\nNgày sau:\n• Đặt hẹn 精神科 ngay — giai đoạn này cần điều trị chuyên môn.\n• Báo người thân / bạn — có người theo dõi.\n• Kiên trì với điều trị — cảm giác sẽ giảm dần với thuốc + therapy.\n\n**Bạn không một mình.** Suy nghĩ tự tử là triệu chứng bệnh có thể điều trị, KHÔNG phải lựa chọn duy nhất.',
    },
    {
      question: 'Vợ/chồng tôi có dấu hiệu trầm cảm nhưng không chịu đi khám — phải làm sao?',
      answer:
        'Tình huống khó nhưng có cách:\n\n1. **Lắng nghe trước, không khuyên** — hỏi cảm xúc + cảm thông. KHÔNG nói "thôi vui lên" / "nhiều người khổ hơn".\n\n2. **Chia sẻ thông tin nhưng không ép**: "Mình thấy lo cho em, có muốn cùng đi 心療内科 thử 1 lần xem không?". Đi cùng giảm áp lực.\n\n3. **Tự bạn gọi hotline** trước để được tư vấn cách hỗ trợ — よりそいホットライン có dịch vụ này.\n\n4. **Liên hệ 精神保健福祉センター** ở 都道府県: cho phép gia đình tư vấn dù bệnh nhân chưa chịu đi.\n\n5. **Cảnh giác dấu hiệu nguy hiểm**: nói về tự tử / chết, cho đi đồ vật quý, viết "thư từ biệt", mất hứng thú đột ngột — gọi 119 hoặc hotline NGAY.\n\n6. **Chăm sóc bản thân**: chăm người trầm cảm rất kiệt sức. Đừng quên gọi hotline cho chính mình.',
    },
  ],
  counterPhrases: [
    {
      jp: '相談したいことがあります。',
      romaji: 'Soudan shitai koto ga arimasu.',
      vn: 'Tôi có việc muốn được tư vấn.',
      note: 'Câu mở đầu khi gọi hotline.',
    },
    {
      jp: 'ベトナム語の通訳が必要です。',
      romaji: 'Betonamu-go no tsuuyaku ga hitsuyou desu.',
      vn: 'Tôi cần thông dịch tiếng Việt.',
      note: 'Yêu cầu khi gọi hotline tiếng Nhật. よりそい có đa ngôn ngữ.',
    },
    {
      jp: '眠れません。',
      romaji: 'Nemuremasen.',
      vn: 'Tôi không ngủ được.',
      note: 'Triệu chứng phổ biến — báo bác sĩ.',
    },
    {
      jp: '不安です。',
      romaji: 'Fuan desu.',
      vn: 'Tôi lo âu.',
      note: 'Triệu chứng cơ bản.',
    },
    {
      jp: '心療内科を予約したいです。',
      romaji: 'Shinryou naika o yoyaku shitai desu.',
      vn: 'Tôi muốn đặt hẹn 心療内科.',
      note: 'Khi gọi điện đặt hẹn bệnh viện.',
    },
    {
      jp: '死にたい気持ちがあります。',
      romaji: 'Shinitai kimochi ga arimasu.',
      vn: 'Tôi có suy nghĩ muốn chết.',
      note: 'Câu KHÓ nói nhưng QUAN TRỌNG. Hotline + bác sĩ sẽ hỗ trợ ngay khi nghe câu này. KHÔNG bị phán xét.',
    },
    {
      jp: '助けが必要です。',
      romaji: 'Tasuke ga hitsuyou desu.',
      vn: 'Tôi cần giúp đỡ.',
      note: 'Câu cấp cứu chung. Gọi 119 hoặc hotline.',
    },
    {
      jp: '一人で行くのが不安です。',
      romaji: 'Hitori de iku no ga fuan desu.',
      vn: 'Tôi lo khi đi một mình.',
      note: 'Khi nhờ người thân / bạn đi cùng đến bệnh viện.',
    },
  ],
  officialLinks: [
    { label: '厚生労働省 — メンタルヘルス', url: 'https://www.mhlw.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Đánh giá mức độ — khẩn cấp hay không',
      description:
        '**Khẩn cấp (cần gọi NGAY)**:\n• Đang nghĩ đến / lên kế hoạch tự hại / tự tử.\n• Đã chuẩn bị phương tiện (thuốc, dây, etc.).\n• Đang trong cơn panic dữ dội không kiểm soát được.\n• Có ảo giác / hoang tưởng (nghe thấy giọng nói, tin có người theo dõi).\n• Bị bạo lực gia đình hoặc bị lạm dụng.\n\n→ Gọi **119** (cấp cứu), **いのちの電話 0570-783-556**, hoặc **よりそいホットライン 0120-279-338** ngay.\n\n**Không khẩn cấp (cần điều trị nhưng không gấp)**:\n• Stress / lo âu kéo dài >2 tuần.\n• Mất ngủ / khó tập trung.\n• Mất hứng thú nhưng vẫn làm việc / ăn được.\n• Cảm giác mệt mỏi / cô đơn nhưng kiểm soát được.\n\n→ Đặt hẹn 心療内科 trong 1–2 tuần + tự chăm sóc tại nhà.\n\n**Nhẹ (chăm sóc tại nhà)**:\n• Stress vài ngày sau sự kiện.\n• Ngủ đủ + ăn đủ + đi bộ 15 phút/ngày + giảm rượu/caffeine + nói chuyện với bạn bè.',
      documents: [],
      tip: 'Khi không chắc — gọi hotline. Họ giúp bạn đánh giá mức độ + chỉ bước tiếp.',
    },
    {
      step: 2,
      title: 'Hotline khẩn cấp — số quan trọng nhất',
      description:
        'Lưu vào contact điện thoại NGAY:\n\n**いのちの電話**: 0570-783-556\n• 24/7\n• Tiếng Nhật\n• Tư vấn về tự tử + stress\n\n**よりそいホットライン**: 0120-279-338\n• Đa ngôn ngữ (ấn 2 sau khi kết nối → chọn tiếng → có thể có tiếng Việt tùy ca)\n• Tư vấn rộng: tâm lý, DV, lao động, đời sống\n• Miễn phí cuộc gọi\n\n**119**: cấp cứu cho nguy hiểm tính mạng cấp tính.\n\n**110**: cảnh sát nếu liên quan tội phạm / bạo lực.\n\n**精神保健福祉センター 都道府県**: cấp 都道府県, có hotline + tư vấn ngày trong tuần. Search "Tên 都道府県 + 精神保健福祉センター".\n\n**保健所 市町村**: cấp 市町村, có hotline sức khỏe chung.\n\n**Khi gọi**:\n• Nói "もしもし、相談したいです" để bắt đầu.\n• Tiếng Nhật yếu → "ベトナム語の通訳が必要です".\n• Có thể nói càng nhiều / ít càng thoải mái — không bị ép.\n• Hotline KHÔNG báo công an / nhập viện trừ khi nguy hiểm cấp tính rõ ràng.',
      documents: [
        'Điện thoại + pin',
      ],
      tip: 'Gọi hotline KHÔNG có nghĩa "tôi đã rất tệ". Có thể gọi để nói chuyện vài phút khi chỉ stress nhẹ — không phải đợi đến khi khủng hoảng.',
    },
    {
      step: 3,
      title: 'Đặt hẹn 心療内科 hoặc 精神科',
      description:
        'Khi triệu chứng kéo dài + ảnh hưởng đời sống:\n\n1. **Tìm bệnh viện** trong khu:\n• Search Google "Tên 都道府県 + 心療内科" hoặc "+ 精神科".\n• Tìm bệnh viện có 多言語対応 (đa ngôn ngữ) hoặc thông dịch.\n• Đọc review.\n\n2. **Phân biệt**:\n• **心療内科**: chuyên về stress + body symptoms (đau đầu, đau dạ dày, mất ngủ do stress).\n• **精神科**: chuyên về tâm thần (depression, anxiety nặng, schizophrenia).\n• Lần đầu không chắc → đi 心療内科, họ sẽ giới thiệu 精神科 nếu cần.\n\n3. **Gọi đặt hẹn**:\n• "もしもし、初めてです。心療内科の予約をしたいです".\n• Đa số bệnh viện cần đặt 予約 trước (1–4 tuần chờ).\n• Khi đặt: nói triệu chứng chính + thời gian kéo dài.\n• Nếu cấp + lịch lâu: hỏi "キャンセル待ちはありますか?" (có danh sách chờ hủy hẹn không?).\n\n4. **Chuẩn bị trước buổi khám**:\n• Sổ ghi triệu chứng (ngày bắt đầu, mức độ, hoàn cảnh).\n• Danh sách thuốc đang dùng.\n• Lịch sử y tế (bệnh trước, dị ứng).\n• Câu hỏi muốn hỏi bác sĩ.',
      documents: [
        '保険証 / マイナンバーカード / 資格確認書',
        '在留カード',
        'Sổ ghi triệu chứng',
        'Danh sách thuốc',
      ],
      tip: 'Nếu lo về kỳ thị: chọn bệnh viện ở khu khác (không phải khu mình sống) để gặp người không quen. Hồ sơ y tế bảo mật.',
    },
    {
      step: 4,
      title: 'Buổi khám đầu — gặp bác sĩ',
      description:
        'Quy trình tại 心療内科 / 精神科:\n\n1. **受付**: như bệnh viện thường (xem guide clinic-hospital-visit-guide).\n\n2. **問診票**: form chi tiết hơn bệnh viện thường — hỏi về:\n• Triệu chứng cụ thể.\n• Thời gian bắt đầu.\n• Lịch sử y tế gia đình.\n• Hoàn cảnh đời sống (việc làm, gia đình, gần đây có sự kiện gì).\n• Có dùng rượu / thuốc lá / chất kích thích.\n• Có suy nghĩ tự hại.\n\n3. **Gặp bác sĩ** (15–60 phút lần đầu):\n• Bác sĩ đặt câu hỏi mở.\n• Trả lời thật — bác sĩ KHÔNG phán xét.\n• Nói triệu chứng cụ thể + ảnh hưởng đời sống.\n• Hỏi: "私の状態は何ですか?" (Tình trạng của tôi là gì?).\n• Hỏi: "治療の選択肢を教えてください" (Cho tôi biết các lựa chọn điều trị).\n\n4. **Kế hoạch điều trị**: thường có 3 yếu tố:\n• **Thuốc**: 抗うつ薬 / 抗不安薬 / 睡眠薬 — tùy bệnh.\n• **カウンセリング**: nói chuyện với 心理士 — không phải mọi bệnh viện có (có thể giới thiệu).\n• **生活習慣の改善**: ngủ đủ, đi bộ, ánh sáng mặt trời, giảm rượu.\n\n5. **Tái khám**: thường 2–4 tuần sau để theo dõi tác dụng thuốc.',
      documents: [
        'Tất cả từ Step 3',
      ],
      tip: 'Đa số bác sĩ KHÔNG biết tiếng Việt. Mang app dịch hoặc người thông dịch. Một số bệnh viện 多言語対応 có thông dịch — gọi hỏi trước.',
    },
    {
      step: 5,
      title: 'Điều trị + theo dõi dài hạn',
      description:
        'Bệnh tâm thần không chữa nhanh — cần kiên trì:\n\n1. **Thuốc**:\n• Đa số 抗うつ薬 cần 2–4 tuần để có tác dụng đầy đủ.\n• KHÔNG tự ngừng khi cảm thấy tốt — phải giảm dần dưới hướng dẫn bác sĩ.\n• Side effects ban đầu (buồn nôn, mệt) thường giảm sau 1–2 tuần.\n• Báo bác sĩ nếu side effects nặng / không chịu được.\n\n2. **カウンセリング** (nếu có):\n• 50 phút/buổi, 1 lần/tuần hoặc 2 tuần.\n• Không bảo hiểm thường — 5,000–15,000円/buổi.\n• Có hiệu quả mạnh khi kết hợp với thuốc.\n\n3. **自立支援医療** (chương trình giảm phí):\n• Cho điều trị tâm thần dài hạn.\n• Chỉ trả 10% thay vì 30%.\n• Đăng ký tại 市役所 — có giấy bác sĩ.\n• Có điều kiện thu nhập.\n\n4. **Theo dõi**:\n• Tái khám 2–4 tuần đầu, sau đó tháng/lần khi ổn định.\n• Sổ tâm trạng (mood diary) — ghi điểm hàng ngày từ 1–10.\n• Nhận biết triggers (cái gì làm mình tệ hơn).\n\n5. **Hỗ trợ tự thân**:\n• Đi bộ ngoài trời 15–30 phút/ngày.\n• Ngủ 7–8 tiếng — cùng giờ.\n• Ăn đủ chất.\n• Hạn chế rượu (làm depression tệ hơn).\n• Tham gia hoạt động cộng đồng (多文化共生, 国際交流).\n• Giữ kết nối gia đình ở VN — gọi đều.',
      documents: [
        'Đơn thuốc + お薬手帳',
        '自立支援医療 申請書 (nếu áp dụng)',
      ],
      tip: 'Tái phát phổ biến. Không phải thất bại — là phần của quá trình. Khi tái phát: liên hệ bác sĩ + tăng support, KHÔNG bỏ điều trị.',
    },
    {
      step: 6,
      title: 'Phòng ngừa + nguồn lực dài hạn',
      description:
        'Sau khi qua giai đoạn cấp tính:\n\n**Phòng ngừa tái phát**:\n• Tiếp tục thuốc theo chỉ định.\n• Nhận biết dấu hiệu sớm (mất ngủ, cô đơn, mất hứng thú) + can thiệp sớm.\n• Lifestyle ổn định.\n• Không cô lập — duy trì kết nối xã hội.\n\n**Xây support system**:\n• 1–2 người thân tin cậy biết tình trạng → có thể gọi khi khó khăn.\n• Nhóm cộng đồng người Việt ở khu — Facebook / LINE.\n• 多文化共生センター — tham gia event.\n• Online cộng đồng (cẩn thận chọn nhóm tích cực, không drama).\n\n**Học kỹ năng**:\n• Mindfulness / thiền — app Calm, Headspace (tiếng Anh) hoặc CD/Youtube tiếng Việt.\n• CBT (Cognitive Behavioral Therapy) self-help — sách tiếng Việt có sẵn.\n• Kỹ năng nói "không" / đặt giới hạn.\n• Quản lý thời gian.\n\n**Trường hợp khẩn cấp về sau**:\n• Số hotline lưu sẵn.\n• Kế hoạch hành động khi triệu chứng quay lại (gọi ai, đi đâu).\n• Người thân biết kế hoạch.\n\n**Khi về Việt Nam**:\n• Mang đầy đủ thuốc + đơn 1–2 tháng.\n• Lấy 診療情報提供書 (giấy tóm tắt điều trị) từ bác sĩ Nhật để bác sĩ VN tiếp tục.\n• Hệ thống tâm lý VN đang phát triển — search "tâm lý uy tín [tên thành phố]" để tìm bác sĩ tốt.',
      documents: [
        'Sổ tâm trạng',
        '診療情報提供書 (nếu chuyển bác sĩ)',
      ],
      tip: 'Sức khỏe tâm thần = đầu tư dài hạn. Ngày tốt sẽ vượt ngày xấu nếu duy trì điều trị + lifestyle. Bạn xứng đáng được giúp đỡ.',
    },
  ],
};

export default mentalHealthStressSupport;
