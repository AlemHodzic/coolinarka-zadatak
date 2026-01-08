const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''

interface ImageOptions {
  width: number
  height: number
  crop?: 'fill' | 'fit' | 'scale' | 'thumb'
}

// Placeholder images from Unsplash for each recipe (when Cloudinary is not configured)
const PLACEHOLDER_IMAGES: Record<string, string> = {
  'recepti/sarma': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
  'recepti/cevapi': 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80',
  'recepti/burek': 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&q=80',
  'recepti/palacinke': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
  'recepti/cokoladna-torta': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
  'recepti/bosanski-lonac': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
  'recepti/juha-od-rajcice': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
  'recepti/shopska-salata': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80',
}

const DEFAULT_PLACEHOLDER = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80'

export function getImageUrl(imageId: string, options: ImageOptions): string {
  // If Cloudinary is not configured, use placeholder images
  if (!CLOUD_NAME) {
    return PLACEHOLDER_IMAGES[imageId] || DEFAULT_PLACEHOLDER
  }

  const { width, height, crop = 'fill' } = options
  const transforms = `w_${width},h_${height},c_${crop},f_auto,q_auto`
  
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${imageId}`
}

export function getThumbnailUrl(imageId: string): string {
  return getImageUrl(imageId, { width: 400, height: 300 })
}

export function getHeroUrl(imageId: string): string {
  return getImageUrl(imageId, { width: 1200, height: 800 })
}

export function getOgImageUrl(imageId: string): string {
  return getImageUrl(imageId, { width: 1200, height: 630 })
}
