import React, { RefObject } from "react";
import { render } from "@testing-library/react";
import { SuggestProps, SuggestResults } from "../SuggestResults";

const defaultProps = {
  values: ["first", "second", "third"],
  textareaRef: { current: {} } as unknown as RefObject<HTMLTextAreaElement>,
  onItemClickHandler: jest.fn(),
};

describe("components/SuggestResults", () => {
  it("should be rendered", () => {
    const { container } = render(<SuggestResults {...defaultProps} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render values by native render", async () => {
    const { container, findByText } = render(
      <SuggestResults {...defaultProps} />
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(await findByText("first")).toBeInTheDocument();
    expect(await findByText("second")).toBeInTheDocument();
    expect(await findByText("third")).toBeInTheDocument();
  });

  it("should render values by custom render", async () => {
    const customSuggestItemRenderer = jest.fn((item) => (
      <div data-testid={`test-item-${item.id}`}>{item.text}</div>
    ));
    const { container, findByTestId } = render(
      <SuggestResults
        {...defaultProps}
        values={[
          { id: "id0", text: "first" },
          { id: "id1", text: "second" },
          { id: "id2", text: "third" },
        ]}
        customSuggestItemRenderer={customSuggestItemRenderer}
        selectedItemIndex={1}
      />
    );

    expect(container.firstChild).toBeInTheDocument();

    expect(customSuggestItemRenderer).toBeCalledWith(
      { id: "id0", text: "first" },
      false
    );
    expect(customSuggestItemRenderer).toBeCalledWith(
      { id: "id1", text: "second" },
      true
    );
    expect(customSuggestItemRenderer).toBeCalledWith(
      { id: "id2", text: "third" },
      false
    );

    expect((await findByTestId("test-item-id0")).textContent).toBe("first");
    expect((await findByTestId("test-item-id1")).textContent).toBe("second");
    expect((await findByTestId("test-item-id2")).textContent).toBe("third");
  });

  it.each([
    ["isHidden=true", { isHidden: true }],
    ["textareaRef doesnt exist", { textareaRef: undefined }],
    ["textareaRef current is null", { textareaRef: { current: null } }],
    ["values are empty", { values: [] }],
    ["values dont exist", { values: undefined }],
  ])("should render null if %s", (_, overridingProps) => {
    const props = {
      ...defaultProps,
      ...overridingProps,
    } as SuggestProps<string>;
    const { container } = render(<SuggestResults {...props} />);

    expect(container.firstChild).not.toBeInTheDocument();
  });
});
