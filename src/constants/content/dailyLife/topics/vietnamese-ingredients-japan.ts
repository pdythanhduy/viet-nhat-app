import type { DailyLifeTopic } from '../../../../types/content';

const vietnameseIngredientsJapan: DailyLifeTopic = {
    id: 'vietnamese-ingredients-japan',
    title: 'Tìm nguyên liệu Việt và nấu ăn ở Nhật',
    titleJp: 'ベトナム食材の探し方・日本での料理',
    icon: 'restaurant',
    color: '#C0392B',
    description: 'Mua nước mắm, rau Việt, bún phở ở đâu — theo từng vùng, theo chuỗi siêu thị và theo app.',
    sections: [
      {
        title: 'Siêu thị và chuỗi cửa hàng có nguyên liệu châu Á',
        content:
          'Không cần lên phố người Việt mới mua được gia vị quen — một số chuỗi lớn toàn quốc đã có hàng châu Á.',
        items: [
          'Kaldi Coffee Farm (カルディコーヒーファーム): chuỗi toàn quốc trong các trung tâm thương mại — có nước mắm (ナンプラー), tương ớt, cà ri, mì gạo, nước cốt dừa, sốt oyster và nhiều gia vị Đông Nam Á.',
          'Gyomu Super (業務スーパー): hay có gia vị châu Á theo lô lớn — sốt oyster, đường thốt nốt, nước cốt dừa đóng hộp, mì gạo khô. Hàng tùy chi nhánh.',
          'Don Quijote: khu đồ ăn nhập khẩu thường có sản phẩm Thái, Việt, Hàn — nước mắm, ớt tươi, rau gia vị đóng gói.',
          'AEON và MaxValu: khu 輸入食品 (đồ nhập khẩu) ở các chi nhánh lớn thường có mì gạo, nước cốt dừa, tương ớt.',
          'Siêu thị châu Á chuyên biệt: ở hầu hết tỉnh đều có ít nhất 1 cửa hàng chuyên đồ châu Á — tìm bằng Google Maps với từ khóa "アジア食材 近く" hoặc "ベトナム食材".',
        ],
        tip: 'Kaldi là lựa chọn dễ nhất toàn quốc. Nếu không tìm thấy chi nhánh gần, website Kaldi (kaldi.co.jp) có ship toàn quốc.',
        image: require('../../../../../assets/content/daily-life/dl_vietnamese-ingredients_s1.jpg'),
        imageCaption: 'カルディコーヒーファーム — chuỗi toàn quốc có gia vị châu Á, nước mắm, mì gạo và nguyên liệu Đông Nam Á',
      },
      {
        title: 'Khu phố và chợ châu Á theo vùng',
        content:
          'Các đô thị lớn đều có khu tập trung siêu thị và nhà hàng châu Á — nơi tìm được nguyên liệu đặc trưng nhất.',
        items: [
          'Tokyo — Shin-Okubo (新大久保, Shinjuku): phố Hàn Quốc nhưng có rất nhiều cửa hàng Việt, siêu thị châu Á, bán đủ từ rau muống, húng quế đến lá lốt tươi.',
          'Tokyo — Ikebukuro (池袋): khu phía tây ga có nhiều siêu thị châu Á, nhà hàng Việt và hàng nhập từ Việt Nam.',
          'Osaka — Tsuruhashi (鶴橋): khu người Hàn và châu Á lớn nhất Kansai — có siêu thị bán nguyên liệu Việt, Thái, Hàn.',
          'Nagoya — khu vực Osu (大須): có một số cửa hàng châu Á và cộng đồng người Việt đông.',
          'Hiroshima, Fukuoka, Hamamatsu: các tỉnh có cộng đồng người Việt lớn thường có chợ hoặc nhóm Facebook mua bán hàng Việt.',
        ],
        tip: 'Nhóm Facebook cộng đồng người Việt theo từng tỉnh là nguồn thông tin tốt nhất để biết mua gì ở đâu gần chỗ bạn ở.',
      },
      {
        title: 'Thay thế nguyên liệu khi không tìm được',
        content:
          'Một số nguyên liệu khó tìm hoặc đắt ở Nhật — nhưng có cách thay thế hợp lý.',
        items: [
          'Nước mắm: ナンプラー (nước mắm Thái) bán ở hầu hết siêu thị Nhật — vị gần giống, dùng được cho hầu hết món Việt.',
          'Rau muống (空心菜 / kūshinSai): hay có ở siêu thị châu Á và một số AEON lớn — mùa hè dễ tìm hơn.',
          'Húng quế tươi: siêu thị Nhật có basil tươi (バジル) nhưng là húng Ý, không phải húng quế Việt. Húng quế Việt tươi chủ yếu ở siêu thị châu Á.',
          'Bún gạo: ビーフン (miến/bún Trung Quốc) khác bún Việt nhưng dùng được cho nhiều món. Bún phở chính thống hay có ở Kaldi hoặc siêu thị châu Á.',
          'Lá dứa / lá chuối: hiếm ở siêu thị thường, phải tìm ở chợ châu Á hoặc mua đông lạnh online.',
          'Gạo Việt Nam: hầu hết gạo Nhật nấu cơm Việt được. Nếu muốn gạo hạt dài (tẻ), tìm ở siêu thị châu Á với tên タイ米 (gạo Thái) hoặc インディカ米.',
        ],
        tip: 'Amazon Nhật và Mercari có nhiều người bán gia vị Việt nhập khẩu — tìm bằng tiếng Việt hoặc tiếng Nhật như "ベトナム調味料" hoặc tên cụ thể.',
      },
      {
        title: 'Nấu ăn trên bếp và thiết bị Nhật',
        content:
          'Phần lớn căn hộ Nhật dùng bếp gas hoặc bếp IH (từ) — có vài điểm khác với bếp ở Việt Nam.',
        items: [
          'Bếp IH (IHクッキングヒーター): không dùng được với nồi đáy nhôm mỏng hoặc nồi đồng — cần nồi có ký hiệu IH ở đáy. Nồi inox đáy dày và nồi gang thường dùng được.',
          'Bếp gas căn hộ Nhật: thường chỉ có 2 bếp và tích hợp lò nướng cá nhỏ (グリル) bên dưới — không phải lò nướng bánh.',
          'Lò vi sóng (電子レンジ): nhiều căn hộ có combo lò vi sóng + lò nướng (オーブンレンジ) — có thể dùng nướng bánh hoặc hâm nóng.',
          'Nồi cơm điện (炊飯器): rất phổ biến ở Nhật, mua đồ cũ ở Hard Off giá 1.000–3.000 yên là OK cho người ở một mình.',
          'Hút mùi và thông gió: khi chiên xào nhiều, bật quạt thông gió (換気扇) mạnh để tránh khói kích hoạt đầu báo cháy — căn hộ Nhật hay gặp vấn đề này.',
        ],
        tip: 'Đầu báo khói trong căn hộ Nhật rất nhạy — nếu hay bị kêu khi nấu ăn, kiểm tra xem có thể tạm thời che lại hoặc mở cửa sổ trước khi chiên.',
      },
    ],
  };

export default vietnameseIngredientsJapan;
