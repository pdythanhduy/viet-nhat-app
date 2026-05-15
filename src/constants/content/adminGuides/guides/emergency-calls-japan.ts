import type { AdminGuide } from '../../../../types/content';

const emergencyCallsJapan: AdminGuide = {
  id: 'emergency-calls-japan',
  category: 'health',
  lastVerified: '2026-05-09',
  priority: 'normal',
  title: 'Gọi cấp cứu, cảnh sát ở Nhật',
  titleJp: '日本で緊急電話をかけるとき',
  icon: 'call',
  color: '#C0392B',
  description:
    'Khi gặp tình huống khẩn cấp ở Nhật, gọi 119 cho cấp cứu / cứu hỏa, gọi 110 cho cảnh sát. Tổng đài hỏi 3 việc: ở đâu, chuyện gì, có ai bị thương. Câu đầu tiên rõ ràng quan trọng hơn nói đúng ngữ pháp. Tổng đài 119/110 có thể kết nối thông dịch ở nhiều khu vực — không phải toàn quốc. Tiếng Nhật yếu thì cứ nói "日本語があまり話せません" trước.',
  searchKeywords: [
    'cấp cứu',
    'gọi cứu thương',
    'gọi cảnh sát',
    'xe cứu thương',
    '119',
    '110',
    '7119',
    '9110',
    'tai nạn',
    'cháy',
    '救急車',
    '警察',
    '火事',
    '事故',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      '119 (cấp cứu / cứu hỏa) do 総務省消防庁 quản lý toàn quốc. 110 (cảnh sát) do 警察庁 / 都道府県警察 quản lý toàn quốc. Các số tư vấn #7119 (y tế) và #9110 (cảnh sát không khẩn cấp) tùy khu vực — không phải tỉnh nào cũng có.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Sự cố nghiêm trọng (tai nạn lao động, cháy lớn, hành hung) — sau khi gọi 119/110, liên hệ FRESC hoặc luật sư để bảo vệ quyền.',
      'Trường hợp liên quan visa (bị đánh, bị tai nạn nặng kéo dài) — báo Đại sứ quán.',
    ],
  },
  quickAction: {
    deadline: 'Gọi NGAY khi sự cố xảy ra. Đừng quay video, đừng tìm bạn bè dịch trước — gọi trước, mọi thứ khác sau.',
    office: '119 (cứu thương / cứu hỏa) — không phí. 110 (cảnh sát) — không phí. Hai số này hoạt động 24/7 toàn quốc.',
    doNow: [
      'Hít sâu, bấm 119 (y tế / cháy) hoặc 110 (cảnh sát). Câu đầu: "救急車をお願いします" / "火事です" / "警察をお願いします".',
      'Nói địa chỉ rõ ràng — số nhà, tên chung cư, tầng, phòng. Nếu không nhớ, đọc địa chỉ trên 在留カード hoặc Google Maps.',
      'Mô tả ngắn: chuyện gì xảy ra, có bao nhiêu người liên quan, có ai bị thương / mất ý thức không.',
      'Nói "日本語があまり話せません" nếu tiếng Nhật yếu — tổng đài sẽ nói chậm hoặc kết nối thông dịch.',
      'KHÔNG cúp máy cho đến khi tổng đài nói "切ってください" hoặc "わかりました". Nếu được, cử người ra đầu ngõ vẫy xe cứu thương.',
    ],
    bring: [
      'Điện thoại có pin và sóng',
      '在留カード (để xác định danh tính khi xe cứu thương đến)',
      '保険証 / マイナンバーカード (đã liên kết bảo hiểm) / 資格確認書 — bất kỳ thẻ nào chứng minh tư cách bảo hiểm (cứu thương sẽ hỏi để biết đưa đến viện nào)',
      'Tiền mặt 1–3 vạn (phòng khi viện không nhận thẻ ban đêm)',
      'Sổ お薬手帳 nếu người bệnh đang dùng thuốc',
    ],
    ifLate: 'Nếu không gọi được điện thoại (sóng yếu, pin hết): đến 交番 gần nhất, hoặc nhờ người đi đường gọi giúp. Trong tòa nhà, nhấn nút 火災報知器 (báo cháy) hoặc gọi quản lý tòa.',
    officialSourceLabels: [
      '総務省消防庁 (FDMA) — 119',
      '警察庁 (NPA) — 110',
      '総務省消防庁 (FDMA) — #7119 救急安心センター事業',
      '警察庁 — 警察相談専用電話 #9110',
      '茨城県 — 救急搬送における選定療養費の徴収について',
    ],
  },
  whoIsThisFor: [
    'Người Việt mới sang Nhật chưa biết gọi số nào trong cấp cứu.',
    'Gia đình có người già / trẻ nhỏ — cần biết phản ứng nhanh.',
    'Người sống một mình — phải tự xử lý khi gặp sự cố.',
    'Tất cả người sống ở Nhật — đọc trước khi cần để khỏi hoảng.',
  ],
  whenToDo: [
    'Có người bất tỉnh, khó thở dữ dội, đau ngực dữ dội, co giật, chảy máu nhiều → gọi 119 ngay.',
    'Cháy / khói trong nhà → gọi 119 và ra khỏi tòa nhà ngay.',
    'Tai nạn giao thông có người bị thương → gọi 119 (cứu thương) + 110 (cảnh sát).',
    'Bị tấn công, trộm cướp, bạo hành → gọi 110.',
    'Phân vân không chắc có cấp cứu hay không và khu vực có #7119 → có thể gọi tư vấn trước. Nếu khu vực không có / không chắc → vẫn gọi 119.',
  ],
  whereToDo: [
    'Bất kỳ điện thoại nào ở Nhật — cố định, di động, điện thoại công cộng. 119 và 110 KHÔNG cần thẻ điện thoại / không cần tín hiệu nhà mạng có hợp đồng.',
    'Trên tàu / ga: nhấn nút khẩn cấp 非常通報装置, hoặc nói với 駅員 (nhân viên ga).',
    'Trong tòa nhà: nhấn 火災報知器 (báo cháy) cho cháy. Gọi 119 / 110 vẫn được từ trong nhà.',
  ],
  estimatedTime:
    'Gọi mất 1–3 phút. Xe cứu thương / cảnh sát thường đến trong 5–10 phút (ở thành phố). Vùng nông thôn có thể lâu hơn.',
  fees: [
    '119 và 110 KHÔNG có phí gọi.',
    'Xe cứu thương 救急車: hiện đang miễn phí trên cả nước theo chính sách của 総務省消防庁. Một số tỉnh đã thí điểm thu phí cho trường hợp gọi 救急車 không thực sự cấp cứu — kiểm tra với tỉnh / thành phố nơi mình sống.',
    'Sau khi đến viện: chi phí khám / nhập viện vẫn áp dụng như khám thường (30% nếu có bảo hiểm).',
  ],
  documentsChecklist: [
    { label: 'Điện thoại (gọi được)', required: true, note: 'Sạc pin tối thiểu, biết vị trí điện thoại trong nhà.' },
    { label: '在留カード', required: true, note: 'Xe cứu thương / cảnh sát hỏi danh tính khi đến.' },
    { label: '保険証 / マイナンバーカード / 資格確認書', required: true, note: 'Bất kỳ thẻ nào chứng minh tư cách bảo hiểm hợp lệ. Cần khi nhập viện. Để gần cửa ra để dễ mang theo.' },
    { label: 'Tiền mặt 1–3 vạn', required: false, note: 'Phòng khi viện ban đêm không nhận thẻ.' },
    { label: 'お薬手帳', required: false, note: 'Quan trọng nếu người bệnh có bệnh mạn tính / đang dùng nhiều thuốc.' },
  ],
  commonMistakes: [
    'Hoảng quá quên nói địa chỉ → tổng đài không thể điều xe đến.',
    'Cúp máy quá sớm → tổng đài chưa kịp xác nhận hoặc hỏi thêm.',
    'Gọi 110 (cảnh sát) cho tai nạn y tế → mất thời gian, cảnh sát phải chuyển 119.',
    'Không nói mình không giỏi tiếng Nhật → tổng đài nói nhanh, không hiểu được.',
    'Cử người ra đầu ngõ chỉ đường → quên, làm xe cứu thương khó tìm. Nên cử nếu có ≥2 người ở hiện trường.',
    'Tự lái xe đưa người bệnh đến viện thay vì gọi 119 → không có sơ cứu trên đường, không biết viện nào nhận, có thể trễ hơn.',
  ],
  faq: [
    {
      question: 'Tôi không biết địa chỉ chính xác — phải làm sao?',
      answer:
        'Mở Google Maps, xem địa chỉ hiện tại. Hoặc đọc trên 在留カード. Nếu ở ngoài đường, mô tả mốc gần (tên ga, cửa hàng tiện lợi, biển hiệu lớn). Tổng đài quen với người không biết địa chỉ — họ sẽ hỏi từng bước. Đừng cúp máy.',
    },
    {
      question: 'Tổng đài có hiểu tiếng Việt / tiếng Anh không?',
      answer:
        'Tổng đài 119/110 chính là tiếng Nhật. Nhưng nhiều khu vực có dịch vụ thông dịch 3 bên (三者通話) — tổng đài kết nối thông dịch viên trong vài phút. Nói "ベトナム語の通訳をお願いします" hoặc "English please". Trong khi chờ, dùng app dịch trên điện thoại.',
    },
    {
      question: 'Tôi nên gọi 119 hay #7119?',
      answer:
        'Có dấu hiệu nguy hiểm tính mạng (mất ý thức, khó thở dữ dội, đau ngực dữ dội, chảy máu nhiều) → 119 ngay, không gọi #7119. Phân vân triệu chứng có nghiêm trọng không → có thể gọi #7119 ở khu vực có hỗ trợ để tư vấn. KHÔNG phải tỉnh nào cũng có #7119 — nếu gọi không được, gọi thẳng 119.',
    },
    {
      question: 'Tôi gọi 110 báo bị trộm — họ sẽ làm gì?',
      answer:
        'Cảnh sát đến hiện trường, ghi 遺失届 / 盗難届 (báo mất / báo trộm), cấp 受理番号 (mã biên nhận). Mã này dùng cho thủ tục bảo hiểm, xin cấp lại thẻ cư trú, khóa thẻ ngân hàng. Đừng dọn dẹp / di chuyển đồ trước khi cảnh sát đến.',
    },
    {
      question: 'Trẻ con ở nhà một mình có thể gọi 119/110 không?',
      answer:
        'Có. Dạy trẻ từ trước: gọi 119 nói "助けて" (giúp) hoặc "ママが倒れた" (mẹ ngã). Tổng đài sẽ hỏi rõ. Dán giấy ghi địa chỉ + tên người lớn cạnh điện thoại nhà.',
    },
  ],
  counterPhrases: [
    {
      jp: '救急車をお願いします。',
      romaji: 'Kyuukyuusha o onegai shimasu.',
      vn: 'Tôi cần xe cấp cứu.',
      note: 'Câu đầu tiên khi gọi 119 cần xe cấp cứu. Nói rõ và ngắn.',
    },
    {
      jp: '火事です。',
      romaji: 'Kaji desu.',
      vn: 'Có cháy.',
      note: 'Dùng khi gọi 119 vì hỏa hoạn.',
    },
    {
      jp: '事故です。',
      romaji: 'Jiko desu.',
      vn: 'Có tai nạn.',
      note: 'Dùng khi có tai nạn giao thông hoặc tai nạn khác.',
    },
    {
      jp: '住所は〇〇です。',
      romaji: 'Juusho wa marumaru desu.',
      vn: 'Địa chỉ là ...',
      note: 'Thay 〇〇 bằng địa chỉ hiện tại.',
    },
    {
      jp: 'けが人がいます。',
      romaji: 'Keganin ga imasu.',
      vn: 'Có người bị thương.',
      note: 'Nói khi có người bị thương.',
    },
    {
      jp: '意識がありません。',
      romaji: 'Ishiki ga arimasen.',
      vn: 'Người đó không còn ý thức.',
      note: 'Dùng khi người bị nạn bất tỉnh hoặc không phản ứng.',
    },
    {
      jp: '警察をお願いします。',
      romaji: 'Keisatsu o onegai shimasu.',
      vn: 'Tôi cần cảnh sát.',
      note: 'Câu đầu tiên khi gọi 110.',
    },
    {
      jp: '日本語があまり話せません。',
      romaji: 'Nihongo ga amari hanasemasen.',
      vn: 'Tôi không nói tiếng Nhật tốt.',
      note: 'Nói sớm để tổng đài biết bạn cần nói chậm/hỗ trợ.',
    },
    {
      jp: 'ベトナム語の通訳をお願いします。',
      romaji: 'Betonamu-go no tsuuyaku o onegai shimasu.',
      vn: 'Cho tôi phiên dịch tiếng Việt.',
      note: 'Dùng khi cần hỗ trợ tiếng Việt. Một số khu có dịch vụ thông dịch 3 bên — không phải toàn quốc.',
    },
  ],
  officialLinks: [
    { label: '総務省消防庁 (FDMA) — 119', url: 'https://www.fdma.go.jp/' },
    { label: '警察庁 (NPA) — 110', url: 'https://www.npa.go.jp/' },
    { label: '総務省消防庁 (FDMA) — #7119 救急安心センター事業', url: 'https://www.fdma.go.jp/mission/enrichment/appropriate/appropriate007.html' },
    { label: '警察庁 — 警察相談専用電話 #9110', url: 'https://www.npa.go.jp/bureau/soumu/soudan/soudanmadoguti.pdf' },
    { label: '茨城県 — 救急搬送における選定療養費の徴収について', url: 'https://www.pref.ibaraki.jp/hokenfukushi/iryo/iryo/isei/sentei_ryoyohi.html' },
  ],
  steps: [
    {
      step: 1,
      title: 'Xác định: cấp cứu y tế / cháy hay cảnh sát?',
      description:
        'Trong vài giây đầu, quyết định gọi số nào:\n\n• 119 — cấp cứu y tế (bệnh, ngất, khó thở, chấn thương) HOẶC cứu hỏa (cháy, khói).\n• 110 — cảnh sát (tai nạn giao thông không có người thương, trộm cướp, hành hung, bạo lực gia đình, bị đe dọa).\n\nNếu vừa cần y tế vừa cần cảnh sát (vd: tai nạn xe có người bị thương) → gọi 119 trước. Tổng đài 119 sẽ liên hệ 110 nếu cần.',
      documents: [],
      tip: 'Phân vân giữa cấp cứu và đi khám thường → đọc lại Step 1 của guide clinic-hospital-visit-guide. Nếu vẫn phân vân và có dấu hiệu nguy hiểm → gọi 119, không cần ngại.',
    },
    {
      step: 2,
      title: 'Bấm số và nói câu đầu tiên rõ ràng',
      description:
        'Bấm 119 hoặc 110 (không cần đầu số / mã vùng).\n\nKhi tổng đài nhấc máy, nói câu đầu tiên thật ngắn và rõ:\n\n• "救急車をお願いします" (làm ơn gọi xe cứu thương)\n• "火事です" (có cháy)\n• "警察をお願いします" (làm ơn gọi cảnh sát)\n• "事故です" (có tai nạn)\n\nNgay sau đó, tổng đài sẽ hỏi địa chỉ. Đừng đợi họ hỏi mới nói — nói luôn nếu nhớ.',
      documents: [],
      tip: 'Bật loa ngoài (スピーカーフォン) nếu có thể — bạn sẽ rảnh tay để mở Google Maps xem địa chỉ hoặc giữ người bệnh.',
    },
    {
      step: 3,
      title: 'Nói địa chỉ và mô tả tình huống',
      description:
        'Tổng đài hỏi 3 việc theo thứ tự:\n\n1. **住所はどこですか?** (Địa chỉ ở đâu?) — Nói số nhà, tên tòa, tầng, phòng. Nếu ngoài đường, mô tả mốc gần (ga / コンビニ / biển hiệu).\n\n2. **何がありましたか?** (Chuyện gì xảy ra?) — Nói ngắn: "父が倒れた" (bố ngã), "車にぶつかった" (đụng xe), "煙が出ている" (có khói).\n\n3. **けが人は何人ですか?** (Có bao nhiêu người bị thương?) — Trả lời số: "1人" (1 người) / "2人" (2 người).\n\nNếu không hiểu, nói "もう一度ゆっくりお願いします" (xin nhắc lại chậm). Tổng đài đã trải qua nhiều người không nói rõ tiếng Nhật.',
      documents: [],
      tip: 'Nếu không nhớ địa chỉ tiếng Nhật, mở 在留カード mặt sau — địa chỉ in sẵn. Đọc theo 漢字 cũng được.',
    },
    {
      step: 4,
      title: 'Trả lời các câu hỏi tiếp theo và KHÔNG cúp máy',
      description:
        'Tổng đài tiếp tục hỏi để chuẩn bị xe cứu thương / cảnh sát. Có thể hỏi:\n\n• Tuổi và giới tính người bệnh\n• Triệu chứng cụ thể (sốt, đau ở đâu, từ khi nào)\n• Người bệnh có ý thức không, có thở không\n• Bệnh nền / dị ứng / thuốc đang dùng\n• Tên người gọi và số điện thoại\n\nNếu tiếng Nhật yếu, nói "日本語があまり話せません. ベトナム語の通訳をお願いします" — nhiều khu vực có thông dịch 3 bên.\n\nKHÔNG cúp máy cho đến khi tổng đài nói "切ってください" hoặc "わかりました、すぐ行きます".',
      documents: [],
      tip: 'Nếu phải đặt điện thoại xuống để sơ cứu, bật loa ngoài và để gần. Đừng cúp máy.',
    },
    {
      step: 5,
      title: 'Chuẩn bị mở cửa và đón xe cứu thương / cảnh sát',
      description:
        'Trong khi đợi (5–10 phút):\n\n1. Mở cửa chính / cửa tòa nhà — không khóa.\n2. Bật đèn hành lang.\n3. Nếu có >1 người, cử 1 người ra đầu ngõ vẫy xe cứu thương — đặc biệt khu chung cư phức tạp.\n4. Chuẩn bị: 在留カード, 保険証 (hoặc マイナンバーカード), お薬手帳, ví / điện thoại / sạc.\n5. Nếu là cấp cứu: viết / in nhanh danh sách thuốc người bệnh đang uống (nếu kịp).\n\nKhi xe đến, nhân viên y tế (救急隊員) hỏi nhanh tình trạng → đưa người bệnh lên xe → bạn theo cùng nếu là người nhà.',
      documents: [
        '在留カード',
        '保険証 / マイナンバーカード / 資格確認書',
        'お薬手帳 (nếu có)',
        'Tiền mặt + thẻ',
        'Điện thoại + sạc',
      ],
      tip: 'Nếu sống một mình, nhờ hàng xóm hoặc 大家 (chủ nhà) hỗ trợ — gọi LINE / điện thoại trước khi xe đến. Khóa cửa nếu có thời gian, hoặc nhờ hàng xóm trông giúp.',
    },
  ],
};

export default emergencyCallsJapan;
