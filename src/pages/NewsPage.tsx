import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, Tag, ArrowRight, Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { MembershipCTA } from '../components/MembershipCTA';
import { CmsImage } from '../lib/cms/image';
import { formatDate } from '../lib/cms/format';
import { ARTICLES_QUERY } from '../lib/cms/queries';
import type { ArticleCard } from '../lib/cms/types';
import { useSanityQuery } from '../lib/cms/useSanityQuery';
import { usePageMeta } from '../lib/cms/usePageMeta';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } }),
};

// The card clips its children (overflow-hidden), so the keyboard focus ring is drawn inside the edge.
// The "!" is needed: the global *:focus-visible rule isn't in a CSS layer, so it beats plain utilities.
const CARD_LINK = 'block rounded-2xl focus-visible:outline-offset-[-3px]!';

// Display order for the filter chips; only categories that have articles are shown.
// Keep in sync with the category list in studio/schemaTypes/article.ts.
const CATEGORY_ORDER = ['Klimat', 'Biologisk mångfald', 'Hav och vatten', 'Skog', 'Politik', 'Kampanj'];

function ArticleImage({
  article,
  width,
  height,
  sizes,
}: {
  article: ArticleCard;
  width: number;
  height: number;
  sizes: string;
}) {
  if (!article.mainImage?.asset) {
    return <div className="w-full h-full bg-gradient-to-br from-[#5A7C50] to-[#4A6741]" aria-hidden="true" />;
  }
  return (
    <CmsImage
      image={article.mainImage}
      alt={article.mainImage.alt ?? article.title}
      width={width}
      height={height}
      sizes={sizes}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  );
}

export function NewsPage() {
  // Filter and search live in the URL, so Back from an article returns to the same view.
  const [params, setParams] = useSearchParams();
  const searchQuery = params.get('q') ?? '';
  const { data, loading, error } = useSanityQuery<ArticleCard[]>(ARTICLES_QUERY);
  const articles = data ?? [];

  usePageMeta({
    title: 'Nyheter',
    description: 'Håll dig uppdaterad om klimat, natur och miljöpolitik. Nyheter, rapporter och kampanjer från Naturskyddsföreningen.',
  });

  const present = new Set(articles.map((a) => a.category));
  const categories = [
    'Alla',
    ...CATEGORY_ORDER.filter((c) => present.has(c)),
    ...[...present].filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  // A category from the URL that has no articles (a stale link) falls back to showing everything.
  const requestedCategory = params.get('kategori') ?? 'Alla';
  const activeCategory = loading || categories.includes(requestedCategory) ? requestedCategory : 'Alla';

  const updateParam = (name: 'kategori' | 'q', value: string) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value && value !== 'Alla') next.set(name, value);
        else next.delete(name);
        return next;
      },
      { replace: true },
    );

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === 'Alla' || a.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.excerpt ?? '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.filter((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

  return (
    <>
      {/* Header */}
      <section className="py-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-gray-900 dark:text-white">Nyheter</h1>
            {loading && <Loader2 className="w-5 h-5 animate-spin text-[#5A7C50]" />}
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-8">
            Håll dig uppdaterad om klimat, natur och miljöpolitik. Här samlar vi nyheter, rapporter och kampanjer.
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Sök nyheter..."
              value={searchQuery}
              onChange={(e) => updateParam('q', e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5A7C50]"
            />
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="sticky top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-3 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => updateParam('kategori', cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#5A7C50] text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-slate-800 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 py-16 text-center">
              {loading
                ? 'Hämtar nyheter…'
                : error
                ? 'Det gick inte att hämta nyheterna just nu. Försök igen om en stund.'
                : 'Inga nyheter hittades.'}
            </p>
          ) : (
            <>
              {featured.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  {featured.map((article, i) => (
                    <motion.article
                      key={article._id}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group cursor-pointer"
                    >
                      <Link to={`/nyheter/${article.slug}`} className={CARD_LINK}>
                      <div className="h-56 overflow-hidden">
                        <ArticleImage article={article} width={800} height={448} sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="flex items-center gap-1 text-xs text-[#5A7C50] dark:text-[#8FA888] font-medium">
                            <Tag className="w-3 h-3" /> {article.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3 h-3" /> {formatDate(article.publishedAt)}
                          </span>
                        </div>
                        <h2 className="text-gray-900 dark:text-white mb-3 group-hover:text-[#5A7C50] dark:group-hover:text-[#8FA888] transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                          {article.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm text-[#5A7C50] dark:text-[#8FA888] font-medium">
                          Läs mer <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((article, i) => (
                  <motion.article
                    key={article._id}
                    custom={i + featured.length}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group cursor-pointer"
                  >
                    <Link to={`/nyheter/${article.slug}`} className={CARD_LINK}>
                    <div className="h-40 overflow-hidden">
                      <ArticleImage article={article} width={500} height={320} sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center gap-1 text-xs text-[#5A7C50] dark:text-[#8FA888] font-medium">
                          <Tag className="w-3 h-3" /> {article.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3 h-3" /> {formatDate(article.publishedAt)}
                        </span>
                      </div>
                      <h3 className="text-gray-900 dark:text-white mb-2 group-hover:text-[#5A7C50] dark:group-hover:text-[#8FA888] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <MembershipCTA />
    </>
  );
}
