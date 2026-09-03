import { useState } from 'react';
import { Memory, MediaAsset } from '@/types/content';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MemoryCardProps {
  memory: Memory;
  isActive: boolean;
}

// Single image with its own error state
function MediaImage({ asset, className }: { asset: MediaAsset; className?: string }) {
  const [error, setError] = useState(false);
  if (error) return null; // Graceful – just hide broken image, parent decides fallback
  return (
    <img
      src={asset.src}
      alt={asset.alt || 'Memory'}
      className={cn('max-w-full max-h-[50vh] md:max-h-[60vh] object-contain rounded-xl shadow-2xl', className)}
      style={{ width: 'auto', height: 'auto' }}
      onError={() => setError(true)}
    />
  );
}

export function MemoryCard({ memory, isActive }: MemoryCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  if (!isActive) return null;

  // Semantic emphasis overrides automatic length checking
  const isHero =
    memory.emphasis === 'hero' ||
    (memory.text &&
      memory.text.length === 1 &&
      memory.text[0].length < 60 &&
      memory.emphasis !== 'normal');

  const renderMedia = (rawAssets: MediaAsset[]) => {
    // Strip any explicit placeholder references — those memories render text-only
    const assets = rawAssets.filter(asset => !asset.src.includes('placeholder'));
    if (assets.length === 0) return null;

    return (
      <div
        className={cn(
          'w-full flex gap-4 overflow-x-auto no-scrollbar snap-x',
          assets.length > 1 ? 'pb-4' : '',
          memory.layout === 'stack' ? 'flex-col items-center gap-6' : ''
        )}
      >
        {assets.map((asset, idx) => {
          const isChat = asset.type === 'chat';
          const isLetter = asset.type === 'letter';
          const isPolaroid = memory.layout === 'polaroid';

          return (
            <div
              key={asset.id || idx}
              className={cn(
                'relative flex items-center justify-center shrink-0 snap-center transition-all duration-700',
                // Responsive constraints without cropping
                assets.length > 1 && memory.layout !== 'stack'
                  ? 'w-[85%] max-h-[45vh]'
                  : 'w-full max-h-[50vh] md:max-h-[60vh]',
                isPolaroid
                  ? 'bg-white p-4 pb-12 shadow-xl rounded-sm rotate-1'
                  : 'bg-transparent',
                isChat ? 'bg-green-900/10 border border-green-500/20 rounded-xl min-h-[200px]' : '',
                isLetter ? 'bg-amber-50/10 border border-amber-500/20 rounded-xl font-serif' : ''
              )}
            >
              <MediaImage asset={asset} />
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
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={cn(
        // Fill the flex-1 parent, scroll internally so nav never overlaps
        'w-full h-full flex flex-col justify-center items-center p-6 md:p-12 overflow-y-auto no-scrollbar',
        memory.layout === 'fullscreen' ? 'absolute inset-0 z-0' : 'relative z-10'
      )}
    >
      {/* Content block — vertically centered when short, scrollable when tall */}
      <div
        className={cn(
          'max-w-2xl w-full mx-auto flex flex-col gap-8',
          memory.layout === 'fullscreen' ? 'text-center' : ''
        )}
      >
        {memory.title && (
          <h2 className="text-2xl md:text-3xl font-serif text-[#2c2825] font-normal text-center tracking-wide">
            {memory.title}
          </h2>
        )}

        {memory.media && memory.media.length > 0 && renderMedia(memory.media)}

        {memory.text && (
          <div
            className={cn(
              'text-center transition-all duration-1000 flex flex-col gap-4 text-[#2c2825]',
              isHero
                ? 'font-serif text-3xl md:text-5xl leading-tight font-normal tracking-wide opacity-90'
                : 'font-sans text-lg md:text-xl leading-relaxed font-[500] opacity-90'
            )}
          >
            {memory.text.map((paragraph, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 + idx * 0.5, ease: 'easeOut' }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        )}

        {memory.caption && (
          <p className="text-[#7a6f65] text-sm font-[450] font-sans italic text-center opacity-70">
            {memory.caption}
          </p>
        )}

        {/* The Discovery Layer (Reveal) */}
        {memory.reveal && (
          <div className="flex flex-col items-center pt-4 gap-6">
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
                className="w-full flex flex-col items-center gap-6 origin-top"
              >
                {memory.reveal.text && (
                  <div className="flex flex-col gap-4 font-sans text-lg leading-relaxed text-center text-[#2c2825] font-[450] opacity-85 italic">
                    {memory.reveal.text.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
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
