import { MetadataRoute } from 'next'
import { getAllRecipeSlugs } from '@/lib/recipes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://coolinarka-zadatak.vercel.app'

  // Get all recipes using centralized service
  const recipes = await getAllRecipeSlugs()

  const recipeUrls = recipes.map((recipe) => ({
    url: `${baseUrl}/recepti/${recipe.slug}`,
    lastModified: recipe.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/recepti`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...recipeUrls,
  ]
}
