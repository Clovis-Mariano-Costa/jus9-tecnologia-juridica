const installPages = [
  {
    label: "Jus 9",
    url: "https://jus9tecnologia.com.br/instalar-app",
    manifest: "https://jus9tecnologia.com.br/manifest.webmanifest",
    serviceWorker: "https://jus9tecnologia.com.br/service-worker.js",
    requiredLink: "https://jus9verde.jus9tecnologia.com.br/instalar-app.html",
  },
  {
    label: "Jus 9 Verde",
    url: "https://jus9verde.jus9tecnologia.com.br/instalar-app",
    manifest: "https://jus9verde.jus9tecnologia.com.br/manifest.webmanifest",
    serviceWorker: "https://jus9verde.jus9tecnologia.com.br/service-worker.js",
    requiredLink: "https://jus9tecnologia.com.br/instalar-app",
  },
  { label: "Investimentos", url: "https://investimentos.jus9tecnologia.com.br/instalar-app" },
  { label: "Charlie Echo", url: "https://charlieecho.jus9tecnologia.com.br/instalar-app" },
  { label: "Carta", url: "https://carta.jus9tecnologia.com.br/instalar-app" },
  { label: "Equipe", url: "https://equipe.jus9tecnologia.com.br/instalar-app" },
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function fetchOk(url, label) {
  const response = await fetch(url, { redirect: "follow" });
  assert(response.ok, `${label}: ${url} respondeu ${response.status}`);
  return response;
}

for (const page of installPages) {
  const response = await fetchOk(page.url, page.label);
  const html = await response.text();
  assert(/instalar|instale|instala[cç][aã]o/i.test(html), `${page.label}: pagina sem orientacao de instalacao`);
  if (page.requiredLink) {
    assert(html.includes(page.requiredLink), `${page.label}: link reciproco de instalacao ausente`);
  }

  if (page.manifest) {
    const manifestResponse = await fetchOk(page.manifest, `${page.label} manifest`);
    const manifest = await manifestResponse.json();
    assert(manifest.name && manifest.start_url && manifest.display, `${page.label}: manifest PWA incompleto`);

    const workerResponse = await fetchOk(page.serviceWorker, `${page.label} service worker`);
    const worker = await workerResponse.text();
    assert(/addEventListener\(['"]fetch['"]/.test(worker), `${page.label}: service worker sem estrategia de fetch`);
  }

  console.log(`INSTALL_PAGE_OK ${page.label}${page.manifest ? " pwa=sim" : " pwa=pagina-publica"}`);
}

console.log("PUBLIC_INSTALL_AUDIT_OK pages=6 pwas=2");
