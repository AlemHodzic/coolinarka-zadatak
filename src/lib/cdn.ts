/**
 * CDN URL Builder
 * 
 * Builds image URLs using the CDN_BASE_URL environment variable.
 * This approach allows easy switching between:
 * - Development: Local fake CDN (/api/cdn)
 * - Production: Real CDN (https://cdn.example.com)
 * 
 * Database stores only the path (e.g., "/recipes/sarma/hero.jpg"),
 * and the full URL is constructed at runtime.
 */

// CDN base URL from environment, defaults to local fake CDN
const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_BASE_URL || '/api/cdn'

/**
 * Build full CDN URL from a path
 * 
 * @param cdnPath - Path stored in database (e.g., "/recipes/sarma/hero.jpg")
 * @returns Full CDN URL (e.g., "https://cdn.example.com/recipes/sarma/hero.jpg")
 * 
 * @example
 * // In database: imageId = "/recipes/sarma/hero.jpg"
 * // Result: "https://cdn.example.com/recipes/sarma/hero.jpg" or "/api/cdn/recipes/sarma/hero.jpg"
 * getCdnUrl("/recipes/sarma/hero.jpg")
 */
export function getCdnUrl(cdnPath: string): string {
  // Handle paths with or without leading slash
  const normalizedPath = cdnPath.startsWith('/') ? cdnPath : `/${cdnPath}`
  return `${CDN_BASE_URL}${normalizedPath}`
}

/**
 * Get thumbnail URL for recipe cards
 * In a real CDN, this might include transformation parameters
 * 
 * @param cdnPath - Path to the image
 * @returns CDN URL (with optional thumbnail transform query params)
 */
export function getThumbnailUrl(cdnPath: string): string {
  // In production CDN, you might add: ?w=400&h=300&fit=cover
  return getCdnUrl(cdnPath)
}

/**
 * Get hero image URL for recipe detail pages
 * 
 * @param cdnPath - Path to the image
 * @returns CDN URL for hero image
 */
export function getHeroUrl(cdnPath: string): string {
  // In production CDN, you might add: ?w=1200&h=800&fit=cover
  return getCdnUrl(cdnPath)
}

/**
 * Get Open Graph image URL for social sharing
 * 
 * @param cdnPath - Path to the image
 * @returns CDN URL optimized for OG images (1200x630)
 */
export function getOgImageUrl(cdnPath: string): string {
  // In production CDN, you might add: ?w=1200&h=630&fit=cover
  return getCdnUrl(cdnPath)
}

/**
 * Generate CDN path for a recipe image
 * This is what gets stored in the database
 * 
 * @param slug - Recipe slug
 * @param type - Image type (hero, thumbnail, etc.)
 * @returns CDN path to store in database
 */
export function generateImagePath(slug: string, type: 'hero' | 'thumbnail' = 'hero'): string {
  return `/recipes/${slug}/${type}.jpg`
}
