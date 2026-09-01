import { useState } from 'react';
import { Check, Heart, Users, Globe, ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

const plans = [
  {
    id: 'student',
    name: 'Student / Ung',
    price: '120',
    period: 'år',
    description: 'För dig under 26 år eller som studerar.',
    color: 'border-blue-300 dark:border-blue-700',
    headerColor: 'bg-blue-50 dark:bg-blue-900/30',
    badge: null,
    perks: [
      'Tillgång till alla utskick och kampanjer',
      'Sveriges Natur (digitalt)',
      'Rösträtt på stämman',
      'Anslutning till lokalförening',
      '10% rabatt i vår butik',
    ],
  },
  {
    id: 'individual',
    name: 'Enskild',
    price: '390',
    period: 'år',
    description: 'Det populäraste alternativet för privatpersoner.',
    color: 'border-[#5A7C50]',
    headerColor: 'bg-[#5A7C50]/10 dark:bg-[#5A7C50]/20',
    badge: 'Populärast',
    perks: [
      'Allt i Student / Ung',
      'Sveriges Natur (print + digitalt)',
      'Prioriterad kundtjänst',
      '15% rabatt i vår butik',
      'Inbjudningar till exklusiva event',
    ],
  },
  {
    id: 'family',
    name: 'Familj',
    price: '590',
    period: 'år',
    description: 'För hela familjen – upp till 4 vuxna på samma adress.',
    color: 'border-purple-300 dark:border-purple-700',
    headerColor: 'bg-purple-50 dark:bg-purple-900/30',
    badge: null,
    perks: [
      'Allt i Enskild',
      'Täcker 4 vuxna',
      'Natursnokarna för barnen',
      '20% rabatt i vår butik',
      'Familjeaktiviteter via lokalförening',
    ],
  },
];

const benefits = [
  { icon: Heart, title: 'Gör skillnad', text: 'Ditt medlemskap finansierar direkta naturvårdsinsatser, juridiska processer och politisk påverkan.' },
  { icon: Users, title: 'Gemenskap', text: 'Bli en del av Sveriges största miljörörelse med 250 000+ medlemmar och 300 lokalföreningar.' },
  { icon: Globe, title: 'Globalt arbete', text: 'Vi arbetar inte bara i Sverige – din röst bidrar till påverkan i EU och FN.' },
];

const faqs = [
  { q: 'Kan jag avsluta mitt medlemskap?', a: 'Ja, du kan säga upp ditt medlemskap när som helst. Det löper på per kalenderår och förnyas automatiskt om du inte säger upp det.' },
  { q: 'Är bidraget avdragsgillt?', a: 'Nej, medlemsavgiften är inte avdragsgill. Däremot kan gåvor till föreningen vara avdragsgilla – kontakta oss för mer information.' },
  { q: 'Vad är Sveriges Natur?', a: 'Sveriges Natur är vår tidning som utkommer fyra gånger per år med reportage om natur, miljö och klimat. Som enskild eller familjemedlem får du den i brevlådan.' },
  { q: 'Hur snabbt börjar mitt medlemskap?', a: 'Ditt medlemskap aktiveras direkt när betalningen är registrerad, normalt inom ett par minuter.' },
];

export function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState('individual');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-[#4A6741] to-[#5A7C50] dark:from-slate-900 dark:to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1669399201888-ceaa45b683ee?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-white mb-4">Bli medlem</h1>
            <p className="text-white/90 text-lg leading-relaxed">
              Tillsammans är vi starka. Varje nytt medlemskap stärker vår förmåga att skydda naturen och stoppa klimatkrisen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#5A7C50]/10 dark:bg-[#5A7C50]/20 mb-4">
                  <b.icon className="w-6 h-6 text-[#5A7C50] dark:text-[#8FA888]" />
                </div>
                <h3 className="text-gray-900 dark:text-white mb-2">{b.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 dark:text-white text-center mb-4">Välj ditt medlemskap</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
            Alla alternativ ger dig fullt medlemskap i Naturskyddsföreningen.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative rounded-2xl border-2 ${plan.color} bg-white dark:bg-slate-900 overflow-hidden cursor-pointer transition-shadow hover:shadow-lg ${
                  selectedPlan === plan.id ? 'ring-2 ring-[#5A7C50] shadow-lg' : ''
                }`}
              >
                {plan.badge && (
                  <div className="absolute top-4 right-4 px-2 py-0.5 bg-[#5A7C50] text-white text-xs font-semibold rounded-full">
                    {plan.badge}
                  </div>
                )}
                <div className={`${plan.headerColor} px-6 py-6`}>
                  <h3 className="text-gray-900 dark:text-white mb-1">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400 mb-1">kr/{plan.period}</span>
                  </div>
                </div>
                <div className="px-6 py-6">
                  <ul className="space-y-3">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Check className="w-4 h-4 text-[#5A7C50] dark:text-[#8FA888] flex-shrink-0 mt-0.5" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#5A7C50] hover:bg-[#4A6741] text-white rounded-xl text-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
              Bli medlem nu
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Säkra betalningar. Avsluta när du vill.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 dark:text-white mb-10 text-center">Vanliga frågor</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-100 dark:border-slate-700 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
