import fs from "node:fs/promises";

const root = new URL("../", import.meta.url);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const modules = [
  {
    code: "DEE",
    dashboard: "app-demo-escritorio.html",
    ai: "app-ia-escritorio.html",
    showcase: "data-dee-showcase",
    briefing: "data-dee-briefing",
    checklist: "data-dee-checklist",
    promptPack: "data-dee-prompt-pack",
    guardrails: "data-dee-guardrails",
    dataset: "DEE-MODELO-VITRINE-2026",
    anchors: ["Escritorio Alfa Ficticio", "CLIENTE-FICTICIO-SEM-DADOS", "Permissao por caso", "Revisao do advogado"],
    aiLimit: "Charlie nao assina, nao protocola, nao decide estrategia final e nao substitui o advogado responsavel",
    forbidden: ["cliente real obrigatório", "assinatura automatica habilitada"],
  },
  {
    code: "DEJI",
    dashboard: "app-demo-empresa.html",
    ai: "app-ia-empresa.html",
    showcase: "data-deji-showcase",
    briefing: "data-deji-briefing",
    checklist: "data-deji-checklist",
    promptPack: "data-deji-prompt-pack",
    guardrails: "data-deji-guardrails",
    dataset: "DEJI-MODELO-VITRINE-2026",
    anchors: ["Empresa Beta Ficticia", "Fornecedor Demonstrativo Sem Dados Reais", "Sem dado financeiro real", "Sem aprovacao automatica"],
    aiLimit: "Charlie nao aprova fornecedor, nao assina contrato, nao decide pela empresa e nao substitui juridico, compliance ou diretoria",
    forbidden: ["contrato real obrigatório", "aprovacao automatica habilitada"],
  },
  {
    code: "DPJ",
    dashboard: "app-demo-perito.html",
    ai: "app-ia-perito.html",
    showcase: "data-dpj-showcase",
    briefing: "data-dpj-briefing",
    checklist: "data-dpj-checklist",
    promptPack: "data-dpj-prompt-pack",
    guardrails: "data-dpj-guardrails",
    dataset: "DPJ-MODELO-VITRINE-2026",
    anchors: ["Perito Delta Ficticio", "Quesitos periciais ficticios", "Metodo antes de conclusao", "Sem laudo final automatico"],
    aiLimit: "Charlie nao conclui fato tecnico sem evidencia, nao assina laudo e nao substitui perito habilitado, juizo ou assistente tecnico",
    forbidden: ["evidencia real obrigatória", "laudo final automatico habilitado"],
  },
];

const [panel, cronograma] = await Promise.all([
  fs.readFile(new URL("app-painel-mvps.html", root), "utf8"),
  fs.readFile(new URL("governanca/CRONOGRAMA_MAO_NA_MASSA_CHARLIE_ECHO_v3.0.0.md", root), "utf8"),
]);

for (const mod of modules) {
  const [dashboard, ai] = await Promise.all([
    fs.readFile(new URL(mod.dashboard, root), "utf8"),
    fs.readFile(new URL(mod.ai, root), "utf8"),
  ]);

  assert(dashboard.includes(mod.showcase), `${mod.code}: painel sem vitrine marcada`);
  assert(dashboard.includes(mod.briefing), `${mod.code}: painel sem briefing estruturado`);
  assert(dashboard.includes(mod.checklist), `${mod.code}: painel sem checklist governado`);
  assert(dashboard.includes(mod.dataset), `${mod.code}: painel sem dataset ficticio`);
  assert(dashboard.includes("app-painel-mvps.html"), `${mod.code}: painel sem retorno ao painel executivo`);
  assert(ai.includes(mod.promptPack), `${mod.code}: IA sem pacote de prompts`);
  assert(ai.includes(mod.guardrails), `${mod.code}: IA sem guardrails`);
  assert(ai.includes(mod.dataset), `${mod.code}: IA sem dataset ficticio`);
  assert(ai.includes(mod.aiLimit), `${mod.code}: IA sem limite humano especifico`);

  for (const phrase of mod.anchors) {
    assert(dashboard.includes(phrase) || ai.includes(phrase), `${mod.code}: ancora ausente: ${phrase}`);
  }
  for (const forbidden of mod.forbidden) {
    assert(!dashboard.includes(forbidden) && !ai.includes(forbidden), `${mod.code}: promessa ou coleta indevida: ${forbidden}`);
  }
}

assert(panel.includes('data-package="5" data-package-status="CONCLUIDO_PUBLICADO"'), "painel executivo nao marca Pacote 5 como publicado");
assert(panel.includes("Vitrines B2B/tecnica publicadas"), "painel executivo sem resumo do Pacote 5");
assert(cronograma.includes("Pacote 5 - DEE, DEJI e DPJ") && cronograma.includes("Estado: `CONCLUIDO_PUBLICADO`"), "cronograma sem Pacote 5 concluido/publicado");

console.log("PACKAGE5_SHOWCASES_OK modules=DEE,DEJI,DPJ status=CONCLUIDO_PUBLICADO");
