import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface Props {
  title: string;
  highlight?: string;
  subtitle?: string;
  delay?: number;
}

export function SectionHeading({ title, highlight, subtitle, delay = 0 }: Props) {
  return (
    <ScrollReveal delay={delay}>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
        {title}
        {highlight && <><br /><span className="text-gradient">{highlight}</span></>}
      </h2>
      {subtitle && <p className="text-white/40 text-lg mb-16 max-w-lg">{subtitle}</p>}
    </ScrollReveal>
  );
}
