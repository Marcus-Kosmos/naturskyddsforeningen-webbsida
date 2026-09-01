import { ArrowRight, Thermometer, Wind, Droplets } from 'lucide-react';
import { useInView, InView } from 'react-intersection-observer';
import { ImageCarousel } from './ImageCarousel';
import { ShareButtons } from './ShareButtons';

export function ClimateSection() {
  const stats = [
    {
      number: '+1.2°C',
      label: 'Temperaturökning i Sverige sedan 1900',
    },
    {
      number: '2030',
      label: 'Målet: Minska utsläppen med 63%',
    },
    {
      number: '80%',
      label: 'Av isarna i Arktis har smält sedan 1979',
    },
  ];

  const { ref, isInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const imageSlides = [
    {
      src: 'https://images.unsplash.com/photo-1549598685-0058b114c9d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFjaWVyJTIwbWVsdGluZ3xlbnwxfHx8fDE3NjU0ODYzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Smältande glaciär',
      caption: 'Glaciärer världen över smälter i alarmande takt',
    },
    {
      src: 'https://images.unsplash.com/photo-1641119580222-3e90f9a11287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmN0aWMlMjBmb3glMjBzbm93fGVufDF8fHx8MTc2NTM5MDk2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Isbjörn i Arktis',
      caption: 'Klimatförändringarna hotar isbjörnar och andra arktiska arter',
    },
    {
      src: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcG9sbHV0aW9ufGVufDF8fHx8MTc2NTQ4NjM2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Industrianläggning vid vattendrag',
      caption: 'Industrins klimatpåverkan kräver omställning till hållbara lösningar',
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-transparent dark:bg-slate-800 reading:bg-gray-50 reading:max-w-3xl reading:mx-auto">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isInView ? 'animate-fadeInUp' : ''}`}>
        {/* Header */}
        <div className="text-center mb-12 reading:text-left">
          <span className="inline-block px-3 py-1 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-white reading:border reading:border-gray-900 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 rounded-full mb-4">
            Klimatkris
          </span>
          <h2 className="mb-4 text-gray-900 dark:text-white reading:text-gray-900">
            Klimatet kräver akuta åtgärder
          </h2>
          <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700 max-w-3xl mx-auto reading:mx-0">
            Klimatförändringarna är vår tids största utmaning. Glaciärer smälter, 
            havsytan stiger och extremväder blir vanligare. Men det finns hopp – 
            om vi agerar nu.
          </p>
        </div>

        {/* Image */}
        <div className="mb-12">
          <ImageCarousel slides={imageSlides} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center reading:text-left p-6 bg-white dark:bg-gray-900 reading:bg-white rounded-xl reading:rounded-none">
              <div className="text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 mb-2">
                {stat.number}
              </div>
              <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="bg-white dark:bg-gray-900 reading:bg-white rounded-2xl reading:rounded-none p-8 reading:p-6">
          <h3 className="mb-6 text-gray-900 dark:text-white reading:text-gray-900">
            Vårt klimatarbete
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 reading:grid-cols-1 gap-6 mb-8">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-transparent rounded-lg flex items-center justify-center reading:hidden">
                <Thermometer className="w-5 h-5 text-[#4A6741] dark:text-[#B8D4B0]" />
              </div>
              <div>
                <h4 className="text-gray-900 dark:text-white reading:text-gray-900 mb-1">
                  Påverka politiker
                </h4>
                <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700">
                  Vi driver klimatfrågan i riksdag, EU och globalt.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-transparent rounded-lg flex items-center justify-center reading:hidden">
                <Wind className="w-5 h-5 text-[#4A6741] dark:text-[#B8D4B0]" />
              </div>
              <div>
                <h4 className="text-gray-900 dark:text-white reading:text-gray-900 mb-1">
                  Förnybar energi
                </h4>
                <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700">
                  Kämpar för 100% förnybar el och hållbara transporter.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-transparent rounded-lg flex items-center justify-center reading:hidden">
                <Droplets className="w-5 h-5 text-[#4A6741] dark:text-[#B8D4B0]" />
              </div>
              <div>
                <h4 className="text-gray-900 dark:text-white reading:text-gray-900 mb-1">
                  Granska företag
                </h4>
                <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700">
                  Håller företag ansvariga för sina klimatutsläpp.
                </p>
              </div>
            </div>
          </div>
          <a
            href="#klimat-natur"
            className="inline-flex items-center gap-2 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 hover:underline"
          >
            <span>Läs mer om vårt klimatarbete</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Share Buttons */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700 reading:border-gray-300">
            <ShareButtons 
              title="Klimatet kräver akuta åtgärder - Naturskyddsföreningen"
              description="Klimatförändringarna är vår tids största utmaning. Läs om vårt klimatarbete."
              url="#klimat"
            />
          </div>
        </div>
      </div>
    </section>
  );
}