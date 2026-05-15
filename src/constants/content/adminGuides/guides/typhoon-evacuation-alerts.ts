import type { AdminGuide } from '../../../../types/content';

const typhoonEvacuationAlerts: AdminGuide = {
  id: 'typhoon-evacuation-alerts',
  category: 'daily-law',
  lastVerified: '2026-05-09',
  priority: 'normal',
  title: 'Hướng dẫn khi bão / 警戒レベル ở Nhật',
  titleJp: '日本で台風・警戒レベルが出たとき',
  icon: 'rainy-outline',
  color: '#2980B9',
  description:
    'Bão (台風) và mưa lớn (大雨) ở Nhật khác động đất ở chỗ có vài ngày để chuẩn bị. Hệ thống 警戒レベル 1–5 do 内閣府 thiết lập từ 5/2019, sửa 5/2021 (đổi 避難勧告 → 避難指示): cấp 3 = chuẩn bị di tản, cấp 4 = di tản NGAY, cấp 5 = nguy hiểm tính mạng đang xảy ra, có thể đã quá muộn ra ngoài an toàn — ở chỗ cao nhất trong nhà. Người Việt thường xem TV nhưng không hiểu — guide này giải nghĩa từng cấp.',
  searchKeywords: [
    'bão',
    'mưa lớn',
    'lũ',
    'lụt',
    'ngập',
    '台風',
    'di tản',
    '警戒レベル',
    '避難指示',
    '避難勧告',
    '大雨警報',
    'cảnh báo bão',
    'cảnh báo cấp 3',
    'cảnh báo cấp 4',
    'cảnh báo cấp 5',
    '避難所',
    'NHK',
    'Yahoo phòng thiên tai',
    '防災バッグ',
    'vali phòng tai',
    'trước bão',
    'sau bão',
    '罹災証明書',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      'Hệ thống 警戒レベル 1–5 do 内閣府 thống nhất quốc gia từ 5/2019 (sửa 2021 đổi 避難勧告 → 避難指示). 気象庁 phát 警報 / 注意報. 避難指示 (lệnh di tản) do 市区町村 phát theo tình hình thực tế. 避難所 do 市区町村 chỉ định — vị trí khác nhau theo khu.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Sống ở khu có lịch sử lũ lụt / lở đất — kiểm tra hazard map kỹ trước mùa bão (tham khảo guide hazard-map-flood-tsunami-volcano).',
      'Người già / người tàn tật / phụ nữ có thai — di tản sớm hơn警戒レベル 3, hỏi 市役所 về danh sách ưu tiên 要支援者.',
      'Công ty bắt đi làm khi 警戒レベル 4–5 — người sử dụng lao động có 安全配慮義務 (労働契約法 第5条), không được ép qua vùng có 避難指示. Hỏi 労働基準監督署 nếu cần.',
    ],
  },
  quickAction: {
    deadline:
      'Cấp 3: 1–2 ngày trước khi bão tới — chuẩn bị. Cấp 4: ngay lập tức di tản. Cấp 5: đã quá muộn ra ngoài, lên tầng cao nhất.',
    office:
      '気象庁 + 市区町村 phát thông báo. Theo dõi qua: NHK World, Yahoo!防災速報, Safety tips. 避難所 do 市役所 chỉ định — kiểm tra trước trên 防災マップ.',
    doNow: [
      'Theo dõi 警戒レベル trong app NHK / Yahoo!防災速報. Cấp 3 → đóng gói 防災バッグ + giấy tờ. Cấp 4 → đi NGAY, không đợi cấp 5.',
      'Cố định / di chuyển đồ ngoài ban công vào trong — chậu cây, xe đạp, đồ giặt. Bão thổi bay đồ → đập kính.',
      'Đóng kín cửa sổ + dán băng dính chéo X lên kính (giảm văng kính nếu vỡ). Hạ rèm cuốn ngoài (シャッター) nếu có.',
      'Đầy nước vào chai + bồn tắm — nước máy có thể tắt 1–3 ngày sau bão lớn.',
      'Sạc đầy điện thoại + pin dự phòng. Tải sẵn bản đồ offline + screenshot 防災マップ.',
    ],
    bring: [
      '防災バッグ — như guide earthquake-preparedness-japan',
      '在留カード + hộ chiếu',
      '保険証 / マイナンバーカード / 資格確認書',
      'Tiền mặt 2–3 vạn',
      'Giày chống nước hoặc ủng — đường ngập sau bão',
      'Áo mưa + dù chắc',
      'Đèn pin + pin dự phòng',
      'Nước + đồ ăn 3 ngày',
    ],
    ifLate:
      'Đã sang cấp 5 và chưa di tản: KHÔNG ra ngoài (gió + nước cuốn nguy hiểm). Lên tầng cao nhất trong nhà, xa cửa kính / cửa sổ. Giữ điện thoại + nước + đồ ăn cạnh người. Gọi 119 nếu nguy cấp.',
    officialSourceLabels: [
      '気象庁 (JMA)',
      '内閣府（防災担当）— 避難情報に関するガイドライン（警戒レベル）',
      '内閣府（防災担当）— 被災者支援（罹災証明書の交付）',
      '観光庁監修 — 災害時情報提供アプリ「Safety tips」',
      '厚生労働省 — 労働契約法第5条 安全配慮義務',
    ],
  },
  whoIsThisFor: [
    'Người Việt sống ở Nhật chưa quen hệ thống 警戒レベル.',
    'Người sống gần sông / núi / ven biển — vùng có nguy cơ lũ / lở đất / sóng dâng cao.',
    'Gia đình có con nhỏ, người già, người tàn tật — cần di tản sớm hơn.',
    'Người mới sang trong mùa bão (tháng 6 – tháng 10) — phải biết phản ứng nhanh.',
  ],
  whenToDo: [
    'Mùa bão chính: tháng 6 – tháng 10 (đỉnh tháng 8 – tháng 9).',
    'Nghe tin bão lớn / cuồng phong sắp tới khu mình — đọc guide này NGAY.',
    'Khi 警戒レベル 3 phát ra — không đợi cấp 4 mới chuẩn bị.',
    'Sau bão — kiểm tra nhà + 避難所 đóng cửa + trở về an toàn.',
  ],
  whereToDo: [
    '避難所 do 市区町村 chỉ định — kiểm tra trước trên 防災マップ.',
    'Vùng cao trong nhà nếu không kịp di tản — tầng 2 / 3 / 4 trở lên, xa cửa sổ.',
    'KHÔNG đi: dưới cầu, gần sông / kênh, đường có vũng nước (có thể là hố ga mở), khu núi (lở đất).',
  ],
  estimatedTime:
    'Bão thường ảnh hưởng 1 khu trong 12–48 giờ. Cảnh báo cấp 3 phát ra 1–2 ngày trước khi bão tới. Cấp 4 thường 6–12 giờ trước. Cấp 5 = ngay lập tức. Sau bão: dọn dẹp 1–7 ngày.',
  fees: [
    'Theo dõi cảnh báo: miễn phí qua app / NHK.',
    'Ở 避難所: thường miễn phí trong khẩn cấp.',
    '火災保険 cho nhà thuê thường có thêm option 風水害 (thiệt hại do gió / mưa / lũ) — kiểm tra hợp đồng. Một số gói cơ bản KHÔNG bao.',
    'Sửa nhà sau bão: nếu có 風水害 trong 火災保険 — claim được. Không có thì tự trả. Nhà chính chủ → trách nhiệm chủ nhà / công ty quản lý.',
  ],
  documentsChecklist: [
    { label: '防災バッグ', required: true, note: 'Cùng vali phòng động đất. Kiểm tra mỗi mùa bão.' },
    { label: '在留カード + hộ chiếu', required: true, note: 'Mang theo khi di tản — 避難所 có thể hỏi.' },
    { label: '保険証 / マイナンバーカード / 資格確認書', required: true, note: 'Cần khi bị thương đi viện.' },
    { label: 'Tiền mặt 2–3 vạn yên', required: true, note: 'ATM có thể tắt sau bão.' },
    { label: 'Giày chống nước / ủng', required: false, note: 'Đường ngập sau bão lớn — giày thường ướt + bẩn.' },
    { label: 'Áo mưa + dù chắc', required: false, note: 'Dù mỏng vô dụng trong bão. Áo mưa đầy đủ tốt hơn.' },
    { label: 'Pin sạc dự phòng', required: true, note: 'Mất điện vài ngày sau bão lớn — pin dự phòng quan trọng.' },
    { label: 'Bản giấy 防災マップ', required: false, note: 'Mạng có thể hỏng. In sẵn hoặc lưu ảnh.' },
  ],
  commonMistakes: [
    'Đợi đến cấp 5 mới di tản — đã quá muộn. Phải đi ở cấp 4.',
    'Đi xem bão / quay video ngoài đường khi đang bão — gió thổi đồ bay nguy hiểm.',
    'Lái xe qua đường ngập — chỉ 30cm nước có thể cuốn xe. Nắp hố ga mở dưới nước không thấy.',
    'Không kiểm tra hazard map trước → không biết khu mình có nguy cơ lũ / lở đất hay không.',
    'Để đồ trên ban công không cố định → bị gió thổi bay, đập kính nhà mình hoặc nhà hàng xóm.',
    'Đi làm khi cấp 4–5 vì sếp ép — trong tình huống có 避難指示 trong khu của bạn, người sử dụng lao động có 安全配慮義務 (労働契約法 第5条 — nghĩa vụ chăm lo an toàn tính mạng người lao động). Nếu ép qua zone 避難指示 thì vi phạm nghĩa vụ này. Báo sếp trước qua LINE / điện thoại, ghi lại bằng chứng. Tranh chấp sau bão → 労働基準監督署 hoặc luật sư.',
    'Không sạc điện thoại + pin dự phòng → mất điện không liên lạc được.',
  ],
  faq: [
    {
      question: '警戒レベル 1–5 nghĩa là gì?',
      answer:
        'Cấp 1 (chú ý): theo dõi tin tức. Cấp 2 (注意): kiểm tra hành động di tản. Cấp 3 (高齢者等避難): người già / tàn tật / có thai bắt đầu di tản, người khác chuẩn bị. Cấp 4 (避難指示): TẤT CẢ phải di tản NGAY. Cấp 5 (緊急安全確保): nguy hiểm tính mạng, đã quá muộn ra ngoài, ở chỗ cao nhất trong nhà. Đây là hệ thống thống nhất quốc gia từ 5/2019, sửa 2021.',
    },
    {
      question: 'Tôi sống ở chung cư tầng 5 — có cần di tản khi cấp 4 không?',
      answer:
        'Tùy. Chung cư bê-tông cao tầng + không gần sông / núi → có thể "垂直避難" (di tản dọc — lên tầng cao nhất trong nhà thay vì ra 避難所). Nhưng phải kiểm tra: (1) hazard map có ngập tầng 1 không, (2) có bị cô lập 1–3 ngày được không (nước / đồ ăn / điện), (3) thông báo của 市役所 nói gì cụ thể. Nếu phân vân → đi 避難所. Tốt hơn là đi mà không cần.',
    },
    {
      question: 'Sếp bắt tôi đi làm khi 警戒レベル 4 — phải làm sao?',
      answer:
        'Theo 労働契約法 第5条, người sử dụng lao động có 安全配慮義務 — nghĩa vụ chăm lo an toàn tính mạng người lao động. Khi 市役所 phát 警戒レベル 4 / 避難指示 cho khu của bạn, ép nhân viên qua vùng có lệnh di tản thường vi phạm nghĩa vụ này. Liên hệ sếp TRƯỚC (LINE / điện thoại) báo "避難指示が出ています、出社できません" + lưu tin nhắn / email làm bằng chứng. Lưu ý: luật không quy định "quyền từ chối đi làm" rõ ràng — framework là 安全配慮義務 của bên sử dụng lao động. Nếu sếp không đồng ý hoặc trừ lương sau bão, liên hệ 労働基準監督署 hoặc luật sư lao động.',
    },
    {
      question: 'Đường về nhà ngập — đi qua được không?',
      answer:
        'KHÔNG. Chỉ 30cm nước chảy có thể cuốn người lớn. Xe ô-tô chết máy ở 50cm. Nắp hố ga thường mở khi nước dâng — không thấy dưới nước. Vũng nước có thể sâu hơn nhiều so với nhìn. Quay lại 避難所 hoặc đứng chờ ở chỗ cao + gọi 119 nếu mắc kẹt.',
    },
    {
      question: 'Bão đã qua, lúc nào tôi có thể về nhà?',
      answer:
        '避難所 có thông báo khi an toàn về (giải tỏa 警戒レベル). Trước khi về: hỏi nhân viên 避難所 hoặc nghe NHK. Khi về: kiểm tra nhà bên ngoài trước (kính vỡ, dây điện rớt, gas rò) trước khi vào. Nếu có dây điện rớt → tránh xa + báo công ty điện địa phương (東京電力, 関西電力, 中部電力, v.v.). Chụp ảnh thiệt hại trước khi dọn (cần cho 罹災証明書 nếu xin hỗ trợ).',
    },
  ],
  counterPhrases: [
    {
      jp: '避難指示が出ています。',
      romaji: 'Hinan shiji ga dete imasu.',
      vn: 'Đã có lệnh di tản.',
      note: 'Nói với hàng xóm / sếp khi báo tình hình.',
    },
    {
      jp: '避難所に行きます。',
      romaji: 'Hinanjo ni ikimasu.',
      vn: 'Tôi đang đi đến 避難所.',
      note: 'Nói với gia đình / sếp / hàng xóm.',
    },
    {
      jp: '出社できません。避難指示が出ています。',
      romaji: 'Shussha dekimasen. Hinan shiji ga dete imasu.',
      vn: 'Tôi không đi làm được. Đã có lệnh di tản.',
      note: 'Nói với sếp qua LINE / điện thoại. Đây là quyền hợp pháp.',
    },
    {
      jp: '助けてください！',
      romaji: 'Tasukete kudasai!',
      vn: 'Cứu tôi với!',
      note: 'Câu cấp cứu. Nếu mắc kẹt do nước / gió. Hét lớn — không cần lễ phép trong tình huống nguy hiểm.',
    },
    {
      jp: '道が冠水しています。',
      romaji: 'Michi ga kansui shite imasu.',
      vn: 'Đường đang ngập.',
      note: 'Báo tình hình cho nhân viên / cảnh sát.',
    },
    {
      jp: '停電しています。',
      romaji: 'Teiden shite imasu.',
      vn: 'Đang mất điện.',
      note: 'Khi gọi công ty điện hoặc báo 避難所.',
    },
    {
      jp: 'ベトナム語の通訳はいますか。',
      romaji: 'Betonamu-go no tsuuyaku wa imasu ka.',
      vn: 'Có phiên dịch tiếng Việt không?',
      note: 'Một số 避難所 có hỗ trợ — không phải tỉnh nào cũng có.',
    },
  ],
  officialLinks: [
    { label: '気象庁 (JMA)', url: 'https://www.jma.go.jp/' },
    { label: '内閣府（防災担当）— 避難情報に関するガイドライン（警戒レベル）', url: 'https://www.bousai.go.jp/oukyu/hinanjouhou/r3_hinanjouhou_guideline/' },
    { label: '内閣府（防災担当）— 被災者支援（罹災証明書の交付）', url: 'https://www.bousai.go.jp/taisaku/hisaisyagyousei/' },
    { label: '観光庁監修 — 災害時情報提供アプリ「Safety tips」', url: 'https://www.mlit.go.jp/kankocho/seisaku_seido/kihonkeikaku/jizoku_kankochi/anzenkakuho/inbound/tool.html' },
    { label: '厚生労働省 — 労働契約法第5条 安全配慮義務', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000121431_00177.html' },
  ],
  steps: [
    {
      step: 1,
      title: 'Theo dõi cảnh báo — biết bão tới khi nào',
      description:
        'Bão thường được dự báo 3–5 ngày trước khi đến Nhật. Theo dõi qua:\n\n• **NHK** TV / radio / app — tin chính xác nhất.\n• **気象庁** trang chính (jma.go.jp) — bản đồ + dự báo.\n• **Yahoo!防災速報 app** — push notification cấp tỉnh + 警戒レベル.\n• **Safety tips app** (đa ngôn ngữ, có tiếng Việt).\n\nNghe các từ khóa: 大型台風, 強い勢力, 上陸予想, 警戒レベル.\n\nTheo dõi NHK 1–2 ngày trước bão → biết bão sẽ ở khu mình bao lâu, lực gió bao nhiêu.',
      documents: [],
      tip: 'Cài 3 app NHK World + Yahoo!防災速報 + Safety tips ngay hôm nay nếu chưa có. Mất 5 phút setup, có thể cứu mạng.',
    },
    {
      step: 2,
      title: '1–2 ngày trước bão — chuẩn bị nhà + đồ',
      description:
        '**Bên ngoài nhà:**\n\n• Mang vào trong: chậu cây, xe đạp, đồ giặt, ghế ngoài, dụng cụ vườn, ô dù.\n• Cố định bằng dây nếu không vào được.\n• Hạ rèm cuốn ngoài (シャッター) nếu có.\n\n**Cửa sổ + cửa ra vào:**\n\n• Đóng kín. Khóa.\n• Dán băng dính chéo X lên kính lớn (giảm văng kính khi vỡ).\n• Nếu cửa sổ yếu — đóng ván gỗ bên ngoài (ít chung cư cần làm này).\n\n**Trong nhà:**\n\n• Đầy nước vào chai + bồn tắm — nước máy có thể tắt 1–3 ngày.\n• Sạc đầy điện thoại + pin dự phòng + đèn pin.\n• Đóng gói 防災バッグ — sẵn cạnh cửa.\n• Mua thêm đồ ăn không cần nấu (mì, lon, bánh) cho 3 ngày.\n• In hoặc screenshot 防災マップ + danh sách 避難所.',
      documents: [],
      tip: 'Đừng để nước máy + sạc + đồ ăn đến phút cuối — siêu thị thường hết hàng 1 ngày trước bão lớn.',
    },
    {
      step: 3,
      title: 'Cấp 3 — chuẩn bị di tản',
      description:
        '警戒レベル 3 (高齢者等避難) phát ra:\n\n• Người già, người tàn tật, có thai, có trẻ nhỏ → bắt đầu di tản 避難所 ngay.\n• Người khác → đóng gói 防災バッグ, giấy tờ, sẵn sàng đi khi cấp 4.\n• Liên hệ gia đình → ai ở đâu, kế hoạch gặp ở đâu.\n• Xem lại 防災マップ → đường đi 避難所, tránh khu ngập / lở đất.\n• Nghe NHK liên tục — chuẩn bị cho 避難指示.',
      documents: [
        '防災バッグ',
        '在留カード',
        'Hộ chiếu',
        '保険証 / マイナンバーカード / 資格確認書',
        'Tiền mặt + sạc',
      ],
      tip: 'Người Việt thường nghĩ "mình khỏe, không cần đi sớm" — nhưng đi cấp 3 còn nhẹ nhàng. Đi cấp 4 mưa + gió mạnh, khó di chuyển + nguy hiểm.',
    },
    {
      step: 4,
      title: 'Cấp 4 — di tản NGAY',
      description:
        '警戒レベル 4 (避難指示) phát ra: **TẤT CẢ phải di tản, KHÔNG đợi cấp 5.**\n\n1. Mang 防災バッグ + giấy tờ + người nhà.\n2. Đi đến 避難所 đã chọn từ Step 1.\n3. Đường đi: tránh sông / kênh / vũng nước / khu núi (lở đất).\n4. Đi cùng hàng xóm nếu được.\n5. Đến 避難所 nói "避難に来ました" — nhân viên hướng dẫn vào.\n\nĐường ngập:\n• <30cm: vẫn đi được nhưng cẩn thận hố ga.\n• 30–50cm: nguy hiểm — quay lại + tìm đường khác / đi tầng cao.\n• >50cm: KHÔNG đi qua. Quay về tầng cao nhất nhà mình + gọi 119 nếu mắc kẹt.',
      documents: [
        '防災バッグ',
        '在留カード + hộ chiếu',
        '保険証 / マイナンバーカード / 資格確認書',
        'Tiền mặt + sạc',
        'Giày chống nước nếu có',
      ],
      tip: 'Mặc đồ tối hoặc có dải phản quang — gió + mưa làm tài xế khó nhìn người đi bộ.',
    },
    {
      step: 5,
      title: 'Cấp 5 — đã quá muộn, ở yên trong nhà',
      description:
        '警戒レベル 5 (緊急安全確保) phát ra: nguy hiểm tính mạng, KHÔNG ra ngoài.\n\n**Nếu chưa kịp di tản:**\n\n1. Lên tầng cao nhất trong nhà (tránh nước dâng).\n2. Xa cửa kính / cửa sổ (gió + đồ bay).\n3. Vào phòng giữa nhà (vd phòng tắm, hành lang) nếu có gió siêu mạnh.\n4. Mang 防災バッグ + nước + đồ ăn + điện thoại + sạc cạnh người.\n5. Tắt điện chính + gas chính nếu nước có thể vào nhà.\n6. Nếu nguy cấp (mắc kẹt, chấn thương, mất tỉnh) → gọi 119.\n\nĐợi đến khi 警戒レベル giảm xuống 3 hoặc 2 mới ra.',
      documents: [],
      tip: 'Mặc dù đã quá muộn — đừng hoảng. Cấu trúc bê-tông tầng cao thường chịu được bão. Giữ tỉnh táo, theo dõi NHK.',
    },
    {
      step: 6,
      title: 'Sau bão — kiểm tra nhà + bảo hiểm',
      description:
        'Đợi đến khi 警戒レベル giảm + thông báo từ 市役所. Khi an toàn về:\n\n1. **Bên ngoài nhà:** kiểm tra dây điện rớt, kính vỡ, gas rò. Tránh xa + gọi công ty điện địa phương (東京電力 ở Kanto, 関西電力 ở Kansai, 中部電力 ở Chubu, v.v.) nếu thấy dây điện.\n2. **Trong nhà:** mở cửa sổ thoáng. Kiểm tra ngập / mái dột / nứt tường.\n3. **Chụp ảnh thiệt hại** trước khi dọn — cần cho 罹災証明書 và bảo hiểm.\n4. **罹災証明書**: xin tại 市役所 nếu nhà bị hư hại — bắt buộc cho thủ tục hỗ trợ.\n5. **Bảo hiểm 火災保険 + 風水害**: gọi công ty bảo hiểm báo claim. Không có 風水害 thì 火災保険 thường KHÔNG bao thiệt hại do bão.\n6. **Visa / 在留カード**: nếu hết hạn trong tình huống thiên tai, 入管 có thể cấp 在留資格 thời hạn ngắn — xem guide visa-emergency-medical-disaster-extension.',
      documents: [
        'Ảnh chụp thiệt hại',
        '在留カード',
        '保険証 / マイナンバーカード / 資格確認書',
        'Hợp đồng bảo hiểm (nếu có)',
      ],
      tip: 'Nhà thuê: báo chủ nhà / 不動産 sớm — sửa lớn là trách nhiệm chủ nhà / công ty quản lý, không phải bạn.',
    },
  ],
};

export default typhoonEvacuationAlerts;
