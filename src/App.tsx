import { Routes, Route, matchPath, useLocation, useNavigationType } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { ThemeProvider } from './components/ThemeProvider';
import { AssociationsProvider } from './lib/cms/AssociationsProvider';
import { SiteProvider } from './lib/cms/SiteProvider';
import { ARTICLE_QUERY } from './lib/cms/queries';
import type { ArticleFull } from './lib/cms/types';
import { useSanityQuery } from './lib/cms/useSanityQuery';
import { Navigation } from './components/Navigation';
import { Breadcrumbs } from './components/Breadcrumbs';
import { RouteErrorBoundary } from './components/RouteErrorBoundary';
import { ScrollToTop } from './components/ScrollToTop';
import { StickyMemberBanner } from './components/StickyMemberBanner';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { BiodiversityPage } from './pages/BiodiversityPage';
import { ClimatePage } from './pages/ClimatePage';
import { NewsPage } from './pages/NewsPage';
import { MembershipPage } from './pages/MembershipPage';
import { AboutPage } from './pages/AboutPage';
import { TopicPage } from './pages/TopicPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Loaded on demand: pulls in the rich-text renderer, which no other page needs.
const ArticlePage = lazy(() => import('./pages/ArticlePage').then((m) => ({ default: m.ArticlePage })));

const breadcrumbMap: Record<string, { label: string; parent?: string }> = {
  '/biologisk-mangfald': { label: 'Biologisk mångfald', parent: 'Lär dig mer' },
  '/klimat': { label: 'Klimat och energi', parent: 'Lär dig mer' },
  '/hav-och-vatten': { label: 'Hav och vatten', parent: 'Lär dig mer' },
  '/hallbar-konsumtion': { label: 'Hållbar konsumtion', parent: 'Lär dig mer' },
  '/jordbruk-och-mat': { label: 'Jordbruk och mat', parent: 'Lär dig mer' },
  '/skog-och-mark': { label: 'Skog och mark', parent: 'Lär dig mer' },
  '/nyheter': { label: 'Nyheter' },
  '/bli-medlem': { label: 'Bli medlem', parent: 'Stöd oss' },
  '/om-foreningen': { label: 'Om föreningen', parent: 'Om oss' },
  '/engagera-dig': { label: 'Engagera dig' },
};

// matchPath leaves the segment percent-encoded; the route's useParams decodes it.
function decodeSegment(segment: string) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function AppContent() {
  const location = useLocation();
  const navigationType = useNavigationType();

  // Start new pages at the top, but leave Back/Forward alone so the browser can restore the scroll position.
  useEffect(() => {
    if (navigationType === 'POP') return;
    // A link to a #section is scrolled into place by the page itself, as long as that section exists.
    if (location.hash && document.getElementById(decodeSegment(location.hash.slice(1)))) return;
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const isHome = location.pathname === '/';
  const crumbInfo = breadcrumbMap[location.pathname];

  // Shares its request with ArticlePage (same query and params, so one fetch).
  const rawSlug = matchPath('/nyheter/:slug', location.pathname)?.params.slug;
  const articleSlug = rawSlug && decodeSegment(rawSlug);
  const { data: article, loading: articleLoading, error: articleError } = useSanityQuery<ArticleFull>(
    articleSlug ? ARTICLE_QUERY : null,
    { slug: articleSlug },
  );
  // No label for a slug that doesn't exist: that page is a 404 and gets no article crumb.
  const articleLabel = article ? article.title : articleLoading || articleError ? 'Artikel' : null;

  const breadcrumbItems = isHome
    ? [{ label: 'Hem', href: '/' }]
    : articleSlug && articleLabel
    ? [{ label: 'Hem', href: '/' }, { label: 'Nyheter', href: '/nyheter' }, { label: articleLabel, href: location.pathname }]
    : crumbInfo
    ? [{ label: 'Hem', href: '/' }, { label: crumbInfo.label, href: location.pathname }]
    : [{ label: 'Hem', href: '/' }];

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-slate-900 reading:bg-gray-100 transition-colors duration-300">
      <Navigation />
      <Breadcrumbs items={breadcrumbItems} />
      <main id="main-content" className="bg-gray-200 dark:bg-slate-900 reading:bg-gray-100">
        <RouteErrorBoundary resetKey={location.pathname}>
        <Suspense
          fallback={
            <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Laddar">
              <Loader2 className="w-8 h-8 animate-spin text-[#5A7C50]" />
            </div>
          }
        >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/biologisk-mangfald" element={<BiodiversityPage />} />
          <Route path="/klimat" element={<ClimatePage />} />
          <Route path="/nyheter" element={<NewsPage />} />
          <Route path="/nyheter/:slug" element={<ArticlePage />} />
          <Route path="/bli-medlem" element={<MembershipPage />} />
          <Route path="/om-foreningen" element={<AboutPage />} />
          <Route path="/hav-och-vatten" element={<TopicPage topic="hav" />} />
          <Route path="/hallbar-konsumtion" element={<TopicPage topic="konsumtion" />} />
          <Route path="/jordbruk-och-mat" element={<TopicPage topic="jordbruk" />} />
          <Route path="/skog-och-mark" element={<TopicPage topic="skog" />} />
          <Route path="/engagera-dig" element={<TopicPage topic="engagera" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
        </RouteErrorBoundary>
      </main>
      <Footer />
      <ScrollToTop />
      <StickyMemberBanner />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SiteProvider>
        <AssociationsProvider>
          <AppContent />
        </AssociationsProvider>
      </SiteProvider>
    </ThemeProvider>
  );
}
