import type { AdminGuide } from '../../../../types/content';

const remittance: AdminGuide = {
    id: 'remittance',
    category: 'money',
    lastVerified: '2026-04-10',
    priority: 'normal',
    title: 'Chuyển tiền về Việt Nam',
    titleJp: 'ベトナムへの海外送金',
    icon: 'send',
    color: '#8E44AD',
    description: 'Hướng dẫn chọn dịch vụ chuyển tiền từ Nhật về Việt Nam. Phí, tỷ giá, hạn mức và thời gian nhận thay đổi theo nhà cung cấp.',
    heroImage: require('../../../../../assets/content/daily-life/dl_post-office_s2.jpg'),
    heroImageCaption: 'Gửi tiền quốc tế - so sánh phí, tỷ giá, hạn mức và cách người nhận nhận tiền',
    whoIsThisFor: [
      'Người Việt ở Nhật cần gửi tiền về cho gia đình hoặc tài khoản cá nhân tại Việt Nam.',
      'Người mới đi làm tại Nhật chưa biết nên dùng ngân hàng, dịch vụ remit hay app chuyển tiền.',
      'Người muốn tránh trung gian không rõ pháp lý và kiểm tra đúng thông tin người nhận trước khi gửi.',
    ],
    whenToDo: [
      'Trước khi gửi lần đầu, đăng ký và xác minh danh tính sớm vì có thể mất thời gian.',
      'Kiểm tra phí, tỷ giá và số tiền người nhận thực nhận ngay trước mỗi lần gửi.',
      'Với khoản lớn hoặc giao dịch đầu tiên, nên gửi sớm hơn hạn cần tiền vì có thể bị xác minh bổ sung.',
    ],
    whereToDo: [
      'Ứng dụng hoặc website của dịch vụ chuyển tiền đã đăng ký tại Nhật.',
      'ATM/quầy của ngân hàng hoặc dịch vụ như Seven Bank, SBI Remit, Wise tùy nhà cung cấp.',
      'Danh sách 金融庁 để kiểm tra dịch vụ có đăng ký hợp pháp tại Nhật.',
    ],
    documentsChecklist: [
      { label: 'Thẻ cư trú hoặc giấy tờ định danh được dịch vụ chấp nhận', required: true },
      { label: 'Giấy tờ My Number', required: false, note: 'Một số dịch vụ yêu cầu khi chuyển tiền quốc tế.' },
      { label: 'Tài khoản ngân hàng Nhật hoặc phương thức nạp tiền', required: true },
      { label: 'Thông tin người nhận tại Việt Nam', required: true, note: 'Tên không dấu, ngân hàng, số tài khoản, chi nhánh/SWIFT nếu dịch vụ yêu cầu.' },
      { label: 'Mục đích chuyển tiền', required: true, note: 'Ví dụ: gửi cho gia đình, chi phí sinh hoạt, tiết kiệm cá nhân.' },
    ],
    commonMistakes: [
      'Chỉ nhìn phí gửi mà không so sánh tỷ giá và số tiền người nhận thực nhận.',
      'Nhập tên người nhận không khớp tài khoản Việt Nam.',
      'Gửi qua cá nhân trung gian không rõ pháp lý để được tỷ giá tốt hơn.',
      'Không lưu mã giao dịch/số tham chiếu để tra soát khi tiền chậm về.',
      'Gửi sát hạn cần tiền mà không tính thời gian xác minh giao dịch đầu tiên.',
    ],
    faq: [
      {
        question: 'Nên chọn dịch vụ nào để gửi tiền?',
        answer: 'Không có dịch vụ tốt nhất cho mọi trường hợp. So sánh tổng chi phí gồm phí gửi, tỷ giá, phí nạp tiền, hạn mức và cách người nhận nhận tiền. Chỉ dùng ngân hàng hoặc 資金移動業者 đã đăng ký tại Nhật.',
      },
      {
        question: 'Có cần My Number khi chuyển tiền quốc tế không?',
        answer: 'Có thể cần tùy dịch vụ và hình thức xác minh. Một số dịch vụ chuyển tiền quốc tế tại Nhật yêu cầu giấy tờ liên quan My Number ngoài giấy tờ định danh.',
      },
      {
        question: 'Nếu nhập sai số tài khoản hoặc tên người nhận thì sao?',
        answer: 'Tiền có thể bị giữ, trả về hoặc mất phí xử lý. Trước khi xác nhận, kiểm tra lại tên không dấu, ngân hàng, số tài khoản và chi nhánh/SWIFT nếu dịch vụ yêu cầu.',
      },
    ],
    officialLinks: [
      { label: 'SBI Remit — Gửi tiền về Việt Nam', url: 'https://www.remit.co.jp/en/kaigaisoukin/sendremittance/remittancearea/vietnam/' },
      { label: 'Wise Japan', url: 'https://wise.com/jp' },
      { label: 'Seven Bank — Chuyển tiền quốc tế', url: 'https://www.sevenbank.co.jp/soukin' },
      { label: 'Danh sách業者 đăng ký — 金融庁', url: 'https://www.fsa.go.jp/menkyo/kinsho/shikin_idou/index.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Chọn dịch vụ phù hợp',
        description: 'Các lựa chọn phổ biến gồm SBI Remit, Wise, Seven Bank/Western Union và ngân hàng. So sánh tổng chi phí gồm phí gửi, tỷ giá, phí nạp tiền và cách người nhận nhận tiền.',
        image: require('../../../../../assets/content/daily-life/dl_post-office_s2.jpg'),
        imageCaption: 'ゆうちょ銀行 / Japan Post — một trong những kênh gửi tiền quốc tế quen thuộc với người Việt tại Nhật',
        documents: [],
        tip: 'Chỉ dùng ngân hàng hoặc 資金移動業者 đã đăng ký tại Nhật. Tránh chuyển qua cá nhân trung gian không rõ pháp lý.',
      },
      {
        step: 2,
        title: 'Đăng ký tài khoản & xác minh danh tính',
        description: 'Dịch vụ chuyển tiền tại Nhật phải xác minh danh tính theo quy định chống rửa tiền. Người dùng nước ngoài thường cần thẻ cư trú và có thể cần giấy tờ My Number khi dùng dịch vụ chuyển tiền quốc tế.',
        documents: [
          'Thẻ cư trú (在留カード) hoặc giấy tờ định danh được dịch vụ chấp nhận',
          'Giấy tờ My Number nếu dịch vụ yêu cầu cho chuyển tiền quốc tế',
          'Tài khoản ngân hàng Nhật — để nạp tiền gửi đi (SBI Remit, Wise)',
          'Thông tin tài khoản ngân hàng Việt Nam của người nhận — tên, tên ngân hàng, số tài khoản',
        ],
        tip: 'Seven Bank ghi người ký hợp đồng chuyển tiền quốc tế cần nộp giấy tờ liên quan My Number ngoài giấy tờ xác minh danh tính.',
      },
      {
        step: 3,
        title: 'Điền thông tin giao dịch — không để sai',
        description: '**Thông tin người nhận cần chuẩn bị trước:**\n\n| Trường | Lưu ý |\n|---|---|\n| 受取人氏名 | Tên Latin khớp chính xác với sổ tài khoản Việt Nam (không dấu) |\n| 受取銀行名 | Tên ngân hàng bằng tiếng Anh (VD: Vietcombank, MB Bank) |\n| 支店名 / Branch | Tên chi nhánh nếu dịch vụ yêu cầu |\n| 口座番号 | Số tài khoản (không phải số thẻ ATM) |\n| SWIFT / BICコード | Mã SWIFT của ngân hàng Việt Nam — tra tại trang ngân hàng |\n| 送金目的 | Chọn: 家族への仕送り (gửi cho gia đình) |\n\nKiểm tra lại số tiền người nhận thực nhận (sau phí + tỷ giá) trước khi bấm xác nhận — không thể hủy sau khi đã gửi.',
        documents: [],
        tip: 'Tên người nhận phải khớp chính xác với tên trên tài khoản tại Việt Nam — sai thứ tự tên hoặc thiếu chữ có thể khiến tiền bị giữ hoặc hoàn về mất phí.',
      },
      {
        step: 4,
        title: 'Theo dõi và nhận tiền',
        description: 'Thời gian nhận phụ thuộc dịch vụ, giờ làm việc ngân hàng, xác minh bổ sung và phương thức nhận. Giao dịch đầu tiên hoặc giao dịch lớn có thể mất lâu hơn.',
        image: require('../../../../../assets/content/daily-life/dl_post-office_s3.jpg'),
        imageCaption: 'Theo dõi giao dịch qua app — lưu số tham chiếu để liên hệ hỗ trợ nếu tiền chưa đến',
        documents: [],
        tip: 'Hạn mức và phí thay đổi theo dịch vụ, cấp xác minh và luật hiện hành. Kiểm tra trong app/website chính thức ngay trước khi gửi.',
      },
    ],
  };

export default remittance;
