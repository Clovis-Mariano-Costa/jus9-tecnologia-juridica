import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const matrixPath = path.join(root, "governanca", "MATRIZ_PRIORIZACAO_MVPS_CHARLIE_ECHO_v1.0.0.json");
const docPath = path.join(root, "governanca", "MATRIZ_PRIORIZACAO_MVPS_CHARLIE_ECHO_v1.0.0.md");
const catalogPath = path.join(root, "data-publica", "mvp-perfis.json");

const matrix = JSON.parse(fs.readFileSync(matrixPath, "utf8"));
const doc = fs.readFileSync(docPath, "utf8");
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

for (const field of ["id", "versao", "autor", "revisor_responsavel", "data", "status", "classificacao", "hash"]) {
  assert(matrix.metadata?.[field], `metadata ausente na matriz: ${field}`);
  assert(new RegExp(`(^|\\n)${field}:`).test(doc), `metadata ausente no documento: ${field}`);
}

const catalogCodes = (catalog.profiles || []).map((profile) => profile.dossier_code);
const entries = matrix.entries || [];
const entryCodes = entries.map((entry) => entry.code);
const criteria = matrix.criteria || [];
const weights = Object.fromEntries(criteria.map((criterion) => [criterion.id, criterion.weight]));
const weightTotal = criteria.reduce((sum, criterion) => sum + Number(criterion.weight || 0), 0);

assert(catalogCodes.length === 14, "catalogo publico deve conter 14 MVPs");
assert(entries.length === 14, "matriz deve conter 14 MVPs");
assert(JSON.stringify([...entryCodes].sort()) === JSON.stringify([...catalogCodes].sort()), "matriz e catalogo publico divergem nos codigos");
assert(weightTotal === 100, `pesos da matriz devem somar 100; somaram ${weightTotal}`);
assert(new Set(entryCodes).size === 14, "matriz possui codigo duplicado");
assert(new Set(entries.map((entry) => entry.rank)).size === 14, "matriz possui rank duplicado");

for (const entry of entries) {
  const missingScore = criteria.find((criterion) => typeof entry.scores?.[criterion.id] !== "number");
  assert(!missingScore, `${entry.code}: nota ausente para ${missingScore?.id}`);
  for (const [criterionId, score] of Object.entries(entry.scores || {})) {
    assert(score >= 1 && score <= 5, `${entry.code}: nota fora da escala em ${criterionId}`);
  }
  const calculated = Object.entries(entry.scores || {}).reduce((sum, [criterionId, score]) => {
    return sum + (score * Number(weights[criterionId] || 0)) / 5;
  }, 0);
  assert(entry.totalScore === calculated, `${entry.code}: score esperado ${calculated}, encontrado ${entry.totalScore}`);
  assert(entry.nextAction && entry.primaryRisk && entry.strategicRole, `${entry.code}: decisao operacional incompleta`);
}

const orderedCodes = [...entries].sort((a, b) => a.rank - b.rank).map((entry) => entry.code);
assert(JSON.stringify(orderedCodes.slice(0, 3)) === JSON.stringify(["DAJ", "DED", "DIC"]), "top 3 precisa ser DAJ, DED e DIC");
assert(matrix.recommendedWaves?.[0]?.codes?.[0] === "DAJ", "onda 0 precisa preservar DAJ como porta operacional");
assert(matrix.recommendedWaves?.some((wave) => JSON.stringify(wave.codes) === JSON.stringify(["DED", "DIC"])), "DED e DIC precisam formar a onda de vitrines");
assert(matrix.recommendedWaves?.some((wave) => (wave.codes || []).includes("DMG") && String(wave.exitGate || "").includes("Somente demonstrativo")), "DMG/DMP/DAP precisam ficar restritos");

for (const phrase of [
  "DAJ permanece o MVP-mae operacional",
  "DED e DIC entram como vitrines",
  "Nenhum MVP deve receber dado real",
  "Aceite humano do Pacote 1C",
  "Somente demonstrativo ate revisao juridica especifica"
]) {
  assert(doc.includes(phrase), `documento legivel sem frase-chave: ${phrase}`);
}

if (failures.length) {
  console.error("Falhas na matriz de priorizacao dos MVPs:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("MVP_PRIORITIZATION_MATRIX_OK mvps=14 top=DAJ,DED,DIC waves=6");
