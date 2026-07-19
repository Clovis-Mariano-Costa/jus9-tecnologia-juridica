import fs from "node:fs/promises";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function between(text, startNeedle, endNeedle) {
  const start = text.indexOf(startNeedle);
  assert(start >= 0, `nao localizei inicio: ${startNeedle}`);
  const end = text.indexOf(endNeedle, start + startNeedle.length);
  assert(end > start, `nao localizei fim: ${endNeedle}`);
  return text.slice(start, end);
}

function assertIncludes(text, needle, label) {
  assert(text.includes(needle), `${label}: ausente "${needle}"`);
}

function assertOrder(text, first, second, label) {
  const a = text.indexOf(first);
  const b = text.indexOf(second);
  assert(a >= 0, `${label}: ausente "${first}"`);
  assert(b >= 0, `${label}: ausente "${second}"`);
  assert(a < b, `${label}: ordem incorreta`);
}

const root = new URL("../", import.meta.url);
const script = await fs.readFile(new URL("script.js", root), "utf8");
const worker = await fs.readFile(new URL("worker.js", root), "utf8");
const dajBlock = between(script, "function buildGovernedDajPrompt", "function showDajLoadFailure");
const runDajBlock = between(script, "async function runGovernedDajAnalysis", "function showDajLoadFailure");
const operativeBlock = between(script, "function dajOperativeDeliveryInstruction", "function buildApiMessage");
const expectedScriptVersion = "script.js?v=20260719-daj-laudo-v2";

for (const required of [
  "requiredDajLaudoSections",
  "governedDajLaudoInstruction",
  "Laudo de Analise DAJ",
  "1. Identificacao e escopo",
  "2. Fonte oficial analisada",
  "3. Sintese objetiva dos fatos",
  "4. Classificacao operacional",
  "5. Riscos, urgencias e prazos",
  "6. Lacunas e documentos faltantes",
  "7. Providencias recomendadas",
  "8. Encaminhamento humano",
  "9. Limites da analise",
  "10. Conclusao operacional",
  "hasRequiredDajLaudo",
  "isIncompleteDajLaudo",
  "shouldRejectDajAnalysisAnswer",
  "dajLaudoCorrectionInstruction",
  "resposta_daj_sem_laudo_obrigatorio",
  "requiredOutput:'LAUDO_DAJ_V1'",
  "dajAnalysisSource",
]) {
  assertIncludes(script, required, "contrato de laudo DAJ");
}

for (const required of [
  "prepareDajLaudoProxyRequest",
  "isDajLaudoProxyRequest",
  "buildGovernedDajLaudoFromSource",
  "worker_daj_laudo_governado",
  "X-Jus9-Daj-Laudo-Fallback",
  "upstream_resposta_evasiva",
  "Laudo de Analise DAJ",
]) {
  assertIncludes(worker, required, "proxy de laudo DAJ");
}

for (const evasiveMarker of [
  "consulta por DAJ deve ser executada",
  "indice estruturado e autenticado",
  "/api/daj-process-links",
  "vinculo DAJ-processo",
]) {
  assertIncludes(script, evasiveMarker, "bloqueio de resposta evasiva DAJ");
}

assertIncludes(operativeBlock, "entregue obrigatoriamente um laudo", "instrucao operacional DAJ");
assertIncludes(operativeBlock, "Se faltar dado, entregue laudo limitado", "instrucao operacional DAJ");
assertOrder(runDajBlock, "var answer = enforceCriticalAnswerGuards", "if(shouldRejectDajAnalysisAnswer(answer))", "primeira resposta DAJ");
assertOrder(runDajBlock, "answer = enforceCriticalAnswerGuards(corrected.answer", "if(!answer || shouldRejectDajAnalysisAnswer(answer))", "resposta corrigida DAJ");
assertOrder(runDajBlock, "if(!answer || shouldRejectDajAnalysisAnswer(answer))", "registerDajAnalysisWorkflow", "registro do fluxo DAJ");
assert(!/registerDajAnalysisWorkflow[\s\S]{0,900}shouldRejectDajAnalysisAnswer/.test(runDajBlock), "registro DAJ nao pode vir antes da validacao do laudo");
assert(worker.indexOf("prepareDajLaudoProxyRequest(parsed)") < worker.indexOf("fetch(CHARLIE_API_URL"), "proxy precisa preparar LAUDO_DAJ_V1 antes da chamada upstream");
assert(worker.indexOf("hasRequiredDajLaudoForProxy") < worker.indexOf("buildGovernedDajLaudoFromSource(parsedBody.route?.dajAnalysisSource"), "proxy precisa validar upstream antes do fallback governado");

for (const file of [
  "app-ia-profissional.html",
  "app-demo-advogar.html",
  "app-clientes.html",
  "app-equipe.html",
]) {
  const html = await fs.readFile(new URL(file, root), "utf8");
  assertIncludes(html, expectedScriptVersion, `${file}: script DAJ versionado`);
}

console.log("AUDITORIA_DAJ_LAUDO_OK contrato obrigatorio de laudo, proxy governado, bloqueio de resposta evasiva e registro pos-validacao conferidos.");
