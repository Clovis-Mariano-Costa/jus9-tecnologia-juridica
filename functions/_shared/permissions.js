export const PROFILE_PERMISSIONS = Object.freeze({
  admin_sistema: ["auth:read", "profiles:request", "profiles:read", "profiles:manage", "dajs:read", "dajs:write", "documents:read", "drive:write", "processes:read", "audit:write", "calendar:read", "calendar:write"],
  advogado_lider: ["auth:read", "profiles:request", "profiles:read", "profiles:manage", "dajs:read", "dajs:write", "documents:read", "drive:write", "processes:read", "audit:write", "calendar:read", "calendar:write"],
  advogado: ["auth:read", "profiles:request", "profiles:read", "dajs:read", "dajs:write", "documents:read", "drive:write", "processes:read", "audit:write", "calendar:read", "calendar:write"],
  assessor_chefe: ["auth:read", "profiles:request", "profiles:read", "profiles:manage", "dajs:read", "documents:read", "drive:write", "processes:read", "audit:write"],
  assessor: ["auth:read", "profiles:request", "profiles:read", "dajs:read", "documents:read", "processes:read"],
  secretaria: ["auth:read", "profiles:request", "profiles:read", "dajs:read", "documents:read", "calendar:read", "calendar:write"],
  estagio: ["auth:read", "profiles:request", "profiles:read", "dajs:read", "dajs:write"],
  academia: ["auth:read", "profiles:request", "profiles:read"],
  estudante: ["auth:read", "profiles:request", "profiles:read"],
  cidadao: ["auth:read", "profiles:request"],
  perito: ["auth:read", "profiles:request", "profiles:read", "documents:read"],
  parceiro: ["auth:read", "profiles:request", "profiles:read"],
  escritorio: ["auth:read", "profiles:request", "profiles:read", "dajs:read", "documents:read", "processes:read"],
  empresa: ["auth:read", "profiles:request", "profiles:read", "documents:read"],
  orgao_publico: ["auth:read", "profiles:request", "profiles:read", "processes:read"],
  magistrado: ["auth:read", "profiles:request", "profiles:read", "processes:read"],
  ministerio_publico: ["auth:read", "profiles:request", "profiles:read", "processes:read"],
  autoridade_policial: ["auth:read", "profiles:request", "profiles:read", "documents:read", "processes:read"],
  autor_editor: ["auth:read", "profiles:request", "profiles:read"]
});

export function getPermissions(profile) {
  return PROFILE_PERMISSIONS[profile] || [];
}
