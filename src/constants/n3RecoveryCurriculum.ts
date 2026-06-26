// JLPT N3 - 60-day curriculum (static backbone for the JLPT Recovery engine).
//
// Based on C:\Users\thanh\Downloads\curriculum-n3.md. Goal: bridge N4 -> N3
// with conversational fluency, reading/listening strength, and core business
// usage. Per-day vocab / grammar / quiz content is generated from each day's
// theme + topic + grammar patterns.

import type {
  RecoveryCurriculumDay,
  RecoveryCurriculumPhase,
  RecoveryDayKind,
} from '../services/jlptRecoveryTypes';

export const N3_PHASES: readonly RecoveryCurriculumPhase[] = [
  { id: 1, jp: 'Joukyuu kibou', vi: 'Nen tang hinh thanh', dayFrom: 1, dayTo: 10, focus: 'Thoi gian, sinh hoat, dang cau co ban, phan xa tu nhien.' },
  { id: 2, jp: 'Riyuu / hikaku', vi: 'Ly do va so sanh', dayFrom: 11, dayTo: 20, focus: 'Nguyen nhan, ket qua, so sanh, lien ket cau, nhan biet sac thai.' },
  { id: 3, jp: 'Nouryoku / ukemi', vi: 'Nang luc va bi dong', dayFrom: 21, dayTo: 30, focus: 'Kha nang, bi dong, nhan / cho, cach noi tu nhien.' },
  { id: 4, jp: 'Hyogen / setsuzoku', vi: 'Noi cau va phien dich', dayFrom: 31, dayTo: 40, focus: 'Mau cau noi, cau phu dinh, cau dieu kien, mo ta day du.' },
  { id: 5, jp: 'Keigo / mail', vi: 'Kinh ngu va email', dayFrom: 41, dayTo: 50, focus: 'Ton kinh / khien nhuong, email cong ty, yeu cau, xac nhan.' },
  { id: 6, jp: 'Dokkai / choukai', vi: 'Doc va nghe N3', dayFrom: 51, dayTo: 60, focus: 'Bao chi, thong bao, tong on tap, bai test cuoi khoa.' },
];

const d = (
  day: number,
  phase: number,
  theme: string,
  vocabTopic: string,
  grammar: string[],
  kind: RecoveryDayKind = 'normal'
): RecoveryCurriculumDay => ({ day, phase, theme, vocabTopic, grammar, kind });

export const N3_DAYS: readonly RecoveryCurriculumDay[] = [
  d(1, 1, 'Thoi gian va nhat ky', 'thoi gian / sinh hoat', ['〜うちに', '〜たあとで', '〜前に', '〜てから']),
  d(2, 1, 'Di lai hang ngay', 'di chuyen / noi chon', ['〜に行く', '〜から', '〜まで', '〜を']),
  d(3, 1, 'Trang thai dang dien ra', 'hien trang / hanh dong', ['〜ている', '〜てある', '〜ておく', '〜てしまう']),
  d(4, 1, 'Tuan suat va thoi quen', 'tan suat / lap lai', ['〜ことがある', '〜たり〜たりする', '〜ながら', '〜ても']),
  d(5, 1, 'Khoang cach va luong', 'so luong / muc do', ['〜やすい', '〜にくい', '〜くらい', '〜ほど']),
  d(6, 1, 'So sanh co ban', 'so sanh / nhan xet', ['〜より', '〜のほうが', '〜一番', '〜だけ']),
  d(7, 1, 'Xin loi va giai thich', 'loi noi / giai thich', ['〜のです', '〜んです', '〜から', '〜でしょう']),
  d(8, 1, 'Thu lam va cam nhan', 'kinh nghiem / cam nhan', ['〜てみる', '〜てみたい', '〜てもいい', '〜てはいけない']),
  d(9, 1, 'Thay doi va tiep dien', 'bien doi / keo dai', ['〜ようになる', '〜なくなる', '〜始める', '〜続ける']),
  d(10, 1, 'Review Day 1-9', '—', ['Tong hop Phase 1'], 'review'),

  d(11, 2, 'Ly do va hau qua', 'nguyen nhan / ket qua', ['〜ので', '〜から', '〜ために', '〜せいで']),
  d(12, 2, 'Ket qua va tinh huong', 'ket qua / hoan canh', ['〜のに', '〜ても', '〜ば', '〜たら']),
  d(13, 2, 'Co dieu kien', 'dieu kien / phan nhan', ['〜ば', '〜たら', '〜なら', '〜と']),
  d(14, 2, 'Tuong phan', 'tuong phan / ngoai le', ['〜のに', '〜ても', '〜ながら', '〜くせに']),
  d(15, 2, 'So sanh muc do', 'so sanh / muc do', ['〜ほど', '〜より', '〜一番', '〜ほど...ない']),
  d(16, 2, 'Loi noi mua / them', 'goi y / de xuat', ['〜ませんか', '〜ましょう', '〜たほうがいい', '〜ように']),
  d(17, 2, 'Co the / khong the', 'kha nang / cho phep', ['〜ことができる', '〜られる', '〜てもいい', '〜なければならない']),
  d(18, 2, 'Trao doi va nhan', 'cho nhan / ung xu', ['〜てあげる', '〜てもらう', '〜てくれる', '〜にしても']),
  d(19, 2, 'Tu nhien va mac nhien', 'tinh trang / xu huong', ['〜ようだ', '〜みたいだ', '〜らしい', '〜っぽい']),
  d(20, 2, 'Review Day 11-19', '—', ['Tong hop Phase 2'], 'review'),

  d(21, 3, 'Kha nang va gioi han', 'nang luc / gioi han', ['〜ことができる', '〜られる', '〜ようになる', '〜しか〜ない']),
  d(22, 3, 'Bi dong co ban', 'bi dong / ket qua', ['〜れる / 〜られる', '〜てある', '〜ておく', '〜しまう']),
  d(23, 3, 'Bi dong trong thuc te', 'bi dong / su viec', ['〜られる', '〜させる', '〜てしまう', '〜てある']),
  d(24, 3, 'Chuyen doi trang thai', 'thay doi / tinh trang', ['〜になる', '〜くなる', '〜ようになる', '〜なくなる']),
  d(25, 3, 'Cau khien / cho phep', 'khien nhuong / cho phep', ['〜させる', '〜させてもらう', '〜させてくれる', '〜させられる']),
  d(26, 3, 'Muc dich va huong den', 'muc dich / huong den', ['〜ために', '〜ように', '〜こと', '〜ようだ']),
  d(27, 3, 'Mau cau tiep noi', 'noi cau / bo sung', ['〜し', '〜たり〜たり', '〜ながら', '〜ところだ']),
  d(28, 3, 'Cach noi ngan gon', 'noi tu nhien', ['〜って', '〜という', '〜だって', '〜なんか']),
  d(29, 3, 'Mau cau rung ro', 'nhan manh / cam xuc', ['〜しまう', '〜ちゃう', '〜ちゃいけない', '〜じゃないか']),
  d(30, 3, 'Review Day 21-29', '—', ['Tong hop Phase 3'], 'review'),

  d(31, 4, 'Ghep cau va ly giai', 'mau cau noi', ['〜ので', '〜から', '〜ために', '〜ことだから']),
  d(32, 4, 'Mo ta chi tiet', 'bo nghia / mo ta', ['〜ような', '〜みたいな', '〜らしい', '〜っぽい']),
  d(33, 4, 'Phu dinh va han che', 'phu dinh / gioi han', ['〜ないで', '〜なくて', '〜ずに', '〜しか〜ない']),
  d(34, 4, 'Cau dieu kien nang', 'neu / gia su', ['〜ば', '〜たら', '〜なら', '〜と']),
  d(35, 4, 'Cau nhan manh', 'nhan manh / ket luan', ['〜はもちろん', '〜だけでなく', '〜ばかりでなく', '〜というより']),
  d(36, 4, 'Cau so sanh va doi lap', 'so sanh / doi lap', ['〜に比べて', '〜に対して', '〜一方で', '〜反面']),
  d(37, 4, 'Van phong tu nhien', 'noi nhu nguoi nhat', ['〜って', '〜だって', '〜なんか', '〜かな']),
  d(38, 4, 'Noi ve y kien', 'quan diem / danh gia', ['〜と思う', '〜ようだ', '〜らしい', '〜そうだ']),
  d(39, 4, 'Cau trung gian', 'gian doan / ket noi', ['〜ところ', '〜ところで', '〜てから', '〜うちに']),
  d(40, 4, 'Review Day 31-39', '—', ['Tong hop Phase 4'], 'review'),

  d(41, 5, 'Ton kinh co ban', 'kinh ngu / ton trong', ['〜らっしゃる', '〜お〜になる', '〜なさる', '〜ていらっしゃる']),
  d(42, 5, 'Khien nhuong co ban', 'khien nhuong / khiem ton', ['〜いたす', '〜申し上げる', '〜いただく', '〜でございます']),
  d(43, 5, 'Email cong ty', 'email / trao doi', ['〜ております', '〜いたします', '〜の件', '〜につきまして']),
  d(44, 5, 'Xin phep va yeu cau', 'yeu cau / xin phep', ['〜ていただけますか', '〜てもよろしいですか', '〜お願いできますか', '〜でしょうか']),
  d(45, 5, 'Doi nguoi nghe', 'cach noi lich su', ['〜させていただく', '〜てくださる', '〜申し訳ありません', '〜恐れ入ります']),
  d(46, 5, 'Thong bao noi bo', 'thong bao / bao cao', ['〜ことになっています', '〜予定です', '〜次第', '〜までに']),
  d(47, 5, 'Xac nhan va hoi lai', 'xac nhan / lam ro', ['〜でよろしいですか', '〜ということで', '〜という意味ですか', '〜ということですか']),
  d(48, 5, 'Thu tu va quy trinh', 'quy trinh / buoc', ['〜まず', '〜次に', '〜その後', '〜最後に']),
  d(49, 5, 'Gui may va hop tac', 'hop tac / lam viec', ['〜お手数ですが', '〜よろしくお願いします', '〜ご確認ください', '〜ご連絡ください']),
  d(50, 5, 'Review Day 41-49', '—', ['Tong hop Phase 5'], 'review'),

  d(51, 6, 'Doc tin ngan', 'bao chi / thong bao', ['〜によると', '〜とされている', '〜ということだ', '〜見込みだ']),
  d(52, 6, 'Doc email / thong bao', 'email / thong bao', ['〜の件', '〜につきまして', '〜ご確認のほど', '〜お願い申し上げます']),
  d(53, 6, 'Nghe hoi thoai', 'hoi thoai / phan hoi', ['〜って', '〜じゃない', '〜かな', '〜だよね']),
  d(54, 6, 'Noi dung cuoc hop', 'meeting / biet o dau', ['〜に関して', '〜を踏まえて', '〜という点で', '〜に基づいて']),
  d(55, 6, 'Tong hop business', 'cong viec / phat bieu', ['〜報告', '〜連絡', '〜相談', '〜確認']),
  d(56, 6, 'Tong hop doc hieu', 'doc hieu / y chinh', ['〜という意味', '〜に対して', '〜に比べて', '〜に加えて']),
  d(57, 6, 'Tong hop nghe hieu', 'nghe hieu / thong tin', ['〜らしい', '〜ようだ', '〜そうだ', '〜とのことだ']),
  d(58, 6, 'Ranh gioi N3', 'dau muc cuoi khoa', ['〜ばかり', '〜しか〜ない', '〜ようにする', '〜ておく']),
  d(59, 6, 'Review Day 51-58', '—', ['Tong hop toan khoa N3'], 'review'),
  d(60, 6, 'N3 Summary Test', '—', ['Tong hop toan bo N3'], 'test'),
];

export const N3_TOTAL_DAYS = N3_DAYS.length;
