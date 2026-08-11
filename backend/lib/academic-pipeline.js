import { createHash } from "node:crypto";

export const ACADEMIC_STATES = Object.freeze([
  "M00_RASCUNHO_DIDATICO_INTERNO",
  "M01_RASCUNHO_CLASSIFICADO",
  "M02_MATERIAL_DE_AULA_INTERNO",
  "M03_MATERIAL_DE_ESTUDO_REFERENCIADO",
  "M04_MATERIAL_REVISADO",
  "M05_MATERIAL_COM_ANTITESE_E_CONTRAEXEMPLOS",
  "M06_PROJETO_ACADEMICO",
  "M07_PROJETO_ORIENTADO",
  "M08_PROJETO_APROVADO_PARA_EXECUCAO",
  "M09_PROTOCOLO_PRE_REGISTRADO",
  "M10_EXECUCAO_CONTROLADA",
  "M11_RESULTADOS_PRELIMINARES",
  "M12_RESULTADOS_REPRODUZIDOS_OU_REVISADOS",
  "M13_MANUSCRITO_PRE_BANCA",
  "M14_SUBMETIDO_A_BANCA",
  "M15_BANCA_COM_EXIGENCIAS",
  "M16_APROVADO_PELA_BANCA",
  "M17_CORRIGIDO_POS_BANCA",
  "M18_HOMOLOGADO_INTERNAMENTE",
  "M19_SANITIZADO_PARA_PUBLICACAO",
  "M20_DEPOSITO_BIBLIOTECARIO_PENDENTE",
  "M21_PUBLICACAO_BIBLIOTECA_AUTORIZADA",
  "M22_PUBLICADO_NA_BIBLIOTECA",
  "M23_REVISAO_POS_PUBLICACAO"
]);

const transitions = new Map(
  ACADEMIC_STATES.map((state, index) => [
    state,
    new Set(index < ACADEMIC_STATES.length - 1 ? [ACADEMIC_STATES[index + 1]] : [])
  ])
);

const SECURITY_REQUIREMENTS = Object.freeze([
  ["criticalVulnerabilityOpen", false, "VULNERABILIDADE_CRITICA_ABERTA"],
  ["highVulnerabilityUnmitigated", false, "VULNERABILIDADE_ALTA_SEM_MITIGACAO"],
  ["tenantIsolationTested", true, "ISOLAMENTO_MULTI_TENANT_NAO_TESTADO"],
  ["authenticationAuthorizationComplete", true, "AUTENTICACAO_AUTORIZACAO_INCOMPLETA"],
  ["secretInLogsOrPublicArtifact", false, "SEGREDO_EM_LOG_OU_ARTEFATO_PUBLICO"],
  ["rollbackDemonstrated", true, "ROLLBACK_NAO_DEMONSTRADO"],
  ["incidentResponseDefined", true, "RESPOSTA_A_INCIDENTE_NAO_DEFINIDA"],
  ["dependenciesKnown", true, "DEPENDENCIAS_DESCONHECIDAS"]
]);

function sortObject(value) {
  if (Array.isArray(value)) return value.map(sortObject);
  if (!value || typeof value !== "object") return value;
  return Object.keys(value).sort().reduce((result, key) => {
    result[key] = sortObject(value[key]);
    return result;
  }, {});
}

export function sha256(value) {
  const serialized = typeof value === "string" ? value : JSON.stringify(sortObject(value));
  return createHash("sha256").update(serialized, "utf8").digest("hex");
}

function isTimestamp(value) {
  return typeof value === "string"
    && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3,6}Z$/.test(value)
    && !Number.isNaN(Date.parse(value));
}

function block(code, details = {}) {
  return { ok: false, code, reason: code, ...details };
}

export function validateCybersecurityGate(input = {}) {
  const blockedBy = SECURITY_REQUIREMENTS
    .filter(([field, expected]) => input[field] !== expected)
    .map(([, , code]) => code);

  return blockedBy.length === 0
    ? { ok: true, blockedBy: [] }
    : { ok: false, blockedBy, reason: "GATE_CYBERSECURITY_BLOQUEADO" };
}

export function createGenealogyRecord({
  artifactId,
  parentArtifactId = null,
  parentHash = null,
  version,
  payload,
  actor,
  timestamp
}) {
  if (!artifactId || !version || !actor || !isTimestamp(timestamp)) {
    throw new Error("GHR exige artifactId, version, actor e timestamp UTC com milissegundos");
  }

  const payloadHash = sha256(payload);
  const record = {
    artifactId,
    parentArtifactId,
    parentHash,
    version,
    payloadHash,
    actor,
    timestamp
  };
  return { ...record, recordHash: sha256(record) };
}

export function createAcademicRecord({
  artifactId,
  title,
  state = ACADEMIC_STATES[0],
  version = "1.0.0",
  classification = "INTERNAL",
  sourceId,
  actor,
  timestamp,
  evidence = []
}) {
  if (!artifactId || !title || !sourceId || !actor || !isTimestamp(timestamp)) {
    throw new Error("ASM exige artifactId, title, sourceId, actor e timestamp UTC com milissegundos");
  }
  if (!ACADEMIC_STATES.includes(state)) throw new Error(`estado academico invalido: ${state}`);
  if (!Array.isArray(evidence) || evidence.length === 0) {
    throw new Error("ASM exige evidencia inicial");
  }

  const genealogy = createGenealogyRecord({
    artifactId,
    version,
    payload: { title, state, classification, sourceId },
    actor,
    timestamp
  });
  const event = {
    type: "STATE_CREATED",
    from: null,
    to: state,
    actor,
    timestamp,
    evidence: [...evidence],
    reason: "CRIACAO_VERSIONADA"
  };
  return {
    artifactId,
    title,
    state,
    version,
    classification,
    sourceId,
    genealogy: [genealogy],
    history: [event],
    results: [],
    rollbackEvents: [],
    recordHash: sha256({ artifactId, title, state, version, classification, sourceId, genealogy, history: [event] })
  };
}

export function validateTransition({ record, to, actor, role, timestamp, evidence = [], reason, cybersecurity }) {
  if (!record || !ACADEMIC_STATES.includes(record.state)) return block("ESTADO_ATUAL_INVALIDO");
  if (!ACADEMIC_STATES.includes(to)) return block("ESTADO_DESTINO_INVALIDO", { to });
  if (!transitions.get(record.state)?.has(to)) {
    return block("TRANSICAO_NAO_PERMITIDA", { from: record.state, to });
  }
  if (!actor || !role || !isTimestamp(timestamp)) {
    return block("ATOR_ROLE_OU_TIMESTAMP_AUSENTE");
  }
  if (!Array.isArray(evidence) || evidence.length === 0) {
    return block("EVIDENCIA_AUSENTE");
  }
  if (!reason || typeof reason !== "string") return block("JUSTIFICATIVA_AUSENTE");

  const gate = validateCybersecurityGate(cybersecurity);
  if (!gate.ok) return block("GATE_CYBERSECURITY_BLOQUEADO", { blockedBy: gate.blockedBy });

  return {
    ok: true,
    event: { type: "STATE_TRANSITION", from: record.state, to, actor, role, timestamp, evidence: [...evidence], reason }
  };
}

export function applyTransition({ record, ...transition }) {
  const validation = validateTransition({ record, ...transition });
  if (!validation.ok) return validation;

  const event = validation.event;
  const genealogy = createGenealogyRecord({
    artifactId: record.artifactId,
    parentArtifactId: record.artifactId,
    parentHash: record.recordHash,
    version: transition.version || record.version,
    payload: { title: record.title, state: event.to, classification: record.classification, sourceId: record.sourceId },
    actor: event.actor,
    timestamp: event.timestamp
  });
  const next = {
    ...record,
    state: event.to,
    version: transition.version || record.version,
    genealogy: [...record.genealogy, genealogy],
    history: [...record.history, event]
  };
  return { ok: true, record: { ...next, recordHash: sha256(next) }, event };
}

export function appendResult({ record, result, actor, timestamp }) {
  if (!result || !actor || !isTimestamp(timestamp)) return block("RESULTADO_INVALIDO");
  const entry = {
    resultId: `${record.artifactId}:${record.results.length + 1}`,
    outcome: result.outcome || "UNSPECIFIED",
    details: result.details || null,
    negative: result.negative === true,
    actor,
    timestamp
  };
  const next = { ...record, results: [...record.results, entry] };
  return { ok: true, record: { ...next, recordHash: sha256(next) }, entry };
}

export function appendRollbackEvent({ record, targetEventIndex, actor, timestamp, reason }) {
  if (!Number.isInteger(targetEventIndex) || targetEventIndex < 0 || targetEventIndex >= record.history.length) {
    return block("EVENTO_DE_ROLLBACK_INVALIDO");
  }
  if (!actor || !isTimestamp(timestamp) || !reason) return block("ROLLBACK_INCOMPLETO");
  const entry = {
    type: "ROLLBACK_RECORDED",
    targetEventIndex,
    actor,
    timestamp,
    reason,
    preservesHistory: true
  };
  const next = { ...record, rollbackEvents: [...record.rollbackEvents, entry] };
  return { ok: true, record: { ...next, recordHash: sha256(next) }, event: entry };
}

