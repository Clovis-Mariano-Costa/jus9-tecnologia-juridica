import fs from "node:fs/promises";

const root = new URL("../", import.meta.url);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const [checklist, panel, cronograma] = await Promise.all([
  fs.readFile(new URL("governanca/CHECKLIST_FECHAMENTO_MAO_NA_MASSA_VIDEO_ZIP_REVISAO_GERAL_2026-07-19.md", root), "utf8"),
  fs.readFile(new URL("app-painel-mvps.html", root), "utf8"),
  fs.readFile(new URL("governanca/CRONOGRAMA_MAO_NA_MASSA_CHARLIE_ECHO_v3.0.0.md", root), "utf8"),
]);

for (const text of [checklist, panel, cronograma]) {
  assert(text.includes("video") || text.includes("Video"), "fechamento sem lembrete de video");
  assert(text.includes("ZIP"), "fechamento sem lembrete de ZIP");
  assert(text.includes("revisao") || text.includes("Revisao"), "fechamento sem revisao geral");
}

for (const phrase of [
  "O ultimo pacote do Mao na Massa e sempre a revisao geral de todos os pacotes",
  "Video",
  "ZIP",
  "PENDENTE_FECHAMENTO_GERAL",
  "REVERSIBILIDADE_PENDENTE",
  "BLOQUEADO_ATE_REVERSIBILIDADE_1C",
  "congelado, escaneado e hashado",
  "Remover credenciais",
]) {
  assert(checklist.includes(phrase), `checklist final sem: ${phrase}`);
}

assert(panel.includes('data-package="8" data-package-status="PENDENTE_FECHAMENTO_GERAL"'), "painel sem pacote final de revisao/video/zip");
assert(panel.includes("data-pacote8-fechamento") && panel.includes("REVISAO_GERAL_EXECUTADA"), "painel sem revisao tecnica executada no Pacote 8");
assert(panel.includes("Ultimo pacote obrigatorio"), "painel sem regra de ultimo pacote");
assert(cronograma.includes("Pacote 8 - Revisao geral, Video e ZIP"), "cronograma sem Pacote 8");
assert(cronograma.includes("O ultimo pacote e sempre a revisao de todos os pacotes"), "cronograma sem regra do ultimo pacote");

console.log("FINAL_REMINDERS_OK video=pendente zip=pendente revisao-geral=executada");
