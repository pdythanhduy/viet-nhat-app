import type { AdminGuide } from '../../../../types/content';

const first30DaysWorkStudyJapan: AdminGuide = {
    id: 'first-30-days-work-study-japan',
    category: 'daily-law',
    lastVerified: '2026-04-12',
    priority: 'high',
    title: '30 ngày đầu đi làm / đi học ở Nhật',
    titleJp: '来日後30日間の仕事・学校チェック',
    icon: 'calendar',
    color: '#2E86C1',
    description: 'Checklist chi tiết cho tháng đầu ở Nhật: nhịp công việc hoặc trường lớp, giấy tờ, tiền bạc, đi lại, sức khỏe và những lỗi dễ phát sinh nếu chủ quan.',
    heroImage: require('../../../../../assets/content/daily-life/dl_utilities_s1.jpg'),
    heroImageCaption: 'Tháng đầu ở Nhật — đăng ký điện nước gas, SIM và sắp xếp cuộc sống cơ bản',
    whoIsThisFor: [
      'Người mới sang Nhật để đi làm, thực tập, kỹ năng đặc định, du học hoặc học tiếng.',
      'Người đã qua tuần đầu nhưng vẫn thấy mọi thứ chưa vào nếp và sợ bỏ sót việc quan trọng.',
      'Người cần một checklist thực chiến thay vì đọc từng mảng rời rạc.',
    ],
    whenToDo: [
      'Dùng trong khoảng 30 ngày đầu sau khi sang Nhật hoặc sau khi bắt đầu nơi làm việc/trường học mới.',
      'Phù hợp nhất sau khi bạn đã xử lý xong các việc cực gấp của 7 ngày đầu.',
      'Nếu đang đổi việc hoặc đổi trường trong nội địa Nhật, vẫn có thể dùng khung này để rà lại các việc nền.',
    ],
    whereToDo: [
      'Tại công ty, trường học, municipal office, ngân hàng, nhà mạng và nhà ở của bạn.',
      'Trong app để theo dõi thứ tự ưu tiên và tự kiểm tra việc nào đã xong, việc nào còn thiếu.',
    ],
    estimatedTime: 'Phần lớn việc nền nên được đưa vào nếp trong 2 đến 4 tuần đầu. Một số giấy tờ như My Number card, internet cố định hoặc thủ tục công ty có thể kéo dài hơn.',
    fees: [
      'Tháng đầu thường phát sinh mạnh ở chi phí đi lại, mua đồ thiết yếu, nạp tiền tàu, tiền sim, tiền nhà và giấy tờ phụ trợ.',
      'Không nên cộng dồn mọi chi tiêu nhỏ vào cuối tháng mới nhìn; nên kiểm tra từ tuần thứ hai để tránh hụt tiền.',
      'Nếu công ty hoặc trường có hoàn lại một số khoản như đi lại, khám sức khỏe, đồng phục hoặc tài liệu, hãy hỏi rõ thời điểm và cách hoàn.',
    ],
    documentsChecklist: [
      { label: 'Hộ chiếu và thẻ cư trú', required: true },
      { label: 'Hợp đồng lao động hoặc giấy nhập học', required: true },
      { label: 'Phiếu lương đầu tiên hoặc thông tin ngày trả lương', required: false },
      { label: 'Lịch học, lịch làm, địa chỉ công ty/trường', required: true },
      { label: 'Giấy tờ ngân hàng, sim, bảo hiểm, địa chỉ', required: false },
      { label: 'Bản scan mọi giấy quan trọng', required: false, note: 'Rất hữu ích khi bạn bị hỏi lại giấy tờ trong tháng đầu.' },
    ],
    commonMistakes: [
      'Đi làm hoặc đi học đều rồi nên tưởng không còn việc nền nào cần xử lý nữa.',
      'Không hỏi rõ ngày trả lương, cách tính lương, hoàn đi lại hoặc lịch nộp tiền trường.',
      'Không kiểm tra đường đi, thời gian tàu và phương án trễ tàu trước ngày đi chính thức.',
      'Để sim, internet, hóa đơn, ngân hàng và thư từ chạy tự nhiên mà không biết cái gì đã kích hoạt, cái gì chưa.',
      'Gặp khó khăn nhưng chờ quá lâu mới hỏi công ty, trường hoặc cơ quan hỗ trợ.',
    ],
    faq: [
      {
        question: 'Sau tuần đầu rồi mà vẫn thấy rối thì có bình thường không?',
        answer: 'Có. Tuần đầu thường mới xử lý phần cực gấp. Tháng đầu mới là lúc bạn dựng nhịp sống bền hơn: công việc, trường lớp, đi lại, chi tiêu và giấy tờ vận hành.',
      },
      {
        question: 'Đi làm rồi có cần kiểm tra lại hợp đồng không?',
        answer: 'Có. Tháng đầu là lúc bạn bắt đầu thấy công việc thực tế, lịch làm, giờ nghỉ và cách tính lương có khớp điều đã nói hay không.',
      },
      {
        question: 'Du học sinh có nên dùng checklist này không?',
        answer: 'Có. Chỉ khác ở trọng tâm: lịch học, chuyên cần, học phí, bảo hiểm, việc làm thêm hợp pháp và nhịp sống hằng ngày.',
      },
    ],
    officialLinks: [
      { label: '住居地の届出 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html' },
      { label: '国民健康保険 — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/kokuminkenkou/index.html' },
      { label: 'Check-Roudou', url: 'https://www.check-roudou.mhlw.go.jp/' },
    ],
    steps: [
      {
        step: 1,
        title: 'Tuần 1-2: chốt nhịp đi lại và giờ giấc',
        description: 'Khi bắt đầu đi làm hoặc đi học thật, ưu tiên lớn nhất là đừng để trễ giờ, lạc đường hoặc sống quá đuối ngay từ đầu.',
        documents: [
          'Địa chỉ công ty/trường',
          'Giờ bắt đầu ca hoặc giờ vào học',
          'Lộ trình tàu/xe buýt',
        ],
        tip: 'Nên đi thử tuyến chính ít nhất một lần trước ngày quan trọng nếu bạn chưa quen ga lớn hoặc phải đổi tuyến.',
      },
      {
        step: 2,
        title: 'Tuần 1-2: kiểm tra cách trả lương, học phí và chi phí định kỳ',
        description: 'Đây là bước nhiều người bỏ qua nhất. Bạn phải sớm biết tiền vào khi nào, tiền ra lúc nào và khoản nào đang chờ trừ.\n\nNếu chưa có tài khoản ngân hàng: kiểm tra ngân hàng bạn định dùng yêu cầu giấy tờ gì, có nhận hồ sơ người mới nhập cảnh không, và họ cần chữ ký hay 印鑑. Không có một quy tắc chung áp dụng cho mọi ngân hàng.',
        documents: [
          'Thông tin ngày trả lương hoặc lịch nộp học phí',
          'Thông tin tài khoản ngân hàng',
          'Hợp đồng sim/internet/nhà ở',
          'Con dấu cá nhân (印鑑) hoặc chữ ký mẫu nếu ngân hàng yêu cầu',
        ],
        tip: 'Không nên đợi đến cuối tháng mới nhìn tài chính. Khi đó nếu lệch nhịp, bạn rất khó cứu kịp.',
      },
      {
        step: 3,
        title: 'Tuần 2-3: rà lại phần giấy tờ đang vận hành',
        description: 'Sau khi cuộc sống chạy thật, hãy rà lại những thứ tưởng đã xong: địa chỉ, bảo hiểm, thư từ, ngân hàng, sim, internet, lịch rác, nhận hàng.',
        documents: [
          'Thẻ cư trú',
          'Thẻ bảo hiểm hoặc My Number liên kết bảo hiểm',
          'Thông tin chuyển tiếp thư',
        ],
        tip: 'Tháng đầu là lúc lỗi nhỏ lộ ra rõ nhất. Cứ rà sớm thì sửa rất nhẹ.',
      },
      {
        step: 4,
        title: 'Tuần 2-4: xác nhận công việc hoặc trường học có khớp thực tế không',
        description: 'Bạn nên đối chiếu điều đã được nói lúc đầu với thực tế đang diễn ra: giờ làm, việc thực tế, OT, nội quy, hỗ trợ đi lại, lịch học, chuyên cần hoặc bài tập.',
        documents: [
          'Hợp đồng hoặc tài liệu trường',
          'Lịch làm/lịch học',
          'Tin nhắn hoặc giấy hướng dẫn nội bộ',
        ],
        tip: 'Nếu có điểm bất thường, nên hỏi sớm bằng câu ngắn và cụ thể, đừng chờ đến khi bức xúc rồi mới nói.',
      },
      {
        step: 5,
        title: 'Cuối tháng đầu: tự kiểm tra sức khỏe, năng lượng và điểm nghẽn',
        description: 'Nhiều người tháng đầu cố quá mức vì muốn thích nghi nhanh. Nhưng nếu nhịp sống đang quá sức, bạn phải biết chỗ nào cần chỉnh.',
        documents: [
          'Lịch làm/lịch học thực tế',
          'Chi tiêu tháng đầu',
          'Danh sách việc còn vướng',
        ],
        tip: 'Tháng đầu không cần sống hoàn hảo. Mục tiêu là ổn định, hiểu hệ thống xung quanh mình và tránh tạo lỗi khó sửa về sau.',
      },
    ],
  };

export default first30DaysWorkStudyJapan;
