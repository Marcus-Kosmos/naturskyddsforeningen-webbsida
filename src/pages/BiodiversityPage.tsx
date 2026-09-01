import { Link } from 'react-router-dom';
import { ArrowRight, Bird, Trees, Mountain, Leaf, Fish, Flower2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MembershipCTA } from '../components/MembershipCTA';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const topics = [
  {
    icon: Trees,
    title: 'Skogen',
    color: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-700 dark:text-green-400',
    text: 'Sverige har en av Europas största skogar, men bara tre procent är formellt skyddad. Vi kämpar för att stoppa avverkning av gammal och värdefull skog och säkerställa att skogsbruket sköts hållbart.',
    img: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
  },
  {
    icon: Mountain,
    title: 'Fjällnaturen',
    color: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-700 dark:text-blue-400',
    text: 'Fjällräven, lämlar och snöleoparden är alla beroende av fjällens karga ekosystem. Klimatförändringar hotar dessa miljöer direkt – vi arbetar för starkare skydd.',
    img: 'https://images.unsplash.com/photo-1641119580222-3e90f9a11287?w=800&q=80',
  },
  {
    icon: Fish,
    title: 'Vatten och hav',
    color: 'bg-cyan-100 dark:bg-cyan-900/30',
    iconColor: 'text-cyan-700 dark:text-cyan-400',
    text: 'Överfiske, övergödning och föroreningar hotar det marina livet. Vi arbetar för marina reservat och ett hållbart fiske längs Sveriges kust och i öppet hav.',
    img: 'https://images.unsplash.com/photo-1440020143730-090579c4d53c?w=800&q=80',
  },
  {
    icon: Flower2,
    title: 'Pollinatörer',
    color: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-700 dark:text-yellow-400',
    text: 'Bin och andra pollinatörer är avgörande för livsmedelsproduktion och ekosystemtjänster. Vi driver på för minskat bekämpningsmedelsanvändande och fler blomrika marker.',
    img: 'https://images.unsplash.com/photo-1686333330383-be7ba34e9fb8?w=800&q=80',
  },
  {
    icon: Bird,
    title: 'Hotade arter',
    color: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-700 dark:text-orange-400',
    text: 'Över 4 000 arter i Sverige är rödlistade. Vi bevakar artskyddet, driver juridiska processer och arbetar med frivillig naturvård för att rädda hotade djur och växter.',
    img: 'https://images.unsplash.com/photo-1650214562914-9db1ae262752?w=800&q=80',
  },
  {
    icon: Leaf,
    title: 'Jordbrukslandskapet',
    color: 'bg-lime-100 dark:bg-lime-900/30',
    iconColor: 'text-lime-700 dark:text-lime-400',
    text: 'Det svenska jordbrukslandskapet har tappat de flesta av sina ängar och hagmarker. Vi arbetar för en jordbrukspolitik som sätter biologisk mångfald i centrum.',
    img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80',
  },
];

const stats = [
  { value: '4 000+', label: 'Rödlistade arter i Sverige' },
  { value: '3%', label: 'Av skogen är formellt skyddad' },
  { value: '70%', label: 'Av jordens biologiska mångfald finns i tropikerna' },
  { value: '1 miljon', label: 'Arter riskerar utrotning globalt' },
];

export function BiodiversityPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      {/* Hero */}
      <section className="relative h-[480px] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1641119580222-3e90f9a11287?w=1600&q=80"
          alt="Fjällräv i svensk natur"
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
            <h1 className="text-white mb-3">Biologisk mångfald</h1>
            <p className="text-white/90 max-w-2xl text-lg">
              Livet på jorden är hotat i en takt utan motstycke i mänsklighetens historia. Vi arbetar för att vända trenden.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Biologisk mångfald handlar om variationen av liv på jorden – ekosystem, arter och genetisk variation.
            Den är grunden för allt mänskligt välstånd: ren luft, rent vatten, mat och klimatreglering.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            Sedan 1909 har Naturskyddsföreningen arbetat för att skydda svenska och globala ekosystem.
            Idag är det mer angeläget än någonsin – enligt FN pågår den sjätte massutrotningen av arter
            och vi befinner oss mitt i en global naturkris.
          </p>
          <Link
            to="/bli-medlem"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5A7C50] text-white rounded-lg hover:bg-[#4A6741] transition-colors"
          >
            Engagera dig <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#5A7C50] dark:bg-[#3A5631]">
        <div
          ref={statsRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              animate={statsInView ? 'visible' : 'hidden'}
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Topic cards */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 dark:text-white mb-4">Våra fokusområden</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
            Vi arbetar brett för att skydda naturens mångfald – från urskog till hav, från pollinatörer till rovdjur.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic, i) => (
              <motion.div
                key={topic.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.08 } } }}
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img src={topic.img} alt={topic.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${topic.color} mb-4`}>
                    <topic.icon className={`w-5 h-5 ${topic.iconColor}`} />
                  </div>
                  <h3 className="text-gray-900 dark:text-white mb-3">{topic.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{topic.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <MembershipCTA />
    </>
  );
}
