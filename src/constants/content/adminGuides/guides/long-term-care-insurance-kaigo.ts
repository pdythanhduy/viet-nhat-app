import type { AdminGuide } from '../../../../types/content';

const longTermCareInsuranceKaigo: AdminGuide = {
  id: 'long-term-care-insurance-kaigo',
  category: 'health',
  lastVerified: '2026-07-11',
  priority: 'normal',
  title: 'Bảo hiểm chăm sóc dài hạn — 介護保険 (Kaigo Hoken)',
  titleJp: '介護保険制度 — 加入・申請・利用',
  icon: 'medkit-outline',
  color: '#7E57C2',
  description:
    '介護保険 là bảo hiểm bắt buộc tại Nhật cho người từ 40 tuổi trở lên (bao gồm người nước ngoài có cư trú hợp pháp). Đóng phí hằng tháng, khi cần chăm sóc dài hạn (do tuổi già hoặc bệnh đặc định) thì xin 要介護認定 ở 市役所 để dùng dịch vụ tại nhà / day-care / viện dưỡng lão với phần đóng góp 10–30% (phần còn lại bảo hiểm + thuế chi trả). Cần phân biệt với bảo hiểm y tế (健康保険) — kaigo riêng.',
  searchKeywords: [
    'kaigo hoken',
    'bảo hiểm chăm sóc',
    'bảo hiểm già',
    'chăm sóc người già',
    '介護保険',
    '要介護',
    '要支援',
    'day care Nhật',
    'viện dưỡng lão',
    'デイサービス',
    'ホームヘルパー',
    '地域包括支援センター',
    'bố mẹ già',
    'chăm sóc tại nhà',
    'tai byouki',
    'đặc định bệnh',
  ],
  legalScope: {
    jurisdiction: 'mixed',
    jurisdictionNote:
      'Luật 介護保険法 (1997) — quản lý cấp quốc gia bởi 厚生労働省 (MHLW). Triển khai cấp 市町村: 市役所 thu phí, phát 介護保険被保険者証, xét 要介護認定. Phí + dịch vụ cụ thể tùy 市町村 — sai khác đáng kể giữa các khu.',
    sourceVerifiedAt: '2026-05-14',
    nextReviewAt: '2026-12-01',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Tình trạng phức tạp (sa sút trí tuệ 認知症, đột quỵ, ung thư cuối kỳ) — cần ケアマネジャー (care manager) lập 介護計画 chuyên.',
      'Tranh chấp về kết quả 要介護認定 — có thể appeal qua 介護保険審査会 trong 3 tháng.',
      'Bố mẹ visa 短期滞在 (3 tháng) hoặc chưa đăng ký 住民票 — KHÔNG đủ điều kiện 介護保険. Cần expert tư vấn options khác (bảo hiểm tư, dịch vụ tự trả).',
    ],
  },
  quickAction: {
    deadline:
      'Tự động tham gia khi tròn 40 tuổi (giảm trừ qua lương / 国保) — KHÔNG cần đăng ký. Khi cần dịch vụ: nộp 要介護認定 申請 lúc bắt đầu cần (không có deadline cố định) — xét mất 30 ngày.',
    office:
      '**市役所** phòng 介護保険課 (mỗi khu có tên khác — 高齢福祉課, 介護長寿課) — đăng ký + xin 認定 + tra cứu phí. **地域包括支援センター** ở mỗi khu (đa số) — tư vấn miễn phí, hướng dẫn dịch vụ phù hợp. Hỏi 市役所 địa chỉ trung tâm gần nhất.',
    doNow: [
      'Xác định xem bạn / người thân thuộc nhóm: **第1号** (65+ tuổi) hay **第2号** (40–64 tuổi + 16 bệnh đặc định như đột quỵ, Parkinson, ung thư cuối kỳ).',
      'Nếu cần dịch vụ: gọi **地域包括支援センター** gần nhà hoặc đi 市役所 phòng 介護保険.',
      'Xin **要介護認定 申請書** (mẫu đơn xin đánh giá) tại 市役所 — miễn phí.',
      'Chuẩn bị: 介護保険被保険者証 (thẻ kaigo) + 健康保険証 + tên + thông tin bác sĩ điều trị chính (主治医).',
      'Nộp đơn — 市役所 sẽ cử người đến nhà phỏng vấn + xin ý kiến 主治医 → kết quả sau ~30 ngày.',
    ],
    bring: [
      '介護保険被保険者証 (thẻ xanh — tự động gửi khi đủ 65 tuổi; người 40–64 chỉ có khi đã được công nhận)',
      '健康保険証',
      '在留カード',
      'Tên + địa chỉ + số điện thoại bác sĩ chính (主治医)',
      'Người thân đi cùng giúp dịch (nếu Nhật chưa đủ tốt)',
    ],
    ifLate:
      'Không có "muộn" — đăng ký 認定 bất cứ lúc nào cần. Nhưng đợi quá có thể làm tình trạng xấu đi + tăng cấp 要介護 cần. Bắt đầu sớm ngay khi thấy dấu hiệu cần hỗ trợ (đi lại khó, hay quên nặng, không tự ăn uống).',
    officialSourceLabels: ['厚生労働省 (MHLW) — 介護保険制度'],
  },
  whoIsThisFor: [
    'Người Việt 40+ tuổi sống ở Nhật — bạn đang đóng kaigo qua lương / 国保 dù bạn không biết.',
    'Người chăm bố/mẹ già người Việt sống cùng ở Nhật (có 住民票 + 在留カード dài hạn).',
    'Người có bố/mẹ vừa bị đột quỵ, sa sút trí tuệ, ung thư cuối kỳ → cần xin dịch vụ.',
    'Người thuộc visa 高度専門職 / 永住 / 配偶者等 đã mời bố/mẹ sang lâu dài.',
    'KHÔNG dành cho: bố/mẹ thăm thân 短期滞在 (3 tháng) — không có 住民票 nên không tham gia kaigo. Nếu họ ngã / cần chăm sóc → dùng dịch vụ tư trả 100% hoặc bảo hiểm du lịch.',
  ],
  whenToDo: [
    'Khi tròn 40 tuổi — bắt đầu tự động đóng kaigo (giảm trừ qua lương 給与 / kèm 国保). KHÔNG cần làm gì.',
    'Khi tròn 65 tuổi — nhận 介護保険被保険者証 (thẻ kaigo) tự động qua bưu điện. Giữ kỹ.',
    'Khi xuất hiện dấu hiệu cần chăm sóc: đi lại khó (cần gậy/xe lăn), hay quên nặng, không tự tắm/ăn, sau xuất viện không tự về nhà → đăng ký 認定 NGAY.',
    'Trước khi xuất viện sau cú đột quỵ / phẫu thuật lớn → bệnh viện sẽ liên kết 退院支援 — xin認定 song song.',
    'Khi bố/mẹ già người Việt nhập cảnh dài hạn — đăng ký 住民票 + 健康保険 → tự động vào kaigo (nếu 65+) hoặc 40–64 với 1 trong 16 bệnh đặc định.',
  ],
  whereToDo: [
    '**市役所 / 区役所** phòng 介護保険課 (hoặc 高齢福祉課, 介護長寿課) — nộp 認定 申請 + tra phí + xin thẻ.',
    '**地域包括支援センター** (Community Comprehensive Support Center) — tư vấn MIỄN PHÍ tại địa phương. Mỗi 中学校区 có 1 trung tâm. Hỏi 市役所 hoặc search Google.',
    '**ケアマネジャー** (居宅介護支援事業所) — chuyên gia lập 介護計画 sau khi có 認定. Thuê miễn phí (kaigo chi trả).',
    '**主治医 (bác sĩ điều trị chính)** — viết ý kiến y tế cho hồ sơ 認定.',
    '**Dịch vụ trợ giúp tiếng Việt**: 一部 trung tâm có phiên dịch hoặc ボランティア tiếng Việt — hỏi 地域包括支援センター. AMDA (xem mental-health guide) hỗ trợ phiên dịch y tế.',
  ],
  estimatedTime:
    'Đăng ký 認定: 30 phút tại 市役所 + cử người đến nhà 1–2 giờ + xin ý kiến 主治医 (1–2 tuần). Toàn bộ kết quả ~30 ngày. Sau 認定: thuê ケアマネジャー + lập 介護計画 ~1–2 tuần. Bắt đầu dịch vụ trong 1–2 tháng từ ngày bắt đầu申請.',
  fees: [
    '**Phí kaigo hằng tháng**:\n• 40–64 tuổi: thường ~5,000–9,000円/tháng — đóng kèm 健康保険 (giảm trừ qua lương hoặc 国保). Khác theo thu nhập + bảo hiểm.\n• 65+ tuổi: thường ~5,000–8,000円/tháng (tùy 市町村 + thu nhập) — đóng qua pension hoặc trực tiếp 市役所.',
    '**Phần đóng góp khi dùng dịch vụ** (sau 認定):\n• Thu nhập thấp: 10%.\n• Thu nhập trung: 20%.\n• Thu nhập cao: 30%.\n• Có 上限 (giới hạn) hằng tháng theo mức thu nhập — không vượt quá ~14,000–44,000円/tháng.',
    '**Phí dịch vụ tham khảo** (theo cấp 要介護):\n• 要支援1 — phòng ngừa, hạn mức ~50,000円/tháng → bạn trả ~5,000円.\n• 要介護1 → trần ~167,000円/tháng → bạn trả ~17,000円.\n• 要介護5 (nặng nhất) → trần ~362,000円/tháng → bạn trả ~36,000円.',
    'Số trần thay đổi theo 介護報酬 改定 (3 năm/lần). Hiện tại tham khảo 改定 2024–2026.',
    '**Viện dưỡng lão 特別養護老人ホーム** (公的): ~80,000–150,000円/tháng (bao gồm ăn ở + phần kaigo 10–30%). Người thu nhập thấp được giảm thêm.',
    '**Viện dưỡng lão tư 有料老人ホーム**: 150,000–500,000円/tháng — kaigo chỉ chi trả phần dịch vụ chăm sóc, không bao ăn ở. Đắt hơn nhiều.',
    'Phí cụ thể của bạn — hỏi 市役所 phòng 介護保険 hoặc ケアマネジャー.',
  ],
  documentsChecklist: [
    { label: '介護保険被保険者証 (thẻ kaigo)', required: true, note: '65+ nhận tự động; 40–64 chỉ có nếu đã 認定. Mất thì xin lại tại 市役所.' },
    { label: '健康保険証', required: true, note: 'Để xác minh đang đóng kaigo qua bảo hiểm.' },
    { label: '在留カード', required: true, note: 'Xác minh tư cách cư trú + 住民票.' },
    { label: 'Tên + địa chỉ + số điện thoại 主治医', required: true, note: 'Bác sĩ điều trị thường xuyên — cần để 市役所 xin 主治医意見書.' },
    { label: 'マイナンバー (My Number)', required: false, note: 'Tăng tốc xử lý — thường yêu cầu.' },
    { label: 'Đơn 認定 申請書', required: true, note: 'Lấy tại 市役所 — miễn phí, có thể download.' },
    { label: 'Người thân đi cùng (interpreter)', required: false, note: 'Khuyến khích nếu Nhật chưa đủ tốt — phỏng vấn ~1–2 giờ.' },
  ],
  commonMistakes: [
    'Tin "kaigo chỉ cho người Nhật" → SAI. Người nước ngoài 40+ có 住民票 dài hạn tự động tham gia.',
    'Tin "đóng tự nguyện" → SAI. Bắt buộc khi 40+, không thể từ chối.',
    'Không xin 認定 sớm khi bố/mẹ bắt đầu yếu → đợi đến lúc khủng hoảng (đột quỵ, gãy xương) thì chậm.',
    'Bố/mẹ thăm thân 3 tháng nghĩ "đăng ký kaigo cho an toàn" → KHÔNG ĐƯỢC. Phải có 住民票 dài hạn.',
    'Tin "tự trả 100% rẻ hơn vào kaigo" → SAI. Kaigo trả 70–90% phí dịch vụ — tiết kiệm rất lớn.',
    'Không thuê ケアマネジャー sau khi có 認定 → tự xoay sở tốn thời gian + dễ chọn sai dịch vụ.',
    'Bỏ qua 地域包括支援センター → bỏ qua tư vấn miễn phí có giá trị.',
    'Đặt cọc viện dưỡng lão tư đắt mà chưa hỏi viện 特養 (公的) → có thể đợi nhưng tiết kiệm 50–70%.',
    'Tin nhân viên môi giới viện tư "có cách đi tắt 認定" → cẩn thận lừa đảo. 認定 chỉ do 市役所 xét.',
  ],
  faq: [
    {
      question: '40 tuổi rồi nhưng tôi không cần chăm sóc — tại sao vẫn đóng kaigo?',
      answer:
        'Kaigo là **bảo hiểm xã hội bắt buộc** — như 健康保険, 年金, 雇用保険. Toàn dân Nhật + người nước ngoài cư trú dài hạn 40+ đều đóng. Mục đích: phân tán rủi ro — bạn đóng khi khỏe để xã hội có quỹ chăm sóc người đang yếu.\n\nKhi bạn / bố mẹ cần chăm sóc trong tương lai, bạn sẽ dùng đến.\n\n**Không thể "rút" hay "không tham gia"**. Tự động giảm trừ qua lương / 国保. Nếu trốn thì 市役所 có quyền truy thu + phạt.\n\nNếu bạn về Việt Nam vĩnh viễn (huỷ 住民票) → ngừng đóng. Không có hoàn lại phần đã đóng.',
    },
    {
      question: 'Tôi mời bố/mẹ già sang Nhật ở dài hạn — họ tham gia kaigo thế nào?',
      answer:
        '**Điều kiện**:\n• Có visa dài hạn (vd 特定活動 cho cha mẹ 高度専門職, 日本人の配偶者等 hiếm, v.v. — xem guide parents-elderly-relatives).\n• Đăng ký 住民票 tại 市役所.\n• Đăng ký 健康保険 (国保 thường).\n\n**Sau khi đăng ký**:\n• 65+ tuổi: tự động vào kaigo, nhận 介護保険被保険者証 trong vài tuần.\n• 40–64 tuổi: tham gia kaigo qua bảo hiểm y tế nhưng chỉ được dùng dịch vụ nếu có 1 trong **16 bệnh đặc định** (đột quỵ, Parkinson, ung thư cuối kỳ, sa sút trí tuệ sớm, viêm khớp dạng thấp, ALS, v.v.).\n\n**Cần xin 認定** khi cần dịch vụ — quy trình giống người Nhật.\n\n**LƯU Ý**: visa 短期滞在 3 tháng KHÔNG có 住民票 → KHÔNG tham gia kaigo. Nếu gặp sự cố y tế phải tự trả hoặc dùng bảo hiểm du lịch quốc tế.\n\nXem thêm guide parents-elderly-relatives để hiểu loại visa nào hợp lệ.',
    },
    {
      question: '要介護認定 có những cấp nào? Khác nhau ra sao?',
      answer:
        '7 cấp + 1 cấp "không đủ điều kiện":\n\n**要支援 1, 2** (cần hỗ trợ phòng ngừa):\n• Còn tự lập đa phần nhưng cần giúp nhẹ.\n• Dịch vụ: tập phòng ngừa, home help nhẹ, day-service nhẹ.\n• Trần hằng tháng: ~50,000–105,000円.\n\n**要介護 1, 2, 3, 4, 5** (cần chăm sóc):\n• 1: nhẹ — giúp tắm + nội trợ.\n• 2: tăng — đi lại khó, cần hỗ trợ nhiều.\n• 3: trung — không tự ăn / vệ sinh, cần hỗ trợ thường xuyên.\n• 4: nặng — nằm liệt nhiều thời gian, cần chăm sóc cả ngày.\n• 5: rất nặng — nằm liệt hoàn toàn, cần chăm sóc 24/7.\n• Trần hằng tháng: ~167,000–362,000円.\n\n**Non-certified** (không đủ điều kiện): còn quá khỏe — không được kaigo. Có thể dùng 自治体 dịch vụ phòng ngừa miễn phí / rẻ.\n\nCấp do **介護認定審査会** ở 市役所 xét dựa trên:\n• Phỏng vấn tại nhà (~70 câu hỏi tiêu chuẩn).\n• Ý kiến 主治医 (主治医意見書).\n• Đánh giá computer + hội đồng xét.\n\nKhông hài lòng kết quả → appeal trong 3 tháng. Hoặc xin **区分変更** (xét lại) khi tình trạng xấu đi.',
    },
    {
      question: '介護保険 chi trả những dịch vụ gì?',
      answer:
        'Sau khi có 認定, có 3 loại dịch vụ chính:\n\n**1. 居宅サービス (tại nhà)**:\n• ホームヘルパー (訪問介護): nhân viên đến nhà giúp tắm/nội trợ/đưa đi viện.\n• 訪問入浴: tắm xe chuyên dụng đến nhà.\n• 訪問看護: y tá đến nhà.\n• 訪問リハビリ: phục hồi chức năng tại nhà.\n\n**2. 通所サービス (đến cơ sở)**:\n• デイサービス (通所介護): đến trung tâm sáng → tối (8 giờ), có ăn trưa + tắm + hoạt động.\n• デイケア (通所リハビリ): tương tự nhưng tập trung phục hồi chức năng.\n• ショートステイ: lưu trú ngắn 1 đêm — 1 tuần (gia đình nghỉ).\n\n**3. 施設サービス (vào viện)**:\n• 特別養護老人ホーム (特養): viện dưỡng lão công, rẻ nhưng wait list dài.\n• 介護老人保健施設 (老健): phục hồi sau viện.\n• 介護療養型医療施設: cho người cần điều trị y tế dài.\n• グループホーム: cho 認知症 — nhóm nhỏ 5–9 người.\n\n**Phụ trợ**:\n• Mua thiết bị (xe lăn, giường y tế): bảo hiểm hoặc thuê.\n• Sửa nhà (tay vịn, rào trượt): tối đa 200,000円, kaigo trả 70–90%.\n\n**ケアマネジャー** sẽ thiết kế **介護計画 (ケアプラン)** kết hợp các dịch vụ phù hợp + trong trần hằng tháng.',
    },
    {
      question: 'Bố/mẹ già sống một mình ở Nhật, tôi ở Việt Nam — làm sao chăm sóc xa?',
      answer:
        'Tình huống phổ biến của con cái người Việt:\n\n**Bước 1**: Đăng ký 認定 sớm — dùng dịch vụ chuyên nghiệp thay con cái.\n\n**Bước 2**: Thuê ケアマネジャー — đại diện giám sát chăm sóc:\n• Tự chọn 居宅介護支援事業所 (xem từ 地域包括支援センター).\n• ケアマネ làm calendar dịch vụ + báo cáo định kỳ (qua điện thoại / email).\n• MIỄN PHÍ — kaigo chi trả.\n\n**Bước 3**: Kết hợp dịch vụ:\n• ホームヘルパー mỗi ngày — tắm/cơm.\n• デイサービス 2–3 lần/tuần — đỡ cô đơn + theo dõi sức khỏe.\n• 緊急通報サービス: nút bấm khẩn cấp đeo cổ — gọi cấp cứu tự động khi ngã.\n\n**Bước 4**: Người liên lạc khẩn cấp:\n• Đăng ký với 地域包括支援センター bạn là 緊急連絡先.\n• Khuyến khích thêm 1 người Việt ở gần nhà bố/mẹ (hàng xóm, chùa, cộng đồng) làm 緊急連絡先 phụ.\n\n**Bước 5**: Xem định kỳ — sang Nhật 2–4 lần/năm, gặp ケアマネ + bác sĩ.\n\n**Tình huống xấu hơn** (sa sút trí tuệ nặng, không tự lập):\n• Cân nhắc 特養 / グループホーム / 有料老人ホーム.\n• Wait list 特養 thường dài — đăng ký nhiều viện song song.\n\n**Tình huống cuối**: bố/mẹ muốn về Việt Nam → cần hỗ trợ 帰国. Hủy 住民票, đóng kaigo cuối cùng, đặt vé. Bảo hiểm du lịch + dịch vụ medical escort nếu nặng.',
    },
    {
      question: 'Tôi 45 tuổi vừa bị đột quỵ — có được dùng kaigo không?',
      answer:
        'Có thể — nếu đột quỵ là 1 trong **16 bệnh đặc định** cho 第2号 (40–64 tuổi):\n\n**16 bệnh đặc định** (16特定疾病):\n1. 末期がん (ung thư cuối kỳ).\n2. 関節リウマチ (viêm khớp dạng thấp).\n3. 筋萎縮性側索硬化症 (ALS).\n4. 後縦靱帯骨化症.\n5. 骨折を伴う骨粗鬆症 (loãng xương kèm gãy).\n6. 初老期認知症 (sa sút trí tuệ sớm).\n7. 進行性核上性麻痺・大脳皮質基底核変性症・パーキンソン病関連疾患.\n8. 脊髓小脳変性症.\n9. 脊柱管狭窄症.\n10. 早老症.\n11. 多系統萎縮症.\n12. 糖尿病性神経障害・糖尿病性腎症・糖尿病性網膜症.\n13. **脳血管疾患 (đột quỵ, xuất huyết não)** ← Có.\n14. 閉塞性動脈硬化症.\n15. 慢性閉塞性肺疾患 (COPD).\n16. 両側の膝関節・股関節に著しい変形を伴う変形性関節症.\n\n**Quy trình**:\n• Xin 主治医意見書 (bác sĩ điều trị) xác nhận bệnh đặc định.\n• Nộp 認定 申請 tại 市役所.\n• Sau 認定 → dùng dịch vụ với 10–30% phần đóng góp.\n\n**Liên kết với 退院支援 (hỗ trợ xuất viện)**: bệnh viện thường có 医療ソーシャルワーカー (MSW) giúp kết nối 市役所 + ケアマネ trước khi xuất viện. Hỏi MSW ngay khi nhập viện.',
    },
  ],
  counterPhrases: [
    {
      jp: '介護保険の申請をしたいです。',
      romaji: 'Kaigo hoken no shinsei o shitai desu.',
      vn: 'Tôi muốn xin bảo hiểm chăm sóc dài hạn.',
      note: 'Câu mở đầu tại 市役所 phòng 介護保険.',
    },
    {
      jp: '要介護認定の申請書をください。',
      romaji: 'Youkaigo nintei no shinseisho o kudasai.',
      vn: 'Cho tôi đơn xin đánh giá cấp chăm sóc.',
      note: 'Xin form chính thức.',
    },
    {
      jp: '主治医は[tên bệnh viện]の[tên bác sĩ]先生です。',
      romaji: 'Shuujii wa [tên bệnh viện] no [tên bác sĩ] sensei desu.',
      vn: 'Bác sĩ điều trị của tôi là [bác sĩ] ở [bệnh viện].',
      note: 'Khai khi nhân viên 市役所 hỏi 主治医.',
    },
    {
      jp: '地域包括支援センターの場所を教えてください。',
      romaji: 'Chiiki houkatsu shien sentaa no basho o oshiete kudasai.',
      vn: 'Cho tôi biết địa chỉ trung tâm hỗ trợ tổng hợp địa phương.',
      note: 'Tư vấn miễn phí gần nhà.',
    },
    {
      jp: 'ケアマネジャーを紹介してください。',
      romaji: 'Kea manejaa o shoukai shite kudasai.',
      vn: 'Giới thiệu cho tôi một care manager.',
      note: 'Sau khi có 認定 — chọn 居宅介護支援事業所.',
    },
    {
      jp: 'ベトナム語の通訳はありますか。',
      romaji: 'Betonamu-go no tsuuyaku wa arimasu ka.',
      vn: 'Có phiên dịch tiếng Việt không?',
      note: 'Hỏi tại 市役所 / 地域包括支援センター — 1 số có ボランティア tiếng Việt.',
    },
    {
      jp: '父（母）の介護が必要になりました。',
      romaji: 'Chichi (haha) no kaigo ga hitsuyou ni narimashita.',
      vn: 'Bố (mẹ) của tôi cần chăm sóc.',
      note: 'Khi gọi 地域包括支援センター giúp đỡ.',
    },
    {
      jp: '区分変更を申請したいです。',
      romaji: 'Kubun henkou o shinsei shitai desu.',
      vn: 'Tôi muốn xin xét lại cấp.',
      note: 'Khi tình trạng xấu đi — xin tăng cấp 要介護.',
    },
  ],
  officialLinks: [
    { label: '厚生労働省 (MHLW) — 介護保険制度', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/gaiyo/index.html' },
    { label: 'WAM NET — 介護サービス情報公表', url: 'https://www.wam.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Xác định bạn / người thân thuộc nhóm nào',
      description:
        '**第1号被保険者 (Loại 1)**:\n• 65 tuổi trở lên.\n• Tự động tham gia khi đăng ký 住民票.\n• Dùng dịch vụ với BẤT KỲ lý do cần (tuổi già, bệnh, tai nạn).\n\n**第2号被保険者 (Loại 2)**:\n• 40–64 tuổi.\n• Tự động tham gia qua 健康保険.\n• Chỉ dùng dịch vụ khi mắc 1 trong 16 bệnh đặc định (xem FAQ).\n\n**Người KHÔNG tham gia**:\n• Dưới 40 tuổi.\n• Không có 住民票 (visa 短期滞在 3 tháng, không khai báo cư trú).\n• Đang ở 生活保護 — kaigo do 介護扶助 chi trả khác.',
      documents: ['在留カード', '健康保険証'],
      tip: 'Bạn không cần làm gì để "đăng ký" kaigo. Tự động khi đăng ký 住民票 + bảo hiểm y tế.',
    },
    {
      step: 2,
      title: 'Khi bắt đầu cần dịch vụ — đến 市役所 hoặc 地域包括支援センター',
      description:
        '**Dấu hiệu cần xin 認定**:\n• Đi lại khó, cần gậy / xe lăn.\n• Không tự tắm / mặc quần áo / ăn.\n• Hay quên nặng, lạc đường, không nhớ tên người thân.\n• Vừa xuất viện sau đột quỵ / phẫu thuật lớn.\n• Bố/mẹ một mình ở nhà mà không an toàn.\n\n**Bước cụ thể**:\n\n1. Gọi 地域包括支援センター gần nhà (số gọi từ 市役所 hoặc Google "Tên 市町村 + 地域包括").\n2. Nhân viên đến nhà tư vấn miễn phí — đánh giá tình trạng, gợi ý có nên xin認定 không.\n3. Nếu nên — họ hướng dẫn nộp 認定 申請 tại 市役所.\n4. Cách khác: đi thẳng 市役所 phòng 介護保険課 — bộ phận tiếp dân hướng dẫn.\n\n**Khuyến khích**: gọi 地域包括 trước — tư vấn miễn phí, tránh sai sót.',
      documents: ['介護保険被保険者証 (nếu 65+)', '健康保険証', '在留カード'],
      tip: '地域包括支援センター là TỐT NHẤT vì miễn phí + chuyên sâu. Đừng tự đi 市役所 nếu chưa hiểu.',
    },
    {
      step: 3,
      title: 'Nộp 要介護認定 申請 — chuẩn bị + phỏng vấn',
      description:
        '**Tại 市役所**:\n\n1. Lấy 要介護認定 申請書 — điền tên, địa chỉ, số 被保険者証, tên + bệnh viện 主治医.\n2. Nộp đơn — miễn phí.\n3. 市役所 sẽ:\n• Liên lạc 主治医 xin 主治医意見書 (1–2 tuần).\n• Hẹn lịch cử người (調査員) đến nhà phỏng vấn ~1–2 giờ.\n\n**Phỏng vấn tại nhà (74 mục)**:\n\n• 調査員 hỏi + quan sát người được xét.\n• Câu hỏi: đi lại, ăn uống, vệ sinh, trí nhớ, giao tiếp, hành vi.\n• Người thân nên dự — giúp dịch + bổ sung thông tin (đặc biệt khi 認知症 — người bệnh có thể che giấu).\n\n**KHÔNG nên**:\n• Không nên cố tỏ ra khỏe trong phỏng vấn → cấp 認定 thấp → ít dịch vụ.\n• Không nên giấu hành vi (tiểu không tự chủ, ngã, quên đường) → 認定 không đúng.\n• Trả lời trung thực + đủ — không tô hồng.\n\n**Sau phỏng vấn**:\n\n• Computer chấm sơ bộ.\n• 介護認定審査会 (hội đồng 5 người) xét lại.\n• Kết quả gửi qua bưu điện sau ~30 ngày tổng cộng.',
      documents: ['申請書', '被保険者証', '健康保険証', '在留カード'],
      tip: 'Người thân phải dự phỏng vấn nếu có thể. Đặc biệt với 認知症 — người bệnh thường trả lời "tôi khỏe lắm" trong khi thực tế lạc đường mỗi tuần.',
    },
    {
      step: 4,
      title: 'Sau khi có 認定 — thuê ケアマネジャー + lập ケアプラン',
      description:
        '**Nhận kết quả**:\n• 認定通知書 + 被保険者証 mới (in cấp 認定).\n• Có hiệu lực 6–24 tháng (xem trên thẻ) — phải xin lại trước hạn.\n\n**Thuê ケアマネジャー**:\n\n1. Chọn 居宅介護支援事業所 (公的 hoặc tư).\n2. List có sẵn tại 市役所, 地域包括支援センター, hoặc WAM NET online.\n3. Liên lạc 2–3 chỗ — chọn người hợp.\n4. **KHÔNG mất tiền** — kaigo chi trả 100%.\n\n**ケアマネジャー làm gì**:\n\n• Đánh giá nhu cầu chi tiết.\n• Liên kết các 事業所 cung cấp dịch vụ (helper, デイサービス, ショートステイ).\n• Lập **ケアプラン** (kế hoạch chăm sóc) — calendar tuần / tháng.\n• Họp gia đình hằng tháng (担当者会議).\n• Báo cáo + điều chỉnh khi cần.\n• Liên hệ bác sĩ + bệnh viện khi cần.\n\n**ケアプラン bao gồm**:\n\n• Loại dịch vụ + tần suất.\n• Mục tiêu cụ thể (vd "tắm tự lập 3 tháng").\n• Chi phí dự kiến.\n• Người chịu trách nhiệm mỗi dịch vụ.\n\n**Bạn có quyền**:\n\n• Đổi ケアマネジャー nếu không hợp — yêu cầu 事業所 hoặc đổi 事業所.\n• Yêu cầu thêm / bớt dịch vụ.\n• Xem chi tiết hợp đồng + báo cáo.',
      documents: ['認定通知書', '被保険者証 mới'],
      tip: 'ケアマネジャー tốt = chìa khóa chăm sóc thành công. Đầu tư thời gian chọn người hợp.',
    },
    {
      step: 5,
      title: 'Sử dụng dịch vụ + theo dõi + điều chỉnh',
      description:
        '**Bắt đầu dịch vụ**:\n\n• Mỗi dịch vụ có hợp đồng riêng với 事業所 cung cấp.\n• Đọc kỹ + ký + lưu bản sao.\n• Hỏi rõ phí + cách thanh toán (chuyển khoản hằng tháng phổ biến).\n\n**Theo dõi hằng tháng**:\n\n• ケアマネジャー đến thăm ít nhất 1 lần/tháng (担当者会議).\n• Báo cáo về tình trạng + dịch vụ.\n• Nhận hóa đơn → trả 10–30% (kaigo trả phần còn lại).\n\n**Khi tình trạng đổi**:\n\n• Xấu đi (đột quỵ thêm, ngã, 認知症 nặng hơn): xin **区分変更申請** — xét lại tăng cấp.\n• Tốt lên: cũng có thể xin xét lại giảm cấp (hiếm).\n\n**Trước hạn 認定 (6–24 tháng)**:\n\n• ケアマネジャー sẽ nhắc.\n• Nộp **更新申請** trước 60 ngày hết hạn.\n• Phỏng vấn lại + ý kiến 主治医 mới.\n\n**Tình huống chuyển vào viện**:\n\n• Cân nhắc 特養 (rẻ, wait list dài 6 tháng – 2 năm) trước 有料老人ホーム (đắt, sẵn có).\n• Đăng ký 特養 ở nhiều khu để tăng cơ hội.\n• Thẩm định lại 認定 khi vào viện — phí thay đổi.\n\n**Quyền lợi cuối đời**:\n\n• 介護保険 chi trả dịch vụ đến cuối đời.\n• Sau khi mất: gia đình thông báo 市役所 → ngừng kaigo.\n• Phí cuối cùng tính theo số ngày dùng.',
      documents: ['認定通知書', 'ケアプラン', 'Hợp đồng với 事業所'],
      tip: 'Đừng ngại yêu cầu điều chỉnh. Kaigo là dịch vụ — bạn có quyền chọn / đổi / phản ánh.',
    },
  ],
};

export default longTermCareInsuranceKaigo;
