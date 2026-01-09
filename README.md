# 🍳 Coolinarika Recepti

A production-ready recipe application built with Next.js 14, demonstrating modern full-stack development practices, SEO optimization, and clean architecture.

**Live Demo**: https://coolinarka-zadatak.vercel.app

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [CDN Strategy](#cdn-strategy)
- [Design Decisions](#design-decisions)

---

## ✨ Features

- **Recipe List View** (`/recepti`) - Browse all recipes with filtering by difficulty, meal group
- **Recipe Detail View** (`/recepti/[slug]`) - Full recipe with ingredients, steps, and metadata
- **Admin Panel** (`/admin`) - Protected admin area for recipe management
  - NextAuth.js authentication with credentials
  - Create, edit, and delete recipes via intuitive forms
  - Middleware-protected routes
- **Full CRUD API** - Create, read, update, delete recipes via REST API
- **CDN Simulation** - Fake CDN route with proper Cache-Control headers, demonstrating CDN concepts
- **SEO Optimized** - Dynamic metadata, Open Graph tags, JSON-LD structured data
- **Server-Side Rendering** - Fast initial loads and SEO-friendly content
- **Incremental Static Regeneration** - Static pages that update automatically
- **Responsive Design** - Beautiful UI inspired by Coolinarika, works on all devices

---

## 🛠 Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Framework** | Next.js 14 (App Router) | SSR/SSG for SEO, API routes for backend, best DX |
| **Database** | SQLite (dev) / PostgreSQL (prod) | Zero-config local dev, production-ready in cloud |
| **ORM** | Prisma | Type-safe queries, migrations, excellent tooling |
| **Auth** | NextAuth.js v5 | Industry standard, JWT sessions, middleware protection |
| **Styling** | Tailwind CSS | Utility-first, rapid development, consistent design |
| **Validation** | Zod | Runtime type validation with great TypeScript integration |
| **Images** | Fake CDN Route | Static files with Cache-Control headers, `CDN_BASE_URL` env |
| **Language** | TypeScript | End-to-end type safety |
| **Deployment** | Vercel | Native Next.js support, edge functions, global CDN |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Browser                           │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Next.js Application                         │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                       Middleware                             ││
│  │  • Auth check for /admin/* routes                           ││
│  │  • JWT session validation                                    ││
│  └─────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                     App Router (SSR/SSG)                    ││
│  │  • /recepti           → Server Component (SSR)              ││
│  │  • /recepti/[slug]    → Static + ISR (revalidate: 3600)     ││
│  │  • /admin/*           → Protected admin routes              ││
│  └─────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    API Route Handlers                        ││
│  │  • GET    /api/recipes       → List all recipes              ││
│  │  • POST   /api/recipes       → Create recipe                 ││
│  │  • GET    /api/recipes/:slug → Get single recipe             ││
│  │  • PUT    /api/recipes/:slug → Update recipe                 ││
│  │  • DELETE /api/recipes/:slug → Delete recipe                 ││
│  │  • /api/auth/*               → NextAuth.js handlers          ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                │                                    │
                ▼                                    ▼
┌───────────────────────────┐        ┌─────────────────────────────┐
│      PostgreSQL DB        │        │       CDN (Simulated)       │
│  • Recipe data            │        │  • /api/cdn/* route         │
│  • Prisma ORM             │        │  • Cache-Control headers    │
│  • Type-safe queries      │        │  • CDN_BASE_URL env var     │
└───────────────────────────┘        └─────────────────────────────┘
```

### Server vs Client Separation

| Responsibility | Location | Examples |
|----------------|----------|----------|
| Data fetching | Server | `prisma.recipe.findMany()` in page components |
| SEO metadata | Server | `generateMetadata()` function |
| Initial render | Server | All page components are Server Components by default |
| Image optimization | CDN | Simulated CDN with Cache-Control headers |
| Interactive UI | Client | Form handling, animations (marked with `'use client'`) |

---

## 🚀 Getting Started

### Local Development (SQLite - Zero Config!)

The app works locally with **no external services required**:

```bash
# 1. Install dependencies
npm install

# 2. Set up SQLite database and seed data
npm run setup:local

# 3. Start the app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you should see 8 recipes!

**What `setup:local` does:**
- Switches Prisma to use SQLite (`prisma/dev.db`)
- Creates the database tables
- Seeds 8 sample recipes with images

> **Note:** The build script automatically switches to PostgreSQL for Vercel deployments. You don't need to manually change the schema before committing.

---

### Vercel Deployment (PostgreSQL)

For production, the app uses **Vercel Postgres**:

#### 1. Add Vercel Postgres Database

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project → **Storage** tab → **Create Database** → **Postgres**
3. Click **Connect** to link it to your project
4. Vercel automatically adds these environment variables:
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`

#### 2. Set Environment Variables

In Vercel project settings → **Environment Variables**, add:

```env
AUTH_SECRET=your-random-32-char-string
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

> **Note:** If using Prisma Postgres, the `POSTGRES_URL` variable is automatically set when you connect the database.

#### 3. Deploy

Push your changes. The build will automatically:
- Run `prisma db push` to create tables
- Run `prisma/seed.ts` to add sample recipes
- Build the Next.js app

---

### Troubleshooting

| Problem | Solution |
|---------|----------|
| Database errors | Delete `prisma/dev.db` and run `npm run setup` again |
| Port 3000 in use | Run `npm run dev -- -p 3001` |
| Prisma errors | Run `npx prisma generate` |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth.js route handlers
│   │   ├── cdn/[...path]/        # Fake CDN with Cache-Control headers
│   │   │   └── route.ts
│   │   └── recipes/
│   │       ├── route.ts          # GET all, POST
│   │       └── [slug]/
│   │           └── route.ts      # GET one, PUT, DELETE
│   ├── admin/
│   │   ├── layout.tsx            # Admin layout with navigation
│   │   ├── login/page.tsx        # Admin login page
│   │   └── recepti/
│   │       ├── page.tsx          # Recipe management list
│   │       ├── new/page.tsx      # Create recipe form
│   │       └── [slug]/edit/      # Edit recipe form
│   ├── recepti/
│   │   ├── page.tsx              # Recipe list (SSR)
│   │   ├── loading.tsx           # Loading skeleton
│   │   └── [slug]/
│   │       ├── page.tsx          # Recipe detail (SSG + ISR)
│   │       └── loading.tsx       # Loading skeleton
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles + Tailwind
│   └── not-found.tsx             # 404 page
├── components/
│   ├── admin/
│   │   ├── DeleteButton.tsx      # Delete confirmation
│   │   ├── RecipeForm.tsx        # Recipe create/edit form
│   │   └── SignOutButton.tsx     # Logout button
│   ├── providers/
│   │   └── SessionProvider.tsx   # NextAuth session provider
│   ├── ui/
│   │   └── Badge.tsx             # Reusable badge components
│   └── recipes/
│       └── RecipeCard.tsx        # Recipe card for list view
├── lib/
│   ├── auth.ts                   # NextAuth.js configuration
│   ├── db.ts                     # Prisma client singleton
│   ├── cdn.ts                    # CDN URL builder (uses CDN_BASE_URL)
│   ├── validation.ts             # Zod schemas
│   └── slug.ts                   # Slug generation
├── middleware.ts                 # Auth middleware for /admin/*
└── types/
    └── recipe.ts                 # TypeScript interfaces

prisma/
├── schema.prisma                 # Database schema
└── seed.ts                       # Seed data script
```

---

## 🔐 Admin Panel

The application includes a protected admin panel for managing recipes.

### Access
- **URL**: `/admin/login`
- **Default credentials**: `admin` / `admin123`

### Features
- **Recipe Management**: Create, edit, and delete recipes
- **Form Validation**: Client-side and server-side validation
- **Protected Routes**: Middleware-based authentication
- **JWT Sessions**: Secure, stateless authentication

### Configuration

Set custom admin credentials via environment variables:

```env
ADMIN_USERNAME="your-username"
ADMIN_PASSWORD="your-password"
AUTH_SECRET="your-secret-key"  # Generate with: openssl rand -base64 32
```

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                    Admin Authentication Flow                 │
├─────────────────────────────────────────────────────────────┤
│  1. User visits /admin/*                                     │
│  2. Middleware checks for valid JWT session                  │
│  3. If no session → redirect to /admin/login                 │
│  4. User enters credentials                                  │
│  5. NextAuth validates against env vars                      │
│  6. On success → JWT issued, redirect to /admin/recepti      │
│  7. All admin routes now accessible                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 📡 API Documentation

### List Recipes

```http
GET /api/recipes
```

Response: `200 OK`
```json
[
  {
    "id": "clx...",
    "slug": "sarma",
    "title": "Sarma",
    "lead": "Tradicionalna sarma...",
    "imageId": "/recipes/sarma/hero.jpg",
    "prepTime": 180,
    "servings": 8,
    "difficulty": "HARD",
    "mealGroup": "MAIN_DISH",
    "prepMethod": "COOKING",
    "tags": ["tradicionalno", "zimsko"],
    "ingredients": [...],
    "steps": [...],
    "createdAt": "2026-...",
    "updatedAt": "2026-..."
  }
]
```

### Get Single Recipe

```http
GET /api/recipes/:slug
```

### Create Recipe

```http
POST /api/recipes
Content-Type: application/json

{
  "title": "Novi Recept",
  "lead": "Kratki opis...",
  "imageId": "/recipes/novi-recept/hero.jpg",
  "prepTime": 30,
  "servings": 4,
  "difficulty": "EASY",
  "mealGroup": "MAIN_DISH",
  "prepMethod": "COOKING",
  "tags": ["brzo", "jednostavno"],
  "ingredients": [
    { "name": "Sastojak", "quantity": "100", "unit": "g" }
  ],
  "steps": [
    { "order": 1, "instruction": "Prvi korak..." }
  ]
}
```

### Update Recipe

```http
PUT /api/recipes/:slug
Content-Type: application/json

{
  "title": "Ažurirani naziv"
}
```

### Delete Recipe

```http
DELETE /api/recipes/:slug
```

### Error Responses

| Status | Meaning |
|--------|---------|
| `400` | Invalid input data |
| `401` | Unauthorized (authentication required for POST/PUT/DELETE) |
| `404` | Recipe not found |
| `409` | Conflict (e.g., slug already exists) |
| `500` | Server error |

> **Note:** The `POST`, `PUT`, and `DELETE` endpoints require authentication. You must be logged in via the admin panel (`/admin/login`) to modify recipes.

---

## 🖼 CDN Strategy

This project implements a **simulated CDN** as requested in the task specification.

### How It Works

1. **Database stores only the path**: `imageId: "/recipes/sarma/hero.jpg"`
2. **`CDN_BASE_URL` env variable**: Can point to fake CDN (`/api/cdn`) or real CDN (`https://cdn.example.com`)
3. **URLs are built dynamically**: `${CDN_BASE_URL}${imageId}`

### File Structure

```
public/cdn/
└── recipes/
    ├── sarma/
    │   └── hero.jpg
    ├── cevapi/
    │   └── hero.jpg
    ├── burek/
    │   └── hero.jpg
    └── ... (more recipes)
```

### Fake CDN Route (`/api/cdn/[...path]`)

The route handler serves static files with proper CDN cache headers:

```typescript
// Response headers demonstrating CDN concepts:
{
  'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
  'ETag': '"abc123..."',
  'Vary': 'Accept-Encoding',
  'X-CDN-Cache': 'SIMULATED'
}
```

### URL Builder (`lib/cdn.ts`)

```typescript
// Environment variable
CDN_BASE_URL = '/api/cdn'  // local
CDN_BASE_URL = 'https://cdn.example.com'  // production

// Usage
getCdnUrl('/recipes/sarma/hero.jpg')
// → /api/cdn/recipes/sarma/hero.jpg (local)
// → https://cdn.example.com/recipes/sarma/hero.jpg (prod)
```

### CDN Features Demonstrated

| Feature | Implementation |
|---------|----------------|
| **Path-based storage** | DB stores `/recipes/slug/hero.jpg`, not full URL |
| **Base URL config** | `CDN_BASE_URL` env var for easy switching |
| **Cache-Control** | `max-age=31536000` (1 year), `s-maxage`, `immutable` |
| **ETag** | For cache validation |
| **Content-Type** | Proper MIME types for images |
| **Security** | Directory traversal prevention |

### Switching to Production CDN

To use a real CDN (e.g., Cloudflare, CloudFront), simply:

1. Upload `public/cdn/` contents to your CDN
2. Set `NEXT_PUBLIC_CDN_BASE_URL=https://cdn.yoursite.com`
3. All images will be served from the real CDN

---

## 🎨 Design Decisions

### Why Next.js App Router (not Pages Router)?

- Server Components reduce client-side JavaScript
- Better streaming and suspense support
- Improved data fetching patterns with `async` components
- Native metadata API for SEO

### Why Prisma over raw SQL?

- Type-safe database queries
- Auto-generated TypeScript types from schema
- Easy migrations and schema management
- Great developer experience with Prisma Studio

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run setup:local` | **Switch to SQLite + seed database** (for local dev) |
| `npm run build` | Build for production (uses PostgreSQL) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed database with sample recipes |
| `npm run db:studio` | Open Prisma Studio |

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add **Prisma Postgres** database (Storage → Create Database → Prisma Postgres)
4. Add environment variables:
   - `AUTH_SECRET` - Generate with `openssl rand -base64 32`
   - `ADMIN_USERNAME` and `ADMIN_PASSWORD` (optional, defaults: admin/admin123)
   - `NEXT_PUBLIC_CDN_BASE_URL` - CDN URL (optional, defaults to `/api/cdn`)
   - Note: `POSTGRES_URL` is auto-set by Prisma Postgres
5. Deploy!

---

## 📄 License

MIT
