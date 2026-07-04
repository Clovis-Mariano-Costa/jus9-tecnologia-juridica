const baseUrl = "https://jus9tecnologia.com.br";
const expectedScript = "script.js?v=20260703-orquestra-normativa-v1";

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
  if (page === "manual-charlie-echo.html" && (!html.includes("Baixar PDF") || !html.includes("Atualizar resumo") || !html.includes("Doutrina e jurisprudencia") || !html.includes("Fontes") || !html.includes("Criatividade governada") || !html.includes("Leitura do pedido"))) {
    failures.push(`${page}: governanca de download desatualizada`);
  }
  if (page === "saude-charlie-echo.html" && (!html.includes("Gerar PDF") || !html.includes("Salas inteligentes") || !html.includes("doutrina/jurisprudencia") || !html.includes("Fontes") || !html.includes("Centelha Criativa 5.4"))) {
    failures.push(`${page}: painel de saude desatualizado`);
  }
}

const scriptResponse = await fetch(`${baseUrl}/script.js?audit=charlie-script-${Date.now()}`);
const script = await scriptResponse.text();
for (const pattern of ["pdfSafeText", "pdfLiteral", "Baixar PDF", "buildPdfBlob", "Atualizar resumo", "smartSummary", "governanceClass", "trustedLegalSources", "legalResearchAnswer", "buildOperationalResearchAnswer", "Pesquisa juridica operacional", "classifyLinkTrust", "Fontes e links confiaveis", "applyCreativeReasoningFrame", "data-ai-layout", "chatActionsForLayout", "governedIdentityInstruction", "api/auth/context", "nao escreva Escuta, Sentire", "asksDocumentProductionDownload", "buildResponseDownloads", "donwload"]) {
  if (!script.includes(pattern)) failures.push(`script.js: ausente ${pattern}`);
}

if (failures.length) {
  console.error("Falhas na auditoria publica da Charlie Echo:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Auditoria publica Charlie Echo OK: modulos, PDF limpo, salas e governanca conferidos.");
