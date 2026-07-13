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
  assert(a < b, `${label}: ordem incorreta: "${first}" deve vir antes de "${second}"`);
}

const root = new URL("../", import.meta.url);
const script = await fs.readFile(new URL("script.js", root), "utf8");
const processPage = await fs.readFile(new URL("app-processos.html", root), "utf8");
const datajud = await fs.readFile(new URL("functions/_shared/datajud.js", root), "utf8");

const routeBlock = between(script, "function charlieRouteDecision", "function localFallbackForRoute");
const submitBlock = between(script, "form.addEventListener('submit'", "document.querySelectorAll('[data-ai-chat]')");
const buildApiBlock = between(script, "function buildApiMessage", "async function loadGovernedIdentityContext");
const fallbackBlock = between(script, "function textForMode", "function asksPreviousQuestion");

for (const required of [
  "charlieRouteDecision",
  "apiFirst: true",
  "Regra operacional dura: consulte e responda pela API segura primeiro",
  "Regra de foco: a [PERGUNTA ATUAL]",
  "pergunta_nova_sem_memoria",
  "asksStandaloneCurrentQuestion",
  "enforceCriticalAnswerGuards",
  "applyCreativeReasoningFrame",
  "postCharlieApiBody",
  "compactApiQuestionForRetry",
  "retry_compacto",
]) {
  assertIncludes(script, required, "nucleo api-first");
}

assertOrder(submitBlock, "charlieRouteDecision(questionForContext", "askCharlieApiPayload(mode, code, focus, contextualQuestion, room, routeDecision)", "submit");
assertOrder(submitBlock, "askCharlieApiPayload(mode, code, focus, contextualQuestion, room, routeDecision)", "var guardedAnswer = enforceCriticalAnswerGuards", "submit");
assertOrder(submitBlock, "var guardedAnswer = enforceCriticalAnswerGuards", "var answer = applyCreativeReasoningFrame", "submit");
assertOrder(submitBlock, "catch (error)", "localFallbackForRoute(routeDecision", "fallback restrito");
assert(!/catch \(error\)[\s\S]{0,1400}textForMode/.test(submitBlock), "catch nao pode cair em textForMode generico");
assert(!/catch \(error\)[\s\S]{0,1400}legalResearchAnswer/.test(submitBlock), "catch nao pode cair em protocolo juridico generico");
assertIncludes(submitBlock, "Nao consegui concluir a consulta na API segura da Charlie Echo agora.", "erro API fail-closed");

assertOrder(routeBlock, "asksDriveSaverCorrectiveAction", "asksPreviousQuestion", "roteador");
assertOrder(routeBlock, "asksCompleteLegalDraft", "asksDocumentProductionDownload", "roteador");
assertOrder(routeBlock, "asksActiveLegalCitationResearch", "asksDajDoctrineBibliographyProduct", "roteador");
assertOrder(routeBlock, "asksSources(currentQuestion)", "asksStandaloneCurrentQuestion", "roteador");
assertIncludes(routeBlock, "peca_juridica_completa", "rota peca");
assertIncludes(routeBlock, "documento_download_local", "rota download");
assertIncludes(routeBlock, "pesquisa_citacao_doutrinaria_ativa", "rota citacao ativa");
assertIncludes(routeBlock, "doutrina_bibliografia_conferida", "rota bibliografia");
assertIncludes(routeBlock, "drive_correcao_governada", "rota Drive corretiva");

assertIncludes(script, "function asksCompleteLegalDraft", "peca completa");
assertIncludes(script, "peticao|peca|inicial|contestacao|recurso", "peca completa");
assertIncludes(buildApiBlock, "Quando o usuario pedir peca, minuta, peticao", "instrucao peca completa");
assertIncludes(buildApiBlock, "produza uma minuta inteira e utilizavel", "instrucao peca completa");
assertIncludes(buildApiBlock, "enderecamento, qualificacao", "instrucao peca completa");

assertIncludes(script, "Direito de propriedade - sintese com fontes", "propriedade com fontes");
assertIncludes(script, "Constituicao Federal, art. 5, XXII e XXIII", "propriedade com fontes");
assertIncludes(script, "Codigo Civil, especialmente art. 1.228", "propriedade com fontes");
assertIncludes(script, "STF - pesquisa de jurisprudencia constitucional", "propriedade com fontes");
assertIncludes(script, "STJ - pesquisa de jurisprudencia civil", "propriedade com fontes");
assertIncludes(script, "BDTD - teses e dissertacoes", "propriedade com fontes");

assertIncludes(script, "[PESQUISA JURIDICA ATIVA - PORTAL]", "citacao ativa");
assertIncludes(script, "Nao responda apenas com lista de fontes para o usuario pesquisar", "citacao ativa");
assertIncludes(script, "pesquise e entregue sintese, fonte, URL, pagina quando verificavel", "citacao ativa");
assertIncludes(script, "Nunca invente autor, obra, pagina, julgado ou trecho literal", "citacao ativa");

assertIncludes(script, "A moderna teoria do fato punivel", "fato punivel");
assertIncludes(script, "Juarez Cirino dos Santos", "fato punivel");
assertIncludes(script, "Nao atribua essa obra a Geraldo Prado", "fato punivel");
assertIncludes(script, "criticalBibliographicCorrection", "fato punivel");
assert(/geraldo prado/i.test(script), "guarda de fato punivel precisa reconhecer atribuicao errada");

assertIncludes(script, "function asksDocumentProductionDownload", "download documental");
assertIncludes(script, "link para donwload", "download documental tolera erro comum");
assertIncludes(script, "shouldOfferDocumentDownloads", "download documental");
assertIncludes(submitBlock, "appendDownloadEchoForForm(buildResponseDownloads", "download documental");

assertIncludes(processPage, 'id="process-search-type"', "pesquisa processual");
assertIncludes(processPage, '<option value="daj">DAJ</option>', "pesquisa processual");
assertIncludes(processPage, '<option value="nome">Nome da parte</option>', "pesquisa processual");
assertIncludes(processPage, '<option value="cpf">CPF</option>', "pesquisa processual");
assertIncludes(processPage, "CPF deve aparecer sempre mascarado", "pesquisa processual");
assertIncludes(processPage, "jus9DajProcessLinksV1", "vinculo DAJ-processo");
assertIncludes(processPage, "data-linked-daj-panel", "vinculo DAJ-processo");
assertIncludes(processPage, "data-daj-link-list", "vinculo DAJ-processo");
assertIncludes(processPage, "cada DAJ corresponde a um unico processo", "vinculo DAJ-processo");
assertIncludes(processPage, "bloqueio_daj_ja_vinculado", "vinculo DAJ-processo");
assertIncludes(processPage, "bloqueio_processo_ja_vinculado", "vinculo DAJ-processo");
assertIncludes(datajud, "supportedSearchTypes", "DataJud governado");
assertIncludes(datajud, "datajud_busca_por_parte_indisponivel_na_api_publica", "DataJud governado");
assertIncludes(datajud, "requer_conector_autorizado_de_partes", "DataJud governado");
assertIncludes(datajud, "maskCpf", "DataJud governado");

assertIncludes(buildApiBlock, "Em pesquisa processual governada, reconheca tres chaves", "instrucao global pesquisa processual");
assertIncludes(buildApiBlock, "mascare CPF na resposta", "instrucao global pesquisa processual");
assertIncludes(buildApiBlock, "se a API Publica DataJud nao suportar busca por partes, diga isso sem inventar resultado", "instrucao global pesquisa processual");

assertOrder(fallbackBlock, "driveSaverCorrectiveFallback", "legalResearchAnswer", "fallback Drive antes de pesquisa");
assertIncludes(script, "Recebi isso como acao corretiva de Drive/Docs", "Drive corretivo");
assertIncludes(buildApiBlock, "revogar, restringir, despublicar, mover para revisao ou enviar para lixeira", "Drive corretivo");

console.log("CHARLIE_RESPONSE_CONTRACTS_OK api-first, anti-protocolo, pecas, fontes, fato-punivel, download, DataJud e Drive");
