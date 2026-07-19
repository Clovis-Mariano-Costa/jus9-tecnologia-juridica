---
id: JUS9-BUILD-WEEK-JUDGE-PATH-001
versao: 1.0.0
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-18
status: ativo-controlado
classificacao: PUBLICO-INSTITUCIONAL
hash: gerar-na-versao-final
---

# Judge path - Jus 9 DAJ

## Entry point

https://jus9tecnologia.com.br/build-week-2026.html

## Review modes

### Public inspection

No account is required to inspect the interface, reviewer path, source repository, governance boundaries, official-source disclosures, and fail-closed messages.

### Controlled write workflow

DAJ persistence, official per-user memory, governed Drive operations, and authenticated DAJ/process indexing require a least-privilege judge session. Credentials must be delivered privately and must never appear in the repository, public page, video, or Devpost text.

Use synthetic data only. Do not upload real legal records, personal data, tokens, or confidential documents.

## Eight-minute technical review

### Minute 0-2: intake and persistence

1. Open the initial-intake page.
2. Confirm that the page identifies the session state.
3. Enter the approved synthetic fixture in the isolated judge environment.
4. Save the attendance and confirm that a new DAJ identifier is returned.
5. Confirm that the UI exposes the official saved-record link instead of claiming browser-local persistence.

Expected result: the DAJ is persisted through the governed backend with a storage receipt. No full CPF is retained in the detail record.

### Minute 2-4: Charlie Echo analysis

1. Select "Send DAJ to Charlie Echo analysis."
2. Confirm that a new room opens with the DAJ identifier in context.
3. Inspect the minimized prompt and resulting analysis.

Expected result: the response summarizes only provided facts, identifies missing documents and questions, states unsupported conclusions explicitly, gives feedback, and routes the next action to a human role. It must not return a generic pleading or process-search message.

### Minute 4-6: official metadata and linkage

1. Open Processes.
2. Search only with the approved synthetic or public CNJ-number fixture for which demonstration authorization has been confirmed.
3. Inspect source, status, tribunal alias, and public metadata.
4. Link the selected DAJ when it has no existing process.

Expected result: DataJud is read-only; one DAJ maps to one case; a duplicate case or second process for the same DAJ is blocked and audited.

Do not use a real person's name or CPF. External party search is unavailable and must fail closed.

### Minute 6-8: evidence and controls

1. Open the Git comparison from baseline `a45ae2c` to the current head.
2. Run `node scripts/audit-build-week-readiness.mjs`.
3. Inspect `BUILD_WEEK_STATUS_2026.json`.
4. Run `node scripts/run-local-ci.mjs` when all related repositories are available under one parent directory.

Expected result: the regular audit reports verified work and unresolved blockers separately. It verifies the sanitized Codex Sol record without exposing the private task identifier. Strict mode exits unsuccessfully while eligibility, judge access, rights evidence, final ZIP, or video remain unresolved.

## Synthetic fixture

Use only inside an isolated judge sandbox that can be cleaned after evaluation:

- Party name: `Marina Horizonte Teste`
- CPF field: use the sandbox-provided test identifier; do not choose a real CPF
- Area: `Consumidor`
- Urgency: `Importante`
- Attention reason: `documento faltante`
- Secrecy: `Restrito`
- Case summary: `A fictional consumer reports a charge that was not recognized and has only a screenshot of the account statement. No court case, deadline, notice, or loss has been confirmed.`
- Mentioned documents: `One fictional account-statement screenshot; contract and prior support protocol are missing.`

Expected Charlie behavior:

- no invented deadline, filing, court, precedent, document, or monetary amount;
- ask for the contract, complete statement, support protocol, dates, and desired outcome;
- identify that urgency and procedural posture cannot be concluded from the current facts;
- recommend review by the appropriate DAJ human role; and
- keep identity and contact fields out of the AI prompt.

## Stop conditions

Stop the controlled demonstration and preserve the audit trail if:

- the session is not the isolated judge account;
- a real person's data or legal record appears;
- the official connector is unavailable;
- the response invents process metadata or a source;
- a write operation cannot return a persistence receipt; or
- the environment exposes a secret or production credential.

## Private handoff checklist

The project owner must deliver these items outside the public repository:

- judge login instructions;
- sandbox reset and cleanup procedure;
- private Codex task identification already retained by the owner, for entry in the required private submission field;
- third-party authorization evidence;
- asset-rights signoff; and
- any sanitized model attestation used by the final claim.

The final ZIP and video remain deferred until the technical freeze.
