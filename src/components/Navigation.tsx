import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, BookOpen, Globe, Search, User, ChevronDown } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useClickOutside } from '../hooks/useClickOutside';
import { SearchModal } from './SearchModal';
const naturskyddsLogo = '/images/logos/naturskyddsforeningen-dark.png';
const naturskyddsLogoLight = '/images/logos/naturskyddsforeningen-light.png';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Hover delays for better UX
  const openDelayRef = useRef<NodeJS.Timeout | null>(null);
  const closeDelayRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setActiveDropdown(null);
  });

  const learnMoreItems = [
    { label: 'Biologisk mångfald', href: '/biologisk-mangfald' },
    { label: 'Hav och vatten', href: '/hav-och-vatten' },
    { label: 'Hållbar konsumtion', href: '/hallbar-konsumtion' },
    { label: 'Klimat och energi', href: '/klimat' },
    { label: 'Jordbruk och mat', href: '/jordbruk-och-mat' },
    { label: 'Skog och mark', href: '/skog-och-mark' },
  ];

  const engageItems = [
    { label: 'Engagera dig', href: '/engagera-dig' },
    { label: 'Nyheter', href: '/nyheter' },
    { label: 'Bli medlem', href: '/bli-medlem' },
    { label: 'Natursnokarna', href: '/engagera-dig' },
    { label: 'Fältbiologerna', href: '/engagera-dig' },
  ];

  const aboutItems = [
    { label: 'Om föreningen', href: '/om-foreningen' },
    { label: 'Globalt arbete', href: '/om-foreningen' },
    { label: 'Jobba här', href: '/om-foreningen' },
    { label: 'Kontakta oss', href: '/om-foreningen' },
    { label: 'Press', href: '/om-foreningen' },
    { label: 'Bra Miljöval', href: '/om-foreningen' },
    { label: 'Sveriges Natur', href: '/nyheter' },
  ];

  const supportItems = [
    { label: 'Bli medlem', href: '/bli-medlem', highlight: true },
    { label: 'Ge en gåva', href: '/bli-medlem' },
    { label: 'Företag', href: '/bli-medlem' },
    { label: 'Stora gåvor och filantropi', href: '/bli-medlem' },
    { label: 'Testamente', href: '/bli-medlem' },
    { label: 'Butik', href: '/bli-medlem' },
    { label: 'Fler sätt att stödja oss', href: '/bli-medlem' },
  ];

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('reading');
    } else {
      setTheme('light');
    }
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Hover handlers with delays
  const handleMouseEnter = (name: string) => {
    // Clear any pending close
    if (closeDelayRef.current) {
      clearTimeout(closeDelayRef.current);
      closeDelayRef.current = null;
    }
    
    // Open with slight delay
    openDelayRef.current = setTimeout(() => {
      setActiveDropdown(name);
    }, 150);
  };

  const handleMouseLeave = () => {
    // Clear any pending open
    if (openDelayRef.current) {
      clearTimeout(openDelayRef.current);
      openDelayRef.current = null;
    }
    
    // Close with delay so user can move to dropdown
    closeDelayRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent, name: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown(name);
    } else if (e.key === 'Escape') {
      setActiveDropdown(null);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 reading:bg-gray-50/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 reading:border-gray-300 transition-colors shadow-sm">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#5A7C50] focus:text-white focus:rounded-lg"
      >
        Hoppa till innehåll
      </a>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={dropdownRef}>
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-[24px] font-bold">
            <img
              src={theme === 'dark' ? naturskyddsLogo : naturskyddsLogoLight}
              alt="Naturskyddsföreningen"
              className="h-10 w-10"
            />
            <span className="text-gray-900 dark:text-white reading:text-gray-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Naturskyddsföreningen
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            {/* Lär dig mer */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('learn')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleDropdown('learn')}
                onKeyDown={(e) => handleKeyDown(e, 'learn')}
                className="flex items-center gap-1 px-4 py-2 text-gray-700 dark:text-gray-300 reading:text-gray-900 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors text-[20px] font-normal font-bold"
              >
                Lär dig mer
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'learn' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'learn' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2"
                  onMouseEnter={() => handleMouseEnter('learn')}
                  onMouseLeave={handleMouseLeave}
                >
                  {learnMoreItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Engagera dig */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('engage')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleDropdown('engage')}
                onKeyDown={(e) => handleKeyDown(e, 'engage')}
                className="flex items-center gap-1 px-4 py-2 text-gray-700 dark:text-gray-300 reading:text-gray-900 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors text-[20px] font-normal font-bold"
              >
                Engagera dig
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'engage' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'engage' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2"
                  onMouseEnter={() => handleMouseEnter('engage')}
                  onMouseLeave={handleMouseLeave}
                >
                  {engageItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Om oss */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleDropdown('about')}
                onKeyDown={(e) => handleKeyDown(e, 'about')}
                className="flex items-center gap-1 px-4 py-2 text-gray-700 dark:text-gray-300 reading:text-gray-900 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors text-[20px] font-normal font-bold"
              >
                Om oss
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'about' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2"
                  onMouseEnter={() => handleMouseEnter('about')}
                  onMouseLeave={handleMouseLeave}
                >
                  {aboutItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Stöd oss - CTA */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('support')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleDropdown('support')}
                onKeyDown={(e) => handleKeyDown(e, 'support')}
                className="flex items-center gap-1 px-4 py-2 bg-[#5A7C50] hover:bg-[#4A6741] text-white rounded-lg transition-colors text-[20px] font-bold"
              >
                Stöd oss
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'support' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'support' && (
                <div 
                  className="absolute top-full right-0 mt-2 w-64 bg-[#5A7C50] dark:bg-[#4A6741] rounded-lg shadow-xl py-2"
                  onMouseEnter={() => handleMouseEnter('support')}
                  onMouseLeave={handleMouseLeave}
                >
                  {supportItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className={`block px-4 py-3 text-white hover:bg-[#4A6741] dark:hover:bg-[#3A5631] transition-colors border-b border-[#4A6741]/30 last:border-0 ${
                        item.highlight ? 'font-semibold' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right side icons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language switcher */}
            <button
              className="p-2 text-gray-600 dark:text-gray-400 reading:text-gray-900 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors"
              aria-label="Språk"
            >
              <Globe className="w-5 h-5" />
            </button>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-400 reading:text-gray-900 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5A7C50] rounded-lg"
              aria-label="Sök"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User */}
            <button
              className="p-2 text-gray-600 dark:text-gray-400 reading:text-gray-900 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5A7C50] rounded-lg"
              aria-label="Min profil"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 reading:text-gray-900 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5A7C50] rounded-lg"
              aria-label="Byt tema"
            >
              {theme === 'light' && <Sun className="w-5 h-5" />}
              {theme === 'dark' && <Moon className="w-5 h-5" />}
              {theme === 'reading' && <BookOpen className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 reading:hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5A7C50]"
            aria-label={isMenuOpen ? 'Stäng meny' : 'Öppna meny'}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300 reading:text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300 reading:text-gray-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 reading:border-gray-300 bg-white dark:bg-gray-900 reading:bg-gray-50" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            {/* Learn More - Mobile */}
            <div>
              <button
                onClick={() => toggleDropdown('learn-mobile')}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 reading:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 reading:hover:bg-gray-200 transition-colors"
              >
                Lär dig mer
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'learn-mobile' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'learn-mobile' && (
                <div className="pl-4 mt-2 space-y-1">
                  {learnMoreItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => { setActiveDropdown(null); setIsMenuOpen(false); }}
                      className="block px-4 py-2 text-gray-600 dark:text-gray-400 reading:text-gray-700 hover:text-[#5A7C50] dark:hover:text-[#8FA888]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Engage - Mobile */}
            <div>
              <button
                onClick={() => toggleDropdown('engage-mobile')}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 reading:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 reading:hover:bg-gray-200 transition-colors"
              >
                Engagera dig
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'engage-mobile' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'engage-mobile' && (
                <div className="pl-4 mt-2 space-y-1">
                  {engageItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => { setActiveDropdown(null); setIsMenuOpen(false); }}
                      className="block px-4 py-2 text-gray-600 dark:text-gray-400 reading:text-gray-700 hover:text-[#5A7C50] dark:hover:text-[#8FA888]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About - Mobile */}
            <div>
              <button
                onClick={() => toggleDropdown('about-mobile')}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 reading:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 reading:hover:bg-gray-200 transition-colors"
              >
                Om oss
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'about-mobile' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'about-mobile' && (
                <div className="pl-4 mt-2 space-y-1">
                  {aboutItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => { setActiveDropdown(null); setIsMenuOpen(false); }}
                      className="block px-4 py-2 text-gray-600 dark:text-gray-400 reading:text-gray-700 hover:text-[#5A7C50] dark:hover:text-[#8FA888]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Support CTA - Mobile */}
            <div>
              <button
                onClick={() => toggleDropdown('support-mobile')}
                className="flex items-center justify-between w-full px-4 py-3 bg-[#5A7C50] text-white rounded-lg transition-colors"
              >
                Stöd oss
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'support-mobile' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'support-mobile' && (
                <div className="mt-2 bg-[#5A7C50] rounded-lg overflow-hidden">
                  {supportItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => { setActiveDropdown(null); setIsMenuOpen(false); }}
                      className={`block px-4 py-3 text-white hover:bg-[#4A6741] transition-colors border-b border-[#4A6741]/30 last:border-0 ${
                        item.highlight ? 'font-semibold' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile utility buttons */}
            <div className="border-t border-gray-200 dark:border-gray-800 reading:border-gray-300 pt-4 flex items-center justify-around">
              <button
                className="p-3 text-gray-600 dark:text-gray-400 reading:text-gray-900"
                aria-label="Språk"
              >
                <Globe className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-3 text-gray-600 dark:text-gray-400 reading:text-gray-900"
                aria-label="Sök"
              >
                <Search className="w-6 h-6" />
              </button>
              <button
                className="p-3 text-gray-600 dark:text-gray-400 reading:text-gray-900"
                aria-label="Min profil"
              >
                <User className="w-6 h-6" />
              </button>
              <button
                onClick={toggleTheme}
                className="p-3 text-gray-600 dark:text-gray-400 reading:text-gray-900"
                aria-label="Byt tema"
              >
                {theme === 'light' && <Sun className="w-6 h-6" />}
                {theme === 'dark' && <Moon className="w-6 h-6" />}
                {theme === 'reading' && <BookOpen className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}