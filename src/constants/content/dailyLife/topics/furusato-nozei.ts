import type { DailyLifeTopic } from '../../../../types/content';

const furusatoNozei: DailyLifeTopic = {
    id: 'furusato-nozei',
    title: 'ふるさと納税 — đóng thuế và nhận quà',
    titleJp: 'ふるさと納税のやり方と注意点',
    icon: 'gift-outline',
    color: '#E67E22',
    description: 'Người đi làm tại Nhật có thể quyên góp cho địa phương khác và nhận quà đặc sản — đồng thời được khấu trừ thuế địa phương tương đương. Người nước ngoài cư trú hợp pháp cũng dùng được.',
    sections: [
      {
        title: 'ふるさと納税 là gì và ai được dùng',
        content:
          'ふるさと納税 (Furusato Nozei — Thuế cố hương) cho phép bạn quyên góp cho địa phương bất kỳ ở Nhật, nhận quà đặc sản và được khấu trừ vào 住民税 (thuế địa phương) và 所得税 (thuế thu nhập) năm sau.',
        items: [
          'Người nước ngoài cư trú hợp pháp, có thu nhập và nộp thuế địa phương ở Nhật đều có thể tham gia — không phân biệt quốc tịch.',
          'Điều kiện thực tế: có địa chỉ cư trú chính thức ở Nhật và thu nhập đủ để có 住民税 sau khi trừ 2.000 yên phí tự chịu bắt buộc.',
          'Cơ chế: quyên 10.000 yên cho tỉnh A → nhận quà đặc sản trị giá ~3.000 yên → được giảm 住民税 năm sau ~8.000 yên → thực ra chỉ tốn 2.000 yên để nhận quà đó.',
          'Phí tự chịu luôn là 2.000 yên tổng — dù bạn quyên bao nhiêu tỉnh. Phần vượt hạn mức không được khấu trừ.',
          'Quà rất đa dạng: gạo, thịt bò Wagyu, hải sản, trái cây, mỹ phẩm, vé du lịch — tùy địa phương.',
        ],
        tip: 'Tra hạn mức của bạn tại satofull.jp hoặc furusato-tax.jp — nhập thu nhập và hoàn cảnh gia đình để biết có thể quyên tối đa bao nhiêu trước khi bắt đầu.',
        image: require('../../../../../assets/content/daily-life/dl_furusato_s1.jpg'),
        imageCaption: 'ふるさと納税 返礼品 — quà đặc sản địa phương nhận được khi quyên góp, chỉ tốn 2.000 yên phí tự chịu',
      },
      {
        title: 'Cách làm — 2 phương pháp thủ tục',
        content:
          'Sau khi quyên, có 2 cách xử lý thủ tục thuế: ワンストップ特例 (đơn giản hơn) hoặc 確定申告 (khai thuế tổng hợp).',
        items: [
          'Cách 1 — ワンストップ特例制度: không cần khai thuế riêng, chỉ nộp đơn xin ワンストップ cho từng địa phương bạn quyên. Điều kiện: quyên tối đa 5 địa phương khác nhau và không phải tự làm 確定申告 (đa phần người làm công ăn lương).',
          'Cách 2 — 確定申告: khai khi làm tờ khai thuế cuối năm — phù hợp với người quyên hơn 5 tỉnh hoặc vốn đã phải khai thuế riêng (tự kinh doanh, có thu nhập phụ).',
          'Các nền tảng phổ biến: さとふる (satofull.jp), ふるなび (furunavi.jp), 楽天ふるさと納税 — Rakuten có tích điểm Rakuten khi quyên.',
          'Deadline quan trọng: quyên trước 31/12 để tính vào năm thuế đó. Nộp đơn ワンストップ trước 10/1 năm sau.',
          'Nếu làm ワンストップ: địa phương gửi đơn qua bưu điện → điền, kèm bản sao giấy tờ tùy thân và gửi lại. Một số nền tảng cho phép làm online qua My Number Card.',
        ],
        tip: 'Dùng Rakuten ふるさと納税 nếu bạn đã có tài khoản Rakuten — tích điểm Rakuten thêm từ việc quyên, đặc biệt hiệu quả trong các đợt sale 0 và 5 của Rakuten.',
        image: require('../../../../../assets/content/daily-life/dl_furusato_s2.jpg'),
        imageCaption: 'さとふる / ふるなび — các nền tảng ふるさと納税 phổ biến để tra quà và hoàn tất thủ tục',
      },
      {
        title: 'Những điều cần cẩn thận',
        content:
          'ふるさと納税 có lợi nhưng cần hiểu đúng để không bị thiệt.',
        items: [
          'Hạn mức phụ thuộc thu nhập: thu nhập thấp → hạn mức thấp → nếu quyên nhiều hơn hạn mức thì phần vượt không được khấu trừ, mất tiền thật.',
          'Năm đầu đi làm ở Nhật: thu nhập chưa đủ 1 năm → hạn mức thấp hơn dự kiến — tính kỹ trước khi quyên.',
          'Phần quà chỉ chiếm ~30% giá trị quyên (quy định hiện hành): đây là khấu trừ thuế tiện được nhận quà, không phải mua hàng giảm giá 100%.',
          'Chuyển nơi cư trú trong năm: 住民税 bị tính theo tỷ lệ — hạn mức sẽ phức tạp hơn, nên tính lại trước khi quyên.',
          'Quà có thể giao chậm 1–3 tháng và không hoàn được — chọn mặt hàng và địa phương rõ ràng trước khi xác nhận.',
        ],
        tip: 'Người mới sang Nhật nên đợi đến khi có 1 năm làm việc đầy đủ mới thử — khi đó thu nhập ổn định, hạn mức dễ tính và không lo bị thiệt do thu nhập bất thường.',
      },
    ],
  };

export default furusatoNozei;
