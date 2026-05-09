import type { AdminGuide } from '../../../../types/content';

const homeInternetWifiContracts: AdminGuide = {
  id: 'home-internet-wifi-contracts',
  category: 'daily-law',
  lastVerified: '2026-05-09',
  priority: 'normal',
  title: 'Internet, Wi-Fi nhà ở Nhật',
  titleJp: '日本で自宅のインターネットを契約するとき',
  icon: 'wifi-outline',
  color: '#16A085',
  description:
    'Có 3 lựa chọn chính cho mạng nhà ở Nhật: 光回線 (hikari fiber — nhanh nhất, cần lắp dây, hợp đồng dài), ホームルーター (home router — cắm là dùng, không cần công trình), ポケット Wi-Fi (mang theo được, dùng SIM mạng di động). Trước khi ký, đọc kỹ 解約金 (phí hủy sớm), 契約期間 (thời hạn hợp đồng), 工事費 (phí lắp đặt). Nhà thuê có thể cần xin phép chủ nhà cho 工事.',
  searchKeywords: [
    'internet',
    'wifi',
    'wi-fi',
    'mạng nhà',
    'lắp mạng',
    'không có mạng',
    'internet bị cắt',
    'mạng chậm',
    'hikari',
    'pocket wifi',
    'home router',
    'mạng di động',
    '光回線',
    'ポケットWi-Fi',
    'ホームルーター',
    '解約金',
    '工事費',
    '契約期間',
    '更新月',
    'WiMAX',
    'SoftBank',
    'NTT東日本',
    'auひかり',
    'cooling-off',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      '通信契約 do 総務省 (MIC) quản lý chung. 電気通信事業法 quy định cách công ty viễn thông ký hợp đồng + khi nào cooling-off được áp dụng. 国民生活センター tiếp nhận khiếu nại consumer. Phí cụ thể + 解約金 thay đổi theo công ty + thời điểm — kiểm tra trang công ty trước khi ký.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Hợp đồng có 解約金 cao bất thường (>20,000円) hoặc khoá thời hạn dài (>3 năm) — đọc kỹ hoặc hỏi 国民生活センター trước khi ký.',
      'Bị nhân viên 訪問販売 (bán tận nhà) ép ký — luật cho phép cooling-off 8 ngày theo 特定商取引法 cho 訪問販売.',
      'Có sai lệch lớn giữa lời hứa nhân viên và hợp đồng giấy — giữ ghi âm + giấy tờ, hỏi 国民生活センター hotline 188.',
    ],
  },
  quickAction: {
    deadline:
      'Đăng ký TRƯỚC 2–4 tuần khi cần 工事 (lắp dây 光回線). ホームルーター / ポケット Wi-Fi nhanh hơn — đặt online thường đến trong 3–7 ngày.',
    office:
      'Online: trang công ty (vd NTT 東日本/西日本, SoftBank, au, 楽天モバイル, ドコモ, UQ WiMAX). Cửa hàng điện máy lớn (Yamada, BIC, Yodobashi) thường có quầy tư vấn. 訪問販売 — nên thận trọng, có thể bị áp lực ký.',
    doNow: [
      'Xác định nhu cầu: lượng dùng (xem video / chơi game / chỉ web), số người dùng, tốc độ cần. Game / 4K → 光回線. Bình thường → ホームルーター đủ.',
      'Hỏi chủ nhà / 大家 / 管理会社 trước nếu lắp 光回線 cần 工事 (khoan tường / kéo dây). Một số chung cư đã có sẵn — không cần 工事.',
      'So sánh giá trên 価格.com / kakaku.com hoặc trang chính thức công ty. Chú ý: 月額料金 (phí tháng) + 工事費 + 解約金 + 契約期間.',
      'Đăng ký online hoặc qua điện thoại. Đọc kỹ hợp đồng trước khi nhấn 同意.',
      'Lên lịch 工事 nếu cần. Phải có người ở nhà 1–3 giờ ngày 工事.',
    ],
    bring: [
      'Địa chỉ nhà chính xác (tên tòa, số phòng)',
      'Tên đầy đủ + ngày sinh',
      'Số điện thoại',
      'Email',
      'Phương thức thanh toán: thẻ tín dụng / 口座振替',
      '在留カード (một số công ty hỏi để xác minh)',
      'Đồng ý của chủ nhà nếu cần 工事',
    ],
    ifLate:
      'Cần internet gấp trước khi 光回線 đến: đăng ký ホームルーター hoặc ポケット Wi-Fi — đến trong 3–7 ngày, cắm là dùng. Có thể dùng tạm cho đến khi 光回線 lắp xong, sau đó hủy ホームルーター (chú ý 解約金 nếu có).',
    officialSourceLabels: ['総務省 (MIC)', '国民生活センター'],
  },
  whoIsThisFor: [
    'Người Việt vừa chuyển đến nhà mới ở Nhật — chưa có mạng.',
    'Người đang dùng pocket Wi-Fi muốn nâng cấp lên 光回線 ổn định hơn.',
    'Người sắp hết hợp đồng cũ và cân nhắc đổi công ty rẻ hơn.',
    'Gia đình / nhiều người dùng — cần kiểm tra tốc độ + ổn định cho video call / học online.',
  ],
  whenToDo: [
    'Trước khi chuyển vào nhà mới 2–4 tuần (cho 光回線 工事).',
    'Khi sắp hết khoá thời hạn (契約期間) hợp đồng cũ — kiểm tra ngày 更新月 để hủy không bị 解約金.',
    'Khi tốc độ chậm bất thường — gọi công ty kiểm tra hoặc cân nhắc đổi.',
    'Khi chuyển nhà — quyết định 引っ越し手続き (chuyển đổi địa chỉ) hay hủy + ký mới.',
  ],
  whereToDo: [
    'Online: trang công ty viễn thông.',
    'Cửa hàng điện máy: Yamada / BIC / Yodobashi — thường có quầy tư vấn miễn phí, có khuyến mãi điểm thưởng.',
    'Quầy 携帯ショップ trong shopping mall: docomo / au / SoftBank shop.',
    'KHÔNG khuyến cáo: 訪問販売 (người gõ cửa nhà bán) — dễ bị áp lực + thường đắt hơn.',
  ],
  estimatedTime:
    'Đăng ký online: 15–30 phút. 光回線 工事: 2–4 tuần chờ + 1–3 giờ ngày lắp. ホームルーター: 3–7 ngày đến nơi, 5 phút setup. ポケット Wi-Fi: 3–7 ngày đến nơi, 1 phút bật.',
  fees: [
    'Phí tháng 月額料金: tùy gói. 光回線 thường khoảng 4,000–6,000円/tháng. ホームルーター thường 4,000–5,000円. ポケット Wi-Fi thường 3,000–5,000円.',
    'Phí lắp đặt 工事費: 光回線 thường 15,000–40,000円 (có thể được giảm / miễn nếu khuyến mãi). ホームルーター / ポケット Wi-Fi: thường 0円 hoặc phí ship nhỏ.',
    '解約金 (phí hủy sớm): nhiều công ty có khoá 2 năm với 解約金 1,000–10,000円 nếu hủy giữa kỳ. Một số không khoá. Đọc kỹ.',
    '更新月 (tháng gia hạn): thường có 2–3 tháng "free" để hủy không phí — sau đó tự động gia hạn 2 năm tiếp.',
    'Phí thay đổi nhanh — kiểm tra trang công ty hoặc 価格.com trước khi ký.',
  ],
  documentsChecklist: [
    { label: 'Địa chỉ nhà', required: true, note: 'Cần để kiểm tra 光回線 có đến khu này không.' },
    { label: 'Tên đầy đủ + ngày sinh', required: true, note: 'Theo hộ chiếu / 在留カード.' },
    { label: 'Số điện thoại + email', required: true, note: 'Để công ty liên lạc về 工事 + hóa đơn điện tử.' },
    { label: 'Phương thức thanh toán', required: true, note: 'Thẻ tín dụng phổ biến nhất, 口座振替 cũng OK.' },
    { label: '在留カード', required: false, note: 'Một số công ty hỏi xác minh danh tính.' },
    { label: 'Đồng ý chủ nhà cho 工事', required: false, note: 'BẮT BUỘC nếu lắp 光回線 cần khoan tường / kéo dây mới ở nhà thuê.' },
  ],
  commonMistakes: [
    'Ký hợp đồng dài (2–3 năm) mà không hỏi 解約金 → bị mất tiền khi chuyển nhà sớm.',
    'Không hỏi có cần 工事 không → đến ngày dọn nhà không có mạng vài tuần.',
    'Nhầm pocket Wi-Fi với internet cố định → tốc độ chậm + giới hạn data, không xem 4K được.',
    'Không kiểm tra với chủ nhà trước khi đặt lịch 工事 光回線 → chủ nhà không cho phép, mất phí hủy.',
    'Bị 訪問販売 ép ký tại cửa nhà → không có thời gian so sánh, thường đắt hơn online 1.5–2x.',
    'Quên 更新月 → tự động gia hạn 2 năm, sau đó muốn hủy lại bị 解約金.',
    'Không đọc khuyến mãi cẩn thận → "phí 0円 năm đầu" nhưng đắt năm 2–3, hoặc cần đăng ký dịch vụ kèm.',
  ],
  faq: [
    {
      question: 'Tôi nên chọn 光回線, ホームルーター, hay ポケット Wi-Fi?',
      answer:
        '**光回線**: nhanh nhất (1–10 Gbps), ổn định, dùng cho game / video 4K / nhiều người. Cần 工事 (2–4 tuần chờ) + hợp đồng dài. Phù hợp ở nhà cố định lâu.\n\n**ホームルーター**: cắm là dùng (không 工事). Tốc độ tốt cho web / video thường (100–500 Mbps thực tế). Phù hợp ở nhà thuê ngắn hạn / không muốn 工事.\n\n**ポケット Wi-Fi**: mang theo được (dùng SIM 4G / 5G). Tốc độ + ổn định kém nhất — phù hợp khi đi lại nhiều / không cố định. Có giới hạn data hàng tháng.',
    },
    {
      question: 'Hợp đồng nói "解約金 0円 nếu hủy trong 更新月" — 更新月 là gì?',
      answer:
        '更新月 là tháng tự động gia hạn hợp đồng. Vd hợp đồng 2 năm bắt đầu tháng 4/2026 → 更新月 thường tháng 4/2028 (có thể là 1–3 tháng cụ thể tùy công ty). Trong 更新月: hủy = 0円. Ngoài 更新月 = bị 解約金. Sau 更新月 không hủy = tự động gia hạn 2 năm tiếp. **Đặt nhắc nhở trên lịch điện thoại** cho 更新月 ngay khi ký hợp đồng.',
    },
    {
      question: 'Nhà thuê — chủ nhà có cho lắp 光回線 không?',
      answer:
        'Tùy chủ nhà + tùy tòa. Một số chung cư đã có sẵn 光回線 — chỉ cần ký hợp đồng, không cần 工事. Một số yêu cầu xin phép trước. Một số không cho lắp mới (vd nhà cũ, nhà gỗ). Hỏi chủ nhà / 不動産 / 管理会社 trước. Nếu không cho → dùng ホームルーター / ポケット Wi-Fi không cần 工事.',
    },
    {
      question: 'Tôi đã ký với 訪問販売 nhưng giờ tiếc — có hủy được không?',
      answer:
        'Có thể có. Theo 特定商取引法, hợp đồng 訪問販売 (bán tận nhà) thường có quyền cooling-off — hủy không lý do trong 8 ngày kể từ khi nhận giấy hợp đồng. Gửi giấy 解約通知書 đảm bảo (内容証明郵便) để chứng minh ngày gửi. Không chắc cách làm → hỏi 国民生活センター hotline 188.',
    },
    {
      question: 'Tôi chuyển nhà — phải làm gì với hợp đồng 光回線 hiện tại?',
      answer:
        'Có 2 lựa chọn: (1) **引っ越し手続き** (chuyển đổi địa chỉ) — giữ hợp đồng, công ty lắp ở nhà mới. Có thể có 工事費 lần 2. Tránh được 解約金. (2) **Hủy + ký mới** — nếu công ty mới có khuyến mãi tốt hơn, hoặc nhà mới đã có 光回線 sẵn của công ty khác. Tính phí: 解約金 cũ + lợi ích từ khuyến mãi mới.',
    },
  ],
  counterPhrases: [
    {
      jp: 'インターネットを契約したいです。',
      romaji: 'Intaanetto o keiyaku shitai desu.',
      vn: 'Tôi muốn đăng ký internet.',
      note: 'Câu mở đầu khi gọi công ty hoặc đến cửa hàng.',
    },
    {
      jp: '工事は必要ですか。',
      romaji: 'Kouji wa hitsuyou desu ka.',
      vn: 'Có cần lắp đặt (công trình) không?',
      note: 'Quan trọng — 工事 mất 2–4 tuần và có thể cần phép chủ nhà.',
    },
    {
      jp: '解約金はいくらですか。',
      romaji: 'Kaiyakukin wa ikura desu ka.',
      vn: 'Phí hủy hợp đồng là bao nhiêu?',
      note: 'PHẢI hỏi trước khi ký — tránh bất ngờ khi chuyển nhà.',
    },
    {
      jp: '契約期間は何年ですか。',
      romaji: 'Keiyaku kikan wa nan-nen desu ka.',
      vn: 'Thời hạn hợp đồng là mấy năm?',
      note: 'Thường 2 năm. Hỏi luôn 更新月 ở tháng nào.',
    },
    {
      jp: '引っ越し先でも使えますか。',
      romaji: 'Hikkoshisaki demo tsukaemasu ka.',
      vn: 'Ở nhà mới (sau chuyển) cũng dùng được không?',
      note: 'Hỏi về 引っ越し手続き — chuyển đổi địa chỉ.',
    },
    {
      jp: 'いつから使えますか。',
      romaji: 'Itsu kara tsukaemasu ka.',
      vn: 'Khi nào tôi có thể bắt đầu dùng?',
      note: 'Hỏi rõ ngày 工事 + ngày kích hoạt.',
    },
    {
      jp: '今すぐ契約できません。家で確認してから決めます。',
      romaji: 'Ima sugu keiyaku dekimasen. Ie de kakunin shite kara kimemasu.',
      vn: 'Tôi không ký ngay được. Tôi sẽ kiểm tra ở nhà rồi quyết định.',
      note: 'Dùng khi bị 訪問販売 / nhân viên ép ký tại chỗ.',
    },
    {
      jp: 'ベトナム語の説明はありますか。',
      romaji: 'Betonamu-go no setsumei wa arimasu ka.',
      vn: 'Có tài liệu giải thích tiếng Việt không?',
      note: 'Một số công ty lớn có — hỏi thử.',
    },
  ],
  officialLinks: [
    { label: '総務省 (MIC)', url: 'https://www.soumu.go.jp/' },
    { label: '国民生活センター', url: 'https://www.kokusen.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Xác định nhu cầu + loại mạng',
      description:
        'Hỏi mình:\n\n• **Tốc độ cần?** Game online / video 4K / livestream → 光回線. Web / video HD / chat → ホームルーター đủ. Đi lại nhiều, không cố định → ポケット Wi-Fi.\n• **Bao nhiêu người dùng?** 1–2 người: ホームルーター OK. 3+ người + nhiều thiết bị: 光回線.\n• **Ở bao lâu?** <1 năm: tránh 光回線 (hợp đồng 2 năm + 工事費). 2+ năm: 光回線 đáng đầu tư.\n• **Chủ nhà cho 工事 không?** Nếu không → dùng ホームルーター / ポケット Wi-Fi.',
      documents: [],
      tip: 'Hỏi đồng nghiệp / bạn cùng khu — họ biết công ty nào tín hiệu tốt ở khu này.',
    },
    {
      step: 2,
      title: 'So sánh giá + đọc kỹ hợp đồng',
      description:
        'So sánh trên:\n\n• **価格.com / kakaku.com**: tổng hợp khuyến mãi, dễ đọc.\n• **Trang chính thức công ty**: NTT 東日本/西日本, SoftBank 光, au ひかり, 楽天ひかり, OCN, ドコモ光, UQ WiMAX (cho ホームルーター), ワイモバイル, etc.\n• **Cửa hàng điện máy** (Yamada / BIC / Yodobashi): có khuyến mãi điểm thưởng riêng.\n\nKhi so sánh, chú ý 5 con số:\n1. **月額料金** (phí tháng)\n2. **工事費** (phí lắp đặt)\n3. **契約期間** (thời hạn — thường 2 năm)\n4. **解約金** (phí hủy sớm)\n5. **キャッシュバック / 割引** (giảm giá / cashback ban đầu — thường 1 lần, không kéo dài)',
      documents: [],
      tip: 'Khuyến mãi "0円 năm đầu" thường đẩy giá năm 2–3 lên cao. Tính tổng 2 năm để biết thật.',
    },
    {
      step: 3,
      title: 'Đăng ký + đặt lịch 工事 (nếu 光回線)',
      description:
        '**Online**: vào trang công ty → form 申し込み. Điền:\n• Địa chỉ nhà (kiểm tra trước khu có 光回線 đến không)\n• Tên + ngày sinh + số điện thoại + email\n• Loại nhà (一戸建て / マンション)\n• Phương thức thanh toán\n• Mã khuyến mãi (nếu có)\n\n**Đợi xác nhận** qua email / điện thoại. Công ty hẹn ngày 工事 (thường 2–4 tuần sau).\n\n**ホームルーター / ポケット Wi-Fi**: KHÔNG cần 工事. Đăng ký xong 3–7 ngày đến nhà.',
      documents: [
        'Địa chỉ + tên + ngày sinh',
        'Số điện thoại + email',
        'Phương thức thanh toán',
      ],
      tip: 'Trước khi nhấn 同意 (đồng ý) — copy + paste hợp đồng vào Google Translate đọc. Đặc biệt phần 契約期間, 解約金, 自動更新.',
    },
    {
      step: 4,
      title: 'Ngày 工事 — có người ở nhà',
      description:
        'Chỉ áp dụng cho 光回線 cần 工事:\n\n1. **Phải có người ≥ 18 tuổi ở nhà** trong 1–3 giờ.\n2. Nhân viên đến → xác minh tên / địa chỉ → kéo dây + lắp router.\n3. Có thể cần khoan tường nhỏ — chủ nhà phải đồng ý trước.\n4. Sau lắp xong, nhân viên hướng dẫn setup Wi-Fi password.\n5. Test xong → ký giấy 工事完了.\n\n**Lưu mã / mật khẩu Wi-Fi** ở chỗ an toàn (không phải dán lên router public).\n\n**ホームルーター**: chỉ cắm điện + chờ đèn xanh → kết nối Wi-Fi.\n\n**ポケット Wi-Fi**: bật → kết nối Wi-Fi.',
      documents: [
        '在留カード (nếu nhân viên xác minh)',
        'Đồng ý chủ nhà cho 工事 (giấy hoặc tin nhắn)',
      ],
      tip: 'Test tốc độ ngay (vd speedtest.net) — nếu chậm bất thường, gọi công ty trong vòng 1 tuần để claim. Sau 1 tuần khó được hỗ trợ.',
    },
    {
      step: 5,
      title: 'Quản lý hợp đồng — 更新月 + chuyển nhà',
      description:
        '**Đặt nhắc nhở 更新月** ngay khi ký:\n• Hợp đồng 2 năm bắt đầu tháng X → 更新月 ở 24 tháng sau.\n• Trong 更新月 (1–3 tháng): hủy = 0円, hoặc đổi gói rẻ hơn.\n• Sau 更新月 không hủy = tự động gia hạn 2 năm tiếp.\n\n**Khi chuyển nhà**:\n• Lựa chọn 1: 引っ越し手続き (chuyển địa chỉ) — giữ hợp đồng. Có 工事費 lần 2 nhưng tránh 解約金.\n• Lựa chọn 2: Hủy + ký mới ở nhà mới. Tính: 解約金 cũ vs khuyến mãi mới.\n\n**Khi gặp sự cố**:\n• Tốc độ chậm: gọi công ty kiểm tra (có khi do router cũ — yêu cầu thay miễn phí).\n• Hóa đơn lạ: gọi customer service ngay.\n• Bị ép ký kèm dịch vụ không cần: hỏi 国民生活センター 188.',
      documents: [],
      tip: 'Đặt 4 nhắc nhở: 1 năm trước 更新月 (cảnh báo sớm), 1 tháng trước, ngày bắt đầu 更新月, ngày cuối 更新月. Nhỡ 更新月 = thêm 2 năm khoá.',
    },
  ],
};

export default homeInternetWifiContracts;
