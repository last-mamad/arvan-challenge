import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

// Deterministic, offline tag list.
const { mockUseTagList } = vi.hoisted(() => ({ mockUseTagList: vi.fn() }));
vi.mock("@/app/dashboard/articles/_hooks/usePosts", () => ({
  useTagList: () => mockUseTagList(),
}));

// The virtualizer isn't under test and doesn't behave in jsdom — stub it out.
vi.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: () => ({
    getTotalSize: () => 0,
    getVirtualItems: () => [],
    measureElement: () => {},
  }),
}));

import { useTagsBox } from "@/app/dashboard/articles/_hooks/useTagsBox";

beforeEach(() => {
  mockUseTagList.mockReturnValue({ data: ["react", "css", "html"], isPending: false });
});

describe("useTagsBox", () => {
  it("lists custom (unfetched) tags first, then the fetched tags sorted", () => {
    const { result } = renderHook(() => useTagsBox({ value: ["custom"], onChange: () => {} }));
    expect(result.current.displayTags).toEqual(["custom", "css", "html", "react"]);
  });

  it("filters the list by the typed query (case-insensitive substring)", () => {
    const { result } = renderHook(() => useTagsBox({ value: [], onChange: () => {} }));
    act(() => result.current.setNewTag("HT"));
    expect(result.current.displayTags).toEqual(["html"]);
  });

  it("toggle adds an unchecked tag and removes a checked one via onChange", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useTagsBox({ value: ["react"], onChange }));

    act(() => result.current.toggle("css")); // not selected → add
    expect(onChange).toHaveBeenLastCalledWith(["react", "css"]);

    act(() => result.current.toggle("react")); // selected → remove
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it("addNewTag adds a brand-new tag, checks it, and clears the input", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useTagsBox({ value: [], onChange }));

    act(() => result.current.setNewTag("  brand-new  "));
    act(() => result.current.addNewTag());

    expect(onChange).toHaveBeenLastCalledWith(["brand-new"]);
    expect(result.current.newTag).toBe("");
    expect(result.current.displayTags).toContain("brand-new");
  });

  it("addNewTag on an already-listed tag toggles it instead of duplicating", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useTagsBox({ value: [], onChange }));

    act(() => result.current.setNewTag("react"));
    act(() => result.current.addNewTag());

    expect(onChange).toHaveBeenLastCalledWith(["react"]);
  });
});
