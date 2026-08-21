import type { AdminGuide } from '../../../../types/content';

const dentistVisitJapan: AdminGuide = {
  id: 'dentist-visit-japan',
  category: 'health',
  lastVerified: '2026-08-21',
  priority: 'normal',
  title: 'Đi nha khoa ở Nhật',
  titleJp: '日本で歯医者に行くとき',
  icon: 'medkit',
  color: '#1F618D',
  description:
    'Đi nha khoa ở Nhật phần lớn cần đặt hẹn (予約) trước. Phần lớn điều trị cần thiết được bảo hiểm chi trả 30%, nhưng điều trị thẩm mỹ (làm trắng, mặt dán sứ) thường KHÔNG được bảo hiểm và đắt hơn nhiều. Hỏi rõ chi phí trước khi đồng ý điều trị.',
  searchKeywords: [
    'nha khoa',
    'đau răng',
    'răng đau',
    'đi nha sĩ',
    'bảo hiểm nha khoa',
    'trám răng',
    'sâu răng',
    '歯医者',
    '歯科',
    '歯が痛い',
    '虫歯',
  ],
  legalScope: {
    jurisdiction: 'mixed',
    jurisdictionNote:
      'Phần lớn điều trị nha khoa cần thiết (sâu răng, viêm nướu, nhổ răng, trám) thuộc phạm vi bảo hiểm y tế công (健康保険 / 国民健康保険). Điều trị thẩm mỹ và một số vật liệu cao cấp (sứ, kim loại quý) là 自費診療 — không bảo hiểm. Quy định cụ thể tùy phòng nha và khu vực.',
    sourceVerifiedAt: '2026-08-21',
    nextReviewAt: '2027-01-15',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Điều trị phức tạp (cấy ghép インプラント, niềng răng 矯正, nhổ răng khôn 親知らず có vấn đề) — hỏi 2–3 phòng nha trước khi quyết.',
      'Phòng nha đề xuất gói điều trị > vài chục vạn yên — yêu cầu giải thích chi tiết bằng văn bản trước khi đồng ý.',
    ],
  },
  quickAction: {
    deadline: 'Đau răng kéo dài >1 ngày, sưng mặt, sốt kèm đau răng → đặt hẹn càng sớm càng tốt, nhiều phòng nha có khe trống cho 当日予約 (hẹn cùng ngày) buổi sáng.',
    office: '歯科 / 歯医者 (phòng nha) gần nhà hoặc chỗ làm. Đa số 歯科 nhỏ (1–3 ghế). Cấp cứu nha khoa cuối tuần / đêm: hỏi 歯科医師会 khu vực hoặc gọi #7119.',
    doNow: [
      'Xác định: đau răng cấp tính hay khám định kỳ. Cấp tính → ưu tiên 当日予約.',
      'Tìm 歯科 gần nhà bằng Google Maps. Đọc review ngắn — chú ý có đặt hẹn online hay không.',
      'Gọi điện hoặc đặt hẹn online. Nói "歯が痛いです。予約したいです".',
      'Mang thẻ bảo hiểm (保険証, マイナンバーカード đã liên kết, hoặc 資格確認書), 在留カード, tiền mặt 5,000–10,000円, お薬手帳 nếu có.',
      'Đến quầy受付, nói "予約しています" + tên + giờ hẹn. Điền 問診票.',
    ],
    bring: [
      'Thẻ bảo hiểm — マイナ保険証 (マイナンバーカード đã liên kết) hoặc 資格確認書 là 2 lựa chọn chính từ 01/08/2026 (保険証 giấy cũ hầu như đã hết hạn — xem guide myna-health-insurance-card-2026). Bắt buộc có 1 trong 3 loại nếu muốn dùng bảo hiểm.',
      '在留カード hoặc giấy tờ tùy thân',
      'Tiền mặt 5,000–10,000円 hoặc thẻ',
      'お薬手帳 nếu đang uống thuốc thường xuyên',
      'Danh sách thuốc / dị ứng (nếu có) — quan trọng vì nha khoa dùng thuốc tê',
    ],
    ifLate: 'Nếu đau dữ dội ngoài giờ làm việc của 歯科 và không tìm được phòng nha mở: thử 救急歯科 cuối tuần (歯科医師会 có lịch ở một số khu), hoặc gọi #7119 hỏi nơi nào nhận. Trong khi chờ, không ăn đồ cứng / nóng / lạnh, có thể uống thuốc giảm đau không kê toa từ 薬局.',
    officialSourceLabels: [
      '厚生労働省 — 医療情報ネット（休日・夜間対応医療機関検索）',
      '日本歯科医師会 (JDA) — 都道府県歯科医師会リンク',
      '厚生労働省 (MHLW) — 歯科保健',
      '厚生労働省 — 紹介状なし大病院受診時の選定療養費（歯科5,500円）',
    ],
  },
  whoIsThisFor: [
    'Người Việt đang đau răng / sưng nướu / chảy máu nướu lâu ngày.',
    'Người chưa từng đi nha khoa ở Nhật và muốn đi khám định kỳ.',
    'Người được phòng nha khuyến nghị điều trị đắt tiền và muốn cân nhắc.',
    'Cha mẹ có con nhỏ — muốn cho con đi 小児歯科 lần đầu.',
  ],
  whenToDo: [
    'Đau răng kéo dài >1 ngày, sưng mặt, sốt kèm đau răng → ưu tiên đi sớm.',
    'Chảy máu nướu khi đánh răng kéo dài >1 tuần.',
    'Răng lung lay, mẻ, vỡ.',
    'Khám định kỳ 6 tháng / 1 năm để cạo vôi và phát hiện sâu răng sớm.',
    'Trẻ em — nhiều khu hỗ trợ khám miễn phí cho trẻ qua 母子手帳 và lịch khám định kỳ.',
  ],
  whereToDo: [
    '歯科 / 歯医者 (phòng nha) gần nhà hoặc chỗ làm — phù hợp đa số trường hợp.',
    '小児歯科 — chuyên trẻ em.',
    '矯正歯科 — chuyên niềng răng.',
    '口腔外科 (khoa phẫu thuật miệng) trong 病院 lớn — nhổ răng khôn phức tạp, u nang, gãy hàm. Cần 紹介状 từ 歯科 thường.',
    'Không phải nơi: 薬局 không khám răng. Tự ý nhổ / khoan răng tại nhà = nguy hiểm.',
  ],
  estimatedTime:
    'Lần đầu thường 30–60 phút (chụp X-quang, lập kế hoạch điều trị). Mỗi lần điều trị tiếp theo 15–45 phút. Một liệu trình hoàn chỉnh (sâu răng nhiều, lấy tủy, bọc răng) có thể cần 4–8 lần hẹn.',
  fees: [
    'Có thẻ bảo hiểm hợp lệ (マイナ保険証, 資格確認書, hoặc 保険証 giấy còn hạn — từ 01/08/2026 phần lớn thẻ giấy đã hết hạn): bệnh nhân thường trả khoảng 30% chi phí. Số tiền dưới đây chỉ là tham khảo — phí thực tế thay đổi tùy phòng nha và khu vực.',
    'Lần khám đầu tiên + chụp X-quang: thường khoảng 2,000–5,000円 với bảo hiểm.',
    'Trám răng đơn giản với vật liệu thường (CR / cement): thường khoảng 1,500–4,000円/răng với bảo hiểm.',
    'Lấy tủy 根管治療: thường khoảng 5,000–15,000円 cả liệu trình với bảo hiểm — chia nhiều lần hẹn.',
    'Bọc răng kim loại bạc 銀歯 thường có bảo hiểm. Bọc sứ 自費 thường không bảo hiểm và đắt hơn nhiều.',
    'Cấy ghép インプラント và niềng răng 矯正 thường là 100% tự trả (自費) — chi phí cao, hỏi 見積書 từ ≥2 phòng nha trước khi quyết.',
    'LUÔN hỏi 見積書 (báo giá) trước khi đồng ý điều trị đắt tiền hoặc 自費.',
  ],
  documentsChecklist: [
    { label: 'マイナ保険証 / 資格確認書 / 保険証 giấy còn hạn', required: true, note: 'Bất kỳ thẻ chứng minh tư cách bảo hiểm hợp lệ. Từ 01/08/2026, đa số 保険証 giấy đã hết hạn — chủ yếu dùng マイナ保険証 hoặc 資格確認書. Thiếu = trả 100%, đắt hơn nhiều.' },
    { label: '在留カード', required: false, note: 'Một số phòng nha hỏi giấy tờ tùy thân lần đầu.' },
    { label: 'Tiền mặt 5,000–10,000円 hoặc thẻ', required: true, note: 'Một số 歯科 nhỏ chỉ nhận tiền mặt.' },
    { label: 'お薬手帳', required: false, note: 'Quan trọng — bác sĩ kiểm tra trước khi gây tê / kê thuốc.' },
    { label: 'Danh sách dị ứng thuốc / vật liệu', required: false, note: 'Đặc biệt quan trọng nếu dị ứng latex, penicillin, kim loại.' },
  ],
  commonMistakes: [
    'Không đặt hẹn → đến nơi bị từ chối hoặc chờ rất lâu. Đa số 歯科 chỉ nhận theo 予約.',
    'Không hỏi có dùng bảo hiểm được không → đồng ý điều trị 自費 mà không biết.',
    'Đồng ý điều trị đắt tiền (sứ, インプラント) ngay lần khám đầu khi chưa hiểu rõ — luôn hỏi 見積書 và lựa chọn rẻ hơn.',
    'Bỏ lỡ lịch tái khám 再診 → liệu trình dở dang, có thể nhiễm trùng nặng hơn.',
    'Đau răng nhưng tự uống kháng sinh không kê toa từ chuyến về VN → giấu triệu chứng, làm khó chẩn đoán.',
    'Chỉ đi khi đau → bỏ qua khám định kỳ. Cạo vôi 6 tháng/lần được bảo hiểm chi trả phần lớn.',
  ],
  faq: [
    {
      question: 'Tôi đau răng nhưng chưa từng đi nha khoa ở Nhật, đặt hẹn thế nào?',
      answer:
        'Tìm 歯科 gần nhà trên Google Maps, xem giờ làm và số điện thoại. Gọi: "もしもし、初めてです。歯が痛いので、予約したいです。今日空いていますか?". Nếu phòng nha có web đặt hẹn online, dùng được tiếng Anh / điền katakana. Nhiều 歯科 giữ vài khe trống mỗi sáng cho 当日予約.',
    },
    {
      question: 'Bảo hiểm có chi trả cho răng giả / cầu răng không?',
      answer:
        'Răng giả tháo lắp (入れ歯) bằng nhựa thường có bảo hiểm. Cầu răng (ブリッジ) bằng kim loại bạc thường có bảo hiểm. Răng giả / cầu răng bằng sứ hoặc kim loại quý là 自費 — không bảo hiểm. Hỏi rõ "保険でできるものはありますか?" trước khi quyết.',
    },
    {
      question: 'Phòng nha bảo tôi cần làm インプラント — có cách rẻ hơn không?',
      answer:
        'Có. インプラント thường là 100% tự trả nên rất đắt. Thay vào đó có thể chọn: ブリッジ (cầu răng kim loại bạc — thường có bảo hiểm) hoặc 入れ歯 部分 (răng giả tháo lắp một phần — thường có bảo hiểm). Chất lượng thẩm mỹ thấp hơn nhưng chức năng nhai thường vẫn ổn. Hỏi: "保険でできる方法はありますか?". Nên đi thêm 1–2 phòng nha nữa để nghe ý kiến và so sánh 見積書.',
    },
    {
      question: 'Trẻ em đi nha khoa lần đầu cần chuẩn bị gì?',
      answer:
        'Mang thẻ bảo hiểm của trẻ (保険証 / マイナンバーカード / 資格確認書) + 母子手帳 + 在留カード của cha/mẹ. Một số khu có chương trình 子ども医療費助成 (hỗ trợ y tế trẻ em) — điều kiện và mức hỗ trợ tùy 市区町村, hỏi 市役所 trước. Tìm phòng có 小児歯科 hoặc 歯科 thân thiện với trẻ. Đặt hẹn buổi sáng — trẻ ít mệt, ít quấy.',
    },
    {
      question: 'Tôi đau răng dữ dội cuối tuần, các 歯科 đều đóng — phải làm sao?',
      answer:
        'Mỗi 都道府県 thường có 休日歯科診療所 (phòng nha cuối tuần / ngày lễ). Tra trên trang của 歯科医師会 khu vực. Hoặc gọi #7119 (khu vực có hỗ trợ) hỏi nơi nào nhận. Trong khi chờ: uống thuốc giảm đau không kê toa từ 薬局 (như ロキソニン), không ăn đồ nóng / lạnh / cứng. Sưng mặt + sốt cao → cấp cứu, gọi 119.',
    },
  ],
  counterPhrases: [
    {
      jp: '歯が痛いです。',
      romaji: 'Ha ga itai desu.',
      vn: 'Tôi bị đau răng.',
      note: 'Câu mở đầu khi nói với nha khoa.',
    },
    {
      jp: '予約したいです。',
      romaji: 'Yoyaku shitai desu.',
      vn: 'Tôi muốn đặt hẹn.',
      note: 'Dùng khi gọi điện hoặc hỏi ở quầy.',
    },
    {
      jp: '保険は使えますか。',
      romaji: 'Hoken wa tsukaemasu ka.',
      vn: 'Có dùng bảo hiểm được không?',
      note: 'Dùng trước khi điều trị để tránh hiểu nhầm chi phí.',
    },
    {
      jp: '費用はいくらくらいですか。',
      romaji: 'Hiyou wa ikura kurai desu ka.',
      vn: 'Chi phí khoảng bao nhiêu?',
      note: 'Dùng để hỏi chi phí dự kiến.',
    },
    {
      jp: '今日、治療できますか。',
      romaji: 'Kyou, chiryou dekimasu ka.',
      vn: 'Hôm nay có điều trị được không?',
      note: 'Dùng khi đang đau và muốn xử lý trong ngày.',
    },
    {
      jp: '痛み止めはもらえますか。',
      romaji: 'Itamidome wa moraemasu ka.',
      vn: 'Tôi có thể nhận thuốc giảm đau không?',
      note: 'Dùng khi cần thuốc giảm đau.',
    },
    {
      jp: '説明をゆっくりお願いします。',
      romaji: 'Setsumei o yukkuri onegai shimasu.',
      vn: 'Làm ơn giải thích chậm giúp tôi.',
      note: 'Dùng khi chưa hiểu giải thích của bác sĩ.',
    },
  ],
  officialLinks: [
    { label: '厚生労働省 — 医療情報ネット（休日・夜間対応医療機関検索）', url: 'https://www.iryou.teikyouseido.mhlw.go.jp/znk-web/juminkanja/S2800/initialize' },
    { label: '日本歯科医師会 (JDA) — 都道府県歯科医師会リンク', url: 'https://www.jda.or.jp/links/links04.html' },
    { label: '厚生労働省 (MHLW) — 歯科保健', url: 'https://www.mhlw.go.jp/' },
    { label: '厚生労働省 — 紹介状なし大病院受診時の選定療養費（歯科5,500円）', url: 'https://www.mhlw.go.jp/stf/newpage_26666.html' },
  ],
  steps: [
    {
      step: 1,
      title: 'Phân biệt đau răng cấp tính và khám định kỳ',
      description:
        'Xem mức độ đau của bạn:\n\n• Đau dữ dội + sưng mặt + sốt → ưu tiên 当日予約 hoặc 救急歯科 cuối tuần.\n• Đau âm ỉ kéo dài >1–2 ngày → đặt hẹn trong vài ngày tới.\n• Không đau, chỉ muốn cạo vôi / khám định kỳ → đặt hẹn theo lịch tiện.\n\nQuyết định mức độ ưu tiên giúp bạn chọn 歯科 đúng — phòng có 当日予約 hay không.',
      documents: [],
      tip: 'Đau dữ dội kèm sưng mặt và sốt cao có thể là nhiễm trùng lan — không đợi. Nếu sốt >38.5°C, gọi 119 hoặc đến 病院 cấp cứu.',
    },
    {
      step: 2,
      title: 'Tìm 歯科 và đặt hẹn',
      description:
        'Mở Google Maps, gõ "歯科" hoặc "歯医者". Lọc theo:\n\n• Khoảng cách (đi bộ / xe đạp được)\n• Giờ làm — đa số 歯科 đóng nửa ngày thứ Tư / thứ Năm\n• Có đặt hẹn online không\n• Review (đặc biệt review về thái độ với người nước ngoài)\n\nĐặt hẹn:\n• **Gọi điện**: "もしもし、初めてです。歯が痛いので予約したいです。今日空いていますか?"\n• **Online**: nhiều phòng có web — điền tên (片仮名), ngày sinh, số điện thoại, triệu chứng.\n\nGhi lại: ngày, giờ, tên phòng nha, số điện thoại.',
      documents: [],
      tip: 'Nếu không nói được tiếng Nhật trên điện thoại, ưu tiên phòng nha có đặt hẹn online. Hoặc nhờ đồng nghiệp / bạn người Nhật giúp gọi.',
    },
    {
      step: 3,
      title: 'Đến phòng nha — quầy 受付 và 問診票',
      description:
        'Đến trước giờ hẹn 5–10 phút. Mang đầy đủ:\n\n• Thẻ bảo hiểm — マイナ保険証 (マイナンバーカード đã liên kết) hoặc 資格確認書 (từ 01/08/2026 là 2 lựa chọn chính; 保険証 giấy cũ hầu như đã hết hạn)\n• 在留カード\n• Tiền mặt 5,000–10,000円\n• お薬手帳 (nếu có)\n\nTại quầy 受付:\n• Nói "予約しています、〇〇です" (tôi có hẹn, tên ...)\n• Đưa thẻ bảo hiểm + giấy tờ tùy thân\n• Nhận 問診票 — điền tay tại chỗ\n\n問診票 hỏi: tên / ngày sinh / địa chỉ / triệu chứng / khi nào bắt đầu / dị ứng thuốc / bệnh nền / thuốc đang uống / có thai không. Nếu không hiểu, hỏi nhân viên.',
      documents: [
        '保険証 / マイナンバーカード / 資格確認書',
        '在留カード',
        'Tiền mặt / thẻ',
        'お薬手帳 (nếu có)',
      ],
      tip: 'Mục dị ứng và thuốc đang dùng RẤT quan trọng — nha khoa dùng thuốc tê và đôi khi kê kháng sinh. Khai chính xác.',
    },
    {
      step: 4,
      title: 'Khám và lập kế hoạch điều trị',
      description:
        'Bác sĩ gọi vào ghế khám. Lần đầu thường gồm:\n\n1. Hỏi triệu chứng — chỉ vào răng đau, mô tả: âm ỉ / nhói / khi ăn nóng / lạnh / khi cắn.\n2. Khám nhanh bằng gương + dụng cụ.\n3. Chụp X-quang (パノラマ / デンタル) — chuẩn để chẩn đoán.\n4. Bác sĩ giải thích: tình trạng, kế hoạch điều trị, số lần hẹn dự kiến.\n5. Hỏi: "保険でできますか?" (có bảo hiểm không?) và "費用はいくらくらいですか?" (chi phí bao nhiêu?).\n\nNếu kế hoạch đắt (>30,000円), yêu cầu 見積書 (báo giá bằng văn bản) để cân nhắc trước khi đồng ý.',
      documents: [],
      tip: 'Không đồng ý điều trị 自費 (tự trả 100%) ngay lần đầu khi chưa hiểu. Luôn hỏi: "保険でできる方法はありますか?" — gần như mọi vấn đề đều có lựa chọn có bảo hiểm.',
    },
    {
      step: 5,
      title: 'Điều trị, thanh toán và đặt hẹn tái khám',
      description:
        'Sau khi đồng ý kế hoạch:\n\n1. **Điều trị lần này**: bác sĩ làm việc cần thiết hôm nay (giảm đau, làm sạch, trám tạm). Một số việc phải chờ lần hẹn sau.\n2. **Thanh toán**: ra quầy 会計 — đưa hóa đơn, trả tiền (tiền mặt hoặc thẻ). Nhận 領収書 — giữ lại để khai 医療費控除 cuối năm nếu tổng chi phí cả nhà >100,000円.\n3. **Đặt hẹn tái khám 再診**: nhân viên đề xuất ngày — chọn phù hợp lịch của bạn.\n4. **Toa thuốc**: nếu kê kháng sinh / giảm đau → cầm 処方箋 ra 薬局 mua trong 4 ngày.\n\nUống thuốc đúng giờ, đánh răng nhẹ chỗ vừa điều trị.',
      documents: [
        'Tiền mặt / thẻ',
        'Thẻ bảo hiểm (đã đưa rồi, sẽ trả lại)',
        '処方箋 nếu có',
      ],
      tip: 'Đặt nhắc nhở trên điện thoại cho lần hẹn tiếp theo. Bỏ lỡ tái khám = liệu trình dở dang = có thể đau / nhiễm trùng nặng hơn.',
    },
  ],
};

export default dentistVisitJapan;
