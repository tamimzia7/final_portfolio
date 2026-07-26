import { PageTransition } from "@/components/animations/PageTransition";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { LaravelExpertiseSection } from "@/components/home/LaravelExpertiseSection";
import { AboutPreviewSection } from "@/components/home/AboutPreviewSection";
import { SkillsOverviewSection } from "@/components/home/SkillsOverviewSection";
import { ExperienceTimelineSection } from "@/components/home/ExperienceTimelineSection";
import { GitHubActivitySection } from "@/components/home/GitHubActivitySection";
import { ContactCTASection } from "@/components/home/ContactCTASection";

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <FeaturedProjectsSection />
      <LaravelExpertiseSection />
      <AboutPreviewSection />
      <SkillsOverviewSection />
      <ExperienceTimelineSection />
      <GitHubActivitySection />
      <ContactCTASection />
    </PageTransition>
  );
}
