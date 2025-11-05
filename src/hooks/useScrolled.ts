"use client";
import { useEffect, useState } from "react";

export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
        setScrollDirection(direction);
      }
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };

    const onScroll = () => window.requestAnimationFrame(updateScrollDirection);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDirection, lastScrollY]);

  return scrollDirection;
}


