import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

const builder = read("scripts/build-portal-dist.mjs");
const wrangler = read("wrangler.jsonc");
const readme = read("README.md");
const versioning = read("versionamento.html");
const serviceWorker = read("service-worker.js");
const status = readJson("documentacao/hackathon/BUILD_WEEK_STATUS_2026.json");
const release = read("releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.12.md");
const finalReview = read("governanca/PACOTE_V4_08_REVISAO_GERAL_VIDEO_ZIP_DEFERIDOS_2026-07-20_v1.1.0.md");

assert.ok(builder.includes("files.length !== 170"), "builder sem total canonico de 170 fontes");
for (const marker of ["rmSync(dist", ".env|tmp|governanca|releases", "\\.(md|zip)$", "PORTAL_DIST_BUILD_OK"]) {
  assert.ok(builder.includes(marker), `builder sem controle: ${marker}`);
}
assert.ok(wrangler.includes('"command": "node scripts/build-portal-dist.mjs"'), "Wrangler sem custom build reproduzivel");
assert.ok(wrangler.includes('"JUS9_RELEASE": "governanca-1.21.12-build-reproduzivel-1.0"'), "Wrangler sem release 1.21.12");
assert.ok(readme.includes("Workers Builds") && readme.includes("node scripts/build-portal-dist.mjs"), "README sem comando do trigger remoto");
assert.ok(versioning.includes("Versionamento Jus 9 - v5.17") && versioning.includes("Versao 5.17 - Build reproduzivel do portal"), "pagina publica sem v5.17");
assert.ok(serviceWorker.includes("jus9-pwa-v52-2026-07-20-build-reproduzivel"), "cache PWA sem v52");
assert.equal(status.metadata.versao, "1.5.0");
assert.equal(status.submissionArtifacts.reproducibleBuild.builder, "scripts/build-portal-dist.mjs");
assert.equal(status.submissionArtifacts.reproducibleBuild.sourceFiles, 170);
assert.equal(status.submissionArtifacts.reproducibleBuild.wranglerAssets, 175);
assert.equal(status.submissionArtifacts.reproducibleBuild.remoteBuildCommand, "node scripts/build-portal-dist.mjs");
assert.ok(release.includes("Release v1.21.12 - Build reproduzivel do portal"));
assert.ok(finalReview.includes("VIDEO_DEFERIDO / ZIP_DEFERIDO"), "revisao final perdeu adiamento de Video/ZIP");
assert.ok(finalReview.includes("check remoto: pendente"), "revisao final deve registrar o check remoto pendente");

const countFiles = (directory) => fs.readdirSync(directory, { withFileTypes: true })
  .reduce((total, entry) => total + (entry.isDirectory()
    ? countFiles(path.join(directory, entry.name))
    : 1), 0);
assert.equal(countFiles(path.join(root, "dist")), 170, "dist deve conter exatamente 170 arquivos derivados");

console.log("PORTAL_REPRODUCIBLE_BUILD_OK sources=170 wrangler_assets=175 portal=5.17 release=1.21.12");
