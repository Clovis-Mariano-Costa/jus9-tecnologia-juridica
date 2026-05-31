import fs from "node:fs/promises";

const portalUrl = process.env.JUS9_BASE_URL || "https://jus9tecnologia.com.br";
const catalogPath = new URL("../data-publica/mvp-perfis.json", import.meta.url);
const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(catalog.schema === "jus9.mvp.profiles.public.v1", "schema publico inesperado");
assert(Array.isArray(catalog.profiles) && catalog.profiles.length === 13, "catalogo deve conter 13 MVPs");

const expectedCodes = ["DAJ", "DAA", "DEJ", "DIC", "DPJ", "DIP", "DEE", "DEJI", "DOI", "DGE", "DMG", "DMP", "DAP"];
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
assert(sharedScript.includes("https://charlieecho.jus9tecnologia.com.br/api/ia"), "chat compartilhado nao aponta para API publica");
assert(sharedScript.includes("asksAboutCharlieModes"), "roteamento explicito de modos ausente");
assert(sharedScript.includes("socialResponsibilityFallback"), "fallback tematico empresarial ausente");
assert(sharedScript.includes("initPriorityWorkflow"), "fluxos aprofundados compartilhados ausentes");
assert(sharedScript.includes("initGuidedPrompts"), "perguntas guiadas compartilhadas ausentes");

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
  assert(html.includes('script.js?v=20260531-mvp-flow-v2'), `${code}: script sem versao em ${page}`);
  console.log(`AI_PAGE_OK ${code} page=${page}`);
}

for (const page of catalog.profiles.map((profile) => profile.entry_page)) {
  const html = await fs.readFile(new URL(`../${page}`, import.meta.url), "utf8");
  assert(html.includes('script.js?v=20260531-mvp-flow-v2'), `painel sem versao de script: ${page}`);
}

console.log("STATIC_OK chat-compartilhado-13-mvps");
console.log("STATIC_OK fluxos-aprofundados-13-mvps");
console.log("STATIC_OK cache-bust-13-mvps");
console.log("PUBLIC_MVPS_REGRESSION_OK");
