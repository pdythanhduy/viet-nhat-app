# AI Dịch Thư Nhật — Exposure Decision Log

Single source of truth for the product decision around when (and whether) to surface the "AI Dịch Thư Nhật" feature to end users. Read this before adding any Home / Settings / deep-link entry point to the `MailTranslate*` screens shipped in #6.

---

## Decisions

### 2026-05-15 — Do NOT expose Phase 1 mock to users

- **Decision:** Keep "AI Dịch Thư Nhật" Phase 1 as **internal prototype only**.
- **Specifically:** No Home card. No Settings entry point. No deep link. The 4 screens (`MailTranslateIntro` / `MailCapture` / `MailProcessing` / `MailResult`) remain registered in the navigator (PR [#6](https://github.com/pdythanhduy/viet-nhat-app/pull/6)) but are unreachable from production UI.
- **Reason:** Phase 1 is **UI mock with sample data only** — no real AI, no real camera, no backend. Exposing this without honest framing risks:
  - users uploading sensitive letters and expecting an actual analysis;
  - confusion when only 3 hard-coded results appear instead of the user's letter;
  - misplaced trust in the "AI confidence" / disclaimer text if users interpret it as a real-AI assertion;
  - App Store reviewer flagging "deceptive functionality" if a Beta surfaces as a real feature without the consent / Privacy Manifest plumbing.
- **Action taken:**
  - PR [#7](https://github.com/pdythanhduy/viet-nhat-app/pull/7) (Home entry-point card) — **closed, not merged**.
  - Local branch `feature/ai-mail-translate-entry-point` — **deleted locally**. Remote branch retained (closed-PR archive) until explicitly cleaned up.
  - Worktree `C:\viet-nhat-app\viet-nhat-app-ai-entry` — **removed**.

---

## Conditions required BEFORE re-considering public exposure

All of the items below must be ✅ before any Home / Settings entry point is added. This list is the gate, not a roadmap — additional Phase 2 audit items in [`feature-translate-japanese-mail-audit.md`](./feature-translate-japanese-mail-audit.md) §9.4 may apply.

1. **Real AI / backend ready** — `POST /api/mail/analyze` returning structured JSON from a Vision LLM (Anthropic Claude or equivalent), not local sample data.
2. **Consent screen ready** — `MailTranslateConsentScreen` chèn trước `MailCapture`, text per audit §7.1, with explicit opt-in storage and `user_consented_at` persistence.
3. **Privacy Policy reviewed** — v2 draft (audit §7.3) reviewed by a Japanese consumer lawyer; live on the app's privacy URL; App Store Privacy Nutrition Label updated.
4. **Cost / rate limit decided** — per-request cost verified against current vendor pricing; per-user / per-day rate limit set; abuse signals defined; monetization model (free / freemium / credit pack) chosen.
5. **Tested with anonymized real letters** — ≥20 real, anonymized letter samples processed end-to-end; accuracy & failure modes documented; prompt-injection mitigations verified.
6. **App Store privacy/review risk checked** — `PrivacyInfo.xcprivacy` configured via EAS; third-party AI processor disclosed; "MEDIUM-HIGH" Apple Review risk (audit §2) mitigations confirmed (disclaimer placement, consent flow, deletion endpoints).

---

## What stays in the repo despite this decision

- The 4 `MailTranslate*` screens and `src/constants/aiMailSamples.ts` from PR #6 — **kept**. They are the scaffolding for Phase 2 and serve as design reference. They are not removable without losing the integration shape.
- The 4 routes registered in `RootStackParamList` — **kept**. Removing them now would create churn when Phase 2 unlocks; they don't appear in any user-reachable navigation.
- The audit doc (`feature-translate-japanese-mail-audit.md`) and cost estimate (`feature-mail-translate-cost-estimate.md`) — **kept** as the design + cost source of truth.

If a future contributor proposes "let's just add a small Home button to try it" — point them at this file first. The answer is no until the 6 conditions above are met.

---

## How to flip the switch later

When all 6 conditions are ✅:

1. Append a new dated entry below this section explaining what changed.
2. Open a new PR adding the Home (or Settings) entry point — explicitly reference the resolved gate items.
3. Re-run the original Phase 1 manual test plan plus the Phase 2 end-to-end test plan.

Do not silently un-revert PR #7 or restore the deleted local branch — Phase 2 will need a fresh consent flow and consent-aware navigation, not the bare card from #7.
