import { useFuzzySearch } from '@/lib/useFuzzySearch';
import { QuestionCard } from './QuestionCard';

type Props = {
  selectedTags: string[];
  selectedTopic: string | null;
  search: string;
  toggleTag: (tag: string) => void;
  sortOrder: string;
};

export function QuestionList({
  selectedTopic,
  search,
  selectedTags,
  toggleTag,
  sortOrder,
}: Props) {
  const fuzzyResults = useFuzzySearch(search);

  const filtered = fuzzyResults.filter((q) => {
    const matchesTopic = !selectedTopic || q.topic === selectedTopic;
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => q.tags.includes(tag));
    return matchesTopic && matchesTags;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'newest') return b.date.localeCompare(a.date);
    if (sortOrder === 'oldest') return a.date.localeCompare(b.date);
    if (sortOrder === 'difficulty-asc')
      return a.difficulty.localeCompare(b.difficulty);
    if (sortOrder === 'difficulty-desc')
      return b.difficulty.localeCompare(a.difficulty);
    if (sortOrder === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div>
      {sorted.map((q, i) => (
        <div key={i} className="mb-6">
          <QuestionCard question={q} toggleTag={toggleTag} />
          {i < sorted.length - 1 && (
            <div className="border-t-2 border-gray-500 mt-6" />
          )}
        </div>
      ))}
    </div>
  );
}
