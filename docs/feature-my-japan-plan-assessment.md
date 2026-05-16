# Feature Assessment — "My Japan Plan" / "Lộ trình cá nhân"

**Status:** Assessment + phased plan only. **No implementation, no backend, no AI API, no OCR, no Q&A community.**
**Date:** 2026-05-16
**Author:** Claude (autonomous /goal pass)
**Related:**
- [`docs/feature-rag-chatbot-assessment.md`](feature-rag-chatbot-assessment.md) — sibling Hỏi Cẩm Nang assessment + integration target for this feature
- [`docs/feature-ai-mail-translate-decision-log.md`](feature-ai-mail-translate-decision-log.md) — AI Mail exposure rule (parallel internal-only feature)
- [`docs/admin-guide-japanese-term-glossary.md`](admin-guide-japanese-term-glossary.md) — `keyTerms` + `counterPhrases` integration target
- [`docs/source-overview-current.md`](source-overview-current.md) — app architecture + module map

This doc gives product / engineering a base to decide *whether* to ship "My Japan Plan", *which flow first*, and *what to defer*. It is not a build spec.

---

## 1. Feature concept

**"Lộ trình cá nhân"** turns the app from a *reading reference* into an *interactive procedural assistant*. Given a situation a user is actually in (`Mất thẻ cư trú`, `Chuyển nhà`, `Gia hạn visa`, …), the app:

1. Asks 3–5 short questions to disambiguate the situation
2. Generates a **personalized, deadline-grouped task list** drawn from the existing 128 admin guides
3. Auto-schedules **local notification reminders** using the existing `ImportantDates` + `expo-notifications` plumbing
4. Embeds the matching **`keyTerms` glossary** + **`counterPhrases`** inline on each step where the user faces a Japanese form or staff counter
5. Lets the user **tick off steps as they go** with state persisted locally via the existing `guideChecklistProgress` / `guideStepProgress` pattern
6. Provides a **"Hỏi thêm về việc này"** footer that jumps into Hỏi Cẩm Nang pre-loaded with the situation context

Key shift vs the current app:

| Today | With "Lộ trình cá nhân" |
|---|---|
| User opens guide once, reads, leaves | User opens app **multiple times across the procedure** to tick off the next step |
| Guide is one-size-fits-all (every visa type, every situation) | Plan is **shaped by the user's answers** (e.g. "Mất thẻ ngoài đường + đã báo CS" vs "Mất ở nhà") |
| Deadlines are mentioned in prose | Deadlines drive **proactive reminders** (e.g. "Còn 7 ngày trong hạn 14 ngày ISA") |
| `keyTerms` and `counterPhrases` live inside guides | Surface **at the exact step** where the user faces that JP word |
| Search → guide → done | Plan → step → guide for detail → Hỏi Cẩm Nang for follow-up — closed loop |

**Critical positioning:** This is the **retention loop**. The current app's strongest growth signal is initial download (a Vietnamese person in Japan needs a procedure → finds app). The weakest signal is **return visits between procedures**. A live plan creates a real reason to re-open the app daily for 14–30 days per situation.

## 2. User pain points

Concrete pain moments observed from existing content + user research baked into the audit docs:

1. **"Tôi biết phải đến 入管 — nhưng còn gì làm trước?"** The current guide lists everything in one screen. A panicked user can't scan. They need *the next 1 action*, not a wall.
2. **"Tôi mất thẻ hôm thứ 6 chiều, hôm nay là thứ 2 — còn mấy ngày?"** Deadlines are written generically ("14 days from when you know"). The user has to do the arithmetic.
3. **"Tôi đã đi cảnh sát, đã có 受理番号, giờ làm gì?"** Mid-procedure progress is invisible — no checkbox state, no "you're at step 3 of 5".
4. **"Visa của tôi còn 2 tháng, vậy thủ tục cấp lại thẻ có gấp hơn không?"** The user's other context affects priority — current guides can't account for that.
5. **"Quên báo ngân hàng sau khi đổi thẻ → tài khoản bị khóa."** Post-procedure cleanup is in the guide but easy to miss because no reminder fires.
6. **"Bạn tôi vừa mất thẻ, vài tháng trước tôi cũng mất. Tôi đã quên hết quy trình."** Past procedures aren't archived for the user to refresh memory.

## 3. Existing content assets we already have

No new content production is required for Phase 0 / 1 / 2. All groundwork is in place:

| Asset | Where | Use in Plan |
|---|---|---|
| 128 admin guides with `steps[]`, `quickAction.{deadline,office,doNow,bring,ifLate}`, `documentsChecklist[]`, `commonMistakes[]`, `faq[]` | `src/constants/content/adminGuides/guides/*.ts` | **Source of truth for steps** in every plan |
| `keyTerms` glossary (Batch 1 + 2 = 10 guides × ~5 terms) | Inline on admin guides | **Inline glossary popups** on plan steps |
| `counterPhrases` (~90 guides have them) | Inline on admin guides | **Counter-phrase chips** on plan steps that need staff interaction |
| `ImportantDatesScreen` + `loadImportantDates` + `getDaysUntil` | `src/screens/ImportantDatesScreen.tsx`, `src/utils/notifications.ts` | **Auto-write plan deadlines** into existing important-dates store |
| `expo-notifications` (already in deps) | runtime | **Scheduled local reminders** per plan step |
| `guideChecklistProgress` + `guideStepProgress` utilities | `src/utils/guideChecklistProgress.ts`, `src/utils/guideStepProgress.ts` | **Pattern to reuse** for plan step state — AsyncStorage-backed, tested |
| User profile (visa, lifeStage, household, prefecture) | `src/utils/userProfile.ts` | **Default answers** to plan questions (skip what we already know) |
| Hỏi Cẩm Nang retrieval | `src/utils/chatRetrieval.ts` (shipped in v1.4.0) | **"Hỏi thêm về việc này"** footer — pre-load context from plan |
| `JourneyChecklistScreen` | `src/screens/JourneyChecklistScreen.tsx` | UX pattern reference (existing "milestones" UI we can echo) |
| `bookmarks` | `src/utils/bookmarks.ts` | Optional: bookmark the active plan for quick re-entry |

**Key implication:** Building Plan Phase 1 is **plumbing existing pieces together** under a question-driven wizard. No new schema, no new dependency, no new content authoring.

## 4. MVP flow: "Mất thẻ cư trú"

End-to-end concrete sketch of what Phase 1 ships.

### 4.1 Entry point

- Home Screen card "Lộ trình cá nhân" with BETA pill (same honest-signaling pattern as Hỏi Cẩm Nang).
- Tapping opens `MyJapanPlanScreen` showing:
  - A small list of **active plans** (empty initially)
  - "Tạo lộ trình mới" CTA → picker of situations
- Picker shows 3 situations in Phase 1+2 scope:
  - 🪪 Mất thẻ cư trú (Phase 1 — ship first)
  - 🏠 Chuyển nhà (Phase 2)
  - 📅 Gia hạn visa (Phase 2)

### 4.2 Question wizard (4 questions for Mất thẻ cư trú)

Each question is a single screen with 2–4 tappable options. No free-text input in MVP — keeps the question tree deterministic, testable, and translatable.

```
Q1. Bạn phát hiện mất thẻ khi nào?
    ○ Hôm nay
    ○ Hôm qua hoặc vài ngày trước (chưa quá 14 ngày)
    ○ Đã quá 14 ngày
    ○ Không nhớ chính xác

Q2. Bạn nghĩ thẻ mất ở đâu?
    ○ Mất ngoài đường / trên tàu / nơi công cộng
    ○ Mất ở nhà / công ty / trường (chắc chắn không ai nhặt)
    ○ Không chắc

Q3. Bạn còn hộ chiếu bản gốc không?
    ○ Có, còn hộ chiếu gốc
    ○ Cũng mất hộ chiếu

Q4. Visa của bạn còn hạn bao lâu nữa?
    ○ Còn trên 3 tháng
    ○ Còn dưới 3 tháng
    ○ Còn dưới 2 tuần (gấp!)
    ○ Tôi không chắc
```

### 4.3 Question tree (decision logic — pure TypeScript, no AI)

The tree is a small function that takes the 4 answers and returns:
- An ordered list of step IDs from the `lost-residence-card` guide
- Whether to inject extra steps from other guides (`embassy-consulate-vietnam-japan` if also mất hộ chiếu; `residence-card-validity` if visa gần hết hạn)
- A computed deadline in days from today
- A reminder schedule

```
buildLostCardPlan(answers) → Plan = {
  flowId: 'lost-residence-card',
  createdAt: ISO,
  deadlineAt: today + 14 days,    // ISA rule, regardless of Q1
  urgencyLabel: derive(Q1, Q4),    // "Hôm nay phải đi", "Bình thường", "Khẩn cấp — visa sắp hết"
  groups: [
    { label: 'Hôm nay', steps: [...stepIds] },
    { label: 'Trong 14 ngày tới', steps: [...] },
    { label: 'Sau khi nhận thẻ mới', steps: [...] },
  ],
  reminders: [
    { atOffsetMin: 0 + 8h,  message: 'Bạn đã báo cảnh sát chưa?' },
    { atOffsetMin: 3 * 24*60, message: 'Đã đến 入管 chưa? Còn N ngày trong hạn 14 ngày.' },
    { atOffsetMin: 7 * 24*60, message: 'Hạn cấp lại thẻ còn 7 ngày. Mang gì? → mở plan' },
    { atOffsetMin: 13 * 24*60, message: 'Ngày cuối hạn. Nếu chưa đi, hỏi 入管 ngay.' },
  ],
  extraGuides: derive(Q3, Q4)   // ['embassy-consulate-vietnam-japan'] if Q3='lost passport'
}
```

Branching examples:

| If | Then |
|---|---|
| Q1 = "Hôm nay" + Q2 = "ngoài đường" | First "Hôm nay" group has: "Đi 交番 ngay trong hôm nay" + counter phrase chip |
| Q1 = "Hôm nay" + Q2 = "ở nhà" | First "Hôm nay" group has: "Tìm kỹ 30 phút trước khi đi đâu", police step demoted to optional |
| Q1 = "Đã quá 14 ngày" | Top banner: "Bạn đã quá hạn ISA. Đi 入管 ngay và chuẩn bị giải trình. (Vẫn xử lý được — không bị phạt nhưng cần giải trình.)" |
| Q3 = "Cũng mất hộ chiếu" | Inject group "Trước khi đi 入管": "Liên hệ Đại sứ quán VN xin hộ chiếu tạm" (from `embassy-consulate-vietnam-japan` guide) — gates ISA step |
| Q4 = "Dưới 2 tuần" | Add red banner: "Visa sắp hết — gia hạn song song với cấp lại thẻ" + link to `residence-card-validity` |

### 4.4 Output checklist UI

```
┌─────────────────────────────────────────────┐
│ Mất thẻ cư trú                       BETA   │
│ Bắt đầu: 16/05/2026                         │
│ Hạn ISA: 30/05/2026 (còn 14 ngày)           │
│                                              │
│ [Khẩn cấp — visa của bạn còn 9 ngày]         │  ← computed banner if Q4
│                                              │
│ ━━━━━━━ HÔM NAY ━━━━━━━                      │
│ ☐ Đi 交番 báo mất, lấy 受理番号                │
│     💬 "在留カードを紛失しました"  [copy]      │
│     📖 Xem chi tiết → lost-residence-card    │
│                                              │
│ ━━━━━━━ TRONG 14 NGÀY TỚI ━━━━━━━             │
│ ☐ Chuẩn bị ảnh thẻ 4×3cm                     │
│ ☐ Đến 入国管理局 với hồ sơ:                    │
│     • Hộ chiếu gốc                           │
│     • Ảnh thẻ                                │
│     • 受理番号                                │
│     • 再交付申請書 (lấy tại quầy)             │
│     💬 "在留カードを紛失したので、              │
│         再交付をお願いします" [copy]           │
│     📖 Xem chi tiết →                        │
│                                              │
│ ━━━━━━━ SAU KHI NHẬN THẺ MỚI ━━━━━━━          │
│ ☐ Đến 市役所 đăng ký lại địa chỉ (14 ngày)    │
│ ☐ Báo ngân hàng / công ty / SIM              │
│                                              │
│ 🔔 Đã đặt 4 nhắc nhở                        │
│                                              │
│ ─────────────────────────                    │
│ ❓ Có câu hỏi khác? → Hỏi Cẩm Nang           │
│ 🗑️  Xoá lộ trình này                         │
└─────────────────────────────────────────────┘
```

### 4.5 Reminder integration

- On plan creation, the wizard calls existing `expo-notifications` API to schedule the reminders defined in §4.3
- Plan also writes to the existing `loadImportantDates` store with deadline date + label "Lộ trình: Mất thẻ cư trú — hạn 入管 (30/05/2026)" so it appears in `ImportantDatesScreen` automatically
- If notification permission was denied earlier, Plan shows a banner: "Bạn chưa cho phép thông báo — vào Cài đặt để bật, nếu không app không nhắc được"
- All reminders cancelable when user deletes plan or ticks off the underlying step

### 4.6 Hỏi Cẩm Nang integration

Footer of every plan: `"❓ Có câu hỏi khác? → Hỏi Cẩm Nang"`. Tapping navigates to `HoiCamNangScreen` with a pre-filled question seeded from the plan context:

```
"Tôi đang làm thủ tục cấp lại thẻ cư trú (mất ngày 16/05). Còn cần làm gì?"
```

The chat then runs the existing local retrieval over the corpus. No new code in `chatRetrieval.ts` — just the screen accepts an `initialQuestion` prop and auto-submits.

### 4.7 Glossary + counterPhrase integration

For every plan step that references a Japanese term, the renderer:
1. Looks up the term in the originating guide's `keyTerms` array
2. If hit → renders the term as a tappable chip → modal/popover with the existing `{ term, reading, meaningVi, noteVi }` content (reuse the existing glossary card style from `AdminDetailScreen`)
3. If the step is a "do X at counter" step → renders the matching `counterPhrases` entry inline as a chip with copy button (same component as in HoiCamNang)

No new schema needed. The plan builder picks the first relevant entry; if a future guide adds new keyTerms, the plan benefits automatically.

### 4.8 Local storage / progress rule

- All plan state lives in **AsyncStorage** keys under a `plan:<flowId>:<createdAt>` namespace
- Schema:
  ```ts
  type StoredPlan = {
    version: 1;                  // bump on schema change
    flowId: 'lost-residence-card';
    createdAt: string;           // ISO
    answers: Record<string, string>;  // raw wizard answers
    groups: Array<{ label, steps: Array<{ id, label, done: boolean, doneAt?: string }> }>;
    deadlineAt: string;
    reminderIds: string[];       // expo-notifications IDs for cancel
    archivedAt?: string;
  };
  ```
- One plan per flow at a time (creating new one prompts: "Bạn đã có lộ trình Mất thẻ cư trú đang mở — thay thế hay giữ?")
- Completed plans auto-archived after the deadline passes + all steps ticked
- User can manually delete → wipes AsyncStorage + cancels remaining notifications + removes ImportantDates entry

### 4.9 Privacy / safety rule

- **All local.** No upload, no API call, no PII to any external service.
- Plan answers ("Visa còn 9 ngày", "Mất ngoài đường") never leave the device.
- Reminders use **local notifications only** (`expo-notifications` schedule), not server push.
- Disclaimer on every plan: `"Lộ trình do app tạo từ bài hướng dẫn có sẵn — chỉ tham khảo, không thay tư vấn 入管 / luật sư."`
- User can delete entire plan history anytime (Settings → "Xoá tất cả lộ trình").

### 4.10 No backend / AI confirmation

| Component | How |
|---|---|
| Question tree | Hardcoded TypeScript (`src/utils/planFlows/lostResidenceCard.ts`) — pure logic, unit-testable |
| Step content | Pulled from existing guide `steps[]` + `quickAction` fields — no synthesis |
| Glossary popups | Existing `keyTerms` data |
| Counter phrases | Existing `counterPhrases` data |
| Reminders | Local `expo-notifications` API (already in deps) |
| Persistence | Existing `AsyncStorage` (already in use for bookmarks, profile, checklist progress) |
| Cross-link to chatbot | Hỏi Cẩm Nang screen accepts an `initialQuestion` prop — local retrieval only |

**Zero new external dependency. Zero new env var. Zero network call.**

## 5. Implementation phases

### Phase 0 — UI mock (1–2 days)

- New `MyJapanPlanScreen` (entry point, BETA pill, empty state + Tạo lộ trình mới CTA)
- `PlanWizardScreen` (4 hardcoded questions for Mất thẻ flow)
- `PlanDetailScreen` (renders a hardcoded sample plan output — no state, no AsyncStorage, no reminders)
- Hardcoded entry card on Home with BETA pill
- 1 navigation route
- Goal: validate the wizard + output card UX before adding state

### Phase 1 — Functional MVP for "Mất thẻ cư trú" (3–5 days)

- AsyncStorage CRUD for plans (`utils/planStorage.ts` — same pattern as `guideStepProgress`)
- Real plan builder `buildLostCardPlan(answers): StoredPlan`
- Real local-notification scheduling on plan create
- Step checkbox state persisted; reminder cancel on step tick
- Glossary popup + counter-phrase chip integration on steps that need them
- "Hỏi Cẩm Nang" footer with `initialQuestion` prop wired into existing `HoiCamNangScreen`
- Writes plan deadline into `ImportantDates` store automatically
- Plan delete + plan archive logic
- Unit tests for `buildLostCardPlan` (8–10 input combinations covering Q1-Q4 branches)

### Phase 2 — Add "Chuyển nhà" + "Gia hạn visa" flows (3–5 days)

- New plan builders `buildMovingPlan(answers)`, `buildVisaRenewalPlan(answers)`
- Each: 3–5 questions, branch logic, step pulls from existing guides
- Source guides:
  - Chuyển nhà → `moving-in-notification`, `address-change`, `health-insurance` (re-enrollment), `sim-card` (update), `bank-account` (address update)
  - Gia hạn visa → `residence-card-validity` (if user means thẻ vật lý) OR a new `visa-period-renewal` guide if needed (route via Q&A)
- Reuse the `MyJapanPlanScreen` shell + wizard from Phase 1

### Phase 3 — Plan management + polish (2–3 days)

- List view of active + archived plans on `MyJapanPlanScreen`
- Edit answers → rebuild plan (handle reminder rescheduling)
- Mark plan complete manually
- "Trùng plan" detection: if user creates Mất thẻ while one is active → ask replace vs keep
- Export plan as text (clipboard) for sharing with friends/family
- Small analytics (private, on-device only): which plans get created, which steps get ticked. **Not** sent anywhere unless future product decision.

### Optional Phase 4+ — community / collab (NOT in this assessment)

Out of scope of this doc per `/goal`. Would be a separate decision.

## 6. Acceptance criteria (Phase 1 ship gate)

User-level (test on device):

- [ ] User taps "Lộ trình cá nhân" on Home → opens `MyJapanPlanScreen`
- [ ] Picks "Mất thẻ cư trú" → 4-question wizard
- [ ] After answering, sees personalized plan with:
  - [ ] Deadline countdown (e.g. "còn 14 ngày")
  - [ ] Steps grouped by "Hôm nay / Trong 14 ngày / Sau khi nhận thẻ"
  - [ ] At least 1 step shows a counter-phrase chip with copy
  - [ ] At least 1 step shows a glossary chip with popup
  - [ ] "Xem chi tiết" links to the right `AdminDetail`
- [ ] Tapping step checkbox saves immediately; survives app restart
- [ ] At least 1 notification fires (after some test offset, e.g. 30 seconds) if permission granted
- [ ] If permission denied, plan still works; banner says reminders disabled
- [ ] Plan deadline appears in `ImportantDatesScreen`
- [ ] "❓ Hỏi Cẩm Nang" footer → opens chat pre-filled with situation question; auto-runs retrieval
- [ ] "🗑️ Xoá lộ trình" → confirm dialog → wipes storage + cancels notifications
- [ ] No `MailTranslate*` references anywhere
- [ ] No network call (verify via packet inspection or absence of fetch in code)

Code-level:

- [ ] `buildLostCardPlan(answers)` has ≥8 unit tests covering Q1×Q4 + Q3 branches
- [ ] `planStorage.ts` follows existing `guideStepProgress.ts` pattern
- [ ] No new dependency in `package.json`
- [ ] No new env var, no Constants.extra change
- [ ] Typecheck + tests + content QA all PASS
- [ ] CI Verify workflow green

## 7. Risk / blockers

| Risk | Mitigation |
|---|---|
| **Notification permission denied** — plan loses its retention value | Show clear banner; allow plan to work without reminders; offer deeplink to Settings |
| **iOS background notification reliability** — Apple silences notifications for certain backgrounded apps | Accept Phase 1 limitation; document in known-issues; revisit in Phase 3 polish |
| **Question tree maintenance** — each new flow needs a new tree + test suite | Confine to a `planFlows/` directory with one file per flow; unit-tested; reviewable per-flow PR |
| **Plan schema migration** when we change `StoredPlan` shape | `version: 1` field + lazy migration on load; if version mismatch and we don't know how to migrate, archive the plan and ask user to recreate |
| **AsyncStorage size growth** if user creates many plans | Cap at 20 active + 20 archived; oldest archived auto-deleted; can also wipe via Settings |
| **Stepping on AI Mail decision** — Plan navigates to existing screens, must NOT navigate to `MailTranslate*` | Hardcoded route allowlist in plan step definitions; lint rule possible later |
| **Reminder spam** when user creates many plans | Quiet hours respected (`expo-notifications` allows scheduled time); cap at 5 reminders per plan; combine same-day reminders |
| **Plan "Gia hạn visa" ambiguity** — user can mean gia hạn thẻ vật lý vs gia hạn 在留期間 | Phase 2 wizard Q1 disambiguates this explicitly; if needed, suggest using Hỏi Cẩm Nang for ambiguous cases |
| **Localization drift** — Vietnamese in plan must match the in-app voice (warm, direct, not legalistic) | Reuse phrasings from the source guides verbatim where possible; one editorial pass per flow before ship |

## 8. Effort estimate (single developer)

| Phase | Estimate | Output |
|---|---|---|
| Phase 0 — UI mock | 1–2 days | New screen, hardcoded sample, Home entry card. Mergeable, behind BETA, no state. |
| Phase 1 — Mất thẻ functional MVP | 3–5 days | AsyncStorage, real reminders, glossary, counter phrases, chatbot link. Acceptance criteria above. |
| Phase 2 — +2 flows (Chuyển nhà, Gia hạn visa) | 3–5 days | Reuse Phase 1 shell, 2 new flow modules + tests |
| Phase 3 — Plan management polish | 2–3 days | List, archive, edit, dup detection |
| **Total to ship 3 flows + polish** | **~10–15 working days** | One major release (e.g. `v1.5.0`) |

Risk-adjusted (add 25% for QA + content review): **~14–20 working days** for the full 3-flow + polish package.

## 9. What this assessment does NOT decide

- Whether the feature ships at all (product decision)
- Tab vs Home entry point (UX decision, easy to flip)
- Final name (`Lộ trình cá nhân` vs `My Japan Plan` vs `Sổ tay thủ tục` — user testing call)
- Which 4th flow comes after the 3 in this doc (e.g. `Sinh con tại Nhật` is a likely high-value next; `Mất hộ chiếu` is short and similar to Mất thẻ)
- Whether to add iCloud / cross-device sync (deferred to a future "Supabase Backend Phase" decision tree)

## 10. Out of scope (explicitly NOT in any phase of this assessment)

- ❌ AI Mail / Dịch Thư Nhật user-facing entry — remains internal-only per its decision log
- ❌ Phase 2 RAG with backend LLM
- ❌ OCR / vision LLM
- ❌ Community / Q&A forum
- ❌ User login / auth
- ❌ Push notifications from a server
- ❌ Cross-device sync
- ❌ Any new external dependency, API key, or env var
- ❌ IAP / monetization
- ❌ Privacy Policy change (because all data is local — no change to data flow)
- ❌ Re-authoring content (all content reused from existing guides)

## 11. Recommendation

**Start with Phase 0 (UI mock for Mất thẻ cư trú only)** — small, no state, validates the wizard-to-checklist pattern before investing in the storage / notification plumbing.

If Phase 0 user test on device feels right:
- Go to **Phase 1** (functional MVP for Mất thẻ) immediately.
- Hold Phase 2 until Phase 1 has 1 week of real usage and at least 5–10 user-reported issues so we tune the wizard / step extraction patterns before duplicating them across 2 more flows.

If Phase 0 reveals UX gaps (e.g. users want free-text, not options; or they want to skip the wizard entirely):
- Stop. Revise the wizard model before adding any plumbing.
- The cost of rebuilding 1 mock screen is small; the cost of rebuilding wizard + storage + reminders is large.

**Do NOT skip Phase 0 in this case.** Unlike Hỏi Cẩm Nang (whose Phase 0 mock we skipped because the answer-card pattern was already validated by AI Mail), the wizard-driven plan output is a new UX pattern in this app.

## 12. Next command to implement MVP

After product approval on this assessment, the maintainer (Session A or any contributor) should:

```bash
# 1. Open a focused issue scoping Phase 0
gh issue create -R pdythanhduy/viet-nhat-app \
  --title 'Phase 0: My Japan Plan UI mock for Mất thẻ cư trú' \
  --body 'Per docs/feature-my-japan-plan-assessment.md §5 Phase 0. Scope: new MyJapanPlanScreen + PlanWizardScreen + PlanDetailScreen, hardcoded sample for Mất thẻ cư trú, BETA Home entry card, navigation routes. No AsyncStorage, no reminders, no chatbot link, no glossary integration. Single PR ~1-2 dev days.'

# 2. Create branch + scaffold
git checkout main && git pull
git checkout -b feat/my-japan-plan-phase-0-ui-mock
# ... implement ...
# ... typecheck + test ...
# ... commit + push + PR ...
```

The Phase 1 functional MVP should be a **separate PR after Phase 0 merges + on-device review**.

---

## References

- [`docs/feature-rag-chatbot-assessment.md`](feature-rag-chatbot-assessment.md) — same assessment pattern; reused structure
- [`docs/feature-ai-mail-translate-decision-log.md`](feature-ai-mail-translate-decision-log.md) — discipline pattern for "internal-only until 9 blockers ✅"
- [`docs/admin-guide-japanese-term-glossary.md`](admin-guide-japanese-term-glossary.md) — glossary + counterPhrase rules used as integration target
- [`docs/source-overview-current.md`](source-overview-current.md) — app architecture, module map, content inventory
- [`docs/feature-mail-translate-cost-estimate.md`](feature-mail-translate-cost-estimate.md) — cost-model pattern (not used here because Plan is $0 ongoing cost — fully local)
