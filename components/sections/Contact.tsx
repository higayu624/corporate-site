import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export default function Contact() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("お問い合わせ")}`;
  return (
    <section id="contact" className="bg-bg py-24 md:py-28">
      <div className="mx-auto max-w-[1100px] px-7">
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-brand2 to-brand3 px-7 py-16 text-center md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_80%,white,transparent_35%)]"
          />
          <div className="relative">
            <p className="text-[12px] font-bold uppercase tracking-[4px] text-white/80">
              Contact
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              お気軽にご相談ください
            </h2>
            <p className="my-5 font-display text-xl font-semibold tracking-wide text-white/95 md:text-2xl">
              {site.email}
            </p>
            <a
              href={mailto}
              className="inline-block rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand-ink shadow-[0_14px_30px_-10px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-0.5"
            >
              メールで問い合わせる
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
