import { renderHook } from "@testing-library/react";
import { usePrevious } from "../usePrevious";

describe("usePrevious", () => {
  it("should return previous value", () => {
    const { result, rerender } = renderHook((value) => usePrevious(value), {
      initialProps: "value",
    });

    expect(result.current).toBe(undefined);

    rerender("value1");
    expect(result.current).toBe("value");

    rerender("value2");
    expect(result.current).toBe("value1");
  });
});
