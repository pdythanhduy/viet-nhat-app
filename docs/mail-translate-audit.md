# Mail Translate — Current State Audit

**Date:** 2026-05-16
**Scope:** Audit của UI mock đang live (Phase 1). KHÔNG đề xuất build backend.
**Related docs (đọc trước nếu cần background):**
- [feature-translate-japanese-mail-audit.md](feature-translate-japanese-mail-audit.md) — design audit gốc
- [feature-mail-translate-cost-estimate.md](feature-mail-translate-cost-estimate.md) — chi phí Phase 2 backend
- [feature-ai-mail-translate-decision-log.md](feature-ai-mail-translate-decision-log.md) — quyết định kiến trúc

---

## 1. Current flow (what's live)

```
[Home / Saved / Admin]
        │
        ▼
MailTranslateIntro    ← landing, "Bắt đầu" button
        │
        ▼
MailCapture           ← 2 disabled buttons (Chụp ảnh / Thư viện) + 3 sample cards
        │             (no real camera, just MAIL_SAMPLES from constants)
        ▼
MailProcessing        ← setTimeout 800ms × 3 steps = 2.4s fake AI animation
        │             (navigation.replace → MailResult)
        ▼
MailResult            ← static render of MAIL_SAMPLES[id]
        │
        └─► AdminDetail (related guide) | Back to MailCapture (try another)
```

### What works

- Visual polish is **strong** — typography, spacing, color hierarchy all on brand
- Result screen has the right info architecture: priority badge, summary, required action,
  deadline, amount, warnings, key vocabulary, related guide, AI confidence, disclaimer
- Disclaimer wording is responsible (non-replacement-for-legal-advice)
- 3 sample mails cover the most common scary mails: 住民税, NHK contract, and one more
  (need to verify third — file truncated in my read)
- Navigation flow is linear and discoverable

### What doesn't work / is missing

See section 3.

---

## 2. Code structure

| File | Purpose | LoC | Status |
|---|---|---|---|
| `src/screens/MailTranslateIntroScreen.tsx` | Landing | 210 | Phase 1 mock, polished |
| `src/screens/MailCaptureScreen.tsx` | Sample picker (no real camera) | 200 | Phase 1 mock |
| `src/screens/MailProcessingScreen.tsx` | Fake AI animation | 173 | Phase 1 mock |
| `src/screens/MailResultScreen.tsx` | Result display | 555 | Phase 1 mock, fully functional |
| `src/constants/aiMailSamples.ts` | Sample data + types | ~? | Schema mirrors planned API |

Schema for `MailSample` is well-designed — when Phase 2 backend lands, the API can return
the exact same shape and the UI works as-is. Good forward-compat.

### Discovery / entry points

**🚨 CONFIRMED: NO entry point exists.** Grep across `src/` shows `MailTranslateIntro` /
`MailCapture` are only referenced by the 3 Mail screens themselves and `AppNavigator.tsx`
(route registration). Not from Home, not from Admin, not from Settings, not from anywhere.

**The feature is built but completely invisible to users.** The only way to reach it is
deep-linking directly, which no user does.

This is the **single biggest issue** in the audit. Without fixing it, every other
Mail-related metric (`mail_translate_open`, `mail_image_uploaded`, etc.) will read zero
forever.

---

## 3. UX pain points (current, before Phase 2)

### 🔴 P0 — critical UX dead ends

**3.1 No entry point from Home (assumed)**

If `MailTranslateIntro` is only reachable via deep link or an obscure menu, the feature is
invisible. User wrote elsewhere "ít nhưng đâm sâu" — discovery > everything.

**Recommendation:** Add a single quick-action card on Home: `📨 Đọc thư Nhật khó hiểu →`.
Clicking → `MailTranslateIntro`. ~30 phút work.

**3.2 Disabled "Chụp ảnh" / "Chọn từ thư viện" buttons look broken**

User in Phase 1 sees two grey buttons that don't react. They will tap, nothing happens,
they think the app is broken. Even with the divider "HOẶC THỬ VỚI ẢNH MẪU", the disabled
buttons feel like bugs, not "coming soon."

**Recommendation (one of):**
- (a) Remove the disabled buttons entirely until Phase 2. Replace with a small "🚧 Camera
  sắp ra mắt" pill. Less broken-looking.
- (b) Make them tappable but show an alert: "Camera sẽ ra mắt ở phiên bản tới — hiện tại
  bạn có thể thử với 3 mẫu thư phổ biến bên dưới."

Option (a) is cleaner. ~15 phút.

### 🟠 P1 — moderate

**3.3 No "back to home" from MailResult**

User finishes reading a result. The only buttons are "Hướng dẫn liên quan" (deep into
admin guide) and "Thử thư khác" (back to MailCapture). No path back to where they came
from. They have to tap the back arrow header — which on iOS is visible but on Android may
be hidden depending on config.

**Recommendation:** Add a tertiary "Xong" button that navigates back to the previous
non-Mail screen (or just `navigation.popToTop()`). ~10 phút.

**3.4 MailProcessing hard-coded 2.4s**

User can't cancel. Press back → broken animation continues then auto-navigates to Result
anyway because of `setTimeout`. Worst case: user backs out, lands on MailCapture, then
suddenly app jumps to MailResult.

**Recommendation:** Clear the `finishTimer` in cleanup if user navigates away. The
existing `return () => clearTimeout(finishTimer)` already does this — but `navigation.replace`
won't fire after unmount. Verify by testing: open MailProcessing, hit back fast. Bug
likely fixed. If not: track `cancelled` ref. ~20 phút verify + fix if needed.

**3.5 Result screen disclaimer is buried at the bottom**

By the time user scrolls to "⚠️ Đây là kết quả AI tham khảo", they may have already
acted on the info. For high-stakes mails (入管, thuế, ngân hàng), the disclaimer should be
near the top OR right below the priority badge.

**Recommendation:** When `priority === 'urgent' || priority === 'important'`, show a
condensed version of the disclaimer near the top: "⚠️ Đây là tham khảo AI — với thư quan
trọng hãy verify với cơ quan phát hành." ~30 phút.

### 🟡 P2 — nice-to-have

**3.6 No "save this result" / "share to family" affordance**

User reads the result, wants to send the Vietnamese summary to spouse on Zalo. No
mechanism. They screenshot the screen instead.

**Recommendation:** Add a "Chia sẻ tóm tắt" button using `expo-clipboard` or React Native's
native `Share` API. Copies/shares: doc type + summary + required action + deadline. ~30 phút.

**3.7 No "I'm not sure if this is real" path for suspected scams**

Mail samples flag scam warnings, but if user has a mail they suspect is a scam, there's
nowhere to escalate. Could link to the existing `special-fraud-tokushu-sagi.ts` admin guide.

**Recommendation:** Add a static link at the bottom of MailResult: "Nghi ngờ thư lừa đảo?
Xem cách nhận biết →" → AdminDetail with that guide. ~15 phút.

**3.8 Sample cards tappable area too small on iPhone SE**

Need to verify in QA pass — likely fine since cards have `padding: 14` but worth checking.

---

## 4. Missing states

| State | Current behavior | Recommended |
|---|---|---|
| Network offline (Phase 2) | N/A — no network calls yet | Plan: cache samples, show "Cần mạng" toast for real translate |
| Sample lookup fails | "Không tìm thấy mẫu thư" + "Thử lại" button — works | ✅ OK |
| User backs out mid-processing | Likely works due to cleanup | Verify in QA |
| First-time user on intro | Just shows intro | Consider: small "Lần đầu? Đây là 3 ví dụ" hint |
| Empty MAIL_SAMPLES (impossible now) | Crash | Defensive code, add `if (MAIL_SAMPLES.length === 0)` empty state |

---

## 5. Dead-end UX

- `MailResult` → only way forward is `MailCapture` (backwards) or admin guide deep dive.
  No "I'm done" path.
- No "history" of previously translated mails. If user wants to recheck a mail from last
  week, they have to translate it again. Phase 2 with real AI would benefit from local
  history (AsyncStorage, no PII since it's their own device).

---

## 6. High-impact / low-complexity recommendations (ranked)

These are all **doable WITHOUT backend** in 1-2 hours each:

| # | Fix | Impact | Effort | File |
|---|---|---|---|---|
| 1 | Discovery card on Home → `MailTranslateIntro` | 🔴 Critical | 30m | HomeScreen.tsx |
| 2 | Remove or relabel disabled "Chụp ảnh" buttons | 🟠 High | 15m | MailCaptureScreen.tsx |
| 3 | Top-of-page condensed disclaimer for urgent mails | 🟠 High | 30m | MailResultScreen.tsx |
| 4 | "Chia sẻ tóm tắt" button using native Share | 🟡 Medium | 30m | MailResultScreen.tsx |
| 5 | Link to scam guide at bottom of result | 🟡 Medium | 15m | MailResultScreen.tsx |
| 6 | "Xong / Về trang chủ" button on result | 🟡 Medium | 10m | MailResultScreen.tsx |
| 7 | Verify mid-processing-back navigation bug | 🟢 Low | 20m | MailProcessingScreen.tsx |

**Total: ~2.5 hours** for #1-#7. All shippable in v1.6.0 as polish, no backend needed.

---

## 7. Phase 2 readiness (informational, no action required)

Per existing audit docs, Phase 2 needs:
- expo-camera + expo-image-picker → image capture (~1 day)
- Backend: OCR (Google Vision API or Tesseract) + LLM (Claude/GPT-4o-mini) → translation (~2 weeks)
- Consent screen before sending image to backend (privacy)
- Cost estimate: see `feature-mail-translate-cost-estimate.md`

The current Phase 1 mock is **production-ready for testing user appetite**. Recommendation:
ship the discovery card (#1 above), measure `mail_translate_open` and `mail_summary_viewed`
events for 2 weeks. If conversion is high, justify Phase 2 spend.

---

## 8. Analytics now wired

As of 2026-05-16, the following events fire on Mail Translate flow:

- `mail_translate_open` — intro screen view
- `mail_image_uploaded` — sample picked (counts as "upload" in Phase 1)
- `mail_translated` — fake AI delay completes
- `mail_summary_viewed` — result rendered

See [analytics-events.md](analytics-events.md) for full catalog.

---

## TL;DR

- **Code is good.** Architecture is sound, schema is forward-compatible.
- **Biggest gap is discovery** — feature is invisible from Home (assumed). Fix #1 first.
- **Disabled buttons in Phase 1 mock look broken.** Fix #2 second.
- Everything else is polish that can wait for v1.6.0.
- **Don't start Phase 2 backend** until analytics show users actually engaging with the
  mock for 2+ weeks.
