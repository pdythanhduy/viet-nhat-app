import type { ContentMetadata, DailyLifeTopic } from '../../types/content';

export const DAILY_LIFE_CONTENT_META: ContentMetadata = {
  lastUpdated: '2026-04-12',
  sources: [
    { label: 'Bộ Nội vụ và Truyền thông Nhật Bản', url: 'https://www.soumu.go.jp/' },
    { label: 'Trung tâm Bảo vệ Người tiêu dùng Quốc gia', url: 'https://www.kokusen.go.jp/' },
    { label: 'Bộ Y tế, Lao động và Phúc lợi', url: 'https://www.mhlw.go.jp/' },
    { label: 'Bộ Đất đai, Hạ tầng, Giao thông và Du lịch', url: 'https://www.mlit.go.jp/' },
    { label: 'Cơ quan Phòng cháy chữa cháy', url: 'https://www.fdma.go.jp/' },
    { label: 'Japan Post', url: 'https://www.post.japanpost.jp/' },
    { label: 'Japan Pension Service', url: 'https://www.nenkin.go.jp/' },
    { label: 'Japan Post Bank', url: 'https://www.jp-bank.japanpost.jp/' },
    { label: 'My Number Card tổng hợp', url: 'https://www.kojinbango-card.go.jp/' },
    { label: 'JR East', url: 'https://www.jreast.co.jp/' },
  ],
};

export const DAILY_LIFE_TOPICS: DailyLifeTopic[] = [
  {
    id: 'bank-account-remittance',
    title: 'Ngân hàng và chuyển tiền',
    titleJp: '銀行口座・送金',
    icon: 'card',
    color: '#185FA5',
    description: 'Mở tài khoản, chuẩn bị giấy tờ, hiểu kiểm tra danh tính và tránh lỗi dễ bị từ chối.',
    prefilledQuestion:
      'Hãy hướng dẫn tôi mở tài khoản ngân hàng ở Nhật và chuyển tiền về Việt Nam theo kiểu thực tế, dễ hiểu.',
    sections: [
      {
        title: 'Trước khi ra ngân hàng',
        content:
          'Mỗi ngân hàng có tiêu chí riêng, nhưng người mới sang thường bị hỏi khá giống nhau ở phần danh tính, địa chỉ và mục đích sử dụng.',
        items: [
          'Chuẩn bị thẻ cư trú, địa chỉ đang ở thực tế, số điện thoại có thể nhận liên lạc và thông tin công việc hoặc trường học nếu có.',
          'Nhiều nơi sẽ hỏi bạn mở tài khoản để làm gì: nhận lương, trả hóa đơn, sinh hoạt hằng ngày hay nhận học bổng.',
          'Nếu vừa mới sang Nhật và cư trú chưa lâu, có nơi sẽ yêu cầu thêm thời gian cư trú ổn định hoặc giấy tờ bổ sung. Đây không phải lúc nào cũng là từ chối vĩnh viễn.',
        ],
        tip: 'Đừng chỉ hỏi “mở được không”. Hãy hỏi thẳng còn thiếu giấy gì, cần quay lại lúc nào và hồ sơ nào dễ được nhận hơn.',
      },
      {
        title: 'Những thứ dễ làm hồ sơ bị chậm',
        content:
          'Ngân hàng Nhật phải kiểm tra本人確認 và các rủi ro tài chính nên hồ sơ thiếu nhất quán rất dễ bị hỏi lại.',
        items: [
          'Tên romaji trên giấy tờ không thống nhất giữa thẻ cư trú, trường, công ty và hợp đồng điện thoại.',
          'Địa chỉ đang ở khác với địa chỉ đang khai báo hoặc chưa cập nhật xong tại municipal office.',
          'Không giải thích rõ mục đích dùng tài khoản, đặc biệt khi hỏi về giao dịch quốc tế hoặc nhận tiền từ nhiều nguồn.',
        ],
        tip: 'Nếu bị yêu cầu quay lại, ghi lại chính xác tên giấy tờ cần bổ sung thay vì chỉ nhớ mang máng.',
      },
      {
        title: 'Chuyển tiền về Việt Nam',
        content:
          'Đừng chỉ nhìn phí chuyển tiền. Cần nhìn thêm tỷ giá, phí ngân hàng trung gian và thông tin người nhận phải khai thật chính xác.',
        items: [
          'Kiểm tra tên người nhận, số tài khoản, tên ngân hàng nhận và lý do chuyển tiền trước khi xác nhận.',
          'Nếu chuyển đều đặn cho gia đình, nên giữ lịch sử giao dịch và giải thích mục đích thống nhất.',
          'Không nhận chuyển tiền hộ hoặc cho người khác mượn tài khoản để nhận tiền. Đây là nhóm rủi ro lớn nhất.',
        ],
        tip: 'Nếu tài khoản bị hỏi lại về nguồn tiền, hãy chuẩn bị sẵn bảng lương, hợp đồng hoặc lịch sử giao dịch liên quan.',
      },
    ],
  },
  {
    id: 'sim-phone-internet',
    title: 'SIM, điện thoại và internet',
    titleJp: 'SIM・携帯電話・インターネット',
    icon: 'phone-portrait',
    color: '#2874A6',
    description: 'Chọn loại SIM phù hợp, hiểu điều kiện hợp đồng và tránh các phí hủy hoặc khóa dịch vụ ngoài ý muốn.',
    prefilledQuestion:
      'Hãy giải thích cho tôi cách làm SIM, chọn gói điện thoại và lắp internet ở Nhật theo kiểu thực tế cho người mới sang.',
    sections: [
      {
        title: 'Phân biệt thứ mình đang cần',
        content:
          'Người mới sang thường nhầm giữa data SIM, SIM có thoại, eSIM và internet cố định tại nhà. Mỗi loại phục vụ một nhu cầu khác nhau.',
        items: [
          'Nếu chỉ cần internet tạm thời, data SIM có thể đủ. Nếu cần đăng ký ngân hàng, công việc hoặc liên lạc ổn định, nhiều trường hợp nên ưu tiên SIM có số điện thoại.',
          'Internet cố định ở nhà không giống đăng ký SIM điện thoại. Có thể cần lịch hẹn kỹ thuật và thời gian chờ lắp đặt.',
          'Một số nhà mạng hoặc gói rẻ có điều kiện về thời gian hợp đồng, phí hủy hoặc giới hạn hỗ trợ tiếng Anh.',
        ],
        tip: 'Đừng ký ngay chỉ vì đang có khuyến mãi. Hãy hỏi rõ phí hàng tháng, phí hủy và giấy tờ cần mang.',
      },
      {
        title: 'Giấy tờ và kiểm tra danh tính',
        content:
          'Đăng ký SIM hoặc internet thường yêu cầu xác minh danh tính và địa chỉ. Đây là chỗ người mới bị vướng nhiều nhất.',
        items: [
          'Thẻ cư trú gần như là giấy tờ nền tảng. Một số nơi còn hỏi thêm thông tin tài khoản ngân hàng hoặc thẻ thanh toán.',
          'Nếu địa chỉ vừa đổi mà chưa cập nhật, hợp đồng có thể bị treo hoặc thư xác minh gửi không tới.',
          'Tên đăng ký nên thống nhất với các giấy tờ khác để đỡ rắc rối khi mở ngân hàng hoặc nhận hàng sau này.',
        ],
        tip: 'Sau khi ký xong, chụp lại toàn bộ hợp đồng, gói cước, mã khách hàng và cách hủy khi cần.',
      },
      {
        title: 'Khi mạng lỗi hoặc cần hủy',
        content:
          'Nhiều người chỉ đến khi mất mạng mới đi tìm hợp đồng. Lúc đó rất dễ mất thời gian vì không có mã khách hàng hoặc lịch sử hỗ trợ.',
        items: [
          'Giữ lại số hợp đồng, số điện thoại hỗ trợ, ngày bắt đầu sử dụng và ảnh màn hình gói cước.',
          'Nếu internet nhà bị lỗi, ghi rõ đèn modem hiện thế nào, có mất toàn bộ hay chỉ mất một phần, và lỗi bắt đầu từ lúc nào.',
          'Trước khi hủy hợp đồng, phải kiểm tra có phí hủy, phí trả modem hay lịch cắt dịch vụ nào không.',
        ],
        tip: 'Nên lưu sẵn câu tiếng Nhật để gọi tổng đài khi mất mạng hoặc cần đổi lịch lắp đặt.',
      },
    ],
  },
  {
    id: 'health-insurance',
    title: 'Bảo hiểm y tế ở Nhật',
    titleJp: '健康保険・国民健康保険',
    icon: 'medkit',
    color: '#C0392B',
    description: 'Hiểu bạn đang ở diện bảo hiểm nào, đăng ký ở đâu và cần chuẩn bị gì khi đi khám.',
    prefilledQuestion:
      'Hãy giải thích cho tôi bảo hiểm y tế ở Nhật: khi nào vào shakai hoken, khi nào vào kokumin kenko hoken, và cần làm gì khi đi khám.',
    sections: [
      {
        title: 'Trước hết phải biết mình thuộc diện nào',
        content:
          'Người ở Nhật không phải ai cũng vào cùng một loại bảo hiểm. Điểm đầu tiên cần xác định là bạn đang được bảo hiểm qua công ty hay phải tham gia diện quốc dân ở địa phương.',
        items: [
          'Nếu công ty cho tham gia bảo hiểm xã hội và y tế theo diện công ty, bạn cần kiểm tra cách nhận thông tin, thẻ hoặc dữ liệu bảo hiểm của mình.',
          'Nếu không ở diện công ty mà có cư trú hợp lệ và sống tại địa phương, thường phải hỏi municipal office về bảo hiểm y tế quốc dân.',
          'Đừng nghĩ “chưa đi khám thì chưa cần”. Thiếu bảo hiểm y tế có thể khiến chi phí khám chữa bệnh tăng rất mạnh.',
        ],
        tip: 'Khi chưa chắc, hãy mang thẻ cư trú ra municipal office hoặc hỏi bộ phận nhân sự để xác định đúng diện ngay.',
      },
      {
        title: 'Đăng ký và phí bảo hiểm',
        content:
          'Phí bảo hiểm không cố định cho mọi người. Với diện quốc dân, mức đóng thường phụ thuộc địa phương và thu nhập; với diện công ty, khoản đóng thường đi cùng payroll.',
        items: [
          'Nếu mới chuyển đến, nên hỏi tại city hall xem có thể làm bảo hiểm cùng ngày với đăng ký cư trú hay không.',
          'Nếu lương đang bị trừ mà bạn không hiểu khoản nào là bảo hiểm, hãy kiểm tra payslip thay vì đoán.',
          'Giữ lại thư, thông báo và giấy nộp tiền liên quan đến bảo hiểm để đối chiếu về sau.',
        ],
        tip: 'Nhiều bức xúc xảy ra chỉ vì người dùng không biết phí bảo hiểm thay đổi theo thu nhập hoặc theo địa phương.',
      },
      {
        title: 'Khi đi khám',
        content:
          'Đi khám ở Nhật thuận hơn rất nhiều nếu bạn chuẩn bị đúng giấy tờ ngay từ đầu.',
        items: [
          'Mang theo thông tin bảo hiểm, thẻ cư trú và danh sách thuốc đang dùng nếu có.',
          'Nếu chưa rõ mình có đang được xác nhận bảo hiểm trên hệ thống hay chưa, nên hỏi trước khi khám thay vì đợi đến lúc thanh toán.',
          'Giữ lại hóa đơn, giấy hẹn và hướng dẫn của bệnh viện để tiện quay lại hoặc đối chiếu chi phí.',
        ],
        tip: 'Nếu app hoặc giấy tờ bảo hiểm có gì chưa rõ, hãy kiểm tra lại trước ngày khám thay vì chờ đến quầy tiếp nhận.',
      },
    ],
  },
  {
    id: 'nenkin-pension',
    title: 'Nenkin và lương hưu công',
    titleJp: '年金・公的年金',
    icon: 'cash',
    color: '#8E44AD',
    description: 'Giải thích vì sao bị trừ Nenkin, khác nhau giữa các diện và những việc nên hiểu sớm để đỡ hoang mang.',
    prefilledQuestion:
      'Hãy giải thích cho tôi Nenkin ở Nhật theo kiểu thực tế: ai phải đóng, đóng ở đâu, xem trên bảng lương thế nào và cần lưu ý gì khi rời Nhật.',
    sections: [
      {
        title: 'Vì sao bị trừ Nenkin',
        content:
          'Nhiều người chỉ thấy bảng lương bị trừ tiền mà không hiểu mình đang ở hệ thống nào. Nenkin là một phần của hệ thống lương hưu công tại Nhật.',
        items: [
          'Nếu làm việc theo diện công ty và tham gia bảo hiểm xã hội, bạn có thể thấy khoản liên quan đến pension đi cùng payroll.',
          'Nếu không ở diện đó nhưng vẫn thuộc đối tượng tham gia theo quy định, cần hỏi thêm về diện quốc dân và cách đóng.',
          'Đừng bỏ qua thư hoặc phiếu đóng liên quan Nenkin vì đây là thứ cần dùng để đối chiếu sau này.',
        ],
        tip: 'Việc “bị trừ mà không hiểu” thường đến từ chỗ chưa phân biệt được mình đang ở diện công ty hay diện quốc dân.',
      },
      {
        title: 'Nên giữ giấy tờ gì',
        content:
          'Ngay cả khi chưa hiểu hết hệ thống, bạn vẫn nên giữ các giấy tờ nền tảng để về sau không bị đứt mạch thông tin.',
        items: [
          'Bảng lương, thư thông báo, phiếu đóng tiền và mọi tài liệu liên quan đến Nenkin.',
          'Thông tin mã số cá nhân, địa chỉ và công ty đang làm việc nếu có thay đổi qua các năm.',
          'Nếu có hỏi nhân sự hay quầy bảo hiểm, nên ghi lại họ nói bạn thuộc diện nào và cần làm gì tiếp theo.',
        ],
        tip: 'Giữ giấy tờ theo năm sẽ giúp bạn đỡ rối hơn rất nhiều khi cần đối chiếu hoặc hỏi lại sau này.',
      },
      {
        title: 'Khi nghỉ việc hoặc rời Nhật',
        content:
          'Đây là giai đoạn nhiều người bỏ sót giấy tờ nhất. Trước khi rời công ty hoặc rời Nhật, phải hiểu mình còn khoản nào cần xử lý.',
        items: [
          'Nếu nghỉ việc, nên hỏi rõ việc đóng tiếp có chuyển diện hay không và hồ sơ nào cần giữ.',
          'Nếu chuẩn bị rời Nhật, nên kiểm tra thông tin chính thức của Japan Pension Service về thủ tục liên quan cho người nước ngoài xuất cảnh.',
          'Không nên nghe theo tin truyền miệng về Nenkin nếu chưa kiểm tra lại bằng nguồn chính thức.',
        ],
        tip: 'Lúc rời Nhật, giấy tờ thất lạc rất dễ xảy ra. Hãy scan hoặc chụp lại các tài liệu quan trọng trước.',
      },
    ],
  },
  {
    id: 'apartment',
    title: 'Thuê nhà và nhận nhà',
    titleJp: '賃貸住宅・入居',
    icon: 'home',
    color: '#185FA5',
    description: 'Tiền đầu vào, giấy tờ cần có và việc phải làm ngay ngày đầu nhận nhà.',
    prefilledQuestion:
      'Hãy giải thích cho tôi cách thuê nhà ở Nhật theo kiểu thực tế: tiền đầu vào, hồ sơ, nhận nhà, chụp hiện trạng và lỗi thường gặp.',
    sections: [
      {
        title: 'Tiền đầu vào cần tính đủ',
        content:
          'Nhiều người chỉ nhìn tiền thuê tháng đầu rồi ký vội. Ở Nhật, khoản vào nhà thường nặng ở phí một lần.',
        items: [
          'Thường phải chuẩn bị khoảng 4-6 tháng tiền thuê cho đợt đầu: tiền nhà tháng đầu, tiền đặt cọc, lễ kim nếu có, phí môi giới, phí bảo lãnh, bảo hiểm và thay khóa.',
          'Nhà ghi “không lễ kim” không có nghĩa là rẻ toàn bộ. Vẫn phải cộng thêm phí bảo lãnh, phí vệ sinh và các khoản ghi trong hợp đồng.',
          'Trước khi ký, nên yêu cầu bên môi giới ghi rõ tổng số tiền vào nhà bằng con số cuối cùng, không hỏi từng khoản rời rạc.',
        ],
        tip: 'Đừng chọn nhà chỉ vì tiền thuê thấp. Hãy nhìn tổng số tiền vào nhà và điều kiện hủy hợp đồng.',
      },
      {
        title: 'Hồ sơ thường bị hỏi',
        content:
          'Bộ hồ sơ khác nhau theo từng công ty, nhưng có vài giấy tờ gần như lúc nào cũng cần.',
        items: [
          'Thẻ cư trú, hộ chiếu, số điện thoại đang dùng ở Nhật.',
          'Giấy xác nhận việc làm hoặc giấy tờ chứng minh thu nhập. Nếu mới sang, công ty có thể phải xác nhận thêm.',
          'Địa chỉ cư trú hiện tại, người liên hệ khẩn cấp, giấy cư trú nếu bên cho thuê yêu cầu.',
          'Nếu không có người bảo lãnh cá nhân, bạn thường sẽ dùng công ty bảo lãnh và trả phí riêng.',
        ],
        tip: 'Nếu hồ sơ của bạn còn yếu, nên nói thật ngay từ đầu để môi giới lọc đúng nhóm nhà có khả năng đậu.',
      },
      {
        title: 'Ngày nhận nhà phải làm ngay',
        content:
          'Đây là bước nhiều người bỏ qua nhất, nhưng lại quyết định việc sau này có bị đòi tiền oan khi trả nhà hay không.',
        items: [
          'Chụp toàn bộ hiện trạng ngay ngày đầu: tường, trần, sàn, bếp, toilet, ban công, cửa sổ, khóa, điều hòa.',
          'Chụp riêng mọi vết trầy, nứt, mốc, ố hoặc đồ hỏng dù nhỏ.',
          'Kiểm tra điện, nước, gas, bếp, điều hòa, khóa cửa, chuông, internet nếu nhà có sẵn.',
          'Giữ email, biên bản bàn giao và ảnh trong cùng một nơi để khi trả nhà còn đối chiếu.',
        ],
        tip: 'Nếu thấy lỗi ngay lúc vào, hãy báo bằng email hoặc tin nhắn có lưu thời gian. Gọi điện xong mà không có dấu vết thì rất yếu.',
      },
      {
        title: 'Những lỗi làm mất tiền khi trả nhà',
        content:
          'Phần lớn tranh chấp không đến từ luật quá khó, mà từ việc không đọc hợp đồng và không giữ bằng chứng.',
        items: [
          'Thông báo hủy hợp đồng quá muộn so với điều khoản 1 hoặc 2 tháng báo trước.',
          'Tự khoan, dán keo mạnh, nuôi thú cưng hoặc cho người khác ở chung khi hợp đồng không cho phép.',
          'Không có ảnh hiện trạng lúc nhận nhà nên không chứng minh được vết cũ.',
          'Không hỏi rõ tiêu chuẩn “khôi phục hiện trạng” theo guideline chính thức.',
        ],
        tip: 'Nếu phát sinh phí trả nhà cao bất thường, đừng vội đồng ý. Hãy yêu cầu bảng chi tiết và đối chiếu với guideline của MLIT.',
      },
    ],
  },
  {
    id: 'utilities',
    title: 'Điện, nước, gas và internet',
    titleJp: '電気・水道・ガス・インターネット',
    icon: 'flash',
    color: '#16A085',
    description: 'Cách mở dịch vụ khi mới chuyển nhà, lịch thanh toán và lỗi khiến bị cắt dịch vụ.',
    prefilledQuestion:
      'Hãy giải thích cho tôi cách mở điện, nước, gas và internet khi mới chuyển nhà ở Nhật, theo thứ tự nên làm và lỗi hay gặp.',
    sections: [
      {
        title: 'Thứ tự nên làm khi mới chuyển nhà',
        content:
          'Không phải dịch vụ nào cũng tự có sẵn. Nếu chờ đến ngày dọn vào mới xử lý, bạn rất dễ bị thiếu gas hoặc internet.',
        items: [
          'Điện và nước nhiều nơi có thể đăng ký online hoặc qua điện thoại, nên làm trước ngày vào nhà vài ngày.',
          'Gas thường phải hẹn người tới mở van trực tiếp, vì vậy nên đặt lịch sớm để tránh tối đầu tiên không có nước nóng.',
          'Internet ở chung cư có loại có sẵn, có loại phải đăng ký mới hoàn toàn. Cần hỏi rõ ngay từ lúc xem nhà.',
        ],
        tip: 'Ưu tiên chốt lịch mở gas trước. Đây là dịch vụ hay làm người mới chuyển nhà bị động nhất.',
      },
      {
        title: 'Giấy tờ và thông tin thường cần',
        content:
          'Đăng ký dịch vụ không khó, nhưng thiếu thông tin nhỏ vẫn có thể làm bạn gọi lại nhiều lần.',
        items: [
          'Tên, ngày chuyển đến, địa chỉ đầy đủ, số điện thoại liên hệ.',
          'Thẻ cư trú hoặc thông tin nhận dạng nếu đơn vị cung cấp yêu cầu.',
          'Tài khoản ngân hàng hoặc thẻ để đăng ký thanh toán tự động nếu muốn dùng lâu dài.',
        ],
        tip: 'Viết sẵn địa chỉ nhà mới bằng tiếng Nhật vào ghi chú điện thoại để đọc cho đúng khi gọi tổng đài.',
      },
      {
        title: 'Lỗi khiến hóa đơn và dịch vụ rối',
        content:
          'Phần lớn vấn đề không nằm ở giá, mà ở việc bỏ sót hóa đơn hoặc tưởng đã đăng ký xong trong khi chưa hoàn tất.',
        items: [
          'Quên đổi địa chỉ gửi hóa đơn nên thư vẫn về nhà cũ.',
          'Tưởng nhà có internet sẵn nhưng thực tế chỉ có hạ tầng, vẫn phải ký hợp đồng.',
          'Không thanh toán đúng hạn nên bị cắt điện, cắt mạng hoặc bị tính phí khôi phục.',
        ],
        tip: 'Trong 1-2 tháng đầu, nên kiểm tra hòm thư kỹ để không bỏ sót giấy báo phí và mã thanh toán.',
      },
    ],
  },
  {
    id: 'trash',
    title: 'Phân loại rác',
    titleJp: 'ごみの分別',
    icon: 'trash',
    color: '#27AE60',
    description: 'Cách đọc lịch rác, chia loại đúng và xử lý đồ to mà không bị hàng xóm than phiền.',
    prefilledQuestion:
      'Hãy giải thích cho tôi cách phân loại rác ở Nhật theo kiểu dễ làm theo, gồm rác đốt được, không đốt được, tái chế và rác cỡ lớn.',
    sections: [
      {
        title: 'Việc đầu tiên sau khi chuyển đến',
        content:
          'Mỗi khu có lịch và quy tắc riêng. Bỏ rác theo thói quen cũ là cách nhanh nhất để bị nhắc nhở.',
        items: [
          'Xin hoặc tải lịch rác chính thức của khu vực thay vì hỏi miệng hàng xóm.',
          'Kiểm tra điểm tập kết rác của tòa nhà và khung giờ được phép mang ra.',
          'Hỏi rõ có bắt buộc dùng túi rác đúng mẫu của quận hay không.',
        ],
        tip: 'Nếu bạn chưa chắc, hãy nhìn đúng lịch quận trước rồi mới nhìn cách người trong tòa làm.',
      },
      {
        title: '4 nhóm rác cơ bản',
        content:
          'Tên gọi có thể khác giữa các thành phố, nhưng logic chia rác thường khá giống nhau.',
        items: [
          'Rác đốt được: thức ăn thừa, khăn giấy, rác sinh hoạt mềm.',
          'Rác không đốt được: sứ, thủy tinh vỡ, kim loại nhỏ hoặc vật khó cháy.',
          'Rác tái chế: chai PET, lon, chai thủy tinh, giấy báo, bìa carton.',
          'Rác cỡ lớn: bàn, ghế, nệm, vali lớn, kệ, xe đạp cũ. Nhóm này thường phải đặt lịch riêng.',
        ],
        tip: 'Pin, bật lửa, bình xịt, đồ điện nhỏ thường có quy định riêng. Đây là nhóm dễ bỏ sai nhất.',
      },
    ],
  },
  {
    id: 'practical-tips',
    title: 'Mẹo thực tế ở Nhật',
    titleJp: '日本生活の実用メモ',
    icon: 'bulb',
    color: '#7D3C98',
    description: 'Những mẹo nhỏ nhưng rất đáng tiền nếu bạn sống ở Nhật hằng ngày, kèm điều kiện áp dụng.',
    prefilledQuestion:
      'Hãy cho tôi các mẹo thực tế khi sống ở Nhật, nhưng chỉ lấy những mẹo có điều kiện áp dụng rõ ràng và không gây hiểu lầm.',
    sections: [
      {
        title: 'Có thể lấy 住民票 ở combini, nhưng không phải ai cũng lấy được',
        content:
          'Đây là mẹo rất đáng biết, nhưng phải hiểu đúng điều kiện. Không phải cứ sống ở Nhật là ra combini lấy được giấy cư trú.',
        items: [
          'Nếu địa phương bạn ở có hỗ trợ コンビニ交付, bạn có thể lấy một số giấy như bản sao 住民票 hoặc 印鑑登録証明書 tại combini.',
          'Điều kiện thực tế thường gồm: có My Number Card còn hiệu lực, có mã PIN 4 số của 利用者証明用電子証明書 và địa phương tham gia dịch vụ.',
          'Không nên mặc định là mọi chứng nhận đều lấy được, mọi combini đều giống nhau hoặc giờ phục vụ lúc nào cũng như nhau.',
        ],
        tip: 'Nếu bạn hay cần 住民票 để mở tài khoản, làm sim hoặc nộp hồ sơ, đây là mẹo rất tiết kiệm thời gian.',
      },
      {
        title: 'Chuyển nhà thì làm luôn chuyển tiếp thư 1 năm',
        content:
          'Nhiều người đổi địa chỉ ở municipal office nhưng quên thư cũ vẫn chạy về nhà cũ. Đây là lỗi rất hay làm lỡ giấy quan trọng.',
        items: [
          'Khi nộp 転居届, thư và bưu phẩm đủ điều kiện có thể được chuyển tiếp miễn phí 1 năm từ địa chỉ cũ sang địa chỉ mới.',
          'Có thể làm tại bưu điện, gửi mẫu giấy hoặc dùng e転居. Việc cập nhật có thể mất vài ngày làm việc.',
          'Không nên nộp sát ngày chuyển nhà rồi nghĩ thư sẽ tự chuyển ngay trong hôm đó.',
        ],
        tip: 'Đây là việc rất đáng làm ngay khi đổi nhà, vì thư từ ngân hàng, trường, bảo hiểm và cơ quan nhà nước thường tới rải rác trong vài tuần.',
      },
      {
        title: 'My Number card có thể đăng ký dùng như bảo hiểm, nhưng phải đăng ký trước',
        content:
          'Nhiều người nghe nói “đi khám chỉ cần My Number” rồi tưởng cầm thẻ là dùng được ngay. Thực tế không phải vậy.',
        items: [
          'Để dùng My Number card như thẻ bảo hiểm, bạn phải đăng ký利用 trước.',
          'Các cách đăng ký thường gồm: tại máy đọc thẻ ở cơ sở y tế/pharmacy, qua Myna Portal hoặc qua ATM Seven Bank.',
          'Dù đã đăng ký, bạn vẫn nên kiểm tra trước nếu đây là lần đầu đi khám ở nơi đó.',
        ],
        tip: 'Nếu bạn đã có My Number card mà vẫn cầm thẻ bảo hiểm giấy mỗi lần đi khám, nên kiểm tra xem mình đã đăng ký利用 chưa.',
      },
      {
        title: 'Bưu kiện có thể đổi cách nhận, không nhất thiết chờ ở nhà',
        content:
          'Nếu bạn đi làm hoặc đi học cả ngày, chờ bưu kiện ở nhà là cách sống rất mệt và dễ lỡ hàng.',
        items: [
          'Japan Post có các lựa chọn đổi ngày giờ nhận hoặc đổi cách nhận khi bạn nhận được eお届け通知.',
          'Tùy điều kiện dịch vụ, bạn có thể đổi sang nhận ở bưu điện, locker はこぽす hoặc hình thức nhận linh hoạt khác.',
          'Điểm mấu chốt là phải có thông báo giao hàng hoặc mã theo dõi phù hợp với điều kiện dịch vụ.',
        ],
        tip: 'Nếu bạn ở một mình, nên ưu tiên học cách đổi ngày giờ nhận hoặc nhận ở điểm gần ga để đỡ bị phụ thuộc vào shipper.',
      },
    ],
  },
  {
    id: 'time-money-saving-tips',
    title: 'Mẹo tiết kiệm thời gian và tiền',
    titleJp: '時間とお金の節約メモ',
    icon: 'timer',
    color: '#148F77',
    description: 'Các mẹo nhỏ giúp giảm thời gian xếp hàng, đi lại và chi phí sinh hoạt, có ghi rõ điều kiện áp dụng.',
    prefilledQuestion:
      'Hãy cho tôi các mẹo tiết kiệm thời gian và tiền ở Nhật, nhưng phải ghi rõ điều kiện áp dụng và tránh nói chung chung.',
    sections: [
      {
        title: 'Nếu đi một tuyến cố định, hãy kiểm tra 定期券',
        content:
          'Đây là một trong những mẹo tiết kiệm cơ bản nhất, nhưng nhiều người mới ở Nhật lại để muộn nhiều tháng mới làm.',
        items: [
          'Nếu bạn đi làm hoặc đi học đều đặn trên cùng một tuyến, nên kiểm tra 定期券 thay vì mỗi ngày trừ tiền lẻ bằng IC card.',
          'JR East có Net de Teiki và Mobile Suica để tra cứu, đăng ký hoặc mua 定期券 tiện hơn so với việc ra ga hỏi trực tiếp từ đầu.',
          'Với khu vực có hỗ trợ オフピーク定期券, loại vé này có thể rẻ hơn định kỳ thông thường, nhưng chỉ áp dụng ở khu vực và khung giờ phù hợp.',
        ],
        tip: 'Không nên nghe người khác nói “ai cũng nên mua 定期券”. Nếu bạn đi làm không cố định hoặc làm theo ca, phải so lại tiền thực tế.',
      },
      {
        title: 'Làm giấy ở combini để đỡ mất nửa ngày đi hành chính',
        content:
          'Nhiều người mất cả buổi sáng chỉ để lấy một tờ giấy cư trú. Nếu địa phương của bạn có hỗ trợ, combini có thể giúp tiết kiệm rất nhiều thời gian.',
        items: [
          'Nếu địa phương hỗ trợ コンビニ交付 và bạn có My Number Card + PIN hợp lệ, bạn có thể lấy một số chứng nhận tại combini mà không cần chờ quầy hành chính ban ngày.',
          'Mẹo này đặc biệt đáng giá với người đi làm giờ hành chính hoặc cần giấy gấp để mở tài khoản, làm sim hoặc nộp hồ sơ.',
          'Nhưng không nên mặc định là giấy nào cũng lấy được ở combini; phải kiểm tra đúng menu và dịch vụ của địa phương mình.',
        ],
        tip: 'Nếu bạn thường xuyên phải nộp 住民票, đây là một trong những mẹo tiết kiệm thời gian tốt nhất ở Nhật.',
      },
      {
        title: 'Tối ưu nhận hàng để không bị phụ thuộc vào shipper',
        content:
          'Người sống một mình rất dễ bị mất thời gian vào chuyện nhận hàng nếu không biết đổi cách nhận.',
        items: [
          'Japan Post cho phép thay đổi một số cách nhận thông qua eお届け通知, ví dụ đổi sang locker はこぽす hoặc một số hình thức nhận linh hoạt khác nếu điều kiện phù hợp.',
          'Nếu nhà bạn có chỗ đặt hàng an toàn, có thể cân nhắc các hình thức 指定場所で受け取る thay vì lúc nào cũng phải chờ giao tận tay.',
          'Điểm cần nhớ là phải có tài khoản, xác minh cư trú hoặc thông báo giao hàng phù hợp theo đúng điều kiện dịch vụ.',
        ],
        tip: 'Nếu sống một mình, nên tối ưu cách nhận hàng ngay từ những tuần đầu.',
      },
      {
        title: 'Tiết kiệm bằng cách tránh lỗi phải trả lại',
        content:
          'Ở Nhật, nhiều khoản tốn tiền không đến từ giá gốc, mà đến từ lỗi vận hành nhỏ bạn có thể tránh được.',
        items: [
          'Không bỏ sai rác để tránh bị nhắc, mất thời gian xử lý lại hoặc căng với ban quản lý.',
          'Không để quá hạn hóa đơn điện, gas, điện thoại để tránh phí phát sinh hoặc phí khôi phục dịch vụ.',
          'Không báo hủy nhà quá muộn so với hợp đồng vì đây là lỗi rất hay làm mất một khoản tiền lớn nhưng hoàn toàn tránh được.',
        ],
        tip: 'Mẹo tiết kiệm tốt nhất ở Nhật thường là đừng để phát sinh phí phạt, phí khôi phục hoặc phí xử lý lại từ những lỗi nhỏ.',
      },
    ],
  },
  {
    id: 'common-misunderstandings',
    title: 'Những hiểu nhầm phổ biến',
    titleJp: 'よくある思い違い',
    icon: 'help-circle',
    color: '#AF601A',
    description: 'Các nhầm lẫn rất hay gặp ở Nhật, nhất là với giấy tờ, bảo hiểm, bưu điện và đời sống hằng ngày.',
    prefilledQuestion:
      'Hãy giải thích cho tôi những hiểu nhầm phổ biến khi sống ở Nhật, đặc biệt là các nhầm lẫn về giấy tờ, bảo hiểm, nhà ở và bưu điện.',
    sections: [
      {
        title: 'My Number không phải lúc nào cũng là My Number Card',
        content:
          'Rất nhiều người nghe “cần My Number” rồi tưởng bắt buộc phải có thẻ vật lý. Đây là nhầm lẫn rất phổ biến.',
        items: [
          'My Number là mã số cá nhân. My Number Card là thẻ nhựa có gắn chức năng xác minh.',
          'Có thủ tục chỉ hỏi số My Number, nhưng cũng có thủ tục phải dùng chính thẻ để xác thực hoặc lấy giấy ở combini.',
          'Nếu bạn chưa có thẻ, không có nghĩa là bạn chưa có My Number.',
        ],
        tip: 'Trước khi đi làm thủ tục, hãy phân biệt rõ họ đang cần “số My Number”, “My Number Card” hay “giấy cư trú”.',
      },
      {
        title: 'Có chuyển tiếp thư 1 năm không có nghĩa là mọi thư đều được chuyển',
        content:
          'Nhiều người đã nộp 転居届 rồi nghĩ thư nào cũng sẽ tự theo sang nhà mới. Điều đó không đúng hoàn toàn.',
        items: [
          'Dịch vụ chuyển tiếp thư là miễn phí 1 năm nếu bạn nộp 転居届 đúng cách.',
          'Có loại thư ghi “転送不要”, dù bạn đã nộp 転居届, thư vẫn không được chuyển tiếp.',
          'Vì vậy sau khi chuyển nhà, bạn vẫn nên chủ động đổi địa chỉ với ngân hàng, nhà mạng, trường và các bên quan trọng.',
        ],
        tip: 'Đừng coi chuyển tiếp thư là thay thế hoàn toàn cho việc cập nhật địa chỉ với từng dịch vụ.',
      },
      {
        title: 'Có My Number card không có nghĩa cơ sở y tế nào cũng nhận giống nhau',
        content:
          'Nhiều người tưởng đã đăng ký マイナ保険証 là đi đâu cũng dùng như nhau. Thực tế việc vận hành còn tùy cơ sở y tế.',
        items: [
          'Có danh sách cơ sở y tế và nhà thuốc hỗ trợ sử dụng My Number card như bảo hiểm, nhưng việc vận hành thực tế vẫn khác nhau theo từng nơi.',
          'Vì vậy khi đi khám ở nơi mới, nhất là lần đầu, vẫn nên kiểm tra trước hoặc chuẩn bị thêm thông tin bảo hiểm nếu cần.',
          'Đừng suy từ một phòng khám ra toàn bộ hệ thống.',
        ],
        tip: 'Lần đầu đi khám ở nơi lạ, cứ coi như mình cần xác nhận lại cách họ tiếp nhận trước khi tới.',
      },
      {
        title: 'Sống ở Nhật không có nghĩa mọi dịch vụ đều xử lý ngay trong ngày',
        content:
          'Nhiều người mới sang nghĩ Nhật làm việc rất nhanh nên cái gì cũng xong trong ngày. Thực tế nhiều quy trình vẫn có độ trễ rõ ràng.',
        items: [
          'Đăng ký chuyển tiếp thư có thể mất vài ngày làm việc để phản ánh vào hệ thống.',
          'Mở gas, nhận My Number card, internet cố định hoặc một số tài khoản ngân hàng có thể cần lịch hẹn hoặc thời gian xử lý riêng.',
          'Nếu bạn đợi sát hạn mới làm, chính độ trễ bình thường này sẽ biến thành vấn đề.',
        ],
        tip: 'Ở Nhật, làm đúng sớm hơn một chút thường quan trọng hơn làm nhanh vào phút cuối.',
      },
    ],
  },
  {
    id: 'combini-supermarket-station-tips',
    title: 'Mẹo ở combini, siêu thị và ga tàu',
    titleJp: 'コンビニ・スーパー・駅の実用メモ',
    icon: 'storefront',
    color: '#2874A6',
    description: 'Những mẹo rất đời thực khi mua đồ, nhận hàng, in giấy và đi lại hằng ngày.',
    prefilledQuestion:
      'Hãy cho tôi các mẹo thực tế khi dùng combini, siêu thị và ga tàu ở Nhật, theo kiểu áp dụng được ngay.',
    sections: [
      {
        title: 'Combini không chỉ để mua đồ ăn',
        content: 'Nhiều người dùng combini như cửa hàng tiện lợi đơn thuần, nhưng thực tế đây còn là điểm xử lý rất nhiều việc nhỏ.',
        items: [
          'Một số combini có máy đa chức năng để in tài liệu, scan, thanh toán hóa đơn và dùng dịch vụ chứng nhận nếu địa phương hỗ trợ コンビニ交付.',
          'Khi cần in nhanh hồ sơ, vé, bản scan hộ chiếu hoặc giấy xác nhận, combini thường tiện hơn đi tìm cửa hàng in riêng.',
          'Nhiều loại hóa đơn sinh hoạt hoặc phiếu thanh toán có thể xử lý ở quầy thu ngân combini, rất hữu ích khi bạn chưa kịp cài tự trừ.',
        ],
        tip: 'Nếu bạn mới sang Nhật, nên thử làm quen sớm với máy in đa chức năng ở combini gần nhà. Đây là kỹ năng rất thực dụng.',
      },
      {
        title: 'Siêu thị có logic riêng, không chỉ là rẻ hơn combini',
        content: 'Đi siêu thị đúng giờ và đúng khu có thể tiết kiệm tiền rõ ràng mà không cần sống quá kham khổ.',
        items: [
          'Cuối ngày thường có nhãn giảm giá cho đồ ăn sẵn, thịt, cá và hộp cơm.',
          'Mỗi siêu thị mạnh ở một nhóm khác nhau: có nơi rau rẻ, có nơi đồ đông lạnh tốt, có nơi đồ chín sẵn ổn hơn.',
          'Nếu nấu ở nhà, nên đi siêu thị với danh sách ngắn rõ ràng; vào khi đói hoặc không có kế hoạch rất dễ mua linh tinh.',
        ],
        tip: 'Một mẹo đơn giản nhưng hiệu quả: chọn 1-2 siêu thị chính quen mặt bằng giá, thay vì mua ngẫu hứng ở nhiều chỗ rồi không nhớ giá thật.',
      },
      {
        title: 'Ở ga tàu, thông tin đáng tin nhất thường ở biển chỉ dẫn và app',
        content: 'Người mới hay rối vì ga lớn, nhiều line và quá nhiều bảng điện tử. Cách đơn giản nhất là bám vào đúng loại thông tin.',
        items: [
          'Nhìn line, platform number, ga kế tiếp và giờ tàu trên app thay vì chỉ nhớ tên tàu bằng cảm giác.',
          'Nếu tàu trễ, hãy kiểm tra xem ga hoặc công ty tàu có cấp 遅延証明書 hay không nếu bạn cần đưa cho công ty hoặc trường.',
          'Khi lạc trong ga lớn, ưu tiên tìm đúng line và số cổng ra, không cố đoán hướng theo trực giác.',
        ],
        tip: 'Nếu phải chuyển tuyến trong ga lớn hằng ngày, nên lưu ảnh màn hình của đúng lộ trình và cổng ra hay dùng trong tuần đầu.',
      },
    ],
  },
  {
    id: 'avoid-losing-money-checklist',
    title: 'Checklist tránh mất tiền oan',
    titleJp: '無駄な出費を防ぐチェックリスト',
    icon: 'wallet',
    color: '#CB4335',
    description: 'Những khoản tiền người mới ở Nhật rất hay mất vì chủ quan, đọc thiếu hoặc làm sai thứ tự.',
    prefilledQuestion:
      'Hãy cho tôi checklist tránh mất tiền oan ở Nhật, theo kiểu thực tế và ưu tiên những lỗi nhiều người mới hay gặp.',
    sections: [
      {
        title: 'Trước khi ký hoặc trả tiền',
        content: 'Rất nhiều khoản mất tiền oan bắt đầu từ việc ký nhanh hoặc chuyển tiền khi chưa hiểu đầy đủ.',
        items: [
          'Không chuyển tiền nhà, tiền giữ chỗ, tiền dịch vụ nếu chưa có thông tin tài khoản và nội dung thu bằng văn bản rõ ràng.',
          'Khi ký hợp đồng điện thoại, internet, gym hoặc nhà ở, phải hỏi rõ thời hạn tối thiểu, phí hủy sớm và điều kiện gia hạn tự động.',
          'Nếu có khoản phí bạn không hiểu, đừng ngại hỏi lại bằng câu thật ngắn. Hiểu chậm còn hơn trả tiền sai.',
        ],
        tip: 'Ở Nhật, “đã ký rồi” thường rất mạnh. Cách tiết kiệm nhất là chậm 10 phút trước khi ký, không phải xử lý 3 tháng sau đó.',
      },
      {
        title: 'Trong sinh hoạt hằng tháng',
        content: 'Khoản nhỏ lặp lại đều mới là thứ ăn ngân sách mạnh nhất.',
        items: [
          'Đừng để hóa đơn quá hạn nếu bạn chưa cài tự trừ hoặc chưa quen nhịp thư từ.',
          'Kiểm tra kỹ phí hàng tháng của sim, internet, ứng dụng trả phí, thẻ thành viên hoặc dịch vụ bạn đăng ký lúc mới sang.',
          'Nếu dùng combini quá nhiều cho đồ ăn và rút tiền, chi phí tăng rất nhanh dù từng lần nhìn không lớn.',
        ],
        tip: 'Mỗi tháng chỉ cần loại bỏ vài khoản “tiện quá nên quên nhìn giá” là đã khác rất rõ.',
      },
      {
        title: 'Khi chuyển nhà hoặc đổi việc',
        content: 'Đây là hai thời điểm dễ phát sinh phí bất ngờ nhất nếu không làm đúng thứ tự.',
        items: [
          'Đổi nhà thì kiểm tra hạn báo trước, chụp hiện trạng và làm chuyển tiếp thư; thiếu một trong ba việc này là dễ tốn tiền.',
          'Đổi việc thì giữ lại phiếu lương, giấy tổng kết thu nhập, lịch sử bảo hiểm và mọi giấy công ty cũ giao.',
          'Không đóng tài khoản, hủy sim hoặc hủy dịch vụ quá sớm khi bạn chưa chắc thủ tục bên mới đã chạy ổn.',
        ],
        tip: 'Rất nhiều khoản mất tiền không phải vì giá cao, mà vì làm lệch thứ tự và phải sửa sai sau đó.',
      },
    ],
  },
  {
    id: 'transportation',
    title: 'Tàu điện, xe buýt và xe đạp',
    titleJp: '電車・バス・自転車',
    icon: 'train',
    color: '#E74C3C',
    description: 'Đi tàu cho đỡ lạc, dùng thẻ IC đúng cách và tránh các lỗi xe đạp dễ bị phạt.',
    prefilledQuestion:
      'Hãy giải thích cho tôi cách đi tàu, dùng Suica/Pasmo và các lưu ý xe đạp ở Nhật theo kiểu thực tế cho người mới.',
    sections: [
      {
        title: 'Đi tàu cho người mới',
        content: 'Hệ thống tàu nhìn phức tạp nhưng chỉ cần nắm vài nguyên tắc là dùng được.',
        items: [
          'Dùng Suica hoặc Pasmo sẽ tiện hơn mua vé giấy từng chặng.',
          'Khi vào và ra ga đều phải chạm thẻ hoặc điện thoại. Quên chạm lúc ra sẽ làm thẻ bị lỗi.',
          'Nếu đi sai ga hoặc thiếu tiền, xử lý ở máy điều chỉnh cước trước khi ra cổng.',
          'Dùng app như Google Maps hoặc Yahoo!乗換案内 để xem đúng ga, đúng platform và giờ tàu.',
        ],
        tip: 'Lúc mới đi, nên chụp màn hình lộ trình trước khi xuống ga. Trong ga lớn rất dễ mất mạng hoặc đi nhầm hướng.',
      },
      {
        title: 'Suica, Pasmo và nạp tiền',
        content: 'Thẻ IC không chỉ dùng cho tàu mà còn dùng cho xe buýt, combini và nhiều máy bán hàng.',
        items: [
          'Có thể dùng thẻ vật lý hoặc thêm vào điện thoại nếu máy hỗ trợ.',
          'Nạp tiền ở máy trong ga, combini hoặc một số ATM.',
          'Nếu bạn đi làm cố định một tuyến, nên hỏi thêm vé tháng để tiết kiệm.',
        ],
        tip: 'Hãy kiểm tra số dư trước giờ cao điểm. Hết tiền trong lúc chen cổng rất dễ rối.',
      },
      {
        title: 'Xe đạp: đi rất tiện nhưng luật siết mạnh',
        content: 'Xe đạp là phương tiện rất thực tế ở Nhật, nhưng luật hiện hành siết dần và xử phạt rõ hơn trước.',
        items: [
          'Nên đăng ký chống trộm xe khi mua xe để chứng minh quyền sở hữu.',
          'Không đỗ bừa ngoài ga hoặc trước cửa hàng. Xe có thể bị kéo đi và mất phí chuộc lại.',
          'Ban đêm phải bật đèn, không vừa đạp vừa dùng điện thoại, không chở người trái quy định.',
          'Nếu cần xem thay đổi pháp lý mới hơn, nên mở guide luật xe đạp trong tab Thủ tục.',
        ],
        tip: 'Nếu đi xe đạp đi làm mỗi ngày, nên kiểm tra luôn bảo hiểm trách nhiệm dân sự xe đạp của khu bạn.',
      },
    ],
  },
  {
    id: 'grocery',
    title: 'Mua thực phẩm và đồ dùng',
    titleJp: '食料品・日用品',
    icon: 'basket',
    color: '#F39C12',
    description: 'Mua ở đâu cho hợp túi tiền, đọc hạn dùng và tránh mua nhầm đồ.',
    prefilledQuestion:
      'Hãy hướng dẫn tôi cách mua thực phẩm ở Nhật theo kiểu tiết kiệm và dễ hiểu: nên mua ở đâu, đọc hạn dùng thế nào và tránh nhầm gì.',
    sections: [
      {
        title: 'Nên mua ở đâu',
        content: 'Chỗ rẻ nhất không phải lúc nào cũng là chỗ tiện nhất. Quan trọng là mua đúng loại đồ ở đúng nơi.',
        items: [
          'Siêu thị thường rẻ hơn combini khá nhiều nếu bạn mua cho cả tuần.',
          'Gyomu Super, OK, Seiyu hoặc chuỗi giá rẻ phù hợp với người nấu ăn ở nhà.',
          'Combini hợp khi cần mua gấp, nhưng mua thường xuyên sẽ đội chi phí lên rõ.',
        ],
        tip: 'Nếu ở gần siêu thị lớn, hãy gom mua 2-3 ngày một lần thay vì ghé combini mỗi tối.',
      },
      {
        title: 'Cách tiết kiệm mà vẫn dễ sống',
        content: 'Tiết kiệm hiệu quả ở Nhật thường đến từ việc mua đúng giờ và hiểu nhãn, không phải săn sale cực đoan.',
        items: [
          'Cuối ngày nhiều siêu thị giảm giá đồ chín sẵn, sashimi, sushi, thịt hoặc cá.',
          'Mua rau theo mùa thường rẻ và ngon hơn.',
          'Đồ khô, gạo, mì, gia vị cơ bản nên mua theo đợt thay vì mua lẻ hàng ngày.',
        ],
        tip: 'Thấy nhãn giảm giá chưa chắc đã hời nếu bạn không dùng kịp trước hạn.',
      },
      {
        title: 'Đọc hạn dùng để không mua nhầm',
        content: 'Hai nhãn nhiều người mới hay nhầm nhất là “ngon nhất” và “an toàn đến ngày nào”.',
        items: [
          '賞味期限 thường là mốc ngon nhất, phù hợp với đồ khô hoặc đồ đóng gói.',
          '消費期限 là hạn an toàn nên dùng, thường áp dụng cho đồ tươi hoặc dễ hỏng.',
          'Người ăn chay hoặc kiêng thịt heo nên đọc cả thành phần, không chỉ nhìn hình minh họa.',
        ],
        tip: 'Dùng camera dịch nhanh để đọc bao bì trong thời gian đầu là hoàn toàn thực tế.',
      },
    ],
  },
  {
    id: 'banking',
    title: 'ATM và chuyển tiền hằng ngày',
    titleJp: 'ATM・日常の送金',
    icon: 'cash',
    color: '#9B59B6',
    description: 'Rút tiền, furikomi, hóa đơn và các lỗi rất dễ làm tài khoản bị phiền.',
    prefilledQuestion:
      'Hãy giải thích cho tôi cách dùng ATM, chuyển khoản trong Nhật và các lưu ý thực tế khi dùng tài khoản ngân hàng hằng ngày.',
    sections: [
      {
        title: 'Dùng tài khoản hằng ngày cho gọn',
        content: 'Ở Nhật, tài khoản ngân hàng gắn trực tiếp với lương, tiền nhà và nhiều hóa đơn sinh hoạt.',
        items: [
          'Nên biết rõ app nào dùng để xem số dư, chuyển khoản và kiểm tra lịch sử giao dịch.',
          'Nhiều hóa đơn điện, nước, điện thoại có thể cài tự trừ để đỡ quên hạn.',
          'Combini ATM tiện nhưng có thể tính phí theo giờ hoặc theo ngân hàng.',
        ],
        tip: 'Sau khi mở tài khoản, hãy thử đăng nhập app và làm một giao dịch nhỏ để chắc chắn mọi thứ đã hoạt động.',
      },
      {
        title: 'Chuyển khoản trong Nhật',
        content: 'Furikomi là giao dịch rất phổ biến, nhưng sai thông tin người nhận thì xử lý không vui chút nào.',
        items: [
          'Thường cần tên ngân hàng, chi nhánh, loại tài khoản, số tài khoản và tên người nhận.',
          'Tên người nhận đôi khi phải nhập bằng kana theo đúng định dạng hệ thống yêu cầu.',
          'Lần đầu chuyển tiền nhà hoặc tiền học, nên xin ảnh chụp thông tin tài khoản thay vì gõ theo trí nhớ.',
        ],
        tip: 'Nếu là khoản quan trọng, hãy kiểm tra lại từng số trước khi bấm xác nhận. Sai một ký tự vẫn có thể đi nhầm.',
      },
      {
        title: 'Điều tuyệt đối không nên làm',
        content: 'Đây không chỉ là mẹo sinh hoạt mà còn là ranh giới an toàn pháp lý.',
        items: [
          'Không cho người khác mượn tài khoản, thẻ ATM, app ngân hàng hoặc mã OTP.',
          'Không nhận tiền hộ cho người lạ nếu bạn không hiểu rõ giao dịch.',
          'Không bán hoặc chuyển nhượng tài khoản cũ khi bạn đổi việc hoặc sắp về nước.',
        ],
        tip: 'Nếu muốn tìm hiểu sâu hơn về chống khóa tài khoản và anti-fraud, đã có guide riêng trong tab Thủ tục.',
      },
    ],
  },
  {
    id: 'hospital',
    title: 'Đi khám và bệnh viện',
    titleJp: '病院・クリニック',
    icon: 'medical',
    color: '#E74C3C',
    description: 'Nên đi clinic hay bệnh viện lớn, cần mang gì và làm sao để đỡ tốn tiền oan.',
    prefilledQuestion:
      'Hãy giải thích cho tôi cách đi khám ở Nhật theo kiểu thực tế: clinic, bệnh viện lớn, giấy tờ cần mang và chi phí cơ bản.',
    sections: [
      {
        title: 'Khi nào đi clinic, khi nào đi bệnh viện lớn',
        content: 'Nhiều trường hợp thông thường nên bắt đầu từ clinic thay vì vào thẳng bệnh viện lớn.',
        items: [
          'Cảm sốt, ho, đau họng, da liễu, đau mắt, đau bụng thông thường thường nên đi clinic hoặc phòng khám chuyên khoa gần nhà.',
          'Bệnh viện lớn phù hợp hơn khi có giấy giới thiệu, cần khám sâu hoặc tình trạng nặng.',
          'Tự vào bệnh viện lớn không có giấy giới thiệu có thể bị thu thêm phí.',
        ],
        tip: 'Nếu phân vân, hãy gọi trước để hỏi có nhận ca của bạn không và có cần đặt lịch không.',
      },
      {
        title: 'Đi khám cần mang gì',
        content: 'Thiếu giấy tờ là lý do rất phổ biến khiến buổi khám bị kéo dài hoặc chi phí tăng.',
        items: [
          'Thẻ bảo hiểm y tế hoặc My Number card đã liên kết bảo hiểm.',
          'Thẻ cư trú hoặc giấy tờ nhận dạng nếu nơi khám yêu cầu thêm.',
          'Danh sách thuốc đang dùng, giấy giới thiệu hoặc toa cũ nếu có.',
          'Tiền mặt hoặc thẻ vì không phải nơi nào cũng nhận mọi cách thanh toán.',
        ],
        tip: 'Không có bảo hiểm hợp lệ thì tiền khám có thể tăng rất mạnh. Phần này không nên để sai.',
      },
      {
        title: 'Chi phí và hỗ trợ cần biết',
        content: 'Nếu tham gia bảo hiểm đúng cách, phần lớn lượt khám thông thường không đến mức quá nặng.',
        items: [
          'Người lớn thường tự trả khoảng 30% chi phí trong phạm vi bảo hiểm.',
          'Thuốc kê đơn thường cũng đi theo mức chi trả bảo hiểm.',
          'Trường hợp điều trị nặng hoặc hóa đơn cao có thể liên quan đến cơ chế giảm gánh nặng y tế.',
          'Khẩn cấp thật sự thì gọi 119. Xe cứu thương ở Nhật không thu phí như nhiều người tưởng.',
        ],
        tip: 'Nếu cần nơi hỗ trợ tiếng nước ngoài, hãy tìm thông tin hỗ trợ y tế của quận hoặc thành phố bạn đang ở.',
      },
    ],
  },
  {
    id: 'tax',
    title: 'Giấy tờ lương và thuế hay gặp',
    titleJp: '給与明細・税の書類',
    icon: 'receipt',
    color: '#D35400',
    description: 'Hiểu phiếu lương, giấy tổng kết cuối năm và lúc nào cần giữ lại cho hồ sơ.',
    prefilledQuestion:
      'Hãy giải thích cho tôi các giấy tờ lương và thuế thường gặp ở Nhật theo kiểu dễ hiểu, đặc biệt lúc đổi việc hoặc làm hồ sơ.',
    sections: [
      {
        title: '3 loại giấy nhiều người đi làm hay gặp',
        content: 'Bạn không cần nhớ toàn bộ hệ thống thuế, nhưng nên nhận ra vài loại giấy rất hay được hỏi lại.',
        items: [
          'Phiếu lương hàng tháng để xem lương gộp, khấu trừ và lương thực nhận.',
          'Giấy tổng kết thu nhập cuối năm để dùng khi làm hồ sơ ngân hàng, visa hoặc khai thuế.',
          'Giấy liên quan thuế cư dân do nơi cư trú hoặc công ty xử lý tùy trường hợp.',
        ],
        tip: 'Nên giữ bản scan hoặc ảnh chụp rõ của các giấy này. Đổi việc rồi mới đi tìm lại thường rất mệt.',
      },
      {
        title: 'Khi nào cần đặc biệt để ý',
        content: 'Bạn không cần kiểm từng con số mỗi tháng, nhưng có vài thời điểm bắt buộc nên xem kỹ.',
        items: [
          'Khi đổi việc giữa năm hoặc nghỉ việc trước cuối năm.',
          'Khi lương thực nhận thấp bất thường và bạn không hiểu khoản trừ nào vừa tăng.',
          'Khi làm thủ tục visa, thuê nhà, vay tiền hoặc chứng minh thu nhập.',
        ],
        tip: 'Phần thuế sâu hơn như 年末調整 hay 確定申告 đã có guide riêng trong tab Thủ tục.',
      },
    ],
  },
  {
    id: 'post-office',
    title: 'Bưu điện, nhận hàng và gửi đồ',
    titleJp: '郵便局・荷物の受け取り',
    icon: 'mail',
    color: '#2980B9',
    description: 'Nhận thư bảo đảm, gửi đồ, xử lý phiếu giao hàng lại và tránh thất lạc giấy tờ.',
    prefilledQuestion:
      'Hãy giải thích cho tôi cách nhận hàng, nhận thư bảo đảm và gửi đồ ở Nhật theo kiểu thực tế, dễ làm theo.',
    sections: [
      {
        title: 'Những loại thư và phiếu hay gặp',
        content: 'Không phải thư nào trong hòm cũng có thể để đó. Có loại bỏ qua vài ngày là rất phiền.',
        items: [
          'Phiếu phát hàng lại khi shipper đến mà bạn vắng nhà.',
          'Thư bảo đảm hoặc thư cần ký nhận từ ngân hàng, trường, cơ quan hành chính.',
          'Giấy báo thanh toán hoặc giấy nhắc nếu bạn chưa trả đúng hạn một số dịch vụ.',
        ],
        tip: 'Thư có dấu đỏ, thư bảo đảm hoặc thư từ cơ quan hành chính nên xử lý trước. Đừng để dồn rồi quên.',
      },
      {
        title: 'Cách nhận hàng cho đỡ lỡ',
        content: 'Nếu lịch sống của bạn thất thường, nên sớm tạo thói quen đổi lịch giao và theo dõi mã hàng.',
        items: [
          'Dùng mã tracking để biết ngày dự kiến giao.',
          'Nếu vắng nhà, đặt giao lại vào khung giờ mình có mặt hoặc chọn nhận ở điểm tiện hơn nếu dịch vụ hỗ trợ.',
          'Với giấy tờ quan trọng, nên kiểm tra tên người nhận và địa chỉ thật kỹ từ trước.',
        ],
        tip: 'Người mới chuyển nhà rất hay quên đổi địa chỉ nhận hàng, dẫn đến đơn vẫn chạy về chỗ cũ.',
      },
      {
        title: 'Gửi đồ và gửi giấy tờ',
        content: 'Gửi đồ ở Nhật khá dễ, nhưng gửi giấy tờ quan trọng thì nên chọn đúng loại dịch vụ.',
        items: [
          'Hàng thông thường có thể gửi qua bưu điện hoặc dịch vụ chuyển phát.',
          'Giấy tờ quan trọng nên chọn loại có tracking hoặc có ký nhận.',
          'Khi gửi quốc tế, phải kiểm tra trước loại hàng bị hạn chế và mẫu khai cần điền.',
        ],
        tip: 'Nếu là hồ sơ quan trọng, chụp lại trước khi gửi và giữ biên nhận đến khi nơi nhận xác nhận đã nhận đủ.',
      },
    ],
  },
  {
    id: 'earthquake',
    title: 'Động đất, mưa lớn và cảnh báo',
    titleJp: '地震・大雨・防災',
    icon: 'warning',
    color: '#C0392B',
    description: 'Không cần hoảng, nhưng cần biết phải làm gì trong 5 phút đầu và nên chuẩn bị gì ở nhà.',
    prefilledQuestion:
      'Hãy hướng dẫn tôi cách chuẩn bị ứng phó động đất và mưa lớn ở Nhật theo kiểu thực tế cho người sống một mình.',
    sections: [
      {
        title: 'Việc nên làm trước khi có sự cố',
        content: 'Chuẩn bị trước một lần sẽ giúp bạn đỡ hoảng hơn rất nhiều khi có cảnh báo thật.',
        items: [
          'Biết điểm tránh nạn gần nhà, gần ga và gần chỗ làm.',
          'Chuẩn bị sẵn nước, đồ ăn khô, pin dự phòng, đèn pin, thuốc cơ bản và bản sao giấy tờ quan trọng.',
          'Cài ứng dụng cảnh báo thiên tai hoặc ít nhất bật cảnh báo khẩn trên điện thoại.',
        ],
        tip: 'Đừng chờ tới khi có động đất mới đi tìm đèn pin, sạc dự phòng hay nước uống.',
      },
      {
        title: 'Khi động đất vừa xảy ra',
        content: 'Trong vài chục giây đầu, mục tiêu là bảo vệ đầu và tránh vật rơi, không phải chạy thật nhanh ra ngoài.',
        items: [
          'Tránh cửa kính, kệ đồ cao, bếp lửa và vật dễ đổ.',
          'Nếu đang ở trong nhà, tìm chỗ che đầu và giữ bình tĩnh đến khi rung mạnh qua đi.',
          'Nếu đang ngoài đường, tránh biển hiệu, tường gạch, cột điện và chỗ có nguy cơ rơi đổ.',
        ],
        tip: 'Nhiều chấn thương xảy ra vì chạy loạn khi rung chưa dứt, không phải vì rung trực tiếp.',
      },
      {
        title: 'Sau rung chấn và khi có cảnh báo mưa lớn',
        content: 'Giai đoạn sau đó mới là lúc phải quan sát thông tin chính thức và quyết định có nên di chuyển hay không.',
        items: [
          'Kiểm tra thông báo chính thức của địa phương, ga tàu và ứng dụng cảnh báo.',
          'Nếu có mùi gas, rò điện hoặc kết cấu nhà có dấu hiệu nguy hiểm, rời khỏi chỗ đó và báo quản lý hoặc cơ quan liên quan.',
          'Khi có cảnh báo mưa lớn, lũ hoặc sạt lở, đừng chờ thêm. Phải nhìn bản đồ nguy cơ khu mình ở.',
        ],
        tip: 'Lúc thiên tai, nguồn tin đáng tin nhất là cảnh báo chính thức và chính quyền địa phương, không phải tin đồn trên mạng xã hội.',
      },
    ],
  },
];
