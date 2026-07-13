import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const portalRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const githubRoot = path.resolve(portalRoot, "..");

const checks = [
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

console.log("\nLOCAL_CI_OK portal,rls,sql-homologacao,worker-auth,backend-local,charlie-echo,instalacao-publica,qr-codes");
