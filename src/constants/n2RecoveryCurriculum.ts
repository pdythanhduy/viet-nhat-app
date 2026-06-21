// N2 RECOVERY MASTER COURSE — 100-day curriculum (Stage 1: static backbone).
//
// Transcribed from the owner's Master Curriculum. This is the fixed source of
// truth; the Lab screens browse it and track progress. Per-day generated
// content (vocab/grammar explanations, quizzes, SRS) comes in later stages.
//
// Course nature: NOT JLPT prep — reactivating N2 for real use (読む・聞く・
// 話す・書く・ビジネス日本語). Explanations in Vietnamese, target language JP.

export type N2DayKind = 'normal' | 'review' | 'test';

export interface N2Phase {
  id: number; // 1..5
  jp: string; // Japanese phase name
  vi: string; // Vietnamese name
  dayFrom: number;
  dayTo: number;
  focus: string; // Vietnamese focus blurb
}

export interface N2Day {
  day: number; // 1..100
  phase: number; // 1..5
  theme: string; // Japanese theme (or review/test label)
  vocabTopic: string; // Vietnamese vocab-topic label ('—' for review/test)
  grammar: string[]; // grammar patterns; for review/test days a single note
  kind: N2DayKind;
}

export const N2_PHASES: readonly N2Phase[] = [
  {
    id: 1,
    jp: '再起動',
    vi: 'Reactivation — Đánh thức lại N2',
    dayFrom: 1,
    dayTo: 15,
    focus: 'Từ vựng tần suất cao, ngữ pháp N2 lõi, phản xạ aizuchi cơ bản.',
  },
  {
    id: 2,
    jp: '日常の流暢化',
    vi: 'Daily Fluency — Lưu loát đời thường',
    dayFrom: 16,
    dayTo: 35,
    focus: 'Hội thoại đời thường tự nhiên, casual speech, phản xạ tức thì.',
  },
  {
    id: 3,
    jp: 'ビジネス基礎',
    vi: 'Business Foundation — Nền tảng công việc',
    dayFrom: 36,
    dayTo: 60,
    focus: 'Keigo thực chiến, email · 会議 · 報告 · スケジュール.',
  },
  {
    id: 4,
    jp: 'ビジネス応用＋ニュース',
    vi: 'Business Advanced & News',
    dayFrom: 61,
    dayTo: 85,
    focus: 'Đàm phán, xử lý sự cố (bug/trouble), nghe tin tức.',
  },
  {
    id: 5,
    jp: '統合・実践',
    vi: 'Integration — Tổng hợp & thực chiến',
    dayFrom: 86,
    dayTo: 100,
    focus: 'Tình huống công ty mô phỏng, output tổng hợp, củng cố.',
  },
];

// Helper to keep the day list terse.
const d = (
  day: number,
  phase: number,
  theme: string,
  vocabTopic: string,
  grammar: string[],
  kind: N2DayKind = 'normal'
): N2Day => ({ day, phase, theme, vocabTopic, grammar, kind });

export const N2_DAYS: readonly N2Day[] = [
  // ---- PHASE 1 — 再起動 (Day 1–15) ----
  d(1, 1, '自己紹介・近況', 'Đời sống, cảm xúc, tần suất cao', ['～わけだ', '～ものだ', '～ことだ', '～ようにする', '～ようになる']),
  d(2, 1, '一日の生活', 'Sinh hoạt, nhà cửa, thời gian', ['～たびに', '～ついでに', '～かけ', '～きる', '～がち']),
  d(3, 1, '体調・健康', 'Cơ thể, bệnh, cảm giác', ['～ぎみ', '～っぽい', '～だらけ', '～気味', '～かねる']),
  d(4, 1, '感情表現', 'Cảm xúc, tính cách', ['～てたまらない', '～てならない', '～ずにはいられない', '～ものか', '～どころか']),
  d(5, 1, '天気・季節', 'Thời tiết, mùa, thiên nhiên', ['～につれて', '～にしたがって', '～とともに', '～に伴って', '～ば～ほど']),
  d(6, 1, 'Review Day 1–5', '—', ['Tổng hợp + 25 mẫu đã học'], 'review'),
  d(7, 1, '買い物・お金', 'Mua sắm, tiền, giá cả', ['～さえ～ば', '～からには', '～以上は', '～上は', '～限り']),
  d(8, 1, '食事・料理', 'Ăn uống, nấu nướng', ['～あまり', '～ところに', '～ところを', '～最中に', '～うちに']),
  d(9, 1, '交通・移動', 'Giao thông, đi lại', ['～やいなや', '～が早いか', '～なり', '～次第', '～とたん']),
  d(10, 1, '住まい・引越し', 'Nhà ở, chuyển nhà', ['～にあたって', '～に際して', '～において', '～をめぐって', '～に関して']),
  d(11, 1, 'Review Day 1–10', '—', ['Tổng hợp'], 'review'),
  d(12, 1, '趣味・余暇', 'Sở thích, giải trí', ['～たところで', '～たって', '～うが～まいが', '～にしろ～にしろ', '～であれ']),
  d(13, 1, '人間関係', 'Quan hệ, gia đình, bạn bè', ['～あっての', '～ならではの', '～をはじめ', '～にかかわらず', '～を問わず']),
  d(14, 1, '性格・評価', 'Đánh giá người, tính cách', ['～げ', '～げに', '～らしい', '～かのよう', '～まるで']),
  d(15, 1, 'Phase 1 Test', '—', ['Test 75 mẫu P1'], 'test'),

  // ---- PHASE 2 — 日常の流暢化 (Day 16–35) ----
  d(16, 2, '約束・誘い', 'Hẹn, rủ rê, từ chối', ['～ことになっている', '～ことにしている', '～わけにはいかない', '～ものだから', '～もので']),
  d(17, 2, 'お願い・依頼', 'Nhờ vả, lịch sự', ['～ていただけませんか', '～てもらえる?', '～願えますか', '～てほしいんだけど', '～もらえると助かる']),
  d(18, 2, '謝罪・お礼', 'Xin lỗi, cảm ơn', ['～て申し訳ない', '～ばよかった', '～べきだった', '～ところだった', '～せいで']),
  d(19, 2, '意見・賛成反対', 'Ý kiến, đồng/phản đối', ['～と思うんだけど', '～んじゃない?', '～とは限らない', '～わけではない', '～とも言える']),
  d(20, 2, '説明・描写', 'Giải thích, mô tả', ['～というのは', '～って', '～ということだ', '～わけで', '～みたいな']),
  d(21, 2, 'Review 16–20', '—', ['Tổng hợp'], 'review'),
  d(22, 2, '比較・選択', 'So sánh, lựa chọn', ['～に比べて', '～わりに', '～どちらかというと', '～というより', '～にすぎない']),
  d(23, 2, '推測・確信', 'Suy đoán, chắc chắn', ['～に違いない', '～はずだ', '～だろうに', '～かもしれない', '～恐れがある']),
  d(24, 2, '経験・回想', 'Kinh nghiệm, hồi tưởng', ['～たものだ', '～つつあった', '～た覚えがある', '～たことにする', '～かと思うと']),
  d(25, 2, '習慣・傾向', 'Thói quen, xu hướng', ['～がちだ', '～きらいがある', '～ことが多い', '～ようにしている', '～癖がある']),
  d(26, 2, 'Review 16–25', '—', ['Tổng hợp'], 'review'),
  d(27, 2, '失敗・トラブル', 'Thất bại, rắc rối', ['～てしまった', '～ばかりに', '～ものの', '～にもかかわらず', '～くせに']),
  d(28, 2, '計画・予定', 'Kế hoạch, dự định', ['～つもり', '～予定だ', '～ことになる', '～ようと思っている', '～次第']),
  d(29, 2, '希望・願望', 'Mong muốn', ['～たいものだ', '～てほしい', '～ますように', '～たらいいのに', '～といい']),
  d(30, 2, '程度・強調', 'Mức độ, nhấn mạnh', ['～ほど', '～くらい', '～さえ', '～だけに', '～ばかりか']),
  d(31, 2, 'Review 16–30', '—', ['Tổng hợp'], 'review'),
  d(32, 2, 'カジュアル会話', 'Tiếng lóng, casual', ['～じゃん', '～っしょ', '～んだもん', '～ってば', '～かよ']),
  d(33, 2, 'あいづち・反応', 'Aizuchi, phản ứng', ['なるほど系', '～よね', '～でしょ', '～もんね', '～わ (終助詞)']),
  d(34, 2, '電話会話', 'Điện thoại', ['～ておりまして', '～でしょうか', '～かと存じます', '～いたしかねます', '～させていただく']),
  d(35, 2, 'Phase 2 Test', '—', ['Test P2'], 'test'),

  // ---- PHASE 3 — ビジネス基礎 (Day 36–60) ----
  d(36, 3, '敬語の基礎①', 'Sonkeigo cơ bản', ['尊敬語: いらっしゃる', 'おっしゃる', 'なさる', 'ご覧になる', '召し上がる']),
  d(37, 3, '敬語の基礎②', 'Kenjougo cơ bản', ['謙譲語: 伺う', '申す', 'いたす', '拝見する', '存じる']),
  d(38, 3, 'ビジネスメール①', 'Email mở đầu', ['お世話になっております', '〜の件', '〜について', 'ご連絡', '取り急ぎ']),
  d(39, 3, 'ビジネスメール②', 'Email nhờ vả', ['〜いただけますでしょうか', '〜お願い申し上げます', '恐れ入りますが', 'お手数ですが', 'ご確認ください']),
  d(40, 3, 'ビジネスメール③', 'Email từ chối/xin lỗi', ['〜いたしかねます', '申し訳ございません', '〜かねます', '〜次第ご連絡', 'ご了承ください']),
  d(41, 3, 'Review 36–40', '—', ['Tổng hợp Keigo'], 'review'),
  d(42, 3, '会議①入室・進行', '会議 mở đầu', ['それでは始めます', '〜について議論', 'ご意見', '〜と思われます', 'まとめますと']),
  d(43, 3, '会議②意見・提案', '会議 đề xuất', ['〜してはいかがでしょうか', '〜という案', '〜を提案', '〜の方が', '検討する']),
  d(44, 3, '会議③賛成・反対', '会議 đồng/phản', ['おっしゃる通り', '〜という点では', '一方で', '懸念点', '確かに〜が']),
  d(45, 3, '報告・連絡・相談', '報連相', ['ご報告', '〜の件で相談', '共有', '念のため', '取り急ぎご連絡']),
  d(46, 3, 'Review 36–45', '—', ['Tổng hợp'], 'review'),
  d(47, 3, 'スケジュール調整', 'Lịch trình', ['〜でご都合', '〜に変更', '前倒し', '後ろ倒し', '調整']),
  d(48, 3, '進捗報告', 'Báo cáo tiến độ', ['順調', '遅れている', '〜の見込み', '〜済み', '対応中']),
  d(49, 3, '顧客対応', 'Khách hàng', ['ご要望', '承知いたしました', '〜にて対応', 'お詫び', 'ご満足']),
  d(50, 3, '電話応対(ビジネス)', 'Điện thoại BS', ['〜でございます', '少々お待ちください', '折り返し', '申し伝えます', 'お電話差し上げる']),
  d(51, 3, 'Review 36–50', '—', ['Tổng hợp'], 'review'),
  d(52, 3, '依頼・指示', 'Giao việc', ['〜していただけますか', '〜をお願いします', '〜まで', '優先', '確認のうえ']),
  d(53, 3, '問題・バグ報告', 'Bug/sự cố', ['不具合', '発生', '原因', '影響範囲', '再現']),
  d(54, 3, '要件定義', 'Requirement', ['仕様', '要件', '〜が必要', '想定', '前提']),
  d(55, 3, '納期・締切', 'Deadline', ['納期', '締切', '〜までに', '間に合う', '遅延']),
  d(56, 3, 'Review 36–55', '—', ['Tổng hợp'], 'review'),
  d(57, 3, 'プレゼン①', 'Thuyết trình', ['本日は', '〜についてご説明', 'まず', '続いて', '以上です']),
  d(58, 3, 'プレゼン②図表', 'Số liệu, biểu đồ', ['グラフ', '〜が示す通り', '増加傾向', '〜に対して', '比較すると']),
  d(59, 3, '交渉の基礎', 'Đàm phán cơ bản', ['〜であれば', '〜という条件', '譲歩', '折り合い', '前向きに検討']),
  d(60, 3, 'Phase 3 Test', '—', ['Test ビジネス基礎'], 'test'),

  // ---- PHASE 4 — ビジネス応用＋ニュース (Day 61–85) ----
  d(61, 4, 'クレーム対応', 'Xử lý khiếu nại', ['ご迷惑をおかけし', '早急に', '再発防止', '〜とのこと', 'ご指摘']),
  d(62, 4, '謝罪・お詫びメール', 'Email xin lỗi nặng', ['深くお詫び', '〜に起因', '〜のとおり', '善処', '何卒']),
  d(63, 4, 'トラブル対応', 'Sự cố hệ thống', ['障害', '復旧', '暫定対応', '恒久対応', 'エスカレーション']),
  d(64, 4, '交渉応用', 'Đàm phán nâng cao', ['〜を踏まえ', '〜とはいえ', '〜次第では', '落としどころ', '双方']),
  d(65, 4, '契約・条件', 'Hợp đồng', ['契約', '締結', '条項', '有効', '〜に基づき']),
  d(66, 4, 'Review 61–65', '—', ['Tổng hợp'], 'review'),
  d(67, 4, 'ニュース①政治経済', 'Tin chính trị-KT', ['〜とみられる', '〜方針', '〜を受けて', '〜に対し', '〜模様']),
  d(68, 4, 'ニュース②社会', 'Tin xã hội', ['〜が判明', '〜が相次ぐ', '〜にのぼる', '〜恐れ', '〜とみて']),
  d(69, 4, 'ニュース③IT・技術', 'Tin công nghệ', ['〜を発表', '〜を導入', '〜化', '〜を活用', '〜に向けて']),
  d(70, 4, 'ニュース④災害・事故', 'Tin thiên tai', ['〜が発生', '避難', '〜の影響で', '〜とのこと', '確認を急ぐ']),
  d(71, 4, 'Review 61–70', '—', ['Tổng hợp'], 'review'),
  d(72, 4, '数字・統計', 'Số liệu báo cáo', ['〜割', '〜倍', '前年比', '〜を占める', '〜に達する']),
  d(73, 4, '因果・理由(硬)', 'Nhân quả văn viết', ['〜ことから', '〜ゆえに', '〜に起因する', '〜を背景に', '〜の結果']),
  d(74, 4, '逆接・対比(硬)', 'Tương phản văn viết', ['〜とはいえ', '〜ものの', '〜一方', '〜に反して', '〜どころか']),
  d(75, 4, '引用・伝聞', 'Trích dẫn', ['〜によると', '〜とのこと', '〜と述べた', '〜と指摘', '〜という']),
  d(76, 4, 'Review 61–75', '—', ['Tổng hợp'], 'review'),
  d(77, 4, '抽象・論説①', 'Văn luận', ['〜にほかならない', '〜に過ぎない', '〜と言わざるを得ない', '〜かねない', '〜得る']),
  d(78, 4, '抽象・論説②', 'Văn luận', ['〜を余儀なくされる', '〜ずにはおかない', '〜てやまない', '〜に足る', '〜きらいがある']),
  d(79, 4, 'ディスカッション', 'Tranh luận', ['〜という立場', '〜の観点から', '〜を前提に', '〜とは言い切れない', '〜の余地']),
  d(80, 4, '面接・転職', 'Phỏng vấn', ['志望動機', '強み', '〜に携わる', '〜を活かす', '御社']),
  d(81, 4, 'Review 61–80', '—', ['Tổng hợp'], 'review'),
  d(82, 4, '雑談(ビジネス)', 'Small talk BS', ['〜でしてね', '〜なんですよ', 'そういえば', 'ところで', '〜らしいですよ']),
  d(83, 4, '飲み会・社交', 'Giao tiếp xã giao', ['お疲れさまです', '〜さんのおかげで', '乾杯', 'ぶっちゃけ', 'ここだけの話']),
  d(84, 4, 'フィードバック', 'Phản hồi/đánh giá', ['〜してくれて助かる', '〜を改善', '〜が課題', '期待', '伸びしろ']),
  d(85, 4, 'Phase 4 Test', '—', ['Test ビジネス応用＋ニュース'], 'test'),

  // ---- PHASE 5 — 統合・実践 (Day 86–100) ----
  d(86, 5, '一日のシミュレーション①', '出社〜午前', ['Tổng hợp keigo chào hỏi/báo cáo']),
  d(87, 5, '一日のシミュレーション②', '会議〜昼', ['Tổng hợp ngữ pháp 会議']),
  d(88, 5, '一日のシミュレーション③', '午後〜退社', ['Tổng hợp 報連相']),
  d(89, 5, 'プロジェクト進行', 'Quản lý dự án', ['Ôn P3+P4']),
  d(90, 5, '顧客プレゼン本番', 'Pitch khách hàng', ['Ôn presentation']),
  d(91, 5, 'Review 86–90', '—', ['Tổng hợp'], 'review'),
  d(92, 5, '緊急対応シナリオ', 'Khủng hoảng/sự cố', ['Ôn trouble/クレーム']),
  d(93, 5, 'メール総合演習', 'Email tổng hợp', ['Ôn email P3+P4']),
  d(94, 5, '交渉ロールプレイ', 'Đàm phán RP', ['Ôn 交渉']),
  d(95, 5, 'ニュース総合', 'Nghe tin tổng hợp', ['Ôn ニュース文法']),
  d(96, 5, 'Review toàn khóa①', '—', ['Ôn P1–P2'], 'review'),
  d(97, 5, 'Review toàn khóa②', '—', ['Ôn P3'], 'review'),
  d(98, 5, 'Review toàn khóa③', '—', ['Ôn P4–P5'], 'review'),
  d(99, 5, '模擬実務日(終日日本語)', 'Mô phỏng cả ngày', ['Tổng hợp toàn bộ']),
  d(100, 5, 'Final Mastery Test', '—', ['Kiểm tra tổng kết 4 kỹ năng + Business'], 'test'),
];

export const N2_TOTAL_DAYS = N2_DAYS.length;

export function getN2Day(day: number): N2Day | undefined {
  return N2_DAYS.find((x) => x.day === day);
}

export function getN2Phase(id: number): N2Phase | undefined {
  return N2_PHASES.find((p) => p.id === id);
}

export function getN2DaysOfPhase(phaseId: number): N2Day[] {
  return N2_DAYS.filter((x) => x.phase === phaseId);
}

// SRS schedule (for later stages): a day learned on N is reviewed on
// N+1, N+2, N+5, N+10, N+20, N+40, N+80. So Day N's review covers the days
// below that are >= 1.
const SRS_OFFSETS = [1, 2, 5, 10, 20, 40, 80];
export function getSrsSourceDays(n: number): number[] {
  return SRS_OFFSETS.map((o) => n - o).filter((x) => x >= 1);
}
