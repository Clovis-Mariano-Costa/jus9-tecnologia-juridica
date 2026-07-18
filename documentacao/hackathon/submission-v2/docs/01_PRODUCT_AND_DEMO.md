---
id: JUS9-BUILD-WEEK-V2-PRODUCT-001
versao: 2.0.0-candidate
autor: Codex / Charlie Fox
revisor_responsavel: Clovis Mariano da Costa
data: 2026-07-18
status: candidato-nao-final
classificacao: PUBLICO-SANITIZADO
hash: nao-aplicavel-pacote-candidato
---

# Product and Demo Path

## The problem

Legal teams frequently move between intake forms, documents, AI chats, case searches, and internal handoffs without a reliable shared record. This fragmentation increases rework and makes it difficult to distinguish verified information from generated suggestions.

## The Build Week product focus

Jus 9 DAJ provides one governed path:

1. a team member records a fictional initial intake;
2. the backend creates or updates an official DAJ record;
3. the user sends the DAJ to Charlie Echo;
4. the system opens a new isolated analysis room and reads the official record by ID;
5. Charlie returns a faithful summary, missing information, supported risks, objective questions, and explicit limits;
6. the result is routed to an appropriate human role;
7. the team can query public process metadata by CNJ case number through a read-only connector; and
8. one DAJ can be linked to one case with an auditable backend record.

## Expected demo result

The demo should prove that the system:

- saves the DAJ outside browser-local storage;
- does not reuse an unrelated chat room;
- does not generate a generic legal pleading when the intent is case search or DAJ analysis;
- gives feedback after analysis;
- fails closed when an official source is unavailable;
- never invents a Drive URL, case, party, author, page, deadline, or source;
- keeps legal responsibility with the human team.

## Recommended video flow

- 0:00-0:20: real workflow problem.
- 0:20-0:40: Jus 9 DAJ and governed AI approach.
- 0:40-1:25: fictional intake and backend save.
- 1:25-2:05: isolated Charlie analysis, feedback, and routing.
- 2:05-2:30: process metadata and DAJ linkage.
- 2:30-2:45: Codex contribution, evidence, and human governance.

The final video must remain under three minutes and use English audio or an English translation.
