import { urlFor } from '../sanityClient'
import type { CmsImageData } from './types'

/** For images that fill the article column (max 768px wide, minus 16px padding on each side on phones). */
export const ARTICLE_IMAGE_SIZES = '(min-width: 768px) 720px, calc(100vw - 32px)'

// Widths offered to the browser when `sizes` is given.
const SRCSET_WIDTHS = [320, 480, 640, 768, 960, 1200, 1600]

interface CmsImageProps {
  image?: CmsImageData | null
  alt?: string
  /** Largest rendered width in CSS pixels; also the width of the default `src`. */
  width: number
  /** If given, the image is cropped to this aspect ratio (respecting the editor's hotspot). */
  height?: number
  /**
   * How wide the image is laid out, as an HTML `sizes` string. With it the browser picks the
   * smallest candidate that fits (phones get small files). Without it the srcset is just 1x and 2x,
   * which suits fixed-size thumbnails.
   */
  sizes?: string
  className?: string
  loading?: 'lazy' | 'eager'
}

/**
 * The height that goes with `width` for the image as the editor framed it. The asset id
 * encodes the pixel size ("image-<hash>-2000x1472-jpg"); the crop trims it. Giving the <img>
 * a height reserves its space before it loads, so the text below doesn't jump.
 */
function naturalHeight(image: CmsImageData, width: number): number | undefined {
  const match = /-(\d+)x(\d+)-[a-z0-9]+$/i.exec(image.asset?._ref ?? '')
  if (!match) return undefined
  const crop = image.crop
  const w = Number(match[1]) * (1 - (crop?.left ?? 0) - (crop?.right ?? 0))
  const h = Number(match[2]) * (1 - (crop?.top ?? 0) - (crop?.bottom ?? 0))
  return w > 0 && h > 0 ? Math.round((width * h) / w) : undefined
}

/** A Sanity image with responsive srcset, automatic format and the editor's hotspot/crop. */
export function CmsImage({ image, alt = '', width, height, sizes, className, loading = 'lazy' }: CmsImageProps) {
  if (!image?.asset) return null

  const build = (w: number) => {
    let builder = urlFor(image).width(w).auto('format')
    if (height) builder = builder.height(Math.round((height * w) / width)).fit('crop')
    return builder.url()
  }

  const candidates = sizes
    ? [...new Set([...SRCSET_WIDTHS.filter((w) => w <= width * 2), width, width * 2])].sort((a, b) => a - b)
    : []
  const srcSet = sizes
    ? candidates.map((w) => `${build(w)} ${w}w`).join(', ')
    : `${build(width)} 1x, ${build(width * 2)} 2x`

  return (
    <img
      src={build(width)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height ?? naturalHeight(image, width)}
      loading={loading}
      className={className}
    />
  )
}
