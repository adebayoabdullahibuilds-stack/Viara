import { create } from 'zustand'
import type { OnboardingProfile } from '../types/onboarding'

type OnboardingStore = {
  profile: OnboardingProfile
  updateProfile: (updates: Partial<OnboardingProfile>) => void
  clearProfile: () => void
}

const initialProfile: OnboardingProfile = {
  displayName: '',
  email: '',
  currency: 'NGN',
  incomePattern: '',
  financialFocus: '',
}

const useOnboardingStore = create<OnboardingStore>((set) => ({
  profile: initialProfile,
  updateProfile: (updates) =>
    set((state) => ({ profile: { ...state.profile, ...updates } })),
  clearProfile: () => set({ profile: initialProfile }),
}))

export default useOnboardingStore
