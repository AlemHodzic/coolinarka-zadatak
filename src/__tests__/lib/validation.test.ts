import { describe, it, expect } from 'vitest'
import { recipeCreateSchema, recipeUpdateSchema } from '@/lib/validation'

describe('recipeCreateSchema', () => {
  const validRecipe = {
    title: 'Sarma',
    lead: 'Tradicionalna sarma od kiselog kupusa',
    imageId: '/recipes/sarma/hero.jpg',
    prepTime: 180,
    servings: 8,
    difficulty: 'HARD' as const,
    mealGroup: 'MAIN_DISH' as const,
    prepMethod: 'COOKING' as const,
    tags: ['tradicionalno', 'zimsko'],
    ingredients: [
      { name: 'Kiseli kupus', quantity: '1', unit: 'glavica' }
    ],
    steps: [
      { order: 1, instruction: 'Oprati listove kupusa' }
    ]
  }

  it('validates a correct recipe', () => {
    const result = recipeCreateSchema.safeParse(validRecipe)
    expect(result.success).toBe(true)
  })

  describe('title validation', () => {
    it('rejects empty title', () => {
      const result = recipeCreateSchema.safeParse({ ...validRecipe, title: '' })
      expect(result.success).toBe(false)
    })

    it('rejects title over 200 characters', () => {
      const result = recipeCreateSchema.safeParse({ 
        ...validRecipe, 
        title: 'a'.repeat(201) 
      })
      expect(result.success).toBe(false)
    })
  })

  describe('lead validation', () => {
    it('rejects empty lead', () => {
      const result = recipeCreateSchema.safeParse({ ...validRecipe, lead: '' })
      expect(result.success).toBe(false)
    })

    it('rejects lead over 500 characters', () => {
      const result = recipeCreateSchema.safeParse({ 
        ...validRecipe, 
        lead: 'a'.repeat(501) 
      })
      expect(result.success).toBe(false)
    })
  })

  describe('prepTime validation', () => {
    it('rejects zero prep time', () => {
      const result = recipeCreateSchema.safeParse({ ...validRecipe, prepTime: 0 })
      expect(result.success).toBe(false)
    })

    it('rejects negative prep time', () => {
      const result = recipeCreateSchema.safeParse({ ...validRecipe, prepTime: -10 })
      expect(result.success).toBe(false)
    })

    it('accepts positive prep time', () => {
      const result = recipeCreateSchema.safeParse({ ...validRecipe, prepTime: 30 })
      expect(result.success).toBe(true)
    })
  })

  describe('servings validation', () => {
    it('rejects zero servings', () => {
      const result = recipeCreateSchema.safeParse({ ...validRecipe, servings: 0 })
      expect(result.success).toBe(false)
    })

    it('accepts positive servings', () => {
      const result = recipeCreateSchema.safeParse({ ...validRecipe, servings: 4 })
      expect(result.success).toBe(true)
    })
  })

  describe('difficulty validation', () => {
    it('accepts valid difficulty levels', () => {
      expect(recipeCreateSchema.safeParse({ ...validRecipe, difficulty: 'EASY' }).success).toBe(true)
      expect(recipeCreateSchema.safeParse({ ...validRecipe, difficulty: 'MEDIUM' }).success).toBe(true)
      expect(recipeCreateSchema.safeParse({ ...validRecipe, difficulty: 'HARD' }).success).toBe(true)
    })

    it('rejects invalid difficulty', () => {
      const result = recipeCreateSchema.safeParse({ ...validRecipe, difficulty: 'IMPOSSIBLE' })
      expect(result.success).toBe(false)
    })
  })

  describe('mealGroup validation', () => {
    it('accepts valid meal groups', () => {
      const groups = ['MAIN_DISH', 'DESSERT', 'BREAD', 'APPETIZER', 'SOUP', 'SALAD', 'DRINK']
      groups.forEach(group => {
        const result = recipeCreateSchema.safeParse({ ...validRecipe, mealGroup: group })
        expect(result.success).toBe(true)
      })
    })

    it('rejects invalid meal group', () => {
      const result = recipeCreateSchema.safeParse({ ...validRecipe, mealGroup: 'BREAKFAST' })
      expect(result.success).toBe(false)
    })
  })

  describe('prepMethod validation', () => {
    it('accepts valid prep methods', () => {
      const methods = ['BAKING', 'COOKING', 'FRYING', 'GRILLING', 'RAW', 'STEAMING']
      methods.forEach(method => {
        const result = recipeCreateSchema.safeParse({ ...validRecipe, prepMethod: method })
        expect(result.success).toBe(true)
      })
    })

    it('rejects invalid prep method', () => {
      const result = recipeCreateSchema.safeParse({ ...validRecipe, prepMethod: 'MICROWAVING' })
      expect(result.success).toBe(false)
    })
  })

  describe('ingredients validation', () => {
    it('requires at least one ingredient', () => {
      const result = recipeCreateSchema.safeParse({ ...validRecipe, ingredients: [] })
      expect(result.success).toBe(false)
    })

    it('validates ingredient structure', () => {
      const result = recipeCreateSchema.safeParse({
        ...validRecipe,
        ingredients: [{ name: 'Brašno', quantity: '500', unit: 'g' }]
      })
      expect(result.success).toBe(true)
    })

    it('rejects ingredient without name', () => {
      const result = recipeCreateSchema.safeParse({
        ...validRecipe,
        ingredients: [{ name: '', quantity: '500', unit: 'g' }]
      })
      expect(result.success).toBe(false)
    })
  })

  describe('steps validation', () => {
    it('requires at least one step', () => {
      const result = recipeCreateSchema.safeParse({ ...validRecipe, steps: [] })
      expect(result.success).toBe(false)
    })

    it('validates step structure', () => {
      const result = recipeCreateSchema.safeParse({
        ...validRecipe,
        steps: [
          { order: 1, instruction: 'Prvi korak' },
          { order: 2, instruction: 'Drugi korak' }
        ]
      })
      expect(result.success).toBe(true)
    })

    it('rejects step without instruction', () => {
      const result = recipeCreateSchema.safeParse({
        ...validRecipe,
        steps: [{ order: 1, instruction: '' }]
      })
      expect(result.success).toBe(false)
    })

    it('rejects step with non-positive order', () => {
      const result = recipeCreateSchema.safeParse({
        ...validRecipe,
        steps: [{ order: 0, instruction: 'Test' }]
      })
      expect(result.success).toBe(false)
    })
  })

  describe('tags validation', () => {
    it('accepts empty tags array', () => {
      const result = recipeCreateSchema.safeParse({ ...validRecipe, tags: [] })
      expect(result.success).toBe(true)
    })

    it('accepts tags array with strings', () => {
      const result = recipeCreateSchema.safeParse({
        ...validRecipe,
        tags: ['tag1', 'tag2', 'tag3']
      })
      expect(result.success).toBe(true)
    })
  })
})

describe('recipeUpdateSchema', () => {
  it('allows partial updates', () => {
    const result = recipeUpdateSchema.safeParse({ title: 'New Title' })
    expect(result.success).toBe(true)
  })

  it('allows empty object', () => {
    const result = recipeUpdateSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('still validates provided fields', () => {
    const result = recipeUpdateSchema.safeParse({ prepTime: -5 })
    expect(result.success).toBe(false)
  })
})
