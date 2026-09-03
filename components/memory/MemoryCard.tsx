import { useState } from 'react';
import { Memory, MediaAsset } from '@/types/content';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface MemoryCardProps {
  memory: Memory;
  isActive: boolean;
}

export function MemoryCard({ memory, isActive }: MemoryCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  if (!isActive) return null;

  // Semantic emphasis overrides automatic length checking
  const isHero = memory.emphasis === 'hero' || (memory.text && memory.text.length === 1 && memory.text[0].length < 60 && memory.emphasis !== 'normal');

  const renderMedia = (assets: MediaAsset[], layoutClass = "") => {
    return (
      <div className={cn(
        "w-full flex gap-4 overflow-x-auto no-scrollbar snap-x",
        assets.length > 1 ? "pb-4" : "",
        memory.layout === 'stack' ? "flex-col items-center gap-6" : ""
      )}>
        {assets.map((asset, idx) => {
          const isChat = asset.type === 'chat';
          const isLetter = asset.type === 'letter';
          const isPolaroid = memory.layout === 'polaroid';
          
          return (
            <div 
              key={asset.id || idx}
              className={cn(
                "relative overflow-hidden shrink-0 snap-center transition-all duration-700",
                assets.length > 1 && memory.layout !== 'stack' ? "w-[85%] aspect-square" : "w-full aspect-[4/5] md:aspect-video",
                isPolaroid ? "bg-white p-4 pb-12 shadow-xl rounded-sm rotate-1" : "bg-black/5 rounded-xl shadow-2xl border border-current/10",
                isChat ? "bg-green-900/10 border-green-500/20 aspect-auto min-h-[300px]" : "",
                isLetter ? "bg-amber-50/10 border-amber-500/20 font-serif" : "",
                layoutClass
              )}
            >
              {(asset.src.includes('placeholder') || imgError) ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-current/5 text-current/40 p-4 text-center">
                  <span className="font-serif italic text-sm tracking-widest uppercase opacity-50 mb-2">
                    {isChat ? 'Chat Evidence' : isLetter ? 'Handwritten Letter' : asset.type === 'video' ? 'Video Memory' : 'Awaiting Media'}
                  </span>
                  <span className="font-sans text-xs opacity-30">{asset.alt || 'Content pending'}</span>
                </div>
              ) : (
                <img
                  src={asset.src}
                  alt={asset.alt || "Memory"}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div
      key={memory.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "w-full h-full flex flex-col justify-start items-center p-6 md:p-12 overflow-y-auto no-scrollbar",
        memory.layout === 'fullscreen' ? 'absolute inset-0 z-0' : 'relative z-10'
      )}
    >
      <div className={cn(
        "max-w-2xl w-full mx-auto space-y-10 pb-32 my-auto",
        memory.layout === 'fullscreen' ? 'text-center mt-[15vh]' : ''
      )}>
        {memory.title && (
          <h2 className="text-2xl md:text-3xl font-serif text-current/90 font-light text-center opacity-80">
            {memory.title}
          </h2>
        )}

        {memory.media && memory.media.length > 0 && renderMedia(memory.media)}

        {memory.text && (
          <div className={cn(
            "space-y-6 font-light text-center transition-all duration-1000",
            isHero 
              ? "font-serif text-3xl md:text-5xl leading-tight opacity-90 tracking-wide" 
              : "font-sans text-lg md:text-xl leading-relaxed opacity-80"
          )}>
            {memory.text.map((paragraph, idx) => (
              <motion.p 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 + idx * 0.5, ease: "easeOut" }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        )}

        {memory.caption && (
          <p className="text-current/40 text-sm font-sans italic text-center">
            {memory.caption}
          </p>
        )}

        {/* The Discovery Layer (Reveal) */}
        {memory.reveal && (
          <div className="flex flex-col items-center pt-8 space-y-8">
            {!isRevealed ? (
              <button 
                onClick={() => setIsRevealed(true)}
                className="px-6 py-3 rounded-full border border-current/20 hover:border-current/60 bg-current/5 hover:bg-current/10 text-sm font-sans tracking-widest uppercase transition-all"
              >
                {memory.reveal.buttonLabel}
              </button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center space-y-8 origin-top"
              >
                {memory.reveal.text && (
                  <div className="space-y-4 font-sans text-lg leading-relaxed text-center opacity-80 italic">
                    {memory.reveal.text.map((p, idx) => <p key={idx}>{p}</p>)}
                  </div>
                )}
                {memory.reveal.media && renderMedia(memory.reveal.media)}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
