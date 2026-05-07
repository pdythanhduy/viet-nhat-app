import type { AdminGuide } from '../../../../types/content';

const bankingRemittanceAntiFraud: AdminGuide = {
    id: 'banking-remittance-anti-fraud',
    category: 'money',
    lastVerified: '2026-04-11',
    priority: 'high',
    title: 'Ngân hàng, chuyển tiền và chống khóa tài khoản',
    titleJp: '銀行口座・海外送金・マネロン対策の基本',
    icon: 'card-outline',
    color: '#1F618D',
    description: 'Guide thực tế về mở tài khoản ngân hàng, chuyển tiền quốc tế, lý do bị yêu cầu xác minh thêm, rủi ro tài khoản bị hạn chế/khóa và những hành vi tuyệt đối không nên làm ở Nhật.',
    heroImage: require('../../../../../assets/content/daily-life/ag_banking-guide_hero.jpg'),
    heroImageCaption: 'Ngân hàng và chuyển tiền quốc tế — dùng đúng để tránh bị khóa tài khoản',
    whoIsThisFor: [
      'Người mới sang Nhật muốn mở tài khoản và dùng hợp pháp, ổn định lâu dài.',
      'Người thường xuyên chuyển tiền về Việt Nam hoặc nhận tiền từ nhiều nơi.',
      'Người bị ngân hàng hỏi thêm giấy tờ, tạm khóa giao dịch hoặc nghi ngờ do AML/anti-fraud.',
    ],
    whenToDo: [
      'Trước khi mở tài khoản, đăng ký app ngân hàng, thẻ debit hoặc dịch vụ chuyển tiền.',
      'Ngay khi công việc, địa chỉ, tư cách lưu trú hoặc mục đích sử dụng tài khoản thay đổi.',
      'Ngay khi nhận được email/thư/cuộc gọi yêu cầu xác minh thêm hoặc khi giao dịch bắt đầu bị chặn.',
    ],
    whereToDo: [
      'Ngân hàng / app ngân hàng / quầy giao dịch: mở tài khoản, cập nhật thông tin, giải trình giao dịch.',
      '金融庁 / Hiệp hội ngân hàng: nguồn để hiểu vì sao ngân hàng yêu cầu本人確認 và AML.',
      'Cảnh sát / cơ quan tư vấn nếu có dấu hiệu lừa đảo, bị dụ bán tài khoản, cho thuê thẻ hoặc bị dùng tên để phạm tội.',
    ],
    estimatedTime: 'Mở tài khoản có thể xong nhanh nếu hồ sơ rõ, nhưng việc xác minh bổ sung hoặc giao dịch quốc tế có thể mất thêm thời gian. Khi tài khoản bị soi AML, tốc độ xử lý phụ thuộc rất lớn vào việc bạn cung cấp giấy tờ và giải thích có hợp lý, nhất quán hay không.',
    fees: [
      'Phí chuyển tiền quốc tế, chênh lệch tỷ giá và phí ngân hàng trung gian có thể làm số tiền thực nhận thấp hơn dự kiến.',
      'Một số ngân hàng hoặc dịch vụ chuyển tiền tính phí riêng theo số tiền, quốc gia nhận hoặc cách nhận tiền mặt/tài khoản.',
      'Tài khoản ngân hàng ở Nhật không chỉ có chi phí, mà còn có nghĩa vụ hợp tác với thủ tục本人確認 và AML. Không hợp tác hoặc khai sai có thể dẫn tới hạn chế dịch vụ.',
    ],
    documentsChecklist: [
      { label: 'Giấy tờ本人確認: thẻ cư trú, địa chỉ, ngày sinh, tên đúng theo giấy tờ', required: true },
      { label: 'Thông tin công việc, trường học, mục đích dùng tài khoản', required: true },
      { label: 'Nếu chuyển tiền quốc tế: thông tin người nhận, mục đích chuyển, chứng từ nguồn tiền nếu được hỏi', required: false },
      { label: 'Bằng chứng thu nhập hoặc giao dịch hợp pháp nếu tài khoản bị hỏi thêm', required: false },
      { label: 'Tuyệt đối không giao thẻ, sổ, OTP, app, mật khẩu, SIM hay tài khoản cho người khác dùng', required: true },
    ],
    commonMistakes: [
      'Mượn danh mở tài khoản hoặc cho người khác dùng tài khoản của mình.',
      'Bán thẻ ATM, cho thuê tài khoản, đưa OTP/app ngân hàng cho người khác “nhận tiền hộ”.',
      'Nhận/chuyển nhiều khoản tiền lạ mà không giải thích được nguồn và mục đích.',
      'Không cập nhật địa chỉ, tư cách lưu trú hoặc nghề nghiệp khi ngân hàng yêu cầu.',
      'Nghĩ ngân hàng hỏi thêm giấy tờ là “làm khó người nước ngoài”, trong khi nhiều trường hợp là nghĩa vụ AML áp dụng chung.',
      'Tưởng khóa app hay chặn giao dịch là lỗi kỹ thuật đơn thuần nên tiếp tục cố chuyển thêm nhiều lần.',
    ],
    faq: [
      {
        question: 'Vì sao ngân hàng Nhật hay hỏi thêm giấy tờ hoặc mục đích giao dịch?',
        answer: '金融庁 giải thích ngân hàng phải thực hiện本人確認 và các biện pháp chốngマネー・ローンダリング/テロ資金供与. Tùy loại giao dịch, ngân hàng có thể hỏi thêm về nghề nghiệp, mục đích dùng tài khoản, nguồn tiền hoặc lý do chuyển tiền ra nước ngoài.',
      },
      {
        question: 'Cho bạn bè mượn tài khoản để nhận tiền hộ có sao không?',
        answer: 'Rất rủi ro. 金融庁 cảnh báo rõ “口座売買は犯罪です”. Việc bán, cho thuê, cho mượn tài khoản, thẻ, thông tin đăng nhập hoặc đứng tên hộ có thể dẫn tới khóa tài khoản, điều tra hình sự và liên đới các vụ lừa đảo.',
      },
      {
        question: 'Tài khoản bị khóa hoặc bị hạn chế giao dịch thì làm gì trước?',
        answer: 'Đầu tiên dừng các giao dịch đáng ngờ, không cố chuyển thêm. Sau đó liên hệ chính ngân hàng, chuẩn bị giấy tờ本人確認, giải thích rõ nguồn tiền, mục đích giao dịch, hợp đồng lao động hoặc các chứng từ liên quan. Nếu có yếu tố lừa đảo, báo cảnh sát và giữ toàn bộ lịch sử trao đổi.',
      },
      {
        question: 'Chuyển tiền về Việt Nam có cần khai mục đích không?',
        answer: 'Có thể có. Theo hướng dẫn của hiệp hội ngân hàng và yêu cầu AML, ngân hàng hoặc dịch vụ chuyển tiền có thể cần biết mục đích và người nhận, đồng thời một số dữ liệu cá nhân sẽ đi cùng điện chuyển tiền quốc tế.',
      },
      {
        question: 'Người nước ngoài có dễ bị từ chối mở tài khoản không?',
        answer: 'Có thể gặp thêm bước xác minh, nhưng lý do thường xoay quanh本人確認, địa chỉ cư trú, thời hạn lưu trú, khả năng liên lạc và mục đích sử dụng tài khoản. Điều quan trọng là hồ sơ khớp nhau và bạn giải thích rõ ràng, nhất quán.',
      },
    ],
    officialLinks: [
      { label: '金融機関におけるマネロン・テロ資金供与・拡散金融対策について — 金融庁', url: 'https://www.fsa.go.jp/policy/amlcftcpt/index.html' },
      { label: '金融サービス利用者相談室（本人確認の相談等）— 金融庁', url: 'https://www.fsa.go.jp/receipt/soudansitu/advice01.html' },
      { label: '金融庁からのお願い・注意喚起（口座売買は犯罪です！）— 金融庁', url: 'https://www.fsa.go.jp/ordinary/chuui/chuui.html' },
      { label: '本人確認書類って何？ — 全国銀行協会', url: 'https://www.zenginkyo.or.jp/article/tag-f/7483/' },
      { label: '外国送金するときの個人情報の取扱いは？ — 全国銀行協会', url: 'https://www.zenginkyo.or.jp/article/tag-f/17491/' },
      { label: '外国人在留支援センター（FRESC）— 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/support/fresc/fresc01.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Mở tài khoản: dùng đúng tên, đúng địa chỉ, đúng mục đích',
        description: 'Ngay từ lúc mở tài khoản, mọi thông tin phải khớp giữa thẻ cư trú, địa chỉ, tên romaji, ngày sinh, công việc hoặc trường học. Sai từ bước này sẽ kéo dài thành lỗi ở thẻ, app, chuyển khoản và xác minh sau này.',
        documents: [
          '在留カード',
          'Giấy tờ địa chỉ nếu được yêu cầu',
          'Thông tin công ty hoặc trường học',
        ],
        tip: 'Nếu tên trên giấy tờ Việt Nam và romaji có khác biệt cách viết, hãy chốt một cách viết đúng theo giấy chính thức và dùng nhất quán mọi nơi.',
      },
      {
        step: 2,
        title: 'Hiểu vì sao ngân hàng hỏi thêm',
        description: 'Nhiều người chỉ thấy “ngân hàng làm khó”, nhưng về nguyên tắc ngân hàng phải hỏi để đáp ứng本人確認 và AML. Tài khoản mới, giao dịch quốc tế, tiền vào ra bất thường hoặc mô tả nghề nghiệp không rõ đều có thể kéo theo câu hỏi bổ sung.',
        documents: [
          'Thông tin nghề nghiệp',
          'Mục đích sử dụng tài khoản',
          'Nguồn tiền nếu giao dịch lớn hoặc khác thường',
        ],
        tip: 'Trả lời nhất quán, ngắn gọn và bám chứng từ. Giải thích vòng vo hoặc thay đổi câu chuyện giữa các lần liên hệ là tự làm tình hình xấu hơn.',
      },
      {
        step: 3,
        title: 'Chuyển tiền quốc tế: tính cả phí, tỷ giá và dữ liệu phải khai',
        description: 'Chuyển tiền ra nước ngoài không chỉ là bấm số tiền. Hiệp hội ngân hàng giải thích dữ liệu cá nhân và thông tin người nhận sẽ đi theo điện chuyển tiền quốc tế; ngoài ra còn có phí, tỷ giá và đôi khi phí ngân hàng trung gian làm số tiền nhận thực tế thấp hơn.',
        documents: [
          'Tên người nhận và tài khoản nhận đúng chuẩn',
          'Mục đích chuyển tiền',
          'Chứng từ nguồn tiền nếu tổ chức chuyển tiền hỏi thêm',
        ],
        tip: 'Nếu bạn cần chuyển đều đặn về cho gia đình, hãy giữ record chuyển tiền sạch và nhất quán. Đây cũng là bằng chứng hữu ích khi cần chứng minh扶養 hoặc nguồn tiền hợp pháp.',
      },
      {
        step: 4,
        title: 'Những thứ tuyệt đối không làm',
        description: 'Đừng bán, cho thuê, cho mượn tài khoản, thẻ ATM, sổ ngân hàng, app, OTP, SIM hay đứng tên hộ. Đây là hành vi có thể kéo bạn vào lừa đảo chuyển tiền, rửa tiền hoặc gian lận tài chính mà về sau rất khó gỡ.',
        image: require('../../../../../assets/content/daily-life/dl_banking_s2.jpg'),
        imageCaption: 'Tài khoản ngân hàng chỉ được dùng đúng tên và mục đích đã đăng ký — cho mượn là vi phạm pháp luật',
        documents: [
          'Không chia sẻ thông tin đăng nhập',
          'Không giao thiết bị chứa app ngân hàng cho người khác',
          'Không ký hộ hay nhận tiền hộ các giao dịch mơ hồ',
        ],
        tip: 'Chỉ cần một lần “nhận hộ cho người quen” mà tiền dính scam là bạn có thể mất tài khoản thật và gặp rắc rối pháp lý rất lâu.',
      },
      {
        step: 5,
        title: 'Nếu tài khoản bị hạn chế hoặc khóa',
        description: 'Khi app bị khóa, thẻ bị chặn hoặc chuyển khoản bị giữ, hãy coi đây là tín hiệu nghiêm túc. Đừng tiếp tục thử đi thử lại nhiều lần. Hãy liên hệ ngân hàng, chuẩn bị本人確認, giải thích nguồn tiền và mục đích giao dịch, đồng thời gom đủ chứng từ như payslip, hợp đồng, invoice hoặc lịch sử chuyển tiền.',
        documents: [
          'Giấy tờ本人確認',
          'Chứng từ thu nhập/giao dịch',
          'Email/SMS/thư thông báo từ ngân hàng',
        ],
        tip: 'Nếu ngân hàng đã gửi thư yêu cầu cập nhật thông tin mà bạn bỏ qua quá lâu, rủi ro hạn chế tài khoản sẽ tăng lên đáng kể.',
      },
      {
        step: 6,
        title: 'Nếu nghi có lừa đảo hoặc bị mượn danh',
        description: 'Nếu bạn lỡ cung cấp OTP, bị dụ nhận tiền hộ, hoặc thấy có giao dịch lạ, phải khóa kênh liên quan ngay và báo ngân hàng. Nếu có dấu hiệu phạm tội, báo cảnh sát và giữ nguyên toàn bộ lịch sử chat, số điện thoại, tài khoản nhận tiền và ảnh chụp màn hình.',
        documents: [
          'Lịch sử chat/cuộc gọi',
          'Ảnh giao dịch lạ',
          'Thông tin đối tượng liên hệ',
        ],
        tip: 'Xóa chat hay chờ “xem có sao không” thường chỉ làm mất bằng chứng có lợi cho bạn.',
      },
    ],
  };

export default bankingRemittanceAntiFraud;
