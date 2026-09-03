import { notFound } from 'next/navigation';
import { getChapterById, getNextChapterId, getPrevChapterId } from '@/lib/content';
import { ChapterEngine } from './ChapterEngine';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChapterPage({ params }: PageProps) {
  const resolvedParams = await params;
  const chapter = getChapterById(resolvedParams.id);
  
  if (!chapter) {
    notFound();
  }

  const nextChapterId = getNextChapterId(resolvedParams.id);
  const prevChapterId = getPrevChapterId(resolvedParams.id);

  return (
    <main
      className={`min-h-screen relative overflow-hidden transition-colors duration-1000
        bg-[#faf6ee]
        ${chapter.theme === 'dark'
          ? 'text-[#2c2825]'
          : chapter.theme === 'warm'
          ? 'text-[#3d342c]'
          : 'text-[#2c2825]'
        }`}
      style={{ '--chapter-bg': '#faf6ee' } as React.CSSProperties}
    >
      <ChapterEngine
        chapter={chapter}
        nextChapterId={nextChapterId}
        prevChapterId={prevChapterId}
      />
    </main>
  );
}
