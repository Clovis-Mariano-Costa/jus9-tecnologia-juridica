const DATAJUD_BASE_URL = "https://api-publica.datajud.cnj.jus.br";

export const DATAJUD_ALIASES = {
  stj: { alias: "api_publica_stj", name: "Superior Tribunal de Justica" },
  stm: { alias: "api_publica_stm", name: "Superior Tribunal Militar" },
  tse: { alias: "api_publica_tse", name: "Tribunal Superior Eleitoral" },
  tst: { alias: "api_publica_tst", name: "Tribunal Superior do Trabalho" },
  trf1: { alias: "api_publica_trf1", name: "Tribunal Regional Federal da 1a Regiao" },
  trf2: { alias: "api_publica_trf2", name: "Tribunal Regional Federal da 2a Regiao" },
  trf3: { alias: "api_publica_trf3", name: "Tribunal Regional Federal da 3a Regiao" },
  trf4: { alias: "api_publica_trf4", name: "Tribunal Regional Federal da 4a Regiao" },
  trf5: { alias: "api_publica_trf5", name: "Tribunal Regional Federal da 5a Regiao" },
  trf6: { alias: "api_publica_trf6", name: "Tribunal Regional Federal da 6a Regiao" },
  tjac: { alias: "api_publica_tjac", name: "Tribunal de Justica do Acre" },
  tjal: { alias: "api_publica_tjal", name: "Tribunal de Justica de Alagoas" },
  tjam: { alias: "api_publica_tjam", name: "Tribunal de Justica do Amazonas" },
  tjap: { alias: "api_publica_tjap", name: "Tribunal de Justica do Amapa" },
  tjba: { alias: "api_publica_tjba", name: "Tribunal de Justica da Bahia" },
  tjce: { alias: "api_publica_tjce", name: "Tribunal de Justica do Ceara" },
  tjdft: { alias: "api_publica_tjdft", name: "Tribunal de Justica do Distrito Federal e Territorios" },
  tjes: { alias: "api_publica_tjes", name: "Tribunal de Justica do Espirito Santo" },
  tjgo: { alias: "api_publica_tjgo", name: "Tribunal de Justica de Goias" },
  tjma: { alias: "api_publica_tjma", name: "Tribunal de Justica do Maranhao" },
  tjmg: { alias: "api_publica_tjmg", name: "Tribunal de Justica de Minas Gerais" },
  tjms: { alias: "api_publica_tjms", name: "Tribunal de Justica do Mato Grosso do Sul" },
  tjmt: { alias: "api_publica_tjmt", name: "Tribunal de Justica do Mato Grosso" },
  tjpa: { alias: "api_publica_tjpa", name: "Tribunal de Justica do Para" },
  tjpb: { alias: "api_publica_tjpb", name: "Tribunal de Justica da Paraiba" },
  tjpe: { alias: "api_publica_tjpe", name: "Tribunal de Justica de Pernambuco" },
  tjpi: { alias: "api_publica_tjpi", name: "Tribunal de Justica do Piaui" },
  tjpr: { alias: "api_publica_tjpr", name: "Tribunal de Justica do Parana" },
  tjrj: { alias: "api_publica_tjrj", name: "Tribunal de Justica do Rio de Janeiro" },
  tjrn: { alias: "api_publica_tjrn", name: "Tribunal de Justica do Rio Grande do Norte" },
  tjro: { alias: "api_publica_tjro", name: "Tribunal de Justica de Rondonia" },
  tjrr: { alias: "api_publica_tjrr", name: "Tribunal de Justica de Roraima" },
  tjrs: { alias: "api_publica_tjrs", name: "Tribunal de Justica do Rio Grande do Sul" },
  tjsc: { alias: "api_publica_tjsc", name: "Tribunal de Justica de Santa Catarina" },
  tjse: { alias: "api_publica_tjse", name: "Tribunal de Justica de Sergipe" },
  tjsp: { alias: "api_publica_tjsp", name: "Tribunal de Justica de Sao Paulo" },
  tjto: { alias: "api_publica_tjto", name: "Tribunal de Justica do Tocantins" },
};

for (let i = 1; i <= 24; i += 1) {
  const code = `trt${i}`;
  DATAJUD_ALIASES[code] = {
    alias: `api_publica_trt${i}`,
    name: `Tribunal Regional do Trabalho da ${i}a Regiao`,
  };
}

const STATE_TRIBUNAL_BY_CNJ_CODE = {
  "01": "tjac",
  "02": "tjal",
  "03": "tjam",
  "04": "tjap",
  "05": "tjba",
  "06": "tjce",
  "07": "tjdft",
  "08": "tjes",
  "09": "tjgo",
  "10": "tjma",
  "11": "tjmt",
  "12": "tjms",
  "13": "tjmg",
  "14": "tjpa",
  "15": "tjpb",
  "16": "tjpr",
  "17": "tjpe",
  "18": "tjpi",
  "19": "tjrj",
  "20": "tjrn",
  "21": "tjrs",
  "22": "tjro",
  "23": "tjrr",
  "24": "tjsc",
  "25": "tjse",
  "26": "tjsp",
  "27": "tjto",
};

export function missingDataJudConfig(env) {
  const missing = [];
  const hasApiKey = Boolean(String(env.DATAJUD_API_KEY || "").trim());
  const hasBasic = Boolean(String(env.DATAJUD_USERNAME || "").trim() && String(env.DATAJUD_PASSWORD || "").trim());
  if (!hasApiKey && !hasBasic) missing.push("DATAJUD_API_KEY ou DATAJUD_USERNAME/DATAJUD_PASSWORD");
  return missing;
}

export function publicDataJudStatus(env) {
  return {
    provider: "CNJ/DataJud",
    mode: "leitura_metadados",
    endpointBase: DATAJUD_BASE_URL,
    configured: missingDataJudConfig(env).length === 0,
    gatewayTokenConfigured: Boolean(String(env.JUS9_TRIBUNAIS_GATEWAY_TOKEN || "").trim()),
    supportedAliases: Object.entries(DATAJUD_ALIASES).map(([code, value]) => ({
      code,
      alias: value.alias,
      name: value.name,
    })),
    limits: [
      "Somente leitura de metadados, capas e movimentacoes publicas.",
      "Nao acessa inteiro teor sigiloso, partes protegidas, peticionamento ou protocolo.",
      "Uso real exige revisao humana e conferencia no tribunal competente.",
    ],
  };
}

export function normalizeProcessNumber(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length === 20 ? digits : "";
}

export function inferDataJudTribunalFromProcessNumber(numeroProcesso) {
  const digits = normalizeProcessNumber(numeroProcesso);
  if (!digits) return "";
  const justice = digits.slice(13, 14);
  const courtCode = digits.slice(14, 16);
  if (justice === "4") return DATAJUD_ALIASES[`trf${Number(courtCode)}`] ? `trf${Number(courtCode)}` : "";
  if (justice === "5") return DATAJUD_ALIASES[`trt${Number(courtCode)}`] ? `trt${Number(courtCode)}` : "";
  if (justice === "8") return STATE_TRIBUNAL_BY_CNJ_CODE[courtCode] || "";
  return "";
}

export function normalizeDataJudTribunal(value) {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) return "";
  const compact = raw
    .replace(/^api_publica_/, "")
    .replace(/^tribunal\s+de\s+justica\s+/, "tj")
    .replace(/[^a-z0-9]/g, "");
  return DATAJUD_ALIASES[compact] ? compact : "";
}

function dataJudAuthHeaders(env) {
  const apiKey = String(env.DATAJUD_API_KEY || "").trim();
  if (apiKey) return { Authorization: `APIKey ${apiKey}` };
  const username = String(env.DATAJUD_USERNAME || "").trim();
  const password = String(env.DATAJUD_PASSWORD || "").trim();
  if (username && password) return { Authorization: `Basic ${btoa(`${username}:${password}`)}` };
  return {};
}

function clampSize(value) {
  const size = Number.parseInt(String(value || ""), 10);
  if (!Number.isFinite(size)) return 5;
  return Math.max(1, Math.min(size, 20));
}

export function buildDataJudSearch(body) {
  const numeroProcesso = normalizeProcessNumber(body?.numeroProcesso || body?.numero || body?.processo);
  if (!numeroProcesso) {
    return { ok: false, status: 400, error: "numero_processo_cnj_obrigatorio" };
  }
  const requestedTribunal = normalizeDataJudTribunal(body?.tribunal || body?.alias || body?.sigla);
  const inferredTribunal = inferDataJudTribunalFromProcessNumber(numeroProcesso);
  const tribunal = requestedTribunal || inferredTribunal;
  if (!tribunal) {
    return { ok: false, status: 400, error: "tribunal_obrigatorio_ou_nao_inferido" };
  }
  const meta = DATAJUD_ALIASES[tribunal];
  return {
    ok: true,
    tribunal,
    alias: meta.alias,
    tribunalName: meta.name,
    numeroProcesso,
    url: `${DATAJUD_BASE_URL}/${meta.alias}/_search`,
    payload: {
      size: clampSize(body?.size),
      query: {
        match: {
          numeroProcesso,
        },
      },
    },
  };
}

export async function searchDataJud(env, body) {
  const missing = missingDataJudConfig(env);
  if (missing.length) {
    return { ok: false, status: 501, payload: { ok: false, error: "datajud_configuracao_pendente", missing } };
  }
  const search = buildDataJudSearch(body);
  if (!search.ok) {
    return { ok: false, status: search.status, payload: { ok: false, error: search.error } };
  }
  const response = await fetch(search.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...dataJudAuthHeaders(env),
    },
    body: JSON.stringify(search.payload),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    return {
      ok: false,
      status: 502,
      payload: {
        ok: false,
        error: "falha_datajud",
        upstreamStatus: response.status,
        tribunal: search.tribunal,
        alias: search.alias,
      },
    };
  }
  return {
    ok: true,
    status: 200,
    payload: normalizeDataJudResponse(search, data),
  };
}

function normalizeDataJudResponse(search, data) {
  const hits = Array.isArray(data?.hits?.hits) ? data.hits.hits : [];
  const total = typeof data?.hits?.total?.value === "number"
    ? data.hits.total.value
    : typeof data?.hits?.total === "number"
      ? data.hits.total
      : hits.length;
  return {
    ok: true,
    source: "CNJ/DataJud",
    sourceUrl: "https://www.cnj.jus.br/sistemas/datajud/api-publica/",
    tribunal: search.tribunal,
    alias: search.alias,
    tribunalName: search.tribunalName,
    numeroProcesso: search.numeroProcesso,
    total,
    results: hits.map(normalizeDataJudHit),
    governance: {
      classification: "METADADOS_PROCESSUAIS_PUBLICOS",
      access: "leitura",
      noPetitioning: true,
      noSensitiveDisclosure: true,
      review: "conferir no tribunal competente antes de uso real",
    },
  };
}

function normalizeDataJudHit(hit) {
  const source = hit?._source || {};
  const movimentos = Array.isArray(source.movimentos) ? source.movimentos : [];
  return {
    id: String(source.id || hit?._id || "").slice(0, 160),
    tribunal: safeString(source.tribunal),
    numeroProcesso: safeString(source.numeroProcesso),
    dataAjuizamento: safeString(source.dataAjuizamento),
    grau: safeString(source.grau),
    nivelSigilo: source.nivelSigilo ?? null,
    formato: compactNamedCode(source.formato),
    sistema: compactNamedCode(source.sistema),
    classe: compactNamedCode(source.classe),
    assuntos: Array.isArray(source.assuntos) ? source.assuntos.slice(0, 8).map(compactNamedCode) : [],
    orgaoJulgador: compactNamedCode(source.orgaoJulgador),
    movimentos: movimentos
      .slice(-20)
      .map((movimento) => ({
        codigo: movimento?.codigo ?? null,
        nome: safeString(movimento?.nome),
        dataHora: safeString(movimento?.dataHora),
        orgaoJulgador: safeString(movimento?.orgaoJulgador?.nomeOrgao || movimento?.orgaoJulgador?.nome),
      })),
  };
}

function compactNamedCode(value) {
  if (!value || typeof value !== "object") return null;
  return {
    codigo: value.codigo ?? value.codigoOrgao ?? null,
    nome: safeString(value.nome || value.nomeOrgao),
  };
}

function safeString(value) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, 240);
}
