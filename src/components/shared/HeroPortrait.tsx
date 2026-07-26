import portraitSrc from "@/assets/portrait.png";

interface HeroPortraitProps {
  variant?: "hero" | "about";
}

export function HeroPortrait({ variant = "hero" }: HeroPortraitProps) {
  const isHero = variant === "hero";

  return (
    <div
      className={`relative ${isHero ? "w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[500px]" : "w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[480px]"}`}
    >
      <div
        className={`relative overflow-hidden ${
          isHero ? "rounded-[24px]" : "rounded-[24px]"
        } ${isHero ? "animate-[float_6s_ease-in-out_infinite]" : ""}`}
        style={isHero ? {
          animation: "float 6s ease-in-out infinite",
        } : undefined}
      >
        <div
          className="absolute -inset-1 rounded-[28px] opacity-60 blur-xl"
          style={{
            background: "linear-gradient(135deg, rgba(124,92,255,0.4), rgba(59,201,255,0.2))",
          }}
        />
        <div
          className="relative overflow-hidden rounded-[24px]"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: isHero
              ? "0 25px 50px -12px rgba(124,92,255,0.25), 0 0 0 1px rgba(255,255,255,0.05)"
              : "0 20px 40px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          <img
            src={portraitSrc}
            alt="Tamim Zia — Full Stack Developer"
            loading={isHero ? "eager" : "lazy"}
            className={`w-full h-full object-cover ${
              isHero
                ? "aspect-[3/4] md:aspect-[4/5]"
                : "aspect-[4/3] md:aspect-[5/4]"
            }`}
            style={{
              objectPosition: isHero ? "50% 30%" : "50% 35%",
              transform: isHero ? "scale(1.05)" : "scale(0.95)",
            }}
          />
          {isHero && (
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.6) 100%)",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
