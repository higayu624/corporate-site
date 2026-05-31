import { site } from "@/lib/site";

export default function Contact() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("お問い合わせ")}`;
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-[1100px] px-7 text-center">
        <p className="text-[11px] uppercase tracking-[4px] text-bronze">Contact</p>
        <h2 className="mt-3.5 font-serif text-3xl font-semibold tracking-[2px]">
          お気軽にご相談ください
        </h2>
        <p className="my-5 font-display text-2xl tracking-wide">{site.email}</p>
        <a href={mailto}
           className="inline-block rounded bg-bronze-dark px-8 py-3.5 text-sm tracking-wide text-white transition-colors hover:bg-[#54472f]">
          メールで問い合わせる
        </a>
      </div>
    </section>
  );
}
