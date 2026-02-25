
# Æquitas | Premium AI Expense Intelligence

A production-ready Next.js 14 (App Router) frontend for a goal-based expense tracking system. Built with a premium fintech SaaS aesthetic.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS 4 with Glassmorphism
- **Animations**: Framer Motion
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **API**: Axios with typed wrappers
- **Analytics**: Recharts
- **Icons**: Lucide React

## Key Features

1.  **Strict Type Safety**: Full TypeScript integration for all API responses and entities.
2.  **Premium UI/UX**: Linear/Stripe inspired design with dark mode by default, soft shadows, and glassmorphism.
3.  **AI Insights**: Dedicated intelligence cards with spending optimization and goal acceleration.
4.  **Financial Pots**: Goal-based saving containers with progress tracking and risk indicators.
5.  **Interactive Ledger**: Detailed expense management with search, filters, and animations.
6.  **Animated Analytics**: Visual breakdown of capital flow and behavioral spending trends.

## Setup Instructions

### 1. Prerequisites
- Node.js 18+
- npm or yarn

### 2. Installation
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```
*Note: The frontend expects the FastAPI backend to be running at this URL.*

### 4. Development
```bash
npm run dev
```

### 5. Deployment
```bash
npm run build
npm start
```

## Project Structure

- `app/`: App Router pages and layouts.
- `components/`: UI, layout, and visualization components.
- `lib/`: Core utilities, types, and API client.
- `hooks/`: Custom React hooks (Auth, data fetching).
- `providers/`: React Context providers (QueryClient).

## Authentication
Uses HTTP-only cookies for JWT management. The `middleware.ts` automatically protects all `/dashboard`, `/expenses`, `/pots`, and `/analytics` routes.
