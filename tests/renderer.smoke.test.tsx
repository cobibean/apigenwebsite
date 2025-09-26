import React from "react";
import { render, screen } from "@testing-library/react";
import RenderBlocks from "@/components/RenderBlocks";

describe("RenderBlocks smoke", () => {
  it("renders a known block and unknown guard", async () => {
    const blocks = [
      { type: "Dev.Placeholder", props: { title: "Hero placeholder" } },
      { type: "Unknown.Block", props: { foo: "bar" } },
    ] as unknown as Array<{ type: string; props?: Record<string, unknown> }>;
    render(<RenderBlocks blocks={blocks} preview={true} />);

    // The Dev.Placeholder renders a <pre> with props JSON
    expect(screen.getByText(/Hero placeholder/)).toBeInTheDocument();

    // Unknown block guard message
    expect(screen.getByText(/Unknown block type:/)).toBeInTheDocument();
  });
});


