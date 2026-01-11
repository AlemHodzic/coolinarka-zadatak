import { z } from 'zod'
import {
  DIFFICULTIES,
  MEAL_GROUPS,
  PREP_METHODS,
  DIFFICULTY_LABELS,
  MEAL_GROUP_LABELS,
  PREP_METHOD_LABELS,
  type Difficulty,
  type MealGroup,
  type PrepMethod,
} from '@/lib/constants'

// Re-export types and labels for convenience
export type { Difficulty, MealGroup, PrepMethod }
export { DIFFICULTY_LABELS as difficultyLabels }
export { MEAL_GROUP_LABELS as mealGroupLabels }
export { PREP_METHOD_LABELS as prepMethodLabels }

export interface Ingredient {
  name: string
  quantity: string
  unit: string
}

export interface Step {
  order: number
  instruction: string
}

export interface Recipe {
  id: string
  slug: string
  title: string
  lead: string
  imageId: string
  prepTime: number
  servings: number
  difficulty: Difficulty
  mealGroup: MealGroup
  prepMethod: PrepMethod
  tags: string[]
  ingredients: Ingredient[]
  steps: Step[]
  createdAt: Date
  updatedAt: Date
}

// Zod schemas for validation (using centralized constants)
const difficultySchema = z.enum(DIFFICULTIES)
const mealGroupSchema = z.enum(MEAL_GROUPS)
const prepMethodSchema = z.enum(PREP_METHODS)

const ingredientSchema = z.array(z.object({
  name: z.string(),
  quantity: z.string(),
  unit: z.string()
}))

const stepSchema = z.array(z.object({
  order: z.number(),
  instruction: z.string()
}))

/**
 * Safely parse JSON string, returning empty array on failure
 */
function safeJsonParse<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

/**
 * Parse and validate recipe from database format
 */
export function parseRecipeFromDb(dbRecipe: {
  id: string
  slug: string
  title: string
  lead: string
  imageId: string
  prepTime: number
  servings: number
  difficulty: string
  mealGroup: string
  prepMethod: string
  tags: string
  ingredients: string
  steps: string
  createdAt: Date
  updatedAt: Date
}): Recipe {
  // Validate enums with fallbacks
  const difficulty = difficultySchema.safeParse(dbRecipe.difficulty)
  const mealGroup = mealGroupSchema.safeParse(dbRecipe.mealGroup)
  const prepMethod = prepMethodSchema.safeParse(dbRecipe.prepMethod)

  // Parse and validate JSON fields
  const rawTags = safeJsonParse<string[]>(dbRecipe.tags, [])
  const rawIngredients = safeJsonParse<Ingredient[]>(dbRecipe.ingredients, [])
  const rawSteps = safeJsonParse<Step[]>(dbRecipe.steps, [])

  // Validate arrays
  const ingredients = ingredientSchema.safeParse(rawIngredients)
  const steps = stepSchema.safeParse(rawSteps)

  return {
    id: dbRecipe.id,
    slug: dbRecipe.slug,
    title: dbRecipe.title,
    lead: dbRecipe.lead,
    imageId: dbRecipe.imageId,
    prepTime: dbRecipe.prepTime,
    servings: dbRecipe.servings,
    difficulty: difficulty.success ? difficulty.data : 'MEDIUM',
    mealGroup: mealGroup.success ? mealGroup.data : 'MAIN_DISH',
    prepMethod: prepMethod.success ? prepMethod.data : 'COOKING',
    tags: Array.isArray(rawTags) ? rawTags : [],
    ingredients: ingredients.success ? ingredients.data : [],
    steps: steps.success ? steps.data : [],
    createdAt: dbRecipe.createdAt,
    updatedAt: dbRecipe.updatedAt,
  }
}
