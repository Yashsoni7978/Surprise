'use client';

import { useState } from 'react';
import { ArchiveItem } from '@/types/archive';
import { MediaViewer } from './MediaViewer';

interface MediaGalleryProps {
  items: ArchiveItem[];
}

export function MediaGallery({ items }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!items || items.length === 0) {
    return null;
  }

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < items.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
        {items.map((item, index) => {
          const media = item.media[0];
          return (
            <div 
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className="relative rounded-xl overflow-hidden cursor-pointer group bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 break-inside-avoid"
            >
              {media.type === 'image' || media.type === 'letter' || media.type === 'screenshot' ? (
                <img 
                  src={media.src} 
                  alt={media.alt || item.title || 'Archive media'} 
                  className="w-full h-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                />
              ) : media.type === 'video' ? (
                <div className="w-full aspect-video relative bg-black/50">
                  {media.thumbnail && (
                    <img 
                      src={media.thumbnail} 
                      alt="Video thumbnail"
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/50 border border-white/50 flex items-center justify-center backdrop-blur-sm">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
              ) : media.type === 'audio' ? (
                <div className="w-full aspect-square flex items-center justify-center bg-black/50">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl group-hover:bg-white/20 transition-colors">
                    🎵
                  </div>
                </div>
              ) : null}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                {item.title && <span className="text-white font-serif text-sm">{item.title}</span>}
                {item.year && <span className="text-white/50 font-sans text-xs">{item.year}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {selectedIndex !== null && (
        <MediaViewer 
          item={items[selectedIndex]}
          onClose={() => setSelectedIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={selectedIndex < items.length - 1}
          hasPrev={selectedIndex > 0}
        />
      )}
    </>
  );
}
