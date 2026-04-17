# J2 Batch 001 Handoff

## Next Step

Send the prompt in `j2-batch-001.claude-prompt.md` to Claude Code and ask it to return JSON only.

## Save Path

Paste Claude output into:

- `docs/bjt/raw/j2-batch-001.raw.json`

## After Claude Returns

1. Run audit only after review decisions are filled in:
   - `npm run bjt:audit-batch -- docs/bjt/raw/j2-batch-001.raw.json docs/bjt/reviewed/j2-batch-001.reviewed.json`
2. Review weak items in:
   - `docs/bjt/reviews/j2-batch-001.review.md`
3. If batch becomes import-ready, generate manifest snippet:
   - `npm run bjt:manifest-snippet -- j2-batch-001 J2 "J2 Batch 001" docs/bjt/raw/j2-batch-001.raw.json docs/bjt/reviewed/j2-batch-001.reviewed.json docs/bjt/reviewed/j2-batch-001.runtime.json docs/bjt/reviews/j2-batch-001.review.md docs/bjt/reviews/j2-batch-001.runtime-preview.md`
