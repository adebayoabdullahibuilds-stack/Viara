# Viara Technical Requirements Document

**Status:** Proposed for review

## 1. Technical direction

Use a decoupled monorepo with a React/TypeScript web client and a Python/Django REST API backed by PostgreSQL. The browser communicates only with the versioned API; the backend owns authorization, validation, financial calculations, and persistence. External AI providers are accessed only through a backend service boundary.

## 2. Proposed stack

### Frontend

- React 19, TypeScript, Vite.
- Tailwind CSS, shadcn/ui, and Radix UI.
- React Router for application routes.
- TanStack Query for server state and request lifecycle.
- Zustand only for small client-owned state such as transient UI preferences.
- Axios for API transport, with a shared typed client and explicit error mapping.
- Recharts for data visualisation; Lucide icons.
- React Hook Form and Zod may be used for form state and client feedback, while server validation remains authoritative.

### Backend

- Supported Python release selected and pinned at project initialization.
- Django and Django REST Framework.
- PostgreSQL as the source of truth.
- JWT authentication using a maintained DRF-compatible library.
- Django migrations for schema changes.
- Provider-neutral AI adapter; no provider SDK or key in browser code.

### Deferred infrastructure

Redis, Celery, email/push delivery, object storage, analytics/forecasting packages, and deployment platform are not required merely by the product vision. Add them only when a defined async job, delivery channel, or operational need justifies them. Do not introduce fake integrations or services that are not configured.

## 3. Repository layout

```text
viara/
├── frontend/
│   ├── src/
│   │   ├── app/                 # router, providers, app shell
│   │   ├── features/            # auth, dashboard, transactions, budgets, goals
│   │   ├── components/          # shared UI components
│   │   ├── lib/                 # API client, formatting, shared utilities
│   │   ├── hooks/
│   │   └── types/
│   ├── public/
│   └── package.json
├── backend/
│   ├── config/                  # settings, root URLs, ASGI/WSGI
│   ├── apps/
│   │   ├── accounts/
│   │   ├── transactions/
│   │   ├── budgets/
│   │   ├── goals/
│   │   ├── bills/
│   │   ├── notifications/
│   │   └── assistant/
│   ├── manage.py
│   └── requirements/            # or a single pinned project manifest
├── docs/
├── .env.example
├── .gitignore
└── README.md
```

Each Django app may separate `models`, `serializers`, `views`, `services`, `permissions`, and `urls` as the domain requires. Avoid creating empty modules solely to match a template. Cross-domain operations belong in explicit services, not complex view or serializer methods.

## 4. Runtime and configuration

- Keep local, test, and production settings distinct while sharing secure defaults.
- Load secrets and environment-specific values from environment configuration; commit only placeholders in `.env.example`.
- Require explicit allowed hosts, CORS origins, database configuration, and secret keys outside local development.
- Do not use wildcard CORS for credentialed requests.
- Provide documented local setup, migration, test, and run commands when implementation begins.
- Use representative synthetic fixtures only. Do not use real personal financial records.

## 5. Data and financial correctness

- Persist monetary amounts as fixed-precision decimal values, never binary floating point. API JSON should represent amounts as decimal strings and include currency.
- Initially support a single currency per record and do not silently convert or aggregate unlike currencies. Any multi-currency dashboard requires an explicit conversion source and policy.
- Store transaction date separately from creation/update timestamps. Define date filters in the user's configured timezone and use a consistent inclusive/exclusive interval convention.
- All user-owned records carry a non-null owner relation and are scoped by the authenticated user in every query and mutation.
- Use database constraints for positive amounts, valid period boundaries, unique ownership-sensitive relationships, and other invariants where practical; also validate at the API boundary.
- A transaction edit or deletion must be reflected in downstream summaries. Avoid maintaining denormalized totals until correctness and invalidation are designed.
- Savings contributions and bill status are not external transfers or payments. A paid bill should not also be counted as an expense unless linked to exactly one recorded expense under an agreed workflow.

## 6. API and service rules

- Prefix endpoints with `/api/v1/`.
- Use DRF serializers for input/output validation and permissions/querysets for user access.
- Use services for aggregations, budget calculations, insight rules, recurrence generation, and AI context creation.
- Return stable machine-readable error codes and human-readable field errors; do not disguise failures as empty successful responses.
- Paginate potentially unbounded histories and bound date ranges where needed.
- Document request/response shapes, authentication, filtering, and errors in `API_SPECIFICATION.md`.
- Financial totals are calculated by backend code. The AI service may explain supplied figures but cannot authoritatively calculate, persist, or mutate them.

## 7. Authentication and session design

Use a mature JWT implementation rather than custom token cryptography. Proposed baseline: short-lived access token and rotated, revocable refresh token. Prefer an HttpOnly, Secure, SameSite refresh cookie for browser sessions, with CSRF protection for cookie-authenticated refresh/logout endpoints; keep access-token handling short-lived and out of persistent browser storage where practical. Final cookie/CORS deployment settings require environment review.

Registration, password reset, token rotation, logout/revocation, rate limits, email verification, and account recovery require explicit flows and tests before launch. Never log passwords, tokens, reset links, or authorization headers.

## 8. Quality requirements

- Unit tests for money/date calculations, serializers, and domain services.
- API tests for authentication, validation, ownership isolation, pagination, and error shapes.
- Frontend tests for critical flows and loading/empty/error states.
- Integration tests for dashboard summaries and dependent records.
- Accessibility and responsive checks for primary flows.
- CI should run formatting, linting, type checks, tests, and migration consistency once tooling is established.
- Dependencies should be pinned/locked and updated deliberately.

## 9. Operational requirements

- Provide a health endpoint that does not disclose sensitive configuration.
- Use structured logs with correlation/request identifiers; redact financial content unless strictly required.
- Define backup/restore, retention, incident response, and production monitoring before handling real user data.
- Use HTTPS in deployed environments and secure database connections.
- AI calls require timeouts, bounded context, explicit failure handling, privacy review, and cost controls.

## 10. Technical decisions still required

- Supported Python and package versions and dependency management approach.
- Auth library, email verification, and password reset provider.
- Cookie/token transport aligned with actual frontend/backend deployment origins.
- Hosting, CI provider, database operations, backups, and observability.
- Supported currency scope and locale/timezone model.
- AI provider and data-processing terms.
- Notification delivery channels and asynchronous processing need.
- Whether frontend components and API schemas need a shared generated contract.
