import assert from "node:assert/strict";
import test from "node:test";
import {
  ACADEMIC_STATES,
  appendResult,
  appendRollbackEvent,
  applyTransition,
  createAcademicRecord,
  createGenealogyRecord,
  sha256,
  validateCybersecurityGate,
  validateTransition
} from "../backend/lib/academic-pipeline.js";

const baseTime = "2026-08-11T12:00:00.000Z";
const secureGate = {
  criticalVulnerabilityOpen: false,
  highVulnerabilityUnmitigated: false,
  tenantIsolationTested: true,
  authenticationAuthorizationComplete: true,
  secretInLogsOrPublicArtifact: false,
  rollbackDemonstrated: true,
  incidentResponseDefined: true,
  dependenciesKnown: true
};

function makeRecord() {
  return createAcademicRecord({
    artifactId: "PACOTE12-001",
    title: "ASM GHR Gate Validator",
    sourceId: "drive:pedido-pacote12",
    actor: "CODEX_TECNICO",
    timestamp: baseTime,
    evidence: ["pedido-drive-verificado"]
  });
}

test("ASM cria estado inicial e GHR com hash deterministico", () => {
  const record = makeRecord();
  assert.equal(record.state, ACADEMIC_STATES[0]);
  assert.equal(record.genealogy.length, 1);
  assert.match(record.genealogy[0].payloadHash, /^[a-f0-9]{64}$/);
  assert.equal(sha256({ b: 2, a: 1 }), sha256({ a: 1, b: 2 }));
});

test("ASM permite transicao sequencial somente com evidencia e gate seguro", () => {
  const result = applyTransition({
    record: makeRecord(),
    to: ACADEMIC_STATES[1],
    actor: "CODEX_TECNICO",
    role: "REGISTRADOR_PROVENIENCIA",
    timestamp: "2026-08-11T12:01:00.000Z",
    evidence: ["teste-unitario"],
    reason: "classificacao inicial",
    cybersecurity: secureGate
  });
  assert.equal(result.ok, true);
  assert.equal(result.record.state, ACADEMIC_STATES[1]);
  assert.equal(result.record.history.length, 2);
  assert.equal(result.record.genealogy.length, 2);
});

test("ASM falha fechado para salto de estado e gate incompleto", () => {
  const record = makeRecord();
  const illegal = validateTransition({
    record,
    to: ACADEMIC_STATES[10],
    actor: "CODEX_TECNICO",
    role: "CODEX_TECNICO",
    timestamp: "2026-08-11T12:01:00.000Z",
    evidence: ["evidencia"],
    reason: "nao deve saltar",
    cybersecurity: secureGate
  });
  assert.equal(illegal.ok, false);
  assert.equal(illegal.code, "TRANSICAO_NAO_PERMITIDA");

  const blocked = validateTransition({
    record,
    to: ACADEMIC_STATES[1],
    actor: "CODEX_TECNICO",
    role: "CODEX_TECNICO",
    timestamp: "2026-08-11T12:01:00.000Z",
    evidence: ["evidencia"],
    reason: "gate deve bloquear",
    cybersecurity: { ...secureGate, dependenciesKnown: false }
  });
  assert.equal(blocked.ok, false);
  assert.equal(blocked.code, "GATE_CYBERSECURITY_BLOQUEADO");
  assert.deepEqual(blocked.blockedBy, ["DEPENDENCIAS_DESCONHECIDAS"]);
});

test("GHR rejeita timestamp sem milissegundos e preserva parent", () => {
  assert.throws(() => createGenealogyRecord({
    artifactId: "A",
    version: "1.0.0",
    payload: { value: 1 },
    actor: "CODEX_TECNICO",
    timestamp: "2026-08-11T12:00:00Z"
  }));
  const record = makeRecord();
  const next = applyTransition({
    record,
    to: ACADEMIC_STATES[1],
    actor: "CODEX_TECNICO",
    role: "REGISTRADOR_PROVENIENCIA",
    timestamp: "2026-08-11T12:01:00.000Z",
    evidence: ["evidencia"],
    reason: "transicao",
    cybersecurity: secureGate
  }).record;
  assert.equal(next.genealogy[1].parentArtifactId, record.artifactId);
  assert.equal(next.genealogy[1].parentHash, record.recordHash);
});

test("resultado negativo e rollback entram no rastro sem apagar historico", () => {
  const record = makeRecord();
  const withNegative = appendResult({
    record,
    result: { outcome: "FALHA_VALIDACAO", negative: true, details: "caso adversarial" },
    actor: "CODEX_TECNICO",
    timestamp: "2026-08-11T12:02:00.000Z"
  });
  assert.equal(withNegative.ok, true);
  assert.equal(withNegative.record.results[0].negative, true);

  const rollback = appendRollbackEvent({
    record: withNegative.record,
    targetEventIndex: 0,
    actor: "CODEX_TECNICO",
    timestamp: "2026-08-11T12:03:00.000Z",
    reason: "registro de rollback sem reescrever o evento"
  });
  assert.equal(rollback.ok, true);
  assert.equal(rollback.record.history.length, 1);
  assert.equal(rollback.record.rollbackEvents[0].preservesHistory, true);
});

test("gate de ciberseguranca e fail-closed para campos ausentes", () => {
  const gate = validateCybersecurityGate({});
  assert.equal(gate.ok, false);
  assert.ok(gate.blockedBy.includes("ISOLAMENTO_MULTI_TENANT_NAO_TESTADO"));
  assert.ok(gate.blockedBy.includes("DEPENDENCIAS_DESCONHECIDAS"));
});

