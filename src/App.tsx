import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { AuroraBackground } from "@/components/animations/AuroraBackground";
import { NoiseOverlay } from "@/components/animations/NoiseOverlay";
import { CursorGlow } from "@/components/animations/CursorGlow";
import { useLenis } from "@/hooks/useLenis";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import SkillsPage from "@/pages/SkillsPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import AsthaCaseStudyPage from "@/pages/AsthaCaseStudyPage";
import AuraCaseStudyPage from "@/pages/AuraCaseStudyPage";
import NawBoutiqueCaseStudyPage from "@/pages/NawBoutiqueCaseStudyPage";
import ExperiencePage from "@/pages/ExperiencePage";
import GitHubPage from "@/pages/GitHubPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  const location = useLocation();
  useLenis();

  return (
    <>
      <AuroraBackground />
      <NoiseOverlay />
      <CursorGlow />
      <Header />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/astha" element={<AsthaCaseStudyPage />} />
          <Route path="/projects/aura" element={<AuraCaseStudyPage />} />
          <Route path="/projects/naw-boutique" element={<NawBoutiqueCaseStudyPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/github" element={<GitHubPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}
