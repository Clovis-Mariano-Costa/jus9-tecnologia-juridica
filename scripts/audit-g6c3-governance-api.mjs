import fs from "node:fs/promises";

const root = new URL("../", import.meta.url);
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const [worker, moduleSource, contract, decision, schedule, buildWeek, versioning, release, packageJson, wrangler, serviceWorker] = await Promise.all([
  fs.readFile(new URL("worker.js", root), "utf8"),
  fs.readFile(new URL("functions/_shared/governance-capabilities.js", root), "utf8"),
  fs.readFile(new URL("apis/CONTRATO_API_ESTADO_GOVERNADO_CHARLIE_v1.0.0.yaml", root), "utf8"),
  fs.readFile(new URL("governanca/DECISAO_G6C3_API_ESTADO_GOVERNADO_CHARLIE_v1.0.0.md", root), "utf8"),
  fs.readFile(new URL("governanca/CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v2.0.0.md", root), "utf8"),
  fs.readFile(new URL("build-week-2026.html", root), "utf8"),
  fs.readFile(new URL("versionamento.html", root), "utf8"),
  fs.readFile(new URL("releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.15.md", root), "utf8"),
  fs.readFile(new URL("package.json", root), "utf8").then(JSON.parse),
  fs.readFile(new URL("wrangler.jsonc", root), "utf8"),
  fs.readFile(new URL("service-worker.js", root), "utf8")
]);

assert(worker.includes('"/api/governance/charlie/capabilities"'), "rota G6C3 ausente no Worker");
assert(worker.includes("crypto.randomUUID()") && worker.includes("X-Jus9-Request-Id"), "correlacao G6C3 ausente");
assert(moduleSource.includes("externalSilenceAuthorizes: false"), "silencio externo nao esta fechado");
assert(moduleSource.includes('state: "READINESS_ONLY"') && moduleSource.includes("petitioning: false"), "PDPJ nao esta bloqueada");
assert(moduleSource.includes("JUDICIAL_PETITION_WRITE") && moduleSource.includes("EXTERNAL_PARTY_SEARCH_BY_NAME_OR_CPF"), "efeitos bloqueados incompletos");
assert(contract.includes("openapi: 3.1.0") && contract.includes("mutation: false"), "contrato OpenAPI G6C3 incompleto");
assert(decision.includes("somente `GET`") && decision.includes("silencio nao autoriza"), "decisao G6C3 incompleta");
assert(schedule.includes("22/07 as 10h") && schedule.includes("T+155 a T+180 min"), "cronograma v2.0 incompleto");
assert(buildWeek.includes("Live governance API") && buildWeek.includes("/api/governance/charlie/capabilities"), "Build Week sem prova G6C3");
assert(versioning.includes("Versao 5.19") && versioning.includes("governanca 1.21.15"), "versionamento publico G6C3 ausente");
assert(release.includes("v1.21.15") && packageJson.version === "1.21.15", "release G6C3 inconsistente");
assert(wrangler.includes("governanca-1.21.15-g6c3-api-1.0"), "release do Worker G6C3 inconsistente");
assert(serviceWorker.includes("jus9-pwa-v57-2026-07-21-github-security"), "cache PWA sucessor a G6C3 inconsistente");

console.log("G6C3_GOVERNANCE_API_OK schema=1.0.0 method=GET default-deny=true cnj=awaiting-response pdpj=readiness-only");
