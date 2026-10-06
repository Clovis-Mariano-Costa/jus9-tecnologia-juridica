import test from "node:test";
import assert from "node:assert/strict";
import { issueComiasGrant, introspectComiasGrant } from "../functions/_shared/comias-grants.js";

const env = { AUTH_COOKIE_SECRET: "unit-test-secret-only" };
const object = { id:"udf-v2-2", version:"2.2", hash:"sha256:" + "a".repeat(64) };
const now = Date.parse("2026-10-06T00:00:00Z");

test("admin_sistema can issue a short object-bound COM-IAS grant", async () => {
  const result = await issueComiasGrant({
    session:{
      kind:"jus9_session",
      profile:"admin_sistema",
      emailHash:"abc_DEF-123",
      expiresAt:now + 60 * 60 * 1000
    },
    requested_scopes:["thread.read","thread.append","manifestation","archive"],
    object,
    env,
    now
  });
  assert.equal(result.principal.id, "human:abc_DEF-123");
  assert.deepEqual(result.grant.object, object);
  assert.equal(result.grant.status, "active");
  assert.equal(typeof result.token, "string");
});

test("ordinary profile cannot self-elevate into COM-IAS scopes", async () => {
  await assert.rejects(() => issueComiasGrant({
    session:{
      kind:"jus9_session",
      profile:"cidadao",
      emailHash:"abc_DEF-123",
      expiresAt:now + 60 * 60 * 1000
    },
    requested_scopes:["thread.append"],
    object,
    env,
    now
  }), /grant_scope_not_permitted/);
});

test("formal_vote is never issued by general COM-IAS grant endpoint", async () => {
  await assert.rejects(() => issueComiasGrant({
    session:{
      kind:"jus9_session",
      profile:"admin_sistema",
      emailHash:"abc_DEF-123",
      expiresAt:now + 60 * 60 * 1000
    },
    requested_scopes:["formal_vote"],
    object,
    env,
    now
  }), /grant_scope_unsupported/);
});

test("introspection returns trusted assertion and exact grant", async () => {
  const issued = await issueComiasGrant({
    session:{
      kind:"jus9_session",
      profile:"advogado_lider",
      emailHash:"abc_DEF-123",
      expiresAt:now + 60 * 60 * 1000
    },
    requested_scopes:["thread.read","thread.append"],
    object,
    env,
    now
  });
  const result = await introspectComiasGrant({ token:issued.token, env, now:now + 1000 });
  assert.equal(result.authentication_assertion.introspection_verified, true);
  assert.equal(result.authentication_assertion.method, "central_grant_introspection");
  assert.equal(result.grant.subject_id, result.principal.id);
  assert.deepEqual(result.grant.object, object);
});

test("tampered and expired tokens fail closed", async () => {
  const issued = await issueComiasGrant({
    session:{
      kind:"jus9_session",
      profile:"admin_sistema",
      emailHash:"abc_DEF-123",
      expiresAt:now + 60 * 60 * 1000
    },
    requested_scopes:["thread.read"],
    object,
    env,
    now,
    ttl_ms:1000
  });

  await assert.rejects(() => introspectComiasGrant({
    token:issued.token + "x", env, now
  }), /grant_token_invalid/);

  await assert.rejects(() => introspectComiasGrant({
    token:issued.token, env, now:now + 1000
  }), /grant_token_invalid|grant_expired/);
});
