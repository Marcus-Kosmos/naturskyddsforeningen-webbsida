import { Link } from 'react-router-dom';
import { ArrowRight, Users, Globe, Scale, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { MembershipCTA } from '../components/MembershipCTA';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

const milestones = [
  { year: '1909', title: 'Grundandet', text: 'Naturskyddsföreningen grundas av en grupp botaniker och zoologer som vill bevara den svenska naturen.' },
  { year: '1962', title: 'Riksorganisation', text: 'Föreningen växer och bildas om till en riksorganisation med lokalföreningar i alla delar av landet.' },
  { year: '1972', title: 'FN:s miljökonferens', text: 'Deltar aktivt i FN:s första miljökonferens i Stockholm – en milstolpe för det globala miljöarbetet.' },
  { year: '1988', title: 'Bra Miljöval', text: 'Märkningssystemet Bra Miljöval lanseras för att hjälpa konsumenter välja miljövänliga produkter.' },
  { year: '2000', title: '100 000 medlemmar', text: 'Föreningen passerar 100 000 medlemmar och stärker sin röst i miljö- och klimatpolitiken.' },
  { year: '2015', title: 'Parisavtalet', text: 'Aktiv påverkanskampanj inför Parisavtalet. Sverige åtar sig ambitiösa klimatmål.' },
  { year: '2025', title: 'Idag', text: 'Över 250 000 medlemmar, 300 lokalföreningar och ett av Europas starkaste miljöcivilsamhällen.' },
];

const values = [
  { icon: Users, title: 'Demokrati', text: 'Vi är en demokratisk folkrörelse. Alla beslut fattas av medlemmar och valda representanter.' },
  { icon: Scale, title: 'Vetenskap', text: 'Vår politik grundas alltid på bästa tillgängliga vetenskapliga kunskap och forskning.' },
  { icon: Globe, title: 'Global solidaritet', text: 'Naturkrisen är global. Vi arbetar för lösningar som är rättvisa för människor i hela världen.' },
  { icon: BookOpen, title: 'Folkbildning', text: 'Kunskap och engagemang är kärnan i vår rörelse. Vi utbildar, informerar och inspirerar.' },
];

export function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[400px] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=80"
          alt="Naturlandskap"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#5A7C50]/80 text-white text-sm font-medium">
              Om oss
            </span>
            <h1 className="text-white mb-3">Om föreningen</h1>
            <p className="text-white/90 max-w-xl">
              Sveriges äldsta och största miljöorganisation, grundad 1909.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Naturskyddsföreningen är en politiskt obunden ideell organisation med över 250 000 medlemmar
            och 300 lokalföreningar. Vi är partipolitiskt obundna och finansieras av medlemsavgifter, gåvor
            och projektmedel.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            Vår vision är en värld där människor lever i harmoni med naturen och inom planetens gränser.
            Vi arbetar för biologisk mångfald, ett stabilt klimat och en hållbar konsumtion – i Sverige och globalt.
          </p>
          <Link
            to="/bli-medlem"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5A7C50] text-white rounded-lg hover:bg-[#4A6741] transition-colors"
          >
            Bli en del av rörelsen <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 dark:text-white mb-12 text-center">Våra grundvärden</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex gap-5 items-start bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#5A7C50]/10 dark:bg-[#5A7C50]/20 flex items-center justify-center">
                  <v.icon className="w-6 h-6 text-[#5A7C50] dark:text-[#8FA888]" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{v.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 dark:text-white mb-12">Vår historia</h2>
          <div className="relative">
            <div className="absolute left-14 top-0 bottom-0 w-0.5 bg-[#5A7C50]/20" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp}
                  className="flex gap-6 items-start"
                >
                  <div className="w-14 flex-shrink-0 text-right">
                    <span className="text-sm font-bold text-[#5A7C50] dark:text-[#8FA888] whitespace-nowrap">{m.year}</span>
                  </div>
                  <div className="relative flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-[#5A7C50] ring-4 ring-white dark:ring-slate-900" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white mb-1">{m.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{m.text}</p>
                  </div>
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
