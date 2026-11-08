import { Route, Routes } from 'react-router-dom'
import AnalyticsPage from '../features/analytics/AnalyticsPage'
import DashboardPage from '../features/dashboard/DashboardPage'
import LandingPage from '../features/landing/LandingPage'
import AuthPage from '../features/auth/AuthPage'
import OnboardingPage from '../features/onboarding/OnboardingPage'
import AppShell from '../components/AppShell'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Route>
      <Route path="*" element={<LandingPage />} />
    </Routes>
  )
}

export default App
