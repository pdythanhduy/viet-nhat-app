# Reminder system — design

**Status**: design + foundation only (Phase R2). NO active scheduling in the current binary.
**Owner**: pdythanhduy.

This doc captures the philosophy, anti-spam rules, privacy posture, and timing strategy for the eventual reminder system. The data model + storage shape are committed in `src/utils/reminderHooks.ts`. The full scheduling/UI/permission layer is intentionally deferred until after v1.5.0 ships and we see retention signal.

---

## 1. Philosophy

Calm utility, never engagement bait.

A Vietnamese resident in Japan has real recurring deadlines — visa, tax, residence, insurance, MyNumber. Missing them costs money or legal standing. A reminder system that nails the timing is genuinely useful.

A reminder system that fires "Hey, miss us? Come back to the app!" is hostile and erodes the trust we spent 127 guides + 8 source verifications building.

Hard rule: **every reminder must point to a real legal/administrative event the user is responsible for.** No "did you know?" pushes. No "weekly digest". No "X people viewed this guide today."

---

## 2. Reminder kinds (in scope for Phase R2 data model)

| Kind | What it tracks | Trigger window | Why this kind |
| --- | --- | --- | --- |
| `visa-renewal` | 在留期間更新申請 deadline | 90 / 30 / 7 / 1 days before `triggerDate` | Highest stakes — late = overstay = ban risk |
| `tax-season` | 確定申告 filing window | Feb 5 (10 days before window opens) + Mar 1 (mid-window) | Annual, predictable. Many Vietnamese workers don't realize they need to file |
| `moving` | 転出/転入届 14-day legal deadline | User-set move date − 7 days, then +7 from move date if not marked done | Has a legal 14-day deadline; missing it disrupts MyNumber + insurance |
| `insurance-renewal` | 火災 / 自賠責 / 国保 anniversary | 30 / 7 days before `triggerDate` | Renewal is silent — lapse = no coverage |
| `mynumber` | Card pickup / 5-year renewal / 10-year card-replacement | 30 / 7 days before `triggerDate` | New for many users; pickup deadline is strict (~1 month after notice) |

Five kinds is a deliberate cap for v1. Adding `kind` is a schema migration with analytics implications — propose in writing, don't sneak.

---

## 3. Anti-spam rules

The defaults in `DEFAULT_PREFERENCES`:

- `globalEnabled: false` → user must explicitly opt in
- `perKindEnabled: all false` → user must opt in PER kind
- `monthlyCap: 4` → max 4 notifications per month across ALL kinds (the visa-renewal 90/30/7/1 cadence)

The cap is a hard ceiling enforced by the (future) scheduler. If 5+ notifications would fire in a month, the lowest-priority kind is silently dropped. Visa-renewal always wins ties — it's the legally riskiest.

Additional rules baked into the future scheduler:

- **Quiet hours**: no notifications 22:00 – 07:00 Asia/Tokyo
- **No retry**: if a notification fires and is dismissed, do NOT re-fire it the same day even if app reopens
- **Snooze cap**: 1 snooze per notification (extends by 24h, not "remind me next week")
- **No notification on the same day** if the user has already opened the matching guide in the app — they're aware
- **Tax-season exception**: fires for ALL users without per-kind opt-in for v1, because most Vietnamese workers don't know they need to file. ONE notification on Feb 5 each year. If user dismisses, never fired again for that user.

---

## 4. Privacy posture

- **Local-only**: reminder hooks live in `AsyncStorage`. No backend, no sync.
- **No PII in payload**: notification text references the kind ("Sắp đến hạn gia hạn visa") and a generic CTA. NEVER the user's name, address, or specific visa number.
- **No telemetry on reminder content**: analytics fires `notification_opened { slot: 'visa-renewal' | 'tax-season' | ... }` but NEVER the user's `triggerDate` or `label`.
- **No reading user's calendar**: we don't auto-detect deadlines. Every hook is user-created.
- **No third-party scheduling service**: uses `expo-notifications` only, which is local.

---

## 5. Local vs cloud — when (if ever) to move to cloud

**Stay local** as long as:
- DAU < 1000
- Single-device usage is the norm
- Notification timing only needs phone clock (not server time)

**Move to cloud only if** ALL of:
- Users sync across iOS + Android devices in the same household
- Server-time accuracy matters (e.g., Apple time-zone bug workaround)
- We have a backend already running for OTHER reasons (NOT to be built for reminders alone)
- A privacy review confirms the move doesn't expand the PII surface

For v1, local-only is correct. No backend will be built for reminders.

---

## 6. Suggested timing

```
visa-renewal:        90d / 30d / 7d / 1d before triggerDate
tax-season:          Feb 5 (1 fire/year, fires for all users)
moving:              -7d / +7d if not marked done
insurance-renewal:   30d / 7d before
mynumber:            30d / 7d before
```

All times anchored to **Asia/Tokyo** local time at the user's device. No DST handling needed (Japan doesn't observe DST).

Quiet hours: 22:00 – 07:00 Asia/Tokyo. Notifications that fall in quiet hours fire at 08:00 the next day.

---

## 7. UI surfaces (deferred)

When the scheduling layer ships:

1. **Settings → Nhắc tôi** — toggle list of the 5 kinds + master switch + monthly cap slider
2. **AdminDetailScreen header** — for guides matching a kind, a "Nhắc tôi" button next to the bookmark icon. Tapping opens a date-picker for `triggerDate` and turns on the matching kind in prefs
3. **ImportantDatesScreen** — already exists for visa-expiry. Extends to surface the 4 other kinds inline (already-set hooks render here, opt-in toggles inline)
4. **One-time onboarding bottom sheet** — "Bạn có muốn nhắc lịch visa / thuế không?" — appears ONCE per user, dismissable. Default-no.

Phase R2 (this PR) ships the data model + storage + tests. The above UI is Phase R3 work.

---

## 8. What this design explicitly REFUSES

- ❌ Streaks / gamification on opening reminders
- ❌ "Did you know?" content pushes
- ❌ Weekly digests
- ❌ Sponsored notifications (legal practice ads, etc.)
- ❌ Social hooks ("3 people in your area also have this deadline")
- ❌ Notification A/B testing on copy
- ❌ Reading the user's email or calendar to auto-create hooks
- ❌ Cross-device cloud sync without explicit user opt-in
- ❌ Notification text containing the user's name, address, or visa number

---

## 9. Open questions for the implementation phase

1. **Permission flow**: should we request notification permission on first opt-in, or on first app open? First opt-in is less intrusive but might catch permission denied at a worse moment.
2. **Tax-season exception**: is the "fire for all users without per-kind opt-in" rule defensible? Compliance team should check. Alternative: opt-in default but tax-season is the only kind toggle that's surfaced on the onboarding sheet.
3. **Visa-renewal source**: do we pull `triggerDate` from the existing `ImportantDate` infrastructure (where users already enter visa-expiry dates) or have a separate hook? Pulling from `ImportantDate` is less typing for the user but couples two data models.
4. **Snooze UX**: snooze button on the notification itself (iOS supports actions) vs in-app snooze list?
5. **Telemetry**: do we fire `reminder_set { kind }` and `reminder_dismissed { kind }`? Or stay silent until scheduling is live? Tracking now would give baseline data when scheduling lands.

None of these are blockers for R2. Decide when implementation starts.

---

## 10. Related files

- `src/utils/reminderHooks.ts` — types + storage (this phase)
- `src/utils/reminderHooks.test.ts` — 10 unit tests pinning the schema + opt-in defaults
- `src/utils/notifications.ts` — existing notification infrastructure (visa-date reminders, daily-ritual)
- `src/screens/ImportantDatesScreen.tsx` — existing surface; future extension point
- `docs/retention-phase-proposal.md` — wider retention plan (this is Surface 2 of 3)
- `docs/analytics-events.md` — when scheduling ships, `reminder_set` / `reminder_dismissed` events land here
