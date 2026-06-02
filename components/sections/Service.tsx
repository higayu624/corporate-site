"use client";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/site";

export default function Service() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean[]>(() =>
    services.map(() => false)
  );

  useEffect(() => {
    // Fallback for SSR / test env without IntersectionObserver
    if (typeof IntersectionObserver === "undefined") {
      setVisible(services.map(() => true));
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          services.forEach((_, i) => {
            timeouts.push(
              setTimeout(() => {
                setVisible((prev) => {
                  if (prev[i]) return prev;
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }, i * 140)
            );
          });
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <section id="service" className="relative overflow-hidden bg-ink py-24 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-8 h-[420px] w-[420px] rounded-full bg-brand/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-[380px] w-[380px] rounded-full bg-brand3/20 blur-[140px]"
      />
      <div className="relative mx-auto max-w-[1100px] px-7">
        <p className="bg-gradient-to-r from-brand to-brand3 bg-clip-text text-[12px] font-bold uppercase tracking-[4px] text-transparent">
          Service
        </p>
        <h2 className="mt-3 mb-14 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          得意な領域
        </h2>
        <div ref={containerRef} className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.no}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.07] hover:shadow-[0_24px_55px_-20px_rgba(99,102,241,0.65)] ${
                visible[i]
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-8 scale-95 opacity-0"
              }`}
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand via-brand2 to-brand3 transition-transform duration-300 group-hover:scale-x-100"
              />
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand2 font-display text-lg font-bold text-white shadow-[0_10px_24px_-8px_rgba(99,102,241,0.8)]">
                {s.no}
              </div>
              <h3 className="mb-3 text-lg font-bold tracking-tight text-white">
                {s.title}
              </h3>
              <p className="text-sm leading-[1.9] text-slate-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
