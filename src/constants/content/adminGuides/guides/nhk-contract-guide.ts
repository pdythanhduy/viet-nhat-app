import type { AdminGuide } from '../../../../types/content';

const nhkContractGuide: AdminGuide = {
  id: 'nhk-contract-guide',
  category: 'daily-law',
  lastVerified: '2026-05-09',
  priority: 'normal',
  title: 'NHK đến nhà thì xử lý thế nào?',
  titleJp: 'NHKの訪問を受けたとき',
  icon: 'tv-outline',
  color: '#7F8C8D',
  description:
    'NHK (日本放送協会) là đài truyền hình công cộng Nhật Bản. Theo 放送法 điều 64, hộ gia đình có thiết bị có thể thu sóng NHK (TV, đầu thu One-Seg, một số thiết bị khác) thường có nghĩa vụ ký hợp đồng 受信契約. Khi nhân viên đến nhà, không có nghĩa vụ ký ngay tại cửa — bạn có quyền yêu cầu giấy tờ + thời gian xem xét. Guide này giúp bạn xử lý bình tĩnh, không cãi nhau, không ký giấy chưa hiểu.',
  searchKeywords: [
    'NHK',
    'nhk đến nhà',
    'nhân viên NHK',
    'hợp đồng NHK',
    'đài NHK',
    '受信料',
    '受信契約',
    '放送法',
    '訪問',
    'テレビ',
    'không xem TV',
    'xem xét NHK',
    'không ký vội',
    'cooling-off',
    'tư vấn NHK',
    '国民生活センター',
    '188',
    'NHK ép ký',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      '受信契約 NHK do 放送法 điều 64 quy định trên toàn quốc. Tuy nhiên áp dụng cụ thể (có thiết bị thu sóng hay không, hợp đồng có hiệu lực hay không, cooling-off, tranh chấp) cần xem xét từng trường hợp. Đây không phải tư vấn pháp lý cá nhân — trường hợp cụ thể nên hỏi 国民生活センター hoặc luật sư.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Đã ký hợp đồng nhưng không hiểu nội dung và muốn hủy / xem xét lại — hỏi 国民生活センター hotline 188 hoặc luật sư.',
      'Bị nhân viên ép buộc / hành xử không phù hợp tại cửa — ghi nhận tên + công ty, gọi cảnh sát phi khẩn cấp #9110 nếu cần.',
      'Có tranh chấp về số tiền / khoản nợ NHK — không tự giải quyết, hỏi 国民生活センター hoặc luật sư trước khi ký bất kỳ giấy tờ nào.',
    ],
  },
  quickAction: {
    deadline:
      'Khi nhân viên NHK đến nhà: KHÔNG có deadline ký ngay tại cửa. Bạn có quyền yêu cầu thời gian xem xét + giấy tờ trước khi quyết định.',
    office:
      'NHK trang chính thức (nhk.or.jp) — thông tin hợp đồng + cách thanh toán + hủy. 国民生活センター — tư vấn nếu có tranh chấp consumer.',
    doNow: [
      'Bình tĩnh ở cửa. Không mở cửa hoàn toàn nếu không cần — nói qua 玄関ドア / インターフォン cũng được.',
      'Hỏi rõ tên + công ty + nội dung. Yêu cầu xem 名刺 (danh thiếp) hoặc 身分証 (giấy tờ tùy thân).',
      'KHÔNG ký bất kỳ giấy gì tại cửa nếu chưa hiểu. Quyền vàng: "持ち帰って確認します" (mang về nhà xem xét).',
      'KHÔNG đưa thông tin cá nhân (số tài khoản, số 在留カード) tại cửa nếu không chắc.',
      'Nếu cần thời gian: nói "今日は契約しません. 書類を置いてください" (hôm nay không ký, để giấy lại).',
      'Sau khi nhân viên đi, đọc giấy bằng app dịch / hỏi bạn / hỏi 国民生活センター 188.',
    ],
    bring: [
      'Bình tĩnh — không cần mở cửa cho người lạ',
      'Smartphone để ghi âm cuộc nói chuyện (luật Nhật cho phép ghi âm khi mình là 1 trong 2 bên)',
      'Giấy + bút để ghi tên + công ty nhân viên',
      'App dịch nếu cần',
    ],
    ifLate:
      'Đã ký giấy mà không hiểu / cảm thấy bị ép: 特定商取引法 có cơ chế cooling-off cho 訪問販売 (8 ngày), nhưng việc cooling-off có áp dụng cho 受信契約 NHK hay không là vùng còn tranh cãi pháp lý. Trước khi gửi 解約通知書, hỏi 国民生活センター 188 — họ sẽ tư vấn miễn phí dựa trên hoàn cảnh cụ thể của bạn.',
    officialSourceLabels: [
      'NHK',
      '国民生活センター',
      '国民生活センター — NHK受信料に関する紛争（ADR事例）',
      '最高裁判所 — NHK受信契約事件判決（平成26(受)1440・1441）',
    ],
  },
  whoIsThisFor: [
    'Người Việt vừa chuyển đến nhà mới — chưa biết về NHK.',
    'Người đã có nhân viên NHK đến nhà nhưng không biết phản ứng thế nào.',
    'Người đã ký hợp đồng NHK nhưng không hiểu / muốn xem xét lại.',
    'Người không có TV nhưng vẫn được hỏi — cần biết quyền + nghĩa vụ.',
  ],
  whenToDo: [
    'Trước khi nhân viên đến lần đầu — đọc guide này để biết bình tĩnh.',
    'Khi nhân viên đang ở cửa — KHÔNG ký vội, áp dụng các bước.',
    'Sau khi đã ký — đọc lại giấy tờ và hỏi 国民生活センター 188 nếu có thắc mắc.',
    'Khi nhận hóa đơn / thư từ NHK mà không hiểu — đọc kỹ trước khi trả lời.',
  ],
  whereToDo: [
    'Tại cửa nhà bạn: nơi xử lý ban đầu — bình tĩnh, không vội.',
    'Trang web NHK (nhk.or.jp): thông tin chính thức về 受信契約.',
    '国民生活センター 188: tư vấn miễn phí khi có tranh chấp consumer.',
    'Luật sư / 司法書士 nếu trường hợp phức tạp.',
  ],
  estimatedTime:
    'Cuộc nói chuyện ở cửa: 5–15 phút. Quá dài → có thể nói "失礼します" (xin phép) đóng cửa. Đọc giấy + tư vấn sau: 30 phút – vài giờ tùy trường hợp.',
  fees: [
    '受信料 NHK: phí cụ thể có nhiều mức tùy phương thức thanh toán + thời gian + có hay không 衛星 (vệ tinh). Phí chính xác — kiểm tra trang nhk.or.jp.',
    'Tư vấn 国民生活センター 188: miễn phí.',
    'Cooling-off theo 特定商取引法 (8 ngày): KHÔNG mất phí nếu áp dụng được. Việc áp dụng cho 受信契約 NHK là vùng tranh cãi — hỏi 国民生活センター trước khi dựa vào đó.',
    'Hủy hợp đồng đã có hiệu lực: NHK có điều kiện hủy cụ thể (vd không còn thiết bị thu sóng, chuyển ra nước ngoài). Kiểm tra trên trang nhk.or.jp hoặc gọi NHK customer center.',
    '内容証明郵便 (thư đảm bảo): khoảng 1,300円 trở lên — phí chính xác kiểm tra Japan Post.',
  ],
  documentsChecklist: [
    { label: 'Giấy + bút', required: false, note: 'Để ghi lại tên + công ty + nội dung nhân viên nói.' },
    { label: 'Smartphone', required: false, note: 'Có thể ghi âm để có bằng chứng.' },
    { label: '名刺 / 身分証 của nhân viên', required: false, note: 'Yêu cầu xem trước khi nói chuyện sâu.' },
    { label: 'Hợp đồng giấy nếu đã ký', required: false, note: 'Giữ kỹ để áp dụng cooling-off nếu cần.' },
  ],
  commonMistakes: [
    'Mở cửa rộng + cho nhân viên vào nhà → khó từ chối + có thể bị áp lực ký.',
    'Ký giấy ngay tại cửa vì sợ phiền / không hiểu → có thể bị ràng buộc hợp đồng dài.',
    'Cãi nhau / lớn tiếng với nhân viên → leo thang vô ích, có thể có người gọi cảnh sát.',
    'Đưa thông tin cá nhân (số ngân hàng, 在留カード) tại cửa khi chưa chắc.',
    'Không đọc giấy nhân viên để lại → không biết mình đã ký gì.',
    'Bỏ qua thư NHK đến hộp thư → có thể leo thang sang thủ tục pháp lý / nợ.',
    'Tin tưởng "tôi không có TV nên không cần ký" mà không kiểm tra — một số thiết bị (One-Seg trong điện thoại / xe hơi cũ, đầu thu) cũng có thể bị tính.',
  ],
  faq: [
    {
      question: 'Tôi không có TV — có cần ký hợp đồng NHK không?',
      answer:
        'Theo 放送法 điều 64, nghĩa vụ ký 受信契約 áp dụng khi có "thiết bị có thể thu sóng NHK" — KHÔNG phải chỉ TV. Một số thiết bị có thể tính: TV, đầu thu One-Seg / Full-Seg, một số máy chơi game cũ, một số điện thoại có chip One-Seg, xe hơi có TV. Nếu không có thiết bị nào thu sóng được — thường không có nghĩa vụ. Nói rõ với nhân viên: "テレビなどの受信機器はありません" (không có thiết bị thu sóng như TV). Nếu họ vẫn ép → không ký, hỏi 国民生活センター 188.',
    },
    {
      question: 'Tôi có TV nhưng chỉ xem Netflix / YouTube — có cần ký không?',
      answer:
        'Câu hỏi phức tạp. Nếu TV của bạn chỉ kết nối internet (smart TV) và KHÔNG có ăng-ten + KHÔNG có cáp + KHÔNG có chip thu sóng — có thể tranh luận không có nghĩa vụ. Nhưng nhiều smart TV vẫn có chip thu sóng dù không dùng đến. Đây là vùng xám pháp lý — tham khảo NHK hoặc luật sư cho trường hợp cụ thể. KHÔNG bịa câu trả lời với nhân viên — chỉ nói sự thật về thiết bị.',
    },
    {
      question: 'Nhân viên NHK đến lần thứ 5, đe dọa "sẽ kiện" — phải làm gì?',
      answer:
        'Bình tĩnh. Không cãi nhau ở cửa. Cách xử lý:\n\n1. Yêu cầu nhân viên đi lịch sự: "今日は帰ってください" (hôm nay xin về). Nếu họ vẫn không đi sau yêu cầu rõ ràng và lặp lại → có thể đối chiếu 不退去罪 (luật hình sự về việc không rời sau khi được yêu cầu, ngưỡng áp dụng tùy hoàn cảnh — cảnh sát đánh giá khi đến). Gọi cảnh sát phi khẩn cấp #9110 nếu cần tư vấn / hỗ trợ.\n\n2. Ghi âm cuộc nói chuyện làm bằng chứng (luật Nhật cho phép ghi âm khi mình là 1 trong 2 bên).\n\n3. Hỏi 国民生活センター 188 — họ có kinh nghiệm với case NHK 訪問.\n\n4. Nếu NHK đưa ra tòa thật → là vụ kiện dân sự (民事), bạn có quyền biện hộ + đem bằng chứng. Có thể được hỗ trợ luật sư qua 法テラス (Japan Legal Support Center) nếu thu nhập đủ điều kiện.',
    },
    {
      question: 'Tôi đã ký rồi, hối hận — có hủy được không?',
      answer:
        '特定商取引法 có cơ chế cooling-off 8 ngày cho hợp đồng 訪問販売 (bán tận nhà), nhưng việc áp dụng cụ thể cho 受信契約 NHK là vùng tranh cãi pháp lý — không phải mọi trường hợp đều rõ ràng. Việc đầu tiên: hỏi 国民生活センター 188 để xác nhận hoàn cảnh cụ thể. Nếu họ xác nhận cooling-off áp dụng được:\n\n1. Viết 解約通知書 (đơn hủy) — ghi: ngày ký, tên hợp đồng, "解約します" (hủy), tên + chữ ký.\n2. Gửi qua 内容証明郵便 (thư đảm bảo có chứng minh ngày gửi) tại bưu điện — phí khoảng 1,300円 trở lên.\n3. Giữ bản photo + biên lai.\n\nNgoài cooling-off — hủy hợp đồng đã có hiệu lực phải theo điều kiện riêng của NHK.',
    },
    {
      question: 'Tôi đang ký hợp đồng và muốn dừng dùng — quy trình thế nào?',
      answer:
        'Hủy hợp đồng đã có hiệu lực thường khác cooling-off. NHK quy định điều kiện hủy cụ thể (vd không còn thiết bị thu sóng, chuyển ra nước ngoài lâu dài, v.v.) — kiểm tra trang nhk.or.jp hoặc gọi NHK customer center. Nếu không thuộc điều kiện → hợp đồng vẫn có hiệu lực, nợ phí có thể cộng dồn. Trường hợp tranh chấp — hỏi 国民生活センター 188 hoặc luật sư.',
    },
  ],
  counterPhrases: [
    {
      jp: '内容を確認したいです。',
      romaji: 'Naiyou o kakunin shitai desu.',
      vn: 'Tôi muốn kiểm tra nội dung trước.',
      note: 'Câu vàng — luôn dùng trước khi ký bất cứ giấy gì.',
    },
    {
      jp: '今すぐ契約できません。',
      romaji: 'Ima sugu keiyaku dekimasen.',
      vn: 'Tôi không thể ký ngay bây giờ.',
      note: 'Lịch sự nhưng rõ ràng. Không cần giải thích lý do.',
    },
    {
      jp: 'ベトナム語で確認してから判断したいです。',
      romaji: 'Betonamu-go de kakunin shite kara handan shitai desu.',
      vn: 'Tôi muốn xem bằng tiếng Việt trước khi quyết định.',
      note: 'Lý do hợp lý — nhân viên không thể từ chối.',
    },
    {
      jp: '名刺をいただけますか。',
      romaji: 'Meishi o itadakemasu ka.',
      vn: 'Cho tôi xin danh thiếp được không?',
      note: 'Yêu cầu danh thiếp + tên đầy đủ — quan trọng để xác minh.',
    },
    {
      jp: '今日は帰ってください。',
      romaji: 'Kyou wa kaette kudasai.',
      vn: 'Hôm nay xin anh/chị về.',
      note: 'Lịch sự nhưng rõ ràng. Nếu nhân viên không đi → có thể gọi cảnh sát #9110.',
    },
    {
      jp: '書類を置いてください。',
      romaji: 'Shorui o oite kudasai.',
      vn: 'Xin để giấy tờ lại cho tôi.',
      note: 'Khi muốn giấy để đọc kỹ + tham khảo trước khi quyết định.',
    },
    {
      jp: 'テレビなどの受信機器はありません。',
      romaji: 'Terebi nado no jushinkiki wa arimasen.',
      vn: 'Tôi không có thiết bị thu sóng như TV.',
      note: 'Chỉ nói nếu là sự thật. Không nói dối.',
    },
    {
      jp: '国民生活センターに相談します。',
      romaji: 'Kokumin seikatsu sentaa ni soudan shimasu.',
      vn: 'Tôi sẽ tham khảo 国民生活センター.',
      note: 'Tín hiệu cho nhân viên biết bạn biết quyền consumer + có thể nhờ tư vấn.',
    },
  ],
  officialLinks: [
    { label: 'NHK', url: 'https://www.nhk.or.jp/' },
    { label: '国民生活センター', url: 'https://www.kokusen.go.jp/' },
    { label: '国民生活センター — NHK受信料に関する紛争（ADR事例）', url: 'https://www.kokusen.go.jp/adr/hunsou/data/adr-20140522_019.html' },
    { label: '最高裁判所 — NHK受信契約事件判決（平成26(受)1440・1441）', url: 'https://www.courts.go.jp/app/files/hanrei_jp/281/087281_hanrei.pdf' },
  ],
  steps: [
    {
      step: 1,
      title: 'TRƯỚC khi nhân viên đến — biết quyền + nghĩa vụ',
      description:
        'Đọc guide này TRƯỚC để khỏi hoảng khi nhân viên đến.\n\n**Nghĩa vụ chung** (theo 放送法 điều 64): hộ gia đình có "thiết bị thu sóng NHK" thường có nghĩa vụ ký 受信契約. Nhưng không có nghĩa vụ ký NGAY tại cửa khi nhân viên đến — bạn luôn có quyền xem xét + tư vấn trước.\n\n**Quyền của bạn**:\n• KHÔNG phải mở cửa cho người lạ.\n• KHÔNG phải ký giấy chưa hiểu.\n• Có thể yêu cầu thời gian xem xét trước khi quyết định.\n• Có thể yêu cầu nhân viên về.\n• 特定商取引法 có cơ chế cooling-off 8 ngày cho 訪問販売 — việc áp dụng cụ thể cho NHK là vùng tranh cãi, hỏi 国民生活センター 188 nếu cần dùng.\n\n**Lưu sẵn**: số 国民生活センター 188 + cảnh sát phi khẩn cấp #9110 trên điện thoại.',
      documents: [],
      tip: 'Đọc bài này KHÔNG có nghĩa "tránh NHK" — chỉ là biết quyền để không bị ép. Nếu sau khi xem xét bạn quyết định ký, đó là chọn của bạn.',
    },
    {
      step: 2,
      title: 'Khi nhân viên đến cửa — bình tĩnh + xác minh',
      description:
        '1. **Không mở cửa rộng**. Nói qua インターフォン (chuông cửa có hình) hoặc qua khe cửa nếu có.\n\n2. **Hỏi rõ**:\n• "どちら様ですか?" (Anh/chị là ai?)\n• "ご用件は何ですか?" (Có việc gì?)\n\n3. **Yêu cầu danh thiếp**: "名刺をいただけますか?". Ghi lại tên + công ty / chi nhánh.\n\n4. **Lắng nghe** nội dung nhân viên nói — nhưng KHÔNG ký gì.\n\n5. **Ghi âm** nếu có thể (luật Nhật cho phép ghi âm khi mình là 1 trong 2 bên).\n\nNếu nhân viên hành xử lịch sự → có thể nói chuyện 5–10 phút. Nếu áp lực hoặc thô lỗ → đi sang Step 3.',
      documents: [
        'Smartphone (ghi âm)',
        'Giấy + bút (ghi tên + công ty)',
      ],
      tip: 'Mở インターフォン + camera trước khi mở cửa thật. Không mở cửa thật cho người không có giấy tờ rõ ràng.',
    },
    {
      step: 3,
      title: 'Đáp lại + KHÔNG ký gì tại cửa',
      description:
        'Sau khi nghe nội dung:\n\n**Trường hợp 1: Bạn cần thời gian xem xét**\n→ Nói: "内容を確認したいので、書類を置いてください. 今日は契約しません." (Tôi muốn xem nội dung, để giấy lại. Hôm nay không ký.)\n→ Nhận giấy. Cảm ơn. Đóng cửa.\n\n**Trường hợp 2: Bạn KHÔNG có thiết bị thu sóng**\n→ Nói: "テレビなどの受信機器はありません." Nếu nhân viên muốn vào kiểm tra → không bắt buộc cho vào nhà. Có thể nói "本日は失礼します."\n\n**Trường hợp 3: Nhân viên ép ký, không đi**\n→ Nói rõ: "今日は帰ってください." Lặp lại 1–2 lần.\n→ Nếu vẫn không đi sau khi yêu cầu lịch sự → có thể là 不退去罪. Gọi cảnh sát phi khẩn cấp #9110.\n\n**Lưu ý quan trọng**: KHÔNG ký giấy + KHÔNG đưa thông tin cá nhân (số ngân hàng, 在留カード, etc.) tại cửa.',
      documents: [],
      tip: 'Lặp lại câu nói cứng (vd "今日は帰ってください") thay vì giải thích dài. Cuộc nói chuyện càng dài, áp lực càng tăng.',
    },
    {
      step: 4,
      title: 'Sau khi nhân viên đi — đọc giấy + tư vấn',
      description:
        '1. **Đọc giấy** bằng tốc độ thoải mái. Dùng app dịch nếu cần. Chú ý:\n• 契約者: tên người ký\n• 受信料の額: số tiền\n• 契約期間: thời hạn\n• 解約条件: điều kiện hủy\n\n2. **Suy nghĩ + bàn với gia đình**. Không có deadline ép — bạn có thể không liên hệ NHK trong nhiều ngày.\n\n3. **Nếu có thắc mắc**: hỏi 国民生活センター 188 (tư vấn consumer miễn phí) hoặc bạn người Nhật / luật sư.\n\n4. **Quyết định**:\n• **Có ý ký**: liên hệ NHK qua trang web hoặc điện thoại để ký chính thức (KHÔNG cần đợi nhân viên đến lại).\n• **Không ý ký**: giữ giấy. Nếu nhân viên đến lần sau, lặp lại Step 2–3.',
      documents: [
        'Giấy nhân viên để lại',
        'App dịch',
      ],
      tip: 'Một số tổ chức Việt Nam ở Nhật (Đại sứ quán, FRESC, hội nhóm) có tư vấn miễn phí về NHK. Search "Tư vấn NHK tiếng Việt" để tìm.',
    },
    {
      step: 5,
      title: 'Nếu lỡ ký rồi — tư vấn 国民生活センター trước',
      description:
        '**Quan trọng**: 特定商取引法 có cơ chế cooling-off 8 ngày cho 訪問販売. Tuy nhiên việc áp dụng cụ thể cho 受信契約 NHK là vùng tranh cãi pháp lý ở Nhật — KHÔNG phải mọi trường hợp đều rõ ràng. Trước khi tự gửi 解約通知書, **hỏi 国民生活センター 188** để xác nhận hoàn cảnh cụ thể của bạn.\n\n**Nếu 国民生活センター hướng dẫn bạn dùng cooling-off**:\n\n1. **Đếm ngày**: từ ngày nhận giấy hợp đồng. Cooling-off thường tính 8 ngày.\n\n2. **Viết 解約通知書** (đơn hủy):\n• Ngày ký hợp đồng\n• Tên hợp đồng (vd "受信契約")\n• Câu "解約します" (Tôi hủy)\n• Tên + địa chỉ + ngày + chữ ký\n\n3. **Gửi qua 内容証明郵便** tại bưu điện (~1,300円 trở lên) — thư đảm bảo có chứng minh ngày gửi.\n\n4. **Giữ bản photo + biên lai** lâu dài để có bằng chứng nếu tranh chấp sau.\n\n**Sau 8 ngày hoặc khi cooling-off không áp dụng**: hủy hợp đồng theo điều kiện cụ thể của NHK (vd không còn thiết bị thu sóng, chuyển ra nước ngoài). Hỏi NHK customer center hoặc 国民生活センター.\n\n**KHÔNG bỏ qua** thư NHK đến sau đó — đọc + xử lý từng cái.',
      documents: [
        'Hợp đồng đã ký',
        'Giấy + bút viết 解約通知書',
        'Tiền 1,300円 cho 内容証明郵便',
      ],
      tip: 'Cooling-off chỉ dùng được cho hợp đồng 訪問販売 (bán tận nhà). Hợp đồng ký online / qua điện thoại / qua bưu điện có quy định khác. Hỏi 国民生活センター 188 cho trường hợp cụ thể.',
    },
  ],
};

export default nhkContractGuide;
