import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const expectedScriptVersion = "script.js?v=20260604-charlie-rooms-v4-4";

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

const checks = [
  {
    name: "chat MVP tem memoria curta por sala",
    file: "script.js",
    patterns: ["chatRoomKey", "rememberChatExchange", "buildQuestionWithRoom", "previousQuestionAnswer", "target.insertBefore(panel, target.firstChild)"],
  },
  {
    name: "chat MVP envia message para API da Charlie",
    file: "script.js",
    patterns: ["https://charlieecho.jus9tecnologia.com.br/api/ia", "message: buildApiMessage"],
  },
  {
    name: "chat MVP possui ferramentas de qualidade",
    file: "script.js",
    patterns: ["Melhorar resposta", "Transformar em pacote", "Qual foi minha pergunta anterior?", "Renomear sala"],
  },
  {
    name: "lider MVP lista ambientes prontos",
    file: "lider-mvp.html",
    patterns: ["Acesso rapido aos 13 ambientes demonstrativos", "app-demo-advogar.html", "app-demo-delegado.html", "app-ia-profissional.html#chat-ia"],
  },
  {
    name: "painel de saude publicado",
    file: "saude-charlie-echo.html",
    patterns: ["Saúde operacional da Charlie Echo", "Protocolo 4.1", "Memória persistente"],
  },
  {
    name: "manual publico publicado",
    file: "manual-charlie-echo.html",
    patterns: ["Como conversar com a Charlie Echo", "Peça por intenção", "Fontes confiáveis"],
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
