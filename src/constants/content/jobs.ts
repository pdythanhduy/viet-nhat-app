import type {
  ContentMetadata,
  EligibleWorkerType,
  IoniconName,
  WorkerRight,
} from '../../types/content';

export const JOBS_CONTENT_META: ContentMetadata = {
  lastUpdated: '2026-04-11',
  sources: [
    { label: '厚生労働省', url: 'https://www.mhlw.go.jp/' },
    { label: 'ハローワーク', url: 'https://www.hellowork.mhlw.go.jp/' },
    { label: '確かめよう労働条件', url: 'https://www.check-roudou.mhlw.go.jp/' },
    { label: '日本年金機構', url: 'https://www.nenkin.go.jp/' },
    { label: '外国人労働者向け相談', url: 'https://www.check-roudou.mhlw.go.jp/soudan/foreigner_eng.html' },
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
      'Mục đích chính là học. Làm thêm cần 資格外活動許可 và tổng giờ làm thường bị giới hạn 28 giờ/tuần.',
    icon: 'school',
    color: '#185FA5',
    warnings: [
      'Tổng giờ của tất cả nơi làm cộng lại, không phải mỗi nơi 28 giờ.',
      'Kỳ nghỉ dài có thể có quy định khác, nhưng vẫn phải nằm trong phạm vi được phép.',
      'Không làm trong ngành hoặc cơ sở bị cấm như một số công việc liên quan 風俗営業.',
    ],
  },
  {
    id: 'dependent',
    label: 'Visa gia đình',
    title: 'Gia đình / 家族滞在',
    description:
      'Không phải tư cách đi làm. Muốn làm thêm cần 資格外活動許可; thường không phù hợp nhận full-time nếu chưa đổi tư cách lưu trú.',
    icon: 'people',
    color: '#9B59B6',
    warnings: [
      'Thường giới hạn 28 giờ/tuần nếu được cấp permission dạng bao quát.',
      'Tư cách phụ thuộc người bảo lãnh; thay đổi tình trạng gia đình có thể ảnh hưởng visa.',
    ],
  },
  {
    id: 'work-visa',
    label: 'Work visa',
    title: 'Visa đi làm',
    description:
      'Công việc phải phù hợp với tư cách lưu trú, ví dụ 技術・人文知識・国際業務 không phù hợp lao động phổ thông đơn thuần.',
    icon: 'briefcase',
    color: '#D35400',
    warnings: [
      'Đổi công ty hoặc nghỉ việc có thể phải khai báo với ISA trong vòng 14 ngày.',
      'Nếu nội dung việc mới khác tư cách hiện tại, cần kiểm tra trước khi ký hợp đồng.',
    ],
  },
  {
    id: 'ssw',
    label: '特定技能',
    title: 'Kỹ năng đặc định / 特定技能',
    description:
      'Chỉ làm trong ngành hoặc lĩnh vực được chỉ định và theo điều kiện tiếp nhận, hỗ trợ, chuyển việc của tư cách này.',
    icon: 'construct',
    color: '#16A085',
    warnings: [
      'Ngành nghề, công ty tiếp nhận và cơ quan hỗ trợ phải phù hợp với tư cách lưu trú.',
      'Không tự ý chuyển việc nếu chưa hiểu rõ thủ tục và điều kiện của 特定技能.',
    ],
  },
  {
    id: 'unrestricted',
    label: 'Không hạn chế',
    title: 'Vĩnh trú / định trú / vợ chồng người Nhật',
    description:
      'Thường không bị hạn chế hoạt động lao động như work visa, nhưng vẫn phải tuân thủ luật lao động, thuế, bảo hiểm và hợp đồng.',
    icon: 'checkmark-circle',
    color: '#27AE60',
    warnings: [
      'Vẫn cần kiểm tra hợp đồng, bảo hiểm, lương tối thiểu và khấu trừ.',
      'Không cho mượn tài khoản ngân hàng, SIM hoặc giấy tờ định danh.',
    ],
  },
  {
    id: 'unsure',
    label: 'Chưa chắc',
    title: 'Chưa chắc tư cách của mình',
    description:
      'Hãy xem mục 在留資格 trên thẻ cư trú trước khi ứng tuyển. Nếu không chắc, hỏi ISA, Hello Work, trường hoặc cơ quan hỗ trợ.',
    icon: 'help-circle',
    color: '#5C6B8A',
    warnings: [
      'Không nhận việc trước khi biết visa của mình có cho phép hay không.',
      'Việc nhờ đứng tên hộ, nhận hoặc chuyển tiền hộ, đứng tên SIM hoặc tài khoản là rủi ro cao.',
    ],
  },
];

export const CURRENT_LABOR_UPDATES: LaborUpdate[] = [
  {
    id: 'minimum-wage-2025-fy',
    title: 'Lương tối thiểu hiện hành 2026 đã lên mức mới',
    effectiveDate:
      'Áp dụng theo mức tối thiểu tài khóa 2025, có hiệu lực từ tháng 10/2025 đến 31/03/2026 tùy địa phương',
    summary: 'Bình quân gia quyền toàn quốc là 1,121 yên/giờ. Tokyo hiện là 1,226 yên/giờ.',
    impact:
      'Nội dung cũ ghi 1,163 yên cho Tokyo đã lỗi thời. Người dùng cần kiểm tra mức tối thiểu đúng theo tỉnh đang sống.',
    icon: 'cash',
    color: '#27AE60',
    url: 'https://www.mhlw.go.jp/content/11200000/001571192.pdf',
  },
  {
    id: 'heatstroke-workplace',
    title: 'Tăng nghĩa vụ chống say nắng tại nơi làm việc',
    effectiveDate: 'Từ 01/06/2025, vẫn đang có hiệu lực trong năm 2026',
    summary:
      'Quy định an toàn lao động đã được siết lại với biện pháp nhận biết, báo cáo và xử lý nhanh các ca nghi ngờ say nắng trong công việc.',
    impact:
      'Đặc biệt quan trọng với công trường, kho, giao hàng, nhà xưởng, nông nghiệp và bếp nóng.',
    icon: 'sunny',
    color: '#E67E22',
    url: 'https://www.mhlw.go.jp/stf/newpage_47683.html',
  },
  {
    id: 'childcare-care-law',
    title: 'Luật nghỉ chăm con và chăm người thân đang áp dụng mạnh hơn',
    effectiveDate: 'Các đợt chính từ 01/04/2025 và 01/10/2025, áp dụng xuyên suốt năm 2026',
    summary:
      'Người lao động có thêm cơ chế hỗ trợ cân bằng việc làm với chăm con hoặc chăm sóc người thân; doanh nghiệp có nghĩa vụ thông tin và bố trí linh hoạt hơn trong một số trường hợp.',
    impact:
      'Nhiều lao động nước ngoài không biết mình cũng có thể có quyền theo luật này nếu đủ điều kiện.',
    icon: 'people',
    color: '#9B59B6',
    url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000130583.html',
  },
  {
    id: 'short-time-social-insurance',
    title: 'Bảo hiểm xã hội cho lao động part-time đã mở rộng hơn',
    effectiveDate: 'Mở rộng lớn từ 01/10/2024, tiếp tục áp dụng trong năm 2026',
    summary:
      'Tại doanh nghiệp từ 51 lao động thường xuyên trở lên, người làm từ 20 giờ/tuần trở lên có thể thuộc diện tham gia bảo hiểm xã hội nếu đáp ứng điều kiện luật định.',
    impact:
      'Tab Việc làm không nên chỉ nói về thất nghiệp và tai nạn lao động; còn cần nhắc đến 社会保険 và 厚生年金.',
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
    category: 'Chính phủ và công',
    icon: 'business',
    color: '#185FA5',
    platforms: [
      {
        id: 'hellowork',
        name: 'Hello Work',
        nameJp: 'ハローワーク',
        url: 'https://www.hellowork.mhlw.go.jp/',
        description:
          'Trung tâm giới thiệu việc làm của Bộ Y tế, Lao động và Phúc lợi Nhật Bản. Miễn phí, có cả full-time và part-time.',
        targetUser: 'Tất cả người tìm việc',
        icon: 'shield-checkmark',
        color: '#185FA5',
        tags: ['Miễn phí', 'Chính phủ', 'Full-time', 'Part-time'],
        eligibleFor: ['student', 'dependent', 'work-visa', 'ssw', 'unrestricted', 'unsure'],
        visaNote:
          'Hello Work là nguồn công khai và chính phủ, nhưng bạn vẫn phải kiểm tra từng việc có phù hợp tư cách lưu trú không.',
        requiresPermission: true,
        workHourLimit:
          'Du học sinh và visa gia đình chỉ được làm thêm nếu có 資格外活動許可 và tuân thủ giới hạn giờ.',
      },
      {
        id: 'check-roudou',
        name: 'Check-Roudou',
        nameJp: '確かめよう労働条件',
        url: 'https://www.check-roudou.mhlw.go.jp/',
        description:
          'Trang chính thức để tự kiểm tra lương, giờ làm, nghỉ phép, làm thêm giờ, hợp đồng và các câu hỏi thường gặp về luật lao động.',
        targetUser: 'Người đã đi làm',
        icon: 'document-text',
        color: '#27AE60',
        tags: ['Luật lao động', 'Chính thức', 'Miễn phí'],
        eligibleFor: ['student', 'dependent', 'work-visa', 'ssw', 'unrestricted', 'unsure'],
        visaNote:
          'Không phải nền tảng tuyển dụng, nhưng rất quan trọng để kiểm tra xem công ty đang làm có vi phạm điều kiện lao động hay không.',
      },
    ],
  },
  {
    category: 'Tổng hợp',
    icon: 'globe',
    color: '#27AE60',
    platforms: [
      {
        id: 'indeed',
        name: 'Indeed Japan',
        nameJp: 'Indeed',
        url: 'https://jp.indeed.com/',
        description:
          'Nền tảng tìm việc lớn, có nhiều tin tuyển dụng ở Nhật. Có thể lọc theo khu vực, mức lương, loại việc và điều kiện làm việc.',
        targetUser: 'Nhiều ngành nghề',
        icon: 'search',
        color: '#2164F3',
        tags: ['Full-time', 'Part-time', 'Nhiều ngành'],
        eligibleFor: ['student', 'dependent', 'work-visa', 'ssw', 'unrestricted', 'unsure'],
        visaNote:
          'Indeed chỉ là nền tảng tìm kiếm. Điều kiện visa phụ thuộc từng tin tuyển dụng và nội dung công việc.',
        requiresPermission: true,
        workHourLimit:
          'Nếu là 留学 hoặc 家族滞在, hãy lọc part-time và kiểm tra giới hạn 28 giờ mỗi tuần.',
      },
      {
        id: 'jobsinjapan',
        name: 'Jobs in Japan',
        nameJp: 'Jobs in Japan',
        url: 'https://jobsinjapan.com/',
        description:
          'Nền tảng khá phổ biến với người nước ngoài. Giao diện tiếng Anh, nhiều tin tuyển dụng có nhắc đến hỗ trợ visa.',
        targetUser: 'Người nước ngoài',
        icon: 'briefcase',
        color: '#E74C3C',
        tags: ['Người nước ngoài', 'Hỗ trợ visa', 'Full-time'],
        eligibleFor: ['work-visa', 'unrestricted', 'unsure'],
        visaNote:
          'Phù hợp hơn với người tìm full-time hoặc work visa. Du học sinh và visa gia đình cần kiểm tra rất kỹ nếu chỉ được làm thêm.',
      },
      {
        id: 'gaijinpot',
        name: 'GaijinPot Jobs',
        nameJp: 'GaijinPot Jobs',
        url: 'https://jobs.gaijinpot.com/',
        description:
          'Nền tảng việc làm cho người nước ngoài tại Nhật, thường có IT, giáo dục, dịch vụ và vị trí cần tiếng Anh.',
        targetUser: 'Người nước ngoài',
        icon: 'people',
        color: '#9B59B6',
        tags: ['Người nước ngoài', 'Full-time', 'IT', 'Giáo dục'],
        eligibleFor: ['work-visa', 'unrestricted', 'unsure'],
        visaNote:
          'Nhiều vị trí full-time yêu cầu tư cách đi làm phù hợp hoặc cần làm thủ tục chuyển visa sau offer.',
      },
    ],
  },
  {
    category: 'Làm thêm giờ',
    icon: 'time',
    color: '#F39C12',
    platforms: [
      {
        id: 'townwork',
        name: 'Townwork',
        nameJp: 'タウンワーク',
        url: 'https://townwork.net/',
        description:
          'Nền tảng part-time phổ biến, có nhiều tin tuyển ở nhà hàng, cửa hàng tiện lợi, kho bãi, bán lẻ và giao hàng.',
        targetUser: 'Part-time',
        icon: 'time',
        color: '#E67E22',
        tags: ['Part-time', 'Nhà hàng', 'Bán lẻ', 'Kho bãi'],
        eligibleFor: ['student', 'dependent', 'unrestricted'],
        visaNote:
          'Du học sinh và visa gia đình cần 資格外活動許可 và phải tự theo dõi tổng giờ làm thêm.',
        requiresPermission: true,
        workHourLimit: 'Du học sinh hoặc visa gia đình: thường tối đa 28 giờ mỗi tuần nếu có permission.',
      },
      {
        id: 'baitoru',
        name: 'Baitoru',
        nameJp: 'バイトル',
        url: 'https://www.baitoru.com/',
        description:
          'Ứng dụng và website tìm việc làm thêm, có nhiều ca linh hoạt ở cửa hàng tiện lợi, siêu thị và giao hàng.',
        targetUser: 'Part-time',
        icon: 'phone-portrait',
        color: '#E74C3C',
        tags: ['Part-time', 'App mobile', 'Ca linh hoạt'],
        eligibleFor: ['student', 'dependent', 'unrestricted'],
        visaNote:
          'Việc giao hàng hoặc làm nhiều ca ở nhiều nơi vẫn phải tính vào tổng giờ làm thêm và cần permission nếu là 留学 hoặc 家族滞在.',
        requiresPermission: true,
        workHourLimit: 'Tính tổng giờ của tất cả nơi làm, không tách từng công ty.',
      },
    ],
  },
  {
    category: 'IT và chuyên môn',
    icon: 'code-slash',
    color: '#8E44AD',
    platforms: [
      {
        id: 'daijob',
        name: 'Daijob',
        nameJp: 'Daijob',
        url: 'https://www.daijob.com/',
        description:
          'Tập trung vào việc làm cho người nước ngoài trong IT, kỹ thuật, tài chính và môi trường quốc tế.',
        targetUser: 'IT, kỹ thuật, tài chính',
        icon: 'code-slash',
        color: '#8E44AD',
        tags: ['IT', 'Kỹ thuật', 'Tiếng Anh'],
        eligibleFor: ['work-visa', 'unrestricted'],
        visaNote:
          'Thường phù hợp với 技術・人文知識・国際業務 hoặc tư cách không hạn chế hoạt động.',
      },
      {
        id: 'careercross',
        name: 'CareerCross',
        nameJp: 'CareerCross',
        url: 'https://www.careercross.com/',
        description:
          'Phù hợp với người có tiếng Anh và chuyên môn, nhất là IT, quản lý và vị trí ở công ty quốc tế.',
        targetUser: 'Chuyên gia, IT',
        icon: 'trending-up',
        color: '#2980B9',
        tags: ['IT', 'Senior', 'Tiếng Anh'],
        eligibleFor: ['work-visa', 'unrestricted'],
        visaNote:
          'Phù hợp hơn với chuyên gia và work visa; cần kiểm tra khả năng bảo lãnh hoặc chuyển visa.',
      },
    ],
  },
  {
    category: 'Tư vấn và khiếu nại',
    icon: 'call',
    color: '#C0392B',
    platforms: [
      {
        id: 'foreign-worker-hotline',
        name: 'Tư vấn lao động cho người nước ngoài',
        nameJp: '外国人労働者向け相談ダイヤル',
        url: 'https://www.check-roudou.mhlw.go.jp/soudan/foreigner_eng.html',
        description:
          'Kênh tư vấn chính thức của MHLW dành cho người lao động nước ngoài. Có hỗ trợ nhiều ngôn ngữ, trong đó có tiếng Việt.',
        targetUser: 'Người đang gặp vấn đề lao động',
        icon: 'call',
        color: '#C0392B',
        tags: ['Tư vấn', 'Chính thức', 'Đa ngôn ngữ'],
        eligibleFor: ['student', 'dependent', 'work-visa', 'ssw', 'unrestricted', 'unsure'],
        visaNote:
          'Phù hợp khi bị nợ lương, ép làm quá giờ, bị giữ giấy tờ, bị đối xử bất công hoặc không hiểu hợp đồng lao động.',
      },
      {
        id: 'otit',
        name: 'OTIT',
        nameJp: '外国人技能実習機構',
        url: 'https://www.otit.go.jp/',
        description:
          'Tổ chức hỗ trợ và tiếp nhận khiếu nại cho thực tập sinh kỹ năng. Có tư vấn miễn phí và hướng dẫn cách bảo vệ quyền lợi.',
        targetUser: 'Thực tập sinh kỹ năng',
        icon: 'shield-checkmark',
        color: '#E67E22',
        tags: ['Thực tập sinh', 'Khiếu nại', 'Miễn phí'],
        eligibleFor: ['ssw', 'unsure'],
        visaNote:
          'Dành cho tư vấn và khiếu nại liên quan thực tập sinh; nếu bị ép ký, giữ giấy tờ hoặc bóc lột, hãy liên hệ sớm.',
      },
    ],
  },
];

export const WORKER_RIGHTS: WorkerRight[] = [
  {
    title: 'Lương tối thiểu hiện hành',
    description:
      'Mỗi tỉnh có mức lương tối thiểu riêng. Mức đang áp dụng trong năm 2026 là bộ mức của tài khóa 2025; ví dụ Tokyo là 1,226 yên mỗi giờ. Người nước ngoài cũng phải được trả ít nhất bằng mức tối thiểu của địa phương làm việc.',
    icon: 'cash',
  },
  {
    title: 'Tiền làm thêm giờ phải tính đúng',
    description:
      'Làm ngoài 8 giờ mỗi ngày hoặc 40 giờ mỗi tuần thường phải cộng ít nhất 25%. Làm ngày nghỉ pháp định thường cộng 35%. Làm ban đêm 22:00-05:00 cộng ít nhất 25%. Nếu làm thêm vào ban đêm, các khoản cộng có thể chồng lên nhau.',
    icon: 'time',
  },
  {
    title: 'Hợp đồng lao động phải được thông báo rõ',
    description:
      'Lương, giờ làm, nơi làm, loại hợp đồng, thời hạn, ngày nghỉ và điều kiện nghỉ việc phải được thông báo bằng văn bản hoặc phương thức được luật chấp nhận. Với lao động nước ngoài, nên yêu cầu bản dễ hiểu hoặc bản ngôn ngữ mình hiểu.',
    icon: 'document-text',
  },
  {
    title: 'Sa thải phải báo trước 30 ngày',
    description:
      'Nếu công ty đơn phương cho nghỉ việc, nguyên tắc là phải báo trước ít nhất 30 ngày hoặc trả tiền thay cho thời gian báo trước, trừ một số trường hợp pháp luật cho phép ngoại lệ.',
    icon: 'alert-circle',
  },
  {
    title: 'Nghỉ phép năm có lương',
    description:
      'Sau 6 tháng làm liên tục và tỷ lệ đi làm đạt từ 80% trở lên, người lao động thường được nghỉ phép có lương. Số ngày tăng dần theo thời gian làm việc và áp dụng cả với nhiều lao động part-time nếu đủ điều kiện.',
    icon: 'calendar',
  },
  {
    title: 'Tai nạn lao động và tai nạn trên đường đi làm',
    description:
      'Nếu bị tai nạn trong lúc làm việc hoặc trên đường đi làm hoặc về nhà, có thể thuộc diện 労災保険. Đây không phải là chuyện tự chịu hay bắt buộc dùng bảo hiểm y tế thông thường trước.',
    icon: 'medical',
  },
  {
    title: 'Part-time cũng có thể phải vào bảo hiểm xã hội',
    description:
      'Lao động part-time tại doanh nghiệp từ 51 lao động thường xuyên trở lên có thể phải tham gia 社会保険 nếu làm từ 20 giờ mỗi tuần trở lên và đáp ứng điều kiện luật định. Đây là điểm nhiều người Việt bỏ sót.',
    icon: 'shield',
  },
  {
    title: 'Không được giữ hộ chiếu, thẻ cư trú, ép nộp phạt vô lý',
    description:
      'Công ty, nghiệp đoàn hay quản lý không được giữ giấy tờ gốc của bạn để ép buộc. Nếu bị giữ giấy tờ, nợ lương, ép làm quá giờ hoặc khấu trừ bất thường, hãy giữ bằng chứng và liên hệ tư vấn chính thức.',
    icon: 'lock-closed',
  },
];

export const LABOR_RISK_SIGNS: LaborRiskSign[] = [
  {
    title: 'Tin tuyển dụng không ghi rõ lương cơ bản, giờ làm hoặc nơi làm',
    description:
      'Nếu chỉ ghi “lương cao”, “bao đậu”, “việc nhẹ” mà không có thông tin nền tảng, rủi ro rất cao.',
    severity: 'high',
  },
  {
    title: 'Yêu cầu nộp tiền môi giới, tiền phạt hoặc giữ giấy tờ gốc',
    description:
      'Hãy đặc biệt cảnh giác nếu bị đòi giữ hộ chiếu, thẻ cư trú, sổ ngân hàng, cash card hoặc điện thoại.',
    severity: 'high',
  },
  {
    title: 'Nói “không cần hợp đồng”, “không cần khai báo”, “làm chui cũng được”',
    description:
      'Đây là dấu hiệu vi phạm pháp luật lao động hoặc pháp luật lưu trú. Không nên nhận việc kiểu này.',
    severity: 'high',
  },
  {
    title: 'Lương thực nhận thấp hơn nhiều so với tin tuyển nhưng không giải thích rõ khấu trừ',
    description:
      'Cần yêu cầu bảng lương, giải thích từng khoản khấu trừ và căn cứ pháp lý của khoản bị trừ.',
    severity: 'medium',
  },
  {
    title: 'Không cho chụp hoặc giữ bản hợp đồng',
    description:
      'Bạn nên giữ ít nhất bản chụp hợp đồng, offer, lịch làm, bảng lương và nội quy công ty.',
    severity: 'medium',
  },
];

export const CONTRACT_REVIEW_CHECKLIST: ContractChecklistItem[] = [
  {
    label: 'Mức lương cơ bản và cách tính lương làm thêm giờ',
    whyItMatters: 'Phải biết rõ lương giờ, lương tháng và cách cộng OT, làm đêm, ngày nghỉ.',
  },
  {
    label: 'Giờ làm tiêu chuẩn, ngày nghỉ, ca làm và thời gian nghỉ giữa giờ',
    whyItMatters: 'Rất nhiều tranh chấp phát sinh từ lịch làm thực tế khác xa lúc tuyển.',
  },
  {
    label: 'Loại hợp đồng, thời hạn hợp đồng và điều kiện gia hạn',
    whyItMatters: 'Cần biết mình là hợp đồng xác định thời hạn hay không xác định thời hạn.',
  },
  {
    label: 'Nơi làm việc và khả năng bị điều chuyển',
    whyItMatters: 'Một số công ty ghi một nơi nhưng sau đó điều đi xa hoặc đổi ca không báo trước.',
  },
  {
    label: 'Các khoản khấu trừ: bảo hiểm, thuế, ký túc xá, đồng phục, ăn ở',
    whyItMatters: 'Phải phân biệt khoản khấu trừ hợp pháp với khoản thu vô lý hoặc không minh bạch.',
  },
  {
    label: 'Điều kiện nghỉ việc, cho nghỉ việc và thời gian báo trước',
    whyItMatters: 'Nắm trước để không bị ép nghỉ hoặc bị phạt vô lý khi muốn nghỉ.',
  },
  {
    label: 'Bảo hiểm áp dụng: 雇用保険, 労災, 社会保険',
    whyItMatters: 'Không phải cứ part-time là không có bảo hiểm. Cần đối chiếu theo điều kiện thực tế.',
  },
];

export const LABOR_SUPPORT_PHRASES: LaborPhrase[] = [
  {
    jp: '労働条件通知書をもう一度見せてください。',
    romaji: 'Roudou jouken tsuuchisho o mou ichido misete kudasai.',
    vn: 'Xin hãy cho tôi xem lại giấy thông báo điều kiện lao động.',
    useCase: 'Khi muốn xem lại hợp đồng hoặc điều kiện tuyển dụng bằng văn bản.',
  },
  {
    jp: 'この残業代の計算方法を説明してください。',
    romaji: 'Kono zangyoudai no keisan houhou o setsumei shite kudasai.',
    vn: 'Xin hãy giải thích cách tính tiền làm thêm giờ này.',
    useCase: 'Khi bảng lương có OT nhưng bạn không hiểu cách tính.',
  },
  {
    jp: '有給休暇は何日ありますか。',
    romaji: 'Yuukyuu kyuuka wa nannichi arimasu ka.',
    vn: 'Tôi có bao nhiêu ngày nghỉ phép có lương?',
    useCase: 'Khi muốn hỏi quyền nghỉ phép năm.',
  },
  {
    jp: 'この控除の内訳を書面でください。',
    romaji: 'Kono koujo no uchiwake o shomen de kudasai.',
    vn: 'Xin hãy cho tôi bản giấy ghi rõ chi tiết khoản khấu trừ này.',
    useCase: 'Khi công ty trừ nhiều khoản nhưng không giải thích rõ.',
  },
  {
    jp: '在留資格に合う仕事か確認したいです。',
    romaji: 'Zairyuu shikaku ni au shigoto ka kakunin shitai desu.',
    vn: 'Tôi muốn xác nhận công việc này có phù hợp với tư cách lưu trú của tôi không.',
    useCase: 'Khi bạn chưa chắc công việc có phù hợp visa hiện tại hay không.',
  },
  {
    jp: '相談窓口に確認してから返事します。',
    romaji: 'Soudan madoguchi ni kakunin shite kara henji shimasu.',
    vn: 'Tôi sẽ trả lời sau khi xác nhận với nơi tư vấn.',
    useCase: 'Khi bị ép ký nhanh hoặc chưa hiểu giấy tờ.',
  },
];

export const LABOR_HELP_SCENARIOS: LaborHelpScenario[] = [
  {
    id: 'unpaid-wages',
    title: 'Bị nợ lương hoặc trả thiếu lương',
    urgency: 'high',
    description:
      'Nếu công ty trả chậm, trả thiếu hoặc không giải thích rõ bảng lương, đây là vấn đề điều kiện lao động cần xử lý sớm.',
    doNow: [
      'Yêu cầu công ty giải thích bằng văn bản về số giờ làm, lương cơ bản, OT và các khoản khấu trừ.',
      'Không ký giấy xác nhận đã nhận đủ lương nếu thực tế chưa nhận đủ.',
      'Liên hệ đường dây tư vấn lao động cho người nước ngoài hoặc 労働基準監督署 nếu công ty không giải quyết.',
    ],
    collectEvidence: [
      'Hợp đồng lao động hoặc thông báo điều kiện lao động',
      'Bảng lương, sao kê ngân hàng, ảnh chụp tiền lương nhận thực tế',
      'Lịch làm việc, chấm công, tin nhắn giao ca hoặc yêu cầu làm thêm',
    ],
    contact: [
      '外国人労働者向け相談ダイヤル (tiếng Việt): 0570-001-706',
      '確かめよう労働条件: https://www.check-roudou.mhlw.go.jp/',
    ],
  },
  {
    id: 'forced-overtime',
    title: 'Bị ép làm quá giờ hoặc OT không trả đúng',
    urgency: 'high',
    description:
      'Công ty không thể tùy ý bắt làm thêm vô hạn mà không tính lương và không theo quy định.',
    doNow: [
      'Ghi lại ngày, giờ bắt đầu và kết thúc làm việc thực tế mỗi ngày.',
      'Yêu cầu giải thích cách tính OT, làm đêm và ngày nghỉ theo bảng lương.',
      'Nếu công ty ép làm quá giờ liên tục hoặc có nguy cơ sức khỏe, liên hệ tư vấn lao động sớm.',
    ],
    collectEvidence: [
      'Ảnh chụp lịch làm, bảng chấm công, tin nhắn điều ca',
      'Bảng lương các tháng gần nhất',
      'Ảnh chụp giờ vào/ra nếu có hệ thống chấm công',
    ],
    contact: [
      '外国人労働者向け相談ダイヤル (tiếng Việt): 0570-001-706',
      '労働基準監督署 gần nơi làm việc',
    ],
  },
  {
    id: 'documents-held',
    title: 'Bị giữ hộ chiếu, thẻ cư trú hoặc sổ ngân hàng',
    urgency: 'high',
    description:
      'Giữ giấy tờ gốc để ép buộc người lao động là dấu hiệu rất rủi ro. Không nên chờ tình hình xấu thêm.',
    doNow: [
      'Yêu cầu trả lại giấy tờ gốc càng sớm càng tốt.',
      'Không giao thêm giấy tờ, cash card hoặc mã PIN cho công ty, nghiệp đoàn hay quản lý.',
      'Nếu là thực tập sinh kỹ năng, liên hệ OTIT; các trường hợp khác liên hệ tư vấn lao động hoặc FRESC.',
    ],
    collectEvidence: [
      'Tin nhắn, ghi âm, ảnh hoặc nhân chứng về việc bị giữ giấy tờ',
      'Danh sách giấy tờ đã bị giữ và thời điểm bị giữ',
      'Thông tin công ty, quản lý, nghiệp đoàn hoặc nơi ở',
    ],
    contact: [
      'OTIT SOS / tư vấn thực tập sinh: https://www.otit.go.jp/trainee/',
      '外国人労働者向け相談ダイヤル (tiếng Việt): 0570-001-706',
      'FRESC: https://fresc.moj.go.jp/',
    ],
  },
  {
    id: 'want-to-quit',
    title: 'Muốn nghỉ việc nhưng bị dọa phạt hoặc cản trở',
    urgency: 'medium',
    description:
      'Nghỉ việc là vấn đề pháp lý và hợp đồng. Nếu bị dọa phạt vô lý hoặc ép không cho nghỉ, cần lưu bằng chứng.',
    doNow: [
      'Đọc lại hợp đồng để xem thời hạn báo trước và hình thức nộp thông báo nghỉ việc.',
      'Gửi thông báo nghỉ việc bằng cách có thể lưu bằng chứng như email, thư bảo đảm hoặc tin nhắn có xác nhận.',
      'Không tự bỏ việc mà không giữ lại bằng chứng đã thông báo, đặc biệt nếu visa của bạn gắn với công việc hiện tại.',
    ],
    collectEvidence: [
      'Hợp đồng lao động và nội quy công ty',
      'Thông báo nghỉ việc đã gửi, email, thư bảo đảm, tin nhắn',
      'Tin nhắn hoặc ghi âm về việc bị đe dọa phạt hoặc cấm nghỉ',
    ],
    contact: [
      '外国人労働者向け相談ダイヤル (tiếng Việt): 0570-001-706',
      'Nếu visa đi làm gắn với công ty, kiểm tra thêm nghĩa vụ khai báo với ISA',
    ],
  },
];
