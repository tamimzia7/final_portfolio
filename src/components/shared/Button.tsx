import { type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { MagneticButton } from "@/components/animations/MagneticButton";

interface Props {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  href?: string;
  as?: "button" | "a";
  type?: "button" | "submit" | "reset";
}

const styles = {
  primary: "bg-accent text-white hover:bg-[#6a4de6] border border-accent/20 shadow-[0_0_20px_rgba(124,92,255,0.15)]",
  secondary: "glass glass-hover text-white border border-border",
  ghost: "text-white/60 hover:text-white hover:bg-white/5 border border-transparent",
};

export function Button({ children, variant = "primary", className, onClick, href, as = "button", type }: Props) {
  return (
    <MagneticButton as={as} href={href} onClick={onClick} type={type} className={cn("inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300", styles[variant], className)}>
      {children}
    </MagneticButton>
  );
}
