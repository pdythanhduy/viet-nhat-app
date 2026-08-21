import type { AdminGuide } from '../../../../types/content';

const japaneseSchoolSystemChildren: AdminGuide = {
  id: 'japanese-school-system-children',
  category: 'daily-law',
  lastVerified: '2026-08-21',
  priority: 'normal',
  title: 'Hệ thống trường học Nhật Bản cho con',
  titleJp: '日本の学校制度 — 外国人の子ども',
  icon: 'school-outline',
  color: '#2980B9',
  description:
    'Hệ thống giáo dục Nhật chia 4 cấp: 小学校 (6 năm), 中学校 (3 năm), 高校 (3 năm), 大学/専門 (2–4 năm). 小学校 + 中学校 là 義務教育 (giáo dục bắt buộc) cho công dân Nhật. Trẻ em người nước ngoài KHÔNG bắt buộc theo luật Nhật, nhưng có quyền học miễn phí ở trường công nếu đăng ký. Phần lớn 市役所 gửi 就学通知書 tự động cho hộ có trẻ đến tuổi.',
  searchKeywords: [
    'trường học Nhật',
    'cho con đi học',
    'nhập học',
    'chuyển trường',
    'trường công',
    'trường tư',
    'giáo dục Nhật',
    'nyuugaku',
    'shougakkou',
    'chuugakkou',
    '小学校',
    '中学校',
    '高校',
    '義務教育',
    '就学通知書',
    '編入',
    '転校',
    '給食',
    'PTA',
    'gakkou',
  ],
  legalScope: {
    jurisdiction: 'mixed',
    jurisdictionNote:
      '文部科学省 (MEXT) ban hành quy định chung về 学校教育法 trên toàn quốc. Mỗi 市区町村 (教育委員会) phụ trách phân bổ trường công + cấp 就学通知書. Quy trình + giấy tờ cụ thể tùy 市区町村. Trẻ em nước ngoài có quyền học trường công nhưng không bắt buộc — phải chủ động đăng ký với 市役所.',
    sourceVerifiedAt: '2026-08-21',
    nextReviewAt: '2027-02-01',
    riskLevel: 'low',
    whenToAskExpert: [
      'Con không nói được tiếng Nhật và bạn lo lắng việc học — hỏi 教育委員会 về 日本語指導 (xem guide japanese-language-support-children).',
      'Chuyển trường giữa năm (編入) — mỗi 市役所 có policy khác. Hỏi trực tiếp.',
      'Con có nhu cầu đặc biệt (khuyết tật, ADHD, autism) — có 特別支援学級 / 特別支援学校 nhưng quy trình phức tạp.',
      'Con học cấp 高校 — KHÔNG phải 義務教育. Phải thi 入試 (kỳ thi tuyển) hoặc 推薦. Tùy 都道府県.',
    ],
  },
  quickAction: {
    deadline:
      'Khi chuyển đến địa chỉ mới: làm thủ tục 転入学 trong 1–2 tuần. Trẻ đến tuổi 入学 (vào tháng 4): hồ sơ thường nộp tháng 1–2 trước đó. Mới sang Nhật: liên hệ 市役所 ngay tuần đầu sau khi đăng ký 住民票.',
    office:
      '市役所 / 区役所 — phòng 教育委員会 hoặc 学事課. Họ cấp 就学通知書 + chỉ trường công gần nhà. Trường tư: liên hệ trực tiếp trường.',
    doNow: [
      'Đăng ký 住民票 ở 市役所 trước (đã có thì bỏ qua).',
      'Đến quầy 教育委員会 / 学事課 nói "子どもの学校手続きをしたいです" + đưa 在留カード của cha/mẹ và con.',
      'Nhân viên kiểm tra tuổi con + chỉ trường công 学区 (theo địa chỉ). Nhận 就学通知書 hoặc giấy chỉ định trường.',
      'Đến trường được chỉ định, gặp văn phòng (事務室). Nộp giấy + đặt lịch họp với hiệu trưởng / cô chủ nhiệm.',
      'Chuẩn bị đồng phục (nếu trường có), 学用品 (dụng cụ học), cặp sách 〜ランドセル cho 小学校.',
    ],
    bring: [
      '在留カード của cha/mẹ + con (nếu con có)',
      'Hộ chiếu của con (xác minh ngày sinh)',
      '住民票 (in mới trong 3 tháng gần)',
      '就学通知書 từ 市役所 (nếu đã có)',
      '健康診断書 hoặc 母子手帳 (sổ sức khỏe trẻ em — Nhật cấp)',
      'Hồ sơ học tập từ nước ngoài / từ trường cũ ở Nhật (nếu là 転入学)',
    ],
    ifLate:
      'Trẻ đã đến tuổi 入学 mà chưa làm thủ tục: vẫn được học, không bị phạt. Nhưng nên làm sớm để con không bỏ lỡ kỳ học. Hỏi 教育委員会 về 編入 (chuyển vào giữa năm).',
    officialSourceLabels: ['文部科学省 (MEXT)'],
  },
  whoIsThisFor: [
    'Gia đình người Việt vừa sang Nhật có con trong tuổi 義務教育 (6–15 tuổi).',
    'Gia đình chuẩn bị đón con sang Nhật theo visa 家族滞在.',
    'Cha mẹ có con sắp đến tuổi 小学校 hoặc 中学校.',
    'Gia đình chuyển nhà từ 市 này sang 市 khác — cần làm 転校.',
    'Không phải bạn nếu con đã trên 15 tuổi và đã hết 義務教育 — quy trình vào 高校 khác.',
  ],
  whenToDo: [
    'Trước khi con đến tuổi 6 (vào 小学校): thủ tục thường tháng 1–2 năm vào 入学.',
    'Khi chuyển nhà: trong 1–2 tuần sau dọn nhà.',
    'Khi mới sang Nhật: tuần đầu sau khi đăng ký 住民票.',
    'Khi đón con từ Việt Nam sang theo visa 家族滞在: ngay sau khi con đến.',
    'Trước kỳ tuyển sinh 高校 (tháng 12–1 năm trước): nếu con đang ở 中学 cuối.',
  ],
  whereToDo: [
    '市役所 / 区役所 — phòng 教育委員会 hoặc 学事課. Lấy 就学通知書 + thông tin trường.',
    'Trường được chỉ định — văn phòng (事務室) làm thủ tục cụ thể.',
    'Trường tư: liên hệ trực tiếp trường, KHÔNG qua 市役所.',
    'Đại sứ quán / lãnh sự quán Việt Nam — xin giấy xác nhận học bạ Việt Nam nếu trường yêu cầu.',
  ],
  estimatedTime:
    'Thủ tục tại 市役所: 30–60 phút. Tại trường: 1–2 giờ buổi đầu (gặp hiệu trưởng + xem lớp). Thời gian đợi vào lớp: thường 1–2 tuần sau khi nộp đầy đủ hồ sơ.',
  fees: [
    'Trường công 小学校 + 中学校: học phí 0 円 theo 義務教育.',
    'Phí thực tế phải trả: 給食費 (cơm trưa, ~4,000–6,000円/tháng), 教材費 (sách, dụng cụ), 修学旅行 (du lịch học tập), 部活 (CLB). Tổng thường 5,000–15,000円/tháng tùy trường + cấp.',
    '高校 công: học phí có 高校無償化 cho gia đình thu nhập < ngưỡng cụ thể. Hỏi 都道府県 教育委員会.',
    '小学校 đầu vào: chi phí ban đầu (đồng phục + ランドセル + 学用品) thường 50,000–100,000円. ランドセル riêng có thể 30,000–80,000円.',
    'Trường tư / 私立: học phí tùy trường, từ vài chục vạn đến hơn 100 vạn yên / năm.',
    'Phí thay đổi tùy trường + tùy 市町村. Kiểm tra với trường + 市役所 cụ thể.',
  ],
  documentsChecklist: [
    { label: '在留カード của con (nếu có) + cha/mẹ', required: true, note: 'Hồ sơ chính. Photo cũng được cho 1 số bước.' },
    { label: '住民票 mới (3 tháng gần)', required: true, note: 'Lấy tại 市役所 — 350円/bản.' },
    { label: '就学通知書', required: false, note: 'Tự động gửi từ 市役所 cho trẻ đúng tuổi. Mới sang / chuyển nhà — phải xin.' },
    { label: '母子手帳', required: false, note: 'Sổ sức khỏe mẹ-con — Nhật cấp khi mang thai. Nếu sinh ở VN: đi khám sức khỏe Nhật trước nhập học.' },
    { label: 'Hộ chiếu của con', required: true, note: 'Để xác minh ngày sinh.' },
    { label: 'Hồ sơ học tập cũ', required: false, note: 'Nếu đã học ở VN / nước khác / 市 cũ. Trường yêu cầu thì dịch sang tiếng Nhật.' },
    { label: 'Ảnh thẻ của con', required: false, note: 'Một số trường yêu cầu cho thẻ học sinh.' },
  ],
  commonMistakes: [
    'Không đăng ký với 市役所 vì nghĩ "trẻ nước ngoài không bắt buộc" — đúng là không bắt buộc theo luật Nhật, nhưng đăng ký giúp con được học miễn phí + đi đúng trường gần nhà.',
    'Đợi con biết tiếng Nhật mới cho đi học — sai. Nhập học sớm + dùng 日本語指導 hỗ trợ tốt hơn.',
    'Không hỏi về 給食費 / 教材費 → bất ngờ với hóa đơn hàng tháng.',
    'Bỏ qua thủ tục 転校 khi chuyển nhà → con bị "ngắt đoạn" giữa 2 trường.',
    'Tin "trường tư là tốt nhất" mà không cân nhắc tài chính — trường công Nhật chất lượng tốt + miễn phí.',
    'Không tham gia PTA / hoạt động trường — bỏ lỡ thông tin quan trọng + cô lập với cộng đồng phụ huynh.',
    'Quên mua 健康診断書 trước nhập học → trường không nhận, phải đi khám lại.',
  ],
  faq: [
    {
      question: 'Con tôi mới sang Nhật, không nói được tiếng Nhật — có cho đi học được không?',
      answer:
        'Có. 市役所 vẫn nhận đăng ký. Trường công có chương trình 日本語指導 cho học sinh nước ngoài (xem guide japanese-language-support-children). Hỏi cụ thể với 教育委員会 về trường nào trong 学区 có 国際教室 hoặc 取り出し授業 — không phải mọi trường đều có.',
    },
    {
      question: 'Tôi nên cho con học trường công hay trường tư?',
      answer:
        '**Trường công**: miễn phí, gần nhà, đa văn hóa hơn ở khu nhiều người nước ngoài. Phù hợp đa số gia đình. **Trường tư / インターナショナル**: học phí cao (vài trăm vạn yên/năm), chương trình đa dạng, có thể có lớp tiếng Anh. Cân nhắc tài chính + định hướng dài hạn (về VN hay ở Nhật). Không có lựa chọn "tốt nhất" cho mọi gia đình.',
    },
    {
      question: 'Con tôi đã học lớp 3 ở VN, sang Nhật vào lớp mấy?',
      answer:
        'Tùy 市役所 + ngày sinh. Hệ thống Nhật tính theo năm sinh: 4/1 năm trước đến 3/31 năm sau là cùng 学年. Con có thể được vào lớp tương ứng tuổi (vd 9 tuổi → 小3 ở Nhật), hoặc xuống 1 lớp nếu hiệu trưởng đề nghị (để học tiếng Nhật trước). Hỏi 教育委員会 + hiệu trưởng cùng quyết.',
    },
    {
      question: 'Trường yêu cầu mua ランドセル — phải mua không?',
      answer:
        'ランドセル là cặp truyền thống cho 小学生 — không phải luật bắt buộc, nhưng hầu hết 小学校 yêu cầu. Giá phổ biến 30,000–80,000円. Có thể mua hand-me-down từ phụ huynh đi trước (giảm chi phí), mua second-hand trên Mercari, hoặc xin 市役所 / NPO hỗ trợ nếu thu nhập thấp.',
    },
    {
      question: 'Con tôi học cấp 中学 cuối, sắp chuyển sang 高校 — tôi cần biết gì?',
      answer:
        '高校 KHÔNG phải 義務教育 — phải thi 入試 (kỳ thi tuyển sinh). 都立 / 県立 高校 (công) có thi viết + phỏng vấn. 私立 高校 có thi riêng + đôi khi 推薦 (tiến cử). Trẻ em nước ngoài có quyền thi như học sinh Nhật. Một số 高校 có quota riêng cho 帰国生 / 外国人. Hỏi 中学校 cô chủ nhiệm sớm (lớp 9 / 中3) để chuẩn bị.',
    },
  ],
  counterPhrases: [
    {
      jp: '子どもの学校手続きをしたいです。',
      romaji: 'Kodomo no gakkou tetsuzuki o shitai desu.',
      vn: 'Tôi muốn làm thủ tục trường học cho con.',
      note: 'Tại quầy 教育委員会 / 学事課 ở 市役所.',
    },
    {
      jp: '転入学の手続きをお願いします。',
      romaji: 'Tennyuugaku no tetsuzuki o onegai shimasu.',
      vn: 'Xin giúp tôi làm thủ tục chuyển trường.',
      note: 'Khi chuyển nhà từ 市 khác đến.',
    },
    {
      jp: '日本語指導はありますか。',
      romaji: 'Nihongo shidou wa arimasu ka.',
      vn: 'Có hỗ trợ tiếng Nhật cho con không?',
      note: 'Hỏi với 教育委員会 hoặc trường khi con yếu tiếng Nhật.',
    },
    {
      jp: '学区はどこですか。',
      romaji: 'Gakku wa doko desu ka.',
      vn: 'Khu trường (trường gần nhà) là trường nào?',
      note: 'Tìm trường công được chỉ định theo địa chỉ.',
    },
    {
      jp: '給食費はいくらですか。',
      romaji: 'Kyuushokuhi wa ikura desu ka.',
      vn: 'Phí cơm trưa là bao nhiêu?',
      note: 'Hỏi để biết chi phí hàng tháng.',
    },
    {
      jp: '入学に必要なものを教えてください。',
      romaji: 'Nyuugaku ni hitsuyou na mono o oshiete kudasai.',
      vn: 'Cho tôi biết những thứ cần thiết khi nhập học.',
      note: 'Tại buổi gặp hiệu trưởng / cô chủ nhiệm.',
    },
    {
      jp: 'ベトナム語の説明はありますか。',
      romaji: 'Betonamu-go no setsumei wa arimasu ka.',
      vn: 'Có tài liệu giải thích tiếng Việt không?',
      note: 'Khu nhiều người Việt (Aichi, Kanagawa, Tokyo) có thể có.',
    },
  ],
  officialLinks: [
    { label: '文部科学省 (MEXT)', url: 'https://www.mext.go.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Đăng ký 住民票 cho gia đình + con',
      description:
        'Trước khi làm thủ tục trường, gia đình phải có 住民票 ở địa chỉ hiện tại.\n\n• Mới sang Nhật: đến 市役所 đăng ký 住民票 + 在留カード.\n• Vừa chuyển 市: làm 転入届 trong 14 ngày.\n• Đã có 住民票: in bản mới (350円) tại 市役所 hoặc コンビニ với マイナンバーカード.',
      documents: [
        '在留カード',
        'Hộ chiếu',
        'Hợp đồng thuê nhà / giấy chứng nhận địa chỉ',
      ],
      tip: 'Một số 市役所 cấp 就学通知書 tự động vài tuần sau khi đăng ký 住民票 nếu trong nhà có trẻ đúng tuổi. Đợi 1–2 tuần xem có thư đến không.',
    },
    {
      step: 2,
      title: 'Đến 市役所 — phòng 教育委員会 hoặc 学事課',
      description:
        'Hỏi quầy hướng dẫn (案内) "教育委員会はどこですか" hoặc "学事課はどこですか".\n\nTại quầy:\n1. Nói "子どもの学校手続きをしたいです" + đưa 在留カード của cha/mẹ và con.\n2. Nhân viên kiểm tra tuổi con + chỉ trường công 学区 (theo địa chỉ nhà).\n3. Cấp 就学通知書 hoặc giấy chỉ định trường.\n4. Hỏi rõ: lịch nhập học, người liên hệ ở trường, có 日本語指導 không.\n\nGhi note thông tin trường + số điện thoại liên hệ.',
      documents: [
        '在留カード của cha/mẹ + con',
        'Hộ chiếu của con',
        '住民票 mới',
      ],
      tip: 'Khu có nhiều người Việt (Aichi, Kanagawa, Saitama, Osaka, Tokyo) — một số 市役所 có nhân viên thông dịch tiếng Việt hoặc tiếng Anh. Hỏi trước khi đến.',
    },
    {
      step: 3,
      title: 'Liên hệ trường — gặp văn phòng + hiệu trưởng',
      description:
        'Gọi điện cho trường được chỉ định, đặt lịch gặp.\n\nTại trường:\n1. Vào 事務室 (văn phòng) — đưa 就学通知書 + 在留カード.\n2. Văn phòng đặt lịch họp với 校長 (hiệu trưởng) hoặc 担任 (cô chủ nhiệm).\n3. Buổi họp: thảo luận lớp con sẽ vào, lịch học, đồng phục, dụng cụ cần mua.\n4. Hỏi về 日本語指導 nếu con yếu tiếng Nhật.\n5. Lấy danh sách 学用品 (dụng cụ học) + lịch sự kiện đầu năm.',
      documents: [
        '就学通知書',
        '在留カード của cha/mẹ + con',
        '母子手帳 hoặc 健康診断書',
        'Hồ sơ học tập cũ (nếu có)',
      ],
      tip: 'Mang theo bút + sổ ghi note. Buổi họp đầu thường nhiều thông tin — note lại để khỏi quên.',
    },
    {
      step: 4,
      title: 'Chuẩn bị 入学準備 — đồ dùng + đồng phục',
      description:
        'Theo danh sách trường đưa:\n\n• **小学校**: ランドセル (cặp truyền thống ~30,000–80,000円), 体操服 (đồng phục thể dục), 上履き (giày trong nhà), 学用品 (bút, vở, kéo, hồ dán...). Đồng phục thường KHÔNG bắt buộc cho 小学.\n• **中学校**: đồng phục bắt buộc (~30,000–60,000円 cả bộ), 体操服, 上履き, 通学カバン.\n• **書道セット, 絵の具, 算数セット**: tùy lớp + tùy trường.\n\nCác cách giảm chi phí:\n• Mercari / second-hand cho ランドセル + đồng phục.\n• Hỏi PTA / NPO địa phương về hand-me-down.\n• Khu thu nhập thấp có thể xin 就学援助 (hỗ trợ học) từ 市役所.',
      documents: [
        'Danh sách 学用品 từ trường',
        'Tiền 50,000–100,000円 (cho 小学 đầu vào)',
      ],
      tip: 'Mua đồ dùng ở Aeon, Itoyokado, hoặc store chuyên 学用品 — họ có sẵn theo danh sách trường. Mang giấy danh sách đến để nhân viên giúp.',
    },
    {
      step: 5,
      title: 'Theo dõi sau nhập học — PTA + thông báo trường',
      description:
        'Sau khi con vào lớp:\n\n1. **Tham gia 入学式** (lễ nhập học) hoặc 始業式 — phụ huynh được mời.\n2. **PTA**: tham gia ít nhất buổi 保護者会 đầu — gặp phụ huynh khác + biết quy tắc trường.\n3. **連絡帳** (sổ liên lạc): cô viết hằng ngày — đọc + ký.\n4. **Thông báo qua giấy** (お便り / プリント): trường gửi giấy cho phụ huynh — nhiều thông tin quan trọng.\n5. **App trường** (一部 trường có): cài app để nhận thông báo nhanh.\n6. **Khi con bệnh / nghỉ học**: gọi 連絡帳 hoặc app trước 8h sáng để báo.',
      documents: [
        '連絡帳',
        'Lịch học từ trường',
      ],
      tip: 'Đọc giấy thông báo trường mỗi ngày — không bỏ qua. Có guide riêng "Dịch Thư Nhật" sẽ giúp dịch giấy này (đang trong roadmap).',
    },
    {
      step: 6,
      title: 'Khi gặp khó — nguồn hỗ trợ',
      description:
        'Nếu gặp vấn đề (con bị bắt nạt, không hiểu bài, không hòa nhập):\n\n1. **担任** (cô chủ nhiệm) trước — qua 連絡帳 hoặc xin gặp.\n2. **校長 / 教頭** nếu 担任 không giải quyết được.\n3. **教育委員会** (市役所) — nếu vấn đề leo thang hoặc trường không hỗ trợ.\n4. **多文化共生センター** (Multicultural Center) — tư vấn cho gia đình nước ngoài, có tiếng Việt ở 1 số khu.\n5. **国際交流協会** (International Exchange Association) — của 都道府県, có tư vấn miễn phí.\n6. **電話相談** (hotline): いじめ相談 (bắt nạt) 0120-0-78310 — miễn phí, tiếng Nhật.\n\nKhông cô lập — luôn có người giúp.',
      documents: [],
      tip: 'Trong 市 đông người Việt, có nhóm phụ huynh người Việt trên Facebook / LINE — kết nối qua đó cho thông tin thực tế.',
    },
  ],
};

export default japaneseSchoolSystemChildren;
