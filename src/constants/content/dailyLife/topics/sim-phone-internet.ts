import type { DailyLifeTopic } from '../../../../types/content';

const simPhoneInternet: DailyLifeTopic = {
    id: 'sim-phone-internet',
    title: 'SIM, điện thoại và internet',
    titleJp: 'SIM・携帯電話・インターネット',
    icon: 'phone-portrait',
    color: '#2874A6',
    description: 'Chọn loại SIM phù hợp, hiểu điều kiện hợp đồng và tránh các phí hủy hoặc khóa dịch vụ ngoài ý muốn.',
    sections: [
      {
        title: 'Phân biệt thứ mình đang cần',
        content:
          'Người mới sang thường nhầm giữa data SIM, SIM có thoại, eSIM và internet cố định tại nhà. Mỗi loại phục vụ một nhu cầu khác nhau.',
        items: [
          'Nếu chỉ cần internet tạm thời, data SIM có thể đủ. Nếu cần đăng ký ngân hàng, công việc hoặc liên lạc ổn định, nhiều trường hợp nên ưu tiên SIM có số điện thoại.',
          'Internet cố định ở nhà không giống đăng ký SIM điện thoại. Có thể cần lịch hẹn kỹ thuật và thời gian chờ lắp đặt.',
          'Một số nhà mạng hoặc gói rẻ có điều kiện về thời gian hợp đồng, phí hủy hoặc giới hạn hỗ trợ tiếng Anh.',
        ],
        tip: 'Đừng ký ngay chỉ vì đang có khuyến mãi. Hãy hỏi rõ phí hàng tháng, phí hủy và giấy tờ cần mang.',
        image: require('../../../../../assets/content/daily-life/dl_sim_s1.jpg'),
        imageCaption: '格安SIM・MVNO — các loại SIM phổ biến tại Nhật, khác nhau về thoại, data và điều kiện hợp đồng',
      },
      {
        title: 'Giấy tờ và kiểm tra danh tính',
        content:
          'Đăng ký SIM hoặc internet thường yêu cầu xác minh danh tính và địa chỉ. Đây là chỗ người mới bị vướng nhiều nhất.',
        items: [
          'Thẻ cư trú gần như là giấy tờ nền tảng. Một số nơi còn hỏi thêm thông tin tài khoản ngân hàng hoặc thẻ thanh toán.',
          'Nếu địa chỉ vừa đổi mà chưa cập nhật, hợp đồng có thể bị treo hoặc thư xác minh gửi không tới.',
          'Tên đăng ký nên thống nhất với các giấy tờ khác để đỡ rắc rối khi mở ngân hàng hoặc nhận hàng sau này.',
        ],
        tip: 'Sau khi ký xong, chụp lại toàn bộ hợp đồng, gói cước, mã khách hàng và cách hủy khi cần.',
      },
      {
        title: 'Khi mạng lỗi hoặc cần hủy',
        content:
          'Nhiều người chỉ đến khi mất mạng mới đi tìm hợp đồng. Lúc đó rất dễ mất thời gian vì không có mã khách hàng hoặc lịch sử hỗ trợ.',
        items: [
          'Giữ lại số hợp đồng, số điện thoại hỗ trợ, ngày bắt đầu sử dụng và ảnh màn hình gói cước.',
          'Nếu internet nhà bị lỗi, ghi rõ đèn modem hiện thế nào, có mất toàn bộ hay chỉ mất một phần, và lỗi bắt đầu từ lúc nào.',
          'Trước khi hủy hợp đồng, phải kiểm tra có phí hủy, phí trả modem hay lịch cắt dịch vụ nào không.',
        ],
        tip: 'Nên lưu sẵn câu tiếng Nhật để gọi tổng đài khi mất mạng hoặc cần đổi lịch lắp đặt.',
      },
    ],
  };

export default simPhoneInternet;
