# Retention — Phase proposal (not yet implemented)

**Status**: design proposal only. NO implementation in v1.5.0.
**Trigger to implement**: after v1.5.0 ships AND we have 2 weeks of `guide_open` analytics confirming user re-visits (or lack thereof).

---

## Why now

Daily Ritual is the only recurring hook today. The retention scores in the 10/10 review came in at **6/10** — the gap is "after a user finds the guide they needed, what brings them back next week?"

Three lightweight retention surfaces would close most of that gap without bolting on heavy infrastructure. None requires backend, IAP, or AI.

---

## Surface 1 — Recently viewed guides

### What
A small "Bạn vừa xem" section on Home, showing the last 5 guides the user opened. Tap → AdminDetail.

### Why
A user often opens a guide, gets pulled away (a phone call, life), and needs to find it again the next day. Right now the only way back is search or browsing the full list. Recently-viewed is one tap.

### Data model
```ts
// src/utils/recentlyViewedGuides.ts (proposed)
interface RecentlyViewedEntry {
  guideId: string;
  openedAt: number;  // Date.now()
}
const KEY = '@vietNhat:recentlyViewedGuides:v1';
const MAX_SIZE = 5;
const EXPIRY_MS = 30 * 24 * 3600 * 1000;  // 30 days
```

### Behavior rules
- **Append on open**: every `AdminDetailScreen` mount adds an entry (existing `useEffect` already runs per `guide.id` change — hook the same place that fires `logGuideOpened`)
- **Dedupe**: if the same `guideId` already exists, move it to the front and update `openedAt`
- **Cap**: max 5 entries. Drop the oldest on overflow
- **Expire**: entries older than 30 days are dropped on next load (lazy cleanup, not via timer)
- **Hidden from UI** if zero entries

### UI surface
- New `HomeRecentlyViewed` component below `HomeOnboardingGuides` and `HomeFeaturedGuides`
- 5 small cards in a horizontal scroll (reuses `HomeFeaturedGuides` styling)
- Section title: "Bạn vừa xem"
- Section hidden when list is empty

### Effort
~1 day. Storage util (~80 LOC) + screen wiring (~30 LOC) + 1 test file.

### Risks
- Storage write on every guide open — fine at 5 entries, no perf issue
- The same guide appearing in Recently Viewed AND Featured: acceptable; user shouldn't be hidden information
- Privacy: stored locally only. No analytics event needed beyond existing `guide_open`

---

## Surface 2 — Reminder hooks

### What
The app already has `ImportantDates` for visa-expiry reminders. Extend the SAME notification infrastructure to cover 3 more recurring life events:
- Visa expiry (existing) — fires 90d / 30d / 7d / 1d before
- Tax season — fires Jan 5 (Cuối năm 確定申告 reminder)
- Moving procedures — fires when user marks themselves as "in transit" (manual flag, no inference)
- Insurance renewal — fires for car shaken / fire insurance if user adds the date

### Why
The visa-expiry use case is the strongest organic re-engagement we have. Tax season is annual but high-stakes (Vietnamese workers often miss kakutei-shinkoku). Moving procedures and insurance renewal are user-initiated.

### Data model
Reuse existing `ImportantDates` infrastructure. Add a `kind` discriminator:
```ts
type ReminderKind = 'visa' | 'tax-season' | 'moving' | 'insurance';
```

### Behavior rules
- All notifications are local (already supported)
- No new permissions
- Tax-season fires for ALL users on Jan 5 (no opt-in needed — 1 notification/year is not spam)
- Moving + insurance are user-initiated (only fires if user has added a relevant date)
- Visa-expiry stays as-is

### UI surface
- No new screen. Existing `ImportantDatesScreen` already handles the surface.
- The new reminders simply appear in the same list when triggered.

### Effort
~2-3 days. Reuses existing notification scheduling code. Bulk of effort is the tax-season annual scheduler.

### Risks
- Notification spam: explicit cap of 4 reminders/month total (visa-expiry usually 4 fires across 90 days)
- Tax-season fires for users who don't file kakutei-shinkoku (most Vietnamese workers don't owe). Mitigation: notification text says "có thể bạn cần làm 確定申告" not "you must file"
- Localization: notification copy needs to be in Vietnamese, short (< 60 chars)

---

## Surface 3 — "Guide quan trọng hôm nay"

### What
A single highlighted guide each day, surfaced on Home. Different from "Hay được dùng" because it's:
- ONE guide, not 6
- Rotates daily (date-deterministic seed, so same user sees same guide all day)
- Pulled from the `priority: 'high'` pool

### Why
Daily Ritual exists for vocabulary; this is the equivalent for admin/legal content. It's a deterministic recommendation without "smart" AI infrastructure.

### Data model
```ts
// Pseudo
function getDailyGuide(date: Date): AdminGuide {
  const priorityHigh = ADMIN_GUIDES.filter(g => g.priority === 'high');
  const idx = hashDate(date) % priorityHigh.length;
  return priorityHigh[idx];
}
```

### Behavior rules
- Same guide for the entire calendar day (24h Asia/Tokyo)
- Pool: only `priority: 'high'` guides (currently 42)
- Skip a guide if the user opened it today already (read from Recently Viewed)
- No analytics event needed beyond `guide_open { source: 'featured' }` (already wired)

### UI surface
- New "Guide hôm nay" card on Home, above "Hay được dùng"
- Single full-width card, not a row
- Tap → AdminDetail with `source: 'featured'`

### Effort
~0.5 day. Pure logic + 1 card UI.

### Risks
- "Spam" perception if the same user sees the same guide multiple days running. Mitigation: 42-guide pool → typical user sees a different guide every day for 6 weeks
- Time zone: anchor on Asia/Tokyo since users are in Japan

---

## Stack order (when implementation starts)

1. **Surface 1 (Recently viewed)** — fastest win, lowest risk. Ship first.
2. **Surface 3 (Daily guide)** — second smallest. Ships next week.
3. **Surface 2 (Reminders)** — biggest impact but biggest risk (notifications can annoy). Ship last, after Surface 1 confirms user engages with Home re-visits.

Each as its own PR, ~1 PR per week post-v1.5.0 launch.

---

## What this proposal does NOT include

- ❌ Streaks across guide opens (gamification — risks feeling forced)
- ❌ Push notifications from server (no backend)
- ❌ Personalized recommendations via ML (out of scope — see "deterministic > AI magic" rule)
- ❌ Bookmarks expansion (already exists; not in scope here)
- ❌ Social features (share, follow) — see growth doc

---

## Open questions for the user

1. Are local notifications already permitted by the user's iOS / Android settings? If not, Surface 2 needs a permission-request flow built or reused.
2. Should "Guide hôm nay" rotate from `priority: 'high'` only, or also include guides marked as seasonally relevant (e.g., tax guides in Jan-Feb, typhoon guide in Sep)?
3. Surface 1 uses local AsyncStorage. Is there appetite later for cloud-sync across devices, or is on-device sufficient forever?

None of these are blocking for the proposal — answer when implementation starts.
