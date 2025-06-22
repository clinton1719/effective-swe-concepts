import { Input } from "@/components/ui/input"

type Props = {
  search: string
  setSearch: (value: string) => void
}

export function SearchBar({ search, setSearch }: Props) {
  return (
    <div className="mb-6">
      <Input
        type="text"
        placeholder="Search by title or tag..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />
    </div>
  )
}
