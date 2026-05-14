import type { AdminGuide } from '../../../../types/content';

const childVaccinationSchedule: AdminGuide = {
  id: 'child-vaccination-schedule',
  category: 'health',
  lastVerified: '2026-05-14',
  priority: 'normal',
  title: 'Tiêm chủng cho trẻ em ở Nhật — lịch + miễn phí + 母子手帳',
  titleJp: '子どもの予防接種スケジュール',
  icon: 'medkit-outline',
  color: '#16A085',
  description:
    'Trẻ em ở Nhật (bất kể quốc tịch) có quyền tiêm chủng theo 予防接種法 — chia 2 nhóm: 定期接種 (lịch định kỳ, MIỄN PHÍ cho cư dân có 住民票) và 任意接種 (tự nguyện, có thể được trợ cấp một phần). 役所 gửi 予診票 (giấy khám trước tiêm) qua bưu điện đến địa chỉ đăng ký trước mỗi mốc tuổi. Hồ sơ tiêm ghi vào 母子手帳 (Mother-Child Health Handbook). Lịch định kỳ chính: ロタ, B型肝炎, ヒブ + 五種混合 (mới từ 2024), 肺炎球菌, BCG, MR, 水痘, 日本脳炎, HPV. Đây là tài liệu định hướng — lịch cụ thể + có thay đổi tùy năm + tùy 自治体, kiểm tra với 保健所 / 役所 / 小児科.',
  searchKeywords: [
    'tiêm chủng cho con',
    'tiêm phòng cho con',
    'tiêm vắc xin',
    'lịch tiêm chủng Nhật',
    'tiêm BCG',
    'sởi quai bị rubella',
    'thủy đậu',
    'viêm gan B',
    'viêm não Nhật Bản',
    'HPV cho con gái',
    'cúm hàng năm',
    '母子手帳',
    '予防接種',
    '予防接種法',
    '定期接種',
    '任意接種',
    '予診票',
    'BCG',
    'MR',
    'ヒブ',
    '肺炎球菌',
    '水痘',
    '日本脳炎',
    '五種混合',
    '四種混合',
    'ロタウイルス',
    'B型肝炎',
    'インフルエンザ',
    'おたふく',
    'HPVワクチン',
    'pediatric',
    '小児科',
    '予防接種スケジュール',
  ],
  legalScope: {
    jurisdiction: 'mixed',
    jurisdictionNote:
      '予防接種法 (Vaccination Act) là luật toàn quốc, chia 定期接種 (A類疾病 — bắt buộc khuyến nghị, miễn phí) và 任意接種 (tự nguyện, tự trả). Lịch tiêm + đối tượng + mốc tuổi do 厚生労働省 quy định, nhưng triển khai cụ thể (gửi 予診票, danh sách 指定医療機関, trợ cấp 任意接種) do 市区町村 thực hiện. Lịch CÓ THAY ĐỔI: 五種混合 thay 四種混合 + ヒブ riêng từ 2024-04. PCV15 thay PCV13 ở nhiều nơi 2024–2025. HPV recovery 2022. Đây là TÀI LIỆU THAM KHẢO — kiểm tra lịch CHÍNH XÁC với 保健所 / 母子保健課 ở 役所.',
    sourceVerifiedAt: '2026-05-14',
    nextReviewAt: '2026-09-01',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Trẻ có bệnh nền / dị ứng / dùng thuốc dài hạn — hỏi 小児科 trước mỗi mũi.',
      'Trẻ vừa bị sốt / viêm họng / cảm — hoãn tiêm 1–2 tuần, hỏi bác sĩ.',
      'Phản ứng mạnh sau mũi trước (sốt cao kéo dài, sưng to, co giật) — báo bác sĩ + 役所 trước mũi tiếp.',
      'Trẻ sinh ở VN, đã tiêm một số mũi tại VN — mang sổ tiêm VN cho 小児科 đối chiếu, có thể cần dịch.',
      'Trẻ có visa "家族滞在" / "定住者" lần đầu sang Nhật — đăng ký 住民票 + xin 予診票 bù từ 役所.',
    ],
  },
  quickAction: {
    deadline:
      'Mỗi mũi có "thời gian khuyến nghị" (推奨接種期間) trong 定期接種. Tiêm trong khung tuổi này = MIỄN PHÍ. Quá hạn = phải tự trả phí (任意接種 — vài nghìn đến vài chục nghìn yên/mũi). 役所 gửi 予診票 đến địa chỉ trước mỗi mốc — đợi giấy đến rồi đặt lịch 小児科.',
    office:
      '保健所 / 母子保健課 ở 役所 — quản lý 予診票 + lịch + tư vấn. 指定医療機関 (小児科 đăng ký) — nơi tiêm. Một số nơi có 集団接種 (tiêm tập trung) tại 保健センター. AMDA / 多文化共生 trung tâm có thể giúp đa ngôn ngữ.',
    doNow: [
      'Đăng ký 住民票 ở 役所 → tự động nhận 予診票 qua bưu điện trước mỗi mốc tuổi.',
      'Xin 母子手帳 lúc mang thai (~12–16 tuần thai) — sổ ghi tiêm chủng + tăng trưởng, có nhiều ngôn ngữ tại 役所.',
      'Mở 予診票 khi nhận được — đọc lịch, đặt lịch 小児科 trước hạn.',
      'Đặt lịch 小児科 (gọi điện hoặc đặt online) — nói "予防接種の予約をしたいです".',
      'Trước khi đi tiêm: trẻ đo nhiệt độ tại nhà — nếu > 37.5°C, hoãn lại.',
      'Mang đến 小児科: 予診票 (đã điền), 母子手帳, 保険証, 乳幼児医療証 (nếu có).',
    ],
    bring: [
      '予診票 (giấy 役所 gửi, đã điền + ký)',
      '母子手帳 (sổ mẹ con — tất cả mũi ghi vào đây)',
      '保険証 (thẻ bảo hiểm của trẻ)',
      '乳幼児医療証 (thẻ y tế trẻ em — phần lớn 自治体 cấp miễn phí)',
      '在留カード của trẻ (nếu được cấp riêng)',
      'Quần áo dễ cởi (cánh tay / đùi tùy mũi)',
      'Sổ tiêm cũ từ VN nếu trẻ sinh tại VN (kèm bản dịch sơ)',
    ],
    ifLate:
      'Quá khung 定期接種: vẫn tiêm được nhưng phải tự trả (任意接種). Một số 自治体 có chương trình "キャッチアップ" (bù) đặc biệt cho HPV / MR / một số mũi — hỏi 役所. Trẻ chưa đủ mũi mà sắp đi nhà trẻ / mẫu giáo: có thể phải tự trả mũi bù gấp.',
    officialSourceLabels: ['厚生労働省 — 予防接種情報', '国立感染症研究所 — VPD info', '日本小児科学会 — 予防接種スケジュール'],
  },
  whoIsThisFor: [
    'Cha mẹ Việt có con sinh tại Nhật — bắt đầu lịch tiêm từ 0 tuổi.',
    'Cha mẹ Việt mới đưa con sang Nhật (visa 家族滞在 / 定住者) — đăng ký 住民票 + xin 予診票 bù.',
    'Cha mẹ Việt có con sinh tại VN, đã tiêm một số mũi — đối chiếu sổ VN với lịch Nhật.',
    'Cha mẹ chuẩn bị mang thai — biết sớm về 母子手帳 + lịch.',
    'Cha mẹ có con sắp vào nhà trẻ / mẫu giáo / tiểu học — kiểm tra mũi đã đủ chưa.',
    'Cha mẹ có con tuổi teen — quan tâm HPV vaccine cho con gái.',
  ],
  whenToDo: [
    'Khi mang thai (12–16 tuần) — xin 母子手帳 tại 役所.',
    'Sau khi sinh + đăng ký 出生届: 役所 gửi 予診票 đầu tiên trong vài tuần.',
    'Mỗi khi nhận 予診票 mới qua bưu điện — đặt lịch 小児科 trong 1–2 tuần.',
    'Trước khi đi mẫu giáo / tiểu học: kiểm tra với 保健所 xem mũi nào còn thiếu.',
    'Mỗi tháng 10–12: cân nhắc tiêm cúm (インフルエンザ — 任意, hàng năm).',
    'Khi sang Nhật giữa chừng (con 2 tuổi+): đến 役所 xin 予診票 bù + đối chiếu sổ VN.',
  ],
  whereToDo: [
    '保健所 / 母子保健課 ở 役所: đăng ký 母子手帳, xin 予診票 bù, tư vấn.',
    '小児科 đăng ký với 自治体 (指定医療機関): nơi tiêm chính. Tra danh sách trên trang 役所.',
    '保健センター: một số 自治体 tổ chức 集団接種 (tiêm tập trung) cho BCG / MR / 集団 mũi khác.',
    '多文化共生 trung tâm / AMDA: hỗ trợ đa ngôn ngữ nếu cần.',
    'Bệnh viện lớn: có 小児科 + có thể tiêm. Phù hợp nếu trẻ có bệnh nền cần theo dõi.',
  ],
  estimatedTime:
    'Mỗi mũi tại 小児科: 30–60 phút (đăng ký + 問診 + tiêm + theo dõi 15–30 phút sau). Một số nơi cho phép tiêm nhiều mũi cùng ngày (同時接種) — tiết kiệm visit. Lịch toàn bộ từ 0 tuổi đến 13 tuổi: hơn 20 mũi tiêm trong nhiều lần thăm.',
  fees: [
    '定期接種 (trong khung tuổi khuyến nghị): **MIỄN PHÍ** cho cư dân có 住民票. Chi phí do 自治体 trả.',
    '任意接種 (tự nguyện hoặc quá hạn 定期): **TỰ TRẢ**. Phí tham khảo: インフルエンザ 3,000–5,000 yên/mũi, おたふく 5,000–8,000 yên/mũi, A型肝炎 7,000–10,000 yên/mũi. Một số 自治体 trợ cấp một phần.',
    '初診料 / 再診料 của 小児科: nếu chỉ tiêm thì thường KHÔNG mất phí khám (vì 予防接種 không tính 診療). Nếu đồng thời khám bệnh = phí khám riêng.',
    '乳幼児医療証 (thẻ y tế trẻ em — miễn phí khám tới 6–18 tuổi tùy 自治体): KHÔNG áp dụng cho 予防接種 任意 (vì không phải 治療). Áp dụng cho khám bệnh thông thường + cấp cứu.',
    'Phí 母子手帳 cấp lần đầu: MIỄN PHÍ (lúc mang thai, tại 役所).',
    'Phí thay đổi tùy 自治体 + tùy năm — kiểm tra trang chính thức.',
  ],
  documentsChecklist: [
    { label: '予診票 đã điền', required: true, note: 'Giấy 役所 gửi qua bưu điện trước mỗi mốc tuổi. Điền + ký tên cha/mẹ trước khi đến phòng khám. KHÔNG có 予診票 = không tiêm 定期 miễn phí được.' },
    { label: '母子手帳', required: true, note: 'Sổ ghi tiêm chủng + tăng trưởng. Bác sĩ ghi vào sau mỗi mũi. Mang theo MỌI lần khám / tiêm.' },
    { label: '保険証 của trẻ', required: true, note: 'Thẻ 国保 hoặc 社保 của trẻ. Dù 予防接種 miễn phí, vẫn cần để xác nhận thông tin.' },
    { label: '乳幼児医療証', required: false, note: '自治体 cấp miễn phí, dùng cho khám bệnh thông thường. Mang theo phòng khi cần khám thêm.' },
    { label: '在留カード của trẻ', required: false, note: 'Cho trẻ ≥ 3 tháng tuổi đã được cấp. Không phải 全部 phòng khám yêu cầu nhưng nên mang.' },
    { label: 'Sổ tiêm từ VN (nếu có)', required: false, note: 'Trẻ sinh tại VN đã tiêm một số mũi. Mang sổ + bản dịch sơ — bác sĩ Nhật đối chiếu, tránh tiêm trùng.' },
    { label: 'Quần áo dễ cởi', required: false, note: 'Mũi tiêm ở cánh tay (1 tuổi+) hoặc đùi (dưới 1 tuổi). Quần áo cộc / áo có cúc dễ thao tác.' },
  ],
  commonMistakes: [
    'Bỏ qua 予診票 vì không hiểu tiếng Nhật → bỏ lỡ 定期 miễn phí. Mang giấy đến 役所 / 小児科 nhờ giải thích.',
    'Quên đo thân nhiệt sáng trước khi tiêm → bị từ chối tại phòng khám (sốt > 37.5°C hoãn).',
    'Tiêm khi vừa khỏi bệnh chưa đủ 1–2 tuần → có thể có phản ứng + bác sĩ thường khuyên hoãn.',
    'Mang con đến tiêm KHÔNG có 母子手帳 → bác sĩ không ghi được hồ sơ → phải về lấy.',
    'Chuyển nhà giữa 自治体 + không đăng ký 住民票 mới → 予診票 mới không gửi được → bỏ lỡ mũi.',
    'Tiêm 任意接種 (tự nguyện) tại phòng khám không 指定 → có thể không được trợ cấp dù 自治体 có chương trình.',
    'Không tiêm đồng thời nhiều mũi (同時接種) khi bác sĩ cho phép → kéo dài lịch + nhiều lần thăm hơn.',
    'Tin "vắc xin không an toàn" trên FB / TikTok VN → từ chối tiêm → con dễ mắc bệnh nguy hiểm. Đọc nguồn chính thức 厚生労働省 + 国立感染症研究所.',
    'Đợi đến khi vào mẫu giáo mới đi tiêm dồn → quá hạn 定期 → phải trả nhiều tiền + một số mũi không thể tiêm muộn.',
    'Không mang sổ tiêm từ VN khi sang Nhật → bác sĩ không biết đã tiêm gì → có thể tiêm trùng hoặc bỏ sót.',
    'Sang Nhật giữa chừng + không xin 予診票 bù tại 役所 → bỏ lỡ 定期 miễn phí cho các mũi còn lại.',
  ],
  faq: [
    {
      question: 'Trẻ tôi sinh ở VN, đã tiêm BCG + viêm gan B + DPT ở VN. Sang Nhật cần làm gì?',
      answer:
        '**Bước 1**: Đăng ký 住民票 cho trẻ tại 役所 + xin 母子手帳 (có bản đa ngôn ngữ tại nhiều 自治体).\n\n**Bước 2**: Mang **sổ tiêm chủng từ VN** + bản dịch sơ (hoặc nhờ phòng dịch tại 役所 dịch) đến 母子保健課. Họ sẽ:\n• Đối chiếu mũi đã tiêm tại VN với lịch Nhật.\n• Cấp 予診票 cho các mũi còn THIẾU.\n• Tư vấn lịch còn lại.\n\n**Bước 3**: Một số mũi VN có thể không hoàn toàn tương đương Nhật (ví dụ DPT VN vs 五種混合 Nhật). Bác sĩ 小児科 quyết định:\n• Tính như đã tiêm (bỏ qua) hoặc\n• Tiêm bổ sung\n\n**Bước 4**: Đặt lịch 小児科 → tiêm các mũi còn thiếu theo 予診票 mới.\n\n**Lưu ý**:\n• KHÔNG nên giấu mũi đã tiêm — có thể bị tiêm trùng (không nguy hiểm nhưng phí công).\n• Một số 自治体 chấp nhận 定期 miễn phí cho mũi bù nếu trẻ vẫn trong khung tuổi định kỳ — hỏi rõ.\n• Trẻ trên 13 tuổi (HPV) — vẫn xin được catchup ở một số 自治体.',
    },
    {
      question: '同時接種 (tiêm nhiều mũi cùng ngày) có an toàn không?',
      answer:
        'CÓ, theo 厚生労働省 + 日本小児科学会. 同時接種 được khuyến nghị để:\n• Giảm số lần đi viện (tiết kiệm thời gian + tiền cha mẹ).\n• Trẻ được bảo vệ sớm hơn.\n• Giảm stress cho trẻ (1 lần khóc ngắn vs nhiều lần).\n\n**Có thể tiêm cùng ngày**:\n• ロタ + B型肝炎 + ヒブ + 五種混合 + 肺炎球菌 (4–5 mũi cùng ngày là bình thường ở 2 tháng tuổi).\n• MR + 水痘 + おたふく (任意) ở 1 tuổi.\n\n**Phản ứng**: thường không nhiều hơn tiêm 1 mũi. Sốt nhẹ 1–2 ngày sau là phổ biến.\n\n**Bác sĩ 小児科 quyết định** — tùy lịch của trẻ + tình trạng sức khỏe ngày hôm đó. Hỏi: "今日同時接種できますか?"',
    },
    {
      question: '五種混合 (mới từ 2024) là gì? Khác 四種混合 thế nào?',
      answer:
        '**四種混合** (DPT-IPV) chứa 4 vắc xin: ジフテリア (bạch hầu) + 百日せき (ho gà) + 破傷風 (uốn ván) + ポリオ (bại liệt).\n\n**五種混合** (DPT-IPV-Hib) chứa 5 vắc xin: 4 mũi trên + **ヒブ** (Hib — Haemophilus influenzae type b).\n\n**Thay đổi từ 2024-04**: nhiều 自治体 chuyển sang **五種混合** — gộp ヒブ vào, giảm số mũi tiêm tổng cộng.\n\n**Trẻ đang dở dang lịch (đã tiêm 1–2 mũi 四種混合 + ヒブ riêng)**:\n• Bác sĩ 小児科 quyết định: tiếp tục 四種混合 + ヒブ riêng, hoặc chuyển sang 五種混合.\n• Một số 自治体 cho phép trộn — không sao về miễn dịch.\n\n**Trẻ mới bắt đầu lịch sau 2024-04**: tiêm 五種混合 trực tiếp.\n\nLịch tiêm 4 mũi (dù 4種 hay 5種): 2 tháng, 3 tháng, 4 tháng (mũi 1–3), rồi 1 tuổi+ (mũi 4 追加).\n\nKiểm tra với 小児科 + 母子保健課 — lịch cụ thể tùy 自治体.',
    },
    {
      question: 'HPV vaccine cho con gái — có nên tiêm không? Bao tuổi?',
      answer:
        '**Tình hình hiện tại**: HPV vaccine được khuyến nghị ACTIVE bởi 厚生労働省 từ 2022 (sau giai đoạn dừng khuyến nghị 2013–2022). Chương trình **catch-up vaccination** (bù) được mở rộng đến gen sinh 1997–2007 (kết thúc 2024–2025 tùy 自治体, có gia hạn).\n\n**Đối tượng 定期接種 (miễn phí)**:\n• Con gái lớp 6 tiểu học – lớp 1 trung học (12–16 tuổi).\n• Khuyến nghị tiêm trước 14 tuổi để hiệu quả cao nhất.\n\n**Vắc xin có sẵn**:\n• 2価 (Cervarix) — 2 týp HPV\n• 4価 (Gardasil) — 4 týp\n• **9価 (Gardasil 9)** — 9 týp, được 定期 từ 2023-04, hiệu quả nhất.\n\n**Lịch tiêm**:\n• Dưới 15 tuổi: 2 mũi cách nhau 6 tháng (9価).\n• Từ 15 tuổi+: 3 mũi (0, 2 tháng, 6 tháng).\n\n**Phản ứng**:\n• Thường nhẹ: đau chỗ tiêm, sốt nhẹ.\n• Có lo ngại trước đây — sau nghiên cứu lớn, 厚生労働省 + WHO khẳng định lợi ích vượt trội rủi ro.\n\n**Đăng ký**: 役所 gửi 予診票 khi con vào lớp 6. Nếu không nhận được — hỏi 母子保健課.\n\nQuyết định cuối cùng là cha mẹ + con gái + tham vấn 小児科.',
    },
    {
      question: 'Trẻ tôi vừa khỏi cảm — bao lâu mới tiêm được?',
      answer:
        '**Hướng dẫn chung của 小児科学会**:\n\n• Cảm nhẹ + không sốt: có thể tiêm ngay nếu bác sĩ thấy ổn.\n• Sốt > 37.5°C ngày tiêm: Hoãn ngay.\n• Vừa khỏi sốt: chờ ít nhất 1 tuần (cho miễn dịch hồi phục).\n• Vừa khỏi bệnh truyền nhiễm (sởi, thủy đậu, quai bị): chờ 4 tuần (vắc xin sống), 1–2 tuần (vắc xin chết).\n• Đang dùng kháng sinh: thường vẫn tiêm được — hỏi bác sĩ.\n• Đang dùng steroid liều cao: hoãn — hỏi bác sĩ.\n\n**Quy tắc**:\n• Đo thân nhiệt sáng ngày tiêm.\n• Trả lời thật trên 予診票 các câu hỏi về tình trạng gần đây.\n• Nếu không chắc → gọi 小児科 hỏi trước khi đến.\n\n**Hoãn không phải bỏ**: đặt lịch lại trong 1–2 tuần, không mất hạn 定期 miễn là vẫn trong khung tuổi.',
    },
    {
      question: '乳幼児医療証 và 予防接種 — quan hệ thế nào?',
      answer:
        '2 hệ thống KHÁC NHAU:\n\n**乳幼児医療証 / 子ども医療費助成**:\n• Do 自治体 cấp cho trẻ em (thường tới 6–18 tuổi tùy nơi — Tokyo 23 区 mở rộng tới THCS hoặc THPT).\n• Áp dụng cho **khám bệnh thông thường** + cấp cứu + thuốc theo toa.\n• Chi phí khám = MIỄN PHÍ hoặc đồng trả nhỏ (vài trăm yên).\n• KHÔNG áp dụng cho 予防接種 任意 (vắc xin tự nguyện) vì 予防接種 không phải "treatment".\n\n**予診票 cho 予防接種 定期**:\n• Hệ thống RIÊNG cho vắc xin định kỳ.\n• Áp dụng cho mũi tiêm trong khung tuổi khuyến nghị.\n• MIỄN PHÍ cho cư dân có 住民票.\n\n**Khi nào tự trả**:\n• 任意接種 (cúm, おたふく, A型肝炎, v.v.) — tự trả full hoặc một phần (一部 trợ cấp).\n• 定期接種 nhưng quá khung tuổi — tự trả.\n• Tiêm tại phòng không 指定 (không trong danh sách 自治体) — có thể tự trả.\n\n**Mẹo**: hỏi 役所 / 母子保健課 cho danh sách phòng khám + chương trình trợ cấp 任意接種 ở 自治体 mình.',
    },
  ],
  counterPhrases: [
    {
      jp: '予防接種の予約をしたいです。',
      romaji: 'Yobou sesshu no yoyaku o shitai desu.',
      vn: 'Tôi muốn đặt lịch tiêm chủng.',
      note: 'Câu mở đầu khi gọi 小児科. Cho biết tuổi + mũi cần tiêm nếu được hỏi.',
    },
    {
      jp: '今日同時接種できますか。',
      romaji: 'Kyou doujisesshu dekimasu ka.',
      vn: 'Hôm nay có thể tiêm nhiều mũi cùng lúc không?',
      note: 'Yêu cầu tiêm nhiều mũi cùng ngày — bác sĩ quyết định dựa trên lịch + tình trạng trẻ.',
    },
    {
      jp: '母子手帳に記入をお願いします。',
      romaji: 'Boshi techou ni kinyuu o onegai shimasu.',
      vn: 'Xin ghi vào sổ mẹ con.',
      note: 'Sau mỗi mũi — bác sĩ ghi tên vắc xin + ngày + 製造番号 vào sổ.',
    },
    {
      jp: 'ベトナムで打ったワクチンの記録があります。確認してください。',
      romaji: 'Betonamu de utta wakuchin no kiroku ga arimasu. Kakunin shite kudasai.',
      vn: 'Tôi có sổ tiêm từ Việt Nam. Xin kiểm tra giúp.',
      note: 'Khi đối chiếu mũi đã tiêm tại VN với lịch Nhật. Đưa sổ VN + bản dịch sơ.',
    },
    {
      jp: '予診票を紛失しました。再発行をお願いできますか。',
      romaji: 'Yoshinhyou o funshitsu shimashita. Saihakkou o onegai dekimasu ka.',
      vn: 'Tôi mất 予診票. Xin cấp lại được không?',
      note: 'Nói tại 役所 / 母子保健課. Họ in lại miễn phí.',
    },
    {
      jp: '今朝の体温は◯◯度です。',
      romaji: 'Kesa no taion wa ◯◯ do desu.',
      vn: 'Sáng nay thân nhiệt là ◯◯ độ.',
      note: 'Báo nhiệt độ trẻ tại quầy 受付. > 37.5 = hoãn.',
    },
    {
      jp: '副反応について教えてください。',
      romaji: 'Fukuhannou ni tsuite oshiete kudasai.',
      vn: 'Xin giải thích phản ứng phụ có thể xảy ra.',
      note: 'Hỏi bác sĩ trước hoặc sau tiêm. Bác sĩ có nghĩa vụ giải thích.',
    },
    {
      jp: '次の接種はいつですか。',
      romaji: 'Tsugi no sesshu wa itsu desu ka.',
      vn: 'Mũi tiếp theo khi nào?',
      note: 'Sau mỗi mũi — bác sĩ tư vấn mũi tiếp + khoảng cách.',
    },
  ],
  officialLinks: [
    { label: '厚生労働省 — 予防接種情報', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou/kekkaku-kansenshou/yobou-sesshu/index.html' },
    { label: '国立感染症研究所 — VPD info', url: 'https://www.niid.go.jp/' },
    { label: '日本小児科学会 — 予防接種スケジュール', url: 'https://www.jpeds.or.jp/modules/activity/index.php?content_id=8' },
    { label: 'Know-VPD! 予防接種', url: 'https://www.know-vpd.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Khi mang thai — xin 母子手帳 tại 役所',
      description:
        '**Lúc nào xin**: sau khi xác nhận có thai (~6–12 tuần) + đã có "妊娠届" từ bệnh viện/phòng khám.\n\n**Đến đâu**: 役所 (区役所 / 市役所) — quầy 母子保健課 hoặc 健康課.\n\n**Mang theo**:\n• 妊娠届出書 (giấy bệnh viện cấp khi xác nhận có thai).\n• My Number (cá nhân hoặc thẻ My Number).\n• 在留カード (cho người nước ngoài).\n• 印鑑 (con dấu, hoặc ký tên cũng được ở nhiều nơi).\n\n**Nhận được**:\n• **母子健康手帳 (母子手帳)** — sổ ghi:\n  - Diễn biến mang thai\n  - Sinh nở\n  - Tăng trưởng trẻ tới 6 tuổi\n  - **Tiêm chủng đầy đủ**\n• **妊婦健診受診票** — giấy khám thai trợ cấp.\n• Tài liệu hướng dẫn (nhiều 自治体 có **bản đa ngôn ngữ**: Anh, Trung, Hàn, Việt, Tagalog, Tây Ban Nha, Bồ Đào Nha).\n\n**Yêu cầu bản tiếng Việt nếu có**:\nNói: "ベトナム語版の母子手帳はありますか?" (Có 母子手帳 bản tiếng Việt không?). Tokyo 23 区 + Aichi + Osaka + Kanagawa thường có. Vùng nông thôn có thể không có.\n\n**Lưu ý**:\n• 母子手帳 sẽ MANG THEO MỌI lần khám thai + sau sinh + tới 6 tuổi.\n• Mất sổ → xin lại tại 役所 (có lịch sử trên hệ thống nội bộ).',
      documents: [
        '妊娠届出書 (giấy bệnh viện)',
        'My Number',
        '在留カード',
        '印鑑 (hoặc ký tên)',
      ],
      tip: '母子手帳 quan trọng cả đời con — sau này con dùng cho tiêm chủng người lớn (HPV, MR催し), khám sức khỏe trường, du học. Bảo quản như giấy tờ quan trọng.',
    },
    {
      step: 2,
      title: 'Sau khi sinh — đăng ký 出生届 + nhận 予診票 đầu',
      description:
        '**Trong 14 ngày sau sinh**:\n\n1. **出生届** (giấy khai sinh): nộp tại 役所 (nơi sinh hoặc nơi cư trú).\n2. **Đăng ký 住民票** cho trẻ → tự động nhận:\n   - 健康保険証 (thẻ bảo hiểm trẻ — qua công ty bố/mẹ hoặc 国保)\n   - 乳幼児医療証 (thẻ khám miễn phí)\n   - **予診票 セット** cho các mũi sớm: ロタ + B型肝炎 + ヒブ + 五種混合 + 肺炎球菌 + BCG\n   - 母子保健 hỗ trợ thông tin lịch + 小児科 gần.\n\n**Lịch khuyến nghị mốc đầu** (kiểm tra với 自治体 vì thay đổi):\n\n• **2 tháng**: ロタウイルス (uống), B型肝炎 (1), ヒブ (1) hoặc 五種混合 (1), 肺炎球菌 (1).\n• **3 tháng**: 五種混合 (2) hoặc DPT-IPV (2), 肺炎球菌 (2), B型肝炎 (2), ロタ (2).\n• **4 tháng**: 五種混合 (3), 肺炎球菌 (3), ロタ (3 nếu vắc xin 5価).\n• **5–7 tháng**: BCG (1 lần duy nhất, 集団 hoặc 個別 tùy 自治体).\n• **7–8 tháng**: B型肝炎 (3), 五種混合 (3 nếu chưa).\n• **1 tuổi**: MR (1), 水痘 (1), 五種混合 mũi 4 (追加), 肺炎球菌 (4), おたふく (任意).\n• **1.5 tuổi**: 水痘 (2).\n• **3 tuổi**: 日本脳炎 (1, 2).\n• **4 tuổi**: 日本脳炎 (3).\n• **5–6 tuổi (lớp Mầm — lớp 1)**: MR (2), DT (二種混合 chuẩn bị tiểu học).\n• **9–13 tuổi**: 日本脳炎 (4 — second期).\n• **12–16 tuổi (con gái)**: HPV (2 hoặc 3 mũi).\n\n**Lưu ý**: lịch CÓ THAY ĐỔI tùy năm + tùy 自治体. KIỂM TRA với 母子保健課 + 小児科.',
      documents: [
        '出生届',
        '母子手帳',
        'My Number của bố/mẹ',
        '印鑑',
        '健康保険証 của bố/mẹ',
      ],
      tip: 'Trong tháng đầu sau sinh thường có 訪問指導 (nhân viên 保健 đến nhà tư vấn) — họ giải thích lịch tiêm + 予診票 nhận được. Tận dụng + hỏi câu hỏi.',
    },
    {
      step: 3,
      title: 'Mỗi mốc tiêm — chuẩn bị + đặt lịch + đi tiêm',
      description:
        '**Khi nhận 予診票 mới qua bưu điện**:\n\n1. **Mở phong bì** — đọc:\n   - Tên vắc xin (định kỳ).\n   - Khung tuổi khuyến nghị (推奨期間).\n   - Khung tuổi tối đa được miễn phí (実施期間).\n   - Danh sách 指定医療機関 (phòng khám 指定 — chỉ tiêm tại đây mới được miễn phí).\n\n2. **Điền 予診票** trước khi đến phòng khám:\n   - Thông tin trẻ.\n   - Tình trạng sức khỏe gần đây.\n   - Tiền sử bệnh.\n   - Phản ứng mũi trước (nếu có).\n   - Ký tên cha/mẹ.\n\n3. **Đặt lịch 小児科** — gọi điện hoặc đặt online. Câu mở: "予防接種の予約をしたいです. ◯◯歳の子どもです. ワクチンは◯◯です."\n   - Một số phòng có giờ riêng cho 予防接種 (vd: 14:00–15:00) — tách khỏi giờ trẻ ốm.\n\n4. **Sáng ngày tiêm**:\n   - Đo thân nhiệt — > 37.5°C → Hoãn ngay, gọi báo phòng khám.\n   - Trẻ tỉnh táo, ăn uống bình thường = OK.\n   - Mặc quần áo dễ cởi.\n\n5. **Tại phòng khám**:\n   - Đăng ký 受付: nộp 予診票 + 母子手帳 + 保険証 + 乳幼児医療証 + 在留カード.\n   - 問診 (bác sĩ hỏi tình trạng).\n   - Tiêm.\n   - Theo dõi 15–30 phút (đề phòng phản ứng cấp).\n   - Bác sĩ ghi vào 母子手帳.\n\n6. **Về nhà — 24 giờ sau theo dõi**:\n   - Sốt nhẹ 1–2 ngày là bình thường.\n   - Sưng nhẹ chỗ tiêm: bình thường.\n   - Phản ứng nguy hiểm (sốt > 39°C kéo dài, co giật, khó thở, sưng to lan rộng): gọi 小児科 hoặc 救急 (119).',
      documents: [
        '予診票 (đã điền + ký)',
        '母子手帳',
        '保険証',
        '乳幼児医療証',
        '在留カード',
      ],
      tip: 'Đặt lịch sớm — 小児科 đông, đặc biệt mùa cúm tháng 10–12. Đặt 1–2 tuần trước.',
    },
    {
      step: 4,
      title: 'Sang Nhật giữa chừng — xin 予診票 bù + đối chiếu sổ VN',
      description:
        '**Tình huống**: trẻ sinh tại VN, đã tiêm một số mũi, sang Nhật khi 1–10 tuổi.\n\n**Bước 1 — Đăng ký 住民票**:\n• Đến 役所, đăng ký 住民票 cho trẻ.\n• Xin **母子手帳** (nếu chưa có) — Nhật có thể cấp cho trẻ ngoài 0 tuổi nếu vẫn cần ghi tiêm chủng.\n• Yêu cầu bản đa ngôn ngữ nếu có.\n\n**Bước 2 — Mang sổ tiêm VN đến 母子保健課**:\n• Sổ tiêm chủng VN (sổ giấy hoặc app).\n• Bản dịch sơ (Google Translate hoặc tự dịch tay) — nhất là tên vắc xin + ngày tiêm.\n• 在留カード của trẻ + bố/mẹ.\n\n**Bước 3 — Đối chiếu**:\nNhân viên 保健 đối chiếu mũi VN với lịch Nhật:\n• Mũi tương đương + đúng số liều → tính như đã tiêm.\n• Mũi thiếu hoặc không tương đương → cấp 予診票 cho mũi bù.\n• Mũi không có ở VN nhưng có ở Nhật (BCG nếu chưa tiêm, MR追加 nếu thiếu liều 2, HPV nếu vào tuổi) → cấp 予診票.\n\n**Bước 4 — Lịch bù**:\n• Đa số mũi 定期 vẫn được miễn phí nếu trẻ trong khung tuổi定期 (ví dụ MR追加 đến trước tiểu học).\n• Quá khung → tự trả 任意接種, một số 自治体 có chương trình bù trợ cấp.\n\n**Bước 5 — Đặt lịch 小児科 + tiêm theo lịch mới**.\n\n**Cảnh báo**:\n• Có vắc xin VN tiêm thay vì Nhật (vd Quinvaxem khác 五種混合 chút) — bác sĩ Nhật quyết định cách tính.\n• KHÔNG giấu sổ VN — có thể tiêm trùng (không nguy hiểm nhưng phí công).\n• Trẻ vào nhà trẻ / mẫu giáo / tiểu học có thể được hỏi sổ tiêm — chuẩn bị sẵn.',
      documents: [
        'Sổ tiêm chủng từ VN + bản dịch sơ',
        '在留カード trẻ + bố/mẹ',
        '母子手帳 (mới cấp Nhật hoặc cũ VN)',
        '住民票 chứng minh đăng ký',
      ],
      tip: 'Chụp ảnh sổ tiêm VN (mọi trang) trước khi sang — phòng khi sổ giấy mất / hỏng. Lưu cloud.',
    },
    {
      step: 5,
      title: 'Tiêm bổ sung 任意接種 (cúm, おたふく, v.v.) + chuẩn bị mẫu giáo / tiểu học',
      description:
        '**任意接種 (tự nguyện) phổ biến**:\n\n• **インフルエンザ (cúm)** — hàng năm, tháng 10–12 trước mùa dịch.\n  - 6 tháng – 13 tuổi: 2 mũi cách 2–4 tuần.\n  - 13 tuổi+: 1 mũi.\n  - Phí: 3,000–5,000 yên/mũi (một số 自治体 trợ cấp một phần cho trẻ).\n\n• **おたふくかぜ (quai bị / mumps)** — 1 tuổi + 5–6 tuổi.\n  - Bảo vệ chống mumps + viêm tinh hoàn / viêm màng não.\n  - Phí: 5,000–8,000 yên/mũi (một số 自治体 trợ cấp 1 mũi).\n\n• **A型肝炎 (Hep A)** — cho trẻ đi VN / ăn uống ngoài thường xuyên.\n  - 3 mũi cách nhau 6 tháng + 1 năm.\n  - Phí: 7,000–10,000 yên/mũi.\n\n• **髄膜炎菌 (Meningococcal)** — cho trẻ đi du học / quân sự / sống ở khu nguy cơ.\n  - 1 mũi (4価).\n  - Phí: 20,000–25,000 yên.\n\n**Chuẩn bị nhà trẻ / mẫu giáo / tiểu học**:\n\n• **6–12 tháng trước nhập học**: kiểm tra 母子手帳 với 母子保健課 — mũi nào còn thiếu?\n• **Ưu tiên** trước nhập học:\n  - MR (sởi-rubella) đủ 2 mũi.\n  - 水痘 (thủy đậu) đủ 2 mũi.\n  - DT (二種混合) cho lớp 1.\n  - インフルエンザ (cúm) tháng 10–11.\n• **Một số mẫu giáo / tiểu học có thể yêu cầu sao 母子手帳** chứng minh đã tiêm — chuẩn bị sao trước.\n\n**Tuổi teen — HPV cho con gái**:\n• 役所 gửi 予診票 khi vào lớp 6.\n• Nếu không nhận được hoặc đã quá tuổi 12 mà chưa nhận → hỏi 母子保健課.\n• Catch-up cho gen sinh 1997–2007 — thời hạn đăng ký gia hạn tùy 自治体, kiểm tra trước hết hạn.\n\n**Cảnh báo**:\n• Quên / bỏ lỡ 任意 → con vẫn an toàn nhưng giảm bảo vệ.\n• Có lo ngại / câu hỏi → hỏi 小児科, KHÔNG dựa vào FB / TikTok.\n• Một số 自治体 có **チェックアップ事業** (chương trình kiểm tra tổng hợp) cho trẻ 1.5 tuổi + 3 tuổi — kiểm tra mũi đã đủ chưa.',
      documents: [
        '母子手帳',
        'Sao 母子手帳 phần tiêm chủng (cho trường yêu cầu)',
        '保険証',
        '乳幼児医療証',
        '予診票 cho mũi 任意 (nếu 自治体 cấp)',
      ],
      tip: 'Đặt nhắc nhở lịch hàng năm trên điện thoại — tháng 10 cúm, tháng 4 vào lớp mới. Tiêm chủng là quá trình dài 13+ năm.',
    },
  ],
};

export default childVaccinationSchedule;
