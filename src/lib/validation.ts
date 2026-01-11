import { z } from 'zod'
import { DIFFICULTIES, MEAL_GROUPS, PREP_METHODS } from './constants'

const ingredientSchema = z.object({
  name: z.string().min(1, 'Naziv sastojka je obavezan'),
  quantity: z.string(),
  unit: z.string()
})

const stepSchema = z.object({
  order: z.number().int().positive(),
  instruction: z.string().min(1, 'Uputa je obavezna')
})

export const recipeCreateSchema = z.object({
  title: z.string().min(1, 'Naziv recepta je obavezan').max(200),
  lead: z.string().min(1, 'Kratki opis je obavezan').max(500),
  imageId: z.string().min(1, 'Slika je obavezna'),
  prepTime: z.number().int().positive('Vrijeme pripreme mora biti pozitivan broj'),
  servings: z.number().int().positive('Broj porcija mora biti pozitivan broj'),
  difficulty: z.enum(DIFFICULTIES),
  mealGroup: z.enum(MEAL_GROUPS),
  prepMethod: z.enum(PREP_METHODS),
  tags: z.array(z.string()).default([]),
  ingredients: z.array(ingredientSchema).min(1, 'Potreban je barem jedan sastojak'),
  steps: z.array(stepSchema).min(1, 'Potreban je barem jedan korak pripreme')
})

export const recipeUpdateSchema = recipeCreateSchema.partial()

export type RecipeCreateInput = z.infer<typeof recipeCreateSchema>
export type RecipeUpdateInput = z.infer<typeof recipeUpdateSchema>
