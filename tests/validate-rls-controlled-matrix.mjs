function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const ids = {
  admin: "admin-hml",
  titular: "titular-hml",
  lider: "lider-hml",
  empresa: "empresa-hml",
};

const restrictedDaj = {
  id: "daj-restrito-hml",
  secrecy: "restrito",
  titularLawyerId: ids.titular,
  leadLawyerId: ids.lider,
};

const cofreDaj = {
  id: "daj-cofre-hml",
  secrecy: "cofre",
  titularLawyerId: ids.titular,
  leadLawyerId: ids.lider,
};

function isAdmin(actor) {
  return actor.profile === "admin_sistema";
}

function isTitular(actor, daj) {
  return actor.id === daj.titularLawyerId;
}

function canReadDaj(actor, daj) {
  return isAdmin(actor) ||
    isTitular(actor, daj) ||
    (["comum", "restrito"].includes(daj.secrecy) && actor.id === daj.leadLawyerId);
}

function canReadDocument(actor, document, daj) {
  if (["secreto", "cofre"].includes(document.secrecy) || ["secreto", "cofre"].includes(document.status)) {
    return isTitular(actor, daj);
  }
  return canReadDaj(actor, daj);
}

function canReadAdaptedDossier(actor, dossier) {
  return isAdmin(actor) || actor.id === dossier.createdBy;
}

const actors = {
  admin: { id: ids.admin, profile: "admin_sistema" },
  titular: { id: ids.titular, profile: "advogado" },
  lider: { id: ids.lider, profile: "advogado_lider" },
  empresa: { id: ids.empresa, profile: "empresa" },
};

assert(canReadDaj(actors.titular, restrictedDaj), "titular deve ler DAJ restrito");
assert(canReadDaj(actors.titular, cofreDaj), "titular deve ler DAJ cofre");
assert(canReadDaj(actors.lider, restrictedDaj), "lider deve ler DAJ restrito atribuido");
assert(!canReadDaj(actors.lider, cofreDaj), "lider nao deve ler DAJ cofre de terceiro");
assert(canReadDaj(actors.admin, restrictedDaj), "admin deve ler DAJ restrito");

const commonDocument = { secrecy: "comum", status: "recebido" };
const cofreDocument = { secrecy: "cofre", status: "cofre" };
assert(canReadDocument(actors.lider, commonDocument, restrictedDaj), "lider deve ler documento comum atribuido");
assert(!canReadDocument(actors.lider, cofreDocument, cofreDaj), "lider nao deve ler documento cofre de terceiro");
assert(!canReadDocument(actors.admin, cofreDocument, cofreDaj), "admin nao deve ler documento cofre");
assert(canReadDocument(actors.titular, cofreDocument, cofreDaj), "titular deve ler documento cofre proprio");

const deji = { createdBy: ids.empresa };
assert(canReadAdaptedDossier(actors.empresa, deji), "empresa deve ler DEJI proprio");
assert(canReadAdaptedDossier(actors.admin, deji), "admin deve ler DEJI para governanca");
assert(!canReadAdaptedDossier(actors.lider, deji), "lider DAJ nao deve ler DEJI de empresa");

console.log("RLS_CONTROLLED_MATRIX_OK titular,lider,admin,empresa");
