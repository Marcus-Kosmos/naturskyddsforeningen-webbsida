import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSlide {
  src: string;
  alt: string;
  caption: string;
}

interface ImageCarouselProps {
  slides: ImageSlide[];
}

export function ImageCarousel({ slides }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative group">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-2xl reading:rounded-none shadow-lg reading:shadow-none h-[32rem]">
        <img
          src={slides[currentIndex].src}
          alt={slides[currentIndex].alt}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        
        {/* Navigation Buttons */}
        {slides.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              aria-label="Föregående bild"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 reading:bg-white hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 reading:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#5A7C50] reading:focus:ring-gray-900"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              aria-label="Nästa bild"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 reading:bg-white hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 reading:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#5A7C50] reading:focus:ring-gray-900"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Slide Counter */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {slides.length}
          </div>
        )}
      </div>

      {/* Caption */}
      <p className="text-gray-500 dark:text-gray-400 reading:text-gray-600 mt-2 italic">
        {slides[currentIndex].caption}
      </p>

      {/* Dots Navigation */}
      {slides.length > 1 && (
        <div className="flex justify-center gap-2 mt-4 reading:hidden">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Gå till bild ${index + 1}`}
              className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#5A7C50] ${
                index === currentIndex
                  ? 'bg-[#5A7C50] dark:bg-[#8FA888] w-8'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}