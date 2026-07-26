import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Button } from "@/components/shared/Button";

gsap.registerPlugin(ScrollTrigger);

export function ContactCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle ambient glow pulse
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.1,
          opacity: 0.6,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Scroll-triggered content reveal
      gsap.from(".cta-content > *", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        y: 60,
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
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(124,92,255,0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 50%, rgba(255,45,32,0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 0%, rgba(59,201,255,0.04) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Pulsing glow orb */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, rgba(124,92,255,0.06), transparent 70%)",
        }}
      />

      <div className="max-width-container">
        <div className="cta-content relative">
          {/* Main CTA Card */}
          <div
            className="relative overflow-hidden rounded-3xl md:rounded-4xl border"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            {/* Gradient border-like effect */}
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: "linear-gradient(135deg, rgba(124,92,255,0.06), rgba(255,45,32,0.03), rgba(59,201,255,0.04))",
              }}
            />

            <div className="p-10 md:p-16 lg:p-20 text-center space-y-8 relative">
              {/* Decorative corner accents */}
              <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none opacity-30"
                style={{ background: "radial-gradient(circle at 100% 0%, rgba(124,92,255,0.2), transparent 70%)" }}
              />
              <div className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none opacity-20"
                style={{ background: "radial-gradient(circle at 0% 100%, rgba(255,45,32,0.15), transparent 70%)" }}
              />

              {/* Eyebrow text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full border"
                  style={{
                    background: "rgba(124,92,255,0.08)",
                    borderColor: "rgba(124,92,255,0.2)",
                    color: "#7C5CFF",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFF] animate-pulse" />
                  Available for Opportunities
                </span>
              </motion.div>

              {/* Main headline */}
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight"
              >
                <span className="text-white">Let's Build</span>
                <br />
                <span className="text-gradient">Something Great</span>
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="text-lg md:text-xl text-white/40 max-w-lg mx-auto font-light"
              >
                Every great product starts with a conversation. Tell me about your idea — I'll help you bring it to life with clean architecture and modern technology.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-wrap justify-center gap-3 md:gap-4 pt-4"
              >
                <Link to="/contact">
                  <Button className="text-base px-10 py-3.5">
                    <span className="flex items-center gap-2">
                      Start a Project
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </Button>
                </Link>
                <Button variant="secondary" as="a" href="./resume.pdf" className="text-base px-8 py-3.5">
                  Download Resume
                </Button>
                <Link to="/contact">
                  <Button variant="ghost" className="text-base px-8 py-3.5">
                    Contact Me
                  </Button>
                </Link>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pt-6"
              >
                <div className="flex items-center justify-center gap-8 text-[11px] tracking-wider uppercase"
                  style={{ color: "rgba(255,255,255,0.15)" }}
                >
                  <span>Laravel</span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span>React</span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span>TypeScript</span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span>MySQL</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
