const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const seed = read("database/homologation/001_seed_controlled_daj_deji.sql");
const verify = read("database/homologation/002_verify_rls_controlled_accounts.sql");
const apply = read("database/scripts/apply-homologation.ps1");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const marker of ["DAJ-HML-0001", "DAJ-HML-COFRE-0001", "DEJI-HML-0001"]) {
  assert(seed.includes(marker), `seed sem marcador ${marker}`);
}

assert((seed.match(/@jus9\.invalid/g) || []).length >= 5, "seed deve usar somente contatos .invalid");
assert(!/@jus9tecnologia\.com\.br/i.test(seed), "seed nao pode conter e-mail real");
assert(seed.includes("responsabilidade_social"), "seed DEJI sem responsabilidade social");
assert(verify.includes("RLS_HOMOLOGATION_OK"), "verificacao RLS sem marcador final");
assert(verify.includes("RLS lider: documento cofre nao deveria ser visivel"), "teste de cofre para lider ausente");
assert(verify.includes("RLS admin: cofre pertence somente ao titular"), "teste de cofre para admin ausente");
assert(apply.includes('$ConfirmTarget -ne "jus9-homologacao"'), "aplicador sem confirmacao explicita");
assert(apply.includes("(hml|homolog|staging|test)"), "aplicador sem trava de ambiente");

console.log("HOMOLOGATION_PACKAGE_OK seeds=DAJ,DEJI rls=titular,lider,empresa,admin");
