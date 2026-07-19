import test from "node:test";
import assert from "node:assert/strict";
import {
  CHARLIE_CONTRACTS,
  CHARLIE_MVP_REGISTRY,
  buildCharlieGovernedPrompt,
  buildProfileDirectoryModules,
  classifyCharlieRisk,
  getCharlieMvpRegistrySummary,
  normalizeCharlieMvpCode,
  validateAuditEvent,
  validateChatRequest,
  validateChatResponse,
  validateDataJudSearchRequest,
  validateDocumentSaveRequest
} from "../functions/lib/charlie-core/index.js";

test("registry canonico preserva 14 MVPs e aliases", () => {
  const summary = getCharlieMvpRegistrySummary();
  assert.equal(Object.keys(CHARLIE_MVP_REGISTRY).length, 14);
  assert.equal(summary.mvps, 14);
  assert.deepEqual(summary.active, ["DAJ"]);
  assert.equal(normalizeCharlieMvpCode("inv"), "DIP");
  assert.equal(normalizeCharlieMvpCode("ORG"), "DOI");
  assert.equal(buildProfileDirectoryModules().DAJ.includes("advogado_lider"), true);
});

test("classificador eleva efeitos oficiais e segredos para critical", () => {
  const risk = classifyCharlieRisk({ mvpCode: "DAJ", message: "assinar e protocolar ato oficial" });
  assert.equal(risk.riskLevel, "critical");
  assert.equal(risk.blockedAutonomousEffects, true);
});

test("prompt governado preserva identidade e limites do DIC", () => {
  const prompt = buildCharlieGovernedPrompt({ mvpCode: "DIC", mode: "social", message: "Preciso de orientacao geral" });
  assert.equal(prompt.mvpCode, "DIC");
  assert.equal(prompt.instructions.some((item) => item.includes("social_language_preserved")), true);
  assert.equal(prompt.instructions.some((item) => item.includes("Nunca invente")), true);
});

test("ChatRequest aceita somente MVP e campos controlados", () => {
  assert.equal(validateChatRequest({ message: "Explique uma regra", mvpCode: "DAJ", riskLevel: "high", classification: "INTERNO" }).ok, true);
  assert.deepEqual(validateChatRequest({ message: "x", mvpCode: "XYZ", riskLevel: "extremo" }).errors, ["mvpCode_invalid", "riskLevel_invalid"]);
});

test("ChatResponse exige auditoria, classificacao e listas controladas", () => {
  const valid = validateChatResponse({
    auditId: "audit-ficticio-1",
    contractVersion: "1.1.0",
    source: "upstream",
    answer: "Resposta ficticia revisavel.",
    classification: "PUBLICO_DEMONSTRATIVO",
    riskLevel: "normal",
    citations: [],
    downloadOptions: [],
    nextActions: ["Revisar humanamente"]
  });
  assert.equal(valid.ok, true);
  assert.equal(validateChatResponse({ answer: "sem auditoria" }).ok, false);
  const invalidSource = validateChatResponse({
    auditId: "audit-ficticio-4",
    contractVersion: "1.1.0",
    source: "origem_livre",
    answer: "Resposta ficticia.",
    classification: "INTERNO",
    riskLevel: "normal",
    citations: [],
    downloadOptions: [],
    nextActions: []
  });
  assert.equal(invalidSource.errors.includes("source_invalid"), true);
});

test("DocumentSaveRequest bloqueia link publico para sigiloso", () => {
  const result = validateDocumentSaveRequest({
    action: "save",
    auditId: "audit-ficticio-2",
    classification: "JURIDICO_SIGILOSO",
    publicLinkRequested: true
  });
  assert.equal(result.ok, false);
  assert.equal(result.errors.includes("public_link_forbidden_for_classification"), true);
});

test("DataJudSearchRequest permanece read-only e por numero CNJ", () => {
  assert.equal(validateDataJudSearchRequest({ searchType: "numeroProcesso", numeroProcesso: "66666666620998240000", readOnly: true }).ok, true);
  assert.equal(validateDataJudSearchRequest({ searchType: "cpf", numeroProcesso: "123", readOnly: false }).ok, false);
});

test("AuditEvent rejeita campos com aparencia de segredo", () => {
  const result = validateAuditEvent({
    auditId: "audit-ficticio-3",
    eventType: "risk.classified",
    occurredAt: "2026-07-19T19:30:00.000Z",
    actor: "usuario-ficticio",
    result: "blocked",
    classification: "INTERNO",
    details: { token: "nao-registrar" }
  });
  assert.equal(result.ok, false);
  assert.equal(result.errors.includes("secret_like_field_forbidden"), true);
});

test("catalogo de contratos expoe cinco DTOs e campos estaveis", () => {
  assert.equal(CHARLIE_CONTRACTS.types.length, 5);
  assert.equal(CHARLIE_CONTRACTS.version, "1.1.0");
  assert.deepEqual(CHARLIE_CONTRACTS.responseSources, ["upstream", "correcao_upstream", "fallback_governado"]);
  for (const field of ["auditId", "contractVersion", "source", "classification", "riskLevel", "citations", "downloadOptions", "nextActions"]) {
    assert.equal(CHARLIE_CONTRACTS.controlledFields.includes(field), true);
  }
});
