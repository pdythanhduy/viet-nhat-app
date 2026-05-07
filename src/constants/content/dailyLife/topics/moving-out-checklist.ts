import type { DailyLifeTopic } from '../../../../types/content';

const movingOutChecklist: DailyLifeTopic = {
    id: 'moving-out-checklist',
    title: 'Trả nhà đúng cách (退去手続き)',
    titleJp: '退去手続き・原状回復・敷金返還',
    icon: 'home-outline',
    color: '#6C3483',
    description: 'Trả nhà sai thứ tự hoặc không hiểu nguyên tắc 原状回復 có thể mất tiền cọc oan hoặc bị đòi thêm tiền sửa chữa. Guide này giải thích rõ từng bước và quyền lợi của bạn.',
    sections: [
      {
        title: 'Thông báo trả nhà đúng hạn',
        content:
          'Hầu hết hợp đồng thuê nhà ở Nhật yêu cầu báo trước 1 tháng trước ngày trả nhà. Một số hợp đồng yêu cầu 2 tháng. Báo trễ hoặc không báo có thể bị tính thêm tiền thuê.',
        items: [
          'Đọc hợp đồng thuê nhà (賃貸借契約書) để xác nhận thời hạn báo trước (解約予告期間).',
          'Gửi thông báo bằng văn bản (fax, thư hoặc email) — không chỉ gọi điện. Giữ lại bản sao.',
          'Xác nhận ngày trả nhà chính thức với chủ nhà hoặc công ty quản lý (管理会社).',
          'Không ngừng trả tiền nhà trước ngày trả nhà chính thức, kể cả khi đã dọn đồ đi rồi.',
        ],
        tip: 'Nếu ký hợp đồng qua môi giới, liên hệ môi giới để nhận hướng dẫn thủ tục — nhiều chỗ có form thông báo tiêu chuẩn.',
      },
      {
        title: 'Hiểu nguyên tắc 原状回復 trước khi bàn giao',
        content:
          '原状回復 không có nghĩa bạn phải trả nhà y như mới. Hướng dẫn của 国土交通省 phân rõ: hao mòn tự nhiên (経年変化) là trách nhiệm chủ nhà; hư hại do lỗi người thuê mới phải bồi thường.',
        items: [
          'Chủ nhà chịu: phai màu tường do ánh sáng, hao mòn sàn do đi lại bình thường, ố vàng nhẹ theo thời gian.',
          'Người thuê chịu: đóng đinh nhiều lỗ lớn vào tường, vết bẩn không lau kịp thời, bỏng thuốc lá, vỡ kính do bất cẩn.',
          'Nếu chủ nhà yêu cầu trả chi phí mà bạn cho là hao mòn tự nhiên, có thể khiếu nại dựa vào Hướng dẫn 国土交通省.',
          'Chụp ảnh toàn bộ nhà trước khi bàn giao — từng góc, từng vết bẩn, từng bộ phận.',
        ],
        tip: 'Khi ký hợp đồng lúc vào nhà có biên bản hiện trạng không? Nếu có, so sánh với tình trạng hiện tại để biết điều gì đã thay đổi trong thời gian thuê.',
        image: require('../../../../../assets/content/daily-life/dl_moving-out_s2.jpg'),
        imageCaption: '原状回復チェック — phân biệt hao mòn tự nhiên (chủ nhà chịu) và hư hại do lỗi người thuê',
      },
      {
        title: 'Buổi kiểm tra bàn giao (立会い) và nhận lại tiền cọc',
        content:
          'Đa phần hợp đồng có 立会い — kiểm tra nhà cùng đại diện chủ nhà hoặc quản lý ngay trước khi nộp chìa khóa.',
        items: [
          'Mời người quen đi cùng nếu có thể — tránh bị ép ký những khoản không đồng ý.',
          'Không ký xác nhận thiệt hại nếu không đồng ý — ghi "確認中" (đang xem xét) hoặc xin thêm thời gian.',
          '敷金 (tiền cọc) phải được hoàn trả trong thời hạn hợp lý (thường 1 tháng sau khi trả nhà) sau khi trừ chi phí sửa chữa hợp lệ.',
          'Nếu tranh chấp về 敷金: liên hệ 消費生活センター của phường hoặc 国民生活センター để được tư vấn miễn phí.',
        ],
        tip: 'Lỗ đinh nhỏ dùng để treo tranh thường không bị tính phí theo hướng dẫn 国土交通省 — đây là điều nhiều người không biết và bị tính oan.',
      },
      {
        title: 'Thay đổi địa chỉ và hủy dịch vụ sau khi trả nhà',
        content:
          'Trả nhà mà quên đổi địa chỉ hành chính hoặc hủy dịch vụ là lỗi rất phổ biến và gây rắc rối kéo dài.',
        items: [
          'Đến phường cũ làm 転出届 (khai báo chuyển đi) — có thể làm trước ngày chuyển tối đa 14 ngày.',
          'Đến phường mới làm 転入届 trong vòng 14 ngày sau khi chuyển đến.',
          'Đăng ký chuyển tiếp thư tại bưu điện (郵便局) — có hiệu lực 1 năm, làm online tại kuronekoyamato.co.jp hoặc trực tiếp tại bưu điện.',
          'Hủy hoặc chuyển địa chỉ: điện, nước, gas, internet, bảo hiểm, ngân hàng, nơi làm việc.',
          'Hoàn trả chìa khóa theo đúng số lượng ghi trong hợp đồng — thiếu chìa khóa sẽ bị tính phí làm lại.',
        ],
        tip: 'Lập danh sách tất cả dịch vụ đang dùng ngay từ khi quyết định chuyển nhà — tránh quên hủy dịch vụ và tiếp tục bị tính phí sau khi đã ra đi.',
      },
    ],
  };

export default movingOutChecklist;
