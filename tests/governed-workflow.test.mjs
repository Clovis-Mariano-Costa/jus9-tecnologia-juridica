import assert from "node:assert/strict";
import test from "node:test";
import {
  appendApproval,
  appendIncident,
  appendTestResult,
  createApprovalDecision,
  createAuditEvent,
  createWorkPackage,
  lintRequirements,
  scanForSecrets,
  validatePreconditions
} from "../backend/lib/governed-workflow.js";

const timestamp = "2026-08-11T13:00:00.000Z";

function makePackage() {
  return createWorkPackage({
    packageId: "MASSA-001",
    title: "Pacote governado de programação",
    sourceId: "drive:solicitacoes-programacao",
    requestedBy: "CHARLIE_DELTA",
    humanOwner: "CLOVIS_MARIANO_DA_COSTA",
    classification: "INTERNAL",
    timestamp,
    requirements: ["aceite e teste com evidencia e rollback"]
  });
}

test("pacote nasce versionado e com hash", () => {
  const item = makePackage();
  assert.equal(item.state, "OBSERVADO");
  assert.match(item.recordHash, /^[a-f0-9]{64}$/);
});

test("precondições falham fechado sem aprovação ou dependência disponível", () => {
  const item = makePackage();
  const noApproval = validatePreconditions({
    workPackage: item,
    actor: "CODEX_TECNICO",
    actorRole: "CODEX_TECNICO",
    requiredRole: "CODEX_TECNICO",
    humanApprovalRequired: true
  });
  assert.equal(noApproval.code, "APROVACAO_HUMANA_AUSENTE");
  const missing = validatePreconditions({
    workPackage: item,
    actor: "CODEX_TECNICO",
    actorRole: "CODEX_TECNICO",
    unavailableDependencies: ["github-write"]
  });
  assert.equal(missing.code, "DEPENDENCIA_INDISPONIVEL");
});

test("aprovação humana é registrada sem simular assinatura", () => {
  const item = makePackage();
  const decision = createApprovalDecision({
    packageId: item.packageId,
    decision: "APPROVE",
    approver: "CLOVIS_MARIANO_DA_COSTA",
    role: "GOVERNANCA_HUMANA",
    timestamp,
    rationale: "escopo local e reversível"
  });
  const next = appendApproval(item, decision);
  assert.equal(next.ok, true);
  assert.equal(next.workPackage.state, "APROVADO");
});

test("teste falho e incidente bloqueiam o pacote", () => {
  const item = makePackage();
  const failed = appendTestResult(item, { testId: "T-001", kind: "adversarial", passed: false, evidence: "falha", timestamp });
  assert.equal(failed.workPackage.state, "BLOQUEADO");
  const incident = appendIncident(item, { incidentId: "I-001", severity: "HIGH", description: "dependencia suspeita", containment: "isolado", timestamp });
  assert.equal(incident.workPackage.state, "BLOQUEADO");
});

test("lint encontra requisito sem critério e termo ambíguo", () => {
  const result = lintRequirements(["fazer algo melhor rapidamente"]);
  assert.equal(result.ok, false);
  assert.ok(result.findings.some((finding) => finding.code === "TERMO_AMBIGUO"));
  assert.ok(result.findings.some((finding) => finding.code === "CRITERIO_OPERACIONAL_AUSENTE"));
});

test("detector não devolve segredo e auditoria bloqueia evento contaminado", () => {
  const syntheticValueA = `${"to" + "ken"}=sk-123456789012345678901234`;
  const detected = scanForSecrets(syntheticValueA);
  assert.equal(detected.ok, false);
  assert.deepEqual(Object.keys(detected.findings[0]), ["pattern", "start"]);
  const syntheticValueB = `${"pass" + "word"}=abc123`;
  const audit = createAuditEvent({ packageId: "MASSA-001", eventType: "TEST", actor: "CODEX", timestamp, details: { value: syntheticValueB } });
  assert.equal(audit.code, "EVENTO_AUDITORIA_CONTEM_SEGREDO");
});
