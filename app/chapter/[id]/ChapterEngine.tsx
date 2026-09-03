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
    <div className="absolute inset-0 flex flex-col">
      {/* Progress indicator (subtle) */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-50">
        <motion.div 
          className={`h-full ${chapter.theme === 'light' ? 'bg-black/20' : 'bg-white/20'}`}
          initial={{ width: 0 }}
          animate={{ width: `${((currentMemoryIndex + 1) / chapter.memories.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Memory Content */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <MemoryCard 
            key={chapter.memories[currentMemoryIndex].id}
            memory={chapter.memories[currentMemoryIndex]} 
            isActive={true} 
          />
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-center z-50">
        <button 
          onClick={handlePrev}
          disabled={isFirstMemory && !prevChapterId}
          className={`text-sm font-sans tracking-widest uppercase transition-opacity ${isFirstMemory && !prevChapterId ? 'opacity-0 pointer-events-none' : 'opacity-50 hover:opacity-100'} ${chapter.theme === 'light' ? 'text-black' : 'text-white'}`}
        >
          {chapter.memories[currentMemoryIndex].navigation?.prevLabel || chapter.navigation?.prevLabel || 'Back'}
        </button>
        
        <button 
          onClick={handleNext}
          className={`px-8 py-4 rounded-full border text-sm font-sans tracking-widest uppercase transition-all ${chapter.theme === 'light' ? 'border-black/20 hover:border-black/60 hover:bg-black/5 text-black' : 'border-white/20 hover:border-white/60 hover:bg-white/5 text-white'}`}
        >
          {isLastMemory 
            ? (chapter.memories[currentMemoryIndex].navigation?.nextLabel || chapter.navigation?.nextLabel || 'Continue') 
            : (chapter.memories[currentMemoryIndex].navigation?.nextLabel || 'Next')}
        </button>
      </div>

      {/* Mobile Tap Zones */}
      <div className="absolute inset-0 z-40 flex md:hidden pointer-events-none">
        <div 
          className="w-1/3 h-full pointer-events-auto" 
          onClick={handlePrev} 
        />
        <div 
          className="w-2/3 h-full pointer-events-auto" 
          onClick={handleNext} 
        />
      </div>
    </div>
  );
}
