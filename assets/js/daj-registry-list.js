(function () {
  'use strict';

  var list = document.querySelector('[data-daj-registry-list]');
  if (!list) return;

  var statusBox = document.querySelector('[data-daj-registry-status]');
  var loginLink = document.querySelector('[data-daj-registry-login]');
  var inbox = document.querySelector('[data-daj-workflow-inbox]');
  var inboxStatus = document.querySelector('[data-daj-inbox-status]');
  var requestedDajId = String(new URL(window.location.href).searchParams.get('dajId') || '').toUpperCase();

  function setStatus(message, state) {
    if (!statusBox) return;
    statusBox.textContent = message;
    statusBox.dataset.state = state || 'info';
  }

  function appendText(parent, tag, text, className) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = text;
    parent.appendChild(element);
    return element;
  }

  function appendLink(parent, label, href) {
    var link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    parent.appendChild(link);
  }

  function setInboxStatus(message, state) {
    if (!inboxStatus) return;
    inboxStatus.textContent = message;
    inboxStatus.dataset.state = state || 'info';
  }

  function formatDate(value) {
    if (!value) return 'sem movimentacao registrada';
    var date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'data nao confirmada' : date.toLocaleString('pt-BR');
  }

  function renderItem(item) {
    var row = document.createElement('article');
    row.className = 'daj-row';
    if (item.id === requestedDajId) {
      row.dataset.selected = 'true';
      row.setAttribute('aria-current', 'true');
    }

    var head = document.createElement('div');
    head.className = 'daj-row-head';
    var identity = document.createElement('div');
    appendText(identity, 'h3', item.id + ' - ' + (item.partyName || 'Parte sem nome exibivel'));
    appendText(identity, 'p', 'Atualizado: ' + formatDate(item.updatedAt));
    head.appendChild(identity);
    appendText(head, 'span', item.status || 'em_triagem', 'badge secret');
    row.appendChild(head);

    var tags = document.createElement('div');
    tags.className = 'daj-tags';
    appendText(tags, 'span', item.classification || 'JURIDICO_SIGILOSO', 'daj-tag');
    appendText(tags, 'span', item.processLinked
      ? 'Processo vinculado: ' + (item.processNumber || 'numero protegido')
      : 'Processo ainda nao vinculado', 'daj-tag');
    if (item.testMode === true) appendText(tags, 'span', 'Homologacao ficticia', 'daj-tag');
    row.appendChild(tags);

    var actions = document.createElement('div');
    actions.className = 'link-actions';
    appendLink(actions, 'Abrir atendimento', 'app-atendimento-inicial.html?dajId=' + encodeURIComponent(item.id));
    appendLink(actions, 'Enviar para Charlie', 'app-ia-profissional.html?dajId=' + encodeURIComponent(item.id) + '&autorun=1#chat-ia');
    if (item.processLinked) appendLink(actions, 'Ver processos', 'app-processos.html?dajId=' + encodeURIComponent(item.id));
    row.appendChild(actions);
    list.appendChild(row);
  }

  function renderEmpty() {
    var row = document.createElement('article');
    row.className = 'daj-row';
    appendText(row, 'h3', 'Nenhum DAJ cadastrado');
    appendText(row, 'p', 'Crie o primeiro atendimento para iniciar o cadastro oficial.');
    var actions = document.createElement('div');
    actions.className = 'link-actions';
    appendLink(actions, 'Novo atendimento inicial', 'app-atendimento-inicial.html');
    row.appendChild(actions);
    list.appendChild(row);
  }

  async function loadRegistry() {
    setStatus('Lendo o cadastro oficial de DAJs...', 'loading');
    try {
      var response = await fetch('/api/dajs', {
        credentials: 'include',
        cache: 'no-store'
      });
      var data = await response.json().catch(function () { return {}; });
      if (response.status === 401) {
        setStatus('Entre com Google para consultar os DAJs do cadastro oficial.', 'error');
        if (loginLink) loginLink.hidden = false;
        return;
      }
      if (!response.ok || !data.ok || !Array.isArray(data.items)) {
        setStatus('Nao foi possivel confirmar o cadastro oficial. Nenhum exemplo local foi exibido como se fosse real.', 'error');
        return;
      }
      var items = data.items.slice().sort(function (left, right) {
        if (left.id === requestedDajId) return -1;
        if (right.id === requestedDajId) return 1;
        return String(right.updatedAt || '').localeCompare(String(left.updatedAt || ''));
      });
      list.textContent = '';
      if (!items.length) renderEmpty();
      else items.forEach(renderItem);
      setStatus(items.length + (items.length === 1 ? ' DAJ confirmado' : ' DAJs confirmados') + ' no cadastro oficial.', 'success');
    } catch (_) {
      setStatus('Falha de comunicacao com o cadastro oficial. Nenhum dado local foi presumido.', 'error');
    }
  }

  function renderInboxItem(item) {
    if (!inbox) return;
    var row = document.createElement('article');
    row.className = 'daj-row';
    var head = document.createElement('div');
    head.className = 'daj-row-head';
    var identity = document.createElement('div');
    appendText(identity, 'h3', item.dajId + ' - ' + (item.kind === 'review_assignment' ? 'Revisao recebida' : 'Feedback da analise'));
    appendText(identity, 'p', 'Registrado: ' + formatDate(item.createdAt));
    head.appendChild(identity);
    appendText(head, 'span', String(item.status || '').replace(/_/g, ' '), 'badge secret');
    row.appendChild(head);
    appendText(row, 'p', item.resultSummary || 'Resultado sem resumo disponivel.');
    appendText(row, 'p', 'Motivo: ' + (item.reason || 'encaminhamento governado'), 'fine-note');
    var actions = document.createElement('div');
    actions.className = 'link-actions';
    appendLink(actions, 'Abrir DAJ', 'app-atendimento-inicial.html?dajId=' + encodeURIComponent(item.dajId));
    appendLink(actions, 'Analisar em nova sala', 'app-ia-profissional.html?dajId=' + encodeURIComponent(item.dajId) + '&autorun=1#chat-ia');
    row.appendChild(actions);
    inbox.appendChild(row);
  }

  async function loadWorkflowInbox() {
    if (!inbox) return;
    setInboxStatus('Lendo feedbacks e encaminhamentos do perfil...', 'loading');
    try {
      var response = await fetch('/api/dajs/inbox', {
        credentials: 'include',
        cache: 'no-store'
      });
      var data = await response.json().catch(function () { return {}; });
      if (response.status === 401) {
        setInboxStatus('Entre com Google para consultar os encaminhamentos do seu perfil.', 'error');
        return;
      }
      if (!response.ok || !data.ok || !Array.isArray(data.items)) {
        setInboxStatus('Nao foi possivel confirmar os encaminhamentos agora.', 'error');
        return;
      }
      inbox.textContent = '';
      data.items.forEach(renderInboxItem);
      setInboxStatus(data.items.length
        ? data.items.length + (data.items.length === 1 ? ' encaminhamento encontrado.' : ' encaminhamentos encontrados.')
        : 'Nenhum encaminhamento pendente para este perfil.', 'success');
    } catch (_) {
      setInboxStatus('Falha de comunicacao com a caixa de encaminhamentos.', 'error');
    }
  }

  if (loginLink) {
    loginLink.href = '/auth/google/start?return_to=' + encodeURIComponent(window.location.pathname + window.location.search);
  }
  loadRegistry();
  loadWorkflowInbox();
})();
