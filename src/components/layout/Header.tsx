import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { Logo } from "@/components/layout/Logo";

const nav = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Skills", path: "/skills" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "GitHub", path: "/github" },
  { label: "Contact", path: "/contact" },
];

const mobileNavVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", damping: 28, stiffness: 300, mass: 0.8 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { type: "spring", damping: 30, stiffness: 350, mass: 0.9 },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 * i, duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  }),
};

export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll for glass effect
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    const scrollY = window.scrollY;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    }
  }, [mobileOpen]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    },
    []
  );

  useEffect(() => {
    if (mobileOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [mobileOpen, handleKeyDown]);

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on clicking overlay
  const handleOverlayClick = () => setMobileOpen(false);

  // Swipe-to-close gesture for mobile panel
  const touchStartX = useRef(0);

  const handlePanelTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handlePanelTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 80) setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[9997] transition-all duration-500",
        scrolled
          ? "glass shadow-[0_1px_0_rgba(255,255,255,0.04)]"
          : "bg-transparent"
      )}
      style={
        scrolled || mobileOpen
          ? { backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" }
          : undefined
      }
    >
      <div className="max-width-container flex items-center justify-between h-16 md:h-20">
        {/* Premium Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-0.5">
          {nav.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "group relative px-3.5 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                  isActive
                    ? "text-white"
                    : "text-white/40 hover:text-white/80"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                {/* Active indicator */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/[0.06] -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {/* Hover underline */}
                <span
                  className={cn(
                    "absolute -bottom-px left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#3BC9FF] transition-all duration-300 scale-x-0 group-hover:scale-x-100",
                    isActive ? "scale-x-100 opacity-100" : "opacity-50"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <div className="relative w-5 h-4">
            <span
              className={cn(
                "absolute left-0 block w-full h-[2px] rounded-full bg-current transition-all duration-300",
                mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 block w-full h-[2px] rounded-full bg-current transition-all duration-300",
                mobileOpen ? "opacity-0 scale-x-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute left-0 block w-full h-[2px] rounded-full bg-current transition-all duration-300",
                mobileOpen
                  ? "top-1/2 -translate-y-1/2 -rotate-45"
                  : "bottom-0"
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay + Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
              onClick={handleOverlayClick}
              aria-hidden="true"
            />

            {/* Slide-in panel */}
            <motion.div
              variants={mobileNavVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onTouchStart={handlePanelTouchStart}
              onTouchEnd={handlePanelTouchEnd}
              className="fixed top-0 right-0 bottom-0 w-[280px] max-w-[85vw] z-[9999] md:hidden flex flex-col"
              style={{
                background: "rgba(10,10,10,0.95)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
              }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/[0.04]">
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-white/20">
                  Navigation
                </span>
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation items */}
              <nav className="flex-1 px-6 min-h-0" style={{ overflowY: "auto", paddingTop: "90px", paddingBottom: "40px" }}>
                <ul className="flex flex-col gap-4">
                  {nav.map((item, i) => {
                    const isActive = pathname === item.path;
                    return (
                      <motion.li
                        key={item.path}
                        custom={i}
                        variants={mobileItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          to={item.path}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300",
                            isActive
                              ? "text-white bg-accent/10 border border-accent/15"
                              : "text-white/40 hover:text-white/80 hover:bg-white/[0.03]"
                          )}
                        >
                          {/* Active dot */}
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full transition-all duration-300",
                              isActive ? "bg-accent shadow-[0_0_6px_rgba(124,92,255,0.5)]" : "bg-white/10"
                            )}
                          />
                          {item.label}
                          {/* Arrow indicator */}
                          <svg
                            className="ml-auto w-4 h-4 text-white/10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Panel footer */}
              <div className="px-6 py-4 border-t border-white/[0.04]">
                <p className="text-[10px] text-white/20 font-mono tracking-wider uppercase">
                  Tamim Zia &mdash; Full Stack Developer
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
