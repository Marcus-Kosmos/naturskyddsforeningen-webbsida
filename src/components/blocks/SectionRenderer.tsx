import { LabelingGuideSection } from '../LabelingGuideSection';
import type { HomeBlock } from '../../lib/cms/types';
import { CardGridSection } from './CardGridSection';
import { FeatureSection } from './FeatureSection';
import { NewsEventsSection } from './NewsEventsSection';
import { StatsSection } from './StatsSection';

/** Renders the homepage sections in the order the editor arranged them in Studio. */
export function SectionRenderer({ sections }: { sections: HomeBlock[] }) {
  return (
    <>
      {sections.map((block) => {
        switch (block._type) {
          case 'featureSection':
            return <FeatureSection key={block._key} block={block} />;
          case 'cardGridSection':
            return <CardGridSection key={block._key} block={block} />;
          case 'statsSection':
            return <StatsSection key={block._key} block={block} />;
          case 'labelGuideSection':
            return <LabelingGuideSection key={block._key} block={block} />;
          case 'newsEventsSection':
            return <NewsEventsSection key={block._key} block={block} />;
          default:
            // A section type this version of the site doesn't know yet: skip it rather than break the page.
            return null;
        }
      })}
    </>
  );
}
