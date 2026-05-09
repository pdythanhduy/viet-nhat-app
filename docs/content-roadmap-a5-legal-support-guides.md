# Content backlog — Batch A5: Legal / support

**Date:** 2026-05-09
**Source backlog:** `docs/full-content-backlog-45-guides.md`
**Batch:** A5 — Legal / support (P1 — Important / high-value expansion)
**Scope:** chỉ thêm 3 guide mới. Không sửa UI, không bump version, không thêm asset mới.
**Release context:** v1.3.2 đang chờ Apple Review. A5 + A4 sẽ thuộc release tiếp theo (v1.3.3 hoặc v1.4.0).

---

## Guides added

| # | id | title | titleJp | category | priority |
|---|---|---|---|---|---|
| 1 | `police-questioning-rights-japan` | Khi cảnh sát hỏi / triệu tập / bắt giữ — quyền của bạn | 警察に呼ばれた・取り調べを受けたとき | daily-law | normal |
| 2 | `embassy-consulate-vietnam-japan` | Đại sứ quán / lãnh sự quán Việt Nam tại Nhật | 在日ベトナム大使館・領事館の利用 | daily-law | normal |
| 3 | `foreign-resident-support-centers` | Trung tâm hỗ trợ người nước ngoài (多文化共生) | 外国人住民支援センター — 多文化共生 | daily-law | normal |

Tất cả 3 guide thuộc `daily-law`. **Đây là batch panic-level CAO** — đặc biệt police questioning có thể là tình huống tâm lý nặng cho user.

## Files created

```
src/constants/content/adminGuides/guides/police-questioning-rights-japan.ts
src/constants/content/adminGuides/guides/embassy-consulate-vietnam-japan.ts
src/constants/content/adminGuides/guides/foreign-resident-support-centers.ts
docs/content-roadmap-a5-legal-support-guides.md
```

## Files modified

```
src/constants/content/adminGuides/guides/index.ts   (3 imports + 3 array entries)
```

## ADMIN_GUIDES count

- Before A5 (sau A4): **93**
- After A5: **96** (+3)

## Counter phrases per guide

| Guide | Count |
|---|---|
| `police-questioning-rights-japan` | 8 |
| `embassy-consulate-vietnam-japan` | 7 |
| `foreign-resident-support-centers` | 8 |

Tất cả jp + romaji + vn + note. **Tổng: 23 câu mới.**

## Search keywords added

| Guide | Count | Notable terms |
|---|---|---|
| `police-questioning-rights-japan` | 19 | cảnh sát hỏi, bị bắt, quyền im lặng, luật sư miễn phí, 職務質問, 任意聴取, 逮捕, 黙秘権, 弁護士, 法テラス, 当番弁護士 |
| `embassy-consulate-vietnam-japan` | 17 | đại sứ quán, lãnh sự, cấp lại hộ chiếu, mất hộ chiếu, vnembassy, vnconsulate, 大使館, 総領事館 |
| `foreign-resident-support-centers` | 18 | trung tâm hỗ trợ, tư vấn miễn phí, đa văn hóa, FRESC, 多文化共生, 国際交流協会, hotline tiếng Việt |

**Tổng 54 search keywords mới.**

## Source status per guide

| Guide | Sources | Mức tin cậy |
|---|---|---|
| `police-questioning-rights-japan` | 日本弁護士連合会 (nichibenren.or.jp), 法テラス (houterasu.or.jp) | **HOMEPAGE LEVEL** — JFBA + 法テラス là 2 cơ quan chính thức về luật sư + hỗ trợ pháp lý |
| `embassy-consulate-vietnam-japan` | vnembassy-jp.org (Tokyo), vnconsulate-osaka.org (Osaka) | **HOMEPAGE LEVEL** — domains chính thức của Đại sứ quán / lãnh sự quán Việt Nam |
| `foreign-resident-support-centers` | moj.go.jp/isa/ (FRESC) | **HOMEPAGE LEVEL** — FRESC thuộc 出入国在留管理庁 |

KHÔNG bịa deep-link. KHÔNG bịa số điện thoại / địa chỉ cụ thể của Đại sứ quán (chỉ direct user đến trang chính thức).

## Items needing official source check

⚠️ **Đây là batch CỰC KỲ NHẠY CẢM. Tất cả các điểm sau cần luật sư review trước khi user dựa vào.**

### `police-questioning-rights-japan` — HIGHEST priority legal review
1. **黙秘権 (quyền im lặng)** — quy định 刑事訴訟法 + Hiến pháp điều 38. Đã hedge "TÀI LIỆU THAM KHẢO".
2. **48 giờ / 72 giờ / 23 ngày** timeline giam giữ — 刑事訴訟法 chuẩn quốc gia. Cần luật sư xác nhận diễn đạt đúng.
3. **当番弁護士** hệ thống — 弁護士会 tổ chức. Số điện thoại tùy 都道府県 — không bịa.
4. **法テラス số 0570-078374** — số chính thức được verify (multilingual sapo-dial). Nhưng nên double-check với 法テラス trang chính.
5. **Vienna Convention** quyền liên hệ lãnh sự — chính xác per international law. Hedge "tài liệu tham khảo".
6. **公務執行妨害** (cản trở thi hành công vụ) — luật hình sự 95条. Đã hedge "có thể bị thêm tội" — không claim chắc.
7. **不退去罪** không nhắc trong guide này (đã có trong NHK guide A3) — KHÔNG duplicate.

### `embassy-consulate-vietnam-japan`
8. **Phân vùng Tokyo / Osaka / Fukuoka** — chính xác cấp cao, nhưng phân vùng cụ thể từng 都道府県 thay đổi. Đã hedge "kiểm tra trên trang chính thức".
9. **Phí cấp hộ chiếu** — KHÔNG đưa con số yen cụ thể. Hedge "vài nghìn yên" + direct user kiểm tra.
10. **Quy trình kết hôn / khai sinh** — chỉ overview, direct user đến trang chính thức + guide khác trên app (marriage-procedures-japan).
11. **60 ngày khai sinh** — quy định Việt Nam (Luật Quốc tịch + Luật Hộ tịch). Cần verify tài liệu chính thức.
12. **24/7 hotline bảo hộ công dân** — chính thức có nhưng số cụ thể KHÔNG đưa (tránh sai). Direct user đến trang chính thức.

### `foreign-resident-support-centers`
13. **FRESC location + hotline** — Yotsuya Tokyo. Chính xác per ISA. Đã direct user đến moj.go.jp/isa.
14. **DV相談+ số 0120-279-889** — chính xác per 内閣府 男女共同参画局 (đa ngôn ngữ 24/7). Verify với trang 内閣府.
15. **いのちの電話 0570-783-556** — chính xác per 一般社団法人 日本いのちの電話連盟. Stable nhiều năm.
16. **Yorisoi Hotline 0120-279-338** — chính xác per Social Inclusion Support Center.
17. **国民生活センター 188** — chính thức (tổng đài tiêu dùng quốc gia).
18. **Coverage tiếng Việt từng 多文化共生センター** — KHÔNG generalize. Đã hedge "tùy khu, search trước khi đến".

## Items needing native / legal review (HIGHEST PRIORITY)

⚠️ **Trước khi publish guide police-questioning-rights-japan, cần luật sư consumer + hình sự review:**

1. **Tone "biết quyền"** — có quá khuyến khích đối kháng cảnh sát không? Đã cố balance: nói rõ quyền NHƯNG cũng nhấn "bình tĩnh, không cãi nhau".
2. **任意ですか、逮捕ですか?** — câu này có realistic trong panic state không? Native confirm.
3. **黙秘権を行使します** — formal đủ không? Có nên dùng "答えたくありません" thay không?
4. **Disclaimer mức độ** — đã có trong description + legalScope + whenToAskExpert. Đủ chưa?
5. **Câu "Cảnh sát đã đe dọa visa"** — claim này đúng không (cảnh sát Nhật được/không được dọa)?
6. **23 ngày giam giữ** — diễn đạt timeline đúng theo 刑事訴訟法?

### Pending native review (gom với A1–A4)
- 23 counterPhrases mới (8+7+8 = 23) — cần native confirm tone tại 警察署 / Đại sứ quán / 多文化共生センター.

## Style notes (tuân thủ execution rules)

- **Disclaimer mạnh**: police guide có disclaimer "TÀI LIỆU THAM KHẢO — không phải tư vấn pháp lý cá nhân" trong description + legalScope + multiple FAQ.
- **Tone calm + neutral**: KHÔNG khuyến khích đối kháng cảnh sát. Hướng dẫn "bình tĩnh, không cãi nhau, biết quyền nhưng dùng ngôn từ lịch sự".
- **Embassy guide**: KHÔNG đưa số điện thoại / địa chỉ cụ thể (tránh outdated). Direct user đến trang chính thức cho info mới nhất.
- **Phân vùng**: hedge "phân vùng cụ thể từng 都道府県 — kiểm tra trang chính thức" — không claim cố định.
- **FRESC vs 多文化共生**: phân biệt rõ trong FAQ — tránh user confuse.
- **Counter phrases police**: focus câu "cứu mạng" tại đồn cảnh sát (`通訳をお願いします`, `弁護士に連絡したいです`, `領事館に連絡したいです`, `任意ですか、逮捕ですか`, `黙秘権を行使します`).
- **Cross-reference**: police guide nhắc `embassy-consulate-vietnam-japan`. Embassy guide nhắc các guide khác (marriage, baby-born, lost-residence-card, residence-card).

## Verification results

| Check | Result |
|---|---|
| `npm run typecheck` | ✅ PASS |
| `npm run test:ci` | ✅ PASS — **251/251 tests** |
| `npm run verify:content` | ✅ PASS — 0 issues |
| `npm run verify` (full chain) | ✅ PASS |

Pre-commit hook chạy lại khi commit — pass.

---

## Out of scope

- Không thêm guide thứ 4.
- Không sửa UI / build config / version / tag.
- Không bịa số điện thoại / địa chỉ Đại sứ quán cụ thể.
- Không bịa luật cụ thể không có trong văn bản chính thức.
- Không khuyến khích đối kháng cảnh sát hoặc trốn luật.
- Không add image asset mới.
- Không rewrite guide cũ.

## Release context

- v1.3.2 (build #22) đã `eas submit` — Apple Review status `審査待ち`.
- A5 commit này CHƯA có trong v1.3.2 build.
- A4 + A5 = 6 guide mới sẵn sàng cho release tiếp theo.
- **Recommend**: gom A4 + A5 vào v1.3.3 hoặc v1.4.0 sau khi v1.3.2 approved.

## Recommendation

1. **HIGHEST priority: legal review police-questioning-rights-japan** — luật sư consumer + hình sự review wording về quyền + timeline + 黙秘権 trước khi user dựa vào.
2. **Native review** 23 counterPhrases — gom với A1–A4 trong consolidated review doc.
3. **KHÔNG ship A5 ngay** — đợi v1.3.2 Apple Review xong + legal review pass.
4. **Tiếp tục content batch song song**: A6 = Tax/finance expansion (furusato-nozei, iDeCo, tax-on-remittance) — high informational value, low panic.
5. **Khi v1.3.2 approved + ship**: cut release v1.3.3 hoặc v1.4.0 với A4 + A5 (+ tùy chọn A6).
