import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, CheckCircle, AlertCircle, XCircle, ChevronLeft, ChevronRight, Grid3x3, Maximize2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';
const braMiljovalLogo = '/images/labels/bra-miljoval.png';
const svanenLogo = '/images/labels/svanen.png';
const euEcolabelLogo = '/images/labels/eu-ecolabel.png';
const kravLogo = '/images/labels/krav.png';
const euOrganicLogo = '/images/labels/eu-organic.png';
const gotsLogo = '/images/labels/gots.png';
const mscLogo = '/images/labels/msc.png';
const fairtradeLogo = '/images/labels/fairtrade.png';
const blaAngelnLogo = '/images/labels/bla-angeln.png';
const greenKeyLogo = '/images/labels/green-key.png';
const tcoCertifiedLogo = '/images/labels/tco-certified.png';
const fscLogo = '/images/labels/fsc.png';
const bluesignLogo = '/images/labels/bluesign.png';

type LabelStatus = 'recommended' | 'limited' | 'insufficient';
type LabelCategory = 'all' | 'food' | 'textile' | 'forest' | 'fishing' | 'electronics' | 'tourism';

interface Label {
  id: string;
  name: string;
  logo: string;
  status: LabelStatus;
  categories: LabelCategory[];
  description: string;
  pros?: string[];
  cons?: string[];
  coverage: string;
}

const labels: Label[] = [
  {
    id: 'bra-miljoval',
    name: 'Bra Miljöval (Falken)',
    logo: braMiljovalLogo,
    status: 'recommended',
    categories: ['all', 'food', 'textile', 'forest', 'electronics'],
    description: 'Naturskyddsföreningens egen märkning som ställer höga miljökrav.',
    pros: [
      'Strikta krav på hela produktens livscykel',
      'Oberoende kontroller',
      'Fokus på både klimat och biologisk mångfald'
    ],
    coverage: 'Livsmedel, textil, pappervaror, el, bensin m.m.'
  },
  {
    id: 'svanen',
    name: 'Svanen',
    logo: svanenLogo,
    status: 'recommended',
    categories: ['all', 'textile', 'forest', 'electronics'],
    description: 'Nordens officiella miljömärkning med höga krav på miljöpåverkan.',
    pros: [
      'Livscykelperspektiv från råvara till avfall',
      'Begränsar farliga ämnen',
      'Regelbundna kontroller'
    ],
    coverage: 'Textil, rengöring, möbler, papper, elektronik m.m.'
  },
  {
    id: 'eu-ecolabel',
    name: 'EU-Ecolabel (EU-blomman)',
    logo: euEcolabelLogo,
    status: 'recommended',
    categories: ['all', 'textile', 'forest', 'electronics'],
    description: 'EU:s officiella miljömärkning som omfattar många produktgrupper.',
    pros: [
      'Gäller i hela EU',
      'Livscykelperspektiv',
      'Tredjepartscertifiering'
    ],
    coverage: 'Textil, elektronik, papper, rengöring, turism m.m.'
  },
  {
    id: 'krav',
    name: 'KRAV',
    logo: kravLogo,
    status: 'recommended',
    categories: ['all', 'food'],
    description: 'Sveriges mest kända miljömärkning för ekologiska livsmedel.',
    pros: [
      'Förbud mot kemiska bekämpningsmedel',
      'Djuromsorgskrav',
      'Regler för antibiotikaanvändning',
      'Klimat- och miljökrav'
    ],
    coverage: 'Livsmedel och restauranger'
  },
  {
    id: 'eu-organic',
    name: 'EU-Organic',
    logo: euOrganicLogo,
    status: 'recommended',
    categories: ['all', 'food'],
    description: 'EU:s officiella märkning för organiska livsmedel.',
    pros: [
      'Förbud mot kemiska bekämpningsmedel',
      'Organisk odling',
      'Djuromsorgskrav',
      'Regler för antibiotikaanvändning'
    ],
    coverage: 'Livsmedel och restauranger'
  },
  {
    id: 'gots',
    name: 'GOTS',
    logo: gotsLogo,
    status: 'recommended',
    categories: ['all', 'textile'],
    description: 'Globalt standardiserat system för organisk textil.',
    pros: [
      'Organisk odling',
      'Förbud mot kemiska bekämpningsmedel',
      'Djuromsorgskrav',
      'Regler för antibiotikaanvändning'
    ],
    coverage: 'Textil och kläder'
  },
  {
    id: 'msc',
    name: 'MSC',
    logo: mscLogo,
    status: 'recommended',
    categories: ['all', 'fishing'],
    description: 'Marine Stewardship Councils märkning för hållbara fiske.',
    pros: [
      'Hållbara fiskepraktiker',
      'Förbud mot överfiske',
      'Regler för fiskepraktiker',
      'Kontroller av fiskeområden'
    ],
    coverage: 'Fiske'
  },
  {
    id: 'fairtrade',
    name: 'Fairtrade',
    logo: fairtradeLogo,
    status: 'recommended',
    categories: ['all', 'food', 'textile'],
    description: 'Internationell märkning för rättvis handel och förbättrade arbetsvillkor.',
    pros: [
      'Rättvis ersättning till producenter',
      'Förbud mot barnarbete',
      'Miljökrav och hållbar odling',
      'Stärker lokala samhällen'
    ],
    coverage: 'Kaffe, te, choklad, bomull, blommor m.m.'
  },
  {
    id: 'bla-angeln',
    name: 'Blå Ängeln',
    logo: blaAngelnLogo,
    status: 'recommended',
    categories: ['all', 'electronics', 'forest'],
    description: 'Tysklands och världens äldsta miljömärkning för miljövänliga produkter.',
    pros: [
      'Strikta miljökrav på produktion',
      'Begränsar farliga ämnen',
      'Energieffektivitet',
      'Livscykelperspektiv'
    ],
    coverage: 'Elektronik, papper, möbler, färg, rengöring m.m.'
  },
  {
    id: 'green-key',
    name: 'Green Key',
    logo: greenKeyLogo,
    status: 'recommended',
    categories: ['all', 'tourism'],
    description: 'Internationell miljömärkning för hotell och turistanläggningar.',
    pros: [
      'Minskad energi- och vattenförbrukning',
      'Hållbar avfallshantering',
      'Miljövänliga inköp',
      'Miljöutbildning av personal'
    ],
    coverage: 'Hotell, vandrarhem, konferensanläggningar m.m.'
  },
  {
    id: 'tco-certified',
    name: 'TCO Certified',
    logo: tcoCertifiedLogo,
    status: 'recommended',
    categories: ['all', 'electronics'],
    description: 'Märkning för hållbara elektronik och IT-produkter.',
    pros: [
      'Energieffektivitet',
      'Låg emmissioner',
      'Hållbar design',
      'Långlivad produkt'
    ],
    coverage: 'Elektronik, IT-produkter, skrivare, skärmar m.m.'
  },
  {
    id: 'fsc',
    name: 'FSC',
    logo: fscLogo,
    status: 'recommended',
    categories: ['all', 'textile', 'forest'],
    description: 'Förenta skogsmärkningssystemet för hållbara skogsbruk.',
    pros: [
      'Hållbar skogsbruk',
      'Förbud mot skogsbruk i skyddade områden',
      'Miljövänliga produktionsmetoder',
      'Stöd för lokala samhällen'
    ],
    coverage: 'Papper, textil, skogsmaterial m.m.'
  },
  {
    id: 'bluesign',
    name: 'Bluesign',
    logo: bluesignLogo,
    status: 'recommended',
    categories: ['all', 'textile'],
    description: 'Märkning för hållbara textilproduktion.',
    pros: [
      'Förbud mot farliga kemikalier',
      'Hållbar design',
      'Miljövänliga produktionsmetoder',
      'Långlivad produkt'
    ],
    coverage: 'Textil, kläder, möbler m.m.'
  },
];

export function LabelingGuideSection() {
  const { ref, isInView } = useInView();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LabelCategory>('all');
  const [expandedLabel, setExpandedLabel] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<LabelStatus | 'all'>('all');
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Number of labels to show per slide in carousel mode
  const labelsPerSlide = 3;

  const categories = [
    { id: 'all' as LabelCategory, label: 'Alla' },
    { id: 'food' as LabelCategory, label: 'Mat & Livsmedel' },
    { id: 'textile' as LabelCategory, label: 'Textil & Kläder' },
    { id: 'forest' as LabelCategory, label: 'Skog & Papper' },
    { id: 'fishing' as LabelCategory, label: 'Fiske' },
    { id: 'electronics' as LabelCategory, label: 'Elektronik' },
    { id: 'tourism' as LabelCategory, label: 'Hotell & Turism' },
  ];

  const statusFilters = [
    { id: 'all' as const, label: 'Alla märkningar', icon: null, color: '' },
    { id: 'recommended' as LabelStatus, label: 'Rekommenderade', icon: CheckCircle, color: 'text-green-600' },
    { id: 'limited' as LabelStatus, label: 'Med begränsningar', icon: AlertCircle, color: 'text-yellow-600' },
    { id: 'insufficient' as LabelStatus, label: 'Inte tillräckliga', icon: XCircle, color: 'text-red-600' },
  ];

  const filteredLabels = labels.filter(label => {
    const matchesSearch = label.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         label.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || label.categories.includes(selectedCategory);
    const matchesStatus = selectedStatus === 'all' || label.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Auto-expand when searching or filtering
  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'all' || selectedStatus !== 'all';
  const showExpandedView = isExpanded || hasActiveFilters;

  // Carousel navigation - scroll one card at a time
  const totalSlides = filteredLabels.length;
  
  // Get visible labels with wrapping
  const getVisibleLabels = () => {
    if (showExpandedView) return filteredLabels;
    
    const visible = [];
    for (let i = 0; i < labelsPerSlide; i++) {
      const index = (currentSlide + i) % filteredLabels.length;
      visible.push(filteredLabels[index]);
    }
    return visible;
  };
  
  const visibleLabels = getVisibleLabels();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getStatusConfig = (status: LabelStatus) => {
    switch (status) {
      case 'recommended':
        return {
          icon: CheckCircle,
          color: 'bg-green-50 dark:bg-green-900/20 reading:bg-green-50 border-green-200 dark:border-green-800',
          textColor: 'text-green-700 dark:text-green-400 reading:text-green-700',
          badgeColor: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400',
        };
      case 'limited':
        return {
          icon: AlertCircle,
          color: 'bg-yellow-50 dark:bg-yellow-900/20 reading:bg-yellow-50 border-yellow-200 dark:border-yellow-800',
          textColor: 'text-yellow-700 dark:text-yellow-400 reading:text-yellow-700',
          badgeColor: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400',
        };
      case 'insufficient':
        return {
          icon: XCircle,
          color: 'bg-red-50 dark:bg-red-900/20 reading:bg-red-50 border-red-200 dark:border-red-800',
          textColor: 'text-red-700 dark:text-red-400 reading:text-red-700',
          badgeColor: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400',
        };
    }
  };

  return (
    <section ref={ref} className="py-16 bg-white dark:bg-slate-900 reading:bg-white reading:max-w-3xl reading:mx-auto">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isInView ? 'animate-fadeInUp' : ''}`}>
        {/* Header */}
        <div className="text-center reading:text-left mb-12">
          <span className="inline-block px-3 py-1 bg-[#8FA888]/20 dark:bg-[#5A7C50]/30 reading:bg-white reading:border reading:border-gray-900 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 rounded-full mb-4">
            Märkningsguide
          </span>
          <h2 className="mb-4 text-gray-900 dark:text-white reading:text-gray-900">
            Navigera bland miljömärkningarna
          </h2>
          <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700 max-w-3xl mx-auto reading:mx-0">
            Det finns hundratals miljömärkningar. Vi har granskat dem och visar vilka du kan lita på.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto reading:mx-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Sök märkning..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 reading:bg-white border border-gray-200 dark:border-gray-700 reading:border-gray-300 rounded-xl reading:rounded-none text-gray-900 dark:text-white reading:text-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5A7C50] dark:focus:ring-[#6B8E65]"
            />
          </div>
        </div>

        {/* Status Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center reading:justify-start">
            {statusFilters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedStatus(filter.id)}
                  className={`px-4 py-2 rounded-full reading:rounded-none border transition-all ${
                    selectedStatus === filter.id
                      ? 'bg-[#5A7C50] text-white border-[#5A7C50] dark:bg-[#6B8E65] dark:border-[#6B8E65]'
                      : 'bg-white dark:bg-gray-800 reading:bg-white text-gray-700 dark:text-gray-300 reading:text-gray-900 border-gray-200 dark:border-gray-700 reading:border-gray-300 hover:border-[#5A7C50] dark:hover:border-[#6B8E65]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    {filter.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center reading:justify-start">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full reading:rounded-none text-sm transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#4A6741] dark:bg-[#5A7C50] text-white'
                    : 'bg-gray-100 dark:bg-gray-800 reading:bg-white reading:border reading:border-gray-300 text-gray-700 dark:text-gray-300 reading:text-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700 reading:hover:bg-gray-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Labels Grid */}
        {filteredLabels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleLabels.map((label) => {
              const statusConfig = getStatusConfig(label.status);
              const StatusIcon = statusConfig.icon;
              const isExpanded = expandedLabel === label.id;

              return (
                <div
                  key={label.id}
                  className={`border-2 rounded-xl reading:rounded-none overflow-hidden transition-all ${statusConfig.color} h-[420px] flex flex-col`}
                >
                  {/* Card Header */}
                  <div className="p-6 bg-white dark:bg-gray-900 reading:bg-white flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <StatusIcon className={`w-5 h-5 ${statusConfig.textColor}`} />
                          <span className={`text-xs px-2 py-1 rounded-full reading:rounded-none ${statusConfig.badgeColor}`}>
                            {label.status === 'recommended' && 'Rekommenderad'}
                            {label.status === 'limited' && 'Begränsad'}
                            {label.status === 'insufficient' && 'Inte tillräcklig'}
                          </span>
                        </div>
                        <h3 className="text-gray-900 dark:text-white reading:text-gray-900 mb-2">
                          {label.name}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <img
                          src={label.logo}
                          alt={label.name}
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700 mb-4 line-clamp-3">
                      {label.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 reading:text-gray-600 mb-4 line-clamp-2">
                      <strong>Omfattar:</strong> {label.coverage}
                    </p>

                    {/* Expand Button */}
                    <button
                      onClick={() => setExpandedLabel(isExpanded ? null : label.id)}
                      className="flex items-center gap-2 text-[#4A6741] dark:text-[#B8D4B0] reading:text-gray-900 hover:underline transition-all mt-auto"
                    >
                      <span>{isExpanded ? 'Visa mindre' : 'Läs mer'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Expandable Content */}
                  {isExpanded && (
                    <div className="px-6 pb-6 bg-white dark:bg-gray-900 reading:bg-white border-t border-gray-200 dark:border-gray-700 reading:border-gray-300">
                      {label.pros && label.pros.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-gray-900 dark:text-white reading:text-gray-900 mb-2">
                            Styrkor:
                          </h4>
                          <ul className="space-y-1">
                            {label.pros.map((pro, index) => (
                              <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 reading:text-gray-700">
                                <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0 text-green-600 dark:text-green-400" />
                                <span className="text-sm">{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {label.cons && label.cons.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-gray-900 dark:text-white reading:text-gray-900 mb-2">
                            Begränsningar:
                          </h4>
                          <ul className="space-y-1">
                            {label.cons.map((con, index) => (
                              <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 reading:text-gray-700">
                                <AlertCircle className="w-4 h-4 mt-1 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />
                                <span className="text-sm">{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 reading:text-gray-600">
              Inga märkningar matchar dina filter. Prova att ändra sökningen eller kategori.
            </p>
          </div>
        )}

        {/* Carousel Navigation */}
        {!showExpandedView && filteredLabels.length > labelsPerSlide && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 bg-[#5A7C50] dark:bg-[#6B8E65] reading:bg-gray-900 text-white rounded-full reading:rounded-none hover:bg-[#4A6741] dark:hover:bg-[#5A7C50] reading:hover:bg-gray-700 transition-all"
              aria-label="Föregående märkningar"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index
                      ? 'bg-[#5A7C50] dark:bg-[#6B8E65] w-8'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Gå till slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-3 bg-[#5A7C50] dark:bg-[#6B8E65] reading:bg-gray-900 text-white rounded-full reading:rounded-none hover:bg-[#4A6741] dark:hover:bg-[#5A7C50] reading:hover:bg-gray-700 transition-all"
              aria-label="Nästa märkningar"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* View Toggle Button */}
        {!hasActiveFilters && filteredLabels.length > labelsPerSlide && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-6 py-3 bg-[#5A7C50] dark:bg-[#6B8E65] reading:bg-gray-900 text-white rounded-full reading:rounded-none hover:bg-[#4A6741] dark:hover:bg-[#5A7C50] reading:hover:bg-gray-700 transition-all"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-5 h-5" />
                  <span>Visa mindre</span>
                </>
              ) : (
                <>
                  <Grid3x3 className="w-5 h-5" />
                  <span>Visa alla {filteredLabels.length} märkningar</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 p-6 bg-[#8FA888]/10 dark:bg-[#5A7C50]/20 reading:bg-gray-50 rounded-xl reading:rounded-none border border-[#5A7C50]/30 dark:border-[#5A7C50]/40 reading:border-gray-300">
          <h3 className="text-gray-900 dark:text-white reading:text-gray-900 mb-3">
            Hur använder jag guiden?
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 reading:text-gray-900">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#4A6741] dark:text-[#B8D4B0]" />
              <span><strong>Rekommenderade:</strong> Märkningar som uppfyller höga miljökrav</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#4A6741] dark:text-[#B8D4B0]" />
              <span><strong>Med begränsningar:</strong> Märkningar som är bättre än inget men har vissa brister</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#4A6741] dark:text-[#B8D4B0]" />
              <span><strong>Inte tillräckliga:</strong> Märkningar som inte lever upp till miljökrav</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}