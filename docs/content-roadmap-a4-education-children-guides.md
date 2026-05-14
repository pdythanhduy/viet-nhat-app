# Content backlog — Batch A4: Education / children

**Date:** 2026-05-09
**Source backlog:** `docs/full-content-backlog-45-guides.md`
**Batch:** A4 — Education / children
**Scope:** chỉ thêm 3 guide mới. Không sửa UI, không bump version, không thêm asset mới.
**Release context:** v1.3.2 đang chờ Apple Review. Batch A4 sẽ thuộc release tiếp theo (v1.3.3 hoặc v1.4.0).

---

## Guides added

| # | id | title | titleJp | category | priority |
|---|---|---|---|---|---|
| 1 | `japanese-school-system-children` | Hệ thống trường học Nhật Bản cho con | 日本の学校制度 — 外国人の子ども | daily-law | normal |
| 2 | `japanese-language-support-children` | Hỗ trợ tiếng Nhật cho con (日本語指導) | 外国人の子どもへの日本語指導 | daily-law | normal |
| 3 | `child-allowance-jidou-teate` | Trợ cấp trẻ em (児童手当) | 児童手当 — 外国人家庭の申請 | money | normal |

Categories: 2 guide thuộc `daily-law` (giáo dục dân sự), 1 guide thuộc `money` (financial benefit).

## Files created

```
src/constants/content/adminGuides/guides/japanese-school-system-children.ts
src/constants/content/adminGuides/guides/japanese-language-support-children.ts
src/constants/content/adminGuides/guides/child-allowance-jidou-teate.ts
docs/content-roadmap-a4-education-children-guides.md
```

## Files modified

```
src/constants/content/adminGuides/guides/index.ts   (3 imports + 3 array entries)
```

## ADMIN_GUIDES count

- Before A4 (sau A3): **90**
- After A4: **93** (+3)

## Hero images reused

| Guide | Hero image | Notes |
|---|---|---|
| `japanese-school-system-children` | none | Không có asset school phù hợp |
| `japanese-language-support-children` | none | Không có asset language phù hợp |
| `child-allowance-jidou-teate` | none | Không có asset child-allowance phù hợp |

Tất cả 3 guide priority `normal` không cần heroImage. Không thêm asset mới.

## Counter phrases per guide

| Guide | Count |
|---|---|
| `japanese-school-system-children` | 7 |
| `japanese-language-support-children` | 7 |
| `child-allowance-jidou-teate` | 8 |

Tất cả jp + romaji + vn + note. **Tổng: 22 câu mới.**

## Search keywords added

| Guide | Count | Notable terms |
|---|---|---|
| `japanese-school-system-children` | 20 | trường học Nhật, cho con đi học, chuyển trường, 小学校, 中学校, 高校, 義務教育, 就学通知書, 編入, 給食, PTA, gakkou |
| `japanese-language-support-children` | 14 | tiếng Nhật cho con, dạy kèm tiếng Nhật, 日本語指導, 取り出し授業, 国際教室, 日本語教室, 多文化共生, 巡回指導, ボランティア, JSL |
| `child-allowance-jidou-teate` | 16 | trợ cấp trẻ em, 児童手当, jidou teate, tiền cho con, sinh con ở Nhật, 認定請求, 現況届, こども家庭庁 |

**Tổng 50 search keywords mới.**

## Source status per guide

| Guide | Sources | Mức tin cậy |
|---|---|---|
| `japanese-school-system-children` | 文部科学省 (mext.go.jp) | **HOMEPAGE LEVEL** — MEXT quản lý 学校教育法 toàn quốc; quy trình cụ thể tùy 市町村 |
| `japanese-language-support-children` | 文部科学省 (mext.go.jp) | **HOMEPAGE LEVEL** — MEXT có chính sách 日本語指導 chung; coverage tùy 市町村 |
| `child-allowance-jidou-teate` | こども家庭庁 (cfa.go.jp) | **HOMEPAGE LEVEL** — こども家庭庁 (Children and Families Agency, lập 2023) quản lý 児童手当 |

KHÔNG bịa deep-link. Tất cả homepage level chính thức .go.jp.

## Items needing official source check

⚠️ **`child-allowance-jidou-teate` có policy mới đang đổi (10/2024):**

1. **児童手当 cải cách 10/2024** — bỏ 所得制限, kéo dài đến 18 tuổi (高校生まで), tăng cho con thứ 3+, lịch chi trả từ 4 lần → 6 lần/năm (mỗi 2 tháng). Đã hedge "kiểm tra với 市役所 vì policy thay đổi". **Cần verify deep-link こども家庭庁 cho mức tiền chính xác** trước khi user dựa vào.
2. **Mức tiền cụ thể (yen/tháng)** — KHÔNG đưa số chi tiết trong guide vì:
   - Khác nhau theo tuổi (0–3, 3–小学校, 中学, 高校)
   - Khác nhau theo số con thứ mấy
   - Có thay đổi gần đây (10/2024) — chưa verify nguồn deep-link
3. **現況届 yêu cầu** — một số 市 đã bỏ từ 2022, một số vẫn giữ. Đã hedge "tùy 市".
4. **15 ngày deadline backdate** — quy định MEXT/こども家庭庁 chuẩn quốc gia, ổn định.

**`japanese-school-system-children`:**

5. **高校無償化 (miễn học phí cao trung)** — có ngưỡng thu nhập, đã hedge "Hỏi 都道府県 教育委員会".
6. **就学援助 (hỗ trợ học)** cho gia đình thu nhập thấp — tùy 市町村, đã hedge.
7. **Phí đầu vào 小学校** (50,000–100,000円, ランドセル 30,000–80,000円) — range tham khảo, đã hedge.
8. **Quy trình 入試 高校** — tùy 都道府県. Đã direct user hỏi 中学校.

**`japanese-language-support-children`:**

9. **Coverage 日本語指導 cụ thể từng 市** — chưa list. Đã hedge "không phải mọi trường đều có".
10. **Hotline いじめ相談 0120-0-78310** — số chính thức (MEXT 24時間子供SOSダイヤル) — verify trang MEXT.
11. **Tài liệu 「かすたねっと」** — verify URL chính xác trên trang MEXT (đã mention nhưng không link).

## Items needing native / user review

(Pending list — gom với A1–A3 trong `docs/native-legal-review-pending-a1-a3.md`. Sẽ update doc đó sau khi pass review xong A4.)

1. **Counter phrase tone trường học**: `子どもの学校手続きをしたいです` — có natural ở quầy 市役所?
2. **Counter phrase y/c hỗ trợ tiếng Nhật**: `日本語指導はありますか` + `取り出し授業をお願いしたいです` — có quá formal / soft?
3. **Counter phrase 児童手当 quan hệ**: `子どもが生まれたので、申請したいです` — có đủ rõ?
4. **Vietnamese wording "song ngữ"**: phần FAQ dạy con cân bằng tiếng Việt + Nhật — có quá nghiêng về một bên?
5. **児童手当 mức tiền specifics**: native confirm có nên thêm range yen tham khảo (vd "10,000–30,000円/tháng tùy tuổi") hay giữ "kiểm tra với 市役所"?
6. **`認定請求書` Vietnamese translation**: đang dùng "đơn xin trợ cấp lần đầu" — có đúng không?
7. **`受給事由消滅届` Vietnamese**: đang dùng "form chuyển" — có cần dài hơn?

## Style notes (tuân thủ execution rules)

- **Action-first**: mỗi guide bắt đầu bằng `quickAction` "phải làm gì NGAY". Steps theo timeline (trước → trong → sau).
- **Tone tự nhiên**: dùng "thường", "tùy", "có thể", "kiểm tra với 市役所". Tránh tuyệt đối.
- **Không bịa fact**: mức tiền 児童手当 KHÔNG đưa con số cụ thể (chỉ hedge "tùy tuổi + số con"). Phí trường học hedged range.
- **Không bịa URL**: 1 official link mỗi guide (homepage level .go.jp).
- **Cross-reference**:
  - `japanese-school-system-children` → tham chiếu `japanese-language-support-children`
  - `japanese-language-support-children` → tham chiếu `japanese-school-system-children`
  - `child-allowance-jidou-teate` → tham chiếu `baby-born-in-japan` (sinh con) + `bank-account` (mở tài khoản)
- **Counter phrases**: focus vào câu thiết thực tại quầy 市役所 / qua điện thoại / 連絡帳 trường.
- **Safety wording cho 児童手当**: KHÔNG hứa số tiền cụ thể, hedge "kiểm tra với 市役所" + nhắc rõ policy đổi 10/2024.
- **Cha mẹ tâm lý**: phần "khi gặp khó" trong `japanese-school-system-children` Step 6 + FAQ `japanese-language-support-children` về con không muốn đi học — hướng dẫn nguồn hỗ trợ thực tế (担任 → 教育委員会 → 多文化共生センター → hotline).

## Verification results

| Check | Result |
|---|---|
| `npm run typecheck` | ✅ PASS |
| `npm run test:ci` | ✅ PASS — **251/251 tests** |
| `npm run verify:content` | ✅ PASS — 0 issues |
| `npm run verify` (full chain) | ✅ PASS |

Pre-commit hook chạy lại khi commit — pass.

---

## Batch A4 done — KHÔNG phải batch A5

Theo execution rule: 3–5 guide / batch. Batch A4 có 3 guide đúng quy định. **KHÔNG implement Batch A5 trong PR này.**

Khi user yêu cầu batch tiếp theo, làm theo `docs/full-content-backlog-45-guides.md` Batch A5 (embassy-consulate-vietnam-japan, police-questioning-rights-japan, foreign-resident-support-centers) — 3 guide LEGAL/SUPPORT, panic-level cao.

## Out of scope

- Không thêm guide thứ 4.
- Không sửa UI / build config / version / tag.
- Không bịa số tiền 児童手当 / phí trường cụ thể.
- Không bịa URL deep-link.
- Không add image asset mới.
- Không rewrite guide cũ.
- Không bump version (v1.3.2 đang chờ Apple Review — guide A4 sẽ vào release tiếp theo).

## Release context

- v1.3.2 (build #22) đã `eas submit` — Apple Review status `審査待ち`.
- A4 commit này CHƯA có trong v1.3.2 build (build từ commit trước A4).
- Khi A4 ready ship → cut release mới (v1.3.3 patch hoặc v1.4.0 minor):
  - **Recommend v1.3.3** nếu chỉ thêm content, không UI / schema changes.
  - **Recommend v1.4.0** nếu gom thêm A5 + A6 + feature mới (vd Dịch Thư Nhật).
- Update `package.json` + `app.json` cùng lúc khi cut.

## Recommendation

1. **KHÔNG ship A4 ngay** — đợi v1.3.2 Apple Review xong.
2. **Tiếp tục content batch song song** trong khi chờ — A5 (Legal/support) cao panic-level, có thể mở batch tiếp theo.
3. **Pass review A4** sau khi commit ban đầu — kiểm tra wording 児童手当 + counterPhrase native confirm.
4. **Update `docs/native-legal-review-pending-a1-a3.md`** thành `docs/native-legal-review-pending-a1-a4.md` để gom pending review của A4 vào.
5. **Khi v1.3.2 approved + ship**: cut v1.3.3 hoặc v1.4.0 với A4 + (tùy chọn A5).
