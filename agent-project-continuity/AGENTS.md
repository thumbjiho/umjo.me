# Agent Working Protocol

This repository is designed to be resumable by a fresh coding agent with little or no prior conversation context.

## 1. Source of truth

When information conflicts, use this priority:

1. Current code and tests
2. Git status, diff, and history
3. Accepted ADRs in `docs/decisions/`
4. `docs/agent/STATE.md`
5. `docs/agent/CURRENT_TASK.md`
6. Conversation history or agent memory

Never preserve an agent-written statement merely because it appears in a state file.
Verify important claims against the repository.

## 2. Project continuity

Project-critical context must live in the repository, not only in conversation history.

Use:

- `docs/agent/STATE.md` for the current project-level snapshot
- `docs/agent/CURRENT_TASK.md` for the active task and handoff state
- `docs/decisions/` for durable architectural decisions and their rationale
- code and tests for actual behavior
- Git history for past states and implementation history

Do not turn `STATE.md` or `CURRENT_TASK.md` into chronological diaries.
Git already stores history.

## 3. Starting with incomplete context

If the current session does not clearly understand the project or active task:

1. Use the `recover-context` skill.
2. Read the relevant repository artifacts before editing code.
3. Inspect actual code and tests related to the task.
4. Explicitly call out stale or contradictory documentation.

Do not infer unfinished work solely from conversation history.

## 4. Main-agent context policy

Keep the main agent focused on information that matters for future decisions:

- user requirements
- behavioral requirements
- architecture
- implementation strategy
- cross-system constraints
- important discoveries
- unresolved risks
- integration decisions

Avoid filling the main context with large amounts of disposable intermediate data.

## 5. Subagent delegation

Prefer subagents for self-contained work whose intermediate context does not need to remain in the main conversation.

Good candidates include:

- codebase exploration
- locating references or usages
- documentation research
- dependency/API investigation
- log analysis
- test failure analysis
- file, schema, table, or endpoint inventories
- repetitive mechanical changes
- data inspection and validation
- independent review of an implementation
- comparison of bounded implementation options

Keep in the main agent:

- product or behavioral decisions
- architecture decisions
- cross-cutting implementation strategy
- integration of subagent findings
- risky or irreversible decisions
- prioritization
- final verification and handoff state

### Subagent result policy

Ask subagents to return synthesized findings rather than raw output.

Preferred result structure:

- Findings
- Relevant files
- Risks
- Unknowns
- Recommended next action

Do not paste large logs, search results, documentation dumps, or file contents back into the main context unless directly needed.

## 6. Before implementing

For non-trivial work:

1. Understand the requested outcome.
2. Inspect `docs/agent/CURRENT_TASK.md`.
3. Inspect relevant code and tests.
4. Check `git status`.
5. Read relevant ADRs.
6. Identify whether existing work is incomplete before replacing it.

Do not make broad refactors merely because another design appears cleaner.

## 7. Verification

Before claiming work is complete:

- run the most relevant tests
- run type checking/linting when applicable
- inspect the diff
- verify behavior rather than assuming it
- distinguish tests actually run from tests merely expected to pass

Never record a test as passing unless it was actually executed successfully.

## 8. Checkpoint and handoff

Use the `checkpoint` skill when:

- ending a substantial work session
- switching to another coding agent
- starting a fresh context soon
- the context window has become noisy or compressed
- handing unfinished work to another person or agent

A checkpoint should preserve only information useful to the next agent.

Do not commit or push merely to create a checkpoint unless explicitly requested.

## 9. Architectural decisions

Create an ADR when a decision:

- affects multiple parts of the system
- constrains future implementation
- is likely to be questioned or reversed later
- has meaningful tradeoffs
- cannot be understood from the code alone

Do not create ADRs for trivial implementation details.

## 10. Agent independence

Do not assume access to:

- previous Claude Code conversations
- previous Codex conversations
- another agent's hidden reasoning
- tool-specific memory
- MCP servers or integrations that are not configured in this repository

A fresh agent should be able to reconstruct the important state from the repository itself.
