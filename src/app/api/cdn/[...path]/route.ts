import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

/**
 * Fake CDN Route Handler
 * 
 * Simulates a CDN by serving static files from /public/cdn/ with proper cache headers.
 * In production, this would be handled by a real CDN (e.g., Cloudflare, CloudFront, Akamai).
 * 
 * Features demonstrated:
 * - Cache-Control headers for browser and CDN caching
 * - Proper MIME type detection
 * - ETag support for cache validation
 * - Immutable flag for versioned assets
 */

type RouteParams = {
  params: Promise<{ path: string[] }>
}

// MIME types for common image formats
const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { path } = await params
  const filePath = path.join('/')
  
  // Construct the full file path
  const fullPath = join(process.cwd(), 'public', 'cdn', filePath)
  
  // Security: Prevent directory traversal
  if (!fullPath.startsWith(join(process.cwd(), 'public', 'cdn'))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  // Check if file exists
  if (!existsSync(fullPath)) {
    return NextResponse.json(
      { error: 'File not found', path: filePath },
      { status: 404 }
    )
  }
  
  try {
    // Read the file
    const fileBuffer = await readFile(fullPath)
    
    // Determine MIME type from extension
    const ext = '.' + filePath.split('.').pop()?.toLowerCase()
    const contentType = MIME_TYPES[ext] || 'application/octet-stream'
    
    // Generate ETag from file content (simple hash)
    const etag = `"${Buffer.from(fileBuffer).length}-${Date.now().toString(36)}"`
    
    // Check If-None-Match for cache validation
    const ifNoneMatch = request.headers.get('if-none-match')
    if (ifNoneMatch === etag) {
      return new NextResponse(null, { status: 304 })
    }
    
    // Return file with CDN-appropriate cache headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileBuffer.length.toString(),
        
        // Cache-Control: Key CDN header
        // - public: Can be cached by CDN and browsers
        // - max-age=31536000: Cache for 1 year (immutable assets)
        // - s-maxage=31536000: CDN-specific cache duration
        // - immutable: Asset won't change (good for versioned files)
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
        
        // ETag for cache validation
        'ETag': etag,
        
        // Vary header for proper CDN behavior
        'Vary': 'Accept-Encoding',
        
        // CDN debug headers (would be removed in production)
        'X-CDN-Cache': 'SIMULATED',
        'X-CDN-Path': filePath,
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to serve file' },
      { status: 500 }
    )
  }
}
