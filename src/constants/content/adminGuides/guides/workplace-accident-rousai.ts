import type { AdminGuide } from '../../../../types/content';

const workplaceAccidentRousai: AdminGuide = {
    id: 'workplace-accident-rousai',
    category: 'health',
    lastVerified: '2026-05-23',
    priority: 'high',
    title: 'Tai nạn lao động (労災) — quyền lợi và thủ tục',
    titleJp: '労働災害・労災保険の申請手続き',
    icon: 'medkit-outline',
    color: '#C0392B',
    description: 'Khi bị thương hoặc mắc bệnh do công việc, người lao động nước ngoài có quyền hưởng 労災保険 (bảo hiểm tai nạn lao động) — hoàn toàn độc lập với bảo hiểm y tế thông thường. Công ty không thể từ chối hay che giấu.',
    heroImage: require('../../../../../assets/content/daily-life/ag_rousai_hero.jpg'),
    heroImageCaption: '労災保険 — bảo hiểm tai nạn lao động, áp dụng cho tất cả người nước ngoài',
    whoIsThisFor: [
      'Người bị thương tại nơi làm việc hoặc trên đường đi làm/về (通勤災害).',
      'Người mắc bệnh nghề nghiệp do công việc gây ra (職業病): đau lưng mạn tính, điếc tai, ngộ độc hóa chất v.v.',
      'Người lao động nước ngoài đang làm việc hợp pháp tại Nhật — tất cả đều được bảo vệ bởi 労災保険 bất kể tư cách lưu trú.',
    ],
    whenToDo: [
      'Ngay khi xảy ra tai nạn: đi khám và thông báo cho công ty ngay lập tức — đừng chờ xem tình trạng thế nào.',
      'Nộp đơn 労災 càng sớm càng tốt — không có thời hạn cứng cho đơn điều trị (療養補償給付), nhưng trợ cấp nghỉ việc (休業補償給付) có giới hạn tính từ ngày nghỉ.',
      'Ngay cả khi tai nạn xảy ra đã lâu mà chưa làm thủ tục, vẫn có thể nộp — hỏi ハローワーク hoặc 労働基準監督署 để biết tình trạng cụ thể.',
    ],
    whereToDo: [
      'Bệnh viện/phòng khám có xử lý 労災: khai rõ đây là tai nạn lao động trước khi khám.',
      'Công ty hoặc bộ phận HR: báo tai nạn và yêu cầu hỗ trợ mẫu đơn 労災.',
      '労働基準監督署 phụ trách nơi làm việc: tự nộp hoặc hỏi tư vấn nếu công ty từ chối, trì hoãn hoặc che giấu tai nạn.',
      'FRESC hoặc quầy tư vấn lao động cho người nước ngoài: dùng khi cần hỗ trợ ngôn ngữ.',
    ],
    documentsChecklist: [
      { label: 'Thông tin tai nạn: ngày, giờ, địa điểm và công việc đang làm', required: true },
      { label: 'Tên, địa chỉ công ty và thông tin người phụ trách', required: true },
      { label: 'Giấy chẩn đoán hoặc giấy tờ bệnh viện', required: true },
      { label: 'Mẫu đơn 労災 phù hợp', required: true, note: 'Ví dụ: mẫu cho điều trị, trợ cấp nghỉ việc hoặc tai nạn trên đường đi làm.' },
      { label: 'Bằng chứng hiện trường, tin nhắn, email hoặc nhân chứng', required: false, note: 'Rất quan trọng nếu công ty phủ nhận đây là tai nạn lao động.' },
    ],
    commonMistakes: [
      'Dùng 健康保険 thông thường cho tai nạn lao động mà không nói với bệnh viện là 労災.',
      'Không báo công ty ngay trong ngày xảy ra tai nạn, khiến việc xác minh khó hơn.',
      'Nghĩ công ty có quyền từ chối 労災 — người lao động có thể tự nộp tại 労働基準監督署.',
      'Không lưu bằng chứng hiện trường, lịch làm việc, chấm công hoặc lời khai nhân chứng.',
      'Tiếp tục đi làm khi bác sĩ yêu cầu nghỉ, làm yếu hồ sơ 休業補償給付.',
    ],
    faq: [
      {
        question: 'Công ty không ký giấy 労災 thì tôi có nộp được không?',
        answer: 'Có. Nếu công ty từ chối hoặc trì hoãn, bạn có thể tự nộp trực tiếp tại 労働基準監督署 và giải thích tình hình. Chữ ký công ty giúp hồ sơ thuận lợi hơn nhưng không phải điều kiện tuyệt đối để hỏi tư vấn hoặc nộp.',
      },
      {
        question: 'Tai nạn trên đường đi làm có được tính là 労災 không?',
        answer: 'Có thể. Tai nạn trên tuyến đường đi làm/về nhà hợp lý được gọi là 通勤災害. Nếu ghé chỗ khác vì lý do cá nhân, cần hỏi 労働基準監督署 để đánh giá cụ thể.',
      },
      {
        question: 'Dùng 労災 có ảnh hưởng visa hoặc quan hệ với công ty không?',
        answer: '労災 là quyền lợi hợp pháp của người lao động tại Nhật, không phải khiếu nại sai trái và không tự động ảnh hưởng tư cách lưu trú. Nếu bị gây khó dễ, hãy lưu bằng chứng và hỏi 労働基準監督署 hoặc tư vấn lao động.',
      },
    ],
    officialLinks: [
      { label: '労災補償 — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/rousai/pamphletfaq.html' },
      { label: '労働災害が発生したとき — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/zigyonushi/rousai/index.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Đến bệnh viện và khai báo tai nạn lao động',
        description: 'Đến bệnh viện hoặc phòng khám có nhận 労災 (không phải tất cả đều nhận — hỏi trước hoặc tra cứu trên trang 厚生労働省). Nói với bác sĩ và bệnh viện rằng đây là tai nạn lao động (労災です / 仕事中のケガです) — chi phí điều trị sẽ được 労災保険 chi trả, không dùng 健康保険 thông thường.\n\nNếu cấp cứu trước: vào bệnh viện gần nhất, sau đó báo cho công ty và chuyển hóa đơn sang thanh toán 労災 — bệnh viện sẽ hướng dẫn.',
        documents: [],
        tip: 'Không nên dùng 健康保険 (bảo hiểm y tế thông thường) để điều trị tai nạn lao động — nếu lỡ dùng, cần làm thủ tục hoàn trả sau. Nói rõ ngay từ đầu là 労災 để tránh phức tạp.',
      },
      {
        step: 2,
        title: 'Thông báo cho công ty và yêu cầu làm thủ tục 労災',
        description: 'Báo cho cấp trên hoặc bộ phận nhân sự ngay trong ngày nếu có thể. Công ty có nghĩa vụ giúp bạn làm thủ tục nộp đơn 労災 (様式第5号 cho điều trị, 様式第8号 cho trợ cấp nghỉ việc). Nếu công ty từ chối hoặc trì hoãn, bạn có thể tự nộp trực tiếp tại 労働基準監督署 mà không cần chữ ký của công ty.',
        documents: [
          'Tên, địa chỉ công ty',
          'Mô tả tai nạn: ngày, giờ, địa điểm, nguyên nhân, công việc đang làm lúc xảy ra tai nạn',
          'Thông tin bệnh viện điều trị',
        ],
        tip: 'Ghi chép hoặc chụp ảnh hiện trường ngay sau tai nạn nếu có thể — bằng chứng sẽ rất quan trọng nếu sau này có tranh chấp về nguyên nhân.',
        image: require('../../../../../assets/content/daily-life/ag_rousai_s2.jpg'),
        imageCaption: 'Điền mẫu 労災 và yêu cầu công ty xác nhận — bắt buộc để nhận quyền lợi bồi thường',
      },
      {
        step: 3,
        title: 'Các quyền lợi 労災 có thể nhận',
        description: '療養補償給付: chi trả toàn bộ chi phí điều trị tại bệnh viện có nhận 労災 — không giới hạn thời gian điều trị.\n\n休業補償給付: nếu phải nghỉ làm từ 4 ngày trở lên do tai nạn, nhận 80% lương ngày trung bình (60% từ 労災 + 20% từ công ty) kể từ ngày thứ 4. Ba ngày đầu tiên công ty bồi thường trực tiếp (休業補償).\n\n障害補償給付: nếu để lại di chứng sau điều trị, nhận trợ cấp tàn tật theo cấp độ (1–14 cấp).\n\n遺族補償給付: nếu tử vong do tai nạn lao động, gia đình được nhận trợ cấp.',
        documents: [
          'Giấy chứng nhận của bác sĩ (診断書)',
          'Mẫu đơn 労災 theo từng loại quyền lợi (lấy tại công ty hoặc 労働基準監督署)',
        ],
        tip: 'Nếu tai nạn xảy ra trên đường đi làm hoặc về (kể cả đi bộ, xe đạp), cũng thuộc 労災 (gọi là 通勤災害). Điều kiện: đường đi hợp lý, không ghé chỗ khác vì lý do cá nhân.',
      },
      {
        step: 4,
        title: 'Khi công ty gây khó dễ hoặc từ chối',
        description: 'Nếu công ty từ chối ký đơn, che giấu tai nạn hoặc ép bạn dùng 健康保険 thay 労災: đây là vi phạm pháp luật. Bạn có quyền tự nộp đơn tại 労働基準監督署 mà không cần công ty. Ngoài ra liên hệ:\n\n• 労働基準監督署 (Văn phòng giám sát tiêu chuẩn lao động) — tại thành phố bạn làm việc.\n• FRESC (Trung tâm hỗ trợ người nước ngoài) — có phiên dịch tiếng Việt.\n• Nghiệp đoàn lao động (労働組合) nếu bạn là thành viên.',
        documents: [
          'Toàn bộ bằng chứng về tai nạn và quá trình điều trị',
          'Thư từ, tin nhắn liên quan đến việc công ty từ chối (nếu có)',
        ],
        tip: 'Người lao động nước ngoài có tư cách lưu trú hợp lệ được bảo vệ đầy đủ bởi Luật Lao động Nhật Bản. Việc sử dụng quyền 労災 không ảnh hưởng đến tư cách lưu trú — đây là quyền lợi hợp pháp, không phải "khiếu nại".',
        image: require('../../../../../assets/content/daily-life/ag_rousai_s1.jpg'),
        imageCaption: 'Đến bệnh viện ngay và khai báo tai nạn lao động để được điều trị theo 労災保険',
      },
    ],
  };

export default workplaceAccidentRousai;
