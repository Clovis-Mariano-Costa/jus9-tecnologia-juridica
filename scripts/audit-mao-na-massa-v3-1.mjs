import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cronograma = fs.readFileSync(path.join(root, "governanca", "CRONOGRAMA_MAO_NA_MASSA_CHARLIE_ECHO_v3.1.0.md"), "utf8");
const buildWeek = fs.readFileSync(path.join(root, "build-week-2026.html"), "utf8");
const stateMap = fs.readFileSync(path.join(root, "mvp-o-que-ja-funciona.html"), "utf8");
const saibaMais = fs.readFileSync(path.join(root, "saiba-mais.html"), "utf8");

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

for (const field of ["id", "versao", "autor", "revisor_responsavel", "data", "status", "classificacao", "hash"]) {
  assert(new RegExp(`(^|\\n)${field}:`).test(cronograma), `cronograma v3.1 sem metadado: ${field}`);
}

for (const phrase of [
  "DAJ` Advogado/Defensor como piloto operacional unico",
  "demais 13 MVPs como vitrines publicas governadas",
  "Charlie Core v0",
  "ATIVO_PUBLICADO",
  "DEMONSTRATIVO_PUBLICADO",
  "PLANEJADO",
  "BLOQUEADO",
  "ACEITE_HUMANO_PARCIAL_CONFIRMADO / REVERSIBILIDADE_PENDENTE",
  "Build Week + mapa publico de estados",
  "Contratos JSON e testes por risco",
  "DataJud read-only e validacao humana",
  "Revisao geral, video e ZIP final",
  "O ultimo pacote do Mao na Massa e sempre a revisao geral de todos os pacotes",
  "SEGUIR_COM_PACOTES_SEGUROS_E_MANTER_BLOQUEIOS_HUMANOS",
]) {
  assert(cronograma.includes(phrase), `cronograma v3.1 sem frase obrigatoria: ${phrase}`);
}

for (const packageNumber of Array.from({ length: 13 }, (_, index) => String(index))) {
  assert(cronograma.includes(`| ${packageNumber} |`), `cronograma v3.1 sem Pacote ${packageNumber}`);
}

assert(cronograma.indexOf("| 12 | Revisao geral, video e ZIP final") > cronograma.indexOf("| 11 | DataJud read-only e validacao humana"), "Pacote 12 precisa permanecer por ultimo");
assert(!cronograma.includes("Pacote 2 |") || cronograma.includes("`DEPENDENTE_DE_ACAO_HUMANA`"), "Pacote 2 nao pode perder dependencia humana");
assert(cronograma.includes("`BLOQUEADO_ATE_REVERSIBILIDADE_1C`"), "Pacote 6 precisa continuar bloqueado ate reversibilidade 1C");

assert(buildWeek.includes("data-build-week-mvp-scope") && buildWeek.includes("Charlie Core v0"), "Build Week sem consolidacao do cronograma v3.1");
assert(stateMap.includes("data-state-map") && stateMap.includes("ATIVO_PUBLICADO") && stateMap.includes("BLOQUEADO"), "pagina de estado dos MVPs sem estados do cronograma v3.1");
assert(saibaMais.includes("build-week-2026.html") && saibaMais.includes("mvp-o-que-ja-funciona.html"), "Saiba Mais sem links do cronograma v3.1");

if (failures.length) {
  console.error("Falhas no Mao na Massa v3.1:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("MAO_NA_MASSA_V3_1_OK pacotes=13 piloto=DAJ proximo=Charlie-Core-v0 final=video-zip-revisao");
