import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";

const levels = [0, 1, 2, 3, 4];
const levelColors = [
  "rgba(255,255,255,0.03)",
  "rgba(124,92,255,0.2)",
  "rgba(124,92,255,0.4)",
  "rgba(59,201,255,0.4)",
  "rgba(59,201,255,0.6)",
];

const yearData = Array.from({ length: 140 }, () => {
  const r = Math.random();
  if (r < 0.4) return 0;
  if (r < 0.65) return 1;
  if (r < 0.8) return 2;
  if (r < 0.92) return 3;
  return 4;
});

const statsData = [
  { value: "25+", label: "Repositories", color: "text-gradient" },
  { value: "12+", label: "Laravel Projects", color: "text-laravel" },
  { value: "500+", label: "Commits", color: "text-gradient" },
  { value: "200+", label: "Stars", color: "text-accent" },
];

const pinnedRepos = [
  { name: "boutique-ecommerce", lang: "PHP", stars: 48, forks: 13, laravel: true },
  { name: "aura-collection", lang: "PHP", stars: 45, forks: 12, laravel: true },
  { name: "visicore", lang: "PHP", stars: 32, forks: 8, laravel: true },
];

const activities = [
  { repo: "boutique-ecommerce", msg: "Add product variant management", time: "2d", color: "text-laravel" },
  { repo: "aura-collection", msg: "Update admin dashboard layout", time: "1w", color: "text-accent" },
  { repo: "visicore", msg: "Implement GPS check-in validation", time: "1w", color: "text-accent-secondary" },
];

export function GitHubActivitySection() {
  return (
    <section className="section-padding border-t border-white/5">
      <div className="max-width-container">
        <SectionHeading
          title="GitHub"
          highlight="Activity"
          subtitle="Open source contributions, Laravel projects, and active development work."
        />
        <div className="grid lg:grid-cols-3 gap-5 md:gap-6">
          <div className="lg:col-span-2 space-y-5">
            <ScrollReveal>
              <div className="glass rounded-3xl p-5 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white/70">Contribution Graph</h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-white/20">
                    <span>Less</span>
                    {levels.map((l) => (
                      <div key={l} className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: levelColors[l] }} />
                    ))}
                    <span>More</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-[2px]">
                  {yearData.map((c, i) => (
                    <div
                      key={i}
                      className="w-[5px] h-[5px] md:w-[7px] md:h-[7px] rounded-[1px] transition-all duration-200 hover:scale-[2] cursor-pointer"
                      style={{ backgroundColor: levelColors[c] }}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {statsData.map((s, i) => (
                <ScrollReveal key={s.label} delay={0.05 * i}>
                  <div className="glass rounded-2xl p-4 text-center">
                    <div className={`text-xl md:text-2xl font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-[10px] md:text-xs text-white/40 mt-1">{s.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <ScrollReveal>
              <div className="glass rounded-3xl p-5 md:p-6">
                <h3 className="text-sm font-semibold text-white/70 mb-4">Pinned Repositories</h3>
                <div className="space-y-3">
                  {pinnedRepos.map((repo) => (
                    <div
                      key={repo.name}
                      className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${repo.laravel ? "bg-laravel" : "bg-accent"}`} />
                          <span className="text-xs font-mono text-white/70">{repo.name}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-laravel/60">{repo.lang}</span>
                          <span className="text-[10px] text-white/20">&star; {repo.stars}</span>
                          <span className="text-[10px] text-white/20">Fork {repo.forks}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="glass rounded-3xl p-5 md:p-6">
                <h3 className="text-sm font-semibold text-white/70 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {activities.map((act, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className={`w-1.5 h-1.5 rounded-full ${act.color} mt-1.5 shrink-0`} />
                      <div className="min-w-0">
                        <span className={`text-xs font-mono ${act.color}`}>{act.repo}</span>
                        <p className="text-[11px] text-white/40 truncate">{act.msg}</p>
                      </div>
                      <span className="text-[10px] text-white/20 ml-auto shrink-0">{act.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <ScrollReveal delay={0.4}>
          <div className="mt-10">
            <Link to="/github"><Button variant="secondary">Visit GitHub Dashboard &rarr;</Button></Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
