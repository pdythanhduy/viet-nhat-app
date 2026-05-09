import type { AdminGuide } from '../../../../types/content';

const electricityGasWaterContracts: AdminGuide = {
  id: 'electricity-gas-water-contracts',
  category: 'daily-law',
  lastVerified: '2026-05-09',
  priority: 'normal',
  title: 'Hợp đồng điện, gas, nước ở Nhật',
  titleJp: '日本で電気・ガス・水道を使うとき',
  icon: 'flash-outline',
  color: '#F39C12',
  description:
    'Khi chuyển vào nhà mới ở Nhật, ba dịch vụ phải mở: điện (電気), gas (ガス), nước (水道). Điện thường mở online / điện thoại trong vài phút. Gas thường cần hẹn nhân viên đến mở (開栓) và phải có người ở nhà. Nước thường liên quan đến 水道局 của 市区町村. Khi chuyển đi, nhớ hủy hoặc chuyển đổi để không bị tính tiền tiếp.',
  searchKeywords: [
    'điện',
    'gas',
    'nước',
    'mở điện',
    'mở gas',
    'mở nước',
    'hủy điện',
    'hủy gas',
    'hủy nước',
    'chuyển nhà',
    '水道',
    '電気',
    'ガス',
    '開栓',
    '使用開始',
    '解約',
    '引っ越し',
    '水道局',
    '東京電力',
    '東京ガス',
    '使用停止',
  ],
  legalScope: {
    jurisdiction: 'mixed',
    jurisdictionNote:
      '電気 do 経済産業省 (METI) quản lý chung — đã 自由化 từ 2016, có nhiều công ty bán điện cạnh tranh. ガス cũng tương tự (自由化 từ 2017 cho 都市ガス). 水道 thường do 市区町村 (水道局) quản lý — không 自由化, chỉ có 1 đơn vị cung cấp theo khu. Phí + thủ tục cụ thể tùy công ty + tùy khu.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'low',
    whenToAskExpert: [
      'Hợp đồng điện / gas có 解約金 hoặc khoá thời hạn (縛り) cao bất thường — đọc kỹ hoặc hỏi 国民生活センター trước khi ký.',
      'Sai sót hóa đơn lớn / nghi ngờ rò gas / chập điện — gọi công ty cung cấp ngay; nếu không xử lý thỏa đáng, 国民生活センター tiếp nhận khiếu nại.',
      'Khu chung cư có 一括契約 (hợp đồng tập thể) — không tự đổi công ty được, hỏi 大家 / 管理会社.',
    ],
  },
  quickAction: {
    deadline:
      'Đăng ký TRƯỚC khi chuyển vào ~1 tuần là an toàn. Tối thiểu nên gọi điện / online 2–3 ngày trước ngày dọn vào để gas có ngày hẹn 開栓.',
    office:
      'Điện: công ty bán lẻ điện theo khu (vd 東京電力, 関西電力, 中部電力, hoặc các 新電力 mới). Gas: 都市ガス (vd 東京ガス, 大阪ガス) hoặc プロパンガス (LP gas, công ty nhỏ địa phương). Nước: 水道局 của 市区町村 (vd 東京都水道局, 横浜市水道局).',
    doNow: [
      'Xác định công ty cung cấp cho khu mình — hỏi 不動産 / chủ nhà, hoặc xem 賃貸借契約書. Một số chung cư đã chỉ định công ty cụ thể.',
      'Gọi điện / vào trang web công ty 1 tuần trước khi dọn vào, đăng ký 使用開始. Cần: địa chỉ mới, ngày bắt đầu dùng, tên, ngày sinh, số điện thoại, phương thức thanh toán.',
      'Đặc biệt với gas: cần đặt hẹn 開栓 — nhân viên đến nhà mở. Phải có người ở nhà 30 phút – 1 giờ.',
      'Khi đến nhà mới, kiểm tra: điện đã có chưa (bật 主電源 ở 分電盤), nước đã có chưa (vặn van chính), gas đã được mở chưa (đợi 開栓).',
      'Khi chuyển đi: gọi báo 使用停止 ít nhất 2–3 ngày trước. Gas cũng có thể cần hẹn nhân viên đến đóng (閉栓).',
    ],
    bring: [
      'Địa chỉ mới + ngày bắt đầu dùng',
      'Tên đầy đủ theo katakana / hộ chiếu',
      'Số điện thoại liên lạc Nhật',
      'Thông tin thanh toán: số thẻ tín dụng / sổ ngân hàng cho 口座振替 / cách thanh toán コンビニ',
      'Hợp đồng thuê nhà (nếu công ty hỏi)',
      'お客様番号 cũ nếu chuyển từ nhà cũ trong cùng công ty',
    ],
    ifLate:
      'Quên đăng ký trước khi chuyển vào: điện thường vẫn có (chỉ cần báo trong vòng 1 tuần để khỏi bị tính nhầm). Nước cũng tương tự. Gas KHÔNG tự dùng được — phải đặt hẹn 開栓 và đợi vài ngày tới 1 tuần (đặc biệt mùa cao điểm 3–4).',
    officialSourceLabels: ['経済産業省 (METI)', '国民生活センター'],
  },
  whoIsThisFor: [
    'Người Việt vừa chuyển đến nhà mới ở Nhật — cần mở 3 dịch vụ.',
    'Người chuẩn bị chuyển đi — cần hủy / chuyển đổi đúng cách để không bị tính tiền sau khi đi.',
    'Người đang dùng nhưng phí tăng bất thường — muốn đổi sang công ty rẻ hơn (自由化).',
    'Không phải bạn nếu nhà bạn có 一括契約 (chung cư bao gồm điện/gas trong tiền nhà) — hỏi 大家.',
  ],
  whenToDo: [
    'Trước khi chuyển vào: 1 tuần (cho gas đặt hẹn).',
    'Trong tuần đầu sau dọn nhà: kiểm tra 3 dịch vụ đã có / chưa có.',
    'Trước khi chuyển đi: 2–3 ngày báo 使用停止.',
    'Khi nhận hóa đơn lạ / phí tăng đột ngột: kiểm tra ngay với công ty.',
  ],
  whereToDo: [
    'Online: trang web công ty (đa số có form 使用開始 / 引っ越し).',
    'Điện thoại: hotline customer service mỗi công ty.',
    'Trực tiếp: hiếm khi cần — chỉ một số trường hợp đặc biệt (gas hẹn 開栓 cần người tại nhà).',
    'Quầy 水道局: nếu cần làm thủ tục giấy tờ trực tiếp.',
  ],
  estimatedTime:
    'Đăng ký online / điện thoại: 5–15 phút mỗi dịch vụ. Hẹn gas 開栓: cần đặt trước vài ngày, có người ở nhà 30 phút – 1 giờ. Hủy khi chuyển đi: 5–10 phút mỗi dịch vụ.',
  fees: [
    'Đăng ký mở dịch vụ: thường KHÔNG có phí mở (mở ban đầu được miễn phí ở đa số công ty).',
    'Hóa đơn hàng tháng: phí cố định (基本料金) + phí theo lượng dùng. Tùy công ty, tùy gói, tùy mùa (mùa hè / đông dùng điều hòa nhiều hơn).',
    'Gas プロパン (LP) thường đắt hơn gas đô thị (都市ガス) vì cách thức cung cấp khác — kiểm tra loại gas trước khi ký hợp đồng.',
    '解約金 (phí hủy sớm): một số gói có khoá thời hạn 1–2 năm có 解約金 vài nghìn yên — đọc kỹ trước khi ký.',
    'Phí thay đổi tùy công ty + tùy khu — kiểm tra trang web công ty hoặc hỏi qua điện thoại trước khi ký.',
  ],
  documentsChecklist: [
    { label: 'Địa chỉ + ngày bắt đầu dùng', required: true, note: 'Cần để công ty kích hoạt đúng ngày + đúng nơi.' },
    { label: 'Tên + ngày sinh + số điện thoại', required: true, note: 'Tên theo katakana hoặc hộ chiếu — phải khớp với hợp đồng nhà.' },
    { label: 'Phương thức thanh toán', required: true, note: 'Thẻ tín dụng / 口座振替 (rút tự động ngân hàng) / コンビニ. Mỗi cách có ưu nhược.' },
    { label: 'Hợp đồng thuê nhà', required: false, note: 'Một số công ty hỏi để xác minh quyền thuê.' },
    { label: 'お客様番号 cũ', required: false, note: 'Khi chuyển từ nhà cũ trong cùng công ty — giữ liên tục lịch sử thanh toán.' },
    { label: '在留カード', required: false, note: 'Một số công ty hỏi để xác minh danh tính, đặc biệt khi đăng ký lần đầu.' },
  ],
  commonMistakes: [
    'Quên đặt hẹn 開栓 gas trước → đến nhà không có gas, phải đợi 3–7 ngày để có hẹn (mùa cao điểm 3–4 còn lâu hơn).',
    'Quên hủy khi chuyển đi → công ty vẫn tính phí, có thể ra hóa đơn lớn.',
    'Không đọc thư công ty (hóa đơn / thông báo) → bỏ lỡ thay đổi giá / cảnh báo nợ.',
    'Không hỏi loại gas (都市ガス vs LP) → không biết phí có hợp lý không.',
    'Ký hợp đồng có khoá thời hạn dài (2 năm) mà không hỏi 解約金 → khi chuyển nhà bị mất tiền.',
    'Không hỏi ngày bắt đầu dùng cụ thể với gas → đến ngày dọn nhà không có gas.',
    'Chuyển sang công ty 新電力 mới mà không kiểm tra phí cố định → có thể đắt hơn công ty cũ.',
  ],
  faq: [
    {
      question: 'Tôi mới sang Nhật, chưa có thẻ tín dụng / sổ ngân hàng — có đăng ký được không?',
      answer:
        'Được. Đa số công ty chấp nhận thanh toán qua コンビニ (Lawson / Family Mart / 7-Eleven) — họ gửi giấy 払込票 hàng tháng, mang đến コンビニ trả tiền mặt. Khi đã có sổ ngân hàng, có thể đổi sang 口座振替 (rút tự động) hoặc thẻ tín dụng để thuận tiện hơn.',
    },
    {
      question: 'Hóa đơn điện tháng này tăng gấp đôi — có đúng không?',
      answer:
        'Kiểm tra: (1) Mùa — hè bật điều hòa, đông bật 暖房, đèn dài hơn. (2) Số người trong nhà có đổi không. (3) Có thiết bị mới (máy giặt, tủ lạnh lớn). (4) So sánh với cùng tháng năm trước trên hóa đơn (đa số công ty in luôn so sánh). Nếu khác bất thường — gọi công ty hỏi 検針 (đọc đồng hồ) có sai không.',
    },
    {
      question: 'Chủ nhà bảo "không cần làm gì, đã bao gồm trong tiền nhà" — đúng không?',
      answer:
        'Có thể đúng nếu là 一括契約 (hợp đồng tập thể của tòa nhà). Một số chung cư bao gồm điện/gas/nước trong tiền nhà — bạn không cần ký riêng. Nhưng nhớ hỏi rõ: bao gồm cả 3 hay chỉ 1 trong 3? Có giới hạn dùng không (vd "miễn phí 5,000円/tháng, dư thì trả thêm")?',
    },
    {
      question: 'Tôi muốn đổi công ty điện rẻ hơn — có dễ không?',
      answer:
        'Có thể đổi (自由化 từ 2016). Online vài phút trên trang công ty mới — họ tự xử lý hủy với công ty cũ. KHÔNG cần đổi đồng hồ điện. Nhưng kiểm tra: (1) công ty cũ có 解約金 không, (2) công ty mới có khoá thời hạn không, (3) phí cố định 基本料金 có thấp hơn thật không (一部 mới rẻ kWh nhưng đắt 基本).',
    },
    {
      question: 'Tôi nghi gas rò trong nhà — phải làm gì?',
      answer:
        'NGAY LẬP TỨC: (1) Tắt van gas chính. (2) Mở cửa sổ thoáng. (3) KHÔNG bật / tắt công tắc điện, không bật lửa, không gọi điện thoại trong nhà — tia lửa có thể gây nổ. (4) Ra ngoài + gọi gas company từ ngoài (số khẩn cấp in trên đồng hồ gas hoặc hóa đơn). Nếu không liên lạc được, gọi 119.',
    },
  ],
  counterPhrases: [
    {
      jp: '電気を使い始めたいです。',
      romaji: 'Denki o tsukai hajimetai desu.',
      vn: 'Tôi muốn bắt đầu dùng điện.',
      note: 'Câu mở đầu khi gọi công ty điện đăng ký.',
    },
    {
      jp: 'ガスの開栓を予約したいです。',
      romaji: 'Gasu no kaisen o yoyaku shitai desu.',
      vn: 'Tôi muốn đặt hẹn mở gas.',
      note: 'Cần thiết — gas không tự dùng được, phải có người đến mở.',
    },
    {
      jp: '水道の使用開始をしたいです。',
      romaji: 'Suidou no shiyou kaishi o shitai desu.',
      vn: 'Tôi muốn bắt đầu dùng nước.',
      note: 'Gọi 水道局 hoặc đăng ký online.',
    },
    {
      jp: '引っ越しするので、解約したいです。',
      romaji: 'Hikkoshi suru node, kaiyaku shitai desu.',
      vn: 'Tôi đang chuyển nhà nên muốn hủy hợp đồng.',
      note: 'Báo trước 2–3 ngày trước ngày chuyển đi.',
    },
    {
      jp: '支払い方法を変更したいです。',
      romaji: 'Shiharai houhou o henkou shitai desu.',
      vn: 'Tôi muốn đổi phương thức thanh toán.',
      note: 'Khi chuyển từ コンビニ sang 口座振替 / thẻ tín dụng.',
    },
    {
      jp: 'いつから使えますか。',
      romaji: 'Itsu kara tsukaemasu ka.',
      vn: 'Khi nào tôi có thể bắt đầu dùng?',
      note: 'Hỏi rõ ngày kích hoạt — đặc biệt quan trọng với gas.',
    },
    {
      jp: '解約金はかかりますか。',
      romaji: 'Kaiyakukin wa kakarimasu ka.',
      vn: 'Có phí hủy hợp đồng không?',
      note: 'Hỏi trước khi ký hợp đồng có khoá thời hạn.',
    },
    {
      jp: 'ガスの臭いがします。',
      romaji: 'Gasu no nioi ga shimasu.',
      vn: 'Tôi ngửi thấy mùi gas.',
      note: 'Gọi công ty gas hoặc 119 NGAY. Không bật lửa / công tắc điện.',
    },
  ],
  officialLinks: [
    { label: '経済産業省 (METI)', url: 'https://www.meti.go.jp/' },
    { label: '国民生活センター', url: 'https://www.kokusen.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Trước khi dọn — xác định công ty cung cấp',
      description:
        '1 tuần trước khi dọn vào nhà mới:\n\n1. **Điện**: hỏi 不動産 / chủ nhà công ty bán điện cho khu. Một số chung cư đã chỉ định 1 công ty (vd "Tokyo Power Inc"). Nếu được tự chọn → so sánh giá trên 価格.com / Enepi.\n\n2. **Gas**: hỏi loại gas (都市ガス hay LP / プロパン). 都市ガス có nhiều công ty, LP gas thường 1 công ty địa phương. Loại gas khác nhau → bếp gas / lò sưởi cần điều chỉnh.\n\n3. **Nước**: 水道局 của 市区町村 (vd 東京都水道局, 横浜市水道局, 大阪市水道局). Không tự chọn được — chỉ có 1.\n\nNote: 賃貸借契約書 thường ghi rõ công ty cụ thể.',
      documents: [
        '賃貸借契約書',
        'Địa chỉ chính xác nhà mới',
      ],
      tip: 'Ưu tiên hỏi chủ nhà / 不動産 trước Google — thông tin chính xác hơn cho chung cư cụ thể.',
    },
    {
      step: 2,
      title: 'Đăng ký mở dịch vụ — online hoặc điện thoại',
      description:
        '**Điện**: vào trang web công ty → form 使用開始 → điền địa chỉ + ngày bắt đầu + tên + thanh toán. 5–10 phút.\n\n**Gas**: PHẢI đặt hẹn 開栓 — nhân viên đến mở. Online hoặc gọi điện. Chọn ngày + thời gian (sáng/chiều). Phải có người ở nhà 30 phút – 1 giờ.\n\n**Nước**: gọi 水道局 hoặc form online. Có nơi cho điền 水道使用開始届 đặt vào hộp thư khi rời.\n\nThông tin cần điền:\n• Địa chỉ mới (tên tòa, số phòng)\n• Ngày bắt đầu dùng\n• Tên (katakana / hộ chiếu)\n• Ngày sinh\n• Số điện thoại\n• Phương thức thanh toán',
      documents: [
        'Địa chỉ + ngày bắt đầu',
        'Tên + ngày sinh + số ĐT',
        'Thẻ tín dụng / sổ ngân hàng / コンビニ',
      ],
      tip: 'Đặt hẹn gas mùa cao điểm (tháng 3–4) khó — đặt SỚM 1–2 tuần trước. Mùa thường 3–7 ngày.',
    },
    {
      step: 3,
      title: 'Ngày dọn nhà — kiểm tra 3 dịch vụ',
      description:
        'Khi vào nhà mới:\n\n**Điện**: bật 主電源 ở 分電盤 (hộp cầu chì) — thường đặt ở cửa vào / hành lang / nhà bếp. Tất cả công tắc lên ON.\n\n**Nước**: tìm 水道メーター và van chính (元栓) — thường ngoài nhà / dưới chậu rửa. Vặn ON.\n\n**Gas**: ĐỢI 開栓 — nhân viên đến vào ngày + giờ đã hẹn. Chuẩn bị 在留カード để xác minh nếu được hỏi. Khi mở xong, nhân viên giải thích cách dùng + số khẩn cấp gas rò.',
      documents: [
        '在留カード (cho gas 開栓)',
      ],
      tip: 'Nếu điện không bật được sau khi lên ON 主電源 → đợi 5–10 phút (hệ thống mới kích hoạt). Vẫn không có → gọi công ty.',
    },
    {
      step: 4,
      title: 'Theo dõi hóa đơn + thanh toán',
      description:
        'Hóa đơn đến hàng tháng (giấy hoặc email):\n\n• **コンビニ払込**: giấy 払込票 đến — trong 1 tháng mang đến Lawson / Family Mart / 7-Eleven trả tiền mặt.\n• **口座振替**: tiền tự rút từ sổ ngân hàng vào ngày cố định mỗi tháng. Cần đủ số dư.\n• **Thẻ tín dụng**: tự động trừ.\n\nĐọc hóa đơn:\n• 基本料金: phí cố định\n• 電気使用量 / ガス使用量 / 水道使用量: lượng dùng\n• Tổng + thuế tiêu thụ\n\nNếu hóa đơn tăng bất thường — gọi công ty kiểm tra.',
      documents: [],
      tip: 'Đặt nhắc nhở trên điện thoại cho ngày 口座振替 — không đủ số dư = bị phạt + có thể ngắt dịch vụ sau 2–3 tháng.',
    },
    {
      step: 5,
      title: 'Khi chuyển đi — hủy hoặc chuyển sang nhà mới',
      description:
        'Trước ngày chuyển đi 2–3 ngày:\n\n**Điện + Nước**: gọi báo 使用停止. Họ ghi 検針 (đọc đồng hồ) lần cuối, gửi hóa đơn cuối cùng.\n\n**Gas**: cũng gọi 使用停止. Một số trường hợp cần hẹn nhân viên 閉栓 (đóng gas) — đặc biệt nếu trong nhà còn LP tank.\n\nNếu chuyển trong cùng khu cùng công ty → có thể "引っ越し手続き" (chuyển đổi địa chỉ thay vì hủy). Giữ お客様番号 + lịch sử thanh toán.\n\nNếu sang khu khác → hủy nhà cũ + đăng ký công ty mới ở khu mới.',
      documents: [
        'お客様番号 (in trên hóa đơn)',
        'Địa chỉ mới (cho 引っ越し手続き)',
      ],
      tip: 'Thông báo SỚM hơn 1 tuần càng tốt — mùa cao điểm 3–4 các công ty xử lý chậm. Quên hủy = vẫn bị tính tiền.',
    },
  ],
};

export default electricityGasWaterContracts;
