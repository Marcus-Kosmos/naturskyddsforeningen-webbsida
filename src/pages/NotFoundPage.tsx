import { Home, ArrowRight } from 'lucide-react';
import { CmsLink } from '../lib/cms/CmsLink';
import { useSite } from '../lib/cms/SiteProvider';

export function NotFoundPage() {
  const { notFound } = useSite().settings;

  return (
    <section className="min-h-[60vh] flex items-center justify-center py-20 bg-white dark:bg-slate-900">
      <div className="text-center px-4">
        <div className="text-8xl font-bold text-[#5A7C50]/20 dark:text-[#5A7C50]/30 mb-4">404</div>
        <h1 className="text-gray-900 dark:text-white mb-4">{notFound.heading}</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto mb-8">
          {notFound.text}
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <CmsLink
            link={notFound.primaryCta.link}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5A7C50] text-white rounded-lg hover:bg-[#4A6741] transition-colors"
          >
            <Home className="w-4 h-4" />
            {notFound.primaryCta.label}
          </CmsLink>
          <CmsLink
            link={notFound.secondaryCta.link}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
          >
            {notFound.secondaryCta.label} <ArrowRight className="w-4 h-4" />
          </CmsLink>
        </div>
      </div>
    </section>
  );
}
