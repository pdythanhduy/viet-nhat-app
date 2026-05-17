# Content Governance — Admin Guides

Quy tắc cho contributors / future Claude sessions khi viết/sửa nội dung trong `src/constants/content/adminGuides/guides/`.

Sourced from compliance lessons learned across PRs #38–#51 (May 2026). Update when sprint patterns shift.

---

## 1. Compliance wording rules

### What to AVOID

| ❌ Forbidden | Why |
|---|---|
| "Cách tăng tỷ lệ đậu" / "mẹo kháng cáo" | Implies guarantee — Nyukan/cơ quan có toàn quyền quyết định |
| "Cứu cánh" / "đường thoát dễ" | Normalizes risky paths (overstay, appeal, exception) |
| "Tự động được cấp" / "chắc chắn duyệt" | No procedure in 入管法 is auto-granted to applicant |
| "Loophole" / "lách luật" / "hack" | Triggers App Review red flag + legally misleading |
| "Cứ làm thế này là ổn" | Over-simplification of legal-risk procedures |
| "100% đậu" | Often used by visa brokers — red flag for users |

### Preferred wording

| ✅ Use | Context |
|---|---|
| "Thường được yêu cầu" | Document expectations |
| "Có thể khác theo cục xuất nhập cảnh" | Regional Nyukan variation |
| "Nên xác nhận thông tin mới nhất tại MOFA/ISA" | Policy may change |
| "Nyukan đánh giá từng trường hợp" | Discretionary decisions |
| "KHÔNG có gì đảm bảo" | Where the user might assume otherwise |
| "Tham vấn 弁護士 / 行政書士 trước khi nộp" | Complex/risk cases |

---

## 2. Legal-risk topics — mandatory escalation

For these topics, EVERY guide must route ambiguous cases to a licensed professional:

| Topic | Route to |
|---|---|
| Visa rejection / 在留特別許可 / overstay | 弁護士 (or 行政書士 chuyên 入管) + 法テラス 0570-078374 |
| Police questioning / detention / 取り調べ | 当番弁護士 (free first consult) qua 弁護士会 |
| Tax disputes / 税務調査 / large 海外送金 | 税理士 (qualified tax accountant) + 税務署 |
| Labor disputes / 不当解雇 / unpaid 残業 | 労働基準監督署 (free) → 弁護士 if back-pay >2yr |
| Family/inheritance with cross-border element | 弁護士 specializing in 国際家事 |
| Pension cross-border (脱退一時金 + 社会保障協定) | 年金事務所 国際業務 + 社労士 |
| Medical bills / 高額療養費 disputes | 病院相談室 + 国民生活センター 188 |
| Consumer fraud / 振り込め詐欺 / unauthorized card use | 警察 #9110 (cyber) + 国民生活センター 188 |
| Immigration broker / 名義貸し / 口座売買 | 弁護士 IMMEDIATELY + 警察 if criminal |

**Hotlines to keep accessible in copy:**
- 法テラス: `0570-078374` (Japan Legal Support Center, multilingual)
- 出入国在留管理庁: `0570-013904` (Foreign Residents Support Center)
- 国民生活センター: `188` (consumer affairs)
- 警察 (non-emergency): `#9110`
- 警察 (emergency): `110`
- 救急: `119`

---

## 3. Dataset / license safety rules

When writing content based on outside sources:

- **Cite source label exactly**: every `quickAction.officialSourceLabels` entry MUST match an existing `officialLinks.label` string exactly (test: `adminGuides.test.ts:585`)
- **Use authoritative `.go.jp` / official org domains** only as source links: MOFA / MOJ / MHLW / 金融庁 / こども家庭庁 / 厚生労働省 / 国税庁 / 内閣府 / e-Gov / 日本年金機構 / 全国銀行協会 / Japan Bar Association
- **No copy-paste from blog / SNS / forum posts** — paraphrase + cite official source
- **Vietnamese rendering**: phải là your own writing or open-license content; KHÔNG copy translated content from competing apps
- **Phone numbers + URLs**: must be verifiable on official source at time of update — update `lastVerified` field after change

---

## 4. searchKeywords formatting convention

Each guide's `searchKeywords` should include 3 categories:

| Layer | Purpose | Examples |
|---|---|---|
| **Japanese (CJK)** | Match Japanese term searches | `在留資格`, `特定活動`, `脱退一時金` |
| **Romaji** | Match users typing romaji | `zairyu shikaku`, `tokutei katsudou`, `dattai ichijikin` |
| **Vietnamese (with diacritics)** | Natural VN search | `tư cách lưu trú`, `lương hưu` |
| **Vietnamese (no diacritics)** | VN users on phone keyboards without diacritic IME | `tu cach luu tru`, `luong huu` |
| **English** | English-speaking users | `pension refund`, `permanent residency` |

### When to use ASCII (no diacritic) Vi keywords

- Always include 2-3 ASCII variants for high-frequency search terms (visa types, common procedures)
- ASCII variant is MANDATORY when the centralized list in `src/constants/content/adminGuideSearchKeywords.ts` already has an ASCII version of the same term — otherwise the diacritic version blocks the centralized version via dedup-by-normalized-form (see test `adminGuideSearch.test.ts:87`)
- Vietnamese diacritic + ASCII variants count as DIFFERENT entries (Set keeps both)

### Examples seen across guides (current distribution: 41% Japanese / 26% Vi diacritic / 34% ASCII)

```ts
// Good — covers all 3 layers
searchKeywords: [
  'thuế cư dân', 'thue cu dan', '住民税', 'juuminzei',
  'resident tax',  // English
  ...
]

// Bad — only Vi diacritic, blocks ASCII centralized version
searchKeywords: ['thuế cư trú', 'thuế địa phương']
```

---

## 5. keyTerms formatting convention (Issue #37 style)

Every keyTerm should follow this 4-line structure:

```ts
{
  term: '在留資格',                          // Japanese term as user sees it
  reading: 'ざいりゅうしかく',                // Hiragana reading (always present unless term is already kana)
  meaningVi: 'tư cách lưu trú (loại visa sau khi nhập cảnh)',  // Vietnamese practical meaning, NOT literal translation
  noteVi: 'Đời thường gọi là "visa"... In trên mặt thẻ cư trú. Quyết định phạm vi hoạt động được phép.',  // Where user sees it + practical caveat
}
```

### Good vs Bad examples

```
❌ Bad: 特別徴収 = khấu trừ đặc biệt
✅ Good: 特別徴収（とくべつちょうしゅう）: tiền thuế cư trú bị công ty trừ thẳng vào lương mỗi tháng, thường thấy trên phiếu lương hoặc thông báo thuế.
```

### Encoding warning — uppercase Vietnamese

The encoding-audit script (`scripts/content-encoding-audit.js`) flags `Ã` followed by any character as suspected mojibake. This false-positive triggers on legitimate Vietnamese uppercase words like:

- "HOÃN" (H + O + Ã + N) → use lowercase "hoãn" instead
- "ĐÃ" (Đ + Ã) → use lowercase "đã"
- "LÃI" → use lowercase "lãi suất"

**Rule:** avoid uppercase Vietnamese words containing `Ã` (U+00C3) in any string literal. Use lowercase or rephrase. Japanese 「」 brackets for inline JP terms are OK and don't trigger the audit.

---

## 6. counterPhrases convention

Practical Japanese phrases for face-to-face / hotline conversations.

```ts
{
  jp: '弁護士に相談したいです。',                    // Polite Japanese
  romaji: 'Bengoshi ni soudan shitai desu.',     // Hepburn romaji
  vn: 'Tôi muốn tham vấn luật sư.',              // Vietnamese
  note: 'Câu đầu tiên cần dùng. KHÔNG tự đến Nyukan khi chưa có tư vấn. Gọi 法テラス 0570-078374.',  // When/where + safety note
}
```

### Topic coverage per guide

Aim for 3-5 counterPhrases covering:
1. Opening line (request the procedure)
2. Document request
3. Time/cost question
4. Discretionary case escalation phrase
5. "Right to remain silent / right to interpreter" for high-risk guides

---

## 7. quickAction tone consistency

`quickAction.doNow` should be:
- **Imperative + numbered** (BƯỚC 1 → BƯỚC 2 → ...) for procedural guides
- **Sub-15 words per step** for mobile readability
- **Hotline numbers visible inline** for crisis guides (110, 119, 法テラス, etc.)
- **For legal-risk guides**: "BƯỚC ĐẦU TIÊN: tham vấn 弁護士" should be Step 1, not buried

`quickAction.ifLate` must:
- State the actual legal consequence factually (not scare-mongering, not minimizing)
- Cite the specific law/section if known (vd: 入管法 §70, 道交法 §72, 戸籍法 §49)
- Include "Tham vấn 弁護士 trước khi đến cơ quan" for legal-risk topics

---

## 8. Required schema fields (all 5)

Every admin guide should have:

1. **searchKeywords**: 15-30 entries covering all 5 search layers above
2. **legalScope**: jurisdiction + jurisdictionNote (cite law/policy basis) + sourceVerifiedAt + nextReviewAt + riskLevel + whenToAskExpert (3-6 triggers)
3. **quickAction**: deadline + office + doNow (6-7 step) + bring + ifLate + officialSourceLabels
4. **counterPhrases**: 3-5 practical phrases
5. **keyTerms**: 5-8 difficult terms with reading + meaningVi + noteVi

If any field is missing, the guide is "skeleton" — flag in audit + plan enhancement.

---

## 9. Branch / PR conventions

- **One branch per batch** (`feat/content-<topic>-enhance`)
- **One PR per branch** (no nested branches in same PR)
- **Commits incremental per guide** for review reviewability
- **PR description includes**: scope + compliance check + verification result + counts (keyTerms / counterPhrases / searchKeywords added)
- **Required QA before push**: `typecheck` + `verify:content` + `content:qa-admin-guides` + `test:ci` (46 suites / 270+ tests pass)

---

## 10. App Review safety

These items MUST NOT appear in guide content:

- AI Mail Translate exposure (per `feature-ai-mail-translate-decision-log.md`)
- Specific medical diagnoses or dosages (refer to bệnh viện / pharmacist)
- Specific legal opinions for individual cases (refer to 弁護士)
- Investment recommendations for individual products (refer to licensed IFA)
- Promises about visa approval, tax refund amount, or legal outcome
- Phone/address of brokers / "tư vấn dịch vụ" without verification

---

## Source PRs (compliance pattern reference)

| PR | Demonstrates |
|---|---|
| #36 | Reverting AI Mail surface exposure (decision log alignment) |
| #38 | Family/childcare — standard 5-field enhancement |
| #41 | Tax terminology — Issue #37 keyTerms style benchmark |
| #46 (D1) | Compliance for visa rejection — softening "tỷ lệ approved cao" |
| #51 (D2) | Compliance for overstaying — no loophole, defer to 弁護士 |
| #50 (D3) | Compliance for "trendy" visas — citizenship eligibility honest |

Last updated: 2026-05-17 (covering content sprint through PR #51).
