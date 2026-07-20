import assert from "node:assert/strict";
import fs from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), "utf8");
const review = read("governanca/PACOTE_V4_08_REVISAO_GERAL_VIDEO_ZIP_DEFERIDOS_2026-07-20_v1.0.0.md");

for (const field of ["id","versao","autor","revisor_responsavel","data","status","classificacao","hash"]) {
  assert.match(review, new RegExp(`(^|\\n)${field}:`), `revisao V4-08 sem metadado: ${field}`);
}
for (const packageId of ["V4-01","V4-02","V4-03","V4-04","V4-05","V4-06","V4-07","V4-08"]) {
  assert.ok(review.includes(`| ${packageId} |`), `revisao sem pacote ${packageId}`);
}
for (const marker of [
  "O ultimo pacote do Mao na Massa e sempre a revisao de todos os pacotes",
  "LOCAL_CI_OK",
  "122 verificacoes aprovadas",
  "10 testes aprovados",
  "14 MVPs",
  "31 itens",
  "175 arquivos",
  "VIDEO_DEFERIDO / ZIP_DEFERIDO",
  "APROVADO_TECNICAMENTE_PARA_VERSIONAMENTO_E_PUBLICACAO_GOVERNADA_SEM_VIDEO_ZIP_FINAL"
]) {
  assert.ok(review.includes(marker), `revisao V4-08 sem marcador: ${marker}`);
}
assert.ok(review.indexOf("| V4-08 |") > review.indexOf("| V4-07 |"), "V4-08 precisa ser o ultimo pacote");
assert.equal((review.match(/^\d+\./gm) || []).length, 13, "revisao deve registrar 7 bloqueios e 6 passos finais");

console.log("MVP_V4_FINAL_REVIEW_OK pacotes=8 ci=ok dry_run=ok video=deferido zip=deferido blockers=7");

