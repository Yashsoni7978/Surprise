export type MediaType = 'image' | 'video' | 'audio' | 'chat' | 'letter' | 'screenshot';
export type AnimationMood = 'cinematic' | 'romantic' | 'playful' | 'nostalgic' | 'minimal';
export type LayoutType = 'fullscreen' | 'split' | 'card' | 'gallery' | 'chat-flow' | 'polaroid' | 'stack';
export type EmphasisType = 'hero' | 'normal';

export interface MediaAsset {
  id: string;
  type: MediaType;
  src: string; // Path or URL
  alt?: string;
  thumbnail?: string; // For videos
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface Reveal {
  buttonLabel: string;
  text?: string[];
  media?: MediaAsset[];
  secondaryButtonLabel?: string;
}

export interface Memory {
  id: string;
  date?: string; // e.g., "July 30, 2020"
  title?: string;
  text?: string[]; // Array of paragraphs to allow natural spacing
  emphasis?: EmphasisType;
  media?: MediaAsset[];
  caption?: string;
  layout: LayoutType;
  reveal?: Reveal;
  animationPreset?: AnimationMood;
  navigation?: {
    nextLabel?: string;
    prevLabel?: string;
  };
}

export interface Chapter {
  id: string;
  order: number;
  title: string;
  subtitle?: string;
  introText?: string;
  theme: 'dark' | 'light' | 'warm';
  bgMusic?: string; // Path to audio file
  memories: Memory[];
  navigation: {
    nextLabel?: string; // e.g., "Chal aage..."
    prevLabel?: string;
  };
}

export interface StoryData {
  chapters: Chapter[];
  archive: Memory[]; // Separated for lazy loading
}
