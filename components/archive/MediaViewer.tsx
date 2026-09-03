'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArchiveItem } from '@/types/archive';
import Image from 'next/image';

interface MediaViewerProps {
  item: ArchiveItem;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export function MediaViewer({ item, onClose, onNext, onPrev, hasNext, hasPrev }: MediaViewerProps) {
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const media = item.media[0]; // Currently supporting single media per item in viewer

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm">
        
        {/* Controls Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-none p-6">
          
          {/* Header */}
          <div className="flex justify-between items-start pointer-events-auto">
            <div className="text-white/70">
              {item.year && <span className="font-serif block">{item.year}</span>}
              {item.date && <span className="text-sm font-sans opacity-50">{item.date}</span>}
            </div>
            <button 
              onClick={onClose}
              className="text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Footer Text */}
          <div className="pointer-events-auto max-w-2xl mx-auto text-center mb-8">
            {item.caption && (
              <p className="font-serif text-lg md:text-xl text-white mb-2">{item.caption}</p>
            )}
            {item.note && (
              <p className="font-sans text-sm md:text-base text-white/50 italic">{item.note}</p>
            )}
          </div>
        </div>

        {/* Navigation Areas */}
        <div className="absolute inset-y-0 left-0 w-1/4 z-10 cursor-w-resize flex items-center" onClick={(e) => { e.stopPropagation(); if (hasPrev && onPrev) onPrev(); }}>
          {hasPrev && (
            <div className="pl-6 text-white/30 hover:text-white transition-colors">
              &larr;
            </div>
          )}
        </div>
        <div className="absolute inset-y-0 right-0 w-1/4 z-10 cursor-e-resize flex items-center justify-end" onClick={(e) => { e.stopPropagation(); if (hasNext && onNext) onNext(); }}>
          {hasNext && (
            <div className="pr-6 text-white/30 hover:text-white transition-colors">
              &rarr;
            </div>
          )}
        </div>

        {/* Media Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center p-12"
          onClick={(e) => e.stopPropagation()}
        >
          {media.type === 'image' || media.type === 'letter' || media.type === 'screenshot' ? (
            <img 
              src={media.src} 
              alt={media.alt || item.title || 'Archive item'} 
              className="max-w-full max-h-full object-contain rounded-md"
            />
          ) : media.type === 'video' ? (
            <video 
              src={media.src} 
              controls 
              poster={media.thumbnail}
              className="max-w-full max-h-full object-contain rounded-md"
            />
          ) : media.type === 'audio' ? (
            <div className="bg-white/10 p-12 rounded-3xl w-full max-w-md flex flex-col items-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-8">
                <span className="text-4xl">🎵</span>
              </div>
              <audio src={media.src} controls className="w-full" />
            </div>
          ) : null}
        </motion.div>
        
      </div>
    </AnimatePresence>
  );
}
