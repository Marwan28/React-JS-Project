import { useState } from "react";

function CardImage({ src, alt }) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  return (
    <div className="relative w-full aspect-[4/3] bg-gray-100">
      {isImageLoading && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center bg-gray-100 animate-pulse">
          <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-blue-600 animate-spin" />
        </div>
      )}

      {imageLoadFailed ? (
        <div className="h-full w-full flex items-center justify-center text-sm text-gray-500">
          Failed to load image
        </div>
      ) : (
        <img
          className="w-full h-full object-cover"
          src={src}
          alt={alt}
          onLoad={() => setIsImageLoading(false)}
          onError={() => {
            setImageLoadFailed(true);
            setIsImageLoading(false);
          }}
        />
      )}
    </div>
  );
}

export default CardImage;
