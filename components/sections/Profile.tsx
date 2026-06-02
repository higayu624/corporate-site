import Image from "next/image";
import { site } from "@/lib/site";

export default function Profile() {
  return (
    <section id="profile" className="relative overflow-hidden bg-surface py-24 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-[360px] w-[360px] rounded-full bg-brand/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-[1000px] px-7">
        <p className="bg-gradient-to-r from-brand to-brand3 bg-clip-text text-[12px] font-bold uppercase tracking-[4px] text-transparent">
          Profile
        </p>
        <h2 className="mt-3 mb-14 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          プロフィール
        </h2>
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[130px] shrink-0 rounded-2xl bg-gradient-to-br from-brand via-brand2 to-brand3 p-[3px] shadow-[0_18px_45px_-15px_rgba(99,102,241,0.7)] md:mx-0">
            <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-white">
              <Image
                src={site.photo}
                alt={`${site.owner}（${site.name} 代表）`}
                fill
                sizes="130px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-display text-[26px] font-extrabold tracking-tight text-ink md:text-[30px]">
              {site.owner}
            </h3>
            <p className="mt-2 text-[13px] font-semibold tracking-wide text-brand-ink">
              {site.name}　代表 ・ {site.location}
            </p>
            <div className="my-6 h-px w-10 bg-gradient-to-r from-brand to-brand3" />
            <p className="max-w-[560px] text-[15px] leading-[2] text-sub">{site.bio}</p>
            <p className="mt-9 mb-3.5 text-[11px] font-bold uppercase tracking-[4px] text-muted">
              得意技術
            </p>
            <div className="flex flex-wrap gap-2.5">
              {site.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-brand/15 bg-brand/5 px-3.5 py-1.5 text-xs font-medium text-brand-ink"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
