import type { AdminGuide } from '../../../../types/content';

const visaStatusOverview: AdminGuide = {
    id: 'visa-status-overview',
    category: 'visa',
    lastVerified: '2026-05-06',
    priority: 'high',
    title: 'Các loại visa / tư cách lưu trú',
    titleJp: '在留資格の種類',
    icon: 'albums',
    color: '#185FA5',
    description: 'Tổng quan các tư cách lưu trú phổ biến với người Việt ở Nhật. Nội dung này chỉ giúp định hướng, không thay thế tư vấn hồ sơ cá nhân.',
    legalScope: {
      jurisdiction: 'national',
      jurisdictionNote: 'Tư cách lưu trú do ISA quản lý toàn quốc; guide này chỉ định hướng phạm vi hoạt động, không thay cho quyết định hồ sơ cá nhân.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-12-01',
      riskLevel: 'medium',
      whenToAskExpert: [
        'Bạn chuẩn bị đổi việc, đổi ngành, mở công ty, nghỉ học hoặc chuyển sang hoạt động khác với hiện tại.',
        'Thẻ cư trú còn hạn nhưng mục đích lưu trú thực tế đã thay đổi.',
        'Bạn không rõ tư cách hiện tại có cho phép làm công việc dự kiến không.',
      ],
    },
    quickAction: {
      deadline: 'Kiểm tra trước khi ký hợp đồng, đổi trường, đổi công ty, kết hôn/ly hôn, mở kinh doanh hoặc nộp hồ sơ lưu trú.',
      office: 'Trang ISA, cục xuất nhập cảnh, hoặc chuyên gia 行政書士/luật sư nếu hồ sơ phức tạp.',
      doNow: [
        'Đọc mục 在留資格, 在留期間 và 就労制限の有無 trên thẻ cư trú.',
        'So hoạt động thực tế với bảng tư cách lưu trú chính thức của ISA.',
        'Nếu hoạt động mới khác phạm vi hiện tại, xem guide đổi tư cách lưu trú trước khi bắt đầu.',
      ],
      bring: ['Thẻ cư trú', 'Hộ chiếu', 'Hợp đồng lao động/giấy nhập học/giấy tờ gia đình nếu có', 'Mô tả hoạt động dự kiến'],
      ifLate: 'Nếu đã bắt đầu hoạt động có thể nằm ngoài tư cách, dừng tự suy đoán và hỏi ISA/chuyên gia trước khi tiếp tục hoặc nộp hồ sơ.',
      officialSourceLabels: ['Tư cách lưu trú — 出入国在留管理庁', 'Bảng tư cách lưu trú — 出入国在留管理庁'],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_visa-overview_hero.jpg'),
    heroImageCaption: 'Các diện tư cách lưu trú phổ biến cho người Việt tại Nhật',
    whoIsThisFor: [
      'Người mới sang Nhật muốn hiểu mục 在留資格 trên thẻ cư trú.',
      'Du học sinh, người đi làm, gia đình lưu trú hoặc người chuẩn bị đổi việc/đổi trường/đổi hoạt động.',
      'Người không chắc mình có được làm thêm, đổi việc hoặc làm công việc mới theo visa hiện tại hay không.',
    ],
    whenToDo: [
      'Ngay khi nhận thẻ cư trú để hiểu phạm vi hoạt động được phép.',
      'Trước khi ký hợp đồng lao động, đổi công ty, nghỉ học, chuyển trường, kết hôn/ly hôn hoặc mở kinh doanh.',
      'Trước khi gia hạn hoặc đổi tư cách lưu trú để tránh chuẩn bị nhầm loại hồ sơ.',
    ],
    whereToDo: [
      'Kiểm tra thông tin chính thức trên trang ISA.',
      'Hỏi cục xuất nhập cảnh, trường, công ty, cơ quan hỗ trợ hoặc chuyên gia 行政書士/luật sư khi hồ sơ phức tạp.',
      'Xem mặt trước thẻ cư trú: 在留資格, 在留期間, 就労制限の有無.',
    ],
    estimatedTime: 'Đây là nội dung định hướng. Nếu cần đổi/gia hạn visa, thời gian xử lý phụ thuộc loại hồ sơ và cục xuất nhập cảnh.',
    fees: [
      'Đọc/tra cứu thông tin không mất phí.',
      'Gia hạn, đổi tư cách hoặc xin giấy chứng nhận có thể có lệ phí theo bảng phí chính thức của ISA tại thời điểm nhận kết quả.',
    ],
    documentsChecklist: [
      { label: 'Thẻ cư trú', required: true, note: 'Kiểm tra tư cách lưu trú, thời hạn và giới hạn làm việc.' },
      { label: 'Hộ chiếu', required: false },
      { label: 'Hợp đồng lao động/giấy nhập học/giấy tờ gia đình', required: false, note: 'Dùng để đối chiếu hoạt động thực tế với tư cách lưu trú.' },
      { label: 'Mô tả công việc hoặc kế hoạch hoạt động mới', required: false, note: 'Quan trọng khi đổi việc/đổi ngành.' },
    ],
    commonMistakes: [
      'Gọi mọi tư cách lưu trú là “visa” rồi bỏ qua phạm vi hoạt động được phép.',
      'Nghĩ visa còn hạn thì có thể đổi sang bất kỳ công việc nào.',
      'Du học sinh/gia đình lưu trú đi làm mà chưa có 資格外活動許可.',
      'Nghỉ học hoặc nghỉ việc lâu nhưng không kiểm tra nghĩa vụ khai báo và ảnh hưởng lưu trú.',
      'Dựa vào kinh nghiệm của người khác dù tư cách lưu trú, ngành và hồ sơ khác nhau.',
    ],
    faq: [
      {
        question: 'Visa và tư cách lưu trú có giống nhau không?',
        answer: 'Trong đời sống thường gọi chung là visa, nhưng ở Nhật sau khi nhập cảnh, điều quan trọng trên thẻ cư trú là 在留資格 và 在留期間. App dùng từ “visa” để người dùng dễ hiểu nhưng luôn đối chiếu với tên chính thức.',
      },
      {
        question: 'Đổi công ty có cần đổi visa không?',
        answer: 'Không phải lúc nào cũng cần đổi tư cách, nhưng có thể cần khai báo với ISA và công việc mới phải phù hợp với tư cách hiện tại. Nếu nội dung công việc khác nhiều, nên hỏi ISA trước.',
      },
      {
        question: 'Không chắc mình được làm gì thì xem ở đâu?',
        answer: 'Xem thẻ cư trú, trang ISA và hỏi cục xuất nhập cảnh hoặc chuyên gia. Đừng chỉ dựa vào tên chức vụ trên hợp đồng.',
      },
    ],
    officialLinks: [
      { label: 'Tư cách lưu trú — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/status/index.html' },
      { label: 'Bảng tư cách lưu trú — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/status/qaq5.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Nhóm visa hoạt động',
        description: 'Nhóm này cho phép ở Nhật để thực hiện hoạt động cụ thể như làm việc, học tập, nghiên cứu hoặc hoạt động gia đình. Bạn chỉ được làm trong phạm vi tư cách lưu trú cho phép.',
        documents: [
          '技術・人文知識・国際業務: công việc chuyên môn, kỹ thuật, văn phòng, quốc tế',
          '留学: học tập là mục đích chính; làm thêm cần 資格外活動許可',
          '家族滞在: phụ thuộc người bảo lãnh; làm thêm cần 資格外活動許可',
          '特定技能: lao động trong ngành được chỉ định',
        ],
        tip: 'Tên công việc trên hợp đồng chưa đủ. Nội dung công việc thực tế phải phù hợp với tư cách lưu trú.',
      },
      {
        step: 2,
        title: 'Nhóm visa thân phận/địa vị',
        description: 'Nhóm này dựa trên quan hệ thân phận hoặc địa vị pháp lý, ví dụ vĩnh trú, vợ/chồng người Nhật, vợ/chồng vĩnh trú, định trú.',
        documents: [
          '永住者: vĩnh trú, không giới hạn hoạt động nhưng thẻ cư trú vẫn có hạn hiệu lực',
          '日本人の配偶者等 / 永住者の配偶者等: tư cách liên quan đến hôn nhân/gia đình',
          '定住者: tư cách theo lý do đặc biệt được chỉ định',
        ],
        tip: 'Ly hôn, vợ/chồng qua đời hoặc thay đổi tình trạng gia đình có thể cần khai báo và tư vấn đổi tư cách lưu trú.',
      },
      {
        step: 3,
        title: 'Khi đổi việc hoặc đổi hoạt động',
        description: 'Nếu đổi công ty, đổi ngành, nghỉ học, chuyển trường hoặc đổi nội dung hoạt động, hãy kiểm tra nghĩa vụ khai báo và khả năng cần đổi tư cách lưu trú.',
        documents: [
          'Thông báo đổi việc/nghỉ việc nếu thuộc diện cần khai báo',
          'Đổi tư cách lưu trú nếu hoạt động mới không còn phù hợp',
          'Gia hạn thời hạn lưu trú nếu tiếp tục cùng tư cách',
        ],
        tip: 'Không nên tự suy đoán “visa còn hạn thì làm gì cũng được”. Phạm vi hoạt động là điểm ISA xét rất kỹ.',
      },
      {
        step: 4,
        title: 'Khi không chắc mình thuộc loại nào',
        description: 'Xem mặt trước thẻ cư trú mục 在留資格 và 在留期間. Nếu chuẩn bị đổi việc, đổi trường, kết hôn/ly hôn hoặc mở công ty, nên hỏi ISA hoặc chuyên gia trước khi hành động.',
        documents: [
          'Thẻ cư trú',
          'Hợp đồng lao động/giấy nhập học/giấy tờ gia đình',
          'Mô tả hoạt động dự kiến',
        ],
        tip: 'Tư cách lưu trú là vấn đề cá nhân hóa cao. App chỉ cung cấp tổng quan và đường dẫn nguồn chính thức.',
      },
    ],
  };

export default visaStatusOverview;
