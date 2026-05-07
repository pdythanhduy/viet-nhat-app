import type { DailyLifeTopic } from '../../../../types/content';

const apartment: DailyLifeTopic = {
    id: 'apartment',
    title: 'Thuê nhà và nhận nhà',
    titleJp: '賃貸住宅・入居',
    icon: 'home',
    color: '#185FA5',
    description: 'Tiền đầu vào, giấy tờ cần có và việc phải làm ngay ngày đầu nhận nhà.',
    sections: [
      {
        title: 'Tiền đầu vào cần tính đủ',
        content:
          'Nhiều người chỉ nhìn tiền thuê tháng đầu rồi ký vội. Ở Nhật, khoản vào nhà thường nặng ở phí một lần.',
        items: [
          'Thường phải chuẩn bị khoảng 4-6 tháng tiền thuê cho đợt đầu: tiền nhà tháng đầu, tiền đặt cọc, lễ kim nếu có, phí môi giới, phí bảo lãnh, bảo hiểm và thay khóa.',
          'Nhà ghi “không lễ kim” không có nghĩa là rẻ toàn bộ. Vẫn phải cộng thêm phí bảo lãnh, phí vệ sinh và các khoản ghi trong hợp đồng.',
          'Trước khi ký, nên yêu cầu bên môi giới ghi rõ tổng số tiền vào nhà bằng con số cuối cùng, không hỏi từng khoản rời rạc.',
        ],
        tip: 'Đừng chọn nhà chỉ vì tiền thuê thấp. Hãy nhìn tổng số tiền vào nhà và điều kiện hủy hợp đồng.',
        image: require('../../../../../assets/content/daily-life/dl_apartment_s1.jpg'),
        imageCaption: 'Cửa hàng bất động sản (不動産) — xem niêm yết giá thuê, điều kiện đặt cọc và lễ kim trực tiếp trên cửa kính',
      },
      {
        title: 'Hồ sơ thường bị hỏi',
        content:
          'Bộ hồ sơ khác nhau theo từng công ty, nhưng có vài giấy tờ gần như lúc nào cũng cần.',
        items: [
          'Thẻ cư trú (在留カード) và hộ chiếu — bản gốc để xác nhận, bản photo để nộp kèm hồ sơ.',
          'Giấy xác nhận việc làm (在職証明書) hoặc giấy tờ chứng minh thu nhập (源泉徴収票 / phiếu lương 3 tháng gần nhất). Người mới sang dưới 1 năm thường cần thêm thư xác nhận từ công ty.',
          'Số điện thoại Nhật đang dùng — không thể để số Việt Nam vì bên cho thuê cần liên lạc ngay.',
          'Nếu không có người bảo lãnh cá nhân: dùng công ty bảo lãnh (保証会社) — phí thường 0.5–1 tháng tiền nhà, trả một lần khi ký.',
        ],
        tip: 'Nếu hồ sơ còn yếu (ví dụ mới sang, visa còn ngắn, thu nhập thấp), nói thật ngay từ đầu để môi giới lọc đúng nhóm nhà có khả năng đậu — thay vì nộp nhiều chỗ rồi bị từ chối cùng lúc.',
      },
      {
        title: 'Điền 入居申込書 — form đăng ký vào ở, từng ô quan trọng',
        content:
          'Đây là form môi giới đưa trước khi xét duyệt. Điền đầy đủ và chính xác ngay lần đầu tạo ấn tượng tốt — điền thiếu làm chậm quá trình.',
        items: [
          '氏名 + フリガナ: họ tên đầy đủ và cách đọc bằng KATAKANA. Ví dụ: 氏名 → "Nguyen Van A", フリガナ → "グエン バン ア". Lưu ý: phải viết katakana, không phải hiragana.',
          '在留資格 / 在留期間: sao chép chính xác từ thẻ cư trú. Ví dụ: 在留資格 → "技術・人文知識・国際業務", 在留期間 → "2027年03月15日まで".',
          '勤務先: tên công ty, địa chỉ, số điện thoại công ty và 雇用形態 (正社員/契約社員/アルバイト). Nếu mới bắt đầu làm, ghi thêm 入社日 (ngày vào công ty).',
          '年収 (thu nhập hằng năm): điền tổng lương gộp trước thuế. Nếu chưa đủ 1 năm: lương tháng × 12. Ví dụ lương 250,000 yên/tháng → ghi "300万円" (3.000.000 yên).',
          '緊急連絡先: họ tên, quan hệ, số điện thoại và địa chỉ. Gia đình ở Việt Nam ghi số quốc tế (+84...). Quan hệ ghi bằng tiếng Nhật: 父 (cha), 母 (mẹ), 兄 (anh), 姉 (chị), 友人 (bạn bè).',
        ],
        tip: 'Chuẩn bị trước khi đến văn phòng: thu nhập hằng năm ước tính, địa chỉ và số điện thoại công ty, và thông tin liên hệ khẩn cấp. Mang theo thẻ cư trú và hộ chiếu để đối chiếu.',
      },
      {
        title: 'Ngày nhận nhà phải làm ngay',
        content:
          'Đây là bước nhiều người bỏ qua nhất, nhưng lại quyết định việc sau này có bị đòi tiền oan khi trả nhà hay không.',
        items: [
          'Chụp toàn bộ hiện trạng ngay ngày đầu: tường, trần, sàn, bếp, toilet, ban công, cửa sổ, khóa, điều hòa.',
          'Chụp riêng mọi vết trầy, nứt, mốc, ố hoặc đồ hỏng dù nhỏ.',
          'Kiểm tra điện, nước, gas, bếp, điều hòa, khóa cửa, chuông, internet nếu nhà có sẵn.',
          'Giữ email, biên bản bàn giao và ảnh trong cùng một nơi để khi trả nhà còn đối chiếu.',
        ],
        tip: 'Nếu thấy lỗi ngay lúc vào, hãy báo bằng email hoặc tin nhắn có lưu thời gian. Gọi điện xong mà không có dấu vết thì rất yếu.',
        image: require('../../../../../assets/content/daily-life/dl_apartment_s3.jpg'),
        imageCaption: 'Chìa khóa căn hộ Nhật — nhận xong phải chụp toàn bộ hiện trạng nhà ngay hôm đó để đối chiếu khi trả nhà',
      },
      {
        title: 'Những lỗi làm mất tiền khi trả nhà',
        content:
          'Phần lớn tranh chấp không đến từ luật quá khó, mà từ việc không đọc hợp đồng và không giữ bằng chứng.',
        items: [
          'Thông báo hủy hợp đồng quá muộn so với điều khoản 1 hoặc 2 tháng báo trước.',
          'Tự khoan, dán keo mạnh, nuôi thú cưng hoặc cho người khác ở chung khi hợp đồng không cho phép.',
          'Không có ảnh hiện trạng lúc nhận nhà nên không chứng minh được vết cũ.',
          'Không hỏi rõ tiêu chuẩn “khôi phục hiện trạng” theo guideline chính thức.',
        ],
        tip: 'Nếu phát sinh phí trả nhà cao bất thường, đừng vội đồng ý. Hãy yêu cầu bảng chi tiết và đối chiếu với guideline của MLIT.',
      },
    ],
  };

export default apartment;
