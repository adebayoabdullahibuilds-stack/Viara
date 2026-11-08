export type IncomePattern = 'regular' | 'irregular' | 'multiple' | ''

export type FinancialFocus =
  | 'understand-spending'
  | 'build-budget'
  | 'save-consistently'
  | 'plan-ahead'
  | ''

export type OnboardingProfile = {
  displayName: string
  email: string
  currency: 'NGN'
  incomePattern: IncomePattern
  financialFocus: FinancialFocus
}
