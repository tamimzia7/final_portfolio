import { ScrollReveal } from "@/components/animations/ScrollReveal";

const languages = [
  { name: "Laravel / PHP", percent: 45, color: "#FF2D20", gradient: "from-[#FF2D20] to-[#FF6B5A]" },
  { name: "TypeScript", percent: 20, color: "#3178c6", gradient: "from-[#3178c6] to-[#5BA3E6]" },
  { name: "JavaScript", percent: 15, color: "#f1e05a", gradient: "from-[#f1e05a] to-[#F7DC6F]" },
  { name: "MySQL", percent: 10, color: "#4479a1", gradient: "from-[#4479a1] to-[#6BA3D6]" },
  { name: "HTML / CSS", percent: 5, color: "#e34c26", gradient: "from-[#e34c26] to-[#F07B5A]" },
  { name: "Python", percent: 3, color: "#3572a5", gradient: "from-[#3572a5] to-[#6BAED6]" },
  { name: "Git / DevOps", percent: 2, color: "#f34f29", gradient: "from-[#f34f29] to-[#F8764A]" },
];

export function TopLanguages() {
  return (
    <ScrollReveal>
      <div className="glass rounded-3xl p-6 md:p-8">
        <h3 className="text-xl font-semibold text-white/90 mb-6">Top Languages</h3>
        <div className="space-y-4">
          {languages.map((lang) => (
            <div key={lang.name} className="group">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/70 font-medium">{lang.name}</span>
                <span className="text-white/40 tabular-nums">{lang.percent}%</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r transition-all duration-1000 group-hover:opacity-90"
                  style={{
                    width: `${lang.percent}%`,
                    backgroundImage: `linear-gradient(to right, ${lang.color}, color-mix(in srgb, ${lang.color} 70%, white))`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-3 w-full rounded-full overflow-hidden bg-white/5 flex">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className="h-full transition-all duration-300 hover:opacity-80"
                  style={{
                    width: `${lang.percent}%`,
                    backgroundColor: lang.color,
                  }}
                  title={`${lang.name}: ${lang.percent}%`}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            {languages.map((lang) => (
              <span key={lang.name} className="flex items-center gap-1.5 text-[10px] text-white/30">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                {lang.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
