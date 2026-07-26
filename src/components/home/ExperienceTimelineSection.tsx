import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";

const milestones = [
  { year: "2021", title: "Started Programming", desc: "Began my journey with HTML, CSS, JavaScript, and PHP fundamentals.", color: "bg-white/20" },
  { year: "2022", title: "Learned PHP & MySQL", desc: "Deep-dived into server-side programming, database design, and SQL.", color: "bg-accent-secondary" },
  { year: "2022", title: "Mastered Laravel", desc: "Discovered Laravel and fell in love with its elegant architecture and ecosystem.", color: "bg-accent" },
  { year: "2023", title: "Built Business Applications", desc: "Developed production-ready Laravel applications — e-commerce, analytics, and admin systems.", color: "bg-laravel" },
  { year: "2024", title: "Full Stack Development", desc: "Combined Laravel backends with React frontends for complete full-stack applications.", color: "bg-laravel" },
  { year: "2025 — Present", title: "Advanced Laravel Architecture", desc: "Specializing in scalable Laravel architecture, performance optimization, and modern frontend integration.", color: "bg-gradient-to-br from-accent to-accent-secondary" },
];

const titleColors: Record<string, string> = {
  "Started Programming": "text-white/50",
  "Learned PHP & MySQL": "text-accent-secondary",
  "Mastered Laravel": "text-accent",
  "Built Business Applications": "text-laravel",
  "Full Stack Development": "text-laravel",
  "Advanced Laravel Architecture": "text-gradient",
};

export function ExperienceTimelineSection() {
  return (
    <section className="section-padding border-t border-white/5">
      <div className="max-width-container">
        <SectionHeading
          title="Experience"
          highlight="Timeline"
          subtitle="My journey from first line of code to full-stack Laravel developer."
        />
        <div className="max-w-2xl mx-auto">
          {milestones.map((m, i) => (
            <ScrollReveal key={m.title} delay={0.1 * i} direction="left">
              <div className="group flex gap-5 py-5">
                <div className="relative flex flex-col items-center">
                  <div className={`w-3.5 h-3.5 rounded-full ${m.color} mt-1 shadow-[0_0_8px_rgba(124,92,255,0.3)] shrink-0`} />
                  {i < milestones.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-white/10 to-transparent mt-1" />}
                </div>
                <div className="flex-1 pb-5">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[11px] font-mono text-white/20">{m.year}</span>
                    <h3 className={`text-base md:text-lg font-semibold ${titleColors[m.title]}`}>{m.title}</h3>
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.6}>
          <div className="mt-6">
            <Link to="/experience"><Button variant="secondary">Read Full Journey &rarr;</Button></Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
