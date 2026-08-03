import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resetScrollPosition } from "@/hooks/useLenis";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    resetScrollPosition();
  }, [pathname]);

  return null;
}
