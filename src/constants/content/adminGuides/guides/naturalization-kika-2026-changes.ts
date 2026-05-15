import type { AdminGuide } from '../../../../types/content';

const naturalizationKika2026Changes: AdminGuide = {
  id: 'naturalization-kika-2026-changes',
  category: 'immigration',
  lastVerified: '2026-05-14',
  priority: 'normal',
  title: 'Nhập tịch 帰化 — điểm cập nhật 2026 cho người Việt',
  titleJp: '帰化申請 — 2026年の主な変更点',
  icon: 'flag-outline',
  color: '#34495E',
  description:
    'Đây là **guide bổ sung** — KHÔNG thay thế guide chính `naturalization-kika.ts` (đã có từ 2026-05-06, đầy đủ điều kiện 国籍法, quy trình 法務局, giấy tờ). Guide này chỉ tổng hợp **các điểm cập nhật 2026** liên quan đến: (1) tích hợp My Number Card sau 帰化; (2) thay đổi quy trình online tại 法務局; (3) lưu ý mới về 戸籍 + 在留カード khi nhập tịch trong giai đoạn chuyển tiếp 特定在留カード (14/06/2026); (4) lưu ý sau 帰化 cho công dân Nhật mới. **Tài liệu định hướng** — luật cơ bản 国籍法 KHÔNG thay đổi 2026; cập nhật chủ yếu là vận hành. Đọc kèm `naturalization-kika.ts` để có quy trình đầy đủ.',
  searchKeywords: [
    '帰化 2026',
    'nhập tịch 2026',
    'naturalization 2026 changes',
    '国籍法 cập nhật',
    '法務局 online',
    'sau 帰化 My Number',
    '戸籍 mới Nhật',
    'cập nhật 帰化',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      'Luật 国籍法 (cơ bản KHÔNG thay đổi 2026) — quản bởi 法務省. Quy trình 帰化 tại 法務局/地方法務局 theo nơi cư trú. Cập nhật 2026 chủ yếu vận hành: hệ thống nộp + tích hợp My Number Card + 在留カード. Đọc kèm guide chính `naturalization-kika.ts` cho điều kiện đầy đủ.',
    sourceVerifiedAt: '2026-05-14',
    nextReviewAt: '2026-12-01',
    riskLevel: 'high',
    whenToAskExpert: [
      'Bạn nghe tin đồn "luật 国籍法 đổi 2026" — sự thật: cơ bản KHÔNG đổi 2026. Cập nhật chủ yếu vận hành.',
      'Bạn đang trong quá trình 帰化 vào giai đoạn 14/06/2026 (mốc 特定在留カード) — hỏi 法務局 về timing.',
      'Sau khi 帰化 hoàn tất — quy trình hủy 在留カード + cấp 戸籍 + My Number Card — chi tiết khác giữa 自治体.',
      'Trẻ em song quốc tịch sau 帰化 cha/mẹ — quyết định 国籍選択 trước 22 tuổi (luật cũ vẫn áp dụng).',
    ],
  },
  quickAction: {
    deadline:
      'KHÔNG có deadline mới riêng cho 2026. Quy trình 帰化 vẫn theo 法務局 — đặt lịch tư vấn trước 6–12 tháng. Sau khi được phép: nhận quyết định + hủy 在留カード + cấp 戸籍 + My Number Card trong vài tuần.',
    office:
      '**法務局/地方法務局** — quy trình 帰化 chính (KHÔNG đổi). **市役所/区役所** — cấp 戸籍 + My Number Card sau 帰化. **入管** — hủy 在留カード sau 帰化. **行政書士** chuyên 帰化 — tư vấn thực tế.',
    doNow: [
      'Đọc guide chính `naturalization-kika.ts` trước cho điều kiện đầy đủ + giấy tờ.',
      'Kiểm tra 法務局 chi nhánh nơi bạn cư trú — đặt lịch tư vấn.',
      'Nếu đang chuẩn bị 帰化 trước 14/06/2026: tiếp tục theo quy trình hiện hành.',
      'Sau 14/06/2026 + đang trong quy trình: hỏi 法務局 về tương tác với 特定在留カード.',
      'Sau khi được phép 帰化: chuẩn bị hủy 在留カード tại 入管 + đăng ký 戸籍 + xin My Number Card tại 市役所.',
    ],
    bring: [
      '在留カード hiện hành',
      'Hộ chiếu Việt Nam (còn hạn)',
      '住民票',
      'Tài liệu hồ sơ 帰化 (xem guide chính)',
      'Bằng + bảng điểm + 戸籍 VN dịch',
    ],
    ifLate:
      'Quy trình 帰化 không có "trễ" — chỉ xét hồ sơ. Nếu đã nộp mà có cải cách vận hành mới → 法務局 sẽ hướng dẫn cập nhật.',
    officialSourceLabels: [
      '法務省 国籍Q&A（帰化の条件）',
      '法務省 国籍法',
      '法務省 帰化許可申請（手続案内）',
      '法務省 帰化許可申請のてびき（PDF）',
      '法務省 帰化許可申請者数等の推移',
    ],
  },
  whoIsThisFor: [
    'Người Việt đã đọc guide chính `naturalization-kika.ts` + muốn biết cập nhật 2026.',
    'Người Việt đã có 永住 + cân nhắc 帰化.',
    'Người Việt đang trong quy trình 帰化 + lo lắng về thay đổi 2026.',
    'Người Việt vừa được phép 帰化 — quy trình hậu nhập tịch (hủy 在留 + cấp 戸籍 + My Number).',
    'KHÔNG dành cho: thay thế guide chính. Quy trình + điều kiện đầy đủ xem `naturalization-kika.ts`.',
  ],
  whenToDo: [
    'Bất cứ lúc nào quan tâm 帰化 + thay đổi 2026.',
    'Trước khi đặt lịch tư vấn 法務局 — đọc cả 2 guide.',
    'Sau khi được phép 帰化 — biết quy trình hậu nhập tịch.',
    'Khi nghe tin đồn "luật mới 2026" — kiểm tra ở đây.',
  ],
  whereToDo: [
    '**法務局/地方法務局** chi nhánh theo nơi cư trú — quy trình 帰化 chính (như guide chính).',
    '**市役所/区役所** sau 帰化 — đăng ký 戸籍 + cấp My Number Card.',
    '**入管** sau 帰化 — hủy 在留カード trong 14 ngày.',
    '**行政書士** chuyên 帰化 (xem guide chính cho khi cần).',
    '**Trang chính thức**: https://www.moj.go.jp/MINJI/minji78.html (法務省 帰化).',
  ],
  estimatedTime:
    'Quy trình 帰化 (như guide chính): 1–2 năm tổng (chuẩn bị 6 tháng + xét 法務局 6–12 tháng + quyết định). Cập nhật 2026 không thay đổi timeline cơ bản. Hậu 帰化: 1–2 tháng để hoàn tất hủy 在留 + cấp 戸籍 + My Number.',
  fees: [
    'Phí 帰化 chính: **MIỄN PHÍ** (theo luật) — không trả 法務局.',
    'Phí dịch + công chứng giấy tờ: 50,000–200,000円 (tùy số lượng).',
    'Phí 行政書士 (tự chọn): 200,000–500,000円 (nếu thuê).',
    'Phí 戸籍 cấp lần đầu sau 帰化: 450円/bản tại 市役所.',
    'Phí My Number Card: MIỄN PHÍ (sau 帰化 cấp với tên Nhật mới).',
    'KHÔNG có phí cập nhật mới cho 2026.',
  ],
  documentsChecklist: [
    { label: 'Hồ sơ 帰化 chính', required: true, note: 'Xem guide chính `naturalization-kika.ts` cho danh sách đầy đủ.' },
    { label: '在留カード hiện hành', required: true },
    { label: '住民票', required: true },
    { label: '戸籍 VN + dịch tiếng Nhật', required: true },
    { label: 'Bằng + bảng điểm + bằng việc làm', required: true },
    { label: '納税証明書 5 năm', required: true },
  ],
  commonMistakes: [
    'Tin "luật 国籍法 cải cách lớn 2026" → SAI. Cơ bản KHÔNG đổi. Cập nhật chủ yếu vận hành.',
    'Đợi 2027 để 帰化 với "quy định tốt hơn" → KHÔNG có quy định tốt hơn. Quy trình ổn định.',
    'Nghĩ rằng có 特定在留カード sẽ giúp 帰化 nhanh hơn → KHÔNG. 特定在留カード là cải tiến cho người vẫn là người nước ngoài, KHÔNG ảnh hưởng 帰化.',
    'Quên hủy 在留カード sau 帰化 trong 14 ngày → vi phạm luật.',
    'Quên đăng ký 戸籍 mới sau 帰化 → không có giấy tờ Nhật hợp lệ.',
    'Tin môi giới hứa "lo trọn gói 帰化 2026" với phí cao → đọc guide chính + 行政書士 niêm yết phí.',
    'Trẻ em song quốc tịch sau cha/mẹ 帰化: quên 国籍選択 trước 22 tuổi → mất quốc tịch Nhật tự động.',
  ],
  faq: [
    {
      question: 'Luật 国籍法 có thay đổi gì lớn 2026 không?',
      answer:
        '**Văn bản luật 国籍法 KHÔNG sửa, nhưng VẬN HÀNH (審査運用基準) đã siết từ 01/04/2026** — đây là điểm quan trọng cần phân biệt.\n\n**国籍法 đ.5 — văn bản luật không đổi**:\n\n1. Cư trú ở Nhật **5+ năm** liên tục (luật vẫn ghi 5年).\n2. **18 tuổi** trở lên (đã hạ từ 20 → 18 từ 01/04/2022 theo sửa 成年年齢).\n3. Hành vi đoan chính (素行).\n4. Sinh kế tự nuôi (生計).\n5. Phải từ bỏ quốc tịch hiện tại (重国籍 防止).\n6. Tuân thủ Hiến pháp Nhật.\n\n**Thay đổi VẬN HÀNH từ 01/04/2026 (theo 法務省)**:\n\n• 居住要件 vận hành: **5年 → 原則 10年** (gióng với 永住).\n• Xác nhận **5年 nộp thuế** (trước: 1年).\n• Xác nhận **2年 đóng 社会保険** (mới).\n\n→ Văn bản luật ghi "5 năm" nhưng 法務局 trong 審査 thực tế sẽ yêu cầu hồ sơ 10 năm cư trú + 5 năm thuế + 2 năm 保険. Đây là **基準運用 change**, không phải sửa luật.\n\nBối cảnh: tháng 1/2026 chính phủ ra "外国人との秩序ある共生のための総合的対応策" — đồng nhất với 永住 10 năm.\n\n**Cải cách vận hành khác 2026** (My Number, online 法務局, 特定在留カード) — không đổi điều kiện cơ bản, chỉ đổi cách nộp / quản lý.\n\nNếu nghe tin đồn "国籍法改正 2026" → SAI. Đúng là 法務省 審査運用基準 改訂.',
    },
    {
      question: 'Tôi đang trong quy trình 帰化 — có ảnh hưởng gì từ 14/06/2026 (特定在留カード)?',
      answer:
        'KHÔNG ảnh hưởng quy trình 帰化.\n\n**Trong giai đoạn chuyển tiếp**:\n\n• Hồ sơ 帰化 đã nộp trước 14/06/2026 → tiếp tục như cũ.\n• Hồ sơ nộp sau 14/06/2026 → tương tự, không đổi quy trình.\n• Nếu trong quy trình 帰化 + đến hạn gia hạn 在留カード → có thể đổi sang 特定在留カード (tự chọn) hoặc giữ 在留カード cũ.\n\n**Sau khi được phép 帰化**:\n\n• Bạn không còn là người nước ngoài → KHÔNG cần 在留カード / 特定在留カード.\n• Hủy thẻ tại 入管 trong 14 ngày.\n• Đăng ký 戸籍 mới tại 市役所 (với tên Nhật mới).\n• Xin My Number Card mới với tên Nhật (My Number cũ vẫn giữ — số不変).\n\n**Lưu ý**:\n\n• My Number cũ (từ thời còn 在留カード) KHÔNG đổi sau 帰化.\n• 戸籍 mới được tạo lần đầu khi 帰化 — có thể đăng ký là 戸籍筆頭者 (chủ hộ).\n• Nếu kết hôn với người Nhật + đã trong 戸籍 vợ/chồng → 戸籍 đổi sau 帰化.',
    },
    {
      question: 'Sau khi được phép 帰化 — quy trình cụ thể là gì?',
      answer:
        '**Bước 1 — Nhận quyết định**:\n\n• 法務局 thông báo: 帰化許可.\n• Đăng trên 官報 (Official Gazette) — chính thức.\n• Bạn nhận 帰化届出済証明書 + 身分証明書.\n\n**Bước 2 — Trong 14 ngày**:\n\n• **Hủy 在留カード**: đến 入管 trả thẻ + xin 出国予定 nếu chuẩn bị về VN visit.\n• **Đăng ký 戸籍**: đến 市役所 phòng 戸籍課 với 帰化届出済証明書.\n —Quyết định: tên Nhật mới (theo quy định ghi tên người nước ngoài → Nhật).\n —Tạo 戸籍 mới (nếu chưa có) hoặc thêm vào 戸籍 vợ/chồng Nhật.\n —Cấp 戸籍謄本 mới — dùng làm ID Nhật.\n\n**Bước 3 — My Number Card**:\n\n• Xin My Number Card mới với tên Nhật (qua 市役所).\n• My Number cũ KHÔNG đổi (số riêng cá nhân giữ nguyên).\n• Thẻ mới có thông tin Nhật.\n\n**Bước 4 — Cập nhật giấy tờ khác**:\n\n• Hộ chiếu Nhật (xin tại 都道府県 旅券課).\n• 健康保険証 + 年金 + 銀行 + 仕事 → cập nhật.\n• 運転免許証 → đổi tên.\n• 住民票 → tự động cập nhật.\n\n**Bước 5 — Thông báo với VN**:\n\n• Theo luật VN (国籍法 VN 2008 + sửa 2014): công dân VN khi nhập tịch nước ngoài tự động mất quốc tịch VN.\n• Phải thông báo Đại sứ quán VN → cấp giấy thông báo.\n• Sau đó: ra Việt Nam phải có visa.\n\n**Lưu ý quan trọng**:\n\n• Một số tài liệu VN (giấy khai sinh, kết hôn, v.v.) vẫn giữ.\n• Tài sản ở VN: vẫn giữ được (theo luật VN cho người gốc Việt).\n• Visa về VN: sau khi mất quốc tịch VN → visa du lịch hoặc 5-năm visa cho người gốc Việt (luật VN 2014).',
    },
  ],
  counterPhrases: [
    {
      jp: '帰化の手続きについて教えてください。',
      romaji: 'Kika no tetsuzuki ni tsuite oshiete kudasai.',
      vn: 'Cho tôi biết về thủ tục nhập tịch.',
      note: 'Tại 法務局.',
    },
    {
      jp: '2026年の変更について確認したいです。',
      romaji: '2026nen no henkou ni tsuite kakunin shitai desu.',
      vn: 'Tôi muốn xác nhận thay đổi 2026.',
      note: 'Tại 法務局 — sự thật KHÔNG có luật cơ bản đổi.',
    },
    {
      jp: '在留カードを返納したいです。',
      romaji: 'Zairyuu kaado o hennou shitai desu.',
      vn: 'Tôi muốn trả thẻ cư trú.',
      note: 'Tại 入管 sau khi 帰化.',
    },
    {
      jp: '新しい戸籍を作りたいです。',
      romaji: 'Atarashii koseki o tsukuritai desu.',
      vn: 'Tôi muốn tạo 戸籍 mới.',
      note: 'Tại 市役所 sau khi 帰化.',
    },
    {
      jp: '国籍選択届を提出したいです。',
      romaji: 'Kokuseki sentaku todoke o teishutsu shitai desu.',
      vn: 'Tôi muốn nộp 国籍選択届.',
      note: 'Cho trẻ em song quốc tịch — trước 22 tuổi.',
    },
  ],
  officialLinks: [
    { label: '法務省 国籍Q&A（帰化の条件）', url: 'https://www.moj.go.jp/MINJI/minji78.html' },
    { label: '法務省 国籍法', url: 'https://www.moj.go.jp/MINJI/kokusekiho.html' },
    { label: '法務省 帰化許可申請（手続案内）', url: 'https://www.moj.go.jp/ONLINE/NATIONALITY/6-2.html' },
    { label: '法務省 帰化許可申請のてびき（PDF）', url: 'https://houmukyoku.moj.go.jp/kofu/page000001_00305.pdf' },
    { label: '法務省 帰化許可申請者数等の推移', url: 'https://www.moj.go.jp/MINJI/toukei_t_minj03.html' },
  ],
  steps: [
    {
      step: 1,
      title: 'Đọc guide chính `naturalization-kika.ts` trước',
      description:
        'Guide chính đã có từ 2026-05-06 với đầy đủ:\n\n• Điều kiện 5 năm cư trú + tuổi 20+ + tài chính + tiếng Nhật.\n• Quy trình tại 法務局 — đặt lịch + tư vấn + nộp hồ sơ.\n• Giấy tờ chi tiết: 在留カード, 住民票, 戸籍 VN dịch, bằng cấp, thuế, năm, sức khỏe.\n• Thời gian xét: 6–12 tháng.\n• Lưu ý chi tiết: trẻ em song quốc tịch, kết hôn với người Nhật, đổi tên.\n\nGuide này (cập nhật 2026) là PHỤ — chỉ về thay đổi vận hành 2026.',
      documents: [],
      tip: 'Không bỏ qua guide chính — guide cập nhật này không thay thế.',
    },
    {
      step: 2,
      title: 'Hiểu rằng luật 国籍法 KHÔNG thay đổi 2026',
      description:
        '**Tin đồn vs sự thật**:\n\n• "Luật 国籍法 mới 2026" → SAI.\n• "Quy trình 帰化 dễ hơn 2026" → SAI.\n• "Phải đợi 2026 để 帰化 với quy định tốt hơn" → SAI.\n\n**Sự thật**:\n\n• Điều kiện 国籍法 đ.5 cơ bản KHÔNG đổi.\n• Quy trình 法務局 ổn định.\n• Cập nhật 2026 chủ yếu vận hành (My Number Card + online).\n\n**Tránh môi giới lừa đảo**:\n\n• "Lo trọn gói 帰化 mới 2026 cho 5–10 triệu yên" → 行政書士 hợp pháp có niêm yết phí công khai (~30–50 万円).\n• "Cải cách 2026 — phải nộp NGAY" → SAI, không có deadline mới.',
      documents: [],
      tip: 'Quy tắc vàng: kiểm tra trang 法務省 trực tiếp + 行政書士 niêm yết phí.',
    },
    {
      step: 3,
      title: 'Tương tác với 特定在留カード (14/06/2026)',
      description:
        'Trong giai đoạn 帰化:\n\n**Trước được phép 帰化**:\n\n• Vẫn là người nước ngoài → cần 在留カード (hoặc 特定在留カード mới).\n• Nếu 在留カード hết hạn trong quy trình → gia hạn như thường.\n• Có thể đổi sang 特定在留カード (tự chọn) khi gia hạn — KHÔNG bắt buộc.\n\n**Sau được phép 帰化**:\n\n• KHÔNG cần 在留カード / 特定在留カード nữa.\n• Hủy thẻ tại 入管 trong 14 ngày.\n• Đăng ký 戸籍 mới.\n\n**Lưu ý My Number Card**:\n\n• My Number Card cũ (từ thời còn 在留カード) tiếp tục dùng được sau 帰化.\n• Số My Number KHÔNG đổi.\n• Có thể đổi tên Nhật trên thẻ tại 市役所 (xin cấp lại với tên mới).',
      documents: ['在留カード', '法務局 quyết định 帰化'],
      tip: 'Không cần đổi 特定在留カード nếu đang trong quy trình 帰化 — sẽ bỏ luôn sau khi xong.',
    },
    {
      step: 4,
      title: 'Hậu 帰化 — 戸籍 + My Number Card + Passport Nhật',
      description:
        '**Trong 14 ngày sau quyết định**:\n\n1. **入管**: trả 在留カード, ký 在留資格抹消届.\n2. **市役所 phòng 戸籍課**:\n• Mang 帰化届出済証明書 (cấp bởi 法務局).\n• Quyết định tên Nhật (kanji + hiragana — theo quy định).\n• Đăng ký 戸籍 mới:\n —Tự lập 戸籍 (新戸籍): nếu chưa kết hôn Nhật.\n —Nhập 戸籍 vợ/chồng: nếu đã kết hôn Nhật.\n• Nhận 戸籍謄本 + 戸籍抄本 lần đầu.\n\n3. **市役所 phòng マイナンバー**:\n• Xin cấp lại My Number Card với tên Nhật mới.\n• Hoặc giữ thẻ cũ + đổi tên (tùy 市役所).\n• My Number không đổi.\n\n**Trong 1–2 tháng**:\n\n4. **都道府県 旅券課**: xin **hộ chiếu Nhật** (パスポート).\n• Lệ phí: 11,000円 (5 năm) hoặc 16,000円 (10 năm).\n• Mang 戸籍謄本 + ảnh + 印鑑.\n\n5. **Cập nhật các giấy tờ khác**:\n• 健康保険証 / 年金: tự động qua 市役所.\n• 銀行: đến từng ngân hàng đổi tên + thông tin.\n• 運転免許証: đến 警察 cập nhật.\n• 仕事: báo nhân sự công ty.\n• 在留カード / hộ chiếu VN cũ — giữ riêng (không vứt).\n\n6. **Thông báo Đại sứ quán VN**:\n• Đến Đại sứ quán Hà Nội / Tổng Lãnh sự TP.HCM (qua người thân ở VN hoặc gửi qua bưu điện).\n• Cấp giấy "thông báo nhập tịch nước ngoài".\n• Sau đó: ra/vào VN phải có visa.\n\n**Lưu ý dài hạn**:\n\n• Visa về VN sau mất quốc tịch:\n —**Visa du lịch** (1–3 tháng).\n —**Thị thực 5 năm cho người gốc Việt** (theo luật 2014 VN — đối với người Việt định cư nước ngoài).\n• Tài sản ở VN: vẫn giữ được (luật VN cho người gốc Việt).\n• Nghĩa vụ quân sự VN: hết.',
      documents: ['帰化届出済証明書', '戸籍謄本 mới', 'My Number Card mới', 'Hộ chiếu Nhật'],
      tip: 'Quy trình hậu 帰化 mất 1–3 tháng tổng. Chuẩn bị trước (tên Nhật + ngân hàng + cập nhật) để smooth.',
    },
    {
      step: 5,
      title: 'Trẻ em song quốc tịch sau khi cha/mẹ 帰化',
      description:
        'Quy định 国籍法 đ.14 (KHÔNG đổi 2026):\n\n**Trẻ em sinh ở Nhật trước cha/mẹ 帰化**:\n\n• Nếu cha/mẹ có quốc tịch VN khi sinh con → con tự động có quốc tịch VN.\n• Sau khi cha/mẹ 帰化 → con không tự động Nhật.\n• Phải xin **帰化** cho con riêng (nếu muốn).\n\n**Trẻ em sinh ở Nhật sau cha/mẹ 帰化**:\n\n• Cha/mẹ đã là người Nhật khi sinh → con tự động Nhật.\n• Nếu cha/mẹ khác là VN → con song quốc tịch.\n\n**Trẻ em sinh ở VN sau cha/mẹ 帰化 (1 trong 2)**:\n\n• Theo luật Nhật: con có quyền nhận quốc tịch Nhật.\n• Đăng ký với Đại sứ quán Nhật ở VN trong 3 tháng.\n• Theo luật VN 2014: con vẫn có quyền nhận quốc tịch VN nếu sinh ở VN.\n\n**国籍選択 (chọn quốc tịch — đ.14 国籍法)**:\n\n• Áp dụng cho **trẻ em song quốc tịch** sinh sau 1/1/1985.\n• Phải chọn 1 quốc tịch **trước 22 tuổi**.\n• Cách chọn:\n —**Chọn quốc tịch Nhật**: nộp 国籍選択届 + 外国国籍喪失届 (cố gắng từ bỏ quốc tịch nước ngoài).\n —**Chọn quốc tịch nước ngoài**: tự động mất quốc tịch Nhật.\n —**Không chọn**: 22 tuổi tự động cảnh cáo, sau đó có thể mất quốc tịch Nhật theo quyết định 法務省.\n\n**Lưu ý**:\n\n• Luật Nhật KHÔNG chấp nhận 重国籍 chính thức (nhưng trên thực tế nhiều người có).\n• Luật VN 2008/2014 cho phép giữ quốc tịch VN khi nhận quốc tịch nước ngoài (đơn xin riêng).\n• Phức tạp — tham vấn 弁護士 chuyên 国際家族法.\n\nXem thêm: guide chính `naturalization-kika.ts` cho điều kiện đầy đủ.',
      documents: [],
      tip: '国籍選択 quan trọng cho trẻ em song quốc tịch. Lên kế hoạch từ năm 18 — không đợi 22 tuổi.',
    },
  ],
};

export default naturalizationKika2026Changes;
