import type { DailyLifeTopic } from '../../../../types/content';

const avoidLosingMoneyChecklist: DailyLifeTopic = {
    id: 'avoid-losing-money-checklist',
    title: 'Checklist tránh mất tiền oan',
    titleJp: '無駄な出費を防ぐチェックリスト',
    icon: 'wallet',
    color: '#CB4335',
    description: 'Những khoản tiền người mới ở Nhật rất hay mất vì chủ quan, đọc thiếu hoặc làm sai thứ tự.',
    sections: [
      {
        title: 'Trước khi ký hoặc trả tiền',
        content: 'Rất nhiều khoản mất tiền oan bắt đầu từ việc ký nhanh hoặc chuyển tiền khi chưa hiểu đầy đủ.',
        items: [
          'Không chuyển tiền nhà, tiền giữ chỗ, tiền dịch vụ nếu chưa có thông tin tài khoản và nội dung thu bằng văn bản rõ ràng.',
          'Khi ký hợp đồng điện thoại, internet, gym hoặc nhà ở, phải hỏi rõ thời hạn tối thiểu, phí hủy sớm và điều kiện gia hạn tự động.',
          'Nếu có khoản phí bạn không hiểu, đừng ngại hỏi lại bằng câu thật ngắn. Hiểu chậm còn hơn trả tiền sai.',
        ],
        tip: 'Ở Nhật, “đã ký rồi” thường rất mạnh. Cách tiết kiệm nhất là chậm 10 phút trước khi ký, không phải xử lý 3 tháng sau đó.',
      },
      {
        title: 'Trong sinh hoạt hằng tháng',
        content: 'Khoản nhỏ lặp lại đều mới là thứ ăn ngân sách mạnh nhất.',
        items: [
          'Đừng để hóa đơn quá hạn nếu bạn chưa cài tự trừ hoặc chưa quen nhịp thư từ.',
          'Kiểm tra kỹ phí hàng tháng của sim, internet, ứng dụng trả phí, thẻ thành viên hoặc dịch vụ bạn đăng ký lúc mới sang.',
          'Nếu dùng combini quá nhiều cho đồ ăn và rút tiền, chi phí tăng rất nhanh dù từng lần nhìn không lớn.',
        ],
        tip: 'Mỗi tháng chỉ cần loại bỏ vài khoản “tiện quá nên quên nhìn giá” là đã khác rất rõ.',
      },
      {
        title: 'Khi chuyển nhà hoặc đổi việc',
        content: 'Đây là hai thời điểm dễ phát sinh phí bất ngờ nhất nếu không làm đúng thứ tự.',
        items: [
          'Đổi nhà thì kiểm tra hạn báo trước, chụp hiện trạng và làm chuyển tiếp thư; thiếu một trong ba việc này là dễ tốn tiền.',
          'Đổi việc thì giữ lại phiếu lương, giấy tổng kết thu nhập, lịch sử bảo hiểm và mọi giấy công ty cũ giao.',
          'Không đóng tài khoản, hủy sim hoặc hủy dịch vụ quá sớm khi bạn chưa chắc thủ tục bên mới đã chạy ổn.',
        ],
        tip: 'Rất nhiều khoản mất tiền không phải vì giá cao, mà vì làm lệch thứ tự và phải sửa sai sau đó.',
      },
    ],
  };

export default avoidLosingMoneyChecklist;
