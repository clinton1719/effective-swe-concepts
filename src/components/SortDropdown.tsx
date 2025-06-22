import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  sortOrder: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSortOrder: (value: any) => void
}

export function SortDropdown({ sortOrder, setSortOrder }: Props) {
  return (
    <div className="mb-4">
      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="difficulty-asc">Difficulty: Easy → Hard</SelectItem>
          <SelectItem value="difficulty-desc">Difficulty: Hard → Easy</SelectItem>
          <SelectItem value="title">Title A-Z</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
