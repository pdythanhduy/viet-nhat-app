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
        image: require('../../../assets/content/daily-life/dl_sim_s1.jpg'),
        imageCaption: '格安SIM・MVNO — các loại SIM phổ biến tại Nhật, khác nhau về thoại, data và điều kiện hợp đồng',
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
    description: 'Phân biệt 2 loại bảo hiểm y tế, cách đăng ký, mức đóng thực tế và xử lý khi mất việc hoặc đổi việc.',
    sections: [
      {
        title: 'Hai loại bảo hiểm y tế — phân biệt ngay từ đầu',
        content:
          'Mọi người cư trú hợp pháp ở Nhật đều phải tham gia bảo hiểm y tế. Có 2 hệ thống chính, khác nhau về cách đăng ký và mức đóng.',
        items: [
          '健康保険 — Shakai Hoken (bảo hiểm qua công ty): áp dụng khi bạn làm việc đủ điều kiện tại công ty tham gia hệ thống này. Phí được trừ thẳng từ lương — công ty trả khoảng 50%, bạn trả 50% còn lại. Mức đóng tính theo thu nhập.',
          '国民健康保険 — Kokumin Kenkou Hoken (NHK, bảo hiểm quốc dân): dành cho người không được bảo hiểm qua công ty — du học sinh, người làm part-time không đủ điều kiện, người tự kinh doanh, người giữa hai công ty. Đăng ký tại phường/quận.',
          'Phí NHK: tính theo thu nhập năm trước + số người trong hộ + địa phương — không cố định. Người mới sang năm đầu tiên thường có phí rất thấp hoặc gần như 0 vì chưa có thu nhập khai báo ở Nhật.',
          'Cả hai diện đều cho phép khám với mức tự trả khoảng 30% chi phí (người lớn). Phần còn lại do quỹ bảo hiểm chi trả.',
        ],
        tip: 'Không đăng ký NHK khi đủ điều kiện là vi phạm quy định — và phí sẽ được tính hồi tố từ ngày đăng ký cư trú, không phải từ ngày bạn đăng ký muộn.',
        image: require('../../../assets/content/daily-life/dl_health-insurance_s1.jpg'),
        imageCaption: '健康保険証 / 国民健康保険証 — hai loại thẻ bảo hiểm y tế chính tại Nhật',
      },
      {
        title: 'Đăng ký NHK — làm ở đâu và cần gì',
        content:
          'Nếu không có bảo hiểm qua công ty, đây là việc cần làm sớm ngay sau khi đăng ký địa chỉ cư trú.',
        items: [
          'Nơi đăng ký: văn phòng phường/quận (市区町村役場) — cùng nơi đăng ký địa chỉ cư trú.',
          'Giấy tờ cần mang: thẻ cư trú, My Number Card hoặc giấy thông báo My Number.',
          'Có thể làm cùng ngày với đăng ký địa chỉ — nên hỏi ngay tại quầy “国民健康保険の加入手続き” (thủ tục tham gia bảo hiểm quốc dân).',
          'Từ 02/12/2024, thẻ 保険証 giấy đã bị bãi bỏ. Kết quả sau đăng ký: nếu bạn có My Number Card đã liên kết bảo hiểm → dùng マイナ保険証; nếu chưa → bên bảo hiểm gửi 資格確認書 qua bưu điện để dùng khi đi khám.',
          'Nếu thu nhập thấp hoặc khó khăn tài chính, có thể xin giảm/miễn phí NHK (減額・免除申請) — hỏi trực tiếp tại phường.',
        ],
        tip: 'Nếu công ty mới của bạn có bảo hiểm qua công ty, bạn sẽ tự động chuyển sang 健康保険 — lúc đó cần mang thẻ NHK cũ ra phường để hủy đăng ký và tránh bị tính phí trùng.',
      },
      {
        title: 'Khi mất việc hoặc giữa hai công ty',
        content:
          'Đây là giai đoạn nhiều người bị hở bảo hiểm vì không biết mình cần làm gì.',
        items: [
          'Khi nghỉ công ty: bảo hiểm qua công ty kết thúc vào ngày cuối cùng làm việc (hoặc cuối tháng tùy quy định).',
          'Tùy chọn 1 — Đăng ký NHK: đến phường trong vòng 14 ngày sau khi mất bảo hiểm công ty. Phí tính theo thu nhập năm trước.',
          'Tùy chọn 2 — Tiếp tục 健康保険 cũ (任意継続): có thể giữ bảo hiểm công ty cũ tối đa 2 năm nhưng phải tự đóng cả 2 phần (công ty + cá nhân) — thường tốn hơn NHK trừ khi thu nhập cao.',
          'Không nên bỏ trống bảo hiểm dù chỉ vài ngày — nếu bị tai nạn hoặc bệnh trong thời gian đó sẽ phải trả 100%.',
        ],
        tip: 'So sánh phí NHK (phường tính được ngay khi bạn đến đăng ký) với phí 任意継続 (hỏi bộ phận HR công ty cũ) trước khi quyết định.',
      },
      {
        title: 'Thêm người thân vào bảo hiểm công ty (扶養)',
        content:
          'Nếu bạn có bảo hiểm qua công ty (社会保険), có thể thêm vợ/chồng hoặc con vào diện phụ thuộc miễn phí thêm phí.',
        items: [
          'Điều kiện: người thân đang sống cùng ở Nhật, thu nhập của họ dưới ngưỡng quy định (thường dưới 1,3 triệu yên/năm).',
          'Thủ tục: làm qua bộ phận HR của công ty — nộp giấy tờ chứng minh quan hệ gia đình và tình trạng thu nhập.',
          'Sau khi được duyệt, người thân nhận thẻ bảo hiểm y tế riêng và dùng như bình thường — không phát sinh thêm chi phí bảo hiểm hàng tháng.',
        ],
        tip: 'Nếu vợ/chồng hoặc con bạn vừa sang Nhật, hỏi HR ngay về thủ tục thêm vào 扶養 — làm sớm hơn luôn tiện hơn.',
      },
    ],
  },
  {
    id: 'nenkin-pension',
    title: 'Nenkin — lương hưu và hoàn tiền khi về nước',
    titleJp: '年金・脱退一時金',
    icon: 'cash',
    color: '#8E44AD',
    description: 'Hiểu 2 loại nenkin, mức đóng thực tế, miễn giảm khi thu nhập thấp và quan trọng nhất — cách xin hoàn tiền khi rời Nhật.',
    sections: [
      {
        title: 'Hai loại Nenkin và ai đóng cái nào',
        content:
          'Nenkin (年金) là hệ thống lương hưu bắt buộc ở Nhật. Người nước ngoài cũng phải tham gia nếu đủ điều kiện.',
        items: [
          '厚生年金 (Kousei Nenkin): dành cho người làm việc đủ điều kiện tại công ty tham gia hệ thống 社会保険. Phí trừ thẳng từ lương — công ty trả khoảng 50%, bạn trả 50%. Mức đóng khoảng 9,15% lương (2025) — kiểm tra Japan Pension Service cho năm hiện tại.',
          '国民年金 (Kokumin Nenkin): dành cho người không ở diện công ty — du học sinh, người làm part-time, người tự kinh doanh. Phí cố định hàng tháng, khoảng 17.510 yên/tháng (FY2025, từ tháng 4/2025) — xác nhận mức FY2026 hiện hành tại nenkin.go.jp.',
          'Trên phiếu lương: khoản “厚生年金保険料” là tiền nenkin bị trừ. Nếu bạn thấy khoản này, bạn đang ở diện 厚生年金.',
          'Nghĩa vụ bắt đầu từ 20 tuổi với người cư trú hợp pháp ở Nhật — kể cả người nước ngoài.',
        ],
        tip: 'Ngay cả khi bạn không định ở Nhật đến tuổi về hưu, vẫn nên đóng đầy đủ — vì bạn có thể xin hoàn tiền khi về nước.',
      },
      {
        title: 'Miễn giảm Kokumin Nenkin khi thu nhập thấp',
        content:
          'Nếu đang trong diện Kokumin Nenkin và thu nhập thấp, có thể xin miễn hoặc giảm phí — không phải ai cũng biết điều này.',
        items: [
          '免除申請 (menjo): xin miễn toàn bộ hoặc một phần phí Nenkin dựa trên thu nhập. Làm tại phường/quận hoặc qua Myna Portal.',
          '猶予制度 (yuuyo): dành riêng cho người từ 20–50 tuổi có thu nhập thấp — tạm hoãn đóng, không bị ghi nợ. Cũng làm tại phường.',
          'Được miễn/hoãn vẫn tính là đã tham gia hệ thống — không bị ảnh hưởng đến tư cách cư trú hoặc hồ sơ visa.',
          'Nếu sau này thu nhập tăng, có thể đóng bổ sung các tháng đã miễn (追納) trong vòng 10 năm.',
        ],
        tip: 'Du học sinh và người làm part-time thu nhập thấp rất hay bỏ qua quyền lợi này. Hỏi ngay tại phường khi đăng ký 国民年金.',
      },
      {
        title: '脱退一時金 — xin hoàn tiền Nenkin khi rời Nhật (quan trọng)',
        content:
          'Đây là quyền lợi đặc biệt dành cho người nước ngoài rời Nhật — được hoàn lại một phần tiền Nenkin đã đóng. Rất nhiều người không biết hoặc bỏ lỡ thời hạn.',
        items: [
          'Điều kiện: đã đóng Nenkin ít nhất 6 tháng, không có quốc tịch Nhật, đã xuất cảnh khỏi Nhật, chưa có quyền hưởng lương hưu Nhật.',
          'Thời hạn nộp đơn: trong vòng 2 năm kể từ ngày xuất cảnh — sau thời hạn này mất quyền xin hoàn.',
          'Cách xin: gửi bưu điện hoặc qua người đại diện ở Nhật lên Japan Pension Service (日本年金機構) sau khi đã ra khỏi Nhật. Mẫu đơn 脱退一時金請求書 tải tại nenkin.go.jp.',
          'Số tiền hoàn: tính theo số tháng đóng và mức lương bình quân — không phải toàn bộ. Tối đa 60 tháng 厚生年金 (kiểm tra quy định hiện hành tại nenkin.go.jp).',
          'Lưu ý hiệp định song phương Việt–Nhật (ký 2021): nếu bạn có thể tính thời gian đóng BHXH Việt Nam vào hồ sơ Nhật, xem thêm tại nenkin.go.jp hoặc hỏi lãnh sự quán.',
        ],
        tip: 'Trước khi về nước: chụp ảnh 基礎年金番号通知書 (giấy thông báo số nenkin). Từ tháng 4/2022, 年金手帳 đã bị bãi bỏ — số này là định danh duy nhất để nộp hồ sơ từ Việt Nam.',
        image: require('../../../assets/content/daily-life/dl_nenkin_s3.jpg'),
        imageCaption: '脱退一時金申請書 — mẫu xin hoàn tiền nenkin khi rời Nhật, nộp cho Japan Pension Service',
      },
      {
        title: 'Điền form 脱退一時金請求書 — từng trường và phần ngân hàng nước ngoài',
        content:
          'Form này gồm 2 phần: thông tin cá nhân và thông tin ngân hàng nhận tiền. Phần ngân hàng nước ngoài là nơi nhiều người điền sai nhất.',
        items: [
          '【Thông tin cá nhân】 氏名: họ tên đầy đủ bằng chữ Latin như trong hộ chiếu. 生年月日: ngày sinh theo định dạng 年/月/日 (ví dụ: 1995年03月20日). 国籍: "ベトナム".',
          '【Thông tin cá nhân】 基礎年金番号: số 10 chữ số trên giấy thông báo nenkin — chia làm 2 phần "4 số — 6 số". Ví dụ: "1234 — 567890".',
          '【Thông tin cá nhân】 最後に日本に住所を有しなくなった年月日: ngày bạn rời Nhật lần cuối (ngày xuất cảnh trên hộ chiếu).',
          '【Ngân hàng nước ngoài】 SWIFT/BICコード: mã định danh ngân hàng quốc tế. Một số ngân hàng Việt Nam: Vietcombank → BFTVVNVX, BIDV → BIDVVNVX, Vietinbank → ICBKVNVX, Agribank → VBAAVNVX, Techcombank → VTCBVNVX.',
          '【Ngân hàng nước ngoài】 口座名義 (tên chủ tài khoản): viết đúng y chang tên trong hồ sơ ngân hàng Việt Nam — thường là họ tên IN HOA không dấu theo thứ tự tên-họ. Ví dụ: "VAN A NGUYEN" hoặc "NGUYEN VAN A" tùy ngân hàng. Sai tên là tiền bị trả về.',
          '【Ngân hàng nước ngoài】 口座番号: số tài khoản ngân hàng Việt Nam (không phải số thẻ). Tìm trong app ngân hàng phần "thông tin tài khoản".',
        ],
        tip: 'Chuẩn bị trước khi điền: ảnh chụp 基礎年金番号通知書, hộ chiếu (trang có ảnh + trang stamp xuất cảnh), và screenshot thông tin tài khoản ngân hàng Việt Nam. Gửi kèm bản photo hộ chiếu 2 trang trên khi nộp đơn.',
      },
      {
        title: 'Giấy tờ cần giữ liên quan Nenkin',
        content:
          'Giấy tờ Nenkin là thứ dễ thất lạc nhất khi chuyển nhà hoặc rời Nhật — nhưng lại rất khó phục hồi.',
        items: [
          'Giữ bản chụp hoặc scan: tất cả phiếu lương (bảng lương) hàng tháng, thông báo từ Japan Pension Service, phiếu đóng tiền 国民年金.',
          'Số 基礎年金番号 (Kiso Nenkin Bangou): đây là mã định danh Nenkin cá nhân — giống số BHXH ở Việt Nam. Lưu lại cẩn thận.',
          'Nếu đổi việc: công ty mới thường hỏi số này để tiếp nối hồ sơ Nenkin. Không cung cấp được sẽ cần xử lý thêm.',
          'Khi chuyển từ 厚生年金 sang 国民年金 (nghỉ việc) hoặc ngược lại: làm thủ tục chuyển đổi tại phường trong vòng 14 ngày.',
        ],
        tip: 'Tạo một thư mục riêng trên điện thoại hoặc email để lưu ảnh tất cả giấy tờ liên quan Nenkin — bạn sẽ cần chúng sau nhiều năm.',
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
        image: require('../../../assets/content/daily-life/dl_apartment_s1.jpg'),
        imageCaption: 'Cửa hàng bất động sản (不動産) — xem niêm yết giá thuê, điều kiện đặt cọc và lễ kim trực tiếp trên cửa kính',
      },
      {
        title: 'Hồ sơ thường bị hỏi',
        content:
          'Bộ hồ sơ khác nhau theo từng công ty, nhưng có vài giấy tờ gần như lúc nào cũng cần.',
        items: [
          'Thẻ cư trú (在留カード) và hộ chiếu — bản gốc để xác nhận, bản photo để nộp kèm hồ sơ.',
          'Giấy xác nhận việc làm (在職証明書) hoặc giấy tờ chứng minh thu nhập (源泉徴収票 / phiếu lương 3 tháng gần nhất). Người mới sang dưới 1 năm thường cần thêm thư xác nhận từ công ty.',
          'Số điện thoại Nhật đang dùng — không thể để số Việt Nam vì bên cho thuê cần liên lạc ngay.',
          'Nếu không có người bảo lãnh cá nhân: dùng công ty bảo lãnh (保証会社) — phí thường 0.5–1 tháng tiền nhà, trả một lần khi ký.',
        ],
        tip: 'Nếu hồ sơ còn yếu (ví dụ mới sang, visa còn ngắn, thu nhập thấp), nói thật ngay từ đầu để môi giới lọc đúng nhóm nhà có khả năng đậu — thay vì nộp nhiều chỗ rồi bị từ chối cùng lúc.',
      },
      {
        title: 'Điền 入居申込書 — form đăng ký vào ở, từng ô quan trọng',
        content:
          'Đây là form môi giới đưa trước khi xét duyệt. Điền đầy đủ và chính xác ngay lần đầu tạo ấn tượng tốt — điền thiếu làm chậm quá trình.',
        items: [
          '氏名 + フリガナ: họ tên đầy đủ và cách đọc bằng KATAKANA. Ví dụ: 氏名 → "Nguyen Van A", フリガナ → "グエン バン ア". Lưu ý: phải viết katakana, không phải hiragana.',
          '在留資格 / 在留期間: sao chép chính xác từ thẻ cư trú. Ví dụ: 在留資格 → "技術・人文知識・国際業務", 在留期間 → "2027年03月15日まで".',
          '勤務先: tên công ty, địa chỉ, số điện thoại công ty và 雇用形態 (正社員/契約社員/アルバイト). Nếu mới bắt đầu làm, ghi thêm 入社日 (ngày vào công ty).',
          '年収 (thu nhập hằng năm): điền tổng lương gộp trước thuế. Nếu chưa đủ 1 năm: lương tháng × 12. Ví dụ lương 250,000 yên/tháng → ghi "300万円" (3.000.000 yên).',
          '緊急連絡先: họ tên, quan hệ, số điện thoại và địa chỉ. Gia đình ở Việt Nam ghi số quốc tế (+84...). Quan hệ ghi bằng tiếng Nhật: 父 (cha), 母 (mẹ), 兄 (anh), 姉 (chị), 友人 (bạn bè).',
        ],
        tip: 'Chuẩn bị trước khi đến văn phòng: thu nhập hằng năm ước tính, địa chỉ và số điện thoại công ty, và thông tin liên hệ khẩn cấp. Mang theo thẻ cư trú và hộ chiếu để đối chiếu.',
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
        image: require('../../../assets/content/daily-life/dl_apartment_s3.jpg'),
        imageCaption: 'Chìa khóa căn hộ Nhật — nhận xong phải chụp toàn bộ hiện trạng nhà ngay hôm đó để đối chiếu khi trả nhà',
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
    description: 'Tên nhà cung cấp thực tế theo vùng, thứ tự ưu tiên mở dịch vụ, chi phí trung bình và lỗi hay gặp.',
    sections: [
      {
        title: 'Thứ tự ưu tiên khi mới chuyển nhà',
        content:
          'Gas phải đặt lịch với kỹ thuật viên — cái này dễ bị quên nhất và làm tối đầu tiên không có nước nóng.',
        items: [
          '1. Gas (ガス): gọi điện hoặc đăng ký online cho công ty gas khu vực TRƯỚC ngày chuyển vào ít nhất 3–5 ngày làm việc. Cần có mặt tại nhà khi kỹ thuật viên đến mở van — không tự mở được. Tokyo Gas: 0570-002211 | Osaka Gas: 0120-0-94817 | các tỉnh khác tra "○○ガス 開栓" trên Google.',
          '2. Điện (電気): đăng ký online trên trang công ty điện khu vực — thường có form tiếng Nhật và xử lý trong 1–2 ngày. Không cần kỹ thuật viên đến nhà. Tokyo/Kanto: TEPCO (tepco.co.jp) | Kansai: 関西電力 (kepco.co.jp) | Chubu: 中部電力 (chuden.co.jp).',
          '3. Nước (水道): đăng ký với 水道局 (cục nước) của thành phố/quận — thường có form online hoặc điện thoại. Nhiều nơi nước đã được mở sẵn, chỉ cần đăng ký tên người dùng để nhận hóa đơn.',
          '4. Internet: hỏi rõ khi xem nhà — nhà có 光回線 (cáp quang) sẵn hay phải tự đăng ký mới. Nếu phải tự đăng ký, cần đặt trước 2–4 tuần vì có thể cần kỹ thuật viên đến lắp đặt.',
        ],
        tip: 'Trong lúc chờ internet cố định, dùng data điện thoại (pocket wifi hoặc tethering) để không bị đứt mạng. Một số nhà mạng cho mượn thiết bị pocket wifi trong thời gian chờ.',
        image: require('../../../assets/content/daily-life/dl_utilities_s1.jpg'),
        imageCaption: 'ガス開栓・引越し手続き — gas phải đặt lịch kỹ thuật viên trước ngày chuyển vào, không tự mở được',
      },
      {
        title: 'Chi phí điện, gas, nước trung bình tham khảo',
        content:
          'Con số này phụ thuộc vào vùng, mùa, diện tích và thói quen — nhưng giúp bạn có khung tham chiếu.',
        items: [
          'Điện: căn hộ 1K–1DK người sống một mình thường 2.000–5.000 yên/tháng mùa hè/thu. Mùa đông dùng sưởi điện hoặc điều hòa heating có thể tăng lên 6.000–10.000 yên.',
          'Gas: tùy loại bếp và có dùng máy nước nóng gas không. Thông thường 1.500–4.000 yên/tháng cho 1 người.',
          'Nước: thường 1.000–2.000 yên/tháng (hóa đơn thường 2 tháng/lần, tức 2.000–4.000 yên mỗi lần nhận).',
          'Internet cố định (hikari fiber): khoảng 4.000–6.000 yên/tháng tùy gói và nhà mạng. Nhiều chung cư có gói internet chung giá thấp hơn (~1.000–2.000 yên).',
          'Tổng tiện ích cơ bản (điện + gas + nước + internet): người sống 1 mình trung bình khoảng 10.000–15.000 yên/tháng.',
        ],
        tip: 'Mùa hè Nhật rất nóng (35–38°C ở nhiều vùng) — chạy điều hòa 24/7 là bình thường và cần thiết, không nên tiết kiệm điện đến mức ảnh hưởng sức khỏe. Tiền điện tháng 7–9 có thể tăng 30–50%.',
      },
      {
        title: 'Internet cố định — chọn gói thế nào',
        content:
          'Người mới hay bị nhầm về loại đường truyền và ký hợp đồng không phù hợp với căn hộ.',
        items: [
          'Trước tiên hỏi ban quản lý tòa nhà: căn hộ đã có 光回線 (cáp quang) dẫn vào chưa? Nếu có, bạn chỉ cần chọn nhà cung cấp dịch vụ, không cần lắp thêm dây.',
          'Các nhà cung cấp lớn: NTT フレッツ光 (nền tảng), SoftBank Hikari, au Hikari, NURO 光 — tốc độ và giá tương đương, khác nhau ở hợp đồng và bundled với điện thoại.',
          'Hợp đồng thường 2 năm — phí hủy sớm từ 10.000–20.000 yên. Đừng ký nếu không chắc ở nhà đó đủ thời gian.',
          'Nếu ở nhà dưới 6 tháng hoặc di chuyển thường xuyên: dùng pocket wifi (WiMAX, SoftBank Air) linh hoạt hơn, không cần lắp đặt, nhưng tốc độ thấp hơn và giá thường 3.000–5.000 yên/tháng.',
        ],
        tip: 'Khi đăng ký internet tại Nhật Bản, rất nhiều form chỉ có tiếng Nhật — dùng Google Translate trên máy tính để dịch form. Cần kiên nhẫn và chuẩn bị thẻ ngân hàng hoặc tài khoản thanh toán.',
      },
      {
        title: 'Lỗi phổ biến và cách tránh',
        content:
          'Hầu hết rắc rối không đến từ dịch vụ mà từ bỏ sót bước đơn giản.',
        items: [
          'Không đổi địa chỉ gửi hóa đơn: thư vẫn về nhà cũ — thanh toán trễ, bị phí phạt hoặc bị cắt dịch vụ.',
          'Bỏ quên ngày đóng tiền: tự động trừ (口座振替) giải quyết hoàn toàn vấn đề này — đăng ký ngay khi mở dịch vụ.',
          'Tưởng đã đăng ký xong nhưng chưa: kiểm tra email xác nhận hoặc thư từ nhà cung cấp trong hòm thư vật lý.',
          'Bị cắt điện/gas do không đóng tiền: khôi phục thường mất 1–2 ngày làm việc và có thể bị thu phí tái kết nối.',
          'Không thông báo ngày dọn ra khi trả nhà: hóa đơn tiếp tục chạy dù không còn ở đó. Gọi điện hoặc đăng ký online để hủy dịch vụ trước ngày rời.',
        ],
        tip: 'Tạo nhắc nhở điện thoại vào ngày 25–28 mỗi tháng để kiểm tra số dư tài khoản ngân hàng đủ trả hóa đơn tự trừ.',
      },
    ],
  },
  {
    id: 'trash',
    title: 'Phân loại rác đúng cách',
    titleJp: 'ごみの分別・粗大ごみ',
    icon: 'trash',
    color: '#27AE60',
    description: 'Các nhóm rác với tên tiếng Nhật, đồ cần xử lý riêng, quy trình bỏ rác cỡ lớn và lỗi thường bị nhắc nhở.',
    sections: [
      {
        title: 'Việc đầu tiên sau khi chuyển đến',
        content:
          'Quy tắc rác ở Nhật rất cụ thể và khác nhau theo từng quận/thành phố — không có cách dùng chung toàn quốc.',
        items: [
          'Lấy lịch rác chính thức: xin tại văn phòng phường, hoặc tìm trên website thành phố — gõ "[tên thành phố] ごみ 分別 カレンダー". Nhiều thành phố có app riêng.',
          'Kiểm tra điểm bỏ rác (ごみ置き場) của tòa nhà và khung giờ cho phép — thường phải bỏ vào sáng ngày thu gom, không bỏ tối hôm trước.',
          'Hỏi ban quản lý tòa nhà: có bắt buộc dùng túi rác màu đặc trưng của quận không — một số quận bán túi rác riêng (指定ごみ袋), bỏ túi khác bị trả lại.',
        ],
        tip: 'Túi rác bị phân loại sai thường không bị thu gom và để lại kèm giấy nhắc. Bị nhắc thường xuyên có thể dẫn đến phàn nàn từ ban quản lý tòa nhà.',
        image: require('../../../assets/content/daily-life/dl_trash_s1.jpg'),
        imageCaption: 'Lịch thu rác (ごみ収集カレンダー) — mỗi quận/thành phố có lịch riêng, xin tại văn phòng phường hoặc tải trên website',
      },
      {
        title: 'Các loại rác và tên tiếng Nhật',
        content:
          'Tên gọi có thể khác nhau đôi chút theo địa phương, nhưng logic phân loại thường như sau:',
        items: [
          '燃えるごみ / 可燃ごみ (rác đốt được): thức ăn thừa, túi nylon, giấy thường, khăn giấy, vải cũ, rác bếp — loại phổ biến nhất, thu 2–3 lần/tuần.',
          '燃えないごみ / 不燃ごみ (rác không đốt được): sứ vỡ, thủy tinh, gương, kim loại nhỏ (dao, nắp), đồ nhựa cứng — thu ít thường xuyên hơn, 1–2 lần/tháng.',
          '資源ごみ / リサイクル (rác tái chế): chai PET rửa sạch và bỏ nắp, lon nhôm/sắt, chai thủy tinh, giấy báo buộc thành bó, bìa carton gấp phẳng.',
          'プラスチック (nhựa mềm/bao bì nhựa): ở nhiều địa phương tách riêng khỏi 燃えるごみ — bao gồm túi đựng thực phẩm, bao bì đã rửa sạch.',
          '古着・古紙 (quần áo cũ, giấy cũ): một số khu có điểm thu riêng hoặc ngày thu riêng.',
        ],
        tip: 'Bao bì thực phẩm có ký hiệu "プラ" (nhựa) hoặc "PET" — đây là gợi ý phân loại. Đọc kỹ bao bì trước khi bỏ vào nhóm rác nào.',
        image: require('../../../assets/content/daily-life/dl_trash_s2.jpg'),
        imageCaption: 'Phân loại rác theo màu túi và biển báo — mỗi loại có ngày thu gom riêng theo lịch địa phương',
      },
      {
        title: 'Đồ cần xử lý đặc biệt — không được bỏ vào rác thường',
        content:
          'Đây là nhóm dễ bị xử lý sai nhất vì nhiều người không biết.',
        items: [
          'Pin (電池): mang đến hộp thu pin tại combini, siêu thị hoặc điểm thu địa phương — không bỏ vào rác thường.',
          'Bật lửa và bình xịt (スプレー缶・ライター): phải xả hết gas trước khi bỏ — nếu còn gas sẽ gây nổ khi thu gom. Nhiều quận có ngày thu riêng.',
          'Đồ điện tử nhỏ (小型家電): điện thoại cũ, máy tính bảng, máy tính cầm tay — có hộp thu riêng tại combini, siêu thị hoặc phường.',
          'Đèn huỳnh quang / bóng đèn (蛍光灯): không bỏ rác thường — có điểm thu riêng hoặc ngày thu đặc biệt.',
          'Thuốc thừa: mang lại nhà thuốc hoặc bệnh viện — không đổ xuống bồn rửa hoặc toilet.',
        ],
        tip: 'App phân loại rác của nhiều thành phố (ví dụ: "東京都 ごみアプリ") có thể tìm kiếm từng món đồ và tra xem bỏ vào loại rác nào.',
      },
      {
        title: 'Rác cỡ lớn (粗大ごみ) — phải đặt lịch, phải mua phiếu',
        content:
          'Bàn, ghế, nệm, tủ, xe đạp, máy giặt, tivi... không được bỏ ở điểm rác thường. Phải đặt lịch riêng và trả phí.',
        items: [
          'Bước 1 — Đặt lịch: gọi điện hoặc đăng ký online trên website thành phố (tìm "[tên thành phố] 粗大ごみ 申し込み"). Sẽ được thông báo ngày thu gom và mã số.',
          'Bước 2 — Mua phiếu xử lý (粗大ごみ処理券): mua tại combini theo mệnh giá quy định. Giá tùy kích thước và loại đồ — thường 400–2.000 yên/món.',
          'Bước 3 — Dán phiếu và để đồ ra đúng chỗ: ngày thu gom, dán phiếu lên đồ và để ở điểm thu gom chỉ định trước giờ quy định.',
          'Xe đạp: phải đăng ký riêng với quận — một số khu không thu chung với 粗大ごみ thông thường.',
          'Đồ điện gia dụng lớn (家電リサイクル法): tivi, tủ lạnh, máy giặt, điều hòa không được xử lý qua 粗大ごみ thông thường — phải mang ra điểm thu riêng và trả phí riêng.',
        ],
        tip: 'Không bỏ 粗大ごみ ra đường hoặc điểm rác thường — đây là vi phạm và có thể bị xử phạt. Nếu đồ còn dùng được, đăng lên Mercari hoặc mang đến 2nd Street/Hard Off sẽ kiếm lại được ít tiền thay vì trả phí xử lý.',
        image: require('../../../assets/content/daily-life/dl_trash_s4.jpg'),
        imageCaption: 'Rác cỡ lớn (粗大ごみ) chờ thu gom — phải đặt lịch trước và mua phiếu xử lý tại combini',
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
        title: 'Điền form 転居届 và 住民異動届 khi chuyển nhà',
        content:
          'Khi chuyển nhà ở Nhật có hai loại thủ tục khác nhau hay bị nhầm: một loại ở 役所 để cập nhật hộ khẩu, một loại ở bưu điện để chuyển tiếp thư. Cả hai đều cần làm.',
        items: [
          '【Tại 役所 — Cập nhật địa chỉ hộ khẩu (住民異動届)】\n・Điền form 住民異動届 tại quầy 市区町村役所.\n・異動事由: chọn “転居” (cùng thành phố/quận) hoặc “転入” (từ nơi khác đến) — đọc kỹ, chọn sai sẽ phải làm lại.\n・転出入年月日: ngày bạn thực sự chuyển đến.\n・新住所: địa chỉ mới chính xác như trên hợp đồng thuê nhà.\n・氏名 + 生年月日 + 現住所 (địa chỉ cũ): điền đúng với 在留カード.\n・Mang theo: 在留カード (bắt buộc), My Number Card hoặc thông báo My Number, 印鑑 nếu có.\n・Sau khi làm xong: 在留カード sẽ được đóng dấu địa chỉ mới ngay tại quầy.',
          '【Tại bưu điện — Chuyển tiếp thư 1 năm (転居届)】\n・Lấy form 転居届 (mẫu màu vàng) tại quầy bưu điện hoặc tải trên website e転居.\n・Ghi: 旧住所 (địa chỉ cũ), 新住所 (địa chỉ mới), 氏名, ngày chuyển đến.\n・Nộp tại quầy kèm giấy tờ xác minh danh tính (My Number Card hoặc 在留カード).\n・Hiệu lực bắt đầu sau 3–5 ngày làm việc và kéo dài 1 năm.',
          '⚠️ Quan trọng: 転居届 ở bưu điện KHÔNG bao gồm thư có in “転送不要” — loại này bưu điện sẽ trả về nơi gửi. Thư ngân hàng, thẻ My Number, thông báo từ cơ quan nhà nước thường là loại 転送不要. Phải tự liên hệ từng nơi để đổi địa chỉ.',
        ],
        tip: 'Làm cả hai càng sớm càng tốt — lý tưởng nhất là trong 14 ngày kể từ ngày chuyển nhà. Nếu chuyển từ quận/thành phố khác: làm 転出届 ở nơi cũ trước, rồi mang giấy 転出証明書 đến 役所 nơi mới.',
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
    description: 'Những nhầm lẫn thực tế hay gặp nhất về giấy tờ, thuế, bảo hiểm và thủ tục hành chính ở Nhật.',
    sections: [
      {
        title: 'My Number ≠ My Number Card — hai thứ hoàn toàn khác nhau',
        content:
          'Khi nghe “cần My Number”, nhiều người vội đi làm thẻ vật lý. Thực ra phần lớn thủ tục chỉ cần số 12 chữ số, không cần thẻ nhựa.',
        items: [
          'Chỉ cần số (12 chữ số): khai báo thuế 確定申告, đăng ký bảo hiểm xã hội tại nơi làm, điền form ngân hàng có ô “マイナンバー”.',
          'Cần thẻ vật lý (My Number Card): in giấy tờ hành chính ở máy combini (コンビニ交付), dùng làm マイナ保険証 thay thẻ bảo hiểm giấy, đăng nhập Mynaportal.',
          'Số My Number đã tồn tại từ lúc bạn đăng ký 住民票 — xem trong thư 役所 gửi về nhà (phong bì có dán tem màu). Không có thẻ ≠ không có số.',
          'Làm thẻ My Number Card phải đặt riêng, chờ thư mời khoảng 1 tháng, rồi đến 役所 nhận tận tay — không cấp ngay trong ngày.',
        ],
        tip: 'Mỗi lần có thủ tục hỏi My Number, hỏi ngay: “số hay thẻ?” — câu đó tránh được nhiều chuyến đi thừa.',
      },
      {
        title: '転居届 không bảo vệ được thư ghi “転送不要”',
        content:
          'Nộp 転居届 ở bưu điện để chuyển tiếp thư là đúng nhưng chưa đủ — nhiều loại thư quan trọng nhất lại chính xác là loại sẽ không đến nhà mới.',
        items: [
          '”転送不要” in trên mặt thư: bưu điện sẽ trả thư về nơi gửi thay vì chuyển đến địa chỉ mới, bất kể bạn đã nộp 転居届 hay chưa.',
          'Những thứ thường ghi 転送不要: thẻ ngân hàng mới/tái cấp, thư thông báo của 役所, thư từ cơ quan thuế, giấy tờ bảo hiểm nhân thọ, bảng sao kê chứng khoán.',
          'Dịch vụ chuyển tiếp thông thường có thời hạn 1 năm — hết thời hạn, thư về địa chỉ cũ sẽ mất hẳn, không báo lại bạn.',
          'Sau khi chuyển nhà, cần cập nhật địa chỉ trực tiếp với: ngân hàng, 役所 (住所変更), nhà mạng, bảo hiểm, và trường/công ty.',
        ],
        tip: 'Ưu tiên cập nhật địa chỉ ngân hàng trong tuần đầu sau khi chuyển nhà — thẻ ngân hàng ghi 転送不要 và nếu mất thư, việc xin lại thẻ mới rất mất công.',
      },
      {
        title: 'Có bảo hiểm y tế không có nghĩa bạn chỉ trả 30%',
        content:
          'Bảo hiểm y tế Nhật bảo trợ 70% phần trong phạm vi — nhưng rất nhiều dịch vụ phổ biến lại nằm ngoài phạm vi bảo hiểm, bạn trả 100%.',
        items: [
          '保険適用 (có bảo hiểm): khám bệnh thông thường, chẩn đoán hình ảnh, thuốc theo đơn, phẫu thuật cần thiết — bạn trả 30%, bảo hiểm trả 70%.',
          '自由診療 (ngoài bảo hiểm, tự trả 100%): nha khoa thẩm mỹ (tẩy trắng, niềng thẩm mỹ), vaccine tự nguyện (cúm, HPV dành cho người lớn), khám sức khỏe định kỳ theo yêu cầu công ty, phẫu thuật mắt LASIK.',
          'Phòng riêng tại bệnh viện (差額ベッド代): phần chênh lệch giá phòng riêng so với phòng thường không thuộc bảo hiểm — có thể tốn thêm 5,000–20,000 yên/ngày.',
          'Chi phí đặt kính, kính áp tròng, thiết bị trợ thính: không bảo hiểm trừ một số trường hợp y tế đặc biệt có chỉ định bác sĩ.',
        ],
        tip: 'Trước mỗi lần khám, đặc biệt ở nha khoa, hỏi thẳng: “これは保険適用ですか？” — câu này tránh được nhiều bất ngờ khi thanh toán.',
      },
      {
        title: '年末調整 của công ty ≠ bạn không cần khai thuế gì thêm',
        content:
          'Công ty làm 年末調整 giúp bạn cuối năm là đúng, nhưng nó chỉ tính tiền lương từ đúng công ty đó. Nhiều trường hợp bạn vẫn phải tự nộp 確定申告 thêm.',
        items: [
          'Bắt buộc tự nộp 確定申告 nếu: có thu nhập từ 2 nơi trở lên (gồm part-time thứ hai), có thu nhập phụ (freelance, bán hàng, bán lại hàng online) trên 200,000 yên/năm, hoặc nghỉ việc giữa năm mà không vào chỗ mới.',
          'Nên tự nộp để được hoàn thuế nếu: chi phí y tế trong năm trên 100,000 yên (医療費控除), mới mua nhà lần đầu năm đó (住宅ローン控除 năm đầu bắt buộc tự nộp), hoặc đóng ふるさと納税 nhiều tỉnh mà không dùng ワンストップ特例.',
          '年末調整 công ty không tính: thu nhập ngoài công ty, khoản khấu trừ y tế, khoản khấu trừ vay nhà năm đầu.',
          'Hạn nộp 確定申告: 15/2–15/3 cho thu nhập năm trước. Nếu bạn được hoàn tiền (還付申告), nộp muộn cũng không bị phạt — nhưng nếu còn thiếu thuế, sẽ phát sinh lãi chậm nộp.',
        ],
        tip: 'Nếu bạn chỉ làm một việc toàn thời gian và không có thu nhập phụ nào cả năm, 年末調整 công ty là đủ. Ngay khi bắt đầu có thêm nguồn thu ngoài lương chính, hãy tìm hiểu về 確定申告 ngay.',
      },
      {
        title: 'Nhiều thứ ở Nhật không xử lý trong ngày — và thời gian chờ khác nhau nhiều',
        content:
          'Nhật nổi tiếng hiệu quả, nhưng nhiều thủ tục hành chính và dịch vụ thiết yếu có thời gian xử lý cố định mà không thể rút ngắn dù bạn giải thích gấp.',
        items: [
          'My Number Card: đăng ký xong nhận thư mời (~1 tháng), đến 役所 nhận thẻ (thêm vài ngày làm việc). Không thể nhận ngay trong ngày đăng ký.',
          'Internet cố định (光回線): từ lúc đăng ký đến khi kỹ thuật viên đến kéo dây thường mất 2–4 tuần, một số vùng ngoại ô lên tới 6 tuần.',
          'Tài khoản ngân hàng truyền thống (Mizuho, SMBC, Mitsubishi UFJ): xét duyệt 1–3 tuần; nếu thời gian ở Nhật dưới 6 tháng, một số chi nhánh từ chối không giải thích.',
          'Giấy xác nhận cư trú (住民票), con dấu (印鑑登録証明書) tại 役所 đông: thường xong trong ngày nếu đến trực tiếp — nhưng tháng 3–4 (mùa chuyển nhà) chờ lâu hơn đáng kể.',
        ],
        tip: 'Thời điểm lý tưởng nhất để làm My Number Card và mở tài khoản ngân hàng là ngay tuần đầu khi bạn đã có địa chỉ ổn định — không phải khi bạn cần chúng gấp.',
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
        image: require('../../../assets/content/daily-life/dl_combini_s1.jpg'),
        imageCaption: 'Quầy dịch vụ combini — in tài liệu, scan, thanh toán hóa đơn, ATM và nhiều dịch vụ khác trong một điểm',
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
        image: require('../../../assets/content/daily-life/dl_transportation_s1.jpg'),
        imageCaption: 'Cổng soát vé (改札口) — chạm thẻ IC lúc vào và lúc ra, quên chạm lúc ra sẽ bị lỗi thẻ',
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
        image: require('../../../assets/content/daily-life/dl_transportation_s2.jpg'),
        imageCaption: 'Thẻ Suica (ICカード) — nạp tiền tại máy trong ga, combini hoặc ATM',
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
        image: require('../../../assets/content/daily-life/dl_transportation_s3.jpg'),
        imageCaption: 'Bãi giữ xe đạp (駐輪場) gần ga tàu — đậu đúng chỗ để tránh bị kéo đi và mất phí chuộc',
      },
    ],
  },
  {
    id: 'grocery',
    title: 'Mua thực phẩm và đồ dùng',
    titleJp: '食料品・日用品',
    icon: 'basket',
    color: '#F39C12',
    description: 'Chuỗi siêu thị rẻ nên biết, cách đọc nhãn thịt và hạn dùng, và mẹo mua cuối ngày.',
    sections: [
      {
        title: 'Siêu thị và chuỗi nên biết theo mục đích',
        content:
          'Mỗi chuỗi có điểm mạnh khác nhau. Biết chỗ phù hợp giúp tiết kiệm hơn là chạy theo khuyến mãi bừa.',
        items: [
          'Gyomu Super (業務スーパー): bán hàng số lượng lớn, giá rất rẻ, nhiều sản phẩm nhập khẩu châu Á — phù hợp người nấu ăn ở nhà thường xuyên.',
          'OK Store (オーケーストア): được biết đến là một trong những siêu thị thường nhật rẻ nhất — chủ yếu ở khu vực Kanto (Tokyo, Kanagawa, Saitama, Chiba).',
          'AEON / MaxValu: chuỗi lớn toàn quốc, hàng đa dạng, hay có sale cuối tuần và ngày lễ.',
          'Seiyu (西友): toàn quốc, nhiều chi nhánh mở 24h, giá ổn định — hiện thuộc sở hữu của KKR (từ 2021).',
          'Don Quijote (ドン・キホーテ): mở 24h, bán thực phẩm, hàng gia dụng, mỹ phẩm, điện tử — tiện khi cần mua ngoài giờ.',
          'Combini (7-Eleven, Lawson, FamilyMart): tiện nhưng giá cao hơn 20–40% so với siêu thị — chỉ nên ghé khi cần gấp.',
        ],
        tip: 'Nếu gần Gyomu Super, đây là ưu tiên số 1 cho gạo, dầu ăn, gia vị và đồ đông lạnh. Một số chi nhánh có gia vị Đông Nam Á và nguyên liệu nấu ăn châu Á.',
        image: require('../../../assets/content/daily-life/dl_grocery_s1.jpg'),
        imageCaption: 'Siêu thị Nhật — mỗi chuỗi có điểm mạnh khác nhau về giá và chủng loại hàng',
      },
      {
        title: 'Đọc nhãn thịt và kiêng ăn không cần biết nhiều tiếng Nhật',
        content:
          'Đọc nhầm nhãn thịt là lỗi rất phổ biến — nhất là người kiêng thịt heo hoặc thịt bò.',
        items: [
          '豚肉 (ぶたにく / butaniku): thịt heo.',
          '牛肉 (ぎゅうにく / gyuuniku): thịt bò.',
          '鶏肉 (とりにく / toriniku): thịt gà.',
          '羊肉 (ようにく / youniku): thịt cừu.',
          'ひき肉 (hikiniku): thịt xay — luôn kèm loại thịt phía trước, ví dụ 豚ひき肉 là thịt heo xay.',
          '合いびき肉 (あいびきにく): thịt xay hỗn hợp bò và heo trộn lẫn — hay nhầm nhất.',
        ],
        tip: 'Dùng Google Translate camera chụp bao bì là cách nhanh nhất khi không chắc. Cũng nên kiểm tra phần 原材料 (nguyên liệu) trong đồ chế biến sẵn nếu kiêng.',
        image: require('../../../assets/content/daily-life/dl_grocery_s2.jpg'),
        imageCaption: 'Nhãn thịt tươi tại siêu thị — ghi rõ loại thịt (豚肉/牛肉/鶏肉) và xuất xứ (国産/輸入)',
      },
      {
        title: 'Phân biệt 賞味期限 và 消費期限',
        content:
          'Hai dòng chữ này gần nhau nhưng nghĩa khác nhau — nhầm có thể ảnh hưởng đến sức khỏe.',
        items: [
          '賞味期限 (しょうみきげん): “ngon nhất trước ngày” — áp dụng cho đồ khô, hộp, đóng gói. Qua hạn một chút thường vẫn an toàn nhưng chất lượng giảm.',
          '消費期限 (しょうひきげん): “hạn sử dụng an toàn” — áp dụng cho đồ tươi, sashimi, bento, sữa tươi. Không nên dùng sau ngày này.',
          'Ngày ghi trên bao bì thường theo thứ tự: năm / tháng / ngày (例: 26.05.15 = 15 tháng 5 năm 2026).',
        ],
        tip: 'Nếu mua đồ làm sẵn (お惣菜) cuối ngày được giảm giá, kiểm tra 消費期限 — nhiều thứ hạn trong ngày hôm đó.',
        image: require('../../../assets/content/daily-life/dl_grocery_s3.jpg'),
        imageCaption: '賞味期限 = ngon nhất trước ngày; 消費期限 = hạn an toàn — không dùng sau ngày này',
      },
      {
        title: 'Mua cuối ngày để tiết kiệm đáng kể',
        content:
          'Nhiều siêu thị dán nhãn giảm giá (割引シール) vào đồ sắp hết hạn, thường từ 17–19h trở đi.',
        items: [
          'Nhãn vàng/đỏ 20–50% off thường xuất hiện trên sashimi, sushi, bento, thịt tươi và đồ làm sẵn.',
          'Cá và thịt tươi giảm giá mua về nấu ngay hoặc cho vào tủ đông ngay là an toàn và tiết kiệm.',
          'Bánh mì (パン) và đồ nướng thường được giảm khoảng 1–2 tiếng trước khi cửa hàng đóng cửa.',
          'Rau củ theo mùa thường rẻ hơn 30–50% so với trái mùa — tra từ khóa “旬の野菜” để biết mùa nào có gì.',
        ],
        tip: 'Không mua giảm giá vì giảm nếu không dùng kịp. Chỉ mua thêm khi có thể nấu ngay hoặc đông lạnh được.',
        image: require('../../../assets/content/daily-life/dl_grocery_s4.jpg'),
        imageCaption: 'Nhãn 半額 (giảm 50%) dán lên đồ sắp hết hạn — thường xuất hiện từ 17–19h tại siêu thị',
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
        image: require('../../../assets/content/daily-life/dl_banking_s1.jpg'),
        imageCaption: 'ATM tại combini (セブン銀行・ゆうちょ銀行) — dùng được 24/7, một số ngân hàng tính phí ngoài giờ hành chính',
      },
      {
        title: 'Điền form furikomi (振込) — từng trường cụ thể',
        content:
          'Chuyển khoản nội địa Nhật có 5 trường bắt buộc. Sai ở 預金種目 hoặc 口座名義 là hai lỗi phổ biến nhất — tiền không đến hoặc bị hoàn về.',
        items: [
          '① 金融機関名 — tên ngân hàng người nhận: "みずほ銀行", "三菱UFJ銀行", "ゆうちょ銀行", "PayPay銀行"... Phải đúng tên đầy đủ bằng tiếng Nhật.',
          '② 支店名 — tên chi nhánh: ví dụ "新宿支店", "渋谷支店". Tra trong app ngân hàng người nhận hoặc hỏi trực tiếp — không đoán. Sai chi nhánh là chuyển nhầm.',
          '③ 預金種目 — loại tài khoản: gần như luôn chọn 普通 (thông thường / savings). 当座 là tài khoản đặc biệt dành cho doanh nghiệp — chọn nhầm tiền sẽ không đến nơi.',
          '④ 口座番号 — số tài khoản: thường 7 chữ số. Nếu số ngắn hơn, thêm số 0 ở đầu. Ví dụ nhận được "12345" → nhập "0012345".',
          '⑤ 口座名義 — tên người nhận bằng KATAKANA: ví dụ "グエン バン ア" (Nguyễn Văn A). Viết họ trước, tên sau, cách nhau bằng dấu cách. Hệ thống đối chiếu tên với hồ sơ ngân hàng — sai một ký tự là bị từ chối tự động.',
        ],
        tip: 'Khi nhận thông tin tài khoản từ ai đó, xin ảnh chụp màn hình trong app ngân hàng của họ thay vì gõ tay qua tin nhắn — tránh nhầm số và nhầm ký tự katakana.',
        image: require('../../../assets/content/daily-life/dl_banking_s2.jpg'),
        imageCaption: 'Màn hình chuyển khoản (振込) — cần đúng tên ngân hàng, chi nhánh, số tài khoản và tên người nhận bằng kana',
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
    description: 'Chọn đúng loại phòng khám, mang đủ giấy tờ, vượt rào ngôn ngữ và biết khi nào gọi 119.',
    sections: [
      {
        title: 'Chọn đúng loại phòng khám — đỡ mất tiền và thời gian',
        content:
          'Vào thẳng bệnh viện lớn (病院) không có giấy giới thiệu (紹介状) thường bị thu thêm phụ phí 特別料金 từ 2.000–7.700 yên trở lên tùy cơ sở. Nên bắt đầu ở clinic (クリニック / 診療所) đúng chuyên khoa.',
        items: [
          '内科 (nội khoa): sốt, ho, cảm, mệt mỏi kéo dài, đau bụng, tiêu hóa — phổ biến nhất.',
          '皮膚科 (da liễu): phát ban, dị ứng da, nổi mề đay, mụn nặng.',
          '耳鼻咽喉科 (tai mũi họng): đau tai, viêm xoang, nghẹt mũi, đau họng kéo dài.',
          '整形外科 (chỉnh hình/cơ xương): đau lưng, bong gân, chấn thương khi làm việc hoặc tai nạn.',
          '眼科 (nhãn khoa): đỏ mắt, đau mắt, mỏi mắt, kính áp tròng.',
          '歯科 (nha khoa): đau răng, sâu răng, nhổ răng — không nằm trong bảo hiểm y tế thông thường một phần.',
        ],
        tip: 'Tìm clinic bằng Google Maps: gõ "内科 クリニック 近く" hoặc "皮膚科 近く". Nhiều nơi cho đặt lịch qua app hoặc website để không phải chờ quá lâu.',
        image: require('../../../assets/content/daily-life/dl_hospital_s1.jpg'),
        imageCaption: 'Bảng hiệu phòng khám (クリニック) — tìm đúng tên chuyên khoa như 内科, 皮膚科 trước khi vào',
      },
      {
        title: 'Giấy tờ cần mang và chi phí thực tế',
        content:
          'Mang đúng giấy tờ ngay từ đầu giúp buổi khám ngắn hơn và tránh bị tính phí không cần thiết.',
        items: [
          'Từ tháng 12/2024: 保険証 giấy đã bị bãi bỏ. Mang マイナ保険証 (My Number Card đã liên kết bảo hiểm) hoặc 資格確認書 (giấy xác nhận tư cách bảo hiểm — do bên bảo hiểm gửi nếu bạn chưa có My Number Card) — thiếu một trong hai phải tự trả 100%.',
          'お薬手帳 (sổ ghi toa thuốc): nếu đang uống thuốc thường xuyên, mang để tránh kê trùng hoặc tương tác xấu.',
          'Người lớn có bảo hiểm hợp lệ thường trả khoảng 30% chi phí trong phạm vi bảo hiểm.',
          'Khám ngoài giờ hành chính (時間外) hoặc ngày lễ thường bị cộng phụ phí 365–2.700 yên tùy loại cơ sở.',
          'Tiền mặt nên có sẵn vì không phải mọi clinic đều nhận thẻ.',
        ],
        tip: 'Nếu hóa đơn y tế trong tháng vượt ngưỡng (高額療養費制度), bạn được hoàn lại phần vượt. Hỏi văn phòng phường hoặc cơ quan bảo hiểm về thủ tục xin hoàn — không tự động trả lại.',
      },
      {
        title: 'Vượt rào ngôn ngữ khi khám bệnh',
        content:
          'Không biết tiếng Nhật vẫn khám được nếu chuẩn bị đúng công cụ.',
        items: [
          'VoiceTra: app miễn phí của NICT (Nhật Bản), dịch giọng nói 31 ngôn ngữ theo thời gian thực — phù hợp nhất để giải thích triệu chứng với bác sĩ.',
          'Google Translate camera: chụp đơn thuốc, tờ hướng dẫn hoặc bảng câu hỏi bệnh sử để dịch ngay.',
          'AMDA (tổ chức phi lợi nhuận y tế): có đường dây tư vấn đa ngôn ngữ hỗ trợ người nước ngoài trong tình huống y tế khó khăn.',
          'Trung tâm hỗ trợ người nước ngoài tỉnh/thành phố: thường có danh sách cơ sở y tế hỗ trợ tiếng Anh hoặc phiên dịch.',
          'Một số bệnh viện lớn có dịch vụ phiên dịch qua điện thoại — hỏi trước quầy tiếp nhận.',
        ],
        tip: 'Trước khi đến phòng khám, viết sẵn vào ghi chú điện thoại: triệu chứng, từ khi nào, mức độ đau (1-10), đang uống thuốc gì. Đưa điện thoại cho bác sĩ đọc nếu cần.',
      },
      {
        title: 'Khi nào gọi 119 và khi nào gọi #7119',
        content:
          'Xe cứu thương ở Nhật hoàn toàn miễn phí — nhiều người không gọi vì sợ tốn tiền, đây là hiểu nhầm nguy hiểm.',
        items: [
          'Gọi 119 ngay: bất tỉnh, co giật, khó thở nặng, đau ngực dữ dội, liệt tay chân đột ngột (nghi đột quỵ), chấn thương nặng.',
          'Gọi #7119 (救急安心センター): khi không chắc có cần gọi 119 không — nhân viên y tế trực 24h tư vấn xử lý tiếp theo. Hiện có tại Tokyo, Osaka, nhiều tỉnh lớn — kiểm tra tỉnh của bạn có hỗ trợ không.',
          'Nếu tỉnh bạn không có #7119: gọi số tư vấn y tế khẩn cấp của tỉnh đó (tìm trên website tỉnh) hoặc hỏi trực tiếp tại trung tâm hỗ trợ người nước ngoài.',
        ],
        tip: 'Lưu 119 và số hỗ trợ y tế tỉnh bạn vào danh bạ ngay hôm nay — lúc cấp cứu không có thời gian tìm kiếm.',
        image: require('../../../assets/content/daily-life/dl_hospital_s4.jpg'),
        imageCaption: 'Gọi 119 ngay khi khẩn cấp — xe cứu thương hoàn toàn miễn phí, gọi #7119 khi không chắc có cần gọi 119 không',
      },
    ],
  },
  {
    id: 'tax',
    title: 'Giấy tờ lương và thuế hay gặp',
    titleJp: '給与明細・税の書類',
    icon: 'receipt',
    color: '#D35400',
    description: 'Hiểu từng khoản trong phiếu lương, tại sao lương giảm từ tháng 6, và khi nào cần giữ 源泉徴収票.',
    sections: [
      {
        title: 'Đọc phiếu lương (給与明細) — từng khoản là gì',
        content:
          'Phiếu lương chia 2 phần: 支給 (khoản nhận) và 控除 (khoản bị trừ). Chênh lệch giữa hai phần là 差引支給額 — tiền thực về tài khoản.',
        items: [
          '支給 gồm: 基本給 (lương cơ bản), 残業代 (tăng ca), các 手当 (phụ cấp giao thông, nhà ở, chuyên cần...).',
          '控除 gồm: 健康保険 (~5% lương), 厚生年金 (~9.15%), 雇用保険 (~0.6%), 所得税 (thuế thu nhập khấu trừ tại nguồn), 住民税 (thuế cư dân — từ tháng 6 năm thứ hai).',
          'Nếu 残業代 = 0 trong tháng bạn làm thêm giờ, hỏi HR ngay — đây là dấu hiệu không trả tăng ca hợp lệ.',
          'Tổng 控除 thường chiếm 20–25% lương gộp — nếu cao hơn đột ngột mà không rõ lý do, kiểm tra lại từng dòng.',
        ],
        tip: 'Lần đầu nhận phiếu lương, so 差引支給額 với tiền thực chuyển vào tài khoản — nếu khớp, mọi thứ OK. Nếu lệch, hỏi HR.',
        image: require('../../../assets/content/daily-life/dl_tax_s1.jpg'),
        imageCaption: '給与明細 — phiếu lương hàng tháng ghi rõ lương gộp, khấu trừ thuế và các khoản bảo hiểm',
      },
      {
        title: '源泉徴収票 — giấy tổng kết thu nhập năm',
        content:
          'Đây là giấy tờ tài chính quan trọng nhất bạn nhận mỗi năm. Công ty phát vào tháng 12 hoặc đầu tháng 1 năm sau.',
        items: [
          '支払金額: tổng thu nhập gộp cả năm — số quan trọng nhất khi làm hồ sơ ngân hàng, vay nhà, gia hạn visa hoặc nộp 確定申告.',
          '源泉徴収税額: tổng thuế đã trừ qua lương — dùng để tính hoàn thuế nếu nộp 確定申告.',
          'Khi nghỉ việc giữa năm: công ty phát 源泉徴収票 trong vòng 1 tháng — cần cho công ty mới để làm 年末調整 chính xác.',
          'Nếu mất: phải xin lại từ công ty cũ (không tự in được). Quá trình có thể mất vài tuần nếu công ty đã thay người phụ trách.',
        ],
        tip: 'Nhận 源泉徴収票 xong là chụp ảnh ngay, lưu vào cloud. Đây là giấy dùng đi dùng lại mỗi khi cần chứng minh thu nhập.',
      },
      {
        title: '住民税 — tại sao lương tháng 6 tự nhiên giảm',
        content:
          '住民税 (thuế cư dân) là khoản bắt đầu bị trừ từ tháng 6 của năm thứ hai ở Nhật. Đây là lý do phổ biến nhất khiến lương thực nhận tháng 6 giảm bất ngờ.',
        items: [
          '住民税 tính dựa trên thu nhập của năm trước — được thông báo mỗi tháng 6, thu qua lương từ tháng 6 đến tháng 5 năm sau (12 kỳ).',
          'Năm đầu tiên ở Nhật (thu nhập thấp hoặc bằng 0): chưa bị trừ 住民税. Từ năm thứ hai trở đi, khoản này tự kích hoạt — nhiều người không biết trước.',
          'Mức 住民税 khoảng 10% thu nhập chịu thuế cộng thêm khoản cố định theo địa phương (~5,000–6,000 yên/tháng) — tổng cộng thường là 8,000–20,000+ yên/tháng.',
          'Khi nghỉ việc: 住民税 còn lại trong năm sẽ bị trừ một lần vào lương cuối (一括徴収), hoặc tự nộp theo phiếu từ 市区町村.',
        ],
        tip: 'Lương tháng 6 giảm ~10,000–25,000 yên so với tháng 5? Gần như chắc chắn là 住民税 vừa kích hoạt. Đây là bình thường, không phải lỗi.',
      },
      {
        title: 'Giấy tờ cuối năm công ty phát — đừng bỏ qua',
        content:
          'Tháng 11–12, nhiều công ty phát thêm mẫu giấy để nhân viên khai giảm thuế trong 年末調整. Khai đúng sẽ được hoàn thuế ngay trong tháng 12.',
        items: [
          '扶養控除等(異動)申告書: khai người phụ thuộc (vợ/chồng không có thu nhập, con dưới 16 tuổi). Không khai thì thuế cao hơn mức cần thiết.',
          '保険料控除申告書: khai bảo hiểm nhân thọ tự đóng, iDeCo (個人型確定拠出年金), bảo hiểm nhân thọ vợ/chồng — mỗi khoản giảm thuế trực tiếp.',
          '住宅ローン控除 (từ năm thứ hai mua nhà trở đi): năm đầu phải tự nộp 確定申告, từ năm thứ hai công ty xử lý qua 年末調整 nếu bạn nộp giấy đúng hạn.',
          'Những mẫu này phải nộp đúng hạn cho HR — nộp trễ thường xử lý lại vào tháng 1 năm sau.',
        ],
        tip: 'Nếu bạn đang đóng iDeCo hoặc bảo hiểm nhân thọ riêng, đừng quên khai — mỗi năm có thể giảm vài chục nghìn yên thuế phải nộp.',
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
        image: require('../../../assets/content/daily-life/dl_post-office_s1.jpg'),
        imageCaption: 'Bưu điện Nhật (郵便局) — nhận biết qua ký hiệu 〒 màu đỏ đặc trưng của Japan Post',
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
        image: require('../../../assets/content/daily-life/dl_post-office_s2.jpg'),
        imageCaption: 'Phiếu giao hàng lại (不在票) — điền vào để đặt lịch giao lại hoặc chọn nhận tại điểm tiện hơn',
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
        image: require('../../../assets/content/daily-life/dl_post-office_s3.jpg'),
        imageCaption: 'Quầy gửi hàng tại bưu điện — gửi giấy tờ quan trọng nên chọn dịch vụ có tracking và ký nhận',
      },
    ],
  },
  {
    id: 'earthquake',
    title: 'Động đất, bão và phòng thủ thiên tai',
    titleJp: '地震・台風・防災',
    icon: 'warning',
    color: '#C0392B',
    description: 'Hiểu thang cảnh báo, cài app đúng, chuẩn bị túi khẩn cấp và biết phải làm gì trong 30 giây đầu.',
    sections: [
      {
        title: 'Cài app và hiểu hệ thống cảnh báo của Nhật',
        content:
          'Nhật Bản có hệ thống cảnh báo thiên tai rất phát triển — nhưng phần lớn là tiếng Nhật. Phải chuẩn bị trước khi cần.',
        items: [
          'Yahoo!防災速報 (Yahoo Bosai): app miễn phí, phổ biến nhất ở Nhật, có thể đặt cảnh báo theo vị trí — cảnh báo động đất, sóng thần, mưa lớn, lũ lụt.',
          'NHK World Japan: app tin tức của NHK có tiếng Anh, phát thông báo thiên tai khẩn cấp đa ngôn ngữ.',
          'J-Alert (全国瞬時警報システム): hệ thống cảnh báo quốc gia phát qua loa phường, TV và điện thoại — không cần cài, nhưng cần biết tiếng còi và thông báo có nghĩa gì.',
          'Thang rung chấn Nhật (震度): từ 1 (rất nhẹ) đến 7 (thảm họa). Cấp 4 trở lên nên chú ý. Cấp 5 mạnh (5強) trở lên thường gây thiệt hại.',
          'Bản đồ nguy cơ thiên tai (ハザードマップ): tra địa chỉ nhà mình tại hazardmap.gsi.go.jp — xem khu mình có nằm trong vùng lũ, sóng thần hoặc sạt lở không.',
        ],
        tip: 'Cài Yahoo!防災速報 và bật thông báo vị trí ngay tuần đầu đến Nhật — việc này chỉ mất 3 phút nhưng có thể cực kỳ quan trọng.',
      },
      {
        title: 'Túi khẩn cấp (非常持出袋) — chuẩn bị sẵn một lần',
        content:
          'Cơ quan Quản lý Cháy nổ và Thảm họa Nhật Bản (消防庁) khuyến nghị mọi hộ gia đình nên có túi này. Không cần hoàn hảo — nhưng cần có.',
        items: [
          'Nước uống: ít nhất 1–1.5 lít/ngày/người, chuẩn bị cho 3 ngày.',
          'Đồ ăn khô 3 ngày: biscuit, thanh năng lượng, mì gói không cần nấu.',
          'Sạc dự phòng (モバイルバッテリー) đã sạc đầy và dây sạc.',
          'Đèn pin + pin dự phòng hoặc đèn pin tay quay.',
          'Thuốc cơ bản đang uống + băng gạc cơ bản.',
          'Bản sao giấy tờ quan trọng: thẻ cư trú, bảo hiểm, hộ chiếu, thẻ ngân hàng (để trong túi nhựa chống nước).',
          'Tiền mặt: ATM và thẻ thường không dùng được sau thảm họa lớn.',
        ],
        tip: 'Để túi này ngay cạnh cửa ra vào hoặc dưới gầm giường — không để trong tủ sâu. Kiểm tra pin và hạn đồ ăn mỗi 6 tháng.',
        image: require('../../../assets/content/daily-life/dl_earthquake_s2.jpg'),
        imageCaption: 'Túi khẩn cấp (非常持出袋) với đồ dùng 3 ngày — nước, đồ ăn khô, đèn pin, sạc dự phòng, giấy tờ quan trọng',
      },
      {
        title: 'Trong 30 giây đầu khi động đất xảy ra',
        content:
          'Phần lớn chấn thương không đến từ rung chấn trực tiếp mà từ vật rơi, kính vỡ và ngã do mất thăng bằng khi chạy.',
        items: [
          'Trong nhà: chui xuống bàn hoặc dùng tay/gối che đầu, bám giữ vật cố định, tránh cửa kính và kệ cao.',
          'Nếu đang nấu ăn: tắt bếp nếu an toàn — nhưng nếu rung đã mạnh thì ưu tiên bảo vệ đầu trước.',
          'Ngoài đường: tránh biển quảng cáo, cột điện, tường gạch cũ, mái nhà có nguy cơ đổ. Tìm chỗ trống và ngồi xuống.',
          'Trong thang máy: bấm nhiều tầng, thoát ra ngay tầng nào mở trước — không cố đợi tầng mình.',
          'Không chạy ra cầu thang hoặc cửa ngay khi đang rung — chờ rung mạnh qua đi trước.',
        ],
        tip: 'Sau rung chính có thể có dư chấn (余震) — đừng nghĩ đã xong. Tiếp tục đề phòng và nghe cảnh báo chính thức.',
        image: require('../../../assets/content/daily-life/dl_earthquake_s3.jpg'),
        imageCaption: 'Tư thế bảo vệ khi động đất — chui xuống bàn, che đầu, bám giữ (Drop-Cover-Hold)',
      },
      {
        title: 'Sau động đất và ứng phó bão / mưa lớn',
        content:
          'Giai đoạn sau thảm họa mới là lúc quyết định ở lại hay sơ tán.',
        items: [
          'Kiểm tra gas: nếu có mùi khí, mở cửa sổ, không bật điện/bật lửa, tắt van gas chính và ra ngoài.',
          'Điểm sơ tán khẩn cấp (緊急避難場所): thường là công viên lớn, trường học — tra trên bản đồ phường trước khi cần.',
          'Điểm trú ẩn dài hạn (避難所): thường là trường học, trung tâm cộng đồng — sẽ được thông báo sau thảm họa.',
          'Cảnh báo mưa lớn và lũ: Nhật dùng thang 5 cấp (警戒レベル) — cấp 4 là "hầu hết cần sơ tán", cấp 5 là "đã xảy ra thảm họa". Cấp 3 trở lên với người già/trẻ em/người khuyết tật nên sơ tán sớm.',
          'Bão (台風): theo dõi đường đi bão qua NHK World hoặc Yahoo!防災. Tích nước, thức ăn và sạc điện thoại trước khi bão đến.',
        ],
        tip: 'Lúc thiên tai, chỉ tin vào thông báo chính thức từ chính quyền địa phương và NHK. Tin từ mạng xã hội rất dễ sai lệch trong thời điểm hỗn loạn.',
        image: require('../../../assets/content/daily-life/dl_earthquake_s4.jpg'),
        imageCaption: 'Biển chỉ điểm sơ tán (避難場所) — biển xanh chữ trắng, tra vị trí trên bản đồ phường trước khi cần',
      },
    ],
  },
  {
    id: 'public-manners-etiquette',
    title: 'Phép lịch sự và văn hóa nơi công cộng',
    titleJp: 'マナー・公共の場でのルール',
    icon: 'people-circle',
    color: '#2E4057',
    description: 'Quy tắc trên tàu điện, với hàng xóm, nơi làm việc và chỗ công cộng — tránh vô tình gây phiền dù không cố ý.',
    sections: [
      {
        title: 'Trên tàu điện và tàu ngầm',
        content:
          'Tàu điện Nhật rất trật tự — nhưng quy tắc không được viết ra hết. Người mới rất dễ vô tình làm phiền.',
        items: [
          'Không nghe điện thoại trên tàu: bắt máy và nói chuyện điện thoại trong toa là điều tối kỵ. Nhắn tin và xem video (tai nghe) là bình thường.',
          'Chế độ im lặng (マナーモード): để điện thoại ở silent mode khi lên tàu.',
          'Ghế ưu tiên (優先席): nhường cho người cao tuổi, khuyết tật, phụ nữ mang thai, người bế con nhỏ — dù có vẻ không ai đang cần, vẫn nên để ý.',
          'Balô và túi to: trong giờ cao điểm (rush hour) nên đặt ba lô xuống cầm tay hoặc để lên kệ — không đeo sau lưng làm chật chỗ người đứng.',
          'Xếp hàng lên tàu: đứng đúng ô vạch kẻ sẵn dưới đất, nhường người xuống trước rồi mới lên.',
          'Thang cuốn (escalator): ở Tokyo — đứng bên trái, bên phải để người đi nhanh. Ở Osaka — ngược lại, đứng bên phải. Hiện các ga khuyến khích đứng cả hai bên nhưng thực tế vẫn theo thói quen cũ.',
        ],
        tip: 'Ăn uống trên tàu thường (trừ Shinkansen và tàu đường dài có ghế ngồi) là điều khiến hành khách Nhật khó chịu dù không ai nói thẳng.',
        image: require('../../../assets/content/daily-life/dl_manners_s1.jpg'),
        imageCaption: 'Biển nội quy trên tàu điện Nhật — không gọi điện, nhường ghế ưu tiên, giữ yên lặng trong toa',
      },
      {
        title: 'Hàng xóm và tòa nhà chung cư',
        content:
          'Quan hệ với hàng xóm ở Nhật thường ít tiếp xúc — nhưng có một số quy tắc không viết ra mà ai cũng kỳ vọng.',
        items: [
          'Chào hỏi khi mới chuyển đến (引越し挨拶): nên ghé 2–3 nhà hai bên và phía trên tặng một món quà nhỏ (bánh, khăn, xà phòng — khoảng 500–1.000 yên) và giới thiệu bản thân. Không làm điều này bị coi là thiếu lịch sự.',
          'Tiếng ồn sau 22h: căn hộ Nhật vách mỏng — tiếng giặt, tiếng giày, tiếng nhạc lớn đều vọng sang. Máy giặt và hút bụi sau 22h thường gây phàn nàn.',
          'Hành lang và cầu thang chung: không để đồ đạc, xe đạp hoặc thùng rác ra ngoài hành lang — đây là vi phạm quy định chung cư ở phần lớn tòa nhà.',
          'Nếu gây ra vấn đề (nước rò, tiếng ồn...): chủ động liên hệ hàng xóm hoặc quản lý tòa nhà sớm — ở Nhật người ta thường nhịn một thời gian dài trước khi khiếu nại.',
        ],
        tip: 'Giấy tờ liên quan tòa nhà (quy định nội bộ, lịch vệ sinh chung, phân loại rác) thường được để trong hòm thư ngay khi mới chuyển đến — đọc kỹ trước khi bỏ.',
      },
      {
        title: 'Nơi làm việc và trường học',
        content:
          'Văn hóa Nhật có nhiều tầng ngầm không được nói thẳng — đặc biệt trong môi trường làm việc.',
        items: [
          'Đến sớm hơn giờ làm: đúng giờ ở Nhật nghĩa là đến trước 5–10 phút. Đến đúng giờ đã bị coi là hơi trễ ở nhiều công ty.',
          'Báo nghỉ trước: nếu nghỉ ốm hoặc có việc, thông báo cho quản lý càng sớm càng tốt — ngay buổi sáng sớm hôm đó là chuẩn, không phải nhắn đêm hôm trước.',
          'Không ăn tại bàn làm việc ở nhiều môi trường công sở: có chỗ thì OK, nhưng nên quan sát trước.',
          'Trao nhận danh thiếp (名刺交換): dùng cả hai tay khi đưa và nhận, đọc qua trước khi cất — không nhét vào túi quần ngay.',
          'Ở trường: chào giáo viên khi vào/ra lớp, không ăn uống trong lớp học, không ngồi trên bàn là chuẩn mực cơ bản.',
        ],
        tip: 'Nếu không hiểu quy tắc không viết ra của công ty hoặc trường, cách an toàn nhất là quan sát người xung quanh làm gì trong tuần đầu tiên.',
      },
      {
        title: 'Tắm công cộng (銭湯 / 温泉) và các nơi đặc biệt',
        content:
          'Văn hóa tắm công cộng là một phần của đời sống Nhật — nhưng có quy tắc riêng mà người nước ngoài hay bỏ qua.',
        items: [
          'Tắm sạch người tại vòi sen (シャワー) trước khi vào bồn ngâm chung (浸かり湯) — đây là quy tắc tuyệt đối.',
          'Hình xăm (タトゥー): nhiều cơ sở cấm người có hình xăm vào bồn chung. Một số nơi có phòng riêng hoặc thời gian riêng — hỏi trước khi đến.',
          'Không mang điện thoại vào khu tắm — vi phạm quyền riêng tư và thường bị nhắc nhở.',
          'Khăn tắm nhỏ: được mang vào khu tắm nhưng không được thả xuống bồn chung — gấp lại để trên đầu hoặc để ngoài bồn.',
        ],
        tip: 'Nhiều 銭湯 (senTO) địa phương có giá rất rẻ (500–600 yên ở Tokyo) và là trải nghiệm văn hóa thực sự đáng thử.',
        image: require('../../../assets/content/daily-life/dl_manners_s4.jpg'),
        imageCaption: 'Cổng vào銭湯 / 温泉 — tắm sạch tại vòi sen trước khi vào bồn chung, không mang điện thoại vào khu tắm',
      },
    ],
  },
  {
    id: 'smart-shopping',
    title: 'Mua sắm thông minh — 100¥, Donki và đồ cũ',
    titleJp: '賢い買い物 — 100均・ドンキ・リサイクルショップ',
    icon: 'pricetag',
    color: '#8E44AD',
    description: 'Khai thác Daiso, Don Quijote, cửa hàng đồ cũ và Mercari để sống tốt hơn mà tốn ít hơn.',
    sections: [
      {
        title: 'Cửa hàng 100 yên — mua gì thì đáng, mua gì thì không',
        content:
          'Ba chuỗi lớn nhất: Daiso, Seria, CanDo. Giá hiện tại (2026) là 110 yên/món (gồm thuế), một số mặt hàng ở Daiso có giá 220 yên, 330 yên hoặc cao hơn.',
        items: [
          'Đáng mua: đồ bếp (đũa, bát, hộp đựng thức ăn, rổ, dao...), văn phòng phẩm, đồ vệ sinh nhà (bàn chải, giẻ, nước rửa chén nhỏ), phụ kiện điện thoại (cáp, ốp), hộp lưu trữ nhỏ.',
          'Seria được đánh giá cao hơn về chất lượng đồ dùng nhà bếp và đồ thủ công (stationery, craft).',
          'Không nên kỳ vọng quá cao ở đồ điện hoặc đồ dùng cần độ bền — pin, cáp sạc rẻ thường kém bền hơn nhiều so với thương hiệu.',
          'Daiso có phiên bản online (daiso-sangyo.co.jp) và nhiều chi nhánh lớn ở trung tâm thương mại có hàng đa dạng hơn chi nhánh nhỏ.',
        ],
        tip: 'Khi mới chuyển nhà, một chuyến Daiso có thể trang bị được 80% đồ bếp và vệ sinh cơ bản với 3.000–5.000 yên.',
      },
      {
        title: 'Don Quijote (ドン・キホーテ / Donki) — dùng đúng cách',
        content:
          'Donki mở 24h, bán đủ thứ từ thực phẩm đến điện tử — nhưng không phải mọi thứ đều rẻ như nhiều người nghĩ.',
        items: [
          'Rẻ thật sự ở Donki: mỹ phẩm nội địa Nhật (make-up, skincare), thực phẩm nhập khẩu, đồ ăn vặt, nước ngọt, bia rượu ngoài giờ.',
          'Nên so giá trước khi mua đồ điện tử ở Donki — giá không phải lúc nào cũng tốt hơn Bic Camera, Yodobashi hoặc Amazon Nhật.',
          'Donki có khu đồ ăn châu Á và Đông Nam Á ở nhiều chi nhánh lớn — nơi tìm gia vị và thực phẩm quen thuộc.',
          'Donki Tax Free: người nước ngoài có thể mua miễn thuế tiêu thụ với tổng hóa đơn từ 5.000 yên trở lên (trừ thực phẩm và đồ tiêu hao) — cần mang hộ chiếu.',
        ],
        tip: 'Donki đặc biệt hữu ích lúc cần mua đồ ngoài giờ hành chính khi siêu thị đã đóng cửa.',
      },
      {
        title: 'Cửa hàng đồ cũ — tiết kiệm lớn nếu biết tìm',
        content:
          'Đồ cũ ở Nhật thường được giữ gìn rất tốt. Mua đồ cũ đúng chỗ có thể tiết kiệm 50–80% so với mới.',
        items: [
          'Hard Off (ハードオフ): điện tử, nhạc cụ, đồ gia dụng cũ — chuỗi lớn toàn quốc. Nhánh Off House bán quần áo và đồ gia đình.',
          'Book Off (ブックオフ): sách, manga, CD/DVD, game cũ — rất rẻ, đặc biệt sách tiếng Nhật để luyện đọc.',
          '2nd Street (セカンドストリート): quần áo và đồ dùng tổng hợp — thường có ở khu dân cư lớn.',
          'Mercari (メルカリ): ứng dụng mua bán đồ cũ C2C lớn nhất Nhật Bản — có thể tìm mọi thứ từ quần áo đến đồ bếp, xe đạp, điện tử. Cần tài khoản và địa chỉ Nhật để nhận hàng.',
          'Yahoo! Auction (ヤフオク): nền tảng đấu giá lâu đời, hàng hiệu và đồ điện tử cũ — cần tài khoản Yahoo Japan.',
        ],
        tip: 'Khi mới chuyển nhà, một chuyến Hard Off hoặc Off House có thể tìm được tủ lạnh, lò vi sóng, bàn ghế cũ còn tốt với giá 2.000–10.000 yên.',
      },
      {
        title: 'Mua online ở Nhật — Amazon, Rakuten và ứng dụng',
        content:
          'Mua online ở Nhật rất phát triển và giao hàng nhanh — nhưng có một vài điểm cần lưu ý.',
        items: [
          'Amazon Japan (amazon.co.jp): giao hàng nhanh, nhiều sản phẩm có Prime Same-Day hoặc Next-Day ở khu đô thị lớn. Cần địa chỉ và số điện thoại Nhật.',
          'Rakuten (楽天市場): hệ thống điểm thưởng (Rakuten Points) phức tạp nhưng có lợi nếu dùng đúng — đặc biệt khi mua nhiều lần hoặc có thẻ Rakuten.',
          'Nếu mua ở Mercari: kiểm tra ảnh thật, rating người bán và phí ship trước khi mua. Hàng được giao qua bưu điện — không nhận hàng trực tiếp từ tay người bán.',
          'Không mua trên trang web không rõ nguồn gốc hoặc giá quá rẻ so với thị trường — hàng giả và scam online có ở Nhật dù ít hơn nhiều nơi khác.',
        ],
        tip: 'Đặt hàng Amazon với địa chỉ Amazon Locker (コンビニ受取) nếu thường xuyên vắng nhà — nhiều combini có điểm nhận Amazon và tự đến lấy trong 3 ngày.',
      },
    ],
  },
  {
    id: 'vietnamese-ingredients-japan',
    title: 'Tìm nguyên liệu Việt và nấu ăn ở Nhật',
    titleJp: 'ベトナム食材の探し方・日本での料理',
    icon: 'restaurant',
    color: '#C0392B',
    description: 'Mua nước mắm, rau Việt, bún phở ở đâu — theo từng vùng, theo chuỗi siêu thị và theo app.',
    sections: [
      {
        title: 'Siêu thị và chuỗi cửa hàng có nguyên liệu châu Á',
        content:
          'Không cần lên phố người Việt mới mua được gia vị quen — một số chuỗi lớn toàn quốc đã có hàng châu Á.',
        items: [
          'Kaldi Coffee Farm (カルディコーヒーファーム): chuỗi toàn quốc trong các trung tâm thương mại — có nước mắm (ナンプラー), tương ớt, cà ri, mì gạo, nước cốt dừa, sốt oyster và nhiều gia vị Đông Nam Á.',
          'Gyomu Super (業務スーパー): hay có gia vị châu Á theo lô lớn — sốt oyster, đường thốt nốt, nước cốt dừa đóng hộp, mì gạo khô. Hàng tùy chi nhánh.',
          'Don Quijote: khu đồ ăn nhập khẩu thường có sản phẩm Thái, Việt, Hàn — nước mắm, ớt tươi, rau gia vị đóng gói.',
          'AEON và MaxValu: khu 輸入食品 (đồ nhập khẩu) ở các chi nhánh lớn thường có mì gạo, nước cốt dừa, tương ớt.',
          'Siêu thị châu Á chuyên biệt: ở hầu hết tỉnh đều có ít nhất 1 cửa hàng chuyên đồ châu Á — tìm bằng Google Maps với từ khóa "アジア食材 近く" hoặc "ベトナム食材".',
        ],
        tip: 'Kaldi là lựa chọn dễ nhất toàn quốc. Nếu không tìm thấy chi nhánh gần, website Kaldi (kaldi.co.jp) có ship toàn quốc.',
        image: require('../../../assets/content/daily-life/dl_vietnamese-ingredients_s1.jpg'),
        imageCaption: 'カルディコーヒーファーム — chuỗi toàn quốc có gia vị châu Á, nước mắm, mì gạo và nguyên liệu Đông Nam Á',
      },
      {
        title: 'Khu phố và chợ châu Á theo vùng',
        content:
          'Các đô thị lớn đều có khu tập trung siêu thị và nhà hàng châu Á — nơi tìm được nguyên liệu đặc trưng nhất.',
        items: [
          'Tokyo — Shin-Okubo (新大久保, Shinjuku): phố Hàn Quốc nhưng có rất nhiều cửa hàng Việt, siêu thị châu Á, bán đủ từ rau muống, húng quế đến lá lốt tươi.',
          'Tokyo — Ikebukuro (池袋): khu phía tây ga có nhiều siêu thị châu Á, nhà hàng Việt và hàng nhập từ Việt Nam.',
          'Osaka — Tsuruhashi (鶴橋): khu người Hàn và châu Á lớn nhất Kansai — có siêu thị bán nguyên liệu Việt, Thái, Hàn.',
          'Nagoya — khu vực Osu (大須): có một số cửa hàng châu Á và cộng đồng người Việt đông.',
          'Hiroshima, Fukuoka, Hamamatsu: các tỉnh có cộng đồng người Việt lớn thường có chợ hoặc nhóm Facebook mua bán hàng Việt.',
        ],
        tip: 'Nhóm Facebook cộng đồng người Việt theo từng tỉnh là nguồn thông tin tốt nhất để biết mua gì ở đâu gần chỗ bạn ở.',
      },
      {
        title: 'Thay thế nguyên liệu khi không tìm được',
        content:
          'Một số nguyên liệu khó tìm hoặc đắt ở Nhật — nhưng có cách thay thế hợp lý.',
        items: [
          'Nước mắm: ナンプラー (nước mắm Thái) bán ở hầu hết siêu thị Nhật — vị gần giống, dùng được cho hầu hết món Việt.',
          'Rau muống (空心菜 / kūshinSai): hay có ở siêu thị châu Á và một số AEON lớn — mùa hè dễ tìm hơn.',
          'Húng quế tươi: siêu thị Nhật có basil tươi (バジル) nhưng là húng Ý, không phải húng quế Việt. Húng quế Việt tươi chủ yếu ở siêu thị châu Á.',
          'Bún gạo: ビーフン (miến/bún Trung Quốc) khác bún Việt nhưng dùng được cho nhiều món. Bún phở chính thống hay có ở Kaldi hoặc siêu thị châu Á.',
          'Lá dứa / lá chuối: hiếm ở siêu thị thường, phải tìm ở chợ châu Á hoặc mua đông lạnh online.',
          'Gạo Việt Nam: hầu hết gạo Nhật nấu cơm Việt được. Nếu muốn gạo hạt dài (tẻ), tìm ở siêu thị châu Á với tên タイ米 (gạo Thái) hoặc インディカ米.',
        ],
        tip: 'Amazon Nhật và Mercari có nhiều người bán gia vị Việt nhập khẩu — tìm bằng tiếng Việt hoặc tiếng Nhật như "ベトナム調味料" hoặc tên cụ thể.',
      },
      {
        title: 'Nấu ăn trên bếp và thiết bị Nhật',
        content:
          'Phần lớn căn hộ Nhật dùng bếp gas hoặc bếp IH (từ) — có vài điểm khác với bếp ở Việt Nam.',
        items: [
          'Bếp IH (IHクッキングヒーター): không dùng được với nồi đáy nhôm mỏng hoặc nồi đồng — cần nồi có ký hiệu IH ở đáy. Nồi inox đáy dày và nồi gang thường dùng được.',
          'Bếp gas căn hộ Nhật: thường chỉ có 2 bếp và tích hợp lò nướng cá nhỏ (グリル) bên dưới — không phải lò nướng bánh.',
          'Lò vi sóng (電子レンジ): nhiều căn hộ có combo lò vi sóng + lò nướng (オーブンレンジ) — có thể dùng nướng bánh hoặc hâm nóng.',
          'Nồi cơm điện (炊飯器): rất phổ biến ở Nhật, mua đồ cũ ở Hard Off giá 1.000–3.000 yên là OK cho người ở một mình.',
          'Hút mùi và thông gió: khi chiên xào nhiều, bật quạt thông gió (換気扇) mạnh để tránh khói kích hoạt đầu báo cháy — căn hộ Nhật hay gặp vấn đề này.',
        ],
        tip: 'Đầu báo khói trong căn hộ Nhật rất nhạy — nếu hay bị kêu khi nấu ăn, kiểm tra xem có thể tạm thời che lại hoặc mở cửa sổ trước khi chiên.',
      },
    ],
  },
  {
    id: 'mental-health-support',
    title: 'Sức khỏe tâm thần và hỗ trợ khi khó khăn',
    titleJp: 'メンタルヘルスと相談窓口',
    icon: 'heart-circle-outline',
    color: '#8E44AD',
    description: 'Cô đơn, áp lực, không hiểu văn hóa — rất bình thường khi mới sang Nhật. Biết gọi cho ai và tìm hỗ trợ ở đâu là điều quan trọng.',
    sections: [
      {
        title: 'Đường dây hỗ trợ — gọi ngay khi cần',
        content:
          'Nhật Bản có nhiều đường dây hỗ trợ tâm lý miễn phí, một số có tiếng Việt hoặc tiếng Anh.',
        items: [
          'よりそいホットライン: 0120-279-338 — miễn phí, 24/7, có hỗ trợ đa ngôn ngữ kể cả tiếng Việt (bấm phím theo hướng dẫn). Hỗ trợ mọi vấn đề từ cô đơn, stress đến khủng hoảng tâm lý.',
          'よりそいホットライン web chat: yorisoi-hotline.or.jp — nếu không muốn gọi điện, có thể nhắn tin qua trình duyệt.',
          'いのちの電話: 0120-783-556 — miễn phí, hoạt động nhiều giờ trong ngày, tiếng Nhật.',
          'TELL Lifeline (tiếng Anh): 03-5774-0992 — hỗ trợ bằng tiếng Anh cho người không nói được tiếng Nhật.',
          'Khẩn cấp tâm thần: gọi 119 (miễn phí) nếu bản thân hoặc người quen đang trong tình trạng nguy hiểm ngay lập tức.',
        ],
        tip: 'よりそいホットライン hỗ trợ tiếng Việt — gọi 0120-279-338 và chờ hướng dẫn chọn ngôn ngữ. Miễn phí kể cả từ điện thoại di động.',
      },
      {
        title: 'Tại sao cảm thấy khó khăn — và điều đó hoàn toàn bình thường',
        content:
          'Phần lớn người Việt mới sang Nhật đều trải qua giai đoạn khó khăn tâm lý — không phải vì bạn yếu, mà đây là phản ứng tự nhiên.',
        items: [
          'Văn hóa sốc (カルチャーショック): mọi thứ từ cách giao tiếp, ứng xử nơi công cộng đến thói quen hàng ngày đều khác — não bộ cần thời gian thích nghi.',
          'Cô đơn và thiếu kết nối: xa gia đình, bạn bè, ngôn ngữ khó khăn khiến việc tạo mối quan hệ mới tốn nhiều công sức hơn ở Việt Nam.',
          'Áp lực công việc và học tập: kỳ vọng cao, văn hóa làm việc khắt khe, sợ mắc lỗi — đặc biệt nặng nề trong năm đầu.',
          'Homesickness (nhớ nhà): nhớ đồ ăn, gia đình, không khí quen thuộc là rất phổ biến và không có gì đáng xấu hổ.',
          'Nếu những cảm giác này kéo dài nhiều tuần và ảnh hưởng đến sinh hoạt hàng ngày — hãy tìm hỗ trợ chuyên môn.',
        ],
        tip: 'Cộng đồng người Việt tại địa phương thường có nhóm Facebook hoặc Zalo — tìm theo tên tỉnh + "người Việt ở Nhật" để kết nối với người có cùng hoàn cảnh.',
      },
      {
        title: 'Trung tâm tư vấn người nước ngoài',
        content:
          'Hầu hết tỉnh thành ở Nhật đều có 国際交流センター hoặc 外国人相談窓口 — hỗ trợ tư vấn miễn phí về cuộc sống, pháp lý và tâm lý.',
        items: [
          '外国人生活支援ポータルサイト (Bộ Tư pháp Nhật): moj.go.jp — danh sách trung tâm tư vấn đa ngôn ngữ theo từng tỉnh.',
          'FRESC (Foreign Residents Support Center): fresc.moj.go.jp — hỗ trợ pháp lý và cuộc sống, nhiều ngôn ngữ, trực tuyến và trực tiếp.',
          'AMDA多文化医療サービス研究会: amdamedicalcenter.com — hỗ trợ y tế và tâm lý cho người nước ngoài, có phiên dịch.',
          '国際交流センター địa phương: tìm bằng Google Maps với từ khóa "国際交流センター [tên tỉnh]" — thường có tư vấn viên nói tiếng Anh hoặc có phiên dịch.',
          'Các cộng đồng Facebook người Việt theo tỉnh: nguồn hỗ trợ thực tế từ người đồng hương đã sống ở tỉnh đó nhiều năm.',
        ],
        tip: 'Đến 国際交流センター không cần lý do cụ thể — nhiều người đến chỉ để hỏi về cuộc sống hàng ngày. Không chỉ dành cho tình huống khẩn cấp.',
      },
      {
        title: 'Chăm sóc bản thân hàng ngày',
        content:
          'Không phải lúc nào cũng cần gọi điện — những thói quen nhỏ giúp duy trì sức khỏe tâm thần mỗi ngày.',
        items: [
          'Duy trì giờ ngủ và ăn đều đặn — mất ngủ và bỏ bữa là dấu hiệu sớm của stress mãn tính.',
          'Ra ngoài đi bộ ít nhất 20 phút mỗi ngày — ánh sáng tự nhiên và vận động nhẹ có tác dụng rõ rệt với tâm trạng.',
          'Giữ liên lạc đều đặn với gia đình và bạn bè ở Việt Nam — video call 1–2 lần mỗi tuần giúp giảm cảm giác cô lập.',
          'Tham gia hoạt động cộng đồng — 図書館 (thư viện) địa phương thường có sự kiện miễn phí mở cho mọi người.',
          'Giới hạn thời gian mạng xã hội nếu nó khiến bạn so sánh bản thân và cảm thấy tệ hơn.',
        ],
        tip: '図書館 (thư viện công) ở Nhật hoàn toàn miễn phí, yên tĩnh và ấm/mát — là nơi tốt để đọc sách, học tiếng Nhật hoặc đơn giản là ra khỏi phòng. Không cần thẻ thư viện để vào đọc tại chỗ.',
      },
    ],
  },
  {
    id: 'japan-seasons-weather',
    title: 'Thời tiết và 4 mùa ở Nhật',
    titleJp: '日本の四季と天気の備え',
    icon: 'partly-sunny-outline',
    color: '#2980B9',
    description: 'Nhật Bản có 4 mùa rõ rệt và một số hiện tượng thời tiết đặc thù — biết trước để chuẩn bị quần áo, sức khoẻ và chi phí điện nước đúng mùa.',
    sections: [
      {
        title: 'Xuân và mùa hoa anh đào (tháng 3–5)',
        content:
          'Mùa xuân dễ chịu nhất trong năm — nhưng cũng là mùa của 花粉症 (kafunsho / dị ứng phấn hoa) ảnh hưởng nhiều người nước ngoài.',
        items: [
          'Nhiệt độ: 8–20°C. Tháng 3 còn lạnh về đêm, tháng 4–5 ấm áp dễ chịu. Cần áo khoác mỏng đến hết tháng 3.',
          '🌸 Hoa anh đào (桜 / sakura): nở cuối tháng 3 đến đầu tháng 4 ở hầu hết Nhật Bản (Hokkaido muộn hơn, tháng 5). Thời gian nở chỉ khoảng 1–2 tuần — theo dõi dự báo sakura trên Yahoo!天気 hoặc NHK.',
          '🤧 花粉症 (kafunsho — dị ứng phấn hoa): mùa tuyết tùng (杉 / sugi) từ tháng 2–4, tiếp theo là tuyết bách (hinoki) tháng 4–5. Triệu chứng: hắt hơi, chảy nước mắt, ngứa mắt. Thuốc kháng histamine bán tự do ở combini và dược phòng.',
          'Nếu bị dị ứng lần đầu: đến クリニック để được kê đơn thuốc mạnh hơn — có thể dùng bảo hiểm y tế. Đeo khẩu trang N95 khi ra ngoài ngày phấn hoa cao.',
          'Tháng 5 (Golden Week): nhiều ngày lễ liên tiếp (29/4–5/5). Tàu xe, khách sạn, nhà hàng rất đông — đặt trước nếu cần đi đâu.',
        ],
        tip: 'App Yahoo!天気・災害 có phần dự báo 花粉情報 (mức phấn hoa theo ngày và tỉnh) — rất hữu ích trong mùa này.',
        image: require('../../../assets/content/daily-life/dl_seasons_s1.jpg'),
        imageCaption: 'Hoa anh đào (桜) nở tháng 3–4 — thời gian nở chỉ khoảng 1–2 tuần, theo dõi dự báo sakura trên Yahoo!天気',
      },
      {
        title: 'Mùa mưa và hè nóng (tháng 6–9)',
        content:
          'Đây là giai đoạn khó nhất với người mới sang — đặc biệt tháng 7–8 nóng ẩm cực độ.',
        items: [
          '☔ 梅雨 (tsuyu — mùa mưa): khoảng tháng 6–7, mưa liên tục nhiều ngày, độ ẩm 80–90%. Cần ô gấp (折り畳み傘), dép chống nước, và máy hút ẩm nếu ở trong nhà. Quần áo khó khô — dùng máy sấy hoặc máy giặt sấy.',
          '🥵 Mùa hè (tháng 7–9): Tokyo, Osaka, Nagoya thường 33–38°C, độ ẩm cao — cảm giác như 40°C+. Hokkaido mát hơn đáng kể (25–28°C).',
          'Nguy cơ sốc nhiệt (熱中症 / necchuusho): uống nước đều đặn kể cả khi không khát, tránh ra ngoài 11h–15h nếu không cần thiết, mang theo nước và khăn lạnh (冷感タオル bán ở combini).',
          'Chi phí điện mùa hè: điều hoà chạy 24/7 có thể đẩy tiền điện lên 8.000–15.000¥/tháng. Đặt 27–28°C + quạt tiết kiệm hơn đặt 24°C.',
          '🌀 Bão (台風 / taifu): mùa cao điểm tháng 8–10. Khi có cảnh báo: không ra ngoài khi gió cấp 8+, tích nước và đồ ăn trước 1–2 ngày, sạc đầy pin dự phòng. Theo dõi qua Yahoo!防災速報 hoặc NHK.',
        ],
        tip: 'Mua 経口補水液 (OS-1 hoặc tương đương) trữ sẵn — đây là nước bù điện giải cho người bị sốc nhiệt, hiệu quả hơn nước lọc thường khi cơ thể đã mệt.',
        image: require('../../../assets/content/daily-life/dl_seasons_s2.jpg'),
        imageCaption: 'Cảnh báo bão/mưa lớn mùa hè — theo dõi qua Yahoo!防災速報, tích nước và sạc điện thoại trước khi bão đến',
      },
      {
        title: 'Thu dễ chịu và lá đỏ (tháng 10–11)',
        content:
          'Mùa thu là thời điểm dễ chịu nhất để đi ra ngoài — nhiệt độ mát, không mưa nhiều.',
        items: [
          'Nhiệt độ: 15–25°C tháng 10, 8–18°C tháng 11. Cần áo khoác từ cuối tháng 10.',
          '🍁 Lá đỏ (紅葉 / kouyou): tháng 10–11 tùy vùng. Hokkaido đỏ từ tháng 10, Kanto và Kansai tháng 11–12. Công viên và đền chùa rất đông vào cuối tuần.',
          'Thời tiết ổn định, ít mưa, độ ẩm thấp — quần áo khô nhanh, điều hoà/sưởi chưa cần nhiều. Tiền điện thấp nhất trong năm.',
          'Chuẩn bị mua đồ đông sớm (tháng 10): áo phao, áo len dày, giày chống nước. Sau tháng 11 hàng sale thu đông hay hết size.',
        ],
        tip: 'Tháng 11 có nhiều đợt sale lớn (Black Friday, cuối mùa thu đông) tại AEON, Uniqlo và Don Quijote — thời điểm tốt để mua đồ đông giá tốt.',
        image: require('../../../assets/content/daily-life/dl_seasons_s3.jpg'),
        imageCaption: 'Lá đỏ mùa thu (紅葉 / もみじ) — tháng 10–11 tùy vùng, công viên và đền chùa rất đông vào cuối tuần',
      },
      {
        title: 'Mùa đông và tuyết (tháng 12–2)',
        content:
          'Đông Nhật Bản chia 2 vùng rõ rệt: Thái Bình Dương (Tokyo, Osaka) — lạnh khô, ít tuyết; Nhật Bản Hải (Niigata, Akita, Hokkaido) — tuyết rất nhiều.',
        items: [
          'Tokyo/Osaka: 2–10°C, tuyết hiếm (Tokyo tuyết 1–3 lần/năm, mỏng). Cần áo phao dày, khăn quàng, găng tay từ tháng 12.',
          'Niigata/Toyama/Hokkaido: có thể có 1–3m tuyết. Nếu làm việc ở các tỉnh này cần ủng chống tuyết, áo winter coat thật sự dày và lốp xe mùa đông (スタッドレスタイヤ).',
          '🔥 Sưởi: điều hoà chế độ sưởi (暖房) + コタツ (bàn có sưởi dưới) + 電気毛布 (chăn điện) là combo phổ biến. Tránh để máy sưởi dầu (石油ストーブ) trong phòng kín mà không thông gió — nguy cơ ngộ độc CO.',
          'Chi phí điện/gas mùa đông: 8.000–18.000¥/tháng tùy vùng và loại sưởi. Sưởi điện (エアコン) tiết kiệm hơn sưởi gas riêng lẻ.',
          '🎍 Oshogatsu (お正月 / Tết Nhật): 1–3/1. Hầu hết cửa hàng đóng hoặc rút ngắn giờ. Tích trữ đồ ăn từ 30/12. Combini và một số siêu thị AEON vẫn mở.',
          'Da khô và nứt nẻ: độ ẩm trong nhà mùa đông xuống dưới 30% — dùng máy tạo ẩm (加湿器) và kem dưỡng tay. Bán phổ biến ở Daiso và dược phòng.',
        ],
        tip: 'Uniqlo HEATTECH là lớp lót giữ nhiệt rất phổ biến — mua 2–3 bộ từ tháng 11 trước khi hết size. Loại Extra Warm dành cho vùng có tuyết.',
        image: require('../../../assets/content/daily-life/dl_seasons_s4.jpg'),
        imageCaption: 'Mùa đông có tuyết ở Nhật — Tokyo/Osaka ít tuyết, còn Niigata/Hokkaido có thể 1–3m tuyết',
      },
    ],
  },
  {
    id: 'furusato-nozei',
    title: 'ふるさと納税 — đóng thuế và nhận quà',
    titleJp: 'ふるさと納税のやり方と注意点',
    icon: 'gift-outline',
    color: '#E67E22',
    description: 'Người đi làm tại Nhật có thể quyên góp cho địa phương khác và nhận quà đặc sản — đồng thời được khấu trừ thuế địa phương tương đương. Người nước ngoài cư trú hợp pháp cũng dùng được.',
    sections: [
      {
        title: 'ふるさと納税 là gì và ai được dùng',
        content:
          'ふるさと納税 (Furusato Nozei — Thuế cố hương) cho phép bạn quyên góp cho địa phương bất kỳ ở Nhật, nhận quà đặc sản và được khấu trừ vào 住民税 (thuế địa phương) và 所得税 (thuế thu nhập) năm sau.',
        items: [
          'Người nước ngoài cư trú hợp pháp, có thu nhập và nộp thuế địa phương ở Nhật đều có thể tham gia — không phân biệt quốc tịch.',
          'Điều kiện thực tế: có địa chỉ cư trú chính thức ở Nhật và thu nhập đủ để có 住民税 sau khi trừ 2.000 yên phí tự chịu bắt buộc.',
          'Cơ chế: quyên 10.000 yên cho tỉnh A → nhận quà đặc sản trị giá ~3.000 yên → được giảm 住民税 năm sau ~8.000 yên → thực ra chỉ tốn 2.000 yên để nhận quà đó.',
          'Phí tự chịu luôn là 2.000 yên tổng — dù bạn quyên bao nhiêu tỉnh. Phần vượt hạn mức không được khấu trừ.',
          'Quà rất đa dạng: gạo, thịt bò Wagyu, hải sản, trái cây, mỹ phẩm, vé du lịch — tùy địa phương.',
        ],
        tip: 'Tra hạn mức của bạn tại satofull.jp hoặc furusato-tax.jp — nhập thu nhập và hoàn cảnh gia đình để biết có thể quyên tối đa bao nhiêu trước khi bắt đầu.',
        image: require('../../../assets/content/daily-life/dl_furusato_s1.jpg'),
        imageCaption: 'ふるさと納税 返礼品 — quà đặc sản địa phương nhận được khi quyên góp, chỉ tốn 2.000 yên phí tự chịu',
      },
      {
        title: 'Cách làm — 2 phương pháp thủ tục',
        content:
          'Sau khi quyên, có 2 cách xử lý thủ tục thuế: ワンストップ特例 (đơn giản hơn) hoặc 確定申告 (khai thuế tổng hợp).',
        items: [
          'Cách 1 — ワンストップ特例制度: không cần khai thuế riêng, chỉ nộp đơn xin ワンストップ cho từng địa phương bạn quyên. Điều kiện: quyên tối đa 5 địa phương khác nhau và không phải tự làm 確定申告 (đa phần người làm công ăn lương).',
          'Cách 2 — 確定申告: khai khi làm tờ khai thuế cuối năm — phù hợp với người quyên hơn 5 tỉnh hoặc vốn đã phải khai thuế riêng (tự kinh doanh, có thu nhập phụ).',
          'Các nền tảng phổ biến: さとふる (satofull.jp), ふるなび (furunavi.jp), 楽天ふるさと納税 — Rakuten có tích điểm Rakuten khi quyên.',
          'Deadline quan trọng: quyên trước 31/12 để tính vào năm thuế đó. Nộp đơn ワンストップ trước 10/1 năm sau.',
          'Nếu làm ワンストップ: địa phương gửi đơn qua bưu điện → điền, kèm bản sao giấy tờ tùy thân và gửi lại. Một số nền tảng cho phép làm online qua My Number Card.',
        ],
        tip: 'Dùng Rakuten ふるさと納税 nếu bạn đã có tài khoản Rakuten — tích điểm Rakuten thêm từ việc quyên, đặc biệt hiệu quả trong các đợt sale 0 và 5 của Rakuten.',
        image: require('../../../assets/content/daily-life/dl_furusato_s2.jpg'),
        imageCaption: 'さとふる / ふるなび — các nền tảng ふるさと納税 phổ biến để tra quà và hoàn tất thủ tục',
      },
      {
        title: 'Những điều cần cẩn thận',
        content:
          'ふるさと納税 có lợi nhưng cần hiểu đúng để không bị thiệt.',
        items: [
          'Hạn mức phụ thuộc thu nhập: thu nhập thấp → hạn mức thấp → nếu quyên nhiều hơn hạn mức thì phần vượt không được khấu trừ, mất tiền thật.',
          'Năm đầu đi làm ở Nhật: thu nhập chưa đủ 1 năm → hạn mức thấp hơn dự kiến — tính kỹ trước khi quyên.',
          'Phần quà chỉ chiếm ~30% giá trị quyên (quy định hiện hành): đây là khấu trừ thuế tiện được nhận quà, không phải mua hàng giảm giá 100%.',
          'Chuyển nơi cư trú trong năm: 住民税 bị tính theo tỷ lệ — hạn mức sẽ phức tạp hơn, nên tính lại trước khi quyên.',
          'Quà có thể giao chậm 1–3 tháng và không hoàn được — chọn mặt hàng và địa phương rõ ràng trước khi xác nhận.',
        ],
        tip: 'Người mới sang Nhật nên đợi đến khi có 1 năm làm việc đầy đủ mới thử — khi đó thu nhập ổn định, hạn mức dễ tính và không lo bị thiệt do thu nhập bất thường.',
      },
    ],
  },
  {
    id: 'moving-out-checklist',
    title: 'Trả nhà đúng cách (退去手続き)',
    titleJp: '退去手続き・原状回復・敷金返還',
    icon: 'home-outline',
    color: '#6C3483',
    description: 'Trả nhà sai thứ tự hoặc không hiểu nguyên tắc 原状回復 có thể mất tiền cọc oan hoặc bị đòi thêm tiền sửa chữa. Guide này giải thích rõ từng bước và quyền lợi của bạn.',
    sections: [
      {
        title: 'Thông báo trả nhà đúng hạn',
        content:
          'Hầu hết hợp đồng thuê nhà ở Nhật yêu cầu báo trước 1 tháng trước ngày trả nhà. Một số hợp đồng yêu cầu 2 tháng. Báo trễ hoặc không báo có thể bị tính thêm tiền thuê.',
        items: [
          'Đọc hợp đồng thuê nhà (賃貸借契約書) để xác nhận thời hạn báo trước (解約予告期間).',
          'Gửi thông báo bằng văn bản (fax, thư hoặc email) — không chỉ gọi điện. Giữ lại bản sao.',
          'Xác nhận ngày trả nhà chính thức với chủ nhà hoặc công ty quản lý (管理会社).',
          'Không ngừng trả tiền nhà trước ngày trả nhà chính thức, kể cả khi đã dọn đồ đi rồi.',
        ],
        tip: 'Nếu ký hợp đồng qua môi giới, liên hệ môi giới để nhận hướng dẫn thủ tục — nhiều chỗ có form thông báo tiêu chuẩn.',
      },
      {
        title: 'Hiểu nguyên tắc 原状回復 trước khi bàn giao',
        content:
          '原状回復 không có nghĩa bạn phải trả nhà y như mới. Hướng dẫn của 国土交通省 phân rõ: hao mòn tự nhiên (経年変化) là trách nhiệm chủ nhà; hư hại do lỗi người thuê mới phải bồi thường.',
        items: [
          'Chủ nhà chịu: phai màu tường do ánh sáng, hao mòn sàn do đi lại bình thường, ố vàng nhẹ theo thời gian.',
          'Người thuê chịu: đóng đinh nhiều lỗ lớn vào tường, vết bẩn không lau kịp thời, bỏng thuốc lá, vỡ kính do bất cẩn.',
          'Nếu chủ nhà yêu cầu trả chi phí mà bạn cho là hao mòn tự nhiên, có thể khiếu nại dựa vào Hướng dẫn 国土交通省.',
          'Chụp ảnh toàn bộ nhà trước khi bàn giao — từng góc, từng vết bẩn, từng bộ phận.',
        ],
        tip: 'Khi ký hợp đồng lúc vào nhà có biên bản hiện trạng không? Nếu có, so sánh với tình trạng hiện tại để biết điều gì đã thay đổi trong thời gian thuê.',
        image: require('../../../assets/content/daily-life/dl_moving-out_s2.jpg'),
        imageCaption: '原状回復チェック — phân biệt hao mòn tự nhiên (chủ nhà chịu) và hư hại do lỗi người thuê',
      },
      {
        title: 'Buổi kiểm tra bàn giao (立会い) và nhận lại tiền cọc',
        content:
          'Đa phần hợp đồng có 立会い — kiểm tra nhà cùng đại diện chủ nhà hoặc quản lý ngay trước khi nộp chìa khóa.',
        items: [
          'Mời người quen đi cùng nếu có thể — tránh bị ép ký những khoản không đồng ý.',
          'Không ký xác nhận thiệt hại nếu không đồng ý — ghi "確認中" (đang xem xét) hoặc xin thêm thời gian.',
          '敷金 (tiền cọc) phải được hoàn trả trong thời hạn hợp lý (thường 1 tháng sau khi trả nhà) sau khi trừ chi phí sửa chữa hợp lệ.',
          'Nếu tranh chấp về 敷金: liên hệ 消費生活センター của phường hoặc 国民生活センター để được tư vấn miễn phí.',
        ],
        tip: 'Lỗ đinh nhỏ dùng để treo tranh thường không bị tính phí theo hướng dẫn 国土交通省 — đây là điều nhiều người không biết và bị tính oan.',
      },
      {
        title: 'Thay đổi địa chỉ và hủy dịch vụ sau khi trả nhà',
        content:
          'Trả nhà mà quên đổi địa chỉ hành chính hoặc hủy dịch vụ là lỗi rất phổ biến và gây rắc rối kéo dài.',
        items: [
          'Đến phường cũ làm 転出届 (khai báo chuyển đi) — có thể làm trước ngày chuyển tối đa 14 ngày.',
          'Đến phường mới làm 転入届 trong vòng 14 ngày sau khi chuyển đến.',
          'Đăng ký chuyển tiếp thư tại bưu điện (郵便局) — có hiệu lực 1 năm, làm online tại kuronekoyamato.co.jp hoặc trực tiếp tại bưu điện.',
          'Hủy hoặc chuyển địa chỉ: điện, nước, gas, internet, bảo hiểm, ngân hàng, nơi làm việc.',
          'Hoàn trả chìa khóa theo đúng số lượng ghi trong hợp đồng — thiếu chìa khóa sẽ bị tính phí làm lại.',
        ],
        tip: 'Lập danh sách tất cả dịch vụ đang dùng ngay từ khi quyết định chuyển nhà — tránh quên hủy dịch vụ và tiếp tục bị tính phí sau khi đã ra đi.',
      },
    ],
  },
  {
    id: 'used-goods-mercari',
    title: 'Mua và bán đồ cũ (メルカリ・リサイクル)',
    titleJp: 'フリマアプリ・リサイクルショップ活用術',
    icon: 'pricetag-outline',
    color: '#D35400',
    description: 'Nhật Bản có hệ sinh thái đồ cũ chất lượng cao và giá rẻ — từ app bán hàng đến chuỗi cửa hàng thu mua. Biết cách dùng đúng giúp tiết kiệm lớn khi mới sang và kiếm thêm thu nhập hợp pháp khi dọn đồ.',
    sections: [
      {
        title: 'メルカリ — mua và bán trực tuyến',
        content:
          'メルカリ là app bán hàng cũ lớn nhất Nhật Bản, hoạt động tốt ngay cả với người chưa giỏi tiếng Nhật.',
        items: [
          'Tạo tài khoản với số điện thoại Nhật — xác minh bằng SMS.',
          'Khi mua: kiểm tra ảnh kỹ, đọc phần "商品の状態" (tình trạng hàng) và chính sách ship của người bán.',
          'Khi bán: chụp ảnh rõ, ghi đúng tình trạng hàng, đặt giá bằng cách tìm hàng tương tự đã bán (mục "販売済み").',
          'Phí メルカリ: 10% trên giá bán — trừ trực tiếp từ tiền bán.',
          'Tiền bán hàng giữ trong ví メルカリ — rút vào tài khoản ngân hàng Nhật (phí 200 yên nếu rút dưới 10.000 yên).',
          'Giao hàng: dùng らくらくメルカリ便 (Yamato) hoặc ゆうゆうメルカリ便 (Japan Post) — giá rẻ hơn giao hàng thường và che địa chỉ cả hai bên.',
        ],
        tip: 'Người mua Nhật thường nhắn tin hỏi trước khi mua. Trả lời nhanh sẽ tăng uy tín. Dùng Google Translate hoặc DeepL để dịch tin nhắn nếu cần.',
        image: require('../../../assets/content/daily-life/dl_mercari_s1.jpg'),
        imageCaption: 'メルカリ — app flea market lớn nhất Nhật Bản, mua bán đồ cũ an toàn và tiện lợi',
      },
      {
        title: 'Cửa hàng thu mua — bán nhanh, nhận tiền ngay tại chỗ',
        content:
          'Nếu cần bán nhanh hoặc không muốn xử lý app, cửa hàng thu mua là lựa chọn tiện lợi.',
        items: [
          'ハードオフ: mua lại điện tử, nhạc cụ, thiết bị âm thanh, đồ gia dụng — trả giá tại chỗ.',
          'ブックオフ: sách, manga, truyện, CD, DVD, game — trả giá tại chỗ.',
          'セカンドストリート (2nd Street): quần áo, đồ gia dụng, đồ nội thất nhỏ.',
          'Lưu ý: giá thu mua ở cửa hàng luôn thấp hơn メルカリ đáng kể — đổi lại nhận tiền ngay, không cần chờ.',
        ],
        tip: 'Mang sạch và đầy đủ phụ kiện (dây, hộp, sách hướng dẫn) khi đến cửa hàng — hàng có hộp gốc thường được trả giá cao hơn đáng kể.',
      },
      {
        title: 'Phân biệt đồ nên bán vs. nên bỏ (粗大ゴミ)',
        content:
          'Không phải đồ cũ nào cũng bán được. Nhầm giữa bán và bỏ sẽ mất thời gian hoặc phát sinh chi phí.',
        items: [
          'Nên bán: điện tử còn hoạt động, quần áo brand-name tình trạng tốt, đồ gia dụng nhỏ, đồ chơi, sách.',
          'Nên bỏ 粗大ゴミ: đồ hỏng, đồ không ai muốn mua, nội thất cũ kỹ.',
          '粗大ゴミ phải đăng ký với phường và mua tem xử lý trước — không được vứt ra đường hay vào thùng rác thường.',
          'Không bỏ đồ điện tử lớn (tivi, tủ lạnh, máy giặt, điều hòa) vào rác thường — có quy định riêng theo 家電リサイクル法, phải trả phí xử lý.',
        ],
        tip: 'Nếu không chắc đồ có giá trị không, search trên メルカリ xem có người đang bán không và giá bao nhiêu — 30 giây là biết.',
      },
      {
        title: 'Lưu ý pháp lý khi bán đồ cũ',
        content:
          'Bán đồ cũ qua メルカリ hoặc cửa hàng là hoàn toàn hợp pháp và rất phổ biến ở Nhật.',
        items: [
          'Thu nhập từ bán đồ cá nhân đã dùng (生活用動産) thường được miễn thuế theo luật Nhật.',
          'Nếu mua đồ mới để bán lại kinh doanh hoặc thu nhập lớn: có thể cần 古物商許可 (giấy phép kinh doanh đồ cũ) và khai thuế riêng.',
          'Không bán hàng giả mạo nhãn hiệu (偽ブランド品) — vi phạm nghiêm trọng, bị xóa tài khoản và có thể bị khởi tố.',
          'Không bán đồ của người khác mà không được phép — kể cả đồ nhặt được hoặc nhận giữ hộ.',
        ],
        tip: 'Giữ lịch sử giao dịch trong app メルカリ nếu sau này có câu hỏi về thuế — dùng để xác minh đây là bán đồ cá nhân, không phải kinh doanh.',
      },
    ],
  },
];
