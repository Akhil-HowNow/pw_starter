---
name: pw-code-review
description: Reviews Playwright + TypeScript changes in the pw_starter repo against agent-context/CODING_GUIDELINES.md and probes for weak coverage. Use whenever the user asks to review, code-review, or check their tests, spec, page object, facade, diff, branch, or PR in this repo — e.g. "review my changes", "review the cart spec", "is this ready for PR", or explicit invocation via /pw-code-review. Report-only; never edits code.
---

# pw-code-review

Review changes against the repo's standards. The standards live only in `agent-context/CODING_GUIDELINES.md` — never restate or rely on memory of them.

## Workflow

1. **Read standards.** Read `agent-context/CODING_GUIDELINES.md` in full, every run.
2. **Scope.** Default: `git diff main...HEAD` plus uncommitted and untracked files (`git status`). If the user gives a path or spec name, review only that. Read each changed file in full, not just hunks — layering and ID-uniqueness checks need full context.
3. **Guideline pass.** Check every changed file against each relevant guideline section; cite as `§N`. Also check:
   - Specs import `test`/`expect` from `../../fixtures`.
   - New test IDs are unique and area-prefixed — grep `tests/` for each one.
   - `CLAUDE.md` Architecture section updated if structure changed (new page object, fixture, `tests/` dir, skill).
4. **Investigative pass.** Beyond the written rules, flag: missing boundary/negative/empty-input cases, tests that cannot fail, order-dependence or shared-state risk on the live site, unstated assumptions, assertions on implementation detail.
5. **Run checks (read-only).** `npx tsc --noEmit`, then only the affected specs (`npx playwright test <file>` or `--grep "<ID>"`). Never the full suite. Never edit code.
6. **Report.**

## Output format

No preamble, no trailing summary. Group by severity:

- **Blocker** — breaks a MUST-level rule or the build (tsc error, `test.only`, secrets, test can't fail)
- **Major** — layering, locator priority, fixed waits, data isolation
- **Minor** — naming, style, comments
- **Suggestion** — investigative coverage gaps

Each finding: `file:line — §N — issue — fix`. Investigative findings have no § — write `—` there.

End with one line: `tsc: pass|fail · tests: <n> passed / <n> failed`. If nothing is found, say so in one line.

## Rules

- Report only. Offer fixes as a next-step question; never apply them unasked.
- Never commit or push.
- If the guidelines file is missing, stop and say so.
