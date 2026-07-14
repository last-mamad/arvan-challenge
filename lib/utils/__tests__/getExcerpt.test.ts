import { describe, it, expect } from "vitest";

import { getExcerpt } from "@/lib/utils";

describe("getExcerpt", () => {
  it("returns the text unchanged when it has fewer words than the limit", () => {
    expect(getExcerpt("one two three", 20)).toBe("one two three");
  });

  it("returns the text unchanged when the word count equals the limit", () => {
    const text = "w1 w2 w3 w4 w5";
    expect(getExcerpt(text, 5)).toBe(text);
  });

  it("truncates to the first N words and appends an ellipsis", () => {
    expect(getExcerpt("a b c d e f", 3)).toBe("a b c…");
  });

  it("defaults to 20 words", () => {
    const text = Array.from({ length: 25 }, (_, i) => `w${i}`).join(" ");
    const result = getExcerpt(text);
    expect(result.endsWith("…")).toBe(true);
    expect(result.split(" ")).toHaveLength(20);
  });

  it("normalizes arbitrary whitespace when counting words", () => {
    expect(getExcerpt("  a   b \n c  ", 2)).toBe("a b…");
  });
});
