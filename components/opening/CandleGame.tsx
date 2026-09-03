'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BirthdayCake } from './BirthdayCake';

interface CandleGameProps {
  onComplete: () => void;
}

export function CandleGame({ onComplete }: CandleGameProps) {
  const [phase, setPhase] = useState<'intro' | 'game' | 'celebration'>('intro');
  const [introStep, setIntroStep] = useState(0);
  
  // Game state
  const [litCandles, setLitCandles] = useState<Set<number>>(
    new Set(Array.from({ length: 25 }, (_, i) => i + 1))
  );
  
  // Celebration state
  const [celebrationStep, setCelebrationStep] = useState(0);

  // Intro Sequence
  useEffect(() => {
    if (phase !== 'intro') return;

    const sequence = [
      2000, // Riyu... ruk 😂
      2500, // Birthday hai tera.
      2500, // 25 candles hain.
      2500, // Ek ek karke bujha.
    ];

    let currentTimer: NodeJS.Timeout;

    const runSequence = (step: number) => {
      if (step < sequence.length) {
        currentTimer = setTimeout(() => {
          setIntroStep(step + 1);
          runSequence(step + 1);
        }, sequence[step]);
      } else {
        currentTimer = setTimeout(() => {
          setPhase('game');
        }, 1000);
      }
    };

    runSequence(0);

    return () => clearTimeout(currentTimer);
  }, [phase]);

  // Handle Blow out
  const handleBlowOut = useCallback((id: number) => {
    setLitCandles((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // Handle Global Screen Tap
  const handleGlobalTap = () => {
    if (phase !== 'game' || litCandles.size === 0) return;
    
    setLitCandles((prev) => {
      const next = new Set(prev);
      const available = Array.from(next);
      if (available.length > 0) {
        // Pick a random lit candle to blow out if they just tap the screen
        const randomId = available[Math.floor(Math.random() * available.length)];
        next.delete(randomId);
      }
      return next;
    });
  };

  // Check Game Completion
  useEffect(() => {
    if (phase === 'game' && litCandles.size === 0) {
      setTimeout(() => {
        setPhase('celebration');
      }, 1500); // Small pause after final smoke clears
    }
  }, [litCandles.size, phase]);

  // Celebration Sequence
  useEffect(() => {
    if (phase !== 'celebration') return;

    const currentTimer = setTimeout(() => {
      setCelebrationStep(1); // Show first text
      
      setTimeout(() => {
        setCelebrationStep(2); // Show second text
        
        setTimeout(() => {
          onComplete(); // Transition to main site
        }, 3000);
      }, 2500);
    }, 500);

    return () => clearTimeout(currentTimer);
  }, [phase, onComplete]);

  // Derived state for UI
  const remaining = litCandles.size;
  
  const getMilestoneMessage = (count: number) => {
    if (count === 25) return "Chal start kar 😂";
    if (count === 20) return "Bas 20 aur.";
    if (count === 15) return "Halfway. Itni jaldi thak gayi? 😂";
    if (count === 10) return "Ab toh karna padega.";
    if (count === 5) return "Bas 5 Riyu.";
    if (count === 1) return "Last one…";
    if (count === 0) return "25 candles. Done. 😂";
    return ""; // Empty for other counts
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-[#0a0a0a] text-[#f7f0e4] flex flex-col items-center justify-center overflow-hidden selection:bg-[#d4af37]/20 cursor-pointer"
      onPointerDown={handleGlobalTap}
    >
      
      {/* Intro Phase */}
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center font-serif text-xl md:text-2xl tracking-wide absolute inset-0 p-6 text-center"
          >
            <AnimatePresence mode="wait">
              {introStep === 0 && (
                <motion.p key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
                  Riyu… ruk 😂
                </motion.p>
              )}
              {introStep === 1 && (
                <motion.p key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
                  Birthday hai tera.
                </motion.p>
              )}
              {introStep === 2 && (
                <motion.p key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
                  25 candles hain.
                </motion.p>
              )}
              {introStep === 3 && (
                <motion.p key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
                  Ek ek karke bujha.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Game Phase */}
        {phase !== 'intro' && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center justify-center w-full h-full relative"
          >
            {/* Ambient lighting that dims as candles go out (Optimized for mobile GPU) */}
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-700"
              style={{ 
                opacity: (remaining / 25) * 0.4,
                background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.4) 0%, rgba(10, 10, 10, 0) 70%)'
              }}
            />

            {/* Counter */}
            <div className="w-full text-center mb-12 z-10">
              <p 
                className={`font-sans tracking-widest uppercase text-sm md:text-base transition-colors duration-300 ${remaining === 0 ? 'text-[#d4af37]' : 'text-white/50'}`}
              >
                {remaining === 0 ? "25 candles. Done. 😂" : `${remaining} candle${remaining !== 1 ? 's' : ''} left`}
              </p>
            </div>

            <BirthdayCake litCandles={litCandles} onBlowOut={handleBlowOut} />

            {/* Celebration Text overlay */}
            <AnimatePresence>
              {phase === 'celebration' && celebrationStep > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm p-6 text-center"
                >
                  <AnimatePresence mode="wait">
                    {celebrationStep === 1 && (
                      <motion.p
                        key="celeb-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-serif text-2xl md:text-3xl text-white/90"
                      >
                        Accha... ab officially 25. 😂
                      </motion.p>
                    )}
                    {celebrationStep === 2 && (
                      <motion.p
                        key="celeb-2"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="font-[family-name:var(--font-script)] text-5xl md:text-6xl text-[#d4af37] tracking-wider"
                      >
                        Happy Birthday, Riyu ❤️
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
