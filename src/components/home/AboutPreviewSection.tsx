import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";
import { HeroPortrait } from "@/components/shared/HeroPortrait";

const stats = [
  { value: "15+", label: "Projects" },
  { value: "12+", label: "Technologies" },
  { value: "3+", label: "Years Experience" },
];

export function AboutPreviewSection() {
  return (
    <section className="section-padding border-t border-white/5">
      <div className="max-width-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <SectionHeading
              title="About"
              highlight="Me"
              subtitle="Full Stack Developer with Laravel at the core."
            />
            <ScrollReveal>
              <p className="text-base md:text-lg text-white/50 leading-relaxed">
                I build complete web applications from database design to frontend experiences. My strongest expertise is Laravel — I architect backends, design databases, build REST APIs, and create admin panels that power business operations.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-sm md:text-base text-white/30 leading-relaxed">
                My passion is turning complex requirements into clean, maintainable code. Every project starts with a solid Laravel foundation — database schema, API architecture, authentication, and business logic — before a single frontend component is built.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex gap-8 md:gap-12">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl md:text-3xl font-bold text-gradient">{s.value}</div>
                    <div className="text-xs md:text-sm text-white/40 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div>
                <Link to="/about"><Button variant="secondary">Read More &rarr;</Button></Link>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2} direction="right">
            <div className="flex justify-center">
              <HeroPortrait variant="about" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
