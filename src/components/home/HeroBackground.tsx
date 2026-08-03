import { useEffect, useRef } from "react";

const NOISE_URI = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

interface Star {
  x: number;
  y: number;
  size: number;
  layer: 0 | 1 | 2;
  base: number;
  twinkleSpeed: number;
  phase: number;
  drift: number;
}

// Parallax strength per layer — back stars move least, front particles most
const PARALLAX = [0.12, 0.3, 0.55];
const MAX_OFFSET = 14;

function makeSprite() {
  const sprite = document.createElement("canvas");
  sprite.width = 16;
  sprite.height = 16;
  const sctx = sprite.getContext("2d");
  if (!sctx) return sprite;
  const grad = sctx.createRadialGradient(8, 8, 0, 8, 8, 8);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(200,215,255,0.55)");
  grad.addColorStop(1, "rgba(200,215,255,0)");
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 16, 16);
  return sprite;
}

export function HeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;

    // Layer 2 — multi-layer star field (back / middle / front particles)
    const splits: [number, number, number] = isMobile ? [18, 14, 8] : [46, 38, 26];
    const stars: Star[] = [];
    const seedStars = (w: number, h: number) => {
      stars.length = 0;
      splits.forEach((count, layer) => {
        // Stratified grid sampling — even distribution without clumping
        const cols = Math.ceil(Math.sqrt((count * w) / h));
        const rows = Math.ceil(count / cols);
        const cellW = w / cols;
        const cellH = h / rows;
        for (let i = 0; i < count; i++) {
          const cx = (i % cols) * cellW;
          const cy = Math.floor(i / cols) * cellH;
          stars.push({
            x: cx + (0.14 + Math.random() * 0.72) * cellW,
            y: cy + (0.14 + Math.random() * 0.72) * cellH,
            size:
              layer === 2
                ? 0.9 + Math.random() * 1.6
                : layer === 1
                  ? 0.6 + Math.random() * 1
                  : 0.4 + Math.random() * 0.7,
            layer: layer as 0 | 1 | 2,
            base: layer === 2 ? 0.26 + Math.random() * 0.28 : 0.13 + Math.random() * 0.26,
            twinkleSpeed: 0.35 + Math.random() * 1.1,
            phase: Math.random() * Math.PI * 2,
            drift: (Math.random() - 0.5) * (layer === 2 ? 8 : 3.5),
          });
        }
      });
    };

    const sprite = makeSprite();
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = root.clientWidth;
      h = root.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars(w, h);
    };
    resize();
    window.addEventListener("resize", resize);
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let cursorPxX = window.innerWidth / 2;
    let cursorPxY = window.innerHeight / 2;
    let cursorCurX = cursorPxX;
    let cursorCurY = cursorPxY;

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
      cursorPxX = e.clientX;
      cursorPxY = e.clientY;
    };
    if (!reducedMotion && !isMobile) window.addEventListener("mousemove", onMove);

    const glowHalf = 352; // 44rem / 2 in px
    const orbFactors: [number, number][] = [
      [22, 16],
      [30, 22],
      [18, 12],
    ];

    let raf = 0;
    let running = false;
    let visible = true;
    let tabActive = true;
    let time = 0;
    let last = 0;

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;

      // Frame-rate independent smoothing
      const k = 1 - Math.exp(-dt * 4);
      curX += (targetX - curX) * k;
      curY += (targetY - curY) * k;
      cursorCurX += (cursorPxX - cursorCurX) * k;
      cursorCurY += (cursorPxY - cursorCurY) * k;

      // Aurora + orbs — tiny parallax shift
      if (auroraRef.current) {
        auroraRef.current.style.transform = `translate3d(${(curX * 14).toFixed(2)}px, ${(curY * 10).toFixed(2)}px, 0)`;
      }
      orbRefs.current.forEach((orb, i) => {
        if (!orb) return;
        const [fx, fy] = orbFactors[i];
        orb.style.transform = `translate3d(${(curX * fx).toFixed(2)}px, ${(curY * fy).toFixed(2)}px, 0)`;
      });
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${(cursorCurX - glowHalf).toFixed(2)}px, ${(cursorCurY - glowHalf).toFixed(2)}px, 0)`;
      }

      // Layer 2 — draw stars
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.y += s.drift * dt;
        if (s.y < -20) s.y = h + 20;
        if (s.y > h + 20) s.y = -20;

        const alpha = s.base * (0.78 + 0.22 * Math.sin(time * s.twinkleSpeed + s.phase));
        const px = curX * MAX_OFFSET * PARALLAX[s.layer];
        const py = curY * MAX_OFFSET * PARALLAX[s.layer] * 0.7;
        const x = s.x + px;
        const y = s.y + py;

        if (s.layer === 2) {
          ctx.globalAlpha = alpha * 0.8;
          ctx.drawImage(sprite, x - s.size * 3, y - s.size * 3, s.size * 6, s.size * 6);
        } else {
          // Soft halo for depth, then a small core — smooth glow, no harsh points
          ctx.globalAlpha = alpha * 0.12;
          ctx.fillStyle = "rgba(160,190,255,1)";
          ctx.beginPath();
          ctx.arc(x, y, s.size * (s.layer === 1 ? 3.4 : 2.6), 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = "rgba(255,255,255,1)";
          ctx.beginPath();
          ctx.arc(x, y, s.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || !visible || !tabActive) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    };

    // Pause when the tab is inactive
    const onVisibility = () => {
      tabActive = !document.hidden;
      if (tabActive && visible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Pause when the hero is off-screen
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible && tabActive) start();
        else stop();
      },
      { rootMargin: "120px" }
    );
    io.observe(root);

    if (reducedMotion) {
      // Static render — no animation loop
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.globalAlpha = s.base;
        if (s.layer === 2) {
          ctx.drawImage(sprite, s.x - s.size * 3, s.y - s.size * 3, s.size * 6, s.size * 6);
        } else {
          ctx.globalAlpha = s.base * 0.12;
          ctx.fillStyle = "rgba(160,190,255,1)";
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * (s.layer === 1 ? 3.4 : 2.6), 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = s.base;
          ctx.fillStyle = "rgba(255,255,255,1)";
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    } else {
      start();
    }

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-bg absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Layer 1 — breathing deep radial gradient */}
      <div className="hero-base" />

      {/* Layer 3 — soft aurora glow */}
      <div ref={auroraRef} className="absolute inset-0 will-change-transform">
        <div className="hero-aurora hero-aurora-a" />
        <div className="hero-aurora hero-aurora-b" />
        <div className="hero-aurora hero-aurora-c" />
      </div>

      {/* Layer 4 — floating blurred light orbs (edges only) */}
      <div ref={(el) => { orbRefs.current[0] = el; }} className="hero-orb-wrap will-change-transform">
        <div className="hero-orb hero-orb-a" />
      </div>
      <div ref={(el) => { orbRefs.current[1] = el; }} className="hero-orb-wrap will-change-transform">
        <div className="hero-orb hero-orb-b" />
      </div>
      <div ref={(el) => { orbRefs.current[2] = el; }} className="hero-orb-wrap will-change-transform">
        <div className="hero-orb hero-orb-c" />
      </div>

      {/* Balanced lighting — very soft radial glow near the photo (right side) */}
      <div className="hero-balance-glow" />

      {/* Layer 2 — multi-layer star field */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Layer 6 — cursor glow */}
      <div ref={glowRef} className="hero-cursor-glow will-change-transform" />

      {/* Layer 5 — subtle noise texture */}
      <div className="hero-noise" style={{ backgroundImage: NOISE_URI }} />
    </div>
  );
}
