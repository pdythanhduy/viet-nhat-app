import type { AdminGuide } from '../../../../types/content';

const statusOfResidenceChange: AdminGuide = {
    id: 'status-of-residence-change',
    category: 'visa',
    lastVerified: '2026-05-07',
    priority: 'high',
    title: 'Đổi tư cách lưu trú',
    titleJp: '在留資格変更許可申請',
    icon: 'swap-horizontal',
    color: '#8E44AD',
    description:
      'Thủ tục đổi từ tư cách lưu trú hiện tại sang tư cách khác, ví dụ từ du học sang đi làm hoặc từ visa gia đình sang diện lao động phù hợp.',
    legalScope: {
      jurisdiction: 'national',
      jurisdictionNote: '在留資格変更許可申請 do ISA xét toàn quốc; thời điểm nộp và giấy tờ phụ thuộc tư cách hiện tại, tư cách muốn đổi và hoạt động thực tế.',
      sourceVerifiedAt: '2026-05-07',
      nextReviewAt: '2026-09-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Bạn muốn bắt đầu công việc/hoạt động mới trước khi có kết quả đổi tư cách.',
        'Hồ sơ có yếu tố tốt nghiệp, nghỉ học, đổi ngành, ly hôn, thu nhập thấp hoặc công ty mới chưa rõ điều kiện.',
        'Bạn sắp hết hạn lưu trú hiện tại trong lúc chờ đổi tư cách.',
      ],
    },
    quickAction: {
      deadline: 'Nộp từ khi phát sinh lý do đổi tư cách và trước ngày hết hạn lưu trú hiện tại; không để hoạt động mới đi trước tình trạng pháp lý. Hệ thống online không nhận hồ sơ vào đúng ngày hết hạn lưu trú.',
      office: 'Cục xuất nhập cảnh có thẩm quyền hoặc hệ thống online ISA nếu thuộc đối tượng được dùng.',
      doNow: [
        'Xác định tư cách mới và hoạt động dự kiến có khớp bảng ISA không.',
        'Gom giấy tờ công ty/trường/gia đình chứng minh lý do đổi.',
        'Nếu định nộp online, nộp trước ngày cuối; nếu đã đến ngày hết hạn, hỏi/nộp tại cục xuất nhập cảnh có thẩm quyền.',
        'Theo dõi hạn lưu trú hiện tại; nếu hết hạn trong lúc chờ, cần xử lý gia hạn phù hợp.',
      ],
      bring: ['Đơn 在留資格変更許可申請', 'Hộ chiếu', 'Thẻ cư trú', 'Ảnh thẻ 4cm x 3cm', 'Giấy tờ của bên tiếp nhận mới', 'Tài liệu chứng minh năng lực/lý do đổi'],
      ifLate: 'Liên hệ ISA ngay trước khi hết hạn hoặc trước khi bắt đầu hoạt động mới; quá hạn lưu trú là rủi ro nghiêm trọng.',
      officialSourceLabels: [
        '在留資格変更許可申請 — 出入国在留管理庁',
        'Online Residence Application System — ISA',
        'Thông báo sửa phí thủ tục từ 01/04/2025',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_status-change_hero.jpg'),
    heroImageCaption: 'Thủ tục đổi tư cách lưu trú tại ISA',
    whoIsThisFor: [
      'Người sắp tốt nghiệp và chuẩn bị đi làm theo diện work visa.',
      'Người đổi mục đích ở Nhật hoặc chuyển sang một tư cách lưu trú khác hẳn hiện tại.',
      'Người không còn phù hợp với điều kiện của tư cách hiện tại và cần nộp hồ sơ đổi đúng diện.',
    ],
    whenToDo: [
      'Chuẩn bị sớm trước ngày bắt đầu công việc hoặc học tập mới vì thời gian xét duyệt có thể kéo dài.',
      'Không nên tự ý làm công việc mới theo diện visa khác trước khi đổi xong hoặc chưa được phép.',
      'Nếu vừa đổi công ty vừa đổi bản chất công việc, nên kiểm tra kỹ xem có cần thủ tục này hay chỉ cần thông báo cho ISA.',
    ],
    whereToDo: [
      'Cục xuất nhập cảnh có thẩm quyền theo nơi cư trú hoặc nơi tiếp nhận hồ sơ phù hợp.',
      'Một số hồ sơ có thể chuẩn bị online nếu thuộc diện được hỗ trợ, nhưng vẫn cần theo hướng dẫn mới nhất của ISA.',
    ],
    estimatedTime:
      'Thời gian xét duyệt thay đổi theo hồ sơ, khu vực và loại tư cách mới. Nên chừa thời gian để bổ sung giấy tờ nếu bị yêu cầu.',
    fees: [
      'Nếu được cấp phép: 6.000 yên khi làm thủ tục thường, hoặc 5.500 yên nếu là online application theo mức ISA áp dụng từ 01/04/2025.',
      'Phí nộp khi nhận kết quả/cấp phép, không phải lúc mới nộp hồ sơ.',
    ],
    documentsChecklist: [
      { label: 'Đơn xin đổi tư cách lưu trú đúng mẫu', required: true },
      { label: 'Ảnh thẻ縦4cm × 横3cm', required: true, note: 'Nền trắng hoặc sáng màu đơn sắc, chụp trong 3 tháng gần nhất — bắt buộc kèm theo đơn.' },
      { label: 'Hộ chiếu và thẻ cư trú', required: true },
      { label: 'Tài liệu chứng minh lý do đổi tư cách', required: true },
      { label: 'Giấy tờ của công ty, trường hoặc cơ quan tiếp nhận mới', required: true },
      { label: 'Tài liệu chứng minh năng lực học vấn hoặc nghề nghiệp khi cần', required: false },
    ],
    commonMistakes: [
      'Nhầm giữa đổi tư cách lưu trú và gia hạn thời hạn lưu trú.',
      'Nhận việc hoặc bắt đầu công việc mới khi hồ sơ chưa rõ tình trạng pháp lý.',
      'Nộp hồ sơ thiếu giấy tờ từ công ty mới, đặc biệt phần mô tả công việc và điều kiện tuyển dụng.',
      'Để đến đúng ngày hết hạn mới định nộp online, trong khi ISA nêu online system không nhận hồ sơ vào ngày cuối.',
    ],
    faq: [
      {
        question: 'Tốt nghiệp xong đi làm có phải gia hạn visa không?',
        answer:
          'Thường không phải gia hạn cùng tư cách cũ mà là đổi từ du học sang tư cách phù hợp với công việc mới.',
      },
      {
        question: 'Đổi công ty có luôn cần đổi tư cách không?',
        answer:
          'Không phải lúc nào cũng cần. Nếu bản chất công việc vẫn nằm trong phạm vi tư cách hiện tại, có thể chỉ cần thông báo thay đổi theo quy định.',
      },
      {
        question: 'Phí đổi tư cách lưu trú hiện là bao nhiêu?',
        answer:
          'Theo ISA, khi được cấp phép hiện là 6.000 yên nếu làm thủ tục thường và 5.500 yên nếu nộp online. Kiểm tra lại bảng phí chính thức trước khi nhận kết quả.',
      },
      {
        question: 'Có thể nộp online vào đúng ngày hết hạn không?',
        answer:
          'Không. ISA nêu hệ thống online không thể dùng để nộp vào đúng ngày hết hạn lưu trú; nếu sát hạn như vậy, cần xử lý tại cục xuất nhập cảnh có thẩm quyền.',
      },
    ],
    officialLinks: [
      { label: '在留資格変更許可申請 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/16-2.html' },
      { label: 'Online Residence Application System — ISA', url: 'https://www.moj.go.jp/isa/applications/online/onlineshinsei.html' },
      { label: 'Thông báo sửa phí thủ tục từ 01/04/2025', url: 'https://www.moj.go.jp/isa/01_00518.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Xác định đúng diện mới',
        description:
          'Phải làm rõ bạn đang đổi sang tư cách nào và công việc hoặc học tập mới có đúng khung của diện đó hay không.',
        documents: [
          'Tên tư cách lưu trú mới dự kiến',
          'Mô tả công việc hoặc kế hoạch học tập mới',
          'Thông tin công ty hoặc trường tiếp nhận',
        ],
        tip: 'Nếu không chắc diện nào phù hợp, kiểm tra hướng dẫn ISA trước khi gom giấy tờ.',
      },
      {
        step: 2,
        title: 'Điền 在留資格変更許可申請書 và gom tài liệu',
        description: '**Các trường chính trên mẫu đơn** (tải PDF: https://www.moj.go.jp/isa/content/930004064.pdf — trang hướng dẫn: https://www.moj.go.jp/isa/applications/procedures/16-2.html):\n\n| Trường | Ghi như thế nào |\n|---|---|\n| 国籍・地域 | Quốc tịch: ベトナム |\n| 氏名 | Tên theo hộ chiếu (Latin) |\n| 生年月日 | Ngày/tháng/năm sinh (西暦) |\n| 住居地 | Địa chỉ khớp với 在留カード |\n| 在留資格（変更後）| Tư cách lưu trú mới muốn đổi sang |\n| 在留期間 | Để trống — ISA tự xác định |\n| 勤務先・通学先 | Tên công ty/trường mới, địa chỉ, số điện thoại |\n| 申請人の署名 | Ký tên chính chủ |\n\nKèm theo: hộ chiếu + 在留カード + ảnh **縦4cm × 横3cm**, nền trắng hoặc sáng màu đơn sắc, chụp trong 3 tháng gần nhất + giấy tờ của bên tiếp nhận (hợp đồng, thư tuyển dụng, bằng cấp tuỳ diện).',
        documents: [
          'Hộ chiếu, thẻ cư trú',
          'Mẫu đơn 在留資格変更許可申請書 — tải PDF: https://www.moj.go.jp/isa/content/930004064.pdf',
          'Ảnh縦4cm × 横3cm, nền trắng hoặc sáng màu đơn sắc, chụp trong 3 tháng gần nhất',
          'Giấy tờ của công ty hoặc trường mới',
          'Bằng cấp, chứng chỉ, hợp đồng hoặc thư tuyển dụng nếu cần',
        ],
        tip: 'Đừng chỉ nộp giấy tờ “na ná”. Hồ sơ đổi tư cách thường bị soi kỹ ở phần tính phù hợp của công việc với bằng cấp.',
      },
      {
        step: 3,
        title: 'Nộp hồ sơ và theo dõi bổ sung',
        description:
          'Sau khi nộp, phải theo dõi thư hoặc thông báo yêu cầu bổ sung giấy tờ. Nếu thiếu phản hồi, hồ sơ có thể bị kéo dài.',
        documents: ['Biên nhận hồ sơ', 'Thông tin liên lạc để nhận yêu cầu bổ sung'],
        tip: 'Không nên đi công tác dài ngày hoặc đổi địa chỉ mà quên cập nhật cách nhận thư.',
        image: require('../../../../../assets/content/daily-life/ag_status-change_s3.jpg'),
        imageCaption: 'Nộp hồ sơ đổi tư cách tại ISA — nhận phiếu hẹn và theo dõi yêu cầu bổ sung',
      },
      {
        step: 4,
        title: 'Chỉ bắt đầu theo diện mới khi tình trạng đã rõ',
        description:
          'Ngay cả khi đã được nhận vào công ty, bạn vẫn cần hiểu rõ thời điểm nào được phép làm việc theo diện mới.',
        documents: ['Thông báo kết quả từ ISA', 'Thẻ cư trú cập nhật nếu được cấp phép'],
        tip: 'Nếu công ty giục đi làm sớm, hãy xác minh lại bằng nguồn chính thức thay vì nghe miệng. Khi được cấp phép, phí hiện hành là 6.000 yên thủ tục thường hoặc 5.500 yên online.',
        image: require('../../../../../assets/content/daily-life/ag_status-change_s2.jpg'),
        imageCaption: 'Điền 在留資格変更許可申請書 và chuẩn bị hồ sơ theo diện mới',
      },
    ],
  };

export default statusOfResidenceChange;
