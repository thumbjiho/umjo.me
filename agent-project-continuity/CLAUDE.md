@AGENTS.md

# Claude Code Specific Notes

Use Claude Code subagents when they help keep noisy, self-contained exploration out of the main context.

When available, use the project skills:

- `/recover-context` when entering the project without reliable session context
- `/checkpoint` before handing work to a new session or another agent

Repository state is more authoritative than Claude conversation memory.
