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
  deePage,
  dejiPage,
  dpjPage,
  doc,
  release,
  versionamento,
  serviceWorker,
  wranglerConfig,
] = await Promise.all([
  fs.readFile(new URL("app-painel-mvps.html", root), "utf8"),
  fs.readFile(new URL("app-demo-escritorio.html", root), "utf8"),
  fs.readFile(new URL("app-demo-empresa.html", root), "utf8"),
  fs.readFile(new URL("app-demo-perito.html", root), "utf8"),
  fs.readFile(new URL("governanca/PACOTE_ONDA2_DEE_DEJI_DPJ_PROVA_VALOR_2026-07-19_v1.0.0.md", root), "utf8"),
  fs.readFile(new URL("releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.20.1.md", root), "utf8"),
  fs.readFile(new URL("versionamento.html", root), "utf8"),
  fs.readFile(new URL("service-worker.js", root), "utf8"),
  fs.readFile(new URL("wrangler.jsonc", root), "utf8"),
]);

for (const field of ["id", "versao", "autor", "revisor_responsavel", "data", "status", "classificacao", "hash"]) {
  assert(new RegExp(`(^|\\n)${field}:`).test(doc), `documento Onda 2 sem metadado: ${field}`);
  assert(new RegExp(`(^|\\n)${field}:`).test(release), `release Onda 2 sem metadado: ${field}`);
}

for (const phrase of [
  "SEGUIR_COM_ONDA2_DEE_DEJI_DPJ_PROVA_35_MIN",
  "DEE entrega rotina de escritorio com papeis",
  "DEJI entrega juridico interno com matriz de risco",
  "DPJ entrega laudo tecnico demonstrativo verificavel",
  "Charlie/DAJ fica fora deste pacote",
  "nao ativa Drive real",
  "nao ativa memoria real",
  "Video e ZIP permanecem no ultimo pacote",
]) {
  includes(doc, phrase, "documento Onda 2");
}

for (const phrase of [
  "data-onda2-dee-deji-dpj-proof",
  "Onda 2 - prova DEE + DEJI + DPJ",
  "Prova de 35 minutos",
  "data-onda2-code=\"DEE\"",
  "data-onda2-code=\"DEJI\"",
  "data-onda2-code=\"DPJ\"",
  "CONCLUIR_DEMO_DEE",
  "CONCLUIR_DEMO_DEJI",
  "CONCLUIR_DEMO_DPJ",
  "Video e ZIP continuam reservados ao ultimo pacote de revisao geral",
]) {
  includes(panel, phrase, "painel executivo Onda 2");
}

for (const phrase of [
  "data-dee-proof-runbook",
  "Prova DEE em 12 minutos",
  "data-dee-proof-acceptance",
  "CONCLUIR_DEMO_DEE",
  "MANTER_EM_HOMOLOGACAO",
  "Sem cliente real",
  "Sem assinatura automatica",
  "app-painel-mvps.html#onda2-dee-deji-dpj",
]) {
  includes(deePage, phrase, "pagina DEE");
}

for (const phrase of [
  "data-deji-proof-runbook",
  "Prova DEJI em 12 minutos",
  "data-deji-proof-acceptance",
  "CONCLUIR_DEMO_DEJI",
  "MANTER_EM_HOMOLOGACAO",
  "Sem contrato real",
  "Sem segredo empresarial",
  "Sem aprovacao automatica",
  "app-painel-mvps.html#onda2-dee-deji-dpj",
]) {
  includes(dejiPage, phrase, "pagina DEJI");
}

for (const phrase of [
  "data-dpj-proof-runbook",
  "Prova DPJ em 8 minutos",
  "data-dpj-proof-acceptance",
  "CONCLUIR_DEMO_DPJ",
  "MANTER_EM_HOMOLOGACAO",
  "Sem evidencia real",
  "Sem laudo final automatico",
  "app-painel-mvps.html#onda2-dee-deji-dpj",
]) {
  includes(dpjPage, phrase, "pagina DPJ");
}

for (const phrase of [
  "Versionamento Jus 9 - v5.19",
  "PACOTE_ONDA2_DEE_DEJI_DPJ_PROVA_VALOR_2026-07-19_v1.0.0.md",
  "audit-onda2-dee-deji-dpj-proof-package.mjs",
  "Versao 5.10 - Onda 2 DEE + DEJI + DPJ",
]) {
  includes(versionamento, phrase, "versionamento publico");
}

includes(serviceWorker, "jus9-pwa-v57-2026-07-21-github-security", "service worker");
includes(wranglerConfig, "governanca-1.21.15-g6c3-api-1.0", "wrangler release");
includes(release, "Release v1.20.1 - Onda 2 DEE + DEJI + DPJ", "release Onda 2");

console.log("ONDA2_DEE_DEJI_DPJ_PROOF_PACKAGE_OK roteiro=35min mvps=DEE,DEJI,DPJ status=PUBLICADO_CONTROLADO");
