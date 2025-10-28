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

  const hasSummary = firstSentence && firstSentence.length > 0;

  return (
    <div className="bg-white dark:bg-card rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 group">
      <div className="p-4">
        <div className="flex gap-4">
          {/* Book Cover */}
          <div className="flex-shrink-0 w-28 sm:w-32 md:w-40 lg:w-48 h-40 sm:h-48 md:h-56 lg:h-64 rounded-lg overflow-hidden dark:bg-muted relative">
            {!imageError && coverImage ? (
              <>
                {!imageLoaded && (
                  <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 animate-pulse rounded-lg" />
                )}
                <img
                  src={coverImage}
                  alt={title}
                  loading="lazy"
                  className={`w-full h-full object-contain transition-all duration-300 ${
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
          <div className="flex-1 min-w-0 p-4">
            <h3 className="text-lg text-gray-500 line-clamp-3 mb-1 group-hover:text-blue-600 transition-colors">
              <span className="text-lg font-semibold text-gray-800">Title:</span> {title}
            </h3>
            <p className="text-lg text-gray-500 mb-3 line-clamp-2">
              <span className="font-medium text-gray-800">Author:</span>{" "}
              {author && author.length > 0
                ? author.join(", ")
                : "Unknown Author"}
            </p>
            <div className="space-y-1.5 text-gray-500">
              {publishYear && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-800 text-sm font-semibold">
                    Published Year:
                  </span>
                  <span>{publishYear}</span>
                </div>
              )}
              {language && language.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className=" text-gray-800 text-sm font-semibold">Language:</span>
                  <span className="capitalize">{language[0]}</span>
                </div>
              )}
              {editionCount !== undefined && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-800 text-sm font-semibold">Editions:</span>
                  <span>{editionCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
