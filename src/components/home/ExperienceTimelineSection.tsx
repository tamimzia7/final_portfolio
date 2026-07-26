import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";

gsap.registerPlugin(ScrollTrigger);

const journeyMilestones = [
  {
    year: "2021",
    title: "Started Programming",
    desc: "Began my journey with HTML, CSS, JavaScript, and PHP fundamentals.",
    icon: "01",
    gradient: "from-white/30 to-white/10",
    accent: "rgba(255,255,255,0.3)",
  },
  {
    year: "2022",
    title: "Learned PHP & MySQL",
    desc: "Deep-dived into server-side programming, database design, and SQL.",
    icon: "02",
    gradient: "from-[#3BC9FF] to-[#0EA5E9]",
    accent: "#3BC9FF",
  },
  {
    year: "2022",
    title: "Mastered Laravel",
    desc: "Discovered Laravel and fell in love with its elegant architecture and ecosystem.",
    icon: "03",
    gradient: "from-[#7C5CFF] to-[#3BC9FF]",
    accent: "#7C5CFF",
  },
  {
    year: "2023",
    title: "Built Business Applications",
    desc: "Developed production-ready Laravel applications — e-commerce, analytics, and admin systems.",
    icon: "04",
    gradient: "from-[#FF2D20] to-[#FF6B35]",
    accent: "#FF2D20",
  },
  {
    year: "2024",
    title: "Full Stack Development",
    desc: "Combined Laravel backends with React frontends for complete full-stack applications.",
    icon: "05",
    gradient: "from-[#FF2D20] to-[#FF8C42]",
    accent: "#FF2D20",
  },
  {
    year: "2025 — Present",
    title: "Advanced Laravel Architecture",
    desc: "Specializing in scalable Laravel architecture, performance optimization, and modern frontend integration.",
    icon: "06",
    gradient: "from-[#7C5CFF] to-[#3BC9FF]",
    accent: "#7C5CFF",
  },
];

export function ExperienceTimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the connecting line
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          scaleY: 0,
          transformOrigin: "top center",
          duration: 1.8,
          ease: "power3.inOut",
        });
      }

      // Animate milestone dots
      gsap.from(".journey-dot", {
        scrollTrigger: {
          trigger: ".journey-container",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        scale: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(2.5)",
      });

      // Animate milestone cards
      gsap.from(".journey-card", {
        scrollTrigger: {
          trigger: ".journey-container",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding border-t border-white/5 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none -z-10 opacity-20"
        style={{ background: "radial-gradient(circle, rgba(124,92,255,0.06), transparent 70%)" }}
      />

      <div className="max-width-container">
        <SectionHeading
          title="Experience"
          highlight="Timeline"
          subtitle="My journey from first line of code to full-stack Laravel developer — every milestone matters."
        />

        <div className="journey-container relative max-w-2xl mx-auto">
          {/* Connecting vertical line */}
          <div
            ref={lineRef}
            className="absolute left-[26px] top-0 bottom-0 w-[2px]"
            style={{
              background: "linear-gradient(to bottom, rgba(124,92,255,0.4), rgba(59,201,255,0.3), rgba(255,45,32,0.2), transparent)",
            }}
          />

          <div className="space-y-6 md:space-y-8">
            {journeyMilestones.map((m, i) => {
              const isLast = i === journeyMilestones.length - 1;
              return (
                <div key={m.title} className="relative pl-16 md:pl-20">
                  {/* Dot indicator */}
                  <div
                    className="journey-dot absolute left-[14px] top-2 w-[26px] h-[26px] rounded-full border-2 flex items-center justify-center z-10"
                    style={{
                      borderColor: m.accent,
                      background: `${m.accent}15`,
                      boxShadow: `0 0 16px ${m.accent}33`,
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: m.accent }}
                    />
                  </div>

                  {/* Content card */}
                  <div className="journey-card">
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div
                        className="relative overflow-hidden rounded-3xl p-5 md:p-6 border transition-all duration-500 group cursor-default"
                        style={{
                          borderColor: `${m.accent}22`,
                          background: `linear-gradient(135deg, ${m.accent}08, transparent 80%)`,
                        }}
                      >
                        {/* Accent line */}
                        <div
                          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-full transition-all duration-500"
                          style={{
                            background: `linear-gradient(to bottom, ${m.accent}, ${m.accent}44)`,
                            boxShadow: `0 0 8px ${m.accent}44`,
                          }}
                        />

                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="space-y-1">
                            <span
                              className="text-[10px] font-mono uppercase tracking-[0.15em] font-semibold"
                              style={{ color: m.accent }}
                            >
                              {m.year}
                            </span>
                            <h3 className="text-base md:text-lg font-semibold text-white/90">
                              {m.title}
                            </h3>
                          </div>
                          <span
                            className="text-[10px] font-bold rounded-full px-3 py-1"
                            style={{
                              background: `${m.accent}15`,
                              color: m.accent,
                            }}
                          >
                            {m.icon}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-white/40 leading-relaxed">
                          {m.desc}
                        </p>

                        {/* Hover bottom glow */}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${m.accent}, transparent)`,
                          }}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Connector line to next milestone */}
                  {!isLast && (
                    <div
                      className="absolute left-[25px]"
                      style={{
                        top: "28px",
                        bottom: "-28px",
                        width: "2px",
                        background: `linear-gradient(to bottom, ${m.accent}33, transparent)`,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.6}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 glass rounded-full px-2 py-2 pl-6">
              <span className="text-xs text-white/40">Want the full story?</span>
              <Link to="/experience">
                <Button variant="secondary">Read Full Journey &rarr;</Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
