import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const expectedScriptVersion = "script.js?v=20260608-chat-modelo-v1";

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
    patterns: ["https://charlieecho.jus9tecnologia.com.br/api/ia", "message: buildApiMessage", "mvpPersonaRules", "mvpPersonalityInstruction", "Personalidade operacional do MVP", "Assinatura criativa do ambiente", "Limite duro do ambiente", "Protocolo Centelha Criativa 5.4", "applyCreativeReasoningFrame", "Leitura do pedido", "Caminho escolhido", "Proximo passo criativo"],
  },
  {
    name: "chat MVP possui ferramentas de qualidade",
    file: "script.js",
    patterns: ["Melhorar resposta", "Fontes", "Atualizar resumo", "Resumo executivo", "Gerar PDF", "Baixar PDF", "link clicavel de download", "Renomear", "application/pdf", ".pdf", "buildPdfBlob", "download-link", "Helvetica-Bold", "Informacoes do pacote", "Historico recente", "Fontes e links confiaveis", "Pagina ", "pdfSafeText", "pdfLiteral", "eef4ff", "asksDocumentProductionDownload", "buildResponseDownloads"],
  },
  {
    name: "Charlie pesquisa doutrina e jurisprudencia com fontes",
    file: "script.js",
    patterns: ["trustedLegalSources", "legalResearchAnswer", "buildOperationalResearchAnswer", "Pesquisa juridica operacional", "Busca pronta no Google limitada ao TJSC", "Google Academico com busca pronta", "Como fichar cada resultado", "classifyLinkTrust", "trustedSourcesSummary", "buildSourceLinesFromRoom", "STF - Pesquisa de jurisprudencia", "TJSC - Portal da jurisprudencia", "Portal de Periodicos CAPES", "lista fixa"],
  },
  {
    name: "lider MVP lista ambientes prontos",
    file: "lider-mvp.html",
    patterns: ["Acesso rapido aos 13 ambientes demonstrativos", "app-demo-advogar.html", "app-demo-delegado.html", "app-ia-profissional.html#chat-ia"],
  },
  {
    name: "painel de saude publicado",
    file: "saude-charlie-echo.html",
    patterns: ["operacional da Charlie Echo", "Protocolo 4.1", "Centelha Criativa 5.4", "Salas inteligentes", "Atualizar resumo", "Onde paramos?", "Fontes", "doutrina/jurisprudencia", "Baixar PDF", "Gerar PDF"],
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
    patterns: ["jus9-pwa-v6-2026-07-03-charlie-document-download", "isFreshMvpAsset", "app-ia-[^/]+\\.html", "networkFirst", "cache: 'reload'", "SKIP_WAITING"],
  },
  {
    name: "casa propria da Charlie Echo publicada",
    file: "charlie-echo.html",
    patterns: ["Casa propria da IA", "data-ai-chat", "app-ia-profissional.html#chat-ia", "script.js?v=20260608-chat-modelo-v1"],
  },
  {
    name: "pagina publica da Charlie usa script versionado",
    file: "ia-profissional.html",
    patterns: ["data-ai-chat", "script.js?v=20260608-chat-modelo-v1"],
  },
];

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
if (appIaFiles.length !== 13) {
  failures.push(`esperados 13 arquivos app-ia-*.html, encontrados ${appIaFiles.length}`);
}
for (const file of appIaFiles) {
  const html = read(file);
  if (!html.includes(expectedScriptVersion)) {
    failures.push(`${file}: versao de script diferente de ${expectedScriptVersion}`);
  }
  if (!html.includes("charlie-mvp-shell")) {
    failures.push(`${file}: ausente classe visual charlie-mvp-shell`);
  }
  if (!html.includes("data-ai-chat")) {
    failures.push(`${file}: ausente data-ai-chat`);
  }
}

if (failures.length) {
  console.error("Falhas na auditoria Charlie Echo:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Auditoria Charlie Echo OK: memoria curta, ferramentas, painel e manual encontrados.");
