import { Button } from '@/components/ui/button';
import questions from '@/data/questions.json';

type Props = {
  selectedTopic: string | null;
  setSelectedTopic: (topic: string | null) => void;
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
};

export function Sidebar({
  selectedTopic,
  setSelectedTopic,
  toggleSidebar,
}: Props) {
  const topics = Array.from(new Set(questions.map((q) => q.topic)));

  return (
    <div className="p-4 space-y-2 bg-muted h-full">
      {/* Hide button on desktop */}
      <div className="hidden md:flex justify-end">
        <Button variant="ghost" size="sm" onClick={toggleSidebar}>
          Hide
        </Button>
      </div>

      <h2 className="text-lg font-semibold mb-4">Topics</h2>
      <div className="flex flex-col gap-2">
        <Button
          variant={selectedTopic === null ? 'default' : 'ghost'}
          onClick={() => setSelectedTopic(null)}
        >
          All
        </Button>
        {topics.map((topic) => (
          <Button
            key={topic}
            variant={selectedTopic === topic ? 'default' : 'ghost'}
            onClick={() => setSelectedTopic(topic)}
          >
            {topic}
          </Button>
        ))}
      </div>
    </div>
  );
}
