import React from "react";

function Pagination({ total, limit, page, setPage }) {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null; // hide pagination if only one page

  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white disabled:opacity-50 transition"
        disabled={page === 1}
      >
        Prev
      </button>

      {/* Page numbers */}
      <span className="text-sm font-medium text-gray-700">
        Page <span className="text-blue-600">{page}</span> of {totalPages}
      </span>

      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white disabled:opacity-50 transition"
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
