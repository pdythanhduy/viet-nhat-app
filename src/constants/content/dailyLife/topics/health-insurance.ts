import type { DailyLifeTopic } from '../../../../types/content';

const healthInsurance: DailyLifeTopic = {
    id: 'health-insurance',
    title: 'Bảo hiểm y tế ở Nhật',
    titleJp: '健康保険・国民健康保険',
    icon: 'medkit',
    color: '#C0392B',
    description: 'Phân biệt 2 loại bảo hiểm y tế, cách đăng ký, mức đóng thực tế và xử lý khi mất việc hoặc đổi việc.',
    sections: [
      {
        title: 'Hai loại bảo hiểm y tế — phân biệt ngay từ đầu',
        content:
          'Mọi người cư trú hợp pháp ở Nhật đều phải tham gia bảo hiểm y tế. Có 2 hệ thống chính, khác nhau về cách đăng ký và mức đóng.',
        items: [
          '健康保険 — Shakai Hoken (bảo hiểm qua công ty): áp dụng khi bạn làm việc đủ điều kiện tại công ty tham gia hệ thống này. Phí được trừ thẳng từ lương — công ty trả khoảng 50%, bạn trả 50% còn lại. Mức đóng tính theo thu nhập.',
          '国民健康保険 — Kokumin Kenkou Hoken (NHK, bảo hiểm quốc dân): dành cho người không được bảo hiểm qua công ty — du học sinh, người làm part-time không đủ điều kiện, người tự kinh doanh, người giữa hai công ty. Đăng ký tại phường/quận.',
          'Phí NHK: tính theo thu nhập năm trước + số người trong hộ + địa phương — không cố định. Người mới sang năm đầu tiên thường có phí rất thấp hoặc gần như 0 vì chưa có thu nhập khai báo ở Nhật.',
          'Cả hai diện đều cho phép khám với mức tự trả khoảng 30% chi phí (người lớn). Phần còn lại do quỹ bảo hiểm chi trả.',
        ],
        tip: 'Không đăng ký NHK khi đủ điều kiện là vi phạm quy định — và phí sẽ được tính hồi tố từ ngày đăng ký cư trú, không phải từ ngày bạn đăng ký muộn.',
        image: require('../../../../../assets/content/daily-life/dl_health-insurance_s1.jpg'),
        imageCaption: '健康保険証 / 国民健康保険証 — hai loại thẻ bảo hiểm y tế chính tại Nhật',
      },
      {
        title: 'Đăng ký NHK — làm ở đâu và cần gì',
        content:
          'Nếu không có bảo hiểm qua công ty, đây là việc cần làm sớm ngay sau khi đăng ký địa chỉ cư trú.',
        items: [
          'Nơi đăng ký: văn phòng phường/quận (市区町村役場) — cùng nơi đăng ký địa chỉ cư trú.',
          'Giấy tờ cần mang: thẻ cư trú, My Number Card hoặc giấy thông báo My Number.',
          'Có thể làm cùng ngày với đăng ký địa chỉ — nên hỏi ngay tại quầy “国民健康保険の加入手続き” (thủ tục tham gia bảo hiểm quốc dân).',
          'Từ 02/12/2024, thẻ 保険証 giấy đã bị bãi bỏ. Kết quả sau đăng ký: nếu bạn có My Number Card đã liên kết bảo hiểm → dùng マイナ保険証; nếu chưa → bên bảo hiểm gửi 資格確認書 qua bưu điện để dùng khi đi khám.',
          'Nếu thu nhập thấp hoặc khó khăn tài chính, có thể xin giảm/miễn phí NHK (減額・免除申請) — hỏi trực tiếp tại phường.',
        ],
        tip: 'Nếu công ty mới của bạn có bảo hiểm qua công ty, bạn sẽ tự động chuyển sang 健康保険 — lúc đó cần mang thẻ NHK cũ ra phường để hủy đăng ký và tránh bị tính phí trùng.',
      },
      {
        title: 'Khi mất việc hoặc giữa hai công ty',
        content:
          'Đây là giai đoạn nhiều người bị hở bảo hiểm vì không biết mình cần làm gì.',
        items: [
          'Khi nghỉ công ty: bảo hiểm qua công ty kết thúc vào ngày cuối cùng làm việc (hoặc cuối tháng tùy quy định).',
          'Tùy chọn 1 — Đăng ký NHK: đến phường trong vòng 14 ngày sau khi mất bảo hiểm công ty. Phí tính theo thu nhập năm trước.',
          'Tùy chọn 2 — Tiếp tục 健康保険 cũ (任意継続): có thể giữ bảo hiểm công ty cũ tối đa 2 năm nhưng phải tự đóng cả 2 phần (công ty + cá nhân) — thường tốn hơn NHK trừ khi thu nhập cao.',
          'Không nên bỏ trống bảo hiểm dù chỉ vài ngày — nếu bị tai nạn hoặc bệnh trong thời gian đó sẽ phải trả 100%.',
        ],
        tip: 'So sánh phí NHK (phường tính được ngay khi bạn đến đăng ký) với phí 任意継続 (hỏi bộ phận HR công ty cũ) trước khi quyết định.',
      },
      {
        title: 'Thêm người thân vào bảo hiểm công ty (扶養)',
        content:
          'Nếu bạn có bảo hiểm qua công ty (社会保険), có thể thêm vợ/chồng hoặc con vào diện phụ thuộc miễn phí thêm phí.',
        items: [
          'Điều kiện: người thân đang sống cùng ở Nhật, thu nhập của họ dưới ngưỡng quy định (thường dưới 1,3 triệu yên/năm).',
          'Thủ tục: làm qua bộ phận HR của công ty — nộp giấy tờ chứng minh quan hệ gia đình và tình trạng thu nhập.',
          'Sau khi được duyệt, người thân nhận thẻ bảo hiểm y tế riêng và dùng như bình thường — không phát sinh thêm chi phí bảo hiểm hàng tháng.',
        ],
        tip: 'Nếu vợ/chồng hoặc con bạn vừa sang Nhật, hỏi HR ngay về thủ tục thêm vào 扶養 — làm sớm hơn luôn tiện hơn.',
      },
    ],
  };

export default healthInsurance;
