import { MediaAsset } from './content';

export type ArchiveCategory = 
  | 'photos'
  | 'birthdays'
  | 'chats'
  | 'videos'
  | 'voice-notes'
  | 'letters'
  | 'random'
  | 'favorites';

export interface ArchiveItem {
  id: string;
  type: 'image' | 'video' | 'audio' | 'letter' | 'screenshot' | 'document';
  category: ArchiveCategory;
  title?: string;
  year?: string; // e.g. "2020", "BEFORE US"
  date?: string; // e.g. "09/08/2020"
  media: MediaAsset[];
  caption?: string;
  note?: string; // Yash-written note
  favorite?: boolean;
  tags?: string[];
}

export interface ArchiveData {
  items: ArchiveItem[];
}
