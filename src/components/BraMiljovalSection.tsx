import { ArrowRight, Award, Leaf, ShieldCheck } from 'lucide-react';
import { useInView, InView } from 'react-intersection-observer';
import { ShareButtons } from './ShareButtons';

export function BraMiljovalSection() {
  const features = [
    {
      icon: Award,
      title: 'Certifierade produkter',
      text: 'Över 6 000 produkter som uppfyller höga miljökrav.',
    },
    {
      icon: Leaf,
      title: 'Hållbart jordbruk',
      text: 'Ekologiska livsmedel som är bra för både dig och planeten.',
    },
    {
      icon: ShieldCheck,
      title: 'Offentlig kontroll',
      text: 'Oberoende granskare säkerställer att märkningen hålls.',
    },
  ];

  const { ref, isInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-16 bg-transparent dark:bg-slate-800 reading:bg-gray-50 reading:max-w-3xl reading:mx-auto">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isInView ? 'animate-fadeInUp' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 reading:grid-cols-1 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#5A7C50] dark:bg-[#6B8E65] reading:bg-gray-900 rounded-full flex items-center justify-center reading:hidden">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="inline-block px-3 py-1 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-white reading:border reading:border-gray-900 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 rounded-full">
                Bra Miljöval
              </span>
            </div>
            <h2 className="mb-4 text-gray-900 dark:text-white reading:text-gray-900">
              Välj rätt – enkelt och säkert
            </h2>
            <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700 mb-6">
              Bra Miljöval är Naturskyddsföreningens miljömärkning som hjälper dig att 
              göra bättre val i butiken. Märkningen finns på allt från mat och kläder 
              till rengöringsprodukter och papper.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 items-start p-4 bg-white dark:bg-gray-900 reading:bg-white rounded-lg reading:rounded-none">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-transparent rounded-lg flex items-center justify-center reading:hidden">
                    <feature.icon className="w-5 h-5 text-[#4A6741] dark:text-[#B8D4B0]" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white reading:text-gray-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700">
                      {feature.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#bra-miljoval"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#5A7C50] dark:bg-[#6B8E65] reading:bg-gray-900 text-white rounded-lg hover:bg-[#4A6741] dark:hover:bg-[#5A7C50] reading:hover:bg-gray-800 transition-colors"
              >
                <span>Hitta produkter</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#hallbarhet"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 reading:border-gray-900 text-gray-700 dark:text-gray-300 reading:text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 reading:hover:bg-gray-100 transition-colors"
              >
                <span>Läs om kriterierna</span>
              </a>
            </div>

            {/* Share Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700 reading:border-gray-300">
              <ShareButtons 
                title="Bra Miljöval - Naturskyddsföreningen"
                description="Bra Miljöval hjälper dig göra bättre val i butiken. Över 6 000 produkter som uppfyller höga miljökrav."
                url="#bra-miljoval"
              />
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1759141936083-d10203b4d4f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwc3BpY2VzfGVufDF8fHx8MTc2NTQ4NjM2NHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Ekologiska kryddor och ingredienser"
              className="rounded-2xl shadow-lg w-full reading:rounded-none reading:shadow-none"
            />
            <p className="text-gray-500 dark:text-gray-400 reading:text-gray-600 mt-2 italic">
              Ekologiska ingredienser är bättre för miljön
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}