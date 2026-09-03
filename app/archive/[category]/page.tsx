import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArchiveCategory } from '@/types/archive';
import { getArchiveItemsByCategory, getFavoriteArchiveItems } from '@/lib/archive';
import { EmptyState } from '@/components/archive/EmptyState';
import { MediaGallery } from '@/components/archive/MediaGallery';
import { PageTransition } from '@/components/archive/PageTransition';

const VALID_CATEGORIES: ArchiveCategory[] = [
  'photos',
  'birthdays',
  'chats',
  'videos',
  'voice-notes',
  'letters',
  'random',
  'favorites'
];

const CATEGORY_META: Record<ArchiveCategory, { title: string; description: string }> = {
  'photos': { title: 'PHOTOS', description: '10 saal ki gallery ko ek jagah rakhna tha. Problem ye hai ki photos khatam hi nahi hoti 😂' },
  'birthdays': { title: 'HAR BIRTHDAY PE TU', description: 'Purane Yash ko thoda wapas bula lete hain 😂' },
  'chats': { title: 'CHAT MEIN HUM', description: 'Jo baatein tab normal lagti thi... ab padh ke hasi aati hai 😂' },
  'videos': { title: 'MOVING MEMORIES', description: 'Photos me hum dikhte the. Videos me hum waise ke waise mil jaate hain.' },
  'voice-notes': { title: 'TERI AWAAZ', description: 'Ye category thodi dangerous hai 😂' },
  'letters': { title: 'JO LIKHA THA', description: 'Jo cheezein delete nahi karni thi... unhe sambhal ke rakha.' },
  'random': { title: 'RANDOM HUM', description: 'Iska koi proper folder nahi ban sakta 😂' },
  'favorites': { title: 'YE WALE MERE HAIN', description: 'Sab memories important hain... par kuch ko main baar baar dekh leta hu.' }
};

interface ArchiveCategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: ArchiveCategoryPageProps) {
  const category = params.category as ArchiveCategory;
  if (!VALID_CATEGORIES.includes(category)) return { title: 'Not Found' };
  return {
    title: `${CATEGORY_META[category].title} | Archive`,
  };
}

export default function ArchiveCategoryPage({ params }: ArchiveCategoryPageProps) {
  const category = params.category as ArchiveCategory;

  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  const meta = CATEGORY_META[category];
  
  const items = category === 'favorites' 
    ? getFavoriteArchiveItems()
    : getArchiveItemsByCategory(category);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20 selection:text-white pb-24">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 p-6 z-40 bg-gradient-to-b from-[#050505] to-transparent">
        <Link 
          href="/archive" 
          className="text-sm font-sans tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity"
        >
          &larr; Archive
        </Link>
      </nav>

      <PageTransition className="max-w-6xl mx-auto px-6 pt-32">
        <header className="mb-16">
          <h1 className="text-3xl md:text-5xl font-serif mb-4">{meta.title}</h1>
          <p className="text-white/50 text-base md:text-lg font-sans max-w-2xl">{meta.description}</p>
        </header>

        {items.length === 0 ? (
          <EmptyState category={category} />
        ) : (
          <MediaGallery items={items} />
        )}
      </PageTransition>
    </div>
  );
}
