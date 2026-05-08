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
    description: 'Thủ tục gia hạn hạn sử dụng của thẻ cư trú vật lý. Chủ yếu dành cho người vĩnh trú, Highly Skilled Professional 2 hoặc trẻ em đến mốc đổi thẻ; khác với gia hạn thời hạn lưu trú. Từ 14/06/2026, ISA bắt đầu mẫu thẻ mới và thủ tục 特定在留カード nếu người dùng muốn gộp chức năng My Number Card.',
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
      deadline: 'Không cần đổi ngay nếu thẻ hiện tại còn hiệu lực; kiểm tra trước khi làm thủ tục từ 14/06/2026.',
      office: 'Cục xuất nhập cảnh có thẩm quyền; một số khai báo liên quan địa chỉ làm tại municipal office.',
      doNow: [
        'Xác định mục tiêu: gia hạn hiệu lực thẻ vật lý, gia hạn thời hạn lưu trú, hay xin 特定在留カード.',
        'Mở trang ISA đúng thủ tục và kiểm tra mẫu/điều kiện tại ngày nộp.',
        'Chuẩn bị My Number Card nếu muốn xin 特定在留カード theo hướng dẫn ISA.',
      ],
      bring: ['Thẻ cư trú hiện tại', 'Hộ chiếu', 'Ảnh thẻ nếu thủ tục yêu cầu', 'My Number Card nếu xin 特定在留カード'],
      ifLate: 'Đi ISA càng sớm càng tốt và giải thích trung thực; nếu là hết thời hạn lưu trú thì đây là rủi ro nghiêm trọng hơn hết hạn thẻ vật lý.',
      officialSourceLabels: ['在留カードとは？— 出入国在留管理庁', '特定在留カード等交付申請 — 出入国在留管理庁'],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_card-validity_hero.jpg'),
    heroImageCaption: 'Gia hạn hạn hiệu lực vật lý thẻ 在留カード tại ISA',
    whoIsThisFor: [
      'Người có tư cách vĩnh trú hoặc Highly Skilled Professional 2 cần gia hạn hạn hiệu lực vật lý của thẻ cư trú.',
      'Người làm gia hạn/đổi tư cách/đổi thông tin sau 14/06/2026 và muốn hiểu lựa chọn 特定在留カード.',
      'Trẻ em người nước ngoài đến mốc 16 tuổi và cần cập nhật thẻ theo hướng dẫn của ISA.',
      'Người không đổi tư cách lưu trú nhưng thẻ cư trú vật lý sắp hết hạn.',
    ],
    whenToDo: [
      'Trước khi thẻ cư trú vật lý hết hạn hiệu lực.',
      'Từ 14/06/2026, kiểm tra thêm hướng dẫn thẻ mới/特定在留カード trước khi nhận thẻ mới hoặc làm thủ tục tại ISA/municipal office.',
      'Khi trẻ em đến độ tuổi cần đổi thẻ theo mốc 16 tuổi.',
      'Không dùng thủ tục này nếu mục tiêu là tiếp tục ở Nhật sau khi visa/tư cách lưu trú hết hạn; khi đó thường là 在留期間更新許可申請.',
    ],
    whereToDo: [
      'Cục xuất nhập cảnh (ISA) có thẩm quyền theo nơi cư trú.',
      'Hỏi trực tiếp ISA nếu người đại diện hợp pháp nộp thay cho trẻ em hoặc người không thể tự đi.',
    ],
    documentsChecklist: [
      { label: 'Đơn xin gia hạn hiệu lực thẻ cư trú', required: true },
      { label: 'Ảnh thẻ 4cm x 3cm', required: true, note: 'Nền trắng/sáng, chụp trong 3 tháng gần nhất.' },
      { label: 'Hộ chiếu', required: true },
      { label: 'Thẻ cư trú hiện tại', required: true },
      { label: 'Giấy tờ người đại diện', required: false, note: 'Có thể cần nếu người đại diện nộp thay.' },
    ],
    commonMistakes: [
      'Nhầm thủ tục gia hạn hiệu lực thẻ cư trú với gia hạn thời hạn lưu trú/visa.',
      'Để thẻ vật lý hết hạn rồi mới chuẩn bị hồ sơ.',
      'Không kiểm tra lại thông tin in trên thẻ mới khi nhận.',
      'Dùng ảnh cũ quá 3 tháng hoặc ảnh không đúng kích thước.',
      'Tưởng 特定在留カード là bắt buộc đổi ngay từ 14/06/2026. ISA nêu thẻ hiện hành vẫn tiếp tục có hiệu lực đến hạn của thẻ.',
    ],
    faq: [
      {
        question: 'Thủ tục này có phải gia hạn visa không?',
        answer: 'Không. Đây là gia hạn hạn hiệu lực của thẻ cư trú vật lý. Nếu bạn cần tiếp tục ở Nhật sau khi thời hạn lưu trú hết hạn, thủ tục thường là 在留期間更新許可申請.',
      },
      {
        question: 'Thủ tục này có mất phí không?',
        answer: 'Theo hướng dẫn ISA cho thủ tục này, phí không được nêu như thủ tục có lệ phí. Khi đi làm, vẫn nên kiểm tra lại tại trang chính thức hoặc quầy ISA vì yêu cầu có thể khác theo trường hợp.',
      },
      {
        question: 'Sau khi nhận thẻ mới cần kiểm tra gì?',
        answer: 'Kiểm tra họ tên, ngày sinh, quốc tịch/khu vực, tư cách lưu trú, hạn lưu trú và hạn hiệu lực thẻ. Nếu sai, yêu cầu chỉnh ngay tại quầy.',
      },
      {
        question: '特定在留カード từ 14/06/2026 có bắt buộc không?',
        answer: 'Không phải đổi ngay chỉ vì luật mới bắt đầu. Theo ISA, thẻ cư trú hiện hành vẫn có hiệu lực sau khi mẫu mới bắt đầu; 特定在留カード là thủ tục có thể xin cùng một số thủ tục như gia hạn, đổi tư cách, cấp lại hoặc khai báo địa chỉ nếu thuộc điều kiện.',
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
        jp: '手数料はかかりますか。いくらですか。',
        romaji: 'Tesuuryou wa kakarimasu ka. Ikura desu ka.',
        vn: 'Có mất phí không? Bao nhiêu?',
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
        title: 'Xác định bạn có thuộc đối tượng không',
        description: 'Nếu bạn chỉ cần tiếp tục ở Nhật sau khi visa hết hạn, thủ tục đúng thường là "在留期間更新許可申請". Gia hạn hiệu lực thẻ cư trú là thủ tục riêng cho một số đối tượng.',
        documents: [
          'Thẻ cư trú hiện tại',
          'Hộ chiếu',
          'Thông tin tư cách lưu trú hiện tại',
        ],
        tip: 'Người đi làm, du học, gia đình thông thường hay nhầm 2 thủ tục này. Hãy kiểm tra tên tiếng Nhật của thủ tục trước khi chuẩn bị hồ sơ.',
      },
      {
        step: 2,
        title: 'Chuẩn bị giấy tờ',
        description: 'Theo trang ISA, thủ tục này yêu cầu đơn xin, ảnh, hộ chiếu và thẻ cư trú. Trường hợp dưới 16 tuổi hoặc người đại diện làm thay có thể cần giấy tờ bổ sung.',
        documents: [
          'Đơn xin gia hạn hiệu lực thẻ cư trú',
          'Ảnh thẻ縦4cm × 横3cm, nền trắng/sáng, chụp trong 3 tháng gần nhất',
          'Hộ chiếu',
          'Thẻ cư trú hiện tại',
        ],
        tip: 'Trang chính thức ghi thủ tục này không mất phí. Nếu thông tin tại quầy khác, hãy yêu cầu xác nhận theo thủ tục cụ thể.',
      },
      {
        step: 3,
        title: 'Nộp tại cục xuất nhập cảnh',
        description: 'Mang hồ sơ đến cục xuất nhập cảnh có thẩm quyền. Người đại diện hợp pháp có thể nộp trong một số trường hợp theo quy định.',
        documents: [],
        tip: 'Nên đi trước hạn để tránh thẻ hết hiệu lực trong lúc chờ xử lý.',
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
        tip: 'Sau khi nhận thẻ mới, kiểm tra kỹ họ tên, ngày sinh, quốc tịch/khu vực, tư cách lưu trú, hạn lưu trú, hạn hiệu lực và thông tin My Number nếu là 特定在留カード.',
      },
    ],
  };

export default residenceCardValidity;
