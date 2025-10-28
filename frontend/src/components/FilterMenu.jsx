import React, { useState } from "react";

const categories = [
  "All",
  "Education",
  "Science",
  "Fantasy",
  "History",
  "Comics",
  "Biographies",
  "Novels",
];

function FilterMenu({ handleFilter }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    handleFilter(cat);
  };

  return (
    <div className="flex justify-center gap-3 flex-wrap mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryClick(cat)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            activeCategory === cat
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-200 hover:bg-blue-400 hover:text-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default FilterMenu;
