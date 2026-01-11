/**
 * Simple in-memory rate limiter
 * 
 * For production, use Redis or a proper rate limiting service.
 * This is a demonstration of rate limiting concepts.
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up old entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now()
  rateLimitStore.forEach((entry, key) => {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key)
    }
  })
}, 5 * 60 * 1000)

interface RateLimitOptions {
  limit: number      // Max requests
  windowMs: number   // Time window in milliseconds
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

export function rateLimit(
  identifier: string,
  options: RateLimitOptions = { limit: 60, windowMs: 60 * 1000 }
): RateLimitResult {
  const now = Date.now()
  const key = identifier
  
  let entry = rateLimitStore.get(key)
  
  // Create new entry or reset if window expired
  if (!entry || entry.resetTime < now) {
    entry = {
      count: 0,
      resetTime: now + options.windowMs
    }
  }
  
  entry.count++
  rateLimitStore.set(key, entry)
  
  const remaining = Math.max(0, options.limit - entry.count)
  const success = entry.count <= options.limit
  
  return {
    success,
    limit: options.limit,
    remaining,
    reset: entry.resetTime
  }
}

/**
 * Get client identifier from request
 * Uses X-Forwarded-For header (set by proxies/Vercel) or falls back to a default
 */
export function getClientId(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || 'anonymous'
  return ip
}
