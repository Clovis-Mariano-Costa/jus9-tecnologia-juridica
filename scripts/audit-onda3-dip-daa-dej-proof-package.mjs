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
  dipPage,
  daaPage,
  dejPage,
  doc,
  release,
  versionamento,
  serviceWorker,
  wranglerConfig,
] = await Promise.all([
  fs.readFile(new URL("app-painel-mvps.html", root), "utf8"),
  fs.readFile(new URL("app-demo-investidor.html", root), "utf8"),
  fs.readFile(new URL("app-demo-professor.html", root), "utf8"),
  fs.readFile(new URL("app-demo-estudante.html", root), "utf8"),
  fs.readFile(new URL("governanca/PACOTE_ONDA3_DIP_DAA_DEJ_PROVA_VALOR_2026-07-19_v1.0.0.md", root), "utf8"),
  fs.readFile(new URL("releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.1.md", root), "utf8"),
  fs.readFile(new URL("versionamento.html", root), "utf8"),
  fs.readFile(new URL("service-worker.js", root), "utf8"),
  fs.readFile(new URL("wrangler.jsonc", root), "utf8"),
]);

for (const field of ["id", "versao", "autor", "revisor_responsavel", "data", "status", "classificacao", "hash"]) {
  assert(new RegExp(`(^|\\n)${field}:`).test(doc), `documento Onda 3 sem metadado: ${field}`);
  assert(new RegExp(`(^|\\n)${field}:`).test(release), `release Onda 3 sem metadado: ${field}`);
}

for (const phrase of [
  "SEGUIR_COM_ONDA3_DIP_DAA_DEJ_PROVA_33_MIN",
  "DIP entrega pitch prudente",
  "DAA entrega plano de aula",
  "DEJ entrega estudo guiado",
  "Charlie/DAJ fica fora deste pacote",
  "nao ativa Drive real",
  "nao ativa memoria real",
  "nao altera PDPJ",
  "Video e ZIP permanecem no ultimo pacote",
]) {
  includes(doc, phrase, "documento Onda 3");
}

for (const phrase of [
  "data-onda3-dip-daa-dej-proof",
  "Onda 3 - prova DIP + DAA + DEJ",
  "Prova de 33 minutos",
  "data-package=\"5A\"",
  "Pacote 5A - DIP, DAA e DEJ",
  "data-onda3-code=\"DIP\"",
  "data-onda3-code=\"DAA\"",
  "data-onda3-code=\"DEJ\"",
  "CONCLUIR_DEMO_DIP",
  "CONCLUIR_DEMO_DAA",
  "CONCLUIR_DEMO_DEJ",
  "Video e ZIP continuam reservados ao ultimo pacote de revisao geral",
]) {
  includes(panel, phrase, "painel executivo Onda 3");
}

for (const phrase of [
  "data-dip-proof-runbook",
  "Prova DIP em 11 minutos",
  "data-dip-proof-acceptance",
  "DIP-MODELO-VITRINE-2026",
  "CONCLUIR_DEMO_DIP",
  "MANTER_EM_HOMOLOGACAO",
  "Sem promessa financeira",
  "Sem valuation real",
  "app-painel-mvps.html#onda3-dip-daa-dej",
]) {
  includes(dipPage, phrase, "pagina DIP");
}

for (const phrase of [
  "data-daa-proof-runbook",
  "Prova DAA em 11 minutos",
  "data-daa-proof-acceptance",
  "DAA-MODELO-VITRINE-2026",
  "CONCLUIR_DEMO_DAA",
  "MANTER_EM_HOMOLOGACAO",
  "Sem aluno real",
  "Sem nota automatica",
  "Sem fonte inventada",
  "app-painel-mvps.html#onda3-dip-daa-dej",
]) {
  includes(daaPage, phrase, "pagina DAA");
}

for (const phrase of [
  "data-dej-proof-runbook",
  "Prova DEJ em 8 minutos",
  "data-dej-proof-acceptance",
  "DEJ-MODELO-VITRINE-2026",
  "CONCLUIR_DEMO_DEJ",
  "MANTER_EM_HOMOLOGACAO",
  "Sem cola",
  "Sem plagio",
  "Sem trabalho pronto",
  "app-painel-mvps.html#onda3-dip-daa-dej",
]) {
  includes(dejPage, phrase, "pagina DEJ");
}

for (const phrase of [
  "Versionamento Jus 9 - v5.15",
  "PACOTE_ONDA3_DIP_DAA_DEJ_PROVA_VALOR_2026-07-19_v1.0.0.md",
  "audit-onda3-dip-daa-dej-proof-package.mjs",
  "jus9-pwa-v50-2026-07-20-pacote8-fechamento",
  "Versao 5.10 - Onda 2 DEE + DEJI + DPJ",
]) {
  includes(versionamento, phrase, "versionamento publico");
}

includes(serviceWorker, "jus9-pwa-v50-2026-07-20-pacote8-fechamento", "service worker");
includes(wranglerConfig, "governanca-1.21.8-pacote8-fechamento-1.0", "wrangler release");
includes(release, "Release v1.21.1 - Onda 3 DIP + DAA + DEJ", "release Onda 3");

console.log("ONDA3_DIP_DAA_DEJ_PROOF_PACKAGE_OK roteiro=33min mvps=DIP,DAA,DEJ status=PUBLICADO_CONTROLADO");
