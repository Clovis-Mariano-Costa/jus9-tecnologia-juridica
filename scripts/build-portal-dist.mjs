import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const explicitFiles = [
  "script.js",
  "style.css",
  "_headers",
  "_redirects",
  "manifest.webmanifest",
  "service-worker.js",
  "sitemap.xml",
  "assets/js/daj-intake.js",
  "assets/js/daj-registry-list.js",
  "assets/js/governed-team-directory.js",
  "assets/js/pesquisa-repositorios.js",
  "assets/css/daj-clean-ui.css",
  "assets/css/build-week-reviewer.css",
  "assets/clovis-founder-portrait.png",
  "assets/clovis-founder-context.png",
  "data-publica/mvp-perfis.json",
  "data-publica/repositorios-jus9.json",
  "documentos/contrato-prestacao-servicos-demo.txt",
  "documentos/minuta-contestacao-demo.txt",
  "documentos/relatorio-atendimento-demo.txt",
];

const topLevelHtml = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
  .map((entry) => entry.name);
const documentsHtml = readdirSync(path.join(root, "documentos"), { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
  .map((entry) => `documentos/${entry.name}`);
const files = [...new Set([...explicitFiles, ...topLevelHtml, ...documentsHtml])].sort();

if (files.length !== 176) {
  throw new Error(`Manifesto publico inesperado: esperado=176 atual=${files.length}`);
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

for (const relativePath of files) {
  const source = path.resolve(root, relativePath);
  const target = path.resolve(dist, relativePath);
  if (!source.startsWith(`${root}${path.sep}`) || !target.startsWith(`${dist}${path.sep}`)) {
    throw new Error(`Caminho fora do portal: ${relativePath}`);
  }
  if (!existsSync(source)) {
    throw new Error(`Arquivo fonte nao encontrado: ${relativePath}`);
  }
  mkdirSync(path.dirname(target), { recursive: true });
  copyFileSync(source, target);
}

const forbidden = files.filter((file) =>
  /(^|\/)(\.env|tmp|governanca|releases)(\/|$)|\.(md|zip)$/i.test(file)
);
if (forbidden.length > 0) {
  throw new Error(`Artefato publico contem caminho proibido: ${forbidden.join(", ")}`);
}

console.log(`PORTAL_DIST_BUILD_OK files=${files.length} output=dist`);
