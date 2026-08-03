import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";
import { ProjectCard } from "@/components/home/ProjectCard";
import bp1 from "@/assets/images/projects/bp1.png";
import bp2 from "@/assets/images/projects/bp2.png";
import bp3 from "@/assets/images/projects/bp3.png";
import ap1 from "@/assets/images/projects/ap1.png";
import ap2 from "@/assets/images/projects/ap2.png";
import ap3 from "@/assets/images/projects/ap3.png";
import mp1 from "@/assets/images/projects/mp1.png";
import mp2 from "@/assets/images/projects/mp2.png";
import mp3 from "@/assets/images/projects/mp3.png";
import visicore from "@/assets/images/projects/visicore.svg";
import astha from "@/assets/images/projects/astha.svg";
import as1 from "@/assets/images/projects/as-1.png";
import as2 from "@/assets/images/projects/as-2.png";
import as3 from "@/assets/images/projects/as-3.png";

gsap.registerPlugin(ScrollTrigger);

const featuredProjects = [
  {
    title: "ASTHA (আস্থা)",
    description:
      "A modern service marketplace platform that connects customers with verified professionals across Bangladesh through a secure, scalable, and user-friendly digital experience.",
    tags: ["Laravel 12", "PHP 8.3", "MySQL", "REST API", "Tailwind CSS", "JavaScript"],
    slug: "astha",
    featured: true,
    premium: true,
    subtitle: "Trusted Home & Business Service Marketplace",
    status: "Active Development",
    role: "Full Stack Developer",
    badgeLabel: "Flagship Project",
    image: astha,
    screenshots: [as1, as2, as3],
    carousel: true,
    caseStudyPath: "/projects/astha",
    liveUrl: "#",
    githubUrl: "https://github.com/tamimzia7",
  },
  {
    title: "Naw Boutique",
    description:
      "A complete Laravel-based fashion e-commerce platform featuring authentication, product management, shopping cart, wishlist, order processing, reviews, and a powerful admin dashboard.",
    tags: ["Laravel", "PHP", "MySQL", "Blade", "JavaScript"],
    slug: "boutique-ecommerce",
    featured: true,
    image: bp1,
    screenshots: [bp1, bp2, bp3],
    caseStudyPath: "/projects/naw-boutique",
    liveUrl: "#",
    githubUrl: "https://github.com/tamimzia7/boutique-ecommerce",
  },
  {
    title: "AURA",
    description:
      "Luxury saree e-commerce platform with premium UI, modern shopping experience, wishlist, secure checkout, and advanced admin management.",
    tags: ["Laravel", "PHP", "MySQL", "TailwindCSS"],
    slug: "aura-collection",
    featured: true,
    image: ap2,
    screenshots: [ap2, ap1, ap3],
    caseStudyPath: "/projects/aura",
    liveUrl: "#",
    githubUrl: "https://github.com/tamimzia7/aura-collection",
  },
  {
    // @todo Replace with vp1, vp2, vp3 screenshots when provided
    title: "VisiCore",
    description:
      "Smart Field Visit & Employee Management System with GPS tracking, attendance, visit evidence, meeting notes, and reporting dashboard.",
    tags: ["Laravel", "PHP", "MySQL"],
    slug: "visicore",
    image: visicore,
  },
  {
    title: "Meal Management System",
    description:
      "Company meal management platform with role-based authentication, meal tracking, monthly reports, and cost analysis dashboard.",
    tags: ["Laravel", "PHP", "MySQL"],
    slug: "meal-management",
    image: mp1,
    screenshots: [mp1, mp2, mp3],
  },
];

export function FeaturedProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate grid items on scroll with stagger
      const cards = gridRef.current?.querySelectorAll(".project-card-wrapper");
      if (cards?.length) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding border-t border-white/5 relative overflow-hidden">
      {/* Background ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(124,92,255,0.06) 0%, rgba(59,201,255,0.03) 30%, transparent 70%)",
        }}
      />

      <div className="max-width-container relative">
        {/* Section Header */}
        <div>
          <SectionHeading
            title="Featured"
            highlight="Projects"
            subtitle="Explore a selection of my best Full Stack applications built with Laravel, PHP, MySQL and modern frontend technologies."
          />
        </div>

        {/* 2x2 Editorial Grid — Desktop */}
        {/* Each card has varied heights: first card is extra tall, others balanced */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {/* First row: two projects with editorial height variation */}
          {/* Editorial Layout: first card is extra tall, others staggered for visual rhythm */}
          <div className="project-card-wrapper">
            <ProjectCard
              title={featuredProjects[0].title}
              description={featuredProjects[0].description}
              tags={featuredProjects[0].tags}
              slug={featuredProjects[0].slug}
              featured={featuredProjects[0].featured}
              premium={featuredProjects[0].premium}
              subtitle={featuredProjects[0].subtitle}
              status={featuredProjects[0].status}
              role={featuredProjects[0].role}
              badgeLabel={featuredProjects[0].badgeLabel}
              imageSrc={featuredProjects[0].image}
              screenshots={featuredProjects[0].screenshots}
              carousel={featuredProjects[0].carousel}
              caseStudyPath={featuredProjects[0].caseStudyPath}
              liveUrl={featuredProjects[0].liveUrl}
              githubUrl={featuredProjects[0].githubUrl}
              imageAspectRatio="4/3"
            />
          </div>
          <div className="project-card-wrapper md:mt-12">
            <ProjectCard
              title={featuredProjects[1].title}
              description={featuredProjects[1].description}
              tags={featuredProjects[1].tags}
              slug={featuredProjects[1].slug}
              featured={featuredProjects[1].featured}
              imageSrc={featuredProjects[1].image}
              screenshots={featuredProjects[1].screenshots}
              caseStudyPath={featuredProjects[1].caseStudyPath}
              liveUrl={featuredProjects[1].liveUrl}
              githubUrl={featuredProjects[1].githubUrl}
            />
          </div>

          {/* Second row: staggered for editorial feel */}
          <div className="project-card-wrapper md:-mt-8">
            <ProjectCard
              title={featuredProjects[2].title}
              description={featuredProjects[2].description}
              tags={featuredProjects[2].tags}
              slug={featuredProjects[2].slug}
              imageSrc={featuredProjects[2].image}
              imageAspectRatio="21/13"
              caseStudyPath={featuredProjects[2].caseStudyPath}
              liveUrl={featuredProjects[2].liveUrl}
              githubUrl={featuredProjects[2].githubUrl}
            />
          </div>
          <div className="project-card-wrapper md:mt-8">
            <ProjectCard
              title={featuredProjects[3].title}
              description={featuredProjects[3].description}
              tags={featuredProjects[3].tags}
              slug={featuredProjects[3].slug}
              imageSrc={featuredProjects[3].image}
              screenshots={featuredProjects[3].screenshots}
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-14 md:mt-16 lg:mt-20 text-center">
            <div
              className="inline-flex items-center gap-6 p-2 rounded-full transition-all duration-500"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Link to="/projects">
                <Button variant="primary">
                  <span className="flex items-center gap-2">
                    View All Projects
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </Button>
              </Link>
              <span className="text-[11px] font-medium tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>
                Total: 9 Projects
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
