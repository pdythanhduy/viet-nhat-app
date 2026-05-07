import type { DailyLifeTopic } from '../../../../types/content';

const japanSeasonsWeather: DailyLifeTopic = {
    id: 'japan-seasons-weather',
    title: 'Thời tiết và 4 mùa ở Nhật',
    titleJp: '日本の四季と天気の備え',
    icon: 'partly-sunny-outline',
    color: '#2980B9',
    description: 'Nhật Bản có 4 mùa rõ rệt và một số hiện tượng thời tiết đặc thù — biết trước để chuẩn bị quần áo, sức khoẻ và chi phí điện nước đúng mùa.',
    sections: [
      {
        title: 'Xuân và mùa hoa anh đào (tháng 3–5)',
        content:
          'Mùa xuân dễ chịu nhất trong năm — nhưng cũng là mùa của 花粉症 (kafunsho / dị ứng phấn hoa) ảnh hưởng nhiều người nước ngoài.',
        items: [
          'Nhiệt độ: 8–20°C. Tháng 3 còn lạnh về đêm, tháng 4–5 ấm áp dễ chịu. Cần áo khoác mỏng đến hết tháng 3.',
          '🌸 Hoa anh đào (桜 / sakura): nở cuối tháng 3 đến đầu tháng 4 ở hầu hết Nhật Bản (Hokkaido muộn hơn, tháng 5). Thời gian nở chỉ khoảng 1–2 tuần — theo dõi dự báo sakura trên Yahoo!天気 hoặc NHK.',
          '🤧 花粉症 (kafunsho — dị ứng phấn hoa): mùa tuyết tùng (杉 / sugi) từ tháng 2–4, tiếp theo là tuyết bách (hinoki) tháng 4–5. Triệu chứng: hắt hơi, chảy nước mắt, ngứa mắt. Thuốc kháng histamine bán tự do ở combini và dược phòng.',
          'Nếu bị dị ứng lần đầu: đến クリニック để được kê đơn thuốc mạnh hơn — có thể dùng bảo hiểm y tế. Đeo khẩu trang N95 khi ra ngoài ngày phấn hoa cao.',
          'Tháng 5 (Golden Week): nhiều ngày lễ liên tiếp (29/4–5/5). Tàu xe, khách sạn, nhà hàng rất đông — đặt trước nếu cần đi đâu.',
        ],
        tip: 'App Yahoo!天気・災害 có phần dự báo 花粉情報 (mức phấn hoa theo ngày và tỉnh) — rất hữu ích trong mùa này.',
        image: require('../../../../../assets/content/daily-life/dl_seasons_s1.jpg'),
        imageCaption: 'Hoa anh đào (桜) nở tháng 3–4 — thời gian nở chỉ khoảng 1–2 tuần, theo dõi dự báo sakura trên Yahoo!天気',
      },
      {
        title: 'Mùa mưa và hè nóng (tháng 6–9)',
        content:
          'Đây là giai đoạn khó nhất với người mới sang — đặc biệt tháng 7–8 nóng ẩm cực độ.',
        items: [
          '☔ 梅雨 (tsuyu — mùa mưa): khoảng tháng 6–7, mưa liên tục nhiều ngày, độ ẩm 80–90%. Cần ô gấp (折り畳み傘), dép chống nước, và máy hút ẩm nếu ở trong nhà. Quần áo khó khô — dùng máy sấy hoặc máy giặt sấy.',
          '🥵 Mùa hè (tháng 7–9): Tokyo, Osaka, Nagoya thường 33–38°C, độ ẩm cao — cảm giác như 40°C+. Hokkaido mát hơn đáng kể (25–28°C).',
          'Nguy cơ sốc nhiệt (熱中症 / necchuusho): uống nước đều đặn kể cả khi không khát, tránh ra ngoài 11h–15h nếu không cần thiết, mang theo nước và khăn lạnh (冷感タオル bán ở combini).',
          'Chi phí điện mùa hè: điều hoà chạy 24/7 có thể đẩy tiền điện lên 8.000–15.000¥/tháng. Đặt 27–28°C + quạt tiết kiệm hơn đặt 24°C.',
          '🌀 Bão (台風 / taifu): mùa cao điểm tháng 8–10. Khi có cảnh báo: không ra ngoài khi gió cấp 8+, tích nước và đồ ăn trước 1–2 ngày, sạc đầy pin dự phòng. Theo dõi qua Yahoo!防災速報 hoặc NHK.',
        ],
        tip: 'Mua 経口補水液 (OS-1 hoặc tương đương) trữ sẵn — đây là nước bù điện giải cho người bị sốc nhiệt, hiệu quả hơn nước lọc thường khi cơ thể đã mệt.',
        image: require('../../../../../assets/content/daily-life/dl_seasons_s2.jpg'),
        imageCaption: 'Cảnh báo bão/mưa lớn mùa hè — theo dõi qua Yahoo!防災速報, tích nước và sạc điện thoại trước khi bão đến',
      },
      {
        title: 'Thu dễ chịu và lá đỏ (tháng 10–11)',
        content:
          'Mùa thu là thời điểm dễ chịu nhất để đi ra ngoài — nhiệt độ mát, không mưa nhiều.',
        items: [
          'Nhiệt độ: 15–25°C tháng 10, 8–18°C tháng 11. Cần áo khoác từ cuối tháng 10.',
          '🍁 Lá đỏ (紅葉 / kouyou): tháng 10–11 tùy vùng. Hokkaido đỏ từ tháng 10, Kanto và Kansai tháng 11–12. Công viên và đền chùa rất đông vào cuối tuần.',
          'Thời tiết ổn định, ít mưa, độ ẩm thấp — quần áo khô nhanh, điều hoà/sưởi chưa cần nhiều. Tiền điện thấp nhất trong năm.',
          'Chuẩn bị mua đồ đông sớm (tháng 10): áo phao, áo len dày, giày chống nước. Sau tháng 11 hàng sale thu đông hay hết size.',
        ],
        tip: 'Tháng 11 có nhiều đợt sale lớn (Black Friday, cuối mùa thu đông) tại AEON, Uniqlo và Don Quijote — thời điểm tốt để mua đồ đông giá tốt.',
        image: require('../../../../../assets/content/daily-life/dl_seasons_s3.jpg'),
        imageCaption: 'Lá đỏ mùa thu (紅葉 / もみじ) — tháng 10–11 tùy vùng, công viên và đền chùa rất đông vào cuối tuần',
      },
      {
        title: 'Mùa đông và tuyết (tháng 12–2)',
        content:
          'Đông Nhật Bản chia 2 vùng rõ rệt: Thái Bình Dương (Tokyo, Osaka) — lạnh khô, ít tuyết; Nhật Bản Hải (Niigata, Akita, Hokkaido) — tuyết rất nhiều.',
        items: [
          'Tokyo/Osaka: 2–10°C, tuyết hiếm (Tokyo tuyết 1–3 lần/năm, mỏng). Cần áo phao dày, khăn quàng, găng tay từ tháng 12.',
          'Niigata/Toyama/Hokkaido: có thể có 1–3m tuyết. Nếu làm việc ở các tỉnh này cần ủng chống tuyết, áo winter coat thật sự dày và lốp xe mùa đông (スタッドレスタイヤ).',
          '🔥 Sưởi: điều hoà chế độ sưởi (暖房) + コタツ (bàn có sưởi dưới) + 電気毛布 (chăn điện) là combo phổ biến. Tránh để máy sưởi dầu (石油ストーブ) trong phòng kín mà không thông gió — nguy cơ ngộ độc CO.',
          'Chi phí điện/gas mùa đông: 8.000–18.000¥/tháng tùy vùng và loại sưởi. Sưởi điện (エアコン) tiết kiệm hơn sưởi gas riêng lẻ.',
          '🎍 Oshogatsu (お正月 / Tết Nhật): 1–3/1. Hầu hết cửa hàng đóng hoặc rút ngắn giờ. Tích trữ đồ ăn từ 30/12. Combini và một số siêu thị AEON vẫn mở.',
          'Da khô và nứt nẻ: độ ẩm trong nhà mùa đông xuống dưới 30% — dùng máy tạo ẩm (加湿器) và kem dưỡng tay. Bán phổ biến ở Daiso và dược phòng.',
        ],
        tip: 'Uniqlo HEATTECH là lớp lót giữ nhiệt rất phổ biến — mua 2–3 bộ từ tháng 11 trước khi hết size. Loại Extra Warm dành cho vùng có tuyết.',
        image: require('../../../../../assets/content/daily-life/dl_seasons_s4.jpg'),
        imageCaption: 'Mùa đông có tuyết ở Nhật — Tokyo/Osaka ít tuyết, còn Niigata/Hokkaido có thể 1–3m tuyết',
      },
    ],
  };

export default japanSeasonsWeather;
