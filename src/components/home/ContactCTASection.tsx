import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";

export function ContactCTASection() {
  return (
    <section className="section-padding border-t border-white/5">
      <div className="max-width-container">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl md:rounded-4xl p-10 md:p-16 lg:p-20 text-center space-y-8">
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: "linear-gradient(135deg, rgba(124,92,255,0.08), rgba(255,45,32,0.04), rgba(59,201,255,0.06))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
            <div
              className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl -z-10"
              style={{ background: "radial-gradient(circle, rgba(124,92,255,0.3), transparent 70%)" }}
            />
            <div
              className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl -z-10"
              style={{ background: "radial-gradient(circle, rgba(255,45,32,0.2), transparent 70%)" }}
            />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Let's Build Something<br />
              <span className="text-gradient">Amazing Together</span>
            </h2>
            <p className="text-base md:text-lg text-white/40 max-w-xl mx-auto">
              I'm available for Laravel development, full-stack projects, and technical consulting.
              Let's turn your ideas into reality.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <Link to="/contact"><Button className="text-base px-8 py-3.5">Hire Me</Button></Link>
              <Link to="/contact"><Button variant="secondary" className="text-base px-8 py-3.5">Contact Me</Button></Link>
              <Button variant="ghost" as="a" href="./resume.pdf" className="text-base px-8 py-3.5">Download Resume</Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
