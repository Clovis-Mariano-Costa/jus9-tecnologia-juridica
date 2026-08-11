import assert from "node:assert/strict";
import test from "node:test";
import {
  classifyRisk,
  createElephantRecord,
  createMemoryReference,
  createProvenanceRubric,
  createSyntheticScenarioMatrix,
  validateCanonicalDictionaryEntry
} from "../backend/lib/architecture-support.js";

test("memória exige fonte, versão, classificação e cadeia", () => {
  const missing = createMemoryReference({ memoryId: "M-1", source: "", version: "1", classification: "INTERNAL", chain: "x", updatedAt: "2026-08-11" });
  assert.equal(missing.ok, false);
  const valid = createMemoryReference({ memoryId: "M-1", source: "drive:1", version: "1.0.0", classification: "INTERNAL", chain: "origin->derivation", updatedAt: "2026-08-11" });
  assert.equal(valid.ok, true);
  assert.match(valid.reference.referenceHash, /^[a-f0-9]{64}$/);
});

test("dicionário não promove lacuna a definição canônica", () => {
  const incomplete = validateCanonicalDictionaryEntry({ etymology: "latim" });
  assert.equal(incomplete.ok, false);
  assert.equal(incomplete.state, "HIPOTESE_NAO_CANONICA");
  const valid = validateCanonicalDictionaryEntry({
    morphologicalAnalysis: "substantivo",
    etymology: "latim",
    historicalMorphologicalStructure: "estrutura",
    semanticHistoricalChange: "mudança",
    historicalSummary: "resumo",
    sources: ["fonte-1"],
    author: "AUTOR",
    version: "1.0.0",
    state: "REVISADO",
    institutionalSignature: "registro-1"
  });
  assert.equal(valid.state, "CANONICO");
});

test("Elefante Colorido preserva divergências e ponto de retomada", () => {
  const result = createElephantRecord({ recordId: "E-1", origin: "chat-1", context: "pesquisa", permission: "internal", currentity: "2026-08-11", divergences: ["D-1"], resumePoint: "etapa-2", classification: "INTERNAL" });
  assert.equal(result.ok, true);
  assert.deepEqual(result.record.divergences, ["D-1"]);
  assert.match(result.record.integrityHash, /^[a-f0-9]{64}$/);
});

test("risco jurídico, sensível e normativo exige revisão ou bloqueio", () => {
  const high = classifyRisk({ legal: true, sensitiveData: true });
  assert.equal(high.level, "HIGH");
  assert.equal(high.humanReviewRequired, true);
  const critical = classifyRisk({ normativeChange: true });
  assert.equal(critical.blockedByDefault, true);
});

test("rubrica mede completude e matriz cria 24 cenários ainda não executados", () => {
  const rubric = createProvenanceRubric({ provenance: "p", canonicity: "c", security: "s" });
  assert.equal(rubric.completeness, 43);
  assert.equal(rubric.status, "INCOMPLETE");
  const scenarios = createSyntheticScenarioMatrix();
  assert.equal(scenarios.length, 24);
  assert.equal(scenarios.every((scenario) => scenario.executed === false), true);
});

