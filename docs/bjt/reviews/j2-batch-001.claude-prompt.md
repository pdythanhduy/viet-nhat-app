You are helping generate original BJT-style practice data for a learning app.

Task:
Create 12 original items for level J2.

Priority for this batch:
- Fill a real gap in the current app question bank for J2.
- Make J2 clearly denser than J3:
  - more than one relevant condition
  - clearer role-based judgment
  - stronger need to prioritize action
  - realistic business politeness and escalation flow
- Prefer situations that combine schedule changes, reporting, approvals, coordination, and workplace decisions.

Recommended balance:
- 4 listening
- 4 listening-reading
- 4 reading
- Prefer `advanced` and `intermediate` over `basic`

Hard constraints:
- These are NOT official BJT questions.
- Do not copy or paraphrase official sample questions.
- Use realistic Japanese workplace situations only.
- Keep one clearly defensible correct answer per item.
- Do not rely on hidden authority assumptions.
- Do not create fake policy rules unless they are explicitly written inside the situation text.
- Output valid JSON array only.

Schema per item:
{
  "id": "j2_skill_001",
  "level": "J2",
  "skill": "listening" | "listening-reading" | "reading",
  "difficulty": "basic" | "intermediate" | "advanced",
  "business_topic": "email" | "meeting" | "phone" | "reporting" | "schedule" | "memo" | "announcement",
  "situation": "...",
  "prompt": "...",
  "options": ["...", "...", "...", "..."],
  "correctIndex": 0,
  "explanation_vi": "...",
  "vocabulary": ["...", "..."],
  "grammar_points": ["...", "..."],
  "action_focus": "...",
  "level_reason": "...",
  "why_not_lower_level": "...",
  "why_not_higher_level": "..."
}

J2 quality rules:
- The learner should need to judge what matters most, not only match one obvious sentence.
- Distractors should be plausible in workplace context.
- At least some items should require distinguishing:
  - must-do now vs. can-do later
  - internal confirmation vs. external reply
  - direct request vs. fallback option
  - approval path vs. execution step
- Japanese should sound natural for meetings, internal notices, reporting, and partner communication.

Self-check before returning:
1. schema validity
2. one clearly defensible correct answer
3. explanation matches correctIndex
4. no duplicated options
5. level consistency for J2
