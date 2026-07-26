import { useParams, Link } from "react-router-dom";
import { PageTransition } from "@/components/animations/PageTransition";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlassCard } from "@/components/shared/GlassCard";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { getProject, projects } from "@/data/projects";

const sectionBg = (isLaravel: boolean) => isLaravel ? "border-laravel/10" : "border-white/5";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white/50">Project Not Found</h1>
            <Link to="/projects"><Button variant="secondary">&larr; Back to Projects</Button></Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const isLaravel = project.category === "Laravel" || project.tags.includes("Laravel");
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <PageTransition direction="up">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{
          background: isLaravel
            ? "radial-gradient(ellipse at 50% 0%, rgba(255,45,32,0.06) 0%, transparent 60%)"
            : "radial-gradient(ellipse at 50% 0%, rgba(124,92,255,0.08) 0%, transparent 60%)",
        }} />
        <div className="max-width-container w-full pt-32 pb-20">
          <ScrollReveal>
            <Link to="/projects" className="inline-block text-sm text-white/30 hover:text-accent mb-8 transition-colors">&larr; Back to Projects</Link>
            <Badge className={`mb-6 ${isLaravel ? "bg-laravel/10 text-laravel border-laravel/20" : ""}`}>{project.category}</Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              {project.title}
            </h1>
            <p className="text-xl text-white/50 mt-6 max-w-2xl">{project.description}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              {project.tags.map((t) => (
                <span key={t} className={`px-4 py-2 rounded-full text-sm ${
                  t === "Laravel" || t === "PHP" || t === "MySQL"
                    ? "bg-laravel/10 text-laravel border border-laravel/20"
                    : "glass text-white/50"
                }`}>{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button as="a" href={project.liveUrl}>Live Demo</Button>
              <Button variant="secondary" as="a" href={project.githubUrl}>Source Code</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className={`section-padding border-t ${sectionBg(isLaravel)}`}>
        <div className="max-width-container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-12">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-white/90 mb-4">Overview</h2>
                <p className="text-white/50 leading-relaxed">{project.longDescription}</p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2 className="text-2xl font-bold text-white/90 mb-4">Business Problem</h2>
                <div className="glass rounded-2xl p-6 border-l-2 border-l-accent">
                  <p className="text-white/50 leading-relaxed">{project.problem}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <h2 className="text-2xl font-bold text-white/90 mb-4">Solution</h2>
                <div className="glass rounded-2xl p-6 border-l-2 border-l-accent-secondary">
                  <p className="text-white/50 leading-relaxed">{project.solution}</p>
                </div>
              </ScrollReveal>
            </div>

            <div className="space-y-12">
              {project.features && (
                <ScrollReveal delay={0.1} direction="right">
                  <h2 className="text-2xl font-bold text-white/90 mb-4">Features</h2>
                  <div className="space-y-3">
                    {project.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 glass rounded-2xl p-4 glass-hover">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isLaravel ? "bg-laravel/20 text-laravel" : "bg-accent/20 text-accent"
                        }`}>{i + 1}</span>
                        <span className="text-sm text-white/60">{f}</span>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}

              {project.architecture && (
                <ScrollReveal delay={0.2} direction="right">
                  <h2 className="text-2xl font-bold text-white/90 mb-4">Laravel Architecture</h2>
                  <GlassCard className={isLaravel ? "border-laravel/20" : ""}>
                    <p className="text-sm text-white/50 leading-relaxed">{project.architecture}</p>
                  </GlassCard>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {project.folderStructure && (
        <section className={`section-padding border-t ${sectionBg(isLaravel)}`}>
          <div className="max-width-container">
            <div className="grid lg:grid-cols-2 gap-12">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-white/90 mb-4">Folder Structure</h2>
                <GlassCard>
                  <code className="text-xs text-white/50 font-mono leading-relaxed block">{project.folderStructure}</code>
                </GlassCard>
              </ScrollReveal>

              {project.databaseSchema && (
                <ScrollReveal delay={0.1} direction="right">
                  <h2 className="text-2xl font-bold text-white/90 mb-4">Database Schema</h2>
                  <GlassCard>
                    <p className="text-sm text-white/50 leading-relaxed">{project.databaseSchema}</p>
                  </GlassCard>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {project.authFlow && (
        <section className={`section-padding border-t ${sectionBg(isLaravel)}`}>
          <div className="max-width-container">
            <div className="grid lg:grid-cols-2 gap-12">
              {project.authFlow && (
                <ScrollReveal>
                  <h2 className="text-2xl font-bold text-white/90 mb-4">Authentication Flow</h2>
                  <GlassCard className={isLaravel ? "border-laravel/20" : ""}>
                    <p className="text-sm text-white/50 leading-relaxed">{project.authFlow}</p>
                  </GlassCard>
                </ScrollReveal>
              )}

              {project.apiEndpoints && (
                <ScrollReveal delay={0.1} direction="right">
                  <h2 className="text-2xl font-bold text-white/90 mb-4">API Endpoints</h2>
                  <GlassCard>
                    <div className="space-y-2">
                      {project.apiEndpoints.map((ep, i) => (
                        <div key={i} className="text-xs font-mono text-white/50">
                          <span className="text-accent-secondary">{ep.split(" — ")[0]}</span>
                          {ep.includes(" — ") && <span className="text-white/30"> — {ep.split(" — ")[1]}</span>}
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {project.adminFeatures && (
        <section className={`section-padding border-t ${sectionBg(isLaravel)}`}>
          <div className="max-width-container">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white/90 mb-4">Admin Dashboard</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {project.adminFeatures.map((f, i) => (
                  <div key={i} className="glass rounded-2xl p-4 glass-hover">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isLaravel ? "bg-laravel" : "bg-accent"}`} />
                      <span className="text-sm text-white/60">{f}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      <section className={`section-padding border-t ${sectionBg(isLaravel)}`}>
        <div className="max-width-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {project.challenges && (
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-white/90 mb-4">Challenges</h2>
                <div className="space-y-4">
                  {project.challenges.map((c, i) => (
                    <GlassCard key={i}>
                      <div className="flex gap-3">
                        <span className="text-accent-secondary mt-0.5">!</span>
                        <span className="text-sm text-white/50">{c}</span>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {project.lessons && (
              <ScrollReveal delay={0.1} direction="right">
                <h2 className="text-2xl font-bold text-white/90 mb-4">Lessons Learned</h2>
                <div className="space-y-4">
                  {project.lessons.map((l, i) => (
                    <GlassCard key={i}>
                      <div className="flex gap-3">
                        <span className={`mt-0.5 ${isLaravel ? "text-laravel" : "text-accent"}`}>&#9632;</span>
                        <span className="text-sm text-white/50">{l}</span>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {project.performanceDetails && (
        <section className={`section-padding border-t ${sectionBg(isLaravel)}`}>
          <div className="max-width-container">
            <div className="grid lg:grid-cols-2 gap-12">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-white/90 mb-4">Performance</h2>
                <GlassCard className={isLaravel ? "border-laravel/20" : ""}>
                  <p className="text-sm text-white/50 leading-relaxed">{project.performanceDetails}</p>
                </GlassCard>
              </ScrollReveal>
              {project.securityDetails && (
                <ScrollReveal delay={0.1} direction="right">
                  <h2 className="text-2xl font-bold text-white/90 mb-4">Security</h2>
                  <GlassCard>
                    <p className="text-sm text-white/50 leading-relaxed">{project.securityDetails}</p>
                  </GlassCard>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {project.futureImprovements && (
        <section className={`section-padding border-t ${sectionBg(isLaravel)}`}>
          <div className="max-width-container">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white/90 mb-4">Future Improvements</h2>
              <div className="flex flex-wrap gap-3">
                {project.futureImprovements.map((imp, i) => (
                  <span key={i} className="px-4 py-2 glass rounded-full text-sm text-white/50 glass-hover">{imp}</span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      <section className={`section-padding border-t ${sectionBg(isLaravel)}`}>
        <div className="max-width-container">
          <ScrollReveal>
            <div className={`glass rounded-4xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 ${isLaravel ? "border-laravel/10" : ""}`}>
              <div>
                <h3 className="text-lg font-semibold text-white/90 mb-2">Next Project</h3>
                <p className="text-2xl font-bold text-gradient">{nextProject.title}</p>
              </div>
              <Link to={`/projects/${nextProject.slug}`}>
                <Button variant="secondary">View Next Project &rarr;</Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
