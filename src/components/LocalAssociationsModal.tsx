import { useState, useEffect } from 'react';
import { X, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { SwedenMap } from './SwedenMap';

interface LocalAssociationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Association {
  name: string;
  email: string;
  phone?: string;
  website?: string;
}

const associations: Record<string, Association[]> = {
  Stockholm: [
    {
      name: 'Naturskyddsföreningen i Stockholm',
      email: 'stockholm@naturskyddsforeningen.se',
      phone: '08-702 65 35',
      website: 'https://stockholm.naturskyddsforeningen.se',
    },
  ],
  Göteborg: [
    {
      name: 'Naturskyddsföreningen i Göteborg',
      email: 'goteborg@naturskyddsforeningen.se',
      phone: '031-711 63 90',
      website: 'https://goteborg.naturskyddsforeningen.se',
    },
  ],
  Malmö: [
    {
      name: 'Naturskyddsföreningen i Malmö',
      email: 'malmo@naturskyddsforeningen.se',
      website: 'https://malmo.naturskyddsforeningen.se',
    },
  ],
  Uppsala: [
    {
      name: 'Naturskyddsföreningen i Uppsala',
      email: 'uppsala@naturskyddsforeningen.se',
      website: 'https://uppsala.naturskyddsforeningen.se',
    },
  ],
  Västra_Götaland: [
    {
      name: 'Naturskyddsföreningen i Västra Götaland',
      email: 'vastragotaland@naturskyddsforeningen.se',
      website: 'https://vastragotaland.naturskyddsforeningen.se',
    },
  ],
  Skåne: [
    {
      name: 'Naturskyddsföreningen i Skåne',
      email: 'skane@naturskyddsforeningen.se',
      website: 'https://skane.naturskyddsforeningen.se',
    },
  ],
  Östergötland: [
    {
      name: 'Naturskyddsföreningen i Östergötland',
      email: 'ostergotland@naturskyddsforeningen.se',
      website: 'https://ostergotland.naturskyddsforeningen.se',
    },
  ],
  Jönköping: [
    {
      name: 'Naturskyddsföreningen i Jönköping',
      email: 'jonkoping@naturskyddsforeningen.se',
      website: 'https://jonkoping.naturskyddsforeningen.se',
    },
  ],
  Kronoberg: [
    {
      name: 'Naturskyddsföreningen i Kronoberg',
      email: 'kronoberg@naturskyddsforeningen.se',
      website: 'https://kronoberg.naturskyddsforeningen.se',
    },
  ],
  Kalmar: [
    {
      name: 'Naturskyddsföreningen i Kalmar',
      email: 'kalmar@naturskyddsforeningen.se',
      website: 'https://kalmar.naturskyddsforeningen.se',
    },
  ],
  Gotland: [
    {
      name: 'Naturskyddsföreningen på Gotland',
      email: 'gotland@naturskyddsforeningen.se',
      website: 'https://gotland.naturskyddsforeningen.se',
    },
  ],
  Blekinge: [
    {
      name: 'Naturskyddsföreningen i Blekinge',
      email: 'blekinge@naturskyddsforeningen.se',
      website: 'https://blekinge.naturskyddsforeningen.se',
    },
  ],
  Halland: [
    {
      name: 'Naturskyddsföreningen i Halland',
      email: 'halland@naturskyddsforeningen.se',
      website: 'https://halland.naturskyddsforeningen.se',
    },
  ],
  Värmland: [
    {
      name: 'Naturskyddsföreningen i Värmland',
      email: 'varmland@naturskyddsforeningen.se',
      website: 'https://varmland.naturskyddsforeningen.se',
    },
  ],
  Örebro: [
    {
      name: 'Naturskyddsföreningen i Örebro',
      email: 'orebro@naturskyddsforeningen.se',
      website: 'https://orebro.naturskyddsforeningen.se',
    },
  ],
  Västmanland: [
    {
      name: 'Naturskyddsföreningen i Västmanland',
      email: 'vastmanland@naturskyddsforeningen.se',
      website: 'https://vastmanland.naturskyddsforeningen.se',
    },
  ],
  Dalarna: [
    {
      name: 'Naturskyddsföreningen i Dalarna',
      email: 'dalarna@naturskyddsforeningen.se',
      website: 'https://dalarna.naturskyddsforeningen.se',
    },
  ],
  Gävleborg: [
    {
      name: 'Naturskyddsföreningen i Gävleborg',
      email: 'gavleborg@naturskyddsforeningen.se',
      website: 'https://gavleborg.naturskyddsforeningen.se',
    },
  ],
  Västernorrland: [
    {
      name: 'Naturskyddsföreningen i Västernorrland',
      email: 'vasternorrland@naturskyddsforeningen.se',
      website: 'https://vasternorrland.naturskyddsforeningen.se',
    },
  ],
  Jämtland: [
    {
      name: 'Naturskyddsföreningen i Jämtland',
      email: 'jamtland@naturskyddsforeningen.se',
      website: 'https://jamtland.naturskyddsforeningen.se',
    },
  ],
  Västerbotten: [
    {
      name: 'Naturskyddsföreningen i Västerbotten',
      email: 'vasterbotten@naturskyddsforeningen.se',
      website: 'https://vasterbotten.naturskyddsforeningen.se',
    },
  ],
  Norrbotten: [
    {
      name: 'Naturskyddsföreningen i Norrbotten',
      email: 'norrbotten@naturskyddsforeningen.se',
      website: 'https://norrbotten.naturskyddsforeningen.se',
    },
  ],
};

export function LocalAssociationsModal({ isOpen, onClose }: LocalAssociationsModalProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  // Map län names from the map to association keys
  const mapCountyToRegion = (countyName: string): string => {
    const mapping: Record<string, string> = {
      'Stockholms län': 'Stockholm',
      'Västra Götalands län': 'Västra_Götaland',
      'Skåne län': 'Skåne',
      'Östergötlands län': 'Östergötland',
      'Jönköpings län': 'Jönköping',
      'Kronobergs län': 'Kronoberg',
      'Kalmar län': 'Kalmar',
      'Gotlands län': 'Gotland',
      'Blekinge län': 'Blekinge',
      'Hallands län': 'Halland',
      'Värmlands län': 'Värmland',
      'Örebro län': 'Örebro',
      'Västmanlands län': 'Västmanland',
      'Dalarnas län': 'Dalarna',
      'Gävleborgs län': 'Gävleborg',
      'Västernorrlands län': 'Västernorrland',
      'Jämtlands län': 'Jämtland',
      'Västerbottens län': 'Västerbotten',
      'Norrbottens län': 'Norrbotten',
      'Uppsala län': 'Uppsala',
      'Södermanlands län': 'Södermanland',
    };
    return mapping[countyName] || '';
  };

  // Convert region key back to län name for map
  const mapRegionToCounty = (regionKey: string): string => {
    const reverseMapping: Record<string, string> = {
      'Stockholm': 'Stockholms län',
      'Västra_Götaland': 'Västra Götalands län',
      'Skåne': 'Skåne län',
      'Östergötland': 'Östergötlands län',
      'Jönköping': 'Jönköpings län',
      'Kronoberg': 'Kronobergs län',
      'Kalmar': 'Kalmar län',
      'Gotland': 'Gotlands län',
      'Blekinge': 'Blekinge län',
      'Halland': 'Hallands län',
      'Värmland': 'Värmlands län',
      'Örebro': 'Örebro län',
      'Västmanland': 'Västmanlands län',
      'Dalarna': 'Dalarnas län',
      'Gävleborg': 'Gävleborgs län',
      'Västernorrland': 'Västernorrlands län',
      'Jämtland': 'Jämtlands län',
      'Västerbotten': 'Västerbottens län',
      'Norrbotten': 'Norrbottens län',
      'Uppsala': 'Uppsala län',
      'Södermanland': 'Södermanlands län',
    };
    return reverseMapping[regionKey] || '';
  };

  const handleCountySelect = (countyName: string) => {
    const regionKey = mapCountyToRegion(countyName);
    if (regionKey) {
      setSelectedRegion(regionKey);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSelectedRegion(''); // Reset selection when closing
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const regions = Object.keys(associations).sort();
  const selectedAssociations = selectedRegion ? associations[selectedRegion] : [];

  return (
    <div className="fixed inset-0 z-[100] animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative max-w-3xl mx-auto mt-20 px-4 max-h-[80vh] overflow-y-auto">
        <div className="bg-white dark:bg-slate-800 reading:bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideDown">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#5A7C50] to-[#6B8E65] px-6 py-8">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              aria-label="Stäng"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-8 h-8 text-white" />
              <h2 className="text-white">
                Hitta din lokalförening
              </h2>
            </div>
            <p className="text-white/90">
              Vi finns över hela Sverige. Välj ditt län för att hitta din närmaste lokalförening.
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Region Selector */}
            <div className="mb-6">
              <label
                htmlFor="region-select"
                className="block text-gray-700 dark:text-gray-300 reading:text-gray-900 mb-2"
              >
                Välj län eller region
              </label>
              <select
                id="region-select"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 reading:bg-white border border-gray-300 dark:border-slate-600 reading:border-gray-300 rounded-lg text-gray-900 dark:text-white reading:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5A7C50] cursor-pointer"
              >
                <option value="">-- Välj ett län --</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Association Details */}
            {selectedRegion && selectedAssociations.length > 0 && (
              <div className="space-y-4 animate-fadeInUp">
                {selectedAssociations.map((association, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-slate-700 reading:border-gray-300 rounded-lg p-5 bg-gray-50 dark:bg-slate-700/50 reading:bg-gray-50"
                  >
                    <h3 className="text-gray-900 dark:text-white reading:text-gray-900 mb-4">
                      {association.name}
                    </h3>
                    
                    <div className="space-y-3">
                      {/* Email */}
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-[#5A7C50] dark:text-[#8FA888] flex-shrink-0 mt-0.5" />
                        <a
                          href={`mailto:${association.email}`}
                          className="text-gray-700 dark:text-gray-300 reading:text-gray-700 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors break-all"
                        >
                          {association.email}
                        </a>
                      </div>

                      {/* Phone */}
                      {association.phone && (
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-[#5A7C50] dark:text-[#8FA888] flex-shrink-0 mt-0.5" />
                          <a
                            href={`tel:${association.phone.replace(/\s/g, '')}`}
                            className="text-gray-700 dark:text-gray-300 reading:text-gray-700 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors"
                          >
                            {association.phone}
                          </a>
                        </div>
                      )}

                      {/* Website */}
                      {association.website && (
                        <div className="flex items-start gap-3">
                          <ExternalLink className="w-5 h-5 text-[#5A7C50] dark:text-[#8FA888] flex-shrink-0 mt-0.5" />
                          <a
                            href={association.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 dark:text-gray-300 reading:text-gray-700 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors break-all"
                          >
                            Besök webbplats →
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!selectedRegion && (
              <div className="bg-gray-50 dark:bg-slate-700/30 reading:bg-gray-50 rounded-lg p-4">
                <SwedenMap 
                  onCountySelect={handleCountySelect}
                  selectedCounty={mapRegionToCounty(selectedRegion)}
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-slate-700 reading:border-gray-300 px-6 py-4 bg-gray-50 dark:bg-slate-700/30 reading:bg-gray-50">
            <p className="text-gray-600 dark:text-gray-400 reading:text-gray-700">
              Hittar du inte din lokalförening? Kontakta oss på{' '}
              <a
                href="mailto:info@naturskyddsforeningen.se"
                className="text-[#5A7C50] dark:text-[#8FA888] hover:underline"
              >
                info@naturskyddsforeningen.se
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}