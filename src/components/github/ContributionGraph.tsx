import { ScrollReveal } from "@/components/animations/ScrollReveal";

const levels = [0, 1, 2, 3, 4];
const levelColors = [
  "rgba(255,255,255,0.03)",
  "rgba(124,92,255,0.2)",
  "rgba(124,92,255,0.4)",
  "rgba(59,201,255,0.4)",
  "rgba(59,201,255,0.6)",
];

function generateYearData() {
  const days: number[] = [];
  for (let i = 0; i < 364; i++) {
    const r = Math.random();
    if (r < 0.4) days.push(0);
    else if (r < 0.65) days.push(1);
    else if (r < 0.8) days.push(2);
    else if (r < 0.92) days.push(3);
    else days.push(4);
  }
  return days;
}

const yearData = generateYearData();
const totalContributions = yearData.reduce((a, b) => a + b, 0);
const bestMonth = Math.max(
  ...(() => {
    const months: number[] = [];
    for (let m = 0; m < 12; m++) {
      let sum = 0;
      for (let d = m * 30; d < (m + 1) * 30 && d < yearData.length; d++) {
        sum += yearData[d];
      }
      months.push(sum);
    }
    return months;
  })(),
);

function computeStreaks(data: number[]) {
  let current = 0;
  let longest = 0;
  let running = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i] > 0) {
      if (i === data.length - 1 || running > 0) running++;
      if (i < data.length - 1 && running === 0) break;
    } else {
      if (running > 0) break;
    }
  }
  current = running;

  running = 0;
  for (const d of data) {
    if (d > 0) {
      running++;
      longest = Math.max(longest, running);
    } else {
      running = 0;
    }
  }

  return { current, longest };
}

const streaks = computeStreaks(yearData);

export function ContributionGraph() {
  return (
    <ScrollReveal>
      <div className="glass rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white/90">365-Day Contribution Activity</h3>
            <p className="text-sm text-white/40 mt-1">{totalContributions} contributions in the last year</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/30">
            <span>Less</span>
            {levels.map((l) => (
              <div
                key={l}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: levelColors[l] }}
              />
            ))}
            <span>More</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-[2px] md:gap-[3px]">
          {yearData.map((c, i) => (
            <div
              key={i}
              className="w-[6px] h-[6px] md:w-[10px] md:h-[10px] rounded-[1px] transition-all duration-200 hover:scale-[2] hover:rounded-sm cursor-pointer"
              style={{ backgroundColor: levelColors[c] }}
              title={`${c} contributions on day ${i + 1}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5">
          {[
            { label: "Current Streak", value: streaks.current, unit: "days", color: "text-green-400" },
            { label: "Longest Streak", value: streaks.longest, unit: "days", color: "text-accent-secondary" },
            { label: "Best Month", value: bestMonth, unit: "contributions", color: "text-accent" },
            { label: "Total", value: totalContributions, unit: "contributions", color: "text-gradient" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className={`text-2xl md:text-3xl font-bold ${item.color}`}>{item.value}</div>
              <div className="text-xs text-white/40 mt-1">{item.label}</div>
              <div className="text-[10px] text-white/20">{item.unit}</div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
