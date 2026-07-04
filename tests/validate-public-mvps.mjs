import fs from "node:fs/promises";

const portalUrl = process.env.JUS9_BASE_URL || "https://jus9tecnologia.com.br";
const catalogPath = new URL("../data-publica/mvp-perfis.json", import.meta.url);
const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(catalog.schema === "jus9.mvp.profiles.public.v1", "schema publico inesperado");
assert(Array.isArray(catalog.profiles) && catalog.profiles.length === 14, "catalogo deve conter 14 MVPs");

const expectedCodes = ["DAJ", "DAA", "DEJ", "DIC", "DPJ", "DIP", "DEE", "DEJI", "DOI", "DGE", "DMG", "DMP", "DAP", "DED"];
const actualCodes = catalog.profiles.map((profile) => profile.dossier_code);
assert(expectedCodes.every((code) => actualCodes.includes(code)), "catalogo nao contem todos os dossies canonicos");

for (const profile of catalog.profiles) {
  assert(profile.entry_page && profile.profiles_page, `${profile.dossier_code}: paginas ausentes no catalogo`);
  assert(Array.isArray(profile.subprofiles) && profile.subprofiles.length > 0, `${profile.dossier_code}: subperfis ausentes`);
  await fs.access(new URL(`../${profile.entry_page}`, import.meta.url));
  await fs.access(new URL(`../${profile.profiles_page}`, import.meta.url));

  const [entryResponse, profilesResponse] = await Promise.all([
    fetch(`${portalUrl}/${profile.entry_page}`),
    fetch(`${portalUrl}/${profile.profiles_page}`),
  ]);
  assert(entryResponse.ok, `${profile.dossier_code}: pagina publicada indisponivel ${profile.entry_page}`);
  assert(profilesResponse.ok, `${profile.dossier_code}: pagina publicada indisponivel ${profile.profiles_page}`);
  console.log(`MVP_OK ${profile.dossier_code} entry=${profile.entry_page} profiles=${profile.profiles_page}`);
}

const sharedScript = await fs.readFile(new URL("../script.js", import.meta.url), "utf8");
const teamPage = await fs.readFile(new URL("../app-equipe.html", import.meta.url), "utf8");
const installPage = await fs.readFile(new URL("../instalar-app.html", import.meta.url), "utf8");
const pwaInstallScript = await fs.readFile(new URL("../assets/js/pwa-install.js", import.meta.url), "utf8");
const canonicalServiceWorker = await fs.readFile(new URL("../service-worker.js", import.meta.url), "utf8");
const legacyServiceWorker = await fs.readFile(new URL("../sw.js", import.meta.url), "utf8");
assert(sharedScript.includes("https://charlieecho.jus9tecnologia.com.br/api/ia"), "chat compartilhado nao aponta para API publica");
assert(sharedScript.includes("asksAboutCharlieModes"), "roteamento explicito de modos ausente");
assert(sharedScript.includes("Protocolo Centelha Criativa 5.4"), "protocolo de criatividade governada ausente");
assert(sharedScript.includes("applyCreativeReasoningFrame"), "superficie de raciocinio aparente ausente");
assert(sharedScript.includes("Leitura do pedido"), "estrutura de leitura do pedido ausente");
assert(sharedScript.includes("socialResponsibilityFallback"), "fallback tematico empresarial ausente");
assert(sharedScript.includes("initPriorityWorkflow"), "fluxos aprofundados compartilhados ausentes");
assert(sharedScript.includes("initGuidedPrompts"), "perguntas guiadas compartilhadas ausentes");
assert(sharedScript.includes("initTeamMenuLink"), "menu compartilhado de equipe ausente");
assert(sharedScript.includes("initTeamPage"), "pagina compartilhada de equipe ausente");
assert(sharedScript.includes("jus9MvpTeamMembersV1"), "persistencia local de equipe ausente");
assert(sharedScript.includes("jus9MvpTeamAuditV1"), "auditoria local de equipe ausente");
assert(teamPage.includes("data-team-page"), "pagina compartilhada de equipe sem raiz");
assert(teamPage.includes("data-team-form"), "pagina compartilhada de equipe sem formulario");
assert(installPage.includes("install-app-green-card"), "card da Jus 9 Verde ausente na pagina de instalacao");
assert(installPage.includes("https://jus9verde.jus9tecnologia.com.br/instalar-app.html"), "link de instalacao da Jus 9 Verde ausente");
assert(installPage.includes("style.css?v=20260601-jus9-verde-card"), "pagina de instalacao sem atualizacao imediata do estilo verde");
assert(pwaInstallScript.includes("register('/service-worker.js')"), "script PWA legado nao registra worker canonico");
assert(!pwaInstallScript.includes("register('/sw.js')"), "script PWA legado ainda registra worker duplicado");
assert(legacyServiceWorker.includes("importScripts('/service-worker.js')"), "ponte legada /sw.js ausente");
assert(canonicalServiceWorker.includes("jus9-pwa-v6-2026-07-03-charlie-document-download"), "cache PWA principal desatualizado");
assert(canonicalServiceWorker.includes("caches.match('/offline.html')"), "fallback de arquivos estaticos do worker principal incorreto");

for (const code of expectedCodes) {
  assert(sharedScript.includes(`${code}: [`), `${code}: perguntas guiadas ausentes`);
  assert(sharedScript.includes(`${code}: {`), `${code}: fluxo aprofundado ausente`);
}

const priorityAiPages = {
  DAJ: "app-ia-profissional.html",
  DAA: "app-ia-professor.html",
  DEJ: "app-ia-estudante.html",
  DPJ: "app-ia-perito.html",
  DEJI: "app-ia-empresa.html",
  DIC: "app-ia-cidadao.html",
  DIP: "app-ia-investidor.html",
  DEE: "app-ia-escritorio.html",
  DOI: "app-ia-orgao-publico.html",
  DGE: "app-ia-administrador.html",
  DMG: "app-ia-juiz.html",
  DMP: "app-ia-promotor.html",
  DAP: "app-ia-delegado.html",
};

for (const [code, page] of Object.entries(priorityAiPages)) {
  const html = await fs.readFile(new URL(`../${page}`, import.meta.url), "utf8");
  assert(html.includes("data-ai-chat"), `${code}: chat ausente em ${page}`);
  assert(html.includes(`data-ai-code="${code}"`), `${code}: codigo incorreto em ${page}`);
  assert(html.includes('script.js?v=20260704-pecas-upload-v1'), `${code}: script sem versao em ${page}`);
  assert(html.includes('charlie-mvp-shell'), `${code}: pagina da Charlie sem shell visual em ${page}`);
  console.log(`AI_PAGE_OK ${code} page=${page}`);
}

for (const page of catalog.profiles.map((profile) => profile.entry_page)) {
  const html = await fs.readFile(new URL(`../${page}`, import.meta.url), "utf8");
  const expectedScript = page === "app-demo-autor-editor.html" ? "script.js?v=20260621-demo14" : "script.js?v=20260531-team-v1";
  assert(html.includes(expectedScript), `painel sem versao esperada de script: ${page}`);
}

const workspacePages = [
  "app-workspace.html",
  "app-workspace-professor.html",
  "app-workspace-estudante.html",
  "app-workspace-cidadao.html",
  "app-workspace-perito.html",
  "app-workspace-investidor.html",
  "app-workspace-escritorio.html",
  "app-workspace-empresa.html",
  "app-workspace-orgao-publico.html",
  "app-workspace-administrador.html",
  "app-workspace-juiz.html",
  "app-workspace-promotor.html",
  "app-workspace-delegado.html",
];

assert(sharedScript.includes("initWorkspaceSocialLinks"), "integracao social compartilhada ausente");
assert(sharedScript.includes("https://www.linkedin.com/sharing/share-offsite/"), "compartilhamento LinkedIn ausente");
assert(sharedScript.includes("https://www.facebook.com/sharer/sharer.php"), "compartilhamento Facebook ausente");
assert(sharedScript.includes("navigator.share"), "compartilhamento nativo ausente");

for (const page of workspacePages) {
  const html = await fs.readFile(new URL(`../${page}`, import.meta.url), "utf8");
  assert(html.includes('script.js?v=20260531-workspace-social-v1'), `workspace sem versao social: ${page}`);
}

console.log("STATIC_OK chat-compartilhado-14-mvps");
console.log("STATIC_OK fluxos-aprofundados-14-mvps");
console.log("STATIC_OK equipe-local-14-mvps");
console.log("STATIC_OK cache-bust-equipe-14-mvps");
console.log("STATIC_OK redes-sociais-workspace-13-mvps");
console.log("STATIC_OK card-instalacao-jus9-verde");
console.log("STATIC_OK service-worker-principal-canonico");
console.log("PUBLIC_MVPS_REGRESSION_OK");
