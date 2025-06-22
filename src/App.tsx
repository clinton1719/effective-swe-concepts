import { QuestionList } from '@/components/QuestionList';
import { SearchBar } from '@/components/SearchBar';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import html2pdf from 'html2pdf.js';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { SortDropdown } from './components/SortDropdown';
import { TagFilter } from './components/TagFilter';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [expandAll, setExpandAll] = useState(false);
  const [sortOrder, setSortOrder] = useState<
    'newest' | 'oldest' | 'difficulty-asc' | 'difficulty-desc' | 'title'
  >('newest');

  function handleDownloadPDF() {
    const element = document.getElementById('print-area');
    if (!element) return;

    const opt = {
      margin: 0.5,
      filename: `swe-questions-${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen text-foreground bg-background">
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
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>

      <div className="hidden md:flex p-2 items-center border-r">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

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

      <main className="flex-1 p-4 md:p-6 overflow-y-auto max-h-screen">
        <div className="hidden md:flex justify-end mb-4 gap-2 no-print">
          <ThemeToggle />
          <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
            Export PDF
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setExpandAll(!expandAll)}
          >
            {expandAll ? 'Collapse all answers' : 'Expand all answers'}
          </Button>
        </div>

        <SearchBar search={search} setSearch={setSearch} />
        <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <TagFilter selectedTags={selectedTags} toggleTag={toggleTag} />
        <div id="print-area">
          <QuestionList
            selectedTopic={selectedTopic}
            search={search}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
            sortOrder={sortOrder}
            expandAll={expandAll}
          />
        </div>
      </main>
    </div>
  );
}
