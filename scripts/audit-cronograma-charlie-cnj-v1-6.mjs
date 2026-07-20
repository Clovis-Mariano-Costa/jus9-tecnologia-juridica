import fs from 'node:fs/promises';

const root = new URL('../', import.meta.url);
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const [schedule, release, governanceChangelog] = await Promise.all([
  fs.readFile(new URL('governanca/CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v1.6.0.md', root), 'utf8'),
  fs.readFile(new URL('releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.2.md', root), 'utf8'),
  fs.readFile(new URL('governanca/CHANGELOG.md', root), 'utf8')
]);

for (const marker of [
  'versao: 1.6.0',
  'CNJ_SEM_RESPOSTA_ATE_2026-07-20',
  'G5_GOVERNANCA_API_EM_EXECUCAO',
  'G5_HOMOLOGACAO_SIMULADA_SEM_CREDENCIAIS',
  'G5_RUNBOOKS_E_EVIDENCIAS',
  'HOMOLOGACAO_REAL_BLOQUEADA',
  '22/07/2026, 10h',
  'nao interpretar ausencia de resposta como anuencia tacita'
]) {
  assert(schedule.includes(marker), `cronograma v1.6 sem ${marker}`);
}
assert(release.includes('Cronograma Charlie/CNJ: `1.6.0`'), 'release sem versao do cronograma');
assert(governanceChangelog.includes('CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v1.6.0.md'), 'changelog sem cronograma v1.6');

console.log('CRONOGRAMA_CHARLIE_CNJ_OK versao=1.6.0 cnj=sem-resposta homologacao-real=bloqueada');
