---
name: checkpoint
description: Refresh concise repository state so a fresh agent or developer can resume without conversation history.
---

# Create Project Checkpoint

1. Inspect the actual task, code, Git state, diffs, checks, existing state
   documents, and ADRs.
2. Rewrite `docs/agent/CURRENT_TASK.md` with goal, requested behavior,
   completed and remaining work, relevant files, actual verification results,
   discoveries, decisions, risks, working tree notes, and the next action.
3. Update `docs/agent/STATE.md` only when stable project-level architecture,
   capabilities, constraints, known problems, or verification commands change.
4. Add an ADR only for a durable, non-obvious architectural decision.
5. Validate every checkpoint claim against repository evidence and keep the
   result concise.
6. Do not commit, push, deploy, or perform external side effects unless the
   user explicitly requests them.
