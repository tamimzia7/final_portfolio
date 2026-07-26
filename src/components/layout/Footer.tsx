import { Logo } from "@/components/layout/Logo";

const socials = [
  { label: "GitHub", url: "https://github.com/tamimzia7" },
  { label: "LinkedIn", url: "https://linkedin.com/in/tamimzia" },
  { label: "Facebook", url: "https://facebook.com/tamimzia" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] relative">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-width-container py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Logo + copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Logo />
            <p className="text-[11px] font-mono text-white/20 tracking-wide">
              &copy; {new Date().getFullYear()} Tamim Zia. All rights reserved.
            </p>
          </div>

          {/* Right: Social links + top */}
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-xs font-medium text-white/25 hover:text-accent transition-all duration-300"
              >
                {s.label}
                <span className="absolute -bottom-px left-0 right-0 h-px bg-accent/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
            <span className="w-px h-4 bg-white/[0.06]" />
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group relative text-xs font-medium text-white/25 hover:text-accent transition-all duration-300 flex items-center gap-1.5"
            >
              <span>Back to top</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
