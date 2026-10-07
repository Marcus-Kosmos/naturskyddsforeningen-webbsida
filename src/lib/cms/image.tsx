import { urlFor } from '../sanityClient'
import type { CmsImageData } from './types'

interface CmsImageProps {
  image?: CmsImageData | null
  alt?: string
  /** Rendered width in CSS pixels; a 2x version is added to the srcset. */
  width: number
  /** If given, the image is cropped to this aspect ratio (respecting the editor's hotspot). */
  height?: number
  sizes?: string
  className?: string
  loading?: 'lazy' | 'eager'
}

/** A Sanity image with responsive srcset, automatic format and the editor's hotspot/crop. */
export function CmsImage({ image, alt = '', width, height, sizes, className, loading = 'lazy' }: CmsImageProps) {
  if (!image?.asset) return null

  const build = (w: number) => {
    let builder = urlFor(image).width(w).auto('format')
    if (height) builder = builder.height(Math.round((height * w) / width)).fit('crop')
    return builder.url()
  }

  return (
    <img
      src={build(width)}
      srcSet={`${build(width)} 1x, ${build(width * 2)} 2x`}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={className}
    />
  )
}
