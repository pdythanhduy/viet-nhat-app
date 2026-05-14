# Full content backlog: 45 missing guides from May 2026 review

## STATUS as of 2026-05-14 (FINAL)

**Backlog 45/45 = 100% DONE** ✅ + 2 additional (#46, #47).

Main HEAD `27f2475`. ADMIN_GUIDES: 90 (v1.3.2) → **128**.

See [`docs/admin-guides-complete-123-checkpoint.md`](admin-guides-complete-123-checkpoint.md) for pre-merge audit + residual risk.

## Purpose

This document stores the full backlog of missing guide ideas identified after the current 80-guide release.

This is NOT an instruction to implement everything at once.

## Execution rule

Do NOT add 45 guides in one pass.

Work in small batches of 3–5 guides. For each batch:

- Create guide files
- Register in ADMIN_GUIDES
- Add search keywords / aliases
- Add counterPhrases where useful
- Add/update a batch report doc
- Run npm run typecheck
- Run npm run test:ci
- Run npm run verify:content

If official source cannot be verified, mark the item as NEEDS_OFFICIAL_SOURCE_CHECK.

Avoid overclaiming legal/medical/policy facts.

---

# P0 — Highest priority / user survival

## Medical / health

1. clinic-hospital-visit-guide — Cách đi khám bệnh ở Nhật ✅ DONE
2. emergency-calls-japan — Gọi cấp cứu, cảnh sát ở Nhật ✅ DONE
3. dentist-visit-japan — Đi nha khoa ở Nhật ✅ DONE
4. mental-health-stress-support — Sức khỏe tâm thần / stress / hotline hỗ trợ ✅ DONE
5. long-term-care-insurance-kaigo — Bảo hiểm chăm sóc dài hạn / 介護保険 ✅ DONE (2026-05-14)

## Disaster preparedness

6. earthquake-preparedness-japan — Hướng dẫn khi động đất ✅ DONE
7. typhoon-evacuation-alerts — Hướng dẫn khi bão / 台風 ✅ DONE
8. hazard-map-flood-tsunami-volcano — Lũ lụt / sóng thần / núi lửa / hazard map ✅ DONE
9. fire-earthquake-insurance-home — Bảo hiểm hỏa hoạn / động đất cho nhà thuê ✅ DONE (2026-05-14)

## Daily utilities and living essentials

10. electricity-gas-water-contracts — Hợp đồng điện / gas / nước ✅ DONE
11. home-internet-wifi-contracts — Internet / Wi-Fi nhà ✅ DONE
12. nhk-contract-guide — NHK là gì, xử lý khi nhân viên NHK đến nhà ✅ DONE
13. post-office-mail-forwarding — Bưu điện / chuyển tiếp thư / gửi hàng ✅ DONE
14. consumer-rights-cooling-off — Mua sắm, trả hàng, cooling-off, hotline 188 ✅ DONE (2026-05-14)

## Education / children

15. japanese-school-system-children — Hệ thống trường học Nhật Bản ✅ DONE
16. japanese-language-support-children — Hỗ trợ tiếng Nhật cho con / 日本語指導 ✅ DONE
17. child-allowance-jidou-teate — Trợ cấp trẻ em / 児童手当 ✅ DONE
18. study-in-japan-student-guide — Du học Nhật, visa du học, trường tiếng Nhật, học bổng cơ bản ✅ DONE (2026-05-14)

---

# P1 — Important / high-value expansion

## Legal rights and support

19. discrimination-human-rights-support — Phân biệt đối xử / nhân quyền / nơi tư vấn ✅ DONE (2026-05-14)
20. police-questioning-rights-japan — Khi bị cảnh sát hỏi/thẩm vấn/bắt giữ ✅ DONE (2026-05-09)
21. embassy-consulate-vietnam-japan — Đại sứ quán / lãnh sự quán Việt Nam tại Nhật ✅ DONE
22. inheritance-will-japan-foreigners — Di chúc / thừa kế tại Nhật cho người nước ngoài ✅ DONE (2026-05-14, A11)
23. domestic-violence-dv-support — Bạo lực gia đình / DV / nơi tạm lánh / visa ✅ DONE (2026-05-14)

## Community and support

24. foreign-resident-support-centers — Trung tâm hỗ trợ người nước ngoài / 多文化共生センター ✅ DONE
25. free-japanese-classes-local — Lớp tiếng Nhật miễn phí / giá rẻ ✅ DONE
26. vietnamese-community-japan — Cộng đồng người Việt tại Nhật ✅ DONE
27. local-volunteering-chonaikai — Tình nguyện / 町内会 / hoạt động cộng đồng ✅ DONE

## Tax / finance expansion

28. furusato-nozei-guide — Furusato Nouzei / ふるさと納税 ✅ DONE
29. ideco-personal-pension — iDeCo / lương hưu cá nhân / lợi ích thuế ✅ DONE
30. tax-on-remittance-to-vietnam — Thuế/quy định khi gửi tiền về Việt Nam ✅ DONE

## Work / career expansion

31. japanese-resume-rirekisho — Cách viết CV Nhật / 履歴書 ✅ DONE
32. job-interview-japan — Phỏng vấn xin việc ở Nhật ✅ DONE
33. paternity-parental-leave-fathers — Nghỉ chăm con cho bố / 育児休業 cho nam giới ✅ DONE

---

# P2 — Useful but not urgent

## Technology and daily convenience

34. essential-apps-japan-life — App cần thiết khi sống ở Nhật ✅ DONE (2026-05-14, A11)
35. point-cards-coupons-japan — Rakuten Point, dPoint, Ponta, coupon ✅ DONE (2026-05-14, A11)
36. pet-registration-japan — Nuôi thú cưng, đăng ký chó, tiêm phòng, quy tắc chung cư ✅ DONE (2026-05-14)

---

# Policy-sensitive / official-source required

These are high-value but must be handled carefully because policy may change.
Do not implement without official-source verification.

37. specific-residence-card-my-number-2026 — 特定在留カード / thẻ cư trú hợp nhất My Number ✅ DONE (2026-05-14, A12)
38. myna-health-insurance-card-2026 — マイナ保険証 / bảo hiểm y tế tích hợp My Number ✅ DONE (2026-05-14, A12)
39. visa-fee-increase-2025-2026 — Phí thủ tục visa tăng 2025–2026 ✅ DONE (2026-05-14)
40. naturalization-kika-2026-changes — Nhập tịch / 帰化 và thay đổi 2026 ✅ DONE (2026-05-14)
41. ikusei-shuro-system-guide — 育成就労 thay thế thực tập kỹ năng ✅ DONE (2026-05-14, A12)
42. jista-entry-system-guide — JESTA / hệ thống xét duyệt nhập cảnh điện tử ✅ DONE (2026-05-14)

---

# Additional possible guides from review notes

43. medical-interpretation-and-multilingual-hospitals — Bệnh viện có phiên dịch / hỗ trợ đa ngôn ngữ ✅ DONE
44. holiday-night-medical-care — Khám bệnh đêm/cuối tuần/ngày lễ ✅ DONE
45. pharmacy-prescription-guide — Nhà thuốc / toa thuốc / cách nhận thuốc ở Nhật ✅ DONE

---

# Additional gaps identified 2026-05-14 review (post 110 guides)

46. houterasu-legal-aid-foreigners — 法テラス / tư vấn pháp lý + ứng phí luật sư cho người thu nhập thấp ✅ DONE (2026-05-14)
47. child-vaccination-schedule — Tiêm chủng cho trẻ em (定期 vs 任意), 母子手帳, lịch 0–13 tuổi ✅ DONE (2026-05-14)

## Status as of 2026-05-14 (final)

**Backlog 45/45 = 100% DONE** ✅

Plus 2 additional gaps identified post-review:
- #46 houterasu-legal-aid-foreigners ✅ DONE
- #47 child-vaccination-schedule ✅ DONE

ADMIN_GUIDES count: 90 (v1.3.2 ship) → **128** (main HEAD `27f2475`).

## Future ideas (not blocking)

- Job change tenshoku deep-dive (separate from job-change-notification về 入管)
- Birth registration với 領事館 Việt Nam (split from embassy / baby guides)
- Phase 2 app features (Find Nearby + Calculators) — see `app_features_roadmap_2026.md`

---

# Recommended batch order

## Batch A1 — Medical access essentials

Already selected for first execution:

1. clinic-hospital-visit-guide
2. emergency-calls-japan
3. dentist-visit-japan

## Batch A2 — Disaster preparedness

1. earthquake-preparedness-japan
2. typhoon-evacuation-alerts
3. hazard-map-flood-tsunami-volcano

## Batch A3 — Daily utilities

1. electricity-gas-water-contracts
2. home-internet-wifi-contracts
3. nhk-contract-guide
4. post-office-mail-forwarding

## Batch A4 — Education / children

1. japanese-school-system-children
2. japanese-language-support-children
3. child-allowance-jidou-teate

## Batch A5 — Legal / support

1. embassy-consulate-vietnam-japan
2. police-questioning-rights-japan
3. foreign-resident-support-centers

---

# General guide quality standard

Every guide should answer:

1. What is this?
2. Who needs it?
3. When should the user act?
4. Where should the user go/call/check?
5. What should the user prepare?
6. What are the steps?
7. What mistakes should the user avoid?
8. What Japanese phrases can the user say?
9. What should the user search if they are confused?
10. Which official source needs checking?

Use natural Vietnamese, not dictionary translation.

Prioritize user intent: I am sick, I lost my card, visa is expiring, I got a letter, earthquake happened, etc.
