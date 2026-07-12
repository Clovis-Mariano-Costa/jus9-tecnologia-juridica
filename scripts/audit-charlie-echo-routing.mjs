import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

for (const pattern of [
  "function charlieRouteDecision",
  "text.matchAll ? text.matchAll(/\\[PERGUNTA ATUAL\\]",
  "apiFirst: true",
  "localFallbackForRoute",
  "fallbackLocalPermitido",
  "postCharlieApiBody",
  "compactApiQuestionForRetry",
  "retry_compacto",
  "Detalhe:",
  "Regra operacional dura: consulte e responda pela API segura primeiro",
  "function asksDajAnalysisWithUpload",
  "function dajOperativeDeliveryInstruction",
  "ORDEM DE ENTREGA DAJ - MAO NA MASSA",
  "enforceCriticalAnswerGuards",
  "criticalBibliographicCorrection",
  "Juarez Cirino dos Santos",
  "Nao atribua essa obra a Geraldo Prado",
  "pergunta_nova_sem_memoria",
  "daj_analise_upload",
  "peca_juridica_completa",
  "drive_correcao_governada"
]) {
  assert(script.includes(pattern), `script.js: ausente ${pattern}`);
}

const submitStart = script.indexOf("var questionForContext = attachmentContext");
const submitEnd = script.indexOf("document.querySelectorAll('[data-ai-chat]')", submitStart);
const submitBlock = submitStart >= 0 && submitEnd > submitStart ? script.slice(submitStart, submitEnd) : "";

assert(submitBlock, "script.js: bloco principal de submit nao localizado");
assert(submitBlock.indexOf("charlieRouteDecision(questionForContext") >= 0, "submit: decisao de rota nao calculada antes da resposta");
assert(submitBlock.indexOf("askCharlieApiPayload") >= 0, "submit: chamada da API ausente");
assert(submitBlock.includes("askCharlieApiPayload(mode, code, focus, contextualQuestion, room, routeDecision)"), "submit: rota original precisa acompanhar payload da API");
assert(submitBlock.indexOf("enforceCriticalAnswerGuards") > submitBlock.indexOf("askCharlieApiPayload"), "submit: guarda critica precisa ocorrer depois da API");
assert(script.indexOf("postCharlieApiBody") < script.indexOf("askCharlieApiPayload"), "API: helper de POST precisa existir antes do uso");
assert(script.includes("compactApiQuestionForRetry(question, code, focus)"), "API: retry compacto precisa reduzir contexto contaminado/grande");
assert(submitBlock.indexOf("localFallbackForRoute") > submitBlock.indexOf("catch (error)"), "submit: fallback local deve existir apenas no catch");
assert(!/catch \(error\)[\s\S]{0,1200}textForMode/.test(submitBlock), "submit: catch nao pode chamar textForMode como fallback generico");
assert(!/catch \(error\)[\s\S]{0,1200}legalResearchAnswer/.test(submitBlock), "submit: catch nao pode cair em protocolo local de pesquisa juridica");

const routeBlockStart = script.indexOf("function charlieRouteDecision");
const routeBlockEnd = script.indexOf("function localFallbackForRoute", routeBlockStart);
const routeBlock = routeBlockStart >= 0 && routeBlockEnd > routeBlockStart ? script.slice(routeBlockStart, routeBlockEnd) : "";
assert(routeBlock.includes("asksCompleteLegalDraft"), "roteador: pedido de peca completa deve ter rota propria");
assert(routeBlock.includes("asksDajAnalysisWithUpload"), "roteador: analise DAJ/upload deve ter rota propria");
assert(routeBlock.includes("asksDocumentProductionDownload"), "roteador: documento/download deve ter rota propria");
assert(routeBlock.includes("asksDajDoctrineBibliographyProduct"), "roteador: doutrina/bibliografia deve ter rota propria");
assert(routeBlock.includes("asksStandaloneCurrentQuestion"), "roteador: pergunta nova deve ignorar memoria antiga");

if (failures.length) {
  console.error("Falhas na auditoria de roteamento Charlie Echo:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Auditoria de roteamento Charlie Echo OK: API-primeiro, fallback restrito e guardas criticas conferidos.");
