import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const mockResults = [
    { title: 'Biologisk mångfald', category: 'Lär dig mer', url: '#biologisk-mangfald' },
    { title: 'Klimatförändring', category: 'Lär dig mer', url: '#klimat' },
    { title: 'Bra Miljöval', category: 'Märkning', url: '#bra-miljoval' },
    { title: 'Bli volontär', category: 'Engagera dig', url: '#volontar' },
    { title: 'Lokalföreningar', category: 'Engagera dig', url: '#lokalforeningar' },
    { title: 'Sveriges Natur - Tidningen', category: 'Resurser', url: '#sveriges-natur' },
  ];

  const filteredResults = searchQuery
    ? mockResults.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-[100] animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative max-w-2xl mx-auto mt-20 px-4">
        <div className="bg-white dark:bg-slate-800 reading:bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideDown">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 dark:text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Sök på webbplatsen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-16 py-6 bg-transparent border-none outline-none text-gray-900 dark:text-white reading:text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <button
              onClick={onClose}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Stäng sök"
            >
              <X className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </button>
          </div>

          {/* Results */}
          {searchQuery && (
            <div className="border-t border-gray-200 dark:border-slate-700">
              {filteredResults.length > 0 ? (
                <div className="max-h-96 overflow-y-auto">
                  {filteredResults.map((result, index) => (
                    <a
                      key={index}
                      href={result.url}
                      onClick={onClose}
                      className="block px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-gray-900 dark:text-white reading:text-gray-900 group-hover:text-[#5A7C50] dark:group-hover:text-[#8FA888] transition-colors">
                            {result.title}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {result.category}
                          </div>
                        </div>
                        <Search className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  Inga resultat för "{searchQuery}"
                </div>
              )}
            </div>
          )}

          {/* Quick Links (when no search) */}
          {!searchQuery && (
            <div className="border-t border-gray-200 dark:border-slate-700 px-6 py-4">
              <div className="text-gray-500 dark:text-gray-400 mb-3">
                Populära sidor
              </div>
              <div className="flex flex-wrap gap-2">
                {['Bli medlem', 'Bra Miljöval', 'Klimat', 'Biologisk mångfald', 'Volontär'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-4 py-2 bg-gray-100 dark:bg-slate-700 reading:bg-gray-100 text-gray-700 dark:text-gray-300 reading:text-gray-700 rounded-full hover:bg-[#5A7C50] hover:text-white dark:hover:bg-[#6B8E65] transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Hint text */}
        <div className="mt-4 text-center text-gray-400 dark:text-gray-500">
          Tryck <kbd className="px-2 py-1 bg-gray-100 dark:bg-slate-800 rounded">ESC</kbd> för att stänga
        </div>
      </div>
    </div>
  );
}
