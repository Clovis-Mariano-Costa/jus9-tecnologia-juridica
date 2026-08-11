import { sha256 } from "./academic-pipeline.js";

export const WORK_STATES = Object.freeze([
  "OBSERVADO",
  "CLASSIFICADO",
  "PLANEJADO",
  "APROVACAO_PENDENTE",
  "APROVADO",
  "IMPLEMENTACAO",
  "TESTE",
  "PRONTO_COM_RESSALVA",
  "BLOQUEADO",
  "ENCERRADO"
]);

const AMBIGUOUS_TERMS = /\b(etc|melhor|rapido|adequado|normal|seguro|em breve|quando possivel)\b/gi;
const SECRET_PATTERNS = [
  /(?:api[_ -]?key|token|secret|password|senha|private[_ -]?key)\s*[:=]\s*["']?[^\s"']+/gi,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g,
  /gh[pousr]_[A-Za-z0-9_]{20,}/g,
  /sk-[A-Za-z0-9_-]{20,}/g
];

function fail(code, details = {}) {
  return { ok: false, code, reason: code, ...details };
}

function requiredText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validTimestamp(value) {
  return requiredText(value) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3,6}Z$/.test(value);
}

export function createWorkPackage({
  packageId,
  title,
  sourceId,
  requestedBy,
  humanOwner,
  classification,
  version = "1.0.0",
  timestamp,
  requirements = []
}) {
  if (![packageId, title, sourceId, requestedBy, humanOwner, classification].every(requiredText) || !validTimestamp(timestamp)) {
    throw new Error("pacote exige identificacao, origem, governanca, classificacao e timestamp");
  }
  if (!Array.isArray(requirements) || requirements.length === 0) throw new Error("pacote sem requisitos");
  const record = {
    packageId,
    title,
    sourceId,
    requestedBy,
    humanOwner,
    classification,
    version,
    state: "OBSERVADO",
    requirements: [...requirements],
    approvals: [],
    tests: [],
    incidents: [],
    audit: [],
    rollback: { required: true, demonstrated: false },
    timestamp
  };
  return { ...record, recordHash: sha256(record) };
}

export function validatePreconditions({
  workPackage,
  actor,
  actorRole,
  requiredRole,
  dependencies = [],
  unavailableDependencies = [],
  humanApprovalRequired = true,
  humanApprovalPresent = false
}) {
  if (!workPackage || workPackage.state === "BLOQUEADO") return fail("PACOTE_BLOQUEADO");
  if (!requiredText(actor) || !requiredText(actorRole)) return fail("ATOR_AUSENTE");
  if (requiredRole && actorRole !== requiredRole) return fail("COMPETENCIA_INSUFICIENTE", { requiredRole });
  if (unavailableDependencies.length > 0) return fail("DEPENDENCIA_INDISPONIVEL", { dependencies: unavailableDependencies });
  if (dependencies.some((dependency) => !requiredText(dependency))) return fail("DEPENDENCIA_INVALIDA");
  if (humanApprovalRequired && !humanApprovalPresent) return fail("APROVACAO_HUMANA_AUSENTE");
  return { ok: true, state: humanApprovalRequired ? "APROVADO" : "PLANEJADO" };
}

export function createApprovalDecision({ packageId, decision, approver, role, timestamp, rationale, conditions = [] }) {
  if (!requiredText(packageId) || !["APPROVE", "REJECT", "HOLD"].includes(decision)) return fail("DECISAO_INVALIDA");
  if (![approver, role, rationale].every(requiredText) || !validTimestamp(timestamp)) return fail("DECISAO_INCOMPLETA");
  return {
    ok: true,
    decision: { packageId, decision, approver, role, timestamp, rationale, conditions: [...conditions] }
  };
}

export function appendApproval(workPackage, approval) {
  if (!approval?.ok || approval.decision.packageId !== workPackage.packageId) return fail("DECISAO_NAO_CORRESPONDE");
  const nextState = approval.decision.decision === "APPROVE"
    ? "APROVADO"
    : approval.decision.decision === "HOLD" ? "BLOQUEADO" : "ENCERRADO";
  const next = { ...workPackage, state: nextState, approvals: [...workPackage.approvals, approval.decision] };
  return { ok: true, workPackage: { ...next, recordHash: sha256(next) } };
}

export function appendTestResult(workPackage, { testId, kind, passed, evidence, timestamp }) {
  if (![testId, kind, evidence].every(requiredText) || typeof passed !== "boolean" || !validTimestamp(timestamp)) {
    return fail("RESULTADO_DE_TESTE_INVALIDO");
  }
  const testResult = { testId, kind, passed, evidence, timestamp };
  const next = { ...workPackage, tests: [...workPackage.tests, testResult] };
  return { ok: true, workPackage: { ...next, state: passed ? "TESTE" : "BLOQUEADO", recordHash: sha256(next) } };
}

export function appendIncident(workPackage, { incidentId, severity, description, containment, timestamp }) {
  if (![incidentId, severity, description, containment].every(requiredText) || !validTimestamp(timestamp)) {
    return fail("INCIDENTE_INCOMPLETO");
  }
  const incident = { incidentId, severity, description, containment, timestamp };
  const next = { ...workPackage, incidents: [...workPackage.incidents, incident], state: "BLOQUEADO" };
  return { ok: true, workPackage: { ...next, recordHash: sha256(next) }, incident };
}

export function lintRequirements(requirements) {
  if (!Array.isArray(requirements) || requirements.length === 0) return fail("REQUISITOS_AUSENTES");
  const findings = [];
  requirements.forEach((requirement, index) => {
    const text = String(requirement);
    if (AMBIGUOUS_TERMS.test(text)) findings.push({ index, code: "TERMO_AMBIGUO" });
    AMBIGUOUS_TERMS.lastIndex = 0;
    if (!/\b(aceite|teste|evidencia|rollback|responsavel|fonte|estado)\b/i.test(text)) {
      findings.push({ index, code: "CRITERIO_OPERACIONAL_AUSENTE" });
    }
  });
  return { ok: findings.length === 0, findings };
}

export function scanForSecrets(value) {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  const findings = SECRET_PATTERNS.flatMap((pattern, index) => {
    pattern.lastIndex = 0;
    return [...text.matchAll(pattern)].map((match) => ({ pattern: index, start: match.index }));
  });
  return { ok: findings.length === 0, findings, policy: "NAO_RETORNAR_VALORES_DE_SEGREDO" };
}

export function createAuditEvent({ packageId, eventType, actor, timestamp, details = {} }) {
  if (![packageId, eventType, actor].every(requiredText) || !validTimestamp(timestamp)) return fail("EVENTO_AUDITORIA_INVALIDO");
  const safe = scanForSecrets(details);
  if (!safe.ok) return fail("EVENTO_AUDITORIA_CONTEM_SEGREDO", { findings: safe.findings });
  const event = { packageId, eventType, actor, timestamp, details };
  return { ok: true, event: { ...event, eventHash: sha256(event) } };
}

