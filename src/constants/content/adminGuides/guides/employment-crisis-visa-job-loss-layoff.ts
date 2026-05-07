import type { AdminGuide } from '../../../../types/content';

const employmentCrisisVisaJobLossLayoff: AdminGuide = {
    id: 'employment-crisis-visa-job-loss-layoff',
    category: 'immigration',
    lastVerified: '2026-05-04',
    priority: 'normal',
    title: 'Bị đuổi việc / công ty phá sản — visa sẽ thế nào?',
    titleJp: '解雇・会社倒産と就労ビザの対応',
    icon: 'alert-circle',
    color: '#E74C3C',
    description: 'Quyền lợi visa khi bị đuổi việc hoặc công ty phá sản. Có cách xử lý chủ động để có thời gian tìm việc mới mà không phải rời Nhật ngay.',
    whoIsThisFor: [
      'Người vừa được thông báo sẽ bị sa thải hoặc công ty phá sản.',
      'Người muốn biết có bao lâu để tìm việc mới trên work visa.',
      'Người muốn hiểu khác biệt giữa \"công ty đuổi\" vs \"tự xin thôi\".',
    ],
    whenToDo: [
      'Ngay khi được thông báo sẽ bị sa thải — liên hệ ISA hoặc 行政書士 để tìm hiểu tùy chọn.',
      'Trước khi ngày cuối cùng làm việc — hỏi công ty xin giấy xác nhận bị sa thải (会社都合による雇用終了証明書).',
      'Trong 14 ngày sau ngày sa thải — nộp đơn xin 特定活動 (job-seeking status) tại ISA.',
      'Nếu không làm gì: khi work visa hết hạn, phải rời Nhật.',
    ],
    whereToDo: [
      'ISA — cục công an nhập cảnh. Nộp đơn xin 特定活動 (job-seeking status).',
      'Công ty: xin giấy xác nhận bị sa thải (xứ sứ công ty hoặc phòng HR).',
      '労働基準監督署 (labor standards bureau) — nếu công ty có vi phạm lao động (wage theft, unsafe conditions).',
    ],
    estimatedTime: '14 ngày để nộp đơn. 1-2 tuần để ISA phê duyệt 特定活動. Thời gian job-seeking: 6 tháng (có thể được gia hạn trong trường hợp đặc biệt).',
    commonMistakes: [
      'Tự xin thôi việc — khi đó không được 特定活動, phải tìm việc trước khi work visa hết.',
      'Quên xin giấy xác nhận bị sa thải từ công ty — ISA sẽ cần để verify.',
      'Quá 14 ngày sau sa thải mới nộp đơn — có thể không được 特定活動 (hạn chế).',
      'Làm black market/part-time mà không xin 資格外活動許可 — không được phép khi trên job-seeking status.',
      'Không tìm việc chủ động — ISA có thể kiểm tra, nếu chẳng làm gì = bị từ chối gia hạn.',
    ],
    faq: [
      {
        question: '特定活動 (job-seeking status) là gì?',
        answer: 'Là visa tạm thời cho những người bị sa thải bởi công ty, cho phép ở Nhật 6 tháng để tìm việc mới. Sau 6 tháng, phải (1) tìm được việc mới (đổi visa), hoặc (2) rời Nhật.',
      },
      {
        question: 'Có lợi gì khi bị sa thải (会社都合) vs tự xin thôi (自己都合)?',
        answer: 'Rất khác. Nếu **bị sa thải (công ty lỗi)**: được 特定活動 6 tháng để tìm việc. Nếu **tự xin thôi**: không được 特定活動, phải tìm việc trước khi work visa hết (thường vài tháng). Vì vậy nên ghi rõ \"bị sa thải\" khi xin đơn từ công ty, không nên tự ý resign.',
      },
      {
        question: 'Công ty tự đóng cửa — tôi có được 特定活動 không?',
        answer: 'Có. Nếu công ty phá sản (倒産) hoặc đóng cửa, bạn được coi là \"bị sa thải do công ty\". Xin giấy xác nhận từ công ty (hoặc từ phòng xử lý tình trạng công ty). ISA sẽ cấp 特定活動 để bạn tìm việc.',
      },
      {
        question: 'Trong 特定活動 6 tháng, tôi có thể làm part-time không?',
        answer: 'Có thể làm part-time (up to 20 hours/week hoặc phụ thuộc ISA hướng dẫn). Tuy nhiên, phải xin 資格外活動許可 riêng nếu part-time là \"business\". Nếu part-time ở cửa hàng = không cần phép riêng, chỉ cần báo ISA.',
      },
      {
        question: 'Nếu tìm được việc mới trong 6 tháng thì sao?',
        answer: 'Khi tìm được công ty mới, nộp đơn xin đổi visa sang work visa mới cùng cách như bình thường (change of status). Công ty mới phải chuẩn bị tài liệu support. Sau khi được phê duyệt, bạn sẽ có work visa mới từ công ty mới.',
      },
      {
        question: 'Nếu 6 tháng rồi vẫn không tìm được việc thì sao?',
        answer: '特定活動 sẽ hết. Bạn phải rời Nhật. Tuy nhiên, có thể xin gia hạn 特定活動 nếu có lý do chính đáng (ví dụ: đang interview, offer sắp tới). ISA sẽ xem xét từng trường hợp.',
      },
    ],
    officialLinks: [
      { label: 'ISA — 特定活動 (Job-Seeking Status)', url: 'https://www.moj.go.jp/isa/applications/status/designatedactivities04.html' },
      { label: '労働基準監督署 — Dispute Mediation', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/index.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Công ty thông báo sẽ sa thải — hành động ngay',
        description: 'Khi công ty nói \"bạn sẽ bị sa thải\" hoặc \"công ty sắp đóng cửa\":\n\n**Hỏi ngay:**\n- Ngày cuối cùng làm việc khi nào?\n- Tôi có được severance pay không? Bao nhiêu?\n- Tôi có xin giấy xác nhận bị sa thải (解雇予告通知書 hoặc 雇用終了証明書) không?\n\n**Xin giấy chứng minh rõ ràng:**\n- **解雇予告通知書** (announcement letter — nói rõ ngày, lý do)\n- **雇用終了証明書** (employment termination certificate — sau khi có hiệu lực)\n\nGiấy này rất quan trọng — ISA sẽ cần để verify bạn bị sa thải (không phải tự resign).',
        documents: ['Hợp đồng lao động', 'Thông báo sa thải từ công ty'],
        tip: 'Nếu công ty từ chối xin giấy hoặc muốn \"cải thiện\" bằng cách gọi đó là \"voluntary resignation\" — từ chối. Bạn cần giấy ghi rõ \"company-caused\" (会社都合).',
      },
      {
        step: 2,
        title: 'Liên hệ ISA trong vòng 14 ngày sau sa thải',
        description: 'Sau khi bị sa thải, bạn có **14 ngày** để báo ISA và nộp đơn xin 特定活動 (job-seeking status).\n\n**Báo ISA:**\n- Trực tiếp: đến cục công an nhập cảnh nơi cư trú\n- Nói: \"Tôi vừa bị sa thải từ công ty ngày [ngày]. Tôi muốn xin 特定活動 để tìm việc.\"\n- Mang theo: hộ chiếu, thẻ cư trú, giấy xác nhận bị sa thải\n\nISA sẽ giải thích quy trình và cho form xin 特定活動.',
        documents: ['Hộ chiếu', 'Thẻ cư trú', 'Giấy xác nhận bị sa thải từ công ty'],
        tip: 'Đừng trì hoãn — 14 ngày là deadline. Nếu quá hạn, ISA có thể không cấp 特定活動 hoặc hạn chế.',
      },
      {
        step: 3,
        title: 'Nộp đơn xin 特定活動 (Job-Seeking Status)',
        description: '**Chuẩn bị:**\n- **Đơn xin 特定活動** (在留資格変更許可申請 — job-seeking purpose) — in từ ISA website\n- **Hộ chiếu + thẻ cư trú**\n- **Giấy xác nhận bị sa thải từ công ty** (rất quan trọng)\n- **Lý do giải trình** (理由書): \"Công ty [tên] thông báo sẽ sa thải tôi vào [ngày]. Tôi muốn ở lại Nhật 6 tháng để tìm việc mới phù hợp với tư cách lưu trú hiện tại.\"\n- **Bằng chứng tìm việc** (nếu có): CV, offer letter từ công ty khác, hoặc planning letter nói rõ cách tìm việc\n\n**Nộp:**\n- Trực tiếp tại ISA hoặc trực tuyến (nếu áp dụng)\n- Phí: 0 (miễn phí)\n\n**Thời gian phê duyệt:** 1-2 tuần',
        documents: ['Đơn xin 特定活動 (in từ ISA)', 'Hộ chiếu', 'Thẻ cư trú', 'Giấy xác nhận bị sa thải', 'Lý do giải trình', 'CV/planning letter (nếu có)'],
        tip: 'Giấy xác nhận bị sa thải là chìa khóa — nếu không có, ISA có thể không duyệt. Hãy đảm bảo nó rõ ràng ghi \"会社都合\" (company-caused).',
      },
      {
        step: 4,
        title: 'Được phê duyệt 特定活動 — bắt đầu tìm việc',
        description: 'Nếu được phê duyệt:\n\n- Bạn sẽ nhận **thẻ cư trú mới** với status **特定活動** (job-seeking)\n- Ngày hết hạn sẽ là **6 tháng** từ ngày phê duyệt\n- Trên thẻ sẽ ghi: \"Designated Activity - Job Seeking\" hoặc tương tự\n\n**Bây giờ bạn có 6 tháng để:**\n\n✅ **Làm:**\n- Tìm việc (interview, submit CV, network)\n- Làm part-time/temp job (nên xin phép 資格外活動許可 nếu là business)\n- Tham gia job fair, training khóc học để tăng kỹ năng\n- Liên hệ 行政書士 hoặc recruitment agency để hỗ trợ\n\n❌ **Không nên:**\n- Tụt dốc—không làm gì & chỉ chơi\n- Làm black market mà không báo\n- Bỏ cuộc quá sớm\n\n**Nếu tìm được việc:**\n- Công ty mới sẽ chuẩn bị tài liệu untuk change of status\n- Bạn nộp đơn xin change sang work visa (từ 特定活動 → 技術・人文知識・国際業務 hoặc loại khác)\n- Thông thường phê duyệt trong 2-4 tuần',
        documents: ['Thẻ cư trú mới', 'Job offer từ công ty mới'],
        tip: 'Hãy chủ động tìm việc — nếu ISA phát hiện bạn không làm gì trong 6 tháng, gia hạn 特定活動 sẽ khó.',
      },
      {
        step: 5,
        title: 'Nếu không tìm được việc trong 6 tháng',
        description: 'Khi 特定活動 sắp hết (gần deadline 6 tháng):\n\n**Lựa chọn 1: Xin gia hạn 特定活動**\n- Nếu bạn có job offer sắp confirm (2-4 tuần nữa), đang ở vòng interview cuối, hoặc lý do chính đáng khác\n- ISA có thể gia hạn thêm 1-3 tháng\n- Tuy nhiên, tỷ lệ duyệt không cao — ISA muốn chắc bạn thực sự gần xong\n\n**Lựa chọn 2: Chuyển sang visa khác (nếu đủ điều kiện)**\n- Visa du học (nếu có nhập học offer)\n- Spouse visa (nếu kết hôn)\n- Dependent visa (nếu có người Nhật bảo lãnh tài chính)\n- Nông thôn visa (nếu muốn ở lại vùng nông thôn Nhật)\n\n**Lựa chọn 3: Rời Nhật**\n- 特定活動 hết = phải rời\n- Công ty cũ (nếu còn hoạt động) có thể hỗ trợ thủ tục rời (trả lương cuối, hạch toán thuế)\n- Nếu muốn quay lại Nhật sau này, có thể làm visa mới từ Việt Nam',
        documents: ['Giấy xác nhận job offer hoặc interview schedule', 'Hộ chiếu'],
        tip: 'Nếu đang ở tình trạng khó khăn — tìm người bạn/gia đình bảo lãnh hoặc hỏi ngành ngoại giao Việt Nam xem có biện pháp hỗ trợ nào không.',
      },
    ],
  };

export default employmentCrisisVisaJobLossLayoff;
