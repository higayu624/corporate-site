import { site, socials } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink py-12 text-[#cdbfa6]">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-7">
        <div className="font-display text-lg text-[#e8dcc6]">{site.name}</div>
        <div className="flex gap-5">
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
               className="border-b border-transparent text-[13px] tracking-wide transition-colors hover:border-[#cdbfa6]">
              {s.label}
            </a>
          ))}
        </div>
        <div className="text-xs tracking-wide">© 2026 {site.name}</div>
      </div>
    </footer>
  );
}
