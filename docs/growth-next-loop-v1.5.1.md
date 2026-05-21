# Growth — next loop (v1.5.1 foundation)

**Date**: 2026-05-21
**Status**: planning doc only. No deep-link / landing-page code lands in v1.5.1. This is the prerequisite map for the v1.6 growth wave.
**Companions**:
- [`aso-strategy-v1.md`](aso-strategy-v1.md) — App Store / Play Store ranking levers (orthogonal to deep links)
- [`social-content-engine.md`](social-content-engine.md) — content-side hook formats; this doc covers the link infrastructure that content depends on
- [`v1.5.0-app-store-audit.md`](v1.5.0-app-store-audit.md) — screenshot + copy refresh proposal

---

## 1. What v1.5.0 shipped on the growth side

- ✅ Native share on every guide (`shareGuide` in `src/utils/shareGuide.ts`)
- ✅ `guide_share { guide_id, completed }` analytics tracking completion vs cancel per share
- ✅ Marketing URL placeholder: `https://camnangvietnhat.app` (does NOT exist yet)
- ✅ ASO strategy doc with vi+en keyword fields
- ✅ Social content playbook (5 hook formats, top-10 high-share guide priority, compliance gates)
- ❌ No deep-linking — the shared URL is a placeholder pointing at a non-existent landing page
- ❌ No landing page — the marketing domain is unowned
- ❌ No measurable funnel from social → install (share counts exist, but install attribution does not)

---

## 2. The link-layer gap

Every shared guide today routes through a single un-resolvable URL. That means:

| Surface | Today's state | What's missing |
| --- | --- | --- |
| User taps a shared link on a friend's phone (no app installed) | 404 / browser error | A landing page that promotes the install AND deep-links to the guide once installed |
| User taps a shared link with the app installed | Browser opens, NOT the app | Universal Link (iOS) + App Link (Android) so the link opens directly to the guide |
| Social posts (TikTok / Reels / Facebook reels) | No link in caption that works as both fallback + deep link | Same link infra |
| Search/web SEO traffic | None | Landing page must rank for "cẩm nang việt nhật" + top guide titles |

**Net**: native share is wired but earns zero attributable installs today. v1.5.1 closes the foundation gap (this doc) so v1.6 can ship the implementation.

---

## 3. What deep linking needs (DO NOT implement in v1.5.1)

A working deep link to a specific guide (e.g. `permanent-residency-eijuu`) requires ALL of the following before any code is written:

### Infrastructure prerequisites

1. **Domain ownership** — `camnangvietnhat.app` (or chosen alternate) registered, DNS pointing at a host we control. **STATUS: not done.**
2. **HTTPS hosting** with deterministic uptime (universal links REQUIRE https + Apple's AASA file fetched from `/.well-known/apple-app-site-association` without redirects).
3. **Apple App Site Association (AASA) file** — JSON file at `/.well-known/apple-app-site-association` listing the app's Team ID + Bundle ID + paths. Apple fetches once per install; bad JSON = broken silently for weeks.
4. **Android Asset Links** — JSON file at `/.well-known/assetlinks.json` with the SHA-256 fingerprint of the release signing cert. Different fingerprints for debug / production = need to ship the prod one only.
5. **App Store / Play Store entries listing the same Bundle ID / Application ID** as in the AASA / asset-links — already true for v1.5.0 (App Review-approved).

### App-side prerequisites (in this repo)

6. **expo-linking config** — `app.json` → `expo.scheme` already set for custom-scheme dev links. Universal links / app links need additional entries:
   - iOS: `expo.ios.associatedDomains: ['applinks:<domain>']`
   - Android: `expo.android.intentFilters: [{ action, autoVerify, data: [{ scheme: 'https', host: '<domain>' }], category: ['BROWSABLE', 'DEFAULT'] }]`
7. **`Linking.getInitialURL()` handler in `App.tsx`** to route incoming deep links to the right screen.
8. **`navigation/linking.ts` config** for `@react-navigation/native` — maps URL patterns (`/guide/:guideId`) to navigator routes (`AdminDetail` with param `guideId`).
9. **Fallback for unknown / unregistered slugs** — guide-id slug mismatch (after a content rename) must NOT crash; route to a fallback `Search` screen pre-populated with the slug as query.
10. **Analytics event** — new `deep_link_opened { guide_id, source }` event so we can measure deep-link conversion vs marketing-URL bounce. Goes into `EventMap` + `analytics-events.md` + `analytics-decision-map.md`.

### Compliance prerequisites

11. **iOS App Review re-check** — adding `associatedDomains` triggers a new review (entitlement change). Plan an extra 24-48h review cycle.
12. **Privacy posture** — confirm no PII in URL path. Slug `permanent-residency-eijuu` is public-as-content (fine). UTM params for attribution: enum-bounded only (`utm_source` ∈ predefined set), NEVER user-identifying tokens.

### Decision gate: do NOT start deep-link implementation until ALL of the following are true

- Domain registered + hosting configured (items 1-2)
- AASA + asset-links files validated by `applinks-validator` and `Digital Asset Links API` test tool (items 3-4)
- App-link / universal-link config decision is signed off (item 6 — small but irreversible in production)
- A specific growth experiment is queued behind it (we don't add infra without a measurable use case)

If any one is missing, the link layer is theatre — it adds maintenance burden without earning installs.

---

## 4. What the landing page needs

A working landing page is a single static site (no backend) that serves three audiences:

| Audience | What they need | What success looks like |
| --- | --- | --- |
| User who tapped a shared link, no app installed | A reason to install + a preview of the specific guide | Install conversion ≥ 5% of unique landing visits |
| User with the app installed | Universal Link / App Link routing (no landing page seen — link opens app) | Zero landing-page traffic from in-app users |
| Search engine crawler | Indexable content + OG meta + structured data | Page-1 ranking for "Cẩm Nang Việt Nhật" within 4 weeks of launch |

### Content checklist for the landing page

1. **Brand banner** — app icon, name, subtitle (matches Play Store title from ASO strategy)
2. **Top fold CTA** — App Store + Play Store badges (use official assets; do NOT make custom buttons)
3. **Guide preview block** — when arriving via `/guide/:guideId`, render the guide's title + description + first 3 checklist items. Pulls from a static JSON build of the bundled content (NOT a live API)
4. **Trust signals** — source citations preview, "no PII no ads no backend" badges, lastVerified dates
5. **OG meta** — `og:title`, `og:description`, `og:image` per guide so a copy-paste of the link into Messenger / Zalo / Facebook renders a rich preview
6. **Structured data** — JSON-LD `Article` schema for guide pages, `MobileApplication` schema for the home page
7. **Privacy + terms pages** — already required by App Store / Play Store; landing page is the canonical host
8. **No tracking pixels** — the no-PII commitment extends to the landing page. Use Plausible / Aptabase-web / nothing — never GA4 or Facebook Pixel

### Operational checklist for the landing page

- Static generator (Astro / 11ty / plain HTML) — NOT a SPA, NOT Next.js (SSR overhead unnecessary)
- Build pipeline that pulls bundled guide content from this repo at build time (the static JSON dump). One source of truth for content.
- Deploy: Cloudflare Pages / Netlify free tier (no per-request cost, edge cached, easy DNS)
- Uptime monitor — UptimeRobot free tier, 5-min cadence, email alert
- Backup domain — secondary host record so a registrar outage doesn't break deep links
- Status: **DEFERRED** — start when items in §3 prerequisites are unblocked

---

## 5. Shareable checklist / card — the cross-app artifact

Today's share is a text message + URL. The next iteration is a **rich card** (or PNG) that survives the WhatsApp / Zalo / Messenger / Line preview crop. This is higher-leverage than chasing UTM attribution because the artifact itself sells the share.

### Card formats to consider

| Format | Pros | Cons | Estimated effort |
| --- | --- | --- | --- |
| **OG image (PNG, 1200×630)** | Renders inline in every messenger / social platform; cacheable; no app dep | Built server-side per-guide; tied to the landing page | 1-2 days post-landing |
| **PDF checklist export** | Lives offline; user can save / print; high-trust artifact | Bigger payload; not previewable inline; iOS share sheet treats as file | 2-3 days, leverages `expo-print` (NOT a new dep — already a category we know) |
| **In-app screenshot of the checklist** | Native; visible content is the value prop | User-driven (no automation); not shareable as a single canonical artifact | Zero — already possible today |
| **Direct guide-section quote (text)** | Lightweight; copies as a markdown block; works on every surface | No visual; doesn't promote the app brand | Zero — already possible via copy-paste |

### Recommendation for v1.6 (NOT v1.5.1)

1. **OG image per guide** — once the landing page exists, build OG images at site-build time using a Vercel OG / Satori-style script. One PNG per guide, regenerated when content changes.
2. **PDF checklist export** — second wave, only if v1.6 `guide_share` data shows shares concentrated on documents-heavy guides (top-N by share count). Skip if shares spread evenly.
3. **NO custom share sheet** — the OS sheet is already optimal. Building an in-app share preview is yak-shaving.

### Anti-recommendations (DO NOT build)

- ❌ A native "share to Instagram Stories" deep-link integration — Vietnamese-in-Japan audience is more Zalo / Messenger / WhatsApp than IG. Building IG-specific integration is wasted scope.
- ❌ A QR-code generator for each guide — QR codes don't add value when the link itself is already a deep link. Wasted screen + maintenance.
- ❌ User-customizable share text — every customization is a copy-review burden + a PII surface. The fixed template is correct.

---

## 6. TikTok / Reels funnel — how to actually measure

The classic web playbook (UTM tags + first-touch attribution) doesn't translate well to mobile-first social video. The realistic measurement stack:

### What CAN be measured

| Signal | Source | What it tells us |
| --- | --- | --- |
| **Install spike correlation** | App Store Connect / Play Console + posting timestamps | "Did installs lift in the 48h window after the video posted?" |
| **`guide_share` spike on featured guide** | Aptabase | If the video featured `permanent-residency-eijuu` and shares of that guide spike, the video drove engagement |
| **`search_query` spike for video keywords** | Aptabase + `normalizeQueryForAnalytics` | If the video mentioned "nenkin refund" and `search_query { q: 'nenkin refund' }` spikes, the video drove search intent |
| **App Store / Play Store search ranking for terms in the video** | Manual check (no API) or AppFollow / Sensor Tower (paid) | Lagging signal but cleanest install-attribution proxy |
| **Comment / DM volume on the video** | Native platform analytics | Engagement, not install; useful for content iteration |

### What CANNOT be measured (and don't try)

- **First-touch attribution** — TikTok / Reels do not expose deep-link click-through-to-install data outside paid campaigns. Don't promise this metric.
- **Per-video install count** — installs aren't pixel-trackable; the platform owns the attribution.
- **User-level funnels** — no shared user ID between video impression and install. The privacy posture forbids it anyway.

### Recommended funnel (v1.6, NOT v1.5.1)

1. **Pre-post**: tag the planned video with a single intended guide. Note the date + featured guide ID.
2. **Post → 48h**: pull a daily snapshot of (a) installs by store, (b) `guide_share` count for that guide, (c) `search_query` top-10 list.
3. **Post → 7d**: compute (post-day mean − pre-7-day mean) for each of (a)(b)(c). Anything > 1.5x baseline is a "lift" signal.
4. **Post → 30d**: check ASO ranking for the video's keywords. If the video drove repeated user search, the keyword should have climbed.
5. **Report**: one-line per video — "drove X installs / Y guide shares / lifted keyword Z by N positions". Average across 10 videos before drawing conclusions.

### Anti-recommendations (DO NOT build)

- ❌ Custom URL shortener with per-video tags — UTM-style tracking is noise on mobile-social and adds a privacy surface for no gain.
- ❌ Pixel / web SDK on the landing page — violates the no-PII commitment.
- ❌ A "scan to install" QR code on every video — TikTok / Reels viewers don't scan vertical-video QR codes.

---

## 7. v1.5.1 deliverables (this doc's scope, summary)

What v1.5.1 DOES deliver:
- ✅ This planning doc — link-layer prerequisites, landing-page checklist, share-card formats, social funnel measurement plan
- ✅ Analytics wiring complete on the existing share + Home discovery surfaces (so the v1.6 deep-link layer has signal to compare against)
- ✅ `home_search_pressed` + `home_quick_action_pressed` events landed in `EventMap` (closes the unfired-wrapper gap)

What v1.5.1 does NOT deliver:
- ❌ Domain registration / hosting
- ❌ AASA / asset-links files
- ❌ Deep-link routing code
- ❌ Landing page (static site)
- ❌ OG image generation
- ❌ Per-video TikTok funnel report
- ❌ Any code change to `shareGuide.ts` (the placeholder URL stays; replacing it requires §3 to be complete)

---

## 8. When to revisit this doc

Re-read this doc and tick checklist items off when ANY of the following is true:
- 2 weeks of v1.5.0 production data shows `guide_share { completed: true }` ≥ 10 per day sustained
- Apple App Review has signed off on v1.5.x with no follow-up requests for ≥ 2 weeks
- A specific organic-growth experiment is queued that REQUIRES deep linking (e.g., "TikTok video → tap link → app opens directly to the featured guide")

Until ALL three are true, the foundation is ahead of the demand. The placeholder URL is a feature, not a bug — it bounds blast radius.
