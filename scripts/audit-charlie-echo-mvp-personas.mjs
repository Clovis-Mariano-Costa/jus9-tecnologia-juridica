import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const catalog = JSON.parse(fs.readFileSync(path.join(root, "data-publica", "mvp-perfis.json"), "utf8"));

const requiredCodes = ["DAJ", "DAA", "DEJ", "DIC", "DPJ", "DIP", "DEE", "DEJI", "DOI", "DGE", "DMG", "DMP", "DAP"];
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

assert(script.includes("mvpPersonaRules"), "script.js: mapa mvpPersonaRules ausente");
assert(script.includes("mvpPersonalityInstruction"), "script.js: funcao mvpPersonalityInstruction ausente");
assert(script.includes("Personalidade operacional do MVP"), "script.js: instrucao de personalidade operacional ausente");
assert(script.includes("Assinatura criativa do ambiente"), "script.js: assinatura criativa ausente");
assert(script.includes("Limite duro do ambiente"), "script.js: limite duro ausente");
assert(script.includes("sem abandonar a identidade matriz da Charlie Echo"), "script.js: preservacao da identidade matriz ausente");

const catalogCodes = new Set((catalog.profiles || []).map((profile) => profile.dossier_code));
for (const code of requiredCodes) {
  assert(catalogCodes.has(code), `${code}: ausente no catalogo publico`);
  const blockPattern = new RegExp(`${code}:\\s*\\{[\\s\\S]*?persona:\\s*['"][^'"]+['"][\\s\\S]*?signature:\\s*['"][^'"]+['"][\\s\\S]*?limit:\\s*['"][^'"]+['"][\\s\\S]*?\\}`, "m");
  assert(blockPattern.test(script), `${code}: persona/signature/limit incompleto em mvpPersonaRules`);
}

const mustMention = [
  ["DPJ", "nunca tratar DPJ como delegacia"],
  ["DAP", "nao investigar"],
  ["DMG", "nao simular decisao judicial"],
  ["DMP", "nao simular denuncia"],
  ["DGE", "nao alterar cofre, DNA, Constituicao, prioritario ou clausulas petreas"],
  ["DIP", "nao prometer retorno financeiro"],
  ["DIC", "nao substituir advogado"],
  ["DAA", "nao substituir professor humano"],
  ["DEJ", "nao prometer aprovacao"],
  ["DEJI", "responsabilidade social"],
  ["DOI", "nao simular ato administrativo real"],
  ["DEE", "segredo profissional"],
  ["DAJ", "nao assinar"],
];

for (const [code, phrase] of mustMention) {
  assert(script.includes(phrase), `${code}: limite/assinatura essencial ausente: ${phrase}`);
}

const appIaFiles = fs.readdirSync(root).filter((name) => /^app-ia-.*\.html$/.test(name));
assert(appIaFiles.length === 13, `esperados 13 app-ia-*.html, encontrados ${appIaFiles.length}`);

for (const file of appIaFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const match = html.match(/data-ai-code=["']([A-Z]+)["']/);
  assert(Boolean(match), `${file}: data-ai-code ausente`);
  if (match) assert(requiredCodes.includes(match[1]), `${file}: codigo inesperado ${match[1]}`);
  assert(html.includes("data-ai-focus"), `${file}: data-ai-focus ausente`);
  assert(html.includes("script.js?v=20260712-charlie-ocr-local-v1"), `${file}: script do pacote de instrumentos sociais ausente`);
}

if (failures.length) {
  console.error("Falhas na auditoria de personas MVP da Charlie Echo:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("AUDITORIA_PERSONAS_MVP_OK 13 personas, assinaturas criativas e limites duros verificados.");
