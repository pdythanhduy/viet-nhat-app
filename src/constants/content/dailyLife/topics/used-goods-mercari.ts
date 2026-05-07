import type { DailyLifeTopic } from '../../../../types/content';

const usedGoodsMercari: DailyLifeTopic = {
    id: 'used-goods-mercari',
    title: 'Mua và bán đồ cũ (メルカリ・リサイクル)',
    titleJp: 'フリマアプリ・リサイクルショップ活用術',
    icon: 'pricetag-outline',
    color: '#D35400',
    description: 'Nhật Bản có hệ sinh thái đồ cũ chất lượng cao và giá rẻ — từ app bán hàng đến chuỗi cửa hàng thu mua. Biết cách dùng đúng giúp tiết kiệm lớn khi mới sang và kiếm thêm thu nhập hợp pháp khi dọn đồ.',
    sections: [
      {
        title: 'メルカリ — mua và bán trực tuyến',
        content:
          'メルカリ là app bán hàng cũ lớn nhất Nhật Bản, hoạt động tốt ngay cả với người chưa giỏi tiếng Nhật.',
        items: [
          'Tạo tài khoản với số điện thoại Nhật — xác minh bằng SMS.',
          'Khi mua: kiểm tra ảnh kỹ, đọc phần "商品の状態" (tình trạng hàng) và chính sách ship của người bán.',
          'Khi bán: chụp ảnh rõ, ghi đúng tình trạng hàng, đặt giá bằng cách tìm hàng tương tự đã bán (mục "販売済み").',
          'Phí メルカリ: 10% trên giá bán — trừ trực tiếp từ tiền bán.',
          'Tiền bán hàng giữ trong ví メルカリ — rút vào tài khoản ngân hàng Nhật (phí 200 yên nếu rút dưới 10.000 yên).',
          'Giao hàng: dùng らくらくメルカリ便 (Yamato) hoặc ゆうゆうメルカリ便 (Japan Post) — giá rẻ hơn giao hàng thường và che địa chỉ cả hai bên.',
        ],
        tip: 'Người mua Nhật thường nhắn tin hỏi trước khi mua. Trả lời nhanh sẽ tăng uy tín. Dùng Google Translate hoặc DeepL để dịch tin nhắn nếu cần.',
        image: require('../../../../../assets/content/daily-life/dl_mercari_s1.jpg'),
        imageCaption: 'メルカリ — app flea market lớn nhất Nhật Bản, mua bán đồ cũ an toàn và tiện lợi',
      },
      {
        title: 'Cửa hàng thu mua — bán nhanh, nhận tiền ngay tại chỗ',
        content:
          'Nếu cần bán nhanh hoặc không muốn xử lý app, cửa hàng thu mua là lựa chọn tiện lợi.',
        items: [
          'ハードオフ: mua lại điện tử, nhạc cụ, thiết bị âm thanh, đồ gia dụng — trả giá tại chỗ.',
          'ブックオフ: sách, manga, truyện, CD, DVD, game — trả giá tại chỗ.',
          'セカンドストリート (2nd Street): quần áo, đồ gia dụng, đồ nội thất nhỏ.',
          'Lưu ý: giá thu mua ở cửa hàng luôn thấp hơn メルカリ đáng kể — đổi lại nhận tiền ngay, không cần chờ.',
        ],
        tip: 'Mang sạch và đầy đủ phụ kiện (dây, hộp, sách hướng dẫn) khi đến cửa hàng — hàng có hộp gốc thường được trả giá cao hơn đáng kể.',
      },
      {
        title: 'Phân biệt đồ nên bán vs. nên bỏ (粗大ゴミ)',
        content:
          'Không phải đồ cũ nào cũng bán được. Nhầm giữa bán và bỏ sẽ mất thời gian hoặc phát sinh chi phí.',
        items: [
          'Nên bán: điện tử còn hoạt động, quần áo brand-name tình trạng tốt, đồ gia dụng nhỏ, đồ chơi, sách.',
          'Nên bỏ 粗大ゴミ: đồ hỏng, đồ không ai muốn mua, nội thất cũ kỹ.',
          '粗大ゴミ phải đăng ký với phường và mua tem xử lý trước — không được vứt ra đường hay vào thùng rác thường.',
          'Không bỏ đồ điện tử lớn (tivi, tủ lạnh, máy giặt, điều hòa) vào rác thường — có quy định riêng theo 家電リサイクル法, phải trả phí xử lý.',
        ],
        tip: 'Nếu không chắc đồ có giá trị không, search trên メルカリ xem có người đang bán không và giá bao nhiêu — 30 giây là biết.',
      },
      {
        title: 'Lưu ý pháp lý khi bán đồ cũ',
        content:
          'Bán đồ cũ qua メルカリ hoặc cửa hàng là hoàn toàn hợp pháp và rất phổ biến ở Nhật.',
        items: [
          'Thu nhập từ bán đồ cá nhân đã dùng (生活用動産) thường được miễn thuế theo luật Nhật.',
          'Nếu mua đồ mới để bán lại kinh doanh hoặc thu nhập lớn: có thể cần 古物商許可 (giấy phép kinh doanh đồ cũ) và khai thuế riêng.',
          'Không bán hàng giả mạo nhãn hiệu (偽ブランド品) — vi phạm nghiêm trọng, bị xóa tài khoản và có thể bị khởi tố.',
          'Không bán đồ của người khác mà không được phép — kể cả đồ nhặt được hoặc nhận giữ hộ.',
        ],
        tip: 'Giữ lịch sử giao dịch trong app メルカリ nếu sau này có câu hỏi về thuế — dùng để xác minh đây là bán đồ cá nhân, không phải kinh doanh.',
      },
    ],
  };

export default usedGoodsMercari;
