/**
 * Switches the Prisma schema to SQLite for local development.
 * This allows zero-config local development without PostgreSQL.
 * 
 * Usage: npm run setup:local
 */

import { execSync } from 'child_process'
import { copyFileSync, existsSync, writeFileSync } from 'fs'
import { join } from 'path'

const prismaDir = join(process.cwd(), 'prisma')
const mainSchema = join(prismaDir, 'schema.prisma')
const sqliteSchema = join(prismaDir, 'schema.sqlite.prisma')
const backupSchema = join(prismaDir, 'schema.postgres.prisma')
const envLocalPath = join(process.cwd(), '.env.local')

const defaultEnvContent = `# Authentication
AUTH_SECRET=local-development-secret-key-min-32-chars

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
`

async function main() {
  console.log('🔄 Setting up local development environment...\n')

  // Create .env.local if it doesn't exist
  if (!existsSync(envLocalPath)) {
    writeFileSync(envLocalPath, defaultEnvContent)
    console.log('  ✓ Created .env.local with default credentials')
    console.log('    Username: admin')
    console.log('    Password: admin123\n')
  } else {
    console.log('  ✓ .env.local already exists (keeping existing values)\n')
  }

  // Check if SQLite schema exists
  if (!existsSync(sqliteSchema)) {
    console.error('❌ SQLite schema not found at prisma/schema.sqlite.prisma')
    process.exit(1)
  }

  // Backup current schema (PostgreSQL)
  if (existsSync(mainSchema)) {
    copyFileSync(mainSchema, backupSchema)
    console.log('  ✓ Backed up PostgreSQL schema')
  }

  // Copy SQLite schema to main schema
  copyFileSync(sqliteSchema, mainSchema)
  console.log('  ✓ Switched to SQLite schema')

  // Generate Prisma client
  console.log('  ⏳ Generating Prisma client...')
  execSync('npx prisma generate', { stdio: 'inherit' })

  // Push schema to database
  console.log('  ⏳ Pushing schema to SQLite...')
  execSync('npx prisma db push', { stdio: 'inherit' })

  // Check if database needs seeding
  console.log('  ⏳ Checking seed data...')
  execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' })

  console.log('\n✅ Ready! Local development environment is set up.')
  console.log('   Run "npm run dev" to start the development server.')
  console.log('   Admin login: /admin/login\n')
}

main().catch((e) => {
  console.error('Error:', e)
  process.exit(1)
})
