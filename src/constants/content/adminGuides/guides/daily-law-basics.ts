import type { AdminGuide } from '../../../../types/content';

const dailyLawBasics: AdminGuide = {
    id: 'daily-law-basics',
    category: 'daily-law',
    lastVerified: '2026-05-06',
    priority: 'high',
    title: 'Luật sinh hoạt cần biết',
    titleJp: '日本生活の基本ルール',
    icon: 'shield-checkmark',
    color: '#27AE60',
    description: 'Các quy định cơ bản người Việt ở Nhật nên biết để tránh rắc rối trong đời sống hằng ngày.',
    legalScope: {
      jurisdiction: 'mixed',
      jurisdictionNote:
        'Guide này gom nhiều nhóm quy định: cư trú/địa chỉ thuộc ISA và municipal office, rác/nhà ở phụ thuộc địa phương và hợp đồng, tiêu dùng do cơ quan tư vấn/consumer center hỗ trợ, còn tài khoản ngân hàng/SIM liên quan hợp đồng và phòng chống lừa đảo.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-10-01',
      riskLevel: 'medium',
      whenToAskExpert: [
        'Bạn bị ép ký hợp đồng, vay tiền, bảo lãnh, chuyển tiền hoặc đứng tên hộ giấy tờ/tài khoản.',
        'Bạn đã quá hạn đổi địa chỉ, mất thẻ cư trú, hoặc giấy tờ cư trú có thông tin sai.',
        'Bạn bị đòi tiền, bị đe dọa, nghi lừa đảo hoặc không hiểu nghĩa vụ trong hợp đồng tiếng Nhật.',
      ],
    },
    quickAction: {
      deadline:
        'Đọc trong tuần đầu và rà lại ngay khi chuyển nhà, ký hợp đồng, mở tài khoản/SIM hoặc được nhờ đứng tên hộ.',
      office:
        'Municipal office, FRESC/quầy tư vấn người nước ngoài, National Consumer Affairs Center, cảnh sát hoặc ngân hàng/nhà mạng tùy vấn đề.',
      doNow: [
        'Giữ thẻ cư trú và địa chỉ luôn đúng; chuyển nhà thì làm thủ tục trong 14 ngày.',
        'Không cho mượn/bán tài khoản ngân hàng, cash card, SIM, app hoặc OTP dưới bất kỳ lý do nào.',
        'Trước khi ký giấy tờ có tiền, bảo lãnh, vay nợ hoặc thời hạn dài, xin bản copy và hỏi nơi tư vấn nếu không hiểu.',
      ],
      bring: [
        'Thẻ cư trú',
        'Hợp đồng, hóa đơn, tin nhắn hoặc giấy tờ liên quan',
        'Địa chỉ hiện tại và thông tin bên yêu cầu bạn ký/chuyển tiền',
        'Ảnh/chụp màn hình làm bằng chứng nếu nghi lừa đảo hoặc tranh chấp',
      ],
      ifLate:
        'Để sai địa chỉ, ký hợp đồng không hiểu hoặc cho mượn tài khoản/SIM có thể làm mất quyền lợi, bị hạn chế dịch vụ hoặc kéo bạn vào vụ việc pháp lý phức tạp.',
      officialSourceLabels: [
        '生活・就労ガイドブック — 出入国在留管理庁',
        'FRESC Help Desk',
        'Consumer affairs — 国民生活センター',
        '金融庁からのお願い・注意喚起 — 金融庁',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_daily-law_hero.jpg'),
    heroImageCaption: 'Quy tắc sinh hoạt tại Nhật - nắm các điểm pháp lý cơ bản trước khi gặp rắc rối',
    whoIsThisFor: [
      'Người mới sang Nhật cần nắm các nguyên tắc sinh hoạt và giấy tờ cơ bản.',
      'Người đang thuê nhà, dùng tài khoản ngân hàng/SIM hoặc chuẩn bị ký giấy tờ bằng tiếng Nhật.',
      'Người muốn tránh các rủi ro thường gặp như cho mượn tài khoản, bỏ rác sai quy định hoặc ký hợp đồng không hiểu nội dung.',
    ],
    whenToDo: [
      'Đọc trong tuần đầu mới sang Nhật, trước khi mở tài khoản, ký hợp đồng điện thoại hoặc thuê nhà.',
      'Xem lại khi chuyển nhà, đổi việc, đổi thông tin cư trú hoặc được nhờ đứng tên hộ giấy tờ/tài khoản.',
      'Trước khi ký bất kỳ giấy tờ nào có nghĩa vụ tiền bạc, bảo lãnh, vay nợ hoặc hợp đồng dài hạn.',
    ],
    whereToDo: [
      'Municipal office: cập nhật địa chỉ, hỏi lịch rác và các quy định sinh hoạt địa phương.',
      'FRESC hoặc quầy tư vấn người nước ngoài địa phương: hỏi khi không hiểu giấy tờ, hợp đồng hoặc quyền lợi.',
      'Cảnh sát hoặc trung tâm tiêu dùng: liên hệ khi nghi ngờ lừa đảo, bị ép ký hoặc bị yêu cầu chuyển tiền bất thường.',
    ],
    documentsChecklist: [
      { label: 'Thẻ cư trú (在留カード)', required: true, note: 'Luôn kiểm tra hạn lưu trú, địa chỉ và thông tin cá nhân trên thẻ.' },
      { label: 'Hợp đồng thuê nhà hoặc nội quy ký túc xá/tòa nhà', required: false, note: 'Dùng để kiểm tra quy định về tiếng ồn, rác, thú cưng, người ở cùng và trả nhà.' },
      { label: 'Lịch rác địa phương (ゴミカレンダー)', required: false, note: 'Nhận từ municipal office, quản lý tòa nhà hoặc website địa phương.' },
      { label: 'Bản sao hợp đồng/hóa đơn trước khi ký hoặc thanh toán', required: false, note: 'Giữ lại để hỏi tư vấn nếu không hiểu nội dung.' },
    ],
    commonMistakes: [
      'Cho mượn tài khoản ngân hàng, SIM hoặc cash card vì nể người quen.',
      'Chuyển nhà nhưng quên cập nhật địa chỉ trong 14 ngày.',
      'Bỏ rác theo thói quen ở Việt Nam, không theo lịch và quy định của khu vực đang sống.',
      'Ký giấy tờ tiếng Nhật mà không xin bản copy hoặc không hiểu nghĩa vụ tiền bạc đi kèm.',
      'Trả nhà mà không chụp ảnh hiện trạng, dẫn đến tranh chấp chi phí sửa chữa.',
    ],
    faq: [
      {
        question: 'Có được cho bạn bè mượn tài khoản ngân hàng hoặc SIM không?',
        answer: 'Không. Cho mượn, bán hoặc đứng tên hộ tài khoản/SIM có thể liên quan lừa đảo, rửa tiền hoặc vi phạm hợp đồng. Nếu bị nhờ mở tài khoản, nhận tiền, chuyển tiền hộ, nhận OTP hoặc giữ cash card để lấy phí, hãy từ chối.',
      },
      {
        question: 'Chuyển nhà rồi quên cập nhật địa chỉ thì có sao không?',
        answer: 'Có rủi ro. Người cư trú trung/dài hạn cần khai báo địa chỉ mới tại municipal office trong vòng 14 ngày. Địa chỉ cũng nên được cập nhật với ngân hàng, điện thoại, bảo hiểm và nơi làm việc/trường học.',
      },
      {
        question: 'Không hiểu hợp đồng tiếng Nhật thì nên làm gì?',
        answer: 'Không ký ngay. Xin bản copy, chụp lại nội dung cần hỏi và mang đến FRESC, quầy tư vấn người nước ngoài địa phương, người phiên dịch đáng tin cậy hoặc chuyên gia phù hợp.',
      },
    ],
    officialLinks: [
      { label: '生活・就労ガイドブック — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/support/portal/guidebook_all.html' },
      { label: 'FRESC Help Desk', url: 'https://www.moj.go.jp/isa/support/fresc/fresc01.html' },
      { label: 'Consumer affairs — 国民生活センター', url: 'https://www.kokusen.go.jp/' },
      { label: '金融庁からのお願い・注意喚起 — 金融庁', url: 'https://www.fsa.go.jp/ordinary/chuui/chuui.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Thẻ cư trú và địa chỉ',
        description: 'Người trung/dài hạn cần quản lý thẻ cư trú cẩn thận, cập nhật địa chỉ trong vòng 14 ngày khi chuyển nhà và khai báo khi đổi thông tin quan trọng.',
        documents: [
          'Luôn kiểm tra hạn lưu trú và hạn thẻ',
          'Không cho người khác mượn thẻ cư trú',
          'Cập nhật địa chỉ với municipal office, ngân hàng, điện thoại, bảo hiểm',
        ],
        tip: 'Mất thẻ cư trú cần làm thủ tục cấp lại sớm tại ISA.',
      },
      {
        step: 2,
        title: 'Không cho mượn tài khoản/SIM',
        description: 'Không bán, cho mượn hoặc đứng tên hộ tài khoản ngân hàng, SIM, thẻ cash card hoặc tài khoản app cho người khác. Các hành vi này có thể liên quan lừa đảo/rửa tiền.',
        documents: [],
        tip: 'Nếu bị nhờ mở tài khoản hoặc nhận/chuyển tiền hộ để lấy phí, hãy từ chối.',
      },
      {
        step: 3,
        title: 'Rác, tiếng ồn và nhà thuê',
        description: 'Quy định rác khác nhau theo địa phương. Ở nhà thuê, cần tuân thủ hợp đồng về tiếng ồn, thú cưng, người ở cùng, hút thuốc và cách trả nhà.',
        documents: [
          'Lịch phân loại rác của địa phương',
          'Hợp đồng thuê nhà',
          'Nội quy tòa nhà/ký túc xá',
        ],
        tip: 'Chụp ảnh phòng khi dọn vào và khi trả nhà để tránh tranh chấp chi phí sửa chữa.',
        image: require('../../../../../assets/content/daily-life/ag_daily-law_s3.jpg'),
        imageCaption: 'Phân loại rác theo ngày quy định — vi phạm có thể bị phạt hoặc cảnh cáo từ 役所',
      },
      {
        step: 4,
        title: 'Khi bị yêu cầu ký giấy tờ',
        description: 'Không ký giấy tờ bạn không hiểu, nhất là hợp đồng lao động, thuê nhà, vay tiền, bảo lãnh, điện thoại hoặc chuyển tiền. Hãy xin bản copy và hỏi người tin cậy/cơ quan tư vấn.',
        documents: [],
        tip: 'Nếu cần tư vấn đa ngôn ngữ, kiểm tra FRESC hoặc quầy tư vấn người nước ngoài của địa phương.',
        image: require('../../../../../assets/content/daily-life/ag_daily-law_s1.jpg'),
        imageCaption: 'Thẻ 在留カード và đăng ký cư trú — hai thứ phải luôn cập nhật đúng thực tế',
      },
    ],
  };

export default dailyLawBasics;
