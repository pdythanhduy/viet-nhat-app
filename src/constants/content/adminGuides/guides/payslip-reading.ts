import type { AdminGuide } from '../../../../types/content';

const payslipReading: AdminGuide = {
    id: 'payslip-reading',
    category: 'money',
    lastVerified: '2026-05-02',
    priority: 'high',
    title: 'Cách đọc bảng lương Nhật',
    titleJp: '給与明細の見方',
    icon: 'document-text',
    color: '#1A6B9A',
    description: 'Giải thích từng dòng trên 給与明細 (bảng lương): khoản nào được trả, khoản nào bị khấu trừ và tại sao số tiền vào tài khoản khác với lương hợp đồng.',
    heroImage: require('../../../../../assets/content/daily-life/ag_payslip_hero.jpg'),
    heroImageCaption: 'Giải thích chi tiết các dòng trong bảng lương 給与明細',
    whoIsThisFor: [
      'Người mới đi làm tại Nhật lần đầu nhận bảng lương và không hiểu các dòng số liệu.',
      'Người muốn kiểm tra lại xem thuế và bảo hiểm có bị tính đúng không.',
      'Người chuẩn bị đàm phán lương hoặc so sánh offer từ nhiều công ty.',
    ],
    whenToDo: [
      'Khi nhận bảng lương hàng tháng — nên đọc kỹ ít nhất vài tháng đầu.',
      'Tháng 12 hoặc tháng 1: kiểm tra xem công ty đã làm 年末調整 chưa và số thuế điều chỉnh có hợp lý không.',
      'Tháng 5-6: 住民税 mới thường áp dụng từ tháng 6, kiểm tra thay đổi trên bảng lương.',
    ],
    whereToDo: [
      'Bộ phận HR/nhân sự hoặc kế toán tiền lương: hỏi khi có khoản trừ hoặc khoản cộng không hiểu.',
      '労働基準監督署: liên hệ nếu nghi ngờ bị trả thiếu lương, thiếu 残業手当 hoặc công ty không giải thích rõ.',
      '税務署 hoặc e-Tax: dùng khi cần tự 確定申告 hoặc kiểm tra số thuế đã khấu trừ.',
    ],
    fees: [
      'Không có phí — đây là quyền được nhận bảng lương chi tiết theo luật 労働基準法.',
    ],
    documentsChecklist: [
      { label: '給与明細 các tháng cần kiểm tra', required: true },
      { label: '労働契約書 hoặc 雇用通知書', required: true, note: 'Đối chiếu lương cơ bản, giờ làm quy định và phụ cấp.' },
      { label: 'Bảng chấm công / タイムカード / PC login records', required: false, note: 'Cần khi kiểm tra 残業手当 hoặc tranh chấp giờ làm.' },
      { label: '源泉徴収票 cuối năm', required: false, note: 'Dùng để kiểm tra 年末調整 và làm 確定申告 nếu cần.' },
    ],
    commonMistakes: [
      'Nhầm 支給合計 (tổng trước khấu trừ) với 差引支給額 (tiền thực nhận) — hai con số này chênh nhau đáng kể.',
      'Không kiểm tra 残業手当 — nhiều người bị trả thiếu lương làm thêm giờ mà không phát hiện.',
      'Nghĩ thuế bị trừ hàng tháng là số thuế cuối cùng — đây chỉ là tạm khấu trừ, số thực tế được quyết toán qua 年末調整 hoặc 確定申告.',
      'Bỏ qua cột 有給残高 (số ngày phép còn lại) — nên theo dõi để dùng hết trước khi nghỉ việc.',
    ],
    faq: [
      {
        question: 'Tại sao lương vào tài khoản ít hơn nhiều so với 基本給 trên hợp đồng?',
        answer: '基本給 là lương cơ bản trước khấu trừ. Số tiền thực nhận (差引支給額) = 支給合計 (lương + phụ cấp) − 控除合計 (bảo hiểm + thuế). Với lương 25万/tháng, tổng khấu trừ thường vào khoảng 3.5–5万 yên tùy tình huống.',
      },
      {
        question: '住民税 bắt đầu bị trừ từ tháng nào và tại sao năm đầu không bị trừ?',
        answer: '住民税 tính trên thu nhập năm trước, thu từ tháng 6 đến tháng 5 năm sau. Người mới sang Nhật năm đầu chưa có thu nhập năm trước nên chưa bị trừ. Từ năm thứ 2 trở đi, tháng 6 sẽ thấy thêm khoản này trên bảng lương — đừng bị bất ngờ.',
      },
      {
        question: 'Làm thêm giờ nhưng không thấy 残業手当 trên bảng lương, phải làm gì?',
        answer: 'Trước tiên: kiểm tra hợp đồng xem có mục "固定残業代" (lương bao gồm sẵn giờ làm thêm nhất định) không. Nếu không có và bạn thực sự làm thêm, hãy đối chiếu với 出勤簿/タイムカード. Nếu sai, trình bày với bộ phận nhân sự. Nếu không giải quyết được, liên hệ 労働基準監督署.',
      },
      {
        question: 'Tháng 12 nhận được tiền điều chỉnh thuế — đó là gì?',
        answer: 'Đó là 年末調整 — quyết toán thuế thu nhập cuối năm. Nếu công ty đã khấu trừ tạm nhiều hơn số thuế thực tế phải nộp, phần chênh lệch được hoàn lại trong bảng lương tháng 12 hoặc tháng 1. Đây là khoản hoàn thuế bình thường, không phải lương thưởng.',
      },
    ],
    officialLinks: [
      { label: '賃金の支払いに関するルール — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/zigyonushi/shienjigyou/index.html' },
      { label: '時間外労働の割増賃金率 — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/zigyonushi/menu.html' },
      { label: '協会けんぽ 保険料率 — 全国健康保険協会', url: 'https://www.kyoukaikenpo.or.jp/g7/cat330/sb3150/' },
    ],
    steps: [
      {
        step: 1,
        title: 'Đọc phần 支給 — khoản được trả',
        description: 'Phần trên bảng lương liệt kê tất cả thu nhập trong tháng:\n\n| Mục | Ý nghĩa |\n|---|---|\n| 基本給 | Lương cơ bản theo hợp đồng |\n| 時間外手当 / 残業手当 | Lương làm thêm giờ (bình thường ≥1.25×/giờ; tháng >60h ≥1.50×) |\n| 深夜手当 | Phụ cấp làm đêm 22:00–5:00 (+0.25× so với ca thường) |\n| 休日手当 | Lương làm ngày nghỉ pháp định (≥1.35×) |\n| 通勤手当 | Phụ cấp đi lại (thường bằng tiền xe tháng) |\n| 住宅手当 | Phụ cấp nhà ở (nếu công ty có chính sách) |\n| 家族手当 | Phụ cấp gia đình (nếu khai báo扶養) |\n| **支給合計** | **Tổng thu nhập trước khấu trừ** |\n\n⚠️ 通勤手当 thường không bị tính vào thu nhập chịu thuế nếu trong mức quy định (tối đa 150,000 yên/tháng), nhưng vẫn tính vào cơ sở tính bảo hiểm xã hội.',
        documents: [],
        tip: 'Nếu thấy mục "固定残業代" hoặc "みなし残業" trong hợp đồng, nghĩa là một số giờ làm thêm đã được gộp sẵn vào 基本給 — hỏi HR để biết số giờ cụ thể.',
      },
      {
        step: 2,
        title: 'Đọc phần 控除 — các khoản bị khấu trừ',
        description: 'Phần dưới hoặc bên phải liệt kê các khoản bị trừ khỏi lương:\n\n| Mục | Tỷ lệ tham khảo (令和7年度 / 2025) | Ghi chú |\n|---|---|---|\n| 健康保険料 | ~5.00% lương | Phụ thuộc tỉnh/組合; Tokyo: 4.955% |\n| 介護保険料 | ~0.795% lương | **Chỉ người 40–64 tuổi** |\n| 厚生年金保険料 | 9.15% lương | Cố định toàn quốc |\n| 雇用保険料 | 0.55% lương | Phòng trừ khi thất nghiệp |\n| 所得税 | Tùy thu nhập | Khấu trừ tạm, quyết toán cuối năm |\n| 住民税 | Tùy thu nhập năm trước | **Không trừ năm đầu mới sang Nhật** |\n| **控除合計** | **Tổng khấu trừ** | |\n\nVí dụ: Lương 250,000 yên/tháng, khấu trừ xã hội khoảng 37,250 yên (chưa tính thuế thu nhập và住民税).',
        documents: [],
        tip: '所得税 hàng tháng chỉ là tạm trừ theo bảng 源泉徴収税額表. Cuối năm qua 年末調整 (do công ty làm) số này sẽ được điều chỉnh và hoàn lại nếu trừ nhiều hơn thực tế.',
      },
      {
        step: 3,
        title: 'Kiểm tra 差引支給額 — tiền thực nhận',
        description: '**差引支給額** = 支給合計 − 控除合計\n\nĐây là số tiền chuyển vào tài khoản ngân hàng của bạn (còn gọi là 振込額 hoặc 手取り).\n\nMột số bảng lương còn có thêm:\n| Mục | Ý nghĩa |\n|---|---|\n| 有給残高 | Số ngày phép có lương còn lại |\n| 累計支給 | Tổng lương cộng dồn từ đầu năm (dùng để tính thuế cuối năm) |\n| 標準報酬月額 | Mức lương cơ sở tính bảo hiểm (không thay đổi thường xuyên) |\n\n**Nếu tiền vào tài khoản ít hơn差引支給額 — kiểm tra các khoản trừ thêm ngoài thuế và bảo hiểm:**\n| Khoản | Tên tiếng Nhật | Ghi chú |\n|---|---|---|\n| Tiền nhà tập thể công ty | 社宅費 / 家賃控除 | Thường thấp hơn giá thị trường, nhưng phải có trong hợp đồng |\n| Tiền suất ăn trưa | 食事代 / 給食費 | Chỉ áp dụng nếu công ty có bếp ăn hoặc đặt cơm tập thể |\n| Tiết kiệm qua công ty | 財形貯蓄 | Bạn tự đăng ký, tiền tự động trừ để tiết kiệm |\n| Phí công đoàn | 組合費 | Nếu bạn là thành viên công đoàn nội bộ |\n| Trả khoản vay công ty | 従業員貸付金返済 | Nếu đã vay công ty (tiền tạm ứng mua nhà, thiên tai...) |\n\n⚠️ Các khoản này **hợp pháp nhưng bắt buộc phải có trong hợp đồng hoặc quy định nội bộ** — nếu thấy khoản lạ không ai giải thích, hỏi ngay bộ phận nhân sự bằng văn bản.',
        documents: [],
        image: require('../../../../../assets/content/daily-life/ag_payslip_s3.jpg'),
        imageCaption: '差引支給額 - số tiền thực nhận sau khi trừ thuế, bảo hiểm và khoản khấu trừ',
        tip: 'Lưu tất cả 給与明細 trong năm — bạn cần chúng khi làm 確定申告, xin visa gia đình, vay ngân hàng hoặc tranh chấp lao động.',
      },
      {
        step: 4,
        title: 'Kiểm tra 残業手当 có đúng không',
        description: 'Công thức cơ bản tính lương làm thêm giờ:\n\n**Lương giờ cơ bản** = 基本給 ÷ 所定労働時間/tháng (thường 160–173h)\n\n**Lương làm thêm giờ** = Lương giờ cơ bản × số giờ làm thêm × hệ số\n\n| Loại giờ | Hệ số tối thiểu |\n|---|---|\n| Thường ngày (>所定労働時間) | 1.25× |\n| Tháng vượt 60 giờ (月60時間超) | 1.50× |\n| Làm đêm 22:00–5:00 | +0.25× (cộng thêm) |\n| Ngày nghỉ pháp định (法定休日) | 1.35× |\n| Ngày nghỉ theo hợp đồng (所定休日) | 1.25× |\n\n⚠️ Các khoản 通勤手当, 家族手当, 住宅手当 cần được tính vào lương giờ cơ bản theo quy định, không chỉ dùng 基本給 đơn thuần.\n\n**Ví dụ tính kiểm tra 残業手当:**\nGiả sử hợp đồng: 基本給 200,000 yên + 通勤手当 10,000 yên, 所定労働時間 160 giờ/tháng. Tháng này làm thêm 20 giờ.\n- Lương giờ cơ bản = (200,000 + 10,000) ÷ 160 = **1,313 yên/giờ**\n- 残業手当 phải nhận = 1,313 × 20 × 1.25 = **32,825 yên**\n- Nếu bảng lương ghi 残業手当 thấp hơn đáng kể → đối chiếu với タイムカード và hỏi HR bằng văn bản.',
        documents: ['Bảng chấm công / タイムカード hoặc PC login records', '労働契約書 / 雇用通知書 để đối chiếu số giờ làm quy định'],
        image: require('../../../../../assets/content/daily-life/ag_payslip_s4.jpg'),
        imageCaption: '残業手当 - đối chiếu giờ làm thêm với bảng chấm công và hợp đồng',
        tip: 'Nhiều công ty dùng "固定残業制" gộp sẵn một số giờ thêm vào lương. Nếu thực tế làm nhiều hơn số giờ đó, phần dôi ra vẫn phải được trả thêm.',
      },
    ],
  };

export default payslipReading;
