import type { AdminGuide } from '../../../../types/content';

const tokuteiKatsudo46JobHunt: AdminGuide = {
    id: 'tokutei-katsudo-46-job-hunt',
    category: 'visa',
    lastVerified: '2026-05-06',
    priority: 'normal',
    title: 'Visa tìm việc sau tốt nghiệp tại Nhật (特定活動)',
    titleJp: '卒業後の継続就職活動のための特定活動',
    icon: 'briefcase-outline',
    color: '#2E86C1',
    description: 'Du học sinh tốt nghiệp tại Nhật có thể xin đổi sang 特定活動 để tiếp tục tìm việc sau khi 留学 sắp hết hạn. Diện này khác với 特定活動46号: 46号 là hướng làm việc sau khi đã có công việc phù hợp, còn guide này tập trung vào giai đoạn tiếp tục tìm việc.',
    legalScope: {
      jurisdiction: 'national',
      jurisdictionNote: '継続就職活動のための特定活動 do ISA xét; trường đã tốt nghiệp chỉ cấp 推薦状 và hỗ trợ chứng minh quá trình tìm việc.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-12-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Bạn đã hết hạn 留学 hoặc sắp hết hạn nhưng chưa có 推薦状 từ trường.',
        'Bạn muốn làm thêm, internship vượt 28 giờ/tuần hoặc đã có offer full-time.',
        'Bạn nhầm giữa 特定活動 tìm việc, 特定活動46号 và visa lao động thông thường.',
      ],
    },
    quickAction: {
      deadline: 'Nộp trước khi 在留資格「留学」 hết hạn; xin 推薦状 và bằng chứng tìm việc càng sớm càng tốt sau tốt nghiệp.',
      office: 'ISA theo nơi cư trú; trường/career center cấp 卒業証明書, 推薦状 và bằng chứng hỗ trợ tìm việc.',
      doNow: [
        'Hỏi trường có cấp 推薦状 cho 継続就職活動 không.',
        'Tập hợp bằng chứng ứng tuyển, phỏng vấn, hội chợ việc làm và tư vấn career center.',
        'Nếu muốn làm baito, kiểm tra lại 資格外活動許可 cho tư cách mới.',
      ],
      bring: ['在留資格変更許可申請書', '卒業証明書', '推薦状', 'Bằng chứng hoạt động tìm việc', 'Chứng minh tài chính', 'Hộ chiếu và thẻ cư trú'],
      ifLate: 'Nếu 留学 đã hết hạn hoặc chỉ còn rất ít ngày, không tự tiếp tục ở/làm việc; liên hệ ISA và trường ngay để xác nhận phương án hợp lệ.',
      officialSourceLabels: [
        '本邦の大学等を卒業した留学生が就職活動を行う場合 — 出入国在留管理庁',
        '大学等を卒業後就職活動のための滞在をご希望のみなさまへ — 出入国在留管理庁',
        '在留資格変更許可申請 — 出入国在留管理庁',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_jobhunt-visa_hero.jpg'),
    heroImageCaption: '卒業後の継続就職活動 - chuẩn bị hồ sơ 特定活動 trước khi 留学 hết hạn',
    whoIsThisFor: [
      'Du học sinh tốt nghiệp đại học, cao đẳng/kỹ thuật hoặc chuyên môn tại Nhật và muốn tiếp tục tìm việc sau tốt nghiệp.',
      'Người đã tìm việc từ trước khi tốt nghiệp nhưng chưa có offer chính thức trước khi 留学 hết hạn.',
      'Người có trường đồng ý cấp thư giới thiệu tiếp tục tìm việc và vẫn còn khả năng chi trả sinh hoạt.',
    ],
    whenToDo: [
      'Nộp trước khi 在留資格「留学」 hết hạn, tốt nhất chuẩn bị trong giai đoạn cuối trước hoặc ngay sau khi tốt nghiệp.',
      'Năm đầu sau tốt nghiệp: thường là 特定活動 6 tháng và có thể gia hạn thêm 1 lần nếu tiếp tục đủ điều kiện.',
      'Năm thứ hai sau tốt nghiệp chỉ áp dụng trong một số chương trình hỗ trợ việc làm của địa phương đáp ứng điều kiện ISA.',
    ],
    whereToDo: [
      'Cục xuất nhập cảnh (ISA) có thẩm quyền theo nơi cư trú: nộp 在留資格変更許可申請.',
      'Trường đã tốt nghiệp: xin 卒業証明書, 成績証明書 và 推薦状 cho việc tiếp tục tìm việc.',
      'Career center/就職課 của trường hoặc chương trình hỗ trợ địa phương: lưu bằng chứng hoạt động tìm việc.',
      'ISA hoặc trang hướng dẫn 資格外活動許可: hỏi trước nếu muốn làm baito hoặc internship trong thời gian tìm việc.',
    ],
    documentsChecklist: [
      { label: '在留資格変更許可申請書', required: true },
      { label: 'Hộ chiếu, 在留カード và ảnh thẻ', required: true },
      { label: '卒業証明書 hoặc giấy xác nhận tốt nghiệp', required: true },
      { label: '推薦状 từ trường', required: true, note: 'ISA nêu việc tiếp tục tìm việc cần có推薦 từ cơ sở đã tốt nghiệp.' },
      { label: 'Bằng chứng đã và đang tìm việc', required: true, note: 'Ví dụ lịch sử ứng tuyển, email công ty, tham gia hội chợ việc làm, tư vấn với career center.' },
      { label: 'Chứng minh khả năng chi trả sinh hoạt', required: true },
      { label: '資格外活動許可申請', required: false, note: 'Cần nếu muốn làm thêm trong phạm vi được cho phép.' },
    ],
    commonMistakes: [
      'Nhầm guide này với 特定活動46号 và nghĩ bắt buộc phải có JLPT N1 để tiếp tục tìm việc.',
      'Chờ 留学 gần hết hoặc đã hết hạn mới xin 推薦状 và chuẩn bị hồ sơ.',
      'Không giữ bằng chứng hoạt động tìm việc nên khi gia hạn khó chứng minh đang tìm việc thật.',
      'Làm thêm mà chưa xin 資格外活動許可 hoặc làm quá phạm vi được cho phép.',
      'Tưởng được ở tối đa 2 năm trong mọi trường hợp; năm thứ hai chỉ áp dụng khi thuộc chương trình hỗ trợ địa phương đủ điều kiện.',
    ],
    faq: [
      {
        question: 'Diện này có phải 特定活動46号 không?',
        answer: 'Không. Đây là 特定活動 để tiếp tục tìm việc sau tốt nghiệp. 特定活動46号 là diện làm việc cho người tốt nghiệp đại học Nhật trong công việc dùng tiếng Nhật sau khi đã có nội dung hoạt động/công việc phù hợp.',
      },
      {
        question: 'Có cần JLPT N1 để xin 特定活動 tìm việc không?',
        answer: 'Không phải điều kiện chung của diện tiếp tục tìm việc sau tốt nghiệp. Điều quan trọng là tốt nghiệp đúng đối tượng, tình trạng lưu trú không có vấn đề, có推薦 từ trường và chứng minh đang tiếp tục tìm việc.',
      },
      {
        question: 'Có được làm thêm trong thời gian tìm việc không?',
        answer: 'Có thể nếu được 資格外活動許可. ISA nêu mức thông thường là trong phạm vi 28 giờ/tuần; internship hoặc hoạt động vượt phạm vi có thể cần xin phép riêng.',
      },
    ],
    officialLinks: [
      { label: '本邦の大学等を卒業した留学生が就職活動を行う場合 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/status/designatedactivities14.html' },
      { label: '大学等を卒業後就職活動のための滞在をご希望のみなさまへ — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan84.html' },
      { label: '在留資格「特定活動」46号 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/status/designatedactivities11.html' },
      { label: '在留資格変更許可申請 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/16-2.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Kiểm tra bạn có đủ điều kiện không',
        description: 'Diện 継続就職活動のための特定活動 áp dụng khi bạn tốt nghiệp tại Nhật và muốn tiếp tục tìm việc sau khi 留学 sắp hết hạn.\n\nĐiểm cần kiểm tra:\n1. Bạn thuộc nhóm trường/khóa được ISA công nhận cho diện này, như đại học, một số trường chuyên môn hoặc trường tiếng Nhật theo điều kiện đặc biệt.\n2. Tình trạng lưu trú trong thời gian học không có vấn đề lớn.\n3. Bạn đã tìm việc từ trước khi tốt nghiệp và tiếp tục tìm việc sau tốt nghiệp.\n4. Trường cấp 推薦状 cho việc tiếp tục tìm việc.\n5. Bạn có đủ khả năng chi trả sinh hoạt trong thời gian tìm việc.\n\nNếu đã có offer và chỉ chờ ngày vào công ty, đó có thể là 特定活動 nội định/chờ tuyển dụng; nếu đã có công việc dùng tiếng Nhật theo diện tốt nghiệp đại học Nhật, hãy kiểm tra guide/nguồn về 特定活動46号.',
        documents: [],
        tip: 'Đừng tự gắn nhãn 46号 cho hồ sơ tìm việc. Khi hỏi trường hoặc ISA, dùng đúng cụm 継続就職活動のための特定活動 để tránh được hướng dẫn sai diện.',
      },
      {
        step: 2,
        title: 'Xin phép làm thêm nếu cần',
        description: 'Trong thời gian 特定活動 để tìm việc, bạn không được mặc định làm thêm chỉ vì trước đây từng có 資格外活動許可 khi còn là du học sinh.\n\nNếu muốn làm baito: xin 資格外活動許可. ISA nêu trường hợp thông thường là trong phạm vi 28 giờ/tuần. Nếu internship là một phần của hoạt động tìm việc và vượt 28 giờ/tuần, có thể cần xin phép riêng theo hướng dẫn ISA.\n\nKhông dùng diện tìm việc để làm full-time. Khi có offer và muốn bắt đầu làm toàn thời gian, cần đổi sang tư cách lưu trú phù hợp trước ngày bắt đầu làm.',
        documents: [],
        tip: 'Giữ bản sao giấy phép 資格外活動 và kiểm tra mặt sau 在留カード/指定書 trước khi nhận ca làm. Nếu điều kiện không rõ, hỏi ISA trước.',
      },
      {
        step: 3,
        title: 'Chuẩn bị hồ sơ và nộp tại ISA',
        description: 'Hồ sơ cơ bản thường gồm:\n• Đơn 在留資格変更許可申請 (đổi từ 留学 sang 特定活動)\n• 卒業証明書 hoặc giấy xác nhận tốt nghiệp\n• 推薦状 từ trường cho việc tiếp tục tìm việc\n• Bằng chứng hoạt động tìm việc: lịch sử ứng tuyển, email công ty, tham gia hội chợ việc làm, tư vấn career center\n• Giấy tờ chứng minh khả năng chi trả sinh hoạt\n• Hộ chiếu, 在留カード và ảnh thẻ\n\nTùy trường hợp, ISA có thể yêu cầu thêm tài liệu. Hãy dùng checklist chính thức của ISA và hỏi trường trước khi nộp.',
        documents: [
          'Đơn 在留資格変更許可申請',
          '卒業証明書 hoặc giấy xác nhận tốt nghiệp',
          '推薦状 từ trường',
          'Bằng chứng hoạt động tìm việc',
          'Hộ chiếu và 在留カード',
          'Sao kê tài khoản ngân hàng (chứng minh tài chính)',
        ],
        tip: 'Xin 推薦状 sớm. Trường thường chỉ cấp nếu họ xác nhận bạn thực sự đang tiếp tục tìm việc và có lịch sử trao đổi với career center/giáo viên phụ trách.',
      },
      {
        step: 4,
        title: 'Thời hạn và gia hạn',
        description: 'Năm đầu sau tốt nghiệp: ISA nêu diện tìm việc thường được cấp 特定活動 6 tháng và có thể gia hạn thêm 1 lần, tức tối đa 1 năm nếu tiếp tục đủ điều kiện.\n\nNăm thứ hai sau tốt nghiệp: chỉ áp dụng nếu bạn tham gia chương trình hỗ trợ việc làm của địa phương đáp ứng điều kiện ISA và được cấp giấy chứng nhận phù hợp.\n\nNếu tìm được việc: nộp đơn đổi sang tư cách lưu trú phù hợp trước khi bắt đầu làm full-time. Tùy công việc, có thể là 技術・人文知識・国際業務, 特定活動46号 hoặc tư cách khác đúng với nội dung công việc.',
        documents: [
          'Báo cáo hoạt động tìm việc (求職活動状況報告書 — một số ISA yêu cầu khi gia hạn)',
          'Hộ chiếu và 在留カード',
        ],
        tip: 'Mục tiêu của diện này là tìm việc thật, không phải kéo dài lưu trú. Mỗi lần gia hạn nên có bằng chứng mới về ứng tuyển, phỏng vấn, tư vấn nghề nghiệp hoặc tham gia sự kiện tuyển dụng.',
      },
    ],
  };

export default tokuteiKatsudo46JobHunt;
