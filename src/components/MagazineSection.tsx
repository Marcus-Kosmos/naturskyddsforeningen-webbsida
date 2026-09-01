const magazineImage = '/images/magazine/magazine-cover.png';
const sverigesNaturLogo = '/images/logos/sveriges-natur-dark.png';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useInView, InView } from 'react-intersection-observer';

export function MagazineSection() {
  const { ref, isInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-16 bg-transparent dark:bg-slate-800 reading:bg-gray-50 reading:max-w-3xl reading:mx-auto">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isInView ? 'animate-fadeInUp' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 reading:grid-cols-1 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 reading:hidden" />
              <img 
                src={sverigesNaturLogo} 
                alt="Sveriges Natur" 
                className="h-8 dark:brightness-110"
              />
            </div>
            <h2 className="mb-4 text-gray-900 dark:text-white reading:text-gray-900">
              Medlemstidningen med reportage som gör skillnad
            </h2>
            <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700 mb-6">
              Som medlem får du Sveriges Natur, Skandinaviens ledande miljötidskrift, 
              hem i brevlådan 10 gånger per år. Djupgående reportage, vackra naturbilder 
              och inspirerande berättelser om människor som gör skillnad.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#4A6741] dark:bg-[#8FA888] reading:bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300 reading:text-gray-700">
                  Granskande journalistik om klimat, natur och miljö
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#4A6741] dark:bg-[#8FA888] reading:bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300 reading:text-gray-700">
                  Naturfoto i världsklass från svenska och internationella fotografer
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#4A6741] dark:bg-[#8FA888] reading:bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300 reading:text-gray-700">
                  Tips och guider för ett mer hållbart liv
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#bli-medlem"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#5A7C50] dark:bg-[#6B8E65] reading:bg-gray-900 text-white rounded-lg hover:bg-[#4A6741] dark:hover:bg-[#5A7C50] reading:hover:bg-gray-800 transition-colors"
              >
                <span>Bli medlem</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#arkivet"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 reading:border-gray-900 text-gray-700 dark:text-gray-300 reading:text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 reading:hover:bg-gray-100 transition-colors"
              >
                <span>Läs i arkivet</span>
              </a>
            </div>
          </div>

          {/* Image */}
          <div>
            <img
              src={magazineImage}
              alt="Sveriges Natur tidningar"
              className="rounded-2xl shadow-lg w-full reading:rounded-none reading:shadow-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}