'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Chapter } from '@/types/content';
import { MemoryCard } from '@/components/memory/MemoryCard';
import { AnimatePresence, motion } from 'framer-motion';

interface ChapterEngineProps {
  chapter: Chapter;
  nextChapterId: string | null;
  prevChapterId: string | null;
}

export function ChapterEngine({ chapter, nextChapterId, prevChapterId }: ChapterEngineProps) {
  const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);
  const router = useRouter();

  const isLastMemory = currentMemoryIndex === chapter.memories.length - 1;
  const isFirstMemory = currentMemoryIndex === 0;

  const handleNext = () => {
    if (!isLastMemory) {
      setCurrentMemoryIndex(prev => prev + 1);
    } else if (nextChapterId === 'coming-soon') {
      router.push('/archive');
    } else if (nextChapterId === 'birthday') {
      router.push('/birthday');
    } else if (nextChapterId) {
      router.push(`/chapter/${nextChapterId}`);
    }
  };

  const handlePrev = () => {
    if (!isFirstMemory) {
      setCurrentMemoryIndex(prev => prev - 1);
    } else if (prevChapterId) {
      router.push(`/chapter/${prevChapterId}`);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      {/* Progress indicator (subtle) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#2c2825]/8 z-50">
        <motion.div
          className="h-full bg-[#b5a898]/60"
          initial={{ width: 0 }}
          animate={{ width: `${((currentMemoryIndex + 1) / chapter.memories.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Memory Content */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          <MemoryCard 
            key={chapter.memories[currentMemoryIndex].id}
            memory={chapter.memories[currentMemoryIndex]} 
            isActive={true} 
          />
        </AnimatePresence>
      </div>

      {/* Navigation Controls — dedicated shrink-0 footer, never overlaps content */}
      <div
        className="w-full shrink-0 px-5 pb-8 pt-3 md:px-8 md:pb-10 md:pt-5 flex justify-between items-center gap-3 z-50 relative bg-gradient-to-t from-[#faf6ee] via-[#faf6ee]/80 to-transparent"
      >
        {/* BACK — identical pill style to AAGE */}
        <button
          onClick={handlePrev}
          disabled={isFirstMemory && !prevChapterId}
          className={
            `flex items-center gap-1.5 px-6 py-3.5 rounded-full border text-xs font-sans tracking-widest uppercase
             transition-all duration-200
             border-[#2c2825]/22 text-[#2c2825]
             hover:border-[#2c2825]/50 hover:bg-[#2c2825]/[0.04]
             active:bg-[#2c2825]/[0.08] active:scale-[0.97]
             min-w-[90px] justify-center
             ${isFirstMemory && !prevChapterId ? 'opacity-0 pointer-events-none' : 'opacity-100'}`
          }
        >
          <span className="opacity-60">←</span>
          <span>{chapter.memories[currentMemoryIndex].navigation?.prevLabel || chapter.navigation?.prevLabel || 'Back'}</span>
        </button>

        {/* AAGE — same pill style */}
        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-6 py-3.5 rounded-full border text-xs font-sans tracking-widest uppercase
             transition-all duration-200
             border-[#2c2825]/22 text-[#2c2825]
             hover:border-[#2c2825]/50 hover:bg-[#2c2825]/[0.04]
             active:bg-[#2c2825]/[0.08] active:scale-[0.97]
             min-w-[90px] justify-center"
        >
          <span>{isLastMemory
            ? (chapter.memories[currentMemoryIndex].navigation?.nextLabel || chapter.navigation?.nextLabel || 'Continue')
            : (chapter.memories[currentMemoryIndex].navigation?.nextLabel || 'Aage')}</span>
          <span className="opacity-60">→</span>
        </button>
      </div>
    </div>
  );
}

