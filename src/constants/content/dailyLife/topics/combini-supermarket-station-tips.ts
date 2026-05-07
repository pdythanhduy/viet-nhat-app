import type { DailyLifeTopic } from '../../../../types/content';

const combiniSupermarketStationTips: DailyLifeTopic = {
    id: 'combini-supermarket-station-tips',
    title: 'Mẹo ở combini, siêu thị và ga tàu',
    titleJp: 'コンビニ・スーパー・駅の実用メモ',
    icon: 'storefront',
    color: '#2874A6',
    description: 'Những mẹo rất đời thực khi mua đồ, nhận hàng, in giấy và đi lại hằng ngày.',
    sections: [
      {
        title: 'Combini không chỉ để mua đồ ăn',
        content: 'Nhiều người dùng combini như cửa hàng tiện lợi đơn thuần, nhưng thực tế đây còn là điểm xử lý rất nhiều việc nhỏ.',
        items: [
          'Một số combini có máy đa chức năng để in tài liệu, scan, thanh toán hóa đơn và dùng dịch vụ chứng nhận nếu địa phương hỗ trợ コンビニ交付.',
          'Khi cần in nhanh hồ sơ, vé, bản scan hộ chiếu hoặc giấy xác nhận, combini thường tiện hơn đi tìm cửa hàng in riêng.',
          'Nhiều loại hóa đơn sinh hoạt hoặc phiếu thanh toán có thể xử lý ở quầy thu ngân combini, rất hữu ích khi bạn chưa kịp cài tự trừ.',
        ],
        tip: 'Nếu bạn mới sang Nhật, nên thử làm quen sớm với máy in đa chức năng ở combini gần nhà. Đây là kỹ năng rất thực dụng.',
        image: require('../../../../../assets/content/daily-life/dl_combini_s1.jpg'),
        imageCaption: 'Quầy dịch vụ combini — in tài liệu, scan, thanh toán hóa đơn, ATM và nhiều dịch vụ khác trong một điểm',
      },
      {
        title: 'Siêu thị có logic riêng, không chỉ là rẻ hơn combini',
        content: 'Đi siêu thị đúng giờ và đúng khu có thể tiết kiệm tiền rõ ràng mà không cần sống quá kham khổ.',
        items: [
          'Cuối ngày thường có nhãn giảm giá cho đồ ăn sẵn, thịt, cá và hộp cơm.',
          'Mỗi siêu thị mạnh ở một nhóm khác nhau: có nơi rau rẻ, có nơi đồ đông lạnh tốt, có nơi đồ chín sẵn ổn hơn.',
          'Nếu nấu ở nhà, nên đi siêu thị với danh sách ngắn rõ ràng; vào khi đói hoặc không có kế hoạch rất dễ mua linh tinh.',
        ],
        tip: 'Một mẹo đơn giản nhưng hiệu quả: chọn 1-2 siêu thị chính quen mặt bằng giá, thay vì mua ngẫu hứng ở nhiều chỗ rồi không nhớ giá thật.',
      },
      {
        title: 'Ở ga tàu, thông tin đáng tin nhất thường ở biển chỉ dẫn và app',
        content: 'Người mới hay rối vì ga lớn, nhiều line và quá nhiều bảng điện tử. Cách đơn giản nhất là bám vào đúng loại thông tin.',
        items: [
          'Nhìn line, platform number, ga kế tiếp và giờ tàu trên app thay vì chỉ nhớ tên tàu bằng cảm giác.',
          'Nếu tàu trễ, hãy kiểm tra xem ga hoặc công ty tàu có cấp 遅延証明書 hay không nếu bạn cần đưa cho công ty hoặc trường.',
          'Khi lạc trong ga lớn, ưu tiên tìm đúng line và số cổng ra, không cố đoán hướng theo trực giác.',
        ],
        tip: 'Nếu phải chuyển tuyến trong ga lớn hằng ngày, nên lưu ảnh màn hình của đúng lộ trình và cổng ra hay dùng trong tuần đầu.',
      },
    ],
  };

export default combiniSupermarketStationTips;
