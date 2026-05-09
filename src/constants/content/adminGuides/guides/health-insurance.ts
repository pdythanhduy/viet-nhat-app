import type { AdminGuide } from '../../../../types/content';

const healthInsurance: AdminGuide = {
    id: 'health-insurance',
    category: 'health',
    lastVerified: '2026-05-06',
    priority: 'high',
    title: 'Đăng ký bảo hiểm y tế',
    titleJp: '国民健康保険加入',
    icon: 'heart',
    color: '#27AE60',
    description: 'Đăng ký bảo hiểm y tế quốc dân (国民健康保険) tại 市役所/区役所.',
    legalScope: {
      appliesFrom: '2025-12-02',
      jurisdiction: 'national',
      jurisdictionNote: 'Chế độ bảo hiểm y tế là toàn quốc, nhưng thủ tục 国民健康保険 và cấp 資格確認書 do 市役所/区役所/bên bảo hiểm nơi bạn tham gia xử lý.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-09-01',
      riskLevel: 'medium',
      whenToAskExpert: [
        'Bạn đổi việc, nghỉ việc hoặc chuyển từ 社会保険 sang 国民健康保険 và không rõ ngày bắt đầu bảo hiểm.',
        'Bạn chưa có マイナ保険証 và cũng chưa nhận 資格確認書.',
        'Bạn bị truy thu/khó trả phí bảo hiểm hoặc cần xin giảm/chia kỳ.',
      ],
    },
    quickAction: {
      deadline: 'Làm ngay sau khi đăng ký cư trú, nghỉ việc, mất bảo hiểm công ty hoặc chuyển sang địa phương mới.',
      office: 'Quầy 国民健康保険 tại 市役所/区役所/町村役場; nếu đang làm công ty thì hỏi công ty/bên 社会保険 trước.',
      doNow: [
        'Xác định bạn thuộc 社会保険 của công ty hay 国民健康保険 của địa phương.',
        'Nếu không dùng マイナ保険証, hỏi nơi cấp bảo hiểm về 資格確認書.',
        'Không bỏ qua hóa đơn bảo hiểm; nếu khó trả, hỏi 市役所 về chia kỳ hoặc giảm theo hoàn cảnh.',
      ],
      bring: ['Thẻ cư trú', 'My Number Card hoặc giấy tờ có My Number nếu có', 'Giấy mất bảo hiểm công ty nếu vừa nghỉ việc', 'Thông tin tài khoản ngân hàng nếu muốn thanh toán tự động (口座振替)'],
      ifLate: 'Đi làm thủ tục càng sớm càng tốt; có thể bị truy thu phí bảo hiểm từ ngày thuộc diện tham gia.',
      officialSourceLabels: ['Bảo hiểm y tế quốc gia — 厚生労働省', 'マイナ保険証 và thẻ bảo hiểm cũ — 厚生労働省', '資格確認書 — 厚生労働省'],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_health-insurance_hero.jpg'),
    heroImageCaption: 'マイナ保険証 / 資格確認書 — giấy tờ xác nhận bảo hiểm khi đi khám từ 02/12/2025',
    whoIsThisFor: [
      'Người đang sống ở Nhật và không tham gia bảo hiểm y tế qua công ty.',
      'Người mới chuyển đến địa phương mới và cần đăng ký/cập nhật 国民健康保険.',
      'Người vừa nghỉ việc, mất bảo hiểm công ty hoặc chuyển từ bảo hiểm công ty sang bảo hiểm quốc dân.',
    ],
    whenToDo: [
      'Sau khi đăng ký cư trú tại 市役所/区役所 nếu bạn thuộc diện tham gia 国民健康保険.',
      'Khi nghỉ việc hoặc mất bảo hiểm công ty, nên làm thủ tục sớm tại 市役所/区役所.',
      'Khi chuyển nhà sang địa phương khác, cần làm lại/cập nhật theo nơi ở mới.',
    ],
    whereToDo: [
      'Quầy 国民健康保険 tại 市役所/区役所/町村役場 nơi bạn đăng ký cư trú.',
      'Nếu đang làm công ty, hỏi công ty hoặc cơ quan bảo hiểm của công ty về 社会保険 trước khi đăng ký quốc dân.',
    ],
    estimatedTime: 'Đăng ký tại quầy thường có thể xử lý trong ngày nếu đủ giấy tờ; thông báo phí bảo hiểm có thể được gửi sau.',
    fees: [
      'Phí bảo hiểm phụ thuộc địa phương, thu nhập năm trước và số người trong hộ.',
      'Khi đi khám, nhiều trường hợp tự trả 30% chi phí y tế, nhưng tỷ lệ có thể khác theo tuổi và điều kiện cá nhân.',
    ],
    documentsChecklist: [
      { label: 'Thẻ cư trú', required: true },
      { label: 'Hộ chiếu', required: false, note: 'Mang theo nếu mới nhập cảnh hoặc được yêu cầu xác minh.' },
      { label: 'My Number Card hoặc giấy tờ có My Number', required: false, note: 'Có thể được yêu cầu để xác nhận thông tin.' },
      { label: 'Giấy chứng nhận mất bảo hiểm công ty', required: false, note: 'Quan trọng nếu chuyển từ 社会保険 sang 国民健康保険.' },
      { label: 'Thông tin tài khoản ngân hàng', required: false, note: 'Dùng khi đăng ký thanh toán tự động nếu muốn.' },
    ],
    commonMistakes: [
      'Nghĩ không đi bệnh viện thì không cần đăng ký bảo hiểm.',
      'Không làm thủ tục sau khi nghỉ việc nên bị trống bảo hiểm hoặc bị truy thu.',
      'Bỏ qua hóa đơn bảo hiểm vì không hiểu tiếng Nhật.',
      'Nhầm thẻ bảo hiểm cũ với hệ thống マイナ保険証/資格確認書 hiện nay.',
      'Chuyển nhà nhưng không cập nhật bảo hiểm tại địa phương mới.',
    ],
    faq: [
      {
        question: 'Không có My Number Card thì đi khám bằng gì?',
        answer: 'Từ hệ thống mới, người chưa dùng マイナ保険証 sẽ dùng 資格確認書 do bên bảo hiểm cấp để xác nhận tư cách bảo hiểm.',
      },
      {
        question: 'Bảo hiểm quốc dân khác bảo hiểm công ty thế nào?',
        answer: '社会保険 thường do công ty làm thủ tục khi bạn đủ điều kiện. 国民健康保険 do 市役所/区役所 quản lý cho người không thuộc bảo hiểm công ty.',
      },
      {
        question: 'Không trả nổi phí bảo hiểm thì làm sao?',
        answer: 'Không nên bỏ mặc hóa đơn. Hãy đến 市役所/区役所 hỏi về chia kỳ, giảm/miễn theo hoàn cảnh hoặc phương án thanh toán phù hợp.',
      },
    ],
    counterPhrases: [
      {
        jp: '国民健康保険に加入したいです。',
        romaji: 'Kokumin kenkou hoken ni kanyuu shitai desu.',
        vn: 'Tôi muốn đăng ký 国民健康保険 (bảo hiểm y tế quốc dân).',
        note: 'Câu mở đầu khi tới quầy 市役所/区役所.',
      },
      {
        jp: '必要な書類を教えていただけますか。',
        romaji: 'Hitsuyou na shorui o oshiete itadakemasu ka.',
        vn: 'Anh/chị cho tôi biết giấy tờ cần thiết được không?',
      },
      {
        jp: '保険料は毎月いくらですか。',
        romaji: 'Hokenryou wa maitsuki ikura desu ka.',
        vn: 'Phí bảo hiểm hàng tháng bao nhiêu ạ?',
      },
      {
        jp: '保険証はいつごろ届きますか。',
        romaji: 'Hokenshou wa itsugoro todokimasu ka.',
        vn: 'Khi nào tôi nhận được 保険証 (thẻ bảo hiểm)?',
      },
      {
        jp: '支払いはどうすればいいですか。コンビニで払えますか。',
        romaji: 'Shiharai wa dou sureba ii desu ka. Konbini de haraemasu ka.',
        vn: 'Đóng tiền thế nào ạ? Có đóng được ở konbini không?',
      },
      {
        jp: '病院に行くときは保険証だけで大丈夫ですか。',
        romaji: 'Byouin ni iku toki wa hokenshou dake de daijoubu desu ka.',
        vn: 'Đi bệnh viện chỉ cần 保険証 thôi có được không?',
      },
    ],
    officialLinks: [
      { label: 'Bảo hiểm y tế quốc gia — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/kokuho/index.html' },
      { label: 'マイナ保険証 và thẻ bảo hiểm cũ — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/web_magazine/closeup/31.html' },
      { label: '資格確認書 — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/newpage_45470.html' },
      { label: 'Use of health insurance card in My Number Card — デジタル庁', url: 'https://www.digital.go.jp/en/policies/mynumber/insurance-card' },
      { label: 'Hỗ trợ người nước ngoài — FRESC', url: 'https://fresc.moj.go.jp' },
    ],
    steps: [
      {
        step: 1,
        title: 'Chuẩn bị giấy tờ',
        description: 'Thu thập các giấy tờ cần thiết để đăng ký bảo hiểm y tế.',
        documents: [
          'Thẻ cư trú (在留カード)',
          'Hộ chiếu',
          'Con dấu cá nhân (印鑑) nếu có',
          'Tài khoản ngân hàng (để đăng ký thanh toán tự động)',
        ],
        image: require('../../../../../assets/content/daily-life/dl_health-insurance_s1.jpg'),
        imageCaption: 'マイナ保険証 / 資格確認書 — từ 02/12/2025 không dùng thẻ bảo hiểm cũ đã hết hạn',
        tip: 'Phí bảo hiểm phụ thuộc địa phương, thu nhập năm trước và số người trong hộ. Hãy xác nhận mức cụ thể tại 市役所/区役所 nơi bạn sống.',
      },
      {
        step: 2,
        title: 'Đến văn phòng phường/quận',
        description: 'Đến quầy "国民健康保険" tại 市役所/区役所 nơi bạn đăng ký địa chỉ.',
        documents: [],
        tip: 'Mang theo thông dịch viên hoặc nhờ bạn bè nói tiếng Nhật đi cùng nếu cần',
        image: require('../../../../../assets/content/daily-life/ag_health-insurance_s2.jpg'),
        imageCaption: '市役所・区役所 — quầy 国民健康保険, đăng ký hoặc cập nhật bảo hiểm y tế',
      },
      {
        step: 3,
        title: 'Điền 加入申請書 tại quầy',
        description: '**Các trường chính trên 国民健康保険 加入申請書:**\n\n| Trường | Ghi như thế nào |\n|---|---|\n| 氏名 / フリガナ | Tên theo hộ chiếu; フリガナ viết KATAKANA |\n| 生年月日 | Ngày/tháng/năm sinh (西暦: dương lịch) |\n| 在留資格 | Copy chính xác từ 在留カード |\n| 在留期間満了日 | Ngày hết hạn trên 在留カード |\n| 在留カード番号 | 12 ký tự (2 chữ + 8 số + 2 chữ) |\n| 加入年月日 | Ngày mất bảo hiểm công ty hoặc ngày nhập cảnh |\n| 保険料支払方法 | 口座振替 (auto-debit) hoặc 納付書 (hóa đơn) |\n\nNếu chọn **口座振替**: mang sổ tài khoản hoặc thẻ ATM. Điền thêm: 金融機関名, 支店名, 口座種類 (普通), 口座番号 (7 chữ số), 口座名義 (KATAKANA).',
        documents: [],
        tip: 'Từ 02/12/2025, hệ thống dùng マイナ保険証 hoặc 資格確認書. Người chưa có My Number Card hoặc chưa liên kết bảo hiểm sẽ dùng 資格確認書 do bên bảo hiểm cấp.',
      },
      {
        step: 4,
        title: 'Nhận giấy tờ xác nhận và bắt đầu sử dụng',
        description: 'Khi có bảo hiểm y tế, phần lớn người đi khám tự trả 30% chi phí y tế; tỷ lệ có thể khác theo tuổi và điều kiện cá nhân.',
        documents: [],
        tip: 'Khi đi khám từ 2026, hãy mang My Number Card đã đăng ký dùng làm bảo hiểm hoặc 資格確認書. Nếu không chắc mình thuộc loại nào, hỏi 市役所/区役所 hoặc nơi cấp bảo hiểm.',
      },
    ],
  };

export default healthInsurance;
