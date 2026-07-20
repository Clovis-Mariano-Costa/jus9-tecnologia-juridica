import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const schedulePath = path.join(root, "governanca", "CRONOGRAMA_MAO_NA_MASSA_MVPS_GERAIS_v4.0.0.md");
const inventoryPath = path.join(root, "data-publica", "mvp-perfis.json");

function fail(message) {
  console.error(`CRONOGRAMA_MVPS_V4_FAIL ${message}`);
  process.exit(1);
}

if (!fs.existsSync(schedulePath)) fail("documento ausente");
if (!fs.existsSync(inventoryPath)) fail("inventario publico ausente");

const schedule = fs.readFileSync(schedulePath, "utf8");
const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
const codes = (inventory.profiles || []).map((profile) => profile.dossier_code);

if (codes.length !== 14 || new Set(codes).size !== 14) fail("inventario deve conter 14 MVPs unicos");
for (const code of codes) {
  if (!schedule.includes(`\`${code}\``) && !schedule.includes(code)) fail(`MVP ausente: ${code}`);
}

const requiredMarkers = [
  "versao: 4.0.0",
  "PAGINA_EQUIPE_FORA_DE_ESCOPO_EXECUTIVO",
  "VIDEO_DEFERIDO",
  "ZIP_DEFERIDO",
  "PACOTE_1C_CONCLUIDO_COM_RESSALVA_CORRETIVA",
  "CHARLIE_CORE_IMPLEMENTADO",
  "CONTRATOS_JSON_IMPLEMENTADOS",
  "NAO_ATIVAR_DADO_REAL_POR_PRESUNCAO",
  "PACOTE_V4_01_RECONCILIACAO_CANONICA",
  "PACOTE_V4_02_PORTFOLIO_CANONICO_V2",
  "PACOTE_V4_03_NUCLEO_COMPARTILHADO",
  "PACOTE_V4_04_BASELINE_TRANSVERSAL",
  "PACOTE_V4_05_REVALIDACAO_EM_ONDAS",
  "PACOTE_V4_06_REPOSITORIOS_BACKLOG_OPERACAO",
  "PACOTE_V4_07_PUBLICACAO_CONSOLIDADA",
  "PACOTE_V4_08_REVISAO_GERAL_VIDEO_ZIP",
  "catalogo publico com 31 repositorios Jus 9",
  "Pagina Equipe sem coordenacao com Mariana e o Codex dela"
];

for (const marker of requiredMarkers) {
  if (!schedule.includes(marker)) fail(`marcador ausente: ${marker}`);
}

const finalPackageIndex = schedule.indexOf("PACOTE_V4_08_REVISAO_GERAL_VIDEO_ZIP");
const publicationIndex = schedule.indexOf("PACOTE_V4_07_PUBLICACAO_CONSOLIDADA");
if (finalPackageIndex <= publicationIndex) fail("revisao geral, Video e ZIP devem ser o ultimo pacote");

console.log("CRONOGRAMA_MVPS_V4_OK mvps=14 pacotes=8 equipe=externa video=deferido zip=deferido");
