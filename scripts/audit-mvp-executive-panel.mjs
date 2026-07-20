import fs from "node:fs/promises";

const root = new URL("../", import.meta.url);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const [panel, mvpPage, leaderPage, matrix] = await Promise.all([
  fs.readFile(new URL("app-painel-mvps.html", root), "utf8"),
  fs.readFile(new URL("mvp.html", root), "utf8"),
  fs.readFile(new URL("lider-mvp.html", root), "utf8"),
  fs.readFile(new URL("governanca/MATRIZ_PRIORIZACAO_MVPS_CHARLIE_ECHO_v1.0.0.json", root), "utf8").then(JSON.parse),
]);

assert(panel.includes("data-mvp-executive-panel"), "painel executivo sem marcador principal");
assert(panel.includes("Painel executivo dos 14 MVPs"), "painel executivo sem titulo canonico");
assert(panel.includes("Mao na Massa v3.1.1"), "painel executivo sem referencia ao cronograma v3.1.1");
assert(panel.includes("DAJ-2026-0002"), "painel executivo sem DAJ de referencia");
assert(panel.includes("2026-07-19 13:44:32 BRT"), "painel executivo sem data/hora concreta do aceite parcial");
assert(panel.includes("ACEITE_HUMANO_PARCIAL_CONFIRMADO"), "painel executivo nao preserva aceite parcial");
assert(panel.includes("REVERSIBILIDADE_PENDENTE"), "painel executivo nao preserva reversibilidade pendente");
assert(panel.includes("a142825") && panel.includes("fcef514"), "painel executivo sem commits de referencia");
assert(panel.includes("cde1bf89-3d93-4429-a485-be46945bec04"), "painel executivo sem deploy base");
assert(panel.includes("LIVE_DAJ_SEARCH_SMOKE_OK"), "painel executivo sem smoke publico");
assert(panel.includes("CPF integral nao entra em query string, prompt, localStorage, auditoria visivel ou resultado"), "painel executivo sem regra de minimizacao de CPF");
assert(panel.includes("data-mvp-proof-map") && panel.includes("Mapa de provas dos 14 MVPs"), "painel executivo sem mapa de provas dos MVPs");
assert(panel.includes("data-onda1-ded-dic-proof") && panel.includes("Onda 1 - prova DED + DIC"), "painel executivo sem prova Onda 1 DED+DIC");
assert(panel.includes("data-onda2-dee-deji-dpj-proof") && panel.includes("Onda 2 - prova DEE + DEJI + DPJ"), "painel executivo sem prova Onda 2 DEE+DEJI+DPJ");
assert(panel.includes("data-onda3-dip-daa-dej-proof") && panel.includes("Onda 3 - prova DIP + DAA + DEJ"), "painel executivo sem prova Onda 3 DIP+DAA+DEJ");
assert(panel.includes("data-onda4-doi-dge-proof") && panel.includes("Onda 4 - prova DOI + DGE"), "painel executivo sem prova Onda 4 DOI+DGE");
assert(panel.includes("data-onda5-dmp-dap-dmg-proof") && panel.includes("Onda 5 - prova DMP + DAP + DMG"), "painel executivo sem prova Onda 5 DMP+DAP+DMG");
assert(panel.includes("data-pacote8-fechamento") && panel.includes("REVISAO_GERAL_EXECUTADA"), "painel executivo sem fechamento tecnico do Pacote 8");
assert(panel.includes("VIDEO_PENDENTE_GRAVACAO_HUMANA") && panel.includes("ZIP_PENDENTE_CONGELAMENTO_HUMANO"), "painel executivo sem gates humanos de video/ZIP");

const packageStatuses = [
  "CONCLUIDO",
  "CONCLUIDO_PUBLICADO",
  "AGUARDANDO_NOVO_TESTE_HUMANO",
  "BLOQUEADO_ATE_REVERSIBILIDADE_1C",
  "PENDENTE_FECHAMENTO_GERAL",
];

for (const status of packageStatuses) {
  assert(panel.includes(status), `painel executivo sem status ${status}`);
}

for (const packageNumber of ["0", "1", "2", "3", "4", "5", "5A", "5B", "5C", "6", "7", "8"]) {
  assert(panel.includes(`data-package="${packageNumber}"`), `painel executivo sem Pacote ${packageNumber}`);
}

const entries = matrix.entries;
assert(Array.isArray(entries) && entries.length === 14, "matriz de priorizacao deve ter 14 entradas");
for (const entry of entries) {
  assert(panel.includes(`<span class="rank-code">${entry.code}</span>`), `painel executivo sem codigo ${entry.code}`);
  assert(panel.includes(`>${entry.totalScore}</td>`), `painel executivo sem score ${entry.totalScore} de ${entry.code}`);
  assert(panel.includes(`data-proof-code="${entry.code}"`), `painel executivo sem prova de valor de ${entry.code}`);
}

for (const target of [
  "app-clientes.html#consulta-daj",
  "app-atendimento-inicial.html",
  "app-ia-profissional.html#chat-ia",
  "app-demo-autor-editor.html",
  "app-ia-autor-editor.html#chat-ia",
  "app-demo-cidadao.html",
  "app-ia-cidadao.html#chat-ia",
  "app-demo-escritorio.html",
  "app-demo-empresa.html",
  "app-demo-perito.html",
  "app-demo-investidor.html#prova-dip",
  "app-demo-professor.html#prova-daa",
  "app-demo-estudante.html#prova-dej",
  "app-demo-orgao-publico.html#prova-doi",
  "app-demo-administrador.html#prova-dge",
  "app-demo-promotor.html#prova-dmp",
  "app-demo-delegado.html#prova-dap",
  "app-demo-juiz.html#prova-dmg",
  "mvp.html",
  "lider-mvp.html",
]) {
  assert(panel.includes(`href="${target}"`), `painel executivo sem atalho ${target}`);
}

assert(mvpPage.includes("app-painel-mvps.html"), "mvp.html sem link para painel executivo");
assert(leaderPage.includes("app-painel-mvps.html"), "lider-mvp.html sem link para painel executivo");

console.log("MVP_EXECUTIVE_PANEL_OK mvps=14 pacotes=12 onda1=DED_DIC onda2=DEE_DEJI_DPJ onda3=DIP_DAA_DEJ onda4=DOI_DGE onda5=DMP_DAP_DMG status=CONCLUIDO_PUBLICADO fechamento=REVISAO_GERAL_EXECUTADA_VIDEO_ZIP_PENDENTES");
