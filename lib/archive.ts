import fs from 'fs';
import path from 'path';
import { ArchiveData, ArchiveItem, ArchiveCategory } from '@/types/archive';

const dataDirectory = path.join(process.cwd(), 'content', 'data');

export function getArchiveData(): ArchiveData {
  try {
    const filePath = path.join(dataDirectory, 'archive.json');
    if (!fs.existsSync(filePath)) {
      return { items: [] };
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading archive.json:", error);
    return { items: [] };
  }
}

export function getArchiveItemsByCategory(category: ArchiveCategory): ArchiveItem[] {
  const data = getArchiveData();
  return data.items.filter((item) => item.category === category);
}

export function getFavoriteArchiveItems(): ArchiveItem[] {
  const data = getArchiveData();
  return data.items.filter((item) => item.favorite === true);
}
