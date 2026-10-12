import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { CmsImage } from '../lib/cms/image';
import { CmsLink } from '../lib/cms/CmsLink';
import { formatDate, formatShortDate } from '../lib/cms/format';
import { LATEST_ARTICLES_QUERY, UPCOMING_EVENTS_QUERY } from '../lib/cms/queries';
import type { ArticleCard, EventItem } from '../lib/cms/types';
import { useSanityQuery } from '../lib/cms/useSanityQuery';

export function NewsSection() {
  const { ref, isInView } = useInView();
  const { data: news, loading: newsLoading, error: newsError } = useSanityQuery<ArticleCard[]>(LATEST_ARTICLES_QUERY);
  const { data: events, loading: eventsLoading, error: eventsError } = useSanityQuery<EventItem[]>(UPCOMING_EVENTS_QUERY);

  return (
    <section ref={ref} className="py-16 bg-white dark:bg-slate-900 reading:bg-white reading:max-w-3xl reading:mx-auto">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isInView ? 'animate-fadeInUp' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 reading:grid-cols-1 gap-8">
          {/* News Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900 dark:text-white reading:text-gray-900">Just nu</h2>
              <Link
                to="/nyheter"
                className="text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 hover:underline flex items-center gap-1"
              >
                <span>Se alla</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {(news ?? []).map((item) => (
                <Link
                  key={item._id}
                  to={`/nyheter/${item.slug}`}
                  className="group flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 reading:bg-white reading:border-l-4 reading:border-gray-900 rounded-lg hover:shadow-md transition-all border border-transparent hover:border-green-200 dark:hover:border-green-800 reading:hover:border-gray-300 reading:shadow-none"
                >
                  <div className="flex-shrink-0 w-32 h-24 bg-gradient-to-br from-green-500 to-green-700 dark:from-green-700 dark:to-green-900 reading:from-gray-300 reading:to-gray-400 rounded-lg overflow-hidden reading:hidden">
                    <CmsImage
                      image={item.mainImage}
                      alt=""
                      width={128}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 reading:bg-transparent reading:border reading:border-gray-900 text-green-700 dark:text-green-400 reading:text-gray-900 rounded text-xs mb-2">
                      {item.category}
                    </span>
                    <h3 className="mb-1 text-gray-900 dark:text-white reading:text-gray-900 group-hover:text-green-600 dark:group-hover:text-green-400 reading:group-hover:text-gray-900 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 reading:text-gray-600">
                      {formatDate(item.publishedAt)}
                    </p>
                  </div>
                </Link>
              ))}
              {!newsLoading && (news ?? []).length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">
                  {newsError ? 'Det gick inte att hämta nyheterna just nu.' : 'Inga nyheter just nu.'}
                </p>
              )}
            </div>
          </div>

          {/* Events Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900 dark:text-white reading:text-gray-900">Kalendarium</h2>
            </div>
            <div className="space-y-3">
              {(events ?? []).map((event) => (
                <CmsLink
                  key={event._id}
                  link={event.link}
                  className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-800 reading:bg-white reading:border-l-4 reading:border-gray-900 rounded-lg hover:shadow-md transition-all border border-transparent hover:border-[#8FA888]/30 dark:hover:border-[#6B8E65]/30 reading:hover:border-gray-300 reading:shadow-none"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-transparent rounded-lg flex flex-col items-center justify-center reading:hidden">
                    <Calendar className="w-5 h-5 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 dark:text-white reading:text-gray-900 mb-1">
                      {event.title}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 reading:text-gray-600">
                      {[formatShortDate(event.startDate), event.location].filter(Boolean).join(' • ')}
                    </p>
                  </div>
                </CmsLink>
              ))}
              {!eventsLoading && (events ?? []).length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">
                  {eventsError ? 'Det gick inte att hämta kalendern just nu.' : 'Inga kommande aktiviteter just nu.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
