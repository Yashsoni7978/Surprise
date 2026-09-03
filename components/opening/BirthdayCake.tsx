'use client';

import { Candle } from './Candle';

interface BirthdayCakeProps {
  litCandles: Set<number>;
  onBlowOut: (id: number) => void;
}

// Pre-calculated positions for 25 candles on top of an elliptical cake surface
// Positions are percentages: x is left-to-right, y is back-to-front (depth)
const CANDLE_POSITIONS = [
  // Back row (7)
  { id: 1, x: 15, y: 15 }, { id: 2, x: 27, y: 12 }, { id: 3, x: 40, y: 10 },
  { id: 4, x: 50, y: 9 }, { id: 5, x: 60, y: 10 }, { id: 6, x: 73, y: 12 }, { id: 7, x: 85, y: 15 },
  
  // Middle row (9)
  { id: 8, x: 10, y: 40 }, { id: 9, x: 20, y: 35 }, { id: 10, x: 30, y: 32 },
  { id: 11, x: 40, y: 30 }, { id: 12, x: 50, y: 29 }, { id: 13, x: 60, y: 30 },
  { id: 14, x: 70, y: 32 }, { id: 15, x: 80, y: 35 }, { id: 16, x: 90, y: 40 },

  // Front row (9)
  { id: 17, x: 12, y: 70 }, { id: 18, x: 22, y: 65 }, { id: 19, x: 32, y: 62 },
  { id: 20, x: 42, y: 59 }, { id: 21, x: 50, y: 58 }, { id: 22, x: 58, y: 59 },
  { id: 23, x: 68, y: 62 }, { id: 24, x: 78, y: 65 }, { id: 25, x: 88, y: 70 },
];

export function BirthdayCake({ litCandles, onBlowOut }: BirthdayCakeProps) {
  return (
    <div className="relative w-64 h-36 md:w-80 md:h-36 mt-20">
      
      {/* Cake Plate */}
      <div className="absolute bottom-[-20px] left-[-10%] w-[120%] h-16 bg-white/5 rounded-[50%] shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10" />

      {/* Cake Base */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-r from-[#2a1c17] via-[#3b2a22] to-[#2a1c17] rounded-b-[50%] shadow-lg border-b border-black/40">
        {/* Frosting drips */}
        <div className="absolute top-0 w-full h-4">
          <div className="absolute left-[10%] w-[15%] h-8 bg-[#fdfbf7] rounded-b-full shadow-sm" />
          <div className="absolute left-[35%] w-[10%] h-6 bg-[#fdfbf7] rounded-b-full shadow-sm" />
          <div className="absolute left-[55%] w-[12%] h-9 bg-[#fdfbf7] rounded-b-full shadow-sm" />
          <div className="absolute left-[80%] w-[8%] h-5 bg-[#fdfbf7] rounded-b-full shadow-sm" />
        </div>
      </div>

      {/* Cake Top Surface */}
      <div className="absolute top-0 left-0 w-full h-24 bg-[#fdfbf7] rounded-[50%] shadow-[inset_0_-2px_10px_rgba(0,0,0,0.1)]">
        
        {/* Candles Container */}
        <div className="absolute inset-0 w-full h-full p-6">
          <div className="relative w-full h-full">
            {CANDLE_POSITIONS.map((pos) => (
              <Candle
                key={pos.id}
                id={pos.id}
                isLit={litCandles.has(pos.id)}
                onBlowOut={onBlowOut}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  zIndex: pos.y // Front row (higher Y) naturally renders above back row
                }}
              />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
