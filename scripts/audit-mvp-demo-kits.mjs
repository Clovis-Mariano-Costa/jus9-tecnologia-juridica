import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const kits = [
  {
    code: "DED",
    file: "governanca/KIT_DEMO_DED_EDITORIAL_VITRINE_2026-07-19.md",
    rows: 12,
    required: [
      "PUBLICO-INSTITUCIONAL / SEM DADOS REAIS / SEM DRIVE REAL",
      "DED-MODELO-VITRINE-2026",
      "Autora Beta Ficticia",
      "Manual Ficticio da Oficina de Palavras",
      "https://jus9tecnologia.com.br/app-demo-autor-editor.html",
      "https://jus9tecnologia.com.br/app-ia-autor-editor.html",
      "https://jus9tecnologia.com.br/app-documentos-autor-editor.html",
      "https://jus9tecnologia.com.br/app-workspace-autor-editor.html",
      "nao promete publicacao",
      "Sem Drive real",
      "Sem contaminacao DAJ"
    ]
  },
  {
    code: "DIC",
    file: "governanca/KIT_DEMO_DIC_SOCIAL_VITRINE_2026-07-19.md",
    rows: 12,
    required: [
      "PUBLICO-INSTITUCIONAL / SEM DADOS REAIS / ORIENTACAO GERAL",
      "DIC-MODELO-VITRINE-2026",
      "Pessoa interessada ficticia",
      "Nao solicitar CPF",
      "https://jus9tecnologia.com.br/app-demo-cidadao.html",
      "https://jus9tecnologia.com.br/app-ia-cidadao.html",
      "https://jus9tecnologia.com.br/app-documentos-cidadao.html",
      "https://jus9tecnologia.com.br/app-workspace-cidadao.html",
      "encaminhamento humano",
      "Nao substituir advogado",
      "Sem link inventado"
    ]
  }
];

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

for (const kit of kits) {
  const text = fs.readFileSync(path.join(root, kit.file), "utf8");
  for (const field of ["id", "versao", "autor", "revisor_responsavel", "data", "status", "classificacao", "hash", "codigo_mvp"]) {
    assert(new RegExp(`(^|\\n)${field}:`).test(text), `${kit.code}: metadado ausente: ${field}`);
  }
  for (const phrase of kit.required) {
    assert(text.includes(phrase), `${kit.code}: frase obrigatoria ausente: ${phrase}`);
  }
  for (const decision of ["CONCLUIDO", "MANTER_EM_HOMOLOGACAO", "ROLLBACK_INVESTIGAR"]) {
    assert(text.includes(decision), `${kit.code}: decisao ausente: ${decision}`);
  }
  const evidenceRows = [...text.matchAll(/^\| (?:[1-9]|1[0-2]) \|/gm)];
  assert(evidenceRows.length === kit.rows, `${kit.code}: quadro deveria conter ${kit.rows} passos; encontrou ${evidenceRows.length}`);
  assert(text.includes("| Passo | URL | Resultado esperado | Evidencia | Decisao | Observacoes |"), `${kit.code}: cabecalho de evidencias ausente`);
  assert(!/drive\.google\.com|docs\.google\.com/i.test(text), `${kit.code}: kit nao deve conter link real de Drive ou Docs`);
  assert(!/sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,}|AIza[A-Za-z0-9_-]{20,}|Bearer\s+[A-Za-z0-9._-]+/.test(text), `${kit.code}: kit contem padrao parecido com segredo`);
  assert(!/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/.test(text), `${kit.code}: kit nao deve conter CPF numerico`);
  assert(!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text), `${kit.code}: kit nao deve conter e-mail`);
}

const prioritization = fs.readFileSync(path.join(root, "governanca", "MATRIZ_PRIORIZACAO_MVPS_CHARLIE_ECHO_v1.0.0.json"), "utf8");
assert(prioritization.includes("\"codes\": [\"DED\", \"DIC\"]"), "matriz de priorizacao deve manter DED e DIC na onda de vitrines");

if (failures.length) {
  console.error("Falhas nos kits demonstrativos dos MVPs:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("MVP_DEMO_KITS_OK kits=DED,DIC passos=24 dados=ficticios");
