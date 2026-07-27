import React, { useState, useMemo, Suspense } from "react";
import { PageTransition } from "@/components/animations/PageTransition";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { PremiumProjectCard } from "@/components/shared/PremiumProjectCard";
import { projects, categories } from "@/data/projects";
import { cn } from "@/utils/cn";

// Image imports
import bp1 from "@/assets/images/projects/bp1.png";
import bp2 from "@/assets/images/projects/bp2.png";
import bp3 from "@/assets/images/projects/bp3.png";
import ap1 from "@/assets/images/projects/ap1.png";
import ap2 from "@/assets/images/projects/ap2.png";
import ap3 from "@/assets/images/projects/ap3.png";
import mp1 from "@/assets/images/projects/mp1.png";
import mp2 from "@/assets/images/projects/mp2.png";
import mp3 from "@/assets/images/projects/mp3.png";
import sp1 from "@/assets/images/projects/sp1.png";
import boutiqueSvg from "@/assets/images/projects/boutique-ecommerce.svg";
import auraSvg from "@/assets/images/projects/aura-collection.svg";
import visicoreSvg from "@/assets/images/projects/visicore.svg";
import mealSvg from "@/assets/images/projects/meal-management.svg";

const ProjectsScene = React.lazy(() => import("@/components/three/ProjectsScene").then(m => ({ default: m.ProjectsScene })));

// Project-specific image galleries and configurations
const projectConfigs: Record<string, {
  images: { src: string; alt: string }[];
  features: string[];
  badges?: { label: string; color?: string }[];
  role?: string;
  status?: string;
}> = {
  "boutique-ecommerce": {
    images: [
      { src: bp1, alt: "Boutique E-Commerce – Homepage" },
      { src: bp2, alt: "Boutique E-Commerce – Product Details" },
      { src: bp3, alt: "Boutique E-Commerce – Admin Dashboard" },
    ],
    features: [
      "Authentication",
      "Admin Dashboard",
      "Order Management",
      "Wishlist",
      "Shopping Cart",
      "Payment Integration",
    ],
    badges: [
      { label: "Featured Project" },
      { label: "Laravel Full Stack", color: "rgba(255,255,255,0.5)" },
    ],
    status: "Production Ready",
  },
  "aura-collection": {
    images: [
      { src: ap2, alt: "AURA Collection – Product Gallery" },
      { src: ap1, alt: "AURA Collection – Luxury Storefront" },
      { src: ap3, alt: "AURA Collection – Admin Panel" },
    ],
    features: [
      "Luxury UI",
      "Product Catalog",
      "Wishlist",
      "Secure Checkout",
      "Admin Dashboard",
      "Inventory Tracking",
    ],
    role: "Full Stack Developer",
    status: "Production Ready",
  },
  "visicore": {
    // @todo Replace with vp1, vp2, vp3 images when provided
    images: [
      { src: visicoreSvg, alt: "VisiCore – Field Visit Management" },
      { src: visicoreSvg, alt: "VisiCore – Dashboard" },
      { src: visicoreSvg, alt: "VisiCore – Reports" },
    ],
    features: [
      "Lead Tracking",
      "Route History",
      "Visit Evidence",
      "GPS Check-in",
      "Reports Dashboard",
      "Attendance",
    ],
    role: "Full Stack Developer",
    status: "Production Ready",
  },
  "meal-management": {
    images: [
      { src: mp1, alt: "Meal Management – Dashboard" },
      { src: mp2, alt: "Meal Management – Reports" },
      { src: mp3, alt: "Meal Management – Admin Panel" },
    ],
    features: [
      "Meal Tracking",
      "Monthly Reports",
      "Cost Analysis",
      "Role-based Access",
      "Meal History",
      "Budget Tracking",
    ],
    role: "Full Stack Developer",
    status: "Production Ready",
  },
  "study-master": {
    // @todo Replace with sp2, sp3 images when provided
    images: [
      { src: sp1, alt: "Study Master – Dashboard" },
      { src: sp1, alt: "Study Master – Calendar" },
    ],
    features: [
      "Subject Management",
      "Task Tracking",
      "Calendar Integration",
      "Progress Analytics",
      "Student Dashboard",
    ],
    role: "Full Stack Developer",
    status: "In Development",
  },
  "developer-portfolio": {
    images: [
      { src: boutiqueSvg, alt: "Developer Portfolio" },
    ],
    features: [
      "Clean Architecture",
      "3D Experiences",
      "Smooth Animations",
      "Responsive Design",
    ],
    role: "Frontend Architect",
    status: "Live",
  },
  "ai-study-planner": {
    images: [
      { src: auraSvg, alt: "AI Study Planner" },
    ],
    features: [
      "Adaptive Scheduling",
      "Spaced Repetition",
      "Performance Analytics",
      "Goal Tracking",
    ],
    role: "Full Stack Developer",
    status: "In Development",
  },
  "event-management": {
    images: [
      { src: mealSvg, alt: "Event Management Platform" },
    ],
    features: [
      "Multi-tier Tickets",
      "QR Check-in",
      "Real-time Analytics",
      "Email Campaigns",
    ],
    role: "Full Stack Developer",
    status: "Production Ready",
  },
};

const categoryOrder: Record<string, number> = {
  Laravel: 0,
  "Full Stack": 1,
  Backend: 2,
  React: 3,
  Frontend: 4,
};

const categoryColors: Record<string, string> = {
  Laravel: "#FF2D20",
  "Full Stack": "#A855F7",
  Backend: "#22C55E",
  React: "#3BC9FF",
  Frontend: "#F59E0B",
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

  const totalCount = projects.length;

  return (
    <PageTransition direction="up">
      {/* Hero Section */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-[#050505]" />}>
          <ProjectsScene />
        </Suspense>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] pointer-events-none" />

        <div className="max-width-container w-full pt-36 pb-24 relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] font-medium tracking-wider text-white/40">
                {totalCount} Projects • Laravel Ecosystem
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
              My<br /><span className="text-gradient">Projects</span>
            </h1>
            <p className="text-white/40 text-base md:text-lg max-w-2xl leading-relaxed">
              Laravel-powered applications and full-stack web projects — from luxury e-commerce platforms
              to field management systems, all built with clean architecture and modern best practices.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="section-padding relative overflow-hidden">
        {/* Background ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(124,92,255,0.05) 0%, rgba(59,201,255,0.02) 30%, transparent 70%)",
          }}
        />

        <div className="max-width-container">
          {/* Filter Bar */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 p-1 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-1 p-1">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  const catColor = categoryColors[cat] || "#7C5CFF";
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                        isActive
                          ? "text-white shadow-lg"
                          : "text-white/40 hover:text-white/70"
                      )}
                      style={
                        isActive
                          ? {
                              background: `linear-gradient(135deg, ${catColor}22, ${catColor}11)`,
                              boxShadow: `inset 0 0 0 1px ${catColor}44`,
                            }
                          : {}
                      }
                    >
                      {isActive && (
                        <span
                          className="absolute inset-0 rounded-full opacity-20 blur-sm"
                          style={{ background: catColor }}
                        />
                      )}
                      <span className="relative z-10">{cat}</span>
                      {isActive && (
                        <span
                          className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full"
                          style={{ background: catColor }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Search Input */}
              <div className="relative px-2 pb-2 md:pb-0 md:pr-2">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full md:w-56 pl-9 pr-4 py-2.5 rounded-full text-sm text-white/60 placeholder:text-white/20 border border-white/5 bg-white/[0.03] focus:outline-none focus:border-white/10 transition-colors"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Results count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-white/25">
              Showing <span className="text-white/50 font-medium">{filtered.length}</span> of{" "}
              <span className="text-white/50 font-medium">{totalCount}</span> projects
            </p>
            {activeCategory !== "All" && (
              <button
                onClick={() => setActiveCategory("All")}
                className="text-xs text-white/20 hover:text-white/50 transition-colors"
              >
                Clear filter
              </button>
            )}
          </div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-24">
              <div className="text-5xl mb-4 opacity-10">🔍</div>
              <p className="text-white/20 text-lg mb-2">No projects match your search.</p>
              <p className="text-white/10 text-sm mb-6">Try a different category or search term.</p>
              <button
                onClick={() => { setActiveCategory("All"); setSearch(""); }}
                className="px-5 py-2 rounded-full text-xs font-medium border border-white/10 text-white/30 hover:text-white/60 hover:border-white/20 transition-all"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
            {filtered.map((project, i) => {
              const config = projectConfigs[project.slug] || {
                images: [{ src: boutiqueSvg, alt: project.title }],
                features: [],
              };

              return (
                <ScrollReveal key={project.slug} delay={0.04 * i}>
                  <div className="project-card-wrapper h-full">
                    <PremiumProjectCard
                      title={project.title}
                      description={project.shortDesc || project.description}
                      tags={project.tags}
                      features={config.features}
                      slug={project.slug}
                      images={config.images}
                      liveUrl={project.liveUrl}
                      githubUrl={project.githubUrl}
                      role={config.role}
                      status={config.status}
                      badges={config.badges}
                    />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <ScrollReveal delay={0.3}>
            <div className="mt-16 md:mt-20 text-center">
              <div
                className="inline-flex items-center gap-6 p-2 rounded-full transition-all duration-500"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold rounded-full cursor-default"
                  style={{
                    background: "linear-gradient(135deg, #FF2D20, #FF6B35)",
                    color: "white",
                    boxShadow: "0 8px 25px -5px rgba(255,45,32,0.2)",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  GitHub
                </span>
                <span className="text-[11px] font-medium tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>
                  All projects open source
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
