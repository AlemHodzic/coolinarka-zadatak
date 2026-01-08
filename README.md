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
- **Real CDN Integration** - Cloudinary for optimized image delivery with on-the-fly transformations
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
| **Images** | Cloudinary / Unsplash fallback | Real CDN in prod, placeholder images for local dev |
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
│      PostgreSQL DB        │        │      Cloudinary CDN         │
│  • Recipe data            │        │  • Image storage            │
│  • Prisma ORM             │        │  • On-the-fly transforms    │
│  • Type-safe queries      │        │  • Global edge delivery     │
└───────────────────────────┘        └─────────────────────────────┘
```

### Server vs Client Separation

| Responsibility | Location | Examples |
|----------------|----------|----------|
| Data fetching | Server | `prisma.recipe.findMany()` in page components |
| SEO metadata | Server | `generateMetadata()` function |
| Initial render | Server | All page components are Server Components by default |
| Image optimization | CDN | Cloudinary with `f_auto,q_auto` transforms |
| Interactive UI | Client | Form handling, animations (marked with `'use client'`) |

---

## 🚀 Getting Started

### Quick Start (Zero Config!)

The app works out of the box with **no external services required**. Just run:

```bash
# 1. Install dependencies
npm install

# 2. Set up database and seed data (automatic!)
npm run setup

# 3. Start the app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you should see 8 recipes with images!

**That's it!** The app uses:
- **SQLite** - File-based database, no setup needed
- **Placeholder images** - Beautiful Unsplash images, no Cloudinary needed

---

### Production Setup (Optional)

For production deployment, you can optionally configure:

#### PostgreSQL Database

1. Create a database on [Neon](https://neon.tech) (free) or [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
2. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"  // Change from "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
3. Update `.env` with your PostgreSQL connection string

#### Cloudinary CDN (Custom Images)

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Add to `.env`:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
   ```
3. Upload images to `recepti/` folder with names: `sarma`, `cevapi`, `burek`, etc.

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
│   ├── cloudinary.ts             # CDN URL builder
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
    "imageId": "recepti/sarma",
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
  "imageId": "recepti/novi-recept",
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
| `404` | Recipe not found |
| `500` | Server error |

---

## 🖼 CDN Strategy

Instead of simulating a CDN, this project uses **Cloudinary** - a real production CDN:

### How It Works

1. **Database stores only the image ID**: `imageId: "recepti/sarma"`
2. **URLs are built dynamically** with transformation parameters
3. **Same source, multiple sizes**: Thumbnail (400x300) and Hero (1200x800) from one upload

### URL Builder (`lib/cloudinary.ts`)

```typescript
// Thumbnail for list page
getImageUrl(imageId, { width: 400, height: 300 })
// → https://res.cloudinary.com/CLOUD/image/upload/w_400,h_300,c_fill,f_auto,q_auto/recepti/sarma

// Hero for detail page
getImageUrl(imageId, { width: 1200, height: 800 })
// → https://res.cloudinary.com/CLOUD/image/upload/w_1200,h_800,c_fill,f_auto,q_auto/recepti/sarma
```

### CDN Features Demonstrated

- **Real edge caching** - Images served from nearest global location
- **Automatic format optimization** - `f_auto` serves WebP/AVIF based on browser
- **Automatic quality optimization** - `q_auto` balances quality vs size
- **On-the-fly transformations** - Resize, crop without pre-generating variants

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

### Why Zod for validation?

- Runtime validation that TypeScript can't provide
- Excellent error messages
- Schema inference for types (DRY)
- Works seamlessly with forms and APIs

### Why Cloudinary over fake CDN?

- Shows real-world production knowledge
- Demonstrates understanding of CDN concepts (edge caching, transformations)
- Free tier is sufficient for demo
- More impressive than simulated cache headers

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
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
3. Add environment variables:
   - `DATABASE_URL` - PostgreSQL connection string (use Vercel Postgres)
   - `AUTH_SECRET` - Generate with `openssl rand -base64 32`
   - `ADMIN_USERNAME` and `ADMIN_PASSWORD` (optional, defaults: admin/admin123)
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name (optional)
4. Deploy!

---

## 📄 License

MIT
