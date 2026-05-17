/**
 * Jus 9 Tecnologia Jurídica
 * Repositório: jus9-tecnologia-juridica
 * Software livre com autoria preservada.
 * Direitos autorais reservados para Jus 9 Tecnologia Jurídica.
Produção do site: © Jus 9 Tecnologia Jurídica. Direitos autorais da produção reservados.
 * A licença livre não remove autoria, origem, assinatura institucional nem direitos autorais.
 * Referência oficial: https://www.jus9tecnologia.com.br/
 * E-mail de contato: clovis@jus9tecnologia.com.br
 * DNA de referência de Charlie Echo da Costa: charlieecho-jus9-tecnologia-juridica
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3009;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

const profiles = [
  "admin_sistema",
  "advogado_lider",
  "advogado",
  "assessor_chefe",
  "assessor",
  "secretaria",
  "estagio"
];

const dajs = [
  {
    id: "daj_2026_0001",
    numero: "DAJ-2026-0001",
    cliente: "Cliente demonstração",
    areaAparente: "Cível / Contratual",
    responsavel: "Advogado titular",
    advogadoTitularId: "user_adv_001",
    sigilo: "restrito",
    razaoAtencao: "prazo",
    status: "em_triagem"
  }
];

const documentos = [
  {
    id: "doc_001",
    dajId: "daj_2026_0001",
    titulo: "Contrato de prestação de serviços",
    status: "pendente_conferencia",
    origem: "cliente",
    downloadUrl: "/documentos/contrato-prestacao-servicos-demo.txt"
  },
  {
    id: "doc_002",
    dajId: "daj_2026_0001",
    titulo: "Comprovantes de pagamento",
    status: "faltante",
    origem: "solicitado_ao_cliente"
  }
];

function canAccessSecret({ user, item }) {
  // Regra máxima: Secreto/Cofre pertence ao advogado titular.
  if (!item || !["secreto", "cofre"].includes(item.sigilo || item.status)) return true;
  return user && user.id === item.advogadoTitularId;
}

app.get("/health", (_, res) => res.json({ ok: true, service: "Jus 9 MVP Backend" }));

app.get("/api/profiles", (_, res) => res.json({ profiles }));

app.get("/api/dajs", (_, res) => res.json({ items: dajs }));

app.post("/api/dajs", (req, res) => {
  const next = {
    id: `daj_${Date.now()}`,
    numero: `DAJ-2026-${String(dajs.length + 1).padStart(4, "0")}`,
    cliente: req.body.cliente || "Cliente sem nome",
    areaAparente: req.body.areaAparente || "Ainda não classificada",
    responsavel: req.body.responsavel || "A definir",
    advogadoTitularId: req.body.advogadoTitularId || null,
    sigilo: req.body.sigilo || "comum",
    razaoAtencao: req.body.razaoAtencao || "outro",
    status: "em_triagem"
  };
  dajs.push(next);
  res.status(201).json(next);
});

app.get("/api/dajs/:id/documentos", (req, res) => {
  res.json({ items: documentos.filter((d) => d.dajId === req.params.id) });
});

app.post("/api/processos/consulta", (req, res) => {
  const { numeroCnj, tribunal, fonte, dajId } = req.body;
  res.json({
    fonte: fonte || "simulacao",
    numeroCnj,
    tribunal,
    dajId,
    aviso: "Consulta demonstrativa. Integração DataJud/CNJ deve respeitar disponibilidade, sigilo, limites e peculiaridades por tribunal.",
    movimentos: [
      { data: "2026-05-08", movimento: "Conclusos para decisão" },
      { data: "2026-05-06", movimento: "Juntada de documento" },
      { data: "2026-05-04", movimento: "Intimação publicada" }
    ]
  });
});

app.post("/api/auditoria", (req, res) => {
  res.status(201).json({
    ok: true,
    registro: {
      id: `audit_${Date.now()}`,
      ...req.body,
      criadoEm: new Date().toISOString()
    }
  });
});

app.listen(port, () => {
  console.log(`Jus 9 MVP Backend ouvindo na porta ${port}`);
});
