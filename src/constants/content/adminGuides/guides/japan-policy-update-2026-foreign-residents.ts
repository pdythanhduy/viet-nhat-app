import type { AdminGuide } from '../../../../types/content';

const japanPolicyUpdate2026ForeignResidents: AdminGuide = {
    id: 'japan-policy-update-2026-foreign-residents',
    category: 'visa',
    lastVerified: '2026-05-06',
    priority: 'high',
    title: 'Cập nhật chính sách Nhật 2026 cho người nước ngoài',
    titleJp: '2026年 外国人向け在留制度アップデート',
    icon: 'newspaper',
    color: '#2E86C1',
    description: 'Tổng hợp mốc chính thức mới nhất (đến 06/05/2026) theo ISA: phân biệt rõ nội dung đã áp dụng trong 2026, nội dung bắt đầu từ 14/06/2026 và nội dung có hiệu lực từ 01/04/2027.',
    legalScope: {
      jurisdiction: 'national',
      jurisdictionNote: 'Đây là guide tổng hợp chính sách cấp quốc gia; từng thủ tục cụ thể vẫn phải đối chiếu trang ISA/MOFA/MHLW/NPA tương ứng.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-06-14',
      riskLevel: 'high',
      whenToAskExpert: [
        'Bạn chuẩn bị nộp hồ sơ cư trú đúng giai đoạn chuyển tiếp 2026-2027.',
        'Bạn nghe thông tin mạng xã hội mâu thuẫn về 特定在留カード, 育成就労 hoặc 特定技能.',
        'Bạn có hồ sơ bị thiếu, bị yêu cầu bổ sung hoặc đổi hoạt động cư trú.',
      ],
    },
    quickAction: {
      deadline: 'Kiểm tra lại trước các mốc 14/06/2026 và 01/04/2027; với hồ sơ online, dùng hệ thống mới từ 05/01/2026.',
      office: 'ISA hoặc hệ thống 在留申請オンライン nếu thủ tục/hồ sơ của bạn thuộc đối tượng được nộp online.',
      doNow: [
        'Tách rõ mốc đã áp dụng, mốc tiền thủ tục và mốc chưa vận hành.',
        'Tải biểu mẫu mới nhất từ nguồn chính thức ngay trong ngày chuẩn bị nộp.',
        'Không dùng nội dung truyền tay nếu không có ngày cập nhật và link nguồn.',
      ],
      bring: ['Thẻ cư trú và hộ chiếu', 'Thông tin tư cách lưu trú hiện tại', 'Mẫu đơn đúng phiên bản', 'Link nguồn chính thức đã đối chiếu'],
      ifLate: 'Nếu đã nộp bằng mẫu cũ hoặc sai hệ thống, hỏi ISA/cơ quan nhận hồ sơ càng sớm càng tốt để biết có cần bổ sung hay nộp lại.',
      officialSourceLabels: ['育成就労制度 — ISA', '特定在留カード等交付申請 — ISA', '新しい在留申請オンラインシステム — ISA'],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_policy2026_hero.jpg'),
    heroImageCaption: 'Các thay đổi chính sách cho người nước ngoài năm 2026',
    whoIsThisFor: [
      'Người nước ngoài đang ở Nhật và theo dõi thay đổi luật cư trú/lao động.',
      'Người chuẩn bị đi Nhật theo diện 技能実習 hoặc 特定技能.',
      'Người cần thông tin ngắn gọn, chính xác theo nguồn nhà nước Nhật.',
    ],
    whenToDo: [
      'Kiểm tra trước khi nộp hồ sơ, chuyển việc hoặc đổi tư cách lưu trú.',
      'Kiểm tra lại ngay trước mốc 01/04/2027.',
    ],
    whereToDo: [
      'Trang chính thức của 出入国在留管理庁 (ISA).',
      'Trang 特定技能 và 育成就労 của ISA.',
    ],
    estimatedTime: 'Nội dung chính sách đang ở giai đoạn chuyển tiếp nên cần theo dõi cập nhật chính thức định kỳ.',
    fees: [
      'Không có một mức phí chung cho tất cả thủ tục.',
      'Mức phí, mẫu đơn và giấy tờ có thể đổi theo đợt cập nhật.',
    ],
    documentsChecklist: [
      { label: 'Thẻ cư trú và hộ chiếu', required: true },
      { label: 'Thông tin tư cách lưu trú hiện tại', required: true },
      { label: 'Mẫu đơn đúng phiên bản theo ngày nộp', required: true },
    ],
    commonMistakes: [
      'Hiểu nhầm rằng hệ thống 育成就労 đã vận hành toàn bộ trong năm 2026.',
      'Không phân biệt “nộp trước hiệu lực” với “đã có hiệu lực”.',
      'Dùng mẫu biểu cũ cho hồ sơ 特定技能.',
      'Tưởng 特定在留カード là bắt buộc đổi ngay hoặc mọi thông tin lưu trú đều biến mất khỏi mặt thẻ.',
    ],
    faq: [
      {
        question: 'Mốc nào chắc chắn đúng cho 育成就労 và sửa đổi 特定技能?',
        answer: 'Theo Q&A chính thức của ISA, mốc bắt đầu vận hành là 01/04/2027.',
      },
      {
        question: 'Trong năm 2026 có gì đã mở?',
        answer: 'ISA công bố thủ tục 施行日前申請: dự kiến từ 15/04/2026 nhận hồ sơ xin phép 監理支援機関, và từ 01/09/2026 nhận hồ sơ công nhận 育成就労計画.',
      },
      {
        question: '特定技能 có cập nhật trong 2026 không?',
        answer: 'Có. Trang 特定技能 của ISA có nhiều cập nhật vận hành trong 2026 (hướng dẫn, biểu mẫu, quy định theo ngành).',
      },
      {
        question: '特定在留カード từ 14/06/2026 là gì?',
        answer: 'Đây là thẻ cư trú có thêm chức năng My Number Card nếu người thuộc điều kiện xin cấp. ISA nêu thẻ hiện hành vẫn tiếp tục có hiệu lực; người dùng chỉ nên làm theo thủ tục khi gia hạn, đổi tư cách, cấp lại hoặc khai báo thuộc nhóm được hướng dẫn.',
      },
      {
        question: 'Hệ thống online ISA có gì mới trong 2026?',
        answer: 'ISA cho biết hệ thống online mới dùng từ 05/01/2026, có các cải tiến như tăng dung lượng/tệp đính kèm, lưu tạm khi nhập và kéo dài hạn ID của tổ chức từ 1 năm lên 3 năm.',
      },
    ],
    officialLinks: [
      { label: '育成就労制度 — ISA', url: 'https://www.moj.go.jp/isa/applications/index_00005.html' },
      { label: '育成就労制度 Q&A — ISA', url: 'https://www.moj.go.jp/isa/applications/faq/ikusei_qa_00002.html' },
      { label: '育成就労制度に係る施行日前申請 — ISA', url: 'https://www.moj.go.jp/isa/03_00174.html' },
      { label: '特定技能制度 — ISA', url: 'https://www.moj.go.jp/isa/applications/ssw/index.html' },
      { label: '在留カードとは？— ISA', url: 'https://www.moj.go.jp/isa/applications/procedures/whatzairyu_00001.html?hl=en' },
      { label: '特定在留カード等交付申請 — ISA', url: 'https://www.moj.go.jp/isa/tokutei.html' },
      { label: '新しい在留申請オンラインシステム — ISA', url: 'https://www.moj.go.jp/isa/11_00064.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Chốt mốc hiệu lực',
        description: 'Ghi nhớ mốc pháp lý chính: 01/04/2027 là mốc vận hành cho 育成就労 và phần sửa đổi lớn liên quan 特定技能.',
        documents: [],
        tip: 'Nếu bài viết không ghi ngày hiệu lực, cần đối chiếu lại nguồn ISA.',
      },
      {
        step: 2,
        title: 'Tách riêng mốc tiền thủ tục năm 2026',
        description: 'Năm 2026 có các mốc nhận hồ sơ trước hiệu lực (施行日前申請), không phải vận hành đầy đủ hệ thống mới.',
        documents: [],
        tip: 'Đọc đúng cụm từ “施行日前申請” để tránh hiểu sai.',
      },
      {
        step: 3,
        title: 'Nộp theo biểu mẫu mới nhất',
        description: 'Trang 特定技能 cập nhật nhiều lần trong 2026, vì vậy cần tải và dùng đúng bộ mẫu mới nhất tại ngày nộp.',
        documents: [
          'Biểu mẫu/hướng dẫn mới nhất từ ISA',
        ],
        tip: 'Không dùng file cũ truyền tay.',
      },
      {
        step: 4,
        title: 'Từ 14/06/2026: thẻ cư trú mẫu mới và 特定在留カード',
        description: 'ISA nêu từ 14/06/2026 sẽ bắt đầu mẫu 在留カード mới và thẻ 特定在留カード có chức năng My Number Card. Đây không phải là việc đổi thẻ bắt buộc ngay cho mọi người: thẻ hiện hành vẫn tiếp tục có hiệu lực đến hạn của thẻ. Người muốn xin 特定在留カード cần làm trong các thủ tục được ISA nêu như gia hạn, đổi tư cách, vĩnh trú, cấp lại, đổi thông tin hoặc một số khai báo tại municipal office.',
        documents: [],
        tip: 'Không tự kết luận rằng phải lấy dấu vân tay/chữ ký điện tử hoặc không được ủy quyền nếu chưa đối chiếu đúng mục thủ tục. Hướng dẫn hiện tại của ISA nhấn mạnh điều kiện xin và nhóm thủ tục áp dụng.',
      },
      {
        step: 5,
        title: 'Từ 05/01/2026: hệ thống online ISA mới',
        description: 'ISA đã chuyển sang hệ thống 在留申請オンライン mới từ 05/01/2026. Các điểm thực tế cần nhớ: có lưu tạm khi nhập, tăng khả năng đính kèm tài liệu, có thể đính kèm nhiều file và ID của tổ chức liên quan được kéo dài từ 1 năm lên 3 năm.',
        documents: [
          'Tài khoản hệ thống online ISA nếu thuộc đối tượng được dùng',
          'Bản lưu thông tin hồ sơ cũ nếu cần tra cứu hồ sơ đã nộp trước 2026',
        ],
        tip: 'Nếu nộp online, dùng manual mới của ISA. Không dựa vào ảnh chụp màn hình/hướng dẫn cũ trước ngày 05/01/2026.',
      },
    ],
  };

export default japanPolicyUpdate2026ForeignResidents;
