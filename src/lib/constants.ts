/**
 * Centralized constants for the application
 * Single source of truth for enums and their labels
 */

// Difficulty levels
export const DIFFICULTIES = ['EASY', 'MEDIUM', 'HARD'] as const
export type Difficulty = (typeof DIFFICULTIES)[number]

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  EASY: 'Jednostavno',
  MEDIUM: 'Srednje zahtjevno',
  HARD: 'Složeno',
}

// Meal groups
export const MEAL_GROUPS = ['MAIN_DISH', 'DESSERT', 'BREAD', 'APPETIZER', 'SOUP', 'SALAD', 'DRINK'] as const
export type MealGroup = (typeof MEAL_GROUPS)[number]

export const MEAL_GROUP_LABELS: Record<MealGroup, string> = {
  MAIN_DISH: 'Glavna jela',
  DESSERT: 'Deserti',
  BREAD: 'Kruh i peciva',
  APPETIZER: 'Predjela',
  SOUP: 'Juhe',
  SALAD: 'Salate',
  DRINK: 'Pića',
}

// Preparation methods
export const PREP_METHODS = ['BAKING', 'COOKING', 'FRYING', 'GRILLING', 'RAW', 'STEAMING'] as const
export type PrepMethod = (typeof PREP_METHODS)[number]

export const PREP_METHOD_LABELS: Record<PrepMethod, string> = {
  BAKING: 'Pečenje',
  COOKING: 'Kuhanje',
  FRYING: 'Prženje',
  GRILLING: 'Roštiljanje',
  RAW: 'Sirovo',
  STEAMING: 'Kuhanje na pari',
}
