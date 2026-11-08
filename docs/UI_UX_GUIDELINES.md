# Viara UI/UX Guidelines

**Status:** Proposed for review

## 1. Experience goal

Make Viara feel like a calm, trustworthy financial companion: it helps people interpret their recorded money activity and choose what to do next. Prioritize comprehension, user control, and practical guidance over novelty, gamification, or dense reporting.

## 2. Information hierarchy

1. **What period am I looking at?** Make the selected period and any data limitations visible.
2. **What is my recorded position?** Show income, expenses, savings allocations, and the clearly labelled calculated available amount.
3. **What needs attention?** Surface a small number of actionable budgets, due bills, or insights.
4. **What can I do next?** Provide direct actions such as adding a transaction, adjusting a budget, or reviewing a goal.
5. **How do I explore detail?** Offer transaction history and analytics without crowding the default view.

Do not use a financial health score unless its calculation is transparent, validated, and demonstrably useful. Do not imply account balance or bank coverage.

## 3. Navigation and responsive behaviour

- Provide predictable primary navigation for Overview, Transactions, Budgets, Goals, and Settings; place secondary areas such as Bills, Learn, and Coach according to the approved MVP.
- On small screens, keep core destinations and the primary add action reachable without hiding important context.
- Use consistent page titles, back behaviour, and active navigation indicators.
- Avoid navigation that depends only on hover or colour.

## 4. Visual system

- Establish semantic design tokens for surface, text, border, primary action, success, warning, and error states.
- Use colour intentionally and pair it with text, icons, or other cues; do not encode financial meaning with colour alone.
- Prefer readable typography, comfortable line lengths, consistent spacing, and restrained surfaces.
- Avoid excessive gradients, glass effects, animation, decorative AI motifs, and unnecessary cards.
- Use tabular numerals where helpful for aligning monetary amounts.
- Keep visualisations simple, labelled, and directly tied to a question the user needs answered.

Exact palette, typeface, spacing scale, and contrast targets should be agreed during Phase 2 and recorded as implementation tokens. Validate contrast against WCAG AA as the baseline.

## 5. Financial data presentation

- Format values with locale-aware grouping and explicit currency; never round in a way that changes the underlying calculation without indicating display precision.
- State whether a value is a period total, cumulative total, estimate, or user-entered amount.
- Label available amount as calculated from recorded data, not a bank balance.
- Show date ranges and clarify when records are missing or sparse.
- Explain budget usage and goal progress with both numbers and accessible text.
- Present chart legends, units, axes, time range, and a non-visual summary/table equivalent.
- Avoid false precision and unsupported forecasts.

## 6. Forms and feedback

- Make income/expense type, amount, date, category, and optional note clear; default values must not silently create financial records.
- Preserve user input when a request fails, show actionable error feedback, and prevent accidental double submissions.
- Confirm destructive actions and explain their effect on summaries, budgets, and goals.
- Provide success feedback only after the server confirms the change.
- Use inline validation for clarity but treat backend validation as authoritative.
- Respect locale, timezone, decimal entry conventions, and the selected currency.

## 7. AI and insight presentation

- Separate deterministic facts from generated interpretation using explicit labels.
- Explain the observation, why it may matter, and an optional next step.
- Make the data period and basis inspectable.
- Avoid alarmist wording, shaming, promises, or commands; recommendations are optional guidance.
- State when an answer is general financial education rather than personalized analysis.
- Disclose AI use and provide agreed controls for consent/opt-out.
- Provide a safe fallback when AI is unavailable without presenting a fabricated answer.

## 8. Accessibility and content

- Use semantic headings, landmarks, labels, focus indicators, and keyboard-operable controls.
- Support screen readers and zoom; announce important async status updates appropriately.
- Keep contrast readable and avoid relying on colour, position, or animation alone.
- Use plain language, explain financial terms, and write concise, respectful, culturally relevant examples.
- Design empty states to explain how to begin without inventing transactions or implying an account connection.
- Test with assistive technologies and real users, including the intended age range after the minor-safety decision is resolved.

## 9. Required interface states

Every data-driven screen should define:

- Initial loading and background refresh.
- Empty state with a relevant next action.
- Partial or sparse data.
- Validation and recoverable request error.
- Permission/session expiry.
- Offline or unavailable service where applicable.
- Success and destructive-action confirmation.

Do not display zero as though it were a valid result when data failed to load.
