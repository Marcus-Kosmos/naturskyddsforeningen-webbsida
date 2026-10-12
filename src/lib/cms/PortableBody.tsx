import { PortableText, type PortableTextComponents, type PortableTextProps } from '@portabletext/react'
import { Link } from 'react-router-dom'
import { ARTICLE_IMAGE_SIZES, CmsImage } from './image'

// Marks and blocks mirror studio/schemaTypes/article.ts (body field).

function MarkLink({ value, children }: { value?: { href?: string; blank?: boolean }; children?: React.ReactNode }) {
  const href = value?.href?.trim() ?? ''
  const className = 'text-[#4A6741] dark:text-[#8FA888] underline underline-offset-2 hover:text-[#5A7C50]'

  // Same rules as CmsLink: site paths or plain web/mail links only.
  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    )
  }
  if (/^(https?:|mailto:)/i.test(href)) {
    return (
      <a
        href={href}
        className={className}
        {...(value?.blank ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }
  return <>{children}</>
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-lg leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-gray-900 dark:text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-gray-900 dark:text-white">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-gray-900 dark:text-white">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-[#5A7C50] pl-6 text-xl italic leading-relaxed text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 list-disc space-y-2 pl-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 list-decimal space-y-2 pl-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">{children}</ol>
    ),
  },
  marks: {
    link: MarkLink,
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.9em] dark:bg-slate-800">{children}</code>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-8">
        <CmsImage
          image={value}
          alt={value?.alt ?? ''}
          width={768}
          sizes={ARTICLE_IMAGE_SIZES}
          className="w-full rounded-xl"
        />
        {value?.caption && (
          <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400">{value.caption}</figcaption>
        )}
      </figure>
    ),
    callout: ({ value }) => (
      // Not a heading: it would skip levels in articles that have no h2 before it.
      <div role="note" className="my-8 rounded-xl border border-[#5A7C50]/30 bg-[#5A7C50]/10 p-6 dark:bg-[#5A7C50]/20">
        {value?.heading && (
          <div className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{value.heading}</div>
        )}
        {value?.text && <p className="mb-0 whitespace-pre-line text-gray-700 dark:text-gray-300">{value.text}</p>}
      </div>
    ),
  },
}

export function PortableBody({ value }: { value: PortableTextProps['value'] }) {
  return <PortableText value={value} components={components} />
}
