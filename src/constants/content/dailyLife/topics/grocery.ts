import type { DailyLifeTopic } from '../../../../types/content';

const grocery: DailyLifeTopic = {
    id: 'grocery',
    title: 'Mua thực phẩm và đồ dùng',
    titleJp: '食料品・日用品',
    icon: 'basket',
    color: '#F39C12',
    description: 'Chuỗi siêu thị rẻ nên biết, cách đọc nhãn thịt và hạn dùng, và mẹo mua cuối ngày.',
    sections: [
      {
        title: 'Siêu thị và chuỗi nên biết theo mục đích',
        content:
          'Mỗi chuỗi có điểm mạnh khác nhau. Biết chỗ phù hợp giúp tiết kiệm hơn là chạy theo khuyến mãi bừa.',
        items: [
          'Gyomu Super (業務スーパー): bán hàng số lượng lớn, giá rất rẻ, nhiều sản phẩm nhập khẩu châu Á — phù hợp người nấu ăn ở nhà thường xuyên.',
          'OK Store (オーケーストア): được biết đến là một trong những siêu thị thường nhật rẻ nhất — chủ yếu ở khu vực Kanto (Tokyo, Kanagawa, Saitama, Chiba).',
          'AEON / MaxValu: chuỗi lớn toàn quốc, hàng đa dạng, hay có sale cuối tuần và ngày lễ.',
          'Seiyu (西友): toàn quốc, nhiều chi nhánh mở 24h, giá ổn định — hiện thuộc sở hữu của KKR (từ 2021).',
          'Don Quijote (ドン・キホーテ): mở 24h, bán thực phẩm, hàng gia dụng, mỹ phẩm, điện tử — tiện khi cần mua ngoài giờ.',
          'Combini (7-Eleven, Lawson, FamilyMart): tiện nhưng giá cao hơn 20–40% so với siêu thị — chỉ nên ghé khi cần gấp.',
        ],
        tip: 'Nếu gần Gyomu Super, đây là ưu tiên số 1 cho gạo, dầu ăn, gia vị và đồ đông lạnh. Một số chi nhánh có gia vị Đông Nam Á và nguyên liệu nấu ăn châu Á.',
        image: require('../../../../../assets/content/daily-life/dl_grocery_s1.jpg'),
        imageCaption: 'Siêu thị Nhật — mỗi chuỗi có điểm mạnh khác nhau về giá và chủng loại hàng',
      },
      {
        title: 'Đọc nhãn thịt và kiêng ăn không cần biết nhiều tiếng Nhật',
        content:
          'Đọc nhầm nhãn thịt là lỗi rất phổ biến — nhất là người kiêng thịt heo hoặc thịt bò.',
        items: [
          '豚肉 (ぶたにく / butaniku): thịt heo.',
          '牛肉 (ぎゅうにく / gyuuniku): thịt bò.',
          '鶏肉 (とりにく / toriniku): thịt gà.',
          '羊肉 (ようにく / youniku): thịt cừu.',
          'ひき肉 (hikiniku): thịt xay — luôn kèm loại thịt phía trước, ví dụ 豚ひき肉 là thịt heo xay.',
          '合いびき肉 (あいびきにく): thịt xay hỗn hợp bò và heo trộn lẫn — hay nhầm nhất.',
        ],
        tip: 'Dùng Google Translate camera chụp bao bì là cách nhanh nhất khi không chắc. Cũng nên kiểm tra phần 原材料 (nguyên liệu) trong đồ chế biến sẵn nếu kiêng.',
        image: require('../../../../../assets/content/daily-life/dl_grocery_s2.jpg'),
        imageCaption: 'Nhãn thịt tươi tại siêu thị — ghi rõ loại thịt (豚肉/牛肉/鶏肉) và xuất xứ (国産/輸入)',
      },
      {
        title: 'Phân biệt 賞味期限 và 消費期限',
        content:
          'Hai dòng chữ này gần nhau nhưng nghĩa khác nhau — nhầm có thể ảnh hưởng đến sức khỏe.',
        items: [
          '賞味期限 (しょうみきげん): “ngon nhất trước ngày” — áp dụng cho đồ khô, hộp, đóng gói. Qua hạn một chút thường vẫn an toàn nhưng chất lượng giảm.',
          '消費期限 (しょうひきげん): “hạn sử dụng an toàn” — áp dụng cho đồ tươi, sashimi, bento, sữa tươi. Không nên dùng sau ngày này.',
          'Ngày ghi trên bao bì thường theo thứ tự: năm / tháng / ngày (例: 26.05.15 = 15 tháng 5 năm 2026).',
        ],
        tip: 'Nếu mua đồ làm sẵn (お惣菜) cuối ngày được giảm giá, kiểm tra 消費期限 — nhiều thứ hạn trong ngày hôm đó.',
        image: require('../../../../../assets/content/daily-life/dl_grocery_s3.jpg'),
        imageCaption: '賞味期限 = ngon nhất trước ngày; 消費期限 = hạn an toàn — không dùng sau ngày này',
      },
      {
        title: 'Mua cuối ngày để tiết kiệm đáng kể',
        content:
          'Nhiều siêu thị dán nhãn giảm giá (割引シール) vào đồ sắp hết hạn, thường từ 17–19h trở đi.',
        items: [
          'Nhãn vàng/đỏ 20–50% off thường xuất hiện trên sashimi, sushi, bento, thịt tươi và đồ làm sẵn.',
          'Cá và thịt tươi giảm giá mua về nấu ngay hoặc cho vào tủ đông ngay là an toàn và tiết kiệm.',
          'Bánh mì (パン) và đồ nướng thường được giảm khoảng 1–2 tiếng trước khi cửa hàng đóng cửa.',
          'Rau củ theo mùa thường rẻ hơn 30–50% so với trái mùa — tra từ khóa “旬の野菜” để biết mùa nào có gì.',
        ],
        tip: 'Không mua giảm giá vì giảm nếu không dùng kịp. Chỉ mua thêm khi có thể nấu ngay hoặc đông lạnh được.',
        image: require('../../../../../assets/content/daily-life/dl_grocery_s4.jpg'),
        imageCaption: 'Nhãn 半額 (giảm 50%) dán lên đồ sắp hết hạn — thường xuất hiện từ 17–19h tại siêu thị',
      },
    ],
  };

export default grocery;
