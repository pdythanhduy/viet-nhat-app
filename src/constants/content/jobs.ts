import type {
  ContentMetadata,
  EligibleWorkerType,
  IoniconName,
  WorkerRight,
} from '../../types/content';

export const JOBS_CONTENT_META: ContentMetadata = {
  lastUpdated: '2026-04-12',
  sources: [
    { label: 'MHLW', url: 'https://www.mhlw.go.jp/' },
    { label: 'Hello Work', url: 'https://www.hellowork.mhlw.go.jp/' },
    { label: 'Check-Roudou', url: 'https://www.check-roudou.mhlw.go.jp/' },
    { label: 'Japan Pension Service', url: 'https://www.nenkin.go.jp/' },
    {
      label: 'Foreign Workers Hotline',
      url: 'https://www.check-roudou.mhlw.go.jp/soudan/foreigner_eng.html',
    },
    { label: 'OTIT', url: 'https://www.otit.go.jp/' },
  ],
};

export interface JobPlatform {
  id: string;
  name: string;
  nameJp: string;
  url: string;
  description: string;
  targetUser: string;
  icon: IoniconName;
  color: string;
  tags: string[];
  eligibleFor: EligibleWorkerType[];
  visaNote: string;
  requiresPermission?: boolean;
  workHourLimit?: string;
}

export interface LaborUpdate {
  id: string;
  title: string;
  effectiveDate: string;
  summary: string;
  impact: string;
  icon: IoniconName;
  color: string;
  url: string;
}

export interface LaborRiskSign {
  title: string;
  description: string;
  severity: 'high' | 'medium';
}

export interface ContractChecklistItem {
  label: string;
  whyItMatters: string;
}

export interface LaborPhrase {
  jp: string;
  romaji: string;
  vn: string;
  useCase: string;
}

export interface LaborHelpScenario {
  id: string;
  title: string;
  urgency: 'high' | 'medium';
  description: string;
  doNow: string[];
  collectEvidence: string[];
  contact: string[];
}

export const WORKER_TYPE_GUIDES: {
  id: EligibleWorkerType;
  label: string;
  title: string;
  description: string;
  icon: IoniconName;
  color: string;
  warnings: string[];
}[] = [
  {
    id: 'student',
    label: 'Du học sinh',
    title: 'Du học sinh / 留学',
    description:
      'Mục đích chính là học. Muốn đi làm thêm cần có giấy phép làm thêm ngoài tư cách lưu trú và phải tự kiểm tổng số giờ làm.',
    icon: 'school',
    color: '#185FA5',
    warnings: [
      'Giới hạn thông thường là 28 giờ mỗi tuần trong kỳ học, tính gộp tất cả nơi làm.',
      'Không phải cứ từng chỗ dưới 28 giờ là hợp lệ; cộng dồn mới là phần quan trọng.',
      'Không làm các công việc thuộc nhóm bị cấm với du học sinh, kể cả khi lương cao hoặc chủ hứa lo giấy tờ.',
    ],
  },
  {
    id: 'dependent',
    label: 'Visa gia đình',
    title: 'Gia đình / 家族滞在',
    description:
      'Đây không phải tư cách đi làm chính. Muốn đi làm phải có permission phù hợp và vẫn thường bị giới hạn giờ nếu chỉ làm thêm.',
    icon: 'people',
    color: '#9B59B6',
    warnings: [
      'Nếu đang ở diện phụ thuộc, đừng nhận full-time trước khi hiểu rõ việc đó có hợp tư cách lưu trú hay không.',
      'Giới hạn giờ làm thêm thường vẫn là 28 giờ mỗi tuần nếu bạn đi theo cơ chế permission thông thường.',
    ],
  },
  {
    id: 'work-visa',
    label: 'Work visa',
    title: 'Visa đi làm',
    description:
      'Công việc thực tế phải phù hợp với tư cách lưu trú hiện tại. Đổi việc, đổi vị trí hoặc chuyển sang ngành khác có thể kéo theo nghĩa vụ thông báo.',
    icon: 'briefcase',
    color: '#D35400',
    warnings: [
      'Đổi công ty không đồng nghĩa mọi việc tự hợp lệ; phải kiểm tra phần nội dung công việc mới.',
      'Một số trường hợp phải báo cho ISA trong 14 ngày khi nghỉ việc hoặc chuyển việc.',
    ],
  },
  {
    id: 'ssw',
    label: '特定技能',
    title: 'Kỹ năng đặc định / 特定技能',
    description:
      'Chỉ được làm trong ngành và khung tiếp nhận của tư cách này. Các bước đổi chỗ làm, hỗ trợ sinh hoạt và giấy tờ thường chặt hơn lao động phổ thông.',
    icon: 'construct',
    color: '#16A085',
    warnings: [
      'Không tự ý chuyển việc nếu chưa hiểu quy trình tiếp nhận của 特定技能.',
      'Phải kiểm tra xem công ty mới, ngành mới và cơ quan hỗ trợ có đủ điều kiện không.',
    ],
  },
  {
    id: 'unrestricted',
    label: 'Không hạn chế',
    title: 'Vĩnh trú / định trú / vợ chồng người Nhật',
    description:
      'Nhóm này thường không bị khóa loại công việc như work visa, nhưng vẫn phải tuân thủ luật lao động, hợp đồng, thuế và bảo hiểm.',
    icon: 'checkmark-circle',
    color: '#27AE60',
    warnings: [
      'Không bị hạn chế loại việc không có nghĩa công ty được quyền trả lương sai hoặc khấu trừ mơ hồ.',
      'Vẫn tuyệt đối không cho mượn tài khoản ngân hàng, SIM, thẻ cư trú hoặc giấy tờ định danh.',
    ],
  },
  {
    id: 'unsure',
    label: 'Chưa chắc',
    title: 'Chưa rõ tư cách của mình',
    description:
      'Nếu bạn chưa chắc visa hiện tại cho phép làm gì, đừng nhận việc trước. Phải nhìn lại thẻ cư trú hoặc hỏi đúng cơ quan hỗ trợ.',
    icon: 'help-circle',
    color: '#5C6B8A',
    warnings: [
      'Không ký hợp đồng lao động trước khi hiểu mình có được phép làm công việc đó hay không.',
      'Khi không chắc, nên ưu tiên hỏi ISA, trường, công ty tiếp nhận hoặc nguồn chính thức thay vì nghe truyền miệng.',
    ],
  },
];

export const CURRENT_LABOR_UPDATES: LaborUpdate[] = [
  {
    id: 'minimum-wage-2025-fy',
    title: 'Mức lương tối thiểu đang áp dụng trong 2026',
    effectiveDate:
      'Đang dùng bộ mức tài khóa 2025, có hiệu lực từ khoảng tháng 10/2025 tùy địa phương',
    summary:
      'Mức bình quân toàn quốc là 1.121 yên/giờ; Tokyo hiện là 1.226 yên/giờ.',
    impact:
      'Nếu hợp đồng, bảng lương hoặc bài hướng dẫn vẫn ghi mức cũ thì cần kiểm tra lại theo tỉnh đang sống và đang làm việc.',
    icon: 'cash',
    color: '#27AE60',
    url: 'https://www.mhlw.go.jp/content/11200000/001571192.pdf',
  },
  {
    id: 'heatstroke-workplace',
    title: 'Nghĩa vụ chống say nắng tại nơi làm việc được siết chặt',
    effectiveDate: 'Áp dụng từ 01/06/2025 và vẫn là điểm nóng trong năm 2026',
    summary:
      'Doanh nghiệp phải chú ý hơn tới nhận diện nguy cơ, báo cáo và xử lý nhanh các ca nghi say nắng trong lao động.',
    impact:
      'Đặc biệt liên quan tới công trường, giao hàng, kho, nhà xưởng, nông nghiệp và môi trường nóng bức.',
    icon: 'sunny',
    color: '#E67E22',
    url: 'https://www.mhlw.go.jp/stf/newpage_47683.html',
  },
  {
    id: 'childcare-care-law',
    title: 'Luật nghỉ chăm con và chăm người thân đang áp dụng mạnh hơn',
    effectiveDate: 'Các đợt sửa đổi áp dụng từ 2025 và tiếp tục có hiệu lực trong 2026',
    summary:
      'Người lao động có thêm cơ chế hỗ trợ cân bằng việc làm với chăm con hoặc chăm người thân nếu đủ điều kiện luật định.',
    impact:
      'Nhiều lao động nước ngoài không biết mình cũng có thể có quyền lợi ở mảng này nếu hợp đồng và thời gian làm việc đáp ứng điều kiện.',
    icon: 'people',
    color: '#9B59B6',
    url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000130583.html',
  },
  {
    id: 'short-time-social-insurance',
    title: 'Mở rộng bảo hiểm xã hội cho lao động làm ngắn giờ',
    effectiveDate: 'Mở rộng lớn đã áp dụng từ 01/10/2024 và tiếp tục trong 2026',
    summary:
      'Ở doanh nghiệp từ 51 lao động trở lên, người làm từ 20 giờ/tuần có thể thuộc diện tham gia nếu đủ điều kiện.',
    impact:
      'Part-time không đồng nghĩa chắc chắn không phải vào 社会保険. Đây là điểm rất nhiều người Việt nhầm.',
    icon: 'shield-checkmark',
    color: '#185FA5',
    url: 'https://www.nenkin.go.jp/oshirase/topics/2021/0219.html?sc_vid=1774051200053909007457084953.8',
  },
];

export const JOB_PLATFORMS: {
  category: string;
  icon: IoniconName;
  color: string;
  platforms: JobPlatform[];
}[] = [
  {
    category: 'Nguồn chính thức và công',
    icon: 'business',
    color: '#185FA5',
    platforms: [
      {
        id: 'hellowork',
        name: 'Hello Work',
        nameJp: 'ハローワーク',
        url: 'https://www.hellowork.mhlw.go.jp/',
        description:
          'Hệ thống giới thiệu việc làm của nhà nước. Có cả full-time và part-time, phù hợp để kiểm tra tin tuyển dụng chính danh.',
        targetUser: 'Tất cả người tìm việc',
        icon: 'shield-checkmark',
        color: '#185FA5',
        tags: ['Chính thức', 'Miễn phí', 'Full-time', 'Part-time'],
        eligibleFor: ['student', 'dependent', 'work-visa', 'ssw', 'unrestricted', 'unsure'],
        visaNote:
          'Hello Work chỉ là nơi tìm việc. Bạn vẫn phải tự kiểm tra công việc có hợp tư cách lưu trú hay không.',
        requiresPermission: true,
        workHourLimit:
          'Nếu là du học sinh hoặc diện gia đình đi làm thêm, phải có permission phù hợp và tuân thủ giới hạn giờ.',
      },
      {
        id: 'check-roudou',
        name: 'Check-Roudou',
        nameJp: 'しっかり労働',
        url: 'https://www.check-roudou.mhlw.go.jp/',
        description:
          'Trang chính thức để tự kiểm tra lương, giờ làm, nghỉ phép, làm thêm giờ và các quyền lao động cơ bản.',
        targetUser: 'Người đã đi làm',
        icon: 'document-text',
        color: '#27AE60',
        tags: ['Luật lao động', 'Chính thức', 'Miễn phí'],
        eligibleFor: ['student', 'dependent', 'work-visa', 'ssw', 'unrestricted', 'unsure'],
        visaNote:
          'Không phải trang tuyển dụng, nhưng rất quan trọng để biết công ty đang làm đúng hay sai.',
      },
    ],
  },
  {
    category: 'Trang tìm việc phổ biến',
    icon: 'globe',
    color: '#27AE60',
    platforms: [
      {
        id: 'indeed',
        name: 'Indeed Japan',
        nameJp: 'Indeed',
        url: 'https://jp.indeed.com/',
        description:
          'Nền tảng tìm việc lớn, lọc được theo khu vực, lương, loại việc và điều kiện làm việc.',
        targetUser: 'Nhiều ngành nghề',
        icon: 'search',
        color: '#2164F3',
        tags: ['Full-time', 'Part-time', 'Nhiều ngành'],
        eligibleFor: ['student', 'dependent', 'work-visa', 'ssw', 'unrestricted', 'unsure'],
        visaNote:
          'Đây là công cụ tìm kiếm. Hợp hay không hợp visa vẫn phải đọc ở từng tin tuyển dụng và nội dung công việc thực tế.',
        requiresPermission: true,
        workHourLimit:
          'Nếu bạn đi làm thêm theo visa hạn chế giờ, phải tự kiểm tổng số giờ của tất cả nơi làm.',
      },
      {
        id: 'jobsinjapan',
        name: 'Jobs in Japan',
        nameJp: 'Jobs in Japan',
        url: 'https://jobsinjapan.com/',
        description:
          'Khá phổ biến với người nước ngoài, giao diện tiếng Anh, nhiều tin tuyển dụng có nhắc tới hỗ trợ visa.',
        targetUser: 'Người nước ngoài',
        icon: 'briefcase',
        color: '#E74C3C',
        tags: ['Người nước ngoài', 'Full-time', 'Tiếng Anh'],
        eligibleFor: ['work-visa', 'unrestricted', 'unsure'],
        visaNote:
          'Phù hợp hơn với người tìm full-time hoặc việc có hỗ trợ chuyển visa. Du học sinh và visa gia đình phải kiểm kỹ.',
      },
      {
        id: 'gaijinpot',
        name: 'GaijinPot Jobs',
        nameJp: 'GaijinPot Jobs',
        url: 'https://jobs.gaijinpot.com/',
        description:
          'Nhiều tin cho người nước ngoài ở mảng IT, giáo dục, dịch vụ và việc cần tiếng Anh.',
        targetUser: 'Người nước ngoài có kỹ năng hoặc tiếng Anh',
        icon: 'people',
        color: '#9B59B6',
        tags: ['IT', 'Giáo dục', 'Full-time'],
        eligibleFor: ['work-visa', 'unrestricted', 'unsure'],
        visaNote:
          'Nhiều vị trí là full-time. Cần kiểm tra xem công việc mới có khớp với tư cách lưu trú hiện tại hay không.',
      },
    ],
  },
  {
    category: 'Làm thêm và baito',
    icon: 'time',
    color: '#F39C12',
    platforms: [
      {
        id: 'baitoru',
        name: 'Baitoru',
        nameJp: 'バイトル',
        url: 'https://www.baitoru.com/',
        description:
          'Trang tìm baito phổ biến cho nhà hàng, kho, bán hàng, convenience store và việc theo ca.',
        targetUser: 'Người tìm part-time',
        icon: 'timer',
        color: '#F39C12',
        tags: ['Part-time', 'Baito', 'Theo ca'],
        eligibleFor: ['student', 'dependent', 'unrestricted', 'unsure'],
        visaNote:
          'Rất hay dùng cho việc làm thêm, nhưng không phải tin nào cũng hợp với du học sinh hoặc diện gia đình.',
        requiresPermission: true,
        workHourLimit:
          'Nếu bạn thuộc nhóm phải xin phép làm thêm, đừng quên kiểm tổng giờ cả tuần và cả các nơi làm khác.',
      },
      {
        id: 'townwork',
        name: 'Townwork',
        nameJp: 'タウンワーク',
        url: 'https://townwork.net/',
        description:
          'Nhiều tin part-time theo khu vực, phù hợp khi muốn tìm việc gần ga hoặc gần nơi ở.',
        targetUser: 'Người tìm việc gần nhà',
        icon: 'map',
        color: '#16A085',
        tags: ['Part-time', 'Theo khu vực', 'Baito'],
        eligibleFor: ['student', 'dependent', 'unrestricted', 'unsure'],
        visaNote:
          'Đọc kỹ phần công việc thực tế, ca làm và yêu cầu tiếng Nhật; không nên chỉ nhìn tiêu đề ngắn.',
        requiresPermission: true,
        workHourLimit:
          'Part-time hợp visa vẫn phải nằm trong phạm vi giờ làm được phép nếu bạn đang ở diện hạn chế giờ.',
      },
    ],
  },
];

export const WORKER_RIGHTS: WorkerRight[] = [
  {
    title: 'Phải được thông báo điều kiện lao động rõ ràng',
    description:
      'Lương, giờ làm, nơi làm, loại hợp đồng và các khoản khấu trừ phải được thông báo bằng hình thức phù hợp, không nên chỉ hứa miệng.',
    icon: 'document-text-outline',
  },
  {
    title: 'Làm thêm, làm đêm, làm ngày nghỉ có cách tính khác nhau',
    description:
      'OT không phải cứ cộng chung một kiểu. Làm quá giờ, làm đêm và làm ngày nghỉ có phụ cấp khác nhau theo luật.',
    icon: 'time-outline',
  },
  {
    title: 'Có nghỉ phép năm có lương nếu đủ điều kiện',
    description:
      'Sau thời gian làm việc liên tục theo luật, người lao động có thể có quyền nghỉ phép năm có lương.',
    icon: 'calendar-outline',
  },
  {
    title: 'Tai nạn đi làm hoặc trên đường đi về có thể được bảo vệ',
    description:
      '労災 không chỉ là tai nạn ngay trong chỗ làm; tai nạn trên đường đi làm về đúng điều kiện cũng có thể được xem xét.',
    icon: 'medical-outline',
  },
  {
    title: 'Không ai được giữ hộ chiếu hay thẻ cư trú của bạn',
    description:
      'Công ty hoặc môi giới không được giữ giấy tờ định danh gốc, sổ ngân hàng hoặc ép giao nộp để khống chế.',
    icon: 'lock-closed-outline',
  },
  {
    title: 'Part-time vẫn có thể phải vào bảo hiểm xã hội',
    description:
      'Đừng tự cho rằng đi làm bán thời gian thì chắc chắn không phải vào 社会保険. Điều này phụ thuộc giờ làm và loại doanh nghiệp.',
    icon: 'shield-checkmark-outline',
  },
];

export const LABOR_RISK_SIGNS: LaborRiskSign[] = [
  {
    title: 'Không đưa hợp đồng hoặc giấy điều kiện lao động rõ ràng',
    description:
      'Nếu công ty chỉ bảo “vào làm trước rồi tính”, đây là dấu hiệu rủi ro rất lớn khi xảy ra tranh chấp lương hoặc giờ làm.',
    severity: 'high',
  },
  {
    title: 'Đòi giữ hộ chiếu, thẻ cư trú, sổ ngân hàng hoặc ATM',
    description:
      'Đây là dấu hiệu bất thường nghiêm trọng. Không giao giấy tờ gốc cho công ty hoặc môi giới giữ hộ.',
    severity: 'high',
  },
  {
    title: 'Mô tả công việc mơ hồ hoặc khác hẳn lúc phỏng vấn',
    description:
      'Nếu nội dung việc thực tế không khớp với thứ đã hứa, bạn có thể bị đẩy vào công việc vượt visa hoặc vượt sức.',
    severity: 'medium',
  },
  {
    title: 'Khấu trừ nhiều khoản nhưng không giải thích',
    description:
      'Tiền nhà, đồng phục, đào tạo, môi giới, phạt nghỉ việc... nếu ghi mơ hồ thì cần hỏi lại ngay bằng văn bản.',
    severity: 'medium',
  },
  {
    title: 'Bảo ký nhanh, không cho thời gian đọc',
    description:
      'Nếu bạn không được mang hợp đồng về đọc hoặc hỏi người hỗ trợ trước khi ký, đây là dấu hiệu cần cảnh giác.',
    severity: 'medium',
  },
];

export const CONTRACT_REVIEW_CHECKLIST: ContractChecklistItem[] = [
  {
    label: 'Lương cơ bản và cách tính lương thực nhận',
    whyItMatters:
      'Phải biết lương gốc là bao nhiêu, có bao gồm phụ cấp cố định hay không, và phần nào chỉ là ví dụ chứ không phải cam kết.',
  },
  {
    label: 'Giờ làm, ngày nghỉ và cách tính OT',
    whyItMatters:
      'Cần biết ca chuẩn, nghỉ giữa giờ, ngày nghỉ cố định và khi nào bắt đầu tính làm thêm.',
  },
  {
    label: 'Nơi làm việc và khả năng bị điều chuyển',
    whyItMatters:
      'Nhiều người chỉ nhìn tên công ty mà bỏ qua việc địa điểm làm có thể ở xa hoặc bị điều chuyển nhiều nơi.',
  },
  {
    label: 'Loại hợp đồng và thời hạn hợp đồng',
    whyItMatters:
      'Hợp đồng xác định thời hạn, thử việc, gia hạn và điều kiện chấm dứt phải được hiểu rõ từ đầu.',
  },
  {
    label: 'Khấu trừ và chi phí người lao động phải chịu',
    whyItMatters:
      'Nếu có tiền nhà, bảo hiểm, đồng phục, bữa ăn hoặc khoản khác bị trừ, cần nhìn rõ số tiền hoặc cách tính.',
  },
  {
    label: 'Bảo hiểm, thuế và giấy tờ sau khi vào làm',
    whyItMatters:
      'Bạn cần biết có được tham gia bảo hiểm phù hợp không, lương có trả bằng chuyển khoản không và khi nào nhận phiếu lương.',
  },
];

export const LABOR_SUPPORT_PHRASES: LaborPhrase[] = [
  {
    jp: 'この契約書を持ち帰って確認してもいいですか。',
    romaji: 'Kono keiyakusho o mochikaette kakunin shite mo ii desu ka.',
    vn: 'Tôi có thể mang hợp đồng này về để kiểm tra trước được không?',
    useCase: 'Dùng khi chưa muốn ký ngay tại chỗ.',
  },
  {
    jp: '残業代の計算方法を教えてください。',
    romaji: 'Zangyoudai no keisan houhou o oshiete kudasai.',
    vn: 'Xin hãy cho tôi biết cách tính tiền làm thêm giờ.',
    useCase: 'Dùng khi cần hỏi rõ OT và phụ cấp.',
  },
  {
    jp: 'この仕事は私の在留資格で働けますか。',
    romaji: 'Kono shigoto wa watashi no zairyuu shikaku de hatarakemasu ka.',
    vn: 'Công việc này có phù hợp với tư cách lưu trú hiện tại của tôi không?',
    useCase: 'Dùng trước khi nhận việc mới hoặc nhận thêm việc.',
  },
  {
    jp: '控えをもらえますか。',
    romaji: 'Hikae o moraemasu ka.',
    vn: 'Tôi có thể nhận một bản sao được không?',
    useCase: 'Dùng khi ký giấy, nộp giấy hoặc cần giữ bằng chứng.',
  },
  {
    jp: '給与明細のこの控除について説明してください。',
    romaji: 'Kyuuryou meisai no kono koujo ni tsuite setsumei shite kudasai.',
    vn: 'Xin hãy giải thích khoản khấu trừ này trên phiếu lương.',
    useCase: 'Dùng khi bảng lương có khoản trừ khó hiểu.',
  },
  {
    jp: '今日は返事をせず、確認してから連絡したいです。',
    romaji: 'Kyou wa henji o sezu, kakunin shite kara renraku shitai desu.',
    vn: 'Hôm nay tôi chưa trả lời ngay, tôi muốn kiểm tra rồi sẽ liên lạc lại.',
    useCase: 'Dùng để trì hoãn ký hoặc nhận việc khi bạn chưa chắc.',
  },
];

export const LABOR_HELP_SCENARIOS: LaborHelpScenario[] = [
  {
    id: 'unpaid-wages',
    title: 'Bị nợ lương hoặc trả thiếu lương',
    urgency: 'high',
    description:
      'Nếu lương đến chậm, bị cắt khó hiểu hoặc công ty né tránh giải thích, phải giữ bằng chứng ngay trước khi tranh chấp kéo dài.',
    doNow: [
      'Chụp và lưu phiếu lương, tin nhắn, email, bảng chấm công và lịch làm việc.',
      'Yêu cầu công ty giải thích bằng văn bản khoản còn thiếu hoặc ngày trả dự kiến.',
      'Không chỉ gọi điện miệng; phải để lại dấu vết bằng tin nhắn hoặc email.',
    ],
    collectEvidence: [
      'Phiếu lương hoặc lịch sử chuyển khoản',
      'Ảnh lịch làm, ảnh bảng chấm công, ca làm',
      'Tin nhắn hoặc email trao đổi với quản lý',
      'Hợp đồng lao động hoặc giấy điều kiện lao động',
    ],
    contact: [
      'Check-Roudou hoặc Labour Standards Office địa phương',
      'Hotline tư vấn lao động cho người nước ngoài',
      'OTIT nếu bạn thuộc chương trình có liên quan',
    ],
  },
  {
    id: 'forced-overtime',
    title: 'Bị ép làm quá giờ hoặc OT không trả đúng',
    urgency: 'high',
    description:
      'Đây là nhóm tranh chấp rất phổ biến. Điều quan trọng nhất là giữ lại bằng chứng thời gian làm thực tế.',
    doNow: [
      'Giữ ảnh chấm công, lịch ca, tin nhắn gọi đi làm sớm hoặc bắt ở lại muộn.',
      'So sánh giờ làm thực tế với giờ ghi trên bảng lương.',
      'Hỏi rõ cách tính OT, làm đêm và làm ngày nghỉ bằng văn bản.',
    ],
    collectEvidence: [
      'Bảng chấm công hoặc ảnh máy chấm công',
      'Lịch ca, tin nhắn giao ca, tin nhắn yêu cầu làm thêm',
      'Phiếu lương có mục OT hoặc khoản phụ cấp',
      'Ảnh ra vào nơi làm nếu có',
    ],
    contact: [
      'Check-Roudou của MHLW',
      'Labour Standards Inspection Office',
      'Tư vấn lao động cho người nước ngoài bằng tiếng phù hợp',
    ],
  },
  {
    id: 'documents-held',
    title: 'Bị giữ hộ chiếu, thẻ cư trú, ATM hoặc sổ ngân hàng',
    urgency: 'high',
    description:
      'Giữ giấy tờ gốc để khống chế người lao động là dấu hiệu rất nguy hiểm. Cần lấy lại càng sớm càng tốt và tránh đối đầu thiếu bằng chứng.',
    doNow: [
      'Ghi lại ai đang giữ, giữ từ khi nào, vì lý do gì và có bằng chứng trao đổi gì không.',
      'Yêu cầu trả lại giấy tờ gốc bằng tin nhắn hoặc email.',
      'Nếu thấy nguy cơ bị giữ tiếp hoặc đe dọa, liên hệ nơi tư vấn càng sớm càng tốt.',
    ],
    collectEvidence: [
      'Tin nhắn hoặc email thể hiện công ty đang giữ giấy tờ',
      'Ảnh chụp giấy tờ nếu còn có bản sao',
      'Tên người quản lý, tên công ty, địa chỉ nơi làm việc',
      'Bất kỳ văn bản nào ép giao giấy tờ',
    ],
    contact: [
      'Tư vấn lao động cho người nước ngoài',
      'OTIT nếu thuộc chương trình liên quan',
      'Cơ quan hỗ trợ cư trú hoặc pháp lý địa phương nếu có yếu tố ép buộc nghiêm trọng',
    ],
  },
  {
    id: 'resignation-blocked',
    title: 'Muốn nghỉ việc nhưng bị dọa phạt hoặc cản trở',
    urgency: 'medium',
    description:
      'Nhiều người bị dọa “nghỉ sẽ bị phạt”, “nghỉ thì visa tự hỏng ngay” hoặc “phải tìm người thay”. Cần tách luật lao động khỏi lời dọa miệng.',
    doNow: [
      'Đọc lại điều khoản báo trước trong hợp đồng.',
      'Nộp thông báo nghỉ việc bằng hình thức có thể chứng minh được.',
      'Giữ lại toàn bộ tin nhắn, email hoặc ghi chú về lời đe dọa, khoản phạt hoặc cản trở.',
    ],
    collectEvidence: [
      'Hợp đồng lao động hoặc điều khoản nghỉ việc',
      'Thông báo nghỉ việc đã gửi',
      'Tin nhắn, email hoặc ghi chú về việc công ty cản trở',
      'Bảng lương và giấy tờ liên quan nếu công ty đe dọa giữ lương',
    ],
    contact: [
      'Check-Roudou',
      'Hello Work hoặc nơi tư vấn việc làm nếu cần chuyển việc',
      'ISA nếu việc nghỉ việc kéo theo nghĩa vụ thông báo về tư cách lưu trú',
    ],
  },
];
