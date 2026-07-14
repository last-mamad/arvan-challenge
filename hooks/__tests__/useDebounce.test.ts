import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useDebounce } from "@/hooks/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("a", 200));
    expect(result.current).toBe("a");
  });

  it("updates only after the delay has elapsed", () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 200), {
      initialProps: { v: "a" },
    });

    rerender({ v: "b" });
    expect(result.current).toBe("a");

    act(() => void vi.advanceTimersByTime(199));
    expect(result.current).toBe("a");

    act(() => void vi.advanceTimersByTime(1));
    expect(result.current).toBe("b");
  });

  it("resets the timer on rapid changes, so only the last value lands", () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 200), {
      initialProps: { v: "a" },
    });

    rerender({ v: "b" });
    act(() => void vi.advanceTimersByTime(150));
    rerender({ v: "c" }); // resets the 200ms window
    act(() => void vi.advanceTimersByTime(150));
    expect(result.current).toBe("a"); // window was reset, not yet elapsed

    act(() => void vi.advanceTimersByTime(50));
    expect(result.current).toBe("c");
  });
});
