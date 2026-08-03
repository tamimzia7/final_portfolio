import { useEffect, useRef } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function useLenis() {
  const ref = useRef<Lenis | null>(null);
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    ref.current = lenis;
    lenisInstance = lenis;
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => {
      lenisInstance = null;
      lenis.destroy();
    };
  }, []);
  return ref;
}

export function resetScrollPosition() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  window.scrollTo(0, 0);
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true, force: true });
  }
}
