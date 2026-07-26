import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface Category {
  name: string;
  color: string;
  border: string;
  bg: string;
  tagBg: string;
  text: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    name: "Backend",
    color: "#FF2D20",
    border: "border-[#FF2D20]/20",
    bg: "bg-[#FF2D20]/[0.03]",
    tagBg: "bg-[#FF2D20]/10",
    text: "text-[#FF2D20]",
    skills: [
      { name: "Laravel", level: 95, icon: "L" },
      { name: "PHP", level: 92, icon: "P" },
      { name: "MySQL", level: 90, icon: "M" },
      { name: "REST API", level: 92, icon: "R" },
    ],
  },
  {
    name: "Frontend",
    color: "#7C5CFF",
    border: "border-[#7C5CFF]/20",
    bg: "bg-[#7C5CFF]/[0.03]",
    tagBg: "bg-[#7C5CFF]/10",
    text: "text-[#7C5CFF]",
    skills: [
      { name: "React", level: 85, icon: "R" },
      { name: "TypeScript", level: 82, icon: "T" },
      { name: "TailwindCSS", level: 88, icon: "T" },
      { name: "Blade", level: 88, icon: "B" },
    ],
  },
  {
    name: "Database",
    color: "#3BC9FF",
    border: "border-[#3BC9FF]/20",
    bg: "bg-[#3BC9FF]/[0.03]",
    tagBg: "bg-[#3BC9FF]/10",
    text: "text-[#3BC9FF]",
    skills: [
      { name: "Redis", level: 85, icon: "R" },
      { name: "Database Design", level: 92, icon: "D" },
      { name: "Query Opt.", level: 88, icon: "Q" },
      { name: "MongoDB", level: 72, icon: "M" },
    ],
  },
  {
    name: "Tools",
    color: "rgba(255,255,255,0.5)",
    border: "border-white/10",
    bg: "bg-white/[0.02]",
    tagBg: "bg-white/10",
    text: "text-white/50",
    skills: [
      { name: "Git", level: 90, icon: "G" },
      { name: "Docker", level: 78, icon: "D" },
      { name: "VS Code", level: 95, icon: "V" },
      { name: "Postman", level: 88, icon: "P" },
    ],
  },
  {
    name: "AI & 3D",
    color: "#22C55E",
    border: "border-[#22C55E]/20",
    bg: "bg-[#22C55E]/[0.03]",
    tagBg: "bg-[#22C55E]/10",
    text: "text-[#22C55E]",
    skills: [
      { name: "Three.js", level: 78, icon: "3" },
      { name: "GSAP", level: 82, icon: "G" },
      { name: "Framer", level: 80, icon: "F" },
      { name: "AI Tools", level: 75, icon: "A" },
    ],
  },
];

function SkillProgress({ level, color }: { level: number; color: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), 200);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          boxShadow: `0 0 8px ${color}44`,
        }}
      />
    </div>
  );
}

export function SkillsOverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-category", {
        scrollTrigger: { trigger: ".skill-grid", start: "top 80%", toggleActions: "play none none reverse" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[400px] pointer-events-none -z-10 opacity-30"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(255,45,32,0.06), transparent 70%)" }}
      />

      <div className="max-width-container">
        <SectionHeading
          title="Skills"
          highlight="Map"
          subtitle="Backend-first architecture with Laravel at the core, complemented by modern frontend and creative technologies."
        />

        <div className="skill-grid grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categories.map((cat, ci) => (
            <div key={cat.name} className="skill-category">
              <div
                className={`relative overflow-hidden rounded-3xl p-5 md:p-6 h-full border ${cat.border} ${cat.bg} transition-all duration-500 group mobile-hover-card`}
                style={{ ['--glow-color' as string]: cat.color }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${cat.color}22` }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
                onTouchStart={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${cat.color}22` }}
                onTouchEnd={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110"
                    style={{ background: cat.tagBg, color: cat.color }}
                  >
                    {cat.name === "Backend" ? "B" : cat.name === "Frontend" ? "F" : cat.name === "Database" ? "DB" : cat.name === "Tools" ? "T" : "AI"}
                  </div>
                  <h3 className="text-sm font-semibold text-white/80">{cat.name}</h3>
                  <div className="ml-auto flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.color }} />
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold shrink-0"
                            style={{ background: cat.tagBg, color: cat.color }}
                          >
                            {skill.icon}
                          </span>
                          <span className="text-xs font-medium text-white/60">{skill.name}</span>
                        </div>
                        <span className="text-[10px] font-mono" style={{ color: cat.color, opacity: 0.7 }}>
                          {skill.level}%
                        </span>
                      </div>
                      <SkillProgress level={skill.level} color={cat.color} />
                    </div>
                  ))}
                </div>

                {/* Hover corner glow */}
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${cat.color}, transparent 70%)` }}
                />
              </div>
            </div>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 glass rounded-full px-2 py-2 pl-6">
              <span className="text-xs text-white/40">18+ technologies mastered</span>
              <Link to="/skills">
                <Button variant="secondary">View All Skills &rarr;</Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
