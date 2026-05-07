import type { DailyLifeTopic } from '../../../../types/content';

const transportation: DailyLifeTopic = {
    id: 'transportation',
    title: 'Tàu điện, xe buýt và xe đạp',
    titleJp: '電車・バス・自転車',
    icon: 'train',
    color: '#E74C3C',
    description: 'Đi tàu cho đỡ lạc, dùng thẻ IC đúng cách và tránh các lỗi xe đạp dễ bị phạt.',
    sections: [
      {
        title: 'Đi tàu cho người mới',
        content: 'Hệ thống tàu nhìn phức tạp nhưng chỉ cần nắm vài nguyên tắc là dùng được.',
        items: [
          'Dùng Suica hoặc Pasmo sẽ tiện hơn mua vé giấy từng chặng.',
          'Khi vào và ra ga đều phải chạm thẻ hoặc điện thoại. Quên chạm lúc ra sẽ làm thẻ bị lỗi.',
          'Nếu đi sai ga hoặc thiếu tiền, xử lý ở máy điều chỉnh cước trước khi ra cổng.',
          'Dùng app như Google Maps hoặc Yahoo!乗換案内 để xem đúng ga, đúng platform và giờ tàu.',
        ],
        tip: 'Lúc mới đi, nên chụp màn hình lộ trình trước khi xuống ga. Trong ga lớn rất dễ mất mạng hoặc đi nhầm hướng.',
        image: require('../../../../../assets/content/daily-life/dl_transportation_s1.jpg'),
        imageCaption: 'Cổng soát vé (改札口) — chạm thẻ IC lúc vào và lúc ra, quên chạm lúc ra sẽ bị lỗi thẻ',
      },
      {
        title: 'Suica, Pasmo và nạp tiền',
        content: 'Thẻ IC không chỉ dùng cho tàu mà còn dùng cho xe buýt, combini và nhiều máy bán hàng.',
        items: [
          'Có thể dùng thẻ vật lý hoặc thêm vào điện thoại nếu máy hỗ trợ.',
          'Nạp tiền ở máy trong ga, combini hoặc một số ATM.',
          'Nếu bạn đi làm cố định một tuyến, nên hỏi thêm vé tháng để tiết kiệm.',
        ],
        tip: 'Hãy kiểm tra số dư trước giờ cao điểm. Hết tiền trong lúc chen cổng rất dễ rối.',
        image: require('../../../../../assets/content/daily-life/dl_transportation_s2.jpg'),
        imageCaption: 'Thẻ Suica (ICカード) — nạp tiền tại máy trong ga, combini hoặc ATM',
      },
      {
        title: 'Xe đạp: đi rất tiện nhưng luật siết mạnh',
        content: 'Xe đạp là phương tiện rất thực tế ở Nhật, nhưng luật hiện hành siết dần và xử phạt rõ hơn trước.',
        items: [
          'Nên đăng ký chống trộm xe khi mua xe để chứng minh quyền sở hữu.',
          'Không đỗ bừa ngoài ga hoặc trước cửa hàng. Xe có thể bị kéo đi và mất phí chuộc lại.',
          'Ban đêm phải bật đèn, không vừa đạp vừa dùng điện thoại, không chở người trái quy định.',
          'Nếu cần xem thay đổi pháp lý mới hơn, nên mở guide luật xe đạp trong tab Thủ tục.',
        ],
        tip: 'Nếu đi xe đạp đi làm mỗi ngày, nên kiểm tra luôn bảo hiểm trách nhiệm dân sự xe đạp của khu bạn.',
        image: require('../../../../../assets/content/daily-life/dl_transportation_s3.jpg'),
        imageCaption: 'Bãi giữ xe đạp (駐輪場) gần ga tàu — đậu đúng chỗ để tránh bị kéo đi và mất phí chuộc',
      },
    ],
  };

export default transportation;
