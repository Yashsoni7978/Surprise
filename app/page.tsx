'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CandleGame } from '@/components/opening/CandleGame';

function getDuration() {
  const start = new Date(2019, 6, 30, 0, 0, 0); // July 30, 2019
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    minutes -= 1;
    seconds += 60;
  }
  if (minutes < 0) {
    hours -= 1;
    minutes += 60;
  }
  if (hours < 0) {
    days -= 1;
    hours += 24;
  }
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days, hours, minutes, seconds };
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [duration, setDuration] = useState(getDuration());
  const [isGameCompleted, setIsGameCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the candle game has been completed in this session
    const hasCompleted = sessionStorage.getItem('candleGameCompleted') === 'true';
    setIsGameCompleted(hasCompleted);
    
    setMounted(true);
    const timer = setInterval(() => {
      setDuration(getDuration());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted || isGameCompleted === null) return null; // Prevent hydration mismatch

  if (!isGameCompleted) {
    return (
      <CandleGame 
        onComplete={() => {
          sessionStorage.setItem('candleGameCompleted', 'true');
          setIsGameCompleted(true);
        }} 
      />
    );
  }

  return (
    <AnimatePresence>
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-[#f7f0e4] p-4 relative overflow-hidden"
      >
        
        {/* Subtle ambient glow in the background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[60vw] h-[60vh] bg-[#d4af37]/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-md w-full text-center z-10 flex flex-col items-center">
          
          {/* Riyuuuuu */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-8 relative"
          >
            <h1 className="font-[family-name:var(--font-script)] text-5xl md:text-7xl text-[#fdfbf7] tracking-wider relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Riyuuuuuu
            </h1>
            {/* Subtle tiny heart from design */}
            <span className="absolute -right-6 top-0 text-xl text-[#d4af37]/60 font-sans">♡</span>
            <span className="absolute right-4 -bottom-4 text-sm text-[#d4af37]/40 font-sans">♡</span>
          </motion.div>

          {/* are you ready... */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mb-2"
          >
            <p className="font-serif text-lg md:text-xl text-[#f7f0e4]/80 tracking-wide font-light">
              are you ready to enter in your
            </p>
          </motion.div>

          {/* 25th Year */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
            className="mb-12 flex flex-col items-center leading-none"
          >
            <div className="flex items-start">
              <span className="font-serif text-[120px] md:text-[150px] font-medium text-[#fdfbf7] tracking-tighter drop-shadow-[0_0_25px_rgba(212,175,55,0.15)] leading-none">
                25
              </span>
              <span className="font-serif text-3xl md:text-4xl text-[#d4af37]/90 mt-4 md:mt-6 italic">
                th
              </span>
            </div>
            <div className="flex items-center -mt-6">
              <span className="font-[family-name:var(--font-script)] text-5xl md:text-6xl text-[#d4af37] tracking-wider">
                Year
              </span>
              <span className="text-[#d4af37]/70 font-sans ml-2 text-xl mt-2">♡</span>
            </div>
          </motion.div>

          {/* Live Duration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2.5 }}
            className="flex flex-col items-center space-y-3 mb-10 w-full"
          >
            <p className="font-serif text-[#f7f0e4]/70 tracking-wide text-sm md:text-base">
              out of which
            </p>
            <div className="font-serif text-[#d4af37] text-lg md:text-xl tracking-wider text-center leading-relaxed">
              {duration.years} years, {duration.months} month{duration.months !== 1 ? 's' : ''},<br/>
              {duration.days} days, {duration.hours} hours, {duration.minutes} mins, {duration.seconds} secs
            </div>
            
            <div className="flex items-center justify-center space-x-4 w-full py-2 opacity-30">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
              <span className="text-[#d4af37] text-xs">♡</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
            </div>
            
            <p className="font-serif text-[#f7f0e4]/40 text-xs tracking-widest italic pt-2">
              counting...
            </p>
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.5 }}
            className="mt-6 w-full max-w-[300px]"
          >
            <Link 
              href="/chapter/prologue"
              className="group relative flex items-center justify-center w-full overflow-hidden rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-6 py-4 transition-all hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10"
            >
              {/* Subtle button glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative flex items-center space-x-3 text-[#fdfbf7]/90 font-serif tracking-wide text-sm md:text-base">
                <span className="text-[#d4af37]/80 text-lg">♡</span>
                <span>Aap ready ho toh click karo</span>
                <span className="font-sans font-light opacity-60 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </Link>
          </motion.div>

        </div>
      </motion.main>
    </AnimatePresence>
  );
}
