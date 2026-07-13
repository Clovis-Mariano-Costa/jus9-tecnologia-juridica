import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const inventory = JSON.parse(fs.readFileSync(path.join(root, "governanca", "INVENTARIO_CANONICO_MVPS_CHARLIE_ECHO_v1.0.0.json"), "utf8"));
const catalog = JSON.parse(fs.readFileSync(path.join(root, "data-publica", "mvp-perfis.json"), "utf8"));
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const worker = fs.readFileSync(path.join(root, "worker.js"), "utf8");

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const catalogCodes = (catalog.profiles || []).map((profile) => profile.dossier_code);
assert(inventory.counts?.mvps === 14, "inventario deve declarar 14 MVPs");
assert(inventory.counts?.dedicatedAiPages === 13, "inventario deve declarar 13 paginas de IA dedicadas");
assert(catalogCodes.length === inventory.counts?.mvps, "catalogo e inventario divergem na quantidade");
assert(new Set(catalogCodes).size === catalogCodes.length, "catalogo possui codigo de MVP duplicado");
assert(JSON.stringify(catalogCodes) === JSON.stringify(inventory.codes), "ordem ou codigos canonicos divergentes");

for (const profile of catalog.profiles || []) {
  assert(fs.existsSync(path.join(root, profile.entry_page || "")), `${profile.dossier_code}: pagina de entrada ausente`);
  assert(fs.existsSync(path.join(root, profile.profiles_page || "")), `${profile.dossier_code}: pagina de perfis ausente`);
  assert(script.includes(`${profile.dossier_code}: {`), `${profile.dossier_code}: personalidade/fluxo ausente no script`);
}

assert(inventory.sharedAiRoutes?.DED === "app-ia-profissional.html", "DED deve declarar rota de IA compartilhada transitoria");
assert(script.includes("DED: 'app-ia-profissional.html'"), "roteamento DED para IA profissional ausente");
assert(worker.includes('DED: ["Autor / Editor"'), "contexto autenticado DED ausente no Worker");

if (failures.length) {
  console.error("Falhas no inventario canonico dos MVPs:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("MVP_INVENTORY_OK mvps=14 dedicated_ai_pages=13 shared_ded=1");
