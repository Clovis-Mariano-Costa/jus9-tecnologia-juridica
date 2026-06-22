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
    get: async (key, type) => {
      const value = store.get(key) || null;
      if (type === "json" && value) return JSON.parse(value);
      return value;
    },
    put: async (key, value) => {
      store.set(key, value);
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

let response = await request("/api/auth/permissions");
assert(response.status === 401, "permissoes anonimas devem retornar 401");
console.log("AUTH_OK anonymous=401");

response = await request("/api/auth/permissions", { headers: { cookie: await cookieFor("advogado") } });
let data = await response.json();
assert(response.status === 200 && data.permissions.includes("dajs:write"), "advogado sem dajs:write");
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
assert(data.accessMode === "public_google" && data.authNucleus === "mvp", "sessao publica deveria preservar modo e nucleo");
console.log("AUTH_OK public-google-cidadao=governado");

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

response = await request("/auth/google/calendar/start");
assert(response.status === 501, "Agenda sem KV deve retornar configuracao pendente");
console.log("AUTH_OK calendar-kv-pendente=501");

const calendarEnv = {
  ...configuredEnv,
  JUS9_CALENDAR_TOKENS: memoryKv(),
  JUS9_PROFILE_REQUESTS: memoryKv()
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
  calendarEnv
);
assert(response.status === 401, "Agenda sem sessao deve exigir login");
console.log("AUTH_OK calendar-login-obrigatorio=401");

response = await worker.fetch(
  new Request("https://jus9.invalid/auth/google/calendar/start?return_to=%2Fapp-agenda.html", {
    headers: { cookie: await cookieFor("admin_sistema") }
  }),
  calendarEnv
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
  calendarEnv
);
assert(response.status === 403, "cidadao publico nao deve iniciar consentimento Calendar");
console.log("AUTH_OK calendar-public-cidadao=403");

response = await worker.fetch(
  new Request("https://jus9.invalid/api/calendar/status", {
    method: "OPTIONS",
    headers: { origin: "https://universidadedofuturo.jus9tecnologia.com.br" }
  }),
  calendarEnv
);
assert(response.status === 204, "preflight CORS da Agenda deveria retornar 204");
assert(response.headers.get("access-control-allow-origin") === "https://universidadedofuturo.jus9tecnologia.com.br", "CORS da Agenda nao liberou subdominio autorizado");
console.log("AUTH_OK calendar-cors=204");

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
