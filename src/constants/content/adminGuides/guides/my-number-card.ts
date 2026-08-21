import type { AdminGuide } from '../../../../types/content';

const myNumberCard: AdminGuide = {
    id: 'my-number-card',
    category: 'daily-law',
    lastVerified: '2026-08-21',
    priority: 'high',
    title: 'Đăng ký và nhận My Number Card',
    titleJp: 'マイナンバーカード申請・受取',
    icon: 'card',
    color: '#185FA5',
    description:
      'Thẻ My Number Card thay được thẻ bảo hiểm (từ 02/12/2025), in 住民票/印鑑証明 ở konbini, đăng nhập Mynaportal và khai 確定申告 online. Không bắt buộc làm, nhưng có thì cuộc sống ở Nhật dễ hơn nhiều. Cấp thẻ mất khoảng 1 tháng — đừng để cần gấp mới làm.',
    searchKeywords: [
      'My Number Card',
      'thẻ My Number',
      'マイナンバーカード',
      'mai nanbaa kaado',
      '個人番号カード',
      'kojin bangou card',
      'マイナポータル',
      'コンビニ交付',
      'in 住民票 ở conbini',
      '印鑑証明 conbini',
      'e-Tax マイナンバー',
      '電子証明書',
      'denshi shoumeisho',
      '署名用パスワード',
      '利用者証明用',
      'PIN マイナンバー',
      '受取',
      'uketori',
      '交付通知書',
      'kyouhuu tsuuchisho',
      '申請書ID',
      'người Việt làm My Number Card',
    ],
    legalScope: {
      jurisdiction: 'municipality',
      jurisdictionNote: 'Nộp đơn có thể làm online/bưu điện/máy ảnh thẻ, nhưng nhận thẻ, cập nhật hạn và reset PIN do 市役所/区役所 nơi đăng ký cư trú xử lý.',
      sourceVerifiedAt: '2026-08-21',
      nextReviewAt: '2026-10-01',
      riskLevel: 'medium',
      whenToAskExpert: [
        'Bạn là người nước ngoài có hạn lưu trú ngắn, vừa gia hạn visa hoặc My Number Card sắp hết hạn.',
        'Bạn mất 交付通知書, chuyển nhà trong thời gian chờ, hoặc thư bị trả về vì 転送不要.',
        'Bạn quên PIN, bị khóa chứng thư điện tử hoặc cần người khác nhận thẻ thay.',
      ],
    },
    quickAction: {
      deadline: 'Làm ngay sau khi địa chỉ ổn định. Nếu đã có thẻ cũ và vừa gia hạn visa, đổi thẻ trước khi My Number Card hết hạn.',
      office: 'Nộp đơn online qua app マイナポータル. Nhận thẻ tại 市役所/区役所 nơi đăng ký 住民票.',
      doNow: [
        'Chuẩn bị ảnh đúng chuẩn (45×35mm, nền trắng, chụp <6 tháng).',
        'Tìm 申請書ID 23 chữ số (trên giấy 個人番号通知書 lúc đăng ký 住民票 lần đầu).',
        'Mở app マイナポータル → chụp ảnh → điền form → nộp.',
        'Đợi 交付通知書 — không chuyển nhà giữa chừng mà không báo 役所.',
      ],
      bring: ['交付通知書 (giấy báo nhận thẻ — bắt buộc)', '在留カード (bắt buộc)', 'Hộ chiếu hoặc thẻ bảo hiểm y tế (1 trong 2 — để xác minh)', 'Bút + giấy nhỏ để ghi 4 PIN ngay tại quầy'],
      ifLate: 'Quá hạn 交付通知書 hoặc thẻ bị huỷ → đến 市役所 hỏi nộp lại. Thẻ hết hạn do visa gia hạn chậm → xử lý ngay tại quầy.',
      officialSourceLabels: [
        'Nộp đơn online (スマートフォン・PC)',
        'Hướng dẫn chính thức マイナンバーカード申請',
        '更新手続きについて — マイナンバーカード総合サイト',
        'マイナンバーカードを作って、便利に生活しましょう！— 出入国在留管理庁',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_mynumber-card_hero.jpg'),
    heroImageCaption: 'マイナンバーカード - thẻ định danh dùng cho bảo hiểm số, combini và thủ tục online',
    whoIsThisFor: [
      'Bạn đã có đăng ký cư trú (住民票) ở Nhật và chưa có thẻ.',
      'Bạn muốn dùng マイナ保険証 thay thẻ bảo hiểm giấy.',
      'Bạn muốn in 住民票/印鑑証明 ở konbini, không phải xếp hàng ở 役所.',
      'Bạn muốn khai 確定申告 online qua e-Tax.',
      'Không cần ngay nếu: vừa sang Nhật < 3 tháng và chưa có địa chỉ ổn định.',
    ],
    whenToDo: [
      'Ngay khi có chỗ ở ổn định — thư báo nhận thẻ ghi 転送不要, không chuyển tiếp nếu bạn dọn nhà giữa chừng.',
      'Làm sớm — từ nộp đơn đến nhận thẻ thường ~1 tháng. Nếu cần gấp cho 確定申告 hoặc bảo hiểm, đừng để sát hạn.',
    ],
    whereToDo: [
      'Nộp đơn: online qua điện thoại tại net.kojinbango-card.go.jp (nhanh nhất, 10 phút) hoặc tại quầy 役所.',
      'Nhận thẻ: tại 役所 (市区町村) theo ngày ghi trong 交付通知書 gửi về nhà.',
    ],
    estimatedTime: 'Nộp đơn: 10–15 phút qua điện thoại. Chờ thư 交付通知書: thường khoảng 1 tháng, có thể lâu hơn tùy địa phương/hồ sơ. Đến 役所 nhận thẻ: 20–40 phút.',
    fees: ['Miễn phí lần đầu. Cấp lại do mất/hư hoặc các trường hợp tương tự có thể phát sinh phí theo quy định địa phương/từng thủ tục.'],
    documentsChecklist: [
      { label: '申請書ID — dãy 23 số trên tờ giấy 個人番号通知書 gửi về nhà khi đăng ký 住民票', required: true },
      { label: 'Ảnh chân dung đúng quy cách (45mm × 35mm, nền trắng/xám, chụp trong 6 tháng gần)', required: true },
      { label: '交付通知書 (giấy báo đến lấy thẻ)', required: true, note: 'Chỉ cần khi đến 役所 nhận; thường được gửi khi thẻ đã sẵn sàng.' },
      { label: '在留カード', required: true, note: 'Cần khi đến 役所 nhận thẻ' },
      { label: 'Hộ chiếu hoặc thẻ bảo hiểm y tế (1 trong 2)', required: true, note: 'Cần khi đến nhận thẻ' },
    ],
    tips: [
      'Sau khi nhận thẻ, **ghi ngay PIN ra giấy cất riêng** (không chụp ảnh bằng điện thoại). Nếu quên PIN ① (署名用) phải đến 市役所 mở khoá — mất cả buổi. PIN ①②③④ là 4 mã riêng biệt, đừng dùng cùng một số.',
      '**Bật マイナ保険証** (liên kết thẻ với bảo hiểm y tế) tại マイナポータル ngay sau khi nhận thẻ. Từ 12/2025, đây là cách dùng bảo hiểm chính tại bệnh viện. 資格確認書 chỉ là phương án dự phòng.',
      'Chuyển nhà phải đến 市役所 **cập nhật địa chỉ trên chip của thẻ** (không chỉ đăng ký 住民票). Chip lưu địa chỉ cũ → dùng dịch vụ công online sẽ bị lỗi. Cần mang thẻ để cán bộ cập nhật bằng máy tại quầy.',
    ],
    commonMistakes: [
      'Ảnh sai: nền có hoa văn, mặt quá nhỏ, ảnh cũ > 6 tháng. Dùng app マイナポータル chụp thẳng cho dễ.',
      'Chuyển nhà giữa chừng mà không báo → thư 交付通知書 (ghi 転送不要) không tới, thẻ bị huỷ sau ~3 tháng.',
      'Đến 役所 quên mang 交付通知書 → có 在留カード cũng không lấy được thẻ.',
      'Đặt PIN ① giống PIN ②③④ → ngân hàng/e-Tax không chấp nhận. PIN ① phải khác và phức tạp hơn.',
      'Nhập sai PIN ① > 5 lần hoặc PIN ②③④ > 3 lần → thẻ khoá, phải quay lại 役所 mở khoá.',
    ],
    faq: [
      {
        question: 'Không có 申請書ID (giấy nộp đơn) thì làm sao?',
        answer:
          'Đến trực tiếp 役所 để lấy tờ 申請書 mới hoặc đăng ký tại quầy. Một số 役所 cũng chấp nhận đăng ký qua app マイナポータル mà không cần 申請書ID.',
      },
      {
        question: 'Nhờ người khác đến lấy thẻ hộ được không?',
        answer:
          'Về nguyên tắc chính chủ đi nhận. Trường hợp thật sự không thể đến quầy có thể cần giấy tờ ủy quyền và lý do phù hợp, nhưng điều kiện khác nhau theo 市役所/区役所 nên phải gọi hỏi trước.',
      },
      {
        question: 'PIN 署名用 (6–16 ký tự) dùng để làm gì?',
        answer:
          'Dùng khi đăng nhập e-Tax, Mynaportal và ký điện tử tài liệu hành chính quan trọng. Đây là PIN quan trọng nhất — ghi lại và cất riêng biệt với thẻ.',
      },
    ],
    scenarios: [
      {
        title: 'Nhập sai PIN quá nhiều lần, thẻ bị khoá — làm sao?',
        situation: 'Tôi nhập sai PIN ① (署名用) 5 lần liền. Thẻ báo lỗi và không dùng được nữa. Phải làm gì?',
        answer: 'Thẻ bị **ロック (khoá)** — không tự mở lại được, phải đến 市役所/区役所 trực tiếp để cán bộ mở khoá bằng máy chuyên dụng.\n\nMang theo: thẻ My Number Card + hộ chiếu (hoặc thẻ cư trú). Không mất phí mở khoá. Sau khi mở, bạn được đặt lại PIN mới tại quầy.\n\n**Phân biệt loại khoá**:\n• PIN ① (署名用, 6–16 ký tự): khoá sau 5 lần sai\n• PIN ②③④ (利用者証明用/住民基本台帳/券面事項入力補助, 4 chữ số): khoá sau 3 lần sai\n\nNếu không nhớ mình đã nhập sai mấy lần — cứ đến 市役所 là an toàn nhất.',
      },
      {
        title: 'Mất My Number Card — có ảnh hưởng bảo hiểm y tế không?',
        situation: 'Tôi làm mất My Number Card. Tôi đang dùng マイナ保険証 tại bệnh viện. Bây giờ đi khám được không?',
        answer: 'Cần làm **ngay khi phát hiện mất**:\n\n**1. Khóa thẻ từ xa**: Gọi 個人番号カードコールセンター 0120-95-0178 (24h) hoặc qua マイナポータル để khoá chức năng thẻ. Ngăn người khác dùng ký điện tử.\n\n**2. Đi khám bệnh trong thời gian mất thẻ**: Dùng **資格確認書** (giấy xác nhận tư cách bảo hiểm do bảo hiểm cấp) hoặc hỏi bệnh viện cách xử lý — nhiều nơi có hệ thống tra cứu 被保険者番号 thay thế.\n\n**3. Xin cấp lại**: Đến 市役所 (mang thẻ cư trú + hộ chiếu) để xin thẻ mới. Cần chụp ảnh lại. Phí cấp lại: 1,000 yên (mất) hoặc miễn phí (hỏng).',
      },
      {
        title: 'Không có thẻ — dịch vụ công nào bị ảnh hưởng?',
        situation: 'Visa của tôi còn 1 năm nên chưa xin My Number Card. Có bị ảnh hưởng gì không?',
        answer: 'Không có My Number Card, bạn vẫn dùng được đa số dịch vụ công bằng cách đến quầy trực tiếp. Nhưng bị ảnh hưởng ở:\n\n• **Bảo hiểm y tế**: Từ 12/2025, không có マイナ保険証 → nhận 資格確認書 từ bảo hiểm, dùng thay thẻ cũ tại bệnh viện. Không bị từ chối khám nhưng thêm bước.\n• **Khai thuế online (e-Tax)**: Phải dùng ID・パスワード方式 (xin tại 税務署) thay vì My Number Card.\n• **Gia hạn visa online**: Hệ thống ISA yêu cầu My Number Card cho một số thủ tục online.\n\nNếu định ở Nhật từ 3 năm trở lên, xin My Number Card từ sớm sẽ tiết kiệm nhiều thời gian về sau.',
      },
    ],
    counterPhrases: [
      {
        jp: 'マイナンバーカードを受け取りに来ました。',
        romaji: 'Mai nanbaa kaado o uketori ni kimashita.',
        vn: 'Tôi đến nhận マイナンバーカード.',
        note: 'Khi đến quầy 市役所/区役所 nhận thẻ.',
      },
      {
        jp: '交付通知書を持って来ました。',
        romaji: 'Koufu tsuuchisho o motte kimashita.',
        vn: 'Tôi mang theo giấy thông báo nhận thẻ.',
      },
      {
        jp: '暗証番号の設定方法を教えていただけますか。',
        romaji: 'Anshou bangou no settei houhou o oshiete itadakemasu ka.',
        vn: 'Anh/chị hướng dẫn giúp cách đặt mật khẩu (PIN) được không?',
      },
      {
        jp: '申請書ID(23桁)はどこに書いてありますか。',
        romaji: 'Shinseisho ID (nijuu san keta) wa doko ni kaite arimasu ka.',
        vn: 'Số 申請書 ID 23 chữ số ghi ở đâu ạ?',
        note: 'Dùng khi nộp online/qua thư.',
      },
      {
        jp: '在留カードと一緒に確認していただけますか。',
        romaji: 'Zairyuu kaado to issho ni kakunin shite itadakemasu ka.',
        vn: 'Anh/chị đối chiếu giúp cùng với 在留カード của tôi được không?',
      },
      {
        jp: 'カードの受け取りまでどのくらいかかりますか。',
        romaji: 'Kaado no uketori made dono kurai kakarimasu ka.',
        vn: 'Tới lúc nhận thẻ mất khoảng bao lâu?',
      },
    ],
    keyTerms: [
      {
        term: 'マイナンバーカード',
        reading: 'マイナンバーカード',
        meaningVi: 'thẻ My Number (thẻ nhựa có chip)',
        noteVi: 'KHÔNG bắt buộc làm. Nhưng nếu có: in 住民票 ở konbini 200円 thay vì 350円 ở 市役所 + giờ làm việc 24h; e-Tax từ nhà; マイナ保険証 khám bệnh; マイナポータル kiểm tra lịch sử khám / 年金 / thuế.',
      },
      {
        term: '交付通知書',
        reading: 'こうふつうちしょ',
        meaningVi: 'giấy thông báo thẻ đã sẵn sàng (nhận tại 市役所)',
        noteVi: '市役所 gửi qua bưu điện sau khi thẻ đã sản xuất xong (~3-4 tuần sau khi nộp đơn). Trên giấy ghi: ngày đặt lịch, mã hẹn, danh sách giấy tờ cần mang khi đến nhận. BẮT BUỘC chính chủ đi nhận — không uỷ quyền được trong phần lớn trường hợp.',
      },
      {
        term: '電子証明書',
        reading: 'でんししょうめいしょ',
        meaningVi: 'chứng thư điện tử (lưu trong chip thẻ)',
        noteVi: '2 loại trong thẻ: (a) 署名用 (cho e-Tax, hợp đồng online — mật khẩu 6-16 ký tự); (b) 利用者証明用 (cho login マイナポータル, in tại konbini — mật khẩu 4 số). Hạn 5 năm (khác với hạn thẻ vật lý 10 năm). Cập nhật miễn phí tại 市役所 trước khi hết hạn.',
      },
      {
        term: '署名用パスワード',
        reading: 'しょめいようパスワード',
        meaningVi: 'mật khẩu cho chữ ký điện tử (6-16 ký tự)',
        noteVi: 'Mật khẩu QUAN TRỌNG NHẤT — dùng để ký e-Tax / 確定申告 / hợp đồng online. 5 lần nhập sai = khoá thẻ — phải đến 市役所 mang theo cả thẻ để reset. Nên ghi an toàn (không lưu trong điện thoại cùng với ảnh thẻ).',
      },
      {
        term: '利用者証明用パスワード',
        reading: 'りようしゃしょうめいようパスワード',
        meaningVi: 'mật khẩu cho login (chỉ 4 số)',
        noteVi: 'Dùng cho: in 住民票 ở konbini, login マイナポータル, đặt thẻ vào máy đọc bệnh viện. 3 lần sai = khoá — vẫn phải đến 市役所 reset. Khác với mật khẩu 6-16 ký tự ở trên.',
      },
      {
        term: 'コンビニ交付',
        reading: 'コンビニこうふ',
        meaningVi: 'cấp giấy tờ tại konbini',
        noteVi: 'Có My Number Card → in 住民票 / 印鑑証明 / 戸籍 / 課税証明書 tại máy multi-copy ở FamilyMart / Lawson / Seven Eleven / Ministop. Phí 200円 (rẻ hơn 350円 ở 市役所). Mở 24h trừ một số khung bảo trì. Cần mật khẩu 利用者証明用 (4 số).',
      },
      {
        term: '有効期限',
        reading: 'ゆうこうきげん',
        meaningVi: 'hạn thẻ + hạn chứng thư điện tử',
        noteVi: '2 hạn khác nhau in trên thẻ: (1) Thẻ vật lý 10 năm (5 năm cho người < 18 tuổi); (2) 電子証明書 5 năm. Người nước ngoài: hạn cả 2 ≤ hạn 在留期間. Gia hạn 在留 → đến 市役所 cập nhật thẻ (không cần làm lại).',
      },
    ],
    officialLinks: [
      { label: 'Nộp đơn online (スマートフォン・PC)', url: 'https://net.kojinbango-card.go.jp/' },
      { label: 'Hướng dẫn chính thức マイナンバーカード申請', url: 'https://www.kojinbango-card.go.jp/en-kofushinse/' },
      { label: '更新手続きについて — マイナンバーカード総合サイト', url: 'https://www.kojinbango-card.go.jp/card/renewal/' },
      { label: 'マイナンバーカードを作って、便利に生活しましょう！— 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/support/portal/mynumbercard.html' },
      { label: 'Mynaportal', url: 'https://myna.go.jp/' },
    ],
    steps: [
      {
        step: 1,
        title: 'Chuẩn bị ảnh đúng quy cách',
        description:
          'Ảnh sai là lý do trượt phổ biến nhất. Quy cách:\n\n• 45mm cao × 35mm rộng.\n• Chụp trong vòng 6 tháng gần.\n• Nền trắng hoặc xám nhạt đồng đều, không hoa văn, không bóng.\n• Mặt nhìn thẳng, mắt mở, không mũ, không kính râm.\n• Khuôn mặt chiếm 70–80% chiều cao ảnh.\n\nCách dễ nhất: mở app マイナポータル → 申請する → chụp ảnh trong app. Hệ thống tự kiểm và resize đúng chuẩn trước khi nộp.',
        documents: ['Điện thoại có camera (nếu dùng app) hoặc ảnh in 45×35mm'],
        tip: 'Dùng app マイナポータル để chụp ảnh trực tiếp thay vì upload ảnh tự chụp — tỷ lệ đơn được chấp nhận cao hơn nhiều.',
      },
      {
        step: 2,
        title: 'Nộp đơn qua điện thoại (10 phút)',
        description:
          'Bước nộp đơn cụ thể:\n\n① Tìm 申請書ID — dãy 23 chữ số in trên tờ giấy 個人番号通知書 (gửi về nhà khi đăng ký 住民票 lần đầu). Không có → đến 役所 lấy tờ mới.\n\n② Mở app マイナポータル hoặc vào net.kojinbango-card.go.jp.\n\n③ Chọn マイナンバーカードを申請する → nhập địa chỉ email → bấm link xác nhận trong email.\n\n④ Nhập 申請書ID (23 chữ số).\n\n⑤ Upload ảnh (hoặc chụp thẳng trong app).\n\n⑥ Xác nhận thông tin: họ tên, ngày sinh, địa chỉ — phải khớp với 在留カード.\n\n⑦ Bấm 申請する → nhận email xác nhận là đã nộp xong.',
        documents: ['申請書ID (23 chữ số từ 個人番号通知書)', 'Ảnh chân dung', 'Địa chỉ email'],
        tip: 'Thông tin điền phải khớp chính xác với 在留カード. Tên, địa chỉ sai một ký tự sẽ bị từ chối và phải nộp lại từ đầu.',
        image: require('../../../../../assets/content/daily-life/ag_mynumber-card_s2.jpg'),
        imageCaption: 'Nộp đơn xin My Number Card qua app マイナポータル trên smartphone trong 10 phút',
      },
      {
        step: 3,
        title: 'Chờ thư 交付通知書 gửi về nhà',
        description:
          '市役所/区役所 gửi 交付通知書 (giấy báo đến lấy) khi thẻ đã sẵn sàng. Trang chính thức nêu thời gian thường khoảng 1 tháng từ lúc nộp đến khi 市役所/区役所 gửi thông báo, nhưng có thể lâu hơn nếu ảnh/hồ sơ lỗi hoặc địa phương đông hồ sơ.\n\nĐiều quan trọng:\n• Phong bì ghi 転送不要 — nếu bạn chuyển nhà giữa chừng, thư sẽ bị trả về chứ không chuyển tiếp.\n• Nếu chuyển nhà sau khi đã nộp đơn: đổi địa chỉ tại 役所 trước, rồi thông báo lại với bộ phận マイナンバーカード để gửi thư đúng địa chỉ mới.\n• Thư có ghi hạn đến lấy — quá hạn có thể phải hỏi 市役所/区役所 để xử lý lại.\n\nTra trạng thái đơn: vào status.kojinbango-card.go.jp → dùng 申請書ID 23 chữ số + ngày sinh.',
        documents: [],
        tip: 'Nếu sau 2 tháng chưa nhận thư, tra trạng thái online trước khi đến 役所 hỏi — thường có cập nhật trên hệ thống.',
      },
      {
        step: 4,
        title: 'Đến 役所 nhận thẻ và thiết lập 4 PIN',
        description:
          'Mang đủ: 交付通知書 + 在留カード + 1 giấy tờ khác (hộ chiếu hoặc thẻ bảo hiểm).\n\nTại quầy bạn thiết lập 4 PIN — quan trọng, không nên vội:\n\n① 署名用電子証明書の暗証番号 (6–16 ký tự, gồm chữ hoa A–Z và số 0–9):\n   → Dùng cho: e-Tax, Mynaportal, ký tài liệu hành chính điện tử.\n   → PIN quan trọng nhất — ghi lại và cất kỹ riêng biệt với thẻ.\n\n② 利用者証明用電子証明書の暗証番号 (4 chữ số):\n   → Dùng cho: in giấy tại combini (コンビニ交付), dùng thẻ như マイナ保険証.\n\n③ 住民基本台帳用暗証番号 (4 chữ số):\n   → Dùng cho hệ thống dữ liệu dân cư — ít dùng trong sinh hoạt.\n\n④ 券面事項入力補助用暗証番号 (4 chữ số):\n   → Dùng để đọc thông tin cơ bản trên thẻ qua NFC.\n\nCó thể đặt ②③④ cùng một số để dễ nhớ. PIN ① phải khác và phức tạp hơn.',
        documents: ['交付通知書', '在留カード', 'Hộ chiếu hoặc thẻ bảo hiểm y tế'],
        tip: 'Ghi 4 PIN lên giấy ngay tại 役所, bỏ vào ví riêng — không ghi vào điện thoại. Nhập sai PIN ① quá 5 lần hoặc sai PIN ②③④ quá 3 lần liên tiếp → thẻ bị khóa điện tử, phải đến 役所 mở lại.',
        image: require('../../../../../assets/content/daily-life/ag_mynumber-card_s4.jpg'),
        imageCaption: 'Nhận thẻ và thiết lập 4 mã PIN tại 役所 theo hướng dẫn của nhân viên',
      },
    ],
  };

export default myNumberCard;
