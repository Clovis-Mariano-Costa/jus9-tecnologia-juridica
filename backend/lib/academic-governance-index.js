import { sha256, validateCybersecurityGate } from "./academic-pipeline.js";

export const ACADEMIC_ROLES = Object.freeze([
  "REITORIA",
  "DIRECAO_ACADEMICA",
  "COORDENACAO",
  "SECRETARIA",
  "ORIENTADOR",
  "AUTOR_FUNCIONAL",
  "AVALIADOR_INTERNO",
  "AVALIADOR_EXTERNO",
  "HOMOLOGADOR",
  "BIBLIOTECARIO_IA",
  "EDITOR_IA",
  "REGISTRADOR_PROVENIENCIA",
  "ZELADORIA_DOCUMENTAL",
  "GUARDIAO_CIBERSEGURANCA",
  "CHARLIE_ECHO_ALUNA",
  "CODEX_TECNICO"
]);

export const RESEARCH_STAGES = Object.freeze([
  "INTERNAL_SOURCE_REVIEW",
  "RESEARCH_QUESTION",
  "OFFICIAL_PRIMARY_SOURCES",
  "ACADEMIC_DATABASES",
  "OPEN_WEB_DISCOVERY",
  "SOURCE_VERIFICATION",
  "DIVERGENCE_LOG",
  "TEACHING_UPDATE"
]);

function fail(code, details = {}) {
  return { ok: false, code, reason: code, ...details };
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function createAcademicIndexRecord({
  artifactId,
  title,
  source,
  mimeType,
  version,
  state,
  classification,
  author,
  hash,
  reviewDate,
  dependencies = []
}) {
  if (![artifactId, title, source, mimeType, version, state, classification, author, reviewDate].every(hasText)) {
    throw new Error("indice academico exige metadados obrigatorios");
  }
  return {
    artifactId,
    title,
    mimeType,
    source,
    version,
    state,
    classification,
    author,
    hash: hash || null,
    reviewDate,
    dependencies: [...dependencies],
    genealogy: { supersedes: null, supersededBy: null },
    teachingMaterial: null,
    library: { status: "PENDENTE", publicationEvidence: null },
    researchTrace: [],
    indexedAt: new Date().toISOString(),
    indexHash: sha256({ artifactId, title, source, mimeType, version, state, classification, author, hash: hash || null, reviewDate, dependencies })
  };
}

export function createTeachingMaterial({
  artifactId,
  objective,
  concept,
  limit,
  error,
  counterexample,
  test,
  expectedAnswer,
  risk,
  humanReviewRequired = true,
  sourceReference,
  classification = "INTERNAL_SANITIZED_DERIVATIVE"
}) {
  const required = [artifactId, objective, concept, limit, test, expectedAnswer, risk, sourceReference];
  if (!required.every(hasText)) return fail("TEACHING_MATERIAL_INCOMPLETO");
  return {
    ok: true,
    material: {
      artifactId,
      objective,
      sourceReference,
      classification,
      concept,
      limit,
      error: error || null,
      counterexample: counterexample || null,
      test,
      expectedAnswer,
      risk,
      humanReviewRequired: humanReviewRequired !== false,
      contentPolicy: "DERIVADO_SANITIZADO_SEM_DUPLICAR_FONTE_SENSIVEL"
    }
  };
}

export function attachTeachingMaterial(record, teachingMaterial) {
  if (!teachingMaterial?.ok || teachingMaterial.material.artifactId !== record.artifactId) {
    return fail("TEACHING_MATERIAL_NAO_CORRESPONDE_A_ARTEFATO");
  }
  return { ok: true, record: { ...record, teachingMaterial: teachingMaterial.material } };
}

export function evaluateLibraryPublicationGate({
  record,
  actorRole,
  evaluatedHash,
  committeeEvidence,
  homologationEvidence,
  sanitizationEvidence,
  registryCard,
  accessClassification,
  cybersecurity
}) {
  if (!record || record.state !== "M21_PUBLICACAO_BIBLIOTECA_AUTORIZADA") {
    return fail("PUBLICACAO_BLOQUEADA_ESTADO_INVALIDO");
  }
  if (!["BIBLIOTECARIO_IA", "EDITOR_IA"].includes(actorRole)) {
    return fail("PUBLICACAO_BLOQUEADA_PAPEL_INVALIDO");
  }
  const missing = [];
  if (!hasText(committeeEvidence)) missing.push("BANCA_IDENTIFICADA");
  if (!hasText(record.hash) || record.hash !== evaluatedHash) missing.push("HASH_DIVERGENTE_OU_AUSENTE");
  if (!hasText(homologationEvidence)) missing.push("HOMOLOGACAO_AUSENTE");
  if (!hasText(sanitizationEvidence)) missing.push("SANITIZACAO_AUSENTE");
  if (!hasText(registryCard)) missing.push("FICHA_REGISTRAL_AUSENTE");
  if (!hasText(accessClassification)) missing.push("CLASSIFICACAO_DE_ACESSO_AUSENTE");
  const gate = validateCybersecurityGate(cybersecurity);
  if (!gate.ok) missing.push(...gate.blockedBy);
  return missing.length > 0
    ? fail("PUBLICACAO_BLOQUEADA_PENDENTE_EVIDENCIA", { missing })
    : {
      ok: true,
      publication: {
        status: "PUBLICADO_COM_EVIDENCIA",
        actorRole,
        committeeEvidence,
        evaluatedHash,
        homologationEvidence,
        sanitizationEvidence,
        registryCard,
        accessClassification
      }
    };
}

export function appendResearchTrace(record, { stage, question, source, classification, readAt, conclusion }) {
  if (!RESEARCH_STAGES.includes(stage)) return fail("ETAPA_DE_PESQUISA_INVALIDA");
  if (![question, source, classification, readAt, conclusion].every(hasText)) return fail("TRILHA_DE_PESQUISA_INCOMPLETA");
  const entry = { stage, question, source, classification, readAt, conclusion };
  return { ok: true, record: { ...record, researchTrace: [...record.researchTrace, entry] }, entry };
}

export function findLogicalDuplicates(records) {
  const groups = new Map();
  for (const record of records) {
    const key = `${String(record.title).trim().toLowerCase()}|${record.hash || record.source}`;
    const group = groups.get(key) || [];
    group.push(record.artifactId);
    groups.set(key, group);
  }
  return [...groups.values()].filter((group) => group.length > 1);
}

export function buildHygieneReport(records) {
  const orphaned = records.filter((record) => !hasText(record.source)).map((record) => record.artifactId);
  const missingMetadata = records.filter((record) => !hasText(record.version) || !hasText(record.classification)).map((record) => record.artifactId);
  const missingGenealogy = records.filter((record) => !record.genealogy || !Object.hasOwn(record.genealogy, "supersedes")).map((record) => record.artifactId);
  const duplicateGroups = findLogicalDuplicates(records);
  return {
    orphaned,
    missingMetadata,
    missingGenealogy,
    duplicateGroups,
    quarantineCount: records.filter((record) => record.state === "QUARANTENA_VERIFICADA").length,
    unresolved: orphaned.length + missingMetadata.length + missingGenealogy.length + duplicateGroups.length
  };
}

