import type { AdminGuide } from '../../../../types/content';

const unemploymentBenefits: AdminGuide = {
    id: 'unemployment-benefits',
    category: 'money',
    lastVerified: '2026-08-22',
    priority: 'high',
    title: 'Trợ cấp thất nghiệp (失業給付)',
    titleJp: '失業給付・雇用保険の受給手続き',
    icon: 'cash-outline',
    color: '#E67E22',
    description: 'Khi mất việc, bạn có thể nhận trợ cấp thất nghiệp từ quỹ 雇用保険 nếu đã đóng bảo hiểm đủ điều kiện. Người nước ngoài cư trú hợp pháp cũng được nhận.',
    heroImage: require('../../../../../assets/content/daily-life/ag_unemployment_hero.jpg'),
    heroImageCaption: 'ハローワーク - nơi làm thủ tục trợ cấp thất nghiệp và tư vấn tìm việc',
    officialLinks: [
      { label: '雇用保険の基本手当 — ハローワーク', url: 'https://www.hellowork.mhlw.go.jp/insurance/insurance_basicbenefit.html' },
      { label: '雇用保険について — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000136389.html' },
      { label: '自己都合離職者の給付制限期間の見直し（令和7年4月〜） — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000139508.html' },
    ],
    whoIsThisFor: [
      'Người vừa mất việc — bị sa thải hoặc tự xin nghỉ.',
      'Người đang tìm việc mới và muốn nhận hỗ trợ tài chính trong thời gian chờ.',
      'Người nước ngoài có tư cách lưu trú còn hiệu lực và đã đóng 雇用保険 đủ thời hạn.',
    ],
    whenToDo: [
      'Đến ハローワーク đăng ký ngay sau khi nghỉ việc — không nên trì hoãn vì thời hạn nhận trợ cấp tính từ ngày đăng ký.',
      'Nhận 離職票 từ công ty trước — nếu sau 10 ngày chưa nhận được, có thể thúc giục hoặc đến ハローワーク nhờ hỗ trợ.',
    ],
    whereToDo: [
      'ハローワーク (Hello Work) — đến chi nhánh nơi bạn cư trú.',
      'Tìm ハローワーク gần nhất tại: hellowork.mhlw.go.jp',
    ],
    estimatedTime: 'Đăng ký ban đầu: 1–2 giờ. Sau đó đến ハローワーク mỗi 4 tuần để báo cáo tình trạng tìm việc.',
    fees: [
      'Miễn phí — đây là quyền lợi từ 雇用保険 bạn đã đóng trong thời gian đi làm.',
    ],
    documentsChecklist: [
      { label: '離職票 — giấy chứng nhận nghỉ việc (離職票-Ⅰ và -Ⅱ)', required: true, note: 'Công ty cấp sau khi nghỉ — thường gồm 2 tờ. Không có thì không thể làm thủ tục.' },
      { label: '雇用保険被保険者証 (thẻ bảo hiểm thất nghiệp)', required: true, note: 'Công ty giữ hộ hoặc bạn có — nếu mất có thể xin cấp lại tại ハローワーク.' },
      { label: 'Thẻ cư trú (在留カード)', required: true, note: 'Xác nhận tư cách lưu trú còn hiệu lực.' },
      { label: 'Ảnh thẻ縦3cm × 横2.5cm (2 tấm)', required: true, note: 'Nền trắng hoặc sáng màu đơn sắc, chụp trong 3 tháng gần nhất — đây là kích thước riêng của ハローワーク, khác với ảnh ISA.' },
      { label: 'Tài khoản ngân hàng Nhật (sổ tiết kiệm hoặc thẻ)', required: true, note: 'Trợ cấp chuyển khoản trực tiếp vào tài khoản.' },
      { label: 'Hộ chiếu', required: false, note: 'Một số ハローワーク yêu cầu thêm.' },
    ],
    steps: [
      {
        step: 1,
        title: 'Nhận 離職票 từ công ty',
        description: 'Công ty có nghĩa vụ cấp 離職票 trong vòng 10 ngày sau khi nghỉ. Nếu họ chậm, liên hệ phòng nhân sự. Trường hợp công ty không cấp, ハローワーク có thể hỗ trợ liên hệ thay bạn.',
        documents: ['離職票-Ⅰ và 離職票-Ⅱ'],
        image: require('../../../../../assets/content/daily-life/ag_unemployment_s1.jpg'),
        imageCaption: '離職票 - giấy công ty cấp sau khi nghỉ việc, cần để đăng ký trợ cấp thất nghiệp',
        tip: 'Kiểm tra kỹ lý do nghỉ việc ghi trên 離職票 — 会社都合 (công ty cho nghỉ) hưởng lợi hơn 自己都合 (tự xin nghỉ) cả về thời gian chờ lẫn số tháng nhận trợ cấp.',
      },
      {
        step: 2,
        title: 'Đến ハローワーク đăng ký — điền 求職票',
        description: 'Tại quầy, nhân viên sẽ yêu cầu điền **求職票** (phiếu đăng ký tìm việc). Có thể tải mẫu trống về điền trước: https://www.hellowork.mhlw.go.jp/doc/kyuusyokumousikomisyo.pdf — tuy nhiên **bắt buộc phải đến quầy ハローワーク trực tiếp** để hoàn tất đăng ký, không thể làm online hay bưu điện.\n\n| Trường | Nội dung |\n|---|---|\n| 氏名 / フリガナ | Tên + KATAKANA |\n| 希望職種 | Loại công việc mong muốn |\n| 希望勤務地 | Khu vực muốn làm việc |\n| 雇用形態 | 正社員, 契約社員, パート... |\n| 最終学歴 | Bằng cấp cao nhất |\n| 職歴 | Nơi làm gần nhất, chức vụ, thời gian |\n| 自己PR | Điểm mạnh, kỹ năng ngắn gọn |\n\nSau khi nộp đủ hồ sơ: nhận **雇用保険受給資格者証** (thẻ thụ hưởng trợ cấp) và ngày tham dự **雇用保険説明会** — buổi giải thích bắt buộc tham dự trước khi nhận tiền, thường 1–2 tuần sau ngày đăng ký.',
        documents: ['Toàn bộ hồ sơ nêu trên'],
        tip: 'Hỏi xem ハローワーク có phiên dịch hoặc tài liệu đa ngôn ngữ không — một số chi nhánh lớn hỗ trợ tiếng Việt hoặc tiếng Anh.',
      },
      {
        step: 3,
        title: 'Chờ qua thời gian chờ (給付制限)',
        description: '- 自己都合 (tự xin nghỉ): 7 ngày chờ bắt buộc + thêm **1 tháng** (áp dụng từ khi cải cách có hiệu lực 01/04/2025 — trước đó là 2 tháng). Nếu đã tự nghỉ việc không có lý do chính đáng từ 2 lần trở lên trong 5 năm gần nhất: vẫn giữ mức 3 tháng như cũ.\n- 会社都合 (bị sa thải, hết hạn hợp đồng): chỉ chờ 7 ngày rồi nhận ngay.\nTrong thời gian chờ không nhận được tiền nhưng vẫn phải tiếp tục tìm việc.',
        documents: [],
        tip: 'Bị sa thải do công ty phá sản hoặc lý do bất khả kháng có thể được xếp loại 特定受給資格者 — hưởng chế độ tốt hơn và không bị thêm 1–3 tháng chờ. Ngoài ra, nếu tham gia khóa đào tạo nghề được ハローワーク chỉ định trong thời gian chờ, có thể được miễn hoàn toàn phần chờ thêm này (chỉ còn 7 ngày 待期期間).',
      },
      {
        step: 4,
        title: 'Nhận trợ cấp và báo cáo 4 tuần một lần',
        description: 'Sau khi hết thời gian chờ, mỗi 4 tuần đến ハローワーク báo cáo tình trạng tìm việc (求職活動). Trợ cấp được chuyển khoản vào tài khoản khoảng 1 tuần sau mỗi lần báo cáo.',
        documents: [],
        tip: 'Mỗi kỳ báo cáo cần chứng minh đã tìm việc ít nhất 2 lần (ứng tuyển, dự hội thảo tìm việc, v.v.). Ghi chép lại để tránh bị gián đoạn trợ cấp.',
      },
    ],
    tips: [
      '**Đến ハローワーク ngay tuần đầu** sau khi nghỉ việc — thời điểm nộp 離職票 quyết định ngày bắt đầu tính "thời gian chờ" (待期期間 7 ngày). Trì hoãn 2 tuần = mất 2 tuần trợ cấp tiềm năng.',
      'Trước khi ký 離職票 xác nhận với công ty, kiểm tra **lý do nghỉ** ghi trên tờ đó. Nếu ghi 自己都合 (tự xin nghỉ) nhưng thực tế bị ép hoặc hết hợp đồng, hãy yêu cầu sửa sang 会社都合 — ảnh hưởng lớn đến thời gian và mức trợ cấp.',
      'Trong thời gian nhận trợ cấp, báo cáo **trung thực mọi thu nhập** (kể cả baito 1 ngày, tiền bán đồ...) tại ハローワーク mỗi 4 tuần. Khai thiếu là vi phạm pháp luật, phải hoàn lại toàn bộ trợ cấp đã nhận.',
    ],
    commonMistakes: [
      'Không đến ハローワーク sớm — mỗi ngày trì hoãn là mất 1 ngày trợ cấp có thể nhận.',
      'Không kiểm tra lý do nghỉ trên 離職票 trước khi ký xác nhận — lý do sai ảnh hưởng lớn đến quyền lợi.',
      'Quên báo cáo đúng hạn mỗi 4 tuần — bị gián đoạn trợ cấp.',
      'Đi làm hoặc nhận thu nhập trong thời gian nhận trợ cấp mà không khai báo — vi phạm pháp luật, phải hoàn lại tiền.',
      'Tư cách lưu trú hết hạn trong thời gian nhận trợ cấp — phải gia hạn visa để tiếp tục nhận.',
    ],
    faq: [
      {
        question: 'Người nước ngoài có được nhận trợ cấp thất nghiệp không?',
        answer: 'Được, nếu tư cách lưu trú còn hiệu lực và đã đóng 雇用保険 đủ thời hạn. Các tư cách "Kỹ thuật/Nhân văn/Nghiệp vụ quốc tế", "Kỹ năng đặc định", "Thực tập kỹ năng chuyển sang diện mới" đều có thể nhận nếu đủ điều kiện.',
      },
      {
        question: 'Phải đóng 雇用保険 bao lâu mới được nhận?',
        answer: '- Tự xin nghỉ (自己都合): cần đóng tối thiểu 12 tháng trong 2 năm trước khi nghỉ.\n- Bị sa thải hoặc hết hợp đồng (会社都合): cần đóng tối thiểu 6 tháng trong 1 năm trước khi nghỉ.',
      },
      {
        question: 'Trợ cấp được bao nhiêu và bao lâu?',
        answer: 'Mức trợ cấp khoảng 50–80% lương ngày trung bình (lương càng cao thì tỷ lệ càng thấp). Thời gian nhận: 90–330 ngày tùy theo tuổi, số năm đóng và lý do nghỉ — kiểm tra cụ thể tại ハローワーク.',
      },
      {
        question: 'Tìm được việc mới trước khi hết trợ cấp thì sao?',
        answer: 'Nếu tìm được việc sớm, bạn có thể nhận 就職促進給付 (trợ cấp khuyến khích đi làm sớm) thay vì toàn bộ trợ cấp còn lại — đôi khi số tiền còn cao hơn. Hỏi ハローワーク để biết mức cụ thể.',
      },
    ],
    scenarios: [
      {
        title: 'Hết hợp đồng ngắn hạn, không bị sa thải — có được nhận không?',
        situation: 'Tôi làm hợp đồng có thời hạn, công ty không gia hạn nữa. Tôi không tự xin nghỉ. Được tính là 会社都合 không?',
        answer: 'Hợp đồng không được gia hạn (雇い止め) **thường được xếp vào 会社都合** (không phải lỗi của người lao động), đặc biệt nếu:\n• Bạn đã làm từ 1 năm trở lên, hoặc\n• Bạn đã được gia hạn ít nhất 1 lần trước đó\n\nQuyền lợi: chỉ cần đóng 雇用保険 **6 tháng** (thay vì 12 tháng), không có thời gian chờ 3 tháng như 自己都合. Kiểm tra lại lý do ghi trên 離職票 — nếu sai, yêu cầu công ty chỉnh hoặc tranh luận tại ハローワーク.',
      },
      {
        title: 'Visa sắp hết trong lúc đang nhận trợ cấp',
        situation: 'Tôi đang nhận 失業給付. Visa kỹ thuật hết hạn còn 2 tháng. Có mất quyền nhận không?',
        answer: '**Có rủi ro** — 失業給付 yêu cầu tư cách lưu trú còn hiệu lực trong suốt thời gian nhận. Nếu visa hết hạn mà chưa gia hạn, ハローワーク có thể dừng trợ cấp.\n\nViệc cần làm **ngay**:\n1. Nộp gia hạn tư cách lưu trú (在留期間更新許可申請) tại ISA — nộp sớm để có 特例期間 (ở tạm hợp lệ trong lúc chờ)\n2. Thông báo cho ハローワーク biết bạn đang trong quá trình gia hạn\n\nLưu ý: 在留資格「技術・人文知識・国際業務」cho phép "đang tìm việc trong ngành" — không vi phạm tư cách lưu trú nếu bạn đang tích cực tìm việc cùng ngành.',
      },
      {
        title: 'Có thể học thêm / thi bằng trong lúc nhận trợ cấp không?',
        situation: 'Tôi đang nhận 失業給付 và muốn tham gia khóa học tiếng Nhật buổi tối để nâng cấp kỹ năng. Có bị cắt trợ cấp không?',
        answer: 'Học nâng cao kỹ năng **không bị cắt trợ cấp**, miễn là:\n• Học ngoài giờ không ảnh hưởng đến khả năng đi làm ngay (bạn vẫn "sẵn sàng và đang tích cực tìm việc")\n• Không nhận học bổng hoặc lương từ khóa học\n\nThực ra, ハローワーク còn có **教育訓練給付** — hỗ trợ học phí một số khóa đào tạo nâng cao. Hỏi ハローワーク xem khóa học của bạn có đủ điều kiện không — có thể được hoàn lại 20–70% học phí.',
      },
    ],
  };

export default unemploymentBenefits;
