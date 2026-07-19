export const CHARLIE_CORE_VERSION = "0.1.0";

const COMMON_LIMITS = Object.freeze([
  "human_review_required",
  "no_real_data_in_public_demo",
  "no_autonomous_legal_effect",
  "no_secret_or_credential_disclosure"
]);

function mvp(definition) {
  return Object.freeze({
    ...definition,
    aliases: Object.freeze(definition.aliases || []),
    profiles: Object.freeze(definition.profiles || []),
    limits: Object.freeze([...COMMON_LIMITS, ...(definition.limits || [])])
  });
}

export const CHARLIE_MVP_REGISTRY = Object.freeze({
  DAJ: mvp({ name: "Advogados", state: "ATIVO_PUBLICADO", defaultRisk: "high", humanRole: "advogado_lider", profiles: ["admin_sistema", "advogado_lider", "advogado", "assessor_chefe", "assessor", "secretaria", "estagio", "escritorio"], limits: ["official_daj_source_required", "one_daj_one_process", "pii_minimization_required"] }),
  DAA: mvp({ name: "Professor e Academia", state: "DEMONSTRATIVO_PUBLICADO", defaultRisk: "normal", humanRole: "professor", profiles: ["admin_sistema", "academia"], limits: ["no_academic_fraud"] }),
  DEJ: mvp({ name: "Estudante", state: "DEMONSTRATIVO_PUBLICADO", defaultRisk: "normal", humanRole: "professor", profiles: ["admin_sistema", "estudante", "academia"], limits: ["no_academic_fraud"] }),
  DIC: mvp({ name: "Social e Cidadao", state: "DEMONSTRATIVO_PUBLICADO", defaultRisk: "high", humanRole: "atendente_humano", profiles: ["admin_sistema", "cidadao"], limits: ["anti_pii", "social_language_preserved", "emergency_handoff_required"] }),
  DPJ: mvp({ name: "Perito Judicial", state: "DEMONSTRATIVO_PUBLICADO", defaultRisk: "high", humanRole: "perito", profiles: ["admin_sistema", "perito"], limits: ["no_police_authority", "human_signature_required"] }),
  DIP: mvp({ name: "Investidor e Parceiro", state: "DEMONSTRATIVO_PUBLICADO", defaultRisk: "normal", humanRole: "gestor_governanca", aliases: ["INV"], profiles: ["admin_sistema", "parceiro"], limits: ["sanitized_due_diligence_only"] }),
  DEE: mvp({ name: "Escritorio Juridico", state: "DEMONSTRATIVO_PUBLICADO", defaultRisk: "high", humanRole: "advogado_lider", profiles: ["admin_sistema", "escritorio", "advogado_lider", "advogado", "assessor_chefe", "assessor", "secretaria", "estagio"], limits: ["tenant_and_case_ownership_required"] }),
  DEJI: mvp({ name: "Empresa e Juridico Interno", state: "DEMONSTRATIVO_PUBLICADO", defaultRisk: "high", humanRole: "juridico_interno", profiles: ["admin_sistema", "empresa"], limits: ["compliance_review_required"] }),
  DOI: mvp({ name: "Orgao Publico e Instituicao", state: "DEMONSTRATIVO_PUBLICADO", defaultRisk: "critical", humanRole: "autoridade_institucional", aliases: ["ORG"], profiles: ["admin_sistema", "orgao_publico"], limits: ["no_official_act", "approved_project_required"] }),
  DGE: mvp({ name: "Governanca do Ecossistema", state: "DEMONSTRATIVO_PUBLICADO", defaultRisk: "high", humanRole: "admin_sistema", profiles: ["admin_sistema"], limits: ["admin_does_not_override_vault"] }),
  DMG: mvp({ name: "Magistratura", state: "DEMONSTRATIVO_PUBLICADO", defaultRisk: "critical", humanRole: "magistrado", profiles: ["admin_sistema", "magistrado", "assessor_chefe", "assessor", "secretaria", "estagio"], limits: ["no_judicial_decision", "no_official_act"] }),
  DMP: mvp({ name: "Ministerio Publico", state: "DEMONSTRATIVO_PUBLICADO", defaultRisk: "critical", humanRole: "ministerio_publico", profiles: ["admin_sistema", "ministerio_publico", "assessor_chefe", "assessor", "secretaria", "estagio"], limits: ["no_prosecutorial_act", "no_official_act"] }),
  DAP: mvp({ name: "Autoridade Policial", state: "DEMONSTRATIVO_PUBLICADO", defaultRisk: "critical", humanRole: "autoridade_policial", profiles: ["admin_sistema", "autoridade_policial", "assessor", "secretaria", "estagio"], limits: ["no_real_investigation", "no_official_act"] }),
  DED: mvp({ name: "Autor e Editor", state: "DEMONSTRATIVO_PUBLICADO", defaultRisk: "normal", humanRole: "autor_editor", profiles: ["admin_sistema", "autor_editor"], limits: ["authorship_and_rights_review", "no_automatic_publication"] })
});

export function normalizeCharlieMvpCode(value) {
  const code = String(value || "").trim().toUpperCase();
  if (CHARLIE_MVP_REGISTRY[code]) return code;
  for (const [canonical, definition] of Object.entries(CHARLIE_MVP_REGISTRY)) {
    if (definition.aliases.includes(code)) return canonical;
  }
  return "";
}

export function getCharlieMvp(value) {
  const code = normalizeCharlieMvpCode(value);
  return code ? CHARLIE_MVP_REGISTRY[code] : null;
}

export function buildProfileDirectoryModules() {
  return Object.freeze(Object.fromEntries(
    Object.entries(CHARLIE_MVP_REGISTRY).map(([code, definition]) => [code, definition.profiles])
  ));
}

export function getCharlieMvpRegistrySummary() {
  const entries = Object.entries(CHARLIE_MVP_REGISTRY);
  return Object.freeze({
    version: CHARLIE_CORE_VERSION,
    mvps: entries.length,
    active: entries.filter(([, item]) => item.state === "ATIVO_PUBLICADO").map(([code]) => code),
    demonstrative: entries.filter(([, item]) => item.state === "DEMONSTRATIVO_PUBLICADO").map(([code]) => code),
    aliases: Object.freeze({ INV: "DIP", ORG: "DOI" })
  });
}
