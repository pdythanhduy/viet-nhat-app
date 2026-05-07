import type { AdminGuide } from '../../../../types/content';

const residenceCard: AdminGuide = {
    id: 'residence-card',
    category: 'immigration',
    lastVerified: '2026-05-07',
    priority: 'high',
    title: 'Gia hạn thời hạn lưu trú / visa',
    titleJp: '在留期間更新許可申請',
    icon: 'card',
    color: '#185FA5',
    description: 'Thủ tục xin tiếp tục ở Nhật với cùng tư cách lưu trú hiện tại. Đây là thủ tục thường gọi là gia hạn visa, khác với gia hạn hiệu lực vật lý của thẻ cư trú.',
    legalScope: {
      jurisdiction: 'national',
      jurisdictionNote: 'Thủ tục 在留期間更新許可申請 do ISA xử lý toàn quốc; giấy tờ phụ thuộc tư cách lưu trú, nơi cư trú/làm việc/học tập và tình trạng hồ sơ.',
      sourceVerifiedAt: '2026-05-07',
      nextReviewAt: '2026-09-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Bạn sắp hết hạn lưu trú nhưng đã đổi việc, nghỉ học, nợ thuế/bảo hiểm hoặc hoạt động thực tế khác với tư cách đang có.',
        'Bạn không chắc nên gia hạn thời hạn lưu trú hay đổi tư cách lưu trú.',
        'Bạn đã nộp sát hạn, bị yêu cầu bổ sung hoặc có nguy cơ quá hạn.',
      ],
    },
    quickAction: {
      deadline: 'Nếu thời hạn lưu trú hiện tại từ 6 tháng trở lên, thường có thể nộp từ khoảng 3 tháng trước ngày hết hạn; không đợi sát hạn. Hệ thống online không nhận hồ sơ vào đúng ngày hết hạn lưu trú.',
      office: 'Cục xuất nhập cảnh có thẩm quyền hoặc hệ thống online ISA nếu thuộc đối tượng được dùng.',
      doNow: [
        'Kiểm tra ngày hết hạn lưu trú trên thẻ cư trú.',
        'Tải mẫu đúng tư cách lưu trú từ trang ISA tại ngày chuẩn bị nộp.',
        'Nếu định nộp online, nộp trước ngày cuối; nếu đã đến đúng ngày hết hạn, hỏi/nộp tại cục xuất nhập cảnh có thẩm quyền.',
        'Chuẩn bị giấy tờ thuế, bảo hiểm, thu nhập, trường/công ty nếu hồ sơ có yếu tố thay đổi.',
      ],
      bring: ['Thẻ cư trú', 'Hộ chiếu', 'Ảnh thẻ 4cm x 3cm', 'Đơn xin gia hạn', 'Giấy tờ chứng minh hoạt động hiện tại'],
      ifLate: 'Nộp/hỏi ISA càng sớm càng tốt và giải thích trung thực; quá hạn lưu trú là rủi ro nghiêm trọng.',
      officialSourceLabels: [
        '在留期間更新許可申請 — 出入国在留管理庁',
        'Online Residence Application System — ISA',
        'Thông báo sửa phí thủ tục từ 01/04/2025',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_residence-card_hero.jpg'),
    heroImageCaption: 'Thẻ cư trú (在留カード) — mang theo khi ra ngoài, cập nhật thông tin khi có thay đổi',
    whoIsThisFor: [
      'Người đang ở Nhật với tư cách lưu trú trung/dài hạn và muốn tiếp tục ở Nhật với cùng tư cách hiện tại.',
      'Người đi làm, du học sinh, visa gia đình, kỹ năng đặc định hoặc các tư cách khác sắp hết hạn lưu trú.',
      'Không dùng cho trường hợp muốn đổi sang tư cách khác; khi đó cần xem thủ tục 在留資格変更許可申請.',
      'Không phải thủ tục gia hạn hiệu lực thẻ cư trú vật lý của người vĩnh trú/trẻ em dưới 16 tuổi.',
    ],
    whenToDo: [
      'Nếu thời hạn lưu trú hiện tại từ 6 tháng trở lên, thường có thể nộp từ khoảng 3 tháng trước ngày hết hạn.',
      'Nên chuẩn bị hồ sơ sớm hơn thời điểm nộp vì có thể cần giấy tờ từ công ty, trường, municipal office hoặc người bảo lãnh.',
      'Không nên đợi sát ngày hết hạn; nếu thiếu giấy tờ, bạn có thể không kịp bổ sung.',
      'Nếu có lý do đặc biệt như nhập viện hoặc công tác dài ngày, hãy hỏi ISA về khả năng nộp sớm.',
    ],
    whereToDo: [
      'Cục xuất nhập cảnh có thẩm quyền theo nơi cư trú hoặc nơi làm việc/học tập.',
      'Hệ thống online của ISA nếu bạn thuộc đối tượng được phép sử dụng.',
      'Một số trường/công ty/行政書士 có thể hỗ trợ chuẩn bị hồ sơ, nhưng người nộp vẫn cần hiểu nội dung hồ sơ của mình.',
    ],
    estimatedTime: 'Thời gian xét duyệt thay đổi theo hồ sơ và khu vực. Nhiều hồ sơ mất vài tuần đến vài tháng; nếu bị yêu cầu bổ sung giấy tờ sẽ lâu hơn.',
    fees: [
      'Nếu được cấp phép: 6.000 yên khi làm thủ tục thường, hoặc 5.500 yên nếu là online application theo mức ISA áp dụng từ 01/04/2025.',
      'Không nên dựa vào mức phí cũ 4.000 yên hoặc kinh nghiệm của người khác; kiểm tra bảng phí chính thức của ISA trước khi nhận kết quả.',
      'Thông thường phí được nộp khi nhận kết quả được cấp phép, không phải lúc nộp hồ sơ.',
    ],
    documentsChecklist: [
      { label: 'Đơn xin gia hạn thời hạn lưu trú', required: true, note: 'Tải đúng mẫu theo tư cách lưu trú từ trang ISA.' },
      { label: 'Ảnh thẻ縦4cm × 横3cm', required: true, note: 'Nền trắng hoặc sáng màu đơn sắc (không có bóng), chụp trong 3 tháng gần nhất, không đội mũ, không đeo kính tối.' },
      { label: 'Hộ chiếu', required: true, note: 'Mang bản gốc. Nếu không có hộ chiếu hợp lệ, cần giải thích theo hướng dẫn của ISA.' },
      { label: 'Thẻ cư trú hiện tại', required: true, note: 'Mang bản gốc.' },
      { label: 'Giấy chứng nhận đang làm việc / hợp đồng lao động', required: false, note: 'Thường cần với visa đi làm.' },
      { label: 'Giấy chứng nhận nhập học / bảng điểm / chứng nhận chuyên cần', required: false, note: 'Thường cần với visa du học.' },
      { label: 'Giấy tờ thuế, thu nhập, bảo hiểm', required: false, note: 'Có thể cần tùy tư cách lưu trú và tình trạng hồ sơ.' },
      { label: 'Giấy tờ của người bảo lãnh', required: false, note: 'Có thể cần với 家族滞在 hoặc tư cách phụ thuộc gia đình.' },
      { label: 'Lý do giải trình', required: false, note: 'Nên chuẩn bị nếu có đổi việc, nghỉ học, nợ thuế/bảo hiểm, thu nhập thấp hoặc hồ sơ bất thường.' },
    ],
    commonMistakes: [
      'Nhầm lẫn giữa gia hạn thời hạn lưu trú và gia hạn hiệu lực thẻ cư trú.',
      'Đổi việc nhưng quên khai báo với ISA trong trường hợp cần khai báo.',
      'Công việc thực tế không khớp tư cách lưu trú đang có.',
      'Du học sinh làm quá giờ hoặc thiếu chuyên cần nhưng không chuẩn bị giải trình.',
      'Thiếu giấy tờ thuế/bảo hiểm/thu nhập hoặc để địa chỉ trên giấy tờ không khớp.',
      'Nộp sát hạn khiến không kịp bổ sung hồ sơ.',
    ],
    faq: [
      {
        question: 'Nộp hồ sơ rồi có được tiếp tục ở Nhật trong lúc chờ không?',
        answer: 'Nếu nộp đúng hạn trước ngày hết hạn lưu trú, có thể có cơ chế 特例期間 trong một số trường hợp. Tuy nhiên điều kiện cụ thể phụ thuộc hồ sơ, nên hãy kiểm tra hướng dẫn của ISA hoặc hỏi tại quầy khi nộp.',
      },
      {
        question: 'Có được tiếp tục đi làm trong lúc chờ kết quả không?',
        answer: 'Về nguyên tắc bạn chỉ được hoạt động trong phạm vi tư cách lưu trú hiện tại. Nếu công việc/tình trạng đã thay đổi, hãy xác nhận với ISA trước khi tiếp tục làm.',
      },
      {
        question: 'Gia hạn visa có phải lúc nào cũng được cấp không?',
        answer: 'Không. ISA xét hoạt động thực tế, thu nhập, thuế/bảo hiểm, tình trạng học tập/làm việc, quan hệ gia đình và các yếu tố khác tùy tư cách lưu trú.',
      },
      {
        question: 'Nếu bị yêu cầu bổ sung giấy tờ thì sao?',
        answer: 'Chuẩn bị đúng giấy tờ được yêu cầu và nộp trước hạn ghi trong thông báo. Nên giữ bản sao toàn bộ hồ sơ đã nộp.',
      },
      {
        question: 'Phí bao nhiêu?',
        answer: 'Theo ISA, hồ sơ được cấp phép hiện là 6.000 yên nếu làm thủ tục thường và 5.500 yên nếu nộp online. Vẫn nên kiểm tra bảng phí chính thức tại thời điểm nhận kết quả.',
      },
      {
        question: 'Có thể nộp online vào đúng ngày hết hạn không?',
        answer: 'Không nên để đến ngày cuối. ISA nêu hệ thống online không thể dùng để nộp vào đúng ngày hết hạn lưu trú; khi đó cần xử lý tại cục xuất nhập cảnh có thẩm quyền.',
      },
    ],
    officialLinks: [
      { label: '在留期間更新許可申請 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/16-3.html' },
      { label: 'Online Residence Application System — ISA', url: 'https://www.moj.go.jp/isa/applications/online/onlineshinsei.html' },
      { label: 'Thông báo sửa phí thủ tục từ 01/04/2025', url: 'https://www.moj.go.jp/isa/01_00518.html' },
      { label: 'Tra cứu cục xuất nhập cảnh gần nhất', url: 'https://www.moj.go.jp/isa/about/region/index.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Kiểm tra thời điểm nộp',
        description: 'Theo ISA, nếu thời hạn lưu trú hiện tại từ 6 tháng trở lên, thường có thể nộp từ khoảng 3 tháng trước ngày hết hạn. Trường hợp đặc biệt như nhập viện hoặc công tác dài ngày có thể được xem xét sớm hơn.',
        documents: [
          'Thẻ cư trú hiện tại (在留カード)',
          'Hộ chiếu còn hiệu lực',
          'Ngày hết hạn lưu trú ghi trên thẻ cư trú',
        ],
        tip: 'Đừng chờ sát ngày hết hạn. Nếu nộp đúng hạn, có thể có "特例期間" trong thời gian chờ xét duyệt, nhưng vẫn nên xác nhận với cục xuất nhập cảnh.',
      },
      {
        step: 2,
        title: 'Chuẩn bị hồ sơ theo tư cách lưu trú',
        description: 'Giấy tờ phụ thuộc vào loại visa: đi làm, du học, gia đình, kỹ năng đặc định, v.v. Hãy tải đúng mẫu từ trang ISA cho tư cách lưu trú của bạn.',
        documents: [
          'Đơn xin gia hạn thời hạn lưu trú',
          'Ảnh thẻ縦4cm × 横3cm, nền trắng/sáng, chụp trong 3 tháng gần nhất',
          'Giấy tờ chứng minh hoạt động hiện tại: hợp đồng lao động, giấy chứng nhận đang làm việc, giấy nhập học, bảng điểm, giấy tờ gia đình...',
          'Giấy tờ thu nhập/thuế/bảo hiểm nếu được yêu cầu',
        ],
        tip: 'Tên thủ tục đúng là "在留期間更新許可申請"; không nên gọi chung là gia hạn thẻ cư trú khi tra cứu thông tin chính thức.',
      },
      {
        step: 3,
        title: 'Nộp hồ sơ tại ISA hoặc online nếu đủ điều kiện',
        description: 'Có thể nộp tại cục xuất nhập cảnh có thẩm quyền hoặc qua hệ thống online nếu bạn thuộc đối tượng được phép sử dụng.',
        documents: [
          'Hồ sơ đã chuẩn bị',
          'Thẻ cư trú và hộ chiếu bản gốc',
          'Giấy tờ bổ sung nếu cục yêu cầu',
        ],
        tip: 'Luôn kiểm tra trang chính thức trước ngày nộp vì biểu mẫu, phí và giấy tờ có thể thay đổi.',
        image: require('../../../../../assets/content/daily-life/ag_residence-card_s3.jpg'),
        imageCaption: '出入国在留管理局 — nộp hồ sơ gia hạn lưu trú trực tiếp tại quầy tiếp nhận',
      },
      {
        step: 4,
        title: 'Nhận kết quả và nộp phí',
        description: 'Khi được thông báo kết quả, mang giấy thông báo, hộ chiếu, thẻ cư trú cũ và nộp phí theo hướng dẫn hiện hành để nhận thẻ mới.',
        documents: [
          'Thông báo từ ISA',
          'Hộ chiếu',
          'Thẻ cư trú cũ',
          'Lệ phí: 6.000 yên thủ tục thường hoặc 5.500 yên online theo bảng phí hiện hành nếu được cấp phép',
        ],
        tip: 'Không ghi nhớ phí theo kinh nghiệm cũ. Với hồ sơ online, cũng phải theo đúng cách nộp phí ISA hướng dẫn khi nhận kết quả.',
      },
    ],
  };

export default residenceCard;
