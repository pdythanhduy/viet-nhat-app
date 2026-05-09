import type { AdminGuide } from '../../../../types/content';

const residenceCardInfoChange: AdminGuide = {
    id: 'residence-card-info-change',
    category: 'immigration',
    lastVerified: '2026-05-06',
    priority: 'normal',
    title: 'Đổi thông tin trên thẻ cư trú',
    titleJp: '住居地以外の記載事項変更届出',
    icon: 'create',
    color: '#8E44AD',
    description: 'Khai báo khi thay đổi họ tên, ngày sinh, giới tính, quốc tịch/khu vực trên thẻ cư trú.',
    legalScope: {
      jurisdiction: 'national',
      jurisdictionNote: 'Đổi thông tin ngoài địa chỉ trên thẻ cư trú là thủ tục ISA; đổi địa chỉ cư trú vẫn làm tại 市役所/区役所.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-12-01',
      riskLevel: 'medium',
      whenToAskExpert: [
        'Giấy tờ Việt Nam / Nhật có cách viết tên khác nhau hoặc ngày thay đổi pháp lý không rõ.',
        'Bạn đổi quốc tịch, đổi tên sau kết hôn/ly hôn hoặc giấy tờ nước ngoài cần dịch/chứng nhận.',
        'Đã quá hạn 14 ngày hoặc thông tin trên thẻ, hộ chiếu, ngân hàng không còn khớp.',
      ],
    },
    quickAction: {
      deadline: 'Nộp trong vòng 14 ngày kể từ ngày thay đổi họ tên, ngày sinh, giới tính hoặc quốc tịch/khu vực.',
      office: 'Cục xuất nhập cảnh có thẩm quyền theo nơi cư trú.',
      doNow: [
        'Xác định thay đổi thuộc thông tin ngoài địa chỉ, không phải đổi địa chỉ.',
        'Chuẩn bị giấy tờ chứng minh thay đổi và bản dịch tiếng Nhật nếu cần.',
        'Kiểm tra lại thông tin in trên thẻ sau khi được cập nhật.',
      ],
      bring: ['Thẻ cư trú hiện tại', 'Hộ chiếu', 'Giấy tờ chứng minh thay đổi', 'Bản dịch tiếng Nhật nếu giấy tờ không phải tiếng Nhật', 'Ảnh thẻ nếu được yêu cầu cấp thẻ mới'],
      ifLate: 'Nộp càng sớm càng tốt; nếu quá hạn, ISA có thể yêu cầu văn bản giải thích lý do.',
      officialSourceLabels: ['住居地以外の記載事項変更届出 — 出入国在留管理庁'],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_card-infochange_hero.jpg'),
    heroImageCaption: 'Khai báo thay đổi thông tin cá nhân trên thẻ cư trú',
    whoIsThisFor: [
      'Người có thẻ cư trú và đã đổi họ tên, ngày sinh, giới tính hoặc quốc tịch/khu vực.',
      'Người đổi hộ chiếu hoặc giấy tờ quốc tịch khiến thông tin trên thẻ cư trú không còn khớp.',
      'Người vừa kết hôn/ly hôn hoặc có thay đổi pháp lý về tên cần cập nhật giấy tờ tại Nhật.',
    ],
    whenToDo: [
      'Trong vòng 14 ngày kể từ ngày phát sinh thay đổi thuộc diện khai báo.',
      'Trước khi dùng thẻ cư trú cho thủ tục ngân hàng, bảo hiểm, thuê nhà hoặc ISA tiếp theo nếu thông tin đã khác.',
      'Không dùng thủ tục này để đổi địa chỉ cư trú; địa chỉ là thủ tục riêng tại 市役所/区役所.',
    ],
    whereToDo: [
      'Cục xuất nhập cảnh (ISA) có thẩm quyền theo nơi cư trú.',
      'Có thể kiểm tra mẫu đơn và yêu cầu giấy tờ trên trang ISA trước khi đi.',
    ],
    documentsChecklist: [
      { label: '住居地以外の記載事項変更届出書', required: true },
      { label: 'Thẻ cư trú hiện tại', required: true },
      { label: 'Hộ chiếu', required: true },
      { label: 'Giấy tờ chứng minh thay đổi', required: true, note: 'Ví dụ: hộ chiếu mới, giấy đổi tên, giấy tờ quốc tịch hoặc giấy tờ hộ tịch liên quan.' },
      { label: 'Bản dịch tiếng Nhật', required: false, note: 'Có thể cần nếu giấy tờ chứng minh không phải tiếng Nhật.' },
    ],
    commonMistakes: [
      'Nhầm đổi thông tin cá nhân với đổi địa chỉ cư trú.',
      'Chỉ đổi hộ chiếu/ngân hàng mà quên cập nhật thông tin trên thẻ cư trú.',
      'Không giữ giấy tờ chứng minh ngày thay đổi chính thức.',
      'Đi ISA thiếu bản dịch hoặc giấy tờ gốc chứng minh thay đổi.',
    ],
    faq: [
      {
        question: 'Đổi địa chỉ có phải làm ở ISA không?',
        answer: 'Thông thường không. Đổi địa chỉ cư trú là thủ tục tại 市役所/区役所. Bài này dành cho các mục ngoài địa chỉ như họ tên, ngày sinh, giới tính, quốc tịch/khu vực.',
      },
      {
        question: 'Đổi họ sau kết hôn thì có cần khai báo không?',
        answer: 'Nếu thông tin họ tên trên giấy tờ pháp lý thay đổi và cần cập nhật trên thẻ cư trú, bạn nên khai báo trong thời hạn quy định và mang giấy tờ chứng minh thay đổi.',
      },
      {
        question: 'Nếu giấy tờ chứng minh là tiếng Việt thì sao?',
        answer: 'Có thể cần bản dịch tiếng Nhật tùy hồ sơ và yêu cầu của ISA. Nên chuẩn bị bản dịch và giữ bản gốc để đối chiếu.',
      },
    ],
    officialLinks: [
      { label: '住居地以外の記載事項変更届出 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00009.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Kiểm tra thay đổi có thuộc diện khai báo không',
        description: 'Nếu đổi họ tên, ngày sinh, giới tính hoặc quốc tịch/khu vực, cần khai báo trong vòng 14 ngày kể từ ngày thay đổi.',
        documents: [
          'Thẻ cư trú hiện tại',
          'Hộ chiếu',
          'Giấy tờ chứng minh thay đổi: hộ chiếu mới, giấy đổi tên, giấy tờ quốc tịch...',
        ],
        tip: 'Đổi địa chỉ là thủ tục riêng tại 市役所/区役所, không dùng bài này.',
      },
      {
        step: 2,
        title: 'Điền 住居地以外の記載事項変更届出書 và nộp tại ISA',
        description: '**Thông tin cần điền trên đơn** (tải PDF: https://www.moj.go.jp/isa/content/001426705.pdf hoặc nhận tại quầy ISA):\n\n| Trường | Ghi như thế nào |\n|---|---|\n| 氏名 / 在留カード番号 | Tên và số thẻ hiện tại (trước khi đổi) |\n| 生年月日 / 在留資格 | Copy từ thẻ cư trú hiện tại |\n| 変更の内容 | Chọn mục thay đổi: 氏名 / 生年月日 / 性別 / 国籍・地域 |\n| 変更前の記載事項 | Thông tin hiện có trên thẻ |\n| 変更後の記載事項 | Thông tin mới (theo hộ chiếu mới hoặc giấy tờ xác nhận) |\n| 変更年月日 | Ngày thay đổi chính thức (ngày đổi tên, ngày nhập quốc tịch...) |\n| 変更の事由 | Lý do: 婚姻 (kết hôn đổi tên), 帰化 (nhập quốc tịch), 訂正 (sửa lỗi)... |\n\nKèm theo: thẻ cư trú + hộ chiếu mới phản ánh thông tin đổi + giấy tờ chứng minh thay đổi (bản dịch nếu cần).',
        documents: [
          'Đơn khai báo — tải PDF: https://www.moj.go.jp/isa/content/001426705.pdf hoặc nhận tại quầy ISA',
          'Hộ chiếu mới hoặc giấy tờ quốc tịch phản ánh thay đổi',
          'Thẻ cư trú hiện tại',
          'Ảnh縦4cm × 横3cm, nền trắng hoặc sáng màu đơn sắc, chụp trong 3 tháng gần nhất — chỉ khi được yêu cầu cấp thẻ mới',
        ],
        tip: 'Giấy tờ nước ngoài (hộ chiếu Việt Nam, giấy đổi tên) thường cần bản dịch tiếng Nhật có công chứng. Xác nhận yêu cầu cụ thể với cục xuất nhập cảnh trước khi đến.',
      },
      {
        step: 3,
        title: 'Nộp tại cục xuất nhập cảnh',
        description: 'Mang hồ sơ đến ISA có thẩm quyền để cập nhật thông tin.',
        documents: [],
        tip: 'Sau khi nhận thẻ cập nhật, kiểm tra kỹ từng mục trên thẻ.',
      },
    ],
  };

export default residenceCardInfoChange;
