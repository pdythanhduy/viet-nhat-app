import type { AdminGuide } from '../../../../types/content';

const schoolEnrollmentChildren: AdminGuide = {
    id: 'school-enrollment-children',
    category: 'daily-law',
    lastVerified: '2026-08-21',
    priority: 'normal',
    title: 'Đăng ký trường tiểu học / trung học cơ sở cho con',
    titleJp: '外国籍の子どもの就学手続き',
    icon: 'school',
    color: '#8E44AD',
    description: 'Hướng dẫn đăng ký học cho con (6–15 tuổi) tại trường công lập Nhật. Trẻ em nước ngoài có quyền học miễn phí tại trường công — không phân biệt tư cách lưu trú.',
    heroImage: require('../../../../../assets/content/daily-life/ag_school_hero.jpg'),
    heroImageCaption: '入学手続き - đăng ký trường công cho con tại municipal office và 教育委員会',
    whoIsThisFor: [
      'Phụ huynh có con trong độ tuổi 6–15 đang sống tại Nhật và muốn cho con học trường công lập.',
      'Gia đình mới sang Nhật hoặc vừa chuyển địa chỉ sang quận/huyện mới.',
      'Trẻ em nước ngoài không bắt buộc phải đi học theo luật Nhật, nhưng có quyền học miễn phí nếu phụ huynh muốn.',
    ],
    whenToDo: [
      'Ngay sau khi hoàn thành 転入届 (đăng ký cư trú) tại municipal office mới.',
      'Nếu sang Nhật vào giữa năm học (tháng 4–3), nên đến trường và municipal office trong vòng 1 tuần để sắp xếp.',
      'Năm học Nhật bắt đầu tháng 4 — nếu đến trước tháng 3, liên hệ ngay để kịp nhập học đầu năm.',
    ],
    whereToDo: [
      'Municipal office nơi cư trú: hỏi quầy 学務課, 教育委員会 hoặc bộ phận phụ trách trường học.',
      'Trường được phân theo 学区: đặt lịch gặp để trao đổi trình độ tiếng Nhật, lớp học và hỗ trợ cần thiết.',
      'Quầy tư vấn người nước ngoài địa phương: hỏi nếu cần phiên dịch hoặc tài liệu đa ngôn ngữ.',
    ],
    documentsChecklist: [
      { label: 'Passport của con', required: true },
      { label: 'Thẻ cư trú của con', required: false, note: 'Mang theo nếu đã được cấp.' },
      { label: 'Giấy tờ tùy thân của phụ huynh', required: true },
      { label: '就学通知書', required: false, note: 'Nhận sau khi municipal office/教育委員会 chỉ định trường.' },
      { label: 'Học bạ hoặc giấy tờ học tập từ Việt Nam', required: false, note: 'Giúp trường tham khảo khi xếp lớp và hỗ trợ tiếng Nhật.' },
    ],
    commonMistakes: [
      'Chỉ làm 転入届 xong rồi chờ trường tự liên hệ, không hỏi 教育委員会.',
      'Không nói rõ con chưa biết tiếng Nhật nên trường không chuẩn bị hỗ trợ phù hợp.',
      'Tự chọn trường theo ý muốn mà không kiểm tra 学区 được phân theo địa chỉ.',
      'Không hỏi chương trình 就学援助 dù gia đình có thể đủ điều kiện hỗ trợ chi phí.',
    ],
    faq: [
      {
        question: 'Con chưa biết tiếng Nhật có vào trường công được không?',
        answer: 'Có. Khi đăng ký, hãy nói rõ trình độ tiếng Nhật của con để trường và 教育委員会 xem xét hỗ trợ như 日本語学級, 取り出し授業 hoặc giáo viên phụ trách học sinh nước ngoài.',
      },
      {
        question: 'Phụ huynh có được tự chọn trường không?',
        answer: 'Thông thường trường công được phân theo địa chỉ cư trú, gọi là 学区. Một số địa phương có ngoại lệ hoặc chế độ chọn trường, nhưng cần hỏi 教育委員会 nơi cư trú.',
      },
      {
        question: 'Có phải mua toàn bộ sách giáo khoa không?',
        answer: 'Sách giáo khoa trường công thường được phát miễn phí. Phụ huynh vẫn cần chuẩn bị dụng cụ học tập, giày trong nhà, ba lô và các đồ theo danh sách trường cung cấp.',
      },
    ],
    officialLinks: [
      { label: '外国人の子等の就学に関する手続 — 文部科学省', url: 'https://www.mext.go.jp/a_menu/shotou/shugaku/detail/1422256.htm' },
      { label: '小・中学校等への就学について — 文部科学省', url: 'https://www.mext.go.jp/a_menu/shotou/shugaku/' },
    ],
    steps: [
      {
        step: 1,
        title: 'Hoàn thành 転入届 tại municipal office',
        description: 'Bước này là điều kiện tiên quyết. Khi làm 転入届, hãy thông báo với nhân viên rằng bạn có con trong độ tuổi đi học (学齢児童). Họ sẽ hướng dẫn sang bộ phận giáo dục (教育委員会 hoặc 学務課) ngay trong buổi đó hoặc chỉ nơi cần đến tiếp theo.',
        documents: [
          'Passport của con',
          'Thẻ cư trú (在留カード) của con (nếu có)',
          'Giấy tờ tùy thân của phụ huynh',
        ],
        tip: 'Nếu con chưa có 在留カード riêng (trẻ dưới 16 tuổi thường được ghi chung vào thẻ của cha/mẹ), mang passport của con là đủ.',
      },
      {
        step: 2,
        title: 'Đến 教育委員会 (Ủy ban giáo dục) để đăng ký',
        description: 'Đây là bộ phận thuộc municipal office quản lý trường học. Điền form 就学届 (đơn xin nhập học). Họ sẽ xác định trường tiểu học (小学校) hoặc trung học cơ sở (中学校) được phân công theo địa chỉ cư trú của bạn — gọi là 学区 (học khu). Bạn không tự chọn trường, trừ một số trường hợp đặc biệt.',
        documents: [
          'Giấy 転入届 đã được xác nhận (nếu nhận được từ bước 1)',
          'Passport của con',
          '在留カード của phụ huynh',
        ],
        tip: 'Hỏi nhân viên có trường nào trong khu vực có hỗ trợ tiếng Việt hoặc lớp học tiếng Nhật cho học sinh nước ngoài (日本語学級 / 取り出し授業) không — nhiều thành phố lớn có.',
      },
      {
        step: 3,
        title: 'Nhận 就学通知書 và liên hệ trường',
        description: '就学通知書 là thông báo chính thức chỉ định trường của con. Sau khi nhận, phụ huynh liên hệ trực tiếp với trường để đặt lịch gặp (説明・面談). Trường sẽ trao đổi về trình độ tiếng Nhật của con, xếp lớp, và các nhu cầu hỗ trợ đặc biệt nếu có.',
        documents: [
          '就学通知書',
          'Passport của con',
          'Hồ sơ học bạ từ Việt Nam (nếu có, để nhà trường tham khảo xếp lớp)',
        ],
        tip: 'Nếu con chưa biết tiếng Nhật, đừng lo — trường công có nghĩa vụ hỗ trợ. Hãy nói thẳng với hiệu trưởng hoặc giáo viên phụ trách học sinh nước ngoài (外国人児童担当) về tình trạng tiếng Nhật của con ngay từ đầu.',
      },
      {
        step: 4,
        title: 'Chuẩn bị dụng cụ học tập và đồng phục',
        description: 'Trường công tiểu học thường không có đồng phục bắt buộc (trừ một số trường). Sách giáo khoa được phát miễn phí. Phụ huynh cần chuẩn bị: ba lô (ランドセル hoặc ba lô thường), dụng cụ học tập theo danh sách trường cung cấp, và giày thể thao trong nhà (上履き). Chi phí ban đầu khoảng 5,000–20,000 yên tùy trường.',
        documents: [
          'Danh sách dụng cụ từ trường (trường sẽ cung cấp khi gặp mặt)',
        ],
        tip: 'Hỏi trường về chương trình hỗ trợ chi phí (就学援助) — gia đình thu nhập thấp có thể được hỗ trợ tiền sách vở, ăn trưa và các khoản khác. Điều kiện thường dựa trên thu nhập hộ gia đình.',
      },
    ],
  };

export default schoolEnrollmentChildren;
