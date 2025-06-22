import { useMemo } from "react";
import Fuse from "fuse.js";
import questions from "@/data/questions.json";

export function useFuzzySearch(query: string) {
  const fuse = useMemo(() => {
    return new Fuse(questions, {
      keys: ["title", "tags", "content"],
      includeScore: true,
      threshold: 0.4, // lower = stricter match
    });
  }, []);

  return useMemo(() => {
    if (!query.trim()) return questions;
    return fuse.search(query).map(result => result.item);
  }, [query, fuse]);
}
