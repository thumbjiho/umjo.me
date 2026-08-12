---
name: recover-context
description: Reconstruct the current project and task state from repository artifacts before resuming work. Use when starting a new session, switching coding agents, or when conversation context is incomplete or unreliable.
---

# Recover Project Context

Reconstruct the project from repository evidence before making non-trivial changes.

Do not assume access to any previous agent conversation or hidden reasoning.

## Step 1 — Read project instructions

Read:

1. `AGENTS.md`
2. tool-specific instruction files that apply to this agent
3. `docs/agent/STATE.md`
4. `docs/agent/CURRENT_TASK.md`

Do not start implementation yet.

## Step 2 — Inspect repository reality

Inspect:

- `git status`
- recent `git log`
- relevant uncommitted diff, if any
- files referenced by `CURRENT_TASK.md`
- tests related to the current task
- relevant ADRs in `docs/decisions/`

Use subagents for broad exploration when intermediate search context would be noisy and disposable.

## Step 3 — Reconcile recorded state with reality

Use this authority order when information conflicts:

1. code and tests
2. Git status/diff/history
3. accepted ADRs
4. `STATE.md`
5. `CURRENT_TASK.md`
6. conversation context

Identify stale or contradictory documentation explicitly.

Do not silently trust an outdated checkpoint.

## Step 4 — Build a concise recovery model

Before implementing, summarize:

### Current goal

What outcome is currently being pursued?

### Current state

What is already implemented and verified?

### Remaining work

What still needs to happen?

### Important constraints

What decisions, APIs, compatibility requirements, or architecture must be preserved?

### Working tree

What meaningful uncommitted or partially completed changes exist?

### Risks / inconsistencies

What is unclear, contradictory, stale, or dangerous?

### Recommended next action

What is the smallest sensible next step?

## Step 5 — Continue

If the user asked for implementation, continue with the requested work after the recovery summary.

If the user asked only for status or orientation, stop after the summary.

Do not rewrite project state files merely because recovery was performed.
Update them only if they are actually stale or the project state changes.
