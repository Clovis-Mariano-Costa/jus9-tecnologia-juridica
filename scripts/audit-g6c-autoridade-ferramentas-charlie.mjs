import fs from 'node:fs/promises';

const root = new URL('../', import.meta.url);
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const [matrix, decision, registry, permissions, worker, release] = await Promise.all([
  fs.readFile(new URL('apis/MATRIZ_AUTORIDADE_FERRAMENTAS_CHARLIE_v1.0.0.json', root), 'utf8').then(JSON.parse),
  fs.readFile(new URL('governanca/DECISAO_G6C_AUTORIDADE_E_FERRAMENTAS_CHARLIE_v1.0.0.md', root), 'utf8'),
  fs.readFile(new URL('apis/REGISTRO_CANONICO_CAPACIDADES_CHARLIE_v2.0.0.json', root), 'utf8').then(JSON.parse),
  fs.readFile(new URL('functions/_shared/permissions.js', root), 'utf8'),
  fs.readFile(new URL('worker.js', root), 'utf8'),
  fs.readFile(new URL('releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.13.md', root), 'utf8')
]);

assert(matrix.principios.default_deny === true, 'G6C sem default deny');
assert(matrix.principios.charlie_nao_aprova_a_propria_acao_sensivel === true, 'Charlie poderia aprovar a propria acao');
assert(matrix.principios.silencio_externo_autoriza === false, 'silencio externo nao pode autorizar');
assert(matrix.niveis_de_aprovacao.length === 6, 'G6C deve declarar A0-A4 e bloqueado');
assert(matrix.ferramentas.length === 11, 'G6C deve catalogar 11 grupos de ferramentas');
assert(matrix.permissoes_alvo.length === 23, 'G6C deve declarar 23 permissoes-alvo');

const permissionIds = new Set(matrix.permissoes_alvo.map((item) => item.id));
for (const required of ['memory:read', 'memory:write', 'memory:delete', 'dajs:review:read', 'dajs:review:submit', 'dajs:review:write', 'drive:link:publish', 'drive:link:revoke', 'drive:artifact:delete']) {
  assert(permissionIds.has(required), `G6C sem permissao-alvo ${required}`);
}
for (const blocked of ['pdpj:token:test', 'external:contact:send', 'judicial:science:write', 'judicial:petition:write', 'judicial:mni:execute']) {
  assert(matrix.permissoes_alvo.some((item) => item.id === blocked && item.nivel === 'BLOQUEADO'), `${blocked} deveria permanecer bloqueado`);
}

assert(matrix.migracao_proposta.altera_runtime_nesta_versao === false, 'G6C documental alteraria runtime');
assert(matrix.migracao_proposta.exige_aceite_humano_antes_da_fase_1 === true, 'G6C2 sem gate humano');
assert(matrix.proxima_acao_unica === 'G6C2_ACEITE_HUMANO_PARA_IMPLEMENTAR_RBAC_GRANULAR', 'proxima acao G6C incorreta');
assert(registry.lacunas_p0_para_g6c.length === 3, 'registro canonico nao entrega tres lacunas a G6C');

assert(decision.includes('RBAC e o runtime permanecem inalterados'), 'decisao G6C nao preserva runtime');
assert(release.includes('v1.21.13') && release.includes('permissoes granulares'), 'release integrada G6C inconsistente');

const g6c2Implemented = permissions.includes('"memory:read"') || worker.includes('permission: "dajs:review:read"');
if (g6c2Implemented) {
  const g6c2Decision = await fs.readFile(new URL('governanca/DECISAO_G6C2_IMPLEMENTACAO_RBAC_GRANULAR_CHARLIE_v1.0.0.md', root), 'utf8');
  assert(g6c2Decision.includes('O aceite expresso para seguir foi recebido'), 'G6C2 implementada sem registro do aceite humano');
}

console.log(`G6C_AUTORIDADE_FERRAMENTAS_OK tools=11 permissions=23 snapshot=preserved g6c2=${g6c2Implemented ? 'implemented' : 'pending'}`);
