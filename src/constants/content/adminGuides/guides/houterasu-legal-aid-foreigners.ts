import type { AdminGuide } from '../../../../types/content';

const houterasuLegalAidForeigners: AdminGuide = {
  id: 'houterasu-legal-aid-foreigners',
  category: 'daily-law',
  lastVerified: '2026-08-21',
  priority: 'normal',
  title: '法テラス — tư vấn pháp lý + ứng phí luật sư cho người thu nhập thấp',
  titleJp: '法テラス（日本司法支援センター）',
  icon: 'briefcase-outline',
  color: '#2C3E50',
  description:
    '法テラス (Japan Legal Support Center / 日本司法支援センター) là cơ quan công do Bộ Tư pháp lập, cung cấp 2 dịch vụ chính cho người sống ở Nhật bất kể quốc tịch: (1) Tư vấn pháp lý MIỄN PHÍ cho người đủ điều kiện thu nhập (民事法律扶助 — tối đa 3 lần/vụ, 30 phút/lần), (2) Ứng tiền luật sư + phí tòa cho vụ kiện dân sự, trả góp không lãi sau khi vụ xong. Hotline: 0570-078374 (sapo-dial), có hỗ trợ đa ngôn ngữ bao gồm tiếng Việt qua dịch vụ thông dịch. Áp dụng cho: ly hôn, DV, lao động, nợ, visa, thuê nhà, tai nạn, tội phạm hình sự (国選弁護人). Đây là tài liệu định hướng, KHÔNG thay tư vấn cá nhân.',
  searchKeywords: [
    'tư vấn pháp lý miễn phí',
    'luật sư miễn phí',
    'luật sư rẻ',
    'không có tiền thuê luật sư',
    'cần luật sư người Việt',
    'cần luật sư cho người nước ngoài',
    'ứng tiền luật sư',
    'trả góp phí luật sư',
    '当番弁護士',
    '国選弁護人',
    'kiện ra tòa',
    'phá sản cá nhân',
    'tự khai phá sản',
    '自己破産',
    '法テラス',
    '日本司法支援センター',
    'sapo-dial',
    '0570-078374',
    '民事法律扶助',
    '法律相談',
    '多言語',
    'tiếng Việt luật sư',
    'pháp lý người nước ngoài',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      '法テラス được lập theo 総合法律支援法 (Comprehensive Legal Support Act) năm 2004. Là cơ quan công, áp dụng toàn quốc với mạng lưới văn phòng ở mọi 都道府県. Dịch vụ 民事法律扶助 (legal aid) có điều kiện thu nhập + tài sản. Dịch vụ 国選弁護人 (luật sư do tòa chỉ định cho hình sự) không có điều kiện thu nhập, áp dụng khi đã 起訴 hoặc 逮捕. Đây là TÀI LIỆU THAM KHẢO — quyền lợi cụ thể tùy trường hợp + thay đổi theo năm.',
    sourceVerifiedAt: '2026-08-21',
    nextReviewAt: '2026-12-01',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Vấn đề pháp lý phức tạp (vụ kiện lớn, tài sản nhiều, tranh chấp quốc tế VN-Nhật) — luật sư riêng có thể phù hợp hơn 法テラス.',
      'Bị ép ký giấy / đe dọa — tư vấn 法テラス TRƯỚC khi ký bất kỳ giấy gì.',
      'Bị bắt / tạm giữ — yêu cầu 当番弁護士 (luật sư trực miễn phí lần đầu) qua 弁護士会 都道府県, không qua 法テラス.',
      'Vấn đề visa nghiêm trọng (overstay, hủy visa, từ chối nhập cảnh) — luật sư chuyên 入管 + 法テラス có thể không đủ chuyên môn.',
    ],
  },
  quickAction: {
    deadline:
      'Cần tư vấn ngay: gọi hotline 0570-078374 trong giờ làm việc (9:00–21:00 ngày thường, 9:00–17:00 thứ 7). Đặt lịch tư vấn: thường có hẹn trong 1–2 tuần. Tình huống khẩn cấp (bị bắt, DV nguy hiểm): gọi cảnh sát / hotline DV trước, 法テラス sau.',
    office:
      '法テラス có trụ sở chính + văn phòng ở mọi 都道府県 + 司法書士 / 弁護士 hợp tác trên toàn quốc. Hotline trung tâm: 0570-078374 (sapo-dial). Tư vấn trực tuyến: trang web houterasu.or.jp có chat. Tư vấn trực tiếp: tại văn phòng 法テラス địa phương hoặc qua luật sư hợp tác.',
    doNow: [
      'Gọi 0570-078374 — nói "法律相談を予約したいです" (đặt lịch tư vấn pháp lý). Có thông dịch nếu cần.',
      'Chuẩn bị: giấy tờ thu nhập (源泉徴収票, sổ lương), giấy tờ liên quan vụ việc, bản dịch nếu có giấy tiếng Việt.',
      'Mô tả tình huống ngắn gọn (1 phút) khi đặt lịch — họ sẽ phân loại đến luật sư phù hợp.',
      'Nếu nghèo (đủ điều kiện 民事法律扶助): yêu cầu "民事法律扶助の利用を検討したいです" — sẽ được 3 lần tư vấn miễn phí.',
      'Nếu cần luật sư đại diện vụ kiện: hỏi "弁護士費用の立替制度について教えてください" — chương trình ứng phí luật sư.',
      'Trường hợp DV / quấy rối: nói rõ — 法テラス có quy trình ưu tiên + miễn điều kiện thu nhập cho một số trường hợp.',
    ],
    bring: [
      '在留カード + hộ chiếu',
      'Giấy tờ thu nhập 12 tháng gần nhất (sổ lương, 源泉徴収票, 確定申告 nếu có)',
      'Sổ tài sản (số dư bank, bất động sản, xe — nếu có)',
      'Giấy tờ liên quan vụ việc (hợp đồng, thư từ, tin nhắn, ảnh)',
      'Giấy chứng nhận thu nhập gia đình (nếu sống chung)',
      'Câu hỏi viết trước (giúp tận dụng 30 phút tư vấn)',
    ],
    ifLate:
      'Đã ký giấy bất lợi / đã quá hạn nộp đơn / đã thua sơ thẩm: vẫn nên tư vấn 法テラス. Nhiều vụ có thể khiếu nại / kháng cáo / xin xét lại — luật sư đánh giá khả năng. Đừng tự bỏ cuộc.',
    officialSourceLabels: ['法テラス trang chính', '法テラス multilingual info'],
  },
  whoIsThisFor: [
    'Người Việt thu nhập thấp ở Nhật — không đủ tiền thuê luật sư riêng (~3–5 vạn yên/giờ).',
    'Người chưa biết vấn đề mình có cần luật sư hay tự xử lý — cần 1 lần tư vấn để định hướng.',
    'Người đang trong vụ ly hôn / DV / lao động / nợ — cần luật sư đại diện nhưng không có tiền trả trước.',
    'Người bị bắt / tạm giữ — cần luật sư chỉ định miễn phí (国選弁護人 cho vụ hình sự).',
    'Người mới sang Nhật — không biết hệ thống pháp lý + cần điểm bắt đầu đáng tin cậy.',
    'Bất kỳ ai cần định hướng pháp lý + tránh các "luật sư dạo" / cò trên FB.',
  ],
  whenToDo: [
    'Khi có vấn đề pháp lý mà không biết có cần luật sư không — tư vấn 1 lần để định hướng.',
    'Khi cần luật sư đại diện nhưng không đủ tiền trả trước — xét chương trình 民事法律扶助.',
    'Khi bị bắt / tạm giữ — yêu cầu 当番弁護士 (qua 弁護士会) hoặc 国選弁護人 (sau 起訴, qua tòa).',
    'Khi nhận giấy tòa / thư cảnh báo pháp lý mà không hiểu — đặt lịch trong vài ngày.',
    'Trước khi ký bất kỳ giấy nào quan trọng (ly hôn, từ bỏ tài sản, nhận trách nhiệm nợ) — tư vấn TRƯỚC.',
  ],
  whereToDo: [
    'Hotline 法テラス: 0570-078374 (sapo-dial) — đặt lịch + hỏi chung. 9:00–21:00 thường, 9:00–17:00 thứ 7.',
    'Trang web: https://www.houterasu.or.jp/ — tra văn phòng địa phương, tải đơn, chat tư vấn.',
    'Văn phòng 法テラス địa phương — mỗi 都道府県 có ít nhất 1, các thành phố lớn có nhiều.',
    'Tư vấn qua điện thoại: 0570-078374 — một số trường hợp có thể tư vấn trực tiếp qua hotline.',
    'Tư vấn tại văn phòng / luật sư hợp tác — thường thuận tiện hơn cho vụ phức tạp.',
    'Đa ngôn ngữ: 0570-078377 (多言語情報提供サービス) — chương trình hỗ trợ ngoại ngữ riêng (tiếng Việt qua thông dịch).',
  ],
  estimatedTime:
    'Đặt lịch tư vấn: gọi 5–15 phút. Đợi đến lịch: thường 3 ngày – 2 tuần. Mỗi buổi tư vấn: 30 phút (điều kiện 民事法律扶助). Quy trình xét duyệt 民事法律扶助: 2–4 tuần. Quy trình xét 国選弁護人 (sau bắt): vài giờ – 2 ngày.',
  fees: [
    'Hotline 0570-078374: phí cuộc gọi thông thường (sapo-dial — không phải 0120 free, nhưng rẻ).',
    'Tư vấn 法テラス theo 民事法律扶助: **MIỄN PHÍ** cho người đủ điều kiện thu nhập (tối đa 3 lần/vụ, 30 phút/lần).',
    'Tư vấn 法テラス NGOÀI 民事法律扶助 (thu nhập cao): có phí — kiểm tra với văn phòng địa phương.',
    'Ứng phí luật sư 民事法律扶助: 法テラス trả trước cho luật sư. Bạn trả góp 5,000–10,000 yên/tháng không tính lãi sau khi vụ xong. Có miễn trả nếu thắng kiện không thu được tiền + thu nhập vẫn thấp.',
    'Từ 01/04/2026: người đang nhận 生活保護 có thể nộp đơn xin miễn hoàn trả (償還免除) phí đã ứng qua Internet trên toàn quốc — không cần đến trực tiếp văn phòng 法テラス.',
    '当番弁護士 (luật sư trực 1 lần khi bị bắt): MIỄN PHÍ. Sau đó cần luật sư riêng = phí.',
    '国選弁護人 (luật sư chỉ định cho hình sự): MIỄN PHÍ trong giai đoạn 起訴 nếu thu nhập thấp.',
    'Phí thay đổi — kiểm tra trang chính thức trước khi đặt.',
  ],
  documentsChecklist: [
    { label: '在留カード + Hộ chiếu', required: true, note: 'Bản gốc khi đến văn phòng. Ảnh chụp khi gọi điện.' },
    { label: 'Giấy thu nhập 12 tháng gần nhất', required: true, note: '源泉徴収票 (cuối năm) + 給与明細 (sổ lương hàng tháng) + 確定申告書 nếu có. Quyết định điều kiện 民事法律扶助.' },
    { label: 'Giấy chứng nhận tài sản', required: false, note: 'Số dư ngân hàng, bất động sản, xe. Nếu có nhiều tài sản → có thể không đủ điều kiện 民事法律扶助.' },
    { label: 'Giấy tờ liên quan vụ việc', required: true, note: 'Hợp đồng, thư từ tòa / cảnh sát / công ty, tin nhắn LINE, ảnh, biên bản — tất cả gì có.' },
    { label: 'Giấy chứng nhận tình trạng gia đình', required: false, note: 'Nếu sống cùng gia đình + cùng kinh tế — thu nhập gia đình tính chung. Nếu sống riêng — chỉ thu nhập cá nhân.' },
    { label: 'Bản dịch giấy tờ tiếng Việt', required: false, note: 'Nếu có giấy tờ chỉ tiếng Việt — dịch sơ trước. Luật sư cần đọc được.' },
    { label: 'Câu hỏi viết trước', required: false, note: '30 phút trôi nhanh. Viết 5–10 câu hỏi quan trọng nhất trước.' },
  ],
  commonMistakes: [
    'Nghĩ "tôi là người nước ngoài, không được dùng 法テラス" → SAI. 法テラス phục vụ TẤT CẢ người sống ở Nhật bất kể quốc tịch / visa, miễn là có 在留カード hợp pháp.',
    'Nghĩ "không nói được tiếng Nhật giỏi nên không gọi được" → SAI. Có dịch vụ thông dịch qua trio-call. Câu mở: "ベトナム語の通訳をお願いします."',
    'Tự đi gặp luật sư riêng đắt tiền (5–10 vạn yên/giờ) trước khi thử 法テラス → lãng phí. Tư vấn 法テラス trước để định hướng.',
    'Tin "luật sư miễn phí" trên FB / Zalo / quảng cáo → có thể là cò bất hợp pháp lấy phí cao. Chỉ tin 法テラス, 弁護士会, hoặc luật sư có giấy phép Nhật.',
    'Không chuẩn bị giấy thu nhập → 法テラス không thể xét điều kiện 民事法律扶助 → mất 1 buổi.',
    'Đến tư vấn không có giấy tờ vụ việc → luật sư không tư vấn cụ thể được, chỉ tư vấn chung chung.',
    'Hết 30 phút không đặt câu hỏi quan trọng → luật sư không đoán được. Viết câu hỏi trước.',
    'Đợi đến khi thua kiện sơ thẩm mới gọi → kháng cáo có thời hạn 14 ngày. Liên hệ NGAY khi nhận giấy tòa.',
    'Tin lời "tự khai phá sản dễ" → 自己破産 phức tạp + ảnh hưởng visa + tín dụng nhiều năm. Phải có luật sư.',
    'Không biết "当番弁護士" khi bị bắt → ngay khi bị bắt, yêu cầu cảnh sát "当番弁護士を呼んでください" — luật sư trực miễn phí lần đầu.',
  ],
  faq: [
    {
      question: 'Tôi có thu nhập thấp — sao biết tôi đủ điều kiện 民事法律扶助 không?',
      answer:
        'Điều kiện chính:\n\n1. **Thu nhập cá nhân (sau thuế) hàng tháng** dưới ngưỡng tùy nơi sống + số người phụ thuộc:\n• Đơn thân ở Tokyo: ~ 200,000 yên/tháng\n• Hộ 2 người ở Tokyo: ~ 276,000 yên/tháng\n• Hộ 3 người ở Tokyo: ~ 299,000 yên/tháng\n• Vùng khác Tokyo: ngưỡng thấp hơn ~10–20%\n\n2. **Tài sản** dưới ngưỡng (tiền mặt + tiết kiệm):\n• Đơn thân: ~ 1,800,000 yên\n• Hộ 2 người: ~ 2,500,000 yên\n• Bất động sản tự ở thường KHÔNG tính (trừ giá trị cao)\n\n3. **Vụ việc có khả năng thắng** (luật sư đánh giá).\n\n**Số liệu thay đổi hàng năm** — kiểm tra trang chính thức 法テラス. Nếu không chắc — gọi hotline cứ thử, họ xét miễn phí.',
    },
    {
      question: '法テラス có luật sư người Việt / nói tiếng Việt không?',
      answer:
        'Hiếm có luật sư người Việt trong 法テラス, nhưng có 2 cơ chế hỗ trợ:\n\n1. **Dịch vụ thông dịch qua trio-call** — 法テラス mời thông dịch viên tiếng Việt (qua điện thoại) tham gia buổi tư vấn. Miễn phí cho người dùng 民事法律扶助.\n\n2. **Hotline đa ngôn ngữ riêng**: 0570-078377 — phục vụ tiếng Việt + nhiều ngôn ngữ khác. Tư vấn cơ bản + giới thiệu luật sư phù hợp.\n\n3. **Luật sư có kinh nghiệm với người nước ngoài** — 法テラス có danh sách. Yêu cầu: "外国人案件に詳しい弁護士をお願いします."\n\n4. **Luật sư người Việt ở Nhật** — có một số (đăng ký tại 弁護士会 都道府県). Tra "ベトナム人 弁護士 + 都道府県" hoặc qua Đại sứ quán Việt Nam Tokyo. Họ KHÔNG nhất thiết qua 法テラス nhưng có thể tham gia 民事法律扶助 nếu là 法テラス契約弁護士.',
    },
    {
      question: 'Tôi vừa bị cảnh sát bắt — 法テラス giúp được không?',
      answer:
        '**Lúc vừa bị bắt (chưa 起訴 — khoảng 72 giờ đầu)**:\n• Yêu cầu **当番弁護士** (luật sư trực) qua 弁護士会 都道府県, KHÔNG qua 法テラス. Nói: "当番弁護士を呼んでください." MIỄN PHÍ lần đầu.\n• 当番弁護士 đến trong vài giờ — tư vấn 30–60 phút.\n\n**Sau 起訴 (truy tố)**:\n• Yêu cầu **国選弁護人** (luật sư do tòa chỉ định, MIỄN PHÍ cho thu nhập thấp). Đây là CHƯƠNG TRÌNH CỦA 法テラス + tòa.\n• Nói với cảnh sát / kiểm sát: "国選弁護人を選任したいです."\n• 法テラス chỉ định luật sư cụ thể trong vài ngày.\n\n**Người nhà giúp**:\n• Gọi 0570-078374 hỏi quy trình.\n• Gọi 弁護士会 都道府県 nơi bị bắt yêu cầu 当番弁護士.\n• Liên hệ Đại sứ quán Việt Nam (quyền theo công ước Vienna).\n\nXem thêm guide [Khi cảnh sát hỏi / triệu tập / bắt giữ].',
    },
    {
      question: 'Tôi đang bị nợ chồng chất + chủ nợ đòi liên tục — 法テラス giúp gì?',
      answer:
        '法テラス có chương trình hỗ trợ vấn đề nợ:\n\n**1. Tư vấn miễn phí** (nếu đủ điều kiện 民事法律扶助):\n• Phân tích nợ tổng (tổng tiền, lãi suất, chủ nợ).\n• Đánh giá lựa chọn: 任意整理 (thương lượng), 個人再生 (phá sản dân sự), 自己破産 (tự khai phá sản).\n\n**2. Ứng phí luật sư cho thủ tục pháp lý**:\n• 自己破産: chi phí 30–50 vạn yên — 法テラス ứng, trả góp.\n• 個人再生: 30–50 vạn yên — tương tự.\n• 任意整理: 5–10 vạn yên/chủ nợ — có thể ứng.\n\n**3. Bảo vệ khỏi đòi nợ**:\n• Sau khi luật sư nhận vụ → gửi 受任通知 cho chủ nợ → chủ nợ KHÔNG được liên lạc bạn nữa, chỉ qua luật sư. Đây là quyền pháp lý mạnh.\n\n**Lưu ý visa**:\n• 自己破産 + 個人再生 KHÔNG ảnh hưởng visa hiện tại.\n• NHƯNG có thể ảnh hưởng gia hạn / chuyển visa nếu 入管 thấy "không tự lập tài chính."\n• Tư vấn luật sư + 入管 cùng lúc.',
    },
    {
      question: 'Tôi đặt lịch xong, đến tư vấn — có gì cần biết trước?',
      answer:
        '**Trước buổi tư vấn**:\n• Mang đầy đủ giấy tờ checklist.\n• Viết câu hỏi trước (ưu tiên 5 câu quan trọng nhất).\n• Đến đúng giờ — luật sư có lịch khít, đến muộn = mất phút.\n• Nếu cần thông dịch — báo trước khi đặt lịch để 法テラス chuẩn bị.\n\n**Trong 30 phút**:\n• Mở đầu: kể tóm tắt vụ việc 5 phút.\n• Đưa giấy tờ liên quan.\n• Đặt câu hỏi cụ thể.\n• Hỏi: "次のステップは何ですか?" (Bước tiếp theo là gì?) + "費用はどれくらいかかりますか?" (Phí khoảng bao nhiêu?) + "どのくらい時間がかかりますか?" (Bao lâu?).\n\n**Sau buổi**:\n• Ghi chép kết luận luật sư đưa ra.\n• Quyết định có thuê luật sư đại diện không.\n• Nếu có — bắt đầu thủ tục 民事法律扶助 (xét duyệt 2–4 tuần).\n\n**Mẹo**: 30 phút trôi nhanh. Nếu thấy chưa đủ — hỏi "もう一度相談を予約できますか?" (Có thể đặt lịch lần nữa không?). Đủ điều kiện = tối đa 3 lần/vụ.',
    },
    {
      question: 'Tôi nghi vấn đề mình không phải pháp lý mà là hành chính (入管 / 役所) — 法テラス có giúp không?',
      answer:
        'Có một phần. 法テラス chuyên về tranh chấp pháp lý cần tòa. Vấn đề thuần hành chính nên đi đúng cơ quan:\n\n**Vấn đề nhập cảnh / visa** → 出入国在留管理庁 hotline + 行政書士 (administrative scrivener). 法テラス có thể tư vấn nếu là kháng cáo từ chối visa / hủy visa.\n\n**Vấn đề thuế** → 税務署 + 税理士 (tax accountant). 法テラス chỉ tư vấn nếu thành tranh chấp tòa.\n\n**Vấn đề bảo hiểm / nenkin** → 年金事務所 + 社会保険労務士. 法テラス vào nếu đến tòa.\n\n**Vấn đề lao động** → 労働基準監督署 đầu tiên. 法テラス giúp nếu cần kiện.\n\n**Vấn đề tiêu dùng** → 消費生活センター 188. 法テラス giúp nếu đòi tiền lại qua tòa.\n\n**Mẹo**: gọi 法テラス hotline trước — họ giới thiệu cơ quan đúng nếu không thuộc phạm vi.',
    },
  ],
  counterPhrases: [
    {
      jp: '法律相談を予約したいです。',
      romaji: 'Houritsu soudan o yoyaku shitai desu.',
      vn: 'Tôi muốn đặt lịch tư vấn pháp lý.',
      note: 'Câu mở đầu khi gọi 0570-078374. Sau đó họ hỏi nội dung vụ việc.',
    },
    {
      jp: 'ベトナム語の通訳をお願いします。',
      romaji: 'Betonamu-go no tsuuyaku o onegai shimasu.',
      vn: 'Xin cho tôi thông dịch tiếng Việt.',
      note: 'Yêu cầu thông dịch khi đặt lịch hoặc trong buổi tư vấn. 法テラス có dịch vụ trio-call.',
    },
    {
      jp: '民事法律扶助の利用を検討したいです。',
      romaji: 'Minji houritsu fujo no riyou o kentou shitai desu.',
      vn: 'Tôi muốn xét sử dụng chương trình hỗ trợ pháp lý dân sự.',
      note: 'Câu chính khi muốn dùng dịch vụ miễn phí. Họ sẽ hỏi thu nhập + tài sản.',
    },
    {
      jp: '弁護士費用の立替制度について教えてください。',
      romaji: 'Bengoshi hiyou no tatekae seido ni tsuite oshiete kudasai.',
      vn: 'Xin giải thích chương trình ứng phí luật sư.',
      note: 'Khi cần luật sư đại diện vụ kiện nhưng không có tiền trả trước.',
    },
    {
      jp: '当番弁護士を呼んでください。',
      romaji: 'Touban bengoshi o yonde kudasai.',
      vn: 'Xin gọi luật sư trực cho tôi.',
      note: 'Câu cứu mạng khi bị cảnh sát bắt. Yêu cầu cảnh sát gọi qua 弁護士会. MIỄN PHÍ lần đầu.',
    },
    {
      jp: '国選弁護人を選任したいです。',
      romaji: 'Kokusen bengonin o sennin shitai desu.',
      vn: 'Tôi muốn xin luật sư do tòa chỉ định.',
      note: 'Sau khi 起訴 (truy tố). Áp dụng cho thu nhập thấp. 法テラス quản lý.',
    },
    {
      jp: '外国人案件に詳しい弁護士をお願いします。',
      romaji: 'Gaikokujin anken ni kuwashii bengoshi o onegai shimasu.',
      vn: 'Xin luật sư có kinh nghiệm với người nước ngoài.',
      note: 'Yêu cầu khi vụ việc liên quan visa / quan hệ VN-Nhật. 法テラス có danh sách.',
    },
    {
      jp: '次のステップは何ですか。費用はどれくらいですか。',
      romaji: 'Tsugi no suteppu wa nan desu ka. Hiyou wa dorekurai desu ka.',
      vn: 'Bước tiếp theo là gì. Phí khoảng bao nhiêu.',
      note: 'Câu hỏi quan trọng cuối buổi tư vấn — luật sư cho định hướng cụ thể.',
    },
  ],
  officialLinks: [
    { label: '法テラス trang chính', url: 'https://www.houterasu.or.jp/' },
    { label: '法テラス multilingual info', url: 'https://www.houterasu.or.jp/site/foreign-nationals/' },
    { label: '日本弁護士連合会 (JFBA)', url: 'https://www.nichibenren.or.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Xác định loại vấn đề + tìm điểm bắt đầu phù hợp',
      description:
        '**Trước khi gọi 法テラス**, tự hỏi:\n\n• **Vấn đề có thuộc pháp lý / cần luật sư không?**\n  - Pháp lý (cần 法テラス): ly hôn, DV, lao động (kiện), nợ, hợp đồng, thuê nhà tranh chấp, tai nạn đòi bồi thường, tội phạm bị buộc tội.\n  - Hành chính (đi cơ quan trực tiếp tốt hơn): xin visa, xin trợ cấp, đăng ký thuế, đổi địa chỉ.\n  - Y tế: bệnh viện / 保健所.\n  - Tâm lý: hotline chuyên (よりそいホットライン / DV相談+).\n\n• **Tình huống có khẩn cấp không?**\n  - Đang bị bắt → yêu cầu **当番弁護士** qua 弁護士会, không qua 法テラス.\n  - DV nguy hiểm → 110 hoặc DV相談+ trước.\n  - Nguy hiểm tính mạng → 119 hoặc 110.\n  - Khác → 法テラス OK.\n\n• **Có đủ thu nhập điều kiện 民事法律扶助 không?**\n  - Đơn thân Tokyo dưới ~200,000 yên/tháng → có khả năng đủ.\n  - Hộ gia đình 2–3 người → ngưỡng cao hơn.\n  - Không chắc → cứ gọi, họ xét miễn phí.',
      documents: [],
      tip: '法テラス là CỬA CHÍNH cho người không có tiền thuê luật sư. Đừng tự xử lý vấn đề pháp lý nghiêm trọng một mình — gọi tư vấn ít nhất 1 lần.',
    },
    {
      step: 2,
      title: 'Gọi hotline 0570-078374 + đặt lịch tư vấn',
      description:
        '**Hotline**: 0570-078374 (sapo-dial — phí cuộc gọi thường, không phải free).\n\n**Giờ làm việc**: Thứ 2–6: 9:00–21:00. Thứ 7: 9:00–17:00. Chủ nhật + lễ: nghỉ.\n\n**Quy trình gọi**:\n1. Bấm số → menu hướng dẫn (tiếng Nhật).\n2. Nhân viên trả lời.\n3. Bạn nói: "法律相談を予約したいです. ベトナム語の通訳をお願いします."\n4. Họ hỏi:\n   - Tên + số điện thoại + địa chỉ\n   - Loại vấn đề (1 phút mô tả)\n   - Thu nhập gần đúng\n5. Họ đặt lịch tư vấn (thường 3 ngày – 2 tuần) tại văn phòng địa phương / luật sư hợp tác.\n6. Họ gửi SMS / gọi xác nhận.\n\n**Hotline đa ngôn ngữ riêng**: 0570-078377 — chỉ chuyên ngoại ngữ. Có tiếng Việt qua thông dịch. Có thể hữu ích nếu Nhật còn yếu.\n\n**Trang web** houterasu.or.jp có chat tư vấn (tiếng Nhật).\n\n**Mẹo**: gọi vào sáng (9:00–11:00) hoặc trước 18:00 — ít chờ hơn.',
      documents: [
        '在留カード (đọc số thẻ khi cần)',
      ],
      tip: 'Cuộc gọi đầu chỉ là ĐẶT LỊCH + xét sơ điều kiện — không phải tư vấn nội dung. Luật sư chỉ tư vấn trong buổi hẹn.',
    },
    {
      step: 3,
      title: 'Chuẩn bị giấy tờ + câu hỏi cho buổi tư vấn',
      description:
        '**1 tuần trước buổi**, gom:\n\n**Giấy tờ thu nhập** (cho xét 民事法律扶助):\n• 源泉徴収票 năm trước (公司 cấp cuối năm).\n• 給与明細 (sổ lương) 3 tháng gần nhất.\n• 確定申告書 nếu là 個人事業主.\n• Sổ ngân hàng (số dư các tài khoản chính).\n• Giấy chứng nhận tài sản khác (sổ đỏ, đăng ký xe — nếu có).\n\n**Giấy tờ vụ việc** — tùy loại:\n• Ly hôn: 戸籍謄本 + 結婚証明書 + chứng minh DV nếu có.\n• Lao động: hợp đồng lao động + sổ lương + email công ty.\n• Nợ: hợp đồng vay + sổ trả nợ + thư đòi nợ.\n• Tai nạn: 事故証明書 + ảnh + chẩn đoán bác sĩ.\n• Hình sự: bản cáo trạng (nếu đã 起訴) + tóm tắt sự việc.\n\n**Bản dịch tiếng Việt sang Nhật** — luật sư cần đọc được. Nếu không kịp dịch chính thức, dùng Google Translate viết tóm tắt.\n\n**Câu hỏi viết trước** — 5–10 câu ưu tiên:\n1. Vụ việc của tôi có khả năng thắng không?\n2. Tôi có lựa chọn nào (hòa giải / kiện / bỏ qua)?\n3. Bước tiếp theo cụ thể?\n4. Phí ước tính (luật sư + tòa)?\n5. Thời gian dự kiến?\n6. Rủi ro nếu không làm gì?\n7. Có ảnh hưởng visa không?\n8. Tôi có đủ điều kiện 民事法律扶助 không?\n9. Có cần thuê luật sư riêng hay tự xử lý được?\n10. Hồ sơ kế tiếp tôi cần chuẩn bị?',
      documents: [
        '源泉徴収票 / 給与明細',
        'Giấy tờ vụ việc',
        'Câu hỏi viết trước',
        '在留カード',
      ],
      tip: 'Chuẩn bị 30 phút trước = tận dụng được 30 phút tư vấn. Đến không chuẩn bị = tư vấn chung chung không giúp được.',
    },
    {
      step: 4,
      title: 'Đến buổi tư vấn 30 phút — tận dụng tối đa',
      description:
        '**Đến đúng giờ**, mang đủ giấy tờ.\n\n**Cấu trúc 30 phút điển hình**:\n\n**0–5 phút**: tự giới thiệu + tóm tắt vụ việc.\n• "私は◯◯です. ベトナム人で在留資格は◯◯です."\n• Tóm tắt vụ việc 2–3 câu.\n\n**5–10 phút**: đưa giấy tờ + luật sư đọc.\n\n**10–25 phút**: tư vấn + đặt câu hỏi.\n• Luật sư phân tích.\n• Bạn hỏi từ danh sách câu hỏi.\n• Ghi chép kết luận.\n\n**25–30 phút**: bước tiếp + xét 民事法律扶助.\n• "次のステップは何ですか?"\n• "費用はどれくらいですか?"\n• Nếu cần đại diện: hỏi quy trình 民事法律扶助 + ai sẽ là luật sư.\n\n**Sau buổi**:\n• Ghi chép sạch lại trong 24 giờ (trí nhớ phai nhanh).\n• Quyết định trong 1 tuần: có thuê luật sư đại diện không.\n• Nếu có → bắt đầu xét duyệt 民事法律扶助 (2–4 tuần).\n\n**Nếu chưa đủ**:\n• Đặt lịch lần 2 (tối đa 3 lần/vụ với 民事法律扶助).\n• Mang giấy tờ bổ sung.',
      documents: [
        'Tất cả giấy tờ chuẩn bị',
        'Sổ ghi chép',
        'Bút',
      ],
      tip: 'Luật sư trả lời "không chắc / cần xem thêm" là bình thường — vụ phức tạp cần thời gian. KHÔNG quyết ngay trong buổi nếu không thoải mái.',
    },
    {
      step: 5,
      title: 'Quyết định: thuê luật sư đại diện hay tự xử lý',
      description:
        '**Sau tư vấn, 3 lựa chọn**:\n\n**A. Tự xử lý** (nếu vụ đơn giản + luật sư khuyên không cần):\n• Ví dụ: gửi 内容証明郵便 (thư đăng ký) đòi tiền nợ nhỏ.\n• Tự nộp giấy tòa cho 簡易裁判所 (tòa giản dị) cho vụ dưới 60 vạn yên.\n• Lưu ý cảnh báo trong tư vấn.\n\n**B. Thuê luật sư riêng (NGOÀI 法テラス)** — nếu thu nhập đủ + vụ phức tạp:\n• Phí: 30–50 vạn yên trở lên (tùy vụ).\n• Có thể qua giới thiệu 弁護士会 都道府県.\n• Tự đàm phán phí với luật sư.\n\n**C. Dùng 民事法律扶助 của 法テラス** — nếu thu nhập thấp + cần luật sư:\n• Quy trình:\n  1. Nộp đơn xin 民事法律扶助 + giấy tờ thu nhập.\n  2. 法テラス xét 2–4 tuần.\n  3. Nếu được duyệt → 法テラス chỉ định luật sư + ứng phí.\n  4. Bạn ký hợp đồng với luật sư.\n  5. Vụ tiến hành.\n  6. Sau khi vụ xong → trả góp 5,000–10,000 yên/tháng không tính lãi.\n  7. Nếu thắng kiện không thu được tiền + thu nhập vẫn thấp → có thể được miễn trả.\n\n**D. Bỏ vụ** (cuối cùng) — nếu luật sư khuyên không có khả năng thắng + chi phí vượt giá trị.\n\n**Cảnh báo**:\n• ĐỪNG ký hợp đồng luật sư mà không hiểu rõ phí + nội dung công việc.\n• ĐỪNG tin "luật sư miễn phí" trên mạng — chỉ tin 法テラス hoặc 弁護士会.\n• Sau khi luật sư nhận vụ → chủ nợ / đối tác KHÔNG được liên lạc bạn nữa, chỉ qua luật sư. Đây là quyền pháp lý quan trọng.',
      documents: [
        'Đơn xin 民事法律扶助 (lấy tại 法テラス)',
        'Giấy thu nhập đầy đủ',
        'Hợp đồng luật sư (đọc kỹ trước khi ký)',
      ],
      tip: 'Vụ pháp lý dài (3–12 tháng). Lựa chọn cẩn thận TRƯỚC khi bắt đầu sẽ tiết kiệm thời gian + tiền sau này.',
    },
  ],
};

export default houterasuLegalAidForeigners;
