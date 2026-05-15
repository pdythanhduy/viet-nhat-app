import type { AdminGuide } from '../../../../types/content';

const hazardMapFloodTsunamiVolcano: AdminGuide = {
  id: 'hazard-map-flood-tsunami-volcano',
  category: 'daily-law',
  lastVerified: '2026-05-09',
  priority: 'normal',
  title: 'Bản đồ phòng tai (ハザードマップ) — lũ / sóng thần / núi lửa',
  titleJp: 'ハザードマップで自分の地域のリスクを確認',
  icon: 'map-outline',
  color: '#27AE60',
  description:
    'Trước khi cần di tản thật, mỗi người Việt sống ở Nhật cần biết khu mình có nguy cơ gì: ngập lũ (浸水), sóng thần (津波), lở đất (土砂災害), núi lửa (火山). 国土交通省 và mỗi 市区町村 phát hành ハザードマップ miễn phí — kiểm tra một lần khi chuyển nhà, lưu screenshot vào điện thoại.',
  searchKeywords: [
    'hazard map',
    'ハザードマップ',
    '防災マップ',
    'bản đồ phòng tai',
    'ngập lũ',
    'lũ lụt',
    'sóng thần',
    'lở đất',
    'núi lửa',
    '浸水',
    '津波',
    '土砂災害',
    '火山',
    '避難場所',
    '避難所',
    '想定浸水深',
    'risk map',
    '171',
    '災害用伝言ダイヤル',
    '災害用伝言板',
  ],
  legalScope: {
    jurisdiction: 'mixed',
    jurisdictionNote:
      '国土交通省 và 内閣府防災 phát hành 重ねるハザードマップ tổng hợp toàn quốc. Mỗi 市区町村 phát hành 防災マップ chi tiết khu mình — bản đồ + 避難所 list. Phát miễn phí ở 市役所 / 区役所 và trên trang web. 火山 do 気象庁 monitor.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'low',
    whenToAskExpert: [
      'Nhà gần sông / núi / ven biển — có thể yêu cầu 市役所 giải thích chi tiết hoặc tham gia training di tản hàng năm.',
      'Sống gần núi lửa được 気象庁 phân loại "active" (vd Sakurajima, Aso, Asama, Phú Sĩ, v.v.) — phân loại "active" KHÔNG có nghĩa sắp phun trào, chỉ là núi lửa có lịch sử hoạt động trong khoảng 1 vạn năm gần đây. Hỏi 火山防災協議会 địa phương về kế hoạch di tản nếu lo lắng.',
    ],
  },
  quickAction: {
    deadline:
      'Nên kiểm tra ngay tuần đầu khi chuyển đến địa chỉ mới. Trước khi mua hoặc thuê nhà cũng nên xem trước.',
    office:
      'Trang web 市役所 / 区役所 (search "市町村名 ハザードマップ"). Hoặc 重ねるハザードマップ của 国土交通省 (disaportal.gsi.go.jp). Lấy bản giấy tại quầy 市役所.',
    doNow: [
      'Mở trang web 市役所 nơi mình sống → tìm "ハザードマップ" hoặc "防災マップ".',
      'Kiểm tra 4 loại nguy cơ ở khu mình: 浸水 (ngập), 津波 (sóng thần — vùng ven biển), 土砂災害 (lở đất — vùng đồi/núi), 火山 (vùng gần núi lửa active).',
      'Note vị trí 避難所 (nơi tạm lánh dài) + 避難場所 (điểm tập trung tạm) gần nhà — đường đi 5–15 phút walking.',
      'Lưu screenshot vào điện thoại + in bản giấy bỏ trong 防災バッグ.',
      'Test 災害用伝言ダイヤル 171 vào ngày 1 / 15 mỗi tháng (miễn phí) — biết cách dùng khi cần thật.',
    ],
    bring: [
      'Máy tính / điện thoại có internet (để xem bản đồ online)',
      'Địa chỉ chính xác của nhà (để tra cứu khu)',
      'Sau khi xem: 防災バッグ + bản in / screenshot',
    ],
    ifLate:
      'Chưa xem trước và sự cố sắp xảy ra — vào trang Yahoo!天気・防災 hoặc app Safety tips, gõ địa chỉ. Cảnh báo realtime + nguy cơ cơ bản hiện ra trong vài phút.',
    officialSourceLabels: [
      '国土交通省 — ハザードマップポータルサイト',
      '内閣府（防災担当）',
      '気象庁 (JMA) — 噴火警戒レベルの説明',
      '観光庁監修 — 災害時情報提供アプリ「Safety tips」',
    ],
  },
  whoIsThisFor: [
    'Người Việt vừa chuyển nhà ở Nhật — chưa biết khu mới có nguy cơ gì.',
    'Người chuẩn bị thuê / mua nhà — kiểm tra trước khi ký hợp đồng.',
    'Gia đình có con nhỏ / người già — cần biết đường di tản trước khi cần.',
    'Người sống >1 năm ở Nhật mà chưa từng xem 防災マップ — không bao giờ là quá muộn.',
  ],
  whenToDo: [
    'Tuần đầu sau khi chuyển nhà — không đợi đến mùa bão / mùa động đất.',
    'Trước khi ký hợp đồng thuê / mua nhà — quyết định có chấp nhận rủi ro hay không.',
    'Đầu mùa bão (tháng 5 – tháng 6) — refresh kiến thức trước mùa.',
    'Sau khi 市役所 cập nhật bản đồ (thường 3–5 năm/lần) — xem có gì thay đổi.',
  ],
  whereToDo: [
    'Trang web 市役所 / 区役所 — bản chi tiết khu mình.',
    '重ねるハザードマップ của 国土交通省 (disaportal.gsi.go.jp) — bản tổng hợp toàn quốc, có thể chồng nhiều loại nguy cơ.',
    '気象庁 (jma.go.jp) — bản đồ núi lửa, sóng thần, cảnh báo realtime.',
    'Quầy 市役所 / 区役所 — bản giấy miễn phí.',
    'App Safety tips (do 観光庁 / Japan Tourism Agency giám sát) — đa ngôn ngữ, có tiếng Việt, dùng GPS chỉ rủi ro tại vị trí.',
  ],
  estimatedTime:
    'Lần đầu xem ハザードマップ + note 避難所: 30–60 phút. Cập nhật mỗi năm: 10–15 phút. Test 171 vào ngày 1/15 hàng tháng: 2–3 phút.',
  fees: [
    'Tất cả ハザードマップ chính thức miễn phí.',
    'In bản giấy / lấy ở 市役所: miễn phí.',
    'Test 災害用伝言ダイヤル 171 vào ngày 1 và 15 hàng tháng: miễn phí.',
    'App Safety tips, Yahoo!防災速報, NHK World: miễn phí.',
  ],
  documentsChecklist: [
    { label: 'Địa chỉ nhà chính xác', required: true, note: 'Cần để tra cứu khu trên ハザードマップ.' },
    { label: 'Smartphone / máy tính có internet', required: true, note: 'Bản đồ online cập nhật nhanh hơn bản giấy.' },
    { label: '防災バッグ', required: false, note: 'Đã có từ guide earthquake-preparedness-japan / typhoon-evacuation-alerts.' },
    { label: 'Bản in 防災マップ', required: false, note: 'Mạng có thể hỏng — bản giấy phòng hờ trong 防災バッグ.' },
    { label: 'Số 171 lưu trong điện thoại', required: false, note: 'Test ngày 1 / 15 hàng tháng để quen.' },
  ],
  commonMistakes: [
    'Không xem ハザードマップ vì "tôi sống an toàn" — Nhật có hơn 100 núi lửa active + nhiều khu lũ, lở đất bất ngờ.',
    'Chỉ xem 1 loại nguy cơ — phải xem cả 4: 浸水 / 津波 / 土砂災害 / 火山.',
    'Không note 避難所 cụ thể — khi cần phải tìm thì đã muộn.',
    'Tin tưởng "nhà chung cư bê tông an toàn" — bê tông chống động đất nhưng không tránh được lũ ngập tầng 1 hay sóng thần ven biển.',
    'Không kiểm tra lại sau 3–5 năm — 市役所 cập nhật bản đồ, có thể vùng mình lên cấp nguy cơ.',
    'Không test 171 trước thiên tai — khi cần thật không biết dùng.',
  ],
  faq: [
    {
      question: 'Tôi mở trang 市役所 nhưng toàn tiếng Nhật, không hiểu — có cách nào dễ hơn?',
      answer:
        'Có. App **Safety tips** (do 観光庁 / Japan Tourism Agency giám sát, có tiếng Việt) là lựa chọn dễ nhất — gõ địa chỉ hoặc bật GPS, app hiện cảnh báo + nguy cơ cơ bản. Hoặc dùng Google Translate trên trang 市役所 — không hoàn hảo nhưng đủ hiểu cấp độ rủi ro. Cuối cùng, đến quầy 市役所 xin bản giấy + nhờ nhân viên giải thích bằng tiếng Anh / dùng app dịch.',
    },
    {
      question: 'Khu nhà tôi nằm trong vùng "想定浸水深 3m" — nghĩa là gì?',
      answer:
        '"想定浸水深" = mức nước dự đoán khi lũ lớn nhất (1/200 năm). 3m nghĩa là nước có thể dâng cao 3m so với mặt đất — ngập tầng 1, người trên đường có thể chết đuối. Bạn cần: di tản sớm khi 警戒レベル 3 (không đợi cấp 4), hoặc 垂直避難 lên tầng 3 trở lên nếu chung cư cao tầng. Hỏi 市役所 chi tiết "我が家の浸水想定" + cách di tản phù hợp.',
    },
    {
      question: '避難場所 (hinanbasho) và 避難所 (hinanjo) khác nhau thế nào?',
      answer:
        '避難場所 = điểm tập trung khẩn cấp tạm thời (公園, 広場) — đến đầu tiên khi có nguy hiểm gần nhà (cháy, lở đất, sóng thần). Thường mở ngay, ở vài giờ.\n\n避難所 = nơi tạm lánh dài hạn (trường học, công viên thể thao) — ở vài ngày đến vài tuần khi nhà không về được. Có chăn, đồ ăn, nước, vệ sinh.\n\nKiểm tra 防災マップ — thường list cả 2 loại với ký hiệu khác nhau.',
    },
    {
      question: 'Tôi sống gần núi lửa được phân loại "active" (vd Phú Sĩ, Asama, Sakurajima) — có thực sự nguy hiểm không?',
      answer:
        '"Active" theo phân loại 気象庁 không có nghĩa sắp phun trào — chỉ là núi lửa có lịch sử hoạt động trong khoảng 1 vạn năm gần đây. Mức nguy hiểm thực tế tùy khoảng cách + lịch sử phun trào cụ thể. 気象庁 phát 噴火警戒レベル 1–5 cho mỗi núi lửa cần monitor: cấp 1 = trạng thái bình thường, cấp 5 = di tản bắt buộc khu vực nguy hiểm. Khu vực gần núi lửa active thường có 火山防災マップ riêng từ 火山防災協議会 — chỉ rõ vùng tro bay, dòng lửa, lahar (lũ bùn). Hỏi 市役所 cho khu cụ thể của mình — KHÔNG generalize.',
    },
    {
      question: 'Sau khi xem ハザードマップ, tôi nên làm gì với gia đình?',
      answer:
        '4 việc: (1) Cùng nhau xem bản đồ — mỗi người biết 避難所 và đường đi. (2) Quyết định "điểm gặp" nếu thất lạc (vd "避難所 A" hoặc "nhà bà ngoại"). (3) Lưu số 171 + cách dùng vào điện thoại mọi người. (4) Nhắc nhau 1 lần đầu mỗi mùa bão (tháng 5–6) + ngày 11 tháng 3 (kỷ niệm động đất Tohoku 2011) + ngày 17 tháng 1 (kỷ niệm động đất Kobe 1995) — 2 ngày này media + 市役所 thường có thông tin cập nhật.',
    },
  ],
  counterPhrases: [
    {
      jp: 'ハザードマップを見たいのですが。',
      romaji: 'Hazaado mappu o mitai no desu ga.',
      vn: 'Tôi muốn xem 防災マップ.',
      note: 'Nói tại quầy 市役所 / 区役所 để xin bản giấy.',
    },
    {
      jp: 'うちの地域のリスクを教えてください。',
      romaji: 'Uchi no chiiki no risuku o oshiete kudasai.',
      vn: 'Cho tôi biết về nguy cơ ở khu nhà tôi.',
      note: 'Khi cần nhân viên 市役所 giải thích cụ thể.',
    },
    {
      jp: '避難所はどこですか。',
      romaji: 'Hinanjo wa doko desu ka.',
      vn: '避難所 ở đâu?',
      note: 'Câu cơ bản tại quầy hoặc khi hỏi đường.',
    },
    {
      jp: '英語の資料はありますか。',
      romaji: 'Eigo no shiryou wa arimasu ka.',
      vn: 'Có tài liệu tiếng Anh không?',
      note: 'Nhiều 市役所 lớn có bản tiếng Anh / Trung / Việt — hỏi thử.',
    },
    {
      jp: 'ベトナム語版はありますか。',
      romaji: 'Betonamu-go ban wa arimasu ka.',
      vn: 'Có bản tiếng Việt không?',
      note: 'Một số khu nhiều người Việt (Aichi, Kanagawa, Tokyo) có bản tiếng Việt.',
    },
    {
      jp: '津波の心配はありますか。',
      romaji: 'Tsunami no shinpai wa arimasu ka.',
      vn: 'Có nguy cơ sóng thần không?',
      note: 'Hỏi khi sống ven biển và muốn xác nhận.',
    },
  ],
  officialLinks: [
    { label: '国土交通省 — ハザードマップポータルサイト', url: 'https://disaportal.gsi.go.jp/hazardmapportal/hazardmap/faq/faq.html' },
    { label: '内閣府（防災担当）', url: 'https://www.bousai.go.jp/' },
    { label: '気象庁 (JMA) — 噴火警戒レベルの説明', url: 'https://www.jma.go.jp/jma/kishou/know/kazan/level_toha/level_toha.html' },
    { label: '観光庁監修 — 災害時情報提供アプリ「Safety tips」', url: 'https://www.mlit.go.jp/kankocho/seisaku_seido/kihonkeikaku/jizoku_kankochi/anzenkakuho/inbound/tool.html' },
  ],
  steps: [
    {
      step: 1,
      title: 'Mở trang 市役所 — tải bản đồ khu mình',
      description:
        'Cách 1: vào 重ねるハザードマップ ở `disaportal.gsi.go.jp`. Gõ địa chỉ → bản đồ hiện rủi ro. Có thể chồng nhiều loại nguy cơ (lũ + lở đất + sóng thần).\n\nCách 2: Google search "<tên 市町村> ハザードマップ" → trang chính 市役所. Mỗi 市役所 có bản đồ riêng chi tiết hơn — list 避難所 cụ thể.\n\nCách 3: đến trực tiếp quầy 市役所 / 区役所, nói "ハザードマップをください" — họ phát bản giấy miễn phí.',
      documents: [
        'Địa chỉ nhà chính xác',
        'Smartphone / máy tính có internet',
      ],
      tip: 'Khu có nhiều người Việt (Aichi, Kanagawa, Saitama, Osaka) — một số 市役所 có bản tiếng Việt. Hỏi nhân viên thử.',
    },
    {
      step: 2,
      title: 'Đọc 4 loại nguy cơ — note rủi ro của mình',
      description:
        'Bản đồ thường có 4 lớp:\n\n1. **浸水想定区域 (vùng ngập)** — màu xanh nhạt → đậm theo độ sâu nước dự đoán. Note nếu nhà mình trong vùng + độ sâu (vd 0.5m, 1m, 3m, 5m+).\n\n2. **津波浸水想定 (vùng sóng thần)** — chỉ có ở ven biển. Cao độ + đường đi cao lên (高台).\n\n3. **土砂災害警戒区域 (vùng lở đất)** — màu vàng (警戒) hoặc đỏ (特別警戒). Vùng có núi / đồi gần.\n\n4. **火山防災マップ** — vùng gần núi lửa active. Có bản riêng từ 火山防災協議会.\n\nNếu nhà mình KHÔNG trong vùng nào → an tâm hơn nhưng vẫn cần biết 避難所.',
      documents: [],
      tip: 'Chụp ảnh / screenshot bản đồ với địa chỉ nhà highlight. Lưu vào folder "防災" trên điện thoại để tìm nhanh khi cần.',
    },
    {
      step: 3,
      title: 'Note 避難所 + 避難場所 gần nhà',
      description:
        'Trên bản đồ, ký hiệu thường là:\n\n• Hình trường học = 避難所 (trường học, công viên thể thao — ở dài hạn)\n• Hình cây / công viên = 避難場所 (công viên, quảng trường — tập trung khẩn cấp tạm thời)\n• Chữ thập / hình bệnh viện = 救急医療機関 (bệnh viện cấp cứu)\n\nKý hiệu cụ thể tùy 市町村 — đọc legend trên bản đồ. Note 2–3 chỗ gần nhất cho mỗi loại:\n• Tên + địa chỉ\n• Đường đi (5–15 phút walking)\n• Số điện thoại nếu có\n\nĐi thử thực tế 1 lần — biết đường khi cần đi trong mưa / đêm.',
      documents: [
        'Bản đồ đã chụp',
        'Notes app',
      ],
      tip: 'Nếu sống ở chung cư cao tầng + không trong vùng ngập → có thể chọn 垂直避難 (di tản dọc) lên tầng cao thay vì đi 避難所. Nhưng phải có đồ + nước cho 3 ngày.',
    },
    {
      step: 4,
      title: 'Test 171 (災害用伝言ダイヤル) trước thiên tai',
      description:
        '171 là dịch vụ thoại miễn phí của NTT để gửi/nhận tin trong thiên tai. Khi mạng di động tắc, 171 vẫn hoạt động.\n\n**Cách dùng (gửi tin):**\n1. Gọi `171`\n2. Bấm `1` (gửi tin)\n3. Bấm số điện thoại nhà / điện thoại của bạn\n4. Ghi tin 30 giây\n\n**Cách dùng (nghe tin):**\n1. Gọi `171`\n2. Bấm `2` (nghe tin)\n3. Bấm số điện thoại của người mình muốn nghe\n4. Nghe tin\n\n**Test miễn phí:** ngày 1 và 15 hàng tháng. Cũng có thể test trong 防災週間 (30/8 – 5/9 hàng năm) và ngày 1 tháng 9 (防災の日 — kỷ niệm Đại địa chấn Kanto 1923, có training quốc gia).\n\nLưu số 171 + cách dùng vào điện thoại của cả gia đình.',
      documents: [],
      tip: 'Có cả 災害用伝言板 (web): vào trang nhà mạng (NTT/au/SoftBank/Rakuten) → đăng ký + đọc tin theo số điện thoại. Khi voice tắc, web thường còn dùng được.',
    },
    {
      step: 5,
      title: 'Cập nhật định kỳ — chuyển nhà / năm mới mùa bão',
      description:
        'ハザードマップ không phải làm 1 lần xong. Cập nhật khi:\n\n1. **Chuyển nhà** — khu mới, nguy cơ mới. Làm lại Step 1–3.\n2. **Đầu mùa bão** (tháng 5–6) — kiểm tra cập nhật cho mùa.\n3. **3–5 năm/lần** — 市役所 cập nhật bản đồ. Xem có gì thay đổi (vd thêm vùng ngập do biến đổi khí hậu, đổi vị trí 避難所).\n4. **Sau thiên tai lớn ở khu khác** — tin tức cập nhật cảnh báo.\n\nGhi nhắc trong calendar điện thoại — định kỳ 1 năm review.',
      documents: [],
      tip: 'Ngày 11 tháng 3 (kỷ niệm động đất Tohoku 2011) và 17 tháng 1 (kỷ niệm động đất Kobe 1995), media + 市役所 thường có thông tin cập nhật + sự kiện diễn tập. Tham gia 1 lần để quen.',
    },
  ],
};

export default hazardMapFloodTsunamiVolcano;
