import Link from 'next/link';
import { ArchiveCard } from '@/components/archive/ArchiveCard';
import { PageTransition } from '@/components/archive/PageTransition';

export const metadata = {
  title: 'Archive | Humari Puri Duniya',
};

export default function ArchiveHomePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-y-auto selection:bg-white/20 selection:text-white pb-24">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 p-6 z-50 mix-blend-difference">
        <Link 
          href="/chapter/ruk-abhi-ek-cheez-aur-hai" 
          className="text-sm font-sans tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity"
        >
          &larr; Story
        </Link>
      </nav>

      <PageTransition className="max-w-5xl mx-auto px-6 pt-32 md:pt-48">
        
        {/* Header */}
        <header className="mb-24 max-w-2xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight mb-8">
            HUMARI PURI DUNIYA
          </h1>
          <div className="space-y-6 text-lg md:text-xl text-white/70 font-sans font-light">
            <p>
              Jo story me fit nahi hua...<br/>
              wo sab yahan hai.
            </p>
            <p className="text-white/50 text-base">
              Photos. Chats. Birthdays. Videos. Voice notes.<br/>
              Aur bohot saari faltu cheezein 😂
            </p>
            <div className="pt-12 space-y-6 text-white/70">
              <p>Ab koi timeline follow nahi karni.</p>
              <p>Bas jo kholna hai khol.<br/>
              Kuch dekh.<br/>
              Kuch yaad kar.<br/>
              Kuch pe has.<br/>
              Kuch pe ruk jana.</p>
              <p className="text-2xl md:text-3xl font-serif text-white pt-8">
                Welcome to the messy version of us 😂
              </p>
            </div>
          </div>
        </header>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
          <ArchiveCard 
            category="photos"
            title="PHOTOS"
            description="10 saal ki gallery ko ek jagah rakhna tha. Problem ye hai ki photos khatam hi nahi hoti 😂"
            className="md:col-span-2 lg:col-span-2 aspect-[2/1] md:aspect-auto md:h-64"
            index={0}
          />
          <ArchiveCard 
            category="birthdays"
            title="HAR BIRTHDAY PE TU"
            description="Purane Yash ko thoda wapas bula lete hain 😂"
            index={1}
          />
          <ArchiveCard 
            category="chats"
            title="CHAT MEIN HUM"
            description="Jo baatein tab normal lagti thi... ab padh ke hasi aati hai 😂"
            index={2}
          />
          <ArchiveCard 
            category="videos"
            title="MOVING MEMORIES"
            description="Photos me hum dikhte the. Videos me hum waise ke waise mil jaate hain."
            index={3}
          />
          <ArchiveCard 
            category="voice-notes"
            title="TERI AWAAZ"
            description="Ye category thodi dangerous hai 😂"
            index={4}
          />
          <ArchiveCard 
            category="letters"
            title="JO LIKHA THA"
            description="Jo cheezein delete nahi karni thi... unhe sambhal ke rakha."
            className="md:col-span-2 lg:col-span-1"
            index={5}
          />
          <ArchiveCard 
            category="random"
            title="RANDOM HUM"
            description="Iska koi proper folder nahi ban sakta 😂"
            index={6}
          />
          <ArchiveCard 
            category="favorites"
            title="YE WALE MERE HAIN"
            description="Sab memories important hain... par kuch ko main baar baar dekh leta hu."
            className="md:col-span-2 lg:col-span-2"
            index={7}
          />
        </div>

        {/* Footer Teaser */}
        <footer className="mt-32 pt-16 border-t border-white/10 text-center space-y-4 max-w-lg mx-auto">
          <p className="text-white/50 text-sm md:text-base font-sans leading-relaxed">
            Bhai...<br/>
            itna sab bana diya hai...<br/>
            aur abhi 2026 bhi baaki hai 😂
          </p>
          <p className="text-white/30 text-sm font-sans">
            Abhi final birthday wali baat nahi.<br/>
            Pehle ye sab dekh.
          </p>
        </footer>

      </PageTransition>
    </div>
  );
}
