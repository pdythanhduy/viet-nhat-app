import type { AdminGuide } from '../../../../types/content';

const hankoInkan: AdminGuide = {
    id: 'hanko-inkan',
    category: 'daily-law',
    lastVerified: '2026-08-21',
    priority: 'high',
    title: 'Con dấu cá nhân (Hanko / Inkan)',
    titleJp: '印鑑・はんこの作り方と使い方',
    icon: 'create',
    color: '#C0392B',
    description:
      'Con dấu cá nhân (はんこ / 印鑑) vẫn hữu ích ở Nhật, nhưng không phải mọi thủ tục đều bắt buộc. Dấu đăng ký chính thức (実印/印鑑登録) do municipal office xử lý và chỉ cần khi bên nhận hồ sơ yêu cầu 印鑑証明書.',
    legalScope: {
      jurisdiction: 'municipality',
      jurisdictionNote:
        '印鑑登録 là thủ tục theo municipal office nơi bạn có住民登録; điều kiện về tên, kích thước, chất liệu và dấu được/không được đăng ký khác nhau theo địa phương. Việc ngân hàng, chủ nhà hoặc công ty yêu cầu dấu hay chữ ký là quy trình của từng bên nhận hồ sơ.',
      sourceVerifiedAt: '2026-08-21',
      nextReviewAt: '2026-10-01',
      riskLevel: 'medium',
      whenToAskExpert: [
        'Bạn chuẩn bị ký mua xe, vay tiền, bảo lãnh, mua nhà hoặc hợp đồng yêu cầu 印鑑証明書.',
        'Tên trên thẻ cư trú/住民票 có chữ Latin, katakana, kanji hoặc thông称 không khớp với dấu muốn đăng ký.',
        'Bạn bị mất 実印, 銀行印, 印鑑登録証 hoặc nghi người khác đã dùng dấu của bạn.',
      ],
    },
    quickAction: {
      deadline:
        'Mua dấu thường khi có nơi xử lý yêu cầu; đăng ký 印鑑登録 trước thủ tục cần 実印/印鑑証明書.',
      office: 'Municipal office nơi bạn có địa chỉ cư trú; ngân hàng/chủ nhà/công ty chỉ xác định họ cần dấu hay chữ ký.',
      doNow: [
        'Hỏi bên nhận hồ sơ xem họ chấp nhận chữ ký hay cần 印鑑/印鑑証明書.',
        'Nếu cần đăng ký 実印, kiểm tra quy định municipal office về tên trên dấu, kích thước và chất liệu trước khi khắc.',
        'Tách dấu thường ngày, dấu ngân hàng và 実印 nếu bạn dùng lâu dài để giảm rủi ro lạm dụng.',
      ],
      bring: [
        'Con dấu muốn đăng ký nếu làm 印鑑登録',
        'Thẻ cư trú hoặc giấy tờ tùy thân còn hiệu lực',
        'My Number Card/hộ chiếu nếu địa phương yêu cầu bổ sung',
        'Giấy/hợp đồng ghi rõ bên nhận yêu cầu 印鑑証明書 nếu có',
      ],
      ifLate:
        'Nếu đến ngân hàng/chủ nhà mà thiếu loại dấu họ yêu cầu, hồ sơ có thể bị trả lại. Nếu mất 実印/銀行印 mà không hủy hoặc báo ngân hàng, rủi ro bị lạm dụng giấy tờ/tài khoản tăng cao.',
      officialSourceLabels: [
        '印鑑登録について — 横浜市',
        '印鑑登録・印鑑登録証明書 — 新宿区外国人向け生活情報',
        'コンビニ交付 — J-LIS',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_hanko_hero.jpg'),
    heroImageCaption: 'Con dấu cá nhân 印鑑 — hữu ích cho một số hợp đồng, ngân hàng và thủ tục cần 印鑑証明書',
    officialLinks: [
      { label: '印鑑登録について — 横浜市', url: 'https://www.city.yokohama.lg.jp/kurashi/koseki-zei-hoken/todokede/koseki-juminhyo/todokede-touroku/inkan/inkan.html' },
      { label: '印鑑登録・印鑑登録証明書 — 新宿区外国人向け生活情報', url: 'https://www.foreign.city.shinjuku.lg.jp/jp/kurashi/inkantoroku/' },
      { label: 'コンビニ交付 — J-LIS', url: 'https://www.j-lis.go.jp/rdd/card/bcl/' },
    ],
    whoIsThisFor: [
      'Người mới sang Nhật lần đầu và chưa có con dấu cá nhân.',
      'Người được ngân hàng, chủ nhà, công ty hoặc bên nhận hồ sơ yêu cầu 印鑑 hoặc chữ ký mẫu.',
      'Người cần đăng ký con dấu chính thức (印鑑登録) tại phường/thành phố.',
    ],
    whenToDo: [
      'Không cần mặc định mua ngay ngày đầu; hãy kiểm tra ngân hàng/chủ nhà/công ty có yêu cầu dấu hay chấp nhận chữ ký.',
      'Đăng ký 印鑑登録 trước khi ký hợp đồng cần 実印 hoặc 印鑑証明書, ví dụ một số giao dịch xe, vay tiền, mua nhà hoặc bảo lãnh.',
      'Đối với mở tài khoản ngân hàng thông thường, yêu cầu dấu/chữ ký khác nhau theo ngân hàng và cách đăng ký.',
    ],
    whereToDo: [
      'Mua con dấu: cửa hàng 100 yên (Daiso, Seria), cửa hàng 印鑑 chuyên dụng, hoặc online.',
      'Đăng ký 印鑑登録: văn phòng phường/quận (市区町村役場) — nơi bạn đã đăng ký địa chỉ cư trú.',
    ],
    estimatedTime: 'Mua con dấu: 5–15 phút. Đăng ký 印鑑登録: 30–60 phút tại văn phòng phường.',
    fees: [
      'Con dấu thường (認印): 100–500 yên tại cửa hàng 100 yên.',
      'Con dấu khắc tên theo yêu cầu (実印): 1.000–5.000 yên tại cửa hàng chuyên dụng.',
      'Phí đăng ký 印鑑登録: thường miễn phí hoặc vài trăm yên tùy địa phương.',
      'Giấy chứng nhận 印鑑証明書: khoảng 300 yên/bản.',
    ],
    documentsChecklist: [
      { label: 'Con dấu cá nhân (印鑑)', required: true, note: 'Nếu đăng ký 印鑑登録, dấu thường không được là dấu cao su mềm và phải đáp ứng quy định địa phương.' },
      { label: 'Thẻ cư trú (在留カード)', required: true, note: 'Để xác nhận danh tính và địa chỉ cư trú.' },
      { label: 'Hộ chiếu', required: false, note: 'Một số văn phòng phường yêu cầu thêm hộ chiếu để xác minh.' },
      { label: 'My Number Card hoặc giấy thông báo số My Number', required: false, note: 'Không bắt buộc nhưng nên mang theo để tiết kiệm thời gian.' },
    ],
    steps: [
      {
        step: 1,
        title: 'Hiểu 3 loại con dấu',
        description: 'Nhật Bản thường phân biệt 3 cách dùng con dấu:\n\n• 認印 (みとめいん / Mitomein): Con dấu thường ngày — dùng khi bên nhận hồ sơ chấp nhận dấu thường, ví dụ một số giấy tờ nội bộ hoặc nhận hàng.\n\n• 銀行印 (ぎんこういん / Ginko-in): Dấu/chữ ký mẫu dùng với ngân hàng nếu ngân hàng yêu cầu. Nhiều quy trình mới có thể dùng chữ ký/eKYC, nên phải kiểm tra từng ngân hàng.\n\n• 実印 (じついん / Jitsuin): Con dấu đã đăng ký chính thức tại municipal office — dùng khi thủ tục yêu cầu 印鑑証明書. Phải đăng ký 印鑑登録 mới có giá trị như 実印.',
        documents: [],
        tip: 'Với người mới sang Nhật, có thể chuẩn bị 1 dấu 認印 rẻ để dùng khi được yêu cầu, nhưng đừng mặc định rằng mọi ngân hàng hoặc hợp đồng đều cần dấu.',
      },
      {
        step: 2,
        title: 'Mua con dấu',
        description: 'Cửa hàng 100 yên (Daiso, Seria, CanDo) thường có sẵn dấu khắc các chữ Kanji phổ biến; tên người Việt có thể khó tìm đúng. Bạn có 2 lựa chọn:\n\n• Tìm dấu katakana gần tên mình nếu chỉ dùng như 認印 và bên nhận chấp nhận.\n\n• Đặt khắc tên riêng tại cửa hàng 印鑑 chuyên dụng — mất 1–3 ngày, giá thường cao hơn, nhưng dễ kiểm soát tên, kích thước và chất liệu hơn.',
        documents: [],
        tip: 'Nếu định đăng ký 印鑑登録, hỏi municipal office trước về tên được khắc: tên trên住民票, thông称 hoặc katakana ghi chú có thể là điều kiện bắt buộc tùy địa phương.',
        image: require('../../../../../assets/content/daily-life/ag_hanko-inkan_s2.jpg'),
        imageCaption: 'ダイソー はんこ — con dấu 認印 tại cửa hàng 100 yên, chỉ dùng khi bên nhận hồ sơ chấp nhận',
      },
      {
        step: 3,
        title: 'Đăng ký 印鑑登録 (nếu cần dấu chính thức)',
        description: 'Mang con dấu và giấy tờ tùy thân đến municipal office nơi bạn đã đăng ký địa chỉ. Nhân viên sẽ kiểm tra bạn có đủ điều kiện đăng ký không và dấu có đúng quy định địa phương không. Nếu được chấp nhận, bạn nhận 印鑑登録証 hoặc thông tin đăng ký theo cách địa phương quản lý.\n\nSau khi đăng ký, khi cần chứng minh dấu, bạn xin cấp 印鑑証明書 — bản xác nhận dấu đã đăng ký. Một số nơi có thể cấp tại quầy hoặc qua combini nếu địa phương hỗ trợ và bạn có My Number Card hợp lệ.',
        documents: [
          'Con dấu cần đăng ký',
          'Thẻ cư trú',
          'Hộ chiếu (tùy yêu cầu địa phương)',
        ],
        tip: 'Tên trên dấu phải theo quy định địa phương. Với người nước ngoài, dấu bằng kanji, thông称 hoặc katakana thường chỉ được xét nếu thông tin đó có trên住民票 theo cách địa phương chấp nhận.',
      },
      {
        step: 4,
        title: 'Dùng con dấu đúng cách',
        description: 'Khi đóng dấu, giữ dấu thẳng đứng, ấn đều và nhẹ — không cần ấn mạnh. Hãy thử trước trên giấy nháp để kiểm tra mực trước khi đóng vào giấy tờ quan trọng.',
        documents: [],
        tip: 'Không cho người khác mượn con dấu của bạn — nhất là dấu ngân hàng và 実印. Nếu mất dấu, phải báo ngân hàng và văn phòng phường ngay.',
      },
    ],
    commonMistakes: [
      'Dùng dấu cao su mềm (loại tự mực) để đăng ký 印鑑登録 — loại này bị từ chối.',
      'Dùng chung 1 con dấu cho cả tài khoản ngân hàng và các việc thường ngày — rủi ro nếu bị lạm dụng.',
      'Mất thẻ 印鑑登録証 mà không báo phường để hủy — người khác có thể lạm dụng.',
      'Tưởng mọi ngân hàng đều bắt buộc dấu, hoặc ngược lại tưởng chữ ký luôn được chấp nhận, nên không kiểm tra trước.',
      'Đặt dấu nghiêng hoặc ấn không đều khiến mực bị nhòe, giấy tờ phải ký lại.',
    ],
    faq: [
      {
        question: 'Người nước ngoài có cần con dấu không hay chỉ ký tên là đủ?',
        answer: 'Tùy nơi xử lý. Nhiều thủ tục và ngân hàng đã chấp nhận chữ ký hoặc eKYC, nhưng một số hợp đồng/quầy vẫn yêu cầu 印鑑, đặc biệt khi cần 印鑑証明書. Cách an toàn là hỏi bên nhận hồ sơ trước.',
      },
      {
        question: 'Mua dấu ở Daiso có dùng được không?',
        answer: 'Có thể dùng cho việc thường ngày nếu bên nhận chấp nhận 認印. Nhưng dấu mua sẵn thường không phù hợp để đăng ký 実印 cho người Việt nếu tên không khớp quy định municipal office.',
      },
      {
        question: 'Con dấu ngân hàng và con dấu thường có khác nhau không?',
        answer: 'Về vật lý có thể giống nhau, nhưng nếu ngân hàng ghi nhận dấu đó làm dấu tài khoản thì nó nhạy cảm hơn dấu thường. Nên dùng riêng nếu bạn phải đăng ký dấu với ngân hàng.',
      },
      {
        question: 'Tôi có thể đặt khắc tên tiếng Việt không?',
        answer: 'Cửa hàng có thể khắc Latin hoặc katakana, nhưng đăng ký 印鑑登録 được hay không do municipal office quyết định. Trước khi đặt dấu đắt tiền, kiểm tra tên trên住民票 và quy định địa phương.',
      },
      {
        question: 'Nếu mất con dấu thì phải làm gì?',
        answer: 'Nếu là dấu ngân hàng: báo ngân hàng ngay để đóng băng và đổi dấu mới. Nếu là 実印 đã đăng ký: đến văn phòng phường hủy đăng ký và đăng ký dấu mới.',
      },
    ],
  };

export default hankoInkan;
