import type { AdminGuide } from '../../../../types/content';

const essentialAppsJapanLife: AdminGuide = {
  id: 'essential-apps-japan-life',
  category: 'daily-law',
  lastVerified: '2026-05-14',
  priority: 'normal',
  title: 'App cần thiết khi sống ở Nhật — survival, payment, transport, communication',
  titleJp: '日本生活に必須のスマホアプリ',
  icon: 'phone-portrait-outline',
  color: '#16A085',
  description:
    'Smartphone gần như BẮT BUỘC để sống ở Nhật hiện đại. Danh sách app tối thiểu chia 7 nhóm: **Communication** (LINE), **Payment** (PayPay + IC-card-like apps), **Transport** (Google Maps / Yahoo乗換), **Disaster** (Yahoo Tenki, NHK World, Safety Tips), **Translation** (Google Lens / DeepL), **Shopping/Daily** (Mercari, Amazon JP, ウーバーイーツ), **Government** (マイナポータル, 国税庁). Phần lớn miễn phí. Hướng dẫn cài đặt + đăng ký bằng số điện thoại Nhật + tài khoản ngân hàng Nhật.',
  searchKeywords: [
    'app Nhật',
    'app cần thiết',
    'PayPay',
    'LINE Pay',
    'IC card Suica',
    'Google Maps Nhật',
    'Yahoo 乗換案内',
    'Yahoo Tenki',
    'NHK World Easy',
    'Safety Tips',
    'マイナポータル',
    'Google Lens dịch',
    'DeepL',
    'Mercari',
    'Amazon JP',
    'スマホアプリ',
    'phần mềm sống Nhật',
    '日本必須アプリ',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      'KHÔNG có quy định luật bắt buộc dùng app cụ thể nào. Một số dịch vụ chính phủ (マイナポータル, e-Tax) là chính thức MOJ/総務省/国税庁. PayPay, LINE và phần lớn payment apps là tư nhân. App Store / Google Play điều kiện theo Apple / Google. Phí điện thoại + data — tự thuê.',
    sourceVerifiedAt: '2026-05-14',
    nextReviewAt: '2026-12-01',
    riskLevel: 'low',
    whenToAskExpert: [
      'Vấn đề liên kết My Number Card với 健康保険証 / app banking → chuyên viên 役所 hoặc 銀行.',
      'Bị hack tài khoản PayPay / LINE Pay → 警察 + công ty app + ngân hàng đóng băng ngay.',
      'App ngân hàng từ chối đăng ký người nước ngoài → đổi ngân hàng (ゆうちょ / 楽天 / 住信SBI dễ hơn cho người nước ngoài).',
    ],
  },
  quickAction: {
    deadline:
      'Không có deadline cứng — nhưng tuần đầu khi đến Nhật nên cài: **LINE** (giao tiếp), **Google Maps + Yahoo 乗換** (đi lại), **Yahoo Tenki + Safety Tips** (thiên tai). Sau khi mở 銀行 + SIM Nhật: **PayPay** (thanh toán). Sau My Number Card: **マイナポータル**.',
    office:
      '**App Store (iOS)** + **Google Play (Android)**: download app miễn phí. **SIM card cửa hàng** (ahamo, IIJmio, 楽天モバイル...): cần để xác thực số điện thoại. **銀行**: cần tài khoản Nhật để link payment app. **市役所**: cấp My Number Card cho マイナポータル.',
    doNow: [
      'Cài **LINE** (Free): bắt buộc giao tiếp xã hội / công việc ở Nhật. Đăng ký bằng số điện thoại Nhật.',
      'Cài **Google Maps** (Free): chỉ đường — sử dụng được ngay.',
      'Cài **Yahoo乗換案内** (Free): tra giờ tàu / bus chính xác hơn Google Maps cho Nhật.',
      'Cài **Yahoo Tenki** (Free): cảnh báo bão / mưa lớn / động đất.',
      'Sau khi có 銀行 Nhật: cài **PayPay** + link tài khoản → thanh toán 90% cửa hàng.',
      'Sau khi nhận My Number Card: cài **マイナポータル** + 設定.',
    ],
    bring: [
      'Smartphone (iOS hoặc Android)',
      'SIM card Nhật + số điện thoại Nhật',
      'Wi-Fi hoặc data',
      'Tài khoản ngân hàng Nhật (cho payment app)',
      '在留カード',
      'My Number Card (cho dịch vụ chính phủ)',
    ],
    ifLate:
      'Không có "muộn" — cài bất kỳ lúc nào. Nhưng nếu vẫn dùng SIM VN sau 30 ngày → đổi sang SIM Nhật để dùng app payment + dịch vụ chính phủ.',
    officialSourceLabels: ['総務省 (MIC) — 携帯電話 + デジタル'],
  },
  whoIsThisFor: [
    'Người Việt mới đến Nhật trong tuần đầu — cần app cơ bản.',
    'Du học sinh + thực tập sinh + nhân viên mới — chưa quen với hệ thống Nhật.',
    'Người Việt sống lâu nhưng chưa quen với app payment cashless.',
    'Người Việt muốn tối ưu chi tiêu qua điểm thưởng app.',
    'Phụ huynh muốn cài app cho con.',
    'Người Việt chuẩn bị dùng dịch vụ chính phủ (マイナポータル, e-Tax).',
    'KHÔNG dành cho: người không có smartphone (vẫn có thể sống ở Nhật nhưng khó). Khuyến khích mua dù cũ rẻ.',
  ],
  whenToDo: [
    '**Ngay khi đến Nhật**: LINE, Google Maps, Yahoo乗換, Yahoo Tenki, Google Lens.',
    '**Sau 1 tuần (có SIM + 銀行)**: PayPay, app ngân hàng.',
    '**Sau 1 tháng (有 My Number)**: マイナポータル, e-Tax.',
    '**Theo tình huống**:\n• Mua đồ → Mercari, Amazon, Rakuten, Yahoo Shopping.\n• Đi ăn → Tabelog, Google Maps reviews, ウーバーイーツ.\n• Thuê nhà → SUUMO, Athome.\n• Job → Indeed, Wantedly, Mynavi.\n• Đi chơi → Jorudan, NaviTime.\n• Học tiếng → NHK World Easy, Duolingo (xem free-japanese-classes guide).',
    '**Mùa thiên tai (5–10)**: Cập nhật Safety Tips + Yahoo Tenki settings.',
  ],
  whereToDo: [
    '**App Store** (iPhone) hoặc **Google Play** (Android) — download miễn phí.',
    '**Cài đặt cơ bản**:\n• Ngôn ngữ điện thoại: có thể giữ tiếng Việt — đa số app có tiếng Anh/Việt.\n• Đăng ký Apple ID / Google account với địa chỉ Nhật để mua trong-app.\n• Kích hoạt Face ID / Touch ID / mật khẩu mạnh.',
    '**Tài khoản**:\n• Số điện thoại Nhật cho LINE, PayPay, ngân hàng.\n• Email — Gmail / Yahoo Japan đều OK.\n• Tài khoản ngân hàng Nhật cho payment app.',
    '**Hỗ trợ**:\n• 携帯ショップ (cellphone shop) — tư vấn cài đặt (đôi khi có phí).\n• Bạn / cộng đồng người Việt — chia sẻ kinh nghiệm.\n• YouTube tutorials tiếng Việt: search "App Nhật cần thiết".',
  ],
  estimatedTime:
    'Cài 1 app: 5–10 phút (gồm đăng ký + xác thực SMS). Cài đủ 10 app cơ bản: 2–4 giờ. Quen dùng: 2–4 tuần.',
  fees: [
    '**Đa số miễn phí** download + dùng cơ bản.',
    '**Premium tier** (tùy chọn):\n• LINE Sticker: 100–600円/bộ.\n• Spotify Premium: 980円/tháng.\n• Netflix Standard: 1,490円/tháng.\n• Apple Music: 1,080円/tháng.\n• YouTube Premium: 1,280円/tháng.',
    '**Phí giao dịch app payment**:\n• PayPay nội bộ: 0%.\n• PayPay chuyển khoản ngân hàng: 100円/lần hoặc miễn phí PayPay 銀行.\n• Convenience store nạp PayPay: 0円.\n• ATM Lawson / FamilyMart nạp: 0円 từ một số ngân hàng.',
    '**Phí mobile data** (3–5GB/tháng đa số đủ):\n• 楽天モバイル: 1,078–3,278円/tháng (theo data).\n• ahamo (docomo): 2,970円/tháng cho 20GB.\n• povo (au): 0円 base + topup theo nhu cầu.\n• LINEMO (SoftBank): 990円/tháng cho 3GB.\n• IIJmio (MVNO): 850–2,000円/tháng.',
  ],
  documentsChecklist: [
    { label: 'Smartphone iOS hoặc Android', required: true, note: 'iOS 15+ hoặc Android 10+ — phổ biến 2026.' },
    { label: 'SIM card Nhật + số điện thoại Nhật', required: true, note: 'Để xác thực app (LINE, PayPay, banking). SIM VN không hoạt động cho đa số app.' },
    { label: 'Tài khoản ngân hàng Nhật', required: false, note: 'Cho payment app + ngân hàng app. ゆうちょ / 楽天 dễ mở cho người nước ngoài.' },
    { label: 'Wi-Fi tại nhà hoặc data mobile', required: true, note: 'Đa số app cần kết nối.' },
    { label: '在留カード', required: false, note: 'Một số app yêu cầu xác minh ID (vd banking).' },
    { label: 'My Number Card', required: false, note: 'Bắt buộc cho マイナポータル + e-Tax — không cần cho phần lớn app khác.' },
  ],
  commonMistakes: [
    'Dùng SIM VN ở Nhật để cài LINE / PayPay → không thành công. Phải có số điện thoại Nhật.',
    'Bỏ qua Yahoo Tenki / Safety Tips → bỏ lỡ cảnh báo bão / động đất.',
    'Tin "tôi không cần app payment" → 50%+ cửa hàng Nhật 2026 cho phép cashless ưu tiên. Tiết kiệm thời gian + tích điểm.',
    'Đăng ký Apple ID / Google account với địa chỉ VN → không mua được trong-app Nhật. Đổi region về Japan sau khi sang.',
    'Tin "LINE = Facebook Việt Nam" → SAI. LINE là chuẩn giao tiếp Nhật (thay thế SMS / WhatsApp). Bất kỳ ai làm việc ở Nhật phải có.',
    'Không backup LINE / contacts → đổi điện thoại mất hết.',
    'Cài app từ link / APK ngoài Store → rủi ro malware. Chỉ Store chính thức.',
    'Cho ngươi khác mượn account PayPay / banking → vi phạm + rủi ro mất tiền.',
    'Bỏ qua マイナポータル → bỏ lỡ 健康保険証 tích hợp + e-Tax + xem 確定申告 / 年金.',
    'Quên đổi cài đặt notification — bị tin nhắn promotional làm phiền cả ngày.',
  ],
  faq: [
    {
      question: '10 app TOP cần cài tuần đầu khi đến Nhật?',
      answer:
        '**Communication**:\n1. **LINE** (free): chuẩn giao tiếp Nhật — bạn / công ty / nhà hàng đặt chỗ. Bắt buộc.\n2. **Google Lens / Google Translate** (free): chụp ảnh dịch instant — đọc menu, nhãn sản phẩm, biển báo.\n\n**Transport**:\n3. **Google Maps** (free): chỉ đường + đặt taxi.\n4. **Yahoo乗換案内** (free): tàu / bus Nhật chính xác hơn Google (real-time delay).\n\n**Weather + Disaster**:\n5. **Yahoo天気** (free): mưa / bão / rét / nóng — chính xác Nhật.\n6. **Safety Tips** (free): cảnh báo thiên tai đa ngôn ngữ (tiếng Việt có sẵn) — bắt buộc.\n\n**Payment**:\n7. **PayPay** (free): thanh toán QR ở 90% cửa hàng. Cần SIM + tài khoản ngân hàng Nhật.\n8. **App ngân hàng** (free): theo ngân hàng bạn mở.\n\n**Shopping**:\n9. **Amazon JP** (free): mua sách / electronics / nhu cầu hằng ngày.\n10. **Mercari** (free): mua đồ second-hand / bán đồ cũ (xem mercari guide trong dailyLife).\n\n**Bonus**:\n• **DeepL** (free): dịch chính xác hơn Google Translate cho văn bản dài.\n• **NHK World Easy** (free): tin tức tiếng Nhật dễ — luyện nghe + cập nhật.\n• **マイナポータル** (free, cần My Number Card): truy cập dịch vụ chính phủ.',
    },
    {
      question: 'PayPay vs LINE Pay vs Suica — chọn cái nào?',
      answer:
        '**PayPay** (普及率 cao nhất):\n• QR code thanh toán ở 90% cửa hàng (combini, ăn uống, đại siêu thị, drugstore).\n• Đăng ký miễn phí với SIM Nhật + email.\n• Top-up từ ngân hàng / convenience store / ATM.\n• Chuyển tiền giữa bạn bè (送金).\n• **Khuyến nghị #1** cho người mới.\n\n**LINE Pay**:\n• Tích hợp với LINE.\n• Coverage ít hơn PayPay (~50% cửa hàng).\n• Tiện cho chuyển tiền giữa bạn LINE.\n• Đăng ký phức tạp hơn.\n• **Khuyến nghị #2** sau PayPay.\n\n**Suica (IC Card)** — KHÔNG phải app payment QR:\n• Thẻ vật lý hoặc Mobile Suica trên iPhone / Android Felica.\n• Dùng cho tàu / bus / convenience store / 自販機.\n• Top-up tại ga / convenience store.\n• Mobile Suica với Apple Pay / Google Pay tiện.\n• **Bắt buộc cho người đi tàu hằng ngày**.\n\n**ICOCA / PASMO / Kitaca / Manaca**: IC card khác của các 都道府県 — tương đương Suica.\n\n**au PAY / d払い / メルペイ / 楽天ペイ**: ít phổ biến hơn, dùng cho khuyến mãi đặc biệt.\n\n**Khuyến nghị thực tế cho người Việt**:\n\n1. **PayPay** (cài đầu tiên) — đủ cho thanh toán cửa hàng hằng ngày.\n2. **Mobile Suica / PASMO** (iPhone / Felica Android) — cho tàu + bus.\n3. **LINE Pay** (sau khi quen) — cho chuyển tiền bạn LINE.\n4. **App ngân hàng** — quản lý tài khoản gốc.\n\n**Cảnh báo**:\n• KHÔNG để PayPay balance lớn — chuyển sang ngân hàng thường xuyên.\n• Bật 2-step authentication.\n• KHÔNG share QR / số thẻ.',
    },
    {
      question: 'Bị động đất / bão — app nào cảnh báo?',
      answer:
        '**Đặt setup tuần đầu**:\n\n**1. Yahoo天気 (Yahoo Tenki)** — quan trọng nhất:\n• Free.\n• Cảnh báo: mưa lớn, bão, tuyết, nắng nóng cực, **緊急地震速報** (動đất sớm).\n• Push notification cho khu bạn ở.\n• Setting → vị trí + alerts.\n\n**2. Safety Tips** (観光庁監修):\n• Free, đa ngôn ngữ (tiếng Việt có).\n• Cảnh báo thiên tai + hướng dẫn 避難 cụ thể.\n• Hiển thị 警戒レベル 1–5.\n• 設定 → ngôn ngữ → tiếng Việt.\n• **Bắt buộc cho người nước ngoài**.\n\n**3. NHK World** / **NHKラジオ**:\n• Tin tức + cảnh báo bằng tiếng Anh + tiếng Việt một số chương trình.\n• Live khi có sự cố lớn.\n\n**4. ETWS** (Earthquake and Tsunami Warning System):\n• Tự động bật trên điện thoại Nhật (đa số SIM Nhật).\n• Âm thanh đặc trưng — KHÔNG tắt.\n• Tự động cảnh báo trước động đất 30 giây – vài phút.\n\n**5. Quick alert apps** chuyên thiết bị Felica iPhone / Android:\n• **特務省防災行政無線** — cảnh báo địa phương.\n• Mỗi 自治体 có thể có app riêng — hỏi 市役所.\n\n**6. ウェザーニュース** (paid premium 480円/tháng — có tier free):\n• Chính xác cao cho mưa thời tiết phút-bằng-phút.\n• Cho người làm việc ngoài trời.\n\n**Setup khuyến nghị**:\n\n1. Cài Safety Tips → tiếng Việt → khu bạn ở.\n2. Cài Yahoo天気 → bật all alerts.\n3. Đảm bảo ETWS không tắt (Setting > Notifications > Government Alerts).\n4. Xem guide earthquake-preparedness-japan + typhoon-evacuation-alerts + hazard-map-flood-tsunami-volcano để hiểu phải làm gì khi cảnh báo.\n\n**Quan trọng**:\n• KHÔNG tắt notification dù khó chịu — sống ở Nhật, cảnh báo có thể cứu mạng.\n• Test app thường xuyên — đảm bảo hoạt động.',
    },
    {
      question: 'マイナポータル là gì? Cần cài không?',
      answer:
        '**マイナポータル** (Myna Portal) là cổng dịch vụ công của chính phủ Nhật, tích hợp với **My Number Card** (số định danh cá nhân + thẻ).\n\n**Bao gồm**:\n\n• **健康保険証** tích hợp (từ 2024 thay thế thẻ bảo hiểm vật lý dần dần).\n• **Đăng ký nơi cư trú** thay đổi.\n• **Xác nhận thuế** (e-Tax 連携).\n• **Xác nhận 年金** đã đóng + dự kiến nhận.\n• **Đăng ký 児童手当 / 給付金**.\n• **Truy cập kết quả 健康診断** (一部 trường hợp).\n• Nhiều dịch vụ khác.\n\n**Cần cài?**:\n\n• **CÓ** nếu bạn:\n  - Sống dài hạn ở Nhật (永住 / 帰化 / 配偶者等).\n  - Có My Number Card.\n  - Muốn tối thiểu giấy tờ vật lý.\n  - Khai 確定申告 hằng năm.\n\n• **CHƯA cần** nếu:\n  - Chưa có My Number Card (xem my-number-card guide).\n  - Mới đến Nhật <6 tháng.\n  - Visa ngắn hạn.\n\n**Cài đặt**:\n\n1. Cài app **マイナポータル** từ Store.\n2. Có My Number Card vật lý.\n3. Đăng ký:\n   - iPhone (iOS 14+) với NFC: đọc thẻ qua iPhone.\n   - Android Felica: tương tự.\n   - KHÔNG có NFC / Felica: dùng PC + đầu đọc thẻ.\n4. Tạo 公的個人認証 ID + mật khẩu (4 chữ + 6–16 chữ).\n5. **LƯU mật khẩu kỹ** — sai 3 lần khoá thẻ → đến 市役所 reset.\n\n**Liên kết 健康保険証**:\n\n• Setting → 健康保険証利用申込.\n• Có hiệu lực sau 1–2 tuần.\n• Khi đi viện: chạm My Number Card vào máy đọc → xác minh bảo hiểm.\n\n**Liên kết tài khoản ngân hàng cho 給付金**:\n\n• Setting → 公金受取口座登録.\n• Khi có trợ cấp (vd 児童手当, 給付金 khẩn cấp) — tự động vào tài khoản.\n\n**Cảnh báo**:\n\n• KHÔNG share Pin / mật khẩu.\n• Đăng xuất sau khi dùng.\n• Cập nhật app đều — security patch.\n• Cẩn thận lừa đảo SMS giả mạo マイナポータル.',
    },
    {
      question: 'Có app nào tiếng Việt cho người Việt ở Nhật không?',
      answer:
        '**App có hỗ trợ tiếng Việt rộng rãi**:\n\n• **Google Maps**: tiếng Việt full.\n• **Google Translate / Lens**: dịch Nhật-Việt instant.\n• **DeepL**: dịch văn bản dài chính xác.\n• **Duolingo**: học tiếng Nhật từ tiếng Việt.\n• **Safety Tips** (観光庁監修): thiên tai tiếng Việt.\n• **YouTube**: vô số channel Nhật + người Việt.\n• **Facebook + Zalo**: cộng đồng người Việt ở Nhật.\n• **Spotify / Apple Music**: nhạc Việt + Nhật.\n\n**App Nhật có tùy chọn tiếng Việt**:\n\n• **LINE**: có tiếng Việt trong settings.\n• **NHK World**: 18 ngôn ngữ bao gồm tiếng Việt.\n• **AbemaTV / TVer / Netflix**: tiếng Việt cho subtitle một số nội dung.\n\n**App KHÔNG có tiếng Việt nhưng vẫn dùng được**:\n\n• **PayPay**: chỉ tiếng Nhật + Anh, nhưng giao diện đơn giản.\n• **Yahoo乗換**: chỉ tiếng Nhật + Anh.\n• **Yahoo天気**: tiếng Nhật + Anh.\n• **マイナポータル**: tiếng Nhật + Anh (một số phần).\n• **Apps ngân hàng**: chủ yếu tiếng Nhật.\n\n**App của Việt Nam dùng được ở Nhật**:\n\n• **Zalo**: liên lạc với gia đình VN.\n• **VietBank / Vietcombank / Techcombank**: quản lý tài khoản VN.\n• **Grab / Be**: KHÔNG hoạt động ở Nhật (dùng Uber app cho taxi/食).\n• **Shopee VN**: gửi đồ về VN.\n\n**Khuyến nghị**:\n\n• **Luôn cài Google Lens** — dịch instant qua camera.\n• **DeepL** cho văn bản dài (email công ty, hợp đồng).\n• Học tiếng Nhật cơ bản — giảm phụ thuộc dịch app (xem free-japanese-classes guide).\n• Cộng đồng người Việt Facebook / Zalo — hỏi gì hỏi nhanh.\n\n**Cảnh báo**:\n\n• KHÔNG tin 100% dịch máy — đặc biệt cho hợp đồng / pháp lý.\n• Tài liệu quan trọng: thuê dịch chuyên (xem houterasu / 弁護士).',
    },
  ],
  counterPhrases: [
    {
      jp: 'アプリをインストールしたいです。',
      romaji: 'Apuri o insutooru shitai desu.',
      vn: 'Tôi muốn cài app.',
      note: 'Tại 携帯ショップ nếu cần hỗ trợ.',
    },
    {
      jp: 'PayPayの登録方法を教えてください。',
      romaji: 'PayPay no touroku houhou o oshiete kudasai.',
      vn: 'Cho tôi biết cách đăng ký PayPay.',
      note: 'Hỏi nhân viên cửa hàng / ngân hàng.',
    },
    {
      jp: 'マイナポータルにログインできません。',
      romaji: 'Maina pootaru ni roguin dekimasen.',
      vn: 'Tôi không đăng nhập được マイナポータル.',
      note: 'Tại 市役所 nếu quên mật khẩu / khoá thẻ.',
    },
    {
      jp: 'モバイルSuicaを使いたいです。',
      romaji: 'Mobairu Suica o tsukaitai desu.',
      vn: 'Tôi muốn dùng Mobile Suica.',
      note: 'iPhone (iOS 14+) hoặc Android Felica.',
    },
    {
      jp: 'パスワードを忘れました。',
      romaji: 'Pasuwaado o wasuremashita.',
      vn: 'Tôi quên mật khẩu.',
      note: 'Tại 役所 / 銀行.',
    },
    {
      jp: 'アカウントが乗っ取られました。',
      romaji: 'Akaunto ga nottoraremashita.',
      vn: 'Tài khoản tôi bị chiếm đoạt.',
      note: 'Tại 警察 / công ty app — báo NGAY khi nghi ngờ.',
    },
    {
      jp: 'クレジットカード情報を削除したいです。',
      romaji: 'Kurejitto kaado jouhou o sakujo shitai desu.',
      vn: 'Tôi muốn xoá thông tin thẻ tín dụng.',
      note: 'Trong app — settings → payment method.',
    },
  ],
  officialLinks: [
    { label: '総務省 (MIC) — 携帯電話 + デジタル', url: 'https://www.soumu.go.jp/' },
    { label: 'マイナポータル', url: 'https://kojinbango-card.go.jp/' },
    { label: '国税庁 — e-Tax', url: 'https://www.nta.go.jp/' },
    { label: '観光庁監修 — 災害時情報提供アプリ「Safety tips」', url: 'https://www.mlit.go.jp/kankocho/seisaku_seido/kihonkeikaku/jizoku_kankochi/anzenkakuho/inbound/tool.html' },
  ],
  steps: [
    {
      step: 1,
      title: 'Chuẩn bị — SIM Nhật + Wi-Fi + tài khoản',
      description:
        '**Bước 0 — Trước khi cài app**:\n\n• **SIM card Nhật**: đa số app yêu cầu số điện thoại Nhật cho SMS xác thực.\n  - Tạm: rakuten 1,078円 đầu tiên + topup hoặc povo 0円 base.\n  - Lâu dài: ahamo / LINEMO / IIJmio cho 1,000–3,000円/tháng.\n  - Tại cửa hàng: mang 在留カード + 在留期間 ≥3 tháng + ngân hàng VN OK ban đầu.\n\n• **Wi-Fi tại nhà**: cho data không giới hạn.\n  - Nếu nhà có sẵn (chung cư trong khu trung tâm): hỏi 不動産屋.\n  - Tự đăng ký: 4,000–6,000円/tháng (xem home-internet-wifi-contracts guide).\n\n• **Tài khoản ngân hàng Nhật**:\n  - ゆうちょ (bưu điện): dễ nhất cho người mới.\n  - 楽天銀行 / 住信SBI / PayPay 銀行: online, dễ cho người nước ngoài.\n  - 三菱UFJ / 三井住友 / みずほ: truyền thống, có thể yêu cầu ở Nhật ≥6 tháng.\n  - Mang 在留カード + 住民票 + 印鑑 (nếu có).\n\n• **Apple ID / Google account region Japan**:\n  - Setting → Apple ID → Country → Japan (sau khi sang).\n  - Cần địa chỉ Nhật + payment method Nhật.\n  - Nhiều app Nhật chỉ có ở region Japan store.',
      documents: ['在留カード', '住民票', 'Hộ chiếu', 'Tài khoản ngân hàng (sau khi mở)'],
      tip: 'Trước khi có SIM Nhật, dùng Wi-Fi public + LINE qua bạn / gia đình tạm. Cài các app không cần SIM trước.',
    },
    {
      step: 2,
      title: 'Cài 5 app cốt lõi tuần đầu (KHÔNG cần SIM Nhật)',
      description:
        '**Có thể cài với SIM VN + Wi-Fi**:\n\n**1. LINE** (Free):\n• Download App Store / Google Play.\n• Đăng ký với SIM Nhật KHI CÓ (không phải SIM VN — không xác thực được).\n• Trong khi chờ: dùng LINE trên SIM VN trước, đổi số sau.\n• Setup: ảnh đại diện + tên + sticker.\n\n**2. Google Maps** (Free):\n• Đã cài sẵn trên Android, App Store cho iPhone.\n• Search địa chỉ Nhật bằng tiếng Anh hoặc kanji.\n• Tính năng: offline maps (download khi có Wi-Fi).\n• Tính giờ tàu / bus / đi bộ.\n\n**3. Google Translate / Lens** (Free):\n• Translate: dịch text + thoại + ảnh.\n• Lens: chụp ảnh dịch instant — menu, biển báo, nhãn.\n• Download offline pack tiếng Nhật cho dùng không có internet.\n\n**4. Yahoo乗換案内** (Free):\n• Tra giờ tàu / bus.\n• Real-time delay (nếu có sự cố).\n• Mua vé qua app (một số tuyến).\n• Setup: cho phép vị trí.\n\n**5. Yahoo天気** (Free):\n• Cảnh báo thời tiết + 緊急地震速報.\n• Setup: 設定 → vị trí + bật notification.\n• Bật cảnh báo: mưa lớn, bão, động đất, nóng cực.\n\n**6. Safety Tips** (Free, 観光庁監修):\n• Bắt buộc cho người nước ngoài.\n• 設定 → 言語 → tiếng Việt.\n• 警戒レベル cảnh báo + hướng dẫn 避難.\n\n**Bonus — không cần ngay nhưng tốt cài**:\n\n• **DeepL** (Free): dịch chính xác hơn cho văn bản dài.\n• **NHK World** (Free): tin tức tiếng Anh + một số tiếng Việt.\n• **YouTube** (Free): học tiếng Nhật + giải trí.',
      documents: [],
      tip: 'Tuần đầu, đừng cố cài hết. 5 app cơ bản đủ tồn tại. Cài thêm sau khi quen.',
    },
    {
      step: 3,
      title: 'Sau khi có SIM + 銀行 — Payment + ngân hàng app',
      description:
        '**Bước 1 — Đăng ký PayPay**:\n\n1. Download app PayPay từ Store.\n2. Mở app → đăng ký với số điện thoại Nhật.\n3. Nhận SMS xác thực → nhập code.\n4. Tạo PIN 4 chữ.\n5. Thêm tên + ngày sinh + email.\n6. Setup KYC (本人確認):\n   - Chụp 在留カード mặt trước + mặt sau.\n   - Chụp tự mình (selfie).\n   - Đợi 1–3 ngày được duyệt.\n\n7. **Link với tài khoản ngân hàng**:\n   - Setting → 残高チャージ → 銀行を追加.\n   - Chọn ngân hàng → đăng nhập internet banking để xác thực.\n   - Một số ngân hàng (ゆうちょ) cần thủ tục riêng (gửi thẻ qua mail).\n\n8. **Hoặc link với thẻ tín dụng**:\n   - Setting → 支払い方法 → クレジットカード.\n   - Nhập 16 chữ số.\n\n9. **Topup**:\n   - Từ ngân hàng (sau link).\n   - Tại convenience store: chọn "現金チャージ" trong app → mã QR → đưa cho nhân viên + tiền mặt.\n   - Tại ATM Lawson / Family Mart.\n\n10. **Dùng**:\n    - Tại cửa hàng: mở app → "支払う" → quét QR cửa hàng hoặc đưa QR mình cho nhân viên quét.\n    - Online: scan QR tại checkout.\n\n**Bước 2 — App ngân hàng**:\n\n• Download app ngân hàng (vd ゆうちょBanking, 楽天銀行, 住信SBI).\n• Đăng nhập với số tài khoản + mật khẩu (đã nhận khi mở tài khoản).\n• Setup PIN + bio (Face ID / fingerprint).\n• Có thể: kiểm tra số dư, chuyển khoản, in 通帳 PDF.\n\n**Bước 3 — Mobile Suica / PASMO** (cho người đi tàu):\n\n• **iPhone (iOS 14+ với Wallet)**:\n  - Mở Wallet → +追加 → 交通系ICカード → Suica.\n  - Topup từ Apple Pay (thẻ tín dụng) hoặc convenience store.\n• **Android Felica** (đa số điện thoại bán ở Nhật):\n  - Download app Mobile Suica.\n  - Đăng ký + topup.\n\n• **KHÔNG có Felica** (đa số iPhone trước iOS 14, Android không Felica):\n  - Dùng thẻ Suica vật lý — mua tại ga.\n\n**Bước 4 — Backup + bảo mật**:\n\n• Bật 2-step authentication cho tất cả app payment.\n• Backup LINE qua iCloud / Google Drive.\n• KHÔNG share PIN / OTP / mật khẩu.\n• Cẩn thận phishing SMS.',
      documents: ['SIM Nhật', '在留カード', 'Tài khoản ngân hàng Nhật'],
      tip: 'KYC PayPay đôi khi bị từ chối do ảnh mờ — chụp rõ + ánh sáng đủ.',
    },
    {
      step: 4,
      title: 'Sau My Number — マイナポータル + e-Tax',
      description:
        '**Trước khi cài**:\n\n• Đã có **My Number Card** (vật lý, sau khi xin tại 市役所).\n• Biết 4 mã pin:\n  - **利用者証明用電子証明書**: 4 chữ số (ログイン).\n  - **署名用電子証明書**: 6–16 chữ + số (申請).\n  - **券面入力補助用 PIN**: 4 chữ số (đọc thẻ).\n  - **市町村事務用 PIN**: 4 chữ số (役所).\n\n**Cài マイナポータル**:\n\n1. Download app マイナポータル từ Store (chính thức 内閣府).\n2. Mở app → 初めての方 → 利用者登録.\n3. Đặt My Number Card lên lưng iPhone (NFC zone) hoặc Android Felica.\n4. Nhập 4-pin 利用者証明用.\n5. Đợi 5–10 giây — đọc thẻ.\n6. Tạo profile + email.\n\n**Tính năng chính**:\n\n• **健康保険証 utilization**:\n  - 設定 → 健康保険証としての利用 → 申込.\n  - Có hiệu lực sau 1–2 tuần.\n  - Khi đi viện: chạm My Number Card vào máy đọc.\n\n• **Xác nhận 年金**:\n  - 表示 → 年金記録 → xem lịch sử đóng.\n\n• **e-Tax 確定申告 link**:\n  - 設定 → e-Tax 連携 → 申請.\n  - Khai 確定申告 hằng năm online thay vì giấy.\n\n• **Public Money Receipt 公金受取口座**:\n  - 設定 → 口座登録 → chọn ngân hàng.\n  - 児童手当 / 給付金 tự động vào tài khoản đăng ký.\n\n• **Lý lịch cá nhân**:\n  - Xem 住民票.\n  - 戸籍 (sắp tích hợp).\n  - 履歴 thuế thu nhập.\n\n**Cài e-Tax (cho 確定申告)**:\n\n• Download app **国税庁 e-Tax** từ Store.\n• Đăng nhập với My Number Card qua NFC.\n• Khai 確定申告 từ tháng 1–3 hằng năm.\n• Xem guide kakutei-shinkoku.\n\n**Bảo mật**:\n\n• KHÔNG share PIN.\n• KHÔNG đăng nhập trên Wi-Fi public.\n• Lưu My Number Card trong ví — không để trong xe / nơi công cộng.\n• Mất → báo 警察 + 個人番号カードコールセンター 0120-95-0178 ngay.',
      documents: ['My Number Card', '4 PIN'],
      tip: 'Cài マイナポータル trước khi đến mùa 確定申告 (1–3) để có thời gian quen + 健康保険証 link sẵn.',
    },
    {
      step: 5,
      title: 'App theo tình huống — Shopping, food, transport, learning',
      description:
        '**Shopping**:\n\n• **Amazon JP**: sách, electronics, nhu cầu hằng ngày. Prime 580円/tháng cho free shipping.\n• **Mercari**: second-hand. Bán đồ cũ nhanh — xem mercari guide.\n• **Rakuten**: shopping + tích Rakuten Point. App Rakuten 楽天市場.\n• **Yahoo Shopping**: tương tự Rakuten với PayPay Point.\n• **メチャカリ**: thuê quần áo.\n• **ZOZOTOWN**: thời trang.\n\n**Food**:\n\n• **Uber Eats / Wolt / 出前館 / menu**: giao đồ ăn tận nơi.\n• **食べログ (Tabelog)**: review nhà hàng.\n• **Google Maps**: đánh giá nhà hàng + giờ mở cửa.\n• **クラシル / DELISH KITCHEN**: công thức nấu ăn.\n\n**Transport**:\n\n• **Yahoo乗換案内** (đã cài tuần 1).\n• **NaviTime**: chi tiết hơn, có thể trả phí cho real-time.\n• **乗換NAVITIME**: tương tự.\n• **DiDi / GO** (taxi): đặt taxi qua app.\n• **タイムズカー**: thuê xe theo giờ.\n• **JR-WEST / JR-EAST app**: đặt vé tàu cao tốc 新幹線.\n\n**Housing**:\n\n• **SUUMO / Athome / HOME\'S**: thuê / mua nhà.\n• **アットホーム賃貸**: thuê.\n• **OYO LIFE**: chung cư trọn gói.\n\n**Job**:\n\n• **Indeed**: tìm việc đa dạng.\n• **マイナビ転職**: việc正社員 chuyển ngành.\n• **リクナビNEXT**: tương tự.\n• **Wantedly**: startup tech.\n• **JOPUS**: việc cho người nước ngoài.\n\n**Học tiếng + giải trí**:\n\n• **NHK World Easy**: tin tức tiếng Nhật dễ.\n• **Duolingo / LingoDeer**: học tiếng Nhật.\n• **WaniKani / Anki**: kanji.\n• **AbemaTV / TVer**: TV miễn phí (catch-up).\n• **Netflix / Amazon Prime Video / Hulu / Disney+**: streaming có phí.\n• **Spotify / Apple Music / YouTube Music**: nhạc.\n\n**Cộng đồng người Việt**:\n\n• **Facebook**: nhóm "Người Việt ở Nhật", "Cộng đồng người Việt tại Tokyo/Osaka/...".\n• **Zalo**: giữ liên lạc gia đình + bạn VN.\n• **VYSA**: hội sinh viên Việt.\n\n**Khẩn cấp + sức khỏe**:\n\n• **AMDA**: y tế đa ngôn ngữ (xem mental-health-stress-support guide).\n• **First Aid** (free, từ Japanese Red Cross): hướng dẫn sơ cứu.\n• **緊急通報** (110/119 dial codes).\n\n**Quản lý**:\n\n• **マネーフォワード / Zaim**: track chi tiêu.\n• **TimeTree**: lịch chia sẻ gia đình.\n• **Google Calendar**: lịch cá nhân.\n• **Evernote / Notion**: ghi chú.',
      documents: [],
      tip: 'Không cần cài hết. Mỗi tháng cài 2–3 app mới theo nhu cầu thực tế. Quá nhiều app = phân tán.',
    },
  ],
};

export default essentialAppsJapanLife;
