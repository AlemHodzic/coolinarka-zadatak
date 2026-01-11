import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('CDN URL Builder', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('getCdnUrl', () => {
    it('uses default /cdn base URL when env not set', async () => {
      delete process.env.NEXT_PUBLIC_CDN_BASE_URL
      const { getCdnUrl } = await import('@/lib/cdn')
      
      expect(getCdnUrl('/recipes/sarma/hero.jpg')).toBe('/cdn/recipes/sarma/hero.jpg')
    })

    it('uses custom CDN_BASE_URL from environment', async () => {
      process.env.NEXT_PUBLIC_CDN_BASE_URL = 'https://cdn.example.com'
      const { getCdnUrl } = await import('@/lib/cdn')
      
      expect(getCdnUrl('/recipes/sarma/hero.jpg')).toBe('https://cdn.example.com/recipes/sarma/hero.jpg')
    })

    it('handles paths without leading slash', async () => {
      delete process.env.NEXT_PUBLIC_CDN_BASE_URL
      const { getCdnUrl } = await import('@/lib/cdn')
      
      expect(getCdnUrl('recipes/sarma/hero.jpg')).toBe('/cdn/recipes/sarma/hero.jpg')
    })

    it('handles paths with leading slash', async () => {
      delete process.env.NEXT_PUBLIC_CDN_BASE_URL
      const { getCdnUrl } = await import('@/lib/cdn')
      
      expect(getCdnUrl('/recipes/sarma/hero.jpg')).toBe('/cdn/recipes/sarma/hero.jpg')
    })
  })

  describe('generateImagePath', () => {
    it('generates hero image path by default', async () => {
      const { generateImagePath } = await import('@/lib/cdn')
      
      expect(generateImagePath('sarma')).toBe('/recipes/sarma/hero.jpg')
    })

    it('generates thumbnail path when specified', async () => {
      const { generateImagePath } = await import('@/lib/cdn')
      
      expect(generateImagePath('sarma', 'thumbnail')).toBe('/recipes/sarma/thumbnail.jpg')
    })

    it('works with various slug formats', async () => {
      const { generateImagePath } = await import('@/lib/cdn')
      
      expect(generateImagePath('cokoladna-torta')).toBe('/recipes/cokoladna-torta/hero.jpg')
      expect(generateImagePath('juha-od-rajcice')).toBe('/recipes/juha-od-rajcice/hero.jpg')
    })
  })

  describe('URL helper functions', () => {
    it('getThumbnailUrl builds correct URL', async () => {
      delete process.env.NEXT_PUBLIC_CDN_BASE_URL
      const { getThumbnailUrl } = await import('@/lib/cdn')
      
      expect(getThumbnailUrl('/recipes/sarma/hero.jpg')).toBe('/cdn/recipes/sarma/hero.jpg')
    })

    it('getHeroUrl builds correct URL', async () => {
      delete process.env.NEXT_PUBLIC_CDN_BASE_URL
      const { getHeroUrl } = await import('@/lib/cdn')
      
      expect(getHeroUrl('/recipes/sarma/hero.jpg')).toBe('/cdn/recipes/sarma/hero.jpg')
    })

    it('getOgImageUrl builds correct URL', async () => {
      delete process.env.NEXT_PUBLIC_CDN_BASE_URL
      const { getOgImageUrl } = await import('@/lib/cdn')
      
      expect(getOgImageUrl('/recipes/sarma/hero.jpg')).toBe('/cdn/recipes/sarma/hero.jpg')
    })
  })
})
