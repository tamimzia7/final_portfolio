import { useEffect, useState } from "react";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface ProjectImageGalleryProps {
  images: GalleryImage[];
  isHovered?: boolean;
  aspectRatio?: string;
  roundedCorners?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
}

export function ProjectImageGallery({
  images,
  isHovered = false,
  aspectRatio = "16/9",
  roundedCorners = "20px",
  autoplay = false,
  autoplayInterval = 4500,
}: ProjectImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Autoplay slideshow — infinite loop, always starts from the first image,
  // pauses while the card is hovered
  useEffect(() => {
    if (!autoplay || images.length < 2 || isHovered) return;
    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, autoplayInterval);
    return () => clearInterval(id);
  }, [autoplay, autoplayInterval, images.length, isHovered]);

  const autoplaying = autoplay && images.length > 1;

  return (
    <div
      className="relative overflow-hidden bg-black/50"
      style={{ aspectRatio, borderRadius: roundedCorners }}
    >
      {autoplaying ? (
        /* Stacked crossfade slides — fixed container, no layout shift */
        images.map((image, idx) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out"
            style={{
              opacity: idx === activeIndex ? 1 : 0,
              filter: isHovered ? "brightness(1.05)" : "brightness(0.85)",
            }}
          />
        ))
      ) : (
        /* Preview Image */
        <img
          src={images[0].src}
          alt={images[0].alt}
          loading="lazy"
          className="w-full h-full object-cover transition-[filter] duration-700 ease-out"
          style={{
            filter: isHovered ? "brightness(1.05)" : "brightness(0.85)",
          }}
        />
      )}

      {/* Dark gradient overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 35%, rgba(0,0,0,0.75) 100%)",
          borderRadius: roundedCorners,
        }}
      />
    </div>
  );
}
