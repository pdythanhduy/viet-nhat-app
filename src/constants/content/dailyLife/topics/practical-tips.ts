import type { DailyLifeTopic } from '../../../../types/content';

const practicalTips: DailyLifeTopic = {
    id: 'practical-tips',
    title: 'Mẹo thực tế ở Nhật',
    titleJp: '日本生活の実用メモ',
    icon: 'bulb',
    color: '#7D3C98',
    description: 'Những mẹo nhỏ nhưng rất đáng tiền nếu bạn sống ở Nhật hằng ngày, kèm điều kiện áp dụng.',
    sections: [
      {
        title: 'Có thể lấy 住民票 ở combini, nhưng không phải ai cũng lấy được',
        content:
          'Đây là mẹo rất đáng biết, nhưng phải hiểu đúng điều kiện. Không phải cứ sống ở Nhật là ra combini lấy được giấy cư trú.',
        items: [
          'Nếu địa phương bạn ở có hỗ trợ コンビニ交付, bạn có thể lấy một số giấy như bản sao 住民票 hoặc 印鑑登録証明書 tại combini.',
          'Điều kiện thực tế thường gồm: có My Number Card còn hiệu lực, có mã PIN 4 số của 利用者証明用電子証明書 và địa phương tham gia dịch vụ.',
          'Không nên mặc định là mọi chứng nhận đều lấy được, mọi combini đều giống nhau hoặc giờ phục vụ lúc nào cũng như nhau.',
        ],
        tip: 'Nếu bạn hay cần 住民票 để mở tài khoản, làm sim hoặc nộp hồ sơ, đây là mẹo rất tiết kiệm thời gian.',
      },
      {
        title: 'Chuyển nhà thì làm luôn chuyển tiếp thư 1 năm',
        content:
          'Nhiều người đổi địa chỉ ở municipal office nhưng quên thư cũ vẫn chạy về nhà cũ. Đây là lỗi rất hay làm lỡ giấy quan trọng.',
        items: [
          'Khi nộp 転居届, thư và bưu phẩm đủ điều kiện có thể được chuyển tiếp miễn phí 1 năm từ địa chỉ cũ sang địa chỉ mới.',
          'Có thể làm tại bưu điện, gửi mẫu giấy hoặc dùng e転居. Việc cập nhật có thể mất vài ngày làm việc.',
          'Không nên nộp sát ngày chuyển nhà rồi nghĩ thư sẽ tự chuyển ngay trong hôm đó.',
        ],
        tip: 'Đây là việc rất đáng làm ngay khi đổi nhà, vì thư từ ngân hàng, trường, bảo hiểm và cơ quan nhà nước thường tới rải rác trong vài tuần.',
      },
      {
        title: 'Điền form 転居届 và 住民異動届 khi chuyển nhà',
        content:
          'Khi chuyển nhà ở Nhật có hai loại thủ tục khác nhau hay bị nhầm: một loại ở 役所 để cập nhật hộ khẩu, một loại ở bưu điện để chuyển tiếp thư. Cả hai đều cần làm.',
        items: [
          '【Tại 役所 — Cập nhật địa chỉ hộ khẩu (住民異動届)】\n・Điền form 住民異動届 tại quầy 市区町村役所.\n・異動事由: chọn “転居” (cùng thành phố/quận) hoặc “転入” (từ nơi khác đến) — đọc kỹ, chọn sai sẽ phải làm lại.\n・転出入年月日: ngày bạn thực sự chuyển đến.\n・新住所: địa chỉ mới chính xác như trên hợp đồng thuê nhà.\n・氏名 + 生年月日 + 現住所 (địa chỉ cũ): điền đúng với 在留カード.\n・Mang theo: 在留カード (bắt buộc), My Number Card hoặc thông báo My Number, 印鑑 nếu có.\n・Sau khi làm xong: 在留カード sẽ được đóng dấu địa chỉ mới ngay tại quầy.',
          '【Tại bưu điện — Chuyển tiếp thư 1 năm (転居届)】\n・Lấy form 転居届 (mẫu màu vàng) tại quầy bưu điện hoặc tải trên website e転居.\n・Ghi: 旧住所 (địa chỉ cũ), 新住所 (địa chỉ mới), 氏名, ngày chuyển đến.\n・Nộp tại quầy kèm giấy tờ xác minh danh tính (My Number Card hoặc 在留カード).\n・Hiệu lực bắt đầu sau 3–5 ngày làm việc và kéo dài 1 năm.',
          '⚠️ Quan trọng: 転居届 ở bưu điện KHÔNG bao gồm thư có in “転送不要” — loại này bưu điện sẽ trả về nơi gửi. Thư ngân hàng, thẻ My Number, thông báo từ cơ quan nhà nước thường là loại 転送不要. Phải tự liên hệ từng nơi để đổi địa chỉ.',
        ],
        tip: 'Làm cả hai càng sớm càng tốt — lý tưởng nhất là trong 14 ngày kể từ ngày chuyển nhà. Nếu chuyển từ quận/thành phố khác: làm 転出届 ở nơi cũ trước, rồi mang giấy 転出証明書 đến 役所 nơi mới.',
      },
      {
        title: 'My Number card có thể đăng ký dùng như bảo hiểm, nhưng phải đăng ký trước',
        content:
          'Nhiều người nghe nói “đi khám chỉ cần My Number” rồi tưởng cầm thẻ là dùng được ngay. Thực tế không phải vậy.',
        items: [
          'Để dùng My Number card như thẻ bảo hiểm, bạn phải đăng ký利用 trước.',
          'Các cách đăng ký thường gồm: tại máy đọc thẻ ở cơ sở y tế/pharmacy, qua Myna Portal hoặc qua ATM Seven Bank.',
          'Dù đã đăng ký, bạn vẫn nên kiểm tra trước nếu đây là lần đầu đi khám ở nơi đó.',
        ],
        tip: 'Nếu bạn đã có My Number card mà vẫn cầm thẻ bảo hiểm giấy mỗi lần đi khám, nên kiểm tra xem mình đã đăng ký利用 chưa.',
      },
      {
        title: 'Bưu kiện có thể đổi cách nhận, không nhất thiết chờ ở nhà',
        content:
          'Nếu bạn đi làm hoặc đi học cả ngày, chờ bưu kiện ở nhà là cách sống rất mệt và dễ lỡ hàng.',
        items: [
          'Japan Post có các lựa chọn đổi ngày giờ nhận hoặc đổi cách nhận khi bạn nhận được eお届け通知.',
          'Tùy điều kiện dịch vụ, bạn có thể đổi sang nhận ở bưu điện, locker はこぽす hoặc hình thức nhận linh hoạt khác.',
          'Điểm mấu chốt là phải có thông báo giao hàng hoặc mã theo dõi phù hợp với điều kiện dịch vụ.',
        ],
        tip: 'Nếu bạn ở một mình, nên ưu tiên học cách đổi ngày giờ nhận hoặc nhận ở điểm gần ga để đỡ bị phụ thuộc vào shipper.',
      },
    ],
  };

export default practicalTips;
