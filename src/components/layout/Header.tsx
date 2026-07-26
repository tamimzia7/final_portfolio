import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";

const nav = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Skills", path: "/skills" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "GitHub", path: "/github" },
  { label: "Contact", path: "/contact" },
];

export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "glass" : "bg-transparent",
      )}
      style={scrolled ? { backdropFilter: "blur(40px)" } : undefined}
    >
      <div className="max-width-container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="text-xl font-bold text-gradient tracking-tight">
          TZ
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-4 py-2 rounded-xl text-sm transition-all duration-300",
                pathname === item.path
                  ? "text-white bg-white/10"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden text-white/60 hover:text-white p-2"
          aria-label="Menu"
          onClick={() => { /* mobile menu toggle - simplified for now */ }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
