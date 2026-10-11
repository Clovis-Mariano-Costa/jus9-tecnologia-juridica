export const PROFILE_PERMISSIONS = Object.freeze({
  admin_sistema: ["comias:thread:read", "comias:thread:append", "comias:manifestation", "comias:archive", "auth:read", "profiles:request", "profiles:read", "profiles:manage", "dajs:read", "dajs:write", "dajs:review:read", "dajs:review:write", "documents:read", "drive:write", "drive:artifact:create", "drive:artifact:save", "drive:link:publish", "drive:link:revoke", "drive:artifact:delete", "memory:read", "memory:write", "memory:delete", "processes:read", "audit:write", "calendar:read", "calendar:write"],
  advogado_lider: ["comias:thread:read", "comias:thread:append", "comias:manifestation", "comias:archive", "auth:read", "profiles:request", "profiles:read", "profiles:manage", "dajs:read", "dajs:write", "dajs:review:read", "dajs:review:write", "documents:read", "drive:write", "drive:artifact:create", "drive:artifact:save", "drive:link:publish", "drive:link:revoke", "drive:artifact:delete", "memory:read", "memory:write", "memory:delete", "processes:read", "audit:write", "calendar:read", "calendar:write"],
  advogado: ["auth:read", "profiles:request", "profiles:read", "dajs:read", "dajs:write", "dajs:review:read", "dajs:review:write", "documents:read", "drive:write", "drive:artifact:create", "drive:artifact:save", "drive:link:publish", "drive:link:revoke", "drive:artifact:delete", "memory:read", "memory:write", "memory:delete", "processes:read", "audit:write", "calendar:read", "calendar:write"],
  assessor_chefe: ["auth:read", "profiles:request", "profiles:read", "profiles:manage", "dajs:read", "dajs:review:read", "dajs:review:write", "documents:read", "drive:write", "drive:artifact:create", "drive:artifact:save", "drive:link:publish", "drive:link:revoke", "drive:artifact:delete", "memory:read", "memory:write", "memory:delete", "processes:read", "audit:write"],
  assessor: ["auth:read", "profiles:request", "profiles:read", "dajs:read", "dajs:review:read", "dajs:review:write", "documents:read", "memory:read", "memory:write", "memory:delete", "processes:read"],
  secretaria: ["auth:read", "profiles:request", "profiles:read", "dajs:read", "dajs:review:read", "dajs:review:submit", "documents:read", "memory:read", "memory:write", "memory:delete", "calendar:read", "calendar:write"],
  estagio: ["auth:read", "profiles:request", "profiles:read", "dajs:read", "dajs:write", "dajs:review:read", "dajs:review:submit", "memory:read", "memory:write", "memory:delete"],
  academia: ["auth:read", "profiles:request", "profiles:read", "memory:read", "memory:write", "memory:delete"],
  estudante: ["auth:read", "profiles:request", "profiles:read", "memory:read", "memory:write", "memory:delete"],
  cidadao: ["auth:read", "profiles:request", "memory:read", "memory:write", "memory:delete"],
  perito: ["auth:read", "profiles:request", "profiles:read", "documents:read", "memory:read", "memory:write", "memory:delete"],
  parceiro: ["auth:read", "profiles:request", "profiles:read", "memory:read", "memory:write", "memory:delete"],
  escritorio: ["auth:read", "profiles:request", "profiles:read", "dajs:read", "dajs:review:read", "dajs:review:submit", "documents:read", "memory:read", "memory:write", "memory:delete", "processes:read"],
  empresa: ["auth:read", "profiles:request", "profiles:read", "documents:read", "memory:read", "memory:write", "memory:delete"],
  orgao_publico: ["auth:read", "profiles:request", "profiles:read", "memory:read", "memory:write", "memory:delete", "processes:read"],
  magistrado: ["auth:read", "profiles:request", "profiles:read", "memory:read", "memory:write", "memory:delete", "processes:read"],
  ministerio_publico: ["auth:read", "profiles:request", "profiles:read", "memory:read", "memory:write", "memory:delete", "processes:read"],
  autoridade_policial: ["auth:read", "profiles:request", "profiles:read", "documents:read", "memory:read", "memory:write", "memory:delete", "processes:read"],
  autor_editor: ["auth:read", "profiles:request", "profiles:read", "memory:read", "memory:write", "memory:delete"]
});

export function getPermissions(profile) {
  return PROFILE_PERMISSIONS[profile] || [];
}
