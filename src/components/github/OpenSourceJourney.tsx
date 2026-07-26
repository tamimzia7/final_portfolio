import { ScrollReveal } from "@/components/animations/ScrollReveal";

const milestones = [
  { year: "2022", title: "Started Learning", desc: "Began with PHP fundamentals and discovered the Laravel framework.", dot: "bg-white/20" },
  { year: "2022", title: "Built First Laravel Project", desc: "Completed my first full-stack Laravel application with authentication and CRUD.", dot: "bg-accent-secondary" },
  { year: "2023", title: "Created REST APIs", desc: "Started building production-ready REST APIs with Sanctum authentication and API resources.", dot: "bg-accent" },
  { year: "2024", title: "Full Stack Applications", desc: "Built complete full-stack applications — Laravel backends with React frontends, deployed to production.", dot: "bg-laravel" },
  { year: "2025", title: "Open Source Contributions", desc: "Published multiple open-source Laravel projects, contributing to the developer community.", dot: "bg-laravel" },
  { year: "Future", title: "Open Source Goals", desc: "Plan to contribute to Laravel core packages and publish reusable PHP/Laravel libraries.", dot: "bg-gradient-to-br from-accent to-accent-secondary" },
];

const titleColors: Record<string, string> = {
  "Started Learning": "text-white/40",
  "Built First Laravel Project": "text-accent-secondary",
  "Created REST APIs": "text-accent",
  "Full Stack Applications": "text-laravel",
  "Open Source Contributions": "text-laravel",
  "Open Source Goals": "text-gradient",
};

export function OpenSourceJourney() {
  return (
    <ScrollReveal>
      <div className="glass rounded-3xl p-6 md:p-8">
        <h3 className="text-xl font-semibold text-white/90 mb-6">Open Source Journey</h3>
        <div className="space-y-0">
          {milestones.map((m, i) => (
            <div
              key={m.title}
              className="group flex gap-4 py-4 border-b border-white/[0.02] last:border-0 hover:bg-white/[0.02] -mx-6 px-6 transition-colors duration-200"
            >
              <div className="relative flex flex-col items-center">
                <div className={`w-2.5 h-2.5 rounded-full ${m.dot} mt-1 shadow-[0_0_6px_rgba(124,92,255,0.3)]`} />
                {i < milestones.length - 1 && <div className="w-px flex-1 bg-white/[0.04] mt-1" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-white/20">{m.year}</span>
                  <h4 className={`text-sm font-semibold ${titleColors[m.title]}`}>{m.title}</h4>
                </div>
                <p className="text-xs md:text-sm text-white/40 mt-1 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
