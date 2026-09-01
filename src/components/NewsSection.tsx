import { Calendar, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export function NewsSection() {
  const { ref, isInView } = useInView();

  const news = [
    {
      category: 'Klimat',
      title: 'Ny rapport visar alarmande tillstånd för svenska skogar',
      date: '8 december 2025',
      image: 'nature forest',
    },
    {
      category: 'Hav',
      title: 'Vi lanserar kampanj för renare Östersjön',
      date: '5 december 2025',
      image: 'ocean water',
    },
    {
      category: 'Lokalt',
      title: 'Framgångar i kampen för Stockholms grönområden',
      date: '3 december 2025',
      image: 'urban park',
    },
  ];

  const events = [
    {
      title: 'Naturfotografering i Tyresta',
      date: '15 dec',
      location: 'Stockholm',
    },
    {
      title: 'Webbinarium: Hållbar konsumtion',
      date: '18 dec',
      location: 'Online',
    },
    {
      title: 'Vintervandring i Abisko',
      date: '20 dec',
      location: 'Norrbotten',
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-white dark:bg-slate-900 reading:bg-white reading:max-w-3xl reading:mx-auto">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isInView ? 'animate-fadeInUp' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 reading:grid-cols-1 gap-8">
          {/* News Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900 dark:text-white reading:text-gray-900">Just nu</h2>
              <a
                href="#alla-nyheter"
                className="text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 hover:underline flex items-center gap-1"
              >
                <span>Se alla</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="space-y-4">
              {news.map((item, index) => (
                <article
                  key={index}
                  className="group flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 reading:bg-white reading:border-l-4 reading:border-gray-900 rounded-lg hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-green-200 dark:hover:border-green-800 reading:hover:border-gray-300 reading:shadow-none"
                >
                  <div className="flex-shrink-0 w-32 h-24 bg-gradient-to-br from-green-500 to-green-700 dark:from-green-700 dark:to-green-900 reading:from-gray-300 reading:to-gray-400 rounded-lg overflow-hidden reading:hidden">
                    <div className="w-full h-full flex items-center justify-center text-white text-xs">
                      {item.image}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 reading:bg-transparent reading:border reading:border-gray-900 text-green-700 dark:text-green-400 reading:text-gray-900 rounded text-xs mb-2">
                      {item.category}
                    </span>
                    <h3 className="mb-1 text-gray-900 dark:text-white reading:text-gray-900 group-hover:text-green-600 dark:group-hover:text-green-400 reading:group-hover:text-gray-900 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 reading:text-gray-600">
                      {item.date}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Events Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900 dark:text-white reading:text-gray-900">Kalendarium</h2>
              <a
                href="#kalendarium"
                className="text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 hover:underline flex items-center gap-1 reading:hidden"
              >
                <span>Se alla</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="space-y-3">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-800 reading:bg-white reading:border-l-4 reading:border-gray-900 rounded-lg hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-[#8FA888]/30 dark:hover:border-[#6B8E65]/30 reading:hover:border-gray-300 reading:shadow-none"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-transparent rounded-lg flex flex-col items-center justify-center reading:hidden">
                    <Calendar className="w-5 h-5 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 dark:text-white reading:text-gray-900 mb-1">
                      {event.title}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 reading:text-gray-600">
                      {event.date} • {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}