import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const catalog = JSON.parse(fs.readFileSync(path.join(root, "data-publica", "mvp-perfis.json"), "utf8"));

const requiredCodes = ["DAJ", "DAA", "DEJ", "DIC", "DPJ", "DIP", "DEE", "DEJI", "DOI", "DGE", "DMG", "DMP", "DAP", "DED"];
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
  ["DED", "nao prometer publicacao"],
];

for (const [code, phrase] of mustMention) {
  assert(script.includes(phrase), `${code}: limite/assinatura essencial ausente: ${phrase}`);
}

const appIaFiles = fs.readdirSync(root).filter((name) => /^app-ia-.*\.html$/.test(name));
assert(appIaFiles.length === 14, `esperados 14 app-ia-*.html, encontrados ${appIaFiles.length}`);
assert(script.includes("DED: 'app-ia-autor-editor.html'"), "DED: rota editorial dedicada ausente");
assert(script.includes("['DED', 'Autor / Editor', 'app-ia-autor-editor.html']"), "DED: ambiente ausente no menu da Charlie");

const socialPage = fs.readFileSync(path.join(root, "app-ia-cidadao.html"), "utf8");
assert(socialPage.includes('data-ai-code="DIC"'), "DIC: codigo do modulo social ausente");
assert(socialPage.includes('value="social" checked'), "DIC: modo social deve permanecer padrao");
assert(script.includes("orientadora publica acolhedora para cidadao"), "DIC: identidade social foi descaracterizada");

for (const file of appIaFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const match = html.match(/data-ai-code=["']([A-Z]+)["']/);
  assert(Boolean(match), `${file}: data-ai-code ausente`);
  if (match) assert(requiredCodes.includes(match[1]), `${file}: codigo inesperado ${match[1]}`);
  assert(html.includes("data-ai-focus"), `${file}: data-ai-focus ausente`);
  const expectedScript = file === "app-ia-profissional.html"
    ? "script.js?v=20260719-daj-laudo-v2"
    : "script.js?v=20260712-charlie-pesquisa-ativa-v1";
  assert(html.includes(expectedScript), `${file}: versao aprovada do script ausente`);
}

const dedSupportingPages = [
  "app-ia-autor-editor.html",
  "app-perfis-autor-editor.html",
  "app-documentos-autor-editor.html",
  "app-workspace-autor-editor.html",
];
for (const file of dedSupportingPages) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  assert(html.includes("app-demo-autor-editor.html"), `${file}: retorno ao painel DED ausente`);
  assert(html.includes("app-ia-autor-editor.html"), `${file}: IA editorial dedicada ausente`);
}
const dedAiPage = fs.readFileSync(path.join(root, "app-ia-autor-editor.html"), "utf8");
for (const phrase of ["data-ai-code=\"DED\"", "autoria", "titularidade", "fontes", "versoes", "Drive real, ISBN, venda e contrato ficam bloqueados no demo publico"]) {
  assert(dedAiPage.includes(phrase), `DED: contrato editorial ausente na pagina de IA: ${phrase}`);
}

if (failures.length) {
  console.error("Falhas na auditoria de personas MVP da Charlie Echo:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("AUDITORIA_PERSONAS_MVP_OK 14 personas, 14 paginas dedicadas e DIC social verificados.");
