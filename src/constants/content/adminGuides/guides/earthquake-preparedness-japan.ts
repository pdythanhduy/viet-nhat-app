import type { AdminGuide } from '../../../../types/content';

const earthquakePreparednessJapan: AdminGuide = {
  id: 'earthquake-preparedness-japan',
  category: 'daily-law',
  lastVerified: '2026-05-09',
  priority: 'normal',
  title: 'Hướng dẫn khi động đất ở Nhật',
  titleJp: '日本で地震が起きたとき',
  icon: 'warning-outline',
  color: '#C0392B',
  description:
    'Nhật Bản là một trong những vùng động đất hoạt động nhất thế giới. Khi rung lắc bắt đầu, ưu tiên duy nhất là bảo vệ đầu và cổ — chui xuống gầm bàn, giữ chặt chân bàn. Sau rung lắc mới lo gas / điện / di tản. Có app cảnh báo trước vài giây — cài sẵn trên điện thoại.',
  searchKeywords: [
    'động đất',
    'rung lắc',
    'di tản',
    '避難所',
    'cảnh báo động đất',
    'app phòng thiên tai',
    'NHK World',
    'Yahoo phòng thiên tai',
    '地震',
    '揺れ',
    '震度',
    '緊急地震速報',
    '緊急地震',
    '災害用伝言ダイヤル',
    '171',
    '防災バッグ',
    'vali phòng tai',
    '罹災証明書',
    'giấy chứng nhận thiệt hại',
    '地震保険',
    'sau động đất',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      '気象庁 phát 緊急地震速報 toàn quốc. 内閣府防災 và 消防庁 ban hành hướng dẫn phòng chống thiên tai chuẩn quốc gia. 避難所 (nơi tạm lánh) và 避難場所 (điểm tập trung) do từng 市区町村 chỉ định — vị trí khác nhau theo khu, kiểm tra bản đồ phòng tai trước khi cần.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Bị thương nặng / mắc kẹt — gọi 119, không tự xử lý.',
      'Nhà bị hư hại nặng (nứt tường lớn, nghiêng, gas rò) — gọi gas company + tránh xa, hỏi chủ nhà / công ty bảo hiểm.',
      'Cần xác nhận tin gia đình ở khu vực bị ảnh hưởng — dùng 災害用伝言ダイヤル 171 hoặc 災害用伝言板 web.',
    ],
  },
  quickAction: {
    deadline:
      'Phản ứng trong vài giây đầu khi rung lắc bắt đầu. Sau rung lắc, các quyết định lớn (di tản hay ở lại) thường có 30 phút – vài giờ — đủ thời gian nghe NHK / app phòng tai trước khi quyết.',
    office:
      'Khi đang rung: tự bảo vệ tại chỗ. Sau rung: theo dõi NHK / Yahoo!防災速報 / Safety tips app. Nếu phải di tản: 避難所 do 市区町村 chỉ định (xem trước trên 防災マップ).',
    doNow: [
      'Khi rung: ngồi xuống NGAY, chui dưới gầm bàn cứng, giữ chặt chân bàn để bàn không trượt. Nếu không có bàn — che đầu cổ bằng tay / túi / áo, tránh xa cửa kính và đồ rơi.',
      'KHÔNG chạy ra ngoài khi đang rung — gạch, kính, biển hiệu rơi từ trên xuống nguy hiểm hơn ở trong nhà.',
      'Sau rung lắc lớn: kiểm tra bản thân + người nhà có bị thương không. Tắt bếp gas. Mở 1 cửa ra (phòng kẹt khi nhà nghiêng).',
      'Bật điện thoại + radio + app NHK World / Yahoo!防災速報. Đọc警戒レベル và thông báo từ 市役所.',
      'Nếu có lệnh di tản (避難指示) hoặc 避難所 mở cửa — mang vali phòng tai + giấy tờ + điện thoại + sạc đi 避難所.',
    ],
    bring: [
      'Vali phòng tai (防災バッグ) — chuẩn bị SẴN trước khi cần',
      'Trong vali: nước 3 ngày (3L/người/ngày), đồ ăn không cần nấu (mì gói, lon, năng lượng bar), pin sạc dự phòng, đèn pin, còi, băng cứu thương, thuốc thường dùng, khẩu trang, găng tay',
      '在留カード + hộ chiếu (gốc hoặc bản photo)',
      '保険証 / マイナンバーカード / 資格確認書',
      'Tiền mặt 2–3 vạn (ATM có thể hỏng sau động đất lớn)',
      'お薬手帳 nếu đang dùng thuốc thường xuyên',
    ],
    ifLate:
      'Chưa có vali phòng tai và động đất xảy ra — gom nhanh: nước chai, mì gói, sạc dự phòng, giấy tờ, thuốc, áo ấm, túi nhựa. Tốc độ quan trọng hơn đầy đủ. Sau lần này về chuẩn bị vali sẵn.',
    officialSourceLabels: [
      '気象庁 (JMA) — 緊急地震速報のしくみ',
      '内閣府（防災担当）— 被災者支援（罹災証明書の交付）',
      '内閣府（防災担当）— 被災者生活再建支援法',
      'NTT東日本 — 災害用伝言ダイヤル（171）',
      '日本損害保険協会 — 地震保険について',
      '総務省消防庁 (FDMA)',
    ],
  },
  whoIsThisFor: [
    'Người Việt mới sang Nhật chưa từng trải qua động đất.',
    'Người sống ở khu vực động đất hoạt động (Tokyo, Kanagawa, Tokai, Nankai trough, Tohoku, Hokkaido).',
    'Gia đình có con nhỏ hoặc người già — cần lên kế hoạch trước.',
    'Người sống một mình — cần tự xoay sở, biết app + 避難所 trước khi xảy ra.',
  ],
  whenToDo: [
    'Đọc + chuẩn bị TRƯỚC khi động đất xảy ra. Khi đang rung không kịp đọc.',
    'Cài app cảnh báo (NHK World, Yahoo!防災速報, Safety tips) ngay tuần đầu sang Nhật.',
    'Kiểm tra 防災マップ của 市区町村 mỗi khi chuyển nhà.',
    'Chuẩn bị 防災バッグ định kỳ — kiểm tra hạn dùng nước/đồ ăn 1 năm/lần.',
  ],
  whereToDo: [
    'Trong nhà: dưới gầm bàn cứng, hành lang trong nhà, xa cửa kính / kệ sách / đồ treo trên cao.',
    'Ngoài đường: tránh xa tòa nhà cao, cột điện, biển hiệu. Vào công viên / khoảng trống.',
    'Trong tàu / xe: ngồi yên, vịn chặt. Tài xế dừng xe an toàn.',
    'Trong cửa hàng / ga: nghe theo nhân viên, tránh đồ trưng bày trên cao.',
    '避難所 (nơi tạm lánh) do 市区町村 chỉ định — kiểm tra trên 防災マップ trước.',
  ],
  estimatedTime:
    'Phản ứng tự bảo vệ trong rung lắc: 30 giây – 1 phút. Quyết định di tản: 30 phút – vài giờ sau rung lắc. Ở 避難所: từ vài giờ đến vài tuần tùy mức độ.',
  fees: [
    'Cài app phòng tai: miễn phí.',
    'Vali 防災バッグ: bộ tự gom thường 5,000–15,000円. 100円 ショップ có nhiều đồ cơ bản.',
    'Ở 避難所: thường miễn phí trong trường hợp khẩn cấp. Đồ ăn / nước có thể được phát.',
    'Sửa nhà / mua đồ thay sau động đất: 火災保険 (bảo hiểm hỏa hoạn) thường KHÔNG bao động đất. Cần 地震保険 riêng — kiểm tra hợp đồng bảo hiểm trước.',
  ],
  documentsChecklist: [
    { label: '防災バッグ (vali phòng tai)', required: true, note: 'Chuẩn bị TRƯỚC. Để ở chỗ dễ lấy gần cửa ra.' },
    { label: '在留カード + hộ chiếu', required: true, note: 'Gốc hoặc bản photo trong vali. Đại sứ quán có thể giúp khi mất.' },
    { label: '保険証 / マイナンバーカード / 資格確認書', required: true, note: 'Để vào ngăn riêng trong vali.' },
    { label: 'Tiền mặt 2–3 vạn yên', required: true, note: 'ATM có thể không hoạt động vài ngày sau động đất lớn.' },
    { label: 'Đèn pin + pin dự phòng', required: true, note: 'Pin sạc dự phòng cho điện thoại — quan trọng để liên lạc.' },
    { label: 'Nước + đồ ăn 3 ngày', required: true, note: '3L nước / người / ngày. Đồ ăn không cần nấu.' },
    { label: 'Thuốc thường dùng + お薬手帳', required: false, note: 'Người có bệnh mạn tính — chuẩn bị 7 ngày thuốc.' },
    { label: '防災マップ của 市区町村', required: false, note: 'Bản giấy hoặc screenshot — mạng có thể hỏng.' },
  ],
  commonMistakes: [
    'Chạy ra ngoài khi đang rung lắc — gạch, kính, biển hiệu rơi từ trên cao nguy hiểm hơn ở trong nhà.',
    'Đứng dưới khung cửa — không phải lựa chọn tốt nhất. Hướng dẫn hiện tại của 内閣府 / 消防庁 ưu tiên "ngồi xuống + che đầu cổ + giữ chặt" (姿勢を低く・頭を守る・じっとする) dưới gầm bàn cứng.',
    'Đi thang máy sau động đất — có thể kẹt nếu có dư chấn. Dùng cầu thang.',
    'Không cài app cảnh báo trước — 緊急地震速報 thường báo vài giây – vài chục giây trước khi sóng địa chấn lớn tới (tùy khoảng cách từ tâm chấn). Đủ để chui xuống gầm bàn nếu sẵn sàng.',
    'Không có vali 防災バッグ chuẩn bị sẵn — khi cần không kịp gom.',
    'Không biết 避難所 gần nhà ở đâu — chạy lung tung khi cần di tản.',
    'Không kiểm tra 地震保険 — khi nhà hư mới biết 火災保険 không bao động đất.',
  ],
  faq: [
    {
      question: 'Tôi vừa nghe 緊急地震速報 trên điện thoại — phải làm gì trong vài giây?',
      answer:
        '緊急地震速報 thường báo vài giây – vài chục giây trước rung lắc lớn (thời gian phụ thuộc khoảng cách từ tâm chấn — gần tâm chấn có khi chỉ 0–2 giây, xa hơn có thể 10–30 giây). Trong khoảng đó: ngồi xuống ngay, chui dưới gầm bàn cứng, giữ chặt chân bàn. Nếu đang nấu — tắt bếp gas trên đường chui xuống. Nếu đang đi ngoài đường — tránh xa tòa nhà cao và cột điện, vào khoảng trống.',
    },
    {
      question: '揺れ kết thúc rồi, tôi nên ra ngoài hay ở trong nhà?',
      answer:
        'Tùy mức độ + tình trạng nhà cụ thể. Thông thường: 震度 4 trở xuống + nhà không có dấu hiệu hư hại → có thể ở lại trong khi theo dõi NHK 30 phút – 1 giờ chờ dư chấn. 震度 5 trở lên hoặc nhà có dấu hiệu hư hại (nứt lớn, nghiêng, gas rò, mất điện kèm khói lạ) → chuẩn bị di tản. Khi phân vân, di tản an toàn hơn ở lại. Theo dõi thông báo cụ thể từ 市役所 / NHK / Yahoo!防災速報.',
    },
    {
      question: 'Gia đình tôi ở chỗ khác, không liên lạc được — phải làm sao?',
      answer:
        'Sau động đất lớn, mạng di động thường tắc. Dùng 災害用伝言ダイヤル 171 (gọi miễn phí) hoặc 災害用伝言板 trên web của các nhà mạng (NTT, au, SoftBank, Rakuten). Ghi tin ngắn (30 giây), người nhà nghe lại bằng cách gọi 171 + số điện thoại của bạn. LINE và mạng xã hội nhiều khi vẫn hoạt động khi voice tắc.',
    },
    {
      question: 'Tôi chưa biết 避難所 ở đâu — tìm thế nào?',
      answer:
        'Vào trang web 市役所 / 区役所 nơi mình sống, tìm "防災マップ" hoặc "避難所". Hoặc xem trên app Safety tips (do 観光庁 / Japan Tourism Agency giám sát) — có 避難所 nhập theo vị trí GPS. Cũng có thể đến trực tiếp 市役所 xin bản giấy. Lưu screenshot vào điện thoại để dùng khi mạng hỏng.',
    },
    {
      question: 'Tôi không có 地震保険 — nhà bị hư có được hỗ trợ không?',
      answer:
        'Không có 地震保険 thì 火災保険 thường KHÔNG chi trả thiệt hại do động đất. Tuy nhiên chính phủ có 被災者生活再建支援金 cho các trường hợp nhà hư hại nặng — điều kiện và mức hỗ trợ tùy địa phương + mức độ. Sau động đất, hỏi 市役所 về 罹災証明書 (giấy chứng nhận thiệt hại) — bắt buộc cho đa số thủ tục hỗ trợ.',
    },
  ],
  counterPhrases: [
    {
      jp: '助けてください！',
      romaji: 'Tasukete kudasai!',
      vn: 'Cứu tôi với!',
      note: 'Câu cấp cứu cơ bản nhất. Hét lớn nếu mắc kẹt — không cần lễ phép trong tình huống này.',
    },
    {
      jp: 'けがをしました。',
      romaji: 'Kega o shimashita.',
      vn: 'Tôi bị thương.',
      note: 'Nói với cứu hộ / nhân viên 避難所.',
    },
    {
      jp: '家族と連絡が取れません。',
      romaji: 'Kazoku to renraku ga toremasen.',
      vn: 'Tôi không liên lạc được với gia đình.',
      note: 'Dùng khi xin nhân viên 避難所 hỗ trợ tìm người nhà.',
    },
    {
      jp: '避難所はどこですか。',
      romaji: 'Hinanjo wa doko desu ka.',
      vn: '避難所 (nơi tạm lánh) ở đâu?',
      note: 'Dùng khi hỏi nhân viên 市役所 / cảnh sát / hàng xóm.',
    },
    {
      jp: 'ベトナム語の通訳はいますか。',
      romaji: 'Betonamu-go no tsuuyaku wa imasu ka.',
      vn: 'Có phiên dịch tiếng Việt không?',
      note: 'Dùng tại 避難所 hoặc khi cần khai báo. Một số khu có hỗ trợ — không phải mọi nơi.',
    },
    {
      jp: 'ガスが漏れています。',
      romaji: 'Gasu ga morete imasu.',
      vn: 'Có rò gas.',
      note: 'Quan trọng — gọi 119 hoặc nói với hàng xóm. KHÔNG bật lửa / công tắc điện.',
    },
    {
      jp: '水と食べ物はありますか。',
      romaji: 'Mizu to tabemono wa arimasu ka.',
      vn: 'Có nước và thức ăn không?',
      note: 'Hỏi tại 避難所 khi đến nơi.',
    },
  ],
  keyTerms: [
    {
      term: '緊急地震速報',
      reading: 'きんきゅうじしんそくほう',
      meaningVi: 'cảnh báo động đất khẩn cấp (vài giây trước)',
      noteVi: 'Hệ thống 気象庁 (JMA) tự động gửi cảnh báo trước khi sóng địa chấn lớn đến. Phát qua: TV (NHK), radio, điện thoại (緊急速報メール — không tắt được). Sound: "ピロン ピロン" + tiếng giọng kim. Tính bằng giây tới chục giây — đủ thời gian dừng việc + tránh đồ rơi.',
    },
    {
      term: '震度',
      reading: 'しんど',
      meaningVi: 'cường độ rung lắc (cảm nhận ở từng nơi)',
      noteVi: 'Thang Nhật 0-7 (0,1,2,3,4,5弱,5強,6弱,6強,7). 震度 5弱 trở lên = nguy hiểm. KHÁC マグニチュード (magnitude — đo tổng năng lượng tại tâm chấn). 1 trận động đất có 1 マグニチュード nhưng 震度 khác nhau ở các nơi.',
    },
    {
      term: '津波',
      reading: 'つなみ',
      meaningVi: 'sóng thần',
      noteVi: 'Cảnh báo qua 気象庁 sau động đất biển. 3 cấp: 注意報 (≥0.2m) → 警報 (≥1m) → 大津波警報 (≥3m). Khi nghe → CHẠY LÊN CAO NGAY, không lái xe (đường tắc). Sóng đầu KHÔNG luôn là sóng to nhất — chờ ít nhất 24h sau lệnh "解除".',
    },
    {
      term: '避難所',
      reading: 'ひなんじょ',
      meaningVi: 'nơi trú ẩn (trường, công viên, gym khu phố)',
      noteVi: 'Mỗi 市役所 chỉ định 避難所 cho từng khu — kiểm tra trước trên hazard map của 市. KHÁC 緊急避難場所 (chỗ tạm thoát ngay khi sóng/cháy/sập đến) và 避難所 (chỗ ở dài ngày sau thiên tai). Người nước ngoài được nhận, có thông dịch ở 1 số nơi.',
    },
    {
      term: '罹災証明書',
      reading: 'りさいしょうめいしょ',
      meaningVi: 'giấy chứng nhận thiệt hại (sau thiên tai)',
      noteVi: 'Do 市役所 cấp sau khi thẩm định nhà bị 全壊 / 大規模半壊 / 半壊 / 一部損壊. CẦN để: nhận tiền hỗ trợ 被災者生活再建支援金, miễn thuế, hoãn vay, đòi bảo hiểm. Xin trong vòng 1 tháng sau thiên tai — lưu ảnh thiệt hại trước khi sửa.',
    },
    {
      term: '災害用伝言ダイヤル',
      reading: 'さいがいよう でんごんダイヤル',
      meaningVi: 'dial 171 nhắn tin gia đình khi mạng quá tải',
      noteVi: 'Gọi 171 từ bất kỳ điện thoại Nhật → ghi hoặc nghe tin nhắn từ số nhà của bạn. Khi thiên tai mạng quá tải, gọi thường KHÔNG được; 171 ưu tiên. Web版: web171.jp. Lưu sẵn số nhà người thân trước thiên tai.',
    },
    {
      term: '地震保険',
      reading: 'じしんほけん',
      meaningVi: 'bảo hiểm động đất (kèm bảo hiểm hỏa hoạn)',
      noteVi: 'KHÔNG bán riêng — phải kèm 火災保険. Bồi thường tối đa 50% giá trị nhà. Phí tuỳ vùng (Tokyo cao hơn Hokkaido). Người thuê 賃貸: hỏi 大家 / 不動産 xem 家財保険 có 地震 phần không. Xảy ra thiên tai → giữ ảnh thiệt hại + 罹災証明書 để đòi.',
    },
  ],
  officialLinks: [
    { label: '気象庁 (JMA) — 緊急地震速報のしくみ', url: 'https://www.jma.go.jp/jma/kishou/know/jishin/eew/shikumi/shikumi.html' },
    { label: '内閣府（防災担当）— 被災者支援（罹災証明書の交付）', url: 'https://www.bousai.go.jp/taisaku/hisaisyagyousei/' },
    { label: '内閣府（防災担当）— 被災者生活再建支援法', url: 'https://www.bousai.go.jp/taisaku/seikatsusaiken/shiensya_kouhyou.html' },
    { label: 'NTT東日本 — 災害用伝言ダイヤル（171）', url: 'https://www.ntt-east.co.jp/saigai/voice171s/howto.html' },
    { label: '日本損害保険協会 — 地震保険について', url: 'https://www.sonpo.or.jp/insurance/jishin/index.html' },
    { label: '総務省消防庁 (FDMA)', url: 'https://www.fdma.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'TRƯỚC động đất — chuẩn bị sẵn',
      description:
        'Đừng đợi đến khi rung mới làm. Chuẩn bị 4 việc:\n\n1. **Cài 3 app**: NHK World (cảnh báo + tin), Yahoo!防災速報 (cảnh báo cấp tỉnh), Safety tips (đa ngôn ngữ, có tiếng Việt).\n2. **防災バッグ**: vali nhỏ gần cửa ra, có nước 3L/người/ngày × 3 ngày, đồ ăn không cần nấu, đèn pin, sạc dự phòng, thuốc, băng, còi.\n3. **Kiểm tra 防災マップ**: vào trang 市役所 → tìm "避難所" gần nhà. Lưu screenshot vào điện thoại.\n4. **Cố định đồ trong nhà**: kệ sách, tủ lạnh, TV — gắn miếng cố định chống đổ (mua ở 100円 ショップ hoặc Cainz / Nitori).',
      documents: [],
      tip: 'Hôm nay ngay sau khi đọc xong: cài 3 app + xem 避難所 trên Google Maps. 5 phút làm bây giờ tốt hơn 5 giờ tìm trong khẩn cấp.',
    },
    {
      step: 2,
      title: 'KHI rung lắc — 姿勢を低く / 頭を守る / じっとする',
      description:
        'Nguyên tắc 内閣府 / 消防庁: "ngồi xuống thấp + che đầu cổ + giữ yên" (姿勢を低く・頭を守る・じっとする). Tương đương quy tắc quốc tế Drop / Cover / Hold On:\n\n1. **姿勢を低く / Drop (ngồi xuống thấp)** — không chạy. Nguy cơ ngã + đồ rơi vào cao hơn nhiều khi đứng.\n2. **頭を守る / Cover (che đầu cổ)** — chui dưới gầm bàn cứng. Không có bàn → vào hành lang trong nhà, lấy gối / áo / túi che đầu cổ.\n3. **じっとする / Hold On (giữ yên)** — nắm chặt chân bàn để bàn không trượt khi rung mạnh. Đợi rung dừng hoàn toàn mới ra.\n\nNgoài đường: tránh xa tòa nhà cao, cột điện, biển hiệu. Vào công viên / khoảng trống.\n\nTrong tàu / xe: ngồi yên, vịn chặt. Tài xế sẽ dừng xe an toàn.\n\nKHÔNG: chạy ra ngoài, đứng dưới khung cửa, đi thang máy.',
      documents: [],
      tip: 'Khi vừa nghe 緊急地震速報 trên điện thoại — hành động NGAY, không cần kiểm tra. Vài giây trước rung quan trọng nhất.',
    },
    {
      step: 3,
      title: 'NGAY SAU rung lắc — kiểm tra an toàn',
      description:
        'Trong 5 phút đầu sau khi rung dừng:\n\n1. **Kiểm tra bản thân + người nhà** — có ai bị thương không. Sơ cứu cơ bản nếu có.\n2. **Tắt bếp gas** — nếu chưa tắt khi rung. Mở cửa sổ thoáng nếu nghi gas rò. KHÔNG bật lửa / công tắc điện cho đến khi chắc chắn không có gas.\n3. **Mở 1 cửa ra ngoài** — phòng nhà bị nghiêng kẹt cửa.\n4. **Tránh đồ trên cao** — kệ sách / TV có thể đổ ở dư chấn.\n5. **Bật điện thoại / radio** — nghe NHK + app cảnh báo.\n\nNếu nghi nhà bị hư nặng (tường nứt lớn, nghiêng, sàn lệch) → ra ngoài + đứng ra xa tòa nhà một khoảng cách an toàn (tránh khu có thể đổ / kính rớt).',
      documents: [],
      tip: 'Đeo dép / giày trong nhà ngay khi rung dừng — kính vỡ trên sàn nguy hiểm, đặc biệt với trẻ em.',
    },
    {
      step: 4,
      title: 'Quyết định: ở lại hay di tản',
      description:
        'Theo dõi thông tin trong 30 phút – vài giờ:\n\n• **NHK** (TV / radio / app NHK World) — tin chính xác nhất, có English/Vietnamese trên app.\n• **Yahoo!防災速報** — cảnh báo cấp tỉnh, có 警戒レベル.\n• **市役所** — thông báo cụ thể khu vực + 避難所 nào mở.\n\n**Ở lại** nếu: 震度 4 trở xuống, nhà không hư hại, có nước/đồ ăn 3 ngày, không có sóng thần / hỏa hoạn gần.\n\n**Di tản** nếu: nhà có dấu hiệu hư hại nặng, có lệnh 避難指示 từ 市役所, hỏa hoạn gần, sóng thần (vùng ven biển sau động đất lớn).\n\nDi tản: mang 防災バッグ + giấy tờ + người nhà. Đi 避難所 đã chọn từ Step 1.',
      documents: [
        '防災バッグ',
        '在留カード + hộ chiếu',
        '保険証 / マイナンバーカード / 資格確認書',
        'Tiền mặt + sạc',
      ],
      tip: 'Không thể quyết định một mình → đi với hàng xóm. Khu chung cư thường có người trưởng (管理人 / 自治会) tổ chức di tản.',
    },
    {
      step: 5,
      title: 'Liên lạc gia đình — 災害用伝言ダイヤル 171',
      description:
        'Sau động đất lớn, mạng di động voice thường tắc 1–6 giờ. Cách liên lạc:\n\n1. **災害用伝言ダイヤル 171** — gọi miễn phí từ điện thoại bất kỳ. Ghi tin 30 giây, người nhà nghe bằng cách gọi 171 + số của bạn.\n2. **災害用伝言板** — web của NTT / au / SoftBank / Rakuten. Đăng ký + đọc tin.\n3. **LINE / SNS** — thường vẫn hoạt động khi voice tắc. Đăng status hoặc gửi message ngắn.\n4. **Roaming Wi-Fi** — đa số 避難所 cung cấp Wi-Fi miễn phí.\n\nVới gia đình ở Việt Nam: dùng LINE / Zalo / Messenger. Nói rõ "tôi an toàn" + vị trí.',
      documents: [],
      tip: '171 hoạt động sau khi 気象庁 hoặc các nhà mạng kích hoạt — thường vài giờ sau động đất lớn. Trước đó dùng SNS / LINE. Test 171 trước thiên tai vào ngày 1 và 15 mỗi tháng (thử miễn phí).',
    },
    {
      step: 6,
      title: 'SAU 24h — bảo hiểm + 罹災証明書',
      description:
        'Sau khi an toàn:\n\n1. **罹災証明書** (giấy chứng nhận thiệt hại): xin tại 市役所. Bắt buộc cho đa số thủ tục hỗ trợ và bảo hiểm. Mang: 在留カード, ảnh chụp thiệt hại nhà / đồ.\n2. **地震保険**: nếu có, gọi công ty bảo hiểm báo claim. Cần 罹災証明書 + ảnh.\n3. **被災者生活再建支援金**: hỏi 市役所. Mức hỗ trợ tùy mức độ thiệt hại — cần 罹災証明書 đánh giá "全壊", "大規模半壊", v.v.\n4. **Visa nếu hết hạn trong tình huống thiên tai**: 入管 có thể cấp 在留資格 thời hạn ngắn để xử lý — xem guide visa-emergency-medical-disaster-extension.\n5. **Tâm lý**: hậu chấn động đất phổ biến. Nếu khó ngủ / lo lắng kéo dài >2 tuần — hỏi 市役所 về tư vấn tâm lý sau thiên tai (thường miễn phí).',
      documents: [
        '在留カード',
        'Ảnh chụp thiệt hại',
        '保険証 / マイナンバーカード / 資格確認書',
        'Hợp đồng bảo hiểm (nếu có)',
      ],
      tip: 'Chụp ảnh thiệt hại NGAY — trước khi dọn dẹp. Cần cho 罹災証明書 và bảo hiểm. Chụp nhiều góc + có thước đo / vật so sánh.',
    },
  ],
};

export default earthquakePreparednessJapan;
