import { useEffect, useRef, useState } from 'react';
import { Users, TreePine, Calendar, Shield } from 'lucide-react';

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
  separator?: boolean;
}

function Counter({ end, duration, suffix = '', separator = true }: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const startTime = Date.now();
            const endTime = startTime + duration;

            const updateCount = () => {
              const now = Date.now();
              const progress = Math.min((now - startTime) / duration, 1);
              
              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentCount = Math.floor(easeOutQuart * end);
              
              setCount(currentCount);

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                setCount(end);
              }
            };

            requestAnimationFrame(updateCount);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  const formatNumber = (num: number) => {
    if (separator) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    return num.toString();
  };

  return (
    <div ref={counterRef} className="tabular-nums">
      {formatNumber(count)}
      {suffix}
    </div>
  );
}

export function ImpactSection() {
  const stats = [
    {
      icon: Users,
      value: 226000,
      suffix: '',
      label: 'Medlemmar',
      description: 'Sveriges största miljöorganisation',
    },
    {
      icon: Shield,
      value: 350,
      suffix: '+',
      label: 'Skyddade områden',
      description: 'Nationalparker och naturreservat',
    },
    {
      icon: TreePine,
      value: 45000,
      suffix: '',
      label: 'Hektar natur',
      description: 'Bevarad för kommande generationer',
    },
    {
      icon: Calendar,
      value: 116,
      suffix: '',
      label: 'År av arbete',
      description: 'Sedan 1909',
      separator: false,
    },
  ];

  return (
    <section className="py-16 bg-transparent dark:from-slate-900 dark:to-slate-800 reading:from-white reading:to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 dark:text-white reading:text-gray-900 mb-4">
            Vår påverkan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700 max-w-2xl mx-auto">
            Tillsammans gör vi skillnad för naturen och klimatet. Här är några resultat av vårt arbete.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 reading:bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#5A7C50] dark:bg-[#6B8E65] reading:bg-[#5A7C50] rounded-full mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl text-[#5A7C50] dark:text-[#8FA888] reading:text-[#5A7C50] mb-2">
                  <Counter 
                    end={stat.value} 
                    duration={2000} 
                    suffix={stat.suffix}
                    separator={stat.separator !== false}
                  />
                </div>
                <h3 className="text-gray-900 dark:text-white reading:text-gray-900 mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}