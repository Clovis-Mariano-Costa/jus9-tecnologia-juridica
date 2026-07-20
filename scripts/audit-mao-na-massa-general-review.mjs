import fs from "node:fs/promises";

const root = new URL("../", import.meta.url);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const review = await fs.readFile(new URL("governanca/RELATORIO_REVISAO_GERAL_MAO_NA_MASSA_PACOTES_2026-07-19.md", root), "utf8");

for (const field of ["id", "versao", "autor", "revisor_responsavel", "data", "status", "classificacao", "hash"]) {
  assert(new RegExp(`(^|\\n)${field}:`).test(review), `revisao geral sem metadado: ${field}`);
}

for (const phrase of [
  "O ultimo pacote do Mao na Massa e sempre a revisao de todos os pacotes",
  "nenhum pacote dependente de acao humana foi convertido em concluido por presuncao",
  "DEPENDENTE_DE_ACAO_HUMANA",
  "BLOQUEADO_ATE_REVERSIBILIDADE_1C",
  "REVISAO_EXECUTADA / VIDEO_ZIP_PENDENTES",
  "VIDEO_ZIP_PENDENTES",
  "MANTER_MAO_NA_MASSA_ABERTO_COM_PACOTES_SEGUROS_CONCLUIDOS",
]) {
  assert(review.includes(phrase), `revisao geral sem frase obrigatoria: ${phrase}`);
}

for (const packageNumber of ["0", "1", "2", "3", "4", "5", "5A", "6", "7", "8"]) {
  assert(review.includes(`| ${packageNumber} |`), `revisao geral sem Pacote ${packageNumber}`);
}

for (const url of [
  "https://jus9tecnologia.com.br/app-painel-mvps.html",
  "https://jus9tecnologia.com.br/app-clientes.html",
  "https://jus9tecnologia.com.br/app-demo-autor-editor.html",
  "https://jus9tecnologia.com.br/app-demo-cidadao.html",
  "https://jus9tecnologia.com.br/app-demo-escritorio.html",
  "https://jus9tecnologia.com.br/app-demo-empresa.html",
  "https://jus9tecnologia.com.br/app-demo-perito.html",
  "https://jus9tecnologia.com.br/app-demo-investidor.html",
  "https://jus9tecnologia.com.br/app-demo-professor.html",
  "https://jus9tecnologia.com.br/app-demo-estudante.html",
]) {
  assert(review.includes(url), `revisao geral sem URL publicada: ${url}`);
}

console.log("MAO_NA_MASSA_GENERAL_REVIEW_OK pacotes=10 pendencias=humanas-video-zip");
