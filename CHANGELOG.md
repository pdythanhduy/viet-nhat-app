# Changelog

All notable changes to **Viet Nhat / Cẩm Nang Việt Nhật** are recorded here.
The latest entry is at the top.

## v1.5.0 - 2026-05-09

### Added
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

## v1.4.0 - 2026-05-07

Lazy-load infrastructure + Supabase live. See commit `6ec4167` "release: v1.4.0".

### Added
- Phase 1A: direct content imports + FlatList virtualization.
- Phase 1B: contentLoader + per-category Japanese split + hooks.
- Phase 2: dark scaffold + live Supabase fetch behind feature flag.

## v1.3.0 and earlier

Pre-CHANGELOG history. See `git log` for details.
