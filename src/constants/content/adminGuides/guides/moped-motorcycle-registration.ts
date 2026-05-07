import type { AdminGuide } from '../../../../types/content';

const mopedMotorcycleRegistration: AdminGuide = {
    id: 'moped-motorcycle-registration',
    category: 'traffic',
    lastVerified: '2026-05-07',
    priority: 'normal',
    title: 'Đăng ký xe máy / xe tay ga tại Nhật',
    titleJp: '原付・新基準原付・原付二種・軽二輪の登録手続き',
    icon: 'speedometer-outline',
    color: '#784212',
    description: 'Hướng dẫn đăng ký và sử dụng xe hai bánh tại Nhật: 原付一種 cũ (≤50cc), 新基準原付 (≤125cc nhưng tối đa 4.0kW), 原付二種 và 軽二輪. Bao gồm loại bằng lái cần có, bảo hiểm bắt buộc, nơi làm thủ tục và cách tránh nhầm moped/xe điện có bàn đạp với xe đạp thường.',
    legalScope: {
      appliesFrom: '2025-04-01',
      jurisdiction: 'mixed',
      jurisdictionNote: 'Phân loại bằng lái và quy tắc chạy xe do NPA/police quản lý; tiêu chuẩn xe và 自賠責 do MLIT/GIROJ liên quan; đăng ký biển số xe ≤125cc thường do municipal office xử lý, còn 126cc trở lên do 運輸支局/自動車検査登録事務所.',
      sourceVerifiedAt: '2026-05-07',
      nextReviewAt: '2026-11-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Bạn định mua xe 125cc nhưng không rõ xe đó là 新基準原付 tối đa 4.0kW hay 原付二種 thông thường.',
        'Xe là hàng nhập/online, có bàn đạp, có throttle, hoặc người bán ghi mơ hồ “公道走行可/不可”.',
        'Bạn chưa đổi bằng Việt Nam sang bằng Nhật đúng hạng xe hoặc định dùng IDP mà không chắc có thuộc Geneva 1949.',
      ],
    },
    quickAction: {
      deadline: 'Không chạy xe trên đường công cộng trước khi đã xác định đúng phân loại, có bằng phù hợp, gắn ナンバープレート và mua 自賠責 còn hiệu lực. 新基準原付 chạy bằng 原付免許 áp dụng từ 01/04/2025; phí 自賠責 có bảng mới cho hợp đồng bắt đầu từ 01/11/2026.',
      office: 'Xe ≤125cc hỏi municipal office nơi cư trú; 126cc trở lên hỏi 運輸支局/自動車検査登録事務所; bằng lái hỏi driver license center/police địa phương.',
      doNow: [
        'Kiểm tra thông số xe: dung tích, định mức/最高出力, có throttle hay chỉ trợ lực đạp, và giấy chứng nhận của đại lý.',
        'Không hiểu “125cc” là đủ để dùng bằng ô tô/原付: chỉ loại ≤125cc và 最高出力≤4.0kW thuộc 新基準原付 mới được chạy bằng 原付免許.',
        'Nếu xe có bàn đạp nhưng có thể chạy bằng motor hoặc không đạt chuẩn 電動アシスト自転車, xử lý như xe máy/moped: cần bằng, biển số, 自賠責 và thiết bị an toàn.',
        'Mở bảng phí 自賠責 chính thức trước ngày mua vì mức phí phụ thuộc ngày bắt đầu hợp đồng, loại xe và khu vực.',
      ],
      bring: ['Giấy tờ mua bán/chuyển nhượng xe', 'Thông số 排気量/定格出力/最高出力', 'Thẻ cư trú hoặc giấy tờ địa chỉ', 'Bằng lái Nhật đúng hạng', '自賠責保険証明書'],
      ifLate: 'Chạy xe khi thiếu bằng, thiếu biển số hoặc thiếu 自賠責 có thể bị xử phạt nặng; 自賠責 hết hạn có thể dẫn tới phạt, điểm vi phạm và đình chỉ bằng.',
      officialSourceLabels: [
        '一般原動機付自転車の車両区分見直し — 警察庁',
        '一般原動機付自転車について — 国土交通省',
        '自賠責保険・共済に加入するには — 国土交通省',
        '自賠責保険基準料率 — 損害保険料率算出機構',
        '電動アシスト自転車とペダル付き電動バイク — 警視庁',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_moped_hero.jpg'),
    heroImageCaption: '原付 và xe tay ga - đăng ký xe, biển số và bảo hiểm bắt buộc trước khi chạy',
    whoIsThisFor: [
      'Người muốn mua hoặc đang sở hữu xe máy/xe tay ga tại Nhật và cần biết thủ tục đăng ký đúng luật.',
      'Người từ Việt Nam sang có bằng lái xe máy và muốn hiểu bằng nào dùng được cho loại xe nào ở Nhật.',
      'Người mua xe cũ (中古) và cần chuyển tên đăng ký hoặc đăng ký lại.',
      'Người đang cân nhắc xe 125cc mới, moped/xe điện có bàn đạp hoặc xe mua online cần phân biệt xe đạp điện hợp lệ với xe máy.',
    ],
    whenToDo: [
      'Ngay khi mua xe mới hoặc nhận xe cũ — không được đi trước khi có số đăng ký (ナンバープレート) và bảo hiểm bắt buộc (自賠責保険).',
      'Khi chuyển địa chỉ hoặc mua xe cũ: kiểm tra ngay nơi làm thủ tục. Xe ≤125cc hỏi municipal office; xe từ 126cc trở lên hỏi 運輸支局 hoặc 自動車検査登録事務所.',
      'Trước khi mua 125cc hoặc moped/xe điện có bàn đạp: xác nhận hạng xe và bằng lái bằng giấy tờ kỹ thuật, không dựa vào quảng cáo.',
    ],
    whereToDo: [
      '市区町村役場 nơi cư trú: đăng ký 原付一種, 新基準原付 và 原付二種 từ 125cc trở xuống, rồi nhận ナンバープレート địa phương.',
      '運輸支局 hoặc 自動車検査登録事務所: làm thủ tục 軽二輪 từ 126cc đến 250cc và 小型二輪 từ 251cc trở lên.',
      'Đại lý xe máy: nhờ làm hộ đăng ký, chuyển tên và 自賠責 khi mua xe mới hoặc xe cũ qua cửa hàng.',
      'Công ty bảo hiểm, đại lý hoặc một số convenience store/online: mua 自賠責保険 cho 原付/軽二輪.',
    ],
    documentsChecklist: [
      { label: '在留カード hoặc giấy tờ xác minh địa chỉ', required: true },
      { label: '販売証明書 hoặc 譲渡証明書', required: true, note: 'Cần để chứng minh nguồn gốc/mua bán xe.' },
      { label: 'Thông số 排気量/定格出力/最高出力', required: true, note: 'Đặc biệt quan trọng với 新基準原付 125cc tối đa 4.0kW và xe điện/moped mua online.' },
      { label: '廃車証明書', required: false, note: 'Cần khi mua xe cũ đã hủy đăng ký từ chủ cũ, đặc biệt với xe ≤125cc.' },
      { label: '自賠責保険証明書', required: true, note: 'Xe không được chạy nếu chưa có bảo hiểm bắt buộc còn hiệu lực.' },
      { label: '軽自動車届出済証 hoặc giấy tờ xe tương ứng', required: false, note: 'Cần với 軽二輪/小型二輪 khi chuyển tên, đổi địa chỉ hoặc xin cấp lại.' },
      { label: 'ナンバープレート cũ', required: false, note: 'Có thể cần khi đổi địa phương, hủy đăng ký hoặc đổi biển.' },
    ],
    commonMistakes: [
      'Nhầm nơi làm thủ tục: xe ≤125cc hỏi municipal office, còn 126cc trở lên hỏi 運輸支局/自動車検査登録事務所.',
      'Mua xe cũ từ cá nhân nhưng không nhận đủ 譲渡証明書, 廃車証明書 hoặc giấy tờ xe.',
      'Đi xe trước khi có ナンバープレート và 自賠責保険.',
      'Không kiểm tra hạn 自賠責保険; hết hạn mà vẫn chạy có thể bị xử phạt nặng và đình chỉ bằng.',
      'Mua moped/xe điện có bàn đạp nhưng tưởng là xe đạp thường, không đăng ký và không mua 自賠責.',
      'Thấy xe 125cc rồi nghĩ bằng ô tô/原付免許 chạy được mọi xe 125cc; thực tế chỉ 新基準原付 có 最高出力≤4.0kW mới thuộc ngoại lệ từ 01/04/2025.',
    ],
    faq: [
      {
        question: 'Xe dưới 125cc đăng ký ở đâu?',
        answer: 'Thông thường đăng ký tại municipal office nơi bạn cư trú. Hỏi quầy 税務課 hoặc bộ phận phụ trách 軽自動車税/原付 để nhận mẫu và biển số.',
      },
      {
        question: 'Từ 01/04/2025, bằng ô tô hoặc 原付免許 có chạy được xe 125cc không?',
        answer: 'Chỉ trong trường hợp xe là 新基準原付: tổng dung tích 125cc trở xuống và 最高出力 không quá 4.0kW. Xe 51–125cc thông thường không đáp ứng điều kiện này vẫn là 原付二種 và cần bằng 二輪 phù hợp.',
      },
      {
        question: 'Moped/xe điện có bàn đạp có được coi là xe đạp không?',
        answer: 'Không được mặc định coi là xe đạp. Nếu có throttle, có thể chạy bằng motor, hoặc không đạt chuẩn 電動アシスト自転車, xe có thể thuộc 一般原動機付自転車 hoặc 自動車; khi đó cần bằng lái, biển số, 自賠責, mũ và thiết bị an toàn.',
      },
      {
        question: '軽二輪 126-250cc có làm ở 軽自動車検査協会 không?',
        answer: 'Không nên mặc định như vậy. Theo hướng dẫn của MLIT và các 運輸局, thủ tục 軽二輪 hiện làm tại 運輸支局 hoặc 自動車検査登録事務所 có thẩm quyền theo địa chỉ sử dụng xe.',
      },
      {
        question: '自賠責保険 khác gì 任意保険?',
        answer: '自賠責保険 là bảo hiểm bắt buộc, chủ yếu bồi thường thiệt hại thân thể cho nạn nhân với mức trần. 任意保険 là bảo hiểm tự nguyện để mở rộng bảo vệ như thiệt hại tài sản, phần vượt trần và bảo vệ người lái.',
      },
    ],
    officialLinks: [
      { label: '一般原動機付自転車の車両区分見直し — 警察庁', url: 'https://www.npa.go.jp/bureau/traffic/menkyo/menkyo_nirinsha.html' },
      { label: '一般原動機付自転車について — 国土交通省', url: 'https://www.mlit.go.jp/jidosha/jidosha_fr7_000092.html' },
      { label: '電動アシスト自転車とペダル付き電動バイク — 警視庁', url: 'https://www.keishicho.metro.tokyo.lg.jp/kotsu/jikoboshi/electric_mobility/pedal.html' },
      { label: '自賠責保険・共済に加入するには — 国土交通省', url: 'https://www.mlit.go.jp/jidosha/jibaiseki/about/policyholder/index.html' },
      { label: '自賠責保険基準料率 — 損害保険料率算出機構', url: 'https://www.giroj.or.jp/ratemaking/cali/' },
      { label: '自賠責保険ポータルサイト — 国土交通省', url: 'https://www.mlit.go.jp/jidosha/jibaiseki/' },
      { label: '自動車の種類 — 自動車検査登録総合ポータルサイト', url: 'https://www.jidoushatouroku-portal.mlit.go.jp/jidousha/kensatoroku/procedure/index.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Xác định loại xe và loại bằng lái cần có',
        description: 'Nhật phân loại xe hai bánh theo dung tích, output và cấu tạo xe — mỗi loại có thủ tục đăng ký và yêu cầu bằng lái khác nhau:\n\n• 原付一種 cũ (≤50cc) và 新基準原付 (≤125cc nhưng 最高出力≤4.0kW): đăng ký tại municipal office (市区町村役場), nhận ナンバー địa phương. Có thể chạy bằng 原付免許 hoặc 普通免許, nhưng vẫn áp dụng quy tắc của 原付 như giới hạn 30 km/h và 二段階右折 ở nơi yêu cầu.\n\n• 原付二種 (51–125cc thông thường hoặc 125cc vượt 4.0kW): đăng ký tại municipal office. Cần bằng 普通二輪免許 (小型限定 trở lên). Không dùng 普通免許/原付免許 để chạy loại này.\n\n• 軽二輪 (126–250cc): làm thủ tục tại 運輸支局 hoặc 自動車検査登録事務所. Cần bằng 普通二輪免許. Không cần 車検 định kỳ.\n\n• 小型二輪自動車 (>250cc): làm thủ tục tại 運輸支局, cần 車検 định kỳ. Cần bằng 普通二輪 hoặc 大型二輪.',
        documents: [],
        tip: 'Bằng lái xe máy Việt Nam không được dùng trực tiếp để chạy xe tại Nhật — phải đổi sang bằng Nhật hoặc dùng IDP hợp lệ theo Công ước Geneva 1949 trong thời hạn được phép. JAF/NPA cũng nêu IDP theo Công ước Vienna 1968 không có giá trị tại Nhật.',
      },
      {
        step: 2,
        title: 'Đăng ký 原付 tại municipal office',
        description: 'Với xe ≤125cc, đăng ký tại quầy 税務課 hoặc 市民課 của municipal office nơi bạn cư trú:\n\n1. Điền mẫu 軽自動車税(種別割)申告書 (mẫu tại quầy, miễn phí).\n2. Nộp kèm: chứng nhận xuất xứ/mua bán xe (販売証明書 từ đại lý, hoặc 譲渡証明書 nếu mua xe cũ từ cá nhân), 在留カード.\n3. Nhận ナンバープレート ngay trong ngày — gắn lên xe trước khi đi.\n\nMua xe mới từ đại lý: đại lý thường làm thủ tục hộ.\nMua xe cũ từ cá nhân: bạn tự làm tại municipal office.',
        documents: [
          '販売証明書 (từ đại lý) hoặc 譲渡証明書 + 廃車証明書 (mua xe cũ cá nhân)',
          '在留カード',
          'Mẫu đơn đăng ký (lấy tại quầy)',
        ],
        tip: 'Phí đăng ký 原付 không tốn nhiều, nhưng 軽自動車税 hàng năm sẽ được gửi vào tháng 5 — 原付一種: 2,000 yên/năm, 原付二種: 2,400–3,600 yên/năm. Không bỏ qua hóa đơn này.',
      },
      {
        step: 3,
        title: 'Mua bảo hiểm bắt buộc 自賠責保険',
        description: '自賠責保険 (bảo hiểm trách nhiệm dân sự bắt buộc) là điều kiện phải có trước khi đi xe trên đường; không có là vi phạm luật, có thể bị phạt nặng và đình chỉ bằng.\n\nMua ở đâu: tại đại lý xe khi mua xe mới, tại một số cửa hàng tiện lợi/online cho xe 250cc trở xuống, hoặc qua công ty/đại lý bảo hiểm.\n\nMức phí MLIT hiện hành cho hợp đồng bắt đầu từ 01/04/2024 đến 31/10/2026, khu vực không phải Okinawa/đảo xa: 原動機付自転車 125cc trở xuống là 6,910 yên/1 năm hoặc 8,560 yên/2 năm; 軽二輪 125cc超–250cc以下 là 7,100 yên/1 năm hoặc 8,920 yên/2 năm. Từ hợp đồng bắt đầu 01/11/2026, GIROJ đã công bố bảng 基準料率 mới nên phải kiểm tra lại trước khi mua.\n\n自賠責 chủ yếu bồi thường thiệt hại thân thể cho nạn nhân, không đủ cho thiệt hại tài sản hoặc phần vượt trần. Nên mua thêm 任意保険 để bảo vệ toàn diện hơn.',
        documents: [
          'Thông tin xe: số khung (車体番号), dung tích (排気量), output nếu là xe điện/新基準原付, ナンバー',
        ],
        tip: 'Giấy 自賠責保険 phải mang theo khi đi xe và sticker phải dán đúng vị trí. MLIT nêu xe máy/原付, moped và điện kickboard đều thuộc nghĩa vụ 自賠責 nếu chạy trên đường công cộng.',
      },
      {
        step: 4,
        title: 'Chuyển tên khi mua xe cũ từ cá nhân',
        description: 'Khi mua 原付 cũ từ người khác:\n\n1. Người bán làm thủ tục 廃車 (hủy đăng ký) tại municipal office và nhận 廃車証明書.\n2. Bạn mang 廃車証明書 + 譲渡証明書 (giấy chuyển nhượng, người bán ký) đến municipal office nơi bạn ở để đăng ký tên mới.\n3. Nhận ナンバー mới của địa phương bạn.\n\nVới 軽二輪 (126–250cc) và xe >250cc: thủ tục qua 運輸支局 hoặc 自動車検査登録事務所, cần giấy tờ xe tương ứng và có thể phải đổi biển nếu khác khu vực. Cân nhắc nhờ đại lý xe hoặc 行政書士 làm hộ nếu lần đầu.',
        documents: [
          '廃車証明書 (do người bán cấp từ municipal office)',
          '譲渡証明書 (người bán ký)',
          '在留カード của bạn',
        ],
        tip: 'Không nên đi xe khi ナンバー vẫn còn tên người bán — nếu bị tai nạn hoặc vi phạm, đăng ký sai tên gây rất nhiều phức tạp pháp lý. Đổi tên ngay khi nhận xe.',
      },
    ],
  };

export default mopedMotorcycleRegistration;
