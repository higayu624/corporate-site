"use client";
import Image from "next/image";
import { useReveal } from "@/components/ui/Reveal";
import { works } from "@/lib/site";

type WorkItem = (typeof works)[number];

function WorkCard({ w }: { w: WorkItem }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const cls = `group block overflow-hidden rounded-2xl border border-line bg-white transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_24px_50px_-20px_rgba(99,102,241,0.45)] ${
    visible
      ? "translate-y-0 scale-100 opacity-100"
      : "translate-y-8 scale-95 opacity-0"
  }`;
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
  return w.url ? (
    <a
      ref={ref as unknown as React.Ref<HTMLAnchorElement>}
      href={w.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
    >
      {inner}
    </a>
  ) : (
    <div ref={ref} className={cls}>
      {inner}
    </div>
  );
}

export default function Works() {
  return (
    <section
      id="works"
      className="relative overflow-hidden bg-gradient-to-b from-brand to-brand3 py-24 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_15%_15%,white,transparent_42%),radial-gradient(circle_at_85%_85%,white,transparent_38%)]"
      />
      <div className="relative mx-auto max-w-[1100px] px-7">
        <p className="text-[12px] font-bold uppercase tracking-[4px] text-white/80">
          Works
        </p>
        <h2 className="mt-3 mb-14 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          実績
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {works.map((w) => (
            <WorkCard key={w.title} w={w} />
          ))}
        </div>
      </div>
    </section>
  );
}
