import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  DATAJUD_ALIASES,
  buildDataJudSearch,
  missingDataJudConfig,
} from "../functions/_shared/datajud.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(path.join(root, "functions/_shared/datajud.js"), "utf8");
const envExample = readFileSync(path.join(root, ".env.example"), "utf8");
const report = readFileSync(path.join(root, "governanca/RELATORIO_REVISAO_DATAJUD_TERMOS_CNJ_2026-07-19.md"), "utf8");
const contract = readFileSync(path.join(root, "apis/CONTRATO_DATAJUD_GOVERNADO_v1.0.0.yaml"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(Object.keys(DATAJUD_ALIASES).length === 91, "allowlist DataJud deve conter exatamente 91 aliases oficiais");
assert(DATAJUD_ALIASES.tresc?.alias === "api_publica_tre-sc", "allowlist sem TRE-SC oficial");
assert(DATAJUD_ALIASES.tjmsp?.alias === "api_publica_tjmsp", "allowlist sem TJM-SP oficial");
assert(buildDataJudSearch({ tribunal: "api_publica_tre-sc", numeroProcesso: "00000000020256240000" }).url === "https://api-publica.datajud.cnj.jus.br/api_publica_tre-sc/_search", "endpoint deve ser derivado exclusivamente da allowlist");
assert(missingDataJudConfig({ DATAJUD_API_KEY: "ficticia" }).includes("JUS9_DATAJUD_CACHE"), "DataJud deve falhar fechado sem contador/cache");
assert(!source.includes("DATAJUD_USERNAME") && !source.includes("DATAJUD_PASSWORD"), "Basic Auth nao documentado deve permanecer removido");
assert(!envExample.includes("DATAJUD_USERNAME") && !envExample.includes("DATAJUD_PASSWORD"), "env exemplo nao deve sugerir Basic Auth");
for (const marker of [
  "DATAJUD_MAX_RESPONSE_BYTES = 2_000_000",
  "DATAJUD_MAX_ATTEMPTS = 2",
  "datajud:rate:v2:global",
  "Retry-After",
  "readBoundedJsonResponse",
  "_source:",
  'reviewStatus: "revisado_operacionalmente_sem_autorizacao_comercial"',
]) assert(source.includes(marker), `controle DataJud ausente: ${marker}`);
assert(!/queryHash:\s*String\(event\.queryHash/.test(source), "auditoria nao deve registrar hash do numero processual");
assert(report.includes("USO_COMERCIAL_NAO_AUTORIZADO") && report.includes("120 requisicoes por minuto"), "relatorio deve preservar limites do Termo v1.2");
assert(contract.includes("autorizacao_comercial: nao-comprovada") && contract.includes("total: 91"), "contrato DataJud deve declarar allowlist e condicionantes");

console.log("DATAJUD_GOVERNANCE_OK aliases=91 apiKey-only global-rate bounded-response minimized-audit terms-v1.2");
