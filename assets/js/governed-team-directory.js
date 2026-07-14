(function () {
  "use strict";

  var root = document.querySelector("[data-governed-team-directory]");
  if (!root) return;

  var profileLabels = {
    admin_sistema: "Administrador do sistema",
    advogado_lider: "Advogado lider",
    advogado: "Advogado",
    assessor_chefe: "Assessor chefe",
    assessor: "Assessor",
    secretaria: "Secretaria",
    estagio: "Estagio",
    academia: "Academia",
    estudante: "Estudante",
    cidadao: "Cidadao",
    perito: "Perito",
    parceiro: "Parceiro",
    escritorio: "Escritorio juridico",
    empresa: "Empresa",
    orgao_publico: "Orgao publico",
    magistrado: "Magistrado",
    ministerio_publico: "Ministerio Publico",
    autoridade_policial: "Autoridade policial",
    autor_editor: "Autor / editor"
  };
  var moduleConfigs = {
    DAJ: {
      label: "DAJ Advogados",
      entry: "app-demo-advogar.html",
      ai: "app-ia-profissional.html",
      documents: "app-documentos.html",
      workspace: "app-workspace.html",
      profilesPage: "app-perfis.html",
      profiles: ["admin_sistema", "advogado_lider", "advogado", "assessor_chefe", "assessor", "secretaria", "estagio", "escritorio"]
    },
    DAA: {
      label: "Professor / Academia",
      entry: "app-demo-professor.html",
      ai: "app-ia-professor.html",
      documents: "app-documentos-professor.html",
      workspace: "app-workspace-professor.html",
      profilesPage: "app-perfis-professor.html",
      profiles: ["admin_sistema", "academia"]
    },
    DEJ: {
      label: "Estudante",
      entry: "app-demo-estudante.html",
      ai: "app-ia-estudante.html",
      documents: "app-documentos-estudante.html",
      workspace: "app-workspace-estudante.html",
      profilesPage: "app-perfis-estudante.html",
      profiles: ["admin_sistema", "estudante", "academia"]
    },
    DIC: {
      label: "Modulo Social / Cidadao",
      entry: "app-demo-cidadao.html",
      ai: "app-ia-cidadao.html",
      documents: "app-documentos-cidadao.html",
      workspace: "app-workspace-cidadao.html",
      profilesPage: "app-perfis-cidadao.html",
      profiles: ["admin_sistema", "cidadao"],
      social: true
    },
    DPJ: {
      label: "Perito Judicial",
      entry: "app-demo-perito.html",
      ai: "app-ia-perito.html",
      documents: "app-documentos-perito.html",
      workspace: "app-workspace-perito.html",
      profilesPage: "app-perfis-perito.html",
      profiles: ["admin_sistema", "perito"]
    },
    DIP: {
      label: "Investidor / Parceiro",
      entry: "app-demo-investidor.html",
      ai: "app-ia-investidor.html",
      documents: "app-documentos-investidor.html",
      workspace: "app-workspace-investidor.html",
      profilesPage: "app-perfis-investidor.html",
      profiles: ["admin_sistema", "parceiro"]
    },
    DEE: {
      label: "Escritorio Juridico",
      entry: "app-demo-escritorio.html",
      ai: "app-ia-escritorio.html",
      documents: "app-documentos-escritorio.html",
      workspace: "app-workspace-escritorio.html",
      profilesPage: "app-perfis-escritorio.html",
      profiles: ["admin_sistema", "escritorio", "advogado_lider", "advogado", "assessor_chefe", "assessor", "secretaria", "estagio"]
    },
    DEJI: {
      label: "Empresa / Juridico Interno",
      entry: "app-demo-empresa.html",
      ai: "app-ia-empresa.html",
      documents: "app-documentos-empresa.html",
      workspace: "app-workspace-empresa.html",
      profilesPage: "app-perfis-empresa.html",
      profiles: ["admin_sistema", "empresa"]
    },
    DOI: {
      label: "Orgao Publico / Instituicao",
      entry: "app-demo-orgao-publico.html",
      ai: "app-ia-orgao-publico.html",
      documents: "app-documentos-orgao-publico.html",
      workspace: "app-workspace-orgao-publico.html",
      profilesPage: "app-perfis-orgao-publico.html",
      profiles: ["admin_sistema", "orgao_publico"]
    },
    DGE: {
      label: "Governanca do Ecossistema",
      entry: "app-demo-administrador.html",
      ai: "app-ia-administrador.html",
      documents: "app-documentos-administrador.html",
      workspace: "app-workspace-administrador.html",
      profilesPage: "app-perfis-administrador.html",
      profiles: ["admin_sistema"]
    },
    DMG: {
      label: "Magistratura",
      entry: "app-demo-juiz.html",
      ai: "app-ia-juiz.html",
      documents: "app-documentos-juiz.html",
      workspace: "app-workspace-juiz.html",
      profilesPage: "app-perfis-juiz.html",
      profiles: ["admin_sistema", "magistrado", "assessor_chefe", "assessor", "secretaria", "estagio"]
    },
    DMP: {
      label: "Ministerio Publico",
      entry: "app-demo-promotor.html",
      ai: "app-ia-promotor.html",
      documents: "app-documentos-promotor.html",
      workspace: "app-workspace-promotor.html",
      profilesPage: "app-perfis-promotor.html",
      profiles: ["admin_sistema", "ministerio_publico", "assessor_chefe", "assessor", "secretaria", "estagio"]
    },
    DAP: {
      label: "Autoridade Policial",
      entry: "app-demo-delegado.html",
      ai: "app-ia-delegado.html",
      documents: "app-documentos-delegado.html",
      workspace: "app-workspace-delegado.html",
      profilesPage: "app-perfis-delegado.html",
      profiles: ["admin_sistema", "autoridade_policial", "assessor", "secretaria", "estagio"]
    },
    DED: {
      label: "Autor / Editor",
      entry: "app-demo-autor-editor.html",
      ai: "app-ia-autor-editor.html",
      documents: "app-documentos-autor-editor.html",
      workspace: "app-workspace-autor-editor.html",
      profilesPage: "app-perfis-autor-editor.html",
      profiles: ["admin_sistema", "autor_editor"]
    }
  };
  var aliases = { INV: "DIP", ORG: "DOI" };
  var requestedModule = String(new URLSearchParams(location.search).get("mvp") || root.getAttribute("data-team-module") || "DAJ").toUpperCase();
  var moduleCode = aliases[requestedModule] || requestedModule;
  if (!moduleConfigs[moduleCode]) moduleCode = "DAJ";
  var moduleConfig = moduleConfigs[moduleCode];
  var statusLabels = {
    pendente_revisao_humana: "Pendente de revisao",
    aprovada_revisao_humana: "Aprovada",
    reprovada_revisao_humana: "Nao aprovada",
    ativo_revisao_humana: "Perfil aprovado"
  };

  var state = {
    authenticated: false,
    canManage: false,
    canRead: false,
    permissions: [],
    profile: ""
  };

  function select(selector) {
    return root.querySelector(selector);
  }

  function setText(selector, text) {
    var element = select(selector);
    if (element) element.textContent = text;
  }

  function setHidden(selector, hidden) {
    var element = select(selector);
    if (element) element.hidden = hidden;
  }

  function formatDate(value) {
    if (!value) return "Data nao informada";
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Data nao informada";
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(date);
  }

  function labelForProfile(profile) {
    return profileLabels[profile] || profile || "Perfil nao informado";
  }

  function labelForStatus(status) {
    return statusLabels[status] || status || "Status nao informado";
  }

  function apiErrorMessage(status, data) {
    if (status === 401) return "Entre com o login governado para acessar este recurso.";
    if (status === 403 && data && data.error === "solicitacao_de_terceiro_exige_gestor") {
      return "Este perfil pode solicitar apenas o proprio acesso. Confirme o mesmo e-mail usado no login.";
    }
    if (status === 403) return "Seu perfil nao possui permissao para esta operacao neste modulo.";
    if (data && data.error === "perfil_incompativel_com_modulo") return "O perfil escolhido nao pertence a este modulo.";
    return "Nao foi possivel concluir a operacao agora.";
  }

  async function api(path, options) {
    var response = await fetch(path, Object.assign({
      credentials: "include",
      cache: "no-store",
      headers: { Accept: "application/json" }
    }, options || {}));
    var data = await response.json().catch(function () { return {}; });
    if (!response.ok) {
      var error = new Error(apiErrorMessage(response.status, data));
      error.status = response.status;
      error.data = data;
      throw error;
    }
    return data;
  }

  function emptyMessage(container, message) {
    container.textContent = "";
    var paragraph = document.createElement("p");
    paragraph.className = "fine-note";
    paragraph.textContent = message;
    container.appendChild(paragraph);
  }

  function makeMeta(text) {
    var paragraph = document.createElement("p");
    paragraph.className = "fine-note";
    paragraph.textContent = text;
    return paragraph;
  }

  function renderMembers(items) {
    var container = select("[data-team-members]");
    if (!container) return;
    if (!Array.isArray(items) || !items.length) {
      emptyMessage(container, "Nenhum perfil aprovado foi encontrado para este modulo.");
      return;
    }
    container.textContent = "";
    items.forEach(function (item) {
      var article = document.createElement("article");
      article.className = "team-directory-item";
      var heading = document.createElement("h3");
      heading.textContent = item.name || "Pessoa sem nome informado";
      article.appendChild(heading);
      article.appendChild(makeMeta(labelForProfile(item.profile) + (item.roleDetail ? " | " + item.roleDetail : "")));
      if (item.email) article.appendChild(makeMeta(item.email));
      var badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = labelForStatus(item.status);
      article.appendChild(badge);
      container.appendChild(article);
    });
  }

  function makeReviewControls(item) {
    var details = document.createElement("details");
    details.className = "team-review-controls";
    var summary = document.createElement("summary");
    summary.textContent = "Revisar solicitacao";
    details.appendChild(summary);
    var body = document.createElement("div");
    var label = document.createElement("label");
    label.textContent = "Justificativa da revisao";
    var notes = document.createElement("textarea");
    notes.rows = 3;
    notes.maxLength = 500;
    notes.placeholder = "Registre o motivo da decisao.";
    label.appendChild(notes);
    body.appendChild(label);
    var actions = document.createElement("div");
    actions.className = "link-actions";
    [["aprovar", "Aprovar"], ["reprovar", "Nao aprovar"], ["pendente", "Manter pendente"]].forEach(function (choice) {
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = choice[1];
      button.addEventListener("click", function () {
        reviewRequest(item.id, choice[0], notes.value, button);
      });
      actions.appendChild(button);
    });
    body.appendChild(actions);
    details.appendChild(body);
    return details;
  }

  function renderRequests(items, canManage) {
    var container = select("[data-team-requests]");
    if (!container) return;
    if (!Array.isArray(items) || !items.length) {
      emptyMessage(container, canManage ? "Nao ha solicitacoes neste modulo." : "Voce ainda nao possui solicitacoes registradas.");
      return;
    }
    container.textContent = "";
    items.forEach(function (item) {
      var article = document.createElement("article");
      article.className = "team-request-item";
      var heading = document.createElement("h3");
      heading.textContent = item.name || "Solicitacao sem nome";
      article.appendChild(heading);
      article.appendChild(makeMeta(labelForProfile(item.profile) + " | " + (item.email || "e-mail restrito")));
      article.appendChild(makeMeta(labelForStatus(item.status) + " | " + formatDate(item.createdAt)));
      if (canManage) article.appendChild(makeReviewControls(item));
      container.appendChild(article);
    });
  }

  function renderAudit(items) {
    var container = select("[data-team-audit]");
    if (!container) return;
    if (!Array.isArray(items) || !items.length) {
      emptyMessage(container, "Nenhum evento de revisao foi registrado neste modulo.");
      return;
    }
    container.textContent = "";
    items.slice(0, 20).forEach(function (item) {
      var row = document.createElement("div");
      row.className = "team-audit-row";
      var action = item.action === "aprovar" ? "Aprovacao" : item.action === "reprovar" ? "Nao aprovacao" : "Revisao pendente";
      row.appendChild(makeMeta(formatDate(item.at) + " | " + action + " | " + (item.name || "Pessoa nao informada")));
      container.appendChild(row);
    });
  }

  async function loadDirectory() {
    var query = "?module=" + encodeURIComponent(moduleCode);
    var memberPromise = api("/api/governed-profiles" + query)
      .then(function (data) {
        state.canRead = true;
        state.canManage = Boolean(data.canManage || state.canManage);
        renderMembers(data.items);
        setText("[data-team-member-count]", String(data.items.length));
      })
      .catch(function (error) {
        emptyMessage(select("[data-team-members]"), error.message);
        setText("[data-team-member-count]", "-");
      });
    var requestPromise = api("/api/profile-requests" + query)
      .then(function (data) {
        state.canManage = Boolean(data.canManage || state.canManage);
        renderRequests(data.items, state.canManage);
        setText("[data-team-request-count]", String(data.items.length));
      })
      .catch(function (error) {
        emptyMessage(select("[data-team-requests]"), error.message);
        setText("[data-team-request-count]", "-");
      });
    await Promise.all([memberPromise, requestPromise]);
    setHidden("[data-team-manager-only]", !state.canManage);
    if (state.canManage) {
      api("/api/profile-requests/audit" + query)
        .then(function (data) { renderAudit(data.items); })
        .catch(function (error) { emptyMessage(select("[data-team-audit]"), error.message); });
    }
  }

  async function reviewRequest(id, action, notes, button) {
    button.disabled = true;
    setText("[data-team-status]", "Registrando revisao governada...");
    try {
      await api("/api/profile-requests/action", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ id: id, action: action, notes: notes })
      });
      setText("[data-team-status]", "Revisao registrada com trilha de auditoria.");
      await loadDirectory();
    } catch (error) {
      setText("[data-team-status]", error.message);
    } finally {
      button.disabled = false;
    }
  }

  function configureModuleUi() {
    root.setAttribute("data-team-module", moduleCode);
    setText("[data-team-module-code]", moduleCode);
    setText("[data-team-module-label]", moduleConfig.label);
    setText("[data-team-page-title]", "Equipe e acessos do " + moduleConfig.label);
    setText("[data-team-page-description]", moduleConfig.social
      ? "No modulo social, solicitacoes pessoais permanecem separadas do diretorio interno e a exposicao de identidades e reduzida."
      : "Pessoas, papeis e revisoes ficam separados por modulo. O formulario nao concede privilegio automaticamente.");
    var links = [
      ["[data-team-panel-link]", moduleConfig.entry],
      ["[data-team-ai-link]", moduleConfig.ai],
      ["[data-team-documents-link]", moduleConfig.documents],
      ["[data-team-workspace-link]", moduleConfig.workspace],
      ["[data-team-profiles-link]", moduleConfig.profilesPage],
      ["[data-team-self-link]", "app-equipe.html?mvp=" + encodeURIComponent(moduleCode)]
    ];
    links.forEach(function (entry) {
      var link = select(entry[0]);
      if (link) link.href = entry[1];
    });
    root.querySelectorAll("[data-team-daj-only]").forEach(function (element) {
      element.hidden = moduleCode !== "DAJ";
    });
    setHidden("[data-team-social-note]", !moduleConfig.social);
    var loginLink = select("[data-team-login]");
    if (loginLink) {
      var returnTo = "/app-equipe.html?mvp=" + encodeURIComponent(moduleCode);
      loginLink.href = "/auth/google/start?return_to=" + encodeURIComponent(returnTo);
    }
  }

  function populateProfiles() {
    var selectElement = select('[name="profile"]');
    if (!selectElement) return;
    selectElement.textContent = "";
    moduleConfig.profiles.forEach(function (profile) {
      if (profile === "admin_sistema" && state.profile !== "admin_sistema") return;
      var option = document.createElement("option");
      option.value = profile;
      option.textContent = labelForProfile(profile);
      selectElement.appendChild(option);
    });
  }

  function bindForm() {
    var form = select("[data-team-request-form]");
    if (!form) return;
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      var submit = form.querySelector('button[type="submit"]');
      submit.disabled = true;
      setText("[data-team-status]", "Enviando solicitacao para revisao humana...");
      var values = Object.fromEntries(new FormData(form).entries());
      values.module = moduleCode;
      values.scope = "equipe";
      try {
        var data = await api("/api/profile-requests", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values)
        });
        setText("[data-team-status]", "Solicitacao registrada: " + data.id + ". Aguardando revisao humana.");
        form.reset();
        populateProfiles();
        await loadDirectory();
      } catch (error) {
        setText("[data-team-status]", error.message);
      } finally {
        submit.disabled = false;
      }
    });
  }

  async function init() {
    configureModuleUi();
    bindForm();
    try {
      var context = await api("/api/auth/context?module=" + encodeURIComponent(moduleCode) + "&origin=" + encodeURIComponent(location.origin));
      state.authenticated = true;
      state.profile = context.profile || "";
      state.permissions = context.identity && Array.isArray(context.identity.permissions) ? context.identity.permissions : [];
      state.canManage = state.permissions.includes("profiles:manage");
      setText("[data-team-auth]", "Sessao autorizada: " + (context.identity?.profile?.label || labelForProfile(state.profile)) + ".");
      setHidden("[data-team-login]", true);
      populateProfiles();
      setHidden("[data-team-request-panel]", false);
      var formTitle = state.canManage ? "Solicitar ou convidar uma pessoa" : "Solicitar meu perfil";
      setText("[data-team-form-title]", formTitle);
      await loadDirectory();
    } catch (error) {
      setText("[data-team-auth]", error.message);
      setHidden("[data-team-login]", false);
      setHidden("[data-team-request-panel]", true);
      emptyMessage(select("[data-team-members]"), "O diretorio oficial exige login governado.");
      emptyMessage(select("[data-team-requests]"), "Entre para consultar suas solicitacoes.");
    }
  }

  init();
})();
