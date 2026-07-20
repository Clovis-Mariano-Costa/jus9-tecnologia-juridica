import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cronograma = fs.readFileSync(path.join(root, "governanca", "CRONOGRAMA_MAO_NA_MASSA_CHARLIE_ECHO_v3.1.1.md"), "utf8");
const incidente = fs.readFileSync(path.join(root, "governanca", "RELATORIO_INCIDENTE_ANALISE_DAJ_RESPOSTA_EVASIVA_2026-07-19.md"), "utf8");
const panel = fs.readFileSync(path.join(root, "app-painel-mvps.html"), "utf8");

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

for (const field of ["id", "versao", "autor", "revisor_responsavel", "data", "status", "classificacao", "hash"]) {
  assert(new RegExp(`(^|\\n)${field}:`).test(cronograma), `cronograma v3.1.1 sem metadado: ${field}`);
}

for (const phrase of [
  "CORRIGIR_ANALISE_DAJ_ANTES_DE_REVERSIBILIDADE",
  "DAJ-2026-0002",
  "Laudo de Analise DAJ",
  "AGUARDANDO_NOVO_TESTE_HUMANO",
  "BLOQUEADO_ATE_LAUDO_SATISFATORIO",
  "BLOQUEADO_ATE_REVERSIBILIDADE_1C",
  "Revisao geral, video e ZIP final",
  "SEGUIR_COM_CORRECAO_DAJ_E_MANTER_BLOQUEIOS_HUMANOS",
]) {
  assert(cronograma.includes(phrase), `cronograma v3.1.1 sem frase obrigatoria: ${phrase}`);
}

for (const packageNumber of ["0", "1", "2A", "2B", "2C", "2D", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]) {
  assert(cronograma.includes(`| ${packageNumber} |`), `cronograma v3.1.1 sem Pacote ${packageNumber}`);
}

assert(cronograma.indexOf("| 12 | Revisao geral, video e ZIP final") > cronograma.indexOf("| 11 | DataJud read-only e validacao humana"), "Pacote 12 precisa permanecer por ultimo");
assert(incidente.includes("resposta_daj_sem_laudo_obrigatorio"), "incidente sem marcador tecnico de falha fechada");
assert(incidente.includes("/api/daj-process-links"), "incidente sem endpoint evasivo documentado");
assert(panel.includes('data-package="2" data-package-status="CONCLUIDO_COM_RESSALVA_CORRETIVA"'), "painel executivo corrente sem fechamento reconciliado do Pacote 2");

if (failures.length) {
  console.error("Falhas no Mao na Massa v3.1.1:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("MAO_NA_MASSA_V3_1_1_OK historico=incidente-DAJ-laudo corrente=pacote2-concluido-com-ressalva final=video-zip-revisao");
