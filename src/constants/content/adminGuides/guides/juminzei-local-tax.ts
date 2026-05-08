import type { AdminGuide } from '../../../../types/content';

const juminzeiLocalTax: AdminGuide = {
    id: 'juminzei-local-tax',
    category: 'money',
    lastVerified: '2026-04-25',
    priority: 'normal',
    title: 'Thuế cư dân địa phương (住民税)',
    titleJp: '住民税・特別徴収・普通徴収',
    icon: 'business-outline',
    color: '#7D3C98',
    description: 'Thuế địa phương tính dựa trên thu nhập năm trước — hoàn toàn tách biệt với thuế thu nhập (所得税). Nhiều người bất ngờ nhận hóa đơn lớn vào tháng 6 năm thứ hai do không biết cơ chế này.',
    heroImage: require('../../../../../assets/content/daily-life/ag_juminzei_hero.jpg'),
    heroImageCaption: '住民税 — thuế cư dân địa phương tính theo thu nhập năm trước',
    whoIsThisFor: [
      'Người đi làm hoặc có thu nhập tại Nhật từ năm thứ hai trở đi — năm đầu tiên chưa phát sinh 住民税.',
      'Người vừa chuyển việc, nghỉ việc hoặc về nước — những thời điểm 住民税 dễ bị bỏ quên nhất.',
      'Người nhận lương và muốn hiểu tại sao khoản khấu trừ hàng tháng thay đổi đột ngột vào tháng 6.',
    ],
    whenToDo: [
      'Tháng 6 hàng năm: nhận thông báo 住民税決定通知書 — mức thuế cho năm tài khóa hiện tại được xác định dựa trên thu nhập năm trước.',
      'Khi chuyển việc: công ty cũ ngừng trừ từ lương, công ty mới bắt đầu trừ từ tháng tiếp theo hoặc bạn phải tự trả phần còn lại.',
      'Khi nghỉ việc hoặc về nước: phần 住民税 còn lại của năm có thể bị thu gộp một lần — cần xác nhận với công ty và municipal office.',
    ],
    whereToDo: [
      'Bộ phận payroll/HR của công ty: hỏi khi đang bị trừ qua lương theo 特別徴収.',
      'Municipal office nơi cư trú ngày 1/1 của năm tính thuế: hỏi hóa đơn, nộp 普通徴収, xin giảm/miễn hoặc giấy chứng nhận thuế.',
      '税務署/e-Tax: xử lý 確定申告 nếu dữ liệu thu nhập năm trước cần khai thêm hoặc sửa.',
    ],
    documentsChecklist: [
      { label: '住民税決定通知書', required: true, note: 'Thông báo mức thuế, thường nhận tháng 6 qua công ty hoặc municipal office.' },
      { label: '納付書/hóa đơn 普通徴収', required: false, note: 'Cần nếu tự nộp thay vì trừ qua lương.' },
      { label: '源泉徴収票 hoặc 確定申告控え', required: false, note: 'Dùng để đối chiếu thu nhập năm trước.' },
      { label: '離職票 hoặc 雇用保険受給資格者証', required: false, note: 'Mang theo nếu xin giảm/miễn do thất nghiệp hoặc thu nhập giảm.' },
      { label: 'Thẻ cư trú', required: false, note: 'Mang theo khi hỏi trực tiếp tại municipal office.' },
    ],
    commonMistakes: [
      'Nghĩ năm đầu không bị trừ nghĩa là không bao giờ có 住民税.',
      'Nghỉ việc nhưng không hỏi phần 住民税 còn lại sẽ bị thu như thế nào.',
      'Bỏ qua hóa đơn 普通徴収 gửi về nhà vì nghĩ công ty vẫn đang trừ qua lương.',
      'Về nước khi còn 住民税 chưa nộp hoặc chưa có 納税管理人.',
      'Nhầm 所得税 với 住民税 và nghĩ 年末調整 đã xử lý tất cả.',
    ],
    faq: [
      {
        question: 'Tại sao tháng 6 tự nhiên lương thực nhận giảm?',
        answer: '住民税 thường bắt đầu tính chu kỳ mới từ tháng 6 đến tháng 5 năm sau. Nếu công ty thu theo 特別徴収, khoản 住民税 trên bảng lương có thể thay đổi từ tháng 6.',
      },
      {
        question: 'Nghỉ việc rồi có phải nộp 住民税 nữa không?',
        answer: 'Có. 住民税 dựa trên thu nhập năm trước, nên nghỉ việc không làm mất nghĩa vụ nộp phần còn lại. Hãy hỏi công ty hoặc municipal office xem sẽ trừ gộp vào lương cuối hay chuyển sang hóa đơn tự nộp.',
      },
      {
        question: 'Có xin giảm/miễn 住民税 được không?',
        answer: 'Có thể tùy địa phương và hoàn cảnh như thất nghiệp, thu nhập giảm mạnh hoặc khó khăn tài chính. Điều kiện và hạn nộp khác nhau theo municipal office, nên hỏi quầy 市民税課 càng sớm càng tốt.',
      },
    ],
    counterPhrases: [
      {
        jp: '住民税について相談したいです。',
        romaji: 'Juuminzei ni tsuite soudan shitai desu.',
        vn: 'Tôi muốn được tư vấn về 住民税 (thuế cư dân).',
        note: 'Câu mở đầu tại quầy thuế của 市役所/区役所.',
      },
      {
        jp: '住民税の決定通知書をいただけますか。',
        romaji: 'Juuminzei no kettei tsuuchisho o itadakemasu ka.',
        vn: 'Cho tôi xin 決定通知書 (thông báo quyết định thuế).',
      },
      {
        jp: '今失業中なので、減額の申請はできますか。',
        romaji: 'Ima shitsugyouchuu na node, gengaku no shinsei wa dekimasu ka.',
        vn: 'Tôi đang thất nghiệp, có thể xin giảm thuế không?',
      },
      {
        jp: '支払いを分割にできますか。',
        romaji: 'Shiharai o bunkatsu ni dekimasu ka.',
        vn: 'Tôi có thể chia nhỏ kỳ đóng được không?',
      },
      {
        jp: '住民税の計算方法を教えていただけますか。',
        romaji: 'Juuminzei no keisan houhou o oshiete itadakemasu ka.',
        vn: 'Anh/chị hướng dẫn giúp cách tính thuế được không?',
      },
      {
        jp: '帰国する場合、納税管理人が必要ですか。',
        romaji: 'Kikoku suru baai, nouzei kanrinin ga hitsuyou desu ka.',
        vn: 'Nếu tôi về nước, có cần 納税管理人 không?',
        note: 'Người được uỷ quyền đóng thuế thay khi bạn rời Nhật.',
      },
    ],
    officialLinks: [
      { label: '住民税について — 財務省', url: 'https://www.mof.go.jp/tax_information/qanda020.html' },
      { label: '国税と地方税の種類 — 国税庁', url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/osirase/9000.htm' },
    ],
    steps: [
      {
        step: 1,
        title: 'Hiểu cơ chế: 住民税 là thuế của năm trước',
        description: '住民税 được tính dựa trên thu nhập của năm dương lịch trước (1/1–31/12), không phải năm hiện tại. Ví dụ: thu nhập năm 2024 → tính thuế → ra hóa đơn tháng 6/2025 → nộp từ tháng 6/2025 đến tháng 5/2026.\n\nThuế suất: khoảng 10% thu nhập chịu thuế (6% tỉnh/thành phố + 4% quận/huyện) cộng với khoản cố định (均等割) vài nghìn yên/năm tùy địa phương.\n\nNăm đầu tiên ở Nhật: chưa có thu nhập năm trước → không có 住民税. Năm thứ hai mới bắt đầu.',
        documents: [],
        tip: '住民税 hoàn toàn khác 所得税 (thuế thu nhập quốc gia bị khấu trừ hàng tháng từ lương). Kể cả khi công ty đã xử lý 年末調整, 住民税 vẫn là nghĩa vụ riêng do địa phương quản lý.',
      },
      {
        step: 2,
        title: 'Hai hình thức thu: 特別徴収 và 普通徴収',
        description: '特別徴収 (trừ qua lương): Công ty trừ thẳng từ lương hàng tháng, chia đều 12 tháng từ tháng 6 đến tháng 5 năm sau. Đây là hình thức phổ biến nhất với người đi làm công ty.\n\n普通徴収 (tự nộp): Municipal office gửi 4 hóa đơn (tháng 6, 8, 10, 1) — thường áp dụng cho người tự kinh doanh, làm nghề tự do, hoặc người chưa được công ty đăng ký 特別徴収. Mỗi kỳ nộp tại ngân hàng, bưu điện, convenience store hoặc qua Pay-easy.',
        documents: [],
        tip: 'Nếu bạn không chắc mình đang ở hình thức nào, xem phiếu lương (給与明細) — nếu có dòng "住民税" bị trừ hàng tháng thì là 特別徴収. Nếu không có, bạn đang 普通徴収 và cần chú ý hóa đơn gửi về nhà.',
      },
      {
        step: 3,
        title: 'Xử lý khi chuyển việc hoặc nghỉ việc',
        description: 'Khi chuyển việc: Thông báo cho công ty cũ rằng bạn muốn chuyển 特別徴収 sang công ty mới. Công ty cũ làm thủ tục 異動届 để công ty mới tiếp tục trừ từ tháng tiếp theo, tránh chuyển sang 普通徴収 bất ngờ.\n\nKhi nghỉ việc hẳn: Nếu nghỉ từ tháng 1 đến tháng 5, công ty thường trừ gộp toàn bộ 住民税 còn lại vào tháng lương cuối — kiểm tra kỹ. Nếu nghỉ từ tháng 6 trở đi, phần còn lại chuyển sang 普通徴収 và bạn tự nộp theo hóa đơn.',
        documents: [
          '住民税決定通知書 (nhận từ công ty hoặc municipal office vào tháng 6)',
          'Hóa đơn 普通徴収 nếu đang tự nộp',
        ],
        tip: 'Nếu về Việt Nam và còn 住民税 chưa nộp: bổ nhiệm 納税管理人 (người đại diện nộp thuế tại Nhật) hoặc thanh toán hết trước khi xuất cảnh — 住民税 chưa nộp có thể ảnh hưởng thủ tục khi quay lại Nhật.',
      },
      {
        step: 4,
        title: 'Xin giảm/miễn 住民税 — điền đơn tại 市民税課',
        description: '**Thông tin thường cần khi điền đơn 減額・免除申請**:\n\n| Trường | Ghi như thế nào |\n|---|---|\n| 氏名 / フリガナ | Tên theo 在留カード; フリガナ viết KATAKANA |\n| 生年月日 | Ngày/tháng/năm sinh (西暦) |\n| 住所 | Địa chỉ hiện tại khớp với 住民票 |\n| 世帯主 | Chủ hộ (thường chính bạn) |\n| 申請理由 | Lý do: 失業・収入減少・生活困窮 |\n| 収入金額 | Thu nhập năm trước — lấy từ 源泉徴収票 hoặc 確定申告 |\n| 失業の場合 | Đính kèm 離職票 hoặc 雇用保険受給資格者証 |\n\nNộp tại quầy 市民税課 (hoặc 住民税担当) của municipal office. Deadline thường tháng 7–8 — kiểm tra với địa phương vì khác nhau.',
        documents: [
          '在留カード',
          'Giấy tờ chứng minh thu nhập hoặc tình trạng thất nghiệp (離職票, 源泉徴収票 năm trước)',
          'Đơn xin giảm/miễn (nhận tại quầy hoặc in từ website municipal office)',
        ],
        tip: 'Nếu bạn có thu nhập từ nhiều nguồn (lương công ty + part-time + thu nhập khác), tất cả đều được tổng hợp khi tính 住民税. Khai đầy đủ trong 確定申告 để tránh bị truy thu sau.',
      },
    ],
  };

export default juminzeiLocalTax;
