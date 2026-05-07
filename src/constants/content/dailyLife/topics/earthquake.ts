import type { DailyLifeTopic } from '../../../../types/content';

const earthquake: DailyLifeTopic = {
    id: 'earthquake',
    title: 'Động đất, bão và phòng thủ thiên tai',
    titleJp: '地震・台風・防災',
    icon: 'warning',
    color: '#C0392B',
    description: 'Hiểu thang cảnh báo, cài app đúng, chuẩn bị túi khẩn cấp và biết phải làm gì trong 30 giây đầu.',
    sections: [
      {
        title: 'Cài app và hiểu hệ thống cảnh báo của Nhật',
        content:
          'Nhật Bản có hệ thống cảnh báo thiên tai rất phát triển — nhưng phần lớn là tiếng Nhật. Phải chuẩn bị trước khi cần.',
        items: [
          'Yahoo!防災速報 (Yahoo Bosai): app miễn phí, phổ biến nhất ở Nhật, có thể đặt cảnh báo theo vị trí — cảnh báo động đất, sóng thần, mưa lớn, lũ lụt.',
          'NHK World Japan: app tin tức của NHK có tiếng Anh, phát thông báo thiên tai khẩn cấp đa ngôn ngữ.',
          'J-Alert (全国瞬時警報システム): hệ thống cảnh báo quốc gia phát qua loa phường, TV và điện thoại — không cần cài, nhưng cần biết tiếng còi và thông báo có nghĩa gì.',
          'Thang rung chấn Nhật (震度): từ 1 (rất nhẹ) đến 7 (thảm họa). Cấp 4 trở lên nên chú ý. Cấp 5 mạnh (5強) trở lên thường gây thiệt hại.',
          'Bản đồ nguy cơ thiên tai (ハザードマップ): tra địa chỉ nhà mình tại hazardmap.gsi.go.jp — xem khu mình có nằm trong vùng lũ, sóng thần hoặc sạt lở không.',
        ],
        tip: 'Cài Yahoo!防災速報 và bật thông báo vị trí ngay tuần đầu đến Nhật — việc này chỉ mất 3 phút nhưng có thể cực kỳ quan trọng.',
      },
      {
        title: 'Túi khẩn cấp (非常持出袋) — chuẩn bị sẵn một lần',
        content:
          'Cơ quan Quản lý Cháy nổ và Thảm họa Nhật Bản (消防庁) khuyến nghị mọi hộ gia đình nên có túi này. Không cần hoàn hảo — nhưng cần có.',
        items: [
          'Nước uống: ít nhất 1–1.5 lít/ngày/người, chuẩn bị cho 3 ngày.',
          'Đồ ăn khô 3 ngày: biscuit, thanh năng lượng, mì gói không cần nấu.',
          'Sạc dự phòng (モバイルバッテリー) đã sạc đầy và dây sạc.',
          'Đèn pin + pin dự phòng hoặc đèn pin tay quay.',
          'Thuốc cơ bản đang uống + băng gạc cơ bản.',
          'Bản sao giấy tờ quan trọng: thẻ cư trú, bảo hiểm, hộ chiếu, thẻ ngân hàng (để trong túi nhựa chống nước).',
          'Tiền mặt: ATM và thẻ thường không dùng được sau thảm họa lớn.',
        ],
        tip: 'Để túi này ngay cạnh cửa ra vào hoặc dưới gầm giường — không để trong tủ sâu. Kiểm tra pin và hạn đồ ăn mỗi 6 tháng.',
        image: require('../../../../../assets/content/daily-life/dl_earthquake_s2.jpg'),
        imageCaption: 'Túi khẩn cấp (非常持出袋) với đồ dùng 3 ngày — nước, đồ ăn khô, đèn pin, sạc dự phòng, giấy tờ quan trọng',
      },
      {
        title: 'Trong 30 giây đầu khi động đất xảy ra',
        content:
          'Phần lớn chấn thương không đến từ rung chấn trực tiếp mà từ vật rơi, kính vỡ và ngã do mất thăng bằng khi chạy.',
        items: [
          'Trong nhà: chui xuống bàn hoặc dùng tay/gối che đầu, bám giữ vật cố định, tránh cửa kính và kệ cao.',
          'Nếu đang nấu ăn: tắt bếp nếu an toàn — nhưng nếu rung đã mạnh thì ưu tiên bảo vệ đầu trước.',
          'Ngoài đường: tránh biển quảng cáo, cột điện, tường gạch cũ, mái nhà có nguy cơ đổ. Tìm chỗ trống và ngồi xuống.',
          'Trong thang máy: bấm nhiều tầng, thoát ra ngay tầng nào mở trước — không cố đợi tầng mình.',
          'Không chạy ra cầu thang hoặc cửa ngay khi đang rung — chờ rung mạnh qua đi trước.',
        ],
        tip: 'Sau rung chính có thể có dư chấn (余震) — đừng nghĩ đã xong. Tiếp tục đề phòng và nghe cảnh báo chính thức.',
        image: require('../../../../../assets/content/daily-life/dl_earthquake_s3.jpg'),
        imageCaption: 'Tư thế bảo vệ khi động đất — chui xuống bàn, che đầu, bám giữ (Drop-Cover-Hold)',
      },
      {
        title: 'Sau động đất và ứng phó bão / mưa lớn',
        content:
          'Giai đoạn sau thảm họa mới là lúc quyết định ở lại hay sơ tán.',
        items: [
          'Kiểm tra gas: nếu có mùi khí, mở cửa sổ, không bật điện/bật lửa, tắt van gas chính và ra ngoài.',
          'Điểm sơ tán khẩn cấp (緊急避難場所): thường là công viên lớn, trường học — tra trên bản đồ phường trước khi cần.',
          'Điểm trú ẩn dài hạn (避難所): thường là trường học, trung tâm cộng đồng — sẽ được thông báo sau thảm họa.',
          'Cảnh báo mưa lớn và lũ: Nhật dùng thang 5 cấp (警戒レベル) — cấp 4 là "hầu hết cần sơ tán", cấp 5 là "đã xảy ra thảm họa". Cấp 3 trở lên với người già/trẻ em/người khuyết tật nên sơ tán sớm.',
          'Bão (台風): theo dõi đường đi bão qua NHK World hoặc Yahoo!防災. Tích nước, thức ăn và sạc điện thoại trước khi bão đến.',
        ],
        tip: 'Lúc thiên tai, chỉ tin vào thông báo chính thức từ chính quyền địa phương và NHK. Tin từ mạng xã hội rất dễ sai lệch trong thời điểm hỗn loạn.',
        image: require('../../../../../assets/content/daily-life/dl_earthquake_s4.jpg'),
        imageCaption: 'Biển chỉ điểm sơ tán (避難場所) — biển xanh chữ trắng, tra vị trí trên bản đồ phường trước khi cần',
      },
    ],
  };

export default earthquake;
