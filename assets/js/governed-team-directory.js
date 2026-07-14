(function () {
  "use strict";

  var root = document.querySelector("[data-governed-team-directory]");
  if (!root) return;

  var moduleCode = String(root.getAttribute("data-team-module") || "DAJ").toUpperCase();
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
  var moduleProfiles = {
    DAJ: ["admin_sistema", "advogado_lider", "advogado", "assessor_chefe", "assessor", "secretaria", "estagio", "escritorio"]
  };
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

  function populateProfiles() {
    var selectElement = select('[name="profile"]');
    if (!selectElement) return;
    selectElement.textContent = "";
    (moduleProfiles[moduleCode] || []).forEach(function (profile) {
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
    setText("[data-team-module-code]", moduleCode);
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
