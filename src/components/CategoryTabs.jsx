const categories = [
  { id: "all", label: "All Books" },
  { id: "fiction", label: "Fiction" },
  { id: "science", label: "Science" },
  { id: "history", label: "History" },
  { id: "biography", label: "Biography" },
  { id: "children", label: "Children's" },
]; 

export const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="w-full grid grid-cols-3 md:grid-cols-6 gap-2 bg-gray-100 dark:bg-secondary/50 p-1 rounded-xl backdrop-blur-sm">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
              activeCategory === category.id
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200 dark:hover:bg-secondary"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};
