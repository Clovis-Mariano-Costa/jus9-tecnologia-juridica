import fs from 'node:fs/promises';

const root = new URL('../', import.meta.url);
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const [schedule, catalog, fixture, runbook, release, observation] = await Promise.all([
  fs.readFile(new URL('governanca/CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v1.8.0.md', root), 'utf8'),
  fs.readFile(new URL('apis/CATALOGO_CAPACIDADES_CNJ_GOVERNADO_v1.0.0.json', root), 'utf8').then(JSON.parse),
  fs.readFile(new URL('apis/fixtures/CENARIOS_HOMOLOGACAO_SIMULADA_CNJ_v1.0.0.json', root), 'utf8').then(JSON.parse),
  fs.readFile(new URL('governanca/RUNBOOK_G5_APIS_CNJ_CREDENCIAIS_INCIDENTES_v1.0.0.md', root), 'utf8'),
  fs.readFile(new URL('releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.6.md', root), 'utf8'),
  fs.readFile(new URL('governanca/REGISTRO_OBSERVACAO_M1_CHARLIE_CNJ_2026-07-20_v1.0.0.md', root), 'utf8')
]);

for (const marker of [
  'versao: 1.8.0',
  '20 a 23/07',
  '22/07 as 10h',
  'observacao de 72 horas',
  'CNJ_RESPONDEU',
  'CNJ_SEM_RESPOSTA',
  'homologacao real',
  'nao enviar automaticamente',
  'blocked-institutional-onboarding'
]) {
  assert(schedule.includes(marker), `cronograma v1.8 sem ${marker}`);
}

assert(catalog.capabilities.length === 11, 'cronograma diverge do catalogo G5');
assert(fixture.scenarios.length === 15 && fixture.networkCalls === false, 'cronograma diverge da simulacao G5');
assert(runbook.includes('Recebimento de credencial') && runbook.includes('Incidente'), 'runbook G5 incompleto');
assert(release.includes('v1.21.6') && release.includes('nao altera runtime'), 'release documental v1.21.6 inconsistente');
assert(observation.includes('31 repositorios') && observation.includes('readiness_only'), 'observacao M1 sem evidencias minimas');
assert(observation.includes('EM_OBSERVACAO_SEM_INCIDENTE_CONFIRMADO'), 'observacao M1 encerrou ou classificou estado incorretamente');

console.log('CRONOGRAMA_CHARLIE_CNJ_OK versao=1.8.0 m1=observacao m2=2026-07-22T10:00-03:00');
