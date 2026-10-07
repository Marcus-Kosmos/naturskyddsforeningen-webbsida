import { Check, ArrowRight } from 'lucide-react';
import { CmsLink } from '../lib/cms/CmsLink';
import { useSite } from '../lib/cms/SiteProvider';

export function MembershipCTA() {
  const { settings, fill } = useSite();
  const { heading, text, benefits, primaryCta, secondaryCta, stats } = settings.membershipCta;

  return (
    <section className="py-16 bg-gradient-to-br from-[#5A7C50] to-[#4A6741] dark:from-gray-900 dark:to-gray-800 reading:from-gray-800 reading:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-white mb-4">
              {fill(heading)}
            </h2>
            <p className="text-white/90 mb-6">
              {fill(text)}
            </p>
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90">{fill(benefit)}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <CmsLink link={primaryCta.link} className="flex items-center gap-2 px-6 py-3 bg-white text-[#4A6741] dark:text-[#5A7C50] reading:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                <span>{fill(primaryCta.label)}</span>
                <ArrowRight className="w-5 h-5" />
              </CmsLink>
              <CmsLink link={secondaryCta.link} className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg hover:bg-white/20 transition-colors">
                {fill(secondaryCta.label)}
              </CmsLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={stat._key ?? index} className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-white mb-2">{fill(stat.value)}</div>
                <p className="text-white/80">{fill(stat.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
