# Growfy Production - Agency Operating System (Agency OS)

This is a premium, enterprise-grade Agency Operating System built for Growfy Production. It serves as both a high-end marketing website and a scalable backend platform containing a complete CRM, Project Management tool, File Manager, and Role-Based Dashboards.

## Tech Stack
- **Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with custom tokens: Black 85%, White 10%, Purple 5%)
- **Components**: shadcn/ui, Radix UI
- **Animations**: Framer Motion, Spline/Three.js (for future phases)
- **Database & Auth**: Firebase (Authentication, Firestore, Storage)
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form, Zod validation

## Folder Structure
The repository is structured around scalable features:
- `/src/features/`: Contains feature-specific modules (Auth, CRM, Projects, Tasks, Analytics, etc.)
- `/src/components/`: Generic, reusable UI components (Buttons, Cards, Dialogs).
- `/src/lib/`: Utilities, Zod schemas, and Firebase configurations.
- `/src/services/`: Firebase API integration layers.

## Environment Setup
1. Duplicate `.env.local.example` or update `.env.local` with your Firebase credentials.
2. Run `npm install`
3. Run `npm run dev` to start the development server on `http://localhost:3000`.

## Firebase Architecture
This project utilizes a highly normalized Firestore schema containing the following collections:
`users`, `roles`, `permissions`, `clients`, `companies`, `leads`, `projects`, `tasks`, `subtasks`, `comments`, `attachments`, `files`, `meetings`, `messages`, `notifications`, `reports`, `portfolio`, `blogs`, `services`, `team`, `departments`, `activity_logs`, `settings`, `integrations`, `audit_logs`.

Ensure Firestore rules are properly implemented in the Firebase Console before production deployment.
