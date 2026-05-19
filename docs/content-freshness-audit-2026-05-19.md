# Content freshness audit — 2026-05-19

**Status**: informational. No content edits in this PR.
**Scope**: 127 admin guides under `src/constants/content/adminGuides/guides/`.
**Trigger**: routine 2-week-pre-release audit. v1.5.0 is live; v1.5.1 lands ~2 weeks out.

---

## Summary

| Bucket | Count | % of total |
|---|---|---|
| **> 30 days stale** | **0** | 0% |
| 21–30 days | 1 | 0.8% |
| 14–21 days | 16 | 12.6% |
| 7–14 days | 54 | 42.5% |
| ≤ 7 days | 56 | 44.1% |

**Net assessment**: content moat is fresh. Governance threshold (30 days) is not breached. No emergency re-verification needed before v1.5.1.

---

## 21–30 days bucket (1 guide)

| Guide | lastVerified | Age | Action |
|---|---|---|---|
| `workplace-accident-rousai` | 2026-04-25 | 24 days | **Re-verify before v1.5.1** — the labor-accident process changes annually with budget cycle. Confirm 労災 forms and 労働基準監督署 contact info |

---

## 14–21 days bucket (16 guides)

Re-verify these if v1.5.1 ships > 2 weeks out. If we ship v1.5.1 in the next 7 days, only the 21-day ones (3) need attention; the rest can wait until v1.5.2.

| Age | Guide | Note |
|---|---|---|
| 21d | `childcare-parental-leave` | 育児休業給付金 rates can shift |
| 21d | `first-7-days-in-japan` | Newcomer onboarding — high traffic, worth precise |
| 21d | `special-fraud-tokushu-sagi` | Fraud patterns evolve; check 警察庁 latest cases |
| 20d | `kakutei-shinkoku` | Filing rules stable but check 国税庁 deadline pages |
| 17d | `bicycle-insurance` | Mandatory-insurance by prefecture varies |
| 17d | `credit-card-for-foreigners` | Lender policies shift |
| 17d | `kokuho-reduction` | Income brackets update annually |
| 17d | `labor-rights-dispute` | Stable, low priority |
| 17d | `marriage-certificate-vn-japan` | Consulate procedures, check VN side |
| 17d | `nisa-investment` | 2026 NISA limits, check 金融庁 |
| 17d | `payslip-reading` | Stable |
| 17d | `sole-proprietor-kojin-jigyo` | 青色申告 forms stable but check 国税庁 |
| 16d | `car-shaken-insurance` | Insurance premium tables update |
| 16d | `drivers-license-renewal` | 都道府県 fee variations |
| 15d | `overstaying-illegal-stay-procedures` | High-stakes guide — keep fresh; ISA policy evolves |
| 15d | `visa-status-change-detailed-scenarios` | Same — ISA policy |

---

## ≤ 14 days bucket (110 guides)

All within the standard governance window. No action needed before v1.5.1.

---

## Recommended actions before v1.5.1

1. **Re-verify `workplace-accident-rousai`** (24 days, top of stale list). Estimated effort: 30 min — check 厚生労働省 / 労働基準監督署 official pages, refresh `lastVerified` date in the guide file
2. **Spot-check the 4 highest-impact in 21d bucket**: `first-7-days-in-japan`, `kakutei-shinkoku`, `overstaying-illegal-stay-procedures`, `kokuho-reduction`. These are high-traffic guides where stale info has the biggest user impact
3. **Defer the rest** to v1.5.2 cycle — none are emergency-critical and all are < 22 days old

**Do NOT do**:
- Mass re-verification of all 16 guides in 14-21d bucket. Premature optimization — let the 30-day threshold actually trigger
- Auto-bump `lastVerified` dates without actual source check. That's data-falsification
- Edit content during this audit. This doc is INFORMATIONAL only

---

## Methodology

```bash
# Reproduce this audit:
today="2026-05-19"
for f in src/constants/content/adminGuides/guides/*.ts; do
  bn=$(basename "$f" .ts)
  [ "$bn" = "index" ] && continue
  date=$(grep -m 1 "lastVerified:" "$f" | sed -E "s/.*lastVerified: '([0-9-]+)'.*/\1/")
  diff=$(( ($(date -d "$today" +%s) - $(date -d "$date" +%s)) / 86400 ))
  # bucket by $diff
done
```

`lastVerified` is the date the content's official source was last cross-checked. The 30-day rule comes from `docs/content-governance.md`: guides past 30 days should be re-verified before they ship in a new App Store release.

---

## Companion docs

- [`content-governance.md`](content-governance.md) — 30-day rule + source-verification process
- [`v1.5.0-final-release-status.md`](v1.5.0-final-release-status.md) — release context
- [`post-launch-observation-plan.md`](post-launch-observation-plan.md) — week-by-week discipline that places this audit in the "week 1 safe observation" slot
