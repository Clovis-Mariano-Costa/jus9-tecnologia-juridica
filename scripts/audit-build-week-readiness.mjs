import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const strict = process.argv.includes("--strict");
const gitCandidates = [
  process.env.JUS9_GIT_BIN,
  process.env.USERPROFILE && path.join(process.env.USERPROFILE, ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "native", "git", "cmd", "git.exe"),
  "C:\\Program Files\\Git\\cmd\\git.exe",
  "C:\\Program Files (x86)\\Git\\cmd\\git.exe"
].filter(Boolean);
const gitExecutable = gitCandidates.find((candidate) => existsSync(candidate)) || "git";

const requiredFiles = [
  "README.md",
  "build-week-2026.html",
  "saiba-mais.html",
  "mvp-o-que-ja-funciona.html",
  "app-painel-mvps.html",
  "assets/css/build-week-reviewer.css",
  "documentacao/hackathon/BUILD_WEEK_STATUS_2026.json",
  "documentacao/hackathon/DEVPOST_SUBMISSION_DRAFT_EN.md",
  "documentacao/hackathon/JUDGE_PATH_EN.md",
  "documentacao/hackathon/EVIDENCIAS_BUILD_WEEK_2026.md",
  "documentacao/hackathon/EVIDENCIA_CODEX_SOL_BUILD_WEEK_2026_v1.0.0.md",
  "documentacao/hackathon/MATRIZ_INTEGRACOES_TERCEIROS_BUILD_WEEK_2026.md",
  "documentacao/hackathon/RELATORIO_CONFORMIDADE_OPENAI_BUILD_WEEK_2026_v1.1.0.md"
];

const errors = [];
const blockers = [];
const warnings = [];
const passed = [];

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function check(condition, okMessage, errorMessage) {
  if (condition) passed.push(okMessage);
  else errors.push(errorMessage);
}

function block(condition, message) {
  if (condition) blockers.push(message);
}

function git(args) {
  return execFileSync(gitExecutable, args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
}

for (const relativePath of requiredFiles) {
  check(existsSync(path.join(repoRoot, relativePath)), `required file: ${relativePath}`, `Missing required Build Week file: ${relativePath}`);
}

if (errors.length) {
  console.error("BUILD_WEEK_AUDIT_INTEGRITY_FAIL");
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exit(1);
}

const status = JSON.parse(read("documentacao/hackathon/BUILD_WEEK_STATUS_2026.json"));
const reviewerPage = read("build-week-2026.html");
const reviewerCss = read("assets/css/build-week-reviewer.css");
const readme = read("README.md");
const devpostDraft = read("documentacao/hackathon/DEVPOST_SUBMISSION_DRAFT_EN.md");
const judgePath = read("documentacao/hackathon/JUDGE_PATH_EN.md");
const evidenceLedger = read("documentacao/hackathon/EVIDENCIAS_BUILD_WEEK_2026.md");
const codexSolEvidence = read("documentacao/hackathon/EVIDENCIA_CODEX_SOL_BUILD_WEEK_2026_v1.0.0.md");
const integrationMatrix = read("documentacao/hackathon/MATRIZ_INTEGRACOES_TERCEIROS_BUILD_WEEK_2026.md");

check(status.schemaVersion === "1.0.0", "status manifest schema", "Unexpected Build Week status schema");
check(status.project?.track === "Work and Productivity", "competition track", "Track must be Work and Productivity");
check(status.project?.reviewerUrl === "https://jus9tecnologia.com.br/build-week-2026.html", "canonical reviewer URL", "Reviewer URL does not match the public page");
check(status.mvpConsolidation?.stateMapUrl === "https://jus9tecnologia.com.br/mvp-o-que-ja-funciona.html", "MVP state-map URL", "Build Week status does not point to the public MVP state map");
check(status.mvpConsolidation?.executivePanelUrl === "https://jus9tecnologia.com.br/app-painel-mvps.html", "MVP executive-panel URL", "Build Week status does not point to the MVP executive panel");
check(status.mvpConsolidation?.ecosystemMapUrl === "https://jus9tecnologia.com.br/saiba-mais.html", "ecosystem map URL", "Build Week status does not point to Saiba mais");
check(status.mvpConsolidation?.operationalPilot === "DAJ", "DAJ operational pilot", "Build Week status must keep DAJ as the operational pilot");
check(status.mvpConsolidation?.dajAnalysisContract?.includes("Laudo de Analise DAJ"), "DAJ laudo contract", "Build Week status must preserve the DAJ laudo contract");
check(status.mvpConsolidation?.package2State === "AGUARDANDO_NOVO_TESTE_HUMANO", "Package 2 human retest state", "Build Week status must preserve Package 2 human retest state");
check(status.claims?.significantExtensionAfterStart?.state === "verified", "significant-extension claim", "Significant extension is not marked verified");
check(status.claims?.codexCollaboration?.state === "verified", "Codex collaboration status", "Codex collaboration must be supported by evidence");
check(status.claims?.codexCollaboration?.sessionId === "attached_privately", "Codex task identification retained privately", "Codex task identification must be retained privately");
check(status.claims?.codexGpt56SolDevelopment?.state === "verified_local_session_metadata", "Codex Sol development evidence status", "Codex Sol development evidence must be explicitly verified");
check(status.claims?.codexGpt56SolDevelopment?.modelId === "gpt-5.6-sol", "Codex Sol model identifier", "Unexpected Codex development model identifier");
check(status.claims?.codexGpt56SolDevelopment?.evidenceFingerprintSha256 === "d2cfd341b2ad8c4e95e47977f4a90bd3b023cde50977efd345d08d51904a54b9", "Codex Sol evidence fingerprint", "Codex Sol evidence fingerprint does not match the approved record");
check(status.claims?.openAiApiIntegration?.state === "verified_in_source", "OpenAI source integration status", "OpenAI integration must remain scoped to source verification");
check(status.claims?.gpt56Runtime?.state === "unverified", "GPT-5.6 claim remains unverified", "GPT-5.6 runtime must remain unverified until evidence is attached");
check(status.claims?.entrantEligibility?.state === "blocked_pending_official_clarification", "eligibility remains explicitly blocked", "Eligibility must not be presented as approved without written clarification");
check(status.integrations?.externalPartySearch?.state === "unavailable_fail_closed", "party search fails closed", "External party search must remain unavailable and fail closed");
check(status.integrations?.datajud?.state.includes("read_only"), "DataJud remains read-only", "DataJud must remain read-only in the competition package");
check(status.submissionArtifacts?.finalZip?.state === "deferred_until_technical_freeze", "final ZIP is explicitly deferred", "Final ZIP deferral was lost");
check(status.submissionArtifacts?.demoVideo?.state === "deferred_until_technical_freeze", "demo video is explicitly deferred", "Demo video deferral was lost");
check(status.submissionArtifacts?.repositoryHygiene?.state === "blocked_tracked_legacy_zip_extraction", "tracked legacy ZIP extraction is declared", "Repository hygiene status does not declare the tracked legacy ZIP extraction");

check(/<html\s+lang="en">/i.test(reviewerPage), "reviewer page language", "Reviewer page must declare English");
check(/id="live-flow"/.test(reviewerPage) && /id="evidence"/.test(reviewerPage) && /id="safety"/.test(reviewerPage), "reviewer page sections", "Reviewer page is missing live flow, evidence, or safety sections");
check(/id="mvp-scope"/.test(reviewerPage) && /data-build-week-mvp-scope/.test(reviewerPage), "reviewer MVP scope section", "Reviewer page is missing the MVP scope section");
check(/Codex development model/.test(reviewerPage) && /gpt-5\.6-sol/.test(reviewerPage), "reviewer Codex Sol disclosure", "Reviewer page does not disclose the verified Codex development model");
check(/app-atendimento-inicial\.html/.test(reviewerPage) && /app-ia-profissional\.html/.test(reviewerPage) && /app-processos\.html/.test(reviewerPage), "reviewer workflow links", "Reviewer page does not link the complete DAJ flow");
check(/saiba-mais\.html/.test(reviewerPage) && /mvp-o-que-ja-funciona\.html/.test(reviewerPage) && /app-painel-mvps\.html/.test(reviewerPage), "reviewer ecosystem links", "Reviewer page does not link Saiba mais, state map, and executive panel");
check(/@media \(max-width:760px\)/.test(reviewerCss), "reviewer mobile layout", "Reviewer CSS has no mobile layout");
check(/build-week-2026\.html/.test(readme), "README reviewer entry", "README does not link the public reviewer page");
check(/a45ae2cf75221eaf7f3679ad8c20c59146f73ae6/.test(devpostDraft), "Devpost baseline disclosure", "Devpost draft does not include the full baseline commit");
check(/fails? closed/i.test(devpostDraft) && /synthetic data only/i.test(judgePath), "fail-closed and synthetic-data disclosures", "Judge materials lost a critical safety disclosure");
check(/DataJud/.test(integrationMatrix) && /OpenAI/.test(integrationMatrix) && /Google/.test(integrationMatrix), "third-party matrix coverage", "Third-party matrix does not cover the principal integrations");
check(/a45ae2c/.test(evidenceLedger), "evidence baseline reference", "Evidence ledger does not reference the baseline");
check(/2026-07-13 18:37:59\.601/.test(codexSolEvidence), "Codex Sol activation timestamp", "Codex Sol evidence lost its activation timestamp");
check(/development-session evidence only/i.test(status.claims.codexGpt56SolDevelopment.claimBoundary), "Codex Sol claim boundary", "Codex Sol evidence must remain scoped to development");
check(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(codexSolEvidence), "Codex task identifier absent from public evidence", "Public Codex evidence appears to expose a full task identifier");

const localLinks = [...reviewerPage.matchAll(/(?:href|src)="([^"]+)"/g)]
  .map((match) => match[1])
  .filter((value) => !/^(?:https?:|mailto:|tel:|#)/i.test(value))
  .map((value) => value.split(/[?#]/, 1)[0])
  .filter(Boolean);

for (const localLink of localLinks) {
  check(existsSync(path.join(repoRoot, localLink)), `local reviewer asset: ${localLink}`, `Broken local reviewer link: ${localLink}`);
}

const publicClaimFiles = {
  "README.md": readme,
  "build-week-2026.html": reviewerPage,
  "DEVPOST_SUBMISSION_DRAFT_EN.md": devpostDraft,
  "JUDGE_PATH_EN.md": judgePath,
  "BUILD_WEEK_STATUS_2026.json": JSON.stringify(status)
};

const secretPatterns = [
  { label: "OpenAI-style API key", regex: /\bsk-[A-Za-z0-9_-]{20,}\b/g },
  { label: "Google API key", regex: /\bAIza[0-9A-Za-z_-]{30,}\b/g },
  { label: "private key block", regex: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g },
  { label: "JWT bearer token", regex: /Bearer\s+eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g }
];

for (const [name, content] of Object.entries(publicClaimFiles)) {
  for (const pattern of secretPatterns) {
    check(!pattern.regex.test(content), `${name}: no ${pattern.label}`, `${name} appears to contain a ${pattern.label}`);
    pattern.regex.lastIndex = 0;
  }
}

const unsupportedModelClaims = [
  /powered by GPT-5\.6/i,
  /uses GPT-5\.6(?:\s+at runtime)?/i,
  /GPT-5\.6 runtime (?:is )?verified/i,
  /deployed (?:with|on) GPT-5\.6/i
];

for (const [name, content] of Object.entries(publicClaimFiles)) {
  for (const pattern of unsupportedModelClaims) {
    check(!pattern.test(content), `${name}: no unsupported GPT-5.6 claim`, `${name} contains an unsupported GPT-5.6 claim: ${pattern}`);
  }
}

const baseline = status.project.baselineCommit;
try {
  git(["cat-file", "-e", `${baseline}^{commit}`]);
  passed.push("baseline commit exists");
} catch {
  errors.push(`Baseline commit does not exist: ${baseline}`);
}

try {
  git(["merge-base", "--is-ancestor", baseline, "HEAD"]);
  passed.push("baseline is an ancestor of HEAD");
} catch {
  errors.push("Recorded baseline is not an ancestor of HEAD");
}

let commitCount = "unknown";
let diffStat = "unavailable";
let head = "unknown";
let trackedTemporaryFiles = [];
try {
  head = git(["rev-parse", "--short=12", "HEAD"]);
  commitCount = git(["rev-list", "--count", `${baseline}..HEAD`]);
  diffStat = git(["diff", "--shortstat", `${baseline}..HEAD`]) || "no changes";
  const datedCommits = git(["log", "--format=%H|%cI", `${baseline}..HEAD`])
    .split(/\r?\n/)
    .filter(Boolean);
  const cutoff = Date.parse(status.project.periodStartBrazil);
  const beforeCutoff = datedCommits.filter((line) => Date.parse(line.split("|")[1]) < cutoff);
  check(beforeCutoff.length === 0, "all compared commits are after the event cutoff", `Found ${beforeCutoff.length} compared commit(s) dated before the event cutoff`);
  trackedTemporaryFiles = git(["ls-files", "tmp"])
    .split(/\r?\n/)
    .filter(Boolean);
} catch (error) {
  errors.push(`Could not reproduce Git evidence: ${error.message}`);
}

block(status.claims.entrantEligibility.state !== "verified_eligible", "Entrant eligibility is not verified in writing.");
block(status.claims.codexCollaboration.sessionId !== "attached_privately", "Codex Session ID from /feedback is not attached privately.");
block(status.submissionArtifacts.judgeAccount.state !== "ready_private", "Least-privilege judge account or isolated sandbox is not ready.");
block(status.submissionArtifacts.assetRightsDeclaration.state !== "approved", "Asset-rights declaration is not approved.");
block(trackedTemporaryFiles.length > 0, `Repository still tracks ${trackedTemporaryFiles.length} temporary ZIP-audit file(s) under tmp.`);
block(!status.integrations.datajud.state.includes("legal_review_complete"), "DataJud terms review or authorization evidence is incomplete for the demonstrated use.");
block(status.submissionArtifacts.finalZip.state !== "ready_hashed_scanned", "Final ZIP is deferred and not frozen, scanned, and hashed.");
block(status.submissionArtifacts.demoVideo.state !== "ready_public_under_3_minutes", "Public demo video under three minutes is deferred.");

if (status.claims.gpt56Runtime.state !== "verified") {
  warnings.push("GPT-5.6 runtime remains unverified; the final submission must keep that claim out unless sanitized evidence is attached.");
}
warnings.push("Do not commit private judge credentials, Codex Session IDs, or deployment attestations containing secrets.");

console.log("BUILD_WEEK_EVIDENCE");
console.log(`baseline=${baseline.slice(0, 12)}`);
console.log(`head=${head}`);
console.log(`commits_after_baseline=${commitCount}`);
console.log(`diff=${diffStat}`);
console.log(`tracked_tmp_files=${trackedTemporaryFiles.length}`);
console.log(`checks_passed=${passed.length}`);

for (const warning of warnings) console.log(`WARN ${warning}`);
for (const message of blockers) console.log(`BLOCKER ${message}`);

if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  console.error(`BUILD_WEEK_AUDIT_FAIL errors=${errors.length} blockers=${blockers.length}`);
  process.exit(1);
}

if (strict && blockers.length) {
  console.error(`BUILD_WEEK_SUBMISSION_NOT_READY blockers=${blockers.length}`);
  process.exit(2);
}

console.log(`BUILD_WEEK_AUDIT_OK blockers=${blockers.length} strict=${strict}`);
