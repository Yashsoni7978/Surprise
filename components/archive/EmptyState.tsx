import { ArchiveCategory } from '@/types/archive';

interface EmptyStateProps {
  category: ArchiveCategory;
}

export function EmptyState({ category }: EmptyStateProps) {
  const getEmptyMessage = () => {
    switch (category) {
      case 'photos':
        return "Photos abhi upload/mapping ke phase me hain.\nThoda wait Riyu 😂";
      case 'birthdays':
        return "Purane birthday messages abhi andar aane baaki hain.";
      case 'chats':
        return "Purani chats toh hain...\nbas unhe yahan lana baaki hai.";
      case 'videos':
        return "Moving memories abhi andar nahi dali.";
      case 'voice-notes':
        return "Ye section baad me dangerous hoga 😂";
      case 'letters':
        return "Jo cheezein sambhal ke rakhi thi...\nwo bhi aayengi.";
      case 'random':
        return "Iska koi proper folder nahi ban sakta 😂";
      case 'favorites':
        return "Sab dekhne ke baad decide karenge\nki kaunse mere favorites hain.";
      default:
        return "Abhi yahan kuch nahi hai 😂";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
      <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mb-8 opacity-50">
        <span className="text-2xl">⏳</span>
      </div>
      <p className="text-lg md:text-xl font-serif text-white/70 whitespace-pre-line leading-relaxed max-w-md">
        {getEmptyMessage()}
      </p>
    </div>
  );
}
