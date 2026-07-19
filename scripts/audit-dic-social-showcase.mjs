import fs from "node:fs/promises";

const root = new URL("../", import.meta.url);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const [dashboard, aiPage, panel, kit] = await Promise.all([
  fs.readFile(new URL("app-demo-cidadao.html", root), "utf8"),
  fs.readFile(new URL("app-ia-cidadao.html", root), "utf8"),
  fs.readFile(new URL("app-painel-mvps.html", root), "utf8"),
  fs.readFile(new URL("governanca/KIT_DEMO_DIC_SOCIAL_VITRINE_2026-07-19.md", root), "utf8"),
]);

for (const phrase of [
  "DIC-MODELO-VITRINE-2026",
  "Pessoa interessada ficticia",
  "Nao solicitar CPF, endereco, telefone, processo, valor, foto, documento ou nome real",
  "Fonte oficial ou institucional a conferir pelo usuario humano",
  "PUBLICO-DEMONSTRATIVO",
]) {
  assert((dashboard.includes(phrase) || aiPage.includes(phrase)) && kit.includes(phrase), `DIC sem dataset ficticio: ${phrase}`);
}

assert(dashboard.includes("data-dic-social-showcase"), "painel DIC sem vitrine social marcada");
assert(dashboard.includes("data-dic-briefing"), "painel DIC sem briefing estruturado");
assert(dashboard.includes("data-dic-no-pii-checklist"), "painel DIC sem checklist anti-PII");
assert(dashboard.includes("app-painel-mvps.html"), "painel DIC sem retorno ao painel executivo");
assert(dashboard.includes("Fonte oficial gov.br"), "painel DIC sem fonte oficial visivel");

for (const phrase of [
  "Sem CPF",
  "Sem endereco",
  "Sem telefone",
  "Sem processo real",
  "Sem documento real",
  "Sem estrategia individual",
  "Encaminhamento humano",
]) {
  assert(dashboard.includes(phrase), `painel DIC sem limite: ${phrase}`);
}

assert(aiPage.includes("data-dic-prompt-pack"), "IA DIC sem pacote de prompts ficticio");
assert(aiPage.includes("data-dic-guardrails"), "IA DIC sem guardrails marcados");
assert(aiPage.includes("Charlie nao substitui advogado, Defensoria, orgao publico, saude, policia, emergencia ou decisao humana"), "IA DIC sem limite humano completo");
assert(aiPage.includes("sem dado pessoal e sem resolver caso real"), "IA DIC sem limite de caso real");

for (const forbidden of [
  "Digite seu CPF",
  "Informe seu endereco",
  "envie documento real",
  "estrategia juridica individual",
]) {
  assert(!dashboard.includes(forbidden) && !aiPage.includes(forbidden), `DIC ainda contem coleta/substituicao indevida: ${forbidden}`);
}

assert(panel.includes('data-package="4" data-package-status="CONCLUIDO_PUBLICADO"'), "painel executivo nao marca Pacote 4 como publicado");
assert(panel.includes("Vitrine social publicada com dataset ficticio"), "painel executivo sem resumo da entrega DIC");

console.log("DIC_SOCIAL_SHOWCASE_OK dataset=DIC-MODELO-VITRINE-2026 status=CONCLUIDO_PUBLICADO");
