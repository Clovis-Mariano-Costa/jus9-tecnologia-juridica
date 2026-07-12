import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredDirs = [
  "governanca",
  "memoria",
  "memoria/permanente",
  "memoria/evolutiva",
  "memoria/temporaria",
  "memoria/conversacional",
  "prompts",
  "prompts/identidade",
  "prompts/governanca",
  "prompts/juridico",
  "prompts/programacao",
  "prompts/atendimento",
  "prompts/marketing",
  "prompts/pesquisa",
  "prompts/investimentos",
  "prompts/seguranca",
  "prompts/desenvolvedor",
  "documentacao",
  "apis",
  "modelos",
  "logs",
  "testes",
  "releases",
  "historico",
  "obsoleto"
];

const topLevelComponents = [
  "governanca",
  "memoria",
  "prompts",
  "documentacao",
  "apis",
  "modelos",
  "logs",
  "testes",
  "releases",
  "historico",
  "obsoleto"
];

const requiredFiles = [
  "governanca/CRONOGRAMA_GOVERNANCA_CHARLIE_ECHO_v1.0.0.md",
  "governanca/MANIFESTO_GOVERNANCA_CHARLIE_ECHO_v1.0.0.md",
  "governanca/MATRIZ_COMPONENTES_GOVERNANCA_v1.0.0.json",
  "governanca/MATRIZ_CAPACIDADES_CHARLIE_ECHO_v1.1.0.json",
  "memoria/POLITICA_MEMORIA_CHARLIE_ECHO_v1.0.0.md",
  "prompts/CONTRATO_DOMINIOS_PROMPTS_v1.0.0.yaml",
  "prompts/governanca/CONTRATOS_MODOS_CHARLIE_ECHO_v1.1.0.yaml",
  "apis/CONTRATO_APIS_GOVERNANCA_v1.0.0.yaml",
  "modelos/MODELO_METADADOS_DOCUMENTAIS_v1.0.0.yaml",
  "modelos/MODELO_EVENTO_AUDITORIA_v1.0.0.yaml",
  "modelos/MODELO_ROADMAP_v1.0.0.yaml",
  "logs/AUDITORIA_GOVERNANCA_CHARLIE_ECHO_2026-07-12.md",
  "testes/CHECKLIST_QUALIDADE_GOVERNANCA_v1.0.0.json",
  "testes/CASOS_CONTRATOS_MODOS_v1.1.0.json",
  "releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.0.0.md",
  "releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.1.0.md",
  "historico/INDICE_HISTORICO_GOVERNANCA_v1.0.0.md",
  "obsoleto/POLITICA_OBSOLESCENCIA_v1.0.0.md"
];

const metadataFields = [
  "id",
  "versao",
  "autor",
  "revisor_responsavel",
  "data",
  "status",
  "classificacao",
  "hash"
];

const promptDomains = [
  "identidade",
  "governanca",
  "juridico",
  "programacao",
  "atendimento",
  "marketing",
  "pesquisa",
  "investimentos",
  "seguranca",
  "desenvolvedor"
];

const capabilityStates = [
  "ativo",
  "demonstrativo",
  "planejado",
  "bloqueado_por_seguranca"
];

const modeContracts = [
  "estudante",
  "profissional",
  "social",
  "governanca",
  "pesquisa_juridica",
  "minuta",
  "revisao"
];

function fail(message) {
  throw new Error(message);
}

function full(relativePath) {
  return path.join(root, ...relativePath.split("/"));
}

function read(relativePath) {
  return fs.readFileSync(full(relativePath), "utf8");
}

function assertPathExists(relativePath) {
  if (!fs.existsSync(full(relativePath))) fail(`Caminho ausente: ${relativePath}`);
}

function listFiles(directory) {
  const base = full(directory);
  const found = [];
  for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
    const relative = `${directory}/${entry.name}`;
    if (entry.isDirectory()) {
      found.push(...listFiles(relative));
    } else {
      found.push(relative);
    }
  }
  return found;
}

function assertMetadataText(relativePath, text) {
  if (!text.trimStart().startsWith("---")) fail(`Metadados YAML ausentes em ${relativePath}`);
  for (const field of metadataFields) {
    const pattern = new RegExp(`(^|\\n)\\s*${field}\\s*:`);
    if (!pattern.test(text)) fail(`Campo de metadados ausente em ${relativePath}: ${field}`);
  }
  const version = text.match(/(^|\n)\s*versao\s*:\s*([0-9]+\.[0-9]+\.[0-9]+)/);
  if (!version) fail(`Versao semantica ausente em ${relativePath}`);
}

function assertMetadataJson(relativePath, text) {
  const parsed = JSON.parse(text);
  if (!parsed.metadata || typeof parsed.metadata !== "object") fail(`metadata ausente em ${relativePath}`);
  for (const field of metadataFields) {
    if (!parsed.metadata[field]) fail(`Campo de metadados ausente em ${relativePath}: ${field}`);
  }
  if (!/^[0-9]+\.[0-9]+\.[0-9]+$/.test(String(parsed.metadata.versao))) {
    fail(`Versao semantica invalida em ${relativePath}`);
  }
  return parsed;
}

for (const dir of requiredDirs) assertPathExists(dir);
for (const component of topLevelComponents) {
  assertPathExists(`${component}/README.md`);
  assertPathExists(`${component}/CHANGELOG.md`);
}
for (const file of requiredFiles) assertPathExists(file);

const governanceFiles = [
  ...listFiles("governanca"),
  ...listFiles("memoria"),
  ...listFiles("prompts"),
  ...listFiles("documentacao"),
  ...listFiles("apis"),
  ...listFiles("modelos"),
  ...listFiles("logs"),
  ...listFiles("testes"),
  ...listFiles("releases"),
  ...listFiles("historico"),
  ...listFiles("obsoleto")
].filter((file) => /\.(md|ya?ml|json)$/i.test(file));

for (const file of governanceFiles) {
  const text = read(file);
  if (file.endsWith(".json")) {
    assertMetadataJson(file, text);
  } else {
    assertMetadataText(file, text);
  }
}

const memoryPolicy = read("memoria/POLITICA_MEMORIA_CHARLIE_ECHO_v1.0.0.md");
for (const term of ["Permanente", "Evolutiva", "Temporaria", "Conversacional"]) {
  if (!memoryPolicy.includes(term)) fail(`Classe de memoria ausente na politica: ${term}`);
}
if (!/Nao pode ser promovida automaticamente/i.test(memoryPolicy)) {
  fail("Politica nao bloqueia promocao automatica de memoria temporaria");
}

const promptContract = read("prompts/CONTRATO_DOMINIOS_PROMPTS_v1.0.0.yaml");
for (const domain of promptDomains) {
  if (!promptContract.includes(`${domain}:`)) fail(`Dominio de prompt ausente: ${domain}`);
  assertPathExists(`prompts/${domain}/README.md`);
}

const checklist = assertMetadataJson(
  "testes/CHECKLIST_QUALIDADE_GOVERNANCA_v1.0.0.json",
  read("testes/CHECKLIST_QUALIDADE_GOVERNANCA_v1.0.0.json")
);
const checklistNames = new Set((checklist.itens || []).map((item) => item.nome));
for (const name of [
  "Consistencia",
  "Ortografia",
  "Conformidade juridica",
  "Referencias",
  "Seguranca",
  "LGPD",
  "Integridade documental"
]) {
  if (!checklistNames.has(name)) fail(`Checklist sem item obrigatorio: ${name}`);
}

const apiContract = read("apis/CONTRATO_APIS_GOVERNANCA_v1.0.0.yaml");
for (const route of ["/chat", "/rooms", "/summaries", "/sources", "/exports", "/health", "/governance-events"]) {
  if (!apiContract.includes(`path: ${route}`)) fail(`Rota planejada ausente: ${route}`);
}

const capabilities = assertMetadataJson(
  "governanca/MATRIZ_CAPACIDADES_CHARLIE_ECHO_v1.1.0.json",
  read("governanca/MATRIZ_CAPACIDADES_CHARLIE_ECHO_v1.1.0.json")
);
for (const state of capabilityStates) {
  if (!(capabilities.estados_validos || []).includes(state)) fail(`Estado de capacidade ausente: ${state}`);
  if (!(capabilities.capacidades || []).some((item) => item.estado === state)) {
    fail(`Nenhuma capacidade registrada no estado: ${state}`);
  }
}
for (const capability of capabilities.capacidades || []) {
  for (const field of ["id", "nome", "estado", "ambientes", "dependencias", "evidencia", "limite"]) {
    if (!capability[field]) fail(`Capacidade sem campo ${field}: ${capability.id || capability.nome || "sem-id"}`);
  }
}

const modeContract = read("prompts/governanca/CONTRATOS_MODOS_CHARLIE_ECHO_v1.1.0.yaml");
for (const mode of modeContracts) {
  if (!modeContract.includes(`  ${mode}:`)) fail(`Contrato de modo ausente: ${mode}`);
}
for (const requiredPhrase of ["memoria_permitida", "fontes_minimas", "formato_preferencial", "limites"]) {
  if (!modeContract.includes(requiredPhrase)) fail(`Campo obrigatorio ausente nos contratos de modo: ${requiredPhrase}`);
}

const modeCases = assertMetadataJson(
  "testes/CASOS_CONTRATOS_MODOS_v1.1.0.json",
  read("testes/CASOS_CONTRATOS_MODOS_v1.1.0.json")
);
for (const mode of modeContracts) {
  if (!(modeCases.casos || []).some((item) => item.modo === mode)) fail(`Caso de teste ausente para modo: ${mode}`);
}

const release = read("releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.0.0.md");
if (!release.includes("Nao inclui")) fail("Release precisa declarar o que nao inclui");
if (!release.includes("Alteracao de logica de negocio")) fail("Release precisa preservar logica de negocio existente");

const release11 = read("releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.1.0.md");
if (!release11.includes("Matriz de capacidades")) fail("Release 1.1.0 sem matriz de capacidades");
if (!release11.includes("Alteracao de logica de negocio ativa")) fail("Release 1.1.0 precisa preservar logica ativa");

console.log(`GOVERNANCE_STRUCTURE_OK ${governanceFiles.length} documentos verificados`);
