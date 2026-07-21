import assert from "node:assert/strict";
import fs from "node:fs";

const root = new URL("../", import.meta.url);
const read = (relativePath) => fs.readFileSync(new URL(relativePath, root), "utf8");
const map = JSON.parse(read("governanca/MAPA_REPOSITORIOS_E_FONTES_MVPS_v1.0.0.json"));
const readme = read("README.md");
const versioning = read("versionamento.html");
const registry = read("governanca/REGISTRO_SINCRONIZACAO_READMES_ECOSSISTEMA_2026-07-21_v1.0.0.md");
const release = read("releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.14.md");

const repositories = map.repositoryGroups.flatMap((group) => group.repositories);
assert.equal(repositories.length, 31, "catalogo deve preservar 31 repositorios");
assert.ok(readme.includes("JUS9_ECOSYSTEM_STATUS_START") && readme.includes("JUS9_ECOSYSTEM_STATUS_END"), "README principal sem bloco idempotente");
assert.ok(readme.includes("ChatGPT, Codex e a API OpenAI"), "README principal sem toolchain OpenAI delimitada");
assert.ok(readme.includes("silêncio não autoriza") || readme.includes("silencio nao autoriza"), "README principal sem limite CNJ");
assert.ok(versioning.includes("Atualizacao documental 5.18.1 - READMEs dos 31 repositorios"), "versionamento sem registro 5.18.1");
assert.ok(registry.includes("PRs mescladas em `main`: 31") && registry.includes("alteracoes de codigo/runtime/permissao: 0"), "registro governado inconsistente");
assert.ok(release.includes("Release v1.21.14 - Sincronizacao dos READMEs do ecossistema") && release.includes("runtime permanece em 1.21.13"), "release documental inconsistente");

console.log("READMES_ECOSYSTEM_SYNC_OK repos=31 updated=29 created=2 merged=31 runtime=unchanged");

