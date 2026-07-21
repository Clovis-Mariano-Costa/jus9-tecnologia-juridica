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
  dmpPage,
  dapPage,
  dmgPage,
  doc,
  release,
  versionamento,
  serviceWorker,
  wranglerConfig,
] = await Promise.all([
  fs.readFile(new URL("app-painel-mvps.html", root), "utf8"),
  fs.readFile(new URL("app-demo-promotor.html", root), "utf8"),
  fs.readFile(new URL("app-demo-delegado.html", root), "utf8"),
  fs.readFile(new URL("app-demo-juiz.html", root), "utf8"),
  fs.readFile(new URL("governanca/PACOTE_ONDA5_DMP_DAP_DMG_PROVA_VALOR_2026-07-20_v1.0.0.md", root), "utf8"),
  fs.readFile(new URL("releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.5.md", root), "utf8"),
  fs.readFile(new URL("versionamento.html", root), "utf8"),
  fs.readFile(new URL("service-worker.js", root), "utf8"),
  fs.readFile(new URL("wrangler.jsonc", root), "utf8"),
]);

for (const field of ["id", "versao", "autor", "revisor_responsavel", "data", "status", "classificacao", "hash"]) {
  assert(new RegExp(`(^|\\n)${field}:`).test(doc), `documento Onda 5 sem metadado: ${field}`);
  assert(new RegExp(`(^|\\n)${field}:`).test(release), `release Onda 5 sem metadado: ${field}`);
}

for (const phrase of [
  "SEGUIR_COM_ONDA5_DMP_DAP_DMG_PROVA_32_MIN",
  "DMP entrega triagem ministerial educativa",
  "DAP entrega organizacao policial demonstrativa",
  "DMG entrega estudo de gabinete conceitual",
  "Charlie/DAJ fica fora deste pacote",
  "nao ativa Drive real",
  "nao ativa memoria real",
  "nao altera PDPJ",
  "Video e ZIP permanecem no ultimo pacote",
]) {
  includes(doc, phrase, "documento Onda 5");
}

for (const phrase of [
  "data-onda5-dmp-dap-dmg-proof",
  "Onda 5 - prova DMP + DAP + DMG",
  "Prova de 32 minutos",
  "data-package=\"5C\"",
  "Pacote 5C - DMP, DAP e DMG",
  "data-onda5-code=\"DMP\"",
  "data-onda5-code=\"DAP\"",
  "data-onda5-code=\"DMG\"",
  "CONCLUIR_DEMO_DMP",
  "CONCLUIR_DEMO_DAP",
  "CONCLUIR_DEMO_DMG",
  "Video e ZIP continuam reservados ao ultimo pacote de revisao geral",
]) {
  includes(panel, phrase, "painel executivo Onda 5");
}

for (const phrase of [
  "data-dmp-proof-runbook",
  "Prova DMP em 10 minutos",
  "data-dmp-proof-acceptance",
  "DMP-MODELO-VITRINE-2026",
  "CONCLUIR_DEMO_DMP",
  "MANTER_EM_HOMOLOGACAO",
  "Sem denuncia real",
  "Sem requisicao real",
  "Sem medida real",
  "Sem persecucao penal",
  "app-painel-mvps.html#onda5-dmp-dap-dmg",
]) {
  includes(dmpPage, phrase, "pagina DMP");
}

for (const phrase of [
  "data-dap-proof-runbook",
  "Prova DAP em 10 minutos",
  "data-dap-proof-acceptance",
  "DAP-MODELO-VITRINE-2026",
  "CONCLUIR_DEMO_DAP",
  "MANTER_EM_HOMOLOGACAO",
  "Sem investigacao real",
  "Sem diligencia real",
  "Sem prova sensivel",
  "Sem urgencia real",
  "app-painel-mvps.html#onda5-dmp-dap-dmg",
]) {
  includes(dapPage, phrase, "pagina DAP");
}

for (const phrase of [
  "data-dmg-proof-runbook",
  "Prova DMG em 8 minutos",
  "data-dmg-proof-acceptance",
  "DMG-MODELO-VITRINE-2026",
  "CONCLUIR_DEMO_DMG",
  "MANTER_EM_HOMOLOGACAO",
  "Sem decisao judicial",
  "Sem sentenca",
  "Sem despacho",
  "Sem minuta decisoria",
  "app-painel-mvps.html#onda5-dmp-dap-dmg",
]) {
  includes(dmgPage, phrase, "pagina DMG");
}

for (const phrase of [
  "Versionamento Jus 9 - v5.17",
  "PACOTE_ONDA5_DMP_DAP_DMG_PROVA_VALOR_2026-07-20_v1.0.0.md",
  "audit-onda5-dmp-dap-dmg-proof-package.mjs",
  "jus9-pwa-v50-2026-07-20-pacote8-fechamento",
  "Versao 5.13 - Onda 4 DOI + DGE",
]) {
  includes(versionamento, phrase, "versionamento publico");
}

includes(serviceWorker, "jus9-pwa-v52-2026-07-20-build-reproduzivel", "service worker");
includes(wranglerConfig, "governanca-1.21.12-build-reproduzivel-1.0", "wrangler release");
includes(release, "Release v1.21.5 - Onda 5 DMP + DAP + DMG", "release Onda 5");

console.log("ONDA5_DMP_DAP_DMG_PROOF_PACKAGE_OK roteiro=32min mvps=DMP,DAP,DMG status=PUBLICADO_CONTROLADO");
