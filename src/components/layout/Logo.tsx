import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Logo() {
  return (
    <Link to="/" className="group relative block">
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Logo mark */}
        <div className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10">
          {/* Glass background */}
          <div className="absolute inset-0 rounded-xl bg-white/[0.04] border border-white/[0.08] transition-all duration-500 group-hover:bg-accent/10 group-hover:border-accent/30 group-hover:shadow-[0_0_20px_rgba(124,92,255,0.15)]" />

          {/* Inner glow */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "radial-gradient(circle at 50% 50%, rgba(124,92,255,0.15), transparent 70%)" }}
          />

          {/* TZ Text */}
          <span className="relative z-10 text-sm md:text-base font-black tracking-tight">
            <span className="text-white">T</span>
            <span className="bg-gradient-to-br from-[#7C5CFF] to-[#3BC9FF] bg-clip-text text-transparent">Z</span>
          </span>
        </div>

        {/* Full name - hidden on mobile */}
        <span className="hidden sm:flex items-baseline gap-1.5">
          <span className="text-sm md:text-base font-semibold text-white/80 group-hover:text-white transition-colors duration-300">
            Tamim
          </span>
          <span className="text-sm md:text-base font-semibold bg-gradient-to-br from-[#7C5CFF] to-[#3BC9FF] bg-clip-text text-transparent">
            Zia
          </span>
        </span>

        {/* Animated underline */}
        <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[#7C5CFF] via-[#3BC9FF] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left" />
      </motion.div>
    </Link>
  );
}
