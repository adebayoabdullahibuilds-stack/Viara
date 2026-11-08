 Viara
Navigate Your Financial Journey with AI.»
Viara is an AI-powered Personal Finance Assistant designed to help students, NYSC members, freelancers, young professionals, and early-career workers develop healthier financial habits through intelligent budgeting, expense tracking, savings planning, financial analytics, and personalized AI-powered guidance.
Unlike traditional expense trackers, Viara focuses on financial understanding and decision support, helping users make informed financial choices rather than simply recording transactions.
Vision
To become an intelligent financial companion that empowers young people to understand their finances, build sustainable money habits, and confidently achieve their financial goals through AI.
Objectives

- Track income and expenses
- Create and monitor budgets
- Build savings goals
- Monitor financial health
- Generate AI-powered financial insights
- Forecast future spending trends
- Improve financial discipline
- Deliver personalized financial recommendations
- Provide a conversational AI financial assistant

---

Features

Authentication

- User Registration
- Login
- Forgot Password
- Profile Management

Dashboard

- Financial Overview
- Income & Expense Summary
- Savings Progress
- Financial Health Score
- AI Insights
- Recent Transactions

Income Management

- Add Income
- Edit Income
- Delete Income
- Income History

Expense Management

- Expense Tracking
- Smart Categories
- Context-Aware Transactions
- Search & Filters
- Transaction History

Budget Management

- Monthly Budgets
- Hierarchical Budget Categories
- Spending Progress
- Budget Alerts

Savings Goals

- Goal Creation
- Progress Tracking
- Estimated Completion
- Goal Recommendations

Analytics

- Spending Trends
- Income vs Expenses
- Category Breakdown
- Savings Performance
- Financial Narratives

AI Features

- AI Financial Assistant
- Personalized Recommendations
- Spending Pattern Analysis
- Financial Story
- Budget Intelligence
- Goal Intelligence
- Context-Aware Insights
- Financial Health Analysis

Notifications

- Budget Alerts
- Bill Reminders
- Goal Milestones
- AI Recommendations

Settings

- Profile Management
- User Preferences
- App Settings
- Security
- Privacy

---

Tech Stack

Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Router
- React Query
- Zustand
- React Hook Form
- Zod
- Recharts
- Framer Motion

Backend (Planned)

- Django
- Django REST Framework
- PostgreSQL
- Redis
- Celery
- JWT Authentication

AI (Planned)

- AI Recommendation Engine
- Natural Language Processing
- Financial Forecasting
- Context-Aware Financial Insights

---

Design Principles

Viara follows modern UX and accessibility best practices, including:

- Mobile-First Design
- Progressive Web App (PWA)
- Responsive Layouts
- WCAG Accessibility
- Component-Driven Architecture
- Clean Fintech-Inspired Interface
- Context-Aware User Experience

---

Current Status

The repository contains the initial frontend and backend project foundations. Product features have not been implemented; proposed requirements, architecture, data model, API boundaries, UX guidelines, and roadmap are documented below.

The frontend now includes the public landing page, an in-memory onboarding flow, login and registration forms wired to the planned API routes, and an explicitly unauthenticated dashboard/analytics preview with no financial data. The backend does not yet implement those authentication or financial API routes; form submissions report that the service is unavailable rather than simulating success.

Project Documents

- [Product Requirements](./docs/PRD.md)
- [Technical Requirements](./docs/TRD.md)
- [System Architecture](./docs/SYSTEM_ARCHITECTURE.md)
- [Database Design](./docs/DATABASE_DESIGN.md)
- [API Specification](./docs/API_SPECIFICATION.md)
- [Implementation Plan](./docs/IMPLEMENTATION_PLAN.md)
- [UI/UX Guidelines](./docs/UI_UX_GUIDELINES.md)

---

Development Setup

The monorepo keeps the Vite frontend and Django API independent. The frontend is in `frontend/`; the backend and its Python virtual environment are in `backend/`. Project requirements are documented in `docs/`.

### Prerequisites

- Node.js 20.19+ or 22.12+ and npm.
- Python 3.12.
- PostgreSQL for database-backed development. PostgreSQL is not bundled with this repository.

### Frontend

```powershell
cd frontend
npm.cmd install
Copy-Item .env.example .env
npm.cmd run dev
```

Vite prints the local URL when the development server starts. `VITE_API_BASE_URL` points to the Django API; this foundation does not yet make API requests.

### Backend

Install PostgreSQL and create a local database and database user. Copy `backend/.env.example` to `backend/.env`, then set a unique `DJANGO_SECRET_KEY` and the PostgreSQL database name, user, password, host, and port for your local installation. Do not commit `.env` files.

From the repository root, create and activate a virtual environment and install the pinned dependencies:

```powershell
cd backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py runserver
```

If the Python launcher is unavailable, use `python -m venv .venv` with Python 3.12 on `PATH`. The health endpoint is `http://127.0.0.1:8000/api/v1/health/`; it checks that the API process responds and does not assert PostgreSQL connectivity.

The current backend foundation configures PostgreSQL from environment variables. Database creation, migrations for Viara business models, and database readiness checks are not part of this phase.

---

Roadmap

- Modern responsive frontend
- Personal finance management modules
- AI-focused user experience
- Django REST API
- Authentication backend
- AI recommendation engine
- Financial prediction services
- Bank and fintech integrations
- Intelligent chatbot backend


 Academic Project

This project is being developed as part of a Final Year undergraduate research project titled:

Design and Implementation of an AI-Powered Personal Finance Assistant

The project explores how artificial intelligence can improve financial literacy, budgeting behavior, savings discipline, and financial decision-making through an intelligent, user-centered personal finance platform.

 License

This project is intended for academic and educational purposes. Future licensing will be determined as the project evolves.

Viara — Navigate Your Financial Journey with AI. 
