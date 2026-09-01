import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-8 z-50 p-3 bg-[#5A7C50] hover:bg-[#4A6741] text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 reading:p-4"
          aria-label="Scrolla till toppen"
        >
          <ArrowUp className="w-6 h-6 reading:w-7 reading:h-7" />
        </button>
      )}
    </>
  );
}