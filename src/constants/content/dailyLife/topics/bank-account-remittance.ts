import type { DailyLifeTopic } from '../../../../types/content';

const bankAccountRemittance: DailyLifeTopic = {
    id: 'bank-account-remittance',
    title: 'Ngân hàng và chuyển tiền',
    titleJp: '銀行口座・送金',
    icon: 'card',
    color: '#185FA5',
    description: 'Mở tài khoản, chuẩn bị giấy tờ, hiểu kiểm tra danh tính và tránh lỗi dễ bị từ chối.',
    sections: [
      {
        title: 'Trước khi ra ngân hàng',
        content:
          'Mỗi ngân hàng có tiêu chí riêng, nhưng người mới sang thường bị hỏi khá giống nhau ở phần danh tính, địa chỉ và mục đích sử dụng.',
        items: [
          'Chuẩn bị thẻ cư trú, địa chỉ đang ở thực tế, số điện thoại có thể nhận liên lạc và thông tin công việc hoặc trường học nếu có.',
          'Nhiều nơi sẽ hỏi bạn mở tài khoản để làm gì: nhận lương, trả hóa đơn, sinh hoạt hằng ngày hay nhận học bổng.',
          'Nếu vừa mới sang Nhật và cư trú chưa lâu, có nơi sẽ yêu cầu thêm thời gian cư trú ổn định hoặc giấy tờ bổ sung. Đây không phải lúc nào cũng là từ chối vĩnh viễn.',
        ],
        tip: 'Đừng chỉ hỏi “mở được không”. Hãy hỏi thẳng còn thiếu giấy gì, cần quay lại lúc nào và hồ sơ nào dễ được nhận hơn.',
      },
      {
        title: 'Những thứ dễ làm hồ sơ bị chậm',
        content:
          'Ngân hàng Nhật phải kiểm tra本人確認 và các rủi ro tài chính nên hồ sơ thiếu nhất quán rất dễ bị hỏi lại.',
        items: [
          'Tên romaji trên giấy tờ không thống nhất giữa thẻ cư trú, trường, công ty và hợp đồng điện thoại.',
          'Địa chỉ đang ở khác với địa chỉ đang khai báo hoặc chưa cập nhật xong tại municipal office.',
          'Không giải thích rõ mục đích dùng tài khoản, đặc biệt khi hỏi về giao dịch quốc tế hoặc nhận tiền từ nhiều nguồn.',
        ],
        tip: 'Nếu bị yêu cầu quay lại, ghi lại chính xác tên giấy tờ cần bổ sung thay vì chỉ nhớ mang máng.',
      },
      {
        title: 'Chuyển tiền về Việt Nam',
        content:
          'Đừng chỉ nhìn phí chuyển tiền. Cần nhìn thêm tỷ giá, phí ngân hàng trung gian và thông tin người nhận phải khai thật chính xác.',
        items: [
          'Kiểm tra tên người nhận, số tài khoản, tên ngân hàng nhận và lý do chuyển tiền trước khi xác nhận.',
          'Nếu chuyển đều đặn cho gia đình, nên giữ lịch sử giao dịch và giải thích mục đích thống nhất.',
          'Không nhận chuyển tiền hộ hoặc cho người khác mượn tài khoản để nhận tiền. Đây là nhóm rủi ro lớn nhất.',
        ],
        tip: 'Nếu tài khoản bị hỏi lại về nguồn tiền, hãy chuẩn bị sẵn bảng lương, hợp đồng hoặc lịch sử giao dịch liên quan.',
      },
    ],
  };

export default bankAccountRemittance;
