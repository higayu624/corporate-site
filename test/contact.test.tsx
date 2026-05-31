import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "@/components/sections/Contact";

describe("Contact", () => {
  it("mailtoリンクを表示する", () => {
    render(<Contact />);
    const btn = screen.getByRole("link", { name: "メールで問い合わせる" });
    expect(btn).toHaveAttribute("href", expect.stringContaining("mailto:higayu624@gmail.com"));
  });
});
