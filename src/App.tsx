import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { SiteProvider } from './lib/cms/SiteProvider';
import { Navigation } from './components/Navigation';
import { Breadcrumbs } from './components/Breadcrumbs';
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

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const isHome = location.pathname === '/';
  const crumbInfo = breadcrumbMap[location.pathname];

  const breadcrumbItems = isHome
    ? [{ label: 'Hem', href: '/' }]
    : crumbInfo
    ? [{ label: 'Hem', href: '/' }, { label: crumbInfo.label, href: location.pathname }]
    : [{ label: 'Hem', href: '/' }];

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-slate-900 reading:bg-gray-100 transition-colors duration-300">
      <Navigation />
      <Breadcrumbs items={breadcrumbItems} />
      <main id="main-content" className="bg-gray-200 dark:bg-slate-900 reading:bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/biologisk-mangfald" element={<BiodiversityPage />} />
          <Route path="/klimat" element={<ClimatePage />} />
          <Route path="/nyheter" element={<NewsPage />} />
          <Route path="/bli-medlem" element={<MembershipPage />} />
          <Route path="/om-foreningen" element={<AboutPage />} />
          <Route path="/hav-och-vatten" element={<TopicPage topic="hav" />} />
          <Route path="/hallbar-konsumtion" element={<TopicPage topic="konsumtion" />} />
          <Route path="/jordbruk-och-mat" element={<TopicPage topic="jordbruk" />} />
          <Route path="/skog-och-mark" element={<TopicPage topic="skog" />} />
          <Route path="/engagera-dig" element={<TopicPage topic="engagera" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
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
        <AppContent />
      </SiteProvider>
    </ThemeProvider>
  );
}
