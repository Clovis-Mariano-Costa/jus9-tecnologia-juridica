import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

const builder = read("scripts/build-portal-dist.mjs");
const packageManifest = JSON.parse(read("package.json"));
const packageLock = JSON.parse(read("package-lock.json"));
const wrangler = read("wrangler.jsonc");
const readme = read("README.md");
const versioning = read("versionamento.html");
const serviceWorker = read("service-worker.js");
const status = readJson("documentacao/hackathon/BUILD_WEEK_STATUS_2026.json");
const release = read("releases/RELEASE_GOVERNANCA_CHARLIE_ECHO_v1.21.13.md");
const finalReview = read("governanca/PACOTE_V4_08_REVISAO_GERAL_VIDEO_ZIP_DEFERIDOS_2026-07-20_v1.2.0.md");

assert.ok(builder.includes("files.length !== 170"), "builder sem total canonico de 170 fontes");
for (const marker of ["rmSync(dist", ".env|tmp|governanca|releases", "\\.(md|zip)$", "PORTAL_DIST_BUILD_OK"]) {
  assert.ok(builder.includes(marker), `builder sem controle: ${marker}`);
}
assert.ok(wrangler.includes('"command": "node scripts/build-portal-dist.mjs"'), "Wrangler sem custom build reproduzivel");
assert.ok(wrangler.includes('"JUS9_RELEASE": "governanca-1.21.13-build-week-final-1.0"'), "Wrangler sem release 1.21.13");
assert.equal(packageManifest.version, "1.21.13");
assert.equal(packageManifest.scripts.build, "node scripts/build-portal-dist.mjs");
assert.equal(packageManifest.scripts.postinstall, "node scripts/build-portal-dist.mjs");
assert.equal(packageManifest.devDependencies.wrangler, "4.112.0");
assert.equal(packageLock.packages[""].version, "1.21.13");
assert.ok(readme.includes("Workers Builds") && readme.includes("postinstall") && readme.includes("Build command") && readme.includes("unset"), "README sem contrato remoto por postinstall");
assert.ok(versioning.includes("Versionamento Jus 9 - v5.18") && versioning.includes("Versao 5.18 - Entrega final aos juizes"), "pagina publica sem v5.18");
assert.ok(serviceWorker.includes("jus9-pwa-v53-2026-07-21-build-week-final"), "cache PWA sem v53");
assert.equal(status.metadata.versao, "1.6.0");
assert.equal(status.submissionArtifacts.reproducibleBuild.builder, "scripts/build-portal-dist.mjs");
assert.equal(status.submissionArtifacts.reproducibleBuild.sourceFiles, 170);
assert.equal(status.submissionArtifacts.reproducibleBuild.wranglerAssets, 175);
assert.equal(status.submissionArtifacts.reproducibleBuild.remoteBuildCommand, null);
assert.equal(status.submissionArtifacts.reproducibleBuild.remoteInstallCommand, "npm clean-install --progress=false");
assert.equal(status.submissionArtifacts.reproducibleBuild.installHook, "postinstall -> node scripts/build-portal-dist.mjs");
assert.equal(status.submissionArtifacts.reproducibleBuild.remoteCheck, "pass");
assert.ok(release.includes("Release v1.21.13 - Entrega final Build Week"));
assert.ok(finalReview.includes("VIDEO_DEFERIDO / ZIP_DEFERIDO"), "revisao final perdeu adiamento de Video/ZIP");
assert.ok(finalReview.includes("Workers Builds: `PASS`") && finalReview.includes("444604fa-3510-4096-ba23-7411e2e24b24"), "revisao final sem check remoto aprovado");

const countFiles = (directory) => fs.readdirSync(directory, { withFileTypes: true })
  .reduce((total, entry) => total + (entry.isDirectory()
    ? countFiles(path.join(directory, entry.name))
    : 1), 0);
assert.equal(countFiles(path.join(root, "dist")), 170, "dist deve conter exatamente 170 arquivos derivados");

console.log("PORTAL_REPRODUCIBLE_BUILD_OK sources=170 wrangler_assets=175 portal=5.18 release=1.21.13");
