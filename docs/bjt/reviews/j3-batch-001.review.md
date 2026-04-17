# J3 Batch 001 Review

Source:

- Claude Code assisted batch
- 12 original J3 items
- Not approved for runtime import yet

## Review Outcome

### Keep with light copy-edit only

- `j3_reading_001`
- `j3_reading_002`
- `j3_reading_003`
- `j3_reading_004`
- `j3_listening_002`
- `j3_listening_003`
- `j3_listening_004`
- `j3_lr_002`
- `j3_lr_003`
- `j3_lr_004`

### Needs revision before import

- `j3_listening_001`
  - Risk: prompt says "first response", but the current answer is framed as an internal judgment rather than a concrete first business response.
  - Fix direction: revise the prompt or options so the correct answer is an immediate and explicit response step.

- `j3_lr_001`
  - Risk: correct answer depends on a hidden assumption that Nakamura is responsible for checking room availability.
  - Fix direction: revise the prompt to focus on whether the new proposed time and location are workable, or revise the options so the correct answer does not require hidden authority assumptions.

## Import Rule For This Batch

- Do not import directly into `src/constants/content/bjt.ts`.
- Use the reviewed manifest plus the revised raw patch in `docs/bjt/raw/j3-batch-001.revised.json`.
- This batch is now ready for reviewed transform into app runtime schema.

## Revision Status

- `j3_listening_001`
  - fixed by changing the correct answer into a direct first response to the caller
- `j3_lr_001`
  - fixed by changing the answer target from room ownership to personal schedule availability

## Suggested Claude Revision Prompt

```text
Revise only these items: j3_lr_001, j3_listening_001.

Requirements:
- Keep level at J3.
- Make the correct answer uniquely defensible.
- Avoid answers that depend on hidden assumptions about role or authority.
- If the prompt says "first action" or "best response", the correct option must be an immediate concrete business action.
- Keep the same output schema.
- After revising, add a short note: what ambiguity was fixed.
```
