import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@/components/sections/Hero";

describe("Hero", () => {
  it("キャッチコピーとCTAを表示する", () => {
    render(<Hero />);
    expect(screen.getByText(/2週間ごとの最適を/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "お問い合わせ" })).toHaveAttribute("href", "#contact");
  });
});
