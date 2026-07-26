import { ScrollReveal } from "@/components/animations/ScrollReveal";

const expertise = [
  { title: "Laravel Applications", desc: "Full-stack Laravel applications with clean architecture, service-repository pattern, and SOLID principles.", icon: "L" },
  { title: "REST API Development", desc: "Secure, versioned REST APIs with Sanctum authentication, rate limiting, resource controllers, and API resources.", icon: "R" },
  { title: "Authentication Systems", desc: "Multi-guard authentication, OAuth2 integration, email verification, password reset, and role-based access control.", icon: "A" },
  { title: "Admin Dashboards", desc: "Comprehensive admin panels with CRUD management, analytics, reporting, and role-based dashboards.", icon: "D" },
  { title: "Business Applications", desc: "Scalable business systems — e-commerce, analytics, event management, and content platforms.", icon: "B" },
  { title: "Database Design", desc: "Normalized MySQL schemas, migrations, seeders, Eloquent relationships, and query optimization.", icon: "DB" },
  { title: "Performance Optimization", desc: "Redis caching, eager loading, query optimization, queue workers, and Laravel's performance toolkit.", icon: "P" },
  { title: "Security", desc: "CSRF protection, XSS prevention, SQL injection prevention, encryption, and Laravel's built-in security features.", icon: "S" },
];

export function LaravelExpertiseGrid() {
  return (
    <ScrollReveal>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {expertise.map((item, i) => (
          <ScrollReveal key={item.title} delay={0.03 * i}>
            <div className="glass-laravel rounded-3xl p-5 md:p-6 h-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,45,32,0.12)] group cursor-default">
              <div className="w-10 h-10 rounded-xl bg-laravel/20 flex items-center justify-center mb-4 group-hover:bg-laravel/30 transition-colors duration-300">
                <span className="text-laravel text-sm font-bold">{item.icon}</span>
              </div>
              <h3 className="text-sm md:text-base font-semibold text-white/90 mb-2">{item.title}</h3>
              <p className="text-xs md:text-sm text-white/40 leading-relaxed">{item.desc}</p>
              <div className="mt-4 h-px w-0 group-hover:w-full bg-gradient-to-r from-laravel/40 to-transparent transition-all duration-500" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </ScrollReveal>
  );
}
