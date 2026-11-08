# Viara Implementation Plan

**Status:** Proposed roadmap for review  
**Approach:** Incremental, acceptance-tested delivery; no full application generation before architecture approval.

## Delivery principles

- Start with a thin vertical slice and validate assumptions before expanding.
- Keep backend calculations authoritative and deterministic.
- Ship no placeholder integration represented as complete functionality.
- Do not use real personal financial data in development or tests.
- Make age/privacy, currency, balance, and authentication decisions before the affected schema or public release.
- At each phase, review scope and acceptance criteria before proceeding.

## Phase 0 — Product and architecture approval

**Work**

- Review and ratify this PRD, technical architecture, data model, API boundaries, and UX guidelines.
- Decide MVP boundary, minimum age and minor safeguards, supported currency, balance/contribution semantics, date/timezone rules, category hierarchy, and recurrence workflow.
- Agree privacy/AI consent, deletion/export/retention, notification, and pilot measures.

**Exit criteria**

- Open decisions affecting initial schema and authentication are resolved.
- MVP scope and measurable acceptance criteria are approved.
- AI and external-provider processing is explicitly in or out of the MVP.

## Phase 1 — Project foundation

**Work**

- Establish `frontend/`, `backend/`, and documentation conventions.
- Pin supported runtimes/dependencies; configure environment templates without secrets.
- Establish local development, formatting, linting, type-checking, tests, and CI.
- Configure Django settings, PostgreSQL connectivity, and a custom user model before initial migrations.

**Exit criteria**

- A developer can follow documented commands to install, configure, run, and test each application.
- CI checks the initial code and migrations.
- No production secrets are committed; synthetic test data is used.

## Phase 2 — Design system and frontend foundation

**Work**

- Translate UI guidelines into tokens, typography, spacing, responsive navigation, and accessible shared controls.
- Set up routing, API client, query/error patterns, and loading/empty/error states.
- Implement responsive registration/login screens and authenticated shell.

**Exit criteria**

- Primary layouts work on mobile and desktop widths and can be navigated by keyboard.
- Forms provide accessible feedback and server errors are not hidden.
- No financial feature is represented as functional before its backend exists.

## Phase 3 — Backend foundation and identity

**Work**

- Configure DRF, versioned routing, database migrations, authentication lifecycle, profile/preferences, and API error conventions.
- Implement ownership permissions and query scoping as shared, tested patterns.
- Add security configuration, CORS, rate limits for sensitive endpoints, and health checks.

**Exit criteria**

- Registration/login/logout and profile flows meet agreed policy.
- Tests prove one user cannot access another user's records.
- Secrets, tokens, and sensitive fields are absent from logs.

## Phase 4 — Core financial records

**Work**

- Implement categories, manual income/expense records, filtering, pagination, and CRUD.
- Implement documented decimal/currency/date semantics and transaction validation.
- Add budgets, utilization calculations, savings goals, and contribution records.
- Add bills and recurrence only after their manual confirmation and duplicate-prevention rules are approved.

**Exit criteria**

- Calculation and ownership tests cover boundary dates, edits/deletes, categories, and user isolation.
- Contributions are not misrepresented as transfers or double-counted as expenses.
- Recurrence cannot silently create completed activity.

## Phase 5 — Dashboard and analytics

**Work**

- Implement summary service and dashboard endpoint against agreed definitions.
- Build dashboard, recent history, budget status, goal progress, and meaningful trends/breakdowns.
- Add empty, sparse-data, stale, and error states; provide textual chart summaries.

**Exit criteria**

- API totals match hand-calculated test fixtures for periods and edge cases.
- Every display states its time scope and does not imply bank access.
- Charts are understandable without colour alone and usable with assistive technology.

## Phase 6 — Insights, AI, and education

**Work**

- Implement deterministic insight rules and provenance before adding generated narrative.
- Approve AI provider, user disclosure/consent, context minimization, retention, and opt-out.
- Add provider-neutral assistant adapter, bounded context, timeouts, rate/cost controls, and safe failure behaviour.
- Develop reviewed financial literacy content and clarify content ownership.

**Exit criteria**

- AI cannot create authoritative totals or mutate records; outputs are grounded and labelled as guidance.
- Tests include sparse/incorrect data, provider failure, and ownership isolation.
- Education and advice are reviewed for clarity and appropriate limitations.

## Phase 7 — Quality, privacy, and deployment readiness

**Work**

- Run functional, integration, security, accessibility, responsive, performance, and migration tests.
- Resolve data export/deletion, retention, backup/restore, incident response, and monitoring.
- Configure production HTTPS, secrets, restricted origins, database backups, alerts, and deployment/rollback instructions.
- Conduct a controlled pilot using consented, appropriately handled data and approved success measures.

**Exit criteria**

- No unresolved critical/high security or data-isolation issues.
- Backup restore and account deletion/export processes are verified.
- Production readiness checklist and operational ownership are approved.

## Cross-cutting test strategy

- **Unit:** currency/date arithmetic, period boundaries, category hierarchy, budget utilization, goal progress, recurrence idempotency, and insight rules.
- **API:** schema/validation, authentication, authorization, error contracts, pagination, and rate limits.
- **Integration:** transaction mutation reflected in summaries, budgets, insights, and goals as applicable.
- **Frontend:** primary flows, network failure, empty and loading states, responsive behaviour, and accessibility.
- **Security:** object-level authorization, input manipulation, CSRF/CORS/session configuration, sensitive logging, dependency review, and AI-context minimization.

## Dependency order

Architecture decisions → project foundation → identity and ownership → categories/transactions → budgets and goals → summary/dashboard → rules-based insights → optional AI, bills, recurrence, and delivery channels → production readiness.

The dependency order is not a mandate to build every listed feature. Phase scope should be revised after product review and user research.
