# BJT Content Roadmap

Source: `C:\viet-nhat-app\viet-nhat-app\docs\bjt\document\partitioned\legacy_runtime_practice_questions.json`
Updated: 2026-04-19T02:27:26.691Z

## Coverage Matrix

### J5
- email: 2
- meeting: 4
- phone: 3
- schedule: 10
- reporting: 2
- customer: 3
- compliance: 0
- legal: 1
- finance: 1
- incident: 1
- other: 8

### J4
- email: 5
- meeting: 4
- phone: 3
- schedule: 10
- reporting: 3
- customer: 5
- compliance: 0
- legal: 1
- finance: 1
- incident: 1
- other: 3

### J3
- email: 5
- meeting: 7
- phone: 4
- schedule: 7
- reporting: 4
- customer: 4
- compliance: 1
- legal: 0
- finance: 2
- incident: 0
- other: 0

### J2
- email: 5
- meeting: 7
- phone: 2
- schedule: 8
- reporting: 5
- customer: 5
- compliance: 0
- legal: 1
- finance: 2
- incident: 0
- other: 1

### J1
- email: 4
- meeting: 6
- phone: 2
- schedule: 10
- reporting: 3
- customer: 2
- compliance: 0
- legal: 7
- finance: 0
- incident: 1
- other: 1

### J1+
- email: 6
- meeting: 3
- phone: 0
- schedule: 4
- reporting: 4
- customer: 3
- compliance: 0
- legal: 10
- finance: 2
- incident: 1
- other: 0

## Priority Gaps

- J5 / compliance: current=0, target=1, missing=1
- J4 / compliance: current=0, target=1, missing=1
- J3 / legal: current=0, target=1, missing=1
- J3 / incident: current=0, target=1, missing=1
- J2 / compliance: current=0, target=2, missing=2
- J2 / legal: current=1, target=2, missing=1
- J2 / incident: current=0, target=2, missing=2
- J1 / compliance: current=0, target=2, missing=2
- J1 / finance: current=0, target=2, missing=2
- J1 / incident: current=1, target=2, missing=1
- J1+ / phone: current=0, target=2, missing=2
- J1+ / compliance: current=0, target=2, missing=2
- J1+ / incident: current=1, target=2, missing=1

## Suggested Next Batch

- Batch A: J3/J2 schedule + reporting edge cases (deadline collision, escalation timing).
- Batch B: J2/J1 compliance + legal disclosure (role boundary under pressure).
- Batch C: J5/J4 customer phone/email basics with stronger distractors.

## QA Flow

1. Generate draft items by batch/topic.
2. Run `npm run bjt:qa-checklist` and `npm run bjt:distractor-audit`.
3. Fix issues, then enforce `npm run bjt:qa-checklist:gate`.

