import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const assertIncludes = (text, patterns, label) => {
  for (const pattern of patterns) assert(text.includes(pattern), `${label} sem ${pattern}`);
};

const pipeline = read("functions/lib/charlie-core/response-pipeline.js");
const contracts = read("functions/lib/charlie-core/contracts.js");
const worker = read("worker.js");
const frontend = read("script.js");

assertIncludes(pipeline, [
  "buildCharlieResponseGovernance",
  "buildCharlieResponseAuditEvent",
  "citationStatus",
  "humanReviewRequired",
  "blockedAutonomousEffects",
  "limitsCount",
  "durationMs"
], "pipeline Charlie");
assert(contracts.includes('CONTRACT_VERSION = "1.2.0"'), "contrato Charlie deveria estar em 1.2.0");
assertIncludes(worker, [
  "logCharlieGovernanceEvent",
  "validateAuditEvent(event)",
  '"X-Jus9-Charlie-Classification"',
  '"X-Jus9-Charlie-Risk-Level"',
  '"X-Jus9-Charlie-Human-Review"',
  '"X-Jus9-Charlie-Citation-Status"',
  '"X-Jus9-Charlie-Limits"',
  "upstream_streamed",
  "daj_fallback_governado"
], "Worker Charlie");
assertIncludes(worker, ["readResponseTextBounded", "CHARLIE_DAJ_UPSTREAM_MAX_BODY_BYTES", "upstream_resposta_muito_grande"], "limite de resposta DAJ");
assert(!worker.includes("const upstreamText = await upstream.text()"), "rota DAJ nao deve ler resposta upstream sem limite");
assertIncludes(frontend, [
  "charlieGovernanceRequest",
  "governedClassification",
  "governedRisk",
  "revisao humana obrigatoria",
  "efeitos autonomos bloqueados"
], "frontend Charlie");
assert(!pipeline.includes("input.message,"), "evento de auditoria nao deve persistir mensagem");
assert(!pipeline.includes("answer:"), "evento de auditoria nao deve persistir resposta");
assert(!pipeline.includes("emailHash") && !pipeline.includes("cpf") && !pipeline.includes("processNumber"), "pipeline nao deve registrar identificadores pessoais/processuais");

console.log("CHARLIE_RESPONSE_PIPELINE_OK contract=1.2.0 audit=minimized sources=3");
