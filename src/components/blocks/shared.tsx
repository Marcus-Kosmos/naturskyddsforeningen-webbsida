import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { CmsLink } from '../../lib/cms/CmsLink';
import { CmsImage } from '../../lib/cms/image';
import { getIcon } from '../../lib/cms/icons';
import { isUsableLink } from '../../lib/cms/resolveLink';
import { useSite } from '../../lib/cms/SiteProvider';
import type { BlockBackground, BlockCta, CmsImageData } from '../../lib/cms/types';

// Class strings are written out in full: Tailwind only generates classes it can find as literals.
const BACKGROUNDS: Record<BlockBackground, string> = {
  white: 'bg-white dark:bg-slate-900 reading:bg-white',
  muted: 'bg-transparent dark:bg-slate-800 reading:bg-gray-50',
  soft: 'bg-gray-50 dark:bg-slate-800 reading:bg-white',
  plain: 'bg-transparent',
};

interface SectionShellProps {
  anchor?: string;
  background?: BlockBackground;
  /** Extra classes for the inner container, for example `text-center`. */
  innerClassName?: string;
  /** Reading mode keeps most sections in a narrow column. */
  narrowInReading?: boolean;
  children: ReactNode;
}

/** The outer wrapper every homepage section shares: background, spacing, anchor and fade-in. */
export function SectionShell({
  anchor,
  background = 'white',
  innerClassName = '',
  narrowInReading = true,
  children,
}: SectionShellProps) {
  const { ref, isInView } = useInView<HTMLElement>();
  const narrow = narrowInReading ? 'reading:max-w-3xl reading:mx-auto' : '';

  return (
    <section
      ref={ref}
      id={anchor || undefined}
      className={`scroll-mt-24 py-16 ${BACKGROUNDS[background] ?? BACKGROUNDS.white} ${narrow}`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${innerClassName} ${isInView ? 'animate-fadeInUp' : ''}`}
      >
        {children}
      </div>
    </section>
  );
}

const PILL =
  'inline-block px-3 py-1 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-white reading:border reading:border-gray-900 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 rounded-full';

interface EyebrowProps {
  text?: string;
  icon?: string;
  image?: CmsImageData;
  /** Centre the row, for headers that are centred. */
  center?: boolean;
}

/** The small label above a heading: a pill, optionally with an icon circle and/or a logo beside it. */
export function Eyebrow({ text, icon, image, center }: EyebrowProps) {
  const { fill } = useSite();
  const Icon = getIcon(icon);
  const hasImage = !!image?.asset;

  if (!Icon && !hasImage) {
    return text ? <span className={`${PILL} mb-4`}>{fill(text)}</span> : null;
  }

  return (
    <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center reading:justify-start' : ''}`}>
      {Icon && (
        <div className="w-12 h-12 bg-[#5A7C50] dark:bg-[#6B8E65] reading:bg-gray-900 rounded-full flex items-center justify-center reading:hidden">
          <Icon className="w-6 h-6 text-white" />
        </div>
      )}
      {text && <span className={PILL}>{fill(text)}</span>}
      {hasImage && <CmsImage image={image} alt={image?.alt} width={160} className="h-8 w-auto dark:brightness-110" />}
    </div>
  );
}

/** Editor text split into paragraphs at blank lines; fact tags are filled in. */
export function Paragraphs({ text, className }: { text?: string; className: string }) {
  const { fill } = useSite();
  if (!text) return null;
  return (
    <>
      {fill(text)
        .split(/\n{2,}/)
        .map((paragraph, index) => (
          <p key={index} className={className}>
            {paragraph}
          </p>
        ))}
    </>
  );
}

const LINK_TEXT =
  'inline-flex items-center gap-2 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 hover:underline';
const LINK_PRIMARY =
  'inline-flex items-center gap-2 px-6 py-3 bg-[#5A7C50] dark:bg-[#6B8E65] reading:bg-gray-900 text-white rounded-lg hover:bg-[#4A6741] dark:hover:bg-[#5A7C50] reading:hover:bg-gray-800 transition-colors';
const LINK_SECONDARY =
  'inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 reading:border-gray-900 text-gray-700 dark:text-gray-300 reading:text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 reading:hover:bg-gray-100 transition-colors';

/** Buttons and text links. A link that leads nowhere is left out instead of rendering a dead button. */
export function BlockLinks({ links }: { links?: BlockCta[] }) {
  const { fill } = useSite();
  const usable = (links ?? []).filter((cta) => cta.label && isUsableLink(cta.link));
  if (usable.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-4">
      {usable.map((cta, index) => {
        const style = cta.style ?? 'primary';
        return (
          <CmsLink
            key={cta._key ?? index}
            link={cta.link}
            className={style === 'text' ? LINK_TEXT : style === 'secondary' ? LINK_SECONDARY : LINK_PRIMARY}
          >
            <span>{fill(cta.label)}</span>
            {style !== 'secondary' && <ArrowRight className="w-4 h-4" />}
          </CmsLink>
        );
      })}
    </div>
  );
}
