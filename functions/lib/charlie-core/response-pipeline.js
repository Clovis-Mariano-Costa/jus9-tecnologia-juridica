import { CHARLIE_CONTRACTS, CHARLIE_RESPONSE_SOURCES } from "./contracts.js";
import { CHARLIE_CLASSIFICATIONS, classifyCharlieRisk } from "./policies.js";
import { getCharlieMvp, normalizeCharlieMvpCode } from "./registry.js";

export const CHARLIE_CITATION_STATUSES = Object.freeze([
  "not_required",
  "required_unverified",
  "provided_unverified"
]);

const CITATION_REQUIRED_ROUTES = Object.freeze(new Set([
  "pesquisa_citacao_doutrinaria_ativa",
  "doutrina_bibliografia_conferida",
  "jurisprudencia_produto_daj",
  "fontes_juridicas_com_sintese"
]));

const FALLBACK_LIMITS = Object.freeze([
  "human_review_required",
  "no_real_data_in_public_demo",
  "no_autonomous_legal_effect",
  "no_secret_or_credential_disclosure"
]);

function controlledClassification(input, mvpCode) {
  if (CHARLIE_CLASSIFICATIONS.includes(input.classification)) return input.classification;
  const dajClassification = input.route?.dajAnalysisSource?.classification;
  if (CHARLIE_CLASSIFICATIONS.includes(dajClassification)) return dajClassification;
  return mvpCode === "DAJ" ? "JURIDICO_SIGILOSO" : "PUBLICO_DEMONSTRATIVO";
}

function controlledCitations(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === "string" && item.trim())
    .map((item) => item.trim().slice(0, 2_000))
    .slice(0, 20);
}

function citationRequired(input) {
  const routeId = String(input.route?.id || "").slice(0, 80);
  if (CITATION_REQUIRED_ROUTES.has(routeId)) return true;
  return /\b(fonte|fontes|citacao|citacoes|jurisprudencia|doutrina|precedente|lei|artigo)\b/i.test(String(input.message || ""));
}

export function buildCharlieResponseGovernance(input = {}) {
  const mvpCode = normalizeCharlieMvpCode(input.mvpCode);
  const mvp = getCharlieMvp(mvpCode);
  const classification = controlledClassification(input, mvpCode);
  const risk = classifyCharlieRisk({
    mvpCode,
    message: String(input.message || "").slice(0, 20_000),
    classification,
    hasAttachment: input.hasAttachment === true
  });
  const citations = controlledCitations(input.citations);
  const citationsRequired = citationRequired(input);
  const source = CHARLIE_RESPONSE_SOURCES.includes(input.source) ? input.source : "fallback_governado";

  return Object.freeze({
    auditId: String(input.auditId || "").slice(0, 160),
    contractVersion: CHARLIE_CONTRACTS.version,
    source,
    mvpCode,
    routeId: String(input.route?.id || "api_geral").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80) || "api_geral",
    classification,
    riskLevel: risk.riskLevel,
    riskReasons: risk.reasons,
    humanReviewRequired: risk.humanReviewRequired || citationsRequired,
    blockedAutonomousEffects: risk.blockedAutonomousEffects,
    citations: Object.freeze(citations),
    citationStatus: citations.length ? "provided_unverified" : (citationsRequired ? "required_unverified" : "not_required"),
    limits: Object.freeze([...(mvp?.limits || FALLBACK_LIMITS)]),
    humanRole: mvp?.humanRole || "revisor_humano"
  });
}

export function buildCharlieResponseAuditEvent(governance, input = {}) {
  return Object.freeze({
    auditId: governance.auditId,
    eventType: "charlie.response.governed",
    occurredAt: new Date().toISOString(),
    actor: "charlie_proxy",
    result: String(input.result || "responded").replace(/[^a-z0-9_-]/gi, "").slice(0, 80) || "responded",
    classification: governance.classification,
    details: Object.freeze({
      contractVersion: governance.contractVersion,
      source: governance.source,
      mvpCode: governance.mvpCode,
      routeId: governance.routeId,
      riskLevel: governance.riskLevel,
      humanReviewRequired: governance.humanReviewRequired,
      blockedAutonomousEffects: governance.blockedAutonomousEffects,
      citationStatus: governance.citationStatus,
      citationsCount: governance.citations.length,
      limitsCount: governance.limits.length,
      upstreamStatus: Number.isInteger(input.upstreamStatus) ? input.upstreamStatus : null,
      durationMs: Math.max(0, Math.min(120_000, Number(input.durationMs) || 0))
    })
  });
}
