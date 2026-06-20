import type { AdminGuide } from '../../../../types/content';

const idecoPersonalPension: AdminGuide = {
  id: 'ideco-personal-pension',
  category: 'money',
  lastVerified: '2026-06-20',
  priority: 'normal',
  title: 'iDeCo (lương hưu cá nhân) — lợi ích thuế',
  titleJp: 'iDeCo（個人型確定拠出年金）の活用',
  icon: 'trending-up-outline',
  color: '#16A085',
  description:
    'iDeCo (個人型確定拠出年金) là chương trình lương hưu cá nhân tự nguyện của Nhật. 3 lợi ích thuế: (1) tiền đóng được khấu trừ thuế thu nhập + 住民税 hoàn toàn, (2) lãi đầu tư trong tài khoản KHÔNG bị đánh thuế, (3) khi nhận tiền lúc nghỉ hưu cũng có khấu trừ thuế. **CẢNH BÁO**: tiền KHÔNG rút được trước 60 tuổi (trừ vài trường hợp đặc biệt). Đầu tư có rủi ro thua lỗ. Người Việt sống ở Nhật có 公的年金 đăng ký + 在留 lâu dài có thể tham gia, nhưng cân nhắc kỹ kế hoạch dài hạn (về VN hay ở Nhật).',
  searchKeywords: [
    'iDeCo',
    'idecoideco',
    'lương hưu cá nhân',
    '個人型確定拠出年金',
    'tax free đầu tư',
    'khấu trừ thuế',
    '小規模企業共済等掛金控除',
    '60 tuổi rút tiền',
    '国民年金基金連合会',
    '会社員',
    '自営業',
    '専業主婦',
    'Rakuten Securities',
    'SBI Securities',
    'Matsui',
    'Monex',
    'ideco-koushiki',
    'phúc lợi nghỉ hưu',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      'iDeCo dựa trên 確定拠出年金法 toàn quốc. 国民年金基金連合会 vận hành chương trình. 厚生労働省 quản lý khung pháp lý. Đóng góp + đầu tư qua công ty chứng khoán hoặc ngân hàng được chỉ định. Mức đóng tối đa thay đổi theo công việc + có 改正 2024–2026 tăng giới hạn cho một số nhóm. **Đầu tư có rủi ro mất vốn** — KHÔNG đảm bảo lãi. Người không còn 公的年金 đăng ký (vd về VN vĩnh viễn) phải xử lý phức tạp với tài khoản. Đây không phải tư vấn đầu tư cá nhân — kiểm tra với 金融機関 hoặc 税理士 cụ thể.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'high',
    whenToAskExpert: [
      'Quyết định đầu tư cụ thể (chọn quỹ / tỷ trọng) — KHÔNG phải tư vấn đầu tư từ guide. Hỏi 金融アドバイザー / 金融機関 hoặc tự nghiên cứu.',
      'Sắp về Việt Nam vĩnh viễn — tài khoản iDeCo phức tạp, có thể bị đóng băng đến 60 tuổi. Hỏi 国民年金基金連合会 trước khi quyết.',
      'Thu nhập rất cao / phức tạp (副業, đầu tư khác) — tư vấn 税理士 để tối ưu hóa cùng 確定申告.',
      'Mất việc / giảm thu nhập đột ngột — có thể tạm dừng đóng iDeCo. Hỏi 金融機関 quản lý tài khoản.',
    ],
  },
  quickAction: {
    deadline:
      'Không có deadline cứng — bắt đầu lúc nào cũng được. Tuy nhiên: thu nhập cao = lợi ích thuế cao → bắt đầu sớm hơn tận dụng nhiều năm. Hằng tháng đóng tự động trên tài khoản.',
    office:
      'Mở tài khoản qua 金融機関 (công ty chứng khoán hoặc ngân hàng) — không qua 市役所. Phổ biến: SBI証券, 楽天証券, マネックス証券, 松井証券, みずほ銀行, ゆうちょ銀行, etc. Mỗi nơi phí + lựa chọn quỹ khác nhau.',
    doNow: [
      'Kiểm tra mình có đủ điều kiện: có 公的年金 đăng ký (国民年金 hoặc 厚生年金) + dưới 65 tuổi (theo cải cách 2022). Người ở visa lao động + đóng 厚生年金 → đủ điều kiện.',
      'Tính 限度額 đóng/tháng theo công việc (hiện hành): 自営業 ~6.8万円, 会社員 (không 企業年金) ~2.3万円, 会社員 (có 企業年金) ~1.2–2万円, 公務員 ~2万円, 専業主婦 ~2.3万円. ⚠️ Sắp nâng từ kỳ đóng 12/2026 (áp dụng 01/2027): 自営業 → 7.5万円, 第2号 gộp 企業年金 → trần 6.2万円 — kiểm tra số cuối tại trang chính thức trước khi đặt mức.',
      'Chọn 金融機関: so sánh phí 口座管理手数料 (phí quản lý hàng tháng — quan trọng vì cumulative dài hạn), số quỹ available, giao diện.',
      'Mở tài khoản online — quy trình ~1–2 tháng (kiểm tra 公的年金 đăng ký, gửi giấy tờ, được phê duyệt).',
      'Sau khi mở: chọn cách phân bổ tiền vào các quỹ (cổ phiếu Nhật / quốc tế, trái phiếu, balanced fund, định kỳ tiền gửi). Mức rủi ro tự bạn chọn.',
    ],
    bring: [
      '在留カード + hộ chiếu',
      '基礎年金番号 (số 公的年金) — có trên 年金手帳 hoặc 通知',
      'マイナンバー (12 chữ số)',
      'Sổ ngân hàng / cash card (để rút tự động hàng tháng)',
      '源泉徴収票 hoặc giấy thu nhập (một số trường hợp)',
      'Email + smartphone',
    ],
    ifLate:
      'iDeCo không có "muộn" — bắt đầu lúc nào cũng được. Nhưng càng bắt đầu sớm + đóng đều thì lãi kép + lợi ích thuế lũy tích càng lớn. Mỗi năm chậm = năm đó không có khấu trừ thuế = tiền thuế đóng cho nhà nước thay vì tiết kiệm cho mình.',
    officialSourceLabels: ['国民年金基金連合会 (iDeCo公式)'],
  },
  whoIsThisFor: [
    'Người Việt làm việc ở Nhật, có 厚生年金 (đa số visa lao động) hoặc 国民年金 + dự định ở Nhật ≥ 5–10 năm.',
    'Người có thu nhập trung bình – cao, đóng nhiều thuế → muốn giảm gánh nặng thuế.',
    'Người chuẩn bị cho nghỉ hưu / hồi hương dài hạn.',
    'KHÔNG phù hợp cho:',
    '• Người sắp về VN vĩnh viễn trong 1–3 năm — tài khoản phức tạp khi rời Nhật.',
    '• Người thu nhập rất thấp (lợi ích thuế ít) hoặc không ổn định.',
    '• Người không có ý định ở Nhật dài hạn.',
    '• Người cần tiền linh hoạt — KHÔNG rút được trước 60 tuổi.',
  ],
  whenToDo: [
    'Khi thu nhập ổn định + dự định ở Nhật ≥ 5 năm.',
    'Đầu năm tài chính (tháng 4) hoặc sau khi tăng lương.',
    'Sau khi kết hôn / sinh con — tính lại kế hoạch tài chính dài hạn.',
    'Trước khi 60 tuổi — vẫn còn cơ hội đóng + nhận lợi ích.',
    'KHÔNG: ngay sau khi sang Nhật, chưa biết sẽ ở bao lâu.',
  ],
  whereToDo: [
    'Online qua trang 公式 của 金融機関: SBI証券, 楽天証券, マネックス証券, 松井証券 (chứng khoán), みずほ銀行, ゆうちょ銀行, etc.',
    'Trang trung tâm chính thức iDeCo: ideco-koushiki.jp — giới thiệu chương trình + so sánh.',
    '国民年金基金連合会: cơ quan vận hành — thường không tiếp dân trực tiếp.',
    'Tư vấn 金融アドバイザー (FP) độc lập — có phí, nhưng tư vấn cá nhân hóa.',
  ],
  estimatedTime:
    'Mở tài khoản: 1–2 tháng (kiểm tra 公的年金 + phê duyệt). Đóng hàng tháng: tự động. Theo dõi: 5–15 phút/tháng (xem giá trị tài khoản). Quyết định lớn (tăng đóng / đổi quỹ): vài giờ tự nghiên cứu.',
  fees: [
    '**Phí mở tài khoản (lần đầu)**: thường 2,829円 cho 国民年金基金連合会 — bắt buộc, mọi 金融機関 đều thu.',
    '**Phí quản lý hàng tháng**: 171円/tháng tối thiểu (cố định cho 国民年金基金連合会). 金融機関 thêm phí riêng từ 0円 đến 500円+/tháng — chọn nơi 0円 (vd SBI, 楽天, 松井, マネックス).',
    '**Phí giao dịch quỹ**: tùy quỹ (信託報酬). Quỹ index thấp ~0.1–0.3%/năm. Quỹ active ~1–2%/năm. Cộng dồn dài hạn quan trọng.',
    '**Phí khi rút lúc 60+ tuổi**: 一時金 hoặc 年金 — phí khác nhau. Cụ thể tùy 金融機関.',
    '**Khấu trừ thuế**: tiền đóng iDeCo = 100% khấu trừ 所得税 + 住民税 (gọi 小規模企業共済等掛金控除). Vd thu nhập 500万円, đóng 24万円/năm → tiết kiệm thuế ~5万円/năm tùy gia cảnh.',
    '**Phí thay đổi** — kiểm tra trang chính thức 金融機関 trước khi mở.',
  ],
  documentsChecklist: [
    { label: '在留カード + hộ chiếu', required: true, note: 'Xác minh danh tính.' },
    { label: '基礎年金番号 (10 chữ số)', required: true, note: 'Có trên 年金手帳, 年金定期便, hoặc qua 年金事務所.' },
    { label: 'マイナンバー (12 chữ số)', required: true, note: 'Bắt buộc cho iDeCo từ 2018.' },
    { label: 'Sổ ngân hàng / cash card', required: true, note: 'Để rút tự động hàng tháng.' },
    { label: '事業主証明書', required: false, note: 'Chỉ cho 会社員 — chứng minh công ty không có 企業年金 hoặc có loại nào. Công ty cấp.' },
    { label: '源泉徴収票', required: false, note: 'Một số 金融機関 yêu cầu.' },
  ],
  commonMistakes: [
    'Bắt đầu không hiểu rõ "không rút được đến 60 tuổi" → kẹt vốn khi cần.',
    'Chọn 金融機関 phí quản lý cao (vd 500円/tháng) → 30 năm = 18万円 cumulative phí — đáng kể.',
    'Đóng lớn ngay năm đầu mà thu nhập không ổn định → khó duy trì.',
    'Chọn 100% cổ phiếu khi gần nghỉ hưu → rủi ro thua lỗ lớn ngay trước rút tiền.',
    'Không cập nhật khi sự kiện thay đổi (kết hôn, sinh con, đổi việc) → bỏ lỡ tối ưu.',
    'Quên 確定申告 phần iDeCo (cho 自営業) → mất khấu trừ.',
    'Tin "iDeCo = chắc chắn lãi" — SAI. Đầu tư có rủi ro thua lỗ. Quỹ cổ phiếu có thể giảm 30–50% trong khủng hoảng.',
    'Bắt đầu ngay sau khi sang Nhật chưa quyết ở dài hạn → kẹt khi về VN.',
  ],
  faq: [
    {
      question: 'Tôi có visa lao động 5 năm — nên tham gia iDeCo không?',
      answer:
        'Tùy kế hoạch. Câu hỏi tự đánh giá:\n\n• Có ý định gia hạn / ở Nhật dài hạn (≥ 10 năm) không?\n• Có thu nhập đủ cao để hưởng lợi thuế (vd ≥ 400万円/năm)?\n• Có quỹ khẩn cấp 6 tháng chi phí riêng (chưa kể iDeCo) không?\n• Hiểu rằng tiền KHÔNG rút được đến 60 tuổi không?\n\nNếu **YES cả 4**: iDeCo có lợi thuế lớn, nên cân nhắc.\n\nNếu **NO hoặc UNSURE**: ưu tiên tiền linh hoạt + 公的年金 (国民年金 / 厚生年金 đã đóng tự động) trước. iDeCo là "nâng cao" — không cần thiết cho mọi người.',
    },
    {
      question: 'Tôi sắp về Việt Nam vĩnh viễn — đã đóng iDeCo 3 năm. Phải làm sao?',
      answer:
        'Tình huống phức tạp. Quy trình thông thường:\n\n• **KHÔNG** rút tiền được trước 60 tuổi (trừ vài trường hợp rất hạn chế: tử vong, tàn tật cao).\n• Khi rời Nhật + mất 公的年金 đăng ký: tài khoản iDeCo "đóng băng" — không đóng thêm được, nhưng tiền vẫn để lại + đầu tư tiếp.\n• Khi 60 tuổi: có thể rút (kể cả ở Việt Nam) — nhưng quy trình nhận tiền quốc tế phức tạp + có thể bị thuế nguồn của Nhật.\n• **脱退一時金** (rút ngay khi rời Nhật): iDeCo có quy định riêng, KHÁC với 厚生年金 / 国民年金. Điều kiện rất khó — trong đa số trường hợp KHÔNG được rút.\n\nVì rủi ro này, nếu chưa chắc ở Nhật ≥ 10 năm → cân nhắc TRƯỚC khi mở. Đã mở rồi: hỏi 国民年金基金連合会 + 金融機関 quản lý tài khoản về options.',
    },
    {
      question: 'Đầu tư iDeCo có rủi ro mất tiền không?',
      answer:
        'CÓ. Đây là điểm quan trọng nhiều người bỏ qua:\n\n• iDeCo cho bạn chọn cách phân bổ vào các quỹ.\n• Quỹ cổ phiếu (株式型) có thể giảm 30–50% trong khủng hoảng (vd 2008, 2020).\n• Quỹ trái phiếu (債券型) ít rủi ro hơn nhưng lãi thấp.\n• Quỹ "định kỳ tiền gửi" (定期預金型) gần như không lỗ nhưng cũng gần như không lãi.\n\nKhuyến nghị chung (KHÔNG phải tư vấn đầu tư cá nhân):\n\n• Tuổi trẻ + xa nghỉ hưu: chấp nhận rủi ro, nhiều cổ phiếu.\n• Gần nghỉ hưu: chuyển dần sang trái phiếu / tiền gửi.\n• Đa dạng (cổ phiếu Nhật + quốc tế + trái phiếu) — không "all in" một loại.\n\nĐầu tư cụ thể: tự nghiên cứu hoặc hỏi 金融アドバイザー.',
    },
    {
      question: '小規模企業共済等掛金控除 là gì? Khác gì với 個人年金保険料控除?',
      answer:
        '**小規模企業共済等掛金控除**: khấu trừ cho iDeCo (+ 中小企業退職金共済 + 小規模企業共済). KHẤU TRỪ 100% số tiền đóng — không có giới hạn (trừ giới hạn đóng iDeCo). Áp dụng cho cả 所得税 + 住民税.\n\n**個人年金保険料控除**: khấu trừ cho 個人年金 thông qua bảo hiểm (不同với iDeCo). Giới hạn ~4万円/năm (所得税) + 2.8万円 (住民税). Ít hơn iDeCo nhiều.\n\niDeCo có lợi thuế cao hơn nhiều so với 個人年金保険 thông thường — đó là điểm hấp dẫn chính.',
    },
    {
      question: 'Tôi nên đóng bao nhiêu/tháng?',
      answer:
        'Quy tắc chung (KHÔNG phải tư vấn cá nhân):\n\n1. **Có quỹ khẩn cấp** 6 tháng chi phí trước.\n2. **Đóng nhỏ ban đầu** (vd 1万円/tháng) để quen quy trình.\n3. **Tăng dần** khi thu nhập tăng + tự tin về dài hạn.\n4. **Đến 限度額** (vd 2.3万円/tháng cho 会社員 không 企業年金) nếu thu nhập đủ + ổn định.\n5. **KHÔNG** đóng quá khả năng — kẹt vốn đến 60 tuổi sẽ stress.\n\nMột nguyên tắc khác: 限度額 × 12 = số/năm × thuế suất biên × số năm = tổng tiết kiệm thuế dự kiến. Tính để biết lợi ích thực.\n\nTốt nhất: dùng simulator của 金融機関 hoặc hỏi 税理士.',
    },
    {
      question: 'iDeCo có gì thay đổi trong 2026–2027?',
      answer:
        'Có vài thay đổi đáng chú ý:\n\n• **Nâng hạn mức đóng (dự kiến, từ kỳ đóng 12/2026 → áp dụng đầu tiên 01/2027):** 自営業 (第1号) từ 6.8万 lên **7.5万円/tháng**; 会社員・công chức (第2号) gộp với 企業年金 thành trần **6.2万円/tháng**. → Đây là kế hoạch theo cải cách, CHƯA áp dụng — xác nhận số cuối tại 金融機関 gần ngày.\n• **Nâng tuổi được tham gia:** từ "dưới 65" lên **dưới 70 tuổi** (cùng đợt 12/2026–01/2027).\n• **Quy tắc 5年→10年 (đã có hiệu lực từ 01/01/2026):** khi nhận iDeCo dạng một lần (一時金), khoảng cách để được tính lại 退職所得控除 với 退職金 nới từ 5 lên 10 năm — ảnh hưởng cách tính thuế nếu bạn nhận cả iDeCo lẫn 退職金 gần nhau. Trường hợp cụ thể hỏi 税理士.',
    },
  ],
  counterPhrases: [
    {
      jp: 'iDeCoを始めたいです。',
      romaji: 'iDeCo o hajimetai desu.',
      vn: 'Tôi muốn bắt đầu iDeCo.',
      note: 'Khi gọi 金融機関 hỏi mở tài khoản.',
    },
    {
      jp: '掛金限度額はいくらですか。',
      romaji: 'Kakekin gendogaku wa ikura desu ka.',
      vn: 'Hạn mức đóng tối đa của tôi là bao nhiêu?',
      note: 'Tùy công việc — confirm với 金融機関 trước khi mở.',
    },
    {
      jp: '手数料はどのくらいですか。',
      romaji: 'Tesuuryou wa dono kurai desu ka.',
      vn: 'Phí khoảng bao nhiêu?',
      note: 'Hỏi tổng phí (mở + quản lý + giao dịch quỹ).',
    },
    {
      jp: '事業主証明書をお願いします。',
      romaji: 'Jigyounushi shoumeisho o onegai shimasu.',
      vn: 'Xin cấp giấy chứng nhận từ công ty.',
      note: 'Yêu cầu HR công ty cấp — cần cho 会社員 mở iDeCo.',
    },
    {
      jp: '基礎年金番号はどこで確認できますか。',
      romaji: 'Kiso nenkin bangou wa doko de kakunin dekimasu ka.',
      vn: 'Tôi xác nhận số 公的年金 ở đâu?',
      note: 'Hỏi HR công ty hoặc 年金事務所.',
    },
    {
      jp: '掛金を変更したいです。',
      romaji: 'Kakekin o henkou shitai desu.',
      vn: 'Tôi muốn thay đổi số tiền đóng.',
      note: 'Có thể thay đổi định kỳ (thường 1 lần/năm).',
    },
    {
      jp: '一時的に拠出を停止できますか。',
      romaji: 'Ichijitekini kyoshutsu o teishi dekimasu ka.',
      vn: 'Tôi có thể tạm dừng đóng được không?',
      note: 'Khi mất việc / khó khăn tài chính.',
    },
    {
      jp: '海外に移住する場合、口座はどうなりますか。',
      romaji: 'Kaigai ni ijuusuru baai, kouza wa dou narimasu ka.',
      vn: 'Nếu tôi di cư ra nước ngoài, tài khoản sẽ thế nào?',
      note: 'Câu QUAN TRỌNG — hỏi trước khi mở nếu có ý định về VN.',
    },
  ],
  keyTerms: [
    {
      term: 'iDeCo',
      reading: 'イデコ',
      meaningVi: 'lương hưu cá nhân tự nguyện (有期 / dài hạn)',
      noteVi: 'Tên đầy đủ: 個人型確定拠出年金 (こじんがたかくていきょしゅつねんきん). Khác với 公的年金 (国民年金 + 厚生年金 — bắt buộc). iDeCo tự nguyện đóng góp + tự chọn quỹ → tự chịu lời lỗ. KHÔNG PHẢI LỜI KHUYÊN ĐẦU TƯ — đây là chế độ thuế.',
    },
    {
      term: '確定拠出年金',
      reading: 'かくていきょしゅつねんきん',
      meaningVi: 'lương hưu định mức đóng góp (defined contribution)',
      noteVi: 'Khái niệm: SỐ TIỀN ĐÓNG cố định, SỐ TIỀN NHẬN thì tuỳ kết quả đầu tư (có thể lãi hoặc lỗ). Khác 確定給付年金 (DB) nơi số nhận cố định. iDeCo = 個人型 DC; 企業型DC = công ty đóng cho nhân viên.',
    },
    {
      term: '掛金',
      reading: 'かけきん',
      meaningVi: 'số tiền đóng góp hàng tháng',
      noteVi: 'Mức tối thiểu 5,000円/tháng. Tối đa thay đổi theo loại 被保険者: 第1号 (tự doanh) ¥68,000/tháng; 第2号 (đi làm công ty) ¥12,000-23,000 tuỳ có 企業型 hay không; 第3号 (vợ/chồng phụ thuộc) ¥23,000. Tất cả 掛金 KHẤU TRỪ THUẾ HOÀN TOÀN (所得控除).',
    },
    {
      term: '所得控除',
      reading: 'しょとくこうじょ',
      meaningVi: 'khấu trừ thu nhập (giảm thuế thu nhập + 住民税)',
      noteVi: 'Mọi 掛金 iDeCo được trừ khỏi thu nhập chịu thuế. Ví dụ: lương ¥500万 + iDeCo ¥27.6万/năm (¥23,000 × 12) → thu nhập tính thuế chỉ ¥472.4万. Tiết kiệm thực tế ~15-30% của ¥27.6万 = ¥4-8万/năm tuỳ 所得税率 + 住民税.',
    },
    {
      term: '受給',
      reading: 'じゅきゅう',
      meaningVi: 'nhận tiền (khi đủ 60 tuổi)',
      noteVi: 'Bắt đầu từ 60 tuổi (cần đã đóng ≥ 10 năm tổng — nếu < 10 năm thì lùi thời điểm nhận theo công thức). 3 cách: (1) 一時金 (1 lần — có 退職所得控除); (2) 年金 (chia kỳ — có 公的年金等控除); (3) 併給 (kết hợp). Mỗi cách có ưu/nhược về thuế — hỏi 税理士 trước khi quyết định.',
    },
    {
      term: '中途引き出し',
      reading: 'ちゅうとひきだし',
      meaningVi: 'rút trước (gần như KHÔNG được)',
      noteVi: 'Khác với NISA. Tiền iDeCo KHÔNG rút được trước 60 tuổi, trừ trường hợp đặc biệt rất hẹp: tử vong (受給者), khuyết tật nặng, hoặc số 加入者期間 < 3 năm + 資産額 < 25万円. Đây là điểm rủi ro chính — cân nhắc kỹ trước khi mở.',
    },
    {
      term: '加入者期間',
      reading: 'かにゅうしゃきかん',
      meaningVi: 'thời gian tham gia (tính cho quyền nhận)',
      noteVi: 'Tổng thời gian đã tham gia iDeCo. Cần ≥ 10 năm tổng để bắt đầu nhận ở 60 tuổi. Nếu thiếu (vd 8 năm) → tuổi nhận tăng theo công thức (vd 8 năm = 62 tuổi). Người rời Nhật giữa chừng (vd về VN sau 5 năm) → tài sản bị giữ đến khi đủ điều kiện nhận, không thể rút.',
    },
    {
      term: '運営管理機関',
      reading: 'うんえいかんりきかん',
      meaningVi: 'cơ quan quản lý tài khoản iDeCo (ngân hàng / công ty chứng khoán)',
      noteVi: 'Nơi bạn mở tài khoản iDeCo. Phổ biến: SBI証券 / 楽天証券 / マネックス / メガバンク. Khác nhau về phí + danh sách quỹ. Đổi 機関 được nhưng mất 1-2 tháng + có thể bị phí. Chọn cẩn thận từ đầu.',
    },
  ],
  officialLinks: [
    { label: '国民年金基金連合会 (iDeCo公式)', url: 'https://www.nenkin.go.jp/' },
    { label: '厚生労働省', url: 'https://www.mhlw.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Đánh giá có nên tham gia không',
      description:
        '4 điều kiện cần đồng thời:\n\n1. **Đủ điều kiện pháp lý**:\n• Có 公的年金 đăng ký (国民年金 hoặc 厚生年金 — đã đóng tự động qua công ty hoặc 市役所).\n• Dưới 65 tuổi.\n• Có 在留カード + 住民票 ở Nhật.\n\n2. **Tài chính ổn định**:\n• Thu nhập ổn định ≥ 1 năm.\n• Có quỹ khẩn cấp ≥ 6 tháng chi phí.\n• Trả hết nợ lãi suất cao (thẻ tín dụng, tiêu dùng).\n\n3. **Kế hoạch dài hạn**:\n• Dự định ở Nhật ≥ 5–10 năm.\n• Hiểu tiền KHÔNG rút được đến 60 tuổi.\n\n4. **Có thuế đủ để hưởng lợi**:\n• Thu nhập ≥ ~300万円/năm để khấu trừ thuế có ý nghĩa.\n\nThiếu 1 điều → cân nhắc kỹ. Có thể chờ năm sau khi đủ.',
      documents: [],
      tip: 'iDeCo KHÔNG bắt buộc. Nhiều người Việt sống ở Nhật ổn định không tham gia vẫn ổn — vì 公的年金 (đã đóng tự động) đã là 1 lớp lương hưu.',
    },
    {
      step: 2,
      title: 'Tính 限度額 đóng + lợi ích thuế',
      description:
        '**限度額 đóng/tháng** (theo 確定拠出年金法, có cải cách 2024–2026):\n\n• 自営業 (国民年金 第1号): ~6.8万円/tháng (cao nhất)\n• 会社員 KHÔNG có 企業年金 (厚生年金 + 第2号): ~2.3万円/tháng\n• 会社員 CÓ 企業年金: ~1.2–2万円 (tùy loại)\n• 公務員: ~2万円\n• 専業主婦/夫 (第3号): ~2.3万円\n\n**Lưu ý**: Cải cách 2024–2026 đang tăng giới hạn cho một số nhóm. KIỂM TRA trang chính thức 国民年金基金連合会 / 金融機関 cụ thể trước khi mở.\n\n**Tính lợi ích thuế**:\n\n• Vd thu nhập 500万円, đóng 24万円/năm (2万円/tháng).\n• Thuế suất biên thường 20% (10% 所得税 + 10% 住民税).\n• Tiết kiệm thuế: 24万円 × 20% = 4.8万円/năm.\n• 30 năm: 144万円 tiết kiệm thuế (chưa kể lãi đầu tư).',
      documents: [
        '源泉徴収票 hoặc estimate thu nhập',
      ],
      tip: 'Dùng simulator trên trang 金融機関 (vd SBI証券) hoặc trang ideco-koushiki — nhập thu nhập, ra lợi ích thuế ước tính.',
    },
    {
      step: 3,
      title: 'Chọn 金融機関 + so sánh phí',
      description:
        'Phí quan trọng nhất là **口座管理手数料**/tháng — cumulative dài hạn:\n\n• **0円 (rẻ nhất)**: SBI証券, 楽天証券, 松井証券, マネックス証券, auカブコム証券 (chứng khoán online).\n• **300–500円/tháng**: ngân hàng truyền thống (みずほ, 三井住友, etc.).\n\n30 năm × 500円 × 12 = 18万円 phí cumulative — đáng kể.\n\n**Yếu tố khác**:\n\n• Số quỹ available (一部 chỉ vài quỹ, một số ≥ 30 quỹ).\n• Có quỹ index phí thấp không (eMAXIS Slim, etc.).\n• Giao diện mobile / web.\n• Hỗ trợ ngôn ngữ (đa số chỉ tiếng Nhật).\n\n**So sánh trên**: trang ideco-koushiki.jp hoặc các so sánh độc lập.\n\n**Quyết định 1 lần** — đổi 金融機関 sau này phức tạp + có phí.',
      documents: [],
      tip: 'Người Việt thường chọn SBI証券 hoặc 楽天証券 vì 0円 phí + nhiều quỹ + có app tiếng Anh / dễ dùng.',
    },
    {
      step: 4,
      title: 'Mở tài khoản + chờ phê duyệt',
      description:
        'Quy trình online:\n\n1. Đăng ký account 金融機関 (nếu chưa có).\n2. Vào section "iDeCo" → "口座開設申込".\n3. Điền thông tin cá nhân:\n• Tên, ngày sinh, địa chỉ.\n• 在留カード番号 + マイナンバー.\n• 基礎年金番号 (10 chữ số).\n• Công việc + thu nhập.\n4. Chọn cách đóng:\n• 給与天引き (qua công ty — tiện cho 会社員, cần 事業主証明書).\n• 口座振替 (rút tự động từ tài khoản — tự quản lý).\n5. Chọn 金融機関 muốn mở tài khoản (1 trong nhiều lựa chọn của 国民年金基金連合会).\n6. Nộp form. Đợi phê duyệt 1–2 tháng.\n\n**Trong khi chờ**:\n\n• 国民年金基金連合会 kiểm tra 公的年金 đăng ký.\n• Công ty bạn cấp 事業主証明書 nếu yêu cầu.\n• Phê duyệt → bạn nhận thư + thông tin login portal iDeCo.',
      documents: [
        '在留カード + hộ chiếu',
        'マイナンバー + 基礎年金番号',
        'Sổ ngân hàng',
        '事業主証明書 (cho 会社員)',
      ],
      tip: 'Chờ 1–2 tháng KHÔNG có nghĩa app bị lỗi. Đó là quy trình kiểm tra chính thức. Kiên nhẫn.',
    },
    {
      step: 5,
      title: 'Phân bổ tiền vào quỹ + theo dõi',
      description:
        'Sau khi tài khoản hoạt động:\n\n1. **Đăng nhập portal** 金融機関 → section iDeCo.\n2. **Chọn cách phân bổ** (商品配分):\n• Vd: 50% cổ phiếu quốc tế (eMAXIS Slim 全世界株式), 30% cổ phiếu Nhật, 20% trái phiếu.\n• Có thể đổi định kỳ (thường 1 lần/năm).\n\n3. **Đóng đầu tiên** vào tháng tiếp theo — trừ tự động từ tài khoản hoặc lương.\n\n4. **Theo dõi**:\n• Hàng tháng: kiểm tra giá trị tài khoản.\n• Hàng năm: review phân bổ — có cần balance lại không.\n• Khi sự kiện lớn (kết hôn, sinh con, đổi việc): tính lại kế hoạch.\n\n5. **Khai thuế**:\n• 給与天引き: công ty tự xử lý — bạn chỉ cần kiểm tra 源泉徴収票 cuối năm.\n• 口座振替: bạn nhận 小規模企業共済等掛金払込証明書 cuối năm → khai trong 年末調整 hoặc 確定申告.',
      documents: [
        '小規模企業共済等掛金払込証明書 (cuối năm)',
      ],
      tip: 'KHÔNG check tài khoản hàng ngày — đầu tư dài hạn, biến động ngắn hạn không quan trọng. Stress vô ích.',
    },
    {
      step: 6,
      title: 'Khi sự kiện lớn — đổi việc / về VN / 60 tuổi',
      description:
        '**Đổi việc (会社員 → 会社員 khác)**:\n• Báo 金融機関 + công ty mới.\n• Nếu công ty mới có 企業年金 khác → có thể phải điều chỉnh 限度額.\n• Tài khoản tiếp tục, không bị mất.\n\n**Đổi từ 会社員 → 自営業 hoặc ngược lại**:\n• Báo 金融機関 — có thể tăng/giảm 限度額.\n• Cần submit form mới (転職時の手続き).\n\n**Về Việt Nam vĩnh viễn**:\n• Tài khoản KHÔNG đóng được nữa (mất 公的年金 đăng ký).\n• Tiền vẫn để lại + đầu tư tiếp đến 60 tuổi.\n• 60 tuổi: rút được, nhưng cần xử lý quốc tế phức tạp.\n• **Hỏi 金融機関 + 国民年金基金連合会 trước khi rời Nhật**.\n\n**60 tuổi (rút tiền)**:\n• 一時金 (rút 1 lần): có 退職所得控除 — khấu trừ thuế đáng kể.\n• 年金 (nhận như lương hưu): có 公的年金等控除.\n• Kết hợp 2 cách: tối ưu thuế.\n• Tham khảo 税理士 trước khi quyết.',
      documents: [
        'Form đổi việc (nếu cần)',
      ],
      tip: 'Quyết định lúc 60 tuổi quan trọng — tham khảo 税理士 hoặc 金融アドバイザー để tối ưu thuế. Không quyết vội.',
    },
  ],
};

export default idecoPersonalPension;
