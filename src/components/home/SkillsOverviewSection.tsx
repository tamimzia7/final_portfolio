import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";
import { cn } from "@/utils/cn";

const categories = [
  {
    name: "Backend",
    skills: [
      { name: "Laravel", highlight: true },
      { name: "PHP", highlight: true },
      { name: "MySQL", highlight: true },
      { name: "REST API", highlight: true },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", highlight: false },
      { name: "TypeScript", highlight: false },
      { name: "JavaScript", highlight: false },
      { name: "TailwindCSS", highlight: false },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", highlight: false },
      { name: "GitHub", highlight: false },
      { name: "Postman", highlight: false },
      { name: "VS Code", highlight: false },
    ],
  },
];

const skillIcons: Record<string, string> = {
  Laravel: "L",
  PHP: "P",
  MySQL: "M",
  "REST API": "R",
  React: "R",
  TypeScript: "T",
  JavaScript: "J",
  TailwindCSS: "T",
  Git: "G",
  GitHub: "G",
  Postman: "P",
  "VS Code": "V",
};

export function SkillsOverviewSection() {
  return (
    <section className="section-padding border-t border-white/5">
      <div className="max-width-container">
        <SectionHeading
          title="Skills"
          highlight="Overview"
          subtitle="Backend-first technology stack with Laravel at the core."
        />
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {categories.map((cat, ci) => (
            <ScrollReveal key={cat.name} delay={0.1 * ci}>
              <div className="glass rounded-3xl p-6 md:p-7 h-full">
                <h3 className="text-lg font-semibold text-white/90 mb-5 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center text-[10px] text-accent font-bold">
                    {cat.name === "Backend" ? "B" : cat.name === "Frontend" ? "F" : "T"}
                  </span>
                  {cat.name}
                </h3>
                <div className="space-y-3">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group",
                        skill.highlight
                          ? "bg-laravel/10 border border-laravel/15"
                          : "bg-white/[0.02] border border-white/5 hover:bg-white/[0.04]",
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300",
                          skill.highlight
                            ? "bg-laravel/20 text-laravel group-hover:bg-laravel/30"
                            : "bg-white/10 text-white/40 group-hover:bg-white/20 group-hover:text-white/60",
                        )}
                      >
                        {skillIcons[skill.name]}
                      </div>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          skill.highlight ? "text-laravel" : "text-white/60 group-hover:text-white/80",
                        )}
                      >
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.4}>
          <div className="mt-10">
            <Link to="/skills"><Button variant="secondary">View All Skills &rarr;</Button></Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
