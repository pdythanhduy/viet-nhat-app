import type { AdminGuide } from '../../../../types/content';

const nurseryKindergartenGuide: AdminGuide = {
    id: 'nursery-kindergarten-guide',
    category: 'daily-law',
    lastVerified: '2026-04-11',
    priority: 'high',
    title: 'Nhà trẻ, mẫu giáo và chỗ gửi trẻ ở Nhật',
    titleJp: '保育園・幼稚園・こども園の選び方と申込み',
    icon: 'school',
    color: '#16A085',
    description: 'Guide thực tế về hoikuen, youchien, kodomoen, taikuen, giấy tờ đi làm của phụ huynh, miễn giảm học phí và thay đổi đáng chú ý từ năm tài khóa 2026.',
    heroImage: require('../../../../../assets/content/daily-life/ag_nursery_hero.jpg'),
    heroImageCaption: 'Tìm hiểu hoikuen, youchien và hệ thống giữ trẻ tại Nhật',
    whoIsThisFor: [
      'Gia đình có con nhỏ đang cần gửi trẻ để đi làm hoặc chuẩn bị cho con vào mẫu giáo.',
      'Người chưa phân biệt được hoikuen, youchien, nintei kodomoen và cơ sở ngoài hệ thống công nhận.',
      'Gia đình đang lo cảnh đợi chỗ, thiếu giấy tờ công việc hoặc bị từ chối vì không đủ điều kiện 保育の必要性.',
    ],
    whenToDo: [
      'Trước đợt nhận hồ sơ chính của địa phương, thường nhiều tháng trước tháng 4 nhập học.',
      'Ngay khi gia đình biết sẽ quay lại làm việc, chuyển việc, hết nghỉ sinh hoặc cần gửi trẻ dài hạn.',
      'Nếu con đã đến tuổi mẫu giáo nhưng gia đình chưa cần gửi cả ngày, nên tìm hiểu sớm sự khác nhau giữa youchien và hoikuen thay vì chỉ hỏi chung “trường mầm non”.',
    ],
    whereToDo: [
      'City hall / ward office: hồ sơ vào 認可保育所, 認定こども園 và đánh giá 保育の必要性.',
      'Trực tiếp với trường hoặc hệ thống hướng dẫn của địa phương: lịch open day, tham quan, xếp nguyện vọng và thông báo kết quả.',
      'Doanh nghiệp nơi cha/mẹ làm việc: xin 就労証明書 theo mẫu địa phương hoặc mẫu chuẩn do こども家庭庁 công bố.',
      'Riêng 幼稚園 hoặc một số cơ sở ngoài hệ thống công nhận: quy trình có thể đi thẳng với trường, nhưng vẫn phải kiểm tra điều kiện hỗ trợ học phí và 預かり保育.',
    ],
    estimatedTime: 'Thời gian chuẩn bị thường dài hơn người mới sang Nhật nghĩ. Thực tế nhiều gia đình phải bắt đầu từ khâu tham quan, xin giấy xác nhận việc làm, nộp hồ sơ, chờ利用調整 rồi mới biết có chỗ hay không. Nếu nhắm kỳ nhập học tháng 4, nhiều địa phương mở hồ sơ từ mùa thu năm trước.',
    fees: [
      'Theo こども家庭庁, từ 01/10/2019, học phí đối với trẻ 3-5 tuổi tại hoikuen, youchien, nintei kodomoen thuộc phạm vi áp dụng đã được miễn. Trẻ 0-2 tuổi chỉ được miễn nếu hộ thuộc diện住民税非課税.',
      'Miễn học phí không đồng nghĩa miễn toàn bộ chi phí. Nhiều nơi vẫn còn tiền ăn, đồ dùng, đồng phục, xe đưa đón, hoạt động ngoại khóa hoặc 延長保育.',
      '預かり保育 ở 幼稚園 hoặc 認可外保育 muốn được hỗ trợ cũng thường cần 保育の必要性の認定 theo điều kiện của địa phương.',
      'Chi phí cơ sở ngoài hệ thống công nhận và mức hỗ trợ thực nhận có thể chênh lớn tùy địa phương và loại cơ sở.',
    ],
    documentsChecklist: [
      { label: 'Xác định loại hình muốn nộp: hoikuen, youchien, kodomoen hay cơ sở ngoài hệ thống', required: true },
      { label: 'Giấy tờ chứng minh 保育の必要性', required: true, note: 'Ví dụ: đi làm, tìm việc, mang thai/sau sinh, bệnh tật, chăm người thân... theo tiêu chí của địa phương.' },
      { label: '就労証明書 của cha/mẹ đi làm', required: false, note: 'Thường là giấy cực quan trọng với hồ sơ hoikuen và利用調整.' },
      { label: 'Giấy tờ cư trú, My Number, thông tin hộ gia đình', required: true },
      { label: 'Danh sách nguyện vọng và kết quả tham quan trường', required: false },
      { label: 'Giấy tờ về thu nhập/thuế nếu địa phương yêu cầu để tính phí hoặc hỗ trợ', required: false },
      { label: 'Giấy tờ đặc biệt nếu gia đình có hoàn cảnh riêng', required: false, note: 'Ví dụ: single parent, con cần hỗ trợ đặc biệt, cha/mẹ đang nghỉ sinh, đang tìm việc.' },
    ],
    commonMistakes: [
      'Gọi tất cả là “trường mầm non” nên nộp sai chỗ: hoikuen và youchien có logic rất khác nhau.',
      'Nghĩ cứ có con nhỏ là đương nhiên vào được hoikuen, trong khi hệ thống này gắn với 保育の必要性 và利用調整 của địa phương.',
      'Chỉ chọn 1-2 nguyện vọng vì thích trường đẹp, rồi rơi vào cảnh không có chỗ.',
      'Nộp muộn 就労証明書 hoặc giấy tờ đi làm không khớp thực tế.',
      'Hiểu nhầm “miễn học phí” là không còn bất kỳ khoản nào phải đóng.',
      'Không biết từ năm tài khóa 2026 có `こども誰でも通園制度`, rồi nhầm nó với hoikuen chính thức cả ngày.',
    ],
    faq: [
      {
        question: 'Hoikuen và youchien khác nhau ở điểm nào dễ hiểu nhất?',
        answer: 'Hoikuen chủ yếu là cơ sở bảo育 cho gia đình có 保育の必要性 như đi làm, ốm đau, hoàn cảnh chăm sóc; còn youchien là trường học cho trẻ từ 3 tuổi đến trước tiểu học, không mặc định đòi lý do đi làm giống hoikuen. Đây là nhầm lẫn lớn nhất của nhiều gia đình mới sang Nhật.',
      },
      {
        question: 'Taikuen là gì?',
        answer: 'Taikuen thường được dùng để chỉ trẻ đang chờ chỗ vào cơ sở保育 dù gia đình muốn sử dụng. Đây không phải một “loại trường”, mà là tình trạng chưa được sắp chỗ sau利用調整.',
      },
      {
        question: 'Tôi đang nghỉ sinh hoặc sắp quay lại làm, có thể nộp hoikuen không?',
        answer: 'Có thể, nhưng điều kiện và cách chấm điểm phụ thuộc địa phương. Nhiều nơi xem xét thời điểm quay lại làm, giấy xác nhận của công ty và kế hoạch sử dụng dịch vụ保育. Đừng chờ tới sát ngày đi làm mới hỏi city hall.',
      },
      {
        question: 'Miễn học phí 3-5 tuổi có áp dụng cho mọi nơi không?',
        answer: 'Không theo nghĩa tuyệt đối. こども家庭庁 nêu nguyên tắc miễn đối với các cơ sở thuộc phạm vi制度; nhưng tiền ăn, đồng phục, đưa đón, giờ kéo dài và nhiều chi phí phụ khác vẫn có thể còn. Với 預かり保育 hay 認可外, điều kiện hỗ trợ còn phụ thuộc 保育の必要性 và mức trần hỗ trợ.',
      },
      {
        question: 'こども誰でも通園制度 năm 2026 có thay thế hoikuen không?',
        answer: 'Không. こども家庭庁 nêu đây là chế độ mới triển khai toàn quốc từ năm tài khóa 2026 cho phép mọi gia đình sử dụng một lượng giờ nhất định mà không cần điều kiện đi làm. Nó không phải bản thay thế cho hoikuen dài hạn cả ngày theo hệ thống利用調整 thông thường.',
      },
    ],
    officialLinks: [
      { label: '保育｜こども家庭庁', url: 'https://www.cfa.go.jp/policies/hoiku/' },
      { label: '子ども・子育て支援制度｜こども家庭庁', url: 'https://www.cfa.go.jp/policies/kokoseido' },
      { label: '幼児教育・保育の無償化｜こども家庭庁', url: 'https://www.cfa.go.jp/policies/kokoseido/mushouka/' },
      { label: 'こども誰でも通園制度について｜こども家庭庁', url: 'https://www.cfa.go.jp/policies/hoiku/daredemo-tsuen' },
      { label: '幼稚園について教えて！｜文部科学省', url: 'https://www.mext.go.jp/kids/find/kyoiku/mext_0001.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Phân biệt đúng loại hình trước khi nộp',
        description: 'Đầu tiên hãy tách rõ 4 nhóm: 認可保育所/hoikuen, 幼稚園/youchien, 認定こども園 và cơ sở ngoài hệ thống công nhận. Nếu nhầm từ đầu, bạn sẽ đi sai đường hồ sơ, sai kỳ tuyển và sai kỳ vọng về thời gian giữ trẻ.',
        documents: [
          'Danh sách cơ sở trong địa phương',
          'Độ tuổi con hiện tại',
          'Nhu cầu thực tế: gửi cả ngày để đi làm hay chỉ cần môi trường giáo dục bán thời gian',
        ],
        tip: 'Đừng hỏi “trường nào nhận con tôi” trước khi trả lời được “tôi cần loại hình nào”.',
      },
      {
        step: 2,
        title: 'Xác định có cần 保育の必要性 hay không',
        description: 'Với hoikuen và nhiều hỗ trợ liên quan, gia đình thường phải chứng minh 保育の必要性 như đi làm, tìm việc, bệnh tật, khuyết tật, mang thai/sau sinh hoặc chăm người thân. Đây là logic cốt lõi quyết định bạn có vào vòng利用調整 hay không.',
        documents: [
          'Tình trạng việc làm của cha mẹ',
          'Lịch đi làm hoặc kế hoạch quay lại làm',
          'Giấy tờ hoàn cảnh đặc biệt nếu có',
        ],
        tip: 'Mỗi city hall có hướng dẫn cụ thể riêng. Đừng dùng checklist của thành phố khác rồi nghĩ sẽ giống hoàn toàn.',
      },
      {
        step: 3,
        title: 'Chuẩn bị 就労証明書 và giấy tờ hộ gia đình',
        description: 'Một trong những giấy dễ trễ nhất là 就労証明書. こども家庭庁 có mẫu chuẩn, nhưng địa phương hoặc trường có thể yêu cầu cách nộp riêng. Gia đình có 2 người đi làm nên chuẩn bị giấy của cả hai càng sớm càng tốt.',
        documents: [
          '就労証明書 của cha/mẹ',
          'Thẻ cư trú, My Number, thông tin địa chỉ',
          'Giấy tờ thuế hoặc thu nhập nếu địa phương yêu cầu',
        ],
        tip: 'Nếu mới đổi việc, làm part-time, tự doanh hoặc chưa có hợp đồng ổn định, hãy hỏi city hall ngay cách chứng minh thay thế. Đây là chỗ hồ sơ người nước ngoài hay bị vướng.',
        image: require('../../../../../assets/content/daily-life/ag_nursery_s3.jpg'),
        imageCaption: '就労証明書 do công ty cấp — xác nhận giờ làm và loại hợp đồng cho hồ sơ gửi trẻ',
      },
      {
        step: 4,
        title: 'Đi tham quan và nộp nhiều nguyện vọng thực tế',
        description: 'Trong môi trường có cạnh tranh chỗ, việc chỉ chọn một trường “đẹp, gần nhà” là rất rủi ro. Nhiều gia đình phải cân bằng giữa khoảng cách, giờ nhận-trả, bữa ăn, ngày nghỉ, hỗ trợ tiếng Nhật, quy định khi trẻ ốm và khả năng đỗ chỗ.',
        documents: [
          'Danh sách trường muốn nộp theo thứ tự',
          'Ghi chú sau khi tham quan',
          'Kế hoạch đi làm thực tế của gia đình',
        ],
        tip: 'Một quyết định thực tế thường tốt hơn một danh sách nguyện vọng quá lý tưởng rồi rơi vào taikuen.',
        image: require('../../../../../assets/content/daily-life/ag_nursery_s4.jpg'),
        imageCaption: 'Tham quan 保育園 và nộp nhiều nguyện vọng để tăng khả năng được nhận',
      },
      {
        step: 5,
        title: 'Hiểu đúng miễn học phí và chi phí còn lại',
        description: 'Dù chế độ miễn học phí cho trẻ 3-5 tuổi đã áp dụng từ lâu, phụ huynh vẫn thường bất ngờ vì còn nhiều khoản phát sinh. Hãy hỏi thẳng trường hoặc city hall về tiền ăn, đồng phục, xe, giờ kéo dài, đồ dùng và phí sự kiện.',
        documents: [
          'Bảng chi phí của trường',
          'Thông tin hỗ trợ miễn giảm của địa phương',
          'Giấy công nhận 保育の必要性 nếu áp dụng',
        ],
        tip: 'Đây là chỗ rất nên hỏi bằng văn bản hoặc email để tránh hiểu sai sau khi nhập học.',
      },
      {
        step: 6,
        title: 'Theo dõi thay đổi năm tài khóa 2026',
        description: 'Từ năm tài khóa 2026, `こども誰でも通園制度` được triển khai trên toàn quốc như một chế độ mới cho mọi gia đình với số giờ giới hạn, không phụ thuộc điều kiện đi làm. Đây là hướng hỗ trợ linh hoạt nhưng không thay thế nhu cầu gửi trẻ dài hạn kiểu hoikuen.',
        documents: [
          'Thông báo của city hall về chế độ mới',
          'Điều kiện số giờ, cách đặt chỗ và loại cơ sở tham gia tại địa phương',
        ],
        tip: 'Nếu gia đình chưa cần gửi trẻ cả ngày nhưng muốn con có chỗ sinh hoạt định kỳ, đây là điểm mới của 2026 rất đáng theo dõi.',
      },
    ],
  };

export default nurseryKindergartenGuide;
