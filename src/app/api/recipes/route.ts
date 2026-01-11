import { NextRequest, NextResponse } from 'next/server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { recipeCreateSchema } from '@/lib/validation'
import { generateUniqueSlug } from '@/lib/slug'
import { parseRecipeFromDb } from '@/types/recipe'
import { rateLimit, getClientId } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  // Rate limit: 100 requests per minute for reads
  const clientId = getClientId(request)
  const limit = rateLimit(`get-recipes:${clientId}`, { limit: 100, windowMs: 60 * 1000 })
  
  if (!limit.success) {
    return NextResponse.json(
      { error: 'Previše zahtjeva. Pokušajte ponovno kasnije.' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.limit.toString(),
          'X-RateLimit-Remaining': limit.remaining.toString(),
          'X-RateLimit-Reset': limit.reset.toString(),
          'Retry-After': Math.ceil((limit.reset - Date.now()) / 1000).toString()
        }
      }
    )
  }

  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(recipes.map(parseRecipeFromDb), {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'X-RateLimit-Limit': limit.limit.toString(),
        'X-RateLimit-Remaining': limit.remaining.toString(),
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Greška pri dohvaćanju recepata' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Rate limit: 10 creates per minute (stricter for writes)
  const clientId = getClientId(request)
  const limit = rateLimit(`post-recipes:${clientId}`, { limit: 10, windowMs: 60 * 1000 })
  
  if (!limit.success) {
    return NextResponse.json(
      { error: 'Previše zahtjeva. Pokušajte ponovno kasnije.' },
      { 
        status: 429,
        headers: {
          'Retry-After': Math.ceil((limit.reset - Date.now()) / 1000).toString()
        }
      }
    )
  }

  // Check authentication - only logged-in users can create recipes
  const session = await auth()
  if (!session) {
    return NextResponse.json(
      { error: 'Neautorizirano - morate biti prijavljeni' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const parsedBody = {
      ...body,
      ingredients: typeof body.ingredients === 'string' 
        ? JSON.parse(body.ingredients) 
        : body.ingredients,
      steps: typeof body.steps === 'string' 
        ? JSON.parse(body.steps) 
        : body.steps,
      tags: typeof body.tags === 'string'
        ? JSON.parse(body.tags)
        : body.tags
    }
    
    const validation = recipeCreateSchema.safeParse(parsedBody)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Nevaljani podaci', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const data = validation.data
    const slug = await generateUniqueSlug(data.title)

    const recipe = await prisma.recipe.create({
      data: {
        title: data.title,
        slug,
        lead: data.lead,
        imageId: data.imageId,
        prepTime: data.prepTime,
        servings: data.servings,
        difficulty: data.difficulty,
        mealGroup: data.mealGroup,
        prepMethod: data.prepMethod,
        tags: JSON.stringify(data.tags),
        ingredients: JSON.stringify(data.ingredients),
        steps: JSON.stringify(data.steps),
      }
    })

    return NextResponse.json(parseRecipeFromDb(recipe), { status: 201 })
  } catch (error) {
    
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Recept s ovim nazivom već postoji' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Greška pri kreiranju recepta' },
      { status: 500 }
    )
  }
}
