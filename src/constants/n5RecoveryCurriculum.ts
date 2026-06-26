// JLPT N5 — 30-day curriculum (static backbone for the JLPT Recovery engine).
//
// Transcribed from the owner's N5 Master Curriculum (Downloads/curriculum-n5.md).
// Fixed source of truth: the Lab screens browse it and per-day vocab/grammar/
// quiz content is generated from each day's theme + topic + grammar patterns.
// Target audience: beginners / rebuilding the basics. NOT exam drilling.

import type {
  RecoveryCurriculumDay,
  RecoveryCurriculumPhase,
  RecoveryDayKind,
} from '../services/jlptRecoveryTypes';

export const N5_PHASES: readonly RecoveryCurriculumPhase[] = [
  {
    id: 1,
    jp: '文の基礎',
    vi: 'Nền tảng câu',
    dayFrom: 1,
    dayTo: 7,
    focus: 'Câu です/だ, trợ từ lõi, tồn tại, số-thời gian, động từ ます.',
  },
  {
    id: 2,
    jp: '形容詞・描写',
    vi: 'Tính từ & miêu tả',
    dayFrom: 8,
    dayTo: 13,
    focus: 'い/な形容詞, mô tả, sở thích, di chuyển.',
  },
  {
    id: 3,
    jp: '動詞活用・依頼',
    vi: 'Chia động từ & nhờ vả',
    dayFrom: 14,
    dayTo: 20,
    focus: 'て形/ない形/辞書形/た形, nhờ-rủ, mong muốn.',
  },
  {
    id: 4,
    jp: '接続・比較・まとめ',
    vi: 'Nối câu, so sánh & tổng ôn',
    dayFrom: 21,
    dayTo: 30,
    focus: 'Lý do, so sánh, thời điểm, 授受, tổng ôn.',
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

export const N5_DAYS: readonly RecoveryCurriculumDay[] = [
  // ---- PHASE 1 — 文の基礎 (Day 1–7) ----
  d(1, 1, '自己紹介', 'Tên · nghề nghiệp · quốc tịch · đại từ (私/あなた)', [
    '〜は〜です',
    '〜は〜ですか',
    '〜じゃ（では）ありません',
    '〜も',
  ]),
  d(2, 1, 'これ・それ・あれ', 'Đồ vật xung quanh · văn phòng phẩm', [
    'これ／それ／あれ',
    'この／その／あの＋N',
    '〜の (sở hữu/thuộc)',
    '〜のN',
  ]),
  d(3, 1, '場所・存在', 'Nơi chốn · đồ trong phòng · phương hướng', [
    'ここ／そこ／あそこ',
    '〜に〜があります／います',
    '〜は〜にあります',
    '〜や〜',
  ]),
  d(4, 1, '数・お金', 'Số đếm · tiền · giá cả · 助数詞', [
    '数字 (1〜9999)',
    '〜つ／〜個／〜人／〜枚',
    'いくら',
    '〜は〜円です',
  ]),
  d(5, 1, '時間・曜日', 'Giờ · phút · thứ · ngày tháng', [
    '〜時〜分',
    '曜日・日付',
    '〜から〜まで',
    '〜に (thời điểm)',
  ]),
  d(6, 1, '一日の動作', 'Động từ sinh hoạt (起きる·寝る·食べる·飲む)', [
    '〜ます／〜ません',
    '〜を＋V',
    '〜で (nơi hành động)',
    '何を／どこで',
  ]),
  d(7, 1, 'Review Day 1–6', '—', ['Tổng hợp 〜です・存在・động từ ます'], 'review'),

  // ---- PHASE 2 — 形容詞・描写 (Day 8–13) ----
  d(8, 2, 'い形容詞', 'Tính từ い (大きい·新しい·楽しい)', [
    'い形〜です',
    '〜くないです',
    '〜かったです',
    '〜くなかったです',
  ]),
  d(9, 2, 'な形容詞', 'Tính từ な (静か·便利·有名)', [
    'な形〜です',
    '〜じゃないです',
    '〜な＋N',
    '〜でした',
  ]),
  d(10, 2, '描写・程度', 'Màu sắc · hình dạng · cảm nhận', [
    'い形/な形＋N',
    'どんな',
    'とても／あまり〜ない',
    '〜くて／〜で (nối)',
  ]),
  d(11, 2, '好き・希望', 'Sở thích · món ăn · hoạt động', [
    '〜が好き／嫌い／上手／下手',
    '〜が欲しい',
    '〜がわかる',
    '〜がいる（cần→要る）',
  ]),
  d(12, 2, '移動・交通', 'Phương tiện · ga · vé · đường đi', [
    '〜で (phương tiện)',
    '〜から〜まで',
    '〜に乗る／〜を降りる',
    'どうやって',
  ]),
  d(13, 2, 'Review Day 8–12', '—', ['Tổng hợp 形容詞・好き嫌い'], 'review'),

  // ---- PHASE 3 — 動詞活用・依頼 (Day 14–20) ----
  d(14, 3, 'て形①', 'Nhóm động từ (I/II/III) · hành động', [
    'て形 (cách chia)',
    '〜てください',
    '〜ています (đang làm)',
    '〜てから',
  ]),
  d(15, 3, 'て形②', 'Hành động liên tiếp · cho phép/cấm', [
    '〜て、〜 (nối)',
    '〜てもいいです',
    '〜てはいけません',
    '〜ている (trạng thái)',
  ]),
  d(16, 3, 'ない形', 'Thể phủ định · quy tắc', [
    'ない形',
    '〜ないでください',
    '〜なくてもいいです',
    '〜なければなりません',
  ]),
  d(17, 3, '辞書形', 'Thể từ điển · sở thích · khả năng', [
    '辞書形',
    '〜ことができます',
    '〜前に',
    '趣味は〜ことです',
  ]),
  d(18, 3, 'た形', 'Thể quá khứ ngắn · kinh nghiệm', [
    'た形',
    '〜たことがあります',
    '〜たり〜たりします',
    '〜た後で',
  ]),
  d(19, 3, '依頼・勧誘', 'Nhờ vả · rủ rê · đề nghị', [
    '〜ませんか',
    '〜ましょう',
    '〜ましょうか',
    '〜をください',
  ]),
  d(20, 3, 'Review Day 14–19', '—', ['Tổng hợp 活用形・依頼'], 'review'),

  // ---- PHASE 4 — 接続・比較・まとめ (Day 21–30) ----
  d(21, 4, '願望・目的', 'Dự định · mục đích · nơi đến', [
    '〜たいです',
    '〜たくないです',
    '〜に行きます／来ます (mục đích)',
    '〜たがる (intro)',
  ]),
  d(22, 4, '理由・逆接', 'Cảm xúc · lý do · vì sao', [
    '〜から (lý do)',
    '〜が (nhưng)',
    'どうして／なぜ',
    '〜ので (intro)',
  ]),
  d(23, 4, '比較', 'So sánh · lựa chọn', [
    '〜より〜のほうが',
    '〜の中で〜が一番',
    '〜と〜とどちらが',
    '〜と同じ',
  ]),
  d(24, 4, '時の表現', 'Thời điểm · trình tự', [
    '〜とき',
    '〜前に／〜後で',
    'もう／まだ',
    '〜ながら (intro)',
  ]),
  d(25, 4, '授受', 'Cho · nhận · quà tặng', [
    '〜をあげます',
    '〜をもらいます',
    '〜をくれます',
    '〜に (người nhận/cho)',
  ]),
  d(26, 4, '変化・状態', 'Thời tiết · cảm giác thay đổi', [
    '〜くなる／〜になる',
    'まだ〜ていません',
    '〜ているところ (intro)',
    'もう〜ました',
  ]),
  d(27, 4, '助詞まとめ', 'Ôn trợ từ qua tình huống', [
    'は／が',
    'を／に／で／へ／と',
    'も／の／から／まで',
    'や／とか',
  ]),
  d(28, 4, '表現・あいさつ', 'Mẫu giao tiếp · chào hỏi · điện thoại', [
    '〜でしょう',
    '〜と思います (intro)',
    '〜と言いました (intro)',
    'あいさつ慣用句',
  ]),
  d(29, 4, '総復習① (Day 1–15)', '—', ['Tổng hợp nửa đầu N5'], 'review'),
  d(30, 4, 'N5 総まとめテスト', '—', ['Tổng hợp toàn bộ N5 (95 mẫu)'], 'test'),
];

export const N5_TOTAL_DAYS = N5_DAYS.length;
