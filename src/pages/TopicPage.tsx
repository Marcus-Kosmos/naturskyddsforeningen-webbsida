import { Link } from 'react-router-dom';
import { ArrowRight, Construction } from 'lucide-react';
import { MembershipCTA } from '../components/MembershipCTA';

const topicData: Record<string, { title: string; subtitle: string; img: string; intro: string }> = {
  hav: {
    title: 'Hav och vatten',
    subtitle: 'Lär dig mer',
    img: 'https://images.unsplash.com/photo-1440020143730-090579c4d53c?w=1600&q=80',
    intro: 'Hav och sötvatten täcker 70% av jordens yta och är livsviktiga för klimatregleringen och den biologiska mångfalden. Vi arbetar för marina skyddsområden, renare vatten och ett hållbart fiske.',
  },
  konsumtion: {
    title: 'Hållbar konsumtion',
    subtitle: 'Lär dig mer',
    img: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1600&q=80',
    intro: 'Vad vi köper, äter och hur vi reser påverkar planeten enormt. Vi arbetar för en konsumtionspolitik som sätter planetens gränser i centrum – och hjälper konsumenter göra bättre val.',
  },
  jordbruk: {
    title: 'Jordbruk och mat',
    subtitle: 'Lär dig mer',
    img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=80',
    intro: 'Matproduktionen är en av de viktigaste drivkrafterna bakom klimatpåverkan och naturförstöring. Vi kämpar för ett omställt jordbruk som gynnar biologisk mångfald, klimat och djurvälfärd.',
  },
  skog: {
    title: 'Skog och mark',
    subtitle: 'Lär dig mer',
    img: 'https://images.unsplash.com/photo-1669399201888-ceaa45b683ee?w=1600&q=80',
    intro: 'Skogen är hem åt tusentals arter och ett viktigt kolsänka. Vi kämpar för formellt skydd av värdefulla skogar och ett skogsbruk som värnar om naturens egenvärde.',
  },
  engagera: {
    title: 'Engagera dig',
    subtitle: 'Ta steget',
    img: 'https://images.unsplash.com/photo-1686333330383-be7ba34e9fb8?w=1600&q=80',
    intro: 'Det finns många sätt att bidra – som lokalaktivist, digital påverkare eller givare. Tillsammans gör vi skillnad för naturen och kommande generationer.',
  },
};

interface TopicPageProps {
  topic: string;
}

export function TopicPage({ topic }: TopicPageProps) {
  const data = topicData[topic] ?? {
    title: 'Sidan hittades inte',
    subtitle: '',
    img: 'https://images.unsplash.com/photo-1641119580222-3e90f9a11287?w=1600&q=80',
    intro: '',
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-[400px] flex items-end overflow-hidden">
        <img src={data.img} alt={data.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          {data.subtitle && (
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#5A7C50]/80 text-white text-sm font-medium">
              {data.subtitle}
            </span>
          )}
          <h1 className="text-white">{data.title}</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">{data.intro}</p>

          {/* Under construction notice */}
          <div className="flex items-start gap-4 p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-8">
            <Construction className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 dark:text-amber-300 font-medium mb-1">Sidan är under uppbyggnad</p>
              <p className="text-amber-700 dark:text-amber-400 text-sm">
                Det här avsnittet byggs ut med mer innehåll. Kolla in vår{' '}
                <Link to="/nyheter" className="underline hover:text-amber-900 dark:hover:text-amber-200">
                  nyhetssida
                </Link>{' '}
                för senaste nytt.
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#5A7C50] dark:text-[#8FA888] hover:underline"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Tillbaka till startsidan
          </Link>
        </div>
      </section>

      <MembershipCTA />
    </>
  );
}
