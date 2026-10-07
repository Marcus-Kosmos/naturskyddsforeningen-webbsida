import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, BookOpen, Globe, Search, User, ChevronDown } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useClickOutside } from '../hooks/useClickOutside';
import { SearchModal } from './SearchModal';
import { CmsLink } from '../lib/cms/CmsLink';
import { useSite } from '../lib/cms/SiteProvider';
import type { NavGroup } from '../lib/cms/types';
const naturskyddsLogo = '/images/logos/naturskyddsforeningen-dark.png';
const naturskyddsLogoLight = '/images/logos/naturskyddsforeningen-light.png';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { navigation } = useSite();
  
  // Hover delays for better UX
  const openDelayRef = useRef<NodeJS.Timeout | null>(null);
  const closeDelayRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setActiveDropdown(null);
  });

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
            {navigation.groups.map((group) => (
              <DesktopGroup
                key={group._key}
                group={group}
                isActive={activeDropdown === group._key}
                onToggle={() => toggleDropdown(group._key)}
                onKeyDown={(e) => handleKeyDown(e, group._key)}
                onMouseEnter={() => handleMouseEnter(group._key)}
                onMouseLeave={handleMouseLeave}
                onNavigate={() => setActiveDropdown(null)}
              />
            ))}
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
            {navigation.groups.map((group) => (
              <MobileGroup
                key={group._key}
                group={group}
                isActive={activeDropdown === `${group._key}-mobile`}
                onToggle={() => toggleDropdown(`${group._key}-mobile`)}
                onNavigate={() => {
                  setActiveDropdown(null);
                  setIsMenuOpen(false);
                }}
              />
            ))}

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

interface DesktopGroupProps {
  group: NavGroup;
  isActive: boolean;
  onToggle: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onNavigate: () => void;
}

function DesktopGroup({ group, isActive, onToggle, onKeyDown, onMouseEnter, onMouseLeave, onNavigate }: DesktopGroupProps) {
  const isCta = group.variant === 'cta';

  return (
    <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        onClick={onToggle}
        onKeyDown={onKeyDown}
        className={
          isCta
            ? 'flex items-center gap-1 px-4 py-2 bg-[#5A7C50] hover:bg-[#4A6741] text-white rounded-lg transition-colors text-[20px] font-bold'
            : 'flex items-center gap-1 px-4 py-2 text-gray-700 dark:text-gray-300 reading:text-gray-900 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors text-[20px] font-normal font-bold'
        }
      >
        {group.title}
        <ChevronDown className={`w-4 h-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
      </button>
      {isActive && (
        <div
          className={
            isCta
              ? 'absolute top-full right-0 mt-2 w-64 bg-[#5A7C50] dark:bg-[#4A6741] rounded-lg shadow-xl py-2'
              : 'absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2'
          }
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {group.items.map((item) => (
            <CmsLink
              key={item._key ?? item.label}
              link={item.link}
              onClick={onNavigate}
              className={
                isCta
                  ? `block px-4 py-3 text-white hover:bg-[#4A6741] dark:hover:bg-[#3A5631] transition-colors border-b border-[#4A6741]/30 last:border-0 ${
                      item.highlight ? 'font-semibold' : ''
                    }`
                  : `block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#5A7C50] dark:hover:text-[#8FA888] transition-colors ${
                      item.highlight ? 'font-semibold' : ''
                    }`
              }
            >
              {item.label}
            </CmsLink>
          ))}
        </div>
      )}
    </div>
  );
}

interface MobileGroupProps {
  group: NavGroup;
  isActive: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}

function MobileGroup({ group, isActive, onToggle, onNavigate }: MobileGroupProps) {
  const isCta = group.variant === 'cta';

  return (
    <div>
      <button
        onClick={onToggle}
        className={
          isCta
            ? 'flex items-center justify-between w-full px-4 py-3 bg-[#5A7C50] text-white rounded-lg transition-colors'
            : 'flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 reading:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 reading:hover:bg-gray-200 transition-colors'
        }
      >
        {group.title}
        <ChevronDown className={`w-4 h-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
      </button>
      {isActive && (
        <div className={isCta ? 'mt-2 bg-[#5A7C50] rounded-lg overflow-hidden' : 'pl-4 mt-2 space-y-1'}>
          {group.items.map((item) => (
            <CmsLink
              key={item._key ?? item.label}
              link={item.link}
              onClick={onNavigate}
              className={
                isCta
                  ? `block px-4 py-3 text-white hover:bg-[#4A6741] transition-colors border-b border-[#4A6741]/30 last:border-0 ${
                      item.highlight ? 'font-semibold' : ''
                    }`
                  : `block px-4 py-2 text-gray-600 dark:text-gray-400 reading:text-gray-700 hover:text-[#5A7C50] dark:hover:text-[#8FA888] ${
                      item.highlight ? 'font-semibold' : ''
                    }`
              }
            >
              {item.label}
            </CmsLink>
          ))}
        </div>
      )}
    </div>
  );
}
