import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cronograma = fs.readFileSync(path.join(root, "governanca", "CRONOGRAMA_MAO_NA_MASSA_CHARLIE_ECHO_v3.0.0.md"), "utf8");
const aceiteParcial = fs.readFileSync(path.join(root, "governanca", "RELATORIO_ACEITE_HUMANO_PARCIAL_PACOTE_1C_DAJ_2026-07-19.md"), "utf8");
const registryPage = fs.readFileSync(path.join(root, "app-clientes.html"), "utf8");
const registryScript = fs.readFileSync(path.join(root, "assets", "js", "daj-registry-list.js"), "utf8");

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

for (const [name, text] of [["cronograma", cronograma], ["aceite parcial", aceiteParcial]]) {
  for (const field of ["id", "versao", "autor", "revisor_responsavel", "data", "status", "classificacao", "hash"]) {
    assert(new RegExp(`(^|\\n)${field}:`).test(text), `${name}: metadado ausente: ${field}`);
  }
}

for (const phrase of [
  "DAJ-2026-0002",
  "2026-07-19 13:44:32 BRT",
  "ACEITE_HUMANO_PARCIAL_CONFIRMADO / REVERSIBILIDADE_PENDENTE",
  "a142825 feat: consulta governada de dajs por chaves",
  "cde1bf89-3d93-4429-a485-be46945bec04",
  "LIVE_DAJ_SEARCH_SMOKE_OK page,js,apis-fail-closed",
  "BLOQUEADO_ATE_REVERSIBILIDADE_1C",
  "DEPENDENTE_DE_ACAO_HUMANA"
]) {
  assert(cronograma.includes(phrase) || aceiteParcial.includes(phrase), `marco v3 ausente: ${phrase}`);
}

for (const mustNotConclude of [cronograma, aceiteParcial]) {
  assert(!mustNotConclude.includes("Pacote 1C esta em `CONCLUIDO`"), "Pacote 1C nao pode ser concluido sem tombstone");
  assert(mustNotConclude.includes("REVERSIBILIDADE_PENDENTE") || mustNotConclude.includes("reversibilidade"), "documento precisa preservar pendencia de reversibilidade");
}

for (const route of ["/api/dajs?dajId=", "/api/judicial/parties/search", "/api/daj-process-links?searchType=processo"]) {
  assert(registryScript.includes(route), `consulta DAJ sem rota: ${route}`);
}
assert(registryPage.includes("data-daj-search-form"), "pagina de DAJs sem formulario de consulta governada");
assert(registryScript.includes("method: 'POST'") && registryScript.includes("HMAC exato"), "busca nome/CPF precisa ser POST governado com HMAC exato");
assert(!registryScript.includes("slice(-2) ==="), "busca de CPF nao pode comparar finais do documento");

if (failures.length) {
  console.error("Falhas no Mao na Massa v3:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("MAO_NA_MASSA_V3_OK aceite=parcial daj=DAJ-2026-0002 pacotes=7");
