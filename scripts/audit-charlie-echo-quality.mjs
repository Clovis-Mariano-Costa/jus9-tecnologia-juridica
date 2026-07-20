import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const expectedScriptVersion = "script.js?v=20260712-charlie-pesquisa-ativa-v1";

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

const checks = [
  {
    name: "chat MVP tem memoria curta por sala",
    file: "script.js",
    patterns: ["chatRoomKey", "rememberChatExchange", "buildQuestionWithRoom", "previousQuestionAnswer", "whereStoppedAnswer", "updateRoomIntelligence", "smartSummary", "governanceClass", "target.parentNode.insertBefore(panel, target)", "registration.update()", "SKIP_WAITING", "initCharlieMvpShell", "charlie-mvp-env-list"],
  },
  {
    name: "chat MVP envia message para API da Charlie",
    file: "script.js",
    patterns: ["https://charlieecho.jus9tecnologia.com.br/api/ia", "message: buildApiMessage", "route: routeDecision", "charlieRouteDecision", "apiFirst: true", "fallbackLocalPermitido", "localFallbackForRoute", "postCharlieApiBody", "compactApiQuestionForRetry", "retry_compacto", "Tempo limite ao consultar a API segura", "Detalhe:", "asksActiveLegalCitationResearch", "activeLegalCitationInstruction", "pesquisa_citacao_doutrinaria_ativa", "[PESQUISA JURIDICA ATIVA - PORTAL]", "enforceCriticalAnswerGuards", "mvpPersonaRules", "mvpPersonalityInstruction", "Personalidade operacional do MVP", "Assinatura criativa do ambiente", "Limite duro do ambiente", "mvpIntegrationContracts", "mvpIntegrationInstruction", "Contrato operacional especializado", "Dossie ativo", "Padrao replicavel", "mvpInstrumentPackages", "mvpInstrumentAnswer", "Modulo social/cidadao", "Orientacao social", "Encaminhamento humano", "data-mvp-instrument-panel", "Protocolo Centelha Criativa 5.4", "applyCreativeReasoningFrame", "Leitura do pedido", "Caminho escolhido", "Proximo passo criativo", "Rota normativa escolhida antes da resposta", "Decisao de roteamento da orquestra", "Ordem obrigatoria da Charlie Echo", "Principios e clausulas petreas", "As Tres Leis da Robotica de Isaac Asimov"],
  },
  {
    name: "chat MVP possui ferramentas de qualidade",
    file: "script.js",
    patterns: ["Melhorar resposta", "Fontes", "Atualizar resumo", "Resumo executivo", "Gerar PDF", "Baixar PDF", "Abrir no Drive", "link clicavel de download", "Renomear", "application/pdf", ".pdf", "buildPdfBlob", "download-link", "Helvetica-Bold", "Informacoes do pacote", "Historico recente", "Fontes e links confiaveis", "Pagina ", "pdfSafeText", "pdfLiteral", "eef4ff", "asksDocumentProductionDownload", "buildResponseDownloads", "donwload", "asksCompleteLegalDraft", "shouldOfferDocumentDownloads", "completeLegalDraftAnswer", "askCharlieApiPayload", "renderDriveSaverCard", "drive-saver-result-card", "Drive Saver preparado", "Governanca do artefato", "pastaDestino", "revisaoHumanaObrigatoria", "Link publico: permitido com URL real", "data-ai-save-drive", "downloadUrl real", "data-ai-layout') || card.getAttribute('data-chat-layout", "Leia o DAJ ativo e os anexos textuais enviados", "download local", "Monte um argumento de peticao com o REsp 2.077.278"],
  },
  {
    name: "chat MVP aceita upload local governado",
    file: "script.js",
    patterns: ["injectChatUpload", "data-ai-upload", "readAiUploadedFiles", "buildAttachmentContext", "[ANEXOS DO USUARIO - UPLOAD LOCAL GOVERNADO]", "Texto, PDF textual, DOCX e OCR local governado", "extractPdfTextHeuristic", "pdf_text_heuristic", "PDF textual lido localmente em modo heuristico", "canReadUploadAsDocx", "docx_backend_xml", "api/attachments/extract", "backend governado", "ensureUploadTesseract", "ensureUploadPdfJs", "OCR_MAX_BYTES", "image_ocr_local", "pdf_ocr_local_first_pages", "ocr local governado", "data-ai-upload-status", "attachmentUserHtml"],
  },
  {
    name: "backend possui extrator governado temporario de anexos",
    file: "worker.js",
    patterns: ["handleAttachmentExtract", "extractGovernedAttachment", "UPLOAD_TEMPORARIO_GOVERNADO", "storage: \"nao_salvo\"", "ATTACHMENT_MAX_BYTES", "ATTACHMENT_MAX_EXTRACTED_CHARS", "pdf_backend_text_heuristic", "docx_backend_xml", "extractDocxTextFromBuffer", "readZipEntries", "DecompressionStream", "/api/attachments/extract"],
  },
  {
    name: "DAJ integrado como modelo-mae da Charlie Echo",
    file: "script.js",
    patterns: ["injectMvpIntegrationPanel", "data-daj-integration-panel", "Contrato DAJ ativo", "DAJ-2026-0001", "initCharliePromptFromUrl", "Resuma o DAJ-2026-0001", "loadGovernedDajAnalysisPrompt", "buildGovernedDajPrompt", "/api/dajs?dajId=", "Nenhum rascunho local foi usado", "createGovernedDajAnalysisRoom", "daj_analise_governada", "useRoomMemory:false", "isMisdirectedDajAnalysis", "hasRequiredDajLaudo", "Laudo de Analise DAJ", "resposta_daj_sem_laudo_obrigatorio", "consulta por DAJ deve ser executada", "registerDajAnalysisWorkflow", "Feedback do fluxo DAJ", "dajJurisprudenceProductPrompts", "Jurisprudencia governada DAJ", "Argumento com precedente", "Checklist probatorio", "Quadro comparativo", "dajDoctrineBibliographyProductPrompts", "Doutrina e bibliografia DAJ", "Mapa bibliografico", "Sintese doutrinaria", "Ficha de obra"],
  },
  {
    name: "hub de configuracoes padroniza botoes da Charlie",
    file: "script.js",
    patterns: ["ensureCharlieControlHub", "data-charlie-control-hub", "charlie-control-hub-body", "charlie-mvp-head-actions", "Falar com Charlie", "charlie-speak-button", "Ferramentas", "data-charlie-quick-controls", "data-charlie-quick-upload", "data-charlie-quick-settings", "charlieCapabilitySummary", "data-capability-summary", "jus9EnsureCharlieControlHub"],
  },
  {
    name: "atendimento inicial envia DAJ para analise da Charlie",
    file: "app-atendimento-inicial.html",
    patterns: ["data-daj-intake-form", "data-send-daj-analysis", "Enviar DAJ para analise da Charlie Echo"],
  },
  {
    name: "estilo do upload local governado",
    file: "style.css",
    patterns: ["ai-upload-panel", "ai-upload-button", "ai-upload-list", "ai-upload-user-list", "daj-integration-panel", "daj-integration-routes", "daj-integration-prompts", "daj-jurisprudence-product-panel", "daj-jurisprudence-product-prompts", "daj-doctrine-product-panel", "daj-doctrine-product-prompts", "mvp-instrument-panel", "mvp-instrument-prompts", "charlie-control-hub", "charlie-control-section", "charlie-speak-button", "charlie-quick-controls", "charlie-capability-grid", "event-quick-nav .event-links"],
  },
  {
    name: "estilo do cartao Drive Saver",
    file: "style.css",
    patterns: ["drive-saver-result-card", "drive-saver-result-link", "drive-saver-result-status", "drive-saver-result-card.is-decision"],
  },
  {
    name: "Charlie pesquisa doutrina e jurisprudencia com fontes",
    file: "script.js",
    patterns: ["trustedLegalSources", "legalResearchAnswer", "legalSynthesisWithSourcesAnswer", "Direito de propriedade - sintese com fontes", "Constituicao Federal, art. 5, XXII e XXIII", "buildOperationalResearchAnswer", "Pesquisa juridica operacional", "Busca pronta no Google limitada ao TJSC", "Google Academico com busca pronta", "Como fichar cada resultado", "classifyLinkTrust", "trustedSourcesSummary", "buildSourceLinesFromRoom", "STF - Pesquisa de jurisprudencia", "TJSC - Portal da jurisprudencia", "Portal de Periodicos CAPES", "BDTD - Biblioteca Digital Brasileira de Teses e Dissertacoes", "BDTD - teses e dissertacoes", "bibliographicVerificationInstruction", "Regra bibliografica dura", "activeLegalCitationInstruction", "pesquise e entregue sintese", "A moderna teoria do fato punivel", "doctrineBibliographyProductAnswer", "Conferencia bibliografica governada", "lista fixa"],
  },
  {
    name: "acoes corretivas do Drive Saver bypassam fallback juridico",
    file: "script.js",
    patterns: ["asksDriveSaverCorrectiveAction", "shouldBypassLocalFallback", "driveSaverCorrectiveFallback", "Protocolo de acao corretiva Drive Saver", "if(asksDriveSaverCorrectiveAction(question)) return '';", "var correctiveDrive = driveSaverCorrectiveFallback(cleanQuestion)", "Recebi isso como acao corretiva de Drive/Docs", "downloadUrl real"],
  },
  {
    name: "lider MVP lista ambientes prontos",
    file: "lider-mvp.html",
    patterns: ["Acesso rapido aos 14 ambientes demonstrativos", "app-demo-advogar.html", "app-demo-delegado.html", "app-demo-autor-editor.html", "app-ia-profissional.html#chat-ia", "app-ia-autor-editor.html#chat-ia"],
  },
  {
    name: "painel de saude publicado",
    file: "saude-charlie-echo.html",
    patterns: ["operacional da Charlie Echo", "Protocolo 4.1", "Centelha Criativa 5.4", "Salas inteligentes", "Atualizar resumo", "Onde paramos?", "Fontes", "pesquisa ativa de citacao", "Baixar PDF", "Gerar PDF", "OCR local governado", "Ativo v5.6", "Ativos v5.8", "card DAJ/Drive"],
  },
  {
    name: "manual publico publicado",
    file: "manual-charlie-echo.html",
    patterns: ["Como conversar com a Charlie Echo", "Fontes", "Doutrina e jurisprudencia", "botao <strong>Fontes</strong>", "Atualizar resumo", "resumo executivo vivo", "Criatividade governada", "Leitura do pedido", "Proximo passo criativo", "Downloads", "Baixar PDF"],
  },
  {
    name: "capacidades publicas da Charlie publicadas",
    file: "capacidades-charlie-echo.html",
    patterns: ["Capacidades demonstrativas da Charlie Echo", "Pesquisa jurídica orientada", "Links confiáveis", "Salas de conversa", "PDF local", "Governança humana", "Teste rápido sugerido"],
  },
  {
    name: "roteiro de demo atualizado",
    file: "roteiro-demo-7-minutos.html",
    patterns: ["Demonstração Jus 9 em 7 minutos", "Acompanhe os MVPs / Demos", "pesquisa jurídica operacional", "PDF", "Dashboard investimentos", "Plano B"],
  },
  {
    name: "service worker nao prende MVP antigo",
    file: "service-worker.js",
    patterns: ["jus9-pwa-v46-2026-07-19-onda3-dip-daa-dej", "isFreshMvpAsset", "app-ia-[^/]+\\.html", "networkFirst", "cache: 'reload'", "SKIP_WAITING"],
  },
  {
    name: "casa propria da Charlie Echo publicada",
    file: "charlie-echo.html",
    patterns: ["Casa propria da IA", "data-ai-chat", "app-ia-profissional.html#chat-ia", expectedScriptVersion],
  },
  {
    name: "pagina publica da Charlie usa script versionado",
    file: "ia-profissional.html",
    patterns: ["data-ai-chat", expectedScriptVersion],
  },
];

const apiProxyCheck = checks.find((item) => item.name === "chat MVP envia message para API da Charlie");
if (apiProxyCheck) apiProxyCheck.patterns[0] = "/api/charlie/respond";

const failures = [];
for (const check of checks) {
  const text = read(check.file);
  for (const pattern of check.patterns) {
    if (!text.includes(pattern)) {
      failures.push(`${check.name}: ausente "${pattern}" em ${check.file}`);
    }
  }
}

const appIaFiles = fs.readdirSync(root).filter((name) => /^app-ia-.*\.html$/.test(name));
if (appIaFiles.length !== 14) {
  failures.push(`esperados 14 arquivos app-ia-*.html, encontrados ${appIaFiles.length}`);
}

const sharedScript = read("script.js");
if (sharedScript.includes("jus9DajInitialAttendanceDraftV1") || sharedScript.includes("appendDajDraftFromUrl") || sharedScript.includes("dajDraft")) {
  failures.push("DAJ integrado como modelo-mae da Charlie Echo: handoff ainda depende de rascunho local em script.js");
}
for (const file of appIaFiles) {
  const html = read(file);
  const requiredScriptVersion = file === "app-ia-profissional.html"
    ? "script.js?v=20260719-daj-laudo-v2"
    : expectedScriptVersion;
  if (!html.includes(requiredScriptVersion)) {
    failures.push(`${file}: versao de script diferente de ${requiredScriptVersion}`);
  }
  if (!html.includes("charlie-mvp-shell")) {
    failures.push(`${file}: ausente classe visual charlie-mvp-shell`);
  }
  if (!html.includes("data-ai-chat")) {
    failures.push(`${file}: ausente data-ai-chat`);
  }
  if (file === "app-ia-profissional.html" && !html.includes('data-ai-layout="detalhista"')) {
    failures.push(`${file}: DAJ precisa exibir os 3 prompts guiados do pacote Advogados v1`);
  }
}

if (failures.length) {
  console.error("Falhas na auditoria Charlie Echo:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Auditoria Charlie Echo OK: memoria curta, ferramentas, painel e manual encontrados.");
