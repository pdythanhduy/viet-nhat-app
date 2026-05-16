import type { AdminGuide } from '../../../../types/content';

const japanPolicy2026ActionByUserType: AdminGuide = {
    id: 'japan-policy-2026-action-by-user-type',
    category: 'visa',
    lastVerified: '2026-05-16',
    priority: 'high',
    title: 'Chính sách 2026: Hành động theo từng nhóm người dùng',
    titleJp: '2026年制度変更：対象者別アクションガイド',
    icon: 'list',
    color: '#2874A6',
    description: 'Bản tóm tắt thực hành theo 2 nhóm: (1) người đang sống tại Nhật, (2) người chuẩn bị vào Nhật. Nội dung bám theo cập nhật chính thức của ISA/MOFA.',
    heroImage: require('../../../../../assets/content/daily-life/ag_policy-action_hero.jpg'),
    heroImageCaption: 'Việc cần làm theo nhóm đối tượng trong năm 2026',
    whoIsThisFor: [
      'Người cần danh sách việc cần làm ngay, không chỉ đọc tin chính sách.',
      'Người đang ở Nhật muốn tránh nộp sai mẫu, sai mốc thời gian.',
      'Người chuẩn bị vào Nhật muốn chọn đúng lộ trình hồ sơ từ đầu.',
    ],
    whenToDo: [
      'Dùng trước khi nộp hồ sơ mới hoặc đổi tư cách lưu trú.',
      'Dùng để rà lại checklist trước các mốc cập nhật lớn năm 2026-2027.',
    ],
    whereToDo: [
      'Trang cập nhật chính thức của ISA về 特定技能/育成就労.',
      'Trang MOFA đối với eVISA và các diện visa ngắn hạn.',
    ],
    estimatedTime: '5-10 phút để đối chiếu nhóm phù hợp và chốt hành động ưu tiên.',
    fees: [
      'Không có phí cho việc theo dõi/cập nhật thông tin chính sách.',
      'Phí phát sinh phụ thuộc thủ tục cụ thể khi nộp hồ sơ thực tế.',
    ],
    documentsChecklist: [
      { label: 'Thẻ cư trú và hộ chiếu (nếu đang ở Nhật)', required: false },
      { label: 'Thông tin loại hồ sơ đang chuẩn bị nộp', required: true },
      { label: 'Biểu mẫu mới nhất tại ngày nộp', required: true },
      { label: 'Nguồn dẫn chính thức ISA/MOFA tương ứng', required: true },
    ],
    commonMistakes: [
      'Dùng thông tin mạng xã hội mà không chốt lại bằng nguồn chính thức.',
      'Không tách mục tiêu short-term (du lịch) và long-term (lao động/cư trú).',
      'Xem mốc “nộp trước hiệu lực” như mốc “đã áp dụng toàn bộ”.',
    ],
    faq: [
      {
        question: 'Nhóm nào áp dụng cho tôi nếu tôi đã có thẻ cư trú ở Nhật?',
        answer: 'Bạn thuộc nhóm “đang sống tại Nhật”; ưu tiên rà biểu mẫu mới, mốc cập nhật theo ngành và yêu cầu định kỳ theo status hiện tại.',
      },
      {
        question: 'Nếu tôi chưa vào Nhật, nên bắt đầu từ đâu?',
        answer: 'Bắt đầu bằng xác định mục tiêu: short-term (du lịch/eVISA) hay long-term (lao động/cư trú). Nếu long-term, đi theo luồng COE + tư cách lưu trú phù hợp.',
      },
    ],
    officialLinks: [
      { label: '育成就労制度 — ISA', url: 'https://www.moj.go.jp/isa/applications/index_00005.html' },
      { label: '特定技能制度 — ISA', url: 'https://www.moj.go.jp/isa/applications/ssw/index.html' },
      { label: 'JAPAN eVISA — MOFA', url: 'https://www.mofa.go.jp/j_info/visit/visa/visaonline.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Xác định bạn thuộc nhóm nào',
        description: 'Nhóm A: đang sống tại Nhật (đã có thẻ cư trú). Nhóm B: chuẩn bị vào Nhật (chưa có tư cách lưu trú tại Nhật).',
        documents: [],
        tip: 'Không trộn hai nhóm vì checklist và rủi ro sai khác nhau.',
      },
      {
        step: 2,
        title: 'Nhóm A (đang sống tại Nhật): kiểm tra 3 điểm bắt buộc',
        description: 'Kiểm tra mốc cập nhật mới nhất trên ISA, dùng đúng biểu mẫu hiện hành, và đối chiếu nghĩa vụ định kỳ theo status hiện tại.',
        documents: [
          'Thẻ cư trú',
          'Biểu mẫu mới nhất của ISA',
          'Hồ sơ lao động/học tập hiện tại',
        ],
        tip: 'Không dùng mẫu cũ đã tải trước đó nếu ISA vừa cập nhật.',
      },
      {
        step: 3,
        title: 'Nhóm B (chuẩn bị vào Nhật): chọn đúng luồng hồ sơ',
        description: 'Nếu mục tiêu là làm việc/sống dài hạn, theo luồng COE + tư cách lưu trú. Nếu mục tiêu chỉ du lịch ngắn hạn, mới xem eVISA theo điều kiện MOFA.',
        documents: [
          'Hộ chiếu',
          'Giấy tờ năng lực/hợp đồng (nếu diện lao động)',
          'COE nếu diện yêu cầu',
        ],
        tip: 'eVISA du lịch không thay thế hồ sơ lao động/cư trú dài hạn.',
      },
      {
        step: 4,
        title: 'Chốt lại mốc pháp lý quan trọng',
        description: 'Mốc vận hành chính của 育成就労/điều chỉnh lớn liên quan 特定技能 là 01/04/2027; năm 2026 có các thủ tục nộp trước hiệu lực.',
        documents: [],
        tip: 'Khi quyết định hồ sơ, luôn kiểm tra lại ngày hiệu lực ở trang nguồn.',
      },
    ],
  };

export default japanPolicy2026ActionByUserType;
