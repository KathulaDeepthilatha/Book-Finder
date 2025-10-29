import { useState, useEffect, useMemo } from "react";
import { BookOpen, Loader2 } from "lucide-react";
import { SearchBar } from "../components/SearchBar";
import { CategoryTabs } from "../components/CategoryTabs";
import { BookCard } from "../components/BookCard";
import { Pagination } from "../components/Pagination";

const BOOKS_PER_PAGE = 12;
// Limits to avoid excessive requests / memory usage
const FETCH_PAGE_LIMIT = 100; 
const MAX_FETCH_PAGES = 5; 
const MAX_FETCH_ITEMS = 500; 

const categoryKeywords = {
  fiction: ["novel", "fiction", "story", "tale", "short story"],
  science: [
    "science",
    "physics",
    "chemistry",
    "biology",
    "engineering",
    "mathematics",
  ],
  history: [
    "history",
    "historical",
    "war",
    "civilization",
    "ancient",
    "medieval",
  ],
  biography: ["biography", "memoir", "life", "autobiography"],
  children: [
    "children",
    "kids",
    "juvenile",
    "young",
    "picture book",
    "storybook",
  ],
};

const matchesCategory = (title = "", categoryId) => {
  if (!title) return false;
  const t = title.toLowerCase();
  const keywords = categoryKeywords[categoryId] || [];
  return keywords.some((kw) => t.includes(kw));
};

const Home = () => {
  const [allBooks, setAllBooks] = useState([]); // all fetched books for current query
  const [filteredBooks, setFilteredBooks] = useState([]); // after applying category filter
  const [activeCategory, setActiveCategory] = useState("all"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (query) => {
    if (!query?.trim()) return;
    setLoading(true);
    try {
      const encoded = encodeURIComponent(query);
      // Fetch first page to learn numFound
      const firstResp = await fetch(
        `https://openlibrary.org/search.json?q=${encoded}&limit=${FETCH_PAGE_LIMIT}&page=1`
      );
      const firstData = await firstResp.json();
      let merged = firstData.docs || [];
      const remoteTotal = firstData.numFound || merged.length;
      // compute remote pages and cap
      const remotePages = Math.ceil(remoteTotal / FETCH_PAGE_LIMIT);
      const pagesToFetch = Math.min(MAX_FETCH_PAGES, remotePages);

      // sequentially fetch remaining pages (2..pagesToFetch)
      for (let p = 2; p <= pagesToFetch; p++) {
        if (merged.length >= MAX_FETCH_ITEMS) break;
        try {
          const resp = await fetch(
            `https://openlibrary.org/search.json?q=${encoded}&limit=${FETCH_PAGE_LIMIT}&page=${p}`
          );
          const data = await resp.json();
          merged = merged.concat(data.docs || []);
        } catch (err) {
          // stop on errors but keep what we have
          console.error("Partial fetch error for page", p, err);
          break;
        }
      }

      // enforce hard cap
      if (merged.length > MAX_FETCH_ITEMS)
        merged = merged.slice(0, MAX_FETCH_ITEMS);

      setAllBooks(merged);
      setTotalResults(merged.length);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // initial fetch
  useEffect(() => {
    fetchBooks("popular");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recompute filteredBooks when allBooks or activeCategory changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredBooks(allBooks);
      setTotalResults(allBooks.length);
    } else {
      const filtered = allBooks.filter((b) =>
        matchesCategory(b.title, activeCategory)
      );
      setFilteredBooks(filtered);
      setTotalResults(filtered.length);
    }
    setCurrentPage(1);
  }, [allBooks, activeCategory]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search term.");
      return;
    }
    fetchBooks(searchQuery);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // no new fetch — filter client-side from allBooks. If you want to re-fetch server-side, call fetchBooks(searchQuery || 'popular')
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(totalResults / BOOKS_PER_PAGE);

  // Items displayed on current UI page (lazy in the sense we only render this slice)
  const displayedBooks = useMemo(() => {
    const start = (currentPage - 1) * BOOKS_PER_PAGE;
    return filteredBooks.slice(start, start + BOOKS_PER_PAGE);
  }, [filteredBooks, currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-8 sm:py-12 px-4 shadow-lg">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6">
          <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
            <BookOpen className="h-8 w-8 sm:h-10 sm:w-10" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              BookFinder
            </h1>
          </div>
          <p className="text-center text-blue-100 text-sm sm:text-lg">
            Every search opens a new page of imagination
          </p>
        </div>
      </header>

      <main className="container mx-auto max-w-screen-xl px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12 sm:py-20">
            <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-blue-600" />
          </div>
        )}

        {!loading && displayedBooks.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedBooks.map((book) => (
                <BookCard
                  key={
                    book.key || `${book.title}-${book.cover_i}-${Math.random()}`
                  }
                  title={book.title}
                  author={book.author_name || []}
                  coverImage={
                    book.cover_i
                      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                      : undefined
                  }
                  publishYear={book.first_publish_year}
                  language={book.language} 
                  editionCount={book.edition_count} 
                  ebook_access={book.ebook_access}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        {!loading && displayedBooks.length === 0 && searchQuery && (
          <div className="text-center py-12 sm:py-20">
            <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              No books found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or browse by category
            </p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-16 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>Powered by Open Library API</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
