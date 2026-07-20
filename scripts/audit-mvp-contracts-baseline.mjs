import assert from "node:assert/strict";
import fs from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), "utf8");
const matrix = JSON.parse(read("governanca/MATRIZ_CONTRATOS_E_PADROES_MVPS_v1.0.0.json"));
const portfolio = JSON.parse(read("governanca/PORTFOLIO_CANONICO_MVPS_v2.0.0.json"));
const contractsSource = read("functions/lib/charlie-core/contracts.js");
const pipelineSource = read("functions/lib/charlie-core/response-pipeline.js");

const contractTypes = ["ChatRequest","ChatResponse","DocumentSaveRequest","DataJudSearchRequest","AuditEvent"];
const requirementIds = ["MVP-IAM","MVP-SEC","MVP-LGPD","MVP-ETH","MVP-AI","MVP-AUD","MVP-DAT","MVP-UX","MVP-TST","MVP-OPS"];

assert.equal(matrix.coreContract.version, "1.2.0");
assert.deepEqual(matrix.coreContract.types, contractTypes);
assert.deepEqual(matrix.coreContract.responseSources, ["upstream","correcao_upstream","fallback_governado"]);
assert.deepEqual(matrix.coverage.appliesTo, portfolio.mvps.map((mvp) => mvp.code));
assert.deepEqual(matrix.coverage.criticalMvps, ["DMG","DMP","DAP"]);
assert.deepEqual(matrix.requirements.map((item) => item.id), requirementIds);

for (const type of contractTypes) assert.ok(contractsSource.includes(type), `contrato ausente no codigo: ${type}`);
for (const source of matrix.coreContract.responseSources) assert.ok(contractsSource.includes(source), `origem ausente: ${source}`);
for (const field of matrix.coreContract.controlledFields) {
  assert.ok(contractsSource.includes(field) || pipelineSource.includes(field), `campo controlado ausente: ${field}`);
}
for (const requirement of matrix.requirements) {
  assert.ok(requirement.state && requirement.technicalEvidence.length > 0, `${requirement.id}: evidencia ausente`);
  assert.ok(requirement.residualRisk && requirement.humanGate, `${requirement.id}: risco/gate ausente`);
}
assert.equal(matrix.requirements.find((item) => item.id === "MVP-UX").state, "PARCIAL_AUDITORIA_WCAG_PENDENTE");
assert.equal(matrix.requirements.find((item) => item.id === "MVP-IAM").state, "PARCIAL_CONTRATO_EXTERNO");

console.log("MVP_CONTRACTS_BASELINE_OK core=1.2.0 dtos=5 mvps=14 requisitos=10 criticos=3");

