"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { works } from "@/lib/site";

export default function Works() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean[]>(() => works.map(() => false));

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setVisible(works.map(() => true));
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          works.forEach((_, i) => {
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

  const reveal = (i: number) =>
    visible[i]
      ? "translate-y-0 scale-100 opacity-100"
      : "translate-y-8 scale-95 opacity-0";

  return (
    <section id="works" className="bg-bg py-24 md:py-28">
      <div className="mx-auto max-w-[1100px] px-7">
        <p className="bg-gradient-to-r from-brand to-brand3 bg-clip-text text-[12px] font-bold uppercase tracking-[4px] text-transparent">
          Works
        </p>
        <h2 className="mt-3 mb-14 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          実績
        </h2>
        <div ref={containerRef} className="grid gap-6 md:grid-cols-3">
          {works.map((w, i) => {
            const inner = (
              <>
                <div className="relative flex h-40 items-end overflow-hidden bg-gradient-to-br from-brand to-brand2 p-4">
                  {w.image && (
                    <>
                      <Image
                        src={w.image}
                        alt={`${w.title} のサムネイル`}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    </>
                  )}
                  <span className="relative rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[2px] text-white backdrop-blur">
                    {w.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="mb-2.5 text-[17px] font-bold tracking-tight text-ink">
                    {w.title}
                  </h3>
                  <p className="mb-4 text-[13px] leading-[1.85] text-sub">{w.desc}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {w.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-brand/15 bg-brand/5 px-2.5 py-1 text-[11px] font-medium text-brand-ink"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {w.url ? (
                    <span className="text-[13px] font-semibold text-brand-ink transition-colors group-hover:text-brand">
                      サイトを見る ↗
                    </span>
                  ) : (
                    <span className="text-[13px] text-muted">非公開案件</span>
                  )}
                </div>
              </>
            );
            const cls = `group block overflow-hidden rounded-2xl border border-line bg-white transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_24px_50px_-20px_rgba(99,102,241,0.45)] ${reveal(
              i
            )}`;
            return w.url ? (
              <a key={w.title} href={w.url} target="_blank" rel="noopener noreferrer" className={cls}>
                {inner}
              </a>
            ) : (
              <div key={w.title} className={cls}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
