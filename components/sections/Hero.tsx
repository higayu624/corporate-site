import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-bg">
      {/* gradient mesh glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full bg-brand/30 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-[460px] w-[460px] rounded-full bg-brand3/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-40 h-[380px] w-[380px] rounded-full bg-brand2/20 blur-[120px]"
      />
      {/* subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,#e9ecf5_1px,transparent_1px),linear-gradient(to_bottom,#e9ecf5_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-[1100px] px-7 pt-28 pb-28 md:pt-36 md:pb-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[3px] text-sub shadow-sm backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-brand to-brand3" />
          Shift Gear — Software Engineering
        </span>

        <h1 className="mt-7 font-display text-[34px] font-extrabold leading-[1.25] tracking-[-0.01em] text-ink md:text-[60px] md:leading-[1.12]">
          <span className="bg-gradient-to-r from-brand via-brand2 to-brand3 bg-clip-text text-transparent">
            価値を出し続ける
          </span>
          <br />
          プロダクトを
        </h1>

        <p className="mt-7 max-w-[640px] text-[15px] leading-[1.95] text-sub md:text-[17px]">
          {site.heroSub}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-brand to-brand2 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(99,102,241,0.7)] transition-transform hover:-translate-y-0.5"
          >
            お問い合わせ
          </a>
          <a
            href="#works"
            className="rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand"
          >
            実績を見る →
          </a>
        </div>
      </div>
    </section>
  );
}
