import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { recipeUpdateSchema } from '@/lib/validation'
import { generateUniqueSlug } from '@/lib/slug'
import { parseRecipeFromDb } from '@/types/recipe'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
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

    return NextResponse.json(parseRecipeFromDb(recipe))
  } catch (error) {
    console.error('Failed to fetch recipe:', error)
    return NextResponse.json(
      { error: 'Greška pri dohvaćanju recepta' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
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
    console.error('Failed to update recipe:', error)
    return NextResponse.json(
      { error: 'Greška pri ažuriranju recepta' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
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
  } catch (error) {
    console.error('Failed to delete recipe:', error)
    return NextResponse.json(
      { error: 'Greška pri brisanju recepta' },
      { status: 500 }
    )
  }
}
