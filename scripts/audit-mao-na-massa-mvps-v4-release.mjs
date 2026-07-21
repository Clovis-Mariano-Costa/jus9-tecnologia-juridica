import assert from "node:assert/strict";
import fs from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), "utf8");
const readJson = (path) => JSON.parse(read(path));

const versioning = read("versionamento.html");
const panel = read("app-painel-mvps.html");
const stateMap = read("mvp-o-que-ja-funciona.html");
const buildWeek = read("build-week-2026.html");
const more = read("saiba-mais.html");
const serviceWorker = read("service-worker.js");
const wrangler = read("wrangler.jsonc");
const governanceChangelog = read("governanca/CHANGELOG.md");
const docsChangelog = read("documentacao/CHANGELOG.md");
const releasesChangelog = read("releases/CHANGELOG.md");
const release = read("releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.11.md");
const finalReview = read("governanca/PACOTE_V4_08_REVISAO_GERAL_VIDEO_ZIP_DEFERIDOS_2026-07-20_v1.2.0.md");
const status = readJson("documentacao/hackathon/BUILD_WEEK_STATUS_2026.json");
const portfolio = readJson("governanca/PORTFOLIO_CANONICO_MVPS_v2.0.0.json");
const matrix = readJson("governanca/MATRIZ_CONTRATOS_E_PADROES_MVPS_v1.0.0.json");
const repositories = readJson("governanca/MAPA_REPOSITORIOS_E_FONTES_MVPS_v1.0.0.json");

for (const marker of ["Versionamento Jus 9 - v5.19","Versao 5.18 - Entrega final aos juizes","Versao 5.17 - Build reproduzivel do portal","Versao 5.16 - Mao na Massa dos MVPs v4","RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.11.md","jus9-pwa-v51-2026-07-20-mvps-v4"]) {
  assert.ok(versioning.includes(marker), `versionamento sem marcador: ${marker}`);
}
for (const marker of ["CONCLUIDO_COM_RESSALVA_CORRETIVA","AUTORIZADO_APENAS_PARA_REVISAO_E_HOMOLOGACAO_CONTROLADA"]) {
  assert.ok(panel.includes(marker), `painel sem estado: ${marker}`);
}
assert.ok(stateMap.includes("Charlie Core 1.2.0"));
assert.ok(buildWeek.includes("Controlled review only"));
assert.ok(more.includes("Registro publico da v5.17"));
assert.ok(serviceWorker.includes("jus9-pwa-v54-2026-07-21-g6c3-governance-api"));
assert.ok(wrangler.includes("governanca-1.21.15-g6c3-api-1.0"));
assert.ok(governanceChangelog.includes("## 1.16.11 - 2026-07-20"));
assert.ok(docsChangelog.includes("## 1.17.8 - 2026-07-20"));
assert.ok(releasesChangelog.includes("## 1.21.11 - 2026-07-20"));
assert.ok(release.includes("runtime_alterado: true"));
assert.ok(finalReview.includes("APROVADO_TECNICAMENTE_PARA_REVISAO_HUMANA_E_MERGE_SEM_VIDEO_ZIP_FINAL"));
assert.equal(status.metadata.versao, "1.7.0");
assert.equal(status.mvpConsolidation.package2State, "CONCLUIDO_COM_RESSALVA_CORRETIVA");
assert.equal(status.mvpConsolidation.package6State, "AUTORIZADO_APENAS_PARA_REVISAO_E_HOMOLOGACAO_CONTROLADA");
assert.equal(status.submissionArtifacts.finalZip.state, "ready_hashed_scanned_private");
assert.equal(status.submissionArtifacts.demoVideo.state, "script_ready_human_recording_pending");
assert.equal(portfolio.mvps.length, 14);
assert.equal(matrix.coreContract.version, "1.2.0");
assert.equal(repositories.repositoryGroups.flatMap((group) => group.repositories).length, 31);

console.log("MAO_NA_MASSA_MVPS_V4_RELEASE_OK portal=5.18 release=1.21.13 mvps=14 repos=31 zip=privado-pronto video=roteiro-pronto");
