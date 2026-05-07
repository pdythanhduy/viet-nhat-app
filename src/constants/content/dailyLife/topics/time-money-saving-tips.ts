import type { DailyLifeTopic } from '../../../../types/content';

const timeMoneySavingTips: DailyLifeTopic = {
    id: 'time-money-saving-tips',
    title: 'Mẹo tiết kiệm thời gian và tiền',
    titleJp: '時間とお金の節約メモ',
    icon: 'timer',
    color: '#148F77',
    description: 'Các mẹo nhỏ giúp giảm thời gian xếp hàng, đi lại và chi phí sinh hoạt, có ghi rõ điều kiện áp dụng.',
    sections: [
      {
        title: 'Nếu đi một tuyến cố định, hãy kiểm tra 定期券',
        content:
          'Đây là một trong những mẹo tiết kiệm cơ bản nhất, nhưng nhiều người mới ở Nhật lại để muộn nhiều tháng mới làm.',
        items: [
          'Nếu bạn đi làm hoặc đi học đều đặn trên cùng một tuyến, nên kiểm tra 定期券 thay vì mỗi ngày trừ tiền lẻ bằng IC card.',
          'JR East có Net de Teiki và Mobile Suica để tra cứu, đăng ký hoặc mua 定期券 tiện hơn so với việc ra ga hỏi trực tiếp từ đầu.',
          'Với khu vực có hỗ trợ オフピーク定期券, loại vé này có thể rẻ hơn định kỳ thông thường, nhưng chỉ áp dụng ở khu vực và khung giờ phù hợp.',
        ],
        tip: 'Không nên nghe người khác nói “ai cũng nên mua 定期券”. Nếu bạn đi làm không cố định hoặc làm theo ca, phải so lại tiền thực tế.',
      },
      {
        title: 'Làm giấy ở combini để đỡ mất nửa ngày đi hành chính',
        content:
          'Nhiều người mất cả buổi sáng chỉ để lấy một tờ giấy cư trú. Nếu địa phương của bạn có hỗ trợ, combini có thể giúp tiết kiệm rất nhiều thời gian.',
        items: [
          'Nếu địa phương hỗ trợ コンビニ交付 và bạn có My Number Card + PIN hợp lệ, bạn có thể lấy một số chứng nhận tại combini mà không cần chờ quầy hành chính ban ngày.',
          'Mẹo này đặc biệt đáng giá với người đi làm giờ hành chính hoặc cần giấy gấp để mở tài khoản, làm sim hoặc nộp hồ sơ.',
          'Nhưng không nên mặc định là giấy nào cũng lấy được ở combini; phải kiểm tra đúng menu và dịch vụ của địa phương mình.',
        ],
        tip: 'Nếu bạn thường xuyên phải nộp 住民票, đây là một trong những mẹo tiết kiệm thời gian tốt nhất ở Nhật.',
      },
      {
        title: 'Tối ưu nhận hàng để không bị phụ thuộc vào shipper',
        content:
          'Người sống một mình rất dễ bị mất thời gian vào chuyện nhận hàng nếu không biết đổi cách nhận.',
        items: [
          'Japan Post cho phép thay đổi một số cách nhận thông qua eお届け通知, ví dụ đổi sang locker はこぽす hoặc một số hình thức nhận linh hoạt khác nếu điều kiện phù hợp.',
          'Nếu nhà bạn có chỗ đặt hàng an toàn, có thể cân nhắc các hình thức 指定場所で受け取る thay vì lúc nào cũng phải chờ giao tận tay.',
          'Điểm cần nhớ là phải có tài khoản, xác minh cư trú hoặc thông báo giao hàng phù hợp theo đúng điều kiện dịch vụ.',
        ],
        tip: 'Nếu sống một mình, nên tối ưu cách nhận hàng ngay từ những tuần đầu.',
      },
      {
        title: 'Tiết kiệm bằng cách tránh lỗi phải trả lại',
        content:
          'Ở Nhật, nhiều khoản tốn tiền không đến từ giá gốc, mà đến từ lỗi vận hành nhỏ bạn có thể tránh được.',
        items: [
          'Không bỏ sai rác để tránh bị nhắc, mất thời gian xử lý lại hoặc căng với ban quản lý.',
          'Không để quá hạn hóa đơn điện, gas, điện thoại để tránh phí phát sinh hoặc phí khôi phục dịch vụ.',
          'Không báo hủy nhà quá muộn so với hợp đồng vì đây là lỗi rất hay làm mất một khoản tiền lớn nhưng hoàn toàn tránh được.',
        ],
        tip: 'Mẹo tiết kiệm tốt nhất ở Nhật thường là đừng để phát sinh phí phạt, phí khôi phục hoặc phí xử lý lại từ những lỗi nhỏ.',
      },
    ],
  };

export default timeMoneySavingTips;
