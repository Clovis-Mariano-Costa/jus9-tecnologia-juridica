import { getCharlieMvp, normalizeCharlieMvpCode } from "./registry.js";

export const CHARLIE_RISK_LEVELS = Object.freeze(["low", "normal", "high", "critical"]);
export const CHARLIE_CLASSIFICATIONS = Object.freeze([
  "PUBLICO",
  "PUBLICO_DEMONSTRATIVO",
  "INTERNO",
  "RESTRITO",
  "JURIDICO_SIGILOSO",
  "CREDENCIAL_SECRETO"
]);

const HIGH_RISK_PATTERNS = /cpf|dado pessoal|cliente real|processo real|segredo|sigilo|prazo fatal|urgente|cofre|token|senha/i;
const CRITICAL_PATTERNS = /sentenciar|assinar|protocolar|peticionar|investigar pessoa real|ato oficial|quebrar sigilo|expor senha|expor token/i;

export function classifyCharlieRisk(input = {}) {
  const code = normalizeCharlieMvpCode(input.mvpCode);
  const mvp = getCharlieMvp(code);
  const text = `${input.message || ""} ${input.classification || ""}`;
  let riskLevel = mvp?.defaultRisk || "normal";
  const reasons = [];

  if (CRITICAL_PATTERNS.test(text)) {
    riskLevel = "critical";
    reasons.push("critical_effect_or_secret_request");
  } else if (HIGH_RISK_PATTERNS.test(text) && !["critical"].includes(riskLevel)) {
    riskLevel = "high";
    reasons.push("sensitive_or_real_data_context");
  }
  if (input.hasAttachment === true && riskLevel === "normal") {
    riskLevel = "high";
    reasons.push("attachment_requires_classification");
  }

  return Object.freeze({
    mvpCode: code,
    riskLevel,
    reasons: Object.freeze(reasons),
    humanReviewRequired: riskLevel === "high" || riskLevel === "critical",
    blockedAutonomousEffects: riskLevel === "critical"
  });
}

export function buildCharlieGovernedPrompt(input = {}) {
  const code = normalizeCharlieMvpCode(input.mvpCode);
  const mvp = getCharlieMvp(code);
  if (!mvp) throw new TypeError("mvp_code_invalido");
  const risk = classifyCharlieRisk({ ...input, mvpCode: code });
  const mode = String(input.mode || "assistive").trim().slice(0, 40);
  const message = String(input.message || "").trim().slice(0, 20_000);
  if (!message) throw new TypeError("message_obrigatoria");

  return Object.freeze({
    mvpCode: code,
    mode,
    risk,
    instructions: Object.freeze([
      "Responda pela API governada e falhe de forma explicita quando faltar fonte, memoria ou servico critico.",
      "Nunca invente fonte, processo, parte, prazo, resultado, arquivo, URL ou efeito externo.",
      `Preserve a identidade do modulo ${code} - ${mvp.name}.`,
      `Papel humano responsavel: ${mvp.humanRole}.`,
      ...mvp.limits.map((limit) => `Limite: ${limit}.`)
    ]),
    message
  });
}
