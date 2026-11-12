# Hermanos Drivers Platform

> **"Your Journey, Our Responsibility!"**  
> Professional Driver Hire and Vehicle Delivery Platform serving Malawi (Lilongwe, Blantyre, Mzuzu) and cross-border transport (e.g., Dar es Salaam to Malawi).

---

## Architecture Overview

This project is structured as a robust, secure monorepo:

```text
HERMANOS DRIVERS WEBSITE/
├── .gitignore
├── package.json               # Root scripts to orchestrate frontend & backend
├── README.md
├── backend/                   # Node.js + Express + Prisma + PostgreSQL
│   ├── .env.example
│   ├── package.json
│   ├── prisma/
│   │   └── schema.prisma      # Booking schema with PostgreSQL enums & UUIDs
│   └── src/
│       ├── config/            # DB client singleton (Prisma)
│       ├── controllers/       # Route controllers (bookingController.js)
│       ├── middleware/        # Security headers, rate limiting, JWT auth, input validation
│       ├── routes/            # REST API endpoints (bookingRoutes.js)
│       ├── services/          # Decoupled business logic & ORM database operations
│       ├── utils/             # Centralized error handling & logging
│       └── server.js          # Express app entry point
└── frontend/                  # React (Vite) + Tailwind CSS + Lucide Icons
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js      # Hermanos custom color palette (#050a24, #f5a623, #39b54a)
    └── src/
        ├── assets/            # Static media and branding
        ├── components/
        │   ├── layout/        # Sticky Navbar with top bar, Brand Footer
        │   ├── sections/      # HeroSlider, WhyChooseUs, OurServices, OurTeam, HireDriverBanner
        │   └── ui/            # Reusable buttons, inputs, modal dialogs
        ├── hooks/             # Custom hooks (e.g., useSlider)
        ├── services/          # Axios HTTP client configured with environment base URL
        └── App.jsx            # Application page view
```

---

## Cybersecurity & Best Practices

1. **Environment Hygiene (`.env` vs `.env.example`):** Real database credentials and JWT secrets are strictly git-ignored.
2. **HTTP Hardening (Helmet.js):** Sets secure HTTP response headers, including Content Security Policy, X-Frame-Options, and X-Content-Type-Options.
3. **Cross-Origin Resource Sharing (CORS):** Locked down to approved origin domains (e.g. `http://localhost:5173` in development).
4. **Rate Limiting (`express-rate-limit`):** Public booking endpoints are protected with strict rate limiting (max 5 submissions per 15 minutes per IP address) to stop automated spam and denial-of-service abuse.
5. **Strict Input Sanitization (`express-validator`):** Validates and sanitizes phone numbers, names, locations, and enum options to prevent XSS and parameter tampering.
6. **SQL Injection Defense (Prisma ORM):** All queries use parameterized queries under the hood.
7. **Architectural Decoupling:** Separation of concerns between `controllers` and `services` prevents Insecure Direct Object References (IDOR) and eases security auditing.

---

## Getting Started

### 1. Prerequisites
- Node.js >= 18.x (tested on v24)
- PostgreSQL database instance (local or hosted, e.g., Supabase / Neon / RDS)

### 2. Setup Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your actual DATABASE_URL and JWT_SECRET
npm install
npx prisma generate
# When database is connected:
# npx prisma migrate dev --name init
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 4. Running Both Concurrently (From Root)
```bash
npm run install:all
npm run dev
```
- Frontend will run on: `http://localhost:5173`
- Backend API will run on: `http://localhost:5000`
