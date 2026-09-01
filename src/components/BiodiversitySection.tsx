import { ArrowRight, Bird, Trees, Mountain } from 'lucide-react';
import { useInView, InView } from 'react-intersection-observer';
import { ImageCarousel } from './ImageCarousel';
import { ShareButtons } from './ShareButtons';

export function BiodiversitySection() {
  const actions = [
    {
      icon: Trees,
      title: 'Skydda skogen',
      text: 'Vi kämpar för att bevara gamla skogar och stoppa avverkning av värdefull natur.',
    },
    {
      icon: Mountain,
      title: 'Fjällnära områden',
      text: 'Arbete för att säkerställa att fjällområden och deras unika djurliv bevaras för kommande generationer.',
    },
    {
      icon: Bird,
      title: 'Hotade arter',
      text: 'Kampanjer för att skydda hotade arter och deras livsmiljöer över hela Sverige.',
    },
  ];

  const { ref, isInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const imageSlides = [
    {
      src: 'https://images.unsplash.com/photo-1641119580222-3e90f9a11287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmN0aWMlMjBmb3glMjBzbm93fGVufDF8fHx8MTc2NTM5MDk2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Fjällräv i svensk fjällnatur',
      caption: 'Fjällräven är en av Sveriges mest hotade arter',
    },
    {
      src: 'https://images.unsplash.com/photo-1669399201888-ceaa45b683ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBmb3Jlc3QlMjBzbm93fGVufDF8fHx8MTc2NTQ2OTE1MHww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Skog och sjöar i svensk natur',
      caption: 'Vi arbetar för att bevara skogar och vattendrag för kommande generationer',
    },
    {
      src: 'https://images.unsplash.com/photo-1686333330383-be7ba34e9fb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkZmxvd2VycyUyMG1lYWRvd3xlbnwxfHx8fDE3NjU0ODYzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Vilda blommor längs vägkant',
      caption: 'Bevarande av pollinatörer och vilda växter är avgörande för den biologiska mångfalden',
    },
    {
      src: 'https://images.unsplash.com/photo-1641119580222-3e90f9a11287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmN0aWMlMjBmb3glMjBzbm93fGVufDF8fHx8MTc2NTM5MDk2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Trädsiluetter mot dramatisk himmel',
      caption: 'Gamla skogar är hem åt otaliga arter och måste skyddas',
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-white dark:bg-slate-900 reading:bg-white reading:max-w-3xl reading:mx-auto">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isInView ? 'animate-fadeInUp' : ''}`}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={isInView ? 'animate-fadeInUp' : ''}>
            <h2 className="text-[rgb(16,24,40)] dark:text-[#B8D4B0] mb-6 reading:text-left">Biologisk mångfald</h2>
            <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700 mb-6">
              Sveriges natur är hem åt tusentals arter. Men många är hotade på grund av 
              habitatförlust, klimatförändringar och mänsklig påverkan. Vi arbetar för att 
              skydda den biologiska mångfalden och säkerställa att kommande generationer 
              får uppleva en levande natur.
            </p>

            <div className="space-y-4 mb-8">
              {actions.map((action, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-transparent rounded-lg flex items-center justify-center reading:hidden">
                    <action.icon className="w-5 h-5 text-[#4A6741] dark:text-[#B8D4B0]" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white reading:text-gray-900 mb-1">
                      {action.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700">
                      {action.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#klimat-natur"
              className="inline-flex items-center gap-2 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 hover:underline"
            >
              <span>Läs mer om vårt naturskyddsarbete</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Share Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700 reading:border-gray-300">
              <ShareButtons 
                title="Biologisk mångfald - Naturskyddsföreningen"
                description="Sveriges natur är hem åt tusentals arter. Läs om vårt arbete för att skydda den biologiska mångfalden."
                url="#mangfald"
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <ImageCarousel slides={imageSlides} />
          </div>
        </div>
      </div>
    </section>
  );
}