import React from "react";
import { render } from "@testing-library/react";
import { NativeTextarea } from "../NativeTextarea";

describe("components/NativeTextarea", () => {
  it("should be rendered", () => {
    const { container } = render(<NativeTextarea />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
