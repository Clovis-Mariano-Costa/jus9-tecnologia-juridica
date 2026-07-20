import fs from "node:fs/promises";

const root = new URL("../", import.meta.url);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function includes(text, needle, label) {
  assert(text.includes(needle), `${label}: ausente "${needle}"`);
}

const [
  doc,
  humanGuide,
  videoScript,
  zipManifest,
  panel,
  buildWeek,
  saibaMais,
  status,
  release,
  versionamento,
  serviceWorker,
  wranglerConfig,
] = await Promise.all([
  fs.readFile(new URL("governanca/PACOTE8_REVISAO_GERAL_VIDEO_ZIP_BUILD_WEEK_2026-07-20_v1.0.0.md", root), "utf8"),
  fs.readFile(new URL("documentacao/hackathon/FECHAMENTO_HUMANO_BUILD_WEEK_2026.md", root), "utf8"),
  fs.readFile(new URL("documentacao/hackathon/VIDEO_ROTEIRO_BUILD_WEEK_2026.md", root), "utf8"),
  fs.readFile(new URL("documentacao/hackathon/ZIP_FINAL_MANIFESTO_PENDENTE_2026.md", root), "utf8"),
  fs.readFile(new URL("app-painel-mvps.html", root), "utf8"),
  fs.readFile(new URL("build-week-2026.html", root), "utf8"),
  fs.readFile(new URL("saiba-mais.html", root), "utf8"),
  fs.readFile(new URL("documentacao/hackathon/BUILD_WEEK_STATUS_2026.json", root), "utf8").then(JSON.parse),
  fs.readFile(new URL("releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.8.md", root), "utf8"),
  fs.readFile(new URL("versionamento.html", root), "utf8"),
  fs.readFile(new URL("service-worker.js", root), "utf8"),
  fs.readFile(new URL("wrangler.jsonc", root), "utf8"),
]);

for (const file of [doc, humanGuide, videoScript, zipManifest, release]) {
  for (const field of ["id", "versao", "autor", "revisor_responsavel", "data", "status", "classificacao", "hash"]) {
    assert(new RegExp(`(^|\\n)${field}:`).test(file), `artefato Pacote 8 sem metadado: ${field}`);
  }
}

for (const phrase of [
  "DECISAO_PACOTE8_PREPARAR_FECHAMENTO_SEM_SUBMISSAO_FINAL",
  "REVISAO_GERAL_EXECUTADA",
  "VIDEO_PENDENTE_GRAVACAO_HUMANA",
  "ZIP_PENDENTE_CONGELAMENTO_HUMANO",
  "NAO_SUBMETER_ENQUANTO_HOUVER_BLOQUEIOS",
  "MANTER_FECHAMENTO_TECNICO_PRONTO_COM_SUBMISSAO_BLOQUEADA_POR_GATES_HUMANOS",
]) {
  includes(doc, phrase, "documento governado Pacote 8");
}

for (const code of ["DAJ", "DED", "DIC", "DEE", "DEJI", "DPJ", "DIP", "DAA", "DEJ", "DOI", "DGE", "DMP", "DAP", "DMG"]) {
  includes(doc, `| ${code} |`, "documento governado Pacote 8");
}

for (const phrase of [
  "Eligibility written clarification",
  "Judge sandbox ready",
  "Asset-rights declaration signed",
  "DataJud terms reviewed",
  "Tracked tmp cleanup authorized",
  "Final ZIP SHA-256",
]) {
  includes(humanGuide, phrase, "guia humano");
}

for (const phrase of [
  "VIDEO_URL_PENDENTE",
  "Target: public video under three minutes",
  "Do not show real account names",
  "build-week-2026.html#final-package",
]) {
  includes(videoScript, phrase, "roteiro de video");
}

for (const phrase of [
  "ZIP_FINAL_PENDENTE_HASH",
  "Final ZIP path",
  "SHA-256",
  "tracked legacy ZIP extraction under `tmp`",
]) {
  includes(zipManifest, phrase, "manifesto ZIP");
}

for (const phrase of [
  "data-pacote8-fechamento",
  "Pacote 8 - fechamento tecnico",
  "REVISAO_GERAL_EXECUTADA",
  "VIDEO_PENDENTE_GRAVACAO_HUMANA",
  "ZIP_PENDENTE_CONGELAMENTO_HUMANO",
  "build-week-2026.html#final-package",
]) {
  includes(panel, phrase, "painel executivo Pacote 8");
}

for (const phrase of [
  "id=\"final-package\"",
  "data-build-week-final-package",
  "Final package gate",
  "Human gates remain",
  "Pacote8_REVISAO_EXECUTADA_GATES_HUMANOS",
]) {
  includes(buildWeek, phrase, "Build Week Pacote 8");
}

includes(saibaMais, "build-week-2026.html#final-package", "Saiba Mais fechamento Build Week");

assert(status.metadata?.versao === "1.3.0", "status Build Week precisa estar na versao 1.3.0");
assert(status.mvpConsolidation?.finalPackageState === "PACOTE8_REVISAO_EXECUTADA_GATES_HUMANOS", "status Build Week sem estado final do Pacote 8");
assert(status.submissionArtifacts?.package8Closeout?.state === "review_executed_human_gates_pending", "status Build Week sem closeout do Pacote 8");
assert(status.submissionArtifacts?.finalZip?.state === "deferred_until_human_freeze", "ZIP final nao deve ser declarado pronto");
assert(status.submissionArtifacts?.demoVideo?.state === "deferred_until_human_recording", "video final nao deve ser declarado pronto");

for (const phrase of [
  "Versionamento Jus 9 - v5.15",
  "Versao 5.15 - Pacote 8 fechamento tecnico",
  "RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.8.md",
  "jus9-pwa-v50-2026-07-20-pacote8-fechamento",
]) {
  includes(versionamento, phrase, "versionamento Pacote 8");
}

includes(serviceWorker, "jus9-pwa-v50-2026-07-20-pacote8-fechamento", "service worker Pacote 8");
includes(wranglerConfig, "governanca-1.21.8-pacote8-fechamento-1.0", "wrangler Pacote 8");
includes(release, "Release v1.21.8 - Pacote 8 fechamento tecnico", "release Pacote 8");

console.log("PACOTE8_FECHAMENTO_OK revisao=executada video=pendente zip=pendente gates=humanos");
