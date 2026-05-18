# Phase 2B — Manual smoke test

**Run before merging PR #58.** Takes ~5 min on a real device or simulator.

## Pre-flight

```bash
npx expo start --clear
```

Open the app on iOS or Android (real device preferred). In a second terminal, keep an eye on Metro logs — every analytics event prints as `[analytics] <event_name> { ...props }` in dev. That's how you verify `guide_open.source`.

## Test paths

Each row: tap path → what should render → expected `guide_open` event.

| # | Path | Pass criteria | Expected event |
|---|---|---|---|
| 1 | Home → scroll past "Cho người mới sang Nhật" | New "Hay được dùng" horizontal-scroll row renders with 6 cards | — |
| 2 | Tap any card in "Hay được dùng" | AdminDetail opens for that guide | `guide_open { source: 'featured' }` |
| 3 | Home → tap search bar (top) → type `visa` | Result list shows visa guides; top hit = `Visa du lịch / thăm thân ngắn hạn` | — |
| 4 | In #3, tap the top result | AdminDetail opens | `guide_open { source: 'search' }` |
| 5 | Search → clear input | Empty state renders: 6 chips + "Hay được tìm" list + "Cần hỗ trợ gấp?" card | — |
| 6 | Search → type gibberish like `xyz123nothere` | No-results state renders the same featured list + emergency CTA | — |
| 7 | In #5 or #6, tap "Cần hỗ trợ gấp?" | EmergencyHub screen opens | — |
| 8 | Open any guide → scroll to bottom | "Xem thêm liên quan" section renders 3–4 related guides | — |
| 9 | Tap a related guide | AdminDetail navigates to the new guide | `guide_open { source: 'related' }` |
| 10 | Open any guide from a non-discovery surface (e.g. bookmark, onboarding card, category grid) | AdminDetail opens | `guide_open { source: 'direct' }` |
| 11 | Back-navigation from each path above | Returns to the prior screen cleanly, no blank screens, no stuck loaders | — |

## Edge / regression checks

- Open SearchScreen with `initialQuery` (e.g. via a Home quick-action chip) — input pre-filled, results render immediately, no flash of empty state
- Open the same guide twice via different sources back-to-back — `guide_open` fires each time with the correct `source` (event is keyed by `guide.id` so navigating between two different guides triggers it; re-mounting the same guide also re-fires per current code)
- Horizontal-scroll "Hay được dùng" row on a small phone (≤ 360 px width) — cards still readable, no clipped text

## Pass / fail

- **Pass**: every row in the table behaves as described AND analytics events match the expected `source` in the Metro log
- **Fail**: any wrong `source`, broken nav, missing featured list, or unrendered emergency CTA → comment on PR #58 with the failing row number

## What I (Claude) cannot do

The harness can run `expo start` but can't tap a phone — this checklist is for a human on a device. The 3 CLI gates (`typecheck`, `verify:content`, `test:ci`) cover the static side; manual smoke covers the runtime side.
