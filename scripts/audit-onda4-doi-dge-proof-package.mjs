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
  doiPage,
  dgePage,
  doc,
  release,
  versionamento,
  serviceWorker,
  wranglerConfig,
] = await Promise.all([
  fs.readFile(new URL("app-painel-mvps.html", root), "utf8"),
  fs.readFile(new URL("app-demo-orgao-publico.html", root), "utf8"),
  fs.readFile(new URL("app-demo-administrador.html", root), "utf8"),
  fs.readFile(new URL("governanca/PACOTE_ONDA4_DOI_DGE_PROVA_VALOR_2026-07-19_v1.0.0.md", root), "utf8"),
  fs.readFile(new URL("releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.4.md", root), "utf8"),
  fs.readFile(new URL("versionamento.html", root), "utf8"),
  fs.readFile(new URL("service-worker.js", root), "utf8"),
  fs.readFile(new URL("wrangler.jsonc", root), "utf8"),
]);

for (const field of ["id", "versao", "autor", "revisor_responsavel", "data", "status", "classificacao", "hash"]) {
  assert(new RegExp(`(^|\\n)${field}:`).test(doc), `documento Onda 4 sem metadado: ${field}`);
  assert(new RegExp(`(^|\\n)${field}:`).test(release), `release Onda 4 sem metadado: ${field}`);
}

for (const phrase of [
  "SEGUIR_COM_ONDA4_DOI_DGE_PROVA_22_MIN",
  "DOI entrega fluxo institucional demonstrativo sem ato oficial",
  "DGE entrega console de governanca demonstrativo",
  "Charlie/DAJ fica fora deste pacote",
  "nao ativa Drive real",
  "nao ativa memoria real",
  "nao altera PDPJ",
  "Video e ZIP permanecem no ultimo pacote",
]) {
  includes(doc, phrase, "documento Onda 4");
}

for (const phrase of [
  "data-onda4-doi-dge-proof",
  "Onda 4 - prova DOI + DGE",
  "Prova de 22 minutos",
  "data-package=\"5B\"",
  "Pacote 5B - DOI e DGE",
  "data-onda4-code=\"DOI\"",
  "data-onda4-code=\"DGE\"",
  "CONCLUIR_DEMO_DOI",
  "CONCLUIR_DEMO_DGE",
  "Video e ZIP continuam reservados ao ultimo pacote de revisao geral",
]) {
  includes(panel, phrase, "painel executivo Onda 4");
}

for (const phrase of [
  "data-doi-proof-runbook",
  "Prova DOI em 11 minutos",
  "data-doi-proof-acceptance",
  "DOI-MODELO-VITRINE-2026",
  "CONCLUIR_DEMO_DOI",
  "MANTER_EM_HOMOLOGACAO",
  "Sem ato oficial",
  "Sem autoridade real",
  "Sem protocolo real",
  "app-painel-mvps.html#onda4-doi-dge",
]) {
  includes(doiPage, phrase, "pagina DOI");
}

for (const phrase of [
  "data-dge-proof-runbook",
  "Prova DGE em 8 minutos",
  "data-dge-proof-acceptance",
  "DGE-MODELO-VITRINE-2026",
  "CONCLUIR_DEMO_DGE",
  "MANTER_EM_HOMOLOGACAO",
  "Sem permissao real",
  "Sem token",
  "Sem cofre real",
  "Sem segredo",
  "app-painel-mvps.html#onda4-doi-dge",
]) {
  includes(dgePage, phrase, "pagina DGE");
}

for (const phrase of [
  "Versionamento Jus 9 - v5.15",
  "PACOTE_ONDA4_DOI_DGE_PROVA_VALOR_2026-07-19_v1.0.0.md",
  "audit-onda4-doi-dge-proof-package.mjs",
  "jus9-pwa-v50-2026-07-20-pacote8-fechamento",
  "Versao 5.11 - Onda 3 DIP + DAA + DEJ",
]) {
  includes(versionamento, phrase, "versionamento publico");
}

includes(serviceWorker, "jus9-pwa-v51-2026-07-21-g6c2-rbac-granular", "service worker");
includes(wranglerConfig, "governanca-1.21.11-g6c2-rbac-granular-1.0", "wrangler release");
includes(release, "Release v1.21.4 - Onda 4 DOI + DGE", "release Onda 4");

console.log("ONDA4_DOI_DGE_PROOF_PACKAGE_OK roteiro=22min mvps=DOI,DGE status=PUBLICADO_CONTROLADO");
