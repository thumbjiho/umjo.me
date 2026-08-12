# Agent Project Continuity Template

Core files:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/agent/STATE.md`
- `docs/agent/CURRENT_TASK.md`
- `.agent-skills/recover-context/SKILL.md`
- `.agent-skills/checkpoint/SKILL.md`

## Suggested wiring

Keep `.agent-skills/` as the canonical skill source.

For Claude Code, symlink the skill folders into `.claude/skills/`.

For Codex, symlink the skill folders into `.agents/skills/`.

Example:

```bash
mkdir -p .claude/skills .agents/skills

ln -s ../../.agent-skills/recover-context .claude/skills/recover-context
ln -s ../../.agent-skills/checkpoint .claude/skills/checkpoint

ln -s ../../.agent-skills/recover-context .agents/skills/recover-context
ln -s ../../.agent-skills/checkpoint .agents/skills/checkpoint
```

If symlinks are inconvenient in your environment, copy the folders instead.

## First setup

1. Fill in `docs/agent/STATE.md`.
2. Fill in `docs/agent/CURRENT_TASK.md`.
3. Replace verification command placeholders in `STATE.md`.
4. Add project-specific architecture and engineering rules to `AGENTS.md`.
5. Add ADRs only for decisions whose rationale future agents need to preserve.
