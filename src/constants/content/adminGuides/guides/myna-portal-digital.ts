import type { AdminGuide } from '../../../../types/content';

const mynaPortalDigital: AdminGuide = {
    id: 'myna-portal-digital',
    category: 'daily-law',
    lastVerified: '2026-05-06',
    priority: 'normal',
    title: 'My Number Card số hóa — マイナポータル',
    titleJp: 'マイナンバーカード・マイナ保険証・マイナポータル',
    icon: 'phone-portrait',
    color: '#2980B9',
    description: 'Dùng My Number Card như thẻ bảo hiểm y tế số (マイナ保険証), tra cứu lịch sử pension/thuế/y tế và làm thủ tục hành chính online — đặc biệt quan trọng từ 2024 khi thẻ bảo hiểm truyền thống ngừng cấp mới.',
    legalScope: {
      appliesFrom: '2025-12-02',
      jurisdiction: 'national',
      jurisdictionNote: 'マイナ保険証 là hệ thống toàn quốc, nhưng cấp 資格確認書 và cập nhật bảo hiểm vẫn phụ thuộc bên bảo hiểm/municipal office/công ty.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-09-01',
      riskLevel: 'medium',
      whenToAskExpert: [
        'Bạn đổi việc, đổi bảo hiểm hoặc chuyển địa phương nhưng マイナ保険証 chưa phản ánh bảo hiểm mới.',
        'Bạn quên PIN My Number Card hoặc thẻ bị khóa.',
        'Bạn chưa có My Number Card và cần đi khám nhưng chưa nhận 資格確認書.',
      ],
    },
    quickAction: {
      deadline: 'Từ 02/12/2025, khi đi khám nên dùng マイナ保険証 hoặc 資格確認書; không dựa vào thẻ bảo hiểm cũ.',
      office: 'マイナポータル, kiosk tại cơ sở y tế, municipal office để reset PIN/cập nhật thẻ, hoặc nơi cấp bảo hiểm để hỏi 資格確認書.',
      doNow: [
        'Kiểm tra My Number Card có dùng được và còn nhớ PIN 4 số.',
        'Liên kết bảo hiểm y tế qua マイナポータル hoặc kiosk ở bệnh viện/phòng khám.',
        'Nếu chưa dùng được マイナ保険証, hỏi nơi cấp bảo hiểm về 資格確認書.',
      ],
      bring: ['My Number Card', 'PIN 4 số', 'Thông tin bảo hiểm hiện tại', '資格確認書 nếu chưa dùng マイナ保険証'],
      ifLate: 'Nếu đi khám mà không có マイナ保険証/資格確認書, liên hệ nơi cấp bảo hiểm để xin giấy xác nhận; có thể phải thanh toán theo hướng dẫn của cơ sở y tế rồi điều chỉnh sau.',
      officialSourceLabels: ['マイナ保険証の利用申込 — 厚生労働省', '資格確認方法について — 厚生労働省', 'Use of health insurance card in My Number Card — デジタル庁'],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_mynaportal_hero.jpg'),
    heroImageCaption: 'マイナポータル - dùng My Number Card để tra cứu bảo hiểm, pension và giấy tờ online',
    whoIsThisFor: [
      'Người đã có My Number Card vật lý (thẻ nhựa) và muốn dùng được nhiều tính năng hơn.',
      'Người cần dùng thẻ bảo hiểm y tế khi đi khám — từ 02/12/2025, thẻ bảo hiểm cũ đã hết hiệu lực chuyển tiếp.',
      'Người muốn tra cứu lịch sử pension, chi phí y tế hoặc nộp thuế online không cần đến cơ quan.',
    ],
    whenToDo: [
      'Ngay khi nhận My Number Card — đăng ký マイナポータル và liên kết bảo hiểm y tế.',
      'Khi thay đổi bảo hiểm y tế (đổi việc, mất việc): cần liên kết lại bảo hiểm mới.',
      'Nếu chưa có マイナ保険証: kiểm tra đã nhận 資格確認書 từ nơi cấp bảo hiểm chưa để không bị gián đoạn khi đi khám.',
    ],
    whereToDo: [
      'App マイナポータル (iOS / Android): đăng ký và tra cứu thông tin.',
      'Kiosk tại bệnh viện hoặc phòng khám: liên kết bảo hiểm y tế lần đầu.',
      'Municipal office: reset PIN nếu quên, hỗ trợ đăng ký.',
      'Convenience store (Lawson, Seven, FamilyMart): in giấy tờ hành chính có xác thực.',
    ],
    estimatedTime: 'Đăng ký マイナポータル và liên kết bảo hiểm mất khoảng 10–15 phút. Phản ánh lên hệ thống thường mất 1–3 ngày.',
    fees: [
      'Tất cả tính năng cơ bản của マイナポータル và マイナ保険証 miễn phí.',
      'In giấy tờ hành chính tại convenience store: khoảng 200–300 yên/tờ (rẻ hơn đến municipal office).',
    ],
    documentsChecklist: [
      { label: 'My Number Card (thẻ nhựa vật lý)', required: true, note: 'Khác với "通知カード" (giấy thông báo số) — giấy đó không dùng được để xác thực.' },
      { label: 'PIN 4 chữ số (利用者証明用電子証明書の暗証番号)', required: true, note: 'PIN đã đặt khi làm thẻ. Nếu quên, phải đến municipal office để reset — mang theo thẻ và hộ chiếu.' },
      { label: 'Smartphone có NFC (để đọc thẻ)', required: true, note: 'Hầu hết iPhone và Android hiện đại đều có NFC. Kiểm tra cài đặt nếu không chắc.' },
    ],
    commonMistakes: [
      'Nhầm My Number Card (thẻ nhựa xanh) với 通知カード (tờ giấy màu nâu/vàng gửi khi cấp số) — tờ giấy đó không dùng để đăng ký được.',
      'Quên PIN và không biết phải làm gì — cần đến municipal office để reset, không thể reset online.',
      'Liên kết bảo hiểm một lần xong tưởng dùng mãi — khi đổi việc hoặc đổi bảo hiểm phải liên kết lại bảo hiểm mới.',
      'Không phân biệt 資格確認書 với 資格情報のお知らせ — chỉ 資格確認書 mới dùng để đi khám khi không có マイナ保険証.',
      'Mang thẻ bảo hiểm cũ sau 02/12/2025 rồi nghĩ vẫn dùng được như trước.',
    ],
    faq: [
      {
        question: 'Thẻ bảo hiểm y tế cũ của tôi có còn dùng được không?',
        answer: 'Tính đến 2026, không nên dựa vào thẻ bảo hiểm cũ nữa. MHLW/Digital Agency nêu thẻ cũ hết hiệu lực chuyển tiếp muộn nhất vào 01/12/2025; từ 02/12/2025 khi đi khám dùng マイナ保険証 hoặc 資格確認書.',
      },
      {
        question: 'Tôi đổi việc thì マイナ保険証 có tự cập nhật không?',
        answer: 'Không tự cập nhật ngay. Sau khi tham gia bảo hiểm mới (shakai hoken hoặc kokuho), cần liên kết lại bảo hiểm mới qua kiosk ở bệnh viện hoặc qua マイナポータル. Thường mất 1–3 ngày để phản ánh lên hệ thống.',
      },
      {
        question: 'Không có điện thoại NFC thì có dùng được không?',
        answer: 'Vẫn dùng được マイナ保険証 tại bệnh viện có kiosk đọc thẻ — không nhất thiết phải qua điện thoại. Nhưng để dùng マイナポータル app đầy đủ thì cần điện thoại có NFC.',
      },
      {
        question: 'Thông tin trên マイナポータル có bị lộ ra không?',
        answer: 'マイナポータル yêu cầu xác thực bằng My Number Card và PIN mỗi lần đăng nhập, không lưu thông tin đăng nhập. Dữ liệu cá nhân do cơ quan nhà nước quản lý, không chia sẻ ra bên thứ ba ngoài mục đích hành chính.',
      },
    ],
    officialLinks: [
      { label: 'マイナポータル — デジタル庁', url: 'https://myna.go.jp/' },
      { label: 'マイナ保険証の利用申込 — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/index_16743.html' },
      { label: '資格確認方法について — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/newpage_50657.html' },
      { label: 'Use of health insurance card in My Number Card — デジタル庁', url: 'https://www.digital.go.jp/en/policies/mynumber/insurance-card' },
      { label: 'マイナンバーカード総合サイト', url: 'https://www.kojinbango-card.go.jp/' },
    ],
    steps: [
      {
        step: 1,
        title: 'Tải app マイナポータル và đăng ký tài khoản',
        description: 'Tải app "マイナポータル" từ App Store hoặc Google Play. Mở app, chọn "利用者登録" và đặt thẻ My Number lên mặt lưng điện thoại khi được yêu cầu. Nhập PIN 4 chữ số đã đặt khi làm thẻ.',
        documents: [
          'My Number Card (thẻ nhựa)',
          'PIN 4 chữ số của thẻ',
          'Điện thoại có NFC',
        ],
        tip: 'Nếu app báo lỗi đọc thẻ: thử đặt thẻ ở vị trí khác trên lưng điện thoại (vùng NFC khác nhau tùy máy), tháo ốp lưng dày ra và giữ yên thẻ trong khi đọc.',
      },
      {
        step: 2,
        title: 'Liên kết bảo hiểm y tế (マイナ保険証)',
        description: 'Tại phòng khám hoặc bệnh viện có kiosk đọc thẻ (biển "マイナンバーカード対応"), chọn "健康保険証の利用申込" và đặt thẻ vào máy. Hoặc làm qua マイナポータル app trong mục "健康保険証利用登録". Sau khi liên kết, dùng My Number Card thay thẻ bảo hiểm khi đăng ký khám.',
        documents: [
          'My Number Card',
          'PIN 4 chữ số',
        ],
        tip: 'Liên kết chỉ cần làm một lần. Sau khi đổi việc/đổi bảo hiểm cần làm lại với bảo hiểm mới — nhưng quy trình giống hệt lần đầu.',
      },
      {
        step: 3,
        title: 'Tra cứu thông tin pension và chi phí y tế',
        description: 'Trong app マイナポータル, vào mục "わたしの情報" để xem: lịch sử đóng pension (年金情報), chi phí khám bệnh đã dùng bảo hiểm trong năm (医療費情報) và thông tin hành chính khác. Dữ liệu y tế dùng được khi làm 確定申告 để xin khấu trừ chi phí y tế.',
        documents: [],
        tip: '医療費情報 trên マイナポータル thường phản ánh chậm 2–3 tháng sau khi khám. Cuối năm là thời điểm tốt để tổng hợp cho 確定申告.',
      },
      {
        step: 4,
        title: 'In giấy tờ hành chính tại convenience store',
        description: 'Tại máy in của Lawson, Seven-Eleven hoặc FamilyMart, chọn "行政サービス" và đặt My Number Card vào máy đọc. Có thể in: 住民票 (chứng nhận cư trú), 印鑑登録証明書, 戸籍証明書 và một số giấy tờ khác — rẻ hơn và nhanh hơn đến municipal office.',
        documents: [
          'My Number Card',
          'PIN 4 chữ số',
          '200–300 yên tiền mặt',
        ],
        tip: 'Giấy in tại convenience store có hiệu lực pháp lý như bản gốc từ municipal office — được chấp nhận ở ngân hàng, ISA và hầu hết cơ quan.',
      },
    ],
  };

export default mynaPortalDigital;
