import Image from "next/image";
import { site } from "@/lib/site";

export default function Profile() {
  return (
    <section id="profile" className="bg-sand py-24 md:py-32">
      <div className="mx-auto max-w-[1000px] px-7">
        <p className="text-[11px] uppercase tracking-[4px] text-bronze">Profile</p>
        <h2 className="mt-3.5 mb-14 font-serif text-3xl font-semibold tracking-[2px]">プロフィール</h2>
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
          <div className="relative aspect-[4/5] w-full max-w-[240px] shrink-0 overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(107,93,68,0.18)]">
            <Image
              src={site.photo}
              alt={`${site.owner}（${site.name} 代表）`}
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-[26px] font-semibold tracking-[1px] md:text-[30px]">
              {site.owner}
            </h3>
            <p className="mt-2 text-[13px] tracking-[2px] text-bronze">
              {site.name}　代表 ・ {site.location}
            </p>
            <div className="my-6 h-px w-10 bg-bronze/50" />
            <p className="max-w-[560px] text-[15px] leading-[2] text-sub">{site.bio}</p>
            <p className="mt-9 mb-3.5 text-[11px] uppercase tracking-[4px] text-bronze">得意技術</p>
            <div className="flex flex-wrap gap-2.5">
              {site.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-bronze/60 px-3.5 py-1.5 text-xs text-ink/85"
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
