import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { recipeUpdateSchema } from '@/lib/validation'
import { generateUniqueSlug } from '@/lib/slug'

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

    return NextResponse.json(recipe)
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

    const validation = recipeUpdateSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Nevaljani podaci', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const data = validation.data
    let newSlug = slug

    // Generate new slug if title changed
    if (data.title && data.title !== existing.title) {
      newSlug = await generateUniqueSlug(data.title, existing.id)
    }

    const recipe = await prisma.recipe.update({
      where: { slug },
      data: {
        ...data,
        slug: newSlug
      }
    })

    return NextResponse.json(recipe)
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

