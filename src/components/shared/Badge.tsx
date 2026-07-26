import { cn } from "@/utils/cn";

interface Props {
  children: string;
  className?: string;
  dot?: boolean;
  dotColor?: string;
}

export function Badge({ children, className, dot = true, dotColor = "#22c55e" }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full glass", className)}>
      {dot && <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: dotColor }} />}
      {children}
    </span>
  );
}
