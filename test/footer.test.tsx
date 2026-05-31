import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("外部リンクとコピーライトを表示する", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/higayu624");
    expect(screen.getByText(/© 2026 Shift Gear/)).toBeInTheDocument();
  });
});
