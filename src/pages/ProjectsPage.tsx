import React, { useState, useMemo, Suspense } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/animations/PageTransition";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlassCard } from "@/components/shared/GlassCard";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { projects, categories } from "@/data/projects";
import { cn } from "@/utils/cn";

const ProjectsScene = React.lazy(() => import("@/components/three/ProjectsScene").then(m => ({ default: m.ProjectsScene })));

const categoryOrder: Record<string, number> = {
  Laravel: 0,
  "Full Stack": 1,
  Backend: 2,
  React: 3,
  Frontend: 4,
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const result = projects.filter((p) => {
      const matchCategory = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = !search
        || p.title.toLowerCase().includes(search.toLowerCase())
        || p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
        || p.category.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
    return result.sort((a, b) => (categoryOrder[a.category] ?? 99) - (categoryOrder[b.category] ?? 99));
  }, [activeCategory, search]);

  return (
    <PageTransition direction="up">
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-[#050505]" />}><ProjectsScene /></Suspense>
        <div className="max-width-container w-full pt-32 pb-20">
          <ScrollReveal>
            <Badge className="mb-6">Portfolio</Badge>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
              My<br /><span className="text-gradient">Projects</span>
            </h1>
            <p className="text-white/40 text-lg mt-6 max-w-xl">Laravel-powered applications and full-stack web projects I've designed and built.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding border-t border-white/5">
        <div className="max-width-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} type="button" onClick={() => setActiveCategory(cat)}
                  className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    activeCategory === cat ? "bg-accent text-white" : "glass text-white/50 hover:text-white/80",
                  )}
                >{cat}</button>
              ))}
            </div>
            <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="glass rounded-full px-5 py-2.5 text-sm text-white/70 w-full md:w-64 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-20 text-white/30">No projects match your search.</div>
            )}
            {filtered.map((project, i) => (
              <ScrollReveal key={project.slug} delay={0.05 * i}>
                <Link to={`/projects/${project.slug}`} className="block h-full">
                  <GlassCard glow className={`h-full group cursor-pointer ${project.category === "Laravel" ? "border-laravel/10" : ""}`}>
                    <div className={`h-40 rounded-2xl mb-5 flex items-center justify-center overflow-hidden relative ${
                      project.category === "Laravel" ? "bg-gradient-to-br from-laravel/5 via-laravel/[0.02] to-transparent" : "glass"
                    }`}>
                      <div className="text-6xl opacity-[0.08] font-bold">{project.title.charAt(0)}</div>
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white/90">{project.title}</h3>
                      <span className={`text-[10px] font-mono px-2 py-1 rounded-full ${
                        project.category === "Laravel" ? "bg-laravel/10 text-laravel" : "glass text-white/30"
                      }`}>{project.category}</span>
                    </div>
                    <p className="text-sm text-white/50 mb-4 line-clamp-2">{project.shortDesc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((t) => (
                        <span key={t} className={`px-2 py-0.5 text-[10px] rounded-full ${
                          t === "Laravel" || t === "PHP" || t === "MySQL"
                            ? "bg-laravel/10 text-laravel"
                            : "bg-white/5 text-white/40"
                        }`}>{t}</span>
                      ))}
                      {project.tags.length > 3 && <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 text-white/30">+{project.tags.length - 3}</span>}
                    </div>
                  </GlassCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
