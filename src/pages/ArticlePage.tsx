import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Loader2 } from 'lucide-react';
import { MembershipCTA } from '../components/MembershipCTA';
import { ShareButtons } from '../components/ShareButtons';
import { ARTICLE_IMAGE_SIZES, CmsImage } from '../lib/cms/image';
import { formatDate } from '../lib/cms/format';
import { PortableBody } from '../lib/cms/PortableBody';
import { ARTICLE_QUERY } from '../lib/cms/queries';
import type { ArticleFull } from '../lib/cms/types';
import { useSanityQuery } from '../lib/cms/useSanityQuery';
import { usePageMeta } from '../lib/cms/usePageMeta';
import { NotFoundPage } from './NotFoundPage';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, loading, error } = useSanityQuery<ArticleFull>(ARTICLE_QUERY, { slug });

  usePageMeta({
    title: article?.seo?.metaTitle || article?.title,
    description: article?.seo?.metaDescription || article?.excerpt,
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-900" role="status" aria-label="Hämtar artikeln">
        <Loader2 className="w-8 h-8 animate-spin text-[#5A7C50]" />
      </div>
    );
  }

  if (error) {
    return (
      <section className="min-h-[60vh] bg-white py-20 text-center dark:bg-slate-900">
        <div className="mx-auto max-w-md px-4">
          <h1 className="mb-4 text-gray-900 dark:text-white">Det gick inte att hämta artikeln</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">Försök igen om en stund.</p>
          <Link to="/nyheter" className="text-[#4A6741] underline dark:text-[#8FA888]">Till alla nyheter</Link>
        </div>
      </section>
    );
  }

  if (!article) return <NotFoundPage />;

  return (
    <>
      <article className="bg-white py-12 dark:bg-slate-900 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/nyheter"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#4A6741] hover:underline dark:text-[#8FA888]"
          >
            <ArrowLeft className="w-4 h-4" /> Alla nyheter
          </Link>

          <div className="mb-4 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1 text-sm font-medium text-[#5A7C50] dark:text-[#8FA888]">
              <Tag className="w-4 h-4" /> {article.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" /> {formatDate(article.publishedAt)}
            </span>
          </div>

          <h1 className="mb-4 text-gray-900 dark:text-white">{article.title}</h1>
          {article.excerpt && (
            <p className="mb-8 text-xl leading-relaxed text-gray-600 dark:text-gray-400">{article.excerpt}</p>
          )}

          {article.mainImage?.asset && (
            <figure className="mb-10">
              <CmsImage
                image={article.mainImage}
                alt={article.mainImage.alt ?? article.title}
                width={768}
                height={432}
                sizes={ARTICLE_IMAGE_SIZES}
                loading="eager"
                className="w-full rounded-2xl object-cover"
              />
              {article.mainImage.caption && (
                <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {article.mainImage.caption}
                </figcaption>
              )}
            </figure>
          )}

          {article.body && article.body.length > 0 && <PortableBody value={article.body} />}

          <div className="mt-12 flex flex-col gap-6 border-t border-gray-200 pt-8 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
            {article.author ? (
              <div className="flex items-center gap-3">
                {article.author.photo?.asset && (
                  <CmsImage
                    image={article.author.photo}
                    alt={article.author.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="mb-0 font-semibold text-gray-900 dark:text-white">{article.author.name}</p>
                  {article.author.role && (
                    <p className="mb-0 text-sm text-gray-500 dark:text-gray-400">{article.author.role}</p>
                  )}
                </div>
              </div>
            ) : (
              <span />
            )}
            <ShareButtons title={article.title} description={article.excerpt} />
          </div>
        </div>
      </article>

      <MembershipCTA />
    </>
  );
}
