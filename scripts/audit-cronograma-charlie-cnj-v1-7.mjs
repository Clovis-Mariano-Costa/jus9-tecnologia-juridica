import fs from 'node:fs/promises';

const root = new URL('../', import.meta.url);
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const [schedule, catalog, fixture, runbook] = await Promise.all([
  fs.readFile(new URL('governanca/CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v1.7.0.md', root), 'utf8'),
  fs.readFile(new URL('apis/CATALOGO_CAPACIDADES_CNJ_GOVERNADO_v1.0.0.json', root), 'utf8').then(JSON.parse),
  fs.readFile(new URL('apis/fixtures/CENARIOS_HOMOLOGACAO_SIMULADA_CNJ_v1.0.0.json', root), 'utf8').then(JSON.parse),
  fs.readFile(new URL('governanca/RUNBOOK_G5_APIS_CNJ_CREDENCIAIS_INCIDENTES_v1.0.0.md', root), 'utf8')
]);

for (const marker of ['versao: 1.7.0', 'G5_CATALOGO_CONCLUIDO', 'G5_SIMULACAO_CONCLUIDA', 'G5_RUNBOOK_CONCLUIDO', 'CNJ_AGUARDANDO_RESPOSTA', 'HOMOLOGACAO_REAL_BLOQUEADA']) {
  assert(schedule.includes(marker), `cronograma v1.7 sem ${marker}`);
}
assert(catalog.capabilities.length === 11, 'cronograma declara catalogo diferente do artefato');
assert(fixture.scenarios.length === 15 && fixture.networkCalls === false, 'cronograma declara simulacao diferente do artefato');
assert(runbook.includes('Recebimento de credencial') && runbook.includes('Incidente'), 'runbook G5 incompleto');

console.log('CRONOGRAMA_CHARLIE_CNJ_OK versao=1.7.0 g5=concluido cnj=aguardando');
