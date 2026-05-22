# Repo hygiene — after Phase 2C

**Date**: 2026-05-22
**Owner**: pdythanhduy
**Scope**: a documentation-only checklist of stale local + remote
branches that are safe to clean up **after this PR
(`chore/v1.5.3-signal-to-action-layer`) merges**. No branches are
deleted by this PR itself.

This doc exists because the user runs parallel Claude sessions, and
older sessions leave behind branches that should not silently
linger. Documenting cleanup intent keeps the deletion auditable when
it eventually happens.

---

## 1. Branches confirmed merged into `main` (safe to delete after confirmation)

Each row below has been confirmed merged by `git log --oneline -5`
showing the merge commit on `main`. Before deleting, run the
verification commands in §2.

| Branch | Merge commit on `main` | Local? | Remote? | Reason it can go |
| --- | --- | --- | --- | --- |
| `chore/product-loop-v1.5.1-foundation` | `e4d110d` | yes | yes | v1.5.1 foundation merged 2026-05-21 |
| `feat/phase-2c-observability-and-retrieval` | `d219968` | yes | yes | Phase 2C observability merged 2026-05-21 |

---

## 2. Pre-delete verification (run BEFORE running §3 commands)

Do not skip these. The most common cleanup mistake is deleting a
branch that has a commit not on `main`.

```sh
# 1. Make sure you're on main and fully up to date
git checkout main
git pull origin main

# 2. Confirm each branch is fully merged into main
git branch --merged main | grep -E 'chore/product-loop-v1.5.1-foundation|feat/phase-2c-observability-and-retrieval'

# 3. For each branch, verify HEAD is reachable from main
git merge-base --is-ancestor chore/product-loop-v1.5.1-foundation main && echo "OK — fully merged"
git merge-base --is-ancestor feat/phase-2c-observability-and-retrieval main && echo "OK — fully merged"

# 4. Confirm the remote PRs are actually closed/merged on GitHub
gh pr list --state merged --search "chore/product-loop-v1.5.1-foundation"
gh pr list --state merged --search "feat/phase-2c-observability-and-retrieval"
```

If any of the four checks fails — **STOP**. Investigate before
deleting.

---

## 3. Delete commands (run only after §2 passes)

### Local branches

```sh
git branch -d chore/product-loop-v1.5.1-foundation
git branch -d feat/phase-2c-observability-and-retrieval
```

`-d` (lowercase) refuses to delete if the branch is not fully merged.
**Do not use `-D` (uppercase)** — that bypasses the safety check and
is exactly what this doc exists to prevent.

### Remote branches

```sh
git push origin --delete chore/product-loop-v1.5.1-foundation
git push origin --delete feat/phase-2c-observability-and-retrieval
```

If GitHub's branch protection is on for either of these (it usually
is not — they're feature branches), the push will be rejected with
a clear message. Resolve in GitHub UI rather than forcing.

---

## 4. Branches that look stale but should NOT be deleted in this pass

| Branch | Why keep |
| --- | --- |
| `chore/v1.5.3-signal-to-action-layer` | This PR's own branch. Stays until this PR merges. |
| `feature/jlpt-vocabulary` | Long-running content work; check with owner before delete |
| `docs/v1.5.0-final-release-status` | Reference for v1.5.0 launch artifacts; defer |
| `docs/my-japan-plan-assessment` | Feature scoping branch; deferred work |
| `feat/my-japan-plan-phase-0-ui-mock` | Linked to the my-japan-plan scoping; defer |
| `fix/*` branches with `+` marker | Worktree branches owned by other Claude sessions per [`feedback_parallel_sessions`](../C--viet-nhat-app-viet-nhat-app/memory/feedback_parallel_sessions.md) — do not touch from this session |
| `remotes/origin/feat/recently-viewed-guides` | Older feature branch; verify state with owner before deleting |
| `remotes/origin/feat/saved-guides-phase1` | Same — verify before delete |
| `remotes/origin/feat/reminder-hooks-foundation` | Reminder work is gated to 2026-06-04 R3 decision day; do not delete until decision lands |
| Anything tagged with `+` in `git branch -a` | Active worktree — deleting is destructive to that worktree |

When in doubt, **keep the branch**. The cost of a stale branch is
near zero. The cost of deleting a branch with unmerged work is
non-trivial recovery.

---

## 5. `.claude/settings.local.json` note

This file is **tracked** in the repo but should be treated as a
**local-only working knob**:

- It contains per-developer permission grants for tool calls (the
  `permissions.allow` list). Drift between sessions is expected.
- It is currently checked in (not gitignored), so historical state
  is recoverable, but day-to-day diffs are noise.
- Do NOT include `.claude/settings.local.json` modifications in
  unrelated feature PRs. If `git status` shows it modified and the
  PR is about something else, omit it from staging:
  `git restore --staged .claude/settings.local.json` (do not delete
  the local edits — they're your session's grants).
- If the file's diff is large or accidental, prefer a separate
  housekeeping PR rather than mixing it with code changes.

Each Claude session adds entries here as the user approves new
tools. Other sessions' grants are not relevant to this repo's
codebase. If parallel sessions are running per
[`feedback_parallel_sessions`](../C--viet-nhat-app-viet-nhat-app/memory/feedback_parallel_sessions.md),
the file may race — let the most-recent session's grant list win.

---

## 6. Cadence

Run this cleanup pass once per quarter, OR after any sprint that
merges 2+ feature branches. Adding a new "safe to delete" row to §1
is the trigger to schedule the next pass.

When adding new rows to §1, follow the format strictly:

- Branch name
- Merge commit SHA on `main` (proof of merge)
- Local / Remote presence
- One-line reason it can go

No bare "old branch" entries. Every row earns its place with a
mergeproof citation.

---

## 7. Not in scope for this doc

- ❌ Tag cleanup. Tags are immutable history; don't touch without an explicit reason.
- ❌ Force-deleting branches.
- ❌ Cleaning up commits via interactive rebase (the project doesn't squash old commits).
- ❌ Removing `origin/HEAD -> origin/main`. That's the default-branch pointer.
- ❌ Renaming branches.
- ❌ Garbage-collecting unreachable objects (`git gc --prune=now` etc.) — never needed by hand.
