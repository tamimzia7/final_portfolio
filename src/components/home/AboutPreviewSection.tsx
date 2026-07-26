import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";
import { GlassCard } from "@/components/shared/GlassCard";
import { HeroPortrait } from "@/components/shared/HeroPortrait";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: "2021", title: "First Line of Code", desc: "HTML, CSS & PHP", color: "rgba(255,255,255,0.2)" },
  { year: "2022", title: "Discovered Laravel", desc: "Fell in love with backend", color: "#3BC9FF" },
  { year: "2023", title: "Production Apps", desc: "Built for real businesses", color: "#7C5CFF" },
  { year: "2024", title: "Full Stack Mastery", desc: "Laravel + React expert", color: "#FF2D20" },
  { year: "2025", title: "Advanced Architecture", desc: "Scalable systems design", color: "#FF2D20" },
];

const stats = [
  { value: 15, suffix: "+", label: "Production Projects", color: "from-[#FF2D20] to-[#FF6B35]" },
  { value: 12, suffix: "+", label: "Technologies", color: "from-[#7C5CFF] to-[#3BC9FF]" },
  { value: 4, suffix: "+", label: "Years Building", color: "from-[#3BC9FF] to-[#0EA5E9]" },
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.ceil(value / 50);
          const interval = setInterval(() => {
            start += step;
            if (start >= value) {
              setCount(value);
              clearInterval(interval);
            } else {
              setCount(start);
            }
          }, 30);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const developerStatements = [
  "I don't just write code — I architect solutions that scale.",
  "Laravel is my hammer. Every problem looks like a beautifully structured Eloquent relationship.",
  "Database first. UI second. Great products are built on solid foundations.",
];

export function AboutPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.from(".about-timeline-line", {
        scrollTrigger: { trigger: ".about-timeline", start: "top 75%", toggleActions: "play none none reverse" },
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.5,
        ease: "power3.inOut",
      });

      // Animate each milestone dot
      gsap.from(".about-milestone-dot", {
        scrollTrigger: { trigger: ".about-timeline", start: "top 75%", toggleActions: "play none none reverse" },
        scale: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(2)",
      });

      // Animate milestone content
      gsap.from(".about-milestone-content", {
        scrollTrigger: { trigger: ".about-timeline", start: "top 75%", toggleActions: "play none none reverse" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding border-t border-white/5 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none -z-10 opacity-30"
        style={{ background: "radial-gradient(circle, rgba(124,92,255,0.08), transparent 70%)" }}
      />

      <div className="max-width-container">
        <SectionHeading
          title="About"
          highlight="Me"
          subtitle="From first PHP script to full-stack Laravel architect — my journey in code."
        />

        {/* Developer statements + Portrait — side by side */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
            {developerStatements.slice(0, 2).map((stmt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] }}
                className="relative"
              >
                <GlassCard className="!p-6 h-full !border-accent/10" hover>
                  <span className="text-3xl font-bold text-gradient opacity-20 absolute top-3 right-4 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative z-10">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                      </svg>
                    </div>
                    <p className="text-sm md:text-base text-white/60 leading-relaxed italic">
                      &ldquo;{stmt}&rdquo;
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <GlassCard className="!p-6 h-full !border-accent/10" hover>
                  <span className="text-3xl font-bold text-gradient opacity-20 absolute top-3 right-4 select-none">03</span>
                  <div className="relative z-10">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                      </svg>
                    </div>
                    <p className="text-sm md:text-base text-white/60 leading-relaxed italic">
                      &ldquo;{developerStatements[2]}&rdquo;
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
          <div className="flex items-center justify-center max-sm:mt-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <HeroPortrait variant="about" />
            </motion.div>
          </div>
        </div>

        {/* Stats row with animated counters */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="glass rounded-3xl p-6 md:p-8 h-full flex flex-col items-center justify-center">
                <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs md:text-sm font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Journey Timeline */}
        <div className="about-timeline relative max-w-3xl mx-auto mb-16">
          {/* Vertical line */}
          <div className="about-timeline-line absolute left-6 top-0 bottom-0 w-[2px]"
            style={{ background: "linear-gradient(to bottom, rgba(124,92,255,0.5), rgba(59,201,255,0.3), transparent)" }}
          />

          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={m.year} className="relative pl-16">
                {/* Dot */}
                <div className="about-milestone-dot absolute left-[18px] top-2 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: m.color,
                    background: `${m.color}22`,
                    boxShadow: `0 0 12px ${m.color}44`,
                  }}
                >
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: m.color }} />
                </div>

                {/* Content */}
                <div className="about-milestone-content">
                  <GlassCard className="!p-5" hover>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest"
                        style={{ color: m.color }}
                      >
                        {m.year}
                      </span>
                      <h3 className="text-sm font-semibold text-white/90">{m.title}</h3>
                    </div>
                    <p className="text-xs text-white/40">{m.desc}</p>
                  </GlassCard>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 glass rounded-full px-2 py-2 pl-6">
              <span className="text-xs text-white/40">Want to know more?</span>
              <Link to="/about">
                <Button variant="secondary">Read Full Story &rarr;</Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
