import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/shared/Button";
import { cn } from "@/utils/cn";

interface Repo {
  name: string;
  desc: string;
  lang: string;
  langColor: string;
  stars: number;
  forks: number;
  updated: string;
  laravel: boolean;
  slug: string;
}

const pinnedRepos: Repo[] = [
  { name: "boutique-ecommerce", desc: "Complete Laravel fashion e-commerce — auth, products, cart, wishlist, orders, reviews, admin dashboard.", lang: "PHP", langColor: "#777bb4", stars: 48, forks: 13, updated: "1 week ago", laravel: true, slug: "boutique-ecommerce" },
  { name: "aura-collection", desc: "Luxury saree e-commerce — Laravel, TailwindCSS, wishlist, secure checkout, admin management.", lang: "PHP", langColor: "#777bb4", stars: 45, forks: 12, updated: "2 weeks ago", laravel: true, slug: "aura-collection" },
  { name: "visicore", desc: "Smart Field Visit & Employee Management — GPS tracking, attendance, visit evidence, reporting.", lang: "PHP", langColor: "#777bb4", stars: 32, forks: 8, updated: "1 month ago", laravel: true, slug: "visicore" },
  { name: "meal-management", desc: "Corporate meal management — role-based auth, meal tracking, monthly reports, cost analysis.", lang: "PHP", langColor: "#777bb4", stars: 28, forks: 6, updated: "2 months ago", laravel: true, slug: "meal-management" },
  { name: "developer-portfolio", desc: "Premium portfolio website — React, TypeScript, Three.js, Framer Motion.", lang: "TypeScript", langColor: "#3178c6", stars: 56, forks: 15, updated: "1 week ago", laravel: false, slug: "" },
  { name: "ai-study-planner", desc: "Smart study scheduler — React, Python, spaced repetition algorithm.", lang: "Python", langColor: "#3572a5", stars: 18, forks: 4, updated: "1 month ago", laravel: false, slug: "" },
];

const colorMap: Record<string, string> = {
  PHP: "bg-laravel/10 text-laravel border-laravel/20",
  TypeScript: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  JavaScript: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Python: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  MySQL: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

function getInitials(name: string) {
  return name
    .split("-")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function PinnedRepos() {
  const sorted = [...pinnedRepos].sort((a, b) => (a.laravel === b.laravel ? 0 : a.laravel ? -1 : 1));

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {sorted.map((repo, i) => (
        <ScrollReveal key={repo.name} delay={0.05 * i}>
          <div
            className={cn(
              "relative group rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col",
              repo.laravel
                ? "bg-gradient-to-br from-laravel/[0.04] via-transparent to-transparent border border-laravel/10"
                : "glass glass-hover",
            )}
          >
            <div className="relative p-5 md:p-6 flex flex-col h-full">
              <div className="flex items-start justify-between mb-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold",
                    repo.laravel ? "bg-laravel/20 text-laravel" : "bg-white/5 text-white/30",
                  )}
                >
                  {getInitials(repo.name)}
                </div>
                <div className="flex items-center gap-3 text-xs text-white/30">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 13.5L13 13l-2.5 2.5L8 13l2.5-2.5L8 8l2.5 2.5L13 8l2.5 2.5L13 13l2.5 2.5z"/></svg>
                    {repo.forks}
                  </span>
                </div>
              </div>

              <h3 className="text-sm md:text-base font-semibold text-white/90 font-mono mb-2">{repo.name}</h3>
              <p className="text-xs md:text-sm text-white/40 leading-relaxed mb-4 flex-1">{repo.desc}</p>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={cn("px-2.5 py-0.5 text-[10px] font-medium rounded-full border", colorMap[repo.lang] || "bg-white/5 text-white/30 border-white/10")}>
                  {repo.lang}
                </span>
                {repo.laravel && (
                  <>
                    <span className="px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-laravel/10 text-laravel border border-laravel/20">MySQL</span>
                    <span className="px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-laravel/10 text-laravel border border-laravel/20">REST API</span>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between text-[10px] text-white/20 mb-4">
                <span>Updated {repo.updated}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {repo.slug ? (
                  <>
                    <Button variant="ghost" className="!px-3 !py-1.5 !text-[11px]">Live Demo</Button>
                    <Button variant="ghost" className="!px-3 !py-1.5 !text-[11px]">GitHub</Button>
                    <Link to={`/projects/${repo.slug}`}>
                      <Button variant="secondary" className="!px-3 !py-1.5 !text-[11px]">Details</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="!px-3 !py-1.5 !text-[11px]">Live Demo</Button>
                    <Button variant="ghost" className="!px-3 !py-1.5 !text-[11px]">GitHub</Button>
                  </>
                )}
              </div>

              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(124,92,255,0.06),transparent_70%)]" />
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
