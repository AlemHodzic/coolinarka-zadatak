/**
 * Switches the Prisma schema to SQLite for local development.
 * This allows zero-config local development without PostgreSQL.
 * 
 * Usage: npm run dev:local
 */

import { execSync } from 'child_process'
import { copyFileSync, existsSync } from 'fs'
import { join } from 'path'

const prismaDir = join(process.cwd(), 'prisma')
const mainSchema = join(prismaDir, 'schema.prisma')
const sqliteSchema = join(prismaDir, 'schema.sqlite.prisma')
const backupSchema = join(prismaDir, 'schema.postgres.prisma')

async function main() {
  console.log('🔄 Switching to SQLite for local development...\n')

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

  console.log('\n✅ Ready! SQLite database is set up.')
  console.log('   Run "npm run dev" to start the development server.\n')
}

main().catch((e) => {
  console.error('Error:', e)
  process.exit(1)
})

