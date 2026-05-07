import type { AdminGuide } from '../../../../types/content';

const visaEmergencyMedicalDisasterExtension: AdminGuide = {
    id: 'visa-emergency-medical-disaster-extension',
    category: 'immigration',
    lastVerified: '2026-05-04',
    priority: 'normal',
    title: 'Visa hết hạn trong lúc nhập viện / thảm họa — cách xin giãn thời hạn',
    titleJp: '入院中や災害時の在留期間延長手続き',
    icon: 'medical',
    color: '#27AE60',
    description: 'Thủ tục mở rộng visa khi bạn nhập viện hoặc gặp thảm họa tự nhiên khiến không thể gia hạn đúng hạn. Có 2 loại extension tùy thời gian điều trị.',
    whoIsThisFor: [
      'Người nhập viện đột ngột, sắp phẫu thuật và visa sắp hết hạn.',
      'Người sống ở vùng thảm họa (động đất, lũ lụt) cần chuẩn bị khi visa hết hạn.',
      'Người muốn biết quyền lợi y tế tại Nhật khi trên visa ngắn hạn.',
    ],
    whenToDo: [
      'Nếu nhập viện: hỏi bộ phòng khám tại bệnh viện nếu họ có liên hệ ISA hoặc có thể hỗ trợ.',
      'Nếu thời gian điều trị < 90 ngày: có thể extend short-term stay tại ISA.',
      'Nếu thời gian điều trị > 90 ngày: phải đổi sang 特定活動 (medical designated activity).',
      'Không nên chờ sát hạn visa — hành động sớm khi phát hiện sẽ nhập viện lâu.',
    ],
    whereToDo: [
      'Bệnh viện (hospital) có bộ phòng khám quốc tế — họ có liên hệ ISA hoặc địa chỉ ISA gần nhất.',
      'ISA — cục công an nhập cảnh. Nộp trực tiếp hoặc qua bệnh viện nếu bệnh viện hỗ trợ.',
      'Gia đình bạn tại Nhật cũng có thể hỗ trợ nộp tài liệu nếu bạn nằm bệnh.',
    ],
    estimatedTime: '< 90 ngày: 1-2 tuần. > 90 ngày: 2-4 tuần để đổi sang 特定活動. Thời gian có thể kéo dài hơn nếu bệnh viện cần cập nhật hồ sơ.',
    commonMistakes: [
      'Không hỏi bệnh viện — chờ đợi quá lâu cho đến khi gần hết hạn visa.',
      'Không hiểu sự khác biệt giữa extension < 90 ngày vs đổi tư cách > 90 ngày.',
      'Quên khẩn cấp — nên làm càng sớm càng tốt.',
      'Không chuẩn bị giấy chứng minh từ bác sĩ — ISA cần xác nhận ngày nhập viện, ngày ra viện dự kiến, loại bệnh.',
    ],
    faq: [
      {
        question: 'Nếu tôi trên short-term stay visa (90 ngày) và nhập viện, sao?',
        answer: 'Short-term stay (短期滞在) không thể extend, phải đổi sang loại visa khác. Nếu điều trị < 90 ngày nữa, bạn có thể apply extension tạm thời (short-term extension). Nếu > 90 ngày, phải đổi sang 特定活動 (medical stay).',
      },
      {
        question: 'Bệnh viện có thể hỗ trợ làm đơn không?',
        answer: 'Có. Bệnh viện lớn ở Nhật (nhất là những nơi có 国際科 / phòng quốc tế) có nhân viên hỗ trợ visa. Họ có thể: (1) viết giấy xác nhận từ bác sĩ, (2) cho địa chỉ ISA gần nhất, (3) thậm chí hỗ trợ nộp hồ sơ nếu bạn nằm bệnh. Hãy hỏi ngay khi nhập viện.',
      },
      {
        question: 'Bác sĩ phải viết gì trong giấy chứng minh?',
        answer: 'ISA cần: (1) Ngày nhập viện, (2) Loại bệnh/chẩn đoán (nên viết tiếng Anh hoặc Nhật), (3) Ngày ra viện dự kiến (estimated discharge date), (4) Xác nhận rằng bạn cần nằm bệnh liên tục/trị liệu phục hồi. Giấy phải có dấu bệnh viện và chữ ký bác sĩ.',
      },
      {
        question: '在留特別許可 (special permission) là gì?',
        answer: '在留特別許可 là phép ở lại đặc biệt khi bạn cần điều trị > 90 ngày. Thay vì bị từ chối, ISA có thể cấp status \"特定活動\" (designated activities) cho y tế với khoảng thời gian gia hạn tuỳ bệnh (thường 6-12 tháng). Đây không phải \"appeal\" mà là một tùy chọn visa chính thức.',
      },
    ],
    officialLinks: [
      { label: 'ISA — Medical Stay Visa (医療滞在)', url: 'https://www.moj.go.jp/isa/applications/status/medicalservices.html' },
      { label: 'Ministry of Foreign Affairs — Medical Stay Visa', url: 'https://www.mofa.go.jp/mofaj/toko/visa/medical/index.html' },
      { label: 'ISA — Designated Activities for Medical Stay', url: 'https://www.moj.go.jp/isa/applications/status/designatedactivities06.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Nhập viện — hỏi bệnh viện ngay về visa',
        description: 'Khi nhập viện, hãy thông báo cho nhân viên lễ tân hoặc y tá:\n\n**\"Tôi trên visa Nhật Bản. Visa sẽ hết hạn [ngày]. Tôi cần hỗ trợ visa.\"** (\"私は日本のビザを持っています。ビザが [ngày] に満期になります。ビザのサポートが必要です。\")\n\nBệnh viện sẽ:\n- Nếu có 国際科 (phòng quốc tế): họ có full support\n- Nếu không: sẽ cho số điện thoại/địa chỉ ISA gần nhất hoặc hướng dẫn liên hệ ISA\n\nBệnh viện **không thể** \"giúp\" hành chính ISA, nhưng họ có thể viết giấy chứng minh y tế cần thiết.',
        documents: ['Hộ chiếu hoặc thẻ cư trú để bệnh viện ghi lại'],
        tip: 'Không chờ sát hạn visa — hỏi ngay khi vào viện. Bệnh viện sẽ biết quá trình và có thể hỗ trợ document.',
      },
      {
        step: 2,
        title: 'Xác định thời gian điều trị dự kiến',
        description: 'Hỏi bác sĩ/y tá:\n\n**\"Tôi sẽ nằm viện khoảng bao lâu? Ngày ra viện dự kiến khi nào?\"**\n\nBác sĩ sẽ cho ước tính:\n- **< 90 ngày nữa:** Extension short-term (可能性は低いが、可能な場合もある)\n- **> 90 ngày nữa:** Phải đổi sang 特定活動 (medical stay) — ISA sẽ cấp status mới\n\n**Lưu ý:** Ước tính có thể thay đổi — hỏi lại khi tình trạng sức khỏe thay đổi.',
        documents: ['Phác đồ điều trị hoặc ghi chú y tế'],
        tip: 'Báo cho gia đình hoặc bạn bè tại Nhật biết — họ có thể hỗ trợ nộp hồ sơ nếu bạn nằm bệnh nặng.',
      },
      {
        step: 3,
        title: 'Nộp đơn xin extension / đổi tư cách',
        description: '**Trường hợp 1: Điều trị < 90 ngày (Short-term extension)**\n\nBênh viện hoặc bạn nộp tại ISA:\n- Đơn xin extension (短期滞在期間延長許可申請)\n- Giấy chứng minh từ bác sĩ (diagnosis letter)\n- Hộ chiếu + thẻ cư trú\n- Chứng minh tài chính để sống ở Nhật trong thời gian điều trị\n\nThời gian phê duyệt: 1-2 tuần\n\n---\n\n**Trường hợp 2: Điều trị > 90 ngày (Đổi sang 特定活動 — Medical Designated Activity)**\n\nQuá trình phức tạp hơn:\n- Bệnh viện chuẩn bị giấy chứng minh y tế chi tiết\n- Bạn hoặc gia đình nộp 在留資格変更許可申請 (change of status) tại ISA\n- Yêu cầu: Certificate of Eligibility từ ISA kèm giấy y tế\n- ISA sẽ review và cấp thẻ cư trú mới với status 特定活動\n\nThời gian phê duyệt: 2-4 tuần (có thể lâu hơn nếu hồ sơ phức tạp)',
        documents: ['Đơn xin (in từ ISA)', 'Giấy chứng minh từ bác sĩ/bệnh viện', 'Hộ chiếu', 'Thẻ cư trú', 'Chứng minh tài chính'],
        tip: 'Nếu bạn nằm bệnh nặng, gia đình hoặc bạn bè ở Nhật có thể nộp giúp — không nhất thiết phải bạn đi trực tiếp ISA.',
      },
      {
        step: 4,
        title: 'Khi được phê duyệt — chuẩn bị ra viện',
        description: 'Nếu ISA phê duyệt extension/đổi tư cách:\n\n- Nhân viên bệnh viện hoặc ISA sẽ thông báo\n- Bạn sẽ nhận thẻ cư trú mới (nếu đổi tư cách) hoặc giấy xác nhận extension\n- Ngày hết hạn mới sẽ được cập nhật\n\n**Chuẩn bị ra viện:**\n- Bác sĩ sẽ cho toa thuốc, hướng dẫn phục hồi tại nhà\n- Bệnh viện sẽ cho lịch tái khám, tiêm chủng (nếu cần)\n- Thanh toán y tế: kiểm tra xem bảo hiểm y tế của bạn đã cover chưa\n- Thủ tục perks từ chính quyền địa phương (医療費助成 / medical subsidy) nếu có',
        documents: ['Thẻ cư trú mới', 'Giấy ra viện từ bệnh viện', 'Toa thuốc, hướng dẫn phục hồi'],
        tip: 'Lưu lại giấy ra viện và hóa đơn y tế — có thể cần khi nộp thuế hoặc claim bảo hiểm.',
      },
      {
        step: 5,
        title: 'Thảm họa (động đất, lũ lụt) — quyền lợi visa khẩn cấp',
        description: 'Khi thảm họa xảy ra ở Nhật, ISA sẽ tự động cấp **特定活動** (designated activities) cho người nước ngoài bị ảnh hưởng.\n\n**Bạn sẽ được:**\n- Ở lại Nhật mà không phải gia hạn ngay (tự động miễn 30-60 ngày)\n- Cấp status tạm thời 特定活動 nếu cần ở lâu hơn\n- Hỗ trợ từ các trung tâm khẩn cấp (避難所)\n- Bảo hiểm y tế vẫn có hiệu lực cho điều trị thương tích/khẩn cấp\n\n**Không cần làm gì đặc biệt** — ISA sẽ thông báo qua media, hotline, hoặc cục ISA gần nhất.',
        documents: [],
        tip: 'Trong thảm họa, ưu tiên an toàn + sức khỏe trước — visa sẽ được giải quyết sau. Hãy theo hướng dẫn từ chính quyền địa phương và cảnh sát.',
      },
    ],
  };

export default visaEmergencyMedicalDisasterExtension;
