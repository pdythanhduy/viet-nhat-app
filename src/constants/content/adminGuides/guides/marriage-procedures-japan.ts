import type { AdminGuide } from '../../../../types/content';

const marriageProceduresJapan: AdminGuide = {
    id: 'marriage-procedures-japan',
    category: 'immigration',
    lastVerified: '2026-04-25',
    priority: 'normal',
    title: 'Thủ tục kết hôn tại Nhật',
    titleJp: '婚姻届・在日外国人の結婚手続き',
    icon: 'heart-circle-outline',
    color: '#C0392B',
    description: 'Hướng dẫn đăng ký kết hôn tại Nhật cho cặp Việt-Việt và Việt-Nhật. Cần làm thủ tục ở cả Nhật (municipal office) lẫn phía Việt Nam (Đại sứ quán hoặc địa phương) để hôn nhân được công nhận ở cả hai nước.',
    legalScope: {
      jurisdiction: 'mixed',
      jurisdictionNote: '婚姻届 tại Nhật do municipal office xử lý theo 民法/戸籍法; ghi nhận phía Việt Nam do cơ quan lãnh sự Việt Nam hoặc cơ quan hộ tịch Việt Nam; đổi tư cách lưu trú sau kết hôn là thủ tục ISA riêng.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-12-01',
      riskLevel: 'medium',
      whenToAskExpert: [
        'Một bên từng ly hôn, mất giấy tờ hộ tịch, tên trên giấy tờ Việt-Nhật không khớp hoặc cần hợp pháp hóa lãnh sự.',
        'Bạn cần đổi sang 日本人の配偶者等, 永住者の配偶者等 hoặc hồ sơ vợ/chồng có yếu tố thu nhập/địa chỉ phức tạp.',
        'Bạn muốn hôn nhân được công nhận ở cả Nhật và Việt Nam nhưng không rõ nên đăng ký bên nào trước.',
      ],
    },
    quickAction: {
      deadline: 'Không có hạn nộp chung cho 婚姻届, nhưng nếu cần đổi tư cách lưu trú hoặc sinh con sắp tới thì nên hoàn tất đăng ký trước các thủ tục đó.',
      office: 'Municipal office tại Nhật cho 婚姻届; Đại sứ quán/Tổng lãnh sự quán Việt Nam cho ghi chú hoặc đăng ký phía Việt Nam; ISA nếu đổi tư cách lưu trú.',
      doNow: [
        'Hỏi municipal office nơi nộp về giấy tờ nước ngoài, bản dịch và chứng nhận cần thiết.',
        'Sau khi được nhận 婚姻届, xin 婚姻受理証明書 để dùng cho hồ sơ Việt Nam và visa.',
        'Kiểm tra riêng thủ tục ghi chú/đăng ký với cơ quan Việt Nam để tránh chỉ hợp lệ một phía.',
      ],
      bring: ['婚姻届 có 2 nhân chứng', 'Hộ chiếu và thẻ cư trú', 'Giấy xác nhận tình trạng hôn nhân/độc thân và bản dịch', '戸籍謄本 nếu có bên Nhật và nộp ngoài 本籍地'],
      ifLate: 'Nếu đã kết hôn một phía nhưng chưa ghi nhận phía còn lại, làm bổ sung càng sớm càng tốt trước khi nộp visa hoặc khai sinh con.',
      officialSourceLabels: [
        '婚姻届 — 法務省',
        '在留資格変更許可申請 — 出入国在留管理庁',
        'Lãnh sự — Đại sứ quán Việt Nam tại Nhật',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_marriage-jp_hero.jpg'),
    heroImageCaption: 'Đăng ký kết hôn tại Nhật — thủ tục 婚姻届 và công nhận hai chiều',
    whoIsThisFor: [
      'Hai người Việt Nam đang sống tại Nhật và muốn đăng ký kết hôn.',
      'Cặp đôi một người Việt, một người Nhật đang sống tại Nhật.',
      'Người Việt đã kết hôn ở Việt Nam và muốn đăng ký hôn nhân tại Nhật để hợp lệ hóa ở cả hai nước.',
    ],
    whenToDo: [
      'Không có hạn định — làm khi cả hai đã sẵn sàng về giấy tờ.',
      'Nếu một người cần visa gia đình (日本人の配偶者等 hoặc 永住者の配偶者等): cần hoàn tất đăng ký kết hôn ở Nhật trước khi nộp đơn đổi tư cách lưu trú.',
      'Nếu muốn đăng ký khai sinh con trong tương lai: hôn nhân cần được công nhận ở cả Nhật lẫn Việt Nam.',
    ],
    whereToDo: [
      'Municipal office nơi một trong hai người cư trú hoặc nơi có hộ tịch của phía người Nhật.',
      'Đại sứ quán hoặc Tổng lãnh sự quán Việt Nam tại Nhật: đăng ký hoặc ghi chú hôn nhân để phía Việt Nam công nhận.',
      'ISA: hỏi thủ tục đổi tư cách lưu trú nếu sau kết hôn cần chuyển sang diện vợ/chồng.',
    ],
    documentsChecklist: [
      { label: '婚姻届 có chữ ký hai người và hai nhân chứng', required: true },
      { label: 'Hộ chiếu của cả hai', required: true },
      { label: 'Thẻ cư trú của người nước ngoài', required: true },
      {
        label: 'Giấy xác nhận tình trạng hôn nhân từ Việt Nam',
        required: true,
        note: 'Cần kiểm tra yêu cầu hợp pháp hóa, bản dịch và thời hạn sử dụng với municipal office.',
      },
      {
        label: '戸籍謄本 của phía người Nhật',
        required: false,
        note: 'Có thể cần nếu nộp ở nơi khác 本籍地.',
      },
      {
        label: '婚姻受理証明書',
        required: false,
        note: 'Xin sau khi nộp thành công để dùng cho thủ tục phía Việt Nam và visa.',
      },
    ],
    commonMistakes: [
      'Không hỏi municipal office trước nên thiếu giấy tờ hoặc bản dịch.',
      'Nộp 婚姻届 xong nhưng quên đăng ký hoặc ghi chú với phía Việt Nam.',
      'Không xin 婚姻受理証明書 ngay sau khi hồ sơ được nhận.',
      'Tưởng kết hôn tự động đổi visa; thực tế phải nộp thủ tục 在留資格変更 nếu cần.',
      'Không kiểm tra yêu cầu đặt hẹn tại Đại sứ quán hoặc Tổng lãnh sự quán Việt Nam trước khi đi.',
    ],
    faq: [
      {
        question: 'Kết hôn tại Nhật xong có tự động được công nhận tại Việt Nam không?',
        answer: 'Không nên mặc định như vậy. Sau khi 婚姻届 được nhận tại Nhật, cần làm thủ tục đăng ký hoặc ghi chú hôn nhân với cơ quan Việt Nam theo hướng dẫn của Đại sứ quán hoặc Tổng lãnh sự quán Việt Nam.',
      },
      {
        question: 'Có cần hai nhân chứng trên 婚姻届 không?',
        answer: 'Có. 婚姻届 cần chữ ký của hai nhân chứng trưởng thành. Nhân chứng có thể là bạn bè hoặc đồng nghiệp, không nhất thiết là người Nhật.',
      },
      {
        question: 'Kết hôn xong visa có tự đổi sang vợ/chồng không?',
        answer: 'Không. Kết hôn và đổi tư cách lưu trú là hai thủ tục khác nhau. Nếu cần đổi sang 日本人の配偶者等 hoặc diện vợ/chồng khác, phải nộp hồ sơ 在留資格変更 tại ISA.',
      },
    ],
    officialLinks: [
      { label: '婚姻届 — 法務省', url: 'https://www.moj.go.jp/ONLINE/FAMILYREGISTER/5-2' },
      { label: '在留資格変更許可申請 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/16-2.html' },
      { label: 'Lãnh sự — Đại sứ quán Việt Nam tại Nhật', url: 'https://vnembassy-jp.org/ja/%E7%B5%90%E5%A9%9A%E5%B1%8A' },
      { label: 'Tổng Lãnh sự quán VN tại Osaka', url: 'https://vnconsulate-osaka.org/en/marriage-procedures' },
    ],
    steps: [
      {
        step: 1,
        title: 'Chuẩn bị giấy tờ phía Việt Nam',
        description: 'Giấy tờ từ phía Việt Nam cần được hợp lệ hóa (合法化・アポスティーユ) hoặc chứng nhận bởi Đại sứ quán Nhật tại Việt Nam trước khi dùng ở Nhật.\n\nVới người Việt cần có:\n• Giấy xác nhận tình trạng hôn nhân (独身証明書 / Giấy xác nhận chưa kết hôn) — cấp tại UBND xã/phường nơi thường trú ở VN, sau đó qua công chứng và hợp pháp hóa lãnh sự tại Bộ Ngoại giao VN.\n• Hộ chiếu còn hiệu lực.\n• Tùy municipal office: có thể cần bản dịch tiếng Nhật có công chứng.',
        documents: [
          'Hộ chiếu (cả hai)',
          'Giấy xác nhận tình trạng hôn nhân từ VN (đã hợp pháp hóa lãnh sự)',
          'Bản dịch tiếng Nhật các giấy tờ VN (nếu municipal office yêu cầu)',
          'Thẻ cư trú 在留カード (người Việt đang sống ở Nhật)',
        ],
        tip: 'Hỏi trực tiếp municipal office về danh sách giấy tờ cụ thể trước — yêu cầu có thể khác nhau giữa các quận/thành phố. Một số nơi chấp nhận bản dịch tự làm kèm tuyên bố dịch đúng, nơi khác yêu cầu dịch thuật viên có chứng nhận.',
      },
      {
        step: 2,
        title: 'Nộp 婚姻届 tại municipal office Nhật',
        description: '婚姻届 (đơn đăng ký kết hôn) là mẫu chuẩn, lấy miễn phí tại bất kỳ municipal office nào. Cả hai người phải ký tên và đóng dấu (hoặc ký tay thay con dấu nếu là người nước ngoài). Cần thêm hai nhân chứng người lớn ký vào đơn — có thể là bạn bè hoặc đồng nghiệp, không nhất thiết phải là người Nhật.\n\nNộp tại municipal office nơi một trong hai người đăng ký cư trú (住所地) hoặc nơi người Nhật có hộ tịch (本籍地) nếu có bên Nhật. Xử lý thường trong ngày nếu đủ giấy tờ.',
        documents: [
          '婚姻届 đã điền đầy đủ và có chữ ký hai nhân chứng',
          'Hộ chiếu (cả hai)',
          '在留カード (người nước ngoài)',
          '戸籍謄本 (người Nhật — lấy tại municipal office nơi có hộ tịch nếu nộp ở nơi khác)',
          'Giấy xác nhận tình trạng hôn nhân từ VN đã hợp pháp hóa (người Việt)',
        ],
        tip: 'Sau khi 婚姻届 được chấp nhận, xin ngay 婚姻受理証明書 (giấy xác nhận đã đăng ký kết hôn tại Nhật) — cần cho bước đăng ký tại Đại sứ quán VN và cho thủ tục visa sau này.',
      },
      {
        step: 3,
        title: 'Đăng ký tại Đại sứ quán Việt Nam tại Nhật',
        description: 'Để hôn nhân có giá trị pháp lý tại Việt Nam, cần đăng ký tại Đại sứ quán VN (Tokyo) hoặc Tổng lãnh sự quán VN (Osaka, Fukuoka) tùy khu vực cư trú.\n\nNộp hồ sơ gồm: 婚姻受理証明書 đã nhận ở bước 2 kèm bản dịch tiếng Việt, hộ chiếu cả hai, 在留カード và các mẫu đơn của Đại sứ quán. Đại sứ quán sẽ ghi nhận và thông báo về UBND địa phương ở VN để cập nhật hộ tịch.',
        documents: [
          '婚姻受理証明書 (bản gốc + bản dịch tiếng Việt)',
          'Hộ chiếu cả hai (bản gốc + bản sao)',
          '在留カード',
          'Ảnh thẻ 4×6 cm (theo yêu cầu Đại sứ quán)',
          'Các mẫu đơn theo hướng dẫn cụ thể của Đại sứ quán VN tại Nhật',
        ],
        tip: 'Đặt lịch hẹn trước tại Đại sứ quán VN — không nhận trực tiếp không hẹn. Kiểm tra trang chính thức của Đại sứ quán VN tại Tokyo hoặc Tổng lãnh sự quán VN tại Osaka để biết quy trình hiện hành, vì có thể thay đổi.',
      },
      {
        step: 4,
        title: 'Cập nhật tư cách lưu trú nếu cần',
        description: 'Sau khi kết hôn, nếu một bên cần đổi tư cách lưu trú:\n\n• Người Việt kết hôn với người Nhật: có thể xin đổi sang 日本人の配偶者等 — tư cách không giới hạn hoạt động và dễ gia hạn hơn nhiều so với tư cách lao động.\n\n• Người Việt kết hôn với người Việt có 永住者: có thể xin 永住者の配偶者等.\n\n• Người Việt kết hôn với người Việt đang đi làm: không tự động thay đổi tư cách — mỗi người giữ tư cách lưu trú riêng.\n\nNộp đơn đổi tư cách (在留資格変更許可申請) tại ISA với hồ sơ kết hôn đầy đủ.',
        documents: [
          '婚姻受理証明書',
          'Hộ chiếu và 在留カード của cả hai',
          'Chứng minh thu nhập của người bảo lãnh (nếu đổi sang diện gia đình)',
          'Chứng minh nơi ở chung',
        ],
        tip: 'Đổi sang 日本人の配偶者等 không tự động — phải nộp đơn và được ISA phê duyệt. Trong thời gian chờ, giữ tư cách lưu trú hiện tại và không để hết hạn.',
      },
    ],
  };

export default marriageProceduresJapan;
