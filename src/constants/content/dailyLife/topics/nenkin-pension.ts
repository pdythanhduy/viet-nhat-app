import type { DailyLifeTopic } from '../../../../types/content';

const nenkinPension: DailyLifeTopic = {
    id: 'nenkin-pension',
    title: 'Nenkin — lương hưu và hoàn tiền khi về nước',
    titleJp: '年金・脱退一時金',
    icon: 'cash',
    color: '#8E44AD',
    description: 'Hiểu 2 loại nenkin, mức đóng thực tế, miễn giảm khi thu nhập thấp và quan trọng nhất — cách xin hoàn tiền khi rời Nhật.',
    sections: [
      {
        title: 'Hai loại Nenkin và ai đóng cái nào',
        content:
          'Nenkin (年金) là hệ thống lương hưu bắt buộc ở Nhật. Người nước ngoài cũng phải tham gia nếu đủ điều kiện.',
        items: [
          '厚生年金 (Kousei Nenkin): dành cho người làm việc đủ điều kiện tại công ty tham gia hệ thống 社会保険. Phí trừ thẳng từ lương — công ty trả khoảng 50%, bạn trả 50%. Mức đóng khoảng 9,15% lương (2025) — kiểm tra Japan Pension Service cho năm hiện tại.',
          '国民年金 (Kokumin Nenkin): dành cho người không ở diện công ty — du học sinh, người làm part-time, người tự kinh doanh. Phí cố định hàng tháng, khoảng 17.510 yên/tháng (FY2025, từ tháng 4/2025) — xác nhận mức FY2026 hiện hành tại nenkin.go.jp.',
          'Trên phiếu lương: khoản “厚生年金保険料” là tiền nenkin bị trừ. Nếu bạn thấy khoản này, bạn đang ở diện 厚生年金.',
          'Nghĩa vụ bắt đầu từ 20 tuổi với người cư trú hợp pháp ở Nhật — kể cả người nước ngoài.',
        ],
        tip: 'Ngay cả khi bạn không định ở Nhật đến tuổi về hưu, vẫn nên đóng đầy đủ — vì bạn có thể xin hoàn tiền khi về nước.',
      },
      {
        title: 'Miễn giảm Kokumin Nenkin khi thu nhập thấp',
        content:
          'Nếu đang trong diện Kokumin Nenkin và thu nhập thấp, có thể xin miễn hoặc giảm phí — không phải ai cũng biết điều này.',
        items: [
          '免除申請 (menjo): xin miễn toàn bộ hoặc một phần phí Nenkin dựa trên thu nhập. Làm tại phường/quận hoặc qua Myna Portal.',
          '猶予制度 (yuuyo): dành riêng cho người từ 20–50 tuổi có thu nhập thấp — tạm hoãn đóng, không bị ghi nợ. Cũng làm tại phường.',
          'Được miễn/hoãn vẫn tính là đã tham gia hệ thống — không bị ảnh hưởng đến tư cách cư trú hoặc hồ sơ visa.',
          'Nếu sau này thu nhập tăng, có thể đóng bổ sung các tháng đã miễn (追納) trong vòng 10 năm.',
        ],
        tip: 'Du học sinh và người làm part-time thu nhập thấp rất hay bỏ qua quyền lợi này. Hỏi ngay tại phường khi đăng ký 国民年金.',
      },
      {
        title: '脱退一時金 — xin hoàn tiền Nenkin khi rời Nhật (quan trọng)',
        content:
          'Đây là quyền lợi đặc biệt dành cho người nước ngoài rời Nhật — được hoàn lại một phần tiền Nenkin đã đóng. Rất nhiều người không biết hoặc bỏ lỡ thời hạn.',
        items: [
          'Điều kiện: đã đóng Nenkin ít nhất 6 tháng, không có quốc tịch Nhật, đã xuất cảnh khỏi Nhật, chưa có quyền hưởng lương hưu Nhật.',
          'Thời hạn nộp đơn: trong vòng 2 năm kể từ ngày xuất cảnh — sau thời hạn này mất quyền xin hoàn.',
          'Cách xin: gửi bưu điện hoặc qua người đại diện ở Nhật lên Japan Pension Service (日本年金機構) sau khi đã ra khỏi Nhật. Mẫu đơn 脱退一時金請求書 tải tại nenkin.go.jp.',
          'Số tiền hoàn: tính theo số tháng đóng và mức lương bình quân — không phải toàn bộ. Tối đa 60 tháng 厚生年金 (kiểm tra quy định hiện hành tại nenkin.go.jp).',
          'Lưu ý hiệp định song phương Việt–Nhật (ký 2021): nếu bạn có thể tính thời gian đóng BHXH Việt Nam vào hồ sơ Nhật, xem thêm tại nenkin.go.jp hoặc hỏi lãnh sự quán.',
        ],
        tip: 'Trước khi về nước: chụp ảnh 基礎年金番号通知書 (giấy thông báo số nenkin). Từ tháng 4/2022, 年金手帳 đã bị bãi bỏ — số này là định danh duy nhất để nộp hồ sơ từ Việt Nam.',
        image: require('../../../../../assets/content/daily-life/dl_nenkin_s3.jpg'),
        imageCaption: '脱退一時金申請書 — mẫu xin hoàn tiền nenkin khi rời Nhật, nộp cho Japan Pension Service',
      },
      {
        title: 'Điền form 脱退一時金請求書 — từng trường và phần ngân hàng nước ngoài',
        content:
          'Form này gồm 2 phần: thông tin cá nhân và thông tin ngân hàng nhận tiền. Phần ngân hàng nước ngoài là nơi nhiều người điền sai nhất.',
        items: [
          '【Thông tin cá nhân】 氏名: họ tên đầy đủ bằng chữ Latin như trong hộ chiếu. 生年月日: ngày sinh theo định dạng 年/月/日 (ví dụ: 1995年03月20日). 国籍: "ベトナム".',
          '【Thông tin cá nhân】 基礎年金番号: số 10 chữ số trên giấy thông báo nenkin — chia làm 2 phần "4 số — 6 số". Ví dụ: "1234 — 567890".',
          '【Thông tin cá nhân】 最後に日本に住所を有しなくなった年月日: ngày bạn rời Nhật lần cuối (ngày xuất cảnh trên hộ chiếu).',
          '【Ngân hàng nước ngoài】 SWIFT/BICコード: mã định danh ngân hàng quốc tế. Một số ngân hàng Việt Nam: Vietcombank → BFTVVNVX, BIDV → BIDVVNVX, Vietinbank → ICBKVNVX, Agribank → VBAAVNVX, Techcombank → VTCBVNVX.',
          '【Ngân hàng nước ngoài】 口座名義 (tên chủ tài khoản): viết đúng y chang tên trong hồ sơ ngân hàng Việt Nam — thường là họ tên IN HOA không dấu theo thứ tự tên-họ. Ví dụ: "VAN A NGUYEN" hoặc "NGUYEN VAN A" tùy ngân hàng. Sai tên là tiền bị trả về.',
          '【Ngân hàng nước ngoài】 口座番号: số tài khoản ngân hàng Việt Nam (không phải số thẻ). Tìm trong app ngân hàng phần "thông tin tài khoản".',
        ],
        tip: 'Chuẩn bị trước khi điền: ảnh chụp 基礎年金番号通知書, hộ chiếu (trang có ảnh + trang stamp xuất cảnh), và screenshot thông tin tài khoản ngân hàng Việt Nam. Gửi kèm bản photo hộ chiếu 2 trang trên khi nộp đơn.',
      },
      {
        title: 'Giấy tờ cần giữ liên quan Nenkin',
        content:
          'Giấy tờ Nenkin là thứ dễ thất lạc nhất khi chuyển nhà hoặc rời Nhật — nhưng lại rất khó phục hồi.',
        items: [
          'Giữ bản chụp hoặc scan: tất cả phiếu lương (bảng lương) hàng tháng, thông báo từ Japan Pension Service, phiếu đóng tiền 国民年金.',
          'Số 基礎年金番号 (Kiso Nenkin Bangou): đây là mã định danh Nenkin cá nhân — giống số BHXH ở Việt Nam. Lưu lại cẩn thận.',
          'Nếu đổi việc: công ty mới thường hỏi số này để tiếp nối hồ sơ Nenkin. Không cung cấp được sẽ cần xử lý thêm.',
          'Khi chuyển từ 厚生年金 sang 国民年金 (nghỉ việc) hoặc ngược lại: làm thủ tục chuyển đổi tại phường trong vòng 14 ngày.',
        ],
        tip: 'Tạo một thư mục riêng trên điện thoại hoặc email để lưu ảnh tất cả giấy tờ liên quan Nenkin — bạn sẽ cần chúng sau nhiều năm.',
      },
    ],
  };

export default nenkinPension;
