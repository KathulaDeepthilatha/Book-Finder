import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ query, setQuery, fetchBooks }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchBooks(); // Allow search on Enter key
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="flex w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search books by title..."
          className="border border-black focus:border-blue-500 focus:ring-1 focus:ring-blue-400 outline-none p-2 rounded-l-md w-full text-sm"
        />
        <button
          onClick={fetchBooks}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md transition"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
