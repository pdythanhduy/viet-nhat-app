import type { AdminGuide } from '../../../../types/content';

const parentsElderlyRelatives: AdminGuide = {
    id: 'parents-elderly-relatives',
    category: 'visa',
    lastVerified: '2026-05-16',
    priority: 'high',
    title: 'Bảo lãnh cha mẹ / người thân lớn tuổi',
    titleJp: '親の呼び寄せ・高齢親族の在留',
    icon: 'people-circle',
    color: '#5C6B8A',
    description: 'Giải thích đúng phạm vi pháp lý khi muốn đưa cha mẹ hoặc người thân lớn tuổi sang Nhật. Trường hợp thông thường không đi theo 家族滞在; chỉ có một số ngoại lệ rất hẹp, chủ yếu gắn với 高度専門職.',
    legalScope: {
      jurisdiction: 'mixed',
      jurisdictionNote: 'Ở dài hạn theo ngoại lệ cha mẹ của 高度専門職 do ISA xét; thăm thân ngắn hạn do cơ quan lãnh sự Nhật ở ngoài Nhật xét theo hồ sơ visa ngắn hạn.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-12-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Gia đình muốn cha mẹ ở Nhật lâu dài nhưng bạn không thuộc 高度専門職 hoặc special highly skilled professional.',
        'Mục đích mời cha mẹ là chăm sóc y tế, dưỡng già, nhân đạo hoặc hoàn cảnh đặc biệt không nằm rõ trong điều kiện ISA.',
        'Bạn sắp trả phí dịch vụ cho bên hứa “bảo lãnh cha mẹ sang ở lâu dài” mà không chỉ ra đúng tư cách lưu trú.',
      ],
    },
    quickAction: {
      deadline: 'Kiểm tra đúng diện trước khi nộp hồ sơ hoặc trả phí dịch vụ; nếu chỉ thăm thân, chuẩn bị theo lịch xin visa ngắn hạn ở ngoài Nhật.',
      office: 'ISA nếu thuộc ngoại lệ 特定活動 cho cha mẹ của 高度専門職; cơ quan lãnh sự Nhật ở ngoài Nhật nếu là visa thăm thân ngắn hạn.',
      doNow: [
        'Xác định mục đích thật: thăm thân ngắn hạn hay ở cùng dài hạn.',
        'Kiểm tra tư cách lưu trú của người đang ở Nhật có phải 高度専門職/J-Skip không.',
        'Nếu không thuộc ngoại lệ, chuyển hướng sang hồ sơ 短期滞在 thay vì cố chuẩn bị hồ sơ ở dài hạn.',
      ],
      bring: ['Thẻ cư trú của người mời', 'Giấy tờ chứng minh quan hệ cha mẹ - con', 'Chứng minh thu nhập hộ gia đình nếu thuộc 高度専門職', 'Giấy tờ mục đích chăm con dưới 7 tuổi hoặc hỗ trợ thai sản nếu xin ngoại lệ'],
      ifLate: 'Không có hạn nộp chung, nhưng nếu visa hiện tại hoặc kế hoạch nhập cảnh sắp đến hạn thì nên hỏi ISA/cơ quan lãnh sự trước khi đặt vé.',
      officialSourceLabels: [
        'General visa: Dependent (family stays) — MOFA',
        '在留資格「特定活動」（高度専門職外国人又はその配偶者の親）— 出入国在留管理庁',
        'Procedures Chart for Short-Term Stay — MOFA',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_elderly-parents_hero.jpg'),
    heroImageCaption: 'Quy định pháp lý khi muốn đưa cha mẹ sang Nhật',
    whoIsThisFor: [
      'Người đang ở Nhật và muốn đưa cha mẹ sang ở cùng lâu dài.',
      'Người nghe môi giới hoặc mạng xã hội nói có thể “bảo lãnh bố mẹ sang Nhật” và muốn kiểm tra tính đúng sai.',
      'Người thuộc diện 高度専門職 / J-Skip muốn hiểu ngoại lệ hợp pháp về cha mẹ đi kèm.',
    ],
    whenToDo: [
      'Trước khi chuẩn bị hồ sơ cho cha mẹ hoặc người thân lớn tuổi, vì đây là nhóm rất dễ hiểu nhầm với 家族滞在.',
      'Khi bạn cần phân biệt rõ giữa ở dài hạn, thăm thân ngắn hạn và ngoại lệ 特定活動 cho nhóm 高度専門職.',
      'Nếu gia đình chỉ cần sang thăm vài tuần hoặc vài tháng, nên xem bài visa thăm thân ngắn hạn thay vì dùng bài này như lối vào ở lâu dài.',
    ],
    whereToDo: [
      'Kiểm tra trang visa dài hạn của MOFA và trang thủ tục/status của ISA trước khi chuẩn bị hồ sơ.',
      'Nếu thuộc nhóm 高度専門職 hoặc J-Skip, đối chiếu thêm trang 特定活動 dành cho cha mẹ của 高度専門職外国人.',
      'Nếu chỉ là thăm thân ngắn hạn, hồ sơ visa vẫn nộp tại cơ quan lãnh sự Nhật ở ngoài Nhật, không nộp trong nước Nhật.',
    ],
    estimatedTime: 'Không có một mốc chung cho mọi trường hợp vì phần lớn nhu cầu “đưa cha mẹ sang ở lâu dài” sẽ không đi theo diện thông thường. Nếu thuộc ngoại lệ 高度専門職, quy trình thực tế thường vẫn xoay quanh COE và thời gian xử lý của ISA cộng thêm thời gian xin visa ở cơ quan lãnh sự.',
    fees: [
      'Không nên kỳ vọng có một “gói bảo lãnh cha mẹ” tiêu chuẩn như vợ/chồng/con.',
      'Nếu chỉ là visa ngắn hạn thăm thân, phí visa theo bảng phí lãnh sự hiện hành của MOFA tại thời điểm nộp.',
      'Nếu thuộc diện ngoại lệ dùng COE/在留資格, chi phí dịch thuật, hộ tịch, công chứng và chuyển phát có thể phát sinh riêng.',
    ],
    documentsChecklist: [
      { label: 'Xác định rõ mục đích: ở dài hạn hay chỉ thăm thân ngắn hạn', required: true },
      { label: 'Kiểm tra tư cách lưu trú hiện tại của người đang ở Nhật', required: true, note: 'Phần lớn visa làm việc/du học thông thường không mở đường bảo lãnh cha mẹ theo diện ở dài hạn.' },
      { label: 'Nếu là 高度専門職 / J-Skip: giấy tờ chứng minh đúng diện', required: false },
      { label: 'Giấy tờ chứng minh quan hệ cha mẹ - con', required: true, note: 'Ví dụ: khai sinh, hộ tịch, giấy tờ quan hệ gia đình và bản dịch khi cần.' },
      { label: 'Tài liệu chứng minh lý do thuộc ngoại lệ hẹp', required: false, note: 'Ví dụ: con dưới 7 tuổi cần chăm, hoặc giấy tờ thai sản nếu xin theo diện hỗ trợ người đang mang thai.' },
      { label: 'Giấy tờ chứng minh thu nhập hộ gia đình nếu thuộc diện 高度専門職', required: false, note: 'ISA nêu mức tham chiếu thế hệ thu nhập hộ gia đình từ 8 triệu yên trở lên cho diện cha mẹ đi kèm này.' },
    ],
    commonMistakes: [
      'Nghĩ rằng cha mẹ cũng là “gia đình” nên đương nhiên đi theo 家族滞在 như vợ/chồng/con.',
      'Dùng từ “bảo lãnh” quá rộng và bỏ qua việc phần lớn trường hợp thực tế chỉ phù hợp với visa thăm thân ngắn hạn.',
      'Tin quảng cáo rằng chỉ cần có việc làm ổn định ở Nhật là đưa được cha mẹ sang ở lâu dài.',
      'Không phân biệt giữa 高度専門職/HSP với visa lao động thông thường, Tokutei Ginou, du học hoặc dependent visa.',
      'Hiểu nhầm eVISA hoặc visa du lịch là đường đi để ở chăm con/chăm cháu lâu dài.',
    ],
    faq: [
      {
        question: 'Cha mẹ có đi theo 家族滞在 giống vợ/chồng/con không?',
        answer: 'Thông thường là không. Trên hướng dẫn visa dài hạn của MOFA, diện Dependent/家族滞在 tập trung vào spouse và child. Vì vậy cha mẹ không phải đối tượng mặc định của diện này.',
      },
      {
        question: 'Nếu tôi đang đi làm ở Nhật bằng visa lao động thông thường thì có bảo lãnh cha mẹ sang ở lâu dài được không?',
        answer: 'Thông thường là không có đường tiêu chuẩn tương tự 家族滞在 cho cha mẹ. Trường hợp phổ biến và thực tế hơn là cha mẹ sang bằng visa thăm thân ngắn hạn nếu đủ điều kiện hồ sơ và mục đích chuyến đi là ngắn hạn.',
      },
      {
        question: 'Khi nào cha mẹ mới có thể ở cùng dài hạn theo ngoại lệ?',
        answer: 'ISA nêu ngoại lệ cho cha mẹ của 高度専門職外国人 hoặc đặc biệt高度人材 trong diện 特定活動, khi mục đích là chăm sóc con dưới 7 tuổi của người đó hoặc hỗ trợ người mang thai trong gia đình. Đây là ngoại lệ hẹp, không phải quyền chung cho mọi người lao động nước ngoài.',
      },
      {
        question: 'Có phải cứ là 高度専門職 thì cha mẹ nào cũng sang được không?',
        answer: 'Không. ISA nêu thêm các điều kiện như phải sống cùng, phải có thu nhập hộ gia đình từ 8 triệu yên trở lên và phải thuộc đúng mục đích hỗ trợ được phép. Đây không phải diện để đưa cha mẹ sang sống lâu dài vì tuổi già hay chăm sóc thông thường ngoài phạm vi quy định.',
      },
      {
        question: 'Người thân lớn tuổi khác như anh/chị/em, cô/chú, ông/bà có diện bảo lãnh dài hạn riêng không?',
        answer: 'Không có một diện chung, phổ thông và ổn định tương tự 家族滞在 cho nhóm này. Nếu mục đích chỉ là sang thăm, nên đi theo hướng visa thăm thân ngắn hạn. Các trường hợp nhân đạo hoặc đặc biệt cần tư vấn hồ sơ riêng và không nên coi là con đường tiêu chuẩn.',
      },
    ],
    officialLinks: [
      { label: 'General visa: Dependent (family stays) — MOFA', url: 'https://www.mofa.go.jp/j_info/visit/visa/long/visa9.html' },
      { label: 'Highly skilled professional visa — MOFA', url: 'https://www.mofa.go.jp/j_info/visit/visa/long/visa16.html' },
      { label: '在留資格「特定活動」（高度専門職外国人又はその配偶者の親）— 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html' },
      { label: '高度人材ポイント制Q&A — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/resources/newimmiact_3_qa.html' },
      { label: 'Procedures Chart for Short-Term Stay — MOFA', url: 'https://www.mofa.go.jp/j_info/visit/visa/process/short.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Bỏ hiểu nhầm lớn nhất: cha mẹ không phải diện 家族滞在 thông thường',
        description: 'Nếu bạn đang nghĩ “đã bảo lãnh được vợ/chồng/con thì cũng bảo lãnh được cha mẹ”, hãy dừng lại ở đây. Hướng dẫn của MOFA cho Dependent/家族滞在 không coi cha mẹ là đối tượng mặc định như spouse và child.',
        documents: [
          'Thẻ cư trú hoặc visa hiện tại của bạn ở Nhật',
          'Mục đích thật sự của việc mời cha mẹ sang Nhật',
        ],
        tip: 'Điểm cần nhớ: “gia đình” trong cách nói thông thường không đồng nghĩa với “eligible family member” trong từng tư cách lưu trú.',
      },
      {
        step: 2,
        title: 'Nếu mục đích chỉ là sang thăm, hãy đi đúng hướng visa ngắn hạn',
        description: 'Trong phần lớn trường hợp thực tế, cha mẹ hoặc người thân lớn tuổi chỉ phù hợp với visa 短期滞在 để sang thăm con/cháu trong thời gian ngắn. Đây là hướng hợp pháp, rõ ràng và phù hợp hơn so với việc cố biến chuyến thăm thành ở dài hạn.',
        documents: [
          'Hộ chiếu, đơn xin visa, ảnh',
          'Thư mời, lịch trình, giấy tờ tài chính theo hướng dẫn nơi nộp',
          'Giấy tờ chứng minh quan hệ thân nhân nếu đi theo diện 親族訪問',
        ],
        tip: 'Visa thăm thân ngắn hạn không phải visa đi làm và cũng không phải công cụ để “vào trước rồi ở lại lâu dài”.',
      },
      {
        step: 3,
        title: 'Ngoại lệ hẹp: cha mẹ của 高度専門職 / J-Skip',
        description: 'ISA nêu rõ thông thường cha mẹ của người đang ở Nhật theo visa lao động không được chấp nhận nhập cảnh/cư trú dài hạn. Tuy nhiên, một ngoại lệ tồn tại cho cha mẹ của 高度専門職外国人 hoặc 特別高度人材 trong diện 特定活動.',
        documents: [
          'Giấy tờ chứng minh bạn thuộc 高度専門職 hoặc special highly skilled professional',
          'Giấy tờ chứng minh quan hệ cha mẹ - con hoặc cha/mẹ của vợ/chồng',
          'Giấy tờ về nơi ở chung dự kiến',
        ],
        tip: 'Đây là ngoại lệ cho nhóm rất cụ thể. Không nên suy rộng sang visa kỹ sư, kỹ năng đặc định, du học, dependent hoặc thực tập sinh.',
      },
      {
        step: 4,
        title: 'Điều kiện trọng tâm của ngoại lệ này',
        description: 'Theo ISA, cha mẹ trong diện 特定活動 nói trên phải sống cùng với người con thuộc 高度専門職, và tại thời điểm nộp phải đáp ứng điều kiện về thu nhập hộ gia đình cũng như mục đích hỗ trợ hợp lệ.',
        documents: [
          'Chứng từ thu nhập hộ gia đình dự kiến từ 8 triệu yên trở lên',
          'Giấy tờ chứng minh có con dưới 7 tuổi cần chăm sóc, nếu xin theo mục đích dưỡng dục',
          'Giấy tờ y tế/thai sản nếu xin theo mục đích hỗ trợ người đang mang thai',
        ],
        tip: 'ISA nêu hai lý do cốt lõi: chăm con dưới 7 tuổi hoặc hỗ trợ người đang mang thai. Ngoài các lý do này, đừng giả định rằng cha mẹ có thể ở lâu dài theo cùng diện.',
      },
      {
        step: 5,
        title: 'Giới hạn cần hiểu rất rõ',
        description: 'Ngay cả khi thuộc nhóm 高度専門職, đây vẫn không phải “visa đưa cha mẹ sang dưỡng già” theo nghĩa rộng. Mục đích hỗ trợ bị giới hạn, điều kiện chặt và không nên dùng để suy diễn sang việc cha mẹ có quyền cư trú lâu dài vô điều kiện.',
        documents: [
          'Giải trình mục đích hỗ trợ',
          'Giấy tờ chứng minh thành viên gia đình liên quan',
          'Thông tin về tình trạng cư trú hiện tại của người con tại Nhật',
        ],
        tip: 'Trong hồ sơ thực tế, càng giải thích theo hướng “cha mẹ sang ở luôn vì lớn tuổi” mà không gắn đúng điều kiện pháp lý, nguy cơ sai hướng càng cao.',
      },
      {
        step: 6,
        title: 'Nếu hồ sơ của bạn không thuộc ngoại lệ',
        description: 'Hãy quay về phương án đúng thực tế: visa thăm thân ngắn hạn, lên kế hoạch thời gian ở rõ ràng, và không hứa với gia đình rằng có thể đổi sang ở dài hạn chỉ vì đã nhập cảnh. Nếu hồ sơ có yếu tố nhân đạo đặc biệt, nên hỏi tư vấn chuyên môn thay vì dựa vào tin truyền miệng.',
        documents: [
          'Kế hoạch chuyến thăm ngắn hạn',
          'Lịch trình lưu trú',
          'Tài chính của người đi hoặc người mời/bảo lãnh chi phí',
        ],
        tip: 'Đây là nhóm thủ tục rất dễ bị môi giới nói quá. Hãy bám nguyên văn nguồn MOFA/ISA trước khi nộp bất kỳ khoản phí dịch vụ nào.',
      },
    ],
  };

export default parentsElderlyRelatives;
