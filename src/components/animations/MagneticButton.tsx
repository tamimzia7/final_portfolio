import { useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  type?: "button" | "submit" | "reset";
}

export function MagneticButton({ children, className, onClick, as = "button", href, type }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };
  const handleLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };

  const Tag = as;

  return (
    <div ref={ref} className="inline-block transition-transform duration-200 ease-out" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {as === "a"
        ? <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>
        : <button type={type || "button"} onClick={onClick} className={className}>{children}</button>
      }
    </div>
  );
}
