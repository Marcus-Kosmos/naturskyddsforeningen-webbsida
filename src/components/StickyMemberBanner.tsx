import { useState, useEffect } from 'react';
import { Heart, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function StickyMemberBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has previously dismissed the banner
    const dismissed = localStorage.getItem('memberBannerDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const handleScroll = () => {
      // Show banner after scrolling 800px
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('memberBannerDismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-[#5A7C50] text-white shadow-2xl transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Heart className="w-6 h-6 flex-shrink-0" />
          <div>
            <p className="font-semibold">Bli medlem idag!</p>
            <p className="text-sm text-white/90 hidden sm:block">Stöd vårt arbete för en hållbar framtid</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            to="/bli-medlem"
            className="px-6 py-2 bg-white text-[#5A7C50] rounded-lg hover:bg-gray-100 transition-colors font-semibold whitespace-nowrap"
          >
            Bli medlem
          </Link>
          <button
            onClick={handleDismiss}
            className="p-2 hover:bg-[#4A6741] rounded-lg transition-colors"
            aria-label="Stäng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
