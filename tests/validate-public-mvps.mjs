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
const teamDirectoryScript = await fs.readFile(new URL("../assets/js/governed-team-directory.js", import.meta.url), "utf8");
const processPage = await fs.readFile(new URL("../app-processos.html", import.meta.url), "utf8");
const intakePage = await fs.readFile(new URL("../app-atendimento-inicial.html", import.meta.url), "utf8");
const intakeScript = await fs.readFile(new URL("../assets/js/daj-intake.js", import.meta.url), "utf8");
const dajRegistryPage = await fs.readFile(new URL("../app-clientes.html", import.meta.url), "utf8");
const dajRegistryScript = await fs.readFile(new URL("../assets/js/daj-registry-list.js", import.meta.url), "utf8");
const dajProfilesPage = await fs.readFile(new URL("../app-perfis.html", import.meta.url), "utf8");
const dajDashboardPage = await fs.readFile(new URL("../app-demo-advogar.html", import.meta.url), "utf8");
const dajAiPage = await fs.readFile(new URL("../app-ia-profissional.html", import.meta.url), "utf8");
const dajCleanStyle = await fs.readFile(new URL("../assets/css/daj-clean-ui.css", import.meta.url), "utf8");
const mvpLandingPage = await fs.readFile(new URL("../mvp.html", import.meta.url), "utf8");
const leaderMvpPage = await fs.readFile(new URL("../lider-mvp.html", import.meta.url), "utf8");
const mvpExecutivePanelPage = await fs.readFile(new URL("../app-painel-mvps.html", import.meta.url), "utf8");
const dedDashboardPage = await fs.readFile(new URL("../app-demo-autor-editor.html", import.meta.url), "utf8");
const dedAiShowcasePage = await fs.readFile(new URL("../app-ia-autor-editor.html", import.meta.url), "utf8");
const dicDashboardPage = await fs.readFile(new URL("../app-demo-cidadao.html", import.meta.url), "utf8");
const dicAiShowcasePage = await fs.readFile(new URL("../app-ia-cidadao.html", import.meta.url), "utf8");
const deeDashboardPage = await fs.readFile(new URL("../app-demo-escritorio.html", import.meta.url), "utf8");
const deeAiShowcasePage = await fs.readFile(new URL("../app-ia-escritorio.html", import.meta.url), "utf8");
const dejiDashboardPage = await fs.readFile(new URL("../app-demo-empresa.html", import.meta.url), "utf8");
const dejiAiShowcasePage = await fs.readFile(new URL("../app-ia-empresa.html", import.meta.url), "utf8");
const dpjDashboardPage = await fs.readFile(new URL("../app-demo-perito.html", import.meta.url), "utf8");
const dpjAiShowcasePage = await fs.readFile(new URL("../app-ia-perito.html", import.meta.url), "utf8");
const dipDashboardPage = await fs.readFile(new URL("../app-demo-investidor.html", import.meta.url), "utf8");
const daaDashboardPage = await fs.readFile(new URL("../app-demo-professor.html", import.meta.url), "utf8");
const dejDashboardPage = await fs.readFile(new URL("../app-demo-estudante.html", import.meta.url), "utf8");
const doiDashboardPage = await fs.readFile(new URL("../app-demo-orgao-publico.html", import.meta.url), "utf8");
const dgeDashboardPage = await fs.readFile(new URL("../app-demo-administrador.html", import.meta.url), "utf8");
const dmpDashboardPage = await fs.readFile(new URL("../app-demo-promotor.html", import.meta.url), "utf8");
const dapDashboardPage = await fs.readFile(new URL("../app-demo-delegado.html", import.meta.url), "utf8");
const dmgDashboardPage = await fs.readFile(new URL("../app-demo-juiz.html", import.meta.url), "utf8");
const finalChecklistPage = await fs.readFile(new URL("../governanca/CHECKLIST_FECHAMENTO_MAO_NA_MASSA_VIDEO_ZIP_REVISAO_GERAL_2026-07-19.md", import.meta.url), "utf8");
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
assert(!sharedScript.includes("initTeamPage") && !sharedScript.includes("jus9MvpTeamMembersV1") && !sharedScript.includes("jus9MvpTeamAuditV1"), "fluxo local legado de equipe ainda presente");
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
assert(sharedScript.includes("loadGovernedDajAnalysisPrompt"), "Charlie nao rele o DAJ governado antes da analise");
assert(sharedScript.includes("/api/dajs?dajId="), "Charlie sem leitura autenticada do DAJ por identificador");
assert(sharedScript.includes("createGovernedDajAnalysisRoom") && sharedScript.includes("daj_analise_governada"), "handoff DAJ nao cria sala isolada com rota fixa");
assert(sharedScript.includes("registerDajAnalysisWorkflow") && sharedScript.includes("/api/dajs/review"), "analise DAJ sem feedback e encaminhamento backend");
assert(sharedScript.includes("isMisdirectedDajAnalysis") && sharedScript.includes("resposta_daj_incompativel_com_a_rota"), "analise DAJ sem guarda contra desvio para pesquisa de partes");
assert(sharedScript.includes("hasRequiredDajLaudo") && sharedScript.includes("resposta_daj_sem_laudo_obrigatorio"), "analise DAJ sem contrato obrigatorio de laudo");
assert(sharedScript.includes("Laudo de Analise DAJ") && sharedScript.includes("consulta por DAJ deve ser executada"), "analise DAJ nao bloqueia resposta evasiva sem laudo");
assert(!sharedScript.includes("jus9DajInitialAttendanceDraftV1") && !sharedScript.includes("dajDraft"), "handoff para Charlie ainda transporta rascunho local");
assert(teamPage.includes("data-governed-team-directory"), "diretorio governado de equipe sem raiz");
assert(teamPage.includes("data-team-request-form"), "diretorio de equipe sem formulario de solicitacao");
assert(teamPage.includes("data-team-members") && teamPage.includes("data-team-requests") && teamPage.includes("data-team-audit"), "diretorio de equipe sem paineis operacionais");
assert(teamPage.includes("governed-team-directory.js?v=20260714-team-directory-v2"), "diretorio de equipe sem cliente versionado");
assert(teamDirectoryScript.includes("/api/governed-profiles") && teamDirectoryScript.includes("/api/profile-requests"), "diretorio nao usa APIs governadas");
assert(teamDirectoryScript.includes("/api/profile-requests/action") && teamDirectoryScript.includes("/api/profile-requests/audit"), "diretorio sem revisao e auditoria governadas");
assert(teamDirectoryScript.includes("textContent") && !teamDirectoryScript.includes("innerHTML"), "diretorio deve renderizar dados sem HTML dinamico");
assert(!teamPage.includes(" data-team-page>") && !teamPage.includes(" data-team-page ") && !teamDirectoryScript.includes("localStorage"), "diretorio modular nao deve reativar o cadastro local legado");
for (const code of expectedCodes) {
  assert(teamDirectoryScript.includes(`${code}: {`), `diretorio compartilhado sem configuracao do modulo ${code}`);
}
assert(teamDirectoryScript.includes('aliases = { INV: "DIP", ORG: "DOI" }'), "diretorio sem aliases legados governados");
assert(teamDirectoryScript.includes('social: true') && teamPage.includes("data-team-social-note"), "diretorio nao preserva a restricao do modulo social DIC");
assert(teamPage.includes("data-team-panel-link") && teamPage.includes("data-team-ai-link") && teamPage.includes("data-team-documents-link") && teamPage.includes("data-team-workspace-link") && teamPage.includes("data-team-profiles-link"), "diretorio sem navegacao modular");
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
assert(intakePage.includes("assets/js/daj-intake.js?v=20260714-daj-backend-handoff-v1"), "atendimento inicial sem cliente versionado do handoff governado");
assert(intakePage.includes("data-delete-test-daj"), "atendimento inicial sem limpeza governada do registro ficticio");
assert(intakePage.includes('data-delete-test-daj hidden style="display:none"'), "botao de limpeza deve nascer visualmente oculto");
assert(intakePage.includes("data-daj-login-link"), "atendimento inicial sem retorno autenticado ao DAJ consultado");
assert(intakePage.includes("data-daj-auth-status"), "atendimento inicial sem estado visivel da sessao");
assert(intakePage.includes("data-daj-official-link"), "atendimento inicial sem atalho para conferir o DAJ salvo");
assert(intakePage.includes("data-save-daj disabled"), "gravacao DAJ deve nascer bloqueada ate confirmar a sessao");
assert(!intakePage.includes("Demonstração: atendimento inicial salvo"), "atendimento inicial ainda finge salvamento por alerta");
assert(intakeScript.includes("fetch('/api/dajs'"), "cliente do atendimento nao chama cadastro DAJ");
assert(intakeScript.includes("credentials: 'include'"), "cadastro DAJ no frontend sem sessao autenticada");
assert(intakeScript.includes("'Idempotency-Key'"), "cadastro DAJ no frontend sem idempotencia");
assert(intakeScript.includes("cpfInput.value = ''"), "frontend nao limpa CPF integral depois de indexar");
assert(intakeScript.includes("testMode: true") && intakeScript.includes("environment: 'homologacao'"), "frontend nao marca registros ficticios de homologacao");
assert(intakeScript.includes("method: 'DELETE'") && intakeScript.includes("EXCLUIR TESTE"), "frontend sem exclusao confirmada do DAJ ficticio");
assert(intakeScript.includes("setDeleteButtonVisible") && intakeScript.includes("deleteButton.style.display"), "frontend nao governa a visibilidade real da limpeza");
assert(intakeScript.includes("resumeDajFromUrl") && intakeScript.includes("searchParams.get('dajId')"), "frontend sem retomada do DAJ por URL");
assert(intakeScript.includes("checkAuthenticatedSession") && intakeScript.includes("/api/auth/permissions"), "frontend nao confirma permissoes antes de liberar gravacao");
assert(intakeScript.includes("permissions.indexOf('dajs:write')"), "frontend nao exige dajs:write para liberar o formulario");
assert(intakeScript.includes("hasPersistenceReceipt") && intakeScript.includes("receipt.detailWritten === true"), "frontend declara sucesso sem comprovante completo de persistencia");
assert(intakeScript.includes("app-ia-profissional.html?dajId=") && intakeScript.includes("data.detailAvailable !== true"), "envio para Charlie nao confirma detalhe oficial do DAJ");
assert(!intakeScript.includes("localStorage"), "cliente do cadastro DAJ nao deve persistir atendimento no navegador");
assert(dajRegistryPage.includes("data-daj-registry-list") && dajRegistryPage.includes("assets/js/daj-registry-list.js"), "cadastro de DAJs nao usa lista oficial dinamica");
assert(dajRegistryPage.includes("data-daj-workflow-inbox") && dajRegistryPage.includes("Encaminhamentos para meu perfil"), "cadastro sem caixa de feedback por perfil");
assert(dajRegistryPage.includes("data-daj-search-form") && dajRegistryPage.includes("data-daj-search-results"), "cadastro sem consulta governada de DAJs");
for (const option of ['<option value="daj">DAJ</option>', '<option value="nome">Nome da parte</option>', '<option value="cpf">CPF exato</option>', '<option value="processo">Numero do processo</option>', '<option value="detalhes">Status, area, urgencia ou sigilo</option>']) {
  assert(dajRegistryPage.includes(option), `consulta de DAJs sem opcao: ${option}`);
}
assert(!dajRegistryPage.includes("Cliente demonstra") && !dajRegistryPage.includes("Familia Almeida"), "cadastro de DAJs ainda exibe exemplos fixos como registros");
assert(dajRegistryScript.includes("fetch('/api/dajs'") && dajRegistryScript.includes("credentials: 'include'"), "lista de DAJs nao consulta backend autenticado");
assert(dajRegistryScript.includes("fetch('/api/dajs/inbox'") && dajRegistryScript.includes("renderInboxItem"), "lista de DAJs nao exibe encaminhamentos autenticados");
assert(dajRegistryScript.includes("fetch('/api/dajs?dajId='") && dajRegistryScript.includes("fetchDajDetail"), "consulta de DAJs nao carrega detalhe oficial por identificador");
assert(dajRegistryScript.includes("fetch('/api/judicial/parties/search'") && dajRegistryScript.includes("method: 'POST'"), "consulta de DAJs por nome/CPF nao usa POST governado");
assert(dajRegistryScript.includes("fetch('/api/daj-process-links?searchType=processo") && dajRegistryScript.includes("processNumber="), "consulta de DAJs por processo nao usa indice DAJ-processo");
assert(dajRegistryScript.includes("searchByDetails") && dajRegistryScript.includes("operational.secrecyLevel") && dajRegistryScript.includes("workflow.destinationProfile"), "consulta de DAJs nao pesquisa detalhes operacionais seguros");
assert(dajRegistryScript.includes("isValidCpf") && dajRegistryScript.includes("HMAC exato") && dajRegistryScript.includes("sem exposicao de CPF integral"), "consulta de CPF sem validacao/minimizacao explicita");
assert(dajRegistryScript.includes("textContent") && !dajRegistryScript.includes("item.partyName + '</"), "lista de DAJs nao minimiza risco de injecao ao renderizar dados");
assert(mvpExecutivePanelPage.includes("data-mvp-executive-panel"), "painel executivo dos MVPs sem marcador principal");
assert(mvpExecutivePanelPage.includes("data-mvp-proof-map") && mvpExecutivePanelPage.includes("Mapa de provas dos 14 MVPs"), "painel executivo sem mapa de provas dos MVPs");
assert(mvpExecutivePanelPage.includes("data-onda1-ded-dic-proof") && mvpExecutivePanelPage.includes("Onda 1 - prova DED + DIC"), "painel executivo sem prova Onda 1 DED+DIC");
assert(mvpExecutivePanelPage.includes("data-onda2-dee-deji-dpj-proof") && mvpExecutivePanelPage.includes("Onda 2 - prova DEE + DEJI + DPJ"), "painel executivo sem prova Onda 2 DEE+DEJI+DPJ");
assert(mvpExecutivePanelPage.includes("data-onda3-dip-daa-dej-proof") && mvpExecutivePanelPage.includes("Onda 3 - prova DIP + DAA + DEJ"), "painel executivo sem prova Onda 3 DIP+DAA+DEJ");
assert(mvpExecutivePanelPage.includes("data-onda4-doi-dge-proof") && mvpExecutivePanelPage.includes("Onda 4 - prova DOI + DGE"), "painel executivo sem prova Onda 4 DOI+DGE");
assert(mvpExecutivePanelPage.includes("data-onda5-dmp-dap-dmg-proof") && mvpExecutivePanelPage.includes("Onda 5 - prova DMP + DAP + DMG"), "painel executivo sem prova Onda 5 DMP+DAP+DMG");
assert(mvpExecutivePanelPage.includes("DAJ-2026-0002") && mvpExecutivePanelPage.includes("CONCLUIDO_COM_RESSALVA_CORRETIVA") && mvpExecutivePanelPage.includes("tombstone"), "painel executivo nao preserva o estado reconciliado do DAJ 1C");
assert(mvpExecutivePanelPage.includes("a142825") && mvpExecutivePanelPage.includes("fcef514") && mvpExecutivePanelPage.includes("cde1bf89-3d93-4429-a485-be46945bec04"), "painel executivo sem evidencias de commit/deploy");
assert(mvpExecutivePanelPage.includes("AUTORIZADO_APENAS_PARA_REVISAO_E_HOMOLOGACAO_CONTROLADA") && mvpExecutivePanelPage.includes('data-package="2" data-package-status="CONCLUIDO_COM_RESSALVA_CORRETIVA"'), "painel executivo sem estados reconciliados de governanca");
assert(mvpExecutivePanelPage.includes('data-package="3" data-package-status="CONCLUIDO_PUBLICADO"'), "painel executivo nao marca DED como Pacote 3 publicado");
assert(mvpExecutivePanelPage.includes('data-package="4" data-package-status="CONCLUIDO_PUBLICADO"'), "painel executivo nao marca DIC como Pacote 4 publicado");
assert(mvpExecutivePanelPage.includes('data-package="5" data-package-status="CONCLUIDO_PUBLICADO"'), "painel executivo nao marca Pacote 5 como publicado");
assert(mvpExecutivePanelPage.includes('data-package="5A" data-package-status="CONCLUIDO_PUBLICADO"'), "painel executivo nao marca Pacote 5A como publicado");
assert(mvpExecutivePanelPage.includes('data-package="5B" data-package-status="CONCLUIDO_PUBLICADO"'), "painel executivo nao marca Pacote 5B como publicado");
assert(mvpExecutivePanelPage.includes('data-package="5C" data-package-status="CONCLUIDO_PUBLICADO"'), "painel executivo nao marca Pacote 5C como publicado");
assert(mvpExecutivePanelPage.includes('data-package="8" data-package-status="PENDENTE_FECHAMENTO_GERAL"'), "painel executivo sem pacote final de revisao/video/zip");
assert(mvpExecutivePanelPage.includes("data-pacote8-fechamento") && mvpExecutivePanelPage.includes("REVISAO_GERAL_EXECUTADA"), "painel executivo sem fechamento tecnico do Pacote 8");
assert(mvpExecutivePanelPage.includes("app-clientes.html#consulta-daj") && mvpExecutivePanelPage.includes("app-demo-autor-editor.html") && mvpExecutivePanelPage.includes("app-demo-cidadao.html") && mvpExecutivePanelPage.includes("app-demo-escritorio.html") && mvpExecutivePanelPage.includes("app-demo-empresa.html") && mvpExecutivePanelPage.includes("app-demo-perito.html") && mvpExecutivePanelPage.includes("app-demo-investidor.html") && mvpExecutivePanelPage.includes("app-demo-professor.html") && mvpExecutivePanelPage.includes("app-demo-estudante.html") && mvpExecutivePanelPage.includes("app-demo-orgao-publico.html#prova-doi") && mvpExecutivePanelPage.includes("app-demo-administrador.html#prova-dge") && mvpExecutivePanelPage.includes("app-demo-promotor.html#prova-dmp") && mvpExecutivePanelPage.includes("app-demo-delegado.html#prova-dap") && mvpExecutivePanelPage.includes("app-demo-juiz.html#prova-dmg"), "painel executivo sem atalhos DAJ/DED/DIC/DEE/DEJI/DPJ/DIP/DAA/DEJ/DOI/DGE/DMP/DAP/DMG");
for (const code of expectedCodes) {
  assert(mvpExecutivePanelPage.includes(`<span class="rank-code">${code}</span>`), `painel executivo sem codigo ${code}`);
  assert(mvpExecutivePanelPage.includes(`data-proof-code="${code}"`), `painel executivo sem prova de valor do codigo ${code}`);
}
assert(mvpLandingPage.includes("app-painel-mvps.html"), "mvp.html sem link para painel executivo dos MVPs");
assert(leaderMvpPage.includes("app-painel-mvps.html"), "lider-mvp.html sem link para painel executivo dos MVPs");
assert(dedDashboardPage.includes("data-ded-editorial-showcase") && dedDashboardPage.includes("data-ded-briefing") && dedDashboardPage.includes("data-ded-author-checklist"), "painel DED sem vitrine editorial governada");
assert(dedDashboardPage.includes("data-ded-proof-runbook") && dedDashboardPage.includes("CONCLUIR_DEMO_DED"), "painel DED sem runbook de prova Onda 1");
assert(dedDashboardPage.includes("DED-MODELO-VITRINE-2026") && dedDashboardPage.includes("Autora Beta Ficticia") && dedDashboardPage.includes("Manual Ficticio da Oficina de Palavras"), "painel DED sem dataset ficticio canonico");
assert(dedDashboardPage.includes("Sem Drive real") && dedDashboardPage.includes("Sem ISBN") && dedDashboardPage.includes("Sem venda garantida"), "painel DED sem limites de efeitos reais");
assert(dedAiShowcasePage.includes("data-ded-prompt-pack") && dedAiShowcasePage.includes("data-ded-guardrails"), "IA DED sem pacote de prompts ou guardrails");
assert(dedAiShowcasePage.includes("Drive real, ISBN, venda e contrato ficam bloqueados no demo publico"), "IA DED sem bloqueio de efeitos reais");
assert(!dedDashboardPage.includes("salvar no Drive governado") && !dedAiShowcasePage.includes("Drive oficial com decisao"), "DED ainda sugere Drive real no demo publico");
assert(dicDashboardPage.includes("data-dic-social-showcase") && dicDashboardPage.includes("data-dic-briefing") && dicDashboardPage.includes("data-dic-no-pii-checklist"), "painel DIC sem vitrine social governada");
assert(dicDashboardPage.includes("data-dic-proof-runbook") && dicDashboardPage.includes("CONCLUIR_DEMO_DIC"), "painel DIC sem runbook de prova Onda 1");
assert(dicDashboardPage.includes("DIC-MODELO-VITRINE-2026") && dicDashboardPage.includes("Pessoa interessada ficticia") && dicDashboardPage.includes("Sem CPF"), "painel DIC sem dataset ficticio e limites anti-PII");
assert(dicAiShowcasePage.includes("data-dic-prompt-pack") && dicAiShowcasePage.includes("data-dic-guardrails"), "IA DIC sem pacote de prompts ou guardrails");
assert(dicAiShowcasePage.includes("Charlie nao substitui advogado, Defensoria, orgao publico, saude, policia, emergencia ou decisao humana"), "IA DIC sem limite humano completo");
assert(!dicDashboardPage.includes("Digite seu CPF") && !dicAiShowcasePage.includes("envie documento real"), "DIC ainda sugere coleta de dado real");
assert(deeDashboardPage.includes("data-dee-showcase") && deeDashboardPage.includes("DEE-MODELO-VITRINE-2026") && deeDashboardPage.includes("CLIENTE-FICTICIO-SEM-DADOS"), "DEE sem vitrine e dataset ficticio");
assert(deeDashboardPage.includes("data-dee-proof-runbook") && deeDashboardPage.includes("CONCLUIR_DEMO_DEE"), "painel DEE sem runbook de prova Onda 2");
assert(deeAiShowcasePage.includes("data-dee-prompt-pack") && deeAiShowcasePage.includes("data-dee-guardrails") && deeAiShowcasePage.includes("Charlie nao assina, nao protocola, nao decide estrategia final"), "IA DEE sem guardrails");
assert(dejiDashboardPage.includes("data-deji-showcase") && dejiDashboardPage.includes("DEJI-MODELO-VITRINE-2026") && dejiDashboardPage.includes("Fornecedor Demonstrativo Sem Dados Reais"), "DEJI sem vitrine e dataset ficticio");
assert(dejiDashboardPage.includes("data-deji-proof-runbook") && dejiDashboardPage.includes("CONCLUIR_DEMO_DEJI"), "painel DEJI sem runbook de prova Onda 2");
assert(dejiAiShowcasePage.includes("data-deji-prompt-pack") && dejiAiShowcasePage.includes("data-deji-guardrails") && dejiAiShowcasePage.includes("Charlie nao aprova fornecedor"), "IA DEJI sem guardrails");
assert(dpjDashboardPage.includes("data-dpj-showcase") && dpjDashboardPage.includes("DPJ-MODELO-VITRINE-2026") && dpjDashboardPage.includes("Perito Delta Ficticio"), "DPJ sem vitrine e dataset ficticio");
assert(dpjDashboardPage.includes("data-dpj-proof-runbook") && dpjDashboardPage.includes("CONCLUIR_DEMO_DPJ"), "painel DPJ sem runbook de prova Onda 2");
assert(dpjAiShowcasePage.includes("data-dpj-prompt-pack") && dpjAiShowcasePage.includes("data-dpj-guardrails") && dpjAiShowcasePage.includes("Charlie nao conclui fato tecnico sem evidencia"), "IA DPJ sem guardrails");
assert(dipDashboardPage.includes("data-dip-proof-runbook") && dipDashboardPage.includes("DIP-MODELO-VITRINE-2026") && dipDashboardPage.includes("CONCLUIR_DEMO_DIP"), "painel DIP sem runbook de prova Onda 3");
assert(dipDashboardPage.includes("Sem promessa financeira") && dipDashboardPage.includes("Sem valuation real") && dipDashboardPage.includes("Sem captacao real"), "painel DIP sem limites financeiros");
assert(daaDashboardPage.includes("data-daa-proof-runbook") && daaDashboardPage.includes("DAA-MODELO-VITRINE-2026") && daaDashboardPage.includes("CONCLUIR_DEMO_DAA"), "painel DAA sem runbook de prova Onda 3");
assert(daaDashboardPage.includes("Sem aluno real") && daaDashboardPage.includes("Sem nota automatica") && daaDashboardPage.includes("Sem fonte inventada"), "painel DAA sem limites academicos");
assert(dejDashboardPage.includes("data-dej-proof-runbook") && dejDashboardPage.includes("DEJ-MODELO-VITRINE-2026") && dejDashboardPage.includes("CONCLUIR_DEMO_DEJ"), "painel DEJ sem runbook de prova Onda 3");
assert(dejDashboardPage.includes("Sem cola") && dejDashboardPage.includes("Sem plagio") && dejDashboardPage.includes("Sem trabalho pronto"), "painel DEJ sem limites anti-fraude");
assert(doiDashboardPage.includes("data-doi-proof-runbook") && doiDashboardPage.includes("DOI-MODELO-VITRINE-2026") && doiDashboardPage.includes("CONCLUIR_DEMO_DOI"), "painel DOI sem runbook de prova Onda 4");
assert(doiDashboardPage.includes("Sem ato oficial") && doiDashboardPage.includes("Sem autoridade real") && doiDashboardPage.includes("Sem protocolo real"), "painel DOI sem limites institucionais");
assert(dgeDashboardPage.includes("data-dge-proof-runbook") && dgeDashboardPage.includes("DGE-MODELO-VITRINE-2026") && dgeDashboardPage.includes("CONCLUIR_DEMO_DGE"), "painel DGE sem runbook de prova Onda 4");
assert(dgeDashboardPage.includes("Sem permissao real") && dgeDashboardPage.includes("Sem token") && dgeDashboardPage.includes("Sem cofre real") && dgeDashboardPage.includes("Sem segredo"), "painel DGE sem limites de governanca");
assert(dmpDashboardPage.includes("data-dmp-proof-runbook") && dmpDashboardPage.includes("DMP-MODELO-VITRINE-2026") && dmpDashboardPage.includes("CONCLUIR_DEMO_DMP"), "painel DMP sem runbook de prova Onda 5");
assert(dmpDashboardPage.includes("Sem denuncia real") && dmpDashboardPage.includes("Sem requisicao real") && dmpDashboardPage.includes("Sem medida real") && dmpDashboardPage.includes("Sem persecucao penal"), "painel DMP sem limites ministeriais");
assert(dapDashboardPage.includes("data-dap-proof-runbook") && dapDashboardPage.includes("DAP-MODELO-VITRINE-2026") && dapDashboardPage.includes("CONCLUIR_DEMO_DAP"), "painel DAP sem runbook de prova Onda 5");
assert(dapDashboardPage.includes("Sem investigacao real") && dapDashboardPage.includes("Sem diligencia real") && dapDashboardPage.includes("Sem prova sensivel") && dapDashboardPage.includes("Sem urgencia real"), "painel DAP sem limites policiais");
assert(dmgDashboardPage.includes("data-dmg-proof-runbook") && dmgDashboardPage.includes("DMG-MODELO-VITRINE-2026") && dmgDashboardPage.includes("CONCLUIR_DEMO_DMG"), "painel DMG sem runbook de prova Onda 5");
assert(dmgDashboardPage.includes("Sem decisao judicial") && dmgDashboardPage.includes("Sem sentenca") && dmgDashboardPage.includes("Sem despacho") && dmgDashboardPage.includes("Sem minuta decisoria"), "painel DMG sem limites decisorios");
assert(finalChecklistPage.includes("O ultimo pacote do Mao na Massa e sempre a revisao geral de todos os pacotes") && finalChecklistPage.includes("Video") && finalChecklistPage.includes("ZIP"), "checklist final sem revisao geral, video e ZIP");
for (const profile of ["admin_sistema", "advogado_lider", "advogado", "assessor_chefe", "assessor", "secretaria", "estagio", "escritorio", "academia", "estudante", "cidadao", "perito", "parceiro", "empresa", "orgao_publico", "magistrado", "ministerio_publico", "autoridade_policial", "autor_editor"]) {
  assert(dajProfilesPage.includes(`data-auth-profile="${profile}"`), `lista de perfis sem ${profile}`);
}
assert(dajProfilesPage.includes("O perfil vem do login governado") && dajProfilesPage.includes("nao pode ser escolhido livremente"), "pagina de perfis nao explica a governanca do login");
assert(dajDashboardPage.includes("Painel de trabalho") && !dajDashboardPage.includes("processos ativos"), "painel DAJ ainda usa metricas demonstrativas como dados operacionais");
for (const page of [dajDashboardPage, intakePage, dajRegistryPage, processPage, dajProfilesPage, dajAiPage]) {
  assert(page.includes("daj-workspace-shell") && page.includes("daj-clean-ui.css?v=20260714-team-directory-v1"), "pagina do modelo DAJ sem layout clean isolado");
  assert(!page.includes("links-semanticos-jus9") && !page.includes("font-size:42px"), "pagina do modelo DAJ ainda contem faixa ou titulo visual redundante");
  for (const target of ["app-demo-advogar.html", "app-atendimento-inicial.html", "app-clientes.html", "app-processos.html", "app-agenda.html", "app-prazos.html", "app-documentos.html", "app-cofre.html", "app-workspace.html", "app-ia-profissional.html", "app-equipe.html", "mvp.html"]) {
    assert(page.includes(`href="${target}"`), `menu DAJ incompleto: ${target}`);
  }
}
assert(teamPage.includes("daj-workspace-shell") && teamPage.includes("daj-clean-ui.css?v=20260714-team-directory-v2"), "diretorio modular sem layout clean versionado");
for (const target of ["app-demo-advogar.html", "app-atendimento-inicial.html", "app-clientes.html", "app-processos.html", "app-agenda.html", "app-prazos.html", "app-documentos.html", "app-cofre.html", "app-workspace.html", "app-ia-profissional.html", "app-equipe.html?mvp=DAJ", "mvp.html"]) {
  assert(teamPage.includes(`href="${target}"`), `menu inicial do diretorio DAJ incompleto: ${target}`);
}
assert(dajCleanStyle.includes(".daj-workspace-shell") && dajCleanStyle.includes(".daj-role-grid") && dajCleanStyle.includes(".team-directory-grid"), "estilo clean DAJ incompleto");
assert(!processPage.includes("data-tribunal=") && processPage.includes("DataJud Wiki"), "pagina de processos ainda duplica a selecao de tribunais em botoes");
assert(processPage.includes("app-atendimento-inicial.html?dajId=") && processPage.includes("app-ia-profissional.html?dajId="), "painel processual nao abre o DAJ realmente vinculado");
assert(wranglerConfig.includes('"binding": "JUS9_DAJ_PROCESS_LINKS"'), "wrangler sem KV oficial DAJ-processo");
assert(wranglerConfig.includes('"binding": "JUS9_USER_MEMORY"'), "wrangler sem KV dedicado de memoria do usuario");
assert(wranglerConfig.includes('"binding": "JUS9_DATAJUD_CACHE"'), "wrangler sem KV dedicado do DataJud");
assert(workerSource.includes('originalUrl.pathname === "/api/health"'), "worker sem health explicito");
assert(workerSource.includes('originalUrl.pathname === "/api/judicial/datajud/readiness"'), "worker sem readiness canonico DataJud");
assert(workerSource.includes('originalUrl.pathname === "/api/judicial/pdpj/readiness"'), "worker sem readiness PDPJ");
assert(workerSource.includes('originalUrl.pathname === "/api/judicial/parties/search"'), "worker sem pesquisa estruturada de partes");
assert(workerSource.includes('originalUrl.pathname === "/api/dajs"'), "worker sem cadastro DAJ autenticado");
assert(workerSource.includes('originalUrl.pathname === "/api/dajs/review"'), "worker sem registro da analise DAJ");
assert(workerSource.includes("worker_daj_laudo_governado") && workerSource.includes("X-Jus9-Daj-Laudo-Fallback"), "worker sem fallback governado para laudo DAJ");
assert(workerSource.includes('originalUrl.pathname === "/api/dajs/inbox"'), "worker sem caixa de encaminhamentos DAJ");
assert(workerSource.includes("registra_analise_e_encaminhamento_daj") && workerSource.includes("automaticSupervisionForIntern"), "worker sem auditoria e supervisao do fluxo DAJ");
assert(workerSource.includes("dajPersistenceReceipt") && workerSource.includes('storage: "JUS9_DAJ_PROCESS_LINKS"'), "worker sem comprovante explicito de persistencia DAJ");
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
assert(canonicalServiceWorker.includes("jus9-pwa-v56-2026-07-21-codex-elapsed-evidence"), "cache PWA principal desatualizado");
assert(canonicalServiceWorker.includes("/saiba-mais.html"), "cache PWA sem pagina Saiba mais");
assert(canonicalServiceWorker.includes("/build-week-2026.html"), "cache PWA sem pagina Build Week");
assert(canonicalServiceWorker.includes("/app-painel-mvps.html"), "cache PWA sem painel executivo dos MVPs");
assert(canonicalServiceWorker.includes("/assets/css/build-week-reviewer.css"), "cache PWA sem CSS da Build Week");
assert(canonicalServiceWorker.includes("/assets/js/daj-intake.js"), "cache PWA sem cliente do cadastro DAJ");
assert(canonicalServiceWorker.includes("/assets/js/daj-registry-list.js"), "cache PWA sem lista oficial de DAJs");
assert(canonicalServiceWorker.includes("/assets/js/governed-team-directory.js"), "cache PWA sem diretorio governado da equipe");
assert(distSyncScript.includes("assets\\js\\daj-intake.js"), "sincronizacao de deploy nao inclui cliente do cadastro DAJ");
assert(distSyncScript.includes("assets\\js\\daj-registry-list.js"), "sincronizacao de deploy nao inclui lista oficial de DAJs");
assert(distSyncScript.includes("assets\\js\\governed-team-directory.js"), "sincronizacao de deploy nao inclui diretorio governado da equipe");
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
  const expectedAiScript = code === "DAJ"
    ? 'script.js?v=20260719-daj-laudo-v2'
    : 'script.js?v=20260712-charlie-pesquisa-ativa-v1';
  assert(html.includes(expectedAiScript), `${code}: script sem versao em ${page}`);
  assert(html.includes('charlie-mvp-shell'), `${code}: pagina da Charlie sem shell visual em ${page}`);
  console.log(`AI_PAGE_OK ${code} page=${page}`);
}

for (const page of catalog.profiles.map((profile) => profile.entry_page)) {
  const html = await fs.readFile(new URL(`../${page}`, import.meta.url), "utf8");
  const expectedScript = page === "app-demo-autor-editor.html"
    ? "script.js?v=20260621-demo14"
    : page === "app-demo-advogar.html"
      ? "script.js?v=20260719-daj-laudo-v2"
      : "script.js?v=20260531-team-v1";
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
console.log("STATIC_OK equipe-governada-daj");
console.log("STATIC_OK cache-bust-diretorio-equipe-daj");
console.log("STATIC_OK redes-sociais-workspace-13-paginas-ia");
console.log("STATIC_OK card-instalacao-jus9-verde");
console.log("STATIC_OK service-worker-principal-canonico");
console.log("PUBLIC_MVPS_REGRESSION_OK");
