# BJT Data Workflow

This folder is for authoring and reviewing original BJT-style practice data before it is transformed into app runtime content.

## Principles

- Do not store official BJT items or copyrighted material here.
- Store only original, self-authored or AI-assisted draft items.
- Keep raw authoring data separate from the simplified runtime schema used by the app.
- Review every batch before any import into `src/constants/content/bjt.ts`.

## Folder Structure

- `raw/`
  - Original batch output from Claude Code or manual drafting.
- `reviews/`
  - Review notes, keep/revise/reject decisions, ambiguity notes.
- `reviewed/`
  - Structured review decisions with `approved` / `needs_revision` / `rejected`.
- `import-checklist.md`
  - Rules for moving reviewed items into app runtime data.

## Recommended Flow

1. Generate a batch into `raw/`.
2. Review the batch in `reviews/`.
3. Revise weak items until they are uniquely answerable.
4. Transform only approved items into the app schema.
5. Import them into runtime content in a separate change.

To start a brand-new batch quickly, you can scaffold the expected files first:

```bash
npm run bjt:init-batch -- j2-batch-001 J2 "J2 Batch 001"
```

## App Transform Layer

Reviewed items should be transformed through the code-side utility instead of being copied directly by hand:

- `src/utils/bjtAuthoring.ts`
  - validates raw authoring items
  - blocks non-approved items
  - maps approved reviewed items into `BjtPracticeQuestion`

Related types live in:

- `src/types/content.ts`
  - `BjtAuthoringQuestion`
  - `BjtReviewedAuthoringQuestion`
  - `BjtReviewStatus`

## Current Status

- `j3-batch-001.raw.json`: first Claude-assisted J3 batch
- `j3-batch-001.review.md`: initial review notes and next actions
- `j3-batch-001.reviewed.json`: structured review decisions for transform
- `src/constants/content/bjtPipeline.ts`: in-app manifest for raw/reviewed/imported batch tracking
