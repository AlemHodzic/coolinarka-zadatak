import { execSync } from 'child_process'
import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'

const ROOT = join(__dirname, '..')

function run(cmd: string) {
  console.log(`\n> ${cmd}`)
  execSync(cmd, { stdio: 'inherit', cwd: ROOT })
}

async function main() {
  console.log('🚀 Setting up LOCAL development environment...\n')

  // Temporarily switch schema to SQLite
  const schemaPath = join(ROOT, 'prisma/schema.prisma')
  const originalSchema = readFileSync(schemaPath, 'utf-8')
  
  const sqliteSchema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Recipe {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  lead        String
  imageId     String
  prepTime    Int
  servings    Int
  difficulty  String
  mealGroup   String
  prepMethod  String
  tags        String
  ingredients String
  steps       String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
`

  console.log('📝 Switching to SQLite for local development...')
  writeFileSync(schemaPath, sqliteSchema)

  // Create .env for local
  const envPath = join(ROOT, '.env')
  writeFileSync(envPath, `# Local development (SQLite)
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
`)

  try {
    // Generate Prisma client
    console.log('\n📦 Generating Prisma client...')
    run('npx prisma generate')

    // Push schema to database
    console.log('\n🗄️  Creating SQLite database...')
    run('npx prisma db push')

    // Seed the database
    console.log('\n🌱 Seeding database with recipes...')
    run('npx tsx prisma/seed.ts')

    console.log('\n' + '═'.repeat(50))
    console.log('✅ Local setup complete!')
    console.log('═'.repeat(50))
    console.log('\n🎉 Run "npm run dev" to start the app!')
    console.log('   Then open http://localhost:3000')
    console.log('\n⚠️  Note: Schema is now set to SQLite.')
    console.log('   For production deploy, run: git checkout prisma/schema.prisma\n')
  } catch (error) {
    // Restore original schema on error
    writeFileSync(schemaPath, originalSchema)
    throw error
  }
}

main().catch(console.error)

