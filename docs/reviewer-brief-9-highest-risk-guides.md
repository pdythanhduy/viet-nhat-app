# External Reviewer Brief — 9 HIGHEST-Risk Admin Guides

**App**: Cẩm Nang Việt Nhật (Vietnamese-Japanese guide app)
**Audience**: Vietnamese residents in Japan
**Brief generated**: 2026-05-15
**Purpose**: Engage Japanese 弁護士 / 税理士 / 行政書士 to verify load-bearing legal/policy/numerical claims in 9 highest-risk admin guides before public release.

URL sources cited in each section have already been verified via WebFetch/WebSearch pass on 2026-05-15 (commit `dd6533e`). Reviewers do not need to re-verify URL liveness — focus is on **factual / legal correctness of claims**.

---

### consumer-rights-cooling-off.ts — 弁護士 consumer law

**File**: `src/constants/content/adminGuides/guides/consumer-rights-cooling-off.ts`
**Risk**: HIGHEST
**Why this needs external review**: Guide gives statutory citations (特定商取引法, 消費者契約法), specific cooling-off day counts, and procedural advice that, if wrong, could cause Vietnamese consumers to lose statutory rescission rights or expose them to fraud. NHK-specific cooling-off claim is in a contested legal zone.

**Claims to verify**:

| # | Claim in guide | Where in file | Verification question | Suggested expert action |
|---|---|---|---|---|
| 1 | Cooling-off **8 days** for 訪問販売 / 電話勧誘 / 特定継続的役務 (>50,000円) / 内職 / 訪問購入 | `quickAction.deadline`, Step 1, FAQ Q1 | Confirm 8-day period and the full list of 取引類型 covered under 特商法 art.9 / 24 / 40 / 48 / 58-14 | Confirm / Suggest revision |
| 2 | Cooling-off **20 days** for 連鎖販売取引 + 業務提供誘引販売 | `quickAction.deadline`, Step 1 | Confirm 20-day count per 特商法 art.40-2 / 58-3 | Confirm |
| 3 | "Clock does NOT start if 法定書面 incomplete — can rescind anytime" | `quickAction.deadline`, Step 2 | Verify scope of this rule (legally accurate per 法定書面不交付 doctrine, but is "anytime" too strong?) | Suggest revision |
| 4 | 消費者契約法 voidance grounds: 不実告知 / 断定的判断 / 不利益事実不告知 / 不退去・監禁 | Step 3, `quickAction.ifLate` | Confirm articles (4条) + grounds completeness; flag missing 過量契約取消 (4条4項) | Confirm / Suggest revision |
| 5 | 消費者契約法 statute of limitations: **1 year from discovery / 5 years from contract** | Step 3, `quickAction.ifLate` | Verify per 7条 — was the 6-month period extended to 1 year (2017 reform)? Confirm 5-year cap. | Confirm |
| 6 | "Cooling-off effective on date of **sending**, not receipt" | FAQ Q2 | Confirm 発信主義 per 特商法 art.9(2) | Confirm |
| 7 | NHK 受信契約 cooling-off — guide says "vùng tranh cãi" / disputed | FAQ Q4 | This is correct framing per 最高裁 H29.12.6 + 国民生活センター ADR — but verify current legal consensus 2026 | Confirm framing / Suggest disclaimer |
| 8 | 闇金 — "entire interest above 利息制限法 + 出資法 is void; some cases entire debt void" | FAQ Q5 | Confirm 出資法 5条 (>109.5%/year criminal); confirm 最判 H20.6.10 line on 不法原因給付 → 全額無効 | Confirm |
| 9 | 内容証明郵便 cost "1,500–2,500円" | `fees`, FAQ Q2 | Verify current Japan Post pricing 2026 (base + 一般書留 + 配達証明) | Confirm |
| 10 | Sample 通知書 template citing "特定商取引法第9条" | FAQ Q2 | Confirm template legal sufficiency for 訪問販売 cooling-off | Confirm / Suggest revision |

**Already-verified sources**:
- https://www.caa.go.jp/
- https://www.kokusen.go.jp/
- https://www.caa.go.jp/policies/policy/local_cooperation/local_consumer_administration/hotline/
- https://www.houterasu.or.jp/

**Specific questions for reviewer**:
1. Is the "clock doesn't run without 法定書面" framing safe to state without further qualification?
2. Should we explicitly list excluded items (政令指定 consumables, vehicles, etc.) more precisely?
3. Is recommending 弁護士 vs 司法書士 vs 認定司法書士 (140万円 cap) sufficiently disambiguated?

**Output format reviewer should use**:
- For each item: ☐ confirmed / ☐ needs revision / ☐ flag for legal risk
- Suggested wording change (if any)
- Additional caveats / disclaimers to add

---

### domestic-violence-dv-support.ts — 弁護士 / 行政書士 入管

**File**: `src/constants/content/adminGuides/guides/domestic-violence-dv-support.ts`
**Risk**: HIGHEST
**Why this needs external review**: Wrong information in this guide can directly endanger lives or cause visa loss. Visa-protection claims for DV victims on 配偶者 visas are legally subtle — ISA discretionary practice differs from black-letter law. Hague Convention claims about child removal need precise framing.

**Claims to verify**:

| # | Claim in guide | Where in file | Verification question | Suggested expert action |
|---|---|---|---|---|
| 1 | DV防止法 protects "all victims in Japan regardless of nationality / registered marriage" — includes 事実婚 + 元配偶者 | `legalScope`, `commonMistakes`, FAQ Q3 | Confirm scope per 配偶者からの暴力の防止及び被害者の保護等に関する法律 art.1 + 2024 amendment expanding to ex-partners | Confirm |
| 2 | 保護命令 categories: 接近禁止 (~6 months), 電話等禁止, 子への接近禁止, 退去命令 (~2 months) | FAQ Q5 | Verify durations per 10条 — note 2023 amendment expanded 接近禁止 from 6→12 months? Confirm. | Suggest revision (likely outdated) |
| 3 | 保護命令 violation = "max 1 year prison or 100万円 fine" | FAQ Q5 | Verify per DV防止法 29条 — note 2023 amendment increased penalty to 2 years / 200万円 | Suggest revision (likely outdated) |
| 4 | 保護命令 ONLY for physical violence / death threats — "not for psychological DV alone" | FAQ Q5 | Verify per 10条 — note 2023 amendment **expanded** to include 精神的暴力 + 性的暴力 (effective 2024-04-01) | Flag for legal risk — likely outdated |
| 5 | "DV victims on 配偶者 visa can extend 配偶者 visa while separated, or switch to 定住者" | FAQ Q2, Step 5 | Verify per ISA 配偶者DV被害者の在留資格関連 guidelines — confirm current ISA practice 2026 | Confirm / Suggest revision |
| 6 | 住民基本台帳事務における支援措置 — "1 year, renewable, blocks spouse from accessing 住民票/戸籍" | FAQ Q1, Step 4 | Confirm per 総務省 通知 — verify it covers 戸籍附票 + 住民票 + 印鑑証明 | Confirm |
| 7 | "Removing child to Vietnam without procedures may violate Hague Convention; Japan + VN both signatories" | FAQ Q6, FAQ Q8 | **Critical**: Vietnam is NOT a Hague Abduction Convention contracting state as of 2026. Verify and correct. | Flag for legal risk — likely WRONG |
| 8 | "Japan moving from sole 親権 to 共同親権" | FAQ Q6 | Confirm status of 民法改正 (2024-05 passed, 2026 enforcement) | Confirm |
| 9 | "Recording one's own conversation is legal under Japanese law" | `quickAction.doNow`, Step 2 | Confirm 当事者録音 legality — note workplace/civil court admissibility nuances | Confirm |
| 10 | 児童相談所 — "prioritizes keeping child with non-abusive parent" | FAQ Q6, `commonMistakes` | Confirm per 児童虐待防止法 + practice — acceptable framing? | Confirm |
| 11 | DV相談+ phone **0120-279-889**, よりそいホットライン **0120-279-338**, 児童相談所 **189** | `quickAction.office`, `whereToDo` | Verify all hotline numbers active 2026 | Confirm |

**Already-verified sources**:
- https://soudanplus.jp/
- https://www.gender.go.jp/policy/no_violence/
- https://www.houterasu.or.jp/
- https://www.moj.go.jp/isa/
- https://www.since2011.net/yorisoi/

**Specific questions for reviewer**:
1. Hague Convention claim about Vietnam — is this factually wrong? Should we replace with "Japan signatory; Vietnam not; complex private international law applies"?
2. For "在留資格変更" to 定住者 for DV victims — is there an ISA notice (通達) we should cite directly?
3. Should the 保護命令 section be rewritten to reflect 2024 expansion to psychological/sexual DV?

**Output format reviewer should use**:
- For each item: ☐ confirmed / ☐ needs revision / ☐ flag for legal risk
- Suggested wording change (if any)
- Additional caveats / disclaimers to add

---

### inheritance-will-japan-foreigners.ts — 弁護士 + 税理士 cross-border

**File**: `src/constants/content/adminGuides/guides/inheritance-will-japan-foreigners.ts`
**Risk**: HIGHEST
**Why this needs external review**: Cross-border inheritance involves 通則法 conflict-of-laws + 相続税法 + Vietnamese civil code interplay. Numerical claims about tax brackets, basic deductions, and statutory deadlines must be precise — errors directly translate into wrong tax filings or void wills.

**Claims to verify**:

| # | Claim in guide | Where in file | Verification question | Suggested expert action |
|---|---|---|---|---|
| 1 | 通則法 art.36 — succession governed by **law of decedent's nationality** | `legalScope`, FAQ Q1 | Confirm article number + renvoi rule under 41条 | Confirm |
| 2 | 自筆証書遺言 strict requirements per 民法 968: all handwritten + date + signature + 印鑑; 2019 reform allows typed property list | FAQ Q3, Step 3 | Confirm 2019 amendment scope (民法 968条2項) | Confirm |
| 3 | 自筆証書遺言保管制度 fee **3,900円** | `fees`, FAQ Q3 | Verify current 法務局 fee 2026 | Confirm |
| 4 | 相続放棄 / 限定承認 deadline = **3 months from knowing of death** | `quickAction.deadline`, Step 4 | Confirm 民法 915 — period runs from "knowing of inheritance," not death | Suggest revision |
| 5 | 準確定申告 deadline = **4 months**; 相続税申告 = **10 months** | `quickAction.deadline`, `whenToDo` | Confirm per 所得税法 124-125 + 相続税法 27 | Confirm |
| 6 | 基礎控除 = **3,000万円 + 600万円 × 法定相続人** | `fees`, FAQ Q5 | Confirm post-2015 reform amounts still current 2026 | Confirm |
| 7 | 相続税 bracket schedule (10% / 15% / 20% / 30% / 40% / 45% / 50% / 55%) with deduction subtractions | `fees`, FAQ Q5 | Verify full bracket table including 控除額 (50万 / 200万 / 700万 / 1,700万 / 2,700万 / 4,200万 / 7,200万) per 相続税法 16条 | Confirm |
| 8 | 配偶者控除 — "spouse pays nothing if inheritance ≤ 1.6億 OR ≤ 法定相続分" | `fees`, FAQ Q2, Q5 | Confirm 相続税法 19条の2 wording | Confirm |
| 9 | 公正証書遺言 fees by asset value (5,000 / 17,000 / 43,000 / 240,000円) | `fees`, FAQ Q3 | Verify against 公証人手数料令 current schedule | Confirm |
| 10 | 遺留分: spouse/children/lineal ascendants get **1/2** of statutory share (1/3 when only ascendants) | FAQ Q6 | Confirm 民法 1042 — note 2019 reform changed 減殺請求 → 侵害額請求 (money claim) | Confirm |
| 11 | 遺留分侵害額請求 1-year statute from "knowing of will" | FAQ Q6 | Confirm 1048条 — also 10-year absolute cap | Confirm |
| 12 | 相続登記 — "mandatory within 3 years (2024+ law)" | `fees` Step 5 | Confirm 不動産登記法 76条の2 — effective 2024-04-01, 3-year deadline + 10万円 fine | Confirm |
| 13 | Worldwide-assets taxation if decedent/heir has been 居住者 **>10 of last 15 years** | FAQ Q5 | Verify per 相続税法 1条の3 / 2条 (post-2017 + 2021 reform 制限納税義務者 scope) | Confirm / Suggest revision |
| 14 | 登録免許税 for 相続不動産 = **0.4%** | `fees`, Step 5 | Confirm per 登録免許税法 | Confirm |
| 15 | "Heirs of deceased VN national governed by Vietnam Civil Code 2015 Ch.XX" | FAQ Q1, Q2, Step 1 | Verify VN code citation (Bộ luật Dân sự 2015 Part 4 Ch.XXI-XXIV on thừa kế) | Confirm — likely chapter number off |

**Already-verified sources**:
- https://www.moj.go.jp/
- https://www.moj.go.jp/MINJI/minji05_00184.html
- https://www.houterasu.or.jp/

**Specific questions for reviewer**:
1. Is "luật quốc tịch" framing for VN nationals safe given renvoi under 通則法 art.41 (especially for real estate situated in Japan)?
2. Tax brackets — are the 控除額 amounts in `fees` accurate? Worth a line-by-line audit.
3. Should we add a stronger disclaimer that 2017 + 2021 tax reform changed scope for 制限納税義務者 specifically?

**Output format reviewer should use**:
- For each item: ☐ confirmed / ☐ needs revision / ☐ flag for legal risk
- Suggested wording change (if any)
- Additional caveats / disclaimers to add

---

### specific-residence-card-my-number-2026.ts — 行政書士 入管

**File**: `src/constants/content/adminGuides/guides/specific-residence-card-my-number-2026.ts`
**Risk**: HIGHEST
**Why this needs external review**: New 特定在留カード rolls out **2026-06-14** — policy is in mid-implementation. ISA guidance still being published. Misinformation about "mandatory conversion" or fees creates fraud risk + administrative problems.

**Claims to verify**:

| # | Claim in guide | Where in file | Verification question | Suggested expert action |
|---|---|---|---|---|
| 1 | Start date **2026-06-14** for 特定在留カード issuance | `description`, `whenToDo` | Confirm against ISA published commencement notice (政令施行日) | Confirm |
| 2 | "Existing 在留カード remains valid to its expiry — no forced conversion" | `quickAction.deadline`, `commonMistakes` | Confirm per ISA Q&A — current transition policy | Confirm |
| 3 | Eligible triggers for 特定在留カード: gia hạn / 在留資格変更 / 永住 / 再交付 / information change / certain 市役所 declarations | Step 1 | Confirm complete list per ISA guidance | Confirm / Suggest revision |
| 4 | 在留申請オンラインシステム — new version from **2026-01-05** with improvements (save draft, larger file size, multi-file, org ID 1→3 yrs) | FAQ Q5, `description` | Confirm release date + scope of improvements | Confirm |
| 5 | "Fee aligned with regular procedure (在留期間更新 4,000円, 在留資格変更 4,000円)" | `fees` | **Note conflict with visa-fee guide showing 6,000円 from 2025-04-01.** Reconcile. | Flag for revision — internal inconsistency |
| 6 | Card reissue when lost = ~1,000–2,000円 | `fees` | Verify against current ISA 再交付手数料 | Confirm |
| 7 | "4 PIN codes" assignment (利用者証明 / 署名用 / 券面入力補助 / 市町村事務用) — assumed same as My Number Card | Step 4 | Confirm same PIN structure applies to integrated card | Confirm / Flag as inference |
| 8 | "PIN locked after 3 wrong attempts" | Step 4 | Confirm — current My Number Card behavior + applicability to new card | Confirm |
| 9 | Children + first-time holders process — "still being finalized by ISA + 総務省 + 市役所" | FAQ Q3 | Confirm honest framing; is there now (2026-05) any published guidance? | Confirm / Update |
| 10 | "After 帰化, the 特定在留カード is no longer needed (citizen has 戸籍)" | Step 5 | Confirm — citizen gets standard My Number Card via 市役所 | Confirm |

**Already-verified sources**:
- https://www.moj.go.jp/isa/tokutei.html
- https://www.moj.go.jp/isa/applications/procedures/whatzairyu_00001.html
- https://www.moj.go.jp/isa/11_00064.html

**Specific questions for reviewer**:
1. As of mid-May 2026, what specific groups has ISA listed as 対象者? Should we update guide to enumerate them?
2. Has any fee been officially set for the integration step at 市役所?
3. Reconcile the 4,000円 figure in this guide vs 6,000円 in `visa-fee-increase-2025-2026.ts` — the visa-fee guide claims a 2025-04-01 fee increase. Which is correct for 2026?

**Output format reviewer should use**:
- For each item: ☐ confirmed / ☐ needs revision / ☐ flag for legal risk
- Suggested wording change (if any)
- Additional caveats / disclaimers to add

---

### ikusei-shuro-system-guide.ts — 行政書士 + 監理支援機関

**File**: `src/constants/content/adminGuides/guides/ikusei-shuro-system-guide.ts`
**Risk**: HIGHEST
**Why this needs external review**: 育成就労 is a brand-new system replacing 技能実習 — full operation **2027-04-01**. Misinformation can mislead Vietnamese workers into wrong life decisions (waiting / not waiting, paying brokers). Vietnamese sending-organization fee caps are a specific scam-vector.

**Claims to verify**:

| # | Claim in guide | Where in file | Verification question | Suggested expert action |
|---|---|---|---|---|
| 1 | Full operation date **2027-04-01** | `description`, `whenToDo` | Confirm per 育成就労法 施行日 (cabinet order) | Confirm |
| 2 | 監理支援機関 pre-application opens **2026-04-15** | `description`, mocs | Confirm per ISA 施行日前申請 notice | Confirm |
| 3 | 育成就労計画 pre-application opens **2026-09-01** | `description` | Confirm per ISA notice | Confirm |
| 4 | "3-year baseline then transition to 特定技能" | FAQ Q1, Steps | Confirm 育成就労法 in-period length | Confirm |
| 5 | "転籍 (job change) allowed within same field after 1-2 years" | FAQ Q4 | Confirm exact conditions per MHLW 省令 — note this varies by industry sector | Confirm / Suggest revision |
| 6 | "Japanese language requirement N5+ before/after entry" | FAQ Q1, Steps | Confirm per 育成就労 政令 — note threshold may vary by sector | Confirm |
| 7 | "監理 fees borne by receiving company — NOT deducted from worker pay" | `fees`, FAQ Q1 | Confirm per 育成就労法 + MHLW guidance | Confirm |
| 8 | Vietnamese 送出機関 fee cap — "Bộ LĐ-TB-XH cap ~$1,500 USD" | `fees`, Step 3 | Verify against current DOLAB regulation (Circular 21/2021/TT-BLĐTBXH or successor) | Confirm — Vietnamese expert / 送出機関 verifier |
| 9 | "Minimum wage = prefectural minimum (2026: ~1,000–1,200円/hr)" | `fees`, Step 4 | Verify 2026 prefectural minimum wage range | Confirm |
| 10 | "技能実習 will be phased out gradually after 2027; existing trainees continue to visa expiry" | `whenToDo`, FAQ Q3 | Confirm per MOJ/MHLW transition plan | Confirm |
| 11 | "No individual conversion process 技能実習 → 育成就労 published as of 2026-05-14" | FAQ Q3 | Confirm still true at time of review; if changed, update | Confirm / Update |
| 12 | "監理団体 must upgrade to 監理支援機関 with stricter requirements (NPO + private orgs)" | FAQ Q5 | Verify legal organizational requirements per 育成就労法 + 省令 | Confirm |

**Already-verified sources**:
- https://www.moj.go.jp/isa/applications/index_00005.html
- https://www.moj.go.jp/isa/applications/faq/ikusei_qa_00002.html
- https://www.moj.go.jp/isa/03_00174.html
- https://www.moj.go.jp/isa/applications/ssw/index.html

**Specific questions for reviewer**:
1. As of review date, has MHLW published the final 転籍 conditions (months required, valid reasons)?
2. Is the JLPT N5/N4 threshold confirmed across sectors or still under deliberation?
3. Should we explicitly warn against fraudulent "育成就労 ngay 2026" offers — the current warning sufficient?

**Output format reviewer should use**:
- For each item: ☐ confirmed / ☐ needs revision / ☐ flag for legal risk
- Suggested wording change (if any)
- Additional caveats / disclaimers to add

---

### visa-fee-increase-2025-2026.ts — 行政書士 / ISA confirmation

**File**: `src/constants/content/adminGuides/guides/visa-fee-increase-2025-2026.ts`
**Risk**: HIGHEST
**Why this needs external review**: Every fee number must be exact — wrong 収入印紙 denomination causes rejection at counter. Confirm each fee at ISA official source.

**Claims to verify**:

| # | Claim in guide | Where in file | Verification question | Suggested expert action |
|---|---|---|---|---|
| 1 | Fee increase effective **2025-04-01** | `description`, `legalScope` | Confirm per 法務省令 施行日 | Confirm |
| 2 | 在留期間更新: 4,000円 → **6,000円 paper / 5,500円 online** | `fees`, FAQ | Confirm per ISA published schedule | Confirm |
| 3 | 在留資格変更: 4,000円 → 6,000円 paper / 5,500円 online | `fees` | Confirm | Confirm |
| 4 | 永住許可: 8,000円 → 10,000円 paper / 9,500円 online | `fees` | Confirm | Confirm |
| 5 | 再入国許可 (1 lần): **3,000円 paper / 2,500円 online** (unchanged paper amount?) | `fees` | Confirm exact figures + whether paper-vs-online split applies | Confirm |
| 6 | 再入国許可 (multiple): 6,000円 paper / 5,500円 online | `fees` | Confirm | Confirm |
| 7 | みなし再入国許可 (≤1 năm): FREE | `fees` | Confirm per 入管法 26条の2 | Confirm |
| 8 | 就労資格証明書: 1,200円 (paper only?) | `fees` | Confirm + check online option | Confirm |
| 9 | 帰化申請: FREE (申請 itself) | `fees` | Confirm — 法務局 国籍課 charges nothing for application | Confirm |
| 10 | "Children ≤6 years exempt from some procedures" | `fees`, FAQ Q5 | Verify exact scope of waiver | Confirm |
| 11 | "Application fee determined by DATE OF SUBMISSION, not date of decision" | FAQ Q1 | Confirm per transitional provision in 法務省令 | Confirm |
| 12 | "収入印紙 exchangeable at post office for 5円/sheet within 5 years" | FAQ Q3 | Verify 印紙税法 + Japan Post 交換 rules | Confirm |
| 13 | Cross-reference: 特定在留カード guide uses 4,000円 — internal consistency | (cross-file) | Reconcile with this guide's 6,000円 post-2025-04-01 figure | Flag for revision |
| 14 | Comparison with US ($460) / UK (£719) / Germany (€100) visa fees | FAQ Q4 | Verify these international fees roughly current | Confirm / Optional |

**Already-verified sources**:
- https://www.moj.go.jp/isa/applications/procedures/index.html
- https://www.moj.go.jp/isa/applications/index.html
- https://www.moj.go.jp/isa/

**Specific questions for reviewer**:
1. Confirm each fee line item against the current ISA fee schedule — fee table is the load-bearing content.
2. Is the 500円 online discount applied to ALL listed procedures, or only some?
3. Has there been any 2026 update changing fees again?

**Output format reviewer should use**:
- For each item: ☐ confirmed / ☐ needs revision / ☐ flag for legal risk
- Suggested wording change (if any)
- Additional caveats / disclaimers to add

---

### tax-on-remittance-to-vietnam.ts — 税理士 cross-border (JP + VN)

**File**: `src/constants/content/adminGuides/guides/tax-on-remittance-to-vietnam.ts`
**Risk**: HIGHEST
**Why this needs external review**: Touches Japan tax law + Vietnam tax law + AML rules. Wrong info on reporting thresholds or tax treaty exposes users to 加算税 or worse.

**Claims to verify**:

| # | Claim in guide | Where in file | Verification question | Suggested expert action |
|---|---|---|---|---|
| 1 | 100万円 threshold for 国外送金等調書 (per transaction) | `legalScope`, `quickAction`, FAQ Q2 | Confirm per 国外送金等調書法 — financial institution reports automatically | Confirm |
| 2 | "Service files the report, NOT the user" | FAQ Q2 | Confirm | Confirm |
| 3 | "Splitting transactions (80万 + 80万 instead of 160万) may be 構造化 / structuring (AML violation)" | `commonMistakes` | Confirm under 犯収法 (犯罪収益移転防止法) — is intent required? | Confirm |
| 4 | Japan-Vietnam tax treaty — "signed 1995-10" (and possibly amended) | `legalScope`, FAQ Q3 | Verify date + current Protocol status; clarify which articles cover salary income | Confirm / Suggest revision |
| 5 | 出国税 (exit tax) — "applies for securities >1億円, doesn't apply to most Vietnamese" | FAQ Q4 | Confirm 国外転出時課税 per 所得税法 60条の2 — current 1億円 threshold | Confirm |
| 6 | "Family support (vợ/chồng/con/cha/mẹ in same household) generally NOT taxable in Vietnam" | FAQ Q3 | Verify per Luật thuế thu nhập cá nhân VN — also 贈与税 implications on the JP side | Confirm — needs Vietnamese tax expert |
| 7 | "Tiền tặng from outside immediate family in VN may trigger gift tax if large" | FAQ Q3 | Verify VN gift tax threshold/rate (Article 18 Luật thuế TNCN, if applicable) | Confirm |
| 8 | "Source of funds must already have been declared/taxed in Japan" | Step 1, FAQ Q1 | Strictly true? E.g., savings from already-taxed salary needs no further declaration. Clarify. | Suggest revision |
| 9 | 確定申告 trigger — implied if "non-salary source" used for remittance | FAQ Q1 | Confirm correct triggers (副業 >20万, 雑所得, etc.) | Confirm |
| 10 | "Records should be kept ≥7 years" | `quickAction.doNow` | Confirm per 国税通則法 70条 (audit lookback usually 5 yrs, 7 yrs for fraud) | Confirm / Suggest revision |
| 11 | "Bank in Vietnam may demand source-of-funds disclosure on large receipts" | FAQ Q3 | Verify per Nghị định ngân hàng nhà nước AML rules | Confirm — VN expert |

**Already-verified sources**:
- https://www.nta.go.jp/
- https://www.mof.go.jp/

**Specific questions for reviewer**:
1. The Japan-Vietnam DTA from 1995 — has there been an amending protocol? Critical for accuracy.
2. Is "7-year record retention" overstating the requirement?
3. For Vietnamese tax side — is there a current binding circular addressing inbound remittances for family support specifically?

**Output format reviewer should use**:
- For each item: ☐ confirmed / ☐ needs revision / ☐ flag for legal risk
- Suggested wording change (if any)
- Additional caveats / disclaimers to add

---

### police-questioning-rights-japan.ts — 弁護士 hình sự (criminal defense)

**File**: `src/constants/content/adminGuides/guides/police-questioning-rights-japan.ts`
**Risk**: HIGHEST
**Why this needs external review**: Wrong info here can deprive a Vietnamese resident of fundamental rights during a criminal investigation. Time periods (48 / 72 hour / 23-day detention) and right-citation must be exact.

**Claims to verify**:

| # | Claim in guide | Where in file | Verification question | Suggested expert action |
|---|---|---|---|---|
| 1 | Police custody max **48 hours** before transfer to 検察 | FAQ Q3, Step 5 | Confirm per 刑事訴訟法 203条 | Confirm |
| 2 | 検察 has additional **24 hours** to decide on 勾留 request — total **72 hours** max pre-judicial-review | FAQ Q3 | Confirm per 刑訴法 205条 | Confirm |
| 3 | 勾留 = **10 days + extendable 10 days = 23 days max** before 起訴 or release | FAQ Q3 | Confirm per 刑訴法 208条 | Confirm |
| 4 | Right to interpreter — "constitutional + 刑訴法 obligation, state-funded" | FAQ Q4 | Confirm exact constitutional/statutory basis (Constitution 31条 + 刑訴規則 175条 etc.) | Confirm / Suggest revision |
| 5 | 黙秘権 — "legally protected; cannot be used as direct evidence of guilt" + 不利益推認禁止 | `commonMistakes`, FAQ Q5, Step 4 | Confirm per 憲法 38条 + 刑訴法 198条2項 — note actual scope of 不利益推認 doctrine in practice | Confirm / Suggest revision |
| 6 | 当番弁護士 — "first consultation free" via 弁護士会 | `fees`, Step 3 | Confirm scheme + current cost (still free 1st visit nationwide?) | Confirm |
| 7 | 国選弁護人 — "available after 起訴 for low-income" | Step 5 | Confirm — note that 被疑者国選 also available pre-起訴 for certain offenses; expand? | Suggest revision |
| 8 | 保釈 — "available with 保釈金 payment" | Step 5 | Confirm 保釈 only available post-起訴, not during 勾留 pre-起訴 | Confirm / Suggest revision |
| 9 | Vienna Convention 1963 — right to consular notification | `legalScope`, FAQ, Steps | Confirm under Vienna Convention art.36 | Confirm |
| 10 | "Refusal to comply with 職務質問 is allowed unless 逮捕状 or 捜索差押令状" | FAQ Q1 | Confirm legal limits of 職務質問 per 警察官職務執行法 2条 — note in practice police use 任意 to pressure | Confirm with practitioner nuance |
| 11 | 入管法 — "must always carry 在留カード; failure is separate offense" | `documentsChecklist`, `commonMistakes` | Confirm per 入管法 23条 + penalty (max 20万円 fine for carry; 1 year/20万円 for non-presentation) | Confirm |
| 12 | "Police cannot use coercion/promises to obtain statement; coerced statements excluded by court" | Step 4 | Confirm per 刑訴法 319条 + relevant 判例 | Confirm |

**Already-verified sources**:
- https://www.nichibenren.or.jp/
- https://www.houterasu.or.jp/

**Specific questions for reviewer**:
1. 黙秘権 / 不利益推認 — is the current framing legally accurate, or should we soften ("im lặng KHÔNG được dùng làm bằng chứng buộc tội")?
2. Should we expand 被疑者国選 (pre-indictment public defender) section?
3. Are there practitioner tips for Vietnamese clients specifically (e.g., common misunderstandings during interrogation)?

**Output format reviewer should use**:
- For each item: ☐ confirmed / ☐ needs revision / ☐ flag for legal risk
- Suggested wording change (if any)
- Additional caveats / disclaimers to add

---

### nhk-contract-guide.ts — 弁護士 consumer / NHK受信契約 specialist

**File**: `src/constants/content/adminGuides/guides/nhk-contract-guide.ts`
**Risk**: HIGHEST
**Why this needs external review**: NHK 受信契約 is a heavily litigated area (最判 H29.12.6 平成26(受)1440・1441). Cooling-off applicability to NHK contracts is legally contested. Need expert to balance accurate-but-not-misleading framing.

**Claims to verify**:

| # | Claim in guide | Where in file | Verification question | Suggested expert action |
|---|---|---|---|---|
| 1 | 放送法 art.64 — household with NHK-receivable equipment **generally has** obligation to contract | `description`, Step 1, FAQ Q1 | Confirm framing per 最判 H29.12.6 + 放送法 64条 | Confirm |
| 2 | Definition of "receivable equipment" — "TV, One-Seg/Full-Seg tuner, some game consoles, some One-Seg phones, some car TVs" | FAQ Q1 | Verify current technical/legal scope per NHK + 総務省 guidance | Confirm |
| 3 | "Smart TV used only for Netflix/YouTube — gray legal area" | FAQ Q2 | Verify per NHK published interpretation + recent litigation | Confirm |
| 4 | Cooling-off (特商法 8 days) for NHK 受信契約 — "vùng tranh cãi" / disputed | `description`, `quickAction.ifLate`, FAQ Q4, Step 5 | Confirm current consumer-law expert consensus + 国民生活センター ADR (cited) | Confirm / Suggest definitive framing |
| 5 | 不退去罪 — "applicable if NHK visitor refuses to leave after clear request" | FAQ Q3 | Confirm per 刑法 130条後段 — threshold for applicability | Confirm |
| 6 | "Japanese law permits one-party recording of one's own conversation" | `commonMistakes`, Step 2 | Confirm — note workplace/private-law nuance | Confirm |
| 7 | 内容証明郵便 cost "~1,300円 trở lên" | `fees`, FAQ Q4 | Verify current Japan Post 一般書留 + 内容証明 + 配達証明 pricing 2026 | Confirm |
| 8 | "Cancellation of existing 受信契約 only allowed under NHK's conditions (no receivable equipment / moved abroad)" | `fees`, FAQ Q5 | Confirm per NHK 日本放送協会放送受信規約 + recent case law on grounds for cancellation | Confirm |
| 9 | Phone numbers — 国民生活センター **188**, 警察相談 **#9110** | `quickAction.office`, `whereToDo` | Verify active 2026 | Confirm |
| 10 | Conservative framing throughout — "đây không phải tư vấn pháp lý cá nhân" disclaimers | `description`, FAQ, Step 5 | Is the current disclaimer level appropriate, or should we strengthen? | Confirm / Suggest |

**Already-verified sources**:
- https://www.nhk.or.jp/
- https://www.kokusen.go.jp/
- https://www.kokusen.go.jp/adr/hunsou/data/adr-20140522_019.html
- https://www.courts.go.jp/app/files/hanrei_jp/281/087281_hanrei.pdf (最判 H29.12.6)

**Specific questions for reviewer**:
1. What is the safest current framing of cooling-off applicability to NHK?
2. The 最判 H29.12.6 ruling — should we explicitly cite it in the guide as the binding precedent on the obligation-to-contract?
3. Is "smart TV with no tuner = no obligation" defensible, or should we steer users to NHK customer center for case-by-case determination?

**Output format reviewer should use**:
- For each item: ☐ confirmed / ☐ needs revision / ☐ flag for legal risk
- Suggested wording change (if any)
- Additional caveats / disclaimers to add

---

## Reviewer assignment summary

| Reviewer type | Guides assigned | Estimated hours |
|---|---|---|
| 弁護士 consumer law | consumer-rights-cooling-off, nhk-contract-guide | 4–6 hours total |
| 弁護士 DV + 行政書士 入管 (joint or sequential) | domestic-violence-dv-support | 3–4 hours |
| 弁護士 + 税理士 cross-border inheritance | inheritance-will-japan-foreigners | 4–6 hours |
| 行政書士 入管 | specific-residence-card-my-number-2026, visa-fee-increase-2025-2026, ikusei-shuro-system-guide | 5–7 hours total |
| 税理士 cross-border (JP + VN) | tax-on-remittance-to-vietnam | 2–3 hours |
| 弁護士 hình sự (criminal defense) | police-questioning-rights-japan | 2–3 hours |

**Total**: 20–29 reviewer hours across 6 specialist tracks, covering 9 guides.

## How to engage reviewers

- **Suggested compensation**: ¥30,000–60,000 per guide (1–3 hours) depending on complexity. Inheritance and DV guides are at the higher end; police questioning and NHK at the lower end.
- **Format**: each guide gets a copy of this brief + read-only access to the guide file (paste content if no GitHub access — files are TypeScript constants, fully readable as plain text).
- **Turnaround**: 2–3 weeks per reviewer.
- **Deliverable**: marked-up brief (this document) + suggested wording diffs per claim flagged. For "flag for legal risk" items, request a recommended replacement paragraph.
- **Priority order** (if budget-constrained, start with these):
  1. `domestic-violence-dv-support.ts` — Hague Convention + 保護命令 expansion (likely outdated)
  2. `inheritance-will-japan-foreigners.ts` — tax brackets + 制限納税義務者 scope
  3. `visa-fee-increase-2025-2026.ts` — exact fee figures, internal consistency with 特定在留カード guide
  4. `police-questioning-rights-japan.ts` — 黙秘権 + detention timeline (life-safety critical)
- **Cross-file consistency check**: When reviewing `specific-residence-card-my-number-2026.ts` and `visa-fee-increase-2025-2026.ts`, note the apparent contradiction on application fees (4,000円 vs 6,000円) — needs single source of truth.
- **Translation note**: Guides are written in Vietnamese with Japanese legal terms. Reviewers may provide feedback in Japanese; user can translate.
