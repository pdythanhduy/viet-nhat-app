import type { AdminGuide } from '../../../../types/content';

const statusOfResidenceChange: AdminGuide = {
    id: 'status-of-residence-change',
    category: 'visa',
    lastVerified: '2026-07-11',
    priority: 'high',
    title: 'Đổi tư cách lưu trú',
    titleJp: '在留資格変更許可申請',
    icon: 'swap-horizontal',
    color: '#8E44AD',
    description:
      'Thủ tục đổi từ tư cách lưu trú hiện tại sang tư cách khác, ví dụ từ du học sang đi làm hoặc từ visa gia đình sang diện lao động phù hợp. Thời gian xét và hồ sơ yêu cầu có thể khác theo từng Nyukan và từng diện — nên xác nhận thông tin mới nhất trước khi nộp.',
    searchKeywords: [
      'doi visa',
      'doi tu cach',
      'doi tu cach luu tru',
      'change visa',
      'change status',
      'henko visa',
      'henkou kyoka',
      'du hoc sang di lam',
      'tu cach luu tru',
      'visa toi nghiep',
      'visa moi tot nghiep',
      'visa gia dinh sang lao dong',
      'visa het han doi tu cach',
      'gia han hay doi tu cach',
      'visa online application',
      'isa online',
      '6000 yen',
      '5500 yen',
      '在留資格',
      '在留資格変更',
      '在留資格変更許可申請',
      'ざいりゅうしかくへんこう',
      '変更許可',
      '上陸許可',
      '在留期間',
      '資格外活動',
      '不法就労',
      '在留特別許可',
      '在留資格取消し',
    ],
    legalScope: {
      jurisdiction: 'national',
      jurisdictionNote: '在留資格変更許可申請 do ISA xét toàn quốc; thời điểm nộp và giấy tờ phụ thuộc tư cách hiện tại, tư cách muốn đổi và hoạt động thực tế.',
      sourceVerifiedAt: '2026-07-11',
      nextReviewAt: '2026-09-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Bạn muốn bắt đầu công việc/hoạt động mới trước khi có kết quả đổi tư cách.',
        'Hồ sơ có yếu tố tốt nghiệp, nghỉ học, đổi ngành, ly hôn, thu nhập thấp hoặc công ty mới chưa rõ điều kiện.',
        'Bạn sắp hết hạn lưu trú hiện tại trong lúc chờ đổi tư cách.',
        'Đổi sang 技術・人文知識・国際業務 (技人国) với công việc chủ yếu dùng ngôn ngữ (phiên dịch, lễ tân, sales quốc tế...): từ hồ sơ nộp 2026-04-15, ISA có thể yêu cầu thêm tài liệu chứng minh năng lực tiếng Nhật tương đương CEFR B2 (vd JLPT N2+, tốt nghiệp trường Nhật, hoặc cư trú lâu năm) — chuẩn bị trước khi nộp.',
      ],
    },
    quickAction: {
      deadline: 'Nộp từ khi phát sinh lý do đổi tư cách và trước ngày hết hạn lưu trú hiện tại; không để hoạt động mới đi trước tình trạng pháp lý. Hệ thống online không nhận hồ sơ vào đúng ngày hết hạn lưu trú.',
      office: 'Cục xuất nhập cảnh có thẩm quyền hoặc hệ thống online ISA nếu thuộc đối tượng được dùng.',
      doNow: [
        'Xác định tư cách mới và hoạt động dự kiến có khớp bảng ISA không.',
        'Gom giấy tờ công ty/trường/gia đình chứng minh lý do đổi.',
        'Nếu định nộp online, nộp trước ngày cuối; nếu đã đến ngày hết hạn, hỏi/nộp tại cục xuất nhập cảnh có thẩm quyền.',
        'Theo dõi hạn lưu trú hiện tại; nếu hết hạn trong lúc chờ, cần xử lý gia hạn phù hợp.',
      ],
      bring: ['Đơn 在留資格変更許可申請', 'Hộ chiếu', 'Thẻ cư trú', 'Ảnh thẻ 4cm x 3cm', 'Giấy tờ của bên tiếp nhận mới', 'Tài liệu chứng minh năng lực/lý do đổi'],
      ifLate: 'Liên hệ ISA ngay trước khi hết hạn hoặc trước khi bắt đầu hoạt động mới; quá hạn lưu trú là rủi ro nghiêm trọng.',
      officialSourceLabels: [
        '在留資格変更許可申請 — 出入国在留管理庁',
        'Online Residence Application System — ISA',
        'Thông báo sửa phí thủ tục từ 01/04/2025',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_status-change_hero.jpg'),
    heroImageCaption: 'Thủ tục đổi tư cách lưu trú tại ISA',
    whoIsThisFor: [
      'Người sắp tốt nghiệp và chuẩn bị đi làm theo diện visa lao động.',
      'Người đổi mục đích ở Nhật hoặc chuyển sang một tư cách lưu trú khác hẳn hiện tại.',
      'Người không còn phù hợp với điều kiện của tư cách hiện tại và cần nộp hồ sơ đổi đúng diện.',
    ],
    whenToDo: [
      'Chuẩn bị sớm trước ngày bắt đầu công việc hoặc học tập mới vì thời gian xét duyệt có thể kéo dài.',
      'Không nên tự ý làm công việc mới theo diện visa khác trước khi đổi xong hoặc chưa được phép.',
      'Nếu vừa đổi công ty vừa đổi bản chất công việc, nên kiểm tra kỹ xem có cần thủ tục này hay chỉ cần thông báo cho ISA.',
    ],
    whereToDo: [
      'Cục xuất nhập cảnh có thẩm quyền theo nơi cư trú hoặc nơi tiếp nhận hồ sơ phù hợp.',
      'Một số hồ sơ có thể chuẩn bị online nếu thuộc diện được hỗ trợ, nhưng vẫn cần theo hướng dẫn mới nhất của ISA.',
    ],
    estimatedTime:
      'Thời gian xét duyệt thay đổi theo hồ sơ, khu vực và loại tư cách mới. Nên chừa thời gian để bổ sung giấy tờ nếu bị yêu cầu.',
    fees: [
      'Nếu được cấp phép: 6.000 yên khi làm thủ tục thường, hoặc 5.500 yên nếu là online application theo mức ISA áp dụng từ 01/04/2025.',
      'Phí nộp khi nhận kết quả/cấp phép, không phải lúc mới nộp hồ sơ.',
    ],
    documentsChecklist: [
      { label: 'Đơn xin đổi tư cách lưu trú đúng mẫu', required: true },
      { label: 'Ảnh thẻ縦4cm × 横3cm', required: true, note: 'Nền trắng hoặc sáng màu đơn sắc, chụp trong 3 tháng gần nhất — bắt buộc kèm theo đơn.' },
      { label: 'Hộ chiếu và thẻ cư trú', required: true },
      { label: 'Tài liệu chứng minh lý do đổi tư cách', required: true },
      { label: 'Giấy tờ của công ty, trường hoặc cơ quan tiếp nhận mới', required: true },
      { label: 'Tài liệu chứng minh năng lực học vấn hoặc nghề nghiệp khi cần', required: false },
    ],
    tips: [
      'Xin đổi tư cách **trước khi bắt đầu hoạt động mới** — không sau. Làm việc trước khi có tư cách phù hợp là vi phạm 入管法 ngay cả khi hồ sơ đang chờ xét. Trong thời gian chờ kết quả, tiếp tục hoạt động trong phạm vi tư cách CŨ.',
      'Sinh viên tốt nghiệp tháng 3/4 cần nộp hồ sơ đổi tư cách **trước cuối tháng 1 hoặc đầu tháng 2** để ISA xét kịp trước ngày đi làm 1/4. Nếu muộn hơn, có thể cần xin tư cách 特定活動 (就活・内定) tạm thời.',
      'Chuẩn bị **理由書 (thư giải trình)** ngay cả khi không bắt buộc. ISA thường đánh giá cao khi người nộp giải thích rõ công việc mới phù hợp tư cách xin đổi như thế nào. 1 trang rõ ràng bằng tiếng Nhật tốt hơn nhiều hồ sơ dày nhưng không có giải trình.',
    ],
    commonMistakes: [
      'Nhầm giữa đổi tư cách lưu trú và gia hạn thời hạn lưu trú.',
      'Nhận việc hoặc bắt đầu công việc mới khi hồ sơ chưa rõ tình trạng pháp lý.',
      'Nộp hồ sơ thiếu giấy tờ từ công ty mới, đặc biệt phần mô tả công việc và điều kiện tuyển dụng.',
      'Để đến đúng ngày hết hạn mới định nộp online, trong khi ISA nêu hệ thống online không nhận hồ sơ vào ngày cuối.',
    ],
    faq: [
      {
        question: 'Tốt nghiệp xong đi làm có phải gia hạn visa không?',
        answer:
          'Thường không phải gia hạn cùng tư cách cũ mà là đổi từ du học sang tư cách phù hợp với công việc mới.',
      },
      {
        question: 'Đổi công ty có luôn cần đổi tư cách không?',
        answer:
          'Không phải lúc nào cũng cần. Nếu bản chất công việc vẫn nằm trong phạm vi tư cách hiện tại, có thể chỉ cần thông báo thay đổi theo quy định.',
      },
      {
        question: 'Phí đổi tư cách lưu trú hiện là bao nhiêu?',
        answer:
          'Theo ISA, khi được cấp phép hiện là 6.000 yên nếu làm thủ tục thường và 5.500 yên nếu nộp online. Kiểm tra lại bảng phí chính thức trước khi nhận kết quả.',
      },
      {
        question: 'Có thể nộp online vào đúng ngày hết hạn không?',
        answer:
          'Không. ISA nêu hệ thống online không thể dùng để nộp vào đúng ngày hết hạn lưu trú; nếu sát hạn như vậy, cần xử lý tại cục xuất nhập cảnh có thẩm quyền.',
      },
    ],
    scenarios: [
      {
        title: 'Tốt nghiệp đại học Nhật, nhận offer tháng 4 — đổi visa khi nào?',
        situation: 'Tôi học tại đại học Nhật, visa du học hết hạn tháng 3/2027. Nhận offer việc kỹ thuật bắt đầu tháng 4/2027. Tôi cần làm gì và khi nào?',
        answer: '**Timeline chuẩn**:\n\n• **Tháng 12/2026**: Nộp hồ sơ đổi tư cách từ 留学 sang 技術・人文知識・国際業務 (hoặc diện phù hợp) tại ISA. Cần: hợp đồng lao động / 内定通知書, giấy tốt nghiệp dự kiến (見込証明書), bảng điểm, lý do giải trình.\n\n• **Tháng 1–3/2027**: ISA xét hồ sơ. Nếu visa 留学 hết hạn trong lúc chờ mà đã nộp hợp lệ → 特例期間 cho phép ở lại hợp pháp.\n\n• **Trước 4/2027**: Nhận thẻ mới, bắt đầu làm việc hợp lệ.\n\nNếu lỡ nộp muộn hoặc chưa có 内定 kịp: hỏi ISA về 特定活動 (就活・内定中) để có thêm thời gian.',
      },
      {
        title: 'Kết hôn với người Nhật, muốn đổi sang 日本人の配偶者等',
        situation: 'Tôi có visa kỹ thuật. Vừa kết hôn với người Nhật và đã đăng ký 婚姻届. Có nên đổi sang visa vợ/chồng người Nhật không?',
        answer: 'Không bắt buộc phải đổi — visa 技術・人文 vẫn có hiệu lực và tiếp tục làm việc hoàn toàn hợp pháp.\n\n**Khi nào nên đổi sang 日本人の配偶者等**:\n• Bạn muốn linh hoạt hơn về loại công việc (visa vợ/chồng không giới hạn ngành nghề, chỉ giới hạn giờ làm nếu không có việc toàn thời)\n• Bạn đang muốn đổi ngành nghề sang diện 技術 không cover\n• Công ty mới không đủ điều kiện bảo lãnh visa kỹ thuật\n\n**Nếu đổi**: cần 婚姻届受理証明書, hộ tịch chứng minh hôn nhân, 戸籍謄本 của vợ/chồng Nhật, giấy tờ thu nhập. Nộp tại ISA.',
      },
      {
        title: 'Đang làm IT, muốn mở công ty riêng — phải đổi tư cách gì?',
        situation: 'Tôi có visa 技術・人文 đang đi làm. Muốn mở công ty riêng và tự kinh doanh. Visa hiện tại có ổn không?',
        answer: 'Visa 技術・人文 **không cho phép tự kinh doanh / là chủ công ty**. Bạn cần đổi sang **経営・管理** (Kinh doanh và Quản lý).\n\nĐiều kiện 経営・管理:\n• Tư bản đầu tư ≥ 500万円 HOẶC thuê ≥ 2 nhân viên toàn thời\n• Có văn phòng thực tế ở Nhật (hợp đồng thuê văn phòng)\n• Hoạt động kinh doanh hợp pháp và ổn định\n\nQuy trình: đăng ký công ty (法人登記) → chuẩn bị hồ sơ kinh doanh → nộp ISA.\n\nLưu ý: trong thời gian chờ, **không ngừng công việc làm thuê** nếu vẫn cần thu nhập — ISA không có quy định cấm làm song song khi đang xét hồ sơ đổi tư cách. Hỏi 行政書士 chuyên 経営・管理 để tối ưu hồ sơ.',
      },
    ],
    counterPhrases: [
      {
        jp: '在留資格変更の申請をしたいです。',
        romaji: 'Zairyuu shikaku henkou no shinsei o shitai desu.',
        vn: 'Tôi muốn nộp đơn đổi tư cách lưu trú.',
        note: 'Câu mở đầu tại quầy Nyukan.',
      },
      {
        jp: '現在「留学」ですが、「技術・人文知識・国際業務」に変更したいです。',
        romaji: 'Genzai ryuugaku desu ga, gijutsu jinbun chishiki kokusai gyoumu ni henkou shitai desu.',
        vn: 'Hiện tôi đang visa du học, muốn đổi sang visa kỹ thuật / nhân văn / nghiệp vụ quốc tế.',
        note: 'Diện đổi phổ biến nhất với người Việt mới tốt nghiệp đại học/chuyên môn Nhật.',
      },
      {
        jp: '在留期限が〇月〇日に切れます。間に合いますか。',
        romaji: 'Zairyuu kigen ga marutsuki maruka ni kiremasu. Maniaimasu ka.',
        vn: 'Hạn lưu trú của tôi hết vào ngày 〇/〇. Có kịp xử lý không ạ?',
        note: 'Thay 〇月〇日 bằng ngày cụ thể. Hỏi thẳng thay vì giả định — Nyukan có thể hướng dẫn cách xử lý.',
      },
      {
        jp: 'オンライン申請の対象になりますか。',
        romaji: 'Onrain shinsei no taishou ni narimasu ka.',
        vn: 'Tôi có thuộc đối tượng dùng đơn online không?',
        note: 'Online application thường giảm phí 500 yên (5,500 thay vì 6,000) — nhưng không nhận đơn vào ngày hết hạn lưu trú.',
      },
      {
        jp: '結果が出る前に新しい会社で働いてもいいですか。',
        romaji: 'Kekka ga deru mae ni atarashii kaisha de hataraite mo ii desu ka.',
        vn: 'Trước khi có kết quả, tôi có được đi làm ở công ty mới không?',
        note: 'Câu hỏi quan trọng — đáp án có thể khác theo Nyukan + tư cách hiện tại. KHÔNG tự ý đi làm trước khi xác nhận rõ.',
      },
      {
        jp: '追加書類が必要な場合は、どのように連絡が来ますか。',
        romaji: 'Tsuika shorui ga hitsuyou na baai wa, dono you ni renraku ga kimasu ka.',
        vn: 'Nếu cần bổ sung giấy tờ, Nyukan sẽ liên lạc bằng cách nào?',
        note: 'Thường qua bưu điện hoặc Nyukan online — xác nhận để không bỏ lỡ.',
      },
    ],
    keyTerms: [
      {
        term: '在留資格変更許可申請',
        reading: 'ざいりゅうしかくへんこうきょかしんせい',
        meaningVi: 'đơn xin đổi tư cách lưu trú',
        noteVi: 'Mẫu đơn dùng khi đang ở Nhật + muốn chuyển sang tư cách khác (vd du học → kỹ sư). Khác 認定証明書交付申請 (dành cho người xin từ ngoài Nhật). Form chính thức tại 出入国在留管理庁.',
      },
      {
        term: '在留資格認定証明書',
        reading: 'ざいりゅうしかくにんていしょうめいしょ',
        meaningVi: 'giấy chứng nhận tư cách lưu trú (cho người ngoài Nhật)',
        noteVi: 'KHÁC với 変更 — dùng khi người được mời từ nước ngoài. Công ty/trường tại Nhật xin trước, gửi về cho người đó cầm sang Đại sứ quán Nhật xin visa. Hay nhầm với 変更.',
      },
      {
        term: '在留期間',
        reading: 'ざいりゅうきかん',
        meaningVi: 'thời hạn lưu trú',
        noteVi: 'Hạn ghi trên 在留カード. Khi đổi tư cách, hạn mới sẽ do Nyukan quyết định — thường 1/3/5 năm tùy diện. Hạn cũ chỉ còn giá trị cho đến khi có kết quả.',
      },
      {
        term: '資格外活動許可',
        reading: 'しかくがいかつどうきょか',
        meaningVi: 'giấy phép hoạt động ngoài tư cách',
        noteVi: 'Khác với 変更. Cho phép làm việc phụ ngoài phạm vi tư cách chính (vd du học sinh đi làm baito 28h/tuần). Nếu hoạt động chính thay đổi nhiều → cần 変更, không phải 資格外.',
      },
      {
        term: '不法就労',
        reading: 'ふほうしゅうろう',
        meaningVi: 'làm việc bất hợp pháp',
        noteVi: 'Đi làm trước khi có kết quả 変更 hoặc làm việc khác tư cách hiện tại = 不法就労. Hậu quả: phạt + thu hồi visa + cấm tái nhập. KHÔNG tự ý bắt đầu công việc mới khi chưa rõ trạng thái.',
      },
      {
        term: '在留資格取消し',
        reading: 'ざいりゅうしかくとりけし',
        meaningVi: 'thu hồi tư cách lưu trú',
        noteVi: 'Nyukan có thể thu hồi tư cách nếu hoạt động thực tế không khớp tư cách (vd visa "技人国" nhưng đi làm baito). Quy định theo 入管法 §22-4. Nên báo đổi sớm nếu hoạt động thay đổi.',
      },
      {
        term: '在留特別許可',
        reading: 'ざいりゅうとくべつきょか',
        meaningVi: 'giấy phép lưu trú đặc biệt',
        noteVi: 'Trường hợp ngoại lệ — Bộ trưởng Tư pháp cấp phép cho người vốn không đủ điều kiện. Không tự xin được; chỉ áp dụng khi đã bị xét trục xuất hoặc tình trạng đặc biệt. Nên hỏi luật sư.',
      },
      {
        term: '在留資格一覧',
        reading: 'ざいりゅうしかくいちらん',
        meaningVi: 'danh sách các loại tư cách lưu trú',
        noteVi: '出入国在留管理庁 công bố ~29 loại tư cách (Gijinkoku, Tokutei Ginou 1/2, 高度専門職, 経営・管理, 留学, 家族滞在, 配偶者, 永住, 特定活動, etc.). Xem trước khi chọn diện đổi — diện không khớp hoạt động thực = thường bị từ chối.',
      },
    ],
    officialLinks: [
      { label: '在留資格変更許可申請 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/16-2.html' },
      { label: 'Online Residence Application System — ISA', url: 'https://www.moj.go.jp/isa/applications/online/onlineshinsei.html' },
      { label: 'Thông báo sửa phí thủ tục từ 01/04/2025', url: 'https://www.moj.go.jp/isa/01_00518.html' },
      { label: '在留資格一覧 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/status/qaq5.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Xác định đúng diện mới',
        description:
          'Phải làm rõ bạn đang đổi sang tư cách nào và công việc hoặc học tập mới có đúng khung của diện đó hay không.',
        documents: [
          'Tên tư cách lưu trú mới dự kiến',
          'Mô tả công việc hoặc kế hoạch học tập mới',
          'Thông tin công ty hoặc trường tiếp nhận',
        ],
        tip: 'Nếu không chắc diện nào phù hợp, kiểm tra hướng dẫn ISA trước khi gom giấy tờ.',
      },
      {
        step: 2,
        title: 'Điền 在留資格変更許可申請書 và gom tài liệu',
        description: '**Các trường chính trên mẫu đơn** (tải PDF: https://www.moj.go.jp/isa/content/930004064.pdf — trang hướng dẫn: https://www.moj.go.jp/isa/applications/procedures/16-2.html):\n\n| Trường | Ghi như thế nào |\n|---|---|\n| 国籍・地域 | Quốc tịch: ベトナム |\n| 氏名 | Tên theo hộ chiếu (Latin) |\n| 生年月日 | Ngày/tháng/năm sinh (西暦) |\n| 住居地 | Địa chỉ khớp với 在留カード |\n| 在留資格（変更後）| Tư cách lưu trú mới muốn đổi sang |\n| 在留期間 | Để trống — ISA tự xác định |\n| 勤務先・通学先 | Tên công ty/trường mới, địa chỉ, số điện thoại |\n| 申請人の署名 | Ký tên chính chủ |\n\nKèm theo: hộ chiếu + 在留カード + ảnh **縦4cm × 横3cm**, nền trắng hoặc sáng màu đơn sắc, chụp trong 3 tháng gần nhất + giấy tờ của bên tiếp nhận (hợp đồng, thư tuyển dụng, bằng cấp tuỳ diện).',
        documents: [
          'Hộ chiếu, thẻ cư trú',
          'Mẫu đơn 在留資格変更許可申請書 — tải PDF: https://www.moj.go.jp/isa/content/930004064.pdf',
          'Ảnh縦4cm × 横3cm, nền trắng hoặc sáng màu đơn sắc, chụp trong 3 tháng gần nhất',
          'Giấy tờ của công ty hoặc trường mới',
          'Bằng cấp, chứng chỉ, hợp đồng hoặc thư tuyển dụng nếu cần',
        ],
        tip: 'Đừng chỉ nộp giấy tờ “na ná”. Hồ sơ đổi tư cách thường bị soi kỹ ở phần tính phù hợp của công việc với bằng cấp.',
      },
      {
        step: 3,
        title: 'Nộp hồ sơ và theo dõi bổ sung',
        description:
          'Sau khi nộp, phải theo dõi thư hoặc thông báo yêu cầu bổ sung giấy tờ. Nếu thiếu phản hồi, hồ sơ có thể bị kéo dài.',
        documents: ['Biên nhận hồ sơ', 'Thông tin liên lạc để nhận yêu cầu bổ sung'],
        tip: 'Không nên đi công tác dài ngày hoặc đổi địa chỉ mà quên cập nhật cách nhận thư.',
        image: require('../../../../../assets/content/daily-life/ag_status-change_s3.jpg'),
        imageCaption: 'Nộp hồ sơ đổi tư cách tại ISA — nhận phiếu hẹn và theo dõi yêu cầu bổ sung',
      },
      {
        step: 4,
        title: 'Chỉ bắt đầu theo diện mới khi tình trạng đã rõ',
        description:
          'Ngay cả khi đã được nhận vào công ty, bạn vẫn cần hiểu rõ thời điểm nào được phép làm việc theo diện mới.',
        documents: ['Thông báo kết quả từ ISA', 'Thẻ cư trú cập nhật nếu được cấp phép'],
        tip: 'Nếu công ty giục đi làm sớm, hãy xác minh lại bằng nguồn chính thức thay vì nghe miệng. Khi được cấp phép, phí hiện hành là 6.000 yên thủ tục thường hoặc 5.500 yên online.',
        image: require('../../../../../assets/content/daily-life/ag_status-change_s2.jpg'),
        imageCaption: 'Điền 在留資格変更許可申請書 và chuẩn bị hồ sơ theo diện mới',
      },
    ],
  };

export default statusOfResidenceChange;
