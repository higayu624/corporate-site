import { services } from "@/lib/site";

export default function Service() {
  return (
    <section id="service" className="relative overflow-hidden bg-surface py-24 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[360px] w-[360px] rounded-full bg-brand2/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-[1100px] px-7">
        <p className="bg-gradient-to-r from-brand to-brand3 bg-clip-text text-[12px] font-bold uppercase tracking-[4px] text-transparent">
          Service
        </p>
        <h2 className="mt-3 mb-14 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          得意な領域
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.no}
              className="group relative overflow-hidden rounded-2xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_24px_50px_-20px_rgba(99,102,241,0.45)]"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand via-brand2 to-brand3 transition-transform duration-300 group-hover:scale-x-100"
              />
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand2 font-display text-lg font-bold text-white shadow-[0_10px_24px_-8px_rgba(99,102,241,0.8)]">
                {s.no}
              </div>
              <h3 className="mb-3 text-lg font-bold tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="text-sm leading-[1.9] text-sub">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
