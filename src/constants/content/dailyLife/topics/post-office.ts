import type { DailyLifeTopic } from '../../../../types/content';

const postOffice: DailyLifeTopic = {
    id: 'post-office',
    title: 'Bưu điện, nhận hàng và gửi đồ',
    titleJp: '郵便局・荷物の受け取り',
    icon: 'mail',
    color: '#2980B9',
    description: 'Nhận thư bảo đảm, gửi đồ, xử lý phiếu giao hàng lại và tránh thất lạc giấy tờ.',
    sections: [
      {
        title: 'Những loại thư và phiếu hay gặp',
        content: 'Không phải thư nào trong hòm cũng có thể để đó. Có loại bỏ qua vài ngày là rất phiền.',
        items: [
          'Phiếu phát hàng lại khi shipper đến mà bạn vắng nhà.',
          'Thư bảo đảm hoặc thư cần ký nhận từ ngân hàng, trường, cơ quan hành chính.',
          'Giấy báo thanh toán hoặc giấy nhắc nếu bạn chưa trả đúng hạn một số dịch vụ.',
        ],
        tip: 'Thư có dấu đỏ, thư bảo đảm hoặc thư từ cơ quan hành chính nên xử lý trước. Đừng để dồn rồi quên.',
        image: require('../../../../../assets/content/daily-life/dl_post-office_s1.jpg'),
        imageCaption: 'Bưu điện Nhật (郵便局) — nhận biết qua ký hiệu 〒 màu đỏ đặc trưng của Japan Post',
      },
      {
        title: 'Cách nhận hàng cho đỡ lỡ',
        content: 'Nếu lịch sống của bạn thất thường, nên sớm tạo thói quen đổi lịch giao và theo dõi mã hàng.',
        items: [
          'Dùng mã tracking để biết ngày dự kiến giao.',
          'Nếu vắng nhà, đặt giao lại vào khung giờ mình có mặt hoặc chọn nhận ở điểm tiện hơn nếu dịch vụ hỗ trợ.',
          'Với giấy tờ quan trọng, nên kiểm tra tên người nhận và địa chỉ thật kỹ từ trước.',
        ],
        tip: 'Người mới chuyển nhà rất hay quên đổi địa chỉ nhận hàng, dẫn đến đơn vẫn chạy về chỗ cũ.',
        image: require('../../../../../assets/content/daily-life/dl_post-office_s2.jpg'),
        imageCaption: 'Phiếu giao hàng lại (不在票) — điền vào để đặt lịch giao lại hoặc chọn nhận tại điểm tiện hơn',
      },
      {
        title: 'Gửi đồ và gửi giấy tờ',
        content: 'Gửi đồ ở Nhật khá dễ, nhưng gửi giấy tờ quan trọng thì nên chọn đúng loại dịch vụ.',
        items: [
          'Hàng thông thường có thể gửi qua bưu điện hoặc dịch vụ chuyển phát.',
          'Giấy tờ quan trọng nên chọn loại có tracking hoặc có ký nhận.',
          'Khi gửi quốc tế, phải kiểm tra trước loại hàng bị hạn chế và mẫu khai cần điền.',
        ],
        tip: 'Nếu là hồ sơ quan trọng, chụp lại trước khi gửi và giữ biên nhận đến khi nơi nhận xác nhận đã nhận đủ.',
        image: require('../../../../../assets/content/daily-life/dl_post-office_s3.jpg'),
        imageCaption: 'Quầy gửi hàng tại bưu điện — gửi giấy tờ quan trọng nên chọn dịch vụ có tracking và ký nhận',
      },
    ],
  };

export default postOffice;
