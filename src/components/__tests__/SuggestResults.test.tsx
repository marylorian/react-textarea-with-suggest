import React, { RefObject } from "react";
import { render } from "@testing-library/react";
import { SuggestResults } from "../SuggestResults";

const defaultProps = {
  values: ["1", "2", "3"],
  textareaRef: { current: {} } as unknown as RefObject<HTMLTextAreaElement>,
  onItemClickHandler: jest.fn(),
};

describe("components/SuggestResults", () => {
  it("should be rendered", () => {
    const { container } = render(<SuggestResults {...defaultProps} />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
