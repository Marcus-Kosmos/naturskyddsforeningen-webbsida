import { ArrowRight } from 'lucide-react';
import { CmsLink } from '../../lib/cms/CmsLink';
import { CmsImage } from '../../lib/cms/image';
import { getIcon } from '../../lib/cms/icons';
import { isUsableLink } from '../../lib/cms/resolveLink';
import { useSite } from '../../lib/cms/SiteProvider';
import type { CardData, CardGridBlock } from '../../lib/cms/types';
import { Eyebrow, Paragraphs, SectionShell } from './shared';

const TONES = {
  green: {
    tile: 'bg-[#8FA888]/20 dark:bg-[#5A7C50]/20 reading:bg-transparent',
    icon: 'text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900',
  },
  neutral: {
    tile: 'bg-gray-100 dark:bg-gray-700/30 reading:bg-transparent',
    icon: 'text-gray-700 dark:text-gray-300 reading:text-gray-900',
  },
};

const ICON_CARD =
  'group block p-6 bg-white dark:bg-slate-700 rounded-xl shadow-sm transition-all duration-300 reading:shadow-none reading:border reading:border-gray-300';
const ICON_CARD_LINK = 'hover:shadow-xl hover:-translate-y-1';

const LOGO_CARD =
  'group block p-8 bg-white dark:bg-gray-900 reading:bg-white rounded-xl reading:rounded-none border border-gray-200 dark:border-gray-700 reading:border-gray-300 transition-all';
const LOGO_CARD_LINK = 'hover:shadow-lg reading:hover:shadow-none';

function IconCard({ card }: { card: CardData }) {
  const { fill } = useSite();
  const Icon = getIcon(card.icon);
  const tone = TONES[card.tone === 'neutral' ? 'neutral' : 'green'];
  const linked = isUsableLink(card.link);

  return (
    <CmsLink link={card.link} className={`${ICON_CARD} ${linked ? ICON_CARD_LINK : ''}`}>
      {Icon && (
        <div className={`w-12 h-12 ${tone.tile} rounded-lg flex items-center justify-center mb-4 reading:hidden`}>
          <Icon className={`w-6 h-6 ${tone.icon}`} />
        </div>
      )}
      <h3 className="mb-2 text-gray-900 dark:text-white reading:text-gray-900">{fill(card.title)}</h3>
      {card.text && <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700">{fill(card.text)}</p>}
    </CmsLink>
  );
}

function LogoCard({ card }: { card: CardData }) {
  const { fill } = useSite();
  const linked = isUsableLink(card.link);
  const light = card.logoLight?.asset ? card.logoLight : card.logoDark;
  const dark = card.logoDark?.asset ? card.logoDark : card.logoLight;

  return (
    <CmsLink link={card.link} className={`${LOGO_CARD} ${linked ? LOGO_CARD_LINK : ''}`}>
      <div className="flex items-center justify-center mb-6 h-16">
        <CmsImage
          image={light}
          alt={card.title}
          width={240}
          className="max-h-16 w-auto object-contain dark:hidden"
        />
        <CmsImage
          image={dark}
          alt={card.title}
          width={240}
          className="max-h-16 w-auto object-contain hidden dark:block"
        />
      </div>
      <h3 className="text-center text-gray-900 dark:text-white reading:text-gray-900 mb-3">{fill(card.title)}</h3>
      {card.text && (
        <p className="text-center text-gray-600 dark:text-gray-400 reading:text-gray-700 mb-4">{fill(card.text)}</p>
      )}
      {linked && (
        <div className="flex items-center justify-center text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 group-hover:underline">
          <span>{fill(card.linkLabel) || 'Läs mer'}</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      )}
    </CmsLink>
  );
}

/** A row of cards: shortcuts with an icon, or partners with a logo. */
export function CardGridSection({ block }: { block: CardGridBlock }) {
  const { fill } = useSite();
  const cards = block.cards ?? [];
  const logos = block.variant === 'logos';
  const hasHeader = !!(block.eyebrow || block.heading || block.body);

  return (
    <SectionShell
      anchor={block.anchor}
      background={block.background}
      innerClassName={logos ? 'text-center' : ''}
    >
      {hasHeader && (
        <div className="text-center reading:text-left mb-12">
          <Eyebrow text={block.eyebrow} />
          {block.heading && (
            <h2 className="mb-4 text-gray-900 dark:text-white reading:text-gray-900">{fill(block.heading)}</h2>
          )}
          <Paragraphs
            text={block.body}
            className="text-gray-600 dark:text-gray-400 reading:text-gray-700 max-w-3xl mx-auto reading:mx-0"
          />
        </div>
      )}

      {logos ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {cards.map((card, index) => (
            <LogoCard key={card._key ?? index} card={card} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <IconCard key={card._key ?? index} card={card} />
          ))}
        </div>
      )}
    </SectionShell>
  );
}
