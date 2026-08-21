import type { AdminGuide } from '../../../../types/content';

const movingInNotification: AdminGuide = {
    id: 'moving-in-notification',
    category: 'daily-law',
    lastVerified: '2026-08-21',
    priority: 'high',
    title: 'Đăng ký cư trú khi mới chuyển đến',
    titleJp: '転入届・住民登録',
    icon: 'home',
    color: '#27AE60',
    description:
      'Đây là thủ tục báo với 市役所/区役所 rằng bạn đã chuyển đến địa chỉ mới ở Nhật. Chưa làm thủ tục này, các việc sau như bảo hiểm, My Number, ngân hàng đều bị vướng.',
    searchKeywords: [
      'tennyu todoke',
      'tenkyo todoke',
      'dang ky cu tru',
      'dang ky dia chi',
      'chuyen den dia chi moi',
      'tennyu',
      '転入届',
      '住民登録',
      'moving notification',
      'move in notification',
      'register address japan',
    ],
    legalScope: {
      jurisdiction: 'municipality',
      jurisdictionNote: '転入届/転居届 do 市役所/区役所 xử lý theo hệ thống 住民基本台帳; với người trung/dài hạn, mang thẻ cư trú đến 市役所/区役所 cũng được coi là đã làm 届出 địa chỉ theo ISA.',
      sourceVerifiedAt: '2026-08-21',
      nextReviewAt: '2026-12-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Bạn đã quá 14 ngày từ ngày chuyển đến hoặc chưa có địa chỉ cố định.',
        'Bạn mới nhập cảnh nhưng thẻ cư trú chưa ghi địa chỉ, hoặc hộ chiếu có ghi 在留カード後日交付.',
        'Bạn chuyển cùng gia đình, có người chưa đủ 16 tuổi, người không thể tự đi làm thủ tục hoặc cần ủy quyền.',
      ],
    },
    quickAction: {
      deadline: 'Trong vòng 14 ngày sau khi bắt đầu ở nhà mới. Càng sớm càng tốt.',
      office: '市役所/区役所 tại nơi mới. Nếu chuyển từ thành phố khác, ghé 市役所 cũ xin 転出証明書 trước khi đi.',
      doNow: [
        'Cầm 在留カード + 転出証明書 (nếu có) ra 市役所/区役所 nơi ở mới.',
        'Nói "転入届を出したいです" tại quầy.',
        'Hỏi luôn 1 lần: bảo hiểm y tế (国保), My Number, 住民票, trường học cho con.',
        'Yêu cầu nhân viên ghi địa chỉ mới lên mặt sau 在留カード.',
      ],
      bring: ['在留カード (bắt buộc)', '転出証明書 nếu chuyển từ thành phố khác trong Nhật', 'Hộ chiếu nếu mới nhập cảnh', 'My Number Card nếu đã có', 'Hợp đồng thuê nhà (để đối chiếu địa chỉ)'],
      ifLate: 'Đi ngay khi nhớ ra. Nói thật ngày bạn chuyển đến — nhân viên sẽ ghi chú lại. Giữ giấy biên nhận để dùng cho thủ tục visa sau.',
      officialSourceLabels: [
        'Resident registration system — Ministry of Internal Affairs and Communications',
        'Moving procedures on Myna Portal',
        '新規上陸後の住居地の届出（中長期在留者）— 出入国在留管理庁',
        '住居地の変更届出（中長期在留者）— 出入国在留管理庁',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_moving-in_hero.jpg'),
    heroImageCaption: 'Nộp 転入届 tại 役所 sau khi chuyển đến nơi ở mới',
    whoIsThisFor: [
      'Bạn vừa từ Việt Nam sang Nhật và đã có chỗ ở chính thức.',
      'Bạn vừa chuyển nhà sang thành phố/quận khác trong Nhật.',
      'Bạn đang ở Nhật trung/dài hạn và đổi sang chỗ ở mới.',
      'Không cần làm nếu: chỉ ở khách sạn vài ngày, hoặc chưa quyết định chỗ ở chính thức.',
    ],
    whenToDo: [
      'Trong vòng 14 ngày kể từ ngày thực sự bắt đầu sống ở địa chỉ mới (không phải ngày ký hợp đồng).',
      'Đi càng sớm càng tốt — chưa làm thủ tục này thì chưa làm được bảo hiểm, My Number, ngân hàng.',
    ],
    whereToDo: [
      '市役所 / 区役所 / 町村役場 ngay tại quận/thành phố nơi bạn vừa chuyển đến.',
      'Không làm ở 入国管理局 — đây là thủ tục địa phương, không phải thủ tục visa.',
    ],
    estimatedTime:
      'Nếu giấy tờ đủ và không quá đông, nhiều nơi xử lý trong ngày. Nhưng nên chừa thời gian vì có thể phải làm thêm bảo hiểm hoặc các thủ tục liên quan.',
    fees: ['Thông thường việc nộp chuyển đến hoặc đăng ký cư trú không có lệ phí riêng.'],
    documentsChecklist: [
      { label: 'Thẻ cư trú', required: true },
      { label: 'Hộ chiếu', required: false },
      { label: 'Giấy chuyển đi (転出証明書) nếu chuyển từ địa phương khác trong Nhật', required: false },
      { label: 'Thông tin địa chỉ nơi ở mới', required: true },
      { label: 'My Number nếu đã có', required: false },
    ],
    commonMistakes: [
      'Đợi 1-2 tháng mới đi → bị nói quá hạn, các thủ tục khác cũng đứng.',
      'Đến quầy chỉ làm 転入届 rồi về → quên hỏi bảo hiểm, My Number, 住民票.',
      'Báo chủ nhà nhưng quên 市役所 — chủ nhà không thay được nghĩa vụ này.',
      'Đi nhầm 入国管理局 thay vì 市役所.',
    ],
    faq: [
      {
        question: 'Tôi mới thuê nhà nhưng chưa dọn hẳn vào, đi đăng ký ngày nào?',
        answer:
          'Tính từ ngày bạn thực sự bắt đầu ở tại nhà mới, không phải ngày ký hợp đồng. Đi 市役所 trong 14 ngày kể từ ngày dọn vào.',
      },
      {
        question: 'Chuyển từ tỉnh khác sang có gì khác?',
        answer:
          'Khác. Phải đến 市役所 nơi cũ xin 転出証明書 trước (hoặc làm online qua Myna Portal nếu đủ điều kiện), rồi mới ra 市役所 nơi mới làm 転入届.',
      },
    ],
    counterPhrases: [
      {
        jp: '転入届を出したいです。',
        romaji: 'Tennyuu todoke o dashitai desu.',
        vn: 'Tôi muốn nộp 転入届 (đăng ký chuyển đến).',
        note: 'Câu mở đầu khi tới quầy 市役所/区役所.',
      },
      {
        jp: '必要な書類を教えていただけますか。',
        romaji: 'Hitsuyou na shorui o oshiete itadakemasu ka.',
        vn: 'Anh/chị cho tôi biết giấy tờ cần thiết được không?',
      },
      {
        jp: '在留カードの裏に新しい住所を書いてもらえますか。',
        romaji: 'Zairyuu kaado no ura ni atarashii juusho o kaite moraemasu ka.',
        vn: 'Anh/chị giúp ghi địa chỉ mới vào mặt sau 在留カード được không?',
      },
      {
        jp: '国民健康保険とマイナンバーも今日できますか。',
        romaji: 'Kokumin kenkou hoken to mai nanbaa mo kyou dekimasu ka.',
        vn: 'Hôm nay có thể làm luôn 国保 và My Number không?',
        note: 'Hỏi để gộp các thủ tục cùng một lần đi.',
      },
      {
        jp: '住民票の写しはいくらですか。',
        romaji: 'Juuminhyou no utsushi wa ikura desu ka.',
        vn: 'Bản sao 住民票 bao nhiêu tiền?',
      },
      {
        jp: '今日中に終わりますか。',
        romaji: 'Kyoujuu ni owarimasu ka.',
        vn: 'Có xong trong hôm nay không?',
      },
    ],
    keyTerms: [
      {
        term: '転入届',
        reading: 'てんにゅうとどけ',
        meaningVi: 'giấy báo chuyển đến',
        noteVi: 'Nộp ở 市役所/区役所 nơi bạn vừa chuyển tới, trong vòng 14 ngày từ ngày bắt đầu ở.',
      },
      {
        term: '転出証明書',
        reading: 'てんしゅつしょうめいしょ',
        meaningVi: 'giấy xác nhận đã chuyển đi',
        noteVi: '市役所 ở thành phố cũ cấp khi bạn báo chuyển đi. Đem theo khi nộp 転入届 ở thành phố mới.',
      },
      {
        term: '住民票',
        reading: 'じゅうみんひょう',
        meaningVi: 'giấy chứng nhận cư trú',
        noteVi: 'Sau khi xong 転入届, xin luôn vài bản 住民票 — cần cho ngân hàng, công ty, hợp đồng nhà.',
      },
      {
        term: '市役所 / 区役所',
        reading: 'しやくしょ / くやくしょ',
        meaningVi: 'ủy ban thành phố / ủy ban quận',
        noteVi: 'Cơ quan hành chính địa phương. 区役所 dùng cho các quận thuộc thành phố lớn (Tokyo 23 ku, Osaka, Yokohama…).',
      },
      {
        term: '在留カード',
        reading: 'ざいりゅうカード',
        meaningVi: 'thẻ cư trú',
        noteVi: 'Mang theo khi đi 市役所. Nhân viên sẽ ghi địa chỉ mới lên mặt sau thẻ.',
      },
    ],
    officialLinks: [
      { label: 'Resident registration system — Ministry of Internal Affairs and Communications', url: 'https://www.soumu.go.jp/main_sosiki/jichi_gyousei/c-gyousei/daityo/' },
      { label: 'Moving procedures on Myna Portal', url: 'https://myna.go.jp/html/moving_oss.html' },
      { label: '新規上陸後の住居地の届出（中長期在留者）— 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00021.html' },
      { label: '住居地の変更届出（中長期在留者）— 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Chuẩn bị giấy tờ trước khi ra 市役所',
        description:
          'Trước khi đi, biết rõ mình thuộc loại nào: vừa nhập cảnh từ Việt Nam, hay chuyển từ thành phố khác trong Nhật. Hai loại mang giấy tờ khác nhau.',
        documents: [
          'Thẻ cư trú',
          'Địa chỉ mới (hợp đồng thuê)',
          'Giấy chuyển đi (転出証明書) nếu có',
          'Thông tin người đi cùng nếu đăng ký cho gia đình',
        ],
        tip: 'Vừa mới sang Nhật → nhiều 市役所 cho làm gộp 転入届 + bảo hiểm + My Number cùng một lần đi.',
      },
      {
        step: 2,
        title: 'Điền 転入届 tại quầy',
        description: '**Các trường trên 転入届** (hoặc 転居届 nếu chuyển trong cùng thành phố):\n\n| Trường | Ghi như thế nào |\n|---|---|\n| 氏名 / フリガナ | Tên theo 在留カード; フリガナ viết KATAKANA |\n| 生年月日 | Ngày/tháng/năm sinh (西暦 — dương lịch) |\n| 転入年月日 | Ngày thực sự chuyển đến nhà mới |\n| 新住所 | Địa chỉ mới khớp với hợp đồng thuê |\n| 世帯主 | Chủ hộ — thường chính bạn nếu ở một mình |\n| 在留資格 | Copy chính xác từ 在留カード |\n\nSau khi nộp: nhân viên đóng dấu địa chỉ mới lên mặt sau **在留カード** ngay tại quầy.',
        documents: ['Mẫu đơn tại quầy', 'Thẻ cư trú (在留カード)', 'Hộ chiếu nếu được yêu cầu'],
        tip: 'Sai địa chỉ hoặc sai cách viết tên sẽ kéo theo lỗi ở ngân hàng, điện thoại và mọi hồ sơ sau này. Đối chiếu kỹ với 在留カード trước khi ký.',
        image: require('../../../../../assets/content/daily-life/ag_movingin_s2.jpg'),
        imageCaption: 'Điền 転入届 tại quầy 役所 — nhân viên cập nhật địa chỉ mới lên 在留カード',
      },
      {
        step: 3,
        title: 'Hỏi gộp các việc nên làm cùng ngày',
        description:
          'Khi địa chỉ đã được ghi lên 在留カード, hỏi nhân viên: "Còn thủ tục nào nên làm hôm nay không?" Thường là 国保 (bảo hiểm y tế), My Number, 住民票. Làm gộp 1 ngày sẽ tiết kiệm thời gian sau này.',
        documents: ['Thẻ cư trú đã cập nhật địa chỉ', 'Hộ chiếu nếu được yêu cầu'],
        tip: 'Nếu nhân viên không nhắc, bạn chủ động hỏi: "国民健康保険とマイナンバーも今日できますか?"',
      },
      {
        step: 4,
        title: 'Tự cập nhật địa chỉ ở các nơi khác',
        description:
          '市役所 đã cập nhật xong, nhưng các nơi khác chưa biết. Tự cập nhật ở 5 chỗ:\n\n1. **Ngân hàng** — đến chi nhánh, mang 在留カード mới.\n2. **Điện thoại** — qua app/web nhà mạng hoặc đến cửa hàng.\n3. **Công ty / trường** — báo HR / phòng tuyển sinh.\n4. **Bảo hiểm tư nhân** (nếu có) — gọi hotline.\n5. **Bưu điện** — xin 転送届 để chuyển tiếp thư từ địa chỉ cũ trong 1 năm.',
        documents: ['Danh sách 5 nơi cần đổi địa chỉ'],
        tip: 'Quên cập nhật ngân hàng → khi cần làm thủ tục khác sẽ vướng. Quên bưu điện → thư quan trọng (ISA, công ty) bị gửi nhầm chỗ.',
        image: require('../../../../../assets/content/daily-life/ag_movingin_s4.jpg'),
        imageCaption: 'Cập nhật địa chỉ mới tại ngân hàng, bảo hiểm, điện thoại và các dịch vụ liên quan',
      },
    ],
  };

export default movingInNotification;
