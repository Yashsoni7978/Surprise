'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CandleProps {
  id: number;
  isLit: boolean;
  onBlowOut: (id: number) => void;
  style?: React.CSSProperties;
}

export const Candle = React.memo(function Candle({ id, isLit, onBlowOut, style }: CandleProps) {
  const [showSmoke, setShowSmoke] = useState(false);

  // Handle the transition from lit to unlit
  useEffect(() => {
    if (!isLit) {
      setShowSmoke(true);
      const timer = setTimeout(() => setShowSmoke(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isLit]);

  return (
    <div 
      className="absolute flex flex-col items-center justify-end -translate-x-1/2 -translate-y-full"
      style={style}
    >
      {/* Large transparent hit area for mobile thumb tapping */}
      <button
        onPointerDown={(e) => {
          e.stopPropagation();
          if (isLit) onBlowOut(id);
        }}
        disabled={!isLit}
        className={`absolute inset-0 z-10 w-16 h-24 -top-8 -left-7 rounded-full bg-transparent outline-none flex items-center justify-center group focus-visible:ring-2 focus-visible:ring-white/50 ${!isLit ? 'pointer-events-none' : ''}`}
        aria-label={`Candle ${id}, ${isLit ? 'still lit' : 'extinguished'}`}
      >
        <span className="sr-only">Blow out candle {id}</span>
      </button>

      {/* Flame and Smoke Area */}
      <div className="relative w-4 h-12 flex items-end justify-center mb-1">
        
        {/* Flame */}
        <AnimatePresence>
          {isLit && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: [1, 1.1, 0.9, 1.05, 1],
                rotate: [0, -2, 3, -1, 0]
              }}
              exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
              transition={{
                opacity: { duration: 0.5 },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                },
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }
              }}
              className="absolute bottom-0 w-3 h-6 bg-gradient-to-t from-orange-400 via-yellow-300 to-white rounded-[50%_50%_20%_20%] shadow-[0_0_10px_2px_rgba(253,224,71,0.6)]"
              style={{ originY: 1 }}
            />
          )}
        </AnimatePresence>

        {/* Smoke (only shows briefly after blowing out) */}
        <AnimatePresence>
          {showSmoke && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.5, 0], y: -30, scale: 1.5, x: [-2, 5, -5, 2] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute bottom-2 w-2 h-2 rounded-full bg-white/40 blur-sm pointer-events-none"
            />
          )}
        </AnimatePresence>
        
        {/* Wick */}
        <div className="absolute bottom-0 w-[2px] h-2 bg-neutral-800 rounded-t-sm" />
      </div>

      {/* Candle Body */}
      <div className="w-2.5 h-8 bg-gradient-to-b from-[#e3dac9] to-[#c2b29f] rounded-t-sm rounded-b-md shadow-sm relative overflow-hidden">
        {/* Subtle wax drip */}
        <div className="absolute top-0 right-0 w-1 h-3 bg-white/40 rounded-b-full opacity-50" />
      </div>

    </div>
  );
});
