import React, { Suspense } from "react";
import { PageTransition } from "@/components/animations/PageTransition";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlassCard } from "@/components/shared/GlassCard";
import { Badge } from "@/components/shared/Badge";
import { SectionHeading } from "@/components/shared/SectionHeading";

const ExperienceScene = React.lazy(() => import("@/components/three/ExperienceScene").then(m => ({ default: m.ExperienceScene })));

const timeline = [
  { period: "2021", title: "Started Learning Web Development", company: "Self-Taught", type: "education", description: "Began with HTML, CSS, JavaScript, and PHP. Built my first dynamic website and fell in love with backend development." },
  { period: "2022", title: "Discovered Laravel", company: "Self-Directed", type: "education", description: "Started learning Laravel — its elegant architecture, Eloquent ORM, and comprehensive ecosystem immediately clicked with me. Built several practice applications to master the framework." },
  { period: "2022 — 2023", title: "Junior Developer", company: "Tech Startup", type: "work", description: "Built full-stack applications using Laravel, MySQL, and React. Designed database schemas, developed REST APIs, implemented authentication, and contributed to architecture decisions. Laravel became my primary backend tool." },
  { period: "2023", title: "Full Stack Certification", company: "Online Platform", type: "education", description: "Completed advanced certification covering Laravel architecture, API development, queue management, and deployment strategies." },
  { period: "2023 — 2024", title: "Creative Engineer", company: "Digital Agency", type: "work", description: "Developed Laravel-powered applications with complex backend architectures, admin dashboards, and REST APIs. Integrated frontend experiences using React and modern web technologies." },
  { period: "2024", title: "Laravel Open Source Contribution", company: "GitHub", type: "achievement", description: "Contributed to Laravel-related open source projects. Published packages and shared knowledge with the Laravel community." },
  { period: "2024 — Present", title: "Full Stack Developer", company: "Freelance", type: "work", description: "Building complete Laravel applications for clients — from database design and API development to admin panels and frontend integration. Focused on clean architecture, security, and performance." },
  { period: "2025", title: "Advanced Laravel Architecture", company: "Self-Directed", type: "education", description: "Exploring advanced Laravel patterns — event sourcing, CQRS, microservices architecture, and Laravel Vapor serverless deployment." },
];

export default function ExperiencePage() {
  return (
    <PageTransition direction="up">
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-[#050505]" />}><ExperienceScene /></Suspense>
        <div className="max-width-container w-full pt-32 pb-20">
          <ScrollReveal>
            <Badge className="mb-6">Career Timeline</Badge>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
              My<br /><span className="text-gradient">Journey</span>
            </h1>
            <p className="text-white/40 text-lg mt-6 max-w-xl">From first PHP script to building production Laravel applications — my path as a developer.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding border-t border-white/5">
        <div className="max-width-container">
          <div className="relative" style={{ paddingLeft: "28px" }}>
            <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-laravel via-accent to-accent-secondary" />

            <div className="space-y-8">
              {timeline.map((item, i) => {
                const isLaravelRelated = item.title.toLowerCase().includes("laravel") || item.description.toLowerCase().includes("laravel");
                return (
                  <ScrollReveal key={i} delay={0.08 * i} direction="left">
                    <div className="relative pl-12">
                      <div className={`absolute left-[-12px] top-2 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center ${
                        item.type === "work" ? "border-laravel bg-laravel/20" :
                        item.type === "education" ? "border-accent bg-accent/20" :
                        "border-white/30 bg-white/10"
                      }`}>
                        <div className={`w-2.5 h-2.5 rounded-full ${
                          item.type === "work" ? "bg-laravel" :
                          item.type === "education" ? "bg-accent" : "bg-white/50"
                        }`} />
                      </div>

                      <GlassCard className={`!p-6 ${isLaravelRelated ? "border-laravel/10" : ""}`}>
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-accent-secondary">{item.period}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            item.type === "work" ? "bg-laravel/10 text-laravel" :
                            item.type === "education" ? "bg-accent/10 text-accent" : "bg-white/10 text-white/50"
                          }`}>
                            {item.type === "work" ? "Work" : item.type === "education" ? "Learning" : "Achievement"}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white/90 mt-2">{item.title}</h3>
                        <p className="text-sm text-white/40 mb-2">{item.company}</p>
                        <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                      </GlassCard>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
