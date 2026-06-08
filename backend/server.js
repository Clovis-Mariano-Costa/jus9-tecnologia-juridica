/**
 * Jus 9 Tecnologia Jurídica
 * Repositório: jus9-tecnologia-juridica
 * Software livre com autoria preservada.
 * Direitos autorais reservados para Jus 9 Tecnologia Jurídica.
Produção do site: © Jus 9 Tecnologia Jurídica. Direitos autorais da produção reservados.
 * A licença livre não remove autoria, origem, assinatura institucional nem direitos autorais.
 * Referência oficial: https://www.jus9tecnologia.com.br/
 * E-mail de contato: Contato@jus9tecnologia.com.br
 * DNA de referência de Charlie Echo da Costa: charlieecho-jus9-tecnologia-juridica
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const crypto = require("crypto");
const mvpProfileCatalog = require("../data-publica/mvp-perfis.json");

const app = express();
const port = process.env.PORT || 3009;
const isProduction = process.env.NODE_ENV === "production";
const publicSiteOrigin = process.env.PUBLIC_SITE_ORIGIN || "https://www.jus9tecnologia.com.br";
const googleCallbackUrl =
  process.env.GOOGLE_CALLBACK_URL || `${publicSiteOrigin}/auth/google/callback`;

function normalizeAuthReturnTo(value) {
  const rawValue = String(value || "").trim();
  if (!rawValue) return "";
  if (/[\u0000-\u001f\u007f]/.test(rawValue)) return "";
  if (rawValue.includes("\\") || rawValue.startsWith("//")) return "";
  if (rawValue.includes("..")) return "";
  if (/^[a-z][a-z0-9+.-]*:/i.test(rawValue)) return "";

  let parsed;
  try {
    parsed = new URL(rawValue, "https://jus9.invalid");
  } catch (_) {
    return "";
  }

  if (parsed.origin !== "https://jus9.invalid") return "";
  const path = parsed.pathname || "/";
  if (path.includes("..")) return "";

  const allowedExactPaths = new Set([
    "/",
    "/index.html",
    "/app.html",
    "/mvp.html",
    "/ia-profissional.html",
    "/app-ia-profissional.html",
    "/app-agenda.html",
    "/app-daj.html",
    "/app-clientes.html",
    "/app-processos.html",
    "/app-prazos.html",
    "/app-cofre.html",
    "/app-equipe.html",
    "/app-whatsapp.html",
    "/app-atendimento-inicial.html",
    "/app-grupos.html",
    "/app-gravacoes.html",
    "/app-retorno.html"
  ]);
  const allowedPattern = /^\/(?:app-(?:demo|ia|documentos|perfis|workspace)-[a-z0-9-]+|demo-\d{2}-[a-z0-9-]+)\.html$/;
  if (!allowedExactPaths.has(path) && !allowedPattern.test(path)) return "";

  return `${path}${parsed.search}${parsed.hash}`;
}

function getAuthSuccessRedirect(returnTo = "") {
  if (returnTo) return `${publicSiteOrigin}${returnTo}`;
  return process.env.AUTH_SUCCESS_REDIRECT || `${publicSiteOrigin}/app.html`;
}

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      const allowed = new Set(
        (process.env.CORS_ORIGINS || `${publicSiteOrigin},http://localhost:3009,http://127.0.0.1:3009`)
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      );
      if (!origin || allowed.has(origin)) return callback(null, true);
      return callback(new Error("Origem nao autorizada pelo CORS"));
    }
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

const internalProfiles = [
  "admin_sistema",
  "advogado_lider",
  "advogado",
  "assessor_chefe",
  "assessor",
  "secretaria",
  "estagio"
];

const dajs = [
  {
    id: "daj_2026_0001",
    numero: "DAJ-2026-0001",
    cliente: "Cliente demonstração",
    areaAparente: "Cível / Contratual",
    responsavel: "Advogado titular",
    advogadoTitularId: "user_adv_001",
    sigilo: "restrito",
    razaoAtencao: "prazo",
    status: "em_triagem"
  }
];

const mvpProfiles = mvpProfileCatalog.profiles;

const dossierTypes = Object.fromEntries(
  mvpProfiles.map((profile) => [profile.dossier_code, profile.dossier_label])
);

const dossierAliases = Object.fromEntries(
  mvpProfiles.flatMap((profile) =>
    (profile.legacy_aliases || []).map((alias) => [alias, profile.dossier_code])
  )
);

const dossiers = [];

const documentos = [
  {
    id: "doc_001",
    dajId: "daj_2026_0001",
    titulo: "Contrato de prestação de serviços",
    status: "pendente_conferencia",
    origem: "cliente",
    downloadUrl: "/documentos/contrato-prestacao-servicos-demo.txt"
  },
  {
    id: "doc_002",
    dajId: "daj_2026_0001",
    titulo: "Comprovantes de pagamento",
    status: "faltante",
    origem: "solicitado_ao_cliente"
  }
];

const authProfiles = [
  "admin_sistema",
  "advogado_lider",
  "advogado",
  "assessor_chefe",
  "assessor",
  "secretaria",
  "estagio",
  "academia",
  "estudante",
  "cidadao",
  "perito",
  "parceiro",
  "escritorio",
  "empresa",
  "orgao_publico",
  "magistrado",
  "ministerio_publico",
  "autoridade_policial"
];

const profilePermissions = {
  admin_sistema: ["auth:read", "dajs:read", "dajs:write", "documents:read", "processes:read", "audit:write"],
  advogado_lider: ["auth:read", "dajs:read", "dajs:write", "documents:read", "processes:read", "audit:write"],
  advogado: ["auth:read", "dajs:read", "dajs:write", "documents:read", "processes:read", "audit:write"],
  assessor_chefe: ["auth:read", "dajs:read", "documents:read", "processes:read", "audit:write"],
  assessor: ["auth:read", "dajs:read", "documents:read", "processes:read"],
  secretaria: ["auth:read", "dajs:read", "documents:read"],
  estagio: ["auth:read", "dajs:read"],
  academia: ["auth:read"],
  estudante: ["auth:read"],
  cidadao: ["auth:read"],
  perito: ["auth:read", "documents:read"],
  parceiro: ["auth:read"],
  escritorio: ["auth:read", "dajs:read", "documents:read", "processes:read"],
  empresa: ["auth:read", "documents:read"],
  orgao_publico: ["auth:read", "processes:read"],
  magistrado: ["auth:read", "processes:read"],
  ministerio_publico: ["auth:read", "processes:read"],
  autoridade_policial: ["auth:read", "documents:read", "processes:read"]
};

const enforceApiAuth = process.env.AUTH_ENFORCE_API === "true";

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

function randomToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString("base64url");
}

function sha256Base64url(value) {
  return crypto.createHash("sha256").update(value).digest("base64url");
}

function getAuthSecret() {
  return process.env.AUTH_COOKIE_SECRET || process.env.JWT_SECRET;
}

function signPayload(payload) {
  const secret = getAuthSecret();
  if (!secret || secret === "troque-esta-chave") {
    throw new Error("AUTH_COOKIE_SECRET nao configurado");
  }
  const encoded = base64url(JSON.stringify(payload));
  const signature = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

function verifyPayload(value) {
  const secret = getAuthSecret();
  if (!secret || !value || !value.includes(".")) return null;
  const [encoded, signature] = value.split(".");
  const expected = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");
  if (signature.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    if (payload.expiresAt && Date.now() > payload.expiresAt) return null;
    return payload;
  } catch (_) {
    return null;
  }
}

function parseCookies(req) {
  return String(req.headers.cookie || "")
    .split(";")
    .map((cookie) => cookie.trim())
    .filter(Boolean)
    .reduce((cookies, cookie) => {
      const separator = cookie.indexOf("=");
      if (separator === -1) return cookies;
      cookies[decodeURIComponent(cookie.slice(0, separator))] = decodeURIComponent(cookie.slice(separator + 1));
      return cookies;
    }, {});
}

function serializeCookie(name, value, options = {}) {
  const parts = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`];
  if (options.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`);
  if (options.path) parts.push(`Path=${options.path}`);
  if (options.httpOnly) parts.push("HttpOnly");
  if (options.secure) parts.push("Secure");
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  return parts.join("; ");
}

function clearCookie(name) {
  return serializeCookie(name, "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
    secure: isProduction,
    sameSite: "Lax"
  });
}

function parseAllowedUsers() {
  return new Map(
    String(process.env.AUTH_ALLOWED_EMAILS || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [rawEmail, rawProfile = "advogado"] = item.split(":").map((value) => value.trim());
        const profile = authProfiles.includes(rawProfile) ? rawProfile : "advogado";
        return [rawEmail.toLowerCase(), profile];
      })
  );
}

function missingGoogleConfig() {
  return [
    ["GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID],
    ["GOOGLE_CLIENT_SECRET", process.env.GOOGLE_CLIENT_SECRET],
    ["AUTH_COOKIE_SECRET", getAuthSecret()],
    ["AUTH_ALLOWED_EMAILS", process.env.AUTH_ALLOWED_EMAILS]
  ]
    .filter(([, value]) => !value || value === "troque-esta-chave")
    .map(([name]) => name);
}

function getSession(req) {
  const session = verifyPayload(parseCookies(req).jus9_session);
  if (!session || session.kind !== "jus9_session") return null;
  return session;
}

function hasPermission(session, permission) {
  if (!session || !session.profile) return false;
  return (profilePermissions[session.profile] || []).includes(permission);
}

function requireAuth(req, res, next) {
  const session = getSession(req);
  if (!session) return res.status(401).json({ ok: false, error: "sessao_obrigatoria" });
  req.auth = session;
  return next();
}

function requirePermission(permission) {
  return (req, res, next) => {
    const session = req.auth || getSession(req);
    if (!session) return res.status(401).json({ ok: false, error: "sessao_obrigatoria" });
    if (!hasPermission(session, permission)) {
      return res.status(403).json({ ok: false, error: "perfil_sem_permissao", permission });
    }
    req.auth = session;
    return next();
  };
}

function protectWhenEnabled(permission) {
  return (req, res, next) => {
    if (!enforceApiAuth) return next();
    return requireAuth(req, res, () => requirePermission(permission)(req, res, next));
  };
}

function canAccessSecret({ user, item }) {
  // Regra máxima: Secreto/Cofre pertence ao advogado titular.
  if (!item || !["secreto", "cofre"].includes(item.sigilo || item.status)) return true;
  return user && user.id === item.advogadoTitularId;
}

app.get("/health", (_, res) => res.json({ ok: true, service: "Jus 9 MVP Backend" }));

app.get("/auth/google/start", (req, res) => {
  const missing = missingGoogleConfig();
  if (missing.length) {
    return res.status(501).type("html").send(`<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>Login Google em preparacao</title></head>
<body><h1>Login Google preparado com seguranca.</h1>
<p>Configure as variaveis de ambiente do backend antes de ativar o OAuth real.</p>
<p>Variaveis pendentes: <code>${missing.join(", ")}</code>.</p>
<p>Nenhum segredo deve ser publicado no GitHub.</p></body></html>`);
  }

  const state = randomToken();
  const verifier = randomToken(48);
  const challenge = sha256Base64url(verifier);
  const nonce = randomToken();
  const returnTo = normalizeAuthReturnTo(req.query.return_to);
  const tx = signPayload({
    kind: "google_oauth_tx",
    state,
    verifier,
    nonce,
    returnTo,
    issuedAt: Date.now(),
    expiresAt: Date.now() + 10 * 60 * 1000
  });
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: googleCallbackUrl,
    response_type: "code",
    scope: "openid email profile",
    state,
    nonce,
    code_challenge: challenge,
    code_challenge_method: "S256",
    prompt: "select_account"
  });
  res.setHeader(
    "Set-Cookie",
    serializeCookie("jus9_oauth_tx", tx, {
      maxAge: 600,
      path: "/",
      httpOnly: true,
      secure: isProduction,
      sameSite: "Lax"
    })
  );
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
});

app.get("/auth/google/callback", async (req, res) => {
  const tx = verifyPayload(parseCookies(req).jus9_oauth_tx);
  if (!tx || tx.kind !== "google_oauth_tx" || tx.state !== req.query.state) {
    return res.status(400).json({ ok: false, error: "oauth_state_invalido" });
  }
  if (req.query.error) {
    return res.status(400).json({ ok: false, error: "google_oauth_recusado" });
  }
  if (!req.query.code) {
    return res.status(400).json({ ok: false, error: "codigo_oauth_ausente" });
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: String(req.query.code),
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: googleCallbackUrl,
        grant_type: "authorization_code",
        code_verifier: tx.verifier
      })
    });
    if (!tokenResponse.ok) {
      return res.status(502).json({ ok: false, error: "falha_token_google" });
    }
    const token = await tokenResponse.json();
    const userInfoResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${token.access_token}` }
    });
    if (!userInfoResponse.ok) {
      return res.status(502).json({ ok: false, error: "falha_perfil_google" });
    }
    const userInfo = await userInfoResponse.json();
    const email = String(userInfo.email || "").toLowerCase();
    const allowedUsers = parseAllowedUsers();
    const profile = allowedUsers.get(email);
    if (!email || userInfo.email_verified !== true || !profile) {
      return res.status(403).json({ ok: false, error: "email_nao_autorizado" });
    }

    const session = signPayload({
      kind: "jus9_session",
      provider: "google",
      emailHash: sha256Base64url(email),
      googleSubHash: sha256Base64url(String(userInfo.sub || "")),
      profile,
      issuedAt: Date.now(),
      expiresAt: Date.now() + 8 * 60 * 60 * 1000
    });
    console.info("auth.login", { provider: "google", profile, emailHash: sha256Base64url(email) });
    res.setHeader("Set-Cookie", [
      clearCookie("jus9_oauth_tx"),
      serializeCookie("jus9_session", session, {
        maxAge: 8 * 60 * 60,
        path: "/",
        httpOnly: true,
        secure: isProduction,
        sameSite: "Lax"
      })
    ]);
    return res.redirect(getAuthSuccessRedirect(normalizeAuthReturnTo(tx.returnTo)));
  } catch (error) {
    console.error("auth.google.callback", { message: error.message });
    return res.status(502).json({ ok: false, error: "falha_oauth_google" });
  }
});

app.get("/api/auth/me", (req, res) => {
  const session = getSession(req);
  if (!session) return res.status(401).json({ authenticated: false });
  res.json({
    authenticated: true,
    provider: session.provider,
    profile: session.profile,
    emailHash: session.emailHash,
    expiresAt: new Date(session.expiresAt).toISOString()
  });
});

app.get("/api/auth/permissions", requireAuth, (req, res) => {
  res.json({
    profile: req.auth.profile,
    permissions: profilePermissions[req.auth.profile] || []
  });
});

app.post("/auth/logout", (req, res) => {
  res.setHeader("Set-Cookie", clearCookie("jus9_session"));
  res.status(204).end();
});

app.get("/api/profiles", (_, res) =>
  res.json({
    schema: mvpProfileCatalog.schema,
    profiles: mvpProfiles,
    internalProfiles,
    aliases: dossierAliases
  })
);

app.get("/api/dajs", protectWhenEnabled("dajs:read"), (_, res) => res.json({ items: dajs }));

app.post("/api/dajs", protectWhenEnabled("dajs:write"), (req, res) => {
  const next = {
    id: `daj_${Date.now()}`,
    numero: `DAJ-2026-${String(dajs.length + 1).padStart(4, "0")}`,
    cliente: req.body.cliente || "Cliente sem nome",
    areaAparente: req.body.areaAparente || "Ainda não classificada",
    responsavel: req.body.responsavel || "A definir",
    advogadoTitularId: req.body.advogadoTitularId || null,
    sigilo: req.body.sigilo || "comum",
    razaoAtencao: req.body.razaoAtencao || "outro",
    status: "em_triagem"
  };
  dajs.push(next);
  res.status(201).json(next);
});

app.get("/api/dajs/:id/documentos", protectWhenEnabled("documents:read"), (req, res) => {
  res.json({ items: documentos.filter((d) => d.dajId === req.params.id) });
});

app.get("/api/dossiers", protectWhenEnabled("dajs:read"), (req, res) => {
  const requestedCode = String(req.query.code || "").toUpperCase();
  const code = dossierAliases[requestedCode] || requestedCode;
  const items = code ? dossiers.filter((item) => item.code === code) : dossiers;
  res.json({ items, types: dossierTypes });
});

app.post("/api/dossiers", protectWhenEnabled("dajs:write"), (req, res) => {
  const requestedCode = String(req.body.code || "").toUpperCase();
  const code = dossierAliases[requestedCode] || requestedCode;
  if (!dossierTypes[code]) {
    return res.status(400).json({ ok: false, error: "tipo_dossie_invalido", allowed: Object.keys(dossierTypes) });
  }
  const sameTypeCount = dossiers.filter((item) => item.code === code).length + 1;
  const next = {
    id: `dossier_${Date.now()}`,
    code,
    number: `${code}-2026-${String(sameTypeCount).padStart(4, "0")}`,
    type: dossierTypes[code],
    title: String(req.body.title || "Dossie sem titulo").slice(0, 120),
    owner: String(req.body.owner || "A definir").slice(0, 100),
    attention: String(req.body.attention || "revisao_humana").slice(0, 80),
    secrecy: ["comum", "restrito"].includes(req.body.secrecy) ? req.body.secrecy : "comum",
    status: "em_triagem",
    createdAt: new Date().toISOString()
  };
  dossiers.push(next);
  res.status(201).json(next);
});

app.post("/api/processos/consulta", protectWhenEnabled("processes:read"), (req, res) => {
  const { numeroCnj, tribunal, fonte, dajId } = req.body;
  res.json({
    fonte: fonte || "simulacao",
    numeroCnj,
    tribunal,
    dajId,
    aviso: "Consulta demonstrativa. Integração DataJud/CNJ deve respeitar disponibilidade, sigilo, limites e peculiaridades por tribunal.",
    movimentos: [
      { data: "2026-05-08", movimento: "Conclusos para decisão" },
      { data: "2026-05-06", movimento: "Juntada de documento" },
      { data: "2026-05-04", movimento: "Intimação publicada" }
    ]
  });
});

app.post("/api/auditoria", protectWhenEnabled("audit:write"), (req, res) => {
  res.status(201).json({
    ok: true,
    registro: {
      id: `audit_${Date.now()}`,
      ...req.body,
      criadoEm: new Date().toISOString()
    }
  });
});

app.listen(port, () => {
  console.log(`Jus 9 MVP Backend ouvindo na porta ${port}`);
});
