import fs from 'node:fs/promises';

const root = new URL('../', import.meta.url);
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const [diagnostic, matrix, release] = await Promise.all([
  fs.readFile(new URL('governanca/DIAGNOSTICO_G6_GOVERNANCA_OPERACIONAL_CHARLIE_v1.0.0.md', root), 'utf8'),
  fs.readFile(new URL('governanca/MATRIZ_RECONCILIACAO_G6_CHARLIE_v1.0.0.json', root), 'utf8').then(JSON.parse),
  fs.readFile(new URL('releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.7.md', root), 'utf8')
]);

for (const marker of [
  'G6A - diagnostico e linha de base',
  'G6B - registro canonico de capacidades v2',
  'advogado_lider',
  'default deny',
  'injecao de prompt',
  'silencio nao autoriza'
]) {
  assert(diagnostic.includes(marker), `diagnostico G6 sem ${marker}`);
}

assert(matrix.controles.length === 11, 'matriz G6 deve conter 11 dominios de controle');
assert(matrix.controles.some((item) => item.estado === 'documentacao_defasada'), 'G6 nao identificou divergencia documental');
assert(matrix.controles.some((item) => item.dominio === 'pdpj_transacional' && item.estado === 'bloqueado'), 'G6 ampliou PDPJ indevidamente');
assert(matrix.proxima_acao_unica === 'G6B_REGISTRO_CANONICO_CAPACIDADES_CHARLIE_V2', 'G6 sem proxima acao unica');
assert(matrix.altera_runtime === false && matrix.habilita_transacoes === false, 'G6 documental nao pode alterar runtime ou transacoes');
assert(release.includes('v1.21.7') && release.includes('nao altera runtime'), 'release G6 inconsistente');

console.log('G6_GOVERNANCA_CHARLIE_OK controls=11 next=registro-canonico-v2 runtime=unchanged');
