---
id: JUS9-BUILD-WEEK-V2-CODEX-MODEL-001
versao: 2.0.0-candidate
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-18
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

The final private evidence must include the `/feedback` Session ID from the task where most core functionality was built. A Git commit ID is not a substitute.

## OpenAI API runtime

The Charlie Echo API source calls OpenAI's Responses API and an active-search chat endpoint. Models are selected through deployment environment variables.

Verified:

- OpenAI API integration exists in source;
- the product uses API-first routing for critical professional responses;
- Codex work occurred during the Submission Period.

Not yet verified:

- GPT-5.6 as the deployed Charlie Echo runtime model;
- the model identity of the separate Charlie Delta session;
- a timestamped GPT-5.6 session record.

The API repository's example configuration still references `gpt-5.5`. The final submission must not claim GPT-5.6 runtime use unless a sanitized deployment attestation proves it. If GPT-5.6 was used only for development, research, or documentation, that narrower scope must be stated precisely.
