import assert from "node:assert/strict";
import fs from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), "utf8");
const catalog = JSON.parse(read("data-publica/repositorios-jus9.json"));
const map = JSON.parse(read("governanca/MAPA_REPOSITORIOS_E_FONTES_MVPS_v1.0.0.json"));
const revalidation = read("governanca/RELATORIO_REVALIDACAO_14_MVPS_V4_2026-07-20_v1.0.0.md");

const catalogNames = catalog.repositories.map((repo) => repo.name).sort();
const mappedNames = map.repositoryGroups.flatMap((group) => group.repositories).sort();

assert.equal(catalogNames.length, 31);
assert.deepEqual(mappedNames, catalogNames);
assert.equal(new Set(mappedNames).size, 31);
assert.equal(map.policy.destructiveActionAuthorized, false);
assert.equal(map.policy.privateContentReplicated, false);
assert.equal(map.policy.repositoryCreationAuthorized, false);
assert.equal(map.sourceOfTruthByDomain.find((item) => item.domain === "pagina_equipe").state, "RESPONSABILIDADE_MARIANA_CODEX");
assert.equal(map.sourceOfTruthByDomain.find((item) => item.domain === "infraestrutura_cloudflare").state, "PENDENTE_DECISAO_HUMANA_ENTRE_3_REPOSITORIOS");
assert.equal(map.backlog.at(-1).priority, "ULTIMO_PACOTE");
assert.equal(map.backlog.at(-1).state, "DEFERIDO");

for (const marker of ["Cobertura tecnica: `14/14` MVPs.","PACOTE_1C_ACCEPTANCE_KIT_OK","ONDA5_DMP_DAP_DMG_PROOF_PACKAGE_OK"]) {
  assert.ok(revalidation.includes(marker), `relatorio de revalidacao sem marcador: ${marker}`);
}

console.log("MVP_REVALIDATION_REPOSITORIES_OK mvps=14 repos=31 grupos=6 destrutivo=false video_zip=deferido");

