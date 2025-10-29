import { useState, useEffect } from "react";
import { BookOpen, Loader2 } from "lucide-react";
import { SearchBar } from "../components/SearchBar";
import { CategoryTabs } from "../components/CategoryTabs";
import { BookCard } from "../components/BookCard";
import { Pagination } from "../components/Pagination";

const BOOKS_PER_PAGE = 12;

const Home = () => {
  const [books, setBooks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  
  
  const fetchBooks = async (query, category, page = 1) => {
    try {
      if (!query.trim()) return;
      setLoading(true);
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}&limit=12&page=${page}`
      );
      const data = await response.json();
      setBooks(data.docs || []); 
      setTotalResults(data.numFound || 0);
    } catch (error) {
      console.error("Error fetching books:", error); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks("popular", activeCategory);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search term.");
      return;
    }
    setCurrentPage(1);
    fetchBooks(searchQuery, activeCategory);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); 
    fetchBooks(searchQuery || "popular", category);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchBooks(searchQuery || "popular", activeCategory, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(totalResults / BOOKS_PER_PAGE); 
  console.log(totalPages);

  return (
    <div className="h-100 bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-12 px-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-10 w-10" />
            <h1 className="text-4xl font-bold">BookFinder</h1>
          </div>
          <p className="text-center text-blue-100 text-lg">
            Every search opens a new page of imagination
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} />
        </div>

        <div className="mb-8">
          <CategoryTabs activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
        </div>

        {!loading && totalResults > 0 && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Found <span className="font-semibold text-gray-800">{totalResults.toLocaleString()}</span> books
              {searchQuery && (
                <span> for "<span className="text-blue-600">{searchQuery}</span>"</span>
              )}
            </p>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
        )}

        {!loading && books.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {books.map((book) => (
                <BookCard
                  key={book.key}
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
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </>
        )}

        {!loading && books.length === 0 && searchQuery && (
          <div className="text-center py-20">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No books found</h3>
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
