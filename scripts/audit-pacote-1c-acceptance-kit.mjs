import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const kitRelative = "governanca/KIT_ACEITE_HUMANO_PACOTE_1C_DAJ_REVERSIVEL_2026-07-19.md";
const preAcceptanceRelative = "governanca/RELATORIO_PRE_ACEITE_PACOTE_1C_DAJ_REVERSIVEL_2026-07-18.md";
const kit = fs.readFileSync(path.join(root, kitRelative), "utf8");
const preAcceptance = fs.readFileSync(path.join(root, preAcceptanceRelative), "utf8");

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

for (const field of ["id", "versao", "autor", "revisor_responsavel", "data", "status", "classificacao", "hash"]) {
  assert(new RegExp(`(^|\\n)${field}:`).test(kit), `metadado ausente no kit: ${field}`);
}

for (const phrase of [
  "PUBLICO-INSTITUCIONAL / SEM DADOS REAIS",
  "HOMOLOGACAO_TECNICA_APROVADA / ACEITE_HUMANO_PENDENTE",
  "https://jus9tecnologia.com.br/app-atendimento-inicial.html",
  "https://jus9tecnologia.com.br/app-clientes.html?dajId=<dajId>",
  "https://jus9tecnologia.com.br/app-processos.html?dajId=<dajId>",
  "https://jus9tecnologia.com.br/app-ia-profissional.html?dajId=<dajId>",
  "Parte Alfa Ficticia Pacote 1C",
  "123.456.789-09",
  "parte.alfa.pacote1c@example.invalid",
  "6666666-66.2099.8.24.0000",
  "EXCLUIR TESTE <dajId>",
  "CONCLUIDO",
  "MANTER_EM_HOMOLOGACAO",
  "BLOQUEADO_POR_SESSAO",
  "ROLLBACK_INVESTIGAR"
]) {
  assert(kit.includes(phrase), `frase obrigatoria ausente no kit: ${phrase}`);
}

for (const stopCondition of [
  "Sessao autorizada indisponivel",
  "Qualquer dado real aparecer",
  "CPF integral aparecer",
  "Mutacao funcionar sem sessao",
  "Sistema inventar link de Drive",
  "Remocao nao gerar tombstone"
]) {
  assert(kit.includes(stopCondition), `condicao de parada ausente: ${stopCondition}`);
}

const evidenceRows = [...kit.matchAll(/^\| (?:[1-9]|1[0-6]) \|/gm)];
assert(evidenceRows.length === 16, `quadro de evidencias deveria conter 16 passos; encontrou ${evidenceRows.length}`);
assert(kit.includes("| Passo | URL | Resultado esperado | Evidencia | Decisao | Observacoes |"), "cabecalho do quadro de evidencias ausente");
const documentsDatasetRow = kit.match(/^\| Documentos \|.*$/m)?.[0] || "";
assert(
  documentsDatasetRow === "| Documentos | `Documento ficticio A; Documento ficticio B` |",
  "linha Documentos do dataset deve permanecer integra e isolada"
);
assert(!documentsDatasetRow.includes("6666666-66.2099.8.24.0000"), "numero de processo nao pode contaminar o campo Documentos");
assert(!/drive\.google\.com|docs\.google\.com/i.test(kit), "kit nao deve conter link real de Drive ou Docs");
assert(!/sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,}|AIza[A-Za-z0-9_-]{20,}|Bearer\s+[A-Za-z0-9._-]+/.test(kit), "kit contem padrao parecido com segredo");

const emails = [...kit.matchAll(/[A-Z0-9._%+-]+@([A-Z0-9.-]+\.[A-Z]{2,})/gi)].map((match) => match[0]);
assert(emails.length === 1 && emails[0] === "parte.alfa.pacote1c@example.invalid", "kit deve conter somente e-mail ficticio example.invalid");
assert(preAcceptance.includes("HOMOLOGACAO_TECNICA_APROVADA / ACEITE_HUMANO_PENDENTE"), "relatorio base precisa preservar estado pendente");
assert(preAcceptance.includes("Sem login autorizado"), "relatorio base precisa declarar ausencia de aceite humano");

if (failures.length) {
  console.error("Falhas no kit de aceite humano do Pacote 1C:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("PACOTE_1C_ACCEPTANCE_KIT_OK passos=16 dados=ficticios porta=humana");
