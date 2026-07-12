const baseUrl = "https://jus9tecnologia.com.br";
const expectedScript = "script.js?v=20260712-charlie-drive-daj-card-v1";

const pages = [
  "app-ia-profissional.html",
  "app-ia-professor.html",
  "app-ia-estudante.html",
  "app-ia-cidadao.html",
  "app-ia-perito.html",
  "app-ia-investidor.html",
  "app-ia-escritorio.html",
  "app-ia-empresa.html",
  "app-ia-orgao-publico.html",
  "app-ia-administrador.html",
  "app-ia-juiz.html",
  "app-ia-promotor.html",
  "app-ia-delegado.html",
  "charlie-echo.html",
  "ia-profissional",
  "manual-charlie-echo.html",
  "saude-charlie-echo.html",
];

const failures = [];

for (const page of pages) {
  const url = `${baseUrl}/${page}?audit=charlie-public-${Date.now()}`;
  const response = await fetch(url, { redirect: "follow" });
  const html = await response.text();

  if (!response.ok) failures.push(`${page}: HTTP ${response.status}`);
  if (!html.includes("data-ai-chat") && !["manual-charlie-echo.html", "saude-charlie-echo.html"].includes(page)) {
    failures.push(`${page}: sem data-ai-chat`);
  }
  if (page.startsWith("app-ia-") && !html.includes("charlie-mvp-shell")) {
    failures.push(`${page}: sem charlie-mvp-shell`);
  }
  if ((page.startsWith("app-ia-") || page === "charlie-echo.html" || page === "ia-profissional") && !html.includes(expectedScript)) {
    failures.push(`${page}: script diferente de ${expectedScript}`);
  }
  if (page === "app-ia-profissional.html" && !html.includes('data-ai-layout="detalhista"')) {
    failures.push(`${page}: DAJ precisa exibir os 3 prompts guiados do pacote Advogados v1`);
  }
  if (page === "manual-charlie-echo.html" && (!html.includes("Baixar PDF") || !html.includes("Atualizar resumo") || !html.includes("Doutrina e jurisprudencia") || !html.includes("Fontes") || !html.includes("Criatividade governada") || !html.includes("Leitura do pedido"))) {
    failures.push(`${page}: governanca de download desatualizada`);
  }
  if (page === "saude-charlie-echo.html" && (!html.includes("Gerar PDF") || !html.includes("Salas inteligentes") || !html.includes("doutrina/jurisprudencia") || !html.includes("Fontes") || !html.includes("Centelha Criativa 5.4") || !html.includes("OCR local governado") || !html.includes("Ativo v5.6") || !html.includes("Ativos v5.7") || !html.includes("card DAJ/Drive"))) {
    failures.push(`${page}: painel de saude desatualizado`);
  }
}

const scriptResponse = await fetch(`${baseUrl}/script.js?audit=charlie-script-${Date.now()}`);
const script = await scriptResponse.text();
for (const pattern of ["pdfSafeText", "pdfLiteral", "Baixar PDF", "Abrir no Drive", "buildPdfBlob", "Atualizar resumo", "smartSummary", "governanceClass", "trustedLegalSources", "legalResearchAnswer", "legalSynthesisWithSourcesAnswer", "Direito de propriedade - sintese com fontes", "Constituicao Federal, art. 5, XXII e XXIII", "buildOperationalResearchAnswer", "Pesquisa juridica operacional", "classifyLinkTrust", "Fontes e links confiaveis", "applyCreativeReasoningFrame", "data-ai-layout", "data-ai-save-drive", "downloadUrl real", "askCharlieApiPayload", "charlieRouteDecision", "route: routeDecision", "fallbackLocalPermitido", "localFallbackForRoute", "enforceCriticalAnswerGuards", "criticalBibliographicCorrection", "renderDriveSaverCard", "drive-saver-result-card", "Drive Saver preparado", "Governanca do artefato", "pastaDestino", "revisaoHumanaObrigatoria", "Link publico: permitido com URL real", "data-ai-layout') || card.getAttribute('data-chat-layout", "chatActionsForLayout", "governedIdentityInstruction", "api/auth/context", "mvpIntegrationContracts", "mvpIntegrationInstruction", "mvpInstrumentPackages", "mvpInstrumentAnswer", "Modulo social/cidadao", "Orientacao social", "Encaminhamento humano", "data-mvp-instrument-panel", "data-mvp-instrument-prompt", "data-daj-integration-panel", "Contrato DAJ ativo", "jus9DajInitialAttendanceDraftV1", "appendDajDraftFromUrl", "dajJurisprudenceProductPrompts", "Jurisprudencia governada DAJ", "Argumento com precedente", "Checklist probatorio", "Quadro comparativo", "dajDoctrineBibliographyProductPrompts", "Doutrina e bibliografia DAJ", "Mapa bibliografico", "Sintese doutrinaria", "Ficha de obra", "bibliographicVerificationInstruction", "Regra bibliografica dura", "doctrineBibliographyProductAnswer", "Conferencia bibliografica governada", "A moderna teoria do fato punivel", "Juarez Cirino dos Santos", "nao escreva Escuta, Sentire", "asksDocumentProductionDownload", "buildResponseDownloads", "donwload", "asksCompleteLegalDraft", "completeLegalDraftAnswer", "shouldOfferDocumentDownloads", "injectChatUpload", "[ANEXOS DO USUARIO - UPLOAD LOCAL GOVERNADO]", "Texto, PDF textual, DOCX e OCR local governado", "canReadUploadAsDocx", "api/attachments/extract", "docx_backend_xml", "backend governado", "ensureUploadTesseract", "ensureUploadPdfJs", "OCR_MAX_BYTES", "image_ocr_local", "pdf_ocr_local_first_pages", "ocr local governado", "data-ai-upload-status", "extractPdfTextHeuristic", "pdf_text_heuristic", "PDF textual lido localmente em modo heuristico", "asksDajAnalysisWithUpload", "daj_analise_upload", "ORDEM DE ENTREGA DAJ - MAO NA MASSA", "Leia o DAJ ativo e os anexos textuais enviados", "download local", "ensureCharlieControlHub", "data-charlie-control-hub", "charlie-mvp-head-actions", "Falar com Charlie", "charlie-speak-button", "Ferramentas", "data-charlie-quick-controls", "data-charlie-quick-upload", "data-charlie-quick-settings", "charlieCapabilitySummary", "data-capability-summary"]) {
  if (!script.includes(pattern)) failures.push(`script.js: ausente ${pattern}`);
}

const intakeResponse = await fetch(`${baseUrl}/app-atendimento-inicial.html?audit=charlie-intake-${Date.now()}`);
const intake = await intakeResponse.text();
for (const pattern of ["data-daj-intake-form", "data-send-daj-analysis", "Enviar DAJ para análise da Charlie Echo", expectedScript]) {
  if (!intake.includes(pattern)) failures.push(`app-atendimento-inicial.html: ausente ${pattern}`);
}

const styleResponse = await fetch(`${baseUrl}/style.css?audit=charlie-style-${Date.now()}`);
const style = await styleResponse.text();
for (const pattern of ["drive-saver-result-card", "drive-saver-result-link", "drive-saver-result-status", "drive-saver-result-card.is-decision", "daj-integration-panel", "daj-integration-prompts", "daj-jurisprudence-product-panel", "daj-jurisprudence-product-prompts", "daj-doctrine-product-panel", "daj-doctrine-product-prompts", "mvp-instrument-panel", "mvp-instrument-prompts", "charlie-control-hub", "charlie-control-section", "charlie-speak-button", "charlie-quick-controls", "charlie-capability-grid", "event-quick-nav .event-links"]) {
  if (!style.includes(pattern)) failures.push(`style.css: ausente ${pattern}`);
}

if (failures.length) {
  console.error("Falhas na auditoria publica da Charlie Echo:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Auditoria publica Charlie Echo OK: modulos, PDF limpo, salas e governanca conferidos.");
