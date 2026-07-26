import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  highlight?: boolean;
  gradient?: string;
}

const stats: Stat[] = [
  { value: 25, suffix: "+", label: "Repositories", gradient: "from-accent to-accent-secondary" },
  { value: 12, suffix: "+", label: "Laravel Projects", highlight: true, gradient: "from-laravel to-orange-500" },
  { value: 500, suffix: "+", label: "Commits", gradient: "from-accent-secondary to-cyan-400" },
  { value: 200, suffix: "+", label: "Contributions", gradient: "from-accent to-accent-secondary" },
  { value: 15, suffix: "+", label: "Followers", gradient: "from-purple-400 to-accent" },
  { value: 200, suffix: "+", label: "Stars", gradient: "from-yellow-400 to-orange-500" },
  { value: 14, suffix: "", label: "Current Streak", gradient: "from-green-400 to-emerald-500" },
  { value: 30, suffix: "", label: "Longest Streak", gradient: "from-accent-secondary to-cyan-400" },
];

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1500;
          const step = Math.ceil(value / (duration / 16));
          const interval = setInterval(() => {
            start += step;
            if (start >= value) {
              setDisplay(value);
              clearInterval(interval);
            } else {
              setDisplay(start);
            }
          }, 16);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function GitHubStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {stats.map((s, i) => (
        <ScrollReveal key={s.label} delay={0.05 * i}>
          <div
            className={`relative group rounded-3xl p-5 md:p-6 h-full transition-all duration-500 ${
              s.highlight
                ? "bg-gradient-to-br from-laravel/10 via-laravel/[0.03] to-transparent border border-laravel/20"
                : "glass glass-hover"
            }`}
          >
            <div
              className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent mb-1`}
            >
              <AnimatedNumber value={s.value} suffix={s.suffix ?? ""} />
            </div>
            <div className={`text-xs md:text-sm ${s.highlight ? "text-laravel/70" : "text-white/50"}`}>
              {s.label}
            </div>
            <div
              className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                s.highlight
                  ? "shadow-[inset_0_0_30px_rgba(255,45,32,0.08)]"
                  : "shadow-[inset_0_0_30px_rgba(124,92,255,0.06)]"
              }`}
            />
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
