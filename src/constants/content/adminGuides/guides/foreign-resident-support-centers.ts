import type { AdminGuide } from '../../../../types/content';

const foreignResidentSupportCenters: AdminGuide = {
  id: 'foreign-resident-support-centers',
  category: 'daily-law',
  lastVerified: '2026-05-09',
  priority: 'normal',
  title: 'Trung tâm hỗ trợ người nước ngoài (多文化共生)',
  titleJp: '外国人住民支援センター — 多文化共生',
  icon: 'people-outline',
  color: '#8E44AD',
  description:
    'Nhật Bản có hệ thống hỗ trợ người nước ngoài qua nhiều kênh: 多文化共生センター (Multicultural Center) ở 都道府県/市町村, 国際交流協会 (International Exchange Association), FRESC (Foreign Residents Support Center) thuộc 出入国在留管理庁, hotline đa ngôn ngữ. Phần lớn dịch vụ MIỄN PHÍ. Coverage cụ thể tùy khu — KHÔNG phải khu nào cũng có hỗ trợ tiếng Việt. Search trên Google: "Tên 都道府県 / 市町村 + 多文化共生" để tìm gần nhất.',
  searchKeywords: [
    'trung tâm hỗ trợ',
    'tư vấn miễn phí',
    'người nước ngoài',
    'đa văn hóa',
    'hotline tiếng Việt',
    'tư vấn tiếng Việt',
    'lớp tiếng Nhật miễn phí',
    'hỗ trợ pháp lý',
    'FRESC',
    '多文化共生',
    '国際交流協会',
    '外国人相談',
    'foreign resident support',
    'multicultural center',
    '通訳',
    'tư vấn lao động',
    'tư vấn visa',
    'tư vấn nhà ở',
  ],
  legalScope: {
    jurisdiction: 'mixed',
    jurisdictionNote:
      'FRESC (Foreign Residents Support Center) thuộc 出入国在留管理庁 — cấp quốc gia, có nhiều ngôn ngữ. 多文化共生センター + 国際交流協会 do từng 都道府県 / 市町村 vận hành — coverage + ngôn ngữ + giờ làm việc rất khác nhau theo khu. Một số NPO + tổ chức tôn giáo cũng có hỗ trợ — không thuộc chính phủ. Đa số dịch vụ MIỄN PHÍ — nhưng nội dung tư vấn cụ thể (luật sư / bác sĩ / kế toán) có thể tính phí riêng.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'low',
    whenToAskExpert: [
      'Vấn đề pháp lý phức tạp (lao động / hôn nhân / di trú) — trung tâm hỗ trợ thường giới thiệu luật sư + 法テラス, không tự tư vấn pháp lý.',
      'Bị bạo lực gia đình (DV) — có hotline + nơi tạm lánh chuyên biệt, ưu tiên gọi 110 + 多文化共生センター.',
      'Trẻ em bị bắt nạt / không hòa nhập trường — kết hợp 多文化共生 + 教育委員会 + tâm lý chuyên môn.',
    ],
  },
  quickAction: {
    deadline:
      'Tùy việc. Khẩn cấp (DV, bị scam, không có chỗ ở): gọi ngay. Tư vấn thường: theo giờ làm việc của trung tâm — thường thứ 2–6 + một số trung tâm có thứ 7.',
    office:
      '4 nguồn chính:\n1. **FRESC** (cấp quốc gia, 出入国在留管理庁) — đa ngôn ngữ + chuyên về visa + lao động.\n2. **多文化共生センター** của 都道府県 / 市町村 — coverage địa phương.\n3. **国際交流協会** — văn hóa + lớp tiếng Nhật + tư vấn cơ bản.\n4. **NPO + tổ chức tôn giáo** — bổ sung, không chính thức.',
    doNow: [
      'Search Google: "Tên 都道府県 + 多文化共生" hoặc "Tên 市町村 + 国際交流協会" → tìm trung tâm gần nhất.',
      'Xem trang chính thức: ngôn ngữ hỗ trợ (có tiếng Việt không?), giờ làm việc, hotline, địa chỉ, dịch vụ cụ thể.',
      'Gọi điện trước khi đến — đặt hẹn nếu cần thông dịch tiếng Việt.',
      'Nếu có vấn đề khẩn cấp + trung tâm địa phương đóng cửa: gọi FRESC (đa ngôn ngữ, có giờ rộng hơn).',
      'Lưu thông tin vào điện thoại — biết đến đâu khi cần khẩn cấp.',
    ],
    bring: [
      '在留カード + hộ chiếu',
      'Giấy tờ liên quan vấn đề (hợp đồng nhà / lao động / hóa đơn lạ / thư yêu cầu)',
      'Ghi chú câu hỏi cụ thể',
      'App dịch nếu nơi không có thông dịch',
    ],
    ifLate:
      'Trung tâm địa phương đóng cửa / không có hỗ trợ tiếng Việt: thử FRESC (đa ngôn ngữ, hotline rộng) hoặc 国民生活センター 188 (consumer issues, có hỗ trợ đa ngôn ngữ ở 1 số khu).',
    officialSourceLabels: ['FRESC (出入国在留管理庁)'],
  },
  whoIsThisFor: [
    'Người Việt sống ở Nhật cần tư vấn miễn phí về visa / lao động / nhà ở / giáo dục / y tế / hôn nhân / pháp lý.',
    'Người mới sang Nhật chưa biết hệ thống hỗ trợ.',
    'Người đang trong tình huống khó (DV, scam, mất việc, không có chỗ ở).',
    'Cha mẹ có con đi học cần hỗ trợ giao tiếp với trường.',
    'Người muốn học tiếng Nhật miễn phí / giá rẻ — 国際交流協会 thường có lớp.',
  ],
  whenToDo: [
    'Khi gặp vấn đề + không biết hỏi ai.',
    'Khi muốn học tiếng Nhật / kết bạn cộng đồng — đăng ký lớp / sự kiện.',
    'Khi cần thông dịch để đi 市役所 / bệnh viện / 入管 — một số trung tâm cử thông dịch viên.',
    'Khi chuyển đến 市 mới — xem có cần đăng ký với 多文化共生センター không.',
    'Trước khi gặp vấn đề — đọc trước để biết nguồn hỗ trợ khi cần.',
  ],
  whereToDo: [
    '**FRESC** (Tokyo, có hotline đa ngôn ngữ): chuyên visa + lao động + đời sống cơ bản.',
    '**多文化共生センター** (Multicultural Center) ở 都道府県 / 市区町村 — search Google "Tên + 多文化共生".',
    '**国際交流協会** (International Exchange Association) — search "Tên 都道府県 + 国際交流協会".',
    '**NPO** chuyên hỗ trợ người Việt: tìm qua Facebook nhóm "Người Việt ở [tên 都道府県]".',
    'KHÔNG nhầm với "中国人会" / "韓国人会" — riêng biệt, mỗi cộng đồng có tổ chức.',
  ],
  estimatedTime:
    'Gọi điện hỏi: 5–15 phút. Đến tư vấn trực tiếp: 30 phút – 1 giờ. Lớp tiếng Nhật: 1.5–2 giờ/buổi, 1–2 lần/tuần. Sự kiện văn hóa: tùy.',
  fees: [
    'Tư vấn cơ bản tại 多文化共生センター / 国際交流協会 / FRESC: thường MIỄN PHÍ.',
    'Lớp tiếng Nhật cộng đồng: miễn phí hoặc 100–500円/buổi (tượng trưng).',
    'Thông dịch viên đi cùng (vd đi 市役所 / bệnh viện): tùy trung tâm + tùy 市. Một số miễn phí, một số tính ~1,000–3,000円/lần.',
    'Tư vấn chuyên môn (luật sư / bác sĩ / kế toán) qua giới thiệu: phí riêng theo người được giới thiệu.',
    'Sự kiện văn hóa: thường miễn phí hoặc phí tượng trưng.',
  ],
  documentsChecklist: [
    { label: '在留カード', required: true, note: 'Để xác minh tư cách cư trú.' },
    { label: 'Hộ chiếu', required: false, note: 'Một số dịch vụ yêu cầu.' },
    { label: 'Giấy tờ liên quan vấn đề', required: false, note: 'Vd hợp đồng lao động, thư từ 市役所, hóa đơn lạ — mang theo để tư vấn cụ thể.' },
    { label: 'Ghi chú câu hỏi', required: false, note: 'Tư vấn miễn phí thường có giới hạn thời gian — chuẩn bị câu hỏi trước.' },
    { label: 'Smartphone với app dịch', required: false, note: 'Phòng khi nơi không có thông dịch tiếng Việt.' },
  ],
  commonMistakes: [
    'Không biết về hệ thống → tự xoay sở + Google không chính xác.',
    'Tin "miễn phí = không chất lượng" → sai. Nhiều tư vấn viên có chuyên môn cao + tâm huyết.',
    'Đến trung tâm mà không gọi trước → có thể bị đóng cửa / không có người tiếng Việt / phải đợi lâu.',
    'Không mang giấy tờ liên quan → tư vấn chỉ chung chung, không cụ thể.',
    'Nhầm 多文化共生 với 入管 → 入管 không tư vấn miễn phí lẫn không chuyên về đời sống.',
    'Bỏ qua hotline đa ngôn ngữ vì sợ tốn phí → đa số là số 0570 (tính phí cuộc gọi thường) nhưng tư vấn miễn phí.',
    'Cô lập + không tham gia cộng đồng → bỏ lỡ sự kiện kết nối + thông tin cập nhật.',
  ],
  faq: [
    {
      question: 'Tôi sống ở Aichi (Nagoya) — có 多文化共生 tiếng Việt không?',
      answer:
        'Aichi có cộng đồng người Việt lớn — nhiều khả năng có hỗ trợ tiếng Việt. Search Google "愛知県 多文化共生" + "名古屋市 国際交流" để tìm:\n\n• 愛知県国際交流協会 (Aichi Prefectural International Exchange Association — AIA)\n• 名古屋国際センター (Nagoya International Center — NIC) — thường có sự kiện + hotline đa ngôn ngữ.\n• 多文化共生 ở các 市 nhỏ hơn (Toyota, Kasugai, etc.).\n\nGọi trước hỏi "ベトナム語の通訳はありますか?". Một số trung tâm chỉ có vào ngày cụ thể trong tuần.',
    },
    {
      question: 'FRESC khác 多文化共生センター thế nào?',
      answer:
        '**FRESC** (Foreign Residents Support Center):\n• Cấp quốc gia, thuộc 出入国在留管理庁.\n• Tập trung Tokyo (Yotsuya). Có chi nhánh ở một số 都道府県 lớn.\n• Chuyên: visa + lao động + nhà ở + đời sống cơ bản.\n• Có hotline đa ngôn ngữ — đa số tiếng Việt.\n• Phù hợp khi cần tư vấn liên quan đến visa.\n\n**多文化共生センター**:\n• Cấp địa phương (都道府県 / 市町村).\n• Đa dạng dịch vụ tùy địa phương.\n• Tập trung văn hóa + lớp tiếng Nhật + tư vấn cơ bản.\n• Coverage tiếng Việt tùy khu.\n• Phù hợp cho vấn đề đời sống địa phương cụ thể.\n\nKhông xung đột — có thể dùng cả 2 cho việc khác nhau.',
    },
    {
      question: 'Tôi không biết tiếng Nhật, tiếng Việt cũng không có ở khu — phải làm sao?',
      answer:
        'Có cách:\n\n1. **Hotline FRESC** — đa ngôn ngữ (gồm tiếng Việt). Gọi từ bất kỳ đâu ở Nhật.\n2. **Yotsuy (Tokyo)** — FRESC trụ sở chính có thông dịch viên tiếng Việt full-time.\n3. **App dịch + đi đến trung tâm** — nhân viên Nhật nhiều khi vẫn giúp được dù không tiếng Việt.\n4. **Cộng đồng người Việt** — Facebook nhóm địa phương, hỏi ai đó tiếng Nhật giỏi đi cùng.\n5. **Đại sứ quán Việt Nam** (Tokyo / Osaka / Fukuoka) — hỗ trợ công dân, có nhân viên tiếng Việt.\n6. **Hotline 国民生活センター 188** — consumer issues, có thông dịch ở 1 số khu.',
    },
    {
      question: 'Trung tâm hỗ trợ tư vấn pháp lý không?',
      answer:
        'Đa số 多文化共生センター + FRESC tư vấn **cơ bản** về luật / visa / lao động — KHÔNG đại diện pháp lý cho bạn tại tòa.\n\nĐể có luật sư:\n\n• **法テラス** (Japan Legal Support Center): tư vấn 30 phút miễn phí cho thu nhập đủ điều kiện. Có thông dịch.\n• **弁護士会 都道府県** : tư vấn lần đầu rẻ + giới thiệu luật sư.\n• **当番弁護士** (luật sư trực): cho tình huống bị bắt — gọi qua 弁護士会.\n• **NPO chuyên về di trú / lao động**: vd RHQ, Solidarity Network with Migrants — chuyên môn cao.\n\n多文化共生センター thường giới thiệu bạn đến đúng nguồn dựa trên vấn đề cụ thể.',
    },
    {
      question: 'Tôi muốn học tiếng Nhật miễn phí — có lớp không?',
      answer:
        'Có. Đa số 国際交流協会 + 多文化共生センター + NPO có lớp 日本語教室:\n\n• Miễn phí hoặc 100–500円/buổi tượng trưng.\n• Thường thứ 7 / Chủ nhật / buổi tối — phù hợp người đi làm.\n• Trình độ từ N5 đến N2 — có lớp riêng cho người mới.\n• Có lớp riêng cho phụ nữ + cho trẻ em.\n• Giáo viên là ボランティア (tình nguyện viên người Nhật) — tận tình.\n\nSearch Google "Tên 市町村 + 日本語教室" hoặc gọi 多文化共生センター hỏi.\n\nLưu ý: lớp này khác với 塾 (private tutor có phí) hoặc 日本語学校 (trường ngôn ngữ chính thức cho du học sinh).',
    },
  ],
  counterPhrases: [
    {
      jp: '相談したいことがあります。',
      romaji: 'Soudan shitai koto ga arimasu.',
      vn: 'Tôi có việc muốn được tư vấn.',
      note: 'Câu mở đầu khi gọi điện hoặc đến quầy.',
    },
    {
      jp: 'ベトナム語の通訳はありますか。',
      romaji: 'Betonamu-go no tsuuyaku wa arimasu ka.',
      vn: 'Có thông dịch tiếng Việt không?',
      note: 'Câu quan trọng — gọi trước khi đến để xác nhận.',
    },
    {
      jp: '無料で相談できますか。',
      romaji: 'Muryou de soudan dekimasu ka.',
      vn: 'Có thể tư vấn miễn phí không?',
      note: 'Xác nhận trước khi nhận tư vấn — tránh bất ngờ phí.',
    },
    {
      jp: '日本語教室を紹介してください。',
      romaji: 'Nihongo kyoushitsu o shoukai shite kudasai.',
      vn: 'Xin giới thiệu lớp tiếng Nhật cho tôi.',
      note: 'Yêu cầu tại 多文化共生センター hoặc 国際交流協会.',
    },
    {
      jp: '弁護士を紹介してください。',
      romaji: 'Bengoshi o shoukai shite kudasai.',
      vn: 'Xin giới thiệu luật sư cho tôi.',
      note: 'Trung tâm thường giới thiệu 法テラス hoặc 弁護士会 phù hợp.',
    },
    {
      jp: '通訳に来てもらえますか。',
      romaji: 'Tsuuyaku ni kite moraemasu ka.',
      vn: 'Có thể cử thông dịch đi cùng tôi không?',
      note: 'Hỏi cho lần đi 市役所 / bệnh viện / 入管 nếu cần. Tùy trung tâm.',
    },
    {
      jp: 'いつ開いていますか。',
      romaji: 'Itsu aite imasu ka.',
      vn: 'Khi nào trung tâm mở cửa?',
      note: 'Hỏi giờ làm việc + ngày có người tiếng Việt.',
    },
    {
      jp: '緊急のときはどこに連絡すればいいですか。',
      romaji: 'Kinkyuu no toki wa doko ni renraku sureba ii desu ka.',
      vn: 'Khi khẩn cấp thì tôi nên liên hệ ở đâu?',
      note: 'Hỏi để có số hotline khẩn cấp ngoài giờ làm việc.',
    },
  ],
  officialLinks: [
    { label: 'FRESC (出入国在留管理庁)', url: 'https://www.moj.go.jp/isa/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Tìm trung tâm gần nhất',
      description:
        '4 nguồn chính:\n\n1. **FRESC** (cấp quốc gia, đa ngôn ngữ): trang chính thức 出入国在留管理庁 → tìm "FRESC" hoặc "外国人総合相談支援センター". Có hotline + chi nhánh.\n\n2. **多文化共生センター** ở 都道府県 / 市区町村:\n• Search Google "Tên 都道府県 + 多文化共生" hoặc "Tên 市 + 国際交流".\n• Vào trang chính thức xem: ngôn ngữ, giờ, dịch vụ.\n\n3. **国際交流協会**: chuyên văn hóa + ngôn ngữ. Search "Tên 都道府県 + 国際交流協会" hoặc "Tên 市 + International Center".\n\n4. **NPO + tổ chức tôn giáo** chuyên hỗ trợ người Việt: tìm qua Facebook nhóm địa phương "Người Việt ở [Tên 都道府県]".\n\n**Khu nhiều người Việt** (Aichi, Kanagawa, Saitama, Osaka, Tokyo, Hyogo, Fukuoka): coverage tiếng Việt tốt hơn.\n\n**Khu ít người Việt**: phải dựa vào FRESC hotline hoặc app dịch + tiếng Nhật cơ bản.',
      documents: [],
      tip: 'Lưu vào contact / bookmark: FRESC hotline + 1–2 trung tâm địa phương + Đại sứ quán + 法テラス + 国民生活センター 188. Gói 5 nguồn này phủ ~95% nhu cầu thường gặp.',
    },
    {
      step: 2,
      title: 'Gọi điện trước khi đến',
      description:
        'KHÔNG nên đến mà không gọi:\n\n1. **Gọi hotline / số chính**: hỏi 4 việc:\n• "ベトナム語の通訳はありますか?" (có thông dịch tiếng Việt không)\n• "何曜日の何時にいますか?" (ngày + giờ có người tiếng Việt)\n• "予約は必要ですか?" (cần đặt hẹn không)\n• "[loại vấn đề] について相談したいのですが、こちらで大丈夫ですか?" (tôi muốn tư vấn về [vấn đề], ở đây có giúp được không?)\n\n2. **Đặt hẹn nếu cần** — ghi ngày + giờ + tên người sẽ gặp.\n\n3. **Hỏi địa chỉ chính xác + cách đi** — Google Maps không phải lúc nào cũng đúng.\n\n4. **Hỏi giấy tờ cần mang** — có thể khác cho từng vấn đề.\n\n5. **Nếu không có tiếng Việt + bạn không nói được tiếng Nhật**: dùng app dịch (DeepL, VoiceTra) qua điện thoại — đa số nhân viên hợp tác.',
      documents: [
        'Smartphone',
        'Bút + sổ ghi note',
      ],
      tip: 'Một số trung tâm chỉ có thông dịch tiếng Việt vào ngày cụ thể (vd thứ 3 hoặc thứ 7). Đặt lịch theo ngày đó.',
    },
    {
      step: 3,
      title: 'Đến trung tâm — chuẩn bị tư vấn hiệu quả',
      description:
        'Chuẩn bị TRƯỚC để dùng tốt thời gian (thường giới hạn 30 phút – 1 giờ):\n\n1. **Liệt kê câu hỏi** (3–5 câu) trên giấy.\n\n2. **Sắp xếp giấy tờ liên quan**:\n• Hợp đồng lao động (nếu vấn đề lao động)\n• 賃貸借契約書 (nếu vấn đề nhà ở)\n• Thư từ 市役所 / 入管 (nếu vấn đề thủ tục)\n• Hóa đơn lạ (nếu nghi scam)\n\n3. **Ghi timeline sự việc** — ngày tháng cụ thể, ai làm gì, kết quả ra sao.\n\n4. **Ghi mục tiêu** — bạn muốn gì? (vd "muốn được trả lương đầy đủ", "muốn gia hạn visa", "muốn ngừng quấy rối").\n\nKhi đến:\n• Đến trước 5 phút.\n• Mang đúng giấy tờ.\n• Trình bày ngắn gọn — để chuyên viên đặt câu hỏi.\n• Ghi note câu trả lời.\n• Hỏi: "次に何をすればいいですか?" (Bước tiếp theo tôi nên làm gì?)',
      documents: [
        '在留カード + hộ chiếu',
        'Giấy tờ liên quan vấn đề',
        'Sổ ghi câu hỏi + câu trả lời',
      ],
      tip: 'Chuyên viên là tình nguyện / nhân viên — không phải luật sư. Họ hướng dẫn bạn đi đúng hướng + tìm chuyên gia phù hợp, KHÔNG giải quyết thay bạn.',
    },
    {
      step: 4,
      title: 'Tham gia hoạt động bổ sung — lớp + sự kiện',
      description:
        'Trung tâm KHÔNG chỉ tư vấn — còn nhiều hoạt động hữu ích:\n\n1. **Lớp 日本語教室**:\n• Đa số trình độ N5–N2.\n• Miễn phí hoặc 100–500円/buổi.\n• 1–2 buổi/tuần, thường cuối tuần.\n• Đăng ký qua trung tâm.\n\n2. **Sự kiện văn hóa**: lễ hội, dạy nấu ăn, tour du lịch — kết bạn cộng đồng + người Nhật.\n\n3. **Hội thảo định kỳ**:\n• "Visa update" (cập nhật chính sách di trú)\n• "Tax season" (hỗ trợ 確定申告)\n• "Sinh con + nuôi con" (cho gia đình)\n• "Phòng tránh scam"\n\n4. **Lớp văn hóa Nhật**: trà đạo, kimono, thư pháp — vừa học vừa kết bạn.\n\n5. **Volunteer cơ hội**: nếu bạn giỏi tiếng Nhật + tiếng Việt, có thể đăng ký làm thông dịch viên cộng đồng cho người mới sang — ý nghĩa + xây quan hệ.',
      documents: [],
      tip: 'Đăng ký newsletter / Facebook page của trung tâm — biết sự kiện sớm + đăng ký kịp.',
    },
    {
      step: 5,
      title: 'Khi cần khẩn cấp — gọi đúng số',
      description:
        'Khi tình huống KHẨN CẤP, không phải mọi nơi đều giúp được. Phân loại:\n\n**Cấp cứu y tế / cháy / cứu hộ**: gọi **119**.\n\n**Tội phạm / bị tấn công**: gọi **110**.\n\n**Bạo lực gia đình (DV)**:\n• 110 nếu đang bị đe dọa.\n• DV相談+ (DV Soudan Plus): 0120-279-889 — hotline 24/7 đa ngôn ngữ.\n• 配偶者暴力相談支援センター (DV Counseling Center) ở mỗi 都道府県.\n• Nơi tạm lánh (シェルター) qua trên.\n\n**Visa / 入管 khẩn cấp**: FRESC hotline.\n\n**Lao động khẩn cấp** (bị trừ lương / không trả / bị đuổi việc oan):\n• 労働基準監督署 — cơ quan giám sát lao động.\n• 連合 (Rengo) — liên đoàn lao động.\n• Một số 労働組合 đa ngôn ngữ.\n\n**Tài chính khẩn cấp** (không có tiền ăn / chỗ ở):\n• 福祉事務所 ở 市役所 — hỗ trợ生活保護 nếu đủ điều kiện.\n• 多文化共生センター giới thiệu NPO + nhà thờ + tổ chức từ thiện.\n\n**Tâm lý / tự tử**: いのちの電話 (Inochi no Denwa): 0570-783-556 — 24/7. Yorisoi Hotline: 0120-279-338 — đa ngôn ngữ.\n\n**Đại sứ quán Việt Nam**: hotline khẩn cấp 24/7 cho công dân Việt.',
      documents: [
        'Điện thoại + pin',
        'Lưu các số trên trong contact',
      ],
      tip: 'Lưu các hotline quan trọng vào contact điện thoại NGAY — không đợi đến khi cần. Trong panic, không kịp tìm Google.',
    },
  ],
};

export default foreignResidentSupportCenters;
