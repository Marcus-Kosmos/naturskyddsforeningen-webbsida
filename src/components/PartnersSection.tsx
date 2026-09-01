import { Users } from 'lucide-react';
import { useInView } from '../hooks/useInView';
const sverigesNaturLogo = '/images/logos/sveriges-natur-dark.png';
const sverigesNaturLogoLight = '/images/logos/sveriges-natur-light.png';
const faltbiologernaLogoLight = '/images/logos/faltbiologerna-light.png';
const faltbiologernaLogoDark = '/images/logos/faltbiologerna-dark.png';

export function PartnersSection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-16 bg-transparent dark:bg-slate-800 reading:bg-gray-50 reading:max-w-3xl reading:mx-auto">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${isInView ? 'animate-fadeInUp' : ''}`}>
        <div className="text-center reading:text-left mb-12">
          <span className="inline-block px-3 py-1 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-white reading:border reading:border-gray-900 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 rounded-full mb-4">
            Samarbeten
          </span>
          <h2 className="mb-4 text-gray-900 dark:text-white reading:text-gray-900">
            Tillsammans för naturen
          </h2>
          <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700 max-w-3xl mx-auto reading:mx-0">
            Vi samarbetar med andra organisationer för att stärka naturskyddsarbetet i Sverige och globalt.
          </p>
        </div>

        {/* Partner Organizations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <a
            href="#sveriges-natur"
            className="group p-8 bg-white dark:bg-gray-900 reading:bg-white rounded-xl reading:rounded-none border border-gray-200 dark:border-gray-700 reading:border-gray-300 hover:shadow-lg reading:hover:shadow-none transition-all"
          >
            <div className="flex items-center justify-center mb-6 h-16">
              <img
                src={sverigesNaturLogoLight}
                alt="Sveriges Natur"
                className="max-h-16 w-auto object-contain dark:hidden"
              />
              <img
                src={sverigesNaturLogo}
                alt="Sveriges Natur"
                className="max-h-16 w-auto object-contain hidden dark:block"
              />
            </div>
            <h3 className="text-center text-gray-900 dark:text-white reading:text-gray-900 mb-3">
              Sveriges Natur
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 reading:text-gray-700 mb-4">
              Vår medlemstidning som når ut till hundratusentals läsare varje månad.
            </p>
            <div className="flex items-center justify-center text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 group-hover:underline">
              <span>Läs mer</span>
              <Users className="w-4 h-4 ml-1" />
            </div>
          </a>

          <a
            href="#faltbiologerna"
            className="group p-8 bg-white dark:bg-gray-900 reading:bg-white rounded-xl reading:rounded-none border border-gray-200 dark:border-gray-700 reading:border-gray-300 hover:shadow-lg reading:hover:shadow-none transition-all"
          >
            <div className="flex items-center justify-center mb-6 h-16">
              <img
                src={faltbiologernaLogoLight}
                alt="Fältbiologerna"
                className="max-h-16 w-auto object-contain dark:hidden"
              />
              <img
                src={faltbiologernaLogoDark}
                alt="Fältbiologerna"
                className="max-h-16 w-auto object-contain hidden dark:block"
              />
            </div>
            <h3 className="text-center text-gray-900 dark:text-white reading:text-gray-900 mb-3">
              Fältbiologerna
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 reading:text-gray-700 mb-4">
              Ungdomsorganisation som arbetar för naturskydd och biologisk mångfald.
            </p>
            <div className="flex items-center justify-center text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 group-hover:underline">
              <span>Läs mer</span>
              <Users className="w-4 h-4 ml-1" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}