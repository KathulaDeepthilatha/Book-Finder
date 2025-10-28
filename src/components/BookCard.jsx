import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const BookCard = ({
  title,
  author,
  coverImage,
  publishYear,
  language,
  editionCount,
  firstSentence,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [summaryExpanded, setSummaryExpanded] = useState(false);

  const hasSummary = firstSentence && firstSentence.length > 0;

  return (
    <div className="bg-white dark:bg-card rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 group">
      <div className="p-4">
        <div className="flex gap-4">
          {/* Book Cover */}
          <div className="flex-shrink-0 w-24 h-36 rounded-lg overflow-hidden bg-gray-200 dark:bg-muted relative">
            {!imageError && coverImage ? (
              <>
                {!imageLoaded && (
                  <div className="w-full h-full bg-gray-300 animate-pulse rounded-lg" />
                )}
                <img
                  src={coverImage}
                  alt={title}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0 absolute"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs font-semibold text-center px-2">
                No Cover
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mb-3 line-clamp-1">
              {author && author.length > 0 ? author.join(", ") : "Unknown Author"}
            </p>

            <div className="space-y-1.5 text-xs text-gray-500">
              {publishYear && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">Year:</span>
                  <span>{publishYear}</span>
                </div>
              )}
              {language && language.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">Language:</span>
                  <span className="capitalize">{language[0]}</span>
                </div>
              )}
              {editionCount !== undefined && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">Editions:</span>
                  <span>{editionCount}</span>
                </div>
              )}
            </div>

            {/* Summary Section */}
            {hasSummary && (
              <div className="mt-3">
                <button
                  onClick={() => setSummaryExpanded(!summaryExpanded)}
                  className="flex items-center text-xs font-medium text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md transition"
                >
                  {summaryExpanded ? (
                    <>
                      <ChevronUp className="h-3 w-3 mr-1" />
                      Hide Summary
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3 mr-1" />
                      Show Summary
                    </>
                  )}
                </button>
                {summaryExpanded && (
                  <p className="mt-2 text-sm text-gray-800 leading-relaxed animate-slide-in">
                    {firstSentence[0]}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
