import type { DailyLifeTopic } from '../../../../types/content';

const commonMisunderstandings: DailyLifeTopic = {
    id: 'common-misunderstandings',
    title: 'Những hiểu nhầm phổ biến',
    titleJp: 'よくある思い違い',
    icon: 'help-circle',
    color: '#AF601A',
    description: 'Những nhầm lẫn thực tế hay gặp nhất về giấy tờ, thuế, bảo hiểm và thủ tục hành chính ở Nhật.',
    sections: [
      {
        title: 'My Number ≠ My Number Card — hai thứ hoàn toàn khác nhau',
        content:
          'Khi nghe “cần My Number”, nhiều người vội đi làm thẻ vật lý. Thực ra phần lớn thủ tục chỉ cần số 12 chữ số, không cần thẻ nhựa.',
        items: [
          'Chỉ cần số (12 chữ số): khai báo thuế 確定申告, đăng ký bảo hiểm xã hội tại nơi làm, điền form ngân hàng có ô “マイナンバー”.',
          'Cần thẻ vật lý (My Number Card): in giấy tờ hành chính ở máy combini (コンビニ交付), dùng làm マイナ保険証 thay thẻ bảo hiểm giấy, đăng nhập Mynaportal.',
          'Số My Number đã tồn tại từ lúc bạn đăng ký 住民票 — xem trong thư 役所 gửi về nhà (phong bì có dán tem màu). Không có thẻ ≠ không có số.',
          'Làm thẻ My Number Card phải đặt riêng, chờ thư mời khoảng 1 tháng, rồi đến 役所 nhận tận tay — không cấp ngay trong ngày.',
        ],
        tip: 'Mỗi lần có thủ tục hỏi My Number, hỏi ngay: “số hay thẻ?” — câu đó tránh được nhiều chuyến đi thừa.',
      },
      {
        title: '転居届 không bảo vệ được thư ghi “転送不要”',
        content:
          'Nộp 転居届 ở bưu điện để chuyển tiếp thư là đúng nhưng chưa đủ — nhiều loại thư quan trọng nhất lại chính xác là loại sẽ không đến nhà mới.',
        items: [
          '”転送不要” in trên mặt thư: bưu điện sẽ trả thư về nơi gửi thay vì chuyển đến địa chỉ mới, bất kể bạn đã nộp 転居届 hay chưa.',
          'Những thứ thường ghi 転送不要: thẻ ngân hàng mới/tái cấp, thư thông báo của 役所, thư từ cơ quan thuế, giấy tờ bảo hiểm nhân thọ, bảng sao kê chứng khoán.',
          'Dịch vụ chuyển tiếp thông thường có thời hạn 1 năm — hết thời hạn, thư về địa chỉ cũ sẽ mất hẳn, không báo lại bạn.',
          'Sau khi chuyển nhà, cần cập nhật địa chỉ trực tiếp với: ngân hàng, 役所 (住所変更), nhà mạng, bảo hiểm, và trường/công ty.',
        ],
        tip: 'Ưu tiên cập nhật địa chỉ ngân hàng trong tuần đầu sau khi chuyển nhà — thẻ ngân hàng ghi 転送不要 và nếu mất thư, việc xin lại thẻ mới rất mất công.',
      },
      {
        title: 'Có bảo hiểm y tế không có nghĩa bạn chỉ trả 30%',
        content:
          'Bảo hiểm y tế Nhật bảo trợ 70% phần trong phạm vi — nhưng rất nhiều dịch vụ phổ biến lại nằm ngoài phạm vi bảo hiểm, bạn trả 100%.',
        items: [
          '保険適用 (có bảo hiểm): khám bệnh thông thường, chẩn đoán hình ảnh, thuốc theo đơn, phẫu thuật cần thiết — bạn trả 30%, bảo hiểm trả 70%.',
          '自由診療 (ngoài bảo hiểm, tự trả 100%): nha khoa thẩm mỹ (tẩy trắng, niềng thẩm mỹ), vaccine tự nguyện (cúm, HPV dành cho người lớn), khám sức khỏe định kỳ theo yêu cầu công ty, phẫu thuật mắt LASIK.',
          'Phòng riêng tại bệnh viện (差額ベッド代): phần chênh lệch giá phòng riêng so với phòng thường không thuộc bảo hiểm — có thể tốn thêm 5,000–20,000 yên/ngày.',
          'Chi phí đặt kính, kính áp tròng, thiết bị trợ thính: không bảo hiểm trừ một số trường hợp y tế đặc biệt có chỉ định bác sĩ.',
        ],
        tip: 'Trước mỗi lần khám, đặc biệt ở nha khoa, hỏi thẳng: “これは保険適用ですか？” — câu này tránh được nhiều bất ngờ khi thanh toán.',
      },
      {
        title: '年末調整 của công ty ≠ bạn không cần khai thuế gì thêm',
        content:
          'Công ty làm 年末調整 giúp bạn cuối năm là đúng, nhưng nó chỉ tính tiền lương từ đúng công ty đó. Nhiều trường hợp bạn vẫn phải tự nộp 確定申告 thêm.',
        items: [
          'Bắt buộc tự nộp 確定申告 nếu: có thu nhập từ 2 nơi trở lên (gồm part-time thứ hai), có thu nhập phụ (freelance, bán hàng, bán lại hàng online) trên 200,000 yên/năm, hoặc nghỉ việc giữa năm mà không vào chỗ mới.',
          'Nên tự nộp để được hoàn thuế nếu: chi phí y tế trong năm trên 100,000 yên (医療費控除), mới mua nhà lần đầu năm đó (住宅ローン控除 năm đầu bắt buộc tự nộp), hoặc đóng ふるさと納税 nhiều tỉnh mà không dùng ワンストップ特例.',
          '年末調整 công ty không tính: thu nhập ngoài công ty, khoản khấu trừ y tế, khoản khấu trừ vay nhà năm đầu.',
          'Hạn nộp 確定申告: 15/2–15/3 cho thu nhập năm trước. Nếu bạn được hoàn tiền (還付申告), nộp muộn cũng không bị phạt — nhưng nếu còn thiếu thuế, sẽ phát sinh lãi chậm nộp.',
        ],
        tip: 'Nếu bạn chỉ làm một việc toàn thời gian và không có thu nhập phụ nào cả năm, 年末調整 công ty là đủ. Ngay khi bắt đầu có thêm nguồn thu ngoài lương chính, hãy tìm hiểu về 確定申告 ngay.',
      },
      {
        title: 'Nhiều thứ ở Nhật không xử lý trong ngày — và thời gian chờ khác nhau nhiều',
        content:
          'Nhật nổi tiếng hiệu quả, nhưng nhiều thủ tục hành chính và dịch vụ thiết yếu có thời gian xử lý cố định mà không thể rút ngắn dù bạn giải thích gấp.',
        items: [
          'My Number Card: đăng ký xong nhận thư mời (~1 tháng), đến 役所 nhận thẻ (thêm vài ngày làm việc). Không thể nhận ngay trong ngày đăng ký.',
          'Internet cố định (光回線): từ lúc đăng ký đến khi kỹ thuật viên đến kéo dây thường mất 2–4 tuần, một số vùng ngoại ô lên tới 6 tuần.',
          'Tài khoản ngân hàng truyền thống (Mizuho, SMBC, Mitsubishi UFJ): xét duyệt 1–3 tuần; nếu thời gian ở Nhật dưới 6 tháng, một số chi nhánh từ chối không giải thích.',
          'Giấy xác nhận cư trú (住民票), con dấu (印鑑登録証明書) tại 役所 đông: thường xong trong ngày nếu đến trực tiếp — nhưng tháng 3–4 (mùa chuyển nhà) chờ lâu hơn đáng kể.',
        ],
        tip: 'Thời điểm lý tưởng nhất để làm My Number Card và mở tài khoản ngân hàng là ngay tuần đầu khi bạn đã có địa chỉ ổn định — không phải khi bạn cần chúng gấp.',
      },
    ],
  };

export default commonMisunderstandings;
