import type { AdminGuide } from '../../../../types/content';

const bankAccount: AdminGuide = {
    id: 'bank-account',
    category: 'money',
    lastVerified: '2026-05-06',
    title: 'Mở tài khoản ngân hàng',
    titleJp: '銀行口座開設',
    icon: 'business',
    color: '#16A085',
    description: 'Hướng dẫn chuẩn bị giấy tờ khi mở tài khoản ngân hàng tại Nhật. Yêu cầu khác nhau theo ngân hàng, cách đăng ký và thời hạn lưu trú còn lại.',
    legalScope: {
      jurisdiction: 'mixed',
      jurisdictionNote:
        'Mở tài khoản là xét duyệt của từng ngân hàng theo quy định xác minh danh tính, cư trú và phòng chống rửa tiền. Giấy tờ cư trú do municipal office/ISA cấp, còn việc có nhận hồ sơ, yêu cầu dấu/chữ ký hay bổ sung giấy tờ là chính sách của ngân hàng.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-10-01',
      riskLevel: 'medium',
      whenToAskExpert: [
        'Bạn bị nhờ mở hộ, bán, cho mượn tài khoản, cash card, app ngân hàng, OTP hoặc SIM.',
        'Thẻ cư trú còn hạn ngắn, địa chỉ chưa cập nhật, tên trên giấy tờ không khớp hoặc hồ sơ bị ngân hàng từ chối nhiều lần.',
        'Bạn chuẩn bị rời Nhật, nhận/chuyển khoản lớn hoặc cần giữ tài khoản cho mục đích đặc biệt.',
      ],
    },
    quickAction: {
      deadline:
        'Làm sau khi đăng ký địa chỉ; cập nhật ngân hàng ngay khi đổi địa chỉ, đổi tên, gia hạn thẻ cư trú hoặc rời Nhật.',
      office:
        'Ngân hàng/ứng dụng ngân hàng bạn chọn; municipal office và ISA chỉ là nơi cấp/cập nhật giấy tờ cư trú.',
      doNow: [
        'Mở trang chính thức của ngân hàng để kiểm tra điều kiện người nước ngoài, giấy tờ, thời hạn lưu trú còn lại và cách nộp hồ sơ.',
        'Chuẩn bị thẻ cư trú có địa chỉ hiện tại, giấy tờ đang làm việc/đang học nếu mới nhập cảnh, và phương thức liên hệ tại Nhật.',
        'Từ chối mọi đề nghị mở hộ, cho mượn, bán tài khoản/cash card/app/OTP vì đây là vùng rủi ro pháp lý cao.',
      ],
      bring: [
        'Thẻ cư trú hoặc Special Permanent Resident Certificate còn hiệu lực',
        'Giấy tờ có địa chỉ hiện tại khớp với đơn đăng ký',
        'Số điện thoại/email Nhật đang dùng',
        'Giấy xác nhận đang làm việc/đang học nếu ngân hàng yêu cầu',
        'Con dấu hoặc chữ ký mẫu nếu ngân hàng/quầy xử lý yêu cầu',
      ],
      ifLate:
        'Nếu không cập nhật thông tin khi ngân hàng yêu cầu, tài khoản có thể bị hạn chế. Nếu cho mượn/bán tài khoản, rủi ro không chỉ là khóa tài khoản mà còn có thể liên quan điều tra lừa đảo hoặc rửa tiền.',
      officialSourceLabels: [
        'Japan Post Bank — Người nước ngoài',
        'SBI Shinsei Bank — Người nước ngoài',
        '金融庁からのお願い・注意喚起 — 金融庁',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_bank-account_hero.jpg'),
    heroImageCaption: '通帳 — sổ ngân hàng Nhật, cấp kèm khi mở tài khoản tại các ngân hàng truyền thống',
    whoIsThisFor: [
      'Người mới sang Nhật cần tài khoản nhận lương, học bổng, hoàn thuế hoặc thanh toán sinh hoạt.',
      'Người đã có địa chỉ cư trú tại Nhật và cần mở tài khoản cá nhân.',
      'Người bị ngân hàng yêu cầu cập nhật thông tin sau khi đổi địa chỉ, đổi tên hoặc gia hạn thẻ cư trú.',
    ],
    whenToDo: [
      'Sau khi hoàn tất đăng ký địa chỉ và có giấy tờ chứng minh địa chỉ hiện tại.',
      'Trước khi bắt đầu nhận lương/học bổng nếu công ty hoặc trường yêu cầu tài khoản Nhật.',
      'Khi gia hạn thẻ cư trú hoặc đổi địa chỉ, cập nhật ngân hàng sớm để tránh hạn chế giao dịch.',
    ],
    whereToDo: [
      'Chi nhánh ngân hàng hoặc bưu điện tùy ngân hàng.',
      'App/website của ngân hàng nếu hỗ trợ mở tài khoản online cho hồ sơ của bạn.',
      'Một số ngân hàng yêu cầu nhận thư xác nhận tại địa chỉ đăng ký.',
    ],
    estimatedTime: 'Đăng ký tại quầy có thể xử lý trong ngày hoặc cần xét duyệt thêm. Đăng ký online thường mất vài ngày đến khi nhận thẻ/app kích hoạt.',
    fees: [
      'Mở tài khoản cá nhân thường không mất phí, nhưng phí duy trì/chuyển khoản/rút tiền phụ thuộc ngân hàng và gói dịch vụ.',
      'Chuyển khoản quốc tế, rút ATM ngoài hệ thống hoặc phát hành lại thẻ có thể mất phí.',
    ],
    documentsChecklist: [
      { label: 'Thẻ cư trú còn hiệu lực', required: true },
      { label: 'Địa chỉ hiện tại khớp giấy tờ', required: true, note: 'Ngân hàng thường kiểm tra địa chỉ trên thẻ cư trú/giấy tờ.' },
      { label: 'Số điện thoại Nhật', required: false, note: 'Nhiều ngân hàng cần để xác thực SMS hoặc liên hệ.' },
      { label: 'My Number Card hoặc giấy tờ bổ sung', required: false, note: 'Có thể cần khi mở online hoặc khi ngân hàng yêu cầu xác minh thêm.' },
      { label: 'Giấy xác nhận đang làm việc/đang học', required: false, note: 'Hữu ích nếu mới nhập cảnh hoặc chưa đủ thời gian cư trú.' },
      { label: 'Con dấu hoặc chữ ký mẫu', required: false, note: 'Không mặc định bắt buộc ở mọi ngân hàng; kiểm tra yêu cầu của ngân hàng/quầy xử lý trước khi đi.' },
    ],
    commonMistakes: [
      'Địa chỉ trên giấy tờ không khớp địa chỉ đang khai trong đơn.',
      'Thời hạn lưu trú còn quá ngắn nên hồ sơ bị từ chối hoặc yêu cầu bổ sung.',
      'Không kiểm tra trước ngân hàng yêu cầu chữ ký hay 印鑑, dẫn đến phải bổ sung hồ sơ.',
      'Mở hộ, cho mượn, bán tài khoản hoặc cash card cho người khác.',
      'Không cập nhật thông tin sau khi đổi visa/đổi địa chỉ.',
      'Không đọc phí chuyển khoản/rút ATM dẫn đến mất phí không cần thiết.',
    ],
    faq: [
      {
        question: 'Mới sang Nhật dưới 6 tháng có mở được tài khoản không?',
        answer: 'Tùy ngân hàng. Một số nơi có điều kiện hoặc yêu cầu giấy xác nhận đang làm việc/đang học. Japan Post Bank thường được người mới cân nhắc, nhưng vẫn cần kiểm tra yêu cầu chính thức.',
      },
      {
        question: 'Có được cho bạn mượn tài khoản nhận tiền không?',
        answer: 'Không. Tài khoản/cash card/app ngân hàng đứng tên bạn phải do bạn quản lý. Bán, chuyển nhượng hoặc cho người khác dùng có thể liên quan lừa đảo/rửa tiền và bị ngân hàng/cơ quan chức năng xử lý.',
      },
      {
        question: 'Mở tài khoản có bắt buộc phải có con dấu không?',
        answer: 'Không thể nói chung cho mọi ngân hàng. Một số ngân hàng/quầy vẫn yêu cầu 印鑑 hoặc chữ ký mẫu, nhưng nhiều quy trình online/eKYC xử lý bằng giấy tờ và chữ ký điện tử. Kiểm tra trang chính thức hoặc gọi chi nhánh trước khi đi.',
      },
      {
        question: 'Đổi địa chỉ có cần báo ngân hàng không?',
        answer: 'Có. Nếu không cập nhật, thư xác nhận không đến nơi hoặc tài khoản có thể bị hạn chế khi ngân hàng kiểm tra thông tin.',
      },
    ],
    officialLinks: [
      { label: 'Japan Post Bank — Người nước ngoài', url: 'https://www.jp-bank.japanpost.jp/kaisetu/kat_gaikokujin.html' },
      { label: 'SMBC — Hỏi đáp mở tài khoản', url: 'https://qa.smbc.co.jp/faq/show/2835' },
      { label: 'SBI Shinsei Bank — Người nước ngoài', url: 'https://www.sbishinseibank.co.jp/account/note/note_foreign.html' },
      { label: '金融庁からのお願い・注意喚起 — 金融庁', url: 'https://www.fsa.go.jp/ordinary/chuui/chuui.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Kiểm tra điều kiện',
        description: 'Ngân hàng thường yêu cầu bạn là cư dân tại Nhật, có địa chỉ hiện tại khớp với giấy tờ và thẻ cư trú còn hiệu lực. Một số ngân hàng không tiếp nhận nếu thời hạn lưu trú còn dưới 3 tháng.',
        documents: [],
        tip: 'Nếu mới nhập cảnh dưới 6 tháng, một số ngân hàng có thể yêu cầu giấy xác nhận đang làm việc hoặc giấy tờ bổ sung.',
      },
      {
        step: 2,
        title: 'Chọn ngân hàng phù hợp',
        description: 'Japan Post Bank (ゆうちょ銀行) thường được người mới sử dụng nhiều. SMBC/SMBC Trust, SBI Shinsei, Rakuten Bank và các ngân hàng online có quy trình riêng; hồ sơ có thể khác giữa đăng ký bằng smartphone, PC và tại quầy.',
        documents: [],
        tip: 'Không có ngân hàng nào chắc chắn duyệt cho mọi trường hợp. Hãy kiểm tra trang chính thức của ngân hàng trước khi nộp.',
        image: require('../../../../../assets/content/daily-life/ag_bank-account_s2.jpg'),
        imageCaption: 'ゆうちょ銀行 — bưu điện Nhật Bản, thường được người mới sang cân nhắc mở tài khoản đầu tiên',
      },
      {
        step: 3,
        title: 'Điền 口座開設申込書 & nộp hồ sơ',
        description: '**Các trường trên 口座開設申込書** (form đăng ký tại quầy hoặc online):\n\n| Trường | Ghi như thế nào |\n|---|---|\n| 氏名 / フリガナ | Tên theo 在留カード; フリガナ viết KATAKANA |\n| 生年月日 | Ngày/tháng/năm sinh (西暦 — dương lịch) |\n| 現住所 | Địa chỉ khớp chính xác với 在留カード |\n| 電話番号 | Số Nhật đang dùng (SIM Nhật) |\n| 職業 | Công ty đang làm hoặc 学生/無職 nếu chưa có |\n| 在留資格 / 在留期限 | Copy từ 在留カード |\n| 口座利用目的 | Thường chọn: 給与受取・生活費 |\n\nNgân hàng online yêu cầu chụp ảnh 在留カード (mặt trước + sau) qua app eKYC.',
        documents: [
          'Thẻ cư trú (在留カード) hoặc Special Permanent Resident Certificate',
          'Giấy tờ có địa chỉ hiện tại khớp với đơn đăng ký',
          'My Number Card, bằng lái Nhật, giấy xác nhận tư cách bảo hiểm hoặc giấy xác nhận đang làm việc nếu ngân hàng yêu cầu',
          'Con dấu hoặc chữ ký mẫu nếu ngân hàng yêu cầu',
        ],
        tip: 'Tên và địa chỉ trên tất cả giấy tờ phải khớp nhau. Nếu dùng 印鑑, dùng đúng dấu ngân hàng yêu cầu, không dùng dấu đăng ký của người khác.',
      },
      {
        step: 4,
        title: 'Nhận thẻ và sổ ngân hàng',
        description: 'Sau khi đăng ký, thẻ cash card, thông tin tài khoản hoặc app banking sẽ được cấp theo quy trình của từng ngân hàng. Một số ngân hàng không phát hành sổ giấy mặc định.',
        documents: [],
        tip: 'Nếu đổi địa chỉ, đổi tên hoặc gia hạn thẻ cư trú, hãy cập nhật thông tin với ngân hàng để tránh bị hạn chế giao dịch.',
      },
    ],
  };

export default bankAccount;
