import type { AdminGuide } from '../../../../types/content';

const petRegistrationJapan: AdminGuide = {
  id: 'pet-registration-japan',
  category: 'daily-law',
  lastVerified: '2026-05-14',
  priority: 'normal',
  title: 'Nuôi thú cưng ở Nhật — đăng ký chó, microchip, tiêm phòng, quy tắc chung cư',
  titleJp: 'ペットの登録・予防接種・マイクロチップ',
  icon: 'paw-outline',
  color: '#8E44AD',
  description:
    '2 luật chính: 狂犬病予防法 (chó phải đăng ký 市役所 trong 30 ngày + tiêm 狂犬病ワクチン hằng năm) + 動物愛護法 (microchip BẮT BUỘC cho chó/mèo bán bởi pet shop / breeder từ 2022-06-01). Mèo: KHÔNG bắt buộc đăng ký nhưng microchip mandatory nếu mua mới + tiêm phòng khuyến nghị. Đa số 賃貸 hợp đồng cấm pet trừ khi ghi rõ "ペット可" / "ペット相談" — vi phạm = bị đuổi. Đưa pet từ Việt Nam: VN là rabies-positive country → cần microchip + 2 mũi 狂犬病 + 血液検査 (FAVN ≥0.5 IU/ml) + 180 ngày chờ + thông báo 動物検疫所 ≥ 40 ngày trước. Đây là tài liệu định hướng — quy trình chi tiết kiểm tra với 市役所 + 動物検疫所 + 動物病院.',
  searchKeywords: [
    'nuôi chó',
    'nuôi mèo',
    'đăng ký chó',
    'tiêm phòng dại',
    'microchip',
    'mang chó từ Việt Nam',
    'mang mèo từ Việt Nam',
    'thuê nhà nuôi pet',
    'thú y',
    'pet shop',
    '犬登録',
    '狂犬病予防注射',
    '狂犬病ワクチン',
    '狂犬病予防法',
    '動物愛護法',
    'マイクロチップ',
    '鑑札',
    '注射済票',
    '動物検疫所',
    'AQS',
    'ペット可',
    'ペット相談',
    '動物病院',
    'ワクチン',
    '混合ワクチン',
    '5種混合',
    'FAVN',
    '輸入検査',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      '狂犬病予防法 (Rabies Prevention Act, 1950) toàn quốc — yêu cầu đăng ký chó + tiêm phòng dại hằng năm. 動物の愛護及び管理に関する法律 (動物愛護法) sửa đổi 2022-06-01 bắt buộc microchip cho chó/mèo bán bởi 第一種動物取扱業者 (breeder/pet shop). Quy định chi tiết (lịch tiêm, phí 鑑札) tùy 市区町村. Nhập khẩu pet do 動物検疫所 (AQS — Animal Quarantine Service) thuộc 農林水産省 quản lý theo 狂犬病予防法 + 家畜伝染病予防法. Đây là TÀI LIỆU THAM KHẢO — quy trình chi tiết + phí thay đổi tùy 自治体.',
    sourceVerifiedAt: '2026-05-14',
    nextReviewAt: '2026-12-01',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Chuẩn bị đưa pet từ VN sang Nhật — gọi 動物検疫所 + đại sứ quán VN tại Nhật để check thủ tục mới nhất.',
      'Pet đã quá thời hạn đăng ký / chưa tiêm dại nhiều năm — hỏi 市役所 cách bù không bị phạt nặng.',
      'Pet bị bệnh truyền nhiễm hoặc cắn người — báo 保健所 + 動物病院.',
      'Tranh chấp với 大家 / chung cư về pet — luật sư qua 法テラス nếu có hợp đồng "ペット可" rõ ràng nhưng bị ép dọn.',
    ],
  },
  quickAction: {
    deadline:
      'Chó mới đến nhà / mới sinh: đăng ký 市役所 trong **30 ngày** (chó nhập khẩu) hoặc **90 ngày** sau sinh. 狂犬病ワクチン: hằng năm, thường 4–6 月. Microchip: ngay khi mua từ pet shop (đã tiêm sẵn). Đưa pet từ VN: bắt đầu chuẩn bị **6 tháng+ TRƯỚC** ngày bay.',
    office:
      '市役所 / 区役所 (生活環境課 hoặc 保健所) — đăng ký chó + cấp 鑑札. 動物病院 — tiêm phòng + microchip + cấp 注射済票. 動物検疫所 (AQS) — nhập khẩu pet từ nước ngoài, có 5 sân bay chính (Narita, Haneda, Chubu, Kansai, Fukuoka). 環境省 — database microchip (環境省指定登録機関).',
    doNow: [
      'Mua/nhận pet → kiểm tra giấy tờ (microchip number nếu mua từ pet shop, sổ tiêm chủng nếu nhận từ chủ cũ).',
      'Đăng ký chó tại 市役所 trong 30 ngày — nộp 申請書 + phí ~3,000 yên → nhận 鑑札 (tag kim loại đeo cổ).',
      'Tiêm 狂犬病ワクチン tại 動物病院 (4–6 月 hằng năm) — phí 3,000–4,000 yên/lần → nhận 注射済票 (tag thứ 2).',
      'Đeo CẢ 2 tags vào cổ chó (luật bắt buộc khi ra ngoài).',
      'Đăng ký microchip vào 環境省 database (qua 動物病院 hoặc trực tiếp environment.go.jp) — mất 30 ngày làm thủ tục.',
      'Nếu thuê nhà: kiểm tra hợp đồng có "ペット可" không. Không có → KHÔNG mang pet về (vi phạm = bị đuổi + có thể bị đòi 慰謝料).',
    ],
    bring: [
      'Chó/mèo (nếu đăng ký trực tiếp)',
      'Sổ tiêm chủng / vaccine record từ pet shop / chủ cũ',
      'Microchip number (số 15 chữ số) nếu có',
      '在留カード + 印鑑',
      'Tiền mặt phí đăng ký (3,000–4,000 yên) + tiêm phòng (3,000–4,000 yên)',
      '住民票 (đôi khi yêu cầu cho chứng minh địa chỉ)',
    ],
    ifLate:
      'Chó chưa đăng ký + chưa tiêm dại nhiều năm: vẫn nên đến 市役所 báo + đăng ký bù. Phạt theo luật tối đa 200,000 yên cho không đăng ký + 200,000 yên cho không tiêm phòng — nhưng thực tế đa số 自治体 chỉ nhắc nhở + cho đăng ký bù nếu tự khai báo. Đưa pet từ VN trễ giấy: pet bị giữ tại 動物検疫所 max 180 ngày — phí lưu trú cao + stress cho pet. Chuẩn bị đầy đủ trước.',
    officialSourceLabels: ['厚生労働省 — 狂犬病', '環境省 — 動物愛護管理法'],
  },
  whoIsThisFor: [
    'Người Việt mới mua chó/mèo ở Nhật từ pet shop / breeder.',
    'Người Việt nhận pet từ chủ cũ (rescue, friend giving away).',
    'Người Việt muốn đưa pet (chó/mèo) từ VN sang Nhật.',
    'Người Việt đang nuôi pet nhưng chưa đăng ký / chưa tiêm dại — cần biết bù như thế nào.',
    'Người Việt đang tìm thuê nhà với pet — biết quy tắc 賃貸.',
    'Người Việt muốn về VN tạm với pet — biết thủ tục re-entry.',
  ],
  whenToDo: [
    'Trước khi mua/nhận pet — đọc luật + kiểm tra hợp đồng nhà.',
    'Trong 30 ngày sau nhận chó — đăng ký 市役所.',
    'Trong 90 ngày sau chó sinh — đăng ký 市役所.',
    'Hằng năm 4–6 月 — tiêm 狂犬病ワクチン.',
    'Mỗi lần chuyển nhà — báo địa chỉ mới với 市役所 mới + cũ.',
    'Mỗi lần chó/mèo mất / chết — báo 市役所 trong 30 ngày để hủy đăng ký.',
    'Chuẩn bị đưa pet từ VN: bắt đầu 6+ tháng trước.',
  ],
  whereToDo: [
    '市役所 / 区役所 — phòng 生活環境課 hoặc 保健所. Đăng ký chó + tag + báo địa chỉ.',
    '動物病院 (vet) — tiêm phòng + microchip + cấp 注射済票. Tra Google "近くの動物病院".',
    '動物検疫所 (AQS) tại 5 sân bay — Narita, Haneda, Chubu (Nagoya), Kansai (Osaka), Fukuoka.',
    '環境省 microchip database: https://reg.mc.env.go.jp/ — tự đăng ký online sau khi gắn microchip.',
    '保健所 — báo cáo nếu pet cắn người / có triệu chứng bệnh truyền nhiễm.',
    '在日ベトナム大使館 — hỗ trợ giấy tờ VN cho re-export pet.',
  ],
  estimatedTime:
    'Đăng ký chó tại 市役所: 30–60 phút. Tiêm 狂犬病ワクチン: 15–30 phút. Microchip implant: 10–15 phút. Đăng ký microchip database: online ~10 phút (xử lý 30 ngày). Nhập khẩu pet từ VN: chuẩn bị 6 tháng+ trước, kiểm tra tại sân bay 1–2 giờ (nếu đầy đủ giấy tờ) đến 180 ngày (nếu thiếu).',
  fees: [
    'Đăng ký chó (犬登録) tại 市役所: 3,000 yên/lần (1 lần duy nhất, có hiệu lực vĩnh viễn).',
    'Tag mất (再交付): 1,600 yên.',
    '狂犬病ワクチン (vaccine dại): 3,000–4,000 yên/lần (hằng năm). Bao gồm 注射済票 phí 550 yên.',
    'Microchip implant + đăng ký database: 5,000–10,000 yên (1 lần duy nhất). Đa số pet shop đã làm sẵn.',
    'Microchip change ownership: 300 yên (online).',
    'Vaccine kết hợp (混合ワクチン 5種/8種 cho chó, 3種/5種 cho mèo): 5,000–10,000 yên/lần (khuyến nghị hằng năm, 任意).',
    'Khám sức khỏe định kỳ: 5,000–15,000 yên.',
    'Triệt sản (避妊/去勢): 20,000–80,000 yên (1 lần). Một số 自治体 trợ cấp 50%.',
    'Xét nghiệm máu FAVN cho re-export: ~10,000 yên.',
    'Lưu trú tại 動物検疫所 nếu thiếu giấy tờ: 5,000–10,000 yên/ngày × max 180 ngày.',
    'Phí thay đổi tùy 自治体 + tùy 動物病院 — kiểm tra trước.',
  ],
  documentsChecklist: [
    { label: 'Pet (mang đến 市役所 nếu yêu cầu)', required: false, note: 'Một số 市役所 yêu cầu, một số không. Gọi hỏi trước.' },
    { label: 'Sổ tiêm chủng / vaccine record', required: true, note: 'Từ pet shop / breeder / chủ cũ. Có ngày + loại vaccine + 動物病院 cấp.' },
    { label: 'Microchip number (15 chữ số)', required: false, note: 'Bắt buộc nếu pet có. In trên giấy hoặc app pet shop.' },
    { label: '在留カード của chủ', required: true, note: 'Xác minh ID + địa chỉ.' },
    { label: '印鑑', required: false, note: 'Một số 自治体 yêu cầu. Ký tên thường OK.' },
    { label: 'Tiền mặt 3,000–4,000 yên', required: true, note: 'Phí đăng ký + tag.' },
    { label: '住民票 (nếu yêu cầu)', required: false, note: 'Cho chứng minh địa chỉ hiện tại.' },
    { label: '賃貸契約書 với "ペット可"', required: false, note: 'Nếu thuê nhà — chứng minh được phép nuôi (đề phòng tranh chấp).' },
    { label: 'Microchip implant certificate', required: false, note: '動物病院 cấp khi gắn microchip. Cần để đăng ký 環境省 database.' },
  ],
  commonMistakes: [
    'Mua chó/mèo trên SNS / mạng / Mercari → có thể là 無登録 breeder (vi phạm 動物愛護法). Mua từ 第一種動物取扱業者 đăng ký (kiểm tra 自治体 list).',
    'Không đăng ký chó trong 30 ngày → vi phạm luật, max phạt 200,000 yên. Đa số 自治体 nhắc nhở nếu tự khai báo bù.',
    'Quên tiêm dại hằng năm → vi phạm. Pet bị bệnh nguy hiểm + lây sang người (vẫn có 1–2 ca dại Nhật mỗi vài năm).',
    'Không đeo 鑑札 + 注射済票 trên cổ chó khi ra ngoài → vi phạm. Cảnh sát có thể phạt.',
    'Mang pet về nhà thuê 賃貸 không "ペット可" → vi phạm hợp đồng, có thể bị đuổi + đòi tiền sửa nhà (5–30 万円 cho pet damage).',
    'Để chó cắn người + không báo → vi phạm 狂犬病予防法 (báo 保健所 trong 24 giờ).',
    'Thả chó không xích / mèo ngoài trời tự do → tùy 自治体 có thể vi phạm 動物愛護法.',
    'Bỏ rơi pet (棄てる) → tội 動物愛護法, max phạt 1 triệu yên + tù 1 năm. Thay vào đó: 動物愛護センター nhận lại (phí 2,000–5,000 yên).',
    'Mang pet về VN không xét nghiệm → bị từ chối tại sân bay VN. Thủ tục re-export tốn thời gian + chi phí.',
    'Tin "vaccine 5種/8種 thay được vaccine dại" → SAI. 狂犬病ワクチン RIÊNG, bắt buộc theo luật. 5種/8種 là 任意 phòng các bệnh khác.',
  ],
  faq: [
    {
      question: 'Tôi muốn đưa chó từ Việt Nam sang Nhật — quy trình thế nào?',
      answer:
        'VN là **rabies-positive country** (có ca dại). Quy trình NGHIÊM NGẶT, chuẩn bị **6+ tháng trước**:\n\n**Bước 1 — Microchip (ISO 11784/11785)**: gắn tại Việt Nam.\n\n**Bước 2 — Tiêm 狂犬病ワクチン × 2 mũi** (cách ≥30 ngày): mũi đầu sau khi gắn microchip.\n\n**Bước 3 — Xét nghiệm máu FAVN**: làm tại lab được Nhật chấp nhận. Kết quả phải ≥**0.5 IU/ml**. Nếu < 0.5 → tiêm lại + xét nghiệm lại.\n\n**Bước 4 — Đợi 180 ngày** kể từ ngày lấy máu xét nghiệm (waiting period bắt buộc).\n\n**Bước 5 — Thông báo 動物検疫所 (AQS) ≥ 40 ngày trước ngày bay**: nộp 輸入届 online tại animal-quarantine.maff.go.jp.\n\n**Bước 6 — Khám trước bay** (10 ngày trước): 健康診断書 từ vet VN + 輸出許可書 từ Cục Thú y VN.\n\n**Bước 7 — Tại sân bay Nhật**: đến 動物検疫所 ngay. Nếu giấy tờ đầy đủ + đúng → kiểm tra 1–2 giờ. Thiếu/sai → bị giữ tối đa **180 ngày** (phí lưu trú 5–10 vạn yên/tháng).\n\n**5 sân bay nhập khẩu**: Narita, Haneda, Chubu (Nagoya), Kansai (Osaka), Fukuoka.\n\n**Tài liệu chính thức**: animal-quarantine.maff.go.jp — có tiếng Anh + Việt một số trang.\n\n**Lưu ý đặc biệt**: chó pit bull / Tosa / Akita / German shepherd trên 17 inch (~43cm) cần thêm giấy phép một số 都道府県 / Hawaii law.',
    },
    {
      question: 'Tôi thuê nhà — làm sao biết được phép nuôi pet không?',
      answer:
        '**Đọc kỹ 賃貸契約書**:\n\n- **"ペット可"** (pet OK): được nuôi pet (thường có giới hạn loại + số lượng + cân nặng).\n- **"ペット相談"** (pet relation): cần xin phép chủ nhà case-by-case.\n- **"ペット不可"** (pet không) hoặc không ghi gì: KHÔNG được nuôi.\n\n**Mặc định**: ở Nhật, đa số 賃貸 contracts CẤM pet trừ khi ghi rõ. Chủ nhà có quyền:\n• Đuổi (退去要求) trong 1 tháng nếu phát hiện.\n• Đòi 違約金 (penalty) thường 1–2 tháng thuê.\n• Đòi tiền sửa nhà (5–30 万円 cho mùi + scratches + cleaning).\n\n**Tìm nhà cho phép pet**:\n• Suumo / Homes / Athome có filter "ペット可".\n• 礼金 cho ペット可 thường cao hơn 1 tháng.\n• 敷金 thường +1 tháng (gọi "ペット敷金").\n\n**Chung cư (マンション)** có thêm 管理規約 (rules) riêng:\n• Số lượng pet (thường tối đa 2).\n• Cân nặng (thường <10kg).\n• Giống chó cấm (一部 chung cư cấm 大型犬).\n• Quy tắc chung (xích trong hành lang, cấm phòng tắm chung).\n\n**Mẹo**: hỏi 不動産 trước khi ký + lưu screenshot điều khoản pet. Tránh tranh chấp sau này.',
    },
    {
      question: 'Mèo có cần đăng ký + tiêm phòng không?',
      answer:
        '**Đăng ký**: KHÔNG bắt buộc theo 狂犬病予防法 (chỉ áp dụng cho chó). Một số 自治体 có voluntary registration cho mèo.\n\n**Microchip**: BẮT BUỘC nếu mua từ pet shop / breeder sau 2022-06-01 (動物愛護法). Mèo cũ / nhận từ chủ cũ — voluntary nhưng khuyến nghị (tăng cơ hội tìm lại nếu mất).\n\n**Vaccine**: KHÔNG bắt buộc theo luật, nhưng KHUYẾN NGHỊ MẠNH:\n• **3種混合ワクチン** (3-in-1): 猫汎白血球減少症, 猫カリシウイルス, 猫ウイルス性鼻気管炎.\n• **5種混合ワクチン** (5-in-1): thêm 猫白血病ウイルス, クラミジア (cho mèo ra ngoài).\n• Mèo con: 2 lần (6–8週 + 12–14週).\n• Mèo trưởng thành: 1 lần/năm.\n• Phí: 5,000–10,000 yên/lần.\n\n**Triệt sản (避妊/去勢)**: KHÔNG bắt buộc nhưng khuyến nghị mạnh — giảm bệnh + giảm trở thành 野良猫.\n\n**Mèo ra ngoài**: 動物愛護法 khuyến khích nuôi trong nhà. Nhiều 自治体 phạt nếu để mèo ra ngoài + cào hàng xóm.\n\n**Báo mèo mất**: 保健所 + 動物愛護センター — họ kiểm tra xác nhận microchip.',
    },
    {
      question: '狂犬病ワクチン 4–6 月 nhưng tôi đi VN tháng đó — làm sao?',
      answer:
        '**Tiêm sớm**: tiêm trước khi đi VN (tháng 3 / đầu tháng 4) — vẫn được tính cho năm.\n\n**Tiêm muộn**: tiêm sau khi về (tháng 7–8). 自治体 thường nhắc nhở qua thư nhưng KHÔNG phạt nếu tự khai bù trong cùng năm.\n\n**Vắng cả năm** (vd về VN nuôi pet): cần báo 市役所 — họ có thể tạm hủy đăng ký (一時所在不明). Khi quay lại Nhật: re-register + tiêm lại.\n\n**Cảnh báo**: nếu chó cắn người trong giai đoạn không có vaccine → vi phạm nghiêm trọng + chủ chịu trách nhiệm dân sự + có thể bị tước quyền nuôi.\n\n**Mẹo**: book lịch tiêm ngay khi nhận thư 4 月 từ 市役所. 一部 市役所 tổ chức tiêm tập trung tại công viên 4–6 月 với phí giảm.',
    },
    {
      question: 'Tôi muốn đưa pet về VN tạm 1 tháng — có cần thủ tục gì?',
      answer:
        'Có. Cần làm **trước khi xuất + sau khi nhập**:\n\n**Trước khi xuất Nhật → VN**:\n1. **健康診断書** từ 動物病院 (≤7 ngày trước bay).\n2. **輸出検査** tại 動物検疫所 (ngày bay) — nộp form online trước 7 ngày.\n3. **狂犬病予防注射証明書** (còn hạn).\n4. **Microchip number** verified.\n\n**VN side**:\n• Cục Thú y VN quy định nhập khẩu pet — kiểm tra cập nhật (thay đổi thường).\n• Có thể yêu cầu giấy phép nhập khẩu trước.\n• Khám tại sân bay VN.\n\n**Khi quay Nhật → VN → Nhật**:\n• Áp dụng quy trình **đầy đủ như nhập khẩu lần đầu** (FAVN test + 180 ngày waiting).\n• → Trong thực tế: KHÔNG đưa pet đi du lịch ngắn được, chỉ permanent move.\n\n**Mẹo**: nếu chỉ về VN ngắn → để pet ở Nhật (gửi 動物病院 lưu trú / 友達 / pet sitter). Phí pet hotel: 3,000–8,000 yên/đêm cho mèo, 5,000–15,000 yên/đêm cho chó.',
    },
    {
      question: 'Pet bị bệnh / chết — phải làm gì?',
      answer:
        '**Pet bị bệnh**:\n• Đưa đến 動物病院 — không có 健康保険 cho pet (trừ 任意 ペット保険 user mua trước).\n• Phí khám: 5,000–15,000 yên + thuốc.\n• Bệnh nặng (mổ, ung thư): 100,000–1 triệu yên+.\n• Cân nhắc ペット保険 (Anicom, アクサ, アイペット) khi pet còn trẻ — phí 2,000–5,000 yên/tháng.\n\n**Pet cắn người**:\n• Báo 保健所 trong **24 giờ** (luật bắt buộc).\n• Pet bị 観察期間 14 ngày (theo dõi rabies).\n• Người bị cắn đến bệnh viện + làm hồ sơ.\n• Chủ pet bồi thường thiệt hại (民法 718条) — có thể 10万–100万 yên+.\n\n**Pet chết**:\n• Báo 市役所 trong **30 ngày** để hủy đăng ký 犬登録.\n• Báo microchip database (環境省) thay đổi status.\n• 火葬 tại pet 火葬業者 — phí 10,000–50,000 yên (tùy size).\n• 一部 市役所 có dịch vụ 火葬 giá rẻ (5,000–10,000 yên).\n• Lựa chọn 個別 (riêng) vs 合同 (chung).\n• 納骨堂 cho pet — một số chùa Nhật có.\n\n**Pet mất tích**:\n• Báo 保健所 + 警察 + 動物愛護センター — họ kiểm tra microchip với pet được tìm.\n• Đăng FB groups + 迷い猫 / 迷い犬 sites.\n• Khoảng cách tìm: 80% pet được tìm trong bán kính 1–2 km nhà.',
    },
  ],
  counterPhrases: [
    {
      jp: '犬の登録をしたいです。',
      romaji: 'Inu no touroku o shitai desu.',
      vn: 'Tôi muốn đăng ký chó.',
      note: 'Câu mở đầu khi đến 市役所. Đưa giấy tờ + tiền + chó (nếu yêu cầu).',
    },
    {
      jp: '狂犬病予防注射の予約をお願いします。',
      romaji: 'Kyouken-byou yobou chuusha no yoyaku o onegai shimasu.',
      vn: 'Xin đặt lịch tiêm phòng dại.',
      note: 'Gọi 動物病院 đặt lịch. Mùa cao điểm 4–6 月.',
    },
    {
      jp: 'マイクロチップを装着したいです。',
      romaji: 'Maikurochippu o souchaku shitai desu.',
      vn: 'Tôi muốn gắn microchip.',
      note: 'Tại 動物病院. Sau khi gắn → tự đăng ký 環境省 database online.',
    },
    {
      jp: '海外から犬・猫を連れて帰りたいです。手続きを教えてください。',
      romaji: 'Kaigai kara inu/neko o tsurete kaeritai desu. Tetsuduki o oshiete kudasai.',
      vn: 'Tôi muốn đưa chó/mèo từ nước ngoài về. Xin hướng dẫn thủ tục.',
      note: 'Gọi 動物検疫所 (AQS). Có hotline đa ngôn ngữ tại 5 sân bay chính.',
    },
    {
      jp: 'うちの犬がワクチンを打っていません。今からでも登録できますか。',
      romaji: 'Uchi no inu ga wakuchin o utteimasen. Ima kara demo touroku dekimasu ka.',
      vn: 'Chó nhà tôi chưa tiêm vaccine. Giờ vẫn đăng ký được không?',
      note: 'Tại 市役所 — đa số chấp nhận đăng ký bù + hướng dẫn đi tiêm gần nhất.',
    },
    {
      jp: 'ペット可の物件を探しています。',
      romaji: 'Petto-ka no bukken o sagashite imasu.',
      vn: 'Tôi đang tìm nhà cho phép pet.',
      note: 'Nói tại 不動産. Họ filter danh sách "ペット可" / "ペット相談".',
    },
    {
      jp: '犬が亡くなりました。登録を抹消してください。',
      romaji: 'Inu ga nakunarimashita. Touroku o masshou shite kudasai.',
      vn: 'Chó tôi đã mất. Xin hủy đăng ký.',
      note: 'Tại 市役所. Mang theo 鑑札 (tag) + 在留カード của chủ.',
    },
    {
      jp: 'マイクロチップの情報変更をお願いします。',
      romaji: 'Maikurochippu no jouhou henkou o onegai shimasu.',
      vn: 'Xin đổi thông tin microchip.',
      note: 'Online tại 環境省 database (reg.mc.env.go.jp). Phí 300 yên.',
    },
  ],
  officialLinks: [
    { label: '厚生労働省 — 狂犬病', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/kousyuu/index.html' },
    { label: '環境省 — 動物愛護管理法', url: 'https://www.env.go.jp/nature/dobutsu/aigo/' },
    { label: '農林水産省 動物検疫所 (AQS)', url: 'https://www.maff.go.jp/aqs/' },
    { label: '環境省 — マイクロチップ登録', url: 'https://reg.mc.env.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Chuẩn bị TRƯỚC khi nhận pet',
      description:
        '**Kiểm tra hợp đồng nhà**:\n• 賃貸契約書 — có "ペット可" / "ペット相談" / "ペット不可"?\n• Chung cư — đọc 管理規約 về pet (loại + cân nặng + số lượng).\n• Không có "ペット可" → KHÔNG mang pet về.\n\n**Quyết định nguồn pet**:\n• **Pet shop / breeder đăng ký** (第一種動物取扱業者) — pet đã có microchip + giấy tờ. An toàn nhất.\n• **動物愛護センター** (rescue) — pet đã được khám + triệt sản. Phí thấp (~5,000–20,000 yên). Cần phỏng vấn.\n• **NPO rescue** — pet rescue, có thể cần training thêm.\n• **Bạn bè / chủ cũ** — kiểm tra giấy tờ vaccine + microchip.\n• **TRÁNH**: SNS, Mercari, Yahoo Auction — có thể là 無登録 breeder vi phạm luật.\n\n**Chuẩn bị tài chính**:\n• Phí mua pet: 50,000–500,000 yên (purebred breed).\n• Năm đầu (vaccine + microchip + đăng ký + đồ): 30,000–80,000 yên.\n• Hằng năm (vaccine + thức ăn + thuốc + grooming): 100,000–300,000 yên.\n• Bệnh nặng có thể: 300,000–1,000,000 yên+.\n• Cân nhắc ペット保険.\n\n**Chuẩn bị nhà**:\n• Cũi / lồng / ổ.\n• Bát ăn + nước.\n• Toilet (cho mèo) hoặc 散歩 plan (cho chó).\n• Đồ chơi.\n• Pet gate / barriers an toàn.',
      documents: [
        '賃貸契約書 đọc kỹ',
        '管理規約 chung cư',
      ],
      tip: 'Đừng vội mua thú cưng — nuôi thú cưng là cam kết 10–20 năm + thay đổi lối sống. Cân nhắc thử trước bằng cách trông giữ thú thuê (pet sitting) hoặc tình nguyện tại 動物愛護センター.',
    },
    {
      step: 2,
      title: 'Nhận pet → đăng ký 市役所 + tiêm vaccine + microchip',
      description:
        '**Trong 30 ngày sau nhận chó** (90 ngày nếu chó sinh ra ở Nhật):\n\n**Đến 市役所** (生活環境課 hoặc 保健所):\n1. Lấy 申請書 犬登録 hoặc download trước.\n2. Điền thông tin: tên chủ, địa chỉ, số 在留カード, thông tin chó (giống, ngày sinh, giới tính, màu lông).\n3. Nộp + đóng phí ~3,000 yên.\n4. Nhận **鑑札** (tag kim loại có số đăng ký).\n5. Đeo 鑑札 lên cổ chó luôn (luật bắt buộc).\n\n**Tiêm 狂犬病ワクチン tại 動物病院**:\n1. Đặt lịch trước (mùa cao điểm 4–6 月 đông).\n2. Mang chó + sổ tiêm (nếu có).\n3. Khám sơ + tiêm — 15–30 phút.\n4. Nhận **注射済票** (tag thứ 2) — đeo lên cổ chó luôn.\n5. Phí: 3,000–4,000 yên + 注射済票 fee 550 yên.\n\n**Microchip**:\n• Nếu pet shop đã gắn: nhận giấy chứng nhận + 15-digit number.\n• Nếu chưa: 動物病院 gắn — phí 5,000–10,000 yên.\n• **Đăng ký 環境省 database**: online tại reg.mc.env.go.jp — phí 300 yên (online) / 1,000 yên (giấy). Bắt buộc trong 30 ngày.\n\n**Cho mèo**:\n• KHÔNG cần đăng ký 市役所.\n• Microchip nếu mua mới: BẮT BUỘC.\n• Vaccine: voluntary nhưng khuyến nghị 3種/5種混合.',
      documents: [
        '在留カード',
        'Sổ tiêm chủng từ pet shop',
        'Microchip number',
        'Tiền mặt 5,000–10,000 yên',
      ],
      tip: 'Mang chó đến 市役所 chỉ khi yêu cầu — đa số chỉ cần giấy tờ. Gọi hỏi trước để khỏi mất công.',
    },
    {
      step: 3,
      title: 'Vòng đời hằng năm — vaccine + check-up + đổi địa chỉ',
      description:
        '**狂犬病ワクチン hằng năm**:\n• 4–6 月: 市役所 gửi thư nhắc + tổ chức tiêm tập trung tại công viên (giảm phí).\n• Hoặc đến 動物病院 cá nhân (thuận tiện hơn).\n• Phí: 3,000–4,000 yên + 注射済票 550 yên.\n• Sau tiêm: thay 注射済票 cũ trên cổ chó.\n\n**混合ワクチン (任意)**:\n• Chó: 5種 hoặc 8種 — phòng parvovirus, distemper, hepatitis, etc.\n• Mèo: 3種 hoặc 5種.\n• Hằng năm hoặc 3 năm/lần (theo bác sĩ).\n• Phí: 5,000–10,000 yên/lần.\n\n**Khám sức khỏe định kỳ**:\n• Trẻ (1–7 tuổi): 1 lần/năm.\n• Già (7+): 2 lần/năm + xét nghiệm máu.\n• Phí: 5,000–15,000 yên/lần.\n\n**Triệt sản** (nếu chưa):\n• Cái: 30,000–80,000 yên.\n• Đực: 20,000–50,000 yên.\n• Một số 自治体 trợ cấp 50%.\n\n**Đổi địa chỉ**:\n• Chuyển trong cùng 市: báo phòng 生活環境課.\n• Chuyển 市 khác: báo 市 mới — họ liên hệ 市 cũ.\n• Microchip database: cập nhật online (300 yên).\n\n**Nếu chủ pet đổi**:\n• Báo 市役所 + microchip database trong 30 ngày.\n• Người cũ + người mới ký giấy 譲渡証明書.',
      documents: [
        '鑑札 + 注射済票 (đeo trên cổ chó)',
        'Sổ tiêm cập nhật',
        'Microchip number',
      ],
      tip: 'Lưu lịch nhắc trên điện thoại tháng 4 hằng năm cho 狂犬病. Bỏ qua = vi phạm luật + nguy cơ rabies.',
    },
    {
      step: 4,
      title: 'Đưa pet từ Việt Nam sang Nhật — quy trình 6+ tháng',
      description:
        '**VN là rabies-positive country** → quy trình NGHIÊM NGẶT.\n\n**Tháng -6 đến -7 trước bay**:\n1. **Microchip** (ISO 11784/11785) tại 動物病院 VN.\n2. **狂犬病ワクチン mũi 1** (sau microchip).\n\n**Tháng -5 đến -6**:\n3. **狂犬病ワクチン mũi 2** (cách mũi 1 ≥ 30 ngày, ≤ 365 ngày).\n\n**Tháng -5**:\n4. **Lấy máu xét nghiệm FAVN** (≥30 ngày sau mũi 2).\n5. Gửi mẫu đến lab được Nhật chấp nhận (Kansas State, Nancy ANSES, etc.).\n6. Kết quả ≥ **0.5 IU/ml** → OK. Nếu < 0.5: tiêm lại + xét nghiệm lại.\n\n**Tháng -5 đến tháng -1 (180 ngày waiting)**:\n• Pet ở VN, đợi 180 ngày kể từ ngày lấy máu.\n• Trong thời gian này: tiêm lại trước khi vaccine cũ hết hạn (1 năm).\n\n**Tháng -2 đến -1**:\n7. **輸入届** online tại animal-quarantine.maff.go.jp ≥ 40 ngày trước bay.\n8. Nhận **事前届出受理書** từ AQS.\n\n**10 ngày trước bay**:\n9. **健康診断書** từ 動物病院 VN.\n10. **輸出検査** tại 動物検疫所 VN — Cục Thú y cấp giấy 検疫証明書.\n\n**Ngày bay**:\n• Mang pet + tất cả giấy tờ + microchip reader.\n• Pet trong cabin (nhỏ) hoặc cargo (lớn) tùy hãng.\n• ANA / JAL có dịch vụ pet — đặt trước.\n\n**Tại sân bay Nhật** (1 trong 5: Narita, Haneda, Chubu, Kansai, Fukuoka):\n• Đến **動物検疫所 (AQS)** ngay.\n• Nộp tất cả giấy tờ.\n• Đầy đủ + đúng → kiểm tra 1–2 giờ → cho mang về.\n• Thiếu / sai → giữ tại AQS đến 180 ngày (phí 5–10 vạn yên/tháng).\n\n**Sau khi về nhà**:\n• Đăng ký 市役所 trong 30 ngày (cho chó).\n• Microchip register Nhật database.\n• Tiếp tục tiêm 狂犬病ワクチン hằng năm.\n\n**Phí tổng ước tính**: 30–80 vạn yên (microchip + vaccines + FAVN + checks + flight + AQS).',
      documents: [
        'Microchip certificate',
        '狂犬病ワクチン × 2 mũi (sổ tiêm)',
        'FAVN result ≥ 0.5 IU/ml',
        '事前届出受理書 từ AQS',
        '健康診断書 (≤7 ngày)',
        '輸出検疫証明書 từ Cục Thú y VN',
      ],
      tip: 'Liên hệ AQS sớm — họ có hotline tiếng Anh hỗ trợ. Đừng dựa vào pet shipping company VN không có kinh nghiệm gửi sang Nhật.',
    },
    {
      step: 5,
      title: 'Khi pet bị bệnh / chết / mất / cắn người',
      description:
        '**Bệnh**:\n• Đến 動物病院 ngay — không có 健康保険 cho pet.\n• Phí khám: 5,000–15,000 yên + thuốc.\n• Cấp cứu đêm: 救急動物病院 (đắt hơn 2–3 lần).\n• Bệnh nặng: cân nhắc 2nd opinion + chi phí điều trị.\n• ペット保険 (nếu có): Anicom / アクサ / アイペット — báo công ty trước/sau khám.\n\n**Cắn người**:\n• **Báo 保健所 trong 24 giờ** (luật bắt buộc theo 狂犬病予防法).\n• Pet bị 観察期間 14 ngày (theo dõi rabies).\n• Người bị cắn đi viện — trả tiền viện trước, đòi sau.\n• Chủ chịu trách nhiệm dân sự (民法 718条) — bồi thường thương tật + 慰謝料 = 10–100 万 yên+.\n• Nghiêm trọng (cắn chết người): tội hình sự + có thể bị tịch thu pet.\n\n**Pet chết**:\n• **Báo 市役所 trong 30 ngày** để hủy 犬登録.\n• Báo microchip database (環境省) status "死亡".\n• 火葬:\n  ◦ Pet 火葬業者: 10,000–50,000 yên tùy size + 個別/合同.\n  ◦ 市役所 dịch vụ 合同: 5,000–10,000 yên.\n• Có thể 納骨 tại pet 墓地 / 寺.\n• Hỗ trợ tâm lý sau mất pet (ペットロス) — 動物病院 có thể giới thiệu counselor.\n\n**Mất tích**:\n• Báo 保健所 + 動物愛護センター + 警察.\n• Đăng FB groups (迷い猫/犬 + tên 都道府県).\n• Sites: PETHOSO, env.go.jp/nature/dobutsu/aigo/2_data/lost-found.\n• In poster, dán quanh khu (1–2km bán kính).\n• 8月+9月 (mùa typhoon): pet hay sợ chạy mất — đặc biệt cẩn thận.\n• Microchip giúp tìm lại — nếu pet được nhặt + đưa đến 動物愛護センター, họ scan + liên hệ chủ.\n\n**Bỏ rơi pet (棄てる)**:\n• Tội theo 動物愛護法 — max **1 triệu yên + 1 năm tù**.\n• Thay vào đó:\n  ◦ 動物愛護センター nhận lại (phí 2,000–5,000 yên).\n  ◦ NPO rescue.\n  ◦ Tìm chủ mới qua 譲渡会 / SNS.',
      documents: [
        '鑑札 + 注射済票',
        '医療記録 / vaccine record',
        'Microchip number',
        'ペット保険証 (nếu có)',
      ],
      tip: 'Pet là thành viên gia đình — đầu tư 1 ペット保険 (~3,000 yên/tháng) khi pet còn trẻ + khỏe = bảo vệ tài chính khi bệnh nặng.',
    },
  ],
};

export default petRegistrationJapan;
