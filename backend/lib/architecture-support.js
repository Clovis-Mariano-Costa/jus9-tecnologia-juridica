import { sha256 } from "./academic-pipeline.js";

const REQUIRED_DICTIONARY_FIELDS = [
  "morphologicalAnalysis",
  "etymology",
  "historicalMorphologicalStructure",
  "semanticHistoricalChange",
  "historicalSummary",
  "sources",
  "author",
  "version",
  "state",
  "institutionalSignature"
];

export function createMemoryReference({ memoryId, source, version, classification, chain, updatedAt }) {
  if (![memoryId, source, version, classification, chain, updatedAt].every((value) => String(value || "").trim())) {
    return { ok: false, code: "MEMORIA_SEM_PROVENIENCIA" };
  }
  const reference = { memoryId, source, version, classification, chain, updatedAt };
  return { ok: true, reference: { ...reference, referenceHash: sha256(reference) } };
}

export function validateCanonicalDictionaryEntry(entry = {}) {
  const missing = REQUIRED_DICTIONARY_FIELDS.filter((field) => {
    const value = entry[field];
    return Array.isArray(value) ? value.length === 0 : !String(value || "").trim();
  });
  return missing.length === 0
    ? { ok: true, state: "CANONICO" }
    : { ok: false, code: "LACUNA_DICTIONARIO_CANONICO", missing, state: "HIPOTESE_NAO_CANONICA" };
}

export function createElephantRecord({ recordId, origin, context, permission, currentity, divergences = [], resumePoint, classification }) {
  if (![recordId, origin, context, permission, currentity, resumePoint, classification].every((value) => String(value || "").trim())) {
    return { ok: false, code: "ELEFANTE_COLORIDO_INCOMPLETO" };
  }
  const record = { recordId, origin, context, permission, currentity, divergences: [...divergences], resumePoint, classification };
  return { ok: true, record: { ...record, integrityHash: sha256(record) } };
}

export function classifyRisk({ legal = false, sensitiveData = false, publication = false, normativeChange = false, externalEffect = false }) {
  const highImpact = legal || sensitiveData || publication || normativeChange || externalEffect;
  const critical = normativeChange || externalEffect;
  return {
    level: critical ? "CRITICAL" : highImpact ? "HIGH" : "LOW",
    humanReviewRequired: highImpact,
    blockedByDefault: critical,
    reasons: Object.entries({ legal, sensitiveData, publication, normativeChange, externalEffect })
      .filter(([, active]) => active)
      .map(([reason]) => reason)
  };
}

export function createProvenanceRubric(fields = {}) {
  const dimensions = ["provenance", "canonicity", "security", "clarity", "competence", "continuity", "version"];
  const missing = dimensions.filter((dimension) => !String(fields[dimension] || "").trim());
  const completeness = Math.round(((dimensions.length - missing.length) / dimensions.length) * 100);
  return {
    completeness,
    missing,
    status: missing.length === 0 ? "COMPLETE" : "INCOMPLETE",
    humanReviewRequired: true
  };
}

export function createSyntheticScenarioMatrix(count = 24) {
  if (!Number.isInteger(count) || count < 1) throw new Error("quantidade de cenarios invalida");
  return Array.from({ length: count }, (_, index) => ({
    scenarioId: `SYN-${String(index + 1).padStart(3, "0")}`,
    status: "PLANNED",
    evidence: null,
    executed: false,
    expected: index % 3 === 0 ? "BLOCK_OR_ESCALATE" : "ALLOW_WITH_AUDIT"
  }));
}

