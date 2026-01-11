/**
 * Recipe repository/service layer
 * Centralizes all recipe data access logic
 */

import { cache } from 'react'
import { prisma } from './db'
import { Recipe, parseRecipeFromDb } from '@/types/recipe'

const DEFAULT_PAGE_SIZE = 12

export interface RecipeFilters {
  difficulty?: string
  mealGroup?: string
  search?: string
}

export interface PaginationOptions {
  page?: number
  pageSize?: number
}

export interface PaginatedResult<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

/**
 * Build Prisma where clause from filters
 */
function buildWhereClause(filters?: RecipeFilters): Record<string, unknown> {
  const where: Record<string, unknown> = {}

  if (filters?.difficulty) {
    where.difficulty = filters.difficulty
  }

  if (filters?.mealGroup) {
    where.mealGroup = filters.mealGroup
  }

  if (filters?.search) {
    // Note: 'mode: insensitive' only works with PostgreSQL
    // For SQLite, LIKE is case-insensitive by default for ASCII
    where.title = {
      contains: filters.search,
    }
  }

  return where
}

/**
 * Get all recipes with optional filters (no pagination)
 */
export async function getAllRecipes(filters?: RecipeFilters): Promise<Recipe[]> {
  const where = buildWhereClause(filters)
  const recipes = await prisma.recipe.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  })
  return recipes.map(parseRecipeFromDb)
}

/**
 * Get recipes with pagination and filters
 */
export async function getRecipesPaginated(
  filters?: RecipeFilters,
  pagination?: PaginationOptions
): Promise<PaginatedResult<Recipe>> {
  const page = pagination?.page ?? 1
  const pageSize = pagination?.pageSize ?? DEFAULT_PAGE_SIZE
  const skip = (page - 1) * pageSize
  const where = buildWhereClause(filters)

  const [recipes, total] = await Promise.all([
    prisma.recipe.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: pageSize,
      skip,
    }),
    prisma.recipe.count({ where })
  ])

  const totalPages = Math.ceil(total / pageSize)

  return {
    data: recipes.map(parseRecipeFromDb),
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    }
  }
}

/**
 * Get a single recipe by slug (cached to dedupe requests in same render)
 * Using React cache() to avoid double fetching in generateMetadata + page component
 */
export const getRecipeBySlug = cache(async (slug: string): Promise<Recipe | null> => {
  const recipe = await prisma.recipe.findUnique({
    where: { slug }
  })
  return recipe ? parseRecipeFromDb(recipe) : null
})

/**
 * Check if a recipe exists by slug
 */
export async function recipeExists(slug: string): Promise<boolean> {
  const recipe = await prisma.recipe.findUnique({
    where: { slug },
    select: { id: true }
  })
  return !!recipe
}

/**
 * Get recipe for editing (returns raw DB format for forms)
 */
export async function getRecipeForEdit(slug: string) {
  return prisma.recipe.findUnique({
    where: { slug }
  })
}

/**
 * Get all recipe slugs (for sitemap/static generation)
 */
export async function getAllRecipeSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  return prisma.recipe.findMany({
    select: { slug: true, updatedAt: true }
  })
}
