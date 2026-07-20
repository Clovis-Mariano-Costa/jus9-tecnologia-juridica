import fs from 'node:fs/promises';

const root = new URL('../', import.meta.url);
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const [registry, decision, worker, permissions, release] = await Promise.all([
  fs.readFile(new URL('apis/REGISTRO_CANONICO_CAPACIDADES_CHARLIE_v2.0.0.json', root), 'utf8').then(JSON.parse),
  fs.readFile(new URL('governanca/DECISAO_G6B_REGISTRO_CANONICO_CAPACIDADES_CHARLIE_v1.0.0.md', root), 'utf8'),
  fs.readFile(new URL('worker.js', root), 'utf8'),
  fs.readFile(new URL('functions/_shared/permissions.js', root), 'utf8'),
  fs.readFile(new URL('releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.9.md', root), 'utf8')
]);

assert(registry.metadata.versao === '2.0.0', 'registro canonico com versao incorreta');
assert(registry.regra_de_precedencia.default_deny === true, 'registro canonico sem default deny');
assert(registry.regra_de_precedencia.silencio_externo_autoriza === false, 'silencio externo nao pode autorizar');
assert(registry.capacidades.length === 20 && registry.resumo.total === 20, 'registro deve catalogar 20 capacidades');
assert(new Set(registry.capacidades.map((item) => item.id)).size === 20, 'ids de capacidade duplicados');
const stateCounts = Object.fromEntries(Object.entries(Object.groupBy(registry.capacidades, (item) => item.estado)).map(([state, items]) => [state, items.length]));
assert(stateCounts.ATIVO_PUBLICO_LIMITADO === registry.resumo.ativos_publicos_limitados, 'resumo de capacidades publicas divergente');
assert(stateCounts.ATIVO_GOVERNADO === registry.resumo.ativos_governados, 'resumo de capacidades governadas divergente');
assert(stateCounts.ATIVO_GOVERNADO_COM_PENDENCIA === registry.resumo.ativos_governados_com_pendencia, 'resumo de pendencias divergente');

const requiredFields = ['id', 'nome', 'estado', 'rotas', 'atores', 'permissoes', 'dados', 'efeito', 'revisao_humana', 'evidencias', 'limites', 'rollback', 'pendencias'];
for (const capability of registry.capacidades) {
  for (const field of requiredFields) assert(Object.hasOwn(capability, field), `${capability.id} sem ${field}`);
  assert(registry.estados_validos.includes(capability.estado), `${capability.id} com estado invalido`);
  for (const route of capability.rotas) {
    if (route.path.includes('{numero}')) {
      assert(worker.includes('/api/judicial/datajud/processos/'), `${capability.id} sem rota parametrizada no Worker`);
    } else {
      assert(worker.includes(`"${route.path}"`), `${capability.id} sem rota ${route.path} no Worker`);
    }
  }
  for (const evidence of capability.evidencias) {
    await fs.access(new URL(evidence, root)).catch(() => { throw new Error(`${capability.id} referencia evidencia ausente: ${evidence}`); });
  }
}

const memory = registry.capacidades.find((item) => item.id === 'CHARLIE-CAP-007');
const review = registry.capacidades.find((item) => item.id === 'CHARLIE-CAP-010');
const pdpj = registry.capacidades.find((item) => item.id === 'CHARLIE-CAP-015');
const acts = registry.capacidades.find((item) => item.id === 'CHARLIE-CAP-020');
assert(memory.estado === 'ATIVO_GOVERNADO_COM_PENDENCIA' && memory.pendencias.some((item) => item.includes('memory:read')), 'memoria nao registra lacuna de permissoes');
assert(review.estado === 'ATIVO_GOVERNADO_COM_PENDENCIA' && review.pendencias.some((item) => item.includes('review_write')), 'feedback DAJ nao registra lacuna de escrita');
assert(pdpj.estado === 'READINESS_ONLY', 'PDPJ nao pode ser promovida');
assert(acts.estado === 'BLOQUEADO_POR_SEGURANCA', 'atos autonomos devem permanecer bloqueados');
assert(registry.lacunas_p0_para_g6c.length === 3, 'G6C deve receber tres lacunas P0');
assert(registry.proxima_acao_unica === 'G6C_MATRIZ_AUTORIDADE_E_FERRAMENTAS', 'proxima acao G6B incorreta');
assert(permissions.includes('advogado_lider') && permissions.includes('drive:write'), 'registro sem correspondencia com RBAC atual');
assert(decision.includes('20 capacidades catalogadas') && decision.includes('nao o promovem como modelo definitivo'), 'decisao G6B incompleta');
assert(release.includes('v1.21.9') && release.includes('nao altera runtime'), 'release G6B inconsistente');

console.log('G6B_REGISTRO_CANONICO_OK capabilities=20 p0=3 next=G6C runtime=unchanged');
