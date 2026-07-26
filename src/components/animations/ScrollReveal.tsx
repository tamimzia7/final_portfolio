import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
}

export function ScrollReveal({ children, className = "", delay = 0, direction = "up", distance = 60, duration = 0.8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = { up: `translateY(${distance}px)`, down: `translateY(${-distance}px)`, left: `translateX(${distance}px)`, right: `translateX(${-distance}px)`, none: "none" };
    el.style.opacity = "0";
    el.style.transform = t[direction];
    el.style.transition = `opacity ${duration}s cubic-bezier(0.4,0,0.2,1), transform ${duration}s cubic-bezier(0.4,0,0.2,1)`;
    el.style.transitionDelay = `${delay}s`;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translate(0,0)"; observer.unobserve(el); }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction, distance, duration]);

  return <div ref={ref} className={className}>{children}</div>;
}
