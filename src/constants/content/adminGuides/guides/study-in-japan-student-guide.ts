import type { AdminGuide } from '../../../../types/content';

const studyInJapanStudentGuide: AdminGuide = {
  id: 'study-in-japan-student-guide',
  category: 'visa',
  lastVerified: '2026-05-14',
  priority: 'normal',
  title: 'Du học Nhật — visa 留学, trường tiếng + chuyên môn, học bổng, アルバイト',
  titleJp: '留学ガイド — 在留資格「留学」 + 学校選択 + 奨学金',
  icon: 'school-outline',
  color: '#2E86C1',
  description:
    'Du học Nhật theo visa **「留学」** dành cho: 日本語学校 (trường tiếng Nhật), 専門学校 (cao đẳng nghề), 大学 (đại học), 大学院 (cao học). Phải có **入学許可書** (giấy nhập học) + **COE 在留資格認定証明書** trước khi xin visa tại Đại sứ quán. Cho phép アルバイト max 28 giờ/tuần với 資格外活動許可. Học bổng MEXT / JASSO / địa phương / tư có sẵn nhưng cạnh tranh cao. Sau tốt nghiệp có thể chuyển 就活 (đặc定活動46) hoặc visa 技人国 nếu có job offer.',
  searchKeywords: [
    'du học Nhật',
    'visa du học',
    'visa 留学',
    'COE Nhật',
    '日本語学校',
    '専門学校',
    '大学',
    '大学院',
    'học phí Nhật',
    'học bổng MEXT',
    'JASSO',
    'arubaito du học',
    '28時間',
    '資格外活動',
    'sinh viên Việt Nhật',
    '就活',
    '特定活動46',
    'tokutei katsudo 46',
    '専門学校 vs 大学',
    '留学生',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      'Visa 留学 quản lý bởi 出入国在留管理庁 (ISA). Trường công nhận theo cấp 文部科学省 (MEXT) cho 大学 / 大学院 + 私学法 cho 専門学校 + 各種学校 cho 日本語学校 (cần 法務省告示 mới đủ điều kiện cho visa). Học bổng MEXT do MOFA / 在外公館 quản — JASSO + tư khác quản lý riêng. アルバイト 28 giờ/tuần: cứng — vi phạm có thể bị huỷ visa.',
    sourceVerifiedAt: '2026-05-14',
    nextReviewAt: '2026-12-01',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Trường không có trong danh sách 法務省告示 → KHÔNG được xin visa 留学. Kiểm tra với 留学生支援 / 行政書士 trước khi đóng tiền.',
      'Visa từ chối lần 1 → kháng nghị / nộp lại — cần 行政書士 hoặc 弁護士 chuyên 入管.',
      'Vi phạm 28 giờ/tuần → bị phát hiện có thể từ chối gia hạn / huỷ visa. Tham vấn ngay nếu lỡ làm quá.',
      'Sau tốt nghiệp chưa tìm được job + visa 留学 hết hạn → chuyển 特定活動 (visa tìm việc 1 năm) — tham vấn 行政書士.',
      'Học bổng MEXT từ Việt Nam — cạnh tranh, hỏi 在ベトナム日本大使館 / JASSO.',
    ],
  },
  quickAction: {
    deadline:
      'Lịch trình chuẩn: khai giảng tháng 4 (春) hoặc tháng 10 (秋). Nộp hồ sơ COE: **6 tháng trước khai giảng** (vd nhập 4/2027 → nộp 10/2026). Sau COE → xin visa tại Đại sứ quán ~2 tuần. Nhập cảnh **trong 3 tháng** sau khi cấp COE — quá hạn vô hiệu.',
    office:
      '**Trường (日本語学校 / 専門学校 / 大学)** — nộp hồ sơ nhập học. **出入国在留管理庁 (ISA)** — xét COE qua trường. **在ベトナム日本大使館 (Hà Nội) / Tổng Lãnh sự (TP.HCM)** — xét visa sau khi có COE. **JASSO** + **MEXT** — học bổng. **東京入管 / 各地入管** — gia hạn + chuyển visa sau khi sang.',
    doNow: [
      'Quyết định loại trường: **日本語学校** (1–2 năm tiếng Nhật) → **専門学校** (2 năm nghề) / **大学** (4 năm) / **大学院** (2–3 năm).',
      'Search 法務省告示 trường — kiểm tra trường có được cấp visa 留学 không (KHÔNG mọi trường tiếng đều có).',
      'Nộp hồ sơ trường — cần: 学歴 + 経歴 + 経費支弁書 + 在留資格認定証明書交付申請書.',
      'Trường nộp xin COE qua ISA — đợi 2–3 tháng (春 vào học 4 → nộp 10 năm trước; 秋 → nộp 5 năm trước).',
      'Nhận COE → mang đến Đại sứ quán Nhật ở Việt Nam xin visa 留学 (~2 tuần).',
    ],
    bring: [
      'Hộ chiếu còn hạn 1+ năm',
      'Tốt nghiệp THPT / 高校卒業証明書 (cho 日本語学校) hoặc 大学卒業証明書 (cho 大学院)',
      'Bảng điểm 成績証明書',
      'Chứng chỉ N5+ tiếng Nhật (tốt là N5–N3 tùy trường)',
      '経費支弁書 — sponsor tài chính',
      '預金残高証明書 — sổ tiết kiệm 1.5–3 triệu yên',
      'Ảnh 4x3 nền trắng',
      'Lý lịch + résumé + Statement of Purpose',
    ],
    ifLate:
      'Đã quá hạn nộp COE cho kỳ春 → đợi kỳ秋 (vào học tháng 10) — nộp tháng 3–5. Đã quá hạn cả 2 kỳ trong năm → chuẩn bị cho năm sau. KHÔNG nên xin visa 短期滞在 rồi cố chuyển sang 留学 ở Nhật — đa số trường hợp ISA từ chối.',
    officialSourceLabels: ['出入国在留管理庁 (ISA)', '文部科学省 (MEXT)'],
  },
  whoIsThisFor: [
    'Học sinh Việt Nam vừa tốt nghiệp THPT muốn sang Nhật học 日本語学校 + tiếp 専門学校 / 大学.',
    'Sinh viên Việt Nam đã tốt nghiệp cao đẳng / đại học muốn học 大学院 ở Nhật.',
    'Người Việt đã làm việc muốn nghỉ việc + sang Nhật học lại.',
    'Người Việt đang ở Nhật visa khác muốn chuyển sang 留学 (vd 家族滞在 → 留学).',
    'Phụ huynh Việt Nam muốn hiểu chi phí + quy trình con đi du học.',
    'Du học sinh đang ở Nhật cần biết quy tắc アルバイト 28 giờ / nhập cảnh / gia hạn.',
    'Du học sinh sắp tốt nghiệp cần biết chuyển sang 就活 visa hoặc 特定活動46.',
    'KHÔNG dành cho: người chỉ muốn sang Nhật làm việc (visa lao động khác). Du học Nhật KHÔNG phải con đường ngắn để làm việc.',
  ],
  whenToDo: [
    '**Trước 2–3 năm**: tự học tiếng Nhật cơ bản, tìm hiểu trường, tích lũy tài chính.',
    '**1 năm trước**: chọn trường + chuẩn bị hồ sơ + chứng chỉ N5+.',
    '**6 tháng trước khai giảng**: nộp hồ sơ COE qua trường.',
    '**2–3 tháng trước**: nhận COE → xin visa tại Đại sứ quán.',
    '**1 tháng trước**: thuê nhà / ký túc xá + đặt vé.',
    '**Khi sang**: 役所 đăng ký 住民票 + 健康保険 + ngân hàng + SIM + 在留カード updates.',
    '**Trong 14 ngày sau sang**: 住民登録 tại 市役所.',
    '**Trong 14 ngày sau bắt đầu アルバイト**: xin 資格外活動許可 ở 入管.',
    '**3 tháng trước hết hạn visa**: gia hạn 在留期間更新申請.',
    '**Năm cuối**: 就職活動 — bắt đầu sớm (大学院: tháng 3 năm trước; 大学: 3 tháng năm 3; 専門学校: ngay năm 1).',
  ],
  whereToDo: [
    '**Trường (chọn loại)**:\n• **日本語学校** (~700 trường có 法務省告示): 1–2 năm, học tiếng + chuẩn bị thi 大学/専門学校.\n• **専門学校** (2 năm): học nghề (IT, ẩm thực, thiết kế, ngôn ngữ, y tế phụ trợ).\n• **大学** (4 năm): cử nhân, đa ngành.\n• **大学院** (修士 2 năm / 博士 3+ năm): cao học.',
    '**Cơ quan visa**:\n• **入管 (ISA)**: xét COE.\n• **在ベトナム日本大使館 (Hà Nội)** + **大阪 + 福岡 vùng**: xét visa từ Việt Nam.\n• **東京入管 / 大阪入管 / 福岡入管 / etc.**: gia hạn + chuyển visa sau khi sang.',
    '**Học bổng**:\n• **MEXT** (Monbukagakusho): qua 在ベトナム日本大使館 — cạnh tranh cao.\n• **JASSO**: cho học sinh đã ở Nhật.\n• **学校独自**: học bổng từ trường — giảm 30–100% học phí.\n• **私的 (tư)**: 立志財団, 共立メンテナンス, các tập đoàn.\n• **地方自治体**: học bổng từ 都道府県 / 市町村.',
    '**Hỗ trợ**:\n• **JASSO** website: thông tin trường + học bổng.\n• **Study in Japan** trang chính thức của MEXT.\n• **国際交流協会** mỗi 都道府県 — hỗ trợ du học sinh.\n• **行政書士** chuyên 入管 — visa khó / kháng nghị.',
  ],
  estimatedTime:
    'Chuẩn bị hồ sơ + nộp trường: 1–3 tháng. Trường xét: 2–4 tuần. COE xét tại ISA: 2–3 tháng. Visa Đại sứ quán: 1–2 tuần. Tổng: 6–8 tháng từ bắt đầu đến nhập cảnh. **日本語学校**: 1–2 năm. **専門学校**: 2 năm. **大学**: 4 năm. **大学院**: 2–3 năm. **就活 sau tốt nghiệp**: 3–12 tháng.',
  fees: [
    '**Học phí năm 1 (tham khảo 2024–2026)**:\n• **日本語学校**: 600,000–900,000円/năm + 入学金 30,000–100,000円.\n• **専門学校**: 800,000–1,500,000円/năm + 入学金 100,000–300,000円.\n• **国公立大学**: 535,800円/năm (cố định) + 入学金 282,000円.\n• **私立大学** (文系): 800,000–1,200,000円/năm.\n• **私立大学** (理系/医): 1,200,000–4,000,000円/năm.\n• **大学院 国立**: 535,800円/năm.\n• **大学院 私立**: 800,000–1,800,000円/năm.',
    '**Sinh hoạt phí ở Nhật** (tham khảo):\n• Tokyo / Osaka / Yokohama: 120,000–180,000円/tháng.\n• Thành phố trung: 90,000–130,000円/tháng.\n• Vùng quê: 70,000–100,000円/tháng.\n• Bao gồm: thuê nhà 30,000–80,000円, ăn 30,000–50,000円, điện/gas/nước 8,000–15,000円, điện thoại 3,000–8,000円, đi lại 3,000–15,000円, khác.',
    '**Tổng 1 năm du học**:\n• 日本語学校 + sinh hoạt: 1.8–2.5 triệu yên.\n• 専門学校 + sinh hoạt: 2.0–3.0 triệu yên.\n• 大学 + sinh hoạt: 1.5–4 triệu yên.\n• 大学院 + sinh hoạt: 1.7–3.0 triệu yên.',
    '**経費支弁書 cần thiết**: trường yêu cầu chứng minh có >1.5–3 triệu yên trong tài khoản (gia đình hoặc bản thân).',
    '**アルバイト thu nhập tối đa** (28 giờ/tuần):\n• Lương min 1,100–1,200円/giờ ở Tokyo (2026).\n• 28 giờ x 1,100円 x 4 tuần = ~123,000円/tháng tối đa.\n• Trong 春/夏 nghỉ dài (40 ngày liên tục): tăng lên 40 giờ/tuần — cao điểm.\n• Annual: 1.5–2 triệu yên tham khảo.',
    '**Học bổng (giảm chi phí)**:\n• MEXT: toàn phần (học phí + sinh hoạt 117,000–145,000円/tháng + vé máy bay).\n• JASSO Honor: 48,000–80,000円/tháng cho học sinh đã ở Nhật.\n• 学校独自: giảm 30–100% học phí.\n• 立志財団: 60,000–80,000円/tháng + học phí.',
  ],
  documentsChecklist: [
    { label: 'Hộ chiếu còn hạn 1+ năm', required: true, note: 'Nếu sắp hết, làm lại trước.' },
    { label: 'Tốt nghiệp THPT (高校卒業証明書)', required: true, note: 'Bản gốc + dịch tiếng Nhật công chứng cho 日本語学校.' },
    { label: 'Bảng điểm THPT (成績証明書)', required: true, note: 'Dịch + công chứng.' },
    { label: 'Tốt nghiệp + bảng điểm 大学', required: false, note: 'Bắt buộc cho 大学院.' },
    { label: 'Chứng chỉ tiếng Nhật N5+', required: false, note: 'Một số trường yêu cầu N5. Cao học cần N2.' },
    { label: '経費支弁書 (sponsor tài chính)', required: true, note: 'Cha mẹ ký + 印鑑 + giấy tờ chứng minh thu nhập.' },
    { label: '預金残高証明書', required: true, note: 'Sổ tiết kiệm 1.5–3 triệu yên — ngân hàng cấp.' },
    { label: '勤務証明書 cha mẹ', required: true, note: 'Giấy xác nhận công việc + lương cha mẹ.' },
    { label: '所得証明書 cha mẹ', required: true, note: 'Giấy chứng minh thu nhập 3 năm gần nhất.' },
    { label: '住民票 cha mẹ Việt Nam', required: true, note: 'Hộ khẩu / giấy xác nhận cư trú.' },
    { label: 'Ảnh 4x3 nền trắng', required: true, note: '4–8 tấm cho hồ sơ.' },
    { label: 'Lý lịch + Statement of Purpose', required: true, note: 'Viết tiếng Nhật hoặc Anh — lý do du học.' },
    { label: 'COE 在留資格認定証明書', required: true, note: 'Nhận sau khi trường nộp ISA — mang đến Đại sứ quán.' },
  ],
  commonMistakes: [
    'Chọn trường 日本語学校 không có 法務省告示 → KHÔNG được visa 留学. Kiểm tra danh sách trên trang 入管 trước.',
    'Tin "đi 日本語学校 1 năm là làm việc được" → SAI. Visa 留学 không cho phép làm việc full-time. Phải tốt nghiệp + chuyển visa.',
    'Vượt 28 giờ/tuần アルバイト → bị phát hiện có thể từ chối gia hạn visa.',
    'Không xin 資格外活動許可 mà đi làm → vi phạm immigration → có thể bị deport.',
    'Khai 経費支弁 sai (giả) → ISA phát hiện → từ chối + cấm 5 năm.',
    'Không nộp 在留カード updates khi chuyển nhà / đổi trường → vi phạm.',
    'Tin "đến Nhật rồi tìm trường" → KHÔNG được. Phải có COE trước khi sang.',
    'Quên gia hạn visa 3 tháng trước hết hạn → ở quá hạn = overstay → nghiêm trọng.',
    'Tốt nghiệp xong không tìm việc + không chuyển visa → quá hạn visa留学 → phải về.',
    'Tin "công ty du học bao trọn" → kiểm tra kỹ. Nhiều công ty thật nhưng cũng có lừa đảo "bảo đảm visa" → cẩn thận.',
    'Cho người khác mượn 在留カード → bị phát hiện = huỷ visa.',
    'Vay nóng "du học" lãi suất cao → không trả được + lừa đảo phổ biến. Chỉ vay qua kênh chính thức (gia đình / 銀行).',
  ],
  faq: [
    {
      question: '日本語学校 vs 専門学校 vs 大学 — chọn cái nào?',
      answer:
        '**日本語学校** (1–2 năm):\n• Bạn KHÔNG biết tiếng Nhật → bắt buộc qua đây trước.\n• Mục đích: học tiếng + chuẩn bị thi 大学/専門学校.\n• Học phí: 600,000–900,000円/năm.\n• Sau tốt nghiệp KHÔNG được làm việc — phải tiếp 専門/大学 hoặc về nước.\n• Lên N2 trong 1–2 năm là phổ biến.\n\n**専門学校** (2 năm):\n• Học nghề cụ thể: IT, ẩm thực, thiết kế, ngôn ngữ, y tế phụ trợ, văn phòng.\n• Cần N2 trở lên thường.\n• Học phí: 800,000–1,500,000円/năm.\n• Sau tốt nghiệp → bằng 専門士 / 高度専門士.\n• Có thể chuyển 技人国 visa nếu chuyên ngành match.\n• Ngắn hơn 大学, ứng dụng nhiều hơn.\n\n**大学** (4 năm):\n• Bằng cử nhân chính thức.\n• Cần N1 hoặc N2 cao + thi 留学生試験 (EJU).\n• Học phí: 535,800円/năm (国公立) đến 1.2 triệu (私立).\n• Linh hoạt chọn ngành rộng.\n• Tốt cho chuyển 大学院 + 技人国 / 高度専門職.\n• Network sinh viên Nhật mạnh.\n\n**大学院** (修士 2 / 博士 3+):\n• Cần đã tốt nghiệp 大学.\n• Cần N2+ + nghiên cứu plan + giáo sư nhận.\n• Học phí: 535,800円/năm (国公立) đến 1.8 triệu (私立).\n• Học bổng nhiều cho 大学院.\n• Hướng học thuật + R&D.\n\n**Lộ trình phổ biến cho người Việt**:\n\n1. **THPT VN → 日本語学校 1–2 năm → 専門学校 2 năm**: 3–4 năm, chi phí 4–6 triệu yên, kết quả 専門士 + N2.\n2. **THPT VN → 日本語学校 1 năm → 大学 4 năm**: 5 năm, chi phí 5–8 triệu yên, kết quả cử nhân + N1.\n3. **Đại học VN → 日本語学校 6–12 tháng → 大学院 2 năm**: 3 năm, chi phí 3–5 triệu yên, kết quả 修士.\n4. **Đại học VN có tiếng Nhật + Anh → 大学院 trực tiếp**: 2 năm, chi phí 2–4 triệu yên — nhanh nhất.',
    },
    {
      question: 'Học bổng MEXT khó không? Làm sao xin?',
      answer:
        '**MEXT (文部科学省) học bổng** — học bổng lớn nhất + toàn phần:\n\n**Loại**:\n• **大学院** (research): 2–5 năm, 145,000円/tháng + học phí + vé máy bay.\n• **大学**: 5 năm (gồm 1 năm dự bị), 117,000円/tháng.\n• **専修学校 (chuyên môn)**: 3 năm.\n• **教員研修**: cho giáo viên.\n• **日本研究**: 6–12 tháng cho sinh viên đại học.\n• **ヤング・リーダーズ・プログラム (YLP)**: dành cho cán bộ trẻ.\n\n**Quy trình**:\n\n1. **大使館推薦** (qua Đại sứ quán):\n• Nộp hồ sơ tại **在ベトナム日本大使館** (Hà Nội) hoặc Tổng Lãnh sự (TP.HCM).\n• Nộp tháng 4–6 hằng năm.\n• Thi viết + phỏng vấn 7–8.\n• Kết quả 1.\n• Sang Nhật 4 hoặc 10.\n\n2. **大学推薦** (qua trường):\n• Liên hệ trực tiếp 大学 muốn vào.\n• Nộp tháng 10–12 năm trước.\n• Cạnh tranh trong từng 大学.\n\n**Tỷ lệ trúng**:\n• 大使館推薦: ~5–10% (cạnh tranh cao toàn quốc).\n• 大学推薦: 20–50% trong trường đã nhận hồ sơ.\n\n**Điều kiện**:\n• Tuổi: dưới 35 (大学院 research), dưới 25 (大学 cử nhân).\n• Bằng + bảng điểm cao.\n• Tiếng Nhật N2+ hoặc tiếng Anh cao (TOEFL/IELTS).\n• Sức khỏe tốt.\n\n**Hồ sơ**:\n• Application form.\n• Statement of Purpose.\n• Recommendation letters.\n• Research plan (cho 大学院).\n• Health check.\n• Bằng + bảng điểm.\n\n**Lựa chọn nếu không trúng MEXT**:\n• **JASSO Honor**: 48,000–80,000円/tháng cho sinh viên đã ở Nhật.\n• **学校独自**: giảm 30–100% học phí (cạnh tranh ít hơn).\n• **立志財団**, **共立メンテナンス**, **ロータリー米山**: học bổng tư.\n• **地方自治体**: 都道府県/市町村 có học bổng.\n• Vay học **JASSO 第一種**: lãi 0% (cho học sinh đã sang Nhật).',
    },
    {
      question: 'アルバイト 28 giờ/tuần — quy tắc cụ thể là gì?',
      answer:
        '**Quy tắc cứng**:\n\n• Visa 留学 + 資格外活動許可 → max **28 giờ/tuần** trong kỳ học.\n• Trong kỳ nghỉ dài (春/夏/冬 — ≥1 tuần): **40 giờ/tuần** (8 giờ/ngày).\n• KHÔNG được làm: 風俗営業 (đặc biệt: hostess, パチンコ, ナイトクラブ).\n• KHÔNG được: tự do tự kinh doanh (vd freelance > 28h cũng vi phạm).\n\n**Tính 28 giờ**:\n\n• Tính theo tuần (月曜～日曜).\n• Tổng tất cả công việc cộng lại.\n• Vd 2 việc làm 14 giờ + 14 giờ = OK. 16 + 14 = 30 giờ → vi phạm.\n• KHÔNG tính giờ nghỉ giải lao trong ca.\n\n**資格外活動許可 cách xin**:\n\n1. Trong 14 ngày sau bắt đầu アルバイト (hoặc trước khi bắt đầu).\n2. Đến 入管 gần nhất.\n3. Mang: 在留カード, パスポート, đơn 資格外活動許可申請.\n4. MIỄN PHÍ.\n5. 入管 đóng dấu lên 在留カード — "資格外活動許可済 (週28時間以内・風俗営業等の従事を除く)".\n\n**Hệ quả vi phạm**:\n\n• Phát hiện qua: 税務署 (đóng thuế nhiều), 雇用保険記録, 風俗業 (Police).\n• Lần 1: cảnh báo + có thể từ chối gia hạn visa lần sau.\n• Lần 2 hoặc nghiêm trọng: **huỷ visa 留学 + deport + cấm 5 năm**.\n• Trường có thể đuổi.\n\n**Cách tránh vi phạm**:\n\n• Theo dõi giờ làm hằng tuần (app / spreadsheet).\n• Báo với chủ trước khi nhận thêm việc.\n• Trong 春/夏/冬 nghỉ: clarify với chủ "kỳ nghỉ dài" trước khi tăng giờ.\n• Tốt nhất: 1 việc 24 giờ/tuần để có dư an toàn.\n\n**Lương tham khảo (Tokyo 2026)**:\n• Min wage: ~1,113円/giờ (đổi 10).\n• コンビニ: 1,100–1,400円.\n• 飲食店: 1,100–1,400円.\n• Tutor / IT part-time: 1,500–3,000円.\n• 28 x 1,200円 x 4 = ~134,000円/tháng tối đa.',
    },
    {
      question: 'Tốt nghiệp xong chưa tìm được việc — phải làm gì?',
      answer:
        '**Visa 留学** hết hạn khi tốt nghiệp. Cần chuyển:\n\n**Option 1: 特定活動 (visa tìm việc)** — phổ biến nhất:\n\n• Cho 大学卒 + 専門学校 (高度専門士 / 専門士) đang 就活.\n• Thời hạn: 6 tháng × 2 (tổng 1 năm tối đa).\n• Điều kiện:\n  - Đang 就職活動 thực sự (chứng minh entry forms, kết quả phỏng vấn).\n  - Trường giới thiệu.\n  - Đủ tiền sinh hoạt.\n• Cho phép làm アルバイト 28 giờ/tuần (xin lại 資格外活動).\n• KHÔNG cho phép làm full-time chính thức.\n• Xin tại 入管 trước khi visa 留学 hết hạn.\n\n**Option 2: 特定活動46 (高度人材育成型)** — cho tốt nghiệp大学卒+ N1:\n\n• Cho 大学卒 + N1 + công ty offer.\n• Lương ≥ giá trị thị trường công việc.\n• Linh hoạt hơn 技人国 — có thể làm việc liên quan dịch vụ / bán hàng (mà 技人国 không cho).\n• Xem guide tokutei-katsudo-46-job-hunt chi tiết.\n\n**Option 3: 技術・人文知識・国際業務 (技人国)**:\n\n• Có job offer phù hợp chuyên ngành đã học.\n• Lương "正社員" tương đương người Nhật.\n• Visa 1–5 năm.\n• Chuyển trực tiếp từ 留学 với job offer.\n\n**Option 4: Học tiếp**:\n\n• Chuyển sang trường khác (vd 専門学校 → 大学院).\n• Mở rộng visa 留学.\n\n**Option 5: Về Việt Nam tạm**:\n\n• Nếu không có option nào — về VN rồi tìm việc → xin visa 技人国 từ VN.\n• Hoặc xin Working Holiday (visa 1 năm) — quay lại Nhật làm tạm.\n\n**KHÔNG NÊN**:\n\n• Overstay (quá hạn visa) — nghiêm trọng, có thể bị cấm 5–10 năm.\n• Chuyển sang visa fake / sai mục đích (vd kết hôn giả) — phát hiện = deport + cấm vĩnh viễn.\n• Tin "công ty bao trọn visa cho 30 triệu" — đa số lừa đảo.\n\n**Quy trình 特定活動 xin việc**:\n\n1. **Trước khi 留学 hết hạn** (1–2 tháng):\n• Lấy 推薦書 từ trường (đa số trường tự động cấp cho 卒業生 đang 就活).\n• 申請書 + 在留カード + パスポート + 履歴書 + chứng cứ 就活 (emails, kết quả).\n2. Đến 入管 nộp.\n3. Đợi 2–4 tuần.\n4. Nhận 在留カード mới (visa 特定活動).\n5. アルバイト 28 giờ — xin lại 資格外活動.\n\n**Hết 6 tháng đầu**:\n• Vẫn 就活 → xin gia hạn 6 tháng (lần 2 cuối).\n• Có offer → chuyển 技人国 / 特定活動46.\n• Không có offer + không gia hạn được → về VN.',
    },
    {
      question: 'Cho người Việt — kinh nghiệm sống ở Nhật cho du học sinh?',
      answer:
        '**Tài chính**:\n\n• Lên ngân sách 1 tháng — track chi tiêu (app マネーフォワード, Zaim).\n• Mua thẻ học sinh giảm giá (映画館, 美術館, 交通).\n• Sử dụng dịch vụ trợ giúp du học sinh: cơm rẻ tại 学生食堂, sách cũ qua メルカリ.\n• Đăng ký 国民健康保険 → ~20,000円/năm cho học sinh (giảm).\n• 年金 — đăng ký 学生納付特例 → hoãn đóng đến sau tốt nghiệp.\n\n**Ở**:\n\n• 学生寮 trường: 30,000–60,000円/tháng (rẻ nhất).\n• シェアハウス: 50,000–80,000円/tháng (có internet + nội thất).\n• Thuê riêng: 50,000–80,000円 rural / 80,000–150,000円 Tokyo (+ 礼金 / 敷金).\n• URエル: 公社 ít 礼金, dễ cho 外国人.\n\n**Ăn**:\n\n• 学生食堂: 300–500円/bữa.\n• コンビニ お弁当: 400–600円.\n• Tự nấu: 15,000–30,000円/tháng — rẻ nhất.\n• Siêu thị giảm giá: 業務スーパー, ドン・キホーテ.\n\n**Đi lại**:\n\n• 学生定期: giảm 50–80% phí tàu/bus.\n• Xe đạp: 5,000–20,000円 cho cũ.\n• Đi bộ + xe đạp tránh phí xe buýt nội thành.\n\n**Cộng đồng**:\n\n• **VYSA** (Vietnamese Youth and Students Association): hội sinh viên Việt — sự kiện văn hóa, giúp đỡ.\n• **Chùa Việt**: lễ Tết, hỗ trợ tâm linh + kết nối.\n• **Trường国際交流** office: tư vấn miễn phí.\n• **Bạn cùng lớp Nhật**: 言語交換 + kết nối文化.\n\n**Sức khỏe**:\n\n• **健康診断** miễn phí 1 lần/năm tại trường.\n• Bệnh nhẹ: 内科 gần nhà — 30% tự trả với bảo hiểm.\n• Mental health: 学生相談室 trường + AMDA (xem mental-health guide).\n\n**Tránh cạm bẫy**:\n\n• Lừa đảo "trường ma" — kiểm tra 法務省告示.\n• Lừa đảo việc làm: "lương cao" trong 風俗業 — KHÔNG.\n• Lừa đảo cho mượn 在留カード — tuyệt đối không.\n• Vay nóng 闇金 — KHÔNG.\n• Network marketing (マルチ商法) bạn cùng lớp rủ → cẩn thận.\n• Quan hệ tình cảm nhanh ép cưới hoặc đầu tư → cẩn thận.\n\n**Sau tốt nghiệp**:\n\n• Bắt đầu 就活 SỚM (năm 3 của 大学, ngay 専門学校 năm 1).\n• ハローワーク có 留学生コーナー miễn phí.\n• 留学生向け 就活フェア — đi nhiều.\n• Network qua sempai (bạn khóa trên đã đi làm).',
    },
  ],
  counterPhrases: [
    {
      jp: '留学ビザを申請したいです。',
      romaji: 'Ryuugaku biza o shinsei shitai desu.',
      vn: 'Tôi muốn xin visa du học.',
      note: 'Tại Đại sứ quán hoặc 入管.',
    },
    {
      jp: '在留資格認定証明書を発行してください。',
      romaji: 'Zairyuu shikaku nintei shoumeisho o hakkou shite kudasai.',
      vn: 'Xin cấp giấy COE.',
      note: 'Qua trường.',
    },
    {
      jp: '資格外活動許可を申請したいです。',
      romaji: 'Shikaku-gai katsudou kyoka o shinsei shitai desu.',
      vn: 'Tôi muốn xin phép làm part-time.',
      note: 'Tại 入管 — miễn phí, xin sau khi sang.',
    },
    {
      jp: '在留期間を更新したいです。',
      romaji: 'Zairyuu kikan o koushin shitai desu.',
      vn: 'Tôi muốn gia hạn visa.',
      note: '3 tháng trước hết hạn — tại 入管.',
    },
    {
      jp: '奨学金について教えてください。',
      romaji: 'Shougakukin ni tsuite oshiete kudasai.',
      vn: 'Cho tôi biết về học bổng.',
      note: 'Tại trường hoặc JASSO.',
    },
    {
      jp: '就職活動のため、特定活動に変更したいです。',
      romaji: 'Shuushoku katsudou no tame, tokutei katsudou ni henkou shitai desu.',
      vn: 'Tôi muốn chuyển sang visa tìm việc.',
      note: 'Sau tốt nghiệp, tại 入管 trước khi visa留学 hết hạn.',
    },
    {
      jp: 'アルバイトをしたいのですが、何時間まで働けますか。',
      romaji: 'Arubaito o shitai no desu ga, nan-jikan made hatarakemasu ka.',
      vn: 'Tôi muốn làm thêm — được làm bao nhiêu giờ?',
      note: 'Hỏi 28 hoặc 40 (kỳ nghỉ).',
    },
    {
      jp: '入学許可書をいただきました。',
      romaji: 'Nyuugaku kyokasho o itadakimashita.',
      vn: 'Tôi đã nhận giấy nhập học.',
      note: 'Tại Đại sứ quán khi nộp visa.',
    },
    {
      jp: '学費の支払い方法を教えてください。',
      romaji: 'Gakuhi no shiharai houhou o oshiete kudasai.',
      vn: 'Cho tôi biết cách thanh toán học phí.',
      note: 'Tại trường — đa số chuyển khoản hằng kỳ.',
    },
  ],
  officialLinks: [
    { label: '出入国在留管理庁 (ISA)', url: 'https://www.isa.go.jp/' },
    { label: '文部科学省 (MEXT) — Study in Japan', url: 'https://www.studyinjapan.go.jp/' },
    { label: 'JASSO (Japan Student Services Organization)', url: 'https://www.jasso.go.jp/' },
    { label: 'MEXT 国費外国人留学生', url: 'https://www.mext.go.jp/a_menu/koutou/ryugaku/' },
    { label: '法務省告示日本語教育機関 (danh sách 日本語学校 đủ điều kiện visa)', url: 'https://www.moj.go.jp/isa/policies/policies/2024-2025-japanese-edu.html' },
  ],
  steps: [
    {
      step: 1,
      title: 'Quyết định loại trường + lộ trình',
      description:
        '**Câu hỏi tự trả lời**:\n\n1. **Tiếng Nhật hiện tại**: N5 / N4 / N3 / N2 / không biết?\n• Không biết → BẮT BUỘC 日本語学校 1–2 năm trước.\n• N5–N4 → 日本語学校 6–12 tháng.\n• N3 → có thể vào 大学 dự bị, 専門学校 ngôn ngữ.\n• N2 → vào 大学 / 専門学校 trực tiếp được.\n• N1 → vào 大学院 được.\n\n2. **Bằng cấp hiện tại**:\n• THPT VN → 日本語学校 → 専門/大学.\n• 大学 VN → 日本語学校 ngắn → 大学院 hoặc trực tiếp 大学院 nếu N2+.\n• 院 VN → 大学院 trực tiếp.\n\n3. **Mục tiêu nghề nghiệp**:\n• Làm việc ở Nhật: 大学 + N1 + 技人国 mạnh hơn 専門学校.\n• Nghề chuyên môn cụ thể (IT, ẩm thực, thiết kế): 専門学校 ứng dụng tốt.\n• Nghiên cứu / giảng dạy: 大学院 cần thiết.\n• Khởi nghiệp: 大学 + business manager visa sau (xem business-manager-visa-2025).\n\n4. **Ngân sách**:\n• <3 triệu yên/năm tổng: 国公立 + アルバイト + học bổng cần thiết.\n• 3–5 triệu yên/năm: 私立 ổn.\n• >5 triệu yên/năm: 医・歯・薬 OK.\n\n5. **Vị trí muốn ở**:\n• Tokyo: cơ hội nhiều nhất, đắt nhất.\n• Osaka / Yokohama / Nagoya: cân bằng.\n• Vùng quê: rẻ + ít cạnh tranh nhưng ít công việc sau.\n\n**Lộ trình phổ biến cho người Việt**:\n\n**Lộ trình A (3–4 năm, kinh tế nhất)**:\n• THPT VN → 日本語学校 1.5 năm → 専門学校 IT/ẩm thực 2 năm → 技人国 sau.\n\n**Lộ trình B (5 năm, bằng cử nhân)**:\n• THPT VN → 日本語学校 1 năm → 国公立大学 4 năm → 技人国 / 特定活動46.\n\n**Lộ trình C (2–3 năm, cho người đã 大卒 VN)**:\n• 日本語学校 6–12 tháng → 大学院 2 năm → 技人国 / 高度専門職.\n\n**Lộ trình D (2 năm, cho người N1 + 大卒)**:\n• 大学院 直接 2 năm → 技人国.',
      documents: [],
      tip: 'Đừng vội. Nhiều người chọn sai → mất 1 năm + tiền. Tham vấn người Việt đã đi du học trước khi quyết định.',
    },
    {
      step: 2,
      title: 'Tìm + nộp hồ sơ trường',
      description:
        '**Tìm trường**:\n\n• **JASSO Study in Japan**: trang chính thức MEXT.\n• **法務省告示 list**: danh sách 日本語学校 đủ điều kiện visa.\n• **Trang trường trực tiếp**: tìm 4–10 trường phù hợp.\n• **Hỏi du học sinh đã đi**: VYSA, Facebook groups.\n• **Công ty du học** uy tín — kiểm tra license + reviews.\n\n**Tiêu chí chọn**:\n\n• Có 法務省告示 / chính thức MEXT.\n• Vị trí (Tokyo / vùng quê).\n• Học phí.\n• Tỷ lệ cấp visa.\n• Tỷ lệ tốt nghiệp + lên 大学/専門学校 (cho 日本語学校).\n• Hỗ trợ du học sinh (nhà ở, アルバイト, 就活).\n• Cộng đồng Việt trong trường.\n\n**Hồ sơ chuẩn (cho 日本語学校)**:\n\n1. **Application form** (trường cấp).\n2. **Statement of Purpose**: lý do du học (tiếng Nhật hoặc Anh).\n3. **Hộ chiếu copy**.\n4. **Ảnh 4x3** (4–8 tấm).\n5. **Tốt nghiệp THPT** + **dịch tiếng Nhật công chứng**.\n6. **Bảng điểm THPT** + dịch.\n7. **Chứng chỉ tiếng Nhật** (nếu có).\n8. **経費支弁書**: cha mẹ ký + 印鑑.\n9. **Sổ tiết kiệm** ≥1.5 triệu yên + 残高証明書 ngân hàng.\n10. **勤務証明書** + **所得証明書** cha mẹ.\n11. **戸籍謄本** (hộ khẩu VN dịch).\n\n**Nộp + lệ phí**:\n\n• Lệ phí xét hồ sơ: 20,000–30,000円.\n• Nộp qua bưu điện hoặc qua agent / công ty du học.\n• Trường xét: 2–4 tuần → kết quả.\n• Trúng → đóng 入学金 + 学費 năm 1 (đa số trước khi nộp COE).\n\n**Sau khi đóng tiền**:\n\n• Trường thay mặt nộp hồ sơ COE đến ISA.\n• Đợi 2–3 tháng.\n• Nhận COE (qua trường gửi về VN).',
      documents: ['Application + Statement of Purpose', 'Bằng + bảng điểm', '経費支弁書', '預金残高証明書'],
      tip: 'Nộp HỒ SƠ SỚM — trễ tốt nhất 1 tuần trước hạn. Đa số trường hết slot sớm cho kỳ tốt.',
    },
    {
      step: 3,
      title: 'Xin visa tại Đại sứ quán',
      description:
        '**Sau khi nhận COE**:\n\n1. **Kiểm tra COE**:\n• Tên + ngày sinh đúng.\n• Trường + ngày bắt đầu học đúng.\n• Hiệu lực 3 tháng.\n\n2. **Đặt hẹn Đại sứ quán**:\n• **在ベトナム日本大使館 (Hà Nội)** — miền Bắc.\n• **Tổng Lãnh sự (TP.HCM)** — miền Nam.\n• Đặt qua trang online.\n\n3. **Hồ sơ visa**:\n\n• **Hộ chiếu** còn hạn 1+ năm.\n• **Visa application form** (download trang Đại sứ quán).\n• **Ảnh 4.5x4.5cm** (1 tấm).\n• **COE** bản gốc + 1 bản sao.\n• **Lệ phí**: ~530,000 VND (~3,000円) — đa số trả tại Đại sứ quán.\n\n4. **Nộp + đợi**:\n\n• Nộp tại window.\n• Đợi 1–2 tuần (đôi khi ngày).\n• Nhận visa dán trên hộ chiếu.\n\n5. **Trước khi sang**:\n\n• Đặt vé máy bay đến sân bay gần trường (Narita / Haneda / Kansai / Chubu).\n• Chuẩn bị tiền mặt: 100,000–200,000円 cho tuần đầu.\n• Mang theo: hồ sơ COE bản sao, học phí (nếu chưa trả), thẻ ngân hàng VN.\n• Bao gồm: 在留カード sẽ nhận tại sân bay (3 sân bay lớn) hoặc qua bưu điện sau.\n\n6. **Khi đến sân bay Nhật**:\n\n• Đi qua入国審査 (Immigration).\n• Nhân viên đóng dấu nhập cảnh + cấp **在留カード**.\n• Lưu giữ kỹ.\n• Có thể bị hỏi: trường + lý do du học → trả lời tiếng Nhật cơ bản OK.\n\n**Lưu ý**:\n\n• KHÔNG đến Nhật bằng visa 短期滞在 rồi cố chuyển 留学 — đa số bị từ chối.\n• Trễ ngày bắt đầu lớp >2 tuần → trường có thể huỷ.\n• Mất COE trước khi đến Đại sứ quán → trường có thể cấp lại nhưng chậm.\n• Visa từ chối → kháng nghị qua trường + 行政書士.',
      documents: ['COE', 'Hộ chiếu', 'Visa application', 'Ảnh', 'Vé máy bay'],
      tip: 'Đại sứ quán Hà Nội + Tổng Lãnh sự TP.HCM có thể yêu cầu phỏng vấn cho du học mới. Chuẩn bị: lý do chọn trường, kế hoạch sau tốt nghiệp, tài chính.',
    },
    {
      step: 4,
      title: 'Tuần đầu ở Nhật — Thủ tục cơ bản',
      description:
        '**Trong 14 ngày sau khi đến**:\n\n**1. 住民登録 tại 市役所**:\n\n• Mang 在留カード + hộ chiếu.\n• Đăng ký 住民票 → nhận コピー để dùng tiếp.\n• Đăng ký 印鑑登録 nếu cần (đa số không cần ngay).\n\n**2. 健康保険 đăng ký**:\n\n• Cùng lần đến 市役所.\n• 国民健康保険 — phí ~2,000–3,000円/tháng cho học sinh (giảm).\n• Nhận thẻ trong 2 tuần (hoặc nhận ngay).\n\n**3. 年金 — học sinh nên xin 学生納付特例**:\n\n• Cùng lần 市役所.\n• Hoãn đóng 年金 đến sau tốt nghiệp.\n• Giấy tờ: 学生証 trường.\n\n**4. My Number Card** (sau 住民登録):\n\n• 個人番号通知書 sẽ gửi đến nhà trong 2–4 tuần.\n• Xin My Number Card miễn phí qua trang myna portal hoặc 市役所.\n\n**5. Mở ngân hàng**:\n\n• ゆうちょ銀行 (bưu điện) — dễ nhất cho du học sinh.\n• Mang 在留カード + 住民票 + hộ chiếu + 印鑑 (hoặc signature).\n• Một số ngân hàng yêu cầu ở Nhật ≥6 tháng — ゆうちょ không yêu cầu.\n\n**6. SIM card / Phone**:\n\n• Thuê SIM rẻ: 楽天モバイル, IIJmio, ahamo, povo — 1,000–3,000円/tháng.\n• Hoặc 大手 (docomo, au, SoftBank) — đắt hơn.\n• Mang 在留カード + thẻ tín dụng (hoặc tài khoản ngân hàng vừa mở).\n\n**7. Trường — Thủ tục nhập học**:\n\n• Đi 学生課 nộp 在留カード + 住民票.\n• Lấy 学生証.\n• Đăng ký lớp, mua sách.\n• Đăng ký 健康診断 trường.\n\n**8. アルバイト (nếu cần)**:\n\n• Xin **資格外活動許可** tại 入管 trước hoặc trong 14 ngày bắt đầu.\n• Tìm việc qua: バイト求人サイト (Townwork, an), 留学生 corner ハローワーク.\n\n**9. Liên hệ với gia đình + cộng đồng**:\n\n• Báo về VN đã đến an toàn.\n• Join VYSA / Facebook group du học sinh Việt.\n• Liên hệ chùa Việt / cộng đồng tại khu.\n\n**Cảnh báo phổ biến tuần đầu**:\n\n• Đi học sai đường → dùng Google Maps + 学生証 hỏi.\n• Không quen ăn → siêu thị có aisle quốc tế / chợ Việt online (kokoro-co.jp).\n• Văn hóa shock → tham gia 国際交流 events sớm.\n• Mất 在留カード → báo警察 ngay + 入管 xin lại.',
      documents: ['在留カード', 'Hộ chiếu', '住民票', '学生証'],
      tip: 'Làm hết thủ tục trong tuần đầu. Trễ → chồng chất + ảnh hưởng học.',
    },
    {
      step: 5,
      title: 'Trong khi học + Năm cuối + Sau tốt nghiệp',
      description:
        '**Trong khi học**:\n\n• **Học**: 95% du học sinh tốt nghiệp đúng hạn. Bí quyết: đi học đầy đủ + bài tập đúng hạn + hỏi giáo viên khi không hiểu.\n• **Tiếng Nhật**: tham gia 言語交換 + nói nhiều dù sai.\n• **アルバイト**: max 28 giờ/tuần. Theo dõi giờ chặt chẽ.\n• **Chi tiêu**: track + tiết kiệm. アルバイト ~120,000円/tháng đủ cho sinh hoạt nếu rural.\n• **Học bổng**: nộp JASSO Honor + 学校独自 + tư mỗi năm — không trúng năm này thử lại năm sau.\n• **Sức khỏe**: 健康診断 hằng năm + nghỉ ngơi đủ.\n• **Mental health**: học sinh Việt có 留学症 phổ biến — 学生相談室 trường + AMDA hỗ trợ.\n\n**Gia hạn visa**:\n\n• 3 tháng trước hết hạn → xin gia hạn tại 入管.\n• Mang: 在留カード, パスポート, 学生証, 成績証明書, 在学証明書, photo.\n• Lệ phí: 4,000円.\n• Đợi 2–4 tuần.\n• Trường có thể giúp — hỏi 学生課.\n\n**Đổi địa chỉ**:\n\n• Chuyển nhà → trong 14 ngày báo 市役所 + cập nhật 在留カード.\n\n**Năm cuối — 就活 (job hunting)**:\n\n• **Bắt đầu sớm**:\n  - 大学院 修士1年 mùa hè: 内定 ngay 修士2年 mùa xuân.\n  - 大学 3年生 mùa hè: 内定 đầu 大学4年.\n  - 専門学校: ngay năm 1 cuối / năm 2 đầu.\n• **Tài nguyên**:\n  - 留学生 corner ハローワーク.\n  - 大学 キャリアセンター.\n  - 留学生向け 就活フェア (Career Forum).\n  - Mynavi 留学生, JOPUS, Wovn jobs.\n• **Hồ sơ**:\n  - 履歴書 tiếng Nhật (xem japanese-resume-rirekisho).\n  - エントリーシート.\n  - 自己PR + 志望動機.\n• **Phỏng vấn**:\n  - 1 vòng → 2 vòng → 最終.\n  - Mặc スーツ.\n  - Câu chuẩn: tự giới thiệu, lý do chọn công ty, 5 năm kế hoạch.\n  - Xem job-interview-japan guide.\n\n**Sau khi có 内定 (job offer)**:\n\n• Chuyển visa từ 留学 → 技人国 / 特定活動46:\n  - Đến 入管 nộp 在留資格変更許可申請.\n  - Mang: 内定通知書, 卒業見込証明書 (hoặc 卒業証明書), 履歴書, 在留カード.\n  - Lệ phí: 4,000円.\n  - Đợi 1–2 tháng.\n• Visa mới có hiệu lực sau 卒業.\n\n**Sau khi tốt nghiệp + không có job**:\n\n• Chuyển sang 特定活動 (visa tìm việc) — xem FAQ.\n• Tiếp tục 就活 6–12 tháng.\n• Có job → chuyển 技人国 / 特定活動46.\n• Không có job sau 12 tháng → về VN.\n\n**Quay về VN tạm**:\n\n• Trong khi visa留学 còn hiệu lực: dùng 再入国許可 (re-entry).\n  - みなし再入国: tự động cho ra 1 năm (nếu visa còn).\n  - 再入国許可: nộp 入管 trước nếu ra >1 năm.\n• Sau tốt nghiệp: không re-entry được — phải xin visa mới từ VN.',
      documents: ['在留カード', '学生証', '成績証明書', '在学証明書'],
      tip: 'Đừng đợi đến năm cuối mới nghĩ về 就活. Network sớm + intern năm 2/3 quan trọng. Xem japanese-resume + job-interview + tokutei-katsudo-46 guides.',
    },
  ],
};

export default studyInJapanStudentGuide;
