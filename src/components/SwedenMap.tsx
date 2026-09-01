import { useState } from 'react';
const swedenMapImage = '/images/maps/sweden-map.png';

interface SwedenMapProps {
  onCountySelect: (county: string) => void;
  selectedCounty: string;
}

export function SwedenMap({ onCountySelect, selectedCounty }: SwedenMapProps) {
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);

  // Clickable regions positioned to match the map image
  // Coordinates are approximate percentages matching the visual map
  const counties = [
    { name: 'Norrbottens län', region: { top: '2%', left: '45%', width: '35%', height: '18%' } },
    { name: 'Västerbottens län', region: { top: '20%', left: '35%', width: '35%', height: '15%' } },
    { name: 'Jämtlands län', region: { top: '30%', left: '25%', width: '25%', height: '15%' } },
    { name: 'Västernorrlands län', region: { top: '35%', left: '50%', width: '25%', height: '12%' } },
    { name: 'Gävleborgs län', region: { top: '47%', left: '45%', width: '20%', height: '10%' } },
    { name: 'Dalarnas län', region: { top: '42%', left: '28%', width: '18%', height: '12%' } },
    { name: 'Värmlands län', region: { top: '52%', left: '18%', width: '15%', height: '12%' } },
    { name: 'Västra Götalands län', region: { top: '62%', left: '8%', width: '22%', height: '18%' } },
    { name: 'Hallands län', region: { top: '78%', left: '12%', width: '12%', height: '10%' } },
    { name: 'Skåne län', region: { top: '88%', left: '18%', width: '18%', height: '10%' } },
    { name: 'Kronobergs län', region: { top: '75%', left: '28%', width: '12%', height: '10%' } },
    { name: 'Jönköpings län', region: { top: '68%', left: '30%', width: '15%', height: '10%' } },
    { name: 'Kalmar län', region: { top: '70%', left: '45%', width: '12%', height: '18%' } },
    { name: 'Gotlands län', region: { top: '72%', left: '65%', width: '10%', height: '12%' } },
    { name: 'Blekinge län', region: { top: '90%', left: '38%', width: '12%', height: '8%' } },
    { name: 'Östergötlands län', region: { top: '62%', left: '42%', width: '15%', height: '10%' } },
    { name: 'Södermanlands län', region: { top: '56%', left: '38%', width: '15%', height: '10%' } },
    { name: 'Stockholms län', region: { top: '54%', left: '52%', width: '12%', height: '8%' } },
    { name: 'Uppsala län', region: { top: '48%', left: '42%', width: '10%', height: '8%' } },
    { name: 'Västmanlands län', region: { top: '52%', left: '32%', width: '10%', height: '8%' } },
    { name: 'Örebro län', region: { top: '58%', left: '28%', width: '12%', height: '8%' } },
  ];

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      {/* Background: Real Sweden map */}
      <div className="relative w-full max-w-md h-[600px]">
        <img
          src={swedenMapImage}
          alt="Karta över Sverige"
          className="w-full h-full object-contain"
        />
        
        {/* Interactive overlay regions */}
        {counties.map((county) => {
          const isSelected = selectedCounty === county.name;
          const isHovered = hoveredCounty === county.name;
          
          return (
            <button
              key={county.name}
              className={`absolute transition-all duration-200 cursor-pointer rounded-lg ${
                isSelected
                  ? 'bg-[#5A7C50]/40 ring-4 ring-[#5A7C50]'
                  : isHovered
                  ? 'bg-[#8FA888]/50 ring-2 ring-[#8FA888]'
                  : 'bg-transparent hover:bg-white/20'
              }`}
              style={{
                top: county.region.top,
                left: county.region.left,
                width: county.region.width,
                height: county.region.height,
              }}
              onMouseEnter={() => setHoveredCounty(county.name)}
              onMouseLeave={() => setHoveredCounty(null)}
              onClick={() => onCountySelect(county.name)}
              aria-label={`Välj ${county.name}`}
            >
              {(isHovered || isSelected) && (
                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white bg-[#5A7C50]/80 rounded-lg p-1 text-center leading-tight">
                  {county.name.replace(' län', '')}
                </span>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg text-sm">
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Klicka på ett län</strong>
        </p>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <div className="w-4 h-4 bg-[#5A7C50] rounded"></div>
          <span>Valt län</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
          <div className="w-4 h-4 bg-[#8FA888] rounded"></div>
          <span>Hovrar över</span>
        </div>
      </div>
    </div>
  );
}
