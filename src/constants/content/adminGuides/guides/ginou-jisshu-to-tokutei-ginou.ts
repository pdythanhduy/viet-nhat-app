import type { AdminGuide } from '../../../../types/content';

const ginouJisshuToTokuteiGinou: AdminGuide = {
    id: 'ginou-jisshu-to-tokutei-ginou',
    category: 'visa',
    lastVerified: '2026-05-06',
    priority: 'normal',
    title: 'Chuyển từ 技能実習 sang 特定技能',
    titleJp: '技能実習から特定技能への移行手続き',
    icon: 'swap-horizontal',
    color: '#1E8449',
    description: 'Hướng dẫn thực tế các bước chuyển đổi tư cách lưu trú từ 技能実習 sang 特定技能1号 — bao gồm điều kiện miễn thi, quy trình hồ sơ và thời điểm nộp. Khác với guide tổng quan về luật 育成就労 (xem guide riêng).',
    legalScope: {
      jurisdiction: 'national',
      jurisdictionNote: 'Chuyển sang 特定技能 là thủ tục ISA; điều kiện ngành, kỳ thi và hỗ trợ phụ thuộc chế độ 特定技能 và cơ quan/tổ chức của từng lĩnh vực.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-10-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Ngành/công việc 技能実習 đã hoàn thành không khớp với công việc 特定技能 dự kiến.',
        'Visa 技能実習 sắp hết hạn nhưng công ty tiếp nhận chưa có 支援計画 hoặc hồ sơ phía công ty.',
        'Bạn muốn dùng 特定活動 tạm thời trong thời gian chuẩn bị chuyển 特定技能.',
      ],
    },
    quickAction: {
      deadline: 'Chuẩn bị trước khi 技能実習 hết hạn, thực tế nên bắt đầu ít nhất 3-4 tháng trước ngày hết hạn.',
      office: 'Công ty tiếp nhận/登録支援機関 chuẩn bị hồ sơ hỗ trợ; ISA xét 在留資格変更; tổ chức thi từng ngành xử lý kỳ thi.',
      doNow: [
        'Đối chiếu ngành 技能実習 đã hoàn thành với lĩnh vực 特定技能 muốn chuyển.',
        'Xác nhận có được miễn thi kỹ năng/tiếng Nhật hay phải thi.',
        'Yêu cầu công ty tiếp nhận chuẩn bị hợp đồng, 支援計画 và tài liệu phía công ty trước khi nộp ISA.',
      ],
      bring: ['Hộ chiếu và thẻ cư trú', 'Hợp đồng 特定技能', '支援計画書', '修了証明書 nếu dùng miễn thi', 'Kết quả thi kỹ năng/tiếng Nhật nếu cần'],
      ifLate: 'Nếu còn ít ngày đến hạn visa, ưu tiên hỏi ISA ngay về phương án nộp/chờ kết quả; không tự ý làm việc ngoài phạm vi tư cách hiện tại.',
      officialSourceLabels: [
        '特定技能制度 — 出入国在留管理庁',
        '技能実習から特定技能への移行 — 出入国在留管理庁',
        '在留資格「特定技能」— 出入国在留管理庁',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_titp-ssw_hero.jpg'),
    heroImageCaption: '技能実習から特定技能へ - kiểm tra điều kiện chuyển tư cách trước khi hết hạn',
    whoIsThisFor: [
      'Thực tập sinh 技能実習 đang chuẩn bị hết hợp đồng và muốn tiếp tục ở lại Nhật làm việc.',
      'Người đã hoàn thành 技能実習2号 hoặc 3号 và đủ điều kiện chuyển sang 特定技能1号 mà không cần thi.',
      'Thực tập sinh muốn hiểu cụ thể mình cần thi gì, nộp gì và nộp ở đâu — không chỉ biết "có thể chuyển được".',
    ],
    whenToDo: [
      'Nộp đơn trước khi 技能実習 hết hạn — không được để hết hạn rồi mới chuyển.',
      'Nên chuẩn bị hồ sơ ít nhất 3–4 tháng trước ngày 技能実習 hết hạn để có đủ thời gian thi và xử lý hồ sơ ISA.',
      'Nếu đã hoàn thành 技能実習2号 cùng ngành, có thể nộp ngay — không cần đợi hết thêm thời gian.',
    ],
    whereToDo: [
      'Công ty tiếp nhận 特定技能 hoặc 登録支援機関: xác nhận hợp đồng, kế hoạch hỗ trợ và hồ sơ phía công ty.',
      'Cục xuất nhập cảnh (ISA) có thẩm quyền theo nơi cư trú: nộp 在留資格変更許可申請.',
      'Tổ chức thi của từng ngành 特定技能: đăng ký thi kỹ năng nếu không được miễn.',
      'Đơn vị quản lý/監理団体 hoặc công ty thực tập cũ: xin giấy chứng minh đã hoàn thành 技能実習 nếu cần.',
    ],
    documentsChecklist: [
      { label: '在留資格変更許可申請書', required: true },
      { label: 'Hộ chiếu, 在留カード và ảnh thẻ', required: true },
      { label: 'Hợp đồng lao động với công ty tiếp nhận 特定技能', required: true },
      { label: '支援計画書', required: true, note: 'Thường do công ty tiếp nhận hoặc 登録支援機関 chuẩn bị.' },
      { label: '修了証明書 hoặc giấy tờ chứng minh hoàn thành 技能実習', required: false, note: 'Cần nếu dùng điều kiện miễn thi.' },
      { label: 'Kết quả thi kỹ năng và tiếng Nhật', required: false, note: 'Cần nếu không thuộc diện miễn theo ngành/công việc tương ứng.' },
      { label: 'Tài liệu phía công ty theo checklist ISA/特定技能', required: true, note: 'Khác nhau theo ngành và loại hồ sơ.' },
    ],
    commonMistakes: [
      'Tưởng hoàn thành 技能実習 là tự động được chuyển, dù ngành/công việc 特定技能 không khớp.',
      'Để 技能実習 hết hạn rồi mới chuẩn bị hồ sơ chuyển tư cách.',
      'Ký hợp đồng với công ty chưa chuẩn bị được 支援計画 hoặc hồ sơ tiếp nhận.',
      'Đổi công ty tiếp nhận trong thời gian chuẩn bị nhưng không kiểm tra lại hồ sơ ISA.',
      'Tưởng 特定活動 6 tháng để chuẩn bị chuyển 特定技能 là quyền tự động; đây cũng là hồ sơ phải được ISA cho phép và có điều kiện.',
    ],
    faq: [
      {
        question: 'Hoàn thành 技能実習2号 thì có được miễn thi không?',
        answer: 'Có thể được miễn nếu công việc/ngành chuyển sang 特定技能1号 tương ứng với nội dung 技能実習 đã hoàn thành. Nếu không khớp, thường phải thi kỹ năng và chứng minh tiếng Nhật theo yêu cầu ngành.',
      },
      {
        question: 'Có được tiếp tục làm việc khi hồ sơ chuyển đang xét không?',
        answer: 'Chỉ được làm trong phạm vi tư cách lưu trú hoặc 指定書 hiện có cho phép. Nếu cần dùng 特定活動 6 tháng để chuẩn bị chuyển 特定技能1号, phải nộp và được ISA cho phép theo điều kiện riêng.',
      },
      {
        question: '特定技能1号 có ở Nhật vô thời hạn được không?',
        answer: 'Không. 特定技能1号 có giới hạn tổng thời gian lưu trú theo quy định của chế độ này. Muốn tiếp tục lâu dài cần kiểm tra đường sang 特定技能2号 hoặc tư cách lưu trú khác phù hợp.',
      },
    ],
    officialLinks: [
      { label: '特定技能制度 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/ssw/index.html' },
      { label: '技能実習から特定技能への移行 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/ssw/10_00025.html' },
      { label: '在留資格「特定技能」— 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Kiểm tra bạn có được miễn thi không',
        description: 'ISA và 厚生労働省 quy định hai trường hợp miễn thi kỹ năng và tiếng Nhật khi chuyển sang 特定技能1号:\n\nTrường hợp 1 — Miễn cả hai bài thi: Đã hoàn thành 技能実習2号 CÙNG ngành/công việc sẽ làm ở 特定技能1号. "Cùng ngành" được xác định theo danh sách đối chiếu chính thức của từng ngành (分野別協議会).\n\nTrường hợp 2 — Miễn thi tiếng Nhật: Có chứng chỉ JLPT N4 trở lên hoặc JFT-Basic đạt A2. Vẫn phải thi kỹ năng nghề nếu không thuộc trường hợp 1.\n\nNếu không thuộc cả hai: phải thi đủ cả kỹ năng nghề (技能評価試験) lẫn tiếng Nhật.',
        documents: [],
        tip: 'Kiểm tra danh sách lĩnh vực 特定技能1号 chính thức trước khi thi hoặc ký hợp đồng. Từ 2026, hệ thống 特定技能1号 có 16 lĩnh vực, gồm 介護, ビルクリーニング, 工業製品製造業, 建設, 造船・舶用工業, 自動車整備, 航空, 宿泊, 自動車運送業, 鉄道, 農業, 漁業, 飲食料品製造業, 外食業, 林業 và 木材産業.',
      },
      {
        step: 2,
        title: 'Thi kỹ năng và tiếng Nhật (nếu cần)',
        description: 'Thi kỹ năng nghề (技能評価試験): tổ chức bởi cơ quan của từng ngành, lịch thi và địa điểm khác nhau. Đăng ký qua trang chính thức của ngành (ví dụ: FPA cho thực phẩm, JAC cho xây dựng). Thi thường bằng tiếng Nhật — một số ngành có hỗ trợ tiếng Việt trong phòng thi.\n\nThi tiếng Nhật: JFT-Basic (Japan Foundation — dễ hơn) hoặc JLPT N4 trở lên. JFT-Basic được tổ chức nhiều lần/năm tại nhiều địa điểm, bao gồm Việt Nam.',
        documents: [
          'Giấy tờ tùy thân (thẻ cư trú hoặc passport) khi dự thi',
        ],
        tip: 'JFT-Basic và JLPT là hai bài thi độc lập — đỗ một bài không đồng nghĩa đỗ bài kia. Lịch thi JFT-Basic công bố trên trang Japan Foundation; đăng ký sớm vì chỗ thi có giới hạn.',
      },
      {
        step: 3,
        title: 'Chuẩn bị hồ sơ chuyển đổi tư cách',
        description: 'Hồ sơ nộp tại ISA gồm:\n• Đơn 在留資格変更許可申請\n• Hợp đồng lao động mới với công ty tiếp nhận 特定技能 (đã đăng ký với cơ quan liên quan)\n• Kế hoạch hỗ trợ (支援計画書) — do công ty hoặc tổ chức đăng ký hỗ trợ (登録支援機関) lập\n• Bằng chứng hoàn thành 技能実習2号 (giấy 修了証明書) hoặc kết quả thi kỹ năng + tiếng Nhật\n• Thẻ cư trú và hộ chiếu\n• Giấy tờ từ phía công ty: đăng ký doanh nghiệp, hồ sơ tài chính v.v. (công ty chuẩn bị)',
        documents: [
          'Đơn 在留資格変更許可申請',
          'Hợp đồng lao động với công ty tiếp nhận 特定技能',
          '支援計画書',
          '修了証明書 (nếu hoàn thành 技能実習2号) hoặc kết quả thi kỹ năng + tiếng Nhật',
          'Thẻ cư trú và hộ chiếu',
        ],
        tip: 'Công ty tiếp nhận 特定技能 phải là công ty đã được cơ quan ngành liên quan xác nhận — không thể chuyển sang công ty ngẫu nhiên. Nếu công ty cũ muốn chuyển bạn sang 特定技能, họ cần làm thủ tục đăng ký trước.',
      },
      {
        step: 4,
        title: 'Nộp hồ sơ và quản lý thời hạn',
        description: 'Nộp tại ISA khi 技能実習 còn hiệu lực. Thời gian xử lý thường 1–2 tháng. Nếu 技能実習 hết hạn trong khi đang chờ ISA xử lý, bạn nhận được 特定活動 tạm thời (giấy 指定書 ghi rõ) cho phép tiếp tục làm việc hợp pháp trong thời gian chờ kết quả.\n\n特定技能1号 có tổng thời hạn tối đa 5 năm (cộng dồn), không gia hạn vô hạn. Để tiếp tục sau 5 năm: phải đủ điều kiện 特定技能2号 (yêu cầu cao hơn, không giới hạn thời gian) hoặc chuyển sang tư cách khác như 永住.',
        documents: [],
        tip: 'Từ năm 2027 với hệ thống 育成就労, người hoàn thành 育成就労 cùng ngành sẽ chuyển sang 特定技能1号 theo quy trình mới — theo dõi thông báo ISA để cập nhật khi đến gần mốc 01/04/2027.',
      },
    ],
  };

export default ginouJisshuToTokuteiGinou;
