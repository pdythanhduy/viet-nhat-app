import type { DailyLifeTopic } from '../../../../types/content';

const smartShopping: DailyLifeTopic = {
    id: 'smart-shopping',
    title: 'Mua sắm thông minh — 100¥, Donki và đồ cũ',
    titleJp: '賢い買い物 — 100均・ドンキ・リサイクルショップ',
    icon: 'pricetag',
    color: '#8E44AD',
    description: 'Khai thác Daiso, Don Quijote, cửa hàng đồ cũ và Mercari để sống tốt hơn mà tốn ít hơn.',
    sections: [
      {
        title: 'Cửa hàng 100 yên — mua gì thì đáng, mua gì thì không',
        content:
          'Ba chuỗi lớn nhất: Daiso, Seria, CanDo. Giá hiện tại (2026) là 110 yên/món (gồm thuế), một số mặt hàng ở Daiso có giá 220 yên, 330 yên hoặc cao hơn.',
        items: [
          'Đáng mua: đồ bếp (đũa, bát, hộp đựng thức ăn, rổ, dao...), văn phòng phẩm, đồ vệ sinh nhà (bàn chải, giẻ, nước rửa chén nhỏ), phụ kiện điện thoại (cáp, ốp), hộp lưu trữ nhỏ.',
          'Seria được đánh giá cao hơn về chất lượng đồ dùng nhà bếp và đồ thủ công (stationery, craft).',
          'Không nên kỳ vọng quá cao ở đồ điện hoặc đồ dùng cần độ bền — pin, cáp sạc rẻ thường kém bền hơn nhiều so với thương hiệu.',
          'Daiso có phiên bản online (daiso-sangyo.co.jp) và nhiều chi nhánh lớn ở trung tâm thương mại có hàng đa dạng hơn chi nhánh nhỏ.',
        ],
        tip: 'Khi mới chuyển nhà, một chuyến Daiso có thể trang bị được 80% đồ bếp và vệ sinh cơ bản với 3.000–5.000 yên.',
      },
      {
        title: 'Don Quijote (ドン・キホーテ / Donki) — dùng đúng cách',
        content:
          'Donki mở 24h, bán đủ thứ từ thực phẩm đến điện tử — nhưng không phải mọi thứ đều rẻ như nhiều người nghĩ.',
        items: [
          'Rẻ thật sự ở Donki: mỹ phẩm nội địa Nhật (make-up, skincare), thực phẩm nhập khẩu, đồ ăn vặt, nước ngọt, bia rượu ngoài giờ.',
          'Nên so giá trước khi mua đồ điện tử ở Donki — giá không phải lúc nào cũng tốt hơn Bic Camera, Yodobashi hoặc Amazon Nhật.',
          'Donki có khu đồ ăn châu Á và Đông Nam Á ở nhiều chi nhánh lớn — nơi tìm gia vị và thực phẩm quen thuộc.',
          'Donki Tax Free: người nước ngoài có thể mua miễn thuế tiêu thụ với tổng hóa đơn từ 5.000 yên trở lên (trừ thực phẩm và đồ tiêu hao) — cần mang hộ chiếu.',
        ],
        tip: 'Donki đặc biệt hữu ích lúc cần mua đồ ngoài giờ hành chính khi siêu thị đã đóng cửa.',
      },
      {
        title: 'Cửa hàng đồ cũ — tiết kiệm lớn nếu biết tìm',
        content:
          'Đồ cũ ở Nhật thường được giữ gìn rất tốt. Mua đồ cũ đúng chỗ có thể tiết kiệm 50–80% so với mới.',
        items: [
          'Hard Off (ハードオフ): điện tử, nhạc cụ, đồ gia dụng cũ — chuỗi lớn toàn quốc. Nhánh Off House bán quần áo và đồ gia đình.',
          'Book Off (ブックオフ): sách, manga, CD/DVD, game cũ — rất rẻ, đặc biệt sách tiếng Nhật để luyện đọc.',
          '2nd Street (セカンドストリート): quần áo và đồ dùng tổng hợp — thường có ở khu dân cư lớn.',
          'Mercari (メルカリ): ứng dụng mua bán đồ cũ C2C lớn nhất Nhật Bản — có thể tìm mọi thứ từ quần áo đến đồ bếp, xe đạp, điện tử. Cần tài khoản và địa chỉ Nhật để nhận hàng.',
          'Yahoo! Auction (ヤフオク): nền tảng đấu giá lâu đời, hàng hiệu và đồ điện tử cũ — cần tài khoản Yahoo Japan.',
        ],
        tip: 'Khi mới chuyển nhà, một chuyến Hard Off hoặc Off House có thể tìm được tủ lạnh, lò vi sóng, bàn ghế cũ còn tốt với giá 2.000–10.000 yên.',
      },
      {
        title: 'Mua online ở Nhật — Amazon, Rakuten và ứng dụng',
        content:
          'Mua online ở Nhật rất phát triển và giao hàng nhanh — nhưng có một vài điểm cần lưu ý.',
        items: [
          'Amazon Japan (amazon.co.jp): giao hàng nhanh, nhiều sản phẩm có Prime Same-Day hoặc Next-Day ở khu đô thị lớn. Cần địa chỉ và số điện thoại Nhật.',
          'Rakuten (楽天市場): hệ thống điểm thưởng (Rakuten Points) phức tạp nhưng có lợi nếu dùng đúng — đặc biệt khi mua nhiều lần hoặc có thẻ Rakuten.',
          'Nếu mua ở Mercari: kiểm tra ảnh thật, rating người bán và phí ship trước khi mua. Hàng được giao qua bưu điện — không nhận hàng trực tiếp từ tay người bán.',
          'Không mua trên trang web không rõ nguồn gốc hoặc giá quá rẻ so với thị trường — hàng giả và scam online có ở Nhật dù ít hơn nhiều nơi khác.',
        ],
        tip: 'Đặt hàng Amazon với địa chỉ Amazon Locker (コンビニ受取) nếu thường xuyên vắng nhà — nhiều combini có điểm nhận Amazon và tự đến lấy trong 3 ngày.',
      },
    ],
  };

export default smartShopping;
