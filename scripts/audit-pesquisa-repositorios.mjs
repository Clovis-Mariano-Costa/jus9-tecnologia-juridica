import fs from 'node:fs/promises';

const root = new URL('../', import.meta.url);
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const [home, page, client, catalog, sitemap, worker, versioning, sync, distHome, distPage, distClient, distCatalog] = await Promise.all([
  fs.readFile(new URL('index.html', root), 'utf8'),
  fs.readFile(new URL('pesquisa-repositorios.html', root), 'utf8'),
  fs.readFile(new URL('assets/js/pesquisa-repositorios.js', root), 'utf8'),
  fs.readFile(new URL('data-publica/repositorios-jus9.json', root), 'utf8').then(JSON.parse),
  fs.readFile(new URL('sitemap.xml', root), 'utf8'),
  fs.readFile(new URL('service-worker.js', root), 'utf8'),
  fs.readFile(new URL('versionamento.html', root), 'utf8'),
  fs.readFile(new URL('scripts/Sync-PortalDist.ps1', root), 'utf8'),
  fs.readFile(new URL('dist/index.html', root), 'utf8'),
  fs.readFile(new URL('dist/pesquisa-repositorios.html', root), 'utf8'),
  fs.readFile(new URL('dist/assets/js/pesquisa-repositorios.js', root), 'utf8'),
  fs.readFile(new URL('dist/data-publica/repositorios-jus9.json', root), 'utf8').then(JSON.parse)
]);

assert(home.includes('href="pesquisa-repositorios.html">Pesquisa</a>'), 'menu principal sem link Pesquisa');
assert(page.includes('data-repository-search-form') && page.includes('data-github-search'), 'pagina sem controles de pesquisa');
assert(client.includes("user:${owner}") && client.includes("credentials: 'same-origin'"), 'cliente sem busca governada ou origem local');
assert(catalog.schemaVersion === '1.0.0', 'catalogo sem versao de esquema');
assert(Array.isArray(catalog.repositories) && catalog.repositories.length === 31, 'catalogo deve conter os 31 repositorios Jus 9 identificados');
assert(new Set(catalog.repositories.map((repo) => repo.name)).size === catalog.repositories.length, 'catalogo possui repositorio duplicado');
assert(catalog.repositories.every((repo) => ['public', 'restricted'].includes(repo.visibility)), 'catalogo possui visibilidade invalida');
assert(catalog.governance.credentials.includes('Nenhuma credencial'), 'catalogo sem limite explicito de credenciais');
assert(sitemap.includes('https://jus9tecnologia.com.br/pesquisa-repositorios.html'), 'sitemap sem pagina de pesquisa');
for (const asset of ['/pesquisa-repositorios.html', '/assets/js/pesquisa-repositorios.js', '/data-publica/repositorios-jus9.json']) {
  assert(worker.includes(asset), `service worker sem ${asset}`);
}
assert(versioning.includes('Versionamento Jus 9 - v5.13') && versioning.includes('Versao 5.12 - Pesquisa federada de repositorios GitHub'), 'versionamento publico sem v5.13 corrente e card v5.12 da pesquisa');
for (const asset of ['pesquisa-repositorios.html', 'pesquisa-repositorios.js', 'repositorios-jus9.json', "'_redirects'"]) {
  assert(sync.includes(asset), `sincronizacao dist sem ${asset}`);
}
assert(distHome === home, 'dist/index.html fora de sincronia');
assert(distPage === page, 'pagina de pesquisa em dist fora de sincronia');
assert(distClient === client, 'cliente de pesquisa em dist fora de sincronia');
assert(JSON.stringify(distCatalog) === JSON.stringify(catalog), 'catalogo em dist fora de sincronia');

console.log('PESQUISA_REPOSITORIOS_OK total=31 sem-credenciais');
