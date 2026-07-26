import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let mx = -100, my = -100, cx = -100, cy = -100;
    const handleMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", handleMove);
    const animate = () => {
      cx += (mx - cx) * 0.05;
      cy += (my - cy) * 0.05;
      el.style.transform = `translate(${cx - 150}px, ${cy - 150}px)`;
      requestAnimationFrame(animate);
    };
    animate();
    return () => document.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div ref={ref} className="fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-[99]"
      style={{ background: "radial-gradient(circle, rgba(124,92,255,0.12) 0%, rgba(59,201,255,0.04) 40%, transparent 70%)", borderRadius: "50%", willChange: "transform" }}
    />
  );
}
