import type { ContentMetadata, DailyLifeTopic } from '../../types/content';

export const DAILY_LIFE_CONTENT_META: ContentMetadata = {
  lastUpdated: '2026-04-11',
  sources: [
    { label: '総務省', url: 'https://www.soumu.go.jp/' },
    { label: '国民生活センター', url: 'https://www.kokusen.go.jp/' },
    { label: '厚生労働省', url: 'https://www.mhlw.go.jp/' },
    { label: '国土交通省', url: 'https://www.mlit.go.jp/' },
    { label: '消防庁', url: 'https://www.fdma.go.jp/' },
    { label: '日本郵便', url: 'https://www.post.japanpost.jp/' },
  ],
};

export const DAILY_LIFE_TOPICS: DailyLifeTopic[] = [
  {
    id: 'apartment',
    title: 'Thuê nhà / Căn hộ',
    titleJp: '賃貸住宅',
    icon: 'home',
    color: '#185FA5',
    description: 'Tiền vào nhà, giấy tờ, nhận nhà và lỗi dễ mất tiền khi trả nhà.',
    prefilledQuestion:
      'Tôi muốn hỏi thêm về thuê nhà ở Nhật. Hãy tư vấn rõ quy trình, phí ban đầu, giấy tờ và các lỗi thường gặp khi trả nhà.',
    sections: [
      {
        title: 'Vào nhà mới phải chuẩn bị gì',
        content:
          'Người mới sang Nhật thường chỉ nhìn tiền thuê mỗi tháng, nhưng khoản phải trả lúc ký hợp đồng mới là phần nặng nhất.',
        items: [
          'Thường phải chuẩn bị khoảng 4-6 tháng tiền thuê cho đợt đầu: tiền nhà tháng đầu, tiền đặt cọc, tiền lễ, phí môi giới, bảo lãnh, bảo hiểm, thay khóa.',
          'Nếu nhà ghi 敷金・礼金ゼロ thì tổng chi phí đầu vào nhẹ hơn nhiều, nhưng vẫn phải đọc kỹ phí bảo lãnh và phí vệ sinh.',
          'Nhà có internet miễn phí, có nội thất sẵn hoặc không cần guarantor thường hợp với người mới đến hơn là nhà rẻ nhưng thủ tục khó.',
        ],
        tip: 'Đừng chốt nhà chỉ vì tiền thuê thấp. Phải nhìn cả tổng tiền vào nhà và điều kiện hủy hợp đồng.',
      },
      {
        title: 'Hồ sơ bên môi giới và chủ nhà hay hỏi',
        content:
          'Không có một bộ hồ sơ cố định cho mọi nơi, nhưng có vài giấy gần như lúc nào cũng bị hỏi.',
        items: [
          'Thẻ cư trú, hộ chiếu, số điện thoại đang dùng được tại Nhật.',
          'Giấy chứng minh thu nhập hoặc giấy xác nhận việc làm. Nếu mới đi làm, công ty có thể phải xác nhận hộ.',
          '住民票, con dấu nếu nơi đó còn yêu cầu, và thông tin người liên hệ khẩn cấp.',
          'Nếu không có người bảo lãnh cá nhân, đa số sẽ dùng 保証会社 và trả phí riêng.',
        ],
        tip: 'Nếu bạn còn đang ở dạng thử việc hoặc mới sang, nên nói thẳng từ đầu để môi giới lọc đúng nhóm nhà có khả năng xét đậu.',
      },
      {
        title: 'Ngày nhận nhà phải làm ngay',
        content:
          'Đây là bước nhiều người bỏ qua nhất, nhưng lại quyết định chuyện bị trừ tiền khi trả nhà.',
        items: [
          'Chụp ảnh toàn bộ tường, sàn, trần, cửa, bếp, nhà tắm ngay ngày đầu, nhất là chỗ đã trầy, mốc hoặc nứt.',
          'Kiểm tra điều hòa, bếp, nước nóng, chuông cửa, khóa và hộp thư có hoạt động không.',
          'Tìm sẵn chỗ đổ rác, lịch rác, số điện thoại quản lý tòa nhà hoặc công ty quản lý.',
          'Giữ email, biên bản bàn giao và ảnh trong cùng một thư mục để sau này đối chiếu.',
        ],
        tip: 'Nếu thấy hỏng hóc ngay lúc vào, báo bằng tin nhắn hoặc email để có dấu thời gian. Gọi điện xong mà không có bằng chứng thì rất yếu.',
      },
      {
        title: 'Những lỗi khiến người thuê mất tiền',
        content:
          'Phần lớn rắc rối không đến từ luật quá khó, mà đến từ việc không đọc hợp đồng và không giữ bằng chứng.',
        items: [
          'Thông báo hủy hợp đồng quá muộn so với điều khoản báo trước 1 tháng hoặc 2 tháng.',
          'Tự khoan, dán keo mạnh, sơn lại, nuôi thú cưng hoặc cho người khác ở cùng khi hợp đồng không cho phép.',
          'Không chụp hiện trạng lúc vào nhà nên đến lúc trả nhà không chứng minh được vết đó có từ trước.',
          'Không phân loại rác đúng quy định khiến hàng xóm hoặc ban quản lý phản ánh.',
        ],
        tip: 'Phần tranh chấp trả nhà nên đối chiếu theo hướng dẫn 原状回復 của MLIT, không chỉ nghe một phía từ quản lý.',
      },
    ],
  },
  {
    id: 'trash',
    title: 'Phân loại rác',
    titleJp: 'ゴミの分別',
    icon: 'trash',
    color: '#27AE60',
    description: 'Cách đọc lịch rác, bỏ đúng ngày và xử lý đồ cồng kềnh.',
    prefilledQuestion:
      'Tôi muốn hỏi thêm về phân loại rác ở Nhật. Hãy giải thích rõ theo kiểu dễ làm theo và cho tôi biết cần hỏi gì ở khu tôi đang ở.',
    sections: [
      {
        title: 'Việc đầu tiên sau khi chuyển đến',
        content:
          'Mỗi quận, thành phố và thậm chí từng khu nhà có thể khác nhau về ngày gom rác và loại túi phải dùng.',
        items: [
          'Xin hoặc tải ゴミカレンダー của địa phương thay vì đoán theo hàng xóm.',
          'Xác định chính xác điểm tập kết rác của tòa nhà và giờ được phép mang rác ra.',
          'Hỏi luôn chủ nhà hoặc quản lý xem khu đó có bắt buộc túi rác chỉ định hay không.',
        ],
        tip: 'Không nên bê nguyên thói quen ở Việt Nam sang. Bỏ sai loại hoặc sai giờ rất dễ bị dán giấy nhắc ngay.',
      },
      {
        title: '4 nhóm rác cần phân biệt',
        content:
          'Tên gọi có thể hơi khác giữa các địa phương, nhưng logic chung khá giống nhau.',
        items: [
          '燃えるゴミ: thức ăn thừa, giấy bẩn, khăn giấy, đồ vải nhỏ, rác sinh hoạt đốt được.',
          '燃えないゴミ: gốm sứ, kính vỡ, kim loại nhỏ, đồ vật không đốt được.',
          '資源ゴミ: chai PET, lon, chai thủy tinh, báo, giấy bìa, hộp giấy sạch.',
          '粗大ゴミ: đồ to như bàn, ghế, nệm, vali lớn, kệ, xe đạp cũ. Không được tự ý bỏ chung rác thường.',
        ],
        tip: 'Pin, bình xịt, bật lửa, đồ điện nhỏ thường có quy định riêng. Đây là nhóm dễ bị bỏ sai nhất.',
      },
      {
        title: 'Những chi tiết dễ bị nhắc nhở',
        content:
          'Nhiều người biết phải phân loại, nhưng vẫn bị trả rác lại vì bỏ thiếu một bước nhỏ.',
        items: [
          'Chai PET thường phải tháo nắp và nhãn trước khi bỏ.',
          'Lon, chai, hộp thực phẩm nên đổ sạch phần còn lại và tráng sơ.',
          'Báo, bìa carton thường phải gấp gọn và buộc dây.',
          'Không nên mang rác ra từ tối hôm trước nếu khu bạn không cho phép.',
        ],
        tip: 'Nếu túi rác bị để lại, hãy kiểm tra xem họ dán giấy nhắc gì. Đó thường là cách nhanh nhất để biết mình sai ở đâu.',
      },
      {
        title: 'Khi cần bỏ đồ to',
        content:
          '粗大ゴミ là phần khiến người mới ở Nhật dễ bối rối nhất vì phải đặt lịch và trả phí trước.',
        items: [
          'Đăng ký qua điện thoại hoặc web của thành phố để lấy ngày thu gom.',
          'Mua tem xử lý 粗大ごみ処理券 ở combini hoặc điểm bán được chỉ định.',
          'Dán tem đúng chỗ, ghi tên nếu nơi đó yêu cầu, rồi mang đồ ra đúng thời điểm đã hẹn.',
          'Một số đồ điện như TV, tủ lạnh, máy giặt có quy trình riêng theo luật tái chế gia dụng, không đi theo luồng sodai gomi thông thường.',
        ],
        tip: 'Nếu đồ còn dùng được, hãy kiểm tra nhóm cho tặng, recycle shop hoặc dịch vụ thu mua trước khi trả tiền vứt đi.',
      },
    ],
  },
  {
    id: 'transportation',
    title: 'Giao thông / Suica & Pasmo',
    titleJp: '交通・Suica/Pasmo',
    icon: 'train',
    color: '#E74C3C',
    description: 'Đi tàu, đi xe buýt, xe đạp và các lỗi dễ bị phạt.',
    prefilledQuestion:
      'Tôi muốn hỏi thêm về giao thông ở Nhật. Hãy giải thích rõ cách đi tàu, dùng thẻ IC và các lưu ý khi đi xe đạp.',
    sections: [
      {
        title: 'Đi tàu cho người mới',
        content:
          'Giao thông công cộng ở Nhật nhìn rối lúc đầu, nhưng chỉ cần nắm vài quy tắc cơ bản là đi được.',
        items: [
          'Dùng Suica hoặc Pasmo sẽ tiện hơn mua vé giấy từng chặng.',
          'Khi vào và ra ga đều phải chạm thẻ hoặc điện thoại đúng một lượt. Quên check-out có thể làm thẻ lỗi.',
          'Nếu đi sai ga hoặc thiếu tiền, xử lý ở máy 精算機 trước khi ra cổng.',
          'Ứng dụng tra tuyến như Google Maps hoặc Yahoo!乗換案内 giúp xem cả giờ tàu, số sân ga và tiền vé.',
        ],
        tip: 'Nếu mới đến, hãy chụp màn hình lộ trình trước khi xuống ga. Trong ga lớn, lúc mất mạng vẫn còn cái để nhìn.',
      },
      {
        title: 'Suica, Pasmo và nạp tiền',
        content:
          'Thẻ IC hiện không chỉ dùng cho tàu mà còn cho xe buýt, cửa hàng tiện lợi và nhiều máy bán hàng.',
        items: [
          'Có thể dùng thẻ vật lý hoặc thêm vào Apple Wallet, Google Wallet nếu máy hỗ trợ.',
          'Nạp tiền ở máy trong ga, một số ATM và nhiều combini.',
          'Thẻ vật lý thường có tiền cọc, còn thẻ điện thoại thì linh hoạt hơn nếu bạn dùng máy tương thích.',
        ],
        tip: 'Nếu bạn di chuyển hằng ngày theo một tuyến cố định, hãy kiểm tra 定期券 để giảm chi phí đi làm hoặc đi học.',
      },
      {
        title: 'Đi xe đạp mà không bị rắc rối',
        content:
          'Xe đạp là phương tiện cực tiện, nhưng luật và việc xử phạt đang bị siết dần.',
        items: [
          'Nên đăng ký 防犯登録 khi mua xe để chứng minh xe hợp pháp nếu bị kiểm tra.',
          'Không đỗ bừa ngoài ga hoặc trước cửa hàng. Xe có thể bị kéo đi và phải trả phí để lấy lại.',
          'Ban đêm phải bật đèn, không chở hai người nếu xe không được phép, không vừa đạp vừa dùng điện thoại.',
          'Luật xe đạp giai đoạn 2026 được siết mạnh hơn. Với thay đổi mới, hãy xem thêm guide luật xe đạp trong tab Thủ tục.',
        ],
        tip: 'Nếu bạn đi làm bằng xe đạp mỗi ngày, nên kiểm tra luôn bảo hiểm trách nhiệm dân sự xe đạp của địa phương hoặc hợp đồng cá nhân.',
      },
    ],
  },
  {
    id: 'grocery',
    title: 'Mua sắm thực phẩm',
    titleJp: '食料品の買い物',
    icon: 'basket',
    color: '#F39C12',
    description: 'Siêu thị nào rẻ, giờ giảm giá và cách đọc hạn dùng.',
    prefilledQuestion:
      'Tôi muốn hỏi thêm về mua thực phẩm ở Nhật. Hãy tư vấn theo hướng tiết kiệm, dễ mua đồ Việt và tránh mua nhầm.',
    sections: [
      {
        title: 'Nên mua ở đâu cho hợp túi tiền',
        content:
          'Không phải chỗ nào tiện nhất cũng là chỗ đáng mua nhất nếu bạn sống lâu dài.',
        items: [
          'Siêu thị thường rẻ hơn combini khá nhiều nếu mua đồ ăn mỗi ngày.',
          '業務スーパー hợp khi bạn nấu ăn ở nhà và muốn mua số lượng lớn hoặc đồ đông lạnh.',
          'AEON, Life, Seiyu, OK, Maruetsu mỗi chuỗi có thế mạnh khác nhau, nên so giá ở khu bạn sống thay vì tin mẹo chung trên mạng.',
        ],
        tip: 'Nếu chỉ cần vài món gấp, combini rất tiện. Nhưng mua theo tuần ở combini sẽ đội chi phí lên rõ.',
      },
      {
        title: 'Mẹo tiết kiệm mà vẫn dễ ăn',
        content:
          'Cách tiết kiệm hiệu quả nhất ở Nhật thường không phải săn sale cực đoan, mà là đi đúng giờ và hiểu nhãn.',
        items: [
          'Cuối chiều hoặc tối muộn thường có nhãn giảm giá cho cơm hộp, sushi, đồ chín, thịt cá trong ngày.',
          'Mua rau theo mùa thường rẻ hơn và ngon hơn hàng trái mùa.',
          'Đồ đông lạnh, mì, gạo, gia vị cơ bản nên mua theo đợt thay vì mua lẻ hàng ngày.',
        ],
        tip: 'Khi thấy nhãn giảm giá, vẫn phải xem hạn và tình trạng món ăn. Rẻ nhưng không dùng kịp thì vẫn là lỗ.',
      },
      {
        title: 'Đọc nhãn để không mua nhầm',
        content:
          'Hai từ nhiều người Việt hay nhầm nhất là 賞味期限 và 消費期限.',
        items: [
          '賞味期限 là thời điểm ngon nhất hoặc chất lượng tốt nhất, thường áp dụng cho đồ đóng gói.',
          '消費期限 là hạn an toàn để dùng, thường áp dụng cho đồ tươi hoặc đồ mau hỏng.',
          '原材料名 là thành phần, còn アレルギー là thông tin dị ứng.',
          'Nếu ăn chay, dị ứng hoặc kiêng thịt heo, phải đọc kỹ thành phần chứ đừng chỉ nhìn hình trên bao bì.',
        ],
        tip: 'Google Translate dùng camera đủ tốt để đọc nhanh nhãn hàng khi bạn chưa quen chữ Nhật.',
      },
      {
        title: 'Mua đồ Việt ở đâu',
        content:
          'Thực phẩm Việt tại Nhật giờ dễ mua hơn trước, nhưng giá và chất lượng chênh nhau khá mạnh.',
        items: [
          'Tìm trên Google Maps với từ khóa ベトナム食材 hoặc アジア食材 để thấy cửa hàng gần nhà.',
          'Khu đông người châu Á như Shin-Okubo, Ikebukuro, Tsuruhashi thường có lựa chọn nhiều hơn.',
          'Một số siêu thị lớn và Don Quijote đã có khu gia vị và thực phẩm Đông Nam Á.',
        ],
        tip: 'Đồ khô, gia vị và đồ đóng gói có thể đặt online nếu khu bạn ở ít cửa hàng châu Á.',
      },
    ],
  },
  {
    id: 'banking',
    title: 'ATM / Chuyển tiền hằng ngày',
    titleJp: 'ATM・日常の送金',
    icon: 'cash',
    color: '#9B59B6',
    description: 'Rút tiền, chuyển khoản, combini ATM và những lỗi dễ bị chặn.',
    prefilledQuestion:
      'Tôi muốn hỏi thêm về ATM, chuyển khoản và dùng tài khoản ngân hàng hằng ngày ở Nhật. Hãy giải thích theo kiểu thực tế.',
    sections: [
      {
        title: 'Dùng tài khoản hằng ngày thế nào cho ổn',
        content:
          'Phần lớn sinh hoạt ở Nhật sẽ gắn với tài khoản ngân hàng: lương, tiền nhà, điện nước, điện thoại.',
        items: [
          'Nên biết rõ tài khoản của mình thuộc ngân hàng nào, app nào dùng để kiểm tra số dư và chuyển tiền.',
          'Nhiều loại hóa đơn có thể cài 口座振替 để tự trừ tiền, tránh quên hạn.',
          'Combini ATM rất tiện nhưng có thể có phí ngoài giờ hoặc khác hệ thống.',
        ],
        tip: 'Nếu vừa mới mở tài khoản, hãy thử đăng nhập app và rút một khoản nhỏ sớm để chắc chắn mọi thứ hoạt động bình thường.',
      },
      {
        title: 'Chuyển khoản trong Nhật',
        content:
          'Chuyển khoản nội địa ở Nhật thường dùng furikomi và cần điền đúng thông tin người nhận.',
        items: [
          'Bạn thường cần tên ngân hàng, mã chi nhánh, loại tài khoản và số tài khoản.',
          'Tên người nhận có thể phải nhập đúng dạng kana ở một số hệ thống.',
          'Chuyển sai tài khoản hoặc sai tên không phải lúc nào cũng lấy lại ngay được.',
        ],
        tip: 'Lần đầu chuyển tiền cho chủ nhà, trường hoặc công ty dịch vụ, nên xin lại ảnh chụp hoặc tin nhắn gốc có thông tin nhận tiền thay vì gõ tay theo trí nhớ.',
      },
      {
        title: 'Điều tuyệt đối không nên làm',
        content:
          'Phần này không chỉ là mẹo sinh hoạt, mà liên quan trực tiếp đến chống gian lận và khóa tài khoản.',
        items: [
          'Không cho người khác mượn tài khoản, thẻ ATM, app ngân hàng hoặc mã OTP.',
          'Không nhận chuyển tiền hộ nếu bạn không hiểu rõ giao dịch đó là gì.',
          'Không đăng bán hay chuyển nhượng tài khoản dù bạn sắp về nước.',
        ],
        tip: 'Nếu cần phần chi tiết về anti-fraud, chuyển tiền quốc tế và khóa tài khoản, hãy xem guide ngân hàng trong tab Thủ tục.',
      },
    ],
  },
  {
    id: 'hospital',
    title: 'Khám bệnh / Bệnh viện',
    titleJp: '病院・医療',
    icon: 'medical',
    color: '#E74C3C',
    description: 'Đi khám đúng nơi, chuẩn bị đúng giấy và giảm bớt chi phí phát sinh.',
    prefilledQuestion:
      'Tôi muốn hỏi thêm về đi khám ở Nhật. Hãy giải thích rõ nên đi clinic hay bệnh viện lớn và cần mang gì.',
    sections: [
      {
        title: 'Khi nào đi clinic, khi nào đi bệnh viện lớn',
        content:
          'Người mới ở Nhật hay nghĩ bệnh viện lớn là tốt hơn, nhưng đi sai nơi thường tốn thời gian và tiền hơn.',
        items: [
          'Với cảm sốt, ho, đau bụng, da liễu, đau mắt, đau răng thông thường, nên bắt đầu từ clinic hoặc phòng khám chuyên khoa gần nhà.',
          'Bệnh viện lớn thường phù hợp khi có giấy giới thiệu, cần kiểm tra chuyên sâu hoặc tình trạng nặng.',
          'Đi thẳng bệnh viện lớn mà không có giấy giới thiệu có thể bị tính thêm phí ban đầu.',
        ],
        tip: 'Nếu đang phân vân, hãy gọi trước để hỏi họ có nhận ca của bạn không và có cần đặt lịch không.',
      },
      {
        title: 'Đi khám cần mang gì',
        content:
          'Thiếu giấy tờ đúng lúc đi khám là lý do rất phổ biến khiến thủ tục kéo dài hoặc phải trả phí cao hơn.',
        items: [
          'Thẻ bảo hiểm y tế hoặc My Number card đã liên kết bảo hiểm.',
          'Thẻ cư trú hoặc giấy tờ nhận dạng cơ bản nếu nơi đó yêu cầu xác minh thêm.',
          'Danh sách thuốc đang dùng, ảnh toa thuốc cũ hoặc giấy giới thiệu nếu có.',
          'Tiền mặt hoặc thẻ, vì không phải cơ sở nào cũng nhận mọi phương thức thanh toán.',
        ],
        tip: 'Nếu bạn chưa có bảo hiểm hợp lệ, phải xử lý phần đó càng sớm càng tốt. Ở Nhật, đi khám không có bảo hiểm rất tốn.',
      },
      {
        title: 'Chi phí và các hỗ trợ cần biết',
        content:
          'Khi đã tham gia bảo hiểm đúng cách, phần lớn chi phí khám thường không đến mức quá nặng, nhưng vẫn phải hiểu vài điểm chính.',
        items: [
          'Thông thường người lớn tự trả 30% chi phí điều trị thuộc phạm vi bảo hiểm.',
          'Thuốc kê đơn cũng thường được áp mức đồng chi trả theo bảo hiểm.',
          'Nếu điều trị nặng hoặc hóa đơn cao, có cơ chế hỗ trợ như 高額療養費 để giảm gánh nặng.',
          'Trường hợp khẩn cấp gọi 119. Xe cứu thương ở Nhật không thu phí như nhiều người vẫn sợ.',
        ],
        tip: 'Muốn tìm nơi có hỗ trợ ngoại ngữ, hãy tra 外国語対応 hoặc hỏi đường dây hỗ trợ y tế địa phương.',
      },
    ],
  },
  {
    id: 'tax',
    title: 'Giấy tờ thuế và lương hay gặp',
    titleJp: '税金・給与の書類',
    icon: 'receipt',
    color: '#D35400',
    description: 'Hiểu các giấy công ty đưa cuối năm và lúc đổi việc.',
    prefilledQuestion:
      'Tôi muốn hỏi thêm về giấy tờ thuế và lương ở Nhật. Hãy giải thích theo kiểu dễ hiểu cho người đi làm.',
    sections: [
      {
        title: '3 loại giấy người đi làm hay gặp',
        content:
          'Nhiều người thấy giấy tiếng Nhật là bỏ qua, đến khi cần làm thủ tục mới không biết giấy nào dùng để làm gì.',
        items: [
          '給与明細: phiếu lương hàng tháng, dùng để xem lương gộp, khấu trừ và lương thực nhận.',
          '源泉徴収票: giấy tổng hợp thu nhập và thuế công ty đã khấu trừ, thường nhận vào đầu năm sau.',
          '住民税の通知: giấy báo thuế cư dân, có thể công ty khấu trừ hộ hoặc bạn tự nộp.',
        ],
        tip: 'Nên giữ ảnh hoặc file scan của từng loại giấy này. Đổi việc hoặc làm hồ sơ tài chính rất hay cần lại.',
      },
      {
        title: 'Khi nào cần để ý kỹ',
        content:
          'Phần lớn người đi làm toàn thời gian không phải tự mò luật thuế mỗi ngày, nhưng có vài lúc buộc phải hiểu giấy tờ.',
        items: [
          'Khi đổi việc giữa năm hoặc nghỉ việc trước cuối năm.',
          'Khi lương thực nhận thấp bất thường và cần kiểm tra khoản khấu trừ.',
          'Khi cần làm thủ tục nhà ở, bảo lãnh, ngân hàng hoặc gia hạn visa và bị hỏi giấy thu nhập.',
        ],
        tip: 'Nếu muốn phần chi tiết về 年末調整, 確定申告 và 扶養, hãy xem guide thuế trong tab Thủ tục.',
      },
      {
        title: 'Lỗi hay gặp',
        content:
          'Sai ở đây không phải lúc nào cũng thành vi phạm lớn, nhưng dễ gây mất tiền hoặc chậm thủ tục.',
        items: [
          'Vứt phiếu lương và source document vì nghĩ không cần dùng lại.',
          'Không kiểm tra khoản trừ bảo hiểm, thuế cư dân hoặc làm thêm có được tính đúng không.',
          'Nghỉ việc nhưng không hỏi rõ phần giấy thu nhập sẽ nhận khi nào và nhận bằng cách nào.',
        ],
        tip: 'Nếu bạn thấy công ty giữ giấy quá lâu hoặc giải thích khấu trừ mơ hồ, nên yêu cầu họ giải thích bằng văn bản.',
      },
    ],
  },
  {
    id: 'utilities',
    title: 'Điện, nước, gas, internet',
    titleJp: '電気・水道・ガス・ネット',
    icon: 'flash',
    color: '#F39C12',
    description: 'Mở dịch vụ lúc chuyển nhà, cách tránh bị cắt và ước lượng tiền hàng tháng.',
    prefilledQuestion:
      'Tôi muốn hỏi thêm về điện, nước, gas và internet ở Nhật. Hãy tư vấn theo kiểu người mới chuyển nhà.',
    sections: [
      {
        title: 'Chuyển vào nhà mới phải mở gì trước',
        content:
          'Không phải dịch vụ nào cũng tự có sẵn. Gas là phần dễ bị quên nhất vì phải hẹn nhân viên đến mở.',
        items: [
          'Điện và nước nhiều nơi có thể đăng ký online khá nhanh nếu bạn biết mã khách hàng hoặc địa chỉ chính xác.',
          'Gas thường phải có nhân viên tới kiểm tra và mở van, nên nên đặt lịch sớm.',
          'Internet cáp quang có thể cần chờ lắp khá lâu, nhất là ở chung cư cũ hoặc mùa cao điểm chuyển nhà.',
        ],
        tip: 'Nếu mới dọn vào mà chưa có mạng, nên chuẩn bị sẵn phương án tạm như SIM data hoặc home router.',
      },
      {
        title: 'Thanh toán để khỏi bị ngắt dịch vụ',
        content:
          'Nhiều người mới sang quên mở thư hoặc bỏ sót hạn thanh toán, dẫn tới bị nhắc hoặc ngắt dịch vụ.',
        items: [
          'Ưu tiên cài trích tiền tự động từ tài khoản nếu bạn định ở lâu.',
          'Nếu nhận hóa đơn giấy, phải đọc kỹ hạn nộp và nơi nộp được ghi trên bill.',
          'Một số dịch vụ cho thanh toán ở combini, nhưng không nên để thành thói quen nếu bạn hay bận.',
        ],
        tip: 'Gas và điện bị ngắt sẽ ảnh hưởng lớn hơn bạn nghĩ, nhất là vào mùa đông. Cần tránh quên hạn ngay từ đầu.',
      },
      {
        title: 'Mức tiền tham khảo',
        content:
          'Chi phí thực tế tùy khu vực, mùa và kiểu nhà, nhưng có thể dùng khung này để dự trù.',
        items: [
          'Điện cho 1 người thường tăng mạnh vào mùa hè và mùa đông do điều hòa, sưởi.',
          'Nước thường không quá cao nhưng có nơi thu 2 tháng một lần nên hóa đơn nhìn sẽ lớn hơn tưởng tượng.',
          'Gas tăng rõ nếu bạn dùng nước nóng và nấu ăn hằng ngày.',
          'Internet cáp quang ổn định hơn home router, nhưng lắp chậm hơn và thường có hợp đồng dài hơn.',
        ],
        tip: 'Khi tìm nhà, câu “internet miễn phí” nghe hấp dẫn nhưng vẫn nên hỏi tốc độ thực tế và có giới hạn gì không.',
      },
    ],
  },
  {
    id: 'earthquake',
    title: 'Động đất & Thảm họa',
    titleJp: '地震・災害対策',
    icon: 'warning',
    color: '#C0392B',
    description: 'Ứng phó động đất, sơ tán và chuẩn bị túi khẩn cấp.',
    prefilledQuestion:
      'Tôi muốn hỏi thêm về động đất và thảm họa ở Nhật. Hãy hướng dẫn tôi chuẩn bị thực tế cho nơi tôi đang ở.',
    sections: [
      {
        title: 'Khi động đất đang rung',
        content:
          'Phản xạ đầu tiên quan trọng hơn việc cố nhớ quá nhiều lý thuyết.',
        items: [
          'Trong nhà: bảo vệ đầu, chui xuống bàn chắc chắn nếu có, tránh xa kính và đồ cao dễ đổ.',
          'Không lao ra cầu thang hay thang máy lúc đang rung mạnh.',
          'Nếu đang nấu ăn, chỉ tắt bếp khi thật sự an toàn.',
          'Ngoài đường: tránh xa biển hiệu, tường cũ, cột điện và cửa kính.',
        ],
        tip: 'Sau rung chính thường còn dư chấn. Đừng chủ quan quay lại chỗ nguy hiểm quá sớm.',
      },
      {
        title: 'Những thứ nên chuẩn bị trước',
        content:
          'Chuẩn bị thảm họa ở Nhật không phải chuyện bi quan, mà là chuẩn sinh hoạt cơ bản.',
        items: [
          'Biết chính xác điểm sơ tán gần nhà và gần chỗ làm.',
          'Chuẩn bị nước, đồ ăn khô, đèn pin, pin sạc, thuốc thường dùng và bản sao giấy tờ quan trọng.',
          'Cài app cảnh báo thiên tai hoặc theo dõi kênh cảnh báo của địa phương.',
          'Thống nhất với người thân cách liên lạc nếu mạng điện thoại bị nghẽn.',
        ],
        tip: 'Ít nhất nên có đồ đủ cho 2-3 ngày đầu. Đây là giai đoạn dễ thiếu nhất nếu hạ tầng bị gián đoạn.',
      },
      {
        title: 'Khi nào phải sơ tán',
        content:
          'Không phải động đất nào cũng cần chạy đi ngay, nhưng phải biết nghe nguồn nào.',
        items: [
          'Theo dõi thông báo của thành phố, đài chính thức hoặc loa hướng dẫn địa phương.',
          'Nếu có nguy cơ cháy, sóng thần, sạt lở hoặc nhà ở không còn an toàn, phải di chuyển theo hướng dẫn.',
          'Luôn mang theo giấy tờ thiết yếu, thuốc cá nhân, điện thoại và pin dự phòng nếu có thời gian.',
        ],
        tip: 'Đừng chỉ tin vào tin nhắn lan truyền trên mạng xã hội. Ưu tiên nguồn chính thức của chính quyền và cơ quan khí tượng.',
      },
    ],
  },
  {
    id: 'post-office',
    title: 'Bưu điện & Giao hàng',
    titleJp: '郵便局・宅配便',
    icon: 'mail',
    color: '#2980B9',
    description: 'Nhận hàng khi vắng nhà, gửi đồ và dùng bưu cục đúng cách.',
    prefilledQuestion:
      'Tôi muốn hỏi thêm về bưu điện và giao hàng ở Nhật. Hãy giải thích rõ cách nhận, gửi và xử lý phiếu vắng nhà.',
    sections: [
      {
        title: 'Khi shipper đến mà bạn không có nhà',
        content:
          'Phiếu 不在票 là chuyện rất bình thường ở Nhật, không phải có vấn đề gì nghiêm trọng.',
        items: [
          'Phiếu sẽ ghi công ty giao hàng, số liên hệ và cách đặt lại lịch.',
          'Bạn thường có thể chọn giao lại theo khung giờ hoặc đến bưu cục, depot lấy.',
          'Đừng để quá lâu vì mỗi hãng chỉ giữ hàng trong một khoảng nhất định.',
        ],
        tip: 'Nếu bạn thường xuyên đi làm vắng nhà, nên dùng app của hãng giao hàng hoặc chỉ định nơi nhận ổn định.',
      },
      {
        title: '3 hãng bạn sẽ gặp nhiều nhất',
        content:
          'Biết logo và tên hãng giúp bạn xử lý nhanh hơn khi nhận phiếu hoặc tra cứu đơn.',
        items: [
          'Yamato: rất phổ biến, dễ thấy qua logo mèo đen.',
          'Sagawa: nhiều shop online và doanh nghiệp dùng.',
          'Japan Post: gắn với bưu cục, hữu ích cả khi nhận thư bảo đảm và giấy tờ hành chính.',
        ],
        tip: 'Nếu bạn nhận nhiều thư quan trọng từ city hall, trường hoặc công ty, hãy theo dõi hộp thư mỗi ngày thay vì chỉ chờ shipper gọi.',
      },
      {
        title: 'Gửi đồ hoặc giấy tờ',
        content:
          'Bưu điện Nhật không chỉ để nhận hàng, mà còn rất hay dùng cho giấy tờ, chuyển phát bảo đảm và thủ tục hành chính.',
        items: [
          'Thư thường, thư bảo đảm, Letter Pack và Yu-Pack là các lựa chọn phổ biến.',
          'Gửi giấy tờ quan trọng nên hỏi loại có tracking hoặc ký nhận.',
          'Nếu gửi quốc tế, phải kiểm tra trước mặt hàng có bị hạn chế hay phải khai hải quan không.',
        ],
        tip: 'Khi gửi hồ sơ, luôn chụp lại phong bì, nội dung gửi và mã tracking nếu có.',
      },
    ],
  },
];
