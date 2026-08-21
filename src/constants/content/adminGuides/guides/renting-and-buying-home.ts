import type { AdminGuide } from '../../../../types/content';

const rentingAndBuyingHome: AdminGuide = {
    id: 'renting-and-buying-home',
    category: 'money',
    lastVerified: '2026-08-21',
    priority: 'high',
    title: 'Thuê nhà, trả nhà và mua nhà ở Nhật',
    titleJp: '賃貸住宅・退去費・住宅購入の基本',
    icon: 'home',
    color: '#2980B9',
    description: 'Guide thực tế về thuê nhà ở Nhật: tiền vào nhà, người bảo lãnh, hợp đồng, hủy hợp đồng,退去費, 原状回復, và phần mua nhà cho người nước ngoài với lưu ý cư trú.',
    heroImage: require('../../../../../assets/content/daily-life/ag_renting-home_hero.jpg'),
    heroImageCaption: 'Thuê nhà tại Nhật — hợp đồng, tiền cọc và trách nhiệm khi trả nhà',
    whoIsThisFor: [
      'Người đang tìm nhà thuê đầu tiên ở Nhật hoặc chuẩn bị chuyển nhà.',
      'Người bị báo退去費 cao, bị giữ tiền cọc hoặc bị ép trả phí sửa chữa khó hiểu.',
      'Người muốn mua nhà ở Nhật và đang nhầm giữa quyền sở hữu nhà với quyền cư trú/visa.',
    ],
    whenToDo: [
      'Trước khi ký hợp đồng thuê nhà hoặc trước khi đặt cọc.',
      'Ngay khi có ý định hủy hợp đồng, chuyển nhà hoặc chuẩn bị trả nhà.',
      'Trước khi quyết định mua nhà, đặc biệt nếu bạn nghĩ mua nhà sẽ giúp có visa hoặc định cư.',
    ],
    whereToDo: [
      'Công ty môi giới, công ty quản lý, chủ nhà: hồ sơ thuê, giải thích điều khoản, thông báo chấm dứt hợp đồng, bàn giao nhà.',
      'MLIT: tài liệu chuẩn về 原状回復, lưu ý nhập/ra nhà thuê và hợp đồng chuẩn.',
      'FRESC hoặc điểm tư vấn tiêu dùng/nhà ở của địa phương nếu có tranh chấp khó tự giải quyết.',
      'Pháp vụ/法務局 và đơn vị giao dịch bất động sản nếu đi tới bước mua nhà và đăng ký quyền sở hữu.',
    ],
    estimatedTime: 'Thuê nhà thường mất từ vài ngày đến vài tuần tùy kiểm tra hồ sơ, người bảo lãnh và lịch chuyển vào. Tranh chấp退去費 có thể kéo dài nếu không giữ đủ bằng chứng từ lúc nhận nhà tới lúc trả nhà. Mua nhà là một quy trình riêng, dài hơn nhiều và không nên gộp chung với câu chuyện visa.',
    fees: [
      'Khi vào nhà thuê thường có thể phát sinh: tiền đặt cọc (敷金), tiền lễ (礼金), phí môi giới, phí công ty bảo lãnh, tiền thuê trước, phí thay khóa, bảo hiểm cháy nổ và có nơi thêm phí vệ sinh hoặc hỗ trợ 24 giờ.',
      'MLIT nhấn mạnh phải đọc kỹ hợp đồng để biết phí khi vào nhà, khi gia hạn và khi trả nhà. Không có một “gói chuẩn” áp dụng cho mọi nơi.',
      '退去時, chi phí thuê nhà không chỉ là tiền cọc có lấy lại hay không; còn liên quan tới điều khoản hợp đồng, chứng cứ hiện trạng và nguyên tắc 原状回復.',
      'Nếu mua nhà, ngoài giá mua còn có thể có thuế, lệ phí, phí đăng ký, phí công chứng, phí vay ngân hàng, bảo hiểm và chi phí liên quan đến người môi giới/đơn vị tài chính.',
    ],
    documentsChecklist: [
      { label: 'Bản nháp hợp đồng thuê và 重要事項説明', required: true },
      { label: 'Danh sách toàn bộ chi phí khi vào nhà, gia hạn và trả nhà', required: true },
      { label: 'Ảnh/video hiện trạng nhà lúc nhận bàn giao', required: true, note: 'Đây là bằng chứng mạnh nhất nếu sau này bị tính phí sửa chữa vô lý.' },
      { label: 'Điều khoản báo trước khi hủy hợp đồng', required: true, note: 'Nhiều nhà yêu cầu báo trước 1 tháng hoặc lâu hơn.' },
      { label: 'Điều khoản về người bảo lãnh, công ty bảo lãnh và phí bảo lãnh', required: false },
      { label: 'Nếu mua nhà: giấy tờ nhân thân, địa chỉ, tài liệu ngân hàng và giấy tờ đăng ký quyền sở hữu', required: false },
    ],
    commonMistakes: [
      'Chỉ hỏi tiền thuê mỗi tháng mà bỏ qua toàn bộ chi phí vào nhà và chi phí gia hạn.',
      'Không chụp hiện trạng nhà lúc nhận chìa khóa, đến khi trả nhà mới tranh cãi bằng miệng.',
      'Nghĩ 原状回復 nghĩa là phải trả nhà “như mới 100%” bằng tiền của người thuê.',
      'Không đọc điều khoản báo trước khi hủy hợp đồng, dẫn tới phải trả thêm 1-2 tháng tiền nhà dù đã dọn đi.',
      'Tin rằng người nước ngoài không thể mua nhà ở Nhật hoặc ngược lại, tin rằng cứ mua nhà là tự có visa ở lại.',
      'Ký hợp đồng mà không hiểu vai trò của công ty bảo lãnh, guarantor và các phí lặp hàng năm.',
    ],
    faq: [
      {
        question: '原状回復 có nghĩa là tôi phải trả căn nhà về trạng thái mới tinh không?',
        answer: 'Không. MLIT nêu rất rõ 原状回復 không phải là đưa căn nhà về đúng trạng thái lúc mới thuê. Phần hao mòn tự nhiên và hao mòn do sử dụng bình thường về nguyên tắc được coi là nằm trong tiền thuê; người thuê chủ yếu chịu phần hư hại do cố ý, bất cẩn hoặc sử dụng vượt mức bình thường.',
      },
      {
        question: 'Tiền cọc có chắc chắn được trả lại hết không?',
        answer: 'Không. Việc hoàn lại敷金 phụ thuộc hợp đồng và việc đối trừ các khoản hợp lệ như tiền thuê chưa trả, phí sửa chữa thuộc trách nhiệm của người thuê hoặc các nghĩa vụ khác trong hợp đồng. Đó là lý do hợp đồng và bằng chứng hiện trạng rất quan trọng.',
      },
      {
        question: 'Nếu bị báo退去費 rất cao thì tôi làm gì trước?',
        answer: 'Đầu tiên so lại hợp đồng, ảnh/video lúc nhận nhà, ảnh lúc trả nhà và bảng tính chi tiết từng khoản. Sau đó đối chiếu với hướng dẫn 原状回復 của MLIT để xem khoản nào là hao mòn thông thường, khoản nào bị tính vượt. Đừng chỉ tranh luận chung chung bằng điện thoại.',
      },
      {
        question: 'Người nước ngoài có mua nhà ở Nhật được không?',
        answer: 'Về mặt đăng ký quyền sở hữu, MOJ có hướng dẫn riêng cho trường hợp người nước ngoài, kể cả người cư trú ở ngoài Nhật, trở thành chủ sở hữu đăng ký. Điều đó cho thấy giao dịch và đăng ký sở hữu là điều có thể xảy ra. Tuy nhiên quyền sở hữu nhà và quyền cư trú là hai vấn đề khác nhau.',
      },
      {
        question: 'Mua nhà có giúp có visa hoặc vĩnh trú không?',
        answer: 'Không nên hiểu như vậy. Quyền sở hữu bất động sản không tự động tạo ra tư cách lưu trú. Nếu bạn cần ở lại Nhật lâu dài, câu hỏi visa vẫn phải giải quyết theo hệ thống tư cách lưu trú riêng của ISA/MOFA.',
      },
    ],
    officialLinks: [
      { label: '賃貸住宅の入居・退去に係る留意点 — 国土交通省', url: 'https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000026.html' },
      { label: '原状回復をめぐるトラブルとガイドライン — 国土交通省', url: 'https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000020.html' },
      { label: '原状回復ガイドラインQ&A — 国土交通省', url: 'https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000024.html' },
      { label: '外国人の民間賃貸住宅への円滑な入居について — 国土交通省', url: 'https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000017.html' },
      { label: '不動産登記のABC — 法務省', url: 'https://www.moj.go.jp/MINJI/minji02' },
      { label: '外国居住の外国人や外国法人が所有権の登記名義人となる登記の申請 — 法務省', url: 'https://www.moj.go.jp/MINJI/minji05_00574.html' },
      { label: '令和6年4月1日以降にする所有権に関する登記の申請について — 法務省', url: 'https://www.moj.go.jp/MINJI/minji05_00589.html' },
      { label: '外国人在留支援センター（FRESC）— 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/support/fresc/fresc01.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Trước khi ký: đừng chỉ nhìn tiền thuê mỗi tháng',
        description: 'MLIT khuyến nghị phải xác nhận toàn bộ chi phí lúc vào nhà, lúc gia hạn và khi trả nhà trước khi ký. Nhiều gia đình nhìn thấy nhà 70,000 yên/tháng nhưng không tính đủ phí môi giới, phí bảo lãnh, tiền lễ, bảo hiểm, thay khóa và tiền nhà trả trước.',
        documents: [
          '重要事項説明',
          'Hợp đồng thuê nháp',
          'Bảng tổng chi phí ban đầu',
        ],
        tip: 'Nếu nhân viên không ghi hết chi phí bằng văn bản, hãy coi đó là dấu hiệu phải cẩn trọng hơn.',
      },
      {
        step: 2,
        title: 'Hiểu rõ guarantor và công ty bảo lãnh',
        description: 'Nhiều hợp đồng hiện nay dùng công ty bảo lãnh thay cho người bảo lãnh cá nhân. Điều quan trọng không chỉ là có hay không, mà là phí ban đầu, phí gia hạn, điều kiện thu hồi nợ và việc chậm trả tiền nhà sẽ ảnh hưởng thế nào.',
        documents: [
          'Điều khoản về 保証会社',
          'Phí lần đầu và phí tái tục',
          'Thông tin người liên hệ khẩn cấp nếu được yêu cầu',
        ],
        tip: 'Người liên hệ khẩn cấp không phải lúc nào cũng là người bảo lãnh pháp lý. Đừng nhầm hai vai trò này.',
      },
      {
        step: 3,
        title: 'Ngày nhận nhà: chụp hiện trạng ngay',
        description: 'Trước khi dọn đồ vào, hãy chụp toàn bộ sàn, tường, trần, bếp, nhà tắm, cửa, điều hòa, ban công và các vết cũ. Đây là thứ cứu bạn nhiều nhất khi tranh chấp退去費.',
        documents: [
          'Ảnh và video có ngày giờ',
          'Biên bản bàn giao nếu có',
          'Danh sách lỗi sẵn có gửi lại cho quản lý/chủ nhà',
        ],
        tip: 'Đừng chỉ chụp vết to. Những vết xước nhỏ, nấm mốc cũ, ngả màu giấy dán tường mới là thứ hay bị đổ cho người thuê sau cùng.',
        image: require('../../../../../assets/content/daily-life/ag_renting_s3.jpg'),
        imageCaption: 'Chụp ảnh toàn bộ hiện trạng phòng khi nhận nhà — bằng chứng chống tranh chấp 退去費',
      },
      {
        step: 4,
        title: 'Khi muốn chuyển đi: xem điều khoản báo trước và hủy hợp đồng',
        description: 'MLIT nhấn mạnh phải đọc kỹ thời điểm và điều kiện chấm dứt hợp đồng. Nhiều hợp đồng yêu cầu báo trước 1 tháng, có nơi 2 tháng, và nếu báo muộn có thể vẫn bị tính tiền nhà sau ngày đã dọn đi.',
        documents: [
          'Điều khoản解約予告',
          'Email hoặc văn bản báo chấm dứt hợp đồng',
          'Ngày dự kiến trả nhà và cắt điện/nước/gas/internet',
        ],
        tip: 'Gọi điện báo miệng là chưa đủ an toàn. Hãy giữ bằng chứng đã báo đúng hạn.',
      },
      {
        step: 5,
        title: '退去費 và 原状回復: đối chiếu bằng nguyên tắc chuẩn',
        description: 'Theo guideline của MLIT, hao mòn do thời gian và sử dụng bình thường về nguyên tắc thuộc phía cho thuê. Người thuê chủ yếu chịu phần do cố ý, bất cẩn hoặc sử dụng vượt mức bình thường. Khi nhận bảng退去費, hãy yêu cầu từng khoản cụ thể thay vì chấp nhận một cục số tổng.',
        documents: [
          'Bảng tính chi tiết退去費',
          'Ảnh lúc vào nhà và lúc trả nhà',
          'Điều khoản đặc biệt trong hợp đồng nếu có',
        ],
        tip: 'Điều khoản đặc biệt bất lợi cho người thuê không có nghĩa tự động luôn hợp lệ trong mọi tranh chấp. MLIT có Q&A riêng về vấn đề này.',
      },
      {
        step: 6,
        title: 'Nếu mua nhà: tách rõ sở hữu và cư trú',
        description: 'MOJ có hướng dẫn đăng ký quyền sở hữu cho người nước ngoài, kể cả người ở ngoài Nhật, và từ 01/04/2024 còn có quy định bổ sung về tên romaji, địa chỉ chứng minh và thông tin đăng ký. Nhưng cần nhớ: giao dịch bất động sản và đăng ký chủ sở hữu là chuyện tài sản; nó không tự tạo tư cách lưu trú để ở lại Nhật.',
        documents: [
          'Giấy tờ nhân thân và địa chỉ',
          'Tài liệu đăng ký sở hữu và giấy tờ chứng minh tên romaji nếu cần',
          'Tài liệu vay ngân hàng hoặc nguồn tiền nếu có mua bằng vốn vay',
        ],
        tip: 'Nếu ai đó bán cho bạn câu chuyện “mua nhà là có visa”, hãy coi đó là tín hiệu phải dừng lại và kiểm tra lại ngay.',
      },
    ],
  };

export default rentingAndBuyingHome;
