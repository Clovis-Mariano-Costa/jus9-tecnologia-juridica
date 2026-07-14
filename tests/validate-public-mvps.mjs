import fs from "node:fs/promises";

const portalUrl = process.env.JUS9_BASE_URL || "https://jus9tecnologia.com.br";
const catalogPath = new URL("../data-publica/mvp-perfis.json", import.meta.url);
const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(catalog.schema === "jus9.mvp.profiles.public.v1", "schema publico inesperado");
assert(Array.isArray(catalog.profiles) && catalog.profiles.length === 14, "catalogo deve conter 14 MVPs");

const remoteCatalogResponse = await fetch(`${portalUrl}/data-publica/mvp-perfis.json`, { cache: "no-store" });
assert(remoteCatalogResponse.ok, "catalogo publico remoto indisponivel");
const remoteCatalog = await remoteCatalogResponse.json();
assert(Array.isArray(remoteCatalog.profiles) && remoteCatalog.profiles.length === 14, "catalogo remoto deve conter 14 MVPs");
assert(remoteCatalog.updated_at === catalog.updated_at, "catalogo remoto esta defasado em relacao ao repositorio");

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
const processPage = await fs.readFile(new URL("../app-processos.html", import.meta.url), "utf8");
const intakePage = await fs.readFile(new URL("../app-atendimento-inicial.html", import.meta.url), "utf8");
const intakeScript = await fs.readFile(new URL("../assets/js/daj-intake.js", import.meta.url), "utf8");
const installPage = await fs.readFile(new URL("../instalar-app.html", import.meta.url), "utf8");
const pwaInstallScript = await fs.readFile(new URL("../assets/js/pwa-install.js", import.meta.url), "utf8");
const canonicalServiceWorker = await fs.readFile(new URL("../service-worker.js", import.meta.url), "utf8");
const legacyServiceWorker = await fs.readFile(new URL("../sw.js", import.meta.url), "utf8");
const wranglerConfig = await fs.readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8");
const workerSource = await fs.readFile(new URL("../worker.js", import.meta.url), "utf8");
const distSyncScript = await fs.readFile(new URL("../scripts/Sync-PortalDist.ps1", import.meta.url), "utf8");
assert(sharedScript.includes("/api/charlie/respond"), "chat compartilhado nao aponta para proxy governado da API");
assert(sharedScript.includes("asksAboutCharlieModes"), "roteamento explicito de modos ausente");
assert(sharedScript.includes("Protocolo Centelha Criativa 5.4"), "protocolo de criatividade governada ausente");
assert(sharedScript.includes("applyCreativeReasoningFrame"), "superficie de raciocinio aparente ausente");
assert(sharedScript.includes("Leitura do pedido"), "estrutura de leitura do pedido ausente");
assert(sharedScript.includes("socialResponsibilityFallback"), "fallback tematico empresarial ausente");
assert(sharedScript.includes("initPriorityWorkflow"), "fluxos aprofundados compartilhados ausentes");
assert(sharedScript.includes("initGuidedPrompts"), "perguntas guiadas compartilhadas ausentes");
assert(sharedScript.includes("initTeamMenuLink"), "menu compartilhado de equipe ausente");
assert(sharedScript.includes("initTeamPage"), "pagina compartilhada de equipe ausente");
assert(sharedScript.includes("/api/attachments/extract"), "extrator backend governado de anexos ausente");
assert(sharedScript.includes("canReadUploadAsDocx"), "leitura DOCX governada ausente");
assert(sharedScript.includes("docx_backend_xml"), "modo DOCX backend ausente");
assert(sharedScript.includes("ensureUploadTesseract"), "OCR local governado sem Tesseract lazy-load");
assert(sharedScript.includes("ensureUploadPdfJs"), "OCR local governado sem PDF.js lazy-load");
assert(sharedScript.includes("OCR local governado"), "rotulo de OCR local governado ausente");
assert(sharedScript.includes("pdf_ocr_local_first_pages"), "modo OCR de PDF escaneado ausente");
assert(sharedScript.includes("image_ocr_local"), "modo OCR de imagem ausente");
assert(sharedScript.includes("Drive Saver preparado"), "card DAJ/Drive nao mostra preparo governado");
assert(sharedScript.includes("Governanca do artefato"), "card DAJ/Drive nao mostra decisao governada");
assert(sharedScript.includes("pastaDestino"), "card DAJ/Drive nao exibe pasta destino real");
assert(sharedScript.includes("revisaoHumanaObrigatoria"), "card DAJ/Drive nao exibe revisao humana real");
assert(sharedScript.includes("postCharlieApiBody"), "chamada da API sem helper de timeout/diagnostico");
assert(sharedScript.includes("compactApiQuestionForRetry"), "chamada da API sem retry compacto");
assert(sharedScript.includes("retry_compacto"), "chamada da API sem marcador de recuperacao");
assert(sharedScript.includes("Detalhe:"), "erro de API sem diagnostico visivel");
assert(sharedScript.includes("asksActiveLegalCitationResearch"), "pesquisa ativa de citacao/doutrina ausente");
assert(sharedScript.includes("activeLegalCitationInstruction"), "instrucao de pesquisa ativa ausente");
assert(sharedScript.includes("pesquisa_citacao_doutrinaria_ativa"), "rota de pesquisa ativa ausente");
assert(sharedScript.includes("Em pesquisa processual governada, reconheca tres chaves"), "governanca de pesquisa processual nome/CPF ausente");
assert(sharedScript.includes("jus9MvpTeamMembersV1"), "persistencia local de equipe ausente");
assert(sharedScript.includes("jus9MvpTeamAuditV1"), "auditoria local de equipe ausente");
assert(teamPage.includes("data-team-page"), "pagina compartilhada de equipe sem raiz");
assert(teamPage.includes("data-team-form"), "pagina compartilhada de equipe sem formulario");
assert(processPage.includes('id="process-search-type"'), "pagina de processos sem seletor de tipo de pesquisa");
assert(processPage.includes('<option value="daj">DAJ</option>'), "pagina de processos sem busca por DAJ");
assert(processPage.includes('<option value="nome">Nome da parte</option>'), "pagina de processos sem busca por nome");
assert(processPage.includes('<option value="cpf">CPF</option>'), "pagina de processos sem busca por CPF");
assert(processPage.includes("CPF sempre mascarado"), "pagina de processos sem aviso de CPF mascarado");
assert(processPage.includes("/api/judicial/parties/search"), "pagina de processos sem pesquisa estruturada de partes");
assert(processPage.includes("nenhum modelo generativo foi chamado"), "pagina de processos sem garantia contra resposta inventada");
assert(!processPage.includes("String(item.cpfMasked || '').slice(-2) ==="), "pagina de processos ainda compara apenas finais do CPF");
assert(processPage.includes("jus9DajProcessLinksV1"), "pagina de processos sem persistencia local DAJ-processo");
assert(processPage.includes("/api/daj-process-links"), "pagina de processos sem API autenticada DAJ-processo");
assert(processPage.includes("credentials:'include'"), "pagina de processos sem credenciais na API DAJ-processo");
assert(processPage.includes("fallback local demonstrativo"), "pagina de processos sem fallback local demonstrativo");
assert(processPage.includes("backend autenticado"), "pagina de processos sem rotulo de backend autenticado");
assert(processPage.includes("data-linked-daj-panel"), "pagina de processos sem painel de DAJ vinculado");
assert(processPage.includes("data-daj-link-list"), "pagina de processos sem indice DAJ-processo");
assert(processPage.includes("Cada DAJ pode ficar vinculado a um unico processo"), "pagina de processos sem regra um DAJ um processo");
assert(processPage.includes("Indice DAJ-processo"), "pagina de processos ainda apresenta indice apenas local");
assert(processPage.includes("Entrar para usar a memoria oficial"), "pagina de processos sem acesso ao login da memoria oficial");
assert(intakePage.includes("data-daj-intake-form"), "atendimento inicial sem formulario DAJ governado");
assert(intakePage.includes("/auth/google/start?return_to=%2Fapp-atendimento-inicial.html"), "atendimento inicial sem login com retorno seguro");
assert(intakePage.includes('name="cpf"') && intakePage.includes('data-sensitive-field="cpf"'), "atendimento inicial sem CPF marcado como sensivel");
assert(intakePage.includes("data-charlie-exclude"), "atendimento inicial nao exclui dados sensiveis do prompt da Charlie");
assert(intakePage.includes("assets/js/daj-intake.js?v=20260713-daj-homologation-v1"), "atendimento inicial sem cliente versionado da homologacao reversivel");
assert(intakePage.includes("data-delete-test-daj"), "atendimento inicial sem limpeza governada do registro ficticio");
assert(intakePage.includes("data-daj-login-link"), "atendimento inicial sem retorno autenticado ao DAJ consultado");
assert(!intakePage.includes("Demonstração: atendimento inicial salvo"), "atendimento inicial ainda finge salvamento por alerta");
assert(intakeScript.includes("fetch('/api/dajs'"), "cliente do atendimento nao chama cadastro DAJ");
assert(intakeScript.includes("credentials: 'include'"), "cadastro DAJ no frontend sem sessao autenticada");
assert(intakeScript.includes("'Idempotency-Key'"), "cadastro DAJ no frontend sem idempotencia");
assert(intakeScript.includes("cpfInput.value = ''"), "frontend nao limpa CPF integral depois de indexar");
assert(intakeScript.includes("testMode: true") && intakeScript.includes("environment: 'homologacao'"), "frontend nao marca registros ficticios de homologacao");
assert(intakeScript.includes("method: 'DELETE'") && intakeScript.includes("EXCLUIR TESTE"), "frontend sem exclusao confirmada do DAJ ficticio");
assert(intakeScript.includes("resumeDajFromUrl") && intakeScript.includes("searchParams.get('dajId')"), "frontend sem retomada do DAJ por URL");
assert(!intakeScript.includes("localStorage"), "cliente do cadastro DAJ nao deve persistir atendimento no navegador");
assert(wranglerConfig.includes('"binding": "JUS9_DAJ_PROCESS_LINKS"'), "wrangler sem KV oficial DAJ-processo");
assert(wranglerConfig.includes('"binding": "JUS9_USER_MEMORY"'), "wrangler sem KV dedicado de memoria do usuario");
assert(wranglerConfig.includes('"binding": "JUS9_DATAJUD_CACHE"'), "wrangler sem KV dedicado do DataJud");
assert(workerSource.includes('originalUrl.pathname === "/api/health"'), "worker sem health explicito");
assert(workerSource.includes('originalUrl.pathname === "/api/judicial/datajud/readiness"'), "worker sem readiness canonico DataJud");
assert(workerSource.includes('originalUrl.pathname === "/api/judicial/pdpj/readiness"'), "worker sem readiness PDPJ");
assert(workerSource.includes('originalUrl.pathname === "/api/judicial/parties/search"'), "worker sem pesquisa estruturada de partes");
assert(workerSource.includes('originalUrl.pathname === "/api/dajs"'), "worker sem cadastro DAJ autenticado");
assert(workerSource.includes("idempotency_key_reutilizada_com_payload_diferente"), "worker sem protecao idempotente do cadastro DAJ");
assert(workerSource.includes("exclui_cadastro_daj_homologacao"), "worker sem auditoria da limpeza de homologacao");
assert(workerSource.includes("daj-record:tombstone:v1:"), "worker sem tombstone do DAJ ficticio removido");
assert(workerSource.includes("production_records_are_immutable_here"), "worker nao protege DAJ comum da rota de limpeza");
assert(workerSource.includes("daj-record:v1:"), "worker sem detalhe DAJ separado do indice pesquisavel");
assert(workerSource.includes("cpfLookupHash"), "worker sem indice HMAC exato de CPF");
assert(workerSource.includes('DED: ["Autor / Editor"'), "worker sem contexto canonico DED");
assert(installPage.includes("install-app-green-card"), "card da Jus 9 Verde ausente na pagina de instalacao");
assert(installPage.includes("https://jus9verde.jus9tecnologia.com.br/instalar-app.html"), "link de instalacao da Jus 9 Verde ausente");
assert(installPage.includes("style.css?v=20260601-jus9-verde-card"), "pagina de instalacao sem atualizacao imediata do estilo verde");
assert(pwaInstallScript.includes("register('/service-worker.js')"), "script PWA legado nao registra worker canonico");
assert(!pwaInstallScript.includes("register('/sw.js')"), "script PWA legado ainda registra worker duplicado");
assert(legacyServiceWorker.includes("importScripts('/service-worker.js')"), "ponte legada /sw.js ausente");
assert(canonicalServiceWorker.includes("jus9-pwa-v30-2026-07-13-daj-homologation-cleanup"), "cache PWA principal desatualizado");
assert(canonicalServiceWorker.includes("/assets/js/daj-intake.js"), "cache PWA sem cliente do cadastro DAJ");
assert(distSyncScript.includes("assets\\js\\daj-intake.js"), "sincronizacao de deploy nao inclui cliente do cadastro DAJ");
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
  DED: "app-ia-autor-editor.html",
};

for (const [code, page] of Object.entries(priorityAiPages)) {
  const html = await fs.readFile(new URL(`../${page}`, import.meta.url), "utf8");
  assert(html.includes("data-ai-chat"), `${code}: chat ausente em ${page}`);
  assert(html.includes(`data-ai-code="${code}"`), `${code}: codigo incorreto em ${page}`);
  assert(html.includes('script.js?v=20260712-charlie-pesquisa-ativa-v1'), `${code}: script sem versao em ${page}`);
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
  "app-workspace-autor-editor.html",
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
console.log("STATIC_OK redes-sociais-workspace-13-paginas-ia");
console.log("STATIC_OK card-instalacao-jus9-verde");
console.log("STATIC_OK service-worker-principal-canonico");
console.log("PUBLIC_MVPS_REGRESSION_OK");
