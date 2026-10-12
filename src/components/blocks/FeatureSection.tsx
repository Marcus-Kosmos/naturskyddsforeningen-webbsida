import { Calendar, MapPin } from 'lucide-react';
import { CmsImage } from '../../lib/cms/image';
import { CmsLink } from '../../lib/cms/CmsLink';
import { formatDayMonth } from '../../lib/cms/format';
import { getIcon } from '../../lib/cms/icons';
import { UPCOMING_LOCAL_EVENTS_QUERY } from '../../lib/cms/queries';
import { useSite } from '../../lib/cms/SiteProvider';
import type { EventItem, FeatureBlock, FeatureItemData } from '../../lib/cms/types';
import { useSanityQuery } from '../../lib/cms/useSanityQuery';
import { ShareButtons } from '../ShareButtons';
import { MediaCarousel } from './MediaCarousel';
import { BlockLinks, Eyebrow, Paragraphs, SectionShell } from './shared';

const ICON_TILE =
  'flex-shrink-0 w-10 h-10 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-transparent rounded-lg flex items-center justify-center reading:hidden';
const ITEM_TITLE = 'text-gray-900 dark:text-white reading:text-gray-900 mb-1';
const ITEM_TEXT = 'text-gray-600 dark:text-gray-400 reading:text-gray-700';

// Where the text and the picture go when side by side. On small screens the text comes
// first unless the editor asks for the picture first.
const SPLIT_ORDER = {
  'right-text': { content: '', media: '' },
  'right-media': { content: 'order-2 lg:order-1', media: 'order-1 lg:order-2' },
  'left-text': { content: 'order-1 lg:order-2', media: 'order-2 lg:order-1' },
  'left-media': { content: 'order-2', media: 'order-1' },
};

function ItemIcon({ icon }: { icon?: string }) {
  const Icon = getIcon(icon);
  if (!Icon) return null;
  return (
    <div className={ICON_TILE}>
      <Icon className="w-5 h-5 text-[#4A6741] dark:text-[#B8D4B0]" />
    </div>
  );
}

function ItemBody({ item }: { item: FeatureItemData }) {
  const { fill } = useSite();
  return (
    <div>
      {item.title && <h4 className={ITEM_TITLE}>{fill(item.title)}</h4>}
      {item.text && <p className={ITEM_TEXT}>{fill(item.text)}</p>}
    </div>
  );
}

function Items({ items, style }: { items: FeatureItemData[]; style: NonNullable<FeatureBlock['itemsStyle']> }) {
  const { fill } = useSite();

  if (style === 'bullets') {
    return (
      <div className="space-y-3 mb-8">
        {items.map((item, index) => (
          <div key={item._key ?? index} className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#4A6741] dark:bg-[#8FA888] reading:bg-gray-900 rounded-full mt-2 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300 reading:text-gray-700">{fill(item.text || item.title)}</p>
          </div>
        ))}
      </div>
    );
  }

  if (style === 'tiles') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {items.map((item, index) => (
          <div
            key={item._key ?? index}
            className="flex gap-3 items-start p-4 bg-gray-50 dark:bg-gray-800 reading:bg-gray-50 rounded-lg"
          >
            <ItemIcon icon={item.icon} />
            <ItemBody item={item} />
          </div>
        ))}
      </div>
    );
  }

  const row = style === 'cards' ? 'p-4 bg-white dark:bg-gray-900 reading:bg-white rounded-lg reading:rounded-none' : '';
  return (
    <div className="space-y-4 mb-8">
      {items.map((item, index) => (
        <div key={item._key ?? index} className={`flex gap-4 items-start ${row}`}>
          <ItemIcon icon={item.icon} />
          <ItemBody item={item} />
        </div>
      ))}
    </div>
  );
}

function UpcomingEvents({ heading }: { heading?: string }) {
  const { fill } = useSite();
  const { data, loading, error } = useSanityQuery<EventItem[]>(UPCOMING_LOCAL_EVENTS_QUERY, { count: 3 });
  const events = data ?? [];

  return (
    <div className="mb-8">
      {heading && <h3 className="text-gray-900 dark:text-white reading:text-gray-900 mb-4">{fill(heading)}</h3>}
      <div className="space-y-3">
        {events.map((event) => (
          <CmsLink
            key={event._id}
            link={event.link}
            className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 reading:bg-gray-50 rounded-lg hover:shadow-md reading:hover:shadow-none transition-all border border-transparent hover:border-[#8FA888]/30 reading:hover:border-gray-300"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-transparent rounded-lg flex items-center justify-center reading:hidden">
                <Calendar className="w-5 h-5 text-[#4A6741] dark:text-[#B8D4B0]" />
              </div>
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-gray-900 dark:text-white reading:text-gray-900">{event.title}</h4>
                {event.type && (
                  <span className="px-2 py-0.5 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-transparent reading:border reading:border-gray-900 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 rounded text-xs">
                    {event.type}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 reading:text-gray-600">
                <span>{formatDayMonth(event.startDate)}</span>
                {event.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </span>
                )}
              </div>
            </div>
          </CmsLink>
        ))}
        {!loading && events.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            {error ? 'Det gick inte att hämta aktiviteterna just nu.' : 'Inga kommande aktiviteter just nu.'}
          </p>
        )}
      </div>
    </div>
  );
}

function Share({ block }: { block: FeatureBlock }) {
  const { fill } = useSite();
  // Share this section when it has an anchor, otherwise the page.
  const url = block.anchor ? `${window.location.origin}${window.location.pathname}#${block.anchor}` : undefined;
  return (
    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700 reading:border-gray-300">
      <ShareButtons
        title={`${fill(block.heading)} – Naturskyddsföreningen`}
        description={fill(block.body?.split(/\n{2,}/)[0])}
        url={url}
      />
    </div>
  );
}

/** The workhorse homepage section: heading and text with a picture, points, buttons and more. */
export function FeatureSection({ block }: { block: FeatureBlock }) {
  const { fill } = useSite();
  const images = (block.images ?? []).filter((image) => image?.asset);
  const items = (block.items ?? []).filter((item) => item.title || item.text);

  if (block.layout === 'stacked') {
    const stats = block.stats ?? [];
    const hasPanel = items.length > 0 || (block.links ?? []).length > 0 || block.showShare;

    return (
      <SectionShell anchor={block.anchor} background={block.background}>
        <div className="text-center mb-12 reading:text-left">
          <Eyebrow text={block.eyebrow} icon={block.eyebrowIcon} image={block.eyebrowImage} />
          <h2 className="mb-4 text-gray-900 dark:text-white reading:text-gray-900">{fill(block.heading)}</h2>
          <Paragraphs
            text={block.body}
            className="text-gray-600 dark:text-gray-400 reading:text-gray-700 max-w-3xl mx-auto reading:mx-0"
          />
        </div>

        {images.length > 0 && (
          <div className="mb-12">
            <Media images={images} sizes="(min-width: 1280px) 1216px, 100vw" />
          </div>
        )}

        {stats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={stat._key ?? index}
                className="text-center reading:text-left p-6 bg-white dark:bg-gray-900 reading:bg-white rounded-xl reading:rounded-none"
              >
                <div className="text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 mb-2">{fill(stat.value)}</div>
                <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700">{fill(stat.label)}</p>
              </div>
            ))}
          </div>
        )}

        {hasPanel && (
          <div className="bg-white dark:bg-gray-900 reading:bg-white rounded-2xl reading:rounded-none p-8 reading:p-6">
            {block.itemsHeading && (
              <h3 className="mb-6 text-gray-900 dark:text-white reading:text-gray-900">{fill(block.itemsHeading)}</h3>
            )}
            {items.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 reading:grid-cols-1 gap-6 mb-8">
                {items.map((item, index) => (
                  <div key={item._key ?? index} className="flex gap-3">
                    <ItemIcon icon={item.icon} />
                    <ItemBody item={item} />
                  </div>
                ))}
              </div>
            )}
            <BlockLinks links={block.links} />
            {block.showShare && <Share block={block} />}
          </div>
        )}
      </SectionShell>
    );
  }

  const order =
    SPLIT_ORDER[`${block.mediaSide === 'left' ? 'left' : 'right'}-${block.mediaFirstOnMobile ? 'media' : 'text'}`];

  return (
    <SectionShell anchor={block.anchor} background={block.background}>
      <div className="grid grid-cols-1 lg:grid-cols-2 reading:grid-cols-1 gap-12 items-center">
        <div className={order.content}>
          <Eyebrow text={block.eyebrow} icon={block.eyebrowIcon} image={block.eyebrowImage} />
          <h2 className="mb-4 text-gray-900 dark:text-white reading:text-gray-900">{fill(block.heading)}</h2>
          <Paragraphs text={block.body} className="text-gray-600 dark:text-gray-400 reading:text-gray-700 mb-6" />
          {items.length > 0 && <Items items={items} style={block.itemsStyle ?? 'list'} />}
          {block.showEvents && <UpcomingEvents heading={block.eventsHeading} />}
          <BlockLinks links={block.links} />
          {block.showShare && <Share block={block} />}
        </div>

        {images.length > 0 && (
          <div className={order.media}>
            <Media images={images} sizes="(min-width: 1280px) 600px, (min-width: 1024px) 45vw, 100vw" />
          </div>
        )}
      </div>
    </SectionShell>
  );
}

/** One picture is shown as it is; several become a slideshow. */
function Media({ images, sizes }: { images: NonNullable<FeatureBlock['images']>; sizes: string }) {
  if (images.length > 1) return <MediaCarousel slides={images} sizes={sizes} />;

  const [image] = images;
  return (
    <figure>
      <CmsImage
        image={image}
        alt={image.alt}
        width={1080}
        sizes={sizes}
        className="rounded-2xl shadow-lg w-full reading:rounded-none reading:shadow-none"
      />
      {image.caption && (
        <figcaption className="text-gray-500 dark:text-gray-400 reading:text-gray-600 mt-2 italic">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
