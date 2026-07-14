import worker from "../worker.js";
import { signPayload } from "../functions/_shared/oauth.js";

function memoryKv() {
  const store = new Map();
  return {
    get: async (key, type) => {
      const value = store.get(key) || null;
      return type === "json" && value ? JSON.parse(value) : value;
    },
    put: async (key, value) => store.set(key, value),
    delete: async (key) => store.delete(key)
  };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const userMemoryKv = memoryKv();
const dajProcessKv = memoryKv();
const env = {
  AUTH_COOKIE_SECRET: "segredo-ficticio-homologacao-daj-comprido",
  AUTH_ALLOWED_EMAILS: "advogado.ficticio@example.invalid:advogado",
  GOOGLE_CLIENT_ID: "google-client-ficticio",
  GOOGLE_CLIENT_SECRET: "google-secret-ficticio",
  PUBLIC_SITE_ORIGIN: "https://jus9.invalid",
  JUS9_RELEASE: "homologacao-daj-local",
  DATAJUD_API_KEY: "datajud-ficticia",
  JUS9_TRIBUNAIS_GATEWAY_TOKEN: "gateway-ficticio",
  JUS9_CHARLIE_INTERNAL_TOKEN: "charlie-interno-ficticio",
  JUS9_DATAJUD_CACHE: memoryKv(),
  JUS9_USER_MEMORY: userMemoryKv,
  JUS9_DAJ_PROCESS_LINKS: dajProcessKv,
  JUS9_DAJ_PII_INDEX_KEY: "chave-hmac-ficticia-homologacao-daj",
  JUS9_PROFILE_REQUESTS: memoryKv(),
  ASSETS: { fetch: async () => new Response("asset", { status: 200 }) }
};

const session = await signPayload({
  kind: "jus9_session",
  provider: "controlled-test",
  emailHash: "email-hash-advogado-ficticio",
  googleSubHash: "google-sub-advogado-ficticio",
  profile: "advogado",
  accessMode: "homologacao",
  authNucleus: "mvp",
  issuedAt: Date.now(),
  expiresAt: Date.now() + 60_000
}, env);
const cookie = `jus9_session=${encodeURIComponent(session)}`;

async function call(path, options = {}) {
  return worker.fetch(new Request(`https://jus9.invalid${path}`, options), env);
}

let response = await call("/api/health");
let data = await response.json();
assert(response.status === 200 && data.status === "ready", "health DAJ deveria estar pronto");
assert(data.checks?.userMemory?.isolated === true, "memoria do usuario deveria usar KV dedicado");

response = await call("/api/charlie/memory", {
  method: "POST",
  headers: { cookie, "content-type": "application/json", origin: "https://jus9tecnologia.com.br" },
  body: JSON.stringify({
    module: "DAJ",
    focus: "homologacao ficticia do modelo-mae",
    userMemory: {
      enabled: true,
      syncDrive: true,
      name: "Advogado Ficticio",
      role: "homologacao",
      preferences: "resposta direta com fontes",
      avoid: "protocolo repetitivo",
      standingInstructions: "usar somente dados ficticios"
    },
    instrument: {
      enabled: true,
      name: "DAJ Advogados",
      role: "modelo-mae",
      autonomy: "proativa",
      drive: "auto_governado",
      response: "relatorio_e_acao",
      sources: "oficiais_academicas",
      notes: "homologacao local"
    }
  })
});
data = await response.json();
assert(response.status === 200 && data.storage?.binding === "JUS9_USER_MEMORY", "memoria oficial DAJ nao usou KV dedicado");
assert(data.instruments?.DAJ?.drive === "auto_governado", "instrumento DAJ perdeu politica de Drive");

const upload = new FormData();
upload.set("module", "DAJ");
upload.append("file", new Blob([
  "Atendimento inteiramente ficticio. Parte Alfa solicita revisao humana de minuta e pesquisa de fontes oficiais."
], { type: "text/plain" }), "atendimento-ficticio.txt");
response = await call("/api/attachments/extract", { method: "POST", headers: { cookie }, body: upload });
data = await response.json();
assert(response.status === 200 && data.storage === "nao_salvo", "upload temporario nao deve ser persistido automaticamente");
assert(data.files?.[0]?.readable === true && /inteiramente ficticio/i.test(data.files[0].text), "texto do anexo ficticio nao foi extraido");

const baseIntake = {
  partyName: "Parte Alfa Ficticia",
  cpf: "123.456.789-09",
  contact: "parte.alfa@example.invalid",
  area: "Familia",
  urgency: "Importante",
  attentionReason: "documento faltante",
  secrecyLevel: "Restrito",
  caseSummary: "Atendimento inteiramente ficticio para homologacao do modelo-mae.",
  documentsMentioned: "Documento ficticio A."
};
const baseLink = {
  tribunal: "tjsc",
  tribunalLabel: "Tribunal de Justica de Santa Catarina",
  title: "Homologacao ficticia DAJ-processo"
};

response = await call("/api/dajs", {
  method: "POST",
  headers: {
    cookie,
    "content-type": "application/json",
    "idempotency-key": "daj-homologacao-intake-0001",
    origin: "https://jus9tecnologia.com.br"
  },
  body: JSON.stringify(baseIntake)
});
data = await response.json();
assert(response.status === 201 && data.item?.processLinked === false, "primeiro DAJ deveria nascer no atendimento antes do processo");
const firstDajId = data.item.id;

response = await call("/api/dajs", {
  method: "POST",
  headers: { cookie, "content-type": "application/json", "idempotency-key": "daj-homologacao-intake-0002" },
  body: JSON.stringify(baseIntake)
});
data = await response.json();
assert(response.status === 201 && data.item.id !== firstDajId, "mesma parte deveria poder possuir segundo DAJ");
const secondDajId = data.item.id;

response = await call("/api/daj-process-links", {
  method: "POST",
  headers: { cookie, "content-type": "application/json", origin: "https://jus9tecnologia.com.br" },
  body: JSON.stringify({ ...baseLink, dajId: firstDajId, processNumber: "0000001-00.2099.8.24.0001" })
});
assert(response.status === 200, "primeiro DAJ deveria receber vinculo processual posterior");

response = await call("/api/daj-process-links", {
  method: "POST",
  headers: { cookie, "content-type": "application/json" },
  body: JSON.stringify({ ...baseLink, dajId: secondDajId, processNumber: "0000002-00.2099.8.24.0001" })
});
assert(response.status === 200, "segundo DAJ deveria receber processo diferente");

response = await call("/api/judicial/parties/search", {
  method: "POST",
  headers: { cookie, "content-type": "application/json" },
  body: JSON.stringify({ searchType: "nome", nome: "Parte Alfa" })
});
data = await response.json();
assert(response.status === 200 && data.total === 2, "nome deveria reunir varios DAJs");
assert(data.items.every((item) => item.cpfMasked === "***.***.***-09"), "CPF deveria permanecer mascarado");

response = await call("/api/judicial/parties/search", {
  method: "POST",
  headers: { cookie, "content-type": "application/json" },
  body: JSON.stringify({ searchType: "cpf", cpf: "123.456.789-09" })
});
data = await response.json();
assert(response.status === 200 && data.total === 2, "CPF governado deveria reunir varios DAJs");

response = await call("/api/daj-process-links", {
  method: "POST",
  headers: { cookie, "content-type": "application/json" },
  body: JSON.stringify({ ...baseLink, dajId: "DAJ-2099-0003", processNumber: "0000001-00.2099.8.24.0001" })
});
data = await response.json();
assert(response.status === 409 && data.error === "processo_ja_vinculado", "processo nao deve receber segundo DAJ");

const indexRaw = await dajProcessKv.get("daj-process-links:index");
const auditRaw = await dajProcessKv.get("daj-process-links:audit");
const detailRaw = await dajProcessKv.get(`daj-record:v1:${firstDajId}`);
assert(!String(indexRaw).includes("12345678909"), "indice nao deve persistir CPF integral");
assert(!String(detailRaw).includes("12345678909"), "detalhe DAJ nao deve persistir CPF integral");
assert(!String(indexRaw).includes("parte.alfa@example.invalid") && String(detailRaw).includes("parte.alfa@example.invalid"), "contato deve ficar fora do indice e dentro do detalhe autorizado");
assert(String(indexRaw).includes("cpfLookupHash"), "indice deveria persistir somente hash HMAC para pesquisa exata");
assert(!String(auditRaw).includes("12345678909"), "auditoria nao deve persistir CPF integral");
assert(Array.isArray(JSON.parse(auditRaw)) && JSON.parse(auditRaw).length >= 5, "auditoria DAJ deveria registrar cadastros, vinculos e bloqueio");

response = await call("/api/charlie/memory", { method: "DELETE", headers: { cookie } });
data = await response.json();
assert(response.status === 200 && data.deleted === true, "usuario deveria conseguir limpar memoria oficial");

console.log("DAJ_HOMOLOGATION_TECHNICAL_OK memory,upload,intake-index,links,multi-daj,cpf-mask,audit,delete");
