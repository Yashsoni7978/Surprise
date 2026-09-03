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
    <main className={`min-h-screen relative overflow-hidden transition-colors duration-1000 ${chapter.theme === 'light' ? 'bg-[#f8f9fa] text-zinc-900' : 'bg-cinematic-dark text-cinematic-light'}`}>
      <ChapterEngine 
        chapter={chapter} 
        nextChapterId={nextChapterId}
        prevChapterId={prevChapterId}
      />
    </main>
  );
}
