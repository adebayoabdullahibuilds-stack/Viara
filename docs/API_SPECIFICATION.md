# Viara API Specification

**Status:** Proposed contract for review  
**Base path:** `/api/v1/`  
**Transport:** HTTPS with JSON request/response bodies

This is a proposed boundary and contract outline, not an implemented or OpenAPI-validated specification. Endpoint details should be finalized alongside acceptance tests.

## 1. Common conventions

- Authenticate protected routes with the selected JWT/session transport.
- Resolve the owner from the authenticated principal; never accept an authoritative `user_id` in a request body.
- Use UUID resource identifiers unless implementation selects another consistent opaque identifier.
- Represent amounts as decimal strings and include an ISO currency code, for example `{"amount":"1250.00","currency":"NGN"}`. Do not serialize monetary values as floating-point JSON numbers.
- Use ISO-8601 dates/timestamps. Transaction dates are calendar dates; timestamps are timezone-aware.
- Use pagination for collections, with bounded page size and stable ordering. Filtering must be allow-listed.
- Date-range filters use a documented inclusive start and exclusive end convention.
- Do not aggregate mixed currencies or silently convert.
- Use explicit `400` validation, `401` unauthenticated, `403` forbidden, `404` not found, `409` conflict where applicable, `429` rate limit, and `5xx` service errors.
- Return stable error codes and field errors. Never turn a failed request into an empty success.

Suggested error body:

```json
{
  "error": {
    "code": "validation_error",
    "message": "Check the highlighted fields.",
    "fields": {"amount": ["Enter a positive amount."]}
  }
}
```

## 2. Authentication and profile

| Method | Path | Purpose |
|---|---|---|
| POST | `/auth/register/` | Create an account |
| POST | `/auth/login/` | Authenticate and establish token/session |
| POST | `/auth/refresh/` | Rotate/refresh authentication as configured |
| POST | `/auth/logout/` | Revoke/clear refresh session |
| GET/PATCH | `/me/` | Read/update current user's profile |
| GET/PATCH | `/me/preferences/` | Read/update currency, locale, timezone, and preferences |

Registration, verification, password reset, deletion, and recovery routes depend on the chosen account policy and must be specified before release.

## 3. Transactions and categories

| Method | Path | Purpose |
|---|---|---|
| GET/POST | `/transactions/` | List or create current user's records |
| GET/PATCH/DELETE | `/transactions/{id}/` | Read, update, or delete an owned record |
| GET | `/categories/` | List usable system and owned categories |
| POST | `/categories/` | Create a user category |
| GET/PATCH/DELETE | `/categories/{id}/` | Manage an owned category, subject to history rules |

Transaction list filters: `kind`, `category`, `date_from`, `date_to`, and bounded text `search`. Sort fields must be allow-listed. Create/update fields include kind, amount, currency, transaction date, optional category, source label, description, and notes. Ownership is never writable.

## 4. Dashboard and analytics

| Method | Path | Purpose |
|---|---|---|
| GET | `/dashboard/summary/?from=...&to=...` | Calculated totals, budget/goal snapshot, and recent records |
| GET | `/analytics/trends/?from=...&to=...&interval=...` | Periodic income/expense series |
| GET | `/analytics/categories/?from=...&to=...&kind=expense` | Category breakdown |
| GET | `/insights/` | Current user's actionable observations |
| POST | `/insights/{id}/dismiss/` | Dismiss an owned observation |

All summary responses include currency, date scope, and explicit calculated values. Trend responses should include missing periods as a documented zero/null policy rather than making gaps ambiguous. Detailed response shapes and limits should be agreed with frontend consumers.

## 5. Budgets and goals

| Method | Path | Purpose |
|---|---|---|
| GET/POST | `/budgets/` | List/create budgets |
| GET/PATCH/DELETE | `/budgets/{id}/` | Manage a budget |
| GET | `/budgets/{id}/status/` | Calculate utilization and remaining amount |
| GET/POST | `/goals/` | List/create goals |
| GET/PATCH/DELETE | `/goals/{id}/` | Manage a goal |
| GET/POST | `/goals/{id}/contributions/` | List/add user-recorded contributions |
| PATCH/DELETE | `/goals/{id}/contributions/{contribution_id}/` | Correct/remove an owned contribution |

Budget status is server-calculated. Goal guidance should be returned only when the service has sufficient validated data and should disclose assumptions. A contribution endpoint records an allocation only; it does not move money.

## 6. Bills and recurrence

| Method | Path | Purpose |
|---|---|---|
| GET/POST | `/bills/` | List/create bills |
| GET/PATCH/DELETE | `/bills/{id}/` | Manage a bill |
| POST | `/bills/{id}/mark-paid/` | Record manually confirmed payment status |
| GET/POST | `/recurrences/` | List/create schedule rules |
| GET/PATCH/DELETE | `/recurrences/{id}/` | Manage a recurrence rule |
| POST | `/recurrences/{id}/confirm-occurrence/` | Confirm a due occurrence and create its record |

The exact recurrence workflow is an open decision. No endpoint may imply a payment was made or transaction occurred merely because a schedule became due.

## 7. Notifications and assistant

| Method | Path | Purpose |
|---|---|---|
| GET | `/notifications/` | List current user's notifications |
| POST | `/notifications/{id}/read/` | Mark an owned notification read |
| GET/POST | `/assistant/conversations/` | List/create conversations |
| GET | `/assistant/conversations/{id}/messages/` | Read an owned conversation |
| POST | `/assistant/conversations/{id}/messages/` | Submit a user question and receive grounded guidance |

Assistant requests should have bounded input, rate limits, and explicit consent. Responses should distinguish verified application calculations from AI-generated interpretation. Provider errors and unavailable service must be explicit; no financial operation depends on assistant availability.

## 8. Ownership, validation, and compatibility

- Every list queryset filters by authenticated user before pagination/search.
- Detail endpoints return not-found for inaccessible foreign records where appropriate to avoid disclosing their existence.
- Validate relationship ownership, category kind, amount, date range, currency, and state transitions on the backend.
- Use API versioning for breaking changes and document deprecation.
- Add contract tests for success, validation, authentication, ownership denial, pagination, and calculation consistency.
- Publish a machine-readable OpenAPI schema once implementation and the chosen schema tooling are established; do not claim this outline is a generated contract.
