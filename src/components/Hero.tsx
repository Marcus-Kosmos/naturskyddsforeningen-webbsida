import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanityClient';

interface HeroImage {
  asset: { _ref: string };
  alt?: string;
}

interface HomePageData {
  heroHeading?: string;
  heroSubheading?: string;
  heroPrimaryBtn?: string;
  heroSecondaryBtn?: string;
  heroImages?: HeroImage[];
}

const defaultImages = [
  { src: 'https://images.unsplash.com/photo-1650214562914-9db1ae262752?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbm93eSUyMG93bCUyMHdpbnRlcnxlbnwxfHx8fDE3NjU0ODYzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Snöuggla i naturlig miljö' },
  { src: 'https://images.unsplash.com/photo-1440020143730-090579c4d53c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2xwaGluJTIwb2NlYW58ZW58MXx8fHwxNzY1NDU5MDMzfDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Tumlare under vattnet' },
  { src: 'https://images.unsplash.com/photo-1669399201888-ceaa45b683ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBmb3Jlc3QlMjBzbm93fGVufDF8fHx8MTc2NTQ2OTE1MHww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Vinterlandskap med snöklädda träd' },
];

const HOMEPAGE_QUERY = `*[_type == "homePage" && _id == "homePage"][0]{
  heroHeading, heroSubheading, heroPrimaryBtn, heroSecondaryBtn,
  heroImages[]{ asset, alt }
}`;

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [cms, setCms] = useState<HomePageData | null>(null);

  useEffect(() => {
    client.fetch<HomePageData>(HOMEPAGE_QUERY).then(setCms).catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [cms]);

  const heading = cms?.heroHeading || 'Tillsammans skapar vi en hållbar framtid';
  const subheading =
    cms?.heroSubheading ||
    'Vi arbetar för att skydda naturens mångfald, stoppa klimatkrisen och skapa ett rättvist samhälle. Gör skillnad idag.';
  const primaryBtn = cms?.heroPrimaryBtn || 'Bli medlem';
  const secondaryBtn = cms?.heroSecondaryBtn || 'Läs mer om föreningen';

  const images =
    cms?.heroImages && cms.heroImages.length > 0
      ? cms.heroImages.map((img) => ({
          src: urlFor(img).width(1080).url(),
          alt: img.alt || '',
        }))
      : defaultImages;

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
        <h1 className="mb-6 text-white reading:text-gray-900">{heading}</h1>
        <p className="text-white/95 reading:text-gray-700 max-w-2xl mx-auto mb-8">{subheading}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 reading:flex-col">
          <Link
            to="/bli-medlem"
            className="flex items-center gap-2 px-6 py-3 bg-white text-[#4A6741] dark:text-[#6B8E65] reading:text-gray-900 reading:bg-gray-900 reading:text-white rounded-lg hover:bg-gray-100 reading:hover:bg-gray-800 transition-colors shadow-lg"
          >
            <span>{primaryBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/om-foreningen"
            className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white reading:text-gray-900 reading:bg-white reading:border reading:border-gray-300 border border-white/30 reading:border-gray-300 rounded-lg hover:bg-white/20 reading:hover:bg-gray-50 transition-colors"
          >
            {secondaryBtn}
          </Link>
        </div>

        {/* Carousel Indicators */}
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
      </div>
    </section>
  );
}
