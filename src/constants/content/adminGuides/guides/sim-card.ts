import type { AdminGuide } from '../../../../types/content';

const simCard: AdminGuide = {
    id: 'sim-card',
    category: 'daily-law',
    lastVerified: '2026-04-10',
    title: 'Đăng ký SIM điện thoại',
    titleJp: 'SIMカード契約',
    icon: 'phone-portrait',
    color: '#D35400',
    description: 'Hướng dẫn đăng ký SIM/eSIM tại Nhật. Từ 2026, xác minh danh tính online có xu hướng chặt hơn, nên cần kiểm tra giấy tờ từng nhà mạng.',
    heroImage: require('../../../../../assets/content/daily-life/dl_sim_s1.jpg'),
    heroImageCaption: 'Đăng ký SIM tại Nhật — cần 在留カード và địa chỉ khớp giấy tờ',
    whoIsThisFor: [
      'Người mới sang Nhật cần số điện thoại để làm ngân hàng, việc làm, trường học và xác thực app.',
      'Người muốn đổi nhà mạng, dùng eSIM hoặc chuyển sang gói rẻ hơn.',
      'Người có thẻ cư trú nhưng hồ sơ online bị từ chối do xác minh danh tính/địa chỉ.',
    ],
    whenToDo: [
      'Sau khi có địa chỉ cư trú và giấy tờ xác minh danh tính phù hợp.',
      'Trước khi mở ngân hàng hoặc đăng ký dịch vụ cần SMS nếu bạn chưa có số Nhật.',
      'Trước khi trả góp điện thoại, kiểm tra thời hạn lưu trú và điều kiện tín dụng của nhà mạng.',
    ],
    whereToDo: [
      'Cửa hàng nhà mạng lớn nếu cần hỗ trợ trực tiếp.',
      'Website/app nhà mạng hoặc MVNO nếu có đủ giấy tờ và phương thức thanh toán.',
      'Một số hồ sơ eSIM cần xác minh online chặt hơn SIM vật lý.',
    ],
    estimatedTime: 'Tại cửa hàng có thể dùng trong ngày nếu hồ sơ được duyệt. Online/eSIM phụ thuộc xác minh eKYC và gửi SIM hoặc kích hoạt app.',
    fees: [
      'Phí ban đầu, phí SIM/eSIM, phí gói cước và phí hủy/chuyển mạng phụ thuộc nhà mạng.',
      'Trả góp điện thoại là hợp đồng riêng và có thể bị từ chối nếu thời hạn lưu trú hoặc tín dụng không đủ.',
    ],
    documentsChecklist: [
      { label: 'Thẻ cư trú còn hiệu lực', required: true },
      { label: 'Địa chỉ hiện tại khớp giấy tờ', required: true },
      { label: 'Phương thức thanh toán', required: true, note: 'Thẻ tín dụng/debit hoặc tài khoản ngân hàng tùy nhà mạng.' },
      { label: 'Hộ chiếu hoặc My Number Card', required: false, note: 'Có thể cần tùy nhà mạng và cách đăng ký.' },
      { label: 'Điện thoại đã unlock và hỗ trợ băng tần/eSIM', required: false, note: 'Kiểm tra trước khi chọn nhà mạng.' },
    ],
    commonMistakes: [
      'Đăng ký bằng địa chỉ cũ hoặc địa chỉ không khớp thẻ cư trú.',
      'Không kiểm tra điện thoại có bị khóa mạng hay không.',
      'Chọn eSIM nhưng máy không hỗ trợ hoặc không biết cách chuyển eSIM khi đổi máy.',
      'Ký trả góp thiết bị mà không hiểu tổng chi phí và điều kiện hủy.',
      'Cho người khác mượn SIM đứng tên mình.',
    ],
    faq: [
      {
        question: 'Không có thẻ tín dụng có đăng ký SIM được không?',
        answer: 'Tùy nhà mạng. Một số nơi chấp nhận debit hoặc trích tài khoản ngân hàng, nhưng MVNO giá rẻ thường yêu cầu thẻ hoặc điều kiện thanh toán cụ thể.',
      },
      {
        question: 'eSIM có tốt hơn SIM vật lý không?',
        answer: 'eSIM tiện vì kích hoạt nhanh, nhưng cần máy hỗ trợ và quy trình xác minh có thể chặt. Người mới chưa quen có thể chọn SIM vật lý nếu muốn dễ xử lý hơn.',
      },
      {
        question: 'Có được cho bạn mượn SIM không?',
        answer: 'Không nên. SIM đứng tên bạn có thể liên quan xác minh danh tính, thanh toán và rủi ro pháp lý nếu bị dùng sai mục đích.',
      },
    ],
    officialLinks: [
      { label: 'Rakuten Mobile — Đăng ký online', url: 'https://network.mobile.rakuten.co.jp' },
      { label: 'IIJmio — MVNO giá rẻ', url: 'https://www.iijmio.jp' },
      { label: 'Chính sách viễn thông — 総務省', url: 'https://www.soumu.go.jp/main_sosiki/joho_tsusin/' },
    ],
    steps: [
      {
        step: 1,
        title: 'Chuẩn bị giấy tờ cần thiết',
        description: 'Người nước ngoài thường cần thẻ cư trú còn hiệu lực để xác minh danh tính. Tùy nhà mạng, có thể cần hộ chiếu, My Number Card hoặc giấy tờ bổ sung nếu địa chỉ không khớp.',
        documents: [
          'Thẻ cư trú (在留カード)',
          'Hộ chiếu hoặc My Number Card nếu nhà mạng yêu cầu',
          'Thẻ tín dụng, debit hoặc tài khoản ngân hàng Nhật để thanh toán',
        ],
        tip: 'Nếu thời hạn lưu trú còn quá ngắn, một số nhà mạng có thể từ chối hợp đồng hoặc hạn chế trả góp thiết bị.',
      },
      {
        step: 2,
        title: 'Chọn nhà mạng phù hợp',
        description: 'Nhà mạng lớn (docomo / au / SoftBank) có nhiều cửa hàng và hỗ trợ trực tiếp. MVNO như Rakuten Mobile, IIJmio, mineo thường rẻ hơn nhưng phụ thuộc đăng ký online, thiết bị tương thích và phương thức thanh toán.',
        documents: [],
        tip: 'Không nên ghi nhớ giá cố định vì gói cước thay đổi thường xuyên. Hãy kiểm tra giá ngay trước khi đăng ký.',
      },
      {
        step: 3,
        title: 'Đăng ký',
        description: 'Có thể đăng ký tại cửa hàng hoặc online. Đăng ký online có thể yêu cầu eKYC, chụp giấy tờ và selfie. Với eSIM, một số nhà mạng yêu cầu xác minh mạnh hơn so với SIM vật lý.',
        documents: [],
        tip: 'Do các biện pháp chống lừa đảo qua điện thoại, xác minh online/eSIM có thể thay đổi. Nếu hồ sơ bị từ chối, hãy thử đăng ký tại cửa hàng hoặc hỏi nhà mạng về giấy tờ thay thế.',
      },
      {
        step: 4,
        title: 'Kích hoạt và sử dụng',
        description: 'Sau khi nhận SIM, cắm vào điện thoại và kích hoạt theo hướng dẫn của nhà mạng. Với eSIM (Rakuten, một số MVNO): kích hoạt ngay qua app không cần chờ bưu điện. Kiểm tra APN settings nếu không có kết nối 4G/5G.',
        documents: [],
        tip: 'Điện thoại phải được unlock (mở khóa mạng) mới dùng được SIM của nhà mạng khác.',
      },
    ],
  };

export default simCard;
