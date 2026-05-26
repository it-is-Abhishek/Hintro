# Hintro Dashboard

React + TypeScript dashboard implementation for the Hintro frontend assessment.

## Setup

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Scripts

- `npm run dev` - start local development server
- `npm run build` - run TypeScript build and production bundle
- `npm run lint` - run ESLint
- `npm run preview` - preview production build

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Query
- Axios
- React Router DOM
- Lucide React

## Folder Structure

```text
src/
├── assets/
├── components/
├── constants/
├── hooks/
├── layouts/
├── pages/
├── services/
├── styles/
├── types/
└── utils/
```

## API

Base URL: `https://mock-backend-hintro.vercel.app`

Every request sends the `x-user-id` header. The UI includes a segmented user switcher:

- `u1` renders empty dashboard states.
- `u2` renders API-driven populated dashboard states.

Endpoints used:

- `GET /api/auth/profile`
- `GET /api/auth/dashboard`
- `GET /api/call-sessions/stats`
- `GET /api/call-sessions?limit=10`

## Design System

Design tokens are centralized in `src/styles/global.css`, `tailwind.config.ts`, and `src/constants/designTokens.ts`.

Tokens cover:

- colors
- spacing
- radius
- shadows
- typography

Dashboard components consume Tailwind theme tokens/CSS variables instead of hardcoded color values. Figma-observed metric accent and upgrade button values are represented as named tokens.

## Features

- API-driven dashboard metrics, usage, analytics, and call history
- Empty states for `u1`
- Populated randomized state for `u2`
- Loading skeletons
- Error retry state
- Responsive sidebar and mobile off-canvas navigation
- Feedback modal with rating, validation, success, cancel, support reopen, and localStorage persistence
- Reusable duration formatting, including examples such as `65 -> 1m 5s`, `3600 -> 1h`, and `3871 -> 1h 4m 31s`
- Keyboard focus styles and semantic landmarks

## Assumptions

The assignment PDF links to a public Figma file. The browser could view the frames, but Dev Mode values were not accessible without authentication. Tokens and layout were derived from the visible Figma frames: compact white dashboard, slim left sidebar, small typography, subtle borders, grey upgrade CTA, metric cards, empty dashboard, populated dashboard, logout modal, and mobile sidebar states.

## Deployment

Build the app with:

```bash
npm run build
```

Deploy the generated `dist/` directory to any static host such as Vercel, Netlify, or GitHub Pages.
