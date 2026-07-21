import { dataJudReadiness } from "./datajud.js";
import { publicPdpjReadiness } from "./pdpj.js";

export const CHARLIE_GOVERNANCE_API_VERSION = "1.0.0";
export const CHARLIE_GOVERNANCE_POLICY_VERSION = "G6C3-1.0.0";

export function buildPublicCharlieGovernanceSnapshot(env, checkedAt = new Date().toISOString()) {
  const dataJud = dataJudReadiness(env);
  const pdpj = publicPdpjReadiness(env);

  return {
    ok: true,
    schemaVersion: CHARLIE_GOVERNANCE_API_VERSION,
    policyVersion: CHARLIE_GOVERNANCE_POLICY_VERSION,
    service: "jus9-tecnologia-juridica",
    release: String(env?.JUS9_RELEASE || "development").slice(0, 120),
    checkedAt,
    classification: "PUBLICO_INSTITUCIONAL_MINIMIZADO",
    principles: {
      defaultDeny: true,
      humanReviewForLegalUse: true,
      roleIsNotUniversalAuthority: true,
      externalSilenceAuthorizes: false,
      secretsExposed: false,
      autonomousJudicialEffects: false
    },
    governance: {
      state: "ACTIVE_GOVERNED",
      rbac: {
        state: "G6C2_ACTIVE_OBSERVATION",
        observationWindowHours: 72,
        observationCompletion: "REQUIRES_RUNTIME_EVIDENCE",
        legacyPermissionsRemovalRequiresHumanDecision: true,
        granularPermissionGroups: {
          memory: ["memory:read", "memory:write", "memory:delete"],
          dajReview: ["dajs:review:read", "dajs:review:submit", "dajs:review:write"],
          driveEffects: [
            "drive:artifact:create",
            "drive:artifact:save",
            "drive:link:publish",
            "drive:link:revoke",
            "drive:artifact:delete"
          ]
        }
      },
      effectConfirmation: {
        requiredForExternalOrDestructiveEffects: true,
        charlieMayApproveOwnSensitiveAction: false
      }
    },
    integrations: {
      dataJud: {
        state: dataJud.configured ? "READ_ONLY_CONFIGURED" : "READ_ONLY_NOT_CONFIGURED",
        configured: dataJud.configured,
        supportedOperation: "SEARCH_PUBLIC_METADATA_BY_CNJ_NUMBER",
        partyNameOrCpfSearch: "BLOCKED_NO_AUTHORIZED_CONNECTOR",
        transactionalEffects: false,
        humanVerificationRequired: true,
        termsVersion: dataJud.terms.version
      },
      pdpj: {
        state: "READINESS_ONLY",
        institutionalOnboardingComplete: pdpj.configured,
        tokenTestEligible: pdpj.capabilities.tokenTest,
        petitioning: false,
        proceduralNotice: false,
        mni: false
      },
      cnjInstitutionalChannel: {
        state: "AWAITING_RESPONSE",
        followUpAt: "2026-07-22T10:00:00-03:00",
        silenceAuthorizesConnection: false,
        automaticFollowUpAllowed: false
      }
    },
    blockedEffects: [
      "EXTERNAL_CONTACT_SEND",
      "JUDICIAL_SCIENCE_WRITE",
      "JUDICIAL_PETITION_WRITE",
      "JUDICIAL_MNI_EXECUTE",
      "EXTERNAL_PARTY_SEARCH_BY_NAME_OR_CPF"
    ],
    evidence: {
      authorityMatrix: "apis/MATRIZ_AUTORIDADE_FERRAMENTAS_CHARLIE_v1.0.0.json",
      capabilityRegistry: "apis/REGISTRO_CANONICO_CAPACIDADES_CHARLIE_v2.0.0.json",
      apiContract: "apis/CONTRATO_API_ESTADO_GOVERNADO_CHARLIE_v1.0.0.yaml",
      decision: "governanca/DECISAO_G6C3_API_ESTADO_GOVERNADO_CHARLIE_v1.0.0.md",
      schedule: "governanca/CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v2.0.0.md"
    }
  };
}
