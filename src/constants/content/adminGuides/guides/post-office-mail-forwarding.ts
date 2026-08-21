import type { AdminGuide } from '../../../../types/content';

const postOfficeMailForwarding: AdminGuide = {
  id: 'post-office-mail-forwarding',
  category: 'daily-law',
  lastVerified: '2026-08-21',
  priority: 'normal',
  title: 'Bưu điện, chuyển tiếp thư và gửi hàng ở Nhật',
  titleJp: '郵便局・転送届・荷物を送るとき',
  icon: 'mail-outline',
  color: '#E74C3C',
  description:
    '郵便局 (bưu điện) ở Nhật do 日本郵便 (Japan Post) vận hành — gửi thư, gửi hàng nội địa + quốc tế, nhận giao hàng. Khi chuyển nhà, làm 転送届 (chuyển tiếp thư) miễn phí 1 năm. Khi vắng nhà nhận giao, có giấy 不在票 — hẹn lại trong vài ngày. Gửi hàng quốc tế cần chú ý đồ cấm + giấy tờ hải quan.',
  searchKeywords: [
    'bưu điện',
    'gửi hàng',
    'gửi đồ về Việt Nam',
    'chuyển tiếp thư',
    'đổi địa chỉ nhận thư',
    'hẹn giao lại',
    'không nhận được hàng',
    'hàng chưa đến',
    'hàng mất',
    '不在票',
    '再配達',
    '郵便局',
    '転送届',
    '荷物',
    '追跡番号',
    'EMS',
    '国際郵便',
    'tracking',
    '日本郵便',
    'Japan Post',
    'kokusai yubin',
    'chuyển nhà thư',
    '内容証明郵便',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      '日本郵便 (Japan Post) là công ty cổ phần — không phải cơ quan chính phủ, nhưng do 総務省 quản lý theo 郵便法. Quy định gửi quốc tế tuân thủ tiêu chuẩn UPU (Universal Postal Union) + luật hải quan từng nước. Theo quy định UPU, từ 03/2024 Japan Post bắt buộc khai hải quan điện tử (EAD) qua 国際郵便マイページサービス cho kiện có hàng hóa — không còn nhận tờ khai viết tay. 転送届 là dịch vụ Japan Post miễn phí 1 năm. Phí + đồ cấm thay đổi — kiểm tra trang Japan Post trước khi gửi.',
    sourceVerifiedAt: '2026-08-21',
    nextReviewAt: '2027-02-01',
    riskLevel: 'low',
    whenToAskExpert: [
      'Gửi đồ giá trị cao / dễ vỡ / nhạy cảm hải quan (thực phẩm, thuốc, mỹ phẩm, electronics) — hỏi nhân viên bưu điện trước, hoặc xem trang Japan Post 国際郵便.',
      'Hàng đến chậm / mất / hỏng — claim với Japan Post trong thời gian quy định (thường 6 tháng kể từ ngày gửi).',
      'Bị scam giả nhân viên bưu điện qua điện thoại / SMS — KHÔNG đưa thông tin cá nhân, gọi 国民生活センター 188 hoặc cảnh sát.',
    ],
  },
  quickAction: {
    deadline:
      '転送届 (chuyển tiếp thư): nộp TRƯỚC khi chuyển 1–2 tuần để có hiệu lực ngay khi dọn. 不在票 (giấy vắng nhà): hẹn lại càng sớm càng tốt — sau ~1 tuần thư trả lại người gửi.',
    office:
      '郵便局 (bưu điện) — có ở mọi 市区町村. Một số dịch vụ làm online qua trang Japan Post (post.japanpost.jp) hoặc app ゆうびんポータル. ローソン + 7-Eleven thường có hộp gửi hàng nhỏ.',
    doNow: [
      '**Khi chuyển nhà**: làm 転送届 1–2 tuần trước. Online qua e転居 (cần xác minh My Number / 在留カード) hoặc giấy tại bưu điện. Miễn phí 1 năm.',
      '**Nhận 不在票**: đọc giấy → có 4 cách hẹn lại: gọi điện thoại trên giấy, web (URL trên giấy), QR code quét app, mang giấy + 身分証 đến bưu điện.',
      '**Gửi thư trong Nhật**: tem 110円 đồng giá cho thư đến 50g (từ 10/2024 gộp 2 mức cũ 84円/94円 thành 1 mức). Bỏ vào hộp đỏ của 郵便局 hoặc đến quầy.',
      '**Gửi hàng nội địa**: ゆうパック (Yu-pack) ở quầy bưu điện hoặc コンビニ — cân + đo, dán nhãn, trả tiền.',
      '**Gửi hàng quốc tế có hàng hóa (về VN)**: EMS (nhanh, đắt), 航空便 (rẻ hơn EMS, vẫn nhanh), 船便 (rẻ nhất, 1–3 tháng). Từ 03/2024, KHÔNG còn viết tay 税関告知書 — phải tạo nhãn + khai hải quan điện tử qua 国際郵便マイページサービス (online) trước khi ra quầy.',
    ],
    bring: [
      '転送届 / 不在票 / hàng cần gửi',
      '在留カード hoặc 身分証 (cho dịch vụ cần xác minh)',
      'Tiền mặt / thẻ tín dụng',
      'Địa chỉ người nhận đầy đủ (tiếng Nhật cho nội địa, tiếng Anh cho quốc tế)',
      'Số điện thoại người gửi + người nhận',
      'Email nếu cần tracking điện tử',
    ],
    ifLate:
      'Quên 転送届 trước khi chuyển: làm muộn vẫn được, có hiệu lực sau khoảng 1 tuần. Trong khi chờ — thư có thể bị trả lại người gửi. Liên hệ trực tiếp các tổ chức quan trọng (ngân hàng, 入管, 市役所, công ty) để cập nhật địa chỉ luôn.',
    officialSourceLabels: [
      '日本郵便',
      '日本郵便 — ベトナム宛 国際郵便（料金・条件・追跡）',
      '在ベトナム日本国大使館 — ベトナム出入国情報（持ち込み・持ち出し制限）',
    ],
  },
  whoIsThisFor: [
    'Người Việt vừa chuyển nhà — cần làm 転送届 để không mất thư.',
    'Người vừa nhận 不在票 — cần biết hẹn lại thế nào.',
    'Người gửi quà / đồ về Việt Nam — cần biết phí + đồ cấm + thời gian.',
    'Người gửi thư quan trọng (内容証明郵便, 配達証明) — cần biết quy trình.',
  ],
  whenToDo: [
    '1–2 tuần trước khi chuyển nhà: làm 転送届.',
    'Trong vòng 1 tuần khi nhận 不在票: hẹn lại trước khi thư trả lại.',
    'Khi cần gửi thư / hàng: đến bưu điện hoặc コンビニ trong giờ làm việc.',
    'Sau khi gửi quốc tế: theo dõi tracking online 1–2 lần / tuần.',
  ],
  whereToDo: [
    '郵便局 (bưu điện): có ở mọi 市区町村. Giờ làm thường 9:00–17:00. Bưu điện lớn (中央郵便局) có giờ rộng hơn.',
    'コンビニ: ローソン + 7-Eleven thường nhận ゆうパック cho gửi nội địa nhỏ.',
    'Online: trang Japan Post (post.japanpost.jp) cho 転送届, hẹn 再配達, mua tem.',
    'App ゆうびんポータル: hẹn 再配達, theo dõi hàng.',
  ],
  estimatedTime:
    '転送届 online (e転居): 10–15 phút. Tại bưu điện: 5–10 phút. Hẹn 再配達: 2–5 phút. Gửi thư: 2 phút. Gửi ゆうパック nội địa: 5–10 phút. Gửi quốc tế: 15–30 phút (cần khai hải quan).',
  fees: [
    'Thư trong Nhật: 110円 đồng giá đến 50g (từ 10/2024 — 2 mức cũ 84円/94円 đã gộp làm 1; giá có thể thay đổi tiếp — kiểm tra trang Japan Post).',
    'ゆうパック nội địa: ~700–2,000円 tùy kích thước + khoảng cách.',
    'EMS quốc tế (về VN): ~2,000–10,000円 tùy cân + thời gian. Đến trong 3–7 ngày.',
    '航空便 quốc tế (về VN): ~1,000–5,000円. Đến trong 1–2 tuần.',
    '船便 quốc tế (về VN): rẻ nhất nhưng chậm 1–3 tháng. Phù hợp đồ không gấp.',
    '転送届: MIỄN PHÍ.',
    '内容証明郵便 (thư đảm bảo có chứng minh nội dung): ~1,300円 trở lên — hữu ích khi cần bằng chứng pháp lý (vd cooling-off NHK, hủy hợp đồng).',
    'Phí thay đổi — kiểm tra trang Japan Post hoặc hỏi tại quầy trước khi gửi.',
  ],
  documentsChecklist: [
    { label: '在留カード hoặc 身分証', required: true, note: 'Cho 転送届, hẹn 再配達 tại bưu điện, 内容証明郵便.' },
    { label: 'Địa chỉ người nhận', required: true, note: 'Nội địa: tiếng Nhật. Quốc tế: tiếng Anh + ZIP / postal code chính xác.' },
    { label: 'Số điện thoại người nhận', required: true, note: 'Giúp giao hàng nếu địa chỉ không rõ.' },
    { label: 'Tiền mặt / thẻ tín dụng', required: true, note: 'Đa số bưu điện nhận tiền mặt + thẻ. Một số nhỏ chỉ nhận tiền mặt.' },
    { label: 'Hộ chiếu', required: false, note: 'Gửi quốc tế đôi khi cần — đặc biệt EMS giá trị cao.' },
    { label: 'Hóa đơn / chứng từ giá trị', required: false, note: 'Cho hàng giá trị cao — bảo hiểm + claim hải quan.' },
  ],
  commonMistakes: [
    'Chuyển nhà nhưng không làm 転送届 → thư quan trọng (ngân hàng, 入管, 市役所) đi mất, có thể leo thang sang nợ / thủ tục lỡ.',
    'Bỏ qua 不在票 quá 1 tuần → thư / hàng trả lại người gửi, có thể mất hoặc tốn phí gửi lại.',
    'Gửi đồ bị cấm về VN (thực phẩm tươi sống, hạt giống, thuốc theo toa, một số mỹ phẩm có cồn cao) → bị giữ ở hải quan, có thể mất hàng + bị phạt.',
    'Không hỏi tracking → khó claim khi hàng mất.',
    'Khai hải quan sai (giá trị thấp / nội dung sai) để né phí → vi phạm quy định, hàng có thể bị giữ, người nhận VN bị phạt hoặc bị từ chối nhận.',
    'Không bao bọc kỹ đồ dễ vỡ → hỏng đến nơi, khó claim nếu không có bảo hiểm thêm.',
    'Tin theo cuộc gọi / SMS giả "Japan Post nói có gói hàng, nhấn link" → scam phổ biến. Japan Post KHÔNG bao giờ gửi link SMS yêu cầu thanh toán.',
  ],
  faq: [
    {
      question: '転送届 — làm online hay tại bưu điện dễ hơn?',
      answer:
        '**Online (e転居)**: nhanh hơn (10–15 phút) nhưng cần xác minh qua My Number app hoặc ID cá nhân. Có thể khó cho người mới sang chưa quen hệ thống.\n\n**Tại bưu điện**: cần đến tận nơi, mang 在留カード + bút. Nhân viên giúp điền giấy. Phù hợp người không quen online hoặc cần hỏi cụ thể.\n\nCả 2 đều miễn phí + có hiệu lực trong 1 năm. Sau 1 năm muốn tiếp tục — phải nộp lại.',
    },
    {
      question: 'Tôi vắng nhà khi giao hàng, có 不在票 — hẹn lại thế nào?',
      answer:
        'Đọc giấy 不在票. Có 4 cách:\n\n1. **Gọi điện thoại** số trên giấy — tự động (nhập số tracking + ngày + giờ muốn hẹn).\n2. **Web** URL trên giấy — chọn ngày + giờ + cách giao (lại nhà / lấy ở bưu điện).\n3. **QR code** trên giấy — quét bằng app điện thoại.\n4. **Mang 不在票 + 身分証** đến bưu điện gần để lấy trực tiếp.\n\n**Hẹn trong vòng 1 tuần** — sau đó hàng trả lại người gửi. Hẹn xong, có thể chọn giao "trong ngày" nếu đăng ký trước 12 giờ trưa.',
    },
    {
      question: 'Tôi gửi đồ về VN — đồ gì bị cấm?',
      answer:
        'Đồ phổ biến BỊ CẤM hoặc HẠN CHẾ về VN (theo quy định hải quan VN — kiểm tra mới nhất với hải quan):\n• Thực phẩm tươi sống / chưa chế biến (thịt, cá, rau, sữa)\n• Hạt giống / cây / đất\n• Thuốc theo toa (cần kèm đơn bác sĩ + giấy tờ)\n• Mỹ phẩm có cồn cao (>24%)\n• Pin lithium dạng rời (lithium tích hợp trong thiết bị thường OK)\n• Vũ khí, đồ nghi pháo hoa, hóa chất\n• Tiền mặt > giới hạn quy định\n• Đồ giả thương hiệu\n\nĐỒ THƯỜNG OK: quần áo, sách, đồ chơi, mỹ phẩm thường, đồ điện tử (sạc, tai nghe), thực phẩm khô đóng gói (mì gói, kẹo, bánh quy nguyên gói).\n\nKHÔNG chắc → hỏi nhân viên bưu điện hoặc tham khảo trang Japan Post 国際郵便.',
    },
    {
      question: 'Hàng tôi gửi quốc tế chưa đến sau 1 tháng — phải làm gì?',
      answer:
        'Kiểm tra theo thứ tự:\n\n1. **Tracking** trên trang Japan Post hoặc 17track.net → xem trạng thái hiện tại.\n2. **Tracking dừng ở "出国" (đã xuất cảnh)** → hỏi hải quan VN hoặc Vietnam Post.\n3. **Tracking dừng ở "通関中" (đang xử lý hải quan)** → có thể bị giữ vì giấy tờ thiếu / nội dung nhạy cảm.\n4. **Hết thời gian dự kiến** → quay lại bưu điện đã gửi để claim. Mang biên lai. Phải claim trong 6 tháng kể từ ngày gửi (theo quy định Japan Post).\n5. Nếu mua bảo hiểm thêm → có thể được bồi thường giá trị khai báo.',
    },
    {
      question: 'Tôi gửi hàng về VN nhưng bưu điện nói không nhận tờ khai viết tay — phải làm sao?',
      answer:
        'Đúng — từ 03/2024, Japan Post KHÔNG còn nhận 税関告知書 viết tay cho kiện hàng có hàng hóa (áp dụng mọi quốc gia, gồm cả VN). Bắt buộc tạo nhãn gửi + khai hải quan điện tử (EAD) qua **国際郵便マイページサービス** (trang / app Japan Post, có thể dùng tiếng Anh) TRƯỚC khi ra quầy:\n\n1. Vào trang 国際郵便マイページサービス → tạo tài khoản.\n2. Chọn loại nội dung: quà tặng cá nhân hay hàng thương mại.\n3. Điền địa chỉ người nhận (theo mã bưu chính VN mới từ 01/07/2025), nội dung, giá trị, HS code cơ bản (hệ thống có gợi ý).\n4. Với kiện có hàng hóa gửi về VN: điền thêm mã số định danh cá nhân (12 số) hoặc mã số thuế của người nhận — thiếu có thể làm chậm thông quan ở VN.\n5. In nhãn tại nhà hoặc tại bưu điện (một số quầy có máy hỗ trợ nếu bạn chưa quen thao tác online).\n\nThư/bưu thiếp không kèm hàng hóa thường không cần EAD.',
    },
    {
      question: 'Tôi nhận SMS từ "Japan Post" yêu cầu nhấn link để xác nhận giao hàng — có thật không?',
      answer:
        'KHÔNG. Đây là **scam phổ biến** ở Nhật. Japan Post **KHÔNG BAO GIỜ** gửi SMS có link yêu cầu nhấn / điền thông tin / thanh toán.\n\nDấu hiệu giả mạo:\n• Link http (không https)\n• Domain lạ (không phải post.japanpost.jp)\n• Tin nhắn cấp bách "thanh toán trong 24 giờ"\n• Yêu cầu mã OTP / số thẻ\n\nNếu lỡ click → ngắt internet, đổi mật khẩu, gọi ngân hàng lock thẻ. Báo cảnh sát phi khẩn cấp #9110 hoặc 国民生活センター 188.',
    },
  ],
  counterPhrases: [
    {
      jp: '転送届を出したいです。',
      romaji: 'Tensoutodoke o dashitai desu.',
      vn: 'Tôi muốn nộp đơn chuyển tiếp thư.',
      note: 'Câu mở đầu khi chuyển nhà.',
    },
    {
      jp: '荷物を送りたいです。',
      romaji: 'Nimotsu o okuritai desu.',
      vn: 'Tôi muốn gửi hàng.',
      note: 'Tại quầy bưu điện hoặc コンビニ.',
    },
    {
      jp: 'ベトナムに送りたいです。',
      romaji: 'Betonamu ni okuritai desu.',
      vn: 'Tôi muốn gửi về Việt Nam.',
      note: 'Nhân viên sẽ hỏi loại (EMS / 航空便 / 船便) + nội dung.',
    },
    {
      jp: '追跡番号はありますか。',
      romaji: 'Tsuiseki bangou wa arimasu ka.',
      vn: 'Có số tracking không?',
      note: 'Quan trọng — luôn hỏi để theo dõi hàng. Phần lớn dịch vụ có tracking.',
    },
    {
      jp: '再配達をお願いしたいです。',
      romaji: 'Saihaitatsu o onegai shitai desu.',
      vn: 'Tôi muốn hẹn giao lại.',
      note: 'Khi mang 不在票 đến quầy hoặc gọi điện.',
    },
    {
      jp: 'この荷物は送れますか。',
      romaji: 'Kono nimotsu wa okuremasu ka.',
      vn: 'Hàng này có gửi được không?',
      note: 'Hỏi trước khi gửi đồ nhạy cảm — pin, mỹ phẩm cồn cao, thực phẩm.',
    },
    {
      jp: '何日くらいで届きますか。',
      romaji: 'Nan-nichi kurai de todokimasu ka.',
      vn: 'Khoảng mấy ngày thì đến?',
      note: 'EMS: 3–7 ngày. 航空便: 1–2 tuần. 船便: 1–3 tháng.',
    },
    {
      jp: '保険を付けたいです。',
      romaji: 'Hoken o tsuketai desu.',
      vn: 'Tôi muốn thêm bảo hiểm cho hàng.',
      note: 'Hữu ích cho hàng giá trị cao — claim được nếu mất / hỏng.',
    },
  ],
  officialLinks: [
    { label: '日本郵便', url: 'https://www.post.japanpost.jp/' },
    { label: '国民生活センター', url: 'https://www.kokusen.go.jp/' },
    { label: '日本郵便 — ベトナム宛 国際郵便（料金・条件・追跡）', url: 'https://www.post.japanpost.jp/cgi-kokusai/country.php?cid=208' },
    { label: '在ベトナム日本国大使館 — ベトナム出入国情報（持ち込み・持ち出し制限）', url: 'https://www.vn.emb-japan.go.jp/itpr_ja/JP_Shuttsunyukoku.html' },
  ],
  steps: [
    {
      step: 1,
      title: '転送届 — chuyển tiếp thư khi chuyển nhà',
      description:
        'Làm 1–2 tuần TRƯỚC khi chuyển nhà.\n\n**Cách 1: Online (e転居)**\n1. Vào trang Japan Post → e転居.\n2. Đăng ký account hoặc đăng nhập.\n3. Xác minh danh tính qua My Number app hoặc giấy tờ.\n4. Điền: địa chỉ cũ, địa chỉ mới, ngày bắt đầu chuyển, tên người chuyển.\n5. Nhận xác nhận qua email.\n\n**Cách 2: Tại bưu điện**\n1. Đến bưu điện gần.\n2. Mang 在留カード + bút.\n3. Lấy giấy 転送届 (nhân viên đưa hoặc tự lấy ở quầy).\n4. Điền tay. Nhân viên hỗ trợ nếu cần.\n5. Nộp giấy + 在留カード để xác minh.\n\n**Hiệu lực**: thư đến địa chỉ cũ tự động chuyển về địa chỉ mới trong 1 năm. Sau 1 năm — phải nộp lại nếu vẫn cần.\n\n**Phí**: MIỄN PHÍ.',
      documents: [
        '在留カード hoặc 身分証',
        'Địa chỉ cũ + địa chỉ mới',
      ],
      tip: 'KHÔNG chỉ dựa 転送届 — đồng thời cập nhật địa chỉ trực tiếp với: ngân hàng, 入管, 市役所, công ty, nhà mạng, NHK (nếu có), bảo hiểm. 転送届 chỉ chuyển tiếp 1 năm — sau đó tự gánh.',
    },
    {
      step: 2,
      title: '不在票 — nhận giao hàng khi không có nhà',
      description:
        'Khi vắng nhà giao hàng, người giao bỏ giấy 不在票 trong hộp thư. Đọc giấy + hẹn lại.\n\n**Trên 不在票 có**:\n• Số 追跡番号 (tracking number)\n• Ngày + giờ giao thử\n• Tên dịch vụ (ゆうパック, 国際郵便, etc.)\n• Số điện thoại + URL hẹn lại\n• QR code\n\n**4 cách hẹn lại**:\n\n1. **Điện thoại tự động**: gọi số trên giấy → nhập tracking → chọn ngày + giờ.\n\n2. **Web**: vào URL trên giấy → chọn ngày + giờ + địa điểm (lại nhà / lấy tại bưu điện / nhờ hàng xóm).\n\n3. **QR code**: quét bằng app camera điện thoại.\n\n4. **Tại bưu điện**: mang 不在票 + 在留カード đến lấy trực tiếp tại quầy. Mang trong vòng 1 tuần — sau đó hàng trả lại người gửi.\n\n**Khoảng thời gian giao lại**:\n• Sáng (8–12), Chiều (12–17), Tối (17–21) — tùy khu.\n• Đăng ký trước 12 giờ trưa thường được giao trong ngày.',
      documents: [
        '不在票',
        '在留カード (nếu lấy tại bưu điện)',
      ],
      tip: 'Nếu không thể nhận giờ làm việc → đăng ký "lấy tại bưu điện" — đến lấy lúc rảnh trong vòng 1 tuần.',
    },
    {
      step: 3,
      title: 'Gửi thư + hàng nội địa Nhật',
      description:
        '**Thư đến 50g**: dán tem 110円 (đồng giá — từ 10/2024 Japan Post gộp 2 mức cũ 84円/94円 thành 1 mức 110円), bỏ vào hộp đỏ ngoài đường (郵便ポスト) hoặc đưa quầy bưu điện. Trên 50g → tính theo cân.\n\n**Thư đặc biệt**:\n• 速達 (chuyển phát nhanh): +260円 trở lên.\n• 書留 (thư đảm bảo): +480円 trở lên — có tracking + bồi thường.\n• 内容証明郵便 (thư chứng minh nội dung): cho hợp đồng quan trọng (cooling-off, hủy NHK, etc.) — ~1,300円.\n\n**Hàng nội địa**: ゆうパック.\n• Tại bưu điện: cân + đo, dán nhãn, trả tiền.\n• Tại コンビニ (Lawson, 7-Eleven): có hộp + nhãn — tự dán + trả tại quầy.\n• Phí: 700–2,000円 tùy kích thước + khoảng cách.\n• Có tracking + bồi thường.\n\n**Lưu biên lai** — cần để theo dõi + claim nếu mất.',
      documents: [
        'Hàng cần gửi',
        'Địa chỉ người nhận tiếng Nhật',
        'Tiền mặt / thẻ tín dụng',
      ],
      tip: '内容証明郵便 dùng cho mọi tình huống cần "bằng chứng pháp lý đã gửi" — vd hủy hợp đồng NHK / mạng / bảo hiểm. Phí ~1,300円 nhưng đáng tiền khi tranh chấp.',
    },
    {
      step: 4,
      title: 'Gửi hàng quốc tế — về Việt Nam',
      description:
        '3 lựa chọn theo tốc độ + giá:\n\n**EMS** (Express Mail Service):\n• 3–7 ngày đến VN.\n• Phí cao nhất.\n• Có tracking + bảo hiểm cơ bản (có thể thêm).\n• Đến tận nhà người nhận.\n\n**航空便** (air mail):\n• 1–2 tuần đến VN.\n• Phí trung bình.\n• Có tracking nếu chọn 書留.\n\n**船便** (sea mail):\n• 1–3 tháng đến VN.\n• Phí rẻ nhất.\n• Phù hợp đồ nặng + không gấp (vd sách, đồ trang trí).\n\n**QUAN TRỌNG — từ 03/2024, không còn viết tay 税関告知書 cho hàng có hàng hóa**: phải tạo nhãn gửi + khai hải quan điện tử (EAD) qua **国際郵便マイページサービス** (trang / app Japan Post) TRƯỚC khi ra quầy — chọn loại nội dung (quà tặng / hàng thương mại), điền HS code, giá trị, rồi in nhãn. Quầy bưu điện không còn nhận form khai tay cho kiện có đồ vật.\n\n**Tại quầy bưu điện**:\n1. Cân + đo hàng.\n2. Đưa nhãn + 税関告知書 đã tạo online (hoặc để nhân viên hỗ trợ tạo nếu chưa quen — một số bưu điện có máy hỗ trợ).\n3. Điền địa chỉ người nhận tiếng Anh + số điện thoại VN.\n4. Trả phí.\n5. Nhận biên lai có 追跡番号 (tracking).\n\n**Địa chỉ Việt Nam — LƯU Ý mới**: từ 01/07/2025, Việt Nam đổi hệ thống địa chỉ + mã bưu chính mới. Ghi SAI địa chỉ / mã bưu chính theo hệ thống cũ → hàng có thể bị trả lại vì "không xác định được người nhận". Xác nhận địa chỉ mới với người nhận ở VN trước khi gửi. Với kiện có hàng hóa, Nhật Bản còn yêu cầu điền **mã số định danh cá nhân (12 số) hoặc mã số thuế** của người nhận VN vào mục khai hải quan — thiếu thông tin này có thể làm chậm thông quan.\n\n**KHAI BÁO TRUNG THỰC**:\n• Nội dung: chính xác (vd "Used clothes" thay vì "Gift" mơ hồ).\n• Giá trị: thực tế. KHÔNG khai sai / khai dưới giá trị thật để né thuế — có thể bị hải quan giữ + người nhận VN bị phạt.\n• Mức thuế nhập khẩu / VAT của VN tùy loại hàng + giá trị + hải quan đánh giá — không có công thức chung. Hỏi hải quan VN hoặc Vietnam Post nếu cần biết trước.',
      documents: [
        'Hàng đã đóng gói chắc chắn',
        'Địa chỉ người nhận tiếng Anh + mã bưu chính VN mới (từ 01/07/2025) + ZIP code',
        'Số điện thoại VN của người nhận',
        'Mã số định danh cá nhân (12 số) hoặc mã số thuế của người nhận VN (cho kiện có hàng hóa)',
        'Giá trị + nội dung hàng',
        '在留カード hoặc hộ chiếu',
      ],
      tip: 'Đóng gói: hộp các-tông + băng dính rộng + ghi rõ "Fragile" nếu dễ vỡ. Bưu điện có hộp bán riêng (~200–500円) hoặc dùng hộp cũ sạch.',
    },
    {
      step: 5,
      title: 'Theo dõi tracking + claim nếu mất',
      description:
        'Sau khi gửi:\n\n**Theo dõi**:\n1. Vào trang Japan Post → 追跡サービス → nhập số tracking.\n2. Hoặc 17track.net (theo dõi quốc tế nhiều quốc gia).\n3. App ゆうびんポータル.\n\n**Tracking trạng thái phổ biến**:\n• "引受" — đã nhận tại bưu điện gửi.\n• "国際交換局": chuyển qua trung tâm phân loại quốc tế.\n• "出国": đã rời Nhật.\n• "国際交換局到着" / "通関中" (VN): đến VN, đang qua hải quan.\n• "通関完了": đã qua hải quan.\n• "配達完了": đã giao.\n\n**Khi hàng chậm / mất**:\n1. Kiểm tra tracking — có thể đang ở bước nào.\n2. Đợi thêm tùy dịch vụ (EMS thường 7 ngày; 船便 đến 3 tháng).\n3. Quá thời gian → quay lại bưu điện đã gửi với biên lai. Yêu cầu **調査依頼書** (đơn yêu cầu điều tra).\n4. Claim trong 6 tháng kể từ ngày gửi.\n5. Có bảo hiểm thêm → được bồi thường tới giá trị khai báo.',
      documents: [
        'Biên lai gửi (có tracking number)',
        '在留カード',
      ],
      tip: 'Chụp ảnh hàng trước khi gửi — ngày gửi + nội dung. Hữu ích nếu cần claim. Nội dung trên ảnh phải khớp với 税関告知書.',
    },
  ],
};

export default postOfficeMailForwarding;
