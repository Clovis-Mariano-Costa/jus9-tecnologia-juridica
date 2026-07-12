import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredRisks = [
  "dados_pessoais",
  "segredo_token",
  "fonte_fraca",
  "minuta_juridica",
  "autoridade_publica",
  "link_quebrado_ou_duvidoso",
  "social_urgente",
  "memoria_temporaria",
  "drive_link_publico",
  "investimento_financeiro"
];

const requiredActions = [
  "nao_repetir_dado",
  "recusar_segredo",
  "pedir_fonte_primaria",
  "produzir_minuta_com_placeholders",
  "recusar_simulacao_de_autoridade",
  "alertar_link_duvidoso",
  "encaminhar_humano_urgente",
  "bloquear_promocao",
  "nao_inventar_url",
  "usar_linguagem_prudente"
];

const requiredPolicyPhrases = [
  "classificar_antes_de_responder: true",
  "registrar_evento_governanca_quando_sensivel: true",
  "nao_expor_segredo: true",
  "nao_inventar_fonte: true",
  "nao_promover_memoria_temporaria: true"
];

function full(relativePath) {
  return path.join(root, ...relativePath.split("/"));
}

function read(relativePath) {
  return fs.readFileSync(full(relativePath), "utf8");
}

function fail(message) {
  throw new Error(message);
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

const policyPath = "prompts/seguranca/POLITICA_RISCOS_CHARLIE_ECHO_v1.2.0.yaml";
const suitePath = "testes/SUITE_GOVERNANCA_RISCOS_CHARLIE_ECHO_v1.2.0.json";
const protocolPath = "testes/PROTOCOLO_REGRESSAO_PROMPT_FLUXO_v1.2.0.md";

for (const relativePath of [policyPath, suitePath, protocolPath]) {
  if (!fs.existsSync(full(relativePath))) fail(`Arquivo ausente: ${relativePath}`);
}

const policy = read(policyPath);
for (const phrase of requiredPolicyPhrases) {
  if (!policy.includes(phrase)) fail(`Politica de riscos sem regra obrigatoria: ${phrase}`);
}
for (const risk of requiredRisks) {
  if (!policy.includes(`  ${risk}:`)) fail(`Politica de riscos sem categoria: ${risk}`);
}

const suite = readJson(suitePath);
if (!suite.metadata || suite.metadata.versao !== "1.2.0") fail("Suite de riscos sem metadados v1.2.0");
if (!Array.isArray(suite.casos) || suite.casos.length < requiredRisks.length) {
  fail("Suite de riscos com cobertura insuficiente");
}

const suiteRisks = new Set(suite.casos.map((item) => item.risco));
for (const risk of requiredRisks) {
  if (!suiteRisks.has(risk)) fail(`Suite de riscos sem caso: ${risk}`);
}

const actionSet = new Set();
for (const testCase of suite.casos) {
  for (const field of ["id", "risco", "modo", "entrada", "acoes_esperadas", "proibido"]) {
    if (!testCase[field]) fail(`Caso de risco sem campo ${field}: ${testCase.id || "sem-id"}`);
  }
  if (!Array.isArray(testCase.acoes_esperadas) || testCase.acoes_esperadas.length < 2) {
    fail(`Caso de risco sem acoes esperadas suficientes: ${testCase.id}`);
  }
  if (!Array.isArray(testCase.proibido) || testCase.proibido.length < 2) {
    fail(`Caso de risco sem proibicoes suficientes: ${testCase.id}`);
  }
  testCase.acoes_esperadas.forEach((action) => actionSet.add(action));
}

for (const action of requiredActions) {
  if (!actionSet.has(action)) fail(`Suite de riscos sem acao esperada: ${action}`);
}

const protocol = read(protocolPath);
for (const command of [
  "node scripts/audit-charlie-governance-structure.mjs",
  "node scripts/audit-charlie-governance-risk-suite.mjs"
]) {
  if (!protocol.includes(command)) fail(`Protocolo de regressao sem comando: ${command}`);
}
for (const block of [
  "Dado pessoal real",
  "Segredo, token ou senha",
  "Fonte juridica fraca",
  "Link publico de Drive inventado",
  "Memoria temporaria promovida"
]) {
  if (!protocol.includes(block)) fail(`Protocolo sem bloqueio automatico: ${block}`);
}

console.log(`GOVERNANCE_RISK_SUITE_OK ${suite.casos.length} casos verificados`);
