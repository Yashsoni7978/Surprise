'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArchiveCategory } from '@/types/archive';

interface ArchiveCardProps {
  category: ArchiveCategory;
  title: string;
  description: string;
  className?: string;
  index?: number;
}

const CATEGORY_HINTS: Record<ArchiveCategory, string> = {
  'photos': '📷',
  'birthdays': '🎂',
  'chats': '💬',
  'videos': '🎞️',
  'voice-notes': '🎙️',
  'letters': '📝',
  'random': '🎲',
  'favorites': '⭐'
};

export function ArchiveCard({ category, title, description, className = '', index = 0 }: ArchiveCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className={`relative h-full ${className}`}
    >
      <Link 
        href={`/archive/${category}`}
        className="block h-full p-8 border border-white/10 rounded-2xl bg-[#0a0a0a] hover:bg-white/5 hover:border-white/20 transition-colors group overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity text-6xl pointer-events-none">
          {CATEGORY_HINTS[category]}
        </div>
        
        <div className="flex flex-col h-full justify-between relative z-10">
          <header>
            <h2 className="text-xl md:text-2xl font-serif text-white/90 group-hover:text-white transition-colors mb-4">
              {title}
            </h2>
            <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-white/50 transition-all duration-300 mb-6" />
          </header>
          
          <p className="text-sm md:text-base text-white/50 group-hover:text-white/70 transition-colors leading-relaxed">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

