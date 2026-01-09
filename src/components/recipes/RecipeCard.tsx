import Link from 'next/link'
import Image from 'next/image'
import { Recipe } from '@/types/recipe'
import { getThumbnailUrl } from '@/lib/cdn'
import { DifficultyBadge, MealGroupBadge } from '@/components/ui/Badge'

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const imageUrl = getThumbnailUrl(recipe.imageId)

  return (
    <Link href={`/recepti/${recipe.slug}`} className="block group">
      <article className="recipe-card">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            <DifficultyBadge difficulty={recipe.difficulty} />
            <MealGroupBadge mealGroup={recipe.mealGroup} />
          </div>
          
          <h3 className="font-display text-xl font-semibold text-warm-900 mb-2 group-hover:text-primary-600 transition-colors">
            {recipe.title}
          </h3>
          
          <p className="text-warm-600 text-sm line-clamp-2 mb-4">
            {recipe.lead}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-warm-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {recipe.prepTime} min
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {recipe.servings} porcija
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

