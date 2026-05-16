import type { AdminGuide } from '../../../../types/content';

const simCard: AdminGuide = {
    id: 'sim-card',
    category: 'daily-law',
    lastVerified: '2026-05-16',
    title: 'Đăng ký SIM điện thoại',
    titleJp: 'SIMカード契約',
    icon: 'phone-portrait',
    color: '#D35400',
    description: 'Hướng dẫn đăng ký SIM/eSIM tại Nhật. Trong 2026, xác minh danh tính online (eKYC) ngày càng chặt — nên kiểm tra trước yêu cầu giấy tờ từng nhà mạng để tránh bị từ chối.',
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
    counterPhrases: [
      {
        jp: 'SIMの契約をしたいです。',
        romaji: 'SIM no keiyaku o shitai desu.',
        vn: 'Tôi muốn đăng ký SIM.',
        note: 'Câu mở đầu tại quầy nhà mạng.',
      },
      {
        jp: '本人確認は在留カードでいいですか。',
        romaji: 'Honnin kakunin wa zairyuu kaado de ii desu ka.',
        vn: 'Xác minh danh tính bằng 在留カード được không?',
      },
      {
        jp: '一番安いプランを教えてください。',
        romaji: 'Ichiban yasui puran o oshiete kudasai.',
        vn: 'Anh/chị giới thiệu giúp gói rẻ nhất.',
      },
      {
        jp: 'MNPで番号を引き継ぎたいです。',
        romaji: 'MNP de bangou o hikitsugi tai desu.',
        vn: 'Tôi muốn chuyển mạng nhưng giữ số cũ (MNP).',
        note: 'Cần MNP予約番号 từ nhà mạng cũ trước.',
      },
      {
        jp: 'SIMロック解除はできますか。',
        romaji: 'SIM rokku kaijo wa dekimasu ka.',
        vn: 'Có thể mở khóa SIM (SIMロック解除) được không?',
        note: 'Khi điện thoại bị khóa mạng cũ, hỏi để mở khóa miễn phí.',
      },
      {
        jp: '解約したいです。違約金はありますか。',
        romaji: 'Kaiyaku shitai desu. Iyakukin wa arimasu ka.',
        vn: 'Tôi muốn hủy hợp đồng. Có phí hủy không?',
      },
    ],
    keyTerms: [
      {
        term: '本人確認',
        reading: 'ほんにんかくにん',
        meaningVi: 'xác minh danh tính',
        noteVi: 'Bắt buộc khi đăng ký SIM. Mang 在留カード bản gốc, một số nhà mạng yêu cầu thêm địa chỉ giấy tờ khớp.',
      },
      {
        term: 'eKYC',
        reading: 'イーケーワイシー',
        meaningVi: 'xác minh danh tính online (eKYC)',
        noteVi: 'Đăng ký SIM online qua app: chụp ảnh giấy tờ + selfie. Quy trình eSIM thường nghiêm hơn SIM vật lý.',
      },
      {
        term: 'SIMロック解除',
        reading: 'シムロックかいじょ',
        meaningVi: 'mở khóa mạng SIM',
        noteVi: 'Điện thoại mua từ nhà mạng A thường bị khóa, không dùng SIM nhà mạng B được. Yêu cầu họ 解除 trước khi đổi mạng (miễn phí từ 2021).',
      },
      {
        term: 'MNP',
        reading: 'エムエヌピー',
        meaningVi: 'chuyển mạng giữ số (MNP)',
        noteVi: 'Khi đổi nhà mạng nhưng muốn giữ số cũ. Xin MNP予約番号 (mã chuyển) từ nhà mạng cũ → đem sang nhà mạng mới.',
      },
      {
        term: '解約',
        reading: 'かいやく',
        meaningVi: 'hủy hợp đồng',
        noteVi: 'Khi muốn ngưng dùng SIM. Nhiều hợp đồng cũ có 違約金 (phí hủy), nhưng đa số gói mới 2026 đã bỏ phí này.',
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
