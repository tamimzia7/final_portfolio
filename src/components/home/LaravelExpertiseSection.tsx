import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";

const expertise = [
  { title: "Laravel Architecture", desc: "Service-repository pattern, SOLID principles, clean separation of concerns, and maintainable Laravel codebases.", icon: "L" },
  { title: "REST API Development", desc: "Secure, versioned REST APIs with Sanctum authentication, rate limiting, resource controllers, and Swagger documentation.", icon: "R" },
  { title: "Authentication & Authorization", desc: "Multi-guard authentication, OAuth2, role-based access control, email verification, and password reset flows.", icon: "A" },
  { title: "Admin Dashboard Systems", desc: "Comprehensive admin panels with CRUD management, analytics dashboards, reporting, and user management.", icon: "D" },
  { title: "Database Design", desc: "Normalized MySQL schemas, migrations, seeders, complex Eloquent relationships, and query optimization.", icon: "DB" },
  { title: "Eloquent ORM", desc: "Advanced Eloquent patterns — relationships, accessors, mutators, scopes, eager loading, and performance tuning.", icon: "E" },
  { title: "Performance Optimization", desc: "Redis caching, query optimization, eager loading, queue workers, Horizon, and Laravel's performance toolkit.", icon: "P" },
  { title: "Secure Web Applications", desc: "CSRF protection, XSS prevention, SQL injection prevention, encryption, and Laravel's built-in security features.", icon: "S" },
];

export function LaravelExpertiseSection() {
  return (
    <section className="section-padding border-t border-white/5">
      <div className="max-width-container">
        <SectionHeading
          title="Laravel"
          highlight="Expertise"
          subtitle="My primary technology — I build robust, secure, and scalable backend systems with Laravel."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {expertise.map((item, i) => (
            <ScrollReveal key={item.title} delay={0.04 * i}>
              <div className="glass-laravel rounded-3xl p-5 md:p-6 h-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,45,32,0.12)] group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-laravel/20 flex items-center justify-center mb-4 group-hover:bg-laravel/30 group-hover:scale-110 transition-all duration-300">
                  <span className="text-laravel text-sm font-bold">{item.icon}</span>
                </div>
                <h3 className="text-sm md:text-base font-semibold text-white/90 mb-2">{item.title}</h3>
                <p className="text-xs md:text-sm text-white/40 leading-relaxed">{item.desc}</p>
                <div className="mt-4 h-px w-0 group-hover:w-full bg-gradient-to-r from-laravel/40 to-transparent transition-all duration-500" />
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.4}>
          <div className="mt-10">
            <Link to="/projects">
              <Button variant="secondary">Explore Laravel Projects &rarr;</Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
