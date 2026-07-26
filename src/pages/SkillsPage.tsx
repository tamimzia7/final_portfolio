import { PageTransition } from "@/components/animations/PageTransition";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlassCard } from "@/components/shared/GlassCard";
import { Badge } from "@/components/shared/Badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SkillsScene } from "@/components/three/SkillsScene";

const backendSkills = [
  { name: "Laravel", level: 95, projects: "12+", desc: "Full-stack Laravel applications — REST APIs, auth, queues, admin panels, and business systems." },
  { name: "PHP", level: 92, projects: "15+", desc: "Modern PHP with strict types, interfaces, traits, and design patterns." },
  { name: "MySQL", level: 90, projects: "12+", desc: "Complex schemas, optimized queries, indexing strategies, and migration management." },
  { name: "REST API", level: 92, projects: "10+", desc: "Versioned, documented, and secure REST APIs with Sanctum authentication." },
  { name: "Blade", level: 88, projects: "8+", desc: "Server-side rendering with Blade components, layouts, and directives." },
  { name: "Authentication", level: 90, projects: "10+", desc: "Multi-guard auth, Sanctum tokens, OAuth2, role-based access control." },
  { name: "Eloquent ORM", level: 92, projects: "12+", desc: "Complex relationships, eager loading, query scopes, and accessors." },
  { name: "Queues & Jobs", level: 85, projects: "6+", desc: "Async job processing with Horizon, queues for email, notifications, and data processing." },
  { name: "Validation", level: 90, projects: "12+", desc: "Form Request validation, custom rules, and reusable validation logic." },
  { name: "Policies & Gates", level: 88, projects: "8+", desc: "Fine-grained authorization with policies, gates, and middleware." },
  { name: "Caching", level: 85, projects: "6+", desc: "Redis caching strategies, tag-based invalidation, and query caching." },
  { name: "Security", level: 88, projects: "10+", desc: "CSRF, XSS prevention, SQL injection prevention, rate limiting, and HTTPS." },
  { name: "Performance", level: 85, projects: "8+", desc: "Query optimization, eager loading, indexing, and application profiling." },
  { name: "Database Design", level: 92, projects: "12+", desc: "Normalized schemas, ER diagrams, migration planning, and relationship mapping." },
  { name: "API Development", level: 90, projects: "10+", desc: "RESTful APIs with versioning, resources, pagination, and comprehensive error handling." },
  { name: "Events & Notifications", level: 82, projects: "5+", desc: "Event-driven architecture, real-time notifications, and mail configuration." },
  { name: "Middleware", level: 88, projects: "10+", desc: "Custom middleware for logging, throttling, CORS, and request transformation." },
  { name: "Testing", level: 80, projects: "6+", desc: "PHPUnit tests, feature tests, and TDD practices for reliable deployments." },
];

const frontendSkills = [
  { name: "React", level: 85, projects: "8+", desc: "SPAs with hooks, context, and state management. Integrated with Laravel APIs." },
  { name: "TypeScript", level: 82, projects: "6+", desc: "Type-safe React components with interfaces, generics, and strict mode." },
  { name: "JavaScript", level: 88, projects: "12+", desc: "Vanilla JS, ES6+, async patterns, and DOM manipulation." },
  { name: "Tailwind CSS", level: 88, projects: "8+", desc: "Utility-first responsive designs with custom design systems and components." },
  { name: "Bootstrap", level: 85, projects: "6+", desc: "Rapid prototyping and production UIs with Bootstrap 5 and custom theming." },
  { name: "Livewire", level: 78, projects: "3+", desc: "Dynamic Laravel interfaces with Livewire components and Alpine.js." },
];

const creativeSkills = [
  { name: "GSAP", level: 82, projects: "5+", desc: "Production animations, scroll triggers, and timeline-based motion design." },
  { name: "Framer Motion", level: 80, projects: "4+", desc: "React animation library for page transitions and gesture-based interactions." },
  { name: "Lenis", level: 85, projects: "5+", desc: "Smooth scrolling with custom easing and parallax effects." },
  { name: "Three.js", level: 78, projects: "3+", desc: "3D scenes, particle systems, and interactive web experiences." },
  { name: "R3F", level: 75, projects: "2+", desc: "React components for declarative Three.js scene management." },
];

export default function SkillsPage() {
  return (
    <PageTransition direction="up">
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <SkillsScene />
        <div className="max-width-container w-full pt-32 pb-20">
          <ScrollReveal>
            <Badge className="mb-6">Technical Skills</Badge>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
              Skills &<br /><span className="text-gradient">Expertise</span>
            </h1>
            <p className="text-white/40 text-lg mt-6 max-w-xl">Backend-focused developer with Laravel at the core, complemented by modern frontend and creative technologies.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding border-t border-white/5">
        <div className="max-width-container">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-3 h-3 rounded-full bg-laravel" />
            <h2 className="text-2xl font-bold text-white/90">Backend — Laravel & PHP</h2>
            <span className="text-xs text-white/30 ml-auto">Primary Focus — 60%</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {backendSkills.map((skill, i) => (
              <ScrollReveal key={skill.name} delay={0.03 * i}>
                <div className="glass-laravel rounded-4xl p-6 group transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,45,32,0.08)]">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-base font-semibold text-white/90">{skill.name}</h3>
                    <span className="text-xs font-mono text-laravel">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full mb-3 overflow-hidden" style={{ background: "rgba(255,45,32,0.1)" }}>
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${skill.level}%`, background: "linear-gradient(90deg, #FF2D20, #FF2D2088)" }} />
                  </div>
                  <p className="text-xs text-white/40 mb-2">{skill.desc}</p>
                  <span className="text-[10px] text-white/30">{skill.projects} projects</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-white/5">
        <div className="max-width-container">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <h2 className="text-2xl font-bold text-white/90">Frontend</h2>
            <span className="text-xs text-white/30 ml-auto">25%</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {frontendSkills.map((skill, i) => (
              <ScrollReveal key={skill.name} delay={0.05 * i}>
                <GlassCard glow className="!p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-base font-semibold text-white/90">{skill.name}</h3>
                    <span className="text-xs font-mono text-accent-secondary">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 glass rounded-full mb-3 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${skill.level}%`, background: "linear-gradient(90deg, #7C5CFF, #3BC9FF)" }} />
                  </div>
                  <p className="text-xs text-white/40 mb-2">{skill.desc}</p>
                  <span className="text-[10px] text-white/30">{skill.projects} projects</span>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-white/5">
        <div className="max-width-container">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-3 h-3 rounded-full bg-accent-secondary" />
            <h2 className="text-2xl font-bold text-white/90">Creative & Animation</h2>
            <span className="text-xs text-white/30 ml-auto">15%</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {creativeSkills.map((skill, i) => (
              <ScrollReveal key={skill.name} delay={0.07 * i}>
                <GlassCard glow className="!p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-base font-semibold text-white/90">{skill.name}</h3>
                    <span className="text-xs font-mono text-accent-secondary">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 glass rounded-full mb-3 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${skill.level}%`, background: "linear-gradient(90deg, #3BC9FF, #7C5CFF)" }} />
                  </div>
                  <p className="text-xs text-white/40 mb-2">{skill.desc}</p>
                  <span className="text-[10px] text-white/30">{skill.projects} projects</span>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
