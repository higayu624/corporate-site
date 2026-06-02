import Link from "next/link";
import { site, nav } from "@/lib/site";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1100px] items-center justify-between px-7">
        <Link
          href="#top"
          className="font-display text-xl font-extrabold tracking-tight"
        >
          <span className="bg-gradient-to-r from-brand to-brand3 bg-clip-text text-transparent">
            {site.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-semibold tracking-wide text-sub transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-brand to-brand2 px-5 py-2 text-[13px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(99,102,241,0.8)] transition-transform hover:-translate-y-0.5"
          >
            お問い合わせ
          </a>
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
