import assert from "node:assert/strict";
import fs from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), "utf8");
const portfolio = JSON.parse(read("governanca/PORTFOLIO_CANONICO_MVPS_v2.0.0.json"));
const profiles = JSON.parse(read("data-publica/mvp-perfis.json"));
const panel = read("app-painel-mvps.html");
const stateMap = read("mvp-o-que-ja-funciona.html");
const buildWeek = read("build-week-2026.html");

const expectedCodes = ["DAJ","DAA","DEJ","DIC","DPJ","DIP","DEE","DEJI","DOI","DGE","DMG","DMP","DAP","DED"];
const portfolioCodes = portfolio.mvps.map((mvp) => mvp.code);
const profileCodes = profiles.profiles.map((profile) => profile.dossier_code);

assert.equal(portfolio.schema, "jus9.mvp.portfolio.v2");
assert.deepEqual(portfolioCodes, expectedCodes);
assert.deepEqual(profileCodes, expectedCodes);
assert.equal(new Set(portfolioCodes).size, 14);
assert.equal(portfolio.mvps.filter((mvp) => mvp.state === "PILOTO_OPERACIONAL_DADOS_FICTICIOS").length, 1);
assert.equal(portfolio.mvps.filter((mvp) => mvp.state === "DEMO_PUBLICA_GOVERNADA").length, 10);
assert.equal(portfolio.mvps.filter((mvp) => mvp.state === "DEMO_PUBLICA_RESTRITA_ALTA_SENSIBILIDADE").length, 3);
assert.deepEqual(
  portfolio.baselineRequirements.map((item) => item.id),
  ["MVP-IAM","MVP-SEC","MVP-LGPD","MVP-ETH","MVP-AI","MVP-AUD","MVP-DAT","MVP-UX","MVP-TST","MVP-OPS"]
);
assert.equal(portfolio.teamPageBoundary.state, "RESPONSABILIDADE_EXTERNA");
assert.match(portfolio.teamPageBoundary.owner, /Mariana/);
assert.equal(portfolio.portfolioPolicy.realDataInPublicDemo, false);
assert.equal(portfolio.portfolioPolicy.autonomousLegalEffect, false);

for (const mvp of portfolio.mvps) {
  for (const key of ["name","audience","slug","state","risk","problem","value","publicScope","dataPolicy","evidence","productOwner","technicalOwner"]) {
    assert.ok(mvp[key], `${mvp.code}: campo obrigatorio ausente: ${key}`);
  }
  assert.ok(Array.isArray(mvp.exclusions) && mvp.exclusions.length >= 3, `${mvp.code}: exclusoes insuficientes`);
  assert.ok(Array.isArray(mvp.dependencies) && mvp.dependencies.includes("charlie-core@1.2.0"), `${mvp.code}: Core 1.2.0 ausente`);
  assert.equal(mvp.productOwner, "PENDENTE_DESIGNACAO_HUMANA");
  assert.equal(mvp.technicalOwner, "PENDENTE_DESIGNACAO_HUMANA");
}

for (const marker of ["CONCLUIDO_COM_RESSALVA_CORRETIVA","AUTORIZADO_APENAS_PARA_REVISAO_E_HOMOLOGACAO_CONTROLADA"]) {
  assert.ok(panel.includes(marker), `painel sem estado reconciliado: ${marker}`);
}
for (const marker of ["Charlie Core 1.2.0","Pacote 2 concluido","Memoria e Drive controlados"]) {
  assert.ok(stateMap.includes(marker), `mapa publico sem marcador: ${marker}`);
}
for (const marker of ["Charlie Core 1.2.0","Implemented","Controlled review only"]) {
  assert.ok(buildWeek.includes(marker), `Build Week sem marcador: ${marker}`);
}

console.log("PORTFOLIO_MVPS_V2_OK mvps=14 piloto=1 demos=10 restritos=3 requisitos=10 equipe=externa");

