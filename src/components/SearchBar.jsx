import { Search } from "lucide-react";

export const SearchBar = ({ value, onChange, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text"
        placeholder="Search for books by title, author, or published date..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        className="pl-12 pr-4 py-4 w-full rounded-xl shadow-md focus:shadow-lg focus:ring-2 focus:ring-blue-500 text-lg transition-all"
      />
    </div>
  );
};
