import type { AdminGuide } from '../../../../types/content';

const creditCardForForeigners: AdminGuide = {
    id: 'credit-card-for-foreigners',
    category: 'money',
    lastVerified: '2026-05-02',
    priority: 'normal',
    title: 'Làm thẻ tín dụng tại Nhật',
    titleJp: 'クレジットカード申請・信用情報の作り方',
    icon: 'card',
    color: '#6C3483',
    description: 'Người nước ngoài mới sang Nhật thường bị từ chối thẻ tín dụng vì chưa có lịch sử tín dụng (信用情報) tại Nhật. Guide này giải thích cách bắt đầu đúng, thẻ nào dễ được duyệt nhất và cách xây dựng tín dụng để mở rộng quyền lợi về sau.',
    heroImage: require('../../../../../assets/content/daily-life/ag_credit-card_hero.jpg'),
    heroImageCaption: 'クレジットカード - xây dựng 信用情報 từng bước khi mới sang Nhật',
    whoIsThisFor: [
      'Người mới sang Nhật và muốn làm thẻ tín dụng nhưng chưa biết bắt đầu từ đâu.',
      'Người đã bị từ chối thẻ tín dụng và muốn hiểu lý do, cách cải thiện.',
      'Người muốn xây dựng 信用情報 để sau này dễ vay 住宅ローン hoặc xe ô tô.',
    ],
    whenToDo: [
      'Sau khi có tài khoản ngân hàng Nhật và đã cư trú ít nhất 3–6 tháng — nhiều công ty thẻ yêu cầu tài khoản ngân hàng Nhật để trích nợ tự động (口座振替).',
      'Không nên nộp đơn xin nhiều thẻ cùng lúc — mỗi lần xin bị ghi vào 信用情報 và nhiều lần từ chối liên tiếp làm xấu hồ sơ.',
    ],
    whereToDo: [
      'Website/app của công ty thẻ hoặc ngân hàng: nộp đơn xin thẻ và đăng ký 口座振替.',
      'Ngân hàng nơi bạn nhận lương: hỏi thẻ credit/debit phù hợp với hồ sơ hiện tại.',
      'CIC/JICC/KSC: kiểm tra 信用情報 của chính mình nếu bị từ chối nhiều lần hoặc nghi có lỗi dữ liệu.',
      'Municipal office/bưu điện: xác nhận địa chỉ và tên hiển thị trên giấy tờ nếu hồ sơ bị lệch thông tin.',
    ],
    documentsChecklist: [
      { label: '在留カード còn hiệu lực', required: true },
      { label: 'Tài khoản ngân hàng Nhật để trích nợ tự động', required: true },
      { label: 'Số điện thoại Nhật', required: true },
      { label: 'Địa chỉ hiện tại khớp 住民票/在留カード', required: true },
      { label: 'Thông tin việc làm và thu nhập năm', required: true },
      { label: 'My Number hoặc giấy tờ bổ sung', required: false, note: 'Một số tổ chức tài chính yêu cầu trong quy trình xác minh.' },
    ],
    commonMistakes: [
      'Nộp nhiều thẻ liên tiếp trong thời gian ngắn sau khi bị từ chối.',
      'Điền tên/địa chỉ không khớp giấy tờ Nhật, làm hệ thống xác minh tự động thất bại.',
      'Dùng リボ払い vì thấy số tiền trả hàng tháng thấp, nhưng không hiểu lãi cao và dư nợ kéo dài.',
      'Trả chậm tiền điện thoại trả góp hoặc thẻ tín dụng, khiến 信用情報 bị ảnh hưởng.',
      'Không kiểm tra lại 信用情報 khi nghi có sai sót hoặc bị từ chối bất thường.',
    ],
    faq: [
      {
        question: 'Bị từ chối thẻ có nghĩa là hồ sơ xấu không?',
        answer: 'Không nhất thiết. Với người mới ở Nhật, lý do thường là hồ sơ tín dụng còn mỏng, thời hạn lưu trú ngắn, thông tin xác minh chưa ổn hoặc tiêu chuẩn riêng của công ty thẻ. Nên chờ một thời gian, ổn định thu nhập và không nộp dồn dập.',
      },
      {
        question: 'Debit card có giúp xây 信用情報 không?',
        answer: 'Thường không. Debit card trừ tiền trực tiếp từ tài khoản nên không tạo lịch sử vay/trả như credit card. Nó hữu ích để thanh toán, nhưng không thay thế credit history.',
      },
      {
        question: 'Có thể tự xem 信用情報 của mình không?',
        answer: 'Có. CIC, JICC và 全国銀行個人信用情報センター đều có thủ tục khai示 cho chính người đó. Hãy kiểm tra cách nộp, giấy tờ và phí hiện hành trên trang chính thức từng tổ chức.',
      },
    ],
    officialLinks: [
      { label: '信用情報とは — CIC', url: 'https://www.cic.co.jp/confidence/index.html' },
      { label: '情報開示とは — CIC', url: 'https://www.cic.co.jp/mydata/index.html' },
      { label: '信用情報について — JICC', url: 'https://www.jicc.co.jp/aboutus/credit-info' },
      { label: '全国銀行個人信用情報センター — 全国銀行協会', url: 'https://www.zenginkyo.or.jp/pcic/' },
    ],
    steps: [
      {
        step: 1,
        title: 'Hiểu tại sao người nước ngoài dễ bị từ chối',
        description: 'Nhật Bản dùng hệ thống 信用情報 (credit bureau) quản lý bởi 3 tổ chức chính: CIC, JICC và 全国銀行個人信用情報センター (KSC). Khi mới sang Nhật, bạn không có hồ sơ trong hệ thống này — gọi là "薄い信用情報" (thin file). Công ty thẻ không thể đánh giá rủi ro nên từ chối.\n\nNgoài ra, các yếu tố làm khó thêm:\n• Thời hạn lưu trú ngắn còn lại trên 在留カード.\n• Chưa có hợp đồng lao động ổn định hoặc thu nhập thấp.\n• Địa chỉ thay đổi nhiều lần trong thời gian ngắn.\n• Chưa có tài khoản ngân hàng Nhật đủ lâu.',
        documents: [],
        tip: 'Không cần lo lắng quá — đây là tình trạng bình thường với bất kỳ người nào mới đến một quốc gia mới, kể cả người Nhật khi sang Mỹ lần đầu. Giải pháp là xây dựng từng bước, không phải chờ đợi.',
      },
      {
        step: 2,
        title: 'Bắt đầu với thẻ dễ được duyệt nhất',
        description: 'Theo thứ tự ưu tiên cho người mới:\n\n1. **Thẻ debit có chức năng Visa/Mastercard**: không cần xét duyệt tín dụng — mở cùng tài khoản ngân hàng. Dùng để thanh toán trực tuyến và tích điểm, nhưng thường không xây dựng 信用情報.\n\n2. **Thẻ tín dụng từ ngân hàng bạn đang có tài khoản**: dễ kiểm tra thông tin hơn vì ngân hàng đã có lịch sử giao dịch của bạn.\n\n3. **Thẻ từ cửa hàng hoặc dịch vụ bạn dùng thường xuyên**: đôi khi phù hợp hơn thẻ ngân hàng truyền thống, nhưng vẫn tùy tiêu chuẩn xét duyệt từng công ty.\n\n4. **Thẻ từ ngân hàng lớn hoặc thẻ premium**: thường phù hợp hơn sau khi đã có 6-12 tháng lịch sử tín dụng tại Nhật.',
        documents: [],
        tip: 'Không có thẻ nào "chắc chắn đậu". Chọn một thẻ phù hợp hồ sơ hiện tại, điền thông tin thật chính xác, rồi chờ kết quả thay vì nộp hàng loạt.',
      },
      {
        step: 3,
        title: 'Chuẩn bị hồ sơ xin thẻ',
        description: 'Thông tin cần cung cấp khi đăng ký (thường online, mất 10–15 phút):\n\n• Họ tên (romaji khớp với 在留カード và hộ chiếu)\n• Địa chỉ hiện tại (tiếng Nhật, chính xác theo 住民票)\n• Ngày sinh, quốc tịch\n• Tình trạng việc làm và thu nhập năm (年収)\n• Thông tin 在留カード: số thẻ, tư cách lưu trú, ngày hết hạn\n• Tài khoản ngân hàng Nhật để thanh toán tự động\n• Số điện thoại Nhật (bắt buộc cho xác thực)\n\nThẻ vật lý gửi về nhà sau 1–2 tuần nếu được duyệt.',
        documents: [
          '在留カード (số thẻ, tư cách lưu trú, ngày hết hạn)',
          'Tài khoản ngân hàng Nhật (số tài khoản và tên ngân hàng)',
          'Số điện thoại Nhật',
          'Thu nhập năm ước tính (年収) — không cần chứng từ khi đăng ký online',
        ],
        tip: 'Điền tên và địa chỉ chính xác 100% như trên 在留カード — sai một chữ có thể bị từ chối tự động. Tư cách lưu trú và ngày hết hạn là thông tin công ty thẻ kiểm tra kỹ nhất.',
      },
      {
        step: 4,
        title: 'Xây dựng 信用情報 để nâng hạn mức và mở rộng quyền lợi',
        description: 'Sau khi có thẻ đầu tiên, dùng đúng cách để xây dựng hồ sơ tín dụng:\n\n• Dùng đều hàng tháng: thanh toán điện, gas, điện thoại, Netflix qua thẻ — tạo lịch sử giao dịch đều đặn.\n• Thanh toán đầy đủ (全額払い) đúng hạn hàng tháng — không trả trễ dù chỉ 1 lần, vì ghi vào 信用情報 ngay.\n• Không dùng quá 30% hạn mức: nếu hạn mức 30 vạn yên, giữ số dư dưới 9 vạn yên tại bất kỳ thời điểm nào.\n• Sau 6–12 tháng: có thể xin nâng hạn mức hoặc xin thêm thẻ từ công ty khác.\n\nTránh: trả trả góp (リボ払い) — lãi suất 15–18%/năm, rất cao; và dịch vụ キャッシング (rút tiền mặt từ thẻ tín dụng) trừ trường hợp khẩn cấp.',
        documents: [],
        tip: 'Sau 1–2 năm có lịch sử tín dụng tốt, bạn có thể yêu cầu khai示 信用情報 tại CIC/JICC/KSC để biết hồ sơ mình ra sao trước khi xin vay lớn như 住宅ローン. Kiểm tra phí và cách nộp hiện hành trên trang chính thức.',
      },
    ],
  };

export default creditCardForForeigners;
