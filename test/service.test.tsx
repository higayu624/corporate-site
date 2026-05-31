import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Service from "@/components/sections/Service";

describe("Service", () => {
  it("3つのサービスを表示する", () => {
    render(<Service />);
    expect(screen.getByText("eコマース構築")).toBeInTheDocument();
    expect(screen.getByText("業務特化AIモデル構築")).toBeInTheDocument();
    expect(screen.getByText("AIでの業務削減")).toBeInTheDocument();
  });
});
