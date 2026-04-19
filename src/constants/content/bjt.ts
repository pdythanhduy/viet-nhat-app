import type {
  BjtBusinessManner,
  BjtCvTemplateBlock,
  BjtDocumentMeta,
  BjtDocumentMockQuestion,
  BjtEmailTemplate,
  BjtGrammarItem,
  BjtKanjiItem,
  BjtKeigoEntry,
  BjtLevelBand,
  BjtPracticeQuestion,
  BjtQuestionType,
  BjtMockV2Exam,
  BjtMockV2Meta,
  BjtReadingPassage,
  BjtFlashcardSet,
  BjtScenarioItem,
  BjtStudyModule,
  BjtStudyPlanDay,
  BjtUltimateStudyPlan,
  BjtVocabularyItem,
  BjtAbbreviationItem,
} from '../../types/content';

const BJT_BOOK_SOURCE = {
  meta: require('../../../docs/bjt/document/partitioned/meta.json'),
  keigo: require('../../../docs/bjt/document/partitioned/keigo.json'),
  scenarios: require('../../../docs/bjt/document/partitioned/scenarios.json'),
  mock_test: require('../../../docs/bjt/document/partitioned/mock_test.json'),
  email_templates: require('../../../docs/bjt/document/partitioned/email_templates.json'),
  business_manners: require('../../../docs/bjt/document/partitioned/business_manners.json'),
  kanji: require('../../../docs/bjt/document/partitioned/kanji.json'),
  grammar: require('../../../docs/bjt/document/partitioned/grammar.json'),
  cv_templates: require('../../../docs/bjt/document/partitioned/cv_templates.json'),
  abbreviations: require('../../../docs/bjt/document/partitioned/abbreviations.json'),
  reading_passages: require('../../../docs/bjt/document/partitioned/reading_passages.json'),
  flashcard_sets: require('../../../docs/bjt/document/partitioned/flashcard_sets.json'),
  study_plan: require('../../../docs/bjt/document/partitioned/study_plan.json'),
} as {
  meta: {
    title: string;
    version: string;
    updated: string;
    total_vocab: number;
    total_keigo: number;
    total_scenarios: number;
    total_mock: number;
    total_emails: number;
    total_manners: number;
    test_info: {
      questions: number;
      duration: string;
      format: string;
      scoring: string;
      parts: string[];
      visa_2026?: string;
    };
  };
  keigo: {
    intro: string;
    sonkeigo: Array<{
      id: string;
      plain: string;
      prd: string;
      pvi: string;
      keigo: string;
      krd: string;
      kvi: string;
      ex_jp: string;
      ex_vi: string;
      lv: string;
    }>;
    kenjougo: Array<{
      id: string;
      plain: string;
      prd: string;
      pvi: string;
      keigo: string;
      krd: string;
      kvi: string;
      ex_jp: string;
      ex_vi: string;
      lv: string;
    }>;
    common_mistakes?: Array<
      | string
      | {
          mistake?: string;
          correct?: string;
          rule?: string;
        }
    >;
  };
  scenarios: Array<{
    id: string;
    title_vi: string;
    title_jp: string;
    lv: string;
    situation: string;
    dialogue: Array<{ sp: string; jp: string; vi: string }>;
    tips: string;
  }>;
  mock_test: Array<{
    id: string;
    part: string;
    type: 'reading' | 'listening' | 'listening-reading';
    lv: string;
    p_jp: string;
    p_vi: string;
    q: string;
    qv: string;
    opts: Array<Record<string, string>>;
    ans: string;
    exp: string;
  }>;
  email_templates: Array<{
    id: string;
    title: string;
    title_jp: string;
    lv: string;
    template_jp: string;
    key: string[];
  }>;
  business_manners: Array<{
    id: string;
    cat: string;
    vi: string;
    desc: string;
    mistakes: string[];
  }>;
  kanji: {
    total: number;
    description: string;
    items: Array<{
      kanji: string;
      on: string;
      kun: string;
      vi: string;
      words: string[];
    }>;
  };
  grammar: {
    total: number;
    description: string;
    items: Array<{
      id: string;
      pattern: string;
      reading: string;
      vi: string;
      level: string;
      ex_jp: string;
      ex_vi: string;
      usage: string;
    }>;
  };
  cv_templates: {
    rirekisho: {
      title: string;
      description: string;
      fields: Array<{ field_jp: string; field_vi: string; note: string }>;
      tips: string;
    };
    shokumukeirekisho: {
      title: string;
      description: string;
      sections: Array<{ section_jp: string; section_vi: string; note: string }>;
      tips: string;
    };
  };
  abbreviations: {
    title: string;
    items: Array<{
      symbol: string;
      reading: string;
      vi: string;
      usage: string;
      example: string;
    }>;
  };
  reading_passages: Array<{
    id: string;
    title: string;
    lv: string;
    passage_jp: string;
    passage_vi: string;
    questions: Array<{ q: string; a: string }>;
  }>;
  flashcard_sets: Array<{
    set_id: string;
    name: string;
    level: string;
    card_count: number;
    description: string;
  }>;
  study_plan: {
    title: string;
    weeks: Array<{
      week: number;
      focus: string;
      vocab?: string;
      keigo?: string;
      grammar?: string;
      scenario?: string;
      reading?: string;
      email?: string;
      manners?: string;
      mock?: string;
      tips?: string;
    }>;
  };
};

const BJT_MOCK_V2_SOURCE = require('../../../docs/bjt/document/BJT_50_MOCK_EXAMS_V2.json') as {
  meta: {
    title: string;
    version: string;
    total_exams: number;
    total_questions: number;
    unique_question_bank: {
      notices: number;
      emails: number;
      keigo: number;
      listening: number;
      listening_reading: number;
      total_unique: number;
    };
    note: string;
  };
  exams: Array<{
    exam_id: string;
    title: string;
    total_questions: number;
    time_limit_minutes: number;
    parts: {
      I: number;
      II: number;
      III: number;
    };
    questions: Array<{
      id: string;
      part: 'I' | 'II' | 'III';
      part_name: string;
      level: 'J2' | 'J3' | 'J4';
      passage_jp: string;
      question_jp: string;
      options: Array<{ label: string; text: string }>;
      answer: string;
      explanation: string;
    }>;
  }>;
};

const BJT_VOCAB_SOURCE = require('../../../docs/bjt/document/partitioned/vocabulary.json') as {
  total: number;
  words: Array<{
    id: string;
    jp: string;
    rd?: string;
    vi: string;
    usage?: string;
    lv?: string;
    ex_jp?: string;
    ex_vi?: string;
    section?: string;
    section_vi?: string;
  }>;
};

export const BJT_DOCUMENT_META: BjtDocumentMeta = {
  title: BJT_BOOK_SOURCE.meta.title,
  version: BJT_BOOK_SOURCE.meta.version,
  updated: BJT_BOOK_SOURCE.meta.updated,
  totalVocabulary: BJT_BOOK_SOURCE.meta.total_vocab,
  totalKeigo: BJT_BOOK_SOURCE.meta.total_keigo,
  totalScenarios: BJT_BOOK_SOURCE.meta.total_scenarios,
  totalMockSets: BJT_BOOK_SOURCE.meta.total_mock,
  totalEmailTemplates: BJT_BOOK_SOURCE.meta.total_emails,
  totalManners: BJT_BOOK_SOURCE.meta.total_manners,
  examQuestions: BJT_BOOK_SOURCE.meta.test_info.questions,
  examDuration: BJT_BOOK_SOURCE.meta.test_info.duration,
  examFormat: BJT_BOOK_SOURCE.meta.test_info.format,
  examScoring: BJT_BOOK_SOURCE.meta.test_info.scoring,
  examParts: BJT_BOOK_SOURCE.meta.test_info.parts,
  visaNote2026: BJT_BOOK_SOURCE.meta.test_info.visa_2026 ?? '',
};

export const BJT_OVERVIEW = {
  title: 'BJT Business Japanese Prep',
  subtitle: 'Lộ trình luyện Business Japanese theo hướng sát cấu trúc BJT.',
  examFocus: [
    'Nghe và xử lý tình huống công việc thay vì chỉ nhớ từ đơn lẻ.',
    'Đọc nhanh email, thông báo, bảng biểu và chọn phản ứng phù hợp.',
    'Phân biệt mức độ lịch sự, ưu tiên việc và ngữ cảnh doanh nghiệp Nhật.',
  ],
  strategyNotes: [
    'Ưu tiên hiểu vai trò người nói, mục đích trao đổi và hành động tiếp theo.',
    'BJT thường đo năng lực xử lý thông tin trong bối cảnh business hơn là mẹo ngữ pháp thuần túy.',
    'Nên học theo cụm: từ vựng + mẫu câu + tình huống + quyết định hành động.',
  ],
} as const;

export const BJT_LEVEL_BANDS: BjtLevelBand[] = [
  {
    level: 'J5',
    scoreRange: '0-219',
    summary: 'Hiểu chỉ thị đơn giản, thông báo ngắn và yêu cầu 1 bước trong môi trường quen thuộc.',
    focus: [
      'Nghe và làm theo chỉ thị trực tiếp: đặt phòng, photo tài liệu, ghi tin nhắn hộ',
      'Đọc thông báo nội bộ ngắn: giờ làm việc, lịch vệ sinh, quy tắc sử dụng thiết bị',
      'Nhận diện từ khóa hành động: 確認、担当、締め切り、予約、折り返し',
    ],
  },
  {
    level: 'J4',
    scoreRange: '220-419',
    summary: 'Xử lý chỉ thị 2–3 bước, lịch thay đổi, quy tắc cơ bản và phân công theo tên người.',
    focus: [
      'Nghe chỉ thị có điều kiện đơn giản: nếu A thì làm B, nếu không thì làm C',
      'Đọc email, memo phân công và xác định ai phải làm gì trong thời hạn nào',
      'Áp dụng quy trình cơ bản: ngưỡng phê duyệt, hạn nộp, cách liên hệ khi người phụ trách vắng',
    ],
  },
  {
    level: 'J3',
    scoreRange: '420-529',
    summary: 'Xử lý tình huống công việc quen thuộc với hướng dẫn nhiều điều kiện và bước phụ thuộc.',
    focus: [
      'Theo dõi chuỗi bước phụ thuộc: bước A phải hoàn thành trước khi thực hiện bước B',
      'Đọc quy định có ngoại lệ và nhận ra điều kiện đặc biệt áp dụng cho trường hợp cụ thể',
      'Phân biệt nhiều thay đổi trong một thông báo: giờ, địa điểm, người phụ trách',
    ],
  },
  {
    level: 'J2',
    scoreRange: '530-599',
    summary: 'Phản ứng chính xác trong môi trường doanh nghiệp với chỉ thị nhiều lớp và mốc thời hạn chồng nhau.',
    focus: [
      'Hiểu ngoại lệ theo danh mục: quy trình mới áp dụng chung nhưng trường hợp cũ vẫn giữ nguyên',
      'Phân biệt thứ tự thời hạn: mốc thông thường, mốc chuyển tiếp và điều kiện kích hoạt',
      'Tổng hợp thông tin từ tài liệu và hội thoại bổ sung thành một quyết định nhất quán',
    ],
  },
  {
    level: 'J1',
    scoreRange: '600-699',
    summary: 'Đưa ra quyết định hành động phù hợp trong tình huống phức tạp với nhiều ràng buộc đồng thời.',
    focus: [
      'Nhận diện chỉ thị đa tầng: được làm gì, không được làm gì, điều kiện kèm theo của mỗi lớp',
      'Xử lý khi chuỗi phê duyệt bị gián đoạn: người phụ trách vắng mặt, thẩm quyền tạm thời',
      'Phân biệt quyền hạn: điều gì tự quyết được, điều gì phải leo thang lên cấp trên',
    ],
  },
  {
    level: 'J1+',
    scoreRange: '700-800',
    summary: 'Điều hướng quyết định cấp điều hành với xung đột thẩm quyền, bảo mật và nghĩa vụ pháp lý.',
    focus: [
      'Cân bằng chỉ thị miệng của cấp cao với chính sách thể chế hóa và nghĩa vụ pháp lý',
      'Quản lý thông tin nhạy cảm đa tầng: ai được biết gì, trong phạm vi nào, với điều kiện gì',
      'Nhận diện khi nào phải phản hồi ngược lên cấp trên dù đã có chỉ thị vì rủi ro pháp lý hoặc quản trị',
    ],
  },
];

export const BJT_QUESTION_TYPES: BjtQuestionType[] = [
  {
    id: 'listen-scene',
    title: 'Nghe tình huống',
    skill: 'listening',
    description: 'Nghe đoạn hội thoại ngắn trong bối cảnh công việc rồi chọn phản ứng hoặc kết luận phù hợp.',
    whatToTrain: ['Bắt mục đích cuộc nói chuyện', 'Nhận ra ai đang yêu cầu gì', 'Xác định hành động tiếp theo'],
  },
  {
    id: 'listen-read-compare',
    title: 'Nghe + Đọc',
    skill: 'listening-reading',
    description: 'Nghe thông tin và đối chiếu với lịch, memo, email hoặc bảng nội bộ.',
    whatToTrain: ['Ghép thông tin giữa âm thanh và văn bản', 'Đọc lướt mốc thời gian, địa điểm, người phụ trách', 'Loại nhiễu do chi tiết phụ'],
  },
  {
    id: 'business-reading',
    title: 'Đọc hiểu kinh doanh',
    skill: 'reading',
    description: 'Đọc email, thông báo, báo cáo ngắn hoặc hướng dẫn xử lý trong công ty.',
    whatToTrain: ['Quét ý chính nhanh', 'Hiểu quan hệ giữa người gửi và người nhận', 'Rút ra quyết định phù hợp với vai trò công việc'],
  },
];

export const BJT_STUDY_MODULES: BjtStudyModule[] = [
  {
    id: 'vocabulary',
    title: 'Từ vựng kinh doanh',
    icon: 'briefcase-outline',
    color: '#185FA5',
    description: 'Học cụm từ và collocation theo chủ đề email, họp, báo cáo, lịch làm việc, điều phối task và tuân thủ.',
    outcomes: [
      'J5/J4: nắm từ khóa hành động cơ bản — 確認、担当、締め切り、予約、折り返し',
      'J3/J2: hiểu collocation và sắc thái — 依頼する、承認する、修正、提案',
      'J1/J1+: đọc được từ vựng quản trị và pháp lý — 組織変更、権限、コンプライアンス、契約',
    ],
    linkedCategoryName: 'Công việc và hợp đồng',
  },
  {
    id: 'listening',
    title: 'Luyện nghe kinh doanh',
    icon: 'headset-outline',
    color: '#D97706',
    description: 'Luyện nghe hội thoại workplace từ đơn giản đến phức tạp: chỉ thị, thay đổi lịch, báo cáo tiến độ, điện thoại với khách và họp nhiều người.',
    outcomes: [
      'J5/J4: bắt ý chính trong audio ngắn và nhận diện ai yêu cầu gì',
      'J3/J2: theo dõi chỉ thị có điều kiện phân nhánh và sắc thái lịch sự',
      'J1/J1+: hiểu chỉ thị đa tầng và xác định hành động đúng dù có thông tin xung đột',
    ],
    linkedCategoryName: 'Gọi điện thoại',
  },
  {
    id: 'reading',
    title: 'Đọc hiểu kinh doanh',
    icon: 'mail-open-outline',
    color: '#0F9D58',
    description: 'Đọc email, memo, quy định, thông báo và tài liệu hành chính nội bộ.',
    outcomes: [
      'J5/J4: đọc lướt để tìm ai làm gì, khi nào, ở đâu',
      'J3/J2: nhận diện điều kiện ngoại lệ và chuỗi bước phụ thuộc trong quy định',
      'J1/J1+: phân tích quy trình phê duyệt nhiều tầng và nhận ra ràng buộc pháp lý',
    ],
    linkedCategoryName: 'Công việc nhà máy',
  },
  {
    id: 'strategy',
    title: 'Chiến lược làm bài',
    icon: 'analytics-outline',
    color: '#8E44AD',
    description: 'Luyện kỹ thuật làm bài BJT: đọc vai trò trước, lọc điều kiện chính, loại đáp án nhiễu và giữ nhịp ổn định.',
    outcomes: [
      'Đọc đề theo vai trò: tôi là ai trong tình huống này và cần làm gì ngay bây giờ?',
      'Loại nhanh đáp án sai: quá mạnh, quá thụ động, sai người thực hiện, sai thời điểm',
      'J2+: nhận diện bẫy dùng một phần khi đáp án chỉ thỏa một số điều kiện trong chỉ thị',
    ],
  },
];

export const BJT_STUDY_PLAN: BjtStudyPlanDay[] = [
  { day: 1, theme: 'Email và xác nhận', goal: 'Làm quen cụm từ business cơ bản và flow xác nhận công việc.', tasks: ['Học 15 cụm từ: xác nhận, đính kèm, phụ trách, phản hồi', 'Đọc 2 email ngắn và tóm tắt hành động cần làm', 'Luyện 1 đoạn AI roleplay xác nhận lịch họp'] },
  { day: 2, theme: 'Lịch họp và deadline', goal: 'Đọc nhanh mốc giờ, lịch đổi phòng, deadline và người phụ trách.', tasks: ['Ôn cụm thời gian và trạng thái tiến độ', 'Đọc 1 bảng lịch và 1 memo thay đổi kế hoạch', 'Tự nói lại bằng tiếng Việt: ai làm gì, khi nào'] },
  { day: 3, theme: 'Điện thoại công việc', goal: 'Nghe hiểu thông tin ngắn qua điện thoại.', tasks: ['Luyện mẫu câu chuyển máy, nhận lại, xin gọi lại', 'Nghe 3 đoạn hội thoại ngắn và ghi key points', 'Ôn lại lỗi nghe sai số, tên người, thời gian'] },
  { day: 4, theme: 'Báo cáo tiến độ', goal: 'Hiểu cách báo cáo ngắn gọn trong ngữ cảnh doanh nghiệp.', tasks: ['Học cụm từ về tiến độ, chậm tiến độ, xác minh, bàn giao', 'Đọc 1 đoạn báo cáo ngắn và xác định hành động tiếp theo', 'Luyện 5 câu mô tả tiến độ bằng AI chat'] },
  { day: 5, theme: 'Khách hàng và đối tác', goal: 'Nhận diện mức độ lịch sự và ưu tiên phản hồi.', tasks: ['Ôn cách nói lịch sự với khách', 'Đọc 2 tình huống dịch vụ đối tác', 'Tự chọn đáp án phù hợp nhất và giải thích vì sao'] },
  { day: 6, theme: 'Quy trình nội bộ', goal: 'Làm quen chuỗi phê duyệt và các ngoại lệ thông dụng.', tasks: ['Đọc 2 thông báo nội bộ có quy trình', 'Tóm tắt điều kiện bắt buộc và ngoại lệ', 'Luyện 5 câu hỏi mini về quy trình'] },
  { day: 7, theme: 'Ôn tổng hợp J5–J4', goal: 'Rà soát nền tảng từ vựng, nghe, đọc.', tasks: ['Ôn 30 từ business core', 'Làm 1 set scenario ngắn', 'Ghi lại 5 điểm dễ nhầm lẫn nhất'] },
  { day: 8, theme: 'Tình huống J3', goal: 'Tập trung vào tình huống công việc quen thuộc nhiều điều kiện.', tasks: ['Làm 1 set scenario J3', 'Review tất cả câu sai', 'Viết lại lý do chọn đáp án'] },
  { day: 9, theme: 'Nghe + Đọc kết hợp', goal: 'Luyện đối chiếu thông tin từ nhiều nguồn.', tasks: ['Đọc memo và nghe thông báo bổ sung', 'Đánh dấu thông tin mâu thuẫn', 'Chọn hành động đúng nhất'] },
  { day: 10, theme: 'Mock có giờ', goal: 'Làm quen áp lực thời gian.', tasks: ['Làm 1 timed mock', 'Thống kê kỹ năng yếu nhất', 'Review explanation gốc'] },
  { day: 11, theme: 'Keigo và cách ứng xử', goal: 'Củng cố sắc thái lịch sự và ứng xử công sở.', tasks: ['Ôn sonkeigo và kenjougo cơ bản', 'Đọc 3 email mẫu', 'Ghi lại cụm câu có thể dùng ngay'] },
  { day: 12, theme: 'Đọc hiểu J2–J1', goal: 'Xử lý văn bản nhiều ràng buộc hơn.', tasks: ['Đọc 2 văn bản quy định', 'Tìm điều kiện kích hoạt và ngoại lệ', 'Tóm tắt quyết định cần làm'] },
  { day: 13, theme: 'Mock tổng hợp', goal: 'Tổng hợp trước ngày chốt mục tiêu.', tasks: ['Làm 1 mock tổng hợp', 'Review sai theo từng kỹ năng', 'Lập danh sách ưu tiên ôn cuối cùng'] },
  { day: 14, theme: 'Tổng kết và cá nhân hóa', goal: 'Chốt lộ trình ôn tiếp theo dựa trên dữ liệu thực tế.', tasks: ['Xem lại best mock và scenario accuracy', 'Tổng hợp 10 điểm cần sửa', 'Nhờ AI lập lịch ôn tiếp theo'] },
];

export const BJT_VOCABULARY = require('../../../docs/bjt/document/partitioned/legacy_runtime_vocabulary.json') as BjtVocabularyItem[];

export const BJT_DOCUMENT_VOCABULARY: BjtVocabularyItem[] = BJT_VOCAB_SOURCE.words.map((word) => {
  const noteParts = [word.usage, word.lv ? `Cấp ${word.lv}` : undefined].filter(Boolean);

  return {
    id: word.id,
    theme: word.section_vi?.trim() || word.section?.trim() || 'Khác',
    jp: word.jp,
    reading: word.rd ?? '',
    romaji: word.rd ?? '',
    vn: word.vi,
    exampleJp: word.ex_jp ?? '',
    exampleRomaji: '',
    exampleVn: word.ex_vi ?? '',
    note: noteParts.length > 0 ? noteParts.join(' • ') : undefined,
  };
});

const mapKeigoEntries = (
  category: BjtKeigoEntry['category'],
  items: typeof BJT_BOOK_SOURCE.keigo.sonkeigo
): BjtKeigoEntry[] =>
  items.map((item) => ({
    id: item.id,
    plain: item.plain,
    plainReading: item.prd,
    plainMeaning: item.pvi,
    keigo: item.keigo,
    keigoReading: item.krd,
    keigoMeaning: item.kvi,
    exampleJp: item.ex_jp,
    exampleVi: item.ex_vi,
    level: item.lv,
    category,
  }));

export const BJT_KEIGO_INTRO = BJT_BOOK_SOURCE.keigo.intro;
export const BJT_KEIGO_COMMON_MISTAKES = (BJT_BOOK_SOURCE.keigo.common_mistakes ?? []).map((item) => {
  if (typeof item === 'string') {
    return {
      mistake: item,
      correct: '',
      rule: '',
    };
  }

  return {
    mistake: item.mistake ?? '',
    correct: item.correct ?? '',
    rule: item.rule ?? '',
  };
});

export const BJT_KEIGO_ENTRIES: BjtKeigoEntry[] = [
  ...mapKeigoEntries('sonkeigo', BJT_BOOK_SOURCE.keigo.sonkeigo),
  ...mapKeigoEntries('kenjougo', BJT_BOOK_SOURCE.keigo.kenjougo),
];

export const BJT_SCENARIO_LIBRARY: BjtScenarioItem[] = BJT_BOOK_SOURCE.scenarios.map((item) => ({
  id: item.id,
  titleVi: item.title_vi,
  titleJp: item.title_jp,
  level: item.lv,
  situation: item.situation,
  dialogue: item.dialogue.map((line) => ({
    speaker: line.sp,
    jp: line.jp,
    vi: line.vi,
  })),
  tips: item.tips,
}));

export const BJT_DOCUMENT_MOCK_QUESTIONS: BjtDocumentMockQuestion[] = BJT_BOOK_SOURCE.mock_test.map((item) => ({
  id: item.id,
  part: item.part,
  type: item.type,
  level: item.lv,
  promptJp: item.p_jp,
  promptVi: item.p_vi,
  questionJp: item.q,
  questionVi: item.qv,
  options: item.opts.map((option) => {
    const keys = Object.keys(option);
    const label = keys.find((key) => key.length === 1) ?? 'A';
    const labelVi = `${label}v`;
    return {
      label,
      value: option[label] ?? '',
      labelVi: option[labelVi] ?? '',
    };
  }),
  answer: item.ans,
  explanation: item.exp,
}));

export const BJT_EMAIL_TEMPLATES: BjtEmailTemplate[] = BJT_BOOK_SOURCE.email_templates.map((item) => ({
  id: item.id,
  title: item.title,
  titleJp: item.title_jp,
  level: item.lv,
  templateJp: item.template_jp,
  keyPhrases: item.key,
}));

export const BJT_BUSINESS_MANNERS: BjtBusinessManner[] = BJT_BOOK_SOURCE.business_manners.map((item) => ({
  id: item.id,
  category: item.cat,
  categoryVi: item.vi,
  description: item.desc,
  mistakes: item.mistakes,
}));

export const BJT_KANJI_DESCRIPTION = BJT_BOOK_SOURCE.kanji.description;
export const BJT_KANJI_ITEMS: BjtKanjiItem[] = BJT_BOOK_SOURCE.kanji.items.map((item) => ({
  kanji: item.kanji,
  on: item.on,
  kun: item.kun,
  vi: item.vi,
  words: item.words,
}));

export const BJT_GRAMMAR_DESCRIPTION = BJT_BOOK_SOURCE.grammar.description;
export const BJT_GRAMMAR_ITEMS: BjtGrammarItem[] = BJT_BOOK_SOURCE.grammar.items.map((item) => ({
  id: item.id,
  pattern: item.pattern,
  reading: item.reading,
  vi: item.vi,
  level: item.level,
  ex_jp: item.ex_jp,
  ex_vi: item.ex_vi,
  usage: item.usage,
}));

export const BJT_CV_TEMPLATES: {
  rirekisho: BjtCvTemplateBlock;
  shokumukeirekisho: BjtCvTemplateBlock;
} = {
  rirekisho: {
    title: BJT_BOOK_SOURCE.cv_templates.rirekisho.title,
    description: BJT_BOOK_SOURCE.cv_templates.rirekisho.description,
    tips: BJT_BOOK_SOURCE.cv_templates.rirekisho.tips,
    fields: BJT_BOOK_SOURCE.cv_templates.rirekisho.fields,
  },
  shokumukeirekisho: {
    title: BJT_BOOK_SOURCE.cv_templates.shokumukeirekisho.title,
    description: BJT_BOOK_SOURCE.cv_templates.shokumukeirekisho.description,
    tips: BJT_BOOK_SOURCE.cv_templates.shokumukeirekisho.tips,
    sections: BJT_BOOK_SOURCE.cv_templates.shokumukeirekisho.sections,
  },
};

export const BJT_ABBREVIATIONS_TITLE = BJT_BOOK_SOURCE.abbreviations.title;
export const BJT_ABBREVIATIONS: BjtAbbreviationItem[] = BJT_BOOK_SOURCE.abbreviations.items.map((item) => ({
  symbol: item.symbol,
  reading: item.reading,
  vi: item.vi,
  usage: item.usage,
  example: item.example,
}));

export const BJT_READING_PASSAGES: BjtReadingPassage[] = BJT_BOOK_SOURCE.reading_passages.map((item) => ({
  id: item.id,
  title: item.title,
  lv: item.lv,
  passage_jp: item.passage_jp,
  passage_vi: item.passage_vi,
  questions: item.questions.map((question) => ({
    q: question.q,
    a: question.a,
  })),
}));

export const BJT_FLASHCARD_SETS: BjtFlashcardSet[] = BJT_BOOK_SOURCE.flashcard_sets.map((item) => ({
  set_id: item.set_id,
  name: item.name,
  level: item.level,
  card_count: item.card_count,
  description: item.description,
}));

export const BJT_ULTIMATE_STUDY_PLAN: BjtUltimateStudyPlan = {
  title: BJT_BOOK_SOURCE.study_plan.title,
  weeks: BJT_BOOK_SOURCE.study_plan.weeks.map((week) => ({
    week: week.week,
    focus: week.focus,
    vocab: week.vocab,
    keigo: week.keigo,
    grammar: week.grammar,
    scenario: week.scenario,
    reading: week.reading,
    email: week.email,
    manners: week.manners,
    mock: week.mock,
    tips: week.tips,
  })),
};

export const BJT_MOCK_V2_META: BjtMockV2Meta = {
  title: BJT_MOCK_V2_SOURCE.meta.title,
  version: BJT_MOCK_V2_SOURCE.meta.version,
  totalExams: BJT_MOCK_V2_SOURCE.meta.total_exams,
  totalQuestions: BJT_MOCK_V2_SOURCE.meta.total_questions,
  uniqueQuestionBank: {
    notices: BJT_MOCK_V2_SOURCE.meta.unique_question_bank.notices,
    emails: BJT_MOCK_V2_SOURCE.meta.unique_question_bank.emails,
    keigo: BJT_MOCK_V2_SOURCE.meta.unique_question_bank.keigo,
    listening: BJT_MOCK_V2_SOURCE.meta.unique_question_bank.listening,
    listeningReading: BJT_MOCK_V2_SOURCE.meta.unique_question_bank.listening_reading,
    totalUnique: BJT_MOCK_V2_SOURCE.meta.unique_question_bank.total_unique,
  },
  note: BJT_MOCK_V2_SOURCE.meta.note,
};

export const BJT_MOCK_V2_EXAMS: BjtMockV2Exam[] = BJT_MOCK_V2_SOURCE.exams.map((exam) => ({
  examId: exam.exam_id,
  title: exam.title,
  totalQuestions: exam.total_questions,
  timeLimitMinutes: exam.time_limit_minutes,
  parts: exam.parts,
  questions: exam.questions.map((question) => ({
    id: question.id,
    part: question.part,
    partName: question.part_name,
    level: question.level,
    passageJp: question.passage_jp,
    questionJp: question.question_jp,
    options: question.options.map((option) => ({
      label: option.label,
      text: option.text,
    })),
    answer: question.answer,
    explanation: question.explanation,
  })),
}));

export const BJT_PRACTICE_QUESTIONS = require('../../../docs/bjt/document/partitioned/legacy_runtime_practice_questions.json') as BjtPracticeQuestion[];
