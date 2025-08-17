# GreenGain Next.js Migration

This directory contains the in-progress migration of the React CRA frontend to Next.js (App Router).

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm start` - run production build

## Tailwind
Already configured in `tailwind.config.js` and global directives in `app/globals.css`.

## Auth
Temporary lightweight context in `components/AuthProvider.jsx` (replace with real API integration).

## Next Steps
- Migrate remaining pages (leaderboard, marketplace, profile, tree, auth forms)
- Port API service layer & environment variables
- Add dynamic routes for trees, quests
- Implement image upload & species prediction using existing backend endpoints
- Remove CRA once feature parity achieved
