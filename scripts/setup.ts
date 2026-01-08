import { execSync } from 'child_process'
import { existsSync, writeFileSync } from 'fs'
import { join } from 'path'

const ROOT = join(__dirname, '..')

function run(cmd: string) {
  console.log(`\n> ${cmd}`)
  execSync(cmd, { stdio: 'inherit', cwd: ROOT })
}

async function main() {
  console.log('🚀 Setting up Coolinarika Recepti...\n')

  // Always create/overwrite .env with SQLite config for local development
  const envPath = join(ROOT, '.env')
  const envExists = existsSync(envPath)
  
  if (!envExists) {
    console.log('📝 Creating .env file with SQLite database...')
  } else {
    console.log('📝 Updating .env file for SQLite database...')
  }
  
  writeFileSync(envPath, `# SQLite database (works out of the box!)
DATABASE_URL="file:./dev.db"

# Optional: Cloudinary cloud name for custom images
# Leave empty to use beautiful placeholder images from Unsplash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
`)

  // Generate Prisma client
  console.log('\n📦 Generating Prisma client...')
  run('npx prisma generate')

  // Push schema to database
  console.log('\n🗄️  Creating database tables...')
  run('npx prisma db push')

  // Seed the database
  console.log('\n🌱 Seeding database with recipes...')
  run('npx tsx prisma/seed.ts')

  console.log('\n' + '═'.repeat(50))
  console.log('✅ Setup complete!')
  console.log('═'.repeat(50))
  console.log('\n🎉 Run "npm run dev" to start the app!')
  console.log('   Then open http://localhost:3000\n')
}

main().catch(console.error)
