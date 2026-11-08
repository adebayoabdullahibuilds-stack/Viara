# Viara Product Requirements Document

**Status:** Proposed for review  
**Product:** Viara  
**Tagline:** See your money. Understand it. Manage it better.

## 1. Product summary

Viara is a personal finance assistant for young Nigerians. It helps people understand manually recorded income and expenditure, make realistic budgets, build savings habits, and learn from their financial behaviour. It is an informational and educational product, not a bank, wallet, payment processor, accounting system, or source of guaranteed financial advice.

Its central product loop is:

1. A user records or reviews personal financial information.
2. Viara calculates summaries and detects relevant patterns deterministically.
3. Viara explains what the numbers mean and offers practical, optional next steps.
4. The user decides what action to take.

## 2. Problem and goals

Young people often have irregular or multiple income sources and variable expenses, but lack a clear, approachable way to understand their financial position and build consistent habits. A transaction list alone does not explain why a pattern matters or what a person might consider doing next.

Viara should:

- Make a user's recorded financial position understandable.
- Support irregular income, allowances, stipends, freelance payments, and side hustles.
- Help users set and monitor budgets and savings goals that reflect their recorded capacity.
- Surface timely, explainable observations rather than undifferentiated statistics.
- Provide accessible financial education and grounded conversational assistance.

## 3. Audience and context

Primary audience includes Nigerian students, NYSC members, freelancers, young professionals, and early-career workers. The originating research focuses on ages 16–25. The minimum age, parental consent needs, data-protection obligations, and product safeguards for minors must be decided before public launch; this document does not make a legal determination.

Initial regional assumptions:

- Nigeria and NGN are the default locale and currency.
- Users may have multiple income sources and irregular pay dates.
- Records are entered manually; no bank data is available unless a future integration is separately approved and implemented.
- Dates and display formats should respect the user's locale and timezone.

## 4. Product principles and non-goals

### Principles

- Explain the meaning and limits of every financial summary.
- Use deterministic application logic for financial amounts, balances, thresholds, and trends.
- Make AI guidance optional, contextual, and grounded only in information the user is allowed to share.
- Keep manual records and user control central.
- Prefer a few actionable insights to a dashboard crowded with scores and charts.
- Design for mobile, accessibility, intermittent connectivity, and varied financial literacy.

### Non-goals for the initial product

- Holding, moving, or processing money.
- Connecting to banks or claiming automatic transaction detection.
- Providing investment, credit, tax, or guaranteed financial advice.
- Treating a savings goal as a bank account or asserting funds have been transferred.
- Predicting future spending as fact.
- Automatically recording recurring activity as completed without user confirmation.

## 5. Functional requirements

### Identity and preferences

- Register, sign in, sign out, and manage account credentials securely.
- View and edit profile and personal preferences.
- Configure currency/region, timezone, and notification preferences.
- Access only the authenticated user's own records.

### Transactions and categories

- Create, read, update, delete, search, and filter manually recorded income and expenses.
- Store amount, currency, transaction date, category, optional description/notes, and timestamps.
- Support multiple income sources through categories and/or a source label.
- Support category hierarchies, such as Food with Groceries and Eating out.
- Validate positive monetary amounts and date/category ownership on the server.
- Make clear that records are user-entered and may not represent every real-world account balance.

### Dashboard and financial summaries

- Show recorded income, expenditure, calculated available amount, savings progress, budgets, recent transactions, and a small set of relevant insights.
- Allow the user to understand the time period and calculation behind each total.
- Show loading, empty, stale-data, and error states; never substitute invented or zero-valued data for a failed request.
- Use a selected period consistently across cards, charts, and summaries.

### Budgets

- Create and manage a spending limit for a category and period.
- Show amount spent, amount remaining, and percentage used from expense records.
- Notify or surface an observation at configured thresholds and when exceeded.
- Define how category hierarchy affects parent and child budgets before implementation; avoid counting one expense twice.

### Savings goals

- Create goals with a target amount and optional target date.
- Record, edit, and remove contributions and show progress and remaining amount.
- Offer daily, weekly, or monthly guidance only when sufficient user-entered data exists.
- Ensure recommendations consider recorded income, expenditure, existing contributions, and uncertainty.
- Describe contributions as allocations tracked in Viara, not transfers of money.

### Bills and recurring records

- Record upcoming bills, due dates, amounts, and manually maintained payment status.
- Provide configurable in-app reminders; push/email delivery is a separately scoped capability.
- Let users define recurring income or expense schedules.
- A recurrence rule is a schedule, not proof that a transaction occurred. Proposed default: create a pending item or reminder for user confirmation before adding a completed transaction.

### Analytics and insights

- Show useful income/expense trends, category breakdowns, budget performance, and savings progress.
- Explain the period, underlying records, and calculation for every visualisation.
- Detect observations using deterministic rules and actual recorded history; suppress conclusions when data is too sparse.
- Each insight explains what happened, why it may matter, and an optional next step.

### AI coach and financial literacy

- Answer questions using an explicitly scoped, validated summary of the signed-in user's data.
- Explain general financial concepts and available summaries.
- Do not invent records, amounts, account access, or facts about the user.
- Clearly distinguish calculated facts from suggestions and general education.
- Provide curated, accessible learning materials. Content ownership, review, and localization are required before launch.

## 6. Non-functional requirements

- **Privacy and security:** least-privilege access, user-scoped queries, secure secrets, protected endpoints, auditable security-sensitive actions, and careful handling of AI context.
- **Correctness:** decimal-safe money handling, explicit currency, consistent timezone/date boundaries, and tested aggregation rules.
- **Reliability:** explicit API errors, safe retries for non-mutating reads, database constraints, backups, and recoverable migrations.
- **Accessibility:** keyboard support, semantic controls, readable contrast and type, screen-reader labels, and charts with textual alternatives.
- **Responsive UX:** mobile-first layouts that also work at tablet and desktop widths.
- **Maintainability:** modular frontend features and Django business domains; documented and versioned APIs.
- **Performance:** paginated histories, indexed user/date queries, bounded dashboard queries, and measured targets set before production.
- **Observability:** structured application logs and operational health checks without logging secrets, credentials, or unnecessary financial details.

## 7. MVP success and acceptance measures

Before a pilot, define numerical targets for activation, transaction-entry completion, retention, API latency, and error rates. The following are acceptance criteria, not claims about current implementation:

- A new user can register, sign in, and reach a useful empty state without any sample financial records being presented as theirs.
- A user can create, edit, filter, and delete their own income and expense records.
- Summary totals match a documented calculation over a test dataset, including date boundaries and deletions.
- A second user cannot read, change, or infer the first user's protected records through any endpoint.
- A budget and a goal update predictably when their associated records change.
- AI output cannot change financial records or supply calculated figures that the server did not provide.
- Core flows are usable with keyboard navigation and on a narrow mobile viewport.

## 8. Open product decisions

Resolve these with stakeholders before the affected work begins:

1. Minimum supported age and requirements for users aged 16–17.
2. Whether the first release supports only NGN or permits other currencies; whether currency conversion is excluded.
3. Definition of "available balance." Proposed: cumulative recorded income less recorded expenses and user-recorded savings allocations for a stated period/all-time, clearly labelled as a Viara calculation, not account balance.
4. Whether contributions reduce available amount in the dashboard and how withdrawals/corrections work.
5. Budget periods, rollover, parent/child category behaviour, and alert thresholds.
6. Recurrence confirmation workflow and reminder channels.
7. AI provider, model/data retention terms, user consent, opt-out, and operational cost limits.
8. Account deletion, data export, retention, backup expiry, and support workflow.
9. Learning-content editorial ownership and review process.
10. Pilot success targets and accessibility/localization scope.

## 9. Release boundaries

The first release should prioritize identity, manual transactions, categories, dashboard summaries, budgets, goals, and a dependable responsive experience. Bills, recurring confirmation, analytics, notifications, financial literacy, and AI should follow only when their data, privacy, and acceptance rules are agreed. Bank integrations and money movement remain out of scope.
