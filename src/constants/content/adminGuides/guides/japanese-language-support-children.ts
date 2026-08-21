import type { AdminGuide } from '../../../../types/content';

const japaneseLanguageSupportChildren: AdminGuide = {
  id: 'japanese-language-support-children',
  category: 'daily-law',
  lastVerified: '2026-08-21',
  priority: 'normal',
  title: 'Hỗ trợ tiếng Nhật cho con (日本語指導)',
  titleJp: '外国人の子どもへの日本語指導',
  icon: 'language-outline',
  color: '#16A085',
  description:
    'Trẻ em người nước ngoài học tại trường công Nhật có quyền nhận 日本語指導 (chương trình hỗ trợ tiếng Nhật). Hệ thống chính thức gồm: 取り出し授業 (rút ra khỏi lớp học riêng), 国際教室 (lớp quốc tế), 巡回指導 (giáo viên đi thăm). Ngoài trường còn có 日本語教室 (lớp cộng đồng) miễn phí / giá rẻ. Coverage cụ thể tùy 市町村 — không phải mọi trường đều có.',
  searchKeywords: [
    'tiếng Nhật cho con',
    'con không biết tiếng Nhật',
    'hỗ trợ học tiếng Nhật',
    'lớp tiếng Nhật cho trẻ',
    'dạy kèm tiếng Nhật',
    '日本語指導',
    '取り出し授業',
    '国際教室',
    '日本語教室',
    '多文化共生',
    'kokusai kyoushitsu',
    '巡回指導',
    'ボランティア',
    'JSL',
    'Japanese as Second Language',
  ],
  legalScope: {
    jurisdiction: 'mixed',
    jurisdictionNote:
      '文部科学省 (MEXT) có chính sách 日本語指導が必要な児童生徒 trên toàn quốc. Triển khai cụ thể (số giờ, hình thức, giáo viên) tùy 都道府県 + 市町村 + trường. Trẻ em là đối tượng được hỗ trợ — KHÔNG bắt buộc, nhưng được khuyến khích. Lớp ngoài trường (日本語教室 cộng đồng) do 国際交流協会 / NPO / 多文化共生センター vận hành — coverage rất khác nhau theo khu.',
    sourceVerifiedAt: '2026-08-21',
    nextReviewAt: '2027-02-01',
    riskLevel: 'low',
    whenToAskExpert: [
      'Con bị từ chối 日本語指導 vì trường không có chương trình — yêu cầu 教育委員会 (市役所) hỗ trợ tìm trường khác hoặc 巡回指導.',
      'Con đi học >1 năm vẫn không theo kịp bài — có thể cần 心理士 / 言語聴覚士 đánh giá.',
      'Con bị bắt nạt vì tiếng Nhật yếu — báo 担任 + 校長 + 教育委員会 ngay.',
    ],
  },
  quickAction: {
    deadline:
      'Trước khi con nhập học — hỏi trường có 日本語指導 không. Sau khi nhập học mà thấy con khó theo bài — yêu cầu hỗ trợ trong tháng đầu.',
    office:
      'Trường con đang học (qua 担任) → 教育委員会 ở 市役所 → ngoài giờ học: 多文化共生センター / 国際交流協会 / NPO địa phương / lớp 日本語教室 cộng đồng.',
    doNow: [
      'Hỏi 担任 (cô chủ nhiệm) trước: "日本語指導はありますか?" — qua 連絡帳 hoặc xin gặp.',
      'Nếu trường có: yêu cầu cho con tham gia. Thường có form đăng ký + đánh giá tiếng Nhật ban đầu.',
      'Nếu trường không có: yêu cầu 教育委員会 (市役所) tìm 巡回指導 (giáo viên đi thăm trường) hoặc chuyển sang trường có 国際教室.',
      'Tìm thêm hỗ trợ ngoài trường: search "Tên 市町村 + 日本語教室" — đa số 国際交流協会 có lớp miễn phí cho trẻ em.',
      'Hỏi cộng đồng người Việt khu mình về kinh nghiệm — Facebook nhóm + LINE group.',
    ],
    bring: [
      '連絡帳 (sổ liên lạc) để viết yêu cầu cho 担任',
      '在留カード của con + cha/mẹ',
      'Hồ sơ học tập cũ (nếu có) — giúp đánh giá trình độ',
      'Danh sách câu hỏi cụ thể',
    ],
    ifLate:
      'Đã đăng ký nhưng trường nói "không có giáo viên / không đủ học sinh để mở lớp" — yêu cầu 教育委員会 đề xuất giải pháp thay thế (vd 巡回指導, dạy kèm sau giờ, hoặc chuyển trường khác trong 学区 mở rộng). KHÔNG chấp nhận "không có hỗ trợ".',
    officialSourceLabels: ['文部科学省 (MEXT)'],
  },
  whoIsThisFor: [
    'Cha mẹ có con vừa sang Nhật, chưa nói được tiếng Nhật.',
    'Cha mẹ có con sinh ở Nhật nhưng tiếng Nhật yếu hơn bạn cùng lớp.',
    'Cha mẹ có con học >6 tháng nhưng vẫn khó theo bài.',
    'Gia đình mong con giữ tiếng Việt + thêm tiếng Nhật — cân bằng song ngữ.',
  ],
  whenToDo: [
    'Trước khi con nhập học mới: hỏi trường có 日本語指導 không.',
    'Tháng đầu sau nhập học: theo dõi xem con có theo bài không.',
    'Khi điểm 国語 (tiếng Nhật) hoặc các môn khác giảm bất thường: tìm hỗ trợ.',
    'Khi con bắt đầu từ chối đi học: có thể là dấu hiệu khó khăn ngôn ngữ + xã hội.',
    'Khi cô chủ nhiệm đề xuất 日本語指導: nhận lời ngay, không từ chối vì sĩ diện.',
  ],
  whereToDo: [
    '**Trong giờ học**: 取り出し授業 (rút ra học riêng 1–2 tiết/tuần), 国際教室 (lớp quốc tế trong trường, một số khu có), 巡回指導 (giáo viên đi thăm trường nhỏ).',
    '**Sau giờ học (trong trường)**: 放課後支援 (hỗ trợ sau giờ), CLB ngôn ngữ.',
    '**Ngoài trường**: 日本語教室 do 国際交流協会 / NPO / 多文化共生センター tổ chức. Thường thứ 7 / Chủ nhật. Miễn phí hoặc 100–500円/buổi.',
    '**Online**: Tài liệu MEXT 「かすたねっと」 (kasuta-net) miễn phí, có hướng dẫn đa ngôn ngữ.',
    '**Cộng đồng người Việt**: nhóm phụ huynh trên LINE / Facebook chia sẻ tài liệu + dạy kèm.',
  ],
  estimatedTime:
    'Học từ 0 đến giao tiếp cơ bản: thường 6–12 tháng học chính + 日本語指導. Đến mức đọc viết tốt: 2–3 năm. Tùy tuổi (trẻ nhỏ học nhanh hơn) + môi trường + động lực.',
  fees: [
    '日本語指導 trong trường công: MIỄN PHÍ.',
    '日本語教室 cộng đồng (国際交流協会, NPO): thường miễn phí hoặc 100–500円/buổi tượng trưng.',
    '塾 / dạy kèm tư nhân: từ vài nghìn đến vài chục nghìn yên/tháng tùy mức.',
    'Tài liệu MEXT miễn phí — tải online tại 「かすたねっと」.',
    'Sách + workbook bổ sung: 1,000–3,000円/quyển ở Kinokuniya / Maruzen / nhà sách thông thường.',
  ],
  documentsChecklist: [
    { label: '連絡帳', required: true, note: 'Để viết yêu cầu chính thức cho 担任.' },
    { label: '在留カード của con + cha/mẹ', required: false, note: 'Một số 日本語教室 cộng đồng yêu cầu.' },
    { label: 'Hồ sơ học tập cũ', required: false, note: 'Giúp đánh giá trình độ trước khi vào lớp.' },
    { label: 'Tài liệu trường đang dùng', required: false, note: 'Sách giáo khoa hiện tại — giúp người dạy bám sát chương trình.' },
  ],
  commonMistakes: [
    'Không hỏi trường về 日本語指導 → trường không tự đề xuất. Phụ huynh phải chủ động.',
    'Đợi con "tự thích nghi" 6 tháng → mất thời gian quan trọng đầu, càng để lâu càng khó bắt kịp.',
    'Tin "trẻ con học nhanh, không cần hỗ trợ" — đúng phần nào, nhưng có hỗ trợ đúng cách giúp con bắt kịp + tự tin hơn.',
    'Bỏ qua tiếng Việt trong gia đình để con tập trung tiếng Nhật → mất lợi thế song ngữ + ảnh hưởng quan hệ gia đình.',
    'Không đi 日本語教室 cộng đồng vì xa nhà / bận → bỏ lỡ nguồn hỗ trợ free.',
    'Trả tiền 塾 đắt mà không kết hợp với 日本語指導 trường → tốn tiền không cần thiết.',
    'Không cho con tham gia hoạt động trường (CLB, 給食 cùng bạn) → cô lập, học chậm hơn.',
  ],
  faq: [
    {
      question: 'Trường con tôi nói "không có 日本語指導" — phải làm gì?',
      answer:
        'Yêu cầu 教育委員会 (市役所) tìm giải pháp:\n\n1. 巡回指導 — giáo viên 日本語 chuyên môn đến thăm trường con 1–2 buổi/tuần.\n2. Chuyển sang trường khác trong 学区 mở rộng có 国際教室.\n3. Hỗ trợ tài liệu + ボランティア dạy kèm.\n\nNếu 教育委員会 cũng từ chối → liên hệ 多文化共生センター hoặc luật sư về quyền giáo dục. Tìm 日本語教室 cộng đồng song song.',
    },
    {
      question: 'Con tôi sinh ở Nhật nhưng vào 小学校 vẫn yếu tiếng Nhật — có được hỗ trợ không?',
      answer:
        'Có. Trẻ "sinh ở Nhật" không tự động giỏi tiếng Nhật nếu nhà chỉ nói tiếng Việt. Đây là gọi "JSL" (Japanese as Second Language). MEXT công nhận đối tượng này. Yêu cầu 担任 cho đánh giá ngôn ngữ ban đầu — nếu yếu, có thể vào 日本語指導.',
    },
    {
      question: 'Tôi muốn con vẫn giỏi tiếng Việt — làm sao cân bằng?',
      answer:
        'Nguyên tắc cơ bản:\n\n• Ở nhà nói tiếng Việt — đừng đổi sang tiếng Nhật vì sợ con không bắt kịp ở trường.\n• Đọc sách tiếng Việt trước khi ngủ.\n• Tham gia lớp tiếng Việt cộng đồng cuối tuần (nếu khu có Đại sứ quán / hội đoàn tổ chức).\n• Cho con về VN nghỉ hè / Tết.\n• Trẻ em có khả năng song ngữ vô cùng — KHÔNG hy sinh tiếng Việt.',
    },
    {
      question: 'Có app / tài liệu miễn phí nào cho con học tiếng Nhật không?',
      answer:
        'Có:\n\n• **「かすたねっと」 (kasuta-net)** — MEXT trang chính thức, có tài liệu cho 日本語指導 đa ngôn ngữ (gồm tiếng Việt).\n• **NHK World Easy Japanese** — tin tức tiếng Nhật chậm, có phiên âm.\n• **Erin\'s Challenge!** — JET Programme, video học tiếng Nhật cho thiếu niên.\n• **Tadoku** — sách tiếng Nhật dễ đọc miễn phí online.\n• **Duolingo / LingoDeer** — app, free + paid.\n\nKết hợp với 日本語指導 trường + nói tiếng Nhật trong môi trường hằng ngày là tốt nhất.',
    },
    {
      question: 'Con tôi không muốn đi học vì không hiểu bài — phải làm gì?',
      answer:
        'Ưu tiên:\n\n1. **Nói chuyện với con** — nghe trước khi giải quyết. Có thể không chỉ vì tiếng Nhật mà còn bắt nạt / lo lắng xã hội.\n2. **Liên hệ 担任** qua 連絡帳 hoặc xin gặp — báo tình hình.\n3. **Yêu cầu 日本語指導** mạnh hơn / nhiều giờ hơn.\n4. **Nếu có bắt nạt** — báo 担任 + 校長 + 教育委員会. KHÔNG để leo thang.\n5. **Tâm lý**: nhiều 市町村 có dịch vụ tư vấn miễn phí cho trẻ em — hỏi 教育委員会.\n6. **Nhóm phụ huynh người Việt** — chia sẻ kinh nghiệm.',
    },
  ],
  counterPhrases: [
    {
      jp: '日本語指導はありますか。',
      romaji: 'Nihongo shidou wa arimasu ka.',
      vn: 'Có hỗ trợ tiếng Nhật cho con không?',
      note: 'Câu cơ bản hỏi 担任 hoặc 教育委員会.',
    },
    {
      jp: '取り出し授業をお願いしたいです。',
      romaji: 'Toridashi jugyou o onegai shitai desu.',
      vn: 'Tôi muốn xin lớp riêng cho con.',
      note: '取り出し授業 = giờ tiếng Nhật riêng, ngoài lớp chính.',
    },
    {
      jp: '子どもが授業についていけません。',
      romaji: 'Kodomo ga jugyou ni tsuite ikemasen.',
      vn: 'Con tôi không theo kịp bài.',
      note: 'Báo trực tiếp với 担任 khi thấy con khó khăn.',
    },
    {
      jp: '巡回指導を頼めますか。',
      romaji: 'Junkai shidou o tanomemasu ka.',
      vn: 'Có thể xin giáo viên đi thăm không?',
      note: '巡回指導 = giáo viên đến trường nhỏ không có 国際教室.',
    },
    {
      jp: '日本語教室を紹介してください。',
      romaji: 'Nihongo kyoushitsu o shoukai shite kudasai.',
      vn: 'Xin giới thiệu lớp tiếng Nhật cho tôi.',
      note: 'Hỏi 多文化共生センター hoặc 国際交流協会.',
    },
    {
      jp: 'ベトナム語の支援はありますか。',
      romaji: 'Betonamu-go no shien wa arimasu ka.',
      vn: 'Có hỗ trợ tiếng Việt không?',
      note: 'Một số khu có ボランティア tiếng Việt — hỏi thử.',
    },
    {
      jp: '子どもが学校に行きたがりません。',
      romaji: 'Kodomo ga gakkou ni ikitagarimasen.',
      vn: 'Con tôi không muốn đi học.',
      note: 'Tín hiệu cần báo gấp với 担任 + 教育委員会.',
    },
  ],
  officialLinks: [
    { label: '文部科学省 (MEXT)', url: 'https://www.mext.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Đánh giá tình hình con — có cần hỗ trợ không?',
      description:
        'Trước khi tiếp cận trường, đánh giá trong nhà:\n\n• Con hiểu bao nhiêu % bài giảng?\n• Có đọc được hiragana / katakana / kanji cơ bản?\n• Có bạn nói chuyện trong giờ ra chơi không?\n• Có tự tin lên bảng / phát biểu không?\n• Điểm số đang giảm hay ổn định?\n• Có dấu hiệu căng thẳng / từ chối đi học?\n\nNếu có ≥ 2 dấu hiệu khó khăn → cần hỗ trợ. Đừng đợi con "tự thích nghi" quá 3 tháng.',
      documents: [],
      tip: 'Nói chuyện với con bằng tiếng Việt thoải mái — con dễ chia sẻ. Tránh hỏi "có hiểu không" vì con thường nói "có" để khỏi làm phiền cha mẹ.',
    },
    {
      step: 2,
      title: 'Liên hệ trường — qua 担任 trước',
      description:
        'Cách tiếp cận lịch sự + chính thức:\n\n1. Viết trong 連絡帳: "息子/娘は授業についていくのが難しいようです. 日本語指導があれば、参加させていただきたいです. 一度お話しできますでしょうか." (Con tôi có vẻ khó theo bài. Nếu có 日本語指導, tôi muốn cho cháu tham gia. Có thể nói chuyện được không?)\n\n2. 担任 sẽ trả lời trong 連絡帳 hoặc gọi điện. Đặt lịch họp 30 phút.\n\n3. Tại buổi họp:\n• Mô tả khó khăn cụ thể của con.\n• Hỏi: "Trường có 取り出し授業 / 国際教室 / 巡回指導 không?".\n• Hỏi: "Có form đăng ký không?".\n• Hỏi: "Đánh giá tiếng Nhật ban đầu thế nào?".\n• Note thông tin được cung cấp.',
      documents: [
        '連絡帳',
        'Note danh sách câu hỏi',
      ],
      tip: 'Mang theo người Nhật biết tiếng Việt nếu có (đồng nghiệp / bạn / hàng xóm) — giúp giao tiếp tốt hơn lần đầu. Hoặc dùng app dịch.',
    },
    {
      step: 3,
      title: 'Nếu trường không có hỗ trợ — leo lên 教育委員会',
      description:
        'Khi 担任 nói "không có chương trình" hoặc trường nhỏ không đủ giáo viên:\n\n1. Đến 市役所 → phòng 教育委員会 / 学事課.\n2. Nói: "息子/娘の学校に日本語指導がないので、相談したいです" (Trường con tôi không có 日本語指導, tôi muốn được tư vấn).\n3. Hỏi 4 lựa chọn:\n• 巡回指導 (giáo viên 日本語 chuyên môn đi thăm trường)\n• Chuyển trường trong 学区 mở rộng\n• Lớp tiếng Nhật ngoài giờ trong khuôn khổ trường (放課後支援)\n• Voucher 塾 / dạy kèm — một số 市 có\n\n4. Lưu phản hồi bằng văn bản nếu có thể (cho lần leo cấp tiếp theo).\n\n5. Nếu 教育委員会 cũng từ chối → liên hệ 多文化共生センター hoặc 都道府県 教育委員会 cấp cao hơn.',
      documents: [
        '在留カード',
        '住民票',
        'Note phản hồi từ trường',
      ],
      tip: 'Nhiều khu có nhân viên 多言語 (đa ngôn ngữ) — hỏi trước khi đến. Tokyo / Aichi / Kanagawa có hỗ trợ tiếng Việt ở 1 số 市.',
    },
    {
      step: 4,
      title: 'Tìm hỗ trợ ngoài trường — 日本語教室 cộng đồng',
      description:
        'Song song với hỗ trợ trường, tìm thêm:\n\n1. **国際交流協会** của 都道府県 — search "Tên 都道府県 + 国際交流協会". Đa số có lớp 日本語教室 cuối tuần miễn phí / giá rẻ cho trẻ em.\n\n2. **多文化共生センター** ở 1 số 市 — gọi điện hỏi lịch lớp + đăng ký.\n\n3. **NPO địa phương** — tìm trên Google "Tên 市町村 + 子ども + 日本語教室". Một số NPO chuyên hỗ trợ trẻ em nước ngoài.\n\n4. **Đại sứ quán / lãnh sự quán Việt Nam** — đôi khi tổ chức lớp tiếng Việt + tư vấn cho gia đình.\n\n5. **Cộng đồng người Việt** — Facebook nhóm "Người Việt ở Aichi", "Người Việt ở Tokyo" v.v. — hỏi cha mẹ đi trước.\n\n6. **Sách + tài liệu**: tải miễn phí từ 「かすたねっと」 (MEXT).',
      documents: [
        'Tên + địa chỉ + số điện thoại các lớp / tổ chức',
      ],
      tip: 'Lớp cộng đồng thường có ボランティア (tình nguyện viên) là người Nhật nghỉ hưu / sinh viên — họ tận tình + miễn phí. Đừng ngại hỏi.',
    },
    {
      step: 5,
      title: 'Theo dõi tiến độ + hỗ trợ ở nhà',
      description:
        'Học tiếng Nhật cần thời gian — 6–12 tháng để giao tiếp cơ bản, 2–3 năm để đọc viết tốt. Theo dõi:\n\n1. **連絡帳** từ 日本語指導 giáo viên — đọc tuần 1 lần.\n2. **Đánh giá định kỳ**: hỏi giáo viên "進歩はどうですか?" mỗi 3 tháng.\n3. **Test thực tế tại nhà**: cho con đọc menu nhà hàng, biển hiệu, ghi chép — xem có nhanh hơn không.\n\n**Hỗ trợ tại nhà**:\n\n• **Đọc to**: cho con đọc sách giáo khoa 国語 hằng ngày 15 phút.\n• **Phim Nhật phụ đề Nhật**: NHK Easy Japanese, anime cho trẻ em.\n• **Bạn người Nhật**: khuyến khích chơi với bạn cùng lớp ngoài giờ.\n• **GIỮ tiếng Việt**: nói tiếng Việt ở nhà — KHÔNG đổi sang tiếng Nhật. Song ngữ là lợi thế.',
      documents: [],
      tip: 'Phụ huynh KHÔNG cần biết tiếng Nhật giỏi để hỗ trợ con. Quan trọng là tạo môi trường + động viên + giữ kết nối với trường.',
    },
  ],
};

export default japaneseLanguageSupportChildren;
