"use client";
import { useState } from "react";
import { nav } from "@/lib/site";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        aria-label="メニュー"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full border border-line bg-white px-4 py-1.5 text-sm font-semibold text-ink"
      >
        {open ? "閉じる" : "メニュー"}
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-[68px] border-b border-line bg-white/95 px-7 py-4 backdrop-blur-xl">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-semibold tracking-wide text-sub transition-colors hover:text-brand"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-gradient-to-r from-brand to-brand2 px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            お問い合わせ
          </a>
        </div>
      )}
    </div>
  );
}
