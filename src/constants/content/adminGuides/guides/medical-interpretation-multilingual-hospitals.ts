import type { AdminGuide } from '../../../../types/content';

const medicalInterpretationMultilingualHospitals: AdminGuide = {
  id: 'medical-interpretation-multilingual-hospitals',
  category: 'health',
  lastVerified: '2026-05-09',
  priority: 'normal',
  title: 'Bệnh viện có phiên dịch + hỗ trợ đa ngôn ngữ',
  titleJp: '多言語対応の病院・医療通訳サービス',
  icon: 'globe-outline',
  color: '#3498DB',
  description:
    'Bệnh viện ở Nhật có nhiều cấp hỗ trợ ngôn ngữ: (1) bệnh viện 多言語対応 với nhân viên / thông dịch trong viện, (2) dịch vụ thông dịch y tế qua điện thoại / video, (3) tài liệu + form đa ngôn ngữ. Coverage tiếng Việt thay đổi theo khu — Tokyo / Aichi / Kanagawa thường có nhiều lựa chọn hơn vùng nông thôn. Hỏi TRƯỚC khi đến bệnh viện để chuẩn bị tốt.',
  searchKeywords: [
    'bệnh viện tiếng Việt',
    'phiên dịch y tế',
    'thông dịch bệnh viện',
    'đa ngôn ngữ',
    'AMDA',
    'multilingual hospital',
    'medical interpreter',
    '多言語対応',
    '医療通訳',
    '通訳サービス',
    '英語対応',
    'NPO y tế',
    'tư vấn y tế tiếng Việt',
    'JIGH',
  ],
  legalScope: {
    jurisdiction: 'mixed',
    jurisdictionNote:
      '厚生労働省 có chính sách "外国人患者受入医療機関認証制度 (JMIP)" cho bệnh viện đạt tiêu chuẩn đón tiếp người nước ngoài. Mỗi 都道府県 có chương trình hỗ trợ riêng. AMDA International Medical Information Center là NPO chính (1991), có thông dịch y tế qua điện thoại bằng nhiều ngôn ngữ. Coverage tiếng Việt cụ thể tùy khu vực — không phải mọi tỉnh đều có.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'low',
    whenToAskExpert: [
      'Bệnh nghiêm trọng / phức tạp — yêu cầu thông dịch viên y tế chuyên môn (không phải gia đình / bạn bè).',
      'Phẫu thuật / điều trị dài hạn — ký 同意書 (đồng ý điều trị) phải có thông dịch chính xác.',
      'Trẻ em hoặc người cao tuổi đi khám — hỏi bệnh viện có hỗ trợ đặc biệt cho người không nói được tiếng Nhật.',
    ],
  },
  quickAction: {
    deadline:
      'Trước khi đặt hẹn bệnh viện thường: gọi hỏi có hỗ trợ ngôn ngữ không. Cấp cứu: gọi 119 trước, sau đó AMDA cho thông dịch khẩn cấp.',
    office:
      '**Bệnh viện 多言語対応 / JMIP**: tìm trên trang JMIP (jmip.jme.or.jp) hoặc trang 都道府県. **AMDA Medical Information Center**: 03-6233-9266 (Tokyo/Đông Nhật), 06-4395-0555 (Osaka/Tây Nhật) — thông dịch y tế qua điện thoại. **多文化共生センター** + **国際交流協会** ở khu — có thể giới thiệu bệnh viện hoặc cử thông dịch.',
    doNow: [
      'Trước khi đến bệnh viện: gọi điện hỏi "ベトナム語の通訳はありますか?" hoặc "外国人対応はありますか?" để biết coverage.',
      'Nếu bệnh viện không có: gọi AMDA (03-6233-9266 Tokyo / 06-4395-0555 Osaka) — họ có thể cung cấp thông dịch qua điện thoại miễn phí cho cuộc gặp y tế.',
      'Hỏi 多文化共生センター / 国際交流協会 khu mình về danh sách bệnh viện 多言語対応 + dịch vụ thông dịch.',
      'Mang theo 在留カード, 保険証 / マイナンバーカード / 資格確認書, sổ ghi triệu chứng — chuẩn bị tốt giúp giao tiếp dễ hơn.',
      'Khi vào bệnh viện: nói "ベトナム語の通訳をお願いします" tại quầy 受付 — họ sẽ tìm cách kết nối thông dịch viên (nội bộ, AMDA, hoặc hệ thống thông dịch của 都道府県).',
    ],
    bring: [
      '在留カード + hộ chiếu',
      '保険証 / マイナンバーカード / 資格確認書',
      'Tiền mặt 5,000–10,000円',
      'Sổ ghi triệu chứng (đã viết bằng tiếng Việt + tự dịch sang Nhật bằng app)',
      'Smartphone với app dịch (DeepL, VoiceTra, Google Translate)',
      'Số điện thoại AMDA + hotline khu',
      'お薬手帳 nếu có',
    ],
    ifLate:
      'Đã đến bệnh viện không có thông dịch + không nói được tiếng Nhật: dùng app dịch (Google Translate có chế độ dịch ảnh + voice), gọi AMDA điện thoại tại đó để có thông dịch realtime, hoặc nhờ nhân viên 受付 gọi thông dịch của 都道府県 (nhiều khu có hệ thống này — có thể mất 30–60 phút).',
    officialSourceLabels: ['厚生労働省'],
  },
  whoIsThisFor: [
    'Người Việt mới sang Nhật chưa nói được tiếng Nhật.',
    'Người sống ở Nhật lâu nhưng tiếng Nhật chỉ giao tiếp cơ bản — không đủ cho y tế.',
    'Người đi khám bệnh phức tạp / phẫu thuật / điều trị dài hạn.',
    'Cha mẹ đưa con đi khám — cần thông dịch để hiểu chỉ định điều trị.',
    'Người cao tuổi không nói được tiếng Nhật.',
    'Người làm việc / học tập ở khu nông thôn — coverage thông dịch hạn chế hơn.',
  ],
  whenToDo: [
    'Trước khi chọn bệnh viện — kiểm tra có hỗ trợ ngôn ngữ không.',
    'Trước buổi khám lớn (chuyên khoa, phẫu thuật, sinh con) — đặt thông dịch trước.',
    'Khi cấp cứu — sau khi gọi 119, có thể yêu cầu thông dịch tại bệnh viện.',
    'Khi nhận chỉ định / 同意書 không hiểu — yêu cầu thông dịch trước khi ký.',
    'Khi nhận hóa đơn / giấy tờ y tế phức tạp — có thể nhờ thông dịch hoặc 多文化共生センター giải thích.',
  ],
  whereToDo: [
    '**Bệnh viện 多言語対応 / JMIP-certified**: search "Tên 都道府県 + JMIP" hoặc "+ 外国人医療". Bệnh viện đại học + bệnh viện lớn ở thành phố thường có.',
    '**AMDA International Medical Information Center** (NPO):\n• Tokyo (Đông Nhật): 03-6233-9266\n• Osaka (Tây Nhật): 06-4395-0555\n• Đa ngôn ngữ — có tiếng Việt theo lịch.\n• Miễn phí cho người dùng + bệnh viện.',
    '**多文化共生センター** ở 都道府県 / 市町村 — có thể cử thông dịch đi cùng (free hoặc phí thấp).',
    '**国際交流協会** ở 都道府県 — chương trình thông dịch y tế tình nguyện.',
    '**MIC Kanagawa, RASC Aichi, etc.** — NPO chuyên thông dịch y tế ở các 都道府県 có cộng đồng người nước ngoài lớn.',
  ],
  estimatedTime:
    'Tìm bệnh viện 多言語対応: 30 phút – 1 giờ. Đặt thông dịch trước: vài ngày trước hẹn. Buổi khám với thông dịch: 1.5–3 lần lâu hơn không thông dịch (vì cần dịch 2 chiều). Cấp cứu với thông dịch qua điện thoại: thêm 15–30 phút.',
  fees: [
    '**Bệnh viện 多言語対応**: phí khám như bình thường (30% với 保険証). Một số bệnh viện thu thêm 通訳料 50–500円/lần — hỏi trước.',
    '**AMDA Medical Information Center**: thông dịch qua điện thoại MIỄN PHÍ cho người dùng + bệnh viện.',
    '**多文化共生センター thông dịch đi cùng**: thường miễn phí hoặc 1,000–3,000円/lần — tùy 市町村.',
    '**Thông dịch tư nhân chuyên môn**: 5,000–15,000円/giờ — cho phẫu thuật / vụ phức tạp.',
    '**Phí điện thoại**: gọi AMDA là số 03 / 06 — phí cuộc gọi điện thoại bình thường.',
    'Phí thay đổi — kiểm tra với bệnh viện / dịch vụ cụ thể.',
  ],
  documentsChecklist: [
    { label: '保険証 / マイナンバーカード / 資格確認書', required: true, note: 'Để dùng bảo hiểm.' },
    { label: '在留カード', required: true, note: 'Một số bệnh viện hỏi xác minh danh tính.' },
    { label: 'Sổ ghi triệu chứng tiếng Việt', required: false, note: 'Viết trước + tự dịch sang Nhật bằng app — đỡ stress khi giao tiếp.' },
    { label: 'Smartphone với app dịch', required: true, note: 'DeepL, VoiceTra (do NICT — chính phủ Nhật phát hành), Google Translate.' },
    { label: 'お薬手帳', required: false, note: 'Sổ thuốc — bác sĩ xem hiểu thuốc đang dùng.' },
    { label: 'Số điện thoại AMDA', required: false, note: 'Lưu trong contact: 03-6233-9266 (Tokyo) / 06-4395-0555 (Osaka).' },
  ],
  commonMistakes: [
    'Không kiểm tra ngôn ngữ trước khi đến → đến nơi không có thông dịch, giao tiếp khó.',
    'Nhờ con / cháu nhỏ làm thông dịch → trẻ KHÔNG nên dịch tin xấu / chi tiết y tế phức tạp. Stress + có thể dịch sai.',
    'Nhờ bạn bè / đồng nghiệp không chuyên → hiểu sai thuật ngữ y tế dễ. Nên dùng thông dịch chuyên môn.',
    'Tin "tiếng Anh được" → nhiều bác sĩ Nhật tiếng Anh hạn chế. Tốt hơn là tiếng Việt qua thông dịch.',
    'KHÔNG ký 同意書 mà chưa hiểu — vẫn ký vì sợ phiền → có thể đồng ý điều trị / phí không mong muốn.',
    'Bỏ qua 多文化共生センター → bỏ lỡ nguồn miễn phí + hỗ trợ tốt.',
    'Đợi đến cấp cứu mới biết AMDA — nên lưu sẵn số trước.',
    'Tin "bệnh viện đại học có thông dịch tự động" — không phải mọi bệnh viện. Hỏi trước.',
  ],
  faq: [
    {
      question: 'Tôi sống ở Aichi (Nagoya) — có bệnh viện nào có thông dịch tiếng Việt?',
      answer:
        'Aichi có cộng đồng người Việt lớn — coverage tốt:\n\n• **Bệnh viện đại học** (Nagoya University Hospital, Aichi Medical University Hospital): có 国際診療部 + thông dịch.\n• **Aichi International Patients Center** (NPO RASC): chương trình thông dịch y tế tiếng Việt.\n• **多文化共生センター** ở Nagoya / Toyota / các 市 lớn — thông dịch tình nguyện.\n• **AMDA Osaka** (06-4395-0555): cũng phục vụ Aichi.\n\nCác cộng đồng có người Việt đông (Tokyo, Kanagawa, Saitama, Hyogo, Hiroshima, Fukuoka) cũng có nguồn tương tự — search "Tên 都道府県 + 医療通訳 ベトナム語".',
    },
    {
      question: 'Bệnh viện nói "có tiếng Anh" — tôi có nên đi không?',
      answer:
        'Tùy mức độ. "Có tiếng Anh" có nhiều mức:\n\n• **Mức 1 — basic**: nhân viên 受付 nói được vài câu. Đủ cho khám đơn giản.\n• **Mức 2 — bác sĩ nói tiếng Anh**: tốt nhưng có thể không đủ cho thuật ngữ chuyên môn / điều trị phức tạp.\n• **Mức 3 — thông dịch chuyên**: tốt nhất. Bệnh viện JMIP-certified thường có.\n\nNếu tiếng Anh của bạn cũng cơ bản → vẫn nên có thông dịch tiếng Việt. Tiếng Anh nửa vời + tiếng Nhật nửa vời = hiểu nhầm dễ hơn.\n\nGọi hỏi: "通訳のレベルはどのくらいですか?" (Mức thông dịch như thế nào?) để biết trước.',
    },
    {
      question: 'AMDA hoạt động thế nào?',
      answer:
        '**AMDA International Medical Information Center** là NPO (1991, Tokyo + Osaka), chuyên hỗ trợ y tế cho người nước ngoài.\n\n**Cách dùng**:\n1. Bạn / bệnh viện gọi AMDA.\n2. AMDA kết nối thông dịch viên y tế (chuyên ngành).\n3. Cuộc gọi 3 bên: bạn ↔ AMDA ↔ bác sĩ. Hoặc handoff điện thoại.\n4. Thông dịch dịch 2 chiều cho cuộc khám.\n\n**Đặc điểm**:\n• MIỄN PHÍ cho người dùng.\n• Đa ngôn ngữ (English, Chinese, Korean, Spanish, Portuguese, Vietnamese, Tagalog, Thai, etc.).\n• Tiếng Việt có theo lịch — có thể không 24/7.\n• Có cả tư vấn y tế chung (không chỉ thông dịch) — tư vấn trước khi đi viện.\n\n**Hạn chế**:\n• Thông dịch qua điện thoại — không có mặt tại bệnh viện.\n• Tiếng Việt có thể không sẵn ngay — đôi khi đặt lại.\n• Không thay thế bác sĩ — chỉ giúp giao tiếp.',
    },
    {
      question: 'Tôi mang vợ / chồng đi đẻ — cần thông dịch không?',
      answer:
        'KHUYẾN KHÍCH MẠNH có thông dịch chuyên môn cho sinh con:\n\n**Lý do**:\n• Nhiều thuật ngữ y tế đặc thù (cervical dilation, fetal heart rate, complications).\n• Stress cao → giao tiếp dễ sai.\n• Có thể cần ký 同意書 cho can thiệp khẩn cấp (mổ, gây tê).\n• Sau sinh: hướng dẫn chăm sóc + cho con bú + thuốc.\n\n**Cách tổ chức**:\n• Đặt hẹn bệnh viện 多言語対応 từ tam cá nguyệt thứ 2.\n• Trước ngày dự sinh: gọi AMDA dự đặt thông dịch.\n• Người thân Nhật-Việt thân thiết có thể đi cùng làm support — không phải thay thông dịch chuyên.\n• Đọc trước về sinh con ở Nhật (xem guide pregnancy-childbirth-postpartum + baby-born-in-japan).\n\nMột số bệnh viện sản khoa lớn có 助産師 (midwife) nói tiếng Anh / có chương trình đa ngôn ngữ — ưu tiên.',
    },
    {
      question: 'Tôi không có 保険証 + tiếng Nhật yếu — có khám được không?',
      answer:
        'Có, nhưng phức tạp hơn:\n\n• **Khám**: tất cả bệnh viện vẫn nhận, nhưng phải trả 100% chi phí.\n• **Thông dịch**: vẫn có thể dùng AMDA / 多文化共生 — không cần bảo hiểm để dùng dịch vụ thông dịch.\n• **Khẩn cấp**: 119 sẽ đưa đến bệnh viện gần nhất bất kể có 保険証 hay không. Sau đó tính phí.\n\n**Khi không có 保険証**:\n• Hỏi 市役所 về 健康保険被保険者資格証明書 (giấy tạm) — nếu đã đăng ký 国保 nhưng chưa có thẻ.\n• Đăng ký 国保 ở 市役所 ngay — có hiệu lực hồi tố trong 1 số trường hợp.\n• Nếu không thể đăng ký (vd visa ngắn hạn): chuẩn bị tiền mặt / thẻ tín dụng.\n\nXem guide clinic-hospital-visit-guide cho chi tiết khám không có bảo hiểm.',
    },
  ],
  counterPhrases: [
    {
      jp: 'ベトナム語の通訳はありますか。',
      romaji: 'Betonamu-go no tsuuyaku wa arimasu ka.',
      vn: 'Có thông dịch tiếng Việt không?',
      note: 'Câu cơ bản nhất — gọi bệnh viện trước khi đến.',
    },
    {
      jp: '外国人対応はしていますか。',
      romaji: 'Gaikokujin taiou wa shite imasu ka.',
      vn: 'Có hỗ trợ người nước ngoài không?',
      note: 'Câu rộng hơn — bệnh viện có thể không có tiếng Việt cụ thể nhưng có English / hệ thống thông dịch.',
    },
    {
      jp: 'AMDAに電話してもらえますか。',
      romaji: 'AMDA ni denwa shite moraemasu ka.',
      vn: 'Có thể gọi AMDA giúp tôi không?',
      note: 'Khi tại bệnh viện không có thông dịch — yêu cầu nhân viên gọi AMDA hỗ trợ.',
    },
    {
      jp: 'ゆっくり話してください。',
      romaji: 'Yukkuri hanashite kudasai.',
      vn: 'Xin nói chậm hơn.',
      note: 'Khi bác sĩ / nhân viên nói nhanh — yêu cầu chậm lại.',
    },
    {
      jp: '書いてもらえますか。',
      romaji: 'Kaite moraemasu ka.',
      vn: 'Có thể viết ra giúp tôi không?',
      note: 'Khi không hiểu lời nói — chữ viết dễ dùng app dịch hơn.',
    },
    {
      jp: '同意書の内容を教えてください。',
      romaji: 'Doui-sho no naiyou o oshiete kudasai.',
      vn: 'Cho tôi biết nội dung trong giấy đồng ý.',
      note: 'Trước khi ký 同意書 — nội dung quan trọng cần hiểu rõ.',
    },
    {
      jp: '通訳が来るまで待ちます。',
      romaji: 'Tsuuyaku ga kuru made machimasu.',
      vn: 'Tôi đợi đến khi thông dịch đến.',
      note: 'Nếu chỉ định không khẩn cấp — đợi thông dịch tốt hơn quyết vội.',
    },
  ],
  officialLinks: [
    { label: '厚生労働省', url: 'https://www.mhlw.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Trước khi đến bệnh viện — kiểm tra coverage ngôn ngữ',
      description:
        '1. **Search bệnh viện gần** với từ khóa:\n• "Tên 市町村 + 多言語対応 + 病院"\n• "Tên 都道府県 + JMIP" (chứng nhận đa ngôn ngữ)\n• "Tên 市町村 + 外国人医療"\n\n2. **Trang web JMIP** (jmip.jme.or.jp): danh sách bệnh viện được chứng nhận đón tiếp người nước ngoài. Có lọc theo 都道府県.\n\n3. **Gọi điện hỏi trực tiếp**:\n• "ベトナム語の通訳はありますか?"\n• "外国人対応はしていますか?"\n• "AMDAなどの通訳サービスを使えますか?"\n• Hỏi giờ có thông dịch (có thể chỉ 1 số ngày trong tuần).\n• Hỏi phí thông dịch nếu có.\n\n4. **Nếu không có**:\n• Gọi 多文化共生センター khu — họ có thể giới thiệu bệnh viện khác hoặc cử thông dịch.\n• Liên hệ AMDA (03-6233-9266 Tokyo / 06-4395-0555 Osaka) — họ có thể hỗ trợ thông dịch qua điện thoại.\n\n5. **Cấp cứu** (không kịp chuẩn bị): gọi 119 trước, sau đó AMDA hỗ trợ tại bệnh viện.',
      documents: [
        'Smartphone + internet',
      ],
      tip: 'Lưu list bệnh viện 多言語対応 trong khu vào điện thoại — cần khi gấp.',
    },
    {
      step: 2,
      title: 'Đặt hẹn + thông dịch trước',
      description:
        '1. **Đặt hẹn bệnh viện** như bình thường (xem guide clinic-hospital-visit-guide).\n\n2. **Đặt thông dịch trước** (nếu có thể):\n• Bệnh viện 多言語対応: thường tự sắp xếp khi bạn nói cần.\n• AMDA: gọi trước hẹn 1–2 ngày để check tiếng Việt available.\n• 多文化共生 / 国際交流: đặt 1 tuần trước nếu cần thông dịch đi cùng.\n\n3. **Khi đặt**:\n• Cho biết ngày + giờ + bệnh viện cụ thể.\n• Cho biết loại khám (内科, 産婦人科, 整形外科, etc.) — thông dịch cần biết để chuẩn bị thuật ngữ.\n• Có thể cần thông tin về triệu chứng/tiền sử để thông dịch hiểu context.\n\n4. **Chuẩn bị tài liệu cá nhân**:\n• Sổ ghi triệu chứng (tiếng Việt + tự dịch sang Nhật bằng app).\n• Lịch sử y tế cá nhân + gia đình.\n• Danh sách thuốc đang dùng.\n• Câu hỏi muốn hỏi bác sĩ.',
      documents: [
        'Smartphone',
        'Sổ ghi triệu chứng',
      ],
      tip: 'Nếu lần đầu dùng AMDA — gọi trước test 1 cuộc nhỏ để biết quy trình. Đỡ stress khi gặp việc thật.',
    },
    {
      step: 3,
      title: 'Tại bệnh viện — kết nối thông dịch',
      description:
        '**Tại quầy 受付**:\n\n1. Xuất trình 在留カード + 保険証 / マイナンバーカード / 資格確認書.\n2. Nói: "ベトナム語の通訳をお願いします" hoặc "AMDAを利用したいです".\n3. Nhân viên 受付 sẽ:\n• Liên hệ thông dịch nội bộ (nếu có).\n• Gọi AMDA giúp.\n• Liên hệ 都道府県 hệ thống thông dịch.\n\n**Trong khi chờ thông dịch**:\n\n• Điền 問診票 — có thể tự điền với app dịch.\n• Đợi 30 phút – 1 giờ thường (đặc biệt nếu chưa đặt trước).\n\n**Khi gặp bác sĩ**:\n\n• **Thông dịch trực tiếp** (in person): thông dịch ngồi cạnh, dịch cả 2 chiều.\n• **Thông dịch qua điện thoại** (AMDA / 都道府県): bác sĩ + bạn + thông dịch viên qua loa hoặc handoff điện thoại.\n• **Thông dịch qua tablet / video**: một số bệnh viện hiện đại có hệ thống video remote interpreting.\n\nKhi giao tiếp:\n• Nói câu ngắn — dễ dịch.\n• Đợi thông dịch xong rồi nói tiếp.\n• Hỏi lại nếu không hiểu: "もう一度お願いします" (xin nhắc lại).\n• Yêu cầu viết: "書いてもらえますか?" — chữ dễ dùng app dịch nếu cần.',
      documents: [
        'Tất cả từ Step 2',
      ],
      tip: 'Nếu thông dịch dịch sai / hiểu nhầm: lịch sự nói "ちょっと違います" (hơi khác). Yêu cầu giải thích lại. Đừng ngại — sai lầm trong y tế nguy hiểm.',
    },
    {
      step: 4,
      title: 'Đặc biệt — 同意書 (giấy đồng ý) + chỉ định điều trị',
      description:
        '同意書 (informed consent) là document quan trọng nhất — bạn ký = đồng ý điều trị / phẫu thuật / can thiệp.\n\n**Quy tắc vàng**: KHÔNG ký 同意書 mà chưa hiểu 100% nội dung.\n\n**Quy trình đúng**:\n\n1. Nhân viên đưa 同意書 (Nhật).\n2. Yêu cầu **dịch toàn bộ** qua thông dịch.\n3. Nội dung thường có:\n• Loại điều trị / phẫu thuật.\n• Lý do điều trị.\n• Lợi ích dự kiến.\n• Rủi ro + biến chứng có thể.\n• Lựa chọn thay thế.\n• Phí dự kiến.\n\n4. **Hỏi**:\n• "他の選択肢はありますか?" (Có lựa chọn khác không?)\n• "副作用はありますか?" (Có tác dụng phụ không?)\n• "費用はどのくらいですか?" (Phí bao nhiêu?)\n• "考える時間が必要です" (Tôi cần thời gian suy nghĩ).\n\n5. Nếu chưa chắc → KHÔNG ký. Mang về nhà đọc + bàn với gia đình.\n\n6. Nếu khẩn cấp + bắt buộc ký:\n• Nhờ thông dịch ghi rõ "同意の意思は通訳を通じて確認した" (sự đồng ý đã được xác nhận qua thông dịch) — bảo vệ pháp lý.\n• Có thể yêu cầu copy 同意書 sau khi ký.',
      documents: [
        '同意書 + bản copy sau khi ký',
      ],
      tip: 'Trẻ em / người không tỉnh táo: cha/mẹ / người giám hộ ký thay. Trong tình huống khẩn cấp + không có người ký: bác sĩ có thể tiến hành theo "緊急避難" — quyền cứu sống.',
    },
    {
      step: 5,
      title: 'Sau khám — hiểu chỉ định + thuốc',
      description:
        'Sau buổi khám, **NHIỀU thông tin cần nhớ**:\n\n1. **Hiểu chẩn đoán**:\n• Bệnh gì? Mức độ?\n• Cần điều trị gì?\n• Theo dõi định kỳ?\n• Tái khám khi nào?\n\n2. **Đơn thuốc** (処方箋):\n• Tên thuốc (tiếng Nhật + nếu có English).\n• Liều lượng + thời điểm uống.\n• Tác dụng phụ phổ biến.\n• Tương tác thuốc (với thuốc khác đang dùng).\n• Thời gian dùng (vài ngày / dài hạn).\n\n3. **Dặn dò sinh hoạt**:\n• Ăn uống có hạn chế gì.\n• Có được tập thể dục / làm việc bình thường không.\n• Triệu chứng cần lo (gọi bác sĩ ngay).\n\n4. **Yêu cầu giấy tóm tắt**:\n• "診療情報提供書" (medical summary) — cho lần khám phức tạp.\n• "病状説明文書" (illness explanation) — bệnh nặng cần giải thích.\n\n5. **Tại 薬局** (nhà thuốc):\n• Xem guide pharmacy-prescription-guide.\n• Hỏi thông dịch nếu không hiểu hướng dẫn dùng thuốc.\n\n6. **Theo dõi tại nhà**:\n• Ghi chép triệu chứng trong sổ.\n• Tuân thủ thuốc đúng giờ.\n• Tái khám đúng hẹn.',
      documents: [
        'Chẩn đoán + 処方箋',
        '診療情報提供書 (nếu có)',
      ],
      tip: 'Chụp ảnh tất cả giấy tờ y tế bằng smartphone + lưu cloud — phòng khi mất + cần show bác sĩ khác / thông dịch khác.',
    },
  ],
};

export default medicalInterpretationMultilingualHospitals;
