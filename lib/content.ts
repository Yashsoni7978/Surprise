import fs from 'fs';
import path from 'path';
import { Chapter, StoryData } from '@/types/content';

const dataDirectory = path.join(process.cwd(), 'content', 'data');

export function getChapters(): Chapter[] {
  try {
    const filePath = path.join(dataDirectory, 'chapters.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading chapters.json:", error);
    return [];
  }
}

export function getChapterById(id: string): Chapter | undefined {
  const chapters = getChapters();
  return chapters.find((chapter) => chapter.id === id);
}

export function getNextChapterId(currentId: string): string | null {
  const chapters = getChapters();
  const currentIndex = chapters.findIndex((c) => c.id === currentId);
  
  if (currentIndex === -1 || currentIndex === chapters.length - 1) {
    return null;
  }
  
  return chapters[currentIndex + 1].id;
}

export function getPrevChapterId(currentId: string): string | null {
  const chapters = getChapters();
  const currentIndex = chapters.findIndex((c) => c.id === currentId);
  
  if (currentIndex <= 0) {
    return null;
  }
  
  return chapters[currentIndex - 1].id;
}
