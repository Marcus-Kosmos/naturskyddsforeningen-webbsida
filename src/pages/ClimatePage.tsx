import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Wind, Sun, Thermometer, Factory, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MembershipCTA } from '../components/MembershipCTA';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const issues = [
  {
    icon: Factory,
    title: 'Industri och energi',
    text: 'Industrin och energisektorn står för en stor del av Sveriges utsläpp. Vi driver på för en snabbare omställning till fossilfri produktion och 100% förnybar el.',
    color: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-700 dark:text-red-400',
  },
  {
    icon: Car,
    title: 'Transport',
    text: 'Vägtrafiken orsakar en fjärdedel av Sveriges koldioxidutsläpp. Vi arbetar för ökad kollektivtrafik, elfordon och minskad bilnorm i städerna.',
    color: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-700 dark:text-orange-400',
  },
  {
    icon: Wind,
    title: 'Vindkraft',
    text: 'Vindkraft är ett av de viktigaste verktygen för att ställa om energisystemet. Vi förespråkar utbyggnad med hänsyn till natur och lokalsamhällen.',
    color: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-700 dark:text-blue-400',
  },
  {
    icon: Sun,
    title: 'Solenergi',
    text: 'Solpaneler på tak och i parker kan bidra enormt till klimatomställningen. Vi verkar för bättre stöd och enklare regler för solkraft.',
    color: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-700 dark:text-yellow-400',
  },
  {
    icon: Zap,
    title: 'Energieffektivisering',
    text: 'Det billigaste och renaste kilowattimmet är det som aldrig används. Vi kräver tuffare energieffektiviseringskrav på byggnader och industri.',
    color: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-700 dark:text-purple-400',
  },
  {
    icon: Thermometer,
    title: 'Klimatanpassning',
    text: 'Klimatförändringarna är redan här. Vi arbetar för att samhället ska anpassas till ökad värme, översvämningar och extremväder – med naturen som verktyg.',
    color: 'bg-teal-100 dark:bg-teal-900/30',
    iconColor: 'text-teal-700 dark:text-teal-400',
  },
];

const timeline = [
  { year: '1992', event: 'FN:s klimatkonvention undertecknas i Rio de Janeiro.' },
  { year: '1997', event: 'Kyotoprotokollet – industriländer åtar sig utsläppsmål.' },
  { year: '2015', event: 'Parisavtalet: max 1,5°C global uppvärmning.' },
  { year: '2021', event: 'Sverige antar mål om netto-nollutsläpp senast 2045.' },
  { year: '2030', event: 'Avgörande år – globala utsläpp måste halveras.' },
  { year: '2045', event: 'Sveriges målår för klimatneutralitet.' },
];

export function ClimatePage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      {/* Hero */}
      <section className="relative h-[480px] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1600&q=80"
          alt="Vindkraftverk i solnedgång"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#5A7C50]/80 text-white text-sm font-medium">
              Lär dig mer
            </span>
            <h1 className="text-white mb-3">Klimat och energi</h1>
            <p className="text-white/90 max-w-2xl text-lg">
              Klimatkrisen är vår tids ödesfråga. Vi arbetar för en snabb och rättvis omställning bort från fossil energi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro text */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Jordens medeltemperatur har redan ökat med ungefär 1,2°C sedan förindustriell tid.
            Konsekvenserna – extremväder, havsnivåhöjning och ekosystemkollaps – är redan synliga världen över.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            Naturskyddsföreningen driver på för att Sverige ska leva upp till Parisavtalet och gå före
            i klimatomställningen. Det kräver snabba utsläppsminskningar inom energi, transport, industri
            och jordbruk – och en politik som tar klimaträttvisa på allvar.
          </p>
          <Link
            to="/bli-medlem"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5A7C50] text-white rounded-lg hover:bg-[#4A6741] transition-colors"
          >
            Gör skillnad <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Issues grid */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 dark:text-white mb-4">Vårt klimatarbete</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
            Vi arbetar politiskt, juridiskt och folkbildande för klimatomställningen på alla nivåer.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map((issue, i) => (
              <motion.div
                key={issue.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.08 } } }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${issue.color} mb-4`}>
                  <issue.icon className={`w-5 h-5 ${issue.iconColor}`} />
                </div>
                <h3 className="text-gray-900 dark:text-white mb-3">{issue.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{issue.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 dark:text-white mb-12">Klimatpolitikens historia</h2>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-[#5A7C50]/30" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.4, delay: i * 0.1 } } }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-16 flex-shrink-0 text-right">
                    <span className="font-bold text-[#5A7C50] dark:text-[#8FA888]">{item.year}</span>
                  </div>
                  <div className="relative flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#5A7C50] mt-1.5 ring-4 ring-white dark:ring-slate-900" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 pt-0.5">{item.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MembershipCTA />
    </>
  );
}
