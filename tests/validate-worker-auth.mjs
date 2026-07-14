import worker from "../worker.js";
import {
  getAuthNucleusFromReturnTo,
  missingGoogleConfig,
  normalizeAuthReturnTo,
  resolveGoogleAuthProfile,
  signPayload,
  verifyPayload
} from "../functions/_shared/oauth.js";

const env = {
  AUTH_COOKIE_SECRET: "segredo-local-ficticio-comprido-para-homologacao",
  ASSETS: { fetch: async () => new Response("asset", { status: 200 }) },
};
const memoryKv = () => {
  const store = new Map();
  return {
    _store: store,
    get: async (key, type) => {
      const value = store.get(key) || null;
      if (type === "json" && value) return JSON.parse(value);
      return value;
    },
    put: async (key, value) => {
      store.set(key, value);
    },
    delete: async (key) => {
      store.delete(key);
    }
  };
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function request(path, options = {}) {
  return worker.fetch(new Request(`https://jus9.invalid${path}`, options), env);
}

async function cookieFor(profile, expiresAt = Date.now() + 60_000, email = "", accessMode = "legacy", authNucleus = "principal") {
  const value = await signPayload({
    kind: "jus9_session",
    provider: "controlled-test",
    emailHash: email ? await signPayloadHash(email) : `hash-${profile}`,
    googleSubHash: email ? await signPayloadHash(`sub:${email}`) : `google-sub-${profile}`,
    profile,
    accessMode,
    authNucleus,
    issuedAt: Date.now(),
    expiresAt,
  }, env);
  return `jus9_session=${encodeURIComponent(value)}`;
}

async function signPayloadHash(email) {
  const bytes = new TextEncoder().encode(String(email).toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

let response = await request("/api/health");
let data = await response.json();
assert(response.status === 200 && data.service === "jus9-tecnologia-juridica", "health explicito deveria responder");
assert(data.status === "degraded" && data.checks?.assets?.configured === true, "health local deveria informar readiness parcial");
assert(data.checks?.charlieApiProxy?.configured === true && data.checks.charlieApiProxy.privilegedDriveConfigured === false, "health deveria expor proxy Charlie sem segredo local");
console.log("AUTH_OK health=200");

response = await request("/api/auth/permissions");
assert(response.status === 401, "permissoes anonimas devem retornar 401");
console.log("AUTH_OK anonymous=401");

response = await request("/api/auth/permissions", { headers: { cookie: await cookieFor("advogado") } });
data = await response.json();
assert(response.status === 200 && data.permissions.includes("dajs:write"), "advogado sem dajs:write");
assert(data.permissions.includes("drive:write"), "advogado sem drive:write governado");
console.log("AUTH_OK advogado=dajs:write");

response = await request("/api/auth/permissions", { headers: { cookie: await cookieFor("empresa") } });
data = await response.json();
assert(response.status === 200 && data.permissions.includes("documents:read"), "empresa sem documents:read");
assert(!data.permissions.includes("dajs:write"), "empresa nao deve possuir dajs:write");
console.log("AUTH_OK empresa=documents:read");

response = await request("/api/auth/permissions", {
  headers: { cookie: await cookieFor("cidadao", Date.now() + 60_000, "publico@example.invalid", "public_google", "mvp") }
});
data = await response.json();
assert(response.status === 200 && data.permissions.includes("auth:read"), "cidadao deveria ter auth:read");
assert(!data.permissions.includes("calendar:write"), "cidadao nao deve possuir calendar:write");
assert(!data.permissions.includes("drive:write"), "cidadao publico nao deve possuir drive:write");
assert(data.accessMode === "public_google" && data.authNucleus === "mvp", "sessao publica deveria preservar modo e nucleo");
console.log("AUTH_OK public-google-cidadao=governado");

const originalCharlieProxyFetch = globalThis.fetch;
let proxyAuthorization = "";
globalThis.fetch = async (url, options = {}) => {
  assert(String(url) === "https://charlieecho.jus9tecnologia.com.br/api/ia", "proxy Charlie chamou destino inesperado");
  proxyAuthorization = new Headers(options.headers).get("authorization") || "";
  return Response.json({ ok: true, answer: "Resposta ficticia da Charlie" });
};
try {
  response = await worker.fetch(new Request("https://jus9.invalid/api/charlie/respond", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: "O que e peticao?", mode: "profissional" })
  }), { ...env, JUS9_CHARLIE_INTERNAL_TOKEN: "token-interno-ficticio" });
  data = await response.json();
  assert(response.status === 200 && data.answer === "Resposta ficticia da Charlie", "proxy Charlie anonimo deveria responder");
  assert(proxyAuthorization === "", "proxy anonimo nao deve autorizar escrita no Drive");
  assert(response.headers.get("x-jus9-charlie-drive") === "somente-resposta", "proxy anonimo deveria declarar somente resposta");
  console.log("AUTH_OK charlie-proxy-anonymous=answer-only");

  response = await worker.fetch(new Request("https://jus9.invalid/api/charlie/respond", {
    method: "POST",
    headers: {
      cookie: await cookieFor("advogado"),
      "content-type": "application/json"
    },
    body: JSON.stringify({ message: "Salve uma minuta ficticia no Drive", mode: "profissional" })
  }), { ...env, JUS9_CHARLIE_INTERNAL_TOKEN: "token-interno-ficticio" });
  assert(response.status === 200, "proxy Charlie autenticado deveria responder");
  assert(proxyAuthorization === "Bearer token-interno-ficticio", "proxy advogado deveria autorizar Drive com segredo interno");
  assert(response.headers.get("x-jus9-charlie-drive") === "governado", "proxy advogado deveria declarar Drive governado");
  console.log("AUTH_OK charlie-proxy-advogado=drive-governado");
} finally {
  globalThis.fetch = originalCharlieProxyFetch;
}

response = await request("/api/auth/permissions", { headers: { cookie: await cookieFor("admin_sistema") } });
data = await response.json();
assert(response.status === 200 && data.permissions.includes("audit:write"), "admin sem audit:write");
console.log("AUTH_OK admin=audit:write");

response = await request("/api/auth/me", { headers: { cookie: await cookieFor("advogado", Date.now() - 1) } });
assert(response.status === 401, "sessao expirada deve retornar 401");
console.log("AUTH_OK expired=401");

response = await request("/auth/google/start");
assert(response.status === 501, "OAuth sem configuracao deve retornar 501");
console.log("AUTH_OK oauth-pendente=501");

const configuredEnv = {
  ...env,
  PUBLIC_SITE_ORIGIN: "https://jus9.invalid",
  GOOGLE_CLIENT_ID: "client-id-ficticio",
  GOOGLE_CLIENT_SECRET: "client-secret-ficticio",
  AUTH_ALLOWED_EMAILS: "demo.invalid@jus9.invalid:admin_sistema",
};

const publicGoogleEnv = {
  ...env,
  PUBLIC_SITE_ORIGIN: "https://jus9.invalid",
  GOOGLE_CLIENT_ID: "client-id-ficticio",
  GOOGLE_CLIENT_SECRET: "client-secret-ficticio",
  AUTH_PUBLIC_GOOGLE_ENABLED: "true",
  AUTH_PUBLIC_GOOGLE_PROFILE: "cidadao"
};
assert(missingGoogleConfig(publicGoogleEnv).length === 0, "OAuth publico nao deve exigir AUTH_ALLOWED_EMAILS");
const publicProfile = resolveGoogleAuthProfile("externo@example.invalid", publicGoogleEnv);
assert(publicProfile?.profile === "cidadao" && publicProfile?.accessMode === "public_google", "conta publica deveria virar cidadao");
const unsafePublicProfile = resolveGoogleAuthProfile("externo@example.invalid", {
  ...publicGoogleEnv,
  AUTH_PUBLIC_GOOGLE_PROFILE: "admin_sistema"
});
assert(unsafePublicProfile?.profile === "cidadao", "perfil publico privilegiado deveria cair para cidadao");
const allowlistProfile = resolveGoogleAuthProfile("demo.invalid@jus9.invalid", {
  ...publicGoogleEnv,
  AUTH_ALLOWED_EMAILS: "demo.invalid@jus9.invalid:admin_sistema"
});
assert(allowlistProfile?.profile === "admin_sistema" && allowlistProfile?.accessMode === "allowlist", "allowlist deve prevalecer sobre acesso publico");
console.log("AUTH_OK public-google-config=cidadao");

response = await worker.fetch(
  new Request("https://jus9.invalid/auth/google/start?return_to=%2Fapp-ia-profissional.html%23chat-ia"),
  configuredEnv
);
assert(response.status === 302, "OAuth configurado deve redirecionar para Google");
assert(response.headers.get("location")?.startsWith("https://accounts.google.com/"), "OAuth deve ir para Google");
const txCookie = response.headers.get("set-cookie")?.match(/jus9_oauth_tx=([^;]+)/)?.[1];
const txPayload = await verifyPayload(decodeURIComponent(txCookie || ""), configuredEnv);
assert(txPayload?.returnTo === "/app-ia-profissional.html#chat-ia", "return_to valido nao foi preservado");
console.log("AUTH_OK return_to=modulo");

response = await worker.fetch(
  new Request("https://jus9.invalid/auth/google/start?return_to=https%3A%2F%2Fevil.example%2Fcaptura"),
  configuredEnv
);
const unsafeCookie = response.headers.get("set-cookie")?.match(/jus9_oauth_tx=([^;]+)/)?.[1];
const unsafeTxPayload = await verifyPayload(decodeURIComponent(unsafeCookie || ""), configuredEnv);
assert(unsafeTxPayload?.returnTo === "", "return_to externo deve ser descartado");
console.log("AUTH_OK return_to_externo=bloqueado");

response = await worker.fetch(
  new Request("https://jus9.invalid/auth/google/start?return_to=https%3A%2F%2Fequipe.jus9tecnologia.com.br%2F"),
  publicGoogleEnv
);
assert(response.status === 302, "OAuth publico configurado deve redirecionar para Google");
const publicTxCookie = response.headers.get("set-cookie")?.match(/jus9_oauth_tx=([^;]+)/)?.[1];
const publicTxPayload = await verifyPayload(decodeURIComponent(publicTxCookie || ""), publicGoogleEnv);
assert(publicTxPayload?.returnTo === "https://equipe.jus9tecnologia.com.br/", "return_to absoluto autorizado deveria ser preservado");
console.log("AUTH_OK public-google-start=302");

assert(normalizeAuthReturnTo("/app-demo-advogar.html?origem=mvp#chat") === "/app-demo-advogar.html?origem=mvp#chat", "rota app-demo deveria ser aceita");
assert(
  normalizeAuthReturnTo("https://equipe.jus9tecnologia.com.br/") === "https://equipe.jus9tecnologia.com.br/",
  "subdominio Equipe deveria ser aceito"
);
assert(
  normalizeAuthReturnTo("https://universidadedofuturo.jus9tecnologia.com.br/skill.md") === "https://universidadedofuturo.jus9tecnologia.com.br/skill.md",
  "skill.md da Universidade deveria ser aceito"
);
assert(normalizeAuthReturnTo("/app-chat-charlie-echo.html") === "/app-chat-charlie-echo.html", "chat dedicado da Charlie deveria ser aceito");
assert(normalizeAuthReturnTo("//evil.example") === "", "protocolo relativo externo deveria ser bloqueado");
assert(normalizeAuthReturnTo("https://equipe.evil.example/") === "", "dominio externo deveria ser bloqueado");
assert(normalizeAuthReturnTo("https://naoautorizado.jus9tecnologia.com.br/") === "", "subdominio nao autorizado deveria ser bloqueado");
assert(normalizeAuthReturnTo("/../app.html") === "", "path traversal deveria ser bloqueado");
assert(getAuthNucleusFromReturnTo("https://equipe.jus9tecnologia.com.br/") === "equipe", "nucleo Equipe deveria ser reconhecido");
assert(getAuthNucleusFromReturnTo("/mvp.html") === "mvp", "nucleo MVP deveria ser reconhecido");
assert(getAuthNucleusFromReturnTo("/app-agenda.html") === "agenda", "nucleo Agenda deveria ser reconhecido");
assert(getAuthNucleusFromReturnTo("/app-chat-charlie-echo.html") === "ia_profissional", "nucleo IA deveria ser reconhecido");
console.log("AUTH_OK return_to_allowlist");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/auth/me", {
    method: "OPTIONS",
    headers: { origin: "https://equipe.jus9tecnologia.com.br" }
  }),
  configuredEnv
);
assert(response.status === 204, "preflight CORS deveria retornar 204");
assert(response.headers.get("access-control-allow-origin") === "https://equipe.jus9tecnologia.com.br", "origem CORS autorizada ausente");
console.log("AUTH_OK cors_subdominio");

const identityEnv = {
  ...configuredEnv,
  AUTH_ALLOWED_EMAILS: "clovis@jus9tecnologia.com.br:admin_sistema,charliejuris@jus9tecnologia.com.br:admin_sistema"
};

response = await worker.fetch(
  new Request("https://jus9.invalid/api/auth/context?module=DAJ&origin=https%3A%2F%2Fequipe.jus9tecnologia.com.br%2F", {
    headers: { cookie: await cookieFor("admin_sistema", Date.now() + 60_000, "clovis@jus9tecnologia.com.br") }
  }),
  identityEnv
);
data = await response.json();
assert(response.status === 200 && data.identity?.user?.founder === true, "contexto deveria reconhecer fundador humano");
assert(data.identity?.origin?.host === "equipe.jus9tecnologia.com.br", "contexto deveria reconhecer origem Equipe");
assert(data.identity?.module?.code === "DAJ", "contexto deveria reconhecer modulo DAJ");
console.log("AUTH_OK context=founder_module_origin");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/auth/context?module=DGE", {
    headers: { cookie: await cookieFor("admin_sistema", Date.now() + 60_000, "charliejuris@jus9tecnologia.com.br") }
  }),
  identityEnv
);
data = await response.json();
assert(response.status === 200 && data.identity?.user?.family === "familia_virtual", "contexto deveria reconhecer Familia Virtual");
console.log("AUTH_OK context=familia_virtual");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/auth/context?module=DED", {
    headers: { cookie: await cookieFor("admin_sistema", Date.now() + 60_000, "clovis@jus9tecnologia.com.br") }
  }),
  identityEnv
);
data = await response.json();
assert(response.status === 200 && data.identity?.module?.code === "DED", "contexto deveria reconhecer modulo DED");
assert(/Autor \/ Editor/.test(data.identity?.module?.label || ""), "contexto DED deveria ter rotulo editorial");
console.log("AUTH_OK context=ded");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/charlie/memory"),
  identityEnv
);
assert(response.status === 401, "memoria oficial sem sessao deve retornar 401");
console.log("AUTH_OK user-memory-anonymous=401");

const userMemoryEnv = {
  ...identityEnv,
  JUS9_USER_MEMORY: memoryKv()
};
const userMemoryCookie = await cookieFor("admin_sistema", Date.now() + 60_000, "clovis@jus9tecnologia.com.br");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/charlie/memory?module=DAJ", {
    headers: { cookie: userMemoryCookie }
  }),
  userMemoryEnv
);
data = await response.json();
assert(response.status === 200 && data.configured === true && data.exists === false, "memoria oficial inicial deveria estar vazia e configurada");
assert(typeof data.ownerKey === "string" && data.ownerKey.length > 12, "memoria oficial deveria expor chave opaca do usuario");
console.log("AUTH_OK user-memory-empty=200");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/charlie/memory", {
    method: "POST",
    headers: {
      cookie: userMemoryCookie,
      "content-type": "application/json",
      origin: "https://jus9tecnologia.com.br"
    },
    body: JSON.stringify({
      module: "DAJ",
      focus: "teste governado",
      userMemory: {
        enabled: true,
        syncDrive: true,
        name: "Clovis",
        role: "fundador",
        preferences: "respostas diretas",
        avoid: "<script>protocolo repetitivo</script>",
        standingInstructions: "priorizar DAJ"
      },
      instrument: {
        enabled: true,
        name: "DAJ Advogados",
        role: "modelo-mae",
        autonomy: "proativa",
        drive: "auto_governado",
        response: "relatorio_e_acao",
        sources: "oficiais_academicas",
        notes: "usar BDTD quando academico"
      }
    })
  }),
  userMemoryEnv
);
data = await response.json();
assert(response.status === 200 && data.exists === true && data.userMemory?.name === "Clovis", "memoria oficial deveria salvar memoria do usuario");
assert(data.userMemory.avoid === "scriptprotocolo repetitivo/script", "memoria oficial deveria remover tags perigosas sem executar HTML");
assert(data.userMemory.retentionDays === 365 && data.retention?.automaticDeletion === false, "memoria oficial deveria agendar revisao sem exclusao automatica");
assert(typeof data.retention?.reviewAt === "string" && data.retention.reviewAt.length > 10, "memoria oficial deveria registrar data de revisao");
assert(data.instruments?.DAJ?.drive === "auto_governado", "memoria oficial deveria salvar instrumento DAJ");
console.log("AUTH_OK user-memory-save=200");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/charlie/memory?module=DAJ", {
    headers: { cookie: userMemoryCookie }
  }),
  userMemoryEnv
);
data = await response.json();
assert(response.status === 200 && data.exists === true && data.userMemory?.role === "fundador", "memoria oficial deveria ser relida por login");
console.log("AUTH_OK user-memory-read=200");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/charlie/memory", {
    method: "DELETE",
    headers: { cookie: userMemoryCookie }
  }),
  userMemoryEnv
);
data = await response.json();
assert(response.status === 200 && data.deleted === true, "memoria oficial deveria ser removida por login");
console.log("AUTH_OK user-memory-delete=200");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/charlie/memory?module=DAJ", {
    headers: { cookie: userMemoryCookie }
  }),
  userMemoryEnv
);
data = await response.json();
assert(response.status === 200 && data.exists === false, "memoria oficial deveria sumir apos delete");
console.log("AUTH_OK user-memory-after-delete=200");

response = await request("/auth/google/calendar/start");
assert(response.status === 403, "Agenda desligada deve bloquear consentimento sensivel");
console.log("AUTH_OK calendar-disabled=403");

response = await worker.fetch(
  new Request("https://jus9.invalid/auth/google/calendar/start"),
  { ...configuredEnv, GOOGLE_CALENDAR_OAUTH_ENABLED: "true" }
);
assert(response.status === 501, "Agenda ligada sem KV deve retornar configuracao pendente");
console.log("AUTH_OK calendar-kv-pendente=501");

const calendarEnv = {
  ...configuredEnv,
  JUS9_CALENDAR_TOKENS: memoryKv(),
  JUS9_PROFILE_REQUESTS: memoryKv()
};

response = await worker.fetch(
  new Request("https://jus9.invalid/api/calendar/status", {
    headers: { cookie: await cookieFor("admin_sistema") }
  }),
  calendarEnv
);
data = await response.json();
assert(response.status === 200 && data.calendar?.enabled === false, "Agenda desligada deve informar status preparado");
console.log("AUTH_OK calendar-status-disabled=200");

const calendarEnabledEnv = {
  ...calendarEnv,
  GOOGLE_CALENDAR_OAUTH_ENABLED: "true"
};

response = await worker.fetch(
  new Request("https://jus9.invalid/api/profile-requests", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Pessoa Teste", email: "pessoa@jus9tecnologia.com.br", profile: "Assessor" })
  }),
  calendarEnv
);
assert(response.status === 401, "cadastro de perfil sem sessao deve retornar 401");
console.log("AUTH_OK profile-request-anonymous=401");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/profile-requests", {
    method: "POST",
    headers: {
      cookie: await cookieFor("assessor", Date.now() + 60_000, "assessor@jus9tecnologia.com.br"),
      "content-type": "application/json",
      origin: "https://equipe.jus9tecnologia.com.br"
    },
    body: JSON.stringify({
      scope: "equipe",
      name: "Pessoa Teste <script>",
      email: "Pessoa@Jus9Tecnologia.com.br",
      profile: "Assessor",
      module: "Equipe",
      notes: "Solicitacao governada"
    })
  }),
  calendarEnv
);
data = await response.json();
assert(response.status === 201 && data.ok === true && data.status === "pendente_revisao_humana", "cadastro de perfil autenticado deveria registrar solicitacao");
const profileRequestId = data.id;
console.log("AUTH_OK profile-request-create=201");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/profile-requests/action", {
    method: "POST",
    headers: {
      cookie: await cookieFor("assessor", Date.now() + 60_000, "assessor@jus9tecnologia.com.br"),
      "content-type": "application/json"
    },
    body: JSON.stringify({ id: profileRequestId, action: "aprovar" })
  }),
  calendarEnv
);
assert(response.status === 403, "assessor nao deve alterar status de solicitacao de perfil");
console.log("AUTH_OK profile-request-action-assessor=403");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/profile-requests/audit"),
  calendarEnv
);
assert(response.status === 401, "auditoria de perfis sem sessao deve retornar 401");
console.log("AUTH_OK profile-request-audit-anonymous=401");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/profile-requests/audit", {
    headers: { cookie: await cookieFor("assessor", Date.now() + 60_000, "assessor@jus9tecnologia.com.br") }
  }),
  calendarEnv
);
assert(response.status === 403, "assessor nao deve listar auditoria de perfis");
console.log("AUTH_OK profile-request-audit-assessor=403");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/governed-profiles"),
  calendarEnv
);
assert(response.status === 401, "perfis governados sem sessao devem retornar 401");
console.log("AUTH_OK governed-profiles-anonymous=401");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/governed-profiles", {
    headers: { cookie: await cookieFor("assessor", Date.now() + 60_000, "assessor@jus9tecnologia.com.br") }
  }),
  calendarEnv
);
assert(response.status === 403, "assessor nao deve listar perfis governados aprovados");
console.log("AUTH_OK governed-profiles-assessor=403");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/profile-requests/action", {
    method: "POST",
    headers: {
      cookie: await cookieFor("admin_sistema", Date.now() + 60_000, "clovis@jus9tecnologia.com.br"),
      "content-type": "application/json",
      origin: "https://equipe.jus9tecnologia.com.br"
    },
    body: JSON.stringify({ id: profileRequestId, action: "aprovar", notes: "Aprovacao ficticia em teste controlado" })
  }),
  calendarEnv
);
data = await response.json();
assert(response.status === 200 && data.ok === true && data.status === "aprovada_revisao_humana", "admin deveria aprovar solicitacao de perfil");
console.log("AUTH_OK profile-request-action-admin=200");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/profile-requests/audit", {
    headers: { cookie: await cookieFor("admin_sistema", Date.now() + 60_000, "clovis@jus9tecnologia.com.br") }
  }),
  calendarEnv
);
data = await response.json();
assert(response.status === 200 && Array.isArray(data.items) && data.items.length === 1, "admin deveria listar auditoria de perfis");
assert(data.items[0].status === "aprovada_revisao_humana", "auditoria deveria refletir status aprovado");
console.log("AUTH_OK profile-request-audit-admin=200");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/governed-profiles", {
    headers: { cookie: await cookieFor("admin_sistema", Date.now() + 60_000, "clovis@jus9tecnologia.com.br") }
  }),
  calendarEnv
);
data = await response.json();
assert(response.status === 200 && Array.isArray(data.items) && data.items.length === 1, "admin deveria listar perfis governados aprovados");
assert(data.items[0].sourceRequestId === profileRequestId, "perfil governado deveria apontar para solicitacao aprovada");
assert(data.items[0].email === "pessoa@jus9tecnologia.com.br", "perfil governado deveria manter e-mail normalizado");
console.log("AUTH_OK governed-profiles-admin=200");

const governedContextEnv = {
  ...calendarEnv,
  AUTH_ALLOWED_EMAILS: "pessoa@jus9tecnologia.com.br:assessor,clovis@jus9tecnologia.com.br:admin_sistema"
};
response = await worker.fetch(
  new Request("https://jus9.invalid/api/auth/context?module=DGE&origin=https%3A%2F%2Fequipe.jus9tecnologia.com.br", {
    headers: { cookie: await cookieFor("assessor", Date.now() + 60_000, "pessoa@jus9tecnologia.com.br") }
  }),
  governedContextEnv
);
data = await response.json();
assert(response.status === 200 && data.identity?.user?.governedProfile?.sourceRequestId === profileRequestId, "contexto deveria carregar perfil governado aprovado");
assert(data.identity.user.governedProfile.profile === "Assessor", "contexto deveria preservar perfil aprovado");
console.log("AUTH_OK context=governed_profile");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/profile-requests", {
    headers: { cookie: await cookieFor("assessor", Date.now() + 60_000, "assessor@jus9tecnologia.com.br") }
  }),
  calendarEnv
);
assert(response.status === 403, "assessor nao deve listar solicitacoes de perfil");
console.log("AUTH_OK profile-request-list-assessor=403");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/profile-requests", {
    headers: { cookie: await cookieFor("admin_sistema", Date.now() + 60_000, "clovis@jus9tecnologia.com.br") }
  }),
  calendarEnv
);
data = await response.json();
assert(response.status === 200 && Array.isArray(data.items) && data.items.length === 1, "admin deveria listar solicitacoes de perfil");
assert(data.items[0].status === "aprovada_revisao_humana", "listagem deveria refletir status aprovado");
console.log("AUTH_OK profile-request-list-admin=200");

response = await worker.fetch(
  new Request("https://jus9.invalid/auth/google/calendar/start?return_to=%2Fapp-agenda.html"),
  calendarEnabledEnv
);
assert(response.status === 401, "Agenda sem sessao deve exigir login");
console.log("AUTH_OK calendar-login-obrigatorio=401");

response = await worker.fetch(
  new Request("https://jus9.invalid/auth/google/calendar/start?return_to=%2Fapp-agenda.html", {
    headers: { cookie: await cookieFor("admin_sistema") }
  }),
  calendarEnabledEnv
);
assert(response.status === 302, "Agenda com sessao deve redirecionar para Google");
assert(response.headers.get("location")?.includes("calendar.events"), "OAuth de Agenda deve pedir escopo de eventos");
const calendarCookie = response.headers.get("set-cookie")?.match(/jus9_calendar_oauth_tx=([^;]+)/)?.[1];
const calendarTxPayload = await verifyPayload(decodeURIComponent(calendarCookie || ""), calendarEnv);
assert(calendarTxPayload?.kind === "google_calendar_oauth_tx", "transacao de Agenda nao foi criada");
assert(calendarTxPayload?.returnTo === "/app-agenda.html", "return_to da Agenda nao foi preservado");
console.log("AUTH_OK calendar-start=302");

response = await worker.fetch(
  new Request("https://jus9.invalid/auth/google/calendar/start?return_to=%2Fapp-agenda.html", {
    headers: { cookie: await cookieFor("cidadao", Date.now() + 60_000, "publico@example.invalid", "public_google", "agenda") }
  }),
  calendarEnabledEnv
);
assert(response.status === 403, "cidadao publico nao deve iniciar consentimento Calendar");
console.log("AUTH_OK calendar-public-cidadao=403");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/calendar/status", {
    method: "OPTIONS",
    headers: { origin: "https://universidadedofuturo.jus9tecnologia.com.br" }
  }),
  calendarEnabledEnv
);
assert(response.status === 204, "preflight CORS da Agenda deveria retornar 204");
assert(response.headers.get("access-control-allow-origin") === "https://universidadedofuturo.jus9tecnologia.com.br", "CORS da Agenda nao liberou subdominio autorizado");
console.log("AUTH_OK calendar-cors=204");

response = await request("/api/tribunais/datajud/status");
data = await response.json();
assert(response.status === 200 && data.gateway === "tribunais-datajud", "status DataJud deveria responder");
assert(data.configured === false && data.gatewayTokenConfigured === false, "status DataJud deveria ocultar segredos e indicar pendencias");
assert(data.supportedAliases.some((item) => item.code === "tjsc" && item.alias === "api_publica_tjsc"), "aliases DataJud deveriam incluir TJSC");
assert(data.supportedSearchTypes.some((item) => item.type === "numeroProcesso" && item.support === "datajud_publico"), "DataJud deveria declarar busca por numero CNJ");
assert(data.supportedSearchTypes.some((item) => item.type === "nome" && item.support === "requer_conector_autorizado_de_partes"), "DataJud deveria governar busca por nome");
assert(data.supportedSearchTypes.some((item) => item.type === "cpf" && item.support === "requer_conector_autorizado_de_partes"), "DataJud deveria governar busca por CPF");
console.log("AUTH_OK datajud-status=200");

response = await request("/api/judicial/datajud/readiness");
data = await response.json();
assert(response.status === 200 && data.status === "missing-credentials", "readiness canonico DataJud deveria declarar credencial pendente");
assert(data.aliases >= 60 && data.cache.configured === false, "readiness DataJud deveria expor aliases e cache sem segredo");
console.log("AUTH_OK datajud-readiness=200");

response = await request("/api/judicial/datajud/tribunais");
data = await response.json();
assert(response.status === 200 && data.total >= 60 && data.tribunais.some((item) => item.code === "tjsc"), "rota canonica de tribunais deveria listar aliases");
console.log("AUTH_OK datajud-tribunais=200");

response = await request("/api/judicial/pdpj/readiness");
data = await response.json();
assert(response.status === 200 && data.status === "missing-credentials", "PDPJ readiness deveria declarar credenciais pendentes");
assert(data.capabilities.petitioning === false && data.capabilities.proceduralNotice === false, "PDPJ readiness nao deve habilitar atos transacionais");
console.log("AUTH_OK pdpj-readiness=200");

response = await request("/api/tribunais/datajud/search", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ tribunal: "tjsc", numeroProcesso: "0000000-00.2024.8.24.0000" })
});
data = await response.json();
assert(response.status === 501 && data.error === "gateway_tribunais_token_pendente", "DataJud sem token interno deveria ficar bloqueado");
console.log("AUTH_OK datajud-token-pendente=501");

const dataJudEnvWithoutKey = { ...env, JUS9_TRIBUNAIS_GATEWAY_TOKEN: "token-interno" };
response = await worker.fetch(
  new Request("https://jus9.invalid/api/tribunais/datajud/search", {
    method: "POST",
    headers: { "content-type": "application/json", "x-jus9-internal-token": "token-interno" },
    body: JSON.stringify({ tribunal: "tjsc", numeroProcesso: "0000000-00.2024.8.24.0000" })
  }),
  dataJudEnvWithoutKey
);
data = await response.json();
assert(response.status === 501 && data.error === "datajud_configuracao_pendente", "DataJud sem credencial deveria declarar configuracao pendente");
console.log("AUTH_OK datajud-credencial-pendente=501");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/tribunais/datajud/search", {
    method: "POST",
    headers: { "content-type": "application/json", "x-jus9-internal-token": "token-interno" },
    body: JSON.stringify({ tribunal: "tjsc", tipoPesquisa: "cpf", cpf: "123" })
  }),
  dataJudEnvWithoutKey
);
data = await response.json();
assert(response.status === 400 && data.error === "cpf_invalido", "CPF invalido deveria ser barrado antes de qualquer consulta");
console.log("AUTH_OK datajud-cpf-invalido=400");

const originalFetch = globalThis.fetch;
const dataJudCache = memoryKv();
let dataJudFetchCalls = 0;
globalThis.fetch = async (url, options = {}) => {
  dataJudFetchCalls += 1;
  assert(String(url) === "https://api-publica.datajud.cnj.jus.br/api_publica_tjsc/_search", "endpoint DataJud incorreto");
  assert(options.method === "POST", "DataJud deve usar POST com corpo JSON");
  assert(options.headers.Authorization === "APIKey chave-publica-ficticia", "DataJud deve usar APIKey sem expor ao cliente");
  const payload = JSON.parse(String(options.body || "{}"));
  assert(payload.query.match.numeroProcesso === "00000000020248240000", "numero CNJ deveria ser normalizado");
  return Response.json({
    hits: {
      total: { value: 1 },
      hits: [
        {
          _id: "TJSC_TESTE",
          _source: {
            id: "origem-teste",
            tribunal: "TJSC",
            numeroProcesso: "00000000020248240000",
            dataAjuizamento: "2024-01-02T00:00:00",
            grau: "G1",
            nivelSigilo: 0,
            classe: { codigo: 7, nome: "Procedimento Comum Civel" },
            assuntos: [{ codigo: 10433, nome: "Alimentos" }],
            orgaoJulgador: { codigo: 123, nome: "1a Vara Civel" },
            movimentos: [
              { codigo: 1, nome: "Distribuicao", dataHora: "2024-01-02T10:00:00" },
              { codigo: 2, nome: "Conclusos", dataHora: "2024-01-03T10:00:00", orgaoJulgador: { nomeOrgao: "1a Vara Civel" } }
            ],
            partes: [{ nome: "NAO DEVE SAIR" }]
          }
        }
      ]
    }
  });
};
try {
  response = await worker.fetch(
    new Request("https://jus9.invalid/api/tribunais/datajud/search", {
      method: "POST",
      headers: { "content-type": "application/json", "x-jus9-internal-token": "token-interno" },
      body: JSON.stringify({ tribunal: "TJSC", numeroProcesso: "0000000-00.2024.8.24.0000", size: 50 })
    }),
    { ...dataJudEnvWithoutKey, DATAJUD_API_KEY: "chave-publica-ficticia", JUS9_DATAJUD_CACHE: dataJudCache }
  );
  data = await response.json();
  assert(response.status === 200 && data.ok === true, "DataJud configurado deveria responder");
  assert(data.alias === "api_publica_tjsc" && data.results[0].classe.nome.includes("Procedimento"), "DataJud deveria normalizar metadados");
  assert(data.evidenceStatus === "official-public-metadata" && data.rawAvailable === false, "DataJud deveria declarar DTO de evidencia oficial sem raw");
  assert(data.cache?.hit === false && dataJudFetchCalls === 1, "primeira consulta DataJud deveria preencher cache");
  assert(data.governance.noPetitioning === true && data.governance.noSensitiveDisclosure === true, "DataJud deveria declarar limites governados");
  assert(!JSON.stringify(data).includes("NAO DEVE SAIR"), "DataJud nao deve repassar partes brutas");
  console.log("AUTH_OK datajud-search-normalizado=200");

  response = await worker.fetch(
    new Request("https://jus9.invalid/api/judicial/datajud/processos/0000000-00.2024.8.24.0000?tribunal=tjsc", {
      headers: { "x-jus9-internal-token": "token-interno" }
    }),
    { ...dataJudEnvWithoutKey, DATAJUD_API_KEY: "chave-publica-ficticia", JUS9_DATAJUD_CACHE: dataJudCache }
  );
  data = await response.json();
  assert(response.status === 200 && data.cache?.hit === true, "rota canonica por numero deveria reutilizar cache");
  assert(dataJudFetchCalls === 1, "cache DataJud deveria evitar segunda chamada ao CNJ");
  assert([...dataJudCache._store.keys()].some((key) => key.startsWith("datajud:audit:v1:")), "DataJud deveria registrar auditoria sem conteudo bruto");
  console.log("AUTH_OK datajud-processo-cache=200");
} finally {
  globalThis.fetch = originalFetch;
}

response = await worker.fetch(
  new Request("https://jus9.invalid/api/judicial/pdpj/token/test", {
    method: "POST",
    headers: { "x-jus9-internal-token": "token-interno" }
  }),
  dataJudEnvWithoutKey
);
data = await response.json();
assert(response.status === 501 && data.error === "pdpj_configuracao_pendente", "PDPJ token test sem credenciais deveria falhar fechado");
console.log("AUTH_OK pdpj-token-pendente=501");

let pdpjFetchCalls = 0;
globalThis.fetch = async (url, options = {}) => {
  pdpjFetchCalls += 1;
  assert(String(url) === "https://pdpj.invalid/realms/test/protocol/openid-connect/token", "PDPJ chamou token URL inesperada");
  const form = new URLSearchParams(String(options.body || ""));
  assert(form.get("grant_type") === "client_credentials", "PDPJ deveria usar client_credentials");
  assert(form.get("client_id") === "client-ficticio" && form.get("client_secret") === "secret-ficticio", "PDPJ deveria enviar credenciais somente ao token endpoint");
  return Response.json({ access_token: "token-que-nao-pode-sair", token_type: "Bearer", expires_in: 300, scope: "openid" });
};
try {
  response = await worker.fetch(
    new Request("https://jus9.invalid/api/judicial/pdpj/token/test", {
      method: "POST",
      headers: { "x-jus9-internal-token": "token-interno" }
    }),
    {
      ...dataJudEnvWithoutKey,
      PDPJ_TOKEN_URL: "https://pdpj.invalid/realms/test/protocol/openid-connect/token",
      PDPJ_CLIENT_ID: "client-ficticio",
      PDPJ_CLIENT_SECRET: "secret-ficticio",
      PDPJ_ENVIRONMENT: "homologacao"
    }
  );
  data = await response.json();
  assert(response.status === 200 && data.tokenReceived === true && data.tokenExposed === false, "PDPJ deveria confirmar token sem expo-lo");
  assert(data.transactionalCapabilitiesEnabled === false && pdpjFetchCalls === 1, "PDPJ token test nao deve habilitar atos transacionais");
  assert(!JSON.stringify(data).includes("token-que-nao-pode-sair"), "PDPJ nao deve devolver access token");
  console.log("AUTH_OK pdpj-token-test=200");
} finally {
  globalThis.fetch = originalFetch;
}

let partySearchFetchCalled = false;
globalThis.fetch = async () => {
  partySearchFetchCalled = true;
  return Response.json({ ok: false }, { status: 500 });
};
try {
  response = await worker.fetch(
    new Request("https://jus9.invalid/api/tribunais/datajud/search", {
      method: "POST",
      headers: { "content-type": "application/json", "x-jus9-internal-token": "token-interno" },
      body: JSON.stringify({ tribunal: "tjsc", tipoPesquisa: "nome", nome: "Maria de Souza" })
    }),
    { ...dataJudEnvWithoutKey, DATAJUD_API_KEY: "chave-publica-ficticia" }
  );
  data = await response.json();
  assert(response.status === 422 && data.error === "datajud_busca_por_parte_indisponivel_na_api_publica", "busca por nome deveria exigir conector autorizado");
  assert(data.search.type === "nome" && data.search.valueMasked === "Maria de Souza", "busca por nome deveria retornar chave sanitizada");
  assert(partySearchFetchCalled === false, "busca por nome nao deveria chamar DataJud publico");
  console.log("AUTH_OK datajud-nome-requer-conector=422");

  response = await worker.fetch(
    new Request("https://jus9.invalid/api/tribunais/datajud/search", {
      method: "POST",
      headers: { "content-type": "application/json", "x-jus9-internal-token": "token-interno" },
      body: JSON.stringify({ tribunal: "tjsc", tipoPesquisa: "cpf", cpf: "111.444.777-35" })
    }),
    { ...dataJudEnvWithoutKey, DATAJUD_API_KEY: "chave-publica-ficticia" }
  );
  data = await response.json();
  assert(response.status === 422 && data.search.type === "cpf", "busca por CPF deveria exigir conector autorizado");
  assert(data.search.valueMasked === "***.***.***-35", "CPF deveria retornar mascarado");
  assert(!JSON.stringify(data).includes("11144477735"), "CPF integral nao deve sair na resposta");
  assert(partySearchFetchCalled === false, "busca por CPF nao deveria chamar DataJud publico");
  console.log("AUTH_OK datajud-cpf-requer-conector=422");
} finally {
  globalThis.fetch = originalFetch;
}

response = await request("/api/daj-process-links/readiness");
data = await response.json();
assert(response.status === 200 && data.service === "daj-process-links", "readiness DAJ-processo deveria responder");
assert(data.configured === false && data.storage === "JUS9_DAJ_PROCESS_LINKS", "readiness DAJ-processo deveria indicar KV pendente");
console.log("AUTH_OK daj-process-links-readiness=200");

response = await request("/api/dajs/readiness");
data = await response.json();
assert(response.status === 200 && data.service === "daj-registry", "readiness do cadastro DAJ deveria responder");
assert(data.processRequiredAtIntake === false && data.policy === "cpf_request_only_hmac_at_rest", "readiness do cadastro DAJ perdeu politica do indice");
console.log("AUTH_OK daj-registry-readiness=200");

response = await request("/api/judicial/parties/readiness");
data = await response.json();
assert(response.status === 200 && data.policy === "no_llm_no_invented_results", "readiness de partes deveria declarar politica sem invencao");
assert(data.externalConnector.status === "awaiting_official_guidance" && data.externalConnector.dataJudPublicPartySearch === false, "readiness deveria manter conector externo em espera");
console.log("AUTH_OK judicial-parties-readiness=200");

response = await request("/api/judicial/parties/search", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ searchType: "nome", nome: "Maria" })
});
assert(response.status === 401, "pesquisa de partes anonima deveria exigir sessao");
console.log("AUTH_OK judicial-parties-anonymous=401");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/judicial/parties/search", {
    method: "POST",
    headers: { "content-type": "application/json", cookie: await cookieFor("orgao_publico") },
    body: JSON.stringify({ searchType: "nome", nome: "Maria" })
  }),
  { ...env, JUS9_DAJ_PROCESS_LINKS: memoryKv() }
);
data = await response.json();
assert(response.status === 403 && data.permission === "dajs:read", "processes:read isolado nao deve abrir indice interno de partes do DAJ");
console.log("AUTH_OK judicial-parties-requires-dajs-read=403");

response = await request("/api/daj-process-links");
assert(response.status === 401, "DAJ-processo anonimo deveria exigir sessao");
console.log("AUTH_OK daj-process-links-anonymous=401");

response = await request("/api/dajs", { method: "POST" });
assert(response.status === 401, "cadastro DAJ anonimo deveria exigir sessao");
console.log("AUTH_OK daj-registry-anonymous=401");

response = await request("/api/dajs?dajId=DAJ-2026-0001", { method: "DELETE" });
assert(response.status === 401, "exclusao DAJ anonima deveria exigir sessao");
console.log("AUTH_OK daj-registry-delete-anonymous=401");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/dajs", {
    method: "POST",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({ partyName: "Parte Ficticia", cpf: "111.444.777-35" })
  }),
  env
);
data = await response.json();
assert(response.status === 501 && data.error === "daj_registry_configuracao_pendente", "cadastro DAJ sem KV deveria falhar fechado");
console.log("AUTH_OK daj-registry-kv-pendente=501");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/daj-process-links", {
    headers: { cookie: await cookieFor("advogado") }
  }),
  env
);
data = await response.json();
assert(response.status === 501 && data.error === "daj_process_links_configuracao_pendente", "DAJ-processo sem KV deve ficar fail-closed");
console.log("AUTH_OK daj-process-links-kv-pendente=501");

const dajProcessLinksEnv = {
  ...env,
  JUS9_DAJ_PROCESS_LINKS: memoryKv(),
  JUS9_DAJ_PII_INDEX_KEY: "chave-hmac-ficticia-longa-para-testes"
};

response = await worker.fetch(
  new Request("https://jus9.invalid/api/dajs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: await cookieFor("assessor"),
      "idempotency-key": "daj-intake-assessor-0001"
    },
    body: JSON.stringify({ partyName: "Parte Ficticia", cpf: "111.444.777-35" })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 403 && data.permission === "dajs:write", "perfil sem escrita nao deve criar DAJ");
console.log("AUTH_OK daj-registry-write-permission=403");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/dajs", {
    method: "POST",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({ partyName: "Parte Sem Chave Ficticia", cpf: "123.456.789-09" })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 400 && data.error === "idempotency_key_obrigatoria", "criacao DAJ deve exigir chave idempotente");
console.log("AUTH_OK daj-registry-idempotency-required=400");

const missingHmacKv = memoryKv();
response = await worker.fetch(
  new Request("https://jus9.invalid/api/dajs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: await cookieFor("advogado"),
      "idempotency-key": "daj-intake-missing-hmac-01"
    },
    body: JSON.stringify({ partyName: "Parte Sem Hmac Ficticia", cpf: "123.456.789-09" })
  }),
  { ...dajProcessLinksEnv, JUS9_DAJ_PROCESS_LINKS: missingHmacKv, JUS9_DAJ_PII_INDEX_KEY: "" }
);
data = await response.json();
assert(response.status === 503 && data.error === "indice_cpf_exato_configuracao_pendente", "cadastro com CPF deve falhar fechado sem HMAC");
assert(await missingHmacKv.get("daj-process-links:index") === null, "falha de HMAC nao deve criar indice parcial");
console.log("AUTH_OK daj-registry-hmac-required=503");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/dajs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: await cookieFor("advogado"),
      "idempotency-key": "daj-intake-payload-large-01"
    },
    body: JSON.stringify({ partyName: "Parte Payload Ficticia", caseSummary: "x".repeat(33000) })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 413 && data.error === "payload_muito_grande", "cadastro DAJ deveria limitar payload mesmo sem content-length confiavel");
console.log("AUTH_OK daj-registry-payload-limit=413");

const intakePayload = {
  partyName: "Ana Cadastro Ficticia",
  cpf: "123.456.789-09",
  contact: "ana@example.invalid",
  area: "Familia",
  urgency: "Importante",
  attentionReason: "documento faltante",
  secrecyLevel: "Restrito",
  caseSummary: "Relato inteiramente ficticio para homologacao do cadastro DAJ.",
  documentsMentioned: "Documento ficticio A.",
  attachmentsPendingCount: 2,
  testMode: true,
  environment: "homologacao"
};
const intakeIdempotencyKey = "daj-intake-auth-test-0001";
response = await worker.fetch(
  new Request("https://jus9.invalid/api/dajs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: await cookieFor("advogado"),
      "idempotency-key": intakeIdempotencyKey
    },
    body: JSON.stringify(intakePayload)
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 201 && /^DAJ-\d{4}-\d{4}$/.test(data.item?.id), "cadastro deveria gerar DAJ no servidor");
assert(data.item.cpfMasked === "***.***.***-09" && data.cpfIndexed === true, "cadastro deveria indexar CPF exato e devolver apenas mascara");
assert(data.item.processLinked === false && data.item.status === "em_triagem", "DAJ deveria nascer antes do vinculo processual");
assert(data.item.classification === "JURIDICO_SIGILOSO", "sigilo restrito deveria classificar cadastro como sigiloso");
assert(data.item.testMode === true && data.item.environment === "homologacao", "cadastro ficticio deveria ficar marcado como homologacao");
assert(!JSON.stringify(data).includes("12345678909"), "cadastro DAJ nao deve devolver CPF integral");
const intakeDajId = data.item.id;
console.log("AUTH_OK daj-registry-create-indexed=201");

const intakeIndexRaw = await dajProcessLinksEnv.JUS9_DAJ_PROCESS_LINKS.get("daj-process-links:index");
const intakeDetailRaw = await dajProcessLinksEnv.JUS9_DAJ_PROCESS_LINKS.get(`daj-record:v1:${intakeDajId}`);
const intakeDetail = JSON.parse(intakeDetailRaw);
assert(!String(intakeIndexRaw).includes("12345678909") && !String(intakeDetailRaw).includes("12345678909"), "CPF integral nao deve ser persistido no indice nem no detalhe");
assert(!String(intakeIndexRaw).includes("ana@example.invalid") && String(intakeDetailRaw).includes("ana@example.invalid"), "contato deve ficar fora do indice pesquisavel");
assert(String(intakeIndexRaw).includes("cpfLookupHash"), "indice DAJ deveria conter HMAC do CPF");
assert(/^daj-intake:idempotency:v1:/.test(intakeDetail.creationIdempotencyStorageKey), "detalhe deveria preservar somente referencia derivada da idempotencia");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/dajs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: await cookieFor("advogado"),
      "idempotency-key": intakeIdempotencyKey
    },
    body: JSON.stringify(intakePayload)
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 200 && data.idempotentReplay === true && data.item.id === intakeDajId, "repeticao deveria devolver o mesmo DAJ sem duplicar");
assert(JSON.parse(await dajProcessLinksEnv.JUS9_DAJ_PROCESS_LINKS.get("daj-process-links:index")).length === 1, "repeticao idempotente nao deve duplicar DAJ");
console.log("AUTH_OK daj-registry-idempotent-replay=200");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/dajs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: await cookieFor("advogado"),
      "idempotency-key": intakeIdempotencyKey
    },
    body: JSON.stringify({ ...intakePayload, partyName: "Outra Parte Ficticia" })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 409 && data.error === "idempotency_key_reutilizada_com_payload_diferente", "chave idempotente nao deve aceitar outro cadastro");
console.log("AUTH_OK daj-registry-idempotency-conflict=409");

response = await worker.fetch(
  new Request(`https://jus9.invalid/api/dajs?dajId=${encodeURIComponent(intakeDajId)}`, {
    headers: { cookie: await cookieFor("advogado") }
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 200 && data.item.operational?.area === "Familia", "leitura autorizada deveria devolver detalhe operacional");
assert(data.item.operational?.contact === "ana@example.invalid" && !JSON.stringify(data).includes("12345678909"), "detalhe deve preservar contato sem expor CPF integral");
assert(data.item.testMode === true && data.item.environment === "homologacao", "retomada deveria preservar marca de homologacao");
console.log("AUTH_OK daj-registry-detail=200");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/dajs", {
    method: "POST",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({ dajId: intakeDajId, partyName: intakePayload.partyName, urgency: "Urgente", secrecyLevel: "Comum" })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 200 && data.item.classification === "JURIDICO_SIGILOSO", "atualizacao comum nao deve rebaixar sigilo automaticamente");
assert(data.item.cpfIndexed === true, "atualizacao sem CPF deve preservar indice exato existente");
console.log("AUTH_OK daj-registry-update-preserves-index=200");

const indexBeforeInvalidCpf = await dajProcessLinksEnv.JUS9_DAJ_PROCESS_LINKS.get("daj-process-links:index");
response = await worker.fetch(
  new Request("https://jus9.invalid/api/dajs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: await cookieFor("advogado"),
      "idempotency-key": "daj-intake-invalid-cpf-001"
    },
    body: JSON.stringify({ partyName: "CPF Parcial Ficticio", cpf: "777-35" })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 400 && data.error === "cpf_invalido", "CPF parcial deve ser recusado sem deducao");
assert(await dajProcessLinksEnv.JUS9_DAJ_PROCESS_LINKS.get("daj-process-links:index") === indexBeforeInvalidCpf, "CPF invalido nao deve alterar indice");
console.log("AUTH_OK daj-registry-invalid-cpf-no-mutation=400");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/judicial/parties/search", {
    method: "POST",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({ searchType: "cpf", cpf: "123.456.789-09" })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 200 && data.total === 1 && data.items[0].id === intakeDajId, "CPF deveria encontrar DAJ antes de existir processo");
console.log("AUTH_OK daj-registry-cpf-search-before-process=200");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/daj-process-links", {
    method: "POST",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({
      dajId: intakeDajId,
      processNumber: "6666666-66.2024.8.24.0000",
      tribunal: "tjsc",
      partyName: "Nome Nao Deve Sobrescrever"
    })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 200 && data.item.processNumber === "6666666-66.2024.8.24.0000", "DAJ criado no atendimento deveria aceitar vinculo posterior");
assert(data.item.partyName === intakePayload.partyName && data.item.classification === "JURIDICO_SIGILOSO", "vinculo processual deve preservar identidade e sigilo do cadastro");
console.log("AUTH_OK daj-registry-link-later=200");

response = await worker.fetch(
  new Request(`https://jus9.invalid/api/dajs?dajId=${encodeURIComponent(intakeDajId)}`, {
    method: "DELETE",
    headers: { "content-type": "application/json", cookie: await cookieFor("assessor") },
    body: JSON.stringify({
      reason: "Homologacao ficticia encerrada com seguranca.",
      confirmation: `EXCLUIR TESTE ${intakeDajId}`
    })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 403 && data.permission === "dajs:write+audit:write", "perfil sem escrita e auditoria nao deve excluir DAJ ficticio");
console.log("AUTH_OK daj-registry-delete-permission=403");

response = await worker.fetch(
  new Request(`https://jus9.invalid/api/dajs?dajId=${encodeURIComponent(intakeDajId)}`, {
    method: "DELETE",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({ reason: "Homologacao ficticia encerrada com seguranca.", confirmation: "CONFIRMACAO ERRADA" })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 400 && data.error === "confirmacao_exclusao_invalida", "exclusao deveria exigir confirmacao vinculada ao DAJ");
assert((await dajProcessLinksEnv.JUS9_DAJ_PROCESS_LINKS.get("daj-process-links:index")).includes(intakeDajId), "confirmacao invalida nao deve alterar indice");
console.log("AUTH_OK daj-registry-delete-confirmation=400");

response = await worker.fetch(
  new Request(`https://jus9.invalid/api/dajs?dajId=${encodeURIComponent(intakeDajId)}`, {
    method: "DELETE",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({
      reason: "Homologacao ficticia encerrada com seguranca.",
      confirmation: `EXCLUIR TESTE ${intakeDajId}`
    })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 200 && data.ok === true && data.tombstone === true && data.alreadyDeleted === false, "DAJ ficticio deveria admitir limpeza governada");
assert(!(await dajProcessLinksEnv.JUS9_DAJ_PROCESS_LINKS.get("daj-process-links:index")).includes(intakeDajId), "indice nao deve manter DAJ ficticio removido");
assert(await dajProcessLinksEnv.JUS9_DAJ_PROCESS_LINKS.get(`daj-record:v1:${intakeDajId}`) === null, "detalhe operacional deveria ser removido");
const intakeTombstoneRaw = await dajProcessLinksEnv.JUS9_DAJ_PROCESS_LINKS.get(`daj-record:tombstone:v1:${intakeDajId}`);
assert(String(intakeTombstoneRaw).includes("daj-homologation-tombstone"), "limpeza deveria preservar tombstone minimo");
assert(!String(intakeTombstoneRaw).includes("Ana Cadastro") && !String(intakeTombstoneRaw).includes("ana@example.invalid"), "tombstone nao deve preservar nome ou contato");
assert(!String(intakeTombstoneRaw).includes("12345678909") && !String(intakeTombstoneRaw).includes("6666666"), "tombstone nao deve preservar CPF ou processo");
assert(!String(intakeTombstoneRaw).includes("Homologacao ficticia encerrada") && String(intakeTombstoneRaw).includes("reasonHash"), "tombstone deve preservar justificativa somente como hash");
const intakeAuditRaw = await dajProcessLinksEnv.JUS9_DAJ_PROCESS_LINKS.get("daj-process-links:audit");
assert(String(intakeAuditRaw).includes("exclui_cadastro_daj_homologacao"), "limpeza deveria registrar acao de auditoria");
assert(!String(intakeAuditRaw).includes("12345678909") && !String(intakeAuditRaw).includes("ana@example.invalid"), "auditoria nao deve conter CPF integral ou contato");
console.log("AUTH_OK daj-registry-delete-test=200");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/judicial/parties/search", {
    method: "POST",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({ searchType: "cpf", cpf: "123.456.789-09" })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 200 && data.total === 0, "indice de CPF nao deve encontrar DAJ removido");
console.log("AUTH_OK daj-registry-delete-removes-party-index=200");

response = await worker.fetch(
  new Request(`https://jus9.invalid/api/dajs?dajId=${encodeURIComponent(intakeDajId)}`, {
    method: "DELETE",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({
      reason: "Repeticao governada da limpeza ficticia.",
      confirmation: `EXCLUIR TESTE ${intakeDajId}`
    })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 200 && data.alreadyDeleted === true, "limpeza repetida deveria ser idempotente");
console.log("AUTH_OK daj-registry-delete-idempotent=200");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/dajs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: await cookieFor("advogado"),
      "idempotency-key": intakeIdempotencyKey
    },
    body: JSON.stringify(intakePayload)
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 410 && data.error === "operacao_daj_removida", "operacao removida nao deve recriar DAJ pela mesma chave");
console.log("AUTH_OK daj-registry-deleted-operation=410");

const sequentialPayload = {
  partyName: "Nova Parte Sequencial Ficticia",
  testMode: true,
  environment: "homologacao"
};
response = await worker.fetch(
  new Request("https://jus9.invalid/api/dajs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: await cookieFor("advogado"),
      "idempotency-key": "daj-intake-sequence-after-delete-01"
    },
    body: JSON.stringify(sequentialPayload)
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 201 && data.item.id !== intakeDajId, "sequencia nao deve reutilizar dajId removido");
const sequentialDajId = data.item.id;
response = await worker.fetch(
  new Request(`https://jus9.invalid/api/dajs?dajId=${encodeURIComponent(sequentialDajId)}`, {
    method: "DELETE",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({
      reason: "Limpeza do teste de sequencia monotonicamente crescente.",
      confirmation: `EXCLUIR TESTE ${sequentialDajId}`
    })
  }),
  dajProcessLinksEnv
);
assert(response.status === 200, "DAJ do teste de sequencia deveria ser removido");
console.log("AUTH_OK daj-registry-sequence-no-reuse=201/200");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/daj-process-links", {
    method: "POST",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({
      dajId: "DAJ-2026-0101",
      processNumber: "2222222-22.2024.8.24.0000",
      tribunal: "tjsc",
      tribunalLabel: "Santa Catarina - TJSC",
      partyName: "Maria Demonstracao",
      cpf: "111.444.777-35"
    })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 201 && data.item.id === "DAJ-2026-0101", "DAJ-processo deveria criar vinculo autenticado");
assert(data.item.processNumber === "2222222-22.2024.8.24.0000", "DAJ-processo deveria normalizar numero CNJ");
assert(data.item.cpfMasked === "***.***.***-35", "DAJ-processo deveria mascarar CPF");
assert(!JSON.stringify(data).includes("11144477735"), "DAJ-processo nao deve devolver CPF integral");
console.log("AUTH_OK daj-process-links-create=201");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/dajs?dajId=DAJ-2026-0101", {
    method: "DELETE",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({
      reason: "Tentativa controlada sobre registro nao homologado.",
      confirmation: "EXCLUIR TESTE DAJ-2026-0101"
    })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 409 && data.error === "exclusao_restrita_a_daj_de_homologacao", "rota de limpeza nunca deve excluir DAJ comum");
console.log("AUTH_OK daj-registry-delete-production-blocked=409");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/daj-process-links?searchType=daj&dajId=DAJ-2026-0101", {
    headers: { cookie: await cookieFor("advogado") }
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 200 && data.total === 1 && data.items[0].processNumber.includes("2222222"), "pesquisa por DAJ deveria mostrar vinculo");
console.log("AUTH_OK daj-process-links-search-daj=200");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/daj-process-links?searchType=nome&nome=Maria", {
    headers: { cookie: await cookieFor("advogado") }
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 422 && data.endpoint === "/api/judicial/parties/search", "pesquisa de partes em query string deveria ser recusada");
console.log("AUTH_OK daj-process-links-person-query-deprecated=422");

const indexBeforePartySearch = await dajProcessLinksEnv.JUS9_DAJ_PROCESS_LINKS.get("daj-process-links:index");
response = await worker.fetch(
  new Request("https://jus9.invalid/api/judicial/parties/search", {
    method: "POST",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({ searchType: "nome", nome: "Maria" })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 200 && data.total === 1 && data.items[0].id === "DAJ-2026-0101", "pesquisa estruturada por nome deveria encontrar DAJ");
assert(data.mutated === false && data.policy === "no_llm_no_invented_results", "pesquisa por nome deveria ser somente leitura e sem LLM");
assert(data.externalConnector.status === "awaiting_official_guidance" && data.externalConnector.searched === false, "pesquisa externa deveria permanecer em espera");
assert(await dajProcessLinksEnv.JUS9_DAJ_PROCESS_LINKS.get("daj-process-links:index") === indexBeforePartySearch, "pesquisa por nome nao deve alterar indice DAJ");
console.log("AUTH_OK judicial-parties-search-nome=200");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/daj-process-links", {
    method: "POST",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({
      dajId: "DAJ-2026-0104",
      processNumber: "5555555-55.2024.8.24.0000",
      tribunal: "tjsc",
      partyName: "Outra Parte Ficticia",
      cpf: "100.000.058-35"
    })
  }),
  dajProcessLinksEnv
);
assert(response.status === 201, "segundo CPF ficticio com mesmos dois digitos finais deveria ser indexado");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/judicial/parties/search", {
    method: "POST",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({ searchType: "cpf", cpf: "111.444.777-35" })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 200 && data.total === 1 && data.items[0].id === "DAJ-2026-0101", "CPF HMAC deveria corresponder apenas ao documento exato");
assert(!JSON.stringify(data).includes("11144477735") && !JSON.stringify(data).includes("cpfLookupHash"), "resposta nao deve expor CPF integral nem hash");
console.log("AUTH_OK judicial-parties-search-cpf-exact-no-collision=200");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/judicial/parties/search", {
    method: "POST",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({ searchType: "cpf", cpf: "111.444.777-35" })
  }),
  { ...dajProcessLinksEnv, JUS9_DAJ_PII_INDEX_KEY: "" }
);
data = await response.json();
assert(response.status === 503 && data.policy === "fail_closed_no_last_digits_fallback", "CPF sem HMAC deveria falhar fechado");
console.log("AUTH_OK judicial-parties-cpf-missing-key=503");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/daj-process-links", {
    method: "POST",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({
      dajId: "DAJ-2026-0101",
      processNumber: "3333333-33.2024.8.24.0000",
      tribunal: "tjsc"
    })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 409 && data.error === "daj_ja_vinculado", "mesmo DAJ nao deve aceitar segundo processo");
console.log("AUTH_OK daj-process-links-bloqueia-daj-duplicado=409");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/daj-process-links", {
    method: "POST",
    headers: { "content-type": "application/json", cookie: await cookieFor("advogado") },
    body: JSON.stringify({
      dajId: "DAJ-2026-0102",
      processNumber: "2222222-22.2024.8.24.0000",
      tribunal: "tjsc"
    })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 409 && data.error === "processo_ja_vinculado", "mesmo processo nao deve ser duplicado em outro DAJ sem revisao");
console.log("AUTH_OK daj-process-links-bloqueia-processo-duplicado=409");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/daj-process-links", {
    method: "POST",
    headers: { "content-type": "application/json", cookie: await cookieFor("assessor") },
    body: JSON.stringify({ dajId: "DAJ-2026-0103", processNumber: "4444444-44.2024.8.24.0000" })
  }),
  dajProcessLinksEnv
);
data = await response.json();
assert(response.status === 403 && data.permission === "dajs:write+processes:read", "assessor sem escrita nao deve vincular DAJ-processo");
console.log("AUTH_OK daj-process-links-write-permission=403");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/daj-process-links", {
    method: "OPTIONS",
    headers: { origin: "https://jus9tecnologia.com.br" }
  }),
  dajProcessLinksEnv
);
assert(response.status === 204 && response.headers.get("access-control-allow-origin") === "https://jus9tecnologia.com.br", "CORS DAJ-processo deveria liberar origem principal");
console.log("AUTH_OK daj-process-links-cors=204");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/judicial/parties/search", {
    method: "OPTIONS",
    headers: { origin: "https://jus9tecnologia.com.br" }
  }),
  dajProcessLinksEnv
);
assert(response.status === 204 && response.headers.get("access-control-allow-origin") === "https://jus9tecnologia.com.br", "CORS de pesquisa de partes deveria liberar origem principal");
console.log("AUTH_OK judicial-parties-cors=204");

response = await request("/auth/logout");
const logoutHtml = await response.text();
assert(response.status === 200 && logoutHtml.includes("Sair da Jus 9"), "GET logout deveria mostrar tela segura");
console.log("AUTH_OK logout-page=200");

response = await worker.fetch(
  new Request("https://jus9.invalid/auth/logout?redirect=1", {
    method: "POST",
    redirect: "manual"
  }),
  env
);
assert(response.status === 303 && response.headers.get("location") === "/auth/logout?done=1", "logout por formulario deveria redirecionar para confirmacao");
assert(response.headers.get("set-cookie")?.includes("Max-Age=0"), "logout por formulario deveria limpar cookie");
console.log("AUTH_OK logout-form=303");

response = await request("/auth/logout", { method: "POST" });
assert(response.status === 204 && response.headers.get("set-cookie")?.includes("Max-Age=0"), "logout nao limpou cookie");
console.log("AUTH_OK logout=204");
console.log("WORKER_AUTH_REGRESSION_OK");
