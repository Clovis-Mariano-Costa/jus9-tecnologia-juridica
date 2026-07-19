import { CHARLIE_CLASSIFICATIONS, CHARLIE_RISK_LEVELS } from "./policies.js";
import { normalizeCharlieMvpCode } from "./registry.js";

const CONTRACT_VERSION = "1.0.0";
const DOCUMENT_ACTIONS = Object.freeze(["create", "save", "export", "revoke_public_link", "delete_test"]);
const DATAJUD_SEARCH_TYPES = Object.freeze(["numeroProcesso"]);

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function controlledString(value, maxLength) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

function isStringArray(value, maxItems = 20) {
  return Array.isArray(value) && value.length <= maxItems && value.every((item) => controlledString(item, 2_000));
}

function result(type, errors) {
  return Object.freeze({ ok: errors.length === 0, type, version: CONTRACT_VERSION, errors: Object.freeze(errors) });
}

export function validateChatRequest(value) {
  const errors = [];
  if (!isPlainObject(value)) return result("ChatRequest", ["object_required"]);
  if (!controlledString(value.message, 20_000)) errors.push("message_invalid");
  if (!normalizeCharlieMvpCode(value.mvpCode)) errors.push("mvpCode_invalid");
  if (value.mode != null && !controlledString(value.mode, 40)) errors.push("mode_invalid");
  if (value.classification != null && !CHARLIE_CLASSIFICATIONS.includes(value.classification)) errors.push("classification_invalid");
  if (value.riskLevel != null && !CHARLIE_RISK_LEVELS.includes(value.riskLevel)) errors.push("riskLevel_invalid");
  return result("ChatRequest", errors);
}

export function validateChatResponse(value) {
  const errors = [];
  if (!isPlainObject(value)) return result("ChatResponse", ["object_required"]);
  if (!controlledString(value.auditId, 160)) errors.push("auditId_invalid");
  if (!controlledString(value.answer, 100_000)) errors.push("answer_invalid");
  if (!CHARLIE_CLASSIFICATIONS.includes(value.classification)) errors.push("classification_invalid");
  if (!CHARLIE_RISK_LEVELS.includes(value.riskLevel)) errors.push("riskLevel_invalid");
  if (!isStringArray(value.citations || [])) errors.push("citations_invalid");
  if (!isStringArray(value.downloadOptions || [], 10)) errors.push("downloadOptions_invalid");
  if (!isStringArray(value.nextActions || [], 20)) errors.push("nextActions_invalid");
  return result("ChatResponse", errors);
}

export function validateDocumentSaveRequest(value) {
  const errors = [];
  if (!isPlainObject(value)) return result("DocumentSaveRequest", ["object_required"]);
  if (!DOCUMENT_ACTIONS.includes(value.action)) errors.push("action_invalid");
  if (!controlledString(value.auditId, 160)) errors.push("auditId_invalid");
  if (!CHARLIE_CLASSIFICATIONS.includes(value.classification)) errors.push("classification_invalid");
  if (value.title != null && !controlledString(value.title, 240)) errors.push("title_invalid");
  if (value.publicLinkRequested === true && !["PUBLICO", "PUBLICO_DEMONSTRATIVO"].includes(value.classification)) errors.push("public_link_forbidden_for_classification");
  return result("DocumentSaveRequest", errors);
}

export function validateDataJudSearchRequest(value) {
  const errors = [];
  if (!isPlainObject(value)) return result("DataJudSearchRequest", ["object_required"]);
  if (!DATAJUD_SEARCH_TYPES.includes(value.searchType)) errors.push("searchType_must_be_numeroProcesso");
  if (!/^\d{20}$/.test(String(value.numeroProcesso || "").replace(/\D/g, ""))) errors.push("numeroProcesso_invalid");
  if (value.readOnly !== true) errors.push("readOnly_required");
  return result("DataJudSearchRequest", errors);
}

export function validateAuditEvent(value) {
  const errors = [];
  if (!isPlainObject(value)) return result("AuditEvent", ["object_required"]);
  for (const field of ["auditId", "eventType", "occurredAt", "actor", "result", "classification"]) {
    if (!controlledString(value[field], field === "actor" ? 240 : 160)) errors.push(`${field}_invalid`);
  }
  if (value.classification != null && !CHARLIE_CLASSIFICATIONS.includes(value.classification)) errors.push("classification_not_controlled");
  if (/(senha|password|token|api[_-]?key|client[_-]?secret)/i.test(JSON.stringify(value.details || {}))) errors.push("secret_like_field_forbidden");
  return result("AuditEvent", errors);
}

export const CHARLIE_CONTRACTS = Object.freeze({
  version: CONTRACT_VERSION,
  types: Object.freeze(["ChatRequest", "ChatResponse", "DocumentSaveRequest", "DataJudSearchRequest", "AuditEvent"]),
  controlledFields: Object.freeze(["auditId", "classification", "riskLevel", "citations", "downloadOptions", "nextActions"])
});
