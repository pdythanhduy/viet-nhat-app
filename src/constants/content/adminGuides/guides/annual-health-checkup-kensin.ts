import type { AdminGuide } from '../../../../types/content';

const annualHealthCheckupKensin: AdminGuide = {
    id: 'annual-health-checkup-kensin',
    category: 'health',
    lastVerified: '2026-04-25',
    priority: 'normal',
    title: 'Khám sức khỏe định kỳ miễn phí (健康診断)',
    titleJp: '定期健康診断・特定健診・事業者健診',
    icon: 'fitness-outline',
    color: '#117A65',
    description: 'Người lao động tại Nhật được khám sức khỏe miễn phí hàng năm — theo luật, công ty BẮT BUỘC phải tổ chức cho nhân viên. Người đóng 国民健康保険 cũng có chương trình 特定健診 miễn phí từ 40 tuổi. Đây là quyền lợi nhiều người không biết và bỏ qua.',
    heroImage: require('../../../../../assets/content/daily-life/ag_kensin_hero.jpg'),
    heroImageCaption: '定期健康診断 — khám sức khỏe định kỳ miễn phí theo luật lao động Nhật',
    whoIsThisFor: [
      'Người đi làm tại Nhật theo hợp đồng lao động — bất kể toàn thời gian hay bán thời gian đủ điều kiện.',
      'Người đóng 国民健康保険 (bảo hiểm quốc dân) từ 40 đến 74 tuổi — có quyền làm 特定健診 miễn phí.',
      'Người muốn hiểu kết quả xét nghiệm máu, huyết áp và các chỉ số trong phiếu khám tiếng Nhật.',
    ],
    whenToDo: [
      'Người đi làm: công ty thường tổ chức 1 lần/năm — thường vào mùa xuân (tháng 4–6) hoặc thu (tháng 9–11). Tham gia khi công ty thông báo.',
      '特定健診 (40–74 tuổi, 国民健康保険): municipal office gửi phiếu 受診券 vào khoảng tháng 5–6 hàng năm — dùng phiếu đến cơ sở y tế đăng ký trước cuối năm tài khóa (tháng 3 năm sau).',
      'Nếu không nhận được thông báo từ công ty sau 1 năm làm việc: chủ động hỏi phòng nhân sự.',
    ],
    whereToDo: [
      'Công ty hoặc phòng nhân sự: xác nhận lịch 定期健康診断 hằng năm.',
      'Cơ sở y tế được công ty hoặc municipal office chỉ định: đặt lịch khám theo phiếu hoặc hướng dẫn.',
      'Municipal office: hỏi 特定健診, がん検診 và phiếu 受診券 nếu tham gia 国民健康保険.',
      'Phòng khám hoặc bệnh viện chuyên khoa: tái khám nếu kết quả ghi 要再検査 hoặc 要精密検査.',
    ],
    documentsChecklist: [
      { label: 'Thông báo hoặc lịch khám từ công ty', required: false },
      {
        label: '受診券 từ municipal office',
        required: false,
        note: 'Cần cho 特定健診 hoặc がん検診 nếu được cấp.',
      },
      { label: 'Thẻ bảo hiểm y tế hoặc マイナ保険証', required: true },
      {
        label: 'Phiếu kết quả 健診 các năm trước',
        required: false,
        note: 'Giúp bác sĩ so sánh xu hướng chỉ số.',
      },
      { label: 'Giấy giới thiệu hoặc giấy hẹn tái khám nếu kết quả bất thường', required: false },
    ],
    commonMistakes: [
      'Bỏ qua khám định kỳ vì thấy khỏe.',
      'Không hỏi HR khi công ty chưa thông báo khám sau một năm làm việc.',
      'Nhận kết quả 要再検査 nhưng không đi tái khám.',
      'Không giữ phiếu kết quả các năm trước để so sánh xu hướng sức khỏe.',
      'Nhầm 定期健康診断 của công ty với khám điều trị; tái khám bất thường thường dùng bảo hiểm y tế riêng.',
    ],
    faq: [
      {
        question: 'Công ty có bắt buộc tổ chức khám sức khỏe không?',
        answer: 'Với người lao động thuộc diện áp dụng, công ty phải tổ chức 定期健康診断 theo quy định an toàn vệ sinh lao động. Nếu không nhận thông báo sau một năm làm việc, hãy hỏi HR.',
      },
      {
        question: 'Có phải trả tiền cho khám sức khỏe định kỳ của công ty không?',
        answer: 'Khám định kỳ do công ty tổ chức cho người lao động thuộc diện áp dụng thường do công ty chi trả. Nếu cần tái khám hoặc khám chuyên sâu sau kết quả bất thường, phần đó thường xử lý qua bảo hiểm y tế hoặc theo hướng dẫn của cơ sở y tế.',
      },
      {
        question: 'Kết quả ghi 要再検査 thì có nghiêm trọng không?',
        answer: 'Đó là yêu cầu kiểm tra lại hoặc khám sâu hơn, không nên bỏ qua dù bạn thấy khỏe. Mang kết quả 健診 và thẻ bảo hiểm đến phòng khám hoặc bệnh viện phù hợp để được giải thích.',
      },
    ],
    officialLinks: [
      { label: '健康診断を実施しましょう — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/newpage_05927.html' },
      { label: '労働安全衛生法のあらまし — 厚生労働省', url: 'https://www.check-roudou.mhlw.go.jp/law/anzen.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Hiểu 2 loại khám chính',
        description: '定期健康診断 (事業者健診) — Người đi làm:\nTheo Luật An toàn-Vệ sinh lao động (労働安全衛生法), mọi công ty BẮT BUỘC tổ chức khám sức khỏe cho nhân viên ít nhất 1 lần/năm — miễn phí hoàn toàn. Nội dung: đo chiều cao, cân nặng, thị lực, thính lực, huyết áp, chụp X-quang ngực, xét nghiệm máu (lipid, đường huyết, gan), xét nghiệm nước tiểu, điện tâm đồ (từ 35 tuổi).\n\nPart-time đủ điều kiện: làm từ 75% giờ chuẩn của nhân viên chính thức trở lên (thường từ ~30 giờ/tuần) và hợp đồng từ 1 năm trở lên.\n\n特定健診 — Người đóng 国民健康保険, 40–74 tuổi:\nChương trình kiểm tra nguy cơ hội chứng chuyển hóa (メタボリックシンドローム). Dùng phiếu 受診券 do municipal office gửi, đến cơ sở y tế ký kết — thường miễn phí hoặc đồng chi trả rất thấp.',
        documents: [],
        tip: 'Nếu làm part-time và không chắc mình đủ điều kiện khám qua công ty, hỏi thẳng phòng nhân sự. Nếu không đủ điều kiện qua công ty, hỏi municipal office về 特定健診 hoặc khám tự trả qua bảo hiểm y tế.',
      },
      {
        step: 2,
        title: 'Tham gia khám và đọc kết quả',
        description: 'Sau khi khám, nhận phiếu kết quả (健診結果) — thường bằng tiếng Nhật. Các chỉ số quan trọng cần biết:\n\n• 血圧 (huyết áp): bình thường < 130/85 mmHg. Nếu ≥ 140/90 → trao đổi bác sĩ.\n• BMI và 腹囲 (vòng eo): nam > 85 cm / nữ > 90 cm là nguy cơ.\n• 血糖 (đường huyết lúc đói): bình thường < 100 mg/dL; HbA1c < 5.6%.\n• LDL (cholesterol xấu): bình thường < 120 mg/dL.\n• γ-GTP và GOT/GPT: chỉ số gan — thường tăng nếu uống nhiều rượu.\n• 尿酸 (acid uric): > 7.0 mg/dL → nguy cơ gout.\n\nKết quả có ký hiệu A–E hoặc ○/△/×: A hoặc ○ = bình thường; D hoặc × = cần tái khám.',
        documents: [],
        tip: 'Giữ tất cả phiếu kết quả khám theo từng năm — bác sĩ sẽ dùng để so sánh xu hướng. Nếu chỉ số thay đổi đột ngột dù vẫn trong ngưỡng bình thường, đó cũng là tín hiệu cần chú ý.',
      },
      {
        step: 3,
        title: 'Khi có chỉ số bất thường: bước tiếp theo',
        description: 'Nếu kết quả có mục ghi 要再検査 (cần tái khám) hoặc 要精密検査 (cần khám chuyên sâu): đây là chỉ dẫn y tế nghiêm túc — không bỏ qua chỉ vì cảm thấy ổn.\n\nCông ty phải thông báo kết quả và khuyến nghị y tế cho nhân viên theo luật. Bạn có thể yêu cầu gặp bác sĩ lao động (産業医) của công ty để giải thích kết quả.\n\nTái khám (再検査) thường tự trả qua bảo hiểm y tế — mang theo thẻ bảo hiểm (健康保険証 hoặc マイナ保険証) và phiếu kết quả 健診 khi đi.',
        documents: [
          'Phiếu kết quả 健診 (健診結果通知書)',
          'Thẻ bảo hiểm y tế khi đi tái khám',
        ],
        tip: 'Nếu lo ngại ngôn ngữ khi đi tái khám: nhiều bệnh viện lớn có phiên dịch hoặc hỗ trợ đa ngôn ngữ qua điện thoại. AMDA (03-6233-9266) cung cấp dịch vụ phiên dịch y tế qua điện thoại cho người nước ngoài.',
      },
      {
        step: 4,
        title: 'Bổ sung: khám phụ khoa và ung thư định kỳ (がん検診)',
        description: 'Ngoài 健診 tiêu chuẩn, municipal office thường tổ chức hoặc hỗ trợ chi phí cho:\n\n• 乳がん検診 (ung thư vú): khuyến nghị 2 năm/lần từ 40 tuổi.\n• 子宮頸がん検診 (ung thư cổ tử cung): 2 năm/lần từ 20 tuổi.\n• 大腸がん検診 (ung thư đại tràng): hàng năm từ 40 tuổi.\n• 胃がん検診 (ung thư dạ dày): từ 50 tuổi.\n\nPhiếu 受診券 cho các loại khám này thường được gửi chung với 特定健診 hoặc tại municipal office. Chi phí thường rất thấp (500–1,000 yên) hoặc miễn phí tùy địa phương và độ tuổi.',
        documents: [
          'Phiếu 受診券 do municipal office gửi (nếu có)',
          'Thẻ bảo hiểm y tế',
        ],
        tip: 'Phụ nữ nên đặc biệt chú ý 子宮頸がん検診 từ 20 tuổi — đây là loại ung thư hoàn toàn có thể phát hiện sớm và điều trị hiệu quả. Nhiều địa phương gửi phiếu miễn phí cho lần đầu khám.',
      },
    ],
  };

export default annualHealthCheckupKensin;
