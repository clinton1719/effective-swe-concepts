import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Question = {
  title: string;
  content: string;
  tags: string[];
  difficulty: string;
  date: string;
  topic: string;
};

export function QuestionCard({
  question,
  toggleTag,
  expand,
}: {
  question: Question;
  toggleTag: (tag: string) => void;
  expand: boolean;
}) {
  const [expanded, setExpanded] = useState(expand || false);

  useEffect(() => {
    setExpanded(expand || false);
  }, [expand]);

  return (
    <Card
      className={cn(
        'transition-all duration-200 hover:shadow-xl hover:border-primary cursor-pointer',
        'bg-white dark:bg-muted'
      )}
    >
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold leading-tight text-foreground">
            {question.title}
          </h2>

          <span className="text-sm text-muted-foreground">
            {new Date(question.date).toLocaleDateString('en-GB')}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <Badge
              key={tag}
              onClick={() => toggleTag(tag)}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              {tag}
            </Badge>
          ))}

          <Badge variant="secondary">{question.difficulty}</Badge>
          <Badge>{question.topic}</Badge>
        </div>

        <div className="text-right">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Hide Answer' : 'Show Answer'}
          </Button>
        </div>

        {expanded && (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {question.content}
            </ReactMarkdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
