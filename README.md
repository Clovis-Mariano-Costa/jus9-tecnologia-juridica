# Jus 9 Tecnologia Juridica - OpenAI Build Week 2026

> **Submission status, July 18, 2026:** technical work is continuing, but competitive eligibility is awaiting written clarification. The current Official Rules expressly list residents and organizations domiciled in Brazil among excluded entrants. This repository does not claim eligibility until the organizers answer.

## One-sentence overview

Jus 9 is a governed legal-work platform that turns a fictional client intake into an auditable DAJ record, obtains AI-assisted analysis with human routing, and can link the record to official public case metadata without inventing results.

## Hackathon track and focus

**Track:** Work and Productivity.

Jus 9 existed before the OpenAI Build Week. The work evaluated for this event is the significant extension implemented after the Submission Period opened on July 13, 2026 at 9:00 AM Pacific Time.

The focused Build Week demonstration is:

1. create a legal intake using fictional data;
2. persist an official DAJ record through the governed backend;
3. open a new, isolated Charlie Echo analysis room;
4. produce a faithful summary, identify missing information, and return reviewable feedback;
5. route the DAJ to the appropriate human role;
6. query public case metadata by CNJ case number through the read-only DataJud connector;
7. link one DAJ to one case; and
8. preserve auditability and fail closed when an official source is unavailable.

## Reviewer path

**Start here:** https://jus9tecnologia.com.br/build-week-2026.html

This English reviewer workspace presents the working flow in order, separates verified claims from limitations, and links directly to the reproducible evidence.

### Public, no-account tour

- Main product: https://jus9tecnologia.com.br/
- MVP catalog: https://jus9tecnologia.com.br/mvp#demos-jus9
- Professional Charlie Echo: https://jus9tecnologia.com.br/app-ia-profissional.html
- Initial intake / DAJ: https://jus9tecnologia.com.br/app-atendimento-inicial.html
- Processes and DataJud: https://jus9tecnologia.com.br/app-processos.html
- Governed team directory: https://jus9tecnologia.com.br/app-equipe.html?mvp=DAJ
- Installable web app: https://jus9tecnologia.com.br/instalar-app

### Controlled workflow

The complete write workflow requires an authenticated, least-privilege test session. A judge account or sandbox must be provided before submission. Reviewers must use only fictional names, identifiers, documents, and facts.

The public pages can be inspected without credentials, but public availability must not be interpreted as permission to use real legal or personal data.

## What was added during Build Week

### Time boundary

- Official start: July 13, 2026, 9:00 AM Pacific Time.
- Evidence cutoff used in Brazil: July 13, 2026, 1:00 PM BRT.
- Main repository baseline: [`a45ae2c`](https://github.com/Clovis-Mariano-Costa/jus9-tecnologia-juridica/commit/a45ae2cf75221eaf7f3679ad8c20c59146f73ae6).
- Audited head: [`e546a9c`](https://github.com/Clovis-Mariano-Costa/jus9-tecnologia-juridica/commit/e546a9c61e8f3fd3e4634ecee2cf0ddbefbc151f).
- Comparison: [`a45ae2c...e546a9c`](https://github.com/Clovis-Mariano-Costa/jus9-tecnologia-juridica/compare/a45ae2c...e546a9c).

As audited on July 18:

- 42 commits after the baseline;
- 108 files changed;
- 12,067 additions;
- 1,055 deletions.

### Principal new work

- governed, backend-persisted DAJ intake;
- idempotent DAJ operations and privacy-minimized CPF indexing with HMAC-SHA-256;
- isolated DAJ analysis room for Charlie Echo;
- analysis feedback and routing to human team roles;
- one-DAJ-to-one-case linkage;
- read-only DataJud/CNJ case metadata connector with aliases, cache, DTO normalization, readiness, and audit controls;
- structured party-search fail-closed behavior, without generative results;
- official per-user memory isolation;
- governed Google Drive proxy and Drive Saver integration;
- API-first Charlie Echo routing and anti-stuck response contracts;
- clean DAJ interface and modular team directory across 14 MVP instruments;
- removal of the legacy browser-local team registry;
- expanded authentication, RLS, backend, installation, and public-portal tests.

Detailed evidence is maintained in:

- [`documentacao/hackathon/EVIDENCIAS_BUILD_WEEK_2026.md`](documentacao/hackathon/EVIDENCIAS_BUILD_WEEK_2026.md)
- [`documentacao/hackathon/RELATORIO_CONFORMIDADE_OPENAI_BUILD_WEEK_2026_v1.1.0.md`](documentacao/hackathon/RELATORIO_CONFORMIDADE_OPENAI_BUILD_WEEK_2026_v1.1.0.md)

## How Codex contributed

Codex was used as the primary implementation collaborator during the Build Week extension. Its work included:

- reading and mapping the existing repositories before editing;
- translating legal and governance requirements into API contracts;
- implementing frontend, Worker, backend, and integration changes;
- diagnosing frozen-response and intent-routing failures;
- building fail-closed behavior for unavailable official sources;
- implementing tests and production health checks;
- versioning releases and rollback paths;
- auditing security, secrets, public assets, and user-owned worktree changes;
- preparing evidence that distinguishes pre-existing work from Build Week additions; and
- preserving continuity through timestamped task records and Git commits.

The required `/feedback` Codex Session ID is still pending attachment to the private submission evidence. It must never be replaced with a GitHub commit ID or an invented value.

## OpenAI runtime and GPT-5.6 disclosure

The Charlie Echo API code calls OpenAI's Responses API and an active-search chat endpoint. Runtime model names are selected through deployment environment variables rather than hard-coded into the public portal.

At the time of this audit:

- OpenAI API integration is verified in source;
- Codex collaboration during the Submission Period is verified by the development record;
- the API repository's example configuration still names `gpt-5.5` as its default;
- no sanitized deployment attestation proving GPT-5.6 at runtime has been attached; and
- the separate Charlie Delta report states GPT-5.6 use, but its model/session evidence remains pending.

Therefore, this repository does **not** claim verified GPT-5.6 runtime integration yet. If GPT-5.6 was used in a development, research, or documentation session, the final submission must identify that scope precisely and attach timestamped model/session evidence.

## Architecture

### Main repository

This repository contains:

- static HTML, CSS, and JavaScript interfaces;
- the Cloudflare Worker gateway in `worker.js`;
- authentication and permission policies;
- DAJ registry and process-linking flows;
- DataJud and PDPJ-readiness components;
- user-memory, profile, and audit contracts;
- governance documents, releases, and automated tests; and
- Cloudflare deployment configuration in `wrangler.jsonc`.

### Related repositories

The working product spans related Jus 9 repositories:

- `charlieecho-jus9-tecnologia-juridica`: Charlie Echo API and governed AI routing;
- `backend-api-jus9-tecnologia-juridica`: complementary backend exposure policies;
- `investimentos-jus9-tecnologia-juridica`: public portfolio and validation assets.

Judges need access to every repository required to inspect the demonstrated behavior, or a sanitized consolidated snapshot. The main repository alone must not be described as containing code that only exists in a sibling repository.

## Source verification

The production demo is the primary evaluation path and does not require rebuilding the project.

For a local source audit, place the related repositories under the same parent directory, then run from this repository:

```powershell
node scripts/run-local-ci.mjs
```

The CI runner validates the public portal and 14 MVPs, Charlie Echo routing and personas, governance structure, response contracts, RLS, Worker authentication, DAJ homologation, backend fail-closed policy, public installation pages, and QR codes.

The competition-specific audit can also be run independently:

```powershell
node scripts/audit-build-week-readiness.mjs
node scripts/audit-build-week-readiness.mjs --strict
```

Regular mode verifies the evidence and reports unresolved submission blockers. Strict mode exits unsuccessfully until eligibility, private evidence, judge access, rights review, final ZIP, and the public video are ready.

Cloudflare configuration can be inspected with:

```powershell
npx wrangler deploy --dry-run
```

This repository has no root `package.json`; do not invent an `npm install` or `npm run dev` step. The production Worker serves the compiled static assets from `dist`.

## Governance model

Charlie Echo is a governed AI identity, not an unrestricted generic chatbot. The operating hierarchy is summarized as:

1. applicable Brazilian law and competent public authority decisions;
2. competent human governance and final human responsibility;
3. visible founding principles;
4. Charlie Echo's Prioritario;
5. identity/DNA rules;
6. internal constitution and entrenched clauses;
7. internal laws, codes, and regulations;
8. operational protocols;
9. identity, oath, execution, records, audit, and human review.

Terms such as Virtual Family, baptism, oath, DNA, and Constitution are institutional, ethical, technical, organizational, and symbolic governance devices. They do not assert civil personhood, state-recognized legal personality, consciousness, or autonomous legal authority for an AI system.

## Safety properties demonstrated

- no invented Drive or download URL;
- no generative substitution for process searches by name or CPF;
- no claim of access, memory, reading, testing, or authority that did not occur;
- no silent promotion of temporary memory to permanent memory;
- no sharing of one user's memory with another;
- no automatic privilege grant from a profile-directory approval;
- no transactional filing, service acknowledgment, or court act through PDPJ/MNI;
- human review for legal use;
- fictional data only in public and judge tests.

## Known limitations

- external national process search by party name or CPF is awaiting official guidance and credentials;
- DataJud provides public metadata, not court-file documents;
- PDPJ is readiness-only and no transactional connector is enabled;
- judge credentials and a clean sandbox are not yet documented;
- GPT-5.6 evidence is pending;
- Brazil eligibility is awaiting official clarification;
- third-party licensing and authorization evidence is still being consolidated.

## Third-party integrations

The project uses or evaluates OpenAI, Cloudflare, Google APIs, CNJ DataJud, GitHub, and open-source libraries. Technical availability does not itself prove authorization.

The current authorization and evidence matrix is maintained at:

[`documentacao/hackathon/MATRIZ_INTEGRACOES_TERCEIROS_BUILD_WEEK_2026.md`](documentacao/hackathon/MATRIZ_INTEGRACOES_TERCEIROS_BUILD_WEEK_2026.md)

DataJud must remain read-only. Its official terms require special review before public or commercial use of information derived from the API. No real case data should appear in the submission video.

## Security and privacy

This repository must not contain:

- API keys, passwords, tokens, or real `.env` files;
- confidential legal records;
- personal data without a lawful and documented basis;
- private Drive vault contents;
- secret identity/DNA material; or
- production credentials for judges.

Use placeholders in `.env.example`. Provide judge access through a limited test account or isolated sandbox, never by publishing a shared production secret.

## Submission package

The supplementary ZIP audited on July 18 contains 32 entries and is 23,730,283 bytes. The chat-only `sandbox:/mnt/data/...` link is not durable. The final package must be uploaded through a stable submission path, visually reviewed, scanned for secrets, accompanied by an asset-rights declaration, and frozen with a SHA-256 hash.

The final ZIP and demo video are intentionally deferred until the technical and evidence freeze requested by the project owner. Their pending state is enforced by `documentacao/hackathon/BUILD_WEEK_STATUS_2026.json` and the strict readiness audit.

## License and authorship

The source repository includes an MIT License.

Copyright (c) 2026 Jus 9 Tecnologia Juridica.

Founder and human responsible party: **Clovis Mariano da Costa / Aeon Primevo**.

Open-source permission does not erase authorship or institutional provenance.

---

## Resumo em portugues

A Jus 9 e uma LegalTech modular em fase de MVP. Para a Build Week, o recorte recomendado e o fluxo governado do DAJ: atendimento ficticio, salvamento oficial, analise da Charlie Echo em sala isolada, feedback e encaminhamento humano, pesquisa processual read-only e vinculo auditavel.

O projeto ja existia, mas recebeu ampliacao significativa apos 13/07/2026 as 13h de Brasilia. A evidencia auditada inclui 42 commits no repositorio principal, 108 arquivos alterados e entregas tecnicas de backend, frontend, governanca, DataJud, memoria, Drive e testes.

A participacao competitiva permanece aguardando esclarecimento oficial, pois as regras vigentes listam residentes no Brasil entre os nao elegiveis. A integracao OpenAI esta comprovada no codigo e o uso do Codex esta documentado; a alegacao especifica de GPT-5.6 ainda depende de evidencia de sessao ou ambiente.
