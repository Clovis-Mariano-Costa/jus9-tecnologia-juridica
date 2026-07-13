export const PROFILE_PERMISSIONS = Object.freeze({
  admin_sistema: ["auth:read", "dajs:read", "dajs:write", "documents:read", "drive:write", "processes:read", "audit:write", "calendar:read", "calendar:write"],
  advogado_lider: ["auth:read", "dajs:read", "dajs:write", "documents:read", "drive:write", "processes:read", "audit:write", "calendar:read", "calendar:write"],
  advogado: ["auth:read", "dajs:read", "dajs:write", "documents:read", "drive:write", "processes:read", "audit:write", "calendar:read", "calendar:write"],
  assessor_chefe: ["auth:read", "dajs:read", "documents:read", "drive:write", "processes:read", "audit:write"],
  assessor: ["auth:read", "dajs:read", "documents:read", "processes:read"],
  secretaria: ["auth:read", "dajs:read", "documents:read", "calendar:read", "calendar:write"],
  estagio: ["auth:read", "dajs:read"],
  academia: ["auth:read"],
  estudante: ["auth:read"],
  cidadao: ["auth:read"],
  perito: ["auth:read", "documents:read"],
  parceiro: ["auth:read"],
  escritorio: ["auth:read", "dajs:read", "documents:read", "processes:read"],
  empresa: ["auth:read", "documents:read"],
  orgao_publico: ["auth:read", "processes:read"],
  magistrado: ["auth:read", "processes:read"],
  ministerio_publico: ["auth:read", "processes:read"],
  autoridade_policial: ["auth:read", "documents:read", "processes:read"],
  autor_editor: ["auth:read"]
});

export function getPermissions(profile) {
  return PROFILE_PERMISSIONS[profile] || [];
}
