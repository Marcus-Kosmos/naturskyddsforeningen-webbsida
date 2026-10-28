import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CmsLink } from '../lib/cms/CmsLink';
import { isUsableLink } from '../lib/cms/resolveLink';
import { useSite } from '../lib/cms/SiteProvider';
import { urlFor } from '../lib/sanityClient';
import type { HomeData } from '../lib/cms/types';

export function Hero({ home }: { home: HomeData }) {
  const { fill } = useSite();
  const [currentImage, setCurrentImage] = useState(0);

  const images = (home.heroImages ?? [])
    .filter((img) => img.asset)
    .map((img) => ({ src: urlFor(img).width(1600).auto('format').url(), alt: img.alt || '' }));

  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [images.length]);

  const primary = home.heroPrimaryBtn && isUsableLink(home.heroPrimaryLink);
  const secondary = home.heroSecondaryBtn && isUsableLink(home.heroSecondaryLink);

  return (
    <section className="relative h-[600px] reading:h-auto flex items-center justify-center overflow-hidden">
      {/* Background with overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A6741] to-[#5A7C50] dark:from-gray-900 dark:to-gray-800 reading:from-gray-100 reading:to-gray-100">
        {/* Image Carousel */}
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`absolute inset-0 w-full h-full object-cover opacity-0 dark:opacity-0 reading:hidden transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-40 dark:opacity-30' : ''
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/50 reading:bg-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reading:py-12">
        <h1 className="mb-6 text-white reading:text-gray-900">{fill(home.heroHeading)}</h1>
        {home.heroSubheading && (
          <p className="text-white/95 reading:text-gray-700 max-w-2xl mx-auto mb-8">{fill(home.heroSubheading)}</p>
        )}
        {(primary || secondary) && (
          <div className="flex flex-wrap items-center justify-center gap-4 reading:flex-col">
            {primary && (
              <CmsLink
                link={home.heroPrimaryLink}
                className="flex items-center gap-2 px-6 py-3 bg-white text-[#4A6741] dark:text-[#6B8E65] reading:text-gray-900 reading:bg-gray-900 reading:text-white rounded-lg hover:bg-gray-100 reading:hover:bg-gray-800 transition-colors shadow-lg"
              >
                <span>{fill(home.heroPrimaryBtn)}</span>
                <ArrowRight className="w-5 h-5" />
              </CmsLink>
            )}
            {secondary && (
              <CmsLink
                link={home.heroSecondaryLink}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white reading:text-gray-900 reading:bg-white reading:border reading:border-gray-300 border border-white/30 reading:border-gray-300 rounded-lg hover:bg-white/20 reading:hover:bg-gray-50 transition-colors"
              >
                {fill(home.heroSecondaryBtn)}
              </CmsLink>
            )}
          </div>
        )}

        {/* Carousel Indicators */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-8 reading:hidden">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImage ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Visa bild ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
