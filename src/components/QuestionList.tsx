import questions from '@/data/questions.json';
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
  const filtered = questions.filter((q) => {
    const matchesTopic = !selectedTopic || q.topic === selectedTopic;
    const query = search.toLowerCase();
    const matchesSearch =
      q.title.toLowerCase().includes(query) ||
      q.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => q.tags.includes(tag));

    return matchesTopic && matchesSearch && matchesTags;
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
        <QuestionCard key={i} question={q} toggleTag={toggleTag} />
      ))}
    </div>
  );
}
