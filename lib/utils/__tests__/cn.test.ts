import { describe, it, expect } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges conflicting tailwind utilities, last one wins", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("drops falsy values and de-dupes", () => {
    expect(cn("flex", false && "hidden", undefined, "flex")).toBe("flex");
  });

  // Regression for the custom twMerge config: the composite typography `text-*`
  // tokens must not be bucketed as text colors, or they'd wrongly collide with
  // a color class like `text-neutral-fg2`.
  it("keeps a typography token and a text color together", () => {
    const result = cn("text-body1", "text-neutral-fg2");
    expect(result).toContain("text-body1");
    expect(result).toContain("text-neutral-fg2");
  });
});
