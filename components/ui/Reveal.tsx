"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Observes a single element and flips `visible` to true the first time it
 * enters the viewport. Falls back to visible when IntersectionObserver is
 * unavailable (SSR / test env).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

const BASE = "transition-all duration-500 ease-out";
const HIDDEN = "translate-y-8 scale-95 opacity-0";
const SHOWN = "translate-y-0 scale-100 opacity-100";

/** Generic wrapper that reveals its children when scrolled into view. */
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`${BASE} ${visible ? SHOWN : HIDDEN} ${className}`}>
      {children}
    </div>
  );
}
