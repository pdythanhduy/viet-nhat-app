import type { AdminGuide } from '../../../../types/content';

const soleProprietorKojinJigyo: AdminGuide = {
    id: 'sole-proprietor-kojin-jigyo',
    category: 'money',
    lastVerified: '2026-08-22',
    priority: 'normal',
    title: 'Đăng ký kinh doanh cá nhân (個人事業主)',
    titleJp: '個人事業の開業・廃業等届出書・青色申告',
    icon: 'storefront-outline',
    color: '#784212',
    description: 'Khi tự kinh doanh, làm freelance hoặc có thu nhập ngoài lương tại Nhật, bạn có thể — và thường nên — đăng ký là 個人事業主. Thủ tục đơn giản, miễn phí, và mở ra nhiều lợi ích thuế đáng kể qua 青色申告.',
    heroImage: require('../../../../../assets/content/daily-life/ag_sole-prop_hero.jpg'),
    heroImageCaption: '個人事業主 - nộp 開業届 và quản lý thuế khi làm freelance tại Nhật',
    whoIsThisFor: [
      'Người làm freelance, nhận dự án cá nhân, bán hàng online hoặc có thu nhập sự nghiệp (事業所得) ngoài lương công ty.',
      'Người muốn khai báo thu nhập hợp pháp và tận dụng 青色申告特別控除 (giảm thuế tối đa 65 vạn yên/năm).',
      'Người nước ngoài đang ở Nhật theo tư cách lưu trú cho phép hoạt động kinh doanh — lưu ý: một số tư cách có hạn chế, kiểm tra trước.',
    ],
    whenToDo: [
      'Nộp 開業届 trong vòng 1 tháng kể từ ngày bắt đầu hoạt động kinh doanh theo hướng dẫn 国税庁.',
      'Nộp 青色申告承認申請書 đúng hạn: nếu mở từ 01/01 đến 15/01 thì hạn là 15/03; nếu mở từ 16/01 trở đi thì trong vòng 2 tháng từ ngày mở.',
      'Nếu đã kinh doanh từ trước mà chưa đăng ký: nộp ngay — không hồi tố nhưng bắt đầu từ đây là đúng hướng.',
    ],
    whereToDo: [
      '税務署 quản lý 納税地 của bạn: nộp 開業届, 青色申告承認申請書 và hỏi thủ tục thuế.',
      'e-Tax: nộp online nếu có マイナンバーカード hoặc phương thức đăng nhập phù hợp.',
      'Municipal office: xử lý 国民健康保険, 国民年金 và thuế cư trú nếu chuyển từ nhân viên công ty sang tự doanh.',
      'ISA hoặc 行政書士: kiểm tra tư cách lưu trú trước khi bắt đầu kinh doanh nếu visa hiện tại có giới hạn hoạt động.',
    ],
    documentsChecklist: [
      { label: '個人事業の開業・廃業等届出書', required: true },
      { label: '所得税の青色申告承認申請書', required: false, note: 'Rất nên nộp nếu muốn dùng 青色申告 từ năm đó.' },
      { label: 'My Number và giấy tờ xác minh danh tính', required: true },
      { label: '在留カード', required: true, note: 'Dùng để tự kiểm tra tư cách lưu trú và xuất trình khi cần.' },
      { label: 'Bản mô tả ngành nghề, ngày bắt đầu, 屋号 nếu có', required: true },
      { label: 'Tài khoản ngân hàng riêng cho kinh doanh', required: false, note: 'Không bắt buộc khi nộp 開業届 nhưng nên chuẩn bị để quản lý sổ sách.' },
    ],
    commonMistakes: [
      'Mở 個人事業 nhưng quên kiểm tra visa có cho phép hoạt động kinh doanh đó không.',
      'Nộp 開業届 nhưng quên 青色申告承認申請書 nên mất quyền dùng 青色申告 cho năm đầu.',
      'Trộn chi tiêu cá nhân và kinh doanh trong cùng tài khoản, sau đó khó làm 確定申告.',
      'Không lưu hóa đơn/領収書 và hợp đồng ngay từ ngày bắt đầu kinh doanh.',
      'Nghĩ doanh thu nhỏ thì không cần khai; nghĩa vụ khai phụ thuộc loại thu nhập và tình huống thuế, không chỉ cảm giác "nhỏ".',
    ],
    faq: [
      {
        question: 'Nộp 開業届 có tự động cho phép tôi kinh doanh theo visa không?',
        answer: 'Không. 開業届 là thủ tục thuế, không phải giấy phép cư trú. Nếu tư cách lưu trú hiện tại hạn chế hoạt động, cần kiểm tra với ISA hoặc 行政書士 trước.',
      },
      {
        question: '青色申告 có bắt buộc không?',
        answer: 'Không bắt buộc, nhưng rất đáng làm nếu bạn có hoạt động kinh doanh thật. Nộp đúng hạn giúp mở quyền lợi như 青色申告特別控除 và xử lý lỗ theo quy định.',
      },
      {
        question: 'Nộp 開業届 muộn thì có bị phạt không?',
        answer: '国税庁 nêu hạn nộp là trong 1 tháng từ ngày mở. Nếu đã trễ, nên nộp càng sớm càng tốt và từ đó quản lý sổ sách, hóa đơn và 確定申告 đúng.',
      },
    ],
    officialLinks: [
      { label: '個人で事業を始めたとき — 国税庁', url: 'https://www.nta.go.jp/publication/pamph/koho/kurashi/html/07_3.htm' },
      { label: '個人事業の開業届出・廃業届出等手続 — 国税庁', url: 'https://www.nta.go.jp/taxes/tetsuzuki/shinsei/annai/shinkoku/annai/04.htm' },
      { label: '所得税の青色申告承認申請手続 — 国税庁', url: 'https://www.nta.go.jp/taxes/tetsuzuki/shinsei/annai/shinkoku/annai/09.htm' },
    ],
    steps: [
      {
        step: 1,
        title: 'Kiểm tra tư cách lưu trú có cho phép kinh doanh không',
        description: 'Không phải tư cách lưu trú nào cũng được phép tự kinh doanh:\n\n• Được phép không hạn chế: 永住者, 定住者, 日本人の配偶者等, 永住者の配偶者等.\n• Cần xem xét kỹ: 技術・人文知識・国際業務 — hoạt động kinh doanh phải nằm trong phạm vi tư cách lưu trú; nếu kinh doanh ngoài ngành chuyên môn có thể cần xin phép thêm.\n• Có hạn chế: 留学, 家族滞在 — cần 資格外活動許可 và thu nhập từ kinh doanh có thể bị giới hạn theo giờ.\n• 特定技能, 技能実習: kinh doanh bên ngoài hợp đồng thường không được phép.\n\nNếu không chắc: hỏi ISA hoặc 行政書士 trước khi bắt đầu.',
        documents: [],
        tip: 'Mở 個人事業 không tự động thay đổi tư cách lưu trú của bạn — nhưng nếu vi phạm phạm vi hoạt động được phép, ISA có thể từ chối gia hạn visa. Kiểm tra trước, kinh doanh sau.',
      },
      {
        step: 2,
        title: 'Nộp 開業届 tại 税務署',
        description: '開業届 (個人事業の開業・廃業等届出書) là mẫu đơn miễn phí, nộp tại 税務署 quản lý địa chỉ cư trú của bạn. Điền: tên, địa chỉ, loại hình kinh doanh (事業の概要), ngày bắt đầu và tên doanh nghiệp nếu có (屋号).\n\nCó thể nộp bằng 3 cách:\n• Đến trực tiếp 税務署.\n• Gửi bưu điện (kèm phong bì hồi âm để nhận bản đóng dấu).\n• Qua e-Tax online (cần マイナンバーカード và đầu đọc thẻ hoặc smartphone).\n\nKhông mất phí, không cần đặt lịch hẹn.',
        documents: [
          '開業届 đã điền (mẫu 公式 tải trên trang 国税庁)',
          'Thẻ cư trú 在留カード',
          'My Number (số hoặc thẻ)',
        ],
        tip: 'Điền 屋号 (tên doanh nghiệp) nếu muốn dùng tên khác tên thật khi giao dịch — không bắt buộc nhưng có ích khi mở tài khoản ngân hàng kinh doanh riêng. Tên 屋号 không cần đăng ký thương hiệu để dùng.',
      },
      {
        step: 3,
        title: 'Nộp 青色申告承認申請書 — mở quyền lợi thuế lớn',
        description: '青色申告 là chế độ kế toán nâng cao cho 個人事業主, mang lại lợi ích thuế đáng kể:\n\n• 青色申告特別控除: nếu dùng kế toán kép (複式簿記) và nộp qua e-Tax → được trừ thẳng 65 vạn yên khỏi thu nhập chịu thuế mỗi năm. Nếu nộp giấy: 55 vạn yên. Kế toán đơn giản hơn (簡易帳簿): 10 vạn yên.\n• Chuyển lỗ: nếu năm nay lỗ, có thể chuyển sang bù trừ với lợi nhuận 3 năm tiếp theo.\n• Khấu hao nhanh: một số tài sản kinh doanh được khấu hao toàn bộ trong năm mua (30 vạn yên/món với điều kiện nhất định).\n\nHạn nộp theo 国税庁: nếu ngày mở từ 01/01 đến 15/01 thì hạn là 15/03; nếu mở từ 16/01 trở đi thì trong vòng 2 tháng từ ngày mở.',
        documents: [
          '青色申告承認申請書 (mẫu tải tại 国税庁)',
          'Số My Number',
        ],
        tip: 'Freee, Money Forward, または弥生 là các phần mềm kế toán phổ biến hỗ trợ tiếng Anh một phần — giúp làm sổ sách 複式簿記 và xuất file 確定申告 trực tiếp. Chi phí ~10,000–30,000 yên/năm, nhưng tiết kiệm rất nhiều thời gian và giảm sai sót.',
      },
      {
        step: 4,
        title: 'Bảo hiểm, thuế và nghĩa vụ định kỳ',
        description: 'Khi là 個人事業主, bạn tự quản lý bảo hiểm và thuế:\n\n• 国民健康保険: đăng ký tại municipal office — phí tính trên thu nhập năm trước.\n• 国民年金: đóng 第1号被保険者 — xin miễn giảm nếu thu nhập thấp.\n• 確定申告: bắt buộc hàng năm (tháng 2–3) — khai toàn bộ thu nhập kinh doanh.\n• 消費税: nếu doanh thu 2 năm trước vượt 1,000 vạn yên → năm hiện tại phải nộp 消費税. Năm đầu tiên thường miễn.\n• 住民税: tính trên thu nhập năm trước, billed tháng 6 — xem guide 住民税 riêng.\n• 予定納税: nếu thuế thu nhập năm trước từ 15 vạn yên trở lên, phải nộp ước tính trước 2 lần/năm (tháng 7 và 11).',
        documents: [],
        tip: 'Mở tài khoản ngân hàng riêng cho hoạt động kinh doanh (khác tài khoản cá nhân) ngay từ đầu — giúp phân tách rõ ràng thu chi cá nhân vs kinh doanh, dễ làm sổ sách và được 税務署 đánh giá cao khi kiểm tra.',
      },
    ],
  };

export default soleProprietorKojinJigyo;
