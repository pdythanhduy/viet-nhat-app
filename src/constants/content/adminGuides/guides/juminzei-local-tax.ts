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
    description: '住民税 (thuế cư dân) tính trên thu nhập NĂM TRƯỚC — hoàn toàn khác 所得税 (thuế thu nhập). Vì vậy năm đầu tiên ở Nhật chưa bị tính, nhưng năm thứ hai sẽ nhận hoá đơn vào tháng 6 — và nhiều người Việt bất ngờ với số tiền.',
    heroImage: require('../../../../../assets/content/daily-life/ag_juminzei_hero.jpg'),
    heroImageCaption: '住民税 — thuế cư dân địa phương tính theo thu nhập năm trước',
    whoIsThisFor: [
      'Bạn đi làm hoặc có thu nhập ở Nhật và đang ở năm thứ 2 trở đi.',
      'Bạn vừa chuyển việc, nghỉ việc, hoặc sắp về nước — đây là 3 thời điểm 住民税 dễ bị quên nhất.',
      'Bạn thấy lương tháng 6 đột nhiên bị trừ thêm và muốn hiểu lý do.',
      'Không phải bạn nếu: mới sang Nhật năm đầu tiên, hoặc đang là sinh viên không có thu nhập.',
    ],
    whenToDo: [
      'Tháng 6 hàng năm: nhận 住民税決定通知書 (thông báo mức thuế dựa trên thu nhập năm trước).',
      'Khi chuyển việc: xử lý ngay với công ty cũ + công ty mới để khoản trừ không bị gián đoạn.',
      'Khi nghỉ việc: phần thuế còn lại có thể bị thu gộp 1 lần — kiểm tra trước khi nhận lương cuối.',
      'Trước khi về nước: phải có người đại diện đóng thuế (納税管理人) hoặc đóng hết.',
    ],
    whereToDo: [
      'Phòng nhân sự / kế toán công ty: hỏi nếu đang bị trừ qua lương (特別徴収).',
      '市役所/区役所 nơi bạn ở ngày 1/1 của năm tính thuế: hỏi hoá đơn, nộp 普通徴収, xin giảm/miễn, hoặc xin giấy chứng nhận thuế.',
      '税務署 hoặc e-Tax: nếu cần khai thêm thu nhập qua 確定申告.',
    ],
    documentsChecklist: [
      { label: '住民税決定通知書', required: true, note: 'Thông báo mức thuế, thường nhận tháng 6 qua công ty hoặc municipal office.' },
      { label: '納付書/hóa đơn 普通徴収', required: false, note: 'Cần nếu tự nộp thay vì trừ qua lương.' },
      { label: '源泉徴収票 hoặc 確定申告控え', required: false, note: 'Dùng để đối chiếu thu nhập năm trước.' },
      { label: '離職票 hoặc 雇用保険受給資格者証', required: false, note: 'Mang theo nếu xin giảm/miễn do thất nghiệp hoặc thu nhập giảm.' },
      { label: 'Thẻ cư trú', required: false, note: 'Mang theo khi hỏi trực tiếp tại municipal office.' },
    ],
    commonMistakes: [
      'Nghĩ năm đầu không có 住民税 thì các năm sau cũng không có.',
      'Nghỉ việc nhưng không hỏi phần 住民税 còn lại sẽ thu thế nào.',
      'Hoá đơn 普通徴収 gửi về nhà mà bỏ qua, tưởng công ty vẫn đang trừ.',
      'Về nước mà chưa nộp xong 住民税 hoặc chưa nhờ 納税管理人.',
      'Nhầm 所得税 với 住民税 và tưởng 年末調整 đã xử lý cả hai.',
    ],
    faq: [
      {
        question: 'Tại sao tháng 6 tự nhiên lương thực nhận giảm?',
        answer: '住民税 thường bắt đầu chu kỳ mới từ tháng 6 đến tháng 5 năm sau. Nếu công ty thu qua lương (特別徴収), khoản 住民税 trên bảng lương có thể thay đổi từ tháng 6.',
      },
      {
        question: 'Nghỉ việc rồi có phải nộp 住民税 nữa không?',
        answer: 'Có. 住民税 tính trên thu nhập năm trước, nên nghỉ việc không xoá nghĩa vụ nộp phần còn lại. Hỏi công ty hoặc 市役所 xem sẽ trừ gộp vào lương cuối hay chuyển sang hoá đơn tự nộp.',
      },
      {
        question: 'Có xin giảm/miễn 住民税 được không?',
        answer: 'Có thể, tuỳ địa phương và hoàn cảnh (thất nghiệp, thu nhập giảm mạnh, khó khăn tài chính). Điều kiện + hạn nộp khác nhau theo 市役所 — hỏi quầy 市民税課 càng sớm càng tốt.',
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
        jp: '支払いを分割払いにできますか。',
        romaji: 'Shiharai o bunkatsubarai ni dekimasu ka.',
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
        title: 'Hiểu trước: 住民税 là thuế của năm TRƯỚC',
        description: '住民税 tính trên thu nhập năm dương lịch TRƯỚC (1/1–31/12), không phải năm hiện tại.\n\nVí dụ:\n• Thu nhập năm 2024 → tính thuế → ra hoá đơn tháng 6/2025 → nộp từ 6/2025 đến 5/2026.\n\nThuế suất chuẩn: ~10% thu nhập chịu thuế (6% tỉnh/thành phố + 4% quận/huyện) + khoản cố định 均等割 vài nghìn yên/năm tuỳ địa phương.\n\nNăm đầu tiên ở Nhật: chưa có thu nhập năm trước → chưa có 住民税. Năm thứ 2 mới bắt đầu.',
        documents: [],
        tip: '住民税 KHÁC HẲN 所得税 (thuế thu nhập quốc gia bị trừ hàng tháng). Kể cả khi công ty đã xử lý 年末調整, 住民税 vẫn là nghĩa vụ riêng do địa phương quản lý.',
      },
      {
        step: 2,
        title: '2 cách thu: 特別徴収 (qua lương) và 普通徴収 (tự nộp)',
        description: '**特別徴収 — trừ qua lương:**\nCông ty trừ thẳng từ lương hàng tháng, chia đều 12 tháng (6 → 5 năm sau). Phổ biến nhất với người đi làm công ty.\n\n**普通徴収 — tự nộp:**\n市役所 gửi 4 hoá đơn về nhà (tháng 6, 8, 10, 1). Thường áp dụng cho: người tự kinh doanh, freelancer, hoặc người công ty chưa đăng ký 特別徴収. Mỗi kỳ nộp tại ngân hàng, bưu điện, konbini, hoặc Pay-easy.',
        documents: [],
        tip: 'Cách kiểm tra mình thuộc loại nào: xem 給与明細 (phiếu lương). Có dòng "住民税" bị trừ hàng tháng → 特別徴収. Không có → 普通徴収, chú ý hoá đơn gửi về nhà.',
      },
      {
        step: 3,
        title: 'Xử lý khi chuyển việc hoặc nghỉ việc',
        description: '**Khi chuyển việc:**\nNói với công ty cũ là muốn tiếp tục 特別徴収 ở công ty mới. Công ty cũ làm 異動届 để công ty mới tiếp tục trừ từ tháng tiếp theo. Nếu không xử lý sớm, sẽ bị chuyển sang 普通徴収 bất ngờ.\n\n**Khi nghỉ việc hẳn:**\n• Nghỉ từ tháng 1 đến tháng 5 → công ty thường trừ gộp toàn bộ 住民税 còn lại vào tháng lương cuối. Kiểm tra kỹ.\n• Nghỉ từ tháng 6 trở đi → phần còn lại chuyển sang 普通徴収, bạn tự nộp theo hoá đơn gửi về nhà.',
        documents: [
          '住民税決定通知書 (nhận từ công ty hoặc 市役所 vào tháng 6)',
          'Hoá đơn 普通徴収 nếu đang tự nộp',
        ],
        tip: 'Nếu về VN và còn 住民税 chưa nộp: nhờ 納税管理人 (người đại diện nộp thuế) hoặc thanh toán hết trước khi xuất cảnh. Nợ 住民税 có thể ảnh hưởng đến thủ tục khi quay lại Nhật.',
      },
      {
        step: 4,
        title: 'Xin giảm/miễn 住民税 — điền đơn tại 市民税課',
        description: '**Các trường thường có trên đơn 減額・免除申請**:\n\n| Trường | Ghi như thế nào |\n|---|---|\n| 氏名 / フリガナ | Tên theo 在留カード; フリガナ viết KATAKANA |\n| 生年月日 | Ngày/tháng/năm sinh (西暦) |\n| 住所 | Địa chỉ hiện tại khớp với 住民票 |\n| 世帯主 | Chủ hộ (thường chính bạn) |\n| 申請理由 | Lý do: 失業・収入減少・生活困窮 |\n| 収入金額 | Thu nhập năm trước — lấy từ 源泉徴収票 hoặc 確定申告 |\n| 失業の場合 | Đính kèm 離職票 hoặc 雇用保険受給資格者証 |\n\nNộp tại quầy 市民税課 (hoặc 住民税担当) của 市役所. Deadline thường tháng 7–8 — hỏi địa phương vì khác nhau.',
        documents: [
          '在留カード',
          'Giấy chứng minh thu nhập hoặc tình trạng thất nghiệp (離職票, 源泉徴収票 năm trước)',
          'Đơn xin giảm/miễn (lấy tại quầy hoặc in từ website 市役所)',
        ],
        tip: 'Có thu nhập từ nhiều nguồn (lương + part-time + khác)? Tất cả đều được cộng dồn khi tính 住民税. Khai đầy đủ trong 確定申告 để tránh bị truy thu sau.',
      },
    ],
  };

export default juminzeiLocalTax;
