import { site } from "@/lib/site";

export default function Profile() {
  return (
    <section id="profile" className="bg-sand py-24">
      <div className="mx-auto max-w-[1100px] px-7">
        <p className="text-[11px] uppercase tracking-[4px] text-bronze">Profile</p>
        <h2 className="mt-3.5 mb-14 font-serif text-3xl font-semibold tracking-[2px]">プロフィール</h2>
        <div className="grid gap-12 md:grid-cols-[280px_1fr]">
          <div className="rounded-lg border border-line bg-white p-8">
            <Item k="屋号" v={site.name} />
            <Item k="代表" v={site.owner} />
            <Item k="拠点" v={site.location} />
          </div>
          <div>
            <p className="mb-6 text-[15px] text-sub">{site.bio}</p>
            <p className="mb-3.5 text-[11px] uppercase tracking-[4px] text-bronze">得意技術</p>
            <div className="flex flex-wrap gap-2.5">
              {site.skills.map((s) => (
                <span key={s} className="rounded-full border border-bronze px-3.5 py-1.5 text-xs">
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

function Item({ k, v }: { k: string; v: string }) {
  return (
    <div className="mb-4">
      <div className="text-[11px] uppercase tracking-[2px] text-bronze">{k}</div>
      <div className="mt-0.5 text-[15px]">{v}</div>
    </div>
  );
}
