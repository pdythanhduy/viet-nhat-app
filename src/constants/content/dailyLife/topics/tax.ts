import type { DailyLifeTopic } from '../../../../types/content';

const tax: DailyLifeTopic = {
    id: 'tax',
    title: 'Giấy tờ lương và thuế hay gặp',
    titleJp: '給与明細・税の書類',
    icon: 'receipt',
    color: '#D35400',
    description: 'Hiểu từng khoản trong phiếu lương, tại sao lương giảm từ tháng 6, và khi nào cần giữ 源泉徴収票.',
    sections: [
      {
        title: 'Đọc phiếu lương (給与明細) — từng khoản là gì',
        content:
          'Phiếu lương chia 2 phần: 支給 (khoản nhận) và 控除 (khoản bị trừ). Chênh lệch giữa hai phần là 差引支給額 — tiền thực về tài khoản.',
        items: [
          '支給 gồm: 基本給 (lương cơ bản), 残業代 (tăng ca), các 手当 (phụ cấp giao thông, nhà ở, chuyên cần...).',
          '控除 gồm: 健康保険 (~5% lương), 厚生年金 (~9.15%), 雇用保険 (~0.6%), 所得税 (thuế thu nhập khấu trừ tại nguồn), 住民税 (thuế cư dân — từ tháng 6 năm thứ hai).',
          'Nếu 残業代 = 0 trong tháng bạn làm thêm giờ, hỏi HR ngay — đây là dấu hiệu không trả tăng ca hợp lệ.',
          'Tổng 控除 thường chiếm 20–25% lương gộp — nếu cao hơn đột ngột mà không rõ lý do, kiểm tra lại từng dòng.',
        ],
        tip: 'Lần đầu nhận phiếu lương, so 差引支給額 với tiền thực chuyển vào tài khoản — nếu khớp, mọi thứ OK. Nếu lệch, hỏi HR.',
        image: require('../../../../../assets/content/daily-life/dl_tax_s1.jpg'),
        imageCaption: '給与明細 — phiếu lương hàng tháng ghi rõ lương gộp, khấu trừ thuế và các khoản bảo hiểm',
      },
      {
        title: '源泉徴収票 — giấy tổng kết thu nhập năm',
        content:
          'Đây là giấy tờ tài chính quan trọng nhất bạn nhận mỗi năm. Công ty phát vào tháng 12 hoặc đầu tháng 1 năm sau.',
        items: [
          '支払金額: tổng thu nhập gộp cả năm — số quan trọng nhất khi làm hồ sơ ngân hàng, vay nhà, gia hạn visa hoặc nộp 確定申告.',
          '源泉徴収税額: tổng thuế đã trừ qua lương — dùng để tính hoàn thuế nếu nộp 確定申告.',
          'Khi nghỉ việc giữa năm: công ty phát 源泉徴収票 trong vòng 1 tháng — cần cho công ty mới để làm 年末調整 chính xác.',
          'Nếu mất: phải xin lại từ công ty cũ (không tự in được). Quá trình có thể mất vài tuần nếu công ty đã thay người phụ trách.',
        ],
        tip: 'Nhận 源泉徴収票 xong là chụp ảnh ngay, lưu vào cloud. Đây là giấy dùng đi dùng lại mỗi khi cần chứng minh thu nhập.',
      },
      {
        title: '住民税 — tại sao lương tháng 6 tự nhiên giảm',
        content:
          '住民税 (thuế cư dân) là khoản bắt đầu bị trừ từ tháng 6 của năm thứ hai ở Nhật. Đây là lý do phổ biến nhất khiến lương thực nhận tháng 6 giảm bất ngờ.',
        items: [
          '住民税 tính dựa trên thu nhập của năm trước — được thông báo mỗi tháng 6, thu qua lương từ tháng 6 đến tháng 5 năm sau (12 kỳ).',
          'Năm đầu tiên ở Nhật (thu nhập thấp hoặc bằng 0): chưa bị trừ 住民税. Từ năm thứ hai trở đi, khoản này tự kích hoạt — nhiều người không biết trước.',
          'Mức 住民税 khoảng 10% thu nhập chịu thuế cộng thêm khoản cố định theo địa phương (~5,000–6,000 yên/tháng) — tổng cộng thường là 8,000–20,000+ yên/tháng.',
          'Khi nghỉ việc: 住民税 còn lại trong năm sẽ bị trừ một lần vào lương cuối (一括徴収), hoặc tự nộp theo phiếu từ 市区町村.',
        ],
        tip: 'Lương tháng 6 giảm ~10,000–25,000 yên so với tháng 5? Gần như chắc chắn là 住民税 vừa kích hoạt. Đây là bình thường, không phải lỗi.',
      },
      {
        title: 'Giấy tờ cuối năm công ty phát — đừng bỏ qua',
        content:
          'Tháng 11–12, nhiều công ty phát thêm mẫu giấy để nhân viên khai giảm thuế trong 年末調整. Khai đúng sẽ được hoàn thuế ngay trong tháng 12.',
        items: [
          '扶養控除等(異動)申告書: khai người phụ thuộc (vợ/chồng không có thu nhập, con dưới 16 tuổi). Không khai thì thuế cao hơn mức cần thiết.',
          '保険料控除申告書: khai bảo hiểm nhân thọ tự đóng, iDeCo (個人型確定拠出年金), bảo hiểm nhân thọ vợ/chồng — mỗi khoản giảm thuế trực tiếp.',
          '住宅ローン控除 (từ năm thứ hai mua nhà trở đi): năm đầu phải tự nộp 確定申告, từ năm thứ hai công ty xử lý qua 年末調整 nếu bạn nộp giấy đúng hạn.',
          'Những mẫu này phải nộp đúng hạn cho HR — nộp trễ thường xử lý lại vào tháng 1 năm sau.',
        ],
        tip: 'Nếu bạn đang đóng iDeCo hoặc bảo hiểm nhân thọ riêng, đừng quên khai — mỗi năm có thể giảm vài chục nghìn yên thuế phải nộp.',
      },
    ],
  };

export default tax;
