import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredRoutes = [
  "/chat",
  "/rooms",
  "/summaries",
  "/sources",
  "/api/attachments/extract",
  "/exports",
  "/health",
  "/governance-events"
];

const requiredEvents = [
  "message.created",
  "risk.classified",
  "prompt.version.used",
  "room.created",
  "summary.updated",
  "source.checked",
  "attachment.extracted",
  "export.generated",
  "health.checked",
  "feature.flag.evaluated",
  "governance.event.created",
  "memory.promotion.blocked"
];

const requiredFlags = [
  "flag.chat.api",
  "flag.rooms.storage",
  "flag.summaries.storage",
  "flag.sources.check",
  "flag.exports.local",
  "flag.exports.server",
  "flag.governance.events",
  "flag.drive.saver",
  "flag.drive.public_link",
  "flag.attachments.extract",
  "flag.ocr.upload",
  "flag.rag.juridico",
  "flag.memory.user.persistent"
];

const requiredEventFields = [
  "event_id",
  "event_type",
  "occurred_at",
  "actor",
  "entity_type",
  "result",
  "reason",
  "retention_policy",
  "content_hash"
];

function full(relativePath) {
  return path.join(root, ...relativePath.split("/"));
}

function read(relativePath) {
  return fs.readFileSync(full(relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function fail(message) {
  throw new Error(message);
}

const backendContractPath = "apis/CONTRATO_BACKEND_GOVERNADO_CHARLIE_ECHO_v1.3.0.yaml";
const flagsPath = "apis/FEATURE_FLAGS_CAPACIDADES_CHARLIE_ECHO_v1.3.0.json";
const eventModelPath = "modelos/MODELO_EVENTO_GOVERNANCA_v1.3.0.json";
const testCasesPath = "testes/CASOS_BACKEND_EVENTOS_GOVERNADOS_v1.3.0.json";

for (const relativePath of [backendContractPath, flagsPath, eventModelPath, testCasesPath]) {
  if (!fs.existsSync(full(relativePath))) fail(`Arquivo ausente: ${relativePath}`);
}

const contract = read(backendContractPath);
for (const route of requiredRoutes) {
  if (!contract.includes(`path: ${route}`)) fail(`Contrato backend sem rota: ${route}`);
}
for (const phrase of [
  "sem_chaves_no_frontend: true",
  "rate_limit_obrigatorio: true",
  "classificar_entrada_antes_do_modelo: true",
  "validar_saida_antes_de_responder: true",
  "registrar_evento_governado: true"
]) {
  if (!contract.includes(phrase)) fail(`Contrato backend sem premissa: ${phrase}`);
}
for (const eventName of requiredEvents) {
  if (!contract.includes(eventName)) fail(`Contrato backend sem evento obrigatorio: ${eventName}`);
}
for (const block of [
  "inventar_file_id",
  "inventar_download_url",
  "promocao_automatica",
  "sobrescrever_permanente"
]) {
  if (!contract.includes(block)) fail(`Contrato backend sem bloqueio obrigatorio: ${block}`);
}

const flags = readJson(flagsPath);
if (!flags.metadata || flags.metadata.versao !== "1.3.0") fail("Feature flags sem metadados v1.3.0");
const flagIds = new Set((flags.flags || []).map((item) => item.id));
for (const flag of requiredFlags) {
  if (!flagIds.has(flag)) fail(`Feature flag ausente: ${flag}`);
}
for (const state of ["ativo", "demonstrativo", "planejado", "bloqueado_por_seguranca"]) {
  if (!(flags.flags || []).some((item) => item.estado === state)) fail(`Nenhuma feature flag no estado: ${state}`);
}
for (const flag of flags.flags || []) {
  for (const field of ["id", "estado", "descricao", "dependencias", "bloqueio"]) {
    if (!flag[field]) fail(`Feature flag sem campo ${field}: ${flag.id || "sem-id"}`);
  }
}

const eventModel = readJson(eventModelPath);
if (!eventModel.metadata || eventModel.metadata.versao !== "1.3.0") fail("Modelo de evento sem metadados v1.3.0");
for (const field of requiredEventFields) {
  if (!eventModel.schema || !eventModel.schema[field]) fail(`Modelo de evento sem campo: ${field}`);
}
for (const eventName of requiredEvents) {
  if (!(eventModel.eventos_minimos || []).includes(eventName)) fail(`Modelo de evento sem evento minimo: ${eventName}`);
}
for (const forbidden of ["senha", "token", "api_key"]) {
  if (!(eventModel.proibido || []).includes(forbidden)) fail(`Modelo de evento sem proibicao: ${forbidden}`);
}

const cases = readJson(testCasesPath);
if (!cases.metadata || cases.metadata.versao !== "1.3.0") fail("Casos backend sem metadados v1.3.0");
for (const route of requiredRoutes) {
  if (!(cases.casos || []).some((item) => item.rota === route)) fail(`Casos backend sem cobertura da rota: ${route}`);
}
for (const testCase of cases.casos || []) {
  for (const field of ["id", "rota", "entrada", "eventos_esperados", "bloqueios_esperados"]) {
    if (!testCase[field]) fail(`Caso backend sem campo ${field}: ${testCase.id || "sem-id"}`);
  }
  if (!Array.isArray(testCase.eventos_esperados) || testCase.eventos_esperados.length < 1) {
    fail(`Caso backend sem evento esperado: ${testCase.id}`);
  }
  if (!Array.isArray(testCase.bloqueios_esperados) || testCase.bloqueios_esperados.length < 1) {
    fail(`Caso backend sem bloqueio esperado: ${testCase.id}`);
  }
}

console.log(`GOVERNANCE_BACKEND_CONTRACTS_OK ${(cases.casos || []).length} casos verificados`);
