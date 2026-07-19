(function () {
  'use strict';

  var list = document.querySelector('[data-daj-registry-list]');
  if (!list) return;

  var statusBox = document.querySelector('[data-daj-registry-status]');
  var loginLink = document.querySelector('[data-daj-registry-login]');
  var inbox = document.querySelector('[data-daj-workflow-inbox]');
  var inboxStatus = document.querySelector('[data-daj-inbox-status]');
  var searchForm = document.querySelector('[data-daj-search-form]');
  var searchType = document.querySelector('[data-daj-search-type]');
  var searchQuery = document.querySelector('[data-daj-search-query]');
  var searchLabel = document.querySelector('[data-daj-search-label]');
  var searchHelp = document.querySelector('[data-daj-search-help]');
  var searchStatus = document.querySelector('[data-daj-search-status]');
  var searchResults = document.querySelector('[data-daj-search-results]');
  var requestedDajId = String(new URL(window.location.href).searchParams.get('dajId') || '').toUpperCase();
  var registryItems = [];
  var detailCache = Object.create(null);

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

  function setSearchStatus(message, state) {
    if (!searchStatus) return;
    searchStatus.textContent = message;
    searchStatus.dataset.state = state || 'info';
  }

  function formatDate(value) {
    if (!value) return 'sem movimentacao registrada';
    var date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'data nao confirmada' : date.toLocaleString('pt-BR');
  }

  function onlyDigits(value) {
    return String(value || '').replace(/\D/g, '');
  }

  function normalizeText(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function normalizeDajId(value) {
    var raw = String(value || '').trim().toUpperCase();
    if (/^\d{1,4}$/.test(raw)) return 'DAJ-2026-' + raw.padStart(4, '0');
    var match = raw.match(/DAJ[\s_-]*(\d{4})[\s_-]*(\d{1,4})/i);
    if (match) return 'DAJ-' + match[1] + '-' + match[2].padStart(4, '0');
    return raw.replace(/\s+/g, '-');
  }

  function formatCnj(value) {
    var digits = onlyDigits(value);
    if (digits.length !== 20) return String(value || '').trim();
    return digits.replace(/^(\d{7})(\d{2})(\d{4})(\d)(\d{2})(\d{4})$/, '$1-$2.$3.$4.$5.$6');
  }

  function isValidCpf(value) {
    var cpf = onlyDigits(value);
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    function digit(size) {
      var sum = 0;
      for (var index = 0; index < size; index += 1) sum += Number(cpf[index]) * (size + 1 - index);
      var calculated = (sum * 10) % 11;
      return calculated === 10 ? 0 : calculated;
    }
    return digit(9) === Number(cpf[9]) && digit(10) === Number(cpf[10]);
  }

  function searchError(message, code) {
    var error = new Error(message);
    error.code = code || 'search_error';
    return error;
  }

  function appendDetailLine(row, item) {
    var details = [];
    var operational = item.operational || {};
    var workflow = item.workflow || {};
    var authorship = item.authorship || {};
    if (operational.area) details.push('Area: ' + operational.area);
    if (operational.urgency) details.push('Urgencia: ' + operational.urgency);
    if (operational.attentionReason) details.push('Atencao: ' + operational.attentionReason);
    if (operational.secrecyLevel) details.push('Sigilo: ' + operational.secrecyLevel);
    if (workflow.status) details.push('Fluxo: ' + String(workflow.status).replace(/_/g, ' '));
    if (workflow.destinationProfile) details.push('Destino: ' + workflow.destinationProfile);
    if (authorship.createdByProfile) details.push('Criado por: ' + authorship.createdByProfile);
    if (item.environment) details.push('Ambiente: ' + item.environment);
    if (details.length) appendText(row, 'p', 'Detalhes governados: ' + details.join(' | '), 'fine-note');
  }

  function renderItem(item, target) {
    var container = target || list;
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
    var hasProcess = item.processLinked === true || Boolean(item.processNumber);
    appendText(tags, 'span', item.classification || 'JURIDICO_SIGILOSO', 'daj-tag');
    if (item.cpfMasked) appendText(tags, 'span', 'CPF: ' + item.cpfMasked, 'daj-tag');
    appendText(tags, 'span', hasProcess
      ? 'Processo vinculado: ' + (item.processNumber || 'numero protegido')
      : 'Processo ainda nao vinculado', 'daj-tag');
    if (item.testMode === true) appendText(tags, 'span', 'Homologacao ficticia', 'daj-tag');
    row.appendChild(tags);
    appendDetailLine(row, item);

    var actions = document.createElement('div');
    actions.className = 'link-actions';
    appendLink(actions, 'Abrir atendimento', 'app-atendimento-inicial.html?dajId=' + encodeURIComponent(item.id));
    appendLink(actions, 'Enviar para Charlie', 'app-ia-profissional.html?dajId=' + encodeURIComponent(item.id) + '&autorun=1#chat-ia');
    if (hasProcess) appendLink(actions, 'Ver processos', 'app-processos.html?dajId=' + encodeURIComponent(item.id));
    row.appendChild(actions);
    container.appendChild(row);
  }

  function renderEmpty(target, title, message) {
    var container = target || list;
    var row = document.createElement('article');
    row.className = 'daj-row';
    appendText(row, 'h3', title || 'Nenhum DAJ cadastrado');
    appendText(row, 'p', message || 'Crie o primeiro atendimento para iniciar o cadastro oficial.');
    var actions = document.createElement('div');
    actions.className = 'link-actions';
    appendLink(actions, 'Novo atendimento inicial', 'app-atendimento-inicial.html');
    row.appendChild(actions);
    container.appendChild(row);
  }

  async function fetchRegistryItems() {
    var response = await fetch('/api/dajs', {
      credentials: 'include',
      cache: 'no-store'
    });
    var data = await response.json().catch(function () { return {}; });
    if (response.status === 401) throw searchError('Entre com Google para consultar os DAJs do cadastro oficial.', 'auth');
    if (!response.ok || !data.ok || !Array.isArray(data.items)) {
      throw searchError('Nao foi possivel confirmar o cadastro oficial. Nenhum exemplo local foi exibido como se fosse real.', 'registry');
    }
    return data.items;
  }

  async function fetchDajDetail(dajId) {
    var normalized = normalizeDajId(dajId);
    if (!/^DAJ-\d{4}-\d{4}$/.test(normalized)) return null;
    if (detailCache[normalized]) return detailCache[normalized];
    var response = await fetch('/api/dajs?dajId=' + encodeURIComponent(normalized), {
      credentials: 'include',
      cache: 'no-store'
    });
    var data = await response.json().catch(function () { return {}; });
    if (response.status === 401) throw searchError('Entre com Google para consultar o detalhe oficial do DAJ.', 'auth');
    if (response.ok && data.ok && data.item) {
      detailCache[normalized] = data.item;
      return data.item;
    }
    return null;
  }

  async function enrichItems(items) {
    var unique = [];
    var seen = Object.create(null);
    (items || []).forEach(function (item) {
      var id = normalizeDajId(item && item.id);
      if (!/^DAJ-\d{4}-\d{4}$/.test(id) || seen[id]) return;
      seen[id] = true;
      unique.push(item);
    });
    var enriched = await Promise.all(unique.slice(0, 50).map(async function (item) {
      var detail = await fetchDajDetail(item.id);
      return detail || item;
    }));
    return enriched;
  }

  function renderSearchResults(items, emptyMessage) {
    if (!searchResults) return;
    searchResults.textContent = '';
    if (!items.length) {
      renderEmpty(searchResults, 'Nenhum DAJ encontrado', emptyMessage || 'A consulta nao encontrou registro correspondente no indice governado.');
      return;
    }
    items.forEach(function (item) { renderItem(item, searchResults); });
  }

  async function loadRegistry() {
    setStatus('Lendo o cadastro oficial de DAJs...', 'loading');
    try {
      var fetchedItems = await fetchRegistryItems();
      registryItems = fetchedItems.slice();
      var items = fetchedItems.slice().sort(function (left, right) {
        if (left.id === requestedDajId) return -1;
        if (right.id === requestedDajId) return 1;
        return String(right.updatedAt || '').localeCompare(String(left.updatedAt || ''));
      });
      list.textContent = '';
      if (!items.length) renderEmpty();
      else items.forEach(function (item) { renderItem(item); });
      setStatus(items.length + (items.length === 1 ? ' DAJ confirmado' : ' DAJs confirmados') + ' no cadastro oficial.', 'success');
    } catch (error) {
      if (error && error.code === 'auth') {
        setStatus('Entre com Google para consultar os DAJs do cadastro oficial.', 'error');
        if (loginLink) loginLink.hidden = false;
        return;
      }
      setStatus(error && error.message ? error.message : 'Falha de comunicacao com o cadastro oficial. Nenhum dado local foi presumido.', 'error');
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

  function currentSearchType() {
    return searchType && searchType.value ? searchType.value : 'daj';
  }

  function updateSearchHelp() {
    if (!searchQuery) return;
    var type = currentSearchType();
    if (type === 'nome') {
      if (searchLabel) searchLabel.textContent = 'Nome da parte';
      if (searchHelp) searchHelp.textContent = 'Consulta somente o indice interno autenticado. Use ao menos 3 caracteres.';
      searchQuery.placeholder = 'Ex.: Parte Alfa Ficticia';
      searchQuery.inputMode = 'text';
    } else if (type === 'cpf') {
      if (searchLabel) searchLabel.textContent = 'CPF exato';
      if (searchHelp) searchHelp.textContent = 'O CPF integral nao aparece na tela; a busca usa HMAC exato e falha fechada sem chave configurada.';
      searchQuery.placeholder = '000.000.000-00';
      searchQuery.inputMode = 'numeric';
    } else if (type === 'processo') {
      if (searchLabel) searchLabel.textContent = 'Numero do processo';
      if (searchHelp) searchHelp.textContent = 'Informe numero CNJ com 20 digitos. A busca consulta o vinculo DAJ-processo governado.';
      searchQuery.placeholder = '0000000-00.0000.0.00.0000';
      searchQuery.inputMode = 'numeric';
    } else if (type === 'detalhes') {
      if (searchLabel) searchLabel.textContent = 'Status, area, urgencia ou sigilo';
      if (searchHelp) searchHelp.textContent = 'Pesquisa os detalhes oficiais carregados do DAJ: status, area, urgencia, atencao, sigilo, fluxo e autoria.';
      searchQuery.placeholder = 'Ex.: Familia, urgente, restrito, triagem';
      searchQuery.inputMode = 'text';
    } else {
      if (searchLabel) searchLabel.textContent = 'DAJ';
      if (searchHelp) searchHelp.textContent = 'Informe o identificador completo ou os quatro digitos finais.';
      searchQuery.placeholder = 'DAJ-2026-0002';
      searchQuery.inputMode = 'text';
    }
  }

  function buildSearch() {
    var type = currentSearchType();
    var value = String(searchQuery && searchQuery.value || '').trim();
    if (type === 'daj') {
      var dajId = normalizeDajId(value);
      if (!/^DAJ-\d{4}-\d{4}$/.test(dajId)) throw searchError('Informe o DAJ no formato DAJ-2026-0002 ou apenas os quatro digitos finais.', 'input');
      return { type: type, dajId: dajId, display: dajId };
    }
    if (type === 'nome') {
      var nome = value.replace(/[<>[\]{}|\\]/g, ' ').replace(/\s+/g, ' ').trim();
      if (normalizeText(nome).length < 3) throw searchError('Informe pelo menos 3 caracteres do nome da parte.', 'input');
      return { type: type, nome: nome, display: 'nome informado (' + nome.length + ' caracteres)' };
    }
    if (type === 'cpf') {
      var cpf = onlyDigits(value);
      if (!isValidCpf(cpf)) throw searchError('CPF invalido. Informe o numero completo; a Jus 9 nao completa nem deduz documentos.', 'input');
      return { type: type, cpf: cpf, display: 'CPF mascarado ***.***.***-' + cpf.slice(-2) };
    }
    if (type === 'processo') {
      var processDigits = onlyDigits(value);
      if (processDigits.length !== 20) throw searchError('Informe o numero CNJ completo, com 20 digitos.', 'input');
      return { type: type, processNumber: formatCnj(processDigits), display: formatCnj(processDigits) };
    }
    if (normalizeText(value).length < 2) throw searchError('Informe ao menos 2 caracteres para pesquisar detalhes.', 'input');
    return { type: 'detalhes', query: normalizeText(value), display: value };
  }

  function errorMessageForSearch(error) {
    var message = error && error.message ? error.message : 'Consulta nao concluida.';
    if (error && error.code === 'auth') return 'Entre com Google para pesquisar o cadastro oficial de DAJs.';
    return message;
  }

  async function searchByDaj(search) {
    var detail = await fetchDajDetail(search.dajId);
    if (!detail) return [];
    return [detail];
  }

  async function searchByProcess(search) {
    var response = await fetch('/api/daj-process-links?searchType=processo&processNumber=' + encodeURIComponent(search.processNumber), {
      credentials: 'include',
      cache: 'no-store'
    });
    var data = await response.json().catch(function () { return {}; });
    if (response.status === 401) throw searchError('Entre com Google para pesquisar DAJs por processo.', 'auth');
    if (!response.ok || !data.ok || !Array.isArray(data.items)) throw searchError('Nao foi possivel consultar o indice DAJ-processo.', 'process');
    return enrichItems(data.items);
  }

  async function searchByParty(search) {
    var body = search.type === 'cpf'
      ? { searchType: 'cpf', cpf: search.cpf }
      : { searchType: 'nome', nome: search.nome };
    var response = await fetch('/api/judicial/parties/search', {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    var data = await response.json().catch(function () { return {}; });
    if (response.status === 401) throw searchError('Entre com Google para pesquisar nome ou CPF no indice governado.', 'auth');
    if (response.status === 403) throw searchError('Seu perfil nao possui permissao dajs:read para consultar partes.', 'forbidden');
    if (!response.ok || !data.ok || !Array.isArray(data.items)) {
      throw searchError(data.error === 'indice_cpf_exato_configuracao_pendente'
        ? 'Indice exato de CPF indisponivel. A busca falhou fechada, sem comparar finais do documento.'
        : 'Nao foi possivel consultar o indice interno de partes.', 'party');
    }
    return enrichItems(data.items);
  }

  async function searchByDetails(search) {
    var items = registryItems.length ? registryItems : await fetchRegistryItems();
    registryItems = items.slice();
    var detailed = await enrichItems(items);
    return detailed.filter(function (item) {
      var operational = item.operational || {};
      var workflow = item.workflow || {};
      var authorship = item.authorship || {};
      var haystack = normalizeText([
        item.id,
        item.title,
        item.partyName,
        item.processNumber,
        item.tribunal,
        item.tribunalLabel,
        item.status,
        item.classification,
        item.environment,
        operational.area,
        operational.urgency,
        operational.attentionReason,
        operational.secrecyLevel,
        workflow.status,
        workflow.destinationProfile,
        workflow.reason,
        authorship.createdByProfile,
        authorship.updatedByProfile
      ].join(' '));
      return haystack.includes(search.query);
    });
  }

  async function runSearch() {
    if (!searchResults) return;
    var search;
    try {
      search = buildSearch();
    } catch (error) {
      setSearchStatus(errorMessageForSearch(error), 'error');
      renderSearchResults([], 'Ajuste a chave de consulta e tente novamente.');
      return;
    }
    setSearchStatus('Consultando cadastro oficial por ' + search.type + ': ' + search.display + '.', 'loading');
    try {
      var items;
      if (search.type === 'daj') items = await searchByDaj(search);
      else if (search.type === 'processo') items = await searchByProcess(search);
      else if (search.type === 'nome' || search.type === 'cpf') items = await searchByParty(search);
      else items = await searchByDetails(search);
      renderSearchResults(items, 'Nenhum DAJ encontrado para ' + search.display + '.');
      setSearchStatus(items.length + (items.length === 1 ? ' DAJ encontrado' : ' DAJs encontrados') + '. Consulta sem resultado inventado e sem exposicao de CPF integral.', items.length ? 'success' : 'info');
    } catch (error) {
      setSearchStatus(errorMessageForSearch(error), 'error');
      renderSearchResults([], 'A consulta falhou fechada. Nenhum dado local foi presumido.');
    }
  }

  if (loginLink) {
    loginLink.href = '/auth/google/start?return_to=' + encodeURIComponent(window.location.pathname + window.location.search);
  }
  if (searchType) {
    searchType.addEventListener('change', function () {
      updateSearchHelp();
      if (searchQuery) searchQuery.value = '';
    });
  }
  if (searchForm) {
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      runSearch();
    });
  }
  if (requestedDajId && searchType && searchQuery) {
    searchType.value = 'daj';
    searchQuery.value = requestedDajId;
  }
  updateSearchHelp();
  loadRegistry();
  loadWorkflowInbox();
})();
