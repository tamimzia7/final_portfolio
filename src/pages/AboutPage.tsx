import { PageTransition } from "@/components/animations/PageTransition";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlassCard } from "@/components/shared/GlassCard";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AboutScene } from "@/components/three/AboutScene";
import { HeroPortrait } from "@/components/shared/HeroPortrait";

const values = [
  { title: "Clean Architecture", desc: "I believe well-structured code is the foundation of maintainable applications. Every Laravel project follows service-repository patterns, SOLID principles, and thoughtful separation of concerns." },
  { title: "Security First", desc: "Security is not an afterthought — it's built into every layer. From SQL injection prevention through Eloquent to CSRF protection, XSS prevention, and proper authentication flows." },
  { title: "Performance Mindset", desc: "Optimized queries, proper indexing, Redis caching, and queue workers. Every Laravel application should handle growth without degrading the user experience." },
  { title: "User Experience", desc: "A powerful backend should be matched with an intuitive frontend. I build admin panels and interfaces that make complex operations feel simple." },
];

const workflow = [
  "Requirements Analysis & Database Design",
  "Laravel Architecture & Authentication Setup",
  "API Development & Business Logic",
  "Admin Dashboard & Frontend",
  "Testing, Security Review & Optimization",
  "Deployment & Monitoring",
];

const tools = [
  "Laravel", "PHP", "MySQL", "VS Code", "Postman", "Git", "Docker", "Redis", "Forge", "Vapor",
];

const achievements = [
  "Built 12+ production Laravel applications",
  "Designed 20+ database schemas with complex relationships",
  "Developed REST APIs serving 10K+ daily requests",
  "Built comprehensive admin dashboards for business clients",
];

export default function AboutPage() {
  return (
    <PageTransition direction="up">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <AboutScene />
        <div className="max-width-container w-full pt-32 pb-20">
          <ScrollReveal>
            <Badge className="mb-6">About Me</Badge>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
              Full Stack<br /><span className="text-gradient">Developer</span>
            </h1>
            <p className="text-white/40 text-lg mt-6 max-w-xl">Laravel expert who builds complete web applications — from database schema to frontend interface.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding border-t border-white/5">
        <div className="max-width-container">
          <SectionHeading title="My" highlight="Story" subtitle="How I became a Laravel-focused Full Stack Developer." />
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <div className="space-y-6 text-white/50 leading-relaxed">
                <p>My journey began with curiosity about how web applications work behind the scenes. While frontend development was my entry point, I quickly gravitated toward backend development where I discovered Laravel — a framework that fundamentally shaped how I think about software architecture.</p>
                <p>Laravel's elegant syntax, powerful ORM, and comprehensive ecosystem made me fall in love with backend development. I spent countless hours studying Eloquent relationships, service containers, queue architecture, and authentication patterns.</p>
                <p>Today, I build complete full-stack applications with Laravel at the core. Every project starts with database design, followed by API architecture, authentication, and business logic — before a single frontend component is created.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2} direction="right" className="space-y-6">
              <HeroPortrait variant="about" />
              <GlassCard>
                <h3 className="text-lg font-semibold text-white/90 mb-4">Learning Journey</h3>
                <div className="space-y-4">
                  {[
                    "2021 — Started with HTML, CSS, JavaScript & PHP",
                    "2022 — Learned Laravel, built first full-stack application",
                    "2023 — Mastered Eloquent, Queues, Authentication, REST APIs",
                    "2024 — Specialized in Laravel architecture, admin panels, and React frontends",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-laravel mt-0.5">&#9632;</span>
                      <span className="text-sm text-white/60">{item}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-white/5">
        <div className="max-width-container">
          <SectionHeading title="Why" highlight="Laravel" subtitle="Why Laravel is my primary backend framework." />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Elegant Architecture", desc: "Laravel's service container, facades, and dependency injection encourage clean, testable code that scales with your application." },
              { title: "Eloquent ORM", desc: "The most expressive ORM I've worked with. Complex relationships, eager loading, and query scoping make database interactions a joy." },
              { title: "Security Built-in", desc: "CSRF protection, SQL injection prevention, XSS prevention, and authentication scaffolding — Laravel handles security at the framework level." },
              { title: "Ecosystem & Tooling", desc: "Forge, Vapor, Horizon, Telescope, Nova — Laravel's ecosystem provides enterprise-grade tools for deployment, monitoring, and management." },
              { title: "Queue & Job Architecture", desc: "Laravel Queues with Horizon provide a beautiful interface for handling async tasks, from email delivery to complex data processing." },
              { title: "Community & Documentation", desc: "The Laravel community is one of the most active in the ecosystem. Comprehensive documentation and countless packages accelerate development." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={0.05 * i}>
                <div className="glass-laravel rounded-4xl p-6 h-full">
                  <h3 className="text-base font-semibold text-white/90 mb-2">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-white/5">
        <div className="max-width-container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading title="Backend" highlight="Philosophy" subtitle="How I approach backend development." />
              <ScrollReveal>
                <div className="space-y-6 text-white/50 leading-relaxed">
                  <p>I follow a Service-Repository pattern in Laravel that keeps controllers thin, business logic centralized, and database queries optimized. Every API endpoint goes through validation, authorization, and transformation layers.</p>
                  <p>Database design comes first. Before writing a single route, I map out the schema — tables, relationships, indexes, and constraints. A well-designed database is the foundation of every successful application.</p>
                </div>
              </ScrollReveal>
            </div>
            <div>
              <SectionHeading title="Database" highlight="Design" subtitle="My approach to data architecture." />
              <ScrollReveal delay={0.1} direction="right">
                <GlassCard>
                  <div className="space-y-4">
                    {[
                      "Normalize to 3NF, denormalize strategically for performance",
                      "Use migrations as the single source of truth for schema",
                      "Design indexes based on query patterns, not assumptions",
                      "Leverage foreign keys for referential integrity",
                      "Use JSON columns for flexible attribute storage",
                      "Implement soft deletes for data recovery",
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 text-sm text-white/60">
                        <span className="text-accent">&#9632;</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-white/5">
        <div className="max-width-container">
          <SectionHeading title="Core" highlight="Values" subtitle="Principles that guide every project." />
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={0.1 * i}>
                <GlassCard glow>
                  <h3 className="text-xl font-semibold text-white/90 mb-3">{v.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{v.desc}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-white/5">
        <div className="max-width-container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading title="Development" highlight="Workflow" subtitle="How I build applications from idea to deployment." />
              <div className="space-y-3">
                {workflow.map((step, i) => (
                  <ScrollReveal key={step} delay={0.05 * i} direction="left">
                    <div className="flex items-center gap-4 glass rounded-2xl p-4 glass-hover">
                      <span className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-bold">{i + 1}</span>
                      <span className="text-white/70">{step}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading title="Tools &" highlight="Environment" subtitle="My daily development toolkit." />
              <div className="flex flex-wrap gap-3 mb-12">
                {tools.map((t, i) => (
                  <ScrollReveal key={t} delay={0.03 * i}>
                    <span className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                      ["Laravel", "PHP", "MySQL", "Redis"].includes(t)
                        ? "glass-laravel text-white/80"
                        : "glass text-white/60 glass-hover"
                    }`}>{t}</span>
                  </ScrollReveal>
                ))}
              </div>
              <SectionHeading title="Key" highlight="Achievements" />
              <div className="space-y-3">
                {achievements.map((a, i) => (
                  <ScrollReveal key={a} delay={0.05 * i}>
                    <div className="flex items-center gap-3 text-white/60">
                      <span className="text-accent">&#10003;</span>
                      <span>{a}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-white/5">
        <div className="max-width-container">
          <GlassCard className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Build Something Together</h2>
            <p className="text-white/40 mb-6">I'm available for Laravel development, full-stack projects, and technical consulting.</p>
            <div className="flex justify-center gap-4">
              <Button as="a" href="./resume.pdf">Download Resume</Button>
              <Button variant="secondary" as="a" href="/contact">Contact Me</Button>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageTransition>
  );
}
