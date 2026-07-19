import fs from "node:fs/promises";

const root = new URL("../", import.meta.url);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const [dashboard, aiPage, panel, kit] = await Promise.all([
  fs.readFile(new URL("app-demo-autor-editor.html", root), "utf8"),
  fs.readFile(new URL("app-ia-autor-editor.html", root), "utf8"),
  fs.readFile(new URL("app-painel-mvps.html", root), "utf8"),
  fs.readFile(new URL("governanca/KIT_DEMO_DED_EDITORIAL_VITRINE_2026-07-19.md", root), "utf8"),
]);

for (const phrase of [
  "DED-MODELO-VITRINE-2026",
  "Autora Beta Ficticia",
  "Manual Ficticio da Oficina de Palavras",
  "PUBLICO-DEMONSTRATIVO",
]) {
  assert(dashboard.includes(phrase), `painel DED sem dataset ficticio: ${phrase}`);
  assert(kit.includes(phrase), `kit DED sem dataset ficticio: ${phrase}`);
}

assert(dashboard.includes("data-ded-editorial-showcase"), "painel DED sem vitrine editorial marcada");
assert(dashboard.includes("data-ded-briefing"), "painel DED sem briefing estruturado");
assert(dashboard.includes("data-ded-author-checklist"), "painel DED sem checklist de autoria/titularidade");
assert(dashboard.includes("app-painel-mvps.html"), "painel DED sem retorno ao painel executivo");

for (const phrase of [
  "Drive real permanece bloqueado",
  "Sem Drive real",
  "Sem ISBN",
  "Sem venda garantida",
  "Download local demonstrativo",
]) {
  assert(dashboard.includes(phrase), `painel DED sem limite: ${phrase}`);
}

assert(aiPage.includes("data-ded-prompt-pack"), "IA DED sem pacote de prompts ficticio");
assert(aiPage.includes("data-ded-guardrails"), "IA DED sem guardrails marcados");
assert(aiPage.includes("DED-MODELO-VITRINE-2026"), "IA DED sem dataset de briefing");
assert(aiPage.includes("nao invento autoria, fonte, citacao, pagina, licenca, titularidade, ISBN, contrato, venda ou publicacao"), "IA DED sem guardrail editorial completo");
assert(aiPage.includes("Drive real, ISBN, venda e contrato ficam bloqueados no demo publico"), "IA DED sem bloqueio de efeitos reais");

for (const forbidden of [
  "salvar no Drive governado",
  "Drive oficial com decisao",
  "ISBN garantido",
  "venda automatica garantida",
]) {
  assert(!dashboard.includes(forbidden) && !aiPage.includes(forbidden), `DED ainda contem promessa/efeito real: ${forbidden}`);
}

assert(panel.includes('data-package="3" data-package-status="CONCLUIDO_PUBLICADO"'), "painel executivo nao marca Pacote 3 como publicado");
assert(panel.includes("Vitrine editorial publicada com briefing ficticio"), "painel executivo sem resumo da entrega DED");

console.log("DED_EDITORIAL_SHOWCASE_OK dataset=DED-MODELO-VITRINE-2026 status=CONCLUIDO_PUBLICADO");
