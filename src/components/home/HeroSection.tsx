import React, { useRef, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { Button } from "@/components/shared/Button";
import { HeroPortrait } from "@/components/shared/HeroPortrait";

const HomeScene = React.lazy(() => import("@/components/three/HomeScene").then(m => ({ default: m.HomeScene })));

const techStack = [
  { label: "Laravel", color: "text-laravel", border: "border-laravel/20", bg: "bg-laravel/10" },
  { label: "PHP", color: "text-[#777BB4]", border: "border-[#777BB4]/20", bg: "bg-[#777BB4]/10" },
  { label: "React", color: "text-[#61DAFB]", border: "border-[#61DAFB]/20", bg: "bg-[#61DAFB]/10" },
  { label: "TypeScript", color: "text-[#3178C6]", border: "border-[#3178C6]/20", bg: "bg-[#3178C6]/10" },
  { label: "MySQL", color: "text-[#4479A1]", border: "border-[#4479A1]/20", bg: "bg-[#4479A1]/10" },
  { label: "Three.js", color: "text-white/60", border: "border-white/20", bg: "bg-white/10" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 60, rotateX: -15 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
};

const wordReveal = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.6 + i * 0.12 },
  }),
};

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const badges = badgeRef.current?.querySelectorAll(".tech-badge");
      if (badges) {
        badges.forEach((badge, i) => {
          gsap.to(badge, {
            y: -15 + Math.random() * 30,
            x: -10 + Math.random() * 20,
            rotation: -3 + Math.random() * 6,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2,
          });
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <Suspense fallback={<div className="absolute inset-0 bg-[#050505]" />}><HomeScene /></Suspense>

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,92,255,0.3), transparent 70%)" }}
      />
      <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,45,32,0.2), transparent 70%)" }}
      />

      <div className="max-width-container w-full pt-36 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Hero Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* Floating tech badges */}
            <motion.div ref={badgeRef} variants={item} className="flex flex-wrap gap-2.5">
              {techStack.map((tech) => (
                <span
                  key={tech.label}
                  className={`tech-badge inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-semibold rounded-full border ${tech.bg} ${tech.border} ${tech.color} backdrop-blur-sm`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                  {tech.label}
                </span>
              ))}
            </motion.div>

            {/* Name */}
            <div className="space-y-2">
              <motion.span
                variants={item}
                className="text-sm md:text-base font-medium tracking-[0.3em] uppercase"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Tamim Zia
              </motion.span>

              {/* Cinematic role headline — fixed overflow with clamp() */}
              <motion.div variants={item}>
                <h1
                  className="font-black leading-[1.05] tracking-tight"
                  style={{
                    fontSize: "clamp(2.5rem, 10vw, 8rem)",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  <span className="block text-white">FULL</span>
                  <span className="block text-gradient">STACK</span>
                  <span className="block text-white/90 break-words">DEVELOPER</span>
                </h1>
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.div variants={item}>
              <p className="text-lg md:text-xl lg:text-2xl font-light tracking-wide"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {"I BUILD DIGITAL EXPERIENCES".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={wordReveal}
                    initial="hidden"
                    animate="show"
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </motion.div>

            {/* Technology divider */}
            <motion.div variants={item} className="flex items-center gap-4 py-2">
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(124,92,255,0.3), transparent)" }} />
              <span className="text-xs font-mono tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
                Laravel • React • AI • 3D
              </span>
              <div className="h-px flex-1" style={{ background: "linear-gradient(270deg, rgba(59,201,255,0.3), transparent)" }} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-3 md:gap-4 pt-2">
              <Link to="/projects">
                <Button>
                  <span className="flex items-center gap-2">
                    View Projects
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </Button>
              </Link>
              <Button variant="secondary" as="a" href="./resume.pdf">Download Resume</Button>
              <Link to="/contact"><Button variant="ghost">Contact Me</Button></Link>
            </motion.div>
          </motion.div>

          {/* Right: Profile Image with 3D glow and floating animation */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex justify-center items-center relative max-sm:mt-8 sm:mt-0"
          >
            {/* Outer glow ring — smaller on mobile */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[280px] sm:w-[360px] lg:w-[460px] h-[280px] sm:h-[360px] lg:h-[460px] rounded-full opacity-30 blur-3xl"
                style={{
                  background: "radial-gradient(circle, rgba(124,92,255,0.2), rgba(59,201,255,0.1), transparent 70%)",
                }}
              />
            </div>

            {/* Inner accent ring — smaller on mobile */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[250px] sm:w-[330px] lg:w-[420px] h-[250px] sm:h-[330px] lg:h-[420px] rounded-full opacity-20 blur-2xl"
                style={{
                  background: "conic-gradient(from 0deg, rgba(124,92,255,0.15), rgba(59,201,255,0.1), rgba(124,92,255,0.05), rgba(59,201,255,0.1), rgba(124,92,255,0.15))",
                  animation: "spin 8s linear infinite",
                }}
              />
            </div>

            {/* Portrait — responsive sizing */}
            <div className="relative z-10 max-w-[250px] sm:max-w-[340px] lg:max-w-[420px]">
              <HeroPortrait variant="hero" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
