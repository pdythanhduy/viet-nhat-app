import type { AdminGuide } from '../../../../types/content';

const babyBornInJapan: AdminGuide = {
    id: 'baby-born-in-japan',
    category: 'immigration',
    lastVerified: '2026-05-16',
    priority: 'high',
    title: 'Con sinh ở Nhật: quốc tịch, hộ chiếu, cư trú',
    titleJp: '日本で生まれた子どもの国籍・旅券・在留',
    icon: 'happy',
    color: '#F39C12',
    description: 'Guide riêng cho em bé sinh ở Nhật khi cha mẹ là người nước ngoài: quốc tịch, hộ chiếu, 在留資格取得, My Number, bảo hiểm và các mốc khám cơ bản.',
    legalScope: {
      jurisdiction: 'mixed',
      jurisdictionNote: 'Sau sinh có nhiều cơ quan: municipal office cho 出生届/cư trú, ISA cho 在留資格取得, cơ quan lãnh sự theo quốc tịch cha/mẹ cho khai sinh/hộ chiếu.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-12-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Cha mẹ khác quốc tịch, chưa đăng ký kết hôn, giấy tờ quốc tịch/hộ chiếu của con bị chậm hoặc có tranh chấp gia đình.',
        'Em bé sẽ ở Nhật quá 60 ngày nhưng gia đình chưa chuẩn bị hồ sơ ISA trước mốc 30 ngày.',
        'Một trong hai cha mẹ có tình trạng cư trú bất ổn, sắp hết hạn hoặc không rõ tư cách con nên xin.',
      ],
    },
    quickAction: {
      deadline: '出生届 trong 14 ngày; nếu em bé là người nước ngoài sẽ ở Nhật quá 60 ngày thì nộp 在留資格取得許可申請 trong 30 ngày từ ngày sinh.',
      office: 'Municipal office, ISA và Đại sứ quán/Lãnh sự quán theo quốc tịch của cha hoặc mẹ.',
      doNow: [
        'Tách riêng 3 việc: khai sinh tại Nhật, quốc tịch/hộ chiếu theo nước của cha/mẹ, và tư cách lưu trú tại ISA.',
        'Không chờ hộ chiếu quá lâu rồi mới hỏi ISA nếu em bé sẽ ở quá 60 ngày.',
        'Thêm em bé vào bảo hiểm và kiểm tra My Number/hỗ trợ y tế trẻ em tại địa phương.',
      ],
      bring: ['Giấy chứng sinh/出生届', 'Hộ chiếu hoặc giấy tờ quốc tịch của cha mẹ', 'Thẻ cư trú của cha mẹ', 'Hồ sơ lãnh sự của em bé', 'Hồ sơ 在留資格取得 nếu ở quá 60 ngày'],
      ifLate: 'Nếu sắp qua mốc 30 ngày hoặc đã qua hạn, hỏi ISA ngay và giải thích trung thực; không đợi đến ngày thứ 59 mới xử lý.',
      officialSourceLabels: ['在留資格取得許可申請 — 出入国在留管理庁', '在留資格の取得（入管法第22条の2）— 出入国在留管理庁', '出生届 — 法務省'],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_baby_hero.jpg'),
    heroImageCaption: 'Thủ tục giấy tờ cho em bé sinh tại Nhật',
    whoIsThisFor: [
      'Cha mẹ đều là người nước ngoài và vừa sinh con tại Nhật.',
      'Gia đình muốn biết em bé có quốc tịch gì, khi nào phải làm hộ chiếu và khi nào phải làm hồ sơ với ISA.',
      'Người đang rối giữa khai sinh ở city hall, khai sinh theo quốc tịch và thủ tục cư trú của em bé.',
    ],
    whenToDo: [
      'Ngay sau khi sinh, song song với việc làm 出生届 và xin các trợ cấp sau sinh.',
      'Đặc biệt quan trọng trước mốc 30 ngày từ ngày sinh nếu em bé sẽ ở Nhật quá 60 ngày.',
      'Càng làm sớm càng tốt nếu đại sứ quán của quốc tịch của cha hoặc mẹ cần nhiều thời gian để cấp giấy tờ hoặc hộ chiếu cho em bé.',
    ],
    whereToDo: [
      'City hall / ward office: 出生届, đăng ký cư trú, thông báo/My Number và các thủ tục địa phương liên quan tới em bé.',
      'ISA: 在留資格取得許可申請 nếu em bé là người nước ngoài sẽ tiếp tục ở Nhật quá 60 ngày.',
      'Đại sứ quán / Lãnh sự quán của nước có quốc tịch của cha hoặc mẹ: khai sinh, đăng ký quốc tịch và xin hộ chiếu cho em bé.',
      'Bảo hiểm y tế hoặc nơi làm việc của cha/mẹ: thêm em bé vào diện bảo hiểm phù hợp.',
      'Cơ sở y tế và city hall: lịch khám sơ sinh, 乳幼児健診 và voucher/y tế trẻ em theo địa phương.',
    ],
    estimatedTime: 'Guide này có 3 lớp việc chạy song song: city hall trong 14 ngày, ISA trong 30 ngày nếu em bé ở quá 60 ngày, và đại sứ quán/hộ chiếu theo quốc tịch của cha mẹ. Thời gian cấp hộ chiếu và giải quyết cư trú thực tế tùy từng quốc tịch và từng cục xuất nhập cảnh.',
    fees: [
      'Khai sinh và nhiều thủ tục hành chính cơ bản tại city hall thường không có mức phí lớn, nhưng bản sao giấy tờ có thể mất phí theo địa phương.',
      'Hộ chiếu và thủ tục lãnh sự cho em bé phụ thuộc quốc tịch của cha hoặc mẹ.',
      'Trong một số hồ sơ cư trú, gia đình có thể phát sinh chi phí ảnh, chuyển phát, dịch thuật hoặc công chứng.',
      'Các hỗ trợ y tế trẻ em và mức tự trả cho khám chữa bệnh sau sinh của em bé phụ thuộc vào hệ thống bảo hiểm và trợ cấp y tế trẻ em của địa phương.',
    ],
    documentsChecklist: [
      { label: '出生届 đã nộp hoặc bộ giấy tờ sinh do bệnh viện cấp', required: true },
      { label: 'Hộ chiếu / giấy tờ quốc tịch của cha mẹ', required: true },
      { label: 'Tài liệu của đại sứ quán về việc khai sinh và cấp hộ chiếu cho em bé', required: true },
      { label: 'Hồ sơ 在留資格取得許可 nếu em bé ở Nhật quá 60 ngày', required: false, note: 'Đây là mốc quan trọng nhất về mặt cư trú đối với con của cha mẹ đều là người nước ngoài.' },
      { label: 'Thông tin địa chỉ cư trú và My Number của cha mẹ', required: true },
      { label: 'Hồ sơ thêm em bé vào bảo hiểm y tế / phúc lợi của địa phương', required: false },
    ],
    commonMistakes: [
      'Nghĩ rằng sinh ở Nhật thì em bé tự có quốc tịch Nhật.',
      'Chỉ làm khai sinh ở city hall nhưng quên khai sinh/hộ chiếu theo quốc tịch của cha hoặc mẹ.',
      'Hiểu nhầm rằng em bé sinh ở Nhật phải xin tư cách lưu trú ngay trong vài ngày; thực tế ISA cho phép ở đến 60 ngày không có tư cách lưu trú, nhưng nếu ở lâu hơn thì phải nộp hồ sơ trong 30 ngày từ ngày sinh.',
      'Quên thêm em bé vào bảo hiểm hoặc bỏ qua trợ cấp y tế trẻ em của địa phương.',
      'Cho rằng My Number card sẽ tự có ngay; thực tế cần phân biệt số My Number và thẻ My Number card.',
    ],
    faq: [
      {
        question: 'Con sinh ở Nhật có tự động thành người Nhật không?',
        answer: 'Không nếu cả cha và mẹ đều là người nước ngoài. ISA nêu rõ trong trường hợp đó em bé không tự động có quốc tịch Nhật; gia đình phải làm thủ tục với đại sứ quán hoặc lãnh sự quán của quốc tịch của cha hoặc mẹ và xin hộ chiếu cho em bé.',
      },
      {
        question: 'Khi nào em bé phải làm hồ sơ ở ISA?',
        answer: 'Nếu em bé là người nước ngoài sẽ ở Nhật quá 60 ngày, phải nộp 在留資格取得許可申請 trong vòng 30 ngày từ ngày sinh. Đây là mốc nộp đơn, không phải mốc nhận kết quả.',
      },
      {
        question: 'Nếu chưa có hộ chiếu cho em bé thì có nộp hồ sơ cư trú được không?',
        answer: 'Tùy hồ sơ cụ thể và giấy tờ đang có, nhưng về nguyên tắc gia đình nên làm sớm cả hai hướng: hồ sơ quốc tịch/hộ chiếu ở đại sứ quán và hồ sơ cư trú ở ISA nếu sẽ ở quá 60 ngày. Không nên chờ hộ chiếu quá lâu rồi lỡ mất mốc 30 ngày nộp hồ sơ cư trú.',
      },
      {
        question: 'Em bé có My Number không?',
        answer: 'Nếu là cư dân có đăng ký địa chỉ ở Nhật, em bé sẽ được gán My Number như các cư dân khác. Nhưng My Number card là thẻ riêng, phải làm thủ tục phát hành; không nên nhầm số My Number với thẻ nhựa My Number card.',
      },
      {
        question: 'Khám định kỳ cho em bé có tự động miễn phí toàn bộ không?',
        answer: 'Không nên nói chung như vậy. Nhiều địa phương có phiếu hỗ trợ và chương trình khám 乳幼児健診, cùng hỗ trợ y tế trẻ em, nhưng phạm vi chi trả và cách làm hồ sơ tùy từng thành phố/quận. Hãy xem hướng dẫn của city hall nơi bạn đang ở.',
      },
    ],
    officialLinks: [
      { label: '在留資格取得許可申請 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/16-10.html' },
      { label: '在留資格の取得（入管法第22条の2）— 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/syutoku_00001.html' },
      { label: '在留資格「家族滞在」— 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/status/dependent.html' },
      { label: 'マイナンバーカードを作って、便利に生活しましょう！— 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/support/portal/mynumbercard.html' },
      { label: '母子健康手帳 — 厚生労働省', url: 'https://www.bosei-navi.mhlw.go.jp/glossary/life01.html' },
      { label: '出生届 — 法務省', url: 'https://www.moj.go.jp/ONLINE/FAMILYREGISTER/5-1.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Tách 3 việc khác nhau: khai sinh, quốc tịch, cư trú',
        description: 'Sau khi em bé sinh ở Nhật, gia đình thường phải làm 3 việc khác nhau và rất dễ nhầm là một: nộp 出生届 cho chính quyền Nhật, làm khai sinh/quốc tịch/hộ chiếu theo nước của cha hoặc mẹ, và nếu em bé sẽ ở Nhật lâu hơn 60 ngày thì làm hồ sơ cư trú với ISA.',
        documents: [
          'Giấy sinh do bệnh viện cấp',
          'Giấy tờ của cha mẹ',
          'Thông tin nơi cư trú hiện tại',
        ],
        tip: 'Nếu trộn 3 việc này vào một, bạn sẽ dễ tưởng rằng làm xong city hall là xong tất cả. Thực tế không phải vậy.',
      },
      {
        step: 2,
        title: 'Nộp 出生届 đúng hạn',
        description: 'Theo 法務省, 出生届 là thủ tục hộ tịch tại Nhật và phải nộp trong vòng 14 ngày từ ngày sinh. Đây là nền tảng để nhiều thủ tục khác của em bé tiếp tục được thực hiện thuận hơn tại địa phương.',
        documents: [
          'Mẫu 出生届 có phần出生証明',
          'Thông tin cha mẹ',
          'Địa chỉ cư trú tại Nhật',
        ],
        tip: 'Nộp sớm sẽ giúp các bước liên quan đến đăng ký cư trú, trợ cấp và My Number đi tiếp thuận hơn.',
        image: require('../../../../../assets/content/daily-life/ag_baby-born_s2.jpg'),
        imageCaption: 'Tiếp nhận 出生届 tại quầy municipal office — mang đủ giấy tờ từ bệnh viện',
      },
      {
        step: 3,
        title: 'Làm quốc tịch và hộ chiếu cho em bé',
        description: 'Nếu cha mẹ đều là người nước ngoài, ISA nêu rõ em bé không tự động có quốc tịch Nhật. Gia đình phải làm thủ tục với đại sứ quán hoặc lãnh sự quán của quốc tịch của cha hoặc mẹ để đăng ký khai sinh, xác nhận quốc tịch và xin hộ chiếu cho em bé.',
        documents: [
          'Giấy khai sinh/giấy tờ hộ tịch theo yêu cầu của đại sứ quán',
          'Giấy tờ của cha và mẹ',
          'Ảnh em bé nếu cơ quan lãnh sự yêu cầu',
        ],
        tip: 'Mỗi quốc tịch có bộ hồ sơ rất khác nhau. Đừng sao chép checklist của gia đình khác mà không kiểm tra lại với cơ quan lãnh sự của mình.',
        image: require('../../../../../assets/content/daily-life/ag_baby-born_s3.jpg'),
        imageCaption: 'Hộ chiếu Việt Nam của em bé — nộp qua lãnh sự quán hoặc đại sứ quán',
      },
      {
        step: 4,
        title: 'Nếu ở Nhật quá 60 ngày: nộp 在留資格取得許可 trong 30 ngày',
        description: 'ISA nêu rõ em bé sinh ở Nhật là người nước ngoài có thể ở Nhật đến 60 ngày mà chưa cần có tư cách lưu trú. Nhưng nếu sẽ ở tiếp quá 60 ngày, gia đình phải nộp 在留資格取得許可申請 trong vòng 30 ngày từ ngày sinh.',
        documents: [
          'Đơn 在留資格取得許可申請',
          'Giấy tờ chứng minh việc sinh',
          'Giấy tờ của cha mẹ và diện cư trú dự định cho em bé',
        ],
        tip: 'Mốc quan trọng là 30 ngày để nộp đơn, không phải đợi tới ngày thứ 59 mới làm. Làm sớm sẽ tránh vướng hộ chiếu, giấy tờ hoặc lịch hẹn.',
      },
      {
        step: 5,
        title: 'Thêm em bé vào bảo hiểm và theo dõi My Number',
        description: 'Sau khi đăng ký địa chỉ cư trú, em bé sẽ đi vào các thủ tục cư dân bình thường như My Number và các hỗ trợ y tế địa phương. Đồng thời cha mẹ cần thêm em bé vào chế độ bảo hiểm phù hợp để việc khám chữa bệnh sau sinh của em bé không bị hẫng.',
        documents: [
          'Giấy tờ cư trú của cha mẹ',
          'Thông tin bảo hiểm của gia đình',
          'Thông báo/My Number của em bé khi được cấp',
        ],
        tip: 'Phân biệt rõ: My Number là số định danh; My Number card là thẻ phải xin phát hành riêng.',
      },
      {
        step: 6,
        title: 'Đừng bỏ qua khám sơ sinh và 乳幼児健診',
        description: 'Ngoài giấy tờ cư trú, em bé còn có lộ trình khám và theo dõi sức khỏe rất quan trọng. MHLW và các địa phương đều nhấn mạnh vai trò của 母子健康手帳 và lịch khám định kỳ cho trẻ nhỏ. Đây không chỉ là y tế mà còn ảnh hưởng trực tiếp tới việc gia đình nhận thông tin và hỗ trợ đúng hạn.',
        documents: [
          '母子健康手帳',
          'Phiếu khám trẻ em của địa phương nếu có',
          'Thẻ bảo hiểm hoặc giấy tờ thay thế khi đi khám',
        ],
        tip: 'Nếu vừa mệt sau sinh vừa nhiều giấy tờ, hãy lập checklist riêng cho em bé: city hall, đại sứ quán, ISA, bảo hiểm và lịch khám.',
      },
    ],
  };

export default babyBornInJapan;
