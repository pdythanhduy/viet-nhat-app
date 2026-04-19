# BJT Document Layout

Nguon chuan hien tai:
- `BJT_ULTIMATE_BOOK_2026.json`

Nguon mock mo rong de doi chieu rieng:
- `BJT_50_MOCK_EXAMS_V2.json`

Thu muc `partitioned/` la bo file tach tu nguon chuan, de app va cong viec bien tap dung on dinh:
- `meta.json`
- `vocabulary.json`
- `keigo.json`
- `scenarios.json`
- `mock_test.json`
- `email_templates.json`
- `business_manners.json`
- `kanji.json`
- `grammar.json`
- `cv_templates.json`
- `abbreviations.json`
- `reading_passages.json`
- `flashcard_sets.json`
- `study_plan.json`
- `manifest.json`
- `legacy_runtime_vocabulary.json`
- `legacy_runtime_practice_questions.json`

Thu muc `legacy/` chua cac file doi chieu cu:
- `legacy/bjt_vocab_697.csv`
- `legacy/bjt_vocab_697.json`
- `legacy/bjt_878_vocab.csv`
- `legacy/bjt_878_vocab.json`
- `legacy/bjt_960_vocab.csv`
- `legacy/bjt_book_complete_1000.json`
- `legacy/bjt_book_master_2026.json`

Nguyen tac su dung:
- App nen doc tu `partitioned/` thay vi doc truc tiep nhieu file root khac nhau.
- Hai file `legacy_runtime_*.json` la ban xuat sach cua runtime legacy, dung de giu tuong thich app ma khong de du lieu mojibake nam inline trong `bjt.ts`.
- Neu cap nhat noi dung tong, sua `BJT_ULTIMATE_BOOK_2026.json` truoc.
- Sau do sinh lai `partitioned/` de dong bo.
- De sinh lai bo `partitioned/` tu nguon ultimate, chay `npm run bjt:partition-ultimate`.
- Neu can tai sinh bo runtime legacy, chay `npm run bjt:export-legacy-runtime`.
- Neu can review nhanh noi dung runtime theo level/skill/theme ma khong mo JSON lon, chay `npm run bjt:audit-runtime -- --bank questions --level J3 --skill reading --limit 3`.
- Vi du review tu vung: `npm run bjt:audit-runtime -- --bank vocabulary --theme email --limit 5`.
- Neu can audit bo `50 mock exams`, chay `npm run bjt:audit-mock-v2 -- --limit 2`.
- Vi du audit 1 de cu the ra file UTF-8: `npm run bjt:audit-mock-v2 -- --exam BJT_MOCK_01 --out docs/bjt/document/mock-v2-audit.txt`.
- Neu PowerShell hien thi Unicode loi, ghi report ra file UTF-8: `npm run bjt:audit-runtime -- --bank questions --level J3 --limit 3 --out docs/bjt/document/partitioned/j3-audit.txt`.
- Neu van muon xem ngay trong terminal, them `--escape-unicode` de in dang `\uXXXX` chinh xac.
- File trong `legacy/` chi de doi chieu lich su, khong nen dung lam nguon cho app.
- `BJT_50_MOCK_EXAMS_V2.json` hien xac nhan dung `50 de / 4000 cau / 76 cau goc`, nhung level thuc te trong file hien chi co `J4, J3, J2`. Khong nen claim `J5 -> J1+` neu chua bo sung du lieu.
