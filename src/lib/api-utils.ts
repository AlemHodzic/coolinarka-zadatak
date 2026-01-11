/**
 * API utility functions for parsing request bodies
 */

/**
 * Parse a JSON field that might be a string or already parsed
 */
export function parseJsonField<T>(value: unknown): T {
  if (typeof value === 'string') {
    return JSON.parse(value) as T
  }
  return value as T
}

/**
 * Parse recipe request body, handling JSON fields that might be strings
 */
export function parseRecipeRequestBody(body: Record<string, unknown>) {
  return {
    ...body,
    ingredients: body.ingredients ? parseJsonField(body.ingredients) : undefined,
    steps: body.steps ? parseJsonField(body.steps) : undefined,
    tags: body.tags ? parseJsonField(body.tags) : undefined,
  }
}
