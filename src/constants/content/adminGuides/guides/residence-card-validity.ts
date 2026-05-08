import type { AdminGuide } from '../../../../types/content';

const residenceCardValidity: AdminGuide = {
    id: 'residence-card-validity',
    category: 'immigration',
    lastVerified: '2026-05-06',
    priority: 'normal',
    title: 'Gia hạn hiệu lực thẻ cư trú',
    titleJp: '在留カードの有効期間の更新申請',
    icon: 'id-card',
    color: '#2980B9',
    description: 'Đổi thẻ cư trú vật lý sắp hết hạn (in trên mặt thẻ). KHÁC với gia hạn visa/lưu trú. Chủ yếu dành cho người vĩnh trú, HSP2, hoặc trẻ em đến mốc 16 tuổi. Từ 14/06/2026 có lựa chọn mới 特定在留カード gộp với My Number Card.',
    legalScope: {
      appliesFrom: '2026-06-14',
      jurisdiction: 'national',
      jurisdictionNote: 'Áp dụng theo hệ thống của ISA trên toàn Nhật; nơi nộp phụ thuộc địa chỉ cư trú và loại thủ tục.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-06-14',
      riskLevel: 'high',
      whenToAskExpert: [
        'Thẻ cư trú sắp hết hạn nhưng bạn không chắc là gia hạn thẻ vật lý hay gia hạn thời hạn lưu trú.',
        'Bạn muốn xin 特定在留カード cùng lúc đổi tư cách, gia hạn, cấp lại hoặc đổi thông tin.',
        'Thông tin trên thẻ/My Number không khớp hoặc bạn đang có hồ sơ cư trú bất thường.',
      ],
    },
    quickAction: {
      deadline: 'Đi trước khi hạn trên mặt thẻ hết. Không gấp nếu còn vài tháng — nhưng đừng để hết hạn rồi mới đi.',
      office: '入国管理局 tại khu vực cư trú của bạn.',
      doNow: [
        'Kiểm tra thật rõ: bạn cần gia hạn THẺ VẬT LÝ hay gia hạn VISA/lưu trú? Hai cái khác nhau.',
        'Mở link ISA chính thức ở dưới, đối chiếu giấy tờ cần thiết tại ngày nộp.',
        'Nếu có My Number Card và muốn gộp → hỏi ISA về 特定在留カード.',
      ],
      bring: ['在留カード hiện tại (bắt buộc)', 'Hộ chiếu (bắt buộc)', 'Ảnh thẻ 4×3cm chụp <3 tháng (bắt buộc)', 'Đơn xin gia hạn (lấy tại quầy hoặc tải từ ISA)', 'My Number Card (chỉ khi xin 特定在留カード)'],
      ifLate: 'Đi ISA ngay. Nói thật. Hết hạn thẻ vật lý không nguy hiểm bằng hết hạn lưu trú/visa — nhưng vẫn nên xử lý sớm.',
      officialSourceLabels: ['在留カードとは？— 出入国在留管理庁', '特定在留カード等交付申請 — 出入国在留管理庁'],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_card-validity_hero.jpg'),
    heroImageCaption: 'Gia hạn hạn hiệu lực vật lý thẻ 在留カード tại ISA',
    whoIsThisFor: [
      'Bạn có visa vĩnh trú hoặc HSP2, thẻ vật lý sắp hết hạn (xem ngày trên mặt thẻ).',
      'Trẻ em người nước ngoài sắp đến 16 tuổi.',
      'Bạn đang làm 1 trong 4 thủ tục sau 14/06/2026 (gia hạn / đổi tư cách / đổi thông tin / đăng ký địa chỉ) và muốn xem có nên xin 特定在留カード hay không.',
      'Không phải bạn nếu: visa/lưu trú sắp hết hạn — đó là thủ tục 在留期間更新許可申請, hoàn toàn khác.',
    ],
    whenToDo: [
      'Vài tháng trước khi thẻ vật lý hết hạn — kiểm tra ngày trên mặt thẻ.',
      'Trước sinh nhật 16 tuổi nếu là trẻ em.',
      'Từ 14/06/2026: nếu định gộp My Number, hỏi ISA về 特定在留カード trước khi quyết định.',
      'Không dùng thủ tục này nếu visa/tư cách lưu trú sắp hết hạn — đó là 在留期間更新許可申請, hoàn toàn khác.',
    ],
    whereToDo: [
      '入国管理局 (ISA) tại khu vực bạn đang sống.',
      'Người đại diện hợp pháp có thể nộp thay cho trẻ em hoặc người ốm — gọi ISA xác nhận trước.',
    ],
    documentsChecklist: [
      { label: 'Đơn xin gia hạn hiệu lực thẻ cư trú', required: true },
      { label: 'Ảnh thẻ 4cm x 3cm', required: true, note: 'Nền trắng/sáng, chụp trong 3 tháng gần nhất.' },
      { label: 'Hộ chiếu', required: true },
      { label: 'Thẻ cư trú hiện tại', required: true },
      { label: 'Giấy tờ người đại diện', required: false, note: 'Có thể cần nếu người đại diện nộp thay.' },
    ],
    commonMistakes: [
      'Nhầm "gia hạn thẻ vật lý" với "gia hạn visa/lưu trú" — hai thủ tục khác hẳn nhau.',
      'Đợi thẻ hết hạn rồi mới đi → khó đi đâu khi không có thẻ hợp lệ.',
      'Nhận thẻ mới mà quên kiểm tra thông tin → có thể có lỗi đánh máy mà không ai phát hiện.',
      'Ảnh cũ quá 3 tháng hoặc sai kích thước → bị trả về làm lại.',
      'Tưởng phải đổi sang 特定在留カード ngay từ 14/06/2026. Thật ra thẻ hiện hành vẫn có hiệu lực đến hết hạn.',
    ],
    faq: [
      {
        question: 'Thủ tục này có phải gia hạn visa không?',
        answer: 'Không. Đây là gia hạn THẺ VẬT LÝ. Muốn ở Nhật tiếp sau khi visa/lưu trú hết hạn → thủ tục 在留期間更新許可申請, hoàn toàn khác.',
      },
      {
        question: 'Thủ tục này có mất phí không?',
        answer: 'Trang ISA hiện không nêu phí cho thủ tục này. Trước khi đi, kiểm tra lại link chính thức hoặc hỏi quầy vì yêu cầu có thể khác theo trường hợp.',
      },
      {
        question: 'Sau khi nhận thẻ mới cần kiểm tra gì?',
        answer: 'Đọc kỹ: họ tên, ngày sinh, quốc tịch/khu vực, tư cách lưu trú, hạn lưu trú, hạn hiệu lực thẻ. Nếu sai bất cứ thông tin nào, yêu cầu chỉnh ngay tại quầy — đừng đi về rồi mới phát hiện.',
      },
      {
        question: '特定在留カード từ 14/06/2026 có bắt buộc không?',
        answer: 'Không. Thẻ cư trú hiện hành vẫn có hiệu lực sau khi mẫu mới bắt đầu. 特定在留カード là lựa chọn thêm — chỉ xin nếu bạn đang làm 1 trong các thủ tục đủ điều kiện (gia hạn / đổi tư cách / cấp lại / khai báo địa chỉ) và muốn gộp My Number.',
      },
    ],
    counterPhrases: [
      {
        jp: '在留カードの有効期間更新申請をしたいです。',
        romaji: 'Zairyuu kaado no yuukou kikan koushin shinsei o shitai desu.',
        vn: 'Tôi muốn xin gia hạn hiệu lực 在留カード.',
        note: 'Câu mở đầu tại quầy 入国管理局.',
      },
      {
        jp: '必要な書類を教えていただけますか。',
        romaji: 'Hitsuyou na shorui o oshiete itadakemasu ka.',
        vn: 'Anh/chị cho tôi biết giấy tờ cần thiết được không?',
      },
      {
        jp: '申請書はどこにありますか。',
        romaji: 'Shinseisho wa doko ni arimasu ka.',
        vn: 'Đơn xin lấy ở đâu ạ?',
      },
      {
        jp: '結果はいつごろ出ますか。',
        romaji: 'Kekka wa itsugoro demasu ka.',
        vn: 'Kết quả khoảng bao giờ có ạ?',
      },
      {
        jp: '受け取りの時に何を持って来ればいいですか。',
        romaji: 'Uketori no toki ni nani o motte kureba ii desu ka.',
        vn: 'Khi đến nhận cần mang theo gì?',
      },
      {
        jp: '手数料はいくらかかりますか。',
        romaji: 'Tesuuryou wa ikura kakarimasu ka.',
        vn: 'Phí thủ tục là bao nhiêu ạ?',
      },
    ],
    officialLinks: [
      { label: '在留カードの有効期間の更新申請 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html' },
      { label: '在留カードとは？— 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/whatzairyu_00001.html?hl=en' },
      { label: '特定在留カード等交付申請 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/tokutei.html' },
      { label: 'Tra cứu cục xuất nhập cảnh', url: 'https://www.moj.go.jp/isa/about/region/index.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Đầu tiên: phân biệt 2 thủ tục dễ nhầm',
        description: 'Hai thủ tục KHÁC HẲN nhau:\n\n• **在留期間更新許可申請** = gia hạn VISA / thời hạn lưu trú. Đa số người Việt cần cái này.\n• **在留カードの有効期間の更新申請** = gia hạn HẠN VẬT LÝ thẻ. Chỉ vĩnh trú / HSP2 / trẻ em <16.\n\nMở mặt thẻ — xem ngày nào sắp hết: 在留期間 (visa) hay 有効期限 (thẻ vật lý).',
        documents: [
          'Thẻ cư trú hiện tại',
          'Hộ chiếu',
          'Thông tin tư cách lưu trú hiện tại',
        ],
        tip: 'Người đi làm, du học, gia đình thông thường hay nhầm 2 thủ tục này. Đọc kỹ tên tiếng Nhật trước khi chuẩn bị hồ sơ.',
      },
      {
        step: 2,
        title: 'Chuẩn bị 4 thứ',
        description: 'Theo trang ISA, cần 4 thứ:\n\n1. Đơn xin (lấy tại ISA hoặc tải online)\n2. Ảnh 4×3cm chụp <3 tháng, nền trắng/sáng\n3. Hộ chiếu (bản gốc)\n4. Thẻ cư trú hiện tại\n\nTrẻ em <16 hoặc người đại diện nộp thay → cần giấy tờ thêm; gọi ISA hỏi trước.',
        documents: [
          'Đơn xin gia hạn hiệu lực thẻ cư trú',
          'Ảnh thẻ 縦4cm × 横3cm, nền trắng/sáng, chụp trong 3 tháng gần nhất',
          'Hộ chiếu',
          'Thẻ cư trú hiện tại',
        ],
        tip: 'Trang chính thức ghi thủ tục này không mất phí. Nếu thông tin tại quầy khác, hãy yêu cầu xác nhận và xem họ tính phí theo thủ tục nào.',
      },
      {
        step: 3,
        title: 'Nộp tại 入国管理局',
        description: 'Đến 入国管理局 khu vực bạn cư trú. Lấy số chờ. Khi đến lượt, nói: "在留カードの有効期間更新申請をしたいです." Nộp hồ sơ → nhận giấy hẹn → đi về. Người đại diện hợp pháp có thể nộp thay trong một số trường hợp.',
        documents: [],
        tip: 'Đi trước hạn vài tháng để tránh thẻ hết hiệu lực trong lúc chờ xử lý.',
      },
      {
        step: 4,
        title: 'Nhận thẻ cư trú mới',
        description: 'Sau khi được xử lý, bạn nhận thẻ cư trú mới có hạn hiệu lực mới. Từ 14/06/2026, nếu thuộc thủ tục áp dụng và muốn gộp chức năng My Number Card, hãy hỏi rõ lựa chọn 特定在留カード; nếu không xin 特定在留カード, vẫn có mẫu thẻ cư trú mới không gộp My Number.',
        documents: [
          'Thẻ cư trú cũ',
          'Hộ chiếu',
          'My Number Card nếu xin 特定在留カード theo hướng dẫn của ISA',
        ],
        tip: 'Sau khi nhận thẻ mới, đọc kỹ TẠI QUẦY trước khi đi về: họ tên, ngày sinh, quốc tịch/khu vực, tư cách lưu trú, hạn lưu trú, hạn hiệu lực, và thông tin My Number nếu là 特定在留カード. Sai chữ nào yêu cầu chỉnh ngay.',
      },
    ],
  };

export default residenceCardValidity;
