import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Hero } from '../components/Hero';
import { MembershipCTA } from '../components/MembershipCTA';
import { SectionRenderer } from '../components/blocks/SectionRenderer';
import { HOME_QUERY } from '../lib/cms/queries';
import type { HomeData } from '../lib/cms/types';
import { useSanityQuery } from '../lib/cms/useSanityQuery';
import { usePageMeta } from '../lib/cms/usePageMeta';

export function HomePage() {
  const { data, loading, error } = useSanityQuery<HomeData>(HOME_QUERY);
  const { hash } = useLocation();

  usePageMeta({ title: data?.seo?.metaTitle, description: data?.seo?.metaDescription });

  // A link like /#bra-miljoval jumps to that section once the sections exist.
  useEffect(() => {
    if (!data || !hash) return;
    let id = hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch {
      // keep the raw value
    }
    document.getElementById(id)?.scrollIntoView();
  }, [data, hash]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Hämtar startsidan">
        <Loader2 className="w-8 h-8 animate-spin text-[#5A7C50]" />
      </div>
    );
  }

  if (!data) {
    return (
      <section className="min-h-[60vh] bg-white py-20 text-center dark:bg-slate-900">
        <div className="mx-auto max-w-md px-4">
          <h1 className="mb-4 text-gray-900 dark:text-white">
            {error ? 'Det gick inte att hämta startsidan' : 'Startsidan är inte ifylld ännu'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {error ? 'Försök igen om en stund.' : 'Lägg till innehåll under Startsida i Studio.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <Hero home={data} />
      <SectionRenderer sections={data.sections ?? []} />
      <MembershipCTA />
    </>
  );
}
