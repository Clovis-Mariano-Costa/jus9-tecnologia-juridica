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
  "documentacao/hackathon/RELATORIO_CONFORMIDADE_OPENAI_BUILD_WEEK_2026_v1.1.0.md",
  "documentacao/hackathon/FECHAMENTO_HUMANO_BUILD_WEEK_2026.md",
  "documentacao/hackathon/VIDEO_ROTEIRO_BUILD_WEEK_2026.md",
  "documentacao/hackathon/ZIP_FINAL_MANIFESTO_PENDENTE_2026.md",
  "governanca/PACOTE8_REVISAO_GERAL_VIDEO_ZIP_BUILD_WEEK_2026-07-20_v1.0.0.md",
  "governanca/CRONOGRAMA_SPRINT_FINAL_MVPS_BUILD_WEEK_2026-07-21_v1.0.0.md",
  "releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.18.md"
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
check(status.metadata?.versao === "1.7.3", "status manifest security version", "Build Week status must be version 1.7.3 for the dependency-security release");
check(status.project?.track === "Work and Productivity", "competition track", "Track must be Work and Productivity");
check(status.project?.reviewerUrl === "https://jus9tecnologia.com.br/build-week-2026.html", "canonical reviewer URL", "Reviewer URL does not match the public page");
check(status.mvpConsolidation?.stateMapUrl === "https://jus9tecnologia.com.br/mvp-o-que-ja-funciona.html", "MVP state-map URL", "Build Week status does not point to the public MVP state map");
check(status.mvpConsolidation?.executivePanelUrl === "https://jus9tecnologia.com.br/app-painel-mvps.html", "MVP executive-panel URL", "Build Week status does not point to the MVP executive panel");
check(status.mvpConsolidation?.ecosystemMapUrl === "https://jus9tecnologia.com.br/saiba-mais.html", "ecosystem map URL", "Build Week status does not point to Saiba mais");
check(status.mvpConsolidation?.operationalPilot === "DAJ", "DAJ operational pilot", "Build Week status must keep DAJ as the operational pilot");
check(status.mvpConsolidation?.dajAnalysisContract?.includes("Laudo de Analise DAJ"), "DAJ laudo contract", "Build Week status must preserve the DAJ laudo contract");
check(status.mvpConsolidation?.package2State === "CONCLUIDO_COM_RESSALVA_CORRETIVA", "Package 2 reconciled state", "Build Week status must preserve the completed Package 2 state with corrective caveat");
check(status.mvpConsolidation?.package6State === "AUTORIZADO_APENAS_PARA_REVISAO_E_HOMOLOGACAO_CONTROLADA", "Package 6 controlled-review state", "Build Week status must not present Drive or memory as production-ready");
check(status.mvpConsolidation?.finalPackageState === "PACOTE_PRIVADO_JUIZES_PREPARADO_VIDEO_HUMANO_PENDENTE", "private judge package state", "Build Week status must record the private package without claiming the video or submission complete");
check(status.claims?.significantExtensionAfterStart?.state === "verified", "significant-extension claim", "Significant extension is not marked verified");
check(status.claims?.codexCollaboration?.state === "verified", "Codex collaboration status", "Codex collaboration must be supported by evidence");
check(status.claims?.codexCollaboration?.sessionId === "attached_privately", "Codex task identification retained privately", "Codex task identification must be retained privately");
check(status.claims?.codexGpt56SolDevelopment?.state === "verified_local_session_metadata", "Codex Sol development evidence status", "Codex Sol development evidence must be explicitly verified");
check(status.claims?.codexGpt56SolDevelopment?.modelId === "gpt-5.6-sol", "Codex Sol model identifier", "Unexpected Codex development model identifier");
check(status.claims?.codexGpt56SolDevelopment?.evidenceFingerprintSha256 === "d2cfd341b2ad8c4e95e47977f4a90bd3b023cde50977efd345d08d51904a54b9", "Codex Sol evidence fingerprint", "Codex Sol evidence fingerprint does not match the approved record");
check(status.claims?.codexGpt56SolDevelopment?.elapsedCounter?.startedAt === "2026-07-13T18:37:59.601-03:00", "Codex elapsed counter origin", "Codex elapsed counter must use the verified activation timestamp");
check(/Calendar elapsed time only/.test(status.claims?.codexGpt56SolDevelopment?.elapsedCounter?.claimBoundary || ""), "Codex elapsed counter claim boundary", "Codex elapsed counter must distinguish calendar time from compute time and production runtime");
check(status.claims?.openAiApiIntegration?.state === "verified_in_source", "OpenAI source integration status", "OpenAI integration must remain scoped to source verification");
check(status.claims?.openAiProductionToolchain?.state === "founder_confirmed", "OpenAI production toolchain confirmation", "OpenAI production toolchain confirmation is missing");
check(status.claims?.openAiProductionToolchain?.tools?.join("|") === "ChatGPT|Codex|OpenAI API", "OpenAI production toolchain scope", "OpenAI production toolchain must name only the founder-confirmed tools");
check(status.claims?.gpt56Runtime?.state === "unverified", "GPT-5.6 claim remains unverified", "GPT-5.6 runtime must remain unverified until evidence is attached");
check(status.claims?.entrantEligibility?.state === "blocked_pending_official_clarification", "eligibility remains explicitly blocked", "Eligibility must not be presented as approved without written clarification");
check(status.integrations?.externalPartySearch?.state === "unavailable_fail_closed", "party search fails closed", "External party search must remain unavailable and fail closed");
check(status.integrations?.datajud?.state.includes("read_only"), "DataJud remains read-only", "DataJud must remain read-only in the competition package");
check(status.submissionArtifacts?.package8Closeout?.state === "review_executed_human_gates_pending", "Package 8 closeout prepared", "Package 8 closeout must be prepared without final submission claim");
check(status.submissionArtifacts?.judgeAccount?.state === "ready_private", "judge access ready privately", "Judge access must be ready only in the private package");
check(status.submissionArtifacts?.finalZip?.state === "ready_hashed_scanned_private", "final private ZIP ready", "Final private ZIP must be scanned, opened, and hashed");
check(status.submissionArtifacts?.demoVideo?.state === "script_ready_human_recording_pending", "video script ready with human recording pending", "Video state must distinguish the ready script from pending human recording");
check(status.submissionArtifacts?.repositoryHygiene?.state === "verified_no_tracked_tmp", "repository hygiene verified", "Repository hygiene must record the completed tracked-tmp cleanup");
check(status.strictSubmissionBlockers?.length === 4 && status.strictSubmissionBlockers.some((item) => /DataJud terms review/.test(item)), "strict blocker manifest aligned", "Strict blocker manifest must list the four current human gates, including DataJud review");

check(/<html\s+lang="en">/i.test(reviewerPage), "reviewer page language", "Reviewer page must declare English");
check(/id="live-flow"/.test(reviewerPage) && /id="evidence"/.test(reviewerPage) && /id="safety"/.test(reviewerPage), "reviewer page sections", "Reviewer page is missing live flow, evidence, or safety sections");
check(/id="mvp-scope"/.test(reviewerPage) && /data-build-week-mvp-scope/.test(reviewerPage), "reviewer MVP scope section", "Reviewer page is missing the MVP scope section");
check(/id="final-package"/.test(reviewerPage) && /data-build-week-final-package/.test(reviewerPage) && /Final delivery status/.test(reviewerPage), "reviewer final package section", "Reviewer page is missing the final delivery status");
check(/Repository hygiene/.test(reviewerPage) && /26-file legacy ZIP audit extraction/.test(reviewerPage), "reviewer repository hygiene disclosure", "Reviewer page does not record the completed repository cleanup");
check(/id="judge-test"/.test(reviewerPage) && /Verify the core flow in three minutes/.test(reviewerPage), "three-minute judge path", "Reviewer page is missing the three-minute judge path");
check(/OpenAI production toolchain/.test(reviewerPage) && /ChatGPT, Codex, and the OpenAI API/.test(reviewerPage), "truthful OpenAI toolchain disclosure", "Reviewer page is missing the approved OpenAI production-toolchain disclosure");
check(/Codex development model/.test(reviewerPage) && /gpt-5\.6-sol/.test(reviewerPage), "reviewer Codex Sol disclosure", "Reviewer page does not disclose the verified Codex development model");
check(/id="codex-sol-evidence"/.test(reviewerPage) && reviewerPage.includes(status.claims.codexGpt56SolDevelopment.evidenceFingerprintSha256), "self-contained public Codex Sol evidence", "Reviewer page must expose the sanitized Codex Sol evidence without requiring repository access");
check(/data-codex-elapsed/.test(reviewerPage) && /data-started-at="2026-07-13T18:37:59\.601-03:00"/.test(reviewerPage) && /Date\.now\(\) - startedAt/.test(reviewerPage), "live Codex elapsed-time calculation", "Reviewer page must calculate elapsed calendar time from the verified timestamp");
check(/not accumulated compute time/.test(reviewerPage) && /production runtime remains unverified/.test(reviewerPage), "elapsed-time public boundary", "Reviewer page must not present calendar elapsed time as compute usage or Charlie Echo runtime evidence");
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
check(trackedTemporaryFiles.length === 0, "no tracked temporary ZIP-audit files", `Repository still tracks ${trackedTemporaryFiles.length} temporary ZIP-audit file(s) under tmp.`);
block(!status.integrations.datajud.state.includes("legal_review_complete"), "DataJud terms review or authorization evidence is incomplete for the demonstrated use.");
block(!status.submissionArtifacts.finalZip.state.startsWith("ready_hashed_scanned"), "Final ZIP is not frozen, scanned, and hashed.");
block(status.submissionArtifacts.demoVideo.state !== "ready_public_under_3_minutes", "Public demo video under three minutes is not yet recorded and published.");

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
