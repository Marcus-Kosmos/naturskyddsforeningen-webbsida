import { getIcon } from '../../lib/cms/icons';
import { useSite } from '../../lib/cms/SiteProvider';
import type { StatsBlock } from '../../lib/cms/types';
import { AnimatedNumber } from './AnimatedNumber';
import { Paragraphs, SectionShell } from './shared';

/** A heading and a row of result cards whose numbers count up. */
export function StatsSection({ block }: { block: StatsBlock }) {
  const { fill } = useSite();

  return (
    <SectionShell anchor={block.anchor} background={block.background ?? 'plain'} narrowInReading={false}>
      <div className="text-center mb-12">
        <h2 className="text-gray-900 dark:text-white reading:text-gray-900 mb-4">{fill(block.heading)}</h2>
        <Paragraphs
          text={block.body}
          className="text-gray-600 dark:text-gray-400 reading:text-gray-700 max-w-2xl mx-auto"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {(block.stats ?? []).map((stat, index) => {
          const Icon = getIcon(stat.icon);
          return (
            <div
              key={stat._key ?? index}
              className="bg-white dark:bg-slate-800 reading:bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
            >
              {Icon && (
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#5A7C50] dark:bg-[#6B8E65] reading:bg-[#5A7C50] rounded-full mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
              )}
              <div className="text-4xl text-[#5A7C50] dark:text-[#8FA888] reading:text-[#5A7C50] mb-2">
                <AnimatedNumber value={fill(stat.value)} />
              </div>
              <h3 className="text-gray-900 dark:text-white reading:text-gray-900 mb-2">{fill(stat.label)}</h3>
              {stat.description && (
                <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700">{fill(stat.description)}</p>
              )}
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
