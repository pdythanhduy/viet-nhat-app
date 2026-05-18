# ASO strategy — v1

**Status**: strategy proposal. No App Store / Play Store changes have been submitted under this strategy yet.
**Companion**: [`docs/v1.5.0-app-store-audit.md`](v1.5.0-app-store-audit.md) for the screenshot/copy audit + redesign proposal. This doc focuses on the **ranking** levers (title, subtitle, keywords, description SEO).

---

## 1. Title options

App Store title limit: 30 characters. Play Store limit: 50 characters.

### Current (assumed v1.4)

`Cẩm Nang Việt Nhật` — 18 chars. Clean, brand-only.

### Proposed options

| Option | Char count | Pros | Cons |
| --- | --- | --- | --- |
| **A: `Cẩm Nang Việt Nhật`** (current) | 18 | Memorable, brand-only, Vietnamese-first | No keyword density |
| **B: `Cẩm Nang Việt Nhật — Visa, Thủ tục`** | 33 | Carries top 2 search terms. Just over App Store limit (30) — would need to drop to "Visa & Thủ tục" (27) | Borderline-long |
| **C: `Cẩm Nang Việt Nhật — Visa & Thủ tục`** | 36 → Apple cuts. **Play Store only** | Strong keyword density on Play Store | Doesn't fit App Store |
| **D: `Cẩm Nang Việt Nhật: Sống ở Nhật`** | 30 | Brand + emotional positioning. Right at limit | "Sống" is broader than search intent |

**Recommendation**: **Option A for App Store, Option C for Play Store**. The two stores have different limits, and a longer Play Store title earns ranking benefit there without compromising the App Store look.

---

## 2. Subtitle (App Store only — 30 chars)

Apple shows this directly under the title in search results.

| Option | Char count | Reasoning |
| --- | --- | --- |
| **A: `Cho người Việt ở Nhật`** | 21 | Audience targeting. Clear. |
| **B: `Visa, Thuế, Đời sống Nhật`** | 25 | Top 3 keywords. Clearest scope. |
| **C: `Hướng dẫn sống ở Nhật`** | 21 | Positioning. |
| **D: `Visa, thủ tục, đời sống`** | 23 | Same as B without "Nhật" — Nhật in title already |

**Recommendation**: **Option D** — covers all three pillars, doesn't double "Nhật", reads naturally.

---

## 3. Keyword targets (Apple ASO keyword field, 100 chars per locale)

Apple's keyword field is INVISIBLE to users but feeds search. Comma-separated, no spaces around commas (commas count), 100-char limit.

### Vietnamese locale (`vi`)

Tier 1 (must include):
- `visa` — universal
- `nhat ban` / `nhat` — country
- `cam nang` — brand category
- `thu tuc` — process
- `nguoi viet` — audience

Tier 2 (high intent):
- `zairyu` / `the cu tru` — residence card
- `vinh tru` / `eijuu` — permanent residency
- `nenkin` — pension
- `bao hiem` — insurance
- `my number` — universal ID
- `thue` — tax

Proposed string (98 chars, Apple counts commas):

```
visa,nhat ban,cam nang,thu tuc,nguoi viet,zairyu,the cu tru,nenkin,bao hiem,my number,thue,vinh tru
```

### English locale (`en`)

Tier 1:
- `japan` — country
- `vietnamese` — audience
- `visa` — universal
- `immigration` — broader intent
- `residency` — permanent

Tier 2:
- `nenkin` — pension keyword many Vietnamese use in EN context
- `zairyu` — residence card
- `my number`
- `tax japan`
- `life japan`

Proposed string (96 chars):

```
japan,vietnamese,visa,immigration,residency,nenkin,zairyu,my number,tax japan,life japan,jp
```

### Don't include
- Words already in the title (`cẩm nang`, `việt nhật`) — Apple deduplicates automatically
- Generic words (`app`, `tool`, `mobile`) — wasted bytes
- Competitor names (anti-pattern, Apple may reject)
- Government brand names (`MOJ`, `ISA`) — risk of misappropriation flag

---

## 4. Description SEO

Google indexes the Play Store description. Apple indexes the first 252 chars (the "above the fold" text).

### First 252 chars (Apple search snippet)

Draft (251 chars):

> Cẩm Nang Việt Nhật — hướng dẫn 127 thủ tục, đời sống và pháp lý cho người Việt ở Nhật. Tìm visa, thuế, nenkin, my number, in-thuê, bằng tiếng Việt, romaji hoặc tiếng Nhật. Nguồn chính thức (出入国在留管理庁 / 厚生労働省 / 法テラス). Free, no ads.

Key phrases bolded by Apple's snippet algorithm: `Cẩm Nang Việt Nhật`, `thủ tục`, `pháp lý`, `người Việt ở Nhật`, `Free, no ads`.

### Full description structure

```
[Lead paragraph]                  — 252-char hook (above)
[3 sub-headings]                  — Visa & Thủ tục / Đời sống / Pháp lý + Khẩn cấp
[5 bullet improvements per heading]
[Privacy paragraph]               — No ads, no PII, no auto-renewal
[Source paragraph]                — Mention 出入国在留管理庁 + 厚生労働省 + 法テラス
[Contact paragraph]               — Email for bug reports / feedback
```

Full draft lives in `docs/v1.5.0-changelog.md` "Long version (≤ 4000 chars)" section. Pull from there at submission time.

---

## 5. Screenshot strategy

Already documented in `docs/v1.5.0-app-store-audit.md` §2. The 6-screenshot lineup:

1. Search (positioning differentiator)
2. Featured + emergency CTA
3. Guide detail with related-guides surface
4. Home with featured row
5. Daily Ritual
6. Trust signal (official sources block)

The PR for this doc does NOT redesign screenshots. That's a separate task gated by §3 of the App Store audit.

---

## 6. Competitor comparison

Apps in the adjacent space (Vietnamese-language Japan-help apps):

| App | Strength | Weakness | Our differentiator |
| --- | --- | --- | --- |
| Generic "Japan visa" apps | Coverage breadth | Vietnamese audience neglect | Vietnamese-first content |
| Japanese-government bilingual portals | Authoritative | Hard to navigate, no offline | App UX + search |
| Japanese-language schools' apps | Language learning | No legal/admin scope | Three-pillar scope |
| Community forums (Facebook groups) | Fresh discussion | Unverified info | Source-cited content |
| ChatGPT / Gemini Vietnamese | Free, conversational | Hallucination risk on legal | Source-anchored content |

Positioning takeaway: **emphasize source-verification and offline access**, not features. Those are the two moats that AI tools and forums can't match.

---

## 7. Positioning analysis (`Cẩm nang sống ở Nhật cho người Việt`)

Why this framing wins:

- **"Cẩm nang"** (handbook) — connotes thorough, reference-grade, not "tips". Vietnamese readers associate `cẩm nang` with `cẩm nang sinh viên`, `cẩm nang gia đình` — established trust signal.
- **"Sống ở Nhật"** (living in Japan) — covers all three pillars without listing them. Broader than "visa app" but narrower than "Japan info".
- **"Cho người Việt"** (for Vietnamese people) — audience specificity. Apps that try to serve "all foreigners in Japan" are diluted.

Why NOT alternatives:

- ❌ "Hướng dẫn thủ tục Nhật" — too narrow, misses retention surfaces
- ❌ "Sống tốt ở Nhật" — implies lifestyle/quality, we're more utility-focused
- ❌ "App người Việt Nhật" — vague; could be a community / dating app

---

## 8. Launch ASO timeline (proposed)

When v1.5.0 ships:

| Week | Action |
| --- | --- |
| Launch week | Submit with current title + new keyword fields per §3 |
| Week 2 | Monitor Aptabase + App Store Connect daily install numbers. No keyword changes yet |
| Week 4 | If install rate is < 10/week, swap to Option D subtitle (Visa, thủ tục, đời sống) |
| Week 6 | If still flat, refresh screenshots per `v1.5.0-app-store-audit.md` |
| Month 3 | First social content cycle (TikTok format A, B, E) per `social-content-engine.md` |
| Month 6 | Evaluate paid acquisition (only if organic > 100/week sustained) |

No paid ads in months 0-3. Organic + ASO only.

---

## 9. Ineligible / risky tactics

Hard NO:

- ❌ Keyword stuffing in description (Apple penalty)
- ❌ Fake reviews (Apple/Google ban risk)
- ❌ Incentivized installs (paying users to install)
- ❌ Comparing by name to government apps
- ❌ Using government agency logos or names in marketing copy
- ❌ Claiming endorsement we don't have

Tactics to defer until later:

- 🟡 Paid app install ads — wait for organic baseline
- 🟡 Influencer partnerships — wait for `social-content-engine.md` cycle 1
- 🟡 SMS-based growth — privacy-sensitive
- 🟡 In-app rating prompt — wait until DAU > 100; rating prompts on a new app burn goodwill

---

## 10. Metrics to watch

After v1.5.0 ships, check weekly:

1. **Impressions** (App Store Connect / Play Console)
2. **Conversion rate** (Impressions → Installs) — target > 3%
3. **Keyword ranking** for the Tier 1 terms in §3
4. **Search-driven installs** vs. direct/referral — target search > 60% (sign that ASO is working)
5. **First-week retention** — target > 25% (sign that the install was relevant)

If conversion < 1%, screenshots need refresh. If keyword ranking is poor, keyword field needs tuning. If first-week retention is < 10%, the app under-delivers on the positioning promise — bigger issue than ASO can fix.

---

## Related docs

- [`docs/v1.5.0-app-store-audit.md`](v1.5.0-app-store-audit.md) — screenshot audit + 6-screenshot proposal
- [`docs/v1.5.0-changelog.md`](v1.5.0-changelog.md) — EN/VI release notes draft
- [`docs/social-content-engine.md`](social-content-engine.md) — TikTok/Shorts format playbook
- [`docs/content-governance.md`](content-governance.md) — compliance rules apply to ASO copy too
