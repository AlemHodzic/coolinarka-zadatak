# Coolinarika Recepti

A recipe application built with Next.js 14, featuring a full CRUD API, SEO optimization, and a simulated CDN for images.

**Live Demo**: https://coolinarka-zadatak.vercel.app

---

## Quick Start (Local Development)

The app runs locally with SQLite - no external database needed.

### 1. Install and set up

```bash
# Install dependencies
npm install

# Set up the database and seed sample recipes
npm run setup:local
```

### 2. Configure environment variables

Create a `.env.local` file:

```
AUTH_SECRET=local-dev-secret-min-32-characters-long
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### 3. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you should see 8 recipes.

To access the admin panel, go to `/admin/login` and use the credentials from your `.env.local`.

---

## Deploying to Vercel

For production, the app uses PostgreSQL.

### 1. Set up the database

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project → **Storage** → **Create Database** → **Postgres**
3. Click **Connect** to link it to your project

Vercel will automatically add the `POSTGRES_URL` environment variable.

### 2. Add environment variables

In your Vercel project settings, add:

```
AUTH_SECRET=<generate with: openssl rand -base64 32>
ADMIN_USERNAME=<your-admin-username>
ADMIN_PASSWORD=<your-secure-password>
```

### 3. Deploy

Push to GitHub. The build script will automatically:
- Run `prisma db push` to create tables
- Seed the database with sample recipes
- Build the Next.js app

---

## Features

- **Recipe List** (`/recepti`) - Browse recipes with filtering by difficulty and meal group
- **Recipe Detail** (`/recepti/[slug]`) - Full recipe with ingredients, steps, and metadata
- **Search & Filter** - Filter recipes by difficulty, meal group, or search by name
- **Admin Panel** (`/admin`) - Protected area for creating, editing, and deleting recipes
- **REST API** - Full CRUD at `/api/recipes` with rate limiting
- **CDN Simulation** - Images served via a fake CDN route with proper cache headers
- **SEO** - Dynamic metadata, Open Graph tags, JSON-LD structured data
- **Security** - Rate limiting, security headers, environment-based configuration
- **ISR** - Recipe pages use Incremental Static Regeneration
- **Unit Tests** - Test coverage for validation, slug generation, and CDN utilities

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Database | SQLite (dev) / PostgreSQL (prod) |
| ORM | Prisma |
| Auth | NextAuth.js v5 |
| Styling | Tailwind CSS |
| Validation | Zod |
| Testing | Vitest |
| Language | TypeScript |

---

## Security

The application implements several security measures:

- **No hardcoded secrets** - All credentials via environment variables
- **Security headers** - HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **Rate limiting** - API endpoints are rate-limited (100/min reads, 10-20/min writes)
- **Input validation** - All API inputs validated with Zod schemas
- **Auth protection** - Write operations require authentication

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # Auth handlers
│   │   ├── cdn/[...path]/        # Fake CDN route
│   │   └── recipes/              # CRUD endpoints
│   ├── admin/                    # Protected admin panel
│   ├── recepti/                  # Public recipe pages
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── admin/                    # Admin forms and buttons
│   ├── recipes/                  # Recipe card component
│   └── ui/                       # Reusable UI components
├── lib/
│   ├── auth.ts                   # NextAuth config
│   ├── db.ts                     # Prisma client
│   ├── cdn.ts                    # CDN URL builder
│   ├── rate-limit.ts             # Rate limiting utility
│   ├── validation.ts             # Zod schemas
│   └── slug.ts                   # Slug generation
├── middleware.ts                 # Auth middleware
├── types/
│   └── recipe.ts                 # TypeScript types
└── __tests__/                    # Unit tests
    └── lib/                      # Tests for utility functions

prisma/
├── schema.prisma                 # Database schema
└── seed.ts                       # Seed data
```

---

## API Endpoints

| Method | Endpoint | Description | Auth | Rate Limit |
|--------|----------|-------------|------|------------|
| GET | `/api/recipes` | List all recipes | No | 100/min |
| GET | `/api/recipes/:slug` | Get single recipe | No | 100/min |
| POST | `/api/recipes` | Create recipe | Yes | 10/min |
| PUT | `/api/recipes/:slug` | Update recipe | Yes | 20/min |
| DELETE | `/api/recipes/:slug` | Delete recipe | Yes | 10/min |

### Example: Create a recipe

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
    { "name": "Brašno", "quantity": "100", "unit": "g" }
  ],
  "steps": [
    { "order": 1, "instruction": "Prvi korak..." }
  ]
}
```

### Error codes

| Status | Meaning |
|--------|---------|
| 400 | Invalid input |
| 401 | Not authenticated |
| 404 | Recipe not found |
| 409 | Slug already exists |
| 429 | Rate limit exceeded |

---

## CDN Strategy

The app demonstrates how to model CDN image delivery:

1. **Database stores only the path**: `imageId: "/recipes/sarma/hero.jpg"`
2. **`CDN_BASE_URL` env variable** controls where images come from
3. **URLs are built at runtime**: `${CDN_BASE_URL}${imageId}`

### Local development

Images are served from `/public/cdn/` via a fake CDN route at `/api/cdn/*`. This route adds proper cache headers:

```
Cache-Control: public, max-age=31536000, s-maxage=31536000, immutable
ETag: "..."
```

### Production

To use a real CDN:
1. Upload `public/cdn/` contents to your CDN
2. Set `NEXT_PUBLIC_CDN_BASE_URL=https://cdn.yoursite.com`

The structure is designed so you can easily add more image variants (thumbnails, different sizes) later.

---

## Architecture Notes

### Server vs Client separation

| What | Where |
|------|-------|
| Data fetching | Server Components (direct Prisma calls) |
| SEO metadata | Server (`generateMetadata()`) |
| Interactive forms | Client (`'use client'` directive) |

### Why these choices?

**Next.js App Router** - Server Components reduce client JS, better SEO with native metadata API.

**Prisma** - Type-safe queries, auto-generated types, easy to switch between SQLite and PostgreSQL.

**Zod** - Runtime validation that integrates nicely with TypeScript.

---

## Testing

The project includes unit tests for core utility functions using Vitest.

```bash
# Run tests once
npm run test:run

# Run tests in watch mode
npm test
```

Tests cover:
- **Slug generation** - Croatian character handling, special characters, edge cases
- **Validation schemas** - All Zod schema validation rules
- **CDN URL builder** - URL construction with different base URLs

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run setup:local` | Set up SQLite + seed data |
| `npm run build` | Production build |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Re-seed the database |

---

## Troubleshooting

**Database errors?** Delete `prisma/dev.db` and run `npm run setup:local` again.

**Port 3000 busy?** Run `npm run dev -- -p 3001`

**Prisma issues?** Try `npx prisma generate`

**Missing env vars?** Make sure `.env.local` exists with `AUTH_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`

---

## License

MIT
