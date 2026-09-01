import { ArrowRight, ShoppingBag, Lightbulb, Recycle } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';

export function SustainabilitySection() {
  const tips = [
    {
      icon: ShoppingBag,
      title: 'Välj hållbart',
      text: 'Köp secondhand, laga och ta hand om det du har. Kvalitet över kvantitet.',
    },
    {
      icon: Lightbulb,
      title: 'Tänk långsiktigt',
      text: 'Välj produkter som håller längre och kan repareras. Bra för plånbok och miljö.',
    },
    {
      icon: Recycle,
      title: 'Cirkulär ekonomi',
      text: 'Stöd företag som arbetar med återvinning och hållbara material.',
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 bg-white dark:bg-slate-900 reading:bg-white reading:max-w-3xl reading:mx-auto">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isInView ? 'animate-fadeInUp' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 reading:grid-cols-1 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1582803824122-f25becf36ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHNob3BwaW5nfGVufDF8fHx8MTc2NTQ4NjM2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Hållbar konsumtion"
              className="rounded-2xl shadow-lg w-full reading:rounded-none reading:shadow-none"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-3 py-1 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-white reading:border reading:border-gray-900 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 rounded-full mb-4">
              Hållbar konsumtion
            </span>
            <h2 className="mb-4 text-gray-900 dark:text-white reading:text-gray-900">
              Smartare val för en bättre framtid
            </h2>
            <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700 mb-6">
              Våra konsumtionsval påverkar klimatet, naturen och människors liv över hela världen. 
              Genom att konsumera smartare kan vi göra verklig skillnad.
            </p>

            <div className="space-y-4 mb-8">
              {tips.map((tip, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 reading:bg-transparent rounded-lg flex items-center justify-center reading:hidden">
                    <tip.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white reading:text-gray-900 mb-1">
                      {tip.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700">
                      {tip.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#hallbarhet"
              className="inline-flex items-center gap-2 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 hover:underline"
            >
              <span>Läs mer om hållbar konsumtion</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}