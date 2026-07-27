export interface GalleryImage {
  src: string;
  alt: string;
}

interface ProjectImageGalleryProps {
  images: GalleryImage[];
  isHovered?: boolean;
  aspectRatio?: string;
  roundedCorners?: string;
}

export function ProjectImageGallery({
  images,
  isHovered = false,
  aspectRatio = "16/9",
  roundedCorners = "20px",
}: ProjectImageGalleryProps) {
  const image = images[0];

  return (
    <div
      className="relative overflow-hidden bg-black/50"
      style={{ aspectRatio, borderRadius: roundedCorners }}
    >
      {/* Preview Image */}
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-[filter] duration-700 ease-out"
        style={{
          filter: isHovered ? "brightness(1.05)" : "brightness(0.85)",
        }}
      />

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
