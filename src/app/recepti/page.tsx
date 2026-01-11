import { Metadata } from 'next'
import { Suspense } from 'react'
import { prisma } from '@/lib/db'
import { RecipeCard } from '@/components/recipes/RecipeCard'
import { RecipeFilters } from '@/components/recipes/RecipeFilters'
import { Recipe, parseRecipeFromDb } from '@/types/recipe'

export const metadata: Metadata = {
  title: 'Svi Recepti',
  description: 'Pregledajte našu kolekciju tradicionalnih i modernih recepata balkanske kuhinje.',
}

interface PageProps {
  searchParams: Promise<{
    difficulty?: string
    mealGroup?: string
    search?: string
  }>
}

async function getRecipes(filters: {
  difficulty?: string
  mealGroup?: string
  search?: string
}): Promise<Recipe[]> {
  const where: Record<string, unknown> = {}

  if (filters.difficulty) {
    where.difficulty = filters.difficulty
  }

  if (filters.mealGroup) {
    where.mealGroup = filters.mealGroup
  }

  if (filters.search) {
    where.title = {
      contains: filters.search,
      mode: 'insensitive'
    }
  }

  const recipes = await prisma.recipe.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  })
  
  return recipes.map(parseRecipeFromDb)
}

export default async function RecipesPage({ searchParams }: PageProps) {
  const filters = await searchParams
  const recipes = await getRecipes(filters)
  const hasFilters = filters.difficulty || filters.mealGroup || filters.search

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🥘</div>
          <div className="absolute top-20 right-20 text-7xl">🍲</div>
          <div className="absolute bottom-10 left-1/4 text-6xl">🥗</div>
          <div className="absolute bottom-20 right-1/3 text-8xl">🍰</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Inspiriraj se i pripremi nešto dobro!
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Otkrijte tradicionalne recepte balkanske kuhinje, od sočnih ćevapa do slatkih palačinki.
          </p>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-3xl font-bold text-warm-900">
              {hasFilters ? 'Filtrirani recepti' : 'Svi recepti'}
            </h2>
            <p className="text-warm-600 mt-1">
              {recipes.length} {recipes.length === 1 ? 'recept' : recipes.length < 5 ? 'recepta' : 'recepata'}
            </p>
          </div>
        </div>

        {/* Filters */}
        <Suspense fallback={null}>
          <RecipeFilters />
        </Suspense>

        {recipes.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-warm-700 text-lg font-medium mb-2">
              {hasFilters 
                ? 'Nema recepata koji odgovaraju filtrima' 
                : 'Nema recepata za prikaz'}
            </p>
            {hasFilters && (
              <p className="text-warm-500 mb-6">
                Pokušajte promijeniti ili ukloniti neke filtere
              </p>
            )}
            {hasFilters && (
              <a 
                href="/recepti" 
                className="btn btn-secondary"
              >
                Očisti sve filtere
              </a>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-200">
            {recipes.map((recipe) => (
              <div key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
