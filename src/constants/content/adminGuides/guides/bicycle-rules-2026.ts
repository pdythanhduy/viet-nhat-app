import type { AdminGuide } from '../../../../types/content';

const bicycleRules2026: AdminGuide = {
    id: 'bicycle-rules-2026',
    category: 'traffic',
    lastVerified: '2026-05-07',
    priority: 'high',
    title: 'Luật xe đạp 2026 / blue ticket',
    titleJp: '自転車の青切符・交通反則通告制度',
    icon: 'bicycle',
    color: '#E67E22',
    description: 'Đang áp dụng từ 01/04/2026: Nhật đưa người đi xe đạp từ 16 tuổi trở lên vào hệ thống blue ticket cho một số vi phạm giao thông. Đây là thay đổi quan trọng với người đi học, đi làm hoặc giao hàng bằng xe đạp.',
    legalScope: {
      appliesFrom: '2026-04-01',
      jurisdiction: 'national',
      jurisdictionNote: 'Hệ thống 交通反則通告制度 cho xe đạp áp dụng toàn quốc; bãi đỗ, bảo hiểm xe đạp và quy tắc địa phương có thể khác theo tỉnh/thành.',
      sourceVerifiedAt: '2026-05-07',
      nextReviewAt: '2026-10-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Bạn nhận giấy thông báo/blue ticket nhưng không hiểu hạn xử lý hoặc loại vi phạm.',
        'Có tai nạn, thương tích, uống rượu, bỏ chạy hoặc nguy cơ bị xử lý hình sự/red ticket.',
        'Bạn đi giao hàng/đi làm bằng xe đạp và công ty có quy định riêng về bảo hiểm hoặc an toàn.',
      ],
    },
    quickAction: {
      deadline: 'Đang áp dụng từ 01/04/2026 cho người từ 16 tuổi trở lên; nếu nhận giấy thông báo, xử lý theo hạn ghi trên giấy.',
      office: 'Không phải thủ tục đăng ký; khi vi phạm xử lý theo hướng dẫn của cảnh sát/NPA và giấy thông báo.',
      doNow: [
        'Bỏ thói quen dùng điện thoại, vượt đèn đỏ, không dừng ở 止まれ hoặc đi ngược chiều.',
        'Kiểm tra phanh, đèn, chuông và bảo hiểm xe đạp theo địa phương.',
        'Mở bảng NPA về 反則行為/反則金 nếu cần biết chính xác lỗi và số tiền tại thời điểm bị xử lý.',
        'Nếu đi giao hàng/đi làm bằng xe đạp, lưu sẵn số liên hệ công ty/bảo hiểm.',
      ],
      bring: ['Giấy tờ cá nhân khi cần xác minh', 'Thông tin đăng ký chống trộm xe nếu có', 'Thông tin bảo hiểm xe đạp nếu địa phương/công ty yêu cầu'],
      ifLate: 'Nếu bỏ qua giấy thông báo hoặc không xử lý đúng hạn, rủi ro có thể chuyển sang xử lý nghiêm hơn. Chính phủ Nhật giải thích quy trình blue ticket có mốc tạm nộp trong vòng 7 ngày từ ngày sau khi bị xử lý, và nếu không tạm nộp thì phải theo giấy hẹn/thông báo tiếp theo.',
      officialSourceLabels: [
        '自転車交通反則通告制度 — 警察庁',
        '自転車ルール・制度 — 警察庁',
        '自転車の反則行為と反則金の額 — 警察庁',
        'Giải thích của Chính phủ Nhật',
        '罰則強化！自転車のながらスマホと酒気帯び運転 — 政府広報オンライン',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_bicycle-rules_hero.jpg'),
    heroImageCaption: '自転車の青切符 — phiếu phạt xanh áp dụng từ 01/04/2026 cho vi phạm giao thông xe đạp',
    whoIsThisFor: [
      'Người đi học, đi làm, giao hàng hoặc sinh hoạt hằng ngày bằng xe đạp tại Nhật.',
      'Người từ 16 tuổi trở lên vì thuộc nhóm có thể bị áp dụng blue ticket từ 01/04/2026.',
      'Phụ huynh/người giám hộ muốn nhắc con em về quy tắc xe đạp, dù trẻ dưới 16 tuổi vẫn phải tuân thủ luật giao thông.',
    ],
    whenToDo: [
      'Đang áp dụng từ 01/04/2026 với hệ thống 交通反則通告制度 cho xe đạp.',
      'Kiểm tra thói quen đi xe ngay trước khi đi học/đi làm vì các lỗi như điện thoại, đèn đỏ, stop sign rất dễ xảy ra.',
      'Khi chuyển địa phương, kiểm tra thêm quy định bãi đỗ xe đạp và bảo hiểm xe đạp tại địa phương đó.',
    ],
    whereToDo: [
      'Quy tắc giao thông áp dụng trên đường công cộng toàn Nhật.',
      'Quy định bãi đỗ xe, khu vực cấm đỗ và bảo hiểm xe đạp có thể khác theo tỉnh/thành phố.',
    ],
    estimatedTime: 'Không phải thủ tục đăng ký; đây là nội dung cần đọc trước khi đi xe. Nếu bị lập giấy, hãy xử lý đúng hạn ghi trên thông báo.',
    fees: [
      'NPA đã công bố bảng 反則行為 và 反則金 cho xe đạp/軽車両; số tiền phụ thuộc đúng loại vi phạm.',
      'Ví dụ thường gặp như 携帯電話使用等（保持）, 信号無視, 通行区分違反 có mức khác nhau; mở bảng NPA thay vì nghe truyền miệng.',
      'Một số hành vi nghiêm trọng có thể không chỉ là blue ticket mà bị xử lý theo thủ tục nghiêm hơn.',
    ],
    documentsChecklist: [
      { label: 'Xe có phanh hoạt động tốt', required: true },
      { label: 'Đèn xe dùng được ban đêm', required: true },
      { label: 'Chuông/còi và phản quang nếu cần', required: false },
      { label: 'Đăng ký chống trộm xe đạp', required: false, note: 'Thường cần khi mua xe và hữu ích khi bị kiểm tra/chứng minh xe.' },
      { label: 'Bảo hiểm xe đạp', required: false, note: 'Một số địa phương yêu cầu hoặc khuyến nghị mạnh. Kiểm tra quy định nơi bạn sống.' },
    ],
    commonMistakes: [
      'Cầm điện thoại hoặc nhìn điện thoại khi đang đi xe.',
      'Vượt đèn đỏ hoặc không dừng hẳn ở biển 止まれ.',
      'Đi ngược chiều hoặc đi sai phần đường.',
      'Đi trên vỉa hè như mặc định mà không ưu tiên người đi bộ.',
      'Đi xe sau khi uống rượu.',
      'Che ô, đeo tai nghe hoặc chở đồ khiến không quan sát/điều khiển an toàn.',
    ],
    faq: [
      {
        question: 'Dưới 16 tuổi có bị blue ticket không?',
        answer: 'Hệ thống blue ticket được nêu cho người từ 16 tuổi trở lên, nhưng người dưới 16 tuổi vẫn phải tuân thủ luật giao thông và có thể bị hướng dẫn/xử lý theo cách khác.',
      },
      {
        question: 'Xe đạp có được đi trên vỉa hè không?',
        answer: 'Nguyên tắc xe đạp đi bên trái lòng đường. Vỉa hè là ngoại lệ trong một số trường hợp và phải ưu tiên người đi bộ.',
      },
      {
        question: 'Mũ bảo hiểm có bắt buộc không?',
        answer: 'Đội mũ bảo hiểm là nghĩa vụ nỗ lực/khuyến nghị mạnh theo luật hiện hành. Người dùng nên đội để giảm rủi ro chấn thương và kiểm tra quy định địa phương.',
      },
      {
        question: 'Có nên ghi số tiền phạt cụ thể trong app không?',
        answer: 'Có thể xem bảng chính thức của NPA, nhưng không nên dựa vào con số truyền miệng. Số tiền phụ thuộc đúng lỗi ghi trên giấy và bảng đang áp dụng tại thời điểm bị xử lý.',
      },
    ],
    officialLinks: [
      { label: '自転車交通反則通告制度 — 警察庁', url: 'https://www.npa.go.jp/bureau/traffic/bicycle/info.html' },
      { label: '自転車ルール・制度 — 警察庁', url: 'https://www.npa.go.jp/bureau/traffic/bicycle/portal/system.html' },
      { label: '自転車の反則行為と反則金の額 — 警察庁', url: 'https://www.npa.go.jp/bureau/traffic/bicycle/pdf/jitensyahansokukoui.pdf' },
      { label: 'Giải thích của Chính phủ Nhật', url: 'https://www.gov-online.go.jp/article/202410/entry-6604.html' },
      { label: '罰則強化！自転車のながらスマホと酒気帯び運転 — 政府広報オンライン', url: 'https://www.gov-online.go.jp/useful/202410/video-288714.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Hiểu điểm mới từ 01/04/2026',
        description: 'Từ 01/04/2026, người từ 16 tuổi trở lên đi xe đạp vi phạm một số lỗi giao thông có thể bị áp dụng 交通反則通告制度, thường gọi là blue ticket (青切符). Nếu nộp 反則金 theo thông báo, vụ việc được xử lý theo thủ tục hành chính thay vì bị đưa thẳng sang xét xử hình sự.',
        documents: [],
        tip: 'NPA giải thích rằng cảnh sát vẫn tập trung vào vi phạm ác ý/nguy hiểm hoặc có nguy cơ gây tai nạn, nhưng người đi xe đạp không nên xem đây là lỗi nhỏ.',
      },
      {
        step: 2,
        title: 'Các lỗi dễ gặp',
        description: 'Các lỗi thường được nhắc tới gồm vượt đèn đỏ, không dừng ở biển stop, đi sai phần đường/ngược chiều, dùng điện thoại khi đi xe, đi xe không có phanh đạt chuẩn hoặc cản trở giao thông.',
        documents: [
          'Không dùng điện thoại khi đang đi xe',
          'Dừng hẳn ở biển 止まれ',
          'Đi bên trái lòng đường là nguyên tắc',
          'Bật đèn ban đêm',
        ],
        tip: 'Từ 01/11/2024, ながらスマホ và 酒気帯び運転 bằng xe đạp đã bị siết xử phạt. Nếu gây nguy hiểm, có tai nạn, uống rượu hoặc bỏ chạy, rủi ro có thể vượt khỏi blue ticket.',
        image: require('../../../../../assets/content/daily-life/ag_bicycle-rules_s2.jpg'),
        imageCaption: '止まれ — biển dừng bắt buộc, vi phạm từ 01/04/2026 có thể bị áp dụng blue ticket',
      },
      {
        step: 3,
        title: 'Quy tắc đi xe an toàn',
        description: 'Xe đạp được xem là một loại phương tiện nhẹ (軽車両). Nguyên tắc là đi bên trái lòng đường; vỉa hè là ngoại lệ và phải ưu tiên người đi bộ.',
        documents: [
          'Không chạy song song gây cản trở',
          'Không che ô khi đi xe nếu gây nguy hiểm',
          'Không đeo tai nghe làm mất khả năng nghe xung quanh',
          'Đội mũ bảo hiểm được khuyến khích mạnh',
        ],
        tip: 'Quy định chi tiết có thể khác theo địa phương, đặc biệt về bãi đỗ xe đạp và tuyến đường được phép đi trên vỉa hè.',
      },
      {
        step: 4,
        title: 'Nếu bị dừng xe',
        description: 'Giữ bình tĩnh, xuất trình giấy tờ nếu được yêu cầu và nghe giải thích của cảnh sát. Nếu nhận blue ticket/giấy thông báo, hãy đọc kỹ lỗi ghi trên giấy, hạn tạm nộp, nơi xử lý và cách nộp 反則金. Nếu không hiểu tiếng Nhật, chụp/lưu giấy và hỏi người hỗ trợ ngay trong ngày.',
        documents: [],
        tip: 'Không tranh cãi tại hiện trường nếu không hiểu tiếng Nhật. Ghi lại thông tin và hỏi người hỗ trợ/đơn vị tư vấn sau đó.',
      },
    ],
  };

export default bicycleRules2026;
