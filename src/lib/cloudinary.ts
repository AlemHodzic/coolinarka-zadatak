const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''

interface ImageOptions {
  width: number
  height: number
  crop?: 'fill' | 'fit' | 'scale' | 'thumb'
}

export function getImageUrl(imageId: string, options: ImageOptions): string {
  if (!CLOUD_NAME) {
    console.warn('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set')
    return `/placeholder.jpg`
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

