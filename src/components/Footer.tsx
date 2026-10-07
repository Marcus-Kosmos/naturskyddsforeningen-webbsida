import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LocalAssociationsModal } from './LocalAssociationsModal';
import { useSanityQuery } from '../lib/cms/useSanityQuery';

const naturskyddsLogo = '/images/logos/naturskyddsforeningen-dark.png';
const naturskyddsLogoLight = '/images/logos/naturskyddsforeningen-light.png';

interface SiteSettings {
  tagline?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddressLine1?: string;
  contactAddressLine2?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
}

const SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  tagline, contactEmail, contactPhone,
  contactAddressLine1, contactAddressLine2,
  facebook, instagram, youtube, twitter
}`;

export function Footer() {
  const [isLocalAssociationsOpen, setIsLocalAssociationsOpen] = useState(false);
  const { data: settings } = useSanityQuery<SiteSettings>(SETTINGS_QUERY);

  const tagline = settings?.tagline || 'Sveriges största miljöorganisation sedan 1909.';
  const email = settings?.contactEmail || 'info@naturskyddsforeningen.se';
  const phone = settings?.contactPhone || '08-702 65 00';
  const addr1 = settings?.contactAddressLine1 || 'Box 4625';
  const addr2 = settings?.contactAddressLine2 || '116 91 Stockholm';

  const quickLinks = [
    { label: 'Om föreningen', href: '/om-foreningen' },
    { label: 'Nyheter', href: '/nyheter' },
    { label: 'Bli medlem', href: '/bli-medlem' },
    { label: 'Klimat och energi', href: '/klimat' },
    { label: 'Biologisk mångfald', href: '/biologisk-mangfald' },
  ];

  const resources = [
    { label: 'Hav och vatten', href: '/hav-och-vatten' },
    { label: 'Skog och mark', href: '/skog-och-mark' },
    { label: 'Hållbar konsumtion', href: '/hallbar-konsumtion' },
    { label: 'Jordbruk och mat', href: '/jordbruk-och-mat' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black reading:bg-white reading:border-t reading:border-gray-300 text-white dark:text-gray-300 reading:text-gray-900 pt-12 pb-6 reading:max-w-3xl reading:mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={naturskyddsLogoLight} 
                alt="Naturskyddsföreningen" 
                className="h-10 w-10 dark:hidden reading:block"
              />
              <img 
                src={naturskyddsLogo} 
                alt="Naturskyddsföreningen" 
                className="h-10 w-10 hidden dark:block reading:hidden"
              />
              <span className="reading:text-gray-900">Naturskyddsföreningen</span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 reading:text-gray-700 mb-4">
              {tagline}
            </p>
            <div className="flex gap-3">
              <a
                href={settings?.facebook || '#facebook'}
                className="w-9 h-9 bg-gray-800 dark:bg-gray-900 reading:bg-gray-200 rounded-lg flex items-center justify-center hover:bg-[#5A7C50] dark:hover:bg-[#6B8E65] reading:hover:bg-gray-300 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings?.instagram || '#instagram'}
                className="w-9 h-9 bg-gray-800 dark:bg-gray-900 reading:bg-gray-200 rounded-lg flex items-center justify-center hover:bg-[#5A7C50] dark:hover:bg-[#6B8E65] reading:hover:bg-gray-300 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings?.youtube || '#youtube'}
                className="w-9 h-9 bg-gray-800 dark:bg-gray-900 reading:bg-gray-200 rounded-lg flex items-center justify-center hover:bg-[#5A7C50] dark:hover:bg-[#6B8E65] reading:hover:bg-gray-300 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={settings?.twitter || '#twitter'}
                className="w-9 h-9 bg-gray-800 dark:bg-gray-900 reading:bg-gray-200 rounded-lg flex items-center justify-center hover:bg-[#5A7C50] dark:hover:bg-[#6B8E65] reading:hover:bg-gray-300 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-white reading:text-gray-900">
              Snabblänkar
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 dark:text-gray-500 reading:text-gray-700 hover:text-[#8FA888] dark:hover:text-[#8FA888] reading:hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-white reading:text-gray-900">
              Resurser
            </h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 dark:text-gray-500 reading:text-gray-700 hover:text-[#8FA888] dark:hover:text-[#8FA888] reading:hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-white reading:text-gray-900">
              Kontakt
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-gray-400 reading:text-gray-600 flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${email}`}
                  className="text-gray-400 dark:text-gray-500 reading:text-gray-700 hover:text-green-400 dark:hover:text-green-400 reading:hover:text-gray-900 transition-colors"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-gray-400 reading:text-gray-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 dark:text-gray-500 reading:text-gray-700">
                  {phone}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-400 reading:text-gray-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 dark:text-gray-500 reading:text-gray-700">
                  {addr1}<br />{addr2}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Local Associations CTA */}
        <div className="mb-8 p-6 bg-gradient-to-r from-[#5A7C50] to-[#6B8E65] dark:from-[#4A6741] dark:to-[#5A7C50] reading:from-gray-100 reading:to-gray-200 rounded-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-white reading:text-gray-900 mb-1">
                Hitta din lokalförening
              </h3>
              <p className="text-white/90 reading:text-gray-700">
                Vi finns i alla Sveriges län. Engagera dig lokalt!
              </p>
            </div>
            <button
              onClick={() => setIsLocalAssociationsOpen(true)}
              className="px-6 py-3 bg-white dark:bg-gray-900 reading:bg-[#5A7C50] text-[#5A7C50] dark:text-white reading:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 reading:hover:bg-[#4A6741] transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <MapPin className="w-5 h-5" />
              Välj ditt län
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-800 dark:border-gray-800 reading:border-gray-300">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 dark:text-gray-500 reading:text-gray-600">
              © 2025 Naturskyddsföreningen. Org.nr 802003-1855
            </p>
            <div className="flex gap-6">
              <a
                href="#integritet"
                className="text-gray-400 dark:text-gray-500 reading:text-gray-700 hover:text-[#8FA888] dark:hover:text-[#8FA888] reading:hover:text-gray-900 transition-colors"
              >
                Integritetspolicy
              </a>
              <a
                href="#cookies"
                className="text-gray-400 dark:text-gray-500 reading:text-gray-700 hover:text-[#8FA888] dark:hover:text-[#8FA888] reading:hover:text-gray-900 transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Local Associations Modal */}
      <LocalAssociationsModal 
        isOpen={isLocalAssociationsOpen} 
        onClose={() => setIsLocalAssociationsOpen(false)} 
      />
    </footer>
  );
}