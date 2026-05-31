import Image from "next/image";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-right"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ivory via-ivory/55 to-transparent" />
      <div className="mx-auto max-w-[1100px] px-7 pt-28 pb-28">
      <p className="text-[11px] uppercase tracking-[4px] text-bronze">
        Shift Gear — Software Engineering
      </p>
      <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.35] tracking-[2px] md:text-[54px]">
        ビジネス価値を、<br />最大化する。
      </h1>
      <div className="my-6 h-px w-10 bg-bronze" />
      <p className="max-w-[620px] text-sub">{site.heroSub}</p>
      <div className="mt-10 flex flex-wrap items-center gap-5">
        <a href="#contact"
           className="rounded bg-bronze-dark px-8 py-3.5 text-sm tracking-wide text-white transition-colors hover:bg-[#54472f]">
          お問い合わせ
        </a>
        <a href="#works" className="border-b border-bronze pb-1 text-sm text-ink">
          実績を見る →
        </a>
      </div>
      </div>
    </section>
  );
}
