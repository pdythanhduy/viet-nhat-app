# BJT Import Checklist

Use this checklist before moving any authoring batch into app runtime data.

- The item is original and not copied from official BJT material.
- The item has one clearly defensible correct answer.
- The prompt does not rely on hidden assumptions about authority, role, or internal policy.
- If the prompt asks for the "first action" or "best response", the answer is an immediate and concrete business action.
- Explanation matches `correctIndex`.
- Distractors are plausible but still clearly wrong.
- Level reasoning matches the intended J-band.
- Japanese wording sounds natural in workplace context.
- Only items marked `approved` should be passed into the transform utility.
- The runtime transform keeps only the fields needed by the app.
- Prefer setting `runtimeTitle` during review if the fallback UI title is too generic.
- Revised items are marked approved in the review note.

## Import Assistant

Use the code-side audit before importing a reviewed batch:

- `src/utils/bjtImportAssistant.ts`
  - reports missing review decisions
  - reports approved items that are still invalid
  - lists runtime ids that are ready to import
  - returns a single `readyToImport` flag for the whole batch

## Dev Audit Command

Run the repo-side audit script against a real batch before importing:

```bash
npm run bjt:audit-batch -- docs/bjt/raw/j3-batch-001.raw.json docs/bjt/reviewed/j3-batch-001.reviewed.json
```

Expected output includes:

- total item count
- approved count
- importable count
- `Ready to import: YES/NO`
- missing decision ids
- non-approved ids
- invalid approved items
- runtime question ids

## Manifest Snippet Command

After a batch is already runtime-ready, generate a copy-ready entry for
`src/constants/content/bjtPipeline.ts`:

```bash
npm run bjt:manifest-snippet -- j3-batch-001 J3 "J3 Batch 001" docs/bjt/raw/j3-batch-001.raw.json docs/bjt/reviewed/j3-batch-001.reviewed.json docs/bjt/reviewed/j3-batch-001.runtime.json docs/bjt/reviews/j3-batch-001.review.md docs/bjt/reviews/j3-batch-001.runtime-preview.md
```

Expected output:

- a `BjtPipelineBatch` snippet
- imported question ids filled from the runtime JSON
- ready to paste into `src/constants/content/bjtPipeline.ts`

## New Batch Scaffold

To prepare the next real batch without creating files by hand:

```bash
npm run bjt:init-batch -- j4-batch-001 J4 "J4 Batch 001"
```

This creates:

- `docs/bjt/raw/<id>.raw.json`
- `docs/bjt/reviewed/<id>.reviewed.json`
- `docs/bjt/reviews/<id>.review.md`
- `docs/bjt/reviews/<id>.runtime-preview.md`
- `docs/bjt/reviews/<id>.claude-prompt.md`
