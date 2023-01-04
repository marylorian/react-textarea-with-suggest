import React from "react";
import { render } from "@testing-library/react";
import { SuggestResultsItem } from "../SuggestResultsItem";

const defaultProps = {
  item: "value",
  isSelected: false,
  onItemClickHandler: jest.fn(),
};

describe("components/SuggestResultsItem", () => {
  it("should be rendered", () => {
    const { container } = render(<SuggestResultsItem {...defaultProps} />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
