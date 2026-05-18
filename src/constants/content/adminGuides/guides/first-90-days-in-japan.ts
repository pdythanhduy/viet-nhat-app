import type { AdminGuide } from '../../../../types/content';

const first90DaysInJapan: AdminGuide = {
    id: 'first-90-days-in-japan',
    category: 'daily-law',
    lastVerified: '2026-05-16',
    priority: 'high',
    title: '90 ngày đầu ở Nhật',
    titleJp: '来日後90日間の生活立ち上げチェック',
    icon: 'map',
    color: '#6C5CE7',
    description: 'Guide tổng hợp cho 3 tháng đầu ở Nhật: từ giai đoạn sinh tồn, vào nếp, đến lúc tự rà rủi ro về giấy tờ, tiền bạc, công việc, học tập và sức khỏe.',
    searchKeywords: [
      '3 thang dau o nhat',
      'first 90 days',
      'newcomer survival',
      'on dinh cuoc song',
      'checklist 3 thang',
      'sang nhat duoc 3 thang',
    ],
    heroImage: require('../../../../../assets/content/daily-life/ag_90days_hero.jpg'),
    heroImageCaption: 'Những việc cần làm trong 90 ngày đầu ở Nhật',
    whoIsThisFor: [
      'Người mới sang Nhật trong 1-3 tháng đầu và muốn có một khung tổng để không bỏ sót việc quan trọng.',
      'Người đã qua 7 ngày và 30 ngày đầu nhưng vẫn chưa chắc mọi thứ đã vận hành ổn.',
      'Người đi làm, đi học hoặc sống cùng gia đình cần một checklist thực tế theo mốc thời gian.',
    ],
    whenToDo: [
      'Dùng từ ngày đầu đến khoảng hết tháng thứ ba sau khi sang Nhật.',
      'Đặc biệt hữu ích khi bạn bắt đầu nhận lương, hóa đơn định kỳ, thư từ từ cơ quan và lịch thủ tục tiếp theo.',
      'Nếu bạn vừa đổi việc, đổi trường hoặc chuyển nhà trong nội địa Nhật, vẫn có thể dùng để rà lại nền vận hành.',
    ],
    whereToDo: [
      'Tại nhà, nơi làm việc, trường học, municipal office, ngân hàng, bệnh viện và các dịch vụ bạn đang dùng.',
      'Trong app như một khung kiểm tra định kỳ để xem còn điểm nào chưa rõ hoặc đang lệch nhịp.',
    ],
    estimatedTime: 'Không phải làm dồn trong một ngày. Guide này nên được dùng theo từng mốc 7 ngày, 30 ngày, 60 ngày và 90 ngày đầu để tự rà lại hệ thống sống của bạn.',
    fees: [
      '3 tháng đầu thường là giai đoạn phát sinh nhiều chi phí ẩn nhất: đồ dùng, giao thông, hủy dịch vụ, hóa đơn trễ hạn, đi khám, giấy tờ bổ sung.',
      'Nếu không theo dõi từ sớm, bạn dễ nhầm giữa khoản bắt buộc, khoản tự chọn và khoản bị trừ do không đọc kỹ hợp đồng.',
      'Nên giữ một file hoặc note riêng ghi ngày trả lương, ngày trừ tiền nhà, phí sim, internet, điện, gas, nước và các deadline giấy tờ.',
    ],
    documentsChecklist: [
      { label: 'Hộ chiếu và thẻ cư trú', required: true },
      { label: 'Giấy tờ địa chỉ, bảo hiểm, My Number', required: true },
      { label: 'Hợp đồng lao động hoặc giấy tờ trường học', required: true },
      { label: 'Phiếu lương, hóa đơn định kỳ, sao kê ngân hàng', required: false },
      { label: 'Thông tin nhà ở, nhà mạng, internet, điện nước gas', required: false },
      { label: 'Bản scan giấy tờ và nơi lưu khẩn cấp', required: false, note: 'Nên lưu cả trên điện thoại và cloud.' },
    ],
    commonMistakes: [
      'Qua được tháng đầu rồi nên chủ quan, không rà lại tiền bạc, thư từ và giấy tờ đang chạy ngầm.',
      'Chỉ chú ý công việc hoặc trường học mà bỏ qua sức khỏe, giấc ngủ, ăn uống và dấu hiệu kiệt sức.',
      'Không đọc phiếu lương đầu tiên, hóa đơn đầu tiên hoặc thư từ đầu tiên từ cơ quan/nhà cung cấp dịch vụ.',
      'Không biết khi nào phải hỏi lại công ty, trường, municipal office hay nơi tư vấn chính thức.',
      'Không ghi lại mốc hạn, khiến cùng một lỗi lặp đi lặp lại trong 2-3 tháng đầu.',
    ],
    faq: [
      {
        question: 'Guide 90 ngày này có lặp với guide 7 ngày và 30 ngày không?',
        answer: 'Không. Guide 7 ngày tập trung vào sinh tồn và nền pháp lý tối thiểu. Guide 30 ngày tập trung vào việc đi làm/đi học ổn định. Guide 90 ngày là bước tổng rà để xem hệ thống sống của bạn đã thật sự vận hành an toàn chưa.',
      },
      {
        question: 'Khi nào biết mình đã “ổn định” ở Nhật?',
        answer: 'Khi bạn nắm được đường đi, chi phí cố định, giấy tờ đang dùng, ngày trả lương hoặc lịch học, nơi đi khám, cách nhận thư/nhận hàng và biết phải hỏi ai khi có vấn đề.',
      },
      {
        question: 'Nếu vẫn thấy rất mệt sau 2-3 tháng đầu thì sao?',
        answer: 'Đó là dấu hiệu cần rà lại nhịp sống và tải công việc/học tập. Đừng coi việc thiếu ngủ, ăn uống lệch hoặc stress kéo dài là “bình thường ai mới sang cũng thế”.',
      },
    ],
    officialLinks: [
      { label: '出入国在留管理庁', url: 'https://www.moj.go.jp/isa/' },
      { label: '国民健康保険 — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/kokuminkenkou/index.html' },
      { label: 'Check-Roudou', url: 'https://www.check-roudou.mhlw.go.jp/' },
      { label: 'マイナンバーカード総合サイト', url: 'https://www.kojinbango-card.go.jp/' },
    ],
    steps: [
      {
        step: 1,
        title: '0-7 ngày: đừng để mất nền',
        description: 'Mục tiêu là khóa giấy tờ, địa chỉ, bảo hiểm, liên lạc và sinh hoạt tối thiểu. Đây là giai đoạn phải tránh lỗi nền vì sửa về sau rất mất công.',
        documents: ['Hộ chiếu', 'Thẻ cư trú', 'Địa chỉ nơi ở', 'Giấy tờ công ty/trường'],
        tip: 'Nếu bạn chưa làm xong phần nền, hãy quay lại guide 7 ngày đầu thay vì nhảy cóc sang tối ưu hóa.',
      },
      {
        step: 2,
        title: '8-30 ngày: đưa công việc và trường lớp vào nếp',
        description: 'Từ tuần thứ hai đến hết tháng đầu, trọng tâm là giờ giấc, đi lại, tiền bạc, hợp đồng và nhịp sống thực tế.',
        documents: ['Hợp đồng lao động hoặc giấy nhập học', 'Thông tin lương hoặc học phí', 'Thông tin tàu/xe buýt'],
        tip: 'Tháng đầu phải đọc phiếu lương, hóa đơn đầu tiên và bất kỳ thư nào có vẻ là từ cơ quan hoặc nhà cung cấp dịch vụ.',
      },
      {
        step: 3,
        title: 'Ngày 31-60: rà hệ thống sống đang chạy',
        description: 'Đây là lúc nhìn rõ nhất lỗi nhỏ nào đang ngốn tiền, ngốn thời gian hoặc làm bạn stress: internet, sim, chuyển thư, hóa đơn, đi khám, đi lại, rác, nhận hàng, giờ ngủ.',
        documents: ['Sao kê ngân hàng', 'Hóa đơn điện nước gas', 'Thông tin sim/internet', 'Phiếu lương hoặc lịch học'],
        tip: 'Nếu thấy tháng đầu tiêu quá nhanh mà không rõ vì sao, hãy tách chi phí cố định và chi phí do thói quen ngay ở giai đoạn này.',
      },
      {
        step: 4,
        title: 'Ngày 61-90: tự kiểm tra rủi ro pháp lý và vận hành',
        description: 'Sau khoảng 2-3 tháng, bạn phải biết tình trạng cư trú, công việc/học tập, bảo hiểm, ngân hàng, nghĩa vụ thông báo và các mốc sắp tới có gì cần xử lý.',
        documents: ['Thẻ cư trú', 'My Number hoặc giấy liên quan', 'Giấy tờ việc làm/học tập', 'Lịch nhắc hạn cá nhân'],
        tip: 'Nếu có thay đổi lớn như đổi việc, nghỉ việc, chuyển nhà hoặc nghỉ học, hãy kiểm tra lại nghĩa vụ thông báo thay vì tự đoán.',
      },
      {
        step: 5,
        title: 'Cuối 90 ngày: chốt 5 thứ phải nắm thật rõ',
        description: 'Bạn nên tự trả lời được 5 câu hỏi: tôi đang ở theo diện gì, tiền cố định hàng tháng là gì, khi đau ốm đi đâu, khi có thư lạ hỏi ai, và nếu có vấn đề lao động/hành chính thì liên hệ chỗ nào.',
        documents: ['Danh sách liên hệ khẩn', 'Nguồn chính thức hay dùng', 'Checklist giấy tờ cá nhân'],
        tip: 'Nếu chưa trả lời rõ 5 câu này, nghĩa là hệ thống sống của bạn chưa thật sự ổn dù bề ngoài có vẻ đã quen.',
      },
    ],
  };

export default first90DaysInJapan;
