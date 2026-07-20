import fs from "node:fs/promises";

const root = new URL("../", import.meta.url);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function includes(text, needle, label) {
  assert(text.includes(needle), `${label}: ausente "${needle}"`);
}

const [
  panel,
  dedPage,
  dicPage,
  doc,
  release,
  versionamento,
  serviceWorker,
  wranglerConfig,
] = await Promise.all([
  fs.readFile(new URL("app-painel-mvps.html", root), "utf8"),
  fs.readFile(new URL("app-demo-autor-editor.html", root), "utf8"),
  fs.readFile(new URL("app-demo-cidadao.html", root), "utf8"),
  fs.readFile(new URL("governanca/PACOTE_ONDA1_DED_DIC_PROVA_VALOR_2026-07-19_v1.0.0.md", root), "utf8"),
  fs.readFile(new URL("releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.18.1.md", root), "utf8"),
  fs.readFile(new URL("versionamento.html", root), "utf8"),
  fs.readFile(new URL("service-worker.js", root), "utf8"),
  fs.readFile(new URL("wrangler.jsonc", root), "utf8"),
]);

for (const field of ["id", "versao", "autor", "revisor_responsavel", "data", "status", "classificacao", "hash"]) {
  assert(new RegExp(`(^|\\n)${field}:`).test(doc), `documento Onda 1 sem metadado: ${field}`);
  assert(new RegExp(`(^|\\n)${field}:`).test(release), `release Onda 1 sem metadado: ${field}`);
}

for (const phrase of [
  "SEGUIR_COM_ONDA1_DED_DIC_PROVA_30_MIN",
  "DED entrega autoria/editoria com artefato revisavel",
  "DIC entrega linguagem cidada segura",
  "Charlie/DAJ fica fora deste pacote",
  "nao ativa Drive real",
  "nao ativa memoria real",
  "Video e ZIP permanecem no ultimo pacote",
]) {
  includes(doc, phrase, "documento Onda 1");
}

for (const phrase of [
  "data-onda1-ded-dic-proof",
  "Onda 1 - prova DED + DIC",
  "Prova de 30 minutos",
  "data-onda1-code=\"DED\"",
  "data-onda1-code=\"DIC\"",
  "CONCLUIR_DEMO_DED",
  "CONCLUIR_DEMO_DIC",
  "Video e ZIP continuam reservados ao ultimo pacote de revisao geral",
]) {
  includes(panel, phrase, "painel executivo Onda 1");
}

for (const phrase of [
  "data-ded-proof-runbook",
  "Prova DED em 15 minutos",
  "data-ded-proof-acceptance",
  "CONCLUIR_DEMO_DED",
  "MANTER_EM_HOMOLOGACAO",
  "Sem manuscrito real",
  "Sem Drive real",
  "app-painel-mvps.html#onda1-ded-dic",
]) {
  includes(dedPage, phrase, "pagina DED");
}

for (const phrase of [
  "data-dic-proof-runbook",
  "Prova DIC em 10 minutos",
  "data-dic-proof-acceptance",
  "CONCLUIR_DEMO_DIC",
  "MANTER_EM_HOMOLOGACAO",
  "Sem CPF",
  "Encaminhamento humano",
  "app-painel-mvps.html#onda1-ded-dic",
]) {
  includes(dicPage, phrase, "pagina DIC");
}

for (const phrase of [
  "Versionamento Jus 9 - v5.14",
  "PACOTE_ONDA1_DED_DIC_PROVA_VALOR_2026-07-19_v1.0.0.md",
  "audit-onda1-ded-dic-proof-package.mjs",
  "Versao 5.9 - Onda 1 DED + DIC",
]) {
  includes(versionamento, phrase, "versionamento publico");
}

includes(serviceWorker, "jus9-pwa-v49-2026-07-20-onda5-dmp-dap-dmg", "service worker atual");
includes(wranglerConfig, "governanca-1.21.5-onda5-dmp-dap-dmg-1.0", "wrangler release atual");
includes(release, "Release v1.18.1 - Onda 1 DED + DIC", "release Onda 1");

console.log("ONDA1_DED_DIC_PROOF_PACKAGE_OK roteiro=30min mvps=DED,DIC status=PUBLICADO_CONTROLADO");
