import { Leaf, Users, Heart, Globe } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';

export function ContentGrid() {
  const cards = [
    {
      icon: Leaf,
      title: 'Klimat & natur',
      description: 'Vi kämpar för att stoppa klimatkrisen och bevara biologisk mångfald.',
      color: 'bg-[#8FA888]/20 dark:bg-[#5A7C50]/20 reading:bg-transparent',
      iconColor: 'text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900',
      href: '#',
    },
    {
      icon: Users,
      title: 'Engagemang',
      description: 'Anslut dig till våra lokalföreningar och gör skillnad i ditt närområde.',
      color: 'bg-gray-100 dark:bg-gray-700/30 reading:bg-transparent',
      iconColor: 'text-gray-700 dark:text-gray-300 reading:text-gray-900',
      href: '#',
    },
    {
      icon: Heart,
      title: 'Hållbarhet',
      description: 'Lär dig om hållbar konsumtion och hur du kan leva mer miljövänligt.',
      color: 'bg-gray-100 dark:bg-gray-700/30 reading:bg-transparent',
      iconColor: 'text-gray-700 dark:text-gray-300 reading:text-gray-900',
      href: '#',
    },
    {
      icon: Globe,
      title: 'Globalt arbete',
      description: 'Vårt arbete sträcker sig över gränser för en hållbar planet.',
      color: 'bg-[#8FA888]/20 dark:bg-[#5A7C50]/20 reading:bg-transparent',
      iconColor: 'text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900',
      href: '#',
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section ref={ref} className="py-16 bg-gray-50 dark:bg-slate-800 reading:bg-white reading:max-w-3xl reading:mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${isInView ? 'animate-fadeInUp' : ''}`}>
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <a
                key={card.title}
                href={card.href}
                className="group p-6 bg-white dark:bg-slate-700 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 reading:shadow-none reading:border reading:border-gray-300"
                style={{ animationDelay: isInView ? `${index * 0.1}s` : '0s' }}
              >
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center mb-4 reading:hidden`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <h3 className="mb-2 text-gray-900 dark:text-white reading:text-gray-900">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700">
                  {card.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}