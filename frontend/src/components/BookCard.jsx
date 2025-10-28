import React, { useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

function BookCard({ book }) {
  const [summary, setSummary] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [fav, setFav] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150";

  const fetchSummary = async () => {
    if (!book.key) {
      setSummary("No summary available.");
      setShowSummary(true);
      return;
    }

    try {
      setLoadingSummary(true);
      // Example: book.key → "/works/OL45883W"
      const res = await axios.get(`https://openlibrary.org${book.key}.json`);

      let desc =
        res.data.description?.value ||
        res.data.description ||
        "No summary available.";

      setSummary(desc);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("⚠️ Could not load summary. Try again later.");
    } finally {
      setShowSummary(true);
      setLoadingSummary(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-3 flex flex-col items-center text-center hover:shadow-md transition">
      <img
        src={cover}
        alt={book.title}
        className="w-32 h-48 mb-2 object-cover rounded"
      />
      <h3 className="font-semibold text-gray-800">{book.title}</h3>
      <p className="text-sm text-gray-500">{book.author_name?.[0]}</p>
      <p className="text-xs text-gray-400">{book.first_publish_year}</p>

      <div className="flex gap-3 mt-3 items-center">
        <button
          onClick={fetchSummary}
          disabled={loadingSummary}
          className="text-sm text-blue-500 hover:underline disabled:opacity-50"
        >
          {loadingSummary ? "Loading..." : "Summary"}
        </button>
        <button onClick={() => setFav(!fav)} className="text-red-500">
          <FaHeart color={fav ? "red" : "gray"} />
        </button>
      </div>

      {showSummary && (
        <div className="text-xs bg-gray-100 mt-3 p-2 rounded max-w-[200px] text-gray-700">
          {summary}
        </div>
      )}
    </div>
  );
}

export default BookCard;
