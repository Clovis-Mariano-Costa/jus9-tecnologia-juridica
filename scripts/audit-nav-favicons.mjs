import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const ignoredDirs = new Set([
  ".git",
  "node_modules",
  ".wrangler",
  ".cache",
]);

const removedMenuPatterns = [
  {
    name: "rotulo antigo Investidores em link",
    pattern: /<a\b[^>]*>\s*Investidores\s*<\/a>/i,
    allow: [/scripts[\\/]audit-nav-favicons\.mjs$/],
  },
  {
    name: "Equipe apontando para equipe.html",
    pattern: /href=["'](?:\.\/)?equipe\.html["'][^>]*>\s*Equipe\s*</i,
    allow: [/scripts[\\/]audit-nav-favicons\.mjs$/],
  },
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

function rel(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function isHtmlPage(text) {
  return /<html[\s>]/i.test(text) && /<head[\s>]/i.test(text) && /<\/head>/i.test(text);
}

function hasMvpCta(text) {
  return /Acompanhe os MVPs \/ Demos/i.test(text) &&
    /href=["'][^"']*mvp\.html#demos-jus9["']/i.test(text);
}

const files = walk(root);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const scannedTextFiles = files.filter((file) => /\.(html|js|md|mjs|json|webmanifest)$/i.test(file));

const failures = [];

for (const file of scannedTextFiles) {
  const relative = rel(file);
  const text = fs.readFileSync(file, "utf8");
  for (const rule of removedMenuPatterns) {
    if (rule.allow.some((allowed) => allowed.test(relative))) continue;
    if (rule.pattern.test(text)) {
      failures.push(`${relative}: ${rule.name}`);
    }
  }
}

for (const file of htmlFiles) {
  const text = fs.readFileSync(file, "utf8");
  if (!isHtmlPage(text)) continue;
  const hasFavicon = /rel=["'](?:shortcut )?icon|apple-touch-icon|favicon/i.test(text);
  if (!hasFavicon) {
    failures.push(`${rel(file)}: pagina HTML completa sem favicon`);
  }
}

const homeFile = path.join(root, "index.html");
if (fs.existsSync(homeFile)) {
  const homeText = fs.readFileSync(homeFile, "utf8");
  if (!hasMvpCta(homeText)) {
    failures.push("index.html: CTA Acompanhe os MVPs / Demos ausente ou sem link para mvp.html#demos-jus9");
  }
}

if (failures.length) {
  console.error("Auditoria de navegacao/favicons falhou:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Auditoria OK: ${htmlFiles.length} HTMLs verificados; menu e favicons sem regressao.`);
