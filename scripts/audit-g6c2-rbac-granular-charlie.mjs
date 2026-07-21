import fs from 'node:fs/promises';

const root = new URL('../', import.meta.url);
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const [permissions, worker, pagesMemory, frontend, decision, release, cronograma, wrangler, serviceWorker] = await Promise.all([
  fs.readFile(new URL('functions/_shared/permissions.js', root), 'utf8'),
  fs.readFile(new URL('worker.js', root), 'utf8'),
  fs.readFile(new URL('functions/api/charlie/memory.js', root), 'utf8'),
  fs.readFile(new URL('script.js', root), 'utf8'),
  fs.readFile(new URL('governanca/DECISAO_G6C2_IMPLEMENTACAO_RBAC_GRANULAR_CHARLIE_v1.0.0.md', root), 'utf8'),
  fs.readFile(new URL('releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.11.md', root), 'utf8'),
  fs.readFile(new URL('governanca/CRONOGRAMA_CHARLIE_GOVERNANCA_CNJ_CONEXOES_v1.9.0.md', root), 'utf8'),
  fs.readFile(new URL('wrangler.jsonc', root), 'utf8'),
  fs.readFile(new URL('service-worker.js', root), 'utf8')
]);

for (const permission of [
  'memory:read', 'memory:write', 'memory:delete',
  'dajs:review:read', 'dajs:review:submit', 'dajs:review:write',
  'drive:artifact:create', 'drive:artifact:save', 'drive:link:publish', 'drive:link:revoke', 'drive:artifact:delete'
]) {
  assert(permissions.includes(`"${permission}"`), `permissao G6C2 ausente: ${permission}`);
}

assert(worker.includes('permission: "memory:read"') && worker.includes('permission: "memory:delete"'), 'Worker sem gates granulares de memoria');
assert(worker.includes('permission: "dajs:review:read"') && worker.includes('dajs:review:submit|dajs:review:write'), 'Worker sem gates granulares DAJ');
assert(worker.includes('requestedCharlieDrivePermission') && worker.includes('hasDriveEffectConfirmation'), 'Worker sem gate Drive por efeito');
assert(worker.includes('EXCLUIR MINHA MEMORIA') && pagesMemory.includes('EXCLUIR MINHA MEMORIA') && frontend.includes('EXCLUIR MINHA MEMORIA'), 'confirmacao de exclusao nao esta alinhada');
assert(frontend.includes('CONFIRMAR SALVAMENTO DRIVE'), 'frontend sem confirmacao de salvamento Drive');
assert(decision.includes('implementacao do RBAC granular') && decision.includes('PDPJ'), 'decisao G6C2 incompleta');
assert(cronograma.includes('22/07 as 10h') && cronograma.includes('silencio nao autoriza'), 'cronograma G6C2/CNJ incompleto');
assert(release.includes('v1.21.11') && wrangler.includes('governanca-1.21.11-g6c2-rbac-granular-1.0'), 'release operacional G6C2 inconsistente');
assert(serviceWorker.includes('jus9-pwa-v51-2026-07-21-g6c2-rbac-granular'), 'cache G6C2 desatualizado');

console.log('G6C2_RBAC_GRANULAR_OK memory=3 daj-review=3 drive=5 confirmations=closed');
