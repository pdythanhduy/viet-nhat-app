import type { AdminGuide } from '../../../../types/content';

const jobChangeNotification: AdminGuide = {
    id: 'job-change-notification',
    category: 'immigration',
    lastVerified: '2026-05-06',
    priority: 'high',
    title: 'Thông báo đổi việc / nghỉ việc',
    titleJp: '契約機関に関する届出',
    icon: 'briefcase',
    color: '#D35400',
    description: 'Một số tư cách lưu trú lao động cần khai báo với ISA trong vòng 14 ngày khi kết thúc hợp đồng, ký hợp đồng mới hoặc chuyển công ty.',
    legalScope: {
      jurisdiction: 'national',
      jurisdictionNote: 'Khai báo thay đổi tổ chức hợp đồng là nghĩa vụ với ISA; thủ tục này không tự xác nhận công việc mới phù hợp tư cách lưu trú.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-12-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Công việc mới khác ngành, khác chức danh hoặc không khớp bằng cấp/kinh nghiệm đã dùng khi xin visa.',
        'Bạn nghỉ việc lâu, chưa có việc mới hoặc công ty mới muốn bạn làm trước khi rõ tư cách.',
        'Bạn đã quá hạn 14 ngày hoặc từng đổi việc nhiều lần trong kỳ lưu trú hiện tại.',
      ],
    },
    quickAction: {
      deadline: 'Khai báo trong vòng 14 ngày từ ngày kết thúc hợp đồng, ký hợp đồng mới hoặc chuyển tổ chức nếu thuộc diện phải khai báo.',
      office: 'Hệ thống 電子届出 của ISA, bưu điện theo hướng dẫn ISA hoặc cục xuất nhập cảnh.',
      doNow: [
        'Ghi rõ ngày nghỉ việc, ngày ký hợp đồng mới và tên pháp nhân liên quan.',
        'Chọn đúng mẫu theo sự kiện: nghỉ, chuyển, hoặc cả hai.',
        'Giữ bằng chứng nộp online/bưu điện để dùng khi gia hạn hoặc đổi tư cách.',
      ],
      bring: ['Thẻ cư trú', 'Thông tin công ty cũ/mới', 'Ngày kết thúc hoặc bắt đầu hợp đồng', 'Mẫu 届出書 đúng loại'],
      ifLate: 'Khai báo ngay, lưu bằng chứng và chuẩn bị giải thích trung thực trong hồ sơ lưu trú sau này.',
      officialSourceLabels: ['契約機関に関する届出 — 出入国在留管理庁', '電子届出システム — 出入国在留管理庁'],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_job-change_hero.jpg'),
    heroImageCaption: 'Khai báo thay đổi công việc với ISA trong 14 ngày',
    whoIsThisFor: [
      'Người có visa lao động gắn với tổ chức ký hợp đồng, ví dụ 技術・人文知識・国際業務, 介護, 技能, 特定技能.',
      'Người nghỉ việc, đổi công ty, ký hợp đồng mới hoặc công ty tiếp nhận thay đổi thông tin quan trọng.',
      'Người chuẩn bị gia hạn visa sau khi đã đổi việc trong kỳ lưu trú hiện tại.',
    ],
    whenToDo: [
      'Trong vòng 14 ngày kể từ khi kết thúc hợp đồng với công ty cũ.',
      'Trong vòng 14 ngày kể từ khi ký hợp đồng hoặc bắt đầu quan hệ với công ty mới nếu thuộc diện khai báo.',
      'Trước khi gia hạn visa nên kiểm tra lại mình đã khai báo đủ các lần nghỉ việc/đổi việc chưa.',
    ],
    whereToDo: [
      'Hệ thống khai báo điện tử của ISA nếu bạn có thể sử dụng.',
      'Gửi bưu điện đến địa chỉ được ISA hướng dẫn.',
      'Nộp trực tiếp tại cục xuất nhập cảnh có thẩm quyền.',
    ],
    estimatedTime: 'Đây là thủ tục khai báo, không phải xét duyệt đổi visa. Việc chuẩn bị có thể nhanh nếu bạn có đủ thông tin công ty và ngày hợp đồng.',
    fees: [
      'Khai báo thay đổi tổ chức hợp đồng thường không phải là thủ tục nộp lệ phí cấp phép.',
      'Nếu gửi bưu điện, bạn tự chịu phí bưu chính và nên dùng cách có theo dõi.',
    ],
    documentsChecklist: [
      { label: 'Thẻ cư trú', required: true, note: 'Dùng để ghi đúng mã số thẻ và tư cách lưu trú.' },
      { label: 'Thông tin công ty cũ/công ty mới', required: true, note: 'Tên pháp nhân, địa chỉ, số điện thoại nếu có.' },
      { label: 'Ngày nghỉ việc, ngày kết thúc hợp đồng hoặc ngày ký hợp đồng mới', required: true },
      { label: 'Mẫu 届出書 tương ứng', required: true, note: 'Chọn đúng mẫu theo loại thay đổi và tư cách lưu trú.' },
      { label: 'Bằng chứng đã gửi/nộp', required: false, note: 'Lưu bản sao, biên nhận bưu điện hoặc xác nhận online.' },
    ],
    commonMistakes: [
      'Nghĩ visa còn hạn nên không cần khai báo khi nghỉ việc.',
      'Chỉ khai báo lúc vào công ty mới nhưng quên khai báo việc đã nghỉ công ty cũ.',
      'Đổi sang công việc không phù hợp với tư cách lưu trú hiện tại.',
      'Không giữ bằng chứng đã khai báo nên khó giải thích khi gia hạn visa.',
    ],
    faq: [
      {
        question: 'Khai báo đổi việc có đồng nghĩa được phép làm công việc mới không?',
        answer: 'Không. Đây là nghĩa vụ khai báo. Công việc mới vẫn phải phù hợp với tư cách lưu trú hiện tại, nếu không có thể cần đổi tư cách lưu trú hoặc xin xác nhận phù hợp.',
      },
      {
        question: 'Nghỉ việc rồi chưa có việc mới thì có cần khai báo không?',
        answer: 'Nếu tư cách lưu trú của bạn thuộc diện phải khai báo tổ chức hợp đồng, việc kết thúc hợp đồng cũng là sự kiện cần khai báo trong thời hạn.',
      },
      {
        question: 'Đã quá 14 ngày thì nên làm gì?',
        answer: 'Nên khai báo càng sớm càng tốt, giữ bằng chứng và giải thích trung thực khi được hỏi trong các thủ tục sau.',
      },
    ],
    officialLinks: [
      { label: '契約機関に関する届出 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html' },
      { label: '電子届出システム — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/onlineshinsei.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Xác định bạn có cần khai báo không',
        description: 'Các visa lao động như 技術・人文知識・国際業務, 介護, 技能, 特定技能... thường cần khai báo khi thay đổi tổ chức hợp đồng.',
        documents: [
          'Thẻ cư trú',
          'Thông tin công ty cũ/công ty mới',
          'Ngày nghỉ việc hoặc ngày bắt đầu hợp đồng mới',
        ],
        tip: 'Không phải mọi visa đều dùng cùng mẫu. Hãy đối chiếu tư cách lưu trú của bạn với trang ISA.',
      },
      {
        step: 2,
        title: 'Điền 契約機関に関する届出書 và nộp trong 14 ngày',
        description: '**Các trường trên 届出書** (tải PDF hoặc khai online qua hệ thống 電子届出):\n\n| Trường | Ghi như thế nào |\n|---|---|\n| 氏名 / フリガナ | Tên theo 在留カード; フリガナ viết KATAKANA |\n| 生年月日 | Ngày/tháng/năm sinh (西暦) |\n| 在留資格 / 在留期間満了日 | Copy từ 在留カード |\n| 在留カード番号 | 12 ký tự trên mặt trước thẻ |\n| 届出事由 | Chọn: ①活動機関の離脱 (nghỉ việc) hoặc ②活動機関への移籍 (vào công ty mới) |\n| 機関の名称・所在地 | Tên pháp nhân, địa chỉ, số điện thoại công ty (cũ hoặc mới) |\n| 活動内容 | Mô tả công việc: VD "エンジニアとして就労" |\n\n**Tải mẫu đơn PDF:**\n- Nghỉ việc (活動機関の離脱): https://www.moj.go.jp/isa/content/930002827.pdf\n- Vào công ty mới (活動機関への移籍): https://www.moj.go.jp/isa/content/930002828.pdf\n- Ghi cả hai sự kiện cùng lúc: https://www.moj.go.jp/isa/content/930002914.pdf',
        documents: [
          'Mẫu 届出書 — tải PDF theo loại sự kiện (link trong mô tả) hoặc khai qua hệ thống 電子届出',
          'Thẻ cư trú để tra số thẻ và ngày hết hạn',
        ],
        tip: 'Khai báo online qua hệ thống 電子届出 của ISA nhanh nhất — không cần đến quầy. Lưu màn hình xác nhận hoặc in ra để chứng minh khi gia hạn.',
        image: require('../../../../../assets/content/daily-life/ag_job-change_s2.jpg'),
        imageCaption: 'Điền 契約機関に関する届出書 — khai báo online qua hệ thống 電子届出 của ISA',
      },
      {
        step: 3,
        title: 'Giữ bằng chứng đã khai báo',
        description: 'Lưu bản sao hồ sơ, biên nhận bưu điện hoặc xác nhận online để dùng khi gia hạn visa.',
        documents: [],
        tip: 'Quên khai báo có thể ảnh hưởng khi xét hồ sơ sau này. Nếu đã quá hạn, hãy khai báo càng sớm càng tốt và giải thích trung thực.',
      },
    ],
  };

export default jobChangeNotification;
