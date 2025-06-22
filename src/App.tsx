import { QuestionList } from '@/components/QuestionList';
import { SearchBar } from '@/components/SearchBar';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { SortDropdown } from './components/SortDropdown';
import { ThemeToggle } from './components/ThemeToggle';
import { TagFilter } from './components/TagFilter';

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [sortOrder, setSortOrder] = useState<
    'newest' | 'oldest' | 'difficulty-asc' | 'difficulty-desc' | 'title'
  >('newest');

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen text-foreground bg-background">
      {/* Mobile Sidebar Menu */}
      <div className="md:hidden p-4 flex items-center justify-between border-b">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Menu className="h-4 w-4" />
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              isSidebarVisible={true}
              toggleSidebar={() => {}}
            />
          </SheetContent>
        </Sheet>
        <ThemeToggle />
      </div>

      {/* Collapse toggle button (Desktop only) */}
      <div className="hidden md:flex p-2 items-center border-r">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Desktop Sidebar */}
      {showSidebar && (
        <aside className="hidden md:block w-64 border-r">
          <Sidebar
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            isSidebarVisible={showSidebar}
            toggleSidebar={() => setShowSidebar(false)}
          />
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto max-h-screen">
        <div className="hidden md:flex justify-end mb-4">
          <ThemeToggle />
        </div>

        <SearchBar search={search} setSearch={setSearch} />
        <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <TagFilter selectedTags={selectedTags} toggleTag={toggleTag} />
        <QuestionList
          selectedTopic={selectedTopic}
          search={search}
          selectedTags={selectedTags}
          toggleTag={toggleTag}
          sortOrder={sortOrder}
        />
      </main>
    </div>
  );
}
