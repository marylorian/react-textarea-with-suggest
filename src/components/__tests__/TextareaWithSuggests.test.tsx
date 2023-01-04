import React from "react";
import { render } from "@testing-library/react";
import { TextareaWithSuggests } from "../TextareaWithSuggests";

const defaultProps = {
  onSearch: jest.fn(),
};

describe("components/TextareaWithSuggests", () => {
  it("should be rendered", () => {
    const { container } = render(<TextareaWithSuggests {...defaultProps} />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
