import fs from "node:fs/promises";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertIncludes(text, needle, label) {
  assert(text.includes(needle), `${label}: ausente "${needle}"`);
}

const root = new URL("../", import.meta.url);
const [panel, proofMap, matrix] = await Promise.all([
  fs.readFile(new URL("app-painel-mvps.html", root), "utf8"),
  fs.readFile(new URL("governanca/MAPA_PROVAS_MVPS_GERAIS_v1.0.0.md", root), "utf8"),
  fs.readFile(new URL("governanca/MATRIZ_PRIORIZACAO_MVPS_CHARLIE_ECHO_v1.0.0.json", root), "utf8").then(JSON.parse),
]);

for (const field of ["id", "versao", "autor", "revisor_responsavel", "data", "status", "classificacao", "hash"]) {
  assert(new RegExp(`(^|\\n)${field}:`).test(proofMap), `mapa de provas sem metadado: ${field}`);
}

assertIncludes(panel, "data-mvp-proof-map", "painel executivo");
assertIncludes(panel, "Mapa de provas dos 14 MVPs", "painel executivo");
assertIncludes(proofMap, "SEGUIR_COM_MVPS_GERAIS_POR_PROVA_DE_VALOR", "mapa de provas");
assertIncludes(proofMap, "todos os MVPs continuam demonstrativos", "mapa de provas");
assertIncludes(proofMap, "nao libera Drive real", "mapa de provas");
assertIncludes(proofMap, "nao libera memoria real", "mapa de provas");
assertIncludes(proofMap, "video, ZIP e revisao geral", "mapa de provas");

const entries = matrix.entries || [];
assert(entries.length === 14, "matriz de priorizacao deve manter 14 MVPs");

for (const entry of entries) {
  assertIncludes(panel, `data-proof-code="${entry.code}"`, `painel prova ${entry.code}`);
  assertIncludes(proofMap, `| ${entry.wave} | ${entry.code} |`, `documento prova ${entry.code}`);
  assertIncludes(proofMap, entry.code, `documento prova ${entry.code}`);
}

for (const phrase of [
  "Rastreabilidade juridica ponta a ponta",
  "Autoria/editoria com artefato revisavel",
  "Linguagem cidada segura",
  "Rotina de escritorio com papeis e tarefas",
  "Juridico interno com matriz de risco",
  "Laudo tecnico demonstrativo verificavel",
  "Narrativa de parceria sem promessa financeira",
  "Apoio docente com avaliacao humana",
  "Estudo guiado sem fraude academica",
  "Fluxo institucional sem ato oficial",
  "Governanca interna e auditoria",
  "Uso educativo para Ministerio Publico",
  "Organizacao policial apenas demonstrativa",
  "Estudo de gabinete sem decisao judicial",
]) {
  assertIncludes(panel, phrase, "painel prova de valor");
  assertIncludes(proofMap, phrase, "documento prova de valor");
}

console.log("MVP_PROOF_MAP_OK mvps=14 ondas=6 provas=14 bloqueios=governados");
