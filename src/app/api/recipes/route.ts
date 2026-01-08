import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { recipeCreateSchema } from '@/lib/validation'
import { generateUniqueSlug } from '@/lib/slug'
import { parseRecipeFromDb } from '@/types/recipe'

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(recipes.map(parseRecipeFromDb))
  } catch (error) {
    console.error('Failed to fetch recipes:', error)
    return NextResponse.json(
      { error: 'Greška pri dohvaćanju recepata' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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
    console.error('Failed to create recipe:', error)
    return NextResponse.json(
      { error: 'Greška pri kreiranju recepta' },
      { status: 500 }
    )
  }
}
