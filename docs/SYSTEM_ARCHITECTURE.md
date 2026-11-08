# Viara System Architecture

**Status:** Proposed for review

## 1. Context and boundaries

```text
User
  │
  ▼
React web client ── HTTPS / JSON ──► Django REST API ──► PostgreSQL
                                             │
                                             ├──► Optional AI provider adapter
                                             └──► Future notification adapter
```

The browser is an untrusted client. It renders and collects user input but does not decide authorization or authoritative financial totals. The API is the trust boundary for identity, ownership, validation, domain rules, aggregations, and AI context. PostgreSQL is the source of truth. External providers are optional dependencies and must not be required for core record keeping.

Viara has no initial connection to banks, payment rails, wallets, or money movement.

## 2. Logical components

### Web client

- **App shell and routing:** authenticated and public route boundaries.
- **Feature modules:** identity, dashboard, transactions, budgets, goals, bills, analytics, assistant, and settings.
- **Shared UI/design system:** accessible controls, navigation, feedback, and data visualisations.
- **API client:** typed endpoints, authentication lifecycle, request cancellation, and explicit error handling.
- **Client state:** server state is fetched/cached with TanStack Query; Zustand is reserved for ephemeral client state.

### API

- **Accounts:** user identity, preferences, and authentication integration.
- **Transactions:** manual income/expense records and category ownership.
- **Budgets:** category limits, period rules, utilization, and threshold observations.
- **Goals:** targets and user-entered contributions.
- **Bills:** due dates and manually maintained status.
- **Notifications:** in-app notification records and preferences; delivery adapters are future work.
- **Assistant:** conversation orchestration, safe context assembly, provider adapter, and insight persistence.
- **Shared domain services:** date/amount rules and summary calculation where cross-feature use is justified.

Keep apps organized around business responsibilities. Avoid a single monolithic API app and avoid extracting a microservice before there is an operational need.

## 3. Main data flows

### Record and summary

1. The client submits a transaction to the versioned API.
2. Authentication identifies the user; serializer and domain validation check amount, date, currency, category, and ownership.
3. The transaction is persisted with the authenticated owner, never an owner supplied by the client.
4. A summary service queries only that user's records for the requested period and returns decimal-safe totals.
5. The client presents the result with its period and calculation context.

### Budget observation

1. A budget defines a category, period, and spending limit.
2. A service sums qualifying expenses using the agreed category hierarchy and period boundaries.
3. Deterministic threshold rules decide whether an observation is due.
4. A notification/insight explains the calculated utilization and links to relevant records.

### Savings guidance

1. The goal service calculates contributions, remaining amount, and progress from persisted records.
2. A rule service determines whether a pace estimate is supportable from the available history.
3. Optional AI may explain validated figures and suggest considerations, but cannot change the figures or claim money moved.

### AI coach

1. Authenticate and authorize the user.
2. Assemble a minimal, purpose-specific summary from permitted user records; do not send unrelated raw records by default.
3. Add the user's question and clear constraints to the provider-neutral AI adapter.
4. Validate and present the response as guidance, clearly separate from server-calculated facts.
5. Handle provider timeout, refusal, or outage explicitly; core finance features continue to work.

## 4. Trust and security boundaries

- All endpoints handling personal or financial data require authentication except intentionally public account flows and health checks.
- Querysets and object lookups are user-scoped; client-provided IDs must not bypass ownership checks.
- Validate all client input on the backend, including filters, sort fields, dates, and nested relationships.
- Keep provider credentials and signing secrets in server-side environment configuration.
- Restrict CORS to known frontend origins and protect cookie-based authentication flows against CSRF.
- Minimize AI context, disclose AI processing, offer an opt-out, and never include credentials or unnecessary identifiers.
- Rate-limit authentication and resource-intensive AI endpoints; set request/body and query-range limits.
- Use generic authentication errors where revealing account existence would create risk.
- Log security events without storing tokens, prompts containing unnecessary personal details, or raw financial records.
- Design user data export/deletion and retention/backup expiry before production.

## 5. Failure and consistency behaviour

- A failed API or AI request is an explicit error state, not a successful empty result.
- AI unavailability must not block transaction, budget, or goal operations.
- Server-calculated values are recomputed from persisted source records or invalidated safely after edits/deletions.
- Mutations that may be retried need an idempotency strategy if duplicate creation is a realistic client/network risk.
- Recurrence processing must not silently create completed transactions; proposed default is a due reminder/pending item requiring user confirmation.
- Notifications are derived from configured rules and should avoid duplicate delivery through stable identifiers/idempotent processing.

## 6. Deployment topology

Initial deployment may use a single frontend host, Django API service, and managed PostgreSQL instance, separated by configuration and network policy. A background worker, Redis, or message broker should be added only when asynchronous delivery or scheduled processing is selected. Production deployment must use HTTPS, restricted origins, managed secrets, database backups, migrations, monitoring, and documented restore procedures.

## 7. Architectural decisions requiring review

1. Confirm modular monolith as the initial backend shape.
2. Confirm browser JWT transport and CSRF strategy for actual deployment origins.
3. Decide whether recurring reminders need a scheduler/worker in the MVP.
4. Decide whether notification delivery is in-app only at first.
5. Confirm AI vendor, retention/processing rules, consent, and opt-out.
6. Decide account deletion/export and data retention semantics.
7. Confirm age and localization requirements, including timezone and currency support.
