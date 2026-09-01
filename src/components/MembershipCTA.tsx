import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MembershipCTA() {
  const benefits = [
    'Tidningen Sveriges Natur – 10 nummer/år',
    'Tillgång till alla lokalföreningar',
    'Rabatt på Bra Miljöval-produkter',
    'Delta i våra nätverk och kampanjer',
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#5A7C50] to-[#4A6741] dark:from-gray-900 dark:to-gray-800 reading:from-gray-800 reading:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-white mb-4">
              Bli medlem idag
            </h2>
            <p className="text-white/90 mb-6">
              Som medlem stödjer du vårt arbete för en levande natur och hållbar framtid. Tillsammans är vi starkare.
            </p>
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/bli-medlem" className="flex items-center gap-2 px-6 py-3 bg-white text-[#4A6741] dark:text-[#5A7C50] reading:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                <span>Bli medlem</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/bli-medlem" className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg hover:bg-white/20 transition-colors">
                Läs mer om medlemskapet
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-white mb-2">200 000+</div>
              <p className="text-white/80">Medlemmar</p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-white mb-2">270+</div>
              <p className="text-white/80">Lokalföreningar</p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-white mb-2">115 år</div>
              <p className="text-white/80">Av naturskydd</p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-white mb-2">6 000+</div>
              <p className="text-white/80">Bra Miljöval-produkter</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}