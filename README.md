# Book Finder Application 

# Overview
Book Finder is a React-based web application that helps users discover and explore books using the Open Library API. The application provides a clean, responsive interface with features like search, categorization, and pagination.

# Key Features
-Real-time book search
-Category filtering
-Responsive design
-Pagination

# Core Components
1. Home Component
Main container component managing:
State management for books, categories, and pagination
API integration
Search and filter logic
2. SearchBar Component 
Handles user input for book searches
Provides instant search functionality
3. CategoryTabs Component 
Displays filterable categories
Categories: All Books, Fiction, Science, History, Biography, Children's
Manages active category state
4. BookCard Component 
Displays individual book information
Handles image loading states
Shows book details: title, author, year, language, edition count
5. Pagination Component 
Manages page navigation
Shows current page and total pages
Handles page change events

# Data Flow
Initial Load
useEffect(() => {
    fetchBooks("popular", 1);
}, []);

# Search Flow
User enters search term - handleSearch() triggers, fetches books from API and Updates UI with results. 

# Category Filtering
User selects category handleCategoryChange() executes filters current books by category keywords, Updates displayed results.

# Pagination
User clicks page number handlePageChange() triggers, fetches new page of results scrolls to top of page

# API Integration

const fetchBooks = async (query, page = 1) => {
  const offset = (page - 1) * BOOKS_PER_PAGE;
  const url = `https://openlibrary.org/search.json?q=${query}&limit=${BOOKS_PER_PAGE}&offset=${offset}`;
  // Fetch and process data
}

# State Management
Key states:

allBooks: Current page books
filteredBooks: Category-filtered books
activeCategory: Current selected category
searchQuery: Current search term
currentPage: Active page number
totalResults: Total available books

# Usage Example
User opens application
First popular books display initially
User can:
- Search for specific books
- Filter by category
- Navigate through pages
- View book details

# Future Enhancements
Advanced filtering
Book details page
Save favorites
Reading lists