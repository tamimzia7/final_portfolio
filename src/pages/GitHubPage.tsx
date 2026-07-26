import React, { useEffect, useRef, Suspense } from "react";
import gsap from "gsap";
import { PageTransition } from "@/components/animations/PageTransition";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";

const GitHubScene = React.lazy(() => import("@/components/three/GitHubScene").then(m => ({ default: m.GitHubScene })));
import { GitHubStats } from "@/components/github/GitHubStats";
import { ContributionGraph } from "@/components/github/ContributionGraph";
import { LaravelExpertiseGrid } from "@/components/github/LaravelExpertiseGrid";
import { PinnedRepos } from "@/components/github/PinnedRepos";
import { TopLanguages } from "@/components/github/TopLanguages";
import { RecentActivity } from "@/components/github/RecentActivity";
import { OpenSourceJourney } from "@/components/github/OpenSourceJourney";
import { FeaturedLaravelProjects } from "@/components/github/FeaturedLaravelProjects";

export default function GitHubPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-badge", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" });
      gsap.from(".hero-title", { opacity: 0, y: 60, duration: 1, delay: 0.2, ease: "power3.out" });
      gsap.from(".hero-subtitle", { opacity: 0, y: 40, duration: 0.8, delay: 0.4, ease: "power3.out" });
      gsap.from(".hero-desc", { opacity: 0, y: 30, duration: 0.8, delay: 0.6, ease: "power3.out" });
      gsap.from(".hero-buttons > *", { opacity: 0, y: 30, duration: 0.6, delay: 0.8, stagger: 0.15, ease: "power3.out" });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition direction="up">
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-[#050505]" />}><GitHubScene /></Suspense>
        <div className="max-width-container w-full pt-36 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="hero-badge"><Badge>Developer Dashboard</Badge></div>
              <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight">
                <span className="text-white/50 text-xl md:text-2xl lg:text-3xl font-normal block mb-2">Tamim Zia</span>
                Git<br /><span className="text-gradient">Hub</span>
              </h1>
              <p className="hero-subtitle text-xl md:text-2xl text-white/70 font-light leading-relaxed">
                Code.<br />Commit.<br />Contribute.
              </p>
              <p className="hero-desc text-sm md:text-base text-white/40 leading-relaxed max-w-lg">
                As a Full Stack Developer, I use GitHub to build, manage and continuously improve Laravel-based applications, REST APIs and modern frontend projects.
              </p>
              <div className="hero-buttons flex flex-wrap gap-3 md:gap-4 pt-2">
                <Button as="a" href="https://github.com/tamimzia7">View GitHub</Button>
                <Button variant="secondary" as="a" href="/projects">Explore Projects</Button>
                <Button variant="ghost" as="a" href="./resume.pdf">Download Resume</Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-[480px] aspect-square">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/10 via-accent-secondary/5 to-laravel/10 animate-pulse" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-accent/5 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl font-bold text-gradient mb-2">&lt;/&gt;</div>
                    <div className="text-sm font-mono text-white/20 tracking-widest">OPEN SOURCE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-white/5">
        <div className="max-width-container space-y-16">
          <div>
            <SectionHeading
              title="GitHub"
              highlight="Statistics"
              subtitle="Active development metrics and open source contributions."
            />
            <GitHubStats />
          </div>

          <ContributionGraph />

          <div>
            <SectionHeading
              title="Laravel"
              highlight="Expertise"
              subtitle="My primary technology — Laravel applications, APIs, and backend architecture."
            />
            <LaravelExpertiseGrid />
          </div>

          <div>
            <SectionHeading
              title="Featured Laravel"
              highlight="Projects"
              subtitle="Premium Laravel applications built from the ground up."
            />
            <FeaturedLaravelProjects />
          </div>

          <div>
            <SectionHeading
              title="Pinned"
              highlight="Repositories"
              subtitle="My most notable open-source projects and active development work."
            />
            <PinnedRepos />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            <div>
              <SectionHeading
                title="Top"
                highlight="Languages"
                subtitle="Primary languages used across all repositories."
              />
              <TopLanguages />
            </div>
            <div>
              <SectionHeading
                title="Recent"
                highlight="Activity"
                subtitle="Latest commits, pushes, and repository updates."
              />
              <RecentActivity />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            <div>
              <SectionHeading
                title="Open Source"
                highlight="Journey"
                subtitle="My evolution as an open-source contributor and Laravel developer."
              />
              <OpenSourceJourney />
            </div>
            <div className="flex flex-col justify-end">
              <ScrollReveal>
                <div className="glass rounded-3xl p-6 md:p-8 h-full flex flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-4 opacity-20 font-bold">{">_"}</div>
                  <h3 className="text-xl font-semibold text-white/90 mb-3">Let's Build Together</h3>
                  <p className="text-sm text-white/40 max-w-md mb-6">
                    I'm actively growing my open-source presence. Follow my journey, star my repositories, and let's collaborate on Laravel projects.
                  </p>
                  <Button as="a" href="https://github.com/tamimzia7">
                    Follow on GitHub &rarr;
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
