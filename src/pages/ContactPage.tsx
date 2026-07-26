import { useState } from "react";
import { PageTransition } from "@/components/animations/PageTransition";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlassCard } from "@/components/shared/GlassCard";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactScene } from "@/components/three/ContactScene";

const faqs = [
  { q: "What services do you offer?", a: "Full-stack web development, custom UI/UX design, 3D web experiences, API development, and performance optimization." },
  { q: "What is your typical project timeline?", a: "Timelines vary by project scope. A typical website takes 2-4 weeks, while complex applications may take 2-3 months." },
  { q: "How do you handle project communication?", a: "I use tools like Slack, Discord, or email for daily communication, with weekly progress updates and milestone reviews." },
  { q: "Do you offer post-launch support?", a: "Yes, I offer maintenance packages including updates, monitoring, and feature enhancements after launch." },
  { q: "What information do you need to start?", a: "Project brief, design references (if any), technical requirements, timeline expectations, and budget range." },
];

const contactInfo = [
  { label: "Email", value: "tamim@example.com" },
  { label: "Location", value: "Remote / Worldwide" },
  { label: "Availability", value: "Open to opportunities" },
  { label: "Response Time", value: "Within 24 hours" },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageTransition direction="up">
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <ContactScene />
        <div className="max-width-container w-full pt-32 pb-20">
          <ScrollReveal>
            <Badge className="mb-6">Get In Touch</Badge>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
              Let's<br /><span className="text-gradient">Connect</span>
            </h1>
            <p className="text-white/40 text-lg mt-6 max-w-xl">Have a project in mind? I'd love to hear about it.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding border-t border-white/5">
        <div className="max-width-container">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <SectionHeading title="Contact" highlight="Information" />
              <div className="space-y-4">
                {contactInfo.map((info, i) => (
                  <ScrollReveal key={info.label} delay={0.1 * i}>
                    <GlassCard>
                      <div className="text-xs text-white/30 mb-1">{info.label}</div>
                      <div className="text-sm text-white/70">{info.value}</div>
                    </GlassCard>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.4}>
                <GlassCard>
                  <h3 className="text-sm font-semibold text-white/90 mb-3">Social Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {["GitHub", "LinkedIn", "Facebook", "Twitter"].map((s) => (
                      <a key={s} href={`https://${s.toLowerCase()}.com/${s === "GitHub" ? "tamimzia7" : "tamimzia"}`} target="_blank" rel="noopener noreferrer"
                        className="text-xs px-3 py-2 glass rounded-full text-white/40 hover:text-accent transition-colors">{s}</a>
                    ))}
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-3">
              <ScrollReveal delay={0.1} direction="right">
                <GlassCard>
                  <h3 className="text-lg font-semibold text-white/90 mb-6">Send a Message</h3>
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">&#10003;</div>
                      <h4 className="text-xl font-semibold text-white/90 mb-2">Message Sent!</h4>
                      <p className="text-white/40">I'll get back to you within 24 hours.</p>
                      <Button variant="secondary" className="mt-6" onClick={() => setSubmitted(false)}>Send Another</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-xs text-white/30 mb-2">Name</label>
                          <input id="name" type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="w-full glass rounded-2xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-accent/50 transition-colors" />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-xs text-white/30 mb-2">Email</label>
                          <input id="email" type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="w-full glass rounded-2xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-accent/50 transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-xs text-white/30 mb-2">Subject</label>
                        <input id="subject" type="text" value={formState.subject} onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                          className="w-full glass rounded-2xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-accent/50 transition-colors" />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-xs text-white/30 mb-2">Message</label>
                        <textarea id="message" required rows={5} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="w-full glass rounded-2xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-accent/50 transition-colors resize-none" />
                      </div>
                      <Button type="submit" className="w-full justify-center">Send Message &rarr;</Button>
                    </form>
                  )}
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-white/5">
        <div className="max-width-container">
          <SectionHeading title="Frequently Asked" highlight="Questions" />
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={0.05 * i}>
                <GlassCard className="h-full">
                  <h3 className="text-sm font-semibold text-white/90 mb-2">{faq.q}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{faq.a}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
