export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'
export type MealGroup = 'MAIN_DISH' | 'DESSERT' | 'BREAD' | 'APPETIZER' | 'SOUP' | 'SALAD' | 'DRINK'
export type PrepMethod = 'BAKING' | 'COOKING' | 'FRYING' | 'GRILLING' | 'RAW' | 'STEAMING'

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

export const difficultyLabels: Record<Difficulty, string> = {
  EASY: 'Jednostavno',
  MEDIUM: 'Srednje zahtjevno',
  HARD: 'Složeno'
}

export const mealGroupLabels: Record<MealGroup, string> = {
  MAIN_DISH: 'Glavna jela',
  DESSERT: 'Deserti',
  BREAD: 'Kruh i peciva',
  APPETIZER: 'Predjela',
  SOUP: 'Juhe',
  SALAD: 'Salate',
  DRINK: 'Pića'
}

export const prepMethodLabels: Record<PrepMethod, string> = {
  BAKING: 'Pečenje',
  COOKING: 'Kuhanje',
  FRYING: 'Prženje',
  GRILLING: 'Roštiljanje',
  RAW: 'Sirovo',
  STEAMING: 'Kuhanje na pari'
}

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
  return {
    ...dbRecipe,
    difficulty: dbRecipe.difficulty as Difficulty,
    mealGroup: dbRecipe.mealGroup as MealGroup,
    prepMethod: dbRecipe.prepMethod as PrepMethod,
    tags: JSON.parse(dbRecipe.tags),
    ingredients: JSON.parse(dbRecipe.ingredients),
    steps: JSON.parse(dbRecipe.steps),
  }
}
