# Growth Asset Pack — ASO v1

**Date**: 2026-05-23
**Status**: assets pack. Not yet submitted. Builds ON TOP of `docs/aso-strategy-v1.md` — that doc defines ranking strategy; this doc supplies the actual variants ready to A/B-pick.
**Companion**: [`docs/v1.5.0-app-store-audit.md`](../v1.5.0-app-store-audit.md), [`docs/content-governance.md`](../content-governance.md) (compliance applies to copy too).

Constraints carried from observation season:
- No code change implied by any of this.
- No fake claims. Every benefit must map to a shipped feature in v1.5.0 (build 26).
- No App Review-risky language (see anti-clickbait rules §8).

---

## 1. App Store subtitle options (30 chars)

| # | Variant | Chars | Angle | Notes |
| --- | --- | --- | --- | --- |
| S1 | `Visa, thủ tục, đời sống` | 23 | Utility / scope | Current recommendation from aso-strategy §2 D |
| S2 | `Cho người Việt sống ở Nhật` | 26 | Audience-specific | Strongest if Apple struggles to identify audience |
| S3 | `Visa · Thuế · Đời sống · Học` | 28 | 4-pillar laundry | Use only if competing app shortens scope |
| S4 | `Cẩm nang offline cho người Việt` | 30 | Differentiator: offline | Hits a moat phrase competitors lack |
| S5 | `Tra cứu thủ tục bằng tiếng Việt` | 30 | Function-first | Strongest CTR hypothesis — names what user clicks for |
| S6 | `Visa, zairyu, nenkin, my number` | 29 | Keyword bomb | Skim-readable but no positioning |
| S7 | `Sống ở Nhật không hoang mang` | 27 | Emotional / anti-fear | Use IF emotional positioning track wins §5 |

**Default pick**: S1 ship; S5 as the planned swap after week-2 if CTR < 3%.
**Avoid**: S6 — reads like spam in Vietnamese; will hurt brand trust.

---

## 2. Keyword bank (per locale)

Apple keyword field: 100 chars per locale, comma-separated, NO spaces around commas.

### 2.1 Vietnamese locale (`vi`)

Already in `aso-strategy-v1.md` §3. This pack ADDS a secondary tier ready to swap in if the primary underperforms.

Primary (ship at launch — 98 chars, from existing strategy):
```
visa,nhat ban,cam nang,thu tuc,nguoi viet,zairyu,the cu tru,nenkin,bao hiem,my number,thue,vinh tru
```

Swap-in option A (drop "thue" + "vinh tru", add fear-driven terms — 97 chars):
```
visa,nhat ban,cam nang,thu tuc,nguoi viet,zairyu,the cu tru,nenkin,bao hiem,my number,mat the,khan
```

Swap-in option B (drop "thu tuc" + "my number", add task-driven — 96 chars):
```
visa,nhat ban,cam nang,nguoi viet,zairyu,the cu tru,nenkin,bao hiem,thue,chuyen nha,baito,kakutei
```

Rotate ONE option at a time so we can attribute movement.

### 2.2 English locale (`en`)

Primary (from aso-strategy §3 — 96 chars):
```
japan,vietnamese,visa,immigration,residency,nenkin,zairyu,my number,tax japan,life japan,jp
```

Swap-in option C (newcomer-targeted — 99 chars):
```
japan,vietnamese,visa,immigration,newcomer,nenkin,zairyu,my number,tax japan,resident,jp,help
```

Swap-in option D (emergency-targeted — 98 chars):
```
japan,vietnamese,visa,immigration,emergency,nenkin,zairyu,my number,tax,housing,help,jp,life
```

### 2.3 Japanese locale (`ja`) — proposed addition

Apple's `ja` locale field gives free keyword space for Japanese-language users searching for our content. The audience is Vietnamese people who may search in Japanese terms.

Proposed (94 chars):
```
ベトナム人,在留,ビザ,年金,確定申告,国民健康保険,生活,日本生活,ハンドブック,マイナンバー
```

Risk: low — none of these are competitor brand names; all are generic concept terms.

### 2.4 Diacritic vs no-diacritic policy

Vietnamese keyword field: **always no-diacritic** (Apple doesn't fold diacritics in the keyword field; users typically type without diacritics on Japanese phones).

Description field: **with diacritic** (the description is shown verbatim; readability matters).

This intentional asymmetry catches both populations.

---

## 3. JP / VI positioning angles

The app speaks Vietnamese first but lives in Japan. Pick one positioning per asset; don't blend.

### 3.1 Pure-Vietnamese positioning (`vi-first`)

> "Cẩm nang tiếng Việt cho người Việt ở Nhật."

When: the asset target is a Vietnamese user who hasn't yet built Japanese vocabulary.
Strength: emotionally clear, low cognitive load.
Weakness: looks "limited" if competitor lists Japanese terms.

### 3.2 Bilingual co-positioning (`vi-jp`)

> "Tìm bằng tiếng Việt hoặc tiếng Nhật — zairyu, nenkin, kakutei shinkoku — không cần biết kanji."

When: the asset target is a mid-tenure user (1-3 years in Japan) who knows romaji but doesn't read kanji.
Strength: demonstrates we cover both lookup styles.
Weakness: longer copy.

### 3.3 Japanese-keyword-led positioning (`jp-led`)

> "在留・年金・確定申告 をベトナム語で。"

When: the asset target is a Vietnamese long-resident searching in Japanese.
Strength: shows we don't dumb down content.
Weakness: alienates newcomer audience.

Recommendation: **default to 3.2 bilingual** for store description; use 3.1 for hero screenshot; use 3.3 only in Japanese-locale store metadata.

---

## 4. Screenshot headline sets (5 sets, 6 headlines each)

These are headlines for the 6-screenshot lineup defined in `v1.5.0-app-store-audit.md` §2. Pick ONE set per submission.

### Set A — Utility-led (calm, scope-focused)
1. "Tìm thủ tục bằng tiếng Việt, romaji hoặc tiếng Nhật"
2. "Khẩn cấp? Trung tâm hỗ trợ một cú chạm"
3. "Mỗi guide gợi ý các thủ tục liên quan"
4. "Hỗ trợ từ tuần đầu mới sang Nhật"
5. "Học tiếng Nhật mỗi ngày — không spam"
6. "Nguồn chính thức cho mọi thủ tục"

### Set B — Emotional-led (anti-fear)
1. "Không phải lo gõ sai từ khoá nữa"
2. "Lúc khẩn cấp, không cần nhớ số"
3. "Không bị lạc giữa 127 thủ tục"
4. "30 ngày đầu — đã có cẩm nang"
5. "Tiếng Nhật quen tay — không áp lực"
6. "Yên tâm vì nguồn từ 出入国在留管理庁"

### Set C — Function-led (verbs first)
1. "Gõ — tìm — đọc thủ tục"
2. "Mất giấy tờ? Mở app, làm theo"
3. "Đọc 1 guide, tìm thấy 5 guide liên quan"
4. "Lưu guide để đọc lại lúc cần"
5. "Học 5 phút mỗi ngày"
6. "Mọi link đều dẫn về nguồn chính thức"

### Set D — Number-led (concrete proof)
1. "127 thủ tục, tra cứu bằng 4 ngôn ngữ"
2. "1 chạm đến số khẩn 110 / 119 / 法テラス"
3. "Mỗi guide có 5-8 thủ tục liên quan"
4. "First 7 / 30 / 90 ngày ở Nhật — checklist sẵn"
5. "76+ câu mẫu tiếng Nhật — chỉ vào màn hình mà nói"
6. "100% nguồn .go.jp — kiểm tra được"

### Set E — Newcomer-led (first-90-days framing)
1. "Mới sang Nhật? Bắt đầu ở đây"
2. "Mất thẻ cư trú — đừng hoảng"
3. "Mỗi thủ tục có 'việc tiếp theo' rõ ràng"
4. "Lộ trình 90 ngày đầu — tuần nào việc đó"
5. "Tiếng Nhật cho người mới — không kanji"
6. "Mọi hướng dẫn — tự kiểm chứng được"

**Default pick**: Set A for launch (matches calm utility positioning).
**Test pick**: Set E for paid campaign month 3 (newcomer high-intent traffic).

---

## 5. Emotional positioning strategies (3)

A positioning is a 1-sentence answer to "why install". Build the rest of the marketing around it; do not mix.

### E1 — "Đừng để lúc cần mới tìm"
**Pain**: user remembers procedures only at the deadline.
**Promise**: pre-loaded knowledge that travels with the user.
**Anchor screenshot**: featured row + emergency CTA on Search empty state.
**Risk**: implies the app is for emergencies only (under-sells daily use).

### E2 — "Không bị mất tiền vì không biết"
**Pain**: user pays unnecessary fees / taxes / fines (kokuho overpayment, NHK forced sign-up, late-filing penalty).
**Promise**: every guide names the cost-saving option upfront.
**Anchor screenshot**: a tax / insurance guide with "Có thể bạn đang đóng thừa" callout.
**Risk**: borderline-aggressive — must avoid "guaranteed savings" wording (see §8).

### E3 — "Có người Việt khác đã đi qua"
**Pain**: user feels isolated, doesn't know which procedure applies to "people like me".
**Promise**: content is Vietnamese-tailored, not auto-translated.
**Anchor screenshot**: "Cho người mới sang Nhật" Home section + a guide showing Vietnamese-Japanese bilingual counter phrases.
**Risk**: don't claim community — we are NOT a community app.

---

## 6. Utility positioning strategies (3)

### U1 — "Tra cứu offline khi không có wifi"
**Functional truth**: every guide ships with the binary; no network needed.
**Differentiator from forums / chatbots**: works on shinkansen, hospital basement, mountain trip.
**Anchor screenshot**: guide detail with airplane-mode icon visible in status bar.
**Risk**: small — but must NOT promise zero-data behavior if any future feature pings network.

### U2 — "127 thủ tục, mỗi cái có nguồn"
**Functional truth**: every guide cites at least one `.go.jp` source.
**Differentiator**: AI tools hallucinate; forums are unverified; our content is source-anchored.
**Anchor screenshot**: official-sources block at the bottom of any guide.
**Risk**: 127 grows over time — don't hard-code in screenshot text. Use "100+" or version-by-version.

### U3 — "1 chạm đến thủ tục liên quan"
**Functional truth**: the "Xem thêm liên quan" section at the bottom of every guide.
**Differentiator**: Google search and forums don't link cross-references.
**Anchor screenshot**: any guide scrolled to the related-guides block.
**Risk**: requires users to scroll — top-of-screenshot impact is weaker.

---

## 7. Top competitor observations (positioning intel)

Updated 2026-05-23. No competitor names — describe by category. Specific names omitted on purpose; per `aso-strategy-v1.md` §9 we never compare by name.

| Category | What they do well | Where they leak attention | Our angle |
| --- | --- | --- | --- |
| Generic Japan-visa apps | Broad immigration topic coverage | English-only, no Vietnamese | "Tiếng Việt" must appear in subtitle |
| AI chatbot apps (Vietnamese) | Conversational, "answers anything" | Hallucination on legal; no offline | "Nguồn .go.jp" must appear in screenshots |
| Government bilingual portals | Authoritative source | Hard UX, no offline, no search | "Tìm bằng tiếng Việt" beats their search |
| Facebook groups for Vietnamese in Japan | Fresh anecdotes | Unverified, scrollable forever | "Mỗi guide có nguồn" — verifiable |
| Japanese-language learning apps | Brand recognition | No admin/legal content | "Thủ tục + đời sống + tiếng Nhật" 3-pillar |

**The cross-category insight**: our defensible position is the intersection of *Vietnamese language* + *source-verified* + *offline* + *admin scope*. Every asset should reinforce at least 2 of those 4. Lose one and we look like a competitor variant.

---

## 8. Anti-clickbait rules (enforced for every asset in this pack)

Per `content-governance.md` §1, ASO copy MUST follow the same rules.

| ❌ Never use | Why |
| --- | --- |
| "Tăng tỷ lệ đậu" / "guaranteed approval" | Implies guarantee Apple's ASR will flag and Vietnamese readers associate with visa brokers |
| "100%" / "hoàn toàn miễn phí" | "Miễn phí" alone is fine; "hoàn toàn" implies exception-free which is unprovable |
| "Cứu cánh" / "đường thoát" / "loophole" / "hack" | App Review red flag + legally misleading |
| Brand names of government agencies as endorsement | E.g. "Được ISA công nhận" — never. We are not endorsed by anyone. |
| Competitor app names | Per Apple guidelines and §9 of aso-strategy |
| Country names in superlatives ("Số 1 Nhật Bản") | Unprovable; risky |
| Time-pressure language ("Cài ngay kẻo trễ") | Anti-fear positioning we explicitly avoid |
| Emoji-heavy headlines (🇯🇵🇻🇳🔥💸) | Looks low-trust on store; conflicts with calm utility brand |

### Borderline phrases that need a co-occurring qualifier

| ⚠️ Phrase | Add this qualifier |
| --- | --- |
| "Đọc free, không ads" | OK as-is — both are true |
| "Tra cứu offline" | Add "không cần wifi" — clarifies the offline meaning |
| "Mọi nguồn chính thức" | Add ".go.jp" — proves rather than asserts |
| "Cẩm nang sống ở Nhật" | OK if NOT followed by "đầy đủ nhất" (superlative) |

---

## 9. Conversion hypotheses (test post-launch, not before)

Each hypothesis is a single sentence with a measurable conversion-rate prediction. Run only after the observation season closes (see `docs/observation-season-freeze.md`).

| # | Hypothesis | Predicted CVR effect | Risk if wrong |
| --- | --- | --- | --- |
| H1 | Switching subtitle from S1 to S5 lifts install CVR by ≥ 1 pp | +1 pp CVR | -0.5 pp if S5 is too narrow |
| H2 | Set E screenshot headlines outperform Set A among newcomer cohort (install + retain D1) | +5% D1 retention | Lose calm brand tone |
| H3 | Adding Japanese-locale keyword field (§2.3) lifts impressions from JP-language searches by ≥ 20% | +20% impressions | None — strictly additive |
| H4 | Emotional positioning E1 yields higher install rate but lower D7 retention than utility positioning U1 | +0.5 pp CVR, -3% D7 | Wrong audience installed |
| H5 | Removing the v1.4 Daily Ritual screenshot in favor of a second search screenshot lifts CVR among search-intent searchers | +0.8 pp CVR | Daily-Ritual surface gets less first-touch |

**Test cadence**: one variable at a time. Minimum 2-week observation window per hypothesis. Reuse the cadence discipline from `no-data-action-policy.md` — don't conclude in week 1.

---

## 10. Submission checklist (when ASO assets ship)

Before submitting App Store / Play Store metadata changes:

- [ ] Subtitle picked from §1 (default S1)
- [ ] Keyword string picked from §2 (primary)
- [ ] Screenshot headline set picked from §4 (default A)
- [ ] All copy passes §8 anti-clickbait grep (no banned phrases)
- [ ] Every benefit claim maps to a feature shipped in current build (no aspirational copy)
- [ ] No `lastVerified` date written in marketing copy (it leaks the verification cycle outward)
- [ ] No paid review / install incentive being run during the test window
- [ ] Submission date recorded in `docs/reports/aso-submission-YYYY-MM-DD.md` (NEW file per submission — not this doc)

This doc is a **menu**, not a submission record. Pick from the menu, file the choice in a per-submission report.

---

## Related docs

- [`docs/aso-strategy-v1.md`](../aso-strategy-v1.md) — ranking strategy (existing)
- [`docs/v1.5.0-app-store-audit.md`](../v1.5.0-app-store-audit.md) — screenshot proposal (existing)
- [`docs/v1.5.0-changelog.md`](../v1.5.0-changelog.md) — release notes draft
- [`docs/growth/screenshot-storyboards.md`](screenshot-storyboards.md) — sister doc, the 2-second takeaway per screenshot
- [`docs/growth/landing-copy-v1.md`](landing-copy-v1.md) — sister doc, landing page copy
- [`docs/growth/short-video-hooks.md`](short-video-hooks.md) — sister doc, social hooks
- [`docs/content-governance.md`](../content-governance.md) — compliance rules
