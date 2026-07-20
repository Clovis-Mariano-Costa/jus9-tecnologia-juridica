import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { publicPdpjReadiness } from "../functions/_shared/pdpj.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(path.join(root, "functions/_shared/pdpj.js"), "utf8");
const worker = readFileSync(path.join(root, "worker.js"), "utf8");
const contract = readFileSync(path.join(root, "apis/CONTRATO_PDPJ_ONBOARDING_v1.0.0.yaml"), "utf8");
const report = readFileSync(path.join(root, "governanca/RELATORIO_ONBOARDING_DOCUMENTAL_PDPJ_BR_2026-07-19.md"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const readiness = publicPdpjReadiness({});
assert(readiness.status === "blocked-institutional-onboarding", "readiness vazio deve falhar fechado no onboarding");
assert(readiness.onboarding.gecliApproved === false && readiness.onboarding.cnpjRequiredExternally === true, "readiness deve declarar pre-requisitos institucionais");
assert(Object.values(readiness.capabilities).filter(Boolean).length === 1, "somente oauthReadiness pode ficar ativo sem onboarding");
for (const marker of [
  "https://sso.stg.cloud.pje.jus.br/auth/realms/pje/protocol/openid-connect/token",
  "https://sso.cloud.pje.jus.br/auth/realms/pje/protocol/openid-connect/token",
  "PDPJ_GECLI_REQUEST_STATUS=approved",
  "PDPJ_PRODUCTION_ACCESS_APPROVED=true",
  "PDPJ_MAX_TOKEN_RESPONSE_BYTES = 64_000",
]) assert(source.includes(marker), `guard PDPJ ausente: ${marker}`);
assert(worker.includes('originalUrl.pathname === "/api/judicial/pdpj/readiness"'), "rota readiness PDPJ ausente");
assert(worker.includes('originalUrl.pathname === "/api/judicial/pdpj/token/test"'), "rota teste-token PDPJ ausente");
assert(!worker.includes('/api/judicial/pdpj/petition') && !worker.includes('/api/judicial/pdpj/science'), "Worker nao pode expor rota transacional PDPJ");
assert(contract.includes("consulta-api-negocial") && contract.includes("proibido-nesta-fase"), "matriz PDPJ incompleta");
assert(report.includes("ONBOARDING_INSTITUCIONAL_PENDENTE") && report.includes("TRANSACOES_PDPJ_BLOQUEADAS"), "relatorio PDPJ deve preservar bloqueios externos");

console.log("PDPJ_ONBOARDING_OK sso=official gecli=required production=separate transactions=blocked");
