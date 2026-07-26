import { ScrollReveal } from "@/components/animations/ScrollReveal";

const activities = [
  { type: "commit", repo: "boutique-ecommerce", message: "Add product variant management system", time: "2 days ago", color: "text-laravel" },
  { type: "push", repo: "aura-collection", message: "Update admin dashboard with sales analytics", time: "5 days ago", color: "text-accent" },
  { type: "feature", repo: "visicore", message: "Implement GPS check-in validation logic", time: "1 week ago", color: "text-accent-secondary" },
  { type: "fix", repo: "meal-management", message: "Fix monthly report date range calculation", time: "1 week ago", color: "text-green-400" },
  { type: "release", repo: "aura-collection", message: "v1.5.0 — Wishlist and checkout improvements", time: "2 weeks ago", color: "text-purple-400" },
  { type: "commit", repo: "developer-portfolio", message: "Add GitHub contribution heatmap section", time: "2 weeks ago", color: "text-laravel" },
  { type: "push", repo: "visicore", message: "Add meeting notes attachment support", time: "2 weeks ago", color: "text-accent" },
  { type: "commit", repo: "boutique-ecommerce", message: "Implement shopping cart with session persistence", time: "3 weeks ago", color: "text-laravel" },
];

const typeIcons: Record<string, string> = {
  commit: "*",
  push: "*",
  feature: "*",
  fix: "*",
  release: "*",
};

export function RecentActivity() {
  return (
    <ScrollReveal>
      <div className="glass rounded-3xl p-6 md:p-8">
        <h3 className="text-xl font-semibold text-white/90 mb-6">Recent Activity</h3>
        <div className="space-y-0">
          {activities.map((act, i) => (
            <div
              key={`${act.repo}-${i}`}
              className="group flex gap-4 py-3 border-b border-white/[0.02] last:border-0 hover:bg-white/[0.02] -mx-6 px-6 transition-colors duration-200"
            >
              <div className="relative flex flex-col items-center">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${act.color}`} />
                {i < activities.length - 1 && (
                  <div className="w-px flex-1 bg-white/[0.04] mt-1" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={`text-xs font-mono font-medium ${act.color}`}>{act.repo}</span>
                    <p className="text-sm text-white/70 mt-0.5">{act.message}</p>
                  </div>
                  <span className="text-[10px] text-white/20 whitespace-nowrap shrink-0">{act.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
