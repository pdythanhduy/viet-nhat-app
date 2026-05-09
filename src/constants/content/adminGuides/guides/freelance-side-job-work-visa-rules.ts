import type { AdminGuide } from '../../../../types/content';

const freelanceSideJobWorkVisaRules: AdminGuide = {
    id: 'freelance-side-job-work-visa-rules',
    category: 'immigration',
    lastVerified: '2026-05-04',
    priority: 'normal',
    title: 'Freelance, side job, YouTube monetize — được không trên work visa?',
    titleJp: 'フリーランス・副業・YouTubeの就労ビザでの可否',
    icon: 'briefcase',
    color: '#F39C12',
    description: 'Chi tiết quy tắc khi bạn muốn làm freelance, side job, content creator trên work visa. Không phải tất cả đều cần phép — nhưng một số nhất định phải xin 資格外活動許可.',
    whoIsThisFor: [
      'Freelancer/contractor muốn làm việc trên work visa ở Nhật.',
      'Content creator muốn monetize YouTube/Etsy/stream khi trên work visa.',
      'Lao động muốn làm thêm part-time hoặc side hustle ngoài công việc chính.',
      'Người tự hỏi: Tôi có cần 資格外活動許可 không?',
    ],
    whenToDo: [
      'Trước khi bắt đầu freelance/side job — hãy xin 資格外活動許可 (permission for activities outside status) nếu cần.',
      'Nếu không chắc — hỏi ISA hoặc công ty của bạn trước. Hỏi trước luôn an toàn hơn.',
      'Nếu đang làm rồi nhưng chưa xin phép — xin ngay, không bao giờ quá muộn.',
    ],
    whereToDo: [
      'ISA — cục công an nhập cảnh. Nộp đơn xin 資格外活動許可申請.',
      'Trực tiếp hoặc trực tuyến (nếu áp dụng).',
      'Thời gian: ~1-2 tuần để phê duyệt.',
    ],
    estimatedTime: '1-2 tuần để ISA phê duyệt 資格外活動許可. Phí: 0 (miễn phí).',
    commonMistakes: [
      'Làm freelance/side job mà không xin phép — ISA phát hiện có thể từ chối gia hạn visa hoặc có hình phạt.',
      'Không phân biệt được "kinh doanh" (business) và "việc làm thêm part-time" — quy tắc xin phép khác nhau.',
      'Làm YouTube/Etsy mà lấy tiền quảng cáo/bán hàng mà không xin phép — đây là \"business\" nên cần 資格外活動許可.',
      'Công ty không biết bạn làm side job — có thể vi phạm hợp đồng hoặc chính sách công ty.',
      'Không báo cáo side income với thuế/bảo hiểm — bị phát hiện sẽ có vấn đề pháp lý.',
    ],
    faq: [
      {
        question: '資格外活動許可 là gì?',
        answer: 'Là phép ISA cấp khi bạn muốn làm hoạt động kinh doanh (business/freelance) ngoài phạm vi tư cách visa hiện tại. Nếu không xin phép mà làm = vi phạm pháp luật.',
      },
      {
        question: 'Khi nào cần 資格外活動許可?',
        answer: 'Cần khi: (1) Freelance/contractor nhận từ khách hàng khác (multiple clients), (2) Content creator monetize (YouTube ads, Etsy sales, streaming), (3) Bán hàng online (Amazon, Yahoo Auctions), (4) Kinh doanh cá nhân (個人事業主). Không cần khi: (1) Part-time job với 1 công ty/cửa hàng (có hợp đồng), (2) Gift/hobby không lấy tiền, (3) Hoạt động trong phạm vi tư cách hiện tại.',
      },
      {
        question: 'Tôi xin part-time job phụ — cần 資格外活動許可 không?',
        answer: 'Nếu part-time job ở cửa hàng/công ty nào đó (có hợp đồng) = không cần 資格外活動許可, chỉ cần báo công ty chính biết (xem hợp đồng). Tuy nhiên, nên báo ISA khi gia hạn visa để họ biết tình huống.',
      },
      {
        question: 'YouTube monetize cần 資格外活動許可 không?',
        answer: 'Có. YouTube monetize = bạn lấy doanh thu quảng cáo (business income) từ Google AdSense. Đây là kinh doanh nên cần 資格外活動許可. Nếu chỉ upload video không kiếm tiền = không cần.',
      },
      {
        question: 'Tôi đang làm freelance rồi, giờ phát hiện cần phép — mình bị sao?',
        answer: 'Xin phép ngay. ISA thường cấp 資格外活動許可 tính từ ngày bạn xin (không phạt ngược về quá khứ nếu bạn chủ động báo). Tuy nhiên đừng trì hoãn — vi phạm càng lâu càng bị xem là cố tình.',
      },
      {
        question: 'Nếu bị phát hiện không xin phép mà làm freelance thì sao?',
        answer: 'ISA có thể: (1) Từ chối gia hạn visa, (2) Yêu cầu ngừng hoạt động, (3) Phạt tiền hoặc ở mức nặng là buộc rời Nhật. Vì vậy nên xin phép sớm.',
      },
    ],
    officialLinks: [
      { label: 'ISA — 資格外活動許可 (Permission for Activities Outside Status)', url: 'https://www.moj.go.jp/isa/applications/procedures/16-8.html' },
      { label: 'ISA — Freelance & Work Visa', url: 'https://www.moj.go.jp/isa/' },
    ],
    steps: [
      {
        step: 1,
        title: 'Xác định loại hoạt động của bạn',
        description: '**Hoạt động nào cần 資格外活動許可?**\n\n| Loại hoạt động | Cần phép? | Ghi chú |\n|---|---|---|\n| Freelance (nhận từ khách khác) | ✅ CÓ | Client > 1, kiếm tiền = business |\n| Part-time job (1 công ty/shop) | ❌ KHÔNG | Nhưng nên báo công ty & ISA |\n| YouTube monetize (ads, Patreon) | ✅ CÓ | Lấy doanh thu = business |\n| Etsy/Amazon/Yahoo Auctions bán hàng | ✅ CÓ | Bán = business |\n| Content creator (tiền người tài trợ) | ✅ CÓ | Kiếm tiền từ content |\n| Đầu tư chứng khoán/crypto | ❌ KHÔNG | Nhưng vẫn phải khai thuế |\n| Hoạt động không kiếm tiền | ❌ KHÔNG | Blog, podcast miễn phí không được tiền |\n| Công việc trong phạm vi tư cách visa | ❌ KHÔNG | Ví dụ: engineer làm thêm project cho công ty = trong phạm vi|\n\nNếu không chắc = xin phép để an toàn.',
        documents: ['Mô tả hoạt động của bạn'],
        tip: 'Khi nghi ngờ, hỏi ISA — họ sẽ giải thích rõ ràng hoạt động của bạn cần phép hay không.',
      },
      {
        step: 2,
        title: 'Xin 資格外活動許可 tại ISA',
        description: '**Chuẩn bị:**\n- Đơn xin 資格外活動許可申請書 (in từ ISA website)\n- Hộ chiếu + thẻ cư trú\n- Giấy tờ mô tả hoạt động (proposal, portfolio, client list, hoặc mô tả chi tiết)\n- Lý do giải trình (tại sao bạn muốn làm thêm, ảnh hưởng đến visa hiện tại không)\n\n**Nộp tại ISA:**\n- Trực tiếp tại cục công an nhập cảnh nơi cư trú\n- Hoặc trực tuyến (nếu áp dụng)\n\n**Phí:** 0 (miễn phí)\n\n**Thời gian phê duyệt:** 1-2 tuần\n\n**Nếu được phê duyệt:**\n- Bạn sẽ nhận giấy chứng nhận 資格外活動許可 hoặc dấu trên thẻ cư trú\n- Giấy phép sẽ ghi: loại hoạt động, thời hạn (thường 1 năm), hạn chế (nếu có)\n- Bạn có thể bắt đầu hoạt động ngay từ ngày được phê duyệt',
        documents: ['Đơn xin (in từ ISA)', 'Hộ chiếu', 'Thẻ cư trú', 'Giấy tờ mô tả hoạt động'],
        tip: 'Giấy phép chỉ có hiệu lực 1 năm — khi gia hạn visa lần sau, hãy xin gia hạn 資格外活動許可 nữa.',
      },
      {
        step: 3,
        title: 'Báo cáo với công ty & bảo hiểm / thuế',
        description: '**Báo với công ty chính (nếu có):**\n- Kiểm tra hợp đồng xem có cấm side job không\n- Nếu cấm: cân nhắc từ bỏ side job hoặc tìm công ty khác\n- Nếu cho phép: báo rõ ràng scope hoạt động side job để không xung đột lợi ích\n\n**Báo cáo thuế & bảo hiểm:**\n- Nếu side income > một số tiền nào đó (thường ¥200,000/năm), phải báo cáo với 税務署 (tax office)\n- Nếu bạn là 個人事業主 (kinh doanh cá nhân), cần nộp 開業届 (đăng ký mở kinh doanh) tại 税務署\n- Bảo hiểm y tế: side income không ảnh hưởng (vẫn thông qua bảo hiểm công ty)\n- Bảo hiểm lao động (労災): nếu làm freelance, bạn tự bảo vệ (công ty không cover)',
        documents: ['Hợp đồng lao động với công ty chính', 'Giấy chứng nhận 資格外活動許可 từ ISA'],
        tip: 'Không nên che giấu side income từ thuế — phát hiện sẽ bị phạt + tiền lãi. Nên tìm tư vấn từ 税理士 (tax accountant) nếu side income lớn.',
      },
      {
        step: 4,
        title: 'Duy trì & gia hạn phép khi cần',
        description: '**Lưu ý khi làm freelance/side job:**\n\n- Giữ bản sao hợp đồng, hóa đơn, email từ client — để chứng minh hoạt động nếu ISA hỏi\n- Báo cáo thuế hàng năm (確定申告) vào tháng 2-3 năm sau\n- Khi gia hạn visa: ISA có thể hỏi về side job — hãy chuẩn bị tài liệu chứng minh\n- Nếu 資格外活動許可 sắp hết (thường 1 năm), xin gia hạn trước khi hết\n\n**Nếu muốn dừng:**\n- Báo ISA (không cần form chính thức, chỉ cần mô tả)\n- Công ty cần biết để cập nhật hợp đồng\n- Không ảnh hưởng đến visa hiện tại',
        documents: ['Hợp đồng, hóa đơn, email từ client', 'Giấy gia hạn 資格外活動許可 (nếu cần)'],
        tip: 'Luôn giữ tài liệu — ISA có thể kiểm tra khi gia hạn visa để chắc bạn thực sự làm hoạt động đó (không phải giả mạo).',
      },
    ],
  };

export default freelanceSideJobWorkVisaRules;
