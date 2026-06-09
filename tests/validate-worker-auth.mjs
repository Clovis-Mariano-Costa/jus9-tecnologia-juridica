import worker from "../worker.js";
import { normalizeAuthReturnTo, signPayload, verifyPayload } from "../functions/_shared/oauth.js";

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

async function cookieFor(profile, expiresAt = Date.now() + 60_000, email = "") {
  const value = await signPayload({
    kind: "jus9_session",
    provider: "controlled-test",
    emailHash: email ? await signPayloadHash(email) : `hash-${profile}`,
    profile,
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
console.log("AUTH_OK profile-request-create=201");

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
  new Request("https://jus9.invalid/api/calendar/status", {
    method: "OPTIONS",
    headers: { origin: "https://universidadedofuturo.jus9tecnologia.com.br" }
  }),
  calendarEnv
);
assert(response.status === 204, "preflight CORS da Agenda deveria retornar 204");
assert(response.headers.get("access-control-allow-origin") === "https://universidadedofuturo.jus9tecnologia.com.br", "CORS da Agenda nao liberou subdominio autorizado");
console.log("AUTH_OK calendar-cors=204");

response = await request("/auth/logout", { method: "POST" });
assert(response.status === 204 && response.headers.get("set-cookie")?.includes("Max-Age=0"), "logout nao limpou cookie");
console.log("AUTH_OK logout=204");
console.log("WORKER_AUTH_REGRESSION_OK");
