import type { AdminGuide } from '../../../../types/content';

const childAllowanceJidouTeate: AdminGuide = {
  id: 'child-allowance-jidou-teate',
  category: 'money',
  lastVerified: '2026-05-09',
  priority: 'normal',
  title: 'Trợ cấp trẻ em (児童手当)',
  titleJp: '児童手当 — 外国人家庭の申請',
  icon: 'gift-outline',
  color: '#27AE60',
  description:
    '児童手当 là trợ cấp tiền mặt hàng tháng từ chính phủ Nhật cho gia đình có con. Áp dụng cho cả người nước ngoài có 住民票 ở Nhật. Từ 10/2024, hệ thống đã được mở rộng: bỏ giới hạn thu nhập (所得制限) + kéo dài đến hết tuổi 18 (cuối năm tài chính). Mức tiền cụ thể tùy tuổi con + số con — KIỂM TRA với 市役所 vì policy thay đổi.',
  searchKeywords: [
    'trợ cấp trẻ em',
    '児童手当',
    'jidou teate',
    'tiền cho con',
    'child allowance',
    'subsidy',
    'phúc lợi gia đình',
    'sinh con ở Nhật',
    'đăng ký 児童手当',
    '所得制限',
    '高校生まで',
    '認定請求',
    '現況届',
    'こども家庭庁',
    'shidan',
    'support tiền mặt',
  ],
  legalScope: {
    jurisdiction: 'mixed',
    jurisdictionNote:
      '児童手当法 do こども家庭庁 (Children and Families Agency, thành lập 2023) quản lý cấp quốc gia. Từ 10/2024, có cải cách lớn: bỏ 所得制限 (giới hạn thu nhập), kéo dài tuổi đến cuối năm tài chính 18 tuổi (高校生 hết), tăng mức cho con thứ 3+. Đăng ký + chi trả thực tế qua 市町村. Mức tiền cụ thể + lịch chi trả thay đổi — phải kiểm tra với 市役所 hiện tại.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Tình huống đặc biệt: ly hôn / con sống riêng / làm việc ở nước ngoài / con học du học — quy định riêng, hỏi 市役所.',
      'Bị từ chối hoặc khoản trợ cấp giảm bất thường — hỏi 市役所 lý do bằng văn bản, hoặc 国民生活センター 188 nếu có tranh chấp.',
      'Quên đăng ký nhiều tháng — vẫn có thể xin lại 1 phần trong 1 số trường hợp, nhưng thường không lùi quá thời hạn quy định. Hỏi 市役所 sớm.',
    ],
  },
  quickAction: {
    deadline:
      'Sau khi sinh con / chuyển nhà / đón con từ nước ngoài: nộp 認定請求 (đơn xin trợ cấp lần đầu) trong 15 ngày để được tính từ tháng xảy ra. Quá 15 ngày → tính từ tháng nộp đơn (mất phần backdate).',
    office:
      '市役所 / 区役所 — phòng 子育て支援課 hoặc 児童家庭課 (tên tùy 市). Một số 市 có online qua マイナポータル nếu có マイナンバーカード.',
    doNow: [
      'Sau khi sinh / chuyển nhà / đón con — đến 市役所 trong 15 ngày.',
      'Hỏi quầy hướng dẫn "児童手当の申請をしたいです" — chỉ đến phòng phụ trách.',
      'Lấy form 認定請求書. Điền: tên cha/mẹ + con, ngày sinh, 在留カード番号, số tài khoản ngân hàng.',
      'Nộp + đợi 認定通知書 (giấy xác nhận đã được duyệt) — thường 1–2 tháng.',
      'Tiền chuyển vào tài khoản 4–6 lần/năm tùy 市 (theo policy mới sau 10/2024 — kiểm tra với 市役所).',
    ],
    bring: [
      '在留カード của cha/mẹ + con (nếu có)',
      '住民票 mới (nếu mới đăng ký) — thường 市役所 tự kiểm tra',
      'Sổ ngân hàng / cash card (để biết số tài khoản nhận tiền)',
      'Hộ chiếu của con (xác minh ngày sinh)',
      '健康保険証 của cha/mẹ',
      'マイナンバー của cha/mẹ + con (số 12 chữ số)',
      '出生届 (nếu vừa sinh) — đã nộp tại 市役所 từ trước',
    ],
    ifLate:
      'Quá 15 ngày sau ngày sinh / chuyển nhà / đón con: vẫn nộp được nhưng tiền chỉ tính từ tháng nộp đơn, KHÔNG backdate. Vẫn có lợi → đi nộp ngay. Không có deadline tuyệt đối — không quá muộn để bắt đầu nhận.',
    officialSourceLabels: ['児童手当制度のご案内 — こども家庭庁'],
  },
  whoIsThisFor: [
    'Gia đình người Việt có con < 18 tuổi (đến hết năm tài chính 18 tuổi) đang sống tại Nhật.',
    'Người vừa sinh con ở Nhật — đăng ký ngay sau 出生届.',
    'Gia đình mới đón con từ Việt Nam sang theo visa 家族滞在 — đăng ký ngay.',
    'Gia đình chuyển 市 — phải làm 転入 + đăng ký lại.',
    'KHÔNG áp dụng cho: con không có 住民票 ở Nhật, du học sinh con đến thăm tạm, người không có visa hợp lệ.',
  ],
  whenToDo: [
    'Sau khi sinh con: trong 15 ngày để được full backdate.',
    'Sau khi chuyển nhà sang 市 khác: trong 15 ngày sau 転入届.',
    'Sau khi đón con từ nước ngoài: trong 15 ngày sau khi con có 住民票.',
    'Hàng năm tháng 6: nộp 現況届 (báo cáo tình hình hiện tại) — bắt buộc với một số trường hợp. Một số 市 đã bỏ yêu cầu này từ 2022. Hỏi 市役所.',
    'Khi con qua 高校 (sau 中学 hết): xác nhận tiếp tục — có thể tự động, hoặc cần đăng ký lại tùy 市.',
  ],
  whereToDo: [
    '市役所 / 区役所 — phòng 子育て支援課 / 児童家庭課 (tên tùy 市町村).',
    'Một số 市 có online qua マイナポータル — cần マイナンバーカード + smartphone.',
    'Đại sứ quán / lãnh sự quán Việt Nam — KHÔNG xử lý 児童手当. Đây là dịch vụ Nhật.',
  ],
  estimatedTime:
    'Tại 市役所: 30–60 phút làm thủ tục. Đợi 認定通知書: 1–2 tháng. Tiền chuyển khoản đầu tiên: thường tháng tiếp theo của ngày được duyệt.',
  fees: [
    'Đăng ký 児童手当: MIỄN PHÍ.',
    'Mức tiền chi trả (theo policy 10/2024): khác nhau theo tuổi + số con thứ mấy. Mức cụ thể THAY ĐỔI theo policy — kiểm tra với 市役所 hoặc trang こども家庭庁 trước khi tính toán tài chính cá nhân.',
    'Hệ thống cũ (trước 10/2024) có 所得制限 (giới hạn thu nhập); hệ thống mới đã bỏ giới hạn này. Lịch chi trả cũng thay đổi từ 4 lần/năm thành 6 lần/năm (mỗi 2 tháng) theo policy mới — kiểm tra với 市役所.',
    'Phí 住民票 cần để nộp đơn (nếu yêu cầu): ~350円/bản tại 市役所 hoặc コンビニ.',
  ],
  documentsChecklist: [
    { label: '認定請求書 (form do 市役所 phát)', required: true, note: 'Lấy + điền tại 市役所 hoặc tải online từ trang 市役所.' },
    { label: '在留カード của cha/mẹ + con', required: true, note: 'Photo cũng được. Cha/mẹ là người đứng tên đăng ký.' },
    { label: 'Sổ ngân hàng / cash card', required: true, note: 'Cần số tài khoản để nhận tiền chuyển khoản. Tài khoản phải đứng tên cha/mẹ đăng ký.' },
    { label: 'マイナンバー (12 chữ số) của cha/mẹ + con', required: true, note: 'Có trên 通知カード hoặc マイナンバーカード.' },
    { label: 'Hộ chiếu của con', required: false, note: 'Xác minh ngày sinh nếu sinh ở nước ngoài.' },
    { label: '健康保険証 của cha/mẹ', required: false, note: 'Có thể được yêu cầu xác minh quan hệ.' },
    { label: '出生届 (nếu vừa sinh)', required: false, note: 'Đã nộp ở 市役所 — họ tự xác minh.' },
  ],
  commonMistakes: [
    'Đợi quá 15 ngày sau sinh / chuyển nhà → mất phần backdate, tiền tính từ tháng nộp đơn.',
    'Không đăng ký vì nghĩ "người nước ngoài không được" — sai, gia đình có 住民票 đều được, kể cả visa lao động / 留学 / 家族滞在.',
    'Quên 現況届 hàng năm (nếu 市 còn yêu cầu) → tiền có thể bị tạm dừng.',
    'Đăng ký bằng tài khoản ngân hàng đứng tên ông/bà / người khác → bị từ chối, phải đứng tên cha/mẹ.',
    'Không báo khi chuyển 市 → tiền dừng + phải làm lại từ đầu ở 市 mới (mất 1–2 tháng).',
    'Không cập nhật khi sinh thêm con → con mới không được tính. Phải nộp form 額改定請求書.',
    'Sai số マイナンバー → đơn bị trả lại, mất thời gian.',
    'Tin số tiền cố định cho mọi trường hợp — mức thực tế phụ thuộc tuổi + số con + chính sách hiện tại. Luôn hỏi 市役所.',
  ],
  faq: [
    {
      question: 'Tôi mới sinh con ở Nhật — phải làm gì?',
      answer:
        'Quy trình:\n\n1. **Trong 14 ngày sau sinh**: nộp 出生届 tại 市役所 (việc làm sau sinh — xem guide baby-born-in-japan).\n2. **Cùng lúc hoặc trong 15 ngày**: nộp 認定請求 cho 児童手当 — cùng phòng 子育て支援課 thường có thể làm 1 lần.\n3. **Mang**: 在留カード cha/mẹ, sổ ngân hàng, マイナンバー.\n4. **Đợi 1–2 tháng**: nhận 認定通知書 qua thư.\n5. **Tiền chuyển khoản** vào tài khoản đăng ký theo lịch chi trả của 市.\n\nNếu nộp trong 15 ngày → tính từ tháng sinh. Quá → tính từ tháng nộp đơn.',
    },
    {
      question: 'Vợ tôi đang chăm con ở Việt Nam, tôi đi làm ở Nhật — có được nhận không?',
      answer:
        'Tùy. 児童手当 yêu cầu **con phải có 住民票 ở Nhật**. Nếu con sống ở Việt Nam và không có 住民票 ở Nhật → KHÔNG được nhận. Nếu vợ + con đã sang Nhật theo visa 家族滞在 và đăng ký 住民票 → cha/mẹ ở Nhật là người đứng tên nhận trợ cấp.\n\nLưu ý: cha/mẹ là 主たる生計維持者 (người chính nuôi gia đình) — thường là người có thu nhập cao hơn — đứng tên nhận, không nhất thiết là người chăm trực tiếp.',
    },
    {
      question: 'Chồng tôi đứng tên đăng ký — sau ly hôn, ai được nhận?',
      answer:
        'Người đang nuôi con trực tiếp (親権者 / 監護者) sẽ là người được nhận. Sau khi ly hôn:\n\n1. Cập nhật 住民票 — tách hộ.\n2. Đến 市役所 nộp form 受給事由消滅届 cho người cũ + 認定請求 mới cho người đang nuôi.\n3. Mang giấy tờ ly hôn (離婚届受理証明書) + giấy chứng nhận quyền nuôi con.\n\nTiền chuyển sang tài khoản người đang nuôi từ tháng tiếp theo.',
    },
    {
      question: 'Tôi nghe nói có 高校生にまで拡大 từ 10/2024 — đúng không?',
      answer:
        'Đúng. Cải cách 児童手当 hiệu lực từ 10/2024:\n• Bỏ 所得制限 (trước đây gia đình thu nhập cao bị cắt / giảm).\n• Tuổi nhận kéo dài đến cuối năm tài chính 18 tuổi (gọi là "高校生まで" thông thường).\n• Tăng mức cho con thứ 3+ (trước có rồi nhưng tăng thêm).\n• Lịch chi trả từ 4 lần/năm thành 6 lần/năm (mỗi 2 tháng).\n\nCha mẹ có con 中学 / 高校 đã không nhận trước 10/2024 → cần đăng ký mới sau cải cách. Hỏi 市役所 chi tiết — quy trình tự động hay cần đăng ký lại tùy 市.',
    },
    {
      question: 'Tôi quên đăng ký 6 tháng sau khi sinh — có lấy lại được không?',
      answer:
        'Phần đã quá 15 ngày + đến tháng nộp đơn KHÔNG được backdate trong đa số trường hợp. Ví dụ: con sinh tháng 1, nộp đơn tháng 7 → tiền tính từ tháng 7, mất 6 tháng đầu.\n\nNgoại lệ: trường hợp đặc biệt (cha mẹ bệnh nặng, lý do bất khả kháng) có thể xin xét — hỏi 市役所 + có thể cần luật sư.\n\nDù sao đăng ký ngay đi — không bao giờ quá muộn để bắt đầu nhận.',
    },
  ],
  counterPhrases: [
    {
      jp: '児童手当の申請をしたいです。',
      romaji: 'Jidou teate no shinsei o shitai desu.',
      vn: 'Tôi muốn đăng ký trợ cấp trẻ em.',
      note: 'Câu mở đầu tại quầy 市役所.',
    },
    {
      jp: '認定請求書をください。',
      romaji: 'Nintei seikyuusho o kudasai.',
      vn: 'Cho tôi đơn xin trợ cấp.',
      note: 'Form chính cần điền lần đầu.',
    },
    {
      jp: '必要な書類を教えてください。',
      romaji: 'Hitsuyou na shorui o oshiete kudasai.',
      vn: 'Cho tôi biết giấy tờ cần thiết.',
      note: 'Hỏi nhân viên để chuẩn bị đầy đủ.',
    },
    {
      jp: 'いつから振り込まれますか。',
      romaji: 'Itsu kara furikomaremasu ka.',
      vn: 'Khi nào tiền được chuyển vào tài khoản?',
      note: 'Hỏi để biết lịch nhận tiền đầu tiên.',
    },
    {
      jp: '引っ越しの手続きをお願いします。',
      romaji: 'Hikkoshi no tetsuzuki o onegai shimasu.',
      vn: 'Xin giúp tôi làm thủ tục chuyển nhà.',
      note: 'Khi chuyển 市 — cần đăng ký lại.',
    },
    {
      jp: '子どもが生まれたので、申請したいです。',
      romaji: 'Kodomo ga umareta node, shinsei shitai desu.',
      vn: 'Tôi vừa sinh con nên muốn đăng ký.',
      note: 'Trong 15 ngày sau sinh để full backdate.',
    },
    {
      jp: '振り込み口座を変更したいです。',
      romaji: 'Furikomi kouza o henkou shitai desu.',
      vn: 'Tôi muốn đổi tài khoản nhận tiền.',
      note: 'Khi đổi ngân hàng / đóng tài khoản cũ.',
    },
    {
      jp: 'ベトナム語の説明はありますか。',
      romaji: 'Betonamu-go no setsumei wa arimasu ka.',
      vn: 'Có tài liệu giải thích tiếng Việt không?',
      note: 'Một số 市 có pamphlet đa ngôn ngữ.',
    },
  ],
  keyTerms: [
    {
      term: '児童手当',
      reading: 'じどうてあて',
      meaningVi: 'trợ cấp trẻ em (theo Luật 児童手当法)',
      noteVi: 'Tên chính thức của khoản trợ cấp này. Đừng nhầm với 児童扶養手当 (jidou fuyou teate — trợ cấp cho gia đình đơn thân — khác quy định và cao hơn). Từ 10/2024 đã bỏ 所得制限 + kéo dài đến hết năm tài chính 18 tuổi.',
    },
    {
      term: '認定請求',
      reading: 'にんていせいきゅう',
      meaningVi: 'đơn xin xét duyệt lần đầu',
      noteVi: 'Form 認定請求書 — nộp 1 lần đầu (lúc sinh con / chuyển nhà / đón con). Trong 15 ngày để được full backdate. Khác với 額改定請求書 (nộp khi sinh thêm con).',
    },
    {
      term: '額改定請求書',
      reading: 'がくかいていせいきゅうしょ',
      meaningVi: 'đơn điều chỉnh mức trợ cấp (khi có thay đổi số con)',
      noteVi: 'Nộp khi sinh thêm con — KHÔNG cần làm lại 認定請求 từ đầu. Cũng nộp khi 1 con qua tuổi không còn được nhận (tự động dừng, nhưng các con còn lại có thể đổi thứ tự "con thứ mấy" → ảnh hưởng mức tiền).',
    },
    {
      term: '現況届',
      reading: 'げんきょうとどけ',
      meaningVi: 'báo cáo tình hình hàng năm',
      noteVi: 'Một số 市 vẫn yêu cầu nộp tháng 6 hàng năm để xác nhận gia đình vẫn đủ điều kiện. Nhiều 市 đã bỏ từ 2022 (xét tự động qua マイナンバー). Nếu 市 còn yêu cầu mà quên nộp → tiền tạm dừng tháng 10.',
    },
    {
      term: '主たる生計維持者',
      reading: 'しゅたるせいけいいじしゃ',
      meaningVi: 'người chính nuôi gia đình (người đứng tên đăng ký)',
      noteVi: 'Người có thu nhập cao hơn — đứng tên nhận trợ cấp + tài khoản ngân hàng phải là của người này. KHÔNG nhất thiết là người chăm con trực tiếp. Sau ly hôn → người 親権者 (có quyền nuôi con) đứng tên thay.',
    },
  ],
  officialLinks: [
    { label: '児童手当制度のご案内 — こども家庭庁', url: 'https://www.cfa.go.jp/policies/kokoseido/jidouteate/annai/' },
    { label: '児童手当の制度改正について(2024年10月〜) — こども家庭庁', url: 'https://www.cfa.go.jp/policies/kokoseido/jidouteate/' },
    { label: '児童手当法(e-Gov 法令検索)', url: 'https://laws.e-gov.go.jp/law/346AC0000000073' },
    { label: 'マイナポータル(オンライン申請)', url: 'https://myna.go.jp/' },
    { label: 'こども家庭庁 — TOP', url: 'https://www.cfa.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Xác định tình huống — sinh con / chuyển nhà / đón con',
      description:
        'Trigger event để đăng ký 児童手当:\n\n1. **Vừa sinh con ở Nhật** — đăng ký ngay sau 出生届.\n2. **Chuyển 市** — phải đăng ký lại ở 市 mới (tiền không tự chuyển theo).\n3. **Đón con từ nước ngoài** sang theo visa 家族滞在 — sau khi con có 住民票.\n4. **Trẻ qua tuổi mới được mở rộng đến 高校** (sau 10/2024) — có thể cần đăng ký lại tùy 市.\n5. **Sinh thêm con** — nộp 額改定請求書 thay vì 認定請求 mới.\n\nMỗi tình huống đều có deadline 15 ngày để được full backdate.',
      documents: [],
      tip: 'Khi sinh con ở Nhật — làm 出生届 + 児童手当 cùng buổi tại 市役所. Tiết kiệm 1 chuyến. Hỏi nhân viên "出生届と児童手当を一緒に申請できますか?".',
    },
    {
      step: 2,
      title: 'Chuẩn bị giấy tờ',
      description:
        'Thu thập trước khi đến 市役所:\n\n**Bắt buộc**:\n• 在留カード của cha/mẹ + con (nếu có)\n• Sổ ngân hàng hoặc cash card có số tài khoản\n• マイナンバー (12 chữ số) của cha/mẹ + con\n\n**Có thể được yêu cầu**:\n• 健康保険証 của cha/mẹ\n• Hộ chiếu của con (xác minh ngày sinh)\n• Giấy tờ chứng minh quan hệ (出生届 đã nộp / kết hôn 婚姻届)\n• 住民票 mới (350円 — thường 市役所 tự kiểm tra trong hệ thống)\n\n**Tài khoản ngân hàng**: phải đứng tên cha/mẹ là người đăng ký. KHÔNG được dùng tài khoản ông/bà / người khác.\n\nNếu chưa có tài khoản: mở trước (xem guide bank-account).',
      documents: [
        '在留カード của cha/mẹ + con',
        'Sổ ngân hàng / cash card',
        'マイナンバー (12 chữ số)',
      ],
      tip: 'Mang theo cả 印鑑 (con dấu) — một số 市 vẫn yêu cầu cho form, dù xu hướng mới đã chuyển sang chữ ký.',
    },
    {
      step: 3,
      title: 'Đến 市役所 — phòng 子育て支援課 / 児童家庭課',
      description:
        'Tại 市役所:\n\n1. Hỏi quầy hướng dẫn (案内): "児童手当はどこですか?" — chỉ phòng phụ trách (tên có thể là 子育て支援課, 児童家庭課, 子ども家庭課 tùy 市).\n\n2. Đến quầy, nói: "児童手当の申請をしたいです". Đưa giấy tờ.\n\n3. Nhân viên đưa form 認定請求書. Điền:\n• Tên cha/mẹ + ngày sinh + tên kana\n• Tên con + ngày sinh + tên kana\n• Địa chỉ + số điện thoại\n• 在留カード番号 + マイナンバー\n• Số tài khoản ngân hàng\n• Tình trạng việc làm cha/mẹ\n• Quan hệ với con\n\n4. Nộp form + giấy tờ. Nhân viên kiểm tra + đóng dấu.\n\n5. Nhận giấy biên nhận (受付票). GIỮ KỸ — cần khi check tiến độ.',
      documents: [
        '認定請求書 (do 市役所 phát)',
        '在留カード + sổ ngân hàng + マイナンバー',
      ],
      tip: 'Khu nhiều người Việt (Aichi, Kanagawa, Saitama, Osaka, Tokyo) — một số 市役所 có nhân viên thông dịch tiếng Việt. Hỏi trước qua điện thoại.',
    },
    {
      step: 4,
      title: 'Đợi 認定通知書 + tiền chuyển khoản',
      description:
        'Sau khi nộp đơn:\n\n1. **Đợi 1–2 tháng**: 市役所 xét duyệt + gửi 認定通知書 (giấy xác nhận đã được duyệt) qua bưu điện. Trong giấy ghi:\n• Mức trợ cấp / tháng (cho từng con)\n• Ngày bắt đầu nhận\n• Lịch chi trả\n• Số tài khoản nhận tiền\n\n2. **Lưu kỹ giấy này**: bằng chứng được duyệt + sẽ cần khi 現況届 / 額改定 sau này.\n\n3. **Tiền chuyển khoản**: theo lịch chi trả của 市 (theo policy mới sau 10/2024 thường là 6 lần/năm — mỗi 2 tháng). Kiểm tra sổ ngân hàng vào ngày dự kiến.\n\n4. **Nếu không thấy tiền**:\n• Trong 認定通知書 có ghi rõ ngày chi trả đầu tiên — đợi đến ngày đó.\n• Đã quá 1 tháng từ ngày dự kiến mà không thấy tiền → gọi 市役所 phòng 子育て支援課 hỏi.',
      documents: [
        '受付票 (biên nhận lần nộp)',
        '認定通知書 (khi nhận)',
      ],
      tip: 'Không đợi tiền vào để biết được duyệt — 認定通知書 đến trước. Nếu sau 2 tháng không nhận giấy này → gọi 市役所 hỏi.',
    },
    {
      step: 5,
      title: 'Hàng năm — 現況届 + cập nhật khi đổi tình huống',
      description:
        'Sau khi đã đăng ký:\n\n1. **現況届 (báo cáo tình hình hiện tại)**: yêu cầu hàng năm tháng 6 (theo lịch của 市). Một số 市 đã bỏ yêu cầu này từ 2022 — kiểm tra với 市役所.\n\nNếu cần nộp:\n• 市役所 gửi form qua bưu điện đầu tháng 6.\n• Điền + nộp lại trong tháng 6.\n• KHÔNG nộp → tiền có thể tạm dừng từ tháng 10.\n\n2. **Cập nhật khi đổi tình huống**:\n• **Sinh thêm con** → 額改定請求書\n• **Chuyển 市** → 受給事由消滅届 ở 市 cũ + 認定請求 ở 市 mới\n• **Ly hôn / chia hộ** → cập nhật người đứng tên\n• **Đổi tài khoản ngân hàng** → 振込先変更届\n• **Con qua tuổi (cuối 中学 / cuối 高校)** → có thể tự động hoặc cần đăng ký lại tùy 市\n\n3. **Tự động dừng**: con đến hết tuổi (cuối năm tài chính 18 tuổi) → tự động dừng. KHÔNG cần làm gì.',
      documents: [
        '現況届 (form 市役所 gửi)',
        'Giấy tờ tùy thân nếu thay đổi',
      ],
      tip: 'Đặt nhắc nhở trên lịch điện thoại "現況届 tháng 6 hàng năm" — quên có thể mất tiền vài tháng.',
    },
  ],
};

export default childAllowanceJidouTeate;
