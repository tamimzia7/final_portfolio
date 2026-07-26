import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const featured = [
  { name: "Boutique E-commerce Platform", tag: "E-Commerce", slug: "boutique-ecommerce", desc: "Complete Laravel fashion e-commerce with authentication, cart, wishlist, orders, reviews, and admin dashboard.", highlight: true },
  { name: "AURA Collection", tag: "Luxury E-Commerce", slug: "aura-collection", desc: "Luxury saree e-commerce platform with premium UI, wishlist, secure checkout, and advanced admin management.", highlight: true },
  { name: "VisiCore", tag: "Field Management", slug: "visicore", desc: "Smart Field Visit & Employee Management System with GPS tracking, attendance, evidence, and reporting.", highlight: true },
  { name: "Meal Management System", tag: "Corporate Platform", slug: "meal-management", desc: "Company meal management platform with role-based auth, meal tracking, monthly reports, and cost analysis.", highlight: true },
];

export function FeaturedLaravelProjects() {
  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-5">
      {featured.map((proj, i) => (
        <ScrollReveal key={proj.name} delay={0.08 * i}>
          <Link to={`/projects/${proj.slug}`} className="block h-full">
            <div className="relative group rounded-3xl overflow-hidden h-full bg-gradient-to-br from-laravel/[0.06] via-laravel/[0.02] to-transparent border border-laravel/15 transition-all duration-500 hover:border-laravel/30 hover:shadow-[0_0_50px_rgba(255,45,32,0.08)]">
              <div className="p-6 md:p-7 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-laravel/20 flex items-center justify-center text-laravel text-sm font-bold shrink-0">
                    {proj.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-white/90 group-hover:text-laravel transition-colors duration-300">
                      {proj.name}
                    </h3>
                    <span className="text-[10px] font-mono text-laravel/60">{proj.tag}</span>
                  </div>
                </div>
                <p className="text-sm text-white/40 leading-relaxed flex-1">{proj.desc}</p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex -space-x-1">
                    {["Laravel", "PHP", "MySQL"].map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] rounded-full bg-laravel/10 text-laravel border border-laravel/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-white/20 ml-auto group-hover:text-laravel/40 transition-colors duration-300">
                    View Project &rarr;
                  </span>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-laravel/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  );
}
