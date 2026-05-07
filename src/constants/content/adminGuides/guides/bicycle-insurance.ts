import type { AdminGuide } from '../../../../types/content';

const bicycleInsurance: AdminGuide = {
    id: 'bicycle-insurance',
    category: 'traffic',
    lastVerified: '2026-05-02',
    priority: 'normal',
    title: 'Bảo hiểm xe đạp tại Nhật',
    titleJp: '自転車保険・個人賠償責任保険（義務化対応）',
    icon: 'bicycle',
    color: '#1E8449',
    description: 'Nhiều địa phương tại Nhật đã quy định bắt buộc hoặc khuyến khích mạnh việc tham gia 自転車損害賠償責任保険等. Nhiều người đã được bảo vệ qua 個人賠償責任保険 mà không biết — kiểm tra trước khi mua thêm để tránh mua trùng.',
    heroImage: require('../../../../../assets/content/daily-life/ag_bike-insurance_hero.jpg'),
    heroImageCaption: '自転車保険 - kiểm tra bảo hiểm trách nhiệm cá nhân trước khi đi xe đạp',
    whoIsThisFor: [
      'Người đi xe đạp hằng ngày tại Nhật, kể cả đi làm, đi học, đi chợ.',
      'Người mới đến Nhật và chưa rõ mình đã có bảo hiểm xe đạp qua công ty hoặc thẻ tín dụng hay chưa.',
      'Phụ huynh có con dưới 18 tuổi đi xe đạp — bố mẹ có thể bị chịu trách nhiệm dân sự thay cho con.',
    ],
    whenToDo: [
      'Ngay khi mua xe đạp mới hoặc sắp đi học/đi làm bằng xe đạp.',
      'Khi chuyển tỉnh — quy định và mức độ bắt buộc khác nhau theo tỉnh.',
      'Khi gia hạn bảo hiểm hằng năm — kiểm tra lại phạm vi bảo vệ.',
    ],
    whereToDo: [
      'Website của tỉnh/thành phố nơi bạn sống hoặc nơi đi học/đi làm: kiểm tra quy định 自転車保険 義務化/努力義務.',
      'Công ty bảo hiểm nhà, tai nạn, ô tô hoặc thẻ tín dụng đang dùng: hỏi có 個人賠償責任保険/特約 bao gồm tai nạn xe đạp không.',
      'Cửa hàng xe đạp có 自転車安全整備士: kiểm tra xe và dán TSマーク nếu muốn bảo hiểm đi kèm kiểm tra kỹ thuật.',
      'Trường học, công ty hoặc ký túc xá: hỏi yêu cầu nộp giấy xác nhận bảo hiểm xe đạp nếu dùng xe đi học/đi làm.',
      'Website/app của công ty bảo hiểm hoặc convenience store/post office: mua 専用自転車保険 nếu chưa có bảo hiểm trách nhiệm cá nhân.',
    ],
    estimatedTime: 'Kiểm tra bảo hiểm hiện có: 10–20 phút. Mua mới online: 15–30 phút. TSマーク kiểm tra xe đạp tại cửa hàng: 30–60 phút.',
    fees: [
      '個人賠償責任保険 gắn vào hợp đồng bảo hiểm sẵn có (nhà, tai nạn): thêm ~1,000–3,000 yên/năm.',
      'TSマーク付帯保険: ~1,000–1,500 yên/2 năm (gồm cả kiểm tra kỹ thuật xe).',
      '専用自転車保険 riêng: ~2,000–7,000 yên/năm tùy gói.',
    ],
    documentsChecklist: [
      { label: 'Hợp đồng bảo hiểm hiện có (nhà, tai nạn, tín dụng)', required: false, note: 'Để kiểm tra xem đã có 個人賠償責任保険 chưa' },
      { label: 'Xe đạp (mang đến cửa hàng cho TSマーク kiểm tra)', required: false },
    ],
    commonMistakes: [
      'Mua 自転車保険 mới trong khi đã được bảo vệ qua 個人賠償責任保険 trong gói bảo hiểm nhà — kiểm tra trước.',
      'Chỉ mua bảo hiểm cho mình mà bỏ qua con cái — con dưới 18 tuổi không tự ký hợp đồng, cần mua gói gia đình hoặc gói bao gồm "家族全員".',
      'Nghĩ TSマーク là bảo hiểm đầy đủ — TSマーク chỉ bảo vệ người bị hại (đền 1,000万 tử vong), không bảo vệ bản thân khi bị thương hay xe bị hỏng.',
      'Không gia hạn khi TSマーク hết hạn 2 năm — bảo hiểm đính kèm cũng hết hiệu lực.',
    ],
    faq: [
      {
        question: 'Làm sao biết mình đã có bảo hiểm xe đạp chưa?',
        answer: 'Kiểm tra 3 nguồn: (1) Hợp đồng bảo hiểm tai nạn/nhà — tìm mục 個人賠償責任保険, nếu có thì bạn đã được bảo vệ khi đi xe đạp gây thiệt hại cho người khác. (2) Thẻ tín dụng — nhiều thẻ (Rakuten, JCB, VISA) có 個人賠償特約 miễn phí. (3) Phúc lợi công ty — một số công ty mua bảo hiểm tập thể cho nhân viên.',
      },
      {
        question: 'TSマーク là gì và có nên làm không?',
        answer: 'TSマーク là nhãn an toàn do cửa hàng xe đạp cấp sau khi kiểm tra kỹ thuật (tương tự 車検 nhỏ). Hiệu lực 2 năm. Đính kèm bảo hiểm: bồi thường tử vong/thương tật cho người bị hại tối đa 1,000万 yên và sửa chữa xe đạp gây tai nạn tối đa 100万 yên. Chi phí ~1,000–1,500 yên/2 năm — hợp lý để vừa kiểm tra xe vừa có bảo hiểm cơ bản.',
      },
      {
        question: 'Không có bảo hiểm bị phạt không?',
        answer: 'Tùy tỉnh — hầu hết chỉ dừng lại ở hướng dẫn hành chính (行政指導), không phạt tiền trực tiếp. Nhưng nếu xảy ra tai nạn nghiêm trọng mà không có bảo hiểm, bạn phải tự chi trả toàn bộ — các vụ kiện tai nạn xe đạp ở Nhật đã có bản án lên đến 90 triệu yên.',
      },
    ],
    officialLinks: [
      { label: '自転車損害賠償責任保険等への加入促進 — 国土交通省', url: 'https://www.mlit.go.jp/road/bicycleuse/promotion/' },
      { label: 'TSマーク制度について — 公益財団法人日本交通管理技術協会', url: 'https://www.tmt.or.jp/s/safety/index2.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Kiểm tra xem bạn đã được bảo vệ chưa',
        description: 'Trước khi mua bảo hiểm mới, kiểm tra các nguồn đã có:\n\n① Bảo hiểm nhà/tài sản (火災保険, 家財保険):\nNhiều gói có 個人賠償責任保険 kèm theo — bao gồm cả tai nạn xe đạp gây thiệt hại cho người khác. Mở hợp đồng và tìm mục "個人賠償" hoặc gọi công ty hỏi trực tiếp.\n\n② Bảo hiểm tai nạn cá nhân (傷害保険) từ công ty:\nNếu công ty mua bảo hiểm tập thể, xem phúc lợi hoặc hỏi bộ phận nhân sự.\n\n③ Thẻ tín dụng:\nRakuten Card, JCB, một số Visa/Mastercard Nhật có 個人賠償責任保険 tự động cho chủ thẻ và gia đình.\n\n④ Bảo hiểm nhân thọ có rider 個人賠償:\nNếu có hợp đồng bảo hiểm nhân thọ ở Nhật, kiểm tra phần rider (特約).',
        documents: [],
        tip: 'Gọi điện đến công ty bảo hiểm và hỏi đúng câu: "自転車事故による他人への損害賠償は補償されますか？" — họ sẽ xác nhận ngay. 5 phút điện thoại tránh mua trùng bảo hiểm.',
      },
      {
        step: 2,
        title: 'Chọn loại bảo hiểm phù hợp nếu chưa được bảo vệ',
        description: 'Có 3 lựa chọn chính:\n\n**A. Thêm 個人賠償責任保険 vào hợp đồng sẵn có** (khuyến nghị nếu có):\n- Gọi công ty bảo hiểm nhà/tai nạn, yêu cầu thêm 個人賠償責任特約.\n- Chi phí: ~1,000–3,000 yên/năm thêm vào.\n- Bảo vệ cả gia đình trong một gói.\n\n**B. TSマーク tại cửa hàng xe đạp** (đơn giản nhất):\n- Mang xe đến cửa hàng có biển "自転車安全整備士".\n- Kiểm tra kỹ thuật + dán nhãn TSマーク + bảo hiểm đính kèm.\n- Chi phí ~1,000–1,500 yên, hiệu lực 2 năm.\n- Giới hạn: chỉ bao gồm thiệt hại cho người khác (không tự bảo vệ).\n\n**C. Mua 専用自転車保険** (toàn diện nhất):\n- Mua online hoặc tại cửa hàng xe đạp, コンビニ, Japan Post.\n- Ví dụ: au損保, ZuttoRide, 日本交通管理技術協会.\n- Bao gồm: thiệt hại cho người khác + bản thân khi bị thương + đôi khi cả trộm cắp xe.',
        documents: [],
        tip: 'Nếu đã có bảo hiểm nhà, option A là rẻ và tiện nhất. Nếu không có bảo hiểm gì ở Nhật, TSマーク là cách nhanh nhất trong một chuyến đến cửa hàng xe đạp.',
      },
      {
        step: 3,
        title: 'Gia hạn định kỳ và giữ giấy tờ bảo hiểm',
        description: 'Bảo hiểm xe đạp thường có hiệu lực 1–2 năm — không tự động gia hạn trừ khi đăng ký tự động.\n\nNhắc hạn:\n• 個人賠償責任保険 trong hợp đồng bảo hiểm nhà: gia hạn cùng hợp đồng chính.\n• TSマーク: hiệu lực 2 năm. Nhìn sticker trên xe sẽ thấy ngày hết hạn.\n• 専用自転車保険: thường gửi email/thư nhắc trước 30–60 ngày.\n\nNên làm:\n• Chụp ảnh 証明書 bảo hiểm và lưu vào điện thoại.\n• Ghi số hotline công ty bảo hiểm vào danh bạ để dùng khi cần gấp.\n• Nếu có con đi học, báo nhà trường — nhiều trường yêu cầu xác nhận bảo hiểm xe đạp từ năm học 2024–2025.',
        documents: [],
        tip: 'Một số tỉnh thành (như Tokyo) có danh sách các gói bảo hiểm đủ tiêu chuẩn trên trang web tỉnh. Tìm "[tên tỉnh] 自転車保険 義務化" để xem tỉnh bạn đang ở yêu cầu loại bảo hiểm nào.',
      },
      {
        step: 4,
        title: 'Xử lý khi xảy ra tai nạn',
        description: 'Khi xe đạp của bạn gây tai nạn cho người khác:\n\n1. Dừng lại ngay — không được bỏ đi (当て逃げ là vi phạm hình sự).\n2. Kiểm tra tình trạng người bị hại.\n3. Gọi 119 nếu có thương vong, gọi 110 để lập biên bản (交通事故証明書).\n4. Trao đổi thông tin: tên, điện thoại, địa chỉ của bạn và người bị hại.\n5. Gọi công ty bảo hiểm ngay — họ sẽ hướng dẫn từng bước.\n6. Không đồng ý bồi thường tại chỗ hay ký giấy tờ trước khi bảo hiểm can thiệp.\n\nKhi xe đạp của bạn bị tai nạn (chính bạn bị thương):\n- Nếu có 人身傷害補償 hoặc 搭乗者傷害: liên hệ công ty bảo hiểm để khai báo.\n- 自賠責 không bảo vệ bạn trong trường hợp tự ngã hoặc lỗi của bạn.',
        documents: [],
        tip: 'Nếu không có bảo hiểm và gây tai nạn nghiêm trọng, bạn có thể bị kiện dân sự với số tiền bồi thường rất lớn. Các vụ kiện ở Nhật đã có bản án bắt trả 90 triệu yên (khoảng 15 tỷ đồng) — đây là lý do bảo hiểm xe đạp không nên bỏ qua.',
      },
    ],
  };

export default bicycleInsurance;
