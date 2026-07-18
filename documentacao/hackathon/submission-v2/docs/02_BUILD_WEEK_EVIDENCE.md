---
id: JUS9-BUILD-WEEK-V2-EVIDENCE-001
versao: 2.0.0-candidate
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-18
status: candidato-nao-final
classificacao: PUBLICO-SANITIZADO
hash: nao-aplicavel-pacote-candidato
---

# Build Week Evidence

## Time boundary

- Submission Period start: July 13, 2026, 9:00 AM Pacific Time.
- Evidence cutoff in Brazil: July 13, 2026, 1:00 PM BRT.
- Pre-period baseline: `a45ae2cf75221eaf7f3679ad8c20c59146f73ae6`.
- Product/documentation snapshot: `63578049d442ab5b93ffe3ab913bb9fbaa2172b1`.

At this snapshot:

- 44 commits followed the baseline;
- 136 files changed;
- 12,679 lines were added;
- 1,083 lines were removed.

## Principal additions

- backend-persisted DAJ intake;
- isolated governed DAJ analysis room;
- analysis feedback and human routing;
- one-DAJ-to-one-case linkage;
- read-only DataJud connector and readiness;
- structured party-search fail-closed behavior;
- official per-user memory isolation;
- governed Drive proxy and Drive Saver integration;
- anti-stuck Charlie response contracts;
- modular team directory across 14 MVPs;
- removal of the legacy browser-local team registry;
- expanded authentication, RLS, DAJ, public portal, and backend tests.

## Reproducible comparison

For reviewers with repository access:

https://github.com/Clovis-Mariano-Costa/jus9-tecnologia-juridica/compare/a45ae2c...6357804

## Related API repository

The Charlie Echo API contains additional post-cutoff work:

- `36797fa`: governed Drive effects through the proxy;
- `9215b38`: structured party-search fail closed;
- `9557903`: governed DAJ analysis route preserved.

The final submission must provide access to all repositories needed to inspect the demonstrated behavior.
