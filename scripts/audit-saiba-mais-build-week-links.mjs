import fs from "node:fs/promises";

const root = new URL("../", import.meta.url);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function semverAtLeast(actual, minimum) {
  const current = String(actual || "").split(".").map(Number);
  const required = minimum.split(".").map(Number);
  return required.every((part, index) => (current[index] || 0) === part)
    || required.some((part, index) => {
      if ((current[index] || 0) === part) return false;
      return (current[index] || 0) > part
        && required.slice(0, index).every((previous, previousIndex) => (current[previousIndex] || 0) === previous);
    });
}

const [buildWeek, saibaMais, mvpPage, leaderPage, stateMap, panel, sitemap, serviceWorker, buildWeekStatus, versionamento, syncScript] = await Promise.all([
  fs.readFile(new URL("build-week-2026.html", root), "utf8"),
  fs.readFile(new URL("saiba-mais.html", root), "utf8"),
  fs.readFile(new URL("mvp.html", root), "utf8"),
  fs.readFile(new URL("lider-mvp.html", root), "utf8"),
  fs.readFile(new URL("mvp-o-que-ja-funciona.html", root), "utf8"),
  fs.readFile(new URL("app-painel-mvps.html", root), "utf8"),
  fs.readFile(new URL("sitemap.xml", root), "utf8"),
  fs.readFile(new URL("service-worker.js", root), "utf8"),
  fs.readFile(new URL("documentacao/hackathon/BUILD_WEEK_STATUS_2026.json", root), "utf8").then(JSON.parse),
  fs.readFile(new URL("versionamento.html", root), "utf8"),
  fs.readFile(new URL("scripts/Sync-PortalDist.ps1", root), "utf8"),
]);

assert(buildWeek.includes('id="mvp-scope"') && buildWeek.includes("data-build-week-mvp-scope"), "Build Week sem secao de escopo dos MVPs");
for (const target of ["saiba-mais.html", "mvp-o-que-ja-funciona.html", "app-painel-mvps.html"]) {
  assert(buildWeek.includes(`href="${target}"`), `Build Week sem link para ${target}`);
}

assert(saibaMais.includes('href="build-week-2026.html"'), "Saiba Mais sem link para Build Week");
assert(saibaMais.includes("Build Week 2026"), "Saiba Mais sem card/menu Build Week");
for (const target of ["app-painel-mvps.html", "mvp-o-que-ja-funciona.html", "mvp.html#demos-jus9"]) {
  assert(saibaMais.includes(`href="${target}"`), `Saiba Mais sem link para ${target}`);
}

assert(mvpPage.includes('href="saiba-mais.html"'), "mvp.html sem atalho explicito para Saiba Mais");
assert(leaderPage.includes('href="saiba-mais.html"'), "lider-mvp.html sem atalho explicito para Saiba Mais");
assert(panel.includes('href="saiba-mais.html"') && panel.includes('href="build-week-2026.html"') && panel.includes('href="mvp-o-que-ja-funciona.html"'), "painel executivo sem atalhos Saiba Mais/Build Week/estado");

assert(stateMap.includes("data-state-map"), "pagina O que ja funciona sem marcador de estado");
for (const state of ["ATIVO_PUBLICADO", "DEMONSTRATIVO_PUBLICADO", "PLANEJADO", "BLOQUEADO"]) {
  assert(stateMap.includes(state), `pagina O que ja funciona sem estado ${state}`);
}

for (const url of [
  "https://jus9tecnologia.com.br/saiba-mais.html",
  "https://jus9tecnologia.com.br/build-week-2026.html",
  "https://jus9tecnologia.com.br/app-painel-mvps.html",
  "https://jus9tecnologia.com.br/mvp-o-que-ja-funciona.html",
]) {
  assert(sitemap.includes(`<loc>${url}</loc>`), `sitemap sem ${url}`);
}

for (const asset of ["/saiba-mais.html", "/versionamento.html", "/build-week-2026.html", "/app-painel-mvps.html", "/mvp-o-que-ja-funciona.html"]) {
  assert(serviceWorker.includes(asset), `service worker sem cache publico para ${asset}`);
}

assert(semverAtLeast(buildWeekStatus.metadata?.versao, "1.2.0"), "manifesto Build Week anterior a versao 1.2.0");
assert(buildWeekStatus.claims?.codexGpt56SolDevelopment?.state === "verified_local_session_metadata", "manifesto Build Week sem evidencia Codex Sol verificada");
assert(buildWeekStatus.claims?.codexGpt56SolDevelopment?.claimBoundary?.includes("Development-session evidence only"), "manifesto Build Week sem limite entre desenvolvimento e runtime");
assert(buildWeekStatus.mvpConsolidation?.operationalPilot === "DAJ", "manifesto Build Week sem DAJ como piloto operacional");
assert(buildWeekStatus.mvpConsolidation?.sharedCore === "Charlie Core 1.2.0 implemented and covered by automated tests", "manifesto Build Week sem Charlie Core 1.2.0 implementado");
assert(buildWeekStatus.mvpConsolidation?.package2State === "CONCLUIDO_COM_RESSALVA_CORRETIVA", "manifesto Build Week sem Pacote 2 reconciliado");
assert(buildWeekStatus.mvpConsolidation?.dajAnalysisContract?.includes("Laudo de Analise DAJ"), "manifesto Build Week sem contrato de laudo DAJ");
assert(versionamento.includes("Versionamento Jus 9 - v5.19") && versionamento.includes("Versao 5.19 - API verificavel de governanca da Charlie") && versionamento.includes("Versao 5.18 - Entrega final aos juizes") && versionamento.includes("Versao 5.17 - Build reproduzivel do portal") && versionamento.includes("Versao 5.16 - Mao na Massa dos MVPs v4") && versionamento.includes("Versao 5.15 - Pacote 8 fechamento tecnico") && versionamento.includes("Versao 5.14 - Onda 5 DMP + DAP + DMG") && versionamento.includes("Versao 5.13 - Onda 4 DOI + DGE") && versionamento.includes("Pesquisa federada de repositorios GitHub") && versionamento.includes("PACOTE8_REVISAO_GERAL_VIDEO_ZIP_BUILD_WEEK_2026-07-20_v1.0.0.md") && versionamento.includes("PACOTE_ONDA5_DMP_DAP_DMG_PROVA_VALOR_2026-07-20_v1.0.0.md") && versionamento.includes("PACOTE_ONDA4_DOI_DGE_PROVA_VALOR_2026-07-19_v1.0.0.md") && versionamento.includes("PACOTE_ONDA3_DIP_DAA_DEJ_PROVA_VALOR_2026-07-19_v1.0.0.md") && versionamento.includes("PACOTE_ONDA2_DEE_DEJI_DPJ_PROVA_VALOR_2026-07-19_v1.0.0.md") && versionamento.includes("PACOTE_ONDA1_DED_DIC_PROVA_VALOR_2026-07-19_v1.0.0.md") && versionamento.includes("MAPA_PROVAS_MVPS_GERAIS_v1.0.0.md") && versionamento.includes("worker_daj_laudo_governado") && versionamento.includes("CRONOGRAMA_MAO_NA_MASSA_CHARLIE_ECHO_v3.1.1.md"), "versionamento publico sem registro v5.19 e historico integrado");
assert(syncScript.includes("'sitemap.xml'"), "Sync-PortalDist nao publica sitemap.xml");

console.log("SAIBA_MAIS_BUILD_WEEK_LINKS_OK links=build-week,saiba-mais,state-map,panel");
