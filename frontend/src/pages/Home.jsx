import React, { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import FilterMenu from "../components/FilterMenu";
import Pagination from "../components/Pagination";

function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch books from Open Library API
  const fetchBooks = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=50`
      );
      const data = res.data.docs;
      setBooks(data);
      setFilteredBooks(data);
      setPage(1);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filter logic
  const handleFilter = (type) => {
    setCategory(type);
    if (type === "All") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((b) =>
        b.subject?.some((sub) =>
          sub.toLowerCase().includes(type.toLowerCase())
        )
      );
      setFilteredBooks(filtered);
    }
    setPage(1);
  };

  // ✅ Pagination
  const indexOfLast = page * limit;
  const indexOfFirst = indexOfLast - limit;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-6xl text-center">
        <h1 className="text-3xl font-bold mb-6">📚 Book Finder</h1>

        {/* 🔍 Search bar */}
        <SearchBar query={query} setQuery={setQuery} fetchBooks={fetchBooks} />

        {/* 📂 Filter menu */}
        <FilterMenu handleFilter={handleFilter} />

        {/* 🔄 Loading & Error */}
        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {/* 📚 Books Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 justify-center">
          {currentBooks.length > 0 ? (
            currentBooks.map((book, index) => <BookCard key={index} book={book} />)
          ) : (
            !loading && <p className="text-center col-span-full">No books found.</p>
          )}
        </div>

        {/* 📄 Pagination */}
        {filteredBooks.length > 0 && (
          <Pagination
            total={filteredBooks.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
