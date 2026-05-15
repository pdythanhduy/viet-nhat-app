import type { AdminGuide } from '../../../../types/content';

const kakuteiShinkoku: AdminGuide = {
    id: 'kakutei-shinkoku',
    category: 'money',
    lastVerified: '2026-04-29',
    priority: 'high',
    title: 'Tự khai thuế 確定申告',
    titleJp: '確定申告（自分で行う場合）',
    icon: 'receipt',
    color: '#6C3483',
    description: 'Không phải ai cũng cần tự khai thuế — nhưng nếu có nhiều nguồn thu nhập, làm freelance, vừa nghỉ việc giữa năm, hoặc muốn hoàn thuế cho chi phí y tế hay vay mua nhà, bạn phải tự nộp 確定申告 trước ngày 15/3 hằng năm.',
    heroImage: require('../../../../../assets/content/daily-life/ag_kakutei_hero.jpg'),
    heroImageCaption: '確定申告 - tự khai thuế đúng hạn khi có thu nhập phụ, freelance hoặc cần hoàn thuế',
    whoIsThisFor: [
      'Người có hai công việc trở lên và thu nhập phụ (副業) vượt 200,000 yên/năm.',
      'Người tự kinh doanh, freelancer hoặc không có công ty làm 年末調整 hộ.',
      'Người nghỉ việc giữa năm và công ty mới chưa làm 年末調整 cho toàn bộ năm.',
      'Người có chi phí y tế lớn (医療費控除) hoặc đang trả vay mua nhà năm đầu (住宅ローン控除).',
      'Người nhận thu nhập từ nước ngoài hoặc cho thuê bất động sản.',
    ],
    whenToDo: [
      'Nộp trong khoảng ngày 16/2 – 15/3 cho thu nhập của năm trước (ví dụ: khai thuế năm 2026 → nộp từ 16/2/2027 đến 15/3/2027).',
      'Nếu chỉ yêu cầu hoàn thuế (還付申告): có thể nộp sớm từ ngày 01/01 mà không cần đợi đến 16/2.',
      'Trễ hạn sẽ bị tính lãi phạt (延滞税). Nếu không kịp, nộp trễ vẫn tốt hơn không nộp.',
    ],
    whereToDo: [
      'Online qua e-Tax (khuyến nghị): dùng マイナンバーカード + điện thoại/PC. Không cần đến cơ quan thuế.',
      '確定申告会場: cơ quan thuế địa phương (税務署) hoặc hội trường được mở tạm vào tháng 2–3.',
      'Gửi qua bưu điện: in mẫu và gửi đến 税務署 có dấu bưu điện trước hoặc đúng hạn.',
    ],
    estimatedTime: 'Online (e-Tax): 1–2 giờ nếu đã chuẩn bị đủ giấy tờ. Tại cơ quan thuế: có thể chờ 2–4 giờ vào tháng 3. Hoàn thuế chuyển khoản: khoảng 2–3 tuần sau khi nộp online, 1–2 tháng nếu nộp giấy.',
    fees: [
      'Không có phí nộp hồ sơ.',
      'e-Tax miễn phí hoàn toàn. Không cần mua phần mềm — dùng 国税庁の確定申告書等作成コーナー (web) là đủ.',
    ],
    documentsChecklist: [
      { label: '源泉徴収票 từ tất cả nơi làm việc trong năm', required: true },
      { label: 'Thông tin tài khoản ngân hàng (nhận hoàn thuế)', required: true },
      { label: 'マイナンバーカード hoặc thông báo số (通知カード)', required: true },
      { label: '医療費領収書 (nếu khai 医療費控除)', required: false, note: 'Tổng chi phí y tế vượt 100,000 yên hoặc 5% thu nhập' },
      { label: '住宅ローンの年末残高証明書 (nếu vay mua nhà năm đầu)', required: false },
      { label: '特定口座年間取引報告書 (nếu có cổ phiếu/FX)', required: false },
      { label: 'Biên lai ふるさと納税 (nếu > 5 địa phương trong năm)', required: false },
    ],
    commonMistakes: [
      '年末調整 xong rồi mà không cần khai thêm — đúng với người một việc làm, nhưng sai nếu có thu nhập phụ > 200,000 yên.',
      'Quên khai thu nhập freelance hoặc YouTube/SNS mà nghĩ là nhỏ — 国税庁 có thể truy soát qua thông tin ngân hàng.',
      'Bỏ qua 医療費控除 dù có thể hoàn lại vài chục ngàn yên chỉ vì nghĩ thủ tục phức tạp — e-Tax thực ra khá đơn giản.',
      'Nộp giấy tờ bằng bản gốc mà không giữ bản sao — nên scan trước khi nộp.',
    ],
    faq: [
      {
        question: 'Đi làm công ty bình thường có cần tự khai không?',
        answer: 'Không — nếu bạn chỉ làm một nơi và công ty đã làm 年末調整, bạn không cần tự nộp. Nhưng nếu có baito thêm và tổng thu nhập phụ > 200,000 yên, phải tự khai phần đó.',
      },
      {
        question: 'Không có マイナンバーカード có khai online được không?',
        answer: 'Có — có thể dùng ID・パスワード方式 (xin tại 税務署) để đăng nhập e-Tax mà không cần マイナポータル. Hoặc in mẫu từ 国税庁のウェブサイト và nộp tại 税務署.',
      },
      {
        question: 'Khai nhầm thì sửa được không?',
        answer: 'Được — nộp 更正の請求 (xin hoàn lại thuế thừa) trong vòng 5 năm, hoặc 修正申告 (khai bổ sung còn thiếu) bất cứ lúc nào. Tốt hơn là tự sửa trước khi bị 税務署 phát hiện.',
      },
    ],
    counterPhrases: [
      {
        jp: '確定申告をしたいです。',
        romaji: 'Kakutei shinkoku o shitai desu.',
        vn: 'Tôi muốn 確定申告 (tự khai thuế).',
        note: 'Câu mở đầu tại 税務署.',
      },
      {
        jp: '源泉徴収票はこれです。一緒に確認していただけますか。',
        romaji: 'Gensen choushuuhyou wa kore desu. Issho ni kakunin shite itadakemasu ka.',
        vn: '源泉徴収票 đây ạ. Anh/chị xem giúp được không?',
      },
      {
        jp: '医療費控除の申請も一緒にできますか。',
        romaji: 'Iryouhi koujo no shinsei mo issho ni dekimasu ka.',
        vn: 'Có thể xin 医療費控除 (trừ phí y tế) luôn được không?',
      },
      {
        jp: '還付金はいつごろ振り込まれますか。',
        romaji: 'Kanpukin wa itsugoro furikomaremasu ka.',
        vn: 'Tiền hoàn thuế khi nào được chuyển vào tài khoản?',
      },
      {
        jp: '今書類が足りないんですが、後日持って来てもいいですか。',
        romaji: 'Ima shorui ga tarinai n desu ga, gojitsu motte kite mo ii desu ka.',
        vn: 'Hiện tôi đang thiếu giấy, hôm khác mang đến được không?',
      },
      {
        jp: '申告書の書き方を教えていただけますか。',
        romaji: 'Shinkokusho no kakikata o oshiete itadakemasu ka.',
        vn: 'Anh/chị hướng dẫn giúp cách điền 申告書?',
      },
    ],
    keyTerms: [
      {
        term: '確定申告',
        reading: 'かくていしんこく',
        meaningVi: 'khai thuế cá nhân (cuối năm)',
        noteVi: 'Khai báo thu nhập 1 năm với 国税庁, nộp từ 16/2 đến 15/3 năm sau. Áp dụng cho 個人事業主, người có thu nhập phụ, hoặc muốn xin hoàn thuế.',
      },
      {
        term: '源泉徴収票',
        reading: 'げんせんちょうしゅうひょう',
        meaningVi: 'giấy xác nhận thuế đã khấu trừ (do công ty cấp)',
        noteVi: 'Công ty cấp vào tháng 12 hoặc tháng 1. Tóm tắt lương + thuế công ty đã trừ giúp bạn. Phải có khi làm 確定申告.',
      },
      {
        term: '所得',
        reading: 'しょとく',
        meaningVi: 'thu nhập (tính thuế)',
        noteVi: 'Khác với 収入 (doanh thu): 所得 = 収入 - 必要経費. Thuế tính trên 所得, không phải 収入.',
      },
      {
        term: '控除',
        reading: 'こうじょ',
        meaningVi: 'khoản trừ (giảm thuế)',
        noteVi: 'Các khoản giảm trừ vào 所得 trước khi tính thuế: 基礎控除, 配偶者控除, 扶養控除, 社会保険料控除, 医療費控除, ふるさと納税…',
      },
      {
        term: '還付',
        reading: 'かんぷ',
        meaningVi: 'hoàn thuế',
        noteVi: 'Khi thuế công ty đã trừ NHIỀU HƠN thuế thực tế phải nộp (vd có nhiều 控除), nhà nước hoàn lại phần dư. Chuyển vào tài khoản ngân hàng bạn khai.',
      },
    ],
    officialLinks: [
      { label: '国税庁 — Trang khai thuế chính thức (e-Tax)', url: 'https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm' },
      { label: '確定申告書等作成コーナー (tạo mẫu online)', url: 'https://www.keisan.nta.go.jp/' },
    ],
    steps: [
      {
        step: 1,
        title: 'Xác nhận mình có cần nộp 確定申告 không',
        description: 'Phải tự khai nếu:\n\n• Có thu nhập từ hai nơi trở lên và thu nhập phụ (副業含む) > 200,000 yên/năm.\n• Tự kinh doanh, nhận thù lao freelance, không có nơi làm 年末調整 hộ.\n• Nghỉ việc giữa năm và chưa tìm việc mới trước 12/31 — không ai làm 年末調整 cho bạn.\n• Thu nhập từ nước ngoài (lương, tiền thuê, đầu tư từ Việt Nam).\n• Chi phí y tế trong năm > 100,000 yên hoặc > 5% tổng thu nhập.\n• Vay mua nhà và đây là năm đầu (từ năm thứ hai thì 年末調整 làm hộ).\n• Nhận > 5 địa phương ふるさと納税 và không dùng ワンストップ特例.\n\nNếu không có trường hợp nào trên, bạn không cần khai thêm.',
        documents: [],
        tip: 'Dùng công cụ thử nghiệm trên 国税庁のウェブサイト để xác nhận nếu không chắc. Gọi đường dây tư vấn miễn phí của 税務署 nếu cần hỏi trực tiếp.',
      },
      {
        step: 2,
        title: 'Thu thập giấy tờ cần thiết',
        description: '• 源泉徴収票: công ty bắt buộc phải cấp trước 01/02 năm kế tiếp. Nếu mất, yêu cầu cấp lại. Freelancer cần 支払調書 từ bên chi trả (một số nơi không tự cấp, phải xin).\n\n• Nếu khai 医療費控除: gom toàn bộ 領収書 (biên lai khám bệnh, mua thuốc theo toa, chi phí phẫu thuật, xe cấp cứu). Phí thẩm mỹ, mua thuốc bổ hoặc phí mua kính/lens không được tính.\n\n• Nếu khai 住宅ローン控除 năm đầu: cần 住宅ローンの年末残高証明書 (ngân hàng gửi tự động), đăng ký nhà ở (登記事項証明書), và hợp đồng mua bán.\n\n• Nếu có thu nhập chứng khoán/FX: dùng 特定口座源泉徴収なし thì phải khai, 源泉徴収あり thì tùy.\n\n• Luôn cần: thông tin tài khoản ngân hàng (nhận hoàn thuế), マイナンバー.',
        documents: [
          '源泉徴収票 (từ tất cả nơi làm việc)',
          'マイナンバーカード hoặc 通知カード + hộ chiếu/在留カード',
          'Sổ tài khoản ngân hàng hoặc thông tin số tài khoản',
        ],
        tip: '源泉徴収票 cần phải có trước khi bắt đầu khai. Nếu công ty cũ không gửi sau ngày 01/02, bạn có quyền khiếu nại lên 税務署 để yêu cầu công ty nộp.',
      },
      {
        step: 3,
        title: 'Chọn cách khai: e-Tax (online) hoặc giấy tờ',
        description: 'Có 3 cách:\n\n1. **e-Tax qua スマートフォン + マイナポータル** (đơn giản nhất):\n   - Cài app マイナポータル, đọc chip マイナンバーカード.\n   - Vào 確定申告書等作成コーナー, chọn "スマホで申告".\n   - Nhập thông tin 源泉徴収票, hệ thống tự tính.\n   - Nộp trực tuyến ngay.\n\n2. **e-Tax qua PC**:\n   - Truy cập https://www.keisan.nta.go.jp/\n   - Đăng nhập bằng マイナンバーカード hoặc ID・パスワード.\n   - Điền từng mục theo hướng dẫn trên màn hình.\n\n3. **Nộp giấy tờ tại 税務署**:\n   - In mẫu từ 国税庁のウェブサイト hoặc lấy tại 税務署.\n   - Điền tay hoặc dùng máy tính tại 確定申告会場.\n   - Nộp trực tiếp hoặc gửi bưu điện.',
        documents: [],
        tip: 'e-Tax qua スマホ là cách nhanh và ít lỗi nhất — hệ thống tự tính thuế dựa trên số bạn nhập. Nếu không có マイナンバーカード, đến 税務署 xin ID・パスワード (1 ngày) để dùng e-Tax không cần card.',
      },
      {
        step: 4,
        title: 'Điền tờ khai — mapping từ 源泉徴収票 vào form',
        image: require('../../../../../assets/content/daily-life/dl_furusato_s2.jpg'),
        imageCaption: '寄附金受領証明書 — biên lai ふるさと納税 dùng để khai 寄附金控除 trong 確定申告',
        description: '**Bước 1 — Nhập số từ 源泉徴収票 (giấy do công ty cấp cuối năm):**\n\n| Ô trên form 確定申告 | Lấy từ 源泉徴収票 |\n|---|---|\n| 給与収入金額 | 支払金額 (ô lớn nhất) |\n| 源泉徴収税額 | hệ thống tự tính |\n| 社会保険料控除 | 社会保険料等の金額 |\n| 生命保険料控除 | 生命保険料の控除額|\n\nNếu làm nhiều công ty trong năm: nhập từng 源泉徴収票 một, hệ thống sẽ cộng tổng.\n\n**Bước 2 — Khai thêm các khoản khấu trừ (nếu có):**\n- 医療費控除: nhập tổng tiền khám/thuốc trong năm − 10万円 (phần vượt quá mới được khấu trừ).\n- 住宅ローン控除: nhập số dư vay cuối năm từ giấy 残高証明書 của ngân hàng.\n- 寄附金控除 (ふるさと納税): nhập tổng số tiền đã đóng góp (xem trên 寄附金受領証明書).\n\n**Bước 3 — Nhập tài khoản ngân hàng để nhận hoàn thuế (還付):**\n- 金融機関名、支店名、預金種目 (普通)、口座番号 (7 chữ số)、口座名義 (KATAKANA).\n\n**Bước 4 — Xem lại và nộp:**\nHệ thống hiển thị số tiền được hoàn (還付金) hoặc phải nộp thêm (追納). Kiểm tra kỹ rồi xác nhận nộp.',
        documents: [],
        tip: 'Nếu kết quả cho thấy phải nộp thêm thuế — không phải sai, là bình thường với người có nhiều nguồn thu. Nộp bổ sung trước 15/3 để không bị tính lãi phạt.',
      },
      {
        step: 5,
        title: 'Nộp và theo dõi kết quả',
        description: 'Sau khi nộp e-Tax: nhận số tiếp nhận (受付番号) ngay lập tức — lưu lại làm bằng chứng đã nộp đúng hạn.\n\nNếu hoàn thuế (還付): tiền chuyển khoản sau khoảng 2–3 tuần (nộp online) hoặc 1–2 tháng (nộp giấy). Có thể tra cứu trạng thái trên マイナポータル hoặc e-Tax.\n\nNếu còn phải nộp bổ sung (追納): thanh toán đến 15/3. Có thể nộp tại ngân hàng, コンビニ (mã vạch), hoặc Pay-easy. Nếu quá hạn sẽ bị tính 延滞税.\n\nLưu bản sao tờ khai và số tiếp nhận ít nhất 5 năm — 税務署 có thể yêu cầu tài liệu sau này.',
        documents: [],
        tip: '税務署 thường liên lạc bằng thư bưu điện nếu có vấn đề với tờ khai. Đừng bỏ qua thư từ 国税局 hoặc 税務署 — mở và đọc ngay. Nếu không hiểu có thể gọi số in trên thư.',
      },
    ],
  };

export default kakuteiShinkoku;
