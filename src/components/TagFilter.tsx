import { Badge } from "@/components/ui/badge";
import questions from "@/data/questions.json";

type Props = {
  selectedTags: string[];
  toggleTag: (tag: string) => void;
};

export function TagFilter({ selectedTags, toggleTag }: Props) {
  const tags = Array.from(
    new Set(questions.flatMap((q) => q.tags || []))
  ).sort();

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <Badge
            key={tag}
            variant={isSelected ? "default" : "outline"}
            onClick={() => toggleTag(tag)}
            className="cursor-pointer hover:opacity-80 capitalize"
          >
            {tag}
          </Badge>
        );
      })}
    </div>
  );
}
