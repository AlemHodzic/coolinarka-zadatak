import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { getHeroUrl, getOgImageUrl } from '@/lib/cdn'
import { DifficultyBadge, MealGroupBadge, Badge } from '@/components/ui/Badge'
import { Recipe, prepMethodLabels, parseRecipeFromDb } from '@/types/recipe'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getRecipe(slug: string): Promise<Recipe | null> {
  const recipe = await prisma.recipe.findUnique({
    where: { slug }
  })
  
  if (!recipe) return null
  
  return parseRecipeFromDb(recipe)
}

export async function generateStaticParams() {
  const recipes = await prisma.recipe.findMany({
    select: { slug: true }
  })
  
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const recipe = await getRecipe(slug)
  
  if (!recipe) {
    return {
      title: 'Recept nije pronađen',
    }
  }

  const ogImageUrl = getOgImageUrl(recipe.imageId)

  return {
    title: recipe.title,
    description: recipe.lead,
    openGraph: {
      title: recipe.title,
      description: recipe.lead,
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.title,
      description: recipe.lead,
      images: [ogImageUrl],
    },
  }
}

export const revalidate = 3600 // ISR: revalidate every hour

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params
  const recipe = await getRecipe(slug)

  if (!recipe) {
    notFound()
  }

  const heroUrl = getHeroUrl(recipe.imageId)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.lead,
    image: heroUrl,
    prepTime: `PT${recipe.prepTime}M`,
    recipeYield: `${recipe.servings} porcija`,
    recipeCategory: recipe.mealGroup,
    recipeCuisine: 'Balkanska',
    recipeIngredient: recipe.ingredients.map(
      (ing) => `${ing.quantity} ${ing.unit} ${ing.name}`.trim()
    ),
    recipeInstructions: recipe.steps.map((step) => ({
      '@type': 'HowToStep',
      position: step.order,
      text: step.instruction,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="min-h-screen">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          <Image
            src={heroUrl}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
              <Link 
                href="/recepti" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Natrag na recepte
              </Link>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {recipe.title}
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                {recipe.lead}
              </p>
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Meta Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 -mt-16 relative z-10 mb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">⏱️</div>
                <p className="text-warm-500 text-sm">Vrijeme pripreme</p>
                <p className="font-display text-xl font-semibold text-warm-900">
                  {recipe.prepTime} min
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-2">👥</div>
                <p className="text-warm-500 text-sm">Broj porcija</p>
                <p className="font-display text-xl font-semibold text-warm-900">
                  {recipe.servings}
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <p className="text-warm-500 text-sm">Težina pripreme</p>
                <div className="mt-1">
                  <DifficultyBadge difficulty={recipe.difficulty} />
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-2">🍽️</div>
                <p className="text-warm-500 text-sm">Način pripreme</p>
                <p className="font-display text-lg font-semibold text-warm-900">
                  {prepMethodLabels[recipe.prepMethod]}
                </p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-10">
            <MealGroupBadge mealGroup={recipe.mealGroup} />
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="default">
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Ingredients */}
            <div className="md:col-span-1">
              <div className="bg-warm-50 rounded-2xl p-6 sticky top-24">
                <h2 className="font-display text-2xl font-bold text-warm-900 mb-6 flex items-center gap-2">
                  <span>🥄</span> Sastojci
                </h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3 text-warm-700">
                      <span className="w-2 h-2 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                      <span>
                        {ingredient.quantity && (
                          <strong className="text-warm-900">
                            {ingredient.quantity} {ingredient.unit}
                          </strong>
                        )}{' '}
                        {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Steps */}
            <div className="md:col-span-2">
              <h2 className="font-display text-2xl font-bold text-warm-900 mb-6 flex items-center gap-2">
                <span>👨‍🍳</span> Priprema
              </h2>
              <ol className="space-y-6">
                {recipe.steps
                  .sort((a, b) => a.order - b.order)
                  .map((step) => (
                    <li key={step.order} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-lg">
                        {step.order}
                      </div>
                      <div className="flex-1 pt-2">
                        <p className="text-warm-700 leading-relaxed">
                          {step.instruction}
                        </p>
                      </div>
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
