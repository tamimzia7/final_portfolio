import { useEffect, useRef } from "react";

interface AuroraProps {
  speed?: number;
  opacity?: number;
}

export function AuroraBackground({ speed = 0.002, opacity = 0.6 }: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const h1 = 250 + Math.sin(time * 0.3) * 20;
      const h2 = 190 + Math.sin(time * 0.4 + 1) * 15;
      const h3 = 280 + Math.sin(time * 0.2 + 2) * 25;
      gradient.addColorStop(0, `hsla(${h1},80%,50%,0.08)`);
      gradient.addColorStop(0.3, `hsla(${h2},70%,55%,0.06)`);
      gradient.addColorStop(0.6, `hsla(${h3},75%,45%,0.05)`);
      gradient.addColorStop(1, `hsla(${h1 + 30},80%,50%,0.03)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 3; i++) {
        const x = canvas.width * (0.2 + 0.6 * Math.sin(time * 0.1 + i * 2));
        const y = canvas.height * (0.2 + 0.6 * Math.cos(time * 0.08 + i * 1.5));
        const radius = 200 + 150 * Math.sin(time * 0.05 + i);
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        const bh = [250, 190, 280][i] + Math.sin(time + i) * 10;
        grad.addColorStop(0, `hsla(${bh},80%,60%,0.12)`);
        grad.addColorStop(0.5, `hsla(${bh},70%,50%,0.05)`);
        grad.addColorStop(1, `hsla(${bh},60%,40%,0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", resize); };
  }, [speed, opacity]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity }} />;
}
