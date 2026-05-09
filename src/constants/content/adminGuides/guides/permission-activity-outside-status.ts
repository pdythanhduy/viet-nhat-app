import type { AdminGuide } from '../../../../types/content';

const permissionActivityOutsideStatus: AdminGuide = {
    id: 'permission-activity-outside-status',
    category: 'immigration',
    lastVerified: '2026-05-06',
    priority: 'high',
    title: 'Xin phép làm thêm ngoài tư cách lưu trú',
    titleJp: '資格外活動許可申請',
    icon: 'time',
    color: '#27AE60',
    description: 'Du học sinh, visa gia đình và một số tư cách khác cần xin phép trước khi làm việc nhận lương ngoài phạm vi tư cách lưu trú.',
    legalScope: {
      jurisdiction: 'national',
      jurisdictionNote: '資格外活動許可 là quyền do ISA cấp; trường/công ty có thể hỗ trợ nhưng không thay ISA quyết định phạm vi làm thêm.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-12-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Bạn đã đi làm trước khi có giấy phép hoặc từng vượt giới hạn giờ.',
        'Công việc dự kiến liên quan ngành bị hạn chế, công việc đêm/khu giải trí hoặc nhiều nơi làm cùng lúc.',
        'Bạn nghỉ học, chuyển trường, đổi tư cách hoặc đang gia hạn/đổi visa.',
      ],
    },
    quickAction: {
      deadline: 'Xin và được phép trước khi bắt đầu hoạt động có thu nhập ngoài phạm vi tư cách lưu trú.',
      office: 'Cục xuất nhập cảnh có thẩm quyền; online chỉ dùng trong một số trường hợp khi nộp cùng thủ tục lưu trú khác.',
      doNow: [
        'Không nhận ca làm trước khi giấy phép hợp lệ.',
        'Tính tổng giờ của tất cả nơi làm, không tính riêng từng nơi.',
        'Kiểm tra công việc có thuộc nhóm bị cấm như 風俗営業 hoặc hoạt động liên quan không.',
      ],
      bring: ['Đơn 資格外活動許可申請', 'Thẻ cư trú', 'Hộ chiếu', 'Thông tin công việc dự kiến nếu được yêu cầu'],
      ifLate: 'Dừng vi phạm, gom lịch làm/lương và hỏi ISA, trường hoặc chuyên gia trước khi tiếp tục làm.',
      officialSourceLabels: ['資格外活動許可申請 — 出入国在留管理庁', 'Du học sinh và 28 giờ/tuần', 'Gia đình lưu trú và 28 giờ/tuần'],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_part-time_hero.jpg'),
    heroImageCaption: 'Xin phép làm việc ngoài phạm vi tư cách lưu trú',
    whoIsThisFor: [
      'Du học sinh muốn làm thêm có lương.',
      'Người có visa gia đình muốn đi làm thêm.',
      'Người có tư cách lưu trú khác nhưng muốn làm hoạt động nhận lương ngoài phạm vi được phép.',
    ],
    whenToDo: [
      'Xin phép trước khi bắt đầu công việc có lương.',
      'Kiểm tra lại trước khi nhận thêm việc thứ hai, đổi công việc hoặc đổi trạng thái học tập/lưu trú.',
      'Khi gia hạn hoặc đổi visa, xác nhận quyền làm thêm có tiếp tục được ghi nhận không.',
    ],
    whereToDo: [
      'Cục xuất nhập cảnh có thẩm quyền.',
      'Một số trường hợp mới nhập cảnh có thể làm thủ tục tại sân bay theo hướng dẫn của ISA.',
      'Trường học thường có thể hướng dẫn mẫu đơn, nhưng quyền cấp phép là của ISA.',
    ],
    estimatedTime: 'Thời gian xử lý tùy hồ sơ và nơi nộp. Không nên nhận ca làm trước khi có quyền làm thêm hợp lệ.',
    fees: [
      'Thủ tục 資格外活動許可 thường không phải là khoản lệ phí cấp thẻ như gia hạn visa.',
      'Vẫn nên kiểm tra hướng dẫn ISA mới nhất trước khi nộp vì mẫu và cách nộp có thể thay đổi.',
    ],
    documentsChecklist: [
      { label: 'Đơn xin 資格外活動許可', required: true },
      { label: 'Thẻ cư trú', required: true },
      { label: 'Hộ chiếu', required: true },
      { label: 'Thẻ sinh viên hoặc giấy xác nhận đang học', required: false, note: 'Hữu ích với du học sinh nếu được yêu cầu.' },
      { label: 'Thông tin công việc dự kiến', required: false, note: 'Có thể cần nếu xin dạng cá biệt hoặc ISA yêu cầu giải thích.' },
    ],
    commonMistakes: [
      'Đi làm trước khi có giấy phép.',
      'Tính 28 giờ/tuần theo từng nơi làm thay vì tổng tất cả nơi làm.',
      'Làm quá giờ trong tuần có lịch học bình thường.',
      'Làm công việc thuộc lĩnh vực bị cấm như một số công việc liên quan 風俗営業.',
      'Tiếp tục làm thêm sau khi nghỉ học, bị thôi học hoặc tư cách lưu trú thay đổi mà không kiểm tra lại.',
    ],
    faq: [
      {
        question: '28 giờ/tuần là mỗi chỗ làm hay tổng cộng?',
        answer: 'Là tổng thời gian làm việc của tất cả nơi làm. Nếu có hai việc, phải cộng giờ của cả hai.',
      },
      {
        question: 'Kỳ nghỉ dài của du học sinh có được làm nhiều hơn không?',
        answer: 'Trong kỳ nghỉ dài theo quy định của cơ sở giáo dục, du học sinh có thể được làm tối đa 8 giờ/ngày trong phạm vi giấy phép cho phép.',
      },
      {
        question: 'Làm nhận tiền mặt có tính là làm thêm không?',
        answer: 'Có. Cách nhận lương không làm thay đổi nghĩa vụ về giấy phép, giới hạn giờ và khai báo thu nhập.',
      },
      {
        question: 'Nếu lỡ làm quá giờ thì sao?',
        answer: 'Nên dừng vi phạm, lưu lại lịch làm/lương và sớm hỏi trường, chuyên gia hoặc ISA. Việc vượt giờ có thể ảnh hưởng hồ sơ lưu trú.',
      },
    ],
    officialLinks: [
      { label: '資格外活動許可申請 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/16-8.html' },
      { label: 'Du học sinh và 28 giờ/tuần', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html' },
      { label: 'Gia đình lưu trú và 28 giờ/tuần', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00004.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Xin phép trước khi làm',
        description: 'Không nên bắt đầu làm việc nhận lương trước khi được cấp 資格外活動許可 nếu tư cách lưu trú của bạn không cho phép hoạt động đó.',
        documents: [
          'Đơn xin 資格外活動許可',
          'Thẻ cư trú',
          'Hộ chiếu',
          'Thông tin công việc dự kiến nếu được yêu cầu',
        ],
        tip: 'Làm việc không phép hoặc vượt giới hạn giờ có thể ảnh hưởng nghiêm trọng đến gia hạn/chuyển visa.',
        image: require('../../../../../assets/content/daily-life/ag_outside-activity_s1.jpg'),
        imageCaption: 'Nộp đơn xin 資格外活動許可 tại ISA trước khi bắt đầu làm thêm',
      },
      {
        step: 2,
        title: 'Tuân thủ giới hạn giờ',
        description: '許可 dạng bao quát thường giới hạn 28 giờ/tuần. Du học sinh trong kỳ nghỉ dài theo quy định có thể được làm tối đa 8 giờ/ngày trong phạm vi cho phép.',
        documents: [],
        tip: 'Tính tổng giờ của tất cả nơi làm, không phải từng nơi riêng lẻ.',
      },
      {
        step: 3,
        title: 'Tránh công việc bị cấm',
        description: 'Một số ngành như 風俗営業 và công việc liên quan có thể bị cấm dù có giấy phép làm thêm.',
        documents: [],
        tip: 'Nếu không chắc công việc có phù hợp không, hãy hỏi ISA trước khi ký hợp đồng.',
      },
    ],
  };

export default permissionActivityOutsideStatus;
