import type { AdminGuide } from '../../../../types/content';

const visaFeeIncrease20252026: AdminGuide = {
  id: 'visa-fee-increase-2025-2026',
  category: 'immigration',
  lastVerified: '2026-10-16',
  priority: 'normal',
  title: 'Phí gia hạn / đổi visa / vĩnh trú từ 01/10/2026 — bảng phí mới',
  titleJp: '在留許可手数料の改定（2026年10月1日〜）',
  icon: 'cash-outline',
  color: '#D35400',
  description:
    'Từ hồ sơ nộp **từ 01/10/2026**, phí 在留期間更新 (gia hạn) và 在留資格変更 (đổi tư cách) **không còn 6,000 yên đồng loạt** mà tính theo **thời hạn lưu trú được cấp**: online từ 10,000 yên (≤3 tháng) đến 65,000 yên (5 năm), tại quầy đến 75,000 yên. Phí 永住許可 (vĩnh trú) tăng từ 10,000 lên **200,000 yên**. Phí chỉ phải nộp **khi được cấp phép** — bị từ chối thì không mất phí. Nộp online luôn rẻ hơn tại quầy.',
  searchKeywords: [
    'phí visa Nhật',
    'phí gia hạn visa',
    'phí gia hạn visa 2026',
    'phí đổi visa',
    'phí làm visa',
    'visa fee tăng',
    'phí visa tăng 10/2026',
    'phí vĩnh trú 20 man',
    'phí 永住',
    '入管 phí',
    'tiết kiệm phí visa',
    'online申請',
    '在留期間更新 phí',
    '在留資格変更 phí',
    '永住許可申請 phí',
    '再入国許可 phí',
    '手数料',
    '手数料改定',
    '在留許可手数料',
    '収入印紙',
    '在留申請オンラインシステム',
    'visa fee 2026',
    'giảm phí visa',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      'Mức trần do 入管法 (sửa bởi 令和8年法律第32号: tối đa 10万円 cho đổi/gia hạn, 30万円 cho vĩnh trú). Mức thực nộp do 入管法施行令 (政令) quy định, có hiệu lực 01/10/2026. Phí áp theo NGÀY NỘP hồ sơ: hồ sơ nộp đến hết 30/09/2026 vẫn tính phí cũ dù được cấp sau đó.',
    sourceVerifiedAt: '2026-10-16',
    nextReviewAt: '2027-01-15',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Bạn chuẩn bị nộp 永住 (phí 200,000 yên) và không chắc đủ tiêu chuẩn mới — hỏi 行政書士 trước để tránh nộp vội.',
      'Bạn nhận trợ cấp sinh hoạt / thu nhập rất thấp và muốn xin giảm phí — hỏi quầy 入管 hoặc 法テラス.',
      'Bạn không chắc sẽ được cấp mấy năm nên không biết mua bao nhiêu 収入印紙.',
    ],
  },
  quickAction: {
    deadline:
      'Áp dụng cho hồ sơ nộp từ **01/10/2026**. Phí được nộp khi **nhận kết quả cấp phép**, số tiền tùy thời hạn được cấp (1 năm, 3 năm, 5 năm…).',
    office:
      'Nộp online qua **在留申請オンラインシステム** (rẻ hơn, trả qua コンビニ / ngân hàng) hoặc tại 地方出入国在留管理局 (trả bằng 収入印紙, mua ở bưu điện).',
    doNow: [
      'Xem thời hạn lưu trú bạn đang có và thời hạn bạn có thể được cấp lần này (thường giống lần trước nếu hồ sơ không đổi).',
      'Ưu tiên nộp **online**: 1 năm rẻ hơn tại quầy 6,000 yên, 5 năm rẻ hơn 10,000 yên.',
      'Nộp tại quầy: **chờ có thông báo cấp phép** rồi mới mua 収入印紙 đúng số tiền ghi trên thông báo — đừng mua trước.',
      'Nếu đang nhận 生活保護 hoặc thu nhập rất thấp: hỏi quầy về **giảm phí** (còn 10,000 yên). Giảm phí chỉ làm được khi nộp tại quầy, không làm được online.',
    ],
    bring: [
      '在留カード + hộ chiếu',
      'Hồ sơ gia hạn / đổi tư cách theo diện của bạn',
      'Khi nhận kết quả tại quầy: 収入印紙 đúng số tiền trên thông báo',
      'Nếu xin giảm phí: giấy chứng nhận 生活保護 hoặc 課税証明書 (cả khi không chịu thuế) + bản sao sổ ngân hàng',
    ],
    ifLate:
      'Phí mới không phạt người nộp muộn — nhưng nộp sau ngày hết hạn lưu trú là overstay, nguy hiểm hơn nhiều so với tiền phí. Xem guide overstaying-illegal-stay-procedures.',
    officialSourceLabels: ['令和８年１０月１日付け在留許可手数料の額の改定等について — 出入国在留管理庁'],
  },
  whoIsThisFor: [
    'Người sắp gia hạn visa hoặc đổi tư cách lưu trú (留学 → 技人国, 技能実習 → 特定技能, kết hôn…).',
    'Người chuẩn bị xin vĩnh trú — phí giờ là 200,000 yên, cần tính kỹ.',
    'Gia đình gia hạn cho cả vợ/chồng và con — phí tính riêng từng người.',
    'Người có thu nhập thấp muốn biết mình có được giảm phí không.',
  ],
  whenToDo: [
    'Có thể nộp gia hạn từ khoảng 3 tháng trước ngày hết hạn lưu trú.',
    'Chuẩn bị sẵn tiền theo thời hạn bạn dự kiến được cấp — thời hạn càng dài, phí tính theo năm càng rẻ.',
    'Đăng ký tài khoản 在留申請オンラインシステム trước khi cần nộp.',
  ],
  whereToDo: [
    '**在留申請オンラインシステム** (online): cần My Number Card hoặc nhờ công ty/行政書士 đã đăng ký nộp hộ. Phí trả qua コンビニ hoặc ngân hàng (có thêm phí thanh toán nhỏ).',
    '**地方出入国在留管理局 / 支局** (tại quầy): nộp hồ sơ, nhận kết quả, dán 収入印紙.',
    '**Bưu điện lớn**: mua 収入印紙 mệnh giá lớn (chỉ nhận tiền mặt). Quầy bán trong 入管 có thể hết hàng.',
  ],
  estimatedTime:
    'Xét duyệt gia hạn / đổi tư cách thường 2 tuần – 2 tháng, vĩnh trú thường nhiều tháng. Mua 収入印紙: 5–10 phút ở bưu điện.',
  fees: [
    '**Gia hạn / đổi tư cách — nộp ONLINE** (theo thời hạn được cấp): ≤3 tháng 10,000 yên · 3–6 tháng 15,000 · 6 tháng–dưới 1 năm 21,000 · **1 năm 27,000** · 1–dưới 3 năm 42,000 · 3–dưới 5 năm 56,000 · **5 năm 65,000 yên**. Cộng thêm phí thanh toán コンビニ/ngân hàng.',
    '**Gia hạn / đổi tư cách — tại QUẦY** (収入印紙): ≤3 tháng 10,000 yên · 3–6 tháng 18,000 · 6 tháng–dưới 1 năm 25,000 · **1 năm 33,000** · 1–dưới 3 năm 48,000 · 3–dưới 5 năm 64,000 · **5 năm 75,000 yên**.',
    '**永住許可 (vĩnh trú)**: **200,000 yên** (trước 01/10/2026: 10,000 yên).',
    '**Giảm phí** (người nhận 生活保護, thu nhập rất thấp, trẻ trong cơ sở bảo trợ…): đổi / gia hạn còn 10,000 yên; vĩnh trú còn 20,000 yên (chỉ cho vợ/chồng, con của người Nhật / vĩnh trú). Chỉ xin được khi nộp tại quầy.',
    '**Không đổi**: 再入国許可 1 lần 4,000 yên (online 3,500) · nhiều lần 7,000 yên (online 6,500) · 就労資格証明書 2,000 yên (online 1,600) · 資格外活動許可 miễn phí · みなし再入国 miễn phí.',
    'Hồ sơ nộp đến hết **30/09/2026** vẫn theo phí cũ: 6,000 yên (quầy) / 5,500 yên (online) cho gia hạn/đổi tư cách; 10,000 yên cho vĩnh trú.',
  ],
  documentsChecklist: [
    { label: '在留カード', required: true, note: 'Bản gốc.' },
    { label: 'Hộ chiếu', required: true, note: 'Bản gốc.' },
    { label: 'Hồ sơ theo diện lưu trú', required: true, note: 'Đơn + ảnh + giấy tờ công việc / thu nhập / thuế theo diện của bạn.' },
    { label: '収入印紙 (khi nhận kết quả tại quầy)', required: false, note: 'Mua đúng số tiền ghi trên thông báo cấp phép.' },
    { label: 'Giấy tờ xin giảm phí', required: false, note: 'Giấy chứng nhận 生活保護, hoặc 課税証明書 + bản sao sổ ngân hàng. Nộp kèm hồ sơ tại quầy.' },
  ],
  commonMistakes: [
    'Mua 収入印紙 6,000 yên như trước — từ 01/10/2026 số tiền tùy thời hạn được cấp, 1 năm đã là 33,000 yên tại quầy.',
    'Mua 収入印紙 trước khi có kết quả — bạn chưa biết được cấp mấy năm nên dễ mua sai số tiền.',
    'Tưởng bị từ chối vẫn mất phí — phí là phí CẤP PHÉP, chỉ nộp khi được cấp.',
    'Nộp tại quầy vì quen — online rẻ hơn 6,000–10,000 yên mỗi lần, cả nhà cộng lại khá nhiều.',
    'Muốn xin giảm phí nhưng nộp online — giảm phí chỉ làm được tại quầy.',
    'Nộp 永住 khi chưa chắc đủ điều kiện — phí 200,000 yên; tiêu chuẩn xét cũng đã siết từ 01/10/2026 (xem guide permanent-residency-eijuu).',
  ],
  faq: [
    {
      question: 'Tôi đã nộp hồ sơ trước 01/10/2026 nhưng có kết quả sau đó — trả phí nào?',
      answer:
        'Phí CŨ. ISA tính theo ngày nộp: hồ sơ được tiếp nhận đến hết 30/09/2026 trả 6,000 yên (quầy) / 5,500 yên (online) cho gia hạn hoặc đổi tư cách, và 10,000 yên cho vĩnh trú — kể cả khi kết quả có sau 01/10/2026.',
    },
    {
      question: 'Bị từ chối có mất phí không?',
      answer:
        'Không. 手数料 là phí cấp phép — chỉ nộp khi hồ sơ được chấp thuận (dán 収入印紙 lúc nhận thẻ mới, hoặc thanh toán sau khi có thông báo nếu nộp online). Nếu bị 不許可 thì không trả phí; nếu nộp lại và được cấp thì trả phí theo mức tại thời điểm nộp lại.',
    },
    {
      question: 'Tôi nên chọn online hay tại quầy?',
      answer:
        'Nếu làm được, chọn **online**:\n\n• 1 năm: online 27,000 yên — quầy 33,000 yên.\n• 3 năm: online 56,000 yên — quầy 64,000 yên.\n• 5 năm: online 65,000 yên — quầy 75,000 yên.\n\nOnline trả qua コンビニ hoặc ngân hàng (có phí thanh toán nhỏ), không dùng 収入印紙. Cần My Number Card để tự nộp, hoặc nhờ công ty / 行政書士 có đăng ký nộp hộ.\n\nChọn **quầy** nếu bạn muốn xin giảm phí, hoặc hồ sơ phức tạp cần hỏi trực tiếp.',
    },
    {
      question: 'Visa 5 năm có thật sự rẻ hơn không?',
      answer:
        'Tính theo năm thì rẻ hơn nhiều: online 1 năm = 27,000 yên/năm, còn 5 năm = 65,000 yên ÷ 5 = 13,000 yên/năm. Nhưng thời hạn được cấp do ISA quyết định theo hồ sơ (công việc ổn định, thuế, bảo hiểm, nenkin đóng đủ…), bạn không tự chọn được. Giữ hồ sơ "sạch" là cách tốt nhất để được cấp dài hạn.',
    },
    {
      question: 'Ai được giảm phí?',
      answer:
        'Theo ISA, có thể giảm cho người có hoàn cảnh kinh tế tương đương diện nhận 生活保護 và cần cân nhắc nhân đạo, ví dụ:\n\n• Người đang nhận 生活保護.\n• Người thu nhập rất thấp (chứng minh bằng 課税証明書 năm gần nhất, kể cả loại 非課税, + bản sao sổ ngân hàng).\n• Trẻ được gửi trong cơ sở bảo trợ trẻ em.\n• Người nhận một số trợ cấp y tế / khuyết tật / nuôi con nhất định.\n\nMức sau giảm: đổi / gia hạn (trên 3 tháng) còn **10,000 yên**; vĩnh trú còn **20,000 yên** (chỉ áp dụng cho vợ/chồng, con của người Nhật, vĩnh trú hoặc đặc biệt vĩnh trú). Nộp giấy tờ chứng minh kèm hồ sơ **tại quầy** — online không xin giảm được.',
    },
    {
      question: 'Phí 査証 (visa nhập cảnh ở Đại sứ quán) có liên quan không?',
      answer:
        'Đó là phí khác. Phí 査証 (visa dán hộ chiếu, xin tại Đại sứ quán / Lãnh sự quán Nhật ở Việt Nam) do Bộ Ngoại giao thu và đã tăng từ hồ sơ nộp 01/07/2026: 1 lần 15,000 yên, nhiều lần 30,000 yên. Guide này nói về phí thủ tục 在留 tại 入管 khi bạn đang ở Nhật.',
    },
  ],
  counterPhrases: [
    {
      jp: '手数料はいくらになりますか。',
      romaji: 'Tesuuryou wa ikura ni narimasu ka.',
      vn: 'Phí của tôi là bao nhiêu?',
      note: 'Hỏi khi nhận thông báo cấp phép — phí tùy thời hạn được cấp.',
    },
    {
      jp: '在留期間は何年になりましたか。',
      romaji: 'Zairyuu kikan wa nan-nen ni narimashita ka.',
      vn: 'Tôi được cấp thời hạn mấy năm?',
      note: 'Biết thời hạn để mua 収入印紙 đúng số tiền.',
    },
    {
      jp: '手数料の減額を申請したいです。',
      romaji: 'Tesuuryou no gengaku o shinsei shitai desu.',
      vn: 'Tôi muốn xin giảm phí.',
      note: 'Nói khi nộp hồ sơ tại quầy, kèm giấy chứng nhận 生活保護 hoặc 課税証明書.',
    },
    {
      jp: '33,000円分の収入印紙をお願いします。',
      romaji: 'San-man san-zen en bun no shuunyuu inshi o onegai shimasu.',
      vn: 'Cho tôi mua 収入印紙 trị giá 33,000 yên.',
      note: 'Nói ở bưu điện; thay số tiền theo thông báo của bạn. Chỉ trả tiền mặt.',
    },
    {
      jp: 'オンラインで申請したいです。',
      romaji: 'Onrain de shinsei shitai desu.',
      vn: 'Tôi muốn nộp online.',
      note: 'Hỏi quầy hướng dẫn đăng ký 在留申請オンラインシステム.',
    },
  ],
  keyTerms: [
    {
      term: '在留許可手数料',
      reading: 'ざいりゅうきょかてすうりょう',
      meaningVi: 'phí cấp phép lưu trú',
      noteVi: 'Phí nộp khi được cấp phép gia hạn / đổi tư cách / vĩnh trú. Từ 01/10/2026 tính theo thời hạn được cấp.',
    },
    {
      term: '在留期間更新許可申請',
      reading: 'ざいりゅうきかんこうしんきょかしんせい',
      meaningVi: 'xin gia hạn thời hạn lưu trú',
      noteVi: 'Từ 01/10/2026: online 10,000–65,000 yên, tại quầy 10,000–75,000 yên tùy thời hạn được cấp.',
    },
    {
      term: '在留資格変更許可申請',
      reading: 'ざいりゅうしかくへんこうきょかしんせい',
      meaningVi: 'xin đổi tư cách lưu trú',
      noteVi: 'Cùng bảng phí với gia hạn. Ví dụ 留学 → 技術・人文知識・国際業務 được cấp 1 năm: 27,000 yên online.',
    },
    {
      term: '永住許可申請',
      reading: 'えいじゅうきょかしんせい',
      meaningVi: 'xin vĩnh trú',
      noteVi: 'Từ 01/10/2026: 200,000 yên (giảm còn 20,000 yên cho một số diện vợ/chồng, con có hoàn cảnh khó khăn).',
    },
    {
      term: '減額',
      reading: 'げんがく',
      meaningVi: 'giảm phí',
      noteVi: 'Cho người có hoàn cảnh kinh tế khó khăn. Chỉ xin tại quầy, nộp kèm giấy tờ chứng minh.',
    },
    {
      term: '収入印紙',
      reading: 'しゅうにゅういんし',
      meaningVi: 'tem nộp phí',
      noteVi: 'Dùng khi nộp tại quầy. Mua ở bưu điện, chỉ trả tiền mặt. Online không dùng tem mà trả qua コンビニ / ngân hàng.',
    },
    {
      term: '在留申請オンラインシステム',
      reading: 'ざいりゅうしんせいオンラインシステム',
      meaningVi: 'hệ thống nộp hồ sơ lưu trú online',
      noteVi: 'Phí rẻ hơn tại quầy. Cần My Number Card để tự nộp.',
    },
  ],
  officialLinks: [
    { label: '令和８年１０月１日付け在留許可手数料の額の改定等について — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/01_00644.html' },
    { label: '在留許可手数料の減額措置又は免除措置について — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/10_00273.html' },
    { label: '手数料改定 Q&A — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/faq/01_00650.html' },
    { label: '在留申請オンラインシステム — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/index.html' },
  ],
  steps: [
    {
      step: 1,
      title: 'Ước tính phí của bạn',
      description:
        'Phí phụ thuộc thời hạn ISA cấp cho bạn lần này. Nếu hồ sơ không đổi, thường được cấp như lần trước.\n\n**Ví dụ (online / tại quầy)**:\n• Được 1 năm: 27,000 / 33,000 yên.\n• Được 3 năm: 56,000 / 64,000 yên.\n• Được 5 năm: 65,000 / 75,000 yên.\n\nGia đình 3 người cùng được 1 năm, nộp online: 27,000 × 3 = 81,000 yên. Hãy chuẩn bị tiền trước.',
      documents: [],
      tip: 'Đặt nhắc 3 tháng trước ngày hết hạn trên thẻ cư trú — đủ thời gian chuẩn bị cả giấy tờ lẫn tiền.',
    },
    {
      step: 2,
      title: 'Chọn cách nộp',
      description:
        '**Online** (rẻ hơn): đăng ký 在留申請オンラインシステム bằng My Number Card, tải hồ sơ lên, khi được cấp phép thì thanh toán qua コンビニ hoặc ngân hàng. Thẻ mới gửi về qua bưu điện.\n\n**Tại quầy**: nộp hồ sơ tại 入管. Khi nhận bưu thiếp / thông báo, mang 収入印紙 đúng số tiền đến nhận thẻ mới.\n\n**Muốn xin giảm phí**: bắt buộc nộp tại quầy, kèm giấy tờ chứng minh.',
      documents: ['My Number Card (nếu nộp online)', 'Hồ sơ theo diện lưu trú'],
      tip: 'Công ty bạn hoặc 行政書士 có thể nộp online thay bạn nếu họ đã đăng ký với ISA.',
    },
    {
      step: 3,
      title: 'Nhận kết quả và nộp phí',
      description:
        'Khi được cấp phép:\n\n• **Online**: làm theo email thông báo, thanh toán trong hạn qua コンビニ / ngân hàng.\n• **Tại quầy**: xem thời hạn được cấp trên thông báo → mua 収入印紙 đúng số tiền ở bưu điện (tiền mặt) → mang đến 入管 cùng 在留カード cũ, hộ chiếu, thông báo.\n\nNếu bị từ chối: không trả phí. Đọc lý do từ chối và xem guide visa-rejection-appeal-process trước khi nộp lại.',
      documents: ['Thông báo kết quả', '在留カード cũ', 'Hộ chiếu', '収入印紙 (tại quầy)'],
      tip: 'Mua 収入印紙 ở bưu điện lớn trước khi đến 入管 — quầy bán trong 入管 có thể hết mệnh giá lớn.',
    },
  ],
};

export default visaFeeIncrease20252026;
