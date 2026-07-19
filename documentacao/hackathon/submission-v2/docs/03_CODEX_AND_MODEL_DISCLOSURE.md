---
id: JUS9-BUILD-WEEK-V2-CODEX-MODEL-001
versao: 2.0.1-candidate
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-19
status: candidato-nao-final
classificacao: PUBLICO-SANITIZADO
hash: nao-aplicavel-pacote-candidato
---

# Codex and Model Disclosure

## Verified Codex contribution

Codex contributed to the Build Week extension by:

- mapping the pre-existing repositories;
- converting legal and governance requirements into contracts;
- implementing frontend, Worker, backend, and integration changes;
- diagnosing frozen and misrouted responses;
- creating fail-closed behavior for unavailable official sources;
- writing and running tests;
- recording releases and rollback paths;
- auditing public assets, secrets, and evidence; and
- preparing this distinction between pre-existing and new work.

The task identification for the principal Codex work was received and retained privately on July 19. It must be supplied only through the applicable private submission field; the public package uses SHA-256 fingerprints instead of the full identifier.

Sanitized local task metadata verifies `gpt-5.6-sol` from July 13, 2026 at 6:37:59 PM BRT. The first active turn with that model was recorded at 6:40:30 PM BRT and the first code edit at 6:53:47 PM BRT.

## OpenAI API runtime

The Charlie Echo API source calls OpenAI's Responses API and an active-search chat endpoint. Models are selected through deployment environment variables.

Verified:

- OpenAI API integration exists in source;
- the product uses API-first routing for critical professional responses;
- Codex work occurred during the Submission Period; and
- `gpt-5.6-sol` is verified for the principal Codex development task.

Not yet verified:

- GPT-5.6 as the deployed Charlie Echo runtime model;
- the model identity of any separate Charlie Delta session without its own evidence.

The API repository's example configuration still references `gpt-5.5`. The final submission must not claim GPT-5.6 runtime use unless a sanitized deployment attestation proves it. The verified `gpt-5.6-sol` evidence is deliberately limited to development.
