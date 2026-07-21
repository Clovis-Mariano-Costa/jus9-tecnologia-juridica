import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.resolve(root, 'dist');
if (path.dirname(dist) !== root || path.basename(dist) !== 'dist') {
  throw new Error(`Destino de build inseguro: ${dist}`);
}

const rootEntries = await fs.readdir(root, { withFileTypes: true });
const rootFiles = rootEntries
  .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
  .map((entry) => entry.name);
rootFiles.push(
  'script.js',
  'style.css',
  'service-worker.js',
  'sw.js',
  'manifest.webmanifest',
  'sitemap.xml',
  'robots.txt',
  '_headers',
  '_redirects'
);

const publicDirectories = [
  'assets',
  'auth',
  'charlie-delta-da-costa',
  'data-publica',
  'documentos',
  'EQUIPE',
  'lares',
  'login',
  'olamundo',
  'origem-visual',
  'politica-de-privacidade'
];

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(dist, { recursive: true });

for (const name of [...new Set(rootFiles)]) {
  const source = path.join(root, name);
  const target = path.join(dist, name);
  await fs.copyFile(source, target);
}

for (const name of publicDirectories) {
  const source = path.join(root, name);
  const target = path.join(dist, name);
  await fs.cp(source, target, { recursive: true, force: true });
}

const builtFiles = [];
async function collect(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(absolute);
    else builtFiles.push(path.relative(dist, absolute).replaceAll('\\', '/'));
  }
}
await collect(dist);

if (!builtFiles.includes('index.html') || !builtFiles.includes('script.js') || !builtFiles.includes('assets/js/pesquisa-repositorios.js')) {
  throw new Error('Build Cloudflare incompleto: ativos publicos obrigatorios ausentes.');
}
if (builtFiles.includes('worker.js') || builtFiles.some((file) => file.startsWith('governanca/'))) {
  throw new Error('Build Cloudflare tentou expor fonte operacional ou governanca interna.');
}

console.log(`CLOUDFLARE_DIST_OK files=${builtFiles.length} source=tracked-public-assets`);
