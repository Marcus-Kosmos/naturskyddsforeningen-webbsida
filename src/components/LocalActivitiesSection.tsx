import { MapPin, Calendar, Users, ExternalLink, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { ImageCarousel } from './ImageCarousel';

export function LocalActivitiesSection() {
  const { ref, isInView } = useInView();

  const activities = [
    {
      title: 'Vintervandring i Tyresta',
      date: '15 december',
      location: 'Stockholm',
      type: 'Utflykt',
    },
    {
      title: 'Klimatworkshop',
      date: '18 december',
      location: 'Göteborg',
      type: 'Workshop',
    },
    {
      title: 'Fågelinventering',
      date: '20 december',
      location: 'Malmö',
      type: 'Inventering',
    },
  ];

  const imageSlides = [
    {
      src: 'https://images.unsplash.com/photo-1683044414176-0e0d42b6fddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBoaWtpbmd8ZW58MXx8fHwxNzY1NDg2MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Vintervandring i snötäckt skog',
      caption: 'Våra lokalföreningar arrangerar aktiviteter året runt',
    },
    {
      src: 'https://images.unsplash.com/photo-1683044414176-0e0d42b6fddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBoaWtpbmd8ZW58MXx8fHwxNzY1NDg2MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Vandrare i vinterskog',
      caption: 'Upptäck naturen tillsammans med engagerade naturvänner',
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-white dark:bg-slate-900 reading:bg-white reading:max-w-3xl reading:mx-auto">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isInView ? 'animate-fadeInUp' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 reading:grid-cols-1 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <ImageCarousel slides={imageSlides} />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-3 py-1 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-white reading:border reading:border-gray-900 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 rounded-full mb-4">
              Nära dig
            </span>
            <h2 className="mb-4 text-gray-900 dark:text-white reading:text-gray-900">
              Upptäck naturen tillsammans
            </h2>
            <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700 mb-6">
              Våra 270+ lokalföreningar arrangerar aktiviteter för alla åldrar – 
              från naturvandringar och fågelinventeringar till workshops och föreläsningar. 
              Oavsett var i Sverige du bor finns det möjligheter att engagera dig lokalt.
            </p>

            {/* Upcoming Events */}
            <div className="mb-8">
              <h3 className="text-gray-900 dark:text-white reading:text-gray-900 mb-4">
                Kommande aktiviteter
              </h3>
              <div className="space-y-3">
                {activities.map((event, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 reading:bg-gray-50 rounded-lg hover:shadow-md reading:hover:shadow-none transition-all cursor-pointer border border-transparent hover:border-[#8FA888]/30 reading:hover:border-gray-300">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-transparent rounded-lg flex items-center justify-center reading:hidden">
                        <Calendar className="w-5 h-5 text-[#4A6741] dark:text-[#B8D4B0]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-gray-900 dark:text-white reading:text-gray-900">
                          {event.title}
                        </h4>
                        <span className="px-2 py-0.5 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-transparent reading:border reading:border-gray-900 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 rounded text-xs">
                          {event.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 reading:text-gray-600">
                        <span>{event.date}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#kalendarium"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#5A7C50] dark:bg-[#6B8E65] reading:bg-gray-900 text-white rounded-lg hover:bg-[#4A6741] dark:hover:bg-[#5A7C50] reading:hover:bg-gray-800 transition-colors"
              >
                <span>Se alla aktiviteter</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#nara-dig"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 reading:border-gray-900 text-gray-700 dark:text-gray-300 reading:text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 reading:hover:bg-gray-100 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Hitta din lokalförening</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}