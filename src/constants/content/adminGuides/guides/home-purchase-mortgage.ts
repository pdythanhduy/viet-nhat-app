import type { AdminGuide } from '../../../../types/content';

const homePurchaseMortgage: AdminGuide = {
    id: 'home-purchase-mortgage',
    category: 'money',
    lastVerified: '2026-05-06',
    priority: 'normal',
    title: 'Mua nhà và vay 住宅ローン tại Nhật',
    titleJp: '外国人の住宅購入・住宅ローン・ローン控除',
    icon: 'home-outline',
    color: '#1F618D',
    description: 'Người nước ngoài được phép mua nhà tại Nhật và vay 住宅ローン nếu đủ điều kiện. Guide này tập trung vào điều kiện vay, ngân hàng nào nhận người nước ngoài, quy trình mua và lợi ích 住宅ローン控除 — khác với guide thuê nhà hiện có.',
    heroImage: require('../../../../../assets/content/daily-life/ag_home-purchase_hero.jpg'),
    heroImageCaption: 'Mua nhà tại Nhật - kiểm tra điều kiện vay 住宅ローン và chi phí ban đầu',
    whoIsThisFor: [
      'Người có 永住者 hoặc 定住者 hoặc tư cách lưu trú dài hạn và đang cân nhắc mua nhà tại Nhật.',
      'Người muốn hiểu điều kiện vay thực tế, không chỉ nghe "người nước ngoài khó vay".',
      'Người đã mua nhà bằng tiền mặt và muốn biết về 住宅ローン控除 (khấu trừ thuế cho người có vay thế chấp).',
    ],
    whenToDo: [
      'Kiểm tra điều kiện vay trước khi ký hợp đồng đặt cọc (売買契約) — một khi đã ký, hủy hợp đồng rất tốn kém.',
      'Nộp đơn xin 住宅ローン控除 trong năm đầu tiên sau khi mua: phải tự làm 確定申告 năm đầu; từ năm thứ 2 công ty có thể làm qua 年末調整.',
    ],
    whereToDo: [
      'Ngân hàng hoặc 住宅ローン center: xin 事前審査 trước khi ký 売買契約.',
      '不動産会社: nhận 重要事項説明書, bảng ước tính 諸費用 và điều khoản hủy hợp đồng.',
      '法務局/司法書士: xử lý đăng ký quyền sở hữu và thế chấp sau khi bàn giao.',
      '税務署/e-Tax: khai 住宅ローン控除 năm đầu nếu đủ điều kiện.',
      'Municipal office: lấy 住民票, 印鑑証明書 và hỏi 不動産取得税 nếu cần.',
    ],
    documentsChecklist: [
      { label: 'Hộ chiếu và 在留カード', required: true },
      { label: '住民票 và 印鑑証明書', required: true, note: 'Ngân hàng/司法書士 thường yêu cầu bản mới.' },
      { label: '源泉徴収票 hoặc 確定申告書控え', required: true, note: 'Ngân hàng dùng để xét thu nhập và khả năng trả nợ.' },
      { label: 'Sao kê tài khoản, giấy tờ tiền tự có và lịch sử tín dụng', required: true },
      { label: '重要事項説明書 và 売買契約書', required: true, note: 'Đọc kỹ điều khoản hủy nếu khoản vay không được duyệt.' },
      { label: '住宅ローン年末残高証明書', required: false, note: 'Cần cho 住宅ローン控除 sau khi đã vay.' },
      { label: '登記事項証明書', required: false, note: 'Cần cho đăng ký quyền sở hữu và khai 住宅ローン控除.' },
    ],
    commonMistakes: [
      'Ký 売買契約 trước khi có điều kiện vay rõ ràng hoặc không hiểu điều khoản ローン特約.',
      'Chỉ tính giá nhà mà quên 諸費用 như phí môi giới, đăng ký, thuế, 司法書士 và phí ngân hàng.',
      'Dùng toàn bộ tiền tiết kiệm làm tiền đầu vào, không giữ quỹ khẩn cấp sau khi mua nhà.',
      'Tưởng 住宅ローン控除 tự động áp dụng; năm đầu thường phải tự 確定申告.',
      'Không kiểm tra quyền sử dụng đất, phí quản lý/sửa chữa chung cư hoặc lịch sử sửa chữa tòa nhà.',
    ],
    faq: [
      {
        question: 'Người nước ngoài có được mua nhà tại Nhật không?',
        answer: 'Có. Việc mua bất động sản không bị cấm chỉ vì quốc tịch nước ngoài. Vấn đề khó hơn thường nằm ở xét duyệt 住宅ローン, tư cách lưu trú, thu nhập và lịch sử tín dụng.',
      },
      {
        question: 'Nếu ngân hàng từ chối khoản vay sau khi ký hợp đồng thì mất tiền cọc không?',
        answer: 'Phụ thuộc điều khoản ローン特約 trong 売買契約. Trước khi ký, phải xác nhận điều kiện nào cho phép hủy hợp đồng và lấy lại 手付金 nếu khoản vay không được duyệt.',
      },
      {
        question: '住宅ローン控除 có chắc được áp dụng không?',
        answer: 'Không chắc chỉ vì bạn có vay mua nhà. NTA quy định nhiều điều kiện về mục đích cư trú, khoản vay, thời hạn trả, nhà ở và thu nhập. Năm đầu nên kiểm tra với 税務署 hoặc e-Tax trước khi khai.',
      },
    ],
    officialLinks: [
      { label: 'フラット35 — 住宅金融支援機構', url: 'https://www.flat35.com/' },
      { label: '住宅借入金等特別控除の対象となる住宅ローン等 — 国税庁', url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1225.htm' },
      { label: 'マイホームを持ったとき — 国税庁', url: 'https://www.nta.go.jp/publication/pamph/koho/kurashi/html/05_1.htm' },
    ],
    steps: [
      {
        step: 1,
        title: 'Điều kiện vay 住宅ローン khi là người nước ngoài',
        description: 'Người nước ngoài có thể vay 住宅ローン nhưng điều kiện thắt chặt hơn người Nhật. Các ngân hàng xét duyệt dựa trên:\n\n• Tư cách lưu trú: 永住者 và 定住者 được nhận rộng rãi nhất. Một số ngân hàng nhận 技術・人文知識・国際業務, 高度専門職, 日本人の配偶者等 nếu đủ điều kiện khác. Tư cách lưu trú ngắn hạn (1–3 năm) thường bị từ chối hoặc yêu cầu người bảo lãnh Nhật.\n\n• Thời gian làm việc liên tục tại Nhật: thường yêu cầu từ 3 năm trở lên tại cùng công ty hoặc lĩnh vực.\n\n• Thu nhập: thường yêu cầu tỷ lệ trả nợ hàng năm (返済負担率) không vượt 25–35% thu nhập năm. Ví dụ: thu nhập 5 triệu yên/năm → trả nợ tối đa ~1.25–1.75 triệu yên/năm.\n\n• Lịch sử tín dụng: không nợ xấu thẻ tín dụng, không nợ tiêu dùng lớn.',
        documents: [],
        tip: 'Japan Housing Finance Agency (住宅金融支援機構) có chương trình フラット35 — được coi là dễ tiếp cận hơn với người nước ngoài so với ngân hàng thương mại vì tiêu chí xét duyệt công khai và không phụ thuộc quốc tịch. Kiểm tra trang chính thức của JHF (jhf.go.jp).',
      },
      {
        step: 2,
        title: 'Quy trình mua nhà từng bước',
        description: '1. Tìm nhà qua đại lý bất động sản (不動産会社) — yêu cầu họ giải thích 重要事項説明書 (bản tóm tắt pháp lý của bất động sản) trước khi ký.\n\n2. Xin pre-approval từ ngân hàng (事前審査): nộp sơ bộ thu nhập và thông tin cá nhân — thường có kết quả trong 3–5 ngày làm việc.\n\n3. Ký 売買契約 (hợp đồng mua bán) và nộp tiền đặt cọc (手付金, thường 5–10% giá nhà).\n\n4. Nộp hồ sơ vay chính thức (本審査): đầy đủ giấy tờ, xử lý 1–2 tuần.\n\n5. Ký 金銭消費貸借契約 (hợp đồng vay) tại ngân hàng.\n\n6. Bàn giao nhà (引き渡し) và đăng ký sở hữu tại 法務局 — thường qua 司法書士 (công chứng viên tư pháp).',
        documents: [
          'Hộ chiếu và 在留カード',
          '源泉徴収票 3 năm gần nhất',
          '住民票 (世帯全員)',
          'Sao kê tài khoản ngân hàng 3–6 tháng',
          '印鑑証明書 (nếu có con dấu đăng ký)',
          'Giấy tờ bất động sản: 登記事項証明書, 公図, 建物図面',
        ],
        tip: 'Nếu không đọc được tiếng Nhật: yêu cầu đại lý bất động sản giải thích từng điều khoản trước khi ký. Có thể nhờ 司法書士 hoặc luật sư tư vấn — phí thường 5–15 vạn yên nhưng đáng để tránh rủi ro.',
      },
      {
        step: 3,
        title: 'Chi phí ngoài giá nhà cần biết',
        description: 'Ngoài giá nhà, cần chuẩn bị thêm khoảng 6–10% giá nhà cho các chi phí sau:\n\n• 仲介手数料 (phí môi giới): tối đa 3% giá nhà + 6 vạn yên + thuế (theo luật).\n• 登録免許税 (thuế đăng ký sở hữu): ~0.3–2% tùy loại.\n• 不動産取得税 (thuế mua bất động sản): ~3% giá đất và nhà (có miễn giảm nhất định).\n• 司法書士報酬 (phí công chứng tư pháp): 10–20 vạn yên.\n• Phí vay ngân hàng: phí thẩm định, phí bảo lãnh hoặc 団体信用生命保険 (bảo hiểm nhân thọ gắn khoản vay).\n• 固定資産税 (thuế bất động sản hàng năm): ~1.4% giá trị tài sản theo định giá địa phương.',
        documents: [],
        tip: 'Nhiều người không chuẩn bị đủ tiền mặt cho chi phí phụ và bị động khi đến bước thanh toán. Hỏi đại lý cung cấp bảng ước tính tổng chi phí (諸費用概算) ngay từ đầu.',
      },
      {
        step: 4,
        title: '住宅ローン控除 — khấu trừ thuế cho người vay',
        description: '住宅ローン控除 (住宅借入金等特別控除) là ưu đãi thuế lớn: hàng năm được khấu trừ 0.7% số dư khoản vay ra khỏi thuế thu nhập — áp dụng trong 13 năm với nhà mới đủ tiêu chuẩn năng lượng.\n\nVí dụ: dư nợ 30 triệu yên → khấu trừ 210,000 yên/năm khỏi thuế thu nhập phải nộp.\n\nĐiều kiện: nhà dùng để ở chính (居住用), vay từ tổ chức tài chính hợp lệ, diện tích ≥50m² (hoặc ≥40m² với một số trường hợp), thu nhập năm ≤2,000 vạn yên.\n\nNăm đầu: bắt buộc tự làm 確定申告 để đăng ký quyền lợi này. Từ năm 2 trở đi: công ty làm hộ qua 年末調整 với giấy tờ bạn cung cấp.',
        documents: [
          '住宅取得資金に係る借入金の年末残高等証明書 (ngân hàng gửi cuối năm)',
          '登記事項証明書 (chứng nhận đăng ký quyền sở hữu)',
          '売買契約書 hoặc 建築請負契約書',
          '住民票 chứng minh đang ở tại nhà đó',
        ],
        tip: 'Người nước ngoài đủ điều kiện 住宅ローン控除 như người Nhật — không phân biệt quốc tịch. Nếu thuế thu nhập của bạn thấp hơn mức khấu trừ, phần dư được bù vào 住民税 (trong giới hạn).',
      },
    ],
  };

export default homePurchaseMortgage;
