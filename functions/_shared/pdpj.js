const PDPJ_DEFAULT_TIMEOUT_MS = 10_000;
const PDPJ_MAX_TOKEN_RESPONSE_BYTES = 64_000;
const PDPJ_OFFICIAL_TOKEN_URLS = Object.freeze({
  homologacao: "https://sso.stg.cloud.pje.jus.br/auth/realms/pje/protocol/openid-connect/token",
  producao: "https://sso.cloud.pje.jus.br/auth/realms/pje/protocol/openid-connect/token",
});

function isConfirmed(value) {
  return String(value || "").trim().toLowerCase() === "true";
}

function pdpjEnvironment(env) {
  const value = String(env?.PDPJ_ENVIRONMENT || "").trim().toLowerCase();
  return Object.hasOwn(PDPJ_OFFICIAL_TOKEN_URLS, value) ? value : "";
}

function institutionalChecklist(env) {
  const environment = pdpjEnvironment(env);
  const gecliRequestStatus = safeToken(env?.PDPJ_GECLI_REQUEST_STATUS || "not_started");
  const officialTokenUrl = environment ? PDPJ_OFFICIAL_TOKEN_URLS[environment] : "";
  const configuredTokenUrl = String(env?.PDPJ_TOKEN_URL || "").trim();
  return {
    responsibleConfirmed: isConfirmed(env?.PDPJ_INSTITUTIONAL_RESPONSIBLE_CONFIRMED),
    termsAccepted: isConfirmed(env?.PDPJ_TERMS_ACCEPTED),
    gecliRequestStatus,
    gecliApproved: gecliRequestStatus === "approved",
    environment,
    environmentAllowed: Boolean(environment),
    officialTokenUrl,
    tokenUrlOfficial: Boolean(officialTokenUrl && configuredTokenUrl === officialTokenUrl),
    productionAccessApproved: environment !== "producao" || isConfirmed(env?.PDPJ_PRODUCTION_ACCESS_APPROVED),
  };
}

export function missingPdpjConfig(env) {
  const checklist = institutionalChecklist(env);
  const missing = [
    ["PDPJ_TOKEN_URL", env?.PDPJ_TOKEN_URL],
    ["PDPJ_CLIENT_ID", env?.PDPJ_CLIENT_ID],
    ["PDPJ_CLIENT_SECRET", env?.PDPJ_CLIENT_SECRET]
  ].filter(([, value]) => !String(value || "").trim()).map(([name]) => name);
  if (!checklist.responsibleConfirmed) missing.push("PDPJ_INSTITUTIONAL_RESPONSIBLE_CONFIRMED=true");
  if (!checklist.termsAccepted) missing.push("PDPJ_TERMS_ACCEPTED=true");
  if (!checklist.gecliApproved) missing.push("PDPJ_GECLI_REQUEST_STATUS=approved");
  if (!checklist.environmentAllowed) missing.push("PDPJ_ENVIRONMENT=homologacao|producao");
  if (String(env?.PDPJ_TOKEN_URL || "").trim() && !checklist.tokenUrlOfficial) missing.push("PDPJ_TOKEN_URL_OFICIAL_DO_AMBIENTE");
  if (!checklist.productionAccessApproved) missing.push("PDPJ_PRODUCTION_ACCESS_APPROVED=true");
  return missing;
}

export function publicPdpjReadiness(env) {
  const missing = missingPdpjConfig(env);
  const checklist = institutionalChecklist(env);
  return {
    ok: true,
    provider: "PDPJ-Br",
    status: missing.length ? "blocked-institutional-onboarding" : "homologation-token-ready",
    configured: missing.length === 0,
    missing,
    environment: checklist.environment || "nao_configurado",
    onboarding: {
      responsibleConfirmed: checklist.responsibleConfirmed,
      termsAccepted: checklist.termsAccepted,
      gecliRequestStatus: checklist.gecliRequestStatus,
      gecliApproved: checklist.gecliApproved,
      tokenUrlOfficial: checklist.tokenUrlOfficial,
      productionAccessApproved: checklist.productionAccessApproved,
      cnpjRequiredExternally: true,
      purposeRequiredExternally: true,
      certificateRequiredForDomicilioCnpjRegistration: true,
      gecliUrl: "https://gestao-clientes.pdpj.jus.br",
    },
    capabilities: {
      oauthReadiness: true,
      tokenTest: missing.length === 0,
      mni: false,
      domicilioJudicial: false,
      petitioning: false,
      proceduralNotice: false
    },
    governance: "Somente readiness e teste OAuth2 institucional aprovado. Nenhum ato processual e executado."
  };
}

export async function testPdpjToken(env) {
  const missing = missingPdpjConfig(env);
  if (missing.length) {
    return { ok: false, status: 501, payload: { ok: false, error: "pdpj_configuracao_pendente", missing } };
  }

  const checklist = institutionalChecklist(env);
  const tokenUrl = String(env.PDPJ_TOKEN_URL).trim();
  if (!checklist.tokenUrlOfficial) return { ok: false, status: 400, payload: { ok: false, error: "pdpj_token_url_oficial_obrigatoria" } };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), pdpjTimeoutMs(env));
  try {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: String(env.PDPJ_CLIENT_ID).trim(),
      client_secret: String(env.PDPJ_CLIENT_SECRET).trim()
    });
    const requestedScope = String(env.PDPJ_SCOPE || "").trim();
    if (requestedScope) body.set("scope", requestedScope);

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: controller.signal
    });
    const data = await readBoundedTokenResponse(response);
    if (!response.ok || !data?.access_token) {
      return {
        ok: false,
        status: 502,
        payload: {
          ok: false,
          error: "pdpj_token_rejeitado",
          upstreamStatus: response.status,
          providerError: safeToken(data?.error),
          tokenExposed: false
        }
      };
    }
    return {
      ok: true,
      status: 200,
      payload: {
        ok: true,
        provider: "PDPJ-Br",
        tokenReceived: true,
        tokenExposed: false,
        tokenType: safeToken(data.token_type || "bearer"),
        expiresIn: Math.max(0, Number(data.expires_in || 0)),
        scope: safeText(data.scope || requestedScope, 300),
        testedAt: new Date().toISOString(),
        transactionalCapabilitiesEnabled: false
      }
    };
  } catch (error) {
    return {
      ok: false,
      status: error?.name === "AbortError" ? 504 : 502,
      payload: { ok: false, error: error?.name === "AbortError" ? "pdpj_token_timeout" : "pdpj_token_falha", tokenExposed: false }
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function readBoundedTokenResponse(response) {
  const declaredLength = Number(response.headers.get("Content-Length"));
  if (Number.isFinite(declaredLength) && declaredLength > PDPJ_MAX_TOKEN_RESPONSE_BYTES) {
    throw namedError("PdpjResponseTooLargeError", "pdpj token response exceeds declared limit");
  }
  const reader = response.body?.getReader();
  if (!reader) return {};
  const chunks = [];
  let totalBytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > PDPJ_MAX_TOKEN_RESPONSE_BYTES) {
      await reader.cancel().catch(() => null);
      throw namedError("PdpjResponseTooLargeError", "pdpj token response exceeds streamed limit");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return {};
  }
}

function namedError(name, message) {
  const error = new Error(message);
  error.name = name;
  return error;
}

function pdpjTimeoutMs(env) {
  const value = Number(env?.PDPJ_TIMEOUT_MS);
  return Number.isFinite(value) ? Math.max(3_000, Math.min(value, 30_000)) : PDPJ_DEFAULT_TIMEOUT_MS;
}

function safeToken(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9._:-]/g, "").slice(0, 120);
}

function safeText(value, maxLength) {
  return String(value || "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
}
