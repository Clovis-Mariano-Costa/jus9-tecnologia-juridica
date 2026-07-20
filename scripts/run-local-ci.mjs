import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import path from "node:path";

const portalRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultGithubRoot = path.resolve(portalRoot, "..");
const configuredGithubRoot = process.env.JUS9_GITHUB_ROOT
  ? path.resolve(process.env.JUS9_GITHUB_ROOT)
  : null;
const fallbackGithubRoot = path.resolve(process.env.USERPROFILE || process.env.HOME || defaultGithubRoot, "Documents", "GitHub");
const hasSiblingRepos = (candidateRoot) =>
  existsSync(path.join(candidateRoot, "backend-api-jus9-tecnologia-juridica"))
  && existsSync(path.join(candidateRoot, "charlieecho-jus9-tecnologia-juridica"))
  && existsSync(path.join(candidateRoot, "investimentos-jus9-tecnologia-juridica"));
const githubRoot = [configuredGithubRoot, defaultGithubRoot, fallbackGithubRoot]
  .filter(Boolean)
  .find(hasSiblingRepos) || defaultGithubRoot;

const checks = [
  {
    label: "Prontidao OpenAI Build Week",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-build-week-readiness.mjs"]
  },
  {
    label: "Links Saiba Mais e Build Week",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-saiba-mais-build-week-links.mjs"]
  },
  {
    label: "Pesquisa federada de repositorios Jus 9",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-pesquisa-repositorios.mjs"]
  },
  {
    label: "Portal publico e 14 MVPs",
    cwd: portalRoot,
    command: process.execPath,
    args: ["tests/validate-public-mvps.mjs"]
  },
  {
    label: "Charlie Echo portal publico",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-charlie-echo-public-modules.mjs"]
  },
  {
    label: "Personas MVP da Charlie Echo",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-charlie-echo-mvp-personas.mjs"]
  },
  {
    label: "Roteamento API-primeiro da Charlie Echo",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-charlie-echo-routing.mjs"]
  },
  {
    label: "Inventario canonico dos MVPs",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-charlie-mvp-inventory.mjs"]
  },
  {
    label: "Matriz de priorizacao dos MVPs",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-mvp-prioritization-matrix.mjs"]
  },
  {
    label: "Kits demonstrativos DED e DIC",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-mvp-demo-kits.mjs"]
  },
  {
    label: "DED vitrine editorial",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-ded-editorial-showcase.mjs"]
  },
  {
    label: "DIC vitrine social",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-dic-social-showcase.mjs"]
  },
  {
    label: "Pacote 5 B2B e pericial",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-package5-b2b-technical-showcases.mjs"]
  },
  {
    label: "Estrutura versionada de governanca",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-charlie-governance-structure.mjs"]
  },
  {
    label: "Contratos backend da governanca",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-charlie-governance-backend-contracts.mjs"]
  },
  {
    label: "Charlie Core 1.2.0 e contratos JSON",
    cwd: portalRoot,
    command: process.execPath,
    args: ["--test", "tests/charlie-core.test.mjs"]
  },
  {
    label: "Pipeline governado de respostas Charlie",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-charlie-response-pipeline.mjs"]
  },
  {
    label: "DataJud governado e Termo CNJ",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-datajud-governance.mjs"]
  },
  {
    label: "Onboarding institucional PDPJ-Br",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-pdpj-onboarding.mjs"]
  },
  {
    label: "Cronograma Charlie CNJ v1.6",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-cronograma-charlie-cnj-v1-6.mjs"]
  },
  {
    label: "G5 governanca e homologacao simulada CNJ",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-g5-governanca-apis-cnj.mjs"]
  },
  {
    label: "Cronograma Charlie CNJ v1.7",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-cronograma-charlie-cnj-v1-7.mjs"]
  },
  {
    label: "Cronograma Charlie CNJ v1.8",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-cronograma-charlie-cnj-v1-8.mjs"]
  },
  {
    label: "G6 governanca operacional Charlie",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-g6-governanca-charlie.mjs"]
  },
  {
    label: "G6B registro canonico capacidades Charlie",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-g6b-registro-canonico-charlie.mjs"]
  },
  {
    label: "Qualidade da interface Charlie Echo",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-charlie-echo-quality.mjs"]
  },
  {
    label: "Contratos anti-travamento da Charlie Echo",
    cwd: portalRoot,
    command: process.execPath,
    args: ["tests/validate-charlie-response-contracts.mjs"]
  },
  {
    label: "Laudo obrigatorio da analise DAJ",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-daj-analysis-laudo.mjs"]
  },
  {
    label: "Matriz controlada de RLS",
    cwd: portalRoot,
    command: process.execPath,
    args: ["tests/validate-rls-controlled-matrix.mjs"]
  },
  {
    label: "Estrutura SQL de RLS",
    cwd: portalRoot,
    command: process.execPath,
    args: ["database/scripts/validate-rls-structure.js"]
  },
  {
    label: "Pacote SQL de homologacao ficticia",
    cwd: portalRoot,
    command: process.execPath,
    args: ["database/scripts/validate-homologation-package.js"]
  },
  {
    label: "Autenticacao do Worker",
    cwd: portalRoot,
    command: process.execPath,
    args: ["tests/validate-worker-auth.mjs"]
  },
  {
    label: "Homologacao tecnica DAJ ponta a ponta",
    cwd: portalRoot,
    command: process.execPath,
    args: ["tests/validate-daj-homologation.mjs"]
  },
  {
    label: "Kit de aceite humano Pacote 1C",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-pacote-1c-acceptance-kit.mjs"]
  },
  {
    label: "Mao na Massa v3",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-mao-na-massa-v3.mjs"]
  },
  {
    label: "Mao na Massa v3.1",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-mao-na-massa-v3-1.mjs"]
  },
  {
    label: "Mao na Massa v3.1.1 incidente DAJ",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-mao-na-massa-v3-1-1.mjs"]
  },
  {
    label: "Fechamento Mao na Massa Video ZIP",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-mao-na-massa-final-reminders.mjs"]
  },
  {
    label: "Revisao geral Mao na Massa",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-mao-na-massa-general-review.mjs"]
  },
  {
    label: "Pacote 8 fechamento tecnico",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-pacote8-fechamento.mjs"]
  },
  {
    label: "Cronograma geral dos MVPs v4",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-cronograma-mvps-v4.mjs"]
  },
  {
    label: "Portfolio canonico dos MVPs v2",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-portfolio-mvps-v2.mjs"]
  },
  {
    label: "Contratos e baseline transversal dos MVPs",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-mvp-contracts-baseline.mjs"]
  },
  {
    label: "Revalidacao e mapa de repositorios dos MVPs",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-mvp-revalidation-repositories.mjs"]
  },
  {
    label: "Release Mao na Massa dos MVPs v4",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-mao-na-massa-mvps-v4-release.mjs"]
  },
  {
    label: "Revisao final dos pacotes MVPs v4",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-mvp-v4-final-review.mjs"]
  },
  {
    label: "Painel executivo dos MVPs",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-mvp-executive-panel.mjs"]
  },
  {
    label: "Mapa de provas dos MVPs gerais",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-mvp-proof-map.mjs"]
  },
  {
    label: "Onda 1 DED e DIC",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-onda1-ded-dic-proof-package.mjs"]
  },
  {
    label: "Onda 2 DEE, DEJI e DPJ",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-onda2-dee-deji-dpj-proof-package.mjs"]
  },
  {
    label: "Onda 3 DIP, DAA e DEJ",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-onda3-dip-daa-dej-proof-package.mjs"]
  },
  {
    label: "Onda 4 DOI e DGE",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-onda4-doi-dge-proof-package.mjs"]
  },
  {
    label: "Onda 5 DMP, DAP e DMG",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-onda5-dmp-dap-dmg-proof-package.mjs"]
  },
  {
    label: "Backend local fail closed",
    cwd: path.join(githubRoot, "backend-api-jus9-tecnologia-juridica"),
    command: process.execPath,
    args: ["--test", "tests/exposure-policy.test.mjs"]
  },
  {
    label: "Charlie Echo publica",
    cwd: path.join(githubRoot, "charlieecho-jus9-tecnologia-juridica"),
    command: process.execPath,
    args: ["tests/charlie-echo-public-regression.mjs"]
  },
  {
    label: "Paginas publicas de instalacao",
    cwd: portalRoot,
    command: process.execPath,
    args: ["scripts/audit-public-install-pages.mjs"]
  },
  {
    label: "QR Codes publicos",
    cwd: path.join(githubRoot, "investimentos-jus9-tecnologia-juridica"),
    command: process.execPath,
    args: ["scripts/validate-public-qr-codes.mjs"]
  }
];

for (const check of checks) {
  console.log(`\n=== ${check.label} ===`);
  if (!existsSync(check.cwd)) {
    console.error(`LOCAL_CI_FAIL ${check.label}: diretorio nao encontrado ${check.cwd}`);
    process.exit(1);
  }
  const result = spawnSync(check.command, check.args, {
    cwd: check.cwd,
    encoding: "utf8",
    stdio: "inherit"
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    console.error(`LOCAL_CI_FAIL ${check.label}`);
    process.exit(result.status || 1);
  }
}

console.log("\nLOCAL_CI_OK build-week,portal,daj-laudo,rls,sql-homologacao,worker-auth,backend-local,charlie-echo,instalacao-publica,qr-codes");
