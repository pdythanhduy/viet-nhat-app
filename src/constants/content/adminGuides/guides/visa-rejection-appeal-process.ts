import type { AdminGuide } from '../../../../types/content';

const visaRejectionAppealProcess: AdminGuide = {
    id: 'visa-rejection-appeal-process',
    category: 'immigration',
    lastVerified: '2026-05-04',
    priority: 'normal',
    title: 'Visa bị từ chối và cách kháng cáo / nộp lại',
    titleJp: '在留許可申請が不許可になった場合の対処法',
    icon: 'close-circle',
    color: '#E74C3C',
    description: 'Thủ tục khi visa hoặc Certificate of Eligibility (COE) bị từ chối. Không có process appeal chính thức, nhưng có thể nộp lại bằng cách sửa lý do bị từ chối.',
    whoIsThisFor: [
      'Người bị từ chối visa (work, student, spouse, dependent, change of status) và muốn biết cách tiếp theo.',
      'Người muốn hiểu chi tiết lý do bị từ chối trước khi nộp lại.',
      'Người không chắc liệu có thể appeal hay phải nộp lại từ đầu.',
    ],
    whenToDo: [
      'Ngay sau khi nhận thông báo từ chối, hãy liên hệ immigration bureau để hỏi chi tiết lý do.',
      'Không nên nộp lại ngay mà hãy phân tích kỹ vấn đề và chuẩn bị tài liệu bổ sung.',
      'Không có waiting period bắt buộc — có thể nộp lại ngày hôm sau nếu đã sửa được vấn đề.',
    ],
    whereToDo: [
      'Immigration Bureau (ISA / 出入国在留管理庁) — cục công an nhập cảnh có thẩm quyền nơi bạn nộp hồ sơ ban đầu.',
      'Liên hệ để hỏi chi tiết: đương mặt tại quầy hoặc gọi hotline nếu cục có hỗ trợ.',
      'Tương tự như ban đầu nộp tại cùng một cục hoặc trực tuyến nếu áp dụng.',
    ],
    estimatedTime: 'Không có waiting period bắt buộc. Thời gian xét duyệt lần nộp lại phụ thuộc hồ sơ và khu vực, thường từ vài tuần đến vài tháng. Tỷ lệ approved ở lần nộp lại là cao nếu đã sửa được điểm yếu chính.',
    commonMistakes: [
      'Nộp lại ngay mà không hỏi chi tiết lý do bị từ chối từ ISA.',
      'Chuẩn bị lại hồ sơ giống hệt lần trước mà không sửa các vấn đề cơ bản.',
      'Không hiểu rõ ISA muốn kiểm chứng điều gì — ví dụ: thu nhập thực tế, chứng minh công việc khớp visa, hay tài chính đủ để sống ở Nhật.',
      'Nộp lại qua 行政書士 mà không rõ 行政書士 sẽ làm gì cụ thể.',
      'Chờ quá lâu để nộp lại, do vậy có thể bị hết hạn các tài liệu hỗ trợ.',
    ],
    faq: [
      {
        question: 'Không có process "appeal" chính thức sao?',
        answer: 'Đúng. Luật Nhật không có "appeal" để lật ngược quyết định từ chối. Tuy nhiên, bạn có quyền nộp lại hồ sơ bất kỳ lúc nào với tài liệu bổ sung. Nếu không đồng ý quyết định, bạn có thể đề nghị ISA xem xét lại hoặc tìm hiểu về 行政不服審査請求 (administrative objection), nhưng hình thức này rất hiếm được áp dụng cho visa.',
      },
      {
        question: 'Cần bao lâu để nộp lại?',
        answer: 'Không có waiting period bắt buộc. Bạn có thể nộp lại ngày hôm sau nếu đã chuẩn bị tài liệu. Tuy nhiên, nên dành thời gian để hiểu rõ vấn đề và chuẩn bị kỹ càng.',
      },
      {
        question: 'Tỷ lệ approved ở lần nộp lại là bao nhiêu?',
        answer: 'Không có thống kê chính thức, nhưng theo các 行政書士, tỷ lệ approved ở lần nộp lại là cao nếu đã sửa được điểm yếu chính. Những trường hợp "không bao giờ approved" thường liên quan đến vấn đề cơ bản như: không đủ điều kiện visa, hộ chiếu hết hạn, hoặc có vấn đề pháp lý.',
      },
      {
        question: 'Khi nào nên thuê 行政書士?',
        answer: 'Nên thuê khi: (1) bạn không tự hiểu lý do từ chối, (2) tài liệu phức tạp (ví dụ: sponsor company đang gặp khó khăn tài chính), (3) bạn đã nộp lại lần thứ 2 mà vẫn bị từ chối. 行政書士 có kinh nghiệm biết cách cải thiện hồ sơ và giao tiếp với ISA. Tuy nhiên, họ không thể "appeal" hoặc "lật ngược" quyết định.',
      },
      {
        question: 'Nếu bị từ chối 3 lần thì sao?',
        answer: 'Nên tìm hiểu kỹ xem vấn đề cơ bản là gì. Ví dụ: nếu bị từ chối lần 2-3 vì thu nhập quá thấp, có thể bạn không phù hợp với visa hiện tại. Hãy xem xét đổi sang visa khác hoặc đợi cải thiện tình hình tài chính.',
      },
    ],
    officialLinks: [
      { label: 'ISA — Các loại visa & tư cách lưu trú', url: 'https://www.moj.go.jp/isa/applications/status/index.html' },
      { label: 'ISA — Nếu bị từ chối, cách tìm hiểu chi tiết', url: 'https://www.moj.go.jp/isa/applications/procedures/' },
      { label: 'Danh sách ISA offices theo khu vực', url: 'https://www.moj.go.jp/isa/about/region/index.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Kiểm tra thông báo từ chối và lý do chính thức',
        description: 'ISA sẽ gửi **不許可処分書** (thông báo từ chối chính thức) kèm **不許可理由** (lý do từ chối). Tuy nhiên, lý do thường chỉ một dòng ngắn gọn như:\n\n- 「当該大学における勉学態度が不適切である」\n- 「雇用契約書と実際の勤務内容が異なる」\n- 「経済的能力の不足」\n\nLý do này thường **không rõ chi tiết**. Bước tiếp theo là hỏi trực tiếp ISA để hiểu kỹ hơn.',
        documents: ['Thông báo từ chối từ ISA', 'Thẻ cư trú hoặc giấy xác nhận gửi hồ sơ nếu chưa nhận được thẻ'],
        tip: 'Giữ bản gốc thông báo từ chối — bạn sẽ cần khi nộp lại hoặc tương tác với ISA.',
      },
      {
        step: 2,
        title: 'Liên hệ ISA để hỏi chi tiết lý do từ chối',
        description: 'Đến trực tiếp quầy ISA hoặc gọi hotline của cục công an nhập cảnh nơi xử lý hồ sơ của bạn. Hỏi cụ thể:\n\n- **Vấn đề nào là chính?** (tài chính, tư cách không phù hợp, tài liệu thiếu, hay vấn đề khác?)\n- **Cần thêm tài liệu gì để sửa được?**\n- **Có điều kiện cần thỏa mãn gì trước khi nộp lại không?** (ví dụ: tăng đơn vị nhân sự, bổ sung lương)\n- **Người nào/ phòng nào xử lý có thể cung cấp gợi ý không?**\n\n**Lưu ý:** ISA không được "hướng dẫn" chi tiết cách nộp lại, nhưng có thể giải thích lý do từ chối.',
        documents: ['Thông báo từ chối từ ISA', 'Hộ chiếu hoặc thẻ cư trú để xác minh danh tính'],
        tip: 'Nếu nhân viên ISA không giải thích rõ, hãy hỏi người quản lý hoặc tìm hiểu thêm từ 行政書士 có kinh nghiệm với loại visa của bạn.',
      },
      {
        step: 3,
        title: 'Phân tích vấn đề và chuẩn bị kế hoạch nộp lại',
        description: '**Dựa trên lý do từ chối, xác định vấn đề chính:**\n\n| Lý do từ chối | Vấn đề có thể | Cách sửa |\n|---|---|---|\n| Tài chính không đủ | Thu nhập thấp, tiết kiệm ít | Tăng lương, thêm người bảo lãnh, tiết kiệm thêm 3-6 tháng |\n| Công việc không khớp visa | Công việc thực tế khác đơn vị nhân sự khai báo | Điều chỉnh hợp đồng hoặc chuyển bộ phận sao cho khớp |\n| Tư cách không phù hợp | Điều kiện sinh hoạt/công việc đã thay đổi | Đánh giá lại xem visa hiện tại có phù hợp không; có cần đổi sang visa khác? |\n| Tài liệu thiếu | Hộ chiếu hết hạn, bằng cấp không công chứng | Cập nhật/công chứng tài liệu thiếu |\n| Vấn đề pháp lý | Lịch sử hành chính đỏ, nợ thuế | Giải quyết vấn đề pháp lý trước — nộp lại có thể vẫn bị từ chối |\n\nNếu không chắc, hãy tư vấn với 行政書士 chuyên về visa.',
        documents: [],
        tip: 'Đừng nộp lại ngay mà dành 2-4 tuần để chuẩn bị kỹ càng. Nộp lại nhanh mà không sửa được vấn đề chính = tiếp tục bị từ chối.',
      },
      {
        step: 4,
        title: 'Chuẩn bị và nộp lại hồ sơ',
        description: 'Nộp lại với tài liệu bổ sung giải quyết vấn đề chính. Ví dụ:\n\n**Nếu vấn đề tài chính:**\n- Giấy tờ thuế/bảo hiểm mới nhất (最新の給与明細)\n- Biên bản tài khoản ngân hàng (3-6 tháng gần nhất)\n- Giấy xác nhận bảo lãnh tài chính mới (nếu có bảo lãnh)\n- Lý do giải trình: "A company mới tăng lương tôi từ tháng X, dự kiến sẽ ổn định dài hạn"\n\n**Nếu vấn đề công việc:**\n- Hợp đồng lao động sửa đổi (nếu có thay đổi)\n- Giấy xác nhận từ công ty giải thích rõ công việc thực tế\n- Bảng lương hoặc giấy xác nhận từ người quản lý\n\n**Nếu vấn đề tư cách:**\n- Đôi khi không thể sửa — cân nhắc đổi sang visa khác nếu điều kiện cho phép\n\nNộp tại ISA như lần trước (trực tiếp, trực tuyến nếu áp dụng).',
        documents: ['Tài liệu bổ sung giải quyết vấn đề chính', 'Thông báo từ chối lần trước (để tham khảo)', 'Hộ chiếu + thẻ cư trú'],
        tip: 'Kèm theo lá giải trình (理由書) viết rõ ràng: "Lần trước bị từ chối vì [lý do], giờ tôi đã sửa bằng [tài liệu bổ sung]. Mong ISA xem xét lại".',
      },
      {
        step: 5,
        title: 'Theo dõi tiến độ và chuẩn bị cho kết quả',
        description: 'Sau khi nộp, ISA sẽ xét duyệt. Thời gian từ vài tuần đến vài tháng tùy hồ sơ.\n\n**Nếu approved:** ISA sẽ thông báo và cấp thẻ cư trú hoặc COE mới.\n\n**Nếu bị từ chối lần thứ 2:** Đừng nản chí. Tìm tư vấn từ 行政書士 hoặc luật sư để:\n- Xem xét đổi sang visa khác có thể phù hợp hơn\n- Hoặc đợi tình hình cải thiện (ví dụ: tăng lương, công ty ổn định hơn) rồi nộp lại lần thứ 3\n- Hoặc nếu vấn đề là cơ bản (ví dụ: không đủ tư cách), cân nhắc quay về Việt Nam.',
        documents: [],
        tip: 'Hãy lạc quan — nhiều người được approved ở lần nộp lại sau khi sửa được vấn đề chính.',
      },
    ],
  };

export default visaRejectionAppealProcess;
