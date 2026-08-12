---
name: checkpoint
description: Create or refresh a concise repository checkpoint so a fresh session, another coding agent, or another developer can resume accurately without the current conversation.
---

# Create Project Checkpoint

Prepare the repository for handoff to a fresh agent with no conversation history.

The goal is not to summarize the conversation.
The goal is to preserve the minimum verified state necessary to continue the work.

## Step 1 — Inspect actual state

Inspect:

- current task and user-requested outcome
- `git status`
- relevant `git diff`
- recent commits when useful
- relevant tests and their actual results
- `docs/agent/STATE.md`
- `docs/agent/CURRENT_TASK.md`
- relevant ADRs

Do not rely only on conversation memory.

## Step 2 — Update `CURRENT_TASK.md`

Rewrite it as the current task snapshot.

Include:

### Goal

The concrete outcome currently being pursued.

### Requested Behavior

Important behavioral requirements that must not be lost.

### Completed

Only work that is actually complete.

### In Progress

Work that has begun but is incomplete.

### Remaining

Specific remaining work.

### Relevant Files

Only files likely to matter to the next agent.

### Verification

Separate:

- Passed
- Failed
- Not Yet Run

Never infer test results.

### Important Discoveries

Non-obvious facts that would otherwise need to be rediscovered.

### Decisions Made During This Task

Only decisions relevant to continuing the task.

Move durable architectural rationale into an ADR.

### Blockers / Risks

Known uncertainties, breakages, edge cases, or external blockers.

### Working Tree Notes

Summarize meaningful uncommitted work without copying the full diff.

### Next Recommended Action

Give the smallest sensible next step.

## Step 3 — Update `STATE.md` only when needed

Update `docs/agent/STATE.md` only if project-level state changed.

Examples:

- architecture changed
- a major capability became stable
- milestone changed
- a major known problem appeared or was resolved
- verification commands or environment changed

`STATE.md` must remain a present-tense snapshot.

Do not append historical session notes.

## Step 4 — Record durable decisions

If the session introduced an important architectural decision whose rationale is not obvious from the code, create or update an ADR in `docs/decisions/`.

A minimal ADR should contain:

- Title
- Status
- Context
- Decision
- Consequences

Do not create ADRs for trivial implementation choices.

## Step 5 — Validate the checkpoint

Before finishing:

- compare checkpoint claims with the actual code
- inspect the working tree
- verify claimed completed work exists
- ensure actual test results are labeled correctly
- remove stale information
- remove speculative reasoning presented as fact
- avoid large raw logs or copied diffs
- keep the checkpoint concise enough for a fresh agent to scan quickly

## Step 6 — Report handoff readiness

Return a concise handoff summary containing:

- current task
- what changed
- verification status
- unresolved issues
- next recommended action
- which checkpoint files were updated

Do not commit, push, deploy, migrate production data, or perform other irreversible actions unless explicitly requested.
