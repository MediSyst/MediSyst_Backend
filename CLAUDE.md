# CLAUDE.md — MediSyst_Backend

## Visão Geral do Projeto

**MediSyst** é um sistema web para clínicas e médicos autônomos gerenciarem consultas.
O sistema permite que médicos cadastrem datas/horários de consultas e envia lembretes automáticos via WhatsApp para os pacientes confirmarem presença.

> **Nota**: Pacientes **não têm acesso ao sistema web**. Toda interação do paciente é 100% via WhatsApp.

### Funcionalidades Principais

- **Agendamento de consultas**: Médico define datas e horários disponíveis.
- **Lembretes automáticos via WhatsApp**: Notificações enviadas dias/horas antes da consulta (configurável pelo médico, com valor default).
- **Confirmação de presença**: Paciente confirma comparecimento via WhatsApp.
- **Cancelamento e remarcação**: Ao cancelar, o sistema inicia conversa com o paciente para reagendar.
- **Encaixe de pacientes**: Quando um horário fica vago (cancelamento), o sistema tenta encaixar outros pacientes na fila de espera.
- **Integração N8N**: Fluxo de conversação WhatsApp gerenciado por um serviço N8N externo (detalhes a serem definidos).

---

## Stack Tecnológica

| Camada                   | Tecnologia                       |
| ------------------------ | -------------------------------- |
| Runtime                  | Node.js                          |
| Linguagem                | TypeScript (strict mode)         |
| Framework                | Express                          |
| Banco de Dados           | PostgreSQL                       |
| ORM                      | Prisma                           |
| Filas / Jobs             | BullMQ + Redis                   |
| Autenticação             | JWT (Access + Refresh Token)     |
| Validação                | Zod                              |
| Containerização          | Docker + Docker Compose          |
| Testes                   | Vitest                           |
| Linting                  | ESLint + Prettier                |
| Frontend (repo separado) | React + TypeScript               |

### Justificativa das Escolhas

- **Express** em vez de NestJS: menor overhead, mais direto, sem abstrações pesadas (decorators, DI containers). O desenvolvedor tem controle total.
- **Zod** em vez de class-validator: validação funcional, sem decorators, funciona nativamente com TypeScript (inferência de tipos automática).
- **Vitest** em vez de Jest: mais rápido, suporte nativo a TypeScript/ESM, API compatível com Jest.

---

## Arquitetura

### Padrão: Modular por Feature

Cada feature (domínio) é um módulo independente com seu próprio router, controller, service e schema de validação. Sem framework opinado — apenas organização por convenção.

```
src/
├── index.ts                       # Entry point — cria e inicia o server
├── app.ts                         # Configura Express (middlewares, rotas, error handler)
├── config/                        # Variáveis de ambiente tipadas
│   └── env.ts
├── lib/                           # Clientes compartilhados (prisma, redis, etc.)
│   ├── prisma.ts
│   └── redis.ts
├── middlewares/                    # Middlewares globais
│   ├── auth.middleware.ts
│   ├── validate.middleware.ts
│   └── error-handler.middleware.ts
├── modules/                       # Feature modules (um por domínio)
│   ├── auth/
│   │   ├── auth.routes.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.schema.ts         # Validação Zod
│   ├── users/
│   │   ├── users.routes.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.schema.ts
│   ├── patients/
│   │   ├── patients.routes.ts
│   │   ├── patients.controller.ts
│   │   ├── patients.service.ts
│   │   └── patients.schema.ts
│   ├── appointments/
│   │   ├── appointments.routes.ts
│   │   ├── appointments.controller.ts
│   │   ├── appointments.service.ts
│   │   └── appointments.schema.ts
│   ├── reminders/
│   │   ├── reminders.service.ts
│   │   └── reminders.worker.ts    # BullMQ worker (processa jobs)
│   ├── notifications/
│   │   ├── notifications.routes.ts    # Webhooks do N8N
│   │   ├── notifications.controller.ts
│   │   └── notifications.service.ts
│   └── waiting-list/
│       ├── waiting-list.routes.ts
│       ├── waiting-list.controller.ts
│       ├── waiting-list.service.ts
│       └── waiting-list.schema.ts
└── utils/                         # Helpers puros (sem dependências externas)
    └── jwt.ts
```

### Responsabilidade de cada camada

| Camada         | Faz                                      | Não faz                       |
| -------------- | ---------------------------------------- | ----------------------------- |
| **routes**     | Define rotas e aplica middlewares         | Lógica de negócio             |
| **controller** | Recebe req/res, chama service, retorna   | Acessa banco, valida input    |
| **service**    | Lógica de negócio, acessa Prisma         | Conhece req/res do Express    |
| **schema**     | Define e exporta schemas Zod             | Lógica de negócio             |
| **middleware** | Valida auth, input, trata erros globais  | Lógica específica de domínio  |

### Fluxo de uma request

```
Request → Router → Middleware(s) → Controller → Service → Prisma → Response
```

---

## Entidades Principais (Prisma Schema)

- **User** — Médicos, recepcionistas, admins (autenticação + roles).
- **Patient** — Dados do paciente (nome, telefone/WhatsApp, email).
- **Appointment** — Consulta agendada (data, hora, status, médico, paciente).
- **ReminderConfig** — Configuração de quando enviar lembretes (por médico, com default global).
- **ReminderLog** — Registro de lembretes enviados e respostas.
- **WaitingListEntry** — Pacientes na fila de espera para encaixe.

### Roles do Sistema

| Role           | Descrição                                    |
| -------------- | -------------------------------------------- |
| `ADMIN`        | Acesso total ao sistema                      |
| `DOCTOR`       | Gerencia suas próprias consultas e pacientes |
| `RECEPTIONIST` | Gerencia agenda de médicos vinculados        |

> Pacientes **não têm conta no sistema**. Interação é 100% via WhatsApp.

### Status de uma Consulta (Appointment)

```
SCHEDULED → REMINDED → CONFIRMED → COMPLETED
                    ↘ CANCELLED → (tenta encaixe via WaitingList)
                    ↘ NO_RESPONSE
```

---

## Convenções de Código

### Geral

- **Linguagem do código**: Inglês (variáveis, funções, classes, comentários técnicos).
- **Linguagem da documentação**: Português do Brasil.
- **TypeScript strict mode** habilitado.
- **Nenhum `any`** — tipagem explícita sempre.
- **Funções puras** sempre que possível nos services.
- **Sem classes** — preferir funções e objetos simples. Services são objetos com métodos, não classes.

### Nomenclatura

| Elemento        | Padrão             | Exemplo                      |
| --------------- | ------------------ | ---------------------------- |
| Arquivos        | kebab-case         | `auth.controller.ts`         |
| Funções         | camelCase          | `scheduleReminder()`         |
| Constantes      | UPPER_SNAKE_CASE   | `DEFAULT_REMINDER_HOURS`     |
| Variáveis       | camelCase          | `appointmentDate`            |
| Tipos/Interfaces| PascalCase         | `AppointmentResponse`        |
| Enums (Prisma)  | PascalCase         | `AppointmentStatus`          |

### Padrões Express

- Rotas agrupadas por módulo em `Router()` do Express.
- Middleware de validação usando Zod (`validate.middleware.ts`).
- Error handler centralizado como último middleware.
- Controllers **nunca** acessam Prisma diretamente — sempre via services.
- Services **nunca** conhecem `req` ou `res` — recebem dados tipados e retornam dados tipados.

### Git

- Commits em português, seguindo Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.
- Branch principal: `main`.
- Feature branches: `feat/nome-da-feature`.
- Hotfix branches: `fix/descricao-do-bug`.

---

## Variáveis de Ambiente

Arquivo `.env` na raiz (nunca commitado):

```env
# Banco de Dados
DATABASE_URL=postgresql://medisyst:medisyst@localhost:5432/medisyst_db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_ACCESS_SECRET=sua-chave-secreta-access
JWT_REFRESH_SECRET=sua-chave-secreta-refresh
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# App
PORT=3000
NODE_ENV=development

# N8N (Integração WhatsApp)
N8N_WEBHOOK_URL=http://seu-n8n-url/webhook/whatsapp
N8N_API_KEY=sua-api-key-n8n

# Lembretes (defaults)
DEFAULT_REMINDER_HOURS_BEFORE=24
```

---

## Comandos

### Desenvolvimento

```bash
# Subir toda a infra (PostgreSQL + Redis + API)
docker-compose up -d

# Subir apenas infra (banco + redis) para dev local
docker-compose up -d postgres redis

# Rodar API em modo desenvolvimento (hot-reload via tsx)
npm run dev

# Gerar Prisma Client após alterar schema
npx prisma generate

# Rodar migrations
npx prisma migrate dev

# Abrir Prisma Studio (visualizar dados)
npx prisma studio
```

### Testes

```bash
# Testes unitários
npm run test

# Testes com watch
npm run test:watch

# Cobertura de testes
npm run test:coverage
```

### Qualidade

```bash
# Lint
npm run lint

# Formatar código
npm run format
```

### Build

```bash
# Build de produção
npm run build

# Rodar em produção
npm run start
```

---

## Docker Compose — Serviços

| Serviço    | Porta | Descrição                 |
| ---------- | ----- | ------------------------- |
| `api`      | 3000  | API Express               |
| `postgres` | 5432  | Banco de dados PostgreSQL |
| `redis`    | 6379  | Broker de filas (BullMQ)  |

---

## Integração WhatsApp (N8N)

- A comunicação com WhatsApp é feita via **webhooks** com um serviço N8N externo.
- O MediSyst **envia** requests HTTP para o N8N quando precisa disparar mensagens.
- O N8N **chama** webhooks do MediSyst para reportar respostas dos pacientes.
- **Detalhes do fluxo N8N serão adicionados quando disponíveis.**

### Fluxo simplificado:

```
MediSyst (BullMQ job dispara) → POST N8N webhook → N8N envia WhatsApp
                                                          ↓
MediSyst (webhook recebe) ← POST callback N8N ← Paciente responde
```

---

## Decisões de Design

1. **Express puro + estrutura modular**: Sem framework opinado. Cada módulo é independente com routes → controller → service. Fácil de entender, testar e manter.

2. **Zod para validação**: Schemas Zod geram tipos TypeScript automaticamente (`z.infer<typeof schema>`). Elimina duplicação entre tipo e validação.

3. **BullMQ para lembretes**: Cada consulta gera delayed jobs no BullMQ com o delay calculado a partir da configuração do médico. Se o médico define "lembrar 24h antes", o job é agendado para `data_consulta - 24h`.

4. **Fila de espera (WaitingList)**: Quando uma consulta é cancelada, o sistema verifica automaticamente se há pacientes na fila de espera para aquele médico e tenta encaixar no horário vago.

5. **Separação Notifications vs Reminders**: O módulo `reminders` cuida da lógica de agendamento (quando enviar). O módulo `notifications` cuida do envio (como enviar — integração N8N).

6. **Sem classes, sem decorators**: Services e controllers são funções ou objetos com métodos. Sem DI container — dependências passadas explicitamente ou importadas diretamente.

---

## Pendências / A Definir

- [ ] Detalhes do fluxo N8N para integração WhatsApp (endpoints, payload, autenticação).
- [x] ~~Definir roles exatos do sistema~~ → ADMIN, DOCTOR, RECEPTIONIST (paciente não tem acesso).
- [ ] Estratégia de deploy em produção (cloud provider, CI/CD).
- [x] ~~Definir se paciente terá acesso ao sistema~~ → Interação 100% via WhatsApp.
