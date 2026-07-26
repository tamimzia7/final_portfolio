import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface Props {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  as?: "div" | "section" | "article";
}

export function GlassCard({ children, className, hover = true, glow = false, as: Tag = "div" }: Props) {
  return (
    <Tag className={cn("glass rounded-4xl p-8", hover && "glass-hover", glow && "hover:shadow-[0_0_40px_rgba(124,92,255,0.15)]", className)}>
      {children}
    </Tag>
  );
}
