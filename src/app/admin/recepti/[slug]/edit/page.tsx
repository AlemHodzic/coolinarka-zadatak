import { RecipeForm } from '@/components/admin/RecipeForm'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getRecipe(slug: string) {
  return prisma.recipe.findUnique({
    where: { slug }
  })
}

export default async function EditRecipePage({ params }: PageProps) {
  const { slug } = await params
  const recipe = await getRecipe(slug)

  if (!recipe) {
    notFound()
  }

  const ingredients = typeof recipe.ingredients === 'string' 
    ? JSON.parse(recipe.ingredients) 
    : recipe.ingredients
  const steps = typeof recipe.steps === 'string'
    ? JSON.parse(recipe.steps)
    : recipe.steps
  const tags = typeof recipe.tags === 'string'
    ? JSON.parse(recipe.tags)
    : Array.isArray(recipe.tags) ? recipe.tags : []

  const initialData = {
    slug: recipe.slug,
    title: recipe.title,
    lead: recipe.lead,
    imageId: recipe.imageId,
    prepTime: recipe.prepTime,
    servings: recipe.servings,
    difficulty: recipe.difficulty,
    mealGroup: recipe.mealGroup,
    prepMethod: recipe.prepMethod,
    tags,
    ingredients,
    steps
  }

  return (
    <div>
      <div className="mb-8">
        <Link 
          href="/admin/recepti"
          className="text-warm-500 hover:text-warm-700 text-sm mb-2 inline-block"
        >
          ← Natrag na listu
        </Link>
        <h1 className="font-display text-3xl font-bold text-warm-900">
          Uredi: {recipe.title}
        </h1>
      </div>
      
      <RecipeForm mode="edit" initialData={initialData} />
    </div>
  )
}

