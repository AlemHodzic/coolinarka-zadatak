import slugify from 'slugify'
import { prisma } from './db'

export function createSlug(title: string): string {
  return slugify(title, {
    lower: true,
    strict: true,
    locale: 'hr'
  })
}

export async function generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
  const baseSlug = createSlug(title)
  let slug = baseSlug
  let counter = 1

  while (true) {
    const existing = await prisma.recipe.findFirst({
      where: {
        slug,
        ...(excludeId ? { NOT: { id: excludeId } } : {})
      }
    })

    if (!existing) {
      return slug
    }

    slug = `${baseSlug}-${counter}`
    counter++
  }
}

