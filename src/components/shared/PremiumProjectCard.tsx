import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectImageGallery, type GalleryImage } from "@/components/shared/ProjectImageGallery";

interface PremiumProjectCardProps {
  title: string;
  description: string;
  shortDescription?: string;
  tags: string[];
  features: string[];
  slug: string;
  images: GalleryImage[];
  accentColor?: string;
  liveUrl?: string;
  githubUrl?: string;
  role?: string;
  status?: string;
  badges?: { label: string; color?: string }[];
}

const DEFAULT_COLORS = {
  primary: "#7C5CFF",
  primaryLight: "rgba(124,92,255,0.12)",
  primaryDark: "rgba(124,92,255,0.08)",
  glow: "rgba(124,92,255,0.15)",
  border: "rgba(124,92,255,0.2)",
  tagBg: "rgba(124,92,255,0.15)",
  tagText: "#7C5CFF",
};

const colorSchemes: Record<string, typeof DEFAULT_COLORS> = {
  Laravel: {
    primary: "#FF2D20",
    primaryLight: "rgba(255,45,32,0.12)",
    primaryDark: "rgba(255,45,32,0.08)",
    glow: "rgba(255,45,32,0.15)",
    border: "rgba(255,45,32,0.2)",
    tagBg: "rgba(255,45,32,0.15)",
    tagText: "#FF2D20",
  },
  "Full Stack": {
    primary: "#A855F7",
    primaryLight: "rgba(168,85,247,0.12)",
    primaryDark: "rgba(168,85,247,0.08)",
    glow: "rgba(168,85,247,0.15)",
    border: "rgba(168,85,247,0.2)",
    tagBg: "rgba(168,85,247,0.15)",
    tagText: "#A855F7",
  },
  React: {
    primary: "#3BC9FF",
    primaryLight: "rgba(59,201,255,0.12)",
    primaryDark: "rgba(59,201,255,0.08)",
    glow: "rgba(59,201,255,0.15)",
    border: "rgba(59,201,255,0.2)",
    tagBg: "rgba(59,201,255,0.15)",
    tagText: "#3BC9FF",
  },
  Backend: {
    primary: "#22C55E",
    primaryLight: "rgba(34,197,94,0.12)",
    primaryDark: "rgba(34,197,94,0.08)",
    glow: "rgba(34,197,94,0.15)",
    border: "rgba(34,197,94,0.2)",
    tagBg: "rgba(34,197,94,0.15)",
    tagText: "#22C55E",
  },
  Frontend: {
    primary: "#F59E0B",
    primaryLight: "rgba(245,158,11,0.12)",
    primaryDark: "rgba(245,158,11,0.08)",
    glow: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.2)",
    tagBg: "rgba(245,158,11,0.15)",
    tagText: "#F59E0B",
  },
};

export function PremiumProjectCard({
  title,
  description,
  shortDescription,
  tags,
  features,
  slug,
  images,
  accentColor: customAccent,
  liveUrl,
  githubUrl,
  role,
  status,
  badges,
}: PremiumProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isTouchDevice = useRef(
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
  ).current;

  // Detect category for color scheme from tags
  const categoryKey =
    tags.includes("Laravel") ? "Laravel" :
    tags.includes("React") ? "React" :
    tags.includes("Full Stack") || tags.some(t => t.includes("Stack")) ? "Full Stack" :
    "Laravel";

  const scheme = customAccent
    ? { ...DEFAULT_COLORS, primary: customAccent, primaryLight: `${customAccent}1f`, primaryDark: `${customAccent}14`, glow: `${customAccent}26`, border: `${customAccent}33`, tagBg: `${customAccent}26`, tagText: customAccent }
    : colorSchemes[categoryKey] || DEFAULT_COLORS;

  return (
    <div
      className="group relative cursor-pointer h-full"
      onMouseEnter={() => { if (!isTouchDevice) setIsHovered(true); }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/projects/${slug}`} className="block h-full">
        <div
          className="relative overflow-hidden rounded-[20px] h-full flex flex-col"
          style={{
            border: `1px solid ${isHovered ? scheme.border : "rgba(255,255,255,0.06)"}`,
            boxShadow: isHovered
              ? `0 30px 80px -20px ${scheme.glow}, 0 0 0 1px ${scheme.border}, inset 0 0 50px ${scheme.primaryLight}`
              : "0 0 0 1px rgba(255,255,255,0.06)",
            background: isHovered
              ? `linear-gradient(180deg, ${scheme.primaryDark} 0%, rgba(5,5,5,0.95) 100%)`
              : "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(5,5,5,0.85) 100%)",
            transition: "border-color 0.7s ease, box-shadow 0.7s ease, background 0.7s ease",
          }}
        >
          {/* Image Gallery */}
          <ProjectImageGallery
            images={images}
            isHovered={isHovered}
            aspectRatio="16/9"
            roundedCorners="20px 20px 0 0"
          />

          {/* Badges overlay */}
          {badges && badges.length > 0 && (
            <div className="absolute top-0 left-0 right-0 z-20 flex justify-between p-3.5 pointer-events-none">
              <div className="flex gap-2">
                {badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold rounded-full backdrop-blur-xl border pointer-events-auto"
                    style={{
                      background: "rgba(5,5,5,0.6)",
                      borderColor: badge.color || scheme.border,
                      color: badge.color || scheme.primary,
                      boxShadow: badge.color ? `0 0 16px ${badge.color}33` : `0 0 16px ${scheme.glow}`,
                    }}
                  >
                    {badge.label === "Featured Project" && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill={badge.color || scheme.primary}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="p-5 md:p-6 lg:p-7 flex flex-col flex-1 relative z-10">
            {/* Project Name */}
            <h3
              className="text-lg md:text-xl font-bold mb-1.5"
              style={{
                color: isHovered ? scheme.primary : "rgba(255,255,255,0.9)",
                transition: "color 0.3s ease",
              }}
            >
              {shortDescription || title}
            </h3>

            {/* Role & Status */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              {role && (
                <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <span style={{ color: scheme.primary }}>●</span> {role}
                </span>
              )}
              {status && (
                <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <span className="text-green-400">◆</span> {status}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm text-white/40 leading-relaxed mb-4 line-clamp-3">
              {description}
            </p>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[10px] font-medium rounded-full border"
                  style={{
                    background: tag === "Laravel"
                      ? scheme.tagBg
                      : isHovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
                    color: tag === "Laravel"
                      ? scheme.tagText
                      : isHovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)",
                    borderColor: tag === "Laravel"
                      ? scheme.border
                      : isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)",
                    transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Feature Tags */}
            {features.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {features.slice(0, 5).map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium rounded-full"
                    style={{
                      background: isHovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
                      color: isHovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.28)",
                      border: `1px solid ${isHovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
                      transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                    }}
                  >
                    <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={scheme.primary} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </span>
                ))}
                {features.length > 5 && (
                  <span
                    className="px-2.5 py-1 text-[10px] font-medium rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      color: "rgba(255,255,255,0.28)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    +{features.length - 5}
                  </span>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {liveUrl && (
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${scheme.primary} 0%, ${scheme.primary}dd 100%)`,
                    color: "white",
                    boxShadow: isHovered ? `0 6px 20px -4px ${scheme.glow}` : "none",
                    transition: "box-shadow 0.3s ease",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  Live Demo
                </span>
              )}
              {githubUrl && (
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full border"
                  style={{
                    background: isHovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.6)",
                    borderColor: isHovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)",
                    transition: "background 0.3s ease, border-color 0.3s ease",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  GitHub
                </span>
              )}
              <span
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full ml-auto transition-colors duration-300"
                style={{
                  color: isHovered ? scheme.primary : "rgba(255,255,255,0.35)",
                  background: isHovered ? `${scheme.primaryLight}` : "transparent",
                }}
              >
                View Details
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Bottom glow line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `linear-gradient(90deg, transparent, ${scheme.primary}, transparent)`,
              boxShadow: `0 0 20px ${scheme.glow}`,
              transition: "opacity 0.5s ease",
            }}
          />
        </div>
      </Link>
    </div>
  );
}
