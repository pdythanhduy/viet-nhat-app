import type { AdminGuide } from '../../../../types/content';

const spouseNotification: AdminGuide = {
    id: 'spouse-notification',
    category: 'immigration',
    lastVerified: '2026-05-06',
    priority: 'normal',
    title: 'Thông báo ly hôn / vợ chồng mất',
    titleJp: '配偶者に関する届出',
    icon: 'people',
    color: '#C0392B',
    description: 'Người có tư cách lưu trú dựa trên quan hệ vợ/chồng cần khai báo với ISA khi ly hôn hoặc vợ/chồng qua đời.',
    legalScope: {
      jurisdiction: 'national',
      jurisdictionNote: '配偶者に関する届出 là khai báo với ISA; thủ tục hộ tịch tại municipal office và thủ tục đổi tư cách lưu trú là các lớp việc riêng.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-12-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Tư cách lưu trú hiện tại phụ thuộc quan hệ hôn nhân và bạn muốn tiếp tục ở Nhật sau ly hôn.',
        'Có con chung, tranh chấp nuôi con, bạo lực gia đình hoặc giấy tờ ly hôn/tử vong chưa rõ ngày hiệu lực.',
        'Bạn đã quá hạn 14 ngày hoặc không chắc mình thuộc diện phải khai báo.',
      ],
    },
    quickAction: {
      deadline: 'Nộp trong vòng 14 ngày từ ngày ly hôn hoặc ngày vợ/chồng qua đời nếu thuộc tư cách phải khai báo.',
      office: 'Hệ thống khai báo điện tử ISA, bưu điện hoặc cục xuất nhập cảnh theo hướng dẫn ISA.',
      doNow: [
        'Xác định tư cách lưu trú hiện tại có thuộc diện phải nộp 配偶者に関する届出 không.',
        'Nộp khai báo sự kiện trước, sau đó xử lý riêng việc đổi/gia hạn tư cách nếu cần.',
        'Giữ bằng chứng đã khai báo và giấy tờ xác nhận ngày ly hôn/tử vong.',
      ],
      bring: ['Thẻ cư trú', 'Mẫu 配偶者に関する届出書', 'Giấy xác nhận ly hôn hoặc tử vong nếu được yêu cầu'],
      ifLate: 'Nộp ngay và giải thích trung thực; khai báo muộn có thể bất lợi khi xét hồ sơ cư trú tiếp theo.',
      officialSourceLabels: ['配偶者に関する届出 — 出入国在留管理庁'],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_spouse-notif_hero.jpg'),
    heroImageCaption: 'Khai báo thay đổi quan hệ vợ/chồng với ISA',
    whoIsThisFor: [
      'Người có tư cách lưu trú dựa trên quan hệ vợ/chồng và đã ly hôn.',
      'Người có vợ/chồng qua đời khi đang ở Nhật với tư cách lưu trú liên quan đến hôn nhân.',
      'Người cần biết khai báo này khác với thủ tục đổi tư cách lưu trú sau ly hôn.',
    ],
    whenToDo: [
      'Trong vòng 14 ngày kể từ ngày ly hôn hoặc ngày vợ/chồng qua đời.',
      'Ngay sau khi có giấy tờ xác nhận sự kiện để tránh khai báo muộn.',
      'Sau khi khai báo, nên sớm hỏi ISA về phương án giữ/đổi tư cách lưu trú nếu tư cách hiện tại phụ thuộc quan hệ hôn nhân.',
    ],
    whereToDo: [
      'Nộp online, qua bưu điện hoặc trực tiếp theo phương thức ISA chấp nhận.',
      'Cục xuất nhập cảnh (ISA): hỏi tư vấn nếu cần đổi tư cách lưu trú sau ly hôn hoặc sau khi vợ/chồng mất.',
    ],
    documentsChecklist: [
      { label: '配偶者に関する届出書', required: true },
      { label: 'Thẻ cư trú', required: true },
      { label: 'Giấy xác nhận ly hôn hoặc giấy tờ tử vong', required: false, note: 'Có thể cần khi ISA yêu cầu xác nhận sự kiện.' },
      { label: 'Bằng chứng đã nộp khai báo', required: false, note: 'Giữ lại nếu nộp online hoặc qua bưu điện.' },
    ],
    commonMistakes: [
      'Tưởng ly hôn tại municipal office xong là ISA tự biết và không cần khai báo.',
      'Nhầm khai báo 配偶者に関する届出 với thủ tục đổi/gia hạn tư cách lưu trú.',
      'Để quá 14 ngày mới khai báo vì chưa chuẩn bị hướng đổi visa.',
      'Không giữ bằng chứng đã nộp khai báo.',
    ],
    faq: [
      {
        question: 'Khai báo này có tự động đổi visa cho tôi không?',
        answer: 'Không. Đây chỉ là khai báo sự kiện với ISA. Nếu tư cách lưu trú của bạn dựa trên quan hệ vợ/chồng, cần sớm hỏi ISA về hướng đổi tư cách hoặc xử lý hồ sơ tiếp theo.',
      },
      {
        question: 'Nếu đã ly hôn nhưng còn hạn lưu trú dài thì có cần khai không?',
        answer: 'Có. Nếu thuộc đối tượng phải khai báo 配偶者に関する届出, hạn lưu trú còn dài không làm mất nghĩa vụ khai báo trong thời hạn.',
      },
      {
        question: 'Nộp muộn thì làm sao?',
        answer: 'Nên nộp càng sớm càng tốt và giải thích trung thực lý do muộn. Khai báo muộn có thể bất lợi khi xét các thủ tục lưu trú sau này.',
      },
    ],
    officialLinks: [
      { label: '配偶者に関する届出 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Điền 配偶者に関する届出書 và nộp trong 14 ngày',
        description: '**Các trường trên 届出書** (tải PDF: https://www.moj.go.jp/isa/content/930002829.pdf hoặc khai online):\n\n| Trường | Ghi như thế nào |\n|---|---|\n| 氏名 / フリガナ | Tên theo 在留カード; フリガナ KATAKANA |\n| 生年月日 | Ngày/tháng/năm sinh (西暦) |\n| 在留資格 / 在留期間満了日 | Copy từ 在留カード |\n| 在留カード番号 | 12 ký tự trên mặt trước thẻ |\n| 届出事由 | Chọn: ①配偶者と離婚した (ly hôn) hoặc ②配偶者が死亡した (vợ/chồng mất) |\n| 配偶者の氏名 | Tên vợ/chồng (người Nhật hoặc người nước ngoài) |\n| 離婚（または死亡）の年月日 | Ngày ly hôn theo 離婚届受理 hoặc ngày tử vong |\n\n⚠️ Khai báo này **không tự động gia hạn hoặc đổi visa**. Sau khi nộp, cần sớm tư vấn ISA về hướng xử lý tư cách lưu trú.',
        documents: [
          'Thẻ cư trú',
          'Giấy 離婚届受理証明書 hoặc 死亡診断書 nếu được yêu cầu',
        ],
        tip: 'Tư cách 日本人の配偶者等 hoặc 永住者の配偶者等 gắn với quan hệ hôn nhân. Sau ly hôn, nếu không có căn cứ lưu trú khác, thời gian xử lý hồ sơ trở nên gấp — đừng để quá deadline 14 ngày.',
      },
      {
        step: 2,
        title: 'Nộp online, bưu điện hoặc trực tiếp',
        description: 'Có thể khai báo theo phương thức được ISA chấp nhận. Giữ lại bằng chứng đã khai báo.',
        documents: [
          'Mẫu 配偶者に関する届出',
        ],
        tip: 'Không khai báo hoặc khai báo muộn có thể bất lợi khi xét hồ sơ sau này.',
      },
    ],
  };

export default spouseNotification;
