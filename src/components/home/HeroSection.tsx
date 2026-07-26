import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { HeroPortrait } from "@/components/shared/HeroPortrait";
import { HomeScene } from "@/components/three/HomeScene";

const techTags = ["Laravel", "PHP", "React", "TypeScript"];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-badge", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" });
      gsap.from(".hero-title", { opacity: 0, y: 60, duration: 1, delay: 0.2, ease: "power3.out" });
      gsap.from(".hero-tags > *", { opacity: 0, y: 20, duration: 0.5, delay: 0.5, stagger: 0.1, ease: "power3.out" });
      gsap.from(".hero-subtitle", { opacity: 0, y: 40, duration: 0.8, delay: 0.6, ease: "power3.out" });
      gsap.from(".hero-desc", { opacity: 0, y: 30, duration: 0.8, delay: 0.8, ease: "power3.out" });
      gsap.from(".hero-buttons > *", { opacity: 0, y: 30, duration: 0.6, delay: 1, stagger: 0.15, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <HomeScene />
      <div className="max-width-container w-full pt-36 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="hero-badge"><Badge>Available for Opportunities</Badge></div>
            <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight">
              <span className="text-white/50 text-xl md:text-2xl lg:text-3xl font-normal block mb-2">Tamim Zia</span>
              Full Stack<br /><span className="text-gradient">Developer</span>
            </h1>
            <div className="hero-tags flex flex-wrap gap-2">
              {techTags.map((t) => (
                <span
                  key={t}
                  className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium ${
                    t === "Laravel"
                      ? "bg-laravel/10 text-laravel border border-laravel/20"
                      : "bg-white/5 text-white/50 border border-white/10"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-white/70 font-light leading-relaxed max-w-xl">
              Building secure Laravel backends,
              <br />modern frontend experiences,
              <br />and scalable digital products.
            </p>
            <p className="hero-desc text-sm md:text-base text-white/40 leading-relaxed max-w-lg">
              I specialize in building complete web applications using Laravel, PHP, MySQL, React and TypeScript while focusing on clean architecture, performance and user experience.
            </p>
            <div className="hero-buttons flex flex-wrap gap-3 md:gap-4 pt-2">
              <Link to="/projects"><Button>View Projects</Button></Link>
              <Button variant="secondary" as="a" href="./resume.pdf">Download Resume</Button>
              <Link to="/contact"><Button variant="ghost">Contact Me</Button></Link>
            </div>
          </div>
          <div className="hero-portrait flex md:hidden justify-center items-center mt-8 max-w-[280px] mx-auto">
            <HeroPortrait variant="hero" />
          </div>
          <div className="hero-portrait hidden md:flex lg:hidden justify-center items-center max-w-[320px] mx-auto">
            <HeroPortrait variant="hero" />
          </div>
          <div className="hero-portrait hidden lg:flex justify-center items-center">
            <HeroPortrait variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
