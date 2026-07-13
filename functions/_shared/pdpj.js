const PDPJ_DEFAULT_TIMEOUT_MS = 10_000;

export function missingPdpjConfig(env) {
  return [
    ["PDPJ_TOKEN_URL", env?.PDPJ_TOKEN_URL],
    ["PDPJ_CLIENT_ID", env?.PDPJ_CLIENT_ID],
    ["PDPJ_CLIENT_SECRET", env?.PDPJ_CLIENT_SECRET]
  ].filter(([, value]) => !String(value || "").trim()).map(([name]) => name);
}

export function publicPdpjReadiness(env) {
  const missing = missingPdpjConfig(env);
  return {
    ok: true,
    provider: "PDPJ-Br",
    status: missing.length ? "missing-credentials" : "configured",
    configured: missing.length === 0,
    missing,
    environment: safeToken(env?.PDPJ_ENVIRONMENT || "nao_configurado"),
    capabilities: {
      oauthReadiness: true,
      tokenTest: true,
      mni: false,
      domicilioJudicial: false,
      petitioning: false,
      proceduralNotice: false
    },
    governance: "Somente readiness e teste OAuth2. Nenhum ato processual e executado."
  };
}

export async function testPdpjToken(env) {
  const missing = missingPdpjConfig(env);
  if (missing.length) {
    return { ok: false, status: 501, payload: { ok: false, error: "pdpj_configuracao_pendente", missing } };
  }

  const tokenUrl = String(env.PDPJ_TOKEN_URL).trim();
  if (!/^https:\/\//i.test(tokenUrl)) {
    return { ok: false, status: 400, payload: { ok: false, error: "pdpj_token_url_https_obrigatoria" } };
  }

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
    const data = await response.json().catch(() => ({}));
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
