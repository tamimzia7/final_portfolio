import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";

interface FeaturedProject {
  title: string;
  desc: string;
  tags: string[];
  slug: string;
  featured?: boolean;
}

const projects: FeaturedProject[] = [
  {
    title: "Boutique E-commerce Platform",
    desc: "A complete Laravel-based fashion e-commerce platform featuring authentication, product management, shopping cart, wishlist, order processing, reviews, and a powerful admin dashboard.",
    tags: ["Laravel", "PHP", "MySQL", "Blade", "JavaScript"],
    slug: "boutique-ecommerce",
    featured: true,
  },
  {
    title: "AURA Collection",
    desc: "Luxury saree e-commerce platform with premium UI, modern shopping experience, wishlist, secure checkout, and advanced admin management.",
    tags: ["Laravel", "PHP", "MySQL", "TailwindCSS"],
    slug: "aura-collection",
    featured: true,
  },
  {
    title: "VisiCore",
    desc: "Smart Field Visit & Employee Management System with GPS tracking, attendance, visit evidence, meeting notes, and reporting dashboard.",
    tags: ["Laravel", "PHP", "MySQL"],
    slug: "visicore",
  },
  {
    title: "Meal Management System",
    desc: "Company meal management platform with role-based authentication, meal tracking, monthly reports, and cost analysis dashboard.",
    tags: ["Laravel", "PHP", "MySQL"],
    slug: "meal-management",
  },
];

function getInitials(title: string) {
  return title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

export function FeaturedProjectsSection() {
  return (
    <section className="section-padding border-t border-white/5">
      <div className="max-width-container">
        <SectionHeading
          title="Featured"
          highlight="Projects"
          subtitle="Laravel-powered applications I've designed and built from the ground up."
        />
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((p, i) => (
            <ScrollReveal key={p.slug} delay={0.1 * i}>
              <Link to={`/projects/${p.slug}`} className="block h-full group">
                <div
                  className={`relative rounded-3xl overflow-hidden h-full transition-all duration-500 bg-gradient-to-br border ${
                    p.featured
                      ? "from-laravel/20 via-accent/5 to-transparent border-laravel/20 group-hover:border-laravel/40"
                      : "from-accent/10 via-accent-secondary/5 to-transparent border-white/10 group-hover:border-accent/30"
                  } group-hover:shadow-[0_0_50px_rgba(255,45,32,0.06)]`}
                >
                  <div className="p-6 md:p-7 lg:p-8 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-laravel/10 flex items-center justify-center text-lg font-bold text-laravel">
                        {getInitials(p.title)}
                      </div>
                      <div className="flex gap-1">
                        {p.featured && (
                          <span className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-laravel/15 text-laravel border border-laravel/20">
                            &#9733; Featured
                          </span>
                        )}
                        <span className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-laravel/10 text-laravel border border-laravel/20">
                          Laravel
                        </span>
                        {p.tags.length > 2 && (
                          <span className="px-2.5 py-1 text-[10px] rounded-full bg-white/5 text-white/30 border border-white/10">
                            +{p.tags.length - 1}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-3 group-hover:text-laravel transition-colors duration-300">
                      {p.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/40 leading-relaxed flex-1 mb-5">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs rounded-full bg-laravel/10 text-laravel border border-laravel/20">
                        Live Demo
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/40 border border-white/10">
                        GitHub
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/40 border border-white/10 ml-auto group-hover:text-accent transition-colors duration-300">
                        Details &rarr;
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-laravel/5 to-transparent rounded-bl-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.4}>
          <div className="mt-10">
            <Link to="/projects">
              <Button variant="secondary">View All Projects &rarr;</Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
