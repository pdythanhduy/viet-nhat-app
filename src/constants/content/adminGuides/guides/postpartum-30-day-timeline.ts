import type { AdminGuide } from '../../../../types/content';

const postpartum30DayTimeline: AdminGuide = {
    id: 'postpartum-30-day-timeline',
    category: 'health',
    lastVerified: '2026-05-16',
    priority: 'high',
    title: 'Timeline 0-30 ngày sau sinh',
    titleJp: '出産後30日までの手続きタイムライン',
    icon: 'time',
    color: '#C0397A',
    description: 'Checklist thực tế cho 30 ngày đầu sau sinh tại Nhật: việc nào làm ngay ở bệnh viện, việc nào phải làm trong 14 ngày, việc nào không nên để qua 30 ngày.',
    heroImage: require('../../../../../assets/content/daily-life/ag_postpartum_hero.jpg'),
    heroImageCaption: 'Checklist 30 ngày sau sinh — việc nào cần làm ngay',
    whoIsThisFor: [
      'Gia đình vừa sinh con và cần một danh sách việc theo thứ tự thời gian.',
      'Người đang quá tải sau sinh và không muốn đọc quá nhiều lý thuyết.',
      'Người muốn một checklist có thể tick trực tiếp trong app mà không cần backend.',
    ],
    whenToDo: [
      'Ngay sau khi sinh đến hết 30 ngày đầu tiên.',
      'Đặc biệt hữu ích nếu cả cha và mẹ đều là người nước ngoài, vì ngoài giấy tờ sau sinh thông thường còn có mốc cư trú của em bé.',
    ],
    whereToDo: [
      'Bệnh viện: giấy chứng sinh, hóa đơn, thỏa thuận thanh toán và lịch tái khám.',
      'City hall / ward office: 出生届, 児童手当, bảo hiểm, y tế trẻ em và các giấy tờ cư trú địa phương.',
      'ISA: tư cách lưu trú của em bé nếu ở Nhật quá 60 ngày.',
      'Đại sứ quán / lãnh sự quán: quốc tịch và hộ chiếu cho em bé.',
    ],
    estimatedTime: 'Guide này chia theo 4 nhịp: trong 48 giờ đầu, trong 14 ngày đầu, trong 15 ngày đầu và trước ngày thứ 30. Nếu làm chậm ở nhịp đầu, các nhịp sau sẽ dồn việc rất nhanh.',
    fees: [
      'Bản thân checklist không tạo ra phí, nhưng các thủ tục bên trong có thể kéo theo phí sao y, chuyển phát, hộ chiếu, dịch thuật hoặc phần viện phí chênh lệch.',
      'Các hỗ trợ sau sinh và y tế trẻ em có thể giảm đáng kể chi phí, nhưng phần lớn không tự động kích hoạt nếu gia đình không nộp hồ sơ đúng chỗ.',
    ],
    documentsChecklist: [
      { label: 'Nhận giấy chứng sinh / bộ giấy tờ sinh từ bệnh viện', required: true, note: 'Kiểm tra ngay tên, ngày sinh, giờ sinh và giới tính của em bé có đúng không.' },
      { label: 'Xác nhận bệnh viện đã xử lý đúng phần 出産育児一時金 hoặc khoản chênh lệch', required: true },
      { label: 'Làm 出生届 tại city hall trong 14 ngày', required: true },
      { label: 'Hỏi và nộp hồ sơ 児童手当 trong 15 ngày', required: true, note: 'Nộp muộn có thể mất tháng trợ cấp.' },
      { label: 'Thêm em bé vào bảo hiểm và hỏi hỗ trợ y tế trẻ em của địa phương', required: true },
      { label: 'Làm khai sinh / quốc tịch / hộ chiếu cho em bé tại đại sứ quán hoặc lãnh sự quán', required: false },
      { label: 'Nếu em bé ở Nhật quá 60 ngày: chuẩn bị hồ sơ 在留資格取得許可 và nộp trong 30 ngày từ ngày sinh', required: false, note: 'Đây là mốc cực quan trọng với gia đình mà cha mẹ đều là người nước ngoài.' },
      { label: 'Đặt lịch tái khám cho mẹ và lịch khám sơ sinh / 乳幼児健診 cho em bé', required: true },
    ],
    commonMistakes: [
      'Để toàn bộ việc hành chính dồn vào ngày thứ 10-14, lúc đó sức khỏe mẹ và em bé vẫn chưa ổn.',
      'Nghĩ rằng 出生届 xong là tự động xong cả 児童手当, bảo hiểm và giấy tờ của em bé.',
      'Ưu tiên làm hộ chiếu trước nhưng lại bỏ qua mốc 児童手当 hoặc bảo hiểm của em bé.',
      'Gia đình nước ngoài chờ quá lâu mới hỏi về 在留資格取得許可 của em bé.',
    ],
    faq: [
      {
        question: 'Nếu tôi quá mệt sau sinh thì nên ưu tiên việc nào trước?',
        answer: 'Ưu tiên 4 việc theo thứ tự: lấy đủ giấy từ bệnh viện, nộp 出生届 trong 14 ngày, hỏi 児童手当 trong 15 ngày và nếu con là người nước ngoài sẽ ở lại Nhật lâu hơn 60 ngày thì chuẩn bị hồ sơ cư trú trước mốc 30 ngày.',
      },
      {
        question: 'Có cần làm mọi thứ trong 1-2 ngày đầu không?',
        answer: 'Không. Nhưng bạn nên gom đủ giấy từ bệnh viện và chia việc ngay từ đầu. Nếu để đến gần hạn mới bắt đầu, chỉ cần thiếu một giấy gốc hoặc trùng ngày nghỉ là rất dễ trượt mốc.',
      },
      {
        question: 'Checklist này có thay guide chi tiết không?',
        answer: 'Không. Đây là guide thao tác nhanh. Khi cần hiểu sâu từng mục, hãy mở lại bài mang thai/sau sinh hoặc bài con sinh ở Nhật để xem giải thích chi tiết và nguồn pháp lý tương ứng.',
      },
    ],
    officialLinks: [
      { label: '出生届 — 法務省', url: 'https://www.moj.go.jp/ONLINE/FAMILYREGISTER/5-1.html' },
      { label: '児童手当制度のご案内 — こども家庭庁', url: 'https://www.cfa.go.jp/policies/kokoseido/jidouteate/annai/' },
      { label: '出産育児一時金 — 協会けんぽ', url: 'https://www.kyoukaikenpo.or.jp/benefit/childbirth/002/index.html' },
      { label: '在留資格取得許可申請 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/16-10.html' },
      { label: '母子健康手帳 — 厚生労働省', url: 'https://www.bosei-navi.mhlw.go.jp/glossary/life01.html' },
    ],
    steps: [
      {
        step: 1,
        title: '0-2 ngày: gom đủ giấy tờ rời bệnh viện',
        description: 'Trước khi xuất viện hoặc ngay sau khi xuất viện, hãy kiểm tra bệnh viện đã giao đủ giấy chứng sinh, hóa đơn, giấy xác nhận sinh và hướng dẫn thanh toán liên quan đến 出産育児一時金 hay chưa.',
        documents: [
          'Giấy chứng sinh / mẫu có phần出生証明',
          'Hóa đơn viện phí',
          'Giấy hẹn tái khám của mẹ và em bé',
        ],
        tip: 'Nếu có sai tên, sai ngày sinh hoặc thiếu chữ ký/dấu của bệnh viện, hãy sửa ngay khi còn dễ liên hệ.',
        image: require('../../../../../assets/content/daily-life/ag_postpartum_s1.jpg'),
        imageCaption: 'Hồ sơ xuất viện gồm giấy chứng sinh, sổ y tế và hóa đơn bệnh viện',
      },
      {
        step: 2,
        title: 'Ngày 1-7: chia việc theo 3 nơi',
        description: 'Hãy tách sớm việc theo 3 nơi: city hall, đại sứ quán và ISA. Chỉ cần biết nhà bạn có thuộc diện phải làm với ISA hay không là đã giảm được rất nhiều nhầm lẫn.',
        documents: [
          'Danh sách giấy cần mang ra city hall',
          'Checklist của đại sứ quán',
          'Quyết định em bé có ở Nhật quá 60 ngày hay không',
        ],
        tip: 'Gia đình người nước ngoài gần như luôn nên mở đồng thời cả hướng đại sứ quán và hướng ISA, đừng làm tuần tự quá chậm.',
      },
      {
        step: 3,
        title: 'Trong 14 ngày: nộp 出生届',
        description: 'Đây là hạn cứng nhất ở giai đoạn đầu. Nếu chậm mốc này, nhiều việc khác sẽ kéo theo chậm hơn, đặc biệt khi phải xin thêm bản sao hoặc xác nhận từ địa phương.',
        documents: [
          'Mẫu 出生届',
          'Giấy sinh do bệnh viện lập',
          'Thông tin cha mẹ và địa chỉ',
        ],
        tip: 'Nên nộp sớm hơn hạn, không nên dồn vào sát ngày thứ 14.',
        image: require('../../../../../assets/content/daily-life/ag_postpartum_s3.jpg'),
        imageCaption: 'Nộp 出生届 trong 14 ngày — tại municipal office nơi sinh hoặc nơi cư trú',
      },
      {
        step: 4,
        title: 'Trong 15 ngày: kiểm tra và nộp 児童手当',
        description: 'Theo こども家庭庁, gia đình có con sinh ra phải nộp 認定請求. Trên thực tế đây là một trong những mốc dễ bỏ sót nhất vì nhiều người tưởng đã nộp khai sinh thì trợ cấp sẽ tự chạy.',
        documents: [
          'Đơn 認定請求',
          'Tài khoản ngân hàng',
          'Giấy tờ theo yêu cầu của city hall',
        ],
        tip: 'Nếu city hall của bạn yêu cầu hồ sơ khác với nơi người quen từng làm, hãy theo đúng nơi bạn đang cư trú, không làm theo truyền miệng.',
      },
      {
        step: 5,
        title: 'Trong 2-3 tuần đầu: bảo hiểm, y tế trẻ em, lịch khám',
        description: 'Ngoài tiền trợ cấp, việc thêm em bé vào bảo hiểm và xin hỗ trợ y tế trẻ em của địa phương mới là phần ảnh hưởng trực tiếp tới chi phí khám chữa bệnh sau sinh. Đồng thời phải chốt lịch tái khám cho mẹ và khám định kỳ cho em bé.',
        documents: [
          'Giấy tờ bảo hiểm của cha mẹ',
          'Thông tin cư trú của em bé',
          '母子健康手帳',
        ],
        tip: 'Đừng coi đây là việc phụ. Nếu chậm, mỗi lần đi khám sẽ vướng giải thích hoặc phải trả trước nhiều hơn.',
      },
      {
        step: 6,
        title: 'Trước ngày thứ 30: chốt quốc tịch, hộ chiếu và hồ sơ cư trú nếu cần',
        description: 'Nếu em bé là người nước ngoài và gia đình xác định sẽ ở Nhật tiếp, đây là giai đoạn phải nhìn thẳng vào hồ sơ quốc tịch/hộ chiếu và tư cách lưu trú. Đừng để tới sát hạn mới đi hỏi vì giấy tờ lãnh sự thường mất thời gian hơn dự kiến.',
        documents: [
          'Hồ sơ lãnh sự cho em bé',
          'Đơn 在留資格取得許可 nếu áp dụng',
          'Các bản sao giấy tờ hộ tịch/cư trú cần thiết',
        ],
        tip: 'Mục tiêu của ngày 30 không phải là “xong tất cả”, mà là không bỏ lỡ mốc nộp đơn và không để hồ sơ đứng yên vì thiếu chuẩn bị.',
      },
    ],
  };

export default postpartum30DayTimeline;
