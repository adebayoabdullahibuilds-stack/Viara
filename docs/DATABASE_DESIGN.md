# Viara Database Design

**Status:** Proposed for review  
**Database:** PostgreSQL

This is a logical starting model, not a migration. Field names and exact constraints may change during implementation. Every private record is owned directly by a user or reachable only through a user-owned parent; all API lookups must enforce that ownership.

## 1. Entity overview

```text
User 1──* Category
User 1──* Transaction *──0..1 Category
User 1──* Budget *──1 Category
User 1──* SavingsGoal 1──* SavingsContribution
User 1──* Bill
User 1──* RecurrenceRule
User 1──* Notification
User 1──1 UserPreference
User 1──* Conversation 1──* Message
User 1──* FinancialInsight
```

## 2. Entities and suggested fields

### User

Use Django's supported user model, preferably a project-defined custom user model configured before the first migration.

- `id`: UUID primary key (proposed).
- Authentication identifier (email or another selected unique identifier), password hash, active/staff flags, and framework-managed timestamps.
- Store only profile fields needed for the product; do not collect sensitive identity details without a defined purpose.

### UserPreference

- `id`, `user_id` (one-to-one), `currency_code`, `timezone`, locale, notification preferences, AI consent/opt-out state, and timestamps.
- Default locale/currency can be NGN/en-NG, subject to the decision on supported currencies.

### Category

- `id`, `user_id` (nullable only for immutable system categories), `name`, `kind` (income/expense), optional `parent_id`, `is_active`, timestamps.
- System categories may be shared read-only; user-created categories are scoped to their owner.
- Enforce category kind compatibility and prevent cross-user parent references and cycles in service validation.
- Deletion policy must preserve historical transaction meaning, for example archival or protected deletion.

### Transaction

- `id`, `user_id`, `kind` (income/expense), `amount` (`NUMERIC`, fixed precision and positive), `currency_code`, `transaction_date`, nullable `category_id`, optional `source_label`, description/notes, optional recurrence reference, timestamps.
- Represents a manually entered record, not a verified bank transaction.
- Index user/date and user/kind/date; use database constraints where they can express invariants safely.
- Proposed initial policy: one currency per transaction; no implicit FX conversion.

### Budget

- `id`, `user_id`, `category_id`, `amount_limit`, `currency_code`, `period_type`, `period_start` or configured period anchor, optional threshold configuration, active state, timestamps.
- Define whether overlapping budgets and parent/child budgets are allowed before enforcing uniqueness.
- Utilization is derived from qualifying expense transactions; do not store a mutable total as the source of truth.

### SavingsGoal

- `id`, `user_id`, `name`, `target_amount`, `currency_code`, optional `target_date`, status, timestamps.
- Progress and remaining amount are derived from associated contributions.

### SavingsContribution

- `id`, `user_id`, `goal_id`, `amount`, `currency_code`, `contribution_date`, optional note, timestamps.
- `user_id` should match the goal owner, enforced in service logic and, if practical, through database design/constraints.
- This records the user's stated allocation toward a goal; it does not assert funds were transferred or held.

### Bill

- `id`, `user_id`, title, amount, `currency_code`, due date, status (upcoming/paid/cancelled or a reviewed state machine), optional recurrence reference, paid date, timestamps.
- Status is manually maintained. A bill is not itself an expense. If a paid bill is linked to a transaction, enforce that the transaction is owned by the same user and prevent double counting.

### RecurrenceRule

- `id`, `user_id`, record kind, schedule/frequency, next due date, optional end date, transaction/bill template fields, active state, timestamps.
- A schedule is not evidence that an event occurred. Proposed workflow creates a due reminder or pending draft and waits for user confirmation before creating a completed transaction.
- Recurrence generation needs idempotency keys or a unique occurrence identity.

### Notification

- `id`, `user_id`, type, title/body or structured payload, optional target reference, created/read timestamps, delivery channel/status if delivery is implemented.
- Do not store unnecessary financial detail in a push/email payload.

### Conversation and Message

- `Conversation`: `id`, `user_id`, title/created/updated timestamps.
- `Message`: `id`, `conversation_id`, role, content, created timestamp, optional provider/model metadata that is safe to retain.
- Retention, deletion, user disclosure, and provider processing policies must be decided before storing prompts or responses. Avoid persisting expanded raw financial context by default.

### FinancialInsight

- `id`, `user_id`, type, source period, deterministic rule/version, structured calculated evidence, optional explanatory text, status/read/dismissed fields, timestamps.
- Store enough provenance to explain an observation; keep financial calculations reproducible. AI-generated text must not replace calculated evidence.

## 3. Relationship and integrity rules

- Every transaction, budget, goal, contribution, bill, recurrence, notification, conversation, and insight is scoped to one user.
- The client cannot choose or change `user_id`; derive it from authentication.
- A transaction's category must be system-visible or owned by the same user and have a compatible kind.
- A contribution must reference a goal owned by the same user.
- A linked bill and transaction must have the same owner.
- Amounts must be positive decimals with a documented precision/scale. The precision and maximum allowed amount require product validation.
- Currency codes must be valid and explicit; unlike currencies are not summed together.
- Use explicit foreign-key deletion policies. Prefer preserving or archiving categories referenced by history; use cascade only where data-loss behaviour is deliberate and documented.
- Add indexes for common owner/date, owner/status, and relationship lookups after query patterns are tested.

## 4. Calculation semantics to ratify

Proposed dashboard semantics:

- **Income:** sum income transactions in the selected period.
- **Expenses:** sum expense transactions in the selected period.
- **Savings allocated:** sum contributions in the selected period.
- **Available amount:** recorded income minus recorded expenses minus recorded savings allocations, for the explicitly labelled period or all-time scope.
- **Goal progress:** sum valid contributions for a goal; remaining = max(target − contributions, 0).
- **Budget spent:** expense transaction amounts matching the budget category and period under the agreed hierarchy rule.

These are summaries of user-entered records, not bank balances or custody/accounting claims. Stakeholders must decide whether the dashboard also shows an all-time cumulative figure and how to represent negative values. Contributions should not be counted again as expenses.

## 5. Privacy, retention, and deletion

Define an account deletion workflow that removes or anonymizes records according to the approved legal, support, and backup-retention policy. Conversation history, insight provenance, logs, backups, and third-party AI retention must be considered separately. These policies are prerequisites for production data, not implied by this schema.
