---
name: recover-context
description: Reconstruct the current project and task state from repository artifacts before resuming work.
---

# Recover Project Context

1. Read `AGENTS.md`, `docs/agent/STATE.md`, and
   `docs/agent/CURRENT_TASK.md` before implementation.
2. Inspect `git status`, recent history, relevant diffs, code, checks, and
   ADRs.
3. Reconcile conflicts using this order: code/checks, Git, ADRs, `STATE.md`,
   `CURRENT_TASK.md`, conversation context.
4. Summarize the current goal, implemented state, remaining work,
   constraints, working tree, risks, and smallest recommended next action.
5. Continue implementation only when requested. Do not rewrite state files
   merely because context recovery was performed.
