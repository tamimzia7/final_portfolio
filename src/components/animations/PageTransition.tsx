import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "none";
}

const variants = {
  initial: (d: string) => ({
    opacity: 0,
    x: d === "left" ? 60 : d === "right" ? -60 : 0,
    y: d === "up" ? 40 : 0,
  }),
  animate: { opacity: 1, x: 0, y: 0 },
  exit: (d: string) => ({
    opacity: 0,
    x: d === "left" ? -60 : d === "right" ? 60 : 0,
    y: d === "up" ? -40 : 0,
    transition: { duration: 0.3 },
  }),
};

export function PageTransition({ children, direction = "left" }: Props) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
