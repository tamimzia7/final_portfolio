import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/utils/cn";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  featured?: boolean;
  premium?: boolean;
  subtitle?: string;
  status?: string;
  role?: string;
  badgeLabel?: string;
  imageSrc: string;
  imageAspectRatio?: string;
  screenshots?: string[];
  carousel?: boolean;
}

const colorSchemes: Record<string, { primary: string; primaryLight: string; primaryDark: string; glow: string; border: string; tagBg: string; tagText: string; gradient: string }> = {
  "Boutique E-commerce Platform": {
    primary: "#FF2D20",
    primaryLight: "rgba(255,45,32,0.12)",
    primaryDark: "rgba(255,45,32,0.08)",
    glow: "rgba(255,45,32,0.15)",
    border: "rgba(255,45,32,0.2)",
    tagBg: "rgba(255,45,32,0.15)",
    tagText: "#FF2D20",
    gradient: "from-[#FF2D20] via-[#FF6B35] to-[#FF8C42]",
  },
  "AURA Collection": {
    primary: "#A855F7",
    primaryLight: "rgba(168,85,247,0.12)",
    primaryDark: "rgba(168,85,247,0.08)",
    glow: "rgba(168,85,247,0.15)",
    border: "rgba(168,85,247,0.2)",
    tagBg: "rgba(168,85,247,0.15)",
    tagText: "#A855F7",
    gradient: "from-[#A855F7] via-[#C084FC] to-[#D8B4FE]",
  },
  VisiCore: {
    primary: "#3BC9FF",
    primaryLight: "rgba(59,201,255,0.12)",
    primaryDark: "rgba(59,201,255,0.08)",
    glow: "rgba(59,201,255,0.15)",
    border: "rgba(59,201,255,0.2)",
    tagBg: "rgba(59,201,255,0.15)",
    tagText: "#3BC9FF",
    gradient: "from-[#3BC9FF] via-[#0EA5E9] to-[#0284C7]",
  },
  "Meal Management System": {
    primary: "#22C55E",
    primaryLight: "rgba(34,197,94,0.12)",
    primaryDark: "rgba(34,197,94,0.08)",
    glow: "rgba(34,197,94,0.15)",
    border: "rgba(34,197,94,0.2)",
    tagBg: "rgba(34,197,94,0.15)",
    tagText: "#22C55E",
    gradient: "from-[#22C55E] via-[#16A34A] to-[#15803D]",
  },
  "ASTHA (আস্থা)": {
    primary: "#8B5CF6",
    primaryLight: "rgba(139,92,246,0.14)",
    primaryDark: "rgba(139,92,246,0.09)",
    glow: "rgba(139,92,246,0.22)",
    border: "rgba(139,92,246,0.3)",
    tagBg: "rgba(139,92,246,0.15)",
    tagText: "#A78BFA",
    gradient: "from-[#8B5CF6] via-[#6366F1] to-[#3BC9FF]",
  },
};

function getScheme(title: string) {
  return colorSchemes[title] || {
    primary: "#7C5CFF",
    primaryLight: "rgba(124,92,255,0.12)",
    primaryDark: "rgba(124,92,255,0.08)",
    glow: "rgba(124,92,255,0.15)",
    border: "rgba(124,92,255,0.2)",
    tagBg: "rgba(124,92,255,0.15)",
    tagText: "#7C5CFF",
    gradient: "from-[#7C5CFF] via-[#3BC9FF] to-[#7C5CFF]",
  };
}

export function ProjectCard({ title, description, tags, slug, featured, premium, subtitle, status = "Completed", role, badgeLabel = "Featured", imageSrc, imageAspectRatio = "16/11", screenshots, carousel = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const touchStartX = useRef(0);
  // Detect touch device immediately (no need for state/effect since matchMedia is synchronous)
  const isTouchDevice = useRef(
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
  ).current;

  // Carousel auto-play — infinite loop, pauses while hovered
  useEffect(() => {
    if (!carousel || !screenshots || screenshots.length < 2 || isHovered) return;
    const id = setInterval(() => {
      setActiveScreenshot((current) => (current + 1) % screenshots.length);
    }, 3500);
    return () => clearInterval(id);
  }, [carousel, screenshots, isHovered]);

  const handleSwipeStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleSwipeEnd = (e: React.TouchEvent) => {
    if (!screenshots || screenshots.length < 2) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) < 40) return;
    setActiveScreenshot((a) =>
      delta < 0
        ? (a + 1) % screenshots.length
        : (a - 1 + screenshots.length) % screenshots.length
    );
  };

  // 3D Tilt — disabled on touch devices
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isTouchDevice) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
    // Update CSS variables for cursor glow radial gradient
    const px = ((e.clientX - rect.left) / width) * 100;
    const py = ((e.clientY - rect.top) / height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${px}%`);
    cardRef.current.style.setProperty("--mouse-y", `${py}%`);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    x.set(0);
    y.set(0);
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.setProperty("--mouse-x", "50%");
      cardRef.current.style.setProperty("--mouse-y", "50%");
    }
  };

  const handleTouchStart = () => {
    if (isTouchDevice) {
      setIsHovered(true);
    }
  };

  const handleTouchEnd = () => {
    if (isTouchDevice) {
      setIsHovered(false);
    }
  };

  const scheme = getScheme(title);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { if (!isTouchDevice) setIsHovered(true); }}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative cursor-pointer"
    >
      <Link to={`/projects/${slug}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden rounded-3xl transition-all duration-700 h-full flex flex-col",
            "border",
            premium ? (isHovered ? "scale-[1.03]" : "scale-100") : isHovered ? "scale-[1.02]" : "scale-100",
          )}
          style={{
            borderColor: isHovered || premium ? scheme.border : "rgba(255,255,255,0.06)",
            boxShadow: isHovered
              ? `0 40px 90px -20px ${scheme.glow}, 0 0 0 1px ${scheme.border}, inset 0 0 60px ${scheme.primaryLight}`
              : premium
                ? `0 0 45px -12px ${scheme.glow}, 0 0 0 1px ${scheme.border}`
                : "0 0 0 1px rgba(255,255,255,0.06)",
            background: isHovered
              ? `linear-gradient(180deg, ${scheme.primaryDark} 0%, rgba(5,5,5,0.95) 100%)`
              : premium
                ? `linear-gradient(180deg, ${scheme.primaryDark} 0%, rgba(5,5,5,0.8) 100%)`
                : "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(5,5,5,0.8) 100%)",
            transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Image Container — 65-70% of the card */}
          <div className="relative overflow-hidden" style={{ aspectRatio: imageAspectRatio }}>
            {carousel && screenshots && screenshots.length > 1 ? (
              <>
                {/* Carousel slides — stacked crossfade */}
                <div
                  className="absolute inset-0"
                  style={{
                    transform: isHovered ? "scale(1.08)" : "scale(1)",
                    transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                    borderRadius: "24px 24px 0 0",
                    touchAction: "pan-y",
                  }}
                  onTouchStart={handleSwipeStart}
                  onTouchEnd={handleSwipeEnd}
                >
                  {screenshots.map((src, idx) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${title} screenshot ${idx + 1}`}
                      loading="lazy"
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-cover object-top select-none"
                      style={{
                        opacity: idx === activeScreenshot ? 1 : 0,
                        transition: "opacity 0.8s ease",
                        filter: isHovered ? "brightness(1.1) contrast(1.05)" : "brightness(0.9) contrast(1)",
                      }}
                    />
                  ))}
                </div>

                {/* Previous arrow */}
                <button
                  type="button"
                  aria-label="Previous screenshot"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveScreenshot((a) => (a - 1 + screenshots.length) % screenshots.length);
                  }}
                  className="absolute left-3 top-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all duration-300"
                  style={{
                    background: "rgba(5,5,5,0.55)",
                    borderColor: scheme.border,
                    color: "rgba(255,255,255,0.85)",
                    opacity: isHovered || isTouchDevice ? 1 : 0,
                    transform: "translateY(-50%)",
                    boxShadow: `0 0 20px ${scheme.glow}`,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                {/* Next arrow */}
                <button
                  type="button"
                  aria-label="Next screenshot"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveScreenshot((a) => (a + 1) % screenshots.length);
                  }}
                  className="absolute right-3 top-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all duration-300"
                  style={{
                    background: "rgba(5,5,5,0.55)",
                    borderColor: scheme.border,
                    color: "rgba(255,255,255,0.85)",
                    opacity: isHovered || isTouchDevice ? 1 : 0,
                    transform: "translateY(-50%)",
                    boxShadow: `0 0 20px ${scheme.glow}`,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>

                {/* Pagination dots */}
                <div
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full backdrop-blur-xl"
                  style={{ background: "rgba(5,5,5,0.55)", border: `1px solid ${scheme.border}` }}
                >
                  {screenshots.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Go to screenshot ${idx + 1}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveScreenshot(idx);
                      }}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: idx === activeScreenshot ? 18 : 6,
                        height: 6,
                        background: idx === activeScreenshot ? scheme.primary : "rgba(255,255,255,0.25)",
                        boxShadow: idx === activeScreenshot ? `0 0 10px ${scheme.glow}` : "none",
                      }}
                    />
                  ))}
                </div>
              </>
            ) : (
              /* Main Preview Image */
              <img
                src={screenshots ? screenshots[activeScreenshot] : imageSrc}
                alt={screenshots ? `${title} screenshot ${activeScreenshot + 1}` : title}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700"
                style={{
                  transform: isHovered ? "scale(1.08)" : "scale(1)",
                  filter: isHovered ? "brightness(1.1) contrast(1.05)" : "brightness(0.9) contrast(1)",
                  borderRadius: "24px 24px 0 0",
                }}
              />
            )}

            {/* Gradient overlay on hover */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                opacity: isHovered ? 0.6 : 0,
                background: `linear-gradient(180deg, transparent 0%, ${scheme.primaryDark} 50%, rgba(5,5,5,0.9) 100%)`,
              }}
            />

            {/* Glass reflection effect */}
            <div
              className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
              style={{
                opacity: isHovered ? 0.15 : 0,
                background: `linear-gradient(135deg, ${scheme.primaryLight} 0%, transparent 50%)`,
              }}
            />

            {/* Featured badge */}
            {featured && (
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-full backdrop-blur-xl border"
                  style={{
                    background: `rgba(5,5,5,0.6)`,
                    borderColor: scheme.border,
                    color: scheme.primary,
                    boxShadow: `0 0 20px ${scheme.glow}`,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill={scheme.primary}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {badgeLabel}
                </span>
              </div>
            )}

            {/* Cursor glow follow */}
            {isHovered && (
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-100"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${scheme.primaryLight}, transparent 40%)`,
                }}
              />
            )}
          </div>

          {/* Screenshot Thumbnails — shown when multiple screenshots available */}
          {screenshots && screenshots.length > 1 && !carousel && (
            <div className="flex gap-2 px-6 md:px-7 lg:px-8 pt-4 pb-2 relative z-10">
              {screenshots.map((src, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveScreenshot(idx);
                  }}
                  className="relative overflow-hidden rounded-lg border-2 transition-all duration-300"
                  style={{
                    width: 56,
                    height: 36,
                    borderColor: idx === activeScreenshot ? scheme.primary : "rgba(255,255,255,0.08)",
                    opacity: idx === activeScreenshot ? 1 : 0.5,
                    boxShadow: idx === activeScreenshot ? `0 0 12px ${scheme.glow}` : "none",
                  }}
                >
                  <img
                    src={src}
                    alt={`${title} thumbnail ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Content Section */}
          <div className="p-6 md:p-7 lg:p-8 flex flex-col flex-1 relative z-10" style={{ transform: "translateZ(30px)" }}>
            {/* Project name */}
            <h3
              className="text-xl md:text-2xl font-bold mb-2 transition-colors duration-300"
              style={{ color: isHovered ? scheme.primary : "rgba(255,255,255,0.9)" }}
            >
              {title}
            </h3>

            {subtitle && (
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: scheme.primary }}>
                {subtitle}
              </p>
            )}

            {/* Status badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: scheme.primary }} />
              <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
                {status}
              </span>
              {role && (
                <>
                  <span className="text-white/15">•</span>
                  <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {role}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-white/40 leading-relaxed mb-5 flex-1 line-clamp-2">
              {description}
            </p>

            {/* Technology Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.slice(0, 4).map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  className="px-3 py-1.5 text-[11px] font-medium rounded-full border transition-all duration-300"
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
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  {tag}
                </motion.span>
              ))}
              {tags.length > 4 && (
                <span
                  className="px-3 py-1.5 text-[11px] font-medium rounded-full border transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.35)",
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  +{tags.length - 4}
                </span>
              )}
            </div>

            {/* Buttons */}
            <div
              className="flex flex-wrap gap-3 transition-all duration-500"
              style={{
                transform: isHovered ? "translateY(0)" : "translateY(4px)",
                opacity: isHovered ? 1 : 0.85,
              }}
            >
              <span
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-default"
                style={{
                  background: `linear-gradient(135deg, ${scheme.primary} 0%, ${scheme.primary}dd 100%)`,
                  color: "white",
                  boxShadow: isHovered ? `0 8px 25px -5px ${scheme.glow}` : "none",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                Live Demo
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold rounded-full border transition-all duration-300 cursor-default"
                style={{
                  background: isHovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.6)",
                  borderColor: isHovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                GitHub
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-default ml-auto"
                style={{
                  color: isHovered ? scheme.primary : "rgba(255,255,255,0.35)",
                  background: isHovered ? `${scheme.primaryLight}` : "transparent",
                }}
              >
                View Case Study
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: isHovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.3s" }}
                >
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Bottom glow line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `linear-gradient(90deg, transparent, ${scheme.primary}, transparent)`,
              boxShadow: `0 0 20px ${scheme.glow}`,
            }}
          />

          {/* Corner accents */}
          <div
            className="absolute top-0 right-0 w-32 h-32 transition-all duration-700 pointer-events-none"
            style={{
              opacity: isHovered ? 0.4 : 0,
              background: `radial-gradient(circle at 100% 0%, ${scheme.primaryLight}, transparent 70%)`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-32 h-32 transition-all duration-700 pointer-events-none"
            style={{
              opacity: isHovered ? 0.2 : 0,
              background: `radial-gradient(circle at 0% 100%, ${scheme.primaryDark}, transparent 70%)`,
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
