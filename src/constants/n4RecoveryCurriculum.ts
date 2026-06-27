// JLPT N4 — 40-day curriculum (static backbone for the JLPT Recovery engine).
//
// Transcribed from the owner's N4 Master Curriculum (Downloads/curriculum-n4.md).
// Audience: finished N5. Goal: fluent everyday conversation, 普通形, voice
// (potential/passive/causative), basic keigo. Per-day vocab/grammar/quiz is
// generated from each day's theme + topic + grammar patterns.

import type {
  RecoveryCurriculumDay,
  RecoveryCurriculumPhase,
  RecoveryDayKind,
} from '../services/jlptRecoveryTypes';

export const N4_PHASES: readonly RecoveryCurriculumPhase[] = [
  {
    id: 1,
    jp: '普通形・意見・推量',
    vi: 'Thể thường, ý kiến & suy đoán',
    dayFrom: 1,
    dayTo: 8,
    focus: 'Thể 普通形, 〜と思う, suy đoán (そう/らしい/みたい/はず), て形応用.',
  },
  {
    id: 2,
    jp: '条件・授受',
    vi: 'Điều kiện & cho-nhận',
    dayFrom: 9,
    dayTo: 16,
    focus: 'たら/ば/と/なら, 授受 (て形), nhờ vả lịch sự, thời điểm.',
  },
  {
    id: 3,
    jp: 'ヴォイス',
    vi: 'Thể (khả năng/bị động/sai khiến)',
    dayFrom: 17,
    dayTo: 26,
    focus: 'Khả năng · bị động · sai khiến · sai khiến-bị động · 自他 · 変化.',
  },
  {
    id: 4,
    jp: '意志・予定・複文',
    vi: 'Ý chí, dự định & câu phức',
    dayFrom: 27,
    dayTo: 34,
    focus: 'Ý chí/dự định, nghĩa vụ, suy định, dẫn lời, điều kiện phức.',
  },
  {
    id: 5,
    jp: '敬語入門・まとめ',
    vi: 'Nhập môn kính ngữ & tổng ôn',
    dayFrom: 35,
    dayTo: 40,
    focus: '尊敬語 · 謙譲語 · thực hành lịch sự · tổng ôn.',
  },
];

const d = (
  day: number,
  phase: number,
  theme: string,
  vocabTopic: string,
  grammar: string[],
  kind: RecoveryDayKind = 'normal'
): RecoveryCurriculumDay => ({ day, phase, theme, vocabTopic, grammar, kind });

export const N4_DAYS: readonly RecoveryCurriculumDay[] = [
  // ---- PHASE 1 — 普通形・意見・推量 (Day 1–8) ----
  d(1, 1, '普通形と意見', 'Sinh hoạt mở rộng · cảm nghĩ', [
    '普通形（現在/過去・肯定/否定）',
    '〜と思います',
    '〜と言いました',
    '〜でしょう',
  ]),
  d(2, 1, '推量・確信', 'Dự đoán · xác suất', [
    '〜かもしれません',
    '〜だろう／でしょう',
    '〜はずです',
    '〜はずがない',
  ]),
  d(3, 1, '伝聞・様態', 'Tin tức nhẹ · ngoại hình', [
    '〜そうです（伝聞）',
    '〜そうです（様態）',
    '〜らしいです',
    '〜みたいです',
  ]),
  d(4, 1, '理由・説明', 'Nguyên nhân · giải thích', [
    '〜ので',
    '〜のに',
    '〜し',
    '〜ため(に)',
  ]),
  d(5, 1, '性質・程度', 'Tính chất · mức độ', [
    '〜すぎる',
    '〜やすい／〜にくい',
    '〜方(かた)',
    '〜がる／〜たがる',
  ]),
  d(6, 1, '完了・試行', 'Hành động hoàn tất', [
    '〜てしまう',
    '〜ておく',
    '〜てみる',
    '〜たところ',
  ]),
  d(7, 1, '方向・継続', 'Biến đổi theo thời gian', [
    '〜ていく',
    '〜てくる',
    '〜始める／〜終わる／〜続ける',
    'もう／まだ',
  ]),
  d(8, 1, 'Review Day 1–7', '—', ['Tổng hợp 普通形・推量・て形応用'], 'review'),

  // ---- PHASE 2 — 条件・授受 (Day 9–16) ----
  d(9, 2, '条件① たら', 'Giả định · tình huống', [
    '〜たら',
    'もし〜たら',
    '〜たらどうですか',
    '〜たら（phát hiện kết quả）',
  ]),
  d(10, 2, '条件② ば', 'Điều kiện · tỉ lệ', [
    '〜ば',
    '〜ば〜ほど',
    '〜なければ',
    '〜さえ〜ば',
  ]),
  d(11, 2, '条件③ と・なら', 'Quy luật · lời khuyên', [
    '〜と（tự nhiên/quy luật）',
    '〜なら',
    '〜ても',
    '〜たって',
  ]),
  d(12, 2, '授受(て形)', 'Giúp đỡ qua lại', [
    '〜てあげる',
    '〜てくれる',
    '〜てもらう',
    '〜てくれてありがとう',
  ]),
  d(13, 2, '依頼・丁寧', 'Nhờ vả lịch sự', [
    '〜ていただけませんか',
    '〜てもらえますか',
    '〜てほしい',
    '〜ようにお願いします',
  ]),
  d(14, 2, '時・場面', 'Thời điểm · khoảng thời gian', [
    '〜とき',
    '〜あいだ／〜あいだに',
    '〜まで／〜までに',
    '〜ところ（3 thì）',
  ]),
  d(15, 2, '並行・付帯', 'Hành động kèm theo', [
    '〜ながら',
    '〜まま',
    '〜ずに',
    '〜ないで',
  ]),
  d(16, 2, 'Review Day 9–15', '—', ['Tổng hợp 条件・授受・時'], 'review'),

  // ---- PHASE 3 — ヴォイス (Day 17–26) ----
  d(17, 3, '可能', 'Khả năng · giác quan', [
    '可能形（られる）',
    '〜ことができる',
    '〜が＋可能',
    '見える／聞こえる',
  ]),
  d(18, 3, '受身① 直接', 'Bị động cơ bản', [
    '受身形',
    '〜に〜られる',
    '〜は〜に〜られる',
    'AはBに〜される',
  ]),
  d(19, 3, '受身② 迷惑・客観', 'Bị động phiền/khách quan', [
    '迷惑の受身',
    '〜に〜を〜られる',
    '〜によって',
    '物が主語の受身',
  ]),
  d(20, 3, '使役①', 'Sai khiến', [
    '使役形（させる）',
    '〜に〜させる',
    '〜を〜させる',
    '〜させてください',
  ]),
  d(21, 3, '使役② 許可・恩恵', 'Cho phép · ơn huệ', [
    '〜させてあげる',
    '〜させておく',
    '〜させてもらう',
    '〜させていただく',
  ]),
  d(22, 3, '使役受身', 'Bị bắt làm', [
    '使役受身形',
    '〜に〜させられる',
    '短縮形（〜される）',
    '感情の使役受身',
  ]),
  d(23, 3, '自動詞・他動詞', 'Cặp tự/tha · trạng thái', [
    '自他のペア',
    '〜ている（自）',
    '〜てある（他/kết quả）',
    '〜ておく（復習）',
  ]),
  d(24, 3, '変化・決定', 'Quyết định · biến đổi', [
    '〜ようにする',
    '〜ようになる',
    '〜ことにする',
    '〜ことになる',
  ]),
  d(25, 3, '目的', 'Mục đích · nỗ lực', [
    '〜ように（để）',
    '〜ために（để/vì）',
    '〜のに（dùng để）',
    '〜ように言う',
  ]),
  d(26, 3, 'Review Day 17–25', '—', ['Tổng hợp ヴォイス・変化・目的'], 'review'),

  // ---- PHASE 4 — 意志・予定・複文 (Day 27–34) ----
  d(27, 4, '意志・予定', 'Kế hoạch · dự định', [
    '〜(よ)うと思う',
    '〜つもり',
    '〜予定',
    '〜ことにしている',
  ]),
  d(28, 4, '命令・助言', 'Mệnh lệnh · khuyên', [
    '命令形',
    '禁止形（〜な）',
    '〜なさい',
    '〜たほうがいい／〜ないほうがいい',
  ]),
  d(29, 4, '義務・必要', 'Bổn phận · quy định', [
    '〜なければならない',
    '〜なくてはいけない',
    '〜べき',
    '〜必要がある',
  ]),
  d(30, 4, '推定・様態深化', 'Suy đoán · biểu hiện', [
    '〜ようだ',
    '〜みたいだ',
    '〜らしい（復習）',
    '〜っぽい',
  ]),
  d(31, 4, '引用・伝達', 'Truyền đạt · trích lời', [
    '〜と言う／〜と伝える',
    '〜と聞く',
    '〜って（khẩu ngữ）',
    '〜ということ',
  ]),
  d(32, 4, '条件複合', 'Tổng hợp điều kiện', [
    '〜場合',
    '〜際',
    '〜たら／ば／と／なら（対比）',
    '〜ても（復習）',
  ]),
  d(33, 4, '程度・限定', 'Giới hạn · phạm vi', [
    '〜ばかり',
    '〜だけ',
    '〜しか〜ない',
    '〜くらい／ぐらい',
  ]),
  d(34, 4, 'Review Day 27–33', '—', ['Tổng hợp 意志・義務・複文'], 'review'),

  // ---- PHASE 5 — 敬語入門・まとめ (Day 35–40) ----
  d(35, 5, '丁寧表現', 'Lịch sự cơ bản · cửa hàng', [
    '〜でございます',
    'お〜です',
    '〜ております',
    'よろしいでしょうか',
  ]),
  d(36, 5, '尊敬語', 'Tôn kính · đối tác', [
    '尊敬の〜れる／られる',
    'お〜になる',
    'いらっしゃる／おっしゃる／召し上がる',
    'ご〜になる',
  ]),
  d(37, 5, '謙譲語', 'Khiêm nhường · bản thân', [
    'お〜する',
    '〜いたす',
    '伺う／申す／いたす',
    '〜ていただく／〜させていただく',
  ]),
  d(38, 5, '敬語実践', 'Chào hỏi · điện thoại · cảm ơn', [
    'あいさつ敬語',
    '電話表現',
    '依頼の敬語',
    'お礼・お詫び表現',
  ]),
  d(39, 5, '総復習① (Day 1–20)', '—', ['Tổng hợp nửa đầu N4'], 'review'),
  d(40, 5, 'N4 総まとめテスト', '—', ['Tổng hợp toàn bộ N4 (~160 mẫu)'], 'test'),
];

export const N4_TOTAL_DAYS = N4_DAYS.length;
