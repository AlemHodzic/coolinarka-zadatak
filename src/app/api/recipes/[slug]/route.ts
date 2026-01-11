import { NextRequest, NextResponse } from 'next/server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { recipeUpdateSchema } from '@/lib/validation'
import { generateUniqueSlug } from '@/lib/slug'
import { parseRecipeFromDb } from '@/types/recipe'
import { rateLimit, getClientId } from '@/lib/rate-limit'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  // Rate limit: 100 requests per minute
  const clientId = getClientId(request)
  const limit = rateLimit(`get-recipe:${clientId}`, { limit: 100, windowMs: 60 * 1000 })
  
  if (!limit.success) {
    return NextResponse.json(
      { error: 'Previše zahtjeva. Pokušajte ponovno kasnije.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  try {
    const { slug } = await params
    
    const recipe = await prisma.recipe.findUnique({
      where: { slug }
    })

    if (!recipe) {
      return NextResponse.json(
        { error: 'Recept nije pronađen' },
        { status: 404 }
      )
    }

    return NextResponse.json(parseRecipeFromDb(recipe), {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Greška pri dohvaćanju recepta' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  // Rate limit: 20 updates per minute
  const clientId = getClientId(request)
  const limit = rateLimit(`put-recipe:${clientId}`, { limit: 20, windowMs: 60 * 1000 })
  
  if (!limit.success) {
    return NextResponse.json(
      { error: 'Previše zahtjeva. Pokušajte ponovno kasnije.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  // Check authentication - only logged-in users can update recipes
  const session = await auth()
  if (!session) {
    return NextResponse.json(
      { error: 'Neautorizirano - morate biti prijavljeni' },
      { status: 401 }
    )
  }

  try {
    const { slug } = await params
    const body = await request.json()

    const existing = await prisma.recipe.findUnique({
      where: { slug }
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Recept nije pronađen' },
        { status: 404 }
      )
    }

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

    const validation = recipeUpdateSchema.safeParse(parsedBody)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Nevaljani podaci', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const data = validation.data
    let newSlug = slug

    if (data.title && data.title !== existing.title) {
      newSlug = await generateUniqueSlug(data.title, existing.id)
    }

    const updateData: Record<string, unknown> = { slug: newSlug }
    
    if (data.title !== undefined) updateData.title = data.title
    if (data.lead !== undefined) updateData.lead = data.lead
    if (data.imageId !== undefined) updateData.imageId = data.imageId
    if (data.prepTime !== undefined) updateData.prepTime = data.prepTime
    if (data.servings !== undefined) updateData.servings = data.servings
    if (data.difficulty !== undefined) updateData.difficulty = data.difficulty
    if (data.mealGroup !== undefined) updateData.mealGroup = data.mealGroup
    if (data.prepMethod !== undefined) updateData.prepMethod = data.prepMethod
    if (data.tags !== undefined) updateData.tags = JSON.stringify(data.tags)
    if (data.ingredients !== undefined) updateData.ingredients = JSON.stringify(data.ingredients)
    if (data.steps !== undefined) updateData.steps = JSON.stringify(data.steps)

    const recipe = await prisma.recipe.update({
      where: { slug },
      data: updateData
    })

    return NextResponse.json(parseRecipeFromDb(recipe))
  } catch (error) {
    
    // Handle unique constraint violation (slug conflict)
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Recept s ovim nazivom već postoji' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Greška pri ažuriranju recepta' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  // Rate limit: 10 deletes per minute
  const clientId = getClientId(request)
  const limit = rateLimit(`delete-recipe:${clientId}`, { limit: 10, windowMs: 60 * 1000 })
  
  if (!limit.success) {
    return NextResponse.json(
      { error: 'Previše zahtjeva. Pokušajte ponovno kasnije.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  // Check authentication - only logged-in users can delete recipes
  const session = await auth()
  if (!session) {
    return NextResponse.json(
      { error: 'Neautorizirano - morate biti prijavljeni' },
      { status: 401 }
    )
  }

  try {
    const { slug } = await params

    const existing = await prisma.recipe.findUnique({
      where: { slug }
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Recept nije pronađen' },
        { status: 404 }
      )
    }

    await prisma.recipe.delete({
      where: { slug }
    })

    return NextResponse.json({ message: 'Recept je uspješno obrisan' })
  } catch {
    return NextResponse.json(
      { error: 'Greška pri brisanju recepta' },
      { status: 500 }
    )
  }
}
