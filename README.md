<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# GashaDrift — Car Rental

GashaDrift is a lightweight car-rental demo app built with React and Vite. It provides a searchable, filterable vehicle catalog, booking modal, an admin dashboard, and an AI-powered assistant for support and recommendations.

Features
- Search and filter vehicles by make, model, price, and availability
- Booking modal with basic booking flow
- Admin dashboard for managing vehicles and bookings
- AI smart assistant for support and guided searches

Tech stack
- React + TypeScript
- Vite (development + build)
- Simple local state + mock data (no backend required)

Quick start

**Prerequisites:** Node.js (LTS recommended)

1. Install dependencies:

   `npm install`

2. (Optional) If you want AI features, set `GEMINI_API_KEY` in a local environment file (for example `.env.local`).

3. Run the app locally:

   `npm run dev`

Build

   `npm run build`

Notes
- The app currently uses mock data (`mockData.ts`) and local UI-driven state. Replace or extend with a backend if you need persistence.
- See the `components/` folder for the main UI pieces (Header, Hero, VehicleGrid, AdminDashboard, etc.).

If you want, I can replace the original README.md with this content now.
