import fs from 'node:fs/promises';

const root = new URL('../', import.meta.url);
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const [catalog, fixture, runbook, pdpjContract, datajudContract] = await Promise.all([
  fs.readFile(new URL('apis/CATALOGO_CAPACIDADES_CNJ_GOVERNADO_v1.0.0.json', root), 'utf8').then(JSON.parse),
  fs.readFile(new URL('apis/fixtures/CENARIOS_HOMOLOGACAO_SIMULADA_CNJ_v1.0.0.json', root), 'utf8').then(JSON.parse),
  fs.readFile(new URL('governanca/RUNBOOK_G5_APIS_CNJ_CREDENCIAIS_INCIDENTES_v1.0.0.md', root), 'utf8'),
  fs.readFile(new URL('apis/CONTRATO_PDPJ_ONBOARDING_v1.0.0.yaml', root), 'utf8'),
  fs.readFile(new URL('apis/CONTRATO_DATAJUD_GOVERNADO_v1.0.0.yaml', root), 'utf8')
]);

assert(catalog.defaultDecision === 'deny', 'catalogo deve negar por padrao');
assert(catalog.institutionalState === 'blocked-institutional-onboarding', 'catalogo deve preservar bloqueio PDPJ');
assert(catalog.rules.silenceIsAuthorization === false, 'silencio nao pode autorizar');
assert(catalog.capabilities.length === 11, 'catalogo deve conter 11 capacidades governadas');
const byId = new Map(catalog.capabilities.map((item) => [item.id, item]));
for (const id of fixture.scenarios.map((scenario) => scenario.capability)) {
  assert(byId.has(id), `cenario referencia capacidade ausente: ${id}`);
}
assert(fixture.fictionalOnly === true && fixture.networkCalls === false, 'fixture deve ser ficticia e sem rede');
assert(fixture.scenarios.length === 15, 'fixture deve conter 15 cenarios');
for (const id of ['pdpj.domicilio.register_science', 'pdpj.petition.submit', 'pdpj.mni.execute']) {
  assert(byId.get(id)?.state === 'prohibited_current_phase', `${id} deve permanecer proibida`);
}
assert(byId.get('datajud.search.party_name')?.state === 'blocked', 'busca por nome deve permanecer bloqueada');
assert(byId.get('datajud.search.party_cpf')?.state === 'blocked', 'busca por CPF deve permanecer bloqueada');
assert(runbook.includes('Revogar primeiro') && runbook.includes('sem fallback generativo') && runbook.includes('Resposta futura do CNJ'), 'runbook incompleto');
assert(pdpjContract.includes('producao_exige_confirmacao_separada: true'), 'contrato PDPJ sem aprovacao separada');
assert(datajudContract.includes('modo: read_only') && datajudContract.includes('busca_nome_cpf: bloqueada-na-api-publica'), 'contrato DataJud sem limites atuais');

console.log('G5_GOVERNANCA_APIS_CNJ_OK capabilities=11 scenarios=15 real_calls=0 transactions=blocked');
