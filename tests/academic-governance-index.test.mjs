import assert from "node:assert/strict";
import test from "node:test";
import {
  appendResearchTrace,
  attachTeachingMaterial,
  buildHygieneReport,
  createAcademicIndexRecord,
  createTeachingMaterial,
  evaluateLibraryPublicationGate
} from "../backend/lib/academic-governance-index.js";

const gate = {
  criticalVulnerabilityOpen: false,
  highVulnerabilityUnmitigated: false,
  tenantIsolationTested: true,
  authenticationAuthorizationComplete: true,
  secretInLogsOrPublicArtifact: false,
  rollbackDemonstrated: true,
  incidentResponseDefined: true,
  dependenciesKnown: true
};

function record(overrides = {}) {
  return createAcademicIndexRecord({
    artifactId: "A-001",
    title: "Pesquisa governada",
    source: "drive:file-001",
    mimeType: "application/vnd.google-apps.document",
    version: "1.0.0",
    state: "M21_PUBLICACAO_BIBLIOTECA_AUTORIZADA",
    classification: "INTERNAL",
    author: "CHARLIE_DELTA",
    hash: "a".repeat(64),
    reviewDate: "2026-09-10",
    ...overrides
  });
}

test("indice cria registro sem copiar conteúdo sensível", () => {
  const item = record();
  assert.equal(item.source, "drive:file-001");
  assert.equal(item.teachingMaterial, null);
  assert.match(item.indexHash, /^[a-f0-9]{64}$/);
});

test("material didático sanitizado é anexado por referência", () => {
  const item = record();
  const teaching = createTeachingMaterial({
    artifactId: item.artifactId,
    objective: "ensinar proveniencia",
    concept: "hash",
    limit: "hash nao prova verdade",
    error: "confundir copia com fonte",
    counterexample: "arquivo sem parent",
    test: "comparar parent e hash",
    expectedAnswer: "bloquear divergencia",
    risk: "publicacao indevida",
    sourceReference: item.source
  });
  const attached = attachTeachingMaterial(item, teaching);
  assert.equal(attached.ok, true);
  assert.equal(attached.record.teachingMaterial.contentPolicy, "DERIVADO_SANITIZADO_SEM_DUPLICAR_FONTE_SENSIVEL");
});

test("gate de Biblioteca bloqueia papel, hash e evidencias ausentes", () => {
  const item = record();
  const blocked = evaluateLibraryPublicationGate({ record: item, actorRole: "AUTOR_FUNCIONAL", cybersecurity: gate });
  assert.equal(blocked.code, "PUBLICACAO_BLOQUEADA_PAPEL_INVALIDO");
  const incomplete = evaluateLibraryPublicationGate({
    record: item,
    actorRole: "BIBLIOTECARIO_IA",
    evaluatedHash: "b".repeat(64),
    cybersecurity: gate
  });
  assert.equal(incomplete.code, "PUBLICACAO_BLOQUEADA_PENDENTE_EVIDENCIA");
  assert.ok(incomplete.missing.includes("HASH_DIVERGENTE_OU_AUSENTE"));
});

test("gate de Biblioteca permite publicação somente com pacote completo", () => {
  const item = record();
  const result = evaluateLibraryPublicationGate({
    record: item,
    actorRole: "BIBLIOTECARIO_IA",
    evaluatedHash: item.hash,
    committeeEvidence: "banca-001",
    homologationEvidence: "homologacao-001",
    sanitizationEvidence: "sanitizacao-001",
    registryCard: "ficha-001",
    accessClassification: "PUBLICO_SANITIZADO",
    cybersecurity: gate
  });
  assert.equal(result.ok, true);
  assert.equal(result.publication.status, "PUBLICADO_COM_EVIDENCIA");
});

test("trilha de pesquisa e higiene apontam divergencias sem apagar registros", () => {
  const first = record();
  const traced = appendResearchTrace(first, {
    stage: "INTERNAL_SOURCE_REVIEW",
    question: "qual é a fonte canônica?",
    source: first.source,
    classification: "A",
    readAt: "2026-08-11T12:00:00.000Z",
    conclusion: "fonte interna localizada"
  });
  assert.equal(traced.ok, true);
  const duplicate = record({ artifactId: "A-002" });
  const report = buildHygieneReport([traced.record, duplicate]);
  assert.deepEqual(report.duplicateGroups, [["A-001", "A-002"]]);
  assert.equal(report.unresolved, 1);
});

