# Changelog

All notable changes to **Viet Nhat / Cẩm Nang Việt Nhật** are recorded here.
The latest entry is at the top.

> Note on version history: app.json reached `1.4.0` internally during dev
> but no `1.4.0` build was ever shipped to the App Store / Play Store
> (current live store version is `1.2.0`). To keep store release history
> clean, everything cut between `1.2.0` and now is consolidated under the
> single `1.3.0` entry below. The internal `1.4.0` label has been
> reverted in `app.json`.

## v1.3.1 - 2026-05-09

Patch release on top of v1.3.0 covering content / link / typo audit
fixes plus the action-first content rewrite pilot. No new features,
no schema changes for AdminGuide, no UI rework.

### Changed
- Standardized real-estate terminology: replaced stiff "lễ kim" calque
  with "tiền lễ (礼金 / reikin)" across daily-life apartment topic.
- Sharpened the workplace heatstroke alert wording: title now reads
  "Phòng tránh sốc nhiệt (熱中症) tại nơi làm việc" (was "Nghĩa vụ
  chống say nắng tại nơi làm việc bị siết chặt"); summary updated to
  match.
- Action-first content rewrite pilot for 5 high-frequency admin
  guides: moving-in-notification, address-change,
  residence-card-validity, my-number-card, juminzei-local-tax.
  Description, whoIsThisFor, whenToDo, whereToDo, quickAction, steps,
  commonMistakes and faq fields rewritten for clarity. Schema, ids,
  officialLinks, images, counterPhrases unchanged.

### Fixed
- Removed broken MHLW URL `mhlw.go.jp/stf/newpage_47683.html` from
  the heatstroke labor update — user-verified the page no longer
  matches the workplace 熱中症 content. Item still ships with title /
  date / summary / impact; it just isn't tappable until a verified
  replacement URL is found. `LaborUpdate.url` is now optional in the
  type and the JobsScreen card render guards against missing URLs.

### Docs added
- `docs/content-rewrite-pilot-v1.md` — engineering report on the
  5-guide rewrite pilot.
- `docs/content-rewrite-pilot-readable-review.md` — non-coder-friendly
  review artifact pulling user-visible text from the same 5 guides
  with a 10-item reviewer checklist per guide.
- `docs/content-link-typo-audit.md` — search results, before/after
  diffs, and the URL_REMOVED_TEMPORARILY status for the heatstroke
  URL.

### Known limitations carried over from v1.3.0
- 12/79 admin guides have counterPhrases; the remaining 67 do not.
- 13 admin guides still flagged for official-source re-check.
- The heatstroke alert needs a verified MHLW URL added back; tracked
  in `docs/content-link-typo-audit.md`.

## v1.3.0 - 2026-05-09

First store release after `1.2.0`. Bundles all dev work since `1.2.0`,
including the lazy-load / Supabase rollout that was internally tagged
`1.4.0` and never shipped, plus the new Home / Admin / Search UX,
`counterPhrases`, and the regression fix.

### Added
- Phase 1A: direct content imports + FlatList virtualization for faster cold start.
- Phase 1B: `contentLoader` + per-category Japanese split + content hooks.
- Phase 2: dark scaffold + live Supabase remote-content fetch behind feature flag.
- Added Home search CTA for faster procedure lookup.
- Added Home quick actions by real-life situations.
- Added Search `initialQuery` support so quick actions open relevant results directly.
- Added Admin situation chips.
- Added AdminDetail "Tóm tắt nhanh" quick summary.
- Added `counterPhrases` schema and AdminDetail section "Câu tiếng Nhật có thể nói".
- Added Japanese counter phrases for 12 high-frequency admin guides.
- Added admin guide content audit report for 79 guides.
- Added counter phrases QA report.

### Changed
- Reworked Home copy to focus on procedures in Japan.
- Moved Saved to bottom tab, Settings to Home header.
- Demoted Admin export panel so it no longer dominates the top of the screen.
- Improved Admin search placeholder.

### Fixed
- Fixed Home/Admin quick-action queries that previously returned empty search results.

### Known limitations
- Only 12/79 admin guides currently have counterPhrases.
- 13 admin guides still need official source re-check.
- Native speaker review is still recommended for Japanese phrase naturalness.
- Store metadata / screenshots / data disclosure still need completion before production release.

## v1.2.0 and earlier

Pre-CHANGELOG history. See `git log` for details.
