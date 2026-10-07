import { useState, useEffect } from 'react';
import { Calendar, Tag, ArrowRight, Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { client, urlFor } from '../lib/sanityClient';
import { MembershipCTA } from '../components/MembershipCTA';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } }),
};

const categories = ['Alla', 'Klimat', 'Biologisk mångfald', 'Hav och vatten', 'Skog', 'Politik', 'Kampanj'];

// Fallback articles shown before any CMS content is published
const fallbackArticles = [
  {
    _id: '1',
    title: 'Ny rapport: Fjällräven hotas av varmare vintrar',
    excerpt: 'En ny studie visar att fjällrävens reproduktion minskar kraftigt i takt med att snötäcket krymper. Naturskyddsföreningen kräver åtgärder.',
    publishedAt: '2026-03-24T00:00:00Z',
    category: 'Biologisk mångfald',
    mainImage: null,
    fallbackImg: 'https://images.unsplash.com/photo-1641119580222-3e90f9a11287?w=800&q=80',
    featured: true,
  },
  {
    _id: '2',
    title: 'Sverige missar klimatmålen – vi kräver krafttag',
    excerpt: 'Naturvårdsverkets senaste rapport visar att utsläppen inte minskar i den takt som krävs. Föreningen uppmanar regeringen att agera nu.',
    publishedAt: '2026-03-20T00:00:00Z',
    category: 'Klimat',
    mainImage: null,
    fallbackImg: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80',
    featured: true,
  },
  {
    _id: '3',
    title: 'Seger i rätten: Skyddsvärd skog räddad i Dalarna',
    excerpt: 'Efter ett långt juridiskt arbete har Mark- och miljödomstolen stoppat avverkning av 40 hektar gammalskog i Dalarna.',
    publishedAt: '2026-03-15T00:00:00Z',
    category: 'Skog',
    mainImage: null,
    fallbackImg: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
    featured: false,
  },
  {
    _id: '4',
    title: 'Östersjön: Nya data visar förbättrad syresituation',
    excerpt: 'Trots utmaningarna visar årets mätningar att syresättningen i delar av Östersjön har förbättrats. Men läget är fortfarande allvarligt.',
    publishedAt: '2026-03-12T00:00:00Z',
    category: 'Hav och vatten',
    mainImage: null,
    fallbackImg: 'https://images.unsplash.com/photo-1440020143730-090579c4d53c?w=800&q=80',
    featured: false,
  },
  {
    _id: '5',
    title: 'Kampanj: Minska plast i naturen',
    excerpt: 'Vår nya kampanj samlar frivilliga runt om i Sverige för att städa naturområden och påverka politiker att skärpa plastlagstiftningen.',
    publishedAt: '2026-03-08T00:00:00Z',
    category: 'Kampanj',
    mainImage: null,
    fallbackImg: 'https://images.unsplash.com/photo-1686333330383-be7ba34e9fb8?w=800&q=80',
    featured: false,
  },
  {
    _id: '6',
    title: 'Riksdagen röstar om naturvårdsbudgeten',
    excerpt: 'I veckan behandlar riksdagen ett motionspaket om naturvård. Vi uppmanar ledamöterna att prioritera natur framför kortsiktiga ekonomiska intressen.',
    publishedAt: '2026-03-05T00:00:00Z',
    category: 'Politik',
    mainImage: null,
    fallbackImg: 'https://images.unsplash.com/photo-1669399201888-ceaa45b683ee?w=800&q=80',
    featured: false,
  },
];

interface SanityArticle {
  _id: string;
  title: string;
  excerpt?: string;
  publishedAt: string;
  category: string;
  mainImage?: { asset: { _ref: string }; alt?: string };
  fallbackImg?: string;
  featured: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('sv-SE', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function ArticleImage({ article }: { article: SanityArticle }) {
  const src = article.mainImage
    ? urlFor(article.mainImage).width(800).height(400).url()
    : article.fallbackImg ?? 'https://images.unsplash.com/photo-1641119580222-3e90f9a11287?w=800&q=80';
  return (
    <img
      src={src}
      alt={article.mainImage?.alt ?? article.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  );
}

const ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc) {
  _id, title, excerpt, publishedAt, category, featured,
  mainImage { asset, alt }
}`

export function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('Alla');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<SanityArticle[]>(fallbackArticles as SanityArticle[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch<SanityArticle[]>(ARTICLES_QUERY)
      .then((data) => {
        if (data && data.length > 0) {
          setArticles(data);
        }
      })
      .catch(() => {
        // Silently fall back to hardcoded articles
      })
      .finally(() => setLoading(false));
  }, []);

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
              onChange={(e) => setSearchQuery(e.target.value)}
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
                onClick={() => setActiveCategory(cat)}
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
            <p className="text-gray-500 dark:text-gray-400 py-16 text-center">Inga nyheter hittades.</p>
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
                      <div className="h-56 overflow-hidden">
                        <ArticleImage article={article} />
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
                    <div className="h-40 overflow-hidden">
                      <ArticleImage article={article} />
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
