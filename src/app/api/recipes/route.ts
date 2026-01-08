import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { recipeCreateSchema } from '@/lib/validation'
import { generateUniqueSlug } from '@/lib/slug'

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(recipes)
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
    
    const validation = recipeCreateSchema.safeParse(body)
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
        ...data,
        slug
      }
    })

    return NextResponse.json(recipe, { status: 201 })
  } catch (error) {
    console.error('Failed to create recipe:', error)
    return NextResponse.json(
      { error: 'Greška pri kreiranju recepta' },
      { status: 500 }
    )
  }
}

