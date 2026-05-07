import type { AdminGuide } from '../../../../types/content';

const visaStatusChangeDetailedScenarios: AdminGuide = {
    id: 'visa-status-change-detailed-scenarios',
    category: 'immigration',
    lastVerified: '2026-05-04',
    priority: 'normal',
    title: 'Đổi tư cách lưu trú — các tình huống chi tiết',
    titleJp: '在留資格変更許可申請 — 状況別の詳細ガイド',
    icon: 'swap-horizontal',
    color: '#3498DB',
    description: 'Thủ tục đổi từ tư cách lưu trú này sang tư cách khác (ví dụ: sinh viên thành công nhân, người lao động thành vợ/chồng). Phí, tài liệu, timeline thay đổi theo loại đổi.',
    whoIsThisFor: [
      'Sinh viên sắp tốt nghiệp muốn chuyển sang work visa.',
      'Lao động muốn kết hôn và chuyển sang spouse visa.',
      'Người muốn nâng cấp sang Highly Skilled Professional visa.',
      'Người muốn từ 技能実習 (trainee) chuyển sang 特定技能 (SSW).',
    ],
    whenToDo: [
      'Dành 3-6 tháng trước khi tư cách hiện tại hết hạn hoặc tình trạng thay đổi.',
      'Sinh viên tốt nghiệp 3/2026: nộp đơn chuyển sang work visa trước cuối 1/2026 để kịp làm việc 4/2026.',
      'Người kết hôn: sau khi có giấy chứng nhận kết hôn tại Nhật (婚姻届受理証明書), có thể nộp đơn chuyển sang spouse visa.',
      'Từ 技能実習 sang 特定技能: chỉ khi đủ điều kiện (hoàn tất training period, đạt exam).',
    ],
    whereToDo: [
      'ISA — cục công an nhập cảnh có thẩm quyền nơi cư trú hoặc nơi làm việc/học tập.',
      'Trực tiếp, bưu điện hoặc trực tuyến (nếu áp dụng với loại visa).',
      'Công ty, trường hoặc người bảo lãnh có thể hỗ trợ chuẩn bị hồ sơ, nhưng người nộp phải nộp chính.',
    ],
    estimatedTime: 'Thời gian xét duyệt thay đổi từ 2-4 tuần đến 2-3 tháng tùy loại đổi, hồ sơ và khu vực. Phí: ~¥4,000-¥10,000 (2026 có tăng phí dự kiến).',
    fees: [
      'Phí cơ bản: ~¥4,000 (2025), dự kiến tăng lên ~¥30,000-¥40,000 vào năm tài chính 2026 (từ 4/2026).',
      'Phí không hoàn lại nếu bị từ chối.',
      'Kiểm tra phí chính thức tại ISA trước khi nộp vì có thể thay đổi theo thời gian.',
    ],
    commonMistakes: [
      'Nộp đơn quá sát hạn tốt nghiệp/kết hôn — không kịp cấp visa mới.',
      'Không chuẩn bị giấy tờ đủ từ công ty/trường đông đúc (họ cần thời gian để xác nhân).',
      'Nhầm lẫn giữa đổi tư cách (在留資格変更) với gia hạn thời hạn (在留期間更新) — là hai thủ tục khác nhau.',
      'Người bảo lãnh (sponsor) không đủ điều kiện tài chính — công ty quá nhỏ hoặc lương quá thấp.',
      'Hộ chiếu sắp hết hạn — không chuẩn bị cập nhật trước.',
    ],
    faq: [
      {
        question: 'Phí có tăng năm 2026 thực sự không?',
        answer: 'Có. Theo thông báo ISA (tháng 1/2026), phí thủ tục sẽ tăng đáng kể từ năm tài chính 2026 (4/2026 trở đi). Dự kiến phí đổi tư cách sẽ từ ~¥30,000-¥40,000 (tăng từ ~¥4,000-¥10,000). Hãy kiểm tra chính thức tại ISA trước khi nộp.',
      },
      {
        question: 'Nộp đơn trước khi hết hạn tư cách hiện tại được không?',
        answer: 'Được. Bạn có thể nộp đơn đổi tư cách trước khi tư cách hiện tại hết hạn. Một khi nộp, bạn có thể tiếp tục hoạt động dưới tư cách hiện tại khi chờ kết quả (về nguyên tắc). Tuy nhiên, nên nộp sớm hơn là quá sát hạn.',
      },
      {
        question: 'Nếu bị từ chối đổi tư cách thì sao?',
        answer: 'Nếu bị từ chối, bạn sẽ quay lại tư cách cũ. Nên chuẩn bị kỹ càng và có tài liệu bổ sung trước khi nộp. Nếu bị từ chối, hãy hỏi ISA chi tiết lý do trước khi nộp lại (tương tự như quy trình visa rejection).',
      },
      {
        question: 'Từ 技能実習 sang 特定技能 có điều kiện nào?',
        answer: 'Có. Bạn cần: (1) hoàn tất toàn bộ training period (thường 3 năm), (2) đạt exam 技能検定 / Kỹ năng kiểm tra, (3) công ty mới có đơn vị SSW hoặc nhân viên chuyên. ISA sẽ kiểm tra chặt chẽ. Tìm hiểu tại OTIT (外国人技能実習機構).',
      },
      {
        question: 'Lương cần bao nhiêu để đổi sang work visa?',
        answer: 'Không có mức lương tối thiểu chính thức. Tuy nhiên, ISA muốn chắc chắn bạn có đủ tiền sống ở Nhật. Thông thường, công ty phải chứng minh: (1) lương phù hợp với địa phương và công việc, (2) có khả năng trả lương ổn định, (3) bạn có tiết kiệm hoặc bảo lãnh tài chính. Lương quá thấp có thể bị từ chối.',
      },
    ],
    officialLinks: [
      { label: 'ISA — Đổi tư cách lưu trú', url: 'https://www.moj.go.jp/isa/applications/procedures/16-4.html' },
      { label: 'ISA — Thông báo sửa phí 2026', url: 'https://www.moj.go.jp/isa/01_00518.html' },
      { label: 'OTIT — Từ 技能実習 sang 特定技能', url: 'https://www.otit.go.jp/' },
    ],
    steps: [
      {
        step: 1,
        title: 'Xác định loại đổi tư cách và điều kiện',
        description: '**6 tình huống phổ biến:**\n\n| Từ | Sang | Điều kiện chính | Timeline |\n|---|---|---|---|\n| **Student visa** | Work visa (技術・人文知識・国際業務) | Bằng cấp + job offer từ công ty | Nộp trước cuối 1/2026 nếu tốt nghiệp 3/2026 |\n| **Work visa** | Spouse visa (配偶者) | Kết hôn tại Nhật + 婚姻届受理証明書 | Nộp sau khi 婚姻届 được chấp nhận |\n| **Work visa** | Highly Skilled (高度専門職) | Điểm đánh giá ≥70 + công ty confirm | Dành 3-6 tháng chuẩn bị |\n| **Training (技能実習)** | SSW (特定技能) | Hoàn tất training + pass exam | Nộp trước khi training hết |\n| **Short-stay** | Work/Student | Job offer hoặc nhập học confirm | Nộp sớm — short-stay không dài |\n| **Any** | Dependent (家族滞在) | Bảo lãnh tài chính từ người sponsor | Nộp khi sponsor có đơn vị nhân sự confirm |\n\nKiểm tra điều kiện của tư cách mục tiêu tại ISA website.',
        documents: ['Hộ chiếu', 'Thẻ cư trú hiện tại', 'Job offer / admission letter / marriage certificate tùy loại đổi'],
        tip: 'Nếu không chắc điều kiện, hãy liên hệ ISA hoặc 行政書士 chuyên về loại visa mục tiêu.',
      },
      {
        step: 2,
        title: 'Chuẩn bị hồ sơ từ công ty / trường / bảo lãnh',
        description: '**Đối với Work Visa (từ Student):**\n- 在籍証明書 (từ trường xác nhận kết thúc khóa học)\n- 雇用契約書 (hợp đồng lao động chính thức từ công ty)\n- 雇用理由書 (lý do công ty tuyển dụng — khả năng, kỹ năng, etc.)\n- Giấy xác nhận từ HR của công ty\n- 決算報告書 hoặc 登記簿謄本 (tài liệu tài chính/pháp lý của công ty)\n\n**Đối với Spouse Visa:**\n- 婚姻届受理証明書 (từ municipal office xác nhận kết hôn tại Nhật)\n- 在籍証明書 nếu bảo lãnh từ người Nhật\n- Giấy xác nhận tài chính (給与見積書, 銀行残高証明書)\n\n**Đối với SSW (từ Training):**\n- 修了証明書 (xác nhận hoàn tất training)\n- Chứng chỉ exam 技能検定\n- Job offer từ công ty SSW hoặc công ty thường đã ký hợp đồng\n\nMỗi tài liệu từ công ty/trường có thể cần 2-4 tuần để chuẩn bị — hãy bắt đầu sớm.',
        documents: ['Tài liệu từ công ty/trường/bảo lãnh', 'Bản sao hoặc tài liệu liên quan'],
        tip: 'Công ty/trường thường bận — liên hệ HR/quản lý sớm, cho biết deadline của bạn và cần gì chính xác.',
      },
      {
        step: 3,
        title: 'Chuẩn bị giấy tờ cá nhân và nộp đơn',
        description: '**Giấy tờ phổ biến cần chuẩn bị:**\n\n- **Đơn xin đổi tư cách** (在留資格変更許可申請書) — tải từ ISA website theo loại visa mục tiêu\n- **Ảnh thẻ** — 4cm × 3cm, nền trắng, chụp trong 3 tháng gần nhất\n- **Hộ chiếu** — mang bản gốc, còn hạn\n- **Thẻ cư trú** — mang bản gốc\n- **Giấy tờ từ công ty/trường** — như bước 2\n- **Lý do giải trình** (理由書) — nếu có tình huống đặc biệt (ví dụ: thay đổi kế hoạch công việc, sự cố gia đình)\n\n**Nộp tại:**\n- Trực tiếp: ISA cục công an nhập cảnh nơi cư trú\n- Hoặc: trực tuyến nếu loại visa áp dụng hệ thống trực tuyến\n\n**Phí:**\n- Hiện tại ~¥4,000-¥10,000 (2026 dự kiến tăng lên ~¥30,000-¥40,000)\n- Nộp tại lúc nộp đơn hoặc khi nhận kết quả tùy ISA',
        documents: ['Đơn xin (in từ ISA website)', 'Ảnh thẻ', 'Hộ chiếu', 'Thẻ cư trú', 'Tài liệu từ bước 2', 'Lý do giải trình (nếu cần)'],
        tip: 'Kiểm tra website ISA nơi bạn sẽ nộp để xác nhận loại tài liệu cần thiết — có thể khác nhau giữa các cục.',
      },
      {
        step: 4,
        title: 'Chờ kết quả và chuẩn bị tiếp theo',
        description: 'Thời gian xét duyệt: 2-4 tuần (nhanh) đến 2-3 tháng (chậm) tùy hồ sơ, ISA cục và mùa bận.\n\n**Nếu được phê duyệt:**\n- ISA sẽ thông báo. Đến ISA để cấp thẻ cư trú mới hoặc COE\n- Thẻ mới sẽ ghi tư cách mới, ngày hết hạn mới\n- Bắt đầu hoạt động với tư cách mới từ ngày cấp thẻ\n- Nên chuẩn bị: hợp đồng lao động, xin phép hoạt động ngoài tư cách (nếu có), thông báo chuyển tư cách với bảo hiểm/thuế\n\n**Nếu bị từ chối:**\n- Hỏi ISA chi tiết lý do\n- Nộp lại với tài liệu bổ sung hoặc xem xét đổi sang visa khác\n- Không bao giờ nộp lại ngay nếu không hiểu rõ vấn đề',
        documents: ['Giấy thông báo từ ISA', 'Lịch nhận thẻ cư trú mới'],
        tip: 'Giữ bản sao hồ sơ nộp cho tham khảo — nếu bị từ chối lần sau bạn sẽ cần.',
      },
    ],
  };

export default visaStatusChangeDetailedScenarios;
