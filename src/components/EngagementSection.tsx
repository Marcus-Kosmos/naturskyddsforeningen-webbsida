import { ArrowRight, Users, Heart, Target, MessageCircle } from 'lucide-react';
import { useInView, InView } from 'react-intersection-observer';
import { ImageCarousel } from './ImageCarousel';

export function EngagementSection() {
  const ways = [
    {
      icon: Users,
      title: 'Lokalföreningar',
      text: 'Över 270 lokalföreningar runt om i Sverige där du kan göra konkret skillnad.',
    },
    {
      icon: Target,
      title: 'Kampanjer',
      text: 'Delta i våra kampanjer för att påverka beslutsfattare och skydda naturen.',
    },
    {
      icon: MessageCircle,
      title: 'Nätverk',
      text: 'Anslut dig till tematiska nätverk och träffa andra engagerade medlemmar.',
    },
    {
      icon: Heart,
      title: 'Volontärarbete',
      text: 'Bidra med din tid och kompetens i vårt arbete för miljön.',
    },
  ];

  const { ref, isInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const imageSlides = [
    {
      src: 'https://images.unsplash.com/photo-1552799446-159ba9523315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwcHJvdGVzdHxlbnwxfHx8fDE3NjU0ODYzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Aktivister som demonstrerar för klimaträttvisa',
      caption: 'Tillsammans kämpar vi för klimaträttvisa och en hållbar framtid',
    },
    {
      src: 'https://images.unsplash.com/photo-1552799446-159ba9523315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwcHJvdGVzdHxlbnwxfHx8fDE3NjU0ODYzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Unga aktivister för klimatet',
      caption: 'Nästa generation tar plats och kämpar för planetens framtid',
    },
    {
      src: 'https://images.unsplash.com/photo-1758599668178-d9716bbda9d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NjU0ODYzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Volontärer som inventerar biologisk mångfald',
      caption: 'Engagerade medlemmar gör skillnad varje dag',
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-white dark:bg-slate-900 reading:bg-white reading:max-w-3xl reading:mx-auto">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isInView ? 'animate-fadeInUp' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 reading:grid-cols-1 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-3 py-1 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-white reading:border reading:border-gray-900 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 rounded-full mb-4">
              Engagemang
            </span>
            <h2 className="mb-4 text-gray-900 dark:text-white reading:text-gray-900">
              Tillsammans är vi starkare
            </h2>
            <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700 mb-6">
              Vår styrka ligger i våra medlemmar. Från skolelever till pensionärer, 
              från stadsbor till landsbygdsboende – alla kan bidra till en bättre miljö. 
              Oavsett om du vill vara aktiv i en lokalförening, delta i kampanjer, 
              eller bara hålla dig uppdaterad, finns det en plats för dig hos oss.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {ways.map((way, index) => (
                <div key={index} className="flex gap-3 items-start p-4 bg-gray-50 dark:bg-gray-800 reading:bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-transparent rounded-lg flex items-center justify-center reading:hidden">
                    <way.icon className="w-5 h-5 text-[#4A6741] dark:text-[#B8D4B0]" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white reading:text-gray-900 mb-1">
                      {way.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700">
                      {way.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#nara-dig"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#5A7C50] dark:bg-[#6B8E65] reading:bg-gray-900 text-white rounded-lg hover:bg-[#4A6741] dark:hover:bg-[#5A7C50] reading:hover:bg-gray-800 transition-colors"
              >
                <span>Hitta din lokalförening</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#natverka"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 reading:border-gray-900 text-gray-700 dark:text-gray-300 reading:text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 reading:hover:bg-gray-100 transition-colors"
              >
                <span>Gå med i ett nätverk</span>
              </a>
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