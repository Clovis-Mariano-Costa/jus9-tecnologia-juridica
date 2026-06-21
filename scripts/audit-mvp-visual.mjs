#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = fs.readdirSync(root).filter((file) => /^app-demo-.*\.html$/.test(file)).sort();

const requiredDemoChecks = [
  ['estrutura demo-shell', /class="[^"]*demo-shell/],
  ['menu demo-sidebar', /class="[^"]*demo-sidebar/],
  ['barra superior demo-topbar', /class="[^"]*demo-topbar/],
  ['aviso de demo sem dados reais', /SEM DADOS REAIS|Sem dados reais|sem dados reais|DEMO/i],
  ['atalho para IA ou Charlie Echo', /app-ia|IA Profissional|Charlie Echo/i],
  ['atalho para agenda', /app-agenda|Agenda/i],
  ['favicon', /rel="(?:shortcut )?icon|favicon/i],
];

const mvpChecks = [
  ['mvp.html', 'porta dos demos', /Demo 1|Demo 14|Escolha seu Demo/i],
  ['mvp.html', 'aviso sem dados reais', /Sem dados reais|nao inserir dados reais|n.o inserir dados reais/i],
  ['mvp.html', 'atalho para IA profissional', /app-ia-profissional\.html|IA Profissional/i],
  ['mvp.html', 'atalho para agenda', /app-agenda\.html|Agenda Jus 9/i],
];

const failures = [];

if (files.length !== 14) {
  failures.push(`Esperados 14 app-demo-*.html; encontrados ${files.length}.`);
}

for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  for (const [label, pattern] of requiredDemoChecks) {
    if (!pattern.test(html)) {
      failures.push(`${file}: ausente ${label}.`);
    }
  }

  const actionCount = (html.match(/<a\b|<button\b/gi) || []).length;
  if (actionCount < 8) {
    failures.push(`${file}: poucos botoes/links acionaveis (${actionCount}).`);
  }
  if (actionCount > 48) {
    failures.push(`${file}: excesso de botoes/links acionaveis (${actionCount}); revisar prioridade visual.`);
  }
}

for (const [file, label, pattern] of mvpChecks) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    failures.push(`${file}: arquivo nao encontrado.`);
    continue;
  }
  const html = fs.readFileSync(fullPath, 'utf8');
  if (!pattern.test(html)) {
    failures.push(`${file}: ausente ${label}.`);
  }
}

const cssPath = path.join(root, 'style.css');
const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';
for (const selector of ['.demo-shell', '.demo-card', '.demo-sidebar', '.demo-topbar', '.demo-session-notice']) {
  if (!css.includes(selector)) {
    failures.push(`style.css: seletor ${selector} ausente.`);
  }
}

if (failures.length) {
  console.error('Auditoria visual dos MVPs encontrou pendencias:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Auditoria visual MVP OK: ${files.length} demos verificados; avisos, links essenciais e padrao visual presentes.`);
